<?php
/**
 * SedRazavi OS - Multi-Role RBAC & Capability Isolation Manager
 * Location: sedrazavi-companion/includes/class-role-manager.php
 *
 * @package SedRazavi_Companion
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Role_Manager {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        add_action('init', [$this, 'register_custom_roles']);
        add_action('admin_init', [$this, 'restrict_admin_access_by_role']);
    }

    /**
     * Register specialized roles and capabilities
     */
    public function register_custom_roles() {
        // ۱. مدیر عامل / مالک کسب‌وکار (Business Owner / CEO)
        add_role(
            'sr_business_owner',
            __('مدیر ارشد کسب‌وکار (Business Owner)', 'sedrazavi-companion'),
            [
                'read'                    => true,
                'edit_posts'              => true,
                'delete_posts'            => false,
                'publish_posts'           => true,
                'upload_files'            => true,
                'sr_view_analytics'       => true,
                'sr_manage_leads'         => true,
                'sr_view_financials'      => true,
                'sr_manage_team'          => true,
                'manage_woocommerce'      => true,
                'view_woocommerce_reports'=> true,
            ]
        );

        // ۲. کادر تخصصی و همکاران (Staff / Associates / Operators)
        add_role(
            'sr_staff',
            __('کادر تخصصی و همکاران (Staff Associate)', 'sedrazavi-companion'),
            [
                'read'                    => true,
                'edit_posts'              => true,
                'upload_files'            => true,
                'sr_manage_appointments'  => true,
                'sr_manage_cases'         => true,
                'sr_reply_tickets'        => true,
                'sr_view_financials'      => false,
                'manage_options'          => false,
            ]
        );

        // ۳. مشتری / موکل / دانشجو (Client / Member)
        add_role(
            'sr_client',
            __('کاربر ویژه / موکل (Verified Client)', 'sedrazavi-companion'),
            [
                'read'                    => true,
                'upload_files'            => false,
                'sr_access_portal'        => true,
                'sr_view_own_data'        => true,
            ]
        );
    }

    /**
     * Restrict admin area for clients and staff
     */
    public function restrict_admin_access_by_role() {
        if (!is_user_logged_in() || wp_doing_ajax() || wp_is_json_request()) {
            return;
        }

        $user = wp_get_current_user();
        if (in_array('sr_client', (array)$user->roles, true) && !in_array('administrator', (array)$user->roles, true)) {
            // Redirect clients to front-end dashboard
            $portal_url = home_url('/#portal');
            wp_safe_redirect($portal_url);
            exit;
        }

        if (in_array('sr_staff', (array)$user->roles, true) && !in_array('administrator', (array)$user->roles, true)) {
            // Hide core sensitive admin menus for staff
            remove_menu_page('plugins.php');
            remove_menu_page('themes.php');
            remove_menu_page('tools.php');
            remove_menu_page('options-general.php');
        }
    }

    /**
     * Helper to check if current user is business owner or admin
     */
    public static function can_view_financials() {
        if (current_user_can('manage_options') || current_user_can('sr_view_financials')) {
            return true;
        }
        return false;
    }
}
