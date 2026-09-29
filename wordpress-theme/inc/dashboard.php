<?php
/**
 * SedRazavi Lawyer Dashboard in WordPress Admin
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_add_admin_dashboard_menu')) {
    function sedrazavi_add_admin_dashboard_menu() {
        add_menu_page(
            esc_html__('میز کار وکیل سید رضوی', 'sedrazavi'),
            esc_html__('میز کار وکیل', 'sedrazavi'),
            'manage_options',
            'sedrazavi-lawyer-dashboard',
            'sedrazavi_render_admin_dashboard',
            'dashicons-businessman',
            2
        );
    }
    add_action('admin_menu', 'sedrazavi_add_admin_dashboard_menu');
}

if (!function_exists('sedrazavi_render_admin_dashboard')) {
    function sedrazavi_render_admin_dashboard() {
    ?>
    <div class="wrap sedrazavi-admin-wrap" style="direction: rtl; text-align: right; font-family: 'Vazirmatn', sans-serif;">
        <h1 style="color: #0B132B; border-bottom: 2px solid #D4AF37; padding-bottom: 10px; margin-bottom: 25px;">
            ⚖️ <?php esc_html_e('میز کار و داشبورد مدیریت وکیل سید رضوی', 'sedrazavi'); ?>
        </h1>

        <!-- Stats Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 30px;">
            <div style="background: #fff; padding: 20px; border-radius: 12px; border-right: 5px solid #D4AF37; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h3 style="margin:0; color:#888; font-size:14px;"><?php esc_html_e('کل پرونده‌های فعال', 'sedrazavi'); ?></h3>
                <p style="font-size: 28px; font-weight: bold; margin: 10px 0 0 0; color: #0B132B;">۴۸ پرونده</p>
            </div>
            <div style="background: #fff; padding: 20px; border-radius: 12px; border-right: 5px solid #2A9D8F; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h3 style="margin:0; color:#888; font-size:14px;"><?php esc_html_e('جلسات دادگاه این هفته', 'sedrazavi'); ?></h3>
                <p style="font-size: 28px; font-weight: bold; margin: 10px 0 0 0; color: #2A9D8F;">۶ جلسه</p>
            </div>
            <div style="background: #fff; padding: 20px; border-radius: 12px; border-right: 5px solid #8B0000; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h3 style="margin:0; color:#888; font-size:14px;"><?php esc_html_e('مهلت تجدیدنظرخواهی', 'sedrazavi'); ?></h3>
                <p style="font-size: 28px; font-weight: bold; margin: 10px 0 0 0; color: #8B0000;">۲ پرونده</p>
            </div>
            <div style="background: #fff; padding: 20px; border-radius: 12px; border-right: 5px solid #1C2541; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h3 style="margin:0; color:#888; font-size:14px;"><?php esc_html_e('مشاوره‌های رزرو شده امروز', 'sedrazavi'); ?></h3>
                <p style="font-size: 28px; font-weight: bold; margin: 10px 0 0 0; color: #1C2541;">۴ نوبت</p>
            </div>
        </div>
    </div>
    <?php
    }
}
