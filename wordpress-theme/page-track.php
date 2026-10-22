<?php
/**
 * Template Name: پیگیری وضعیت استعلام و پروژه (Guest Lead Tracker)
 * Description: Client Guest Hub for tokenized lead tracking without standard login.
 *
 * @package SedRazavi
 * @version 6.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

$token = isset($_GET['token']) ? sanitize_text_field($_GET['token']) : '';
$inquiry = null;

if (!empty($token)) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'designer_inquiries';
    if ($wpdb->get_var($wpdb->prepare("SHOW TABLES LIKE %s", $table_name)) === $table_name) {
        $inquiry = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table_name} WHERE lead_token = %s", $token));
    }
}
?>

<div class="sr-track-wrapper py-12 px-4 max-w-4xl mx-auto">
    <div class="sr-track-header bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-8 text-white shadow-2xl text-center">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 mb-3">
            <?php esc_html_e('سامانه رصد برخط پروژه', 'sedrazavi'); ?>
        </span>
        <h1 class="text-3xl font-extrabold mb-3">
            <?php esc_html_e('رهگیری وضعیت استعلام و نقشه راه همکاری', 'sedrazavi'); ?>
        </h1>
        <p class="text-slate-400 text-sm max-w-xl mx-auto">
            <?php esc_html_e('وضعیت بررسی نیازسنجی، پیش‌فاکتور و آغاز مراحل پیاده‌سازی وب‌سایت شما به صورت زنده.', 'sedrazavi'); ?>
        </p>
    </div>

    <?php if ($inquiry) : ?>
        <div class="sr-track-details bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-white mb-8">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-slate-800 gap-4">
                <div>
                    <span class="text-xs text-slate-400"><?php esc_html_e('کارفرمای محترم:', 'sedrazavi'); ?></span>
                    <h2 class="text-xl font-bold text-white"><?php echo esc_html($inquiry->client_name); ?></h2>
                </div>
                <div class="text-left">
                    <span class="text-xs text-slate-400"><?php esc_html_e('کد پیگیری یکتا:', 'sedrazavi'); ?></span>
                    <div class="font-mono text-sm text-amber-400"><?php echo esc_html(substr($inquiry->lead_token, 0, 16)); ?>...</div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div class="bg-black/40 rounded-xl p-4 border border-slate-800">
                    <div class="text-xs text-slate-400 mb-1"><?php esc_html_e('نوع پروژه:', 'sedrazavi'); ?></div>
                    <div class="font-bold text-white"><?php echo esc_html($inquiry->project_type); ?></div>
                </div>
                <div class="bg-black/40 rounded-xl p-4 border border-slate-800">
                    <div class="text-xs text-slate-400 mb-1"><?php esc_html_e('وضعیت فعلی:', 'sedrazavi'); ?></div>
                    <div class="font-bold text-emerald-400"><?php echo esc_html($inquiry->status); ?></div>
                </div>
                <div class="bg-black/40 rounded-xl p-4 border border-slate-800">
                    <div class="text-xs text-slate-400 mb-1"><?php esc_html_e('تاریخ ثبت درخواست:', 'sedrazavi'); ?></div>
                    <div class="font-bold text-slate-300"><?php echo esc_html($inquiry->created_at); ?></div>
                </div>
            </div>

            <div class="text-center pt-4">
                <a href="https://eitaa.com/sedrazavi" target="_blank" rel="noopener noreferrer" class="sr-track-cta-btn inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/30">
                    <span><?php esc_html_e('هماهنگی فوری جلسه آنلاین با معمار ارشد (ایتا)', 'sedrazavi'); ?></span>
                    <span>←</span>
                </a>
            </div>
        </div>
    <?php else : ?>
        <div class="sr-track-form-box bg-slate-900/80 border border-slate-800 rounded-2xl p-8 text-center text-white">
            <p class="text-slate-400 mb-6">
                <?php esc_html_e('جهت مشاهده وضعیت، کد رهگیری ۳۲ رقمی دریافتی خود را وارد نمایید:', 'sedrazavi'); ?>
            </p>
            <form method="get" action="<?php echo esc_url(get_permalink()); ?>" class="max-w-md mx-auto flex gap-3">
                <input type="text" name="token" placeholder="<?php esc_attr_e('کد رهگیری استعلام...', 'sedrazavi'); ?>" class="sr-track-input flex-1 px-4 py-3 bg-black/50 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500" required>
                <button type="submit" class="sr-track-submit px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all">
                    <?php esc_html_e('استعلام', 'sedrazavi'); ?>
                </button>
            </form>
        </div>
    <?php endif; ?>
</div>

<?php
get_footer();
