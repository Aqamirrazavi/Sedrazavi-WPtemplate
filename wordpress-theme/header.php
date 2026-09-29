<?php
/**
 * The header for SedRazavi Law Firm Theme
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?><!DOCTYPE html>
<html <?php language_attributes(); ?> dir="rtl">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-[#0B132B] text-slate-100 antialiased font-sans'); ?>>
<?php wp_body_open(); ?>

<a class="skip-link screen-reader-text" href="#main-content">
    <?php esc_html_e('پرش به محتوای اصلی', 'sedrazavi'); ?>
</a>

<!-- نوار اعلان و دسترسی سریع فوقانی (Top Notification Bar) -->
<div class="top-notification-bar">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2">
        <!-- سمت راست: شماره پروانه و ساعات کاری -->
        <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5 text-[#D4AF37] font-semibold text-xs">
                <svg class="w-3.5 h-3.5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>۱۸۴۵۲ / ک.و.م</span>
            </span>
            <span class="hidden sm:inline-block text-gray-500">|</span>
            <span class="hidden sm:inline-flex items-center gap-1 text-gray-300 text-xs">
                <svg class="w-3 h-3 text-gray-400 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>شنبه تا چهارشنبه: ۹:۰۰ الی ۱۹:۰۰ | پنج‌شنبه: ۹:۰۰ الی ۱۳:۰۰</span>
            </span>
        </div>

        <!-- سمت چپ: نظرسنجی، راهنما، آکادمی و شماره تماس -->
        <div class="flex items-center gap-3 text-xs overflow-x-auto whitespace-nowrap">
            <a href="#survey" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-gray-300">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>نظرسنجی خدمات</span>
            </a>
            <span class="text-gray-600">|</span>
            <a href="#guide" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-gray-300">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>راهنمای تعاملی</span>
            </a>
            <span class="text-gray-600">|</span>
            <a href="#academy" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-gray-300">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span>آکادمی و مستندات</span>
            </a>
            <span class="text-gray-600">|</span>
            <a href="tel:02188990011" class="text-gray-200 hover:text-[#D4AF37] font-mono flex items-center gap-1">
                <svg class="w-3 h-3 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>۰۲۱-۸۸۹۹۰۰۱۱</span>
            </a>
        </div>
    </div>
</div>

<!-- سربرگ اصلی شیشه‌ای و چسبان (Main Sticky Glass Header) -->
<header id="masthead" class="site-header">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        <!-- هویت بصری و برندینگ رسمی (Logo & Identity) -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="site-branding flex items-center gap-3">
            <div class="brand-logo-box">
                <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                    <path d="M7 21h10"/>
                    <path d="M12 3v18"/>
                    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
                </svg>
            </div>
            <div>
                <div class="flex items-center gap-2">
                    <span class="brand-title">SedRazavi</span>
                    <span class="badge-official">پوسته رسمی وردپرس</span>
                </div>
                <p class="brand-tagline">دفتر وکالت و مشاوره حقوقی تخصصی</p>
            </div>
        </a>

        <!-- ناوبری دسکتاپ (Desktop Navigation) -->
        <nav class="hidden xl:flex items-center gap-1 font-medium text-xs text-gray-200">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="nav-link"><?php esc_html_e('صفحه اصلی', 'sedrazavi'); ?></a>
            
            <div class="nav-dropdown-wrapper">
                <button class="nav-dropdown-trigger flex items-center gap-1 nav-link">
                    <span><?php esc_html_e('خدمات تخصصی', 'sedrazavi'); ?></span>
                    <svg class="w-3.5 h-3.5 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                <div class="nav-dropdown-menu">
                    <a href="#services" class="dropdown-item">🏢 دعاوی ملکی، اراضی و سرقفلی</a>
                    <a href="#services" class="dropdown-item">💼 دعاوی تجاری، شرکت‌ها و ورشکستگی</a>
                    <a href="#services" class="dropdown-item">⚖️ دعاوی کیفری، جرایم اقتصادی و دادگاه انقلاب</a>
                    <a href="#services" class="dropdown-item">👥 حقوق خانواده، طلاق توافقی و تقسیم ترکه</a>
                    <a href="#services" class="dropdown-item">🌐 داوری بین‌المللی و تنظیم قراردادها</a>
                </div>
            </div>

            <a href="#articles" class="nav-link"><?php esc_html_e('آرشیو مقالات و ویدیوها', 'sedrazavi'); ?></a>
            <a href="#about" class="nav-link"><?php esc_html_e('درباره وکیل', 'sedrazavi'); ?></a>
            <a href="#tracking" class="nav-link text-[#D4AF37] font-bold"><?php esc_html_e('پیگیری پرونده', 'sedrazavi'); ?></a>
            <a href="#faq" class="nav-link"><?php esc_html_e('سوالات متداول', 'sedrazavi'); ?></a>
            <a href="#contact" class="nav-link"><?php esc_html_e('تماس با ما', 'sedrazavi'); ?></a>
        </nav>

        <!-- دکمه‌های کنترل: تم شب/روز، رزرو نوبت، منوی موبایل -->
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

            <!-- رزرو نوبت مشاوره -->
            <a href="#booking" class="btn-gold hidden sm:inline-flex items-center gap-1.5 text-xs px-4 py-2">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span><?php esc_html_e('رزرو نوبت مشاوره', 'sedrazavi'); ?></span>
            </a>

            <!-- منوی موبایل -->
            <button id="mobile-menu-btn" class="hamburger-btn xl:hidden" aria-label="<?php esc_attr_e('منوی موبایل', 'sedrazavi'); ?>">
                <svg class="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
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
            <div class="flex items-center justify-between pb-5 border-b border-slate-800">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-white shadow-md">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                            <path d="M7 21h10"/>
                            <path d="M12 3v18"/>
                        </svg>
                    </div>
                    <div>
                        <span class="block text-sm font-bold text-white">SedRazavi</span>
                        <span class="block text-[10px] text-[#D4AF37]"><?php esc_html_e('دفتر وکالت و مشاوره حقوقی تخصصی', 'sedrazavi'); ?></span>
                    </div>
                </div>
                <button id="close-mobile-menu-btn" class="p-2 rounded-lg text-slate-400 hover:text-white bg-white/5 cursor-pointer" aria-label="<?php esc_attr_e('بستن منو', 'sedrazavi'); ?>">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <!-- فهرست پیوندهای موبایل -->
            <ul class="py-5 space-y-3 text-sm font-medium text-slate-200">
                <li><a href="<?php echo esc_url(home_url('/')); ?>" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('صفحه اصلی', 'sedrazavi'); ?></a></li>
                
                <li>
                    <button id="mobile-services-accordion-btn" class="w-full flex items-center justify-between py-1.5 hover:text-[#D4AF37] text-right cursor-pointer">
                        <span><?php esc_html_e('حوزه‌های تخصصی وکالت', 'sedrazavi'); ?></span>
                        <svg id="mobile-services-arrow" class="w-4 h-4 transition-transform text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div id="mobile-services-list" class="hidden pr-4 pt-2 space-y-2 text-xs text-slate-300">
                        <a href="#services" class="block py-1 hover:text-[#D4AF37]">🏢 دعاوی ملکی، اراضی و سرقفلی</a>
                        <a href="#services" class="block py-1 hover:text-[#D4AF37]">💼 دعاوی تجاری و شرکت‌ها</a>
                        <a href="#services" class="block py-1 hover:text-[#D4AF37]">⚖️ دعاوی کیفری و اقتصادی</a>
                        <a href="#services" class="block py-1 hover:text-[#D4AF37]">👥 خانواده و انحصار وراثت</a>
                        <a href="#services" class="block py-1 hover:text-[#D4AF37]">🌐 داوری بین‌المللی و قراردادها</a>
                    </div>
                </li>

                <li><a href="#about" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('درباره وکیل و افتخارات', 'sedrazavi'); ?></a></li>
                <li><a href="#tracking" class="block py-1.5 text-[#D4AF37] font-bold"><?php esc_html_e('🔍 سامانه استعلام پرونده', 'sedrazavi'); ?></a></li>
                <li><a href="#cases" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('آرای شاخص و پرونده‌ها', 'sedrazavi'); ?></a></li>
                <li><a href="#booking" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('رزرو آنلاین نوبت مشاوره', 'sedrazavi'); ?></a></li>
                <li><a href="#articles" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('یادداشت‌ها و مقالات', 'sedrazavi'); ?></a></li>
                <li><a href="#faq" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('پرسش‌های متداول موکلین', 'sedrazavi'); ?></a></li>
                <li><a href="#contact" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('نشانی و تماس با دفتر', 'sedrazavi'); ?></a></li>
            </ul>
        </div>

        <!-- فوتر منوی کشویی موبایل -->
        <div class="pt-5 border-t border-slate-800 space-y-3">
            <a href="#booking" class="btn-gold w-full text-center py-2.5 text-xs font-bold block rounded-xl">
                <?php esc_html_e('رزرو وقت مشاوره با وکیل', 'sedrazavi'); ?>
            </a>
            <a href="tel:02188990011" class="w-full text-center py-2.5 text-xs font-semibold text-slate-300 border border-slate-700 hover:border-[#D4AF37] rounded-xl flex items-center justify-center gap-2">
                <span>📞 تماس فوری: ۰۲۱-۸۸۹۹۰۰۱۱</span>
            </a>
        </div>
    </div>
</div>

<main id="main-content" class="site-main">
