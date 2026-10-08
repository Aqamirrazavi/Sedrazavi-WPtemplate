<?php
/**
 * Template Name: دعاوی مالیاتی و سامانه مودیان (Tax Disputes)
 * Description: هیئت‌های حل اختلاف مالیاتی، دفاع ماده ۲۳۸ و ۲۴۴، تطبیق سامانه مودیان و پایانه‌های فروشگاهی
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="site-main py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] text-slate-800 dark:text-slate-100 min-h-screen">
    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- Header Banner -->
        <header class="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#1B2836] to-[#0B132B] text-white border border-emerald-500/30 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="space-y-3">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                        <span>📊 مالیات بر درآمد، ارزش افزوده و پایانه‌های فروشگاهی</span>
                    </div>
                    <h1 class="text-2xl md:text-3xl font-extrabold text-white font-serif">
                        کلینیک تخصصی دعاوی مالیاتی، اعتراض به برگ تشخیص و سامانه مودیان
                    </h1>
                    <p class="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
                        دفاع در هیئت‌های بدوی و تجدیدنظر حل اختلاف مالیاتی (مواد ۲۴۴ و ۲۴۷ ق.م.م)، شورای عالی مالیاتی (ماده ۲۵۱) و هیئت ۲۵۱ مکرر؛ حل چالش‌های جرایم عدم ارسال صورتحساب الکترونیکی.
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <a href="<?php echo esc_url(home_url('/contact')); ?>" class="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B132B] font-bold text-sm shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2">
                        <span>تنظیم لایحه اعتراضی مالیاتی</span>
                    </a>
                </div>
            </div>
        </header>

        <!-- React Interactive Container -->
        <div class="tax-suite-container">
            <?php echo do_shortcode('[react_component name="TaxDisputesMoadianSuite"]'); ?>
        </div>

    </div>
</main>

<?php
get_footer();
