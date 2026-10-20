<?php
/**
 * SedRazavi OS - Security & Compliance Audit Logger
 * Location: sedrazavi-companion/includes/class-audit-logger.php
 *
 * Manages database table sr_audit_logs for tracking critical actions
 * (theme modifications, price changes, module toggles, role updates).
 *
 * @package SedRazavi_Companion
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Audit_Logger {

    private static $instance = null;
    const TABLE_NAME = 'sr_audit_logs';

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        add_action('init', [$this, 'ensure_table_exists']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_action('updated_option', [$this, 'log_option_update'], 10, 3);
    }

    /**
     * Ensure database table exists
     */
    public function ensure_table_exists() {
        global $wpdb;
        $table = $wpdb->prefix . self::TABLE_NAME;

        if ($wpdb->get_var("SHOW TABLES LIKE '{$table}'") !== $table) {
            require_once ABSPATH . 'wp-admin/includes/upgrade.php';
            $charset_collate = $wpdb->get_charset_collate();

            $sql = "CREATE TABLE {$table} (
                id bigint(20) NOT NULL AUTO_INCREMENT,
                user_id bigint(20) DEFAULT 0 NOT NULL,
                action varchar(100) NOT NULL,
                object_type varchar(60) NOT NULL,
                object_id varchar(100) DEFAULT '' NOT NULL,
                details text NULL,
                ip_address varchar(45) NOT NULL,
                created_at datetime NOT NULL,
                PRIMARY KEY (id),
                KEY action (action),
                KEY created_at (created_at)
            ) {$charset_collate};";

            dbDelta($sql);
        }
    }

    /**
     * Record an audit log entry
     */
    public static function log($action, $object_type = 'system', $object_id = '', $details = []) {
        global $wpdb;
        $table = $wpdb->prefix . self::TABLE_NAME;

        $ip = '127.0.0.1';
        if (!empty($_SERVER['REMOTE_ADDR'])) {
            $ip = sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR']));
        }

        $user_id = get_current_user_id() ?: 0;

        $wpdb->insert($table, [
            'user_id'     => $user_id,
            'action'      => sanitize_key($action),
            'object_type' => sanitize_key($object_type),
            'object_id'   => sanitize_text_field((string)$object_id),
            'details'     => !empty($details) ? wp_json_encode($details) : null,
            'ip_address'  => $ip,
            'created_at'  => current_time('mysql'),
        ]);

        return $wpdb->insert_id;
    }

    /**
     * Automatically log critical option changes
     */
    public function log_option_update($option, $old_value, $value) {
        $critical_options = [
            'sedrazavi_os_settings',
            'sedrazavi_active_archetype',
            'active_plugins',
            'users_can_register',
            'default_role',
        ];

        if (in_array($option, $critical_options, true)) {
            self::log('option_updated', 'option', $option, [
                'option' => $option,
                'time'   => current_time('mysql'),
            ]);
        }
    }

    /**
     * Get recent logs
     */
    public static function get_logs($limit = 50) {
        global $wpdb;
        $table = $wpdb->prefix . self::TABLE_NAME;
        if ($wpdb->get_var("SHOW TABLES LIKE '{$table}'") !== $table) {
            return [];
        }

        return $wpdb->get_results(
            $wpdb->prepare("SELECT * FROM {$table} ORDER BY id DESC LIMIT %d", $limit),
            ARRAY_A
        );
    }

    /**
     * Register REST API routes
     */
    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/audit-logs', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_logs'],
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ]);
    }

    public function rest_get_logs($request) {
        $limit = min(100, absint($request->get_param('limit') ?: 30));
        return rest_ensure_response([
            'success' => true,
            'logs'    => self::get_logs($limit),
        ]);
    }
}
