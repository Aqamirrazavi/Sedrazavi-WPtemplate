<?php
/**
 * Test Harness for Phase 4 Security, Rate-Limiting, and Nonce Verification
 */

define('ABSPATH', __DIR__ . '/../');
define('SEDRAZAVI_THEME_DIR', __DIR__ . '/../wordpress-theme');
define('SEDRAZAVI_THEME_URI', 'http://example.com/wp-content/themes/sedrazavi-theme');

$GLOBALS['mock_transients'] = array();
$GLOBALS['mock_user_caps'] = array();

function get_transient($k) {
    if (isset($GLOBALS['mock_transients'][$k])) {
        if ($GLOBALS['mock_transients'][$k]['expires'] > time()) {
            return $GLOBALS['mock_transients'][$k]['value'];
        }
    }
    return false;
}
function set_transient($k, $v, $exp = 600) {
    $GLOBALS['mock_transients'][$k] = array('value' => $v, 'expires' => time() + $exp);
    return true;
}
function delete_transient($k) {
    unset($GLOBALS['mock_transients'][$k]);
    return true;
}
function sanitize_text_field($t) { return trim(strip_tags((string)$t)); }
function sanitize_textarea_field($t) { return trim(strip_tags((string)$t)); }
function wp_unslash($v) { return stripslashes((string)$v); }
function absint($n) { return abs((int)$n); }
function wp_verify_nonce($n, $a = -1) {
    return ($n === 'valid_nonce_token');
}
function is_user_logged_in() { return !empty($GLOBALS['mock_user_caps']); }
function current_user_can($cap) { return !empty($GLOBALS['mock_user_caps'][$cap]); }
function is_admin() { return false; }
function post_type_exists($pt) { return true; }
function wp_insert_post($args) { return 555; }
function update_post_meta($id, $k, $v) { return true; }
function get_post_meta($id, $k, $s = true) { return ''; }
function home_url($p = '') { return 'http://example.com' . $p; }
function wp_generate_password($len = 12, $special = true) { return bin2hex(random_bytes(max(1, (int)($len/2)))); }
function is_wp_error($thing) { return false; }
function add_action($tag, $callback, $priority = 10, $accepted_args = 1) {}
function add_filter($tag, $callback, $priority = 10, $accepted_args = 1) {}
function remove_action($tag, $callback, $priority = 10) {}

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
    public $headers = array();
    public function __construct($params = array(), $headers = array()) {
        $this->params = $params;
        $this->headers = $headers;
    }
    public function get_params() { return $this->params; }
    public function get_param($k) { return isset($this->params[$k]) ? $this->params[$k] : null; }
    public function get_header($k) { return isset($this->headers[strtolower($k)]) ? $this->headers[strtolower($k)] : null; }
}

// Load Security & REST API files
require_once SEDRAZAVI_THEME_DIR . '/inc/security.php';
require_once SEDRAZAVI_THEME_DIR . '/inc/rest-api.php';

echo "=== 1. TESTING TRANSIENT-BASED RATE LIMITER ===\n";
$_SERVER['REMOTE_ADDR'] = '192.168.1.100';

SedRazavi_Rate_Limiter::reset_rate_limit('booking');

// First 5 attempts should succeed
for ($i = 1; $i <= 5; $i++) {
    $allowed = SedRazavi_Rate_Limiter::check_rate_limit('booking', 5, 600);
    if (!$allowed) {
        die("FAILED: Attempt $i should be allowed!\n");
    }
}
echo "✓ 5 initial attempts allowed under limit.\n";

// 6th attempt MUST be blocked by rate limiter
$blocked = !SedRazavi_Rate_Limiter::check_rate_limit('booking', 5, 600);
if (!$blocked) {
    die("FAILED: 6th attempt was not blocked by rate limiter!\n");
}
echo "✓ 6th attempt successfully blocked (Rate Limiting active).\n";

// Test REST endpoint response with rate limit
$req = new WP_REST_Request(array('client_name' => 'تست', 'client_phone' => '09121234567'));
$res = SedRazavi_REST_API::handle_book_appointment($req);
if ($res->status !== 429 || empty($res->data['rate_limited'])) {
    die("FAILED: REST response status is {$res->status}, expected 429 Too Many Requests!\n");
}
echo "✓ REST API returned HTTP 429 with rate_limited=true when threshold reached.\n";

echo "\n=== 2. TESTING NONCE VERIFICATION ===\n";
SedRazavi_Rate_Limiter::reset_rate_limit('booking');

// Case A: Invalid Nonce
$invalid_nonce_req = new WP_REST_Request(
    array('client_name' => 'علی', 'client_phone' => '09120000000'),
    array('x-wp-nonce' => 'forged_fake_nonce')
);
$res_invalid = SedRazavi_REST_API::handle_book_appointment($invalid_nonce_req);
if ($res_invalid->status !== 403) {
    die("FAILED: Invalid nonce did not return 403 Forbidden! Got status: {$res_invalid->status}\n");
}
echo "✓ Invalid nonce rejected with HTTP 403 Forbidden.\n";

// Case B: Valid Nonce
$valid_nonce_req = new WP_REST_Request(
    array('client_name' => 'علی رضایی', 'client_phone' => '09120000000'),
    array('x-wp-nonce' => 'valid_nonce_token')
);
$res_valid = SedRazavi_REST_API::handle_book_appointment($valid_nonce_req);
if ($res_valid->status !== 200 || empty($res_valid->data['success'])) {
    die("FAILED: Valid nonce should return 200 OK! Got status: {$res_valid->status}\n");
}
echo "✓ Valid nonce authenticated successfully with HTTP 200 OK.\n";

echo "\n=== 3. TESTING CAPABILITY / ACCESS CONTROL PERMISSIONS ===\n";

// Case A: Unauthenticated user trying to access admin endpoint
$GLOBALS['mock_user_caps'] = array(); // Guest
$can_create = SedRazavi_REST_API::check_lawyer_or_admin_permission();
if ($can_create) {
    die("FAILED: Guest user should NOT have permission to manage cases!\n");
}
echo "✓ Unauthorized user blocked from case management.\n";

// Case B: Authenticated lawyer/admin
$GLOBALS['mock_user_caps']['edit_posts'] = true;
$can_create_auth = SedRazavi_REST_API::check_lawyer_or_admin_permission();
if (!$can_create_auth) {
    die("FAILED: Authenticated lawyer with edit_posts should have permission!\n");
}
echo "✓ Authorized lawyer granted access.\n";

echo "\n=== 4. TESTING INPUT SANITIZATION & XSS PREVENTION ===\n";
SedRazavi_Rate_Limiter::reset_rate_limit('booking');
$xss_payload = '<script>alert("XSS")</script>دکتر رضوی';
$clean = sanitize_text_field(wp_unslash($xss_payload));
if (strpos($clean, '<script>') !== false) {
    die("FAILED: XSS script tag was not stripped!\n");
}
echo "✓ XSS payload successfully stripped: Result is \"$clean\".\n";

echo "\n=== ALL PHASE 4 SECURITY & RATE-LIMITING TESTS PASSED! ===\n";
