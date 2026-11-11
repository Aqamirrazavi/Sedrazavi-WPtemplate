<?php
/**
 * Template Name: پرتال مراجعین و نوبت‌دهی کلینیک (Clinic Patient Portal)
 *
 * @package SedRazavi_Child_Clinic
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="sr-clinic-portal-page min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100" dir="rtl">
    <div class="max-w-6xl mx-auto space-y-8">
        
        <div class="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-wrap items-center justify-between gap-6 backdrop-blur-xl">
            <div class="space-y-2">
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                    سامانه سلامت و مدیریت پرونده بالینی
                </span>
                <h1 class="text-2xl sm:text-3xl font-extrabold text-white">
                    پرتال جامع مراجعین و بیماران
                </h1>
                <p class="text-xs text-slate-400">
                    مشاهده نوبت‌های رزروشده، پرونده دیجیتال ارتودنسی/ایمپلنت، و دستورات دارویی پزشک
                </p>
            </div>
            
            <a href="<?php echo esc_url(home_url('/#appointment')); ?>" class="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold shadow-lg shadow-sky-500/20 transition-all">
                رزرو نوبت ویزیت آنلاین ←
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span class="text-xs text-slate-400">نوبت معاینه بعدی</span>
                <p class="text-xl font-bold text-sky-400">۲۲ آبان ۱۴۰۵</p>
                <span class="text-[11px] text-slate-500">ساعت ۱۷:۳۰ - دکتر رضوی (یونیت ۳)</span>
            </div>
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span class="text-xs text-slate-400">طرح درمان فعال</span>
                <p class="text-xl font-bold text-emerald-400">فاز ۲: طراحی لبخند</p>
                <span class="text-[11px] text-slate-500">جلسه سوم با موفقیت انجام شد</span>
            </div>
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span class="text-xs text-slate-400">تصاویر رادیوگرافی (OPG)</span>
                <p class="text-3xl font-mono font-bold text-blue-400">۰۳</p>
                <span class="text-[11px] text-slate-500">فایل‌های رادیولوژی ضمیمه پرونده شد</span>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
