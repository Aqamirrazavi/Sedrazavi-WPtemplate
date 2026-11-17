<?php
/**
 * Elementor Widgets Integrator & Universal Suite Bridge
 *
 * @package SedRazavi_Addons
 * @version 3.0.0
 * @author Seyed Amir Hossein Razavi Fardoei (@sedrazavi)
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. Canonical Elementor Suite Check — defer directly to UniversalElementorSuite\Plugin at runtime hook evaluation
// (Checked inside hooks rather than at include time so plugin activation order does not matter)

// 2. Fallback category registration only when standalone Universal Suite is inactive
if (!function_exists('sedrazavi_addons_register_elementor_category')) {
    function sedrazavi_addons_register_elementor_category($elements_manager) {
        if (!class_exists('\Elementor\Plugin') || class_exists('\UniversalElementorSuite\Plugin')) {
            return;
        }
        $elements_manager->add_category(
            'sedrazavi-law-elements',
            array(
                'title' => esc_html__('المان‌های تخصصی حقوقی SedRazavi', 'sedrazavi-addons'),
                'icon'  => 'fa fa-gavel',
            )
        );
    }
}
add_action('elementor/elements/categories_registered', 'sedrazavi_addons_register_elementor_category');

// Do NOT lazily require_once elementor-addon-suite inside widget registration hooks or register deprecated widgets_registered.
if (!function_exists('sedrazavi_addons_missing_suite_notice')) {
    function sedrazavi_addons_missing_suite_notice() {
        if (
            class_exists('\UniversalElementorSuite\Plugin') ||
            class_exists('Universal_Elementor_Addon_Suite') ||
            !did_action('elementor/loaded') ||
            !current_user_can('activate_plugins')
        ) {
            return;
        }
        printf(
            '<div class="notice notice-info is-dismissible"><p>%s</p></div>',
            esc_html__('افزونه SedRazavi Addons از شورت‌کدهای تخصصی پشتیبانی می‌کند. برای ویجت‌های بصری المنتور، افزونه مستقل «Universal Elementor Addon Suite» را فعال نمایید.', 'sedrazavi-addons')
        );
    }
}
add_action('admin_notices', 'sedrazavi_addons_missing_suite_notice');
