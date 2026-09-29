<?php
/**
 * SedRazavi Law Firm Theme Functions and Definitions
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit; // Direct access denied
}

if (!defined('SEDRAZAVI_THEME_VERSION')) {
    define('SEDRAZAVI_THEME_VERSION', '2.5.0');
}
if (!defined('SEDRAZAVI_THEME_DIR')) {
    define('SEDRAZAVI_THEME_DIR', get_template_directory());
}
if (!defined('SEDRAZAVI_THEME_URI')) {
    define('SEDRAZAVI_THEME_URI', get_template_directory_uri());
}

/**
 * 1. Theme Setup
 */
if (!function_exists('sedrazavi_theme_setup')) {
function sedrazavi_theme_setup() {
    // Internationalization support
    load_theme_textdomain('sedrazavi', SEDRAZAVI_THEME_DIR . '/languages');

    // Title tag support
    add_theme_support('title-tag');

    // Post thumbnails
    add_theme_support('post-thumbnails');
    add_image_size('sedrazavi-service-card', 600, 400, true);
    add_image_size('sedrazavi-lawyer-portrait', 700, 900, true);
    add_image_size('sedrazavi-story-thumb', 200, 200, true);

    // Custom Logo
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 260,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // HTML5 semantic markup
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Selective Refresh for Widgets
    add_theme_support('customize-selective-refresh-widgets');

    // Navigation Menus
    register_nav_menus(array(
        'primary'  => esc_html__('منوی اصلی سربرگ (Primary Header)', 'sedrazavi'),
        'footer'   => esc_html__('منوی دسترسی سریع فوتر (Footer Menu)', 'sedrazavi'),
        'services' => esc_html__('منوی خدمات حقوقی (Legal Services)', 'sedrazavi'),
    ));
}
add_action('after_setup_theme', 'sedrazavi_theme_setup');
}

/**
 * 2. Enqueue Scripts & Styles
 */
if (!function_exists('sedrazavi_enqueue_assets')) {
function sedrazavi_enqueue_assets() {
    // 1. Web font Vazirmatn via CDN with graceful fallback
    wp_enqueue_style(
        'sedrazavi-vazirmatn-font',
        'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css',
        array(),
        '33.003'
    );

    // 2. Main Theme Stylesheet
    wp_enqueue_style(
        'sedrazavi-main-style',
        get_stylesheet_uri(),
        array(),
        SEDRAZAVI_THEME_VERSION
    );

    // 3. Theme JS Engine
    wp_enqueue_script(
        'sedrazavi-theme-bundle',
        SEDRAZAVI_THEME_URI . '/assets/js/main.js',
        array(),
        SEDRAZAVI_THEME_VERSION,
        true
    );

    // Localize Script for AJAX actions
    wp_localize_script('sedrazavi-theme-bundle', 'sedrazavi_ajax_obj', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('sedrazavi_security_nonce'),
        'strings'  => array(
            'success_booking' => esc_html__('درخواست رزرو شما با موفقیت ثبت شد.', 'sedrazavi'),
            'error_booking'   => esc_html__('خطایی رخ داد؛ لطفاً دوباره تلاش فرمایید.', 'sedrazavi'),
            'tracking_found'  => esc_html__('پرونده با موفقیت شناسایی شد.', 'sedrazavi'),
        )
    ));

    // 4. Automated React SPA Engine (موتور اتوماسیون ۱۰۰٪ خودکار اجرای ری‌اکت در وردپرس)
    $react_css = SEDRAZAVI_THEME_DIR . '/dist/index.css';
    $react_js  = SEDRAZAVI_THEME_DIR . '/dist/index.js';

    if (file_exists($react_css) && file_exists($react_js)) {
        wp_enqueue_style(
            'sedrazavi-react-bundle-style',
            SEDRAZAVI_THEME_URI . '/dist/index.css',
            array(),
            filemtime($react_css)
        );
        wp_enqueue_script(
            'sedrazavi-react-bundle-app',
            SEDRAZAVI_THEME_URI . '/dist/index.js',
            array(),
            filemtime($react_js),
            true
        );

        wp_localize_script('sedrazavi-react-bundle-app', 'SedRazaviWPConfig', array(
            'siteUrl'    => home_url(),
            'ajaxUrl'    => admin_url('admin-ajax.php'),
            'themeUri'   => SEDRAZAVI_THEME_URI,
            'nonce'      => wp_create_nonce('sedrazavi_security_nonce'),
            'isLoggedIn' => is_user_logged_in(),
            'siteTitle'  => get_bloginfo('name'),
            'siteDesc'   => get_bloginfo('description'),
        ));
    }
}
add_action('wp_enqueue_scripts', 'sedrazavi_enqueue_assets');
}

/**
 * 3. Safe Module Inclusions (Protected against Missing Files)
 */
$required_modules = array(
    'inc/setup.php',
    'inc/theme-options.php',
    'inc/security.php',
    'inc/ux-improvements.php',
    'inc/case-management.php',
    'inc/booking.php',
    'inc/dashboard.php',
    'inc/elementor-widgets.php',
    'inc/class-sedrazavi-updater.php',
    'inc/advanced-backup.php',
    'inc/analytics-reports.php',
    'inc/user-roles.php',
    'inc/educational-tour.php',
    'inc/integrations.php',
    'inc/arbitration-cpt.php',
    'inc/precedents-cpt.php',
    'inc/legal-vault-deadlines.php',
    'inc/corporate-international.php',
    'inc/class-sedrazavi-dashboard.php',
    'inc/class-sedrazavi-client-portal.php',
    'inc/class-sedrazavi-calculators.php',
    'inc/class-sedrazavi-elementor.php',
    'inc/class-sedrazavi-security.php',
    'inc/react-shortcodes.php',
    'includes/class-sedrazavi-auth-dual-mode.php',
    'includes/class-sedrazavi-dual-panel-unified.php',
    'includes/class-sedrazavi-admin-protection.php',
    'includes/class-sedrazavi-design-tokens.php',
    'includes/class-sedrazavi-elementor-widgets.php',
    'includes/class-sedrazavi-payment-adapter.php',
);

foreach ($required_modules as $mod) {
    $file_path = SEDRAZAVI_THEME_DIR . '/' . $mod;
    if (file_exists($file_path)) {
        require_once $file_path;
    }
}
