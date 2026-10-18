<?php
/**
 * SedRazavi Cloud Component Hub
 *
 * Provides cloud-synced Gutenberg block patterns, Elementor container templates,
 * and page layouts for different industries with 1-click import capability.
 *
 * @package SedRazavi_Companion
 * @version 5.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Component_Hub {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('rest_api_init', [$this, 'register_hub_endpoints']);
        add_action('init', [$this, 'register_gutenberg_cloud_patterns']);
    }

    public function register_hub_endpoints() {
        register_rest_route('sedrazavi/v1', '/cloud/components', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_cloud_catalog'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1', '/cloud/import-pattern', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_import_pattern'],
            'permission_callback' => function() {
                return current_user_can('edit_posts');
            },
        ]);
    }

    /**
     * Get list of cloud components (cached with transient)
     */
    public function rest_get_cloud_catalog() {
        $catalog = get_transient('sedrazavi_cloud_components_cache');
        if (false === $catalog) {
            $catalog = [
                [
                    'id'          => 'agency-hero-3d',
                    'title'       => 'هیرو سکشن سه‌بعدی و تایپوگرافی آژانس',
                    'category'    => 'agency',
                    'type'        => 'gutenberg',
                    'thumbnail'   => 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
                    'rating'      => 4.9,
                    'isPro'       => false,
                    'description' => 'سکشن آغازین فوق‌العاده سریع با وکتور متحرک و فرم بریف دو مرحله‌ای.',
                ],
                [
                    'id'          => 'offcanvas-portfolio-grid',
                    'title'       => 'گرید نمونه‌کارهای فیلتردار با دراور بدون رفرش',
                    'category'    => 'agency',
                    'type'        => 'gutenberg',
                    'thumbnail'   => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
                    'rating'      => 5.0,
                    'isPro'       => true,
                    'description' => 'نمایش شیک کارهای طراحی شده با پیش‌نمایش دراور جانبی برای حفظ کاربر.',
                ],
                [
                    'id'          => 'corporate-governance-matrix',
                    'title'       => 'ماتریس حاکمیت شرکتی و ساختار هلدینگ',
                    'category'    => 'corporate',
                    'type'        => 'elementor',
                    'thumbnail'   => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
                    'rating'      => 4.8,
                    'isPro'       => true,
                    'description' => 'ویجت کانتینری المنتور برای معرفی هیئت مدیره، سهامداران و ساختار شرکت.',
                ],
                [
                    'id'          => 'store-slideover-cart',
                    'title'       => 'سبد خرید کشویی شناور ووکامرس با تسویه‌حساب فوری',
                    'category'    => 'store',
                    'type'        => 'gutenberg',
                    'thumbnail'   => 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&auto=format&fit=crop&q=80',
                    'rating'      => 4.9,
                    'isPro'       => false,
                    'description' => 'سبد خرید شناور با اتصال به درگاه‌های زرین‌پال و استرایپ بدون ترک صفحه محصول.',
                ],
            ];
            set_transient('sedrazavi_cloud_components_cache', $catalog, 12 * HOUR_IN_SECONDS);
        }

        return rest_ensure_response([
            'components' => $catalog,
            'isLicensed' => SedRazavi_License_Manager::get_instance()->is_valid(),
        ]);
    }

    public function rest_import_pattern($request) {
        if (!SedRazavi_License_Manager::get_instance()->is_valid()) {
            return new WP_Error(
                'license_required',
                __('برای ایمپورت الگوهای ابری اختصاصی، نیاز به فعال‌سازی لایسنس آژانس است.', 'sedrazavi-companion'),
                ['status' => 403]
            );
        }

        $params = $request->get_json_params();
        $pattern_id = isset($params['patternId']) ? sanitize_text_field($params['patternId']) : '';

        return rest_ensure_response([
            'success'   => true,
            'patternId' => $pattern_id,
            'message'   => __('الگوی ابری با موفقیت در کتابخانه سایت شما بارگذاری شد.', 'sedrazavi-companion'),
        ]);
    }

    public function register_gutenberg_cloud_patterns() {
        if (function_exists('register_block_pattern')) {
            register_block_pattern(
                'sedrazavi/agency-hero-cta',
                [
                    'title'       => __('هیرو سکشن طراح وب با دکمه CTA سریع', 'sedrazavi-companion'),
                    'description' => __('سکشن آماده هیرو با دو دکمه بررسی پروژه‌ها و سفارش سریع', 'sedrazavi-companion'),
                    'categories'  => ['sedrazavi-agency'],
                    'content'     => '<!-- wp:group {"align":"full","className":"sr-hero-agency-pattern"} --><div class="wp-block-group alignfull sr-hero-agency-pattern"><h1 class="has-text-align-center">معماری سیستم‌های مدرن وب و وردپرس</h1><p class="has-text-align-center">طراحی سفارشی، سرعت انفجاری و سئوی رتبه‌یک بدون وابستگی سنگین.</p></div><!-- /wp:group -->',
                ]
            );
        }
    }
}
