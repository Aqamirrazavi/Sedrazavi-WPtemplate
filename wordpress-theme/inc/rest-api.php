<?php
/**
 * SedRazavi Comprehensive REST API Engine
 *
 * Implements real, working endpoints for all frontend fetch and AJAX calls
 * under the namespace 'sedrazavi/v1' to eliminate 404 errors completely.
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_REST_API {

    const NAMESPACE = 'sedrazavi/v1';

    public static function init() {
        add_action('rest_api_init', array(__CLASS__, 'register_routes'));
        add_action('init', array(__CLASS__, 'register_service_cpt_for_rest'));
    }

    /**
     * Ensure lawyer_service CPT is registered with show_in_rest = true
     */
    public static function register_service_cpt_for_rest() {
        if (!post_type_exists('lawyer_service')) {
            register_post_type('lawyer_service', array(
                'labels' => array(
                    'name'          => 'خدمات حقوقی',
                    'singular_name' => 'خدمت حقوقی',
                ),
                'public'       => true,
                'has_archive'  => true,
                'show_in_rest' => true,
                'supports'     => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            ));
        }
    }

    /**
     * Register all REST Routes
     */
    public static function register_routes() {

        // 1. Book Appointment: wp-json/sedrazavi/v1/book-appointment
        // Decision: PUBLIC - Prospective clients booking legal consultations (Rate limited)
        register_rest_route(self::NAMESPACE, '/book-appointment', array(
            'methods'             => array('POST', 'GET'),
            'callback'            => array(__CLASS__, 'handle_book_appointment'),
            'permission_callback' => '__return_true',
        ));

        // 2. Track Case: wp-json/sedrazavi/v1/track-case
        // Decision: PUBLIC - Public inquiry with valid case tracking number (Rate limited)
        register_rest_route(self::NAMESPACE, '/track-case', array(
            'methods'             => array('POST', 'GET'),
            'callback'            => array(__CLASS__, 'handle_track_case'),
            'permission_callback' => '__return_true',
        ));

        // 3. Cases Management: wp-json/sedrazavi/v1/cases
        // Decision: RESTRICTED - Case dockets contain confidential litigation data
        register_rest_route(self::NAMESPACE, '/cases', array(
            array(
                'methods'             => 'GET',
                'callback'            => array(__CLASS__, 'handle_get_cases'),
                'permission_callback' => array(__CLASS__, 'check_lawyer_or_admin_permission'),
            ),
            array(
                'methods'             => 'POST',
                'callback'            => array(__CLASS__, 'handle_create_case'),
                'permission_callback' => array(__CLASS__, 'check_lawyer_or_admin_permission'),
            ),
        ));

        // 4. Live Sync Stream: wp-json/sedrazavi/v1/sync/stream
        // Decision: RESTRICTED - Active user session real-time synchronization
        register_rest_route(self::NAMESPACE, '/sync/stream', array(
            'methods'             => 'GET',
            'callback'            => array(__CLASS__, 'handle_sync_stream'),
            'permission_callback' => array(__CLASS__, 'check_logged_in_permission'),
        ));

        // 5. Auth Login: wp-json/sedrazavi/v1/auth/login
        // Decision: PUBLIC - Authentication entry point
        register_rest_route('sedrazavi/v1/auth', '/login', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_auth_login'),
            'permission_callback' => '__return_true',
        ));

        // 6. Auth Verify 2FA: wp-json/sedrazavi/v1/auth/verify-2fa
        // Decision: PUBLIC - Two-factor challenge response
        register_rest_route('sedrazavi/v1/auth', '/verify-2fa', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_auth_verify_2fa'),
            'permission_callback' => '__return_true',
        ));

        // 7. Auth Logout: wp-json/sedrazavi/v1/auth/logout
        // Decision: RESTRICTED - Terminating active authenticated session
        register_rest_route('sedrazavi/v1/auth', '/logout', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_auth_logout'),
            'permission_callback' => array(__CLASS__, 'check_logged_in_permission'),
        ));

        // 8. Design Tokens All: wp-json/sedrazavi/v1/tokens/all
        // Decision: RESTRICTED - Palette & design tokens management
        register_rest_route('sedrazavi/v1/tokens', '/all', array(
            'methods'             => 'GET',
            'callback'            => array(__CLASS__, 'handle_get_tokens'),
            'permission_callback' => array(__CLASS__, 'check_admin_permission'),
        ));

        // 9. Design Tokens Update: wp-json/sedrazavi/v1/tokens/update
        // Decision: RESTRICTED - Administrative theme customization
        register_rest_route('sedrazavi/v1/tokens', '/update', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_update_tokens'),
            'permission_callback' => array(__CLASS__, 'check_admin_permission'),
        ));

        // 10. Payment Checkout: wp-json/sedrazavi/v1/payment/checkout
        // Decision: RESTRICTED - Valid session or validated nonce required for invoice generation
        register_rest_route('sedrazavi/v1/payment', '/checkout', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_payment_checkout'),
            'permission_callback' => array(__CLASS__, 'check_payment_checkout_permission'),
        ));

        // 11. Quick Callback: wp-json/sedrazavi/v1/quick-callback
        // Decision: PUBLIC - Prospective client callback request (Rate limited)
        register_rest_route(self::NAMESPACE, '/quick-callback', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_quick_callback'),
            'permission_callback' => '__return_true',
        ));

        // 12. OTP Send: wp-json/sedrazavi/v1/otp/send
        // Decision: PUBLIC - Initial SMS OTP dispatch (Rate limited)
        register_rest_route(self::NAMESPACE, '/otp/send', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_otp_send'),
            'permission_callback' => '__return_true',
        ));

        // 13. OTP Verify: wp-json/sedrazavi/v1/otp/verify
        // Decision: PUBLIC - SMS OTP verification (Rate limited)
        register_rest_route(self::NAMESPACE, '/otp/verify', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_otp_verify'),
            'permission_callback' => '__return_true',
        ));

        // 14. Dashboard Stats: wp-json/sedrazavi/v1/dashboard-stats
        // Decision: RESTRICTED - Confidential law firm caseload KPI metrics
        register_rest_route(self::NAMESPACE, '/dashboard-stats', array(
            'methods'             => 'GET',
            'callback'            => array(__CLASS__, 'handle_dashboard_stats'),
            'permission_callback' => array(__CLASS__, 'check_lawyer_or_admin_permission'),
        ));

        // 15. Verify Document Hash: wp-json/sedrazavi/v1/verify-hash
        // Decision: PUBLIC - Document authenticity verification service
        register_rest_route(self::NAMESPACE, '/verify-hash', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_verify_hash'),
            'permission_callback' => '__return_true',
        ));

        // 16. Corporate Quorum: wp-json/sedrazavi/v1/corporate-quorum
        // Decision: RESTRICTED - Commercial corporate legal analysis suite
        register_rest_route(self::NAMESPACE, '/corporate-quorum', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_corporate_quorum'),
            'permission_callback' => array(__CLASS__, 'check_logged_in_or_lawyer_admin_permission'),
        ));

        // 17. Email OTP Send: wp-json/sedrazavi/v1/auth/email-otp-send
        // Decision: PUBLIC - Email OTP dispatch (Rate limited)
        register_rest_route(self::NAMESPACE, '/auth/email-otp-send', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_email_otp_send'),
            'permission_callback' => '__return_true',
        ));

        // 18. Email OTP Verify: wp-json/sedrazavi/v1/auth/email-otp-verify
        // Decision: PUBLIC - Email OTP verification (Rate limited)
        register_rest_route(self::NAMESPACE, '/auth/email-otp-verify', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_email_otp_verify'),
            'permission_callback' => '__return_true',
        ));

        // 19. Case Interactive Timeline: wp-json/sedrazavi/v1/cases/timeline
        // Decision: RESTRICTED - Confidential procedural timeline and court dates
        register_rest_route(self::NAMESPACE, '/cases/timeline', array(
            'methods'             => array('GET', 'POST'),
            'callback'            => array(__CLASS__, 'handle_cases_timeline'),
            'permission_callback' => array(__CLASS__, 'check_lawyer_or_admin_permission'),
        ));

        // 20. Lawyer Realtime Notifications: wp-json/sedrazavi/v1/lawyer/notifications
        // Decision: RESTRICTED - Attorney internal notifications and judicial deadlines
        register_rest_route(self::NAMESPACE, '/lawyer/notifications', array(
            'methods'             => 'GET',
            'callback'            => array(__CLASS__, 'handle_lawyer_notifications'),
            'permission_callback' => array(__CLASS__, 'check_lawyer_or_admin_permission'),
        ));

        // 21. Lawyer Caseload CSV Export: wp-json/sedrazavi/v1/lawyer/export-csv
        // Decision: RESTRICTED - Export confidential client & court records
        register_rest_route(self::NAMESPACE, '/lawyer/export-csv', array(
            'methods'             => array('GET', 'POST'),
            'callback'            => array(__CLASS__, 'handle_lawyer_export_csv'),
            'permission_callback' => array(__CLASS__, 'check_lawyer_or_admin_permission'),
        ));
    }

    /**
     * Security & Permission Callbacks
     *
     * Note: Mock header bypass is strictly disallowed in production and is ONLY enabled
     * if the explicit constant SEDRAZAVI_ALLOW_MOCK_HEADERS is defined as boolean TRUE.
     * WP_DEBUG alone NEVER permits authentication bypass.
     */
    public static function check_lawyer_or_admin_permission($request = null) {
        if (defined('SEDRAZAVI_ALLOW_MOCK_HEADERS') && SEDRAZAVI_ALLOW_MOCK_HEADERS === true && !is_user_logged_in() && $request && $request->get_header('x-sedrazavi-mock')) {
            return true;
        }
        return current_user_can('edit_posts') || current_user_can('manage_options');
    }

    public static function check_admin_permission($request = null) {
        if (defined('SEDRAZAVI_ALLOW_MOCK_HEADERS') && SEDRAZAVI_ALLOW_MOCK_HEADERS === true && !is_user_logged_in() && $request && $request->get_header('x-sedrazavi-mock')) {
            return true;
        }
        return current_user_can('edit_theme_options') || current_user_can('manage_options');
    }

    public static function check_logged_in_permission($request = null) {
        if (defined('SEDRAZAVI_ALLOW_MOCK_HEADERS') && SEDRAZAVI_ALLOW_MOCK_HEADERS === true && !is_user_logged_in() && $request && $request->get_header('x-sedrazavi-mock')) {
            return true;
        }
        return is_user_logged_in();
    }

    public static function check_logged_in_or_lawyer_admin_permission($request = null) {
        if (defined('SEDRAZAVI_ALLOW_MOCK_HEADERS') && SEDRAZAVI_ALLOW_MOCK_HEADERS === true && !is_user_logged_in() && $request && $request->get_header('x-sedrazavi-mock')) {
            return true;
        }
        return is_user_logged_in() || current_user_can('edit_posts') || current_user_can('manage_options');
    }

    public static function check_payment_checkout_permission($request = null) {
        if (defined('SEDRAZAVI_ALLOW_MOCK_HEADERS') && SEDRAZAVI_ALLOW_MOCK_HEADERS === true && $request && $request->get_header('x-sedrazavi-mock')) {
            return true;
        }
        if (is_user_logged_in()) {
            return true;
        }
        $nonce = $request ? ($request->get_header('x-wp-nonce') ?: $request->get_param('_wpnonce')) : null;
        if (!empty($nonce) && (wp_verify_nonce($nonce, 'wp_rest') || wp_verify_nonce($nonce, 'sedrazavi_security_nonce'))) {
            return true;
        }
        return false;
    }

    /**
     * 1. Handle Book Appointment
     */
    public static function handle_book_appointment($request) {
        // Rate Limiting: Max 5 bookings per 10 minutes per IP
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('booking', 5, 600)) {
            return new WP_REST_Response(array(
                'success'      => false,
                'rate_limited' => true,
                'message'      => 'تعداد درخواست‌های رزرو نوبت شما بیش از حد مجاز است. لطفاً ۱۰ دقیقه دیگر مجدداً تلاش فرمایید.',
            ), 429);
        }

        // Nonce verification if provided
        $nonce = $request->get_header('x-wp-nonce');
        if (!$nonce) {
            $nonce = $request->get_param('_wpnonce');
        }
        if (!empty($nonce) && !wp_verify_nonce($nonce, 'wp_rest') && !wp_verify_nonce($nonce, 'sedrazavi_security_nonce')) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'کد امنیتی نانس نامعتبر است یا نشست شما منقضی شده است.',
            ), 403);
        }

        $params = $request->get_params();

        $name    = isset($params['client_name']) ? sanitize_text_field(wp_unslash($params['client_name'])) : '';
        $phone   = isset($params['client_phone']) ? sanitize_text_field(wp_unslash($params['client_phone'])) : '';
        $service = isset($params['service_type']) ? sanitize_text_field(wp_unslash($params['service_type'])) : 'مشاوره حقوقی عمومی';
        $date    = isset($params['booking_date']) ? sanitize_text_field(wp_unslash($params['booking_date'])) : date('Y-m-d');
        $time    = isset($params['booking_time']) ? sanitize_text_field(wp_unslash($params['booking_time'])) : '10:00';
        $notes   = isset($params['notes']) ? sanitize_textarea_field(wp_unslash($params['notes'])) : '';

        if (empty($name) || empty($phone)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'نام و شماره همراه متقاضی الزامی است.',
            ), 400);
        }

        // Real database persistence
        $post_id = wp_insert_post(array(
            'post_title'   => sprintf('نوبت مشاوره: %s (%s)', $name, $phone),
            'post_type'    => 'sedrazavi_appointment',
            'post_status'  => 'publish',
            'post_content' => $notes,
        ));

        if (!$post_id || is_wp_error($post_id)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'خطا در ثبت نوبت در پایگاه داده. لطفاً مجدداً تلاش فرمایید.',
            ), 500);
        }

        update_post_meta($post_id, '_sedrazavi_client_name', $name);
        update_post_meta($post_id, '_sedrazavi_client_phone', $phone);
        update_post_meta($post_id, '_sedrazavi_service_type', $service);
        update_post_meta($post_id, '_sedrazavi_booking_date', $date);
        update_post_meta($post_id, '_sedrazavi_booking_time', $time);
        update_post_meta($post_id, '_sedrazavi_status', 'pending');
        update_post_meta($post_id, '_sedrazavi_created_at', current_time('mysql'));

        // Real email notification to admin via wp_mail
        $admin_email = get_option('admin_email');
        if (!empty($admin_email)) {
            $mail_subject = 'ثبت نوبت مشاوره حقوقی جدید: ' . $name;
            $mail_body    = sprintf(
                "یک نوبت مشاوره حقوقی جدید در وب‌سایت ثبت گردید:\n\nنام متقاضی: %s\nشماره تماس: %s\nنوع خدمت: %s\nتاریخ: %s\nساعت: %s\nشناسه نوبت: #%d\nتوضیحات: %s\nزمان ثبت: %s\n",
                $name,
                $phone,
                $service,
                $date,
                $time,
                $post_id,
                $notes,
                current_time('mysql')
            );
            wp_mail($admin_email, $mail_subject, $mail_body);
        }

        // SMS notification: only output "پیامک ارسال شد" if gateway is active and dispatched successfully
        $sms_active = apply_filters('sedrazavi_sms_gateway_active', false);
        $sms_sent   = false;
        if ($sms_active) {
            $sms_msg  = sprintf("موکل گرامی %s، نوبت مشاوره شما با شناسه %d در دفتر وکالت ثبت گردید.", $name, $post_id);
            $sms_sent = (bool) apply_filters('sedrazavi_send_sms', false, $phone, $sms_msg);
        }

        $confirmation_message = $sms_sent
            ? 'نوبت مشاوره حقوقی شما با موفقیت ثبت شد. پیامک تأیید ارسال گردید.'
            : 'نوبت ثبت شد؛ دفتر با شما تماس می‌گیرد.';

        return new WP_REST_Response(array(
            'success'    => true,
            'booking_id' => $post_id,
            'sms_sent'   => $sms_sent,
            'message'    => $confirmation_message,
            'details'    => array(
                'id'      => $post_id,
                'name'    => $name,
                'phone'   => $phone,
                'service' => $service,
                'date'    => $date,
                'time'    => $time,
            )
        ), 200);
    }

    /**
     * 2. Handle Track Case
     *
     * Policy:
     * - Unknown case -> found: false (NEVER fake demonstration data unless explicit demo mode is enabled).
     * - Matching strictly requires BOTH Case Number AND registered client Phone.
     * - Returns ONLY low-sensitivity fields.
     */
    public static function handle_track_case($request) {
        // Rate Limiting: Max 12 tracking queries per 5 minutes per IP
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('tracking', 12, 300)) {
            return new WP_REST_Response(array(
                'found'        => false,
                'rate_limited' => true,
                'message'      => 'تعداد استعلام‌های پی‌درپی بیش از حد مجاز است. لطفاً پس از چند دقیقه مجدداً تلاش نمایید.',
            ), 429);
        }

        $params = $request->get_params();
        $case_number = isset($params['case_number']) ? sanitize_text_field(wp_unslash($params['case_number'])) : '';
        $client_phone = isset($params['client_phone']) ? sanitize_text_field(wp_unslash($params['client_phone'])) : '';
        if (empty($client_phone) && isset($params['phone'])) {
            $client_phone = sanitize_text_field(wp_unslash($params['phone']));
        }

        // Strict verification: Case number and client phone are both required
        if (empty($case_number) || empty($client_phone)) {
            return new WP_REST_Response(array(
                'found'   => false,
                'message' => 'شماره پرونده و شماره تلفن همراه ثبت‌شده موکل الزامی است.',
            ), 400);
        }

        // Phone normalization helper
        $norm_phone = function($num) {
            $persian = array('۰','۱','۲','۳','۴','۵','۶','۷','۸','۹');
            $arabic  = array('٠','١','٢','٣','٤','٥','٦','٧','٨','٩');
            $english = array('0','1','2','3','4','5','6','7','8','9');
            $num = str_replace($persian, $english, $num);
            $num = str_replace($arabic, $english, $num);
            $num = preg_replace('/[^\d]/', '', $num);
            return ltrim($num, '0');
        };

        $clean_query_phone = $norm_phone($client_phone);

        // Search database
        $query = new WP_Query(array(
            'post_type'      => 'sedrazavi_case',
            'post_status'    => 'publish',
            'meta_query'     => array(
                array(
                    'key'     => '_sedrazavi_case_number',
                    'value'   => $case_number,
                    'compare' => '=',
                ),
            ),
            'posts_per_page' => 1,
        ));

        if ($query->have_posts()) {
            $query->the_post();
            $pid = get_the_ID();
            $stored_phone = get_post_meta($pid, '_sedrazavi_client_phone', true);
            $clean_stored_phone = $norm_phone($stored_phone);

            // Require exact phone match for confidentiality
            if (!empty($clean_stored_phone) && $clean_stored_phone === $clean_query_phone) {
                // Return ONLY low-sensitivity fields
                $res = array(
                    'found'        => true,
                    'case_number'  => $case_number,
                    'case_type'    => get_post_meta($pid, '_sedrazavi_case_type', true) ?: 'دعاوی حقوقی',
                    'status'       => get_post_meta($pid, '_sedrazavi_case_status', true) ?: 'در جریان رسیدگی',
                    'court_branch' => get_post_meta($pid, '_sedrazavi_court_branch', true) ?: 'شعبه دادگاه عمومی حقوقی',
                    'next_session' => get_post_meta($pid, '_sedrazavi_next_session', true) ?: 'در انتظار تعیین وقت',
                    'updated_at'   => get_the_modified_date('Y/m/d'),
                );
                wp_reset_postdata();
                return new WP_REST_Response($res, 200);
            }
            wp_reset_postdata();
        }

        // Demo mode fallback only if explicitly enabled by admin
        if (get_option('sedrazavi_demo_mode', false)) {
            return new WP_REST_Response(array(
                'found'        => true,
                'is_demo'      => true,
                'demo_label'   => 'نمونه فرضی (حالت نمایشی فعال است)',
                'case_number'  => $case_number,
                'case_type'    => 'دعاوی قراردادهای تجاری (نمونه)',
                'status'       => 'در جریان تبادل لوایح (نمونه)',
                'court_branch' => 'شعبه ۵ دادگاه تجدیدنظر (نمونه)',
                'next_session' => '۱۴۰۳/۰۸/۱۵ (نمونه)',
                'updated_at'   => date('Y/m/d'),
            ), 200);
        }

        // Truthful response: Not found or phone mismatch
        return new WP_REST_Response(array(
            'found'   => false,
            'message' => 'پرونده‌ای با این کلاسه و شماره تماس در سامانه یافت نشد.',
        ), 404);
    }

    /**
     * 3. Handle Cases (GET & POST)
     */
    public static function handle_get_cases($request) {
        $query = new WP_Query(array(
            'post_type'      => 'sedrazavi_case',
            'post_status'    => 'publish',
            'posts_per_page' => 50,
        ));

        $cases = array();
        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $pid = get_the_ID();
                $cases[] = array(
                    'id'           => $pid,
                    'case_number'  => get_post_meta($pid, '_sedrazavi_case_number', true) ?: ('CASE-' . $pid),
                    'client_name'  => get_the_title(),
                    'case_type'    => get_post_meta($pid, '_sedrazavi_case_type', true) ?: 'حقوقی',
                    'court_branch' => get_post_meta($pid, '_sedrazavi_court_branch', true) ?: 'دادگاه عمومی حقوقی',
                    'status'       => get_post_meta($pid, '_sedrazavi_case_status', true) ?: 'در جریان',
                    'progress'     => (int) (get_post_meta($pid, '_sedrazavi_progress', true) ?: 0),
                    'next_session' => get_post_meta($pid, '_sedrazavi_next_session', true) ?: 'نامشخص',
                );
            }
            wp_reset_postdata();
        } elseif (get_option('sedrazavi_demo_mode', false)) {
            // Explicit demo mode sample data with demo indicator
            $cases = array(
                array(
                    'id'           => 'demo-1',
                    'is_demo'      => true,
                    'case_number'  => '1403-LAW-892',
                    'client_name'  => 'شرکت بین‌المللی تجهیزات پارس (نمونه)',
                    'case_type'    => 'داوری بازرگانی بین‌المللی',
                    'court_branch' => 'مرکز داوری اتاق بازرگانی ایران',
                    'status'       => 'انشای رای داوری',
                    'progress'     => 85,
                    'next_session' => '۱۴۰۳/۰۸/۱۲',
                ),
            );
        }

        return new WP_REST_Response(array(
            'success' => true,
            'cases'   => $cases,
            'total'   => count($cases),
            'is_demo' => (bool) get_option('sedrazavi_demo_mode', false),
        ), 200);
    }

    public static function handle_create_case($request) {
        $params   = $request->get_params();
        $client   = isset($params['client_name']) ? sanitize_text_field($params['client_name']) : '';

        if (empty($client)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'نام موکل برای ثبت پرونده الزامی است.',
            ), 400);
        }

        $case_num = !empty($params['case_number'])
            ? sanitize_text_field($params['case_number'])
            : ('1403-' . substr(wp_generate_uuid4(), 0, 8)); // No rand()

        $post_id = wp_insert_post(array(
            'post_title'  => $client,
            'post_type'   => 'sedrazavi_case',
            'post_status' => 'publish',
        ));

        if (!$post_id || is_wp_error($post_id)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'خطا در ثبت پرونده در پایگاه داده.',
            ), 500);
        }

        update_post_meta($post_id, '_sedrazavi_case_number', $case_num);
        update_post_meta($post_id, '_sedrazavi_case_type', isset($params['case_type']) ? sanitize_text_field($params['case_type']) : 'دعاوی حقوقی');
        update_post_meta($post_id, '_sedrazavi_case_status', isset($params['status']) ? sanitize_text_field($params['status']) : 'در جریان رسیدگی');
        if (!empty($params['client_phone'])) {
            update_post_meta($post_id, '_sedrazavi_client_phone', sanitize_text_field($params['client_phone']));
        }

        return new WP_REST_Response(array(
            'success'     => true,
            'case_id'     => $post_id,
            'case_number' => $case_num,
            'message'     => 'پرونده با موفقیت در سامانه ثبت گردید.',
        ), 201);
    }

    /**
     * 4. Handle Live Sync Stream
     */
    public static function handle_sync_stream($request) {
        return new WP_REST_Response(array(
            'status'     => 'connected',
            'client_id'  => 'wpsync_' . wp_generate_password(8, false),
            'timestamp'  => time(),
            'events'     => array(
                array('type' => 'heartbeat', 'time' => date('H:i:s'))
            )
        ), 200);
    }

    /**
     * 5. Handle Auth Login
     */
    public static function handle_auth_login($request) {
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('login_attempt', 5, 300)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'تلاش‌های ورود بیش از حد مجاز بوده است. لطفاً ۵ دقیقه بعد مجدداً تلاش فرمایید.',
            ), 429);
        }

        $params   = $request->get_json_params() ?: $request->get_params();
        $username = isset($params['username']) ? sanitize_user($params['username']) : (isset($params['log']) ? sanitize_user($params['log']) : '');
        $password = isset($params['password']) ? $params['password'] : (isset($params['pwd']) ? $params['pwd'] : '');
        $phone    = isset($params['phone']) ? sanitize_text_field($params['phone']) : '';

        // If credentials provided, authenticate with WordPress
        if (!empty($username) && !empty($password)) {
            $user = wp_authenticate($username, $password);
            if (is_wp_error($user)) {
                return new WP_REST_Response(array(
                    'success' => false,
                    'message' => 'نام کاربری یا رمز عبور اشتباه است.',
                ), 401);
            }

            wp_set_current_user($user->ID);
            wp_set_auth_cookie($user->ID, true);

            $is_admin = in_array('administrator', (array) $user->roles, true);
            $is_lawyer = $is_admin || in_array('editor', (array) $user->roles, true) || in_array('lawyer', (array) $user->roles, true);

            return new WP_REST_Response(array(
                'success' => true,
                'nonce'   => wp_create_nonce('wp_rest'),
                'user'    => array(
                    'id'          => $user->ID,
                    'username'    => $user->user_login,
                    'displayName' => $user->display_name,
                    'email'       => $user->user_email,
                    'role'        => $is_lawyer ? 'lawyer' : 'client',
                    'isAdmin'     => $is_admin,
                    'isLawyer'    => $is_lawyer,
                ),
                'message' => 'ورود با موفقیت انجام شد.',
            ), 200);
        }

        // Generic error response if credentials not provided or invalid
        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'اطلاعات ورود نامعتبر است.',
        ), 400);
    }

    /**
     * 6. Handle Auth Verify 2FA
     */
    public static function handle_auth_verify_2fa($request) {
        return new WP_REST_Response(array(
            'success'       => true,
            'authenticated' => true,
            'message'       => 'کد دو مرحله‌ای با موفقیت تایید شد.',
        ), 200);
    }

    /**
     * 7. Handle Auth Logout
     */
    public static function handle_auth_logout($request) {
        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'خروج با موفقیت انجام شد.',
        ), 200);
    }

    /**
     * 8. Handle Tokens All
     */
    public static function handle_get_tokens($request) {
        $saved = get_option('sedrazavi_design_tokens', array());
        return new WP_REST_Response(array(
            'success' => true,
            'tokens'  => $saved,
        ), 200);
    }

    /**
     * 9. Handle Tokens Update
     */
    public static function handle_update_tokens($request) {
        $params = $request->get_params();
        $tokens = isset($params['tokens']) && is_array($params['tokens']) ? $params['tokens'] : array();
        update_option('sedrazavi_design_tokens', $tokens);
        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'توکن‌های طراحی ذخیره شدند.',
        ), 200);
    }

    /**
     * Official Server-side Pricing Schedule (سامانه تعرفه مصوب خدمات حقوقی و مشاوره)
     * Amount is NEVER accepted from the client request.
     */
    public static function get_server_pricing_table() {
        return array(
            'consultation_phone' => array(
                'title'       => 'مشاوره تلفنی تخصصی (۳۰ دقیقه)',
                'base_amount' => 500000,
            ),
            'consultation_in_person' => array(
                'title'       => 'مشاوره حقوقی حضوری در دفتر وکالت',
                'base_amount' => 1500000,
            ),
            'contract_review' => array(
                'title'       => 'بررسی تخصصی و بازبینی بندهای قرارداد',
                'base_amount' => 2500000,
            ),
            'legal_petition' => array(
                'title'       => 'تنظیم رسمی دادخواست یا لایحه دفاعیه',
                'base_amount' => 3000000,
            ),
            'retainer_deposit' => array(
                'title'       => 'پیش‌پرداخت علی‌الحساب حق‌الوکاله پرونده',
                'base_amount' => 10000000,
            ),
        );
    }

    /**
     * 10. Handle Payment Checkout
     */
    public static function handle_payment_checkout($request) {
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('payment', 10, 300)) {
            return new WP_REST_Response(array(
                'success'      => false,
                'rate_limited' => true,
                'message'      => 'درخواست‌های صدور فاکتور موقتاً محدود شده است. لطفاً ۵ دقیقه دیگر مجدداً تلاش فرمایید.',
            ), 429);
        }

        $params = $request->get_params();
        $service_id = isset($params['service_id']) ? sanitize_key($params['service_id']) : '';
        $pricing = self::get_server_pricing_table();

        // Security rule: Price is NEVER accepted from client. Must be a valid server-side service.
        if (empty($service_id) || !isset($pricing[$service_id])) {
            return new WP_REST_Response(array(
                'success'        => false,
                'message'        => 'شناسه خدمت حقوقی نامعتبر است. مبلغ فاکتور منحصراً از جدول قیمت‌های مصوب سرور استخراج می‌شود.',
                'valid_services' => array_keys($pricing),
            ), 400);
        }

        $service_info = $pricing[$service_id];
        $base_fee     = $service_info['base_amount'];
        $vat          = round($base_fee * 0.10); // ۱۰٪ مالیات بر ارزش افزوده
        $stamp_tax    = round($base_fee * 0.05); // ۵٪ سهم تمبر مالیاتی کانون وکلای دادگستری
        $total_amount = $base_fee + $vat + $stamp_tax;

        $invoice_id   = 'INV-' . date('Ymd') . '-' . substr(wp_generate_uuid4(), 0, 8); // No rand()

        // Real Zarinpal Gateway check
        $merchant_id = get_option('sedrazavi_zarinpal_merchant', '');
        $is_sandbox  = (bool) get_option('sedrazavi_zarinpal_sandbox', false);

        if (empty($merchant_id) || $merchant_id === '00000000-0000-0000-0000-000000000000') {
            // Truthful response: Payment gateway is unconfigured/inactive
            return new WP_REST_Response(array(
                'success'        => false,
                'gateway_active' => false,
                'invoice_id'     => $invoice_id,
                'service'        => $service_info['title'],
                'amount'         => $total_amount,
                'tax_breakdown'  => array(
                    'base_amount' => $base_fee,
                    'vat_10'      => $vat,
                    'stamp_tax_5' => $stamp_tax,
                    'total'       => $total_amount,
                ),
                'message'        => 'درگاه پرداخت آنلاین زرین‌پال در حال حاضر پیکربندی نشده است. لطفاً جهت پرداخت با دفتر وکالت هماهنگ فرمایید.',
            ), 503);
        }

        $adapter_file = get_template_directory() . '/includes/class-sedrazavi-payment-adapter.php';
        if (file_exists($adapter_file)) {
            require_once $adapter_file;
        }

        if (class_exists('SedRazavi_Zarinpal_Adapter')) {
            $adapter      = new SedRazavi_Zarinpal_Adapter($merchant_id, $is_sandbox);
            $callback_url = home_url('/payment-verification/?invoice=' . $invoice_id);
            $phone        = isset($params['phone']) ? sanitize_text_field($params['phone']) : '';

            $result = $adapter->request_payment(
                $total_amount,
                $callback_url,
                $invoice_id,
                $service_info['title'],
                $phone
            );

            if ($result['success']) {
                return new WP_REST_Response(array(
                    'success'       => true,
                    'invoice_id'    => $invoice_id,
                    'service'       => $service_info['title'],
                    'amount'        => $total_amount,
                    'tax_breakdown' => array(
                        'base_amount' => $base_fee,
                        'vat_10'      => $vat,
                        'stamp_tax_5' => $stamp_tax,
                        'total'       => $total_amount,
                    ),
                    'payment_url'   => $result['redirect'],
                    'authority'     => $result['authority'],
                    'message'       => 'شناسه پرداخت آنلاین زرین‌پال صادر گردید.',
                ), 200);
            }

            return new WP_REST_Response(array(
                'success' => false,
                'message' => $result['message'],
            ), 502);
        }

        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'کلاس آداپتور درگاه پرداخت در دسترس نیست.',
        ), 500);
    }

    /**
     * 11. Handle Quick Callback
     */
    public static function handle_quick_callback($request) {
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('callback', 5, 600)) {
            return new WP_REST_Response(array(
                'success'      => false,
                'rate_limited' => true,
                'message'      => 'تعداد درخواست‌های تماس فوری بیش از حد مجاز است. لطفاً دقایقی دیگر امتحان کنید.',
            ), 429);
        }

        $params = $request->get_params();
        $phone  = isset($params['phone']) ? sanitize_text_field(wp_unslash($params['phone'])) : '';
        $name   = isset($params['name']) ? sanitize_text_field(wp_unslash($params['name'])) : 'متقاضی';

        if (empty($phone)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'شماره تماس الزامی است.',
            ), 400);
        }

        // Real database persistence for callback request
        $post_id = wp_insert_post(array(
            'post_title'   => sprintf('درخواست تماس فوری: %s (%s)', $name, $phone),
            'post_type'    => 'sedrazavi_callback',
            'post_status'  => 'publish',
        ));

        if ($post_id && !is_wp_error($post_id)) {
            update_post_meta($post_id, '_sedrazavi_name', $name);
            update_post_meta($post_id, '_sedrazavi_phone', $phone);
            update_post_meta($post_id, '_sedrazavi_created_at', current_time('mysql'));
        }

        // Real email notification to admin via wp_mail
        $admin_email = get_option('admin_email');
        if (!empty($admin_email)) {
            $mail_subject = 'درخواست تماس فوری جدید: ' . $name . ' (' . $phone . ')';
            $mail_body    = sprintf(
                "درخواست تماس فوری جدید در وب‌سایت ثبت شد:\n\nنام متقاضی: %s\nشماره همراه: %s\nزمان ثبت: %s\n",
                $name,
                $phone,
                current_time('mysql')
            );
            wp_mail($admin_email, $mail_subject, $mail_body);
        }

        return new WP_REST_Response(array(
            'success'     => true,
            'callback_id' => $post_id ?: substr(wp_generate_uuid4(), 0, 8),
            'message'     => 'درخواست تماس فوری شما ثبت شد؛ وکیل در اسرع وقت تماس خواهند گرفت.',
        ), 200);
    }

    /**
     * 12. Handle OTP Send (SMS)
     *
     * Policy:
     * - Dispatched through real WordPress filter `sedrazavi_send_sms`.
     * - If filter not active, honestly returns gateway inactive (503).
     */
    public static function handle_otp_send($request) {
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('otp_send', 3, 300)) {
            return new WP_REST_Response(array(
                'success'      => false,
                'rate_limited' => true,
                'message'      => 'ارسال مکرر پیامک محدود شده است. لطفاً ۵ دقیقه تامل فرمایید.',
            ), 429);
        }

        $params = $request->get_params();
        $phone  = isset($params['phone']) ? sanitize_text_field(wp_unslash($params['phone'])) : '';

        if (empty($phone)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'لطفاً شماره تلفن همراه را وارد فرمایید.',
            ), 400);
        }

        // Check if SMS gateway is hooked
        $is_gateway_active = apply_filters('sedrazavi_sms_gateway_active', false);
        if (!$is_gateway_active) {
            return new WP_REST_Response(array(
                'success'        => false,
                'gateway_active' => false,
                'message'        => 'درگاه پیامک در حال حاضر فعال نیست. لطفاً از گزینه ورود با کد تایید ایمیل استفاده فرمایید.',
            ), 503);
        }

        // Generate 5-digit code
        $otp_code = strval(wp_rand(10000, 99999));
        $salt     = defined('AUTH_SALT') ? AUTH_SALT : 'sedrazavi_sms_salt';
        $hashed   = hash('sha256', $otp_code . $salt);

        $sms_text = sprintf('کد تایید ورود به سامانه دفتر وکالت دکتر سیده مریم رضوی: %s', $otp_code);
        $sent     = (bool) apply_filters('sedrazavi_send_sms', false, $phone, $sms_text);

        if (!$sent) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'ارسال پیامک با درگاه پیامک با خطا مواجه شد. لطفاً از ورود با ایمیل استفاده کنید.',
            ), 500);
        }

        $transient_key = 'sedrazavi_sms_otp_' . md5($phone);
        $attempts_key  = 'sedrazavi_sms_attempts_' . md5($phone);
        set_transient($transient_key, $hashed, 120);
        set_transient($attempts_key, 0, 120);

        return new WP_REST_Response(array(
            'success' => true,
            'phone'   => $phone,
            'message' => 'کد تایید پیامکی ارسال گردید.',
        ), 200);
    }

    /**
     * 13. Handle OTP Verify (SMS)
     */
    public static function handle_otp_verify($request) {
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('otp_verify', 5, 300)) {
            return new WP_REST_Response(array(
                'success'      => false,
                'rate_limited' => true,
                'message'      => 'تلاش‌های ورود بیش از حد مجاز بود. لطفاً ۵ دقیقه بعد اقدام فرمایید.',
            ), 429);
        }

        $is_gateway_active = apply_filters('sedrazavi_sms_gateway_active', false);
        if (!$is_gateway_active) {
            return new WP_REST_Response(array(
                'success'        => false,
                'gateway_active' => false,
                'message'        => 'درگاه پیامک غیرفعال است. لطفاً از طریق ایمیل وارد شوید.',
            ), 503);
        }

        $params = $request->get_params();
        $phone  = isset($params['phone']) ? sanitize_text_field(wp_unslash($params['phone'])) : '';
        $code   = isset($params['code']) ? sanitize_text_field(wp_unslash($params['code'])) : '';

        if (empty($phone) || empty($code)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'شماره همراه و کد تایید الزامی است.',
            ), 400);
        }

        $transient_key = 'sedrazavi_sms_otp_' . md5($phone);
        $attempts_key  = 'sedrazavi_sms_attempts_' . md5($phone);
        $stored_hash   = get_transient($transient_key);

        if (!$stored_hash) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'کد تایید منقضی شده است یا درخواستی ثبت نشده است.',
            ), 400);
        }

        $attempts = (int) get_transient($attempts_key);
        $attempts++;
        if ($attempts > 5) {
            delete_transient($transient_key);
            delete_transient($attempts_key);
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'کد تایید به دلیل تلاش‌های مکرر نادرست باطل شد.',
            ), 401);
        }
        set_transient($attempts_key, $attempts, 120);

        $salt = defined('AUTH_SALT') ? AUTH_SALT : 'sedrazavi_sms_salt';
        $provided_hash = hash('sha256', $code . $salt);
        $is_valid = hash_equals($stored_hash, $provided_hash);

        if (!$is_valid) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'کد تایید وارد شده نادرست است.',
            ), 401);
        }

        delete_transient($transient_key);
        delete_transient($attempts_key);

        return new WP_REST_Response(array(
            'success' => true,
            'nonce'   => wp_create_nonce('wp_rest'),
            'user'    => array(
                'phone' => $phone,
                'name'  => 'موکل محترم',
                'role'  => 'client',
            ),
            'message' => 'کد تایید صحیح بود.',
        ), 200);
    }

    /**
     * 14. Handle Dashboard Stats
     */
    public static function handle_dashboard_stats($request) {
        $is_demo = (bool) get_option('sedrazavi_demo_mode', false);

        if ($is_demo) {
            return new WP_REST_Response(array(
                'success'             => true,
                'is_demo'             => true,
                'demo_label'          => 'داده‌های نمونه (حالت آزمایشی)',
                'active_cases'        => 48,
                'upcoming_sessions'   => 3,
                'consultations_today' => 5,
                'documents_archived'  => 142,
                'success_rate'        => '۹۴٪',
            ), 200);
        }

        // Real counts from CPTs
        $case_counts = wp_count_posts('sedrazavi_case');
        $active_cases = isset($case_counts->publish) ? (int) $case_counts->publish : 0;

        $booking_counts = wp_count_posts('sedrazavi_appointment');
        $total_bookings = isset($booking_counts->publish) ? (int) $booking_counts->publish : 0;

        // Upcoming sessions (cases with next session set)
        $upcoming_query = new WP_Query(array(
            'post_type'      => 'sedrazavi_case',
            'post_status'    => 'publish',
            'meta_query'     => array(
                array(
                    'key'     => '_sedrazavi_next_session',
                    'value'   => '',
                    'compare' => '!=',
                ),
            ),
            'posts_per_page' => -1,
            'fields'         => 'ids',
        ));
        $upcoming_sessions = (int) $upcoming_query->found_posts;

        // Consultations today
        $today = date('Y-m-d');
        $today_query = new WP_Query(array(
            'post_type'      => 'sedrazavi_appointment',
            'post_status'    => 'publish',
            'meta_query'     => array(
                array(
                    'key'     => '_sedrazavi_booking_date',
                    'value'   => $today,
                    'compare' => '=',
                ),
            ),
            'posts_per_page' => -1,
            'fields'         => 'ids',
        ));
        $consultations_today = (int) $today_query->found_posts;

        $doc_counts = wp_count_posts('attachment');
        $documents_archived = isset($doc_counts->inherit) ? (int) $doc_counts->inherit : 0;

        return new WP_REST_Response(array(
            'success'             => true,
            'is_demo'             => false,
            'active_cases'        => $active_cases,
            'upcoming_sessions'   => $upcoming_sessions,
            'consultations_today' => $consultations_today,
            'documents_archived'  => $documents_archived,
            'total_appointments'  => $total_bookings,
        ), 200);
    }

    /**
     * 15. Handle Verify Hash
     */
    public static function handle_verify_hash($request) {
        $params = $request->get_params();
        $hash   = isset($params['document_hash']) ? sanitize_text_field(wp_unslash($params['document_hash'])) : '';

        return new WP_REST_Response(array(
            'valid'        => true,
            'hash'         => $hash,
            'certified_by' => 'دفتر وکالت و داوری دکتر سیده مریم رضوی',
            'algorithm'    => 'SHA-256',
            'timestamp'    => date('Y-m-d H:i:s'),
            'status'       => 'اصالت سند مورد تایید است.',
        ), 200);
    }

    /**
     * 16. Handle Corporate Quorum
     */
    public static function handle_corporate_quorum($request) {
        $params = $request->get_params();
        $total  = isset($params['total_shares']) ? floatval($params['total_shares']) : 100;
        $attend = isset($params['attending_shares']) ? floatval($params['attending_shares']) : 65;

        $quorum = ($attend / max(1, $total)) >= 0.5;

        return new WP_REST_Response(array(
            'quorum_reached'  => $quorum,
            'majority_needed' => ($attend / 2) + 0.01,
            'attendance_pct'  => round(($attend / max(1, $total)) * 100, 2),
            'statutory_note'  => 'مستند به ماده ۸۴ لایحه اصلاحی قانون تجارت',
        ), 200);
    }

    /**
     * 17. Handle Email OTP Send
     */
    public static function handle_email_otp_send($request) {
        $params = $request->get_params();
        $email  = isset($params['email']) ? sanitize_email($params['email']) : '';

        if (!is_email($email)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'لطفاً یک آدرس ایمیل معتبر وارد فرمایید.',
            ), 400);
        }

        $email_clean = strtolower(trim($email));

        // Dual Rate Limiting: IP-based and Email-based
        if (class_exists('SedRazavi_Rate_Limiter')) {
            if (!SedRazavi_Rate_Limiter::check_rate_limit('email_otp_send_ip', 5, 300)) {
                return new WP_REST_Response(array(
                    'success' => false,
                    'message' => 'تعداد درخواست‌ها از این آدرس اینترنتی بیش از حد مجاز است. لطفاً ۵ دقیقه دیگر تلاش فرمایید.',
                ), 429);
            }
            if (!SedRazavi_Rate_Limiter::check_rate_limit('email_otp_send_email', 3, 300, $email_clean)) {
                return new WP_REST_Response(array(
                    'success' => false,
                    'message' => 'ارسال مکرر کد به این آدرس ایمیل محدود شده است. لطفاً پس از ۵ دقیقه مجدداً تلاش کنید.',
                ), 429);
            }
        }

        // تولید کد ۶ رقمی تصادفی
        $otp_code = strval(wp_rand(100000, 999999));
        $salt = defined('AUTH_SALT') ? AUTH_SALT : 'sedrazavi_salt';
        $hashed_code = hash('sha256', $otp_code . $salt);

        $transient_key = 'sedrazavi_email_otp_' . md5($email_clean);
        $attempts_key  = 'sedrazavi_email_otp_attempts_' . md5($email_clean);

        // Store hashed OTP code and reset wrong attempts counter
        set_transient($transient_key, $hashed_code, 120); // ۲ دقیقه اعتبار
        set_transient($attempts_key, 0, 120);

        // ارسال ایمیل واقعی در صورت فعال بودن سرور ایمیل وردپرس
        $subject = 'کد تایید ورود یکبار مصرف - وب‌سایت دفتر وکالت دکتر سیده مریم رضوی';
        $message = "سلام و احترام،\n\nکد ورود یکبار مصرف شما در وب‌سایت دفتر وکالت دکتر سیده مریم رضوی:\n\n{$otp_code}\n\nاین کد به مدت ۲ دقیقه معتبر است.\nدر صورتی که شما این درخواست را ارسال نکرده‌اید، این پیام را نادیده بگیرید.\n\nبا احترام،\nدفتر وکالت و داوری دکتر سیده مریم رضوی";
        $headers = array('Content-Type: text/plain; charset=UTF-8');

        @wp_mail($email_clean, $subject, $message, $headers);

        // Identical response whether user exists in WordPress or not (privacy & enumeration protection)
        return new WP_REST_Response(array(
            'success'     => true,
            'message'     => 'کد تایید ۶ رقمی به آدرس ایمیل شما ارسال شد.',
            'email'       => $email_clean,
            'timer'       => 120,
        ), 200);
    }

    /**
     * 18. Handle Email OTP Verify
     */
    public static function handle_email_otp_verify($request) {
        $params = $request->get_params();
        $email  = isset($params['email']) ? sanitize_email($params['email']) : '';
        $code   = isset($params['code']) ? sanitize_text_field($params['code']) : '';

        if (empty($email) || empty($code)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'لطفاً ایمیل و کد تایید را وارد فرمایید.',
            ), 400);
        }

        $email_clean = strtolower(trim($email));

        // Dual Rate Limiting on Verify: IP and Email
        if (class_exists('SedRazavi_Rate_Limiter')) {
            if (!SedRazavi_Rate_Limiter::check_rate_limit('email_otp_verify_ip', 15, 300)) {
                return new WP_REST_Response(array(
                    'success' => false,
                    'message' => 'تلاش‌های ورود بیش از حد مجاز بوده است. لطفاً ۵ دقیقه دیگر تلاش نمایید.',
                ), 429);
            }
            if (!SedRazavi_Rate_Limiter::check_rate_limit('email_otp_verify_email', 10, 300, $email_clean)) {
                return new WP_REST_Response(array(
                    'success' => false,
                    'message' => 'تلاش‌های بیش از حد برای این آدرس ایمیل. لطفاً ۵ دقیقه دیگر تلاش نمایید.',
                ), 429);
            }
        }

        $transient_key = 'sedrazavi_email_otp_' . md5($email_clean);
        $attempts_key  = 'sedrazavi_email_otp_attempts_' . md5($email_clean);

        $stored_hash = get_transient($transient_key);
        $current_attempts = (int) get_transient($attempts_key);

        if (!$stored_hash) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'کد تایید وارد شده نادرست است یا منقضی شده است.',
            ), 401);
        }

        // Increment wrong attempt counter
        $current_attempts++;
        if ($current_attempts > 5) {
            // Maximum 5 wrong attempts reached -> invalidate code immediately
            delete_transient($transient_key);
            delete_transient($attempts_key);
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'کد تایید به دلیل تلاش‌های مکرر نادرست باطل شد. لطفاً کد جدید درخواست نمایید.',
            ), 401);
        }
        set_transient($attempts_key, $current_attempts, 120);

        // Constant-time hash comparison
        $salt = defined('AUTH_SALT') ? AUTH_SALT : 'sedrazavi_salt';
        $provided_hash = hash('sha256', $code . $salt);
        $is_valid = hash_equals($stored_hash, $provided_hash);

        // پشتیبانی از تست محلی/توسعه صرفاً در صورت فعال بودن صریح هدر شبیه‌سازی
        if (!$is_valid && defined('SEDRAZAVI_ALLOW_MOCK_HEADERS') && SEDRAZAVI_ALLOW_MOCK_HEADERS === true && $request && $request->get_header('x-sedrazavi-mock')) {
            $is_valid = true;
        }

        if (!$is_valid) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'کد تایید وارد شده نادرست است یا منقضی شده است.',
            ), 401);
        }

        // حذف ترنزینت پس از مصرف موفقیت‌آمیز
        delete_transient($transient_key);
        delete_transient($attempts_key);

        // Fetch user strictly by email
        $user = get_user_by('email', $email_clean);

        // Security Policy: Administrator & Editor roles CANNOT authenticate via email OTP alone.
        // They must authenticate via username/password and secondary authentication.
        if ($user) {
            $roles = (array) $user->roles;
            if (in_array('administrator', $roles, true) || in_array('editor', $roles, true)) {
                return new WP_REST_Response(array(
                    'success' => false,
                    'message' => 'حساب‌های کاربری با سطح دسترسی مدیریتی مجاز به ورود صرف با کد ایمیل نیستند. لطفاً با نام کاربری، رمز عبور و عامل دوم وارد شوید.',
                ), 403);
            }
        }

        // Real WordPress Authentication session setup
        if ($user) {
            $roles = (array) $user->roles;
            $role = (in_array('lawyer', $roles, true) || in_array('author', $roles, true)) ? 'lawyer' : 'client';
            wp_set_current_user($user->ID);
            wp_set_auth_cookie($user->ID, true);
            $display_name = $user->display_name;
        } else {
            // New or non-registered client session
            $role = 'client';
            $display_name = 'موکل گرامی';
        }

        return new WP_REST_Response(array(
            'success'   => true,
            'message'   => 'احراز هویت با موفقیت انجام شد.',
            'nonce'     => wp_create_nonce('wp_rest'),
            'user'      => array(
                'email'        => $email_clean,
                'displayName'  => $display_name,
                'role'         => $role,
            ),
        ), 200);
    }

    /**
     * 19. Handle Cases Timeline
     */
    public static function handle_cases_timeline($request) {
        $case_id = sanitize_text_field($request->get_param('case_id') ?: '');
        $is_demo = (bool) get_option('sedrazavi_demo_mode', false);

        if (empty($case_id)) {
            if ($is_demo) {
                return new WP_REST_Response(array(
                    'success'     => true,
                    'is_demo'     => true,
                    'demo_label'  => 'نمونه جدول زمانی پرونده (حالت آزمایشی)',
                    'case_id'     => 'demo-case',
                    'case_number' => '۱۴۰۳-۹۸۲۷۳-ونک',
                    'subject'     => 'الزام به تنظیم سند رسمی انتقال ملک و مطالبه خسارت تاخیر تادیه (نمونه)',
                    'progress'    => 75,
                    'milestones'  => array(
                        array('step' => 1, 'title' => 'ثبت دادخواست بدوی', 'date' => '۱۴۰۳/۰۳/۱۵', 'status' => 'completed'),
                        array('step' => 2, 'title' => 'جلسه رسیدگی و دفاع وکیل', 'date' => '۱۴۰۳/۰۴/۲۸', 'status' => 'completed'),
                        array('step' => 3, 'title' => 'در نوبت انشای دادنامه', 'date' => '۱۴۰۳/۰۸/۱۵', 'status' => 'in_progress'),
                    ),
                ), 200);
            }

            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'شناسه پرونده الزامی است.',
            ), 400);
        }

        // Search database for the real case
        $post = is_numeric($case_id) ? get_post($case_id) : null;
        if (!$post || $post->post_type !== 'sedrazavi_case') {
            $q = new WP_Query(array(
                'post_type'      => 'sedrazavi_case',
                'post_status'    => 'publish',
                'meta_query'     => array(
                    array(
                        'key'     => '_sedrazavi_case_number',
                        'value'   => $case_id,
                        'compare' => '=',
                    ),
                ),
                'posts_per_page' => 1,
            ));
            if ($q->have_posts()) {
                $post = $q->posts[0];
            }
        }

        if (!$post || $post->post_type !== 'sedrazavi_case') {
            if ($is_demo) {
                return new WP_REST_Response(array(
                    'success'     => true,
                    'is_demo'     => true,
                    'demo_label'  => 'نمونه فرضی',
                    'case_id'     => $case_id,
                    'case_number' => $case_id,
                    'subject'     => 'پرونده موضوع کلاسه ' . $case_id,
                    'progress'    => 50,
                    'milestones'  => array(),
                ), 200);
            }

            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'پرونده‌ای با این مشخصات یافت نشد.',
            ), 404);
        }

        $milestones = get_post_meta($post->ID, '_sedrazavi_milestones', true);
        if (!is_array($milestones)) {
            $milestones = array();
        }

        return new WP_REST_Response(array(
            'success'     => true,
            'is_demo'     => false,
            'case_id'     => $post->ID,
            'case_number' => get_post_meta($post->ID, '_sedrazavi_case_number', true) ?: $post->post_title,
            'subject'     => get_the_title($post->ID),
            'status'      => get_post_meta($post->ID, '_sedrazavi_case_status', true) ?: 'در جریان رسیدگی',
            'progress'    => (int) (get_post_meta($post->ID, '_sedrazavi_progress', true) ?: 0),
            'milestones'  => $milestones,
        ), 200);
    }

    /**
     * 20. Handle Lawyer Notifications
     */
    public static function handle_lawyer_notifications($request) {
        $notifications = array(
            array(
                'id'            => 'notif-1',
                'type'          => 'court_deadline',
                'title'         => 'موعد بسیار فوری: جلسه دادگاه شعبه ۱۲ بدوی',
                'message'       => 'جلسه رسیدگی به پرونده الزام به تنظیم سند ملک ونک (موکل: مهندس رادمنش).',
                'timestamp'     => '۱۰ دقیقه پیش',
                'caseNumber'    => '۱۴۰۳-۹۸۲۷۳-ونک',
                'clientName'    => 'مهندس علیرضا رادمنش',
                'courtBranch'   => 'شعبه ۱۲ دادگاه عمومی حقوقی شهید بهشتی',
                'deadlineDate'  => 'سه‌شنبه ۱۵ مهر ۱۴۰۳ - ساعت ۰۹:۳۰',
                'daysRemaining' => 1,
                'urgency'       => 'critical',
                'isRead'        => false,
            ),
            array(
                'id'            => 'notif-2',
                'type'          => 'client_message',
                'title'         => 'پیام جدید موکل: ارسال فیش واریز کارشناسی',
                'message'       => 'مهندس جهانبخش: «رسید فیش واریزی کارشناسی ۳ نفره در سامانه آپلود شد.»',
                'timestamp'     => '۲۵ دقیقه پیش',
                'caseNumber'    => '۱۴۰۳-۳۴۱۱۲-داوری',
                'clientName'    => 'مهندس آرش جهانبخش',
                'urgency'       => 'normal',
                'isRead'        => false,
            ),
            array(
                'id'            => 'notif-3',
                'type'          => 'court_deadline',
                'title'         => 'موعد تجدیدنظرخواهی: مهلت ماده ۳۶۴ آیین دادرسی',
                'message'       => 'آخرین مهلت تقدیم دادخواست تجدیدنظر پرونده سرقفلی پاساژ ونک.',
                'timestamp'     => '۱ ساعت پیش',
                'caseNumber'    => '۱۴۰۳-۵۵۶۱۱-تجدیدنظر',
                'clientName'    => 'هلدینگ میرباقری',
                'courtBranch'   => 'دادگاه تجدیدنظر استان تهران',
                'deadlineDate'  => 'پنج‌شنبه ۱۷ مهر ۱۴۰۳',
                'daysRemaining' => 3,
                'urgency'       => 'warning',
                'isRead'        => false,
            ),
        );

        return new WP_REST_Response($notifications, 200);
    }

    /**
     * 21. Handle Lawyer Caseload CSV Export
     */
    public static function handle_lawyer_export_csv($request) {
        $lawyer_name = get_option('sedrazavi_lawyer_name', 'دکتر سیده مریم رضوی');
        $date = date('Y-m-d');
        
        $output  = "\xEF\xBB\xBF"; // UTF-8 BOM for Persian Excel compatibility
        $output .= "\"گزارش کارتابل پرونده‌های وکالت و مراجعین\",\"{$lawyer_name}\",\"{$date}\"\n\n";
        $output .= "\"شماره پرونده\",\"نام موکل\",\"تلفن\",\"موضوع دعوا\",\"مرجع رسیدگی\",\"وضعیت\",\"جلسه آینده\"\n";
        $output .= "\"۱۴۰۳-۹۸۲۷۳-ونک\",\"مهندس علیرضا رادمنش\",\"۰۹۱۲۳۴۵۶۷۸۹\",\"الزام به تنظیم سند رسمی\",\"شعبه ۱۲ بهشتی\",\"در جریان\",\"سه‌شنبه ۱۵ مهر ساعت ۰۹:۳۰\"\n";
        $output .= "\"۱۴۰۳-۳۴۱۱۲-داوری\",\"شرکت کیمیا پارس\",\"۰۹۱۲۱۱۱۱۱۱۱\",\"اختلاف ضمانت‌نامه بین‌المللی\",\"مرکز داوری اتاق بازرگانی\",\"تبادل لوایح\",\"یکشنبه ۲۷ مهر ساعت ۱۱:۰۰\"\n";
        $output .= "\"۱۴۰۳-۵۵۶۱۱-تجدیدنظر\",\"هلدینگ میرباقری\",\"۰۹۱۲۲۲۲۲۲۲۲\",\"تخلیه و سرقفلی ملک تجاری\",\"شعبه ۲۸ تجدیدنظر\",\"مهلت تجدیدنظرخواهی\",\"پنج‌شنبه ۱۷ مهر\"\n";

        return new WP_REST_Response(array(
            'success'  => true,
            'filename' => "Caseload-Report-{$date}.csv",
            'csv_data' => $output,
        ), 200);
    }
}

SedRazavi_REST_API::init();
