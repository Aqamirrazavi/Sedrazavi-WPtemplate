<?php
/**
 * Template Name: تماس و رزرو نوبت (Contact & Booking)
 * Description: Dedicated contact page template with office address and booking form
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-16 bg-[#F4F6F9] min-h-screen text-[#0B132B]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-12">
        <div class="text-center max-w-2xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] text-xs font-bold border border-[#D4AF37]/40">پذیرش حضوری و آنلاین</span>
            <h1 class="text-3xl sm:text-4xl font-black text-[#0B132B]">ارتباط مستقیم با دفتر وکالت دکتر سیده مریم رضوی</h1>
            <p class="text-gray-600 text-sm">پاسخگویی سریع، وقت‌دهی منظم و جلسات مشاوره تخصصی</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 text-right">
            <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-md space-y-2">
                <span class="text-[#D4AF37] font-bold text-sm">📍 نشانی دفتر ونک</span>
                <p class="text-xs text-gray-600 leading-relaxed">تهران، بالاتر از میدان ونک، برج حقوقی SedRazavi، طبقه ۸</p>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-md space-y-2">
                <span class="text-[#D4AF37] font-bold text-sm">📞 خطوط تماس</span>
                <p class="text-xs text-gray-600 leading-relaxed">تلفن: ۰۲۱-۸۸۸۸۸۸۸۸<br>همراه: ۰۹۱۲۳۴۵۶۷۸۹</p>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-md space-y-2">
                <span class="text-[#D4AF37] font-bold text-sm">⏰ ساعات پذیرش</span>
                <p class="text-xs text-gray-600 leading-relaxed">شنبه تا چهارشنبه: ۱۴:۰۰ الی ۲۰:۰۰ (با تعیین وقت قبلی)</p>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-md space-y-2">
                <span class="text-[#D4AF37] font-bold text-sm">✉️ ایمیل رسمی</span>
                <p class="text-xs text-gray-600 leading-relaxed">info@sedrazavi-law.com</p>
            </div>
        </div>

        <!-- Automatic Shortcodes Integration -->
        <div class="space-y-8 pt-6">
            <?php echo do_shortcode('[sedrazavi_booking]'); ?>
            <?php echo do_shortcode('[sedrazavi_social_icons]'); ?>
            <?php echo do_shortcode('[sedrazavi_gold_scroll]'); ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>