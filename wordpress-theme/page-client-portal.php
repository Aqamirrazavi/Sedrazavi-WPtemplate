<?php
/**
 * Template Name: پرتال موکلین (Client Portal)
 * Description: Secure private client portal for case tracking and document downloads
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-sans">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-8">
        
        <!-- Header Section -->
        <div class="text-center max-w-2xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                🔒 پرتال امن و محرمانه موکلین
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-[#0B132B] dark:text-white">
                سامانه پیگیری پرونده و مکاتبات موکلان
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                مشاهده تایم‌لاین دادرسی، اوقات نظارت دادگاه، دریافت لوایح تنظیمی و تسویه حق‌الوکاله
            </p>
        </div>

        <!-- React Mount Point for ClientPortalView -->
        <div id="sedrazavi-client-portal-mount">
            <?php echo do_shortcode('[sedrazavi_client_portal]'); ?>
        </div>

        <!-- Security & Legal Notice -->
        <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-3">
            <span class="text-base">🛡️</span>
            <span>کلیه اطلاعات این سامانه منطبق بر سوگند حرفه‌ای وکالت و مقررات حفظ اسرار موکلین به صورت رمزنگاری‌شده نگهداری می‌شود.</span>
        </div>
    </div>
</main>

<?php
get_footer();