<?php
/**
 * Template Name: Contact
 *
 * Dedicated standalone contact page with neon direct messaging and lead submission.
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

$telegram = get_theme_mod('sedrazavi_telegram_handle', '@sedrazavi');
$eitaa    = get_theme_mod('sedrazavi_eitaa_handle', '@sedrazavi');
$phone    = get_theme_mod('sedrazavi_phone', '۰۹۱۲۳۴۵۶۷۸۹');
$email    = get_theme_mod('sedrazavi_email', 'info@sedrazavi.ir');
?>

<div class="sr-container sr-page-container">
    <div class="sr-page-header text-center">
        <span class="sr-badge-pill">ارتباط مستقیم</span>
        <h1 class="sr-page-title">تماس با استودیو و ثبت سفارش پروژه</h1>
        <p class="sr-page-desc">برای استعلام قیمت، زمان‌بندی یا مشاوره اولیه می‌توانید از فرم زیر یا پیام‌رسان‌ها استفاده کنید.</p>
    </div>

    <div class="sr-contact-grid">
        <!-- Direct Channels -->
        <div class="sr-contact-sidebar">
            <div class="sr-card sr-contact-info-card">
                <h3 class="sr-card-title">⚡ کانال‌های گفتگوی سریع</h3>
                <p class="sr-card-lead">پاسخگویی در پیام‌رسان‌ها معمولاً کمتر از ۲ ساعت انجام می‌شود:</p>

                <div class="sr-channels-vertical">
                    <a href="https://t.me/<?php echo esc_attr(ltrim($telegram, '@')); ?>" target="_blank" rel="noopener noreferrer" class="sr-channel-box">
                        <span class="sr-channel-icon">✈️</span>
                        <div>
                            <span class="sr-channel-name">تلگرام رسمی</span>
                            <span class="sr-channel-handle"><?php echo esc_html($telegram); ?></span>
                        </div>
                    </a>

                    <a href="https://eitaa.com/<?php echo esc_attr(ltrim($eitaa, '@')); ?>" target="_blank" rel="noopener noreferrer" class="sr-channel-box">
                        <span class="sr-channel-icon">💬</span>
                        <div>
                            <span class="sr-channel-name">پیام‌رسان ایتا</span>
                            <span class="sr-channel-handle"><?php echo esc_html($eitaa); ?></span>
                        </div>
                    </a>

                    <a href="tel:<?php echo esc_attr($phone); ?>" class="sr-channel-box">
                        <span class="sr-channel-icon">📞</span>
                        <div>
                            <span class="sr-channel-name">تماس تلفنی مستقیم</span>
                            <span class="sr-channel-handle" dir="ltr"><?php echo esc_html($phone); ?></span>
                        </div>
                    </a>

                    <a href="mailto:<?php echo esc_attr($email); ?>" class="sr-channel-box">
                        <span class="sr-channel-icon">✉️</span>
                        <div>
                            <span class="sr-channel-name">ایمیل استودیو</span>
                            <span class="sr-channel-handle" dir="ltr"><?php echo esc_html($email); ?></span>
                        </div>
                    </a>
                </div>

                <div class="sr-hours-note">
                    <span>🕒 ساعات پاسخگویی: شنبه تا پنجشنبه از ۹ الی ۱۹</span>
                </div>
            </div>
        </div>

        <!-- Lead Form -->
        <div class="sr-contact-main">
            <div class="sr-card sr-form-card">
                <h3 class="sr-card-title">📝 فرم استعلام و دریافت کد رهگیری آنی</h3>
                <p class="sr-form-desc">پس از ارسال، یک شناسه یکتا (SR-XXXXX) دریافت خواهید کرد که وضعیت پروژه با آن قابل ردیابی است.</p>

                <form id="sr-page-lead-form" class="sr-lead-form" method="post">
                    <input type="hidden" name="action" value="sedrazavi_submit_lead">
                    <input type="hidden" name="security" value="<?php echo esc_attr(wp_create_nonce('sedrazavi_designer_nonce')); ?>">

                    <div class="sr-form-row">
                        <div class="sr-form-group">
                            <label for="p_client_name">نام و نام خانوادگی <span class="sr-req">*</span></label>
                            <input type="text" id="p_client_name" name="client_name" required placeholder="مثال: سارا محمدی">
                        </div>
                        <div class="sr-form-group">
                            <label for="p_client_phone">شماره همراه معتبر <span class="sr-req">*</span></label>
                            <input type="tel" id="p_client_phone" name="client_phone" required placeholder="۰۹۱۲۳۴۵۶۷۸۹" dir="ltr">
                        </div>
                    </div>

                    <div class="sr-form-row">
                        <div class="sr-form-group">
                            <label for="p_client_email">آدرس ایمیل</label>
                            <input type="email" id="p_client_email" name="client_email" placeholder="name@domain.com" dir="ltr">
                        </div>
                        <div class="sr-form-group">
                            <label for="p_project_type">نوع همکاری یا سفارش</label>
                            <select id="p_project_type" name="project_type">
                                <option value="landing">طراحی صفحه فرود اختصاصی (Landing Page)</option>
                                <option value="corporate">طراحی سایت شرکتی با Theme Builder</option>
                                <option value="shop">فروشگاه آنلاین ووکامرس</option>
                                <option value="redesign">بهینه‌سازی سرعت و بازطراحی سایت فعلی</option>
                                <option value="consultation">مشاوره فنی و معماری بدون کد</option>
                            </select>
                        </div>
                    </div>

                    <div class="sr-form-group">
                        <label for="p_project_desc">توضیحات و نیازمندی‌ها <span class="sr-req">*</span></label>
                        <textarea id="p_project_desc" name="project_desc" rows="5" required placeholder="درباره کسب‌وکار، امکانات مدنظر، لینک نمونه سایت‌های مورد علاقه و زمان تقریبی تحویل بنویسید..."></textarea>
                    </div>

                    <div class="sr-form-submit">
                        <button type="submit" class="sr-btn sr-btn-glow sr-btn-full" id="p-lead-submit-btn">
                            <span>ارسال اطلاعات و صدور شناسه رهگیری</span>
                            <span class="sr-btn-icon">⚡</span>
                        </button>
                    </div>
                    <div class="sr-form-response" id="p-lead-feedback"></div>
                </form>
            </div>
        </div>
    </div>
</div>

<?php
get_footer();
