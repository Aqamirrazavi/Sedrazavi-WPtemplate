<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Observability Hub & Interaction Monitor
 *
 * Provides real-time tracking of landing page leads, widget interactions,
 * query performance metrics, and administrative security audit logs.
 *
 * @package Universal_Elementor_Suite
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */
class Observability_Hub {

    private static $_instance = null;

    const LEADS_OPTION_KEY = 'uas_captured_leads_vault';
    const AUDIT_OPTION_KEY = 'uas_security_audit_logs';

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_action('wp_ajax_uas_track_lead', [$this, 'ajax_track_lead']);
        add_action('wp_ajax_nopriv_uas_track_lead', [$this, 'ajax_track_lead']);
    }

    /**
     * Register REST API routes
     */
    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/observability/stats', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_stats'],
            'permission_callback' => [$this, 'check_admin_permission'],
        ]);

        register_rest_route('sedrazavi/v1', '/observability/leads', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_leads'],
            'permission_callback' => [$this, 'check_admin_permission'],
        ]);
    }

    public function check_admin_permission() {
        return current_user_can('manage_options');
    }

    /**
     * Record a newly captured lead from hero or CTA widgets safely
     *
     * @param string $phone
     * @param string $source
     * @return bool
     */
    public function record_lead($phone, $source = 'hero_split') {
        $sanitized_phone = preg_replace('/[^0-9+]/', '', $phone);
        if (strlen($sanitized_phone) < 8) {
            return false;
        }

        $leads = get_option(self::LEADS_OPTION_KEY, []);
        if (!is_array($leads)) {
            $leads = [];
        }

        // Anonymize IP address for privacy compliance
        $raw_ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '127.0.0.1';
        $anonymized_ip = function_exists('wp_privacy_anonymize_ip') ? wp_privacy_anonymize_ip($raw_ip) : '***.***.***.***';

        $lead_item = [
            'id'        => uniqid('lead_'),
            'phone'     => $sanitized_phone,
            'source'    => sanitize_key($source),
            'timestamp' => current_time('mysql'),
            'ip'        => $anonymized_ip,
            'status'    => 'new',
        ];

        array_unshift($leads, $lead_item);
        // Keep maximum 200 recent leads in option
        if (count($leads) > 200) {
            $leads = array_slice($leads, 0, 200);
        }

        update_option(self::LEADS_OPTION_KEY, $leads, false);
        $this->log_audit_event('lead_capture', "دریافت درخواست لید جدید از منبع: {$source}");

        return true;
    }

    /**
     * Log an administrative security or system audit event
     */
    public function log_audit_event($event_type, $message) {
        $logs = get_option(self::AUDIT_OPTION_KEY, []);
        if (!is_array($logs)) {
            $logs = [];
        }

        $log_entry = [
            'time'       => current_time('mysql'),
            'type'       => sanitize_key($event_type),
            'message'    => sanitize_text_field($message),
            'user'       => is_user_logged_in() ? wp_get_current_user()->user_login : 'anonymous',
        ];

        array_unshift($logs, $log_entry);
        if (count($logs) > 100) {
            $logs = array_slice($logs, 0, 100);
        }

        update_option(self::AUDIT_OPTION_KEY, $logs, false);
    }

    /**
     * AJAX endpoint: Track lead submission
     */
    public function ajax_track_lead() {
        $phone  = isset($_POST['phone']) ? sanitize_text_field($_POST['phone']) : '';
        $source = isset($_POST['source']) ? sanitize_key($_POST['source']) : 'widget_cta';

        if (empty($phone)) {
            wp_send_json_error(['message' => 'شماره تماس الزامی است.']);
        }

        $success = $this->record_lead($phone, $source);
        if ($success) {
            wp_send_json_success(['message' => 'درخواست شما با موفقیت ثبت شد.']);
        } else {
            wp_send_json_error(['message' => 'فرمت شماره معتبر نیست.']);
        }
    }

    /**
     * REST endpoint: Get leads list
     */
    public function rest_get_leads($request) {
        $leads = get_option(self::LEADS_OPTION_KEY, []);
        return rest_ensure_response([
            'success' => true,
            'total'   => count($leads),
            'leads'   => $leads,
        ]);
    }

    /**
     * REST endpoint: Get observability performance stats
     */
    public function rest_get_stats($request) {
        $leads = get_option(self::LEADS_OPTION_KEY, []);
        $logs  = get_option(self::AUDIT_OPTION_KEY, []);

        return rest_ensure_response([
            'success' => true,
            'summary' => [
                'total_leads_captured' => count($leads),
                'total_audit_events'   => count($logs),
                'php_version'          => PHP_VERSION,
                'memory_usage'         => size_format(memory_get_usage(true)),
                'cache_status'         => wp_using_ext_object_cache() ? 'External Object Cache' : 'WordPress Transients',
            ],
            'recent_logs' => array_slice($logs, 0, 10),
        ]);
    }
}
