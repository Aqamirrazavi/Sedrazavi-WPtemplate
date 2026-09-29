<?php
/**
 * SedRazavi 12 Admin Pages Protection & Anti-Leak Suite
 * Specification: Part 18 - Hide Admin Pages, SEO Noindex, 404 Disguise, UI Mode Filter
 *
 * @package SedRazavi
 * @subpackage Security
 * @version 2.9.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Admin_Protection {

    /**
     * The 12 Protected Admin Slugs (Specified in Part 18)
     */
    private static $protected_slugs = [
        'templates',           // 1. Elementor / Theme Templates
        'architecture',        // 2. System Architecture
        'security',            // 3. Security Audits & Hardening
        'shortcodes',          // 4. Shortcode Library & Generator
        'download-zip',        // 5. ZIP Theme Downloader
        'docs',                // 6. Technical Documentation
        'system-status',       // 7. Server & PHP Health Status
        'backup',              // 8. DB & Dossier Backup
        'logs',                // 9. Error & Audit Logs
        'analytics',           // 10. Financial & Client Analytics
        'advanced-settings',   // 11. Core Advanced Settings
        'debug',               // 12. Query & Memory Profiler
    ];

    public static function init() {
        add_action('template_redirect', [__CLASS__, 'guard_protected_pages']);
        add_action('wp_head', [__CLASS__, 'inject_noindex_for_protected_pages'], 1);
        add_filter('wp_nav_menu_objects', [__CLASS__, 'filter_menu_items_by_ui_mode'], 10, 2);
        add_filter('robots_txt', [__CLASS__, 'add_robots_disallow_rules'], 10, 2);
    }

    /**
     * Intercept visitor requests to the 12 protected pages
     */
    public static function guard_protected_pages() {
        if (!is_page()) {
            return;
        }

        global $post;
        $slug = $post->post_name ?? '';

        if (in_array($slug, self::$protected_slugs, true)) {
            // Check if current user is logged-in Administrator
            if (!current_user_can('manage_options')) {
                // Return clean 404 disguise - do NOT reveal existence of page
                global $wp_query;
                $wp_query->set_404();
                status_header(404);
                nocache_headers();
                include(get_query_template('404'));
                exit;
            }
        }
    }

    /**
     * Inject strict noindex, nofollow, noarchive tags
     */
    public static function inject_noindex_for_protected_pages() {
        if (!is_page()) {
            return;
        }

        global $post;
        $slug = $post->post_name ?? '';

        if (in_array($slug, self::$protected_slugs, true) || is_page(['lawyer-portal', 'client-portal'])) {
            echo '<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />' . PHP_EOL;
            echo '<meta name="googlebot" content="noindex, nofollow" />' . PHP_EOL;
        }
    }

    /**
     * Hide admin-only links from front-end menus when UI Mode is 'public'
     */
    public static function filter_menu_items_by_ui_mode($items, $args) {
        $uiMode = get_option('sedrazavi_ui_mode', 'public');

        if ($uiMode === 'public' && !current_user_can('manage_options')) {
            foreach ($items as $key => $item) {
                foreach (self::$protected_slugs as $slug) {
                    if (strpos($item->url, '/' . $slug . '/') !== false || strpos($item->url, $slug) !== false) {
                        unset($items[$key]);
                        break;
                    }
                }
            }
        }

        return $items;
    }

    /**
     * Add Disallow lines to virtual robots.txt
     */
    public static function add_robots_disallow_rules($output, $public) {
        $output .= PHP_EOL . "# SedRazavi 12 Protected Admin Routes" . PHP_EOL;
        foreach (self::$protected_slugs as $slug) {
            $output .= "Disallow: /" . $slug . "/" . PHP_EOL;
        }
        $output .= "Disallow: /lawyer-portal/" . PHP_EOL;
        $output .= "Disallow: /client-portal/" . PHP_EOL;
        return $output;
    }
}

SedRazavi_Admin_Protection::init();