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

        <?php if (!is_user_logged_in()) : ?>
            <div class="p-8 rounded-2xl bg-sr-surface border border-sr-border text-center space-y-4">
                <h2 class="text-lg font-bold text-sr-primary">احراز هویت برای مشاهده پرونده‌های محرمانه الزامی است</h2>
                <p class="text-xs text-sr-muted">لطفاً جهت دسترسی به اسناد، مواعد دادرسی و وضعیت حق‌الوکاله وارد حساب کاربری خود شوید.</p>
                <a href="<?php echo esc_url(wp_login_url(get_permalink())); ?>" class="inline-block px-6 py-2.5 rounded-xl bg-sr-gold text-sr-text-inverted text-xs font-bold">
                    ورود به پرتال موکلین
                </a>
            </div>
        <?php else : ?>
            <?php
            $uid = get_current_user_id();
            $case_post_types = class_exists('SedRazavi_Case_Data_Service')
                ? SedRazavi_Case_Data_Service::get_case_post_types()
                : array('sedrazavi_case', 'case', 'arbitration_case');
            $all_cases = get_posts(array(
                'post_type'      => $case_post_types,
                'post_status'    => array('private', 'publish'),
                'posts_per_page' => 50,
                'orderby'        => 'date',
                'order'          => 'DESC',
            ));
            $owned_cases = array();
            foreach ($all_cases as $c) {
                $allowed = class_exists('SedRazavi_Case_Data_Service')
                    ? SedRazavi_Case_Data_Service::can_user_access_case($c, $uid)
                    : ((int) $c->post_author === $uid || (int) get_post_meta($c->ID, '_sedrazavi_client_user_id', true) === $uid || (int) get_post_meta($c->ID, '_client_user_id', true) === $uid);
                if ($allowed) {
                    $owned_cases[] = $c;
                }
            }
            $primary_case = !empty($owned_cases) ? $owned_cases[0] : null;
            $court_branch = $primary_case ? (get_post_meta($primary_case->ID, '_sedrazavi_court_branch', true) ?: get_post_meta($primary_case->ID, '_court_branch', true) ?: 'ثبت نشده') : 'پرونده فعالی ثبت نشده است';
            $next_session = $primary_case ? (get_post_meta($primary_case->ID, '_sedrazavi_next_session', true) ?: 'تعیین نشده') : '—';
            $fee_status   = $primary_case ? (get_post_meta($primary_case->ID, '_sedrazavi_fee_status', true) ?: (get_post_meta($primary_case->ID, '_sedrazavi_case_status', true) ?: 'در حال بررسی')) : '—';
            ?>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="p-6 rounded-2xl bg-sr-surface border border-sr-border space-y-2">
                    <span class="text-xs text-sr-muted">پرونده‌های جاری</span>
                    <p class="text-3xl font-mono font-bold text-sr-gold"><?php echo esc_html(number_format_i18n(count($owned_cases))); ?></p>
                    <span class="text-[11px] text-sr-muted"><?php echo esc_html($court_branch); ?></span>
                </div>
                <div class="p-6 rounded-2xl bg-sr-surface border border-sr-border space-y-2">
                    <span class="text-xs text-sr-muted">جلسه رسیدگی آینده</span>
                    <p class="text-xl font-bold text-sr-primary"><?php echo esc_html($next_session); ?></p>
                    <span class="text-[11px] text-sr-gold">بر اساس آخرین ثبت کارتابل قضایی</span>
                </div>
                <div class="p-6 rounded-2xl bg-sr-surface border border-sr-border space-y-2">
                    <span class="text-xs text-sr-muted">وضعیت حق‌الوکاله / پرونده</span>
                    <p class="text-xl font-bold text-emerald-400"><?php echo esc_html($fee_status); ?></p>
                    <span class="text-[11px] text-sr-muted">اطلاعات زنده پایگاه داده</span>
                </div>
            </div>
        <?php endif; ?>

    </div>
</div>

<?php
get_footer();
