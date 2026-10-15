<?php
/**
 * Template Part: Scenario A - Bento-Grid HUD Hub
 * Inspired by Car HUD & Audiowave Dashboard
 *
 * @package SedRazavi
 */
if (!defined('ABSPATH')) exit;
?>
<section class="uas-scenario-bento bg-[#07090E] text-slate-100 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
    <!-- Top Telemetry Bar -->
    <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 text-xs">
        <div class="flex items-center gap-3">
            <span class="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] animate-pulse"></span>
            <div>
                <span class="text-xl font-bold font-mono text-white"><?php echo esc_html(date_i18n('H:i')); ?></span>
                <span class="text-slate-400 mr-2"><?php esc_html_e('سامانه رصد زنده پرونده‌ها', 'sedrazavi'); ?></span>
            </div>
        </div>
        <div class="flex items-center gap-2 font-mono text-slate-400">
            <span class="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400"><?php esc_html_e('سرور مرکزی: پایدار', 'sedrazavi'); ?></span>
            <span class="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800"><?php esc_html_e('٪۷۳ ظرفیت آزاد', 'sedrazavi'); ?></span>
        </div>
    </div>

    <!-- Bento Grid Container -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <!-- Media Tile -->
        <div class="lg:col-span-4 bg-[#0D111A] p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
                <span class="text-[10px] uppercase font-bold text-amber-400 tracking-wider"><?php esc_html_e('پادکست حقوقی فعال', 'sedrazavi'); ?></span>
                <h4 class="text-sm font-bold text-white mt-1"><?php esc_html_e('تحلیل ابعاد حقوقی قراردادهای هوشمند و بلاک‌چین', 'sedrazavi'); ?></h4>
                <p class="text-xs text-slate-400 mt-1"><?php esc_html_e('دکتر سیده مریم رضوی · پادکست دادبان', 'sedrazavi'); ?></p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span class="text-xs font-mono text-slate-500">۳:۳۵ / ۲۸:۴۵</span>
                <span class="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-bold"><?php esc_html_e('پخش زنده', 'sedrazavi'); ?></span>
            </div>
        </div>

        <!-- Navigation Map Telemetry Tile -->
        <div class="lg:col-span-5 bg-[#0D111A] p-5 rounded-2xl border border-slate-800 flex flex-col justify-between text-center relative overflow-hidden">
            <div class="text-right">
                <span class="text-xs text-slate-400"><?php esc_html_e('مرحله بعدی فرآیند دادرسی', 'sedrazavi'); ?></span>
                <h3 class="text-base font-bold text-white"><?php esc_html_e('تسلیم لایحه تجدیدنظر دیوان عالی', 'sedrazavi'); ?></h3>
            </div>
            <div class="my-6">
                <div class="text-4xl font-extrabold font-mono text-cyan-400"><?php esc_html_e('۵۲۰ متر', 'sedrazavi'); ?></div>
                <p class="text-xs text-slate-400 mt-1"><?php esc_html_e('فاصله تا مجتمع قضایی شهید بهشتی', 'sedrazavi'); ?></p>
            </div>
            <div class="pt-3 border-t border-slate-800 flex justify-between text-xs text-slate-400">
                <span><?php esc_html_e('زمان تخمینی:', 'sedrazavi'); ?> <strong class="text-white font-mono">۴۵ دقیقه</strong></span>
                <a href="#tracking" class="text-cyan-400 font-bold hover:underline"><?php esc_html_e('رهگیری پرونده', 'sedrazavi'); ?></a>
            </div>
        </div>

        <!-- Speedometer Gauge Tile -->
        <div class="lg:col-span-3 bg-[#0D111A] p-5 rounded-2xl border border-slate-800 flex flex-col justify-between text-center">
            <span class="text-xs text-slate-400"><?php esc_html_e('شاخص پیشرفت کل پرونده‌ها', 'sedrazavi'); ?></span>
            <div class="my-4 flex items-center justify-center">
                <div class="w-28 h-28 rounded-full border-4 border-slate-800 border-t-cyan-400 flex flex-col items-center justify-center shadow-lg">
                    <span class="text-3xl font-extrabold font-mono text-white">۶۷</span>
                    <span class="text-[9px] text-slate-400 uppercase">امتیاز دادرسی</span>
                </div>
            </div>
            <div class="text-xs text-emerald-400 font-bold font-mono">
                <?php esc_html_e('وضعیت عالی · دنده D دادرسی فعال', 'sedrazavi'); ?>
            </div>
        </div>
    </div>
</section>
