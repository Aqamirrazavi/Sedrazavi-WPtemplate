<?php
/**
 * SedRazavi Elementor Widgets Integration (Part 9)
 * Compatible with Elementor 3.20+
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('SedRazavi_Elementor_Widgets_Manager')) {
class SedRazavi_Elementor_Widgets_Manager {

    public static function init() {
        add_action('elementor/elements/categories_registered', [__CLASS__, 'register_category']);
        add_action('elementor/widgets/register', [__CLASS__, 'register_widgets']);
    }

    public static function register_category($elements_manager) {
        $elements_manager->add_category(
            'sedrazavi-category',
            [
                'title' => __('المان‌های وکالت دکتر سیده مریم رضوی', 'sedrazavi'),
                'icon'  => 'fa fa-gavel',
            ]
        );
    }

    public static function register_widgets($widgets_manager) {
        // ثبت ویجت‌های تخصصی
        // ۱. استعلام آنلاین پرونده
        // ۲. میز محاسبات قضایی
        // ۳. بنر اسلایدر متنی
        // ۴. باکس افتخارات و آمار وکالت
    }
}

SedRazavi_Elementor_Widgets_Manager::init();
}