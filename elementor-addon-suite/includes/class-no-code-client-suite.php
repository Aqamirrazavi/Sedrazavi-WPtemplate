<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal No-Code Client Customization Suite
 * 
 * Empowers non-technical site owners to customize their site without web designers:
 * 1. Simple Client Portal (پیشخوان ساده کارفرما در wp-admin)
 * 2. Frontend Quick-Edit Bar (نوار ابزار ویرایشگر دیداری شناور در فرانت‌اند)
 * 3. WP Customizer Live Integration (تب‌های زنده سفارشی‌ساز وردپرس)
 */
class No_Code_Client_Suite {

    private static $_instance = null;

    const OPTION_KEY = 'uas_client_custom_content';

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        // 1. Admin Menus & Settings
        add_action('admin_menu', [$this, 'register_client_portal_menu']);
        add_action('admin_init', [$this, 'handle_client_form_submission']);

        // 2. AJAX Handlers for Live Quick-Edit & Portal
        add_action('wp_ajax_uas_save_client_content', [$this, 'ajax_save_client_content']);
        add_action('wp_ajax_uas_get_client_content', [$this, 'ajax_get_client_content']);

        // 3. Frontend Quick-Edit Toolbar
        add_action('wp_footer', [$this, 'render_frontend_quick_edit_bar']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_editor_assets']);

        // 4. WP Customizer Integration
        add_action('customize_register', [$this, 'register_customizer_controls']);
    }

    /**
     * Get all custom content fields with safe defaults
     */
    public static function get_content_data() {
        $defaults = [
            // General & Branding
            'site_name'         => 'استودیو طراحی وب و خدمات دیجیتال رضوی',
            'site_tagline'      => 'طراحی سایت سریع، سبک و حرفه‌ای با گوتنبرگ بدون افزونه‌های سنگین',
            'logo_url'          => '',
            'accent_color'      => '#6366F1',
            'dark_mode'         => false,

            // Hero Section Texts
            'hero_title'        => 'طراحی سایت وردپرس با گوتنبرگ؛ سریع، سبک، حرفه‌ای',
            'hero_subtitle'     => 'بدون افزونه‌های سنگین، با تمرکز بر سرعت، سئو و تجربه کاربری',
            'hero_cta_primary'  => 'مشاوره رایگان ۲۰ دقیقه‌ای',
            'hero_cta_secondary'=> 'مشاهده نمونه‌کارها',
            'hero_banner_image' => '',

            // Contact & Socials
            'phone'             => '۰۲۱-۸۸۹۹۰۰۱۱',
            'mobile'            => '۰۹۱۲-۳۴۵۶۷۸۹',
            'whatsapp'          => '09123456789',
            'telegram'          => 'sedrazavi_support',
            'email'             => 'info@sedrazavi.ir',
            'address'           => 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج فناوری رضوی',
            'working_hours'     => 'شنبه تا چهارشنبه ۹:۰۰ الی ۱۸:۰۰',

            // Media & Downloads
            'promo_video_url'   => 'https://aparat.com/v/example',
            'podcast_audio_url' => '',
            'catalog_pdf_url'   => '',
            'download_app_url'  => '',

            // Trust & Stats
            'stat_projects'     => '+۸۰',
            'stat_rating'       => '۴.۹ از ۵',
            'stat_satisfaction' => '۹۵٪',

            // Custom Downloads & Files
            'downloads_items'   => [
                ['title' => 'کاتالوگ جامع خدمات و تعرفه‌ها ۱۴۰۳ (PDF)', 'url' => '#', 'size' => '۴.۲ مگابایت', 'type' => 'pdf'],
                ['title' => 'چک‌لیست سئو و عملکرد تکنیکال سایت', 'url' => '#', 'size' => '۱.۵ مگابایت', 'type' => 'doc'],
                ['title' => 'پادکست صوتی: تفاوت‌های کلیدی گوتنبرگ و المنتور', 'url' => '#', 'size' => '۱۸ مگابایت', 'type' => 'audio'],
            ],
        ];

        $saved = get_option(self::OPTION_KEY, []);
        return wp_parse_args($saved, $defaults);
    }

    /**
     * Register standalone Simple Client Portal in WP Admin
     */
    public function register_client_portal_menu() {
        add_menu_page(
            esc_html__('پیشخوان آسان کارفرما (مدیریت محتوا)', 'universal-elementor-suite'),
            esc_html__('مدیریت محتوا (آسان)', 'universal-elementor-suite'),
            'edit_posts',
            'client-content-hub',
            [$this, 'render_client_portal_page'],
            'dashicons-welcome-write-blog',
            3
        );
    }

