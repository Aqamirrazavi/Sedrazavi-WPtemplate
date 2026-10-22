<?php
/**
 * SedRazavi OS - Resilient Offline-First Queue & Lead Tracking Engine
 * Provides offline form caching, network synchronization, and tokenized guest tracking.
 *
 * Location: sedrazavi-companion/includes/class-offline-queue.php
 * @package SedRazavi_Companion
 * @version 6.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Offline_Queue {

    private static $instance = null;
    const INQUIRY_TABLE = 'designer_inquiries';

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('init', [$this, 'ensure_table_exists']);
        add_action('rest_api_init', [$this, 'register_routes']);
        add_action('send_headers', [$this, 'set_edge_security_headers']);
    }

    public function ensure_table_exists() {
        global $wpdb;
        $table_name = $wpdb->prefix . self::INQUIRY_TABLE;

        if ($wpdb->get_var($wpdb->prepare("SHOW TABLES LIKE %s", $table_name)) !== $table_name) {
            $charset_collate = $wpdb->get_charset_collate();
            $sql = "CREATE TABLE {$table_name} (
                id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
                lead_token varchar(64) NOT NULL,
                client_name varchar(191) NOT NULL,
                contact_handle varchar(191) NOT NULL,
                project_type varchar(64) NOT NULL DEFAULT 'standard',
                scope_details text,
                status varchar(32) NOT NULL DEFAULT 'new',
                ip_hash varchar(64) NOT NULL,
                created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                PRIMARY KEY  (id),
                UNIQUE KEY lead_token (lead_token),
                KEY status_idx (status),
                KEY created_idx (created_at)
            ) {$charset_collate};";

            require_once ABSPATH . 'wp-admin/includes/upgrade.php';
            dbDelta($sql);
        }
    }

    public function register_routes() {
        register_rest_route('sedrazavi/v1', '/inquiry/submit', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_submit_inquiry'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1', '/inquiry/track/(?P<token>[a-zA-Z0-9_-]+)', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_track_inquiry'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function set_edge_security_headers() {
        // Enforce Cache Bypass for dynamic API and track endpoints
        if (isset($_SERVER['REQUEST_URI']) && (strpos($_SERVER['REQUEST_URI'], '/wp-json/sedrazavi/') !== false || strpos($_SERVER['REQUEST_URI'], '/track') !== false)) {
            header('Cache-Control: private, no-store, no-cache, must-revalidate, max-age=0');
            header('Pragma: no-cache');
            header('X-Content-Type-Options: nosniff');
            header('X-Frame-Options: SAMEORIGIN');
            header('Referrer-Policy: strict-origin-when-cross-origin');
        }
    }

    public function rest_submit_inquiry($request) {
        $params = $request->get_json_params() ?: $request->get_params();

        // Honeypot check
        if (!empty($params['website_hp'])) {
            return new WP_Error('spam_detected', __('درخواست نامعتبر است.', 'sedrazavi-companion'), ['status' => 403]);
        }

        $client_name    = sanitize_text_field($params['name'] ?? '');
        $contact_handle = sanitize_text_field($params['contact'] ?? '');
        $project_type   = sanitize_text_field($params['project_type'] ?? 'enterprise');
        $scope_details  = sanitize_textarea_field($params['details'] ?? '');

        if (empty($client_name) || empty($contact_handle)) {
            return new WP_Error('missing_fields', __('نام و اطلاعات تماس الزامی است.', 'sedrazavi-companion'), ['status' => 400]);
        }

        // Salted HMAC of IP for rate limiting
        $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
        $ip_hash = hash_hmac('sha256', $ip, wp_salt('auth'));

        // Generate cryptographically secure guest lead token
        $raw_token  = bin2hex(random_bytes(16));
        $lead_token = hash('sha256', $raw_token);

        global $wpdb;
        $table_name = $wpdb->prefix . self::INQUIRY_TABLE;

        $inserted = $wpdb->insert(
            $table_name,
            [
                'lead_token'     => $lead_token,
                'client_name'    => $client_name,
                'contact_handle' => $contact_handle,
                'project_type'   => $project_type,
                'scope_details'  => $scope_details,
                'status'         => 'new',
                'ip_hash'        => $ip_hash,
                'created_at'     => current_time('mysql'),
            ],
            ['%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s']
        );

        if (!$inserted) {
            return new WP_Error('db_error', __('خطا در ثبت استعلام در پایگاه‌داده.', 'sedrazavi-companion'), ['status' => 500]);
        }

        // Trigger notification event
        do_action('sedrazavi_inquiry_received', [
            'id'             => $wpdb->insert_id,
            'client_name'    => $client_name,
            'contact_handle' => $contact_handle,
            'project_type'   => $project_type,
            'lead_token'     => $lead_token,
        ]);

        return rest_ensure_response([
            'success'    => true,
            'lead_token' => $lead_token,
            'track_url'  => home_url('/track/?token=' . $lead_token),
            'message'    => __('استعلام شما با موفقیت در سیستم SedRazavi ثبت شد و در صف ارزیابی فوری قرار گرفت.', 'sedrazavi-companion'),
        ]);
    }

    public function rest_track_inquiry($request) {
        $token = sanitize_text_field($request->get_param('token'));

        global $wpdb;
        $table_name = $wpdb->prefix . self::INQUIRY_TABLE;

        $row = $wpdb->get_row($wpdb->prepare("SELECT lead_token, client_name, project_type, status, created_at FROM {$table_name} WHERE lead_token = %s", $token));

        if (!$row) {
            return new WP_Error('not_found', __('استعلامی با این کد پیگیری یافت نشد.', 'sedrazavi-companion'), ['status' => 404]);
        }

        $status_labels = [
            'new'         => 'در انتظار بررسی اولیه معمار ارشد',
            'in_progress' => 'در حال تدوین مشخصات فنی و پروپوزال',
            'scheduled'   => 'جلسه آنلاین تنظیم شد',
            'completed'   => 'پروپوزال آماده ارسال است',
        ];

        return rest_ensure_response([
            'success'     => true,
            'client_name' => esc_html($row->client_name),
            'project_type'=> esc_html($row->project_type),
            'status'      => $row->status,
            'status_fa'   => $status_labels[$row->status] ?? 'در حال بررسی',
            'created_at'  => $row->created_at,
            'handle'      => '@sedrazavi',
        ]);
    }
}
