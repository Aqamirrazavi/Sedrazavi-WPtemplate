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
    if (!function_exists('is_plugin_active')) {
        require_once ABSPATH . 'wp-admin/includes/plugin.php';
    }
    $required_plugins = array(
        'elementor/elementor.php' => 'Elementor Page Builder',
        'advanced-custom-fields/acf.php' => 'Advanced Custom Fields PRO',
    );

    $missing = array();
    foreach ($required_plugins as $plugin_path => $name) {
        if (!is_plugin_active($plugin_path)) {
            $missing[] = $name;
        }
    }

    if (!empty($missing) && current_user_can('install_plugins')) {
        add_action('admin_notices', function() use ($missing) {
            echo '<div class="notice notice-warning is-dismissible"><p>';
            printf(esc_html__('پوسته سید رضوی برای عملکرد کامل نیاز به فعال‌سازی افزونه‌های زیر دارد: %s', 'sedrazavi'), '<strong>' . implode(', ', $missing) . '</strong>');
            echo '</p></div>';
        });
    }
}
add_action('admin_init', 'sedrazavi_check_required_plugins');
}
