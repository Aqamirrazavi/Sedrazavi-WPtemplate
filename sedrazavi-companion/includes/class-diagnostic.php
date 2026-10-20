<?php
/**
 * SedRazavi Self-Healing Diagnostic Engine
 *
 * Checks WordPress health, Elementor cache, rewrite rules, memory limits,
 * and provides a 1-click Auto-Fix healing button.
 *
 * @package SedRazavi_Companion
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Diagnostic_Doctor {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('admin_post_sedrazavi_autofix', [$this, 'handle_autofix']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
    }

    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/diagnostic/health', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_health_report'],
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ]);

        register_rest_route('sedrazavi/v1', '/diagnostic/autofix', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_execute_autofix'],
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ]);
    }

    public function get_health_checks() {
        $checks = [];

        // 1. PHP Memory Limit (>= 256M recommended)
        $memory = ini_get('memory_limit');
        $checks['memory'] = [
            'title'   => 'محدودیت حافظه PHP (Memory Limit)',
            'value'   => $memory,
            'status'  => (int)$memory >= 128 ? 'good' : 'warning',
            'message' => (int)$memory >= 128 ? 'حافظه کافی برای اجرای المنتور و قالب موجود است.' : 'پیشنهاد می‌شود memory_limit حداقل 256M باشد.',
        ];

        // 2. Elementor Cache & Files
        $elem_active = class_exists('\Elementor\Plugin');
        $checks['elementor'] = [
            'title'   => 'وضعیت موتور و کش المنتور',
            'value'   => $elem_active ? 'نصب و فعال' : 'غیرفعال (حالت گوتنبرگ)',
            'status'  => 'good',
            'message' => $elem_active ? 'المنتور آماده و سازگار است.' : 'سایت با بلوک‌های بهینه گوتنبرگ اجرا می‌شود.',
        ];

        // 3. Permalinks Structure
        $permalinks = get_option('permalink_structure');
        $checks['permalinks'] = [
            'title'   => 'پیوندهای یکتای وردپرس',
            'value'   => !empty($permalinks) ? $permalinks : 'پیش‌فرض (ساده)',
            'status'  => !empty($permalinks) ? 'good' : 'warning',
            'message' => !empty($permalinks) ? 'ساختار پیوند یکتا استاندارد و سئومحور است.' : 'پیشنهاد می‌شود پیوند یکتا روی نام نوشته تنظیم شود.',
        ];

        // 4. SMS Gateway Setup
        $sms_provider = get_option('sedrazavi_sms_provider', 'ippanel');
        $sms_key = get_option('sedrazavi_sms_api_key', '');
        $checks['sms'] = [
            'title'   => 'درگاه پیامک ایرانی و احراز هویت OTP',
            'value'   => $sms_provider . (!empty($sms_key) ? ' (کلید ثبت شده)' : ' (بدون کلید)'),
            'status'  => !empty($sms_key) ? 'good' : 'info',
            'message' => !empty($sms_key) ? 'وب‌سرویس پترن متصل است.' : 'جهت ارسال پیامک OTP، کلید وب‌سرویس را در تب اتصالات ثبت فرمایید.',
        ];

        return $checks;
    }

    public function execute_autofix() {
        $actions_taken = [];

        // 1. Flush rewrite rules
        flush_rewrite_rules();
        $actions_taken[] = 'بازنشانی و تازه‌سازی پیوندهای یکتای وردپرس (Rewrite Rules)';

        // 2. Clear Elementor cache if available
        if (class_exists('\Elementor\Plugin')) {
            \Elementor\Plugin::$instance->files_manager->clear_cache();
            $actions_taken[] = 'پاکسازی و بازسازی کش فایل‌های CSS المنتور';
        }

        // 3. Clean transient caches
        delete_transient('sr_recent_broken_links');
        $actions_taken[] = 'تازه‌سازی حافظه کش گذرا (Transients)';

        return $actions_taken;
    }

    public function handle_autofix() {
        check_admin_referer('sr_autofix_action');
        if (!current_user_can('manage_options')) {
            wp_die('دسترسی غیرمجاز.');
        }

        $actions = $this->execute_autofix();
        $msg = urlencode(implode(' • ', $actions));
        wp_safe_redirect(admin_url('admin.php?page=sedrazavi-companion-hub&autofix_done=' . $msg));
        exit;
    }

    public function rest_get_health_report() {
        return rest_ensure_response([
            'success' => true,
            'checks'  => $this->get_health_checks(),
        ]);
    }

    public function rest_execute_autofix() {
        $actions = $this->execute_autofix();
        return rest_ensure_response([
            'success' => true,
            'message' => 'تعمیر خودکار با موفقیت انجام شد.',
            'actions' => $actions,
        ]);
    }
}
