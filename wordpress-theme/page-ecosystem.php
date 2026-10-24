<?php
/**
 * Template Name: درگاه ناشران، بررسی شرکا و اکوسیستم (Ecosystem & Publisher Portal)
 * Description: Phase 6 Ecosystem & Scale template for verified publishers, 10-step package validation, and revocation feed.
 *
 * @package SedRazavi
 * @version 25.0.0
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="sr-ecosystem-wrapper py-12 px-4 max-w-6xl mx-auto" dir="rtl">
    <!-- Header Banner -->
    <div class="sr-ecosystem-header bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-8 text-center text-white shadow-2xl relative overflow-hidden">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30 mb-4">
            <span class="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
            <span><?php esc_html_e('اکوسیستم و مقیاس‌پذیری — فاز ۶ مستر پلن v25.0', 'sedrazavi'); ?></span>
        </div>

        <h1 class="text-3xl md:text-4xl font-black mb-3">
            <?php esc_html_e('درگاه رسمی ناشران، خط لوله بررسی شرکا و فید ابطال بسته‌ها', 'sedrazavi'); ?>
        </h1>
        <p class="text-slate-400 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            <?php esc_html_e('تضمین زنجیره تأمین ایمن، ارزیابی ۱۰ مرحله‌ای بسته‌ها، راستی‌آزمایی امضاهای دیجیتال SHA-256 و پایش لحظه‌ای فید لغو (CRL) برای حفاظت حداکثری از سایت‌های وردپرسی.', 'sedrazavi'); ?>
        </p>
    </div>

    <!-- Tiers Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Tier 1 -->
        <div class="sr-ecosystem-card bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-white space-y-3">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-lg border border-violet-500/30">
                    🛡️
                </div>
                <div>
                    <h3 class="font-bold text-base"><?php esc_html_e('سطح ۱: ناشران رسمی (First-Party)', 'sedrazavi'); ?></h3>
                    <span class="text-xs text-emerald-400 font-mono">first_party_signed</span>
                </div>
            </div>
            <p class="text-slate-400 text-xs leading-relaxed">
                <?php esc_html_e('بسته‌های رسمی مهندسی‌شده توسط سید امیر حسین رضوی فردویی با کلید اختصاصی و بیشترین سطح اعتماد.', 'sedrazavi'); ?>
            </p>
        </div>

        <!-- Tier 2 -->
        <div class="sr-ecosystem-card bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-white space-y-3">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-lg border border-sky-500/30">
                    🤝
                </div>
                <div>
                    <h3 class="font-bold text-base"><?php esc_html_e('سطح ۲: شرکای بازبینی‌شده (Partner)', 'sedrazavi'); ?></h3>
                    <span class="text-xs text-sky-400 font-mono">reviewed_partner</span>
                </div>
            </div>
            <p class="text-slate-400 text-xs leading-relaxed">
                <?php esc_html_e('توسعه‌دهندگان و موسسات همکار که بسته‌های آنها از خط لوله ۱۰ مرحله‌ای بررسی عبور کرده است.', 'sedrazavi'); ?>
            </p>
        </div>

        <!-- Tier 3 -->
        <div class="sr-ecosystem-card bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-white space-y-3">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-lg border border-rose-500/30">
                    🚫
                </div>
                <div>
                    <h3 class="font-bold text-base"><?php esc_html_e('فید ابطال بسته‌ها (CRL Feed)', 'sedrazavi'); ?></h3>
                    <span class="text-xs text-rose-400 font-mono">blocked_revoked</span>
                </div>
            </div>
            <p class="text-slate-400 text-xs leading-relaxed">
                <?php esc_html_e('پایش آنلاین و مسدودسازی کلیدها یا نسخه‌های دارای رخنه امنیتی جهت دفع تهدیدات زنجیره تأمین.', 'sedrazavi'); ?>
            </p>
        </div>
    </div>

    <!-- Security Banner -->
    <div class="sr-ecosystem-footer-note bg-black/60 border border-slate-800 rounded-2xl p-6 text-slate-300 text-xs font-mono flex items-center justify-between">
        <div class="flex items-center gap-2">
            <span class="text-violet-400 font-bold">🔐 <?php esc_html_e('پروتکل اصالت‌سنجی اکوسیستم:', 'sedrazavi'); ?></span>
            <span><?php esc_html_e('تأییدیه امضای دیجیتال ناشران منطبق با بندهای ۶.۷ و ۶.۸ مستر پلن v25.0', 'sedrazavi'); ?></span>
        </div>
        <div class="text-emerald-400 font-bold">Zero-Lockin Guarantee</div>
    </div>
</div>

<?php
get_footer();
