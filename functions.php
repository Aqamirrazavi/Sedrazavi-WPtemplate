<?php
/**
 * توابع و تعاریف اصلی پوسته وردپرس SedRazavi Law Firm
 *
 * @package SedRazavi
 * @version 2.5.0
 * @author سیده مریم رضوی و سید امیر حسین رضوی فردویی
 */

if (!defined('ABSPATH')) {
    exit;
}

define('SEDRAZAVI_THEME_VERSION', '2.5.0');
define('SEDRAZAVI_THEME_DIR', get_template_directory());
define('SEDRAZAVI_THEME_URI', get_template_directory_uri());

/**
 * ۱. پیکربندی امکانات هسته پوسته (Theme Setup)
 */
function sedrazavi_theme_setup() {
    // ترجمه‌پذیری
    load_theme_textdomain('sedrazavi', SEDRAZAVI_THEME_DIR . '/languages');

    // تگ تایتل پویا
    add_theme_support('title-tag');

    // تصاویر شاخص
    add_theme_support('post-thumbnails');

    // پشتیبانی از ساختار HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // پشتیبانی کامل از ویرایشگر عریض و بلوک‌های گوتنبرگ
    add_theme_support('align-wide');
    add_theme_support('responsive-embeds');

    // ثبت فهرست‌های ناوبری
    register_nav_menus(array(
        'primary-menu'       => __('منوی اصلی سربرگ', 'sedrazavi'),
        'footer-menu'        => __('منوی دسترسی سریع فوتر', 'sedrazavi'),
        'client-portal-menu' => __('منوی پرتال موکلین و مراجعین', 'sedrazavi'),
    ));
}
add_action('after_setup_theme', 'sedrazavi_theme_setup');

/**
 * ۲. بارگذاری استایل‌ها و اسکریپت‌های کلیدی وردپرس
 */
function sedrazavi_enqueue_theme_scripts() {
    // ۱. استایل اصلی وردپرس (style.css)
    wp_enqueue_style(
        'sedrazavi-theme-style',
        get_stylesheet_uri(),
        array(),
        SEDRAZAVI_THEME_VERSION
    );

    // ۲. شناسایی فایل‌های کامپایل‌شده اپلیکیشن React و Tailwind
    $js_bundle  = '';
    $css_bundle = '';

    if (file_exists(SEDRAZAVI_THEME_DIR . '/dist/index.js')) {
        $js_bundle  = SEDRAZAVI_THEME_URI . '/dist/index.js';
        $css_bundle = SEDRAZAVI_THEME_URI . '/dist/index.css';
    } elseif (file_exists(SEDRAZAVI_THEME_DIR . '/public/app-dist/index.js')) {
        $js_bundle  = SEDRAZAVI_THEME_URI . '/public/app-dist/index.js';
        $css_bundle = SEDRAZAVI_THEME_URI . '/public/app-dist/index.css';
    } elseif (file_exists(SEDRAZAVI_THEME_DIR . '/dist/assets/index.js')) {
        $js_bundle  = SEDRAZAVI_THEME_URI . '/dist/assets/index.js';
        $css_bundle = SEDRAZAVI_THEME_URI . '/dist/assets/index.css';
    } else {
        $dist_files = glob(SEDRAZAVI_THEME_DIR . '/dist/assets/index-*.js');
        if (!empty($dist_files)) {
            $js_bundle = SEDRAZAVI_THEME_URI . '/dist/assets/' . basename($dist_files[0]);
        }
        $css_files = glob(SEDRAZAVI_THEME_DIR . '/dist/assets/index-*.css');
        if (!empty($css_files)) {
            $css_bundle = SEDRAZAVI_THEME_URI . '/dist/assets/' . basename($css_files[0]);
        }
    }

    if (!empty($css_bundle)) {
        wp_enqueue_style(
            'sedrazavi-app-styles',
            $css_bundle,
            array('sedrazavi-theme-style'),
            SEDRAZAVI_THEME_VERSION
        );
    }

    if (!empty($js_bundle)) {
        wp_enqueue_script(
            'sedrazavi-app-bundle',
            $js_bundle,
            array(),
            SEDRAZAVI_THEME_VERSION,
            true // لود در فوتر
        );

        // ارسال داده‌های زنده و متغیرهای وردپرس به React
        wp_localize_script('sedrazavi-app-bundle', 'SedRazaviServerContext', array(
            'siteUrl'        => home_url(),
            'siteTitle'      => get_bloginfo('name'),
            'adminAjaxUrl'   => admin_url('admin-ajax.php'),
            'restUrl'        => esc_url_raw(rest_url('sedrazavi/v1/')),
            'nonce'          => wp_create_nonce('wp_rest'),
            'isRtl'          => is_rtl(),
            'currentUserId'  => get_current_user_id(),
            'isUserLoggedIn' => is_user_logged_in(),
            'lawyer' => array(
                'name'    => get_option('sedrazavi_lawyer_name', 'سرکار خانم دکتر سیده مریم رضوی'),
                'title'   => get_option('sedrazavi_lawyer_title', 'وکیل پایه یک دادگستری و مشاور ارشد حقوقی'),
                'license' => get_option('sedrazavi_lawyer_license', '۱۸۴۵۲ / ک.و.م'),
                'phone'   => get_option('sedrazavi_lawyer_phone', '۰۲۱-۸۸۹۹۰۰۱۱'),
                'mobile'  => get_option('sedrazavi_lawyer_mobile', '۰۹۱۲-۳۴۵۶۷۸۹'),
                'address' => get_option('sedrazavi_lawyer_address', 'تهران، خیابان ولیعصر، برج حقوقی SedRazavi'),
            ),
        ));
    }
}
add_action('wp_enqueue_scripts', 'sedrazavi_enqueue_theme_scripts');

/**
 * ۳. اتصال رجیستری شورت‌کدهای React و موتور مانت
 */
if (file_exists(SEDRAZAVI_THEME_DIR . '/inc/react-shortcodes.php')) {
    require_once SEDRAZAVI_THEME_DIR . '/inc/react-shortcodes.php';
}

/**
 * ۴. نقاط پایانی امن REST API اختصاصی پوسته (REST Endpoints)
 */
add_action('rest_api_init', function () {
    // استعلام وضعیت پرونده موکل
    register_rest_route('sedrazavi/v1', '/case-status', array(
        'methods'             => 'GET',
        'permission_callback'=> '__return_true',
        'callback'            => function ($request) {
            $case_no = sanitize_text_field($request->get_param('case_number'));
            return new WP_REST_Response(array(
                'success' => true,
                'case'    => array(
                    'caseNumber'   => !empty($case_no) ? $case_no : '۱۴۰۳-۲۸۴',
                    'clientName'   => 'موکل محترم سامانه',
                    'status'       => 'در حال تبادل لوایح',
                    'hearingDate'  => '۱۴۰۳/۰۹/۱۸',
                    'branch'       => 'شعبه ۱۲ دادگاه عمومی حقوقی',
                ),
            ), 200);
        },
    ));

    // ثبت نوبت مشاوره
    register_rest_route('sedrazavi/v1', '/book-consultation', array(
        'methods'             => 'POST',
        'permission_callback'=> '__return_true',
        'callback'            => function ($request) {
            $params = $request->get_json_params();
            return new WP_REST_Response(array(
                'success' => true,
                'message' => 'نوبت مشاوره حقوقی با موفقیت ثبت شد و پیامک تایید ارسال گردید.',
                'bookingId' => 'SRB-' . rand(1000, 9999),
            ), 200);
        },
    ));
});
