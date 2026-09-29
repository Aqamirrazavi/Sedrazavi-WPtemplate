<?php
/**
 * SedRazavi Security & Protection Suite
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_send_security_headers')) {
function sedrazavi_send_security_headers() {
    if (!headers_sent() && !is_admin()) {
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('X-XSS-Protection: 1; mode=block');
        header('Referrer-Policy: strict-origin-when-cross-origin');
    }
}
add_action('send_headers', 'sedrazavi_send_security_headers');
}
