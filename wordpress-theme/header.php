<?php
/**
 * The header for SedRazavi Universal WordPress Suite
 * Agnostic, high-performance, and multi-niche compatible.
 *
 * @package SedRazavi
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?><!DOCTYPE html>
<html <?php language_attributes(); ?> dir="<?php echo is_rtl() ? 'rtl' : 'ltr'; ?>">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <script>
        (function() {
            try {
                var savedTheme = localStorage.getItem('sedrazavi_theme') || 'dark';
                document.documentElement.setAttribute('data-theme', savedTheme);
                if (savedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            } catch (e) {}
        })();
    </script>
    <?php
    if (function_exists('sedrazavi_render_dynamic_seo_tags')) {
        sedrazavi_render_dynamic_seo_tags();
    }
    wp_head();
    ?>
</head>
<body <?php body_class('antialiased font-sans'); ?>>
<?php wp_body_open(); ?>

<a class="skip-link screen-reader-text" href="#main-content">
    <?php esc_html_e('پرش به محتوای اصلی', 'sedrazavi'); ?>
</a>

<?php
// Elementor Theme Builder Header Location support
if ( function_exists('elementor_theme_do_location') && elementor_theme_do_location('header') ) {
    echo '<main id="main-content" class="site-main">';
    return;
}

$show_topbar    = get_theme_mod('sedrazavi_show_topbar', true);
$header_phone   = get_theme_mod('sedrazavi_header_phone', '۰۲۱-۱۲۳۴۵۶۷۸');
$header_hours   = get_theme_mod('sedrazavi_header_hours', 'شنبه تا چهارشنبه: ۹:۰۰ الی ۱۸:۰۰');
$header_license = get_theme_mod('sedrazavi_header_license', '');
$header_cta_txt = get_theme_mod('sedrazavi_header_cta_text', 'ارتباط با ما');
$header_cta_lnk = get_theme_mod('sedrazavi_header_cta_link', home_url('/#contact'));
?>

<?php if ($show_topbar): ?>
<!-- نوار اعلان و دسترسی سریع فوقانی (Top Notification Bar) -->
<div class="top-notification-bar">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2">
        <!-- سمت راست: مجوز/ساعات کاری -->
        <div class="flex items-center gap-4">
            <?php if (!empty($header_license)): ?>
            <span class="flex items-center gap-1.5 text-sr-gold font-semibold text-xs">
                <svg class="w-3.5 h-3.5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span><?php echo esc_html($header_license); ?></span>
            </span>
            <span class="hidden sm:inline-block text-sr-muted">|</span>
            <?php endif; ?>

            <?php if (!empty($header_hours)): ?>
            <span class="hidden sm:inline-flex items-center gap-1 text-sr-secondary text-xs">
                <svg class="w-3 h-3 text-sr-muted inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span><?php echo esc_html($header_hours); ?></span>
            </span>
            <?php endif; ?>
        </div>

        <!-- سمت چپ: لینک‌های کمکی و شماره تماس -->
        <div class="flex items-center gap-3 text-xs overflow-x-auto whitespace-nowrap">
            <a href="<?php echo esc_url(home_url('/#about')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1 text-sr-secondary">
                <svg class="w-3.5 h-3.5 text-sr-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>درباره مجموعه</span>
            </a>
            <span class="text-sr-muted">|</span>
            <a href="<?php echo esc_url(home_url('/#faq')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1 text-sr-secondary">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span>پشتیبانی و سوالات</span>
            </a>
            <?php if (!empty($header_phone)): ?>
            <span class="text-sr-muted">|</span>
            <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', $header_phone)); ?>" class="text-sr-primary hover:text-sr-gold font-mono flex items-center gap-1">
                <svg class="w-3 h-3 text-sr-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span><?php echo esc_html($header_phone); ?></span>
            </a>
            <?php endif; ?>
        </div>
    </div>
</div>
<?php endif; ?>

<?php
$allowed_headers  = ['frosted-glass', 'minimal-clean', 'dark-luxury', 'corporate-split', 'centered-brand'];
$header_archetype = get_option('sedrazavi_header_style', 'frosted-glass');
if (!in_array($header_archetype, $allowed_headers, true)) {
    $header_archetype = 'frosted-glass';
}

// Allow preview only for authorized staff or in customizer
if (isset($_GET['header_style']) && in_array($_GET['header_style'], $allowed_headers, true)) {
    if (current_user_can('edit_theme_options') || is_customize_preview()) {
        $header_archetype = sanitize_key($_GET['header_style']);
        if (!has_action('wp_head', 'wp_robots_no_robots')) {
            add_action('wp_head', 'wp_robots_no_robots', 1);
        }
    }
}
?>
<!-- سربرگ اصلی چندمنظوره (Dynamic Multi-Archetype Header) -->
<header id="masthead" class="site-header header-archetype-<?php echo esc_attr($header_archetype); ?>" data-header-archetype="<?php echo esc_attr($header_archetype); ?>">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        <!-- هویت بصری و برندینگ داینامیک (Logo & Identity) -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="site-branding flex items-center gap-3">
            <?php if (has_custom_logo()): ?>
                <div class="custom-logo-wrap">
                    <?php the_custom_logo(); ?>
                </div>
            <?php else: ?>
                <div class="brand-logo-box">
                    <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                        <polyline points="2 17 12 22 22 17"/>
                        <polyline points="2 12 12 17 22 12"/>
                    </svg>
                </div>
                <div>
                    <div class="flex items-center gap-2">
                        <span class="brand-title"><?php bloginfo('name'); ?></span>
                        <span class="badge-official">پوسته رسمی وردپرس</span>
                    </div>
                    <p class="brand-tagline"><?php bloginfo('description'); ?></p>
                </div>
            <?php endif; ?>
        </a>

        <!-- ناوبری دسکتاپ (Desktop Navigation) -->
        <?php
        if (has_nav_menu('primary')) {
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'container'      => 'nav',
                'container_class'=> 'hidden xl:flex items-center gap-1 font-medium text-xs text-sr-secondary',
                'menu_class'     => 'flex items-center gap-1',
                'fallback_cb'    => 'sedrazavi_fallback_menu',
            ));
        } else {
        ?>
        <nav class="hidden xl:flex items-center gap-1 font-medium text-xs text-sr-secondary">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="nav-link"><?php esc_html_e('صفحه اصلی', 'sedrazavi'); ?></a>
            <a href="<?php echo esc_url(home_url('/#services')); ?>" class="nav-link"><?php esc_html_e('خدمات و راهکارها', 'sedrazavi'); ?></a>
            <a href="<?php echo esc_url(home_url('/#portfolio')); ?>" class="nav-link"><?php esc_html_e('نمونه‌کارها و پروژه‌ها', 'sedrazavi'); ?></a>
            <a href="<?php echo esc_url(home_url('/#articles')); ?>" class="nav-link"><?php esc_html_e('وبلاگ و اخبار', 'sedrazavi'); ?></a>
            <a href="<?php echo esc_url(home_url('/#about')); ?>" class="nav-link"><?php esc_html_e('درباره ما', 'sedrazavi'); ?></a>
            <a href="<?php echo esc_url(home_url('/#faq')); ?>" class="nav-link"><?php esc_html_e('سوالات متداول', 'sedrazavi'); ?></a>
            <a href="<?php echo esc_url(home_url('/#contact')); ?>" class="nav-link"><?php esc_html_e('تماس با ما', 'sedrazavi'); ?></a>
        </nav>
        <?php } ?>

        <!-- دکمه‌های کنترل: تم شب/روز، اکشن و منوی موبایل -->
        <div class="flex items-center gap-2.5">
            <!-- سوئیچ تم تاریک و روشن -->
            <button id="theme-toggle-btn" class="theme-btn" aria-label="<?php esc_attr_e('تغییر تم تاریک / روشن', 'sedrazavi'); ?>">
                <svg class="w-4 h-4 theme-toggle-sun hidden text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <circle cx="12" cy="12" r="5"></circle>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                </svg>
                <svg class="w-4 h-4 theme-toggle-moon block text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </button>

            <!-- دکمه اقدام سریع (Header CTA) -->
            <?php if (!empty($header_cta_txt)): ?>
            <a href="<?php echo esc_url($header_cta_lnk); ?>" class="btn-gold hidden sm:inline-flex items-center gap-1.5 text-xs px-4 py-2">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                <span><?php echo esc_html($header_cta_txt); ?></span>
            </a>
            <?php endif; ?>

            <!-- منوی موبایل -->
            <button id="mobile-menu-btn" class="hamburger-btn xl:hidden" aria-label="<?php esc_attr_e('منوی موبایل', 'sedrazavi'); ?>">
                <svg class="w-5 h-5 text-sr-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>
        </div>

    </div>
</header>

<!-- منوی کشویی واکنش‌گرا موبایل (Mobile Drawer Menu) -->
<div id="mobile-menu-drawer" class="mobile-menu-drawer" role="dialog" aria-modal="true">
    <div id="mobile-menu-backdrop" class="mobile-drawer-backdrop"></div>
    <div class="mobile-drawer-panel">
        <div>
            <!-- سربرگ منوی کشویی -->
            <div class="flex items-center justify-between pb-5 border-b border-sr-border-subtle">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-white shadow-md">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                            <polyline points="2 17 12 22 22 17"/>
                            <polyline points="2 12 12 17 22 12"/>
                        </svg>
                    </div>
                    <div>
                        <span class="block text-sm font-bold text-sr-primary"><?php bloginfo('name'); ?></span>
                        <span class="block text-[10px] text-[#D4AF37]"><?php bloginfo('description'); ?></span>
                    </div>
                </div>
                <button id="close-mobile-menu-btn" class="p-2 rounded-lg text-sr-muted hover:text-sr-primary bg-sr-surface-hover cursor-pointer" aria-label="<?php esc_attr_e('بستن منو', 'sedrazavi'); ?>">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <!-- فهرست پیوندهای موبایل -->
            <ul class="py-5 space-y-3 text-sm font-medium text-sr-primary">
                <li><a href="<?php echo esc_url(home_url('/')); ?>" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('صفحه اصلی', 'sedrazavi'); ?></a></li>
                <li><a href="<?php echo esc_url(home_url('/#services')); ?>" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('خدمات و راهکارها', 'sedrazavi'); ?></a></li>
                <li><a href="<?php echo esc_url(home_url('/#portfolio')); ?>" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('نمونه‌کارها و پروژه‌ها', 'sedrazavi'); ?></a></li>
                <li><a href="<?php echo esc_url(home_url('/#about')); ?>" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('درباره ما', 'sedrazavi'); ?></a></li>
                <li><a href="<?php echo esc_url(home_url('/#articles')); ?>" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('یادداشت‌ها و مقالات', 'sedrazavi'); ?></a></li>
                <li><a href="<?php echo esc_url(home_url('/#faq')); ?>" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('پرسش‌های متداول', 'sedrazavi'); ?></a></li>
                <li><a href="<?php echo esc_url(home_url('/#contact')); ?>" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('نشانی و تماس با ما', 'sedrazavi'); ?></a></li>
            </ul>
        </div>

        <!-- فوتر منوی کشویی موبایل -->
        <div class="pt-5 border-t border-sr-border-subtle space-y-3">
            <?php if (!empty($header_cta_txt)): ?>
            <a href="<?php echo esc_url($header_cta_lnk); ?>" class="btn-gold w-full text-center py-2.5 text-xs font-bold block rounded-xl">
                <?php echo esc_html($header_cta_txt); ?>
            </a>
            <?php endif; ?>

            <?php if (!empty($header_phone)): ?>
            <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', $header_phone)); ?>" class="w-full text-center py-2.5 text-xs font-semibold text-sr-secondary border border-sr-border-subtle hover:border-[#D4AF37] rounded-xl flex items-center justify-center gap-2">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>تماس فوری: <?php echo esc_html($header_phone); ?></span>
            </a>
            <?php endif; ?>
        </div>
    </div>
</div>

<main id="main-content" class="site-main">
