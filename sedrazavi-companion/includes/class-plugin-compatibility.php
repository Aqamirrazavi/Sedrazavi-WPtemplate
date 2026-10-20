<?php
/**
 * SedRazavi OS - Zero-Conflict Plugin Interoperability & Compatibility Engine
 * Location: sedrazavi-companion/includes/class-plugin-compatibility.php
 *
 * Ensures smooth coexistence with Yoast SEO, Rank Math, WP Rocket,
 * LiteSpeed Cache, Digits OTP, Elementor, and Gutenberg.
 *
 * @package SedRazavi_Companion
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Plugin_Compatibility {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        add_action('init', [$this, 'configure_cache_exclusions']);
        add_filter('sedrazavi_enable_native_schema', [$this, 'maybe_disable_native_schema']);
        add_filter('rocket_clean_domain_urls', [$this, 'rocket_cache_exclusions']);
    }

    /**
     * Check if third-party SEO plugin is active
     */
    public static function is_third_party_seo_active() {
        if (defined('WPSEO_VERSION')) { // Yoast SEO
            return 'yoast';
        }
        if (class_exists('RankMath')) { // Rank Math
            return 'rankmath';
        }
        if (function_exists('seopress_init')) { // SEOPress
            return 'seopress';
        }
        return false;
    }

    /**
     * Deactivate duplicate native JSON-LD schemas if Yoast or Rank Math is present
     */
    public function maybe_disable_native_schema($enabled) {
        if (self::is_third_party_seo_active()) {
            return false;
        }
        return $enabled;
    }

    /**
     * Exclude SedRazavi REST API endpoints and dynamic states from LiteSpeed & WP Rocket caching
     */
    public function configure_cache_exclusions() {
        // 1. LiteSpeed Cache Exclusions
        if (defined('LSCWP_V')) {
            do_action('litespeed_control_set_nocache', 'SedRazavi dynamic state');
        }

        // 2. Add global JS Config object with nonce and endpoint
        add_action('wp_head', function() {
            ?>
            <script id="sedrazavi-zero-conflict-config">
                window.SedRazaviConfig = window.SedRazaviConfig || {
                    restUrl: "<?php echo esc_url_raw(rest_url('sedrazavi/v1/')); ?>",
                    nonce: "<?php echo wp_create_nonce('wp_rest'); ?>",
                    isUserLoggedIn: <?php echo is_user_logged_in() ? 'true' : 'false'; ?>,
                    siteUrl: "<?php echo esc_url(home_url('/')); ?>",
                    seoPlugin: "<?php echo esc_js(self::is_third_party_seo_active() ?: 'none'); ?>"
                };
            </script>
            <?php
        }, 1);
    }

    /**
     * Exclude REST routes from WP Rocket minify & cache
     */
    public function rocket_cache_exclusions($urls) {
        $urls[] = '/wp-json/sedrazavi/(.*)';
        return $urls;
    }
}
