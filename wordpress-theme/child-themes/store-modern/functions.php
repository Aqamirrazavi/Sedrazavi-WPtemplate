<?php
/**
 * SedRazavi Store Modern Child Theme Functions
 *
 * @package SedRazavi_Child_Store
 * @version 5.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style('sedrazavi-parent-style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style(
        'sedrazavi-child-store-style',
        get_stylesheet_directory_uri() . '/style.css',
        ['sedrazavi-parent-style'],
        '5.0.0'
    );
}, 20);

add_action('after_switch_theme', function() {
    update_option('sedrazavi_active_archetype', 'store-modern');
    update_option('sedrazavi_header_style', 'frosted-glass');
    update_option('sedrazavi_footer_style', 'directory-newsletter');
    update_option('sedrazavi_vector_canvas', 'isometric-grid');
});
