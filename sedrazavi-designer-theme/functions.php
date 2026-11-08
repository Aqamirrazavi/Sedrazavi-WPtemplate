<?php
/**
 * SedRazavi Designer Theme Functions & Definitions
 *
 * Dedicated standalone theme engine for WordPress No-Code Designers.
 * 100% Native PHP 8.2+, Zero React in Frontend, Elementor Pro Theme Builder Native.
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

define('SEDRAZAVI_DESIGNER_VERSION', '1.0.0');
define('SEDRAZAVI_DESIGNER_DIR', get_template_directory());
define('SEDRAZAVI_DESIGNER_URI', get_template_directory_uri());

// Load Local Sovereign Persian Font System (Zero-CDN, Offline Resilient)
require_once SEDRAZAVI_DESIGNER_DIR . '/inc/local-font-loader.php';

/**
 * 1. Theme Setup & Feature Declarations
 */
function sedrazavi_designer_theme_setup() {
    load_theme_textdomain('sedrazavi-designer', SEDRAZAVI_DESIGNER_DIR . '/languages');

    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('automatic-feed-links');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
    add_theme_support('custom-logo', [
        'height'      => 80,
        'width'       => 280,
        'flex-height' => true,
        'flex-width'  => true,
    ]);

    // Elementor & WooCommerce Support
    add_theme_support('elementor');
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');

    // Register Navigation Menus
    register_nav_menus([
        'primary-menu' => __('منوی اصلی سربرگ نئونی', 'sedrazavi-designer'),
        'footer-menu'  => __('منوی پاورقی و پیوندها', 'sedrazavi-designer'),
    ]);
}
add_action('after_setup_theme', 'sedrazavi_designer_theme_setup');

/**
 * 2. Elementor Theme Builder Locations Registration
 *
 * Provides bidirectional compatibility with Elementor Pro Theme Builder:
 * Allows header, footer, single post, and archive locations to be designed
 * and managed directly inside Elementor Pro.
 */
function sedrazavi_designer_register_elementor_locations($location_manager) {
    $location_manager->register_all_core_location();
}
add_action('elementor/theme/register_locations', 'sedrazavi_designer_register_elementor_locations');

/**
 * Global fallback for elementor_theme_do_location if Elementor Pro is inactive
 */
if (!function_exists('elementor_theme_do_location')) {
    function elementor_theme_do_location($location) {
        if (class_exists('\SedRazaviDesignerCore\Theme_Builder_Bridge')) {
            return \SedRazaviDesignerCore\Theme_Builder_Bridge::instance()->do_location($location);
        }
        return false;
    }
}

/**
 * 3. Enqueue Styles & Scripts (Local, Zero-CDN, Ultra-Lightweight)
 */
function sedrazavi_designer_enqueue_assets() {
    // 66 Color Palettes Engine
    wp_enqueue_style(
        'sedrazavi-palettes',
        SEDRAZAVI_DESIGNER_URI . '/assets/css/palettes.css',
        [],
        SEDRAZAVI_DESIGNER_VERSION
    );

    // Main Theme Stylesheet (includes local Vazirmatn webfont)
    wp_enqueue_style(
        'sedrazavi-style',
        get_stylesheet_uri(),
        ['sedrazavi-palettes'],
        SEDRAZAVI_DESIGNER_VERSION
    );

    // Modern Neon Components & Layout CSS
    if (file_exists(SEDRAZAVI_DESIGNER_DIR . '/assets/css/main.css')) {
        wp_enqueue_style(
            'sedrazavi-main',
            SEDRAZAVI_DESIGNER_URI . '/assets/css/main.css',
            ['sedrazavi-style'],
            SEDRAZAVI_DESIGNER_VERSION
        );
    }

    // Vanilla JS Interaction Controller (Typing, Palette Switch, Drawer)
    if (file_exists(SEDRAZAVI_DESIGNER_DIR . '/assets/js/main.js')) {
        wp_enqueue_script(
            'sedrazavi-main-js',
            SEDRAZAVI_DESIGNER_URI . '/assets/js/main.js',
            [],
            SEDRAZAVI_DESIGNER_VERSION,
            true
        );

        wp_localize_script('sedrazavi-main-js', 'SedRazaviData', [
            'ajax_url'       => admin_url('admin-ajax.php'),
            'nonce'          => wp_create_nonce('sedrazavi_designer_nonce'),
            'default_theme'  => get_option('sedrazavi_default_mode', 'dark'),
            'default_palette'=> get_option('sedrazavi_default_palette', 'dark-01'),
            'is_admin'       => current_user_can('manage_options'),
            'home_url'       => home_url('/'),
        ]);
    }
}
add_action('wp_enqueue_scripts', 'sedrazavi_designer_enqueue_assets');

