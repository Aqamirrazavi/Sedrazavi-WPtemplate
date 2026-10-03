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

// 1. If Universal Elementor Addon Suite is present, defer directly to the standalone suite
if (class_exists('\UniversalElementorSuite\Plugin')) {
    // Standalone Suite is loaded, no duplicate registration needed.
    return;
}

// 2. Fallback loader when standalone plugin is not yet active
if (!function_exists('sedrazavi_addons_register_elementor_category')) {
    function sedrazavi_addons_register_elementor_category($elements_manager) {
        if (!class_exists('\Elementor\Plugin')) {
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

if (!function_exists('sedrazavi_addons_load_elementor_widgets')) {
    function sedrazavi_addons_load_elementor_widgets($widgets_manager) {
        if (!class_exists('\Elementor\Widget_Base')) {
            return;
        }

        // Bridge to load standalone suite if available in wp-content/plugins
        $standalone_suite = WP_PLUGIN_DIR . '/elementor-addon-suite/elementor-addon-suite.php';
        if (file_exists($standalone_suite)) {
            require_once $standalone_suite;
            return;
        }
    }
}
add_action('elementor/widgets/register', 'sedrazavi_addons_load_elementor_widgets', 20);
add_action('elementor/widgets/widgets_registered', 'sedrazavi_addons_load_elementor_widgets', 20);
