<?php
/**
 * Template Name: پرتال امور شرکت‌ها و داوری بین‌المللی
 * Description: Corporate Governance, Incoterms 2020 & International Arbitration Portal (Phase 8)
 *
 * @package SedRazavi
 * @version 8.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-12 bg-slate-50 dark:bg-[#060B18] min-h-screen text-slate-800 dark:text-slate-100" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8">
        <!-- سربرگ اختصاصی دکتری حقوق بین‌الملل دکتر سیده مریم رضوی -->
        <div class="rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] border border-[#D4AF37]/30 p-8 sm:p-12 text-white shadow-2xl">
            <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div class="space-y-3 max-w-3xl">
                    <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F3E5AB] text-xs font-bold">
                        پرتال فاز ۸ - مرکز تخصصی حقوق شرکت‌ها و داوری اتاق بازرگانی بین‌المللی (ICC)
                    </span>
                    <h1 class="text-3xl sm:text-4xl font-black font-serif text-white leading-tight">
                        امور شرکت‌ها، بازرگانی بین‌الملل و داوری فرامرزی
                    </h1>
                    <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        سامانه مکانیزه محاسبه حد نصاب تشکیل و تصمیم‌گیری مجامع شرکتی طبق لایحه اصلاحی قانون تجارت، شبیه‌ساز حرفه‌ای ۱۱ قاعده اینکوترمز ۲۰۲۰ و کلینیک داوری بین‌المللی تحت کنوانسیون ۱۹۵۸ نیویورک.
                    </p>
                </div>
                <div class="p-5 rounded-2xl bg-white/5 border border-[#D4AF37]/40 backdrop-blur-md space-y-2 min-w-[260px] text-right">
                    <div class="text-xs font-bold text-[#F3E5AB]">سرپرست علمی و راهبردی:</div>
                    <div class="text-base font-black text-white">دکتر سیده مریم رضوی</div>
                    <div class="text-xs text-[#D4AF37]">دکتری حقوق بین‌الملل عمومی و خصوصی</div>
                </div>
            </div>
        </div>

        <!-- فراخوانی شورت‌کد اختصاصی فاز ۸ -->
        <?php echo do_shortcode('[sedrazavi_corporate_suite]'); ?>
    </div>
</div>

<?php get_footer(); ?>