<?php
/**
 * SedRazavi Law Firm Theme Functions and Definitions
 *
 * Professional WordPress theme bridge for Dr. Seyedeh Maryam SedRazavi Law Firm.
 * Implements:
 * 1. Custom Post Types ('service', 'article', 'case')
 * 2. Universal React component shortcodes via [react_component name='ComponentName' props='{}']
 * 3. enqueue_react_assets logic detecting theme production build path
 * 4. wp_localize_script authentication bridge with user data and REST nonce
 * 5. Admin Customizer section for dynamic Gold-Navy accent colors and CSS variables
 * 6. REST API authentication and profile customizer ('inc/wp-rest-auth.php', 'inc/api-handlers.php')
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Direct access denied
}

// 1. Core Theme Constants
if (!defined('SEDRAZAVI_THEME_VERSION')) {
    define('SEDRAZAVI_THEME_VERSION', '3.0.0');
}
if (!defined('SEDRAZAVI_THEME_DIR')) {
    define('SEDRAZAVI_THEME_DIR', function_exists('get_template_directory') && get_template_directory() ? get_template_directory() : __DIR__);
}
if (!defined('SEDRAZAVI_THEME_URI')) {
    define('SEDRAZAVI_THEME_URI', function_exists('get_template_directory_uri') && get_template_directory_uri() ? get_template_directory_uri() : get_stylesheet_directory_uri());
}

/**
 * 2. Theme Setup & Features Support
 */
if (!function_exists('sedrazavi_theme_setup')) {
    function sedrazavi_theme_setup() {
        // Localization
        load_theme_textdomain('sedrazavi', SEDRAZAVI_THEME_DIR . '/languages');

        // Document Title tag
        add_theme_support('title-tag');

        // Featured Images & Responsive Sizes
        add_theme_support('post-thumbnails');
        add_image_size('sedrazavi-service-card', 600, 400, true);
        add_image_size('sedrazavi-lawyer-portrait', 700, 900, true);
        add_image_size('sedrazavi-article-card', 800, 500, true);

        // Custom Logo
        add_theme_support('custom-logo', [
            'height'      => 80,
            'width'       => 260,
            'flex-height' => true,
            'flex-width'  => true,
        ]);

        // HTML5 Semantic Markup
        add_theme_support('html5', [
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        ]);

        // Selective Refresh for Customizer Widgets
        add_theme_support('customize-selective-refresh-widgets');

        // Elementor Support & Page Builder Compatibility
        add_theme_support('elementor');
        add_post_type_support('page', 'elementor');
        add_post_type_support('post', 'elementor');
        add_post_type_support('service', 'elementor');
        add_post_type_support('article', 'elementor');
        add_post_type_support('case', 'elementor');

        // Gutenberg Block Editor Supports
        add_theme_support('align-wide');
        add_theme_support('wp-block-styles');
        add_theme_support('responsive-embeds');
        add_theme_support('editor-styles');

        // Navigation Menus
        register_nav_menus([
            'primary'  => esc_html__('منوی اصلی سربرگ (Primary Header)', 'sedrazavi'),
            'footer'   => esc_html__('منوی دسترسی سریع فوتر (Footer Menu)', 'sedrazavi'),
            'services' => esc_html__('منوی خدمات حقوقی (Legal Services)', 'sedrazavi'),
        ]);
    }
    add_action('after_setup_theme', 'sedrazavi_theme_setup');
}

/**
 * 3. Niche Archetype Detector & Custom Post Types Registration ('service', 'article', 'case')
 */
if (!function_exists('sedrazavi_is_legal_module_enabled')) {
    function sedrazavi_is_legal_module_enabled() {
        $active_archetype = get_option('sedrazavi_active_archetype', 'agency-designer');
        $current_theme = function_exists('get_stylesheet') ? get_stylesheet() : '';
        if (strpos($current_theme, 'legal') !== false || strpos($current_theme, 'lawyer') !== false || $active_archetype === 'legal-firm' || $active_archetype === 'lawyer' || defined('SEDRAZAVI_LEGAL_ACTIVE')) {
            return true;
        }
        return false;
    }
}

