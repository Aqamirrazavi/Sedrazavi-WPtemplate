<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Elementor Addon Suite - Admin Settings Page
 */
class Admin_Settings {

    /**
     * Singleton Instance
     *
     * @var Admin_Settings|null
     */
    private static $_instance = null;

    /**
     * Get instance
     *
     * @return Admin_Settings
     */
    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Constructor
     */
    public function __construct() {
        add_action('admin_menu', [$this, 'register_menu_page']);
        add_action('admin_init', [$this, 'register_settings']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
    }

    /**
     * Enqueue Admin Styles and Scripts
     */
    public function enqueue_assets($hook) {
        if (strpos($hook, 'universal-elementor') === false) {
            return;
        }

        wp_enqueue_style('uas-admin-settings-css', UAS_URL . 'assets/css/admin-settings.css', [], UAS_VERSION);
        wp_enqueue_script('uas-admin-settings-js', UAS_URL . 'assets/js/admin-settings.js', ['jquery'], UAS_VERSION, true);

        wp_localize_script('uas-admin-settings-js', 'uasAdminVars', [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce'   => wp_create_nonce('uas_admin_nonce'),
        ]);
    }

    /**
     * Register Admin Menu
     */
    public function register_menu_page() {
        add_menu_page(
            esc_html__('تنظیمات Universal Elementor Suite', 'universal-elementor-suite'),
            esc_html__('Universal Suite', 'universal-elementor-suite'),
            'manage_options',
            'universal-elementor-settings',
            [$this, 'render_settings_page'],
            'dashicons-screenoptions',
            58
        );
    }

    /**
     * Register Settings
     */
    public function register_settings() {
        register_setting('uas_settings_group', 'uas_custom_category_name', [
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => 'المان‌های پیشرفته (Universal Suite)',
        ]);

        register_setting('uas_settings_group', 'uas_custom_category_icon', [
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => 'eicon-apps',
        ]);

        register_setting('uas_settings_group', 'uas_disabled_widgets', [
            'type'              => 'array',
            'sanitize_callback' => [$this, 'sanitize_disabled_widgets'],
            'default'           => [],
        ]);

        register_setting('uas_settings_group', 'uas_delete_templates_on_uninstall', [
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => 'no',
        ]);
    }

    /**
     * Sanitize Disabled Widgets
     */
    public function sanitize_disabled_widgets($input) {
        if (!is_array($input)) {
            return [];
        }
        return array_map('sanitize_key', $input);
    }

    /**
     * Get All Available Widgets List
     *
     * @return array
     */
    public static function get_all_widgets_list() {
        return [
            'uas_hero'            => ['name' => 'هیرو بنر مدرن و منعطف', 'icon' => 'eicon-banner'],
            'uas_services_grid'   => ['name' => 'شبکه خدمات و ویژگی‌ها', 'icon' => 'eicon-gallery-grid'],
            'uas_testimonials'    => ['name' => 'نظرات و رضایت مشتریان', 'icon' => 'eicon-testimonial'],
            'uas_posts_grid'      => ['name' => 'گرید مقالات و اخبار پویا', 'icon' => 'eicon-post-list'],
            'uas_video'           => ['name' => 'نمایشگر ویدیویی با پوستر', 'icon' => 'eicon-video-playlist'],
            'uas_story_bar'       => ['name' => 'نوار استوری‌ها و هایلایت‌ها', 'icon' => 'eicon-instagram-gallery'],
            'uas_team'            => ['name' => 'معرفی اعضای تیم و متخصصان', 'icon' => 'eicon-person'],
            'uas_faq'             => ['name' => 'آکاردئون پرسش‌های متداول', 'icon' => 'eicon-help-o'],
            'uas_contact_booking' => ['name' => 'فرم هوشمند رزرو نوبت و مشاوره', 'icon' => 'eicon-form-horizontal'],
            'uas_cta'             => ['name' => 'بنر فراخوان اقدام و تماس (CTA)', 'icon' => 'eicon-call-to-action'],
            'uas_banner_slider'   => ['name' => 'نوار تیکر و شعارهای متحرک', 'icon' => 'eicon-text-area'],
            'uas_floating_dock'   => ['name' => 'داک شناور بازگشت به بالا', 'icon' => 'eicon-navigation-vertical'],
            'uas_theme_toggle'    => ['name' => 'سوییچ تغییر حالت شب و روز', 'icon' => 'eicon-adjust'],
            'uas_firm_milestones' => ['name' => 'سفر رشد و نقاط عطف راهبردی', 'icon' => 'eicon-time-line'],
            'uas_case_timeline'   => ['name' => 'تایم‌لاین تعاملی پرونده موکل', 'icon' => 'eicon-history'],
            'uas_email_otp'       => ['name' => 'ورود با رمز یکبار مصرف ایمیل', 'icon' => 'eicon-lock-user'],
            'uas_radar_chart'     => ['name' => 'نمودار راداری حوزه‌های تخصصی', 'icon' => 'eicon-radar-chart'],
        ];
    }

    /**
     * Render Settings Page
     */
    public function render_settings_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        $all_widgets = self::get_all_widgets_list();
        $disabled_widgets = get_option('uas_disabled_widgets', []);
        $cat_name = get_option('uas_custom_category_name', 'المان‌های پیشرفته (Universal Suite)');
        $cat_icon = get_option('uas_custom_category_icon', 'eicon-apps');
        $delete_on_uninstall = get_option('uas_delete_templates_on_uninstall', 'no');
        ?>
        <div class="wrap uas-admin-wrap" dir="rtl">
            <div class="uas-admin-header">
                <div class="uas-admin-title-box">
                    <h1>تنظیمات Universal Elementor Suite</h1>
                    <p>مدیریت ویجت‌ها، سفارشی‌سازی برندینگ دسته‌بندی و همگام‌سازی تمپلیت‌های آماده</p>
                </div>
                <div class="uas-admin-badge">نسخه ۱.۰.۰</div>
            </div>

            <?php if (isset($_GET['settings-updated']) && $_GET['settings-updated']) : ?>
                <div class="notice notice-success is-dismissible" style="padding: 10px 14px; margin-bottom: 20px;">
                    <p><strong>تنظیمات با موفقیت ذخیره شدند.</strong></p>
                </div>
            <?php endif; ?>

            <form method="post" action="options.php">
                <?php settings_fields('uas_settings_group'); ?>

                <!-- CARD 1: CATEGORY BRANDING -->
                <div class="uas-admin-card">
                    <h2>🏷️ برندینگ و سفارشی‌سازی دسته‌بندی در پنل المنتور</h2>
                    <p style="font-size: 13px; color: #64748B;">می‌توانید عنوان و آیکون دسته‌بندی اختصاصی ویجت‌ها در پنل ویرایشگر المنتور را متناسب با نام برند یا شرکت خود تغییر دهید:</p>
                    
                    <table class="form-table" role="presentation">
                        <tr>
                            <th scope="row"><label for="uas_custom_category_name">عنوان دسته‌بندی در المنتور:</label></th>
                            <td>
                                <input type="text" id="uas_custom_category_name" name="uas_custom_category_name" value="<?php echo esc_attr($cat_name); ?>" class="regular-text" />
                                <p class="description">این نام به عنوان سرفصل ویجت‌ها در پنل کناری المنتور نمایش داده می‌شود.</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="uas_custom_category_icon">آیکون دسته‌بندی:</label></th>
                            <td>
                                <select id="uas_custom_category_icon" name="uas_custom_category_icon">
                                    <option value="eicon-apps" <?php selected($cat_icon, 'eicon-apps'); ?>>eicon-apps (چهارخانه برنامه‌ها)</option>
                                    <option value="eicon-elementor-circle" <?php selected($cat_icon, 'eicon-elementor-circle'); ?>>eicon-elementor-circle (حلقه المنتور)</option>
                                    <option value="eicon-star" <?php selected($cat_icon, 'eicon-star'); ?>>eicon-star (ستاره لوکس)</option>
                                    <option value="eicon-bolt" <?php selected($cat_icon, 'eicon-bolt'); ?>>eicon-bolt (صاعقه و سرعت)</option>
                                    <option value="eicon-tools" <?php selected($cat_icon, 'eicon-tools'); ?>>eicon-tools (ابزارها)</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- CARD 2: WIDGETS MANAGER -->
                <div class="uas-admin-card">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <h2>⚡ مدیریت و بهینه‌سازی بارگذاری ویجت‌ها</h2>
                        <div style="display: flex; gap: 8px;">
                            <button type="button" id="uas-btn-enable-all" class="button button-secondary" style="font-size: 12px;">فعال‌سازی همه</button>
                            <button type="button" id="uas-btn-disable-all" class="button button-secondary" style="font-size: 12px;">غیرفعال‌سازی همه</button>
                        </div>
                    </div>
                    <p style="font-size: 13px; color: #64748B;">ویجت‌هایی که در پروژه خود نیاز ندارید را خاموش فرمایید تا اسکریپت‌ها و فایل‌های CSS مربوطه بارگذاری نشوند و سرعت سایت افزایش یابد:</p>

                    <div class="uas-widgets-grid">
                        <?php foreach ($all_widgets as $slug => $widget_data) : 
                            $is_disabled = in_array($slug, $disabled_widgets);
                        ?>
                            <div class="uas-widget-toggle-item">
                                <div class="uas-widget-info">
                                    <span class="uas-widget-icon"><i class="<?php echo esc_attr($widget_data['icon']); ?>"></i></span>
                                    <span class="uas-widget-name"><?php echo esc_html($widget_data['name']); ?></span>
                                </div>
                                <label class="uas-switch">
                                    <input type="checkbox" class="uas-widget-checkbox" name="uas_disabled_widgets[]" value="<?php echo esc_attr($slug); ?>" <?php checked($is_disabled, false); ?> style="display:none;" />
                                    <!-- Invert logic: check means enabled, unchecked means in disabled list -->
                                    <input type="checkbox" name="uas_active_widgets_toggle[]" value="<?php echo esc_attr($slug); ?>" <?php checked($is_disabled, false); ?> onchange="this.previousElementSibling.checked = !this.checked;" />
                                    <span class="uas-slider"></span>
                                </label>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- CARD 3: TEMPLATES & POPUPS RE-IMPORT -->
                <div class="uas-admin-card">
                    <h2>📦 همگام‌سازی و ایمپورت مجدد تمپلیت‌ها و پاپ‌آپ‌ها</h2>
                    <p style="font-size: 13px; color: #64748B;">اگر قالب‌های ذخیره‌شده یا پاپ‌آپ‌های افزونه را تصادفاً پاک کرده‌اید یا می‌خواهید نگارش جدید را مجدداً به بخش <strong>قالب‌ها > قالب‌های ذخیره‌شده (Saved Templates)</strong> وارد نمایید، روی دکمه زیر کلیک کنید (ایمپورت به صورت ایدم‌پوتنت انجام شده و موارد موجود را تکرار نمی‌کند):</p>
                    
                    <div style="margin-top: 16px;">
                        <button type="button" id="uas-btn-reimport-templates" class="button button-primary" style="background: #2563EB; border-color: #2563EB; padding: 6px 18px; font-weight: 700;">
                            ایمپورت مجدد تمپلیت‌ها و پاپ‌آپ‌ها
                        </button>
                    </div>

                    <div id="uas-reimport-status" style="display: none; margin-top: 16px;"></div>
                </div>

                <!-- CARD 4: UNINSTALL PREFERENCES -->
                <div class="uas-admin-card">
                    <h2>🗑️ رفتار و روتین پاک‌سازی در زمان حذف افزونه (Uninstall Policy)</h2>
                    <p style="font-size: 13px; color: #64748B;">تعیین وضعیت داده‌ها پس از حذف کامل افزونه از پیشخوان وردپرس:</p>

                    <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #334155;">
                        <input type="checkbox" name="uas_delete_templates_on_uninstall" value="yes" <?php checked($delete_on_uninstall, 'yes'); ?> />
                        <span>پاک‌سازی کامل تمپلیت‌ها و پاپ‌آپ‌های ایمپورت‌شده در زمان حذف افزونه</span>
                    </label>
                    <p class="description" style="margin-right: 24px; color: #EF4444;">
                        <strong>هشدار:</strong> در صورت فعال بودن این گزینه، اگر صفحات سایت شما از تمپلیت‌های ذخیره‌شده افزونه استفاده کنند، ممکن است پس از حذف افزونه محتوای آن صفحات حذف گردد. (پیش‌فرض امن: غیرفعال).
                    </p>
                </div>

                <?php submit_button('ذخیره تغییرات تنظیمات', 'primary large', 'submit', true, ['style' => 'background: #0F172A; border-color: #0F172A; font-weight: 700;']); ?>
            </form>
        </div>
        <?php
    }
}
