<?php
/**
 * Local Persian Font System for SedRazavi Designer Theme & Ecosystem
 *
 * Provides 100% self-hosted, sovereign, CDN-free font loading for Vazirmatn (and IRANSans fallback).
 * Guarantees zero downtime, offline capability, zero external Google Fonts calls,
 * and high-priority WOFF2 preloading.
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

namespace SedRazaviDesigner;

if (!defined('ABSPATH')) {
    exit;
}

class Local_Font_Loader {

    private static $instance = null;

    public static function instance() {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        // 1. High-priority font preloading in <head>
        add_action('wp_head', [$this, 'render_font_preloads'], 1);

        // 2. Output critical inline @font-face CSS
        add_action('wp_head', [$this, 'render_inline_font_face'], 2);

        // 3. Dequeue external CDN and Google Fonts to protect against connection hangs
        add_action('wp_enqueue_scripts', [$this, 'block_external_fonts'], 9999);
        add_filter('style_loader_src', [$this, 'filter_external_font_urls'], 9999, 2);

        // 4. Register local Vazirmatn inside Elementor Typography control dropdown
        add_filter('elementor/fonts/groups', [$this, 'register_elementor_font_group']);
        add_filter('elementor/fonts/additional_fonts', [$this, 'register_elementor_additional_fonts']);
    }

    /**
     * Preload primary WOFF2 font files for lightning-fast First Contentful Paint (FCP)
     */
    public function render_font_preloads() {
        $font_dir_uri = get_template_directory_uri() . '/assets/fonts/';
        ?>
        <!-- Local Sovereign Persian Fonts: High-Priority Preload (Zero-CDN) -->
        <link rel="preload" href="<?php echo esc_url($font_dir_uri . 'Vazirmatn-Regular.woff2'); ?>" as="font" type="font/woff2" crossorigin="anonymous">
        <link rel="preload" href="<?php echo esc_url($font_dir_uri . 'Vazirmatn-Bold.woff2'); ?>" as="font" type="font/woff2" crossorigin="anonymous">
        <?php
    }

    /**
     * Render self-hosted @font-face with font-display: swap and local system fallbacks
     */
    public function render_inline_font_face() {
        $font_dir_uri = get_template_directory_uri() . '/assets/fonts/';
        ?>
        <style id="sedrazavi-local-fonts-critical">
        @font-face {
            font-family: 'Vazirmatn';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('Vazirmatn Regular'), local('Vazirmatn-Regular'), local('Vazir'), local('IRANSans'),
                 url('<?php echo esc_url($font_dir_uri . 'Vazirmatn-Regular.woff2'); ?>') format('woff2');
        }
        @font-face {
            font-family: 'Vazirmatn';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: local('Vazirmatn Medium'), local('Vazirmatn-Medium'), local('Vazir Medium'), local('IRANSans Medium'),
                 url('<?php echo esc_url($font_dir_uri . 'Vazirmatn-Medium.woff2'); ?>') format('woff2');
        }
        @font-face {
            font-family: 'Vazirmatn';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: local('Vazirmatn Bold'), local('Vazirmatn-Bold'), local('Vazir Bold'), local('IRANSans Bold'),
                 url('<?php echo esc_url($font_dir_uri . 'Vazirmatn-Bold.woff2'); ?>') format('woff2');
        }
        :root {
            --sr-font-family: 'Vazirmatn', 'IRANSans', system-ui, -apple-system, 'Segoe UI', Tahoma, sans-serif;
            --sr-font-mono: 'JetBrains Mono', 'Courier New', monospace;
        }
        body, button, input, select, textarea {
            font-family: var(--sr-font-family);
        }
        </style>
        <?php
    }

    /**
     * Dequeue Google Fonts or CDN font dependencies from WordPress
     */
    public function block_external_fonts() {
        $external_handles = [
            'open-sans',
            'roboto',
            'lato',
            'google-fonts',
            'elementor-google-fonts',
            'twentytwentyone-fonts',
            'twenty-twenty-two-fonts',
        ];

        foreach ($external_handles as $handle) {
            wp_dequeue_style($handle);
            wp_deregister_style($handle);
        }
    }

    /**
     * Filter external Google/CDN font URLs to prevent network timeout in restricted conditions
     */
    public function filter_external_font_urls($src, $handle) {
        if (strpos($src, 'fonts.googleapis.com') !== false || strpos($src, 'fonts.gstatic.com') !== false) {
            return false;
        }
        return $src;
    }

    /**
     * Register local Persian font group in Elementor
     */
    public function register_elementor_font_group($groups) {
        $groups['sedrazavi_local_fonts'] = esc_html__('فونت‌های محلی بومی (سیدرضوی)', 'sedrazavi-designer');
        return $groups;
    }

    /**
     * Register Vazirmatn in Elementor typography dropdown
     */
    public function register_elementor_additional_fonts($fonts) {
        $fonts['Vazirmatn'] = 'sedrazavi_local_fonts';
        $fonts['IRANSans']  = 'sedrazavi_local_fonts';
        return $fonts;
    }
}

// Initialize loader
Local_Font_Loader::instance();