if (!function_exists('sedrazavi_register_custom_post_types')) {
    function sedrazavi_register_custom_post_types() {
        $is_legal = sedrazavi_is_legal_module_enabled();
        $archetype = get_option('sedrazavi_active_archetype', 'agency-designer');

        // Dynamic Niche Labels for Services ('service')
        $service_name = esc_html__('خدمات و توانمندی‌ها', 'sedrazavi');
        $service_singular = esc_html__('خدمت', 'sedrazavi');
        $service_slug = 'services';
        $service_icon = 'dashicons-admin-tools';

        if ($is_legal) {
            $service_name = esc_html__('خدمات حقوقی', 'sedrazavi');
            $service_singular = esc_html__('خدمت حقوقی', 'sedrazavi');
            $service_slug = 'legal-services';
            $service_icon = 'dashicons-hammer';
        } elseif ($archetype === 'clinic-medical') {
            $service_name = esc_html__('خدمات درمانی و پزشکی', 'sedrazavi');
            $service_singular = esc_html__('خدمت درمانی', 'sedrazavi');
            $service_slug = 'medical-services';
            $service_icon = 'dashicons-heart';
        } elseif ($archetype === 'corporate-pro') {
            $service_name = esc_html__('خدمات و راهکارهای سازمانی', 'sedrazavi');
            $service_singular = esc_html__('راهکار سازمانی', 'sedrazavi');
            $service_slug = 'corporate-services';
            $service_icon = 'dashicons-building';
        } elseif ($archetype === 'education-lms') {
            $service_name = esc_html__('دوره‌ها و خدمات آموزشی', 'sedrazavi');
            $service_singular = esc_html__('دوره آموزشی', 'sedrazavi');
            $service_slug = 'courses-and-services';
            $service_icon = 'dashicons-welcome-learn-more';
        } elseif ($archetype === 'store-modern') {
            $service_name = esc_html__('خدمات و پشتیبانی فروشگاه', 'sedrazavi');
            $service_singular = esc_html__('خدمت فروشگاهی', 'sedrazavi');
            $service_slug = 'store-services';
            $service_icon = 'dashicons-cart';
        }

        // CPT 1: Dynamic Services ('service')
        if (!post_type_exists('service')) {
            $service_labels = [
                'name'               => $service_name,
                'singular_name'      => $service_singular,
                'menu_name'          => $service_name,
                'add_new'            => esc_html__('افزودن خدمت جدید', 'sedrazavi'),
                'add_new_item'       => sprintf(esc_html__('افزودن %s جدید', 'sedrazavi'), $service_singular),
                'edit_item'          => sprintf(esc_html__('ویرایش %s', 'sedrazavi'), $service_singular),
                'new_item'           => sprintf(esc_html__('%s جدید', 'sedrazavi'), $service_singular),
                'view_item'          => sprintf(esc_html__('مشاهده %s', 'sedrazavi'), $service_singular),
                'search_items'       => esc_html__('جستجوی خدمات', 'sedrazavi'),
                'not_found'          => esc_html__('خدمتی یافت نشد', 'sedrazavi'),
                'not_found_in_trash' => esc_html__('در سطل زباله یافت نشد', 'sedrazavi'),
            ];

            register_post_type('service', [
                'labels'              => $service_labels,
                'public'              => true,
                'has_archive'         => true,
                'rewrite'             => ['slug' => $service_slug],
                'menu_icon'           => $service_icon,
                'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'revisions'],
                'show_in_rest'        => true,
                'hierarchical'        => false,
            ]);

            register_taxonomy('service_category', ['service'], [
                'labels'            => [
                    'name'          => sprintf(esc_html__('دسته‌بندی %s', 'sedrazavi'), $service_name),
                    'singular_name' => esc_html__('دسته‌بندی خدمت', 'sedrazavi'),
                ],
                'hierarchical'      => true,
                'show_in_rest'      => true,
                'rewrite'           => ['slug' => 'service-cat'],
            ]);
        }

        // CPT 2: Legal Articles & Precedents ('article')
        if (!post_type_exists('article')) {
            $article_labels = [
                'name'               => esc_html__('مقالات حقوقی', 'sedrazavi'),
                'singular_name'      => esc_html__('مقاله حقوقی', 'sedrazavi'),
                'menu_name'          => esc_html__('مقالات و تحلیل‌ها', 'sedrazavi'),
                'add_new'            => esc_html__('نگارش مقاله جدید', 'sedrazavi'),
                'add_new_item'       => esc_html__('افزودن مقاله حقوقی جدید', 'sedrazavi'),
                'edit_item'          => esc_html__('ویرایش مقاله', 'sedrazavi'),
                'view_item'          => esc_html__('مشاهده مقاله', 'sedrazavi'),
                'search_items'       => esc_html__('جستجوی مقالات', 'sedrazavi'),
                'not_found'          => esc_html__('مقاله‌ای یافت نشد', 'sedrazavi'),
            ];

            register_post_type('article', [
                'labels'              => $article_labels,
                'public'              => true,
                'has_archive'         => true,
                'rewrite'             => ['slug' => 'legal-articles'],
                'menu_icon'           => 'dashicons-welcome-write-blog',
                'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'author', 'comments', 'custom-fields'],
                'show_in_rest'        => true,
            ]);

            register_taxonomy('article_category', ['article'], [
                'labels'            => [
                    'name'          => esc_html__('دسته‌بندی مقالات', 'sedrazavi'),
                    'singular_name' => esc_html__('دسته مقاله', 'sedrazavi'),
                ],
                'hierarchical'      => true,
                'show_in_rest'      => true,
                'rewrite'           => ['slug' => 'article-cat'],
            ]);
        }

        // CPT 3: Client Cases & Confidential Docket Tracking ('case')
        // CRITICAL PRIVACY FIX: Private by default, excluded from search, sitemaps, and public permalinks
        // Encapsulated: Only loaded when legal niche is explicitly active
        if ($is_legal && !post_type_exists('case')) {
            $case_labels = [
                'name'               => esc_html__('پرونده‌های محرمانه موکلان', 'sedrazavi'),
                'singular_name'      => esc_html__('پرونده محرمانه', 'sedrazavi'),
                'menu_name'          => esc_html__('کارتابل پرونده‌های محرمانه', 'sedrazavi'),
                'add_new'            => esc_html__('ثبت پرونده محرمانه جدید', 'sedrazavi'),
                'add_new_item'       => esc_html__('ثبت پرونده محرمانه موکل', 'sedrazavi'),
                'edit_item'          => esc_html__('ویرایش پرونده محرمانه', 'sedrazavi'),
                'view_item'          => esc_html__('مشاهده پرونده در پنل مدیریت', 'sedrazavi'),
                'search_items'       => esc_html__('جستجوی پرونده‌ها در پنل مدیریت', 'sedrazavi'),
                'not_found'          => esc_html__('پرونده‌ای یافت نشد', 'sedrazavi'),
            ];

            register_post_type('case', [
                'labels'              => $case_labels,
                'public'              => false, // Confidential: not public
                'publicly_queryable'  => false, // Prevent public frontend query
                'exclude_from_search' => true,  // Exclude from public site search
                'show_ui'             => true,  // Visible in WP Admin to staff
                'show_in_menu'        => true,
                'show_in_nav_menus'   => false,
                'has_archive'         => false, // No public archive page
                'rewrite'             => false, // No public permalink route
                'query_var'           => false,
                'menu_icon'           => 'dashicons-lock',
                'supports'            => ['title', 'editor', 'custom-fields', 'revisions', 'author'],
                'show_in_rest'        => false, // Disallow unauthenticated WP Core REST route
                'capability_type'     => 'post',
            ]);

            register_taxonomy('case_type', ['case'], [
                'labels'            => [
                    'name'          => esc_html__('موضوعات دادرسی محرمانه', 'sedrazavi'),
                    'singular_name' => esc_html__('موضوع دعوا', 'sedrazavi'),
                ],
                'hierarchical'      => true,
                'public'            => false,
                'show_ui'           => true,
                'show_in_rest'      => false,
                'rewrite'           => false,
            ]);
        }

        // CPT 4: Public Legal Precedents & Case Studies ('case_study')
        // Clean, anonymized public records intended for marketing and legal education
        if (!post_type_exists('case_study')) {
            $case_study_labels = [
                'name'               => esc_html__('نمونه‌پرونده‌ها و دعاوی موفق', 'sedrazavi'),
                'singular_name'      => esc_html__('نمونه‌پرونده موفق', 'sedrazavi'),
                'menu_name'          => esc_html__('دعاوی موفق (عمومی)', 'sedrazavi'),
                'add_new'            => esc_html__('افزودن نمونه‌دعوای جدید', 'sedrazavi'),
                'add_new_item'       => esc_html__('افزودن نمونه‌پرونده موفق عمومی', 'sedrazavi'),
                'edit_item'          => esc_html__('ویرایش نمونه‌پرونده', 'sedrazavi'),
                'view_item'          => esc_html__('مشاهده نمونه‌پرونده', 'sedrazavi'),
                'search_items'       => esc_html__('جستجوی دعاوی موفق', 'sedrazavi'),
                'not_found'          => esc_html__('موردی یافت نشد', 'sedrazavi'),
            ];

            register_post_type('case_study', [
                'labels'              => $case_study_labels,
                'public'              => true,
                'has_archive'         => true,
                'rewrite'             => ['slug' => 'case-studies'],
                'menu_icon'           => 'dashicons-awards',
                'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
                'show_in_rest'        => true,
            ]);

            register_taxonomy('case_study_topic', ['case_study'], [
                'labels'            => [
                    'name'          => esc_html__('حوزه‌های دعاوی موفق', 'sedrazavi'),
                    'singular_name' => esc_html__('حوزه دعوا', 'sedrazavi'),
                ],
                'hierarchical'      => true,
                'show_in_rest'      => true,
                'rewrite'           => ['slug' => 'case-study-topic'],
            ]);
        }
    }
    add_action('init', 'sedrazavi_register_custom_post_types');
}

