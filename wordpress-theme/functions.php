<?php
/**
 * SedRazavi Law Firm Theme Functions and Definitions
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit; // Direct access denied
}

if (!defined('SEDRAZAVI_THEME_VERSION')) {
    define('SEDRAZAVI_THEME_VERSION', '2.6.0');
}
if (!defined('SEDRAZAVI_THEME_DIR')) {
    define('SEDRAZAVI_THEME_DIR', function_exists('get_template_directory') && get_template_directory() ? get_template_directory() : __DIR__);
}
if (!defined('SEDRAZAVI_THEME_URI')) {
    define('SEDRAZAVI_THEME_URI', function_exists('get_template_directory_uri') && get_template_directory_uri() ? get_template_directory_uri() : get_stylesheet_directory_uri());
}

/**
 * 1. Theme Setup
 */
if (!function_exists('sedrazavi_theme_setup')) {
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
}

/**
 * 2. Enqueue Scripts & Styles
 */
if (!function_exists('sedrazavi_enqueue_assets')) {
function sedrazavi_enqueue_assets() {
    // 1. Web font Vazirmatn via CDN with graceful fallback
    wp_enqueue_style(
        'sedrazavi-vazirmatn-font',
        'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css',
        array(),
        '33.003'
    );

    // 2. Main Theme Stylesheet
    wp_enqueue_style(
        'sedrazavi-main-style',
        get_stylesheet_uri(),
        array(),
        SEDRAZAVI_THEME_VERSION
    );

    // 3. Theme JS Engine
    wp_enqueue_script(
        'sedrazavi-theme-bundle',
        SEDRAZAVI_THEME_URI . '/assets/js/main.js',
        array(),
        SEDRAZAVI_THEME_VERSION,
        true
    );

    // Localize Script for AJAX actions
    wp_localize_script('sedrazavi-theme-bundle', 'sedrazavi_ajax_obj', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('sedrazavi_security_nonce'),
        'strings'  => array(
            'success_booking' => esc_html__('درخواست رزرو شما با موفقیت ثبت شد.', 'sedrazavi'),
            'error_booking'   => esc_html__('خطایی رخ داد؛ لطفاً دوباره تلاش فرمایید.', 'sedrazavi'),
            'tracking_found'  => esc_html__('پرونده با موفقیت شناسایی شد.', 'sedrazavi'),
        )
    ));

    // 4. Automated React SPA Engine (موتور اجرای باندل‌های کامپایل‌شده فرانت‌اند)
    $asset_rel_paths = array(
        'assets/dist/',
        'assets/',
        'dist/',
    );

    $found_css = '';
    $found_js = '';
    $asset_base_uri = '';

    foreach ($asset_rel_paths as $rel_path) {
        $check_css = SEDRAZAVI_THEME_DIR . '/' . $rel_path . 'index.css';
        $check_js  = SEDRAZAVI_THEME_DIR . '/' . $rel_path . 'index.js';
        if (file_exists($check_js)) {
            $found_js = $check_js;
            $found_css = file_exists($check_css) ? $check_css : '';
            $asset_base_uri = SEDRAZAVI_THEME_URI . '/' . $rel_path;
            break;
        }
    }

    if (!empty($found_js)) {
        if (!empty($found_css)) {
            wp_enqueue_style(
                'sedrazavi-react-bundle-style',
                $asset_base_uri . 'index.css',
                array(),
                filemtime($found_css)
            );
        }

        wp_enqueue_script(
            'sedrazavi-react-bundle-app',
            $asset_base_uri . 'index.js',
            array(),
            filemtime($found_js),
            true
        );

        // تنظیم استاندارد window.__vite_public_path__ پیش از لود باندل اصلی
        $public_path_inline = 'window.__vite_public_path__ = ' . wp_json_encode($asset_base_uri) . ';';
        wp_add_inline_script('sedrazavi-react-bundle-app', $public_path_inline, 'before');

        wp_localize_script('sedrazavi-react-bundle-app', 'SedRazaviWPConfig', array(
            'siteUrl'    => home_url(),
            'ajaxUrl'    => admin_url('admin-ajax.php'),
            'restUrl'    => esc_url_raw(rest_url('sedrazavi/v1/')),
            'themeUri'   => SEDRAZAVI_THEME_URI,
            'assetsUri'  => $asset_base_uri,
            'nonce'      => wp_create_nonce('wp_rest'),
            'isLoggedIn' => is_user_logged_in(),
            'siteTitle'  => get_bloginfo('name'),
            'siteDesc'   => get_bloginfo('description'),
        ));
    }
}
add_action('wp_enqueue_scripts', 'sedrazavi_enqueue_assets');
}

