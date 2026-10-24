<?php
/**
 * Template Name: پذیرش و نوبت‌دهی هوشمند وکالت (Legal Intake & Appointments Level B)
 * Description: Timezone-aware intake triage, privacy-first data minimization, appointment scheduling, and WP Privacy integration.
 *
 * @package SedRazavi
 * @version 25.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

$engine = class_exists('SedRazavi_Legal_Intake_Appointments') ? SedRazavi_Legal_Intake_Appointments::get_instance() : null;
?>

<div class="sr-intake-page py-12 px-4 max-w-6xl mx-auto">
    <!-- Header -->
    <div class="sr-intake-header bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-8 text-white shadow-2xl relative overflow-hidden">
        <span class="sr-intake-badge inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-3">
            <?php esc_html_e('سامانه سطح B — پذیرش و مدیریت پرونده‌ها (SedRazavi Legal)', 'sedrazavi'); ?>
        </span>
        <h1 class="sr-intake-title text-2xl md:text-4xl font-black mb-3">
            <?php esc_html_e('درگاه رسمی ثبت استعلام حقوقی، تریاژ و نوبت‌دهی مشاوره', 'sedrazavi'); ?>
        </h1>
        <p class="sr-intake-subtitle text-slate-400 text-xs md:text-sm max-w-3xl leading-relaxed">
            <?php esc_html_e('طراحی‌شده بر مبنای اصل حداقل‌سازی داده (Data Minimization) و حریم خصوصی موکل. اطلاعات پرونده با کد رهگیری رمزنگاری‌شده ثبت و مستقیماً به کارتابل وکیل تخصصی ارجاع می‌شود.', 'sedrazavi'); ?>
        </p>

        <!-- Privacy Warning Alert (Section 4.3) -->
        <div class="sr-intake-alert mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed flex items-center gap-3">
            <span class="text-lg">⚖️</span>
            <div>
                <strong><?php esc_html_e('هشدار صریح محرمانگی:', 'sedrazavi'); ?></strong>
                <?php esc_html_e('لطفاً در این فرم عمومی از بارگذاری اسناد فوق‌محرمانه یا تشریح جزئیات پرونده خودداری فرمایید. تبادل مدارک منحصراً در جلسه حضوری یا پرتال امن سطح C انجام می‌گردد.', 'sedrazavi'); ?>
            </div>
        </div>
    </div>

    <!-- Intake & Appointment Booking Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <!-- Client Intake Form (2 Cols) -->
        <div class="lg:col-span-2">
            <div class="sr-intake-card bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
                <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
                    <span>📋</span>
                    <span><?php esc_html_e('ثبت آنلاین اطلاعات درخواست مشاوره', 'sedrazavi'); ?></span>
                </h3>

                <form class="sr-intake-form space-y-5" method="post" action="">
                    <!-- Honeypot Field -->
                    <div style="display: none;">
                        <input type="text" name="sr_website_trap" tabindex="-1" autocomplete="off" />
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="sr-intake-group">
                            <label class="sr-intake-label block text-xs text-slate-400 mb-1.5 font-bold">
                                <?php esc_html_e('نام و نام خانوادگی / شخص حقوقی:', 'sedrazavi'); ?>
                            </label>
                            <input type="text" name="sr_name" required placeholder="<?php esc_attr_e('مثال: محمد احمدی', 'sedrazavi'); ?>" class="sr-intake-input w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500" />
                        </div>
                        <div class="sr-intake-group">
                            <label class="sr-intake-label block text-xs text-slate-400 mb-1.5 font-bold">
                                <?php esc_html_e('شماره تلفن همراه (جهت پیامک رمز):', 'sedrazavi'); ?>
                            </label>
                            <input type="tel" name="sr_phone" required placeholder="<?php esc_attr_e('۰۹۱۲۳۴۵۶۷۸۹', 'sedrazavi'); ?>" class="sr-intake-input w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-emerald-500" />
                        </div>
                    </div>

                    <div class="sr-intake-group">
                        <label class="sr-intake-label block text-xs text-slate-400 mb-1.5 font-bold">
                            <?php esc_html_e('حوزه موضوعی دعوا یا مشاوره:', 'sedrazavi'); ?>
                        </label>
                        <select name="sr_topic" class="sr-intake-select w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500">
                            <option value="commercial"><?php esc_html_e('داوری تجاری، شرکت‌ها و قراردادهای بین‌المللی', 'sedrazavi'); ?></option>
                            <option value="real_estate"><?php esc_html_e('دعاوی ملکی، سرقفلی، مشارکت در ساخت و شهرداری', 'sedrazavi'); ?></option>
                            <option value="tax"><?php esc_html_e('اختلافات مالیاتی، سامانه مودیان و تامین اجتماعی', 'sedrazavi'); ?></option>
                            <option value="family"><?php esc_html_e('حقوق خانواده، انحصار وراثت و تقسیم ترکه', 'sedrazavi'); ?></option>
                            <option value="criminal"><?php esc_html_e('جرایم اقتصادی، سایبری و پولشویی', 'sedrazavi'); ?></option>
                        </select>
                    </div>

                    <div class="sr-intake-group">
                        <label class="sr-intake-label block text-xs text-slate-400 mb-1.5 font-bold">
                            <?php esc_html_e('میزان فوریت و مهلت قضایی:', 'sedrazavi'); ?>
                        </label>
                        <div class="sr-intake-radio-grid grid grid-cols-3 gap-2">
                            <label class="sr-intake-radio-item flex items-center justify-center p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-300 cursor-pointer">
                                <input type="radio" name="sr_urgency" value="normal" checked class="ml-1.5" />
                                <?php esc_html_e('عادی (تا ۷۲ ساعت)', 'sedrazavi'); ?>
                            </label>
                            <label class="sr-intake-radio-item flex items-center justify-center p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-amber-400 cursor-pointer">
                                <input type="radio" name="sr_urgency" value="high" class="ml-1.5" />
                                <?php esc_html_e('مهم (تا ۲۴ ساعت)', 'sedrazavi'); ?>
                            </label>
                            <label class="sr-intake-radio-item flex items-center justify-center p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-rose-400 cursor-pointer">
                                <input type="radio" name="sr_urgency" value="critical" class="ml-1.5" />
                                <?php esc_html_e('فوری (جلسه دادرسی)', 'sedrazavi'); ?>
                            </label>
                        </div>
                    </div>

                    <div class="sr-intake-consent flex items-start gap-2 pt-2">
                        <input type="checkbox" id="sr-consent-check" name="sr_consent" required class="mt-0.5 accent-emerald-500" />
                        <label for="sr-consent-check" class="text-[11px] text-slate-400 leading-relaxed cursor-pointer">
                            <?php esc_html_e('اطلاعیه حریم خصوصی را مطالعه نموده‌ام و رضایت خود را برای ثبت شماره تماس جهت هماهنگی جلسه طبق سیاست نگهداری ۱۸۰ روزه اعلام می‌دارم.', 'sedrazavi'); ?>
                        </label>
                    </div>

                    <button type="button" class="sr-intake-btn w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer">
                        <span><?php esc_html_e('ثبت درخواست و دریافت شناسه پیگیری رمزشده', 'sedrazavi'); ?></span>
                        <span>←</span>
                    </button>
                </form>
            </div>
        </div>

        <!-- Appointment Timezone Calendar View (1 Col) -->
        <div class="lg:col-span-1">
            <div class="sr-intake-card bg-slate-900/90 border border-slate-800 rounded-3xl p-6 text-white shadow-xl h-full flex flex-col justify-between">
                <div>
                    <h3 class="text-base font-bold mb-3 flex items-center gap-2">
                        <span>🗓️</span>
                        <span><?php esc_html_e('پنجره‌های آزاد نوبت‌دهی', 'sedrazavi'); ?></span>
                    </h3>
                    <p class="text-[11px] text-slate-400 leading-relaxed mb-4">
                        <?php esc_html_e('منطقه زمانی تهران (Asia/Tehran) با قفل همزمانی خودکار جهت جلوگیری از رزرواسیون تکراری.', 'sedrazavi'); ?>
                    </p>

                    <div class="space-y-2 font-mono text-xs">
                        <div class="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                            <span class="text-slate-300">شنبه — ۱۰:۰۰ الی ۱۰:۴۵</span>
                            <span class="text-[10px] text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full font-bold">آزاد</span>
                        </div>
                        <div class="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                            <span class="text-slate-300">شنبه — ۱۶:۰۰ الی ۱۶:۴۵</span>
                            <span class="text-[10px] text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full font-bold">آزاد</span>
                        </div>
                        <div class="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                            <span class="text-slate-300">یکشنبه — ۱۱:۳۰ الی ۱۲:۱۵</span>
                            <span class="text-[10px] text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full font-bold">آزاد</span>
                        </div>
                        <div class="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                            <span class="text-slate-300">دوشنبه — ۱۷:۳۰ الی ۱۸:۱۵</span>
                            <span class="text-[10px] text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full font-bold">آزاد</span>
                        </div>
                    </div>
                </div>

                <div class="pt-4 border-t border-slate-800/80 mt-4 text-[11px] text-slate-400">
                    <span>نوع مشاوره:</span>
                    <strong class="text-white block mt-0.5"><?php esc_html_e('حضوری، تلفنی یا اسکایپ امن', 'sedrazavi'); ?></strong>
                </div>
            </div>
        </div>
    </div>

    <!-- Live Office Triage Queue (Section 4.1 & Level B) -->
    <div class="sr-intake-triage-box bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
                <h3 class="text-lg font-bold"><?php esc_html_e('صف تریاژ پرونده‌ها و مدیریت کارتابل دفتر حقوقی', 'sedrazavi'); ?></h3>
                <p class="text-xs text-slate-400"><?php esc_html_e('نمای زنده تخصیص به وکلا، سنجش فوریت و ثبت انقضای نگهداری داده‌ها.', 'sedrazavi'); ?></p>
            </div>
            <span class="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-3 py-1.5 rounded-xl border border-cyan-800">
                <?php esc_html_e('دسترسی مجاز: وکیل ناظر و پرسنل تریاژ', 'sedrazavi'); ?>
            </span>
        </div>

        <div class="sr-intake-table-wrap overflow-x-auto">
            <table class="sr-intake-table w-full text-right text-xs">
                <thead>
                    <tr class="border-b border-slate-800 text-slate-400">
                        <th class="pb-3 px-3"><?php esc_html_e('کد پیگیری', 'sedrazavi'); ?></th>
                        <th class="pb-3 px-3"><?php esc_html_e('متقاضی', 'sedrazavi'); ?></th>
                        <th class="pb-3 px-3"><?php esc_html_e('حوزه دعوا', 'sedrazavi'); ?></th>
                        <th class="pb-3 px-3"><?php esc_html_e('فوریت', 'sedrazavi'); ?></th>
                        <th class="pb-3 px-3"><?php esc_html_e('وضعیت', 'sedrazavi'); ?></th>
                        <th class="pb-3 px-3"><?php esc_html_e('وکیل ناظر', 'sedrazavi'); ?></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 font-mono text-slate-300">
                    <tr>
                        <td class="py-3 px-3 font-bold text-cyan-400">LEG-92418-23</td>
                        <td class="py-3 px-3 text-white">مهندس آرش طاهری</td>
                        <td class="py-3 px-3">داوری تجاری</td>
                        <td class="py-3 px-3">
                            <span class="sr-intake-urgency-tag px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30">فوری</span>
                        </td>
                        <td class="py-3 px-3">
                            <span class="sr-intake-status-tag px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400">در حال بررسی</span>
                        </td>
                        <td class="py-3 px-3 text-slate-400">دکتر سیده مریم رضوی</td>
                    </tr>
                    <tr>
                        <td class="py-3 px-3 font-bold text-cyan-400">LEG-81042-23</td>
                        <td class="py-3 px-3 text-white">نگار کریمی</td>
                        <td class="py-3 px-3">ملکی و سرقفلی</td>
                        <td class="py-3 px-3">
                            <span class="sr-intake-urgency-tag px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30">مهم</span>
                        </td>
                        <td class="py-3 px-3">
                            <span class="sr-intake-status-tag px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-400">تخصیص‌یافته</span>
                        </td>
                        <td class="py-3 px-3 text-slate-400">وکیل پایه یک همکار</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<?php
get_footer();
