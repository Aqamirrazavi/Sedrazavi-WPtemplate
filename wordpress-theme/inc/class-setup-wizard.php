<?php
/**
 * SedRazavi 30-Second Quick Setup Wizard
 *
 * Provides a streamlined onboarding experience in the WordPress Admin for
 * configuring site archetype, color palette, vector background, and initial pages.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Setup_Wizard {

    public static function init() {
        add_action('admin_menu', [__CLASS__, 'register_admin_page']);
        add_action('admin_post_sedrazavi_save_wizard', [__CLASS__, 'handle_save_wizard']);
    }

    public static function register_admin_page() {
        add_theme_page(
            'راه‌اندازی سریع پوسته SedRazavi',
            '⚡ راه‌اندازی سریع (۳۰ ثانیه)',
            'manage_options',
            'sedrazavi-quick-wizard',
            [__CLASS__, 'render_wizard_page']
        );
    }

    public static function render_wizard_page() {
        $current_preset  = get_option('sedrazavi_site_preset', 'lawyer');
        $current_palette = get_option('sedrazavi_palette_id', 'royal-navy-gold');
        $current_vector  = get_option('sedrazavi_vector_bg', 'geometric-islamic');
        ?>
        <div class="wrap sedrazavi-wizard-wrap" style="max-width: 900px; margin: 30px auto; font-family: Vazirmatn, Tahoma, sans-serif; direction: rtl; text-align: right;">
            <div style="background: linear-gradient(135deg, #070D1E, #0B132B); color: #fff; padding: 30px; border-radius: 20px; border: 1px solid rgba(212, 175, 55, 0.4); margin-bottom: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <span style="background: rgba(212, 175, 55, 0.2); color: #F3E5AB; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: bold; border: 1px solid rgba(212, 175, 55, 0.3);">⚡ جادوی راه‌اندازی سریع</span>
                <h1 style="color: #fff; font-size: 26px; margin: 15px 0 10px; font-weight: 800;">ویزارد راه‌اندازی و سفارشی‌سازی ۳۰ ثانیه‌ای</h1>
                <p style="color: #cbd5e1; font-size: 13px; line-height: 1.8; margin: 0;">
                    با مشخص کردن صنف سایت، پالت رنگی و وکتور پس‌زمینه، هویت کل سایت، منوها، المان‌ها و استایل‌ها به صورت آنی پیکربندی خواهند شد.
                </p>
            </div>

            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" style="background: #fff; padding: 30px; border-radius: 20px; border: 1px solid #e2e8f0; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <?php wp_nonce_field('sedrazavi_wizard_nonce', '_wizard_nonce'); ?>
                <input type="hidden" name="action" value="sedrazavi_save_wizard">

                <!-- Step 1: Industry Selection -->
                <div style="margin-bottom: 30px;">
                    <h3 style="font-size: 16px; font-weight: bold; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-bottom: 15px;">
                        گام ۱: انتخاب صنف و نوع کسب‌وکار
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        <label style="border: 2px solid <?php echo $current_preset === 'lawyer' ? '#D4AF37' : '#e2e8f0'; ?>; padding: 15px; border-radius: 15px; cursor: pointer; display: block;">
                            <input type="radio" name="site_preset" value="lawyer" <?php checked($current_preset, 'lawyer'); ?> style="margin-left: 8px;">
                            <strong>⚖️ دفتر وکالت و حقوقی</strong>
                            <p style="font-size: 11px; color: #64748b; margin: 5px 0 0;">محاسبه‌گر دعاوی، پرونده‌ها و رزرو وقت</p>
                        </label>

                        <label style="border: 2px solid <?php echo $current_preset === 'web_agency' ? '#6366F1' : '#e2e8f0'; ?>; padding: 15px; border-radius: 15px; cursor: pointer; display: block;">
                            <input type="radio" name="site_preset" value="web_agency" <?php checked($current_preset, 'web_agency'); ?> style="margin-left: 8px;">
                            <strong>💻 طراح سایت و گوتنبرگ</strong>
                            <p style="font-size: 11px; color: #64748b; margin: 5px 0 0;">۱۳ سکشن لندینگ، نمونه‌کار و بریف آنلاین</p>
                        </label>

                        <label style="border: 2px solid <?php echo $current_preset === 'ecommerce' ? '#10B981' : '#e2e8f0'; ?>; padding: 15px; border-radius: 15px; cursor: pointer; display: block;">
                            <input type="radio" name="site_preset" value="ecommerce" <?php checked($current_preset, 'ecommerce'); ?> style="margin-left: 8px;">
                            <strong>🛍️ فروشگاه آنلاین ووکامرس</strong>
                            <p style="font-size: 11px; color: #64748b; margin: 5px 0 0;">کاتالوگ کالا، سبد کشویی و درگاه پرداخت</p>
                        </label>

                        <label style="border: 2px solid <?php echo $current_preset === 'video_media' ? '#F59E0B' : '#e2e8f0'; ?>; padding: 15px; border-radius: 15px; cursor: pointer; display: block;">
                            <input type="radio" name="site_preset" value="video_media" <?php checked($current_preset, 'video_media'); ?> style="margin-left: 8px;">
                            <strong>🎬 مرکز رسانه و ویدئو</strong>
                            <p style="font-size: 11px; color: #64748b; margin: 5px 0 0;">پلیر ویدیویی، پلی‌لیست و دانلود فایل</p>
                        </label>
                    </div>
                </div>

                <!-- Step 2: Color Palette Selection -->
                <div style="margin-bottom: 30px;">
                    <h3 style="font-size: 16px; font-weight: bold; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-bottom: 15px;">
                        گام ۲: انتخاب پالت رنگی اصلی
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        <label style="border: 2px solid <?php echo $current_palette === 'royal-navy-gold' ? '#D4AF37' : '#e2e8f0'; ?>; padding: 12px; border-radius: 12px; cursor: pointer;">
                            <input type="radio" name="palette_id" value="royal-navy-gold" <?php checked($current_palette, 'royal-navy-gold'); ?> style="margin-left: 6px;">
                            <span>👑 سرمه‌ای و طلایی سلطنتی</span>
                        </label>
                        <label style="border: 2px solid <?php echo $current_palette === 'tech-indigo' ? '#6366F1' : '#e2e8f0'; ?>; padding: 12px; border-radius: 12px; cursor: pointer;">
                            <input type="radio" name="palette_id" value="tech-indigo" <?php checked($current_palette, 'tech-indigo'); ?> style="margin-left: 6px;">
                            <span>⚡ نیلی و بنفش سایبر</span>
                        </label>
                        <label style="border: 2px solid <?php echo $current_palette === 'emerald-clean' ? '#10B981' : '#e2e8f0'; ?>; padding: 12px; border-radius: 12px; cursor: pointer;">
                            <input type="radio" name="palette_id" value="emerald-clean" <?php checked($current_palette, 'emerald-clean'); ?> style="margin-left: 6px;">
                            <span>🌿 سبز زمردی و پاک</span>
                        </label>
                        <label style="border: 2px solid <?php echo $current_palette === 'github-dark' ? '#58A6FF' : '#e2e8f0'; ?>; padding: 12px; border-radius: 12px; cursor: pointer;">
                            <input type="radio" name="palette_id" value="github-dark" <?php checked($current_palette, 'github-dark'); ?> style="margin-left: 6px;">
                            <span>🐙 گیت‌هاب پرایمر دارک</span>
                        </label>
                    </div>
                </div>

                <!-- Step 3: Vector Background Selection -->
                <div style="margin-bottom: 30px;">
                    <h3 style="font-size: 16px; font-weight: bold; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-bottom: 15px;">
                        گام ۳: وکتور پس‌زمینه
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        <label style="border: 1px solid #e2e8f0; padding: 10px; border-radius: 10px; cursor: pointer;">
                            <input type="radio" name="vector_bg" value="geometric-islamic" <?php checked($current_vector, 'geometric-islamic'); ?> style="margin-left: 6px;">
                            <span>⚜️ نقوش اسلیمی و تذهیب هندسی</span>
                        </label>
                        <label style="border: 1px solid #e2e8f0; padding: 10px; border-radius: 10px; cursor: pointer;">
                            <input type="radio" name="vector_bg" value="digital-circuits" <?php checked($current_vector, 'digital-circuits'); ?> style="margin-left: 6px;">
                            <span>🌐 خطوط مداری و انتزاعی دیجیتال</span>
                        </label>
                        <label style="border: 1px solid #e2e8f0; padding: 10px; border-radius: 10px; cursor: pointer;">
                            <input type="radio" name="vector_bg" value="matrix-dots" <?php checked($current_vector, 'matrix-dots'); ?> style="margin-left: 6px;">
                            <span>✨ ذرات کانتور و ماتریکس</span>
                        </label>
                    </div>
                </div>

                <!-- Submit Button -->
                <div style="text-align: left; border-top: 1px solid #f1f5f9; padding-top: 20px;">
                    <button type="submit" style="background: #D4AF37; color: #070D1E; border: none; padding: 12px 30px; font-size: 14px; font-weight: bold; border-radius: 12px; cursor: pointer; box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);">
                        ذخیره تنظیمات و پرتاب وب‌سایت 🚀
                    </button>
                </div>
            </form>
        </div>
        <?php
    }

    public static function handle_save_wizard() {
        check_admin_referer('sedrazavi_wizard_nonce', '_wizard_nonce');

        if (!current_user_can('manage_options')) {
            wp_die('دسترسی غیرمجاز است.');
        }

        $preset  = sanitize_key($_POST['site_preset'] ?? 'lawyer');
        $palette = sanitize_key($_POST['palette_id'] ?? 'royal-navy-gold');
        $vector  = sanitize_key($_POST['vector_bg'] ?? 'geometric-islamic');

        update_option('sedrazavi_site_preset', $preset);
        update_option('sedrazavi_palette_id', $palette);
        update_option('sedrazavi_vector_bg', $vector);

        // Also run idempotent demo page setup
        if (class_exists('SedRazavi_Demo_Importer')) {
            SedRazavi_Demo_Importer::import_for_preset($preset);
        }

        wp_redirect(add_query_arg(['page' => 'sedrazavi-quick-wizard', 'saved' => '1'], admin_url('themes.php')));
        exit;
    }
}

SedRazavi_Setup_Wizard::init();
