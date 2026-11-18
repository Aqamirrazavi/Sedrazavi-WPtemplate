<?php
/**
 * SedRazavi Master Admin Dashboard & Ecosystem Hub
 *
 * Provides a unified WP-Admin portal synced with Frontend Cockpit via SedRazavi_Ecosystem_Control_Service:
 * 1. Status & Live Ecosystem Health
 * 2. Archetype & Niche Selector
 * 3. Branding & Design Tokens (synced with wp_options & Frontend Cockpit)
 * 4. Iranian SMS & Payment Integrations (unified Shetab / ZarinPal sync)
 * 5. Cloud Templates Library (real wp_ajax_sr_admin_queue_cloud_template persistence)
 * 6. Ecosystem Plugins, Deployed Site Kits & Role Separation Matrix
 *
 * @package SedRazavi_Companion
 * @version 6.2.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Admin_Dashboard {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('admin_menu', [$this, 'register_admin_menu']);
        add_action('admin_init', [$this, 'handle_form_submissions']);
    }

    public function register_admin_menu() {
        add_menu_page(
            'هسته معماری SedRazavi OS',
            'پیشخوان SedRazavi',
            'manage_options',
            'sedrazavi-companion-hub',
            [$this, 'render_dashboard'],
            'dashicons-superhero-alt',
            3
        );
    }

    public function handle_form_submissions() {
        if (!isset($_POST['sr_save_settings_nonce']) || !wp_verify_nonce($_POST['sr_save_settings_nonce'], 'sr_save_settings')) {
            return;
        }

        if (!current_user_can('manage_options')) {
            return;
        }

        $payload = [];
        $text_fields = [
            'sedrazavi_active_archetype',
            'sedrazavi_active_palette',
            'sedrazavi_primary_gold',
            'sedrazavi_secondary_navy',
            'sedrazavi_font_family',
            'sedrazavi_default_mode',
            'sedrazavi_active_scenario',
            'sedrazavi_office_phone',
            'sedrazavi_office_email',
            'sedrazavi_office_address',
            'sedrazavi_working_hours',
            'sedrazavi_sms_provider',
            'sedrazavi_sms_api_key',
            'sedrazavi_sms_otp_pattern',
            'sedrazavi_sms_originator',
            'sedrazavi_shetab_gateway',
            'sedrazavi_shetab_merchant_id',
        ];

        foreach ($text_fields as $field_key) {
            if (isset($_POST[$field_key])) {
                $payload[$field_key] = wp_unslash($_POST[$field_key]);
            }
        }

        if (isset($_POST['sedrazavi_shetab_gateway'])) {
            $payload['sedrazavi_shetab_sandbox'] = isset($_POST['sedrazavi_shetab_sandbox']) ? 'yes' : 'no';
        }

        if (!empty($payload)) {
            if (class_exists('SedRazavi_Ecosystem_Control_Service')) {
                SedRazavi_Ecosystem_Control_Service::save_unified_settings($payload);
            } else {
                foreach ($payload as $k => $v) {
                    update_option($k, sanitize_text_field((string) $v));
                }
            }
            add_settings_error('sedrazavi_messages', 'sedrazavi_message', 'تنظیمات یکپارچه با موفقیت ذخیره و با پیشخوان فرانت‌اند همگام‌سازی گردید.', 'updated');
        }
    }

    /**
     * Locate published page hosting [sedrazavi_frontend_cockpit] for deep-linking.
     */
    private function get_frontend_cockpit_url() {
        if (function_exists('get_posts')) {
            $pages = get_posts([
                'post_type'      => 'page',
                'post_status'    => 'publish',
                's'              => '[sedrazavi_frontend_cockpit',
                'posts_per_page' => 1,
                'fields'         => 'ids',
            ]);
            if (!empty($pages)) {
                $link = get_permalink((int) $pages[0]);
                if ($link) {
                    return $link;
                }
            }
        }
        return home_url('/#cockpit');
    }

    public function render_dashboard() {
        $active_tab = isset($_GET['tab']) ? sanitize_key($_GET['tab']) : 'health';
        $allowed_tabs = ['health', 'archetype', 'branding', 'integrations', 'cloud', 'ecosystem'];
        if (!in_array($active_tab, $allowed_tabs, true)) {
            $active_tab = 'health';
        }

        $unified = class_exists('SedRazavi_Ecosystem_Control_Service')
            ? SedRazavi_Ecosystem_Control_Service::get_unified_settings()
            : [];

        $current_archetype = $unified['sedrazavi_active_archetype'] ?? get_option('sedrazavi_active_archetype', 'agency-designer');
        $current_palette   = $unified['sedrazavi_active_palette'] ?? get_option('sedrazavi_active_palette', 'default');
        $snapshot          = class_exists('SedRazavi_Ecosystem_Control_Service')
            ? SedRazavi_Ecosystem_Control_Service::get_overview_snapshot()
            : [];
        $plugins_inventory = class_exists('SedRazavi_Ecosystem_Control_Service')
            ? SedRazavi_Ecosystem_Control_Service::get_plugins_inventory()
            : [];
        $role_matrix       = class_exists('SedRazavi_Ecosystem_Control_Service')
            ? SedRazavi_Ecosystem_Control_Service::get_role_capability_matrix()
            : [];
        $queued_cloud      = class_exists('SedRazavi_Ecosystem_Control_Service')
            ? SedRazavi_Ecosystem_Control_Service::get_queued_cloud_templates()
            : [];
        $deployed_kits     = get_option('sr_cockpit_deployed_kits', []);
        if (!is_array($deployed_kits)) {
            $deployed_kits = [];
        }
        $admin_ajax_nonce = wp_create_nonce('sr_admin_dashboard_nonce');
        $cockpit_url      = $this->get_frontend_cockpit_url();
        ?>
        <div class="wrap" dir="rtl" style="max-width: 1200px; font-family: inherit;">
            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #fff; padding: 24px; border-radius: 16px; margin-bottom: 24px; border: 1px solid #334155; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
                <div>
                    <span style="display: inline-block; padding: 3px 10px; background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); border-radius: 20px; font-size: 11px; font-weight: bold; color: #60a5fa; margin-bottom: 6px;">
                        مدیریت یکپارچه سیستم‌عامل وردپرس (SedRazavi OS v6.2)
                    </span>
                    <h1 style="color: #fff; margin: 0; font-size: 22px;">پیشخوان فرماندهی هسته آژانس، حقوقی و توسعه چندمنظوره</h1>
                </div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <a href="<?php echo esc_url($cockpit_url); ?>" class="button button-secondary" style="border-radius: 8px;">
                        🧭 باز کردن پیشخوان فرانت‌اند
                    </a>
                    <a href="<?php echo esc_url(admin_url('admin.php?page=sedrazavi-demo-importer')); ?>" class="button button-primary" style="background: #2563eb; border-color: #2563eb; border-radius: 8px;">
                        📥 درون‌ریز دموهای ۱-کلیک
                    </a>
                    <a href="<?php echo esc_url(home_url('/')); ?>" target="_blank" class="button button-secondary" style="border-radius: 8px;">
                        مشاهده فرانت سایت ↗
                    </a>
                </div>
            </div>

            <?php settings_errors('sedrazavi_messages'); ?>

            <!-- Navigation Tabs -->
            <nav class="nav-tab-wrapper" style="margin-bottom: 20px; border-bottom: 2px solid #cbd5e1;">
                <a href="<?php echo esc_url(admin_url('admin.php?page=sedrazavi-companion-hub&tab=health')); ?>" class="nav-tab <?php echo $active_tab === 'health' ? 'nav-tab-active' : ''; ?>">
                    🩺 سلامت و وضعیت سیستم
                </a>
                <a href="<?php echo esc_url(admin_url('admin.php?page=sedrazavi-companion-hub&tab=archetype')); ?>" class="nav-tab <?php echo $active_tab === 'archetype' ? 'nav-tab-active' : ''; ?>">
                    🏢 سوییچر اصناف (Archetypes)
                </a>
                <a href="<?php echo esc_url(admin_url('admin.php?page=sedrazavi-companion-hub&tab=branding')); ?>" class="nav-tab <?php echo $active_tab === 'branding' ? 'nav-tab-active' : ''; ?>">
                    🎨 پالت‌ها و دیزاین توکن
                </a>
                <a href="<?php echo esc_url(admin_url('admin.php?page=sedrazavi-companion-hub&tab=integrations')); ?>" class="nav-tab <?php echo $active_tab === 'integrations' ? 'nav-tab-active' : ''; ?>">
                    💳 پیامک و درگاه شتاب
                </a>
                <a href="<?php echo esc_url(admin_url('admin.php?page=sedrazavi-companion-hub&tab=cloud')); ?>" class="nav-tab <?php echo $active_tab === 'cloud' ? 'nav-tab-active' : ''; ?>">
                    ☁️ کاتالوگ ابری قالب‌ها (<?php echo esc_html((string) count($queued_cloud)); ?>)
                </a>
                <a href="<?php echo esc_url(admin_url('admin.php?page=sedrazavi-companion-hub&tab=ecosystem')); ?>" class="nav-tab <?php echo $active_tab === 'ecosystem' ? 'nav-tab-active' : ''; ?>">
                    🧩 افزونه‌ها، کیت‌ها و ماتریس نقش‌ها
                </a>
            </nav>

            <form method="post" action="">
                <?php wp_nonce_field('sr_save_settings', 'sr_save_settings_nonce'); ?>

                <!-- TAB 1: HEALTH & LIVE ECOSYSTEM SNAPSHOT -->
                <?php if ($active_tab === 'health'): ?>
                    <?php $env = $snapshot['environment'] ?? []; ?>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                        <div style="background: #fff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                            <h3 style="margin-top:0; font-size: 15px; color: #0f172a;">⚙️ مشخصات سرور و محیط اجرا</h3>
                            <ul style="margin: 0; padding: 0; list-style: none; font-size: 13px; line-height: 2;">
                                <li><strong>نسخه PHP:</strong> <?php echo esc_html($env['php_version'] ?? phpversion()); ?> (حداقل: 7.4+)</li>
                                <li><strong>محدودیت حافظه:</strong> <?php echo esc_html($env['memory_limit'] ?? (ini_get('memory_limit') ?: 'N/A')); ?></li>
                                <li><strong>نسخه وردپرس:</strong> <?php echo esc_html($env['wp_version'] ?? get_bloginfo('version')); ?></li>
                                <li><strong>حداکثر حجم آپلود:</strong> <?php echo esc_html($env['upload_max'] ?? (ini_get('upload_max_filesize') ?: 'N/A')); ?></li>
                                <li><strong>المنتور:</strong>
                                    <?php if (!empty($env['elementor_active'])): ?>
                                        <span style="color:#059669; font-weight:bold;">فعال (<?php echo esc_html($env['elementor_version'] ?? 'Active'); ?>)</span>
                                    <?php else: ?>
                                        <span style="color:#b45309;">غیرفعال / حالت مستقل گوتنبرگ</span>
                                    <?php endif; ?>
                                </li>
                            </ul>
                        </div>

                        <div style="background: #fff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                            <h3 style="margin-top:0; font-size: 15px; color: #0f172a;">📊 شاخص‌های زنده اکوسیستم (SSOT)</h3>
                            <ul style="margin: 0; padding: 0; list-style: none; font-size: 13px; line-height: 2;">
                                <li><strong>پرونده‌های حقوقی فعال:</strong> <?php echo esc_html((string) ($snapshot['active_cases_count'] ?? 0)); ?></li>
                                <li><strong>پذیرش‌های حقوقی در انتظار:</strong> <?php echo esc_html((string) ($snapshot['pending_intake_count'] ?? 0)); ?></li>
                                <li><strong>نوبت‌های مشاوره ثبت‌شده:</strong> <?php echo esc_html((string) ($snapshot['appointments_count'] ?? 0)); ?></li>
                                <li><strong>افزونه‌های فعال اکوسیستم:</strong> <?php echo esc_html((string) ($snapshot['active_plugins_count'] ?? 0)); ?> از <?php echo esc_html((string) count($plugins_inventory)); ?></li>
                                <li><strong>کیت‌های سایت مستقرشده:</strong> <?php echo esc_html((string) ($snapshot['deployed_kits_count'] ?? count($deployed_kits))); ?></li>
                                <li><strong>الگوهای ابری آماده درج:</strong> <?php echo esc_html((string) ($snapshot['queued_cloud_count'] ?? count($queued_cloud))); ?></li>
                            </ul>
                        </div>

                        <div style="background: #fff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                            <h3 style="margin-top:0; font-size: 15px; color: #0f172a;">🛡️ جداسازی نقش‌ها و Anti-IDOR</h3>
                            <p style="font-size: 12.5px; color: #64748b; margin-top: 4px; line-height: 1.7;">
                                پرونده‌های حقوقی (<code>sedrazavi_case</code>) از <code>edit_posts</code> جدا شده و با دسترسی اختصاصی <code>sedrazavi_manage_cases</code> و مالکیت موکل محافظت می‌شوند. بسته‌های افزونه قبل از نصب با بررسی Zip Slip، مانیفست و بکاپ خودکار ایمن‌سازی شده‌اند.
                            </p>
                            <a href="<?php echo esc_url(admin_url('admin.php?page=sedrazavi-companion-hub&tab=ecosystem')); ?>" class="button button-secondary" style="border-radius: 6px; margin-top: 8px;">
                                مشاهده ماتریس نقش‌ها و افزونه‌ها ←
                            </a>
                        </div>
                    </div>

                <!-- TAB 2: ARCHETYPE -->
                <?php elseif ($active_tab === 'archetype'): ?>
                    <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <h3 style="margin-top:0; font-size: 16px;">انتخاب صنف فعال (Site Archetype)</h3>
                        <p style="font-size: 13px; color: #64748b; margin-bottom: 20px;">با انتخاب هر صنف، صفحه اصلی، استایل‌ها و امکانات قالب به صورت هوشمند برای آن حوزه کاری بهینه‌سازی می‌شود:</p>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
                            <?php 
                            $archetypes = [
                                'agency-designer' => ['name' => 'آژانس طراحی و استودیو خلاق', 'desc' => 'پورتفولیو، بنتو گرید، محاسبه‌گر قیمت و هدر شیشه‌ای.'],
                                'store-modern'    => ['name' => 'فروشگاه مدرن آنلاین', 'desc' => 'سازگار با ووکامرس، سبد دراور و درگاه شتاب.'],
                                'corporate-pro'   => ['name' => 'هلدینگ و شرکتی بین‌الملل', 'desc' => 'مگامنو، ماتریس راهکارها و پورتال سهامداران.'],
                                'legal-firm'      => ['name' => 'دفتر وکالت و داوری حقوقی', 'desc' => 'استعلام پرونده با کدملی، محاسبه‌گر دیه و تالار داوری.'],
                            ];
                            foreach ($archetypes as $key => $arch): ?>
                                <label style="display: block; border: 2px solid <?php echo $current_archetype === $key ? '#2563eb' : '#e2e8f0'; ?>; padding: 16px; border-radius: 12px; cursor: pointer; background: <?php echo $current_archetype === $key ? '#eff6ff' : '#fff'; ?>;">
                                    <input type="radio" name="sedrazavi_active_archetype" value="<?php echo esc_attr($key); ?>" <?php checked($current_archetype, $key); ?> style="margin-left: 6px;">
                                    <strong style="font-size: 14px; color: #0f172a;"><?php echo esc_html($arch['name']); ?></strong>
                                    <p style="margin: 6px 0 0; font-size: 12px; color: #64748b;"><?php echo esc_html($arch['desc']); ?></p>
                                </label>
                            <?php endforeach; ?>
                        </div>

                        <div style="margin-top: 24px;">
                            <button type="submit" class="button button-primary button-large" style="border-radius: 8px;">ذخیره صنف انتخابی</button>
                        </div>
                    </div>

                <!-- TAB 3: BRANDING -->
                <?php elseif ($active_tab === 'branding'): ?>
                    <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <h3 style="margin-top:0; font-size: 16px;">انتخاب پالت و دیزاین توکن (همگام با پیشخوان فرانت‌اند)</h3>
                        <p style="font-size: 13px; color: #64748b; margin-bottom: 20px;">تغییر پالت و کدهای رنگی به صورت همزمان در wp_options و پیشخوان مدیریت فرانت‌اند ذخیره و اعمال می‌شود:</p>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px;">
                            <?php
                            $palettes = [
                                'default'       => ['name' => 'طلایی لوکس و آبسیدین', 'color' => '#D4AF37'],
                                'cyber-blue'    => ['name' => 'آبی سایبر و تکنولوژی', 'color' => '#3b82f6'],
                                'emerald-store' => ['name' => 'زمردی فروشگاهی و ارگانیک', 'color' => '#10b981'],
                                'corporate-sky' => ['name' => 'آسمانی هلدینگ و شرکتی', 'color' => '#0ea5e9'],
                                'purple-lms'    => ['name' => 'بنفش آکادمی و آموزشی', 'color' => '#8b5cf6'],
                            ];
                            foreach ($palettes as $pkey => $pal): ?>
                                <label style="display: block; border: 2px solid <?php echo $current_palette === $pkey ? '#2563eb' : '#e2e8f0'; ?>; padding: 16px; border-radius: 12px; cursor: pointer;">
                                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                                        <input type="radio" name="sedrazavi_active_palette" value="<?php echo esc_attr($pkey); ?>" <?php checked($current_palette, $pkey); ?>>
                                        <span style="display: inline-block; width: 24px; height: 24px; border-radius: 6px; background: <?php echo esc_attr($pal['color']); ?>;"></span>
                                    </div>
                                    <strong style="font-size: 13px;"><?php echo esc_html($pal['name']); ?></strong>
                                </label>
                            <?php endforeach; ?>
                        </div>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                            <div>
                                <label style="display:block; font-weight:bold; margin-bottom:6px;">رنگ شاخص اصلی (Gold / Accent Hex):</label>
                                <input type="text" name="sedrazavi_primary_gold" value="<?php echo esc_attr($unified['sedrazavi_primary_gold'] ?? '#D4AF37'); ?>" style="width:100%; direction:ltr; text-align:left;">
                            </div>
                            <div>
                                <label style="display:block; font-weight:bold; margin-bottom:6px;">رنگ پایه دوم (Deep Navy Hex):</label>
                                <input type="text" name="sedrazavi_secondary_navy" value="<?php echo esc_attr($unified['sedrazavi_secondary_navy'] ?? '#0B132B'); ?>" style="width:100%; direction:ltr; text-align:left;">
                            </div>
                            <div>
                                <label style="display:block; font-weight:bold; margin-bottom:6px;">فونت اصلی سامانه:</label>
                                <input type="text" name="sedrazavi_font_family" value="<?php echo esc_attr($unified['sedrazavi_font_family'] ?? 'Vazirmatn'); ?>" style="width:100%;">
                            </div>
                            <div>
                                <label style="display:block; font-weight:bold; margin-bottom:6px;">حالت رنگ پیش‌فرض سامانه (Light / Dark):</label>
                                <?php $cur_mode = $unified['sedrazavi_default_mode'] ?? 'dark'; ?>
                                <select name="sedrazavi_default_mode" style="width:100%;">
                                    <option value="dark" <?php selected($cur_mode, 'dark'); ?>>تاریک لوکس (Obsidian Dark)</option>
                                    <option value="light" <?php selected($cur_mode, 'light'); ?>>روشن رسمی (Alabaster Light)</option>
                                </select>
                            </div>
                        </div>

                        <div style="margin-top: 16px; padding: 12px 16px; border-radius: 10px; background: #f8fafc; border: 1px solid #e2e8f0; font-size: 12px; color: #334155;">
                            <strong>توکن‌های فعال همگام‌سازی‌شده (CSS Variables &amp; Elementor Global Kit):</strong>
                            <code style="direction:ltr; display:inline-block; margin-inline-start:6px;">--uas-accent-color: <?php echo esc_html($unified['sedrazavi_primary_gold'] ?? '#D4AF37'); ?></code>
                            <code style="direction:ltr; display:inline-block; margin-inline-start:6px;">--uas-secondary-color: <?php echo esc_html($unified['sedrazavi_secondary_navy'] ?? '#0B132B'); ?></code>
                            <code style="direction:ltr; display:inline-block; margin-inline-start:6px;">--uas-font-family: <?php echo esc_html($unified['sedrazavi_font_family'] ?? 'Vazirmatn'); ?></code>
                        </div>

                        <div style="margin-top: 24px;">
                            <button type="submit" class="button button-primary button-large" style="border-radius: 8px;">ذخیره و همگام‌سازی پالت و کیت المنتور</button>
                        </div>
                    </div>

                <!-- TAB 4: INTEGRATIONS -->
                <?php elseif ($active_tab === 'integrations'): ?>
                    <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
                        <!-- تنظیمات پیامک -->
                        <div>
                            <h3 style="margin-top:0; font-size: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">📱 اتصال پیامک و OTP ایرانی</h3>
                            <table class="form-table" style="margin-top: 0;">
                                <tr>
                                    <th>سرویس پیامک:</th>
                                    <td>
                                        <select name="sedrazavi_sms_provider" style="width: 100%;">
                                            <option value="ippanel" <?php selected($unified['sedrazavi_sms_provider'] ?? 'ippanel', 'ippanel'); ?>>IPPanel (فراز اس‌ام‌اس، لیمو، مکث)</option>
                                            <option value="kavenegar" <?php selected($unified['sedrazavi_sms_provider'] ?? '', 'kavenegar'); ?>>کاوه‌نگار (Kavenegar)</option>
                                            <option value="ghasedak" <?php selected($unified['sedrazavi_sms_provider'] ?? '', 'ghasedak'); ?>>قاصدک (Ghasedak)</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>کلید وب‌سرویس (API Key):</th>
                                    <td>
                                        <input type="password" name="sedrazavi_sms_api_key" value="<?php echo esc_attr($unified['sedrazavi_sms_api_key'] ?? ''); ?>" style="width: 100%;" placeholder="کلید دسترسی پیامک">
                                    </td>
                                </tr>
                                <tr>
                                    <th>کد الگو / پترن احراز هویت:</th>
                                    <td>
                                        <input type="text" name="sedrazavi_sms_otp_pattern" value="<?php echo esc_attr($unified['sedrazavi_sms_otp_pattern'] ?? 'otp-auth'); ?>" style="width: 100%;">
                                    </td>
                                </tr>
                                <tr>
                                    <th>شماره خط ارسال‌کننده (Originator):</th>
                                    <td>
                                        <input type="text" name="sedrazavi_sms_originator" value="<?php echo esc_attr($unified['sedrazavi_sms_originator'] ?? ''); ?>" style="width: 100%; direction:ltr; text-align:left;" placeholder="3000505">
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <!-- تنظیمات درگاه شتاب -->
                        <div>
                            <h3 style="margin-top:0; font-size: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">💳 درگاه‌های پرداخت شتابی</h3>
                            <table class="form-table" style="margin-top: 0;">
                                <tr>
                                    <th>درگاه پرداخت فعال:</th>
                                    <td>
                                        <select name="sedrazavi_shetab_gateway" style="width: 100%;">
                                            <option value="zarinpal" <?php selected($unified['sedrazavi_shetab_gateway'] ?? 'zarinpal', 'zarinpal'); ?>>زرین‌پال (ZarinPal)</option>
                                            <option value="idpay" <?php selected($unified['sedrazavi_shetab_gateway'] ?? '', 'idpay'); ?>>آیدی‌پِی (IDPay)</option>
                                            <option value="nextpay" <?php selected($unified['sedrazavi_shetab_gateway'] ?? '', 'nextpay'); ?>>نکست‌پِی (NextPay)</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>مرچنت‌کد / API Key:</th>
                                    <td>
                                        <input type="password" name="sedrazavi_shetab_merchant_id" value="<?php echo esc_attr($unified['sedrazavi_shetab_merchant_id'] ?? ''); ?>" style="width: 100%;" placeholder="کد درگاه شاپرک (همگام با زرین‌پال)">
                                    </td>
                                </tr>
                                <tr>
                                    <th>حالت سندباکس (تست):</th>
                                    <td>
                                        <label>
                                            <input type="checkbox" name="sedrazavi_shetab_sandbox" value="yes" <?php checked($unified['sedrazavi_shetab_sandbox'] ?? 'no', 'yes'); ?>>
                                            فعال‌سازی پرداخت آزمایشی (بدون کسر وجه)
                                        </label>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div style="margin-top: 20px;">
                        <button type="submit" class="button button-primary button-large" style="border-radius: 8px;">ذخیره تنظیمات اتصالات ایرانی</button>
                    </div>

                <!-- TAB 5: CLOUD TEMPLATES (REAL WP_AJAX QUEUE PERSISTENCE) -->
                <?php elseif ($active_tab === 'cloud'): ?>
                    <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
                            <div>
                                <h3 style="margin: 0; font-size: 16px;">کاتالوگ ابری مخزن گیت‌هاب (Cloud Template Hub)</h3>
                                <p style="font-size: 12px; color: #64748b; margin: 4px 0 0;">اتصال به مخزن <code>Aqamirrazavi/Sedrazavi-WPtemplate</code> و ثبت صف استقرار واقعی در دیتابیس (<code>sr_cloud_queued_templates</code>).</p>
                            </div>
                            <span id="sr-cloud-queued-badge" style="padding: 4px 10px; background: #ecfdf5; color: #059669; border-radius: 6px; font-size: 11px; font-weight: bold;">
                                الگوهای ثبت‌شده در صف: <?php echo esc_html((string) count($queued_cloud)); ?>
                            </span>
                        </div>

                        <div id="sr-cloud-template-feedback" role="status" aria-live="polite" style="display:none; margin-bottom:16px; padding:12px 16px; border-radius:10px; background:#ecfdf5; color:#065f46; border:1px solid #10b981; font-size:13px; font-weight:600;"></div>

                        <?php
                        $cloud_catalog = [
                            [
                                'id'    => 'sr_cloud_glass_header',
                                'title' => 'هدر شیشه‌ای شناور (Glassmorphism Header)',
                                'desc'  => 'قالب اختصاصی هدر مات سازگار با المنتور و گوتنبرگ.',
                            ],
                            [
                                'id'    => 'sr_cloud_bento_hero',
                                'title' => 'هیرو بنتو گرید HUD (Agency Bento Hero)',
                                'desc'  => 'سکشن هیروی چندکاره برای آژانس‌های تبلیغاتی، حقوقی و طراحان وب.',
                            ],
                            [
                                'id'    => 'sr_cloud_agency_footer',
                                'title' => 'فوتر مدرن چندستونه و اینماد (Agency Footer)',
                                'desc'  => 'فوتر کامل به همراه جایگاه نمادهای الکترونیکی و فرم خبرنامه.',
                            ],
                        ];
                        ?>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                            <?php foreach ($cloud_catalog as $tpl):
                                $is_queued = isset($queued_cloud[$tpl['id']]);
                            ?>
                                <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; background: #f8fafc;">
                                    <h4 style="margin: 0 0 6px;"><?php echo esc_html($tpl['title']); ?></h4>
                                    <p style="font-size: 12px; color: #64748b; margin: 0 0 12px;"><?php echo esc_html($tpl['desc']); ?></p>
                                    <button
                                        type="button"
                                        class="button <?php echo $is_queued ? 'button-primary' : 'button-secondary'; ?> sr-cloud-insert-btn"
                                        data-template-id="<?php echo esc_attr($tpl['id']); ?>"
                                        data-title="<?php echo esc_attr($tpl['title']); ?>"
                                        style="border-radius: 6px; width: 100%;"
                                    >
                                        <?php echo $is_queued ? '✓ ثبت‌شده در صف کتابخانه (ثبت مجدد)' : 'درج در صف کتابخانه المنتور'; ?>
                                    </button>
                                </div>
                            <?php endforeach; ?>
                        </div>
                        <script>
                        document.addEventListener('DOMContentLoaded', function() {
                            var fb = document.getElementById('sr-cloud-template-feedback');
                            var badge = document.getElementById('sr-cloud-queued-badge');
                            var endpoint = (typeof ajaxurl !== 'undefined' && ajaxurl) ? ajaxurl : '<?php echo esc_js(admin_url('admin-ajax.php')); ?>';
                            var adminNonce = '<?php echo esc_js($admin_ajax_nonce); ?>';

                            document.querySelectorAll('.sr-cloud-insert-btn').forEach(function(btn) {
                                btn.addEventListener('click', function() {
                                    var tplId = btn.getAttribute('data-template-id') || '';
                                    var tplTitle = btn.getAttribute('data-title') || '';
                                    var origText = btn.textContent;
                                    btn.disabled = true;
                                    btn.textContent = 'در حال ثبت در دیتابیس...';

                                    var formData = new FormData();
                                    formData.append('action', 'sr_admin_queue_cloud_template');
                                    formData.append('nonce', adminNonce);
                                    formData.append('template_id', tplId);
                                    formData.append('title', tplTitle);

                                    fetch(endpoint, { method: 'POST', credentials: 'same-origin', body: formData })
                                        .then(function(r) { return r.json(); })
                                        .then(function(res) {
                                            btn.disabled = false;
                                            if (res && res.success) {
                                                btn.textContent = '✓ ثبت‌شده در صف کتابخانه (wp_options)';
                                                btn.classList.remove('button-secondary');
                                                btn.classList.add('button-primary');
                                                if (fb) {
                                                    fb.style.background = '#ecfdf5';
                                                    fb.style.borderColor = '#10b981';
                                                    fb.style.color = '#065f46';
                                                    fb.textContent = '✓ ' + (res.data && res.data.message ? res.data.message : 'ثبت شد.');
                                                    fb.style.display = 'block';
                                                }
                                                if (badge && res.data && typeof res.data.total !== 'undefined') {
                                                    badge.textContent = 'الگوهای ثبت‌شده در صف: ' + res.data.total;
                                                }
                                            } else {
                                                btn.textContent = origText;
                                                if (fb) {
                                                    fb.style.background = '#fef2f2';
                                                    fb.style.borderColor = '#ef4444';
                                                    fb.style.color = '#991b1b';
                                                    fb.textContent = (res && res.data && res.data.message) ? res.data.message : 'خطا در ثبت الگوی ابری.';
                                                    fb.style.display = 'block';
                                                }
                                            }
                                        })
                                        .catch(function() {
                                            btn.disabled = false;
                                            btn.textContent = origText;
                                            if (fb) {
                                                fb.style.background = '#fef2f2';
                                                fb.style.borderColor = '#ef4444';
                                                fb.style.color = '#991b1b';
                                                fb.textContent = 'خطای ارتباط با سرور هنگام ثبت الگوی ابری.';
                                                fb.style.display = 'block';
                                            }
                                        });
                                });
                            });
                        });
                        </script>
                    </div>

                <!-- TAB 6: ECOSYSTEM PLUGINS, DEPLOYED KITS & ROLE MATRIX -->
                <?php elseif ($active_tab === 'ecosystem'): ?>
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
                            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px;">
                                <div>
                                    <h3 style="margin:0; font-size:16px;">🧩 هاب افزونه‌های اکوسیستم (نصب، فعال/غیرفعال و Rollback)</h3>
                                    <p style="margin:4px 0 0; font-size:12px; color:#64748b;">کنترل یکپارچه بین پیشخوان ادمین و پیشخوان فرانت‌اند با بکاپ پیش از جایگزینی و اعتبارسنجی Zip Slip / SHA-256.</p>
                                </div>
                            </div>

                            <div id="sr-admin-ecosystem-feedback" role="status" aria-live="polite" style="display:none; margin-bottom:16px; padding:12px 16px; border-radius:10px; font-size:13px; font-weight:600;"></div>

                            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:16px;">
                                <?php foreach ($plugins_inventory as $pkg):
                                    $is_installed = !empty($pkg['installed']);
                                    $is_active    = !empty($pkg['active']);
                                    $has_backup   = !empty($pkg['has_backup']);
                                    $can_toggle   = ($pkg['slug'] !== 'sedrazavi-companion');
                                ?>
                                    <div class="sr-admin-pkg-card" data-plugin-slug="<?php echo esc_attr($pkg['slug']); ?>" style="border:1px solid #e2e8f0; border-radius:12px; padding:16px; background:#f8fafc;">
                                        <h4 style="margin:0 0 6px; font-size:14px;"><?php echo esc_html($pkg['name']); ?></h4>
                                        <p style="margin:0 0 10px; font-size:12px; color:#64748b;"><?php echo esc_html($pkg['desc']); ?></p>
                                        <div style="margin-bottom:10px; font-size:12px;">
                                            <strong>وضعیت:</strong>
                                            <?php if ($is_active): ?>
                                                <span style="color:#059669; font-weight:bold;">فعال<?php echo !empty($pkg['version']) ? ' (v' . esc_html($pkg['version']) . ')' : ''; ?></span>
                                            <?php elseif ($is_installed): ?>
                                                <span style="color:#d97706; font-weight:bold;">نصب‌شده (غیرفعال)</span>
                                            <?php else: ?>
                                                <span style="color:#64748b;">نصب‌نشده</span>
                                            <?php endif; ?>
                                        </div>
                                        <?php if ($can_toggle): ?>
                                            <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:10px;">
                                                <input type="url" class="sr-admin-remote-url" placeholder="HTTPS URL مجاز گیت‌هاب (اختیاری)" style="width:100%; font-size:12px;">
                                                <input type="text" class="sr-admin-sha256" maxlength="64" placeholder="SHA-256 Digest ۶۴ کاراکتری (اختیاری)" style="width:100%; font-size:12px;">
                                            </div>
                                            <div style="display:flex; flex-wrap:wrap; gap:6px;">
                                                <?php if ($is_installed): ?>
                                                    <button type="button" class="button button-secondary sr-admin-pkg-action" data-action="toggle" data-slug="<?php echo esc_attr($pkg['slug']); ?>">
                                                        <?php echo $is_active ? 'غیرفعال‌سازی' : 'فعال‌سازی'; ?>
                                                    </button>
                                                <?php endif; ?>
                                                <button type="button" class="button button-primary sr-admin-pkg-action" data-action="install" data-slug="<?php echo esc_attr($pkg['slug']); ?>">
                                                    <?php echo $is_installed ? 'به‌روزرسانی با بکاپ' : 'نصب و فعال‌سازی'; ?>
                                                </button>
                                                <?php if ($has_backup): ?>
                                                    <button type="button" class="button sr-admin-pkg-action" data-action="rollback" data-slug="<?php echo esc_attr($pkg['slug']); ?>" style="color:#b91c1c; border-color:#fca5a5;">
                                                        Rollback به نسخه قبل
                                                    </button>
                                                <?php endif; ?>
                                            </div>
                                        <?php else: ?>
                                            <span style="font-size:11.5px; color:#059669;">افزونه هسته فعال است</span>
                                        <?php endif; ?>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>

                        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
                            <h3 style="margin-top:0; font-size:16px;">📦 کیت‌های سایت مستقرشده در دیتابیس (sr_cockpit_deployed_kits)</h3>
                            <?php if (empty($deployed_kits)): ?>
                                <p style="font-size:13px; color:#64748b; margin:0;">تاکنون هیچ کیت سایت سفارشی در این وردپرس مستقر نشده است.</p>
                            <?php else: ?>
                                <table class="widefat striped">
                                    <thead>
                                        <tr>
                                            <th>نام کیت</th>
                                            <th>Slug</th>
                                            <th>اجزای بسته</th>
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
                            <?php endif; ?>
                        </div>

                        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
                            <h3 style="margin-top:0; font-size:16px;">🔐 ماتریس تفکیک نقش‌ها و دسترسی پرونده‌های حقوقی</h3>
                            <table class="widefat striped">
                                <thead>
                                    <tr>
                                        <th>نقش (Role)</th>
                                        <th>عنوان</th>
                                        <th>دسترسی پرونده‌های حقوقی (sedrazavi_case)</th>
                                        <th>محتوا و CPT عمومی</th>
                                        <th>هاب سیستم و افزونه‌ها</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($role_matrix as $row): ?>
                                        <tr>
                                            <td><code><?php echo esc_html($row['role'] ?? ''); ?></code></td>
                                            <td><strong><?php echo esc_html($row['title'] ?? ''); ?></strong></td>
                                            <td><?php echo esc_html($row['legal_cases'] ?? ''); ?></td>
                                            <td><?php echo esc_html($row['public_cpt'] ?? ''); ?></td>
                                            <td><?php echo esc_html($row['system_hub'] ?? ''); ?></td>
                                        </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        var ecoFb = document.getElementById('sr-admin-ecosystem-feedback');
                        var endpoint = (typeof ajaxurl !== 'undefined' && ajaxurl) ? ajaxurl : '<?php echo esc_js(admin_url('admin-ajax.php')); ?>';
                        var adminNonce = '<?php echo esc_js($admin_ajax_nonce); ?>';

                        document.querySelectorAll('.sr-admin-pkg-action').forEach(function(btn) {
                            btn.addEventListener('click', function() {
                                var slug = btn.getAttribute('data-slug') || '';
                                var pkgAction = btn.getAttribute('data-action') || 'toggle';
                                var card = btn.closest('.sr-admin-pkg-card');
                                var remoteInput = card ? card.querySelector('.sr-admin-remote-url') : null;
                                var shaInput = card ? card.querySelector('.sr-admin-sha256') : null;
                                var origText = btn.textContent;

                                btn.disabled = true;
                                btn.textContent = 'در حال اجرا...';

                                var formData = new FormData();
                                formData.append('action', 'sr_admin_plugin_action');
                                formData.append('nonce', adminNonce);
                                formData.append('plugin_slug', slug);
                                formData.append('plugin_action', pkgAction);
                                if (remoteInput && remoteInput.value) {
                                    formData.append('remote_url', remoteInput.value.trim());
                                }
                                if (shaInput && shaInput.value) {
                                    formData.append('expected_sha256', shaInput.value.trim());
                                }

                                fetch(endpoint, { method: 'POST', credentials: 'same-origin', body: formData })
                                    .then(function(r) { return r.json(); })
                                    .then(function(res) {
                                        btn.disabled = false;
                                        btn.textContent = origText;
                                        if (ecoFb) {
                                            ecoFb.style.display = 'block';
                                            if (res && res.success) {
                                                ecoFb.style.background = '#ecfdf5';
                                                ecoFb.style.border = '1px solid #10b981';
                                                ecoFb.style.color = '#065f46';
                                                ecoFb.textContent = (res.data && res.data.message) ? res.data.message : 'عملیات انجام شد.';
                                                setTimeout(function() { window.location.reload(); }, 900);
                                            } else {
                                                ecoFb.style.background = '#fef2f2';
                                                ecoFb.style.border = '1px solid #ef4444';
                                                ecoFb.style.color = '#991b1b';
                                                ecoFb.textContent = (res && res.data && res.data.message) ? res.data.message : 'خطا در اجرای عملیات افزونه.';
                                            }
                                        }
                                    })
                                    .catch(function() {
                                        btn.disabled = false;
                                        btn.textContent = origText;
                                        if (ecoFb) {
                                            ecoFb.style.display = 'block';
                                            ecoFb.style.background = '#fef2f2';
                                            ecoFb.style.border = '1px solid #ef4444';
                                            ecoFb.style.color = '#991b1b';
                                            ecoFb.textContent = 'خطای شبکه هنگام اجرای عملیات افزونه.';
                                        }
                                    });
                            });
                        });
                    });
                    </script>
                <?php endif; ?>

            </form>
        </div>
        <?php
    }
}
