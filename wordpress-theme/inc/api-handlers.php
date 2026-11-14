<?php
/**
 * SedRazavi Custom REST API Handlers & Profile Settings Engine
 *
 * Implements secure REST API endpoints allowing the React front-end to safely save
 * and retrieve user-customized profile settings (color themes, contact details, typography)
 * into the WordPress database via WordPress options.
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_API_Handlers {

    const REST_NAMESPACE = 'sedrazavi/v1';

    /**
     * Initialize REST routes
     */
    public static function init() {
        add_action('rest_api_init', [__CLASS__, 'register_profile_routes']);
        add_action('wp_ajax_sedrazavi_send_reply_email', [__CLASS__, 'handle_ajax_send_reply_email']);
        add_action('wp_ajax_sedrazavi_moderate_comment_action', [__CLASS__, 'handle_ajax_moderate_comment']);
    }

    /**
     * Register endpoints for profile settings
     */
    public static function register_profile_routes() {
        // Save user-customized profile settings (Color themes, contact details, bio)
        register_rest_route(self::REST_NAMESPACE, '/profile/save', [
            'methods'             => ['POST'],
            'callback'            => [__CLASS__, 'handle_save_profile_settings'],
            'permission_callback' => [__CLASS__, 'check_save_permissions'],
            'args'                => [
                'profile' => [
                    'required'          => false,
                    'type'              => 'object',
                    'description'       => 'Profile payload containing color themes, contact details, and credentials',
                ],
            ],
        ]);

        // Get saved user-customized profile settings
        register_rest_route(self::REST_NAMESPACE, '/profile/get', [
            'methods'             => ['GET'],
            'callback'            => [__CLASS__, 'handle_get_profile_settings'],
            'permission_callback' => '__return_true',
        ]);

        // Quick alias endpoint for design tokens sync
        register_rest_route(self::REST_NAMESPACE, '/settings/customizer', [
            'methods'             => ['GET', 'POST'],
            'callback'            => [__CLASS__, 'handle_customizer_sync'],
            'permission_callback' => [__CLASS__, 'check_save_permissions'],
        ]);
    }

    /**
     * Permission check: Requires manage_options or edit_theme_options capability AND valid nonce
     * A nonce alone is NOT authorization; capability is strictly mandatory.
     */
    public static function check_save_permissions($request) {
        // 1. Mandatory Capability check
        if (!current_user_can('manage_options') && !current_user_can('edit_theme_options')) {
            return new WP_Error(
                'rest_forbidden_capability',
                esc_html__('شما مجوز تغییر تنظیمات سراسری پوسته و مشخصات سازمانی را ندارید.', 'sedrazavi'),
                ['status' => 403]
            );
        }

        // 2. Mandatory CSRF Nonce check
        $nonce = $request->get_header('x-wp-nonce') ?: $request->get_header('X-WP-Nonce');
        if (!$nonce || !wp_verify_nonce($nonce, 'wp_rest')) {
            return new WP_Error(
                'rest_invalid_nonce',
                esc_html__('اعتبار نانس امنیتی نامعتبر یا منقضی شده است.', 'sedrazavi'),
                ['status' => 403]
            );
        }

        return true;
    }

    /**
     * Handle saving user-customized profile settings
     */
    public static function handle_save_profile_settings($request) {
        $params = $request->get_json_params();
        if (empty($params)) {
            $params = $request->get_params();
        }

        // If nested under 'profile', extract it
        $data = isset($params['profile']) && is_array($params['profile']) ? $params['profile'] : $params;

        // Fetch existing saved profile or defaults
        $current_profile = get_option('sedrazavi_lawyer_profile', []);
        if (!is_array($current_profile)) {
            $current_profile = [];
        }

        // 1. Sanitize Identity & Contact Info
        $sanitized_name      = isset($data['name']) ? sanitize_text_field(wp_unslash($data['name'])) : (isset($data['lawyerName']) ? sanitize_text_field(wp_unslash($data['lawyerName'])) : ($current_profile['name'] ?? 'سرکار خانم دکتر سیده مریم رضوی'));
        $sanitized_title     = isset($data['title']) ? sanitize_text_field(wp_unslash($data['title'])) : (isset($data['lawyerTitle']) ? sanitize_text_field(wp_unslash($data['lawyerTitle'])) : ($current_profile['title'] ?? 'وکیل پایه یک دادگستری و مشاور ارشد حقوقی'));
        $sanitized_license   = isset($data['licenseNumber']) ? sanitize_text_field(wp_unslash($data['licenseNumber'])) : ($current_profile['licenseNumber'] ?? '۱۸۴۵۲ / ک.و.م');
        $sanitized_phone     = isset($data['phone']) ? sanitize_text_field(wp_unslash($data['phone'])) : ($current_profile['phone'] ?? '۰۲۱-۸۸۹۹۰۰۱۱');
        $sanitized_mobile    = isset($data['mobile']) ? sanitize_text_field(wp_unslash($data['mobile'])) : ($current_profile['mobile'] ?? '۰۹۱۲-۳۴۵۶۷۸۹');
        $sanitized_emergency = isset($data['emergencyPhone']) ? sanitize_text_field(wp_unslash($data['emergencyPhone'])) : ($current_profile['emergencyPhone'] ?? '۰۲۱-۸۸۷۷۶۶۵۵');
        $sanitized_email     = isset($data['email']) ? sanitize_email($data['email']) : ($current_profile['email'] ?? 'dr.sedrazavi@law-firm.ir');
        $sanitized_address   = isset($data['address']) ? sanitize_textarea_field(wp_unslash($data['address'])) : ($current_profile['address'] ?? 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج حقوقی SedRazavi، طبقه ۷');
        $sanitized_hours     = isset($data['workingHours']) ? sanitize_text_field(wp_unslash($data['workingHours'])) : ($current_profile['workingHours'] ?? 'شنبه تا چهارشنبه ۹:۰۰ الی ۱۸:۰۰');

        // 2. Sanitize Color Theme & Design Tokens
        $sanitized_primary   = isset($data['primaryColor']) ? sanitize_hex_color($data['primaryColor']) : ($current_profile['primaryColor'] ?? '#0B132B');
        $sanitized_gold      = isset($data['goldColor']) ? sanitize_hex_color($data['goldColor']) : (isset($data['secondaryColor']) ? sanitize_hex_color($data['secondaryColor']) : ($current_profile['goldColor'] ?? '#D4AF37'));
        $sanitized_accent    = isset($data['accentColor']) ? sanitize_hex_color($data['accentColor']) : ($current_profile['accentColor'] ?? '#2A9D8F');
        $sanitized_theme     = isset($data['activeTheme']) ? sanitize_key($data['activeTheme']) : ($current_profile['activeTheme'] ?? 'royal-gold');
        $sanitized_dark_mode = isset($data['isDarkMode']) ? (bool) $data['isDarkMode'] : ($current_profile['isDarkMode'] ?? false);

        // 3. Social & Messenger Handles
        $sanitized_telegram  = isset($data['telegramHandle']) ? sanitize_text_field(wp_unslash($data['telegramHandle'])) : ($current_profile['telegramHandle'] ?? '@sedrazavi');
        $sanitized_instagram = isset($data['instagramHandle']) ? sanitize_text_field(wp_unslash($data['instagramHandle'])) : ($current_profile['instagramHandle'] ?? '@dr_maryam_sedrazavi');
        $sanitized_whatsapp  = isset($data['whatsappNumber']) ? sanitize_text_field(wp_unslash($data['whatsappNumber'])) : ($current_profile['whatsappNumber'] ?? '۰۹۱۲۳۴۵۶۷۸۹');

        // Construct master profile object
        $updated_profile = [
            'name'            => $sanitized_name,
            'title'           => $sanitized_title,
            'licenseNumber'   => $sanitized_license,
            'phone'           => $sanitized_phone,
            'mobile'          => $sanitized_mobile,
            'emergencyPhone'  => $sanitized_emergency,
            'email'           => $sanitized_email,
            'address'         => $sanitized_address,
            'workingHours'    => $sanitized_hours,
            'primaryColor'    => $sanitized_primary ?: '#0B132B',
            'goldColor'       => $sanitized_gold ?: '#D4AF37',
            'accentColor'     => $sanitized_accent ?: '#2A9D8F',
            'activeTheme'     => $sanitized_theme,
            'isDarkMode'      => $sanitized_dark_mode,
            'telegramHandle'  => $sanitized_telegram,
            'instagramHandle' => $sanitized_instagram,
            'whatsappNumber'  => $sanitized_whatsapp,
            'updated_at'      => current_time('mysql'),
            'updated_by'      => get_current_user_id() ?: 'admin',
        ];

        // Save master object
        update_option('sedrazavi_lawyer_profile', $updated_profile);

        // Also update individual options for seamless WordPress Customizer and template integration
        update_option('sedrazavi_lawyer_name', $sanitized_name);
        update_option('sedrazavi_lawyer_title', $sanitized_title);
        update_option('sedrazavi_lawyer_license', $sanitized_license);
        update_option('sedrazavi_lawyer_phone', $sanitized_phone);
        update_option('sedrazavi_lawyer_mobile', $sanitized_mobile);
        update_option('sedrazavi_lawyer_address', $sanitized_address);
        update_option('sedrazavi_primary_color', $updated_profile['primaryColor']);
        update_option('sedrazavi_gold_color', $updated_profile['goldColor']);

        return new WP_REST_Response([
            'success'   => true,
            'message'   => 'تنظیمات شناسنامه حقوقی و توکن‌های رنگی وکیل با موفقیت در دیتابیس وردپرس ذخیره شد.',
            'profile'   => $updated_profile,
            'timestamp' => current_time('timestamp'),
        ], 200);
    }

    /**
     * Handle fetching saved user-customized profile settings
     */
    public static function handle_get_profile_settings() {
        $profile = get_option('sedrazavi_lawyer_profile', []);

        if (empty($profile) || !is_array($profile)) {
            $profile = [
                'name'            => get_option('sedrazavi_lawyer_name', 'سرکار خانم دکتر سیده مریم رضوی'),
                'title'           => get_option('sedrazavi_lawyer_title', 'وکیل پایه یک دادگستری و مشاور ارشد حقوقی'),
                'licenseNumber'   => get_option('sedrazavi_lawyer_license', '۱۸۴۵۲ / ک.و.م'),
                'phone'           => get_option('sedrazavi_lawyer_phone', '۰۲۱-۸۸۹۹۰۰۱۱'),
                'mobile'          => get_option('sedrazavi_lawyer_mobile', '۰۹۱۲-۳۴۵۶۷۸۹'),
                'emergencyPhone'  => '۰۲۱-۸۸۷۷۶۶۵۵',
                'email'           => 'dr.sedrazavi@law-firm.ir',
                'address'         => get_option('sedrazavi_lawyer_address', 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج حقوقی SedRazavi'),
                'workingHours'    => 'شنبه تا چهارشنبه ۹:۰۰ الی ۱۸:۰۰',
                'primaryColor'    => get_option('sedrazavi_primary_color', '#0B132B'),
                'goldColor'       => get_option('sedrazavi_gold_color', '#D4AF37'),
                'accentColor'     => '#2A9D8F',
                'activeTheme'     => 'royal-gold',
                'isDarkMode'      => false,
                'telegramHandle'  => '@sedrazavi',
                'instagramHandle' => '@dr_maryam_sedrazavi',
                'whatsappNumber'  => '۰۹۱۲۳۴۵۶۷۸۹',
            ];
        }

        return new WP_REST_Response([
            'success' => true,
            'profile' => $profile,
        ], 200);
    }

    /**
     * Handle customizer bi-directional sync
     */
    public static function handle_customizer_sync($request) {
        if ($request->get_method() === 'POST') {
            return self::handle_save_profile_settings($request);
        }
        return self::handle_get_profile_settings();
    }

    /**
     * Handle authorized front-end email reply composer (template-emails.php)
     */
    public static function handle_ajax_send_reply_email() {
        check_ajax_referer('sedrazavi_security_nonce', 'security');
        if (!current_user_can('edit_others_posts')) {
            wp_send_json_error(['message' => 'شما مجوز ارسال پاسخ رسمی از صندوق پیام‌ها را ندارید.'], 403);
        }

        $raw_to  = isset($_POST['to']) ? wp_unslash((string) $_POST['to']) : '';
        $subject = isset($_POST['subject']) ? sanitize_text_field(wp_unslash((string) $_POST['subject'])) : '';
        $body    = isset($_POST['body']) ? sanitize_textarea_field(wp_unslash((string) $_POST['body'])) : '';

        // Extract valid email from "Name <email@domain>" or plain email
        $to_email = '';
        if (preg_match('/<([^>]+)>/', $raw_to, $m)) {
            $to_email = sanitize_email($m[1]);
        } else {
            $to_email = sanitize_email($raw_to);
        }

        if (empty($to_email) || !is_email($to_email)) {
            wp_send_json_error(['message' => 'نشانی ایمیل گیرنده معتبر نیست.'], 400);
        }
        if (empty($subject) || empty($body)) {
            wp_send_json_error(['message' => 'موضوع و متن پاسخ الزامی است.'], 400);
        }

        $headers = ['Content-Type: text/plain; charset=UTF-8'];
        $sent = wp_mail($to_email, $subject, $body, $headers);
        if (!$sent) {
            wp_send_json_error(['message' => 'سرور ایمیل وردپرس نتوانست ایمیل را ارسال کند. تنظیمات SMTP را بررسی نمایید.'], 500);
        }

        wp_send_json_success(['message' => 'پاسخ رسمی با موفقیت ارسال گردید.']);
    }

    /**
     * Handle authorized front-end comment moderation (template-comments.php)
     */
    public static function handle_ajax_moderate_comment() {
        check_ajax_referer('sedrazavi_security_nonce', 'security');
        if (!current_user_can('moderate_comments')) {
            wp_send_json_error(['message' => 'شما مجوز مدیریت دیدگاه‌ها را ندارید.'], 403);
        }

        $comment_id = isset($_POST['comment_id']) ? absint($_POST['comment_id']) : 0;
        $mod_action = isset($_POST['mod_action']) ? sanitize_key($_POST['mod_action']) : '';

        if (!$comment_id || !in_array($mod_action, ['approve', 'unapprove', 'spam', 'trash'], true)) {
            wp_send_json_error(['message' => 'پارامترهای عملیات دیدگاه نامعتبر است.'], 400);
        }

        $status_map = [
            'approve'   => 'approve',
            'unapprove' => 'hold',
            'spam'      => 'spam',
            'trash'     => 'trash',
        ];
        $res = wp_set_comment_status($comment_id, $status_map[$mod_action]);
        if (!$res || is_wp_error($res)) {
            wp_send_json_error(['message' => 'به‌روزرسانی وضعیت دیدگاه در دیتابیس انجام نشد.'], 500);
        }

        wp_send_json_success(['message' => 'وضعیت دیدگاه با موفقیت به‌روزرسانی شد.', 'status' => $status_map[$mod_action]]);
    }
}

// Boot the API handlers engine
SedRazavi_API_Handlers::init();
