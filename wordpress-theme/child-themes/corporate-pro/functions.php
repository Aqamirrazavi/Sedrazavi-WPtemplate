<?php
/**
 * SedRazavi Corporate Pro Child Theme Functions
 *
 * @package SedRazavi_Child_Corporate
 * @version 5.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style('sedrazavi-parent-style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style(
        'sedrazavi-child-corporate-style',
        get_stylesheet_directory_uri() . '/style.css',
        ['sedrazavi-parent-style'],
        '5.0.0'
    );
}, 20);

add_action('after_switch_theme', function() {
    update_option('sedrazavi_active_archetype', 'corporate-pro');
    update_option('sedrazavi_header_style', 'mega-menu');
    update_option('sedrazavi_footer_style', 'directory-newsletter');
    update_option('sedrazavi_vector_canvas', 'aurora-blur');
});
