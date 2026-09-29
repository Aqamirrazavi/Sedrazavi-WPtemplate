<?php
/**
 * Template Name: میز محاسبات قضایی (Judicial Calculators)
 * Description: Interactive legal calculators suite based on official judiciary tariffs
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-sans">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
        
        <!-- Page Header -->
        <div class="text-center max-w-3xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                ⚖️ سامانه رسمی محاسبات دادگستری
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-[#0B132B] dark:text-white">
                میز محاسبات قانونی، تمبر مالیاتی و مهریه
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                محاسبه دقیق هزینه دادرسی، تعرفه حق‌الوکاله، خسارت تاخیر تادیه، دیه ۱۴۰۳ و مهریه به نرخ روز
            </p>
        </div>

        <!-- Render Mount Point -->
        <div id="sedrazavi-court-calculator-mount">
            <?php echo do_shortcode('[sedrazavi_judicial_calculators]'); ?>
        </div>
    </div>
</main>

<?php
get_footer();