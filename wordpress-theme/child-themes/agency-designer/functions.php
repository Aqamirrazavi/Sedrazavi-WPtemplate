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
    wp_enqueue_style('sedrazavi-parent-style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style(
        'sedrazavi-child-agency-style',
        get_stylesheet_directory_uri() . '/style.css',
        ['sedrazavi-parent-style'],
        '5.0.0'
    );
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
