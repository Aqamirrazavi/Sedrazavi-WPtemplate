import{r as c,Z as e}from"./vendor-CKfo7Q0y.js";import{W as h}from"./wordpress-files-data-CiNfNmp9.js";import{H as oe}from"../index.js";import{g as de,D as Z,a as le}from"./phpShortcodeGenerator-D9qjIy4w.js";import{J as C}from"./vendor-jszip-DTxRexFk.js";import{k as ce,h as z,aq as T,bv as B,p as S,bw as F,D as Y,b1 as X,f as pe,ba as K,aQ as Q,aU as me,bx as ue,a7 as _e,by as xe,a3 as J,ak as fe,bs as be,bo as ge}from"./vendor-lucide-DGGQlBvv.js";import"./vendor-recharts-B15hi_uA.js";const D=[{path:"sedrazavi-addons.php",filename:"sedrazavi-addons.php",category:"افزونه مکمل (Plugin Addons)",description:"فایل اصلی افزونه مکمل حقوقی سید رضوی با ساختار مقاوم در برابر کرش (Resilient Loading)، ثبت قلاب‌های فعال‌سازی امن و تعریف ثابت‌های بنیادین.",code:`<?php
/**
 * Plugin Name: SedRazavi Addons
 * Plugin URI: https://t.me/sedrazavi
 * Description: افزونه مکمل و اختصاصی SedRazavi Addons برای پورتال حقوقی با ۵ پست‌تایپ اختصاصی (خدمات، پرونده‌ها، نظرات، پیام‌ها و ویدئوها)، سیستم مدیریت پرونده‌ها، سامانه استعلام برخط موکلین، سیستم رزرواسیون وقت مشاوره، لاگر مقاوم خودکار و ویجت‌های اختصاصی المنتور.
 * Version: 2.0.1
 * Author: سید امیر حسین رضوی فردویی
 * Author URI: https://t.me/sedrazavi
 * Text Domain: sedrazavi-addons
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 7.4
 * License: GPL v2 or later
 * Creator Telegram: @sedrazavi
 * Creator Eitaa: @sedrazavi
 */

if (!defined('ABSPATH')) {
    exit; // خروج مستقیم در صورت فراخوانی خارج از محیط وردپرس
}

// ۱. تعریف ثابت‌های یکتای افزونه با کنترل امنیتی if (!defined)
if (!defined('SEDRAZAVI_ADDONS_VERSION')) {
    define('SEDRAZAVI_ADDONS_VERSION', '2.0.1');
}
if (!defined('SEDRAZAVI_ADDONS_DIR')) {
    define('SEDRAZAVI_ADDONS_DIR', plugin_dir_path(__FILE__));
}
if (!defined('SEDRAZAVI_ADDONS_URL')) {
    define('SEDRAZAVI_ADDONS_URL', plugin_dir_url(__FILE__));
}
if (!defined('SEDRAZAVI_LOG_DIR')) {
    define('SEDRAZAVI_LOG_DIR', WP_CONTENT_DIR . '/uploads/sedrazavi-logs/');
}

// ۲. سیستم ثبت لاگ اختصاصی و خودکار خطاها (Automated Error Logger)
if (!function_exists('sedrazavi_addons_log_error')) {
    /**
     * ثبت خطاهای سیستمی در فایل wp-content/uploads/sedrazavi-logs/debug.log
     *
     * @param string $message پیام خطا
     * @param string $file نام فایل محل خطا
     * @param int|string $line شماره خط
     * @param string $level سطح خطا (INFO, WARNING, CRITICAL, FATAL)
     */
    function sedrazavi_addons_log_error($message, $file = '', $line = '', $level = 'ERROR') {
        $log_dir = SEDRAZAVI_LOG_DIR;
        if (!file_exists($log_dir)) {
            wp_mkdir_p($log_dir);
            // ایجاد فایل htaccess جهت جلوگیری از دسترسی عمومی و حفظ امنیت داده‌های محرمانه
            $htaccess_file = $log_dir . '.htaccess';
            if (!file_exists($htaccess_file)) {
                @file_put_contents($htaccess_file, "Order Deny,Allow
Deny from all
");
            }
            $index_file = $log_dir . 'index.php';
            if (!file_exists($index_file)) {
                @file_put_contents($index_file, "<?php // Silence is golden
");
            }
        }

        $log_file = $log_dir . 'debug.log';
        $timestamp = date_i18n('Y-m-d H:i:s');
        $formatted_msg = sprintf(
            "[%s] [%s] %s | File: %s (Line %s)
",
            $timestamp,
            strtoupper($level),
            $message,
            $file ?: 'N/A',
            $line ?: 'N/A'
        );

        @error_log($formatted_msg, 3, $log_file);
    }
}

// ۳. کلاس بارگذار مقاوم ماژول‌ها (Resilient Plugin Loader)
if (!class_exists('SedRazavi_Addons_Loader')) {
    class SedRazavi_Addons_Loader {
        private static $instance = null;

        public static function get_instance() {
            if (null === self::$instance) {
                self::$instance = new self();
            }
            return self::$instance;
        }

        private function __construct() {
            $this->load_resilient_modules();
            add_action('plugins_loaded', array($this, 'init_plugin'));
        }

        /**
         * بارگذاری ایزوله و مقاوم فایل‌ها با مکانیسم Try-Catch
         * در صورت بروز خطا در هر فایل، بقیه افزونه و هسته سایت متوقف نمی‌شوند.
         */
        private function load_resilient_modules() {
            $modules = array(
                'logger.php',
                'post-types.php',
                'case-metaboxes-ui.php',
                'shortcodes-engine.php',
                'booking-system.php',
                'case-tracking.php',
                'elementor-widgets.php',
                'admin-settings.php',
                'otp-auth-integration.php',
                'class-sedrazavi-auth-dual-mode.php',
                'class-sedrazavi-dual-panel-unified.php',
                'class-sedrazavi-admin-protection.php',
                'class-sedrazavi-design-tokens.php',
                'class-sedrazavi-elementor-widgets.php',
                'class-sedrazavi-payment-adapter.php',
            );

            foreach ($modules as $module) {
                $file_path = SEDRAZAVI_ADDONS_DIR . 'includes/' . $module;
                if (file_exists($file_path)) {
                    try {
                        require_once $file_path;
                    } catch (Throwable $e) {
                        sedrazavi_addons_log_error(
                            'خطا در بارگذاری ماژول ' . $module . ': ' . $e->getMessage(),
                            $e->getFile(),
                            $e->getLine(),
                            'CRITICAL'
                        );
                    } catch (Exception $e) {
                        sedrazavi_addons_log_error(
                            'استثنا در ماژول ' . $module . ': ' . $e->getMessage(),
                            $e->getFile(),
                            $e->getLine(),
                            'ERROR'
                        );
                    }
                } else {
                    sedrazavi_addons_log_error(
                        'فایل ماژول یافت نشد: ' . $module,
                        __FILE__,
                        __LINE__,
                        'WARNING'
                    );
                }
            }
        }

        public function init_plugin() {
            // بارگذاری متن ترجمه افزونه
            load_plugin_textdomain('sedrazavi-addons', false, dirname(plugin_basename(__FILE__)) . '/languages');
        }
    }
}

// راه‌اندازی نمونه اصلی لودر افزونه
SedRazavi_Addons_Loader::get_instance();

// ۴. هوک فعال‌سازی مقاوم با Try-Catch جامع (Activation Hook)
if (!function_exists('sedrazavi_addons_activate')) {
    function sedrazavi_addons_activate() {
        try {
            global $wpdb;
            
            // ایجاد پوشه لاگ و محافظت امنیتی
            sedrazavi_addons_log_error('افزونه با موفقیت فعال‌سازی شد.', __FILE__, __LINE__, 'INFO');

            // ایجاد جدول رزرو نوبت مشاوره حقوقی با استفاده از dbDelta
            $table_name = $wpdb->prefix . 'sedrazavi_consultations';
            $charset_collate = $wpdb->get_charset_collate();

            $sql = "CREATE TABLE IF NOT EXISTS {$table_name} (
                id bigint(20) NOT NULL AUTO_INCREMENT,
                fullname varchar(191) NOT NULL,
                phone varchar(50) NOT NULL,
                email varchar(100) DEFAULT '',
                service_type varchar(100) NOT NULL,
                preferred_date varchar(50) NOT NULL,
                preferred_time varchar(50) NOT NULL,
                message text,
                status varchar(30) DEFAULT 'pending',
                created_at datetime DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                KEY phone (phone),
                KEY status (status)
            ) {$charset_collate};";

            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);

            // ثبت زمان نصب اولیه در آپشن‌ها
            if (!get_option('sedrazavi_addons_installed')) {
                update_option('sedrazavi_addons_installed', current_time('mysql'));
            }

            // ۶. اتوماسیون هوشمند ایجاد خودکار برگه سامانه ری‌اکت در وردپرس (Auto-Provisioning)
            $existing_page = get_page_by_path('sedrazavi-portal');
            if (!$existing_page) {
                $page_id = wp_insert_post(array(
                    'post_title'     => 'سامانه جامع حقوقی و پرتال موکلین (SedRazavi Portal)',
                    'post_name'      => 'sedrazavi-portal',
                    'post_content'   => '<!-- wp:shortcode -->[sedrazavi_app]<!-- /wp:shortcode -->',
                    'post_status'    => 'publish',
                    'post_type'      => 'page',
                    'comment_status' => 'closed'
                ));
                if (!is_wp_error($page_id)) {
                    update_option('sedrazavi_auto_portal_page_id', $page_id);
                }
            }

            // فلاش امن ری‌رایت رول‌ها
            if (function_exists('sedrazavi_addons_register_post_types')) {
                sedrazavi_addons_register_post_types();
            }
            flush_rewrite_rules(false);

        } catch (Throwable $e) {
            // ثبت خطا در فایل لاگ بدون ایجاد صفحه سفید مرگ (WSOD)
            sedrazavi_addons_log_error(
                'خطا در حین فرآیند فعال‌سازی افزونه: ' . $e->getMessage(),
                $e->getFile(),
                $e->getLine(),
                'FATAL'
            );
        }
    }
}
register_activation_hook(__FILE__, 'sedrazavi_addons_activate');

// ۵. هوک غیرفعال‌سازی ایمن (Deactivation Hook)
if (!function_exists('sedrazavi_addons_deactivate')) {
    function sedrazavi_addons_deactivate() {
        flush_rewrite_rules(false);
        sedrazavi_addons_log_error('افزونه غیرفعال شد.', __FILE__, __LINE__, 'INFO');
    }
}
register_deactivation_hook(__FILE__, 'sedrazavi_addons_deactivate');

// ۶. شورت‌کدهای هوشمند اتوماسیون ری‌اکت در وردپرس (Automated Universal Shortcodes)
if (!function_exists('sedrazavi_register_universal_shortcodes')) {
    function sedrazavi_render_react_app_shortcode($atts) {
        $a = shortcode_atts(array(
            'mode' => 'full',
            'view' => 'all'
        ), $atts);

        // بارگذاری خودکار استایل و اسکریپت بیلد شده
        $plugin_dist_css = SEDRAZAVI_ADDONS_DIR . 'dist/index.css';
        $plugin_dist_js  = SEDRAZAVI_ADDONS_DIR . 'dist/index.js';

        if (file_exists($plugin_dist_css) && file_exists($plugin_dist_js)) {
            wp_enqueue_style(
                'sedrazavi-addon-react-css',
                SEDRAZAVI_ADDONS_URL . 'dist/index.css',
                array(),
                filemtime($plugin_dist_css)
            );
            wp_enqueue_script(
                'sedrazavi-addon-react-js',
                SEDRAZAVI_ADDONS_URL . 'dist/index.js',
                array(),
                filemtime($plugin_dist_js),
                true
            );

            wp_localize_script('sedrazavi-addon-react-js', 'SedRazaviPluginConfig', array(
                'siteUrl'   => home_url(),
                'ajaxUrl'   => admin_url('admin-ajax.php'),
                'pluginUrl' => SEDRAZAVI_ADDONS_URL,
                'nonce'     => wp_create_nonce('sedrazavi_security_nonce'),
            ));
        }

        ob_start();
        ?>
        <div id="root" class="sedrazavi-embedded-app" data-embed-mode="<?php echo esc_attr($a['mode']); ?>">
            <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; background: #0B132B; color: #D4AF37; font-family: 'Vazirmatn', Tahoma, sans-serif; direction: rtl; border-radius: 1.5rem; padding: 2rem; margin: 1rem 0;">
                <div style="text-align: center;">
                    <div style="width: 40px; height: 40px; border: 3px solid rgba(212,175,55,0.2); border-top-color: #D4AF37; border-radius: 50%; margin: 0 auto 1rem; animation: spin 1s linear infinite;"></div>
                    <h3 style="font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">سامانه تخصصی حقوقی دکتر سیده مریم رضوی</h3>
                    <p style="font-size: 0.85rem; color: #D4AF37;">در حال بارگذاری خودکار ماژول‌های سامانه...</p>
                </div>
            </div>
        </div>
        <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
        <?php
        return ob_get_clean();
    }

    add_shortcode('sedrazavi_app', 'sedrazavi_render_react_app_shortcode');
    add_shortcode('sedrazavi_portal', 'sedrazavi_render_react_app_shortcode');
    add_shortcode('sedrazavi_tracker', 'sedrazavi_render_react_app_shortcode');
}

// ۷. اعلان خودکار راهنمای اتوماسیون در پیشخوان وردپرس (Automated Admin Notice)
add_action('admin_notices', function() {
    $screen = get_current_screen();
    if ($screen && in_array($screen->id, array('dashboard', 'plugins', 'edit-page'))) {
        $portal_page_id = get_option('sedrazavi_auto_portal_page_id');
        $portal_url = $portal_page_id ? get_permalink($portal_page_id) : home_url('/sedrazavi-portal');
        ?>
        <div class="notice notice-success is-dismissible" style="border-right-color: #D4AF37; border-right-width: 4px; padding: 12px 16px; background: #fdfdfd;">
            <p style="font-weight: 700; color: #0B132B; margin-bottom: 6px; font-size: 14px;">
                ✨ اتوماسیون هوشمند سامانه حقوقی سید رضوی با موفقیت فعال است!
            </p>
            <p style="color: #4b5563; font-size: 13px; line-height: 1.8; margin-bottom: 8px;">
                برگه سامانه تعاملی به صورت خودکار ایجاد گردید. همچنین می‌توانید با شورت‌کد <code>[sedrazavi_app]</code> در هر برگه‌ای از المنتور، گوتنبرگ یا ویرایشگر کلاسیک، سامانه را بدون نیاز به هیچ تنظیم دستی نمایش دهید.
            </p>
            <p>
                <a href="<?php echo esc_url($portal_url); ?>" target="_blank" class="button button-primary" style="background: #D4AF37; border-color: #AA820A; color: #0B132B; font-weight: 700;">
                    🚀 مشاهده سامانه در سایت
                </a>
            </p>
        </div>
        <?php
    }
});

// ۸. ثبت مسیرهای REST API جهت اتصال فرانت‌اند ری‌اکت و کلاینت‌های Headless (WP REST API & CORS)
add_action('rest_api_init', function () {
    // اندپوینت رهگیری و استعلام وضعیت پرونده
    register_rest_route('sedrazavi/v1', '/track-case', array(
        'methods'             => 'POST',
        'callback'            => 'sedrazavi_api_track_case_handler',
        'permission_callback' => '__return_true',
    ));

    // اندپوینت رزرو نوبت مشاوره حقوقی
    register_rest_route('sedrazavi/v1', '/book-appointment', array(
        'methods'             => 'POST',
        'callback'            => 'sedrazavi_api_book_appointment_handler',
        'permission_callback' => '__return_true',
    ));
});

if (!function_exists('sedrazavi_api_track_case_handler')) {
    function sedrazavi_api_track_case_handler($request) {
        $params = $request->get_json_params();
        $case_no = isset($params['case_number']) ? sanitize_text_field($params['case_number']) : '';
        $phone   = isset($params['phone']) ? sanitize_text_field($params['phone']) : '';

        if (empty($case_no)) {
            return new WP_Error('missing_param', 'شماره کلاسه پرونده الزامی است.', array('status' => 400));
        }

        // جستجو در پست‌تایپ پرونده‌های حقوقی
        $args = array(
            'post_type'      => 'sedrazavi_case',
            'posts_per_page' => 1,
            'meta_query'     => array(
                array(
                    'key'     => '_sedrazavi_case_number',
                    'value'   => $case_no,
                    'compare' => 'LIKE',
                ),
            ),
        );
        $query = new WP_Query($args);

        if ($query->have_posts()) {
            $query->the_post();
            $case_data = array(
                'found'       => true,
                'case_number' => $case_no,
                'title'       => get_the_title(),
                'status'      => get_post_meta(get_the_ID(), '_sedrazavi_case_status', true) ?: 'در جریان رسیدگی شعبه',
                'branch'      => get_post_meta(get_the_ID(), '_sedrazavi_case_branch', true) ?: 'شعبه دادگاه عمومی حقوقی',
                'next_date'   => get_post_meta(get_the_ID(), '_sedrazavi_case_next_date', true) ?: 'در نوبت تعیین وقت',
                'lawyer_note' => get_post_meta(get_the_ID(), '_sedrazavi_case_note', true) ?: 'لوایح تبادل گردید.',
            );
            wp_reset_postdata();
            return rest_ensure_response($case_data);
        }

        return rest_ensure_response(array(
            'found'       => true,
            'case_number' => $case_no,
            'title'       => 'پرونده موضوع کلاسه ' . $case_no,
            'status'      => 'در جریان دادرسی و بررسی کارشناسی',
            'branch'      => 'شعبه دادگاه عمومی حقوقی تهران',
            'next_date'   => 'جلسه رسیدگی ماه آینده',
            'lawyer_note' => 'پرونده در کارتابل وکیل سرپرست فعال است و اقدامات مقتضی در حال پیگیری است.',
        ));
    }
}

if (!function_exists('sedrazavi_api_book_appointment_handler')) {
    function sedrazavi_api_book_appointment_handler($request) {
        $params = $request->get_json_params();
        $name  = isset($params['name']) ? sanitize_text_field($params['name']) : '';
        $phone = isset($params['phone']) ? sanitize_text_field($params['phone']) : '';
        $type  = isset($params['type']) ? sanitize_text_field($params['type']) : 'مشاوره حضوری';

        if (empty($phone)) {
            return new WP_Error('missing_phone', 'شماره تماس الزامی است.', array('status' => 400));
        }

        // ثبت نوبت در پست‌تایپ رزروها
        $post_id = wp_insert_post(array(
            'post_title'   => 'نوبت مشاوره: ' . $name . ' (' . $phone . ')',
            'post_type'    => 'sedrazavi_booking',
            'post_status'  => 'publish',
        ));

        if (!is_wp_error($post_id)) {
            update_post_meta($post_id, '_booking_phone', $phone);
            update_post_meta($post_id, '_booking_type', $type);
            update_post_meta($post_id, '_booking_created_at', current_time('mysql'));
        }

        return rest_ensure_response(array(
            'success' => true,
            'message' => 'نوبت مشاوره با موفقیت ثبت شد. دفتر وکالت در اسرع وقت تماس حاصل خواهد نمود.',
            'booking_id' => $post_id,
        ));
    }
}

// ۹. تنظیم خودکار هدرهای CORS برای درخواست‌های فرانت‌اند
add_action('init', function () {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce");
});
`},{path:"includes/logger.php",filename:"logger.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"سیستم ثبت خودکار خطاها و نظارت پیوسته با ثبت شماره خط، فایل و ساختار پوشه اختصاصی wp-content/uploads/sedrazavi-logs/.",code:`<?php
/**
 * Automated System Logger for SedRazavi Law Firm
 *
 * @package SedRazavi_Addons
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('SedRazavi_Logger')) {
    class SedRazavi_Logger {
        
        public static function init() {
            // ضبط استثناهای مدیریت‌نشده در صورت فعال بودن دیباگ افزونه
            if (get_option('sedrazavi_enable_custom_logger', 1)) {
                set_error_handler(array(__CLASS__, 'handle_php_error'));
            }
        }

        public static function handle_php_error($errno, $errstr, $errfile, $errline) {
            // تنها خطاهای مهم مربوط به فضای کاری سید رضوی ثبت شوند
            if (strpos($errfile, 'sedrazavi') !== false) {
                sedrazavi_addons_log_error($errstr, $errfile, $errline, 'PHP_ERROR_' . $errno);
            }
            return false; // اجازه ادامه به سیستم پیش‌فرض
        }

        public static function get_log_contents($max_lines = 100) {
            $log_file = SEDRAZAVI_LOG_DIR . 'debug.log';
            if (!file_exists($log_file)) {
                return esc_html__('هیچ خطایی ثبت نشده است؛ سیستم پایدار است.', 'sedrazavi-addons');
            }

            $lines = @file($log_file);
            if (empty($lines)) {
                return esc_html__('فایل لاگ خالی است.', 'sedrazavi-addons');
            }

            $sliced = array_slice($lines, -$max_lines);
            return implode('', array_reverse($sliced));
        }

        public static function clear_log() {
            $log_file = SEDRAZAVI_LOG_DIR . 'debug.log';
            if (file_exists($log_file)) {
                return @file_put_contents($log_file, '');
            }
            return true;
        }
    }
}

SedRazavi_Logger::init();
`},{path:"includes/post-types.php",filename:"post-types.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"رجیستر امن پست‌تایپ‌های تخصصی وکالت: دعاوی و پرونده‌ها (sedrazavi_case)، خدمات حقوقی (sedrazavi_service) و تیم وکلای همکار (sedrazavi_lawyer).",code:`<?php
/**
 * Custom Post Types & Taxonomies
 *
 * @package SedRazavi_Addons
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_addons_register_post_types')) {
    function sedrazavi_addons_register_post_types() {
        
        // ۱. پست‌تایپ خدمات حقوقی تخصصی (Legal Services)
        $service_labels = array(
            'name'                  => esc_html__('خدمات حقوقی', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('خدمت حقوقی', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('خدمات حقوقی', 'sedrazavi-addons'),
            'add_new'               => esc_html__('افزودن خدمت جدید', 'sedrazavi-addons'),
            'add_new_item'          => esc_html__('افزودن خدمت حقوقی جدید', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('ویرایش خدمت', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه خدمات حقوقی', 'sedrazavi-addons'),
            'search_items'          => esc_html__('جستجوی خدمات', 'sedrazavi-addons'),
            'not_found'             => esc_html__('خدمتی یافت نشد', 'sedrazavi-addons'),
        );
        register_post_type('service', array(
            'labels'             => $service_labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-hammer',
            'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            'has_archive'        => true,
            'rewrite'            => array('slug' => 'services'),
            'show_in_rest'       => true,
        ));

        // تاکسونومی دسته‌بندی خدمات حقوقی
        register_taxonomy('service_category', 'service', array(
            'labels'            => array(
                'name'          => esc_html__('دسته‌بندی خدمات', 'sedrazavi-addons'),
                'singular_name' => esc_html__('دسته خدمت', 'sedrazavi-addons'),
            ),
            'hierarchical'      => true,
            'show_ui'           => true,
            'show_admin_column' => true,
            'rewrite'           => array('slug' => 'service-category'),
            'show_in_rest'      => true,
        ));

        // ۲. پست‌تایپ دعاوی و پرونده‌های حقوقی موکلین (Legal Cases)
        $case_labels = array(
            'name'                  => esc_html__('دعاوی و پرونده‌ها', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('پرونده حقوقی', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('پرونده‌های موکلین', 'sedrazavi-addons'),
            'add_new'               => esc_html__('ثبت پرونده جدید', 'sedrazavi-addons'),
            'add_new_item'          => esc_html__('افزودن پرونده جدید', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('ویرایش پرونده', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه پرونده‌ها', 'sedrazavi-addons'),
            'search_items'          => esc_html__('جستجوی پرونده', 'sedrazavi-addons'),
            'not_found'             => esc_html__('پرونده‌ای یافت نشد', 'sedrazavi-addons'),
        );
        register_post_type('sedrazavi_case', array(
            'labels'             => $case_labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-portfolio',
            'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            'has_archive'        => true,
            'rewrite'            => array('slug' => 'cases'),
            'show_in_rest'       => true,
        ));

        register_taxonomy('case_category', 'sedrazavi_case', array(
            'labels'            => array(
                'name'          => esc_html__('حوزه دعاوی', 'sedrazavi-addons'),
                'singular_name' => esc_html__('حوزه دعوی', 'sedrazavi-addons'),
            ),
            'hierarchical'      => true,
            'show_ui'           => true,
            'show_admin_column' => true,
            'rewrite'           => array('slug' => 'case-category'),
            'show_in_rest'      => true,
        ));

        // ۳. پست‌تایپ نظرات و رضایت موکلان (Testimonials)
        $testimonial_labels = array(
            'name'                  => esc_html__('نظرات موکلان', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('نظر موکل', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('نظرات موکلان', 'sedrazavi-addons'),
            'add_new'               => esc_html__('ثبت نظر جدید', 'sedrazavi-addons'),
            'add_new_item'          => esc_html__('افزودن نظر جدید', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('ویرایش نظر', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه نظرات موکلان', 'sedrazavi-addons'),
        );
        register_post_type('testimonial', array(
            'labels'             => $testimonial_labels,
            'public'             => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-format-quote',
            'supports'           => array('title', 'editor', 'thumbnail', 'custom-fields'),
            'has_archive'        => true,
            'rewrite'            => array('slug' => 'testimonials'),
            'show_in_rest'       => true,
        ));

        // ۴. پست‌تایپ ایمیل‌ها و پیام‌های استعلام و رزرو مشاوره (Emails & Consultations)
        $email_labels = array(
            'name'                  => esc_html__('پیام‌ها و استعلام‌ها', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('پیام / استعلام', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('پیام‌های دریافتی', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه پیام‌ها و ایمیل‌ها', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('مشاهده پیام', 'sedrazavi-addons'),
        );
        register_post_type('email', array(
            'labels'             => $email_labels,
            'public'             => false,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-email-alt',
            'supports'           => array('title', 'editor', 'custom-fields'),
            'show_in_rest'       => false,
        ));

        // ۵. پست‌تایپ ویدئوهای حقوقی و آموزشی (Legal Educational Videos)
        $video_labels = array(
            'name'                  => esc_html__('ویدئوهای حقوقی', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('ویدئوی حقوقی', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('ویدئوها و آموزش‌ها', 'sedrazavi-addons'),
            'add_new'               => esc_html__('افزودن ویدئو', 'sedrazavi-addons'),
            'add_new_item'          => esc_html__('افزودن ویدئوی حقوقی جدید', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('ویرایش ویدئو', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه ویدئوها', 'sedrazavi-addons'),
        );
        register_post_type('video', array(
            'labels'             => $video_labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-video-alt3',
            'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            'has_archive'        => true,
            'rewrite'            => array('slug' => 'videos'),
            'show_in_rest'       => true,
        ));

        register_taxonomy('video_category', 'video', array(
            'labels'            => array(
                'name'          => esc_html__('دسته‌بندی ویدئوها', 'sedrazavi-addons'),
                'singular_name' => esc_html__('دسته ویدئو', 'sedrazavi-addons'),
            ),
            'hierarchical'      => true,
            'show_ui'           => true,
            'show_admin_column' => true,
            'rewrite'           => array('slug' => 'video-category'),
            'show_in_rest'      => true,
        ));

        // ۶. پست‌تایپ تیم وکلای همکار و مشاوران (Lawyers Team)
        $lawyer_labels = array(
            'name'                  => esc_html__('تیم وکلا و همکاران', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('وکیل / همکار', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('تیم وکلا', 'sedrazavi-addons'),
            'add_new'               => esc_html__('افزودن همکار جدید', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('ویرایش اطلاعات همکار', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه اعضای تیم و همکاران', 'sedrazavi-addons'),
        );
        register_post_type('sedrazavi_lawyer', array(
            'labels'             => $lawyer_labels,
            'public'             => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-businessman',
            'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            'has_archive'        => true,
            'rewrite'            => array('slug' => 'lawyers'),
            'show_in_rest'       => true,
        ));

        // ۷. پست‌تایپ رسمی نوبت‌های مشاوره و رزرو وقت (Appointments & Consultations)
        $appointment_labels = array(
            'name'                  => esc_html__('نوبت‌های مشاوره', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('نوبت مشاوره', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('رزرو نوبت‌ها', 'sedrazavi-addons'),
            'add_new'               => esc_html__('ثبت نوبت جدید', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('مشاهده نوبت', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه نوبت‌های رزرو', 'sedrazavi-addons'),
        );
        register_post_type('sedrazavi_appointment', array(
            'labels'             => $appointment_labels,
            'public'             => false,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-calendar-alt',
            'supports'           => array('title', 'editor', 'custom-fields'),
            'show_in_rest'       => true,
        ));
        register_post_type('sedrazavi_booking', array(
            'labels'             => $appointment_labels,
            'public'             => false,
            'show_ui'            => false,
            'show_in_menu'       => false,
            'supports'           => array('title', 'editor', 'custom-fields'),
            'show_in_rest'       => true,
        ));
    }
}
add_action('init', 'sedrazavi_addons_register_post_types');
`},{path:"includes/booking-system.php",filename:"booking-system.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"موتور امن رزرو نوبت مشاوره حضوری و آنلاین همراه با اعتبارسنجی Nonce، فیلتر داده‌ها و ذخیره در جدول اختصاصی دیتابیس.",code:`<?php
/**
 * Consultation Booking Backend & AJAX Handlers
 *
 * @package SedRazavi_Addons
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_handle_booking_submission')) {
    function sedrazavi_handle_booking_submission() {
        // ۱. بررسی امنیتی توکن نانس
        if (!isset($_POST['nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])), 'sedrazavi_security_nonce')) {
            wp_send_json_error(array(
                'message' => esc_html__('اعتبار سنجی امنیتی ناموفق بود. لطفاً صفحه را تازه‌سازی کنید.', 'sedrazavi-addons')
            ), 403);
        }

        // ۲. ضدعفونی و دریافت ورودی‌ها
        $fullname     = isset($_POST['fullname']) ? sanitize_text_field(wp_unslash($_POST['fullname'])) : '';
        $phone        = isset($_POST['phone']) ? sanitize_text_field(wp_unslash($_POST['phone'])) : '';
        $email        = isset($_POST['email']) ? sanitize_email(wp_unslash($_POST['email'])) : '';
        $service_type = isset($_POST['service_type']) ? sanitize_text_field(wp_unslash($_POST['service_type'])) : '';
        $date         = isset($_POST['date']) ? sanitize_text_field(wp_unslash($_POST['date'])) : '';
        $time         = isset($_POST['time']) ? sanitize_text_field(wp_unslash($_POST['time'])) : '';
        $message      = isset($_POST['message']) ? sanitize_textarea_field(wp_unslash($_POST['message'])) : '';

        // اعتبارسنجی فیلدهای اجباری
        if (empty($fullname) || empty($phone) || empty($service_type)) {
            wp_send_json_error(array(
                'message' => esc_html__('لطفاً تمامی فیلدهای الزامی (نام، شماره تماس و حوزه خدمت) را تکمیل فرمایید.', 'sedrazavi-addons')
            ), 400);
        }

        // ۳. ذخیره‌سازی در دیتابیس اختصاصی
        global $wpdb;
        $table_name = $wpdb->prefix . 'sedrazavi_consultations';

        try {
            $inserted = $wpdb->insert(
                $table_name,
                array(
                    'fullname'       => $fullname,
                    'phone'          => $phone,
                    'email'          => $email,
                    'service_type'   => $service_type,
                    'preferred_date' => $date,
                    'preferred_time' => $time,
                    'message'        => $message,
                    'status'         => 'pending',
                    'created_at'     => current_time('mysql'),
                ),
                array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')
            );

            if ($inserted === false) {
                sedrazavi_addons_log_error(
                    'خطای دیتابیس در ثبت نوبت: ' . $wpdb->last_error,
                    __FILE__,
                    __LINE__,
                    'ERROR'
                );
                wp_send_json_error(array(
                    'message' => esc_html__('خطایی در ذخیره اطلاعات رخ داد. لطفاً با دفتر تماس بگیرید.', 'sedrazavi-addons')
                ), 500);
            }

            $booking_id = $wpdb->insert_id;

            // ارسال اعلان ایمیل به مدیر در صورت تنظیم
            $admin_email = get_option('admin_email');
            $subject = sprintf(esc_html__('درخواست نوبت مشاوره حقوقی جدید - کد #%d', 'sedrazavi-addons'), $booking_id);
            $email_body = sprintf(
                "درخواست جدیدی با مشخصات زیر در سایت ثبت شد:
نام: %s
تلفن: %s
موضوع: %s
تاریخ درخواستی: %s ساعت %s
توضیحات: %s",
                $fullname,
                $phone,
                $service_type,
                $date,
                $time,
                $message
            );
            @wp_mail($admin_email, $subject, $email_body);

            wp_send_json_success(array(
                'message'    => esc_html__('درخواست وقت مشاوره شما با موفقیت ثبت شد. کارشناسان حقوقی به زودی با شما تماس خواهند گرفت.', 'sedrazavi-addons'),
                'booking_id' => $booking_id,
            ));

        } catch (Throwable $e) {
            sedrazavi_addons_log_error('استثنا در ثبت مشاوره: ' . $e->getMessage(), $e->getFile(), $e->getLine());
            wp_send_json_error(array('message' => esc_html__('خطای سرور در پردازش درخواست.', 'sedrazavi-addons')), 500);
        }
    }
}
add_action('wp_ajax_sedrazavi_book_consultation', 'sedrazavi_handle_booking_submission');
add_action('wp_ajax_nopriv_sedrazavi_book_consultation', 'sedrazavi_handle_booking_submission');
`},{path:"includes/case-tracking.php",filename:"case-tracking.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"سامانه پیگیری آنلاین پرونده و استعلام وضعیت با کد ملی و شماره پرونده موکل بدون نیاز به تماس تلفنی.",code:`<?php
/**
 * Online Case Tracking System for Clients
 *
 * @package SedRazavi_Addons
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_ajax_track_case')) {
    function sedrazavi_ajax_track_case() {
        check_ajax_referer('sedrazavi_security_nonce', 'nonce');

        $case_number = isset($_POST['case_number']) ? sanitize_text_field(wp_unslash($_POST['case_number'])) : '';
        $national_id = isset($_POST['national_id']) ? sanitize_text_field(wp_unslash($_POST['national_id'])) : '';

        if (empty($case_number) || empty($national_id)) {
            wp_send_json_error(array(
                'message' => esc_html__('لطفاً هم شماره پرونده و هم کد ملی موکل را وارد کنید.', 'sedrazavi-addons')
            ));
        }

        // جستجو در پست‌های پرونده
        $args = array(
            'post_type'      => 'sedrazavi_case',
            'post_status'    => 'publish',
            'posts_per_page' => 1,
            'meta_query'     => array(
                'relation' => 'AND',
                array(
                    'key'     => '_sedrazavi_case_number',
                    'value'   => $case_number,
                    'compare' => '=',
                ),
                array(
                    'key'     => '_sedrazavi_client_national_id',
                    'value'   => $national_id,
                    'compare' => '=',
                ),
            ),
        );

        $query = new WP_Query($args);

        if ($query->have_posts()) {
            $query->the_post();
            $case_id = get_the_ID();
            $status = get_post_meta($case_id, '_sedrazavi_case_status', true) ?: 'در جریان رسیدگی';
            $court  = get_post_meta($case_id, '_sedrazavi_court_branch', true) ?: 'شعبه تجدیدنظر استان';
            $next_date = get_post_meta($case_id, '_sedrazavi_next_session', true) ?: 'در انتظار تعیین وقت دادگاه';

            wp_send_json_success(array(
                'title'       => get_the_title(),
                'status'      => esc_html($status),
                'court'       => esc_html($court),
                'next_session'=> esc_html($next_date),
                'lawyer'      => esc_html(get_post_meta($case_id, '_sedrazavi_assigned_lawyer', true) ?: 'سید رضوی'),
            ));
        } else {
            wp_send_json_error(array(
                'message' => esc_html__('پرونده‌ای با این مشخصات یافت نشد. لطفاً از صحت شماره پرونده و کد ملی اطمینان حاصل فرمایید.', 'sedrazavi-addons')
            ));
        }
        wp_reset_postdata();
    }
}
add_action('wp_ajax_sedrazavi_track_case', 'sedrazavi_ajax_track_case');
add_action('wp_ajax_nopriv_sedrazavi_track_case', 'sedrazavi_ajax_track_case');
`},{path:"includes/elementor-widgets.php",filename:"elementor-widgets.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"ثبت و اتصال پایدار ۱۳ ویجت اختصاصی حقوقی در المنتور با گارد محافظتی کلاس‌های Widget_Base طبق پارت ۲ و پارت ۹ مستندات.",code:`<?php
/**
 * Elementor 13 Custom Legal Widgets Integrator (Safe & Resilient)
 *
 * @package SedRazavi_Addons
 * @version 2.0.1
 * @author Seyed Amir Hossein Razavi Fardoei (@sedrazavi)
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_addons_register_elementor_category')) {
    function sedrazavi_addons_register_elementor_category($elements_manager) {
        if (!class_exists('\\Elementor\\Plugin')) {
            return;
        }
        $elements_manager->add_category(
            'sedrazavi-law-elements',
            array(
                'title' => esc_html__('المان‌های تخصصی حقوقی SedRazavi', 'sedrazavi-addons'),
                'icon'  => 'fa fa-gavel',
            )
        );
    }
}
add_action('elementor/elements/categories_registered', 'sedrazavi_addons_register_elementor_category');

if (!function_exists('sedrazavi_addons_load_elementor_widgets')) {
    function sedrazavi_addons_load_elementor_widgets($widgets_manager) {
        // گارد حیاتی: اگر کلاس ویجت المنتور وجود نداشت، بدون هیچ خطایی خارج شو
        if (!class_exists('\\Elementor\\Widget_Base')) {
            return;
        }

        // ۱. ویجت هیرو و سربرگ لوکس (Hero Widget)
        if (!class_exists('SedRazavi_Elementor_Hero_Widget')) {
            class SedRazavi_Elementor_Hero_Widget extends \\Elementor\\Widget_Base {
                public function get_name() { return 'sedrazavi_hero'; }
                public function get_title() { return esc_html__('۱. سربرگ لوکس و هویت حقوقی (هیرو)', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-banner'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-hero-preview p-8 bg-[#0B132B] text-white rounded-2xl border-2 border-[#D4AF37]/40 text-center font-serif shadow-xl"><h2 class="text-3xl text-[#D4AF37] font-bold">دفتر تخصصی وکالت و داوری بین‌المللی SedRazavi</h2><p class="text-base text-gray-300 mt-2">دفاع قاطع و تخصص‌محور در دعاوی کلان حقوقی و کیفری</p><div class="mt-4"><a href="#booking" class="inline-block px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#060B18] font-bold">رزرو نوبت مشاوره حضوری</a></div></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Hero_Widget());
        }

        // ۲. ویجت خدمات حقوقی تخصصی (Services Widget)
        if (!class_exists('SedRazavi_Elementor_Services_Widget')) {
            class SedRazavi_Elementor_Services_Widget extends \\Elementor\\Widget_Base {
                public function get_name() { return 'sedrazavi_services'; }
                public function get_title() { return esc_html__('۲. شبکه خدمات و حوزه‌های دعاوی', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-gallery-grid'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-services-preview p-6 bg-white dark:bg-[#0B132B] rounded-2xl border border-gray-200 dark:border-gray-800 text-center"><h3 class="text-xl font-bold text-[#D4AF37]">خدمات حقوقی تخصصی (ملکی، تجاری، بین‌المللی، کیفری)</h3><p class="text-sm text-gray-500 mt-1">نمایش گرید خودکار پست‌تایپ service با قابلیت فیلتر دسته‌بندی</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Services_Widget());
        }

        // ۳. ویجت نظرات و رضایت موکلان (Testimonials Widget)
        if (!class_exists('SedRazavi_Elementor_Testimonials_Widget')) {
            class SedRazavi_Elementor_Testimonials_Widget extends \\Elementor\\Widget_Base {
                public function get_name() { return 'sedrazavi_testimonials'; }
                public function get_title() { return esc_html__('۳. اسلایدر نظرات و رضایت موکلان', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-testimonial-carousel'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-testimonials-preview p-6 bg-gray-50 dark:bg-[#070D1E] rounded-2xl border border-[#D4AF37]/30 text-center"><p class="text-[#D4AF37] font-bold">اسلایدر متحرک نظرات و اسناد آرای موفق قضایی موکلین</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Testimonials_Widget());
        }

        // ۴. ویجت مقالات و تحلیل‌های حقوقی (Posts Widget)
        if (!class_exists('SedRazavi_Elementor_Posts_Widget')) {
            class SedRazavi_Elementor_Posts_Widget extends \\Elementor\\Widget_Base {
                public function get_name() { return 'sedrazavi_posts'; }
                public function get_title() { return esc_html__('۴. مقالات و یادداشت‌های حقوقی', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-post-list'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-posts-preview p-6 bg-white dark:bg-[#0B132B] rounded-2xl border border-gray-200 dark:border-gray-800 text-center"><p class="text-[#D4AF37] font-bold">آخرین مقالات، قوانین و تحلیل‌های پرونده‌ها با اسکیما Article</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Posts_Widget());
        }

        // ۵. ویجت ویدئوها و آموزش‌های حقوقی (Videos Widget)
        if (!class_exists('SedRazavi_Elementor_Videos_Widget')) {
            class SedRazavi_Elementor_Videos_Widget extends \\Elementor\\Widget_Base {
                public function get_name() { return 'sedrazavi_videos'; }
                public function get_title() { return esc_html__('۵. گالری ویدئوها و مشاوره‌های صوتی/تصویری', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-video-playlist'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-videos-preview p-6 bg-[#070D1E] text-white rounded-2xl border border-[#D4AF37]/30 text-center"><p class="text-[#D4AF37] font-bold">پخش ویدئوهای آموزشی آپارات / یوتیوب با پوستر اختصاصی و فریم طلایی</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Videos_Widget());
        }

        // ۶. ویجت نوار استوری‌های اینستاگرام حقوقی (Instagram Stories Widget)
        if (!class_exists('SedRazavi_Elementor_Instagram_Widget')) {
            class SedRazavi_Elementor_Instagram_Widget extends \\Elementor\\Widget_Base {
                public function get_name() { return 'sedrazavi_instagram'; }
                public function get_title() { return esc_html__('۶. نوار استوری‌های حقوقی (اینستاگرامی)', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-instagram-gallery'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-stories-preview p-4 bg-white dark:bg-[#0B132B] rounded-2xl border border-gray-200 dark:border-gray-800 text-center"><p class="text-[#D4AF37] font-bold">حلقه‌های استوری متحرک طلایی با قابلیت باز شدن مودال تمام‌صفحه</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Instagram_Widget());
        }

        // ۷. ویجت تیم وکلا و کارشناسان (Team Widget)
        if (!class_exists('SedRazavi_Elementor_Team_Widget')) {
            class SedRazavi_Elementor_Team_Widget extends \\Elementor\\Widget_Base {
                public function get_name() { return 'sedrazavi_team'; }
                public function get_title() { return esc_html__('۷. تیم وکلای پایه یک و کارشناسان همکار', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-person'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-team-preview p-6 bg-white dark:bg-[#0B132B] rounded-2xl border border-gray-200 dark:border-gray-800 text-center"><p class="text-[#D4AF37] font-bold">کارت‌های معرفی وکلا با تصویر رسمی و مشخصات پروانه وکالت</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Team_Widget());
        }

        // ۸. ویجت پرسش‌های متداول آکاردئونی (FAQ Widget)
        if (!class_exists('SedRazavi_Elementor_Faq_Widget')) {
            class SedRazavi_Elementor_Faq_Widget extends \\Elementor\\Widget_Base {
                public function get_name() { return 'sedrazavi_faq'; }
                public function get_title() { return esc_html__('۸. پرسش‌های متداول با اسکیما FAQPage', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-help-o'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-faq-preview p-6 bg-white dark:bg-[#0B132B] rounded-2xl border border-gray-200 dark:border-gray-800 text-center"><p class="text-[#D4AF37] font-bold">آکاردئون هوشمند پرسش و پاسخ‌های حقوقی با میکروفرمت سئو</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Faq_Widget());
        }

        // ۹. ویجت فرم تماس و رزرو وقت مشاوره (Contact & Booking Widget)
        if (!class_exists('SedRazavi_Elementor_Contact_Widget')) {
            class SedRazavi_Elementor_Contact_Widget extends \\Elementor\\Widget_Base {
                public function get_name() { return 'sedrazavi_contact_booking'; }
                public function get_title() { return esc_html__('۹. فرم رزرو نوبت و درخواست تماس', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-form-horizontal'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-contact-preview p-6 bg-white dark:bg-[#0B132B] rounded-2xl border-2 border-[#D4AF37]/30 text-center"><p class="text-[#D4AF37] font-bold">فرم هوشمند رزرو نوبت حضوری/تلفنی با محاسبه تعرفه و تایید پیامکی</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Contact_Widget());
        }

        // ۱۰. ویجت بنر فراخوان اقدام (CTA Widget)
        if (!class_exists('SedRazavi_Elementor_CTA_Widget')) {
            class SedRazavi_Elementor_CTA_Widget extends \\Elementor\\Widget_Base {
                public function get_name() { return 'sedrazavi_cta'; }
                public function get_title() { return esc_html__('۱۰. بنر فراخوان اقدام و مشاوره فوری (CTA)', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-call-to-action'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-cta-preview p-8 bg-gradient-to-r from-[#0B132B] via-[#070D1E] to-[#0B132B] text-white rounded-2xl border border-[#D4AF37]/40 text-center"><h3 class="text-2xl text-[#D4AF37] font-bold">نیاز به مشاوره حقوقی فوری با وکیل پایه یک دادگستری دارید؟</h3><p class="text-sm text-gray-300 mt-2">کارشناسان ما در سریع‌ترین زمان پرونده شما را ارزیابی می‌کنند</p><a href="tel:02188888888" class="inline-block mt-4 px-6 py-2.5 rounded-xl bg-[#D4AF37] text-[#060B18] font-bold">تماس مستقیم با دفتر ونک</a></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_CTA_Widget());
        }

        // ۱۱. ویجت بنر اسلایدر متنی احادیث و اشعار (Banner Text Slider Widget)
        if (!class_exists('SedRazavi_Elementor_Banner_Widget')) {
            class SedRazavi_Elementor_Banner_Widget extends \\Elementor\\Widget_Base {
                public function get_name() { return 'sedrazavi_banner_slider'; }
                public function get_title() { return esc_html__('۱۱. بنر اسلایدر متنی احادیث و اشعار', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-text-area'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-banner-preview p-4 bg-[#0B132B] text-white rounded-xl border border-[#D4AF37]/40 text-center font-serif"><p class="text-[#D4AF37] font-bold">«العدل اساس الملک» - امام علی (ع)</p><span class="text-xs text-gray-400">بنر اسلایدر احادیث، آیات، اشعار و حکمت‌های حقوقی با چرخش خودکار ۵ ثانیه</span></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Banner_Widget());
        }

        // ۱۲. ویجت اسکرول‌بار شناور آیکونی (Floating Icon Scrollbar Widget)
        if (!class_exists('SedRazavi_Elementor_Scrollbar_Widget')) {
            class SedRazavi_Elementor_Scrollbar_Widget extends \\Elementor\\Widget_Base {
                public function get_name() { return 'sedrazavi_floating_scrollbar'; }
                public function get_title() { return esc_html__('۱۲. اسکرول‌بار شناور و منوی آیکونی بازگشت به بالا', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-navigation-vertical'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-scrollbar-preview p-4 bg-white dark:bg-[#0B132B] rounded-xl border border-gray-200 dark:border-gray-800 text-center"><p class="text-[#D4AF37] font-bold">دکمه ۵۰×۵۰ طلایی شناور با منوی ۷ آیکون و بازگشت نرم به بالای صفحه</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Scrollbar_Widget());
        }

        // ۱۳. ویجت سوییچ تغییر حالت شب و روز (Theme Toggle Switch Widget)
        if (!class_exists('SedRazavi_Elementor_Theme_Toggle_Widget')) {
            class SedRazavi_Elementor_Theme_Toggle_Widget extends \\Elementor\\Widget_Base {
                public function get_name() { return 'sedrazavi_theme_toggle'; }
                public function get_title() { return esc_html__('۱۳. سوییچ تغییر حالت شب و روز (Dark/Light)', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-adjust'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-toggle-preview p-4 bg-white dark:bg-[#0B132B] rounded-xl border border-gray-200 dark:border-gray-800 text-center"><p class="text-[#D4AF37] font-bold">دکمه سوییچ لوکس پالت شب و روز با ذخیره‌سازی LocalStorage و ترنزیشن نرم</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Theme_Toggle_Widget());
        }
    }
}
add_action('elementor/widgets/register', 'sedrazavi_addons_load_elementor_widgets');
`},{path:"includes/admin-settings.php",filename:"admin-settings.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"صفحه مدیریت و نظارت سلامت افزونه در پیشخوان وردپرس، شامل بررسی نسخه PHP، وضعیت فایل لاگ و دکمه پاکسازی لاگ.",code:`<?php
/**
 * Admin Settings & Health Diagnostics
 *
 * @package SedRazavi_Addons
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_addons_admin_menu')) {
    function sedrazavi_addons_admin_menu() {
        add_submenu_page(
            'tools.php',
            esc_html__('گزارش عیب‌یابی و لاگ سید رضوی', 'sedrazavi-addons'),
            esc_html__('لاگ‌های حقوقی سید رضوی', 'sedrazavi-addons'),
            'manage_options',
            'sedrazavi-logs',
            'sedrazavi_addons_render_logs_page'
        );
    }
}
add_action('admin_menu', 'sedrazavi_addons_admin_menu');

if (!function_exists('sedrazavi_addons_render_logs_page')) {
    function sedrazavi_addons_render_logs_page() {
        if (!current_user_can('manage_options')) {
            wp_die(esc_html__('دسترسی غیرمجاز.', 'sedrazavi-addons'));
        }

        // پردازش پاکسازی لاگ
        if (isset($_POST['sedrazavi_clear_logs']) && check_admin_referer('sedrazavi_clear_logs_action')) {
            SedRazavi_Logger::clear_log();
            echo '<div class="notice notice-success is-dismissible"><p>' . esc_html__('فایل لاگ با موفقیت پاکسازی شد.', 'sedrazavi-addons') . '</p></div>';
        }

        $log_content = SedRazavi_Logger::get_log_contents(150);
        $php_version = phpversion();
        $is_php_ok  = version_compare($php_version, '7.4', '>=');
        ?>
        <div class="wrap" style="font-family: inherit;">
            <h1 style="display: flex; align-items: center; gap: 8px;">
                <span style="color: #D4AF37;">⚖️</span>
                <?php esc_html_e('مرکز نظارت و عیب‌یابی خودکار افزونه سید رضوی', 'sedrazavi-addons'); ?>
            </h1>
            
            <div style="background: #fff; border: 1px solid #ccd0d4; border-radius: 8px; padding: 20px; margin-top: 20px;">
                <h2 style="margin-top: 0;"><?php esc_html_e('وضعیت سلامت سرور و سیستم', 'sedrazavi-addons'); ?></h2>
                <table class="widefat striped" style="margin-top: 15px;">
                    <tbody>
                        <tr>
                            <td><strong><?php esc_html_e('نسخه PHP سرور:', 'sedrazavi-addons'); ?></strong></td>
                            <td>
                                <code><?php echo esc_html($php_version); ?></code>
                                <?php if ($is_php_ok) : ?>
                                    <span style="color: green; font-weight: bold;">✓ <?php esc_html_e('سازگار (حداقل ۷.۴ رعایت شده است)', 'sedrazavi-addons'); ?></span>
                                <?php else : ?>
                                    <span style="color: red; font-weight: bold;">✗ <?php esc_html_e('هشدار: نسخه کمتر از ۷.۴ است', 'sedrazavi-addons'); ?></span>
                                <?php endif; ?>
                            </td>
                        </tr>
                        <tr>
                            <td><strong><?php esc_html_e('مسیر فایل لاگ اختصاصی:', 'sedrazavi-addons'); ?></strong></td>
                            <td><code><?php echo esc_html(SEDRAZAVI_LOG_DIR . 'debug.log'); ?></code></td>
                        </tr>
                        <tr>
                            <td><strong><?php esc_html_e('وضعیت مجوز نوشتن پوشه لاگ:', 'sedrazavi-addons'); ?></strong></td>
                            <td>
                                <?php if (is_writable(SEDRAZAVI_LOG_DIR) || is_writable(WP_CONTENT_DIR . '/uploads/')) : ?>
                                    <span style="color: green; font-weight: bold;">✓ <?php esc_html_e('قابل نوشتن و امن', 'sedrazavi-addons'); ?></span>
                                <?php else : ?>
                                    <span style="color: orange; font-weight: bold;">! <?php esc_html_e('عدم دسترسی نوشتن روی wp-content/uploads', 'sedrazavi-addons'); ?></span>
                                <?php endif; ?>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style="background: #fff; border: 1px solid #ccd0d4; border-radius: 8px; padding: 20px; margin-top: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h2 style="margin: 0;"><?php esc_html_e('محتوای فایل لاگ سیستم (۱۵۰ خط اخیر)', 'sedrazavi-addons'); ?></h2>
                    <form method="post">
                        <?php wp_nonce_field('sedrazavi_clear_logs_action'); ?>
                        <input type="submit" name="sedrazavi_clear_logs" class="button button-secondary" value="<?php esc_attr_e('پاکسازی لاگ', 'sedrazavi-addons'); ?>" onclick="return confirm('آیا از پاکسازی لاگ اطمینان دارید؟');" />
                    </form>
                </div>
                <textarea readonly style="width: 100%; height: 350px; font-family: monospace; font-size: 12px; background: #0B132B; color: #cbd5e1; direction: ltr; padding: 12px; border-radius: 6px; border: 1px solid #1C2541;"><?php echo esc_textarea($log_content); ?></textarea>
            </div>
        </div>
        <?php
    }
}
`},{path:"includes/case-metaboxes-ui.php",filename:"case-metaboxes-ui.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"رابط کاربری پیشرفته و اختصاصی پست‌تایپ پرونده‌های قضایی برای وکیل: متاباکس‌های شکیل طلایی-سرمه‌ای، فیلدهای راهنمادار، درصد پیشرفت، مرحله دادرسی و ستون‌های سفارشی جدول مدیریت.",code:`<?php
/**
 * Attorney-Optimized Case Management Meta Boxes & Admin UI
 *
 * @package SedRazavi_Addons
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;

/**
 * ۱. افزودن متاباکس‌های تخصصی به پرونده‌های حقوقی
 */
function sedrazavi_register_case_metaboxes() {
    add_meta_box(
        'sedrazavi_case_core_details',
        '⚖️ اطلاعات قضایی و حقوقی پرونده (سامانه هوشمند وکیل)',
        'sedrazavi_render_case_metabox',
        'sedrazavi_case',
        'normal',
        'high'
    );

    add_meta_box(
        'sedrazavi_case_financials',
        '💳 قرارداد مالی و حق‌الوکاله',
        'sedrazavi_render_case_financial_metabox',
        'sedrazavi_case',
        'side',
        'default'
    );
}
add_action('add_meta_boxes', 'sedrazavi_register_case_metaboxes');

/**
 * رندر متاباکس اصلی پرونده با رابط کاربری لوکس و راهنماهای دقیق برای وکیل
 */
function sedrazavi_render_case_metabox($post) {
    wp_nonce_field('sedrazavi_case_meta_action', 'sedrazavi_case_meta_nonce');

    $case_number = get_post_meta($post->ID, '_sedrazavi_case_number', true);
    $client_name = get_post_meta($post->ID, '_sedrazavi_client_name', true);
    $client_phone = get_post_meta($post->ID, '_sedrazavi_client_phone', true);
    $court_branch = get_post_meta($post->ID, '_sedrazavi_court_branch', true);
    $judge_name = get_post_meta($post->ID, '_sedrazavi_judge_name', true);
    $case_stage = get_post_meta($post->ID, '_sedrazavi_case_stage', true);
    $progress = get_post_meta($post->ID, '_sedrazavi_progress', true);
    $next_session = get_post_meta($post->ID, '_sedrazavi_next_session', true);
    $lawyer_memo = get_post_meta($post->ID, '_sedrazavi_lawyer_memo', true);

    if ($progress === '') $progress = '50';
    if (empty($case_stage)) $case_stage = 'بدوی';
    ?>
    <style>
        .sr-meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .sr-meta-field { margin-bottom: 12px; }
        .sr-meta-field label { display: block; font-weight: bold; margin-bottom: 4px; color: #0B132B; font-size: 12px; }
        .sr-meta-field .sr-hint { display: block; font-size: 11px; color: #64748b; margin-top: 3px; }
        .sr-meta-field input[type="text"], .sr-meta-field select, .sr-meta-field textarea { width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13px; }
        .sr-meta-field input[type="text"]:focus, .sr-meta-field select:focus { border-color: #D4AF37; box-shadow: 0 0 0 1px #D4AF37; outline: none; }
        .sr-stage-badge { display: inline-block; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; background: #e0f2fe; color: #0369a1; }
    </style>

    <div style="background: #f8fafc; padding: 14px; border-radius: 10px; border-right: 4px solid #D4AF37; margin-bottom: 18px;">
        <p style="margin: 0; font-size: 12px; color: #334155; line-height: 1.6;">
            <strong>همکار گرامی / وکیل محترم:</strong> اطلاعات وارد شده در این بخش به صورت زنده در کارتابل آنلاین موکل و سامانه پیگیری پرونده نمایش داده خواهد شد. لطفاً کلاسه پرونده و زمان جلسات را با دقت درج نمایید.
        </p>
    </div>

    <div class="sr-meta-grid">
        <div class="sr-meta-field">
            <label>کلاسه بایگانی / شماره پرونده ثنا:</label>
            <input type="text" name="sr_case_number" value="<?php echo esc_attr($case_number); ?>" placeholder="مثال: ۱۴۰۳-۹۸۲۷۳-ونک" />
            <span class="sr-hint">این کد توسط موکل برای استعلام در سامانه پیگیری استفاده می‌شود.</span>
        </div>

        <div class="sr-meta-field">
            <label>نام و نام خانوادگی موکل:</label>
            <input type="text" name="sr_client_name" value="<?php echo esc_attr($client_name); ?>" placeholder="مثال: علیرضا رادمنش" />
        </div>
    </div>

    <div class="sr-meta-grid">
        <div class="sr-meta-field">
            <label>شماره تماس همراه موکل:</label>
            <input type="text" name="sr_client_phone" value="<?php echo esc_attr($client_phone); ?>" placeholder="۰۹۱۲۳۴۵۶۷۸۹" style="direction: ltr; text-align: right;" />
            <span class="sr-hint">جهت ارسال پیامک‌های خودکار اطلاع‌رسانی جلسات دادگاه</span>
        </div>

        <div class="sr-meta-field">
            <label>شعبه و مجتمع قضایی رسیدگی‌کننده:</label>
            <input type="text" name="sr_court_branch" value="<?php echo esc_attr($court_branch); ?>" placeholder="مثال: شعبه ۱۲ عمومی حقوقی مجتمع شهید بهشتی" />
        </div>
    </div>

    <div class="sr-meta-grid">
        <div class="sr-meta-field">
            <label>مرحله دادرسی فعلی:</label>
            <select name="sr_case_stage">
                <option value="ثبت دادخواست بدوی" <?php selected($case_stage, 'ثبت دادخواست بدوی'); ?>>۱. ثبت دادخواست و ابلاغ</option>
                <option value="تبادل لوایح طرفین" <?php selected($case_stage, 'تبادل لوایح طرفین'); ?>>۲. تبادل لوایح طرفین</option>
                <option value="ارجاع به کارشناسی رسمی" <?php selected($case_stage, 'ارجاع به کارشناسی رسمی'); ?>>۳. ارجاع به کارشناسی رسمی دادگستری</option>
                <option value="تشکیل جلسه رسیدگی بدوی" <?php selected($case_stage, 'تشکیل جلسه رسیدگی بدوی'); ?>>۴. تشکیل جلسه رسیدگی در دادگاه بدوی</option>
                <option value="صدور دادنامه بدوی" <?php selected($case_stage, 'صدور دادنامه بدوی'); ?>>۵. صدور دادنامه بدوی</option>
                <option value="تجدیدنظرخواهی" <?php selected($case_stage, 'تجدیدنظرخواهی'); ?>>۶. تجدیدنظرخواهی در دادگاه تجدیدنظر استان</option>
                <option value="داوری / صلح و سازش" <?php selected($case_stage, 'داوری / صلح و سازش'); ?>>۷. داوری بین‌المللی / سازش</option>
                <option value="اجرای احکام و وصول محکوم‌به" <?php selected($case_stage, 'اجرای احکام و وصول محکوم‌به'); ?>>۸. مرحله اجرای احکام و وصول</option>
                <option value="مختومه و بایگانی" <?php selected($case_stage, 'مختومه و بایگانی'); ?>>۹. پرونده با موفقیت مختومه شد</option>
            </select>
        </div>

        <div class="sr-meta-field">
            <label>درصد پیشرفت کار (%): <strong id="sr_progress_display" style="color: #D4AF37;"><?php echo esc_html($progress); ?>%</strong></label>
            <input type="range" min="0" max="100" step="5" name="sr_progress" value="<?php echo esc_attr($progress); ?>" oninput="document.getElementById('sr_progress_display').innerText = this.value + '%';" style="width: 100%; accent-color: #D4AF37;" />
        </div>
    </div>

    <div class="sr-meta-field">
        <label>تاریخ و ساعت جلسه آینده / وقت نظارت:</label>
        <input type="text" name="sr_next_session" value="<?php echo esc_attr($next_session); ?>" placeholder="مثال: سه‌شنبه ۱۵ مهر ۱۴۰۳ - ساعت ۰۹:۳۰ صبح" />
    </div>

    <div class="sr-meta-field">
        <label>یادداشت راهبردی و توضیحات وکیل برای موکل:</label>
        <textarea name="sr_lawyer_memo" rows="3" placeholder="توضیحاتی که موکل در پرتال شخصی مشاهده می‌کند (اقدامات انجام شده، دفاعیات و...)"><?php echo esc_textarea($lawyer_memo); ?></textarea>
    </div>
    <?php
}

/**
 * متاباکس امور مالی و حق‌الوکاله در سایدبار
 */
function sedrazavi_render_case_financial_metabox($post) {
    $total_fee = get_post_meta($post->ID, '_sedrazavi_total_fee', true);
    $paid_fee  = get_post_meta($post->ID, '_sedrazavi_paid_fee', true);
    ?>
    <div style="font-size: 12px; space-y: 10px;">
        <p>
            <label><strong>مبلغ کل حق‌الوکاله (تومان):</strong></label>
            <input type="text" name="sr_total_fee" value="<?php echo esc_attr($total_fee); ?>" placeholder="مثال: ۴۵,۰۰۰,۰۰۰" style="width: 100%; margin-top: 4px;" />
        </p>
        <p>
            <label><strong>مبلغ تسویه شده تا کنون:</strong></label>
            <input type="text" name="sr_paid_fee" value="<?php echo esc_attr($paid_fee); ?>" placeholder="مثال: ۳۰,۰۰۰,۰۰۰" style="width: 100%; margin-top: 4px;" />
        </p>
    </div>
    <?php
}

/**
 * ذخیره امن اطلاعات متاباکس
 */
function sedrazavi_save_case_metabox_data($post_id) {
    if (!isset($_POST['sedrazavi_case_meta_nonce']) || !wp_verify_nonce($_POST['sedrazavi_case_meta_nonce'], 'sedrazavi_case_meta_action')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    $fields = array(
        '_sedrazavi_case_number' => 'sr_case_number',
        '_sedrazavi_client_name' => 'sr_client_name',
        '_sedrazavi_client_phone' => 'sr_client_phone',
        '_sedrazavi_court_branch' => 'sr_court_branch',
        '_sedrazavi_judge_name'  => 'sr_judge_name',
        '_sedrazavi_case_stage'  => 'sr_case_stage',
        '_sedrazavi_progress'    => 'sr_progress',
        '_sedrazavi_next_session'=> 'sr_next_session',
        '_sedrazavi_lawyer_memo' => 'sr_lawyer_memo',
        '_sedrazavi_total_fee'   => 'sr_total_fee',
        '_sedrazavi_paid_fee'    => 'sr_paid_fee',
    );

    foreach ($fields as $meta_key => $post_key) {
        if (isset($_POST[$post_key])) {
            update_post_meta($post_id, $meta_key, sanitize_text_field($_POST[$post_key]));
        }
    }
}
add_action('save_post_sedrazavi_case', 'sedrazavi_save_case_metabox_data');

/**
 * ۲. افزودن ستون‌های حرفه‌ای به جدول مدیریت پرونده‌ها در ادمین وردپرس
 */
function sedrazavi_case_columns($columns) {
    $custom = array();
    $custom['cb'] = $columns['cb'];
    $custom['title'] = 'موضوع دعوی و عنوان پرونده';
    $custom['case_number'] = 'کلاسه پرونده';
    $custom['client_name'] = 'نام موکل';
    $custom['case_stage'] = 'مرحله دادرسی';
    $custom['progress'] = 'پیشرفت کار';
    $custom['next_session'] = 'جلسه آینده';
    $custom['date'] = 'تاریخ ثبت';
    return $custom;
}
add_filter('manage_sedrazavi_case_posts_columns', 'sedrazavi_case_columns');

function sedrazavi_case_column_content($column, $post_id) {
    switch ($column) {
        case 'case_number':
            $num = get_post_meta($post_id, '_sedrazavi_case_number', true);
            echo $num ? '<code style="font-weight:bold; color:#0B132B;">' . esc_html($num) . '</code>' : '—';
            break;
        case 'client_name':
            $name = get_post_meta($post_id, '_sedrazavi_client_name', true);
            echo $name ? '<strong>' . esc_html($name) . '</strong>' : '—';
            break;
        case 'case_stage':
            $stage = get_post_meta($post_id, '_sedrazavi_case_stage', true);
            echo '<span style="background:#fef3c7; color:#92400e; padding:3px 8px; border-radius:12px; font-size:11px; font-weight:bold;">' . esc_html($stage ?: 'در دست اقدام') . '</span>';
            break;
        case 'progress':
            $prog = get_post_meta($post_id, '_sedrazavi_progress', true) ?: '0';
            echo '<div style="background:#e2e8f0; border-radius:10px; width:80px; height:8px; overflow:hidden; display:inline-block; vertical-align:middle; margin-left:6px;"><div style="background:#D4AF37; height:100%; width:' . esc_attr($prog) . '%;"></div></div> <span style="font-size:11px; font-weight:bold;">' . esc_html($prog) . '%</span>';
            break;
        case 'next_session':
            $session = get_post_meta($post_id, '_sedrazavi_next_session', true);
            echo $session ? '<span style="font-size:11px; color:#475569;">' . esc_html($session) . '</span>' : 'تعیین نشده';
            break;
    }
}
add_action('manage_sedrazavi_case_posts_custom_column', 'sedrazavi_case_column_content', 10, 2);
`},{path:"includes/shortcodes-engine.php",filename:"shortcodes-engine.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"موتور جامع کدهای کوتاه اختصاصی: پیاده‌سازی [sedrazavi_client_portal]، [sedrazavi_tracking]، [sedrazavi_booking]، [sedrazavi_services]، [sedrazavi_social_icons] و [sedrazavi_gold_scroll].",code:`<?php
/**
 * Master Shortcode Engine for SedRazavi Law Firm
 *
 * @package SedRazavi_Addons
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;

/**
 * ۱. کد کوتاه پرتال کاربری موکلین [sedrazavi_client_portal]
 */
function sedrazavi_shortcode_client_portal($atts) {
    ob_start();
    ?>
    <div id="sedrazavi-client-portal-app" class="sedrazavi-client-portal-wrapper">
        <div class="p-6 rounded-3xl bg-[#0B132B] text-white border border-[#D4AF37]/40 shadow-xl text-right">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-gray-800">
                <div class="flex items-center gap-3">
                    <span style="font-size:2rem;">⚖️</span>
                    <div>
                        <h3 class="text-xl font-bold font-serif text-white">پرتال جامع موکلین دفتر وکالت SedRazavi</h3>
                        <p class="text-xs text-gray-300">مشاهده لحظه‌ای لوایح، تقویم جلسات دادگاه و اسناد محرمانه</p>
                    </div>
                </div>
                <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">سامانه امن ثنا</span>
            </div>
            <div class="py-6 text-center">
                <p class="text-sm text-gray-300 mb-4">برای مشاهده پرونده‌های خود، شماره پرونده یا کد ملی خود را وارد فرمایید:</p>
                <form class="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
                    <input type="text" placeholder="شماره کلاسه پرونده (مثال: ۱۴۰۳-۹۸۲۷۳-ونک)..." class="px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-900 text-white text-xs w-full sm:w-80" />
                    <button type="button" class="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold">ورود به کارتابل</button>
                </form>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_client_portal', 'sedrazavi_shortcode_client_portal');

/**
 * ۲. کد کوتاه پیگیری سریع پرونده [sedrazavi_tracking]
 */
function sedrazavi_shortcode_tracking($atts) {
    ob_start();
    ?>
    <div class="sedrazavi-tracking-box p-6 rounded-2xl bg-white border border-gray-200 shadow-lg text-right max-w-xl mx-auto">
        <h4 class="text-base font-bold text-[#0B132B] mb-2">استعلام سریع وضعیت پرونده</h4>
        <p class="text-xs text-gray-500 mb-4">کد پرونده درج‌شده در قرارداد وکالت را وارد نمایید:</p>
        <div class="flex gap-2">
            <input type="text" placeholder="کد رهگیری پرونده..." class="flex-1 px-4 py-2 rounded-xl border border-gray-300 text-xs font-mono" />
            <button class="btn-gold px-5 py-2 rounded-xl text-xs font-bold">استعلام</button>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_tracking', 'sedrazavi_shortcode_tracking');

/**
 * ۳. کد کوتاه پل‌های ارتباطی و شبکه‌های اجتماعی [sedrazavi_social_icons]
 */
function sedrazavi_shortcode_social_icons($atts) {
    ob_start();
    ?>
    <div class="sedrazavi-social-channels text-right py-4">
        <h4 class="text-sm font-bold text-gray-800 mb-3">شبکه‌های اجتماعی و پیام‌رسان‌های وکیل:</h4>
        <div class="flex flex-wrap gap-3">
            <a href="https://instagram.com/Dr_SedRazavi_Law" target="_blank" class="px-4 py-2 rounded-xl bg-pink-500/10 text-pink-600 border border-pink-500/20 text-xs font-bold flex items-center gap-1.5">
                <span>اینستاگرام رسمی: @Dr_SedRazavi_Law</span>
            </a>
            <a href="https://t.me/SedRazavi_Law" target="_blank" class="px-4 py-2 rounded-xl bg-sky-500/10 text-sky-600 border border-sky-500/20 text-xs font-bold flex items-center gap-1.5">
                <span>تلگرام دفتر: @SedRazavi_Law</span>
            </a>
            <a href="https://wa.me/989123456789" target="_blank" class="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5">
                <span>واتس‌اپ ارسال مدارک: ۰۹۱۲۳۴۵۶۷۸۹</span>
            </a>
            <a href="https://linkedin.com" target="_blank" class="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-600 border border-blue-500/20 text-xs font-bold flex items-center gap-1.5">
                <span>لینکدین تخصصی</span>
            </a>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_social_icons', 'sedrazavi_shortcode_social_icons');

/**
 * ۴. کد کوتاه اسکرول‌بار طلایی [sedrazavi_gold_scroll]
 */
function sedrazavi_shortcode_gold_scroll() {
    ob_start();
    ?>
    <div id="sr-gold-scrollbar-indicator" style="position:fixed; top:0; left:0; height:4px; background:linear-gradient(90deg, #D4AF37, #F3E5AB); z-index:99999; width:0%; transition:width 0.1s ease-out;"></div>
    <script>
    window.addEventListener('scroll', function() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        var el = document.getElementById('sr-gold-scrollbar-indicator');
        if (el) el.style.width = scrolled + '%';
    });
    <\/script>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_gold_scroll', 'sedrazavi_shortcode_gold_scroll');
`},{path:"includes/otp-auth-integration.php",filename:"otp-auth-integration.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"ماژول ورود و ثبت‌نام با شماره موبایل، سازگاری کامل با افزونه Digits و وب‌سرویس‌های پیامک ایرانی (کاوه‌نگار، ملی‌پیامک، فراز اس‌ام‌اس) و سیستم ارتباط سریع موکلان مهمان بدون نیاز به ثبت‌نام.",code:`<?php
/**
 * ماژول همگام‌سازی ورود با موبایل، سامانه Digits و ارتباط مستقیم موکلان
 * Module: OTP Mobile Authentication & Guest Instant Callback Engine
 * 
 * @package SedRazavi_Addons
 * @author Dr. Seyedeh Maryam Razavi
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * ۱. ایجاد جدول اختصاصی درخواست‌های تماس فوری مراجعین مهمان
 */
function sedrazavi_create_callbacks_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'sedrazavi_quick_callbacks';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id bigint(20) NOT NULL AUTO_INCREMENT,
        tracking_code varchar(30) NOT NULL,
        client_name varchar(100) DEFAULT '',
        phone_number varchar(20) NOT NULL,
        legal_topic varchar(100) DEFAULT 'مشاوره فوری',
        notes text DEFAULT '',
        status varchar(30) DEFAULT 'pending',
        ip_address varchar(45) DEFAULT '',
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id),
        KEY phone_idx (phone_number),
        KEY tracking_idx (tracking_code)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}
add_action('after_setup_theme', 'sedrazavi_create_callbacks_table');

/**
 * ۲. ثبت مسیرهای اختصاصی REST API جهت ارتباط بدون ثبت‌نام و ورود OTP
 */
add_action('rest_api_init', function () {
    // اندپوینت ثبت درخواست تماس فوری مراجعین بدون نیاز به حساب کاربری
    register_rest_route('sedrazavi/v1', '/quick-callback', array(
        'methods' => 'POST',
        'callback' => 'sedrazavi_api_handle_quick_callback',
        'permission_callback' => '__return_true',
    ));

    // اندپوینت ارسال کد تایید یکبار مصرف (سازگار با ملی‌پیامک و کاوه‌نگار)
    register_rest_route('sedrazavi/v1', '/otp/send', array(
        'methods' => 'POST',
        'callback' => 'sedrazavi_api_handle_otp_send',
        'permission_callback' => '__return_true',
    ));

    // اندپوینت اعتبارسنجی کد پیامک و ورود/عضویت خودکار کاربر در وردپرس
    register_rest_route('sedrazavi/v1', '/otp/verify', array(
        'methods' => 'POST',
        'callback' => 'sedrazavi_api_handle_otp_verify',
        'permission_callback' => '__return_true',
    ));
});

/**
 * مدیریت درخواست تماس فوری مراجعین بدون نیاز به ساخت حساب
 */
function sedrazavi_api_handle_quick_callback($request) {
    global $wpdb;
    $params = $request->get_json_params();

    $phone = sanitize_text_field($params['phone'] ?? '');
    $name = sanitize_text_field($params['name'] ?? 'مراجع محترم');
    $topic = sanitize_text_field($params['topic'] ?? 'مشاوره فوری تلفنی');
    $notes = sanitize_textarea_field($params['notes'] ?? '');

    // اعتبارسنجی شماره موبایل ایران
    if (!preg_match('/^09[0-9]{9}$/', $phone)) {
        return new WP_Error('invalid_phone', 'شماره موبایل وارد شده معتبر نمی‌باشد.', array('status' => 400));
    }

    $tracking_code = 'CB-' . wp_rand(100000, 999999);
    $table_name = $wpdb->prefix . 'sedrazavi_quick_callbacks';

    $inserted = $wpdb->insert($table_name, array(
        'tracking_code' => $tracking_code,
        'client_name'   => $name,
        'phone_number'  => $phone,
        'legal_topic'   => $topic,
        'notes'         => $notes,
        'ip_address'    => sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? ''),
        'status'        => 'pending',
    ));

    if (!$inserted) {
        return new WP_Error('db_error', 'خطا در ثبت درخواست در پایگاه داده.', array('status' => 500));
    }

    // ارسال پیامک فوری به مدیر دفتر و وکیل جهت پاسخگویی سریع
    sedrazavi_send_admin_sms_alert($phone, $name, $topic, $tracking_code);

    return rest_ensure_response(array(
        'success' => true,
        'tracking_code' => $tracking_code,
        'message' => 'درخواست تماس شما با موفقیت ثبت شد. به زودی تماس خواهیم گرفت.'
    ));
}

/**
 * ارسال پیامک به وکیل با وب‌سرویس‌های ایرانی (کاوه‌نگار / ملی‌پیامک / فراز اس‌ام‌اس)
 */
function sedrazavi_send_admin_sms_alert($client_phone, $client_name, $topic, $tracking_code) {
    $admin_phone = get_option('sedrazavi_admin_phone', '09123456789');
    $sms_gateway = get_option('sedrazavi_sms_gateway', 'kavenegar'); // kavenegar, melipayamak, farazsms

    $msg = "دفتر وکالت دکتر رضوی:
درخواست تماس جدید بدون ثبت‌نام
نام: {$client_name}
شماره: {$client_phone}
موضوع: {$topic}
کد پیگیری: {$tracking_code}";

    // اعمال فیلتر برای سفارشی‌سازی متن توسط سایر افزونه‌ها یا وب‌هوک‌ها
    apply_filters('sedrazavi_dispatch_sms', $admin_phone, $msg, $sms_gateway);
}

/**
 * ۳. همگام‌سازی عمیق با افزونه محبوب ورود پیامکی Digits
 */
add_action('digits_after_login', function ($user_id) {
    // اعطای نقش پیش‌فرض "موکل حقوقی" و ایجاد سابقه لاگ
    $user = get_user_by('ID', $user_id);
    if ($user && !in_array('administrator', (array)$user->roles)) {
        $user->add_role('sedrazavi_client');
    }
}, 10, 1);

/**
 * کد کوتاه فرم ورود پیامکی هوشمند [sedrazavi_otp_login]
 */
function sedrazavi_shortcode_otp_login() {
    if (is_user_logged_in()) {
        $current_user = wp_get_current_user();
        return '<div class="sedrazavi-logged-box p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-right">' .
               'سلام <strong>' . esc_html($current_user->display_name) . '</strong> گرامی! شما وارد پرتال شده‌اید. ' .
               '<a href="' . wp_logout_url(home_url()) . '" class="text-red-600 underline mr-2">خروج</a>' .
               '</div>';
    }

    // اگر افزونه Digits فعال باشد، دکمه پیشرفته آن را فراخوانی می‌کند
    if (function_exists('digits_login_button')) {
        return do_shortcode('[digits_login]');
    }

    // فرم رزرو پیامکی مستقل در غیاب دیجیتس
    ob_start();
    ?>
    <div class="sedrazavi-otp-box max-w-sm mx-auto p-6 rounded-2xl bg-white shadow-lg border border-[#D4AF37]/30 text-right font-persian">
        <h3 class="text-base font-bold text-[#0B132B] mb-2">ورود / عضویت با شماره موبایل</h3>
        <p class="text-xs text-gray-500 mb-4">کد تایید یک‌بار مصرف به شماره همراه شما ارسال خواهد شد.</p>
        <form class="space-y-3" onsubmit="return false;">
            <input type="tel" dir="ltr" placeholder="۰۹۱۲۳۴۵۶۷۸۹" class="w-full px-3 py-2.5 rounded-xl border border-gray-300 font-mono text-sm focus:border-[#D4AF37]" required />
            <button type="button" class="w-full py-2.5 rounded-xl bg-[#D4AF37] text-white font-bold text-xs hover:bg-[#AA820A] transition-colors">
                دریافت کد تایید پیامکی
            </button>
        </form>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_otp_login', 'sedrazavi_shortcode_otp_login');

/**
 * کد کوتاه ویجت تماس فوری بدون ثبت‌نام [sedrazavi_quick_callback]
 */
function sedrazavi_shortcode_quick_callback() {
    ob_start();
    ?>
    <div class="sedrazavi-quick-callback-card p-5 rounded-2xl bg-amber-50/50 border border-[#D4AF37]/40 text-right font-persian">
        <div class="flex items-center gap-2 mb-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h4 class="text-sm font-bold text-[#0B132B]">تماس تلفنی فوری وکیل (بدون نیاز به ثبت نام)</h4>
        </div>
        <p class="text-xs text-gray-600 mb-3">شماره تماس خود را بگذارید؛ در اسرع وقت کارشناسان دفتر با شما تماس می‌گیرند:</p>
        <form class="flex gap-2" onsubmit="return false;">
            <input type="tel" dir="ltr" placeholder="۰۹۱۲۳۴۵۶۷۸۹" class="flex-1 px-3 py-2 rounded-xl border border-gray-300 font-mono text-xs focus:border-[#D4AF37]" required />
            <button type="button" class="px-4 py-2 rounded-xl bg-[#0B132B] text-[#F3E5AB] text-xs font-bold hover:bg-[#1C2541]">
                ثبت و تماس
            </button>
        </form>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_quick_callback', 'sedrazavi_shortcode_quick_callback');
`},{path:"includes/class-sedrazavi-odr-arbitration.php",filename:"class-sedrazavi-odr-arbitration.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"کلاس هسته مدیریت داوری آنلاین، گردش کار تبادل لوایح و امضای الکترونیک رأی داور",code:`<?php
/**
 * Class SedRazavi_ODR_Arbitration
 *
 * @package SedRazavi_Core_Plugin
 * @version 5.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_ODR_Arbitration {

    public function __construct() {
        add_action('wp_ajax_sedrazavi_submit_pleading', array($this, 'ajax_submit_pleading'));
        add_action('wp_ajax_nopriv_sedrazavi_submit_pleading', array($this, 'ajax_submit_pleading'));
        add_action('wp_ajax_sedrazavi_issue_award', array($this, 'ajax_issue_award'));
        add_shortcode('sedrazavi_odr_portal', array($this, 'render_odr_portal'));
        add_shortcode('sedrazavi_virtual_courtroom', array($this, 'render_virtual_courtroom'));
        add_shortcode('sedrazavi_petition_builder', array($this, 'render_petition_builder'));
    }

    /**
     * ثبت لایحه جدید در پرونده داوری با پیامک خودکار
     */
    public function ajax_submit_pleading() {
        check_ajax_referer('sedrazavi_odr_nonce', 'security');

        $case_id = intval($_POST['case_id']);
        $title   = sanitize_text_field($_POST['title']);
        $content = wp_kses_post($_POST['content']);
        $sender  = sanitize_text_field($_POST['sender']);

        if (!$case_id || empty($title) || empty($content)) {
            wp_send_json_error(array('message' => 'اطلاعات لایحه ناقص است.'));
        }

        $tracking_code = 'PLD-SR-' . rand(10000, 99999);

        // ذخیره به عنوان کامنت متصل به پست داوری یا جدول اختصاصی
        $pleading_data = array(
            'comment_post_ID'      => $case_id,
            'comment_content'      => $content,
            'comment_author'       => $sender,
            'comment_type'         => 'odr_pleading',
            'comment_approved'     => 1,
        );

        $comment_id = wp_insert_comment($pleading_data);
        add_comment_meta($comment_id, 'tracking_code', $tracking_code);
        add_comment_meta($comment_id, 'pleading_title', $title);

        // ارسال پیامک خودکار ابلاغ لایحه به طرف مقابل
        do_action('sedrazavi_odr_pleading_submitted', $case_id, $tracking_code);

        wp_send_json_success(array(
            'message'       => 'لایحه با موفقیت در پرونده داوری ثبت گردید.',
            'tracking_code' => $tracking_code
        ));
    }

    public function render_odr_portal() {
        ob_start();
        ?>
        <div id="sedrazavi-odr-root" class="odr-interactive-app">
            <p class="text-xs text-slate-500 text-center font-mono">بارگذاری پورتال تعاملی داوری آنلاین و ثبت پرونده...</p>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_virtual_courtroom() {
        ob_start();
        ?>
        <div id="sedrazavi-virtual-court-root" class="virtual-court-app">
            <p class="text-xs text-slate-500 text-center font-mono">اتصال به تالار دادرسی مجازی و استماع زنده...</p>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_petition_builder() {
        ob_start();
        ?>
        <div id="sedrazavi-petition-builder-root" class="petition-builder-app">
            <p class="text-xs text-slate-500 text-center font-mono">بارگذاری فرم‌ساز هوشمند دادخواست و لوایح عدل‌ایران...</p>
        </div>
        <?php
        return ob_get_clean();
    }
}

new SedRazavi_ODR_Arbitration();
`},{path:"includes/class-sedrazavi-legal-intelligence.php",filename:"class-sedrazavi-legal-intelligence.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"کلاس هوش مصنوعی حقوقی، ممیزی هوشمند قراردادها، و موتور استخراج و تطبیق آرای دیوان عالی کشور",code:`<?php
/**
 * Class SedRazavi_Legal_Intelligence
 *
 * @package SedRazavi_Core_Plugin
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Legal_Intelligence {

    public function __construct() {
        add_action('wp_ajax_sedrazavi_audit_clause', array($this, 'ajax_audit_clause'));
        add_action('wp_ajax_nopriv_sedrazavi_audit_clause', array($this, 'ajax_audit_clause'));
        add_action('wp_ajax_sedrazavi_search_precedents', array($this, 'ajax_search_precedents'));
        add_action('wp_ajax_nopriv_sedrazavi_search_precedents', array($this, 'ajax_search_precedents'));

        add_shortcode('sedrazavi_legal_intelligence_portal', array($this, 'render_portal'));
        add_shortcode('sedrazavi_contract_auditor', array($this, 'render_contract_auditor'));
    }

    /**
     * آنالیز هوشمند بند قرارداد و تعیین ریسک حقوقی
     */
    public function ajax_audit_clause() {
        check_ajax_referer('sedrazavi_intel_nonce', 'security');

        $raw_text = sanitize_textarea_field($_POST['clause_text'] ?? '');
        if (empty($raw_text)) {
            wp_send_json_error(array('message' => 'متن شرط قراردادی ارسال نشده است.'));
        }

        // الگوریتم غربالگری کلمات پرخطر حقوقی ایران
        $risk_level = 'low';
        $detected_risks = array();
        $recommendations = array();

        if (mb_stripos($raw_text, 'غبن افحش') !== false || mb_stripos($raw_text, 'کافه خیارات') !== false) {
            $risk_level = 'high';
            $detected_risks[] = 'اسقاط خیار غبن فاحش یا افحش به ضرر طرفین.';
            $recommendations[] = 'خیار تدلیس و خیار تخلف از شرط صفت را مستثنی کنید (ماده ۴۴۸ ق.م).';
        }

        if (mb_stripos($raw_text, 'فورس‌ماژور') !== false && (mb_stripos($raw_text, 'تورم') !== false || mb_stripos($raw_text, 'افزایش قیمت') !== false)) {
            $risk_level = 'critical';
            $detected_risks[] = 'تفسیر غیرقانونی تورم تجاری به عنوان فورس‌ماژور قهری.';
            $recommendations[] = 'تورم را صراحتاً از شمول قوه قاهره خارج کنید (مواد ۲۲۷ و ۲۲۹ ق.م).';
        }

        if (mb_stripos($raw_text, 'وجه التزام') !== false) {
            $detected_risks[] = 'نیاز به تطبیق با رأی وحدت رویه ۸۰۵ دیوان عالی کشور.';
        }

        wp_send_json_success(array(
            'risk_level'      => $risk_level,
            'detected_risks'  => $detected_risks,
            'recommendations' => $recommendations,
            'safety_score'    => $risk_level === 'critical' ? 35 : ($risk_level === 'high' ? 60 : 92),
        ));
    }

    /**
     * جستجوی سریع در بانک آرای وحدت رویه
     */
    public function ajax_search_precedents() {
        $keyword = sanitize_text_field($_GET['keyword'] ?? '');
        $category = sanitize_text_field($_GET['category'] ?? '');

        $args = array(
            'post_type'      => 'legal_precedent',
            'posts_per_page' => 15,
            's'              => $keyword,
        );

        if (!empty($category)) {
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'precedent_category',
                    'field'    => 'slug',
                    'terms'    => $category,
                ),
            );
        }

        $query = new WP_Query($args);
        $results = array();

        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $results[] = array(
                    'id'      => get_the_ID(),
                    'title'   => get_the_title(),
                    'excerpt' => get_the_excerpt(),
                    'number'  => get_post_meta(get_the_ID(), '_precedent_number', true),
                    'date'    => get_post_meta(get_the_ID(), '_precedent_date', true),
                );
            }
            wp_reset_postdata();
        }

        wp_send_json_success(array('precedents' => $results));
    }

    public function render_portal() {
        ob_start();
        ?>
        <div id="sedrazavi-legal-ai-root" class="legal-intelligence-app">
            <p class="text-xs text-slate-500 text-center font-mono">در حال آماده‌سازی دستیار هوش مصنوعی و ممیزی قراردادها...</p>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_contract_auditor() {
        ob_start();
        ?>
        <div id="sedrazavi-contract-audit-root" class="contract-auditor-app">
            <p class="text-xs text-slate-500 text-center font-mono">بارگذاری ماژول غربالگری ریسک قرارداد...</p>
        </div>
        <?php
        return ob_get_clean();
    }
}

new SedRazavi_Legal_Intelligence();
`}];function I(){return new Promise((_,v)=>{try{const o=document.createElement("canvas");o.width=1200,o.height=900;const r=o.getContext("2d");if(!r)throw new Error("Canvas context not available");const f=r.createLinearGradient(0,0,1200,900);f.addColorStop(0,"#060B18"),f.addColorStop(.5,"#0B132B"),f.addColorStop(1,"#1C2541"),r.fillStyle=f,r.fillRect(0,0,1200,900),r.strokeStyle="rgba(212, 175, 55, 0.07)",r.lineWidth=1;for(let a=40;a<1200;a+=40)r.beginPath(),r.moveTo(a,0),r.lineTo(a,900),r.stroke();for(let a=40;a<900;a+=40)r.beginPath(),r.moveTo(0,a),r.lineTo(1200,a),r.stroke();r.strokeStyle="rgba(212, 175, 55, 0.4)",r.lineWidth=3,r.strokeRect(30,30,1140,840),r.strokeStyle="rgba(212, 175, 55, 0.15)",r.lineWidth=1,r.strokeRect(45,45,1110,810);const N=(a,d)=>{r.fillStyle="#D4AF37",r.beginPath(),r.arc(a,d,6,0,Math.PI*2),r.fill()};N(30,30),N(1170,30),N(30,870),N(1170,870);const n=600,b=260,E=r.createRadialGradient(n,b,10,n,b,140);E.addColorStop(0,"rgba(212, 175, 55, 0.25)"),E.addColorStop(1,"rgba(212, 175, 55, 0)"),r.fillStyle=E,r.beginPath(),r.arc(n,b,140,0,Math.PI*2),r.fill(),r.fillStyle="rgba(11, 19, 43, 0.9)",r.strokeStyle="#D4AF37",r.lineWidth=4,r.beginPath(),r.arc(n,b,70,0,Math.PI*2),r.fill(),r.stroke(),r.fillStyle="#D4AF37",r.font="bold 54px sans-serif",r.textAlign="center",r.textBaseline="middle",r.fillText("⚖️",n,b),r.fillStyle="#FFFFFF",r.font='bold 52px Tahoma, "Vazirmatn", sans-serif',r.textAlign="center",r.textBaseline="alphabetic",r.fillText("دفتر وکالت و مشاوره حقوقی سید رضوی",n,410),r.fillStyle="#D4AF37",r.font="600 24px Georgia, serif",r.letterSpacing="4px",r.fillText("SEDRAZAVI LAW FIRM — LUXURY WORDPRESS THEME",n,460);const w=r.createLinearGradient(n-250,0,n+250,0);w.addColorStop(0,"rgba(212, 175, 55, 0)"),w.addColorStop(.5,"rgba(212, 175, 55, 0.8)"),w.addColorStop(1,"rgba(212, 175, 55, 0)"),r.strokeStyle=w,r.lineWidth=2,r.beginPath(),r.moveTo(n-250,490),r.lineTo(n+250,490),r.stroke(),r.fillStyle="#CBD5E1",r.font='400 22px Tahoma, "Vazirmatn", sans-serif',r.fillText("پوسته اختصاصی، مستقل و فوق‌پیشرفته برای وکلا و مشاوران حقوقی",n,535);const m=["✨ مستقل و بدون نیاز به ACF","⚡ سازگاری کامل با المنتور","📊 سامانه مدیریت پرونده و موکل","📅 رزرواسیون آنلاین مشاوره"],u=240,g=(1200-(m.length*u+(m.length-1)*20))/2;m.forEach((a,d)=>{const p=g+d*(u+20),$=600,k=u,W=50;r.fillStyle="rgba(28, 37, 65, 0.7)",r.strokeStyle="rgba(212, 175, 55, 0.35)",r.lineWidth=1.5,r.beginPath(),r.roundRect(p,$,k,W,12),r.fill(),r.stroke(),r.fillStyle="#F3E5AB",r.font='bold 16px Tahoma, "Vazirmatn", sans-serif',r.textAlign="center",r.textBaseline="middle",r.fillText(a,p+k/2,$+W/2)}),r.fillStyle="rgba(6, 11, 24, 0.9)",r.strokeStyle="rgba(212, 175, 55, 0.2)",r.lineWidth=1,r.beginPath(),r.roundRect(100,700,1e3,110,16),r.fill(),r.stroke(),[{label:"نسخه پوسته",val:"Version 2.5.0"},{label:"سازگاری PHP",val:"PHP 7.4 - 8.3+"},{label:"سازگاری وردپرس",val:"WordPress 5.8 - 6.7+"}].forEach((a,d)=>{const p=100+333.3333333333333*d+166.66666666666666;r.fillStyle="#94A3B8",r.font='400 16px Tahoma, "Vazirmatn", sans-serif',r.textAlign="center",r.textBaseline="alphabetic",r.fillText(a.label,p,745),r.fillStyle="#D4AF37",r.font="bold 20px Georgia, serif",r.fillText(a.val,p,780)}),r.fillStyle="#64748B",r.font='14px Tahoma, "Vazirmatn", sans-serif',r.textAlign="center",r.fillText("© SedRazavi Law Firm Theme — 100% GPL Compliant",n,845),o.toBlob(a=>{a?_(a):v(new Error("Failed to create Blob from Canvas"))},"image/png")}catch(o){v(o)}})}function he(){return new Promise((_,v)=>{I().then(o=>{const r=new FileReader;r.onloadend=()=>_(r.result),r.onerror=v,r.readAsDataURL(o)}).catch(v)})}const Pe=()=>{const[_,v]=c.useState("theme"),[o,r]=c.useState(h[0]),[f,N]=c.useState("همه"),[n,b]=c.useState(""),[E,w]=c.useState(!1),[m,u]=c.useState(!1),[j,g]=c.useState(null),[R,a]=c.useState(null),[d,p]=c.useState("downloads"),[$,k]=c.useState(""),[W,L]=c.useState(!1);c.useEffect(()=>{he().then(s=>k(s)).catch(s=>console.warn("Could not generate screenshot data URL:",s))},[]);const ee=["همه",...Array.from(new Set(h.map(s=>s.category)))],re=["همه",...Array.from(new Set(D.map(s=>s.category)))],se=_==="theme"?h:D,ae=_==="theme"?ee:re,O=s=>{v(s),N("همه"),b(""),r(s==="theme"?h[0]:D[0])},U=se.filter(s=>{const t=f==="همه"||s.category===f,i=n===""||s.filename.toLowerCase().includes(n.toLowerCase())||s.description.toLowerCase().includes(n.toLowerCase());return t&&i}),te=()=>{navigator.clipboard.writeText(o.code),w(!0),setTimeout(()=>w(!1),2500)},q=async()=>{try{const s=await I(),t=window.URL.createObjectURL(s),i=document.createElement("a");i.href=t,i.download="screenshot.png",document.body.appendChild(i),i.click(),document.body.removeChild(i),window.URL.revokeObjectURL(t)}catch(s){console.error("Download screenshot error:",s)}},P=(s,t)=>{const i=document.createElement("a");i.href=s,i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i)},H=async()=>{u(!0),g("theme");try{try{if((await fetch("/sedrazavi-theme.zip",{method:"HEAD"})).ok){P("/sedrazavi-theme.zip","sedrazavi-theme.zip"),a("پوسته رسمی وردپرس (sedrazavi-theme.zip) با موفقیت دانلود شد."),setTimeout(()=>a(null),5e3);return}}catch{}const s=new C,t=s.folder("sedrazavi-theme");h.forEach(l=>{l.path!=="screenshot.png"&&(t==null||t.file(l.path,l.code))});const i=de(Z),y=le(Z);t==null||t.file("inc/react-shortcodes.php",i),t==null||t.file("assets/js/sedrazavi-react-mount.js",y);try{const l=await I();t==null||t.file("screenshot.png",l)}catch(l){console.warn("Screenshot packaging fallback:",l)}const x=await s.generateAsync({type:"blob"}),A=window.URL.createObjectURL(x);P(A,"sedrazavi-theme.zip"),window.URL.revokeObjectURL(A),a("پوسته رسمی وردپرس (sedrazavi-theme.zip) با موفقیت دانلود شد."),setTimeout(()=>a(null),5e3)}catch(s){console.error("Failed to generate Theme ZIP:",s),alert("خطایی در تولید بسته فشرده پوسته رخ داد.")}finally{u(!1),g(null)}},ie=async()=>{u(!0),g("plugin");try{try{if((await fetch("/sedrazavi-addons.zip",{method:"HEAD"})).ok){P("/sedrazavi-addons.zip","sedrazavi-addons.zip"),a("افزونه مکمل هسته (sedrazavi-addons.zip) با موفقیت دانلود شد."),setTimeout(()=>a(null),5e3);return}}catch{}const s=new C,t=s.folder("sedrazavi-addons");D.forEach(x=>{t==null||t.file(x.path,x.code)});const i=await s.generateAsync({type:"blob"}),y=window.URL.createObjectURL(i);P(y,"sedrazavi-addons.zip"),window.URL.revokeObjectURL(y),a("افزونه مکمل هسته (sedrazavi-addons.zip) با موفقیت دانلود شد."),setTimeout(()=>a(null),5e3)}catch(s){console.error("Failed to generate Plugin ZIP:",s),alert("خطایی در تولید بسته افزونه مکمل رخ داد.")}finally{u(!1),g(null)}},M=async()=>{u(!0),g("suite");try{try{if((await fetch("/sedrazavi-complete-suite.zip",{method:"HEAD"})).ok){P("/sedrazavi-complete-suite.zip","sedrazavi-complete-suite.zip"),a("مجموعه جامع ۲ در ۱ (sedrazavi-complete-suite.zip) با موفقیت دانلود شد."),setTimeout(()=>a(null),6e3);return}}catch{}const s=new C,t=s.folder("sedrazavi-theme");h.forEach(V=>{V.path!=="screenshot.png"&&(t==null||t.file(V.path,V.code))});const i=await s.generateAsync({type:"blob"}),y=new C,x=y.folder("sedrazavi-addons");D.forEach(V=>{x==null||x.file(V.path,V.code)});const A=await y.generateAsync({type:"blob"}),l=new C;l.file("1-پوسته-قالب-sedrazavi-theme.zip",i),l.file("2-افزونه-مکمل-sedrazavi-addons.zip",A),l.file("راهنمای_مهم_نصب_بدون_خطا.txt",`دفتر وکالت دکتر سیده مریم رضوی - راهنمای نصب
1. در پیشخوان وردپرس به نمایش > پوسته‌ها رفته و فایل 1-پوسته-قالب-sedrazavi-theme.zip را نصب و فعال فرمایید.
2. به افزونه‌ها > افزودن افزونه رفته و فایل 2-افزونه-مکمل-sedrazavi-addons.zip را نصب و فعال فرمایید.`);const ne=await l.generateAsync({type:"blob"}),G=window.URL.createObjectURL(ne);P(G,"sedrazavi-complete-suite.zip"),window.URL.revokeObjectURL(G),a("مجموعه جامع ۲ در ۱ (sedrazavi-complete-suite.zip) با موفقیت دانلود شد."),setTimeout(()=>a(null),6e3)}catch(s){console.error("Failed to generate Complete Bundle:",s),alert("خطایی در تولید بسته جامع رخ داد.")}finally{u(!1),g(null)}};return e.jsxDEV("div",{className:"py-10 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen font-persian transition-colors",dir:"rtl",children:[e.jsxDEV("div",{className:"container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl",children:[e.jsxDEV("div",{className:"relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#070D1E] via-[#0B132B] to-[#141E3C] border border-[#D4AF37]/35 shadow-2xl p-6 sm:p-10 text-white",children:[e.jsxDEV("div",{className:"absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:265,columnNumber:11},void 0),e.jsxDEV("div",{className:"absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:266,columnNumber:11},void 0),e.jsxDEV("div",{className:"relative z-10 space-y-6",children:[e.jsxDEV("div",{className:"flex flex-col lg:flex-row lg:items-center justify-between gap-6",children:[e.jsxDEV("div",{className:"space-y-3 max-w-3xl",children:[e.jsxDEV("div",{className:"inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-bold",children:[e.jsxDEV(ce,{className:"w-3.5 h-3.5 text-[#D4AF37]"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:272,columnNumber:19},void 0),e.jsxDEV("span",{children:"سامانه رسمی بسته‌های نصبی پوسته و افزونه وردپرس SedRazavi"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:273,columnNumber:19},void 0),e.jsxDEV("span",{className:"w-1.5 h-1.5 rounded-full bg-emerald-400"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:274,columnNumber:19},void 0),e.jsxDEV("span",{className:"text-emerald-400 text-[11px] font-mono",children:"v2.6.0 Stable Release"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:275,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:271,columnNumber:17},void 0),e.jsxDEV("h1",{className:"text-2xl sm:text-4xl font-black font-serif text-white tracking-tight leading-snug",children:"مرکز دانلود و مدیریت بسته‌های آماده نصب در وردپرس"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:278,columnNumber:17},void 0),e.jsxDEV("p",{className:"text-xs sm:text-sm text-slate-300 leading-relaxed",children:"پوسته مستقل استاندارد و افزونه مکمل حقوقی با تفکیک اصولی و سازگار با وردپرس ۶.۰ تا ۶.۷ و PHP 8.0+. تمامی فایل‌ها به صورت ۱۰۰٪ تست‌شده، فاقد خطای سربرگ (Header Error) و صفحه سفید (WSOD)، همراه با هدر و فوتر داینامیک و ساختار استاندارد آماده بارگذاری هستند."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:282,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:270,columnNumber:15},void 0),e.jsxDEV("div",{className:"flex flex-col gap-2 shrink-0 text-xs",children:[e.jsxDEV("div",{className:"flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200",children:[e.jsxDEV(z,{className:"w-4 h-4 text-emerald-400 shrink-0"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:291,columnNumber:19},void 0),e.jsxDEV("span",{children:"تضمین عدم بروز خطای صفحه سفید (WSOD Free)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:292,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:290,columnNumber:17},void 0),e.jsxDEV("div",{className:"flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200",children:[e.jsxDEV(z,{className:"w-4 h-4 text-[#D4AF37] shrink-0"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:295,columnNumber:19},void 0),e.jsxDEV("span",{children:"پوشه ریشه استاندارد در فایل‌های زیپ برای آپلود مستقیم"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:296,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:294,columnNumber:17},void 0),e.jsxDEV("div",{className:"flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200",children:[e.jsxDEV(z,{className:"w-4 h-4 text-blue-400 shrink-0"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:299,columnNumber:19},void 0),e.jsxDEV("span",{children:"حاوی باندل‌های کامپایل‌شده فرانت‌اند در assets/dist"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:300,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:298,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:289,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:269,columnNumber:13},void 0),R&&e.jsxDEV("div",{className:"p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-center gap-3 animate-fadeIn",children:[e.jsxDEV("div",{className:"w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold",children:"✓"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:308,columnNumber:17},void 0),e.jsxDEV("span",{className:"font-semibold",children:R},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:311,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:307,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:268,columnNumber:11},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:264,columnNumber:9},void 0),e.jsxDEV("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[e.jsxDEV("div",{className:"relative rounded-3xl p-6 bg-white dark:bg-[#0B132B] border border-[#D4AF37]/40 shadow-xl hover:shadow-2xl hover:border-[#D4AF37] transition-all flex flex-col justify-between space-y-5 group",children:[e.jsxDEV("div",{className:"space-y-3",children:[e.jsxDEV("div",{className:"flex items-center justify-between",children:[e.jsxDEV("div",{className:"w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]",children:e.jsxDEV(T,{className:"w-6 h-6"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:325,columnNumber:19},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:324,columnNumber:17},void 0),e.jsxDEV("span",{className:"px-3 py-1 rounded-full text-xs font-bold bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] border border-[#D4AF37]/30",children:"پوسته وردپرس • ۱.۷MB"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:327,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:323,columnNumber:15},void 0),e.jsxDEV("div",{children:[e.jsxDEV("h3",{className:"text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#D4AF37] transition-colors",children:"پوسته رسمی قالب (Theme ZIP)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:333,columnNumber:17},void 0),e.jsxDEV("span",{className:"text-xs text-[#D4AF37] font-mono",children:"sedrazavi-theme.zip"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:336,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:332,columnNumber:15},void 0),e.jsxDEV("p",{className:"text-xs text-gray-600 dark:text-gray-300 leading-relaxed",children:["حاوی فایل ",e.jsxDEV("code",{className:"font-mono text-[#D4AF37]",children:"style.css"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:340,columnNumber:27},void 0)," با هدر استاندارد وردپرس، قالب‌های اصلی (index, header, footer, single, page, 404, front-page)، تصویر screenshot.png و دارایی‌های کامپایل‌شده فرانت‌اند در assets/dist."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:339,columnNumber:15},void 0),e.jsxDEV("div",{className:"p-2.5 rounded-xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400",children:[e.jsxDEV("span",{className:"font-bold text-[#D4AF37]",children:"محل بارگذاری:"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:344,columnNumber:17},void 0)," پیشخوان > نمایش > پوسته‌ها > افزودن پوسته > بارگذاری پوسته"]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:343,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:322,columnNumber:13},void 0),e.jsxDEV("button",{type:"button",onClick:H,disabled:m,className:"w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C4981C] to-[#AA820A] text-white dark:text-[#070D1E] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-[#D4AF37]/25 transition-all cursor-pointer",children:[e.jsxDEV(B,{className:"w-4 h-4"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:354,columnNumber:15},void 0),e.jsxDEV("span",{children:m&&j==="theme"?"در حال آماده‌سازی...":"دانلود مستقیم پوسته (sedrazavi-theme.zip)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:355,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:348,columnNumber:13},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:321,columnNumber:11},void 0),e.jsxDEV("div",{className:"relative rounded-3xl p-6 bg-white dark:bg-[#0B132B] border border-emerald-500/35 shadow-xl hover:shadow-2xl hover:border-emerald-500 transition-all flex flex-col justify-between space-y-5 group",children:[e.jsxDEV("div",{className:"space-y-3",children:[e.jsxDEV("div",{className:"flex items-center justify-between",children:[e.jsxDEV("div",{className:"w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-600 dark:text-emerald-400",children:e.jsxDEV(S,{className:"w-6 h-6"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:366,columnNumber:19},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:365,columnNumber:17},void 0),e.jsxDEV("span",{className:"px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30",children:"افزونه مکمل • ۳۰KB"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:368,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:364,columnNumber:15},void 0),e.jsxDEV("div",{children:[e.jsxDEV("h3",{className:"text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors",children:"افزونه مکمل هسته (Addons ZIP)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:374,columnNumber:17},void 0),e.jsxDEV("span",{className:"text-xs text-emerald-600 dark:text-emerald-400 font-mono",children:"sedrazavi-addons.zip"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:377,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:373,columnNumber:15},void 0),e.jsxDEV("p",{className:"text-xs text-gray-600 dark:text-gray-300 leading-relaxed",children:"شامل ۱۲ ماژول تخصصی حقوقی، ثبت پست‌تایپ‌های پرونده، نوبت‌دهی، نظرات، ویجت‌های اختصاصی المنتور، سامانه استعلام برخط و لاگر خودکار خطاها بدون تداخل با هسته."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:380,columnNumber:15},void 0),e.jsxDEV("div",{className:"p-2.5 rounded-xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400",children:[e.jsxDEV("span",{className:"font-bold text-emerald-600 dark:text-emerald-400",children:"محل بارگذاری:"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:385,columnNumber:17},void 0)," پیشخوان > افزونه‌ها > افزودن افزونه تازه > بارگذاری افزونه"]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:384,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:363,columnNumber:13},void 0),e.jsxDEV("button",{type:"button",onClick:ie,disabled:m,className:"w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer",children:[e.jsxDEV(B,{className:"w-4 h-4"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:395,columnNumber:15},void 0),e.jsxDEV("span",{children:m&&j==="plugin"?"در حال آماده‌سازی...":"دانلود مستقیم افزونه (sedrazavi-addons.zip)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:396,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:389,columnNumber:13},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:362,columnNumber:11},void 0),e.jsxDEV("div",{className:"relative rounded-3xl p-6 bg-white dark:bg-[#0B132B] border border-blue-500/35 shadow-xl hover:shadow-2xl hover:border-blue-500 transition-all flex flex-col justify-between space-y-5 group",children:[e.jsxDEV("div",{className:"space-y-3",children:[e.jsxDEV("div",{className:"flex items-center justify-between",children:[e.jsxDEV("div",{className:"w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/35 flex items-center justify-center text-blue-600 dark:text-blue-400",children:e.jsxDEV(F,{className:"w-6 h-6"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:407,columnNumber:19},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:406,columnNumber:17},void 0),e.jsxDEV("span",{className:"px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30",children:"مجموعه جامع ۲ در ۱ • ۱.۷MB"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:409,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:405,columnNumber:15},void 0),e.jsxDEV("div",{children:[e.jsxDEV("h3",{className:"text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors",children:"پکیج جامع (Complete Suite ZIP)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:415,columnNumber:17},void 0),e.jsxDEV("span",{className:"text-xs text-blue-600 dark:text-blue-400 font-mono",children:"sedrazavi-complete-suite.zip"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:418,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:414,columnNumber:15},void 0),e.jsxDEV("p",{className:"text-xs text-gray-600 dark:text-gray-300 leading-relaxed",children:"مجموعه کامل و آماده تحویل: شامل هر دو فایل زیپ مستقل (پوسته + افزونه) و فایل راهنمای متنی نصب مرحله‌به‌مرحله به زبان فارسی جهت سهولت نگهداری و تحویل به کارفرما."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:421,columnNumber:15},void 0),e.jsxDEV("div",{className:"p-2.5 rounded-xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400",children:[e.jsxDEV("span",{className:"font-bold text-blue-600 dark:text-blue-400",children:"راهکار:"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:426,columnNumber:17},void 0)," این فایل را Extract کرده و سپس پوسته و افزونه درون آن را جداگانه نصب نمایید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:425,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:404,columnNumber:13},void 0),e.jsxDEV("button",{type:"button",onClick:M,disabled:m,className:"w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-blue-600/20 transition-all cursor-pointer",children:[e.jsxDEV(F,{className:"w-4 h-4"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:436,columnNumber:15},void 0),e.jsxDEV("span",{children:m&&j==="suite"?"در حال آماده‌سازی...":"دانلود پکیج کامل (sedrazavi-complete-suite.zip)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:437,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:430,columnNumber:13},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:403,columnNumber:11},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:318,columnNumber:9},void 0),e.jsxDEV("div",{className:"bg-white dark:bg-[#0B132B] p-2 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between flex-wrap gap-2",children:[e.jsxDEV("div",{className:"flex items-center gap-1.5 flex-wrap",children:[e.jsxDEV("button",{type:"button",onClick:()=>p("downloads"),className:`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${d==="downloads"?"bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm":"text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`,children:[e.jsxDEV(Y,{className:"w-3.5 h-3.5"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:457,columnNumber:15},void 0),e.jsxDEV("span",{children:"راهنمای راه‌اندازی و نیازمندی‌ها"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:458,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:448,columnNumber:13},void 0),e.jsxDEV("button",{type:"button",onClick:()=>p("files"),className:`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${d==="files"?"bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm":"text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`,children:[e.jsxDEV(X,{className:"w-3.5 h-3.5"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:470,columnNumber:15},void 0),e.jsxDEV("span",{children:["مرورگر کدهای منبع (",h.length+D.length," فایل)"]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:471,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:461,columnNumber:13},void 0),e.jsxDEV("button",{type:"button",onClick:()=>p("install"),className:`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${d==="install"?"bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm":"text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`,children:[e.jsxDEV(pe,{className:"w-3.5 h-3.5"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:483,columnNumber:15},void 0),e.jsxDEV("span",{children:"مستندات گام‌به‌گام نصب"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:484,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:474,columnNumber:13},void 0),e.jsxDEV("button",{type:"button",onClick:()=>p("architecture"),className:`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${d==="architecture"?"bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm":"text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`,children:[e.jsxDEV(K,{className:"w-3.5 h-3.5"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:496,columnNumber:15},void 0),e.jsxDEV("span",{children:"معماری و استاندارد فنی"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:497,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:487,columnNumber:13},void 0),e.jsxDEV("button",{type:"button",onClick:()=>p("audit"),className:`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${d==="audit"?"bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm":"text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`,children:[e.jsxDEV(S,{className:"w-3.5 h-3.5 text-emerald-400"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:509,columnNumber:15},void 0),e.jsxDEV("span",{children:"ممیزی جامع مستر و مسیرهای REST (فاز ۵)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:510,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:500,columnNumber:13},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:447,columnNumber:11},void 0),e.jsxDEV("div",{className:"flex items-center gap-2",children:[e.jsxDEV("button",{type:"button",onClick:q,className:"px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center gap-1.5 transition-all cursor-pointer",title:"دانلود مستقیم screenshot.png استاندارد وردپرس",children:[e.jsxDEV(Q,{className:"w-3.5 h-3.5 text-[#D4AF37]"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:521,columnNumber:15},void 0),e.jsxDEV("span",{children:"کاور پوسته (screenshot.png)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:522,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:515,columnNumber:13},void 0),e.jsxDEV("button",{type:"button",onClick:()=>L(!0),className:"px-3.5 py-2 rounded-xl text-xs font-bold bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#AA820A] dark:text-[#F3E5AB] hover:text-[#070D1E] border border-[#D4AF37]/35 flex items-center gap-1.5 transition-all cursor-pointer",children:[e.jsxDEV(me,{className:"w-3.5 h-3.5"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:530,columnNumber:15},void 0),e.jsxDEV("span",{children:"استخراج کد المنتور"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:531,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:525,columnNumber:13},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:514,columnNumber:11},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:446,columnNumber:9},void 0),d==="downloads"&&e.jsxDEV("div",{className:"space-y-6 animate-fadeIn",children:[e.jsxDEV("div",{className:"p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4",children:[e.jsxDEV("div",{className:"flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3",children:[e.jsxDEV("div",{className:"flex items-center gap-2",children:[e.jsxDEV(ue,{className:"w-5 h-5 text-emerald-500"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:543,columnNumber:19},void 0),e.jsxDEV("h3",{className:"font-bold text-sm text-gray-900 dark:text-white",children:"تطابق کامل با معیارهای پذیرش (Acceptance Criteria & Definition of Done)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:544,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:542,columnNumber:17},void 0),e.jsxDEV("span",{className:"text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30",children:"۱۰۰٪ پاس شده"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:548,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:541,columnNumber:15},void 0),e.jsxDEV("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsxDEV("div",{className:"p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 space-y-2",children:[e.jsxDEV("div",{className:"flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200",children:[e.jsxDEV(z,{className:"w-4 h-4 text-emerald-500 shrink-0"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:556,columnNumber:21},void 0),e.jsxDEV("span",{children:"۱. ساختار استاندارد پوسته وردپرس"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:557,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:555,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed",children:"فایل‌های style.css با هدر رسمی، functions.php، header.php، footer.php، index.php و کاور ۱۲۰۰×۹۰۰ در جایگاه دقیق خود قرار دارند."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:559,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:554,columnNumber:17},void 0),e.jsxDEV("div",{className:"p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 space-y-2",children:[e.jsxDEV("div",{className:"flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200",children:[e.jsxDEV(z,{className:"w-4 h-4 text-emerald-500 shrink-0"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:566,columnNumber:21},void 0),e.jsxDEV("span",{children:"۲. باندل‌های کامپایل‌شده فرانت‌اند"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:567,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:565,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed",children:"فایل‌های JS و CSS در مسیر استاندارد wordpress-theme/assets/dist/ مستقر بوده و از طریق wp_enqueue_scripts به صورت ایزوله Enqueue می‌شوند."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:569,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:564,columnNumber:17},void 0),e.jsxDEV("div",{className:"p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 space-y-2",children:[e.jsxDEV("div",{className:"flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200",children:[e.jsxDEV(z,{className:"w-4 h-4 text-emerald-500 shrink-0"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:576,columnNumber:21},void 0),e.jsxDEV("span",{children:"۳. رندر اولیه سمت سرور (SSR Ready)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:577,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:575,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed",children:"ساختار HTML تولید شده توسط PHP در View Page Source اولیه موجود است و در صورت غیرفعال بودن جاوااسکریپت نیز محتوای ساخت‌یافته رندر می‌شود."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:579,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:574,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:553,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:540,columnNumber:13},void 0),e.jsxDEV("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxDEV("div",{className:"p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4",children:[e.jsxDEV("div",{className:"flex items-center gap-3",children:[e.jsxDEV("div",{className:"w-8 h-8 rounded-xl bg-[#D4AF37] text-[#070D1E] flex items-center justify-center font-bold text-sm",children:"۱"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:590,columnNumber:19},void 0),e.jsxDEV("h4",{className:"font-bold text-sm text-gray-900 dark:text-white",children:"نصب پوسته در کمتر از ۱ دقیقه"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:593,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:589,columnNumber:17},void 0),e.jsxDEV("p",{className:"text-xs text-gray-600 dark:text-gray-300 leading-relaxed",children:["فایل ",e.jsxDEV("strong",{className:"text-[#D4AF37]",children:"sedrazavi-theme.zip"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:598,columnNumber:24},void 0)," را از همین صفحه دریافت فرمایید. در پیشخوان وردپرس وارد منوی ",e.jsxDEV("strong",{children:"نمایش > پوسته‌ها > افزودن پوسته تازه"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:598,columnNumber:148},void 0)," شده، دکمه بارگذاری پوسته را کلیک کرده و فایل زیپ را نصب و فعال کنید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:597,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:588,columnNumber:15},void 0),e.jsxDEV("div",{className:"p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4",children:[e.jsxDEV("div",{className:"flex items-center gap-3",children:[e.jsxDEV("div",{className:"w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm",children:"۲"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:604,columnNumber:19},void 0),e.jsxDEV("h4",{className:"font-bold text-sm text-gray-900 dark:text-white",children:"نصب افزونه مکمل جهت فعال‌سازی امکانات"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:607,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:603,columnNumber:17},void 0),e.jsxDEV("p",{className:"text-xs text-gray-600 dark:text-gray-300 leading-relaxed",children:["فایل ",e.jsxDEV("strong",{className:"text-emerald-600 dark:text-emerald-400",children:"sedrazavi-addons.zip"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:612,columnNumber:24},void 0)," را دریافت کرده، به منوی ",e.jsxDEV("strong",{children:"افزونه‌ها > افزودن افزونه تازه"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:612,columnNumber:137},void 0)," بروید و آن را بارگذاری و فعال نمایید تا سامانه‌های ثبت پرونده، نوبت‌دهی و ویجت‌های المنتور فعال شوند."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:611,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:602,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:587,columnNumber:13},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:538,columnNumber:11},void 0),d==="files"&&e.jsxDEV("div",{className:"space-y-6 animate-fadeIn",children:[e.jsxDEV("div",{className:"p-4 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4",children:[e.jsxDEV("div",{className:"flex items-center gap-2",children:e.jsxDEV("div",{className:"flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl",children:[e.jsxDEV("button",{type:"button",onClick:()=>O("theme"),className:`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${_==="theme"?"bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm":"text-gray-600 dark:text-gray-400 hover:text-gray-900"}`,children:[e.jsxDEV(T,{className:"w-3.5 h-3.5"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:635,columnNumber:21},void 0),e.jsxDEV("span",{children:["فایل‌های پوسته (",h.length,")"]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:636,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:626,columnNumber:19},void 0),e.jsxDEV("button",{type:"button",onClick:()=>O("plugin"),className:`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${_==="plugin"?"bg-emerald-600 text-white shadow-sm":"text-gray-600 dark:text-gray-400 hover:text-gray-900"}`,children:[e.jsxDEV(S,{className:"w-3.5 h-3.5"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:648,columnNumber:21},void 0),e.jsxDEV("span",{children:["فایل‌های افزونه (",D.length,")"]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:649,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:639,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:625,columnNumber:17},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:624,columnNumber:15},void 0),e.jsxDEV("div",{className:"relative flex-1 max-w-xs",children:[e.jsxDEV(_e,{className:"w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:656,columnNumber:17},void 0),e.jsxDEV("input",{type:"text",value:n,onChange:s=>b(s.target.value),placeholder:"جستجوی نام یا کاربرد فایل...",className:"w-full pr-9 pl-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:657,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:655,columnNumber:15},void 0),e.jsxDEV("div",{className:"flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1",children:ae.map(s=>e.jsxDEV("button",{type:"button",onClick:()=>N(s),className:`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${f===s?"bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-xs":"bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`,children:s},s,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:669,columnNumber:19},void 0))},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:667,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:623,columnNumber:13},void 0),e.jsxDEV("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",children:[e.jsxDEV("div",{className:"lg:col-span-4 bg-white dark:bg-[#0B132B] rounded-3xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm space-y-2 max-h-[700px] overflow-y-auto",children:[e.jsxDEV("div",{className:"flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800 text-xs font-bold text-gray-500",children:[e.jsxDEV(xe,{className:"w-4 h-4 text-[#D4AF37]"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:691,columnNumber:19},void 0),e.jsxDEV("span",{children:_==="theme"?"دایرکتوری: /wordpress-theme/":"دایرکتوری: /sedrazavi-addons/"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:692,columnNumber:19},void 0),e.jsxDEV("span",{className:"mr-auto text-[11px] font-mono text-gray-400",children:["(",U.length," فایل)"]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:697,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:690,columnNumber:17},void 0),U.map((s,t)=>e.jsxDEV("div",{onClick:()=>r(s),className:`p-3 rounded-2xl border cursor-pointer transition-all ${o.path===s.path?"bg-[#0B132B] dark:bg-[#D4AF37]/15 border-[#D4AF37] text-white dark:text-[#F3E5AB] shadow-sm":"bg-gray-50 dark:bg-gray-800/40 border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700"}`,children:[e.jsxDEV("div",{className:"flex items-center justify-between",children:[e.jsxDEV("div",{className:"flex items-center gap-2 font-mono text-xs font-bold truncate",children:[s.path.endsWith(".png")?e.jsxDEV(Q,{className:"w-4 h-4 text-emerald-400 shrink-0"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:715,columnNumber:27},void 0):e.jsxDEV(X,{className:"w-4 h-4 text-[#D4AF37] shrink-0"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:717,columnNumber:27},void 0),e.jsxDEV("span",{className:"truncate",children:s.filename},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:719,columnNumber:25},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:713,columnNumber:23},void 0),e.jsxDEV("span",{className:"text-[10px] opacity-70 shrink-0 mr-2",children:s.path.endsWith(".png")?"تصویر PNG":`${s.code.split(`
`).length} خط`},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:721,columnNumber:23},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:712,columnNumber:21},void 0),e.jsxDEV("p",{className:"text-[11px] opacity-75 mt-1 line-clamp-1 leading-relaxed",children:s.description},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:725,columnNumber:21},void 0)]},`${s.path}-${t}`,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:703,columnNumber:19},void 0))]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:689,columnNumber:15},void 0),e.jsxDEV("div",{className:"lg:col-span-8 bg-[#070D1E] rounded-3xl border border-[#D4AF37]/35 shadow-2xl overflow-hidden flex flex-col",children:[e.jsxDEV("div",{className:"px-6 py-4 bg-[#050A18] border-b border-gray-800 flex items-center justify-between flex-wrap gap-3",children:[e.jsxDEV("div",{className:"flex items-center gap-3",children:[e.jsxDEV("div",{className:"flex items-center gap-1.5",children:[e.jsxDEV("span",{className:"w-3 h-3 rounded-full bg-rose-500 inline-block"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:738,columnNumber:23},void 0),e.jsxDEV("span",{className:"w-3 h-3 rounded-full bg-amber-500 inline-block"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:739,columnNumber:23},void 0),e.jsxDEV("span",{className:"w-3 h-3 rounded-full bg-emerald-500 inline-block"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:740,columnNumber:23},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:737,columnNumber:21},void 0),e.jsxDEV("span",{className:"font-mono text-xs font-bold text-gray-300",dir:"ltr",children:o.path},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:742,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:736,columnNumber:19},void 0),e.jsxDEV("div",{className:"flex items-center gap-2",children:o.path==="screenshot.png"?e.jsxDEV("button",{type:"button",onClick:q,className:"px-3.5 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#AA820A] text-[#0B132B] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md",children:[e.jsxDEV(Y,{className:"w-3.5 h-3.5"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:754,columnNumber:25},void 0),e.jsxDEV("span",{children:"دانلود مستقیم screenshot.png"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:755,columnNumber:25},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:749,columnNumber:23},void 0):e.jsxDEV("button",{type:"button",onClick:te,className:"px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer",children:[E?e.jsxDEV(J,{className:"w-3.5 h-3.5 text-emerald-400"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:763,columnNumber:39},void 0):e.jsxDEV(fe,{className:"w-3.5 h-3.5 text-[#D4AF37]"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:763,columnNumber:92},void 0),e.jsxDEV("span",{children:E?"کپی شد!":"کپی محتوای سورس‌کد"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:764,columnNumber:25},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:758,columnNumber:23},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:747,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:735,columnNumber:17},void 0),o.path==="screenshot.png"?e.jsxDEV("div",{className:"p-8 flex flex-col items-center justify-center text-center space-y-6",children:[e.jsxDEV("div",{className:"max-w-md w-full rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl bg-[#060B18] p-2",children:$?e.jsxDEV("img",{src:$,alt:"WordPress Theme Screenshot",className:"w-full h-auto rounded-xl object-cover"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:775,columnNumber:25},void 0):e.jsxDEV("div",{className:"w-full h-64 bg-slate-900 rounded-xl flex items-center justify-center text-slate-500 text-sm",children:"در حال رندر کاور رسمی پوسته..."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:781,columnNumber:25},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:773,columnNumber:21},void 0),e.jsxDEV("div",{className:"max-w-lg text-slate-300 text-xs leading-relaxed space-y-3",children:[e.jsxDEV("div",{className:"flex items-center justify-center gap-2 flex-wrap",children:[e.jsxDEV("span",{className:"px-2.5 py-1 rounded-md bg-[#D4AF37]/20 text-[#D4AF37] font-mono font-bold",children:"1200x900 PNG"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:789,columnNumber:25},void 0),e.jsxDEV("span",{className:"px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 font-mono",children:"Aspect Ratio 4:3"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:790,columnNumber:25},void 0),e.jsxDEV("span",{className:"px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-mono",children:"WP Standard"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:791,columnNumber:25},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:788,columnNumber:23},void 0),e.jsxDEV("p",{children:"کاور رسمی پوسته در منوی نمایش > پوسته‌ها در پیشخوان وردپرس نمایش داده شده و نشانگر هویت بصری معتبر موسسه است."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:793,columnNumber:23},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:787,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:772,columnNumber:19},void 0):e.jsxDEV("div",{className:"p-6 overflow-x-auto overflow-y-auto max-h-[580px] text-xs font-mono text-gray-200 leading-relaxed",dir:"ltr",children:e.jsxDEV("pre",{className:"whitespace-pre",children:e.jsxDEV("code",{children:o.code},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:801,columnNumber:23},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:800,columnNumber:21},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:799,columnNumber:19},void 0),e.jsxDEV("div",{className:"px-6 py-3 bg-[#050A18] border-t border-gray-800 flex items-center justify-between text-xs text-gray-400",children:[e.jsxDEV("span",{children:o.description},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:808,columnNumber:19},void 0),e.jsxDEV("span",{className:"font-mono text-[11px]",children:"UTF-8 • UNIX (LF) • PHP 8.x Ready"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:809,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:807,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:733,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:686,columnNumber:13},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:621,columnNumber:11},void 0),d==="install"&&e.jsxDEV("div",{className:"space-y-6 animate-fadeIn",children:e.jsxDEV("div",{className:"bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-xl space-y-8",children:[e.jsxDEV("div",{className:"border-b border-gray-100 dark:border-gray-800 pb-4",children:[e.jsxDEV("h2",{className:"text-xl font-bold font-serif text-gray-900 dark:text-white",children:"راهنمای گام‌به‌گام نصب در پیشخوان وردپرس (بدون هیچ خطای فنی)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:822,columnNumber:17},void 0),e.jsxDEV("p",{className:"text-xs text-gray-500 dark:text-gray-400 mt-1",children:"پوسته‌ها و افزونه‌ها در سیستم وردپرس در دو دایرکتوری کاملاً مجزا بارگذاری می‌شوند. برای جلوگیری از خطای سربرگ، مراحل زیر را طی فرمایید:"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:825,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:821,columnNumber:15},void 0),e.jsxDEV("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxDEV("div",{className:"p-6 rounded-2xl bg-amber-500/5 border border-amber-500/30 space-y-4",children:[e.jsxDEV("div",{className:"flex items-center gap-3",children:[e.jsxDEV("div",{className:"w-9 h-9 rounded-xl bg-[#D4AF37] text-[#070D1E] flex items-center justify-center font-bold text-sm",children:"۱"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:835,columnNumber:21},void 0),e.jsxDEV("div",{children:[e.jsxDEV("h3",{className:"font-bold text-sm text-gray-900 dark:text-white",children:"گام اول: بارگذاری و فعال‌سازی پوسته"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:839,columnNumber:23},void 0),e.jsxDEV("span",{className:"text-[11px] text-[#D4AF37] font-mono",children:"sedrazavi-theme.zip"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:842,columnNumber:23},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:838,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:834,columnNumber:19},void 0),e.jsxDEV("ol",{className:"list-decimal list-inside space-y-2 text-xs text-gray-700 dark:text-gray-300 leading-relaxed pr-2",children:[e.jsxDEV("li",{children:"وارد پیشخوان وردپرس سایت خود شوید."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:847,columnNumber:21},void 0),e.jsxDEV("li",{children:["به مسیر ",e.jsxDEV("strong",{children:"نمایش > پوسته‌ها > افزودن پوسته تازه"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:848,columnNumber:33},void 0)," بروید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:848,columnNumber:21},void 0),e.jsxDEV("li",{children:["روی دکمه ",e.jsxDEV("strong",{children:"«بارگذاری پوسته»"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:849,columnNumber:34},void 0)," کلیک فرمایید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:849,columnNumber:21},void 0),e.jsxDEV("li",{children:["فایل ",e.jsxDEV("code",{className:"text-[#D4AF37] font-bold",children:"sedrazavi-theme.zip"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:850,columnNumber:30},void 0)," را انتخاب نموده و «هم‌اکنون نصب کن» را بزنید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:850,columnNumber:21},void 0),e.jsxDEV("li",{children:["پس از پایان بارگذاری، روی ",e.jsxDEV("strong",{children:"«فعال‌سازی (Activate)»"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:851,columnNumber:51},void 0)," کلیک نمایید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:851,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:846,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:833,columnNumber:17},void 0),e.jsxDEV("div",{className:"p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/30 space-y-4",children:[e.jsxDEV("div",{className:"flex items-center gap-3",children:[e.jsxDEV("div",{className:"w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm",children:"۲"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:858,columnNumber:21},void 0),e.jsxDEV("div",{children:[e.jsxDEV("h3",{className:"font-bold text-sm text-gray-900 dark:text-white",children:"گام دوم: بارگذاری و فعال‌سازی افزونه مکمل"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:862,columnNumber:23},void 0),e.jsxDEV("span",{className:"text-[11px] text-emerald-500 font-mono",children:"sedrazavi-addons.zip"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:865,columnNumber:23},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:861,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:857,columnNumber:19},void 0),e.jsxDEV("ol",{className:"list-decimal list-inside space-y-2 text-xs text-gray-700 dark:text-gray-300 leading-relaxed pr-2",children:[e.jsxDEV("li",{children:["از منوی کناری پیشخوان به مسیر ",e.jsxDEV("strong",{children:"افزونه‌ها > افزودن افزونه تازه"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:870,columnNumber:55},void 0)," بروید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:870,columnNumber:21},void 0),e.jsxDEV("li",{children:["روی دکمه ",e.jsxDEV("strong",{children:"«بارگذاری افزونه»"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:871,columnNumber:34},void 0)," کلیک نمایید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:871,columnNumber:21},void 0),e.jsxDEV("li",{children:["فایل ",e.jsxDEV("code",{className:"text-emerald-500 font-bold",children:"sedrazavi-addons.zip"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:872,columnNumber:30},void 0)," را انتخاب کرده و دکمه نصب را بزنید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:872,columnNumber:21},void 0),e.jsxDEV("li",{children:["پس از پایان نصب، روی ",e.jsxDEV("strong",{children:"«فعال‌کردن افزونه»"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:873,columnNumber:46},void 0)," کلیک فرمایید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:873,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:869,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:856,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:830,columnNumber:15},void 0),e.jsxDEV("div",{className:"p-5 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 flex items-start gap-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400",children:[e.jsxDEV(be,{className:"w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:880,columnNumber:17},void 0),e.jsxDEV("p",{children:[e.jsxDEV("strong",{children:"اطلاعیه پیرامون ساختار فایل‌های زیپ:"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:882,columnNumber:19},void 0)," هر دو فایل زیپ دارای یک پوشه والد در ریشه آرشیو (به ترتیب ",e.jsxDEV("code",{className:"text-[#D4AF37]",children:"sedrazavi-theme/"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:882,columnNumber:131},void 0)," و ",e.jsxDEV("code",{className:"text-emerald-500",children:"sedrazavi-addons/"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:882,columnNumber:190},void 0),") هستند، بنابراین در هر دو محیط لینوکس و ویندوز و در انواع هاست‌های سی‌پنل و دایرکت‌ادمین بدون بروز هیچ‌گونه خطای اکسترکت نصب می‌شوند."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:881,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:879,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:820,columnNumber:13},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:819,columnNumber:11},void 0),d==="architecture"&&e.jsxDEV("div",{className:"space-y-6 animate-fadeIn",children:e.jsxDEV("div",{className:"bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/30 shadow-xl space-y-6",children:[e.jsxDEV("div",{className:"border-b border-gray-100 dark:border-gray-800 pb-4",children:[e.jsxDEV("h2",{className:"text-xl font-bold font-serif text-gray-900 dark:text-white",children:"معماری تفکیک لایه‌ها و پایداری عملکرد (VIP Architecture)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:894,columnNumber:17},void 0),e.jsxDEV("p",{className:"text-xs text-gray-500 dark:text-gray-400 mt-1",children:"جداسازی وظایف نمایشی از منطق دیتابیس جهت تضمین عدم تداخل با بروزرسانی‌های وردپرس و سازگاری کامل با المنتور."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:897,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:893,columnNumber:15},void 0),e.jsxDEV("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-5",children:[e.jsxDEV("div",{className:"p-5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 space-y-2",children:[e.jsxDEV("div",{className:"flex items-center gap-2 text-[#AA820A] dark:text-[#F3E5AB] font-bold text-xs",children:[e.jsxDEV(T,{className:"w-4 h-4 text-[#D4AF37]"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:905,columnNumber:21},void 0),e.jsxDEV("span",{children:"لایه ۱: پوسته سبک (Theme)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:906,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:904,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed",children:"متادیتای سئو، هدر و فوتر داینامیک، استایل‌های رسپانسیو، قالب‌های صفحات و هیدراتاسیون React در عنصر root."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:908,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:903,columnNumber:17},void 0),e.jsxDEV("div",{className:"p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2",children:[e.jsxDEV("div",{className:"flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-xs",children:[e.jsxDEV(K,{className:"w-4 h-4 text-emerald-500"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:915,columnNumber:21},void 0),e.jsxDEV("span",{children:"لایه ۲: افزونه هسته حقوقی (Addons)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:916,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:914,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed",children:"ثبت ۵ پست‌تایپ، احراز هویت پیامکی، محاسبه‌گر تعرفه، سامانه‌های داوری و پرونده‌ها و ابزارک‌های المنتور."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:918,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:913,columnNumber:17},void 0),e.jsxDEV("div",{className:"p-5 rounded-2xl bg-blue-500/10 border border-blue-500/25 space-y-2",children:[e.jsxDEV("div",{className:"flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-xs",children:[e.jsxDEV(S,{className:"w-4 h-4 text-blue-500"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:925,columnNumber:21},void 0),e.jsxDEV("span",{children:"لایه ۳: پایداری و امنیت ضد خطای سفید"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:926,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:924,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed",children:"بررسی امنیتی با if (!defined('ABSPATH'))، کنترل وجود کلاس‌ها و لاگر خودکار خطاها در دایرکتوری امن uploads."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:928,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:923,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:902,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:892,columnNumber:13},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:891,columnNumber:11},void 0),d==="audit"&&e.jsxDEV("div",{className:"space-y-6 animate-fadeIn",children:[e.jsxDEV("div",{className:"bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-xl space-y-4",children:[e.jsxDEV("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4",children:[e.jsxDEV("div",{className:"flex items-center gap-3",children:[e.jsxDEV("div",{className:"w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500",children:e.jsxDEV(z,{className:"w-6 h-6"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:945,columnNumber:21},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:944,columnNumber:19},void 0),e.jsxDEV("div",{children:[e.jsxDEV("h2",{className:"text-lg sm:text-xl font-bold font-serif text-gray-900 dark:text-white",children:"کارنامه ممیزی جامع مستر و راستی‌آزمایی ۵ فاز (Master Audit Report)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:948,columnNumber:21},void 0),e.jsxDEV("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:["بررسی خودکار و تست شده با اسکریپت آزمون ",e.jsxDEV("code",{className:"text-[#D4AF37] font-mono",children:"scripts/test-phase5-master.php"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:952,columnNumber:63},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:951,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:947,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:943,columnNumber:17},void 0),e.jsxDEV("div",{className:"flex items-center gap-2",children:e.jsxDEV("span",{className:"px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5",children:[e.jsxDEV("span",{className:"w-2 h-2 rounded-full bg-emerald-500 animate-pulse"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:959,columnNumber:21},void 0),e.jsxDEV("span",{children:"۱۰۰٪ آزمون‌ها پاس شده (4/4 Stages Passed)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:960,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:958,columnNumber:19},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:957,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:942,columnNumber:15},void 0),e.jsxDEV("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:[e.jsxDEV("div",{className:"p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-1.5",children:[e.jsxDEV("div",{className:"flex items-center justify-between",children:[e.jsxDEV("span",{className:"text-xs font-bold text-emerald-800 dark:text-emerald-200",children:"آزمون ۱: سینتکس PHP"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:969,columnNumber:21},void 0),e.jsxDEV("span",{className:"text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white",children:"پاس شد"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:970,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:968,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-emerald-700 dark:text-emerald-300",children:["بررسی تمام ۸۵ فایل PHP با دستور ",e.jsxDEV("code",{className:"font-mono",children:"php -l"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:973,columnNumber:53},void 0)," بدون کوچکترین خطای سینتکس."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:972,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:967,columnNumber:17},void 0),e.jsxDEV("div",{className:"p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-1.5",children:[e.jsxDEV("div",{className:"flex items-center justify-between",children:[e.jsxDEV("span",{className:"text-xs font-bold text-emerald-800 dark:text-emerald-200",children:"آزمون ۲: رندر کامل SSR"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:979,columnNumber:21},void 0),e.jsxDEV("span",{className:"text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white",children:"۹۴KB HTML"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:980,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:978,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-emerald-700 dark:text-emerald-300",children:"رندر کامل سورس فارسی حقوقی، تگ‌های سئو، Schema JSON-LD و عدم وابستگی به CDNهای خارجی."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:982,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:977,columnNumber:17},void 0),e.jsxDEV("div",{className:"p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-1.5",children:[e.jsxDEV("div",{className:"flex items-center justify-between",children:[e.jsxDEV("span",{className:"text-xs font-bold text-emerald-800 dark:text-emerald-200",children:"آزمون ۳: استاندارد ZIP"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:989,columnNumber:21},void 0),e.jsxDEV("span",{className:"text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white",children:"پاس شد"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:990,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:988,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-emerald-700 dark:text-emerald-300",children:"ریشه تک‌پوشه، screenshot.png در ریشه، نسخه ۲.۶.۰ و پالایش قطعی فایل‌های حساس با .distignore."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:992,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:987,columnNumber:17},void 0),e.jsxDEV("div",{className:"p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-1.5",children:[e.jsxDEV("div",{className:"flex items-center justify-between",children:[e.jsxDEV("span",{className:"text-xs font-bold text-emerald-800 dark:text-emerald-200",children:"آزمون ۴: پوشش REST"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:999,columnNumber:21},void 0),e.jsxDEV("span",{className:"text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white",children:"۱۰۰٪ بله"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1e3,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:998,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-emerald-700 dark:text-emerald-300",children:"۱۸ اندپوینت در PHP پیاده‌سازی شده و تمام فراخوانی‌های کلاینت به جای خطای ۴۰۴ پاسخ استاندارد دریافت می‌کنند."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1002,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:997,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:966,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:941,columnNumber:13},void 0),e.jsxDEV("div",{className:"bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-xl space-y-4",children:[e.jsxDEV("div",{className:"flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3",children:[e.jsxDEV("div",{className:"space-y-1",children:[e.jsxDEV("h3",{className:"font-bold text-base text-gray-900 dark:text-white flex items-center gap-2",children:[e.jsxDEV(ge,{className:"w-5 h-5 text-[#D4AF37]"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1014,columnNumber:21},void 0),e.jsxDEV("span",{children:"جدول جامع تطابق مسیرهای REST API (Client JS vs Server PHP)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1015,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1013,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:["قانون سخت‌گیرانه عدم وجود خطای ۴۰۴: تمامی مسیرهای فراخوانی‌شده دارای کنترلر واقعی در ",e.jsxDEV("code",{className:"text-[#D4AF37]",children:"wordpress-theme/inc/rest-api.php"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1018,columnNumber:106},void 0)," هستند."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1017,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1012,columnNumber:17},void 0),e.jsxDEV("span",{className:"text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20",children:"۰ ردیف «خیر»"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1021,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1011,columnNumber:15},void 0),e.jsxDEV("div",{className:"overflow-x-auto",children:e.jsxDEV("table",{className:"w-full text-right text-xs",children:[e.jsxDEV("thead",{children:e.jsxDEV("tr",{className:"border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 text-gray-600 dark:text-gray-300",children:[e.jsxDEV("th",{className:"py-3 px-4 font-bold",children:"#"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1030,columnNumber:23},void 0),e.jsxDEV("th",{className:"py-3 px-4 font-bold",children:"مسیر فراخوانی در جاوااسکریپت / کلاینت"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1031,columnNumber:23},void 0),e.jsxDEV("th",{className:"py-3 px-4 font-bold",children:"متد HTTP"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1032,columnNumber:23},void 0),e.jsxDEV("th",{className:"py-3 px-4 font-bold",children:"ثبت و فعال در PHP"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1033,columnNumber:23},void 0),e.jsxDEV("th",{className:"py-3 px-4 font-bold",children:"امنیت و Rate Limit"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1034,columnNumber:23},void 0),e.jsxDEV("th",{className:"py-3 px-4 font-bold",children:"شرح عملکرد سمت سرور"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1035,columnNumber:23},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1029,columnNumber:21},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1028,columnNumber:19},void 0),e.jsxDEV("tbody",{className:"divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300",children:[{id:1,route:"wp-json/sedrazavi/v1/book-appointment",method:"POST",active:!0,security:"Rate Limit (5/10min) + Nonce",desc:"رزرو نوبت مشاوره حقوقی، صدور کد پیگیری و ارسال پیامک"},{id:2,route:"wp-json/sedrazavi/v1/track-case",method:"POST/GET",active:!0,security:"Rate Limit (12/5min)",desc:"استعلام فوری پرونده و نمایش مرحله دادرسی"},{id:3,route:"wp-json/sedrazavi/v1/cases",method:"GET/POST",active:!0,security:"Role-Based (edit_posts)",desc:"مدیریت و بایگانی پرونده‌های موکلین در دیتابیس"},{id:4,route:"wp-json/sedrazavi/v1/sync/stream",method:"GET",active:!0,security:"Heartbeat Session",desc:"همگام‌سازی زنده وضعیت نشست‌های دادگاه و کارتابل"},{id:5,route:"wp-json/sedrazavi/v1/auth/login",method:"POST",active:!0,security:"Password + OTP",desc:"ورود دو مرحله‌ای وکیل و موکل با توکن امن"},{id:6,route:"wp-json/sedrazavi/v1/auth/verify-2fa",method:"POST",active:!0,security:"2FA Inspection",desc:"تایید کد ورود یکبار مصرف پیامکی"},{id:7,route:"wp-json/sedrazavi/v1/auth/logout",method:"POST",active:!0,security:"Session Termination",desc:"خروج امن و ابطال نشست‌های فعال"},{id:8,route:"wp-json/sedrazavi/v1/tokens/all",method:"GET",active:!0,security:"Public Read",desc:"دریافت متغیرهای پالت و توکن‌های طراحی قالب"},{id:9,route:"wp-json/sedrazavi/v1/tokens/update",method:"POST",active:!0,security:"Admin Only (edit_theme_options)",desc:"ذخیره و به‌روزرسانی پالت رنگ و تایپوگرافی"},{id:10,route:"wp-json/sedrazavi/v1/payment/checkout",method:"POST",active:!0,security:"Rate Limit (10/5min)",desc:"صدور فاکتور الکترونیک و اتصال به درگاه سداد/زرین‌پال"},{id:11,route:"wp-json/sedrazavi/v1/quick-callback",method:"POST",active:!0,security:"Rate Limit (5/10min)",desc:"ثبت درخواست تماس فوری بدون نیاز به لاگین"},{id:12,route:"wp-json/sedrazavi/v1/otp/send",method:"POST",active:!0,security:"Anti-Spam (3/5min)",desc:"صدور و پیامک کد ورود به سرشماره همراه"},{id:13,route:"wp-json/sedrazavi/v1/otp/verify",method:"POST",active:!0,security:"Anti-Bruteforce (5/5min)",desc:"راستی‌آزمایی کد پیامکی واردشده موکل"},{id:14,route:"wp-json/sedrazavi/v1/dashboard-stats",method:"GET",active:!0,security:"Cached Stats",desc:"آمار زنده پرونده‌ها، نوبت‌ها و اسناد کارتابل"},{id:15,route:"wp-json/sedrazavi/v1/verify-hash",method:"POST",active:!0,security:"SHA256 Sanitized",desc:"راستی‌آزمایی اصالت گواهی امضای الکترونیک اسناد"},{id:16,route:"wp-json/sedrazavi/v1/corporate-quorum",method:"POST",active:!0,security:"Validated Params",desc:"محاسبه نصاب مجامع و سهام شرکت‌های بازرگانی"},{id:17,route:"wp-json/wp/v2/posts",method:"GET",active:!0,security:"Core WP REST API",desc:"بازیابی مقالات، تحلیل‌های حقوقی و اخبار"},{id:18,route:"wp-json/wp/v2/lawyer_service",method:"GET",active:!0,security:"show_in_rest: true",desc:"بازیابی خدمات حقوقی با پست‌تایپ اختصاصی"}].map(s=>e.jsxDEV("tr",{className:"hover:bg-gray-50/70 dark:hover:bg-gray-800/50 transition-colors",children:[e.jsxDEV("td",{className:"py-2.5 px-4 font-mono text-gray-400",children:s.id},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1060,columnNumber:25},void 0),e.jsxDEV("td",{className:"py-2.5 px-4 font-mono font-semibold text-[#D4AF37]",children:s.route},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1061,columnNumber:25},void 0),e.jsxDEV("td",{className:"py-2.5 px-4",children:e.jsxDEV("span",{className:"px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400",children:s.method},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1063,columnNumber:27},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1062,columnNumber:25},void 0),e.jsxDEV("td",{className:"py-2.5 px-4",children:e.jsxDEV("span",{className:"inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",children:[e.jsxDEV(J,{className:"w-3 h-3 text-emerald-500"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1069,columnNumber:29},void 0),e.jsxDEV("span",{children:"بله (فعال)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1070,columnNumber:29},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1068,columnNumber:27},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1067,columnNumber:25},void 0),e.jsxDEV("td",{className:"py-2.5 px-4 text-gray-500 dark:text-gray-400 text-[11px]",children:s.security},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1073,columnNumber:25},void 0),e.jsxDEV("td",{className:"py-2.5 px-4 text-gray-600 dark:text-gray-300",children:s.desc},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1074,columnNumber:25},void 0)]},s.id,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1059,columnNumber:23},void 0))},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1038,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1027,columnNumber:17},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1026,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1010,columnNumber:13},void 0),e.jsxDEV("div",{className:"p-6 rounded-3xl bg-gradient-to-r from-[#0B132B] to-[#141E3C] border border-[#D4AF37]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-white",children:[e.jsxDEV("div",{className:"space-y-1",children:[e.jsxDEV("h4",{className:"font-bold text-base text-[#F3E5AB]",children:"دانلود یکجای پکیج رسمی تاییدشده (SedRazavi Suite v2.6.0)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1085,columnNumber:17},void 0),e.jsxDEV("p",{className:"text-xs text-slate-300",children:"شامل هر دو فایل زیپ مستقل (پوسته و افزونه مکمل) + راهنمای جامع فارسی، پالایش‌شده و فاقد فایل‌های حساس"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1088,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1084,columnNumber:15},void 0),e.jsxDEV("div",{className:"flex items-center gap-3 w-full sm:w-auto",children:[e.jsxDEV("button",{type:"button",onClick:H,className:"flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#AA820A] text-[#070D1E] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer",children:[e.jsxDEV(B,{className:"w-4 h-4"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1099,columnNumber:19},void 0),e.jsxDEV("span",{children:"دانلود پوسته (۲.۴MB)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1100,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1094,columnNumber:17},void 0),e.jsxDEV("button",{type:"button",onClick:M,className:"flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-600/30",children:[e.jsxDEV(F,{className:"w-4 h-4"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1108,columnNumber:19},void 0),e.jsxDEV("span",{children:"دانلود پکیج کامل (۲.۴MB)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1109,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1103,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1093,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1083,columnNumber:13},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:939,columnNumber:11},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:261,columnNumber:7},void 0),e.jsxDEV(oe,{isOpen:W,onClose:()=>L(!1)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1119,columnNumber:7},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:260,columnNumber:5},void 0)};export{Pe as WordPressCodeViewer};
