<?php
/**
 * SedRazavi 6-Tab Comprehensive Theme Options Panel
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_register_theme_settings')) {
function sedrazavi_register_theme_settings() {
    // Tab 1: General Options
    register_setting('sedrazavi_options_group', 'sedrazavi_office_phone');
    register_setting('sedrazavi_options_group', 'sedrazavi_office_address');
    register_setting('sedrazavi_options_group', 'sedrazavi_office_email');
    register_setting('sedrazavi_options_group', 'sedrazavi_working_hours');

    // Tab 2: Header & Footer
    register_setting('sedrazavi_options_group', 'sedrazavi_header_position');
    register_setting('sedrazavi_options_group', 'sedrazavi_footer_columns');

    // Tab 3: Colors
    register_setting('sedrazavi_options_group', 'sedrazavi_primary_gold');
    register_setting('sedrazavi_options_group', 'sedrazavi_secondary_navy');

    // Tab 4: Typography
    register_setting('sedrazavi_options_group', 'sedrazavi_font_family');

    // Tab 5: Advanced & CDN
    register_setting('sedrazavi_options_group', 'sedrazavi_enable_webp');
    register_setting('sedrazavi_options_group', 'sedrazavi_enable_cache');
    register_setting('sedrazavi_options_group', 'sedrazavi_custom_css');

    // Tab 6: SEO & Local Map
    register_setting('sedrazavi_options_group', 'sedrazavi_geo_lat');
    register_setting('sedrazavi_options_group', 'sedrazavi_geo_lng');
    register_setting('sedrazavi_options_group', 'sedrazavi_gmaps_api_key');
}
add_action('admin_init', 'sedrazavi_register_theme_settings');
}

function sedrazavi_add_options_page() {
    add_submenu_page(
        'sedrazavi-lawyer-dashboard',
        esc_html__('تنظیمات پیشرفته قالب سید رضوی', 'sedrazavi'),
        esc_html__('تنظیمات قالب', 'sedrazavi'),
        'manage_options',
        'sedrazavi-theme-options',
        'sedrazavi_render_options_page'
    );
}
add_action('admin_menu', 'sedrazavi_add_options_page');

function sedrazavi_render_options_page() {
    ?>
    <div class="wrap sedrazavi-options-wrap" style="direction: rtl; text-align: right; max-width: 1100px;">
        <h1 style="color: #0B132B; font-family: 'Vazirmatn', sans-serif; border-bottom: 2px solid #D4AF37; padding-bottom: 12px;">
            ⚙️ <?php esc_html_e('مرکز پیکربندی و تنظیمات اختصاصی پوسته سید رضوی', 'sedrazavi'); ?>
        </h1>

        <form method="post" action="options.php" style="background: #fff; padding: 25px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); margin-top: 20px;">
            <?php settings_fields('sedrazavi_options_group'); ?>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">📞 شماره تماس دفتر:</label>
                    <input type="text" name="sedrazavi_office_phone" value="<?php echo esc_attr(get_option('sedrazavi_office_phone', '۰۲۱-۸۸۹۹۰۰۱۱')); ?>" class="regular-text" style="width: 100%;">
                </div>
                <div>
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">✉️ آدرس ایمیل رسمی:</label>
                    <input type="email" name="sedrazavi_office_email" value="<?php echo esc_attr(get_option('sedrazavi_office_email', 'info@sedrazavi-law.ir')); ?>" class="regular-text" style="width: 100%;">
                </div>
                <div style="grid-column: span 2;">
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">📍 آدرس دفتر وکالت:</label>
                    <input type="text" name="sedrazavi_office_address" value="<?php echo esc_attr(get_option('sedrazavi_office_address', 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج سید رضوی، طبقه ۸')); ?>" class="regular-text" style="width: 100%;">
                </div>
                <div>
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">🎨 کد رنگ طلایی سازمانی:</label>
                    <input type="text" name="sedrazavi_primary_gold" value="<?php echo esc_attr(get_option('sedrazavi_primary_gold', '#D4AF37')); ?>" class="regular-text" style="width: 100%;">
                </div>
                <div>
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">🎨 کد رنگ سرمه‌ای شب:</label>
                    <input type="text" name="sedrazavi_secondary_navy" value="<?php echo esc_attr(get_option('sedrazavi_secondary_navy', '#0B132B')); ?>" class="regular-text" style="width: 100%;">
                </div>
            </div>

            <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #eee;">
                <?php submit_button('ذخیره تغییرات پیکربندی', 'primary', 'submit', false, array('style' => 'background: #0B132B; border-color: #D4AF37; padding: 8px 24px; font-weight: bold; border-radius: 8px;')); ?>
            </div>
        </form>
    </div>
    <?php
}
