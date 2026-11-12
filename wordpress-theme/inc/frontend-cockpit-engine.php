<?php
/**
 * Universal Frontend Management Cockpit Engine
 *
 * Implements:
 * 1. Database-authenticated frontend dashboard with login/logout sync
 * 2. Universal CPT & Custom Metabox CRUD from frontend
 * 3. Administrator manual user account creation, monitoring, search, edit & delete
 * 4. In-dashboard 1-click plugin installation and package management
 *
 * @package SedRazavi
 * @version 6.0.0
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */

namespace SedRazavi;

if (!defined('ABSPATH')) {
    exit;
}

class Frontend_Cockpit_Engine {

    private static $_instance = null;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        add_shortcode('sedrazavi_frontend_cockpit', [$this, 'render_cockpit_shortcode']);
        add_action('wp_ajax_sr_cockpit_db_login', [$this, 'ajax_db_login']);
        add_action('wp_ajax_nopriv_sr_cockpit_db_login', [$this, 'ajax_db_login']);
        add_action('wp_ajax_sr_cockpit_db_logout', [$this, 'ajax_db_logout']);
        
        // CPT & Metabox management
        add_action('wp_ajax_sr_cockpit_save_cpt_post', [$this, 'ajax_save_cpt_post']);
        add_action('wp_ajax_sr_cockpit_delete_cpt_post', [$this, 'ajax_delete_cpt_post']);
        add_action('wp_ajax_sr_cockpit_get_cpt_data', [$this, 'ajax_get_cpt_data']);

        // User Account Management
        add_action('wp_ajax_sr_cockpit_create_user', [$this, 'ajax_create_user']);
        add_action('wp_ajax_sr_cockpit_update_user', [$this, 'ajax_update_user']);
        add_action('wp_ajax_sr_cockpit_delete_user', [$this, 'ajax_delete_user']);
        add_action('wp_ajax_sr_cockpit_search_users', [$this, 'ajax_search_users']);
        add_action('wp_ajax_sr_cockpit_bulk_import_users', [$this, 'ajax_bulk_import_users']);
        add_action('wp_ajax_sr_cockpit_export_users_csv', [$this, 'ajax_export_users_csv']);

        // In-Dashboard Plugin Installer
        add_action('wp_ajax_sr_cockpit_install_plugin', [$this, 'ajax_install_plugin']);
        add_action('wp_ajax_sr_cockpit_toggle_plugin', [$this, 'ajax_toggle_plugin']);

        // Visual Site Kit Builder & Direct Deployment Engine
        add_action('wp_ajax_sr_cockpit_preflight_sitekit', [$this, 'ajax_preflight_sitekit']);
        add_action('wp_ajax_sr_cockpit_build_sitekit_bundle', [$this, 'ajax_build_sitekit_bundle']);
        add_action('wp_ajax_sr_cockpit_install_sitekit_bundle', [$this, 'ajax_install_sitekit_bundle']);
        add_action('wp_ajax_sr_cockpit_rollback_sitekit', [$this, 'ajax_rollback_sitekit']);

        // WordPress DB Site Brand, Colors & Options Persistence
        add_action('wp_ajax_sr_cockpit_save_site_settings', [$this, 'ajax_save_site_settings']);

