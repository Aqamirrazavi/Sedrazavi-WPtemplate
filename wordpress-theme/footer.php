<?php
/**
 * The template for displaying the footer
 * Completely agnostic and dynamic for all archetypes.
 *
 * @package SedRazavi
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
</main><!-- #main-content -->

<?php
// Elementor Theme Builder Footer Location support
if ( function_exists('elementor_theme_do_location') && elementor_theme_do_location('footer') ) {
    wp_footer();
    echo '</body></html>';
    return;
}
?>

<?php
$allowed_footers  = ['modern-cards', 'minimal-dark', 'corporate-grid', 'compact-inline'];
$footer_archetype = get_option('sedrazavi_footer_style', 'modern-cards');
if (!in_array($footer_archetype, $allowed_footers, true)) {
    $footer_archetype = 'modern-cards';
}

// Allow preview only for authorized staff or in customizer
if (isset($_GET['footer_style']) && in_array($_GET['footer_style'], $allowed_footers, true)) {
    if (current_user_can('edit_theme_options') || is_customize_preview()) {
        $footer_archetype = sanitize_key($_GET['footer_style']);
        if (!has_action('wp_head', 'wp_robots_no_robots')) {
            add_action('wp_head', 'wp_robots_no_robots', 1);
        }
    }
}

$footer_bio = get_theme_mod('sedrazavi_footer_bio', get_bloginfo('description'));
?>
<footer id="colophon" class="site-footer footer-archetype-<?php echo esc_attr($footer_archetype); ?> bg-sr-bg text-sr-primary pt-16 pb-8 border-t border-sr-border relative overflow-hidden" data-footer-archetype="<?php echo esc_attr($footer_archetype); ?>">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-sr-border-subtle">
            
            <!-- ستون ۱: برندینگ و توصیف سازمانی -->
            <div class="space-y-4">
                <div class="flex items-center gap-3">
                    <?php if (has_custom_logo()): ?>
                        <div class="custom-footer-logo">
                            <?php the_custom_logo(); ?>
                        </div>
                    <?php else: ?>
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-white shadow-md shadow-[#D4AF37]/20">
                            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                                <polyline points="2 17 12 22 22 17"/>
                                <polyline points="2 12 12 17 22 12"/>
                            </svg>
                        </div>
                        <div>
                            <span class="text-lg font-bold font-serif text-sr-primary"><?php bloginfo('name'); ?></span>
                            <p class="text-[10px] text-sr-gold"><?php bloginfo('description'); ?></p>
                        </div>
                    <?php endif; ?>
                </div>

                <p class="text-sr-muted text-xs leading-relaxed">
                    <?php echo esc_html($footer_bio ?: 'پلتفرم جامع، مدرن و بهینه‌سازی‌شده برای وب‌سایت‌های حرفه‌ای با پشتیبانی کامل از استانداردهای نوین تجربه کاربری و سئو.'); ?>
                </p>

                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sr-surface border border-sr-border-subtle text-xs text-sr-gold">
                    <svg class="w-3.5 h-3.5 text-sr-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span>توسعه‌یافته با معماری ماژولار و امن</span>
                </div>
            </div>

            <!-- ستون ۲: خدمات و دسترسی سریع -->
            <div>
                <?php if (is_active_sidebar('sidebar-footer-1')): ?>
                    <?php dynamic_sidebar('sidebar-footer-1'); ?>
                <?php else: ?>
                    <h4 class="text-base font-bold text-sr-primary mb-4 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
                        دسترسی سریع به خدمات
                    </h4>
                    <ul class="space-y-2.5 text-xs text-sr-muted">
                        <li><a href="<?php echo esc_url(home_url('/#services')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> مشاوره و برنامه‌ریزی راهبردی</a></li>
                        <li><a href="<?php echo esc_url(home_url('/#services')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> طراحی و پیاده‌سازی پلتفرم</a></li>
                        <li><a href="<?php echo esc_url(home_url('/#services')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> پشتیبانی و توسعه یکپارچه</a></li>
                        <li><a href="<?php echo esc_url(home_url('/#portfolio')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> آرشیو پروژه‌ها و نمونه‌کارها</a></li>
                        <li><a href="<?php echo esc_url(home_url('/#pricing')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> تعرفه‌ها و پلن‌های خدمات</a></li>
                    </ul>
                <?php endif; ?>
            </div>

            <!-- ستون ۳: پیوندهای مفید سامانه -->
            <div>
                <?php if (is_active_sidebar('sidebar-footer-2')): ?>
                    <?php dynamic_sidebar('sidebar-footer-2'); ?>
                <?php else: ?>
                    <h4 class="text-base font-bold text-sr-primary mb-4 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
                        پیوندهای مفید سامانه
                    </h4>
                    <ul class="space-y-2.5 text-xs text-sr-muted">
                        <li><a href="<?php echo esc_url(home_url('/#about')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> درباره ما و خط‌مشی کیفیت</a></li>
                        <li><a href="<?php echo esc_url(home_url('/#articles')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> جدیدترین یادداشت‌ها و مقالات</a></li>
                        <li><a href="<?php echo esc_url(home_url('/#faq')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> پرسش‌های متداول کاربران</a></li>
                        <li><a href="<?php echo esc_url(home_url('/#contact')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> اطلاعات تماس و نشانی</a></li>
                        <li><a href="<?php echo esc_url(home_url('/privacy-policy')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> حریم خصوصی و امنیت داده‌ها</a></li>
                    </ul>
                <?php endif; ?>
            </div>

            <!-- ستون ۴: ارتباط و خبرنامه -->
            <div class="space-y-4">
                <?php if (is_active_sidebar('sidebar-footer-3')): ?>
                    <?php dynamic_sidebar('sidebar-footer-3'); ?>
                <?php else: ?>
                    <h4 class="text-base font-bold text-sr-primary mb-4 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
                        ارتباط و خبرنامه
                    </h4>
                    <p class="text-xs text-sr-muted leading-relaxed">
                        جهت دریافت تازه‌ترین گزارش‌ها و اطلاعیه‌های مجموعه، در خبرنامه ایمیلی عضو شوید:
                    </p>
                    <form action="<?php echo esc_url(home_url('/#newsletter')); ?>" method="post" class="space-y-2">
                        <div class="relative">
                            <input type="email" name="newsletter_email" placeholder="ایمیل کاری خود را وارد کنید..." required class="w-full px-3 py-2 text-xs rounded-xl bg-sr-surface border border-sr-border text-sr-primary focus:outline-none focus:border-sr-gold transition-colors placeholder:text-sr-muted">
                            <button type="submit" class="absolute left-1.5 top-1.5 px-3 py-1 bg-sr-gold hover:bg-sr-gold-hover text-sr-text-inverted rounded-lg text-xs font-semibold transition-colors">
                                عضویت
                            </button>
                        </div>
                    </form>
                <?php endif; ?>
            </div>

        </div>

        <!-- نوار کپی‌رایت و پشتیبانی رسمی -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sr-muted gap-4">
            <p>© <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. تمامی حقوق محفوظ است.</p>
            <p><a href="<?php echo esc_url(home_url('/privacy-policy')); ?>" class="hover:text-sr-primary">قوانین و مقررات استفاده</a></p>
        </div>
    </div>
</footer>

<!-- نوار پیشرفت طلایی بالای صفحه وردپرس -->
<div id="sedrazavi-gold-progress-top">
    <div id="sedrazavi-gold-progress-fill"></div>
</div>

<!-- سایدبار شناور طلایی اسکرول و ناوبری -->
<aside class="sedrazavi-floating-gold-sidebar" aria-label="<?php esc_attr_e('ناوبری و اسکرول سریع', 'sedrazavi'); ?>">
    <div class="gold-sidebar-inner">
        <div class="gold-scroll-badge" onclick="window.scrollTo({top:0, behavior:'smooth'})" title="<?php esc_attr_e('درصد اسکرول - کلیک برای بازگشت به بالا', 'sedrazavi'); ?>">
            <span class="gold-percent-num" id="sedrazavi-percent-display">0%</span>
        </div>
        <div class="gold-scroll-v-track">
            <div class="gold-scroll-v-fill" id="sedrazavi-v-fill"></div>
        </div>
        <button type="button" class="gold-btn-top" onclick="window.scrollTo({top:0, behavior:'smooth'})" title="<?php esc_attr_e('بازگشت به بالای صفحه', 'sedrazavi'); ?>">
            ▲
        </button>
    </div>
</aside>

<?php wp_footer(); ?>
</body>
</html>
