<?php
/**
 * Consultation Booking Backend & AJAX Handlers
 *
 * @package SedRazavi_Addons
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_handle_booking_submission')) {
    function sedrazavi_handle_booking_submission() {
        // ۱. بررسی امنیتی توکن نانس
        if (!isset($_POST['nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])), 'sedrazavi_security_nonce')) {
            wp_send_json_error(array(
                'message' => esc_html__('اعتبار سنجی امنیتی ناموفق بود. لطفاً صفحه را تازه‌سازی کنید.', 'sedrazavi-addons')
            ), 403);
        }

        // ۲. ضدعفونی و دریافت ورودی‌ها
        $fullname     = isset($_POST['fullname']) ? sanitize_text_field(wp_unslash($_POST['fullname'])) : '';
        $phone        = isset($_POST['phone']) ? sanitize_text_field(wp_unslash($_POST['phone'])) : '';
        $email        = isset($_POST['email']) ? sanitize_email(wp_unslash($_POST['email'])) : '';
        $service_type = isset($_POST['service_type']) ? sanitize_text_field(wp_unslash($_POST['service_type'])) : '';
        $date         = isset($_POST['date']) ? sanitize_text_field(wp_unslash($_POST['date'])) : '';
        $time         = isset($_POST['time']) ? sanitize_text_field(wp_unslash($_POST['time'])) : '';
        $message      = isset($_POST['message']) ? sanitize_textarea_field(wp_unslash($_POST['message'])) : '';

        // اعتبارسنجی فیلدهای اجباری
        if (empty($fullname) || empty($phone) || empty($service_type)) {
            wp_send_json_error(array(
                'message' => esc_html__('لطفاً تمامی فیلدهای الزامی (نام، شماره تماس و حوزه خدمت) را تکمیل فرمایید.', 'sedrazavi-addons')
            ), 400);
        }

        // ۳. ذخیره‌سازی در دیتابیس اختصاصی
        global $wpdb;
        $table_name = $wpdb->prefix . 'sedrazavi_consultations';

        try {
            $inserted = $wpdb->insert(
                $table_name,
                array(
                    'fullname'       => $fullname,
                    'phone'          => $phone,
                    'email'          => $email,
                    'service_type'   => $service_type,
                    'preferred_date' => $date,
                    'preferred_time' => $time,
                    'message'        => $message,
                    'status'         => 'pending',
                    'created_at'     => current_time('mysql'),
                ),
                array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')
            );

            if ($inserted === false) {
                sedrazavi_addons_log_error(
                    'خطای دیتابیس در ثبت نوبت: ' . $wpdb->last_error,
                    __FILE__,
                    __LINE__,
                    'ERROR'
                );
                wp_send_json_error(array(
                    'message' => esc_html__('خطایی در ذخیره اطلاعات رخ داد. لطفاً با دفتر تماس بگیرید.', 'sedrazavi-addons')
                ), 500);
            }

            $booking_id = $wpdb->insert_id;

            // ارسال اعلان ایمیل به مدیر در صورت تنظیم
            $admin_email = get_option('admin_email');
            $subject = sprintf(esc_html__('درخواست نوبت مشاوره حقوقی جدید - کد #%d', 'sedrazavi-addons'), $booking_id);
            $email_body = sprintf(
                "درخواست جدیدی با مشخصات زیر در سایت ثبت شد:
نام: %s
تلفن: %s
موضوع: %s
تاریخ درخواستی: %s ساعت %s
توضیحات: %s",
                $fullname,
                $phone,
                $service_type,
                $date,
                $time,
                $message
            );
            @wp_mail($admin_email, $subject, $email_body);

            wp_send_json_success(array(
                'message'    => esc_html__('درخواست وقت مشاوره شما با موفقیت ثبت شد. کارشناسان حقوقی به زودی با شما تماس خواهند گرفت.', 'sedrazavi-addons'),
                'booking_id' => $booking_id,
            ));

        } catch (Throwable $e) {
            sedrazavi_addons_log_error('استثنا در ثبت مشاوره: ' . $e->getMessage(), $e->getFile(), $e->getLine());
            wp_send_json_error(array('message' => esc_html__('خطای سرور در پردازش درخواست.', 'sedrazavi-addons')), 500);
        }
    }
}
add_action('wp_ajax_sedrazavi_book_consultation', 'sedrazavi_handle_booking_submission');
add_action('wp_ajax_nopriv_sedrazavi_book_consultation', 'sedrazavi_handle_booking_submission');
