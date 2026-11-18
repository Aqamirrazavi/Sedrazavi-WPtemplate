<?php
/**
 * پست‌تایپ جامع و کنترلر متمرکز مدیریت وکالت SedRazavi
 * Package: SedRazavi Attorney Theme
 * Specification: Part 5.1 & Part 6
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Comprehensive_Dashboard {

    public function __construct() {
        add_action('init', [$this, 'register_post_type']);
        add_action('add_meta_boxes', [$this, 'register_meta_boxes']);
        add_action('save_post_sedrazavi_dashboard', [$this, 'save_meta_data']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_action('admin_menu', [$this, 'register_admin_submenus']);
    }

    /**
     * ثبت پست‌تایپ جامع sedrazavi_dashboard
     */
    public function register_post_type() {
        $labels = [
            'name'                  => __('داشبورد جامع وکیل', 'sedrazavi'),
            'singular_name'         => __('داشبورد وکیل', 'sedrazavi'),
            'menu_name'             => __('وکالت دکتر رضوی', 'sedrazavi'),
            'name_admin_bar'        => __('داشبورد وکیل', 'sedrazavi'),
            'add_new'               => __('ثبت پرونده/رکورد جدید', 'sedrazavi'),
            'add_new_item'          => __('افزودن رکورد به داشبورد', 'sedrazavi'),
            'new_item'              => __('رکورد جدید', 'sedrazavi'),
            'edit_item'             => __('ویرایش رکورد جامع', 'sedrazavi'),
            'view_item'             => __('مشاهده رکورد', 'sedrazavi'),
            'all_items'             => __('داشبورد جامع (۷ تب)', 'sedrazavi'),
            'search_items'          => __('جستجو در سوابق و پرونده‌ها', 'sedrazavi'),
        ];

        $args = [
            'labels'              => $labels,
            'public'              => false,
            'publicly_queryable'  => false,
            'exclude_from_search' => true,
            'show_ui'             => true,
            'show_in_menu'        => true,
            'show_in_nav_menus'   => false,
            'query_var'           => false,
            'rewrite'             => false,
            'capability_type'     => ['sedrazavi_case', 'sedrazavi_cases'],
            'map_meta_cap'        => true,
            'has_archive'         => false,
            'hierarchical'        => false,
            'menu_position'       => 2,
            'menu_icon'           => 'dashicons-shield-alt',
            'supports'            => ['title', 'editor', 'thumbnail', 'custom-fields', 'author'],
            'show_in_rest'        => false,
        ];

        register_post_type('sedrazavi_dashboard', $args);
    }

    /**
     * منوهای جانبی ۷ تب تخصصی در پیشخوان وردپرس
     */
    public function register_admin_submenus() {
        $legal_cap = 'sedrazavi_manage_cases';

        add_submenu_page(
            'edit.php?post_type=sedrazavi_dashboard',
            __('مدیریت پرونده‌ها', 'sedrazavi'),
            __('پرونده‌ها و دادرسی', 'sedrazavi'),
            $legal_cap,
            'sedrazavi-cases',
            [$this, 'render_cases_tab']
        );

        add_submenu_page(
            'edit.php?post_type=sedrazavi_dashboard',
            __('تقویم و رزرو نوبت‌ها', 'sedrazavi'),
            __('رزروها و نوبت‌ها', 'sedrazavi'),
            $legal_cap,
            'sedrazavi-bookings',
            [$this, 'render_bookings_tab']
        );

        add_submenu_page(
            'edit.php?post_type=sedrazavi_dashboard',
            __('صورتحساب‌ها و سامانه مودیان', 'sedrazavi'),
            __('صورتحساب و مالی', 'sedrazavi'),
            $legal_cap,
            'sedrazavi-invoices',
            [$this, 'render_invoices_tab']
        );

        add_submenu_page(
            'edit.php?post_type=sedrazavi_dashboard',
            __('صندوق پیام‌ها و فرم تماس', 'sedrazavi'),
            __('پیام‌های موکلین', 'sedrazavi'),
            $legal_cap,
            'sedrazavi-emails',
            [$this, 'render_emails_tab']
        );
    }

    /**
     * متاباکس جامع ۷ تب برای فرم ایجاد و ویرایش
     */
    public function register_meta_boxes() {
        add_meta_box(
            'sedrazavi_case_details_box',
            __('اطلاعات پرونده، دادرسی و مالیات مودیان', 'sedrazavi'),
            [$this, 'render_case_meta_box'],
            'sedrazavi_dashboard',
            'normal',
            'high'
        );
    }

    public function render_case_meta_box($post) {
        wp_nonce_field('sedrazavi_save_dashboard_nonce', 'sedrazavi_nonce');

        $case_number = get_post_meta($post->ID, '_case_number', true);
        $client_name = get_post_meta($post->ID, '_client_name', true);
        $client_phone = get_post_meta($post->ID, '_client_phone', true);
        $case_status = get_post_meta($post->ID, '_case_status', true);
        $tax_id = get_post_meta($post->ID, '_tax_unique_id', true);
        ?>
        <div style="direction: rtl; font-family: Tahoma, sans-serif; padding: 10px;">
            <p>
                <label><strong>شماره پرونده دادگستری:</strong></label><br/>
                <input type="text" name="sedrazavi_case_number" value="<?php echo esc_attr($case_number); ?>" style="width: 100%;" />
            </p>
            <p>
                <label><strong>نام و نام خانوادگی موکل:</strong></label><br/>
                <input type="text" name="sedrazavi_client_name" value="<?php echo esc_attr($client_name); ?>" style="width: 100%;" />
            </p>
            <p>
                <label><strong>شماره تلفن همراه (ثنا):</strong></label><br/>
                <input type="text" name="sedrazavi_client_phone" value="<?php echo esc_attr($client_phone); ?>" style="width: 100%;" />
            </p>
            <p>
                <label><strong>وضعیت دادرسی:</strong></label><br/>
                <select name="sedrazavi_case_status" style="width: 100%;">
                    <option value="در حال بررسی" <?php selected($case_status, 'در حال بررسی'); ?>>در حال بررسی اولیه</option>
                    <option value="در جریان" <?php selected($case_status, 'در جریان'); ?>>در جریان دادرسی در دادگاه</option>
                    <option value="به رأی نهایی رسیده" <?php selected($case_status, 'به رأی نهایی رسیده'); ?>>حکم قطعی پیروزی صادر شد</option>
                    <option value="بسته شده" <?php selected($case_status, 'بسته شده'); ?>>مختومه و بایگانی</option>
                </select>
            </p>
            <p>
                <label><strong>شناسه یکتای صورتحساب مالیاتی سامانه مودیان:</strong></label><br/>
                <input type="text" name="sedrazavi_tax_id" value="<?php echo esc_attr($tax_id); ?>" style="width: 100%; font-family: monospace;" />
            </p>
        </div>
        <?php
    }

    public function save_meta_data($post_id) {
        if (!isset($_POST['sedrazavi_nonce']) || !wp_verify_nonce($_POST['sedrazavi_nonce'], 'sedrazavi_save_dashboard_nonce')) {
            return;
        }
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
        if (!current_user_can('edit_post', $post_id)) return;

        $fields = [
            'sedrazavi_case_number' => '_case_number',
            'sedrazavi_client_name' => '_client_name',
            'sedrazavi_client_phone' => '_client_phone',
            'sedrazavi_case_status' => '_case_status',
            'sedrazavi_tax_id' => '_tax_unique_id',
        ];

        foreach ($fields as $post_key => $meta_key) {
            if (isset($_POST[$post_key])) {
                update_post_meta($post_id, $meta_key, sanitize_text_field($_POST[$post_key]));
            }
        }
    }

    /**
     * ثبت اندپوینت‌های REST API برای اتصال اپلیکیشن فرانت‌اند React
     */
    public function check_staff_permission() {
        if (!is_user_logged_in()) {
            return false;
        }
        if (class_exists('SedRazavi_Case_Data_Service')) {
            return SedRazavi_Case_Data_Service::is_privileged_legal_staff();
        }
        return current_user_can('manage_options') || current_user_can('sedrazavi_manage_cases') || current_user_can('sedrazavi_view_all_cases');
    }

    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/dashboard-stats', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_dashboard_stats'],
            'permission_callback' => [$this, 'check_staff_permission'],
        ]);

        register_rest_route('sedrazavi/v1', '/cases', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_cases'],
            'permission_callback' => [$this, 'check_staff_permission'],
        ]);
    }

    public function rest_get_dashboard_stats() {
        $counts = wp_count_posts('sedrazavi_dashboard');
        $published = isset($counts->publish) ? (int) $counts->publish : 0;
        $private   = isset($counts->private) ? (int) $counts->private : 0;
        return rest_ensure_response([
            'success'        => true,
            'total_cases'    => $published + $private,
            'active_cases'   => $published + $private,
            'private_cases'  => $private,
            'timestamp'      => current_time('mysql'),
        ]);
    }

    public function rest_get_cases() {
        $posts = get_posts([
            'post_type'   => ['sedrazavi_dashboard', 'sedrazavi_case'],
            'numberposts' => 20,
            'post_status' => ['private', 'publish'],
        ]);

        $uid = get_current_user_id();
        $data = [];
        foreach ($posts as $p) {
            if (class_exists('SedRazavi_Case_Data_Service') && !SedRazavi_Case_Data_Service::can_user_access_case($p, $uid)) {
                continue;
            }
            $data[] = [
                'id'          => $p->ID,
                'title'       => $p->post_title,
                'case_number' => get_post_meta($p->ID, '_sedrazavi_case_number', true) ?: get_post_meta($p->ID, '_case_number', true),
                'client_name' => get_post_meta($p->ID, '_sedrazavi_client_name', true) ?: get_post_meta($p->ID, '_client_name', true),
                'status'      => get_post_meta($p->ID, '_sedrazavi_case_status', true) ?: get_post_meta($p->ID, '_case_status', true),
            ];
        }

        return rest_ensure_response($data);
    }

    public function render_cases_tab() {
        $posts = get_posts([
            'post_type' => 'sedrazavi_dashboard',
            'numberposts' => 50,
            'post_status' => 'any',
        ]);
        ?>
        <div class="wrap" style="direction: rtl; text-align: right; max-width: 1100px; font-family: 'Vazirmatn', sans-serif;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h1 style="color: #0B132B; margin: 0;">📂 مدیریت پرونده‌ها و دادرسی دادگستری</h1>
                <a href="<?php echo esc_url(admin_url('post-new.php?post_type=sedrazavi_dashboard')); ?>" class="button button-primary" style="background: #0B132B; border-color: #D4AF37; font-weight: bold;">
                    + افزودن پرونده جدید
                </a>
            </div>
            <div style="background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <p style="color: #64748B; font-size: 13px; margin-top: 0;">در این صفحه کلیه پرونده‌های دادگستری موکلین به همراه شماره کلاسه، نام موکل و آخرین وضعیت دادرسی ثبت و مدیریت می‌شوند.</p>
                <table class="widefat fixed striped">
                    <thead>
                        <tr>
                            <th style="font-weight: bold; width: 35%;">عنوان پرونده</th>
                            <th style="font-weight: bold;">شماره پرونده / کلاسه</th>
                            <th style="font-weight: bold;">نام موکل</th>
                            <th style="font-weight: bold;">وضعیت دادرسی</th>
                            <th style="font-weight: bold; text-align: left;">عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($posts)) : ?>
                            <tr>
                                <td colspan="5" style="text-align: center; padding: 30px; color: #888;">
                                    هنوز پرونده‌ای ثبت نشده است. از دکمه «افزودن پرونده جدید» استفاده کنید.
                                </td>
                            </tr>
                        <?php else : ?>
                            <?php foreach ($posts as $p) : 
                                $case_no = get_post_meta($p->ID, '_case_number', true) ?: 'نامشخص';
                                $c_name = get_post_meta($p->ID, '_client_name', true) ?: 'ثبت نشده';
                                $status = get_post_meta($p->ID, '_case_status', true) ?: 'در جریان';
                            ?>
                            <tr>
                                <td><strong><a href="<?php echo esc_url(get_edit_post_link($p->ID)); ?>"><?php echo esc_html($p->post_title ?: 'بدون عنوان'); ?></a></strong></td>
                                <td><?php echo esc_html($case_no); ?></td>
                                <td><?php echo esc_html($c_name); ?></td>
                                <td><span style="background: #FEF3C7; color: #92400E; padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;"><?php echo esc_html($status); ?></span></td>
                                <td style="text-align: left;">
                                    <a href="<?php echo esc_url(get_edit_post_link($p->ID)); ?>" class="button button-small">ویرایش</a>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
        <?php
    }

    public function render_bookings_tab() {
        global $wpdb;
        $rows = [];

        $appointment_posts = get_posts([
            'post_type'      => ['sedrazavi_appointment', 'sedrazavi_booking'],
            'numberposts'    => 30,
            'post_status'    => 'any',
            'orderby'        => 'date',
            'order'          => 'DESC',
        ]);
        foreach ($appointment_posts as $ap) {
            $rows[] = [
                'code'   => get_post_meta($ap->ID, '_tracking_code', true) ?: ('#APT-' . $ap->ID),
                'name'   => get_post_meta($ap->ID, '_client_name', true) ?: $ap->post_title,
                'topic'  => get_post_meta($ap->ID, '_service_type', true) ?: __('مشاوره حقوقی', 'sedrazavi'),
                'date'   => get_post_meta($ap->ID, '_booking_date', true) ?: get_the_date('Y-m-d H:i', $ap->ID),
                'phone'  => get_post_meta($ap->ID, '_client_phone', true) ?: '—',
                'status' => get_post_meta($ap->ID, '_booking_status', true) ?: 'scheduled',
            ];
        }

        $opt_appointments = get_option('sedrazavi_legal_appointments_records', []);
        if (is_array($opt_appointments)) {
            foreach (array_reverse($opt_appointments) as $rec) {
                if (!is_array($rec)) {
                    continue;
                }
                $rows[] = [
                    'code'   => $rec['booking_id'] ?? '—',
                    'name'   => $rec['client_name'] ?? '—',
                    'topic'  => $rec['meeting_type'] ?? __('مشاوره حقوقی', 'sedrazavi'),
                    'date'   => $rec['slot_id'] ?? ($rec['created_at'] ?? '—'),
                    'phone'  => $rec['phone'] ?? '—',
                    'status' => $rec['status'] ?? 'scheduled',
                ];
            }
        }

        $consult_table = $wpdb->prefix . 'sedrazavi_consultations';
        if ($wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', $consult_table)) === $consult_table) {
            $db_rows = $wpdb->get_results("SELECT id, full_name, phone, subject, preferred_date, status FROM {$consult_table} ORDER BY id DESC LIMIT 20", ARRAY_A);
            if (is_array($db_rows)) {
                foreach ($db_rows as $dr) {
                    $rows[] = [
                        'code'   => '#CON-' . (int) ($dr['id'] ?? 0),
                        'name'   => $dr['full_name'] ?? '—',
                        'topic'  => $dr['subject'] ?? __('مشاوره', 'sedrazavi'),
                        'date'   => $dr['preferred_date'] ?? '—',
                        'phone'  => $dr['phone'] ?? '—',
                        'status' => $dr['status'] ?? 'pending',
                    ];
                }
            }
        }
        ?>
        <div class="wrap" style="direction: rtl; text-align: right; max-width: 1100px; font-family: 'Vazirmatn', sans-serif;">
            <h1 style="color: #0B132B; margin-bottom: 20px;">📅 تقویم نوبت‌ها و یادآوری پیامکی موکلین</h1>
            <div style="background: #fff; border-radius: 12px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <p style="color: #64748B; font-size: 13px; line-height: 1.6;">این بخش متصل به پایگاه داده نوبت‌های مشاوره آنلاین وب‌سایت و سوابق رزرواسیون واقعی است.</p>
                <table class="widefat fixed striped" style="margin-top: 15px;">
                    <thead>
                        <tr>
                            <th style="font-weight: bold;">کد پیگیری</th>
                            <th style="font-weight: bold;">نام متقاضی</th>
                            <th style="font-weight: bold;">موضوع مشاوره</th>
                            <th style="font-weight: bold;">تاریخ و ساعت</th>
                            <th style="font-weight: bold;">شماره همراه</th>
                            <th style="font-weight: bold;">وضعیت</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($rows)) : ?>
                            <tr>
                                <td colspan="6" style="text-align: center; padding: 30px; color: #64748B;">
                                    <?php esc_html_e('هنوز نوبت مشاوره‌ای در پایگاه داده ثبت نشده است.', 'sedrazavi'); ?>
                                </td>
                            </tr>
                        <?php else : ?>
                            <?php foreach ($rows as $row) : ?>
                                <tr>
                                    <td><?php echo esc_html($row['code']); ?></td>
                                    <td><?php echo esc_html($row['name']); ?></td>
                                    <td><?php echo esc_html($row['topic']); ?></td>
                                    <td><?php echo esc_html($row['date']); ?></td>
                                    <td style="direction: ltr; text-align: right;"><?php echo esc_html($row['phone']); ?></td>
                                    <td><span style="background: #EFF6FF; color: #1E40AF; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;"><?php echo esc_html($row['status']); ?></span></td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
        <?php
    }

    public function render_invoices_tab() {
        global $wpdb;
        $total_amount = 0;
        $verified_invoices_count = 0;

        $payments_table = $wpdb->prefix . 'sedrazavi_payments';
        if ($wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', $payments_table)) === $payments_table) {
            $total_amount = (int) $wpdb->get_var("SELECT COALESCE(SUM(amount), 0) FROM {$payments_table} WHERE status IN ('paid','completed','verified')");
            $verified_invoices_count = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$payments_table} WHERE status IN ('paid','completed','verified')");
        }

        $tax_docs_query = new WP_Query([
            'post_type'      => ['sedrazavi_dashboard', 'sedrazavi_case'],
            'post_status'    => 'any',
            'posts_per_page' => 1,
            'fields'         => 'ids',
            'meta_query'     => [
                [
                    'key'     => '_tax_unique_id',
                    'value'   => '',
                    'compare' => '!=',
                ],
            ],
        ]);
        $verified_invoices_count += (int) $tax_docs_query->found_posts;

        $merchant_id = get_option('sedrazavi_zarinpal_merchant', '');
        $gateway_status = !empty($merchant_id)
            ? esc_html__('زرین‌پال (پیکربندی شده)', 'sedrazavi')
            : esc_html__('تنظیم نشده (در انتظار مرچنت کد)', 'sedrazavi');
        ?>
        <div class="wrap" style="direction: rtl; text-align: right; max-width: 1100px; font-family: 'Vazirmatn', sans-serif;">
            <h1 style="color: #0B132B; margin-bottom: 20px;">💳 صورتحساب‌های الکترونیک، زرین‌پال و سامانه مودیان</h1>
            <div style="background: #fff; border-radius: 12px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <p style="color: #64748B; font-size: 13px; line-height: 1.6;">آمار زیر مستقیماً از جدول پرداخت‌ها و پرونده‌های دارای شناسه مالیاتی سامانه مودیان محاسبه می‌شود.</p>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0;">
                    <div style="background: #F8FAFC; padding: 15px; border-radius: 8px; border-right: 4px solid #10B981;">
                        <span style="color: #64748B; font-size: 12px;">کل وصولی آنلاین ثبت‌شده:</span>
                        <div style="font-size: 20px; font-weight: bold; color: #0B132B; margin-top: 5px;"><?php echo esc_html(number_format_i18n($total_amount)); ?> <?php esc_html_e('تومان', 'sedrazavi'); ?></div>
                    </div>
                    <div style="background: #F8FAFC; padding: 15px; border-radius: 8px; border-right: 4px solid #D4AF37;">
                        <span style="color: #64748B; font-size: 12px;">صورتحساب‌های تاییدشده / مودیان:</span>
                        <div style="font-size: 20px; font-weight: bold; color: #0B132B; margin-top: 5px;"><?php echo esc_html(number_format_i18n($verified_invoices_count)); ?> <?php esc_html_e('فاکتور', 'sedrazavi'); ?></div>
                    </div>
                    <div style="background: #F8FAFC; padding: 15px; border-radius: 8px; border-right: 4px solid #3B82F6;">
                        <span style="color: #64748B; font-size: 12px;">وضعیت درگاه پرداخت:</span>
                        <div style="font-size: 16px; font-weight: bold; color: #0B132B; margin-top: 5px;"><?php echo esc_html($gateway_status); ?></div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }

    public function render_emails_tab() {
        $messages = [];
        $lead_posts = get_posts([
            'post_type'      => ['uas_lead', 'sedrazavi_message'],
            'numberposts'    => 25,
            'post_status'    => 'any',
            'orderby'        => 'date',
            'order'          => 'DESC',
        ]);
        foreach ($lead_posts as $lp) {
            $messages[] = [
                'sender'  => get_post_meta($lp->ID, '_lead_client_name', true) ?: $lp->post_title,
                'contact' => get_post_meta($lp->ID, '_lead_phone', true) ?: get_post_meta($lp->ID, '_sender_email', true) ?: '—',
                'summary' => wp_trim_words(wp_strip_all_tags($lp->post_content ?: $lp->post_title), 18),
                'date'    => get_the_date('Y-m-d H:i', $lp->ID),
                'edit'    => get_edit_post_link($lp->ID),
            ];
        }

        $intake_records = get_option('sedrazavi_legal_intake_records', []);
        if (is_array($intake_records)) {
            foreach (array_reverse($intake_records) as $ir) {
                if (!is_array($ir)) {
                    continue;
                }
                $messages[] = [
                    'sender'  => $ir['client_name'] ?? '—',
                    'contact' => $ir['phone'] ?? '—',
                    'summary' => $ir['topic'] ?? ($ir['reference_code'] ?? ''),
                    'date'    => $ir['created_at'] ?? '—',
                    'edit'    => '',
                ];
            }
        }
        ?>
        <div class="wrap" style="direction: rtl; text-align: right; max-width: 1100px; font-family: 'Vazirmatn', sans-serif;">
            <h1 style="color: #0B132B; margin-bottom: 20px;">✉️ صندوق پیام‌های فرم تماس و مشاوره آنلاین</h1>
            <div style="background: #fff; border-radius: 12px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <p style="color: #64748B; font-size: 13px; line-height: 1.6;">پیام‌ها و درخواست‌های واقعی ثبت‌شده توسط موکلین از طریق فرم‌های وب‌سایت در این بخش نمایش داده می‌شوند.</p>
                <table class="widefat fixed striped" style="margin-top: 15px;">
                    <thead>
                        <tr>
                            <th style="font-weight: bold;">نام فرستنده</th>
                            <th style="font-weight: bold;">تلفن / ایمیل</th>
                            <th style="font-weight: bold; width: 40%;">خلاصه پیام</th>
                            <th style="font-weight: bold;">تاریخ ارسال</th>
                            <th style="font-weight: bold; text-align: left;">مشاهده</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($messages)) : ?>
                            <tr>
                                <td colspan="5" style="text-align: center; padding: 30px; color: #64748B;">
                                    <?php esc_html_e('صندوق پیام‌ها در حال حاضر خالی است.', 'sedrazavi'); ?>
                                </td>
                            </tr>
                        <?php else : ?>
                            <?php foreach ($messages as $msg) : ?>
                                <tr>
                                    <td style="font-weight: bold;"><?php echo esc_html($msg['sender']); ?></td>
                                    <td style="direction: ltr; text-align: right;"><?php echo esc_html($msg['contact']); ?></td>
                                    <td><?php echo esc_html($msg['summary']); ?></td>
                                    <td><?php echo esc_html($msg['date']); ?></td>
                                    <td style="text-align: left;">
                                        <?php if (!empty($msg['edit'])) : ?>
                                            <a href="<?php echo esc_url($msg['edit']); ?>" class="button button-small">جزئیات</a>
                                        <?php else : ?>
                                            <span style="color: #64748B; font-size: 12px;">ثبت تریاژ</span>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
        <?php
    }
}

new SedRazavi_Comprehensive_Dashboard();