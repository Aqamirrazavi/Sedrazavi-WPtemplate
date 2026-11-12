<?php
/**
 * SedRazavi Client Portal Engine (Part 7)
 * Confidential Client Portal & Case Tracking System
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Client_Portal {

    public static function init() {
        add_shortcode('sedrazavi_client_portal', [__CLASS__, 'render_shortcode']);
        add_action('wp_ajax_nopriv_sedrazavi_client_auth', [__CLASS__, 'ajax_authenticate']);
        add_action('wp_ajax_sedrazavi_client_auth', [__CLASS__, 'ajax_authenticate']);
        add_action('wp_ajax_nopriv_sedrazavi_client_get_timeline', [__CLASS__, 'ajax_get_timeline']);
        add_action('wp_ajax_sedrazavi_client_get_timeline', [__CLASS__, 'ajax_get_timeline']);
        add_action('wp_ajax_sedrazavi_client_upload_evidence', [__CLASS__, 'ajax_upload_evidence']);
        add_action('wp_ajax_sedrazavi_client_pay_installment', [__CLASS__, 'ajax_pay_installment']);
    }

    private static function normalize_digits($str) {
        $persian = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹','٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
        $latin   = ['0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9'];
        return preg_replace('/[^0-9a-zA-Z]/', '', str_replace($persian, $latin, (string) $str));
    }

    private static function issue_portal_token($case_id) {
        $token = bin2hex(random_bytes(24));
        set_transient('sr_portal_sess_' . $token, [
            'case_id'    => (int) $case_id,
            'ip_hash'    => hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1') . wp_salt('auth')),
            'issued_at'  => time(),
        ], 2 * HOUR_IN_SECONDS);
        return $token;
    }

    private static function verify_portal_access($case_id, $token = '') {
        $case_id = absint($case_id);
        if (!$case_id) {
            return false;
        }
        $case = get_post($case_id);
        if (!$case || !in_array($case->post_type, ['sedrazavi_case', 'sedrazavi_dashboard', 'case'], true)) {
            return false;
        }

        if (is_user_logged_in()) {
            $uid = get_current_user_id();
            if (current_user_can('manage_options') || current_user_can('edit_posts')) {
                return $case;
            }
            if ((int) $case->post_author === $uid || (int) get_post_meta($case_id, '_client_user_id', true) === $uid) {
                return $case;
            }
        }

        if (!empty($token) && preg_match('/^[a-f0-9]{48}$/', $token)) {
            $session = get_transient('sr_portal_sess_' . $token);
            $ip_hash = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1') . wp_salt('auth'));
            if (is_array($session) && (int) $session['case_id'] === $case_id && hash_equals((string) $session['ip_hash'], $ip_hash)) {
                return $case;
            }
        }

        return false;
    }

    /**
     * احراز هویت موکل با شماره همراه و کد پرونده + رمز یا کد ملی
     */
    public static function ajax_authenticate() {
        check_ajax_referer('sedrazavi_client_nonce', 'security');

        $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
        $rate_key = 'sr_client_portal_rl_' . md5($ip . wp_salt('auth'));
        $attempts = (int) get_transient($rate_key);
        if ($attempts >= 5) {
            wp_send_json_error(['message' => 'تعداد تلاش‌های ناموفق بیش از حد مجاز بوده است. لطفاً ۵ دقیقه دیگر تلاش کنید.'], 429);
        }
        set_transient($rate_key, $attempts + 1, 5 * MINUTE_IN_SECONDS);

        $phone       = sanitize_text_field($_POST['phone'] ?? '');
        $case_number = sanitize_text_field($_POST['case_number'] ?? '');
        $password    = sanitize_text_field($_POST['password'] ?? '');

        if (empty($phone) || empty($case_number)) {
            wp_send_json_error(['message' => 'لطفاً شماره همراه و شماره پرونده وکالت را وارد فرمایید.']);
        }

        $cases = get_posts([
            'post_type'      => ['sedrazavi_case', 'sedrazavi_dashboard', 'case'],
            'post_status'    => ['publish', 'private'],
            'posts_per_page' => 1,
            'meta_query'     => [
                [
                    'key'     => '_sedrazavi_case_number',
                    'value'   => $case_number,
                    'compare' => '=',
                ],
            ],
        ]);

        if (empty($cases)) {
            wp_send_json_error(['message' => 'پرونده‌ای با این مشخصات در سامانه محرمانه وکالت یافت نشد.'], 401);
        }

        $case = $cases[0];
        $case_id = $case->ID;
        $stored_phone = self::normalize_digits(get_post_meta($case_id, '_sedrazavi_client_phone', true));
        $input_phone  = self::normalize_digits($phone);

        if (empty($stored_phone) || strlen($input_phone) < 10 || !hash_equals($stored_phone, $input_phone)) {
            wp_send_json_error(['message' => 'پرونده‌ای با این مشخصات در سامانه محرمانه وکالت یافت نشد.'], 401);
        }

        // Secondary verification: portal passcode hash OR national ID when configured on dossier
        $stored_pass_hash = (string) get_post_meta($case_id, '_sedrazavi_portal_pass_hash', true);
        $stored_national_id = self::normalize_digits(get_post_meta($case_id, '_sedrazavi_client_national_id', true));

        if (!empty($stored_pass_hash)) {
            if (empty($password) || !wp_check_password($password, $stored_pass_hash)) {
                wp_send_json_error(['message' => 'رمز عبور یا کد امنیتی پورتال نامعتبر است.'], 401);
            }
        } elseif (!empty($stored_national_id)) {
            $input_sec = self::normalize_digits($password);
            if (empty($input_sec) || !hash_equals($stored_national_id, $input_sec)) {
                wp_send_json_error(['message' => 'تطابق کد ملی / رمز محرمانه تایید نشد.'], 401);
            }
        } elseif (!is_user_logged_in()) {
            wp_send_json_error(['message' => 'برای این پرونده رمز ورود پورتال یا کد ملی تنظیم نشده است. لطفاً با حساب کاربری وارد شوید.'], 403);
        }

        delete_transient($rate_key);
        $session_token = self::issue_portal_token($case_id);

        wp_send_json_success([
            'case_id'      => $case_id,
            'case_number'  => get_post_meta($case_id, '_sedrazavi_case_number', true),
            'client_name'  => get_post_meta($case_id, '_sedrazavi_client_name', true),
            'court_branch' => get_post_meta($case_id, '_sedrazavi_court_branch', true) ?: '',
            'subject'      => $case->post_title,
            'status'       => get_post_meta($case_id, '_sedrazavi_case_status', true) ?: 'در جریان رسیدگی',
            'next_session' => get_post_meta($case_id, '_sedrazavi_next_session', true) ?: 'در انتظار ابلاغ وقت',
            'total_fee'    => get_post_meta($case_id, '_sedrazavi_total_fee', true) ?: 'توافقی',
            'paid_amount'  => get_post_meta($case_id, '_sedrazavi_paid_amount', true) ?: '۰',
            'token'        => $session_token,
        ]);
    }

    /**
     * دریافت تایم‌لاین واقعی پرونده با احراز مالکیت و توکن نشست
     */
    public static function ajax_get_timeline() {
        check_ajax_referer('sedrazavi_client_nonce', 'security');
        $case_id = absint($_POST['case_id'] ?? 0);
        $token   = sanitize_text_field($_POST['token'] ?? '');

        $case = self::verify_portal_access($case_id, $token);
        if (!$case) {
            wp_send_json_error(['message' => 'دسترسی غیرمجاز یا نشست منقضی شده است.'], 403);
        }

        $timeline = get_post_meta($case->ID, '_sedrazavi_milestones', true);
        wp_send_json_success([
            'case_id'  => $case->ID,
            'timeline' => is_array($timeline) ? $timeline : [],
        ]);
    }

    /**
     * آپلود امن مدارک و مستندات پرونده (محدود به کاربر احرازشده و فرمت‌های مجاز)
     */
    public static function ajax_upload_evidence() {
        check_ajax_referer('sedrazavi_client_nonce', 'security');
        if (!is_user_logged_in()) {
            wp_send_json_error(['message' => 'برای بارگذاری مستندات، ورود به حساب کاربری الزامی است.'], 401);
        }

        $case_id = absint($_POST['case_id'] ?? 0);
        $token   = sanitize_text_field($_POST['token'] ?? '');
        $case    = self::verify_portal_access($case_id, $token);
        if (!$case) {
            wp_send_json_error(['message' => 'شما مجوز بارگذاری مدرک برای این پرونده را ندارید.'], 403);
        }

        if (empty($_FILES['evidence_file'])) {
            wp_send_json_error(['message' => 'فایلی برای بارگذاری انتخاب نشده است.'], 400);
        }

        $allowed_mimes = [
            'pdf'  => 'application/pdf',
            'jpg|jpeg' => 'image/jpeg',
            'png'  => 'image/png',
        ];
        if (!function_exists('wp_handle_upload')) {
            require_once ABSPATH . 'wp-admin/includes/file.php';
        }
        $upload = wp_handle_upload($_FILES['evidence_file'], [
            'test_form' => false,
            'mimes'     => $allowed_mimes,
        ]);

        if (!empty($upload['error'])) {
            wp_send_json_error(['message' => sanitize_text_field($upload['error'])], 400);
        }

        $docs = get_post_meta($case->ID, '_sedrazavi_documents', true);
        if (!is_array($docs)) {
            $docs = [];
        }
        $docs[] = [
            'title'       => sanitize_file_name(basename($upload['file'])),
            'uploaded_at' => current_time('mysql'),
            'uploaded_by' => get_current_user_id(),
            'mime'        => sanitize_text_field($upload['type'] ?? ''),
        ];
        update_post_meta($case->ID, '_sedrazavi_documents', $docs);

        wp_send_json_success(['message' => 'مدرک با موفقیت و به صورت امن در پرونده ثبت شد.']);
    }

    /**
     * ثبت درخواست پرداخت قسط حق‌الوکاله
     */
    public static function ajax_pay_installment() {
        check_ajax_referer('sedrazavi_client_nonce', 'security');
        if (!is_user_logged_in()) {
            wp_send_json_error(['message' => 'احراز هویت الزامی است.'], 401);
        }

        $case_id = absint($_POST['case_id'] ?? 0);
        $token   = sanitize_text_field($_POST['token'] ?? '');
        $amount  = absint($_POST['amount'] ?? 0);
        $case    = self::verify_portal_access($case_id, $token);
        if (!$case) {
            wp_send_json_error(['message' => 'دسترسی به این پرونده مجاز نیست.'], 403);
        }

        if ($amount < 1000) {
            wp_send_json_error(['message' => 'مبلغ پرداختی نامعتبر است.'], 400);
        }

        wp_send_json_success([
            'case_id' => $case->ID,
            'amount'  => $amount,
            'status'  => 'pending_gateway_redirect',
        ]);
    }

    /**
     * شورت‌کد اختصاصی پورتال موکلین
     */
    public static function render_shortcode($atts) {
        ob_start();
        ?>
        <div id="sedrazavi-client-portal-root" class="sedrazavi-portal-wrapper">
            <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl">
                <div class="flex items-center gap-3 pb-6 border-b border-gray-100 dark:border-gray-800">
                    <div class="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold">
                        ⚖️
                    </div>
                    <div>
                        <h3 class="text-lg font-bold font-serif text-[#0B132B] dark:text-white">درگاه اختصاصی موکلین محترم</h3>
                        <p class="text-xs text-gray-500">مشاهده زنده پرونده و مکاتبه مستقیم با دکتر سیده مریم رضوی</p>
                    </div>
                </div>
                <div class="py-6 text-center text-xs text-gray-500">
                    جهت مشاهده کامل، از منوی بالای سایت وارد «پرتال موکلین» شوید.
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}

SedRazavi_Client_Portal::init();