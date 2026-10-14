<?php
/**
 * Template Name: نمونه‌کارها و پروژه‌های وب‌سایت (Web Portfolio & Case Studies)
 * Description: Dedicated Gutenberg & Web Designer Portfolio showcase with Lighthouse metrics and live previews.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-portfolio-page py-10 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-right font-persian" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">

        <!-- Portfolio Hero Header -->
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#31104B] border border-indigo-500/30 p-6 sm:p-10 text-white shadow-2xl">
            <div class="space-y-4 max-w-3xl">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                    <span>💻 ویترین پروژه‌ها و کیس‌استادی‌های تخصصی</span>
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span class="text-emerald-400 font-mono text-[11px]">گوتنبرگ بومی ۱۰۰٪</span>
                </div>

                <h1 class="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight leading-snug">
                    پروژه‌های طراحی سایت وردپرس با بالاترین امتیاز سرعت و سئو
                </h1>

                <p class="text-xs sm:text-sm text-indigo-200 leading-relaxed">
                    هر پروژه با معماری مدرن بر مبنای ویرایشگر بلوک گوتنبرگ، بهینه‌سازی کدهای PHP و CSS بدون سربار، و سازگاری کامل با استانداردهای گوگل لایت‌هاوس مهندسی شده است.
                </p>

                <!-- Metric Highlights -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-center">
                    <div class="p-3 rounded-2xl bg-white/5 border border-white/10">
                        <div class="text-xl sm:text-2xl font-bold font-mono text-emerald-400">۱۰۰٪</div>
                        <div class="text-[11px] text-gray-300">امتیاز سرعت لایت‌هاوس</div>
                    </div>
                    <div class="p-3 rounded-2xl bg-white/5 border border-white/10">
                        <div class="text-xl sm:text-2xl font-bold font-mono text-indigo-400">۰.۵ ثانیه</div>
                        <div class="text-[11px] text-gray-300">میانگین زمان لود اولیه</div>
                    </div>
                    <div class="p-3 rounded-2xl bg-white/5 border border-white/10">
                        <div class="text-xl sm:text-2xl font-bold font-mono text-[#D4AF37]">۴۵+</div>
                        <div class="text-[11px] text-gray-300">پروژه موفق تحویل‌شده</div>
                    </div>
                    <div class="p-3 rounded-2xl bg-white/5 border border-white/10">
                        <div class="text-xl sm:text-2xl font-bold font-mono text-pink-400">۰٪ خطای WSOD</div>
                        <div class="text-[11px] text-gray-300">تضمین پایداری کامل</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Case Studies Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- Project 1 -->
            <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-xl space-y-5 hover:border-indigo-500/40 transition-all flex flex-col justify-between">
                <div class="space-y-4">
                    <div class="aspect-video rounded-2xl bg-gradient-to-tr from-indigo-950 via-slate-900 to-indigo-900 border border-white/10 flex items-center justify-center text-4xl shadow-inner relative overflow-hidden">
                        <span>🏛️</span>
                        <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            امتیاز لایت‌هاوس ۱۰۰
                        </span>
                    </div>

                    <div class="space-y-1">
                        <span class="text-xs font-bold text-indigo-400">پلتفرم حقوقی و داوری بین‌الملل</span>
                        <h3 class="text-lg font-bold font-serif text-gray-900 dark:text-white">
                            سامانه جامع وکالت دکتر سیده مریم رضوی
                        </h3>
                        <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                            طراحی قالب اختصاصی وردپرس با هسته کاملاً مستقل، سازگار با المنتور و شورت‌کدهای نیتیو، دارای پورتال هوشمند موکلین و محاسبه‌گر تعرفه‌های دادگستری.
                        </p>
                    </div>

                    <!-- Tech Stack Badges -->
                    <div class="flex items-center flex-wrap gap-1.5 text-[10px]">
                        <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">WordPress 6.7</span>
                        <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">Gutenberg Native</span>
                        <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">PHP 8.3 Strict</span>
                        <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">Tailwind CSS</span>
                    </div>
                </div>

                <div class="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span class="text-xs text-emerald-500 font-bold">✓ تحویل شده و لایو</span>
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="sedrazavi-btn-pill px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors">
                        مشاهده زنده پروژه ←
                    </a>
                </div>
            </div>

            <!-- Project 2 -->
            <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-xl space-y-5 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
                <div class="space-y-4">
                    <div class="aspect-video rounded-2xl bg-gradient-to-tr from-emerald-950 via-slate-900 to-emerald-900 border border-white/10 flex items-center justify-center text-4xl shadow-inner relative overflow-hidden">
                        <span>🛍️</span>
                        <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            امتیاز لایت‌هاوس ۹۹
                        </span>
                    </div>

                    <div class="space-y-1">
                        <span class="text-xs font-bold text-emerald-400">فروشگاه آنلاین ووکامرس پرسرعت</span>
                        <h3 class="text-lg font-bold font-serif text-gray-900 dark:text-white">
                            فروشگاه منعطف ووکامرس با ادغام وودمارت
                        </h3>
                        <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                            پیاده‌سازی مینی‌کارت کشویی بلادرنگ، فیلترهای AJAX بدون رفرش، تسویه‌حساب اختصاصی تک‌مرحله‌ای با درگاه‌های شتاب و سامانه مودیان مالیاتی.
                        </p>
                    </div>

                    <!-- Tech Stack Badges -->
                    <div class="flex items-center flex-wrap gap-1.5 text-[10px]">
                        <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">WooCommerce</span>
                        <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">WoodMart Bridge</span>
                        <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">AJAX Cart</span>
                        <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">Incoterms</span>
                    </div>
                </div>

                <div class="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span class="text-xs text-emerald-500 font-bold">✓ تحویل شده و لایو</span>
                    <a href="<?php echo esc_url(home_url('/store/')); ?>" class="sedrazavi-btn-pill px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors">
                        مشاهده فروشگاه ←
                    </a>
                </div>
            </div>

        </div>

        <!-- Project Brief CTA -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-indigo-900/40 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
            <div class="space-y-1">
                <h3 class="text-lg font-bold text-white">پروژه‌ای برای اجرا دارید؟</h3>
                <p class="text-xs text-indigo-200">
                    با ارسال بریف چندمرحله‌ای آنلاین، زمان‌بندی و برآورد هزینه دقیق پروژه خود را در کمتر از ۲۴ ساعت دریافت فرمایید.
                </p>
            </div>
            <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="sedrazavi-btn-pill px-6 py-3 rounded-2xl bg-white hover:bg-[#D4AF37] text-black font-bold text-xs sm:text-sm transition-all shadow-xl shrink-0">
                ارسال بریف و مشاوره پروژه ←
            </a>
        </div>

    </div>
</div>

<?php get_footer(); ?>
