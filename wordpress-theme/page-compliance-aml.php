<?php
/**
 * Template Name: سامانه انطباق بانکی، AML و تحریم‌ها (Phase 11)
 * Description: Anti-Money Laundering (AML), KYC/KYT Compliance & Sanctions Screening Portal
 *
 * @package SedRazavi
 * @version 2.7.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-16 bg-[#0B132B] text-white min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-12">
        <div class="text-center max-w-3xl mx-auto space-y-4">
            <span class="px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/40 inline-flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                میز تخصصی حقوق مالی، انطباق و مبارزه با پولشویی (فاز ۱۱)
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-white">
                غربالگری تحریم‌ها، تطبیق بانکی FATF و دفاع در جرایم اقتصادی
            </h1>
            <p class="text-gray-300 text-sm leading-relaxed">
                استعلام اسامی در فهرست‌های SDN و تحریم‌های سازمان ملل، تحلیل معاملات مشکوک (STR)، ارزیابی اشخاص سیاسی (PEP) و ممیزی تراکنش‌های رمزارزی (KYT)
            </p>
        </div>

        <!-- Shortcode Embed -->
        <div class="rounded-3xl p-6 bg-gray-900/80 border border-gray-800 shadow-2xl backdrop-blur-md">
            <?php echo do_shortcode('[sedrazavi_aml_compliance_suite]'); ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>