/**
 * 4. Admin Customizer Section for Site Accent Color (Gold-Navy Theme)
 */
if (!function_exists('sedrazavi_customize_register')) {
    function sedrazavi_customize_register($wp_customize) {
        $wp_customize->add_section('sedrazavi_theme_colors', [
            'title'       => esc_html__('رنگ‌بندی و تم طلایی-سرمه‌ای (Gold-Navy Theme)', 'sedrazavi'),
            'description' => esc_html__('تنظیم و شخصی‌سازی پالت رنگی اختصاصی دفتر وکالت دکتر سیده مریم رضوی و تزریق داینامیک متغیرهای CSS', 'sedrazavi'),
            'priority'    => 25,
        ]);

        // Accent Gold Color
        $wp_customize->add_setting('sedrazavi_gold_color', [
            'default'           => '#D4AF37',
            'type'              => 'option',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' => 'sanitize_hex_color',
            'transport'         => 'refresh',
        ]);
        $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'sedrazavi_gold_color_ctrl', [
            'label'    => esc_html__('رنگ طلایی شاخص (Accent Gold)', 'sedrazavi'),
            'section'  => 'sedrazavi_theme_colors',
            'settings' => 'sedrazavi_gold_color',
        ]));

        // Base Navy Color
        $wp_customize->add_setting('sedrazavi_navy_color', [
            'default'           => '#0B132B',
            'type'              => 'option',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' => 'sanitize_hex_color',
            'transport'         => 'refresh',
        ]);
        $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'sedrazavi_navy_color_ctrl', [
            'label'    => esc_html__('رنگ سرمه‌ای تیره پایه (Base Navy)', 'sedrazavi'),
            'section'  => 'sedrazavi_theme_colors',
            'settings' => 'sedrazavi_navy_color',
        ]));

        // Light Gold / Champagne
        $wp_customize->add_setting('sedrazavi_gold_light', [
            'default'           => '#F3E5AB',
            'type'              => 'option',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' => 'sanitize_hex_color',
            'transport'         => 'refresh',
        ]);
        $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'sedrazavi_gold_light_ctrl', [
            'label'    => esc_html__('رنگ طلایی روشن / شامپاینی (Light Gold)', 'sedrazavi'),
            'section'  => 'sedrazavi_theme_colors',
            'settings' => 'sedrazavi_gold_light',
        ]));

        // Emerald Accent
        $wp_customize->add_setting('sedrazavi_emerald_accent', [
            'default'           => '#2A9D8F',
            'type'              => 'option',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' => 'sanitize_hex_color',
            'transport'         => 'refresh',
        ]);
        $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'sedrazavi_emerald_accent_ctrl', [
            'label'    => esc_html__('رنگ زمردی کمکی (Emerald Accent)', 'sedrazavi'),
            'section'  => 'sedrazavi_theme_colors',
            'settings' => 'sedrazavi_emerald_accent',
        ]));

        // Secondary Navy
        $wp_customize->add_setting('sedrazavi_secondary_navy', [
            'default'           => '#1C2541',
            'type'              => 'option',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' => 'sanitize_hex_color',
            'transport'         => 'refresh',
        ]);
        $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'sedrazavi_secondary_navy_ctrl', [
            'label'    => esc_html__('رنگ سرمه‌ای ثانویه (Secondary Navy)', 'sedrazavi'),
            'section'  => 'sedrazavi_theme_colors',
            'settings' => 'sedrazavi_secondary_navy',
        ]));

        // --- SECTION: General Identity & Contact (تنظیمات هویت بصری، تماس و شبکه‌های اجتماعی) ---
        $wp_customize->add_section('sedrazavi_general_identity', [
            'title'       => esc_html__('تنظیمات سربرگ، تماس و فوتر (Header & Contact)', 'sedrazavi'),
            'description' => esc_html__('شخصی‌سازی شماره تماس، ایمیل، دکمه اقدام، شبکه‌های اجتماعی و کپی‌رایت فوتر بدون نیاز به کدنویسی', 'sedrazavi'),
            'priority'    => 26,
        ]);

        // Header Phone
        $wp_customize->add_setting('sedrazavi_header_phone', [
            'default'           => '۰۲۱-۱۲۳۴۵۶۷۸',
            'type'              => 'theme_mod',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' => 'sanitize_text_field',
            'transport'         => 'refresh',
        ]);
        $wp_customize->add_control('sedrazavi_header_phone_ctrl', [
            'label'    => esc_html__('شماره تماس سربرگ', 'sedrazavi'),
            'section'  => 'sedrazavi_general_identity',
            'settings' => 'sedrazavi_header_phone',
            'type'     => 'text',
        ]);

        // Header Working Hours
        $wp_customize->add_setting('sedrazavi_header_hours', [
            'default'           => 'شنبه تا چهارشنبه: ۹:۰۰ الی ۱۸:۰۰',
            'type'              => 'theme_mod',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' => 'sanitize_text_field',
            'transport'         => 'refresh',
        ]);
        $wp_customize->add_control('sedrazavi_header_hours_ctrl', [
            'label'    => esc_html__('ساعات کاری / نوار اعلان', 'sedrazavi'),
            'section'  => 'sedrazavi_general_identity',
            'settings' => 'sedrazavi_header_hours',
            'type'     => 'text',
        ]);

        // Header CTA Button Text
        $wp_customize->add_setting('sedrazavi_header_cta_text', [
            'default'           => 'ارتباط با ما',
            'type'              => 'theme_mod',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' => 'sanitize_text_field',
            'transport'         => 'refresh',
        ]);
        $wp_customize->add_control('sedrazavi_header_cta_text_ctrl', [
            'label'    => esc_html__('متن دکمه اقدام سریع سربرگ', 'sedrazavi'),
            'section'  => 'sedrazavi_general_identity',
            'settings' => 'sedrazavi_header_cta_text',
            'type'     => 'text',
        ]);

        // Header CTA Button Link
        $wp_customize->add_setting('sedrazavi_header_cta_link', [
            'default'           => home_url('/#contact'),
            'type'              => 'theme_mod',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' => 'esc_url_raw',
            'transport'         => 'refresh',
        ]);
        $wp_customize->add_control('sedrazavi_header_cta_link_ctrl', [
            'label'    => esc_html__('لینک دکمه اقدام سربرگ', 'sedrazavi'),
            'section'  => 'sedrazavi_general_identity',
            'settings' => 'sedrazavi_header_cta_link',
            'type'     => 'url',
        ]);

        // Contact Email
        $wp_customize->add_setting('sedrazavi_contact_email', [
            'default'           => 'info@example.ir',
            'type'              => 'theme_mod',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' => 'sanitize_email',
            'transport'         => 'refresh',
        ]);
        $wp_customize->add_control('sedrazavi_contact_email_ctrl', [
            'label'    => esc_html__('ایمیل سازمانی ارتباط با ما', 'sedrazavi'),
            'section'  => 'sedrazavi_general_identity',
            'settings' => 'sedrazavi_contact_email',
            'type'     => 'email',
        ]);

        // Footer Bio Text
        $wp_customize->add_setting('sedrazavi_footer_bio', [
            'default'           => 'پلتفرم جامع، مدرن و بهینه‌سازی‌شده برای وب‌سایت‌های حرفه‌ای با پشتیبانی کامل از استانداردهای نوین تجربه کاربری و سئو.',
            'type'              => 'theme_mod',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' => 'sanitize_textarea_field',
            'transport'         => 'refresh',
        ]);
        $wp_customize->add_control('sedrazavi_footer_bio_ctrl', [
            'label'    => esc_html__('متن معرفی کوتاه فوتر', 'sedrazavi'),
            'section'  => 'sedrazavi_general_identity',
            'settings' => 'sedrazavi_footer_bio',
            'type'     => 'textarea',
        ]);

        // Social Links: Instagram & Telegram
        $wp_customize->add_setting('sedrazavi_social_instagram', [
            'default'           => '',
            'type'              => 'theme_mod',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' => 'esc_url_raw',
            'transport'         => 'refresh',
        ]);
        $wp_customize->add_control('sedrazavi_social_instagram_ctrl', [
            'label'    => esc_html__('لینک اینستاگرام', 'sedrazavi'),
            'section'  => 'sedrazavi_general_identity',
            'settings' => 'sedrazavi_social_instagram',
            'type'     => 'url',
        ]);

        $wp_customize->add_setting('sedrazavi_social_telegram', [
            'default'           => '',
            'type'              => 'theme_mod',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' => 'esc_url_raw',
            'transport'         => 'refresh',
        ]);
        $wp_customize->add_control('sedrazavi_social_telegram_ctrl', [
            'label'    => esc_html__('لینک کانال یا آیدی تلگرام', 'sedrazavi'),
            'section'  => 'sedrazavi_general_identity',
            'settings' => 'sedrazavi_social_telegram',
            'type'     => 'url',
        ]);
    }
    add_action('customize_register', 'sedrazavi_customize_register');

    // Automatically synchronize Customizer colors with Elementor Global Kit
    add_action('customize_save_after', function() {
        if (!class_exists('\Elementor\Plugin')) {
            return;
        }
        $gold_color = get_option('sedrazavi_gold_color', '#D4AF37');
        $navy_color = get_option('sedrazavi_navy_color', '#0B132B');
        $active_kit_id = get_option('elementor_active_kit');
        if ($active_kit_id) {
            $meta = get_post_meta($active_kit_id, '_elementor_page_settings', true);
            if (is_array($meta) && isset($meta['system_colors'])) {
                foreach ($meta['system_colors'] as &$sc) {
                    if (isset($sc['_id']) && $sc['_id'] === 'primary') {
                        $sc['color'] = $gold_color;
                    }
                    if (isset($sc['_id']) && $sc['_id'] === 'secondary') {
                        $sc['color'] = $navy_color;
                    }
                }
                update_post_meta($active_kit_id, '_elementor_page_settings', $meta);
                if (isset(\Elementor\Plugin::$instance->files_manager)) {
                    \Elementor\Plugin::$instance->files_manager->clear_cache();
                }
            }
        }
    });
}

