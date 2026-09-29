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
        add_action('wp_ajax_sedrazavi_client_get_timeline', [__CLASS__, 'ajax_get_timeline']);
        add_action('wp_ajax_sedrazavi_client_upload_evidence', [__CLASS__, 'ajax_upload_evidence']);
        add_action('wp_ajax_sedrazavi_client_pay_installment', [__CLASS__, 'ajax_pay_installment']);
    }

    /**
     * احراز هویت موکل با شماره همراه و کد پرونده یا رمز عبور یکبار مصرف
     */
    public static function ajax_authenticate() {
        check_ajax_referer('sedrazavi_client_nonce', 'security');

        $phone = sanitize_text_field($_POST['phone'] ?? '');
        $case_number = sanitize_text_field($_POST['case_number'] ?? '');
        $password = sanitize_text_field($_POST['password'] ?? '');

        if (empty($phone) || empty($case_number)) {
            wp_send_json_error(['message' => 'لطفاً شماره همراه و شماره پرونده وکالت را وارد فرمایید.']);
        }

        // جستجوی پرونده در دیتابیس
        $cases = get_posts([
            'post_type'      => 'sedrazavi_dashboard',
            'posts_per_page' => 1,
            'meta_query'     => [
                'relation' => 'AND',
                [
                    'key'     => '_sedrazavi_case_number',
                    'value'   => $case_number,
                    'compare' => '='
                ],
                [
                    'key'     => '_sedrazavi_client_phone',
                    'value'   => $phone,
                    'compare' => 'LIKE'
                ]
            ]
        ]);

        if (empty($cases)) {
            wp_send_json_error(['message' => 'پرونده‌ای با این مشخصات در سامانه محرمانه وکالت یافت نشد.']);
        }

        $case = $cases[0];
        $case_id = $case->ID;

        // ایجاد سشن امن موکل
        wp_send_json_success([
            'case_id'       => $case_id,
            'case_number'   => get_post_meta($case_id, '_sedrazavi_case_number', true),
            'client_name'   => get_post_meta($case_id, '_sedrazavi_client_name', true),
            'court_branch'  => get_post_meta($case_id, '_sedrazavi_court_branch', true) ?: 'شعبه ۱۲ دادگاه عمومی حقوقی',
            'subject'       => $case->post_title,
            'status'        => get_post_meta($case_id, '_sedrazavi_case_status', true) ?: 'در جریان رسیدگی',
            'next_session'  => get_post_meta($case_id, '_sedrazavi_next_session', true) ?: 'در انتظار ابلاغ وقت',
            'total_fee'     => get_post_meta($case_id, '_sedrazavi_total_fee', true) ?: 'توافقی',
            'paid_amount'   => get_post_meta($case_id, '_sedrazavi_paid_amount', true) ?: '۰',
            'token'         => wp_create_nonce('sedrazavi_session_' . $case_id),
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