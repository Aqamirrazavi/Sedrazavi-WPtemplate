<?php
/**
 * Real-Time Lead Notification & Sound Engine
 *
 * Handles instant alerting for admins/lawyers when visitors submit consultation,
 * appointment, or case tracking forms. Provides audio chime triggering, AJAX polling,
 * and database persistence.
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Realtime_Notifications {

    private static $instance = null;
    const OPTION_LEADS_QUEUE = 'sedrazavi_realtime_leads_queue';

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('init', array($this, 'register_lead_post_type'));
        add_action('wp_ajax_sedrazavi_submit_lead', array($this, 'ajax_submit_lead'));
        add_action('wp_ajax_nopriv_sedrazavi_submit_lead', array($this, 'ajax_submit_lead'));
        add_action('wp_ajax_sedrazavi_poll_leads', array($this, 'ajax_poll_leads'));
        add_action('wp_ajax_sedrazavi_mark_lead_read', array($this, 'ajax_mark_lead_read'));
        add_action('admin_bar_menu', array($this, 'add_realtime_admin_bar_bell'), 999);
    }

    public function register_lead_post_type() {
        register_post_type('uas_lead', array(
            'labels' => array(
                'name'               => __('لیدها و درخواست‌های آنلاین', 'sedrazavi'),
                'singular_name'      => __('درخواست مشاوره', 'sedrazavi'),
                'menu_name'          => __('اعلانات لیدها', 'sedrazavi'),
                'all_items'          => __('همه درخواست‌ها', 'sedrazavi'),
            ),
            'public'              => false,
            'show_ui'             => true,
            'show_in_menu'        => true,
            'menu_icon'           => 'dashicons-bell',
            'capability_type'     => 'post',
            'hierarchical'        => false,
            'supports'            => array('title', 'editor', 'custom-fields'),
            'show_in_rest'        => true,
        ));
    }

    public function ajax_submit_lead() {
        $client_name = isset($_POST['client_name']) ? sanitize_text_field($_POST['client_name']) : '';
        $phone       = isset($_POST['phone']) ? sanitize_text_field($_POST['phone']) : '';
        $service     = isset($_POST['service']) ? sanitize_text_field($_POST['service']) : __('مشاوره عمومی', 'sedrazavi');
        $subject     = isset($_POST['subject']) ? sanitize_text_field($_POST['subject']) : __('درخواست رزرو مشاوره', 'sedrazavi');
        $amount      = isset($_POST['amount']) ? sanitize_text_field($_POST['amount']) : '';

        if (empty($phone) || empty($client_name)) {
            wp_send_json_error(array('message' => __('نام و شماره تماس الزامی است.', 'sedrazavi')));
        }

        $post_id = wp_insert_post(array(
            'post_title'   => sprintf(__('درخواست مشاوره: %s (%s)', 'sedrazavi'), $client_name, $phone),
            'post_content' => sprintf("نام متقاضی: %s\nشماره تماس: %s\nخدمت درخواستی: %s\nموضوع: %s\nمبلغ: %s", $client_name, $phone, $service, $subject, $amount),
            'post_status'  => 'publish',
            'post_type'    => 'uas_lead',
        ));

        if ($post_id && !is_wp_error($post_id)) {
            update_post_meta($post_id, '_lead_phone', $phone);
            update_post_meta($post_id, '_lead_client_name', $client_name);
            update_post_meta($post_id, '_lead_service', $service);
            update_post_meta($post_id, '_lead_amount', $amount);
            update_post_meta($post_id, '_lead_is_read', 0);
            update_post_meta($post_id, '_lead_created_at', current_time('mysql'));

            // Optional SMS / Email Dispatch Hook
            do_action('sedrazavi_lead_submitted_alert', $post_id, $client_name, $phone, $service);

            wp_send_json_success(array(
                'lead_id'   => $post_id,
                'message'   => __('درخواست شما با موفقیت ثبت شد و به اطلاع وکیل رسید.', 'sedrazavi'),
                'timestamp' => current_time('H:i'),
            ));
        }

        wp_send_json_error(array('message' => __('خطا در ثبت درخواست. لطفاً دوباره تلاش کنید.', 'sedrazavi')));
    }

    public function ajax_poll_leads() {
        if (!current_user_can('edit_posts')) {
            wp_send_json_error(array('message' => __('عدم دسترسی کافی.', 'sedrazavi')));
        }

        $since_id = isset($_GET['since_id']) ? intval($_GET['since_id']) : 0;

        $args = array(
            'post_type'      => 'uas_lead',
            'post_status'    => 'publish',
            'posts_per_page' => 10,
            'meta_query'     => array(
                array(
                    'key'     => '_lead_is_read',
                    'value'   => 0,
                    'compare' => '=',
                ),
            ),
        );

        $query = new WP_Query($args);
        $leads = array();

        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $id = get_the_ID();
                $leads[] = array(
                    'id'          => $id,
                    'client_name' => get_post_meta($id, '_lead_client_name', true) ?: get_the_title(),
                    'phone'       => get_post_meta($id, '_lead_phone', true),
                    'service'     => get_post_meta($id, '_lead_service', true),
                    'amount'      => get_post_meta($id, '_lead_amount', true),
                    'timestamp'   => get_the_time('H:i'),
                );
            }
            wp_reset_postdata();
        }

        wp_send_json_success(array(
            'unread_count' => count($leads),
            'leads'        => $leads,
        ));
    }

    public function ajax_mark_lead_read() {
        if (!current_user_can('edit_posts')) {
            wp_send_json_error();
        }

        $lead_id = isset($_POST['lead_id']) ? intval($_POST['lead_id']) : 0;
        if ($lead_id) {
            update_post_meta($lead_id, '_lead_is_read', 1);
            wp_send_json_success();
        }
        wp_send_json_error();
    }

    public function add_realtime_admin_bar_bell($admin_bar) {
        if (!current_user_can('edit_posts')) {
            return;
        }

        $unread_count = wp_count_posts('uas_lead')->publish ?? 0;

        $admin_bar->add_node(array(
            'id'    => 'sedrazavi_leads_notifier',
            'title' => sprintf(
                '<span class="ab-icon dashicons dashicons-bell"></span><span class="ab-label">%s %s</span>',
                __('لیدهای جدید', 'sedrazavi'),
                $unread_count > 0 ? '<span style="background:#e11d48;color:#fff;border-radius:10px;padding:1px 6px;font-size:10px;margin-right:4px;">' . $unread_count . '</span>' : ''
            ),
            'href'  => admin_url('edit.php?post_type=uas_lead'),
            'meta'  => array('title' => __('مشاهده لیدها و فرم‌های آنلاین در پیشخوان', 'sedrazavi')),
        ));
    }
}

function sedrazavi_realtime_notifications() {
    return SedRazavi_Realtime_Notifications::get_instance();
}

sedrazavi_realtime_notifications();
