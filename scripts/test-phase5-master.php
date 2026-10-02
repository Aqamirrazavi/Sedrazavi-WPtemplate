<?php
/**
 * Master Verification Suite - Phase 5
 *
 * Runs full validation covering:
 * 1. Complete PHP syntax check on all theme and plugin files (php -l)
 * 2. Full SSR rendering & hydration check (header + front-page + footer)
 * 3. Theme ZIP package inspection (file tree, root screenshot, style.css header, .distignore compliance)
 * 4. REST API route coverage matrix (JS bundle vs PHP endpoints)
 */

define('ABSPATH', __DIR__ . '/../');
define('SEDRAZAVI_THEME_DIR', __DIR__ . '/../wordpress-theme');
define('SEDRAZAVI_THEME_URI', 'http://example.com/wp-content/themes/sedrazavi-theme');

$results = array(
    'php_syntax'      => false,
    'ssr_rendering'   => false,
    'zip_package'     => false,
    'rest_coverage'   => false,
    'errors'          => array(),
);

echo "========================================================================\n";
echo "       SEDRAZAVI LEGAL SUITE - MASTER VERIFICATION TEST (PHASE 5)        \n";
echo "========================================================================\n\n";

// -----------------------------------------------------------------------------
// PART 1: PHP SYNTAX CHECK (php -l)
// -----------------------------------------------------------------------------
echo "[PART 1] Scanning and checking syntax on all PHP files...\n";
$php_files = array_merge(
    glob_recursive(__DIR__ . '/../wordpress-theme/*.php'),
    glob_recursive(__DIR__ . '/../sedrazavi-addons/*.php')
);

$syntax_errors = 0;
foreach ($php_files as $file) {
    $output = array();
    $return_var = 0;
    exec("php -l " . escapeshellarg($file) . " 2>&1", $output, $return_var);
    if ($return_var !== 0) {
        $syntax_errors++;
        echo "  [FAIL] $file:\n    " . implode("\n    ", $output) . "\n";
        $results['errors'][] = "Syntax error in $file";
    }
}

if ($syntax_errors === 0) {
    echo "  ✓ All " . count($php_files) . " PHP files passed syntax validation with 0 errors.\n";
    $results['php_syntax'] = true;
} else {
    echo "  ✗ Found $syntax_errors syntax errors.\n";
}

// -----------------------------------------------------------------------------
// PART 2: FULL SSR RENDERING (header + front-page + footer)
// -----------------------------------------------------------------------------
echo "\n[PART 2] Testing full SSR template rendering...\n";

// WordPress Runtime Mock
$GLOBALS['mock_options'] = array(
    'blogname'        => 'دفتر وکالت دکتر سیده مریم رضوی',
    'blogdescription' => 'مشاوره حقوقی تخصصی، داوری و وکالت پایه یک دادگستری',
    'admin_email'     => 'info@sedrazavi.com',
);
$GLOBALS['mock_theme_mods'] = array();
$GLOBALS['mock_inline_scripts'] = array();
$GLOBALS['mock_enqueued_scripts'] = array();
$GLOBALS['mock_enqueued_styles'] = array();

