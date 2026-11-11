<?php
/**
 * Template Name: حساب کاربری و سوابق سفارشات فروشگاه (Store VIP Account)
 *
 * @package SedRazavi_Child_Store
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="sr-store-account-page min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100" dir="rtl">
    <div class="max-w-6xl mx-auto space-y-8">
        
        <div class="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-wrap items-center justify-between gap-6 backdrop-blur-xl">
            <div class="space-y-2">
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    باشگاه مشتریان و خریدهای شتاب
                </span>
                <h1 class="text-2xl sm:text-3xl font-extrabold text-white">
                    حساب کاربری فروشگاه آنلاین
                </h1>
                <p class="text-xs text-slate-400">
                    مشاهده فاکتورهای رسمی، پیگیری وضعیت ارسال مرسولات، و دانلود فایل‌های دیجیتال
                </p>
            </div>
            
            <a href="<?php echo esc_url(function_exists('wc_get_cart_url') ? wc_get_cart_url() : home_url('/cart')); ?>" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all">
                مشاهده سبد خرید ←
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span class="text-xs text-slate-400">سفارش‌های در حال پردازش</span>
                <p class="text-3xl font-mono font-bold text-emerald-400">۰۱</p>
                <span class="text-[11px] text-slate-500">کد رهگیری پستی: ۹۸۴۲۱-IRPOST</span>
            </div>
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span class="text-xs text-slate-400">کیف پول شتابی</span>
                <p class="text-2xl font-bold text-white">۵۵۰,۰۰۰ تومان</p>
                <span class="text-[11px] text-emerald-400">اعتبار آماده مصرف برای خرید بعدی</span>
            </div>
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span class="text-xs text-slate-400">فایل‌های دیجیتال فعال</span>
                <p class="text-3xl font-mono font-bold text-blue-400">۰۵</p>
                <span class="text-[11px] text-slate-500">دانلود با لینک مستقیم نیم‌بهاء</span>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
