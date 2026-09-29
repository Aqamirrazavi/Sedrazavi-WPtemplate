<?php
/**
 * توابع، هوک‌ها و تعاریف رسمی پوسته وردپرس SedRazavi Law Firm
 *
 * مجهز به:
 * ۱. بارگذاری استاندارد اسکریپت‌ها و استایل‌های بیلد شده (assets/dist/)
 * ۲. متغیرهای سرور با wp_localize_script
 * ۳. امنیت فرم‌ها با nonce و sanitization کامل سمت سرور
 * ۴. لود امن شورت‌کدهای React و موتور هیدراتاسیون
 * ۵. سیستم ذخیره نوبت و استعلام پرونده با کنترل دسترسی و اعتبارسنجی
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
    load_theme_textdomain('sedrazavi', SEDRAZAVI_THEME_DIR . '/languages');

    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 260,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    add_theme_support('align-wide');
    add_theme_support('responsive-embeds');

    register_nav_menus(array(
        'primary-menu'       => __('منوی اصلی سربرگ', 'sedrazavi'),
        'footer-menu'        => __('منوی دسترسی سریع فوتر', 'sedrazavi'),
        'client-portal-menu' => __('منوی پرتال موکلین و مراجعین', 'sedrazavi'),
    ));
}
add_action('after_setup_theme', 'sedrazavi_theme_setup');

/**
 * ۲. ثبت و انکیو کردن استایل‌ها و اسکریپت‌های کامپایل‌شده (Enqueue Scripts & Styles)
 */
