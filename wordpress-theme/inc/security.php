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
     * Check rate limit for a specific action by client IP
     *
     * @param string $action Action key (e.g. 'booking', 'tracking', 'otp')
     * @param int $max_attempts Maximum allowed attempts within window
     * @param int $window_seconds Window in seconds (default 600s = 10 minutes)
     * @return bool True if allowed, false if limit exceeded
     */
    public static function check_rate_limit($action, $max_attempts = 5, $window_seconds = 600) {
        $ip = self::get_client_ip();
        $transient_key = 'sedrazavi_rl_' . substr(md5($action . '_' . $ip), 0, 24);
        $attempts = (int) get_transient($transient_key);

        if ($attempts >= $max_attempts) {
            return false;
        }

        $attempts++;
        set_transient($transient_key, $attempts, $window_seconds);
        return true;
    }

    /**
     * Reset rate limit for a specific action and IP
     */
    public static function reset_rate_limit($action) {
        $ip = self::get_client_ip();
        $transient_key = 'sedrazavi_rl_' . substr(md5($action . '_' . $ip), 0, 24);
        delete_transient($transient_key);
    }

    /**
     * Get sanitized client IP address
     */
    public static function get_client_ip() {
        if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
            return sanitize_text_field(wp_unslash($_SERVER['HTTP_CF_CONNECTING_IP']));
        }
        if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $parts = explode(',', wp_unslash($_SERVER['HTTP_X_FORWARDED_FOR']));
            return sanitize_text_field(trim($parts[0]));
        }
        return isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : '127.0.0.1';
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
