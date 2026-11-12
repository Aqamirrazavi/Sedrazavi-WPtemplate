<?php
/**
 * Custom Post Type: Arbitration Cases (پرونده‌های داوری)
 *
 * @package SedRazavi_Law_Firm
 * @version 5.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

function sedrazavi_register_arbitration_cpt() {
    $labels = array(
        'name'                  => 'پرونده‌های داوری',
        'singular_name'         => 'پرونده داوری',
        'menu_name'             => 'مرکز داوری (ODR)',
        'all_items'             => 'کلیه پرونده‌های داوری',
        'add_new_item'          => 'ثبت پرونده داوری جدید',
        'edit_item'             => 'ویرایش پرونده داوری',
        'view_item'             => 'مشاهده پرونده داوری',
        'search_items'          => 'جستجوی پرونده داوری',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => false,
        'publicly_queryable'  => false,
        'exclude_from_search' => true,
        'has_archive'         => false,
        'rewrite'             => false,
        'query_var'           => false,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => false,
        'menu_icon'           => 'dashicons-hammer',
        'supports'            => array('title', 'editor', 'custom-fields', 'author'),
        'capability_type'     => 'post',
        'show_in_rest'        => false,
    );

    register_post_type('arbitration_case', $args);
}
add_action('init', 'sedrazavi_register_arbitration_cpt');
