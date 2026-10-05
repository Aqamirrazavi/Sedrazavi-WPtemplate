<?php
/**
 * Template Name: سامانه ورشکستگی، تصفیه دیون و قرارداد ارفاقی (فاز ۳۷)
 * Description: Dedicated page template for Corporate Insolvency, Debt Restructuring & Composition Agreements
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-sans" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8">
        
        <!-- Header Section -->
        <div class="text-center max-w-3xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                ⚖️ سوئیت تخصصی فاز ۳۷
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-[#0B132B] dark:text-white">
                سامانه ورشکستگی، تصفیه دیون تجاری و قرارداد ارفاقی
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                ارزیابی ریسک توقف، اعمال رأی وحدت رویه شماره ۱۵۵ جهت توقف خسارت دیرکرد، استمهال بدهی‌های بانکی و حمایت از مدیران شرکت‌ها
            </p>
        </div>

        <!-- React Mount Point for CorporateInsolvencySuite -->
        <div class="sedrazavi-insolvency-page-card">
            <?php echo do_shortcode('[sedrazavi_react_insolvency_suite]'); ?>
        </div>
    </div>
</main>

<?php
get_footer();
