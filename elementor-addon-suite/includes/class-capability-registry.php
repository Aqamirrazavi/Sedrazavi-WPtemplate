<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Modular Capability Registry
 *
 * Central registry that tracks, registers, and audits all modular capabilities
 * across the 6-layer architecture (UI, API Contracts, Backend Services, Data Models,
 * Admin Management, and Infrastructure).
 *
 * @package Universal_Elementor_Suite
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */
class Capability_Registry {

    private static $_instance = null;

    /**
     * Array of registered capabilities
     *
     * @var array
     */
    private $capabilities = [];

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        add_action('init', [$this, 'register_core_capabilities'], 5);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
    }

    /**
     * Register core capabilities into the registry
     */
    public function register_core_capabilities() {
        // 1. High-Converting Pricing & Plan Switcher
        $this->register_capability('uas_pricing_switcher', [
            'id'           => 'uas_pricing_switcher',
            'name'         => 'جدول هوشمند قیمت‌گذاری و سوییچر دوره‌ای',
            'description'  => 'ویجت نرخ‌گذاری با امکان سوییچ پرداخت ماهانه و سالانه، تخفیف درصدی و استایل مدرن شیشه‌ای.',
            'category'     => 'landing_elements',
            'package_type' => 'ui',
            'version'      => '6.0.0',
            'author'       => 'Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)',
            'widgets'      => ['uas_pricing_switcher'],
            'blocks'       => ['sedrazavi/pricing-switcher'],
            'shortcodes'   => ['uas_pricing_switcher'],
            'status'       => 'active',
            'portable'     => true,
            'dependencies' => [
                'php'       => '>=7.4',
                'elementor' => '>=3.10',
                'elementor_pro' => false,
            ],
        ]);

        // 2. Psychological FOMO Urgency Countdown
        $this->register_capability('uas_fomo_countdown', [
            'id'           => 'uas_fomo_countdown',
            'name'         => 'شمارش معکوس فوریت و نرخ تبدیل (FOMO Countdown)',
            'description'  => 'شمارنده مهلت ثبت‌نام و تخفیف با ذخیره‌سازی وضعیت کاربر در localStorage و انیمیشن ارقام.',
            'category'     => 'conversion_tools',
            'package_type' => 'ui',
            'version'      => '6.0.0',
            'author'       => 'Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)',
            'widgets'      => ['uas_fomo_countdown'],
            'blocks'       => ['sedrazavi/fomo-countdown'],
            'shortcodes'   => ['uas_fomo_countdown'],
            'status'       => 'active',
            'portable'     => true,
            'dependencies' => [
                'php'       => '>=7.4',
                'elementor' => '>=3.10',
            ],
        ]);

        // 3. Interactive Before / After Image Comparison
        $this->register_capability('uas_before_after', [
            'id'           => 'uas_before_after',
            'name'         => 'اسلایدر تعاملی مقایسه تصویری قبل و بعد',
            'description'  => 'مقایسه دوتایی تصاویر قبل و بعد با پشتیبانی لمسی، هندل اسلاید و بهینه‌سازی بارگذاری.',
            'category'     => 'interactive_media',
            'package_type' => 'ui',
            'version'      => '6.0.0',
            'author'       => 'Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)',
            'widgets'      => ['uas_before_after'],
            'blocks'       => ['sedrazavi/before-after'],
            'shortcodes'   => ['uas_before_after'],
            'status'       => 'active',
            'portable'     => true,
            'dependencies' => [
                'php'       => '>=7.4',
                'elementor' => '>=3.10',
            ],
        ]);

        // 4. Animated Statistics & Counter
        $this->register_capability('uas_stat_counter', [
            'id'           => 'uas_stat_counter',
            'name'         => 'پیشخوان آمار و ارقام انیمیشنی (Animated Counter)',
            'description'  => 'شمارنده روان ارقام و شاخص‌های کلیدی عملکرد با انیمیشن IntersectionObserver و استایل ۳ تبه.',
            'category'     => 'conversion_tools',
            'package_type' => 'ui',
            'version'      => '6.0.0',
            'author'       => 'Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)',
            'widgets'      => ['uas_stat_counter'],
            'blocks'       => ['sedrazavi/stat-counter'],
            'shortcodes'   => ['uas_stat_counter'],
            'status'       => 'active',
            'portable'     => true,
            'dependencies' => [
                'php'       => '>=7.4',
                'elementor' => '>=3.10',
            ],
        ]);

        // 5. Floating Conversion Dock (Floating CTA)
        $this->register_capability('uas_floating_cta', [
            'id'           => 'uas_floating_cta',
            'name'         => 'نوار شناور اقدام فوری و تبدیل لید (Floating CTA Dock)',
            'description'  => 'نوار چسبان بالا/پایین صفحه برای لندینگ‌پیج‌ها با تماس مستقیم، واتساپ و استایل گلس‌مورفیسم.',
            'category'     => 'conversion_tools',
            'package_type' => 'ui',
            'version'      => '6.0.0',
            'author'       => 'Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)',
            'widgets'      => ['uas_floating_cta'],
            'blocks'       => ['sedrazavi/floating-cta'],
            'shortcodes'   => ['uas_floating_cta'],
            'status'       => 'active',
            'portable'     => true,
            'dependencies' => [
                'php'       => '>=7.4',
                'elementor' => '>=3.10',
            ],
        ]);

        // 4. Sovereign 66+ Design Asset Banks
        $this->register_capability('uas_sovereign_asset_banks', [
            'id'           => 'uas_sovereign_asset_banks',
            'name'         => 'بانک جامع دارایی‌های ۶۶گانه مستقل و Zero-CDN',
            'description'  => '۶۶ بک‌گراند وکتور، ۷۲ ویجت، ۶۶ دیوایدر کانتینر، ۶۶ نشان اعتماد، ۶۶ سکشن، ۶۶ موشن، و ۶۶ آیکون SVG خالص.',
            'category'     => 'asset_banks',
            'package_type' => 'full_feature',
            'version'      => '6.0.0',
            'author'       => 'Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)',
            'widgets'      => ['sedrazavi_vector_bg', 'sedrazavi_shape_divider', 'sedrazavi_trust_badge'],
            'blocks'       => ['sedrazavi/sovereign-vector-bg', 'sedrazavi/sovereign-widget', 'sedrazavi/sovereign-divider'],
            'shortcodes'   => ['sedrazavi_vector_bg', 'sedrazavi_widget', 'sedrazavi_section'],
            'rest_routes'  => ['/sedrazavi/v1/widgets-bank', '/sedrazavi/v1/assets-bank', '/sedrazavi/v1/patterns'],
            'status'       => 'active',
            'portable'     => true,
            'dependencies' => [
                'php'       => '>=7.4',
                'wordpress' => '>=6.0',
            ],
        ]);

        // 5. Template Library & Single Importer
        $this->register_capability('uas_template_library', [
            'id'           => 'uas_template_library',
            'name'         => 'کتابخانه الگوهای آماده و موتور درون‌ریزی ایدم‌پوتنت',
            'description'  => '۲۳ الگوی بومی و کانتینری المنتور شامل صفحات لندینگ، تم‌بیلدر (هدر، فوتر، سینگل، آرشیو، 404) و سکشن‌ها.',
            'category'     => 'template_systems',
            'package_type' => 'service',
            'version'      => '6.0.0',
            'author'       => 'Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)',
            'status'       => 'active',
            'portable'     => true,
            'dependencies' => [
                'php'       => '>=7.4',
                'wordpress' => '>=6.0',
                'elementor' => '>=3.10',
            ],
        ]);

        // Allow third-party and custom feature packages to hook and register their capabilities
        do_action('universal_elementor_suite/register_capabilities', $this);
    }

    /**
     * Register a single capability
     *
     * @param string $id
     * @param array $args
     */
    public function register_capability($id, array $args) {
        $defaults = [
            'id'           => $id,
            'name'         => $id,
            'description'  => '',
            'category'     => 'general',
            'package_type' => 'ui', // 'ui', 'service', 'full_feature'
            'version'      => '1.0.0',
            'author'       => 'Universal Elementor Suite',
            'widgets'      => [],
            'blocks'       => [],
            'shortcodes'   => [],
            'rest_routes'  => [],
            'cpt'          => [],
            'taxonomies'   => [],
            'status'       => 'active',
            'portable'     => true,
            'dependencies' => [
                'php'       => '>=7.4',
                'wordpress' => '>=6.0',
                'elementor' => '>=3.10',
                'elementor_pro' => false,
            ],
        ];

        $this->capabilities[$id] = wp_parse_args($args, $defaults);
    }

    /**
     * Get all registered capabilities
     *
     * @return array
     */
    public function get_capabilities() {
        return $this->capabilities;
    }

    /**
     * Get capability by ID
     *
     * @param string $id
     * @return array|null
     */
    public function get_capability($id) {
        return isset($this->capabilities[$id]) ? $this->capabilities[$id] : null;
    }

    /**
     * Check if a capability is active and its dependencies are satisfied
     *
     * @param string $id
     * @return bool
     */
    public function is_active($id) {
        if (!isset($this->capabilities[$id])) {
            return false;
        }

        $cap = $this->capabilities[$id];
        if ($cap['status'] !== 'active') {
            return false;
        }

        // Check PHP version requirement
        if (!empty($cap['dependencies']['php'])) {
            $required_php = ltrim($cap['dependencies']['php'], '>=');
            if (version_compare(PHP_VERSION, $required_php, '<')) {
                return false;
            }
        }

        return true;
    }

    /**
     * Register REST API routes for capability registry
     */
    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/capabilities', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_capabilities'],
            'permission_callback' => [$this, 'check_admin_permission'],
        ]);

        register_rest_route('sedrazavi/v1', '/health-diagnostics', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_health_diagnostics'],
            'permission_callback' => [$this, 'check_admin_permission'],
        ]);
    }

    /**
     * Permission callback for admin routes
     */
    public function check_admin_permission() {
        return current_user_can('manage_options');
    }

    /**
     * REST endpoint: Get full capabilities index
     */
    public function rest_get_capabilities($request) {
        return rest_ensure_response([
            'success'      => true,
            'total'        => count($this->capabilities),
            'capabilities' => array_values($this->capabilities),
        ]);
    }

    /**
     * REST endpoint: Health and diagnostics audit
     */
    public function rest_get_health_diagnostics($request) {
        $elementor_installed = did_action('elementor/loaded') || class_exists('\Elementor\Plugin');
        $elementor_pro_installed = defined('ELEMENTOR_PRO_VERSION');

        return rest_ensure_response([
            'success' => true,
            'timestamp' => current_time('mysql'),
            'environment' => [
                'php_version'       => PHP_VERSION,
                'wordpress_version' => get_bloginfo('version'),
                'elementor_loaded'  => $elementor_installed,
                'elementor_pro'     => $elementor_pro_installed,
                'is_rtl'            => is_rtl(),
                'memory_limit'      => ini_get('memory_limit'),
            ],
            'capabilities_summary' => [
                'total'       => count($this->capabilities),
                'active'      => count(array_filter($this->capabilities, function($c) { return $c['status'] === 'active'; })),
                'portable'    => count(array_filter($this->capabilities, function($c) { return !empty($c['portable']); })),
            ],
        ]);
    }
}
