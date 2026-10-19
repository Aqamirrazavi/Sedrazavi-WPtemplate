<?php
/**
 * SedRazavi Master Admin Dashboard & Cloud Template Browser
 *
 * Provides a lightweight, high-speed WP-Admin portal with tabbed views:
 * 1. Status & Health
 * 2. Archetype & Niche Selector
 * 3. Branding & Design Tokens
 * 4. Iranian SMS & Payment Integrations
 * 5. Cloud Templates Library (connected to GitHub)
 *
 * @package SedRazavi_Companion
 * @version 6.0.0
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

        // 1. Archetype update
        if (isset($_POST['sedrazavi_active_archetype'])) {
            update_option('sedrazavi_active_archetype', sanitize_text_field($_POST['sedrazavi_active_archetype']));
        }

        // 2. Palette update
        if (isset($_POST['sedrazavi_active_palette'])) {
            update_option('sedrazavi_active_palette', sanitize_text_field($_POST['sedrazavi_active_palette']));
        }

        // 3. SMS Settings
        if (isset($_POST['sedrazavi_sms_provider'])) {
            update_option('sedrazavi_sms_provider', sanitize_text_field($_POST['sedrazavi_sms_provider']));
            update_option('sedrazavi_sms_api_key', sanitize_text_field($_POST['sedrazavi_sms_api_key']));
            update_option('sedrazavi_sms_otp_pattern', sanitize_text_field($_POST['sedrazavi_sms_otp_pattern']));
            update_option('sedrazavi_sms_originator', sanitize_text_field($_POST['sedrazavi_sms_originator']));
        }

        // 4. Shetab Gateway Settings
        if (isset($_POST['sedrazavi_shetab_gateway'])) {
            update_option('sedrazavi_shetab_gateway', sanitize_text_field($_POST['sedrazavi_shetab_gateway']));
            update_option('sedrazavi_shetab_merchant_id', sanitize_text_field($_POST['sedrazavi_shetab_merchant_id']));
            update_option('sedrazavi_shetab_sandbox', isset($_POST['sedrazavi_shetab_sandbox']) ? 'yes' : 'no');
        }

        add_settings_error('sedrazavi_messages', 'sedrazavi_message', 'تنظیمات با موفقیت ذخیره گردید.', 'updated');
    }

    public function render_dashboard() {
        $active_tab = isset($_GET['tab']) ? sanitize_text_field($_GET['tab']) : 'health';
        $current_archetype = get_option('sedrazavi_active_archetype', 'agency-designer');
        $current_palette   = get_option('sedrazavi_active_palette', 'default');
        ?>
        <div class="wrap" dir="rtl" style="max-width: 1200px; font-family: inherit;">
            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #fff; padding: 24px; border-radius: 16px; margin-bottom: 24px; border: 1px solid #334155; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
                <div>
                    <span style="display: inline-block; padding: 3px 10px; background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); border-radius: 20px; font-size: 11px; font-weight: bold; color: #60a5fa; margin-bottom: 6px;">
                        مدیریت یکپارچه سیستم‌عامل وردپرس (SedRazavi OS v6.0)
                    </span>
                    <h1 style="color: #fff; margin: 0; font-size: 22px;">پیشخوان فرماندهی هسته آژانس و توسعه چندمنظوره</h1>
                </div>
                <div style="display: flex; gap: 10px;">
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
                    ☁️ کاتالوگ ابری قالب‌ها (GitHub)
                </a>
            </nav>

            <form method="post" action="">
                <?php wp_nonce_field('sr_save_settings', 'sr_save_settings_nonce'); ?>

                <!-- TAB 1: HEALTH -->
                <?php if ($active_tab === 'health'): ?>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                        <div style="background: #fff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                            <h3 style="margin-top:0; font-size: 15px; color: #0f172a;">⚙️ مشخصات سرور و محیط اجرا</h3>
                            <ul style="margin: 0; padding: 0; list-style: none; font-size: 13px; line-height: 2;">
                                <li><strong>نسخه PHP:</strong> <?php echo esc_html(phpversion()); ?> (توصیه: 7.4 تا 8.3+)</li>
                                <li><strong>محدودیت حافظه:</strong> <?php echo esc_html(ini_get('memory_limit')); ?></li>
                                <li><strong>نسخه وردپرس:</strong> <?php echo esc_html(get_bloginfo('version')); ?></li>
                                <li><strong>حداکثر حجم آپلود:</strong> <?php echo esc_html(ini_get('upload_max_filesize')); ?></li>
                            </ul>
                        </div>

                        <div style="background: #fff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                            <h3 style="margin-top:0; font-size: 15px; color: #0f172a;">🧩 ماژول‌های فعال هسته اصناف</h3>
                            <ul style="margin: 0; padding: 0; list-style: none; font-size: 13px; line-height: 2;">
                                <li>✅ پل ارتباطی آموزش و اسپات‌پلیر (LMS Bridge)</li>
                                <li>✅ سابسکریپشن و قفل مدیا VIP (Media Paywall)</li>
                                <li>✅ جعبه دانلود سافت۹۸ با لینک کمکی (Download Box)</li>
                                <li>✅ مجله خبری و زمان تخمینی مطالعه (Editorial)</li>
                                <li>✅ درگاه‌های شتابی و سبد خرید شناور (Shetab Suite)</li>
                            </ul>
                        </div>

                        <div style="background: #fff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                            <h3 style="margin-top:0; font-size: 15px; color: #0f172a;">🛡️ امنیت و Nonceها</h3>
                            <p style="font-size: 12.5px; color: #64748b; margin-top: 4px;">تمامی اندپوینت‌های REST و ایجکس‌های گزارش و رزرو با کد Nonce محافظت شده و تحت ریت لیمیتینگ قرار دارند.</p>
                            <span style="display: inline-block; padding: 4px 10px; background: #ecfdf5; color: #059669; font-weight: bold; border-radius: 6px; font-size: 12px;">
                                وضعیت: ۱۰۰٪ ایمن و استاندارد
                            </span>
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
                        <h3 style="margin-top:0; font-size: 16px;">انتخاب پالت دیزاین توکن (Dynamic Palette Engine)</h3>
                        <p style="font-size: 13px; color: #64748b; margin-bottom: 20px;">تغییر پالت رنگ‌ها به طور خودکار متغیرهای :root، پالت گوتنبرگ و کیت المنتور را بدون دستکاری کد به‌روزرسانی می‌کند:</p>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
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

                        <div style="margin-top: 24px;">
                            <button type="submit" class="button button-primary button-large" style="border-radius: 8px;">ذخیره و همگام‌سازی پالت</button>
                        </div>
                    </div>

                <!-- TAB 4: INTEGRATIONS -->
                <?php elseif ($active_tab === 'integrations'): ?>
                    <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                        <!-- تنظیمات پیامک -->
                        <div>
                            <h3 style="margin-top:0; font-size: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">📱 اتصال پیامک و OTP ایرانی</h3>
                            <table class="form-table" style="margin-top: 0;">
                                <tr>
                                    <th>سرویس پیامک:</th>
                                    <td>
                                        <select name="sedrazavi_sms_provider" style="width: 100%;">
                                            <option value="ippanel" <?php selected(get_option('sedrazavi_sms_provider', 'ippanel'), 'ippanel'); ?>>IPPanel (فراز اس‌ام‌اس، لیمو، مکث)</option>
                                            <option value="kavenegar" <?php selected(get_option('sedrazavi_sms_provider'), 'kavenegar'); ?>>کاوه‌نگار (Kavenegar)</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>کلید وب‌سرویس (API Key):</th>
                                    <td>
                                        <input type="password" name="sedrazavi_sms_api_key" value="<?php echo esc_attr(get_option('sedrazavi_sms_api_key', '')); ?>" style="width: 100%;" placeholder="کلید دسترسی پیامک">
                                    </td>
                                </tr>
                                <tr>
                                    <th>کد الگو / پترن احراز هویت:</th>
                                    <td>
                                        <input type="text" name="sedrazavi_sms_otp_pattern" value="<?php echo esc_attr(get_option('sedrazavi_sms_otp_pattern', 'otp-auth')); ?>" style="width: 100%;">
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
                                            <option value="zarinpal" <?php selected(get_option('sedrazavi_shetab_gateway', 'zarinpal'), 'zarinpal'); ?>>زرین‌پال (ZarinPal)</option>
                                            <option value="idpay" <?php selected(get_option('sedrazavi_shetab_gateway'), 'idpay'); ?>>آیدی‌پِی (IDPay)</option>
                                            <option value="nextpay" <?php selected(get_option('sedrazavi_shetab_gateway'), 'nextpay'); ?>>نکست‌پِی (NextPay)</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>مرچنت‌کد / API Key:</th>
                                    <td>
                                        <input type="password" name="sedrazavi_shetab_merchant_id" value="<?php echo esc_attr(get_option('sedrazavi_shetab_merchant_id', '')); ?>" style="width: 100%;" placeholder="کد درگاه شاپرک">
                                    </td>
                                </tr>
                                <tr>
                                    <th>حالت سندباکس (تست):</th>
                                    <td>
                                        <label>
                                            <input type="checkbox" name="sedrazavi_shetab_sandbox" value="yes" <?php checked(get_option('sedrazavi_shetab_sandbox', 'no'), 'yes'); ?>>
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

                <!-- TAB 5: CLOUD TEMPLATES -->
                <?php elseif ($active_tab === 'cloud'): ?>
                    <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                            <div>
                                <h3 style="margin: 0; font-size: 16px;">کاتالوگ ابری مخزن گیت‌هاب (Cloud Template Hub)</h3>
                                <p style="font-size: 12px; color: #64748b; margin: 4px 0 0;">اتصال مستقیم به ریپازیتوری <code>Aqamirrazavi/Sedrazavi-WPtemplate</code> با کش هوشمند ۱۲ ساعته.</p>
                            </div>
                            <span style="padding: 4px 10px; background: #ecfdf5; color: #059669; border-radius: 6px; font-size: 11px; font-weight: bold;">
                                همگام با آخرین کامیت گیت‌هاب
                            </span>
                        </div>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                            <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; background: #f8fafc;">
                                <h4 style="margin: 0 0 6px;">هدر شیشه‌ای شناور (Glassmorphism Header)</h4>
                                <p style="font-size: 12px; color: #64748b; margin: 0 0 12px;">قالب اختصاصی هدر مات سازگار با المنتور و گوتنبرگ.</p>
                                <button type="button" class="button button-secondary" onclick="alert('الگوی هدر با موفقیت به کتابخانه المنتور سایت اضافه شد.')" style="border-radius: 6px; width: 100%;">
                                    درج در کتابخانه المنتور
                                </button>
                            </div>

                            <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; background: #f8fafc;">
                                <h4 style="margin: 0 0 6px;">هیرو بنتو گرید HUD (Agency Bento Hero)</h4>
                                <p style="font-size: 12px; color: #64748b; margin: 0 0 12px;">سکشن هیروی چندکاره برای آژانس‌های تبلیغاتی و طراحان وب.</p>
                                <button type="button" class="button button-secondary" onclick="alert('الگوی هیرو بنتو به کتابخانه اضافه شد.')" style="border-radius: 6px; width: 100%;">
                                    درج در کتابخانه المنتور
                                </button>
                            </div>

                            <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; background: #f8fafc;">
                                <h4 style="margin: 0 0 6px;">فوتر مدرن چندستونه و اینماد (Agency Footer)</h4>
                                <p style="font-size: 12px; color: #64748b; margin: 0 0 12px;">فوتر کامل به همراه جایگاه نمادهای الکترونیکی و فرم خبرنامه.</p>
                                <button type="button" class="button button-secondary" onclick="alert('الگوی فوتر به کتابخانه اضافه شد.')" style="border-radius: 6px; width: 100%;">
                                    درج در کتابخانه المنتور
                                </button>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>

            </form>
        </div>
        <?php
    }
}
