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

        add_submenu_page(
            'universal-elementor-settings',
            esc_html__('تنظیمات و ویجت‌ها', 'universal-elementor-suite'),
            esc_html__('مدیریت ویجت‌ها', 'universal-elementor-suite'),
            'manage_options',
            'universal-elementor-settings',
            [$this, 'render_settings_page']
        );

        add_submenu_page(
            'universal-elementor-settings',
            esc_html__('بانک قالب‌ها و Theme Builder', 'universal-elementor-suite'),
            esc_html__('بانک قالب‌ها (۲۱+ الگو)', 'universal-elementor-suite'),
            'manage_options',
            'universal-elementor-templates',
            [$this, 'render_templates_page']
        );

        add_submenu_page(
            'universal-elementor-settings',
            esc_html__('مرکز قابلیت‌ها و بسته‌های ماژولار (MPCA)', 'universal-elementor-suite'),
            esc_html__('مرکز قابلیت‌ها و بسته‌ها (MPCA)', 'universal-elementor-suite'),
            'manage_options',
            'universal-elementor-packages',
            [$this, 'render_packages_page']
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
            'uas_pricing_switcher'=> ['name' => 'جدول قیمت‌گذاری با سوییچر تخفیف (ویژه لندینگ)', 'icon' => 'eicon-table'],
            'uas_fomo_countdown'  => ['name' => 'نوار فوریت و شمارش معکوس تخفیف FOMO', 'icon' => 'eicon-countdown'],
            'uas_before_after'    => ['name' => 'اسلایدر مقایسه تصویری قبل و بعد (Before/After)', 'icon' => 'eicon-image-before-after'],
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

    /**
     * Render Templates Bank & Theme Builder Hub Page
     */
    public function render_templates_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        require_once UAS_PATH . 'includes/class-template-importer.php';
        $manifest = Template_Importer::get_templates_manifest();
        ?>
        <div class="wrap uas-admin-wrap" dir="rtl" style="max-width: 1300px; margin: 25px auto;">
            <div class="uas-admin-header" style="display:flex; justify-content:space-between; align-items:center; background:#0B132B; padding:24px 30px; border-radius:16px; color:#fff; margin-bottom:28px;">
                <div class="uas-admin-title-box">
                    <h1 style="color:#fff; font-size:22px; font-weight:800; margin:0 0 8px;">بانک قالب‌های لندینگ‌پیج و Theme Builder المنتور پرو</h1>
                    <p style="color:#94a3b8; font-size:13px; margin:0;">مجموعه ۲۱+ قالب استاندارد و پرسرعت جهت ساخت فوری صفحات فرود، هدر، فوتر، تک‌نوشته و آرشیو وبلاگ بدون نیاز به کدنویسی</p>
                </div>
                <div style="display:flex; gap:10px;">
                    <button type="button" id="uas-btn-reimport-templates" class="button" style="background:#8B5CF6; border:0; color:#fff; font-weight:700; padding:8px 18px; border-radius:8px; cursor:pointer;">
                        ⚡ درون‌ریزی همه قالب‌ها به المنتور
                    </button>
                    <a href="<?php echo esc_url(admin_url('edit.php?post_type=elementor_library')); ?>" class="button button-secondary" style="background:#1C2541; border:1px solid #334155; color:#cbd5e1; font-weight:600; padding:8px 16px; border-radius:8px;">
                        مشاهده الگوهای ذخیره‌شده المنتور
                    </a>
                </div>
            </div>

            <div id="uas-reimport-status" style="display:none; margin-bottom:20px;"></div>

            <!-- Templates Grid -->
            <div class="uas-templates-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(350px, 1fr)); gap:22px;">
                <?php foreach ($manifest as $tpl) : 
                    $type_label = 'سکشن (Section)';
                    $type_color = '#3B82F6';
                    if ($tpl['type'] === 'page') { $type_label = 'برگه فرود (Page)'; $type_color = '#10B981'; }
                    elseif ($tpl['type'] === 'single-post') { $type_label = 'نوشته تکی (Single Post)'; $type_color = '#8B5CF6'; }
                    elseif ($tpl['type'] === 'archive') { $type_label = 'آرشیو وبلاگ (Archive)'; $type_color = '#F59E0B'; }
                    elseif ($tpl['type'] === 'header') { $type_label = 'سربرگ (Header)'; $type_color = '#EC4899'; }
                    elseif ($tpl['type'] === 'footer') { $type_label = 'پابرگ (Footer)'; $type_color = '#6366F1'; }
                    elseif ($tpl['type'] === 'popup') { $type_label = 'پاپ‌آپ تعاملی (Popup)'; $type_color = '#EF4444'; }
                    elseif ($tpl['type'] === 'single-page') { $type_label = 'برگه ۴۰۴ (Error 404)'; $type_color = '#DC2626'; }
                ?>
                    <div class="uas-tpl-card" style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:22px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 2px 6px rgba(0,0,0,0.03); transition:all 0.2s;">
                        <div>
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                                <span style="font-size:11px; font-weight:700; color:#fff; background:<?php echo esc_attr($type_color); ?>; padding:3px 10px; border-radius:6px;">
                                    <?php echo esc_html($type_label); ?>
                                </span>
                                <?php if ($tpl['is_imported']) : ?>
                                    <span style="font-size:12px; font-weight:700; color:#10b981;">✓ موجود در کتابخانه</span>
                                <?php else : ?>
                                    <span style="font-size:12px; color:#94a3b8;">آماده نصب</span>
                                <?php endif; ?>
                            </div>
                            <h3 style="font-size:15px; font-weight:700; color:#0f172a; margin:0 0 10px; line-height:1.6;">
                                <?php echo esc_html($tpl['title']); ?>
                            </h3>
                            <code style="font-size:11px; background:#f1f5f9; color:#475569; padding:2px 8px; border-radius:4px; display:inline-block; margin-bottom:16px;">
                                <?php echo esc_html($tpl['slug']); ?>
                            </code>
                        </div>

                        <div style="display:flex; gap:8px; margin-top:14px; border-top:1px solid #f1f5f9; padding-top:14px;">
                            <?php if ($tpl['is_imported']) : ?>
                                <a href="<?php echo esc_url(admin_url('post.php?post=' . $tpl['post_id'] . '&action=elementor')); ?>" target="_blank" class="button button-primary" style="flex:1; text-align:center; background:#10B981; border-color:#10B981; font-weight:700;">
                                    ویرایش با المنتور ↗
                                </a>
                            <?php else : ?>
                                <button type="button" class="button button-primary uas-import-single-btn" data-slug="<?php echo esc_attr($tpl['slug']); ?>" style="flex:1; background:#8B5CF6; border-color:#8B5CF6; font-weight:700;">
                                    درون‌ریزی به الگوها
                                </button>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
    }

    /**
     * Render Modular Portable Capability Architecture (MPCA) Page
     */
    public function render_packages_page() {
        if (!current_user_can('manage_options')) {
            wp_die(esc_html__('شما اجازه دسترسی به این صفحه را ندارید.', 'universal-elementor-suite'));
        }

        $capabilities = class_exists('\UniversalElementorSuite\Capability_Registry') 
            ? \UniversalElementorSuite\Capability_Registry::instance()->get_capabilities() 
            : [];
            
        $packages = class_exists('\UniversalElementorSuite\Package_Manager') 
            ? \UniversalElementorSuite\Package_Manager::instance()->get_portable_packages() 
            : [];

        $contracts = class_exists('\UniversalElementorSuite\Contract_Registry')
            ? \UniversalElementorSuite\Contract_Registry::instance()->get_contracts()
            : [];
        ?>
        <div class="wrap uas-admin-wrap" style="max-width:1200px; margin:25px auto 40px; font-family:inherit; direction:rtl;">
            <!-- Header Banner -->
            <div style="background:linear-gradient(135deg, #0B132B 0%, #1C2541 100%); border-radius:16px; padding:32px 36px; color:#fff; box-shadow:0 10px 30px rgba(0,0,0,0.15); margin-bottom:28px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
                    <div>
                        <span style="background:rgba(99,102,241,0.25); color:#a5b4fc; border:1px solid rgba(99,102,241,0.4); font-size:12px; font-weight:700; padding:4px 12px; border-radius:30px; display:inline-block; margin-bottom:10px;">
                            🏛️ Modular Portable Capability Architecture (MPCA)
                        </span>
                        <h1 style="color:#fff; font-size:24px; font-weight:800; margin:0 0 8px;">مرکز مدیریت قابلیت‌ها، پکیج‌های مستقل و قراردادهای API</h1>
                        <p style="color:#94a3b8; font-size:13px; margin:0; max-width:760px; line-height:1.7;">
                            جداسازی کامل منطق تجاری از رابط کاربری در ۶ لایه، ثبت خودکار قابلیت‌ها، مانیتورینگ قراردادهای REST/AJAX و استخراج بسته‌های مستقل (.zip) برای نصب روی هر وب‌سایت وردپرسی.
                        </p>
                    </div>
                    <div style="text-align:left; background:rgba(255,255,255,0.06); padding:12px 20px; border-radius:12px; border:1px solid rgba(255,255,255,0.1);">
                        <div style="font-size:11px; color:#94a3b8;">نسخه استاندارد معماری</div>
                        <div style="font-size:18px; font-weight:800; color:#38bdf8;">v6.0.0 Sovereign</div>
                    </div>
                </div>
            </div>

            <!-- 6-Layer Architecture Quick Status -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:14px; margin-bottom:28px;">
                <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; border-right:4px solid #3b82f6;">
                    <div style="font-size:11px; color:#64748b; font-weight:700;">لایه ۱: رابط کاربری</div>
                    <div style="font-size:15px; font-weight:800; color:#0f172a; margin-top:4px;">۷۲ ویجت + ۷ بلوک</div>
                </div>
                <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; border-right:4px solid #10b981;">
                    <div style="font-size:11px; color:#64748b; font-weight:700;">لایه ۲: قراردادها (Contracts)</div>
                    <div style="font-size:15px; font-weight:800; color:#0f172a; margin-top:4px;"><?php echo count($contracts); ?> قرارداد امن</div>
                </div>
                <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; border-right:4px solid #8b5cf6;">
                    <div style="font-size:11px; color:#64748b; font-weight:700;">لایه ۳: سرویس‌های بک‌اند</div>
                    <div style="font-size:15px; font-weight:800; color:#0f172a; margin-top:4px;">ایمپورت، کوئری، فرم</div>
                </div>
                <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; border-right:4px solid #f59e0b;">
                    <div style="font-size:11px; color:#64748b; font-weight:700;">لایه ۴: مدل داده و ایونت</div>
                    <div style="font-size:15px; font-weight:800; color:#0f172a; margin-top:4px;">CPT محرمانه + پابلیک</div>
                </div>
                <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; border-right:4px solid #ec4899;">
                    <div style="font-size:11px; color:#64748b; font-weight:700;">لایه ۵: مدیریت و نظارت</div>
                    <div style="font-size:15px; font-weight:800; color:#0f172a; margin-top:4px;">Capability Registry</div>
                </div>
                <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; border-right:4px solid #06b6d4;">
                    <div style="font-size:11px; color:#64748b; font-weight:700;">لایه ۶: زیرساخت وردپرس</div>
                    <div style="font-size:15px; font-weight:800; color:#0f172a; margin-top:4px;">PHP <?php echo esc_html(PHP_VERSION); ?></div>
                </div>
            </div>

            <!-- Tab Section 1: Registered Capabilities -->
            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:24px; margin-bottom:28px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
                    <div>
                        <h2 style="font-size:17px; font-weight:800; color:#0f172a; margin:0 0 4px;">فهرست قابلیت‌های ثبت‌شده (Capability Registry)</h2>
                        <p style="font-size:12px; color:#64748b; margin:0;">ماژول‌های مستقلی که در چرخه هسته رجیستر شده‌اند و وابستگی‌ها را بررسی می‌کنند.</p>
                    </div>
                    <span style="font-size:12px; background:#f1f5f9; color:#475569; padding:4px 12px; border-radius:8px; font-weight:700;">
                        تعداد: <?php echo count($capabilities); ?> قابلیت فعال
                    </span>
                </div>

                <div style="overflow-x:auto;">
                    <table class="wp-list-table widefat fixed striped" style="border:1px solid #e2e8f0; border-radius:8px;">
                        <thead>
                            <tr style="background:#f8fafc;">
                                <th style="font-weight:700; width:22%;">عنوان قابلیت</th>
                                <th style="font-weight:700; width:15%;">شناسه سیستمی</th>
                                <th style="font-weight:700; width:15%;">نوع بسته</th>
                                <th style="font-weight:700; width:25%;">توضیحات و اجزا</th>
                                <th style="font-weight:700; width:13%;">نیازمندی‌ها</th>
                                <th style="font-weight:700; width:10%;">وضعیت</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($capabilities as $cap) : ?>
                                <tr>
                                    <td>
                                        <strong><?php echo esc_html($cap['name']); ?></strong>
                                        <div style="font-size:11px; color:#64748b; margin-top:2px;"><?php echo esc_html($cap['category']); ?></div>
                                    </td>
                                    <td><code><?php echo esc_html($cap['id']); ?></code></td>
                                    <td>
                                        <span style="display:inline-block; font-size:11px; padding:2px 8px; border-radius:6px; font-weight:700; background:#e0e7ff; color:#4338ca;">
                                            <?php echo esc_html($cap['package_type']); ?>
                                        </span>
                                        <?php if (!empty($cap['portable'])) : ?>
                                            <span style="display:inline-block; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:700; background:#dcfce7; color:#15803d; margin-top:2px;">
                                                ✓ Portable
                                            </span>
                                        <?php endif; ?>
                                    </td>
                                    <td style="font-size:12px; color:#334155; line-height:1.6;">
                                        <?php echo esc_html($cap['description']); ?>
                                    </td>
                                    <td style="font-size:11px; color:#475569;">
                                        PHP: <?php echo esc_html($cap['dependencies']['php'] ?? '>=7.4'); ?><br>
                                        Elementor: <?php echo esc_html($cap['dependencies']['elementor'] ?? 'آزاد'); ?>
                                    </td>
                                    <td>
                                        <span style="font-size:11px; font-weight:700; color:#10b981; background:#ecfdf5; padding:3px 10px; border-radius:6px; display:inline-block;">
                                            ✓ فعال و پایدار
                                        </span>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Tab Section 2: Portable Packages Vault -->
            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:24px; margin-bottom:28px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
                    <div>
                        <h2 style="font-size:17px; font-weight:800; color:#0f172a; margin:0 0 4px;">بسته‌های مستقل و قابل حمل (Portable Packages)</h2>
                        <p style="font-size:12px; color:#64748b; margin:0;">این قابلیت‌ها کاملاً خودکفا بوده و می‌توانند به صورت پلاگین یا پکیج مجزا بر روی هر وردپرس دیگری بدون نیاز به قالب مادر نصب شوند.</p>
                    </div>
                </div>

                <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:18px;">
                    <?php foreach ($packages as $pkg) : ?>
                        <div style="border:1px solid #e2e8f0; border-radius:12px; padding:18px; background:#fafafa; display:flex; flex-direction:column; justify-content:space-between;">
                            <div>
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <span style="font-size:10px; font-weight:700; background:#818cf8; color:#fff; padding:2px 8px; border-radius:4px;">
                                        <?php echo esc_html($pkg['package_type']); ?>
                                    </span>
                                    <span style="font-size:11px; color:#10b981; font-weight:700;">✓ آماده استخراج</span>
                                </div>
                                <h3 style="font-size:14px; font-weight:700; color:#0f172a; margin:0 0 6px;">
                                    <?php echo esc_html($pkg['name']); ?>
                                </h3>
                                <p style="font-size:12px; color:#64748b; margin:0 0 12px; line-height:1.6;">
                                    <?php echo esc_html($pkg['description']); ?>
                                </p>
                            </div>
                            <div style="border-top:1px solid #e2e8f0; padding-top:10px; margin-top:10px; display:flex; justify-content:space-between; align-items:center;">
                                <code style="font-size:11px;"><?php echo esc_html($pkg['id']); ?></code>
                                <span style="font-size:11px; font-weight:600; color:#3b82f6;">مستقل و Zero-Lockin</span>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Tab Section 3: API Contracts & Security -->
            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:24px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                <h2 style="font-size:17px; font-weight:800; color:#0f172a; margin:0 0 4px;">قراردادهای ارتباطی API و سطوح دسترسی (Contract Registry)</h2>
                <p style="font-size:12px; color:#64748b; margin:0 0 18px;">تمامی تعاملات فرانت‌اند و بک‌اند با شروط احراز هویت، نانس و مجوزها محدود شده‌اند.</p>

                <div style="overflow-x:auto;">
                    <table class="wp-list-table widefat fixed striped" style="border:1px solid #e2e8f0; border-radius:8px;">
                        <thead>
                            <tr style="background:#f8fafc;">
                                <th style="font-weight:700; width:20%;">شناسه قرارداد</th>
                                <th style="font-weight:700; width:10%;">نوع</th>
                                <th style="font-weight:700; width:25%;">مسیر / اکشن</th>
                                <th style="font-weight:700; width:15%;">سطح دسترسی لازم</th>
                                <th style="font-weight:700; width:30%;">هدف و اعتبارسنجی</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($contracts as $c_id => $contract) : ?>
                                <tr>
                                    <td><strong><?php echo esc_html($c_id); ?></strong></td>
                                    <td><span style="background:#e2e8f0; padding:2px 8px; border-radius:4px; font-size:11px; font-weight:700;"><?php echo esc_html($contract['type']); ?></span></td>
                                    <td><code><?php echo esc_html($contract['endpoint'] ?? $contract['action'] ?? '-'); ?></code></td>
                                    <td><code style="color:#b91c1c;"><?php echo esc_html($contract['capability']); ?></code></td>
                                    <td style="font-size:12px; color:#334155;"><?php echo esc_html($contract['description']); ?></td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <?php
    }
}

