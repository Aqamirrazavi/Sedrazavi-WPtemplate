<?php
/**
 * Template Name: پرتال موکلین و استعلام پرونده (Legal Client Portal)
 *
 * @package SedRazavi_Child_Legal
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="sr-legal-portal-page min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-sr-bg text-sr-primary" dir="rtl">
    <div class="max-w-6xl mx-auto space-y-8">
        
        <div class="p-8 rounded-3xl bg-sr-surface border border-sr-border shadow-2xl flex flex-wrap items-center justify-between gap-6">
            <div class="space-y-2">
                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-sr-gold/15 text-sr-gold border border-sr-gold/30">
                    پرتال محرمانه موکلین و داوری
                </span>
                <h1 class="text-2xl sm:text-3xl font-extrabold font-serif text-sr-primary">
                    سامانه هوشمند استعلام پرونده‌های حقوقی
                </h1>
                <p class="text-xs text-sr-muted">
                    پیگیری روند دادرسی، آراء وحدت رویه، اسناد دفاعیه و جلسات دادگاه
                </p>
            </div>
            
            <a href="<?php echo esc_url(home_url('/#tracking')); ?>" class="px-5 py-2.5 rounded-xl bg-sr-gold hover:bg-sr-gold-hover text-sr-text-inverted text-xs font-bold transition-all shadow-md shadow-sr-gold/20">
                استعلام با شناسه ۱۶ رقمی سناء ←
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 rounded-2xl bg-sr-surface border border-sr-border space-y-2">
                <span class="text-xs text-sr-muted">پرونده‌های جاری</span>
                <p class="text-3xl font-mono font-bold text-sr-gold">۰۲</p>
                <span class="text-[11px] text-sr-muted">شعبه ۵ دادگاه تجدیدنظر استان</span>
            </div>
            <div class="p-6 rounded-2xl bg-sr-surface border border-sr-border space-y-2">
                <span class="text-xs text-sr-muted">جلسه رسیدگی آینده</span>
                <p class="text-xl font-bold text-sr-primary">۱۴ آبان ۱۴۰۵</p>
                <span class="text-[11px] text-sr-gold">ساعت ۱۰:۳۰ صبح - شعبه داوری</span>
            </div>
            <div class="p-6 rounded-2xl bg-sr-surface border border-sr-border space-y-2">
                <span class="text-xs text-sr-muted">وضعیت حق‌الوکاله</span>
                <p class="text-xl font-bold text-emerald-400">تسویه مرحله دوم</p>
                <span class="text-[11px] text-sr-muted">فاکتور رسمی صادر گردید</span>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
