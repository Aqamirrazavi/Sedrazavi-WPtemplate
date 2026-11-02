<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Modular Capability Package Manager & Dependency Resolver
 *
 * Implements package manifest parsing, dependency verification, compatibility validation,
 * and portable package extraction.
 *
 * @package Universal_Elementor_Suite
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */
class Package_Manager {

    private static $_instance = null;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        add_action('rest_api_init', [$this, 'register_rest_routes']);
    }

    /**
     * Register REST API routes for package management
     */
    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/packages', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_packages'],
            'permission_callback' => [$this, 'check_admin_permission'],
        ]);
    }

    public function check_admin_permission() {
        return current_user_can('manage_options');
    }

    /**
     * Validate a package manifest against current environment
     *
     * @param array $manifest
     * @return array [ 'valid' => bool, 'errors' => array, 'warnings' => array ]
     */
    public function validate_manifest(array $manifest) {
        $errors   = [];
        $warnings = [];

        // Required keys
        $required_keys = ['id', 'name', 'version', 'package_type'];
        foreach ($required_keys as $key) {
            if (empty($manifest[$key])) {
                $errors[] = sprintf('کلید الزامی "%s" در فایل مانیفست پکیج یافت نشد.', $key);
            }
        }

        // Requirements validation
        if (!empty($manifest['requirements'])) {
            $req = $manifest['requirements'];

            // PHP Check
            if (!empty($req['php'])) {
                $min_php = ltrim($req['php'], '>=');
                if (version_compare(PHP_VERSION, $min_php, '<')) {
                    $errors[] = sprintf('نسخه PHP سرور (%s) پایین‌تر از حداقل نیازمندی این بسته (%s) است.', PHP_VERSION, $min_php);
                }
            }

            // WordPress Check
            if (!empty($req['wordpress'])) {
                $min_wp = ltrim($req['wordpress'], '>=');
                $wp_version = get_bloginfo('version');
                if (version_compare($wp_version, $min_wp, '<')) {
                    $errors[] = sprintf('نسخه وردپرس (%s) با این بسته سازگار نیست (نیاز به %s دارد).', $wp_version, $min_wp);
                }
            }

            // Elementor Pro warning
            if (!empty($req['elementor_pro']) && !defined('ELEMENTOR_PRO_VERSION')) {
                $warnings[] = 'این بسته از ویژگی‌های پیشرفته المنتور پرو استفاده می‌کند؛ در نسخه رایگان با فال‌بک کار خواهد کرد.';
            }
        }

        return [
            'valid'    => empty($errors),
            'errors'   => $errors,
            'warnings' => $warnings,
        ];
    }

    /**
     * Get list of all available portable packages
     *
     * @return array
     */
    public function get_portable_packages() {
        return [
            [
                'id'           => 'package-pricing-switcher',
                'name'         => 'بسته مستقل جدول قیمت‌گذاری و پلن سوییچر',
                'package_type' => 'ui',
                'version'      => '6.0.0',
                'description'  => 'جدول نرخ‌گذاری مدرن با سوییچ ماهانه/سالانه قابل نصب بر روی هر سایت وردپرسی.',
                'components'   => [
                    'widget'     => 'uas_pricing_switcher',
                    'block'      => 'sedrazavi/pricing-switcher',
                    'javascript' => 'pricing-switcher.js',
                ],
                'requirements' => [
                    'php'       => '>=7.4',
                    'wordpress' => '>=6.0',
                    'elementor' => '>=3.10',
                ],
                'portable'     => true,
                'status'       => 'installed_active',
            ],
            [
                'id'           => 'package-fomo-countdown',
                'name'         => 'بسته مستقل شمارنده فوریت و نرخ تبدیل (FOMO)',
                'package_type' => 'ui',
                'version'      => '6.0.0',
                'description'  => 'شمارش معکوس تخفیف و پیشنهاد با ذخیره در localStorage کاربر.',
                'components'   => [
                    'widget'     => 'uas_fomo_countdown',
                    'block'      => 'sedrazavi/fomo-countdown',
                    'javascript' => 'fomo-countdown.js',
                ],
                'requirements' => [
                    'php'       => '>=7.4',
                    'wordpress' => '>=6.0',
                    'elementor' => '>=3.10',
                ],
                'portable'     => true,
                'status'       => 'installed_active',
            ],
            [
                'id'           => 'package-before-after',
                'name'         => 'بسته مستقل اسلایدر مقایسه‌ای قبل و بعد',
                'package_type' => 'ui',
                'version'      => '6.0.0',
                'description'  => 'اسلایدر لمسی دوطرفه تصاویر قبل و بعد با کدهای کامپکت بدون جی‌کوئری.',
                'components'   => [
                    'widget'     => 'uas_before_after',
                    'block'      => 'sedrazavi/before-after',
                    'javascript' => 'before-after.js',
                ],
                'requirements' => [
                    'php'       => '>=7.4',
                    'wordpress' => '>=6.0',
                    'elementor' => '>=3.10',
                ],
                'portable'     => true,
                'status'       => 'installed_active',
            ],
            [
                'id'           => 'package-stat-counter',
                'name'         => 'بسته مستقل پیشخوان آمار و ارقام انیمیشنی',
                'package_type' => 'ui',
                'version'      => '6.0.0',
                'description'  => 'شمارنده روان ارقام و دستاوردها بر پایه IntersectionObserver و استایل ۳ تبه.',
                'components'   => [
                    'widget'     => 'uas_stat_counter',
                    'block'      => 'sedrazavi/stat-counter',
                    'javascript' => 'stat-counter.js',
                ],
                'requirements' => [
                    'php'       => '>=7.4',
                    'wordpress' => '>=6.0',
                    'elementor' => '>=3.10',
                ],
                'portable'     => true,
                'status'       => 'installed_active',
            ],
            [
                'id'           => 'package-floating-cta',
                'name'         => 'بسته مستقل نوار شناور و استیکی تبدیل (Floating CTA)',
                'package_type' => 'ui',
                'version'      => '6.0.0',
                'description'  => 'داک چسبان بالای/پایین صفحه با کلید تماس، واتساپ و مشاوره با ترنسپرنسی شیشه‌ای.',
                'components'   => [
                    'widget'     => 'uas_floating_cta',
                    'block'      => 'sedrazavi/floating-cta',
                    'javascript' => 'floating-cta.js',
                ],
                'requirements' => [
                    'php'       => '>=7.4',
                    'wordpress' => '>=6.0',
                    'elementor' => '>=3.10',
                ],
                'portable'     => true,
                'status'       => 'installed_active',
            ],
            [
                'id'           => 'package-sovereign-assets',
                'name'         => 'بسته مستقل دارایی‌های ۶۶گانه طراحی (Zero-CDN)',
                'package_type' => 'full_feature',
                'version'      => '6.0.0',
                'description'  => '۴۰۲ دارایی بصری شامل وکتور بک‌گراند، دیوایدر، آیکون و نشان اعتبار بدون اتصال به شبکه.',
                'components'   => [
                    'vector_backgrounds' => 66,
                    'widgets'            => 72,
                    'shape_dividers'     => 66,
                    'trust_badges'       => 66,
                    'motion_presets'     => 66,
                    'icons'              => 66,
                ],
                'requirements' => [
                    'php'       => '>=7.4',
                    'wordpress' => '>=6.0',
                ],
                'portable'     => true,
                'status'       => 'installed_active',
            ],
            [
                'id'           => 'package-template-vault',
                'name'         => 'بسته الگوهای کانتینری ۲۳گانه المنتور و تم‌بیلدر',
                'package_type' => 'service',
                'version'      => '6.0.0',
                'description'  => 'کتابخانه ۲۳ قالب آماده شامل هدر، فوتر، صفحات اصلی، سینگل، بلاگ و 404.',
                'components'   => [
                    'templates_count' => 23,
                    'importer_engine' => 'Template_Importer',
                ],
                'requirements' => [
                    'php'       => '>=7.4',
                    'wordpress' => '>=6.0',
                    'elementor' => '>=3.10',
                ],
                'portable'     => true,
                'status'       => 'installed_active',
            ],
        ];
    }

    /**
     * REST endpoint: Get packages index
     */
    public function rest_get_packages($request) {
        $packages = $this->get_portable_packages();
        return rest_ensure_response([
            'success'  => true,
            'total'    => count($packages),
            'packages' => $packages,
        ]);
    }
}
