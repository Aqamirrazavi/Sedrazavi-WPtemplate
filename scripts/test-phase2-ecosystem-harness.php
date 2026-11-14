<?php
/**
 * Phase 2 & Stage 4/5 Ecosystem Integration Validation Harness
 *
 * Offline PHP integration harness exercising:
 * 1. Package_Registry::get_gutenberg_blocks_catalog() & get_cpt_schemas_catalog()
 * 2. Dependency_Resolver::resolve_blocks_and_cpts() & template AST widget auto-addition
 * 3. Package_Exporter::generate_kit_cpt_schemas_file() & generate_custom_bundle_plugin_file()
 * 4. Full Custom Project Kit ZIP export + Archive_Security_Validator::verify_archive_security()
 * 5. Instantiation & register_controls()/render() smoke check for ALL 31 Elementor widgets
 * 6. Dependency validation & media relinking across ALL 33 Elementor JSON templates
 * 7. Stage 2 Package_Installer overwrite guard / preflight & Stage 4 Gutenberg_Blocks SSR callbacks
 */

namespace Elementor {
    class Plugin {
        public static $instance = null;
        public $widgets_manager = null;
        public $files_manager = null;
        public static function instance() {
            if (!self::$instance) {
                self::$instance = new self();
                self::$instance->widgets_manager = new class {
                    public function get_widget_types() { return []; }
                };
                self::$instance->files_manager = new class {
                    public function clear_cache() {}
                };
            }
            return self::$instance;
        }
    }

    class Controls_Manager {
        const TAB_CONTENT = 'content';
        const TAB_STYLE = 'style';
        const TAB_ADVANCED = 'advanced';
        const TEXT = 'text';
        const TEXTAREA = 'textarea';
        const NUMBER = 'number';
        const SELECT = 'select';
        const SWITCHER = 'switcher';
        const COLOR = 'color';
        const URL = 'url';
        const MEDIA = 'media';
        const WYSIWYG = 'wysiwyg';
        const REPEATER = 'repeater';
        const ICONS = 'icons';
        const CHOOSE = 'choose';
        const SLIDER = 'slider';
        const DIMENSIONS = 'dimensions';
        const HEADING = 'heading';
        const HIDDEN = 'hidden';
        const CODE = 'code';
        const GALLERY = 'gallery';
        const DATE_TIME = 'date_time';
    }

    class Group_Control_Typography { public static function get_type() { return 'typography'; } }
    class Group_Control_Box_Shadow { public static function get_type() { return 'box-shadow'; } }
    class Group_Control_Border { public static function get_type() { return 'border'; } }
    class Group_Control_Background { public static function get_type() { return 'background'; } }

    class Repeater {
        private $fields = [];
        public function add_control($id, $args = []) { $this->fields[$id] = $args; }
        public function get_fields() { return $this->fields; }
    }

    class Utils {
        public static function get_placeholder_image_src() { return 'http://example.com/placeholder.png'; }
    }

    class Icons_Manager {
        public static function render_icon($icon, $attributes = [], $tag = 'i') { return ''; }
    }

    abstract class Widget_Base {
        private $mock_defaults = [];
        public function __construct($data = [], $args = null) {}
        abstract public function get_name();
        abstract public function get_title();
        abstract public function get_icon();
        abstract public function get_categories();
        public function get_id() { return 'mock-widget-id'; }
        public function start_controls_section($id, $args = []) {}
        public function end_controls_section() {}
        public function start_controls_tabs($id) {}
        public function end_controls_tabs() {}
        public function start_controls_tab($id, $args = []) {}
        public function end_controls_tab() {}
        public function add_control($id, $args = []) {
            if (array_key_exists('default', $args)) {
                $this->mock_defaults[$id] = $args['default'];
            }
        }
        public function add_responsive_control($id, $args = []) {
            $this->add_control($id, $args);
        }
        public function add_group_control($group, $args = []) {}
        public function get_settings_for_display($key = null) {
            if ($key !== null) {
                return $this->mock_defaults[$key] ?? null;
            }
            return $this->mock_defaults;
        }
        public function add_render_attribute($el, $key, $val = null) {}
        public function get_render_attribute_string($el) { return ''; }
        protected function register_controls() {}
        protected function render() {}
        public function run_controls_and_render_smoke() {
            $this->register_controls();
            ob_start();
            $this->render();
            return ob_get_clean();
        }
    }
}

