<?php
/**
 * SedRazavi OS - Atomic Disaster Recovery & Snapshot Engine
 * Location: sedrazavi-companion/includes/class-snapshot-engine.php
 *
 * @package SedRazavi_Companion
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Snapshot_Engine {

    const SNAPSHOT_TABLE = 'sr_snapshots';
    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        add_action('init', [$this, 'maybe_create_table']);
        add_action('sedrazavi_before_recipe_import', [$this, 'create_preflight_snapshot'], 10, 2);
        add_action('wp_ajax_sedrazavi_rollback_snapshot', [$this, 'ajax_rollback']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
    }

    /**
     * Create database table for snapshots if it doesn't exist
     */
    public function maybe_create_table() {
        global $wpdb;
        $table_name = $wpdb->prefix . self::SNAPSHOT_TABLE;

        $charset_collate = $wpdb->get_charset_collate();
        $sql = "CREATE TABLE IF NOT EXISTS {$table_name} (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            snapshot_key varchar(100) NOT NULL,
            recipe_slug varchar(100) NOT NULL,
            payload longtext NOT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            PRIMARY KEY (id),
            KEY snapshot_key (snapshot_key),
            KEY recipe_slug (recipe_slug)
        ) {$charset_collate};";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    /**
     * Create a pre-flight snapshot before recipe or demo import
     */
    public function create_preflight_snapshot($recipe_slug = 'default', $affected_entities = []) {
        global $wpdb;
        $table_name = $wpdb->prefix . self::SNAPSHOT_TABLE;

        $snapshot_data = [
            'theme_mods'     => get_theme_mods(),
            'show_on_front'  => get_option('show_on_front'),
            'page_on_front'  => get_option('page_on_front'),
            'active_archetype' => get_option('sedrazavi_active_archetype', 'agency-designer'),
            'sedrazavi_opts' => get_option('sedrazavi_os_settings', []),
            'elementor_opts' => get_option('elementor_active_kit', ''),
            'timestamp'      => current_time('mysql'),
            'recipe_slug'    => sanitize_key($recipe_slug),
            'affected'       => $affected_entities,
        ];

        $wpdb->insert(
            $table_name,
            [
                'snapshot_key' => 'pre_' . sanitize_key($recipe_slug) . '_' . time(),
                'recipe_slug'  => sanitize_key($recipe_slug),
                'payload'      => wp_json_encode($snapshot_data),
                'created_at'   => current_time('mysql'),
            ],
            ['%s', '%s', '%s', '%s']
        );

        return $wpdb->insert_id;
    }

    /**
     * Get recent snapshots
     */
    public function get_recent_snapshots($limit = 10) {
        global $wpdb;
        $table_name = $wpdb->prefix . self::SNAPSHOT_TABLE;
        return $wpdb->get_results($wpdb->prepare("SELECT id, snapshot_key, recipe_slug, created_at FROM {$table_name} ORDER BY id DESC LIMIT %d", $limit), ARRAY_A);
    }

    /**
     * AJAX handler to rollback a snapshot
     */
    public function ajax_rollback() {
        check_ajax_referer('sedrazavi_admin_nonce', 'security');
        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('دسترسی غیرمجاز است.', 'sedrazavi-companion')]);
        }

        $snapshot_id = isset($_POST['snapshot_id']) ? absint($_POST['snapshot_id']) : 0;
        $result = $this->rollback($snapshot_id);

        if (is_wp_error($result)) {
            wp_send_json_error(['message' => $result->get_error_message()]);
        }

        wp_send_json_success(['message' => __('بازگشت به نقطه امن و اسنپ‌شات قبلی با موفقیت انجام شد.', 'sedrazavi-companion')]);
    }

    /**
     * Perform rollback to specified snapshot ID
     */
    public function rollback($snapshot_id) {
        global $wpdb;
        $table_name = $wpdb->prefix . self::SNAPSHOT_TABLE;

        $row = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table_name} WHERE id = %d", $snapshot_id));
        if (!$row) {
            return new WP_Error('not_found', __('اسنپ‌شات موردنظر یافت نشد.', 'sedrazavi-companion'));
        }

        $data = json_decode($row->payload, true);
        if (empty($data)) {
            return new WP_Error('invalid_payload', __('داده‌های اسنپ‌شات معتبر نیستند.', 'sedrazavi-companion'));
        }

        // 1. Restore Theme Mods
        if (!empty($data['theme_mods']) && is_array($data['theme_mods'])) {
            $theme_slug = get_stylesheet();
            update_option("theme_mods_{$theme_slug}", $data['theme_mods']);
        }

        // 2. Restore Front Page options
        if (isset($data['show_on_front'])) {
            update_option('show_on_front', $data['show_on_front']);
        }
        if (isset($data['page_on_front'])) {
            update_option('page_on_front', $data['page_on_front']);
        }
        if (isset($data['active_archetype'])) {
            update_option('sedrazavi_active_archetype', $data['active_archetype']);
        }

        // 3. Restore SedRazavi OS settings
        if (!empty($data['sedrazavi_opts'])) {
            update_option('sedrazavi_os_settings', $data['sedrazavi_opts']);
        }

        // 4. Clear cache
        if (class_exists('\Elementor\Plugin')) {
            \Elementor\Plugin::$instance->files_manager->clear_cache();
        }

        return true;
    }

    /**
     * Register REST API routes for atomic rollback and snapshot list
     */
    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/snapshots', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_snapshots'],
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ]);

        register_rest_route('sedrazavi/v1', '/rollback', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_rollback'],
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ]);
    }

    public function rest_get_snapshots($request) {
        return rest_ensure_response([
            'success'   => true,
            'snapshots' => $this->get_recent_snapshots(),
        ]);
    }

    public function rest_rollback($request) {
        $snapshot_id = absint($request->get_param('snapshot_id'));
        $result = $this->rollback($snapshot_id);

        if (is_wp_error($result)) {
            return new WP_Error('rollback_failed', $result->get_error_message(), ['status' => 400]);
        }

        return rest_ensure_response([
            'success' => true,
            'message' => 'بازگردانی اسنپ‌شات با موفقیت انجام شد.',
        ]);
    }
}
