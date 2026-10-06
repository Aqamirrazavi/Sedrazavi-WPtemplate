<?php
/**
 * Custom Post Type: Supreme Court Precedents (آرای وحدت رویه دیوان عالی کشور)
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_register_precedents_cpt')) {
function sedrazavi_register_precedents_cpt() {
    $labels = array(
        'name'                  => 'آرای وحدت رویه و نظرات مشورتی',
        'singular_name'         => 'رأی وحدت رویه',
        'menu_name'             => 'بانک آرای قضایی',
        'all_items'             => 'کلیه آرای وحدت رویه',
        'add_new_item'          => 'افزودن رأی جدید',
        'edit_item'             => 'ویرایش رأی وحدت رویه',
        'view_item'             => 'مشاهده رأی وحدت رویه',
        'search_items'          => 'جستجوی آرای وحدت رویه',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-book-alt',
        'supports'           => array('title', 'editor', 'excerpt', 'custom-fields'),
        'capability_type'    => 'post',
        'show_in_rest'       => true,
    );

    register_post_type('legal_precedent', $args);

    // تاکسونومی دسته‌بندی موضوعی
    register_taxonomy('precedent_category', 'legal_precedent', array(
        'label'        => 'شاخه حقوقی',
        'rewrite'      => array('slug' => 'precedent-category'),
        'hierarchical' => true,
        'show_in_rest' => true,
    ));
}
add_action('init', 'sedrazavi_register_precedents_cpt');
}
