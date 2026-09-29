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
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-hammer',
        'supports'           => array('title', 'editor', 'custom-fields', 'author'),
        'capability_type'    => 'post',
        'show_in_rest'       => true,
    );

    register_post_type('arbitration_case', $args);
}
add_action('init', 'sedrazavi_register_arbitration_cpt');
