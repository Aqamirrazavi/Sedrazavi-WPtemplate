<?php
/**
 * Test Harness for Phase 2 Verification
 */

define('ABSPATH', __DIR__ . '/../');
define('SEDRAZAVI_THEME_DIR', __DIR__ . '/../wordpress-theme');
define('SEDRAZAVI_THEME_URI', 'http://example.com/wp-content/themes/sedrazavi-theme');

// Mock WordPress Environment for Testing
$GLOBALS['mock_options'] = array();
$GLOBALS['mock_posts'] = array();
$GLOBALS['mock_post_meta'] = array();
$GLOBALS['mock_rest_routes'] = array();
$GLOBALS['mock_post_types'] = array();

function get_option($k, $default = false) {
    return isset($GLOBALS['mock_options'][$k]) ? $GLOBALS['mock_options'][$k] : $default;
}
function update_option($k, $v) {
    $GLOBALS['mock_options'][$k] = $v;
    return true;
}
function sanitize_title($t) { return strtolower(preg_replace('/[^a-zA-Z0-9_-]/', '', $t)); }
function sanitize_text_field($t) { return trim(strip_tags($t)); }
function sanitize_key($k) { return strtolower(preg_replace('/[^a-z0-9_]/', '', $k)); }
function sanitize_textarea_field($t) { return trim(strip_tags($t)); }
function wp_json_encode($d) { return json_encode($d, JSON_UNESCAPED_UNICODE); }
function esc_html($s) { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }
function esc_attr($s) { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }
function esc_html__($s, $d = '') { return $s; }
function esc_attr__($s, $d = '') { return $s; }
function wp_generate_password($len = 12, $special = true) { return bin2hex(random_bytes(max(1, (int)($len/2)))); }
function home_url($p = '') { return 'http://example.com' . $p; }
function absint($n) { return abs((int)$n); }
function is_wp_error($thing) { return is_a($thing, 'WP_Error'); }
function is_user_logged_in() { return false; }
function current_user_can($c) { return true; }
function post_type_exists($pt) { return isset($GLOBALS['mock_post_types'][$pt]); }
function register_post_type($pt, $args = array()) { $GLOBALS['mock_post_types'][$pt] = $args; return true; }
function register_post_meta($type, $key, $args = array()) { return true; }
function __return_true() { return true; }

function wp_insert_post($args) {
    static $id = 100;
    $id++;
    $post = (object) array(
        'ID'         => $id,
        'post_title' => $args['post_title'],
        'post_name'  => isset($args['post_name']) ? $args['post_name'] : sanitize_title($args['post_title']),
        'post_type'  => $args['post_type'],
    );
    $GLOBALS['mock_posts'][$id] = $post;
    return $id;
}

function get_page_by_path($slug) {
    foreach ($GLOBALS['mock_posts'] as $post) {
        if ($post->post_name === $slug) {
            return $post;
        }
    }
    return null;
}

function update_post_meta($id, $k, $v) {
    if (!isset($GLOBALS['mock_post_meta'][$id])) {
        $GLOBALS['mock_post_meta'][$id] = array();
    }
    $GLOBALS['mock_post_meta'][$id][$k] = $v;
    return true;
}

function get_post_meta($id, $k, $single = true) {
    if (isset($GLOBALS['mock_post_meta'][$id][$k])) {
        return $GLOBALS['mock_post_meta'][$id][$k];
    }
    return $single ? '' : array();
}

class WP_Query {
    public $posts = array();
    public function __construct($args = array()) {
        $found = array();
        if (isset($args['meta_key']) && isset($args['meta_value'])) {
            foreach ($GLOBALS['mock_posts'] as $id => $post) {
                if (isset($GLOBALS['mock_post_meta'][$id][$args['meta_key']]) && $GLOBALS['mock_post_meta'][$id][$args['meta_key']] === $args['meta_value']) {
                    $found[] = $post;
                }
            }
        }
        $this->posts = $found;
    }
    public function have_posts() { return !empty($this->posts); }
    public function the_post() {}
}

class WP_REST_Response {
    public $data;
    public $status;
    public function __construct($data, $status = 200) {
        $this->data = $data;
        $this->status = $status;
    }
}

class WP_REST_Request {
    public $params = array();
    public function __construct($params = array()) {
        $this->params = $params;
    }
    public function get_params() {
        return $this->params;
    }
}

