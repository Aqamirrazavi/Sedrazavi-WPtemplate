<?php
/**
 * SedRazavi 8 Custom Elementor Pro Widgets Suite
 * Specification: Part 20 - Elementor Category, Widgets Registration & Dynamic Controls
 *
 * @package SedRazavi
 * @subpackage Elementor
 * @version 2.9.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Elementor_Widgets {

    public static function init() {
        add_action('elementor/elements/categories_registered', [__CLASS__, 'register_category']);
        add_action('elementor/widgets/register', [__CLASS__, 'register_widgets']);
    }

    /**
     * Register Custom "SedRazavi Law" Elementor Category
     */
    public static function register_category($elements_manager) {
        $elements_manager->add_category(
            'sedrazavi-law',
            [
                'title' => '⚖️ ویجت‌های اختصاصی وکالت SedRazavi',
                'icon'  => 'fa fa-gavel',
            ]
        );
    }

    /**
     * Register the 8 Legal Widgets
     */
    public static function register_widgets($widgets_manager) {
        $widget_files = [
            'widget-hero-luxury.php'    => '\SedRazavi_Widget_Hero_Luxury',
            'widget-lawyer-bio.php'      => '\SedRazavi_Widget_Lawyer_Bio',
            'widget-services-grid.php'   => '\SedRazavi_Widget_Services_Grid',
            'widget-booking-form.php'    => '\SedRazavi_Widget_Booking_Form',
            'widget-case-tracker.php'    => '\SedRazavi_Widget_Case_Tracker',
            'widget-tariff-calc.php'     => '\SedRazavi_Widget_Tariff_Calc',
            'widget-testimonials.php'   => '\SedRazavi_Widget_Testimonials',
            'widget-faq-schema.php'      => '\SedRazavi_Widget_FAQ_Schema',
        ];

        $widgets_dir = get_template_directory() . '/elementor-widgets/';

        foreach ($widget_files as $file => $class_name) {
            $file_path = $widgets_dir . $file;
            if (file_exists($file_path)) {
                require_once $file_path;
                if (class_exists($class_name)) {
                    $widgets_manager->register(new $class_name());
                }
            }
        }
    }
}

// Hook into Elementor load
add_action('plugins_loaded', function() {
    if (did_action('elementor/loaded')) {
        SedRazavi_Elementor_Widgets::init();
    }
});