<?php
/**
 * Template Part: Scenario B - 3-Column Dense Data Matrix
 * Inspired by Neon Cheese & SportsBook Dashboards
 *
 * @package SedRazavi
 */
if (!defined('ABSPATH')) exit;
?>
<section class="uas-scenario-dense bg-[#0A0E17] text-slate-100 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
    <!-- Scoreboard Kicker -->
    <div class="bg-[#0F1626] px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between text-xs">
        <div class="flex items-center gap-2">
            <span class="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono"><?php esc_html_e('زنده: شعبه یک دیوان عالی کشور', 'sedrazavi'); ?></span>
            <span class="text-slate-400"><?php esc_html_e('پرونده داوری تجاری بین‌المللی SR-1403/982', 'sedrazavi'); ?></span>
        </div>
        <span class="font-mono text-emerald-400 font-bold"><?php esc_html_e('۲۴,۹۸۲,۷۵۰ تومان', 'sedrazavi'); ?></span>
    </div>

    <!-- 3-Column Structure -->
    <div class="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-slate-800">
        <!-- Directory Sidebar -->
        <div class="lg:col-span-3 p-4 bg-[#090D15] space-y-3">
            <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider block"><?php esc_html_e('دسته‌بندی دعاوی', 'sedrazavi'); ?></span>
            <ul class="space-y-1.5 text-xs">
                <li class="flex justify-between p-2 rounded-xl bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
                    <span><?php esc_html_e('داوری بین‌المللی', 'sedrazavi'); ?></span>
                    <span class="font-mono">۲۸۴</span>
                </li>
                <li class="flex justify-between p-2 rounded-xl text-slate-400 hover:bg-slate-900">
                    <span><?php esc_html_e('دعاوی مالیاتی', 'sedrazavi'); ?></span>
                    <span class="font-mono">۱۳۶</span>
                </li>
                <li class="flex justify-between p-2 rounded-xl text-slate-400 hover:bg-slate-900">
                    <span><?php esc_html_e('مالکیت فکری', 'sedrazavi'); ?></span>
                    <span class="font-mono">۹۲</span>
                </li>
            </ul>
        </div>

        <!-- Data Table -->
        <div class="lg:col-span-6 p-4 space-y-3">
            <h3 class="text-sm font-bold text-white"><?php esc_html_e('جدول متراکم لوایح و پرونده‌های در جریان', 'sedrazavi'); ?></h3>
            <div class="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40 text-xs">
                <table class="w-full text-right">
                    <thead class="bg-slate-900 text-slate-400 text-[11px] border-b border-slate-800">
                        <tr>
                            <th class="p-2.5"><?php esc_html_e('کد پرونده', 'sedrazavi'); ?></th>
                            <th class="p-2.5"><?php esc_html_e('موکل', 'sedrazavi'); ?></th>
                            <th class="p-2.5"><?php esc_html_e('پیشرفت', 'sedrazavi'); ?></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800/60 font-mono text-[11px]">
                        <tr>
                            <td class="p-2.5 text-cyan-400 font-bold">SR-1403/982</td>
                            <td class="p-2.5 text-slate-200">پترو فرآیند کیش</td>
                            <td class="p-2.5 text-emerald-400">۸۵٪</td>
                        </tr>
                        <tr>
                            <td class="p-2.5 text-cyan-400 font-bold">SR-1403/984</td>
                            <td class="p-2.5 text-slate-200">صنایع فولاد کاسپین</td>
                            <td class="p-2.5 text-amber-400">۶۰٪</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Action Slip -->
        <div class="lg:col-span-3 p-4 bg-[#090D15] space-y-3 flex flex-col justify-between">
            <div>
                <span class="text-xs font-bold text-white"><?php esc_html_e('برگه استعلام و اقدام فوری', 'sedrazavi'); ?></span>
                <p class="text-[11px] text-slate-400 mt-1"><?php esc_html_e('جهت ارسال لایحه یا استعلام، شماره پرونده را وارد فرمایید.', 'sedrazavi'); ?></p>
            </div>
            <a href="#tracking" class="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs text-center block transition-all shadow-lg">
                <?php esc_html_e('استعلام و ثبت درخواست', 'sedrazavi'); ?>
            </a>
        </div>
    </div>
</section>
