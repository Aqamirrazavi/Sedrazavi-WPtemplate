<?php
/**
 * Template Name: میز محاسبات قضایی (Judicial Calculators)
 * Description: Interactive legal calculators suite based on official judiciary tariffs
 *
 * @package SedRazavi
 * @version 6.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();

// Server-side calculation fallback
$calc_claim = isset($_POST['claim_amount']) ? abs((float)sanitize_text_field($_POST['claim_amount'])) : 0;
$calc_stage = sanitize_text_field($_POST['claim_stage'] ?? 'first_instance');
$calc_result = null;

if ($calc_claim > 0) {
    // 1403/1404 Judiciary Tariffs
    // First instance: Up to 200,000,000 IRR = 2.5%, beyond = 3.5%
    // Appeal: 4.5%
    // Supreme Court / Cassation: 5.5%
    // Enforcement: 5% of adjudicated amount
    $fee = 0;
    if ($calc_stage === 'first_instance') {
        if ($calc_claim <= 200000000) {
            $fee = $calc_claim * 0.025;
        } else {
            $fee = (200000000 * 0.025) + (($calc_claim - 200000000) * 0.035);
        }
    } elseif ($calc_stage === 'appeal') {
        $fee = $calc_claim * 0.045;
    } elseif ($calc_stage === 'supreme') {
        $fee = $calc_claim * 0.055;
    } elseif ($calc_stage === 'enforcement') {
        $fee = $calc_claim * 0.05;
    }

    $stamp_tax = $fee * 0.05; // 5% attorney tax stamp
    $calc_result = [
        'claim' => $calc_claim,
        'fee' => round($fee),
        'stamp_tax' => round($stamp_tax),
        'total' => round($fee + $stamp_tax),
        'stage_label' => ($calc_stage === 'first_instance' ? 'مرحله بدوی' : ($calc_stage === 'appeal' ? 'مرحله تجدیدنظر' : ($calc_stage === 'supreme' ? 'فرجام‌خواهی دیوان عالی' : 'نیم‌عشر اجرایی'))),
    ];
}
?>

<main class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-sans">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
        
        <!-- Page Header -->
        <div class="text-center max-w-3xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                ⚖️ سامانه رسمی محاسبات دادگستری و تعرفه‌های قانونی
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-[#0B132B] dark:text-white">
                میز محاسبات قانونی، تمبر دادرسی و هزینه دادرسی
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                محاسبه برخط و دقیق هزینه دادرسی دعاوی مالی، تمبر مالیاتی وکیل، نیم‌عشر اجرایی، خسارت تاخیر تادیه و دیه بر مبنای تعرفه رسمی قوه قضائیه
            </p>
        </div>

        <!-- Render Mount Point for React Suite -->
        <div id="sedrazavi-court-calculator-mount" class="space-y-6">
            <?php echo do_shortcode('[sedrazavi_legal_finance]'); ?>
        </div>

        <!-- Pure PHP / SSR Fallback Calculator -->
        <section class="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#0B132B]/80 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 class="text-xl font-bold text-[#0B132B] dark:text-white flex items-center gap-3">
                    <span class="w-3 h-3 rounded-full bg-[#D4AF37]"></span>
                    محاسبه‌گر سریع سمت سرور (Native PHP Tariff Engine)
                </h2>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    مبلغ خواسته را به ریال وارد کنید تا هزینه‌های دادرسی و تمبر وکالت بلافاصله محاسبه گردد:
                </p>
            </div>

            <form method="POST" action="" class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div class="md:col-span-2">
                    <label for="claim_amount" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        بهای خواسته مالی (ریال):
                    </label>
                    <input type="number" id="claim_amount" name="claim_amount" value="<?php echo esc_attr($calc_claim ?: ''); ?>" required class="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none" placeholder="مثال: ۱۰۰۰۰۰۰۰۰۰ (یک میلیارد ریال)">
                </div>

                <div>
                    <label for="claim_stage" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        مرحله رسیدگی قضایی:
                    </label>
                    <select id="claim_stage" name="claim_stage" class="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none">
                        <option value="first_instance" <?php selected($calc_stage, 'first_instance'); ?>>دادگاه بدوی (۲.۵ تا ۳.۵ درصد)</option>
                        <option value="appeal" <?php selected($calc_stage, 'appeal'); ?>>تجدیدنظرخواهی (۴.۵ درصد)</option>
                        <option value="supreme" <?php selected($calc_stage, 'supreme'); ?>>دیوان عالی کشور (۵.۵ درصد)</option>
                        <option value="enforcement" <?php selected($calc_stage, 'enforcement'); ?>>اجرای احکام / نیم‌عشر (۵ درصد)</option>
                    </select>
                </div>

                <div class="md:col-span-3 flex justify-end">
                    <button type="submit" class="px-8 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B132B] font-bold text-xs shadow-lg hover:brightness-110 transition flex items-center gap-2">
                        <span>محاسبه تعرفه رسمی</span>
                    </button>
                </div>
            </form>

            <?php if ($calc_result): ?>
                <div class="mt-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-[#D4AF37]/50 space-y-4">
                    <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                        <span class="text-sm font-bold text-[#0B132B] dark:text-white">جدول نتایج برآورد مالیاتی و دادرسی:</span>
                        <span class="text-xs px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] font-bold">
                            <?php echo esc_html($calc_result['stage_label']); ?>
                        </span>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div class="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span class="text-slate-400 block mb-1">هزینه دادرسی صندوق دادگستری:</span>
                            <span class="text-base font-bold text-slate-800 dark:text-slate-100 font-mono">
                                <?php echo number_format($calc_result['fee']); ?> ریال
                            </span>
                        </div>
                        <div class="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span class="text-slate-400 block mb-1">تمبر مالیاتی کانون وکلا:</span>
                            <span class="text-base font-bold text-[#D4AF37] font-mono">
                                <?php echo number_format($calc_result['stamp_tax']); ?> ریال
                            </span>
                        </div>
                        <div class="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span class="text-slate-400 block mb-1">مجموع هزینه‌های قانونی:</span>
                            <span class="text-base font-bold text-emerald-500 font-mono">
                                <?php echo number_format($calc_result['total']); ?> ریال
                            </span>
                        </div>
                    </div>
                </div>
            <?php endif; ?>
        </section>

    </div>
</main>

<?php
get_footer();
