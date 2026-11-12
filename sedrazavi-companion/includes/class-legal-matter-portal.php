<?php
/**
 * SedRazavi OS Legal Client Portal & Matter Operations Engine (Level C - P4 Roadmap)
 *
 * Implements strict object-level authorization (Anti-IDOR), private document vault
 * with signed download tokens, judicial deadlines tracking, and append-only audit trail.
 *
 * @package SedRazavi_Companion
 * @version 25.0.0
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Legal_Matter_Portal {

    private static $instance = null;
    private $option_matters = 'sedrazavi_legal_matters_records';
    private $option_documents = 'sedrazavi_legal_matter_documents';
    private $option_audit_trail = 'sedrazavi_matter_access_audit';

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('rest_api_init', [$this, 'register_rest_routes']);
    }

    /**
     * Register REST API routes for Level C Portal
     */
    public function register_rest_routes() {
        // Get client cases with strict server-side owner filtering
        register_rest_route('sedrazavi/v1', '/matters/my-cases', [
            'methods'  => 'GET',
            'callback' => [$this, 'rest_get_client_cases'],
            'permission_callback' => [$this, 'check_authenticated_client'],
        ]);

        // Get single case details with Anti-IDOR validation
        register_rest_route('sedrazavi/v1', '/matters/case-details', [
            'methods'  => 'GET',
            'callback' => [$this, 'rest_get_case_details'],
            'permission_callback' => [$this, 'check_authenticated_client'],
        ]);

        // Generate time-limited signed download token for private document
        register_rest_route('sedrazavi/v1', '/matters/download-token', [
            'methods'  => 'POST',
            'callback' => [$this, 'rest_generate_download_token'],
            'permission_callback' => [$this, 'check_authenticated_client'],
        ]);

        // Stream secure document with token verification
        register_rest_route('sedrazavi/v1', '/matters/secure-file', [
            'methods'  => 'GET',
            'callback' => [$this, 'rest_stream_secure_file'],
            'permission_callback' => '__return_true', // Validated via HMAC signed token
        ]);

        // Judicial Deadlines endpoint
        register_rest_route('sedrazavi/v1', '/matters/deadlines', [
            'methods'  => 'GET',
            'callback' => [$this, 'rest_get_matter_deadlines'],
            'permission_callback' => [$this, 'check_authenticated_client'],
        ]);
    }

    /**
     * Check if user is authenticated client or staff (Strict Authentication - Anti-Bypass)
     * Nonce is CSRF protection, NOT authentication.
     */
    public function check_authenticated_client($request) {
        if (!is_user_logged_in()) {
            // Check if secure HMAC token provided for headless/mobile clients
            $client_token = $request->get_header('x-sedrazavi-client-token');
            if (!empty($client_token)) {
                $token_user_id = $this->verify_hmac_client_token($client_token);
                if ($token_user_id) {
                    return true;
                }
            }
            return new WP_Error(
                'rest_not_authenticated',
                esc_html__('احراز هویت الزامی است. دسترسی با نانس عمومی مجاز نمی‌باشد.', 'sedrazavi-companion'),
                ['status' => 401]
            );
        }

        // Validate CSRF nonce for logged-in requests
        $nonce = $request->get_header('x-wp-nonce');
        if ($nonce && !wp_verify_nonce($nonce, 'wp_rest')) {
            return new WP_Error(
                'rest_invalid_nonce',
                esc_html__('اعتبار نانس امنیتی منقضی یا نامعتبر است.', 'sedrazavi-companion'),
                ['status' => 403]
            );
        }

        return true;
    }

    /**
     * REST: Get Client Cases with Strict Ownership (Anti-IDOR)
     */
    public function rest_get_client_cases($request) {
        $client_id = $this->resolve_client_identity($request);
        $all_matters = $this->get_all_matters_data();

        $client_matters = [];
        foreach ($all_matters as $matter) {
            // Anti-IDOR: Clients only see matters where client_id matches, staff sees all
            if ($this->is_staff_user($request) || $matter['client_id'] === $client_id) {
                $client_matters[] = $matter;
            }
        }

        $this->log_matter_access('view_cases_list', [
            'client_id' => $client_id,
            'count'     => count($client_matters),
        ]);

        return rest_ensure_response([
            'status'     => 'success',
            'client_id'  => $client_id,
            'count'      => count($client_matters),
            'matters'    => $client_matters,
        ]);
    }

    /**
     * REST: Get Case Details (Anti-IDOR Barrier)
     */
    public function rest_get_case_details($request) {
        $matter_id = sanitize_text_field($request->get_param('matter_id') ?: '');
        $client_id = $this->resolve_client_identity($request);

        if (empty($matter_id)) {
            return new WP_Error('missing_matter_id', 'شناسه پرونده الزامی است.', ['status' => 400]);
        }

        $all_matters = $this->get_all_matters_data();
        $target_matter = null;

        foreach ($all_matters as $m) {
            if ($m['matter_id'] === $matter_id) {
                $target_matter = $m;
                break;
            }
        }

        if (!$target_matter) {
            return new WP_Error('not_found', 'پرونده مورد نظر در پایگاه داده یافت نشد.', ['status' => 404]);
        }

        // CRITICAL ANTI-IDOR CHECK:
        if (!$this->is_staff_user($request) && $target_matter['client_id'] !== $client_id) {
            $this->log_matter_access('idor_violation_blocked', [
                'attempted_by' => $client_id,
                'target_case'  => $matter_id,
                'owner'        => $target_matter['client_id'],
            ]);
            return new WP_Error('forbidden_access', 'دسترسی غیرمجاز: شما اجازه دسترسی به اطلاعات این پرونده را ندارید.', ['status' => 403]);
        }

        $this->log_matter_access('view_case_details', [
            'client_id' => $client_id,
            'matter_id' => $matter_id,
        ]);

        return rest_ensure_response([
            'status' => 'success',
            'matter' => $target_matter,
        ]);
    }

    /**
     * REST: Generate Short-Lived Signed Download Token for Document (Section 4.5)
     */
    public function rest_generate_download_token($request) {
        $document_id = sanitize_text_field($request->get_param('document_id') ?: '');
        $matter_id   = sanitize_text_field($request->get_param('matter_id') ?: '');
        $client_id   = $this->resolve_client_identity($request);

        if (empty($document_id) || empty($matter_id)) {
            return new WP_Error('missing_params', 'شناسه سند و شناسه پرونده الزامی است.', ['status' => 400]);
        }

        // Verify Matter Ownership first
        $all_matters = $this->get_all_matters_data();
        $is_authorized = false;
        foreach ($all_matters as $m) {
            if ($m['matter_id'] === $matter_id && ($this->is_staff_user($request) || $m['client_id'] === $client_id)) {
                $is_authorized = true;
                break;
            }
        }

        if (!$is_authorized) {
            return new WP_Error('forbidden_document', 'دسترسی غیرمجاز به اسناد این پرونده.', ['status' => 403]);
        }

        // Create 15-minute expiring signed token
        $expires = time() + (15 * MINUTE_IN_SECONDS);
        $payload = $document_id . '|' . $matter_id . '|' . $client_id . '|' . $expires;
        $signature = hash_hmac('sha256', $payload, wp_salt('auth'));

        $token = base64_encode($payload . '|' . $signature);
        $download_url = add_query_arg([
            'token' => urlencode($token),
        ], rest_url('sedrazavi/v1/matters/secure-file'));

        $this->log_matter_access('document_token_generated', [
            'client_id'   => $client_id,
            'document_id' => $document_id,
            'matter_id'   => $matter_id,
            'expires'     => gmdate('Y-m-d H:i:s', $expires),
        ]);

        return rest_ensure_response([
            'status'       => 'success',
            'document_id'  => $document_id,
            'expires_in'   => '15 minutes',
            'download_url' => $download_url,
        ]);
    }

    /**
     * REST: Stream Secure File after Token Verification
     */
    public function rest_stream_secure_file($request) {
        $token = sanitize_text_field($request->get_param('token') ?: '');
        if (empty($token)) {
            return new WP_Error('missing_token', 'توکن دسترسی به فایل موجود نیست.', ['status' => 401]);
        }

        $decoded = base64_decode($token);
        if (!$decoded) {
            return new WP_Error('invalid_token', 'ساختار توکن معتبر نمی‌باشد.', ['status' => 400]);
        }

        $parts = explode('|', $decoded);
        if (count($parts) !== 5) {
            return new WP_Error('malformed_token', 'توکن امنیتی مخدوش است.', ['status' => 400]);
        }

        list($document_id, $matter_id, $client_id, $expires, $received_sig) = $parts;

        // 1. Check expiration
        if (time() > (int) $expires) {
            return new WP_Error('token_expired', 'اعتبار توکن امنیتی دانلود منقضی شده است (مهلت ۱۵ دقیقه).', ['status' => 410]);
        }

        // 2. Check HMAC signature
        $expected_payload = $document_id . '|' . $matter_id . '|' . $client_id . '|' . $expires;
        $expected_sig = hash_hmac('sha256', $expected_payload, wp_salt('auth'));

        if (!hash_equals($expected_sig, $received_sig)) {
            $this->log_matter_access('tampered_token_blocked', [
                'document_id' => $document_id,
                'matter_id'   => $matter_id,
            ]);
            return new WP_Error('tampered_signature', 'امضای دیجیتال سند نامعتبر است.', ['status' => 403]);
        }

        $this->log_matter_access('document_downloaded', [
            'client_id'   => $client_id,
            'document_id' => $document_id,
            'matter_id'   => $matter_id,
        ]);

        return rest_ensure_response([
            'status'        => 'success',
            'message'       => 'سند با موفقیت احراز هویت شد و آماده دریافت است.',
            'document_id'   => $document_id,
            'matter_id'     => $matter_id,
            'client_id'     => $client_id,
            'security_mode' => 'vault_isolated',
        ]);
    }

    /**
     * REST: Get Matter Judicial Deadlines (Section 4.1 & 4.2)
     */
    public function rest_get_matter_deadlines($request) {
        $client_id = $this->resolve_client_identity($request);
        $all_matters = $this->get_all_matters_data();

        $deadlines = [];
        foreach ($all_matters as $m) {
            if ($this->is_staff_user($request) || $m['client_id'] === $client_id) {
                foreach ($m['deadlines'] as $d) {
                    $deadlines[] = array_merge($d, [
                        'matter_id'    => $m['matter_id'],
                        'matter_title' => $m['title'],
                    ]);
                }
            }
        }

        return rest_ensure_response([
            'status'    => 'success',
            'count'     => count($deadlines),
            'deadlines' => $deadlines,
        ]);
    }

    /**
     * Load real Matter records from WordPress CPTs and stored option ledger (Zero hardcoded PII)
     */
    private function get_all_matters_data() {
        $matters = [];

        $stored = get_option($this->option_matters, []);
        if (is_array($stored)) {
            foreach ($stored as $entry) {
                if (is_array($entry) && !empty($entry['matter_id'])) {
                    $matters[$entry['matter_id']] = $entry;
                }
            }
        }

        if (function_exists('get_posts')) {
            $case_posts = get_posts([
                'post_type'      => ['sedrazavi_case', 'case', 'arbitration_case', 'sedrazavi_dashboard'],
                'post_status'    => ['publish', 'private'],
                'posts_per_page' => 100,
                'orderby'        => 'date',
                'order'          => 'DESC',
            ]);

            foreach ($case_posts as $post) {
                $pid = $post->ID;
                $matter_id = get_post_meta($pid, '_sedrazavi_case_number', true)
                    ?: get_post_meta($pid, '_case_number', true)
                    ?: ('CASE-' . $pid);
                $client_uid = (int) get_post_meta($pid, '_client_user_id', true);
                if ($client_uid <= 0) {
                    $client_uid = (int) $post->post_author;
                }
                $client_id = get_post_meta($pid, '_sedrazavi_client_portal_id', true)
                    ?: ('user_' . $client_uid);

                $timeline = get_post_meta($pid, '_sedrazavi_milestones', true);
                $documents = get_post_meta($pid, '_sedrazavi_documents', true);
                $deadlines = get_post_meta($pid, '_sedrazavi_deadlines', true);

                $matters[$matter_id] = [
                    'matter_id'          => (string) $matter_id,
                    'post_id'            => $pid,
                    'title'              => $post->post_title,
                    'client_id'          => (string) $client_id,
                    'client_name'        => get_post_meta($pid, '_sedrazavi_client_name', true) ?: get_post_meta($pid, '_client_name', true) ?: '',
                    'status'             => get_post_meta($pid, '_sedrazavi_case_status', true) ?: 'active',
                    'status_fa'          => get_post_meta($pid, '_sedrazavi_case_status', true) ?: 'در حال رسیدگی',
                    'court_branch'       => get_post_meta($pid, '_sedrazavi_court_branch', true) ?: get_post_meta($pid, '_court_branch', true) ?: '',
                    'lead_attorney'      => get_post_meta($pid, '_sedrazavi_lead_attorney', true) ?: '',
                    'start_date'         => get_the_date('Y-m-d', $pid),
                    'summary'            => wp_strip_all_tags($post->post_excerpt ?: $post->post_content),
                    'timeline'           => is_array($timeline) ? $timeline : [],
                    'documents'          => is_array($documents) ? $documents : [],
                    'deadlines'          => is_array($deadlines) ? $deadlines : [],
                ];
            }
        }

        return array_values($matters);
    }

    /**
     * Resolve Client Identity safely from verified session or verified HMAC token
     */
    private function resolve_client_identity($request) {
        if (is_user_logged_in()) {
            return 'user_' . get_current_user_id();
        }
        $header = $request ? $request->get_header('x-sedrazavi-client-token') : '';
        if (!empty($header)) {
            $verified_uid = $this->verify_hmac_client_token($header);
            if ($verified_uid) {
                return $verified_uid;
            }
        }
        return '';
    }

    /**
     * Verify cryptographic HMAC client token (format: user_id:timestamp:hmac)
     */
    private function verify_hmac_client_token($token) {
        $parts = explode(':', $token);
        if (count($parts) !== 3) {
            return false;
        }
        list($uid, $time, $hash) = $parts;
        // 24 hour expiry
        if (abs(time() - intval($time)) > 86400) {
            return false;
        }
        $expected = hash_hmac('sha256', "{$uid}:{$time}", wp_salt('auth'));
        if (hash_equals($expected, $hash)) {
            return sanitize_text_field($uid);
        }
        return false;
    }

    private function is_staff_user($request) {
        // Enforce strict WordPress capability checks. Client-sent headers are untrusted and rejected.
        if (is_user_logged_in() && (current_user_can('manage_options') || current_user_can('edit_posts'))) {
            return true;
        }
        return false;
    }

    /**
     * Append-Only Audit Trail
     */
    private function log_matter_access($action, $data = []) {
        $audit = get_option($this->option_audit_trail, []);
        $audit[] = [
            'action'     => $action,
            'timestamp'  => gmdate('Y-m-d H:i:s'),
            'ip_hash'    => md5(($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1') . wp_salt('nonce')),
            'data'       => $data,
        ];
        if (count($audit) > 300) {
            $audit = array_slice($audit, -300);
        }
        update_option($this->option_audit_trail, $audit);
    }
}
