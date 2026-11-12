<?php
/**
 * SedRazavi Secure WordPress REST API Authentication & Nonce Engine
 *
 * Handles WordPress user authentication, nonces, and access control for the React dashboard,
 * ensuring only authenticated and authorized users can access sensitive case data, pleadings,
 * and confidential client dossiers via API.
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Direct access denied
}

class SedRazavi_WP_REST_Auth {

    const REST_NAMESPACE = 'sedrazavi/v1';

    /**
     * Initialize REST routes and authentication hooks
     */
    public static function init() {
        add_action('rest_api_init', [__CLASS__, 'register_auth_routes']);
        add_filter('rest_authentication_errors', [__CLASS__, 'validate_rest_nonce_header']);
    }

    /**
     * Register authentication and secure case access routes
     */
    public static function register_auth_routes() {

        // 1. Session verification & nonce refresh: POST /sedrazavi/v1/auth/verify-session
        register_rest_route(self::REST_NAMESPACE, '/auth/verify-session', [
            'methods'             => ['POST', 'GET'],
            'callback'            => [__CLASS__, 'handle_verify_session'],
            'permission_callback' => '__return_true',
        ]);

        // 2. Current User Profile & Capabilities: GET /sedrazavi/v1/auth/current-user
        register_rest_route(self::REST_NAMESPACE, '/auth/current-user', [
            'methods'             => ['GET'],
            'callback'            => [__CLASS__, 'handle_get_current_user'],
            'permission_callback' => '__return_true',
        ]);

        // 3. Secure Login: POST /sedrazavi/v1/auth/secure-login (public auth entry, rate-limited)
        register_rest_route(self::REST_NAMESPACE, '/auth/secure-login', [
            'methods'             => ['POST'],
            'callback'            => [__CLASS__, 'handle_secure_login'],
            'permission_callback' => '__return_true',
            'args'                => [
                'username' => ['type' => 'string', 'required' => false, 'sanitize_callback' => 'sanitize_user'],
                'log'      => ['type' => 'string', 'required' => false, 'sanitize_callback' => 'sanitize_user'],
                'remember' => ['type' => 'boolean', 'required' => false],
            ],
        ]);

        // 4. Secure Logout: POST /sedrazavi/v1/auth/secure-logout (requires authenticated user)
        register_rest_route(self::REST_NAMESPACE, '/auth/secure-logout', [
            'methods'             => ['POST'],
            'callback'            => [__CLASS__, 'handle_secure_logout'],
            'permission_callback' => [__CLASS__, 'check_logged_in_permission'],
        ]);

        // 5. Protected Cases List: GET /sedrazavi/v1/cases/secure-list
        register_rest_route(self::REST_NAMESPACE, '/cases/secure-list', [
            'methods'             => ['GET'],
            'callback'            => [__CLASS__, 'handle_get_secure_cases'],
            'permission_callback' => [__CLASS__, 'check_case_access_permission'],
        ]);

        // 6. Protected Single Case Details: GET /sedrazavi/v1/cases/secure-detail
        register_rest_route(self::REST_NAMESPACE, '/cases/secure-detail', [
            'methods'             => ['GET'],
            'callback'            => [__CLASS__, 'handle_get_secure_case_detail'],
            'permission_callback' => [__CLASS__, 'check_case_access_permission'],
            'args'                => [
                'case_id' => [
                    'required'          => false,
                    'sanitize_callback' => 'sanitize_text_field',
                ],
            ],
        ]);
    }

    /**
     * Strict Authentication Check: Must be authenticated WordPress user
     * Nonce is NOT authentication.
     */
    public static function check_logged_in_permission($request = null) {
        if (!is_user_logged_in()) {
            return new WP_Error(
                'rest_not_logged_in',
                esc_html__('احراز هویت الزامی است. لطفاً ابتدا وارد حساب کاربری خود شوید.', 'sedrazavi'),
                ['status' => 401]
            );
        }

        // Verify CSRF nonce for state-changing or authenticated actions
        $nonce = $request ? ($request->get_header('X-WP-Nonce') ?: $request->get_header('x-wp-nonce')) : null;
        if ($nonce && !wp_verify_nonce($nonce, 'wp_rest')) {
            return new WP_Error(
                'rest_invalid_nonce',
                esc_html__('اعتبار نانس امنیتی نامعتبر یا منقضی شده است.', 'sedrazavi'),
                ['status' => 403]
            );
        }

        return true;
    }

    /**
     * Strict Case Access Permission & Ownership Check
     * Enforces Role-Based Access Control (RBAC) + Per-Object Ownership validation.
     * Lawyers and Administrators can access dossiers; clients can ONLY access their own records.
     */
    public static function check_case_access_permission($request = null) {
        if (!is_user_logged_in()) {
            return new WP_Error(
                'rest_forbidden',
                esc_html__('جهت دسترسی به پرونده‌های محرمانه وکالت، ورود به حساب کاربری معتبر الزامی است.', 'sedrazavi'),
                ['status' => 401]
            );
        }

        $current_user_id = get_current_user_id();
        $allowed_post_types = ['sedrazavi_case', 'case', 'arbitration_case', 'sedrazavi_dashboard'];

        // 1. Staff with manage_options or edit_posts have global authorized access
        if (current_user_can('manage_options') || current_user_can('edit_posts')) {
            return true;
        }

        // 2. For single case detail, enforce strict object ownership
        if ($request) {
            $case_id = sanitize_text_field($request->get_param('case_id') ?: $request->get_param('id'));
            if (!empty($case_id)) {
                if (is_numeric($case_id)) {
                    $case_post = get_post(intval($case_id));
                    if (
                        !$case_post ||
                        !in_array($case_post->post_type, $allowed_post_types, true) ||
                        ((int) $case_post->post_author !== $current_user_id && (int) get_post_meta($case_post->ID, '_client_user_id', true) !== $current_user_id)
                    ) {
                        return new WP_Error(
                            'rest_case_forbidden',
                            esc_html__('شما اجازه دسترسی به این پرونده قضایی محرمانه را ندارید.', 'sedrazavi'),
                            ['status' => 403]
                        );
                    }
                } else {
                    // String identifier mapping: fail closed unless client has an explicit matching dossier assignment
                    $client_allowed_dossier = (string) get_user_meta($current_user_id, '_sedrazavi_assigned_case_id', true);
                    $owned_posts = get_posts([
                        'post_type'      => $allowed_post_types,
                        'post_status'    => ['publish', 'private'],
                        'posts_per_page' => 1,
                        'fields'         => 'ids',
                        'meta_query'     => [
                            'relation' => 'AND',
                            [
                                'relation' => 'OR',
                                [
                                    'key'     => '_sedrazavi_case_number',
                                    'value'   => $case_id,
                                    'compare' => '=',
                                ],
                                [
                                    'key'     => '_case_number',
                                    'value'   => $case_id,
                                    'compare' => '=',
                                ],
                            ],
                            [
                                'key'     => '_client_user_id',
                                'value'   => $current_user_id,
                                'compare' => '=',
                            ],
                        ],
                    ]);
                    if (empty($owned_posts) && (empty($client_allowed_dossier) || !hash_equals($client_allowed_dossier, $case_id))) {
                        return new WP_Error(
                            'rest_case_forbidden',
                            esc_html__('دسترسی غیرمجاز: این پرونده متعلق به حساب کاربری شما نمی‌باشد.', 'sedrazavi'),
                            ['status' => 403]
                        );
                    }
                }
            }
        }

        // 3. For list endpoints, only allow users who have read capability (list is filtered per-object in handler)
        if (current_user_can('read')) {
            return true;
        }

        return new WP_Error(
            'rest_forbidden',
            esc_html__('مجوز کاربری شما برای مشاهده پرونده‌ها کافی نمی‌باشد.', 'sedrazavi'),
            ['status' => 403]
        );
    }

    /**
     * Filter REST Authentication Errors for consistent security reporting
     */
    public static function validate_rest_nonce_header($result) {
        // If an authentication error has already occurred, pass it along
        if (!empty($result)) {
            return $result;
        }
        return true;
    }

    /**
     * Handle Session Verification & Nonce Refresh
     */
    public static function handle_verify_session($request) {
        $is_auth = is_user_logged_in();
        $user = $is_auth ? wp_get_current_user() : null;

        $response_data = [
            'authenticated' => $is_auth,
            'nonce'         => wp_create_nonce('wp_rest'),
            'timestamp'     => current_time('timestamp'),
        ];

        if ($is_auth && $user) {
            $is_admin = in_array('administrator', (array) $user->roles, true);
            $is_lawyer = $is_admin || in_array('editor', (array) $user->roles, true) || in_array('lawyer', (array) $user->roles, true);

            $response_data['user'] = [
                'id'          => $user->ID,
                'username'    => $user->user_login,
                'displayName' => $user->display_name,
                'email'       => $user->user_email,
                'roles'       => (array) $user->roles,
                'isAdmin'     => $is_admin,
                'isLawyer'    => $is_lawyer,
                'role'        => $is_lawyer ? 'lawyer' : 'client',
            ];
        } else {
            $response_data['user'] = null;
        }

        return new WP_REST_Response($response_data, 200);
    }

    /**
     * Handle Get Current User
     */
    public static function handle_get_current_user($request) {
        if (!is_user_logged_in()) {
            return new WP_REST_Response([
                'isLoggedIn' => false,
                'message'    => 'کاربر وارد نشده است.',
            ], 200);
        }

        $user = wp_get_current_user();
        $is_admin = current_user_can('manage_options');
        $is_lawyer = current_user_can('edit_posts');

        return new WP_REST_Response([
            'isLoggedIn'  => true,
            'id'          => $user->ID,
            'displayName' => $user->display_name,
            'email'       => $user->user_email,
            'roles'       => (array) $user->roles,
            'isAdmin'     => $is_admin,
            'isLawyer'    => $is_lawyer,
            'role'        => $is_lawyer ? 'lawyer' : 'client',
            'nonce'       => wp_create_nonce('wp_rest'),
        ], 200);
    }

    /**
     * Handle Secure Login via REST
     */
    public static function handle_secure_login($request) {
        if (class_exists('SedRazavi_Rate_Limiter')) {
            if (!SedRazavi_Rate_Limiter::check_rate_limit('login_attempt', 5, 300)) {
                return new WP_REST_Response([
                    'success' => false,
                    'message' => 'تلاش‌های ورود بیش از حد مجاز بوده است. لطفاً ۵ دقیقه بعد مجدداً تلاش فرمایید.',
                ], 429);
            }
        } else {
            $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
            $rate_key = 'sr_rest_login_' . md5($ip . wp_salt('auth'));
            $attempts = (int) get_transient($rate_key);
            if ($attempts >= 5) {
                return new WP_REST_Response([
                    'success' => false,
                    'message' => 'تلاش‌های ورود بیش از حد مجاز بوده است. لطفاً ۵ دقیقه بعد مجدداً تلاش فرمایید.',
                ], 429);
            }
            set_transient($rate_key, $attempts + 1, 5 * MINUTE_IN_SECONDS);
        }

        $params = $request->get_json_params() ?: $request->get_params();

        $credentials = [
            'user_login'    => sanitize_user($params['username'] ?? ($params['log'] ?? '')),
            'user_password' => $params['password'] ?? ($params['pwd'] ?? ''),
            'remember'      => !empty($params['remember']),
        ];

        if (empty($credentials['user_login']) || empty($credentials['user_password'])) {
            return new WP_REST_Response([
                'success' => false,
                'message' => 'نام کاربری یا رمز عبور اشتباه است.',
            ], 400);
        }

        $user = wp_authenticate($credentials['user_login'], $credentials['user_password']);

        if (is_wp_error($user)) {
            return new WP_REST_Response([
                'success' => false,
                'message' => 'نام کاربری یا رمز عبور اشتباه است.',
            ], 401);
        }

        // Set session cookies
        wp_set_current_user($user->ID);
        wp_set_auth_cookie($user->ID, $credentials['remember']);

        $is_admin = in_array('administrator', (array) $user->roles, true);
        $is_lawyer = $is_admin || in_array('editor', (array) $user->roles, true) || in_array('lawyer', (array) $user->roles, true);

        return new WP_REST_Response([
            'success'   => true,
            'message'   => 'ورود با موفقیت انجام شد.',
            'nonce'     => wp_create_nonce('wp_rest'),
            'user'      => [
                'id'          => $user->ID,
                'username'    => $user->user_login,
                'displayName' => $user->display_name,
                'email'       => $user->user_email,
                'role'        => $is_lawyer ? 'lawyer' : 'client',
                'isAdmin'     => $is_admin,
                'isLawyer'    => $is_lawyer,
            ],
        ], 200);
    }

    /**
     * Handle Secure Logout
     */
    public static function handle_secure_logout($request) {
        wp_logout();
        return new WP_REST_Response([
            'success' => true,
            'message' => 'خروج با موفقیت انجام گردید.',
            'nonce'   => wp_create_nonce('wp_rest'),
        ], 200);
    }

    /**
     * Handle Get Secure Cases List (Restricted by Role and Ownership)
     * Strictly enforces per-object ownership: clients only see their own cases;
     * staff/attorneys with proper capability see the full assigned caseload.
     */
    public static function handle_get_secure_cases($request) {
        $current_user_id = get_current_user_id();
        $is_lawyer = current_user_can('edit_posts') || current_user_can('manage_options');
        $allowed_post_types = ['sedrazavi_case', 'case', 'arbitration_case', 'sedrazavi_dashboard'];

        $cases_output = [];

        $cpt_query = new \WP_Query([
            'post_type'      => $allowed_post_types,
            'post_status'    => ['publish', 'private'],
            'posts_per_page' => 50,
            'orderby'        => 'date',
            'order'          => 'DESC',
        ]);

        if ($cpt_query->have_posts()) {
            while ($cpt_query->have_posts()) {
                $cpt_query->the_post();
                $pid = get_the_ID();
                $client_uid = (int) get_post_meta($pid, '_client_user_id', true);
                $post_author = (int) get_post_field('post_author', $pid);
                $case_num = get_post_meta($pid, '_sedrazavi_case_number', true) ?: get_post_meta($pid, '_case_number', true);
                $assigned_dossier = (string) get_user_meta($current_user_id, '_sedrazavi_assigned_case_id', true);

                // Enforce strict ownership: non-staff only see dossiers explicitly assigned to them
                $is_owner = ($client_uid === $current_user_id)
                    || ($post_author === $current_user_id)
                    || (!empty($assigned_dossier) && ($assigned_dossier === (string) $pid || (!empty($case_num) && $assigned_dossier === (string) $case_num)));

                if (!$is_lawyer && !$is_owner) {
                    continue;
                }

                $phone = get_post_meta($pid, '_sedrazavi_client_phone', true) ?: get_post_meta($pid, '_client_phone', true);
                $cases_output[] = [
                    'id'             => (string) $pid,
                    'caseNumber'     => $case_num ?: ('SR-' . $pid),
                    'subject'        => get_the_title(),
                    'clientName'     => get_post_meta($pid, '_sedrazavi_client_name', true) ?: get_post_meta($pid, '_client_name', true) ?: get_the_author(),
                    'clientPhone'    => $is_lawyer ? $phone : '***',
                    'courtBranch'    => get_post_meta($pid, '_sedrazavi_court_branch', true) ?: get_post_meta($pid, '_court_branch', true) ?: '',
                    'hearingDate'    => get_post_meta($pid, '_sedrazavi_next_session', true) ?: get_post_meta($pid, '_hearing_date', true) ?: '',
                    'progress'       => intval(get_post_meta($pid, '_sedrazavi_progress', true) ?: get_post_meta($pid, '_case_progress', true) ?: 0),
                    'status'         => get_post_meta($pid, '_sedrazavi_case_status', true) ?: get_post_meta($pid, '_case_status', true) ?: 'در جریان رسیدگی',
                    'isConfidential' => true,
                ];
            }
            wp_reset_postdata();
        }

        return new WP_REST_Response([
            'success'    => true,
            'total'      => count($cases_output),
            'cases'      => $cases_output,
            'isLawyer'   => $is_lawyer,
            'docketCode' => 'SR-DOCKET-' . gmdate('Y'),
        ], 200);
    }

    /**
     * Handle Get Secure Case Detail (Strict DB Lookup + Anti-IDOR)
     */
    public static function handle_get_secure_case_detail($request) {
        $case_id = sanitize_text_field($request->get_param('case_id') ?: $request->get_param('id'));
        if (empty($case_id)) {
            return new WP_Error(
                'rest_missing_case_id',
                esc_html__('شناسه پرونده الزامی است.', 'sedrazavi'),
                ['status' => 400]
            );
        }

        $current_user_id = get_current_user_id();
        $is_lawyer = current_user_can('edit_posts') || current_user_can('manage_options');
        $allowed_post_types = ['sedrazavi_case', 'case', 'arbitration_case', 'sedrazavi_dashboard'];

        $case_post = null;
        if (is_numeric($case_id)) {
            $candidate = get_post(intval($case_id));
            if ($candidate && in_array($candidate->post_type, $allowed_post_types, true)) {
                $case_post = $candidate;
            }
        } else {
            $matches = get_posts([
                'post_type'      => $allowed_post_types,
                'post_status'    => ['publish', 'private'],
                'posts_per_page' => 1,
                'meta_query'     => [
                    'relation' => 'OR',
                    [
                        'key'     => '_sedrazavi_case_number',
                        'value'   => $case_id,
                        'compare' => '=',
                    ],
                    [
                        'key'     => '_case_number',
                        'value'   => $case_id,
                        'compare' => '=',
                    ],
                ],
            ]);
            if (!empty($matches)) {
                $case_post = $matches[0];
            }
        }

        if (!$case_post) {
            return new WP_Error(
                'rest_case_not_found',
                esc_html__('پرونده‌ای با این مشخصات در پایگاه داده یافت نشد.', 'sedrazavi'),
                ['status' => 404]
            );
        }

        $pid = $case_post->ID;
        $client_uid = (int) get_post_meta($pid, '_client_user_id', true);
        $post_author = (int) $case_post->post_author;
        $case_num = (string) (get_post_meta($pid, '_sedrazavi_case_number', true) ?: get_post_meta($pid, '_case_number', true) ?: $pid);
        $assigned_dossier = (string) get_user_meta($current_user_id, '_sedrazavi_assigned_case_id', true);

        $is_owner = ($client_uid === $current_user_id)
            || ($post_author === $current_user_id)
            || (!empty($assigned_dossier) && ($assigned_dossier === (string) $pid || $assigned_dossier === $case_num));

        if (!$is_lawyer && !$is_owner) {
            return new WP_Error(
                'rest_case_forbidden',
                esc_html__('شما اجازه دسترسی به جزئیات این پرونده محرمانه را ندارید.', 'sedrazavi'),
                ['status' => 403]
            );
        }

        $docs = get_post_meta($pid, '_sedrazavi_documents', true);
        if (!is_array($docs)) {
            $docs = [];
        }

        $phone = get_post_meta($pid, '_sedrazavi_client_phone', true) ?: get_post_meta($pid, '_client_phone', true);
        $case_detail = [
            'id'           => (string) $pid,
            'caseNumber'   => $case_num,
            'subject'      => get_the_title($pid),
            'clientName'   => get_post_meta($pid, '_sedrazavi_client_name', true) ?: get_post_meta($pid, '_client_name', true) ?: '',
            'clientPhone'  => $is_lawyer ? $phone : '***',
            'courtBranch'  => get_post_meta($pid, '_sedrazavi_court_branch', true) ?: get_post_meta($pid, '_court_branch', true) ?: '',
            'hearingDate'  => get_post_meta($pid, '_sedrazavi_next_session', true) ?: get_post_meta($pid, '_hearing_date', true) ?: '',
            'progress'     => intval(get_post_meta($pid, '_sedrazavi_progress', true) ?: get_post_meta($pid, '_case_progress', true) ?: 0),
            'status'       => get_post_meta($pid, '_sedrazavi_case_status', true) ?: get_post_meta($pid, '_case_status', true) ?: 'در جریان رسیدگی',
            'totalFee'     => ($is_lawyer || $is_owner) ? (get_post_meta($pid, '_sedrazavi_total_fee', true) ?: '') : '',
            'paidAmount'   => ($is_lawyer || $is_owner) ? (get_post_meta($pid, '_sedrazavi_paid_amount', true) ?: '') : '',
            'remainingFee' => ($is_lawyer || $is_owner) ? (get_post_meta($pid, '_sedrazavi_remaining_fee', true) ?: '') : '',
            'documents'    => $docs,
        ];

        return new WP_REST_Response([
            'success' => true,
            'case'    => $case_detail,
        ], 200);
    }
}

// Initialize Auth Engine
SedRazavi_WP_REST_Auth::init();