/**
 * 5. Inject Dynamic Customizer CSS Variables into WordPress Theme Header
 */
if (!function_exists('sedrazavi_customizer_dynamic_css')) {
    function sedrazavi_customizer_dynamic_css() {
        $gold_color    = get_option('sedrazavi_gold_color', '#D4AF37');
        $navy_color    = get_option('sedrazavi_navy_color', '#0B132B');
        $gold_light    = get_option('sedrazavi_gold_light', '#F3E5AB');
        $emerald_color = get_option('sedrazavi_emerald_accent', '#2A9D8F');
        $navy_sec      = get_option('sedrazavi_secondary_navy', '#1C2541');
        $font_family   = get_option('sedrazavi_font_family', 'Vazirmatn');
        $custom_font   = get_option('sedrazavi_custom_font_css', '');
        ?>
        <style id="sedrazavi-customizer-dynamic-css">
            :root {
                --color-gold: <?php echo esc_attr($gold_color); ?>;
                --color-navy: <?php echo esc_attr($navy_color); ?>;
                --color-gold-light: <?php echo esc_attr($gold_light); ?>;
                --color-emerald: <?php echo esc_attr($emerald_color); ?>;
                --color-navy-secondary: <?php echo esc_attr($navy_sec); ?>;
                --color-primary: <?php echo esc_attr($navy_color); ?>;
                --color-accent: <?php echo esc_attr($gold_color); ?>;
            }
            .text-gold-accent, .text-\[\#D4AF37\] { color: var(--color-gold) !important; }
            .bg-gold-accent, .bg-\[\#D4AF37\] { background-color: var(--color-gold) !important; }
            .border-gold-accent, .border-\[\#D4AF37\] { border-color: var(--color-gold) !important; }
            .bg-navy-base, .bg-\[\#0B132B\] { background-color: var(--color-navy) !important; }
            <?php if (!empty($custom_font)) : ?>
            <?php echo wp_strip_all_tags($custom_font); ?>
            <?php endif; ?>
            <?php if (!empty($font_family) && $font_family !== 'Vazirmatn') : ?>
            body, button, input, select, textarea {
                font-family: '<?php echo esc_attr($font_family); ?>', Vazirmatn, sans-serif !important;
            }
            <?php endif; ?>
        </style>
        <?php
    }
    add_action('wp_head', 'sedrazavi_customizer_dynamic_css', 15);
}

/**
 * 6. Dynamic Production Build Path Detection & React Asset Enqueuing Logic
 */
if (!function_exists('enqueue_react_assets')) {
    function enqueue_react_assets() {
        // 6.1. Persian Webfont Vazirmatn (Local Self-contained Asset - 0% External CDN Dependency)
        wp_enqueue_style(
            'sedrazavi-vazirmatn-font',
            SEDRAZAVI_THEME_URI . '/assets/css/vazirmatn.css',
            [],
            SEDRAZAVI_THEME_VERSION
        );

        // 6.2. WordPress Main Stylesheet
        wp_enqueue_style(
            'sedrazavi-main-style',
            get_stylesheet_uri(),
            [],
            SEDRAZAVI_THEME_VERSION
        );

        // 6.3. Conditional check: load React engine & its CSS only when explicitly required by shortcodes or designer mount
        // Standard Elementor or Gutenberg pages do NOT load the React SPA bundle (1.7MB JS + CSS), ensuring ultra-fast LCP (100/100 Core Web Vitals) and zero bloat
        global $post;
        $needs_react = false;

        if (is_a($post, 'WP_Post')) {
            if (has_shortcode($post->post_content, 'react_component') ||
                has_shortcode($post->post_content, 'sedrazavi_dashboard') ||
                has_shortcode($post->post_content, 'sedrazavi_calculator') ||
                has_shortcode($post->post_content, 'sedrazavi_client_portal') ||
                has_shortcode($post->post_content, 'multi-niche-showcase') ||
                strpos($post->post_content, 'sedrazavi-app-mount') !== false) {
                $needs_react = true;
            }
        }

        // Preview mode explicitly requested by authorized administrators/designers
        if ((current_user_can('edit_theme_options') && isset($_GET['app_preview'])) || is_page('designer') || is_page('portal')) {
            $needs_react = true;
        }

        if (!$needs_react) {
            return;
        }

        // 6.4. Production Build Path Detection for Minified React CSS (Loaded ONLY when React is active)
        $candidate_css_dirs = [
            'app-dist/index.css',
        ];

        foreach ($candidate_css_dirs as $rel_css) {
            $file_path = SEDRAZAVI_THEME_DIR . '/' . $rel_css;
            if (file_exists($file_path)) {
                $enqueued_css_uri = SEDRAZAVI_THEME_URI . '/' . $rel_css;
                wp_enqueue_style(
                    'sedrazavi-react-bundle-css',
                    $enqueued_css_uri,
                    [],
                    filemtime($file_path)
                );
                break;
            }
        }

        // 6.5. Production Build Path Detection for Minified JS (Single official target: app-dist)
        $candidate_js_dirs = [
            'app-dist/index.js',
        ];

        $enqueued_js_handle = '';
        foreach ($candidate_js_dirs as $rel_js) {
            $file_path = SEDRAZAVI_THEME_DIR . '/' . $rel_js;
            if (file_exists($file_path)) {
                $js_uri = SEDRAZAVI_THEME_URI . '/' . $rel_js;
                $enqueued_js_handle = 'sedrazavi-react-bundle-js';
                wp_register_script(
                    $enqueued_js_handle,
                    $js_uri,
                    [],
                    filemtime($file_path),
                    true // footer
                );
                wp_enqueue_script($enqueued_js_handle);
                break;
            }
        }

        // 6.5. Mount Engine Script
        if (file_exists(SEDRAZAVI_THEME_DIR . '/assets/js/sedrazavi-react-mount.js')) {
            wp_enqueue_script(
                'sedrazavi-react-mount-engine',
                SEDRAZAVI_THEME_URI . '/assets/js/sedrazavi-react-mount.js',
                [$enqueued_js_handle ?: 'jquery'],
                SEDRAZAVI_THEME_VERSION,
                true
            );
        }

        // 6.6. Prepare Localized Server & Auth Context
        $current_user = wp_get_current_user();
        $is_user_auth = is_user_logged_in();

        $current_user_payload = [
            'isLoggedIn'   => $is_user_auth,
            'id'           => get_current_user_id(),
            'username'     => $is_user_auth ? $current_user->user_login : '',
            'displayName'  => $is_user_auth ? $current_user->display_name : '',
            'email'        => $is_user_auth ? $current_user->user_email : '',
            'roles'        => $is_user_auth ? (array) $current_user->roles : [],
            'isAdmin'      => current_user_can('manage_options'),
            'isLawyer'     => current_user_can('edit_posts') || ($is_user_auth && in_array('lawyer', (array)$current_user->roles, true)),
            'phone'        => $is_user_auth ? (get_user_meta($current_user->ID, 'phone', true) ?: get_user_meta($current_user->ID, 'billing_phone', true) ?: '') : '',
        ];

        $saved_profile = get_option('sedrazavi_lawyer_profile', []);

        $localized_payload = [
            'currentUser'     => $current_user_payload,
            'nonce'           => wp_create_nonce('wp_rest'),
            'restNonce'       => wp_create_nonce('wp_rest'),
            'restUrl'         => esc_url_raw(rest_url('sedrazavi/v1/')),
            'restRoot'        => esc_url_raw(rest_url()),
            'loginUrl'        => wp_login_url(),
            'logoutUrl'       => wp_logout_url(home_url()),
            'ajaxUrl'         => admin_url('admin-ajax.php'),
            'ajaxNonce'       => wp_create_nonce('sedrazavi_security_nonce'),
            'profileSaveUrl'  => esc_url_raw(rest_url('sedrazavi/v1/profile/save')),
            'profileGetUrl'   => esc_url_raw(rest_url('sedrazavi/v1/profile/get')),
            'verifySessionUrl'=> esc_url_raw(rest_url('sedrazavi/v1/auth/verify-session')),
            'lawyerProfile'   => !empty($saved_profile) ? $saved_profile : [
                'name'           => get_option('sedrazavi_lawyer_name', 'سرکار خانم دکتر سیده مریم رضوی'),
                'title'          => get_option('sedrazavi_lawyer_title', 'وکیل پایه یک دادگستری و مشاور ارشد حقوقی'),
                'licenseNumber'  => get_option('sedrazavi_lawyer_license', '۱۸۴۵۲ / ک.و.م'),
                'phone'          => get_option('sedrazavi_lawyer_phone', '۰۲۱-۸۸۹۹۰۰۱۱'),
                'mobile'         => get_option('sedrazavi_lawyer_mobile', '۰۹۱۲-۳۴۵۶۷۸۹'),
                'emergencyPhone' => '۰۲۱-۸۸۷۷۶۶۵۵',
                'address'        => get_option('sedrazavi_lawyer_address', 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج حقوقی SedRazavi'),
                'primaryColor'   => get_option('sedrazavi_primary_color', '#0B132B'),
                'goldColor'      => get_option('sedrazavi_gold_color', '#D4AF37'),
            ],
            'site'            => [
                'url'            => home_url(),
                'name'           => get_bloginfo('name'),
                'isRtl'          => is_rtl(),
                'version'        => SEDRAZAVI_THEME_VERSION,
            ],
        ];

        // 6.7. wp_localize_script for seamless authentication
        if ($enqueued_js_handle) {
            wp_localize_script($enqueued_js_handle, 'SedRazaviAuthBridge', $localized_payload);
            wp_localize_script($enqueued_js_handle, 'SedRazaviReactConfig', $localized_payload);
        }
    }
    add_action('wp_enqueue_scripts', 'enqueue_react_assets', 10);

    // 6.8. Support ES Module type for code-split chunks in modern browsers
    add_filter('script_loader_tag', function($tag, $handle, $src) {
        if ($handle === 'sedrazavi-react-bundle-js') {
            return '<script type="module" src="' . esc_url($src) . '"></script>' . "\n";
        }
        return $tag;
    }, 10, 3);
}

/**
 * 7. Universal Modular Inclusions (Clean Separation of Concerns)
 */
// Universal Framework Core (Loaded for all niches: Agency, Corporate, Store, Legal)
$sedrazavi_essential_includes = [
    'register-react-shortcodes.php', // Universal [react_component name="..."] shortcodes
    'inc/wp-rest-auth.php',          // Secure REST API authentication & nonces
    'inc/api-handlers.php',          // Dedicated REST API endpoint for saving profile settings
    'inc/react-shortcodes.php',      // Extended shortcodes package & auto-enqueuing
    'inc/rest-api.php',              // Full REST API suite (cases, otp, bookings)
    'inc/setup.php',                 // Plugin dependency checker & core setup
    'inc/preset-engine.php',         // Multi-industry preset engine & terminology
    'inc/seo-bridge.php',            // Dynamic SEO tags, OpenGraph, and Schema.org
    'inc/customizer-seo.php',        // Customizer SEO & Branding controls
    'inc/manifest-bridge.php',       // PWA & Idempotent Page Setup
    'inc/meta-boxes.php',            // Native Page Meta Boxes
    'inc/theme-options.php',         // Theme options & customizer styles
    'inc/security.php',              // Security headers, rate limiting, and sanitization
    'inc/booking.php',               // General consultation & brief booking subsystem
    'inc/elementor-widgets.php',      // Custom Elementor widgets bridge
    'inc/advanced-backup.php',       // Version control & snapshot backup manager
    'inc/class-sedrazavi-elementor.php', // Elementor category & widget hooks
    'inc/class-sedrazavi-security.php',  // Security hardening & MIME filtering
    'inc/class-sedrazavi-updater.php',   // GitHub auto-updater engine
    'inc/dashboard.php',                 // Admin top-level dashboard menu & stats
    'inc/educational-tour.php',          // Admin onboarding interactive tours
    'inc/integrations.php',              // WooCommerce, SEO breadcrumbs & cache hooks
    'inc/ux-improvements.php',           // Client experience & skeleton loaders
    'inc/class-github-sync.php',         // GitHub Real-Time Sync & Webhook Engine
    'inc/class-demo-importer.php',       // One-click demo content and pages importer
    'inc/class-setup-wizard.php',        // 30-Second Quick Setup Wizard in WP Admin
    'inc/scenario-controller.php',       // Universal Scenario Controller & Layout Archetypes
    'inc/class-realtime-notifications.php', // Real-Time Lead Notification & Sound Engine
    'inc/class-cloud-catalog.php',       // Cloud Preset Catalog & Child-Theme Factory
];

// Legal Modules (Decoupled & Isolated for legal-firm child theme only)
$sedrazavi_legal_exclusive_includes = [
    'inc/case-management.php',               // Case management CPT & taxonomy
    'inc/user-roles.php',                    // Custom legal roles (client, secretary, intern)
    'inc/class-sedrazavi-calculators.php',   // Judicial tariffs & calculation suite
    'inc/class-sedrazavi-client-portal.php', // Client portal subsystem
    'inc/class-sedrazavi-dashboard.php',     // Admin dashboard helpers
    'inc/arbitration-cpt.php',               // Arbitration cases CPT
    'inc/corporate-international.php',       // Corporate quorum & incoterms 2020
    'inc/legal-vault-deadlines.php',         // Judicial deadlines & vault
    'inc/analytics-reports.php',             // Legal analytics & KPI reporting
    'inc/precedents-cpt.php',                // Supreme court precedents CPT & taxonomy
];

foreach ($sedrazavi_essential_includes as $file_rel) {
    $full_path = SEDRAZAVI_THEME_DIR . '/' . $file_rel;
    if (file_exists($full_path)) {
        require_once $full_path;
    }
}

// Only load legal baggage if explicitly active
if (sedrazavi_is_legal_module_enabled()) {
    foreach ($sedrazavi_legal_exclusive_includes as $file_rel) {
        $full_path = SEDRAZAVI_THEME_DIR . '/' . $file_rel;
        if (file_exists($full_path)) {
            require_once $full_path;
        }
    }
}

/**
 * 8. Native Gutenberg Block Patterns Registration
 */
add_action('init', function() {
    if (!function_exists('register_block_pattern_category') || !function_exists('register_block_pattern')) {
        return;
    }

    register_block_pattern_category('sedrazavi-patterns', [
        'label' => __('الگوهای اختصاصی SedRazavi OS', 'sedrazavi'),
    ]);

    $patterns_dir = SEDRAZAVI_THEME_DIR . '/patterns';
    if (is_dir($patterns_dir)) {
        $files = glob($patterns_dir . '/*.php');
        if (!empty($files)) {
            foreach ($files as $file) {
                $slug = basename($file, '.php');
                $content = file_get_contents($file);
                
                $title = ucwords(str_replace(['pattern-', '-'], ['', ' '], $slug));
                if (preg_match('/Title:\s*(.+)$/m', $content, $m)) {
                    $title = trim($m[1]);
                }
                
                $raw_pattern = preg_replace('/<\?php.*?\?>/s', '', $content);

                register_block_pattern('sedrazavi/' . $slug, [
                    'title'       => $title,
                    'categories'  => ['sedrazavi-patterns'],
                    'content'     => trim($raw_pattern),
                ]);
            }
        }
    }
});

