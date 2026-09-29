<?php
/**
 * SedRazavi Case Management & Client Tracker Engine
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Custom Post Type for Legal Cases
 */
if (!function_exists('sedrazavi_register_case_cpt')) {
    function sedrazavi_register_case_cpt() {
        if (post_type_exists('sedrazavi_case')) {
            return;
        }

        $labels = array(
            'name'               => esc_html__('پرونده‌های موکلین', 'sedrazavi'),
            'singular_name'      => esc_html__('پرونده حقوقی', 'sedrazavi'),
            'menu_name'          => esc_html__('مدیریت پرونده‌ها', 'sedrazavi'),
            'add_new'            => esc_html__('ثبت پرونده جدید', 'sedrazavi'),
            'add_new_item'       => esc_html__('ثبت پرونده حقوقی جدید', 'sedrazavi'),
            'edit_item'          => esc_html__('ویرایش پرونده', 'sedrazavi'),
            'all_items'          => esc_html__('همه پرونده‌ها', 'sedrazavi'),
        );

        $args = array(
            'labels'             => $labels,
            'public'             => false, // Private to lawyer/clients
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-portfolio',
            'supports'           => array('title', 'custom-fields'),
            'show_in_rest'       => true,
        );

        register_post_type('sedrazavi_case', $args);

        // Register Appointments CPT
        if (!post_type_exists('sedrazavi_appointment')) {
            $appointment_labels = array(
                'name'          => esc_html__('نوبت‌های مشاوره', 'sedrazavi'),
                'singular_name' => esc_html__('نوبت مشاوره', 'sedrazavi'),
                'menu_name'     => esc_html__('رزرو نوبت‌ها', 'sedrazavi'),
                'all_items'     => esc_html__('همه نوبت‌ها', 'sedrazavi'),
            );
            register_post_type('sedrazavi_appointment', array(
                'labels'        => $appointment_labels,
                'public'        => false,
                'show_ui'       => true,
                'show_in_menu'  => true,
                'menu_icon'     => 'dashicons-calendar-alt',
                'supports'      => array('title', 'editor', 'custom-fields'),
                'show_in_rest'  => true,
            ));
        }
    }
    add_action('init', 'sedrazavi_register_case_cpt');
}

/**
 * AJAX Handler for Online Case Tracking
 */
if (!function_exists('sedrazavi_ajax_track_case')) {
    function sedrazavi_ajax_track_case() {
        check_ajax_referer('sedrazavi_security_nonce', 'security');

        $case_number = isset($_POST['case_number']) ? sanitize_text_field($_POST['case_number']) : '';
        $client_phone = isset($_POST['client_phone']) ? sanitize_text_field($_POST['client_phone']) : '';

        if (empty($case_number)) {
            wp_send_json_error(array('message' => esc_html__('لطفاً شماره پرونده را وارد فرمایید.', 'sedrazavi')));
        }

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
            $post_id = get_the_ID();

            $response = array(
                'found'            => true,
                'case_number'      => $case_number,
                'client_name'      => get_the_title(),
                'case_type'        => get_post_meta($post_id, '_sedrazavi_case_type', true) ?: 'حقوقی',
                'status'           => get_post_meta($post_id, '_sedrazavi_case_status', true) ?: 'در جریان',
                'next_session'     => get_post_meta($post_id, '_sedrazavi_next_session', true) ?: 'تعیین نشده',
                'notes'            => get_post_meta($post_id, '_sedrazavi_case_notes', true) ?: 'در حال پیگیری توسط وکیل',
                'documents_count'  => get_post_meta($post_id, '_sedrazavi_docs_count', true) ?: 0,
            );
            wp_reset_postdata();
            wp_send_json_success($response);
        } else {
            wp_send_json_error(array('message' => esc_html__('پرونده‌ای با این مشخصات یافت نشد.', 'sedrazavi')));
        }
    }
    add_action('wp_ajax_sedrazavi_track_case', 'sedrazavi_ajax_track_case');
    add_action('wp_ajax_nopriv_sedrazavi_track_case', 'sedrazavi_ajax_track_case');
}
