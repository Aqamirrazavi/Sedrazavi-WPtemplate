<?php
/**
 * Template Name: پرتال سازمانی و سهامداران (Corporate Executive Dashboard)
 *
 * @package SedRazavi_Child_Corporate
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="sr-corporate-portal-page min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100" dir="rtl">
    <div class="max-w-6xl mx-auto space-y-8">
        
        <div class="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-wrap items-center justify-between gap-6 backdrop-blur-xl">
            <div class="space-y-2">
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                    سامانه حاکمیت شرکتی و روابط عمومی
                </span>
                <h1 class="text-2xl sm:text-3xl font-extrabold text-white">
                    میز گزارش‌های راهبردی و مناقصات
                </h1>
                <p class="text-xs text-slate-400">
                    دسترسی به صورت‌های مالی حسابرسی‌شده، گزارش پایداری ESG، و استعلام تضامین
                </p>
            </div>
            
            <a href="<?php echo esc_url(home_url('/#contact')); ?>" class="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-lg shadow-sky-500/20 transition-all">
                درخواست جلسه هیئت مدیره ←
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span class="text-xs text-slate-400">مناقصات و مزایدات فعال</span>
                <p class="text-3xl font-mono font-bold text-sky-400">۰۴</p>
                <span class="text-[11px] text-slate-500">پروژه‌های زیرساختی و توسعه‌ای</span>
            </div>
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span class="text-xs text-slate-400">شاخص انطباق حاکمیتی</span>
                <p class="text-2xl font-bold text-emerald-400">رتبه A+ ممتاز</p>
                <span class="text-[11px] text-slate-500">تأییدیه حسابرس رسمی معتمد</span>
            </div>
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span class="text-xs text-slate-400">شعب بین‌المللی فعال</span>
                <p class="text-3xl font-mono font-bold text-blue-400">۰۵</p>
                <span class="text-[11px] text-slate-500">تهران، دبی، استانبول، دوحه، مسقط</span>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
