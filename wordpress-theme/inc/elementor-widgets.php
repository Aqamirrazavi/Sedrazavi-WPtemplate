<?php
/**
 * SedRazavi Elementor Integration & Universal Suite Bridge
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. If Universal Elementor Addon Suite is present, defer to it directly
if (class_exists('\UniversalElementorSuite\Plugin')) {
    return;
}

/**
 * Register Category fallback if standalone suite is not active
 */
if (!function_exists('sedrazavi_register_elementor_category')) {
    function sedrazavi_register_elementor_category($elements_manager) {
        if (!did_action('elementor/loaded') || class_exists('\UniversalElementorSuite\Plugin')) {
            return;
        }
        $elements_manager->add_category(
            'sedrazavi-law-elements',
            array(
                'title' => esc_html__('المان‌های تخصصی حقوقی سید رضوی', 'sedrazavi'),
                'icon'  => 'fa fa-balance-scale',
            )
        );
    }
    add_action('elementor/elements/categories_registered', 'sedrazavi_register_elementor_category');
}
