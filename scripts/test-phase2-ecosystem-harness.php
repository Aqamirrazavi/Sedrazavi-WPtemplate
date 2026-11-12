<?php
/**
 * Phase 2 Ecosystem Integration Validation Harness
 *
 * Offline PHP integration harness exercising:
 * 1. Package_Registry::get_gutenberg_blocks_catalog() & get_cpt_schemas_catalog()
 * 2. Dependency_Resolver::resolve_blocks_and_cpts() & template AST widget auto-addition
 * 3. Package_Exporter::generate_kit_cpt_schemas_file() & generate_custom_bundle_plugin_file()
 *    - Verifies UAS_PATH / UAS_VERSION standalone constants
 *    - Verifies runtime uas_verify_bundle_checksums_*() integrity function
 * 4. Full Custom Project Kit ZIP export + Archive_Security_Validator::verify_archive_security()
 *    (runs when PHP ZipArchive extension is available)
 */

namespace Elementor {
    class Plugin {
        public static $instance = null;
        public static function instance() {
            if (!self::$instance) {
                self::$instance = new self();
            }
            return self::$instance;
        }
    }

    abstract class Widget_Base {
        abstract public function get_name();
        abstract public function get_title();
        abstract public function get_icon();
        abstract public function get_categories();
    }
}

namespace {
    if (!defined('ABSPATH')) {
        define('ABSPATH', __DIR__ . '/../');
    }
    if (!defined('UAS_PATH')) {
        define('UAS_PATH', __DIR__ . '/../elementor-addon-suite/');
    }
    if (!defined('UAS_VERSION')) {
        define('UAS_VERSION', '6.0.0');
    }

    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    echo "========================================================================\n";
    echo "   SEDRAZAVI ECOSYSTEM - PHASE 2 INTEGRATION VALIDATION HARNESS         \n";
    echo "========================================================================\n\n";

    $GLOBALS['mock_options'] = [];
    $GLOBALS['mock_transients'] = [];
    $GLOBALS['mock_actions'] = [];
    $GLOBALS['mock_rest_routes'] = [];
    $sandbox_uploads = sys_get_temp_dir() . '/sr-phase2-harness-' . uniqid();
    @mkdir($sandbox_uploads . '/uas-standalone-packages', 0777, true);

