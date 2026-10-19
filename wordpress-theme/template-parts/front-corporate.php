<?php
/**
 * Template part for Corporate Pro Niche Front-Page
 *
 * @package SedRazavi
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
<div class="sr-corporate-frontpage space-y-20 py-8" dir="rtl">

    <!-- ۱. هیرو شرکتی اجرایی و هلدینگ (Executive Corporate Hero) -->
    <section class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative rounded-3xl p-8 sm:p-14 overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950/40 shadow-2xl">
            <!-- Background glow -->
            <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-sky-500/15 blur-3xl pointer-events-none"></div>
            <div class="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-500/15 blur-3xl pointer-events-none"></div>

            <div class="relative z-10 max-w-3xl space-y-6">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold">
                    <span class="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                    <span>هلدینگ توسعه کسب‌وکار و سرمایه‌گذاری بین‌المللی</span>
                </div>

                <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                    هدایت هوشمند سازمان، توسعه پایدار و <span class="bg-gradient-to-r from-sky-400 to-blue-300 bg-clip-text text-transparent">حکمرانی شفاف</span>
                </h1>

                <p class="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                    ارائه راهکارهای جامع مدیریتی، بازرگانی بین‌المللی، مشاوره استراتژیک و مدیریت زنجیره تامین بر پایه استانداردهای جهانی ESG و تحول دیجیتال.
                </p>

                <div class="flex flex-wrap items-center gap-4 pt-4">
                    <a href="#solutions" class="px-6 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-xl shadow-sky-600/25 transition-all flex items-center gap-2">
                        <span>معرفی خدمات و راهکارهای هلدینگ</span>
                        <span>←</span>
                    </a>
                    <a href="#corporate-inquiry" class="px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all">
                        درخواست جلسه و مذاکره سازمانی
                    </a>
                </div>

                <!-- Stats Metric Strip -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80 text-right">
                    <div>
                        <div class="text-2xl font-bold font-mono text-white">۲۴۰+</div>
                        <div class="text-xs text-slate-400 mt-0.5">پروژه تکمیل‌شده صنعتی</div>
                    </div>
                    <div>
                        <div class="text-2xl font-bold font-mono text-sky-400">۱۸</div>
                        <div class="text-xs text-slate-400 mt-0.5">شعبه و دفتر بین‌الملل</div>
                    </div>
                    <div>
                        <div class="text-2xl font-bold font-mono text-blue-400">۹۸.۵٪</div>
                        <div class="text-xs text-slate-400 mt-0.5">نرخ رضایت ذی‌نفعان</div>
                    </div>
                    <div>
                        <div class="text-2xl font-bold font-mono text-emerald-400">ISO 9001</div>
                        <div class="text-xs text-slate-400 mt-0.5">استاندارد تضمین کیفیت</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ۲. ماتریس راهکارها و خدمات سازمانی (Corporate Solutions Matrix) -->
    <section class="container mx-auto px-4 sm:px-6 lg:px-8" id="solutions">
        <div class="text-center max-w-2xl mx-auto mb-12">
            <span class="text-xs font-bold text-sky-400 uppercase tracking-widest">خدمات و زنجیره ارزش هلدینگ</span>
            <h2 class="text-2xl sm:text-3xl font-black text-white mt-2">راهکارهای یکپارچه برای تحول و رهبری بازار</h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-2">تلفیق دانش روز، تحلیل داده و تیم متخصص برای ارتقای بهره‌وری سازمان‌های پیشرو.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition-all space-y-3">
                <div class="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-xl">🏛️</div>
                <h3 class="text-lg font-bold text-white">مشاوره استراتژیک و توسعه کسب‌وکار</h3>
                <p class="text-xs text-slate-300 leading-relaxed">طراحی مدل‌های تجاری نوین، تحلیل ریسک بازار، ادغام و تملیک (M&A) و تدوین استراتژی‌های رشد پایدار.</p>
            </div>

            <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition-all space-y-3">
                <div class="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xl">🌐</div>
                <h3 class="text-lg font-bold text-white">صادرات، واردات و تجارت بین‌الملل</h3>
                <p class="text-xs text-slate-300 leading-relaxed">مدیریت لجستیک فرامرزی، ترخیص گمرکی، امور اسناد اعتباری (LC) و گشایش بازارهای جدید صادراتی.</p>
            </div>

            <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition-all space-y-3">
                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xl">📊</div>
                <h3 class="text-lg font-bold text-white">حکمرانی هوشمند و مدیریت زنجیره تامین</h3>
                <p class="text-xs text-slate-300 leading-relaxed">استقرار سامانه‌های ERP یکپارچه، اتوماسیون فرایندها، کاهش هزینه‌های عملیاتی و مدیریت کیفیت فراگیر.</p>
            </div>
        </div>
    </section>

    <!-- ۳. فرم درخواست همکاری سازمانی و مذاکره (Corporate Enquiry CTA) -->
    <section class="container mx-auto px-4 sm:px-6 lg:px-8" id="corporate-inquiry">
        <div class="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
            <div class="space-y-3 max-w-xl">
                <span class="text-xs font-bold text-sky-400">ارتباط مستقیم با دبیرخانه و امور سهامداران</span>
                <h3 class="text-2xl font-bold text-white">آماده گفت‌وگو پیرامون توسعه فرصت‌های مشترک هستید؟</h3>
                <p class="text-xs text-slate-300 leading-relaxed">کارشناسان توسعه تجارت ما ظرف حداکثر ۲۴ ساعت کاری با شما تماس گرفته و پرونده همکاری را تنظیم خواهند کرد.</p>
            </div>
            <a href="#contact" class="px-8 py-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-xl shadow-sky-600/30 transition-all shrink-0">
                ارسال فرم استعلام رسمی ←
            </a>
        </div>
    </section>

</div>
