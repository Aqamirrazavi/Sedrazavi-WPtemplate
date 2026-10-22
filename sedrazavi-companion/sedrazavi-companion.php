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
 *
 * @package SedRazavi_Companion
 */

if (!defined('ABSPATH')) {
    exit;
}

define('SEDRAZAVI_COMPANION_VERSION', '5.0.0');
define('SEDRAZAVI_COMPANION_DIR', plugin_dir_path(__FILE__));
define('SEDRAZAVI_COMPANION_URI', plugin_dir_url(__FILE__));

// Require Core Modules
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-license-manager.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-github-sync.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-component-hub.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-payment-engine.php';

// Multi-Niche Specialized Architecture Modules
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-course-lms-bridge.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-vip-membership-paywall.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-soft98-download-box.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-magazine-editorial.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-dynamic-client-dashboard.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-demo-importer.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-woocommerce-shetab-gateway.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-design-tokens.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-sms-gateway-adapter.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-email-engine.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-admin-dashboard.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-notification-router.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-seo-engine.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-diagnostic.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-white-label.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-snapshot-engine.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-vector-patterns.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-role-manager.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-modern-comments.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-mega-menu.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-woocommerce-kit.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-audit-logger.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-plugin-compatibility.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-instant-search.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-snapelement-catalog.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-client-proposal.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-offline-queue.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-site-health.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-girih-vector-engine.php';
require_once SEDRAZAVI_COMPANION_DIR . 'includes/class-webhook-dispatcher.php';

/**
 * Initialize Companion Subsystems
 */
function sedrazavi_companion_init() {
    SedRazavi_License_Manager::get_instance();
    SedRazavi_GitHub_Shield::get_instance();
    SedRazavi_Component_Hub::get_instance();
    SedRazavi_Unified_Payment_Engine::get_instance();

    // Multi-Niche Services
    SedRazavi_Course_LMS_Bridge::get_instance();
    SedRazavi_VIP_Paywall::get_instance();
    SedRazavi_Soft98_Download_Box::get_instance();
    SedRazavi_Magazine_Editorial::get_instance();
    SedRazavi_Dynamic_Client_Dashboard::get_instance();
    SedRazavi_Demo_Importer::get_instance();
    SedRazavi_WooCommerce_Shetab_Gateway::get_instance();
    SedRazavi_Design_Tokens::get_instance();
    SedRazavi_SMS_Gateway_Adapter::get_instance();
    SedRazavi_Email_Engine::get_instance();
    SedRazavi_Admin_Dashboard::get_instance();
    SedRazavi_Notification_Router::get_instance();
    SedRazavi_SEO_Engine::get_instance();
    SedRazavi_Diagnostic_Doctor::get_instance();
    SedRazavi_White_Label::get_instance();
    SedRazavi_Snapshot_Engine::get_instance();
    SedRazavi_Vector_Patterns::get_instance();
    SedRazavi_Role_Manager::get_instance();
    SedRazavi_Modern_Comments::get_instance();
    SedRazavi_Mega_Menu_Engine::get_instance();
    SedRazavi_WooCommerce_Kit::get_instance();
    SedRazavi_Audit_Logger::get_instance();
    SedRazavi_Plugin_Compatibility::get_instance();
    SedRazavi_Instant_Search::get_instance();
    SedRazavi_SnapElement_Catalog::get_instance();
    SedRazavi_Client_Proposal::get_instance();
    SedRazavi_Offline_Queue::get_instance();
    SedRazavi_Site_Health::get_instance();
    SedRazavi_Girih_Vector_Engine::get_instance();
    SedRazavi_Webhook_Dispatcher::get_instance();
}
add_action('plugins_loaded', 'sedrazavi_companion_init');

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
                $license_status = SedRazavi_License_Manager::get_instance()->is_valid();
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
