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
 * 3. Custom Post Types Registration ('service', 'article', 'case')
 */
if (!function_exists('sedrazavi_register_custom_post_types')) {
    function sedrazavi_register_custom_post_types() {

        // CPT 1: Legal Services ('service')
        if (!post_type_exists('service')) {
            $service_labels = [
                'name'               => esc_html__('خدمات حقوقی', 'sedrazavi'),
                'singular_name'      => esc_html__('خدمت حقوقی', 'sedrazavi'),
                'menu_name'          => esc_html__('خدمات حقوقی', 'sedrazavi'),
                'add_new'            => esc_html__('افزودن خدمت جدید', 'sedrazavi'),
                'add_new_item'       => esc_html__('افزودن خدمت حقوقی جدید', 'sedrazavi'),
                'edit_item'          => esc_html__('ویرایش خدمت حقوقی', 'sedrazavi'),
                'new_item'           => esc_html__('خدمت حقوقی جدید', 'sedrazavi'),
                'view_item'          => esc_html__('مشاهده خدمت حقوقی', 'sedrazavi'),
                'search_items'       => esc_html__('جستجوی خدمات', 'sedrazavi'),
                'not_found'          => esc_html__('خدمتی یافت نشد', 'sedrazavi'),
                'not_found_in_trash' => esc_html__('در سطل زباله یافت نشد', 'sedrazavi'),
            ];

            register_post_type('service', [
                'labels'              => $service_labels,
                'public'              => true,
                'has_archive'         => true,
                'rewrite'             => ['slug' => 'legal-services'],
                'menu_icon'           => 'dashicons-hammer',
                'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'revisions'],
                'show_in_rest'        => true,
                'hierarchical'        => false,
            ]);

            register_taxonomy('service_category', ['service'], [
                'labels'            => [
                    'name'          => esc_html__('دسته‌بندی خدمات حقوقی', 'sedrazavi'),
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

        // CPT 3: Client Cases & Docket Tracking ('case')
        if (!post_type_exists('case')) {
            $case_labels = [
                'name'               => esc_html__('پرونده‌های قضایی', 'sedrazavi'),
                'singular_name'      => esc_html__('پرونده قضایی', 'sedrazavi'),
                'menu_name'          => esc_html__('کارتابل پرونده‌ها', 'sedrazavi'),
                'add_new'            => esc_html__('ثبت پرونده جدید', 'sedrazavi'),
                'add_new_item'       => esc_html__('ثبت پرونده قضایی موکل', 'sedrazavi'),
                'edit_item'          => esc_html__('ویرایش پرونده', 'sedrazavi'),
                'view_item'          => esc_html__('مشاهده پرونده', 'sedrazavi'),
                'search_items'       => esc_html__('جستجوی پرونده‌ها', 'sedrazavi'),
                'not_found'          => esc_html__('پرونده‌ای یافت نشد', 'sedrazavi'),
            ];

            register_post_type('case', [
                'labels'              => $case_labels,
                'public'              => true,
                'has_archive'         => true,
                'rewrite'             => ['slug' => 'legal-cases'],
                'menu_icon'           => 'dashicons-portfolio',
                'supports'            => ['title', 'editor', 'custom-fields', 'revisions'],
                'show_in_rest'        => true,
            ]);

            register_taxonomy('case_type', ['case'], [
                'labels'            => [
                    'name'          => esc_html__('موضوعات دادرسی', 'sedrazavi'),
                    'singular_name' => esc_html__('موضوع دعوا', 'sedrazavi'),
                ],
                'hierarchical'      => true,
                'show_in_rest'      => true,
                'rewrite'           => ['slug' => 'case-topic'],
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
    }
    add_action('customize_register', 'sedrazavi_customize_register');
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
        // 6.1. Persian Webfont Vazirmatn
        wp_enqueue_style(
            'sedrazavi-vazirmatn-font',
            'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css',
            [],
            '33.003'
        );

        // 6.2. WordPress Main Stylesheet
        wp_enqueue_style(
            'sedrazavi-main-style',
            get_stylesheet_uri(),
            [],
            SEDRAZAVI_THEME_VERSION
        );

        // 6.3. Production Build Path Detection for Minified CSS (Single official target: app-dist)
        $candidate_css_dirs = [
            'app-dist/index.css',
        ];

        $enqueued_css_uri = '';
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

        // 6.4. Production Build Path Detection for Minified JS (Single official target: app-dist)
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
 * 7. Safe Modules Inclusions (Guaranteed Loading of Handlers & Bridge)
 */
$sedrazavi_essential_includes = [
    'register-react-shortcodes.php', // Universal [react_component name="..."] shortcodes
    'inc/wp-rest-auth.php',          // Secure REST API authentication & nonces
    'inc/api-handlers.php',          // Dedicated REST API endpoint for saving profile settings
    'inc/react-shortcodes.php',      // Extended shortcodes package & auto-enqueuing
    'inc/rest-api.php',              // Full REST API suite (cases, otp, bookings)
    'inc/setup.php',                 // Plugin dependency checker & core setup
    'inc/seo-bridge.php',            // Dynamic SEO tags, OpenGraph, and Schema.org
    'inc/customizer-seo.php',        // Customizer SEO & Branding controls
    'inc/user-roles.php',            // Custom legal roles (client, secretary, intern)
    'inc/manifest-bridge.php',       // PWA & Idempotent Page Setup
    'inc/meta-boxes.php',            // Native Page Meta Boxes
    'inc/theme-options.php',         // Theme options & customizer styles
    'inc/security.php',              // Security headers, rate limiting, and sanitization
    'inc/case-management.php',       // Case management CPT & taxonomy
    'inc/booking.php',               // Consultation booking subsystem
    'inc/elementor-widgets.php',      // Custom Elementor widgets bridge
    'inc/class-sedrazavi-calculators.php',   // Judicial tariffs & calculation suite
    'inc/class-sedrazavi-client-portal.php', // Client portal subsystem
    'inc/class-sedrazavi-dashboard.php',     // Admin dashboard helpers
    'inc/arbitration-cpt.php',               // Arbitration cases CPT
    'inc/corporate-international.php',       // Corporate quorum & incoterms 2020
    'inc/legal-vault-deadlines.php',         // Judicial deadlines & vault
    'inc/advanced-backup.php',               // Version control & snapshot backup manager
    'inc/analytics-reports.php',             // Legal analytics & KPI reporting
    'inc/class-sedrazavi-elementor.php',     // Elementor category & widget hooks
    'inc/class-sedrazavi-security.php',      // Security hardening & MIME filtering
    'inc/class-sedrazavi-updater.php',       // GitHub auto-updater engine
    'inc/dashboard.php',                     // Admin top-level dashboard menu & stats
    'inc/educational-tour.php',              // Admin onboarding interactive tours
    'inc/integrations.php',                  // WooCommerce, SEO breadcrumbs & cache hooks
    'inc/precedents-cpt.php',                // Supreme court precedents CPT & taxonomy
    'inc/ux-improvements.php',               // Client experience & skeleton loaders
];

foreach ($sedrazavi_essential_includes as $file_rel) {
    $full_path = SEDRAZAVI_THEME_DIR . '/' . $file_rel;
    if (file_exists($full_path)) {
        require_once $full_path;
    }
}
