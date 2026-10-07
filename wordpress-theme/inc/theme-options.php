<?php
/**
 * SedRazavi Comprehensive Theme Options Panel
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_register_theme_settings')) {
    function sedrazavi_register_theme_settings() {
        // بخش ۱: اطلاعات تماس و شناسنامه دفتر
        register_setting('sedrazavi_options_group', 'sedrazavi_office_phone');
        register_setting('sedrazavi_options_group', 'sedrazavi_office_address');
        register_setting('sedrazavi_options_group', 'sedrazavi_office_email');
        register_setting('sedrazavi_options_group', 'sedrazavi_working_hours');

        // بخش ۲: هدر و پانوشت
        register_setting('sedrazavi_options_group', 'sedrazavi_header_position');
        register_setting('sedrazavi_options_group', 'sedrazavi_footer_columns');

        // بخش ۳: رنگ‌بندی و هویت بصری
        register_setting('sedrazavi_options_group', 'sedrazavi_primary_gold');
        register_setting('sedrazavi_options_group', 'sedrazavi_secondary_navy');

        // بخش ۴: تایپوگرافی و فونت
        register_setting('sedrazavi_options_group', 'sedrazavi_font_family');
        register_setting('sedrazavi_options_group', 'sedrazavi_custom_font_css');
        register_setting('sedrazavi_options_group', 'sedrazavi_vector_bg_mode');
        register_setting('sedrazavi_options_group', 'sedrazavi_vector_bg_preset');

        // بخش ۵: بهینه‌سازی سرعت و کش
        register_setting('sedrazavi_options_group', 'sedrazavi_enable_webp');
        register_setting('sedrazavi_options_group', 'sedrazavi_enable_cache');
        register_setting('sedrazavi_options_group', 'sedrazavi_custom_css');

        // بخش ۶: نقشه محلی و سئو
        register_setting('sedrazavi_options_group', 'sedrazavi_geo_lat');
        register_setting('sedrazavi_options_group', 'sedrazavi_geo_lng');
        register_setting('sedrazavi_options_group', 'sedrazavi_gmaps_api_key');
    }
    add_action('admin_init', 'sedrazavi_register_theme_settings');
}

if (!function_exists('sedrazavi_add_options_page')) {
    function sedrazavi_add_options_page() {
        add_submenu_page(
            'sedrazavi-lawyer-dashboard',
            esc_html__('تنظیمات اختصاصی پوسته سید رضوی', 'sedrazavi'),
            esc_html__('تنظیمات قالب', 'sedrazavi'),
            'manage_options',
            'sedrazavi-theme-options',
            'sedrazavi_render_options_page'
        );
    }
    add_action('admin_menu', 'sedrazavi_add_options_page');
}

if (!function_exists('sedrazavi_render_options_page')) {
    function sedrazavi_render_options_page() {
        ?>
        <div class="wrap sedrazavi-options-wrap" style="direction: rtl; text-align: right; max-width: 1100px; margin: 20px auto; font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, Tahoma, sans-serif;">
            
            <!-- Page Header -->
            <div style="background: linear-gradient(135deg, #0B132B 0%, #1C2541 100%); color: #fff; padding: 24px 30px; border-radius: 14px; margin-bottom: 25px; border-right: 5px solid #D4AF37;">
                <h1 style="color: #fff; margin: 0 0 6px 0; font-size: 22px; font-weight: bold;">
                    ⚙️ <?php esc_html_e('مرکز تنظیمات و پیکربندی دفتر وکالت دکتر سید رضوی', 'sedrazavi'); ?>
                </h1>
                <p style="margin: 0; color: #CBD5E1; font-size: 13px;">
                    <?php esc_html_e('تمامی گزینه‌ها دارای توضیحات واضح فارسی هستند تا مدیریت سایت برای کادر اداری و غیرفنی آسان باشد.', 'sedrazavi'); ?>
                </p>
            </div>

            <?php if (isset($_GET['settings-updated']) && $_GET['settings-updated']) : ?>
                <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-right: 4px solid #10B981; color: #065F46; padding: 12px 18px; border-radius: 10px; margin-bottom: 20px; font-weight: bold; font-size: 14px;">
                    ✅ <?php esc_html_e('تنظیمات با موفقیت ذخیره شدند و تغییرات بلافاصله در وب‌سایت اعمال گردید.', 'sedrazavi'); ?>
                </div>
            <?php endif; ?>

            <form method="post" action="options.php" style="display: flex; flex-direction: column; gap: 24px;">
                <?php settings_fields('sedrazavi_options_group'); ?>

                <!-- Group 1: Contact Information -->
                <div style="background: #fff; padding: 24px; border-radius: 14px; box-shadow: 0 3px 12px rgba(0,0,0,0.05); border: 1px solid #E2E8F0;">
                    <h2 style="margin: 0 0 16px 0; color: #0B132B; font-size: 17px; font-weight: bold; border-bottom: 1px solid #F1F5F9; padding-bottom: 10px;">
                        🏢 <?php esc_html_e('۱. اطلاعات تماس و شناسنامه دفتر وکالت', 'sedrazavi'); ?>
                    </h2>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        
                        <!-- Office Phone -->
                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                📞 <?php esc_html_e('شماره تلفن مستقیم دفتر:', 'sedrazavi'); ?>
                            </label>
                            <input type="text" name="sedrazavi_office_phone" value="<?php echo esc_attr(get_option('sedrazavi_office_phone', '۰۲۱-۸۸۹۹۰۰۱۱')); ?>" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px;">
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('این شماره در نوار بالای سایت، فوتر و دکمه تماس فوری تمام صفحات به مراجعین نمایش داده می‌شود.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <!-- Office Email -->
                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                ✉️ <?php esc_html_e('نشانی رایانامه (ایمیل) رسمی دفتر:', 'sedrazavi'); ?>
                            </label>
                            <input type="email" name="sedrazavi_office_email" value="<?php echo esc_attr(get_option('sedrazavi_office_email', 'info@sedrazavi-law.ir')); ?>" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px; direction: ltr; text-align: right;">
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('پیام‌های فرم‌های مشاوره آنلاین و اعلان‌های نوبت‌ها به این آدرس ایمیل ارسال می‌شوند.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <!-- Office Address -->
                        <div style="grid-column: span 2;">
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                📍 <?php esc_html_e('نشانی پستی دفتر وکالت:', 'sedrazavi'); ?>
                            </label>
                            <input type="text" name="sedrazavi_office_address" value="<?php echo esc_attr(get_option('sedrazavi_office_address', 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج سید رضوی، طبقه ۸')); ?>" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px;">
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('آدرس فیزیکی دقیق دفتر جهت راهنمایی موکلین حضوری و استناد ساختاریافته در نقشه‌ها و موتورهای جستجو.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <!-- Working Hours -->
                        <div style="grid-column: span 2;">
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                ⏰ <?php esc_html_e('ساعات پذیرش و پاسخگویی تلفنی:', 'sedrazavi'); ?>
                            </label>
                            <input type="text" name="sedrazavi_working_hours" value="<?php echo esc_attr(get_option('sedrazavi_working_hours', 'شنبه تا چهارشنبه: ۹:۰۰ الی ۱۸:۰۰ | پنجشنبه: ۹:۰۰ الی ۱۳:۰۰')); ?>" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px;">
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('زمان‌بندی فعالیت دفتر که در بخش پاورقی و کارت‌های مشاوره سایت درج می‌شود.', 'sedrazavi'); ?>
                            </p>
                        </div>

                    </div>
                </div>

                <!-- Group 2: Brand Colors & Visual Identity -->
                <div style="background: #fff; padding: 24px; border-radius: 14px; box-shadow: 0 3px 12px rgba(0,0,0,0.05); border: 1px solid #E2E8F0;">
                    <h2 style="margin: 0 0 16px 0; color: #0B132B; font-size: 17px; font-weight: bold; border-bottom: 1px solid #F1F5F9; padding-bottom: 10px;">
                        🎨 <?php esc_html_e('۲. رنگ‌بندی سازمانی و هویت بصری', 'sedrazavi'); ?>
                    </h2>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        
                        <!-- Primary Gold -->
                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                🏆 <?php esc_html_e('کد رنگ طلایی شاخص (Gold):', 'sedrazavi'); ?>
                            </label>
                            <input type="text" name="sedrazavi_primary_gold" value="<?php echo esc_attr(get_option('sedrazavi_primary_gold', '#D4AF37')); ?>" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px; font-family: monospace;">
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('رنگ طلایی لوکس استفاده شده در دکمه‌ها، خطوط تزئینی و نشان‌های افتخار دفتر وکالت.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <!-- Secondary Navy -->
                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                🌌 <?php esc_html_e('کد رنگ سرمه‌ای شب (Deep Navy):', 'sedrazavi'); ?>
                            </label>
                            <input type="text" name="sedrazavi_secondary_navy" value="<?php echo esc_attr(get_option('sedrazavi_secondary_navy', '#0B132B')); ?>" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px; font-family: monospace;">
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('رنگ سرمه‌ای تیره و رسمی برای هدر، فوتر و پس‌زمینه‌های اصلی متون برای تضمین بالاترین کنتراست.', 'sedrazavi'); ?>
                            </p>
                        </div>

                    </div>
                </div>

                <!-- Group 3: Typography & Fonts -->
                <div style="background: #fff; padding: 24px; border-radius: 14px; box-shadow: 0 3px 12px rgba(0,0,0,0.05); border: 1px solid #E2E8F0;">
                    <h2 style="margin: 0 0 16px 0; color: #0B132B; font-size: 17px; font-weight: bold; border-bottom: 1px solid #F1F5F9; padding-bottom: 10px;">
                        🖋️ <?php esc_html_e('۳. تایپوگرافی و جلوه‌های پس‌زمینه', 'sedrazavi'); ?>
                    </h2>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        
                        <!-- Font Family -->
                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                🔤 <?php esc_html_e('نام قلم پیش‌فرض سامانه:', 'sedrazavi'); ?>
                            </label>
                            <input type="text" name="sedrazavi_font_family" value="<?php echo esc_attr(get_option('sedrazavi_font_family', 'Vazirmatn')); ?>" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px;">
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('فونت رسمی سامانه (مانند Vazirmatn، YekanBakh یا Shabnam) که در تمامی بخش‌های سایت اعمال می‌شود.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <!-- Vector Mode -->
                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                🌊 <?php esc_html_e('حالت خطوط وکتور پس‌زمینه:', 'sedrazavi'); ?>
                            </label>
                            <select name="sedrazavi_vector_bg_mode" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px;">
                                <option value="animated" <?php selected(get_option('sedrazavi_vector_bg_mode', 'animated'), 'animated'); ?>><?php esc_html_e('متحرک روان و انیمیشنی (Luxury Mesh Animation)', 'sedrazavi'); ?></option>
                                <option value="static" <?php selected(get_option('sedrazavi_vector_bg_mode', 'animated'), 'static'); ?>><?php esc_html_e('ثابت و رسمی (Static Gold Lines)', 'sedrazavi'); ?></option>
                            </select>
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('تعیین می‌کند که خطوط مواج پس‌زمینه دارای حرکت آرام باشند یا به حالت ایستا نمایش یابند.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <!-- Custom Font CSS -->
                        <div style="grid-column: span 2;">
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                💻 <?php esc_html_e('کدهای @font-face برای فونت‌های اختصاصی (اختیاری):', 'sedrazavi'); ?>
                            </label>
                            <textarea name="sedrazavi_custom_font_css" rows="3" style="width: 100%; font-family: monospace; font-size: 12px; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1;"><?php echo esc_textarea(get_option('sedrazavi_custom_font_css', '')); ?></textarea>
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('در صورتی که می‌خواهید فونت لایسنس‌دار دلخواه بارگذاری نمایید، کدهای فراخوانی woff2 را در این بخش قرار دهید.', 'sedrazavi'); ?>
                            </p>
                        </div>

                    </div>
                </div>

                <!-- Group 4: Layout & Header/Footer -->
                <div style="background: #fff; padding: 24px; border-radius: 14px; box-shadow: 0 3px 12px rgba(0,0,0,0.05); border: 1px solid #E2E8F0;">
                    <h2 style="margin: 0 0 16px 0; color: #0B132B; font-size: 17px; font-weight: bold; border-bottom: 1px solid #F1F5F9; padding-bottom: 10px;">
                        📐 <?php esc_html_e('۴. ساختار سربرگ و پانوشت', 'sedrazavi'); ?>
                    </h2>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                📌 <?php esc_html_e('نحوه نمایش سربرگ (Header):', 'sedrazavi'); ?>
                            </label>
                            <select name="sedrazavi_header_position" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px;">
                                <option value="sticky" <?php selected(get_option('sedrazavi_header_position', 'sticky'), 'sticky'); ?>><?php esc_html_e('چسبان در بالای صفحه (Sticky Header)', 'sedrazavi'); ?></option>
                                <option value="static" <?php selected(get_option('sedrazavi_header_position', 'sticky'), 'static'); ?>><?php esc_html_e('ثابت و معمولی (Static Top)', 'sedrazavi'); ?></option>
                            </select>
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('در حالت چسبان منو و شماره تماس با اسکرول کاربر همیشه در دید باقی می‌ماند.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                📑 <?php esc_html_e('تعداد ستون‌های پانوشت (Footer):', 'sedrazavi'); ?>
                            </label>
                            <select name="sedrazavi_footer_columns" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px;">
                                <option value="4" <?php selected(get_option('sedrazavi_footer_columns', '4'), '4'); ?>><?php esc_html_e('۴ ستونه (استاندارد شرکتی و وکالتی)', 'sedrazavi'); ?></option>
                                <option value="3" <?php selected(get_option('sedrazavi_footer_columns', '4'), '3'); ?>><?php esc_html_e('۳ ستونه (ساده و فشرده)', 'sedrazavi'); ?></option>
                            </select>
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('تقسیم‌بندی ستون‌های فوتر برای لینک‌های سریع، مجوزها و متن کپی‌رایت.', 'sedrazavi'); ?>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Group 5: Local SEO & Map -->
                <div style="background: #fff; padding: 24px; border-radius: 14px; box-shadow: 0 3px 12px rgba(0,0,0,0.05); border: 1px solid #E2E8F0;">
                    <h2 style="margin: 0 0 16px 0; color: #0B132B; font-size: 17px; font-weight: bold; border-bottom: 1px solid #F1F5F9; padding-bottom: 10px;">
                        🗺️ <?php esc_html_e('۵. موقعیت مکانی و سئوی محلی (Local SEO)', 'sedrazavi'); ?>
                    </h2>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                🌐 <?php esc_html_e('عرض جغرافیایی دفتر (Latitude):', 'sedrazavi'); ?>
                            </label>
                            <input type="text" name="sedrazavi_geo_lat" value="<?php echo esc_attr(get_option('sedrazavi_geo_lat', '35.7592')); ?>" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px; direction: ltr; text-align: right;">
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('مختصات نقشه جهت نمایش صحیح در گوگل مپ و اسناد ساختاریافته LegalService.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                🌐 <?php esc_html_e('طول جغرافیایی دفتر (Longitude):', 'sedrazavi'); ?>
                            </label>
                            <input type="text" name="sedrazavi_geo_lng" value="<?php echo esc_attr(get_option('sedrazavi_geo_lng', '51.4116')); ?>" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px; direction: ltr; text-align: right;">
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('مختصات نقشه دفتر وکالت (پیش‌فرض میدان ونک تهران).', 'sedrazavi'); ?>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Group 6: Performance & Custom CSS -->
                <div style="background: #fff; padding: 24px; border-radius: 14px; box-shadow: 0 3px 12px rgba(0,0,0,0.05); border: 1px solid #E2E8F0;">
                    <h2 style="margin: 0 0 16px 0; color: #0B132B; font-size: 17px; font-weight: bold; border-bottom: 1px solid #F1F5F9; padding-bottom: 10px;">
                        ⚡ <?php esc_html_e('۶. بهینه‌سازی سرعت و کدهای اختصاصی', 'sedrazavi'); ?>
                    </h2>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                🚀 <?php esc_html_e('فشرده‌سازی هوشمند تصاویر (WebP):', 'sedrazavi'); ?>
                            </label>
                            <select name="sedrazavi_enable_webp" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px;">
                                <option value="yes" <?php selected(get_option('sedrazavi_enable_webp', 'yes'), 'yes'); ?>><?php esc_html_e('فعال (کاهش چشمگیر حجم فایل‌ها)', 'sedrazavi'); ?></option>
                                <option value="no" <?php selected(get_option('sedrazavi_enable_webp', 'yes'), 'no'); ?>><?php esc_html_e('غیرفعال', 'sedrazavi'); ?></option>
                            </select>
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('تصاویر با فرمت فشرده نسل جدید لود می‌شوند تا سایت برای اینترنت‌های موبایل سریع باز شود.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                💾 <?php esc_html_e('کش مرورگر و پیش‌بارگذاری داده‌ها:', 'sedrazavi'); ?>
                            </label>
                            <select name="sedrazavi_enable_cache" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px;">
                                <option value="yes" <?php selected(get_option('sedrazavi_enable_cache', 'yes'), 'yes'); ?>><?php esc_html_e('فعال (لود آنی در مراجعات بعدی موکلین)', 'sedrazavi'); ?></option>
                                <option value="no" <?php selected(get_option('sedrazavi_enable_cache', 'yes'), 'no'); ?>><?php esc_html_e('غیرفعال', 'sedrazavi'); ?></option>
                            </select>
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('ذخیره منابع ثابت در حافظه موقت مرورگر موکلین جهت باز شدن بدون تاخیر صفحات.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <div style="grid-column: span 2;">
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                💻 <?php esc_html_e('کدهای استایل سفارشی (Custom CSS):', 'sedrazavi'); ?>
                            </label>
                            <textarea name="sedrazavi_custom_css" rows="3" style="width: 100%; font-family: monospace; font-size: 12px; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1;"><?php echo esc_textarea(get_option('sedrazavi_custom_css', '')); ?></textarea>
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('امکان نوشتن کدهای ظاهری خاص بدون تغییر در کدهای اصلی قالب.', 'sedrazavi'); ?>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Submit Button -->
                <div style="background: #fff; padding: 18px 24px; border-radius: 14px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 13px; color: #64748B;">
                        💾 <?php esc_html_e('پس از تغییر گزینه‌ها، روی دکمه ذخیره کلیک کنید.', 'sedrazavi'); ?>
                    </span>
                    <?php submit_button('ذخیره کلیه تنظیمات', 'primary', 'submit', false, array('style' => 'background: #0B132B; border-color: #D4AF37; padding: 10px 32px; font-weight: bold; font-size: 15px; border-radius: 8px; cursor: pointer;')); ?>
                </div>

            </form>
        </div>
        <?php
    }
}