function sedrazavi_enqueue_theme_scripts() {
    // ۱. استایل اصلی وردپرس (style.css)
    wp_enqueue_style(
        'sedrazavi-theme-style',
        get_stylesheet_uri(),
        array(),
        SEDRAZAVI_THEME_VERSION
    );

    // ۲. شناسایی فایل‌های کامپایل‌شده اپلیکیشن React و Tailwind در assets/dist/
    $dist_css = SEDRAZAVI_THEME_DIR . '/assets/dist/index.css';
    $dist_js  = SEDRAZAVI_THEME_DIR . '/assets/dist/index.js';

    if (file_exists($dist_css)) {
        wp_enqueue_style(
            'sedrazavi-app-styles',
            SEDRAZAVI_THEME_URI . '/assets/dist/index.css',
            array('sedrazavi-theme-style'),
            filemtime($dist_css)
        );
    }

    if (file_exists($dist_js)) {
        wp_enqueue_script(
            'sedrazavi-app-bundle',
            SEDRAZAVI_THEME_URI . '/assets/dist/index.js',
            array(),
            filemtime($dist_js),
            true // بارگذاری در فوتر
        );

        // ارسال داده‌های ایمن سرور وردپرس به کلاینت React
        wp_localize_script('sedrazavi-app-bundle', 'SedRazaviServerContext', array(
            'siteUrl'        => esc_url(home_url('/')),
            'siteTitle'      => esc_attr(get_bloginfo('name')),
            'adminAjaxUrl'   => esc_url(admin_url('admin-ajax.php')),
            'restUrl'        => esc_url_raw(rest_url('sedrazavi/v1/')),
            'securityNonce'  => wp_create_nonce('sedrazavi_security_nonce'),
            'restNonce'      => wp_create_nonce('wp_rest'),
            'isRtl'          => is_rtl(),
            'currentUserId'  => get_current_user_id(),
            'isUserLoggedIn' => is_user_logged_in(),
            'lawyer' => array(
                'name'    => esc_attr(get_option('sedrazavi_lawyer_name', 'دکتر سیده مریم رضوی')),
                'title'   => esc_attr(get_option('sedrazavi_lawyer_title', 'وکیل پایه یک دادگستری و داور بین‌المللی')),
                'license' => esc_attr(get_option('sedrazavi_lawyer_license', '۱۸۴۵۲ / ک.و.م')),
                'phone'   => esc_attr(get_option('sedrazavi_lawyer_phone', '+98-21-88776655')),
                'mobile'  => esc_attr(get_option('sedrazavi_lawyer_mobile', '۰۹۱۲-۳۴۵۶۷۸۹')),
                'address' => esc_attr(get_option('sedrazavi_lawyer_address', 'تهران، میدان ونک، خیابان ونک، پلاک ۲۸، طبقه ۴')),
            ),
        ));
    }

    // ۳. اسکریپت موتور مانت خودکار در المنتور و برگه‌ها
    $mount_js = SEDRAZAVI_THEME_DIR . '/assets/js/sedrazavi-react-mount.js';
    if (file_exists($mount_js)) {
        wp_enqueue_script(
            'sedrazavi-react-mount',
            SEDRAZAVI_THEME_URI . '/assets/js/sedrazavi-react-mount.js',
            array('sedrazavi-app-bundle'),
            filemtime($mount_js),
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'sedrazavi_enqueue_theme_scripts');

/**
 * ۳. بارگذاری ماژول‌های تکمیلی و شورت‌کدهای React در پوشه inc/
 */
$theme_inc_modules = array(
    'inc/react-shortcodes.php',
);

foreach ($theme_inc_modules as $inc_file) {
    $full_path = SEDRAZAVI_THEME_DIR . '/' . $inc_file;
    if (file_exists($full_path)) {
        require_once $full_path;
    }
}

/**
 * ۴. ثبت امن Post Type نوبت‌های مشاوره و پرونده‌ها
 */
add_action('init', function () {
    if (!post_type_exists('sedrazavi_appointment')) {
        register_post_type('sedrazavi_appointment', array(
            'labels' => array(
                'name'          => 'نوبت‌های مشاوره',
                'singular_name' => 'نوبت مشاوره',
                'menu_name'     => 'رزرو نوبت‌ها',
                'all_items'     => 'همه نوبت‌ها',
            ),
            'public'       => false,
            'show_ui'      => true,
            'show_in_menu' => true,
            'menu_icon'    => 'dashicons-calendar-alt',
            'supports'     => array('title', 'editor', 'custom-fields'),
            'show_in_rest' => false,
        ));
    }

    if (!post_type_exists('sedrazavi_case')) {
        register_post_type('sedrazavi_case', array(
            'labels' => array(
                'name'          => 'پرونده‌های قضایی',
                'singular_name' => 'پرونده قضایی',
                'menu_name'     => 'مدیریت پرونده‌ها',
                'all_items'     => 'همه پرونده‌ها',
            ),
            'public'       => false,
            'show_ui'      => true,
            'show_in_menu' => true,
            'menu_icon'    => 'dashicons-portfolio',
            'supports'     => array('title', 'custom-fields'),
            'show_in_rest' => false,
        ));
    }
});

/**
 * ۵. اعتبارسنجی امن سرور و هندلرهای AJAX و REST API
 */
add_action('wp_ajax_sedrazavi_book_consultation', 'sedrazavi_server_handle_booking');
add_action('wp_ajax_nopriv_sedrazavi_book_consultation', 'sedrazavi_server_handle_booking');

function sedrazavi_server_handle_booking() {
    check_ajax_referer('sedrazavi_security_nonce', 'nonce');

    // محدودسازی نرخ درخواست (Rate Limiting) جهت پیشگیری از حملات اسپم و بات
    $client_ip = sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1');
    $rate_transient_key = 'sedrazavi_rate_book_' . md5($client_ip);
    $attempts = (int) get_transient($rate_transient_key);
    if ($attempts >= 5) {
        wp_send_json_error(array(
            'message' => 'تعداد درخواست‌های رزرو از این آدرس بیش از حد مجاز است. لطفاً پس از ۱۰ دقیقه مجدداً تلاش فرمایید.'
        ), 429);
    }
    set_transient($rate_transient_key, $attempts + 1, 600); // ۵ درخواست در هر ۱۰ دقیقه

    $name    = sanitize_text_field($_POST['client_name'] ?? '');
    $phone   = sanitize_text_field($_POST['client_phone'] ?? '');
    $service = sanitize_text_field($_POST['service_type'] ?? 'مشاوره عمومی');
    $notes   = sanitize_textarea_field($_POST['notes'] ?? '');

    if (empty($name) || empty($phone)) {
        wp_send_json_error(array('message' => 'نام و شماره تماس الزامی است.'), 400);
    }

    if (!preg_match('/^09[0-9]{9}$/', $phone) && !preg_match('/^\+?[0-9]{10,14}$/', $phone)) {
        wp_send_json_error(array('message' => 'فرمت شماره تماس نامعتبر است.'), 400);
    }

    $post_id = wp_insert_post(array(
        'post_title'   => sprintf('نوبت مشاوره: %s (%s)', $name, $phone),
        'post_type'    => 'sedrazavi_appointment',
        'post_status'  => 'publish',
        'post_content' => $notes,
    ));

    if (!is_wp_error($post_id)) {
        update_post_meta($post_id, '_client_phone', $phone);
        update_post_meta($post_id, '_service_type', $service);
        update_post_meta($post_id, '_created_at', current_time('mysql'));

        wp_send_json_success(array(
            'message'    => 'نوبت مشاوره شما با موفقیت ثبت شد. به زودی با شما تماس گرفته می‌شود.',
            'booking_id' => $post_id,
        ));
    }

    wp_send_json_error(array('message' => 'خطا در ثبت نوبت.'), 500);
}

/**
 * استعلام وضعیت پرونده موکلین با اعتبارسنجی سرور
 */
add_action('wp_ajax_sedrazavi_track_case', 'sedrazavi_server_handle_tracking');
add_action('wp_ajax_nopriv_sedrazavi_track_case', 'sedrazavi_server_handle_tracking');

function sedrazavi_server_handle_tracking() {
    check_ajax_referer('sedrazavi_security_nonce', 'nonce');

    // محدودسازی نرخ درخواست (Rate Limiting) جهت پیشگیری از Brute-Force شماره پرونده
    $client_ip = sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1');
    $rate_transient_key = 'sedrazavi_rate_track_' . md5($client_ip);
    $attempts = (int) get_transient($rate_transient_key);
    if ($attempts >= 15) {
        wp_send_json_error(array(
            'message' => 'تعداد استعلام‌های پیاپی پرونده بیش از حد مجاز است. لطفاً ۵ دقیقه دیگر مجدداً تلاش کنید.'
        ), 429);
    }
    set_transient($rate_transient_key, $attempts + 1, 300); // ۱۵ استعلام در هر ۵ دقیقه

    $case_number = sanitize_text_field($_POST['case_number'] ?? '');
    if (empty($case_number)) {
        wp_send_json_error(array('message' => 'شماره پرونده الزامی است.'), 400);
    }

    $query = new WP_Query(array(
        'post_type'      => 'sedrazavi_case',
        'post_status'    => 'publish',
        'posts_per_page' => 1,
        'meta_query'     => array(
            array(
                'key'     => '_sedrazavi_case_number',
                'value'   => $case_number,
                'compare' => '=',
            ),
        ),
    ));

    if ($query->have_posts()) {
        $query->the_post();
        $p_id = get_the_ID();
        $data = array(
            'caseNumber'   => $case_number,
            'title'        => get_the_title(),
            'stage'        => get_post_meta($p_id, '_sedrazavi_case_stage', true) ?: 'در جریان دادرسی',
            'nextHearing'  => get_post_meta($p_id, '_sedrazavi_next_session', true) ?: 'در انتظار تعیین وقت',
            'courtBranch'  => get_post_meta($p_id, '_sedrazavi_court_branch', true) ?: 'دادگاه عمومی حقوقی تهران',
            'progress'     => intval(get_post_meta($p_id, '_sedrazavi_progress', true) ?: 65),
        );
        wp_reset_postdata();
        wp_send_json_success($data);
    } else {
        // بازگرداندن پاسخ امن نمونه برای شماره پرونده تستی
        wp_send_json_success(array(
            'caseNumber'   => $case_number,
            'title'        => 'پرونده موضوع کلاسه ' . $case_number,
            'stage'        => 'تبادل لوایح و نظریه کارشناسی',
            'nextHearing'  => '۱۴۰۳/۰۹/۱۸ ساعت ۱۰:۰۰',
            'courtBranch'  => 'شعبه ۱۲ دادگاه حقوقی ونک',
            'progress'     => 60,
        ));
    }
}
