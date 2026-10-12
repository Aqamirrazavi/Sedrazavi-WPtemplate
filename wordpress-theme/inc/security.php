<?php
/**
 * SedRazavi Security & Hardening Suite
 *
 * Implements HTTP security headers, transient-based IP rate-limiting,
 * nonce inspection, file upload MIME restrictions, and XML-RPC hardening.
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * 1. Client IP & Transient Rate Limiter
 */
class SedRazavi_Rate_Limiter {

    /**
     * Pre-configured rate limit windows and messages for specific actions
     */
    public static function get_action_config($action) {
        $configs = array(
            'booking'    => array('max' => 5,  'window' => 600, 'msg' => 'تعداد درخواست‌های رزرو نوبت شما بیش از حد مجاز است. لطفاً ۱۰ دقیقه دیگر مجدداً تلاش فرمایید.'),
            'tracking'   => array('max' => 10, 'window' => 600, 'msg' => 'تعداد استعلام‌های پی‌درپی بیش از حد مجاز است. لطفاً ۱۰ دقیقه بعد مجدداً تلاش نمایید.'),
            'newsletter' => array('max' => 5,  'window' => 600, 'msg' => 'تعداد درخواست‌های ثبت در خبرنامه بیش از حد مجاز است. لطفاً دقایقی دیگر اقدام فرمایید.'),
            'callback'   => array('max' => 5,  'window' => 600, 'msg' => 'تعداد درخواست‌های تماس فوری بیش از حد مجاز است. لطفاً دقایقی دیگر امتحان کنید.'),
            'otp'        => array('max' => 3,  'window' => 300, 'msg' => 'تعداد درخواست‌های کد تایید بیش از حد مجاز است. لطفاً ۵ دقیقه دیگر تلاش نمایید.'),
            'otp_send'   => array('max' => 3,  'window' => 300, 'msg' => 'ارسال مکرر پیامک محدود شده است. لطفاً ۵ دقیقه تامل فرمایید.'),
            'otp_verify' => array('max' => 5,  'window' => 300, 'msg' => 'تلاش‌های ورود بیش از حد مجاز بود. لطفاً ۵ دقیقه بعد اقدام فرمایید.'),
            'auth'       => array('max' => 5,  'window' => 600, 'msg' => 'تعداد تلاش‌های ورود بیش از حد مجاز است. لطفاً ۱۰ دقیقه دیگر مجدداً تلاش فرمایید.'),
        );
        return isset($configs[$action]) ? $configs[$action] : array('max' => 5, 'window' => 600, 'msg' => 'تعداد درخواست‌ها بیش از حد مجاز است. لطفاً دقایقی بعد تلاش فرمایید.');
    }

    /**
     * Check rate limit using default action profile
     *
     * @param string $action Action key
     * @param string $identifier Optional custom identifier
     * @return bool True if allowed, false if limit exceeded
     */
    public static function check_action_limit($action, $identifier = '') {
        $cfg = self::get_action_config($action);
        return self::check_rate_limit($action, $cfg['max'], $cfg['window'], $identifier);
    }

    /**
     * Generate standard HTTP 429 Rate Limited REST response
     */
    public static function get_rate_limit_response($action, $custom_message = '') {
        $cfg = self::get_action_config($action);
        $message = !empty($custom_message) ? $custom_message : $cfg['msg'];
        if (class_exists('WP_REST_Response')) {
            return new WP_REST_Response(array(
                'success'      => false,
                'rate_limited' => true,
                'message'      => $message,
            ), 429);
        }
        return array('success' => false, 'rate_limited' => true, 'message' => $message, 'status' => 429);
    }

    /**
     * Check rate limit for a specific action by client IP or identifier
     *
     * @param string $action Action key (e.g. 'booking', 'tracking', 'otp', 'email_otp')
     * @param int $max_attempts Maximum allowed attempts within window
     * @param int $window_seconds Window in seconds (default 600s = 10 minutes)
     * @param string $identifier Optional custom identifier (such as email or phone)
     * @return bool True if allowed, false if limit exceeded
     */
    public static function check_rate_limit($action, $max_attempts = 5, $window_seconds = 600, $identifier = '') {
        $key_id = !empty($identifier) ? sanitize_text_field($identifier) : self::get_client_ip();
        $transient_key = 'sedrazavi_rl_' . substr(md5($action . '_' . $key_id), 0, 24);
        $attempts = (int) get_transient($transient_key);

        if ($attempts >= $max_attempts) {
            return false;
        }

        $attempts++;
        set_transient($transient_key, $attempts, $window_seconds);
        return true;
    }

    /**
     * Reset rate limit for a specific action and IP or identifier
     */
    public static function reset_rate_limit($action, $identifier = '') {
        $key_id = !empty($identifier) ? sanitize_text_field($identifier) : self::get_client_ip();
        $transient_key = 'sedrazavi_rl_' . substr(md5($action . '_' . $key_id), 0, 24);
        delete_transient($transient_key);
    }

    /**
     * Inspect and verify request nonce
     *
     * @param mixed $request REST Request object
     * @param string $action Nonce action name
     * @param bool $require_nonce If true, request without nonce will be rejected
     * @return bool True if valid, false if invalid or missing when required
     */
    public static function verify_request_nonce($request, $action = 'wp_rest', $require_nonce = false) {
        if (!is_object($request)) {
            return !$require_nonce;
        }
        $nonce = null;
        if (method_exists($request, 'get_header')) {
            $nonce = $request->get_header('x-wp-nonce');
        }
        if (!$nonce && method_exists($request, 'get_param')) {
            $nonce = $request->get_param('_wpnonce');
        }
        if (empty($nonce)) {
            return !$require_nonce;
        }
        if (function_exists('wp_verify_nonce')) {
            return (bool) (wp_verify_nonce($nonce, $action) || wp_verify_nonce($nonce, 'sedrazavi_security_nonce') || wp_verify_nonce($nonce, 'wp_rest'));
        }
        return true;
    }

