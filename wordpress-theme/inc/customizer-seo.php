<?php
/**
 * SedRazavi Customizer SEO & Branding Controls
 *
 * Provides native WordPress Customizer controls for site logo,
 * Open Graph social share image, lawyer identity, and SEO metadata.
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_customize_seo_register')) {
function sedrazavi_customize_seo_register($wp_customize) {

    // 1. Add Dedicated SEO & Identity Section
    $wp_customize->add_section('sedrazavi_seo_branding_section', array(
        'title'       => esc_html__('سئو، هویت بصری و شبکه‌های اجتماعی (SedRazavi SEO)', 'sedrazavi'),
        'description' => esc_html__('تنظیمات تصویر اشتراک‌گذاری اجتماعی (Open Graph)، لوگوی رسمی دفتر، و متادیتای سئوی محلی و ثنا', 'sedrazavi'),
        'priority'    => 35,
    ));

    // 2. Open Graph & Social Share Image
    $wp_customize->add_setting('sedrazavi_seo_og_image', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
        'transport'         => 'refresh',
    ));
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'sedrazavi_seo_og_image', array(
        'label'       => esc_html__('تصویر اشتراک‌گذاری شبکه‌های اجتماعی (og:image / Twitter Card)', 'sedrazavi'),
        'description' => esc_html__('تصویر استاندارد ۱۲۰۰×۶۳۰ برای نمایش در واتساپ، تلگرام، لینکدین و گوگل. در صورت خالی بودن، اسکرین‌شات رسمی پوسته استفاده می‌شود.', 'sedrazavi'),
        'section'     => 'sedrazavi_seo_branding_section',
        'settings'    => 'sedrazavi_seo_og_image',
    )));

    // 3. Official Law Office Logo
    $wp_customize->add_setting('sedrazavi_seo_logo', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
        'transport'         => 'refresh',
    ));
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'sedrazavi_seo_logo', array(
        'label'       => esc_html__('لوگوی رسمی دفتر وکالت و داوری (Schema Logo)', 'sedrazavi'),
        'description' => esc_html__('لوگوی باکیفیت دفتر جهت درج در اسکیما استراکچردیتای گوگل (LegalService Schema)', 'sedrazavi'),
        'section'     => 'sedrazavi_seo_branding_section',
        'settings'    => 'sedrazavi_seo_logo',
    )));

    // 4. Default Meta Description
    $wp_customize->add_setting('sedrazavi_seo_meta_desc', array(
        'default'           => 'دفتر وکالت و مشاوره حقوقی تخصصی دکتر سیده مریم رضوی، وکیل پایه یک دادگستری و داور کانون مرکز. ارائه خدمات تخصصی دعاوی ملکی، تجاری، سرقفلی و شرکت‌ها.',
        'sanitize_callback' => 'sanitize_textarea_field',
        'transport'         => 'postMessage',
    ));
    $wp_customize->add_control('sedrazavi_seo_meta_desc', array(
        'label'       => esc_html__('توضیحات پیش‌فرض متای سئو (Meta Description)', 'sedrazavi'),
        'section'     => 'sedrazavi_seo_branding_section',
        'type'        => 'textarea',
    ));

    // 5. SEO Keywords
    $wp_customize->add_setting('sedrazavi_seo_keywords', array(
        'default'           => 'وکیل پایه یک دادگستری, دکتر سیده مریم رضوی, وکیل ملکی ونک, داوری تجاری بین المللی, وکیل قراردادها, پیگیری پرونده',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('sedrazavi_seo_keywords', array(
        'label'       => esc_html__('کلمات کلیدی سئو (Meta Keywords)', 'sedrazavi'),
        'section'     => 'sedrazavi_seo_branding_section',
        'type'        => 'text',
    ));

    // 6. Lawyer Full Name
    $wp_customize->add_setting('sedrazavi_seo_lawyer_name', array(
        'default'           => 'دکتر سیده مریم رضوی',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('sedrazavi_seo_lawyer_name', array(
        'label'       => esc_html__('نام و عنوان وکیل سرپرست (Schema Attorney)', 'sedrazavi'),
        'section'     => 'sedrazavi_seo_branding_section',
        'type'        => 'text',
    ));

    // 7. Lawyer Professional Title
    $wp_customize->add_setting('sedrazavi_seo_lawyer_title', array(
        'default'           => 'وکیل پایه یک دادگستری و داور بین‌المللی',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('sedrazavi_seo_lawyer_title', array(
        'label'       => esc_html__('سمت و درجه شغلی وکیل (Job Title)', 'sedrazavi'),
        'section'     => 'sedrazavi_seo_branding_section',
        'type'        => 'text',
    ));

    // 8. Office Phone
    $wp_customize->add_setting('sedrazavi_office_phone', array(
        'default'           => '021-88776655',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('sedrazavi_office_phone', array(
        'label'       => esc_html__('شماره تماس دفتر (Schema Phone)', 'sedrazavi'),
        'section'     => 'sedrazavi_seo_branding_section',
        'type'        => 'text',
    ));

    // 9. Office Address
    $wp_customize->add_setting('sedrazavi_office_address', array(
        'default'           => 'تهران، میدان ونک، خیابان ملاصدرا، پلاک ۴۲، طبقه ۳، واحد ۶',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('sedrazavi_office_address', array(
        'label'       => esc_html__('نشانی پستی دفتر وکالت (Schema Address)', 'sedrazavi'),
        'section'     => 'sedrazavi_seo_branding_section',
        'type'        => 'text',
    ));

    // 10. Lawyer Portrait Photo
    $wp_customize->add_setting('sedrazavi_lawyer_portrait', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
        'transport'         => 'refresh',
    ));
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'sedrazavi_lawyer_portrait', array(
        'label'       => esc_html__('تصویر پرتره رسمی وکیل (Lawyer Portrait)', 'sedrazavi'),
        'description' => esc_html__('تصویر رسمی پرتره وکیل جهت نمایش در هدر و بخش معرفی صفحه اصلی', 'sedrazavi'),
        'section'     => 'sedrazavi_seo_branding_section',
        'settings'    => 'sedrazavi_lawyer_portrait',
    )));
}
add_action('customize_register', 'sedrazavi_customize_seo_register');
}
