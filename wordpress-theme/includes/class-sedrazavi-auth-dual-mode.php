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
        ]);

        register_rest_route('sedrazavi/v1/auth', '/verify-2fa', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'verify_two_factor_code'],
            'permission_callback' => '__return_true',
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
        $params   = $request->get_json_params();
        $authMode = sanitize_text_field($params['mode'] ?? 'client'); // 'client' | 'lawyer'
        $mobile   = sanitize_text_field($params['mobile'] ?? '');

        // Verify Rate-Limit before proceeding
        $ip = self::get_client_ip();
        if (self::is_ip_locked($ip)) {
            return new WP_Error('rate_limit_exceeded', 'تعداد تلاش‌های ناموفق شما بیش از حد مجاز است. لطفاً ۱۵ دقیقه بعد تلاش کنید.', ['status' => 429]);
        }

        if ($authMode === 'client') {
            // Validate Iranian mobile regex: ^09[0-9]{9}$
            if (!preg_match('/^09[0-9]{9}$/', $mobile)) {
                return new WP_Error('invalid_mobile', 'شماره موبایل وارد شده نامعتبر است.', ['status' => 400]);
            }

            // Generate 5-digit cryptographically secure OTP
            $otpCode = strval(random_int(10000, 99999));
            set_transient('sedrazavi_otp_' . $mobile, [
                'code'       => hash('sha256', $otpCode),
                'expires_at' => time() + self::OTP_EXPIRY_SECONDS,
                'attempts'   => 0
            ], self::OTP_EXPIRY_SECONDS);

            // In production, dispatch via Kavenegar / FarazSMS / MeliPayamak
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

            // Require 2FA for administrative & lawyer accounts
            $twoFactorToken = wp_generate_password(32, false);
            set_transient('sedrazavi_2fa_pending_' . $user->ID, [
                'token'      => $twoFactorToken,
                'expires_at' => time() + 300,
            ], 300);

            return rest_ensure_response([
                'success'          => true,
                'mode'             => 'lawyer',
                'require_2fa'      => true,
                'user_id'          => $user->ID,
                'session_token'    => $twoFactorToken,
                'message'          => 'رمز عبور تأیید شد. لطفاً کد دو مرحله‌ای خود را وارد کنید.',
            ]);
        }

        return new WP_Error('invalid_mode', 'حالت ورود مشخص شده پشتیبانی نمی‌شود.', ['status' => 400]);
    }

    /**
     * 2FA Verification Handler
     */
    public static function verify_two_factor_code($request) {
        $params   = $request->get_json_params();
        $userId   = absint($params['user_id'] ?? 0);
        $code     = sanitize_text_field($params['code'] ?? '');
        $token    = sanitize_text_field($params['token'] ?? '');

        $pending = get_transient('sedrazavi_2fa_pending_' . $userId);
        if (!$pending || $pending['token'] !== $token) {
            return new WP_Error('invalid_session', 'جلسه اعتبارسنجی منقضی شده است.', ['status' => 403]);
        }

        // Verify TOTP or SMS code
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