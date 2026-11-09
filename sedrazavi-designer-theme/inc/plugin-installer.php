<?php
/**
 * In-Theme Automated Bundled Plugin Installer (Addenda 16.0 & 20.0)
 *
 * Embeds sedrazavi-designer-core in inc/plugins/ and provides 1-click
 * installation and activation from both the front-end Designer Cockpit and WP Admin.
 *
 * @package SedRazavi_Designer_Theme
 * @version 2.0.0
 */

namespace SedRazaviDesigner;

if (!defined('ABSPATH')) {
    exit;
}

class Plugin_Installer {
    private static $instance = null;
    const PLUGIN_SLUG = 'sedrazavi-designer-core';
    const PLUGIN_FILE = 'sedrazavi-designer-core/sedrazavi-core.php';
    const BUNDLE_ZIP  = 'sedrazavi-designer-core.zip';

    public static function instance() {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        add_action('wp_ajax_sr_install_bundled_core', [$this, 'ajax_install_bundled_core']);
        add_action('admin_notices', [$this, 'admin_notice_if_missing']);
    }

    /**
     * Check if plugin file exists
     */
    public static function is_installed() {
        return file_exists(WP_PLUGIN_DIR . '/' . self::PLUGIN_FILE);
    }

    /**
     * Check if plugin is active
     */
    public static function is_active() {
        if (!function_exists('is_plugin_active')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }
        return is_plugin_active(self::PLUGIN_FILE);
    }

    /**
     * Admin notice in WP Admin if plugin is not yet active
     */
    public function admin_notice_if_missing() {
        if (self::is_active() || !current_user_can('install_plugins')) {
            return;
        }

        $nonce = wp_create_nonce('sr_plugin_install_nonce');
        ?>
        <div class="notice notice-warning is-dismissible" style="border-right-color:#00D1FF; padding:12px;">
            <p>
                <strong>⚡ افزونه هسته اختصاصی استودیو (SedRazavi Designer Core):</strong>
                بسته نصبی افزونه درون پوسته تعبیه شده است. برای فعال‌سازی کامل ویجت‌های تعاملی و جداول سفارش‌ها، افزونه را فعال کنید.
                <button type="button" class="button button-primary" id="sr-admin-install-core-btn" style="margin-right:10px;">
                    نصب و فعال‌سازی با یک کلیک
                </button>
                <span id="sr-admin-install-status" style="margin-right:8px; font-weight:600;"></span>
            </p>
            <script>
            document.addEventListener('DOMContentLoaded', function() {
                var btn = document.getElementById('sr-admin-install-core-btn');
                if (!btn) return;
                btn.addEventListener('click', function() {
                    btn.disabled = true;
                    var status = document.getElementById('sr-admin-install-status');
                    status.textContent = 'در حال استخراج و فعال‌سازی...';
                    var fd = new FormData();
                    fd.append('action', 'sr_install_bundled_core');
                    fd.append('security', '<?php echo esc_js($nonce); ?>');
                    fetch('<?php echo esc_url(admin_url('admin-ajax.php')); ?>', {
                        method: 'POST',
                        body: fd
                    })
                    .then(r => r.json())
                    .then(data => {
                        if (data.success) {
                            status.style.color = '#10B981';
                            status.textContent = '✅ افزونه با موفقیت نصب و فعال شد. در حال بارگذاری مجدد...';
                            setTimeout(() => window.location.reload(), 1200);
                        } else {
                            status.style.color = '#EF4444';
                            status.textContent = '❌ خطا: ' + (data.data.message || 'خطا در نصب');
                            btn.disabled = false;
                        }
                    })
                    .catch(e => {
                        status.style.color = '#EF4444';
                        status.textContent = '❌ خطا در اتصال به سرور';
                        btn.disabled = false;
                    });
                });
            });
            </script>
        </div>
        <?php
    }

    /**
     * AJAX handler to unpack zip and activate plugin
     */
    public function ajax_install_bundled_core() {
        check_ajax_referer('sr_plugin_install_nonce', 'security');

        if (!current_user_can('install_plugins') && !current_user_can('manage_options')) {
            wp_send_json_error(['message' => 'شما مجوز کافی برای نصب افزونه را ندارید.']);
        }

        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/plugin.php';

        // Path to bundled zip in theme
        $zip_path = get_template_directory() . '/inc/plugins/' . self::BUNDLE_ZIP;

        if (!file_exists($zip_path)) {
            // If direct folder already exists in WP_PLUGIN_DIR, just activate it
            if (self::is_installed()) {
                $result = activate_plugin(self::PLUGIN_FILE);
                if (is_wp_error($result)) {
                    wp_send_json_error(['message' => $result->get_error_message()]);
                }
                wp_send_json_success(['message' => 'افزونه با موفقیت فعال شد.']);
            }
            wp_send_json_error(['message' => 'فایل بسته نصبی افزونه در پوسته یافت نشد.']);
        }

        WP_Filesystem();
        global $wp_filesystem;

        $target_dir = WP_PLUGIN_DIR;
        $unzip_result = unzip_file($zip_path, $target_dir);

        if (is_wp_error($unzip_result)) {
            wp_send_json_error(['message' => 'خطا در استخراج فایل فشرده: ' . $unzip_result->get_error_message()]);
        }

        // Activate the plugin
        $activate_result = activate_plugin(self::PLUGIN_FILE);
        if (is_wp_error($activate_result)) {
            wp_send_json_error(['message' => 'افزونه استخراج شد اما در فعال‌سازی خطا داد: ' . $activate_result->get_error_message()]);
        }

        wp_send_json_success(['message' => 'افزونه هسته با موفقیت نصب و فعال گردید.']);
    }
}

Plugin_Installer::instance();
