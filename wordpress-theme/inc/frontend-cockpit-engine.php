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

        // In-Dashboard Plugin Installer
        add_action('wp_ajax_sr_cockpit_install_plugin', [$this, 'ajax_install_plugin']);
        add_action('wp_ajax_sr_cockpit_toggle_plugin', [$this, 'ajax_toggle_plugin']);

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

        if (empty($title)) {
            wp_send_json_error(['message' => __('عنوان نمی‌تواند خالی باشد.', 'sedrazavi')]);
        }

        // Check ownership if editing existing post
        if ($post_id > 0) {
            $existing = get_post($post_id);
            if (!$existing) {
                wp_send_json_error(['message' => __('پست مورد نظر یافت نشد.', 'sedrazavi')]);
            }
            if (!current_user_can('edit_others_posts') && $existing->post_author != get_current_user_id()) {
                wp_send_json_error(['message' => __('شما اجازه ویرایش این پست را ندارید.', 'sedrazavi')]);
            }
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

        // Save Custom Metaboxes based on post type
        $meta_fields = $_POST['meta'] ?? [];
        if (is_array($meta_fields)) {
            foreach ($meta_fields as $meta_key => $meta_val) {
                $clean_key = sanitize_key($meta_key);
                $clean_val = is_array($meta_val) ? array_map('sanitize_text_field', $meta_val) : sanitize_text_field($meta_val);
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

        if (!is_user_logged_in()) {
            wp_send_json_error(['message' => __('لطفاً ابتدا وارد حساب کاربری شوید.', 'sedrazavi')]);
        }

        $post_id = intval($_POST['post_id'] ?? 0);
        $post = get_post($post_id);

        if (!$post) {
            wp_send_json_error(['message' => __('مورد یافت نشد.', 'sedrazavi')]);
        }

        if (!current_user_can('delete_others_posts') && $post->post_author != get_current_user_id()) {
            wp_send_json_error(['message' => __('شما اجازه حذف این مورد را ندارید.', 'sedrazavi')]);
        }

        $res = wp_delete_post($post_id, true);
        if ($res) {
            wp_send_json_success(['message' => __('مورد با موفقیت حذف گردید.', 'sedrazavi')]);
        } else {
            wp_send_json_error(['message' => __('خطا در حذف از پایگاه داده.', 'sedrazavi')]);
        }
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
        $password   = $_POST['password'] ?? '';
        $role       = sanitize_key($_POST['role'] ?? 'subscriber');
        $display    = sanitize_text_field($_POST['display_name'] ?? '');
        $phone      = sanitize_text_field($_POST['phone'] ?? '');
        $domain_tag = sanitize_text_field($_POST['domain_tag'] ?? 'general');

        if (empty($username) || empty($email) || empty($password)) {
            wp_send_json_error(['message' => __('نام کاربری، ایمیل و رمز عبور الزامی هستند.', 'sedrazavi')]);
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
            wp_send_json_error(['message' => __('شما مجوز ویرایش این حساب کاربری را ندارید.', 'sedrazavi')]);
        }

        $update_data = ['ID' => $target_user_id];

        if (!empty($_POST['display_name'])) {
            $update_data['display_name'] = sanitize_text_field($_POST['display_name']);
        }
        if (!empty($_POST['email'])) {
            $update_data['user_email'] = sanitize_email($_POST['email']);
        }
        if (!empty($_POST['password'])) {
            $update_data['user_pass'] = $_POST['password'];
        }

        $res = wp_update_user($update_data);
        if (is_wp_error($res)) {
            wp_send_json_error(['message' => $res->get_error_message()]);
        }

        // Only admins can change roles
        if ($is_admin && !empty($_POST['role'])) {
            $role = sanitize_key($_POST['role']);
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
            wp_send_json_error(['message' => __('سطح دسترسی شما برای حذف کاربران کافی نیست.', 'sedrazavi')]);
        }

        $target_user_id = intval($_POST['user_id'] ?? 0);
        if ($target_user_id === get_current_user_id()) {
            wp_send_json_error(['message' => __('شما نمی‌توانید حساب کاربری فعال خودتان را حذف کنید.', 'sedrazavi')]);
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
     * AJAX In-Dashboard 1-Click Plugin Installation
     */
    public function ajax_install_plugin() {
        check_ajax_referer('sr_cockpit_nonce', 'nonce');

        if (!current_user_can('install_plugins') && !current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('تنها مدیر کل مجاز به نصب افزونه است.', 'sedrazavi')]);
        }

        $plugin_slug = sanitize_key($_POST['plugin_slug'] ?? 'sedrazavi-designer-core');

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
                        <button type="button" id="sr-btn-new-user" class="sr-btn sr-btn-primary">+ ایجاد دستی کاربر جدید</button>
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
                <?php endif; ?>

            <?php endif; ?>
        </div>
        <?php
        return ob_get_clean();
    }
}

Frontend_Cockpit_Engine::instance();
