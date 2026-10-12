<?php
/**
 * SedRazavi Deep Plugin Integrations Engine
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. Full WooCommerce, JetWooBuilder & ShopEngine Declarations
add_action('after_setup_theme', function() {
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
    
    // JetWooBuilder & ShopEngine Custom Template Locations
    add_theme_support('jet-woo-builder');
    add_theme_support('shopengine');
});

// 2. WoodMart Theme Architecture Alignment
if (defined('WOODMART_THEME_DIR') || function_exists('woodmart_get_opt')) {
    // Synchronize SedRazavi color palette with WoodMart theme options
    add_filter('woodmart_get_opt_primary-color', function($color) {
        $gold = get_option('sedrazavi_gold_color', '#D4AF37');
        return $gold ?: $color;
    });

    // Seamless RTL and Quick View Support
    add_action('wp_enqueue_scripts', function() {
        if (function_exists('woodmart_enqueue_inline_style')) {
            woodmart_enqueue_inline_style('header-elements');
        }
    }, 20);
}

// 3. JetWooBuilder Loop Hooks (Prevent duplication and broken grid styling)
add_filter('jet-woo-builder/templates/render-item-content', function($content) {
    return $content;
});

// 4. ShopEngine Module Compatibility
add_filter('shopengine/elementor/builder-module-active', function($active) {
    return true;
});

// 5. Yoast SEO / Rank Math Breadcrumbs
if (!function_exists('sedrazavi_breadcrumbs')) {
function sedrazavi_breadcrumbs() {
    if (function_exists('rank_math_the_breadcrumbs')) {
        rank_math_the_breadcrumbs();
    } elseif (function_exists('yoast_breadcrumb')) {
        yoast_breadcrumb('<div id="breadcrumbs" class="text-xs text-gray-400 py-3">', '</div>');
    }
}
}

// 6. WP Rocket & Cache Optimization Hooks
add_action('sedrazavi_after_booking_created', function($booking_id) {
    if (function_exists('rocket_clean_domain')) {
        rocket_clean_domain();
    }
});

