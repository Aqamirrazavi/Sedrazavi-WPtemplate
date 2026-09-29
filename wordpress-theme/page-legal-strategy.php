<?php
/**
 * Template Name: پرتال استراتژی دادرسی و مواعد قضایی (Legal Strategy & Deadlines)
 *
 * @package SedRazavi_Law_Firm
 * @version 7.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main min-h-screen bg-slate-50 dark:bg-[#060B18] py-12">
    <div class="container mx-auto px-4 max-w-7xl space-y-8">
        <header class="text-center space-y-3">
            <span class="px-4 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">
                دفتر وکالت سرکار خانم دکتر سیده مریم رضوی - سامانه فاز ۷
            </span>
            <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-serif">
                پرتال استراتژی دادرسی، مواعد قانونی و گاوصندوق اسناد قضایی
            </h1>
            <p class="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                شبیه‌سازی برخط شانس پیروزی، پایش لحظه‌ای مواعد تجدیدنظر و فرجام بر اساس مواد ۴۴۲ الی ۴۵۳ ق.آ.د.م و نگهداری اسناد با هش SHA-256.
            </p>
        </header>

        <div class="legal-strategy-suite-wrapper">
            <?php echo do_shortcode('[sedrazavi_legal_strategy_suite]'); ?>
        </div>
    </div>
</main>

<?php
get_footer();
