<?php
/**
 * SedRazavi Education Standalone Parent Theme Functions
 *
 * @package SedRazavi_Child_Education
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style(
        'sedrazavi-education-theme-style',
        get_stylesheet_uri(),
        [],
        '6.0.0'
    );
}, 20);

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
