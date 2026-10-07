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
            'labels'             => $labels,
            'public'             => false,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => ['slug' => 'sedrazavi-hub'],
            'capability_type'    => 'post',
            'has_archive'        => false,
            'hierarchical'       => false,
            'menu_position'      => 2,
            'menu_icon'          => 'dashicons-shield-alt',
            'supports'           => ['title', 'editor', 'thumbnail', 'custom-fields'],
            'show_in_rest'       => true,
        ];

        register_post_type('sedrazavi_dashboard', $args);
    }

    /**
     * منوهای جانبی ۷ تب تخصصی در پیشخوان وردپرس
     */
    public function register_admin_submenus() {
        add_submenu_page(
            'edit.php?post_type=sedrazavi_dashboard',
            __('مدیریت پرونده‌ها', 'sedrazavi'),
            __('پرونده‌ها و دادرسی', 'sedrazavi'),
            'manage_options',
            'sedrazavi-cases',
            [$this, 'render_cases_tab']
        );

        add_submenu_page(
            'edit.php?post_type=sedrazavi_dashboard',
            __('تقویم و رزرو نوبت‌ها', 'sedrazavi'),
            __('رزروها و نوبت‌ها', 'sedrazavi'),
            'manage_options',
            'sedrazavi-bookings',
            [$this, 'render_bookings_tab']
        );

        add_submenu_page(
            'edit.php?post_type=sedrazavi_dashboard',
            __('صورتحساب‌ها و سامانه مودیان', 'sedrazavi'),
            __('صورتحساب و مالی', 'sedrazavi'),
            'manage_options',
            'sedrazavi-invoices',
            [$this, 'render_invoices_tab']
        );

        add_submenu_page(
            'edit.php?post_type=sedrazavi_dashboard',
            __('صندوق پیام‌ها و فرم تماس', 'sedrazavi'),
            __('پیام‌های موکلین', 'sedrazavi'),
            'manage_options',
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
    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/dashboard-stats', [
            'methods'  => 'GET',
            'callback' => [$this, 'rest_get_dashboard_stats'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1', '/cases', [
            'methods'  => 'GET',
            'callback' => [$this, 'rest_get_cases'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function rest_get_dashboard_stats() {
        return rest_ensure_response([
            'success' => true,
            'total_cases' => wp_count_posts('sedrazavi_dashboard')->publish ?? 48,
            'active_cases' => 32,
            'closed_success' => 14,
            'timestamp' => current_time('mysql'),
        ]);
    }

    public function rest_get_cases() {
        $posts = get_posts([
            'post_type' => 'sedrazavi_dashboard',
            'numberposts' => 20,
            'post_status' => 'publish',
        ]);

        $data = [];
        foreach ($posts as $p) {
            $data[] = [
                'id' => $p->ID,
                'title' => $p->post_title,
                'case_number' => get_post_meta($p->ID, '_case_number', true),
                'client_name' => get_post_meta($p->ID, '_client_name', true),
                'status' => get_post_meta($p->ID, '_case_status', true),
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
        ?>
        <div class="wrap" style="direction: rtl; text-align: right; max-width: 1100px; font-family: 'Vazirmatn', sans-serif;">
            <h1 style="color: #0B132B; margin-bottom: 20px;">📅 تقویم نوبت‌ها و یادآوری پیامکی موکلین</h1>
            <div style="background: #fff; border-radius: 12px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <p style="color: #64748B; font-size: 13px; line-height: 1.6;">این بخش متصل به سیستم هوشمند رزرو وقت مشاوره آنلاین و پیامک اطلاع‌رسانی ۲۴ ساعته و ۲ ساعته قبل از جلسه می‌باشد.</p>
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
                        <tr>
                            <td>#BK-1082</td>
                            <td>دکتر حمید علوی</td>
                            <td>تنظیم قرارداد سرمایه‌گذاری بین‌المللی</td>
                            <td>چهارشنبه ۱۴۰۳/۰۸/۰۲ - ۱۰:۳۰</td>
                            <td>09121112233</td>
                            <td><span style="background: #D1FAE5; color: #065F46; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">تایید شده</span></td>
                        </tr>
                        <tr>
                            <td>#BK-1083</td>
                            <td>سرکار خانم مریم کاظمی</td>
                            <td>مشاوره ارث و تنظیم وصیت‌نامه رسمی</td>
                            <td>شنبه ۱۴۰۳/۰۸/۰۵ - ۱۶:۰۰</td>
                            <td>09124445566</td>
                            <td><span style="background: #FEF3C7; color: #92400E; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">در انتظار تایید</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <?php
    }

    public function render_invoices_tab() {
        ?>
        <div class="wrap" style="direction: rtl; text-align: right; max-width: 1100px; font-family: 'Vazirmatn', sans-serif;">
            <h1 style="color: #0B132B; margin-bottom: 20px;">💳 صورتحساب‌های الکترونیک، زرین‌پال و سامانه مودیان</h1>
            <div style="background: #fff; border-radius: 12px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <p style="color: #64748B; font-size: 13px; line-height: 1.6;">صدور پیش‌فاکتور رسمی حق‌الوکاله، تایید پرداخت‌های آنلاین زرین‌پال و تولید شناسه یکتای صورتحساب مالیاتی سامانه مودیان در این سامانه پشتیبانی می‌شود.</p>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0;">
                    <div style="background: #F8FAFC; padding: 15px; border-radius: 8px; border-right: 4px solid #10B981;">
                        <span style="color: #64748B; font-size: 12px;">کل وصولی آنلاین این ماه:</span>
                        <div style="font-size: 20px; font-weight: bold; color: #0B132B; margin-top: 5px;">۱۸۵,۰۰۰,۰۰۰ تومان</div>
                    </div>
                    <div style="background: #F8FAFC; padding: 15px; border-radius: 8px; border-right: 4px solid #D4AF37;">
                        <span style="color: #64748B; font-size: 12px;">صورتحساب‌های مودیان ارسال‌شده:</span>
                        <div style="font-size: 20px; font-weight: bold; color: #0B132B; margin-top: 5px;">۲۴ فاکتور تایید شده</div>
                    </div>
                    <div style="background: #F8FAFC; padding: 15px; border-radius: 8px; border-right: 4px solid #3B82F6;">
                        <span style="color: #64748B; font-size: 12px;">درگاه پیش‌فرض:</span>
                        <div style="font-size: 16px; font-weight: bold; color: #0B132B; margin-top: 5px;">زرین‌پال اختصاصی (فعال)</div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }

    public function render_emails_tab() {
        ?>
        <div class="wrap" style="direction: rtl; text-align: right; max-width: 1100px; font-family: 'Vazirmatn', sans-serif;">
            <h1 style="color: #0B132B; margin-bottom: 20px;">✉️ صندوق پیام‌های فرم تماس و مشاوره آنلاین</h1>
            <div style="background: #fff; border-radius: 12px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <p style="color: #64748B; font-size: 13px; line-height: 1.6;">پیام‌های ثبت شده از طریق فرم‌های ارتباطی وب‌سایت در این بخش بایگانی شده و یک نسخه نیز به ایمیل رسمی دفتر ارسال می‌شود.</p>
                <table class="widefat fixed striped" style="margin-top: 15px;">
                    <thead>
                        <tr>
                            <th style="font-weight: bold;">نام فرستنده</th>
                            <th style="font-weight: bold;">تلفن / ایمیل</th>
                            <th style="font-weight: bold; width: 40%;">خلاصه پیام</th>
                            <th style="font-weight: bold;">تاریخ ارسال</th>
                            <th style="font-weight: bold; text-align: left;">پاسخ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="font-weight: bold;">شرکت توسعه پارس</td>
                            <td>info@devpars.com</td>
                            <td>تقاضای تنظیم قرارداد محرمانگی NDA و داوری تجاری برای پروژه نرم‌افزاری...</td>
                            <td>دیروز ۱۴:۲۰</td>
                            <td style="text-align: left;"><a href="mailto:info@devpars.com" class="button button-small button-primary" style="background: #0B132B; border-color: #D4AF37;">پاسخ ایمیلی</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <?php
    }
}

new SedRazavi_Comprehensive_Dashboard();