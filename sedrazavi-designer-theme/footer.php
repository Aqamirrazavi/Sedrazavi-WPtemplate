<?php
/**
 * SedRazavi Designer Theme Footer Template
 *
 * Dedicated standalone theme footer with Elementor Pro Theme Builder compatibility.
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. Elementor Theme Builder Footer check
if (function_exists('elementor_theme_do_location') && elementor_theme_do_location('footer')) {
    wp_footer();
    echo '</body></html>';
    return;
}

$telegram = get_theme_mod('sedrazavi_telegram_handle', '@sedrazavi');
$eitaa    = get_theme_mod('sedrazavi_eitaa_handle', '@sedrazavi');
$phone    = get_theme_mod('sedrazavi_phone', '۰۹۱۲۳۴۵۶۷۸۹');
$email    = get_theme_mod('sedrazavi_email', 'info@sedrazavi.ir');
?>

</main><!-- #sr-main-content -->

<footer class="sr-site-footer" id="sr-footer" role="contentinfo">
    <div class="sr-footer-neon-line"></div>
    <div class="sr-footer-container">
        <div class="sr-footer-grid">
            <!-- Col 1: Bio & Status -->
            <div class="sr-footer-col sr-footer-about">
                <div class="sr-footer-brand">
                    <span class="sr-brand-symbol">⚡</span>
                    <span class="sr-brand-name">سیدرضوی <span class="sr-brand-accent">استودیو</span></span>
                </div>
                <p class="sr-footer-desc">
                    معمار تخصصی وب‌سایت‌های وردپرسی و لندینگ‌پیج‌های فوق‌العاده سریع بدون کدنویسی. طراحی هوشمندانه، رابط کاربری نئونی مدرن و یکپارچه‌سازی اختصاصی با المنتور بدون وابستگی به فریم‌ورک‌های سنگین.
                </p>
                <div class="sr-footer-status-badge">
                    <span class="sr-status-pulse"></span>
                    <span>ظرفیت پذیرش پروژه جدید: <strong>فعال (۲ اسلات خالی)</strong></span>
                </div>
            </div>

            <!-- Col 2: Services & Fast Links -->
            <div class="sr-footer-col">
                <h4 class="sr-footer-title">دسترسی سریع</h4>
                <ul class="sr-footer-links">
                    <li><a href="<?php echo esc_url(home_url('/#services')); ?>">طراحی لندینگ‌پیج بدون کدنویسی</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#portfolio')); ?>">ویترین نمونه‌کارهای اختصاصی</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#about')); ?>">درباره معمار سیستم</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#pricing')); ?>">تعرفه‌ها و پکیج‌های توسعه</a></li>
                    <li><a href="<?php echo esc_url(home_url('/blog/')); ?>">وبلاگ و نکات تخصصی المنتور</a></li>
                </ul>
            </div>

            <!-- Col 3: Portals & Utilities -->
            <div class="sr-footer-col">
                <h4 class="sr-footer-title">پورتال‌ها و رهگیری</h4>
                <ul class="sr-footer-links">
                    <li><a href="<?php echo esc_url(home_url('/track-order/')); ?>">⚡ سامانه رهگیری آنلاین سفارش (کد رهگیری)</a></li>
                    <li><a href="<?php echo esc_url(home_url('/portal-auth/')); ?>">🔑 پورتال اختصاصی ورود کارفرمایان</a></li>
                    <li><a href="<?php echo esc_url(home_url('/designer-cockpit/')); ?>">🖥️ کاک‌پیت مدیریت طراح (Cockpit)</a></li>
                    <li><a href="<?php echo esc_url(home_url('/privacy/')); ?>">🛡️ حریم خصوصی و استانداردهای تحویل</a></li>
                </ul>
            </div>

            <!-- Col 4: Contact & Channels -->
            <div class="sr-footer-col sr-footer-contact">
                <h4 class="sr-footer-title">راه‌های ارتباط مستقیم</h4>
                <div class="sr-footer-contact-items">
                    <a href="https://t.me/<?php echo esc_attr(ltrim($telegram, '@')); ?>" target="_blank" rel="noopener noreferrer" class="sr-contact-pill">
                        <span class="sr-pill-icon">✈️</span>
                        <span>تلگرام: <strong><?php echo esc_html($telegram); ?></strong></span>
                    </a>
                    <a href="https://eitaa.com/<?php echo esc_attr(ltrim($eitaa, '@')); ?>" target="_blank" rel="noopener noreferrer" class="sr-contact-pill">
                        <span class="sr-pill-icon">💬</span>
                        <span>ایتا: <strong><?php echo esc_html($eitaa); ?></strong></span>
                    </a>
                    <a href="tel:<?php echo esc_attr($phone); ?>" class="sr-contact-pill">
                        <span class="sr-pill-icon">📞</span>
                        <span>تلفن تماس: <strong><?php echo esc_html($phone); ?></strong></span>
                    </a>
                    <a href="mailto:<?php echo esc_attr($email); ?>" class="sr-contact-pill">
                        <span class="sr-pill-icon">✉️</span>
                        <span>ایمیل: <strong><?php echo esc_html($email); ?></strong></span>
                    </a>
                </div>
            </div>
        </div>

        <!-- Sub-footer bar -->
        <div class="sr-footer-bottom">
            <div class="sr-bottom-copy">
                &copy; <?php echo esc_html(date('Y')); ?> تمامی حقوق متعلق به سیدرضوی استودیو است. توسعه با PHP بومی و المنتور بدون کدنویسی.
            </div>
            <div class="sr-bottom-badges">
                <span class="sr-badge-pill">⚡ لایت اسپید بهینه</span>
                <span class="sr-badge-pill">📱 واکنش‌گرا ۱۰۰٪</span>
                <span class="sr-badge-pill">🔒 امنیت و بدون ری‌اکت فرانت</span>
            </div>
        </div>
    </div>
</footer>

<!-- Floating Back to Top Button -->
<button type="button" class="sr-back-to-top" id="sr-back-to-top" aria-label="بازگشت به ابتدای صفحه">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
</button>

<!-- Quick Consultation Modal Dialog -->
<div class="sr-modal-backdrop" id="sr-consultation-modal" aria-hidden="true" role="dialog">
    <div class="sr-modal-card">
        <div class="sr-modal-header">
            <h3 class="sr-modal-title">⚡ مشاوره سریع و ثبت پروژه طراحی</h3>
            <button type="button" class="sr-modal-close" id="sr-modal-close" aria-label="بستن پنجره">&times;</button>
        </div>
        <div class="sr-modal-body">
            <p class="sr-modal-intro">
                فرم زیر را تکمیل کنید تا وضعیت پروژه شما بررسی و کد رهگیری اختصاصی صادر شود:
            </p>
            <form id="sr-quick-lead-form" class="sr-lead-form" method="post">
                <input type="hidden" name="action" value="sedrazavi_submit_lead">
                <input type="hidden" name="security" value="<?php echo esc_attr(wp_create_nonce('sedrazavi_designer_nonce')); ?>">

                <div class="sr-form-group">
                    <label for="sr_lead_name">نام و نام خانوادگی <span class="sr-req">*</span></label>
                    <input type="text" id="sr_lead_name" name="client_name" required placeholder="مثال: علی رضایی">
                </div>

                <div class="sr-form-row">
                    <div class="sr-form-group">
                        <label for="sr_lead_phone">شماره همراه <span class="sr-req">*</span></label>
                        <input type="tel" id="sr_lead_phone" name="client_phone" required placeholder="۰۹۱۲۳۴۵۶۷۸۹" dir="ltr">
                    </div>
                    <div class="sr-form-group">
                        <label for="sr_lead_email">ایمیل (اختیاری)</label>
                        <input type="email" id="sr_lead_email" name="client_email" placeholder="name@example.com" dir="ltr">
                    </div>
                </div>

                <div class="sr-form-group">
                    <label for="sr_project_type">نوع پروژه درخواستی</label>
                    <select id="sr_project_type" name="project_type">
                        <option value="landing">طراحی لندینگ‌پیج نئونی بدون کدنویسی</option>
                        <option value="corporate">طراحی سایت شرکتی با المنتور پرو</option>
                        <option value="shop">طراحی فروشگاه آنلاین ووکامرس بدون کدنویسی</option>
                        <option value="redesign">بازطراحی و بهینه‌سازی سرعت سایت فعلی</option>
                        <option value="custom">پروژه اختصاصی و مشاوره معماری</option>
                    </select>
                </div>

                <div class="sr-form-group">
                    <label for="sr_project_desc">توضیحات یا نیازمندی‌های پروژه <span class="sr-req">*</span></label>
                    <textarea id="sr_project_desc" name="project_desc" rows="4" required placeholder="موضوع فعالیت، امکانات مورد نیاز، رنگ‌بندی دلخواه یا آدرس سایت نمونه..."></textarea>
                </div>

                <div class="sr-form-submit">
                    <button type="submit" class="sr-btn sr-btn-glow sr-btn-full" id="sr-lead-submit-btn">
                        <span>ارسال درخواست و دریافت کد رهگیری آنی</span>
                        <span class="sr-btn-icon">⚡</span>
                    </button>
                </div>
                <div class="sr-form-response" id="sr-lead-form-feedback"></div>
            </form>
        </div>
    </div>
</div>

<?php wp_footer(); ?>
</body>
</html>
