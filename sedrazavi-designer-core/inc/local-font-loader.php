<?php
/**
 * Local Persian Font System for SedRazavi Designer Core
 *
 * Guarantees zero-CDN, offline-resilient Persian font loading across any active WordPress theme.
 *
 * @package SedRazavi_Designer_Core
 * @version 1.0.0
 */

namespace SedRazaviDesignerCore;

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
        add_filter('elementor/fonts/groups', [$this, 'register_elementor_font_group']);
        add_filter('elementor/fonts/additional_fonts', [$this, 'register_elementor_additional_fonts']);
        add_action('wp_enqueue_scripts', [$this, 'block_external_fonts'], 9999);
    }

    public function register_elementor_font_group($groups) {
        $groups['sedrazavi_local_fonts'] = esc_html__('فونت‌های محلی بومی (سیدرضوی)', 'sedrazavi-designer-core');
        return $groups;
    }

    public function register_elementor_additional_fonts($fonts) {
        $fonts['Vazirmatn'] = 'sedrazavi_local_fonts';
        $fonts['IRANSans']  = 'sedrazavi_local_fonts';
        return $fonts;
    }

    public function block_external_fonts() {
        wp_dequeue_style('elementor-google-fonts');
    }
}

Local_Font_Loader::instance();