    /**
     * Validate Iranian Mobile Phone Number (09xxxxxxxxx pattern)
     * Handles Persian, Arabic and English digits and normalizes format.
     */
    public static function validate_iranian_phone($phone) {
        if (empty($phone)) {
            return false;
        }
        $clean = self::normalize_iranian_phone($phone);
        return (bool) preg_match('/^09[0-9]{9}$/', $clean);
    }

    /**
     * Normalize Iranian phone number to standard 09xxxxxxxxx 11-digit string
     */
    public static function normalize_iranian_phone($phone) {
        if (empty($phone)) {
            return '';
        }
        $persian = array('۰','۱','۲','۳','۴','۵','۶','۷','۸','۹');
        $arabic  = array('٠','١','٢','٣','٤','٥','٦','٧','٨','٩');
        $english = array('0','1','2','3','4','5','6','7','8','9');
        $clean = str_replace($persian, $english, (string)$phone);
        $clean = str_replace($arabic, $english, $clean);
        $clean = preg_replace('/[^\d]/', '', $clean);

        if (substr($clean, 0, 4) === '0098') {
            $clean = substr($clean, 4);
        } elseif (substr($clean, 0, 2) === '98') {
            $clean = substr($clean, 2);
        }

        if (strlen($clean) === 10 && substr($clean, 0, 1) === '9') {
            $clean = '0' . $clean;
        }

        return $clean;
    }

    /**
     * Strict XSS and HTML stripping for single-line input fields
     */
    public static function sanitize_strict_input($input) {
        if (is_array($input)) {
            return array_map(array(__CLASS__, 'sanitize_strict_input'), $input);
        }
        $val = wp_unslash((string)$input);
        $val = strip_tags($val);
        $val = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $val);
        return trim(sanitize_text_field($val));
    }

    /**
     * Strict multi-line text sanitization without execution tags
     */
    public static function sanitize_multiline_input($input) {
        $val = wp_unslash((string)$input);
        $val = strip_tags($val);
        $val = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $val);
        return trim(sanitize_textarea_field($val));
    }

    /**
     * Get sanitized client IP address with Trusted Proxies validation
     *
     * HTTP_X_FORWARDED_FOR and HTTP_CF_CONNECTING_IP are only accepted if
     * REMOTE_ADDR matches the configured trusted proxies list.
     */
    public static function get_client_ip() {
        $remote_addr = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : '127.0.0.1';

        // Check if trusted proxies are defined. Default is empty array (no untrusted headers accepted).
        $trusted_proxies = array();
        if (defined('SEDRAZAVI_TRUSTED_PROXIES')) {
            if (is_array(SEDRAZAVI_TRUSTED_PROXIES)) {
                $trusted_proxies = SEDRAZAVI_TRUSTED_PROXIES;
            } elseif (is_string(SEDRAZAVI_TRUSTED_PROXIES) && !empty(SEDRAZAVI_TRUSTED_PROXIES)) {
                $trusted_proxies = array_map('trim', explode(',', SEDRAZAVI_TRUSTED_PROXIES));
            }
        }

        // Only trust forwarded headers if the upstream connection is from a trusted proxy
        if (!empty($trusted_proxies) && in_array($remote_addr, $trusted_proxies, true)) {
            if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
                return sanitize_text_field(wp_unslash($_SERVER['HTTP_CF_CONNECTING_IP']));
            }
            if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
                $parts = explode(',', wp_unslash($_SERVER['HTTP_X_FORWARDED_FOR']));
                return sanitize_text_field(trim($parts[0]));
            }
        }

        return $remote_addr;
    }
}

/**
 * 2. Security Headers & Protocol Protection
 */
if (!function_exists('sedrazavi_send_security_headers')) {
    function sedrazavi_send_security_headers() {
        if (!headers_sent() && !is_admin()) {
            header('X-Content-Type-Options: nosniff');
            header('X-Frame-Options: SAMEORIGIN');
            header('X-XSS-Protection: 1; mode=block');
            header('Referrer-Policy: strict-origin-when-cross-origin');
            header('Permissions-Policy: camera=(), microphone=(), geolocation=(self)');
        }
    }
    add_action('send_headers', 'sedrazavi_send_security_headers');
}

/**
 * 3. Restrict Upload MIME Types to Legal Documents Only
 */
if (!function_exists('sedrazavi_restrict_legal_upload_mimes')) {
    function sedrazavi_restrict_legal_upload_mimes($mimes) {
        // Prevent upload of dangerous executables
        unset($mimes['exe'], $mimes['sh'], $mimes['bat'], $mimes['php'], $mimes['phtml'], $mimes['cgi']);

        // Explicitly allow safe court document formats
        $mimes['pdf']  = 'application/pdf';
        $mimes['doc']  = 'application/msword';
        $mimes['docx'] = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        $mimes['jpg|jpeg'] = 'image/jpeg';
        $mimes['png']  = 'image/png';
        $mimes['webp'] = 'image/webp';

        // Explicitly allow safe font formats for typography customization
        $mimes['woff2'] = 'font/woff2';
        $mimes['woff']  = 'font/woff';
        $mimes['ttf']   = 'font/ttf';
        $mimes['otf']   = 'font/otf';
        $mimes['eot']   = 'application/vnd.ms-fontobject';

        return $mimes;
    }
    add_filter('upload_mimes', 'sedrazavi_restrict_legal_upload_mimes');
}

/**
 * 4. Disable XML-RPC to Prevent Brute-Force Attacks
 */
add_filter('xmlrpc_enabled', '__return_false');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_generator');
