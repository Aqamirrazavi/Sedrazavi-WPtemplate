<?php
/**
 * Template Name: مرکز داوری آنلاین (ODR)
 * Description: سامانه رسمی تبادل الکترونیک لوایح، ارجاع داوری و ابلاغ رأی داور مرضی‌الطرفین
 *
 * @package SedRazavi_Law_Firm
 * @version 5.0.0
 */

get_header();
?>

<main id="primary" class="site-main py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] text-slate-800 dark:text-slate-100 min-h-screen">
    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- هدر رسمی سامانه داوری -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#060B18] via-[#0B132B] to-[#060B18] border-2 border-[#D4AF37]/50 shadow-2xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="space-y-3">
                <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
                    ⚖️ مرکز داوری و حل‌وفصل برخط اختلافات بازرگانی و ملکی (ODR)
                </span>
                <h1 class="text-2xl sm:text-3xl font-black font-serif text-white">
                    پرتال رسمی داوری تخصصی کانون وکلا
                </h1>
                <p class="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                    منطبق بر باب هفتم قانون آیین دادرسی مدنی جمهوری اسلامی ایران و قانون داوری تجاری بین‌المللی. صدور آرای داوری قطعی و لازم‌الاجرا جهت ارائه به دوایر اجرای احکام دادگستری.
                </p>
            </div>
            <div class="text-left bg-white/5 border border-white/10 p-4 rounded-2xl shrink-0">
                <span class="block text-xs text-slate-400">سرداور مرضی‌الطرفین:</span>
                <span class="text-sm font-bold text-[#D4AF37]"><?php echo esc_html(get_theme_mod('lawyer_full_name', 'سرکار خانم دکتر سیده مریم رضوی')); ?></span>
                <span class="block text-[11px] font-mono text-slate-300 mt-0.5">پروانه وکالت: ۱۸۴۵۲ / ک.و.م</span>
            </div>
        </div>

        <!-- شورت‌کد اصلی ماژول داوری و لوایح -->
        <div class="odr-portal-wrapper">
            <?php echo do_shortcode('[sedrazavi_odr_portal]'); ?>
        </div>

    </div>
</main>

<?php
get_footer();