        add_action('wp_enqueue_scripts', [$this, 'enqueue_cockpit_assets']);
    }

    public function enqueue_cockpit_assets() {
        if (!is_admin()) {
            wp_register_style('sr-cockpit-style', get_template_directory_uri() . '/assets/css/frontend-cockpit.css', [], '6.0.0');
            wp_register_script('sr-cockpit-script', get_template_directory_uri() . '/assets/js/frontend-cockpit.js', ['jquery'], '6.0.0', true);

            wp_localize_script('sr-cockpit-script', 'srCockpitData', [
                'ajaxUrl'      => admin_url('admin-ajax.php'),
                'nonce'        => wp_create_nonce('sr_cockpit_nonce'),
                'isLoggedIn'   => is_user_logged_in(),
                'isAdmin'      => current_user_can('manage_options'),
                'currentUserId'=> get_current_user_id(),
                'strings'      => [
                    'confirmDelete'     => __('آیا از حذف این مورد اطمینان دارید؟ این عملیات غیرقابل بازگشت است.', 'sedrazavi'),
                    'confirmDeleteUser' => __('آیا از حذف این کاربر اطمینان دارید؟', 'sedrazavi'),
                    'savedSuccess'      => __('اطلاعات با موفقیت در دیتابیس ذخیره شد.', 'sedrazavi'),
                    'errorOccurred'     => __('خطایی در انجام عملیات رخ داد.', 'sedrazavi'),
                ],
            ]);
        }
    }

    /**
     * AJAX Database Login
     */
    public function ajax_db_login() {
        check_ajax_referer('sr_cockpit_nonce', 'nonce');

        $username = sanitize_user($_POST['username'] ?? '');
        $password = $_POST['password'] ?? '';
        $remember = !empty($_POST['remember']);

        if (empty($username) || empty($password)) {
            wp_send_json_error(['message' => __('نام کاربری و رمز عبور الزامی است.', 'sedrazavi')]);
        }

        $creds = [
            'user_login'    => $username,
            'user_password' => $password,
            'remember'      => $remember,
        ];

        $user = wp_signon($creds, is_ssl());

        if (is_wp_error($user)) {
            wp_send_json_error(['message' => $user->get_error_message()]);
        }

        wp_set_current_user($user->ID);
        wp_set_auth_cookie($user->ID, $remember);

        wp_send_json_success([
            'message'  => __('ورود موفقیت‌آمیز بود. در حال بارگذاری پیشخوان...', 'sedrazavi'),
            'user'     => [
                'id'          => $user->ID,
                'name'        => $user->display_name,
                'email'       => $user->user_email,
                'roles'       => $user->roles,
                'can_manage'  => user_can($user, 'manage_options'),
            ],
            'redirect' => add_query_arg('cockpit_login', 'success', wp_get_referer() ?: home_url()),
        ]);
    }

    /**
     * AJAX Database Logout
     */
    public function ajax_db_logout() {
        check_ajax_referer('sr_cockpit_nonce', 'nonce');
        wp_logout();
        wp_send_json_success(['redirect' => home_url()]);
    }

    /**
     * Allowed CPTs & Metabox Keys for Frontend Cockpit CRUD
     */
    private function get_allowed_cpt_types() {
        return ['post', 'portfolio', 'services', 'case_study'];
    }

    private function get_allowed_meta_keys() {
        return [
            '_sr_portfolio_client',
            '_sr_portfolio_url',
            '_sr_portfolio_metric_val',
            '_sr_portfolio_metric_label',
            '_sr_service_price',
            '_sr_service_delivery_time',
        ];
    }

    /**
     * AJAX Save CPT Post & Metaboxes from Frontend
     */
    public function ajax_save_cpt_post() {
        check_ajax_referer('sr_cockpit_nonce', 'nonce');

        if (!is_user_logged_in() || !current_user_can('edit_posts')) {
            wp_send_json_error(['message' => __('سطح دسترسی شما کافی نیست.', 'sedrazavi')]);
        }

        $post_id   = !empty($_POST['post_id']) ? intval($_POST['post_id']) : 0;
        $post_type = sanitize_key($_POST['post_type'] ?? 'post');
        $title     = sanitize_text_field($_POST['title'] ?? '');
        $content   = wp_kses_post($_POST['content'] ?? '');
        $status    = in_array($_POST['status'] ?? 'publish', ['publish', 'draft'], true) ? $_POST['status'] : 'publish';

        if (!in_array($post_type, $this->get_allowed_cpt_types(), true)) {
            wp_send_json_error(['message' => __('نوع پست انتخاب‌شده در این بخش مجاز نیست.', 'sedrazavi')], 403);
        }

        if (empty($title)) {
            wp_send_json_error(['message' => __('عنوان نمی‌تواند خالی باشد.', 'sedrazavi')]);
        }

        // Check ownership if editing existing post
        if ($post_id > 0) {
            $existing = get_post($post_id);
            if (!$existing || !in_array($existing->post_type, $this->get_allowed_cpt_types(), true)) {
                wp_send_json_error(['message' => __('پست مورد نظر یافت نشد یا مجاز به ویرایش نیست.', 'sedrazavi')], 404);
            }
            if (!current_user_can('edit_others_posts') && (int) $existing->post_author !== (int) get_current_user_id()) {
                wp_send_json_error(['message' => __('شما اجازه ویرایش این پست را ندارید.', 'sedrazavi')], 403);
            }
            $post_type = $existing->post_type;
        }

        $post_data = [
            'post_title'   => $title,
            'post_content' => $content,
            'post_status'  => $status,
            'post_type'    => $post_type,
        ];

        if ($post_id > 0) {
            $post_data['ID'] = $post_id;
            $saved_id = wp_update_post($post_data);
        } else {
            $post_data['post_author'] = get_current_user_id();
            $saved_id = wp_insert_post($post_data);
        }

        if (is_wp_error($saved_id) || !$saved_id) {
            wp_send_json_error(['message' => __('خطا در ذخیره اطلاعات در دیتابیس.', 'sedrazavi')]);
        }

        // Strict Metabox Key Allowlist
        $allowed_meta = $this->get_allowed_meta_keys();
        $meta_fields  = $_POST['meta'] ?? [];
        if (is_array($meta_fields)) {
            foreach ($meta_fields as $meta_key => $meta_val) {
                $clean_key = sanitize_key($meta_key);
                if (!in_array($clean_key, $allowed_meta, true)) {
                    continue;
                }
                if ($clean_key === '_sr_portfolio_url') {
                    $clean_val = esc_url_raw((string) $meta_val);
                } else {
                    $clean_val = is_array($meta_val) ? array_map('sanitize_text_field', $meta_val) : sanitize_text_field($meta_val);
                }
                update_post_meta($saved_id, $clean_key, $clean_val);
            }
        }

        wp_send_json_success([
            'post_id' => $saved_id,
            'message' => __('پست و فیلدهای متاباکس با موفقیت ذخیره شدند.', 'sedrazavi'),
        ]);
    }

    /**
     * AJAX Delete CPT Post
     */
    public function ajax_delete_cpt_post() {
        check_ajax_referer('sr_cockpit_nonce', 'nonce');

        if (!is_user_logged_in() || !current_user_can('delete_posts')) {
            wp_send_json_error(['message' => __('سطح دسترسی شما برای حذف کافی نیست.', 'sedrazavi')], 403);
        }

        $post_id = intval($_POST['post_id'] ?? 0);
        $post = get_post($post_id);

        if (!$post || !in_array($post->post_type, $this->get_allowed_cpt_types(), true)) {
            wp_send_json_error(['message' => __('مورد معتبر یافت نشد.', 'sedrazavi')], 404);
        }

        if (!current_user_can('delete_others_posts') && (int) $post->post_author !== (int) get_current_user_id()) {
            wp_send_json_error(['message' => __('شما اجازه حذف این مورد را ندارید.', 'sedrazavi')], 403);
        }

        $res = wp_delete_post($post_id, true);
        if ($res) {
            wp_send_json_success(['message' => __('مورد با موفقیت حذف گردید.', 'sedrazavi')]);
        } else {
            wp_send_json_error(['message' => __('خطا در حذف از پایگاه داده.', 'sedrazavi')]);
        }
    }

    /**
     * AJAX Retrieve Single CPT Post & Metabox Data for Frontend Edit Modal
     */
    public function ajax_get_cpt_data() {
        check_ajax_referer('sr_cockpit_nonce', 'nonce');

        if (!is_user_logged_in() || !current_user_can('edit_posts')) {
            wp_send_json_error(['message' => __('سطح دسترسی شما برای دریافت اطلاعات کافی نیست.', 'sedrazavi')]);
        }

        $post_id = intval($_POST['post_id'] ?? 0);
        $post = $post_id > 0 ? get_post($post_id) : null;
        if (!$post || !in_array($post->post_type, $this->get_allowed_cpt_types(), true)) {
            wp_send_json_error(['message' => __('مورد درخواستی در پایگاه داده یافت نشد.', 'sedrazavi')]);
        }

        if (!current_user_can('edit_others_posts') && (int) $post->post_author !== (int) get_current_user_id()) {
            wp_send_json_error(['message' => __('شما اجازه مشاهده یا ویرایش این محتوا را ندارید.', 'sedrazavi')]);
        }

        $meta = [];
        foreach ($this->get_allowed_meta_keys() as $mk) {
            $meta[$mk] = (string) get_post_meta($post->ID, $mk, true);
        }

        wp_send_json_success([
            'post_id'   => $post->ID,
            'post_type' => $post->post_type,
            'title'     => $post->post_title,
            'content'   => $post->post_content,
            'status'    => $post->post_status,
            'meta'      => $meta,
        ]);
    }

    /**
     * AJAX Save Theme Brand, Design Tokens & Office Settings to WordPress wp_options
     */
    public function ajax_save_site_settings() {
        check_ajax_referer('sr_cockpit_nonce', 'nonce');

        if (!is_user_logged_in() || !current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('تنها مدیر کل مجاز به تغییر تنظیمات اصلی سایت است.', 'sedrazavi')]);
        }

        $office_phone    = sanitize_text_field(wp_unslash($_POST['sedrazavi_office_phone'] ?? ''));
        $office_email    = sanitize_email(wp_unslash($_POST['sedrazavi_office_email'] ?? ''));
        $office_address  = sanitize_text_field(wp_unslash($_POST['sedrazavi_office_address'] ?? ''));
        $working_hours   = sanitize_text_field(wp_unslash($_POST['sedrazavi_working_hours'] ?? ''));
        $primary_gold    = sanitize_hex_color(wp_unslash($_POST['sedrazavi_primary_gold'] ?? '#D4AF37')) ?: '#D4AF37';
        $secondary_navy  = sanitize_hex_color(wp_unslash($_POST['sedrazavi_secondary_navy'] ?? '#0B132B')) ?: '#0B132B';
        $font_family     = sanitize_text_field(wp_unslash($_POST['sedrazavi_font_family'] ?? 'Vazirmatn')) ?: 'Vazirmatn';
        $raw_scenario    = sanitize_key(wp_unslash($_POST['sedrazavi_active_scenario'] ?? 'bento-hud'));
        $active_scenario = in_array($raw_scenario, ['bento-hud', 'dense-matrix', 'hybrid-executive'], true) ? $raw_scenario : 'bento-hud';

        update_option('sedrazavi_office_phone', $office_phone);
        update_option('sedrazavi_office_email', $office_email);
        update_option('sedrazavi_office_address', $office_address);
        update_option('sedrazavi_working_hours', $working_hours);
        update_option('sedrazavi_primary_gold', $primary_gold);
        update_option('sedrazavi_secondary_navy', $secondary_navy);
        update_option('sedrazavi_gold_color', $primary_gold);
        update_option('sedrazavi_navy_color', $secondary_navy);
        update_option('sedrazavi_font_family', $font_family);
        update_option('sedrazavi_active_scenario', $active_scenario);

        if (function_exists('set_theme_mod')) {
            set_theme_mod('sedrazavi_office_phone', $office_phone);
            set_theme_mod('sedrazavi_office_email', $office_email);
            set_theme_mod('sedrazavi_office_address', $office_address);
        }

        wp_send_json_success([
            'message' => __('تنظیمات برند، توکن‌های رنگی و مشخصات دفتر با موفقیت در دیتابیس وردپرس (wp_options) ذخیره شد.', 'sedrazavi'),
            'settings' => [
                'sedrazavi_office_phone'    => $office_phone,
                'sedrazavi_office_email'    => $office_email,
                'sedrazavi_primary_gold'    => $primary_gold,
                'sedrazavi_secondary_navy'  => $secondary_navy,
                'sedrazavi_font_family'     => $font_family,
                'sedrazavi_active_scenario' => $active_scenario,
            ],
        ]);
    }

    /**
     * Validate target role assignment against privilege escalation
     */
    private function is_role_assignable($role) {
        if (!function_exists('wp_roles') || !wp_roles()->is_role($role)) {
            return false;
        }
        $role_obj = wp_roles()->get_role($role);
        if (!$role_obj) {
            return false;
        }
        $privileged_caps = ['manage_options', 'edit_users', 'delete_users', 'create_users', 'promote_users'];
        foreach ($privileged_caps as $cap) {
            if (!empty($role_obj->capabilities[$cap]) && !current_user_can('manage_options')) {
                return false;
            }
        }
        return true;
    }

    /**
     * AJAX Create User Account Manually (Administrator Action)
     */
    public function ajax_create_user() {
        check_ajax_referer('sr_cockpit_nonce', 'nonce');

        if (!current_user_can('create_users') && !current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('تنها مدیران سایت مجاز به ایجاد دستی اکانت کاربری هستند.', 'sedrazavi')]);
        }

        $username   = sanitize_user($_POST['username'] ?? '');
        $email      = sanitize_email($_POST['email'] ?? '');
        $password   = (string) ($_POST['password'] ?? '');
        $role       = sanitize_key($_POST['role'] ?? 'subscriber');
        $display    = sanitize_text_field($_POST['display_name'] ?? '');
        $phone      = sanitize_text_field($_POST['phone'] ?? '');
        $domain_tag = sanitize_text_field($_POST['domain_tag'] ?? 'general');

        if (empty($username) || empty($email) || !is_email($email) || strlen($password) < 8) {
            wp_send_json_error(['message' => __('نام کاربری، ایمیل معتبر و رمز عبور حداقل ۸ کاراکتری الزامی هستند.', 'sedrazavi')]);
        }

        if (!$this->is_role_assignable($role)) {
            wp_send_json_error(['message' => __('نقش کاربری انتخاب‌شده معتبر نیست یا خارج از سطح اختیارات شماست.', 'sedrazavi')], 403);
        }

        if (username_exists($username)) {
            wp_send_json_error(['message' => __('این نام کاربری قبلاً در سامانه ثبت شده است.', 'sedrazavi')]);
        }

        if (email_exists($email)) {
            wp_send_json_error(['message' => __('این آدرس ایمیل قبلاً ثبت شده است.', 'sedrazavi')]);
        }

        $user_id = wp_create_user($username, $password, $email);

        if (is_wp_error($user_id)) {
            wp_send_json_error(['message' => $user_id->get_error_message()]);
        }

        // Set role & display name
        $user = new \WP_User($user_id);
        $user->set_role($role);

        if (!empty($display)) {
            wp_update_user([
                'ID'           => $user_id,
                'display_name' => $display,
                'nickname'     => $display,
            ]);
        }

        if (!empty($phone)) {
            update_user_meta($user_id, '_sr_user_phone', $phone);
        }
        update_user_meta($user_id, '_sr_user_domain_tag', $domain_tag);
        update_user_meta($user_id, '_sr_created_by_admin', get_current_user_id());
        update_user_meta($user_id, '_sr_created_via_cockpit', 1);

        wp_send_json_success([
            'user_id' => $user_id,
            'message' => sprintf(__('کاربر «%s» با نقش «%s» با موفقیت ایجاد گردید.', 'sedrazavi'), $display ?: $username, $role),
        ]);
    }

    /**
     * AJAX Update User Profile
     */
    public function ajax_update_user() {
        check_ajax_referer('sr_cockpit_nonce', 'nonce');

        $target_user_id = intval($_POST['user_id'] ?? 0);
        if (!$target_user_id) {
            wp_send_json_error(['message' => __('شناسه کاربر نامعتبر است.', 'sedrazavi')]);
        }

        $is_admin = current_user_can('edit_users') || current_user_can('manage_options');
        $is_self  = (get_current_user_id() === $target_user_id);

        if (!$is_admin && !$is_self) {
            wp_send_json_error(['message' => __('شما مجوز ویرایش این حساب کاربری را ندارید.', 'sedrazavi')], 403);
        }

        $target_user = get_userdata($target_user_id);
        if (!$target_user) {
            wp_send_json_error(['message' => __('کاربر یافت نشد.', 'sedrazavi')], 404);
        }

        if (!$is_self && in_array('administrator', (array) $target_user->roles, true) && !current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('شما مجوز ویرایش حساب مدیر کل را ندارید.', 'sedrazavi')], 403);
        }

        $update_data = ['ID' => $target_user_id];

        if (!empty($_POST['display_name'])) {
            $update_data['display_name'] = sanitize_text_field($_POST['display_name']);
        }
        if (!empty($_POST['email']) && is_email($_POST['email'])) {
            $update_data['user_email'] = sanitize_email($_POST['email']);
        }
        if (!empty($_POST['password'])) {
            if (strlen((string) $_POST['password']) < 8) {
                wp_send_json_error(['message' => __('رمز عبور جدید باید حداقل ۸ کاراکتر باشد.', 'sedrazavi')], 400);
            }
            $update_data['user_pass'] = $_POST['password'];
        }

        $res = wp_update_user($update_data);
        if (is_wp_error($res)) {
            wp_send_json_error(['message' => $res->get_error_message()]);
        }

        if ($is_admin && !empty($_POST['role'])) {
            $role = sanitize_key($_POST['role']);
            if (!$this->is_role_assignable($role)) {
                wp_send_json_error(['message' => __('اختیار ارتقا به این نقش کاربری وجود ندارد.', 'sedrazavi')], 403);
            }
            $user = new \WP_User($target_user_id);
            $user->set_role($role);
        }

        if (isset($_POST['phone'])) {
            update_user_meta($target_user_id, '_sr_user_phone', sanitize_text_field($_POST['phone']));
        }

        wp_send_json_success(['message' => __('مشخصات کاربر با موفقیت به‌روزرسانی شد.', 'sedrazavi')]);
    }

    /**
     * AJAX Delete User
     */
    public function ajax_delete_user() {
        check_ajax_referer('sr_cockpit_nonce', 'nonce');

        if (!current_user_can('delete_users') && !current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('سطح دسترسی شما برای حذف کاربران کافی نیست.', 'sedrazavi')], 403);
        }

        $target_user_id = intval($_POST['user_id'] ?? 0);
        if ($target_user_id === get_current_user_id()) {
            wp_send_json_error(['message' => __('شما نمی‌توانید حساب کاربری فعال خودتان را حذف کنید.', 'sedrazavi')]);
        }

        $target_user = get_userdata($target_user_id);
        if (!$target_user) {
            wp_send_json_error(['message' => __('کاربر یافت نشد.', 'sedrazavi')], 404);
        }
        if (in_array('administrator', (array) $target_user->roles, true) && !current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('شما مجوز حذف مدیر کل را ندارید.', 'sedrazavi')], 403);
        }

        require_once ABSPATH . 'wp-admin/includes/user.php';
        $res = wp_delete_user($target_user_id, get_current_user_id());

        if ($res) {
            wp_send_json_success(['message' => __('کاربر با موفقیت حذف گردید.', 'sedrazavi')]);
        } else {
            wp_send_json_error(['message' => __('خطا در حذف کاربر.', 'sedrazavi')]);
        }
    }

    /**
     * AJAX Search / Filter Users
     */
    public function ajax_search_users() {
        check_ajax_referer('sr_cockpit_nonce', 'nonce');

        if (!current_user_can('list_users') && !current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('مجوز دسترسی ندارید.', 'sedrazavi')]);
        }

        $search = sanitize_text_field($_POST['search'] ?? '');
        $role   = sanitize_key($_POST['role'] ?? '');

        $args = [
            'number' => 50,
            'orderby'=> 'registered',
            'order'  => 'DESC',
        ];

        if (!empty($search)) {
            $args['search'] = '*' . $search . '*';
            $args['search_columns'] = ['user_login', 'user_nicename', 'user_email', 'display_name'];
        }

        if (!empty($role)) {
            $args['role'] = $role;
        }

        $users = get_users($args);
        $user_list = [];

        foreach ($users as $u) {
            $user_list[] = [
                'id'           => $u->ID,
                'username'     => $u->user_login,
                'display_name' => $u->display_name,
                'email'        => $u->user_email,
                'roles'        => $u->roles,
                'registered'   => $u->user_registered,
                'phone'        => get_user_meta($u->ID, '_sr_user_phone', true),
                'domain_tag'   => get_user_meta($u->ID, '_sr_user_domain_tag', true) ?: 'عمومی',
            ];
        }

        wp_send_json_success(['users' => $user_list, 'total' => count($user_list)]);
    }

    /**
     * AJAX Bulk Import Users via CSV (Administrator Action)
     */
    public function ajax_bulk_import_users() {
        check_ajax_referer('sr_cockpit_nonce', 'nonce');

        if (!current_user_can('create_users') && !current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('تنها مدیران مجاز به درون‌ریزی گروهی کاربران هستند.', 'sedrazavi')]);
        }

        $csv_raw = wp_unslash($_POST['csv_data'] ?? '');
        $lines = preg_split('/\r\n|\r|\n/', trim($csv_raw));
        if (empty($lines)) {
            wp_send_json_error(['message' => __('محتوای CSV خالی است.', 'sedrazavi')]);
        }

        $created = 0;
        $skipped = 0;
        $errors  = [];

        foreach ($lines as $idx => $line) {
            $line = trim($line);
            if ($line === '') {
                continue;
            }
            $cols = str_getcsv($line);
            if ($idx === 0 && isset($cols[0]) && strtolower(trim($cols[0])) === 'username') {
                continue; // Header row
            }

            $username = sanitize_user($cols[0] ?? '');
            $email    = sanitize_email($cols[1] ?? '');
            $display  = sanitize_text_field($cols[2] ?? $username);
            $role     = sanitize_key($cols[3] ?? 'subscriber') ?: 'subscriber';
            $domain   = sanitize_text_field($cols[4] ?? 'general') ?: 'general';
            $phone    = sanitize_text_field($cols[5] ?? '');
            $password = !empty($cols[6]) ? $cols[6] : wp_generate_password(12, true);

            if (empty($username) || empty($email) || !is_email($email)) {
                $skipped++;
                $errors[] = sprintf(__('ردیف %d: نام کاربری یا ایمیل نامعتبر است.', 'sedrazavi'), $idx + 1);
                continue;
            }

            if (!$this->is_role_assignable($role)) {
                $skipped++;
                $errors[] = sprintf(__('ردیف %d: نقش «%s» مجاز یا معتبر نیست.', 'sedrazavi'), $idx + 1, $role);
                continue;
            }

            if (username_exists($username) || email_exists($email)) {
                $skipped++;
                continue;
            }

            $user_id = wp_create_user($username, $password, $email);
            if (is_wp_error($user_id)) {
                $skipped++;
                $errors[] = $user_id->get_error_message();
                continue;
            }

            $user = new \WP_User($user_id);
            $user->set_role($role);
            wp_update_user(['ID' => $user_id, 'display_name' => $display, 'nickname' => $display]);
            if ($phone !== '') {
                update_user_meta($user_id, '_sr_user_phone', $phone);
            }
            update_user_meta($user_id, '_sr_user_domain_tag', $domain);
            update_user_meta($user_id, '_sr_created_by_admin', get_current_user_id());
            update_user_meta($user_id, '_sr_created_via_cockpit', 1);
            $created++;
        }

        wp_send_json_success([
            'created' => $created,
            'skipped' => $skipped,
            'errors'  => $errors,
            'message' => sprintf(__('درون‌ریزی گروهی تکمیل شد: %d کاربر ایجاد و %d ردیف رد شد.', 'sedrazavi'), $created, $skipped),
        ]);
    }

    /**
     * Neutralize spreadsheet formula prefixes (=, +, -, @, tab)
     */
    private function sanitize_csv_cell($value) {
        $str = (string) $value;
        $str = str_replace(["\r\n", "\r", "\n"], ' ', $str);
        if ($str !== '' && preg_match('/^[=+\-@\t]/', ltrim($str))) {
            $str = "'" . $str;
        }
        return $str;
    }

    /**
     * AJAX Export Users as RFC-4180 CSV
     */
    public function ajax_export_users_csv() {
        check_ajax_referer('sr_cockpit_nonce', 'nonce');

        if (!current_user_can('list_users') && !current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('سطح دسترسی شما برای خروجی گرفتن از کاربران کافی نیست.', 'sedrazavi')]);
        }

        $users = get_users(['number' => 500, 'orderby' => 'ID', 'order' => 'ASC']);
        $rows = [];
        $rows[] = ['username', 'email', 'display_name', 'role', 'domain_tag', 'phone', 'registered'];

        foreach ($users as $u) {
            $rows[] = array_map([$this, 'sanitize_csv_cell'], [
                $u->user_login,
                $u->user_email,
                $u->display_name,
                implode('|', $u->roles),
                get_user_meta($u->ID, '_sr_user_domain_tag', true) ?: 'general',
                get_user_meta($u->ID, '_sr_user_phone', true) ?: '',
                $u->user_registered,
            ]);
        }

        $handle = fopen('php://temp', 'r+');
        foreach ($rows as $row) {
            fputcsv($handle, $row);
        }
        rewind($handle);
        $csv_content = "\xEF\xBB\xBF" . stream_get_contents($handle);
        fclose($handle);

        wp_send_json_success([
            'csv'      => $csv_content,
            'filename' => 'sedrazavi-users-' . gmdate('Ymd-His') . '.csv',
            'count'    => count($users),
            'message'  => sprintf(__('فایل CSV شامل %d حساب کاربری آماده دریافت شد.', 'sedrazavi'), count($users)),
        ]);
    }

    /**
     * AJAX In-Dashboard 1-Click Plugin Installation (Allowlisted Slugs Only)
     */
    public function ajax_install_plugin() {
        check_ajax_referer('sr_cockpit_nonce', 'nonce');

        if (!current_user_can('install_plugins') && !current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('تنها مدیر کل مجاز به نصب افزونه است.', 'sedrazavi')]);
        }

        $plugin_slug = sanitize_key($_POST['plugin_slug'] ?? 'sedrazavi-designer-core');
        $allowed_plugins = ['sedrazavi-designer-core', 'elementor-addon-suite', 'sedrazavi-addons', 'sedrazavi-companion'];
        if (!in_array($plugin_slug, $allowed_plugins, true)) {
            wp_send_json_error(['message' => __('شناسه افزونه انتخاب‌شده در فهرست مجاز اکوسیستم نیست.', 'sedrazavi')], 403);
        }

        // Locate bundled zip in theme inc/plugins/ or public/
        $candidates = [
            get_template_directory() . '/inc/plugins/' . $plugin_slug . '.zip',
            ABSPATH . 'wp-content/plugins/' . $plugin_slug . '.zip',
        ];

        $zip_file = '';
        foreach ($candidates as $c) {
            if (file_exists($c)) {
                $zip_file = $c;
                break;
            }
        }

        if (empty($zip_file)) {
            wp_send_json_error(['message' => sprintf(__('بسته زیپ افزونه «%s» در سرور یافت نشد.', 'sedrazavi'), $plugin_slug)]);
        }

        require_once ABSPATH . 'wp-admin/includes/file.php';
        \WP_Filesystem();
        global $wp_filesystem;

        $target_dir = WP_PLUGIN_DIR . '/' . $plugin_slug . '/';
        $unzip_res  = unzip_file($zip_file, WP_PLUGIN_DIR);

        if (is_wp_error($unzip_res)) {
            wp_send_json_error(['message' => $unzip_res->get_error_message()]);
        }

        // Auto-activate plugin
        $main_file = $plugin_slug . '/' . $plugin_slug . '.php';
        if (!is_plugin_active($main_file)) {
            $act_res = activate_plugin($main_file);
            if (is_wp_error($act_res)) {
                wp_send_json_error(['message' => $act_res->get_error_message()]);
            }
        }

        wp_send_json_success([
            'message' => sprintf(__('افزونه «%s» با موفقیت نصب و فعال گردید.', 'sedrazavi'), $plugin_slug),
            'status'  => 'active',
        ]);
    }

    /**
     * Helper to load Package Manager
     */
    private function ensure_package_manager_loaded() {
        if (!class_exists('\\UniversalElementorSuite\\Package_Manager')) {
            $locations = [
                ABSPATH . 'wp-content/plugins/elementor-addon-suite/includes/class-package-manager.php',
                dirname(__DIR__, 2) . '/elementor-addon-suite/includes/class-package-manager.php',
                get_template_directory() . '/../elementor-addon-suite/includes/class-package-manager.php',
            ];
            foreach ($locations as $loc) {
                if (file_exists($loc)) {
                    require_once $loc;
                    break;
                }
            }
        }
        return class_exists('\\UniversalElementorSuite\\Package_Manager');
    }

    /**
     * AJAX Site Kit Preflight Check (Delegated to Package_Manager)
     */
    public function ajax_preflight_sitekit() {
        check_ajax_referer('sr_cockpit_nonce', 'nonce');
        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('سطح دسترسی شما برای این عملیات کافی نیست.', 'sedrazavi')]);
        }

        $project_slug = sanitize_title($_POST['project_slug'] ?? 'custom-site-kit');
        $widgets      = isset($_POST['widgets']) && is_array($_POST['widgets']) ? array_map('sanitize_key', $_POST['widgets']) : [];
        $templates    = isset($_POST['templates']) && is_array($_POST['templates']) ? array_map('sanitize_key', $_POST['templates']) : [];
        $blocks       = isset($_POST['blocks']) && is_array($_POST['blocks']) ? array_map('sanitize_text_field', $_POST['blocks']) : [];
        $cpts         = isset($_POST['cpts']) && is_array($_POST['cpts']) ? array_map('sanitize_key', $_POST['cpts']) : [];

        if ($this->ensure_package_manager_loaded()) {
            $synthetic_manifest = [
                'id'                   => $project_slug ?: 'custom-site-kit',
                'name'                 => sanitize_text_field($_POST['project_name'] ?? 'کیت اختصاصی المنتور'),
                'version'              => '1.0.0',
                'package_type'         => 'custom-project-kit',
                'widgets'              => $widgets,
                'templates'            => $templates,
                'gutenberg_blocks'     => $blocks,
                'cpt_schemas'          => $cpts,
                'includes_theme_bridge'=> !empty($_POST['include_theme_bridge']),
                'includes_query_engine'=> !empty($_POST['include_query_engine']),
            ];
            $preflight = \UniversalElementorSuite\Package_Manager::instance()->preflight_check($synthetic_manifest);
            if (empty($preflight['pass'])) {
                wp_send_json_error([
                    'pass'     => false,
                    'errors'   => $preflight['errors'] ?? [],
                    'warnings' => $preflight['warnings'] ?? [],
                    'message'  => !empty($preflight['errors']) ? implode(' | ', $preflight['errors']) : __('بررسی پیش‌پرواز با خطا مواجه شد.', 'sedrazavi'),
                ]);
            }
            wp_send_json_success([
                'pass'               => true,
                'widgets_count'      => count($widgets),
                'templates_count'    => count($templates),
                'blocks_count'       => count($blocks),
                'cpts_count'         => count($cpts),
                'auto_added_widgets' => $preflight['auto_added_widgets'] ?? [],
                'collision_detected' => !empty($preflight['collision_detected']),
                'elementor_ready'    => !empty($preflight['environment']['elementor_active']),
                'warnings'           => $preflight['warnings'] ?? [],
                'message'            => sprintf(__('پیش‌پرواز با موفقیت تأیید شد (%d ویجت، %d بلوک گوتنبرگ، %d CPT و %d قالب؛ آماده استقرار مستقل).', 'sedrazavi'), count($widgets), count($blocks), count($cpts), count($templates)),
            ]);
        }

        wp_send_json_error(['message' => __('کلاس بسته‌ساز مستقل (Package_Manager) برای بررسی پیش‌پرواز در دسترس نیست.', 'sedrazavi')]);
    }

    /**
     * AJAX Build Site Kit Custom Bundle (ZIP Export)
     */
    public function ajax_build_sitekit_bundle() {
        check_ajax_referer('sr_cockpit_nonce', 'nonce');
        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('سطح دسترسی شما برای این عملیات کافی نیست.', 'sedrazavi')]);
        }

        if (!$this->ensure_package_manager_loaded()) {
            wp_send_json_error(['message' => __('کلاس بسته‌ساز مستقل (Package_Manager) در دسترس نیست.', 'sedrazavi')]);
        }

        $params = [
            'project_name'         => sanitize_text_field($_POST['project_name'] ?? 'کیت اختصاصی المنتور'),
            'project_slug'         => sanitize_title($_POST['project_slug'] ?? 'custom-site-kit'),
            'selected_widgets'     => isset($_POST['widgets']) && is_array($_POST['widgets']) ? array_map('sanitize_key', $_POST['widgets']) : [],
            'selected_templates'   => isset($_POST['templates']) && is_array($_POST['templates']) ? array_map('sanitize_key', $_POST['templates']) : [],
            'selected_blocks'      => isset($_POST['blocks']) && is_array($_POST['blocks']) ? array_map('sanitize_text_field', $_POST['blocks']) : [],
            'selected_cpts'        => isset($_POST['cpts']) && is_array($_POST['cpts']) ? array_map('sanitize_key', $_POST['cpts']) : [],
            'design_tokens'        => [
                'primary_color'   => get_option('sedrazavi_primary_gold', '#D4AF37'),
                'secondary_color' => get_option('sedrazavi_secondary_navy', '#0B132B'),
                'font_family'     => get_option('sedrazavi_font_family', 'Vazirmatn'),
            ],
            'niche'                => sanitize_key($_POST['niche'] ?? 'general'),
            'include_theme_bridge' => !empty($_POST['include_theme_bridge']),
            'include_query_engine' => !empty($_POST['include_query_engine']),
        ];

        $res = \UniversalElementorSuite\Package_Manager::instance()->build_custom_project_bundle($params);
        if ($res['success']) {
            wp_send_json_success($res);
        } else {
            wp_send_json_error(['message' => $res['error'] ?? __('خطا در کامپایل بسته مستقل ZIP.', 'sedrazavi')]);
        }
    }

    /**
     * AJAX Direct Deploy Site Kit to Current WordPress (1-Click Local Install & Elementor Library Hydration)
     */
    public function ajax_install_sitekit_bundle() {
        check_ajax_referer('sr_cockpit_nonce', 'nonce');
        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('سطح دسترسی شما برای این عملیات کافی نیست.', 'sedrazavi')]);
        }

        if (!$this->ensure_package_manager_loaded()) {
            wp_send_json_error(['message' => __('کلاس بسته‌ساز مستقل (Package_Manager) در دسترس نیست.', 'sedrazavi')]);
        }

        $params = [
            'project_name'         => sanitize_text_field($_POST['project_name'] ?? 'کیت اختصاصی المنتور'),
            'project_slug'         => sanitize_title($_POST['project_slug'] ?? 'custom-site-kit'),
            'selected_widgets'     => isset($_POST['widgets']) && is_array($_POST['widgets']) ? array_map('sanitize_key', $_POST['widgets']) : [],
            'selected_templates'   => isset($_POST['templates']) && is_array($_POST['templates']) ? array_map('sanitize_key', $_POST['templates']) : [],
            'selected_blocks'      => isset($_POST['blocks']) && is_array($_POST['blocks']) ? array_map('sanitize_text_field', $_POST['blocks']) : [],
            'selected_cpts'        => isset($_POST['cpts']) && is_array($_POST['cpts']) ? array_map('sanitize_key', $_POST['cpts']) : [],
            'design_tokens'        => [
                'primary_color'   => get_option('sedrazavi_primary_gold', '#D4AF37'),
                'secondary_color' => get_option('sedrazavi_secondary_navy', '#0B132B'),
                'font_family'     => get_option('sedrazavi_font_family', 'Vazirmatn'),
            ],
            'niche'                => sanitize_key($_POST['niche'] ?? 'general'),
            'include_theme_bridge' => !empty($_POST['include_theme_bridge']),
            'include_query_engine' => !empty($_POST['include_query_engine']),
        ];

        $overwrite = isset($_POST['overwrite']) ? !empty($_POST['overwrite']) : true;

        // 1. Build Custom Bundle ZIP
        $build_res = \UniversalElementorSuite\Package_Manager::instance()->build_custom_project_bundle($params);
        if (!$build_res['success'] || !file_exists($build_res['zip_path'])) {
            wp_send_json_error(['message' => $build_res['error'] ?? __('خطا در تولید بسته جهت استقرار.', 'sedrazavi')]);
        }

        // 2. Atomic Extraction, Activation Verification & Elementor Library Hydration
        $target_plugin_dir = trailingslashit(WP_PLUGIN_DIR) . $params['project_slug'] . '/';
        $import_res = \UniversalElementorSuite\Package_Manager::instance()->import_package_archive($build_res['zip_path'], false, $target_plugin_dir, $overwrite);

        if (empty($import_res['success'])) {
            wp_send_json_error(['message' => $import_res['error'] ?? __('خطا در استخراج یا فعال‌سازی بسته.', 'sedrazavi')]);
        }

        // 3. Persist deployed Site Kit record in wp_options
        $deployed = get_option('sr_cockpit_deployed_kits', []);
        if (!is_array($deployed)) {
            $deployed = [];
        }
        $deployed[$params['project_slug']] = [
            'name'            => $params['project_name'],
            'slug'            => $params['project_slug'],
            'niche'           => $params['niche'],
            'widgets_count'   => $build_res['widgets_count'] ?? 0,
            'templates_count' => $build_res['templates_count'] ?? 0,
            'blocks_count'    => $build_res['blocks_count'] ?? 0,
            'cpts_count'      => $build_res['cpts_count'] ?? 0,
            'sha256'          => $build_res['sha256'] ?? '',
            'deployed_at'     => current_time('mysql'),
        ];
        update_option('sr_cockpit_deployed_kits', $deployed);

        wp_send_json_success([
            'message'            => sprintf(__('کیت سایت «%s» با موفقیت در افزونه‌ها مستقر، فعال و %d قالب به کتابخانه المنتور اضافه شد.', 'sedrazavi'), $params['project_name'], $import_res['hydrated_templates'] ?? 0),
            'plugin_slug'        => $params['project_slug'],
            'installed_path'     => $target_plugin_dir,
            'plugin_activated'   => !empty($import_res['plugin_activated']),
            'hydrated_templates' => $import_res['hydrated_templates'] ?? 0,
        ]);
    }

    /**
     * AJAX Rollback Installed Site Kit Bundle (Deactivate plugin, remove files, purge templates & caches)
     */
    public function ajax_rollback_sitekit() {
        check_ajax_referer('sr_cockpit_nonce', 'nonce');
        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('سطح دسترسی شما برای عملیات رول‌بک کافی نیست.', 'sedrazavi')]);
        }

        if (!$this->ensure_package_manager_loaded()) {
            wp_send_json_error(['message' => __('کلاس بسته‌ساز مستقل (Package_Manager) در دسترس نیست.', 'sedrazavi')]);
        }

        $slug = sanitize_title($_POST['project_slug'] ?? 'custom-project-kit');
        if (empty($slug)) {
            wp_send_json_error(['message' => __('شناسه بسته جهت رول‌بک نامعتبر است.', 'sedrazavi')]);
        }

        $res = \UniversalElementorSuite\Package_Manager::instance()->rollback_package_installation($slug);
        if (!empty($res['success'])) {
            $deployed = get_option('sr_cockpit_deployed_kits', []);
            if (is_array($deployed) && isset($deployed[$slug])) {
                unset($deployed[$slug]);
                update_option('sr_cockpit_deployed_kits', $deployed);
            }
            wp_send_json_success($res);
        } else {
            wp_send_json_error(['message' => $res['error'] ?? __('خطا در اجرای رول‌بک کامل بسته.', 'sedrazavi')]);
        }
    }

    /**
     * Render the complete Frontend Management Cockpit
     */
    public function render_cockpit_shortcode($atts = []) {
        wp_enqueue_style('sr-cockpit-style');
        wp_enqueue_script('sr-cockpit-script');

        ob_start();
        ?>
        <div id="sr-frontend-cockpit-root" class="sr-cockpit-wrapper" dir="rtl">
            <?php if (!is_user_logged_in()): ?>
                <!-- Login View -->
                <div class="sr-cockpit-login-card">
                    <div class="sr-cockpit-header">
                        <span class="sr-badge">احراز هویت ایمن پایگاه داده</span>
                        <h2>ورود به پیشخوان مدیریت یکپارچه</h2>
                        <p>برای مدیریت پست‌تایپ‌ها، متاباکس‌ها، کاربران و افزونه‌ها وارد حساب خود شوید.</p>
                    </div>
                    <form id="sr-cockpit-login-form" class="sr-cockpit-form">
                        <div class="sr-form-group">
                            <label for="sr_login_user">نام کاربری یا ایمیل:</label>
                            <input type="text" id="sr_login_user" name="username" required autocomplete="username" placeholder="مثال: admin یا info@site.com">
                        </div>
                        <div class="sr-form-group">
                            <label for="sr_login_pass">رمز عبور:</label>
                            <input type="password" id="sr_login_pass" name="password" required autocomplete="current-password" placeholder="••••••••">
                        </div>
                        <div class="sr-form-row">
                            <label class="sr-checkbox">
                                <input type="checkbox" name="remember" value="1" checked>
                                <span>مرا به خاطر بسپار</span>
                            </label>
                        </div>
                        <button type="submit" class="sr-btn sr-btn-primary">
                            <span>ورود به پیشخوان</span>
                        </button>
                        <div class="sr-form-feedback"></div>
                    </form>
                </div>
            <?php else: 
                $current_user = wp_get_current_user();
                $is_admin = current_user_can('manage_options');
            ?>
                <!-- Main Cockpit Navigation -->
                <div class="sr-cockpit-nav-bar">
                    <div class="sr-user-pill">
                        <span class="sr-user-avatar"><?php echo esc_html(mb_substr($current_user->display_name, 0, 1, 'UTF-8')); ?></span>
                        <div class="sr-user-info">
                            <strong><?php echo esc_html($current_user->display_name); ?></strong>
                            <small><?php echo esc_html(implode(', ', $current_user->roles)); ?></small>
                        </div>
                    </div>
                    <div class="sr-cockpit-tabs">
                        <button type="button" class="sr-tab-btn active" data-tab="tab-overview">📊 پیشخوان و آمار</button>
                        <button type="button" class="sr-tab-btn" data-tab="tab-cpt">📑 مدیریت پست‌تایپ‌ها و متاباکس‌ها</button>
                        <?php if ($is_admin): ?>
                            <button type="button" class="sr-tab-btn" data-tab="tab-users">👥 مدیریت و پایش کاربران</button>
                            <button type="button" class="sr-tab-btn" data-tab="tab-plugins">🔌 هاب نصب افزونه‌ها</button>
                            <button type="button" class="sr-tab-btn" data-tab="tab-sitekit">🎨 سازنده کیت سایت (Site Kit Builder)</button>
                            <button type="button" class="sr-tab-btn" data-tab="tab-settings">⚙️ تنظیمات برند و دیتابیس</button>
                        <?php endif; ?>
                    </div>
                    <button type="button" id="sr-cockpit-logout-btn" class="sr-btn sr-btn-outline">خروج</button>
                </div>

                <!-- Tab 1: Overview -->
                <div id="tab-overview" class="sr-tab-pane active">
                    <div class="sr-stats-grid">
                        <div class="sr-stat-card">
                            <span class="sr-stat-num"><?php echo esc_html(wp_count_posts('portfolio')->publish ?? 0); ?></span>
                            <span class="sr-stat-label">نمونه‌کارها (Portfolio)</span>
                        </div>
                        <div class="sr-stat-card">
                            <span class="sr-stat-num"><?php echo esc_html(wp_count_posts('services')->publish ?? 0); ?></span>
                            <span class="sr-stat-label">خدمات ثبت‌شده (Services)</span>
                        </div>
                        <div class="sr-stat-card">
                            <span class="sr-stat-num"><?php echo esc_html(wp_count_posts('post')->publish ?? 0); ?></span>
                            <span class="sr-stat-label">مقاله‌ها و نوشته‌ها</span>
                        </div>
                        <div class="sr-stat-card">
                            <span class="sr-stat-num"><?php echo esc_html(count_users()['total_users'] ?? 1); ?></span>
                            <span class="sr-stat-label">کاربران ثبت‌شده</span>
                        </div>
                    </div>
                </div>

                <!-- Tab 2: CPT & Metabox Manager -->
                <div id="tab-cpt" class="sr-tab-pane">
                    <div class="sr-panel-header">
                        <h3>مدیریت داینامیک پست‌تایپ‌ها و متاباکس‌ها</h3>
                        <button type="button" id="sr-btn-new-cpt" class="sr-btn sr-btn-primary">+ ایجاد مورد جدید</button>
                    </div>

                    <!-- Creation / Edit Modal -->
                    <div id="sr-cpt-modal" class="sr-modal" style="display:none;">
                        <div class="sr-modal-content">
                            <span class="sr-modal-close">&times;</span>
                            <h4 id="sr-cpt-modal-title">ایجاد محتوای جدید</h4>
                            <form id="sr-cpt-form">
                                <input type="hidden" name="post_id" id="sr_cpt_post_id" value="">
                                <div class="sr-form-group">
                                    <label>نوع پست‌تایپ:</label>
                                    <select name="post_type" id="sr_cpt_post_type">
                                        <option value="portfolio">نمونه‌کار (Portfolio)</option>
                                        <option value="services">خدمات (Services)</option>
                                        <option value="case_study">مطالعه موردی و نمونه پرونده (Case Study)</option>
                                        <option value="post">نوشته بلاگ (Blog Post)</option>
                                    </select>
                                </div>
                                <div class="sr-form-group">
                                    <label>عنوان مطلب:</label>
                                    <input type="text" name="title" id="sr_cpt_title" required placeholder="عنوان را وارد کنید">
                                </div>
                                <div class="sr-form-group">
                                    <label>محتوا / توضیحات کامل:</label>
                                    <textarea name="content" id="sr_cpt_content" rows="4" placeholder="توضیحات و متن..."></textarea>
                                </div>

                                <!-- Dynamic Metabox Section -->
                                <div class="sr-metabox-section">
                                    <h5>فیلدهای متاباکس سفارشی (Custom Post Meta)</h5>
                                    
                                    <div class="sr-meta-group sr-meta-portfolio">
                                        <div class="sr-form-group">
                                            <label>نام کارفرما / مشتری (_sr_portfolio_client):</label>
                                            <input type="text" name="meta[_sr_portfolio_client]" id="meta_portfolio_client">
                                        </div>
                                        <div class="sr-form-group">
                                            <label>آدرس پروژه (_sr_portfolio_url):</label>
                                            <input type="url" name="meta[_sr_portfolio_url]" id="meta_portfolio_url" placeholder="https://...">
                                        </div>
                                        <div class="sr-form-group">
                                            <label>شاخص موفقیت عددی (_sr_portfolio_metric_val):</label>
                                            <input type="text" name="meta[_sr_portfolio_metric_val]" id="meta_portfolio_metric_val" placeholder="مثال: +۴۵۰٪">
                                        </div>
                                        <div class="sr-form-group">
                                            <label>عنوان شاخص موفقیت (_sr_portfolio_metric_label):</label>
                                            <input type="text" name="meta[_sr_portfolio_metric_label]" id="meta_portfolio_metric_label" placeholder="مثال: رشد نرخ تبدیل">
                                        </div>
                                    </div>

                                    <div class="sr-meta-group sr-meta-services">
                                        <div class="sr-form-group">
                                            <label>هزینه و تعرفه خدمت (_sr_service_price):</label>
                                            <input type="text" name="meta[_sr_service_price]" id="meta_service_price" placeholder="مثال: از ۱۰ میلیون تومان">
                                        </div>
                                        <div class="sr-form-group">
                                            <label>مدت زمان تحویل (_sr_service_delivery_time):</label>
                                            <input type="text" name="meta[_sr_service_delivery_time]" id="meta_service_delivery" placeholder="مثال: ۷ روز کاری">
                                        </div>
                                    </div>
                                </div>

                                <div class="sr-modal-actions">
                                    <button type="submit" class="sr-btn sr-btn-primary">ذخیره در دیتابیس</button>
                                    <button type="button" class="sr-btn sr-btn-secondary sr-modal-cancel">انصراف</button>
                                </div>
                                <div class="sr-modal-feedback"></div>
                            </form>
                        </div>
                    </div>

                    <!-- Post Listing Table -->
                    <div class="sr-table-responsive">
                        <table class="sr-cockpit-table">
                            <thead>
                                <tr>
                                    <th>عنوان</th>
                                    <th>پست‌تایپ</th>
                                    <th>وضعیت</th>
                                    <th>تاریخ</th>
                                    <th>عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                $posts_query = new \WP_Query([
                                    'post_type'      => ['portfolio', 'services', 'case_study', 'post'],
                                    'posts_per_page' => 20,
                                    'post_status'    => 'any',
                                ]);
                                if ($posts_query->have_posts()):
                                    while ($posts_query->have_posts()): $posts_query->the_post();
                                ?>
                                    <tr data-post-id="<?php the_ID(); ?>">
                                        <td><strong><?php the_title(); ?></strong></td>
                                        <td><span class="sr-tag"><?php echo esc_html(get_post_type()); ?></span></td>
                                        <td><span class="sr-status-badge"><?php echo esc_html(get_post_status()); ?></span></td>
                                        <td><?php echo esc_html(get_the_date('Y/m/d')); ?></td>
                                        <td>
                                            <button type="button" class="sr-btn-action sr-btn-edit sr-btn-edit-cpt" data-id="<?php the_ID(); ?>">ویرایش</button>
                                            <button type="button" class="sr-btn-action sr-btn-delete-cpt" data-id="<?php the_ID(); ?>">حذف</button>
                                        </td>
                                    </tr>
                                <?php
                                    endwhile;
                                    wp_reset_postdata();
                                else:
                                ?>
                                    <tr><td colspan="5" style="text-align:center;">هنوز محتوایی ثبت نشده است.</td></tr>
                                <?php endif; ?>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Tab 3: User Accounts Hub -->
                <?php if ($is_admin): ?>
                <div id="tab-users" class="sr-tab-pane">
                    <div class="sr-panel-header">
                        <h3>مدیریت و پایش اکانت‌های کاربران</h3>
                        <div class="sr-panel-actions">
                            <button type="button" id="sr-btn-export-users-csv" class="sr-btn sr-btn-outline">📤 خروجی CSV کاربران</button>
                            <button type="button" id="sr-btn-open-bulk-users" class="sr-btn sr-btn-secondary">📥 درون‌ریزی گروهی CSV</button>
                            <button type="button" id="sr-btn-new-user" class="sr-btn sr-btn-primary">+ ایجاد دستی کاربر جدید</button>
                        </div>
                    </div>

                    <!-- Bulk CSV User Import Modal -->
                    <div id="sr-bulk-users-modal" class="sr-modal" style="display:none;">
                        <div class="sr-modal-content">
                            <span class="sr-modal-close">&times;</span>
                            <h4>درون‌ریزی گروهی حساب‌های کاربری با CSV</h4>
                            <p class="sr-bulk-hint">هر سطر یک کاربر با فرمت: <code>username,email,display_name,role,domain_tag,phone,password</code></p>
                            <form id="sr-bulk-users-form">
                                <div class="sr-form-group">
                                    <label for="sr-bulk-users-csv">محتوای CSV کاربران:</label>
                                    <textarea id="sr-bulk-users-csv" class="sr-bulk-textarea" name="csv_data" rows="6" required placeholder="username,email,display_name,role,domain_tag,phone,password&#10;ali_rezaei,ali@example.com,علی رضایی,client,legal,09120000001,Str0ng!Pass"></textarea>
                                </div>
                                <div class="sr-modal-actions">
                                    <button type="submit" class="sr-btn sr-btn-primary">اجرای درون‌ریزی در دیتابیس</button>
                                    <button type="button" class="sr-btn sr-btn-secondary sr-modal-cancel">انصراف</button>
                                </div>
                                <div class="sr-modal-feedback"></div>
                            </form>
                        </div>
                    </div>

                    <!-- Create User Modal -->
                    <div id="sr-user-modal" class="sr-modal" style="display:none;">
                        <div class="sr-modal-content">
                            <span class="sr-modal-close">&times;</span>
                            <h4>افزودن دستی حساب کاربری جدید توسط مدیر</h4>
                            <form id="sr-create-user-form">
                                <div class="sr-form-group">
                                    <label>نام کاربری (Username):</label>
                                    <input type="text" name="username" required placeholder="مثال: john_doe">
                                </div>
                                <div class="sr-form-group">
                                    <label>آدرس ایمیل:</label>
                                    <input type="email" name="email" required placeholder="user@example.com">
                                </div>
                                <div class="sr-form-group">
                                    <label>نام نمایشی:</label>
                                    <input type="text" name="display_name" placeholder="نام و نام خانوادگی">
                                </div>
                                <div class="sr-form-group">
                                    <label>رمز عبور اولیه:</label>
                                    <input type="password" name="password" required placeholder="••••••••">
                                </div>
                                <div class="sr-form-group">
                                    <label>نقش کاربری (Role):</label>
                                    <select name="role">
                                        <option value="subscriber">مشترک / کاربر عادی (Subscriber)</option>
                                        <option value="client">موکل / مشتری (Client)</option>
                                        <option value="author">نویسنده / محتواگذار (Author)</option>
                                        <option value="editor">ویرایشگر ارشد (Editor)</option>
                                        <option value="lawyer">وکیل دادگستری (Lawyer)</option>
                                        <option value="administrator">مدیر کل سیستم (Administrator)</option>
                                    </select>
                                </div>
                                <div class="sr-form-group">
                                    <label>شماره تماس (اختیاری):</label>
                                    <input type="tel" name="phone" placeholder="۰۹۱۲۰۰۰۰۰۰۰">
                                </div>
                                <div class="sr-form-group">
                                    <label>حوزه یا صنف مربوطه:</label>
                                    <input type="text" name="domain_tag" placeholder="مثال: حقوقی، طراحی وب، فروشگاهی">
                                </div>
                                <div class="sr-modal-actions">
                                    <button type="submit" class="sr-btn sr-btn-primary">ایجاد حساب در دیتابیس</button>
                                    <button type="button" class="sr-btn sr-btn-secondary sr-modal-cancel">انصراف</button>
                                </div>
                                <div class="sr-modal-feedback"></div>
                            </form>
                        </div>
                    </div>

                    <!-- Search / Filter Users -->
                    <div class="sr-filter-bar">
                        <input type="text" id="sr-user-search-input" placeholder="جستجو بر اساس نام، نام کاربری یا ایمیل...">
                        <select id="sr-user-role-filter">
                            <option value="">همه نقش‌ها</option>
                            <option value="administrator">مدیران کل</option>
                            <option value="editor">ویرایشگران</option>
                            <option value="author">نویسندگان</option>
                            <option value="client">مشتریان و موکلین</option>
                            <option value="subscriber">مشترکان</option>
                        </select>
                    </div>

                    <div class="sr-table-responsive">
                        <table class="sr-cockpit-table" id="sr-users-table">
                            <thead>
                                <tr>
                                    <th>نام و نام کاربری</th>
                                    <th>ایمیل</th>
                                    <th>نقش</th>
                                    <th>حوزه / صنف</th>
                                    <th>تاریخ عضویت</th>
                                    <th>عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                $all_users = get_users(['number' => 30, 'orderby' => 'registered', 'order' => 'DESC']);
                                foreach ($all_users as $u):
                                ?>
                                    <tr data-user-id="<?php echo esc_attr($u->ID); ?>">
                                        <td>
                                            <strong><?php echo esc_html($u->display_name); ?></strong><br>
                                            <small class="sr-muted">@<?php echo esc_html($u->user_login); ?></small>
                                        </td>
                                        <td><?php echo esc_html($u->user_email); ?></td>
                                        <td><span class="sr-tag"><?php echo esc_html(implode(', ', $u->roles)); ?></span></td>
                                        <td><?php echo esc_html(get_user_meta($u->ID, '_sr_user_domain_tag', true) ?: 'عمومی'); ?></td>
                                        <td><?php echo esc_html(date_i18n('Y/m/d', strtotime($u->user_registered))); ?></td>
                                        <td>
                                            <?php if ($u->ID !== get_current_user_id()): ?>
                                                <button type="button" class="sr-btn-action sr-btn-delete-user" data-id="<?php echo esc_attr($u->ID); ?>">حذف</button>
                                            <?php else: ?>
                                                <span class="sr-muted">حساب فعال</span>
                                            <?php endif; ?>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Tab 4: Plugin Hub -->
                <div id="tab-plugins" class="sr-tab-pane">
                    <div class="sr-panel-header">
                        <h3>نصب و مدیریت مستقیم افزونه‌ها از داخل پیشخوان</h3>
                        <p>نصب ۱-کلیکی ماژول‌های مستقل بدون نیاز به خروج از رابط کاربری فرانت‌اند.</p>
                    </div>
                    <div class="sr-plugins-grid">
                        <?php
                        $plugins_catalog = [
                            [
                                'slug' => 'sedrazavi-designer-core',
                                'name' => 'افزونه هسته اختصاصی طراح (Designer Core)',
                                'desc' => 'شامل ویجت‌های تعاملی ساعت سه‌گانه، بازی دایناسور نئونی، موزیک پلیر سایبرپانک و ساعت جهانی.',
                            ],
                            [
                                'slug' => 'elementor-addon-suite',
                                'name' => 'سوئیت ویجت‌ها و قالب‌های المنتور (Addon Suite)',
                                'desc' => 'شامل ۳۱ ویجت بومی، ۳۳ قالب کانتینری آماده و تم‌بیلدر بریج.',
                            ],
                            [
                                'slug' => 'sedrazavi-addons',
                                'name' => 'افزونه تخصصی خدمات و وکالت (Vertical Addons)',
                                'desc' => 'شامل فرم‌های پیشرفته، پورتال و امکانات تعاملی اصناف.',
                            ],
                        ];
                        foreach ($plugins_catalog as $pkg):
                            $is_installed = file_exists(WP_PLUGIN_DIR . '/' . $pkg['slug']);
                            $is_active    = is_plugin_active($pkg['slug'] . '/' . $pkg['slug'] . '.php');
                        ?>
                            <div class="sr-plugin-card">
                                <h4><?php echo esc_html($pkg['name']); ?></h4>
                                <p><?php echo esc_html($pkg['desc']); ?></p>
                                <div class="sr-plugin-status">
                                    وضعیت: 
                                    <?php if ($is_active): ?>
                                        <span class="sr-status-active">فعال و آماده به‌کار</span>
                                    <?php elseif ($is_installed): ?>
                                        <span class="sr-status-installed">نصب شده (غیرفعال)</span>
                                    <?php else: ?>
                                        <span class="sr-status-missing">آماده نصب ۱-کلیکی</span>
                                    <?php endif; ?>
                                </div>
                                <div class="sr-plugin-actions">
                                    <?php if (!$is_installed): ?>
                                        <button type="button" class="sr-btn sr-btn-primary sr-btn-install-pkg" data-slug="<?php echo esc_attr($pkg['slug']); ?>">
                                            نصب و فعال‌سازی مستقیم
                                        </button>
                                    <?php endif; ?>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- Tab 5: Visual Site Kit Builder (Zero-Lockin Autonomous Packaging) -->
                <div id="tab-sitekit" class="sr-tab-pane">
                    <div class="sr-panel-header">
                        <span class="sr-badge">معماری مستقل و بدون وابستگی (Zero-Lockin)</span>
                        <h3>سازنده اختصاصی کیت سایت (Site Kit Builder)</h3>
                        <p>انتخاب هوشمند صنف و استخراج خودکار ویجت‌ها، قالب‌های المنتور و گراف وابستگی‌ها به صورت بسته مستقل ZIP یا نصب مستقیم با ۱ کلیک در وردپرس.</p>
                    </div>

                    <div class="sr-sitekit-container">
                        <!-- 1. Niche Presets -->
                        <div class="sr-sitekit-section">
                            <label class="sr-label-title">🎯 انتخاب سریع صنف / موضوع پروژه (Preset Selector):</label>
                            <div class="sr-sitekit-niche-grid">
                                <button type="button" class="sr-niche-pill active" data-niche="general">🌐 پروژه عمومی / همه‌منظوره</button>
                                <button type="button" class="sr-niche-pill" data-niche="legal">⚖️ موسسه حقوقی و داوری (Legal)</button>
                                <button type="button" class="sr-niche-pill" data-niche="creative">🎨 آژانس دیجیتال و وب (Agency)</button>
                                <button type="button" class="sr-niche-pill" data-niche="healthcare">🩺 کلینیک و پزشکی (Clinic)</button>
                                <button type="button" class="sr-niche-pill" data-niche="enterprise">🏢 شرکتی و هلدینگ (Corporate)</button>
                                <button type="button" class="sr-niche-pill" data-niche="education">🎓 آموزش و آکادمی (Education)</button>
                                <button type="button" class="sr-niche-pill" data-niche="publishing">📰 مجله خبری و رسانه (News)</button>
                                <button type="button" class="sr-niche-pill" data-niche="commerce">🛍️ فروشگاهی مدرن (Store)</button>
                            </div>
                        </div>

                        <!-- 2. Project Metadata -->
                        <div class="sr-sitekit-section">
                            <div class="sr-sitekit-form-row">
                                <div class="sr-form-group">
                                    <label for="sr_sitekit_name">نام نمایشی کیت پروژه:</label>
                                    <input type="text" id="sr_sitekit_name" class="sr-sitekit-input" value="کیت سایت اختصاصی المنتور">
                                </div>
                                <div class="sr-form-group">
                                    <label for="sr_sitekit_slug">شناسه انگلیسی بسته (Slug):</label>
                                    <input type="text" id="sr_sitekit_slug" class="sr-sitekit-input" value="custom-project-kit">
                                </div>
                            </div>
                        </div>

                        <!-- 3. Widget Selector Grid (31 Native Widgets) -->
                        <div class="sr-sitekit-section">
                            <div class="sr-section-top">
                                <div>
                                    <h4 class="sr-subtitle">🧩 انتخاب ویجت‌های بومی المنتور (۳۱ ویجت مستقل):</h4>
                                    <p class="sr-subdesc">ویجت‌های موردنیاز را تیک بزنید؛ وابستگی‌ها به صورت خودکار شناسایی و الحاق می‌شوند.</p>
                                </div>
                                <div class="sr-quick-actions">
                                    <button type="button" id="sr-btn-select-all-widgets" class="sr-btn-text">انتخاب همه</button>
                                    <button type="button" id="sr-btn-deselect-all-widgets" class="sr-btn-text">لغو انتخاب</button>
                                </div>
                            </div>
                            <div class="sr-sitekit-grid-selector">
                                <?php
                                $widgets_list = [
                                    ['slug' => 'hero', 'name' => 'هیرو اسلایدر پیشرفته', 'cat' => 'هدر', 'badge' => 'سریع'],
                                    ['slug' => 'hero_split', 'name' => 'هیرو اسپلیت دوطرفه', 'cat' => 'هدر', 'badge' => 'مدرن'],
                                    ['slug' => 'banner_slider', 'name' => 'اسلایدر بنر و تبلیغات', 'cat' => 'مدیا', 'badge' => 'اسلایدر'],
                                    ['slug' => 'bento_tabs', 'name' => 'بنتو تبز مدرن', 'cat' => 'چیدمان', 'badge' => 'Bento'],
                                    ['slug' => 'case_timeline', 'name' => 'تایم‌لاین پرونده و فرآیند', 'cat' => 'تخصصی', 'badge' => 'حقوقی'],
                                    ['slug' => 'client_portal', 'name' => 'پورتال موکلین و مشتریان', 'cat' => 'کاربری', 'badge' => 'داشبورد'],
                                    ['slug' => 'contact_booking', 'name' => 'رزرواسیون و نوبت‌دهی', 'cat' => 'فرم‌ها', 'badge' => 'رزرو'],
                                    ['slug' => 'cta', 'name' => 'باکس اقدام به عمل (CTA)', 'cat' => 'تبدیل', 'badge' => 'فروش'],
                                    ['slug' => 'download_box', 'name' => 'باکس دانلود چندمنظوره', 'cat' => 'محتوا', 'badge' => 'دانلود'],
                                    ['slug' => 'dynamic_grid', 'name' => 'گرید پویای پست‌ها و آیتم‌ها', 'cat' => 'کوئری', 'badge' => 'Dynamic'],
                                    ['slug' => 'email_otp', 'name' => 'فرم ورود با رمز یکبارمصرف (OTP)', 'cat' => 'احراز هویت', 'badge' => 'OTP'],
                                    ['slug' => 'faq', 'name' => 'پرسش‌های متداول (FAQ)', 'cat' => 'محتوا', 'badge' => 'آکاردئون'],
                                    ['slug' => 'firm_milestones', 'name' => 'افتخارات و نقاط عطف شرکت', 'cat' => 'دستاوردها', 'badge' => 'Milestones'],
                                    ['slug' => 'floating_cta', 'name' => 'نوار شناور استیکی تبدیل', 'cat' => 'تبدیل', 'badge' => 'Sticky'],
                                    ['slug' => 'floating_dock', 'name' => 'داک شناور ابزارها', 'cat' => 'ناوبری', 'badge' => 'Dock'],
                                    ['slug' => 'fomo_countdown', 'name' => 'شمارنده فوریت و تخفیف (FOMO)', 'cat' => 'فروشگاهی', 'badge' => 'FOMO'],
                                    ['slug' => 'news_ticker', 'name' => 'نوار اخبار فوری و اعلان‌ها', 'cat' => 'رسانه', 'badge' => 'Ticker'],
                                    ['slug' => 'posts', 'name' => 'گرید پیشرفته نوشته‌ها', 'cat' => 'کوئری', 'badge' => 'Query'],
                                    ['slug' => 'pricing_matrix', 'name' => 'ماتریس جامع مقایسه ویژگی‌ها', 'cat' => 'قیمت‌گذاری', 'badge' => 'جدول'],
                                    ['slug' => 'pricing_switcher', 'name' => 'جدول نرخ‌گذاری ماهانه/سالانه', 'cat' => 'قیمت‌گذاری', 'badge' => 'سوییچر'],
                                    ['slug' => 'radar_chart', 'name' => 'نمودار راداری مهارت‌ها', 'cat' => 'آمار', 'badge' => 'SVG Radar'],
                                    ['slug' => 'services_grid', 'name' => 'گرید شبکه‌ای خدمات', 'cat' => 'محتوا', 'badge' => 'Services'],
                                    ['slug' => 'spotplayer_course', 'name' => 'پلیر و دوره اسپات‌پلیر', 'cat' => 'آموزش', 'badge' => 'SpotPlayer'],
                                    ['slug' => 'stat_counter', 'name' => 'پیشخوان آمار و ارقام انیمیشنی', 'cat' => 'دستاوردها', 'badge' => 'Counter'],
                                    ['slug' => 'story_bar', 'name' => 'استوری‌بار اینستاگرامی', 'cat' => 'رسانه', 'badge' => 'Stories'],
                                    ['slug' => 'team', 'name' => 'معرفی اعضای تیم و متخصصان', 'cat' => 'تیم', 'badge' => 'Team'],
                                    ['slug' => 'testimonials', 'name' => 'دیدگاه و رضایت‌نامه مشتریان', 'cat' => 'محتوا', 'badge' => 'Reviews'],
                                    ['slug' => 'theme_toggle', 'name' => 'سوییچر حالت دارک/لایت', 'cat' => 'ابزار', 'badge' => 'Dark Mode'],
                                    ['slug' => 'video', 'name' => 'پلیر ویدئویی مدرن با پوستر', 'cat' => 'مدیا', 'badge' => 'Video'],
                                    ['slug' => 'vip_pricing', 'name' => 'کارت‌های قیمت‌گذاری ویژه (VIP)', 'cat' => 'قیمت‌گذاری', 'badge' => 'VIP'],
                                    ['slug' => 'before_after', 'name' => 'اسلایدر مقایسه‌ای قبل و بعد', 'cat' => 'مدیا', 'badge' => 'مقایسه'],
                                ];

                                foreach ($widgets_list as $w):
                                ?>
                                    <label class="sr-sitekit-card">
                                        <input type="checkbox" class="sr-sitekit-widget-cb" value="<?php echo esc_attr($w['slug']); ?>" checked>
                                        <div class="sr-card-body">
                                            <div class="sr-card-header">
                                                <span class="sr-sitekit-badge"><?php echo esc_html($w['cat']); ?></span>
                                                <small class="sr-tag"><?php echo esc_html($w['badge']); ?></small>
                                            </div>
                                            <strong><?php echo esc_html($w['name']); ?></strong>
                                            <code>uas_<?php echo esc_html($w['slug']); ?></code>
                                        </div>
                                    </label>
                                <?php endforeach; ?>
                            </div>
                        </div>

                        <!-- 4. Template Selector Grid (33 Native Elementor Templates) -->
                        <div class="sr-sitekit-section">
                            <div class="sr-section-top">
                                <div>
                                    <h4 class="sr-subtitle">📑 انتخاب قالب‌های آماده المنتور (۳۳ قالب کانتینری JSON):</h4>
                                    <p class="sr-subdesc">قالب‌های موردنیاز را علامت بزنید؛ این قالب‌ها هنگام نصب خودکار وارد کتابخانه المنتور می‌شوند.</p>
                                </div>
                                <div class="sr-quick-actions">
                                    <button type="button" id="sr-btn-select-all-templates" class="sr-btn-text">انتخاب همه</button>
                                    <button type="button" id="sr-btn-deselect-all-templates" class="sr-btn-text">لغو انتخاب</button>
                                </div>
                            </div>
                            <div class="sr-sitekit-grid-selector">
                                <?php
                                $templates_list = [
                                    ['slug' => 'template-designer-landing', 'name' => 'لندینگ جامع طراح خلاق', 'type' => 'Landing'],
                                    ['slug' => 'template-home-corporate-pro', 'name' => 'صفحه اصلی شرکتی پرو', 'type' => 'Home'],
                                    ['slug' => 'template-home-creative-agency', 'name' => 'صفحه اصلی آژانس خلاق', 'type' => 'Home'],
                                    ['slug' => 'template-home-saas-master', 'name' => 'صفحه اصلی استارتاپ و SaaS', 'type' => 'Home'],
                                    ['slug' => 'template-hero-section', 'name' => 'سکشن هیرو گرادیان مدرن', 'type' => 'Section'],
                                    ['slug' => 'template-bento-services-grid', 'name' => 'گرید بنتو خدمات', 'type' => 'Section'],
                                    ['slug' => 'template-case-timeline', 'name' => 'تایم‌لاین پیگیری پرونده‌ها', 'type' => 'Section'],
                                    ['slug' => 'template-contact-booking-split', 'name' => 'سکشن تماس و رزرواسیون', 'type' => 'Section'],
                                    ['slug' => 'template-dynamic-showcase-grid', 'name' => 'گرید شوکیس پویا', 'type' => 'Section'],
                                    ['slug' => 'template-features-grid', 'name' => 'گرید ویژگی‌ها و امکانات', 'type' => 'Section'],
                                    ['slug' => 'template-pricing-matrix-table', 'name' => 'جدول ماتریس قیمت‌گذاری', 'type' => 'Section'],
                                    ['slug' => 'template-pricing-table', 'name' => 'جدول نرخ‌گذاری استاندارد', 'type' => 'Section'],
                                    ['slug' => 'template-vip-pricing-tier', 'name' => 'پلن‌های ویژه اشتراک VIP', 'type' => 'Section'],
                                    ['slug' => 'template-section-client-proof', 'name' => 'سکشن اعتبار و لوگوی مشتریان', 'type' => 'Section'],
                                    ['slug' => 'template-section-stat-counter', 'name' => 'شمارنده دستاوردها و ارقام', 'type' => 'Section'],
                                    ['slug' => 'template-services-bento', 'name' => 'سکشن کارت‌های بنتو', 'type' => 'Section'],
                                    ['slug' => 'template-header-sticky-glass', 'name' => 'سربرگ استیکی شیشه‌ای', 'type' => 'Header'],
                                    ['slug' => 'template-footer-mega-4col', 'name' => 'پاورقی مگا ۴ ستونه', 'type' => 'Footer'],
                                    ['slug' => 'template-footer-rich', 'name' => 'پاورقی غنی با خبرنامه', 'type' => 'Footer'],
                                    ['slug' => 'template-archive-blog-grid', 'name' => 'آرشیو بلاگ شبکه‌ای', 'type' => 'Archive'],
                                    ['slug' => 'template-single-post-modern', 'name' => 'صفحه تک‌نوشته مدرن', 'type' => 'Single'],
                                    ['slug' => 'template-portfolio-showcase', 'name' => 'شوکیس نمونه‌کارها', 'type' => 'Archive'],
                                    ['slug' => 'template-store-showcase', 'name' => 'ویترین محصولات فروشگاه', 'type' => 'Shop'],
                                    ['slug' => 'template-single-product-master', 'name' => 'صفحه محصول ووکامرس', 'type' => 'Single'],
                                    ['slug' => 'template-podcast-hub', 'name' => 'هاب پادکست و فایل صوتی', 'type' => 'Archive'],
                                    ['slug' => 'template-video-archive', 'name' => 'آرشیو دوره‌های ویدئویی', 'type' => 'Archive'],
                                    ['slug' => 'template-single-video-player', 'name' => 'پلیر ویدیویی سینمایی', 'type' => 'Single'],
                                    ['slug' => 'template-faq-accordion', 'name' => 'باکس سوالات متداول', 'type' => 'Section'],
                                    ['slug' => 'template-section-floating-lead', 'name' => 'نوار لید کپچر شناور', 'type' => 'Section'],
                                    ['slug' => 'template-error-404-smart', 'name' => 'صفحه خطای ۴۰۴ هوشمند', 'type' => 'Single'],
                                    ['slug' => 'popup-booking-lead', 'name' => 'پاپ‌آپ دریافت نوبت و سرنخ', 'type' => 'Popup'],
                                    ['slug' => 'popup-status-tracker', 'name' => 'پاپ‌آپ استعلام وضعیت', 'type' => 'Popup'],
                                    ['slug' => 'popup-story-modal', 'name' => 'پاپ‌آپ مودال استوری', 'type' => 'Popup'],
                                ];

                                foreach ($templates_list as $t):
                                ?>
                                    <label class="sr-sitekit-card">
                                        <input type="checkbox" class="sr-sitekit-tpl-cb" value="<?php echo esc_attr($t['slug']); ?>" checked>
                                        <div class="sr-card-body">
                                            <div class="sr-card-header">
                                                <span class="sr-sitekit-badge sr-badge-tpl"><?php echo esc_html($t['type']); ?></span>
                                            </div>
                                            <strong><?php echo esc_html($t['name']); ?></strong>
                                            <code><?php echo esc_html($t['slug']); ?>.json</code>
                                        </div>
                                    </label>
                                <?php endforeach; ?>
                            </div>
                        </div>

                        <!-- 4B. Gutenberg Blocks Selector Grid (7 Native Blocks) -->
                        <div class="sr-sitekit-section">
                            <div class="sr-section-top">
                                <div>
                                    <h4 class="sr-subtitle">🧱 انتخاب بلوک‌های بومی گوتنبرگ (۷ بلوک مستقل):</h4>
                                    <p class="sr-subdesc">بلوک‌های ویرایشگر گوتنبرگ جهت استفاده بدون نیاز به المنتور در صفحه‌ساز بومی وردپرس.</p>
                                </div>
                                <div class="sr-quick-actions">
                                    <button type="button" id="sr-btn-select-all-blocks" class="sr-btn-text">انتخاب همه</button>
                                    <button type="button" id="sr-btn-deselect-all-blocks" class="sr-btn-text">لغو انتخاب</button>
                                </div>
                            </div>
                            <div class="sr-sitekit-grid-selector">
                                <?php
                                $blocks_list = [
                                    ['slug' => 'sovereign-vector-bg', 'name' => 'بک‌گراند وکتور مستقل (۶۶ مدل)', 'badge' => 'Vectors'],
                                    ['slug' => 'sovereign-widget',    'name' => 'ابزارک بومی مستقل',            'badge' => 'Widget'],
                                    ['slug' => 'sovereign-divider',   'name' => 'جداکننده سکشن وکتور (۶۶ مدل)', 'badge' => 'Divider'],
                                    ['slug' => 'sovereign-badge',     'name' => 'نشان اعتبار و مهر امنیتی',     'badge' => 'Badge'],
                                    ['slug' => 'sovereign-section',   'name' => 'بلوک سکشن آماده (۶۶ سناریو)',   'badge' => 'Section'],
                                    ['slug' => 'sovereign-motion',    'name' => 'لفاف انیمیشن ۶۰ فریم',          'badge' => 'Motion'],
                                    ['slug' => 'sovereign-icon',      'name' => 'آیکون برداری بدون CDN',        'badge' => 'Icons'],
                                ];
                                foreach ($blocks_list as $blk):
                                ?>
                                    <label class="sr-sitekit-card">
                                        <input type="checkbox" class="sr-sitekit-block-cb" value="<?php echo esc_attr($blk['slug']); ?>" checked>
                                        <div class="sr-card-body">
                                            <div class="sr-card-header">
                                                <span class="sr-sitekit-badge"><?php echo esc_html($blk['badge']); ?></span>
                                            </div>
                                            <strong><?php echo esc_html($blk['name']); ?></strong>
                                            <code>sedrazavi/<?php echo esc_html($blk['slug']); ?></code>
                                        </div>
                                    </label>
                                <?php endforeach; ?>
                            </div>
                        </div>

                        <!-- 4C. Portable CPT Schemas Selector -->
                        <div class="sr-sitekit-section">
                            <div class="sr-section-top">
                                <div>
                                    <h4 class="sr-subtitle">🗂️ انتخاب اسکیمای پست‌تایپ‌های قابل حمل (CPT Schemas):</h4>
                                    <p class="sr-subdesc">اسکیمای پست‌تایپ‌ها و تاکسونومی‌ها با گارد عدم تداخل (post_type_exists) در سایت مقصد ثبت می‌شود.</p>
                                </div>
                            </div>
                            <div class="sr-sitekit-grid-selector">
                                <?php
                                $cpts_list = [
                                    ['slug' => 'portfolio',  'name' => 'نمونه‌کارها (Portfolio)',         'badge' => 'Public CPT'],
                                    ['slug' => 'services',   'name' => 'خدمات تخصصی (Services)',           'badge' => 'Public CPT'],
                                    ['slug' => 'case_study', 'name' => 'دعاوی موفق و مطالعات موردی',       'badge' => 'Public CPT'],
                                ];
                                foreach ($cpts_list as $cpt_item):
                                ?>
                                    <label class="sr-sitekit-card">
                                        <input type="checkbox" class="sr-sitekit-cpt-cb" value="<?php echo esc_attr($cpt_item['slug']); ?>" checked>
                                        <div class="sr-card-body">
                                            <div class="sr-card-header">
                                                <span class="sr-sitekit-badge"><?php echo esc_html($cpt_item['badge']); ?></span>
                                            </div>
                                            <strong><?php echo esc_html($cpt_item['name']); ?></strong>
                                            <code><?php echo esc_html($cpt_item['slug']); ?></code>
                                        </div>
                                    </label>
                                <?php endforeach; ?>
                            </div>
                        </div>

                        <!-- 5. Live Dependency Radar & Capability Inspector -->
                        <div class="sr-sitekit-section sr-sitekit-radar-card">
                            <h4 class="sr-subtitle">⚡ پایشگر گراف وابستگی و خودکفایی (Capability Radar):</h4>
                            <div class="sr-sitekit-radar-grid">
                                <div class="sr-sitekit-radar-item">
                                    <span class="sr-radar-num" id="sr-sitekit-widget-count">31</span>
                                    <span class="sr-radar-label">ویجت‌های فعال بسته</span>
                                </div>
                                <div class="sr-sitekit-radar-item">
                                    <span class="sr-radar-num" id="sr-sitekit-tpl-count">33</span>
                                    <span class="sr-radar-label">قالب‌های آماده جهت تزریق</span>
                                </div>
                                <div class="sr-sitekit-radar-item">
                                    <span class="sr-radar-num" id="sr-sitekit-block-count">7</span>
                                    <span class="sr-radar-label">بلوک‌های بومی گوتنبرگ</span>
                                </div>
                                <div class="sr-sitekit-radar-item">
                                    <span class="sr-radar-num" id="sr-sitekit-cpt-count">3</span>
                                    <span class="sr-radar-label">اسکیمای پست‌تایپ (CPT)</span>
                                </div>
                                <div class="sr-sitekit-radar-item">
                                    <span class="sr-radar-val" id="sr-sitekit-query-dep">اتصال خودکار کوئری (Dynamic Query Engine)</span>
                                    <span class="sr-radar-label">موتور کوئری پویا</span>
                                </div>
                                <div class="sr-sitekit-radar-item">
                                    <span class="sr-radar-val sr-status-active">تأییدشده ۱۰۰٪ مستقل (Zero-Lockin)</span>
                                    <span class="sr-radar-label">سازگاری با هر سایت وردپرس</span>
                                </div>
                            </div>
                        </div>

                        <!-- 6. Action Control Hub -->
                        <div class="sr-sitekit-actions">
                            <button type="button" id="sr-btn-sitekit-preflight" class="sr-btn sr-btn-outline">
                                🔍 اعتبارسنجی پیش‌پرواز (Preflight Check)
                            </button>
                            <button type="button" id="sr-btn-sitekit-build" class="sr-btn sr-btn-primary">
                                📦 کامپایل و دانلود بسته مستقل ZIP
                            </button>
                            <button type="button" id="sr-btn-sitekit-install" class="sr-btn sr-btn-success">
                                🚀 نصب و فعال‌سازی مستقیم در همین وردپرس
                            </button>
                            <button type="button" id="sr-btn-sitekit-rollback" class="sr-btn sr-btn-danger">
                                🔄 رول‌بک کامل کیت مستقرشده (Rollback)
                            </button>
                        </div>

                        <!-- Feedback Box -->
                        <div id="sr-sitekit-feedback" class="sr-sitekit-feedback"></div>

                        <!-- 7. Persisted Deployed Kits Registry from wp_options -->
                        <?php
                        $deployed_kits = get_option('sr_cockpit_deployed_kits', []);
                        if (is_array($deployed_kits) && !empty($deployed_kits)):
                        ?>
                        <div class="sr-sitekit-section sr-deployed-kits-list">
                            <h4 class="sr-subtitle">📋 فهرست کیت‌های مستقرشده در دیتابیس این سایت (wp_options):</h4>
                            <div class="sr-table-responsive">
                                <table class="sr-cockpit-table">
                                    <thead>
                                        <tr>
                                            <th>نام کیت</th>
                                            <th>Slug</th>
                                            <th>اجزا</th>
                                            <th>تاریخ استقرار</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($deployed_kits as $dk): ?>
                                            <tr>
                                                <td><strong><?php echo esc_html($dk['name'] ?? ''); ?></strong></td>
                                                <td><code><?php echo esc_html($dk['slug'] ?? ''); ?></code></td>
                                                <td><?php echo esc_html(($dk['widgets_count'] ?? 0) . ' ویجت / ' . ($dk['blocks_count'] ?? 0) . ' بلوک / ' . ($dk['templates_count'] ?? 0) . ' قالب'); ?></td>
                                                <td><?php echo esc_html($dk['deployed_at'] ?? ''); ?></td>
                                            </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <?php endif; ?>
                    </div>
                </div>

                <!-- Tab 6: WordPress DB Brand, Colors & Options Settings -->
                <div id="tab-settings" class="sr-tab-pane">
                    <div class="sr-panel-header">
                        <h3>تنظیمات برند، توکن‌های رنگی و مشخصات دفتر (ذخیره‌سازی مستقیم در wp_options)</h3>
                    </div>
                    <form id="sr-site-settings-form" class="sr-sitekit-section">
                        <div class="sr-settings-grid">
                            <div class="sr-form-group">
                                <label for="sr_opt_phone">شماره تلفن مستقیم دفتر:</label>
                                <input type="text" id="sr_opt_phone" name="sedrazavi_office_phone" value="<?php echo esc_attr(get_option('sedrazavi_office_phone', '۰۲۱-۸۸۹۹۰۰۱۱')); ?>">
                            </div>
                            <div class="sr-form-group">
                                <label for="sr_opt_email">ایمیل رسمی دفتر:</label>
                                <input type="email" id="sr_opt_email" name="sedrazavi_office_email" value="<?php echo esc_attr(get_option('sedrazavi_office_email', 'info@sedrazavi-law.ir')); ?>">
                            </div>
                            <div class="sr-form-group">
                                <label for="sr_opt_address">نشانی دفتر:</label>
                                <input type="text" id="sr_opt_address" name="sedrazavi_office_address" value="<?php echo esc_attr(get_option('sedrazavi_office_address', '')); ?>">
                            </div>
                            <div class="sr-form-group">
                                <label for="sr_opt_hours">ساعات پاسخگویی:</label>
                                <input type="text" id="sr_opt_hours" name="sedrazavi_working_hours" value="<?php echo esc_attr(get_option('sedrazavi_working_hours', 'شنبه تا چهارشنبه ۹ الی ۱۸')); ?>">
                            </div>
                            <div class="sr-form-group">
                                <label for="sr_opt_gold">کد رنگ شاخص اصلی (Hex):</label>
                                <input type="text" id="sr_opt_gold" name="sedrazavi_primary_gold" value="<?php echo esc_attr(get_option('sedrazavi_primary_gold', '#D4AF37')); ?>">
                            </div>
                            <div class="sr-form-group">
                                <label for="sr_opt_navy">کد رنگ پایه دوم (Hex):</label>
                                <input type="text" id="sr_opt_navy" name="sedrazavi_secondary_navy" value="<?php echo esc_attr(get_option('sedrazavi_secondary_navy', '#0B132B')); ?>">
                            </div>
                            <div class="sr-form-group">
                                <label for="sr_opt_font">فونت اصلی سامانه:</label>
                                <input type="text" id="sr_opt_font" name="sedrazavi_font_family" value="<?php echo esc_attr(get_option('sedrazavi_font_family', 'Vazirmatn')); ?>">
                            </div>
                            <div class="sr-form-group">
                                <label for="sr_opt_scenario">سناریوی چیدمان فعال:</label>
                                <?php $cur_sc = get_option('sedrazavi_active_scenario', 'bento-hud'); ?>
                                <select id="sr_opt_scenario" name="sedrazavi_active_scenario">
                                    <option value="bento-hud" <?php selected($cur_sc, 'bento-hud'); ?>>Bento HUD (پیش‌فرض مدرن)</option>
                                    <option value="dense-matrix" <?php selected($cur_sc, 'dense-matrix'); ?>>Dense Matrix (داده‌محور متراکم)</option>
                                    <option value="hybrid-executive" <?php selected($cur_sc, 'hybrid-executive'); ?>>Hybrid Executive (ترکیبی مدیریتی)</option>
                                </select>
                            </div>
                        </div>
                        <div class="sr-modal-actions">
                            <button type="submit" class="sr-btn sr-btn-primary">💾 ذخیره مستقیم در دیتابیس وردپرس (wp_options)</button>
                        </div>
                        <div id="sr-site-settings-feedback" class="sr-form-feedback"></div>
                    </form>
                </div>
                <?php endif; ?>

            <?php endif; ?>
        </div>
        <?php
        return ob_get_clean();
    }
}

Frontend_Cockpit_Engine::instance();
