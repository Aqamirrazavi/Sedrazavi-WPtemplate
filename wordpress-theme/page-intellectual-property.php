<?php
/**
 * Template Name: مالکیت فکری، اختراع و علامت تجاری (IP Suite)
 * Description: سامانه ثبت برند، ارزیابی اختراع، طبقه‌بندی نیس و اسکرو نرم‌افزار
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
        <header class="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="space-y-3">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
                        <span>💡 مالکیت صنعتی، حق مؤلف و نوآوری</span>
                    </div>
                    <h1 class="text-2xl md:text-3xl font-extrabold text-white font-serif">
                        سامانه جامع حمایت از مالکیت فکری، برند و دارایی‌های نامشهود
                    </h1>
                    <p class="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
                        مشاوره و وکالت تخصصی در ثبت علائم تجاری و اختراعات، طبقه‌بندی بین‌المللی کالا و خدمات (Nice Classification)، قراردادهای امانت سورس کد (Software Escrow) و شبیه‌ساز واگذاری سهام استارتاپ‌ها (Vesting).
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <a href="<?php echo esc_url(home_url('/contact')); ?>" class="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B132B] font-bold text-sm shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2">
                        <span>ثبت سفارش استعلام برند</span>
                    </a>
                </div>
            </div>
        </header>

        <!-- React Interactive Container -->
        <div class="ip-suite-container">
            <?php echo do_shortcode('[sedrazavi_ip_suite]'); ?>
        </div>

    </div>
</main>

<?php
get_footer();
