<?php
/**
 * The front page template file for SedRazavi Universal WordPress Suite
 * Dynamically routes to the chosen archetype or page content.
 *
 * @package SedRazavi
 * @version 6.0.0
 */

// Resolve archetype from query parameter (sandboxed), theme option, or active child theme
$archetype = isset($_GET['archetype']) ? sanitize_text_field(wp_unslash($_GET['archetype'])) : get_option('sedrazavi_active_archetype', 'agency-designer');

$current_theme = wp_get_theme();
$parent_or_child = $current_theme->get('Template');
if (!empty($parent_or_child)) {
    $stylesheet = get_stylesheet();
    if (strpos($stylesheet, 'store') !== false) {
        $archetype = 'store-modern';
    } elseif (strpos($stylesheet, 'corporate') !== false) {
        $archetype = 'corporate-pro';
    } elseif (strpos($stylesheet, 'lawyer') !== false || strpos($stylesheet, 'legal') !== false) {
        $archetype = 'legal-firm';
    } elseif (strpos($stylesheet, 'agency') !== false) {
        $archetype = 'agency-designer';
    }
}

$archetype_template_map = array(
    'agency-designer' => 'template-designer-landing',
    'corporate-pro'   => 'template-home-corporate-pro',
    'store-modern'    => 'template-store-showcase',
    'legal-firm'      => 'template-home-saas-master',
);
$elementor_fallback_slug = isset($archetype_template_map[$archetype]) ? $archetype_template_map[$archetype] : 'template-designer-landing';

// سازگاری اول با المنتور (Elementor-First Rendering) — با بازگشت ایمن در صورت غیرفعال بودن المنتور
if (did_action('elementor/loaded') && class_exists('\Elementor\Plugin')) {
    if (function_exists('sedrazavi_try_render_elementor_page_content') && sedrazavi_try_render_elementor_page_content($elementor_fallback_slug)) {
        return;
    }
    if (have_posts()) {
        while (have_posts()) {
            the_post();
            $elementor_data = get_post_meta(get_the_ID(), '_elementor_data', true);
            $elementor_mode = get_post_meta(get_the_ID(), '_elementor_edit_mode', true);
            if (!empty($elementor_data) && $elementor_mode === 'builder') {
                get_header();
                the_content();
                get_footer();
                return;
            }
        }
        rewind_posts();
    }
}

// بارگذاری سربرگ استاندارد وردپرس (هدر، منوها و متادیتا)
get_header();

// Load corresponding archetype front-page fallback template when Elementor is inactive or no template exists
switch ($archetype) {
    case 'store-modern':
        get_template_part('template-parts/front', 'store');
        break;
    case 'corporate-pro':
        get_template_part('template-parts/front', 'corporate');
        break;
    case 'legal-firm':
        get_template_part('template-parts/front', 'legal');
        break;
    case 'agency-designer':
    default:
        get_template_part('template-parts/front', 'agency');
        break;
}

get_footer();
