<?php
/**
 * Template Name: Services
 *
 * Dedicated standalone services page showcasing detailed packages and capabilities.
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
        <span class="sr-badge-pill">سبد خدمات تخصصی</span>
        <h1 class="sr-page-title">طراحی لندینگ‌پیج و وب‌سایت‌های بدون کد</h1>
        <p class="sr-page-desc">انتخاب بهترین قالب و شیوه پیاده‌سازی متناسب با مقیاس و نیاز تجاری شما</p>
    </div>

    <div class="sr-services-detailed-list">
        <?php
        $services_query = new \WP_Query([
            'post_type'      => 'services',
            'posts_per_page' => 10,
            'post_status'    => 'publish',
        ]);

        if ($services_query->have_posts()) :
            while ($services_query->have_posts()) : $services_query->the_post();
                $price    = get_post_meta(get_the_ID(), '_sr_service_price', true);
                $delivery = get_post_meta(get_the_ID(), '_sr_service_delivery', true);
                $badge    = get_post_meta(get_the_ID(), '_sr_service_badge', true);
                $icon     = get_post_meta(get_the_ID(), '_sr_service_icon', true) ?: '⚡';
                $features = get_post_meta(get_the_ID(), '_sr_service_features', true);
                $feature_lines = !empty($features) ? array_filter(array_map('trim', explode("\n", $features))) : [];
                ?>
                <div class="sr-card sr-service-detail-card">
                    <div class="sr-service-detail-header">
                        <span class="sr-detail-icon"><?php echo esc_html($icon); ?></span>
                        <div>
                            <div style="display:flex; align-items:center; gap:10px;">
                                <h2 class="sr-detail-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                                <?php if (!empty($badge)) : ?>
                                    <span class="sr-service-badge" style="position:static;"><?php echo esc_html($badge); ?></span>
                                <?php endif; ?>
                            </div>
                            <?php if (!empty($price)) : ?>
                                <span class="sr-detail-lead" style="color:var(--sr-primary); font-weight:700;">تعرفه: <?php echo esc_html($price); ?></span>
                            <?php endif; ?>
                        </div>
                    </div>
                    <div class="sr-detail-text">
                        <?php the_excerpt(); ?>
                    </div>
                    <?php if (!empty($feature_lines)) : ?>
                        <ul class="sr-service-features" style="margin: 15px 0;">
                            <?php foreach ($feature_lines as $line) : ?>
                                <li>✓ <?php echo esc_html($line); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                    <div class="sr-detail-tags">
                        <?php if (!empty($delivery)) : ?>
                            <span class="sr-badge-pill">تحویل: <?php echo esc_html($delivery); ?></span>
                        <?php endif; ?>
                        <span class="sr-badge-pill">المنتور پرو اختصاصی</span>
                        <span class="sr-badge-pill">بدون ری‌اکت در فرانت</span>
                    </div>
                </div>
            <?php endwhile; wp_reset_postdata(); ?>
        <?php else : ?>
            <!-- Fallback Default Services Showcase -->
            <!-- Service 1 -->
            <div class="sr-card sr-service-detail-card">
                <div class="sr-service-detail-header">
                    <span class="sr-detail-icon">⚡</span>
                    <div>
                        <h2 class="sr-detail-title">طراحی لندینگ‌پیج‌های اختصاصی فروش و کمپین</h2>
                        <span class="sr-detail-lead">افزایش نرخ تبدیل تبلیغات کلیکی، ریتارگتینگ و رونمایی محصولات ویژه</span>
                    </div>
                </div>
                <p class="sr-detail-text">
                    صفحات فرود ما با تمرکز بر سرعت و روانشناسی تصمیم‌گیری کاربر طراحی می‌شوند. با بهره‌گیری از تیترهای گیرا، سلسله‌مراتب بصری اصولی و فرم‌های تعاملی با صدور آنی کد رهگیری، کاربر به سادگی به مشتری نهایی تبدیل می‌شود.
                </p>
                <div class="sr-detail-tags">
                    <span class="sr-badge-pill">تحویل ۳ روز کاری</span>
                    <span class="sr-badge-pill">المنتور پرو اختصاصی</span>
                    <span class="sr-badge-pill">بدون ری‌اکت در فرانت</span>
                </div>
            </div>

            <!-- Service 2 -->
            <div class="sr-card sr-service-detail-card">
                <div class="sr-service-detail-header">
                    <span class="sr-detail-icon">🏢</span>
                    <div>
                        <h2 class="sr-detail-title">وب‌سایت‌های شرکتی، هلدینگی و سازمانی</h2>
                        <span class="sr-detail-lead">معرفی خدمات، اعضای تیم، سوابق و سیستم تعامل با مشتریان</span>
                    </div>
                </div>
                <p class="sr-detail-text">
                    یکپارچه‌سازی کامل تمام صفحات سازمانی به کمک Elementor Theme Builder شامل هدرهای چسبان، فوترهای نئونی چندستونه، برگه درباره ما، قوانین و مقررات، و سیستم مقالات با نمایش همزمان ۳ تقویم هجری شمسی، میلادی و قمری.
                </p>
                <div class="sr-detail-tags">
                    <span class="sr-badge-pill">تحویل ۵ الی ۷ روز کاری</span>
                    <span class="sr-badge-pill">پورتال ورود کارفرما</span>
                    <span class="sr-badge-pill">طراحی ریسپانسیو بی‌نقص</span>
                </div>
            </div>

            <!-- Service 3 -->
            <div class="sr-card sr-service-detail-card">
                <div class="sr-service-detail-header">
                    <span class="sr-detail-icon">🛒</span>
                    <div>
                        <h2 class="sr-detail-title">فروشگاه‌های اینترنتی ووکامرس پیشرفته</h2>
                        <span class="sr-detail-lead">تجربه خرید سریع، درگاه‌های پرداخت بانکی مستقیم و صفحات محصول چشم‌نواز</span>
                    </div>
                </div>
                <p class="sr-detail-text">
                    فروشگاه‌های ساخته‌شده با این سیستم به گونه‌ای مهندسی می‌شوند که فرآیند خرید با کمترین کلیک ممکن انجام شود. استفاده از کش‌های هوشمند و حذف کدهای زاید باعث می‌شود کاربران در اوج ترافیک بدون هیچ کندی خرید کنند.
                </p>
                <div class="sr-detail-tags">
                    <span class="sr-badge-pill">تحویل ۱۰ الی ۱۲ روز کاری</span>
                    <span class="sr-badge-pill">تسویه حساب تک‌مرحله‌ای</span>
                    <span class="sr-badge-pill">اتصال پیامک و درگاه بانکی</span>
                </div>
            </div>
        <?php endif; ?>
    </div>

    <div class="sr-cta-banner-box text-center">
        <h3>نیاز به مشاوره اختصاصی دارید؟</h3>
        <p>مشخصات اولیه سایت را برای ما بفرستید تا سناریوی اجرایی و قیمت دقیق را در اختیارتان بگذاریم.</p>
        <button type="button" class="sr-btn sr-btn-glow sr-open-consultation" data-modal="sr-consultation-modal">
            <span>درخواست استعلام قیمت و زمان‌بندی</span>
            <span class="sr-btn-arrow">&larr;</span>
        </button>
    </div>
</div>

<?php
get_footer();
