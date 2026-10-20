<?php
/**
 * Template Name: پرتال دانشجویان و دوره‌های آنلاین (Student Academy Dashboard)
 *
 * @package SedRazavi_Child_Education
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="sr-education-portal-page min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#090D1A] text-slate-100" dir="rtl">
    <div class="max-w-6xl mx-auto space-y-8">
        
        <div class="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-wrap items-center justify-between gap-6 backdrop-blur-xl">
            <div class="space-y-2">
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    پنل آکادمی و لایسنس اسپات‌پلیر
                </span>
                <h1 class="text-2xl sm:text-3xl font-extrabold text-white">
                    میز یادگیری و مدیریت دوره‌ها
                </h1>
                <p class="text-xs text-slate-400">
                    دسترسی به ویدیوهای محافظت‌شده با SpotPlayer، دانلود جزوات، و شرکت در آزمون‌های پایان دوره
                </p>
            </div>
            
            <a href="spotplayer://" class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-500/20 transition-all flex items-center gap-2">
                <span>باز کردن در اسپات‌پلیر</span>
                <span>▶</span>
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <span class="text-xs text-slate-400">دوره‌های ثبت‌نام‌شده</span>
                <p class="text-3xl font-mono font-bold text-purple-400">۰۴</p>
                <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-purple-500 h-full w-4/5"></div>
                </div>
                <span class="text-[11px] text-slate-500">۸۰٪ سرفصل‌ها تماشا شده است</span>
            </div>

            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <span class="text-xs text-slate-400">کلید لایسنس اسپات‌پلیر</span>
                <div class="p-2 rounded-lg bg-slate-950 font-mono text-xs text-amber-400 select-all border border-slate-800 truncate">
                    SPOT-SR-9482-LMS-2026
                </div>
                <span class="text-[11px] text-slate-500">مخصوص ویندوز، مک و اندروید</span>
            </div>

            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <span class="text-xs text-slate-400">گواهی‌نامه‌های صادرشده</span>
                <p class="text-3xl font-mono font-bold text-emerald-400">۰۱</p>
                <span class="text-[11px] text-slate-500">مدرک دیجیتال با QR کد اعتبارسنجی</span>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
