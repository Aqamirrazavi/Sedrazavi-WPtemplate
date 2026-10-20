<?php
/**
 * SedRazavi News & Editorial Child Theme Functions
 *
 * @package SedRazavi_Child_News
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
        'sedrazavi-news-style',
        get_stylesheet_uri(),
        ['sedrazavi-parent-style'],
        wp_get_theme()->get('Version')
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
