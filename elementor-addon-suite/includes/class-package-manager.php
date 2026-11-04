<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Modular Capability Package Manager & Standalone ZIP Exporter
 *
 * Implements package manifest parsing, dependency verification, compatibility validation,
 * and one-click standalone ZIP plugin extraction for zero-lockin portability.
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
        add_action('admin_post_uas_download_package', [$this, 'handle_package_download']);
        add_action('wp_ajax_uas_export_package', [$this, 'ajax_export_package']);
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

        register_rest_route('sedrazavi/v1', '/packages/export', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_export_package'],
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
     * Generate and build a standalone portable WordPress plugin ZIP file
     *
     * @param string $package_id
     * @return array [ 'success' => bool, 'zip_path' => string, 'zip_url' => string, 'filename' => string, 'error' => string ]
     */
    public function export_standalone_package($package_id) {
        $packages = $this->get_portable_packages();
        $target_package = null;
        foreach ($packages as $pkg) {
            if ($pkg['id'] === $package_id) {
                $target_package = $pkg;
                break;
            }
        }

        if (!$target_package) {
            return ['success' => false, 'error' => 'بسته مورد نظر در رجیستری پکیج‌ها یافت نشد.'];
        }

        $upload_dir = wp_upload_dir();
        $export_dir = trailingslashit($upload_dir['basedir']) . 'uas-standalone-packages/';
        if (!wp_mkdir_p($export_dir)) {
            return ['success' => false, 'error' => 'امکان ایجاد پوشه خروجی در uploads وجود ندارد.'];
        }

        $clean_slug = sanitize_key($package_id);
        $zip_filename = $clean_slug . '-standalone-v' . $target_package['version'] . '.zip';
        $zip_filepath = $export_dir . $zip_filename;
        $zip_fileurl  = trailingslashit($upload_dir['baseurl']) . 'uas-standalone-packages/' . $zip_filename;

        // If ZipArchive is available, construct the package archive
        if (class_exists('\ZipArchive')) {
            $zip = new \ZipArchive();
            if ($zip->open($zip_filepath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) === true) {
                // 1. Add manifest.json
                $zip->addFromString($clean_slug . '/manifest.json', json_encode($target_package, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

                // 2. Add Main Standalone Plugin File
                $main_plugin_content = $this->generate_standalone_plugin_header($target_package, $clean_slug);
                $zip->addFromString($clean_slug . '/' . $clean_slug . '.php', $main_plugin_content);

                // 3. Add widget file if defined
                if (!empty($target_package['components']['widget'])) {
                    $widget_name = $target_package['components']['widget'];
                    $widget_filename = 'class-widget-' . str_replace('uas_', '', str_replace('_', '-', $widget_name)) . '.php';
                    $widget_src = UAS_PATH . 'includes/widgets/' . $widget_filename;
                    if (file_exists($widget_src)) {
                        $zip->addFile($widget_src, $clean_slug . '/includes/' . $widget_filename);
                    }
                }

                // 4. Add widget JS file if defined
                if (!empty($target_package['components']['javascript'])) {
                    $js_file = $target_package['components']['javascript'];
                    $js_src = UAS_PATH . 'assets/js/widgets/' . $js_file;
                    if (file_exists($js_src)) {
                        $zip->addFile($js_src, $clean_slug . '/assets/js/' . $js_file);
                    }
                }

                // 5. Add widget CSS file if defined
                if (!empty($target_package['components']['css'])) {
                    $css_file = $target_package['components']['css'];
                    $css_src = UAS_PATH . 'assets/css/widgets/' . $css_file;
                    if (file_exists($css_src)) {
                        $zip->addFile($css_src, $clean_slug . '/assets/css/' . $css_file);
                    }
                }

                $zip->close();
            }
        }

        return [
            'success'  => true,
            'zip_path' => $zip_filepath,
            'zip_url'  => $zip_fileurl,
            'filename' => $zip_filename,
        ];
    }

    /**
     * Generate standalone WordPress plugin loader PHP code
     */
    private function generate_standalone_plugin_header(array $package, $slug) {
        $name    = esc_html($package['name']);
        $desc    = esc_html($package['description']);
        $version = esc_html($package['version']);
        $min_php = esc_html($package['requirements']['php'] ?? '7.4');
        $min_wp  = esc_html($package['requirements']['wordpress'] ?? '6.0');

        return "<?php
/**
 * Plugin Name: Universal {$name} (Standalone Elementor Addon)
 * Plugin URI: https://github.com/sedrazavi/wordpress-theme
 * Description: {$desc}
 * Version: {$version}
 * Author: Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 * Text Domain: {$slug}
 * Requires at least: {$min_wp}
 * Requires PHP: {$min_php}
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('elementor/widgets/register', function(\$widgets_manager) {
    if (file_exists(__DIR__ . '/includes/')) {
        foreach (glob(__DIR__ . '/includes/*.php') as \$file) {
            require_once \$file;
        }
    }
});

add_action('wp_enqueue_scripts', function() {
    if (file_exists(__DIR__ . '/assets/css/')) {
        foreach (glob(__DIR__ . '/assets/css/*.css') as \$css) {
            wp_enqueue_style('{$slug}-' . basename(\$css, '.css'), plugins_url('assets/css/' . basename(\$css), __FILE__));
        }
    }
    if (file_exists(__DIR__ . '/assets/js/')) {
        foreach (glob(__DIR__ . '/assets/js/*.js') as \$js) {
            wp_enqueue_script('{$slug}-' . basename(\$js, '.js'), plugins_url('assets/js/' . basename(\$js), __FILE__), ['jquery'], '1.0.0', true);
        }
    }
});
";
    }

    /**
     * Handle direct admin download of a standalone capability package
     */
    public function handle_package_download() {
        if (!current_user_can('manage_options')) {
            wp_die(esc_html__('شما مجوز دسترسی به این بخش را ندارید.', 'universal-elementor-suite'));
        }

        check_admin_referer('uas_download_package_nonce');

        $package_id = isset($_GET['package_id']) ? sanitize_key($_GET['package_id']) : '';
        if (empty($package_id)) {
            wp_die(esc_html__('شناسه بسته مشخص نشده است.', 'universal-elementor-suite'));
        }

        $res = $this->export_standalone_package($package_id);
        if (!$res['success'] || !file_exists($res['zip_path'])) {
            wp_die(esc_html__('خطا در تولید بسته مستقل ZIP.', 'universal-elementor-suite'));
        }

        // Stream ZIP file directly
        header('Content-Type: application/zip');
        header('Content-Disposition: attachment; filename="' . esc_attr($res['filename']) . '"');
        header('Content-Length: ' . filesize($res['zip_path']));
        header('Pragma: no-cache');
        readfile($res['zip_path']);
        exit;
    }

    /**
     * AJAX handler for exporting a standalone package
     */
    public function ajax_export_package() {
        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => 'سطح دسترسی ناکافی است.']);
        }

        check_ajax_referer('uas_admin_nonce', 'nonce');

        $package_id = isset($_POST['package_id']) ? sanitize_key($_POST['package_id']) : '';
        $res = $this->export_standalone_package($package_id);

        if ($res['success']) {
            wp_send_json_success($res);
        } else {
            wp_send_json_error(['message' => $res['error'] ?? 'خطا در خروجی بسته.']);
        }
    }

    /**
     * REST endpoint: Export a package
     */
    public function rest_export_package($request) {
        $package_id = sanitize_key($request->get_param('package_id'));
        $res = $this->export_standalone_package($package_id);
        return rest_ensure_response($res);
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
                'id'           => 'package-pricing-matrix',
                'name'         => 'بسته مستقل ماتریس مقایسه ویژگی‌ها و قیمت‌ها',
                'package_type' => 'ui',
                'version'      => '6.0.0',
                'description'  => 'جدول مقایسه جامع چندستونه با ردیف‌های سرفصل، علائم تیک و ضربدر، و پاپ‌آپ‌های توضیحی.',
                'components'   => [
                    'widget'     => 'uas_pricing_matrix',
                    'block'      => 'sedrazavi/pricing-matrix',
                    'javascript' => 'pricing-matrix.js',
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
                'id'           => 'package-hero-split',
                'name'         => 'بسته مستقل هیرو بنر اسپلیت و جذب لید',
                'package_type' => 'ui',
                'version'      => '6.0.0',
                'description'  => 'هیرو بنر دوطرفه با باکس دریافت شماره تماس، تیک‌های ارزش پیشنهادی و استایل شیشه‌ای.',
                'components'   => [
                    'widget'     => 'uas_hero_split',
                    'block'      => 'sedrazavi/hero-split',
                    'javascript' => 'hero-split.js',
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
                'id'           => 'package-bento-tabs',
                'name'         => 'بسته مستقل گرید بنتو با تب‌های دسته‌بندی',
                'package_type' => 'ui',
                'version'      => '6.0.0',
                'description'  => 'کارت‌های بنتو باکس مدرن با فیلتر آنی دسته‌بندی و انیمیشن انتقال آرام.',
                'components'   => [
                    'widget'     => 'uas_bento_tabs',
                    'block'      => 'sedrazavi/bento-tabs',
                    'javascript' => 'bento-tabs.js',
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
                'id'           => 'package-dynamic-grid',
                'name'         => 'بسته مستقل گرید هوشمند کوئری داینامیک و کشینگ',
                'package_type' => 'ui',
                'version'      => '6.0.0',
                'description'  => 'گرید داینامیک پست‌ها و محتوا با سیستم کش ترنزینت قطعی، پشتیبانی ۳ تبه المنتور و Zero-Leakage.',
                'components'   => [
                    'widget'     => 'uas_dynamic_grid',
                    'block'      => 'sedrazavi/dynamic-grid',
                    'css'        => 'dynamic-grid.css',
                    'query_core' => 'Dynamic_Query_Engine',
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
                'id'           => 'package-template-vault',
                'name'         => 'بسته الگوهای کانتینری ۳۰گانه المنتور و تم‌بیلدر',
                'package_type' => 'service',
                'version'      => '6.0.0',
                'description'  => 'کتابخانه ۳۰ قالب آماده شامل هدر، فوتر، صفحات اصلی، سینگل، بلاگ، محصول، گرید و 404.',
                'components'   => [
                    'templates_count' => 30,
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
