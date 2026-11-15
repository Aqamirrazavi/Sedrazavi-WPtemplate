<?php
/**
 * Core Theme Setup & Plugin Dependency Manager
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_check_required_plugins')) {
function sedrazavi_check_required_plugins() {
    if (!current_user_can('install_plugins')) {
        return;
    }

    if (!did_action('elementor/loaded')) {
        add_action('admin_notices', function() {
            if (did_action('elementor/loaded') || !current_user_can('install_plugins')) {
                return;
            }
            $install_url = wp_nonce_url(
                self_admin_url('update.php?action=install-plugin&plugin=elementor'),
                'install-plugin_elementor'
            );
            echo '<div class="notice notice-info is-dismissible"><p>';
            printf(
                esc_html__('پوسته سید رضوی بدون نیاز به افزونه تجاری با حالت پایه (Native Fallback) کار می‌کند؛ برای ویرایش بصری صفحات می‌توانید نسخه رایگان %1$s را نصب و فعال کنید.', 'sedrazavi'),
                '<a href="' . esc_url($install_url) . '"><strong>Elementor</strong></a>'
            );
            echo '</p></div>';
        });
    }
}
add_action('admin_init', 'sedrazavi_check_required_plugins');
}
