<?php
/**
 * Plugin Name: Universal Elementor Addon Suite (UAS)
 * Plugin URI: https://github.com/Aqamirrazavi/Sedrazavi-WPtemplate
 * Description: افزونه مستقل، عمومی و حرفه‌ای المان‌های پیشرفته برای صفحه‌ساز المنتور. قابل نصب روی هر نوع وب‌سایت وردپرسی (فروشگاهی، شرکتی، خدماتی، پرتال و وبلاگ) بدون وابستگی به هیچ قالب خاص.
 * Version: 1.0.0
 * Author: سید امیر حسین رضوی فردویی & تیم توسعه معماری وب
 * Author URI: https://github.com/Aqamirrazavi
 * Text Domain: universal-elementor-suite
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 7.4
 * Elementor tested up to: 3.25
 * Elementor Pro tested up to: 3.25
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

if (!defined('ABSPATH')) {
    exit; // Direct access denied
}

// Global Plugin Constants
define('UAS_VERSION', '1.0.0');
define('UAS_FILE', __FILE__);
define('UAS_PATH', plugin_dir_path(__FILE__));
define('UAS_URL', plugin_dir_url(__FILE__));
define('UAS_MINIMUM_ELEMENTOR_VERSION', '3.5.0');
define('UAS_MINIMUM_PHP_VERSION', '7.4');

/**
 * Main Initialization Class
 */
final class Universal_Elementor_Addon_Suite {

    /**
     * Singleton Instance
     *
     * @var Universal_Elementor_Addon_Suite|null
     */
    private static $_instance = null;

    /**
     * Get instance
     *
     * @return Universal_Elementor_Addon_Suite
     */
    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Constructor
     */
    public function __construct() {
        add_action('init', [$this, 'i18n']);
        add_action('plugins_loaded', [$this, 'init']);
    }

    /**
     * Load Textdomain
     */
    public function i18n() {
        load_plugin_textdomain('universal-elementor-suite', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }

    /**
     * Initialize Plugin Logic
     */
    public function init() {
        // 1. Check PHP Version
        if (version_compare(PHP_VERSION, UAS_MINIMUM_PHP_VERSION, '<')) {
            add_action('admin_notices', [$this, 'admin_notice_minimum_php_version']);
            return;
        }

        // 2. Check if Elementor is installed and loaded
        if (!did_action('elementor/loaded')) {
            add_action('admin_notices', [$this, 'admin_notice_missing_elementor']);
            return;
        }

        // 3. Check Elementor Version
        if (defined('ELEMENTOR_VERSION') && version_compare(ELEMENTOR_VERSION, UAS_MINIMUM_ELEMENTOR_VERSION, '<')) {
            add_action('admin_notices', [$this, 'admin_notice_minimum_elementor_version']);
            return;
        }

        // 4. Safe Bootstrap: Load Core Engine
        require_once UAS_PATH . 'includes/class-plugin.php';
        \UniversalElementorSuite\Plugin::instance();
    }

    /**
     * Admin Notice: Missing Elementor Plugin
     */
    public function admin_notice_missing_elementor() {
        if (!current_user_can('activate_plugins')) {
            return;
        }

        $screen = get_current_screen();
        if (isset($screen->parent_file) && 'plugins.php' === $screen->parent_file && 'update' === $screen->id) {
            return;
        }

        $install_url = wp_nonce_url(
            self_admin_url('update.php?action=install-plugin&plugin=elementor'),
            'install-plugin_elementor'
        );

        $message = sprintf(
            /* translators: 1: Plugin name 2: Elementor */
            esc_html__('افزونه «%1$s» جهت ارائه المان‌ها و ویجت‌های تعاملی نیازمند فعال بودن صفحه‌ساز «%2$s» است.', 'universal-elementor-suite'),
            '<strong>Universal Elementor Addon Suite</strong>',
            '<strong>Elementor</strong>'
        );

        printf(
            '<div class="notice notice-warning is-dismissible" style="border-right-color: #D4AF37; padding: 12px 16px;">
                <p style="font-size: 13px; margin: 0 0 8px 0;">%1$s</p>
                <p style="margin: 0;">
                    <a href="%2$s" class="button button-primary" style="background: #0B132B; border-color: #D4AF37; color: #F3E5AB;">%3$s</a>
                </p>
            </div>',
            $message,
            esc_url($install_url),
            esc_html__('نصب و فعال‌سازی صفحه‌ساز المنتور', 'universal-elementor-suite')
        );
    }

    /**
     * Admin Notice: Minimum Elementor Version
     */
    public function admin_notice_minimum_elementor_version() {
        if (!current_user_can('activate_plugins')) {
            return;
        }

        $message = sprintf(
            /* translators: 1: Plugin name 2: Elementor 3: Required Elementor version */
            esc_html__('افزونه «%1$s» نیازمند نگارش %3$s یا بالاتر از «%2$s» می‌باشد.', 'universal-elementor-suite'),
            '<strong>Universal Elementor Addon Suite</strong>',
            '<strong>Elementor</strong>',
            UAS_MINIMUM_ELEMENTOR_VERSION
        );

        printf(
            '<div class="notice notice-error is-dismissible"><p>%1$s</p></div>',
            $message
        );
    }

    /**
     * Admin Notice: Minimum PHP Version
     */
    public function admin_notice_minimum_php_version() {
        if (!current_user_can('activate_plugins')) {
            return;
        }

        $message = sprintf(
            /* translators: 1: Plugin name 2: PHP 3: Required PHP version */
            esc_html__('افزونه «%1$s» نیازمند نسخه %3$s یا بالاتر از «%2$s» است.', 'universal-elementor-suite'),
            '<strong>Universal Elementor Addon Suite</strong>',
            '<strong>PHP</strong>',
            UAS_MINIMUM_PHP_VERSION
        );

        printf(
            '<div class="notice notice-error is-dismissible"><p>%1$s</p></div>',
            $message
        );
    }
}

/**
 * Run Universal Elementor Addon Suite
 */
Universal_Elementor_Addon_Suite::instance();
