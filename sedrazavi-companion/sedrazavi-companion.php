<?php
/**
 * Plugin Name: SedRazavi Companion & Architecture Engine
 * Plugin URI: https://github.com/Aqamirrazavi/Sedrazavi-WPtemplate
 * Description: The master companion engine for SedRazavi Framework. Powers designer DRM licensing (HMAC-SHA256), anti-wipe GitHub theme update shield, one-click cloud template hub, and unified dual Shetab/International payment gateways.
 * Version: 5.0.0
 * Author: Dr. Seyedeh Maryam Razavi
 * Author URI: https://sedrazavi.ir
 * Text Domain: sedrazavi-companion
 * Domain Path: /languages
 * Requires at least: 6.0
 * Tested up to: 6.7
 * Requires PHP: 7.4
 *
 * @package SedRazavi_Companion
 */

if (!defined('ABSPATH')) {
    exit;
}

define('SEDRAZAVI_COMPANION_VERSION', '5.0.0');
define('SEDRAZAVI_COMPANION_DIR', plugin_dir_path(__FILE__));
define('SEDRAZAVI_COMPANION_URI', plugin_dir_url(__FILE__));

// Resilient Module Loader (zero fatal WSOD on partial package installs)
$sedrazavi_companion_modules = [
    'includes/class-license-manager.php',
    'includes/class-github-sync.php',
    'includes/class-component-hub.php',
    'includes/class-payment-engine.php',
    'includes/class-course-lms-bridge.php',
    'includes/class-vip-membership-paywall.php',
    'includes/class-soft98-download-box.php',
    'includes/class-magazine-editorial.php',
    'includes/class-dynamic-client-dashboard.php',
    'includes/class-demo-importer.php',
    'includes/class-woocommerce-shetab-gateway.php',
    'includes/class-design-tokens.php',
    'includes/class-sms-gateway-adapter.php',
    'includes/class-email-engine.php',
    'includes/class-admin-dashboard.php',
    'includes/class-notification-router.php',
    'includes/class-seo-engine.php',
    'includes/class-diagnostic.php',
    'includes/class-white-label.php',
    'includes/class-snapshot-engine.php',
    'includes/class-vector-patterns.php',
    'includes/class-role-manager.php',
    'includes/class-modern-comments.php',
    'includes/class-mega-menu.php',
    'includes/class-woocommerce-kit.php',
    'includes/class-audit-logger.php',
    'includes/class-plugin-compatibility.php',
    'includes/class-instant-search.php',
    'includes/class-snapelement-catalog.php',
    'includes/class-client-proposal.php',
    'includes/class-offline-queue.php',
    'includes/class-site-health.php',
    'includes/class-girih-vector-engine.php',
    'includes/class-webhook-dispatcher.php',
    'includes/class-sedrazavi-library-engine.php',
    'includes/class-legal-intake-appointments.php',
    'includes/class-legal-matter-portal.php',
    'includes/class-sedrazavi-diagnostics-doctor.php',
    'includes/class-sedrazavi-ecosystem-publisher.php',
    'includes/class-iranian-market-adapter.php',
    'includes/class-frontend-cockpit.php',
];

foreach ($sedrazavi_companion_modules as $module_rel) {
    $module_path = SEDRAZAVI_COMPANION_DIR . $module_rel;
    if (file_exists($module_path)) {
        try {
            require_once $module_path;
        } catch (\Throwable $e) {
            error_log('[SedRazavi Companion] Module load error (' . $module_rel . '): ' . $e->getMessage());
        }
    }
}

/**
 * Initialize Companion Subsystems Safely
 */
