<?php
/**
 * Template Part: Scenario C - Hybrid Executive Contrast
 * Inspired by Mandate Enterprise Dashboard
 *
 * @package SedRazavi
 */
if (!defined('ABSPATH')) exit;
?>
<section class="uas-scenario-hybrid bg-[#F8FAFC] text-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
    <!-- Top Pill Bar -->
    <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 text-xs">
        <div class="flex items-center gap-2 font-bold text-slate-900 font-serif text-base">
            <span class="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">M</span>
            <span><?php esc_html_e('مندیت · داشبورد اجرایی حقوقی', 'sedrazavi'); ?></span>
        </div>
        <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span class="text-slate-500"><?php esc_html_e('پایشگر فعال لوایح دیوان عالی کشور', 'sedrazavi'); ?></span>
        </div>
    </div>

    <!-- Main Grid: Obsidian Card + Action Queue -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Obsidian Dark Focal Card -->
        <div class="lg:col-span-7 bg-[#0A0E17] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl flex flex-col justify-between">
            <div class="space-y-3">
                <span class="text-xs font-bold text-indigo-400"><?php esc_html_e('گزارش تحلیلی پایشگر هوشمند', 'sedrazavi'); ?></span>
                <h3 class="text-xl sm:text-2xl font-bold font-serif leading-snug">
                    <?php esc_html_e('دو پرونده داوری نیازمند تعیین استراتژی مستقیم در دادرسی هستند', 'sedrazavi'); ?>
                </h3>
                <p class="text-xs text-slate-400">
                    <?php esc_html_e('پایش خودکار دادخواست‌ها و لوایح مبادله شده در کارگروه بین‌الملل.', 'sedrazavi'); ?>
                </p>
            </div>
            <div class="pt-6 border-t border-slate-800 mt-6 flex items-baseline justify-between">
                <div class="flex items-baseline gap-2">
                    <span class="text-4xl font-extrabold font-mono text-white">۴۱</span>
                    <span class="text-xs text-emerald-400"><?php esc_html_e('شاخص اطمینان دفاعیه', 'sedrazavi'); ?></span>
                </div>
                <span class="text-xs text-slate-400 font-mono"><?php esc_html_e('سطح ریسک: متوسط (کنترل‌شده)', 'sedrazavi'); ?></span>
            </div>
        </div>

        <!-- Waiting for you Queue Card -->
        <div class="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
                <h4 class="text-sm font-bold text-slate-900"><?php esc_html_e('در انتظار تایید شما (صف لوایح)', 'sedrazavi'); ?></h4>
                <p class="text-xs text-slate-500 mt-0.5"><?php esc_html_e('۴ لایحه تنظیم‌شده آماده امضای الکترونیک', 'sedrazavi'); ?></p>

                <div class="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                    <span class="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded font-mono"><?php esc_html_e('فوری · موعد امروز', 'sedrazavi'); ?></span>
                    <h5 class="font-bold text-slate-900"><?php esc_html_e('تاییدیه نهایی لایحه داوری بازرگانی نفت و گاز', 'sedrazavi'); ?></h5>
                    <p class="text-slate-600"><?php esc_html_e('مطابق با شیوه‌نامه اینکوترمز ۲۰۲۰ و قواعد اتاق بازرگانی پاریس.', 'sedrazavi'); ?></p>
                </div>
            </div>

            <a href="#tracking" class="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center block transition-all shadow">
                <?php esc_html_e('مشاهده و امضای الکترونیک لایحه', 'sedrazavi'); ?>
            </a>
        </div>
    </div>
</section>
