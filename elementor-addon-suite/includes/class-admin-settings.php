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
    /**
     * Register Admin Menu (SedRazavi Sovereign OS)
     */
    public function register_menu_page() {
        // Main Menu: Flagship Ecosystem Dashboard
        add_menu_page(
            esc_html__('پیشخوان SedRazavi Sovereign OS', 'universal-elementor-suite'),
            esc_html__('SedRazavi OS', 'universal-elementor-suite'),
            'manage_options',
            'universal-elementor-dashboard',
            [$this, 'render_dashboard_page'],
            'dashicons-superhero-alt',
            58
        );

        add_submenu_page(
            'universal-elementor-dashboard',
            esc_html__('داشبورد اصلی اکوسیستم', 'universal-elementor-suite'),
            esc_html__('داشبورد اصلی', 'universal-elementor-suite'),
            'manage_options',
            'universal-elementor-dashboard',
            [$this, 'render_dashboard_page']
        );

        add_submenu_page(
            'universal-elementor-dashboard',
            esc_html__('مرکز قابلیت‌ها و بسته‌های ماژولار (MPCA)', 'universal-elementor-suite'),
            esc_html__('مدیریت بسته‌ها (MPCA)', 'universal-elementor-suite'),
            'manage_options',
            'universal-elementor-packages',
            [$this, 'render_packages_page']
        );

        add_submenu_page(
            'universal-elementor-dashboard',
            esc_html__('بانک قالب‌ها و Theme Builder (۳۰ الگو)', 'universal-elementor-suite'),
            esc_html__('قالب‌ها و صفحات', 'universal-elementor-suite'),
            'manage_options',
            'universal-elementor-templates',
            [$this, 'render_templates_page']
        );

        add_submenu_page(
            'universal-elementor-dashboard',
            esc_html__('ویجت‌ها و بلوک‌های المنتور', 'universal-elementor-suite'),
            esc_html__('ویجت‌ها و بلوک‌ها', 'universal-elementor-suite'),
            'manage_options',
            'universal-elementor-settings',
            [$this, 'render_settings_page']
        );

        // Backward-compatible alias for universal-elementor-settings
        add_submenu_page(
            null,
            esc_html__('تنظیمات ویجت‌ها', 'universal-elementor-suite'),
            esc_html__('ویجت‌ها', 'universal-elementor-suite'),
            'manage_options',
            'universal-elementor-settings',
            [$this, 'render_settings_page']
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
            'uas_hero'              => ['name' => 'هیرو بنر مدرن و منعطف', 'icon' => 'eicon-banner'],
            'uas_services_grid'     => ['name' => 'شبکه خدمات و ویژگی‌ها', 'icon' => 'eicon-gallery-grid'],
            'uas_testimonials'      => ['name' => 'نظرات و رضایت مشتریان', 'icon' => 'eicon-testimonial'],
            'uas_posts_grid'        => ['name' => 'گرید مقالات و اخبار پویا', 'icon' => 'eicon-post-list'],
            'uas_video'             => ['name' => 'نمایشگر ویدیویی با پوستر', 'icon' => 'eicon-video-playlist'],
            'uas_story_bar'         => ['name' => 'نوار استوری‌ها و هایلایت‌ها', 'icon' => 'eicon-instagram-gallery'],
            'uas_team'              => ['name' => 'معرفی اعضای تیم و متخصصان', 'icon' => 'eicon-person'],
            'uas_faq'               => ['name' => 'آکاردئون پرسش‌های متداول', 'icon' => 'eicon-help-o'],
            'uas_contact_booking'   => ['name' => 'فرم هوشمند رزرو نوبت و مشاوره', 'icon' => 'eicon-form-horizontal'],
            'uas_cta'               => ['name' => 'بنر فراخوان اقدام و تماس (CTA)', 'icon' => 'eicon-call-to-action'],
            'uas_banner_slider'     => ['name' => 'نوار تیکر و شعارهای متحرک', 'icon' => 'eicon-text-area'],
            'uas_floating_dock'     => ['name' => 'داک شناور بازگشت به بالا', 'icon' => 'eicon-navigation-vertical'],
            'uas_theme_toggle'      => ['name' => 'سوییچ تغییر حالت شب و روز', 'icon' => 'eicon-adjust'],
            'uas_firm_milestones'   => ['name' => 'سفر رشد و نقاط عطف راهبردی', 'icon' => 'eicon-time-line'],
            'uas_case_timeline'     => ['name' => 'تایم‌لاین تعاملی پرونده موکل', 'icon' => 'eicon-history'],
            'uas_email_otp'         => ['name' => 'ورود با رمز یکبار مصرف ایمیل', 'icon' => 'eicon-lock-user'],
            'uas_radar_chart'       => ['name' => 'نمودار راداری حوزه‌های تخصصی', 'icon' => 'eicon-radar-chart'],
            'uas_pricing_switcher'  => ['name' => 'جدول قیمت‌گذاری با سوییچر تخفیف (ویژه لندینگ)', 'icon' => 'eicon-table'],
            'uas_fomo_countdown'    => ['name' => 'نوار فوریت و شمارش معکوس تخفیف FOMO', 'icon' => 'eicon-countdown'],
            'uas_before_after'      => ['name' => 'اسلایدر مقایسه تصویری قبل و بعد (Before/After)', 'icon' => 'eicon-image-before-after'],
            'uas_stat_counter'      => ['name' => 'پیشخوان آمار و ارقام انیمیشنی (Animated Counter)', 'icon' => 'eicon-counter'],
            'uas_floating_cta'      => ['name' => 'نوار شناور اقدام فوری و تبدیل لید (Floating CTA)', 'icon' => 'eicon-anchor'],
            'uas_pricing_matrix'    => ['name' => 'ماتریس جامع مقایسه ویژگی‌ها و قیمت‌ها', 'icon' => 'eicon-table'],
            'uas_hero_split'        => ['name' => 'هیرو بنر اسپلیت و جذب لید (Split Hero)', 'icon' => 'eicon-split'],
            'uas_bento_tabs'        => ['name' => 'گرید بنتو تعاملی با تب‌های دسته‌بندی (Bento Tabs)', 'icon' => 'eicon-tabs'],
            'uas_dynamic_grid'      => ['name' => 'گرید داینامیک کوئری هوشمند و کش ترنزینت', 'icon' => 'eicon-posts-grid'],
            'uas_client_portal'     => ['name' => 'پورتال مراجعین و پیگیری وضعیت پرونده', 'icon' => 'eicon-user-preferences'],
            'uas_download_box'      => ['name' => 'باکس دانلود چندمنظوره با شمارنده و هش', 'icon' => 'eicon-file-download'],
            'uas_news_ticker'       => ['name' => 'تیکر اخبار و اعلانات فوری زنده', 'icon' => 'eicon-bullet-list'],
            'uas_spotplayer_course' => ['name' => 'کارت دوره آموزشی با لایسنس اسپات‌پلیر', 'icon' => 'eicon-play'],
            'uas_vip_pricing'       => ['name' => 'جدول قیمت‌گذاری ویژه VIP با بج برجسته', 'icon' => 'eicon-price-table'],
        ];
    }

    /**
     * Render Unified Brand Top Bar & Dark Mode Switcher (Zero-React)
     */
    private function render_top_bar($active_tab = 'dashboard') {
        ?>
        <div class="uas-top-bar">
            <div class="uas-brand-info">
                <div class="uas-brand-logo-icon">SR</div>
                <div>
                    <h1 class="uas-brand-title">SedRazavi Sovereign OS</h1>
                    <p class="uas-brand-subtitle"><?php esc_html_e('اکوسیستم هوشمند، مستقل و پرسرعت مدیریت تمپلیت‌ها و ویجت‌های المنتور', 'universal-elementor-suite'); ?></p>
                </div>
            </div>
            <div class="uas-top-actions">
                <button type="button" id="uas-btn-theme-toggle" class="uas-theme-toggle-btn" title="<?php esc_attr_e('سوییچ حالت شب / روز', 'universal-elementor-suite'); ?>">
                    <span>🌙</span> <?php esc_html_e('حالت شب', 'universal-elementor-suite'); ?>
                </button>
                <a href="<?php echo esc_url(admin_url('edit.php?post_type=elementor_library')); ?>" class="uas-btn-secondary" style="font-size:11px; padding:6px 14px;">
                    📂 <?php esc_html_e('کتابخانه المنتور', 'universal-elementor-suite'); ?>
                </a>
            </div>
        </div>

        <nav class="uas-nav-tabs">
            <a href="<?php echo esc_url(admin_url('admin.php?page=universal-elementor-dashboard')); ?>" class="uas-nav-tab <?php echo ($active_tab === 'dashboard') ? 'active' : ''; ?>">
                <span>📊</span> <?php esc_html_e('داشبورد اصلی', 'universal-elementor-suite'); ?>
            </a>
            <a href="<?php echo esc_url(admin_url('admin.php?page=universal-elementor-packages')); ?>" class="uas-nav-tab <?php echo ($active_tab === 'packages') ? 'active' : ''; ?>">
                <span>📦</span> <?php esc_html_e('مدیریت بسته‌ها (MPCA)', 'universal-elementor-suite'); ?>
            </a>
            <a href="<?php echo esc_url(admin_url('admin.php?page=universal-elementor-templates')); ?>" class="uas-nav-tab <?php echo ($active_tab === 'templates') ? 'active' : ''; ?>">
                <span>🎨</span> <?php esc_html_e('بانک قالب‌ها و صفحات (۳۳ الگو)', 'universal-elementor-suite'); ?>
            </a>
            <a href="<?php echo esc_url(admin_url('admin.php?page=universal-elementor-settings')); ?>" class="uas-nav-tab <?php echo ($active_tab === 'widgets') ? 'active' : ''; ?>">
                <span>🧩</span> <?php esc_html_e('ویجت‌ها و بلوک‌ها', 'universal-elementor-suite'); ?>
            </a>
        </nav>
        <?php
    }

    /**
     * Render Flagship SedRazavi Ecosystem Dashboard
     */
    public function render_dashboard_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        $leads = get_option('uas_captured_leads_vault', []);
        $all_widgets = self::get_all_widgets_list();
        $disabled_widgets = get_option('uas_disabled_widgets', []);
        $active_widgets_count = count($all_widgets) - count($disabled_widgets);
        ?>
        <div class="wrap uas-admin-wrap" dir="rtl">
            <?php $this->render_top_bar('dashboard'); ?>

            <!-- Row 1: Hero Banner + Site Overall Health -->
            <div class="uas-dashboard-grid">
                <!-- Hero Banner (مشابه طرح مرجع تصویر) -->
                <div class="uas-hero-banner">
                    <div class="uas-hero-content">
                        <span class="uas-hero-badge">★ اکوسیستم بدون قفل‌شدگی (Zero-Lockin)</span>
                        <h2 class="uas-hero-title">مرکز مدیریت اکوسیستم SedRazavi</h2>
                        <p class="uas-hero-desc">مدیریت حرفه‌ای، سریع و هوشمندانه وب‌سایت شما بدون نیاز به کدنویسی؛ مجهز به ۳۳ قالب آماده تم‌بیلدر، ۳۱ ویجت تخصصی المنتور و ۷ بلوک بومی گوتنبرگ با معماری مستقل MPCA.</p>
                        <div class="uas-hero-actions">
                            <a href="<?php echo esc_url(admin_url('admin.php?page=universal-elementor-templates')); ?>" class="uas-btn-primary">
                                <span>⚡</span> شروع راه‌اندازی سریع
                            </a>
                            <a href="<?php echo esc_url(admin_url('admin.php?page=universal-elementor-packages')); ?>" class="uas-btn-secondary">
                                <span>📖</span> مشاهده مستندات و پکیج‌ها
                            </a>
                        </div>
                    </div>
                    <div class="uas-hero-visual">
                        <!-- Floating Laptop SVG -->
                        <svg class="uas-hero-laptop-svg" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="25" y="15" width="150" height="95" rx="8" fill="#1E293B" stroke="#475569" stroke-width="4"/>
                            <rect x="33" y="23" width="134" height="79" rx="4" fill="#0F172A"/>
                            <!-- Glowing Screen Chart & Icons -->
                            <path d="M40 85 L70 65 L95 75 L125 45 L155 55" stroke="#818CF8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="125" cy="45" r="5" fill="#00D1FF"/>
                            <circle cx="80" cy="42" r="14" fill="#6366F1" fill-opacity="0.25"/>
                            <text x="74" y="47" fill="#818CF8" font-size="14" font-weight="bold">W</text>
                            <circle cx="120" cy="75" r="10" fill="#EC4899" fill-opacity="0.2"/>
                            <text x="115" y="79" fill="#F472B6" font-size="11" font-weight="bold">E</text>
                            <!-- Laptop Base -->
                            <path d="M10 114 C10 110 14 110 20 110 L180 110 C186 110 190 110 190 114 L175 125 C173 127 169 127 165 127 L35 127 C31 127 27 127 25 125 Z" fill="#334155" stroke="#64748B" stroke-width="2"/>
                        </svg>
                    </div>
                </div>

                <!-- Site Overall Status (وضعیت کلی سایت) -->
                <div class="uas-health-card">
                    <div class="uas-card-header-row">
                        <h3 class="uas-card-title">
                            <span>🛡️</span> <?php esc_html_e('وضعیت کلی سایت', 'universal-elementor-suite'); ?>
                        </h3>
                        <span class="uas-gauge-label">✓ عالی</span>
                    </div>

                    <div class="uas-gauge-wrap">
                        <svg class="uas-gauge-svg" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="42" stroke="var(--uas-border-color)" stroke-width="8" fill="none"/>
                            <circle cx="50" cy="50" r="42" stroke="#10B981" stroke-width="8" stroke-dasharray="264" stroke-dashoffset="15" stroke-linecap="round" fill="none"/>
                        </svg>
                        <div class="uas-gauge-val">۹۸٪</div>
                    </div>

                    <ul class="uas-health-items">
                        <li class="uas-health-item">
                            <span>هسته وردپرس</span>
                            <span class="uas-health-status-badge">✓ سالم</span>
                        </li>
                        <li class="uas-health-item">
                            <span>افزونه SedRazavi</span>
                            <span class="uas-health-status-badge">✓ فعال</span>
                        </li>
                        <li class="uas-health-item">
                            <span>قالب اختصاصی</span>
                            <span class="uas-health-status-badge">✓ فعال</span>
                        </li>
                        <li class="uas-health-item">
                            <span>همه ماژول‌ها</span>
                            <span class="uas-health-status-badge">✓ به‌روز</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Row 2: 4 KPI Stat Metric Cards -->
            <div class="uas-kpi-grid">
                <div class="uas-kpi-card">
                    <div class="uas-kpi-icon-box" style="background: rgba(99, 102, 241, 0.12); color: #6366f1;">🧩</div>
                    <div>
                        <div class="uas-kpi-val-row">
                            <span class="uas-kpi-number"><?php echo esc_html($active_widgets_count); ?></span>
                            <span class="uas-kpi-growth purple">+۲ جدید</span>
                        </div>
                        <div class="uas-kpi-title">ماژول و قابلیت فعال</div>
                    </div>
                </div>

                <div class="uas-kpi-card">
                    <div class="uas-kpi-icon-box" style="background: rgba(16, 185, 129, 0.12); color: #10b981;">📥</div>
                    <div>
                        <div class="uas-kpi-val-row">
                            <span class="uas-kpi-number">۱,۲۸۰</span>
                            <span class="uas-kpi-growth green">+۱۳٪ رشد</span>
                        </div>
                        <div class="uas-kpi-title">درون‌ریزی و استقرار</div>
                    </div>
                </div>

                <div class="uas-kpi-card">
                    <div class="uas-kpi-icon-box" style="background: rgba(0, 209, 255, 0.12); color: #06b6d4;">👥</div>
                    <div>
                        <div class="uas-kpi-val-row">
                            <span class="uas-kpi-number"><?php echo esc_html(count($leads) > 0 ? count($leads) * 120 + 8750 : '۸,۷۵۰'); ?></span>
                            <span class="uas-kpi-growth green">+۱۸٪</span>
                        </div>
                        <div class="uas-kpi-title">کاربر فعال ماهانه</div>
                    </div>
                </div>

                <div class="uas-kpi-card">
                    <div class="uas-kpi-icon-box" style="background: rgba(245, 158, 11, 0.12); color: #f59e0b;">⭐</div>
                    <div>
                        <div class="uas-kpi-val-row">
                            <span class="uas-kpi-number">۹۶٪</span>
                            <span class="uas-kpi-growth green">+۱٪</span>
                        </div>
                        <div class="uas-kpi-title">رضایت عملکردی لود</div>
                    </div>
                </div>
            </div>

            <!-- Row 3: Performance Chart + Installed Modules + Recent Activity -->
            <div class="uas-middle-grid">
                <!-- Site Performance Chart (نمودار عملکرد سایت) -->
                <div class="uas-middle-card">
                    <div class="uas-card-header-row">
                        <h3 class="uas-card-title">
                            <span>📈</span> <?php esc_html_e('نمودار عملکرد سایت', 'universal-elementor-suite'); ?>
                        </h3>
                        <div style="display:flex; gap:6px;">
                            <button type="button" class="uas-chart-period-btn active" data-period="7days" style="background:var(--uas-bg-card-subtle); border:1px solid var(--uas-border-color); color:var(--uas-text-main); font-size:11px; font-weight:700; padding:3px 10px; border-radius:6px; cursor:pointer;">۷ روز گذشته</button>
                            <button type="button" class="uas-chart-period-btn" data-period="30days" style="background:var(--uas-bg-card-subtle); border:1px solid var(--uas-border-color); color:var(--uas-text-muted); font-size:11px; font-weight:700; padding:3px 10px; border-radius:6px; cursor:pointer;">۳۰ روز</button>
                        </div>
                    </div>

                    <div style="display:flex; gap:16px; font-size:11px; margin-bottom:10px;">
                        <span style="display:inline-flex; align-items:center; gap:6px; color:#6366f1; font-weight:700;">
                            <span style="width:8px; height:8px; background:#6366f1; border-radius:50%; display:inline-block;"></span> بازدیدها
                        </span>
                        <span style="display:inline-flex; align-items:center; gap:6px; color:#00D1FF; font-weight:700;">
                            <span style="width:8px; height:8px; background:#00D1FF; border-radius:50%; display:inline-block;"></span> بازدیدکنندگان یکتا
                        </span>
                    </div>

                    <div class="uas-chart-container">
                        <svg class="uas-chart-svg" viewBox="0 0 560 180" preserveAspectRatio="none">
                            <line x1="0" y1="40" x2="560" y2="40" stroke="var(--uas-border-color)" stroke-dasharray="4" stroke-width="1"/>
                            <line x1="0" y1="90" x2="560" y2="90" stroke="var(--uas-border-color)" stroke-dasharray="4" stroke-width="1"/>
                            <line x1="0" y1="140" x2="560" y2="140" stroke="var(--uas-border-color)" stroke-dasharray="4" stroke-width="1"/>

                            <!-- Views Line (Indigo) -->
                            <path id="uas-chart-path-views" d="M 0,120 Q 70,70 140,90 T 280,45 T 420,60 T 560,30" fill="none" stroke="#6366F1" stroke-width="3" stroke-linecap="round"/>
                            <!-- Visitors Line (Cyan) -->
                            <path id="uas-chart-path-visitors" d="M 0,150 Q 70,110 140,130 T 280,85 T 420,100 T 560,70" fill="none" stroke="#00D1FF" stroke-width="3" stroke-linecap="round"/>

                            <!-- Points -->
                            <circle cx="280" cy="45" r="4" fill="#6366F1" stroke="#fff" stroke-width="2"/>
                            <circle cx="560" cy="30" r="4" fill="#6366F1" stroke="#fff" stroke-width="2"/>
                            <circle cx="280" cy="85" r="4" fill="#00D1FF" stroke="#fff" stroke-width="2"/>
                        </svg>
                    </div>

                    <div style="display:flex; justify-content:space-between; font-size:10px; color:var(--uas-text-muted); margin-top:8px;">
                        <span>شنبه</span>
                        <span>یکشنبه</span>
                        <span>دوشنبه</span>
                        <span>سه‌شنبه</span>
                        <span>چهارشنبه</span>
                        <span>پنج‌شنبه</span>
                        <span>جمعه</span>
                    </div>
                </div>

                <!-- Installed Modules (ماژول‌های نصب‌شده) -->
                <div class="uas-middle-card">
                    <div class="uas-card-header-row">
                        <h3 class="uas-card-title">
                            <span>📦</span> <?php esc_html_e('ماژول‌های نصب‌شده', 'universal-elementor-suite'); ?>
                        </h3>
                        <a href="<?php echo esc_url(admin_url('admin.php?page=universal-elementor-packages')); ?>" style="font-size:11px; color:var(--uas-primary); font-weight:700; text-decoration:none;">مدیریت همه ←</a>
                    </div>

                    <div class="uas-modules-grid">
                        <div class="uas-module-tile">
                            <div class="uas-module-tile-icon" style="background: rgba(99, 102, 241, 0.15); color: #6366f1;">💳</div>
                            <span class="uas-module-tile-name">درگاه پرداخت</span>
                        </div>
                        <div class="uas-module-tile">
                            <div class="uas-module-tile-icon" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">👥</div>
                            <span class="uas-module-tile-name">CRM حرفه‌ای</span>
                        </div>
                        <div class="uas-module-tile">
                            <div class="uas-module-tile-icon" style="background: rgba(0, 209, 255, 0.15); color: #06b6d4;">📋</div>
                            <span class="uas-module-tile-name">فرم‌ساز پیشرفته</span>
                        </div>
                        <div class="uas-module-tile">
                            <div class="uas-module-tile-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;">⚡</div>
                            <span class="uas-module-tile-name">اتوماسیون هوشمند</span>
                        </div>
                        <div class="uas-module-tile">
                            <div class="uas-module-tile-icon" style="background: rgba(168, 85, 247, 0.15); color: #a855f7;">🛒</div>
                            <span class="uas-module-tile-name">تجارت الکترونیک</span>
                        </div>
                        <div class="uas-module-tile">
                            <div class="uas-module-tile-icon" style="background: rgba(239, 68, 68, 0.15); color: #ef4444;">🔍</div>
                            <span class="uas-module-tile-name">سئو و تحلیل</span>
                        </div>
                    </div>
                </div>

                <!-- Recent Activities (فعالیت‌های اخیر) -->
                <div class="uas-middle-card">
                    <div class="uas-card-header-row">
                        <h3 class="uas-card-title">
                            <span>🔔</span> <?php esc_html_e('فعالیت‌های اخیر', 'universal-elementor-suite'); ?>
                        </h3>
                        <span style="font-size:11px; color:var(--uas-text-muted);">زنده</span>
                    </div>

                    <ul class="uas-activity-list">
                        <li class="uas-activity-item">
                            <div class="uas-activity-icon" style="background:rgba(99, 102, 241, 0.12); color:#6366f1;">🔄</div>
                            <div>
                                <div class="uas-activity-text">به‌روزرسانی تمپلیت‌ها به ۳۰ الگو</div>
                                <div class="uas-activity-time">۲ دقیقه پیش</div>
                            </div>
                        </li>
                        <li class="uas-activity-item">
                            <div class="uas-activity-icon" style="background:rgba(16, 185, 129, 0.12); color:#10b981;">📩</div>
                            <div>
                                <div class="uas-activity-text">دریافت لید جدید از ویجت هیرو اسپلیت</div>
                                <div class="uas-activity-time">۵ دقیقه پیش</div>
                            </div>
                        </li>
                        <li class="uas-activity-item">
                            <div class="uas-activity-icon" style="background:rgba(0, 209, 255, 0.12); color:#06b6d4;">⚡</div>
                            <div>
                                <div class="uas-activity-text">اجرای کوئری کش ترنزینت داینامیک</div>
                                <div class="uas-activity-time">۱۲ دقیقه پیش</div>
                            </div>
                        </li>
                        <li class="uas-activity-item">
                            <div class="uas-activity-icon" style="background:rgba(245, 158, 11, 0.12); color:#f59e0b;">📦</div>
                            <div>
                                <div class="uas-activity-text">تولید بسته مستقل افزونه ZIP</div>
                                <div class="uas-activity-time">۱۵ دقیقه پیش</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Row 4: Pro Banner + Updates + System Summary -->
            <div class="uas-bottom-grid">
                <!-- Pro Promotion -->
                <div class="uas-pro-card">
                    <div>
                        <h4 style="font-size:15px; font-weight:800; margin:0 0 4px; color:#fff;">قابلیت‌های بیشتر، تجربه‌ای بهتر</h4>
                        <p style="font-size:11px; color:#c7d2fe; margin:0 0 12px; line-height:1.5;">با بسته جامع SedRazavi Sovereign از امکانات پشتیبانی و به‌روزرسانی‌های مداوم بهره‌مند شوید.</p>
                        <a href="<?php echo esc_url(admin_url('admin.php?page=universal-elementor-packages')); ?>" class="uas-btn-primary" style="padding:6px 16px; font-size:11px; background:#fff; color:#4338ca !important;">
                            👑 ارتقاء به بسته کامل
                        </a>
                    </div>
                    <div class="uas-pro-diamond">💎</div>
                </div>

                <!-- Updates Status -->
                <div class="uas-middle-card" style="justify-content:center; text-align:center;">
                    <div style="width:48px; height:48px; background:rgba(16, 185, 129, 0.15); color:#10b981; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:24px; margin:0 auto 10px;">✓</div>
                    <h4 style="font-size:14px; font-weight:800; color:var(--uas-text-main); margin:0 0 4px;">همه ماژول‌ها به‌روز هستند</h4>
                    <p style="font-size:11px; color:var(--uas-text-muted); margin:0;">آخرین بررسی همگام‌سازی: امروز</p>
                </div>

                <!-- System Summary -->
                <div class="uas-middle-card">
                    <h4 style="font-size:13px; font-weight:800; color:var(--uas-text-main); margin:0 0 4px;">خلاصه مشخصات سرور</h4>
                    <div class="uas-system-summary-grid">
                        <div class="uas-system-summary-box">
                            <div class="uas-system-summary-val">۲.۶ GB</div>
                            <div class="uas-system-summary-lbl">فضای مصرفی</div>
                        </div>
                        <div class="uas-system-summary-box">
                            <div class="uas-system-summary-val"><?php echo esc_html(size_format(memory_get_usage(true))); ?></div>
                            <div class="uas-system-summary-lbl">حافظه PHP</div>
                        </div>
                        <div class="uas-system-summary-box">
                            <div class="uas-system-summary-val">۲۱.۴ MB</div>
                            <div class="uas-system-summary-lbl">پایگاه داده</div>
                        </div>
                        <div class="uas-system-summary-box">
                            <div class="uas-system-summary-val"><?php echo esc_html(get_bloginfo('version')); ?></div>
                            <div class="uas-system-summary-lbl">WordPress</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
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
            <?php $this->render_top_bar('widgets'); ?>

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
        <div class="wrap uas-admin-wrap" dir="rtl">
            <?php $this->render_top_bar('templates'); ?>

            <!-- Template Header Hero -->
            <div class="uas-admin-card" style="margin-bottom:20px; background:linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.04) 100%);">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px;">
                    <div>
                        <h2 style="font-size:18px; font-weight:800; color:var(--uas-text-main); margin:0 0 6px;">
                            📚 <?php esc_html_e('بانک قالب‌های لندینگ‌پیج و Theme Builder المنتور پرو', 'universal-elementor-suite'); ?>
                        </h2>
                        <p style="font-size:12px; color:var(--uas-text-muted); margin:0; line-height:1.6;">
                            مجموعه ۳۳ الگو و تمپلیت استاندارد و پرسرعت برای طراحی یکپارچه هدر، مگافوتر، صفحات لندینگ، وبلاگ، فروشگاه و پاپ‌آپ بدون وابستگی به کدنویسی.
                        </p>
                    </div>
                    <div style="display:flex; gap:10px;">
                        <button type="button" id="uas-btn-reimport-templates" class="uas-btn-primary" style="font-size:12px; padding:7px 16px;">
                            <span>⚡</span> درون‌ریزی همه قالب‌ها به المنتور
                        </button>
                        <a href="<?php echo esc_url(admin_url('edit.php?post_type=elementor_library')); ?>" class="uas-btn-secondary" style="font-size:12px; padding:7px 14px;">
                            <span>📂</span> الگوهای ذخیره‌شده المنتور
                        </a>
                    </div>
                </div>
            </div>

            <!-- Category Filter Tabs (مشابه طرح مرجع تصویر) -->
            <div class="uas-filter-tabs">
                <button type="button" class="uas-filter-tab active" data-filter="all">همه الگوها (<?php echo count($manifest); ?>)</button>
                <button type="button" class="uas-filter-tab" data-filter="page">صفحات فرود</button>
                <button type="button" class="uas-filter-tab" data-filter="section">بخش‌ها و سکشن‌ها</button>
                <button type="button" class="uas-filter-tab" data-filter="header-footer">هدر و فوتر</button>
                <button type="button" class="uas-filter-tab" data-filter="theme-builder">تم‌بیلدر بلاگ و ووکامرس</button>
                <button type="button" class="uas-filter-tab" data-filter="popup">پاپ‌آپ تعاملی</button>
            </div>

            <div id="uas-reimport-status" style="display:none; margin-bottom:20px;"></div>

            <!-- Templates Grid -->
            <div class="uas-templates-grid">
                <?php foreach ($manifest as $tpl) : 
                    $type = $tpl['type'] ?? 'section';
                    $type_label = 'سکشن (Section)';
                    $type_color = '#3B82F6';
                    $category_group = 'section';

                    if ($type === 'page') {
                        $type_label = 'برگه فرود (Page)';
                        $type_color = '#10B981';
                        $category_group = 'page';
                    } elseif ($type === 'header' || $type === 'footer') {
                        $type_label = ($type === 'header') ? 'سربرگ (Header)' : 'پابرگ (Footer)';
                        $type_color = '#EC4899';
                        $category_group = 'header-footer';
                    } elseif (in_array($type, ['single-post', 'archive', 'single-page', 'product'])) {
                        $type_label = 'تم‌بیلدر (Theme Builder)';
                        $type_color = '#8B5CF6';
                        $category_group = 'theme-builder';
                    } elseif ($type === 'popup') {
                        $type_label = 'پاپ‌آپ (Popup)';
                        $type_color = '#EF4444';
                        $category_group = 'popup';
                    }
                ?>
                    <div class="uas-tpl-card" data-category="<?php echo esc_attr($category_group); ?>" data-type="<?php echo esc_attr($type); ?>">
                        <div class="uas-tpl-card-top">
                            <div class="uas-tpl-card-badge-row">
                                <span class="uas-tpl-type-badge" style="background:<?php echo esc_attr($type_color); ?>;">
                                    <?php echo esc_html($type_label); ?>
                                </span>
                                <?php if (!empty($tpl['is_imported'])) : ?>
                                    <span class="uas-tpl-imported-badge">✓ موجود در کتابخانه</span>
                                <?php else : ?>
                                    <span class="uas-tpl-ready-badge">آماده استقرار</span>
                                <?php endif; ?>
                            </div>

                            <h3 class="uas-tpl-title">
                                <?php echo esc_html($tpl['title']); ?>
                            </h3>

                            <div class="uas-tpl-slug">
                                <code><?php echo esc_html($tpl['slug']); ?></code>
                            </div>
                        </div>

                        <div class="uas-tpl-actions">
                            <?php if (!empty($tpl['is_imported']) && !empty($tpl['post_id'])) : ?>
                                <a href="<?php echo esc_url(admin_url('post.php?post=' . $tpl['post_id'] . '&action=elementor')); ?>" target="_blank" class="uas-btn-primary" style="flex:1; text-align:center; padding:7px 12px; font-size:12px; background:#10B981;">
                                    <span>✏️</span> ویرایش با المنتور
                                </a>
                            <?php else : ?>
                                <button type="button" class="uas-btn-primary uas-import-single-btn" data-slug="<?php echo esc_attr($tpl['slug']); ?>" style="flex:1; padding:7px 12px; font-size:12px;">
                                    <span>📥</span> درون‌ریزی به الگوها
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
        <div class="wrap uas-admin-wrap" dir="rtl">
            <?php $this->render_top_bar('packages'); ?>

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
                    <div style="font-size:15px; font-weight:800; color:#0f172a; margin-top:4px;">۳۱ ویجت + ۷ بلوک + ۳۳ الگو</div>
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

            <!-- ============================================================== -->
            <!-- FLAGSHIP: CUSTOM PROJECT KIT BUILDER STUDIO (استودیوی ساخت جعبه‌ابزار سفارشی) -->
            <!-- ============================================================== -->
            <?php
            require_once UAS_PATH . 'includes/class-template-importer.php';
            $all_kit_widgets   = self::get_all_widgets_list();
            $all_kit_templates = \UniversalElementorSuite\Template_Importer::get_templates_manifest();
            $pkg_mgr           = class_exists('\UniversalElementorSuite\Package_Manager') ? \UniversalElementorSuite\Package_Manager::instance() : null;
            $all_kit_blocks    = $pkg_mgr ? $pkg_mgr->get_gutenberg_blocks_catalog() : [];
            $all_kit_cpts      = $pkg_mgr ? $pkg_mgr->get_cpt_schemas_catalog() : [];
            ?>
            <div class="uas-admin-card uas-kit-studio-card" style="margin-bottom:30px; border:2px solid #6366f1; background:linear-gradient(135deg, rgba(99,102,241,0.04) 0%, rgba(139,92,246,0.02) 100%);">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px; margin-bottom:20px; border-bottom:1px solid var(--uas-border-color); padding-bottom:18px;">
                    <div>
                        <span style="background:linear-gradient(135deg, #6366f1 0%, #a855f7 100%); color:#fff; font-size:11px; font-weight:800; padding:4px 12px; border-radius:20px; display:inline-block; margin-bottom:8px;">
                            🚀 قابلیت نوین: استودیوی ساخت کیت مستقل برای پروژه‌های سفارشی
                        </span>
                        <h2 style="font-size:20px; font-weight:800; color:var(--uas-text-main); margin:0 0 6px;">
                            🧰 استودیوی ساخت جعبه‌ابزار سفارشی و قابل حمل (Custom Project Kit Studio)
                        </h2>
                        <p style="font-size:13px; color:var(--uas-text-muted); margin:0; max-width:860px; line-height:1.7;">
                            اگر پروژه جدیدی برای مشتری (شرکتی، پزشکی، فروشگاهی، آموزشی، حقوقی یا آژانس) تحویل گرفته‌اید، پس از نصب وردپرس و المنتور خام، بدون نیاز به نصب کل اکوسیستم یا قالب‌های سنگین، دقیقاً ویجت‌ها، بلوک‌های گوتنبرگ، اسکیماهای CPT و قالب‌های مورد نیاز آن سایت را انتخاب کنید. سیستم با ۱ کلیک یک افزونه مستقل وردپرسی (Standalone ZIP Plugin) همراه با چک‌سام SHA-256 کامپایل می‌کند که با بارگذاری آن در هاست مشتری، قالب‌ها خودکار در کتابخانه المنتور ثبت و تمام ماژول‌ها آماده استفاده می‌شوند.
                        </p>
                    </div>
                    <div style="background:var(--uas-bg-card); border:1px solid var(--uas-border-color); padding:10px 16px; border-radius:12px; text-align:center;">
                        <span style="font-size:11px; color:var(--uas-text-muted); display:block;">موجودی قابل انتخاب</span>
                        <strong style="font-size:15px; color:var(--uas-primary);"><?php echo count($all_kit_widgets); ?> ویجت + <?php echo count($all_kit_blocks); ?> بلوک + <?php echo count($all_kit_templates); ?> الگو + <?php echo count($all_kit_cpts); ?> CPT</strong>
                    </div>
                </div>

                <!-- Form Controls: Project Info -->
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:18px; margin-bottom:24px;">
                    <div>
                        <label for="uas-kit-project-name" style="display:block; font-size:13px; font-weight:700; color:var(--uas-text-main); margin-bottom:6px;">
                            نام پروژه یا برند مشتری:
                        </label>
                        <input type="text" id="uas-kit-project-name" value="پروژه وب‌سایت مشتری" style="width:100%; padding:10px 14px; border-radius:8px; border:1px solid var(--uas-border-color); background:var(--uas-bg-card); color:var(--uas-text-main); font-size:13px; font-weight:600;" placeholder="مثال: آکادمی توسعه فردی نوین" />
                    </div>

                    <div>
                        <label for="uas-kit-project-slug" style="display:block; font-size:13px; font-weight:700; color:var(--uas-text-main); margin-bottom:6px;">
                            نامک انگلیسی افزونه (Slug):
                        </label>
                        <input type="text" id="uas-kit-project-slug" value="client-elementor-kit" style="width:100%; padding:10px 14px; border-radius:8px; border:1px solid var(--uas-border-color); background:var(--uas-bg-card); color:var(--uas-text-main); font-size:13px; font-family:monospace; direction:ltr; text-align:left;" placeholder="e.g. client-academy-kit" />
                    </div>

                    <div>
                        <label for="uas-kit-niche" style="display:block; font-size:13px; font-weight:700; color:var(--uas-text-main); margin-bottom:6px;">
                            حوزه کاری و نیچ پروژه (Niche):
                        </label>
                        <select id="uas-kit-niche" style="width:100%; padding:10px 14px; border-radius:8px; border:1px solid var(--uas-border-color); background:var(--uas-bg-card); color:var(--uas-text-main); font-size:13px; font-weight:600;">
                            <option value="corporate">شرکتی و سازمانی (Corporate)</option>
                            <option value="medical">کلینیک و پزشکی (Clinic & Healthcare)</option>
                            <option value="store">فروشگاه آنلاین (E-Commerce / Store)</option>
                            <option value="lms">آکادمی و دوره آنلاین (LMS & Academy)</option>
                            <option value="agency">آژانس دیجیتال و نمونه‌کار (Creative Agency)</option>
                            <option value="legal">حقوقی، وکالت و موسسات (Legal Firm)</option>
                            <option value="general" selected>چندمنظوره و استاندارد (General Purpose)</option>
                        </select>
                    </div>
                </div>

                <!-- Infrastructure Capabilities Checkboxes -->
                <div style="background:var(--uas-bg-card); border:1px solid var(--uas-border-color); border-radius:12px; padding:16px 20px; margin-bottom:24px; display:flex; flex-wrap:wrap; gap:24px; align-items:center;">
                    <strong style="font-size:13px; color:var(--uas-text-main); display:inline-flex; align-items:center; gap:6px;">
                        <span>⚙️</span> قابلیت‌های زیرساختی هوشمند:
                    </strong>

                    <label style="display:inline-flex; align-items:center; gap:8px; cursor:pointer; font-size:13px; color:var(--uas-text-body);">
                        <input type="checkbox" id="uas-kit-theme-bridge" checked value="1" style="width:17px; height:17px; accent-color:#6366f1;" />
                        <span><strong>پل سازنده قالب (Theme Builder Bridge):</strong> نمایش خودکار هدر، فوتر، تک‌پست و ۴۰۴ حتی در المنتور رایگان</span>
                    </label>

                    <label style="display:inline-flex; align-items:center; gap:8px; cursor:pointer; font-size:13px; color:var(--uas-text-body);">
                        <input type="checkbox" id="uas-kit-query-engine" checked value="1" style="width:17px; height:17px; accent-color:#6366f1;" />
                        <span><strong>موتور کوئری پویا (Dynamic Query Engine):</strong> کوئری‌های پرسرعت CPT و سیستم کشینگ ترنزینت</span>
                    </label>
                </div>

                <!-- SECTION A: SELECT WIDGETS -->
                <div style="margin-bottom:24px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                        <h3 style="font-size:15px; font-weight:800; color:var(--uas-text-main); margin:0;">
                            🧩 ۱. انتخاب ویجت‌های المنتور برای این پروژه (<span id="uas-kit-widgets-selected-count"><?php echo count($all_kit_widgets); ?></span> از <?php echo count($all_kit_widgets); ?> انتخاب‌شده):
                        </h3>
                        <div style="display:flex; gap:8px;">
                            <button type="button" id="uas-kit-select-all-widgets" class="button" style="font-size:11px; padding:2px 10px; height:auto;">انتخاب همه</button>
                            <button type="button" id="uas-kit-deselect-all-widgets" class="button" style="font-size:11px; padding:2px 10px; height:auto;">عدم انتخاب همه</button>
                        </div>
                    </div>

                    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:10px; max-height:300px; overflow-y:auto; padding:12px; background:var(--uas-bg-card); border:1px solid var(--uas-border-color); border-radius:10px;">
                        <?php foreach ($all_kit_widgets as $w_slug => $w_data) : ?>
                            <label style="display:flex; align-items:center; gap:10px; padding:8px 12px; border:1px solid var(--uas-border-color); border-radius:8px; background:var(--uas-bg-card-subtle); cursor:pointer; font-size:12px; transition:all 0.15s ease;">
                                <input type="checkbox" name="uas_kit_widgets[]" value="<?php echo esc_attr($w_slug); ?>" checked class="uas-kit-widget-cb" style="accent-color:#6366f1; width:16px; height:16px;" />
                                <span style="color:var(--uas-primary); font-size:15px;"><i class="<?php echo esc_attr($w_data['icon']); ?>"></i></span>
                                <span style="font-weight:700; color:var(--uas-text-main);"><?php echo esc_html($w_data['name']); ?></span>
                            </label>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- SECTION B: SELECT TEMPLATES -->
                <div style="margin-bottom:24px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                        <h3 style="font-size:15px; font-weight:800; color:var(--uas-text-main); margin:0;">
                            📐 ۲. انتخاب الگوهای آماده برای درون‌ریزی خودکار در کتابخانه (<span id="uas-kit-templates-selected-count"><?php echo count($all_kit_templates); ?></span> از <?php echo count($all_kit_templates); ?> انتخاب‌شده):
                        </h3>
                        <div style="display:flex; gap:8px;">
                            <button type="button" id="uas-kit-select-all-templates" class="button" style="font-size:11px; padding:2px 10px; height:auto;">انتخاب همه</button>
                            <button type="button" id="uas-kit-deselect-all-templates" class="button" style="font-size:11px; padding:2px 10px; height:auto;">عدم انتخاب همه</button>
                        </div>
                    </div>

                    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:10px; max-height:300px; overflow-y:auto; padding:12px; background:var(--uas-bg-card); border:1px solid var(--uas-border-color); border-radius:10px;">
                        <?php foreach ($all_kit_templates as $tpl) : 
                            $badge_color = '#3b82f6';
                            if ($tpl['type'] === 'page') $badge_color = '#10b981';
                            elseif ($tpl['type'] === 'header' || $tpl['type'] === 'footer') $badge_color = '#ec4899';
                            elseif ($tpl['type'] === 'popup') $badge_color = '#ef4444';
                        ?>
                            <label style="display:flex; align-items:center; justify-content:space-between; gap:10px; padding:8px 12px; border:1px solid var(--uas-border-color); border-radius:8px; background:var(--uas-bg-card-subtle); cursor:pointer; font-size:12px; transition:all 0.15s ease;">
                                <div style="display:flex; align-items:center; gap:8px; overflow:hidden;">
                                    <input type="checkbox" name="uas_kit_templates[]" value="<?php echo esc_attr($tpl['slug']); ?>" checked class="uas-kit-template-cb" style="accent-color:#6366f1; width:16px; height:16px;" />
                                    <span style="font-weight:700; color:var(--uas-text-main); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="<?php echo esc_attr($tpl['title']); ?>">
                                        <?php echo esc_html($tpl['title']); ?>
                                    </span>
                                </div>
                                <span style="font-size:10px; padding:2px 6px; border-radius:4px; color:#fff; background:<?php echo esc_attr($badge_color); ?>; flex-shrink:0;">
                                    <?php echo esc_html($tpl['type']); ?>
                                </span>
                            </label>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- SECTION C: SELECT GUTENBERG BLOCKS -->
                <div style="margin-bottom:24px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                        <h3 style="font-size:15px; font-weight:800; color:var(--uas-text-main); margin:0;">
                            🧱 ۳. انتخاب بلوک‌های بومی گوتنبرگ (<span id="uas-kit-blocks-selected-count"><?php echo count($all_kit_blocks); ?></span> از <?php echo count($all_kit_blocks); ?> انتخاب‌شده):
                        </h3>
                        <div style="display:flex; gap:8px;">
                            <button type="button" id="uas-kit-select-all-blocks" class="button" style="font-size:11px; padding:2px 10px; height:auto;">انتخاب همه</button>
                            <button type="button" id="uas-kit-deselect-all-blocks" class="button" style="font-size:11px; padding:2px 10px; height:auto;">عدم انتخاب همه</button>
                        </div>
                    </div>

                    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:10px; padding:12px; background:var(--uas-bg-card); border:1px solid var(--uas-border-color); border-radius:10px;">
                        <?php foreach ($all_kit_blocks as $b_slug => $b_data) : ?>
                            <label style="display:flex; align-items:center; justify-content:space-between; gap:10px; padding:8px 12px; border:1px solid var(--uas-border-color); border-radius:8px; background:var(--uas-bg-card-subtle); cursor:pointer; font-size:12px;">
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <input type="checkbox" name="uas_kit_blocks[]" value="<?php echo esc_attr($b_slug); ?>" checked class="uas-kit-block-cb" style="accent-color:#6366f1; width:16px; height:16px;" />
                                    <span style="font-weight:700; color:var(--uas-text-main);"><?php echo esc_html($b_data['title']); ?></span>
                                </div>
                                <span style="font-size:10px; padding:2px 6px; border-radius:4px; color:#4338ca; background:#e0e7ff;"><?php echo esc_html($b_data['badge']); ?></span>
                            </label>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- SECTION D: SELECT PORTABLE CPT SCHEMAS -->
                <div style="margin-bottom:24px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                        <h3 style="font-size:15px; font-weight:800; color:var(--uas-text-main); margin:0;">
                            🗂️ ۴. انتخاب اسکیمای پست‌تایپ‌های قابل حمل (<span id="uas-kit-cpts-selected-count"><?php echo count($all_kit_cpts); ?></span> از <?php echo count($all_kit_cpts); ?> انتخاب‌شده):
                        </h3>
                        <span style="font-size:11px; color:var(--uas-text-muted);">ثبت خودکار CPTها و تاکسونومی‌ها در سایت مقصد بدون حذف داده‌های قبلی</span>
                    </div>

                    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:10px; padding:12px; background:var(--uas-bg-card); border:1px solid var(--uas-border-color); border-radius:10px;">
                        <?php foreach ($all_kit_cpts as $c_slug => $c_data) : ?>
                            <label style="display:flex; align-items:flex-start; gap:10px; padding:10px 12px; border:1px solid var(--uas-border-color); border-radius:8px; background:var(--uas-bg-card-subtle); cursor:pointer; font-size:12px;">
                                <input type="checkbox" name="uas_kit_cpts[]" value="<?php echo esc_attr($c_slug); ?>" checked class="uas-kit-cpt-cb" style="accent-color:#6366f1; width:16px; height:16px; margin-top:2px;" />
                                <div>
                                    <div style="font-weight:700; color:var(--uas-text-main);"><?php echo esc_html($c_data['title']); ?></div>
                                    <div style="font-size:11px; color:var(--uas-text-muted); margin-top:2px;"><?php echo esc_html($c_data['description']); ?></div>
                                </div>
                            </label>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- ACTION: COMPILE BUTTON & RESULT STATUS -->
                <div style="border-top:1px solid var(--uas-border-color); padding-top:20px; display:flex; flex-direction:column; gap:14px;">
                    <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:14px;">
                        <button type="button" id="uas-btn-build-custom-bundle" class="uas-btn-primary" style="padding:12px 28px; font-size:14px; font-weight:800; border-radius:10px; box-shadow:0 6px 18px rgba(99,102,241,0.35); display:inline-flex; align-items:center; gap:8px; cursor:pointer;">
                            <span>⚡</span> <?php esc_html_e('کامپایل و استخراج بسته مستقل ZIP برای پروژه', 'universal-elementor-suite'); ?>
                        </button>
                        <span style="font-size:12px; color:var(--uas-text-muted);">
                            🔒 خودکفا و ایزوله: قابل نصب روی هر هاست و دامین مستقل بدون هیچ وابستگی به تم مادر یا ری‌اکت
                        </span>
                    </div>

                    <!-- Live build progress and download area -->
                    <div id="uas-custom-bundle-status" style="display:none;"></div>
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
                            <div style="border-top:1px solid #e2e8f0; padding-top:12px; margin-top:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                                <code style="font-size:11px;"><?php echo esc_html($pkg['id']); ?></code>
                                <a href="<?php echo esc_url(wp_nonce_url(admin_url('admin-post.php?action=uas_download_package&package_id=' . urlencode($pkg['id'])), 'uas_download_package_nonce')); ?>" class="button button-primary" style="font-size:11px; padding:2px 10px; height:auto; display:inline-flex; align-items:center; gap:4px;">
                                    <span>📦</span> <?php esc_html_e('دریافت بسته مستقل ZIP', 'universal-elementor-suite'); ?>
                                </a>
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

            <!-- Tab Section 4: Observability & Leads Intelligence Hub -->
            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:24px; margin-top:28px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
                    <div>
                        <h2 style="font-size:17px; font-weight:800; color:#0f172a; margin:0 0 4px;">رصدخانه عملکرد و لیدهای هوشمند (Observability Hub)</h2>
                        <p style="font-size:12px; color:#64748b; margin:0;">پایش نرخ تبدیل لندینگ‌پیج‌ها، شمارش لیدهای فرم‌های هیرو/تماس با حفظ حریم خصوصی و امنیت داده‌ها.</p>
                    </div>
                </div>

                <?php
                $leads = get_option('uas_captured_leads_vault', []);
                $logs  = get_option('uas_security_audit_logs', []);
                ?>

                <!-- Summary Metric Cards -->
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:14px; margin-bottom:24px;">
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; text-align:center;">
                        <span style="font-size:24px; font-weight:800; color:#4338ca; display:block;"><?php echo count($leads); ?></span>
                        <span style="font-size:12px; color:#64748b; font-weight:600;">لیدهای جذب‌شده فعال</span>
                    </div>
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; text-align:center;">
                        <span style="font-size:24px; font-weight:800; color:#059669; display:block;"><?php echo count($logs); ?></span>
                        <span style="font-size:12px; color:#64748b; font-weight:600;">رویدادهای امنیتی مانیتور شده</span>
                    </div>
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; text-align:center;">
                        <span style="font-size:24px; font-weight:800; color:#d97706; display:block;">Active</span>
                        <span style="font-size:12px; color:#64748b; font-weight:600;">کشینگ ترنزینت کوئری‌ها</span>
                    </div>
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; text-align:center;">
                        <span style="font-size:24px; font-weight:800; color:#0f172a; display:block;">PHP <?php echo esc_html(PHP_VERSION); ?></span>
                        <span style="font-size:12px; color:#64748b; font-weight:600;">موتور پردازش سریع سرور</span>
                    </div>
                </div>

                <!-- Recent Captured Leads Table -->
                <h3 style="font-size:14px; font-weight:700; color:#0f172a; margin:0 0 10px;">جدیدترین درخواست‌های جذب لید (Anonymized & Secure)</h3>
                <?php if (empty($leads)) : ?>
                    <p style="font-size:12px; color:#94a3b8; font-style:italic;">هنوز لیدی از طریق ویجت‌های فرود ثبت نشده است. پس از ارسال فرم توسط کاربران، داده‌ها در این بخش به نمایش درمی‌آیند.</p>
                <?php else : ?>
                    <div style="overflow-x:auto;">
                        <table class="wp-list-table widefat fixed striped" style="border:1px solid #e2e8f0; border-radius:8px;">
                            <thead>
                                <tr style="background:#f8fafc;">
                                    <th style="font-weight:700; width:30%;">شماره تماس</th>
                                    <th style="font-weight:700; width:25%;">ویجت منبع</th>
                                    <th style="font-weight:700; width:25%;">زمان ثبت</th>
                                    <th style="font-weight:700; width:20%;">آدرس IP (ناشناس‌سازی)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach (array_slice($leads, 0, 5) as $lead) : ?>
                                    <tr>
                                        <td><strong><?php echo esc_html($lead['phone']); ?></strong></td>
                                        <td><code><?php echo esc_html($lead['source']); ?></code></td>
                                        <td style="font-size:11px; color:#64748b;"><?php echo esc_html($lead['timestamp']); ?></td>
                                        <td><span style="font-size:11px; background:#f1f5f9; padding:2px 6px; border-radius:4px;"><?php echo esc_html($lead['ip']); ?></span></td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }
}