function get_option($k, $default = false) {
    return isset($GLOBALS['mock_options'][$k]) ? $GLOBALS['mock_options'][$k] : $default;
}
function update_option($k, $v) { $GLOBALS['mock_options'][$k] = $v; return true; }
function get_bloginfo($show = 'name') {
    if ($show === 'name') return $GLOBALS['mock_options']['blogname'];
    if ($show === 'description') return $GLOBALS['mock_options']['blogdescription'];
    if ($show === 'admin_email') return $GLOBALS['mock_options']['admin_email'];
    if ($show === 'charset') return 'UTF-8';
    return '';
}
function bloginfo($show = 'name') { echo get_bloginfo($show); }
function language_attributes() { echo 'lang="fa-IR"'; }
function body_class($c = '') { echo 'class="' . esc_attr($c) . '"'; }
function esc_attr($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
function esc_html($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
function esc_url($s) { return (string)$s; }
function esc_html__($s, $d = '') { return $s; }
function esc_attr__($s, $d = '') { return $s; }
function esc_html_e($s, $d = '') { echo $s; }
function esc_attr_e($s, $d = '') { echo $s; }
function esc_url_raw($s) { return (string)$s; }
function home_url($p = '') { return 'http://example.com' . $p; }
function admin_url($p = '') { return 'http://example.com/wp-admin/' . $p; }
function rest_url($p = '') { return 'http://example.com/wp-json/' . $p; }
function wp_body_open() {}
function have_posts() { return false; }
function rewind_posts() {}
function has_nav_menu($loc) { return false; }
function wp_nav_menu($args = array()) {
    if (isset($args['fallback_cb']) && is_callable($args['fallback_cb'])) {
        call_user_func($args['fallback_cb']);
    }
}
function is_front_page() { return true; }
function is_home() { return true; }
function is_singular() { return false; }
function is_page() { return false; }
function is_archive() { return false; }
function is_search() { return false; }
function is_404() { return false; }
function is_user_logged_in() { return false; }
function is_admin() { return false; }
function wp_get_document_title() { return 'دفتر وکالت دکتر سیده مریم رضوی'; }
function get_template_directory() { return SEDRAZAVI_THEME_DIR; }
function get_stylesheet_directory() { return SEDRAZAVI_THEME_DIR; }
function get_template_directory_uri() { return SEDRAZAVI_THEME_URI; }
function get_stylesheet_uri() { return SEDRAZAVI_THEME_URI . '/style.css'; }
function get_theme_mod($k, $default = '') { return isset($GLOBALS['mock_theme_mods'][$k]) ? $GLOBALS['mock_theme_mods'][$k] : $default; }
function wp_create_nonce($action = -1) { return 'mock_nonce_123'; }
function wp_strip_all_tags($s) { return strip_tags((string)$s); }
function wp_trim_words($s, $n = 30, $m = '...') { return mb_substr(strip_tags((string)$s), 0, 150) . $m; }
function add_query_arg($a, $u) { return $u; }
function wp_json_encode($d, $flags = 0) { return json_encode($d, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); }
function add_action($tag, $callback, $priority = 10, $accepted_args = 1) {}
function add_filter($tag, $callback, $priority = 10, $accepted_args = 1) {}
function remove_action($tag, $callback, $priority = 10) {}
function post_type_exists($pt) { return true; }
function register_post_type($pt, $args = array()) { return true; }
function register_post_meta($type, $key, $args = array()) { return true; }
function __return_true() { return true; }
function sanitize_title($t) { return strtolower(preg_replace('/[^a-zA-Z0-9_-]/', '', (string)$t)); }
function sanitize_text_field($t) { return trim(strip_tags((string)$t)); }
function sanitize_key($k) { return strtolower(preg_replace('/[^a-z0-9_]/', '', (string)$k)); }
function sanitize_textarea_field($t) { return trim(strip_tags((string)$t)); }
function wp_unslash($v) { return stripslashes((string)$v); }
function absint($n) { return abs((int)$n); }
function is_wp_error($thing) { return false; }
function add_shortcode($tag, $callback) {}
function add_theme_support($feature, $args = array()) {}
function register_nav_menus($menus = array()) {}
function register_setting($option_group, $option_name, $args = array()) {}
function add_submenu_page($parent, $title, $menu_title, $capability, $slug, $callback = '') {}
function add_meta_box($id, $title, $callback, $screen = null, $context = 'advanced', $priority = 'default', $callback_args = null) {}
function wp_nonce_field($action = -1, $name = '_wpnonce', $referer = true, $echo = true) {}
function delete_transient($k) {}
function set_transient($k, $v, $exp = 600) { return true; }
function get_transient($k) { return false; }
function current_user_can($cap) { return true; }
function wp_send_json_success($data = null, $status_code = null) {}
function wp_send_json_error($data = null, $status_code = null) {}
function wp_insert_post($args) { return 101; }
function update_post_meta($id, $k, $v) { return true; }
function get_post_meta($id, $k = '', $single = false) { return ''; }
function get_page_by_path($slug) { return null; }
class WP_Query {
    public $posts = array();
    public function __construct($args = array()) {}
    public function have_posts() { return false; }
    public function the_post() {}
}

function wp_enqueue_style($h, $src = '', $deps = array(), $ver = false) { $GLOBALS['mock_enqueued_styles'][$h] = $src; }
function wp_enqueue_script($h, $src = '', $deps = array(), $ver = false, $in_footer = false) { $GLOBALS['mock_enqueued_scripts'][$h] = $src; }
function wp_add_inline_script($h, $data, $pos = 'after') { $GLOBALS['mock_inline_scripts'][$h] = $data; }
function wp_localize_script($h, $obj_name, $l10n) {}

function wp_head() {
    foreach ($GLOBALS['mock_enqueued_styles'] as $h => $src) {
        echo "<link rel='stylesheet' id='{$h}-css' href='{$src}' type='text/css' media='all' />\n";
    }
}
function wp_footer() {
    foreach ($GLOBALS['mock_inline_scripts'] as $h => $script) {
        echo "<script id='{$h}-js-before'>{$script}</script>\n";
    }
    foreach ($GLOBALS['mock_enqueued_scripts'] as $h => $src) {
        echo "<script id='{$h}-js' src='{$src}'></script>\n";
    }
}
function get_header() { include SEDRAZAVI_THEME_DIR . '/header.php'; }
function get_footer() { include SEDRAZAVI_THEME_DIR . '/footer.php'; }

function wp_style_is($handle, $list = 'enqueued') { return isset($GLOBALS['mock_enqueued_styles'][$handle]); }
function wp_script_is($handle, $list = 'enqueued') { return isset($GLOBALS['mock_enqueued_scripts'][$handle]); }

// Load Theme Core, SEO & Assets
require_once SEDRAZAVI_THEME_DIR . '/functions.php';

// Simulate enqueue assets
if (function_exists('sedrazavi_enqueue_assets')) {
    sedrazavi_enqueue_assets();
}

ob_start();
include SEDRAZAVI_THEME_DIR . '/front-page.php';
$html = ob_get_clean();

echo "  - Rendered HTML Length: " . strlen($html) . " bytes\n";

$head_html = substr($html, 0, strpos($html, '</head>') ?: strlen($html));

$ssr_checks = array(
    'bloginfo_name'       => strpos($html, 'دفتر وکالت دکتر سیده مریم رضوی') !== false,
    'bloginfo_desc'       => strpos($html, 'مشاوره حقوقی تخصصی، داوری و وکالت پایه یک دادگستری') !== false,
    'persian_legal_text'  => (strlen($html) > 50000 && strpos($html, 'دعاوی ملکی') !== false && strpos($html, 'داوری') !== false),
    'no_tailwind_cdn'     => strpos($html, 'cdn.tailwindcss.com') === false,
    'vite_public_path'    => strpos($html, 'window.__vite_public_path__') !== false,
    'compiled_css'        => strpos($html, 'index.css') !== false,
    'dynamic_title'       => strpos($html, '<title>') !== false,
    'schema_legal_service'=> (strpos($html, 'LegalService') !== false),
    'schema_attorney'     => (strpos($html, 'Attorney') !== false),
    'local_og_image'      => (strpos($head_html, 'screenshot.png') !== false && strpos($head_html, 'images.unsplash.com') === false),
);

$ssr_all_passed = true;
foreach ($ssr_checks as $chk => $passed) {
    if ($passed) {
        echo "  ✓ SSR Check [$chk]: PASSED\n";
    } else {
        echo "  ✗ SSR Check [$chk]: FAILED\n";
        $ssr_all_passed = false;
        $results['errors'][] = "SSR check failed: $chk";
    }
}
$results['ssr_rendering'] = $ssr_all_passed;

// -----------------------------------------------------------------------------
// PART 3: THEME ZIP PACKAGE INSPECTION
// -----------------------------------------------------------------------------
echo "\n[PART 3] Inspecting production ZIP package (sedrazavi-theme.zip)...\n";
$theme_zip_path = __DIR__ . '/../sedrazavi-theme.zip';

if (!file_exists($theme_zip_path)) {
    echo "  ✗ Error: sedrazavi-theme.zip not found!\n";
    $results['errors'][] = "sedrazavi-theme.zip missing";
} else {
    $zip = new ZipArchive();
    if ($zip->open($theme_zip_path) === true) {
        $total_files = $zip->numFiles;
        echo "  - Total entries in theme ZIP: $total_files\n";

        $has_root_screenshot = false;
        $has_style_css = false;
        $has_clean_structure = true;
        $has_sensitive_files = false;
        $sensitive_found = array();

        $forbidden_patterns = array('/\.env/', '/\.git/', '/node_modules/', '/package\.json/', '/vite\.config/', '/\.map$/', '/tests\//');

        for ($i = 0; $i < $total_files; $i++) {
            $stat = $zip->statIndex($i);
            $name = $stat['name'];

            // Check single root folder prefix
            if (!preg_match('/^sedrazavi-theme\//', $name)) {
                $has_clean_structure = false;
            }

            // Check root screenshot
            if ($name === 'sedrazavi-theme/screenshot.png') {
                $has_root_screenshot = true;
            }

            // Check style.css
            if ($name === 'sedrazavi-theme/style.css') {
                $has_style_css = true;
                $style_content = $zip->getFromIndex($i);
                if (strpos($style_content, 'Theme Name: SedRazavi') === false || strpos($style_content, 'Version: 2.6.0') === false) {
                    echo "  ✗ style.css is missing required WordPress theme header metadata!\n";
                    $has_style_css = false;
                }
            }

            // Check forbidden sensitive files
            foreach ($forbidden_patterns as $pattern) {
                if (preg_match($pattern, $name)) {
                    $has_sensitive_files = true;
                    $sensitive_found[] = $name;
                }
            }
        }

        echo "  " . ($has_clean_structure ? "✓" : "✗") . " Clean root structure (sedrazavi-theme/...): " . ($has_clean_structure ? "PASSED" : "FAILED") . "\n";
        echo "  " . ($has_root_screenshot ? "✓" : "✗") . " Screenshot at root of theme (sedrazavi-theme/screenshot.png): " . ($has_root_screenshot ? "PASSED" : "FAILED") . "\n";
        echo "  " . ($has_style_css ? "✓" : "✗") . " Valid style.css with standard WP headers: " . ($has_style_css ? "PASSED" : "FAILED") . "\n";
        echo "  " . (!$has_sensitive_files ? "✓" : "✗") . " Sensitive files exclusion (.distignore compliance): " . (!$has_sensitive_files ? "PASSED (0 sensitive files)" : "FAILED (" . implode(', ', $sensitive_found) . ")") . "\n";

        $results['zip_package'] = ($has_clean_structure && $has_root_screenshot && $has_style_css && !$has_sensitive_files);
        $zip->close();
    } else {
        echo "  ✗ Could not open ZIP archive!\n";
    }
}

// -----------------------------------------------------------------------------
// PART 4: REST API JS vs PHP ROUTE AUDIT
// -----------------------------------------------------------------------------
echo "\n[PART 4] Auditing JavaScript Bundle Endpoints vs PHP Registered Endpoints...\n";

$bundle_path = SEDRAZAVI_THEME_DIR . '/assets/dist/index.js';
if (!file_exists($bundle_path)) {
    $bundle_path = SEDRAZAVI_THEME_DIR . '/assets/index.js';
}

$js_content = file_get_contents($bundle_path);
preg_match_all('/wp-json\/([a-zA-Z0-9_\/-]+)/', $js_content, $matches);
$js_routes = array_unique($matches[1]);
sort($js_routes);

// Simulated registered PHP routes from SedRazavi_REST_API
$GLOBALS['mock_rest_routes'] = array();
function register_rest_route($ns, $r, $args = array()) {
    $full = trim($ns, '/') . '/' . ltrim($r, '/');
    $GLOBALS['mock_rest_routes'][$full] = true;
}
SedRazavi_REST_API::register_routes();
SedRazavi_REST_API::register_service_cpt_for_rest();

// Add core WP routes natively handled by WP core & CPT
$GLOBALS['mock_rest_routes']['wp/v2/posts'] = true;
$GLOBALS['mock_rest_routes']['wp/v2/lawyer_service'] = true;

echo "+-----------------------------------------+-------------------+\n";
echo "| REST API Route in JS Client             | Registered in PHP |\n";
echo "+-----------------------------------------+-------------------+\n";

$no_count = 0;
foreach ($js_routes as $route) {
    // Normalization check
    $is_registered = isset($GLOBALS['mock_rest_routes'][$route]);
    if (!$is_registered) {
        // Check partial prefix (e.g. auth routes or nested endpoints)
        foreach (array_keys($GLOBALS['mock_rest_routes']) as $php_r) {
            if (strpos($php_r, $route) === 0 || strpos($route, $php_r) === 0) {
                $is_registered = true;
                break;
            }
        }
    }

    $status_str = $is_registered ? "بله (Yes)" : "خیر (No)";
    if (!$is_registered) {
        $no_count++;
    }
    printf("| %-39s | %-17s |\n", "wp-json/" . $route, $status_str);
}
echo "+-----------------------------------------+-------------------+\n";

if ($no_count === 0) {
    echo "  ✓ 100% of JS routes are fully registered and active in PHP (0 missing endpoints)!\n";
    $results['rest_coverage'] = true;
} else {
    echo "  ✗ Found $no_count unregistered routes!\n";
    $results['errors'][] = "Found $no_count unregistered REST routes";
}

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
echo "\n========================================================================\n";
$all_passed = $results['php_syntax'] && $results['ssr_rendering'] && $results['zip_package'] && $results['rest_coverage'];
if ($all_passed) {
    echo ">>> FINAL STATUS: ALL 4 VERIFICATION STAGES PASSED WITH 100% SUCCESS <<<\n";
} else {
    echo ">>> FINAL STATUS: VERIFICATION FAILED WITH ERRORS <<<\n";
    foreach ($results['errors'] as $err) {
        echo "  - $err\n";
    }
}
echo "========================================================================\n";

function glob_recursive($pattern, $flags = 0) {
    $files = glob($pattern, $flags);
    foreach (glob(dirname($pattern) . '/*', GLOB_ONLYDIR | GLOB_NOSORT) as $dir) {
        $files = array_merge($files, glob_recursive($dir . '/' . basename($pattern), $flags));
    }
    return $files;
}
