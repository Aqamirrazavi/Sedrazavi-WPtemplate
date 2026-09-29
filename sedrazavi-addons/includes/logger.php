<?php
/**
 * Automated System Logger for SedRazavi Law Firm
 *
 * @package SedRazavi_Addons
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('SedRazavi_Logger')) {
    class SedRazavi_Logger {
        
        public static function init() {
            // ضبط استثناهای مدیریت‌نشده در صورت فعال بودن دیباگ افزونه
            if (get_option('sedrazavi_enable_custom_logger', 1)) {
                set_error_handler(array(__CLASS__, 'handle_php_error'));
            }
        }

        public static function handle_php_error($errno, $errstr, $errfile, $errline) {
            // تنها خطاهای مهم مربوط به فضای کاری سید رضوی ثبت شوند
            if (strpos($errfile, 'sedrazavi') !== false) {
                sedrazavi_addons_log_error($errstr, $errfile, $errline, 'PHP_ERROR_' . $errno);
            }
            return false; // اجازه ادامه به سیستم پیش‌فرض
        }

        public static function get_log_contents($max_lines = 100) {
            $log_file = SEDRAZAVI_LOG_DIR . 'debug.log';
            if (!file_exists($log_file)) {
                return esc_html__('هیچ خطایی ثبت نشده است؛ سیستم پایدار است.', 'sedrazavi-addons');
            }

            $lines = @file($log_file);
            if (empty($lines)) {
                return esc_html__('فایل لاگ خالی است.', 'sedrazavi-addons');
            }

            $sliced = array_slice($lines, -$max_lines);
            return implode('', array_reverse($sliced));
        }

        public static function clear_log() {
            $log_file = SEDRAZAVI_LOG_DIR . 'debug.log';
            if (file_exists($log_file)) {
                return @file_put_contents($log_file, '');
            }
            return true;
        }
    }
}

SedRazavi_Logger::init();
