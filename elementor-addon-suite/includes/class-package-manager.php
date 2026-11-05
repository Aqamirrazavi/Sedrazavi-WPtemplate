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
        add_action('admin_post_uas_download_custom_bundle', [$this, 'handle_custom_bundle_download']);
        add_action('wp_ajax_uas_export_package', [$this, 'ajax_export_package']);
        add_action('wp_ajax_uas_build_custom_bundle', [$this, 'ajax_build_custom_bundle']);
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

        register_rest_route('sedrazavi/v1', '/packages/build-custom-bundle', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_build_custom_bundle'],
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

        // Strictly verify ZipArchive extension is installed
        if (!class_exists('\ZipArchive')) {
            return [
                'success' => false,
                'error'   => 'ماژول ZipArchive در تنظیمات PHP سرور فعال نیست. امکان ایجاد پکیج زیپ وجود ندارد.',
            ];
        }

        $zip = new \ZipArchive();
        $open_res = $zip->open($zip_filepath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE);
        if ($open_res !== true) {
            return [
                'success' => false,
                'error'   => sprintf('خطا در ایجاد یا باز کردن فایل فشرده زیپ پکیج (کد خطا: %s).', (string)$open_res),
            ];
        }

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

        $close_res = $zip->close();
        if (!$close_res || !file_exists($zip_filepath) || filesize($zip_filepath) === 0) {
            return [
                'success' => false,
                'error'   => 'ساخت فایل زیپ با شکست مواجه شد یا فایل خروجی نهایی خالی است.',
            ];
        }

        return [
            'success'  => true,
            'zip_path' => $zip_filepath,
            'zip_url'  => $zip_fileurl,
            'filename' => $zip_filename,
        ];
    }

    /**
     * Recursive Dependency Resolution Engine
     * Resolves all dependencies needed for a package and detects conflicts and cycles.
     *
     * @param string $package_id
     * @param array $resolved
     * @param array $unresolved (for cycle detection)
     * @return array [ 'success' => bool, 'resolved' => array, 'errors' => array ]
     */
    public function resolve_package_dependencies($package_id, array &$resolved = [], array &$unresolved = []) {
        $packages = $this->get_portable_packages();
        $target = null;
        foreach ($packages as $pkg) {
            if ($pkg['id'] === $package_id) {
                $target = $pkg;
                break;
            }
        }

        if (!$target) {
            return [
                'success'  => false,
                'resolved' => [],
                'errors'   => [sprintf('پکیج "%s" در رجیستری یافت نشد.', $package_id)],
            ];
        }

        $unresolved[$package_id] = true;
        $dependencies = $target['dependencies'] ?? [];

        foreach ($dependencies as $dep_id) {
            if (in_array($dep_id, $resolved, true)) {
                continue;
            }

            if (!empty($unresolved[$dep_id])) {
                return [
                    'success'  => false,
                    'resolved' => [],
                    'errors'   => [sprintf('تشخیص چرخه وابستگی دوطرفه (Circular Dependency): بین %s و %s.', $package_id, $dep_id)],
                ];
            }

            $sub_res = $this->resolve_package_dependencies($dep_id, $resolved, $unresolved);
            if (!$sub_res['success']) {
                return $sub_res;
            }
        }

        unset($unresolved[$package_id]);
        if (!in_array($package_id, $resolved, true)) {
            $resolved[] = $package_id;
        }

        return [
            'success'  => true,
            'resolved' => $resolved,
            'errors'   => [],
        ];
    }

    /**
     * Check for conflicting packages or incompatibilities
     *
     * @param string $package_id
     * @return array [ 'conflict' => bool, 'messages' => array ]
     */
    public function check_package_conflicts($package_id) {
        $packages = $this->get_portable_packages();
        $target = null;
        foreach ($packages as $pkg) {
            if ($pkg['id'] === $package_id) {
                $target = $pkg;
                break;
            }
        }

        if (!$target) {
            return ['conflict' => true, 'messages' => ['پکیج یافت نشد.']];
        }

        $conflicts = [];
        $conflicts_with = $target['conflicts'] ?? [];

        foreach ($conflicts_with as $conflict_slug) {
            if (is_plugin_active($conflict_slug) || defined(strtoupper(str_replace('-', '_', $conflict_slug)) . '_VERSION')) {
                $conflicts[] = sprintf('تداخل ساختاری: پکیج %s با ماژول فعال %s در تضاد است.', $package_id, $conflict_slug);
            }
        }

        return [
            'conflict' => !empty($conflicts),
            'messages' => $conflicts,
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
     * AJAX handler to build custom project bundle from user selections
     */
    public function ajax_build_custom_bundle() {
        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => 'سطح دسترسی ناکافی است.']);
        }

        check_ajax_referer('uas_admin_nonce', 'nonce');

        $params = [
            'project_name'         => isset($_POST['project_name']) ? sanitize_text_field($_POST['project_name']) : 'پروژه سفارشی',
            'project_slug'         => isset($_POST['project_slug']) ? sanitize_title($_POST['project_slug']) : 'custom-project-kit',
            'selected_widgets'     => isset($_POST['widgets']) && is_array($_POST['widgets']) ? array_map('sanitize_key', $_POST['widgets']) : [],
            'selected_templates'   => isset($_POST['templates']) && is_array($_POST['templates']) ? array_map('sanitize_key', $_POST['templates']) : [],
            'niche'                => isset($_POST['niche']) ? sanitize_key($_POST['niche']) : 'general',
            'include_theme_bridge' => !empty($_POST['include_theme_bridge']),
            'include_query_engine' => !empty($_POST['include_query_engine']),
        ];

        $res = $this->build_custom_project_bundle($params);

        if ($res['success']) {
            wp_send_json_success($res);
        } else {
            wp_send_json_error(['message' => $res['error'] ?? 'خطا در کامپایل بسته سفارشی.']);
        }
    }

    /**
     * Handle direct admin download of custom compiled bundle
     */
    public function handle_custom_bundle_download() {
        if (!current_user_can('manage_options')) {
            wp_die(esc_html__('شما مجوز دسترسی به این بخش را ندارید.', 'universal-elementor-suite'));
        }

        check_admin_referer('uas_download_custom_bundle_nonce');

        $slug = isset($_GET['slug']) ? sanitize_title($_GET['slug']) : 'custom-project-kit';
        $upload_dir = wp_upload_dir();
        $zip_filepath = trailingslashit($upload_dir['basedir']) . 'uas-standalone-packages/' . $slug . '-standalone-kit.zip';

        if (!file_exists($zip_filepath)) {
            wp_die(esc_html__('فایل پکیج سفارشی مورد نظر در سرور یافت نشد.', 'universal-elementor-suite'));
        }

        header('Content-Type: application/zip');
        header('Content-Disposition: attachment; filename="' . esc_attr(basename($zip_filepath)) . '"');
        header('Content-Length: ' . filesize($zip_filepath));
        header('Pragma: no-cache');
        readfile($zip_filepath);
        exit;
    }

    /**
     * REST endpoint to build custom bundle
     */
    public function rest_build_custom_bundle($request) {
        $params = $request->get_json_params() ?: $request->get_params();
        $res = $this->build_custom_project_bundle($params);
        return rest_ensure_response($res);
    }

    /**
     * Build Custom Project Bundle on the fly
     * Compiles selected widgets, templates, and services into a portable standalone WordPress plugin ZIP.
     *
     * @param array $params
     * @return array
     */
    public function build_custom_project_bundle(array $params) {
        if (!class_exists('\ZipArchive')) {
            return ['success' => false, 'error' => 'ماژول ZipArchive در تنظیمات PHP سرور فعال نیست.'];
        }

        $project_name = !empty($params['project_name']) ? sanitize_text_field($params['project_name']) : 'پروژه سفارشی المنتور';
        $project_slug = !empty($params['project_slug']) ? sanitize_title($params['project_slug']) : 'custom-elementor-suite';
        if (empty($project_slug)) {
            $project_slug = 'custom-elementor-suite';
        }

        $widgets = !empty($params['selected_widgets']) && is_array($params['selected_widgets']) ? array_map('sanitize_key', $params['selected_widgets']) : [];
        $templates = !empty($params['selected_templates']) && is_array($params['selected_templates']) ? array_map('sanitize_key', $params['selected_templates']) : [];
        $niche = !empty($params['niche']) ? sanitize_key($params['niche']) : 'general';
        $include_bridge = !empty($params['include_theme_bridge']);
        $include_query = !empty($params['include_query_engine']);

        $upload_dir = wp_upload_dir();
        $export_dir = trailingslashit($upload_dir['basedir']) . 'uas-standalone-packages/';
        wp_mkdir_p($export_dir);

        $zip_filename = $project_slug . '-standalone-kit.zip';
        $zip_filepath = $export_dir . $zip_filename;
        $zip_fileurl  = trailingslashit($upload_dir['baseurl']) . 'uas-standalone-packages/' . $zip_filename;

        $zip = new \ZipArchive();
        if ($zip->open($zip_filepath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) !== true) {
            return ['success' => false, 'error' => 'امکان ایجاد فایل زیپ در سرور وجود ندارد.'];
        }

        // 1. Manifest
        $manifest = [
            'id'           => $project_slug,
            'name'         => $project_name,
            'version'      => '1.0.0',
            'package_type' => 'custom-project-kit',
            'niche'        => $niche,
            'created_at'   => current_time('mysql'),
            'widgets'      => $widgets,
            'templates'    => $templates,
            'capabilities' => [
                'theme_bridge' => $include_bridge,
                'query_engine' => $include_query,
            ],
            'requirements' => [
                'php'       => '>=7.4',
                'wordpress' => '>=6.0',
                'elementor' => '>=3.10',
            ],
        ];
        $zip->addFromString($project_slug . '/manifest.json', json_encode($manifest, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        // 2. Main Plugin Loader PHP
        $main_plugin = $this->generate_custom_bundle_plugin_file($manifest, $project_slug);
        $zip->addFromString($project_slug . '/' . $project_slug . '.php', $main_plugin);

        // 3. Add Widget files
        $widget_file_map = [
            'uas_posts_grid' => 'class-widget-posts.php',
        ];

        foreach ($widgets as $w_slug) {
            $base_name = str_replace('uas_', '', str_replace('_', '-', $w_slug));
            $w_file = $widget_file_map[$w_slug] ?? ('class-widget-' . $base_name . '.php');
            $src_w = UAS_PATH . 'includes/widgets/' . $w_file;
            if (file_exists($src_w)) {
                $zip->addFile($src_w, $project_slug . '/includes/widgets/' . $w_file);
            }

            // Widget JS
            $js_file = $base_name . '.js';
            $src_js = UAS_PATH . 'assets/js/widgets/' . $js_file;
            if (file_exists($src_js)) {
                $zip->addFile($src_js, $project_slug . '/assets/js/' . $js_file);
            }

            // Widget CSS
            $css_file = $base_name . '.css';
            $src_css = UAS_PATH . 'assets/css/widgets/' . $css_file;
            if (file_exists($src_css)) {
                $zip->addFile($src_css, $project_slug . '/assets/css/' . $css_file);
            }
        }

        // 4. Add Core widget base & styling
        $base_php = UAS_PATH . 'includes/class-widget-base.php';
        if (file_exists($base_php)) {
            $zip->addFile($base_php, $project_slug . '/includes/class-widget-base.php');
        }
        $core_css = UAS_PATH . 'assets/css/widgets-core.css';
        if (file_exists($core_css)) {
            $zip->addFile($core_css, $project_slug . '/assets/css/widgets-core.css');
        }

        // 5. Add Template files
        foreach ($templates as $t_slug) {
            $t_file = UAS_PATH . 'templates/' . $t_slug . '.json';
            if (!file_exists($t_file)) {
                $t_file = UAS_PATH . 'templates/popups/' . $t_slug . '.json';
            }
            if (file_exists($t_file)) {
                $zip->addFile($t_file, $project_slug . '/templates/' . basename($t_file));
            }
        }

        // 6. If Theme Builder Bridge is enabled
        if ($include_bridge) {
            $bridge_php = UAS_PATH . 'includes/class-theme-builder-bridge.php';
            if (file_exists($bridge_php)) {
                $zip->addFile($bridge_php, $project_slug . '/includes/class-theme-builder-bridge.php');
            }
        }

        // 7. If Dynamic Query Engine is enabled
        if ($include_query) {
            $query_php = UAS_PATH . 'includes/class-dynamic-query-engine.php';
            if (file_exists($query_php)) {
                $zip->addFile($query_php, $project_slug . '/includes/class-dynamic-query-engine.php');
            }
        }

        $zip->close();

        if (!file_exists($zip_filepath) || filesize($zip_filepath) === 0) {
            return ['success' => false, 'error' => 'فایل بسته نهایی ایجاد نشد یا خالی است.'];
        }

        return [
            'success'         => true,
            'zip_path'        => $zip_filepath,
            'zip_url'         => $zip_fileurl,
            'filename'        => $zip_filename,
            'filesize'        => size_format(filesize($zip_filepath)),
            'widgets_count'   => count($widgets),
            'templates_count' => count($templates),
            'message'         => sprintf('بسته مستقل «%s» با موفقیت کامپایل گردید (%s).', $project_name, size_format(filesize($zip_filepath))),
        ];
    }

    /**
     * Generate standalone WordPress plugin loader PHP code for custom project kit
     */
    private function generate_custom_bundle_plugin_file(array $manifest, $slug) {
        $name    = esc_html($manifest['name']);
        $version = esc_html($manifest['version']);
        $niche   = esc_html($manifest['niche']);
        $has_bridge = !empty($manifest['capabilities']['theme_bridge']);
        $has_query  = !empty($manifest['capabilities']['query_engine']);

        $bridge_code = $has_bridge ? "if (file_exists(__DIR__ . '/includes/class-theme-builder-bridge.php')) {
    require_once __DIR__ . '/includes/class-theme-builder-bridge.php';
    if (class_exists('\\\\UniversalElementorSuite\\\\Theme_Builder_Bridge')) {
        \\\\UniversalElementorSuite\\\\Theme_Builder_Bridge::instance();
    }
}" : "";

        $query_code = $has_query ? "if (file_exists(__DIR__ . '/includes/class-dynamic-query-engine.php')) {
    require_once __DIR__ . '/includes/class-dynamic-query-engine.php';
    if (class_exists('\\\\UniversalElementorSuite\\\\Dynamic_Query_Engine')) {
        \\\\UniversalElementorSuite\\\\Dynamic_Query_Engine::instance();
    }
}" : "";

        return "<?php
/**
 * Plugin Name: {$name} (Custom Project Kit)
 * Plugin URI: https://github.com/sedrazavi/wordpress-theme
 * Description: بسته سفارشی، قابل حمل و بهینه‌سازی‌شده برای پروژه ({$niche})؛ تولیدشده توسط استودیوی اکوسیستم SedRazavi.
 * Version: {$version}
 * Author: Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 * Text Domain: {$slug}
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. Auto-import templates into Elementor Library on Activation
register_activation_hook(__FILE__, function() {
    \$tpl_dir = __DIR__ . '/templates/';
    if (!is_dir(\$tpl_dir)) return;
    
    foreach (glob(\$tpl_dir . '*.json') as \$file) {
        \$slug = basename(\$file, '.json');
        \$raw = @file_get_contents(\$file);
        \$data = @json_decode(\$raw, true);
        if (!is_array(\$data) || empty(\$data['title'])) continue;

        \$exists = get_posts([
            'post_type'      => 'elementor_library',
            'post_status'    => 'any',
            'posts_per_page' => 1,
            'meta_key'       => '_uas_custom_tpl_slug',
            'meta_value'     => \$slug,
        ]);

        if (empty(\$exists)) {
            \$type = \$data['type'] ?? 'section';
            \$pid = wp_insert_post([
                'post_title'   => sanitize_text_field(\$data['title']),
                'post_type'    => 'elementor_library',
                'post_status'  => 'publish',
                'post_content' => '',
            ]);
            if (\$pid && !is_wp_error(\$pid)) {
                if (taxonomy_exists('elementor_library_type')) {
                    wp_set_object_terms(\$pid, \$type, 'elementor_library_type');
                }
                update_post_meta(\$pid, '_elementor_edit_mode', 'builder');
                update_post_meta(\$pid, '_elementor_template_type', \$type);
                update_post_meta(\$pid, '_elementor_data', wp_slash(json_encode(\$data['content'])));
                update_post_meta(\$pid, '_uas_custom_tpl_slug', \$slug);
            }
        }
    }
});

// 2. Load Optional Theme Builder Bridge
{$bridge_code}

// 3. Load Optional Dynamic Query Engine
{$query_code}

// 4. Register Custom Selected Widgets in Elementor
add_action('elementor/widgets/register', function(\$widgets_manager) {
    if (file_exists(__DIR__ . '/includes/class-widget-base.php')) {
        require_once __DIR__ . '/includes/class-widget-base.php';
    }

    if (file_exists(__DIR__ . '/includes/widgets/')) {
        foreach (glob(__DIR__ . '/includes/widgets/*.php') as \$file) {
            require_once \$file;
        }
    }

    \$classes = get_declared_classes();
    foreach (\$classes as \$cls) {
        if (strpos(\$cls, 'UniversalElementorSuite\\\\Widgets\\\\') === 0 && is_subclass_of(\$cls, '\\\\Elementor\\\\Widget_Base')) {
            if (method_exists(\$widgets_manager, 'register')) {
                \$widgets_manager->register(new \$cls());
            } elseif (method_exists(\$widgets_manager, 'register_widget_type')) {
                \$widgets_manager->register_widget_type(new \$cls());
            }
        }
    }
});

// 5. Enqueue Frontend Scripts & Styles
add_action('wp_enqueue_scripts', function() {
    if (file_exists(__DIR__ . '/assets/css/widgets-core.css')) {
        wp_enqueue_style('{$slug}-core', plugins_url('assets/css/widgets-core.css', __FILE__));
    }
    if (file_exists(__DIR__ . '/assets/css/')) {
        foreach (glob(__DIR__ . '/assets/css/*.css') as \$css) {
            if (basename(\$css) !== 'widgets-core.css') {
                wp_enqueue_style('{$slug}-' . basename(\$css, '.css'), plugins_url('assets/css/' . basename(\$css), __FILE__));
            }
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

    /**
     * Rollback package installation or export
     * Deletes exported zip artifacts, flushes transients, and restores clean state
     *
     * @param string $package_id
     * @return array
     */
    public function rollback_package_installation($package_id) {
        $clean_slug = sanitize_key($package_id);
        $upload_dir = wp_upload_dir();
        $export_dir = trailingslashit($upload_dir['basedir']) . 'uas-standalone-packages/';

        $deleted_files = 0;
        if (is_dir($export_dir)) {
            $files = glob($export_dir . $clean_slug . '*');
            foreach ($files as $f) {
                if (is_file($f) && @unlink($f)) {
                    $deleted_files++;
                }
            }
        }

        // Flush package query transients
        delete_transient('uas_query_' . $clean_slug);
        delete_transient('uas_pkg_manifest_' . $clean_slug);

        return [
            'success'       => true,
            'package_id'    => $package_id,
            'deleted_files' => $deleted_files,
            'message'       => sprintf('رول‌بک پکیج %s با موفقیت انجام شد (%d فایل موقت پاک‌سازی شدند).', $package_id, $deleted_files),
        ];
    }
}
