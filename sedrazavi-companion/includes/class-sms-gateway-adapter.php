<?php
/**
 * SedRazavi Iranian SMS & OTP Compatibility Adapter
 *
 * Provides extensible SMS patterns with automatic Digits delegation,
 * IPPanel (FarazSMS, LimooSMS, MaxSMS) & Kavenegar support.
 *
 * @package SedRazavi_Companion
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_SMS_Gateway_Adapter {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('sedrazavi_send_sms', [$this, 'dispatch_sms'], 10, 3);
        add_action('rest_api_init', [$this, 'register_sms_routes']);
    }

    public function is_digits_active() {
        return function_exists('digits_otp') || defined('DIGITS_VERSION');
    }

    public function register_sms_routes() {
        register_rest_route('sedrazavi/v1', '/sms/send-otp', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_send_otp'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1', '/sms/verify-otp', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_verify_otp'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function rest_send_otp($request) {
        $params = $request->get_json_params();
        $phone  = isset($params['phone']) ? sanitize_text_field($params['phone']) : '';

        // Normalize phone number (09xxxxxxxxx)
        $phone = preg_replace('/[^0-9]/', '', $phone);
        if (strpos($phone, '989') === 0) {
            $phone = '0' . substr($phone, 2);
        }
        if (strlen($phone) === 10 && strpos($phone, '9') === 0) {
            $phone = '0' . $phone;
        }

        if (!preg_match('/^09[0-9]{9}$/', $phone)) {
            return new WP_Error('invalid_phone', 'شماره موبایل وارد شده نامعتبر است (فرمت: ۰۹۱۲۳۴۵۶۷۸۹).', ['status' => 400]);
        }

        // Rate limit: max 3 OTPs per 10 minutes per phone
        $rate_key = 'sr_otp_rate_' . md5($phone);
        $attempts = (int) get_transient($rate_key);
        if ($attempts >= 3) {
            return new WP_Error('rate_limit', 'شما به سقف ارسال کد رسیده‌اید. لطفاً ۱۰ دقیقه بعد مجدداً تلاش فرمایید.', ['status' => 429]);
        }
        set_transient($rate_key, $attempts + 1, 600);

        // Generate CSPRNG 5-digit OTP and store only salted SHA-256 hash
        $otp = str_pad((string) random_int(10000, 99999), 5, '0', STR_PAD_LEFT);
        $otp_token = bin2hex(random_bytes(16));
        set_transient('sr_otp_' . $otp_token, [
            'phone'     => $phone,
            'otp_hash'  => hash('sha256', $otp . wp_salt('auth')),
            'attempts'  => 0,
        ], 180); // 3 minutes

        // Dispatch SMS via Hook or Adapter
        $pattern_code = get_option('sedrazavi_sms_otp_pattern', 'otp-auth');
        $params_sms   = ['code' => $otp];

        $this->dispatch_sms($phone, $pattern_code, $params_sms);

        return rest_ensure_response([
            'success'         => true,
            'message'         => 'کد تایید یکبار مصرف پیامک شد.',
            'otpToken'        => $otp_token,
            'expiresIn'       => 180,
            'digitsDelegated' => $this->is_digits_active(),
        ]);
    }

    public function rest_verify_otp($request) {
        $params    = $request->get_json_params() ?: [];
        $otp_token = isset($params['otpToken']) ? sanitize_text_field($params['otpToken']) : '';
        $code      = isset($params['code']) ? preg_replace('/\D/', '', sanitize_text_field($params['code'])) : '';

        if (empty($otp_token) || empty($code)) {
            return new WP_Error('invalid_request', 'توکن و کد تایید الزامی است.', ['status' => 400]);
        }

        $stored = get_transient('sr_otp_' . $otp_token);
        if (!is_array($stored) || empty($stored['otp_hash'])) {
            return new WP_Error('expired_otp', 'کد تایید منقضی شده یا نامعتبر است.', ['status' => 400]);
        }

        $attempts = (int) ($stored['attempts'] ?? 0);
        if ($attempts >= 5) {
            delete_transient('sr_otp_' . $otp_token);
            return new WP_Error('otp_locked', 'تعداد خطاهای مجاز به پایان رسید. لطفاً کد جدید درخواست دهید.', ['status' => 429]);
        }

        $input_hash = hash('sha256', $code . wp_salt('auth'));
        if (!hash_equals((string) $stored['otp_hash'], $input_hash)) {
            $stored['attempts'] = $attempts + 1;
            set_transient('sr_otp_' . $otp_token, $stored, 180);
            return new WP_Error('invalid_code', 'کد وارد شده صحیح نمی‌باشد.', ['status' => 401]);
        }

        delete_transient('sr_otp_' . $otp_token);

        return rest_ensure_response([
            'success' => true,
            'message' => 'احراز هویت پیامکی با موفقیت تایید گردید.',
            'phone'   => $stored['phone'],
        ]);
    }

    public function dispatch_sms($phone, $pattern_code, $params = []) {
        $provider = apply_filters('sedrazavi_sms_provider', get_option('sedrazavi_sms_provider', 'ippanel'));
        $api_key  = get_option('sedrazavi_sms_api_key', '');

        // If Digits is active, trigger digits hooks
        if ($this->is_digits_active()) {
            do_action('sedrazavi_digits_sms_delegated', $phone, $params);
            return true;
        }

        // IPPanel / FarazSMS Implementation
        if ($provider === 'ippanel' && !empty($api_key)) {
            $sender = get_option('sedrazavi_sms_originator', '+983000505');
            wp_remote_post('http://rest.ippanel.com/v1/messages/patterns/send', [
                'headers' => ['Content-Type' => 'application/json', 'Authorization' => 'AccessKey ' . $api_key],
                'body'    => wp_json_encode([
                    'pattern_code' => $pattern_code,
                    'originator'   => $sender,
                    'recipient'    => $phone,
                    'values'       => $params,
                ]),
                'timeout' => 5,
            ]);
            return true;
        }

        // Kavenegar Implementation
        if ($provider === 'kavenegar' && !empty($api_key)) {
            $url = sprintf(
                'https://api.kavenegar.com/v1/%s/verify/lookup.json?receptor=%s&token=%s&template=%s',
                rawurlencode($api_key),
                rawurlencode($phone),
                rawurlencode(isset($params['code']) ? $params['code'] : ''),
                rawurlencode($pattern_code)
            );
            wp_remote_get($url, ['timeout' => 5]);
            return true;
        }

        return true;
    }
}
