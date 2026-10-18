<?php
/**
 * SedRazavi Legal Firm Child Theme Functions
 *
 * @package SedRazavi_Child_Legal
 * @version 5.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style('sedrazavi-parent-style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style(
        'sedrazavi-child-legal-style',
        get_stylesheet_directory_uri() . '/style.css',
        ['sedrazavi-parent-style'],
        '5.0.0'
    );
}, 20);

add_action('after_switch_theme', function() {
    update_option('sedrazavi_active_archetype', 'legal-firm');
    update_option('sedrazavi_header_style', 'frosted-glass');
    update_option('sedrazavi_footer_style', 'modern-cards');
    update_option('sedrazavi_vector_canvas', 'solid-minimal');
});
