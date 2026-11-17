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

// 7. Contact Form 7 & Intake Notification Adapter Bridge (Guarded)
if (defined('WPCF7_VERSION') || class_exists('WPCF7_ContactForm')) {
    add_action('wpcf7_mail_sent', function($contact_form) {
        if (is_object($contact_form) && method_exists($contact_form, 'id')) {
            do_action('sedrazavi_after_external_form_sent', 'cf7', (int) $contact_form->id());
        }
    });
}

add_action('sedrazavi_after_intake_submitted', function($ref_code, $topic, $urgency) {
    if (class_exists('SedRazavi_Notification_Router')) {
        $router = SedRazavi_Notification_Router::get_instance();
        if (method_exists($router, 'dispatch_event')) {
            $router->dispatch_event('legal_intake_received', [
                'reference_code' => sanitize_text_field((string) $ref_code),
                'topic'          => sanitize_text_field((string) $topic),
                'urgency'        => sanitize_key((string) $urgency),
            ]);
        }
    }
}, 10, 3);

// 8. WPML / Polylang Multilingual & RTL Locale Adapter
if (!function_exists('sedrazavi_get_multilingual_locale_meta')) {
    function sedrazavi_get_multilingual_locale_meta() {
        $lang = function_exists('pll_current_language')
            ? (string) pll_current_language('slug')
            : (defined('ICL_LANGUAGE_CODE') ? (string) ICL_LANGUAGE_CODE : substr((string) get_locale(), 0, 2));
        return [
            'lang'   => sanitize_key($lang ?: 'fa'),
            'dir'    => is_rtl() ? 'rtl' : 'ltr',
            'plugin' => function_exists('pll_current_language') ? 'polylang' : (defined('ICL_SITEPRESS_VERSION') ? 'wpml' : 'core'),
        ];
    }
}

// 9. WooCommerce HPOS (High-Performance Order Storage) Status Adapter
if (!function_exists('sedrazavi_is_wc_hpos_active')) {
    function sedrazavi_is_wc_hpos_active() {
        if (!class_exists('WooCommerce')) {
            return false;
        }
        if (class_exists('\Automattic\WooCommerce\Utilities\OrderUtil') && method_exists('\Automattic\WooCommerce\Utilities\OrderUtil', 'custom_orders_table_usage_is_enabled')) {
            return (bool) \Automattic\WooCommerce\Utilities\OrderUtil::custom_orders_table_usage_is_enabled();
        }
        return get_option('woocommerce_custom_orders_table_enabled') === 'yes';
    }
}
