<?php
/**
 * Backward-Compatibility Adapter for Frontend Management Cockpit
 *
 * Stage 3 Architectural Independence:
 * The canonical Frontend_Cockpit_Engine class, AJAX handlers, CPT CRUD,
 * User Management, and Visual Site Kit Builder now live in the
 * `sedrazavi-companion` plugin (`includes/class-frontend-cockpit.php`).
 *
 * This thin adapter avoids duplicate engine copies in the theme while
 * displaying a clear admin notice if `sedrazavi-companion` is inactive.
 *
 * @package SedRazavi
 * @version 6.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('\\SedRazavi\\Frontend_Cockpit_Engine')) {
    add_action('init', function() {
        if (!shortcode_exists('sedrazavi_frontend_cockpit')) {
            add_shortcode('sedrazavi_frontend_cockpit', function() {
                if (!current_user_can('activate_plugins')) {
                    return '<div class="sr-cockpit-page-container"><p class="danger">' . esc_html__('پیشخوان مدیریت موقتاً در دسترس نیست.', 'sedrazavi') . '</p></div>';
                }
                return '<div class="sr-cockpit-page-container"><p class="danger">' . esc_html__('برای فعال‌سازی پیشخوان مدیریت یکپارچه و سازنده کیت سایت، لطفاً افزونه مستقل sedrazavi-companion را نصب و فعال نمایید.', 'sedrazavi') . '</p></div>';
            });
        }
    }, 20);
}