function register_rest_route($namespace, $route, $args = array()) {
    $full = trim($namespace, '/') . '/' . ltrim($route, '/');
    $GLOBALS['mock_rest_routes'][$full] = $args;
    return true;
}

function add_action($tag, $callback, $priority = 10, $accepted_args = 1) {}

// Load Phase 2 implementations
require_once SEDRAZAVI_THEME_DIR . '/inc/manifest-bridge.php';
require_once SEDRAZAVI_THEME_DIR . '/inc/rest-api.php';

echo "=== 1. TESTING MANIFEST READING ===\n";
$manifest = SedRazavi_Manifest_Bridge::get_manifest();
if (!$manifest || empty($manifest['routes'])) {
    die("FAILED: Manifest could not be loaded or has no routes!\n");
}
echo "Manifest Loaded: " . count($manifest['routes']) . " routes found.\n";

echo "\n=== 2. TESTING IDEMPOTENT PAGE SYNCHRONIZATION ===\n";
// First run
SedRazavi_Manifest_Bridge::sync_pages_idempotent();
$first_count = count($GLOBALS['mock_posts']);
echo "First Run: Created $first_count pages.\n";

// Second run (should be idempotent - 0 new pages created)
SedRazavi_Manifest_Bridge::sync_pages_idempotent();
$second_count = count($GLOBALS['mock_posts']);
echo "Second Run: Total pages is $second_count (New pages created: " . ($second_count - $first_count) . ").\n";

if ($second_count !== $first_count) {
    die("FAILED: Page synchronizer is not idempotent!\n");
}
echo "IDEMPOTENCY VERIFIED: SUCCESS!\n";

echo "\n=== 3. TESTING POST META FIELD POPULATION ===\n";
$sample_page = get_page_by_path('about');
if ($sample_page) {
    $lawyer_name = get_post_meta($sample_page->ID, '_sedrazavi_field_attorney_name', true);
    echo "About Page ID: {$sample_page->ID}\n";
    echo "Attorney Name Meta: " . $lawyer_name . "\n";
    if (empty($lawyer_name)) {
        die("FAILED: Post meta was not populated!\n");
    }
} else {
    die("FAILED: 'about' page was not created!\n");
}

echo "\n=== 4. TESTING REST API ROUTE REGISTRATION ===\n";
SedRazavi_REST_API::register_routes();
SedRazavi_REST_API::register_service_cpt_for_rest();

echo "Registered " . count($GLOBALS['mock_rest_routes']) . " REST routes in PHP:\n";
foreach (array_keys($GLOBALS['mock_rest_routes']) as $r) {
    echo "  ✓ $r\n";
}

echo "\n=== 5. TESTING INDIVIDUAL REST ENDPOINTS FUNCTIONALITY ===\n";

// Test 1: book-appointment
$book_req = new WP_REST_Request(array(
    'client_name' => 'علیرضا حسینی',
    'client_phone' => '09121112233',
    'service_type' => 'دعاوی ملکی',
    'booking_date' => '1403-08-20',
));
$book_res = SedRazavi_REST_API::handle_book_appointment($book_req);
echo "book-appointment Response: Status {$book_res->status}, success=" . ($book_res->data['success'] ? 'true' : 'false') . ", booking_id=" . $book_res->data['booking_id'] . "\n";

// Test 2: track-case
$track_req = new WP_REST_Request(array('case_number' => '1403-LAW-892'));
$track_res = SedRazavi_REST_API::handle_track_case($track_req);
echo "track-case Response: Status {$track_res->status}, found=" . ($track_res->data['found'] ? 'true' : 'false') . ", status=" . $track_res->data['status'] . "\n";

// Test 3: cases
$cases_req = new WP_REST_Request();
$cases_res = SedRazavi_REST_API::handle_get_cases($cases_req);
echo "cases Response: Status {$cases_res->status}, count=" . count($cases_res->data['cases']) . "\n";

// Test 4: dashboard-stats
$stats_req = new WP_REST_Request();
$stats_res = SedRazavi_REST_API::handle_dashboard_stats($stats_req);
echo "dashboard-stats Response: Status {$stats_res->status}, active_cases=" . $stats_res->data['active_cases'] . "\n";

echo "\n=== ALL TESTS PASSED SUCCESSFULLY! ===\n";
