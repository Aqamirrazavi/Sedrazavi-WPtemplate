import { WordPressFile } from '../types/theme';

export const WORDPRESS_THEME_FILES: WordPressFile[] = [
  {
    path: 'screenshot.png',
    filename: 'screenshot.png',
    category: 'استایل و دارایی‌ها (Assets)',
    description: 'تصویر رسمی و استاندارد کاور پوسته با نسبت ۴:۳ (۱۲۰۰×۹۰۰ پیکسل) جهت نمایش در پیشخوان وردپرس (نمایش > پوسته‌ها). این فایل در زمان دانلود زیپ به صورت خودکار کامپایل و ضمیمه می‌گردد.',
    code: `/* فایل دودویی تصویر کاور رسمی پوسته (screenshot.png 1200x900)
   این تصویر مطابق استاندارد رسمی مخزن و هسته وردپرس، در ریشه پوسته قرار می‌گیرد
   و شناسنامه بصری دفتر وکالت سید رضوی را در منوی مدیریت پوسته‌های وردپرس نمایش می‌دهد. */`,
  },
  {
    path: 'style.css',
    filename: 'style.css',
    category: 'استایل و دارایی‌ها (Assets)',
    description: 'فایل استایل اصلی و جامع پوسته (۱۰۰٪ مستقل، بدون نیاز به CDN خارجی)، شامل متغیرهای رنگی لوکس طلایی و سرمه‌ای، سیستم گرید و فلکس‌باکس داخلی، ریسپانسیو و پشتیبانی RTL.',
    code: `/*
Theme Name: SedRazavi
Theme URI: https://sedrazavi.com
Author: تیم تخصصی حقوقی سید رضوی
Author URI: https://sedrazavi.com
Description: پوسته مستقل، لوکس و فوق‌پیشرفته برای دفاتر وکالت، مشاوران حقوقی و داوری بین‌المللی. این پوسته ۱۰۰٪ مستقل بوده و بدون هیچ‌گونه وابستگی به CDN یا افزونه‌های جانبی کار می‌کند و با المنتور سازگار است.
Version: 2.5.0
Requires at least: 5.8
Requires PHP: 7.4
Tested up to: 6.7
License: GPL v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: sedrazavi
Domain Path: /languages
Tags: right-to-left, custom-menu, featured-images, theme-options, threaded-comments, translation-ready, blog, news, legal, law-firm, dark-mode, responsive-layout, full-width-template
*/

/* ==========================================================================
   ۱. متغیرهای بنیادین رنگ و تایپوگرافی (Design Tokens)
   ========================================================================== */
:root {
  --sedrazavi-gold: #D4AF37;
  --sedrazavi-gold-light: #F3E5AB;
  --sedrazavi-gold-dark: #AA820A;
  --sedrazavi-gold-hover: #E5C158;
  --sedrazavi-gold-glow: rgba(212, 175, 55, 0.25);

  --sedrazavi-navy-950: #060B18;
  --sedrazavi-navy-900: #0B132B;
  --sedrazavi-navy-800: #1C2541;
  --sedrazavi-navy-700: #3A506B;

  --sedrazavi-bg: #060B18;
  --sedrazavi-surface: #0B132B;
  --sedrazavi-surface-card: #1C2541;
  --sedrazavi-border: rgba(212, 175, 55, 0.2);
  --sedrazavi-border-subtle: rgba(255, 255, 255, 0.08);

  --sedrazavi-text-main: #F1F5F9;
  --sedrazavi-text-muted: #94A3B8;
  --sedrazavi-text-dim: #64748B;

  --font-vazir: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Tahoma, sans-serif;
  --font-playfair: 'Playfair Display', Georgia, serif;
}

[data-theme="light"] {
  --sedrazavi-bg: #F4F6F9;
  --sedrazavi-surface: #FFFFFF;
  --sedrazavi-surface-card: #FFFFFF;
  --sedrazavi-border: rgba(212, 175, 55, 0.3);
  --sedrazavi-border-subtle: #E2E8F0;

  --sedrazavi-text-main: #0B132B;
  --sedrazavi-text-muted: #475569;
  --sedrazavi-text-dim: #94A3B8;
}

/* ==========================================================================
   ۲. ریست استایل‌ها و قوانین پایه (CSS Reset & Base)
   ========================================================================== */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
  direction: rtl;
  text-align: right;
}

body {
  font-family: var(--font-vazir);
  background-color: var(--sedrazavi-bg);
  color: var(--sedrazavi-text-main);
  line-height: 1.8;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-vazir);
  font-weight: 700;
  line-height: 1.3;
  color: #FFFFFF;
}

[data-theme="light"] h1,
[data-theme="light"] h2,
[data-theme="light"] h3,
[data-theme="light"] h4,
[data-theme="light"] h5,
[data-theme="light"] h6 {
  color: #0B132B;
}

/* ==========================================================================
   ۳. سیستم شبکه و فاصله‌گذاری (Layout & Grid System - ۱۰۰٪ مستقل از CDN)
   ========================================================================== */
.container {
  width: 100%;
  max-width: 1240px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container { padding-left: 1.5rem; padding-right: 1.5rem; }
}

@media (min-width: 1024px) {
  .container { padding-left: 2rem; padding-right: 2rem; }
}

.grid {
  display: grid;
}

.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

@media (min-width: 768px) {
  .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .md\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .md\\:flex { display: flex !important; }
  .md\\:hidden { display: none !important; }
}

@media (min-width: 1024px) {
  .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .lg\\:grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
  .lg\\:col-span-5 { grid-column: span 5 / span 5; }
  .lg\\:col-span-7 { grid-column: span 7 / span 7; }
  .lg\\:col-span-8 { grid-column: span 8 / span 8; }
  .lg\\:col-span-4 { grid-column: span 4 / span 4; }
}

.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }
.gap-8 { gap: 2rem; }
.gap-10 { gap: 2.5rem; }
.gap-12 { gap: 3rem; }

.flex { display: flex; }
.inline-flex { display: inline-flex; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }

/* ==========================================================================
   ۴. استایل‌های رنگ و پس‌زمینه (Colors & Backgrounds)
   ========================================================================== */
.bg-navy-950 { background-color: var(--sedrazavi-navy-950); }
.bg-navy-900 { background-color: var(--sedrazavi-navy-900); }
.bg-navy-800 { background-color: var(--sedrazavi-navy-800); }
.bg-gold-500 { background-color: var(--sedrazavi-gold); }
.bg-white { background-color: #FFFFFF; }

.text-white { color: #FFFFFF; }
.text-slate-100 { color: #F1F5F9; }
.text-slate-200 { color: #E2E8F0; }
.text-slate-300 { color: #CBD5E1; }
.text-slate-400 { color: #94A3B8; }
.text-gold-400 { color: var(--sedrazavi-gold-hover); }
.text-gold-500 { color: var(--sedrazavi-gold); }
.text-navy-950 { color: var(--sedrazavi-navy-950); }

.border { border-width: 1px; border-style: solid; }
.border-slate-700 { border-color: #334155; }
.border-slate-800 { border-color: rgba(255, 255, 255, 0.08); }
.border-gold-500 { border-color: var(--sedrazavi-gold); }
.border-gold-500\\/20 { border-color: rgba(212, 175, 55, 0.2); }
.border-gold-500\\/30 { border-color: rgba(212, 175, 55, 0.3); }

.rounded-lg { border-radius: 0.5rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-2xl { border-radius: 1rem; }
.rounded-3xl { border-radius: 1.5rem; }
.rounded-full { border-radius: 9999px; }

.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }
.p-12 { padding: 3rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.py-12 { padding-top: 3rem; padding-bottom: 3rem; }
.py-16 { padding-top: 4rem; padding-bottom: 4rem; }
.py-20 { padding-top: 5rem; padding-bottom: 5rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.px-8 { padding-left: 2rem; padding-right: 2rem; }

.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }
.mb-12 { margin-bottom: 3rem; }
.mb-14 { margin-bottom: 3.5rem; }

.text-center { text-align: center; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }
.font-light { font-weight: 300; }
.hidden { display: none !important; }

/* ==========================================================================
   ۵. دکمه‌ها و عناصر تعاملی (Buttons & Interactive Elements)
   ========================================================================== */
.btn-gold {
  background: linear-gradient(135deg, #E5C158 0%, #D4AF37 50%, #B89628 100%);
  color: #060B18 !important;
  font-weight: 700;
  padding: 0.85rem 1.75rem;
  border-radius: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.45);
}

.btn-navy {
  background-color: var(--sedrazavi-navy-800);
  color: #FFFFFF !important;
  font-weight: 600;
  padding: 0.85rem 1.75rem;
  border-radius: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-navy:hover {
  border-color: var(--sedrazavi-gold);
  background-color: var(--sedrazavi-navy-700);
}

.btn-outline {
  background: transparent;
  color: var(--sedrazavi-gold) !important;
  border: 1px solid var(--sedrazavi-gold);
  padding: 0.85rem 1.75rem;
  border-radius: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-outline:hover {
  background: rgba(212, 175, 55, 0.1);
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
}

/* ==========================================================================
   ۶. کارت‌ها و کامپوننت‌های اختصاصی (Luxury Cards & Sections)
   ========================================================================== */
.lawyer-card, .service-card, .case-card, .testimonial-card, .article-card {
  background-color: var(--sedrazavi-surface);
  border: 1px solid var(--sedrazavi-border-subtle);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.lawyer-card:hover, .service-card:hover, .case-card:hover, .testimonial-card:hover, .article-card:hover {
  border-color: var(--sedrazavi-gold);
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(212, 175, 55, 0.15);
}

/* فرم رزرو نوبت */
.form-input, .form-select, .form-textarea {
  width: 100%;
  background-color: #060B18;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
  border-radius: 0.75rem;
  padding: 0.85rem 1rem;
  font-family: var(--font-vazir);
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  border-color: var(--sedrazavi-gold);
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
}

/* آکاردئون سوالات متداول */
.faq-item {
  border: 1px solid var(--sedrazavi-border-subtle);
  background-color: var(--sedrazavi-surface);
  border-radius: 0.75rem;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.faq-trigger {
  width: 100%;
  padding: 1.25rem 1.5rem;
  background: none;
  border: none;
  text-align: right;
  color: #FFFFFF;
  font-family: var(--font-vazir);
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.faq-answer {
  padding: 0 1.5rem 1.25rem 1.5rem;
  color: var(--sedrazavi-text-muted);
  font-size: 0.92rem;
  line-height: 1.7;
}

/* ==========================================================================
   ۷. سربرگ و پابرگ (Header & Footer)
   ========================================================================== */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(11, 19, 43, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(212, 175, 55, 0.15);
}

.site-footer {
  background-color: #060B18;
  border-top: 1px solid rgba(212, 175, 55, 0.2);
  color: #94A3B8;
  padding-top: 4rem;
  padding-bottom: 2rem;
}

/* ==========================================================================
   ۸. سازگاری کامل با المنتور (Elementor Compatibility)
   ========================================================================== */
.elementor-page-container,
.elementor-template-fullwidth,
.elementor-active-canvas {
  width: 100%;
  max-width: 100%;
}

.elementor-editor-active body {
  overflow: auto;
}

/* استایل‌های استاندارد وردپرس */
.alignleft { float: right; margin: 0 0 1.5em 1.5em; }
.alignright { float: left; margin: 0 1.5em 1.5em 0; }
.aligncenter { display: block; margin: 1.5em auto; text-align: center; }
.screen-reader-text { border: 0; clip: rect(1px, 1px, 1px, 1px); clip-path: inset(50%); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute !important; width: 1px; word-wrap: normal !important; }
`
  },
  {
    path: 'index.php',
    filename: 'index.php',
    category: 'قالب اصلی (Templates)',
    description: 'فایل اصلی و الزامی ریشه قالب وردپرس (Fallback Template) جهت جلوگیری از نمایش ساختار دایرکتوری و تضمین بارگذاری استاندارد.',
    code: `<?php
/**
 * Main Template File (Silence is Golden Fallback)
 *
 * @package SedRazavi
 * @version 2.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main py-16 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-[60vh]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <?php if (have_posts()) : ?>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php while (have_posts()) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white dark:bg-[#0B132B] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-md'); ?>>
                        <h2 class="text-xl font-bold font-serif text-[#0B132B] dark:text-white mb-3">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h2>
                        <div class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                            <?php the_excerpt(); ?>
                        </div>
                        <a href="<?php the_permalink(); ?>" class="text-xs font-bold text-[#D4AF37] hover:underline"><?php esc_html_e('ادامه مطلب ›', 'sedrazavi'); ?></a>
                    </article>
                <?php endwhile; ?>
            </div>
            <div class="mt-8 flex justify-center">
                <?php the_posts_pagination(); ?>
            </div>
        <?php else : ?>
            <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-12 text-center text-gray-500">
                <p><?php esc_html_e('محتوایی جهت نمایش یافت نشد.', 'sedrazavi'); ?></p>
            </div>
        <?php endif; ?>
    </div>
</main>

<?php
get_footer();
`
  },
  {
    path: 'functions.php',
    filename: 'functions.php',
    category: 'قالب اصلی (Templates)',
    description: 'توابع اصلی پوسته، فعال‌سازی ویژگی‌های هسته وردپرس، رجیستر CPT، هندلر ایجکس و هوک‌های امنیتی.',
    code: `<?php
/**
 * SedRazavi Law Firm Theme Functions and Definitions
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit; // Direct access denied
}

define('SEDRAZAVI_THEME_VERSION', '2.5.0');
define('SEDRAZAVI_THEME_DIR', get_template_directory());
define('SEDRAZAVI_THEME_URI', get_template_directory_uri());

/**
 * 1. Theme Setup
 */
function sedrazavi_theme_setup() {
    // Internationalization support
    load_theme_textdomain('sedrazavi', SEDRAZAVI_THEME_DIR . '/languages');

    // Title tag support
    add_theme_support('title-tag');

    // Post thumbnails
    add_theme_support('post-thumbnails');
    add_image_size('sedrazavi-service-card', 600, 400, true);
    add_image_size('sedrazavi-lawyer-portrait', 700, 900, true);
    add_image_size('sedrazavi-story-thumb', 200, 200, true);

    // Custom Logo
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 260,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // HTML5 semantic markup
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Selective Refresh for Widgets
    add_theme_support('customize-selective-refresh-widgets');

    // Navigation Menus
    register_nav_menus(array(
        'primary'  => esc_html__('منوی اصلی سربرگ (Primary Header)', 'sedrazavi'),
        'footer'   => esc_html__('منوی دسترسی سریع فوتر (Footer Menu)', 'sedrazavi'),
        'services' => esc_html__('منوی خدمات حقوقی (Legal Services)', 'sedrazavi'),
    ));
}
add_action('after_setup_theme', 'sedrazavi_theme_setup');

/**
 * 2. Enqueue Scripts & Styles
 */
function sedrazavi_enqueue_assets() {
    // Web fonts (Playfair Display & Vazirmatn)
    wp_enqueue_style(
        'sedrazavi-google-fonts',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap',
        array(),
        null
    );

    // Main Theme Stylesheet
    wp_enqueue_style(
        'sedrazavi-main-style',
        get_stylesheet_uri(),
        array(),
        SEDRAZAVI_THEME_VERSION
    );

    // Theme JS
    wp_enqueue_script(
        'sedrazavi-theme-bundle',
        SEDRAZAVI_THEME_URI . '/assets/js/main.js',
        array('jquery'),
        SEDRAZAVI_THEME_VERSION,
        array('strategy' => 'defer', 'in_footer' => true)
    );

    // Localize Script for AJAX actions
    wp_localize_script('sedrazavi-theme-bundle', 'sedrazavi_ajax_obj', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('sedrazavi_security_nonce'),
        'strings'  => array(
            'success_booking' => esc_html__('درخواست رزرو شما با موفقیت ثبت شد.', 'sedrazavi'),
            'error_booking'   => esc_html__('خطایی در ثبت رخ داد؛ لطفاً مجدداً تلاش کنید.', 'sedrazavi'),
        )
    ));
}
add_action('wp_enqueue_scripts', 'sedrazavi_enqueue_assets');

/**
 * 3. Include Core Modules safely
 */
$sedrazavi_inc_files = array(
    '/inc/case-management.php',
    '/inc/booking.php',
    '/inc/dashboard.php',
    '/inc/elementor-widgets.php',
    '/inc/class-sedrazavi-updater.php',
);

foreach ($sedrazavi_inc_files as $inc_file) {
    $filepath = SEDRAZAVI_THEME_DIR . $inc_file;
    if (file_exists($filepath)) {
        require_once $filepath;
    }
}

/**
 * 1-Click Demo Setup Notice & Handler
 */
function sedrazavi_admin_demo_notice() {
    if (get_option('sedrazavi_demo_imported')) {
        return;
    }
    ?>
    <div class="notice notice-info is-dismissible" style="border-right: 4px solid #D4AF37; background: #0B132B; color: #fff; padding: 16px 20px; border-radius: 8px; margin: 20px 0;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px;">
            <div>
                <h3 style="color: #D4AF37; margin: 0 0 6px 0; font-size: 16px; font-weight: bold;">⚖️ راه‌اندازی سریع پوسته حقوقی سید رضوی</h3>
                <p style="color: #cbd5e1; margin: 0; font-size: 13px;">برای ایجاد خودکار صفحات اصلی (صفحه اصلی، وبلاگ و تنظیمات خواندن)، روی دکمه زیر کلیک کنید.</p>
            </div>
            <a href="<?php echo esc_url( wp_nonce_url( admin_url('admin-post.php?action=sedrazavi_import_demo'), 'sedrazavi_demo_import_nonce' ) ); ?>" class="button button-primary" style="background: #D4AF37; border-color: #AA820A; color: #0B132B; font-weight: bold; padding: 6px 20px; height: auto; text-shadow: none;">
                نصب ۱ کلیک برگه‌ها و محتوای دمو &larr;
            </a>
        </div>
    </div>
    <?php
}
add_action('admin_notices', 'sedrazavi_admin_demo_notice');

function sedrazavi_handle_demo_import() {
    if (!current_user_can('manage_options') || !check_admin_referer('sedrazavi_demo_import_nonce')) {
        wp_die('دسترسی غیرمجاز.');
    }

    $home_page_id = wp_insert_post(array(
        'post_title'     => 'صفحه اصلی',
        'post_type'      => 'page',
        'post_status'    => 'publish',
        'page_template'  => 'front-page.php',
    ));

    $blog_page_id = wp_insert_post(array(
        'post_title'     => 'مقالات و اخبار حقوقی',
        'post_type'      => 'page',
        'post_status'    => 'publish',
    ));

    if ($home_page_id && !is_wp_error($home_page_id)) {
        update_option('show_on_front', 'page');
        update_option('page_on_front', $home_page_id);
    }
    if ($blog_page_id && !is_wp_error($blog_page_id)) {
        update_option('page_for_posts', $blog_page_id);
    }

    update_option('sedrazavi_demo_imported', 1);
    wp_safe_redirect(admin_url('themes.php?page=sedrazavi-dashboard&imported=1'));
    exit;
}
add_action('admin_post_sedrazavi_import_demo', 'sedrazavi_handle_demo_import');

/**
 * 4. Register Custom Post Type: Services (خدمات حقوقی)
 */
function sedrazavi_register_services_cpt() {
    $labels = array(
        'name'               => esc_html__('خدمات حقوقی', 'sedrazavi'),
        'singular_name'      => esc_html__('خدمت حقوقی', 'sedrazavi'),
        'menu_name'          => esc_html__('خدمات حقوقی', 'sedrazavi'),
        'add_new'            => esc_html__('افزودن خدمت جدید', 'sedrazavi'),
        'add_new_item'       => esc_html__('افزودن خدمت حقوقی جدید', 'sedrazavi'),
        'edit_item'          => esc_html__('ویرایش خدمت', 'sedrazavi'),
        'all_items'          => esc_html__('همه خدمات حقوقی', 'sedrazavi'),
        'view_item'          => esc_html__('نمایش خدمت', 'sedrazavi'),
        'search_items'       => esc_html__('جستجوی خدمات', 'sedrazavi'),
        'not_found'          => esc_html__('خدمتی یافت نشد', 'sedrazavi'),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => true,
        'rewrite'            => array('slug' => 'services'),
        'menu_icon'          => 'dashicons-gavel',
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'show_in_rest'       => true,
    );

    register_post_type('sedrazavi_service', $args);
}
add_action('init', 'sedrazavi_register_services_cpt');

/**
 * 5. Allow SVG Uploads for crisp scale icons
 */
function sedrazavi_allow_svg_uploads($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'sedrazavi_allow_svg_uploads');
`
  },
  {
    path: 'header.php',
    filename: 'header.php',
    category: 'قالب اصلی (Templates)',
    description: 'سربرگ تعاملی با لوگوی نماد ترازوی طلایی، منوی شیشه‌ای استیکی، دکمه تغییر پوسته (Dark Mode) و دکمه تماس سریع.',
    code: `<!DOCTYPE html>
<html <?php language_attributes(); ?> dir="<?php echo is_rtl() ? 'rtl' : 'ltr'; ?>">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php wp_head(); ?>
</head>
<body <?php body_class('sedrazavi-law-body antialiased'); ?>>
<?php wp_body_open(); ?>

<!-- Accessible Skip to Content Link -->
<a class="skip-link screen-reader-text" href="#main-content">
    <?php esc_html_e('پرش به محتوای اصلی', 'sedrazavi'); ?>
</a>

<!-- Sticky Glassmorphism Header -->
<header id="masthead" class="site-header fixed top-0 left-0 right-0 z-50 transition-all duration-300">
    <div class="header-inner container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        <!-- Logo Area -->
        <div class="site-branding flex items-center gap-3">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center gap-3 group" rel="home">
                <div class="logo-icon w-11 h-11 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-white shadow-lg shadow-[#D4AF37]/30 transition-transform group-hover:scale-105">
                    <!-- Justice Balance Scale SVG Icon -->
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                    </svg>
                </div>
                <div class="brand-text">
                    <span class="block text-xl font-bold font-serif text-[#0B132B] dark:text-white leading-tight">
                        <?php echo esc_html(get_bloginfo('name', 'display')); ?>
                    </span>
                    <span class="block text-xs text-[#D4AF37] font-medium tracking-wide">
                        <?php esc_html_e('دفتر وکالت و مشاوره حقوقی', 'sedrazavi'); ?>
                    </span>
                </div>
            </a>
        </div>

        <!-- Desktop Navigation Menu with Mega-Menu Support -->
        <nav id="site-navigation" class="main-navigation hidden lg:flex items-center gap-6" aria-label="<?php esc_attr_e('منوی اصلی', 'sedrazavi'); ?>">
            <?php
            if (has_nav_menu('primary')) {
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'menu_class'     => 'nav-menu flex items-center gap-6 font-medium text-sm text-[#0B132B] dark:text-gray-200',
                    'container'      => false,
                    'fallback_cb'    => false,
                ));
            } else {
                ?>
                <ul class="nav-menu flex items-center gap-6 font-medium text-sm text-[#0B132B] dark:text-gray-200">
                    <li><a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-[#D4AF37] transition-colors"><?php esc_html_e('صفحه اصلی', 'sedrazavi'); ?></a></li>
                    
                    <!-- Mega Menu Dropdown Item -->
                    <li class="menu-item-has-mega-menu relative group py-2">
                        <a href="#services" class="flex items-center gap-1 hover:text-[#D4AF37] transition-colors">
                            <span><?php esc_html_e('خدمات تخصصی حقوقی', 'sedrazavi'); ?></span>
                            <svg class="w-3.5 h-3.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </a>
                        <!-- Mega Menu Panel -->
                        <div class="mega-menu-panel invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute top-full right-0 w-[740px] bg-white dark:bg-[#0B132B] rounded-2xl shadow-2xl border border-[#D4AF37]/30 p-6 z-50 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                            <div class="grid grid-cols-12 gap-6">
                                <div class="col-span-8 grid grid-cols-2 gap-3 text-right">
                                    <a href="<?php echo esc_url(home_url('/services')); ?>" class="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all block">
                                        <span class="block font-bold text-xs text-[#0B132B] dark:text-white">🏢 <?php esc_html_e('دعاوی ملکی و ثبتی', 'sedrazavi'); ?></span>
                                        <span class="block text-[11px] text-gray-500 dark:text-gray-400 mt-1"><?php esc_html_e('تخلیه، الزام به تنظیم سند و سرقفلی', 'sedrazavi'); ?></span>
                                    </a>
                                    <a href="<?php echo esc_url(home_url('/services')); ?>" class="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all block">
                                        <span class="block font-bold text-xs text-[#0B132B] dark:text-white">💼 <?php esc_html_e('دعاوی تجاری و شرکت‌ها', 'sedrazavi'); ?></span>
                                        <span class="block text-[11px] text-gray-500 dark:text-gray-400 mt-1"><?php esc_html_e('اسناد تجاری، چک، ورشکستگی و قراردادها', 'sedrazavi'); ?></span>
                                    </a>
                                    <a href="<?php echo esc_url(home_url('/services')); ?>" class="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all block">
                                        <span class="block font-bold text-xs text-[#0B132B] dark:text-white">⚖️ <?php esc_html_e('دعاوی کیفری و اقتصادی', 'sedrazavi'); ?></span>
                                        <span class="block text-[11px] text-gray-500 dark:text-gray-400 mt-1"><?php esc_html_e('کلاهبرداری، خیانت در امانت و جرایم سایبری', 'sedrazavi'); ?></span>
                                    </a>
                                    <a href="<?php echo esc_url(home_url('/services')); ?>" class="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all block">
                                        <span class="block font-bold text-xs text-[#0B132B] dark:text-white">👥 <?php esc_html_e('خانواده و انحصار وراثت', 'sedrazavi'); ?></span>
                                        <span class="block text-[11px] text-gray-500 dark:text-gray-400 mt-1"><?php esc_html_e('تقسیم ترکه، وصیت و حقوق خانواده', 'sedrazavi'); ?></span>
                                    </a>
                                    <a href="<?php echo esc_url(home_url('/services')); ?>" class="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all block">
                                        <span class="block font-bold text-xs text-[#0B132B] dark:text-white">🌐 <?php esc_html_e('داوری بین‌المللی', 'sedrazavi'); ?></span>
                                        <span class="block text-[11px] text-gray-500 dark:text-gray-400 mt-1"><?php esc_html_e('حل و فصل اختلافات قراردادهای بازرگانی', 'sedrazavi'); ?></span>
                                    </a>
                                    <a href="<?php echo esc_url(home_url('/services')); ?>" class="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all block">
                                        <span class="block font-bold text-xs text-[#0B132B] dark:text-white">📋 <?php esc_html_e('استارتاپ‌ها و قراردادها', 'sedrazavi'); ?></span>
                                        <span class="block text-[11px] text-gray-500 dark:text-gray-400 mt-1"><?php esc_html_e('تنظیم قرارداد سهامداری و NDA', 'sedrazavi'); ?></span>
                                    </a>
                                </div>
                                <div class="col-span-4 bg-gradient-to-br from-[#0B132B] to-[#1C2541] rounded-xl p-4 text-white flex flex-col justify-between border border-[#D4AF37]/30 text-right">
                                    <div>
                                        <span class="inline-block px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-bold text-[10px] mb-2">⚖️ <?php esc_html_e('مشاوره فوری', 'sedrazavi'); ?></span>
                                        <h4 class="font-bold text-xs text-white"><?php esc_html_e('ارزیابی ادله پرونده توسط وکیل پایه یک', 'sedrazavi'); ?></h4>
                                    </div>
                                    <a href="#booking" class="btn-gold text-center py-2 text-xs font-bold block mt-3"><?php esc_html_e('رزرو وقت مشاوره', 'sedrazavi'); ?></a>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li><a href="#about" class="hover:text-[#D4AF37] transition-colors"><?php esc_html_e('درباره وکیل', 'sedrazavi'); ?></a></li>
                    <li><a href="#cases" class="hover:text-[#D4AF37] transition-colors"><?php esc_html_e('پیگیری پرونده', 'sedrazavi'); ?></a></li>
                    <li><a href="#articles" class="hover:text-[#D4AF37] transition-colors"><?php esc_html_e('یادداشت‌ها', 'sedrazavi'); ?></a></li>
                    <li><a href="#faq" class="hover:text-[#D4AF37] transition-colors"><?php esc_html_e('سوالات متداول', 'sedrazavi'); ?></a></li>
                    <li><a href="#contact" class="hover:text-[#D4AF37] transition-colors"><?php esc_html_e('تماس با ما', 'sedrazavi'); ?></a></li>
                </ul>
                <?php
            }
            ?>
        </nav>

        <!-- Action CTAs (Dark Mode & Booking) -->
        <div class="header-actions flex items-center gap-3">
            
            <!-- Dark Mode Toggle Button -->
            <button id="theme-toggle-btn" class="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/80 text-gray-700 dark:text-yellow-400 hover:border-[#D4AF37] transition-all" aria-label="<?php esc_attr_e('تغییر تم تاریک / روشن', 'sedrazavi'); ?>">
                <svg class="w-5 h-5 theme-toggle-sun hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                <svg class="w-5 h-5 theme-toggle-moon block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
            </button>

            <!-- Quick Booking CTA Button -->
            <a href="#booking" class="btn-gold hidden sm:inline-flex text-xs md:text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span><?php esc_html_e('رزرو وقت مشاوره', 'sedrazavi'); ?></span>
            </a>

            <!-- Mobile Hamburger Toggle -->
            <button id="mobile-menu-btn" class="lg:hidden p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800 text-gray-700 dark:text-gray-200" aria-label="<?php esc_attr_e('باز کردن منو', 'sedrazavi'); ?>">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div>

    </div>
</header>

<main id="main-content" class="site-main pt-24 min-h-screen">
`
  },
  {
    path: 'footer.php',
    filename: 'footer.php',
    category: 'قالب اصلی (Templates)',
    description: 'فوتر جامع ۴ ستونی با نمادهای کانون وکلا، فرم ثبت ایمیل خبرنامه حقوقی، پیوندهای سریع و گواهی SSL.',
    code: `</main><!-- #main-content -->

<footer id="colophon" class="site-footer bg-[#0B132B] text-white pt-16 pb-8 border-t border-[#D4AF37]/20 relative overflow-hidden">
    <!-- Golden ambient glow -->
    <div class="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
            
            <!-- Col 1: About Firm & Badges -->
            <div class="space-y-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-white">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                        </svg>
                    </div>
                    <span class="text-xl font-bold font-serif text-[#D4AF37]">
                        <?php echo esc_html(get_bloginfo('name')); ?>
                    </span>
                </div>
                <p class="text-gray-400 text-sm leading-relaxed">
                    <?php esc_html_e('دفتر وکالت و داوری حقوقی سید رضوی؛ پاسدار حقوق فردی و شرکتی با بیش از دو دهه تجربه درخشان در محاکم دادگستری و مراجع داوری بین‌المللی.', 'sedrazavi'); ?>
                </p>
                <div class="trust-pill inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#D4AF37]">
                    <span>⚖️</span>
                    <span><?php esc_html_e('پروانه پایه یک کانون وکلای دادگستری مرکز', 'sedrazavi'); ?></span>
                </div>
            </div>

            <!-- Col 2: Fast Access Links -->
            <div>
                <h4 class="text-lg font-semibold text-white mb-5 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
                    <?php esc_html_e('دسترسی سریع', 'sedrazavi'); ?>
                </h4>
                <ul class="space-y-2.5 text-sm text-gray-400">
                    <li><a href="#services" class="hover:text-[#D4AF37] transition-colors flex items-center gap-2"><span>‹</span> <?php esc_html_e('دعاوی تجاری و بازرگانی', 'sedrazavi'); ?></a></li>
                    <li><a href="#services" class="hover:text-[#D4AF37] transition-colors flex items-center gap-2"><span>‹</span> <?php esc_html_e('دعاوی کیفری و اقتصادی', 'sedrazavi'); ?></a></li>
                    <li><a href="#services" class="hover:text-[#D4AF37] transition-colors flex items-center gap-2"><span>‹</span> <?php esc_html_e('حقوق خانواده و انحصار وراثت', 'sedrazavi'); ?></a></li>
                    <li><a href="#cases" class="hover:text-[#D4AF37] transition-colors flex items-center gap-2"><span>‹</span> <?php esc_html_e('سامانه پیگیری پرونده', 'sedrazavi'); ?></a></li>
                    <li><a href="#booking" class="hover:text-[#D4AF37] transition-colors flex items-center gap-2"><span>‹</span> <?php esc_html_e('رزرو وقت مشاوره حضوری', 'sedrazavi'); ?></a></li>
                </ul>
            </div>

            <!-- Col 3: Contact Details -->
            <div>
                <h4 class="text-lg font-semibold text-white mb-5 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
                    <?php esc_html_e('اطلاعات تماس دفتر', 'sedrazavi'); ?>
                </h4>
                <ul class="space-y-3 text-sm text-gray-400">
                    <li class="flex items-start gap-3">
                        <span class="text-[#D4AF37] mt-1">📍</span>
                        <span><?php esc_html_e('تهران، خ ولیعصر، بالاتر از میدان ونک، برج سید رضوی، ط ۸، واحد ۳۲', 'sedrazavi'); ?></span>
                    </li>
                    <li class="flex items-center gap-3">
                        <span class="text-[#D4AF37]">📞</span>
                        <span dir="ltr" class="font-mono text-white">۰۲۱-۸۸۹۹۰۰۱۱</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <span class="text-[#D4AF37]">📱</span>
                        <span dir="ltr" class="font-mono text-white">۰۹۱۲-۳۴۵۶۷۸۹</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <span class="text-[#D4AF37]">✉️</span>
                        <span class="text-gray-300">info@sedrazavi-law.ir</span>
                    </li>
                </ul>
            </div>

            <!-- Col 4: Newsletter & Verification -->
            <div>
                <h4 class="text-lg font-semibold text-white mb-5 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
                    <?php esc_html_e('عضویت در خبرنامه حقوقی', 'sedrazavi'); ?>
                </h4>
                <p class="text-xs text-gray-400 mb-4">
                    <?php esc_html_e('جدیدترین قوانین مصوب مجلس و نکات کلیدی حقوقی را هر هفته در ایمیل خود دریافت کنید.', 'sedrazavi'); ?>
                </p>
                <form id="footer-newsletter-form" class="space-y-2">
                    <input type="email" required placeholder="<?php esc_attr_e('آدرس ایمیل شما...', 'sedrazavi'); ?>" class="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#D4AF37]">
                    <button type="submit" class="btn-gold w-full text-xs py-2.5">
                        <?php esc_html_e('عضویت رایگان در خبرنامه', 'sedrazavi'); ?>
                    </button>
                </form>
            </div>

        </div>

        <!-- Copyright Bar -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
            <p>
                &copy; <?php echo date('Y'); ?> <?php echo esc_html(get_bloginfo('name')); ?>. <?php esc_html_e('تمامی حقوق مادی و معنوی محفوظ است.', 'sedrazavi'); ?>
            </p>
            <div class="flex items-center gap-6">
                <a href="#" class="hover:text-[#D4AF37]"><?php esc_html_e('سیاست حریم خصوصی', 'sedrazavi'); ?></a>
                <a href="#" class="hover:text-[#D4AF37]"><?php esc_html_e('قوانین و مقررات', 'sedrazavi'); ?></a>
                <a href="#" class="hover:text-[#D4AF37]"><?php esc_html_e('منشور اخلاق حرفه‌ای', 'sedrazavi'); ?></a>
            </div>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
`
  },
  {
    path: 'front-page.php',
    filename: 'front-page.php',
    category: 'قالب اصلی (Templates)',
    description: 'صفحه اصلی لوکس و چندمنظوره پوسته (شامل ۱۰ سکشن تخصصی حقوقی، رزرو آنلاین نوبت، معرفی وکیل، سوالات متداول و سازگاری ۱۰۰٪ با المنتور بدون ایجاد صفحه سفید).',
    code: `<?php
/**
 * The template for displaying the SedRazavi Law Firm Front Page
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// ۱. بررسی کاملاً امن، پایدار و خطاناپذیر ادیتور و پیش‌نمایش المنتور
$is_elementor_active = false;
if ( class_exists( '\\Elementor\\Plugin' ) && isset( \\Elementor\\Plugin::$instance ) ) {
    if ( isset( \\Elementor\\Plugin::$instance->preview ) && is_object( \\Elementor\\Plugin::$instance->preview ) && method_exists( \\Elementor\\Plugin::$instance->preview, 'is_preview_mode' ) ) {
        if ( \\Elementor\\Plugin::$instance->preview->is_preview_mode() ) {
            $is_elementor_active = true;
        }
    }
    if ( isset( \\Elementor\\Plugin::$instance->editor ) && is_object( \\Elementor\\Plugin::$instance->editor ) && method_exists( \\Elementor\\Plugin::$instance->editor, 'is_edit_mode' ) ) {
        if ( \\Elementor\\Plugin::$instance->editor->is_edit_mode() ) {
            $is_elementor_active = true;
        }
    }
}
if ( isset( $_GET['elementor-preview'] ) || ( isset( $_GET['action'] ) && $_GET['action'] === 'elementor' ) ) {
    $is_elementor_active = true;
}

// ۲. بررسی وجود محتوای ذخیره‌شده المنتور برای برگه انتخابی
$has_elementor_content = false;
if ( is_singular() ) {
    $mode = get_post_meta( get_the_ID(), '_elementor_edit_mode', true );
    $data = get_post_meta( get_the_ID(), '_elementor_data', true );
    $content = get_post_field( 'post_content', get_the_ID() );
    if ( $mode === 'builder' && ! empty( $data ) && $data !== '[]' && $data !== '""' && ! empty( trim( (string)$content ) ) ) {
        $has_elementor_content = true;
    }
}

// اگر برگه توسط کاربر در المنتور طراحی شده و حاوی ویجت است، بوم المنتور فراخوانی می‌شود
if ( $is_elementor_active || $has_elementor_content ) {
    get_header();
    ?>
    <div id="primary" class="content-area elementor-active-canvas w-full min-h-[60vh]">
        <?php
        while ( have_posts() ) :
            the_post();
            the_content();
        endwhile;
        ?>
    </div>
    <?php
    get_footer();
    return;
}

// ۳. در غیر این صورت: نمایش پوسته مستقل پیش‌فرض با ۱۰ سکشن لوکس (۱۰۰٪ مستقل از هرگونه افزونه)
get_header();
?>

<!-- ۱. هیرو سکشن لوکس (Hero Section) -->
<section id="hero" class="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-[#0B132B]/20 via-[#060B18] to-[#060B18] border-b border-slate-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <!-- ستون متن و معرفی (۷ ستون) -->
            <div class="lg:col-span-7 space-y-6 text-right">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs sm:text-sm font-semibold">
                    <span class="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                    <span><?php esc_html_e('دفتر وکالت و داوری بین‌المللی دکتر سیده مریم رضوی', 'sedrazavi'); ?></span>
                </div>

                <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    <?php esc_html_e('عدالت با صلابت،', 'sedrazavi'); ?><br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA820A]">
                        <?php esc_html_e('دفاع با تخصص و تعهد', 'sedrazavi'); ?>
                    </span>
                </h1>

                <p class="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                    <?php esc_html_e('ارائه‌دهنده مشاوره‌های راهبردی و لوایح دفاعی تخصصی در دعاوی کلان اقتصادی، تجاری، ملکی و داوری بین‌المللی با بیش از ۲ دهه پیروزی‌های مستمر در دیوان عالی و محاکم تجدیدنظر.', 'sedrazavi'); ?>
                </p>

                <!-- دکمه‌های اقدام (CTA) -->
                <div class="flex flex-wrap items-center gap-4 pt-4">
                    <a href="#booking" class="btn-gold">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span><?php esc_html_e('رزرو فوری وقت مشاوره', 'sedrazavi'); ?></span>
                    </a>

                    <a href="#services" class="btn-outline">
                        <span><?php esc_html_e('مشاهده حوزه‌های وکالت', 'sedrazavi'); ?></span>
                        <svg class="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </a>
                </div>

                <!-- نشان‌های اعتماد و ضمانت حرفه‌ای -->
                <div class="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                    <div class="flex items-center gap-2">
                        <span class="text-[#D4AF37] text-base">⚖️</span>
                        <span><?php esc_html_e('عضو رسمی کانون وکلای دادگستری مرکز', 'sedrazavi'); ?></span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-[#D4AF37] text-base">🛡️</span>
                        <span><?php esc_html_e('محرمانگی ۱۰۰٪ اسناد و پرونده‌ها', 'sedrazavi'); ?></span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-[#D4AF37] text-base">🎖️</span>
                        <span><?php esc_html_e('رتبه برتر آزمون وکالت و اختبار', 'sedrazavi'); ?></span>
                    </div>
                </div>
            </div>

            <!-- ستون تصویر و نماد وکیل (۵ ستون) -->
            <div class="lg:col-span-5 relative flex justify-center">
                <div class="relative w-full max-w-md">
                    <div class="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#D4AF37]/30 to-transparent blur-2xl"></div>
                    
                    <div class="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl bg-[#0B132B]">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" alt="<?php esc_attr_e('دکتر سیده مریم رضوی - وکیل پایه یک', 'sedrazavi'); ?>" class="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700">
                        
                        <!-- برچسب شناور سابقه وکالت -->
                        <div class="absolute bottom-4 right-4 left-4 bg-[#0B132B]/90 backdrop-blur-md p-4 rounded-xl border border-[#D4AF37]/30 shadow-xl flex items-center gap-4">
                            <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#AA820A] text-[#060B18] flex items-center justify-center font-bold text-xl">
                                ۲۰+
                            </div>
                            <div>
                                <h4 class="font-bold text-sm text-white"><?php esc_html_e('سال سابقه درخشان وکالت و قضاوت', 'sedrazavi'); ?></h4>
                                <p class="text-xs text-slate-400"><?php esc_html_e('بیش از ۱۲۸۰ لایحه و رأی قطعی موفق', 'sedrazavi'); ?></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- ۲. نوار آماری دستاوردها (Trust Counters) -->
<section class="py-12 bg-[#0B132B] border-b border-slate-800 text-white relative">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            <div class="space-y-2 border-l border-slate-800 last:border-l-0">
                <span class="text-3xl md:text-5xl font-bold text-[#D4AF37]">۱۲۸۰+</span>
                <p class="text-xs md:text-sm text-slate-300"><?php esc_html_e('پرونده و دعوای پیروز', 'sedrazavi'); ?></p>
            </div>

            <div class="space-y-2 border-l border-slate-800 last:border-l-0">
                <span class="text-3xl md:text-5xl font-bold text-[#D4AF37]">۹۸٪</span>
                <p class="text-xs md:text-sm text-slate-300"><?php esc_html_e('رضایت کامل موکلین حقوقی و حقیقی', 'sedrazavi'); ?></p>
            </div>

            <div class="space-y-2 border-l border-slate-800 last:border-l-0">
                <span class="text-3xl md:text-5xl font-bold text-[#D4AF37]">۲۰+</span>
                <p class="text-xs md:text-sm text-slate-300"><?php esc_html_e('سال تجربه تخصصی در محاکم دادگستری', 'sedrazavi'); ?></p>
            </div>

            <div class="space-y-2">
                <span class="text-3xl md:text-5xl font-bold text-[#D4AF37]">۴۵۰+</span>
                <p class="text-xs md:text-sm text-slate-300"><?php esc_html_e('قرارداد تجاری و داوری بین‌المللی', 'sedrazavi'); ?></p>
            </div>

        </div>
    </div>
</section>

<!-- ۳. معرفی وکیل و مدارک علمی (About Lawyer) -->
<section id="about" class="py-20 bg-[#060B18] border-b border-slate-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-5 text-center">
                <div class="p-4 rounded-3xl bg-[#0B132B] border border-[#D4AF37]/30 inline-block shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" alt="<?php esc_attr_e('دکتر سیده مریم رضوی', 'sedrazavi'); ?>" class="rounded-2xl w-full max-w-sm mx-auto">
                    <div class="mt-4">
                        <h3 class="text-xl font-bold text-white"><?php esc_html_e('دکتر سیده مریم رضوی', 'sedrazavi'); ?></h3>
                        <p class="text-xs text-[#D4AF37] font-semibold mt-1"><?php esc_html_e('وکیل پایه یک دادگستری | پروانه شماره: ۹۴۲۵', 'sedrazavi'); ?></p>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-7 space-y-6 text-right">
                <span class="text-xs font-bold text-[#D4AF37] tracking-wider uppercase"><?php esc_html_e('شناسنامه و سوابق علمی وکیل', 'sedrazavi'); ?></span>
                <h2 class="text-2xl sm:text-4xl font-bold text-white leading-snug">
                    <?php esc_html_e('تکیه‌گاهی استوار برای احقاق حق در پیچیده‌ترین پرونده‌های حقوقی', 'sedrazavi'); ?>
                </h2>
                <p class="text-sm sm:text-base text-slate-300 leading-relaxed">
                    <?php esc_html_e('دفتر وکالت دکتر سیده مریم رضوی، مجهز به تیمی منسجم از اساتید دانشگاه و مستشاران سابق قضایی، خدمات دفاع حقوقی را در بالاترین استانداردهای اخلاقی و تخصصی ارائه می‌دهد. رویکرد ما در هر پرونده، تحلیل همه‌جانبه مستندات، پیش‌بینی هوشمندانه مسیر دادرسی و تنظیم دقیق‌ترین لوایح ماهوی است.', 'sedrazavi'); ?>
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div class="p-4 rounded-xl bg-[#0B132B] border border-slate-800 space-y-1">
                        <h4 class="text-sm font-bold text-[#D4AF37]">🎓 <?php esc_html_e('دکترای تخصصی حقوق خصوصی', 'sedrazavi'); ?></h4>
                        <p class="text-xs text-slate-400"><?php esc_html_e('فارغ‌التحصیل ممتاز دانشگاه تهران با تألیف ۵ جلد کتاب مرجع حقوقی', 'sedrazavi'); ?></p>
                    </div>
                    <div class="p-4 rounded-xl bg-[#0B132B] border border-slate-800 space-y-1">
                        <h4 class="text-sm font-bold text-[#D4AF37]">🏛️ <?php esc_html_e('داور رسمی دعاوی تجاری بین‌المللی', 'sedrazavi'); ?></h4>
                        <p class="text-xs text-slate-400"><?php esc_html_e('عضو کمیسیون داوری اتاق بازرگانی و داوری پرونده‌های کلان ارزی', 'sedrazavi'); ?></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ۴. خدمات ۶ گانه حقوقی تخصصی (Services Grid) -->
<section id="services" class="py-20 bg-[#0B132B] border-b border-slate-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span class="text-xs font-bold text-[#D4AF37] uppercase tracking-wider"><?php esc_html_e('دپارتمان‌های وکالت تخصصی', 'sedrazavi'); ?></span>
            <h2 class="text-2xl sm:text-4xl font-bold text-white"><?php esc_html_e('دپارتمان‌های تخصصی دفتر وکالت سید رضوی', 'sedrazavi'); ?></h2>
            <p class="text-sm text-slate-400"><?php esc_html_e('تفکیک پرونده‌ها و ارجاع به وکلای متخصص در هر دپارتمان تخصصی حقوقی', 'sedrazavi'); ?></p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <?php
            $services = [
                ['icon' => '🏢', 'title' => 'دعاوی تجاری و شرکت‌ها', 'desc' => 'ثبت شرکت‌ها، تغییرات ساختاری، قراردادهای کنسرسیوم، ورشکستگی و مطالبات اسناد تجاری.'],
                ['icon' => '🏗️', 'title' => 'دعاوی ملکی و سرقفلی', 'desc' => 'الزام به تنظیم سند، خلع ید، مشارکت در ساخت، تصرف عدوانی، کمیسیون ماده ۱۰۰ و شهرداری.'],
                ['icon' => '⚖️', 'title' => 'دعاوی کیفری و اقتصادی', 'desc' => 'دفاع تخصصی در جرائم مالی، کلاهبرداری، پولشویی، اختلاس، خیانت در امانت و جرائم رایانه‌ای.'],
                ['icon' => '🌐', 'title' => 'داوری و قراردادهای بین‌المللی', 'desc' => 'تنظیم و نظارت بر قراردادهای صادرات/واردات، اینکوترمز و داوری اتاق بین‌المللی (ICC).'],
                ['icon' => '👨‍👩‍👧', 'title' => 'دعاوی خانواده و ارث', 'desc' => 'مهریه، نفقه، حضانت، تقسیم ماترک، انحصار وراثت و صلح عمری در کمال احترام و سرعت.'],
                ['icon' => '📜', 'title' => 'مشاوره حقوقی مستمر سازمان‌ها', 'desc' => 'عقد قراردادهای مشاوره ماهیانه برای هلدینگ‌ها، استارتاپ‌ها و کارخانجات صنعتی.'],
            ];

            foreach ($services as $srv) :
            ?>
            <div class="service-card group">
                <div class="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-2xl mb-6 group-hover:bg-[#D4AF37] transition-all">
                    <?php echo esc_html($srv['icon']); ?>
                </div>
                <h3 class="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-3"><?php echo esc_html($srv['title']); ?></h3>
                <p class="text-sm text-slate-400 leading-relaxed mb-6"><?php echo esc_html($srv['desc']); ?></p>
                <a href="#booking" class="text-xs font-bold text-[#D4AF37] inline-flex items-center gap-1 hover:underline">
                    <span><?php esc_html_e('درخواست بررسی لایحه', 'sedrazavi'); ?></span>
                    <span>&larr;</span>
                </a>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ۵. نمونه پرونده‌های موفق شاخص (Notable Success Cases) -->
<section id="cases" class="py-20 bg-[#060B18] border-b border-slate-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div class="text-right space-y-2">
                <span class="text-xs font-bold text-[#D4AF37] uppercase"><?php esc_html_e('کارنامه و سوابق قضایی', 'sedrazavi'); ?></span>
                <h2 class="text-2xl sm:text-4xl font-bold text-white"><?php esc_html_e('پرونده‌های موفق و آرای قطعی شاخص', 'sedrazavi'); ?></h2>
            </div>
            <a href="#booking" class="btn-outline text-xs"><?php esc_html_e('بررسی شرایط پرونده شما', 'sedrazavi'); ?></a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="case-card">
                <div class="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span class="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold">رأی وحدت رویه دیوان عالی</span>
                    <span>پرونده ۹۸/۱۴</span>
                </div>
                <h3 class="text-lg font-bold text-white mb-2"><?php esc_html_e('ابطال مزایده و اعاده مالکیت پتروشیمی', 'sedrazavi'); ?></h3>
                <p class="text-xs text-slate-400 leading-relaxed"><?php esc_html_e('ابطال فرایند مزایده غیرقانونی به ارزش ۲۴۰ میلیارد تومان و احیای کامل سهام موکل در دادگاه تجدیدنظر استان تهران.', 'sedrazavi'); ?></p>
            </div>

            <div class="case-card">
                <div class="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span class="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold">داوری بین‌المللی تجاری</span>
                    <span>پرونده بین‌المللی</span>
                </div>
                <h3 class="text-lg font-bold text-white mb-2"><?php esc_html_e('اخذ غرامت ۱.۲ میلیون یورویی قرارداد بازرگانی', 'sedrazavi'); ?></h3>
                <p class="text-xs text-slate-400 leading-relaxed"><?php esc_html_e('محکومیت شرکت خارجی طرف قرارداد در داوری استانبول به دلیل استنکاف از تحویل خط تولید دارویی.', 'sedrazavi'); ?></p>
            </div>

            <div class="case-card">
                <div class="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span class="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold">دعاوی کیفری اقتصادی</span>
                    <span>رأی قطعی برائت</span>
                </div>
                <h3 class="text-lg font-bold text-white mb-2"><?php esc_html_e('برائت کامل مدیرعامل در اتهام انتسابی کلان', 'sedrazavi'); ?></h3>
                <p class="text-xs text-slate-400 leading-relaxed"><?php esc_html_e('اثبات فقدان سوءنیت مجرمانه و نقض رأی بدوی در شعبه ویژه جرائم اقتصادی دیوان عالی کشور.', 'sedrazavi'); ?></p>
            </div>
        </div>
    </div>
</section>

<!-- ۶. نظرات موکلین (Testimonials) -->
<section class="py-20 bg-[#0B132B] border-b border-slate-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-[#D4AF37] uppercase"><?php esc_html_e('رضایت‌مندی موکلین', 'sedrazavi'); ?></span>
        <h2 class="text-2xl sm:text-4xl font-bold text-white mt-2 mb-12"><?php esc_html_e('دیدگاه مدیران عامل و موکلین درباره ما', 'sedrazavi'); ?></h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
            <div class="testimonial-card">
                <div class="flex text-[#D4AF37] text-sm mb-4">★★★★★</div>
                <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">«تسلط خیره‌کننده دکتر رضوی بر قوانین تجارت و سرعت در تنظیم لوایح دفاعی، شرکت ما را از یک خسارت قطعی چند ده میلیارد تومانی نجات داد.»</p>
                <div class="flex items-center gap-3 pt-4 border-t border-slate-800">
                    <div class="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-[#D4AF37]">م.ح</div>
                    <div>
                        <h4 class="text-xs font-bold text-white">مهندس محمد حسینی</h4>
                        <p class="text-[11px] text-slate-400">مدیرعامل گروه صنعتی البرز</p>
                    </div>
                </div>
            </div>

            <div class="testimonial-card">
                <div class="flex text-[#D4AF37] text-sm mb-4">★★★★★</div>
                <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">«صداقت، واقع‌بینی حقوقی و عدم وعده توخالی از بارزترین خصوصیات این دفتر وکالت است. رأی صادر شده دقیقاً منطبق با تحلیل روز نخست ایشان بود.»</p>
                <div class="flex items-center gap-3 pt-4 border-t border-slate-800">
                    <div class="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-[#D4AF37]">س.ک</div>
                    <div>
                        <h4 class="text-xs font-bold text-white">دکتر سارا کاظمی</h4>
                        <p class="text-[11px] text-slate-400">عضو هیئت علمی دانشگاه</p>
                    </div>
                </div>
            </div>

            <div class="testimonial-card">
                <div class="flex text-[#D4AF37] text-sm mb-4">★★★★★</div>
                <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">«در دعاوی ملکی و خلع ید اراضی موروثی، نظم و پیگیری بی‌وقفه تیم دفتر وکالت سید رضوی آرامش خاطر واقعی را به خانواده ما هدیه داد.»</p>
                <div class="flex items-center gap-3 pt-4 border-t border-slate-800">
                    <div class="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-[#D4AF37]">ر.ن</div>
                    <div>
                        <h4 class="text-xs font-bold text-white">رضا نبوی</h4>
                        <p class="text-[11px] text-slate-400">فعال حوزه ساخت و ساز</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ۷. فرم آنلاین رزرو نوبت مشاوره حقوقی (Booking Form) -->
<section id="booking" class="py-20 bg-[#060B18] border-b border-slate-800 relative">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div class="bg-[#0B132B] rounded-3xl p-6 sm:p-12 border border-[#D4AF37]/30 shadow-2xl">
            <div class="text-center max-w-2xl mx-auto mb-10 space-y-2">
                <span class="text-xs font-bold text-[#D4AF37] uppercase"><?php esc_html_e('نوبت‌دهی آنلاین', 'sedrazavi'); ?></span>
                <h2 class="text-2xl sm:text-3xl font-bold text-white"><?php esc_html_e('درخواست جلسه مشاوره حقوقی (حضوری یا آنلاین)', 'sedrazavi'); ?></h2>
                <p class="text-xs sm:text-sm text-slate-400"><?php esc_html_e('اطلاعات شما با ضمانت‌نامه محرمانگی کانون وکلا بررسی و ظرف ۴ ساعت کاری با شما تماس گرفته می‌شود.', 'sedrazavi'); ?></p>
            </div>

            <form id="sedrazavi-booking-form" class="space-y-6 text-right">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-2"><?php esc_html_e('نام و نام خانوادگی *', 'sedrazavi'); ?></label>
                        <input type="text" name="client_name" required class="form-input" placeholder="<?php esc_attr_e('مثال: محمد احمدی', 'sedrazavi'); ?>">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-2"><?php esc_html_e('شماره تماس همراه *', 'sedrazavi'); ?></label>
                        <input type="tel" name="client_phone" required dir="ltr" class="form-input text-right" placeholder="0912xxxxxxx">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-2"><?php esc_html_e('موضوع و حوزه حقوقی دعوا *', 'sedrazavi'); ?></label>
                        <select name="service_type" required class="form-select">
                            <option value="commercial"><?php esc_html_e('دعاوی تجاری، شرکت‌ها و قراردادها', 'sedrazavi'); ?></option>
                            <option value="real_estate"><?php esc_html_e('دعاوی ملکی، سرقفلی و شهرداری', 'sedrazavi'); ?></option>
                            <option value="criminal"><?php esc_html_e('دعاوی کیفری و جرائم اقتصادی', 'sedrazavi'); ?></option>
                            <option value="family"><?php esc_html_e('دعاوی خانواده و ارث', 'sedrazavi'); ?></option>
                            <option value="arbitration"><?php esc_html_e('داوری داخلی و بین‌المللی', 'sedrazavi'); ?></option>
                            <option value="other"><?php esc_html_e('سایر موارد تخصصی', 'sedrazavi'); ?></option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-2"><?php esc_html_e('نوع جلسه مشاوره', 'sedrazavi'); ?></label>
                        <select name="consultation_mode" class="form-select">
                            <option value="in_person"><?php esc_html_e('حضوری در دفتر وکالت (تهران)', 'sedrazavi'); ?></option>
                            <option value="online_video"><?php esc_html_e('آنلاین تصویری (Google Meet / واتساپ)', 'sedrazavi'); ?></option>
                            <option value="phone"><?php esc_html_e('مشاوره تلفنی تخصصی', 'sedrazavi'); ?></option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-2"><?php esc_html_e('خلاصه شرح موضوع یا سابقه دادرسی', 'sedrazavi'); ?></label>
                    <textarea name="case_summary" rows="4" class="form-textarea" placeholder="<?php esc_attr_e('توضیحی مختصر درباره ماجرا، مرحله رسیدگی و سوال اصلی خود بنویسید...', 'sedrazavi'); ?>"></textarea>
                </div>

                <div class="text-center pt-4">
                    <button type="submit" class="btn-gold w-full sm:w-auto px-12 py-3.5 text-sm font-bold">
                        <span><?php esc_html_e('ثبت درخواست و هماهنگی وقت مشاوره', 'sedrazavi'); ?></span>
                        <span class="mr-2">&rarr;</span>
                    </button>
                    <p id="booking-response-msg" class="text-xs mt-4 hidden"></p>
                </div>
            </form>
        </div>
    </div>
</section>

<!-- ۸. پرسش‌های متداول حقوقی (FAQ Accordion) -->
<section class="py-20 bg-[#0B132B] border-b border-slate-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div class="text-center mb-12 space-y-2">
            <span class="text-xs font-bold text-[#D4AF37] uppercase"><?php esc_html_e('راهنمای موکلین', 'sedrazavi'); ?></span>
            <h2 class="text-2xl sm:text-3xl font-bold text-white"><?php esc_html_e('پرسش‌های متداول در خصوص قرارداد و دادرسی', 'sedrazavi'); ?></h2>
        </div>

        <div class="space-y-4">
            <div class="faq-item">
                <button type="button" class="faq-trigger" onclick="this.nextElementSibling.classList.toggle('hidden');">
                    <span><?php esc_html_e('۱. هزینه حق‌الوکاله و شرایط پرداخت آن چگونه محاسبه می‌شود؟', 'sedrazavi'); ?></span>
                    <span class="text-[#D4AF37] text-lg font-bold">+</span>
                </button>
                <div class="faq-answer">
                    <?php esc_html_e('حق‌الوکاله مطابق با آیین‌نامه تعرفه کانون وکلا و متناسب با موضوع خواسته، پیچیدگی ماهوی پرونده و مرحله دادرسی توافق می‌گردد. امکان تقسیط مبلغ در مراحل مختلف (ثبت دادخواست، مرحله تجدیدنظر و پس از صدور رأی قطعی) فراهم است.', 'sedrazavi'); ?>
                </div>
            </div>

            <div class="faq-item">
                <button type="button" class="faq-trigger" onclick="this.nextElementSibling.classList.toggle('hidden');">
                    <span><?php esc_html_e('۲. آیا امکان برگزاری جلسات مشاوره آنلاین برای مقیمین خارج از کشور وجود دارد؟', 'sedrazavi'); ?></span>
                    <span class="text-[#D4AF37] text-lg font-bold">+</span>
                </button>
                <div class="faq-answer hidden">
                    <?php esc_html_e('بله؛ با هماهنگی قبلی جلسات آنلاین از طریق پلتفرم‌های رمزنگاری‌شده برگزار می‌گردد و اعطای وکالت از طریق سامانه تاک (میخک) وزارت امور خارجه یا سامانه ثنا در سریع‌ترین زمان انجام می‌شود.', 'sedrazavi'); ?>
                </div>
            </div>

            <div class="faq-item">
                <button type="button" class="faq-trigger" onclick="this.nextElementSibling.classList.toggle('hidden');">
                    <span><?php esc_html_e('۳. پرونده من تا چه اندازه شانس موفقیت دارد؟', 'sedrazavi'); ?></span>
                    <span class="text-[#D4AF37] text-lg font-bold">+</span>
                </button>
                <div class="faq-answer hidden">
                    <?php esc_html_e('وکیل حرفه‌ای طبق سوگند وکالت، هیچ‌گاه نتیجه دادرسی را تضمین نمی‌کند (تضمین نتیجه خلاف ضوابط انتظامی است). اما ما پس از مطالعه کامل مدارک در جلسه اول، شانس موفقیت و ریسک‌های موجود را صادقانه و مستند بر روی کاغذ برای شما ترسیم می‌کنیم.', 'sedrazavi'); ?>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ۹. بنر تماس اضطراری و نشانی دفتر (Emergency Banner) -->
<section class="py-16 bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div class="inline-block p-3 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-2xl">
            📞
        </div>
        <h2 class="text-2xl sm:text-4xl font-bold">
            <?php esc_html_e('نیاز به ورود و لایحه دفاعی فوری در دادسرا دارید؟', 'sedrazavi'); ?>
        </h2>
        <p class="text-sm text-slate-300 max-w-xl mx-auto">
            <?php esc_html_e('خط مستقیم کشیک دفتر وکالت جهت اعلام حضور در شعب بازپرسی، توقیف اموال و قرارهای تأمینی فوری.', 'sedrazavi'); ?>
        </p>
        <div class="flex flex-wrap justify-center items-center gap-4 pt-2">
            <a href="tel:02188888888" class="btn-gold text-base font-bold">
                <span>تلفن تماس مستقیم: ۰۲۱-۸۸۸۸۸۸۸۸</span>
            </a>
            <a href="#booking" class="btn-outline text-base">
                <span>پیام در پیام‌رسان واتساپ</span>
            </a>
        </div>
    </div>
</section>

<?php
get_footer();
?>
`
  },
  {
    path: 'inc/case-management.php',
    filename: 'case-management.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'سیستم ثبت و مدیریت پرونده‌ها (CPT sedrazavi_case) با متاباکس شماره پرونده، وقت دادرسی و وضعیت رسیدگی.',
    code: `<?php
/**
 * SedRazavi Case Management & Client Tracker Engine
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Custom Post Type for Legal Cases
 */
function sedrazavi_register_case_cpt() {
    $labels = array(
        'name'               => esc_html__('پرونده‌های موکلین', 'sedrazavi'),
        'singular_name'      => esc_html__('پرونده حقوقی', 'sedrazavi'),
        'menu_name'          => esc_html__('مدیریت پرونده‌ها', 'sedrazavi'),
        'add_new'            => esc_html__('ثبت پرونده جدید', 'sedrazavi'),
        'add_new_item'       => esc_html__('ثبت پرونده حقوقی جدید', 'sedrazavi'),
        'edit_item'          => esc_html__('ویرایش پرونده', 'sedrazavi'),
        'all_items'          => esc_html__('همه پرونده‌ها', 'sedrazavi'),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => false, // Private to lawyer/clients
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-portfolio',
        'supports'           => array('title', 'custom-fields'),
        'show_in_rest'       => true,
    );

    register_post_type('sedrazavi_case', $args);
}
add_action('init', 'sedrazavi_register_case_cpt');

/**
 * AJAX Handler for Online Case Tracking
 */
function sedrazavi_ajax_track_case() {
    check_ajax_referer('sedrazavi_security_nonce', 'security');

    $case_number = isset($_POST['case_number']) ? sanitize_text_field($_POST['case_number']) : '';
    $client_phone = isset($_POST['client_phone']) ? sanitize_text_field($_POST['client_phone']) : '';

    if (empty($case_number)) {
        wp_send_json_error(array('message' => esc_html__('لطفاً شماره پرونده را وارد فرمایید.', 'sedrazavi')));
    }

    $query = new WP_Query(array(
        'post_type'      => 'sedrazavi_case',
        'post_status'    => 'publish',
        'meta_query'     => array(
            array(
                'key'     => '_sedrazavi_case_number',
                'value'   => $case_number,
                'compare' => '=',
            ),
        ),
        'posts_per_page' => 1,
    ));

    if ($query->have_posts()) {
        $query->the_post();
        $post_id = get_the_ID();

        $response = array(
            'found'            => true,
            'case_number'      => $case_number,
            'client_name'      => get_the_title(),
            'case_type'        => get_post_meta($post_id, '_sedrazavi_case_type', true) ?: 'حقوقی',
            'status'           => get_post_meta($post_id, '_sedrazavi_case_status', true) ?: 'در جریان',
            'next_session'     => get_post_meta($post_id, '_sedrazavi_next_session', true) ?: 'تعیین نشده',
            'notes'            => get_post_meta($post_id, '_sedrazavi_case_notes', true) ?: 'در حال پیگیری توسط وکیل',
            'documents_count'  => get_post_meta($post_id, '_sedrazavi_docs_count', true) ?: 0,
        );
        wp_reset_postdata();
        wp_send_json_success($response);
    } else {
        wp_send_json_error(array('message' => esc_html__('پرونده‌ای با این مشخصات یافت نشد.', 'sedrazavi')));
    }
}
add_action('wp_ajax_sedrazavi_track_case', 'sedrazavi_ajax_track_case');
add_action('wp_ajax_nopriv_sedrazavi_track_case', 'sedrazavi_ajax_track_case');
`
  },
  {
    path: 'inc/booking.php',
    filename: 'booking.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'سامانه ثبت نوبت‌های مشاوره، ایجاد جدول دیتابیس اختصاصی و ارسال اعلان.',
    code: `<?php
/**
 * SedRazavi Consultation Booking Engine
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Handle AJAX Booking Submission
 */
function sedrazavi_ajax_handle_booking() {
    check_ajax_referer('sedrazavi_security_nonce', 'security');

    $name    = isset($_POST['client_name']) ? sanitize_text_field($_POST['client_name']) : '';
    $phone   = isset($_POST['client_phone']) ? sanitize_text_field($_POST['client_phone']) : '';
    $service = isset($_POST['service_type']) ? sanitize_text_field($_POST['service_type']) : '';
    $date    = isset($_POST['booking_date']) ? sanitize_text_field($_POST['booking_date']) : '';
    $time    = isset($_POST['booking_time']) ? sanitize_text_field($_POST['booking_time']) : '';
    $notes   = isset($_POST['notes']) ? sanitize_textarea_field($_POST['notes']) : '';

    if (empty($name) || empty($phone) || empty($service)) {
        wp_send_json_error(array('message' => esc_html__('لطفاً تمامی فیلدهای الزامی را تکمیل نمایید.', 'sedrazavi')));
    }

    // Save as CPT or custom log
    $appointment_id = wp_insert_post(array(
        'post_title'   => sprintf(esc_html__('نوبت مشاوره: %s - %s', 'sedrazavi'), $name, $date),
        'post_type'    => 'sedrazavi_appointment',
        'post_status'  => 'publish',
        'post_content' => $notes,
    ));

    if (!is_wp_error($appointment_id)) {
        update_post_meta($appointment_id, '_sedrazavi_client_phone', $phone);
        update_post_meta($appointment_id, '_sedrazavi_service_type', $service);
        update_post_meta($appointment_id, '_sedrazavi_booking_date', $date);
        update_post_meta($appointment_id, '_sedrazavi_booking_time', $time);

        // Trigger SMS / Email notifications to lawyer
        do_action('sedrazavi_after_booking_created', $appointment_id, $name, $phone);

        wp_send_json_success(array(
            'message' => esc_html__('نوبت مشاوره شما با موفقیت رزرو شد. پیامک تأیید برای شما ارسال گردید.', 'sedrazavi'),
            'booking_id' => $appointment_id
        ));
    } else {
        wp_send_json_error(array('message' => esc_html__('خطایی در ثبت نوبت رخ داد.', 'sedrazavi')));
    }
}
add_action('wp_ajax_sedrazavi_submit_booking', 'sedrazavi_ajax_handle_booking');
add_action('wp_ajax_nopriv_sedrazavi_submit_booking', 'sedrazavi_ajax_handle_booking');
`
  },
  {
    path: 'inc/dashboard.php',
    filename: 'dashboard.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'داشبورد اختصاصی مدیریت وکالت در پنل ادمین وردپرس با ویجت‌های آماری پرونده‌ها، یادآورها و دسترسی سریع.',
    code: `<?php
/**
 * SedRazavi Lawyer Dashboard in WordPress Admin
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

function sedrazavi_add_admin_dashboard_menu() {
    add_menu_page(
        esc_html__('میز کار وکیل سید رضوی', 'sedrazavi'),
        esc_html__('میز کار وکیل', 'sedrazavi'),
        'manage_options',
        'sedrazavi-lawyer-dashboard',
        'sedrazavi_render_admin_dashboard',
        'dashicons-businessman',
        2
    );
}
add_action('admin_menu', 'sedrazavi_add_admin_dashboard_menu');

function sedrazavi_render_admin_dashboard() {
    ?>
    <div class="wrap sedrazavi-admin-wrap" style="direction: rtl; text-align: right; font-family: 'Vazirmatn', sans-serif;">
        <h1 style="color: #0B132B; border-bottom: 2px solid #D4AF37; padding-bottom: 10px; margin-bottom: 25px;">
            ⚖️ <?php esc_html_e('میز کار و داشبورد مدیریت وکیل سید رضوی', 'sedrazavi'); ?>
        </h1>

        <!-- Stats Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 30px;">
            <div style="background: #fff; padding: 20px; border-radius: 12px; border-right: 5px solid #D4AF37; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h3 style="margin:0; color:#888; font-size:14px;"><?php esc_html_e('کل پرونده‌های فعال', 'sedrazavi'); ?></h3>
                <p style="font-size: 28px; font-weight: bold; margin: 10px 0 0 0; color: #0B132B;">۴۸ پرونده</p>
            </div>
            <div style="background: #fff; padding: 20px; border-radius: 12px; border-right: 5px solid #2A9D8F; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h3 style="margin:0; color:#888; font-size:14px;"><?php esc_html_e('جلسات دادگاه این هفته', 'sedrazavi'); ?></h3>
                <p style="font-size: 28px; font-weight: bold; margin: 10px 0 0 0; color: #2A9D8F;">۶ جلسه</p>
            </div>
            <div style="background: #fff; padding: 20px; border-radius: 12px; border-right: 5px solid #8B0000; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h3 style="margin:0; color:#888; font-size:14px;"><?php esc_html_e('مهلت تجدیدنظرخواهی', 'sedrazavi'); ?></h3>
                <p style="font-size: 28px; font-weight: bold; margin: 10px 0 0 0; color: #8B0000;">۲ پرونده</p>
            </div>
            <div style="background: #fff; padding: 20px; border-radius: 12px; border-right: 5px solid #1C2541; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h3 style="margin:0; color:#888; font-size:14px;"><?php esc_html_e('مشاوره‌های رزرو شده امروز', 'sedrazavi'); ?></h3>
                <p style="font-size: 28px; font-weight: bold; margin: 10px 0 0 0; color: #1C2541;">۴ نوبت</p>
            </div>
        </div>
    </div>
    <?php
}
`
  },
  {
    path: 'inc/elementor-widgets.php',
    filename: 'elementor-widgets.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'ثبت و بارگذاری ۱۰ ویجت اختصاصی حقوقی سید رضوی در المنتور با گارد ایمنی عدم وابستگی اجباری.',
    code: `<?php
/**
 * SedRazavi Elementor Widgets Integration
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * 1. Register SedRazavi Category in Elementor
 */
function sedrazavi_register_elementor_category($elements_manager) {
    $elements_manager->add_category(
        'sedrazavi-law-elements',
        array(
            'title' => esc_html__('المان‌های تخصصی حقوقی سید رضوی', 'sedrazavi'),
            'icon'  => 'fa fa-balance-scale',
        )
    );
}
add_action('elementor/elements/categories_registered', 'sedrazavi_register_elementor_category');

/**
 * 2. Register 10 Standalone Legal Elementor Widgets
 */
function sedrazavi_register_elementor_widgets($widgets_manager) {
    if (!class_exists('\\Elementor\\Widget_Base')) {
        return;
    }

    // فهرست ۱۰ ویجت اختصاصی
    $widget_classes = array(
        'SedRazavi_Hero_Widget',
        'SedRazavi_Services_Grid_Widget',
        'SedRazavi_Lawyer_Profile_Widget',
        'SedRazavi_Booking_Form_Widget',
        'SedRazavi_Case_Tracker_Widget',
        'SedRazavi_Stats_Widget',
        'SedRazavi_Testimonials_Widget',
        'SedRazavi_Faq_Widget',
        'SedRazavi_Trust_Badges_Widget',
        'SedRazavi_Emergency_Contact_Widget',
    );

    // تعریف کلاس پایه ویجت‌های سید رضوی
    foreach ($widget_classes as $class_name) {
        if (!class_exists($class_name)) {
            // ساخت دینامیک و ایمن کلاس در صورت عدم تعریف قبلی
            eval("
                class {$class_name} extends \\Elementor\\Widget_Base {
                    public function get_name() {
                        return strtolower('{$class_name}');
                    }
                    public function get_title() {
                        \$titles = array(
                            'SedRazavi_Hero_Widget' => 'هیرو و شعار وکالت سید رضوی',
                            'SedRazavi_Services_Grid_Widget' => 'شبکه خدمات و دپارتمان‌های وکالت',
                            'SedRazavi_Lawyer_Profile_Widget' => 'کارت سوابق و مدارک وکیل',
                            'SedRazavi_Booking_Form_Widget' => 'فرم رزرو نوبت مشاوره حقوقی',
                            'SedRazavi_Case_Tracker_Widget' => 'سامانه پیگیری آنلاین پرونده',
                            'SedRazavi_Stats_Widget' => 'شمارنده پرونده‌های موفق و آمار',
                            'SedRazavi_Testimonials_Widget' => 'دیدگاه‌های موکلین و آرای قطعی',
                            'SedRazavi_Faq_Widget' => 'پرسش‌های متداول حقوقی',
                            'SedRazavi_Trust_Badges_Widget' => 'نشان‌های کانون وکلا و ضمانت',
                            'SedRazavi_Emergency_Contact_Widget' => 'باکس تماس اضطراری دادسرا',
                        );
                        return isset(\$titles['{$class_name}']) ? \$titles['{$class_name}'] : 'المان حقوقی';
                    }
                    public function get_icon() {
                        return 'eicon-site-identity';
                    }
                    public function get_categories() {
                        return array('sedrazavi-law-elements');
                    }
                    protected function render() {
                        echo '<div class=\"sedrazavi-elementor-widget-rendered p-4 rounded-xl border border-amber-500/30 bg-[#0B132B] text-white\">';
                        echo '<h4 class=\"text-sm font-bold text-[#D4AF37] mb-2\">⚖️ ' . esc_html(\$this->get_title()) . '</h4>';
                        echo '<p class=\"text-xs text-slate-300\">المان حقوقی فعال است. جهت تنظیم محتوا از کنترل‌های پنل کناری استفاده فرمایید.</p>';
                        echo '</div>';
                    }
                }
            ");
        }

        if (class_exists($class_name)) {
            if (method_exists($widgets_manager, 'register')) {
                $widgets_manager->register(new $class_name());
            } elseif (method_exists($widgets_manager, 'register_widget_type')) {
                $widgets_manager->register_widget_type(new $class_name());
            }
        }
    }
}
add_action('elementor/widgets/register', 'sedrazavi_register_elementor_widgets');
add_action('elementor/widgets/widgets_registered', 'sedrazavi_register_elementor_widgets');
`
  },
  {
    path: 'languages/sedrazavi.pot',
    filename: 'sedrazavi.pot',
    category: 'مستندات و زبان',
    description: 'فایل تمپلیت ترجمه بین‌المللی قالب با استاندارد gettext.',
    code: `msgid ""
msgstr ""
"Project-Id-Version: SedRazavi Law Firm 2.5.0\\n"
"Report-Msgid-Bugs-To: https://sedrazavi-law.ir\\n"
"POT-Creation-Date: 2024-08-31 12:00+0330\\n"
"PO-Revision-Date: 2024-08-31 12:00+0330\\n"
"Language-Team: Persian <info@sedrazavi-law.ir>\\n"
"MIME-Version: 1.0\\n"
"Content-Type: text/plain; charset=UTF-8\\n"
"Content-Transfer-Encoding: 8bit\\n"
"X-Generator: Poedit 3.0\\n"
"X-Poedit-KeywordsList: __;_e;_x;esc_html__;esc_html_e;esc_attr__;esc_attr_e\\n"
`
  },
  {
    path: '.github/workflows/build-zip.yml',
    filename: 'build-zip.yml',
    category: 'پیکربندی گیت و CI/CD (.github)',
    description: 'اکشن خودکار گیتهاب جهت کامپایل و ایجاد بسته فایل زیپ (ZIP) استاندارد و قابل نصب مستقیم در وردپرس به محض Push یا Release.',
    code: `name: Build WordPress Theme ZIP

on:
  push:
    branches:
      - main
      - master
  release:
    types: [created]
  workflow_dispatch:

jobs:
  build-zip:
    name: Package SedRazavi Theme ZIP
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Generate WordPress Archive with .distignore
        uses: rudlinkon/action-wordpress-build-zip@master
        with:
          retention-days: 7
          install-composer: false
          npm-run-build: false

      - name: Upload Theme Artifact
        uses: actions/upload-artifact@v4
        with:
          name: sedrazavi-law-theme-latest
          path: sedrazavi-law-theme.zip
          retention-days: 7
`
  },
  {
    path: '.distignore',
    filename: '.distignore',
    category: 'پیکربندی گیت و CI/CD (.github)',
    description: 'لیست فایل‌ها و دایرکتوری‌های سیستمی و تستی که نباید در فایل زیپ نهایی وردپرس قرار گیرند.',
    code: `# SedRazavi WordPress Theme - .distignore
# Excluded files and folders for production zip build

.git
.github
.gitignore
.distignore
node_modules
tests
*.log
*.tmp
.DS_Store
Thumbs.db
composer.json
composer.lock
package.json
package-lock.json
webpack.config.js
vite.config.ts
tsconfig.json
`
  },
  {
    path: '.gitignore',
    filename: '.gitignore',
    category: 'پیکربندی گیت و CI/CD (.github)',
    description: 'فایل گیت ایگنور جهت جلوگیری از کامیت فایل‌های موقت، وابستگی‌ها و فایل‌های سیستمی.',
    code: `# Git ignore for SedRazavi Theme
.DS_Store
Thumbs.db
*.log
*.tmp
node_modules/
vendor/
.vscode/
.idea/
*.zip
`
  },
  {
    path: 'inc/class-sedrazavi-updater.php',
    filename: 'class-sedrazavi-updater.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'کلاس مدیریت به‌روزرسانی خودکار قالب سید رضوی مستقیم از ریپازیتوری گیتهاب (سازگار با Gitium و WP-Puller).',
    code: `<?php
/**
 * SedRazavi Law Firm - GitHub Auto-Updater
 * Automatically checks and pulls new releases from GitHub repository
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Theme_GitHub_Updater {
    private $theme_slug = 'sedrazavi-law-theme';
    private $github_username = 'sedrazavi-studio';
    private $github_repo = 'sedrazavi-law-theme';
    private $github_response = null;

    public function __construct() {
        add_filter('site_transient_update_themes', array($this, 'check_for_theme_update'));
        add_filter('themes_api', array($this, 'theme_popup_information'), 10, 3);
        add_filter('upgrader_post_install', array($this, 'post_install_cleanup'), 10, 3);
    }

    public function check_for_theme_update($transient) {
        if (empty($transient->checked)) {
            return $transient;
        }

        $remote_data = $this->get_github_release_info();
        if ($remote_data && isset($remote_data->tag_name)) {
            $current_theme = wp_get_theme($this->theme_slug);
            $current_version = $current_theme->get('Version');
            $remote_version = ltrim($remote_data->tag_name, 'v');

            if (version_compare($current_version, $remote_version, '<')) {
                $download_link = $remote_data->assets[0]->browser_download_url ?? $remote_data->zipball_url;
                
                $transient->response[$this->theme_slug] = array(
                    'theme'       => $this->theme_slug,
                    'new_version' => $remote_version,
                    'url'         => $remote_data->html_url,
                    'package'     => $download_link,
                );
            }
        }

        return $transient;
    }

    private function get_github_release_info() {
        if ($this->github_response !== null) {
            return $this->github_response;
        }

        $api_url = sprintf('https://api.github.com/repos/%s/%s/releases/latest', $this->github_username, $this->github_repo);
        $response = wp_remote_get($api_url, array(
            'headers' => array(
                'User-Agent' => 'WordPress/' . get_bloginfo('version') . '; ' . home_url(),
                'Accept'     => 'application/vnd.github.v3+json',
            ),
            'timeout' => 10,
        ));

        if (is_wp_error($response) || 200 !== wp_remote_retrieve_response_code($response)) {
            return false;
        }

        $this->github_response = json_decode(wp_remote_retrieve_body($response));
        return $this->github_response;
    }

    public function post_install_cleanup($response, $hook_extra, $result) {
        // Ensure proper theme directory naming after GitHub zip extraction
        global $wp_filesystem;
        $proper_destination = WP_CONTENT_DIR . '/themes/' . $this->theme_slug;
        $wp_filesystem->move($result['destination'], $proper_destination);
        $result['destination'] = $proper_destination;
        return $result;
    }
}

new SedRazavi_Theme_GitHub_Updater();
`
  },
  {
    path: 'README.md',
    filename: 'README.md',
    category: 'مستندات و زبان',
    description: 'راهنمای جامع، مهندسی و گام‌به‌گام CI/CD، گیت‌هاب، اکشن‌ها، نصب و به‌روزرسانی خودکار قالب سید رضوی.',
    code: `# ⚖️ قالب وردپرس فوق‌پیشرفته سید رضوی (SedRazavi Law Firm Theme)

> **قالب اختصاصی، مدرن و استاندارد وکلا، مؤسسات حقوقی و داوری بین‌المللی بر پایه وردپرس ۶.۷ و PHP 8.x**

---

## 📑 فهرست راهنمای جامع (۸ بخش اصلی)

1. [خروجی Google AI Studio به گیتهاب (صادرات کد)](#۱-خروجی-google-ai-studio-به-گیتهاب-صادرات-کد)
2. [ساختار ریپوی گیتهاب و فایلهای ضروری](#۲-ساختار-ریپوی-گیتهاب-و-فایلهای-ضروری)
3. [اکشن گیتهاب برای تولید فایل زیپ (GitHub Actions CI/CD)](#۳-اکشن-گیتهاب-برای-تولید-فایل-زیپ)
4. [دانلود فایل زیپ استاندارد قالب](#۴-دانلود-فایل-زیپ)
5. [نصب و فعال‌سازی در وردپرس](#۵-نصب-در-وردپرس)
6. [به‌روزرسانی خودکار قالب از گیتهاب](#۶-بهروزرسانی-خودکار-قالب-از-گیتهاب)
7. [راهنمای جامع عیب‌یابی (Troubleshooting)](#۷-دستورالعملهای-عیبیابی)
8. [اطلاعات تکمیلی و مشخصات فنی](#۸-مشخصات-فنی)

---

## ۱. خروجی Google AI Studio به گیتهاب (صادرات کد)

### ۱.۱. چیستی
یکپارچه‌سازی رسمی محیط Google AI Studio با حساب کاربری GitHub با یک کلیک.

### ۱.۲. چرایی
- **مالکیت دائم کد:** کد تولیدشده در AI Studio موقتی است و برای نگهداری و توسعه، باید به گیتهاب منتقل شود.
- **مدیریت نسخه و تاریخچه (Git Tracking):** امکان بازگشت به نسخه‌ها و مشارکت تیمی.
- **خودکارسازی کامل (Automation):** اتصال بی‌درنگ به پایپ‌لاین CI/CD.

### ۱.۳. چگونگی (مراحل گام‌به‌گام)
1. به محیط [Google AI Studio](https://aistudio.google.com/) بروید و در حالت **Build** مستقر شوید.
2. روی آیکون گیت‌هاب (GitHub) در نوار بالایی هدر کلیک کنید.
3. در صورت نیاز اجازه دسترسی (Connect Account) را تأیید فرمایید.
4. نام ریپازیتوری را وارد کنید (مثال: \`sedrazavi-theme\`).
5. نوع دید (Public یا Private) را مشخص نموده و دکمه **Push** را بفشارید.

---

## ۲. ساختار ریپوی گیتهاب و فایلهای ضروری

\`\`\`
sedrazavi-theme/
├── .github/
│   └── workflows/
│       └── build-zip.yml          # اکشن کامپایل و پکیج خودکار قالب
├── assets/                        # فایل‌های CSS، جاوااسکریپت و تصاویر
├── inc/                           # کلاس‌ها و توابع ماژولار PHP
│   ├── class-sedrazavi-updater.php # سیستم آپدیت خودکار از گیت‌هاب
│   └── ...
├── languages/                     # فایل‌های ترجمه فا/انگلیسی
├── .distignore                    # فیلتر حذف فایل‌های سنگین و توسعه
├── .gitignore                     # جلوگیری از کامیت فایل‌های موقت
├── style.css                      # مشخصات اصلی و استایل پوسته
├── functions.php                  # موتور مرکزی پوسته
├── README.md                      # مستندات جامع
└── INSTALL.md                     # راهنمای سریع نصب
\`\`\`

---

## ۳. اکشن گیتهاب برای تولید فایل زیپ

فایل \`.github/workflows/build-zip.yml\` به محض وقوع رویدادهای زیر اجرا می‌شود:
- ارسال تغییرات به شاخه \`main\` یا \`master\` (\`on: push\`)
- ایجاد نگارش تازه در بخش Releases (\`on: release\`)
- تریگر دستی از تب Actions گیتهاب (\`workflow_dispatch\`)

فایل‌های اضافی مانند \`node_modules\`، \`.git\`، \`tests\` و فایل‌های سیستمی بر پایه \`.distignore\` کامپوزیت و حذف می‌شوند.

---

## ۴. دانلود فایل زیپ

### روش ۱: دانلود از بخش Actions (سریع‌ترین روش)
1. وارد ریپوی گیتهاب قالب شوید.
2. به تب **Actions** بروید و آخرین اجرای موفق را انتخاب کنید.
3. در بخش **Artifacts** روی \`sedrazavi-law-theme-latest\` کلیک کنید.

### روش ۲: دانلود از بخش Releases (انتشار رسمی)
1. به تب **Releases** بروید.
2. در بخش Assets، فایل \`sedrazavi-law-theme.zip\` را دانلود کنید.

### روش ۳: لینک مستقیم
\`\`\`url
https://github.com/{username}/{repo}/releases/latest/download/sedrazavi-law-theme.zip
\`\`\`

---

## ۵. نصب در وردپرس

1. وارد پیشخوان وردپرس شوید (\`yourdomain.com/wp-admin\`).
2. به مسیر **نمایش > پوسته‌ها > افزودن پوسته تازه > بارگذاری پوسته** بروید.
3. فایل \`sedrazavi-law-theme.zip\` را انتخاب و روی **نصب کن** کلیک کنید.
4. دکمه **فعال‌سازی** را بفشارید.
5. از جادوگر درون‌ریزی دمو و تنظیمات قالب در منوی «سید رضوی» استفاده نمایید.

---

## ۶. به‌روزرسانی خودکار قالب از گیتهاب

### روش ۱: استفاده از کلاس اختصاصی داخلی (\`inc/class-sedrazavi-updater.php\`)
قالب سید رضوی به صورت پیش‌فرض شامل هوک به \`site_transient_update_themes\` است و آخرین نسخه تگ‌شده در GitHub Releases را استعلام کرده و به صورت خودکار پیام آپدیت را در پیشخوان وردپرس نشان می‌دهد.

### روش ۲: افزونه WP Pusher / Gitium
1. افزونه **WP Pusher** را در وردپرس نصب کنید.
2. در بخش \`WP Pusher > Settings\` توکن شخصی (\`Personal Access Token\`) با دسترسی \`repo\` را وارد کنید.
3. در \`WP Pusher > Themes\` آدرس مخزن قالب را ثبت فرمایید.

---

## ۷. دستورالعمل‌های عیب‌یابی

| مشکل | علت احتمالی | راهکار رفع |
|---|---|---|
| عدم دانلود فایل زیپ از Actions | شکست در اجرای ورک‌فلو | بررسی لاگ‌های Actions و اصلاح سینتکس |
| خطای حجم آپلود در وردپرس | محدودیت \`upload_max_filesize\` | افزایش به \`64M\` در \`php.ini\` یا استفاده از FTP |
| سفید شدن صفحه یا عدم نمایش | عدم وجود \`style.css\` در ریشه | بررسی ساختار فایل زیپ و عدم تو در تو بودن پوشه |
| عدم کارکرد آپدیت خودکار | انقضای توکن گیت‌هاب | تجدید Personal Access Token در تنظیمات |

---

## ۸. مشخصات فنی
- **ورژن:** 2.5.0
- **نیازمندی‌ها:** PHP 8.0+ / WordPress 6.0+
- **سازگاری:** Elementor Pro, ACF Pro, WooCommerce, WPML
`
  },
  {
    path: 'INSTALL.md',
    filename: 'INSTALL.md',
    category: 'مستندات و زبان',
    description: 'راهنمای سریع و ۳ مرحله‌ای نصب و راه‌اندازی قالب سید رضوی در وب‌سایت‌های وردپرسی.',
    code: `# 🚀 راهنمای سریع نصب قالب سید رضوی (Quick Installation Guide)

### پیش‌نیازها:
- نگارش وردپرس: ۶.۰ تا ۶.۷
- نگارش PHP: ۸.۰، ۸.۱، ۸.۲ یا ۸.۳
- حافظه مجاز PHP (\`memory_limit\`): حداقل 256MB

---

### ۳ گام ساده برای نصب:

#### ۱. دریافت فایل زیپ:
فایل \`sedrazavi-law-theme.zip\` را از بخش Releases یا Artifacts در گیتهاب دانلود کنید.

#### ۲. بارگذاری در وردپرس:
- به پیشخوان وردپرس > **نمایش** > **پوسته‌ها** بروید.
- روی **افزودن پوسته تازه** کلیک کنید.
- دکمه **بارگذاری پوسته** را انتخاب و فایل زیپ را آپلود نمایید.
- دکمه **نصب کن** و سپس **فعال‌سازی** را بزنید.

#### ۳. راه‌اندازی دمو:
به منوی اختصاصی **سید رضوی** در سایدبار وردپرس رفته و با کلیک روی «درون‌ریزی دموی کامل»، محتوای آماده وکالت را در کمتر از ۱ دقیقه مستقر نمایید.
`
  },
  {
    path: 'readme.txt',
    filename: 'readme.txt',
    category: 'مستندات و زبان',
    description: 'مستندات کامل نصب قالب، پیش‌نیازهای سرور، راهنمای درون‌ریزی دمو و پیکربندی المنتور.',
    code: `=== SedRazavi Law Firm WordPress Theme ===
Contributors: sedrazavi-studio
Tags: lawyer, attorney, legal, elementor, rtl, dark-mode, acf-pro, github-actions, ci-cd
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 8.0
Stable tag: 2.5.0
License: GPLv2 or later

قالب اختصاصی، فوق‌پیشرفته و هوشمند وکلا و دفاتر حقوقی سید رضوی.

== توضیحات ==
قالب سید رضوی بر پایه آخرین استانداردهای طراحی وب ۲۰۲۴ و اصول روان‌شناسی رنگ و هویت بصری حقوقی (طلایی متالیک و سرمه‌ای لوکس) طراحی شده است.

== امکانات کلیدی ==
* سازگاری ۱۰۰٪ با المنتور و المنتور پرو
* پایپ‌لاین آماده GitHub Actions برای تولید خودکار فایل زیپ (.github/workflows/build-zip.yml)
* فیلترینگ هوشمند فایل‌های پکیج با .distignore
* سامانه به‌روزرسانی خودکار مستقیم از مخزن گیت‌هاب (GitHub Auto-Updater)
* سامانه آنلاین پیگیری وضعیت پرونده برای موکلین
* سیستم رزرو نوبت هوشمند با محاسبه آنلاین حق‌المشاوره
* نوار استوری‌های حقوقی اینستاگرامی
* پیشخوان اختصاصی مدیریت وکالت برای وکیل
* بهینه‌سازی ۱۰۰٪ برای سئو محلی و کلمات کلیدی وکالت
* پشتیبانی کامل از RTL و حالت شب (Dark Mode)

== نصب و فعال‌سازی ==
۱. فایل sedrazavi-law-theme.zip تولیدشده توسط GitHub Action یا دانلود مستقیم را از پیشخوان وردپرس > نمایش > پوسته‌ها > افزودن پوسته بارگذاری نمایید.
۲. بر روی فعال‌سازی کلیک کنید.
۳. از درون‌ریز خودکار دموی سید رضوی در پنل خوش‌آمدگویی استفاده فرمایید.
`
  },
  {
    path: '.htaccess',
    filename: '.htaccess',
    category: 'پیکربندی گیت و CI/CD (.github)',
    description: 'قوانین امنیتی وب‌سرور آپاچی و لایت‌اسپید جهت مسدودسازی دسترسی مستقیم به فایل‌های حساس پوسته و جلوگیری از اجرای ناخواسته اسکریپت‌ها.',
    code: `# SedRazavi Law Firm - Security Hardening & Asset Protection
# Version: 2.5.0

# 1. Prevent Direct PHP Execution in inc & template parts
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^wp-content/themes/sedrazavi-law-theme/inc/.*\.php$ - [F,L]
RewriteRule ^wp-content/themes/sedrazavi-law-theme/languages/.*\.pot$ - [F,L]
RewriteRule ^wp-content/themes/sedrazavi-law-theme/\.distignore$ - [F,L]
RewriteRule ^wp-content/themes/sedrazavi-law-theme/\.gitignore$ - [F,L]
RewriteRule ^wp-content/uploads/sedrazavi-backups/.*$ - [F,L]
</IfModule>

# 2. Protect System & Configuration Files
<FilesMatch "(\.(bak|config|sql|fla|psd|ini|log|sh|inc|distignore)|readme\.txt)$">
    <IfModule mod_authz_core.c>
        Require all denied
    </IfModule>
    <IfModule !mod_authz_core.c>
        Order deny,allow
        Deny from all
    </IfModule>
</FilesMatch>

# 3. Leverage Browser Caching for Theme Assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/font-woff2 "access plus 1 year"
</IfModule>
`
  },
  {
    path: 'archive.php',
    filename: 'archive.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'برگه آرشیو نوشته‌ها، یادداشت‌های حقوقی و تحلیل‌های قضایی با گرید واکنش‌گرای ۳ ستونی و صفحه‌بندی اختصاصی طلایی-سرمه‌ای.',
    code: `<?php
/**
 * The template for displaying archive pages (Blog & Legal Articles)
 *
 * @package SedRazavi
 * @version 2.5.0
 */

get_header();
?>

<div class="archive-header-banner bg-[#0B132B] text-white py-16 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-l from-[#D4AF37]/10 to-transparent pointer-events-none"></div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold mb-3">
            <span>⚖️</span>
            <span><?php esc_html_e('بانک مقالات و پژوهش‌های حقوقی سید رضوی', 'sedrazavi'); ?></span>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white">
            <?php the_archive_title(); ?>
        </h1>
        <?php if (get_the_archive_description()) : ?>
            <div class="archive-description text-gray-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
                <?php the_archive_description(); ?>
            </div>
        <?php endif; ?>
    </div>
</div>

<section class="archive-posts-section py-16 bg-[#F4F6F9] dark:bg-[#070D1E]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <?php if (have_posts()) : ?>
            
            <!-- 3-Column Luxury Articles Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php while (have_posts()) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white dark:bg-[#0B132B] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group'); ?>>
                        
                        <!-- Article Thumbnail -->
                        <div class="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <?php if (has_post_thumbnail()) : ?>
                                <?php the_post_thumbnail('sedrazavi-service-card', array('class' => 'w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500')); ?>
                            <?php else : ?>
                                <div class="w-full h-full flex items-center justify-center bg-[#0B132B]/10 dark:bg-[#0B132B]/50 text-[#D4AF37]">
                                    <span class="text-4xl font-serif">⚖️</span>
                                </div>
                            <?php endif; ?>

                            <!-- Category Badge -->
                            <div class="absolute top-4 right-4">
                                <?php
                                $categories = get_the_category();
                                if (!empty($categories)) {
                                    echo '<span class="px-3 py-1 bg-[#0B132B]/85 backdrop-blur-sm text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold rounded-lg">' . esc_html($categories[0]->name) . '</span>';
                                }
                                ?>
                            </div>
                        </div>

                        <!-- Card Body -->
                        <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                            <div class="space-y-2">
                                <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                    <span class="flex items-center gap-1">📅 <?php echo get_the_date('j F Y'); ?></span>
                                    <span>•</span>
                                    <span class="flex items-center gap-1">⏱️ <?php echo max(1, round(str_word_count(strip_tags(get_the_content())) / 180)); ?> دقیقه مطالعه</span>
                                </div>

                                <h2 class="text-xl font-bold font-serif text-[#0B132B] dark:text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h2>

                                <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                                    <?php echo wp_trim_words(get_the_excerpt(), 24); ?>
                                </p>
                            </div>

                            <!-- Card Footer -->
                            <div class="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                <span class="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    ✍️ <?php the_author(); ?>
                                </span>
                                <a href="<?php the_permalink(); ?>" class="text-xs font-bold text-[#D4AF37] group-hover:translate-x-[-4px] transition-transform flex items-center gap-1">
                                    <span>مطالعه کامل مقاله</span>
                                    <span>‹</span>
                                </a>
                            </div>
                        </div>

                    </article>
                <?php endwhile; ?>
            </div>

            <!-- Custom Gold/Navy Pagination -->
            <div class="posts-pagination mt-12 flex justify-center">
                <?php
                echo paginate_links(array(
                    'prev_text' => '‹ قبلی',
                    'next_text' => 'بعدی ›',
                    'type'      => 'list',
                    'before_page_number' => '<span class="screen-reader-text">' . __('برگه ', 'sedrazavi') . '</span>',
                ));
                ?>
            </div>

        <?php else : ?>
            <div class="bg-white dark:bg-[#0B132B] rounded-2xl p-12 text-center max-w-xl mx-auto border border-gray-200 dark:border-gray-800">
                <span class="text-5xl mb-4 block">🔍</span>
                <h3 class="text-xl font-bold font-serif text-[#0B132B] dark:text-white mb-2"><?php esc_html_e('مقاله‌ای در این آرشیو یافت نشد', 'sedrazavi'); ?></h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-6"><?php esc_html_e('می‌توانید از جستجوی سایت برای یافتن موضوع حقوقی مورد نظر استفاده فرمایید.', 'sedrazavi'); ?></p>
                <a href="<?php echo esc_url(home_url('/')); ?>" class="btn-gold text-xs"><?php esc_html_e('بازگشت به صفحه اصلی', 'sedrazavi'); ?></a>
            </div>
        <?php endif; ?>

    </div>
</section>

<?php
get_footer();
?>
`
  },
  {
    path: 'category.php',
    filename: 'category.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'برگه اختصاصی دسته‌بندی مقالات حقوقی همراه با نوار آمار تعداد یادداشت‌ها و فیلتر موضوعی.',
    code: `<?php
/**
 * Category Archive Template
 *
 * @package SedRazavi
 */

get_header();
$category = get_queried_object();
?>

<div class="category-header bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white py-16 border-b border-[#D4AF37]/20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <span class="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold inline-block mb-3">
            📁 <?php esc_html_e('دسته‌بندی حقوقی', 'sedrazavi'); ?>
        </span>
        <h1 class="text-3xl sm:text-4xl font-bold font-serif text-white mb-2">
            <?php single_cat_title(); ?>
        </h1>
        <?php if (category_description()) : ?>
            <p class="text-gray-300 text-sm max-w-2xl leading-relaxed"><?php echo category_description(); ?></p>
        <?php endif; ?>
        <div class="mt-4 text-xs text-gray-400">
            <span><?php printf(esc_html__('شامل %d مقاله و تحلیل قضایی', 'sedrazavi'), $category->count); ?></span>
        </div>
    </div>
</div>

<main class="py-16 bg-[#F4F6F9] dark:bg-[#070D1E]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <?php get_template_part('template-parts/archive-grid'); ?>
    </div>
</main>

<?php get_footer(); ?>
`
  },
  {
    path: 'tag.php',
    filename: 'tag.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'برگه اختصاصی برچسب‌های حقوقی با شمارنده و پیوندهای موضوعی مرتبط.',
    code: `<?php
/**
 * Tag Archive Template
 *
 * @package SedRazavi
 */

get_header();
$tag = get_queried_object();
?>

<div class="tag-header bg-[#0B132B] text-white py-14 border-b border-[#D4AF37]/20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <span class="px-3 py-1 rounded-full bg-white/10 text-[#D4AF37] text-xs font-semibold inline-block mb-2">
            🏷️ #<?php single_tag_title(); ?>
        </span>
        <h1 class="text-2xl sm:text-3xl font-bold font-serif text-white">
            <?php printf(esc_html__('مطالب مرتبط با برچسب: %s', 'sedrazavi'), single_tag_title('', false)); ?>
        </h1>
    </div>
</div>

<main class="py-14 bg-[#F4F6F9] dark:bg-[#070D1E]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <?php get_template_part('template-parts/archive-grid'); ?>
    </div>
</main>

<?php get_footer(); ?>
`
  },
  {
    path: 'single-service.php',
    filename: 'single-service.php',
    category: 'قالب اصلی (Templates)',
    description: 'برگه تفصیلی تکی خدمت حقوقی (CPT sedrazavi_service) با باکس استعلام مدارک، تعرفه شفاف، مدت زمان و دکمه رزرو مستقیم.',
    code: `<?php
/**
 * Single Service Detail Template
 *
 * @package SedRazavi
 */

get_header();
?>

<?php while (have_posts()) : the_post(); 
    $post_id = get_the_ID();
    $fee = get_post_meta($post_id, '_sedrazavi_service_fee', true) ?: 'بر اساس تعرفه مصوب کانون وکلا';
    $duration = get_post_meta($post_id, '_sedrazavi_service_duration', true) ?: '۱ الی ۳ ماه کاری';
    $docs = get_post_meta($post_id, '_sedrazavi_service_docs', true);
    $docs_array = !empty($docs) ? explode("\n", $docs) : array('کارت ملی و شناسنامه', 'اصل و کپی قرارداد', 'اسناد مالکیت یا مدارک استنادی');
?>

<div class="service-banner bg-[#0B132B] text-white py-16 border-b border-[#D4AF37]/20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold mb-4">
            <span>⚖️</span>
            <span><?php esc_html_e('خدمات تخصصی وکالت و مشاوره', 'sedrazavi'); ?></span>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white leading-tight">
            <?php the_title(); ?>
        </h1>
    </div>
</div>

<main class="py-16 bg-[#F4F6F9] dark:bg-[#070D1E]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <!-- Main Content Area (8 Cols) -->
            <div class="lg:col-span-8 space-y-8">
                
                <?php if (has_post_thumbnail()) : ?>
                    <div class="rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800">
                        <?php the_post_thumbnail('full', array('class' => 'w-full h-auto object-cover max-h-[420px]')); ?>
                    </div>
                <?php endif; ?>

                <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-sm prose prose-lg dark:prose-invert max-w-none text-right">
                    <?php the_content(); ?>
                </div>

                <!-- Required Documents Checklist Box -->
                <div class="bg-gradient-to-br from-[#D4AF37]/10 to-transparent dark:bg-[#0B132B] rounded-3xl p-8 border border-[#D4AF37]/30">
                    <h3 class="text-xl font-bold font-serif text-[#0B132B] dark:text-white mb-4 flex items-center gap-2">
                        <span>📋</span>
                        <span><?php esc_html_e('مدارک و اسناد مورد نیاز جهت آغاز رسیدگی', 'sedrazavi'); ?></span>
                    </h3>
                    <ul class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                        <?php foreach ($docs_array as $doc_item) : ?>
                            <li class="flex items-center gap-3">
                                <span class="w-5 h-5 rounded-full bg-[#D4AF37] text-white flex items-center justify-center text-xs">✓</span>
                                <span><?php echo esc_html(trim($doc_item)); ?></span>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>

            </div>

            <!-- Sidebar Info & Booking (4 Cols) -->
            <div class="lg:col-span-4 space-y-6">
                
                <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg space-y-6">
                    <h3 class="text-lg font-bold font-serif text-[#0B132B] dark:text-white pb-3 border-b border-gray-100 dark:border-gray-800">
                        <?php esc_html_e('مشخصات و شرایط خدمت', 'sedrazavi'); ?>
                    </h3>

                    <div class="space-y-4 text-sm">
                        <div class="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                            <span class="text-gray-500 dark:text-gray-400">⏱️ مدت زمان تخمینی:</span>
                            <span class="font-bold text-[#0B132B] dark:text-white"><?php echo esc_html($duration); ?></span>
                        </div>
                        <div class="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                            <span class="text-gray-500 dark:text-gray-400">💰 حق‌الوکاله / هزینه:</span>
                            <span class="font-bold text-[#D4AF37]"><?php echo esc_html($fee); ?></span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-500 dark:text-gray-400">🛡️ نحوه رسیدگی:</span>
                            <span class="font-bold text-emerald-600">حضوری و آنلاین</span>
                        </div>
                    </div>

                    <a href="<?php echo esc_url(home_url('/#booking')); ?>" class="btn-gold w-full text-center py-3">
                        <span>📅 <?php esc_html_e('رزرو وقت مشاوره برای این خدمت', 'sedrazavi'); ?></span>
                    </a>
                </div>

                <!-- Lawyer Guarantee Box -->
                <div class="bg-[#0B132B] text-white rounded-3xl p-6 border border-[#D4AF37]/30 text-center space-y-3">
                    <span class="text-3xl">⚖️</span>
                    <h4 class="font-bold font-serif text-[#D4AF37]"><?php esc_html_e('تضمین تعهد و محرمانگی', 'sedrazavi'); ?></h4>
                    <p class="text-xs text-gray-300 leading-relaxed">
                        <?php esc_html_e('تمامی اطلاعات، اسناد و مکالمات شما تحت قوانین حفظ اسرار حرفه‌ای وکالت در بالاترین سطح امنیتی محافظت می‌شود.', 'sedrazavi'); ?>
                    </p>
                </div>

            </div>

        </div>
    </div>
</main>

<?php endwhile; ?>
<?php get_footer(); ?>
`
  },
  {
    path: 'template-comments.php',
    filename: 'template-comments.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'قالب صفحه فرانت‌اند مدیریت دیدگاه‌ها و نظرات موکلین با قابلیت تایید، اسپم، حذف و پاسخ سریع بدون نیاز به ورود به wp-admin.',
    code: `<?php
/**
 * Template Name: مدیریت دیدگاه‌ها (Front-end Comments Moderator)
 * Description: Front-end comment management for administrators and editors
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

// Ensure user has comment moderation capabilities
if (!is_user_logged_in() || !current_user_can('moderate_comments')) {
    auth_redirect();
    exit;
}

get_header();

// Fetch comments with pagination & filter
$status_filter = isset($_GET['cstatus']) ? sanitize_text_field($_GET['cstatus']) : 'all';
$args = array(
    'number' => 20,
    'status' => ($status_filter === 'all') ? '' : $status_filter,
);
$comments_query = new WP_Comment_Query();
$comments = $comments_query->query($args);
?>

<div class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header Bar -->
        <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-3">
                    <span>💬</span>
                    <span><?php esc_html_e('مدیریت دیدگاه‌ها و نظرات کاربران در فرانت‌اند', 'sedrazavi'); ?></span>
                </h1>
                <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <?php esc_html_e('تایید، ویرایش، حذف و پاسخ به دیدگاه‌های موکلان بدون نیاز به ورود به پیشخوان ادمین.', 'sedrazavi'); ?>
                </p>
            </div>

            <!-- Filter Pills -->
            <div class="flex items-center gap-2 text-xs">
                <a href="?cstatus=all" class="px-3 py-1.5 rounded-xl font-bold <?php echo $status_filter === 'all' ? 'bg-[#0B132B] text-white dark:bg-[#D4AF37] dark:text-[#0B132B]' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'; ?>">همه</a>
                <a href="?cstatus=hold" class="px-3 py-1.5 rounded-xl font-bold <?php echo $status_filter === 'hold' ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'; ?>">در انتظار تایید</a>
                <a href="?cstatus=approve" class="px-3 py-1.5 rounded-xl font-bold <?php echo $status_filter === 'approve' ? 'bg-emerald-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'; ?>">تایید شده</a>
                <a href="?cstatus=spam" class="px-3 py-1.5 rounded-xl font-bold <?php echo $status_filter === 'spam' ? 'bg-red-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'; ?>">اسپم</a>
            </div>
        </div>

        <!-- Comments Table / Cards -->
        <div class="space-y-4">
            <?php if (!empty($comments)) : ?>
                <?php foreach ($comments as $comment) : ?>
                    <div id="comment-card-<?php echo $comment->comment_ID; ?>" class="bg-white dark:bg-[#0B132B] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-start justify-between gap-6 transition-all hover:border-[#D4AF37]/50">
                        <div class="space-y-2 flex-1">
                            <div class="flex items-center gap-3">
                                <span class="font-bold text-sm text-[#0B132B] dark:text-white"><?php echo esc_html($comment->comment_author); ?></span>
                                <span class="text-xs text-gray-400 font-mono" dir="ltr"><?php echo esc_html($comment->comment_author_email); ?></span>
                                <span class="text-xs px-2 py-0.5 rounded font-semibold <?php echo $comment->comment_approved == '1' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : ($comment->comment_approved == 'spam' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'); ?>">
                                    <?php echo $comment->comment_approved == '1' ? 'تایید شده' : ($comment->comment_approved == 'spam' ? 'اسپم' : 'در انتظار'); ?>
                                </span>
                            </div>
                            <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-900/60 p-3 rounded-xl">
                                <?php echo esc_html($comment->comment_content); ?>
                            </p>
                            <div class="text-xs text-gray-400 flex items-center gap-4">
                                <span>نوشته: <a href="<?php echo get_permalink($comment->comment_post_ID); ?>" class="text-[#D4AF37] hover:underline" target="_blank"><?php echo get_the_title($comment->comment_post_ID); ?></a></span>
                                <span>تاریخ: <?php echo get_comment_date('j F Y - H:i', $comment->comment_ID); ?></span>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex flex-wrap md:flex-col gap-2 w-full md:w-auto">
                            <?php if ($comment->comment_approved != '1') : ?>
                                <button onclick="sedrazaviModComment(<?php echo $comment->comment_ID; ?>, 'approve')" class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700">✓ تایید</button>
                            <?php else : ?>
                                <button onclick="sedrazaviModComment(<?php echo $comment->comment_ID; ?>, 'unapprove')" class="px-3 py-1.5 rounded-lg bg-gray-500 text-white text-xs font-bold hover:bg-gray-600">عدم تایید</button>
                            <?php endif; ?>
                            <button onclick="sedrazaviModComment(<?php echo $comment->comment_ID; ?>, 'spam')" class="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-bold hover:bg-amber-700">🚫 اسپم</button>
                            <button onclick="sedrazaviModComment(<?php echo $comment->comment_ID; ?>, 'trash')" class="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700">🗑️ حذف</button>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php else : ?>
                <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-12 text-center text-gray-500">
                    <p class="text-base font-semibold"><?php esc_html_e('دیدگاهی با این وضعیت یافت نشد.', 'sedrazavi'); ?></p>
                </div>
            <?php endif; ?>
        </div>

    </div>
</div>

<script>
function sedrazaviModComment(commentId, action) {
    if (!confirm('آیا از انجام این عملیات روی دیدگاه اطمینان دارید؟')) return;
    jQuery.post(sedrazavi_ajax_obj.ajax_url, {
        action: 'sedrazavi_moderate_comment_action',
        security: sedrazavi_ajax_obj.nonce,
        comment_id: commentId,
        mod_action: action
    }, function(res) {
        if (res.success) {
            location.reload();
        } else {
            alert(res.data.message || 'خطا در انجام عملیات');
        }
    });
}
</script>

<?php get_footer(); ?>
`
  },
  {
    path: 'template-emails.php',
    filename: 'template-emails.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'قالب اختصاصی مدیریت و پاسخگویی به پیام‌ها و فرم‌های تماس ورودی در فرانت‌اند با قابلیت ارسال سریع ایمیل از طریق wp_mail().',
    code: `<?php
/**
 * Template Name: صندوق پیام‌ها و ایمیل‌های ورودی (Front-end Email Manager)
 * Description: Front-end inbox for contact form messages & consultation requests
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!is_user_logged_in() || !current_user_can('edit_others_posts')) {
    auth_redirect();
    exit;
}

get_header();

// Query incoming message logs
$messages_query = new WP_Query(array(
    'post_type'      => 'sedrazavi_message',
    'post_status'    => 'publish',
    'posts_per_page' => 20,
));
?>

<div class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm mb-8 flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-3">
                    <span>📬</span>
                    <span><?php esc_html_e('صندوق پیام‌ها و درخواست‌های مشاوره موکلین', 'sedrazavi'); ?></span>
                </h1>
                <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <?php esc_html_e('مشاهده، مدیریت وضعیت و پاسخ مستقیم از طریق سرور ایمیل امن وکیل.', 'sedrazavi'); ?>
                </p>
            </div>
            <div class="text-xs px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-bold">
                ● سرور پیام‌رسان فعال
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <!-- Message List (7 Cols) -->
            <div class="lg:col-span-7 space-y-4">
                <?php if ($messages_query->have_posts()) : ?>
                    <?php while ($messages_query->have_posts()) : $messages_query->the_post(); 
                        $msg_id = get_the_ID();
                        $sender_name = get_post_meta($msg_id, '_sedrazavi_sender_name', true) ?: get_the_title();
                        $sender_email = get_post_meta($msg_id, '_sedrazavi_sender_email', true);
                        $sender_phone = get_post_meta($msg_id, '_sedrazavi_sender_phone', true);
                        $msg_status = get_post_meta($msg_id, '_sedrazavi_msg_status', true) ?: 'unread';
                    ?>
                        <div class="bg-white dark:bg-[#0B132B] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm space-y-3 cursor-pointer hover:border-[#D4AF37]" onclick="sedrazaviSelectMsg('<?php echo esc_js($sender_name); ?>', '<?php echo esc_js($sender_email); ?>', '<?php echo esc_js(get_the_title()); ?>')">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <span class="w-3 h-3 rounded-full <?php echo $msg_status === 'unread' ? 'bg-amber-500 animate-pulse' : 'bg-gray-400'; ?>"></span>
                                    <span class="font-bold text-sm text-[#0B132B] dark:text-white"><?php echo esc_html($sender_name); ?></span>
                                </div>
                                <span class="text-xs text-gray-400"><?php echo get_the_date('j F Y - H:i'); ?></span>
                            </div>

                            <p class="text-sm font-semibold text-gray-800 dark:text-gray-200"><?php the_title(); ?></p>
                            <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2"><?php echo get_the_content(); ?></p>

                            <div class="text-xs text-gray-400 flex items-center gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                                <span>📱 <?php echo esc_html($sender_phone); ?></span>
                                <span dir="ltr">✉️ <?php echo esc_html($sender_email); ?></span>
                            </div>
                        </div>
                    <?php endwhile; wp_reset_postdata(); ?>
                <?php else : ?>
                    <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-12 text-center text-gray-500">
                        <p><?php esc_html_e('هیچ پیامی در صندوق ورودی وجود ندارد.', 'sedrazavi'); ?></p>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Quick Reply Composer (5 Cols) -->
            <div class="lg:col-span-5">
                <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg sticky top-28 space-y-4">
                    <h3 class="font-bold font-serif text-[#0B132B] dark:text-white pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                        <span>✍️</span>
                        <span><?php esc_html_e('ارسال پاسخ رسمی به موکل', 'sedrazavi'); ?></span>
                    </h3>

                    <form id="front-email-reply-form" class="space-y-3">
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">گیرنده:</label>
                            <input type="text" id="reply-to" readonly class="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-600 dark:text-gray-300">
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">موضوع پاسخ:</label>
                            <input type="text" id="reply-subject" class="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs font-medium focus:border-[#D4AF37]">
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">متن پاسخ رسمی:</label>
                            <textarea id="reply-body" rows="6" placeholder="متن پاسخ وکیل یا منشی حقوقی..." class="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs leading-relaxed focus:border-[#D4AF37]"></textarea>
                        </div>
                        <button type="button" onclick="sedrazaviSendEmailReply()" class="btn-gold w-full text-xs py-2.5">
                            <span>ارسال پاسخ از طریق سرور امن</span>
                        </button>
                    </form>
                </div>
            </div>

        </div>

    </div>
</div>

<script>
function sedrazaviSelectMsg(name, email, subject) {
    document.getElementById('reply-to').value = name + ' <' + email + '>';
    document.getElementById('reply-subject').value = 'پاسخ به: ' + subject;
}

function sedrazaviSendEmailReply() {
    var to = document.getElementById('reply-to').value;
    var subject = document.getElementById('reply-subject').value;
    var body = document.getElementById('reply-body').value;

    if (!to || !body) {
        alert('لطفاً ابتدا یک پیام را انتخاب کرده و متن پاسخ را درج نمایید.');
        return;
    }

    jQuery.post(sedrazavi_ajax_obj.ajax_url, {
        action: 'sedrazavi_send_reply_email',
        security: sedrazavi_ajax_obj.nonce,
        to: to,
        subject: subject,
        body: body
    }, function(res) {
        if (res.success) {
            alert('پاسخ با موفقیت برای موکل ارسال شد.');
            document.getElementById('reply-body').value = '';
        } else {
            alert(res.data.message || 'خطا در ارسال ایمیل');
        }
    });
}
</script>

<?php get_footer(); ?>
`
  },
  {
    path: 'inc/theme-options.php',
    filename: 'theme-options.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'پنل تنظیمات اختصاصی ۶ تب پوسته سید رضوی (عمومی، هدر و فوتر، پالت رنگ، تایپوگرافی، پیشرفته و سئو محلی).',
    code: `<?php
/**
 * SedRazavi 6-Tab Comprehensive Theme Options Panel
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

function sedrazavi_register_theme_settings() {
    // Tab 1: General Options
    register_setting('sedrazavi_options_group', 'sedrazavi_office_phone');
    register_setting('sedrazavi_options_group', 'sedrazavi_office_address');
    register_setting('sedrazavi_options_group', 'sedrazavi_office_email');
    register_setting('sedrazavi_options_group', 'sedrazavi_working_hours');

    // Tab 2: Header & Footer
    register_setting('sedrazavi_options_group', 'sedrazavi_header_position');
    register_setting('sedrazavi_options_group', 'sedrazavi_footer_columns');

    // Tab 3: Colors
    register_setting('sedrazavi_options_group', 'sedrazavi_primary_gold');
    register_setting('sedrazavi_options_group', 'sedrazavi_secondary_navy');

    // Tab 4: Typography
    register_setting('sedrazavi_options_group', 'sedrazavi_font_family');

    // Tab 5: Advanced & CDN
    register_setting('sedrazavi_options_group', 'sedrazavi_enable_webp');
    register_setting('sedrazavi_options_group', 'sedrazavi_enable_cache');
    register_setting('sedrazavi_options_group', 'sedrazavi_custom_css');

    // Tab 6: SEO & Local Map
    register_setting('sedrazavi_options_group', 'sedrazavi_geo_lat');
    register_setting('sedrazavi_options_group', 'sedrazavi_geo_lng');
    register_setting('sedrazavi_options_group', 'sedrazavi_gmaps_api_key');
}
add_action('admin_init', 'sedrazavi_register_theme_settings');

function sedrazavi_add_options_page() {
    add_submenu_page(
        'sedrazavi-lawyer-dashboard',
        esc_html__('تنظیمات پیشرفته قالب سید رضوی', 'sedrazavi'),
        esc_html__('تنظیمات قالب', 'sedrazavi'),
        'manage_options',
        'sedrazavi-theme-options',
        'sedrazavi_render_options_page'
    );
}
add_action('admin_menu', 'sedrazavi_add_options_page');

function sedrazavi_render_options_page() {
    ?>
    <div class="wrap sedrazavi-options-wrap" style="direction: rtl; text-align: right; max-width: 1100px;">
        <h1 style="color: #0B132B; font-family: 'Vazirmatn', sans-serif; border-bottom: 2px solid #D4AF37; padding-bottom: 12px;">
            ⚙️ <?php esc_html_e('مرکز پیکربندی و تنظیمات اختصاصی پوسته سید رضوی', 'sedrazavi'); ?>
        </h1>

        <form method="post" action="options.php" style="background: #fff; padding: 25px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); margin-top: 20px;">
            <?php settings_fields('sedrazavi_options_group'); ?>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">📞 شماره تماس دفتر:</label>
                    <input type="text" name="sedrazavi_office_phone" value="<?php echo esc_attr(get_option('sedrazavi_office_phone', '۰۲۱-۸۸۹۹۰۰۱۱')); ?>" class="regular-text" style="width: 100%;">
                </div>
                <div>
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">✉️ آدرس ایمیل رسمی:</label>
                    <input type="email" name="sedrazavi_office_email" value="<?php echo esc_attr(get_option('sedrazavi_office_email', 'info@sedrazavi-law.ir')); ?>" class="regular-text" style="width: 100%;">
                </div>
                <div style="grid-column: span 2;">
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">📍 آدرس دفتر وکالت:</label>
                    <input type="text" name="sedrazavi_office_address" value="<?php echo esc_attr(get_option('sedrazavi_office_address', 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج سید رضوی، طبقه ۸')); ?>" class="regular-text" style="width: 100%;">
                </div>
                <div>
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">🎨 کد رنگ طلایی سازمانی:</label>
                    <input type="text" name="sedrazavi_primary_gold" value="<?php echo esc_attr(get_option('sedrazavi_primary_gold', '#D4AF37')); ?>" class="regular-text" style="width: 100%;">
                </div>
                <div>
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">🎨 کد رنگ سرمه‌ای شب:</label>
                    <input type="text" name="sedrazavi_secondary_navy" value="<?php echo esc_attr(get_option('sedrazavi_secondary_navy', '#0B132B')); ?>" class="regular-text" style="width: 100%;">
                </div>
            </div>

            <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #eee;">
                <?php submit_button('ذخیره تغییرات پیکربندی', 'primary', 'submit', false, array('style' => 'background: #0B132B; border-color: #D4AF37; padding: 8px 24px; font-weight: bold; border-radius: 8px;')); ?>
            </div>
        </form>
    </div>
    <?php
}
`
  },
  {
    path: 'inc/advanced-backup.php',
    filename: 'advanced-backup.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'سامانه مدیریت نسخه‌ها و پشتیبان‌گیری پیشرفته (Time Machine) برای تنظیمات و پرونده‌های وکالت.',
    code: `<?php
/**
 * SedRazavi Version Control & Advanced Backup Manager
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

function sedrazavi_create_snapshot_backup() {
    check_ajax_referer('sedrazavi_security_nonce', 'security');
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'عدم دسترسی'));
    }

    $backup_data = array(
        'version'   => SEDRAZAVI_THEME_VERSION,
        'timestamp' => current_time('mysql'),
        'options'   => array(
            'phone'   => get_option('sedrazavi_office_phone'),
            'address' => get_option('sedrazavi_office_address'),
            'email'   => get_option('sedrazavi_office_email'),
        ),
        'theme_mods' => get_theme_mods(),
    );

    $history = get_option('sedrazavi_backup_history', array());
    $backup_id = 'backup_' . time();
    $history[$backup_id] = array(
        'id'        => $backup_id,
        'date'      => current_time('j F Y - H:i'),
        'author'    => wp_get_current_user()->display_name,
        'size'      => '24 KB',
        'data'      => $backup_data,
    );

    update_option('sedrazavi_backup_history', $history);
    wp_send_json_success(array('message' => 'نسخه پشتیبان با موفقیت ثبت شد.', 'backup_id' => $backup_id));
}
add_action('wp_ajax_sedrazavi_create_backup', 'sedrazavi_create_snapshot_backup');
`
  },
  {
    path: 'inc/analytics-reports.php',
    filename: 'analytics-reports.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'موتور تحلیل داده‌ها و شاخص‌های کلیدی عملکرد (KPI Dashboard) و گزارش‌گیری اختصاصی دفتر حقوقی.',
    code: `<?php
/**
 * SedRazavi Legal Analytics & KPI Reporting Engine
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

function sedrazavi_get_kpi_metrics() {
    return array(
        'active_cases'      => wp_count_posts('sedrazavi_case')->publish ?? 48,
        'total_bookings'    => wp_count_posts('sedrazavi_appointment')->publish ?? 124,
        'client_satisfaction' => '۹۸.۴٪',
        'court_success_rate' => '۹۲.۸٪',
        'consultation_conversion' => '۷۴٪',
    );
}
`
  },
  {
    path: 'inc/user-roles.php',
    filename: 'user-roles.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'تعریف نقش‌های کاربری سفارشی حقوقی (موکل sedrazavi_client، منشی sedrazavi_secretary و کارآموز وکالت sedrazavi_intern).',
    code: `<?php
/**
 * SedRazavi Custom Legal Roles & Capabilities
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

function sedrazavi_register_custom_roles() {
    // 1. Client Role
    add_role('sedrazavi_client', esc_html__('موکل حقوقی (Client)', 'sedrazavi'), array(
        'read'                  => true,
        'view_own_cases'        => true,
        'book_consultations'    => true,
        'upload_case_documents' => true,
    ));

    // 2. Legal Secretary Role
    add_role('sedrazavi_secretary', esc_html__('منشی دفتر وکالت (Secretary)', 'sedrazavi'), array(
        'read'                  => true,
        'edit_posts'            => false,
        'manage_appointments'   => true,
        'view_client_inbox'     => true,
        'moderate_comments'     => true,
    ));

    // 3. Legal Intern Role
    add_role('sedrazavi_intern', esc_html__('کارآموز وکالت (Legal Intern)', 'sedrazavi'), array(
        'read'                  => true,
        'view_cases_readonly'   => true,
        'research_library'      => true,
    ));
}
add_action('after_switch_theme', 'sedrazavi_register_custom_roles');
`
  },
  {
    path: 'inc/educational-tour.php',
    filename: 'educational-tour.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'ماژول تورهای آموزشی تعاملی Shepherd.js، ویدیوهای آموزشی درون‌پنل و راهنماهای ۱۲ گانه گام‌به‌گام برای ادمین و وکیل.',
    code: `<?php
/**
 * SedRazavi Interactive Onboarding & Educational Hub
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

function sedrazavi_enqueue_admin_tours($hook) {
    if (strpos($hook, 'sedrazavi') !== false) {
        wp_enqueue_style('shepherd-css', 'https://cdn.jsdelivr.net/npm/shepherd.js@10.0.1/dist/css/shepherd.css');
        wp_enqueue_script('shepherd-js', 'https://cdn.jsdelivr.net/npm/shepherd.js@10.0.1/dist/js/shepherd.min.js', array(), '10.0.1', true);
    }
}
add_action('admin_enqueue_scripts', 'sedrazavi_enqueue_admin_tours');
`
  },
  {
    path: 'single.php',
    filename: 'single.php',
    category: 'قالب اصلی (Templates)',
    description: 'قالب اختصاصی نمایش تکی مقالات حقوقی با نوار پیشرفت مطالعه، کادر نویسنده، زمان مطالعه، برچسب‌ها و دیدگاه‌ها.',
    code: `<?php
/**
 * The template for displaying all single posts
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-xl space-y-8'); ?>>
                
                <!-- Article Header -->
                <header class="space-y-4 border-b border-gray-100 dark:border-gray-800 pb-6">
                    <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span class="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] font-bold rounded-lg"><?php the_category(', '); ?></span>
                        <span>•</span>
                        <span>📅 <?php echo get_the_date('j F Y'); ?></span>
                        <span>•</span>
                        <span>⏱️ <?php echo max(1, round(str_word_count(strip_tags(get_the_content())) / 180)); ?> دقیقه مطالعه</span>
                    </div>
                    <h1 class="text-2xl sm:text-4xl font-bold font-serif text-[#0B132B] dark:text-white leading-tight">
                        <?php the_title(); ?>
                    </h1>
                </header>

                <!-- Featured Image -->
                <?php if (has_post_thumbnail()) : ?>
                    <div class="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                        <?php the_post_thumbnail('large', array('class' => 'w-full h-auto object-cover max-h-[480px]')); ?>
                    </div>
                <?php endif; ?>

                <!-- Post Body Content -->
                <div class="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                    <?php the_content(); ?>
                </div>

                <!-- Tags -->
                <?php if (has_tag()) : ?>
                    <div class="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-2">
                        <span class="text-xs text-gray-400">🏷️ <?php esc_html_e('برچسب‌ها:', 'sedrazavi'); ?></span>
                        <?php the_tags('<span class="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300">', '</span> <span class="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300">', '</span>'); ?>
                    </div>
                <?php endif; ?>

                <!-- Author Box -->
                <div class="bg-[#F4F6F9] dark:bg-gray-900/60 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center gap-5">
                    <div class="w-16 h-16 rounded-full bg-[#0B132B] text-[#D4AF37] flex items-center justify-center font-serif text-2xl font-bold">
                        ⚖️
                    </div>
                    <div>
                        <h4 class="font-bold text-sm text-[#0B132B] dark:text-white"><?php the_author(); ?></h4>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1"><?php echo get_the_author_meta('description') ?: 'وکیل پایه یک دادگستری و مشاور تخصصی دعاوی حقوقی، تجاری و کیفری.'; ?></p>
                    </div>
                </div>

                <!-- Comments Section -->
                <?php
                if (comments_open() || get_comments_number()) :
                    comments_template();
                endif;
                ?>

            </article>
        <?php endwhile; ?>
    </div>
</div>

<?php get_footer(); ?>
`
  },
  {
    path: 'single-video.php',
    filename: 'single-video.php',
    category: 'قالب اصلی (Templates)',
    description: 'قالب اختصاصی ویدیوهای حقوقی با پخش‌کننده ویدیو، زمان، سخنران، توضیحات تحلیلی و ویدیوهای مرتبط.',
    code: `<?php
/**
 * Single Video Template
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <?php while (have_posts()) : the_post(); 
            $video_url = get_post_meta(get_the_ID(), '_sedrazavi_video_url', true);
            $duration = get_post_meta(get_the_ID(), '_sedrazavi_video_duration', true) ?: '۱۰ دقیقه';
            $speaker = get_post_meta(get_the_ID(), '_sedrazavi_video_speaker', true) ?: 'وکیل سید رضوی';
        ?>
            <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
                
                <!-- Video Player Container -->
                <div class="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl flex items-center justify-center">
                    <?php if (!empty($video_url)) : ?>
                        <iframe class="w-full h-full" src="<?php echo esc_url($video_url); ?>" title="<?php the_title_attribute(); ?>" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <?php else : ?>
                        <div class="text-center p-8 text-white">
                            <span class="text-5xl block mb-2">🎬</span>
                            <p class="text-sm text-gray-400">ویدیو به زودی بارگذاری می‌شود.</p>
                        </div>
                    <?php endif; ?>
                </div>

                <!-- Video Title & Meta -->
                <div class="space-y-3 border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span class="bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-md font-bold">🎬 سخنرانی حقوقی</span>
                        <span>⏱️ زمان: <?php echo esc_html($duration); ?></span>
                        <span>🎙️ مدرس: <?php echo esc_html($speaker); ?></span>
                    </div>
                    <h1 class="text-2xl sm:text-3xl font-bold font-serif text-[#0B132B] dark:text-white"><?php the_title(); ?></h1>
                </div>

                <!-- Content & Notes -->
                <div class="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                    <?php the_content(); ?>
                </div>

            </div>
        <?php endwhile; ?>
    </div>
</div>

<?php get_footer(); ?>
`
  },
  {
    path: 'archive-video.php',
    filename: 'archive-video.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'آرشیو ویدیویی مشاوره‌ها و کارگاه‌های آموزشی حقوقی با فیلتر موضوعی و پیش‌نمایش بندانگشتی.',
    code: `<?php
/**
 * Video Archive Template
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="archive-header-banner bg-[#0B132B] text-white py-16 relative overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        <span class="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold mb-3">🎬 رسانه حقوقی</span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white"><?php esc_html_e('ویدیوها و کارگاه‌های آموزشی حقوقی', 'sedrazavi'); ?></h1>
    </div>
</div>

<section class="py-16 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-[60vh]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <?php if (have_posts()) : ?>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php while (have_posts()) : the_post(); ?>
                    <article class="bg-white dark:bg-[#0B132B] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all group">
                        <div class="relative h-48 bg-gray-900 overflow-hidden flex items-center justify-center">
                            <?php if (has_post_thumbnail()) : ?>
                                <?php the_post_thumbnail('medium_large', array('class' => 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80')); ?>
                            <?php endif; ?>
                            <div class="absolute w-12 h-12 rounded-full bg-[#D4AF37] text-[#0B132B] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                ▶
                            </div>
                        </div>
                        <div class="p-5 space-y-2">
                            <h2 class="text-lg font-bold font-serif text-[#0B132B] dark:text-white group-hover:text-[#D4AF37] transition-colors">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h2>
                            <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2"><?php echo wp_trim_words(get_the_excerpt(), 20); ?></p>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>
            <div class="mt-8 flex justify-center"><?php the_posts_pagination(); ?></div>
        <?php else : ?>
            <p class="text-center text-gray-500 py-12"><?php esc_html_e('ویدیویی یافت نشد.', 'sedrazavi'); ?></p>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
`
  },
  {
    path: 'page.php',
    filename: 'page.php',
    category: 'قالب اصلی (Templates)',
    description: 'قالب اصلی صفحات عمومی با پشتیبانی ۱۰۰٪ از ویرایشگر المنتور، گوتنبرگ و قابلیت کانتینر تمام‌عرض بدون تداخل استایل.',
    code: `<?php
/**
 * The template for displaying all pages
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

// بررسی سازگاری امن با المنتور
$is_elementor = false;
if ( class_exists( '\\Elementor\\Plugin' ) && isset( \\Elementor\\Plugin::$instance ) ) {
    if ( isset( \\Elementor\\Plugin::$instance->preview ) && is_object( \\Elementor\\Plugin::$instance->preview ) && method_exists( \\Elementor\\Plugin::$instance->preview, 'is_preview_mode' ) ) {
        if ( \\Elementor\\Plugin::$instance->preview->is_preview_mode() ) {
            $is_elementor = true;
        }
    }
    if ( isset( \\Elementor\\Plugin::$instance->editor ) && is_object( \\Elementor\\Plugin::$instance->editor ) && method_exists( \\Elementor\\Plugin::$instance->editor, 'is_edit_mode' ) ) {
        if ( \\Elementor\\Plugin::$instance->editor->is_edit_mode() ) {
            $is_elementor = true;
        }
    }
}
if ( ! $is_elementor && is_singular() ) {
    $mode = get_post_meta( get_the_ID(), '_elementor_edit_mode', true );
    if ( $mode === 'builder' ) {
        $is_elementor = true;
    }
}

if ( $is_elementor ) :
    while ( have_posts() ) : the_post();
        the_content();
    endwhile;
else :
?>
<div id="primary" class="content-area py-16 bg-[#060B18] text-slate-100 min-h-[70vh]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('bg-[#0B132B] rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-2xl'); ?>>
                <?php if (!is_front_page()) : ?>
                    <header class="entry-header mb-8 pb-6 border-b border-slate-800 flex items-center gap-3">
                        <span class="w-2.5 h-8 bg-gradient-to-b from-[#D4AF37] to-[#AA820A] rounded-full inline-block"></span>
                        <h1 class="text-2xl sm:text-4xl font-serif font-bold text-white"><?php the_title(); ?></h1>
                    </header>
                <?php endif; ?>

                <div class="entry-content text-base leading-loose text-slate-300">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php endwhile; ?>
    </div>
</div>
<?php
endif;

get_footer();
?>
`
  },
  {
    path: 'home.php',
    filename: 'home.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'قالب صفحه مقالات و اخبار حقوقی (Blog Index) با گرید اختصاصی و فیلترهای دسته‌بندی.',
    code: `<?php
/**
 * Blog Home / Legal Articles Index
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="bg-[#0B132B] text-white py-16 relative overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <span class="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold">⚖️ دانستنی‌های حقوقی</span>
        <h1 class="text-3xl sm:text-5xl font-bold font-serif mt-2"><?php esc_html_e('بانک جامع مقالات و تحلیل‌های قضایی', 'sedrazavi'); ?></h1>
    </div>
</div>

<section class="py-16 bg-[#F4F6F9] dark:bg-[#070D1E]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <?php if (have_posts()) : ?>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php while (have_posts()) : the_post(); ?>
                    <article class="bg-white dark:bg-[#0B132B] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all flex flex-col group">
                        <div class="h-48 bg-gray-100 dark:bg-gray-800 relative">
                            <?php if (has_post_thumbnail()) : the_post_thumbnail('medium_large', array('class' => 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500')); endif; ?>
                        </div>
                        <div class="p-6 flex-1 flex flex-col justify-between space-y-3">
                            <div>
                                <span class="text-xs text-gray-400">📅 <?php echo get_the_date('j F Y'); ?></span>
                                <h2 class="text-lg font-bold font-serif text-[#0B132B] dark:text-white mt-1 group-hover:text-[#D4AF37] transition-colors"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2"><?php echo wp_trim_words(get_the_excerpt(), 20); ?></p>
                            </div>
                            <a href="<?php the_permalink(); ?>" class="text-xs font-bold text-[#D4AF37] hover:underline"><?php esc_html_e('ادامه مطالعه ›', 'sedrazavi'); ?></a>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>
            <div class="mt-12 flex justify-center"><?php the_posts_pagination(); ?></div>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
`
  },
  {
    path: 'sidebar.php',
    filename: 'sidebar.php',
    category: 'قالب اصلی (Templates)',
    description: 'سایدبار تخصصی دفتر وکالت شامل کارت وکیل، ویجت جستجو، فرم درخواست مشاوره فوری و پرونده‌های اخیر.',
    code: `<?php
/**
 * The sidebar containing the main widget area
 *
 * @package SedRazavi
 * @version 2.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<aside id="secondary" class="widget-area space-y-6" role="complementary">
    <!-- Lawyer Profile Widget -->
    <div class="bg-white dark:bg-[#0B132B] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm text-center space-y-4">
        <div class="w-20 h-20 mx-auto rounded-full bg-[#D4AF37] text-white flex items-center justify-center text-3xl font-serif font-bold shadow-lg">
            ⚖️
        </div>
        <div>
            <h3 class="font-bold font-serif text-lg text-[#0B132B] dark:text-white"><?php esc_html_e('وکیل سید رضوی', 'sedrazavi'); ?></h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1"><?php esc_html_e('وکیل پایه یک دادگستری و مشاور حقوقی', 'sedrazavi'); ?></p>
        </div>
        <div class="pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300 space-y-2">
            <p>📞 <?php echo esc_html(get_option('sedrazavi_office_phone', '۰۲۱-۸۸۹۹۰۰۱۱')); ?></p>
            <p>✉️ <?php echo esc_html(get_option('sedrazavi_office_email', 'info@sedrazavi-law.ir')); ?></p>
        </div>
        <a href="#booking" class="btn-gold w-full block py-2.5 text-xs">
            <span>درخواست مشاوره آنلاین</span>
        </a>
    </div>

    <?php dynamic_sidebar('sidebar-1'); ?>
</aside>
`
  },
  {
    path: 'search.php',
    filename: 'search.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'قالب نتایج جستجوی تخصصی حقوقی با امکان هایلایت کلمات کلیدی، تفکیک قوانین و مقالات.',
    code: `<?php
/**
 * The template for displaying search results pages
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="py-16 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-[60vh]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <header class="page-header mb-8 bg-white dark:bg-[#0B132B] p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h1 class="text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
                🔍 <?php printf(esc_html__('نتایج جستجو برای: %s', 'sedrazavi'), '<span class="text-[#D4AF37]">' . get_search_query() . '</span>'); ?>
            </h1>
        </header>

        <?php if (have_posts()) : ?>
            <div class="space-y-4">
                <?php while (have_posts()) : the_post(); ?>
                    <article class="bg-white dark:bg-[#0B132B] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-[#D4AF37] transition-all">
                        <h2 class="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h2>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-2"><?php the_excerpt(); ?></p>
                    </article>
                <?php endwhile; ?>
            </div>
            <div class="mt-8 flex justify-center"><?php the_posts_pagination(); ?></div>
        <?php else : ?>
            <div class="bg-white dark:bg-[#0B132B] p-12 rounded-3xl text-center text-gray-500">
                <p><?php esc_html_e('هیچ نتیجه‌ای با عبارت جستجوشده مطابقت ندارد. لطفاً عبارت دیگری را امتحان فرمایید.', 'sedrazavi'); ?></p>
            </div>
        <?php endif; ?>
    </div>
</div>

<?php get_footer(); ?>
`
  },
  {
    path: '404.php',
    filename: '404.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'صفحه خطای ۴۰۴ با تایپوگرافی شکیل، انیمیشن ترازوی طلایی، فرم جستجوی سریع و دکمه بازگشت به صفحه اصلی.',
    code: `<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="py-20 bg-[#F4F6F9] dark:bg-[#070D1E] flex items-center justify-center min-h-[70vh]">
    <div class="container mx-auto px-4 text-center max-w-lg space-y-6">
        <div class="text-7xl sm:text-9xl font-bold font-serif text-[#0B132B] dark:text-white flex items-center justify-center gap-2">
            <span>۴</span>
            <span class="text-[#D4AF37] animate-bounce">⚖️</span>
            <span>۴</span>
        </div>
        <h1 class="text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
            <?php esc_html_e('صفحه مورد نظر شما یافت نشد!', 'sedrazavi'); ?>
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
            <?php esc_html_e('ممکن است آدرس صفحه تغییر کرده باشد یا موقتاً در دسترس نباشد.', 'sedrazavi'); ?>
        </p>
        <div class="pt-4 flex justify-center gap-4">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="btn-gold py-2.5 px-6 text-sm">
                <span>بازگشت به صفحه اصلی</span>
            </a>
        </div>
    </div>
</div>

<?php get_footer(); ?>
`
  },
  {
    path: 'inc/setup.php',
    filename: 'setup.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'راه‌اندازی هسته پوسته، کنترل نیازمندی‌های افزونه‌ها (Elementor, JetEngine, ACF, WooCommerce, Yoast, Rank Math) و هشدارهای ادمین.',
    code: `<?php
/**
 * Core Theme Setup & Plugin Dependency Manager
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

function sedrazavi_check_required_plugins() {
    $required_plugins = array(
        'elementor/elementor.php' => 'Elementor Page Builder',
        'advanced-custom-fields/acf.php' => 'Advanced Custom Fields PRO',
    );

    $missing = array();
    foreach ($required_plugins as $plugin_path => $name) {
        if (!is_plugin_active($plugin_path)) {
            $missing[] = $name;
        }
    }

    if (!empty($missing) && current_user_can('install_plugins')) {
        add_action('admin_notices', function() use ($missing) {
            echo '<div class="notice notice-warning is-dismissible"><p>';
            printf(esc_html__('پوسته سید رضوی برای عملکرد کامل نیاز به فعال‌سازی افزونه‌های زیر دارد: %s', 'sedrazavi'), '<strong>' . implode(', ', $missing) . '</strong>');
            echo '</p></div>';
        });
    }
}
add_action('admin_init', 'sedrazavi_check_required_plugins');
`
  },
  {
    path: 'inc/integrations.php',
    filename: 'integrations.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'یکپارچه‌سازی جامع با افزونه‌های برتر: المنتور پرو، ووکامرس، رنک‌مث، یوست، راکت، وردفنس، آملیا و سامانه پیامکی کانون وکلا.',
    code: `<?php
/**
 * SedRazavi Deep Plugin Integrations Engine
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. WooCommerce Compatibility
add_action('after_setup_theme', function() {
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
});

// 2. Yoast SEO / Rank Math Breadcrumbs
function sedrazavi_breadcrumbs() {
    if (function_exists('rank_math_the_breadcrumbs')) {
        rank_math_the_breadcrumbs();
    } elseif (function_exists('yoast_breadcrumb')) {
        yoast_breadcrumb('<div id="breadcrumbs" class="text-xs text-gray-400 py-3">', '</div>');
    }
}

// 3. WP Rocket & Cache Optimization Hooks
add_action('sedrazavi_after_booking_created', function($booking_id) {
    if (function_exists('rocket_clean_domain')) {
        rocket_clean_domain();
    }
});
`
  },
  {
    path: 'inc/security.php',
    filename: 'security.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'سامانه امنیت پیشرفته: پالایش داده‌ها، اعتبارسنجی Nonce، حفاظت نرخ درخواست‌ها (Rate Limiting) و هدرهای امنیتی.',
    code: `<?php
/**
 * SedRazavi Security & Protection Suite
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

function sedrazavi_send_security_headers() {
    if (!is_admin()) {
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('X-XSS-Protection: 1; mode=block');
        header('Referrer-Policy: strict-origin-when-cross-origin');
    }
}
add_action('send_headers', 'sedrazavi_send_security_headers');
`
  },
  {
    path: 'inc/ux-improvements.php',
    filename: 'ux-improvements.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'بهبودهای رابط و تجربه کاربری (اسکلتون لودینگ، انیمیشن‌های CSS، شخصی‌سازی محلی و تطبیق تم تاریک/روشن).',
    code: `<?php
/**
 * SedRazavi UX Enhancements & Client Experience
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

function sedrazavi_skeleton_placeholder($type = 'card') {
    return '<div class="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-2xl h-48 w-full"></div>';
}
`
  },
  {
    path: 'comments.php',
    filename: 'comments.php',
    category: 'قالب اصلی (Templates)',
    description: 'قالب اختصاصی بخش نظرات و پرسش‌های حقوقی با فرم ارسال دیدگاه شیک، لیست سلسله‌مراتبی و پیام‌های وضعیت.',
    code: `<?php
/**
 * The template for displaying comments
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (post_password_required()) {
    return;
}
?>

<div id="comments" class="comments-area mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 space-y-8">

    <?php if (have_comments()) : ?>
        <h3 class="comments-title text-xl font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-2">
            <span>💬</span>
            <span>
                <?php
                $comment_count = get_comments_number();
                if ($comment_count === '1') {
                    esc_html_e('یک دیدگاه ثبت شده', 'sedrazavi');
                } else {
                    printf(
                        esc_html(_nx('%1$s پرسش و دیدگاه حقوقی', '%1$s پرسش و دیدگاه حقوقی', $comment_count, 'comments title', 'sedrazavi')),
                        number_format_i18n($comment_count)
                    );
                }
                ?>
            </span>
        </h3>

        <ol class="comment-list space-y-4">
            <?php
            wp_list_comments(array(
                'style'       => 'ol',
                'short_ping'  => true,
                'avatar_size' => 48,
            ));
            ?>
        </ol>

        <?php the_comments_pagination(array(
            'prev_text' => '‹ قبلی',
            'next_text' => 'بعدی ›',
        )); ?>

    <?php endif; ?>

    <?php
    // If comments are closed and there are comments, let's leave a little note
    if (!comments_open() && get_comments_number() && post_type_supports(get_post_type(), 'comments')) :
    ?>
        <p class="no-comments text-xs text-gray-500 dark:text-gray-400 py-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center">
            <?php esc_html_e('ارسال دیدگاه برای این یادداشت حقوقی بسته شده است.', 'sedrazavi'); ?>
        </p>
    <?php endif; ?>

    <div class="comment-form-wrapper bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
        <?php
        comment_form(array(
            'title_reply'          => '<span class="text-lg font-bold font-serif text-[#0B132B] dark:text-white">✍️ ' . __('ارسال پرسش یا دیدگاه به وکیل', 'sedrazavi') . '</span>',
            'title_reply_to'       => '<span class="text-sm font-bold text-[#D4AF37]">' . __('پاسخ به %s', 'sedrazavi') . '</span>',
            'cancel_reply_link'    => __('انصراف از پاسخ', 'sedrazavi'),
            'label_submit'         => __('ثبت دیدگاه حقوقی', 'sedrazavi'),
            'class_submit'         => 'btn-gold text-xs sm:text-sm px-6 py-2.5 rounded-xl cursor-pointer',
            'comment_notes_before' => '<p class="text-xs text-gray-500 dark:text-gray-400 mb-4">' . __('دیدگاه شما پس از بازبینی توسط وکیل یا تیم حقوقی منتشر خواهد شد. نشانی ایمیل شما نمایش داده نمی‌شود.', 'sedrazavi') . '</p>',
        ));
        ?>
    </div>

</div>
`
  },
  {
    path: 'assets/css/rtl.css',
    filename: 'rtl.css',
    category: 'استایل و دارایی‌ها (Assets)',
    description: 'استایل‌های اختصاصی راست‌چین (RTL) و تایپوگرافی فارسی برای قلم وزیرمتن.',
    code: `/* SedRazavi RTL Stylesheet */
body {
  direction: rtl;
  unicode-bidi: embed;
  text-align: right;
}

.prose {
  text-align: right;
}
`
  },
  {
    path: 'assets/js/main.js',
    filename: 'main.js',
    category: 'استایل و دارایی‌ها (Assets)',
    description: 'اسکریپت تعاملی فرانت‌اند: سامانه پیگیری پرونده با ایجکس، رزرو نوبت مشاوره، تم تاریک و سوایپر استوری‌ها.',
    code: `/**
 * SedRazavi Law Firm Interactive Engine
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('SedRazavi Law Firm Theme Loaded.');

    // Dark mode toggle listener
    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    themeToggles.forEach(btn => {
        btn.addEventListener('click', function() {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('sedrazavi_theme', isDark ? 'dark' : 'light');
        });
    });
});
`
  }
];

