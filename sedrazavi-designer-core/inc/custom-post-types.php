<?php
/**
 * Custom Post Types for SedRazavi Designer Core
 *
 * Registers portfolio and services CPTs with 100% Elementor editor support.
 *
 * @package SedRazavi_Designer_Core
 * @version 1.0.0
 */

namespace SedRazaviDesignerCore;

if (!defined('ABSPATH')) {
    exit;
}

class Custom_Post_Types {
    public static function init() {
        add_action('init', [__CLASS__, 'register_cpts']);
        add_action('init', [__CLASS__, 'add_elementor_support']);
        add_action('init', [__CLASS__, 'register_cpt_meta_fields']);
        add_action('add_meta_boxes', [__CLASS__, 'register_meta_boxes']);
        add_action('save_post', [__CLASS__, 'save_meta_boxes'], 10, 2);
    }

    public static function register_cpts() {
        // 1. Portfolio CPT
        register_post_type('portfolio', [
            'labels' => [
                'name'               => __('نمونه‌کارها', 'sedrazavi-designer-core'),
                'singular_name'      => __('نمونه‌کار', 'sedrazavi-designer-core'),
                'add_new'            => __('افزودن نمونه‌کار جدید', 'sedrazavi-designer-core'),
                'add_new_item'       => __('افزودن نمونه‌کار', 'sedrazavi-designer-core'),
                'edit_item'          => __('ویرایش نمونه‌کار', 'sedrazavi-designer-core'),
                'view_item'          => __('مشاهده نمونه‌کار', 'sedrazavi-designer-core'),
                'search_items'       => __('جستجوی نمونه‌کارها', 'sedrazavi-designer-core'),
                'not_found'          => __('نمونه‌کاری پیدا نشد', 'sedrazavi-designer-core'),
            ],
            'public'       => true,
            'has_archive'  => true,
            'show_in_rest' => true,
            'menu_icon'    => 'dashicons-portfolio',
            'supports'     => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'elementor'],
            'rewrite'      => ['slug' => 'projects'],
        ]);

        register_taxonomy('portfolio_category', 'portfolio', [
            'labels' => [
                'name'          => __('دسته‌بندی نمونه‌کارها', 'sedrazavi-designer-core'),
                'singular_name' => __('دسته‌بندی نمونه‌کار', 'sedrazavi-designer-core'),
            ],
            'hierarchical' => true,
            'public'       => true,
            'show_in_rest' => true,
            'rewrite'      => ['slug' => 'project-category'],
        ]);

        // 2. Services CPT
        register_post_type('services', [
            'labels' => [
                'name'          => __('خدمات استودیو', 'sedrazavi-designer-core'),
                'singular_name' => __('خدمت', 'sedrazavi-designer-core'),
                'add_new_item'  => __('افزودن خدمت جدید', 'sedrazavi-designer-core'),
                'edit_item'     => __('ویرایش خدمت', 'sedrazavi-designer-core'),
            ],
            'public'       => true,
            'has_archive'  => true,
            'show_in_rest' => true,
            'menu_icon'    => 'dashicons-superhero-alt',
            'supports'     => ['title', 'editor', 'thumbnail', 'excerpt', 'elementor'],
            'rewrite'      => ['slug' => 'all-services'],
        ]);

