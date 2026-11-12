<?php
/**
 * SedRazavi News & Editorial Standalone Parent Theme Functions
 *
 * @package SedRazavi_Child_News
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style(
        'sedrazavi-news-theme-style',
        get_stylesheet_uri(),
        [],
        '6.0.0'
    );
}, 20);

// Reading time calculator helper for news editorial
if (!function_exists('sedrazavi_reading_time')) {
    function sedrazavi_reading_time($post_id = null) {
        $content = get_post_field('post_content', $post_id ?: get_the_ID());
        $word_count = count(preg_split('/\s+/u', wp_strip_all_tags($content)));
        $minutes = max(1, ceil($word_count / 200));
        return sprintf(__('%d دقیقه مطالعه', 'sedrazavi-child-news'), $minutes);
    }
}

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