function sedrazavi_companion_init() {
    $singleton_classes = [
        'SedRazavi_License_Manager',
        'SedRazavi_GitHub_Shield',
        'SedRazavi_Component_Hub',
        'SedRazavi_Unified_Payment_Engine',
        'SedRazavi_Course_LMS_Bridge',
        'SedRazavi_VIP_Paywall',
        'SedRazavi_Soft98_Download_Box',
        'SedRazavi_Magazine_Editorial',
        'SedRazavi_Dynamic_Client_Dashboard',
        'SedRazavi_Demo_Importer',
        'SedRazavi_WooCommerce_Shetab_Gateway',
        'SedRazavi_Design_Tokens',
        'SedRazavi_SMS_Gateway_Adapter',
        'SedRazavi_Email_Engine',
        'SedRazavi_Admin_Dashboard',
        'SedRazavi_Notification_Router',
        'SedRazavi_SEO_Engine',
        'SedRazavi_Diagnostic_Doctor',
        'SedRazavi_White_Label',
        'SedRazavi_Snapshot_Engine',
        'SedRazavi_Vector_Patterns',
        'SedRazavi_Role_Manager',
        'SedRazavi_Modern_Comments',
        'SedRazavi_Mega_Menu_Engine',
        'SedRazavi_WooCommerce_Kit',
        'SedRazavi_Audit_Logger',
        'SedRazavi_Plugin_Compatibility',
        'SedRazavi_Instant_Search',
        'SedRazavi_SnapElement_Catalog',
        'SedRazavi_Client_Proposal',
        'SedRazavi_Offline_Queue',
        'SedRazavi_Site_Health',
        'SedRazavi_Girih_Vector_Engine',
        'SedRazavi_Webhook_Dispatcher',
        'SedRazavi_Library_Engine',
        'SedRazavi_Legal_Intake_Appointments',
        'SedRazavi_Legal_Matter_Portal',
        'SedRazavi_Diagnostics_Doctor',
        'SedRazavi_Ecosystem_Publisher',
        'SedRazavi_Iranian_Market_Adapter',
    ];

    foreach ($singleton_classes as $cls) {
        if (class_exists($cls) && method_exists($cls, 'get_instance')) {
            call_user_func([$cls, 'get_instance']);
        }
    }

    if (class_exists('\\SedRazavi\\Frontend_Cockpit_Engine') && method_exists('\\SedRazavi\\Frontend_Cockpit_Engine', 'instance')) {
        \SedRazavi\Frontend_Cockpit_Engine::instance();
    }
}
add_action('plugins_loaded', 'sedrazavi_companion_init');

/**
 * Clean Activation & Deactivation Hooks (Multisite-Aware)
 */
function sedrazavi_companion_activate_single_site() {
    if (!get_option('sedrazavi_companion_activated_time')) {
        update_option('sedrazavi_companion_activated_time', time());
    }
    update_option('sedrazavi_companion_version', SEDRAZAVI_COMPANION_VERSION);
    flush_rewrite_rules(false);
}

function sedrazavi_companion_activate($network_wide = false) {
    if (function_exists('is_multisite') && is_multisite() && $network_wide) {
        global $wpdb;
        $blog_ids = $wpdb->get_col("SELECT blog_id FROM {$wpdb->blogs} WHERE archived = '0' AND spam = '0' AND deleted = '0'");
        foreach ($blog_ids as $blog_id) {
            switch_to_blog($blog_id);
            sedrazavi_companion_activate_single_site();
            restore_current_blog();
        }
    } else {
        sedrazavi_companion_activate_single_site();
    }
}
register_activation_hook(__FILE__, 'sedrazavi_companion_activate');

function sedrazavi_companion_deactivate_single_site() {
    if (function_exists('wp_clear_scheduled_hook')) {
        wp_clear_scheduled_hook('sedrazavi_companion_health_cron');
    }
    flush_rewrite_rules(false);
}

function sedrazavi_companion_deactivate($network_wide = false) {
    if (function_exists('is_multisite') && is_multisite() && $network_wide) {
        global $wpdb;
        $blog_ids = $wpdb->get_col("SELECT blog_id FROM {$wpdb->blogs} WHERE archived = '0' AND spam = '0' AND deleted = '0'");
        foreach ($blog_ids as $blog_id) {
            switch_to_blog($blog_id);
            sedrazavi_companion_deactivate_single_site();
            restore_current_blog();
        }
    } else {
        sedrazavi_companion_deactivate_single_site();
    }
}
register_deactivation_hook(__FILE__, 'sedrazavi_companion_deactivate');

add_action('before_woocommerce_init', function () {
    if (class_exists(\Automattic\WooCommerce\Utilities\FeaturesUtil::class)) {
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('custom_order_tables', __FILE__, true);
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('cart_checkout_blocks', __FILE__, true);
    }
});

