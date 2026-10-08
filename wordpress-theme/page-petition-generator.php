<?php
/**
 * Template Name: تنظیم دادخواست و لوایح عدل‌ایران
 * Description: فرم‌ساز هوشمند دادخواست، شکواییه و لوایح تجدیدنظر با قالب رسمی قوه قضائیه
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

get_header();

// Server-side fallback form processing
$generated_preview = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['petition_subject'])) {
    $subject = sanitize_text_field($_POST['petition_subject']);
    $court_type = sanitize_text_field($_POST['court_type'] ?? 'حقوقی');
    $plaintiff = sanitize_text_field($_POST['plaintiff_name'] ?? '');
    $defendant = sanitize_text_field($_POST['defendant_name'] ?? '');
    $statement = sanitize_textarea_field($_POST['petition_statement'] ?? '');

    $generated_preview = [
        'subject' => $subject,
        'court_type' => $court_type,
        'plaintiff' => $plaintiff,
        'defendant' => $defendant,
        'statement' => $statement,
        'tracking_code' => 'PET-' . date('Ymd') . '-' . rand(1000, 9999),
    ];
}
?>

<main class="site-main py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] min-h-screen text-slate-800 dark:text-slate-100">
    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- Header Banner -->
        <header class="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="space-y-3">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
                        <span>📜 سامانه تنظیم لوایح و دادخواست قضایی</span>
                    </div>
                    <h1 class="text-2xl md:text-3xl font-extrabold text-white font-serif">
                        سامانه هوشمند تنظیم دادخواست، شکواییه و لوایح دفاعیه عدل‌ایران
                    </h1>
                    <p class="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
                        نگارش دادخواست‌های منطبق بر قانون آیین دادرسی مدنی و کیفری با ذکر ادله و منضمات قانونی، استناد به مواد قانونی و رویه‌های قضایی دیوان عالی کشور.
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <a href="<?php echo esc_url(home_url('/contact')); ?>" class="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B132B] font-bold text-sm shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2">
                        <span>مشاوره تلفنی با وکیل پایه یک</span>
                    </a>
                </div>
            </div>
        </header>

        <!-- React Interactive Container -->
        <div class="petition-generator-container">
            <?php echo do_shortcode('[sedrazavi_petition_builder]'); ?>
        </div>

        <!-- Pure PHP / SSR Fallback Section -->
        <section class="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#0B132B]/80 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 class="text-xl font-bold text-[#0B132B] dark:text-white flex items-center gap-3">
                    <span class="w-3 h-3 rounded-full bg-[#D4AF37]"></span>
                    فرم استاندارد تنظیم دادخواست (PHP Native Form)
                </h2>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    در صورتی که قصد دارید پیش‌نویس دادخواست را به شکل آفلاین تنظیم کنید، فرم زیر را تکمیل نمایید:
                </p>
            </div>

            <form method="POST" action="" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="petition_subject" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                            موضوع خواسته یا اتهام:
                        </label>
                        <input type="text" id="petition_subject" name="petition_subject" required class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none" placeholder="مثال: مطالبه وجه التزام قراردادی و خسارت تاخیر تادیه">
                    </div>

                    <div>
                        <label for="court_type" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                            مرجع قضایی صالح:
                        </label>
                        <select id="court_type" name="court_type" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none">
                            <option value="دادگاه عمومی حقوقی مجتمع ونک / شهید بهشتی">دادگاه عمومی حقوقی</option>
                            <option value="دادگاه کیفری دو تهران">دادگاه کیفری دو</option>
                            <option value="شورای حل اختلاف">شورای حل اختلاف</option>
                            <option value="دیوان عدالت اداری">دیوان عدالت اداری</option>
                            <option value="مرکز داوری و حل اختلاف">مرکز داوری بازرگانی</option>
                        </select>
                    </div>

                    <div>
                        <label for="plaintiff_name" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                            مشخصات خواهان / شاکی:
                        </label>
                        <input type="text" id="plaintiff_name" name="plaintiff_name" required class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none" placeholder="نام و نام خانوادگی، شماره ملی یا ثنا">
                    </div>

                    <div>
                        <label for="defendant_name" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                            مشخصات خوانده / مشتکی‌عنه:
                        </label>
                        <input type="text" id="defendant_name" name="defendant_name" required class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none" placeholder="نام، شرکت، اقامتگاه خوانده">
                    </div>
                </div>

                <div>
                    <label for="petition_statement" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        شرح خواسته و دلایل و منضمات:
                    </label>
                    <textarea id="petition_statement" name="petition_statement" rows="5" required class="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none leading-relaxed" placeholder="ریاست محترم دادگاه؛ احتراما به استحضار می‌رساند که بر اساس قرارداد شماره..."></textarea>
                </div>

                <div class="flex items-center justify-between pt-2">
                    <span class="text-xs text-slate-400">پیش‌نویس اولیه جهت ثبت در دفاتر خدمات الکترونیک قضایی آماده می‌گردد.</span>
                    <button type="submit" class="px-6 py-2.5 rounded-xl bg-[#0B132B] text-white hover:bg-slate-800 text-xs font-bold border border-[#D4AF37]/50 shadow transition flex items-center gap-2">
                        <span>ایجاد پیش‌نویس رسمی</span>
                    </button>
                </div>
            </form>

            <?php if ($generated_preview): ?>
                <div class="mt-8 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-[#D4AF37] space-y-4">
                    <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                        <span class="text-sm font-bold text-[#0B132B] dark:text-white">📄 برگ دادخواست بدوی (پیش‌نمایش رسمی):</span>
                        <span class="font-mono text-xs px-2.5 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg">کد رهگیری: <?php echo esc_html($generated_preview['tracking_code']); ?></span>
                    </div>

                    <div class="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        <p><strong>مرجع رسیدگی:</strong> <?php echo esc_html($generated_preview['court_type']); ?></p>
                        <p><strong>خواهان:</strong> <?php echo esc_html($generated_preview['plaintiff']); ?></p>
                        <p><strong>خوانده:</strong> <?php echo esc_html($generated_preview['defendant']); ?></p>
                        <p><strong>خواسته:</strong> <?php echo esc_html($generated_preview['subject']); ?></p>
                        <div class="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mt-2">
                            <strong>شرح ماوقع:</strong>
                            <p class="mt-1 whitespace-pre-line"><?php echo esc_html($generated_preview['statement']); ?></p>
                        </div>
                    </div>
                </div>
            <?php endif; ?>
        </section>

    </div>
</main>

<?php
get_footer();
