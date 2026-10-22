<?php
/**
 * Template Name: شبیه‌ساز واکنش‌گرایی چنددستگاهی (Interactive Prototype Viewport)
 * Description: Interactive multi-device simulator viewport (Desktop 1440px, Tablet 768px, Mobile 375px).
 *
 * @package SedRazavi
 * @version 6.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="sr-prototypes-viewport-page py-12 px-4 max-w-7xl mx-auto">
    <div class="sr-prototype-header bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-8 text-white shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
            <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 mb-2">
                <?php esc_html_e('شبیه‌ساز زنده ویوپورت', 'sedrazavi'); ?>
            </span>
            <h1 class="text-2xl md:text-3xl font-black">
                <?php esc_html_e('ارزیابی واکنش‌گرایی و تجربه کاربری در ابعاد مختلف', 'sedrazavi'); ?>
            </h1>
            <p class="text-slate-400 text-xs md:text-sm mt-1">
                <?php esc_html_e('سنجش اجرای زنده وب‌سایت در دستگاه‌های دسکتاپ عریض، تبلت و موبایل بدون تغییر سایز مرورگر.', 'sedrazavi'); ?>
            </p>
        </div>

        <div class="sr-device-controls flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button type="button" class="sr-device-btn sr-btn-desktop px-4 py-2 bg-cyan-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-cyan-600/30" data-width="100%">
                <?php esc_html_e('دسکتاپ (1440px)', 'sedrazavi'); ?>
            </button>
            <button type="button" class="sr-device-btn sr-btn-tablet px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-bold transition-all" data-width="768px">
                <?php esc_html_e('تبلت (768px)', 'sedrazavi'); ?>
            </button>
            <button type="button" class="sr-device-btn sr-btn-mobile px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-bold transition-all" data-width="375px">
                <?php esc_html_e('موبایل (375px)', 'sedrazavi'); ?>
            </button>
        </div>
    </div>

    <!-- Live Preview Frame Container -->
    <div class="sr-viewport-frame-wrapper bg-slate-950/80 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center">
        <div class="sr-browser-url-bar w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 mb-6 flex items-center justify-between text-xs font-mono text-slate-400">
            <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
                <span>https://sedrazavi.ir/prototype/live</span>
            </div>
            <span class="text-[10px] text-emerald-400 font-bold"><?php esc_html_e('امن (SSL)', 'sedrazavi'); ?></span>
        </div>

        <div class="sr-frame-container w-full transition-all duration-300 flex justify-center overflow-hidden" id="prototype-frame-box">
            <iframe src="<?php echo esc_url(home_url('/')); ?>" class="sr-prototype-iframe w-full h-[700px] rounded-2xl border border-slate-800 shadow-2xl bg-white" title="<?php esc_attr_e('پیش‌نمایش زنده وب‌سایت', 'sedrazavi'); ?>"></iframe>
        </div>
    </div>
</div>

<?php
get_footer();
