<?php
/**
 * SedRazavi Agency Designer Standalone Parent Theme Functions
 *
 * @package SedRazavi_Child_Agency
 * @version 5.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. Enqueue parent & Standalone Parent Theme assets
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

elseif (file_exists(dirname(get_template_directory()) . '/inc/frontend-cockpit-engine.php')) {
    require_once dirname(get_template_directory()) . '/inc/frontend-cockpit-engine.php';
}

if (!function_exists('sedrazavi_standalone_vertical_slug')) {
    function sedrazavi_standalone_vertical_slug() {
        return 'sedrazavi-agency-theme';
    }
}

if (!function_exists('sedrazavi_standalone_try_render_elementor')) {
    function sedrazavi_standalone_try_render_elementor($fallback_template_slug = '') {
        if (!did_action('elementor/loaded') || !class_exists('\\Elementor\\Plugin')) {
            return false;
        }
        $page_id = function_exists('get_queried_object_id') ? (int) get_queried_object_id() : 0;
        $mode    = $page_id > 0 ? get_post_meta($page_id, '_elementor_edit_mode', true) : '';
        $data    = $page_id > 0 ? get_post_meta($page_id, '_elementor_data', true) : '';
        if ($mode === 'builder' && !empty($data)) {
            echo '<div class="sedrazavi-elementor-migrated-page" data-elementor-source="page">';
            while (have_posts()) {
                the_post();
                the_content();
            }
            echo '</div>';
            return true;
        }
        if (empty($fallback_template_slug)) {
            return false;
        }
        if ($page_id > 0 && function_exists('has_blocks')) {
            $raw = (string) get_post_field('post_content', $page_id);
            if ($raw !== '' && has_blocks($raw)) {
                return false;
            }
        }
        $templates = get_posts([
            'post_type'      => 'elementor_library',
            'post_status'    => 'publish',
            'posts_per_page' => 1,
            'meta_key'       => '_uas_template_slug',
            'meta_value'     => sanitize_key($fallback_template_slug),
        ]);
        if (empty($templates)) {
            return false;
        }
        $instance = \Elementor\Plugin::$instance ?? null;
        if (!$instance || !isset($instance->frontend) || !method_exists($instance->frontend, 'get_builder_content_for_display')) {
            return false;
        }
        echo '<div class="sedrazavi-elementor-migrated-page" data-elementor-source="standalone-kit">';
        echo $instance->frontend->get_builder_content_for_display((int) $templates[0]->ID);
        echo '</div>';
        return true;
    }
}
