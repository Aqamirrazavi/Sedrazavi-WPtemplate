<?php
/**
 * Template Name: About Designer & Philosophy
 *
 * Dedicated standalone about page showcasing designer bio, no-code architecture principles,
 * and tech stack mastery.
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="sr-container sr-page-container">
    <div class="sr-page-header text-center">
        <span class="sr-badge-pill">معمار سیستم‌های بدون کدنویسی</span>
        <h1 class="sr-page-title">درباره سیدرضوی و فلسفه No-Code</h1>
        <p class="sr-page-desc">ترکیب هنر طراحی بصری (UI/UX)، روانشناسی فروش و استانداردهای جهانی المنتور</p>
    </div>

    <div class="sr-about-grid">
        <div class="sr-about-text">
            <h2 class="sr-content-heading">چرا معماری بدون کدنویسی (No-Code)؟</h2>
            <p>
                در دنیای امروز سرعت ارائه محصول به بازار (Time-to-Market) حیاتی‌ترین برگ برنده است. کارفرمایان نیاز به وب‌سایت‌هایی دارند که پس از تحویل، برای کوچک‌ترین تغییر در تیتر، قیمت یا تصویر محصول، معطل برنامه‌نویس نباشند.
            </p>
            <p>
                رویکرد ما در استودیو سیدرضوی این است: <strong>پیاده‌سازی عمیق‌ترین قابلیت‌های طراحی و تجربه کاربری با تم‌ساز و ویجت‌های المنتور، به گونه‌ای که مدیریت آن برای هر کارفرمایی در نهایت سادگی و لذت‌بخشی باشد.</strong>
            </p>

            <h3 class="sr-content-heading-sm">اصول بنیادین در هر پروژه:</h3>
            <ul class="sr-check-list">
                <li>⚡ <strong>صفر درصد کدنویسی اضافی:</strong> کدهای تمیز و استاندارد PHP 8.2+ بدون استفاده از فریم‌ورک‌های سنگین فرانت.</li>
                <li>🎨 <strong>۶۶ پالت رنگی داینامیک:</strong> هماهنگی بی‌نظیر بصری با قابلیت جابجایی حالت روز و شب.</li>
                <li>🚀 <strong>سرعت سبز گوگل:</strong> کسب نمرات بالای ۹۵ در Core Web Vitals بدون نیاز به پلاگین‌های کثیف بهینه‌ساز.</li>
                <li>🛡️ <strong>شفافیت و رهگیری:</strong> سامانه آنلاین پیگیری با کد اختصاصی و پشتیبانی دلسوزانه.</li>
            </ul>

            <div class="sr-about-cta-box">
                <button type="button" class="sr-btn sr-btn-glow sr-open-consultation" data-modal="sr-consultation-modal">
                    <span>گفتگوی رایگان درباره پروژه شما</span>
                    <span class="sr-btn-arrow">&larr;</span>
                </button>
            </div>
        </div>

        <div class="sr-about-card">
            <div class="sr-profile-mock">
                <div class="sr-avatar-glow">⚡</div>
                <h3 class="sr-profile-name">سیدرضوی</h3>
                <span class="sr-profile-role">طراح ارشد المنتور و معمار UI/UX</span>
            </div>

            <div class="sr-skills-list">
                <div class="sr-skill-item">
                    <div class="sr-skill-meta">
                        <span>المنتور پرو و Theme Builder</span>
                        <span>۱۰۰٪</span>
                    </div>
                    <div class="sr-skill-bar"><div class="sr-bar-fill" style="width: 100%;"></div></div>
                </div>
                <div class="sr-skill-item">
                    <div class="sr-skill-meta">
                        <span>طراحی تجربه و رابط کاربری (UI/UX)</span>
                        <span>۹۵٪</span>
                    </div>
                    <div class="sr-skill-bar"><div class="sr-bar-fill" style="width: 95%;"></div></div>
                </div>
                <div class="sr-skill-item">
                    <div class="sr-skill-meta">
                        <span>بهینه‌سازی سرعت و لایت‌هاوس</span>
                        <span>۹۸٪</span>
                    </div>
                    <div class="sr-skill-bar"><div class="sr-bar-fill" style="width: 98%;"></div></div>
                </div>
                <div class="sr-skill-item">
                    <div class="sr-skill-meta">
                        <span>فروشگاه‌ساز ووکامرس بدون کدنویسی</span>
                        <span>۹۲٪</span>
                    </div>
                    <div class="sr-skill-bar"><div class="sr-bar-fill" style="width: 92%;"></div></div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
get_footer();
