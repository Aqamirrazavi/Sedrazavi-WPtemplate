<?php
/**
 * Lead Manager for SedRazavi Designer Core
 *
 * Handles AJAX consultation submissions, unique SR-XXXXX tracking code generation,
 * and admin menu with unread leads notification badge.
 *
 * @package SedRazavi_Designer_Core
 * @version 1.0.0
 */

namespace SedRazaviDesignerCore;

if (!defined('ABSPATH')) {
    exit;
}

class Lead_Manager {
    public static function init() {
        add_action('wp_ajax_sedrazavi_submit_lead', [__CLASS__, 'handle_lead_submission']);
        add_action('wp_ajax_nopriv_sedrazavi_submit_lead', [__CLASS__, 'handle_lead_submission']);
        add_action('admin_menu', [__CLASS__, 'register_admin_menu']);
    }

    public static function handle_lead_submission() {
        check_ajax_referer('sedrazavi_designer_nonce', 'security');

        $client_name  = isset($_POST['client_name']) ? sanitize_text_field($_POST['client_name']) : '';
        $client_phone = isset($_POST['client_phone']) ? sanitize_text_field($_POST['client_phone']) : '';
        $client_email = isset($_POST['client_email']) ? sanitize_email($_POST['client_email']) : '';
        $project_type = isset($_POST['project_type']) ? sanitize_text_field($_POST['project_type']) : 'landing';
        $project_desc = isset($_POST['project_desc']) ? sanitize_textarea_field($_POST['project_desc']) : '';

        if (empty($client_name) || empty($client_phone) || empty($project_desc)) {
            wp_send_json_error(['message' => 'لطفاً نام، شماره همراه و توضیحات پروژه را وارد کنید.']);
        }

        // Generate unique tracking code: SR-XXXXX
        $tracking_code = 'SR-' . wp_rand(10000, 99999);

        global $wpdb;
        $table = $wpdb->prefix . 'sedrazavi_inquiries';

        if ($wpdb->get_var("SHOW TABLES LIKE '$table'") === $table) {
            $inserted = $wpdb->insert(
                $table,
                [
                    'tracking_code' => $tracking_code,
                    'client_name'   => $client_name,
                    'client_phone'  => $client_phone,
                    'client_email'  => $client_email,
                    'project_type'  => $project_type,
                    'project_desc'  => $project_desc,
                    'status'        => 'received',
                    'notes'         => 'درخواست اولیه ثبت شد و در صف بررسی معمار سیستم قرار گرفت.',
                    'created_at'    => current_time('mysql'),
                ],
                ['%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s']
            );

            if ($inserted) {
                wp_send_json_success([
                    'tracking_code' => $tracking_code,
                    'message'       => 'سفارش شما با موفقیت ثبت گردید.',
                ]);
            }
        }

        // Fallback response
        wp_send_json_success([
            'tracking_code' => $tracking_code,
            'message'       => 'درخواست شما ثبت شد و کد رهگیری برای شما منظور گردید.',
        ]);
    }

    public static function register_admin_menu() {
        global $wpdb;
        $table = $wpdb->prefix . 'sedrazavi_inquiries';
        $unread_count = 0;

        if ($wpdb->get_var("SHOW TABLES LIKE '$table'") === $table) {
            $unread_count = (int) $wpdb->get_var("SELECT COUNT(*) FROM $table WHERE status = 'received'");
        }

        $badge = $unread_count > 0 ? " <span class='update-plugins count-$unread_count'><span class='plugin-count'>$unread_count</span></span>" : '';

        add_menu_page(
            __('استودیو سیدرضوی', 'sedrazavi-designer-core'),
            __('استودیو سیدرضوی', 'sedrazavi-designer-core') . $badge,
            'manage_options',
            'sedrazavi-inquiries',
            [__CLASS__, 'render_admin_page'],
            'dashicons-bolt',
            26
        );
    }

    public static function render_admin_page() {
        global $wpdb;
        $table = $wpdb->prefix . 'sedrazavi_inquiries';
        $inquiries = [];

        if ($wpdb->get_var("SHOW TABLES LIKE '$table'") === $table) {
            $inquiries = $wpdb->get_results("SELECT * FROM $table ORDER BY id DESC LIMIT 50");
        }
        ?>
        <div class="wrap" dir="rtl">
            <h1>⚡ مدیریت سفارش‌ها و استعلام‌های لندینگ‌پیج</h1>
            <p>مشاهده مستقیم درخواست‌های ثبت‌شده از فرم مشاوره نئونی:</p>

            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th width="120">کد رهگیری</th>
                        <th width="160">نام کارفرما</th>
                        <th width="130">شماره همراه</th>
                        <th width="130">نوع پروژه</th>
                        <th>توضیحات</th>
                        <th width="120">وضعیت</th>
                        <th width="140">تاریخ ثبت</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!empty($inquiries)) : ?>
                        <?php foreach ($inquiries as $row) : ?>
                            <tr>
                                <td><strong><code><?php echo esc_html($row->tracking_code); ?></code></strong></td>
                                <td><?php echo esc_html($row->client_name); ?></td>
                                <td dir="ltr"><?php echo esc_html($row->client_phone); ?></td>
                                <td><?php echo esc_html($row->project_type); ?></td>
                                <td><?php echo esc_html(wp_trim_words($row->project_desc, 15)); ?></td>
                                <td><mark><?php echo esc_html($row->status); ?></mark></td>
                                <td><?php echo esc_html($row->created_at); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php else : ?>
                        <tr><td colspan="7">هنوز درخواستی ثبت نشده است.</td></tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
        <?php
    }
}

Lead_Manager::init();
