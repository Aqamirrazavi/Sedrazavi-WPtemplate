<?php
/**
 * Template Name: پرتال امن پرونده‌های موکل (Level C Matter Operations Portal)
 * Description: High-security client matter operations, object-level anti-IDOR protection, private document vault, and judicial deadlines tracker.
 *
 * @package SedRazavi
 * @version 25.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

$portal_engine = class_exists('SedRazavi_Legal_Matter_Portal') ? SedRazavi_Legal_Matter_Portal::get_instance() : null;
?>

<div class="sr-portal-page py-12 px-4 max-w-7xl mx-auto font-sans" dir="rtl">
    <!-- Header -->
    <div class="sr-portal-header bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-8 text-white shadow-2xl relative overflow-hidden">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
                <span class="sr-portal-badge inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 mb-3">
                    <?php esc_html_e('سطح C — پرتال امن موکل و پرونده‌های حقوقی (SedRazavi Legal)', 'sedrazavi'); ?>
                </span>
                <h1 class="sr-portal-title text-2xl md:text-4xl font-black mb-2">
                    <?php esc_html_e('کارتابل رسیدگی به پرونده، اوراق قضایی و مهلت‌های دادرسی', 'sedrazavi'); ?>
                </h1>
                <p class="sr-portal-subtitle text-slate-400 text-xs md:text-sm max-w-2xl leading-relaxed">
                    <?php esc_html_e('ایزولاسیون کامل داده‌ها بر مبنای مالکیت رکوردهای موکل، سپر دفاعی ضد IDOR، والت اسناد رمزنگاری‌شده و پیگیری لحظه‌ای مواعد قانونی.', 'sedrazavi'); ?>
                </p>
            </div>

            <div class="sr-portal-security-strip flex items-center gap-2 bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800 text-xs font-mono shrink-0">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                <span class="text-emerald-400 font-bold"><?php esc_html_e('امنیت ضد IDOR فعال', 'sedrazavi'); ?></span>
                <span class="text-slate-600">|</span>
                <span class="text-cyan-400">HMAC-SHA256</span>
            </div>
        </div>
    </div>

    <!-- Active Matters Section (2 Cols Layout) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <!-- Matter Timeline & Details (2 Cols) -->
        <div class="lg:col-span-2 space-y-6">
            <div class="sr-portal-matter-card bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
                <div class="sr-portal-matter-header flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
                    <div>
                        <span class="sr-portal-case-number text-xs font-mono text-cyan-400 font-bold block mb-1">
                            <?php esc_html_e('کلاسه پرونده: MAT-2026-089', 'sedrazavi'); ?>
                        </span>
                        <h2 class="sr-portal-matter-title text-lg sm:text-xl font-bold">
                            <?php esc_html_e('داوری تجاری و حل اختلاف قرارداد توسعه نرم‌افزار هلدینگ آراز', 'sedrazavi'); ?>
                        </h2>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="sr-portal-status-pill px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            <?php esc_html_e('در حال تبادل لوایح داوری', 'sedrazavi'); ?>
                        </span>
                    </div>
                </div>

                <div class="mb-6 text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <strong class="text-white block mb-1"><?php esc_html_e('شرح خلاصه دعوا:', 'sedrazavi'); ?></strong>
                    <?php esc_html_e('مطالبه خسارت تاخیر تادیه، نقض تعهدات قراردادی و الزام پیمانکار به تسلیم کدهای منبع بر مبنای شرط داوری مندرج در ماده ۱۷ قرارداد مشارکت فناوری.', 'sedrazavi'); ?>
                </div>

                <div class="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 mb-8 pt-2">
                    <span class="sr-portal-lawyer-badge flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300">
                        ⚖️ <?php esc_html_e('وکیل سرپرست: دکتر سیده مریم رضوی', 'sedrazavi'); ?>
                    </span>
                    <span><?php esc_html_e('مرجع رسیدگی: مرکز داوری اتاق بازرگانی (ACIC)', 'sedrazavi'); ?></span>
                </div>

                <!-- Case Timeline -->
                <h3 class="text-sm font-bold text-white mb-4"><?php esc_html_e('تایم‌لاین گردش پرونده و اقدامات قضایی:', 'sedrazavi'); ?></h3>
                <div class="sr-portal-timeline space-y-4 pr-2 border-r-2 border-slate-800">
                    <div class="sr-portal-timeline-step relative pr-6">
                        <span class="sr-portal-timeline-dot absolute -right-[7px] top-1.5 w-3 h-3 rounded-full bg-emerald-500"></span>
                        <span class="sr-portal-timeline-date block text-[10px] font-mono text-emerald-400">۲۵ مرداد ۱۴۰۵</span>
                        <p class="sr-portal-timeline-text text-xs text-slate-300 font-bold"><?php esc_html_e('ثبت رسمی دادخواست داوری و تعیین داور اختصاصی', 'sedrazavi'); ?></p>
                    </div>
                    <div class="sr-portal-timeline-step relative pr-6">
                        <span class="sr-portal-timeline-dot absolute -right-[7px] top-1.5 w-3 h-3 rounded-full bg-emerald-500"></span>
                        <span class="sr-portal-timeline-date block text-[10px] font-mono text-emerald-400">۱۵ مهر ۱۴۰۵</span>
                        <p class="sr-portal-timeline-text text-xs text-slate-300 font-bold"><?php esc_html_e('برگزاری جلسه استماع و تسلیم لایحه تکمیلی شماره ۲', 'sedrazavi'); ?></p>
                    </div>
                    <div class="sr-portal-timeline-step relative pr-6">
                        <span class="sr-portal-timeline-dot absolute -right-[7px] top-1.5 w-3 h-3 rounded-full bg-cyan-500 animate-ping"></span>
                        <span class="sr-portal-timeline-date block text-[10px] font-mono text-cyan-400">۲۰ آبان ۱۴۰۵</span>
                        <p class="sr-portal-timeline-text text-xs text-white font-bold"><?php esc_html_e('جلسه انشای رای نهایی داوری و ابلاغ به طرفین', 'sedrazavi'); ?></p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sidebar: Secure Document Vault & Deadlines (1 Col) -->
        <div class="lg:col-span-1 space-y-6">
            <!-- Private Document Vault -->
            <div class="sr-portal-vault-card bg-slate-900/90 border border-slate-800 rounded-3xl p-6 text-white shadow-xl">
                <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                    <h3 class="text-sm font-bold flex items-center gap-2">
                        <span>🔒</span>
                        <span><?php esc_html_e('والت اسناد محرمانه پرونده', 'sedrazavi'); ?></span>
                    </h3>
                    <span class="text-[10px] bg-slate-950 text-cyan-400 px-2 py-0.5 rounded font-mono">ایزوله</span>
                </div>

                <p class="text-[11px] text-slate-400 leading-relaxed mb-4">
                    <?php esc_html_e('دانلود اسناد منحصراً با توکن‌های امضاشده ۱۵ دقیقه‌ای و پس از احراز هویت سرور انجام می‌پذیرد.', 'sedrazavi'); ?>
                </p>

                <div class="space-y-3">
                    <div class="sr-portal-doc-item bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                        <div>
                            <span class="block text-xs font-bold text-white mb-0.5"><?php esc_html_e('لایحه دفاعیه داوری شماره ۲', 'sedrazavi'); ?></span>
                            <span class="sr-portal-doc-meta text-[10px] text-slate-500 font-mono">PDF • 2.4 MB • SHA-256</span>
                        </div>
                        <button type="button" class="sr-portal-doc-btn p-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white transition-all text-xs font-bold cursor-pointer">
                            <?php esc_html_e('دریافت امن', 'sedrazavi'); ?>
                        </button>
                    </div>

                    <div class="sr-portal-doc-item bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                        <div>
                            <span class="block text-xs font-bold text-white mb-0.5"><?php esc_html_e('قرارداد اصلی پیمانکاری فناوری', 'sedrazavi'); ?></span>
                            <span class="sr-portal-doc-meta text-[10px] text-slate-500 font-mono">PDF • 5.1 MB • SHA-256</span>
                        </div>
                        <button type="button" class="sr-portal-doc-btn p-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white transition-all text-xs font-bold cursor-pointer">
                            <?php esc_html_e('دریافت امن', 'sedrazavi'); ?>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Judicial Deadlines Tracker -->
            <div class="sr-portal-deadlines-card bg-slate-900/90 border border-slate-800 rounded-3xl p-6 text-white shadow-xl">
                <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                    <h3 class="text-sm font-bold flex items-center gap-2">
                        <span>⏳</span>
                        <span><?php esc_html_e('مهلت‌های قانونی و قضایی', 'sedrazavi'); ?></span>
                    </h3>
                    <span class="text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-full font-bold">هشدار موعد</span>
                </div>

                <div class="sr-portal-deadline-item bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                        <span class="block text-xs font-bold text-white mb-1"><?php esc_html_e('اعتراض به نظریه کارشناس ۳ نفره', 'sedrazavi'); ?></span>
                        <span class="text-[10px] text-slate-400 font-mono">مهلت تا: ۱۴۰۵/۰۸/۱۲</span>
                    </div>
                    <span class="sr-portal-deadline-days text-sm font-black text-rose-400 font-mono bg-rose-950/60 px-2.5 py-1 rounded-xl border border-rose-800">
                        ۹ روز
                    </span>
                </div>
            </div>
        </div>
    </div>

    <!-- Security Audit Trail Box -->
    <div class="sr-portal-audit-box bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span><?php esc_html_e('سامانه ممیزی لاگ‌های امنیتی (Append-Only Audit Trail) فعال است. کلیه تراکنش‌ها با هش IP و زمان UTC ثبت می‌گردد.', 'sedrazavi'); ?></span>
        </div>
        <span class="font-mono text-cyan-400 text-[11px]"><?php esc_html_e('ناظر: سید امیر حسین رضوی فردویی (@sedrazavi)', 'sedrazavi'); ?></span>
    </div>
</div>

<?php
get_footer();
