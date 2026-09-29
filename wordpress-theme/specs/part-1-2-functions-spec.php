<?php
/**
 * SedRazavi Law Firm Theme Functions & Definitions
 *
 * @package SedRazavi
 * @version 2.8.5
 */

if (!defined('ABSPATH')) exit;

define('SEDRAZAVI_VERSION', '2.8.5');
define('SEDRAZAVI_DIR', get_template_directory());
define('SEDRAZAVI_URI', get_template_directory_uri());

/**
 * Theme Setup: Textdomain, Title Tag, Post Thumbnails, Nav Menus
 */
function sedrazavi_theme_setup() {
    load_theme_textdomain('sedrazavi-lawyer', SEDRAZAVI_DIR . '/languages');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('align-wide');
    add_theme_support('responsive-embeds');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 240,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    register_nav_menus(array(
        'primary_menu'   => __('منوی اصلی ناوبری حقوقی', 'sedrazavi-lawyer'),
        'mobile_menu'    => __('منوی موبایل و دسترسی سریع', 'sedrazavi-lawyer'),
        'footer_col_1'   => __('فوتر - حوزه‌های تخصصی وکالت', 'sedrazavi-lawyer'),
        'footer_col_2'   => __('فوتر - سامانه‌ها و میز محاسبات', 'sedrazavi-lawyer'),
    ));
}
add_action('after_setup_theme', 'sedrazavi_theme_setup');

/**
 * Enqueue Scripts & Styles
 */
function sedrazavi_enqueue_scripts() {
    wp_enqueue_style('sedrazavi-fonts', 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css', array(), '33.003');
    wp_enqueue_style('sedrazavi-theme-style', get_stylesheet_uri(), array('sedrazavi-fonts'), SEDRAZAVI_VERSION);
    
    wp_enqueue_script('sedrazavi-theme-core', SEDRAZAVI_URI . '/assets/js/theme-core.js', array('jquery'), SEDRAZAVI_VERSION, true);
    wp_localize_script('sedrazavi-theme-core', 'sedrazaviData', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('sedrazavi_public_nonce'),
        'gold_color' => '#D4AF37',
    ));
}
add_action('wp_enqueue_scripts', 'sedrazavi_enqueue_scripts');

/**
 * Custom Post Types: Legal Services, Cases, Verdicts, Defense Petitions
 */
function sedrazavi_register_custom_post_types() {
    // 1. Legal Services (خدمات و حوزه‌های وکالت)
    register_post_type('legal_service', array(
        'labels' => array(
            'name'          => __('خدمات تخصصی وکالت', 'sedrazavi-lawyer'),
            'singular_name' => __('خدمت وکالت', 'sedrazavi-lawyer'),
            'add_new_item'  => __('افزودن حوزه تخصصی جدید', 'sedrazavi-lawyer'),
        ),
        'public'       => true,
        'has_archive'  => true,
        'show_in_rest' => true,
        'supports'     => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'menu_icon'    => 'dashicons-shield',
        'rewrite'      => array('slug' => 'legal-services'),
    ));

    // 2. Legal Precedents & Verdicts (آراء و دادنامه‌های موفق)
    register_post_type('court_verdict', array(
        'labels' => array(
            'name'          => __('دادنامه‌ها و آراء موفق', 'sedrazavi-lawyer'),
            'singular_name' => __('دادنامه حقوقی', 'sedrazavi-lawyer'),
        ),
        'public'       => true,
        'has_archive'  => true,
        'show_in_rest' => true,
        'supports'     => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon'    => 'dashicons-awards',
        'rewrite'      => array('slug' => 'verdicts'),
    ));
}
add_action('init', 'sedrazavi_register_custom_post_types');
