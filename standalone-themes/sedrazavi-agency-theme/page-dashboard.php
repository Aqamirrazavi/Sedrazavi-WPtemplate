<?php
/**
 * Template Name: پرتال مشتریان آژانس دیجیتال (Agency Client Portal)
 *
 * @package SedRazavi_Child_Agency
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="sr-agency-portal-page min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100" dir="rtl">
    <div class="max-w-6xl mx-auto space-y-8">
        
        <!-- هدر پرتال کارفرما -->
        <div class="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-wrap items-center justify-between gap-6 backdrop-blur-xl">
            <div class="space-y-2">
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    پرتال کارفرمایان و پروژه‌ها
                </span>
                <h1 class="text-2xl sm:text-3xl font-extrabold text-white">
                    میز کار دیجیتال آژانس خلاق
                </h1>
                <p class="text-xs text-slate-400">
                    پیگیری پیشرفت مراحل طراحی، تأیید وایرفریم‌ها، دریافت فایل‌های سورس و فاکتورها
                </p>
            </div>
            
            <div class="flex items-center gap-3">
                <a href="<?php echo esc_url(home_url('/#brief')); ?>" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all">
                    + ثبت بریف پروژه جدید
                </a>
            </div>
        </div>

        <!-- کارت‌های وضعیت پروژه‌ها و تحویلی‌ها -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <span class="text-xs text-slate-400">پروژه‌های فعال</span>
                <p class="text-3xl font-mono font-bold text-blue-400">۰۳</p>
                <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-blue-500 h-full w-3/4"></div>
                </div>
                <span class="text-[11px] text-slate-500">۷۵٪ میانگین پیشرفت فاز اسپرینت جاری</span>
            </div>

            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <span class="text-xs text-slate-400">اسناد و فایل‌های تحویلی</span>
                <p class="text-3xl font-mono font-bold text-emerald-400">۱۲</p>
                <span class="text-[11px] text-slate-500">طرح‌های فیگما، راهنمای برند و دیزاین سیستم</span>
            </div>

            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <span class="text-xs text-slate-400">مایل‌استون تسویه‌شده</span>
                <p class="text-3xl font-mono font-bold text-amber-400">۱۰۰٪</p>
                <span class="text-[11px] text-slate-500">صورتحساب‌ها به‌روز و تأییدشده هستند</span>
            </div>
        </div>

        <!-- فرم ارسال بریف و درخواست طراحی -->
        <div class="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <h3 class="text-lg font-bold text-white">فرم ارسال تیکت و سفارش ماژول جدید</h3>
            <form action="<?php echo esc_url(admin_url('admin-post.php')); ?>" method="post" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs text-slate-400 mb-1.5">عنوان درخواست یا فیچر</label>
                        <input type="text" name="feature_title" required class="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="مثال: بازطراحی صفحه فرود محصول">
                    </div>
                    <div>
                        <label class="block text-xs text-slate-400 mb-1.5">اولویت انجام</label>
                        <select name="priority" class="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors">
                            <option value="normal">عادی (اسپرینت آینده)</option>
                            <option value="high">فوری (اسپرینت جاری)</option>
                            <option value="critical">بحرانی (زیر ۲۴ ساعت)</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block text-xs text-slate-400 mb-1.5">توضیحات و نیازمندی‌های دیزاین</label>
                    <textarea name="feature_desc" rows="4" required class="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="شرح کامل تسک و لینک‌های رفرنس دیزاین..."></textarea>
                </div>
                <button type="submit" class="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20">
                    ارسال درخواست به تیم طراحی ←
                </button>
            </form>
        </div>

    </div>
</div>

<?php
get_footer();
