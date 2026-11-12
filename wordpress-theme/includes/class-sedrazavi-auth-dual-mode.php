<?php
/**
 * SedRazavi Dual-Mode Authentication & Security Suite
 * Specification: Part 16 - Multi-Role Authentication, 2FA, Rate-Limiting & JWT
 *
 * @package SedRazavi
 * @subpackage Security
 * @version 2.9.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Auth_Dual_Mode {

    const OTP_EXPIRY_SECONDS = 120;
    const MAX_LOGIN_ATTEMPTS = 5;
    const LOCKOUT_MINUTES    = 15;

    public static function init() {
        add_action('rest_api_init', [__CLASS__, 'register_rest_routes']);
        add_action('wp_login_failed', [__CLASS__, 'handle_failed_login']);
        add_action('wp_authenticate_user', [__CLASS__, 'check_lockout_status'], 10, 2);
    }

    /**
     * Register REST API endpoints for Dual Mode Authentication
     */
    public static function register_rest_routes() {
        register_rest_route('sedrazavi/v1/auth', '/login', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'handle_dual_login'],
            'permission_callback' => '__return_true',
            'args'                => [
                'mode' => [
                    'required'          => false,
                    'default'           => 'client',
                    'enum'              => ['client', 'lawyer'],
                    'sanitize_callback' => 'sanitize_key',
                ],
                'mobile'   => ['required' => false, 'sanitize_callback' => 'sanitize_text_field'],
                'username' => ['required' => false, 'sanitize_callback' => 'sanitize_user'],
            ],
        ]);

        register_rest_route('sedrazavi/v1/auth', '/verify-2fa', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'verify_two_factor_code'],
            'permission_callback' => '__return_true',
            'args'                => [
                'user_id' => ['required' => true, 'sanitize_callback' => 'absint'],
                'code'    => ['required' => true, 'sanitize_callback' => 'sanitize_text_field'],
                'token'   => ['required' => true, 'sanitize_callback' => 'sanitize_text_field'],
            ],
        ]);

        register_rest_route('sedrazavi/v1/auth', '/logout', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'handle_secure_logout'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    /**
     * Dual Mode Login Handler (Client OTP vs Attorney Password + 2FA)
     */
    public static function handle_dual_login($request) {
        $params   = $request->get_json_params() ?: $request->get_params();
        $authMode = sanitize_key($params['mode'] ?? 'client'); // 'client' | 'lawyer'
        $mobile   = sanitize_text_field($params['mobile'] ?? '');

        // Verify Rate-Limit before proceeding
        $ip = self::get_client_ip();
        if (self::is_ip_locked($ip)) {
            return new WP_Error('rate_limit_exceeded', 'تعداد تلاش‌های ناموفق شما بیش از حد مجاز است. لطفاً ۱۵ دقیقه بعد تلاش کنید.', ['status' => 429]);
        }

        if ($authMode === 'client') {
            $mobile_rate_key = 'sr_otp_rate_' . md5($ip . '|' . $mobile);
            $otp_reqs = (int) get_transient($mobile_rate_key);
            if ($otp_reqs >= 3) {
                return new WP_Error('otp_rate_limited', 'تعداد درخواست کد تأیید بیش از حد مجاز است. لطفاً چند دقیقه صبر کنید.', ['status' => 429]);
            }

            if (!preg_match('/^09[0-9]{9}$/', $mobile)) {
                return new WP_Error('invalid_mobile', 'شماره موبایل وارد شده نامعتبر است.', ['status' => 400]);
            }

            set_transient($mobile_rate_key, $otp_reqs + 1, self::OTP_EXPIRY_SECONDS);

            // Generate 5-digit cryptographically secure OTP
            $otpCode = strval(random_int(10000, 99999));
            set_transient('sedrazavi_otp_' . $mobile, [
                'code'       => hash('sha256', $otpCode),
                'expires_at' => time() + self::OTP_EXPIRY_SECONDS,
                'attempts'   => 0
            ], self::OTP_EXPIRY_SECONDS);

            do_action('sedrazavi_send_sms_otp', $mobile, $otpCode);

            return rest_ensure_response([
                'success'    => true,
                'mode'       => 'client',
                'message'    => 'کد تأیید یکبارمصرف پیامک شد.',
                'expires_in' => self::OTP_EXPIRY_SECONDS,
            ]);
        }

        if ($authMode === 'lawyer') {
            $username = sanitize_user($params['username'] ?? '');
            $password = $params['password'] ?? '';

            $user = wp_authenticate($username, $password);
            if (is_wp_error($user)) {
                self::record_failed_attempt($ip);
                return new WP_Error('invalid_credentials', 'نام کاربری یا رمز عبور وکیل اشتباه است.', ['status' => 401]);
            }

            // Generate both session token and real 6-digit 2FA challenge code
            $twoFactorToken = wp_generate_password(32, false);
            $twoFactorCode  = strval(random_int(100000, 999999));
            set_transient('sedrazavi_2fa_pending_' . $user->ID, [
                'token'      => $twoFactorToken,
                'code_hash'  => hash('sha256', $twoFactorCode),
                'attempts'   => 0,
                'expires_at' => time() + 300,
            ], 300);

            do_action('sedrazavi_send_2fa_code', $user, $twoFactorCode);

            return rest_ensure_response([
                'success'          => true,
                'mode'             => 'lawyer',
                'require_2fa'      => true,
                'user_id'          => $user->ID,
                'session_token'    => $twoFactorToken,
                'message'          => 'رمز عبور تأیید شد. لطفاً کد دو مرحله‌ای ارسال‌شده را وارد کنید.',
            ]);
        }

        return new WP_Error('invalid_mode', 'حالت ورود مشخص شده پشتیبانی نمی‌شود.', ['status' => 400]);
    }

    /**
     * Strict 2FA Verification Handler (constant-time token + code hash comparison + attempt cap)
     */
    public static function verify_two_factor_code($request) {
        $ip = self::get_client_ip();
        if (self::is_ip_locked($ip)) {
            return new WP_Error('rate_limit_exceeded', 'تعداد تلاش‌های ناموفق شما بیش از حد مجاز است. لطفاً ۱۵ دقیقه بعد تلاش کنید.', ['status' => 429]);
        }

        $params = $request->get_json_params() ?: $request->get_params();
        $userId = absint($params['user_id'] ?? 0);
        $code   = sanitize_text_field($params['code'] ?? '');
        $token  = sanitize_text_field($params['token'] ?? '');

        if (!$userId || $code === '' || $token === '') {
            return new WP_Error('missing_2fa_fields', 'شناسه کاربر، توکن نشست و کد دو مرحله‌ای الزامی است.', ['status' => 400]);
        }

        $pending = get_transient('sedrazavi_2fa_pending_' . $userId);
        if (!is_array($pending) || empty($pending['token']) || empty($pending['code_hash'])) {
            return new WP_Error('invalid_session', 'جلسه اعتبارسنجی منقضی شده است.', ['status' => 403]);
        }

        if (time() > (int) ($pending['expires_at'] ?? 0)) {
            delete_transient('sedrazavi_2fa_pending_' . $userId);
            return new WP_Error('session_expired', 'مهلت اعتبارسنجی دو مرحله‌ای به پایان رسیده است.', ['status' => 403]);
        }

        $token_ok = hash_equals((string) $pending['token'], $token);
        $code_ok  = preg_match('/^[0-9]{6}$/', $code) && hash_equals((string) $pending['code_hash'], hash('sha256', $code));

        if (!$token_ok || !$code_ok) {
            self::record_failed_attempt($ip);
            $attempts = (int) ($pending['attempts'] ?? 0) + 1;
            if ($attempts >= self::MAX_LOGIN_ATTEMPTS) {
                delete_transient('sedrazavi_2fa_pending_' . $userId);
                return new WP_Error('too_many_2fa_attempts', 'تعداد خطاهای کد دو مرحله‌ای بیش از حد مجاز بود؛ لطفاً مجدداً وارد شوید.', ['status' => 429]);
            }
            $pending['attempts'] = $attempts;
            set_transient('sedrazavi_2fa_pending_' . $userId, $pending, max(60, (int) $pending['expires_at'] - time()));
            return new WP_Error('invalid_2fa_code', 'کد یا توکن دو مرحله‌ای نامعتبر است.', ['status' => 403]);
        }

        wp_set_current_user($userId);
        wp_set_auth_cookie($userId, true, is_ssl());
        delete_transient('sedrazavi_2fa_pending_' . $userId);

        return rest_ensure_response([
            'success'   => true,
            'message'   => 'ورود با موفقیت انجام شد. انتقال به کارتابل تخصصی...',
            'redirect'  => admin_url('admin.php?page=sedrazavi-dashboard'),
        ]);
    }

    /**
     * Handle Secure Logout
     */
    public static function handle_secure_logout() {
        wp_logout();
        return rest_ensure_response([
            'success'  => true,
            'redirect' => home_url('/'),
        ]);
    }

    private static function get_client_ip() {
        return $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    }

    private static function is_ip_locked($ip) {
        $attempts = get_transient('sedrazavi_failed_attempts_' . md5($ip));
        return is_numeric($attempts) && $attempts >= self::MAX_LOGIN_ATTEMPTS;
    }

    private static function record_failed_attempt($ip) {
        $key = 'sedrazavi_failed_attempts_' . md5($ip);
        $attempts = (int) get_transient($key);
        set_transient($key, $attempts + 1, self::LOCKOUT_MINUTES * 60);
    }

    public static function handle_failed_login() {
        self::record_failed_attempt(self::get_client_ip());
    }

    public static function check_lockout_status($user, $password) {
        if (self::is_ip_locked(self::get_client_ip())) {
            return new WP_Error('locked_out', 'دسترسی شما موقتاً به دلیل تلاش‌های ناموفق مسدود است.');
        }
        return $user;
    }
}

SedRazavi_Auth_Dual_Mode::init();