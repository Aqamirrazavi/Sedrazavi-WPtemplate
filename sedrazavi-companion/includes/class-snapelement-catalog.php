<?php
/**
 * SedRazavi OS - SnapElement Component & Atomic Layout Engine
 * Inspired by SnapElement.com: Zero-dependency unstyled & styled Elementor V3/V4 container blocks
 * with native __globals__ color and typography token inheritance.
 *
 * Location: sedrazavi-companion/includes/class-snapelement-catalog.php
 * @package SedRazavi_Companion
 * @version 6.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_SnapElement_Catalog {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_action('wp_ajax_sedrazavi_snapelement_copy', [$this, 'ajax_copy_component']);
        add_action('wp_ajax_nopriv_sedrazavi_snapelement_copy', [$this, 'ajax_copy_component']);
    }

    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/snapelement/components', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_components'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1', '/snapelement/component/(?P<slug>[a-zA-Z0-9_-]+)', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_component_json'],
            'permission_callback' => '__return_true',
            'args'                => [
                'slug' => [
                    'required'          => true,
                    'sanitize_callback' => 'sanitize_key',
                ],
            ],
        ]);
    }

    /**
     * Component Catalog Registry (SnapElement V3 Container & V4 Atomic layout specifications)
     */
    public function get_catalog() {
        return [
            [
                'id'          => 'snap-hero-cyber-gunslinger',
                'slug'        => 'hero-cyber-gunslinger',
                'title'       => 'هیرو سکشن تکتیکال تفنگ‌دار سایبری (Tactical Gunslinger Hero)',
                'category'    => 'hero',
                'type'        => 'container',
                'engine'      => 'v3_v4_adaptive',
                'description' => 'هیرو سکشن واکنش‌گرا با گره‌چینی پارامتریک، لوگوی تفنگ‌دار SedRazavi، نشانگر زنده در دسترس بودن و دکمه‌های شلیک مستقیم به ایتا و تلگرام.',
                'tags'        => ['hero', 'gunslinger', 'eitaa', 'telegram', 'hud'],
                'globals'     => [
                    'primary'   => 'globals/colors?id=primary',
                    'secondary' => 'globals/colors?id=secondary',
                    'text'      => 'globals/colors?id=text',
                    'accent'    => 'globals/colors?id=accent',
                ],
                'stats'       => ['containers' => 3, 'elements' => 7, 'weight_kb' => 1.8],
            ],
            [
                'id'          => 'snap-bento-skills-matrix',
                'slug'        => 'bento-skills-matrix',
                'title'       => 'شبکه بنتو ماتریس مهارت‌ها و معماری بدون کد (Bento Architecture Grid)',
                'category'    => 'features',
                'type'        => 'container',
                'engine'      => 'v3_v4_adaptive',
                'description' => 'کارت‌های مدرن بنتو گرید با افکت گلس‌مورفیسم، نمودار شتابی تخصص جت‌انجین، سرعت زیر ۱ ثانیه و استانداردهای دوزبانه.',
                'tags'        => ['bento', 'grid', 'features', 'jetengine', 'speed'],
                'globals'     => [
                    'primary' => 'globals/colors?id=primary',
                    'card_bg' => 'globals/colors?id=surface',
                ],
                'stats'       => ['containers' => 4, 'elements' => 12, 'weight_kb' => 2.4],
            ],
            [
                'id'          => 'snap-comparison-speed-slider',
                'slug'        => 'comparison-speed-slider',
                'title'       => 'اسلایدر مقایسه سرعت: وردپرس سنگین در برابر SedRazavi OS (Speed Benchmark Slider)',
                'category'    => 'interactive',
                'type'        => 'container',
                'engine'      => 'v3_v4_adaptive',
                'description' => 'اسلایدر تعاملی مقایسه قبل و بعد: سایت کند با ۲۰ پلاگین غیرضروری (LCP 4.8s) در برابر معماری تمیز بدون کد سید امیر حسین رضوی فردویی (LCP 0.6s).',
                'tags'        => ['comparison', 'before-after', 'benchmark', 'cwv'],
                'globals'     => [
                    'accent' => 'globals/colors?id=accent',
                ],
                'stats'       => ['containers' => 2, 'elements' => 6, 'weight_kb' => 2.1],
            ],
            [
                'id'          => 'snap-tactical-scope-calculator',
                'slug'        => 'tactical-scope-calculator',
                'title'       => 'کانفیگوراتور برآورد زمان، هزینه و ROI پروژه (Tactical Scope & ROI Estimator)',
                'category'    => 'pricing',
                'type'        => 'container',
                'engine'      => 'v3_v4_adaptive',
                'description' => 'محاسبه‌گر پیشرفته پارامتریک ارزش طراحی با قابلیت انتخاب نوع پروژه، سیستم دوزبانه، بهینه‌سازی سرعت و صدور پیش‌فاکتور چاپی A4.',
                'tags'        => ['calculator', 'pricing', 'roi', 'proposal', 'invoice'],
                'globals'     => [
                    'primary' => 'globals/colors?id=primary',
                    'accent'  => 'globals/colors?id=accent',
                ],
                'stats'       => ['containers' => 3, 'elements' => 9, 'weight_kb' => 3.2],
            ],
            [
                'id'          => 'snap-media-facade-player',
                'slug'        => 'media-facade-player',
                'title'       => 'فاساد بهینه پخش ویدیو و صوت بدون افت LCP (Zero-Overhead Media Facade)',
                'category'    => 'media',
                'type'        => 'container',
                'engine'      => 'v3_v4_adaptive',
                'description' => 'بارگذاری تنبل هوشمند برای ویدیوهای آپارات و یوتیوب همراه با پلیر اختصاصی پادکست و ویژوالایزر صوتی (تضمین صفر درخواست مسدودکننده).',
                'tags'        => ['media', 'aparat', 'youtube', 'podcast', 'audio'],
                'globals'     => [
                    'primary' => 'globals/colors?id=primary',
                ],
                'stats'       => ['containers' => 2, 'elements' => 5, 'weight_kb' => 1.9],
            ],
            [
                'id'          => 'snap-verified-lead-inquiry',
                'slug'        => 'verified-lead-inquiry',
                'title'       => 'درگاه استعلام و فرم دوحالته با صف آفلاین (Resilient Offline-First Inquiry)',
                'category'    => 'forms',
                'type'        => 'container',
                'engine'      => 'v3_v4_adaptive',
                'description' => 'فرم استعلام با ذخیره‌سازی آفلاین خودکار در IndexedDB در صورت قطعی اینترنت، تولید توکن پیگیری امن SHA-256 و رادار ادمین.',
                'tags'        => ['form', 'offline-queue', 'tracking', 'lead', 'security'],
                'globals'     => [
                    'primary' => 'globals/colors?id=primary',
                    'accent'  => 'globals/colors?id=accent',
                ],
                'stats'       => ['containers' => 2, 'elements' => 8, 'weight_kb' => 2.6],
            ],
        ];
    }

    /**
     * Generate Elementor Native Copy-Paste Container JSON
     * This format matches Elementor's native internal clipboard structure with __globals__
     */
    public function generate_elementor_clipboard_json($slug) {
        $catalog = $this->get_catalog();
        $target = null;
        foreach ($catalog as $item) {
            if ($item['slug'] === $slug) {
                $target = $item;
                break;
            }
        }

        if (!$target) {
            return false;
        }

        // Construct Elementor V3/V4 container with global style bindings
        $container_data = [
            'id'          => substr(md5($slug . '_cnt'), 0, 7),
            'elType'      => 'container',
            'isInner'     => false,
            'settings'    => [
                'content_width' => 'boxed',
                'boxed_width'   => ['unit' => 'px', 'size' => 1240],
                'padding'       => [
                    'unit'     => 'px',
                    'top'      => '60',
                    'right'    => '24',
                    'bottom'   => '60',
                    'left'     => '24',
                    'isLinked' => false,
                ],
                'background_background' => 'classic',
                '__globals__'           => [
                    'background_color' => 'globals/colors?id=background',
                ],
                '_css_classes'          => 'sr-snap-component sr-' . esc_attr($slug),
            ],
            'elements'    => $this->build_inner_elements_for_slug($slug),
        ];

        return [
            'type'        => 'container',
            'version'     => '0.4',
            'title'       => $target['title'],
            'author'      => 'Seyyed Amir Hossein Razavi Fordoei (SedRazavi)',
            'source'      => 'SnapElement Adaptive Engine - SedRazavi OS',
            'content'     => [$container_data],
        ];
    }

    private function build_inner_elements_for_slug($slug) {
        switch ($slug) {
            case 'hero-cyber-gunslinger':
                return [
                    [
                        'id'       => substr(md5($slug . '_badge'), 0, 7),
                        'elType'   => 'widget',
                        'widgetType' => 'heading',
                        'settings' => [
                            'title'        => 'سریع‌ترین طراح و معمار وردپرس بدون کد',
                            'header_size'  => 'span',
                            '_css_classes' => 'sr-gunslinger-badge text-amber-400 font-semibold',
                            '__globals__'  => ['title_color' => 'globals/colors?id=accent'],
                        ],
                    ],
                    [
                        'id'       => substr(md5($slug . '_title'), 0, 7),
                        'elType'   => 'widget',
                        'widgetType' => 'heading',
                        'settings' => [
                            'title'        => 'شلیک به کندی و کدنویسی بی‌رویه با معماری بومی SedRazavi',
                            'header_size'  => 'h1',
                            '_css_classes' => 'sr-hero-heading text-white font-extrabold text-4xl leading-tight',
                            '__globals__'  => ['title_color' => 'globals/colors?id=primary'],
                        ],
                    ],
                    [
                        'id'       => substr(md5($slug . '_desc'), 0, 7),
                        'elType'   => 'widget',
                        'widgetType' => 'text-editor',
                        'settings' => [
                            'editor'       => '<p>طراحی وب‌سایت‌های سازمانی، پورتفولیوهای لوکس و لندینگ‌پیج‌های پرسرعت بر پایه ترکیب هندسه ایرانی-اسلامی، ترمینال‌های سایبرنتیک و پایداری کامل بدون قطعی اینترنت.</p>',
                            '_css_classes' => 'sr-hero-description text-slate-300 text-lg',
                            '__globals__'  => ['text_color' => 'globals/colors?id=text'],
                        ],
                    ],
                ];
            default:
                return [
                    [
                        'id'       => substr(md5($slug . '_heading'), 0, 7),
                        'elType'   => 'widget',
                        'widgetType' => 'heading',
                        'settings' => [
                            'title'        => esc_html($slug),
                            'header_size'  => 'h2',
                            '__globals__'  => ['title_color' => 'globals/colors?id=primary'],
                        ],
                    ],
                ];
        }
    }

    public function rest_get_components() {
        return rest_ensure_response([
            'success' => true,
            'source'  => 'SnapElement Adaptive Architecture - SedRazavi OS',
            'catalog' => $this->get_catalog(),
        ]);
    }

    public function rest_get_component_json($request) {
        $slug = $request->get_param('slug');
        $clipboard = $this->generate_elementor_clipboard_json($slug);

        if (!$clipboard) {
            return new WP_Error('not_found', __('کامپوننت مورد نظر یافت نشد.', 'sedrazavi-companion'), ['status' => 404]);
        }

        return rest_ensure_response([
            'success'       => true,
            'slug'          => $slug,
            'raw_json'      => $clipboard,
            'clipboard_str' => wp_json_encode($clipboard),
        ]);
    }

    public function ajax_copy_component() {
        check_ajax_referer('sedrazavi_admin_nonce', 'security', false);
        $slug = isset($_REQUEST['slug']) ? sanitize_key($_REQUEST['slug']) : '';
        $data = $this->generate_elementor_clipboard_json($slug);

        if ($data) {
            wp_send_json_success([
                'slug'          => $slug,
                'clipboard_str' => wp_json_encode($data),
                'message'       => __('کد JSON کانتینر المنتور با موفقیت کپی شد! اکنون می‌توانید در بوم المنتور Paste نمایید.', 'sedrazavi-companion'),
            ]);
        } else {
            wp_send_json_error(['message' => __('خطا در تولید کانتینر المنتور', 'sedrazavi-companion')]);
        }
    }
}