/**
 * منوی پیش‌فرض ناوبری در صورت عدم تعریف منو در پیشخوان وردپرس
 */
if (!function_exists('sedrazavi_fallback_menu')) {
function sedrazavi_fallback_menu() {
    ?>
    <nav class="hidden xl:flex items-center gap-1 font-medium text-xs text-gray-200">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="nav-link"><?php esc_html_e('صفحه اصلی', 'sedrazavi'); ?></a>
        <a href="#services" class="nav-link"><?php esc_html_e('خدمات تخصصی', 'sedrazavi'); ?></a>
        <a href="#articles" class="nav-link"><?php esc_html_e('آرشیو مقالات و ویدیوها', 'sedrazavi'); ?></a>
        <a href="#about" class="nav-link"><?php esc_html_e('درباره وکیل', 'sedrazavi'); ?></a>
        <a href="#tracking" class="nav-link text-[#D4AF37] font-bold"><?php esc_html_e('پیگیری پرونده', 'sedrazavi'); ?></a>
        <a href="#faq" class="nav-link"><?php esc_html_e('سوالات متداول', 'sedrazavi'); ?></a>
        <a href="#contact" class="nav-link"><?php esc_html_e('تماس با ما', 'sedrazavi'); ?></a>
    </nav>
    <?php
}
}


/**
 * 3. Safe Module Inclusions (Protected against Missing Files)
 */
$required_modules = array(
    'inc/setup.php',
    'inc/theme-options.php',
    'inc/security.php',
    'inc/ux-improvements.php',
    'inc/case-management.php',
    'inc/booking.php',
    'inc/dashboard.php',
    'inc/elementor-widgets.php',
    'inc/class-sedrazavi-updater.php',
    'inc/advanced-backup.php',
    'inc/analytics-reports.php',
    'inc/user-roles.php',
    'inc/educational-tour.php',
    'inc/integrations.php',
    'inc/arbitration-cpt.php',
    'inc/precedents-cpt.php',
    'inc/legal-vault-deadlines.php',
    'inc/corporate-international.php',
    'inc/class-sedrazavi-dashboard.php',
    'inc/class-sedrazavi-client-portal.php',
    'inc/class-sedrazavi-calculators.php',
    'inc/class-sedrazavi-elementor.php',
    'inc/class-sedrazavi-security.php',
    'inc/react-shortcodes.php',
    'inc/manifest-bridge.php',
    'inc/meta-boxes.php',
    'inc/rest-api.php',
    'inc/customizer-seo.php',
    'inc/seo-bridge.php',
    'includes/class-sedrazavi-auth-dual-mode.php',
    'includes/class-sedrazavi-dual-panel-unified.php',
    'includes/class-sedrazavi-admin-protection.php',
    'includes/class-sedrazavi-design-tokens.php',
    'includes/class-sedrazavi-elementor-widgets.php',
    'includes/class-sedrazavi-payment-adapter.php',
);

foreach ($required_modules as $mod) {
    $file_path = SEDRAZAVI_THEME_DIR . '/' . $mod;
    if (file_exists($file_path)) {
        require_once $file_path;
    }
}
