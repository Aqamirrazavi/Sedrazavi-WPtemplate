<?php
/**
 * برگه اصلی پوسته وردپرس SedRazavi Law Firm
 *
 * مجهز به محتوای کامل اولیه رندرشده توسط سرور (Server-Side Rendered Fallback Content)
 * جهت کسب امتیاز ۱۰۰ سئو، خوانده شدن کامل توسط خزنده‌های گوگل/بینگ و شبکه‌های اجتماعی در زمان Ctrl+U،
 * همراه با کانتینرهای اختصاصی هیدراتاسیون ری‌اکت (#root و کانتینرهای ماژولار).
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main">
    <!-- کانتینر اصلی اپلیکیشن فرانت‌اند React -->
    <div id="root">
        <!-- ۱. اسکلت و محتوای غنی سئو اولیه سمت سرور (SSR Content & Preloader) -->
        <div class="sedrazavi-ssr-shell bg-[#070D1E] text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-7xl mx-auto space-y-12">
                
                <!-- بخش هیرو معرفی دفتر وکالت و شعار عدالت -->
                <header class="text-center space-y-6 max-w-4xl mx-auto py-10">
                    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#F3E5AB] text-xs font-bold">
                        <span>⚖️</span>
                        <span>دفتر وکالت تخصصی و مرکز داوری بین‌المللی سیده مریم رضوی</span>
                    </div>
                    <h1 class="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight leading-tight">
                        دفاع مقتدرانه، راهبردهای حقوقی نوین و داوری تخصصی تجاری
                    </h1>
                    <p class="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mx-auto">
                        ارائه خدمات وکالت تخصصی در دعاوی ملکی، ثبتی، شرکت‌های تجاری، قراردادهای بین‌المللی و داوری اتاق بازرگانی با تکیه بر دانش حقوقی دانشگاهی و سال‌ها تجربه موفق در محاکم دادگستری.
                    </p>
                    <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <a href="tel:02188776655" class="px-6 py-3 rounded-xl bg-[#D4AF37] text-[#070D1E] font-bold text-sm shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 transition-all">
                            تماس مستقیم با دفتر ونک (۰۲۱-۸۸۷۷۶۶۵۵)
                        </a>
                        <a href="#consultation-booking" class="px-6 py-3 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm hover:bg-slate-700 transition-all">
                            درخواست مشاوره حضوری و آنلاین
                        </a>
                    </div>
                </header>

                <!-- بخش شاخص‌های آماری و اعتماد -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-slate-800">
                    <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
                        <div class="text-2xl sm:text-3xl font-black text-[#D4AF37] font-serif">۱۵+</div>
                        <div class="text-xs text-slate-400">سال سابقه وکالت تخصصی</div>
                    </div>
                    <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
                        <div class="text-2xl sm:text-3xl font-black text-[#D4AF37] font-serif">۹۸٪</div>
                        <div class="text-xs text-slate-400">موفقیت در پرونده‌های موکلین</div>
                    </div>
                    <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
                        <div class="text-2xl sm:text-3xl font-black text-[#D4AF37] font-serif">۲,۴۰۰+</div>
                        <div class="text-xs text-slate-400">مشاوره تخصصی حقوقی و قراردادی</div>
                    </div>
                    <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
                        <div class="text-2xl sm:text-3xl font-black text-[#D4AF37] font-serif">۱۰۰٪</div>
                        <div class="text-xs text-slate-400">محرمانگی و انطباق با منشور وکالت</div>
                    </div>
                </div>

                <!-- بخش شبکه‌ای خدمات تخصصی وکالت -->
                <section class="space-y-6">
                    <div class="text-center space-y-2">
                        <h2 class="text-2xl font-bold font-serif text-[#D4AF37]">حوزه‌های تخصصی وکالت و داوری</h2>
                        <p class="text-xs text-slate-400">پوشش جامع دعاوی در مراجع قضایی، دیوان عالی کشور و داوری‌های بین‌المللی</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                            <span class="text-2xl">🏢</span>
                            <h3 class="text-lg font-bold text-white">دعاوی ملکی، سرقفلی و اراضی</h3>
                            <p class="text-xs text-slate-300 leading-relaxed">
                                خلع ید، الزام به تنظیم سند رسمی، قراردادهای مشارکت در ساخت، ابطال آرا ماده ۱۰۰ شهرداری و حق کسب و پیشه.
                            </p>
                        </div>
                        <div class="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                            <span class="text-2xl">💼</span>
                            <h3 class="text-lg font-bold text-white">امور شرکت‌ها و قراردادهای تجاری</h3>
                            <p class="text-xs text-slate-300 leading-relaxed">
                                تنظیم قراردادهای چندجانبه شرکتی، انحلال و تصفیه، نظارت بر صورتجلسات مجامع و دفاع در دعاوی مدیران و سهامداران.
                            </p>
                        </div>
                        <div class="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                            <span class="text-2xl">⚖️</span>
                            <h3 class="text-lg font-bold text-white">داوری بازرگانی بین‌المللی</h3>
                            <p class="text-xs text-slate-300 leading-relaxed">
                                حل و فصل اختلافات فرامرزی تحت کنوانسیون ۱۹۵۸ نیویورک، قواعد اینکوترمز ۲۰۲۰ و قواعد داوری اتاق بازرگانی ICC.
                            </p>
                        </div>
                    </div>
                </section>

                <!-- مشخصات و اطلاعات تماس رسمی دفتر وکالت ونک -->
                <footer class="p-8 rounded-3xl bg-slate-900/90 border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div class="space-y-2 text-right">
                        <div class="text-base font-bold text-[#F3E5AB]">دفتر وکالت دکتر سیده مریم رضوی و همکاران</div>
                        <p class="text-xs text-slate-300">
                            نشانی دفتر: تهران، میدان ونک، خیابان ونک، پلاک ۲۸، طبقه ۴ | شماره پروانه وکالت: ۱۸۴۵۲ / ک.و.م
                        </p>
                    </div>
                    <div class="flex items-center gap-3">
                        <a href="tel:02188776655" class="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-slate-900 text-xs font-bold hover:brightness-105 transition-all">
                            تماس: ۰۲۱-۸۸۷۷۶۶۵۵
                        </a>
                        <span class="text-xs text-slate-400">سامانه استعلام پرونده: برخط ۲۴/۷</span>
                    </div>
                </footer>

                <!-- حلقه پست‌های سئو وردپرس در صورت وجود محتوای وبلاگ یا المنتور -->
                <?php if (have_posts()) : ?>
                    <div class="sr-only">
                        <?php while (have_posts()) : the_post(); ?>
                            <article id="post-<?php the_ID(); ?>">
                                <h2><?php the_title(); ?></h2>
                                <div><?php the_content(); ?></div>
                            </article>
                        <?php endwhile; ?>
                    </div>
                <?php endif; ?>

            </div>
        </div>

        <!-- پیام استاندارد برای مرورگرهای با جاوااسکریپت غیرفعال -->
        <noscript>
            <div class="p-6 bg-amber-900/40 text-amber-200 border-t border-amber-600 text-center text-xs">
                توجه: برای بهره‌مندی از امکانات محاسبه‌گرهای حقوقی، استعلام لحظه‌ای پرونده و رزرو تعاملی وقت، جاوااسکریپت مرورگر خود را فعال فرمایید.
            </div>
        </noscript>
    </div>
</main>

<?php
get_footer();