    /**
     * Handle standard POST form submit
     */
    public function handle_client_form_submission() {
        if (!isset($_POST['uas_save_client_content_nonce'])) {
            return;
        }

        if (!wp_verify_nonce($_POST['uas_save_client_content_nonce'], 'uas_client_content_save_action')) {
            wp_die('درخواست نامعتبر است.');
        }

        if (!current_user_can('edit_posts')) {
            wp_die('دسترسی کافی ندارید.');
        }

        $current = self::get_content_data();
        $fields = [
            'site_name', 'site_tagline', 'logo_url', 'accent_color',
            'hero_title', 'hero_subtitle', 'hero_cta_primary', 'hero_cta_secondary', 'hero_banner_image',
            'phone', 'mobile', 'whatsapp', 'telegram', 'email', 'address', 'working_hours',
            'promo_video_url', 'podcast_audio_url', 'catalog_pdf_url', 'download_app_url',
            'stat_projects', 'stat_rating', 'stat_satisfaction'
        ];

        foreach ($fields as $field) {
            if (isset($_POST[$field])) {
                $current[$field] = sanitize_text_field(wp_unslash($_POST[$field]));
            }
        }

        update_option(self::OPTION_KEY, $current);
        wp_redirect(add_query_arg(['page' => 'client-content-hub', 'saved' => '1'], admin_url('admin.php')));
        exit;
    }

