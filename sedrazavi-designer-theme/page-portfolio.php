<?php
/**
 * Template Name: Portfolio
 *
 * Dedicated standalone portfolio gallery with category filter and tech tags.
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
        <span class="sr-badge-pill">نمونه‌کارهای زنده</span>
        <h1 class="sr-page-title">ویترین پروژه‌های طراحی وب بدون کدنویسی</h1>
        <p class="sr-page-desc">مجموعه‌ای از صفحات فرود با نرخ تبدیل بالا، سایت‌های شرکتی و فروشگاه‌های موفق</p>
    </div>

    <!-- Category Filters -->
    <div class="sr-portfolio-filter-bar">
        <button type="button" class="sr-filter-btn is-active" data-filter="all">همه پروژه‌ها</button>
        <button type="button" class="sr-filter-btn" data-filter="landing">لندینگ‌پیج</button>
        <button type="button" class="sr-filter-btn" data-filter="corporate">سایت شرکتی</button>
        <button type="button" class="sr-filter-btn" data-filter="shop">فروشگاه آنلاین</button>
    </div>

    <div class="sr-portfolio-grid" id="sr-portfolio-items">
        <!-- Project 1 -->
        <div class="sr-portfolio-card" data-category="landing">
            <div class="sr-portfolio-thumb">
                <div class="sr-thumb-mockup">
                    <span class="sr-badge-pill sr-badge-sm">لندینگ‌پیج</span>
                    <div class="sr-mockup-inner">⚡ نئون سایبر کریپتو صرافی</div>
                </div>
            </div>
            <div class="sr-portfolio-info">
                <h3 class="sr-portfolio-title">پلتفرم تبادل کریپتوکارنسی CyberEx</h3>
                <p class="sr-portfolio-desc">صفحه فرود با معماری سایبرپانک و جلوه‌های نئونی با اتصال به وب‌سوکت قیمت ارز دیجیتال.</p>
                <div class="sr-portfolio-tags">
                    <span>المنتور پرو</span>
                    <span>Cyan Neon</span>
                    <span>نرخ تبدیل ۲۴٪</span>
                </div>
            </div>
        </div>

        <!-- Project 2 -->
        <div class="sr-portfolio-card" data-category="corporate">
            <div class="sr-portfolio-thumb">
                <div class="sr-thumb-mockup">
                    <span class="sr-badge-pill sr-badge-sm">شرکتی</span>
                    <div class="sr-mockup-inner">⚖️ پرتال داوری و حقوقی بین‌الملل</div>
                </div>
            </div>
            <div class="sr-portfolio-info">
                <h3 class="sr-portfolio-title">موسسه حقوقی و داوری تخصصی دادپویان</h3>
                <p class="sr-portfolio-desc">طراحی سازمانی با فرم استعلام هوشمند، سیستم نوبت‌دهی و سامانه پیگیری پرونده.</p>
                <div class="sr-portfolio-tags">
                    <span>Theme Builder</span>
                    <span>فرم پیگیری SR</span>
                    <span>بدون کدنویسی</span>
                </div>
            </div>
        </div>

        <!-- Project 3 -->
        <div class="sr-portfolio-card" data-category="shop">
            <div class="sr-portfolio-thumb">
                <div class="sr-thumb-mockup">
                    <span class="sr-badge-pill sr-badge-sm">فروشگاهی</span>
                    <div class="sr-mockup-inner">🎧 تجهیزات استودیویی و گیمینگ</div>
                </div>
            </div>
            <div class="sr-portfolio-info">
                <h3 class="sr-portfolio-title">فروشگاه آنلاین تخصصی SoundWave</h3>
                <p class="sr-portfolio-desc">فروشگاه مجهز به پیش‌نمایش صوتی محصولات، فیلتر در لحظه و تسویه‌حساب تک‌مرحله‌ای.</p>
                <div class="sr-portfolio-tags">
                    <span>ووکامرس مدرن</span>
                    <span>پالت بنفش نئونی</span>
                    <span>سرعت لود ۹۸</span>
                </div>
            </div>
        </div>

        <!-- Project 4 -->
        <div class="sr-portfolio-card" data-category="landing">
            <div class="sr-portfolio-thumb">
                <div class="sr-thumb-mockup">
                    <span class="sr-badge-pill sr-badge-sm">لندینگ‌پیج</span>
                    <div class="sr-mockup-inner">🎓 دوره آموزشی آکادمی وب‌مستری</div>
                </div>
            </div>
            <div class="sr-portfolio-info">
                <h3 class="sr-portfolio-title">صفحه فرود معرفی دوره جامع No-Code</h3>
                <p class="sr-portfolio-desc">لندینگ با تایمر معکوس، پیش‌نمایش سرفصل‌ها با آکاردئون‌های نئونی و اتصال مستقیم به زرین‌پال.</p>
                <div class="sr-portfolio-tags">
                    <span>تایمر نئونی</span>
                    <span>ساعت ۳ تقویمی</span>
                    <span>فروش ۱۲۰۰ نسخه</span>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
get_footer();
