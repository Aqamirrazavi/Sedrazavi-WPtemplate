<?php
/**
 * Template Name: پنل تحریریه و نویسندگان (Editorial Dashboard)
 *
 * @package SedRazavi_Child_News
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="sr-container mx-auto px-4 py-8 max-w-7xl">
    <div class="sr-editorial-header bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 text-white">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30 mb-2">
                    <?php esc_html_e('میز تحریریه و خبرگزاری', 'sedrazavi-child-news'); ?>
                </span>
                <h1 class="text-2xl font-bold"><?php esc_html_e('پیشخوان خبر و نظارت بر مقالات', 'sedrazavi-child-news'); ?></h1>
            </div>
            <a href="<?php echo esc_url(admin_url('post-new.php')); ?>" class="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-rose-600/30">
                <?php esc_html_e('+ نگارش خبر فوری / مقاله', 'sedrazavi-child-news'); ?>
            </a>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <div class="text-slate-400 text-sm mb-1"><?php esc_html_e('اخبار منتشرشده امروز', 'sedrazavi-child-news'); ?></div>
            <div class="text-3xl font-extrabold text-white">۲۴</div>
        </div>
        <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <div class="text-slate-400 text-sm mb-1"><?php esc_html_e('پیش‌نویس‌های در حال بررسی', 'sedrazavi-child-news'); ?></div>
            <div class="text-3xl font-extrabold text-amber-400">۵</div>
        </div>
        <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <div class="text-slate-400 text-sm mb-1"><?php esc_html_e('بازدید کل اخبار این هفته', 'sedrazavi-child-news'); ?></div>
            <div class="text-3xl font-extrabold text-rose-400">۱۲۸,۴۵۰</div>
        </div>
    </div>
</div>

<?php
get_footer();
