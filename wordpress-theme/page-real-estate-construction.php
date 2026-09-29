<?php
/**
 * Template Name: سامانه دعاوی ملکی، سرقفلی و ساخت‌وساز (Phase 12)
 * Description: Real Estate, Construction Partnerships, Goodwill (Key-money) & Municipal Commissions Portal
 *
 * @package SedRazavi
 * @version 2.8.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-16 bg-[#0B132B] text-white min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-12">
        <div class="text-center max-w-3xl mx-auto space-y-4">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                میز تخصصی دعاوی ملکی، سرقفلی و ساخت‌وساز (فاز ۱۲)
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-white">
                دعاوی اراضی، مشارکت در ساخت، سرقفلی و کمیسیون ماده ۱۰۰ شهرداری
            </h1>
            <p class="text-gray-300 text-sm leading-relaxed">
                محاسبه‌گر ترازنامه قدرالسهم مشارکت در ساخت، تحلیل احکام سرقفلی و حق کسب و پیشه (قوانین ۵۶ و ۷۶) و مخزن دادخواست‌های الزام به تنظیم سند رسمی.
            </p>
        </div>

        <!-- Shortcode Embed -->
        <div class="rounded-3xl p-6 bg-gray-900/80 border border-gray-800 shadow-2xl backdrop-blur-md">
            <?php echo do_shortcode('[sedrazavi_real_estate_suite]'); ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>