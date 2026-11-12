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
        check_ajax_referer('sedrazavi_security_nonce', 'nonce');

        if (function_exists('sedrazavi_addons_rate_limit_check') && !sedrazavi_addons_rate_limit_check('ajax_track_case', 12, 300)) {
            wp_send_json_error(array(
                'rate_limited' => true,
                'message'      => esc_html__('تعداد استعلام‌های پی‌درپی بیش از حد مجاز است. لطفاً چند دقیقه دیگر تلاش کنید.', 'sedrazavi-addons')
            ), 429);
        }

        $case_number = isset($_POST['case_number']) ? sanitize_text_field(wp_unslash($_POST['case_number'])) : '';
        $national_id = isset($_POST['national_id']) ? sanitize_text_field(wp_unslash($_POST['national_id'])) : '';

        if (empty($case_number) || empty($national_id)) {
            wp_send_json_error(array(
                'message' => esc_html__('لطفاً هم شماره پرونده و هم کد ملی موکل را وارد کنید.', 'sedrazavi-addons')
            ));
        }

        $persian = array('۰','۱','۲','۳','۴','۵','۶','۷','۸','۹','٠','١','٢','٣','٤','٥','٦','٧','٨','٩');
        $latin   = array('0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9');
        $clean_national_id = preg_replace('/\D/', '', str_replace($persian, $latin, $national_id));

        $args = array(
            'post_type'      => 'sedrazavi_case',
            'post_status'    => array('publish', 'private'),
            'posts_per_page' => 1,
            'meta_query'     => array(
                array(
                    'key'     => '_sedrazavi_case_number',
                    'value'   => $case_number,
                    'compare' => '=',
                ),
            ),
        );

        $query = new WP_Query($args);

        if ($query->have_posts()) {
            $query->the_post();
            $case_id = get_the_ID();
            $stored_nid = preg_replace('/\D/', '', str_replace($persian, $latin, (string) get_post_meta($case_id, '_sedrazavi_client_national_id', true)));
            $status     = get_post_meta($case_id, '_sedrazavi_case_status', true) ?: 'در جریان رسیدگی';
            $court      = get_post_meta($case_id, '_sedrazavi_court_branch', true) ?: 'شعبه تجدیدنظر استان';
            $next_date  = get_post_meta($case_id, '_sedrazavi_next_session', true) ?: 'در انتظار تعیین وقت دادگاه';
            $title      = get_the_title();
            $lawyer     = get_post_meta($case_id, '_sedrazavi_assigned_lawyer', true) ?: 'سید رضوی';
            wp_reset_postdata();

            if (empty($stored_nid) || empty($clean_national_id) || !hash_equals($stored_nid, $clean_national_id)) {
                wp_send_json_error(array(
                    'message' => esc_html__('پرونده‌ای با این مشخصات یافت نشد. لطفاً از صحت شماره پرونده و کد ملی اطمینان حاصل فرمایید.', 'sedrazavi-addons')
                ));
            }

            wp_send_json_success(array(
                'title'        => $title,
                'status'       => esc_html($status),
                'court'        => esc_html($court),
                'next_session' => esc_html($next_date),
                'lawyer'       => esc_html($lawyer),
            ));
        } else {
            wp_reset_postdata();
            wp_send_json_error(array(
                'message' => esc_html__('پرونده‌ای با این مشخصات یافت نشد. لطفاً از صحت شماره پرونده و کد ملی اطمینان حاصل فرمایید.', 'sedrazavi-addons')
            ));
        }
    }
}
add_action('wp_ajax_sedrazavi_track_case', 'sedrazavi_ajax_track_case');
add_action('wp_ajax_nopriv_sedrazavi_track_case', 'sedrazavi_ajax_track_case');
