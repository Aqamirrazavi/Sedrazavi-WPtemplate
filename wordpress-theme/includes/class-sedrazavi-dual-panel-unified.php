<?php
/**
 * SedRazavi Dual-Panel Unified Synchronization Engine
 * Specification: Part 17 - Cross-Panel Bridge, Capability Mapping & Audit Log
 *
 * @package SedRazavi
 * @subpackage Core
 * @version 2.9.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Dual_Panel_Unified {

    public static function init() {
        add_action('init', [__CLASS__, 'register_lawyer_roles_and_caps']);
        add_action('admin_bar_menu', [__CLASS__, 'add_cross_panel_quick_switch'], 999);
        add_action('wp_dashboard_setup', [__CLASS__, 'add_custom_law_admin_widgets']);
        add_action('sedrazavi_audit_log', [__CLASS__, 'record_audit_event'], 10, 4);
    }

    /**
     * Map distinct lawyer capabilities
     */
    public static function register_lawyer_roles_and_caps() {
        add_role('sedrazavi_attorney', 'وکیل پایه یک دادگستری', [
            'read'                       => true,
            'edit_posts'                 => true,
            'delete_posts'               => false,
            'manage_legal_cases'         => true,
            'view_client_dossiers'       => true,
            'manage_tariffs_and_stamps'  => true,
            'access_odr_virtual_court'   => true,
            'manage_tokens'              => false,
        ]);

        $admin = get_role('administrator');
        if ($admin) {
            $admin->add_cap('manage_legal_cases');
            $admin->add_cap('view_client_dossiers');
            $admin->add_cap('manage_tariffs_and_stamps');
            $admin->add_cap('access_odr_virtual_court');
            $admin->add_cap('manage_tokens');
        }
    }

    /**
     * Add Quick Switcher Button in WP Admin Top Bar
     */
    public static function add_cross_panel_quick_switch($wp_admin_bar) {
        if (!current_user_can('manage_legal_cases')) {
            return;
        }

        if (is_admin()) {
            $wp_admin_bar->add_node([
                'id'    => 'sedrazavi_front_portal',
                'title' => '⚖️ ورود به پرتال فرانت‌اند وکیل',
                'href'  => home_url('/lawyer-portal/'),
                'meta'  => ['target' => '_blank', 'class' => 'sedrazavi-gold-badge'],
            ]);
        } else {
            $wp_admin_bar->add_node([
                'id'    => 'sedrazavi_wp_admin',
                'title' => '⚙️ بازگشت به پیشخوان فنی وردپرس',
                'href'  => admin_url('admin.php?page=sedrazavi-dashboard'),
                'meta'  => ['class' => 'sedrazavi-navy-badge'],
            ]);
        }
    }

    /**
     * Custom WP Admin Dashboard Widgets for Law Practice
     */
    public static function add_custom_law_admin_widgets() {
        wp_add_dashboard_widget(
            'sedrazavi_active_cases_widget',
            '⚖️ وضعیت زنده پرونده‌های دادگستری و مواعد دادرسی (SedRazavi)',
            [__CLASS__, 'render_active_cases_widget']
        );
    }

    public static function render_active_cases_widget() {
        echo '<div style="direction: rtl; font-family: tahoma, sans-serif;">';
        echo '<p style="color: #666;">خلاصه آمار مواعد دادرسی در ۵ روز آینده:</p>';
        echo '<ul style="list-style: square; padding-right: 20px;">';
        echo '<li><strong>۳ پرونده:</strong> موعد تجدیدنظرخواهی در دیوان عدالت اداری</li>';
        echo '<li><strong>۱ پرونده:</strong> پرداخت نیم‌عشر اجرایی و تمبر وکالت</li>';
        echo '<li><strong>۲ جلسه:</strong> دادگاه مجازی و داوری آنلاین ODR</li>';
        echo '</ul>';
        echo '<a href="' . esc_url(home_url('/lawyer-portal/')) . '" class="button button-primary" style="margin-top: 10px; background: #D4AF37; border-color: #AA820A; color: #000; font-weight: bold;">مشاهده کارتابل یکپارچه وکیل</a>';
        echo '</div>';
    }

    /**
     * Unified Audit Log Recorder
     */
    public static function record_audit_event($action, $userId, $details = '', $severity = 'info') {
        global $wpdb;
        $table = $wpdb->prefix . 'sedrazavi_audit_logs';

        // Check or create audit table if needed
        if ($wpdb->get_var("SHOW TABLES LIKE '{$table}'") !== $table) {
            $charset_collate = $wpdb->get_charset_collate();
            $sql = "CREATE TABLE {$table} (
                id bigint(20) NOT NULL AUTO_INCREMENT,
                action varchar(100) NOT NULL,
                user_id bigint(20) NOT NULL,
                ip_address varchar(45) NOT NULL,
                details text,
                severity varchar(20) DEFAULT 'info',
                created_at datetime DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) {$charset_collate};";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
        }

        $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
        $wpdb->insert($table, [
            'action'     => sanitize_text_field($action),
            'user_id'    => absint($userId),
            'ip_address' => sanitize_text_field($ip),
            'details'    => maybe_serialize($details),
            'severity'   => sanitize_text_field($severity),
            'created_at' => current_time('mysql'),
        ]);
    }
}

SedRazavi_Dual_Panel_Unified::init();