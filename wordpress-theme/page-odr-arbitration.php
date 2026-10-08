<?php
/**
 * Template Name: مرکز داوری آنلاین (ODR)
 * Description: سامانه رسمی تبادل الکترونیک لوایح، ارجاع داوری و ابلاغ رأی داور مرضی‌الطرفین
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

get_header();

// Process SSR fallback submission
$dispute_submission = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['dispute_subject'])) {
    $subject = sanitize_text_field($_POST['dispute_subject']);
    $contract_num = sanitize_text_field($_POST['contract_number'] ?? '');
    $claimant = sanitize_text_field($_POST['claimant_name'] ?? '');
    $respondent = sanitize_text_field($_POST['respondent_name'] ?? '');
    $summary = sanitize_textarea_field($_POST['dispute_summary'] ?? '');

    $dispute_submission = [
        'subject' => $subject,
        'contract_num' => $contract_num,
        'claimant' => $claimant,
        'respondent' => $respondent,
        'summary' => $summary,
        'tracking_id' => 'ODR-' . date('Ymd') . '-' . rand(100, 999),
    ];
}
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

        <!-- بخش پشتیبان بومی PHP (SSR Pure Fallback) -->
        <section class="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#0B132B]/80 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 class="text-xl font-bold text-[#0B132B] dark:text-white flex items-center gap-3">
                    <span class="w-3 h-3 rounded-full bg-[#D4AF37]"></span>
                    درخواست ارجاع امر به داوری سرداور مرضی‌الطرفین (PHP Native)
                </h2>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    در صورت وجود شرط داوری در قرارداد، فرم زیر را جهت شروع فرآیند داوری و ابلاغ اخطاریه تکمیل فرمایید:
                </p>
            </div>

            <form method="POST" action="" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="dispute_subject" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                            موضوع اختلاف یا نقض تعهد:
                        </label>
                        <input type="text" id="dispute_subject" name="dispute_subject" required class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none" placeholder="مثال: اختلاف در تفسیر ماده ۶ قرارداد مشارکت و تاخیر تحویل">
                    </div>

                    <div>
                        <label for="contract_number" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                            شماره و تاریخ قرارداد مبنا:
                        </label>
                        <input type="text" id="contract_number" name="contract_number" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none" placeholder="قرارداد شماره ۱۱۰ مورخ ۱۴۰۲/۰۶/۱۵">
                    </div>

                    <div>
                        <label for="claimant_name" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                            نام متقاضی داوری (خواهان داوری):
                        </label>
                        <input type="text" id="claimant_name" name="claimant_name" required class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none" placeholder="نام شخص حقیقی یا حقوقی متقاضی">
                    </div>

                    <div>
                        <label for="respondent_name" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                            طرف مقابل داوری (خوانده داوری):
                        </label>
                        <input type="text" id="respondent_name" name="respondent_name" required class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none" placeholder="نام شخص یا شرکت طرف مقابل">
                    </div>
                </div>

                <div>
                    <label for="dispute_summary" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        خلاصه ادعا و تقاضای صدور رأی داوری:
                    </label>
                    <textarea id="dispute_summary" name="dispute_summary" rows="4" required class="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none leading-relaxed" placeholder="شرح خواسته و مطالبه خسارات یا الزام به ایفای تعهد بر مبنای شرط داوری..."></textarea>
                </div>

                <div class="flex items-center justify-between pt-2">
                    <span class="text-xs text-slate-400">پس از ثبت، اخطاریه پذیرش داوری و دعوت به اولین جلسه استماع صادر می‌گردد.</span>
                    <button type="submit" class="px-6 py-2.5 rounded-xl bg-[#0B132B] text-white hover:bg-slate-800 text-xs font-bold border border-[#D4AF37]/50 shadow transition flex items-center gap-2">
                        <span>ثبت رسمی درخواست داوری</span>
                    </button>
                </div>
            </form>

            <?php if ($dispute_submission): ?>
                <div class="mt-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-emerald-500/40 space-y-3">
                    <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                        <span class="text-sm font-bold text-emerald-500">✅ پرونده داوری با موفقیت ثبت شد</span>
                        <span class="text-xs font-mono px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg">کد پرونده داوری: <?php echo esc_html($dispute_submission['tracking_id']); ?></span>
                    </div>
                    <p class="text-xs text-slate-600 dark:text-slate-300">
                        پرونده داوری جهت تعیین وقت رسیدگی به هیئت داوران ارجاع گردید. مراتب ظرف ۴۸ ساعت به طرفین ابلاغ خواهد شد.
                    </p>
                </div>
            <?php endif; ?>
        </section>

    </div>
</main>

<?php
get_footer();
