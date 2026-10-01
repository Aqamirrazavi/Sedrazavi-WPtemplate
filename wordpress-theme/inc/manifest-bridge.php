<?php
/**
 * SedRazavi Manifest Bridge & Idempotent Page Setup
 *
 * Automatically provisions and synchronizes WordPress pages based on manifest.json
 * using native post_meta without ACF or any 3rd party plugins.
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Manifest_Bridge {

    const OPTION_HASH_KEY = 'sedrazavi_manifest_pages_hash';

    /**
     * Initialize Bridge
     */
    public static function init() {
        add_action('after_switch_theme', array(__CLASS__, 'sync_pages_idempotent'));
        add_action('admin_init', array(__CLASS__, 'check_and_sync'));
        add_action('wp_loaded', array(__CLASS__, 'register_post_meta_fields'));
    }

    /**
     * Get Manifest Data
     */
    public static function get_manifest() {
        $manifest_path = SEDRAZAVI_THEME_DIR . '/manifest.json';
        if (!file_exists($manifest_path)) {
            $manifest_path = get_template_directory() . '/manifest.json';
        }
        if (!file_exists($manifest_path)) {
            return null;
        }

        $content = file_get_contents($manifest_path);
        $data = json_decode($content, true);
        return is_array($data) ? $data : null;
    }

    /**
     * Check if manifest changed and sync if needed
     */
    public static function check_and_sync() {
        $manifest = self::get_manifest();
        if (!$manifest) {
            return;
        }

        $current_hash = isset($manifest['manifest_hash']) ? $manifest['manifest_hash'] : md5(wp_json_encode($manifest));
        $saved_hash   = get_option(self::OPTION_HASH_KEY, '');

        if ($current_hash !== $saved_hash) {
            self::sync_pages_idempotent();
        }
    }

    /**
     * Idempotent Page Synchronizer
     */
    public static function sync_pages_idempotent() {
        $manifest = self::get_manifest();
        if (!$manifest || empty($manifest['routes'])) {
            return false;
        }

        $current_hash = isset($manifest['manifest_hash']) ? $manifest['manifest_hash'] : md5(wp_json_encode($manifest));

        foreach ($manifest['routes'] as $route) {
            $slug     = sanitize_title($route['slug']);
            $title    = sanitize_text_field($route['title']);
            $template = sanitize_text_field($route['template']);

            // Skip homepage if front-page.php handles it directly
            if ($slug === 'home') {
                continue;
            }

            // Check if page already exists (idempotency check)
            $existing_page = get_page_by_path($slug);

            if (!$existing_page) {
                // Also search by title or meta
                $query = new WP_Query(array(
                    'post_type'      => 'page',
                    'meta_key'       => '_sedrazavi_manifest_slug',
                    'meta_value'     => $slug,
                    'posts_per_page' => 1,
                    'post_status'    => 'any',
                ));
                if ($query->have_posts()) {
                    $existing_page = $query->posts[0];
                }
            }

            $page_id = 0;

            if ($existing_page) {
                $page_id = $existing_page->ID;
            } else {
                $page_id = wp_insert_post(array(
                    'post_title'   => $title,
                    'post_name'    => $slug,
                    'post_status'  => 'publish',
                    'post_type'    => 'page',
                    'post_author'  => 1,
                    'post_content' => sprintf('<!-- SedRazavi Manifest Page: %s -->', esc_html($title)),
                ));
            }

            if ($page_id && !is_wp_error($page_id)) {
                // Assign template
                update_post_meta($page_id, '_wp_page_template', $template);
                update_post_meta($page_id, '_sedrazavi_manifest_slug', $slug);

                // Populate default content fields as native post_meta
                if (!empty($route['fields']) && is_array($route['fields'])) {
                    foreach ($route['fields'] as $key => $default_val) {
                        $meta_key = '_sedrazavi_field_' . sanitize_key($key);
                        // Only set if not already modified
                        $existing_meta = get_post_meta($page_id, $meta_key, true);
                        if ($existing_meta === '') {
                            update_post_meta($page_id, $meta_key, sanitize_text_field($default_val));
                        }
                    }
                }
            }
        }

        // Save hash so we don't re-run redundantly
        update_option(self::OPTION_HASH_KEY, $current_hash);
        return true;
    }

    /**
     * Register post meta keys for REST & native schema
     */
    public static function register_post_meta_fields() {
        $manifest = self::get_manifest();
        if (!$manifest || empty($manifest['routes'])) {
            return;
        }

        foreach ($manifest['routes'] as $route) {
            if (!empty($route['fields']) && is_array($route['fields'])) {
                foreach ($route['fields'] as $key => $val) {
                    $meta_key = '_sedrazavi_field_' . sanitize_key($key);
                    register_post_meta('page', $meta_key, array(
                        'show_in_rest' => true,
                        'single'       => true,
                        'type'         => 'string',
                        'auth_callback' => function() {
                            return current_user_can('edit_pages');
                        }
                    ));
                }
            }
        }
    }
}

SedRazavi_Manifest_Bridge::init();