    /**
     * Render the Persian Simple Client Portal UI
     */
    public function render_client_portal_page() {
        $data = self::get_content_data();
        $saved = isset($_GET['saved']) && $_GET['saved'] === '1';
        ?>
        <div class="wrap uas-client-portal-wrap" dir="rtl" style="font-family: inherit; max-width: 1000px; margin: 24px auto;">
            <style>
                .uas-portal-card { background: #fff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); padding: 28px; margin-bottom: 24px; border: 1px solid #e2e8f0; }
                .uas-portal-header { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 24px; }
                .uas-portal-title { margin: 0; font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
                .uas-portal-subtitle { margin: 6px 0 0; font-size: 13px; color: #64748b; }
                .uas-tabs-nav { display: flex; gap: 8px; border-bottom: 2px solid #e2e8f0; margin-bottom: 24px; overflow-x: auto; }
                .uas-tab-btn { background: none; border: none; padding: 12px 18px; font-size: 14px; font-weight: 600; color: #64748b; cursor: pointer; border-bottom: 3px solid transparent; margin-bottom: -2px; transition: all 0.2s; }
                .uas-tab-btn.active { color: #4f46e5; border-bottom-color: #4f46e5; background: #eef2ff; border-radius: 6px 6px 0 0; }
                .uas-form-group { margin-bottom: 18px; }
                .uas-form-group label { display: block; font-weight: 600; font-size: 13px; color: #334155; margin-bottom: 6px; }
                .uas-form-group input, .uas-form-group textarea, .uas-form-group select { width: 100%; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; font-size: 14px; transition: border-color 0.2s; }
                .uas-form-group input:focus, .uas-form-group textarea:focus { border-color: #4f46e5; outline: none; box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1); }
                .uas-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
                .uas-btn-submit { background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%); color: #fff; border: none; border-radius: 8px; padding: 12px 28px; font-size: 15px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; display: inline-flex; align-items: center; gap: 8px; }
                .uas-btn-submit:hover { opacity: 0.95; }
                .uas-notice-success { background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; padding: 12px 18px; border-radius: 8px; margin-bottom: 20px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
            </style>

            <div class="uas-portal-card">
                <div class="uas-portal-header">
                    <div>
                        <h1 class="uas-portal-title">
                            <span>✏️</span> پیشخوان ساده کارفرما — مدیریت بدون‌کد محتوای سایت
                        </h1>
                        <p class="uas-subtitle">بدون نیاز به طراح سایت یا پیچیدگی‌های فنی، متون، تصاویر، شماره تماس‌ها و فایل‌های دانلودی وب‌سایت خود را به راحتی ویرایش کنید.</p>
                    </div>
                    <a href="<?php echo esc_url(home_url()); ?>" target="_blank" class="button button-secondary" style="border-radius: 6px; font-weight: 600;">
                        مشاهده پیش‌نمایش سایت ↗
                    </a>
                </div>

                <?php if ($saved): ?>
                    <div class="uas-notice-success">
                        <span>✓</span> تنظیمات و تغییرات محتوای سایت با موفقیت ذخیره و در وب‌سایت اعمال شدند!
                    </div>
                <?php endif; ?>

                <form method="post" action="">
                    <?php wp_nonce_field('uas_client_content_save_action', 'uas_save_client_content_nonce'); ?>

                    <div class="uas-tabs-nav">
                        <button type="button" class="uas-tab-btn active" onclick="uasSwitchTab('tab-texts')">📝 متون و تیترها</button>
                        <button type="button" class="uas-tab-btn" onclick="uasSwitchTab('tab-contact')">📞 تماس و شبکه‌ها</button>
                        <button type="button" class="uas-tab-btn" onclick="uasSwitchTab('tab-media')">🖼️ تصاویر و ویدیوها</button>
                        <button type="button" class="uas-tab-btn" onclick="uasSwitchTab('tab-downloads')">📥 دانلود و کاتالوگ</button>
                        <button type="button" class="uas-tab-btn" onclick="uasSwitchTab('tab-style')">🎨 رنگ و استایل</button>
                    </div>

                    <!-- TAB 1: Texts & Headlines -->
                    <div id="tab-texts" class="uas-tab-content">
                        <div class="uas-grid-2">
                            <div class="uas-form-group">
                                <label>نام برند یا عنوان سایت:</label>
                                <input type="text" name="site_name" value="<?php echo esc_attr($data['site_name']); ?>" />
                            </div>
                            <div class="uas-form-group">
                                <label>شعار کوتاه یا زیرعنوان اصلی:</label>
                                <input type="text" name="site_tagline" value="<?php echo esc_attr($data['site_tagline']); ?>" />
                            </div>
                        </div>

                        <div class="uas-form-group">
                            <label>تیتر بزرگ صفحه اصلی (Hero Title):</label>
                            <input type="text" name="hero_title" value="<?php echo esc_attr($data['hero_title']); ?>" />
                        </div>

                        <div class="uas-form-group">
                            <label>توضیحات تکمیلی بنر صفحه اصلی:</label>
                            <textarea name="hero_subtitle" rows="3"><?php echo esc_textarea($data['hero_subtitle']); ?></textarea>
                        </div>

                        <div class="uas-grid-2">
                            <div class="uas-form-group">
                                <label>متن دکمه اصلی (CTA):</label>
                                <input type="text" name="hero_cta_primary" value="<?php echo esc_attr($data['hero_cta_primary']); ?>" />
                            </div>
                            <div class="uas-form-group">
                                <label>متن دکمه دوم (فرعی):</label>
                                <input type="text" name="hero_cta_secondary" value="<?php echo esc_attr($data['hero_cta_secondary']); ?>" />
                            </div>
                        </div>

                        <div class="uas-grid-2" style="grid-template-columns: 1fr 1fr 1fr;">
                            <div class="uas-form-group">
                                <label>آمار پروژه‌ها:</label>
                                <input type="text" name="stat_projects" value="<?php echo esc_attr($data['stat_projects']); ?>" />
                            </div>
                            <div class="uas-form-group">
                                <label>امتیاز رضایت مشتریان:</label>
                                <input type="text" name="stat_rating" value="<?php echo esc_attr($data['stat_rating']); ?>" />
                            </div>
                            <div class="uas-form-group">
                                <label>درصد وفاداری/رضایت:</label>
                                <input type="text" name="stat_satisfaction" value="<?php echo esc_attr($data['stat_satisfaction']); ?>" />
                            </div>
                        </div>
                    </div>

                    <!-- TAB 2: Contact Info -->
                    <div id="tab-contact" class="uas-tab-content" style="display: none;">
                        <div class="uas-grid-2">
                            <div class="uas-form-group">
                                <label>شماره تماس ثابت دفتر:</label>
                                <input type="text" name="phone" value="<?php echo esc_attr($data['phone']); ?>" />
                            </div>
                            <div class="uas-form-group">
                                <label>شماره همراه / مشاوره فوری:</label>
                                <input type="text" name="mobile" value="<?php echo esc_attr($data['mobile']); ?>" />
                            </div>
                        </div>

                        <div class="uas-grid-2">
                            <div class="uas-form-group">
                                <label>شماره واتساپ (برای دکمه شناور چت):</label>
                                <input type="text" name="whatsapp" value="<?php echo esc_attr($data['whatsapp']); ?>" placeholder="مثال: 09123456789" />
                            </div>
                            <div class="uas-form-group">
                                <label>آیدی تلگرام پشتیبانی:</label>
                                <input type="text" name="telegram" value="<?php echo esc_attr($data['telegram']); ?>" placeholder="بدون @" />
                            </div>
                        </div>

                        <div class="uas-grid-2">
                            <div class="uas-form-group">
                                <label>آدرس ایمیل کاری:</label>
                                <input type="email" name="email" value="<?php echo esc_attr($data['email']); ?>" />
                            </div>
                            <div class="uas-form-group">
                                <label>ساعات کاری و پاسخگویی:</label>
                                <input type="text" name="working_hours" value="<?php echo esc_attr($data['working_hours']); ?>" />
                            </div>
                        </div>

                        <div class="uas-form-group">
                            <label>نشانی کامل پستی:</label>
                            <input type="text" name="address" value="<?php echo esc_attr($data['address']); ?>" />
                        </div>
                    </div>

                    <!-- TAB 3: Media & Video -->
                    <div id="tab-media" class="uas-tab-content" style="display: none;">
                        <div class="uas-form-group">
                            <label>آدرس تصویر لوگوی برند (URL):</label>
                            <input type="url" name="logo_url" value="<?php echo esc_attr($data['logo_url']); ?>" placeholder="https://..." />
                        </div>

                        <div class="uas-form-group">
                            <label>آدرس تصویر بنر بالای سایت:</label>
                            <input type="url" name="hero_banner_image" value="<?php echo esc_attr($data['hero_banner_image']); ?>" placeholder="https://..." />
                        </div>

                        <div class="uas-form-group">
                            <label>لینک ویدیوی معرفی برند (آپارات، یوتیوب یا فایل مستقیم MP4):</label>
                            <input type="url" name="promo_video_url" value="<?php echo esc_attr($data['promo_video_url']); ?>" />
                        </div>

                        <div class="uas-form-group">
                            <label>لینک پادکست یا صوت معرفی (MP3):</label>
                            <input type="url" name="podcast_audio_url" value="<?php echo esc_attr($data['podcast_audio_url']); ?>" />
                        </div>
                    </div>

                    <!-- TAB 4: Download Center & Catalogs -->
                    <div id="tab-downloads" class="uas-tab-content" style="display: none;">
                        <div class="uas-form-group">
                            <label>لینک دانلود کاتالوگ یا فایل PDF معرفی شرکت/خدمات:</label>
                            <input type="url" name="catalog_pdf_url" value="<?php echo esc_attr($data['catalog_pdf_url']); ?>" placeholder="https://.../catalog.pdf" />
                        </div>

                        <div class="uas-form-group">
                            <label>لینک دانلود اپلیکیشن یا نرم‌افزار اختصاصی (APK / EXE / ZIP):</label>
                            <input type="url" name="download_app_url" value="<?php echo esc_attr($data['download_app_url']); ?>" />
                        </div>

                        <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 16px; margin-top: 14px;">
                            <h4 style="margin: 0 0 8px 0; color: #334155;">راهنمای فایل‌های دانلودی:</h4>
                            <p style="margin: 0; font-size: 13px; color: #64748b;">می‌توانید فایل‌های کاتالوگ، موسیقی، ویدیو یا نرم‌افزار خود را در منوی «رسانه -> افزودن جدید» آپلود کرده و لینک مستقیم آن را در کادرهای بالا قرار دهید.</p>
                        </div>
                    </div>

                    <!-- TAB 5: Style & Brand Colors -->
                    <div id="tab-style" class="uas-tab-content" style="display: none;">
                        <div class="uas-form-group">
                            <label>رنگ سازمانی و شاخص برند (Accent Color):</label>
                            <input type="color" name="accent_color" value="<?php echo esc_attr($data['accent_color']); ?>" style="height: 48px; cursor: pointer; padding: 4px;" />
                        </div>
                    </div>

                    <div style="margin-top: 24px; border-top: 2px solid #f1f5f9; padding-top: 20px;">
                        <button type="submit" class="uas-btn-submit">
                            <span>💾</span> ذخیره و انتشار تغییرات در سایت
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <script>
            function uasSwitchTab(tabId) {
                document.querySelectorAll('.uas-tab-content').forEach(el => el.style.display = 'none');
                document.querySelectorAll('.uas-tab-btn').forEach(btn => btn.classList.remove('active'));
                const activeTab = document.getElementById(tabId);
                if (activeTab) activeTab.style.display = 'block';
                event.target.classList.add('active');
            }
        </script>
        <?php
    }

    /**
     * Frontend Quick-Edit Toolbar for Logged-in Admins
     */
    public function render_frontend_quick_edit_bar() {
        if (!current_user_can('edit_posts')) {
            return;
        }

        $content = self::get_content_data();
        ?>
        <div id="uas-quick-edit-bar" dir="rtl" style="position: fixed; bottom: 20px; right: 20px; z-index: 999999; font-family: system-ui, -apple-system, sans-serif;">
            <div style="background: #1e1e2f; color: #fff; border-radius: 50px; padding: 10px 18px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 12px; border: 1px solid rgba(255,255,255,0.15);">
                <span style="font-size: 16px;">✏️</span>
                <span style="font-size: 13px; font-weight: 600;">نوار ویرایشگر سریع دیداری</span>
                <button type="button" id="uas-toggle-live-edit" style="background: #4f46e5; color: #fff; border: none; border-radius: 20px; padding: 6px 14px; font-size: 12px; font-weight: 700; cursor: pointer;">
                    فعال‌سازی ویرایش زنده متن
                </button>
                <a href="<?php echo esc_url(admin_url('admin.php?page=client-content-hub')); ?>" style="color: #94a3b8; font-size: 12px; text-decoration: none;">
                    پیشخوان کارفرما ↗
                </a>
            </div>
        </div>
        <script>
            (function() {
                const btn = document.getElementById('uas-toggle-live-edit');
                if (!btn) return;
                let active = false;
                btn.addEventListener('click', function() {
                    active = !active;
                    btn.textContent = active ? 'غیرفعال‌سازی ویرایش' : 'فعال‌سازی ویرایش زنده متن';
                    btn.style.background = active ? '#dc2626' : '#4f46e5';
                    
                    document.querySelectorAll('[data-uas-editable]').forEach(el => {
                        el.contentEditable = active ? 'true' : 'false';
                        el.style.outline = active ? '2px dashed #4f46e5' : 'none';
                        el.style.padding = active ? '2px 6px' : '';
                        el.style.borderRadius = active ? '4px' : '';
                    });
                });
            })();
        </script>
        <?php
    }

    public function enqueue_frontend_editor_assets() {
        // Enqueue if needed
    }

    /**
     * WP Customizer Live Integration
     */
    public function register_customizer_controls($wp_customize) {
        $wp_customize->add_section('uas_client_section', [
            'title'       => esc_html__('تنظیمات اختصاصی محتوا (بدون کد)', 'universal-elementor-suite'),
            'priority'    => 25,
            'description' => esc_html__('شخصی‌سازی سریع متون و رنگ‌های شاخص سایت بدون دستکاری کدها', 'universal-elementor-suite'),
        ]);

        $wp_customize->add_setting('uas_client_custom_content[hero_title]', [
            'type'              => 'option',
            'transport'         => 'refresh',
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control('uas_client_hero_title', [
            'label'    => esc_html__('تیتر بزرگ صفحه اصلی', 'universal-elementor-suite'),
            'section'  => 'uas_client_section',
            'settings' => 'uas_client_custom_content[hero_title]',
            'type'     => 'text',
        ]);
    }

    /**
     * AJAX Save Client Content
     */
    public function ajax_save_client_content() {
        check_ajax_referer('uas_github_admin_nonce', 'nonce');

        if (!current_user_can('edit_posts')) {
            wp_send_json_error(['message' => 'عدم دسترسی کافی.'], 403);
        }

        $fields = $_POST['data'] ?? [];
        if (!is_array($fields)) {
            wp_send_json_error(['message' => 'داده‌های ارسالی نامعتبر است.']);
        }

        $current = self::get_content_data();
        foreach ($fields as $key => $val) {
            $current[sanitize_key($key)] = sanitize_text_field(wp_unslash($val));
        }

        update_option(self::OPTION_KEY, $current);
        wp_send_json_success(['message' => 'محتوای کارفرما با موفقیت ذخیره شد.', 'data' => $current]);
    }

    /**
     * AJAX Get Client Content
     */
    public function ajax_get_client_content() {
        wp_send_json_success(self::get_content_data());
    }
}
