<?php
/**
 * Online Case Tracking System for Clients
 *
 * @package SedRazavi_Addons
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_ajax_track_case')) {
    function sedrazavi_ajax_track_case() {
        $nonce_key = isset($_POST['nonce']) ? 'nonce' : 'security';
        check_ajax_referer('sedrazavi_security_nonce', $nonce_key);

        if (function_exists('sedrazavi_addons_rate_limit_check') && !sedrazavi_addons_rate_limit_check('ajax_track_case', 12, 300)) {
            wp_send_json_error(array(
                'rate_limited' => true,
                'message'      => esc_html__('تعداد استعلام‌های پی‌درپی بیش از حد مجاز است. لطفاً چند دقیقه دیگر تلاش کنید.', 'sedrazavi-addons')
            ), 429);
        }

        $case_number  = isset($_POST['case_number']) ? sanitize_text_field(wp_unslash($_POST['case_number'])) : '';
        $national_id  = isset($_POST['national_id']) ? sanitize_text_field(wp_unslash($_POST['national_id'])) : '';
        $client_phone = isset($_POST['client_phone']) ? sanitize_text_field(wp_unslash($_POST['client_phone'])) : (isset($_POST['phone']) ? sanitize_text_field(wp_unslash($_POST['phone'])) : '');

        if (empty($case_number) || (empty($national_id) && empty($client_phone))) {
            wp_send_json_error(array(
                'message' => esc_html__('لطفاً شماره پرونده به همراه کد ملی یا شماره موبایل موکل را وارد کنید.', 'sedrazavi-addons')
            ), 400);
        }

        $persian = array('۰','۱','۲','۳','۴','۵','۶','۷','۸','۹','٠','١','٢','٣','٤','٥','٦','٧','٨','٩');
        $latin   = array('0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9');
        $clean_national_id = preg_replace('/\D/', '', str_replace($persian, $latin, $national_id));
        $clean_phone       = ltrim(preg_replace('/\D/', '', str_replace($persian, $latin, $client_phone)), '0');

        $case_post_types = class_exists('SedRazavi_Case_Data_Service')
            ? SedRazavi_Case_Data_Service::get_litigation_post_types()
            : array('sedrazavi_case', 'case');

        $args = array(
            'post_type'      => $case_post_types,
            'post_status'    => array('private', 'publish'),
            'posts_per_page' => 1,
            'meta_query'     => array(
                'relation' => 'OR',
                array(
                    'key'     => '_sedrazavi_case_number',
                    'value'   => $case_number,
                    'compare' => '=',
                ),
                array(
                    'key'     => '_case_number',
                    'value'   => $case_number,
                    'compare' => '=',
                ),
            ),
        );

        $query = new WP_Query($args);

        if ($query->have_posts()) {
            $query->the_post();
            $case_id = get_the_ID();
            $stored_nid   = preg_replace('/\D/', '', str_replace($persian, $latin, (string) get_post_meta($case_id, '_sedrazavi_client_national_id', true)));
            $stored_phone = ltrim(preg_replace('/\D/', '', str_replace($persian, $latin, (string) (get_post_meta($case_id, '_sedrazavi_client_phone', true) ?: get_post_meta($case_id, '_client_phone', true)))), '0');

            $nid_verified   = ($clean_national_id !== '' && $stored_nid !== '' && hash_equals($stored_nid, $clean_national_id));
            $phone_verified = ($clean_phone !== '' && $stored_phone !== '' && hash_equals($stored_phone, $clean_phone));

            if (!$nid_verified && !$phone_verified) {
                wp_reset_postdata();
                wp_send_json_error(array(
                    'message' => esc_html__('پرونده‌ای با این مشخصات یافت نشد. لطفاً از صحت شماره پرونده و اطلاعات هویتی اطمینان حاصل فرمایید.', 'sedrazavi-addons')
                ), 404);
            }

            $status     = get_post_meta($case_id, '_sedrazavi_case_status', true) ?: (get_post_meta($case_id, '_case_status', true) ?: 'در جریان رسیدگی');
            $court      = get_post_meta($case_id, '_sedrazavi_court_branch', true) ?: (get_post_meta($case_id, '_court_branch', true) ?: 'شعبه رسیدگی');
            $next_date  = get_post_meta($case_id, '_sedrazavi_next_session', true) ?: 'تعیین نشده';
            $title      = get_the_title();
            $lawyer     = get_post_meta($case_id, '_sedrazavi_assigned_lawyer', true) ?: 'وکیل پرونده';
            wp_reset_postdata();

            wp_send_json_success(array(
                'found'           => true,
                'case_number'     => $case_number,
                'case_type'       => get_post_meta($case_id, '_sedrazavi_case_type', true) ?: 'حقوقی',
                'title'           => $title,
                'status'          => esc_html($status),
                'court'           => esc_html($court),
                'next_session'    => esc_html($next_date),
                'lawyer'          => esc_html($lawyer),
                'documents_count' => (int) (get_post_meta($case_id, '_sedrazavi_docs_count', true) ?: 0),
            ));
        } else {
            wp_reset_postdata();
            wp_send_json_error(array(
                'message' => esc_html__('پرونده‌ای با این مشخصات یافت نشد. لطفاً از صحت شماره پرونده و اطلاعات هویتی اطمینان حاصل فرمایید.', 'sedrazavi-addons')
            ), 404);
        }
    }
}
add_action('wp_ajax_sedrazavi_track_case', 'sedrazavi_ajax_track_case');
add_action('wp_ajax_nopriv_sedrazavi_track_case', 'sedrazavi_ajax_track_case');