/**
 * Register Admin Menu for Agency Engine
 */
add_action('admin_menu', function() {
    add_menu_page(
        __('سیستم‌عامل SedRazavi OS', 'sedrazavi-companion'),
        __('هسته آژانس SedRazavi', 'sedrazavi-companion'),
        'manage_options',
        'sedrazavi-companion-hub',
        'sedrazavi_companion_render_admin_dashboard',
        'dashicons-superhero-alt',
        3
    );
});

function sedrazavi_companion_render_admin_dashboard() {
    ?>
    <div class="wrap sedrazavi-admin-wrap" style="direction: rtl; font-family: Tahoma, sans-serif;">
        <h1 style="display:flex; align-items:center; gap:10px;">
            <span class="dashicons dashicons-shield" style="font-size:32px; color:#3B82F6;"></span>
            <?php esc_html_e('پیشخوان سیستم‌عامل آژانس (SedRazavi OS - نسخه ۵.۰)', 'sedrazavi-companion'); ?>
        </h1>
        <p class="description">
            <?php esc_html_e('مدیریت یکپارچه لایسنس طراح، حافظه ابری قالب‌ها، محافظت آپدیت گیت‌هاب و درگاه‌های پرداخت دوگانه.', 'sedrazavi-companion'); ?>
        </p>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:20px; margin-top:24px;">
            <!-- کارت وضعیت لایسنس -->
            <div style="background:#fff; padding:20px; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <h3 style="margin-top:0; color:#0F172A;">🔑 وضعیت لایسنس طراح (DRM)</h3>
                <?php
                $license_status = class_exists('SedRazavi_License_Manager')
                    ? SedRazavi_License_Manager::get_instance()->is_valid()
                    : false;
                if ($license_status): ?>
                    <div style="padding:10px 14px; background:#ECFDF5; color:#065F46; border-radius:8px; font-weight:bold;">
                        ✅ لایسنس آژانس فعال و تایید شده است (قفل امن باز است)
                    </div>
                <?php else: ?>
                    <div style="padding:10px 14px; background:#FEF3C7; color:#92400E; border-radius:8px;">
                        ⚠️ لایسنس اختصاصی ثبت نشده است (سایت ۱۰۰٪ فعال است اما دریافت الگوهای ابری قفل می‌باشد)
                    </div>
                <?php endif; ?>
            </div>

            <!-- کارت آپدیت گیت‌هاب ضد تخریب -->
            <div style="background:#fff; padding:20px; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <h3 style="margin-top:0; color:#0F172A;">🛡️ محافظت از آپدیت‌های گیت‌هاب</h3>
                <p style="font-size:13px; color:#64748B;">
                    سیستم Anti-Wipe Engine فعال است. کلیه تغییرات، چایلدتم‌ها و تنظیمات مشتری حین آپدیت مخزن GitHub دست‌نخورده باقی می‌مانند.
                </p>
                <span style="display:inline-block; padding:4px 10px; background:#EFF6FF; color:#1E40AF; border-radius:6px; font-size:12px; font-weight:600;">
                    مخزن فعال: Aqamirrazavi/Sedrazavi-WPtemplate
                </span>
            </div>

            <!-- کارت آداپتور پرداخت دوگانه -->
            <div style="background:#fff; padding:20px; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <h3 style="margin-top:0; color:#0F172A;">💳 آداپتور پرداخت دوگانه</h3>
                <p style="font-size:13px; color:#64748B;">
                    پشتیبانی همزمان از درگاه‌های شتابی (زرین‌پال، آیدی‌پِی، نکست‌پِی) و درگاه‌های ارزی (Stripe، PayPal و ووکامرس).
                </p>
                <div style="display:flex; gap:8px;">
                    <span style="background:#F1F5F9; padding:4px 8px; border-radius:4px; font-size:12px;">تومان / ریال</span>
                    <span style="background:#F1F5F9; padding:4px 8px; border-radius:4px; font-size:12px;">USD / EUR</span>
                </div>
            </div>
        </div>
    </div>
    <?php
}