        // 3. System Configuration CPT (SSOT for Master Config, Snapshots & Version Hash)
        register_post_type('sedrazavi_config', [
            'labels' => [
                'name'          => __('پیکربندی سیستم و اسنپ‌شات‌ها', 'sedrazavi-designer-core'),
                'singular_name' => __('پیکربندی سیستم', 'sedrazavi-designer-core'),
            ],
            'public'       => false,
            'show_ui'      => true,
            'show_in_menu' => false,
            'show_in_rest' => true,
            'supports'     => ['title', 'editor', 'custom-fields', 'revisions'],
            'can_export'   => true,
        ]);
    }

    public static function add_elementor_support() {
        // Ensure Elementor activates on custom post types
        $supported = get_option('elementor_cpt_support', ['post', 'page']);
        $changed = false;
        foreach (['portfolio', 'services'] as $cpt) {
            if (!in_array($cpt, $supported, true)) {
                $supported[] = $cpt;
                $changed = true;
            }
        }
        if ($changed) {
            update_option('elementor_cpt_support', $supported);
        }
    }

    /**
     * Register meta fields for REST API and Elementor Dynamic Tags
     */
    public static function register_cpt_meta_fields() {
        $portfolio_fields = [
            '_sr_portfolio_client'     => 'string',
            '_sr_portfolio_url'        => 'string',
            '_sr_portfolio_tech_stack' => 'string',
            '_sr_portfolio_year'       => 'string',
            '_sr_portfolio_metric'     => 'string',
            '_sr_portfolio_featured'   => 'boolean',
        ];

        foreach ($portfolio_fields as $meta_key => $type) {
            register_post_meta('portfolio', $meta_key, [
                'show_in_rest' => true,
                'single'       => true,
                'type'         => $type,
            ]);
        }

        $service_fields = [
            '_sr_service_price'    => 'string',
            '_sr_service_delivery' => 'string',
            '_sr_service_badge'    => 'string',
            '_sr_service_icon'     => 'string',
            '_sr_service_features' => 'string',
        ];

        foreach ($service_fields as $meta_key => $type) {
            register_post_meta('services', $meta_key, [
                'show_in_rest' => true,
                'single'       => true,
                'type'         => $type,
            ]);
        }
    }

    /**
     * Register meta boxes in WordPress admin
     */
    public static function register_meta_boxes() {
        add_meta_box(
            'sr_portfolio_meta_box',
            __('⚡ مشخصات و شاخص‌های پروژه (استودیو سیدرضوی)', 'sedrazavi-designer-core'),
            [__CLASS__, 'render_portfolio_metabox'],
            'portfolio',
            'normal',
            'high'
        );

        add_meta_box(
            'sr_service_meta_box',
            __('⚡ تعرفه، زمان‌بندی و امکانات خدمت (استودیو سیدرضوی)', 'sedrazavi-designer-core'),
            [__CLASS__, 'render_service_metabox'],
            'services',
            'normal',
            'high'
        );
    }

    /**
     * Render Portfolio Meta Box
     */
    public static function render_portfolio_metabox($post) {
        wp_nonce_field('sr_portfolio_meta_action', 'sr_portfolio_meta_nonce');

        $client     = get_post_meta($post->ID, '_sr_portfolio_client', true);
        $url        = get_post_meta($post->ID, '_sr_portfolio_url', true);
        $tech_stack = get_post_meta($post->ID, '_sr_portfolio_tech_stack', true);
        $year       = get_post_meta($post->ID, '_sr_portfolio_year', true);
        $metric     = get_post_meta($post->ID, '_sr_portfolio_metric', true);
        $featured   = get_post_meta($post->ID, '_sr_portfolio_featured', true);
        ?>
        <style>
            .sr-meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 10px; }
            .sr-meta-field { display: flex; flex-direction: column; gap: 6px; }
            .sr-meta-field.sr-meta-full { grid-column: span 2; }
            .sr-meta-field label { font-weight: 600; color: #1e293b; }
            .sr-meta-field input[type="text"], .sr-meta-field input[type="url"], .sr-meta-field textarea { width: 100%; border-radius: 6px; border: 1px solid #cbd5e1; padding: 8px 10px; }
            .sr-meta-desc { font-size: 11px; color: #64748b; margin-top: 3px; }
        </style>
        <div class="sr-meta-grid" dir="rtl">
            <div class="sr-meta-field">
                <label for="sr_portfolio_client">نام کارفرما یا برند تجاری:</label>
                <input type="text" id="sr_portfolio_client" name="_sr_portfolio_client" value="<?php echo esc_attr($client); ?>" placeholder="مثال: شرکت داده‌پردازی نوین">
                <span class="sr-meta-desc">نام سفارش‌دهنده یا برند پروژه برای نمایش در کارت پروژه.</span>
            </div>

            <div class="sr-meta-field">
                <label for="sr_portfolio_url">نشانی وب‌سایت زنده (Live Demo URL):</label>
                <input type="url" id="sr_portfolio_url" name="_sr_portfolio_url" value="<?php echo esc_url($url); ?>" placeholder="https://example.com" dir="ltr">
                <span class="sr-meta-desc">لینک مستقیم نسخه دمو یا سایت زنده اجرا شده.</span>
            </div>

            <div class="sr-meta-field">
                <label for="sr_portfolio_tech_stack">فناوری‌ها و ابزارهای به‌کاررفته:</label>
                <input type="text" id="sr_portfolio_tech_stack" name="_sr_portfolio_tech_stack" value="<?php echo esc_attr($tech_stack); ?>" placeholder="المنتور پرو، ووکامرس، CSS Grid">
                <span class="sr-meta-desc">فناوری‌ها با ویرگول جدا شوند تا به برچسب‌های نئونی تبدیل شوند.</span>
            </div>

            <div class="sr-meta-field">
                <label for="sr_portfolio_year">سال اجرا یا مدت زمان پیاده‌سازی:</label>
                <input type="text" id="sr_portfolio_year" name="_sr_portfolio_year" value="<?php echo esc_attr($year); ?>" placeholder="۱۴۰۳ • ۵ روز کاری">
            </div>

            <div class="sr-meta-field">
                <label for="sr_portfolio_metric">شاخص موفقیت یا دستاورد کلیدی:</label>
                <input type="text" id="sr_portfolio_metric" name="_sr_portfolio_metric" value="<?php echo esc_attr($metric); ?>" placeholder="مثال: +۲۴٪ نرخ تبدیل یا سرعت لود ۰.۷ ثانیه">
                <span class="sr-meta-desc">نتیجه برجسته کارایی این پروژه برای مشتری.</span>
            </div>

            <div class="sr-meta-field" style="justify-content: center;">
                <label style="cursor: pointer; display: flex; align-items: center; gap: 8px;">
                    <input type="checkbox" name="_sr_portfolio_featured" value="1" <?php checked($featured, '1'); ?>>
                    <strong>نمایش به عنوان پروژه ویژه در ویترین صفحه اصلی</strong>
                </label>
            </div>
        </div>
        <?php
    }

    /**
     * Render Service Meta Box
     */
    public static function render_service_metabox($post) {
        wp_nonce_field('sr_service_meta_action', 'sr_service_meta_nonce');

        $price    = get_post_meta($post->ID, '_sr_service_price', true);
        $delivery = get_post_meta($post->ID, '_sr_service_delivery', true);
        $badge    = get_post_meta($post->ID, '_sr_service_badge', true);
        $icon     = get_post_meta($post->ID, '_sr_service_icon', true);
        $features = get_post_meta($post->ID, '_sr_service_features', true);
        ?>
        <div class="sr-meta-grid" dir="rtl">
            <div class="sr-meta-field">
                <label for="sr_service_price">شروع قیمت تعرفه خدمت:</label>
                <input type="text" id="sr_service_price" name="_sr_service_price" value="<?php echo esc_attr($price); ?>" placeholder="مثال: شروع از ۱۵ میلیون تومان">
            </div>

            <div class="sr-meta-field">
                <label for="sr_service_delivery">زمان تحویل تقریبی:</label>
                <input type="text" id="sr_service_delivery" name="_sr_service_delivery" value="<?php echo esc_attr($delivery); ?>" placeholder="مثال: ۳ الی ۵ روز کاری">
            </div>

            <div class="sr-meta-field">
                <label for="sr_service_badge">نشان یا برچسب ویژه (Badge):</label>
                <input type="text" id="sr_service_badge" name="_sr_service_badge" value="<?php echo esc_attr($badge); ?>" placeholder="مثال: پیشنهاد ویژه معمار یا پرفروش‌ترین">
            </div>

            <div class="sr-meta-field">
                <label for="sr_service_icon">آیکون نئونی یا ایموجی:</label>
                <input type="text" id="sr_service_icon" name="_sr_service_icon" value="<?php echo esc_attr($icon); ?>" placeholder="⚡ یا 🏢 یا 🛒">
            </div>

            <div class="sr-meta-field sr-meta-full">
                <label for="sr_service_features">لیست ویژگی‌ها و دستاوردهای پلن (هر سطر یک مورد):</label>
                <textarea id="sr_service_features" name="_sr_service_features" rows="4" placeholder="طراحی ۱۰۰٪ در المنتور پرو&#10;سرعت لود زیر یک ثانیه&#10;پورتال کارفرما با کد رهگیری"><?php echo esc_textarea($features); ?></textarea>
                <span class="sr-meta-desc">هر خط به صورت یک تیک سبز در کارت خدمت نمایش داده می‌شود.</span>
            </div>
        </div>
        <?php
    }

    /**
     * Save Meta Boxes data securely
     */
    public static function save_meta_boxes($post_id, $post) {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        // Save Portfolio Meta
        if ($post->post_type === 'portfolio' && isset($_POST['sr_portfolio_meta_nonce']) && wp_verify_nonce($_POST['sr_portfolio_meta_nonce'], 'sr_portfolio_meta_action')) {
            $fields = [
                '_sr_portfolio_client'     => 'sanitize_text_field',
                '_sr_portfolio_url'        => 'esc_url_raw',
                '_sr_portfolio_tech_stack' => 'sanitize_text_field',
                '_sr_portfolio_year'       => 'sanitize_text_field',
                '_sr_portfolio_metric'     => 'sanitize_text_field',
            ];

            foreach ($fields as $key => $sanitizer) {
                if (isset($_POST[$key])) {
                    update_post_meta($post_id, $key, call_user_func($sanitizer, $_POST[$key]));
                }
            }

            $featured = isset($_POST['_sr_portfolio_featured']) ? '1' : '0';
            update_post_meta($post_id, '_sr_portfolio_featured', $featured);
        }

        // Save Services Meta
        if ($post->post_type === 'services' && isset($_POST['sr_service_meta_nonce']) && wp_verify_nonce($_POST['sr_service_meta_nonce'], 'sr_service_meta_action')) {
            $fields = [
                '_sr_service_price'    => 'sanitize_text_field',
                '_sr_service_delivery' => 'sanitize_text_field',
                '_sr_service_badge'    => 'sanitize_text_field',
                '_sr_service_icon'     => 'sanitize_text_field',
                '_sr_service_features' => 'sanitize_textarea_field',
            ];

            foreach ($fields as $key => $sanitizer) {
                if (isset($_POST[$key])) {
                    update_post_meta($post_id, $key, call_user_func($sanitizer, $_POST[$key]));
                }
            }
        }
    }
}

Custom_Post_Types::init();
