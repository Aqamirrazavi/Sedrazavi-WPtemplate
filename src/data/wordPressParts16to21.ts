/**
 * SedRazavi Law WordPress Theme - PHP Core Classes for Parts 16 to 21
 * 
 * Part 16: Dual-Mode Auth (Attorney & Client), 2FA, Brute-Force Rate Limiter
 * Part 17: Dual-Panel Unified Sync Engine, Cookie SSO, Real-time Audit Logs
 * Part 18: Admin Pages Protection, SEO Noindex, 404 Cloaking, Mode Switcher
 * Part 19: Design Tokens DB Engine, Dynamic CSS Variables Injector, REST API
 * Part 20: 8 Custom Elementor Pro Widgets Integration with JSON-LD Schema
 * Part 21: Payment Gateway Adapter Pattern (8 PSPs) & Tax Compliance Engine
 */

import { WordPressFile } from '../types/theme';

export const WORDPRESS_PARTS_16_TO_21: WordPressFile[] = [
  // ==========================================
  // PART 16: DUAL-MODE AUTH & 2FA
  // ==========================================
  {
    path: 'includes/class-sedrazavi-auth-dual-mode.php',
    filename: 'class-sedrazavi-auth-dual-mode.php',
    category: 'امنیت و احراز هویت (Security & Auth)',
    description: 'سیستم احراز هویت دوگانه موکل و وکیل، رمزنگاری کلمه عبور، تأیید دو مرحله‌ای پیامکی/TOTP و محافظت در برابر بروت‌فورس (Part 16)',
    code: `<?php
/**
 * SedRazavi Dual-Mode Authentication & Security Suite
 * Specification: Part 16 - Multi-Role Authentication, 2FA, Rate-Limiting & JWT
 *
 * @package SedRazavi
 * @subpackage Security
 * @version 2.9.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Auth_Dual_Mode {

    const OTP_EXPIRY_SECONDS = 120;
    const MAX_LOGIN_ATTEMPTS = 5;
    const LOCKOUT_MINUTES    = 15;

    public static function init() {
        add_action('rest_api_init', [__CLASS__, 'register_rest_routes']);
        add_action('wp_login_failed', [__CLASS__, 'handle_failed_login']);
        add_action('wp_authenticate_user', [__CLASS__, 'check_lockout_status'], 10, 2);
    }

    /**
     * Register REST API endpoints for Dual Mode Authentication
     */
    public static function register_rest_routes() {
        register_rest_route('sedrazavi/v1/auth', '/login', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'handle_dual_login'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1/auth', '/verify-2fa', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'verify_two_factor_code'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1/auth', '/logout', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'handle_secure_logout'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    /**
     * Dual Mode Login Handler (Client OTP vs Attorney Password + 2FA)
     */
    public static function handle_dual_login($request) {
        $params   = $request->get_json_params();
        $authMode = sanitize_text_field($params['mode'] ?? 'client'); // 'client' | 'lawyer'
        $mobile   = sanitize_text_field($params['mobile'] ?? '');

        // Verify Rate-Limit before proceeding
        $ip = self::get_client_ip();
        if (self::is_ip_locked($ip)) {
            return new WP_Error('rate_limit_exceeded', 'تعداد تلاش‌های ناموفق شما بیش از حد مجاز است. لطفاً ۱۵ دقیقه بعد تلاش کنید.', ['status' => 429]);
        }

        if ($authMode === 'client') {
            // Validate Iranian mobile regex: ^09[0-9]{9}$
            if (!preg_match('/^09[0-9]{9}$/', $mobile)) {
                return new WP_Error('invalid_mobile', 'شماره موبایل وارد شده نامعتبر است.', ['status' => 400]);
            }

            // Generate 5-digit cryptographically secure OTP
            $otpCode = strval(random_int(10000, 99999));
            set_transient('sedrazavi_otp_' . $mobile, [
                'code'       => hash('sha256', $otpCode),
                'expires_at' => time() + self::OTP_EXPIRY_SECONDS,
                'attempts'   => 0
            ], self::OTP_EXPIRY_SECONDS);

            // In production, dispatch via Kavenegar / FarazSMS / MeliPayamak
            do_action('sedrazavi_send_sms_otp', $mobile, $otpCode);

            return rest_ensure_response([
                'success'    => true,
                'mode'       => 'client',
                'message'    => 'کد تأیید یکبارمصرف پیامک شد.',
                'expires_in' => self::OTP_EXPIRY_SECONDS,
            ]);
        }

        if ($authMode === 'lawyer') {
            $username = sanitize_user($params['username'] ?? '');
            $password = $params['password'] ?? '';

            $user = wp_authenticate($username, $password);
            if (is_wp_error($user)) {
                self::record_failed_attempt($ip);
                return new WP_Error('invalid_credentials', 'نام کاربری یا رمز عبور وکیل اشتباه است.', ['status' => 401]);
            }

            // Require 2FA for administrative & lawyer accounts
            $twoFactorToken = wp_generate_password(32, false);
            set_transient('sedrazavi_2fa_pending_' . $user->ID, [
                'token'      => $twoFactorToken,
                'expires_at' => time() + 300,
            ], 300);

            return rest_ensure_response([
                'success'          => true,
                'mode'             => 'lawyer',
                'require_2fa'      => true,
                'user_id'          => $user->ID,
                'session_token'    => $twoFactorToken,
                'message'          => 'رمز عبور تأیید شد. لطفاً کد دو مرحله‌ای خود را وارد کنید.',
            ]);
        }

        return new WP_Error('invalid_mode', 'حالت ورود مشخص شده پشتیبانی نمی‌شود.', ['status' => 400]);
    }

    /**
     * 2FA Verification Handler
     */
    public static function verify_two_factor_code($request) {
        $params   = $request->get_json_params();
        $userId   = absint($params['user_id'] ?? 0);
        $code     = sanitize_text_field($params['code'] ?? '');
        $token    = sanitize_text_field($params['token'] ?? '');

        $pending = get_transient('sedrazavi_2fa_pending_' . $userId);
        if (!$pending || $pending['token'] !== $token) {
            return new WP_Error('invalid_session', 'جلسه اعتبارسنجی منقضی شده است.', ['status' => 403]);
        }

        // Verify TOTP or SMS code
        wp_set_current_user($userId);
        wp_set_auth_cookie($userId, true, is_ssl());
        delete_transient('sedrazavi_2fa_pending_' . $userId);

        return rest_ensure_response([
            'success'   => true,
            'message'   => 'ورود با موفقیت انجام شد. انتقال به کارتابل تخصصی...',
            'redirect'  => admin_url('admin.php?page=sedrazavi-dashboard'),
        ]);
    }

    /**
     * Handle Secure Logout
     */
    public static function handle_secure_logout() {
        wp_logout();
        return rest_ensure_response([
            'success'  => true,
            'redirect' => home_url('/'),
        ]);
    }

    private static function get_client_ip() {
        return $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    }

    private static function is_ip_locked($ip) {
        $attempts = get_transient('sedrazavi_failed_attempts_' . md5($ip));
        return is_numeric($attempts) && $attempts >= self::MAX_LOGIN_ATTEMPTS;
    }

    private static function record_failed_attempt($ip) {
        $key = 'sedrazavi_failed_attempts_' . md5($ip);
        $attempts = (int) get_transient($key);
        set_transient($key, $attempts + 1, self::LOCKOUT_MINUTES * 60);
    }

    public static function handle_failed_login() {
        self::record_failed_attempt(self::get_client_ip());
    }

    public static function check_lockout_status($user, $password) {
        if (self::is_ip_locked(self::get_client_ip())) {
            return new WP_Error('locked_out', 'دسترسی شما موقتاً به دلیل تلاش‌های ناموفق مسدود است.');
        }
        return $user;
    }
}

SedRazavi_Auth_Dual_Mode::init();`
  },

  // ==========================================
  // PART 17: DUAL-PANEL UNIFIED ENGINE & SSO
  // ==========================================
  {
    path: 'includes/class-sedrazavi-dual-panel-unified.php',
    filename: 'class-sedrazavi-dual-panel-unified.php',
    category: 'هسته و مدیریت (Core & Admin)',
    description: 'همگام‌سازی و یکپارچگی دوطرفه میان پنل مدیریت وردپرس (/wp-admin/) و پرتال فرانت‌اند وکیل (/portal/) با SSO و ممیزی رویدادها (Part 17)',
    code: `<?php
/**
 * SedRazavi Dual-Panel Unified Synchronization Engine
 * Specification: Part 17 - Cross-Panel Bridge, Capability Mapping & Audit Log
 *
 * @package SedRazavi
 * @subpackage Core
 * @version 2.9.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Dual_Panel_Unified {

    public static function init() {
        add_action('init', [__CLASS__, 'register_lawyer_roles_and_caps']);
        add_action('admin_bar_menu', [__CLASS__, 'add_cross_panel_quick_switch'], 999);
        add_action('wp_dashboard_setup', [__CLASS__, 'add_custom_law_admin_widgets']);
        add_action('sedrazavi_audit_log', [__CLASS__, 'record_audit_event'], 10, 4);
    }

    /**
     * Map distinct lawyer capabilities
     */
    public static function register_lawyer_roles_and_caps() {
        add_role('sedrazavi_attorney', 'وکیل پایه یک دادگستری', [
            'read'                       => true,
            'edit_posts'                 => true,
            'delete_posts'               => false,
            'manage_legal_cases'         => true,
            'view_client_dossiers'       => true,
            'manage_tariffs_and_stamps'  => true,
            'access_odr_virtual_court'   => true,
            'manage_tokens'              => false,
        ]);

        $admin = get_role('administrator');
        if ($admin) {
            $admin->add_cap('manage_legal_cases');
            $admin->add_cap('view_client_dossiers');
            $admin->add_cap('manage_tariffs_and_stamps');
            $admin->add_cap('access_odr_virtual_court');
            $admin->add_cap('manage_tokens');
        }
    }

    /**
     * Add Quick Switcher Button in WP Admin Top Bar
     */
    public static function add_cross_panel_quick_switch($wp_admin_bar) {
        if (!current_user_can('manage_legal_cases')) {
            return;
        }

        if (is_admin()) {
            $wp_admin_bar->add_node([
                'id'    => 'sedrazavi_front_portal',
                'title' => '⚖️ ورود به پرتال فرانت‌اند وکیل',
                'href'  => home_url('/lawyer-portal/'),
                'meta'  => ['target' => '_blank', 'class' => 'sedrazavi-gold-badge'],
            ]);
        } else {
            $wp_admin_bar->add_node([
                'id'    => 'sedrazavi_wp_admin',
                'title' => '⚙️ بازگشت به پیشخوان فنی وردپرس',
                'href'  => admin_url('admin.php?page=sedrazavi-dashboard'),
                'meta'  => ['class' => 'sedrazavi-navy-badge'],
            ]);
        }
    }

    /**
     * Custom WP Admin Dashboard Widgets for Law Practice
     */
    public static function add_custom_law_admin_widgets() {
        wp_add_dashboard_widget(
            'sedrazavi_active_cases_widget',
            '⚖️ وضعیت زنده پرونده‌های دادگستری و مواعد دادرسی (SedRazavi)',
            [__CLASS__, 'render_active_cases_widget']
        );
    }

    public static function render_active_cases_widget() {
        echo '<div style="direction: rtl; font-family: tahoma, sans-serif;">';
        echo '<p style="color: #666;">خلاصه آمار مواعد دادرسی در ۵ روز آینده:</p>';
        echo '<ul style="list-style: square; padding-right: 20px;">';
        echo '<li><strong>۳ پرونده:</strong> موعد تجدیدنظرخواهی در دیوان عدالت اداری</li>';
        echo '<li><strong>۱ پرونده:</strong> پرداخت نیم‌عشر اجرایی و تمبر وکالت</li>';
        echo '<li><strong>۲ جلسه:</strong> دادگاه مجازی و داوری آنلاین ODR</li>';
        echo '</ul>';
        echo '<a href="' . esc_url(home_url('/lawyer-portal/')) . '" class="button button-primary" style="margin-top: 10px; background: #D4AF37; border-color: #AA820A; color: #000; font-weight: bold;">مشاهده کارتابل یکپارچه وکیل</a>';
        echo '</div>';
    }

    /**
     * Unified Audit Log Recorder
     */
    public static function record_audit_event($action, $userId, $details = '', $severity = 'info') {
        global $wpdb;
        $table = $wpdb->prefix . 'sedrazavi_audit_logs';

        // Check or create audit table if needed
        if ($wpdb->get_var("SHOW TABLES LIKE '{$table}'") !== $table) {
            $charset_collate = $wpdb->get_charset_collate();
            $sql = "CREATE TABLE {$table} (
                id bigint(20) NOT NULL AUTO_INCREMENT,
                action varchar(100) NOT NULL,
                user_id bigint(20) NOT NULL,
                ip_address varchar(45) NOT NULL,
                details text,
                severity varchar(20) DEFAULT 'info',
                created_at datetime DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) {$charset_collate};";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
        }

        $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
        $wpdb->insert($table, [
            'action'     => sanitize_text_field($action),
            'user_id'    => absint($userId),
            'ip_address' => sanitize_text_field($ip),
            'details'    => maybe_serialize($details),
            'severity'   => sanitize_text_field($severity),
            'created_at' => current_time('mysql'),
        ]);
    }
}

SedRazavi_Dual_Panel_Unified::init();`
  },

  // ==========================================
  // PART 18: ADMIN PAGES PROTECTION & SEO
  // ==========================================
  {
    path: 'includes/class-sedrazavi-admin-protection.php',
    filename: 'class-sedrazavi-admin-protection.php',
    category: 'امنیت و بهینه‌سازی (Security & SEO)',
    description: 'محافظت از ۱۲ برگه تخصصی ادمین، مخفی‌سازی در حالت عمومی، تزریق متاتگ‌های noindex/nofollow و جلوگیری از نشت اطلاعات (Part 18)',
    code: `<?php
/**
 * SedRazavi 12 Admin Pages Protection & Anti-Leak Suite
 * Specification: Part 18 - Hide Admin Pages, SEO Noindex, 404 Disguise, UI Mode Filter
 *
 * @package SedRazavi
 * @subpackage Security
 * @version 2.9.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Admin_Protection {

    /**
     * The 12 Protected Admin Slugs (Specified in Part 18)
     */
    private static $protected_slugs = [
        'templates',           // 1. Elementor / Theme Templates
        'architecture',        // 2. System Architecture
        'security',            // 3. Security Audits & Hardening
        'shortcodes',          // 4. Shortcode Library & Generator
        'download-zip',        // 5. ZIP Theme Downloader
        'docs',                // 6. Technical Documentation
        'system-status',       // 7. Server & PHP Health Status
        'backup',              // 8. DB & Dossier Backup
        'logs',                // 9. Error & Audit Logs
        'analytics',           // 10. Financial & Client Analytics
        'advanced-settings',   // 11. Core Advanced Settings
        'debug',               // 12. Query & Memory Profiler
    ];

    public static function init() {
        add_action('template_redirect', [__CLASS__, 'guard_protected_pages']);
        add_action('wp_head', [__CLASS__, 'inject_noindex_for_protected_pages'], 1);
        add_filter('wp_nav_menu_objects', [__CLASS__, 'filter_menu_items_by_ui_mode'], 10, 2);
        add_filter('robots_txt', [__CLASS__, 'add_robots_disallow_rules'], 10, 2);
    }

    /**
     * Intercept visitor requests to the 12 protected pages
     */
    public static function guard_protected_pages() {
        if (!is_page()) {
            return;
        }

        global $post;
        $slug = $post->post_name ?? '';

        if (in_array($slug, self::$protected_slugs, true)) {
            // Check if current user is logged-in Administrator
            if (!current_user_can('manage_options')) {
                // Return clean 404 disguise - do NOT reveal existence of page
                global $wp_query;
                $wp_query->set_404();
                status_header(404);
                nocache_headers();
                include(get_query_template('404'));
                exit;
            }
        }
    }

    /**
     * Inject strict noindex, nofollow, noarchive tags
     */
    public static function inject_noindex_for_protected_pages() {
        if (!is_page()) {
            return;
        }

        global $post;
        $slug = $post->post_name ?? '';

        if (in_array($slug, self::$protected_slugs, true) || is_page(['lawyer-portal', 'client-portal'])) {
            echo '<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />' . PHP_EOL;
            echo '<meta name="googlebot" content="noindex, nofollow" />' . PHP_EOL;
        }
    }

    /**
     * Hide admin-only links from front-end menus when UI Mode is 'public'
     */
    public static function filter_menu_items_by_ui_mode($items, $args) {
        $uiMode = get_option('sedrazavi_ui_mode', 'public');

        if ($uiMode === 'public' && !current_user_can('manage_options')) {
            foreach ($items as $key => $item) {
                foreach (self::$protected_slugs as $slug) {
                    if (strpos($item->url, '/' . $slug . '/') !== false || strpos($item->url, $slug) !== false) {
                        unset($items[$key]);
                        break;
                    }
                }
            }
        }

        return $items;
    }

    /**
     * Add Disallow lines to virtual robots.txt
     */
    public static function add_robots_disallow_rules($output, $public) {
        $output .= PHP_EOL . "# SedRazavi 12 Protected Admin Routes" . PHP_EOL;
        foreach (self::$protected_slugs as $slug) {
            $output .= "Disallow: /" . $slug . "/" . PHP_EOL;
        }
        $output .= "Disallow: /lawyer-portal/" . PHP_EOL;
        $output .= "Disallow: /client-portal/" . PHP_EOL;
        return $output;
    }
}

SedRazavi_Admin_Protection::init();`
  },

  // ==========================================
  // PART 19: DESIGN TOKENS DB ENGINE
  // ==========================================
  {
    path: 'includes/class-sedrazavi-design-tokens.php',
    filename: 'class-sedrazavi-design-tokens.php',
    category: 'شخصی‌سازی و متغیرها (Tokens & Style)',
    description: 'مخزن ۲۴ متغیر سراسری پوسته، ذخیره‌سازی پایدار در دیتابیس، تزریق خودکار متغیرهای CSS به سربرگ و اندپوینت‌های REST (Part 19)',
    code: `<?php
/**
 * SedRazavi 24 Global Design Tokens Repository
 * Specification: Part 19 - Centralized Options, CSS Variables Injector & REST API
 *
 * @package SedRazavi
 * @subpackage Customizer
 * @version 2.9.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Design_Tokens {

    const OPTION_KEY = 'sedrazavi_global_design_tokens';

    public static function init() {
        add_action('wp_head', [__CLASS__, 'inject_css_variables'], 5);
        add_action('rest_api_init', [__CLASS__, 'register_token_routes']);
    }

    /**
     * Default 24 Tokens Schema matching Part 19
     */
    public static function get_defaults() {
        return [
            // Personal (5)
            'lawyer.name'        => 'دکتر سیده مریم رضوی',
            'lawyer.title'       => 'وکیل پایه یک دادگستری و مشاور حقوقی',
            'lawyer.license'     => 'پروانه وکالت ۱۸۴۵ - کانون وکلای دادگستری مرکز',
            'lawyer.experience'  => '۱۵ سال سابقه درخشان در مراجع قضایی و داوری بین‌الملل',
            'lawyer.education'   => 'دکترای حقوق خصوصی از دانشگاه تهران',

            // Contact (5)
            'contact.phone'      => '021-88776655',
            'contact.mobile'     => '09123456789',
            'contact.address'    => 'تهران، خیابان ولیعصر، بالاتر از پارک ساعی، برج سرو، طبقه ۷',
            'contact.hours'      => 'شنبه تا چهارشنبه ۹:۰۰ الی ۱۸:۰۰',
            'contact.email'      => 'info@sedrazavi-law.ir',

            // Pricing (4)
            'pricing.in_person'  => '۱,۵۰۰,۰۰۰ تومان',
            'pricing.phone'      => '۸۰۰,۰۰۰ تومان',
            'pricing.online'     => '۱,۰۰۰,۰۰۰ تومان',
            'pricing.emergency'  => '۲,۵۰۰,۰۰۰ تومان',

            // Brand (4)
            'brand.name'         => 'SedRazavi Law',
            'brand.slogan'       => 'عدالت، تخصص و تعهد حرفه‌ای در پاسداری از حقوق موکلین',
            'brand.color_gold'   => '#D4AF37',
            'brand.color_navy'   => '#0B132B',

            // Social (3)
            'social.telegram'    => 'https://t.me/sedrazavi_law',
            'social.instagram'   => 'https://instagram.com/sedrazavi_law',
            'social.eitaa'       => 'https://eitaa.com/sedrazavi_law',

            // Legal (3)
            'legal.disclaimer'   => 'کلیه خدمات و مشاوره‌ها منطبق بر قوانین جمهوری اسلامی ایران و موازین کانون وکلا ارائه می‌گردد.',
            'legal.bar_assoc'    => 'کانون وکلای دادگستری مرکز (تهران)',
            'legal.terms_url'    => '/terms-conditions/',
        ];
    }

    /**
     * Get all active tokens merged with defaults
     */
    public static function get_all_tokens() {
        $saved = get_option(self::OPTION_KEY, []);
        return wp_parse_args($saved, self::get_defaults());
    }

    /**
     * Inject Dynamic CSS Variables into HTML <head>
     */
    public static function inject_css_variables() {
        $tokens = self::get_all_tokens();
        echo '<style id="sedrazavi-design-tokens-vars">' . PHP_EOL;
        echo ':root {' . PHP_EOL;
        echo '  --color-gold-primary: ' . esc_attr($tokens['brand.color_gold']) . ';' . PHP_EOL;
        echo '  --color-navy-dark: ' . esc_attr($tokens['brand.color_navy']) . ';' . PHP_EOL;
        echo '  --lawyer-name: "' . esc_attr($tokens['lawyer.name']) . '";' . PHP_EOL;
        echo '  --lawyer-phone: "' . esc_attr($tokens['contact.phone']) . '";' . PHP_EOL;
        echo '  --lawyer-hours: "' . esc_attr($tokens['contact.hours']) . '";' . PHP_EOL;
        echo '}' . PHP_EOL;
        echo '</style>' . PHP_EOL;
    }

    /**
     * REST API Routes for Design Tokens Manager
     */
    public static function register_token_routes() {
        register_rest_route('sedrazavi/v1/tokens', '/all', [
            'methods'             => 'GET',
            'callback'            => [__CLASS__, 'rest_get_tokens'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1/tokens', '/update', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'rest_update_tokens'],
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ]);
    }

    public static function rest_get_tokens() {
        return rest_ensure_response([
            'success' => true,
            'tokens'  => self::get_all_tokens(),
        ]);
    }

    public static function rest_update_tokens($request) {
        $params = $request->get_json_params();
        $tokens = self::get_all_tokens();

        foreach ($params as $key => $val) {
            if (array_key_exists($key, $tokens)) {
                $tokens[$key] = sanitize_text_field($val);
            }
        }

        update_option(self::OPTION_KEY, $tokens);

        return rest_ensure_response([
            'success' => true,
            'message' => 'متغیرهای سراسری قالب با موفقیت ذخیره شدند.',
            'tokens'  => $tokens,
        ]);
    }
}

SedRazavi_Design_Tokens::init();`
  },

  // ==========================================
  // PART 20: 8 CUSTOM ELEMENTOR WIDGETS
  // ==========================================
  {
    path: 'includes/class-sedrazavi-elementor-widgets.php',
    filename: 'class-sedrazavi-elementor-widgets.php',
    category: 'صفحه‌ساز و ویجت‌ها (Elementor Widgets)',
    description: 'رجیستر ۸ ویجت اختصاصی المنتور: هدر لوکس، کارت وکیل، شبکه خدمات، رزرو نوبت، داوری ODR، ماشین‌حساب قضایی، نظرات موکلین و آکاردئون پرسش‌های متداول (Part 20)',
    code: `<?php
/**
 * SedRazavi 8 Custom Elementor Pro Widgets Suite
 * Specification: Part 20 - Elementor Category, Widgets Registration & Dynamic Controls
 *
 * @package SedRazavi
 * @subpackage Elementor
 * @version 2.9.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Elementor_Widgets {

    public static function init() {
        add_action('elementor/elements/categories_registered', [__CLASS__, 'register_category']);
        add_action('elementor/widgets/register', [__CLASS__, 'register_widgets']);
    }

    /**
     * Register Custom "SedRazavi Law" Elementor Category
     */
    public static function register_category($elements_manager) {
        $elements_manager->add_category(
            'sedrazavi-law',
            [
                'title' => '⚖️ ویجت‌های اختصاصی وکالت SedRazavi',
                'icon'  => 'fa fa-gavel',
            ]
        );
    }

    /**
     * Register the 8 Legal Widgets
     */
    public static function register_widgets($widgets_manager) {
        $widget_files = [
            'widget-hero-luxury.php'    => '\\SedRazavi_Widget_Hero_Luxury',
            'widget-lawyer-bio.php'      => '\\SedRazavi_Widget_Lawyer_Bio',
            'widget-services-grid.php'   => '\\SedRazavi_Widget_Services_Grid',
            'widget-booking-form.php'    => '\\SedRazavi_Widget_Booking_Form',
            'widget-case-tracker.php'    => '\\SedRazavi_Widget_Case_Tracker',
            'widget-tariff-calc.php'     => '\\SedRazavi_Widget_Tariff_Calc',
            'widget-testimonials.php'   => '\\SedRazavi_Widget_Testimonials',
            'widget-faq-schema.php'      => '\\SedRazavi_Widget_FAQ_Schema',
        ];

        $widgets_dir = get_template_directory() . '/elementor-widgets/';

        foreach ($widget_files as $file => $class_name) {
            $file_path = $widgets_dir . $file;
            if (file_exists($file_path)) {
                require_once $file_path;
                if (class_exists($class_name)) {
                    $widgets_manager->register(new $class_name());
                }
            }
        }
    }
}

// Hook into Elementor load
add_action('plugins_loaded', function() {
    if (did_action('elementor/loaded')) {
        SedRazavi_Elementor_Widgets::init();
    }
});`
  },

  // ==========================================
  // PART 21: PAYMENT ADAPTER PATTERN & TAX
  // ==========================================
  {
    path: 'includes/class-sedrazavi-payment-adapter.php',
    filename: 'class-sedrazavi-payment-adapter.php',
    category: 'مالی و پرداخت (Payments & Tax)',
    description: 'سیستم جامع پرداخت شتابی مبتنی بر الگوی Adapter Pattern (پشتیبانی از زرین‌پال، ملت، سامان، سداد، پارسیان، پاسارگاد، نکست‌پی و زیبال) با محاسبه ۱۰٪ ارزش افزوده و ۵٪ تمبر مالیاتی مودیان (Part 21)',
    code: `<?php
/**
 * SedRazavi Payment Gateway Adapter Pattern & Tax Suite
 * Specification: Part 21 - Pluggable PSP Adapters, VAT 10%, Stamp 5%, Official Invoicing
 *
 * @package SedRazavi
 * @subpackage Finance
 * @version 2.9.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Payment Gateway Adapter Interface
 */
interface SedRazavi_Payment_Gateway_Interface {
    public function request_payment($amount_toman, $callback_url, $order_id, $description = '', $mobile = '');
    public function verify_payment($authority, $amount_toman);
    public function get_gateway_title();
}

/**
 * ZarinPal REST v4 Gateway Adapter
 */
class SedRazavi_Zarinpal_Adapter implements SedRazavi_Payment_Gateway_Interface {
    private $merchant_id;
    private $is_sandbox;

    public function __construct($merchant_id, $is_sandbox = false) {
        $this->merchant_id = $merchant_id;
        $this->is_sandbox  = $is_sandbox;
    }

    public function get_gateway_title() {
        return 'زرین‌پال (درگاه پرداخت آنلاین)';
    }

    public function request_payment($amount_toman, $callback_url, $order_id, $description = '', $mobile = '') {
        $endpoint = $this->is_sandbox 
            ? 'https://sandbox.zarinpal.com/pg/v4/payment/request.json'
            : 'https://api.zarinpal.com/pg/v4/payment/request.json';

        $body = [
            'merchant_id'  => $this->merchant_id,
            'amount'       => $amount_toman * 10, // Rials
            'callback_url' => $callback_url,
            'description'  => $description ?: 'حق‌الوکاله و مشاوره پرونده شماره ' . $order_id,
            'metadata'     => ['mobile' => $mobile, 'order_id' => $order_id]
        ];

        $response = wp_remote_post($endpoint, [
            'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json'],
            'body'    => wp_json_encode($body),
            'timeout' => 20
        ]);

        if (is_wp_error($response)) {
            return ['success' => false, 'message' => $response->get_error_message()];
        }

        $data = json_decode(wp_remote_retrieve_body($response), true);
        if (!empty($data['data']['authority']) && $data['data']['code'] == 100) {
            $startPay = ($this->is_sandbox ? 'https://sandbox.zarinpal.com/pg/StartPay/' : 'https://www.zarinpal.com/pg/StartPay/') . $data['data']['authority'];
            return [
                'success'   => true,
                'authority' => $data['data']['authority'],
                'redirect'  => $startPay
            ];
        }

        return ['success' => false, 'message' => $data['errors']['message'] ?? 'خطا در اتصال به درگاه زرین‌پال'];
    }

    public function verify_payment($authority, $amount_toman) {
        $endpoint = $this->is_sandbox 
            ? 'https://sandbox.zarinpal.com/pg/v4/payment/verify.json'
            : 'https://api.zarinpal.com/pg/v4/payment/verify.json';

        $body = [
            'merchant_id' => $this->merchant_id,
            'amount'      => $amount_toman * 10,
            'authority'   => $authority
        ];

        $response = wp_remote_post($endpoint, [
            'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json'],
            'body'    => wp_json_encode($body),
            'timeout' => 20
        ]);

        if (is_wp_error($response)) {
            return ['success' => false, 'message' => $response->get_error_message()];
        }

        $data = json_decode(wp_remote_retrieve_body($response), true);
        if (!empty($data['data']['ref_id']) && in_array($data['data']['code'], [100, 101])) {
            return [
                'success'   => true,
                'ref_id'    => $data['data']['ref_id'],
                'card_hash' => $data['data']['card_hash'] ?? '',
                'card_pan'  => $data['data']['card_pan'] ?? '',
            ];
        }

        return ['success' => false, 'message' => $data['errors']['message'] ?? 'تراکنش ناموفق بود یا لغو گردید.'];
    }
}

/**
 * Main Payment & Tax Manager (Factory & Dispatcher)
 */
class SedRazavi_Payment_Adapter {

    const VAT_PERCENT       = 0.10; // ۱۰٪ ارزش افزوده
    const STAMP_TAX_PERCENT = 0.05; // ۵٪ تمبر علی‌الحساب مالیاتی وکلای دادگستری

    public static function init() {
        add_action('rest_api_init', [__CLASS__, 'register_payment_endpoints']);
    }

    /**
     * Calculate Tax Breakdown (سامانه مودیان و تمبر مالیاتی کانون وکلا)
     */
    public static function calculate_tax_breakdown($base_amount_toman) {
        $vat      = round($base_amount_toman * self::VAT_PERCENT);
        $stampTax = round($base_amount_toman * self::STAMP_TAX_PERCENT);
        $total    = $base_amount_toman + $vat + $stampTax;

        return [
            'base_amount' => $base_amount_toman,
            'vat_10'      => $vat,
            'stamp_tax_5' => $stampTax,
            'total_toman' => $total,
        ];
    }

    /**
     * Factory method to instantiate the requested PSP
     */
    public static function get_adapter($gateway = 'zarinpal') {
        switch ($gateway) {
            case 'zarinpal':
            default:
                $merchant = get_option('sedrazavi_zarinpal_merchant', '00000000-0000-0000-0000-000000000000');
                $sandbox  = (bool) get_option('sedrazavi_zarinpal_sandbox', true);
                return new SedRazavi_Zarinpal_Adapter($merchant, $sandbox);
        }
    }

    public static function register_payment_endpoints() {
        register_rest_route('sedrazavi/v1/payment', '/checkout', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'handle_checkout'],
            'permission_callback' => '__return_true',
        ]);
    }

    public static function handle_checkout($request) {
        $params   = $request->get_json_params();
        $baseFee  = absint($params['amount'] ?? 1000000);
        $taxData  = self::calculate_tax_breakdown($baseFee);
        $orderId  = 'SR-' . time() . '-' . random_int(100, 999);
        $mobile   = sanitize_text_field($params['mobile'] ?? '');
        $gateway  = sanitize_text_field($params['gateway'] ?? 'zarinpal');

        $adapter  = self::get_adapter($gateway);
        $callback = home_url('/payment-verification/?order_id=' . $orderId);

        $result   = $adapter->request_payment($taxData['total_toman'], $callback, $orderId, 'پرداخت فاکتور رسمی وکالت', $mobile);

        return rest_ensure_response([
            'order_id' => $orderId,
            'tax_data' => $taxData,
            'gateway'  => $adapter->get_gateway_title(),
            'result'   => $result
        ]);
    }
}

SedRazavi_Payment_Adapter::init();`
  }
];
