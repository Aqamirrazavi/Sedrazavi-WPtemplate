<?php
/**
 * SedRazavi Agency Designer Child Theme Functions
 *
 * @package SedRazavi_Child_Agency
 * @version 5.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. Enqueue parent & child theme assets
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style('sedrazavi-agency-theme-style', get_stylesheet_uri(), [], '6.0.0');
}, 20);

// 2. Set default template & options for Designer Landing
add_action('after_switch_theme', function() {
    update_option('sedrazavi_active_archetype', 'agency-designer');
    update_option('sedrazavi_header_style', 'minimal-landing');
    update_option('sedrazavi_footer_style', 'modern-cards');
    update_option('sedrazavi_vector_canvas', 'cyber-mesh');
});

// 3. Register Agency Designer custom Gutenberg block pattern categories
add_action('init', function() {
    if (function_exists('register_block_pattern_category')) {
        register_block_pattern_category(
            'sedrazavi-agency',
            ['label' => __('طراحی وب و آژانس (Agency Portfolio)', 'sedrazavi-child-agency')]
        );
    }
});

// Standalone theme features
add_action('after_setup_theme', function() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('align-wide');
    add_theme_support('responsive-embeds');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
});

// Load Universal Frontend Management Cockpit
if (file_exists(get_template_directory() . '/inc/frontend-cockpit-engine.php')) {
    require_once get_template_directory() . '/inc/frontend-cockpit-engine.php';
} elseif (file_exists(dirname(get_template_directory()) . '/inc/frontend-cockpit-engine.php')) {
    require_once dirname(get_template_directory()) . '/inc/frontend-cockpit-engine.php';
}
