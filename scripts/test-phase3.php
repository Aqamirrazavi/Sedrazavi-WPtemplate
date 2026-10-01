<?php
/**
 * Test Harness for Phase 3 SEO Verification
 */

define('ABSPATH', __DIR__ . '/../');
define('SEDRAZAVI_THEME_DIR', __DIR__ . '/../wordpress-theme');
define('SEDRAZAVI_THEME_URI', 'http://example.com/wp-content/themes/sedrazavi-theme');

$GLOBALS['mock_theme_mods'] = array();
$GLOBALS['mock_is_front_page'] = true;
$GLOBALS['mock_is_singular'] = false;
$GLOBALS['mock_post'] = (object) array('ID' => 1, 'post_title' => 'خدمات دعاوی ملکی', 'post_content' => 'متن آزمایشی مشاوره ملکی');

function get_bloginfo($show = 'name') {
    if ($show === 'name') return 'دفتر وکالت دکتر سیده مریم رضوی';
    if ($show === 'description') return 'مشاوره حقوقی تخصصی، داوری تجاری و وکالت پایه یک دادگستری';
    if ($show === 'admin_email') return 'info@sedrazavi.com';
    if ($show === 'charset') return 'UTF-8';
    return '';
}
function home_url($p = '') { return 'http://example.com' . $p; }
function get_permalink($id = 0) { return 'http://example.com/property-law-service/'; }
function single_post_title($p = '', $display = true) { return 'خدمات دعاوی ملکی'; }
function get_the_archive_title() { return 'آرشیو مقالات'; }
function get_search_query() { return 'داوری'; }
function wp_get_document_title() { return 'عنوان مستند'; }
function is_front_page() { return $GLOBALS['mock_is_front_page']; }
function is_home() { return $GLOBALS['mock_is_front_page']; }
function is_singular() { return $GLOBALS['mock_is_singular']; }
function is_single() { return $GLOBALS['mock_is_singular']; }
function is_page() { return false; }
function is_archive() { return false; }
function is_search() { return false; }
function is_404() { return false; }
function has_excerpt() { return false; }
function get_the_excerpt() { return ''; }
function get_post() { return $GLOBALS['mock_post']; }
function has_post_thumbnail() { return false; }
function get_the_post_thumbnail_url($p = null, $s = 'full') { return ''; }
function get_template_directory_uri() { return 'http://example.com/wp-content/themes/sedrazavi-theme'; }
function get_theme_mod($k, $default = '') { return isset($GLOBALS['mock_theme_mods'][$k]) ? $GLOBALS['mock_theme_mods'][$k] : $default; }
function esc_html($s) { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }
function esc_attr($s) { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }
function esc_url($s) { return $s; }
function wp_strip_all_tags($s) { return strip_tags($s); }
function wp_trim_words($s, $n = 30, $m = '...') { return mb_substr(strip_tags($s), 0, 150) . $m; }
function add_query_arg($a, $u) { return $u; }
function wp_json_encode($d, $flags = 0) { return json_encode($d, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT); }

// Load SEO Bridge
require_once SEDRAZAVI_THEME_DIR . '/inc/seo-bridge.php';

echo "=== 1. TESTING FRONT PAGE DYNAMIC SEO GENERATION ===\n";
ob_start();
sedrazavi_render_dynamic_seo_tags();
$seo_output = ob_get_clean();

// Check Dynamic Title
if (strpos($seo_output, '<title>دفتر وکالت دکتر سیده مریم رضوی | مشاوره حقوقی تخصصی') === false) {
    die("FAILED: Title is not properly hydrated from get_bloginfo!\n");
}
echo "✓ Dynamic <title> verified: contains bloginfo name and description.\n";

// Check Canonical and OG URL
if (strpos($seo_output, '<link rel="canonical" href="http://example.com/" />') === false) {
    die("FAILED: Canonical URL is not dynamically generated with home_url!\n");
}
echo "✓ Dynamic canonical URL verified: rewrites to home_url('/').\n";

if (strpos($seo_output, '<meta property="og:url" content="http://example.com/" />') === false) {
    die("FAILED: og:url is not dynamically generated with home_url!\n");
}
echo "✓ Dynamic og:url verified: rewrites to home_url('/').\n";

// Check OG Image and Logo: MUST NOT be stock Unsplash!
if (strpos($seo_output, 'images.unsplash.com') !== false) {
    die("FAILED: Output contains stock Unsplash image!\n");
}
echo "✓ Unsplash check passed: NO stock Unsplash URLs found in SEO tags.\n";

if (strpos($seo_output, 'screenshot.png') === false) {
    die("FAILED: Default placeholder image is not screenshot.png!\n");
}
echo "✓ Placeholder verified: local screenshot.png used as high-fidelity fallback.\n";

// Check Schema.org JSON-LD (LegalService & Attorney)
if (strpos($seo_output, '"@type": "LegalService"') === false || strpos($seo_output, '"@type": "Attorney"') === false) {
    die("FAILED: Schema.org JSON-LD does not contain LegalService and Attorney types!\n");
}
echo "✓ Schema.org JSON-LD verified: LegalService and Attorney schemas present.\n";

// Check Schema Dynamic IDs & URLs
if (strpos($seo_output, '"@id": "http://example.com/#organization"') === false) {
    die("FAILED: Schema @id does not use home_url()!\n");
}
echo "✓ Schema @id verified: uses dynamic home_url('/#organization').\n";

echo "\n=== 2. TESTING CUSTOMIZER OVERRIDES ===\n";
$GLOBALS['mock_theme_mods']['sedrazavi_seo_og_image'] = 'http://example.com/uploads/custom-lawyer-banner.jpg';
$GLOBALS['mock_theme_mods']['sedrazavi_seo_logo'] = 'http://example.com/uploads/custom-firm-logo.svg';

ob_start();
sedrazavi_render_dynamic_seo_tags();
$custom_seo_output = ob_get_clean();

if (strpos($custom_seo_output, 'custom-lawyer-banner.jpg') === false) {
    die("FAILED: Customizer og:image override did not take effect!\n");
}
echo "✓ Customizer og:image upload verified: custom image rendered.\n";

if (strpos($custom_seo_output, 'custom-firm-logo.svg') === false) {
    die("FAILED: Customizer logo upload did not take effect in schema!\n");
}
echo "✓ Customizer logo upload verified: custom logo rendered in Schema JSON-LD.\n";

echo "\n=== ALL PHASE 3 SEO TESTS PASSED SUCCESSFULLY! ===\n";
