<?php
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
        if (class_exists('SedRazavi_REST_API')) {
            return SedRazavi_REST_API::handle_track_case($request);
        }

        $params = $request->get_json_params() ?: $request->get_params();
        $case_no = isset($params['case_number']) ? sanitize_text_field($params['case_number']) : '';
        $phone   = isset($params['phone']) ? sanitize_text_field($params['phone']) : (isset($params['client_phone']) ? sanitize_text_field($params['client_phone']) : '');

        if (empty($case_no) || empty($phone)) {
            return new WP_Error('missing_param', 'شماره پرونده و تلفن همراه ثبت‌شده موکل الزامی است.', array('status' => 400));
        }

        $norm = function($p) {
            $p = str_replace(array('۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'), array('0','1','2','3','4','5','6','7','8','9'), $p);
            return ltrim(preg_replace('/[^\d]/', '', $p), '0');
        };

        $args = array(
            'post_type'      => 'sedrazavi_case',
            'posts_per_page' => 1,
            'meta_query'     => array(
                array(
                    'key'     => '_sedrazavi_case_number',
                    'value'   => $case_no,
                    'compare' => '=',
                ),
            ),
        );
        $query = new WP_Query($args);

        if ($query->have_posts()) {
            $query->the_post();
            $stored_phone = get_post_meta(get_the_ID(), '_sedrazavi_client_phone', true);
            if ($norm($stored_phone) === $norm($phone)) {
                $case_data = array(
                    'found'        => true,
                    'case_number'  => $case_no,
                    'case_type'    => get_post_meta(get_the_ID(), '_sedrazavi_case_type', true) ?: 'دعاوی حقوقی',
                    'status'       => get_post_meta(get_the_ID(), '_sedrazavi_case_status', true) ?: 'در جریان رسیدگی',
                    'court_branch' => get_post_meta(get_the_ID(), '_sedrazavi_court_branch', true) ?: 'شعبه دادگاه عمومی حقوقی',
                    'next_session' => get_post_meta(get_the_ID(), '_sedrazavi_next_session', true) ?: 'در نوبت تعیین وقت',
                    'updated_at'   => get_the_modified_date('Y/m/d'),
                );
                wp_reset_postdata();
                return rest_ensure_response($case_data);
            }
            wp_reset_postdata();
        }

        if (get_option('sedrazavi_demo_mode', false)) {
            return rest_ensure_response(array(
                'found'        => true,
                'is_demo'      => true,
                'demo_label'   => 'نمونه فرضی',
                'case_number'  => $case_no,
                'case_type'    => 'دعاوی حقوقی (نمونه)',
                'status'       => 'در جریان تبادل لوایح',
                'court_branch' => 'شعبه ۵ دادگاه تجدیدنظر (نمونه)',
                'next_session' => '۱۴۰۳/۰۸/۱۵',
                'updated_at'   => date('Y/m/d'),
            ));
        }

        return new WP_REST_Response(array(
            'found'   => false,
            'message' => 'پرونده‌ای با این مشخصات یافت نشد.',
        ), 404);
    }
}

if (!function_exists('sedrazavi_api_book_appointment_handler')) {
    function sedrazavi_api_book_appointment_handler($request) {
        if (class_exists('SedRazavi_REST_API')) {
            return SedRazavi_REST_API::handle_book_appointment($request);
        }

        $params = $request->get_json_params() ?: $request->get_params();
        $name  = isset($params['client_name']) ? sanitize_text_field($params['client_name']) : (isset($params['name']) ? sanitize_text_field($params['name']) : '');
        $phone = isset($params['client_phone']) ? sanitize_text_field($params['client_phone']) : (isset($params['phone']) ? sanitize_text_field($params['phone']) : '');
        $type  = isset($params['service_type']) ? sanitize_text_field($params['service_type']) : (isset($params['type']) ? sanitize_text_field($params['type']) : 'مشاوره حضوری');

        if (empty($phone) || empty($name)) {
            return new WP_Error('missing_params', 'نام و شماره تماس متقاضی الزامی است.', array('status' => 400));
        }

        $post_id = wp_insert_post(array(
            'post_title'   => 'نوبت مشاوره: ' . $name . ' (' . $phone . ')',
            'post_type'    => 'sedrazavi_appointment',
            'post_status'  => 'publish',
        ));

        if (!is_wp_error($post_id) && $post_id) {
            update_post_meta($post_id, '_sedrazavi_client_name', $name);
            update_post_meta($post_id, '_sedrazavi_client_phone', $phone);
            update_post_meta($post_id, '_sedrazavi_service_type', $type);
            update_post_meta($post_id, '_sedrazavi_created_at', current_time('mysql'));
        }

        $admin_email = get_option('admin_email');
        if (!empty($admin_email)) {
            wp_mail($admin_email, 'ثبت نوبت مشاوره: ' . $name, "نوبت جدید ثبت شد:\nنام: {$name}\nتلفن: {$phone}\nنوع: {$type}");
        }

        $sms_active = apply_filters('sedrazavi_sms_gateway_active', false);
        $sms_sent   = false;
        if ($sms_active) {
            $sms_sent = (bool) apply_filters('sedrazavi_send_sms', false, $phone, "نوبت شما ثبت شد.");
        }

        $msg = $sms_sent ? 'نوبت مشاوره با موفقیت ثبت شد. پیامک تأیید ارسال گردید.' : 'نوبت ثبت شد؛ دفتر با شما تماس می‌گیرد.';

        return rest_ensure_response(array(
            'success'    => true,
            'message'    => $msg,
            'booking_id' => $post_id,
            'sms_sent'   => $sms_sent,
        ));
    }
}

// ۹. تنظیم خودکار هدرهای CORS برای درخواست‌های فرانت‌اند
add_action('init', function () {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce");
});
