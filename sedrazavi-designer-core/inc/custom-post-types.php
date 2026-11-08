<?php
/**
 * Custom Post Types for SedRazavi Designer Core
 *
 * Registers portfolio and services CPTs with 100% Elementor editor support.
 *
 * @package SedRazavi_Designer_Core
 * @version 1.0.0
 */

namespace SedRazaviDesignerCore;

if (!defined('ABSPATH')) {
    exit;
}

class Custom_Post_Types {
    public static function init() {
        add_action('init', [__CLASS__, 'register_cpts']);
        add_action('init', [__CLASS__, 'add_elementor_support']);
    }

    public static function register_cpts() {
        // 1. Portfolio CPT
        register_post_type('portfolio', [
            'labels' => [
                'name'               => __('نمونه‌کارها', 'sedrazavi-designer-core'),
                'singular_name'      => __('نمونه‌کار', 'sedrazavi-designer-core'),
                'add_new'            => __('افزودن نمونه‌کار جدید', 'sedrazavi-designer-core'),
                'add_new_item'       => __('افزودن نمونه‌کار', 'sedrazavi-designer-core'),
                'edit_item'          => __('ویرایش نمونه‌کار', 'sedrazavi-designer-core'),
                'view_item'          => __('مشاهده نمونه‌کار', 'sedrazavi-designer-core'),
                'search_items'       => __('جستجوی نمونه‌کارها', 'sedrazavi-designer-core'),
                'not_found'          => __('نمونه‌کاری پیدا نشد', 'sedrazavi-designer-core'),
            ],
            'public'       => true,
            'has_archive'  => true,
            'show_in_rest' => true,
            'menu_icon'    => 'dashicons-portfolio',
            'supports'     => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'elementor'],
            'rewrite'      => ['slug' => 'projects'],
        ]);

        register_taxonomy('portfolio_category', 'portfolio', [
            'labels' => [
                'name'          => __('دسته‌بندی نمونه‌کارها', 'sedrazavi-designer-core'),
                'singular_name' => __('دسته‌بندی نمونه‌کار', 'sedrazavi-designer-core'),
            ],
            'hierarchical' => true,
            'public'       => true,
            'show_in_rest' => true,
            'rewrite'      => ['slug' => 'project-category'],
        ]);

        // 2. Services CPT
        register_post_type('services', [
            'labels' => [
                'name'          => __('خدمات استودیو', 'sedrazavi-designer-core'),
                'singular_name' => __('خدمت', 'sedrazavi-designer-core'),
                'add_new_item'  => __('افزودن خدمت جدید', 'sedrazavi-designer-core'),
                'edit_item'     => __('ویرایش خدمت', 'sedrazavi-designer-core'),
            ],
            'public'       => true,
            'has_archive'  => true,
            'show_in_rest' => true,
            'menu_icon'    => 'dashicons-superhero-alt',
            'supports'     => ['title', 'editor', 'thumbnail', 'excerpt', 'elementor'],
            'rewrite'      => ['slug' => 'all-services'],
        ]);

        // 3. System Configuration CPT (SSOT for Master Config, Snapshots & Version Hash)
        register_post_type('sedrazavi_config', [
            'labels' => [
                'name'          => __('پیکربندی سیستم و اسنپ‌شات‌ها', 'sedrazavi-designer-core'),
                'singular_name' => __('پیکربندی سیستم', 'sedrazavi-designer-core'),
            ],
            'public'       => false,
            'show_ui'      => true,
            'show_in_menu' => false,
            'show_in_rest' => true,
            'supports'     => ['title', 'editor', 'custom-fields', 'revisions'],
            'can_export'   => true,
        ]);
    }

    public static function add_elementor_support() {
        // Ensure Elementor activates on custom post types
        $supported = get_option('elementor_cpt_support', ['post', 'page']);
        $changed = false;
        foreach (['portfolio', 'services'] as $cpt) {
            if (!in_array($cpt, $supported, true)) {
                $supported[] = $cpt;
                $changed = true;
            }
        }
        if ($changed) {
            update_option('elementor_cpt_support', $supported);
        }
    }
}

Custom_Post_Types::init();