/**
 * 4. Helper to Output Active Palette & Mode on <html> Tag
 */
function sedrazavi_designer_html_attributes() {
    $mode    = get_option('sedrazavi_default_mode', 'dark');
    $palette = get_option('sedrazavi_default_palette', 'dark-01');
    echo 'data-theme="' . esc_attr($mode) . '" data-palette="' . esc_attr($palette) . '"';
}

/**
 * 5. Native Fallback Navigation Menu
 */
function sedrazavi_designer_fallback_menu() {
    echo '<ul class="sr-nav-links">';
    echo '<li><a href="' . esc_url(home_url('/')) . '">' . esc_html__('صفحه اصلی', 'sedrazavi-designer') . '</a></li>';
    echo '<li><a href="' . esc_url(home_url('/#services')) . '">' . esc_html__('خدمات طراحی', 'sedrazavi-designer') . '</a></li>';
    echo '<li><a href="' . esc_url(home_url('/#portfolio')) . '">' . esc_html__('نمونه‌کارها', 'sedrazavi-designer') . '</a></li>';
    echo '<li><a href="' . esc_url(home_url('/#about')) . '">' . esc_html__('درباره من', 'sedrazavi-designer') . '</a></li>';
    echo '<li><a href="' . esc_url(home_url('/#contact')) . '">' . esc_html__('سفارش پروژه', 'sedrazavi-designer') . '</a></li>';
    echo '</ul>';
}

/**
 * 6. Native Customizer Controls
 */
function sedrazavi_designer_customize_register($wp_customize) {
    // Section: Neon Brand & Identity
    $wp_customize->add_section('sedrazavi_neon_branding', [
        'title'       => esc_html__('تنظیمات نئونی طراح وردپرس (SedRazavi Studio)', 'sedrazavi-designer'),
        'description' => esc_html__('مدیریت هویت بصری، شبکه‌های اجتماعی و اطلاعات تماس طراح', 'sedrazavi-designer'),
        'priority'    => 25,
    ]);

    // Handle Eitaa & Telegram
    $wp_customize->add_setting('sedrazavi_telegram_handle', [
        'default'           => '@sedrazavi',
        'type'              => 'theme_mod',
        'sanitize_callback' => 'sanitize_text_field',
    ]);
    $wp_customize->add_control('sedrazavi_telegram_handle_ctrl', [
        'label'    => esc_html__('آیدی تلگرام', 'sedrazavi-designer'),
        'section'  => 'sedrazavi_neon_branding',
        'settings' => 'sedrazavi_telegram_handle',
        'type'     => 'text',
    ]);

    $wp_customize->add_setting('sedrazavi_eitaa_handle', [
        'default'           => '@sedrazavi',
        'type'              => 'theme_mod',
        'sanitize_callback' => 'sanitize_text_field',
    ]);
    $wp_customize->add_control('sedrazavi_eitaa_handle_ctrl', [
        'label'    => esc_html__('آیدی ایتا', 'sedrazavi-designer'),
        'section'  => 'sedrazavi_neon_branding',
        'settings' => 'sedrazavi_eitaa_handle',
        'type'     => 'text',
    ]);

    // Contact Phone & Email
    $wp_customize->add_setting('sedrazavi_phone', [
        'default'           => '۰۹۱۲۳۴۵۶۷۸۹',
        'type'              => 'theme_mod',
        'sanitize_callback' => 'sanitize_text_field',
    ]);
    $wp_customize->add_control('sedrazavi_phone_ctrl', [
        'label'    => esc_html__('شماره تماس مستقیم', 'sedrazavi-designer'),
        'section'  => 'sedrazavi_neon_branding',
        'settings' => 'sedrazavi_phone',
        'type'     => 'text',
    ]);

    $wp_customize->add_setting('sedrazavi_email', [
        'default'           => 'info@sedrazavi.ir',
        'type'              => 'theme_mod',
        'sanitize_callback' => 'sanitize_email',
    ]);
    $wp_customize->add_control('sedrazavi_email_ctrl', [
        'label'    => esc_html__('ایمیل کاری', 'sedrazavi-designer'),
        'section'  => 'sedrazavi_neon_branding',
        'settings' => 'sedrazavi_email',
        'type'     => 'email',
    ]);
}
add_action('customize_register', 'sedrazavi_designer_customize_register');