namespace {
    if (!defined('ABSPATH')) {
        define('ABSPATH', __DIR__ . '/../');
    }
    if (!defined('UAS_PATH')) {
        define('UAS_PATH', __DIR__ . '/../elementor-addon-suite/');
    }
    if (!defined('UAS_URL')) {
        define('UAS_URL', 'http://example.com/wp-content/plugins/elementor-addon-suite/');
    }
    if (!defined('UAS_VERSION')) {
        define('UAS_VERSION', '6.0.0');
    }

    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    echo "========================================================================\n";
    echo "   SEDRAZAVI ECOSYSTEM - PHASE 2 & STAGE 4/5 VALIDATION HARNESS         \n";
    echo "========================================================================\n\n";

    $GLOBALS['mock_options'] = [];
    $GLOBALS['mock_transients'] = [];
    $GLOBALS['mock_actions'] = [];
    $GLOBALS['mock_shortcodes'] = [];
    $GLOBALS['mock_rest_routes'] = [];
    $GLOBALS['wp_version'] = '6.7.0';
    $sandbox_uploads = sys_get_temp_dir() . '/sr-phase2-harness-' . uniqid();
    @mkdir($sandbox_uploads . '/uas-standalone-packages', 0777, true);

    if (!class_exists('WP_Query')) {
        class WP_Query {
            public $posts = [];
            public function __construct($args = []) {}
            public function have_posts() { return false; }
            public function the_post() {}
        }
    }
    if (!function_exists('wp_reset_postdata')) { function wp_reset_postdata() {} }
    if (!function_exists('add_action')) { function add_action($hook, $cb, $p = 10, $args = 1) { $GLOBALS['mock_actions'][$hook][] = $cb; } }
    if (!function_exists('add_filter')) { function add_filter($hook, $cb, $p = 10, $args = 1) {} }
    if (!function_exists('add_shortcode')) { function add_shortcode($tag, $cb) { $GLOBALS['mock_shortcodes'][$tag] = $cb; } }
    if (!function_exists('shortcode_exists')) { function shortcode_exists($tag) { return isset($GLOBALS['mock_shortcodes'][$tag]); } }
    if (!function_exists('shortcode_atts')) {
        function shortcode_atts($pairs, $atts, $shortcode = '') {
            $atts = (array) $atts;
            $out = [];
            foreach ($pairs as $name => $default) {
                $out[$name] = array_key_exists($name, $atts) ? $atts[$name] : $default;
            }
            return $out;
        }
    }
    if (!function_exists('do_shortcode')) {
        function do_shortcode($content) {
            if (preg_match('/^\[([a-zA-Z0-9_\-]+)(?:\s+[^\]]*)?\]$/', trim((string) $content), $m)) {
                $tag = $m[1];
                if (isset($GLOBALS['mock_shortcodes'][$tag])) {
                    return call_user_func($GLOBALS['mock_shortcodes'][$tag], [], '');
                }
            }
            return (string) $content;
        }
    }
    if (!function_exists('register_rest_route')) { function register_rest_route($ns, $route, $args = []) { $GLOBALS['mock_rest_routes'][] = $ns . $route; } }
    if (!function_exists('rest_ensure_response')) { function rest_ensure_response($data) { return $data; } }
    if (!function_exists('sanitize_text_field')) { function sanitize_text_field($str) { return trim(strip_tags((string) $str)); } }
    if (!function_exists('sanitize_textarea_field')) { function sanitize_textarea_field($str) { return trim(strip_tags((string) $str)); } }
    if (!function_exists('sanitize_key')) { function sanitize_key($key) { return preg_replace('/[^a-z0-9_\-]/', '', strtolower((string) $key)); } }
    if (!function_exists('sanitize_html_class')) { function sanitize_html_class($cls) { return preg_replace('/[^a-zA-Z0-9_\-]/', '', (string) $cls); } }
    if (!function_exists('sanitize_title')) { function sanitize_title($title) { return trim(preg_replace('/[^a-z0-9\-]+/', '-', strtolower((string) $title)), '-'); } }
    if (!function_exists('sanitize_hex_color')) { function sanitize_hex_color($color) { return preg_match('/^#[a-f0-9]{6}$/i', (string) $color) ? $color : ''; } }
    if (!function_exists('esc_html')) { function esc_html($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); } }
    if (!function_exists('esc_attr')) { function esc_attr($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); } }
    if (!function_exists('esc_url')) { function esc_url($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); } }
    if (!function_exists('esc_html__')) { function esc_html__($s, $d = '') { return (string) $s; } }
    if (!function_exists('__')) { function __($s, $d = '') { return (string) $s; } }
    if (!function_exists('esc_attr_e')) { function esc_attr_e($s, $d = '') { echo esc_attr($s); } }
    if (!function_exists('wp_kses_post')) { function wp_kses_post($s) { return (string) $s; } }
    if (!function_exists('wp_strip_all_tags')) { function wp_strip_all_tags($s) { return strip_tags((string) $s); } }
    if (!function_exists('wp_unslash')) { function wp_unslash($s) { return $s; } }
    if (!function_exists('wp_slash')) { function wp_slash($s) { return $s; } }
    if (!function_exists('trailingslashit')) { function trailingslashit($s) { return rtrim((string) $s, '/\\') . '/'; } }
    if (!function_exists('wp_mkdir_p')) { function wp_mkdir_p($dir) { return is_dir($dir) || @mkdir($dir, 0777, true); } }
    $GLOBALS['sr_sandbox_uploads'] = $sandbox_uploads;
    if (!function_exists('wp_upload_dir')) {
        function wp_upload_dir() {
            return ['basedir' => $GLOBALS['sr_sandbox_uploads'], 'baseurl' => 'http://example.com/wp-content/uploads'];
        }
    }
    if (!function_exists('current_time')) { function current_time($type) { return gmdate('Y-m-d H:i:s'); } }
    if (!function_exists('size_format')) { function size_format($bytes) { return round($bytes / 1024, 1) . ' KB'; } }
    if (!function_exists('update_option')) { function update_option($k, $v) { $GLOBALS['mock_options'][$k] = $v; return true; } }
    if (!function_exists('get_option')) { function get_option($k, $d = false) { return $GLOBALS['mock_options'][$k] ?? $d; } }
    if (!function_exists('delete_option')) { function delete_option($k) { unset($GLOBALS['mock_options'][$k]); return true; } }
    if (!function_exists('get_transient')) { function get_transient($k) { return $GLOBALS['mock_transients'][$k] ?? false; } }
    if (!function_exists('set_transient')) { function set_transient($k, $v, $exp = 0) { $GLOBALS['mock_transients'][$k] = $v; return true; } }
    if (!function_exists('delete_transient')) { function delete_transient($k) { unset($GLOBALS['mock_transients'][$k]); return true; } }
    if (!function_exists('get_posts')) { function get_posts($args = []) { return []; } }
    if (!function_exists('get_post_type')) { function get_post_type($id) { return false; } }
    if (!function_exists('post_type_exists')) { function post_type_exists($pt) { return false; } }
    if (!function_exists('is_admin')) { function is_admin() { return false; } }
    if (!function_exists('is_wp_error')) { function is_wp_error($thing) { return false; } }
    if (!function_exists('wp_json_encode')) { function wp_json_encode($data, $opts = 0) { return json_encode($data, $opts); } }
    if (!function_exists('is_plugin_active')) { function is_plugin_active($plugin) { return false; } }
    if (!function_exists('admin_url')) { function admin_url($p = '') { return 'http://example.com/wp-admin/' . ltrim((string) $p, '/'); } }
    if (!function_exists('wp_create_nonce')) { function wp_create_nonce($act = -1) { return 'mock-nonce'; } }
    if (!function_exists('wp_register_style')) { function wp_register_style($h, $src = '', $deps = [], $v = false) {} }
    if (!function_exists('wp_enqueue_style')) { function wp_enqueue_style($h) {} }
    if (!function_exists('wp_add_inline_style')) { function wp_add_inline_style($h, $css) {} }
    if (!function_exists('wp_register_script')) { function wp_register_script($h, $src = '', $deps = [], $v = false, $in_footer = false) {} }
    if (!function_exists('wp_enqueue_script')) { function wp_enqueue_script($h) {} }
    if (!function_exists('wp_localize_script')) { function wp_localize_script($h, $name, $data) {} }
    if (!function_exists('wp_add_inline_script')) { function wp_add_inline_script($h, $js) {} }
    if (!function_exists('get_permalink')) { function get_permalink($id = 0) { return 'http://example.com/sample'; } }
    if (!function_exists('get_the_title')) { function get_the_title($id = 0) { return 'عنوان نمونه'; } }
    if (!function_exists('get_the_date')) { function get_the_date($fmt = '', $id = 0) { return '۱۴۰۳/۰۹/۰۱'; } }
    if (!function_exists('get_the_excerpt')) { function get_the_excerpt($id = 0) { return 'خلاصه محتوای نمونه'; } }
    if (!function_exists('get_the_post_thumbnail_url')) { function get_the_post_thumbnail_url($id = 0, $sz = 'medium') { return ''; } }
    if (!function_exists('number_format_i18n')) { function number_format_i18n($n) { return number_format((float) $n); } }

    // Load modular packaging & core service classes
    $pkg_dir = UAS_PATH . 'includes/packaging/';
    require_once $pkg_dir . 'class-package-registry.php';
    require_once $pkg_dir . 'class-package-manifest-validator.php';
    require_once $pkg_dir . 'class-dependency-resolver.php';
    require_once $pkg_dir . 'class-archive-security-validator.php';
    require_once $pkg_dir . 'class-package-exporter.php';
    require_once $pkg_dir . 'class-package-installer.php';

    require_once UAS_PATH . 'includes/class-plugin.php';
    require_once UAS_PATH . 'includes/class-widget-base.php';
    require_once UAS_PATH . 'includes/class-template-importer.php';
    require_once UAS_PATH . 'includes/class-sovereign-widgets-registry.php';
    require_once UAS_PATH . 'includes/class-sovereign-svg-icons.php';
    require_once UAS_PATH . 'includes/class-sovereign-sections-bank.php';
    require_once UAS_PATH . 'includes/class-sovereign-motion-presets.php';
    require_once UAS_PATH . 'includes/class-gutenberg-blocks.php';
    require_once UAS_PATH . 'includes/class-industry-blocks.php';

    $registry   = new \UniversalElementorSuite\Packaging\Package_Registry();
    $validator  = new \UniversalElementorSuite\Packaging\Package_Manifest_Validator();
    $resolver   = new \UniversalElementorSuite\Packaging\Dependency_Resolver();
    $security   = new \UniversalElementorSuite\Packaging\Archive_Security_Validator();
    $exporter   = new \UniversalElementorSuite\Packaging\Package_Exporter();
    $installer  = new \UniversalElementorSuite\Packaging\Package_Installer();

    // TEST 1: Catalog Parity
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

    // TEST 2: Dependency Resolver
    echo "[TEST 2] Verifying Dependency_Resolver::resolve_blocks_and_cpts()...\n";
    $resolved_bc = $resolver->resolve_blocks_and_cpts(
        ['sedrazavi/sovereign-section', 'sovereign_badge', 'nonexistent-block'],
        ['portfolio', 'sedrazavi_case'],
        $blocks_catalog,
        $cpts_catalog
    );
    if ($resolved_bc['gutenberg_blocks'] !== ['sovereign-section', 'sovereign-badge'] || $resolved_bc['cpt_schemas'] !== ['portfolio']) {
        fwrite(STDERR, "FAIL: Dependency_Resolver block/CPT filtering mismatch\n");
        exit(1);
    }
    echo "  PASS: Resolved selected blocks safely & filtered confidential CPTs.\n\n";

    // TEST 3: Generated Standalone Plugin Header & Checksum Self-Verifier
    echo "[TEST 3] Verifying Generated Standalone Bundle Header & Checksum Fn...\n";
    $fake_manifest = [
        'id'           => 'phase2-smoke-kit',
        'name'         => 'Phase 2 Smoke Kit',
        'version'      => '1.0.0',
        'niche'        => 'legal',
        'capabilities' => [
            'theme_bridge'     => true,
            'query_engine'     => true,
            'gutenberg_blocks' => true,
            'cpt_schemas'      => true,
        ],
    ];
    $plugin_php = $exporter->generate_custom_bundle_plugin_file($fake_manifest, 'phase2-smoke-kit');
    $cpt_php    = $exporter->generate_kit_cpt_schemas_file(['portfolio', 'services'], $cpts_catalog, 'phase2-smoke-kit');

    foreach (["define('UAS_PATH'", "define('UAS_VERSION'", 'function uas_verify_bundle_checksums_phase2_smoke_kit()', 'uas_bundle_integrity_error_phase2-smoke-kit'] as $snip) {
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

    // TEST 4: Real Custom Kit ZIP Build & Archive Security Verification + Overwrite Guard
    echo "[TEST 4] Verifying Custom Kit ZIP Build, Security Check & Overwrite Guard...\n";
    if (!class_exists('\ZipArchive')) {
        echo "  WARN: ZipArchive PHP extension not active; skipping ZIP compilation step.\n\n";
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

        $sec_check = $security->verify_archive_security($build_res['zip_path'], $validator);
        if (empty($sec_check['safe'])) {
            fwrite(STDERR, "FAIL: Archive security / checksum verification rejected compiled kit: " . ($sec_check['error'] ?? '') . "\n");
            exit(1);
        }

        // Exercise Package_Installer install -> conflict guard -> overwrite -> rollback
        $install_target = $sandbox_uploads . '/uas-standalone-packages/installed/phase2-live-kit/';
        $preflight_cb = function($m) use ($installer, $registry, $validator, $resolver) {
            return $installer->preflight_check($m, $registry, $validator, $resolver);
        };
        $inst1 = $installer->import_package_archive($build_res['zip_path'], false, $install_target, $security, $validator, $preflight_cb, false);
        if (empty($inst1['success'])) {
            fwrite(STDERR, "FAIL: First install failed: " . ($inst1['error'] ?? '') . "\n");
            exit(1);
        }
        $inst_conflict = $installer->import_package_archive($build_res['zip_path'], false, $install_target, $security, $validator, $preflight_cb, false);
        if (($inst_conflict['stage'] ?? '') !== 'conflict_exists') {
            fwrite(STDERR, "FAIL: Overwrite guard did not return conflict_exists\n");
            exit(1);
        }
        $rollback = $installer->rollback_package_installation('phase2-live-kit');
        if (empty($rollback['success']) || is_dir($install_target)) {
            fwrite(STDERR, "FAIL: Rollback did not remove installed target cleanly\n");
            exit(1);
        }
        echo "  PASS: Built ZIP, validated security/checksums, enforced overwrite guard & executed clean rollback.\n\n";
    }

    // TEST 5: All 31 Elementor Widgets register_controls() + render() smoke check
    echo "[TEST 5] Verifying All 31 Elementor Widgets Controls & Render Output...\n";
    $widgets_map = \UniversalElementorSuite\Plugin::get_widgets_map();
    if (count($widgets_map) !== 31) {
        fwrite(STDERR, "FAIL: Expected 31 Elementor widgets in Plugin::get_widgets_map(), got " . count($widgets_map) . "\n");
        exit(1);
    }
    $rendered_widgets = 0;
    foreach ($widgets_map as $w_id => $meta) {
        $fpath = UAS_PATH . 'includes/widgets/' . $meta['file'];
        if (!file_exists($fpath)) {
            fwrite(STDERR, "FAIL: Missing widget file {$meta['file']}\n");
            exit(1);
        }
        require_once $fpath;
        $cls = $meta['class'];
        if (!class_exists($cls)) {
            fwrite(STDERR, "FAIL: Widget class {$cls} not declared\n");
            exit(1);
        }
        $instance = new $cls();
        $html = $instance->run_controls_and_render_smoke();
        if (!is_string($html) || trim($html) === '') {
            fwrite(STDERR, "FAIL: Widget {$w_id} ({$cls}) produced empty render output\n");
            exit(1);
        }
        $rendered_widgets++;
    }
    echo "  PASS: {$rendered_widgets}/31 Elementor Widget_Base classes instantiated, registered controls, and rendered cleanly.\n\n";

    // TEST 6: All 33 JSON Templates Dependency Validation + Media Relinker
    echo "[TEST 6] Verifying All 33 Elementor JSON Templates AST & Media Relinking...\n";
    $tpl_files = array_merge(
        glob(UAS_PATH . 'templates/*.json') ?: [],
        glob(UAS_PATH . 'templates/popups/*.json') ?: []
    );
    if (count($tpl_files) !== 33) {
        fwrite(STDERR, "FAIL: Expected 33 JSON templates, found " . count($tpl_files) . "\n");
        exit(1);
    }
    foreach ($tpl_files as $tf) {
        $decoded = json_decode(file_get_contents($tf), true);
        if (!is_array($decoded) || empty($decoded['content'])) {
            fwrite(STDERR, "FAIL: Invalid JSON template structure: " . basename($tf) . "\n");
            exit(1);
        }
        $dep = \UniversalElementorSuite\Template_Importer::validate_template_widget_dependencies($decoded['content']);
        if (empty($dep['valid'])) {
            fwrite(STDERR, "FAIL: Template " . basename($tf) . " missing widgets: " . implode(', ', $dep['missing_widgets']) . "\n");
            exit(1);
        }
        \UniversalElementorSuite\Template_Importer::relink_template_media($decoded['content']);
    }
    echo "  PASS: 33/33 Elementor JSON templates validated & relinked cleanly.\n\n";

    // TEST 7: Stage 4 Gutenberg Blocks Service Wiring & Industry Blocks Smoke Check
    echo "[TEST 7] Verifying Stage 4 Gutenberg Blocks Service-Backed Callbacks & Industry Shortcodes...\n";
    \UniversalElementorSuite\Sovereign_Widgets_Registry::instance();
    \UniversalElementorSuite\Sovereign_Svg_Icons::instance();
    \UniversalElementorSuite\Sovereign_Sections_Bank::instance();
    \UniversalElementorSuite\Sovereign_Motion_Presets::instance();
    $gb = \UniversalElementorSuite\Gutenberg_Blocks::instance();
    $ib = \UniversalElementorSuite\Industry_Blocks::instance();

    $gb_outputs = [
        'vector-bg' => $gb->render_vector_bg_block(['presetId' => 2, 'mode' => 'motion']),
        'widget'    => $gb->render_widget_block(['widgetId' => 7, 'theme' => 'dark']),
        'divider'   => $gb->render_divider_block(['dividerId' => 4, 'height' => 90]),
        'badge'     => $gb->render_badge_block(['badgeId' => 3, 'showLabel' => true]),
        'section'   => $gb->render_section_block(['sectionId' => 1, 'colorMode' => 'dark']),
        'motion'    => $gb->render_motion_block(['motionId' => 2, 'duration' => 3]),
        'icon'      => $gb->render_icon_block(['iconId' => 1, 'size' => 32]),
    ];
    foreach ($gb_outputs as $k => $out) {
        if (!is_string($out) || trim($out) === '') {
            fwrite(STDERR, "FAIL: Gutenberg block callback '{$k}' returned empty HTML\n");
            exit(1);
        }
    }
    if (strpos($gb_outputs['icon'], '<svg') === false) {
        fwrite(STDERR, "FAIL: render_icon_block did not return real SVG from Sovereign_Svg_Icons\n");
        exit(1);
    }
    $icons_catalog = \UniversalElementorSuite\Sovereign_Svg_Icons::instance()->get_icons_catalog();
    if (count($icons_catalog) !== 66) {
        fwrite(STDERR, "FAIL: Expected 66 icons in Sovereign_Svg_Icons::get_icons_catalog(), got " . count($icons_catalog) . "\n");
        exit(1);
    }
    $icon_33 = $gb->render_icon_block(['iconId' => 33, 'size' => 28]);
    if (strpos($icon_33, '<svg') === false) {
        fwrite(STDERR, "FAIL: render_icon_block(33) did not return real SVG\n");
        exit(1);
    }
    $dental_html = $ib->render_dental_appointment_modal([]);
    $customs_html = $ib->render_corporate_customs_tracker([]);
    if (strpos($dental_html, 'alert(') !== false || strpos($customs_html, 'alert(') !== false) {
        fwrite(STDERR, "FAIL: Industry blocks still contain inline alert()\n");
        exit(1);
    }
    echo "  PASS: All 7 Gutenberg SSR callbacks, 66/66 Sovereign Icons & Industry Blocks verified free of inline alert().\n";

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
    echo ">>> PHASE 2 & STAGE 4/5 ECOSYSTEM HARNESS: 100% PASSED <<<\n";
    echo "========================================================================\n";
}
