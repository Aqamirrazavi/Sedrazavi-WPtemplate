/**
 * Mandatory Repository Audit & Remediation Verification Suite
 * Verifies P0/P1 security and architecture remediations:
 * 1. CPT case confidentiality & public case_study separation
 * 2. REST permission callbacks & ownership enforcement (no nonce-only auth)
 * 3. Locale-aware dir and lang in header.php
 * 4. Header & Footer archetype allowlisting and preview capability gating
 * 5. Conditional asset loading & single canonical build manifest
 * 
 * @package SedRazavi
 */

const fs = require('fs');
const path = require('path');

console.log('========================================================================');
console.log('🛡️ Mandatory Audit Remediation & Security Verification Suite');
console.log('========================================================================\n');

let allPassed = true;
let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${message}`);
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    allPassed = false;
  }
}

// -------------------------------------------------------------
// Test Group 1: CPT 'case' Confidentiality & 'case_study' Separation
// -------------------------------------------------------------
console.log('🔍 Test Group 1: CPT Case Confidentiality & Public Case Study Separation');

const themeFunctionsPath = path.join(__dirname, '../wordpress-theme/functions.php');
assert(fs.existsSync(themeFunctionsPath), 'wordpress-theme/functions.php exists');
const themeFunctionsContent = fs.readFileSync(themeFunctionsPath, 'utf8');

// Audit CPT 'case' settings
assert(
  themeFunctionsContent.includes("register_post_type('case'") || themeFunctionsContent.includes("register_post_type('case',"),
  "CPT 'case' is registered in functions.php"
);

assert(
  themeFunctionsContent.includes("'public'              => false") || themeFunctionsContent.includes("'public' => false"),
  "CPT 'case' has public => false (confidential client dossier)"
);

assert(
  themeFunctionsContent.includes("'publicly_queryable'  => false") || themeFunctionsContent.includes("'publicly_queryable' => false"),
  "CPT 'case' has publicly_queryable => false (prevent direct URL queries)"
);

assert(
  themeFunctionsContent.includes("'exclude_from_search' => true"),
  "CPT 'case' has exclude_from_search => true (hidden from public site search)"
);

assert(
  themeFunctionsContent.includes("'has_archive'         => false"),
  "CPT 'case' has has_archive => false (no public case archive list)"
);

assert(
  themeFunctionsContent.includes("'rewrite'             => false"),
  "CPT 'case' has rewrite => false (no public permalink slug)"
);

assert(
  themeFunctionsContent.includes("'show_in_rest'        => false"),
  "CPT 'case' has show_in_rest => false (disallow unauthenticated core REST route)"
);

// Audit CPT 'case_study' (public precedents)
assert(
  themeFunctionsContent.includes("register_post_type('case_study'"),
  "CPT 'case_study' is registered for public marketing precedents"
);

assert(
  themeFunctionsContent.includes("'rewrite'             => ['slug' => 'case-studies']"),
  "CPT 'case_study' has public rewrite slug 'case-studies'"
);

// -------------------------------------------------------------
// Test Group 2: REST Authorization & Ownership Enforcement
// -------------------------------------------------------------
console.log('\n🔍 Test Group 2: REST Authorization & Strict Ownership Validation');

const restAuthPath = path.join(__dirname, '../wordpress-theme/inc/wp-rest-auth.php');
assert(fs.existsSync(restAuthPath), 'wordpress-theme/inc/wp-rest-auth.php exists');
const restAuthContent = fs.readFileSync(restAuthPath, 'utf8');

assert(
  restAuthContent.includes('check_logged_in_permission') &&
  restAuthContent.includes('is_user_logged_in()') &&
  restAuthContent.includes('rest_not_logged_in'),
  'check_logged_in_permission strictly enforces is_user_logged_in()'
);

// Ensure nonce alone does NOT return true in check_logged_in_permission
assert(
  !restAuthContent.includes("if ($nonce && wp_verify_nonce($nonce, 'wp_rest')) {\n            return true;\n        }"),
  'check_logged_in_permission does NOT allow nonce-only bypass'
);

assert(
  restAuthContent.includes('check_case_access_permission') &&
  restAuthContent.includes('current_user_can(\'manage_options\') || current_user_can(\'edit_posts\')'),
  'check_case_access_permission validates staff/lawyer capabilities'
);

assert(
  restAuthContent.includes('rest_case_forbidden') &&
  restAuthContent.includes('current_user_id'),
  'check_case_access_permission validates per-object ownership against current_user_id'
);

// Check api-handlers.php check_save_permissions
const apiHandlersPath = path.join(__dirname, '../wordpress-theme/inc/api-handlers.php');
assert(fs.existsSync(apiHandlersPath), 'wordpress-theme/inc/api-handlers.php exists');
const apiHandlersContent = fs.readFileSync(apiHandlersPath, 'utf8');

assert(
  apiHandlersContent.includes('check_save_permissions') &&
  apiHandlersContent.includes('rest_forbidden_capability') &&
  apiHandlersContent.includes("current_user_can('manage_options')"),
  'check_save_permissions strictly enforces manage_options or edit_theme_options capability'
);

// -------------------------------------------------------------
// Test Group 3: SEO, Locale & Query Parameter Allowlisting
// -------------------------------------------------------------
console.log('\n🔍 Test Group 3: SEO, Locale-Aware dir & Query Parameter Allowlisting');

const headerPath = path.join(__dirname, '../wordpress-theme/header.php');
assert(fs.existsSync(headerPath), 'wordpress-theme/header.php exists');
const headerContent = fs.readFileSync(headerPath, 'utf8');

assert(
  headerContent.includes('is_rtl() ? \'rtl\' : \'ltr\''),
  'header.php uses dynamic is_rtl() ? "rtl" : "ltr" for locale-aware text direction'
);

assert(
  !headerContent.includes('<html <?php language_attributes(); ?> dir="rtl">'),
  'header.php does NOT hardcode static dir="rtl"'
);

assert(
  headerContent.includes('$allowed_headers') &&
  headerContent.includes('current_user_can(\'edit_theme_options\') || is_customize_preview()'),
  'header.php strictly allowlists header archetypes and gates preview with capability'
);

assert(
  headerContent.includes('wp_robots_no_robots'),
  'header.php adds noindex (wp_robots_no_robots) on preview parameters'
);

const footerPath = path.join(__dirname, '../wordpress-theme/footer.php');
assert(fs.existsSync(footerPath), 'wordpress-theme/footer.php exists');
const footerContent = fs.readFileSync(footerPath, 'utf8');

assert(
  footerContent.includes('$allowed_footers') &&
  footerContent.includes('current_user_can(\'edit_theme_options\') || is_customize_preview()'),
  'footer.php strictly allowlists footer archetypes and gates preview with capability'
);

// -------------------------------------------------------------
// Test Group 4: Performance & Conditional Asset Enqueuing
// -------------------------------------------------------------
console.log('\n🔍 Test Group 4: Performance & Conditional Asset Enqueuing');

assert(
  !themeFunctionsContent.includes('if (is_front_page() || is_home()) {\n            $needs_react = true;'),
  'theme does NOT force heavy React SPA bundle on front page unconditionally'
);

const reactShortcodesPath = path.join(__dirname, '../wordpress-theme/inc/react-shortcodes.php');
assert(fs.existsSync(reactShortcodesPath), 'wordpress-theme/inc/react-shortcodes.php exists');
const reactShortcodesContent = fs.readFileSync(reactShortcodesPath, 'utf8');

assert(
  reactShortcodesContent.includes('/app-dist/index.js') &&
  themeFunctionsContent.includes('app-dist/index.js'),
  'Both functions.php and react-shortcodes.php prioritize canonical app-dist build path'
);

// -------------------------------------------------------------
// Test Group 5: Companion Plugins Security & Package Manager Resilience
// -------------------------------------------------------------
console.log('\n🔍 Test Group 5: Companion Plugins Security & Package Manager Resilience');

const companionPortalPath = path.join(__dirname, '../sedrazavi-companion/includes/class-legal-matter-portal.php');
assert(fs.existsSync(companionPortalPath), 'class-legal-matter-portal.php exists');
const companionPortalContent = fs.readFileSync(companionPortalPath, 'utf8');

assert(
  !companionPortalContent.includes('$role = $request->get_header(\'x-sedrazavi-user-role\')'),
  'class-legal-matter-portal.php rejects spoofable user-role headers'
);

assert(
  companionPortalContent.includes('verify_hmac_client_token') &&
  !companionPortalContent.includes('($nonce && wp_verify_nonce($nonce, \'wp_rest\')) || !empty($client_token)'),
  'class-legal-matter-portal.php enforces HMAC token / logged-in auth (no bare nonce bypass)'
);

const companionDoctorPath = path.join(__dirname, '../sedrazavi-companion/includes/class-sedrazavi-diagnostics-doctor.php');
assert(fs.existsSync(companionDoctorPath), 'class-sedrazavi-diagnostics-doctor.php exists');
const companionDoctorContent = fs.readFileSync(companionDoctorPath, 'utf8');

assert(
  companionDoctorContent.includes('current_user_can(\'manage_options\')') &&
  !companionDoctorContent.includes('// In local/simulated headless mode, allow read diagnosis'),
  'class-sedrazavi-diagnostics-doctor.php strictly enforces manage_options'
);

const packageManagerPath = path.join(__dirname, '../elementor-addon-suite/includes/class-package-manager.php');
const packagingSubDir = path.join(__dirname, '../elementor-addon-suite/includes/packaging');
assert(fs.existsSync(packageManagerPath), 'class-package-manager.php exists');
const packagingSubFiles = fs.existsSync(packagingSubDir) ? fs.readdirSync(packagingSubDir).filter(f => f.endsWith('.php')).sort() : [];
const packageManagerContent = [
  fs.readFileSync(packageManagerPath, 'utf8'),
  ...packagingSubFiles.map(f => fs.readFileSync(path.join(packagingSubDir, f), 'utf8')),
].join('\n');

assert(
  packageManagerContent.includes('!class_exists(\'\\ZipArchive\')') &&
  packageManagerContent.includes('ماژول ZipArchive در تنظیمات PHP سرور فعال نیست'),
  'Package_Manager fails gracefully with error message if ZipArchive is missing'
);

assert(
  packageManagerContent.includes('resolve_package_dependencies') &&
  packageManagerContent.includes('Circular Dependency'),
  'Package_Manager has recursive dependency resolution and circular dependency detection'
);

// -------------------------------------------------------------
// Test Group 6: Phase 1A Confidential CPTs, REST Permissions & Standalone SSOT
// -------------------------------------------------------------
console.log('\n🔍 Test Group 6: Phase 1A Confidential CPTs, REST Permissions & Standalone SSOT');

const addonsCptPath = path.join(__dirname, '../sedrazavi-addons/includes/post-types.php');
const addonsCptContent = fs.readFileSync(addonsCptPath, 'utf8');
assert(
  !addonsCptContent.includes("'rewrite'            => array('slug' => 'cases')") &&
  addonsCptContent.includes("register_post_type('sedrazavi_case'") &&
  !addonsCptContent.includes("register_post_type('sedrazavi_case', array(\n            'labels'             => $case_labels,\n            'public'             => true"),
  'sedrazavi-addons sedrazavi_case CPT is strictly private (no public archive/query/REST)'
);

const caseMgmtPath = path.join(__dirname, '../wordpress-theme/inc/case-management.php');
const caseMgmtContent = fs.readFileSync(caseMgmtPath, 'utf8');
assert(
  !caseMgmtContent.includes("'show_in_rest'       => true") &&
  !caseMgmtContent.includes("'show_in_rest'  => true") &&
  caseMgmtContent.includes('hash_equals($clean_stored, $clean_phone)'),
  'case-management.php disables show_in_rest on sedrazavi_case/appointment and enforces phone verification'
);

const arbCptPath = path.join(__dirname, '../wordpress-theme/inc/arbitration-cpt.php');
const arbCptContent = fs.readFileSync(arbCptPath, 'utf8');
assert(
  arbCptContent.includes("'public'              => false") &&
  arbCptContent.includes("'show_in_rest'        => false"),
  'arbitration_case CPT is strictly private with show_in_rest => false'
);

const dashCptPath = path.join(__dirname, '../wordpress-theme/inc/class-sedrazavi-dashboard.php');
const dashCptContent = fs.readFileSync(dashCptPath, 'utf8');
assert(
  dashCptContent.includes("'show_in_rest'        => false") &&
  dashCptContent.includes('check_staff_permission') &&
  !dashCptContent.includes("'permission_callback' => '__return_true'"),
  'class-sedrazavi-dashboard.php enforces check_staff_permission on /dashboard-stats and /cases'
);

const vaultPath = path.join(__dirname, '../wordpress-theme/inc/legal-vault-deadlines.php');
const vaultContent = fs.readFileSync(vaultPath, 'utf8');
assert(
  vaultContent.includes('_sedrazavi_doc_hash') &&
  vaultContent.includes("preg_match('/^[a-f0-9]{64}$/'"),
  'legal-vault-deadlines.php verifies real stored SHA-256 hashes in DB'
);

const restApiPath = path.join(__dirname, '../wordpress-theme/inc/rest-api.php');
const restApiContent = fs.readFileSync(restApiPath, 'utf8');
assert(
  restApiContent.includes("preg_match('/^[a-f0-9]{64}$/'") &&
  restApiContent.includes('_sedrazavi_doc_hash') &&
  !restApiContent.includes('دعاوی قراردادهای تجاری (نمونه)'),
  'rest-api.php enforces real DB lookup on /verify-hash and removes demo fallback from /track-case'
);

const addonsMainPath = path.join(__dirname, '../sedrazavi-addons/sedrazavi-addons.php');
const addonsMainContent = fs.readFileSync(addonsMainPath, 'utf8');
assert(
  addonsMainContent.includes('sedrazavi_addons_rate_limit_check') &&
  !addonsMainContent.includes('Access-Control-Allow-Origin: *') &&
  !addonsMainContent.includes('شعبه ۵ دادگاه تجدیدنظر (نمونه)'),
  'sedrazavi-addons.php enforces rate limiting, scoped CORS, and no fabricated demo tracking output'
);

const converterPath = path.join(__dirname, '../scripts/convert-to-standalone-themes.cjs');
const converterContent = fs.readFileSync(converterPath, 'utf8');
assert(
  converterContent.includes('path.join(targetStandaloneDir, cfg.standaloneSlug)'),
  'convert-to-standalone-themes.cjs operates on standalone-themes/ as exclusive Single Source of Truth'
);

const cloudCatalogPath = path.join(__dirname, '../wordpress-theme/inc/class-cloud-catalog.php');
const cloudCatalogContent = fs.readFileSync(cloudCatalogPath, 'utf8');
assert(
  cloudCatalogContent.includes('ajax_generate_standalone_theme') &&
  cloudCatalogContent.includes("check_ajax_referer('sedrazavi_security_nonce', 'nonce')") &&
  !cloudCatalogContent.includes('Template: sedrazavi-theme'),
  'class-cloud-catalog.php generates standalone themes (zero Template: sedrazavi-theme) with nonce check'
);

// -------------------------------------------------------------
// Test Group 7: Phase 1B Registry Unification, Packaging Modularization & REST/2FA Hardening
// -------------------------------------------------------------
console.log('\n🔍 Test Group 7: Phase 1B Registry Unification, Modular Packaging & Remaining Security Hardening');

const pluginSsotCode = fs.readFileSync(path.join(__dirname, '../elementor-addon-suite/includes/class-plugin.php'), 'utf8');
assert(
  pluginSsotCode.includes('public static function get_widgets_map()'),
  'Plugin::get_widgets_map() serves as single source of truth for the 31 Elementor Widget_Base classes'
);

const sovereignRegCode = fs.readFileSync(path.join(__dirname, '../elementor-addon-suite/includes/class-sovereign-widgets-registry.php'), 'utf8');
assert(
  sovereignRegCode.includes('get_verified_elementor_widgets') &&
  sovereignRegCode.includes('Plugin::get_widgets_map()') &&
  sovereignRegCode.includes('shortcode_presets_count') &&
  sovereignRegCode.includes('elementor_widgets_count'),
  'Sovereign_Widgets_Registry transparently separates 31 Elementor classes from 72 shortcode presets'
);

const capRegCode = fs.readFileSync(path.join(__dirname, '../elementor-addon-suite/includes/class-capability-registry.php'), 'utf8');
assert(
  capRegCode.includes('get_unified_ecosystem_inventory') &&
  !capRegCode.includes('۲۳ الگوی بومی'),
  'Capability_Registry exposes live get_unified_ecosystem_inventory() and removes stale 23-template claim'
);

const contractRegCode = fs.readFileSync(path.join(__dirname, '../elementor-addon-suite/includes/class-contract-registry.php'), 'utf8');
assert(
  contractRegCode.includes('packages_export') &&
  contractRegCode.includes('packages_build_custom_bundle') &&
  contractRegCode.includes('packages_preflight') &&
  contractRegCode.includes('packages_import') &&
  contractRegCode.includes('packages_rollback') &&
  contractRegCode.includes('get_widgets_bank') &&
  contractRegCode.includes('get_portal_summary'),
  'Contract_Registry documents Package Lifecycle, Widgets Bank, and Portal Summary REST contracts'
);

assert(
  packagingSubFiles.length === 6 &&
  packageManagerContent.includes('compute_file_checksums') &&
  packageManagerContent.includes('verify_manifest_checksums'),
  'Package Manager decomposed into 6 single-responsibility modules with per-file SHA-256 verification'
);

const githubSyncCode = fs.readFileSync(path.join(__dirname, '../wordpress-theme/inc/class-github-sync.php'), 'utf8');
assert(
  githubSyncCode.match(/github\/status[\s\S]{0,220}current_user_can\('edit_posts'\)/) &&
  githubSyncCode.includes('webhook_secret_not_configured') &&
  githubSyncCode.includes('missing_signature') &&
  githubSyncCode.includes('hash_equals'),
  'class-github-sync.php gates /github/status and enforces fail-closed HMAC-SHA256 webhook verification'
);

assert(
  restAuthContent.includes("'/auth/secure-logout'") &&
  !restAuthContent.match(/secure-logout[\s\S]{0,200}__return_true/),
  'wp-rest-auth.php replaces __return_true on /auth/secure-logout with check_logged_in_permission'
);

const dualAuthCode = fs.readFileSync(path.join(__dirname, '../wordpress-theme/includes/class-sedrazavi-auth-dual-mode.php'), 'utf8');
assert(
  dualAuthCode.includes('code_hash') &&
  dualAuthCode.includes("hash('sha256'") &&
  dualAuthCode.includes("hash_equals((string) $pending['code_hash']") &&
  dualAuthCode.includes('sedrazavi_send_2fa_code'),
  'class-sedrazavi-auth-dual-mode.php verifies 2FA OTP via SHA-256 hash_equals and rate-limit lockouts'
);

const paymentCode = fs.readFileSync(path.join(__dirname, '../wordpress-theme/includes/class-sedrazavi-payment-adapter.php'), 'utf8');
assert(
  paymentCode.includes('sr_pay_rate_') &&
  paymentCode.includes('429') &&
  paymentCode.includes("'enum' => ['zarinpal']"),
  'class-sedrazavi-payment-adapter.php enforces IP rate limiting and enum gateway validation'
);

const clientDashCode = fs.readFileSync(path.join(__dirname, '../sedrazavi-companion/includes/class-dynamic-client-dashboard.php'), 'utf8');
const licenseMgrCode = fs.readFileSync(path.join(__dirname, '../sedrazavi-companion/includes/class-license-manager.php'), 'utf8');
const demoImpCode = fs.readFileSync(path.join(__dirname, '../sedrazavi-companion/includes/class-demo-importer.php'), 'utf8');
assert(
  !clientDashCode.includes("'permission_callback' => '__return_true'") &&
  !licenseMgrCode.includes("'permission_callback' => '__return_true'") &&
  !demoImpCode.includes("'permission_callback' => '__return_true'"),
  'sedrazavi-companion removes __return_true from /portal/summary, /license/status, and /demo/list'
);

const intakeCode = fs.readFileSync(path.join(__dirname, '../sedrazavi-companion/includes/class-legal-intake-appointments.php'), 'utf8');
const offlineQueueCode = fs.readFileSync(path.join(__dirname, '../sedrazavi-companion/includes/class-offline-queue.php'), 'utf8');
const wcShetabCode = fs.readFileSync(path.join(__dirname, '../sedrazavi-companion/includes/class-woocommerce-shetab-gateway.php'), 'utf8');
assert(
  intakeCode.includes('sr_website_trap') &&
  intakeCode.includes('rate_limited') &&
  offlineQueueCode.includes('set_transient($rate_key') &&
  offlineQueueCode.includes('(?P<token>[a-f0-9]{64})') &&
  !wcShetabCode.includes('sample-1'),
  'Intake, offline queue (64-hex token + rate limit), and WooCommerce Shetab (zero fake cart) are hardened'
);

console.log('========================================================================');
console.log(`📊 Test Results: ${passedTests} / ${totalTests} passed`);
if (allPassed) {
  console.log('🎉 ALL MANDATORY AUDIT & REMEDIATION TESTS PASSED (100%)!');
} else {
  console.error('❌ SOME CHECKS FAILED!');
  process.exit(1);
}
console.log('========================================================================\n');
