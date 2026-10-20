<?php
/**
 * SedRazavi Education Child Theme Functions
 *
 * @package SedRazavi_Child_Education
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style(
        'sedrazavi-parent-style',
        get_template_directory_uri() . '/style.css',
        [],
        wp_get_theme()->parent() ? wp_get_theme()->parent()->get('Version') : '6.0.0'
    );

    wp_enqueue_style(
        'sedrazavi-education-child-style',
        get_stylesheet_uri(),
        ['sedrazavi-parent-style'],
        wp_get_theme()->get('Version')
    );
}, 20);
