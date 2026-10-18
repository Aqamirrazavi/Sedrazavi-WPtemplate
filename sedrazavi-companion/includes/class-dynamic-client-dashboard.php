<?php
/**
 * SedRazavi Dynamic Multi-Niche Client Dashboard
 *
 * Provides a smart adaptable client portal that automatically renders relevant tabs:
 * LMS (SpotPlayer licenses), VIP (Subscription status), Downloads, and Financial invoices.
 *
 * @package SedRazavi_Companion
 * @version 5.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Dynamic_Client_Dashboard {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_shortcode('sedrazavi_dynamic_portal', [$this, 'render_portal_shortcode']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
    }

    public function render_portal_shortcode($atts) {
        $user_id = get_current_user_id();
        $is_logged_in = is_user_logged_in();
        $current_user = wp_get_current_user();

        $vip_status = SedRazavi_VIP_Paywall::get_instance()->get_user_vip_status($user_id);
        $licenses = $user_id ? (get_user_meta($user_id, '_sedrazavi_spotplayer_licenses', true) ?: []) : [];

        ob_start();
        ?>
        <div class="sr-dynamic-portal-suite rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6" dir="rtl">
            <!-- Header Profile Row -->
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        <?php echo $is_logged_in ? mb_substr($current_user->display_name, 0, 1, 'UTF-8') : '؟'; ?>
                    </div>
                    <div>
                        <h3 class="text-base font-bold text-white">
                            <?php echo $is_logged_in ? esc_html($current_user->display_name) : 'حساب کاربری مهمان'; ?>
                        </h3>
                        <p class="text-xs text-slate-400 mt-0.5">
                            <?php echo $is_logged_in ? esc_html($current_user->user_email) : 'جهت مشاهده لایسنس‌ها و وضعیت اشتراک وارد شوید.'; ?>
                        </p>
                    </div>
                </div>

                <!-- VIP status badge -->
                <div class="flex items-center gap-2">
                    <?php if ($vip_status['isVip']): ?>
                        <span class="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1.5">
                            <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                            <span>اشتراک ویژه فعال (<?php echo esc_html($vip_status['daysRemaining']); ?> روز باقی‌مانده)</span>
                        </span>
                    <?php else: ?>
                        <a href="<?php echo esc_url(home_url('/#vip-plans')); ?>" class="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors">
                            ارتقا به کاربر VIP
                        </a>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Adaptable Content Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- SpotPlayer Licenses Card -->
                <div class="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            <h4 class="text-xs font-bold text-white">لایسنس‌های دوره‌های من (SpotPlayer)</h4>
                        </div>
                        <span class="text-[11px] text-blue-400 font-mono"><?php echo count($licenses); ?> دوره فعال</span>
                    </div>

                    <?php if (empty($licenses)): ?>
                        <p class="text-xs text-slate-500 py-3 text-center">هنوز در دوره‌ای ثبت‌نام نکرده‌اید.</p>
                    <?php else: ?>
                        <div class="space-y-2">
                            <?php foreach ($licenses as $lic): ?>
                                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
                                    <span class="font-medium text-slate-300"><?php echo esc_html($lic['courseTitle']); ?></span>
                                    <span class="font-mono text-emerald-400 font-bold select-all"><?php echo esc_html($lic['licenseKey']); ?></span>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>

                <!-- Active Downloads & Orders Card -->
                <div class="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            <h4 class="text-xs font-bold text-white">فایل‌ها و بسته‌های دانلودی</h4>
                        </div>
                        <span class="text-[11px] text-emerald-400">لینک‌های پرسرعت</span>
                    </div>

                    <div class="space-y-2 text-xs">
                        <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                            <span class="text-slate-300">پکیج تمپلت‌های المنتور Pro (نسخه ۵.۰)</span>
                            <span class="text-[11px] text-blue-400 font-bold cursor-pointer">دریافت فایل</span>
                        </div>
                        <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                            <span class="text-slate-300">کتابچه راهنمای جامع معماری وردپرس مدرن</span>
                            <span class="text-[11px] text-blue-400 font-bold cursor-pointer">دریافت PDF</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/portal/summary', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_portal_summary'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function rest_get_portal_summary() {
        $user_id = get_current_user_id();
        $vip_status = SedRazavi_VIP_Paywall::get_instance()->get_user_vip_status($user_id);
        $licenses = $user_id ? (get_user_meta($user_id, '_sedrazavi_spotplayer_licenses', true) ?: []) : [];

        return rest_ensure_response([
            'isLoggedIn' => is_user_logged_in(),
            'vip'        => $vip_status,
            'licenses'   => $licenses,
        ]);
    }
}
