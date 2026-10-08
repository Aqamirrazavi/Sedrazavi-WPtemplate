<?php
/**
 * Template Name: ممیزی هوشمند قراردادها (Contract Auditor)
 * Description: ابزار ممیزی شروط قرارداد، نمره‌دهی ریسک حقوقی و پیشنهاد نگارش جایگزین وکلای پایه یک
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

get_header();

// Process Sample SSR Fallback if POST request is made
$audit_result = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['contract_text'])) {
    $text = sanitize_textarea_field($_POST['contract_text']);
    $word_count = count(preg_split('/\s+/u', trim($text)));
    
    // Sample heuristics
    $has_arbitration = mb_strpos($text, 'داوری') !== false;
    $has_penalty = mb_strpos($text, 'خسارت') !== false || mb_strpos($text, 'وجه التزام') !== false;
    $has_force_majeure = mb_strpos($text, 'فورس ماژور') !== false || mb_strpos($text, 'حوادث غیرمترقبه') !== false;
    
    $score = 85;
    $risks = [];
    if (!$has_arbitration) {
        $score -= 20;
        $risks[] = 'عدم پیش‌بینی شرط داوری سازمانی؛ در صورت اختلاف، رسیدگی به محاکم عمومی دادگستری ارجاع خواهد شد که مستلزم فرآیند طولانی اطاله دادرسی است.';
    }
    if (!$has_penalty) {
        $score -= 15;
        $risks[] = 'عدم تعیین وجه التزام شفاف روزانه برای تاخیر در انجام تعهدات طرف مقابل.';
    }
    if (!$has_force_majeure) {
        $score -= 10;
        $risks[] = 'فقدان شرط فورس‌ماژور و نحوه تعلیق یا انفساخ تعهدات در شرایط اضطراری.';
    }

    $audit_result = [
        'score' => max(30, $score),
        'word_count' => $word_count,
        'risks' => $risks,
        'has_arbitration' => $has_arbitration,
        'has_penalty' => $has_penalty,
        'has_force_majeure' => $has_force_majeure,
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
                        <span>⚖️ هوش مصنوعی و ممیزی قراردادها</span>
                    </div>
                    <h1 class="text-2xl md:text-3xl font-extrabold text-white font-serif">
                        سامانه جامع ممیزی شروط قرارداد و ارزیابی ریسک حقوقی
                    </h1>
                    <p class="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
                        بررسی خط‌به‌خط بندهای تعهدآور، تضامین، شرط داوری و بندهای محرمانگی با استانداردهای رسمی کانون وکلای دادگستری مرکز و هیئت داوران بین‌المللی SedRazavi.
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <a href="<?php echo esc_url(home_url('/contact')); ?>" class="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B132B] font-bold text-sm shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2">
                        <span>درخواست بازبینی توسط وکیل</span>
                    </a>
                </div>
            </div>
        </header>

        <!-- React Interactive Container -->
        <div class="contract-auditor-container">
            <?php echo do_shortcode('[sedrazavi_contract_auditor]'); ?>
        </div>

        <!-- Pure PHP / SSR Fallback Section -->
        <section class="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#0B132B]/80 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 class="text-xl font-bold text-[#0B132B] dark:text-white flex items-center gap-3">
                    <span class="w-3 h-3 rounded-full bg-[#D4AF37]"></span>
                    موتور ممیزی سرور (PHP Native Engine)
                </h2>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    در صورت عدم فعال‌سازی جاوااسکریپت در مرورگر، می‌توانید متن قرارداد را در فرم زیر وارد کرده و آنالیز اولیه دریافت نمایید:
                </p>
            </div>

            <form method="POST" action="" class="space-y-4">
                <div>
                    <label for="contract_text" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        متن قرارداد، پیش‌نویس توافق‌نامه یا شروط مورد اختلاف:
                    </label>
                    <textarea id="contract_text" name="contract_text" rows="6" required class="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none leading-relaxed" placeholder="متن قرارداد خود را در اینجا جای‌گذاری نمایید (شامل ماده تعهدات، تضمین‌ها، مرجع حل اختلاف و ...)"></textarea>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-xs text-slate-400">اطلاعات شما با پروتکل رمزنگاری SSL بررسی شده و در پایگاه‌داده ذخیره نمی‌گردد.</span>
                    <button type="submit" class="px-6 py-2.5 rounded-xl bg-[#0B132B] text-white hover:bg-slate-800 text-xs font-bold border border-[#D4AF37]/50 shadow transition flex items-center gap-2">
                        <span>ارزیابی هوشمند شروط</span>
                    </button>
                </div>
            </form>

            <?php if ($audit_result): ?>
                <div class="mt-8 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-[#D4AF37]/40 space-y-4">
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-bold text-[#0B132B] dark:text-white">نتیجه ممیزی و شاخص سلامت حقوقی:</span>
                        <span class="px-3 py-1 rounded-full text-xs font-bold <?php echo $audit_result['score'] >= 70 ? 'bg-emerald-500/20 text-emerald-600' : 'bg-rose-500/20 text-rose-500'; ?>">
                            نمره ایمنی: <?php echo esc_html($audit_result['score']); ?> از ۱۰۰
                        </span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div class="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span class="text-slate-400 block mb-1">شرط داوری سازمانی:</span>
                            <span class="font-bold <?php echo $audit_result['has_arbitration'] ? 'text-emerald-500' : 'text-rose-500'; ?>">
                                <?php echo $audit_result['has_arbitration'] ? '✅ شناسایی شد' : '❌ مفقود'; ?>
                            </span>
                        </div>
                        <div class="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span class="text-slate-400 block mb-1">وجه التزام و ضمانت‌اجرا:</span>
                            <span class="font-bold <?php echo $audit_result['has_penalty'] ? 'text-emerald-500' : 'text-amber-500'; ?>">
                                <?php echo $audit_result['has_penalty'] ? '✅ پیش‌بینی شده' : '⚠️ نیاز به تقویت'; ?>
                            </span>
                        </div>
                        <div class="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span class="text-slate-400 block mb-1">فورس ماژور و تعلیق:</span>
                            <span class="font-bold <?php echo $audit_result['has_force_majeure'] ? 'text-emerald-500' : 'text-rose-500'; ?>">
                                <?php echo $audit_result['has_force_majeure'] ? '✅ استاندارد' : '❌ مفقود'; ?>
                            </span>
                        </div>
                    </div>

                    <?php if (!empty($audit_result['risks'])): ?>
                        <div class="space-y-2 pt-2">
                            <span class="text-xs font-bold text-rose-500">هشدارهای ریسک قرارداد:</span>
                            <ul class="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
                                <?php foreach ($audit_result['risks'] as $risk): ?>
                                    <li><?php echo esc_html($risk); ?></li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </section>

    </div>
</main>

<?php
get_footer();
