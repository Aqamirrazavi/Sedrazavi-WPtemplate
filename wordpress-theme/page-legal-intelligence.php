<?php
/**
 * Template Name: مرکز هوش حقوقی و ممیزی قراردادها
 * Description: سامانه هوش مصنوعی غربالگری ریسک قراردادها، بانک آرای وحدت رویه و استعلامات ثبتی
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

get_header();
?>

<main id="primary" class="site-main py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] text-slate-800 dark:text-slate-100 min-h-screen">
    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- هدر سامانه هوش حقوقی -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#060B18] via-[#0D1B3E] to-[#060B18] border-2 border-[#D4AF37]/50 shadow-2xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="space-y-3">
                <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                    ⚡ سامانه هوشمند پژوهش، ممیزی قرارداد و تنقیح قوانین (فاز ۶)
                </span>
                <h1 class="text-2xl sm:text-3xl font-black font-serif text-white">
                    پرتال هوش حقوقی و ممیزی ریسک قراردادها
                </h1>
                <p class="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                    موتور استنادی و غربالگری هوشمند متون حقوقی، تطبیق خودکار با آرای وحدت رویه هیات عمومی دیوان عالی کشور، ارزیابی اسقاط خیارات و صدور کارنامه سلامت معامله ملکی و تجاری.
                </p>
            </div>
            <div class="text-left bg-white/5 border border-white/10 p-4 rounded-2xl shrink-0">
                <span class="block text-xs text-slate-400">ناظر علمی و تدوین:</span>
                <span class="text-sm font-bold text-[#D4AF37]"><?php echo esc_html(get_theme_mod('lawyer_full_name', 'سرکار خانم دکتر سیده مریم رضوی')); ?></span>
                <span class="block text-[11px] font-mono text-emerald-400 mt-0.5">پایگاه داده آراء: ۱,۲۸۰+ رأی تنقیح‌شده</span>
            </div>
        </div>

        <!-- شورت‌کد رابط کاربری هوش حقوقی -->
        <div class="legal-intelligence-portal-wrapper">
            <?php echo do_shortcode('[sedrazavi_legal_intelligence_portal]'); ?>
        </div>

    </div>
</main>

<?php
get_footer();
