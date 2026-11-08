<?php
/**
 * The Header for SedRazavi Designer Theme
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?><!DOCTYPE html>
<html <?php language_attributes(); ?> dir="<?php echo is_rtl() ? 'rtl' : 'ltr'; ?>" <?php sedrazavi_designer_html_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <!-- Pre-paint Theme & Palette Sync Script (Zero FOUC) -->
    <script>
        (function() {
            try {
                var savedMode = localStorage.getItem('sedrazavi_mode') || 'dark';
                var savedPalette = localStorage.getItem('sedrazavi_palette') || 'dark-01';
                document.documentElement.setAttribute('data-theme', savedMode);
                document.documentElement.setAttribute('data-palette', savedPalette);
                if (savedMode === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            } catch (e) {}
        })();
    </script>

    <?php wp_head(); ?>
</head>
<body <?php body_class('antialiased'); ?>>
<?php wp_body_open(); ?>

<!-- Sovereign Preloader (Section 17.9) -->
<div class="sr-preloader-backdrop" id="sr-page-preloader" role="status" aria-live="polite">
    <div class="sr-preloader-brand-icon">⚡</div>
    <div class="sr-preloader-ring"></div>
    <div class="sr-preloader-text">استودیو سیدرضوی • معماری بدون کدنویسی</div>
</div>

<a class="skip-link screen-reader-text" href="#main-content">
    <?php esc_html_e('پرش به محتوای اصلی', 'sedrazavi-designer'); ?>
</a>

<?php
// 1. Elementor Pro Theme Builder Header Location support
if ( function_exists('elementor_theme_do_location') && elementor_theme_do_location('header') ) {
    echo '<main id="main-content" class="site-main">';
    return;
}

$site_name = get_bloginfo('name') ?: 'SedRazavi Studio';
$tagline   = get_bloginfo('description') ?: 'معماری و طراحی وب‌سایت‌های وردپرس بدون کدنویسی';
?>

<!-- Neon Cyberpunk Header -->
<header id="masthead" class="site-header" role="banner">
    <div class="container header-container">
        
        <!-- Brand Identity -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="brand-lockup">
            <div class="brand-logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                    <polyline points="2 17 12 22 22 17"/>
                    <polyline points="2 12 12 17 22 12"/>
                </svg>
            </div>
            <div class="brand-text">
                <span class="brand-title"><?php echo esc_html($site_name); ?></span>
                <span class="brand-badge">نسخه ۱۰۰٪ بومی</span>
            </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="desktop-navigation" role="navigation" aria-label="<?php esc_attr_e('منوی اصلی', 'sedrazavi-designer'); ?>">
            <?php
            if (has_nav_menu('primary-menu')) {
                wp_nav_menu([
                    'theme_location' => 'primary-menu',
                    'container'      => false,
                    'menu_class'     => 'sr-nav-links',
                    'fallback_cb'    => 'sedrazavi_designer_fallback_menu',
                ]);
            } else {
                sedrazavi_designer_fallback_menu();
            }
            ?>
        </nav>

        <!-- Header Action Controls -->
        <div class="header-actions">
            <!-- Day/Night Toggle Button -->
            <button id="sr-theme-toggle" class="sr-icon-btn" aria-label="<?php esc_attr_e('سوییچ حالت شب و روز', 'sedrazavi-designer'); ?>" title="<?php esc_attr_e('حالت تیره / روشن', 'sedrazavi-designer'); ?>">
                <svg class="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
                <svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
            </button>

            <!-- Quick Palette Switcher Trigger -->
            <div class="palette-dropdown-wrap">
                <button id="sr-palette-trigger" class="sr-icon-btn" aria-label="<?php esc_attr_e('انتخاب پالت رنگی', 'sedrazavi-designer'); ?>" title="<?php esc_attr_e('۶۶ پالت نئونی', 'sedrazavi-designer'); ?>">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
                        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
                        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
                        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                    </svg>
                </button>
                <div id="sr-palette-menu" class="palette-popup-menu" hidden>
                    <div class="palette-menu-header">
                        <span>انتخاب پالت نئونی</span>
                        <span class="palette-count-badge">۶۶ طرح</span>
                    </div>
                    <div class="palette-chips-grid">
                        <button type="button" class="palette-chip" data-palette-set="dark-01" style="background:#6C5CE7;" title="Cyberpunk Neon"></button>
                        <button type="button" class="palette-chip" data-palette-set="dark-02" style="background:#00FF66;" title="Deep Matrix"></button>
                        <button type="button" class="palette-chip" data-palette-set="dark-03" style="background:#FF2E56;" title="Bloodline Crimson"></button>
                        <button type="button" class="palette-chip" data-palette-set="dark-04" style="background:#D4AF37;" title="Royal Gold Cyber"></button>
                        <button type="button" class="palette-chip" data-palette-set="dark-05" style="background:#F43F5E;" title="Synthwave Sunset"></button>
                        <button type="button" class="palette-chip" data-palette-set="dark-08" style="background:#0EA5E9;" title="Arctic Circuit"></button>
                        <button type="button" class="palette-chip" data-palette-set="dark-09" style="background:#10B981;" title="Emerald Terminal"></button>
                        <button type="button" class="palette-chip" data-palette-set="dark-16" style="background:#2563EB;" title="Persian Sapphire"></button>
                        <button type="button" class="palette-chip" data-palette-set="light-01" style="background:#2563EB;" title="Minimalist Paper"></button>
                        <button type="button" class="palette-chip" data-palette-set="light-08" style="background:#0D9488;" title="Persian Turquoise"></button>
                    </div>
                </div>
            </div>

            <!-- Primary Header CTA -->
            <a href="<?php echo esc_url(home_url('/#contact')); ?>" class="sr-btn-primary header-cta-btn">
                <span>سفارش پروژه</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
            </a>

            <!-- Mobile Hamburger Button -->
            <button id="sr-mobile-menu-btn" class="sr-icon-btn mobile-hamburger" aria-label="<?php esc_attr_e('منوی همراه', 'sedrazavi-designer'); ?>">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
            </button>
        </div>

    </div>
</header>

<!-- Mobile Navigation Drawer -->
<div id="sr-mobile-drawer" class="mobile-drawer" aria-hidden="true">
    <div id="sr-drawer-backdrop" class="drawer-backdrop"></div>
    <div class="drawer-panel">
        <div class="drawer-header">
            <span class="drawer-title"><?php echo esc_html($site_name); ?></span>
            <button id="sr-drawer-close-btn" class="sr-icon-btn" aria-label="<?php esc_attr_e('بستن منو', 'sedrazavi-designer'); ?>">✕</button>
        </div>
        <div class="drawer-content">
            <?php
            if (has_nav_menu('primary-menu')) {
                wp_nav_menu([
                    'theme_location' => 'primary-menu',
                    'container'      => false,
                    'menu_class'     => 'drawer-links',
                ]);
            } else {
                sedrazavi_designer_fallback_menu();
            }
            ?>
            <div class="drawer-footer-actions">
                <a href="<?php echo esc_url(home_url('/#contact')); ?>" class="sr-btn-primary" style="width:100%; text-align:center;">
                    سفارش فوری وب‌سایت
                </a>
            </div>
        </div>
    </div>
</div>

<main id="main-content" class="site-main">
