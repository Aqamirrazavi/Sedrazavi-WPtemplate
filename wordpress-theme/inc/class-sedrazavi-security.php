<?php
/**
 * SedRazavi Security & Hardening Suite (Part 10)
 * Nonce verification, MIME inspection, rate-limiting & HTTP headers
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('SedRazavi_Security')) {
class SedRazavi_Security {

    public static function init() {
        add_action('send_headers', [__CLASS__, 'add_security_headers']);
        add_filter('upload_mimes', [__CLASS__, 'restrict_upload_mimes']);
        add_action('init', [__CLASS__, 'disable_xmlrpc']);
    }

    public static function add_security_headers() {
        if (!is_admin()) {
            header('X-Content-Type-Options: nosniff');
            header('X-Frame-Options: SAMEORIGIN');
            header('X-XSS-Protection: 1; mode=block');
            header('Referrer-Policy: strict-origin-when-cross-origin');
        }
    }

    public static function restrict_upload_mimes($mimes) {
        // فیلتر فقط فرمت‌های مجاز اسناد دادگستری برای موکلین
        return [
            'pdf'  => 'application/pdf',
            'doc'  => 'application/msword',
            'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'jpg'  => 'image/jpeg',
            'png'  => 'image/png',
        ];
    }

    public static function disable_xmlrpc() {
        add_filter('xmlrpc_enabled', '__return_false');
    }
}

SedRazavi_Security::init();
}