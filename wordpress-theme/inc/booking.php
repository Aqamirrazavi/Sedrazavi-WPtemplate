<?php
/**
 * SedRazavi Consultation Booking Engine
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Handle AJAX Booking Submission
 */
if (!function_exists('sedrazavi_ajax_handle_booking')) {
    function sedrazavi_ajax_handle_booking() {
        check_ajax_referer('sedrazavi_security_nonce', 'security');

        $name    = isset($_POST['client_name']) ? sanitize_text_field($_POST['client_name']) : '';
        $phone   = isset($_POST['client_phone']) ? sanitize_text_field($_POST['client_phone']) : '';
        $service = isset($_POST['service_type']) ? sanitize_text_field($_POST['service_type']) : '';
        $date    = isset($_POST['booking_date']) ? sanitize_text_field($_POST['booking_date']) : '';
        $time    = isset($_POST['booking_time']) ? sanitize_text_field($_POST['booking_time']) : '';
        $notes   = isset($_POST['notes']) ? sanitize_textarea_field($_POST['notes']) : '';

        if (empty($name) || empty($phone) || empty($service)) {
            wp_send_json_error(array('message' => esc_html__('لطفاً تمامی فیلدهای الزامی را تکمیل نمایید.', 'sedrazavi')));
        }

        // Save as CPT or custom log
        $appointment_id = wp_insert_post(array(
            'post_title'   => sprintf(esc_html__('نوبت مشاوره: %s - %s', 'sedrazavi'), $name, $date),
            'post_type'    => 'sedrazavi_appointment',
            'post_status'  => 'publish',
            'post_content' => $notes,
        ));

        if (!is_wp_error($appointment_id)) {
            update_post_meta($appointment_id, '_sedrazavi_client_phone', $phone);
            update_post_meta($appointment_id, '_sedrazavi_service_type', $service);
            update_post_meta($appointment_id, '_sedrazavi_booking_date', $date);
            update_post_meta($appointment_id, '_sedrazavi_booking_time', $time);

            // Trigger SMS / Email notifications to lawyer
            do_action('sedrazavi_after_booking_created', $appointment_id, $name, $phone);

            wp_send_json_success(array(
                'message' => esc_html__('نوبت مشاوره شما با موفقیت رزرو شد. پیامک تأیید برای شما ارسال گردید.', 'sedrazavi'),
                'booking_id' => $appointment_id
            ));
        } else {
            wp_send_json_error(array('message' => esc_html__('خطایی در ثبت نوبت رخ داد.', 'sedrazavi')));
        }
    }
    add_action('wp_ajax_sedrazavi_submit_booking', 'sedrazavi_ajax_handle_booking');
    add_action('wp_ajax_nopriv_sedrazavi_submit_booking', 'sedrazavi_ajax_handle_booking');
}
