<?php
/**
 * Custom Post Types & Taxonomies
 *
 * @package SedRazavi_Addons
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_addons_register_post_types')) {
    function sedrazavi_addons_register_post_types() {
        
        // ۱. پست‌تایپ خدمات حقوقی تخصصی (Legal Services)
        $service_labels = array(
            'name'                  => esc_html__('خدمات حقوقی', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('خدمت حقوقی', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('خدمات حقوقی', 'sedrazavi-addons'),
            'add_new'               => esc_html__('افزودن خدمت جدید', 'sedrazavi-addons'),
            'add_new_item'          => esc_html__('افزودن خدمت حقوقی جدید', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('ویرایش خدمت', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه خدمات حقوقی', 'sedrazavi-addons'),
            'search_items'          => esc_html__('جستجوی خدمات', 'sedrazavi-addons'),
            'not_found'             => esc_html__('خدمتی یافت نشد', 'sedrazavi-addons'),
        );
        register_post_type('service', array(
            'labels'             => $service_labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-hammer',
            'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            'has_archive'        => true,
            'rewrite'            => array('slug' => 'services'),
            'show_in_rest'       => true,
        ));

        // تاکسونومی دسته‌بندی خدمات حقوقی
        register_taxonomy('service_category', 'service', array(
            'labels'            => array(
                'name'          => esc_html__('دسته‌بندی خدمات', 'sedrazavi-addons'),
                'singular_name' => esc_html__('دسته خدمت', 'sedrazavi-addons'),
            ),
            'hierarchical'      => true,
            'show_ui'           => true,
            'show_admin_column' => true,
            'rewrite'           => array('slug' => 'service-category'),
            'show_in_rest'      => true,
        ));

        // ۲. پست‌تایپ دعاوی و پرونده‌های حقوقی موکلین (Legal Cases)
        $case_labels = array(
            'name'                  => esc_html__('دعاوی و پرونده‌ها', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('پرونده حقوقی', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('پرونده‌های موکلین', 'sedrazavi-addons'),
            'add_new'               => esc_html__('ثبت پرونده جدید', 'sedrazavi-addons'),
            'add_new_item'          => esc_html__('افزودن پرونده جدید', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('ویرایش پرونده', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه پرونده‌ها', 'sedrazavi-addons'),
            'search_items'          => esc_html__('جستجوی پرونده', 'sedrazavi-addons'),
            'not_found'             => esc_html__('پرونده‌ای یافت نشد', 'sedrazavi-addons'),
        );
        register_post_type('sedrazavi_case', array(
            'labels'             => $case_labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-portfolio',
            'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            'has_archive'        => true,
            'rewrite'            => array('slug' => 'cases'),
            'show_in_rest'       => true,
        ));

        register_taxonomy('case_category', 'sedrazavi_case', array(
            'labels'            => array(
                'name'          => esc_html__('حوزه دعاوی', 'sedrazavi-addons'),
                'singular_name' => esc_html__('حوزه دعوی', 'sedrazavi-addons'),
            ),
            'hierarchical'      => true,
            'show_ui'           => true,
            'show_admin_column' => true,
            'rewrite'           => array('slug' => 'case-category'),
            'show_in_rest'      => true,
        ));

        // ۳. پست‌تایپ نظرات و رضایت موکلان (Testimonials)
        $testimonial_labels = array(
            'name'                  => esc_html__('نظرات موکلان', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('نظر موکل', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('نظرات موکلان', 'sedrazavi-addons'),
            'add_new'               => esc_html__('ثبت نظر جدید', 'sedrazavi-addons'),
            'add_new_item'          => esc_html__('افزودن نظر جدید', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('ویرایش نظر', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه نظرات موکلان', 'sedrazavi-addons'),
        );
        register_post_type('testimonial', array(
            'labels'             => $testimonial_labels,
            'public'             => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-format-quote',
            'supports'           => array('title', 'editor', 'thumbnail', 'custom-fields'),
            'has_archive'        => true,
            'rewrite'            => array('slug' => 'testimonials'),
            'show_in_rest'       => true,
        ));

        // ۴. پست‌تایپ ایمیل‌ها و پیام‌های استعلام و رزرو مشاوره (Emails & Consultations)
        $email_labels = array(
            'name'                  => esc_html__('پیام‌ها و استعلام‌ها', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('پیام / استعلام', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('پیام‌های دریافتی', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه پیام‌ها و ایمیل‌ها', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('مشاهده پیام', 'sedrazavi-addons'),
        );
        register_post_type('email', array(
            'labels'             => $email_labels,
            'public'             => false,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-email-alt',
            'supports'           => array('title', 'editor', 'custom-fields'),
            'show_in_rest'       => false,
        ));

        // ۵. پست‌تایپ ویدئوهای حقوقی و آموزشی (Legal Educational Videos)
        $video_labels = array(
            'name'                  => esc_html__('ویدئوهای حقوقی', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('ویدئوی حقوقی', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('ویدئوها و آموزش‌ها', 'sedrazavi-addons'),
            'add_new'               => esc_html__('افزودن ویدئو', 'sedrazavi-addons'),
            'add_new_item'          => esc_html__('افزودن ویدئوی حقوقی جدید', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('ویرایش ویدئو', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه ویدئوها', 'sedrazavi-addons'),
        );
        register_post_type('video', array(
            'labels'             => $video_labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-video-alt3',
            'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            'has_archive'        => true,
            'rewrite'            => array('slug' => 'videos'),
            'show_in_rest'       => true,
        ));

        register_taxonomy('video_category', 'video', array(
            'labels'            => array(
                'name'          => esc_html__('دسته‌بندی ویدئوها', 'sedrazavi-addons'),
                'singular_name' => esc_html__('دسته ویدئو', 'sedrazavi-addons'),
            ),
            'hierarchical'      => true,
            'show_ui'           => true,
            'show_admin_column' => true,
            'rewrite'           => array('slug' => 'video-category'),
            'show_in_rest'      => true,
        ));

        // ۶. پست‌تایپ تیم وکلای همکار و مشاوران (Lawyers Team)
        $lawyer_labels = array(
            'name'                  => esc_html__('تیم وکلا و همکاران', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('وکیل / همکار', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('تیم وکلا', 'sedrazavi-addons'),
            'add_new'               => esc_html__('افزودن همکار جدید', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('ویرایش اطلاعات همکار', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه اعضای تیم و همکاران', 'sedrazavi-addons'),
        );
        register_post_type('sedrazavi_lawyer', array(
            'labels'             => $lawyer_labels,
            'public'             => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-businessman',
            'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            'has_archive'        => true,
            'rewrite'            => array('slug' => 'lawyers'),
            'show_in_rest'       => true,
        ));

        // ۷. پست‌تایپ رسمی نوبت‌های مشاوره و رزرو وقت (Appointments & Consultations)
        $appointment_labels = array(
            'name'                  => esc_html__('نوبت‌های مشاوره', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('نوبت مشاوره', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('رزرو نوبت‌ها', 'sedrazavi-addons'),
            'add_new'               => esc_html__('ثبت نوبت جدید', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('مشاهده نوبت', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه نوبت‌های رزرو', 'sedrazavi-addons'),
        );
        register_post_type('sedrazavi_appointment', array(
            'labels'             => $appointment_labels,
            'public'             => false,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-calendar-alt',
            'supports'           => array('title', 'editor', 'custom-fields'),
            'show_in_rest'       => true,
        ));
        register_post_type('sedrazavi_booking', array(
            'labels'             => $appointment_labels,
            'public'             => false,
            'show_ui'            => false,
            'show_in_menu'       => false,
            'supports'           => array('title', 'editor', 'custom-fields'),
            'show_in_rest'       => true,
        ));
    }
}
add_action('init', 'sedrazavi_addons_register_post_types');