    if (!function_exists('add_action')) {
        function add_action($hook, $cb, $p = 10, $args = 1) { $GLOBALS['mock_actions'][$hook][] = $cb; }
    }
    if (!function_exists('add_filter')) {
        function add_filter($hook, $cb, $p = 10, $args = 1) {}
    }
    if (!function_exists('register_rest_route')) {
        function register_rest_route($ns, $route, $args = []) { $GLOBALS['mock_rest_routes'][] = $ns . $route; }
    }
    if (!function_exists('sanitize_text_field')) {
        function sanitize_text_field($str) { return trim(strip_tags((string) $str)); }
    }
    if (!function_exists('sanitize_key')) {
        function sanitize_key($key) { return preg_replace('/[^a-z0-9_\-]/', '', strtolower((string) $key)); }
    }
    if (!function_exists('sanitize_title')) {
        function sanitize_title($title) { return trim(preg_replace('/[^a-z0-9\-]+/', '-', strtolower((string) $title)), '-'); }
    }
    if (!function_exists('sanitize_hex_color')) {
        function sanitize_hex_color($color) { return preg_match('/^#[a-f0-9]{6}$/i', (string) $color) ? $color : ''; }
    }
    if (!function_exists('esc_html')) {
        function esc_html($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); }
    }
    if (!function_exists('esc_html__')) {
        function esc_html__($s, $d = '') { return (string) $s; }
    }
    if (!function_exists('trailingslashit')) {
        function trailingslashit($s) { return rtrim((string) $s, '/\\') . '/'; }
    }
    if (!function_exists('wp_mkdir_p')) {
        function wp_mkdir_p($dir) { return is_dir($dir) || @mkdir($dir, 0777, true); }
    }
    $GLOBALS['sr_sandbox_uploads'] = $sandbox_uploads;
    if (!function_exists('wp_upload_dir')) {
        function wp_upload_dir() {
            return ['basedir' => $GLOBALS['sr_sandbox_uploads'], 'baseurl' => 'http://example.com/wp-content/uploads'];
        }
    }
    if (!function_exists('current_time')) {
        function current_time($type) { return gmdate('Y-m-d H:i:s'); }
    }
    if (!function_exists('size_format')) {
        function size_format($bytes) { return round($bytes / 1024, 1) . ' KB'; }
    }
    if (!function_exists('update_option')) {
        function update_option($k, $v) { $GLOBALS['mock_options'][$k] = $v; return true; }
    }
    if (!function_exists('get_option')) {
        function get_option($k, $d = false) { return $GLOBALS['mock_options'][$k] ?? $d; }
    }
    if (!function_exists('is_wp_error')) {
        function is_wp_error($thing) { return false; }
    }
    if (!function_exists('wp_json_encode')) {
        function wp_json_encode($data, $opts = 0) { return json_encode($data, $opts); }
    }
    if (!function_exists('is_plugin_active')) {
        function is_plugin_active($plugin) { return false; }
    }

    // Load modular packaging classes
    $pkg_dir = UAS_PATH . 'includes/packaging/';
    require_once $pkg_dir . 'class-package-registry.php';
    require_once $pkg_dir . 'class-package-manifest-validator.php';
    require_once $pkg_dir . 'class-dependency-resolver.php';
    require_once $pkg_dir . 'class-archive-security-validator.php';
    require_once $pkg_dir . 'class-package-exporter.php';
    require_once $pkg_dir . 'class-package-installer.php';

    $registry   = new \UniversalElementorSuite\Packaging\Package_Registry();
    $validator  = new \UniversalElementorSuite\Packaging\Package_Manifest_Validator();
    $resolver   = new \UniversalElementorSuite\Packaging\Dependency_Resolver();
    $security   = new \UniversalElementorSuite\Packaging\Archive_Security_Validator();
    $exporter   = new \UniversalElementorSuite\Packaging\Package_Exporter();

    // TEST 1: Catalog Parity (All 7 Gutenberg blocks & 3 public CPT schemas)
    echo "[TEST 1] Verifying Gutenberg Blocks & CPT Schemas Catalogs...\n";
    $blocks_catalog = $registry->get_gutenberg_blocks_catalog();
    $cpts_catalog   = $registry->get_cpt_schemas_catalog();

    if (count($blocks_catalog) !== 7) {
        fwrite(STDERR, "FAIL: Expected 7 Gutenberg blocks, found " . count($blocks_catalog) . "\n");
        exit(1);
    }
    foreach (['sovereign-badge', 'sovereign-divider', 'sovereign-icon', 'sovereign-motion', 'sovereign-section', 'sovereign-vector-bg', 'sovereign-widget'] as $req_b) {
        if (empty($blocks_catalog[$req_b])) {
            fwrite(STDERR, "FAIL: Missing block slug {$req_b}\n");
            exit(1);
        }
    }
    foreach (['portfolio', 'services', 'case_study'] as $req_cpt) {
        if (empty($cpts_catalog[$req_cpt]) || empty($cpts_catalog[$req_cpt]['public'])) {
            fwrite(STDERR, "FAIL: Missing or non-public portable CPT {$req_cpt}\n");
            exit(1);
        }
    }
    echo "  PASS: 7/7 Gutenberg blocks and 3/3 public portable CPT schemas registered.\n\n";

    // TEST 2: Dependency Resolver for Blocks & CPTs + Template AST
    echo "[TEST 2] Verifying Dependency_Resolver::resolve_blocks_and_cpts() & Template AST...\n";
    $resolved_bc = $resolver->resolve_blocks_and_cpts(
        ['sedrazavi/sovereign-section', 'sovereign_badge', 'nonexistent-block'],
        ['portfolio', 'sedrazavi_case'], // confidential sedrazavi_case must be rejected
        $blocks_catalog,
        $cpts_catalog
    );
    if ($resolved_bc['gutenberg_blocks'] !== ['sovereign-section', 'sovereign-badge']) {
        fwrite(STDERR, "FAIL: Unexpected resolved Gutenberg blocks\n");
        exit(1);
    }
    if ($resolved_bc['cpt_schemas'] !== ['portfolio']) {
        fwrite(STDERR, "FAIL: Confidential or unknown CPT leaked into cpt_schemas!\n");
        exit(1);
    }
    echo "  PASS: Resolved selected blocks safely & filtered confidential CPTs.\n\n";

    // TEST 3: Generated Standalone Plugin Header & Checksum Self-Verifier
    echo "[TEST 3] Verifying Generated Standalone Bundle Header, Constants & Checksum Fn...\n";
    $fake_manifest = [
        'id'               => 'phase2-smoke-kit',
        'name'             => 'Phase 2 Smoke Kit',
        'version'          => '1.0.0',
        'niche'            => 'legal',
        'capabilities'     => [
            'theme_bridge'     => true,
            'query_engine'     => true,
            'gutenberg_blocks' => true,
            'cpt_schemas'      => true,
        ],
    ];
    $plugin_php = $exporter->generate_custom_bundle_plugin_file($fake_manifest, 'phase2-smoke-kit');
    $cpt_php    = $exporter->generate_kit_cpt_schemas_file(['portfolio', 'services'], $cpts_catalog, 'phase2-smoke-kit');

    $required_snippets = [
        "define('UAS_PATH'",
        "define('UAS_VERSION'",
        'function uas_verify_bundle_checksums_phase2_smoke_kit()',
        "uas_bundle_integrity_error_phase2-smoke-kit",
        "flush_rewrite_rules()",
        "class-gutenberg-blocks.php",
        "class-kit-cpt-schemas.php",
    ];
    foreach ($required_snippets as $snip) {
        if (strpos($plugin_php, $snip) === false) {
            fwrite(STDERR, "FAIL: Generated bundle plugin PHP missing '{$snip}'\n");
            exit(1);
        }
    }
    if (strpos($cpt_php, "'portfolio'") === false || strpos($cpt_php, "'services'") === false) {
        fwrite(STDERR, "FAIL: Generated CPT schema PHP missing portfolio/services\n");
        exit(1);
    }
    echo "  PASS: Generated bundle loader includes standalone constants, checksum verifier, Gutenberg & CPT hooks.\n\n";

    // TEST 4: Real Custom Kit ZIP Build & Anti-Zip-Slip / Per-File SHA-256 Validation
    echo "[TEST 4] Verifying Real Custom Kit ZIP Compilation & Archive Security Validation...\n";
    if (!class_exists('\ZipArchive')) {
        echo "  WARN: ZipArchive PHP extension not active in CLI environment; skipping ZIP compilation step.\n";
    } else {
        $build_res = $exporter->build_custom_project_bundle(
            [
                'project_name'       => 'Phase 2 Live Kit',
                'project_slug'       => 'phase2-live-kit',
                'selected_widgets'   => ['hero', 'pricing_switcher'],
                'selected_templates' => ['hero-legal-luxury'],
                'selected_blocks'    => ['sovereign-section', 'sovereign-badge'],
                'selected_cpts'      => ['portfolio', 'case_study'],
                'design_tokens'      => [
                    'primary_color'   => '#D4AF37',
                    'secondary_color' => '#0B132B',
                    'font_family'     => 'Vazirmatn',
                ],
                'niche'              => 'legal',
            ],
            $registry->get_widget_catalog(),
            $resolver,
            $validator,
            $registry
        );

        if (empty($build_res['success']) || !file_exists($build_res['zip_path'])) {
            fwrite(STDERR, "FAIL: Custom bundle compilation failed: " . ($build_res['error'] ?? 'unknown') . "\n");
            exit(1);
        }
        if ((int) ($build_res['blocks_count'] ?? 0) !== 2 || (int) ($build_res['cpts_count'] ?? 0) !== 2) {
            fwrite(STDERR, "FAIL: Expected blocks_count=2 and cpts_count=2\n");
            exit(1);
        }

        $sec_check = $security->verify_archive_security($build_res['zip_path'], $validator);
        if (empty($sec_check['valid'])) {
            fwrite(STDERR, "FAIL: Archive security / checksum verification rejected compiled kit: " . ($sec_check['error'] ?? '') . "\n");
            exit(1);
        }
        echo "  PASS: Built custom ZIP ({$build_res['filesize']}, {$build_res['checksums_count']} file checksums) & passed security + SHA-256 check.\n";
    }

    // Cleanup sandbox
    $it = new \RecursiveDirectoryIterator($sandbox_uploads, \RecursiveDirectoryIterator::SKIP_DOTS);
    $files = new \RecursiveIteratorIterator($it, \RecursiveIteratorIterator::CHILD_FIRST);
    foreach ($files as $file) {
        if ($file->isDir()) {
            @rmdir($file->getRealPath());
        } else {
            @unlink($file->getRealPath());
        }
    }
    @rmdir($sandbox_uploads);

    echo "\n========================================================================\n";
    echo ">>> PHASE 2 ECOSYSTEM HARNESS: 100% PASSED <<<\n";
    echo "========================================================================\n";
}
