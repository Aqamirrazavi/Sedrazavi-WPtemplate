<?php
/**
 * SedRazavi Designer Theme - Front Page Template
 *
 * Dedicated landing page for the WordPress No-Code Designer & Architect.
 * 100% Elementor-compatible: If built with Elementor, outputs Elementor canvas/content directly;
 * otherwise provides an out-of-the-box high-converting cyberpunk landing page.
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

// Check if page was edited/built via Elementor
$is_elementor = false;
if (class_exists('\Elementor\Plugin')) {
    $is_elementor = \Elementor\Plugin::$instance->documents->get(get_the_ID()) &&
                    \Elementor\Plugin::$instance->documents->get(get_the_ID())->is_built_with_elementor();
}

if ($is_elementor && have_posts()) {
    while (have_posts()) {
        the_post();
        the_content();
    }
} else {
    // Default High-Impact Cyberpunk No-Code Landing Showcase
    $telegram = get_theme_mod('sedrazavi_telegram_handle', '@sedrazavi');
    $eitaa    = get_theme_mod('sedrazavi_eitaa_handle', '@sedrazavi');
    ?>

    <!-- 1. Hero Section -->
    <section class="sr-hero-section" id="hero">
        <div class="sr-hero-glow-blob sr-blob-1"></div>
        <div class="sr-hero-glow-blob sr-blob-2"></div>

        <div class="sr-container sr-hero-container">
            <div class="sr-hero-badge">
                <span class="sr-badge-dot"></span>
                <span>معمار سیستم‌های بدون کدنویسی • لندینگ‌پیج‌های فوق‌سریع با المنتور</span>
            </div>

            <h1 class="sr-hero-title">
                طراحی وب‌سایت‌های نئونی، مدرن و پرفروش<br>
                <span class="sr-gradient-text">با قدرت المنتور</span>
                <span class="sr-typing-wrap">
                    و <span class="sr-typed-text" data-phrases='["معماری بدون کدنویسی", "سرعت لود زیر ۱ ثانیه", "۶۶ پالت رنگی داینامیک", "سیستم رهگیری اختصاصی", "پورتال تعاملی کارفرما"]'>معماری بدون کدنویسی</span>
                </span>
            </h1>

            <p class="sr-hero-subtitle">
                من سیدرضوی هستم؛ طراح ارشد رابط و تجربه کاربری (UI/UX) و معمار سیستم‌های وردپرسی بدون کدنویسی. به کسب‌وکارها کمک می‌کنم تا با صفحات فرود جذاب، ویجت‌های فوق‌حرفه‌ای و ساختار ۱۰۰٪ قابل ویرایش در المنتور، نرخ تبدیل مشتریان خود را چند برابر کنند.
            </p>

            <div class="sr-hero-actions">
                <button type="button" class="sr-btn sr-btn-glow sr-open-consultation" data-modal="sr-consultation-modal">
                    <span>⚡ ثبت سفارش فوری و دریافت کد رهگیری</span>
                    <span class="sr-btn-arrow">&larr;</span>
                </button>
                <a href="#portfolio" class="sr-btn sr-btn-outline">
                    <span>مشاهده نمونه‌کارهای منتخب</span>
                    <span class="sr-btn-icon">👁️</span>
                </a>
            </div>

            <!-- Live Status & Stats Bar -->
            <div class="sr-hero-status-strip">
                <div class="sr-status-tag">
                    <span class="sr-live-indicator"></span>
                    <span>وضعیت: <strong>آماده پذیرش پروژه</strong> (تحویل ۳ الی ۵ روزه)</span>
                </div>
                <div class="sr-hero-metrics">
                    <div class="sr-metric-item">
                        <span class="sr-metric-val">+۱۲۰</span>
                        <span class="sr-metric-lbl">پروژه موفق</span>
                    </div>
                    <div class="sr-metric-sep">/</div>
                    <div class="sr-metric-item">
                        <span class="sr-metric-val">۹۹.۸٪</span>
                        <span class="sr-metric-lbl">رضایت کارفرمایان</span>
                    </div>
                    <div class="sr-metric-sep">/</div>
                    <div class="sr-metric-item">
                        <span class="sr-metric-val">۰ خط</span>
                        <span class="sr-metric-lbl">کدنویسی پیچیده برای شما</span>
                    </div>
                    <div class="sr-metric-sep">/</div>
                    <div class="sr-metric-item">
                        <span class="sr-metric-val">۱۰۰٪</span>
                        <span class="sr-metric-lbl">سازگار با المنتور پرو</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 2. Bento Grid: Core Value & Superpowers -->
    <section class="sr-section sr-bento-section" id="capabilities">
        <div class="sr-container">
            <div class="sr-section-header text-center">
                <span class="sr-badge-pill">چرا سیدرضوی استودیو؟</span>
                <h2 class="sr-section-title">معماری سایت مدرن بدون درگیر شدن با کد</h2>
                <p class="sr-section-desc">
                    تمام اجزا به صورت اختصاصی با استانداردهای رسمی المنتور ساخته شده‌اند تا پس از تحویل، مدیریت تمام بخش‌ها برای شما مثل آب خوردن باشد.
                </p>
            </div>

            <div class="sr-bento-grid">
                <!-- Bento 1: Large Feature -->
                <div class="sr-bento-card sr-bento-lg">
                    <div class="sr-card-icon">⚡</div>
                    <h3 class="sr-card-title">۱۰۰٪ بدون کدنویسی و با نهایت انعطاف</h3>
                    <p class="sr-card-text">
                        تمام تیترها، تصاویر، پالت‌های رنگی و فرم‌ها به کمک کنترل‌های استاندارد المنتور و Theme Builder طراحی شده‌اند. شما هیچ نیازی به دانش برنامه‌نویسی، ری‌اکت یا ویرایش فایل‌های پیچیده نخواهید داشت.
                    </p>
                    <div class="sr-code-free-demo">
                        <span class="sr-badge-pill">المنتور سازگار</span>
                        <span class="sr-badge-pill">بدون ری‌اکت فرانت</span>
                        <span class="sr-badge-pill">PHP بومی و سبک</span>
                    </div>
                </div>

                <!-- Bento 2: 66 Palettes -->
                <div class="sr-bento-card">
                    <div class="sr-card-icon">🎨</div>
                    <h3 class="sr-card-title">موتور ۶۶ پالت رنگی</h3>
                    <p class="sr-card-text">
                        ۳۳ پالت تاریک نئونی و ۳۳ پالت روشن مدرن با تغییر در لحظه بدون رفرش، ذخیره در مرورگر و هماهنگ با سیستم کاربر.
                    </p>
                    <div class="sr-palette-swatches-preview">
                        <span class="sr-swatch sr-swatch-1"></span>
                        <span class="sr-swatch sr-swatch-2"></span>
                        <span class="sr-swatch sr-swatch-3"></span>
                        <span class="sr-swatch sr-swatch-4"></span>
                        <span class="sr-swatch sr-swatch-5"></span>
                    </div>
                </div>

                <!-- Bento 3: Tracking & Portal -->
                <div class="sr-bento-card">
                    <div class="sr-card-icon">🔍</div>
                    <h3 class="sr-card-title">رهگیری آنلاین پروژه (SR-XXXXX)</h3>
                    <p class="sr-card-text">
                        هر سفارش یک کد اختصاصی دریافت می‌کند تا کارفرما بتواند مراحل وایرفریم، طراحی المنتور، بازبینی و تحویل نهایی را لحظه‌ای پیگیری کند.
                    </p>
                    <a href="<?php echo esc_url(home_url('/track-order/')); ?>" class="sr-card-link">بررسی سامانه رهگیری &larr;</a>
                </div>

                <!-- Bento 4: Green Core Web Vitals -->
                <div class="sr-bento-card">
                    <div class="sr-card-icon">🚀</div>
                    <h3 class="sr-card-title">سرعت خارق‌العاده (Core Web Vitals)</h3>
                    <p class="sr-card-text">
                        فونت‌های بومی وب‌فونت وزیرمتن بدون اتکا به CDN خارجی، CSS متغیرهای سبک، بدون اسکریپت‌های سنگین و بارگذاری کمتر از یک ثانیه.
                    </p>
                    <div class="sr-speed-stat">
                        <span class="sr-speed-circle">۹۸</span>
                        <span>امتیاز گوگل لایت‌هاوس</span>
                    </div>
                </div>

                <!-- Bento 5: Interactive Elementor Widgets -->
                <div class="sr-bento-card sr-bento-lg">
                    <div class="sr-card-icon">🎮</div>
                    <h3 class="sr-card-title">ویجت‌های تعاملی و اختصاصی المنتور</h3>
                    <p class="sr-card-text">
                        چهار ویجت اختصاصی شامل کره سه‌بعدی ساعت جهانی، بازی دایناسور نئونی کروم، موزیک‌پلیر سایبرپانک و تقویم سه‌گانه هوشمند (شمسی/میلادی/قمری) برای ماندگاری کاربر در سایت.
                    </p>
                    <div class="sr-widgets-mini-list">
                        <span class="sr-tag-pill">🌐 World Globe 3D</span>
                        <span class="sr-tag-pill">🦖 Cyber Dino Runner</span>
                        <span class="sr-tag-pill">🎵 Cyberpunk Music Player</span>
                        <span class="sr-tag-pill">⏰ Chrono Triple Clock</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 3. Services Showcase -->
    <section class="sr-section sr-services-section" id="services">
        <div class="sr-container">
            <div class="sr-section-header text-center">
                <span class="sr-badge-pill">خدمات تخصصی</span>
                <h2 class="sr-section-title">راهکارهای طراحی وب برای کسب‌وکارهای بلندپرواز</h2>
                <p class="sr-section-desc">پروژه‌های طراحی از صفر تا صد با بالاترین استانداردهای رابط کاربری و عملکردی تحویل داده می‌شوند.</p>
            </div>

            <div class="sr-services-grid">
                <!-- Service 1 -->
                <div class="sr-service-card">
                    <div class="sr-service-badge">پرطرفدار</div>
                    <div class="sr-service-icon">⚡</div>
                    <h3 class="sr-service-title">لندینگ‌پیج با نرخ تبدیل بالا</h3>
                    <p class="sr-service-desc">
                        صفحات فرود اختصاصی برای کمپین‌های تبلیغاتی، معرفی دوره‌ها یا محصولات ویژه با معماری روان‌شناختی فروش و افکت‌های نئونی چشم‌نواز.
                    </p>
                    <ul class="sr-service-features">
                        <li>✓ طراحی ۱۰۰٪ اختصاصی در المنتور</li>
                        <li>✓ سازگاری کامل با موبایل و تبلت</li>
                        <li>✓ سیستم رهگیری لیدها و پیامک آنی</li>
                        <li>✓ لودینگ زیر ۸۰۰ میلی‌ثانیه</li>
                    </ul>
                    <button type="button" class="sr-btn sr-btn-sm sr-btn-outline sr-open-consultation" data-modal="sr-consultation-modal">ثبت درخواست لندینگ &larr;</button>
                </div>

                <!-- Service 2 -->
                <div class="sr-service-card sr-featured-card">
                    <div class="sr-service-badge sr-badge-primary">پیشنهاد ویژه</div>
                    <div class="sr-service-icon">🏢</div>
                    <h3 class="sr-service-title">وب‌سایت شرکتی مدرن و هویت برند</h3>
                    <p class="sr-service-desc">
                        طراحی کامل سایت سازمانی شامل برگه خانه، درباره ما، خدمات، سبد نمونه‌کارها، تماس نئونی، همراه با پورتال ورود اختصاصی کارفرمایان.
                    </p>
                    <ul class="sr-service-features">
                        <li>✓ ساخت تمام بخش‌ها با Elementor Theme Builder</li>
                        <li>✓ قالب اختصاصی وبلاگ و بایگانی با ۳ تقویم</li>
                        <li>✓ فرم استعلام قیمت هوشمند با کد رهگیری</li>
                        <li>✓ آموزش ویدئویی مدیریت بدون کدنویسی</li>
                    </ul>
                    <button type="button" class="sr-btn sr-btn-sm sr-btn-glow sr-open-consultation" data-modal="sr-consultation-modal">سفارش سایت شرکتی ⚡</button>
                </div>

                <!-- Service 3 -->
                <div class="sr-service-card">
                    <div class="sr-service-badge">فروشگاهی</div>
                    <div class="sr-service-icon">🛒</div>
                    <h3 class="sr-service-title">فروشگاه آنلاین بدون کدنویسی</h3>
                    <p class="sr-service-desc">
                        راه‌اندازی کامل ووکامرس با صفحات محصول اختصاصی المنتوری، تسویه‌حساب تک‌مرحله‌ای، درگاه بانکی مستقیم و تجربه کاربری مینیمال.
                    </p>
                    <ul class="sr-service-features">
                        <li>✓ آرشیو و کارت‌های محصول سفارشی نئونی</li>
                        <li>✓ سبد خرید شناور و تسویه حساب سریع</li>
                        <li>✓ پنل کاربری شیک و ارسال نوتیفیکیشن</li>
                        <li>✓ امنیت کامل و بهینه‌سازی دیتابیس</li>
                    </ul>
                    <button type="button" class="sr-btn sr-btn-sm sr-btn-outline sr-open-consultation" data-modal="sr-consultation-modal">سفارش فروشگاه &larr;</button>
                </div>
            </div>
        </div>
    </section>

    <!-- 4. Interactive Widgets Live Playground -->
    <section class="sr-section sr-interactive-section" id="widgets-playground">
        <div class="sr-container">
            <div class="sr-section-header text-center">
                <span class="sr-badge-pill">ابزارهای اختصاصی المنتور</span>
                <h2 class="sr-section-title">ویجت‌های تعاملی ساخته‌شده برای این اکوسیستم</h2>
                <p class="sr-section-desc">این ویجت‌ها مستقیماً در پنل ویرایشگر المنتور در دسترس طراح بوده و با کنترل‌های بصری قابل شخصی‌سازی هستند.</p>
            </div>

            <div class="sr-widgets-grid">
                <!-- Widget 1: Chrono Clock -->
                <div class="sr-widget-box">
                    <div class="sr-widget-box-header">
                        <span class="sr-box-icon">⏰</span>
                        <h4 class="sr-box-title">ساعت هوشمند و تقویم سه‌گانه (Chrono Widget)</h4>
                    </div>
                    <div class="sr-chrono-live" id="sr-front-chrono">
                        <div class="sr-live-time" id="sr-clock-time">--:--:--</div>
                        <div class="sr-live-dates">
                            <span class="sr-date-tag" id="sr-date-jalali">تقویم شمسی</span>
                            <span class="sr-date-tag" id="sr-date-gregorian">Gregorian</span>
                            <span class="sr-date-tag" id="sr-date-hijri">التقویم الهجری</span>
                        </div>
                    </div>
                </div>

                <!-- Widget 2: Cyber Dino Runner -->
                <div class="sr-widget-box">
                    <div class="sr-widget-box-header">
                        <span class="sr-box-icon">🦖</span>
                        <h4 class="sr-box-title">بازی دایناسور نئونی سایبرپانک (Cyber Dino)</h4>
                    </div>
                    <div class="sr-dino-teaser">
                        <div class="sr-dino-canvas-mock">
                            <div class="sr-dino-char">🦖</div>
                            <div class="sr-dino-obstacle">⚡</div>
                            <div class="sr-dino-ground"></div>
                        </div>
                        <p class="sr-dino-note">ویجت کامل همراه با فیزیک پرش، جلوه‌های صوتی Web Audio و جدول امتیازات در المنتور فعال است.</p>
                    </div>
                </div>

                <!-- Widget 3: Cyberpunk Music Player -->
                <div class="sr-widget-box">
                    <div class="sr-widget-box-header">
                        <span class="sr-box-icon">🎵</span>
                        <h4 class="sr-box-title">موزیک‌پلیر سایبرپانک و اکولایزر امواج صوتی</h4>
                    </div>
                    <div class="sr-player-teaser">
                        <div class="sr-wave-visualizer">
                            <span class="sr-bar"></span><span class="sr-bar"></span><span class="sr-bar"></span>
                            <span class="sr-bar"></span><span class="sr-bar"></span><span class="sr-bar"></span>
                            <span class="sr-bar"></span><span class="sr-bar"></span><span class="sr-bar"></span>
                        </div>
                        <div class="sr-player-info">
                            <span class="sr-track-title">Cyber Synthwave Pulse</span>
                            <span class="sr-track-artist">SedRazavi Studio Soundtrack</span>
                        </div>
                    </div>
                </div>

                <!-- Widget 4: World Globe Clock -->
                <div class="sr-widget-box">
                    <div class="sr-widget-box-header">
                        <span class="sr-box-icon">🌐</span>
                        <h4 class="sr-box-title">کره سه‌بعدی ساعت پایتخت‌های جهان</h4>
                    </div>
                    <div class="sr-globe-teaser">
                        <div class="sr-globe-ring">
                            <div class="sr-globe-core">🌍</div>
                        </div>
                        <div class="sr-city-chips">
                            <span>تهران: <strong id="sr-city-tehran">--:--</strong></span>
                            <span>دبی: <strong id="sr-city-dubai">--:--</strong></span>
                            <span>لندن: <strong id="sr-city-london">--:--</strong></span>
                            <span>نیویورک: <strong id="sr-city-ny">--:--</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 5. Portfolio Showcase -->
    <section class="sr-section sr-portfolio-section" id="portfolio">
        <div class="sr-container">
            <div class="sr-section-header text-center">
                <span class="sr-badge-pill">نمونه‌کارهای منتخب</span>
                <h2 class="sr-section-title">طراحی‌های زنده و پروژه‌های تحویل‌شده</h2>
                <p class="sr-section-desc">پروژه‌هایی که با تمرکز روی زیبایی بصری، هویت نئونی و سرعت بارگذاری فوق‌العاده پیاده‌سازی شده‌اند.</p>
            </div>

            <div class="sr-portfolio-grid">
                <!-- Project 1 -->
                <div class="sr-portfolio-card">
                    <div class="sr-portfolio-thumb">
                        <div class="sr-thumb-mockup">
                            <span class="sr-badge-pill sr-badge-sm">لندینگ‌پیج</span>
                            <div class="sr-mockup-inner">⚡ نئون سایبر صرافی ارز دیجیتال</div>
                        </div>
                    </div>
                    <div class="sr-portfolio-info">
                        <h3 class="sr-portfolio-title">پلتفرم تبادل کریپتوکارنسی CyberEx</h3>
                        <p class="sr-portfolio-desc">لندینگ‌پیج با طراحی دارک نئونی، اتصال به وب‌سوکت قیمت لحظه‌ای و نرخ تبدیل ۲۴ درصدی.</p>
                        <div class="sr-portfolio-tags">
                            <span>المنتور پرو</span>
                            <span>پالت Cyan Neon</span>
                            <span>لود ۶۰۰ میلی‌ثانیه</span>
                        </div>
                    </div>
                </div>

                <!-- Project 2 -->
                <div class="sr-portfolio-card">
                    <div class="sr-portfolio-thumb">
                        <div class="sr-thumb-mockup">
                            <span class="sr-badge-pill sr-badge-sm">شرکتی و حقوقی</span>
                            <div class="sr-mockup-inner">⚖️ پرتال وکالت و مشاوره آنلاین</div>
                        </div>
                    </div>
                    <div class="sr-portfolio-info">
                        <h3 class="sr-portfolio-title">موسسه حقوقی و داوری بین‌المللی</h3>
                        <p class="sr-portfolio-desc">سیستم نوبت‌دهی آنلاین، سامانه رهگیری پرونده‌های حقوقی و تم‌ساز چندمنظوره.</p>
                        <div class="sr-portfolio-tags">
                            <span>پورتال کارفرما</span>
                            <span>Theme Builder</span>
                            <span>بدون کدنویسی</span>
                        </div>
                    </div>
                </div>

                <!-- Project 3 -->
                <div class="sr-portfolio-card">
                    <div class="sr-portfolio-thumb">
                        <div class="sr-thumb-mockup">
                            <span class="sr-badge-pill sr-badge-sm">فروشگاهی</span>
                            <div class="sr-mockup-inner">🎧 استور تجهیزات استودیویی و گیمینگ</div>
                        </div>
                    </div>
                    <div class="sr-portfolio-info">
                        <h3 class="sr-portfolio-title">فروشگاه آنلاین تخصصی SoundWave</h3>
                        <p class="sr-portfolio-desc">فروشگاه مجهز به پیش‌نمایش صوتی محصولات، فیلتر در لحظه ووکامرس و رابط نئونی بنفش.</p>
                        <div class="sr-portfolio-tags">
                            <span>ووکامرس مدرن</span>
                            <span>تسویه یک‌مرحله‌ای</span>
                            <span>Core Web Vitals ۹۹</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 6. Transparent Pricing / Packages -->
    <section class="sr-section sr-pricing-section" id="pricing">
        <div class="sr-container">
            <div class="sr-section-header text-center">
                <span class="sr-badge-pill">تعرفه‌ها و شفافیت مالی</span>
                <h2 class="sr-section-title">سرمایه‌گذاری روی هویت آنلاین کسب‌وکار شما</h2>
                <p class="sr-section-desc">بدون هزینه‌های پنهان؛ تحویل منظم با پشتیبانی اختصاصی و مستندات ویدئویی کامل.</p>
            </div>

            <div class="sr-pricing-grid">
                <!-- Plan 1 -->
                <div class="sr-pricing-card">
                    <h3 class="sr-plan-name">لندینگ‌پیج سریع (Quick Launch)</h3>
                    <div class="sr-plan-price">از ۷.۵ <span class="sr-price-unit">میلیون تومان</span></div>
                    <p class="sr-plan-lead">مناسب کمپین‌های فصلی، معرفی دوره‌ها، همایش‌ها یا فروش محصول خاص.</p>
                    <ul class="sr-plan-list">
                        <li>✓ طراحی صفحه فرود تک‌صفحه‌ای با المنتور</li>
                        <li>✓ تنظیم فرم دریافت لید با کد رهگیری اختصاصی</li>
                        <li>✓ بهینه‌سازی نمایش در تمام سایزهای موبایل</li>
                        <li>✓ زمان تحویل: ۳ روز کاری</li>
                    </ul>
                    <button type="button" class="sr-btn sr-btn-sm sr-btn-outline sr-btn-full sr-open-consultation" data-modal="sr-consultation-modal">انتخاب پکیج لندینگ</button>
                </div>

                <!-- Plan 2 -->
                <div class="sr-pricing-card sr-pricing-featured">
                    <div class="sr-plan-ribbon">انتخاب اول کارفرمایان</div>
                    <h3 class="sr-plan-name">وب‌سایت جامع شرکتی و خدماتی</h3>
                    <div class="sr-plan-price">از ۱۴.۵ <span class="sr-price-unit">میلیون تومان</span></div>
                    <p class="sr-plan-lead">طراحی هویت بصری کامل شرکت، صفحات خدمات و پورتال اختصاصی تعامل با مشتریان.</p>
                    <ul class="sr-plan-list">
                        <li>✓ طراحی ۵ الی ۸ برگه اختصاصی با Theme Builder</li>
                        <li>✓ سامانه رهگیری آنلاین درخواست با کد SR-XXXXX</li>
                        <li>✓ وبلاگ و سیستم مقالات با ۳ تقویم هوشمند</li>
                        <li>✓ آموزش ویدئویی کامل برای تیم اداری شما</li>
                        <li>✓ زمان تحویل: ۵ الی ۷ روز کاری</li>
                    </ul>
                    <button type="button" class="sr-btn sr-btn-sm sr-btn-glow sr-btn-full sr-open-consultation" data-modal="sr-consultation-modal">ثبت سفارش شرکتی ⚡</button>
                </div>

                <!-- Plan 3 -->
                <div class="sr-pricing-card">
                    <h3 class="sr-plan-name">فروشگاه آنلاین ووکامرس اختصاصی</h3>
                    <div class="sr-plan-price">از ۲۱ <span class="sr-price-unit">میلیون تومان</span></div>
                    <p class="sr-plan-lead">فروشگاهی کامل با تجربه خرید کم‌نظیر، فیلترهای آنی و درگاه پرداخت مستقیم.</p>
                    <ul class="sr-plan-list">
                        <li>✓ طراحی صفحات کاتالوگ، محصول تکی و تسویه</li>
                        <li>✓ اتصال درگاه‌های بانکی و پیامک اطلاع‌رسانی</li>
                        <li>✓ سرعت بارگذاری ویژه فروشگاه‌های پرترافیک</li>
                        <li>✓ زمان تحویل: ۱۰ الی ۱۲ روز کاری</li>
                    </ul>
                    <button type="button" class="sr-btn sr-btn-sm sr-btn-outline sr-btn-full sr-open-consultation" data-modal="sr-consultation-modal">انتخاب پکیج فروشگاهی</button>
                </div>
            </div>
        </div>
    </section>

    <!-- 7. FAQ Section with Schema-ready structure -->
    <section class="sr-section sr-faq-section" id="faq">
        <div class="sr-container sr-faq-container">
            <div class="sr-section-header text-center">
                <span class="sr-badge-pill">سوالات متداول</span>
                <h2 class="sr-section-title">پاسخ به سوالات پرتکرار کارفرمایان</h2>
                <p class="sr-section-desc">شفافیت کامل در فرآیند طراحی، تحویل و پشتیبانی</p>
            </div>

            <div class="sr-accordion">
                <details class="sr-faq-item" open>
                    <summary class="sr-faq-question">
                        <span>آیا بعد از تحویل سایت، برای ویرایش متون و تصاویر نیاز به کدنویسی دارم؟</span>
                        <span class="sr-faq-icon">+</span>
                    </summary>
                    <div class="sr-faq-answer">
                        <p>خیر، به هیچ وجه! این پروژه بر پایه معماری بدون کدنویسی (No-Code) با المنتور ساخته شده است. شما می‌توانید با کشیدن و رها کردن (Drag & Drop) در المنتور هر متن، تصویر یا رنگی را فوراً تغییر دهید.</p>
                    </div>
                </details>

                <details class="sr-faq-item">
                    <summary class="sr-faq-question">
                        <span>سیستم رهگیری پروژه (کد SR-XXXXX) چگونه کار می‌کند؟</span>
                        <span class="sr-faq-icon">+</span>
                    </summary>
                    <div class="sr-faq-answer">
                        <p>بلافاصله پس از ثبت سفارش در فرم، یک کد رهگیری اختصاصی مانند SR-84920 به شما نمایش داده می‌شود. با وارد کردن این کد در برگه «رهگیری سفارش»، وضعیت فعلی پروژه (طراحی وایرفریم، آماده‌سازی المنتور، بازبینی نهایی و تحویل) برای شما قابل مشاهده است.</p>
                    </div>
                </details>

                <details class="sr-faq-item">
                    <summary class="sr-faq-question">
                        <span>آیا امکان تغییر رنگ‌بندی و پالت‌های سایت وجود دارد؟</span>
                        <span class="sr-faq-icon">+</span>
                    </summary>
                    <div class="sr-faq-answer">
                        <p>بله! این پوسته دارای موتور ۶۶ پالت رنگی (۳۳ تم تاریک نئونی و ۳۳ تم روشن مدرن) است. همچنین در بخش سفارشی‌ساز وردپرس و تنظیمات عمومی المنتور (Global Kit) به راحتی می‌توانید رنگ‌های سازمان خود را ست کنید.</p>
                    </div>
                </details>

                <details class="sr-faq-item">
                    <summary class="sr-faq-question">
                        <span>آیا این پوسته چایلد تم است یا یک تم اختصاصی مستقل؟</span>
                        <span class="sr-faq-icon">+</span>
                    </summary>
                    <div class="sr-faq-answer">
                        <p>این پوسته ۱۰۰٪ مستقل و اختصاصی است و هیچ وابستگی به چایلد تم یا پوسته‌های والد ندارد. این ساختار تضمین می‌کند که پروژه شما فوق‌العاده پایدار، قابل حمل و سبک باشد.</p>
                    </div>
                </details>
            </div>
        </div>
    </section>

    <!-- 8. Consultation Banner CTA -->
    <section class="sr-section sr-cta-banner-section" id="contact">
        <div class="sr-container">
            <div class="sr-cta-box">
                <div class="sr-cta-content">
                    <span class="sr-badge-pill">همین حالا شروع کنید</span>
                    <h2 class="sr-cta-title">آماده‌اید وب‌سایت بعدی‌تان را با هم خلق کنیم؟</h2>
                    <p class="sr-cta-desc">
                        کافیست فرم مشاوره را پر کنید یا از طریق تلگرام و ایتا پیام دهید تا در کمتر از ۲ ساعت مشاوره اولیه را شروع کنیم.
                    </p>
                    <div class="sr-cta-btns">
                        <button type="button" class="sr-btn sr-btn-glow sr-open-consultation" data-modal="sr-consultation-modal">
                            <span>ثبت آنلاین مشخصات پروژه</span>
                            <span class="sr-btn-arrow">&larr;</span>
                        </button>
                        <a href="https://t.me/<?php echo esc_attr(ltrim($telegram, '@')); ?>" target="_blank" rel="noopener noreferrer" class="sr-btn sr-btn-outline">
                            <span>ارتباط در تلگرام (<?php echo esc_html($telegram); ?>)</span>
                        </a>
                        <a href="https://eitaa.com/<?php echo esc_attr(ltrim($eitaa, '@')); ?>" target="_blank" rel="noopener noreferrer" class="sr-btn sr-btn-outline">
                            <span>ارتباط در ایتا (<?php echo esc_html($eitaa); ?>)</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <?php
}

get_footer();
