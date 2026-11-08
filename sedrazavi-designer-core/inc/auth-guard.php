<?php
/**
 * Auth Guard for SedRazavi Designer Core
 *
 * Registers dedicated `sedrazavi_client` role and isolates client users
 * from /wp-admin/ by redirecting them to the frontend Client Dashboard.
 *
 * @package SedRazavi_Designer_Core
 * @version 1.0.0
 */

namespace SedRazaviDesignerCore;

if (!defined('ABSPATH')) {
    exit;
}

class Auth_Guard {
    public static function init() {
        add_action('admin_init', [__CLASS__, 'guard_wp_admin']);
        add_filter('show_admin_bar', [__CLASS__, 'filter_admin_bar']);
    }

    public static function register_role() {
        add_role(
            'sedrazavi_client',
            __('کارفرمای استودیو', 'sedrazavi-designer-core'),
            [
                'read'         => true,
                'edit_posts'   => false,
                'delete_posts' => false,
            ]
        );
    }

    public static function guard_wp_admin() {
        if (defined('DOING_AJAX') && DOING_AJAX) {
            return;
        }

        if (is_user_logged_in() && !current_user_can('manage_options')) {
            wp_safe_redirect(home_url('/client-dashboard/'));
            exit;
        }
    }

    public static function filter_admin_bar($show) {
        if (!current_user_can('manage_options')) {
            return false;
        }
        return $show;
    }
}

Auth_Guard::init();
