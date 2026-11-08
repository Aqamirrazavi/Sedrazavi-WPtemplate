<?php
/**
 * Template Name: Client Dashboard
 *
 * Dedicated frontend dashboard for clients to inspect projects and messages.
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!is_user_logged_in()) {
    wp_safe_redirect(home_url('/portal-auth/'));
    exit;
}

$current_user = wp_get_current_user();

get_header();
?>

<div class="sr-container sr-dashboard-container">
    <div class="sr-dashboard-topbar">
        <div>
            <span class="sr-badge-pill">میز کار کارفرما</span>
            <h1 class="sr-dash-title">خوش آمدید، <?php echo esc_html($current_user->display_name ?: $current_user->user_login); ?></h1>
        </div>
        <div class="sr-dash-actions">
            <a href="<?php echo esc_url(wp_logout_url(home_url('/'))); ?>" class="sr-btn sr-btn-sm sr-btn-outline">
                <span>خروج از حساب</span>
                <span class="sr-btn-icon">🚪</span>
            </a>
        </div>
    </div>

    <div class="sr-dash-grid">
        <!-- Main Projects Column -->
        <div class="sr-dash-main">
            <div class="sr-card sr-dash-card">
                <div class="sr-card-head">
                    <h3 class="sr-card-title">⚡ پروژه‌های فعال شما</h3>
                    <a href="<?php echo esc_url(home_url('/track-order/')); ?>" class="sr-link-accent">رهگیری با کد &larr;</a>
                </div>

                <div class="sr-client-project-item">
                    <div class="sr-proj-header">
                        <div>
                            <span class="sr-proj-id">شناسه: SR-92410</span>
                            <h4 class="sr-proj-name">طراحی لندینگ‌پیج نئونی بدون کدنویسی (المنتور پرو)</h4>
                        </div>
                        <span class="sr-badge-pill sr-badge-primary">مرحله: بازبینی و ویرایش</span>
                    </div>

                    <div class="sr-progress-track">
                        <div class="sr-progress-bar" style="width: 75%;"></div>
                    </div>

                    <div class="sr-proj-meta">
                        <span>تاریخ شروع: <?php echo esc_html(date_i18n('Y/m/d')); ?></span>
                        <span>زمان تخمینی تحویل: ۲ روز کاری دیگر</span>
                        <span>معمار سیستم: استودیو سیدرضوی</span>
                    </div>

                    <div class="sr-proj-actions">
                        <a href="https://t.me/<?php echo esc_attr(ltrim(get_theme_mod('sedrazavi_telegram_handle', '@sedrazavi'), '@')); ?>" target="_blank" rel="noopener noreferrer" class="sr-btn sr-btn-sm sr-btn-glow">
                            <span>گفتگو در تلگرام</span>
                            <span class="sr-btn-icon">💬</span>
                        </a>
                        <button type="button" class="sr-btn sr-btn-sm sr-btn-outline sr-open-consultation" data-modal="sr-consultation-modal">
                            <span>ارسال یادداشت تکمیلی</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Deliverables & Resources Card -->
            <div class="sr-card sr-dash-card">
                <h3 class="sr-card-title">📦 فایل‌ها و تحویل‌های دانلودی</h3>
                <div class="sr-deliverables-list">
                    <div class="sr-deliverable-item">
                        <span class="sr-deliv-icon">📑</span>
                        <div class="sr-deliv-info">
                            <span class="sr-deliv-title">مستندات ویدیویی آموزش کار با المنتور (بدون کد)</span>
                            <span class="sr-deliv-meta">فایل MP4 • ۱۸ مگابایت</span>
                        </div>
                        <button type="button" class="sr-btn sr-btn-sm sr-btn-outline" onclick="this.nextElementSibling.classList.toggle('sr-visible');">وضعیت دریافت</button>
                        <div class="sr-download-notice" style="display:none; margin-top:8px; font-size:12px; color:var(--sr-primary);">⚡ لینک دسترسی و دانلود پس از تایید نهایی پروژه توسط کارفرما فعال می‌شود.</div>
                    </div>
                    <div class="sr-deliverable-item">
                        <span class="sr-deliv-icon">🎨</span>
                        <div class="sr-deliv-info">
                            <span class="sr-deliv-title">پالت ۶۶ رنگ نئونی و کدهای CSS متغیر</span>
                            <span class="sr-deliv-meta">فایل JSON / CSS • ۲۴ کیلوبایت</span>
                        </div>
                        <a href="<?php echo esc_url(get_template_directory_uri() . '/assets/css/palettes.css'); ?>" download class="sr-btn sr-btn-sm sr-btn-outline">دانلود</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sidebar Info Column -->
        <div class="sr-dash-side">
            <div class="sr-card sr-dash-card">
                <h3 class="sr-card-title">🛡️ پشتیبانی اختصاصی</h3>
                <p class="sr-side-desc">در تمام طول توسعه و تا ۳۰ روز پس از تحویل، پشتیبانی مستقیم معمار سیستم در کنار شماست.</p>
                <div class="sr-support-channels">
                    <a href="https://t.me/<?php echo esc_attr(ltrim(get_theme_mod('sedrazavi_telegram_handle', '@sedrazavi'), '@')); ?>" target="_blank" rel="noopener noreferrer" class="sr-contact-pill">
                        <span class="sr-pill-icon">✈️</span>
                        <span>تلگرام: <?php echo esc_html(get_theme_mod('sedrazavi_telegram_handle', '@sedrazavi')); ?></span>
                    </a>
                    <a href="https://eitaa.com/<?php echo esc_attr(ltrim(get_theme_mod('sedrazavi_eitaa_handle', '@sedrazavi'), '@')); ?>" target="_blank" rel="noopener noreferrer" class="sr-contact-pill">
                        <span class="sr-pill-icon">💬</span>
                        <span>ایتا: <?php echo esc_html(get_theme_mod('sedrazavi_eitaa_handle', '@sedrazavi')); ?></span>
                    </a>
                    <a href="tel:<?php echo esc_attr(get_theme_mod('sedrazavi_phone', '۰۹۱۲۳۴۵۶۷۸۹')); ?>" class="sr-contact-pill">
                        <span class="sr-pill-icon">📞</span>
                        <span>تلفن: <?php echo esc_html(get_theme_mod('sedrazavi_phone', '۰۹۱۲۳۴۵۶۷۸۹')); ?></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
get_footer();
