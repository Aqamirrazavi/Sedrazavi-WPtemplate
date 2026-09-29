<?php
/**
 * SedRazavi Deep Plugin Integrations Engine
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. WooCommerce Compatibility
add_action('after_setup_theme', function() {
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
});

// 2. Yoast SEO / Rank Math Breadcrumbs
if (!function_exists('sedrazavi_breadcrumbs')) {
function sedrazavi_breadcrumbs() {
    if (function_exists('rank_math_the_breadcrumbs')) {
        rank_math_the_breadcrumbs();
    } elseif (function_exists('yoast_breadcrumb')) {
        yoast_breadcrumb('<div id="breadcrumbs" class="text-xs text-gray-400 py-3">', '</div>');
    }
}
}

// 3. WP Rocket & Cache Optimization Hooks
add_action('sedrazavi_after_booking_created', function($booking_id) {
    if (function_exists('rocket_clean_domain')) {
        rocket_clean_domain();
    }
});
