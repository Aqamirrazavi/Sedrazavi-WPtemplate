<?php
/**
 * Template Name: Portal Auth (Client & Designer)
 *
 * Dedicated standalone authentication portal for clients and designer.
 * Isolates users from /wp-admin/ with direct frontend redirects.
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// Redirect logged-in users to their respective dashboard
if (is_user_logged_in()) {
    if (current_user_can('manage_options')) {
        wp_safe_redirect(home_url('/designer-cockpit/'));
        exit;
    } else {
        wp_safe_redirect(home_url('/client-dashboard/'));
        exit;
    }
}

$login_error = '';
if ('POST' === $_SERVER['REQUEST_METHOD'] && isset($_POST['sr_portal_login'])) {
    check_admin_referer('sr_portal_login_action', 'sr_portal_nonce');

    $creds = [
        'user_login'    => sanitize_text_field($_POST['log']),
        'user_password' => $_POST['pwd'],
        'remember'      => isset($_POST['rememberme']),
    ];

    $user = wp_signon($creds, is_ssl());
    if (is_wp_error($user)) {
        $login_error = 'نام کاربری یا کلمه عبور وارد شده صحیح نیست.';
    } else {
        if (user_can($user, 'manage_options')) {
            wp_safe_redirect(home_url('/designer-cockpit/'));
        } else {
            wp_safe_redirect(home_url('/client-dashboard/'));
        }
        exit;
    }
}

get_header();
?>

<div class="sr-container sr-page-container">
    <div class="sr-portal-auth-card">
        <div class="sr-auth-header text-center">
            <span class="sr-badge-pill">سیستم احراز هویت اختصاصی</span>
            <h1 class="sr-auth-title">ورود به پورتال هوشمند</h1>
            <p class="sr-auth-desc">ورود کارفرمایان و دسترسی به کاک‌پیت مدیریت استودیو سیدرضوی</p>
        </div>

        <?php if (!empty($login_error)) : ?>
            <div class="sr-alert sr-alert-danger">
                <span>⚠️ <?php echo esc_html($login_error); ?></span>
            </div>
        <?php endif; ?>

        <form method="post" action="" class="sr-auth-form">
            <?php wp_nonce_field('sr_portal_login_action', 'sr_portal_nonce'); ?>
            <input type="hidden" name="sr_portal_login" value="1">

            <div class="sr-form-group">
                <label for="sr_user_login">نام کاربری، شماره همراه یا ایمیل <span class="sr-req">*</span></label>
                <input type="text" id="sr_user_login" name="log" required placeholder="مثال: admin یا ۰۹۱۲۳۴۵۶۷۸۹" dir="ltr">
            </div>

            <div class="sr-form-group">
                <label for="sr_user_pwd">رمز عبور اختصاصی <span class="sr-req">*</span></label>
                <input type="password" id="sr_user_pwd" name="pwd" required placeholder="••••••••" dir="ltr">
            </div>

            <div class="sr-form-row sr-auth-options">
                <label class="sr-checkbox-label">
                    <input type="checkbox" name="rememberme" value="forever" checked>
                    <span>مرا به خاطر بسپار</span>
                </label>
                <a href="<?php echo esc_url(wp_lostpassword_url()); ?>" class="sr-link-muted">رمز عبور را فراموش کردید؟</a>
            </div>

            <div class="sr-form-submit">
                <button type="submit" class="sr-btn sr-btn-glow sr-btn-full">
                    <span>ورود امن به پنل</span>
                    <span class="sr-btn-arrow">&larr;</span>
                </button>
            </div>
        </form>

        <div class="sr-auth-footer-help text-center">
            <p>کد پیگیری دارید و هنوز حسابی نساخته‌اید؟</p>
            <a href="<?php echo esc_url(home_url('/track-order/')); ?>" class="sr-link-accent">استعلام و رهگیری با کد اختصاصی &larr;</a>
        </div>
    </div>
</div>

<?php
get_footer();
