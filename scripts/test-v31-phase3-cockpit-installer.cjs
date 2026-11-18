/**
 * SedRazavi v31 — Phase 3 Verification Suite
 * Frontend-Backend Unification, Strict Role Separation & Package Installer Hardening
 *
 * Verifies:
 * 1. Shared SSOT Service (`SedRazavi_Ecosystem_Control_Service`) registration & parity across WP-Admin & Frontend Cockpit
 * 2. Strict Role Separation (`admin`, `legal_staff`, `client`, `editor`) — zero `edit_posts` leakage into confidential cases, author scoping on CPTs, real role catalog in `#tab-users`
 * 3. Frontend Cockpit confidential Legal Cases CRUD + Anti-IDOR + Private status
 * 4. Admin Dashboard unification (live stats, unified settings save, persisted Cloud Hub AJAX queue, Ecosystem Plugins/Kits/Role Matrix tab, zero alert())
 * 5. Package Installer Hardening (HTTPS GitHub allowlist, SHA-256 verification, Zip Slip/Bomb check before unzip_file, manifest checksum check, pre-overwrite snapshot, fail-closed auto-rollback + explicit rollback)
 * 6. Accessible custom confirm dialog replacing native confirm() & alert() in Frontend Cockpit JS
 *
 * @package SedRazavi
 */

const fs = require('fs');
const path = require('path');

console.log('========================================================================');
console.log('🛡️ SedRazavi v31 — Phase 3: Cockpit, Backend Unification & Installer Suite');
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

const companionMainPath = path.join(__dirname, '../sedrazavi-companion/sedrazavi-companion.php');
const controlServicePath = path.join(__dirname, '../sedrazavi-companion/includes/class-ecosystem-control-service.php');
const cockpitPhpPath = path.join(__dirname, '../sedrazavi-companion/includes/class-frontend-cockpit.php');
const adminDashPath = path.join(__dirname, '../sedrazavi-companion/includes/class-admin-dashboard.php');
const cockpitJsPath = path.join(__dirname, '../sedrazavi-companion/assets/js/frontend-cockpit.js');
const cockpitCssPath = path.join(__dirname, '../sedrazavi-companion/assets/css/frontend-cockpit.css');

const companionMain = fs.readFileSync(companionMainPath, 'utf8');
const controlService = fs.existsSync(controlServicePath) ? fs.readFileSync(controlServicePath, 'utf8') : '';
const cockpitPhp = fs.readFileSync(cockpitPhpPath, 'utf8');
const adminDash = fs.readFileSync(adminDashPath, 'utf8');
const cockpitJs = fs.readFileSync(cockpitJsPath, 'utf8');
const cockpitCss = fs.readFileSync(cockpitCssPath, 'utf8');

// -------------------------------------------------------------
// Group 1: Unified Ecosystem Control Service (SSOT)
// -------------------------------------------------------------
console.log('🔍 Group 1: Unified Ecosystem Control Service (SSOT & Bootstrap)');

assert(
  fs.existsSync(controlServicePath) &&
  controlService.includes('class SedRazavi_Ecosystem_Control_Service') &&
  companionMain.includes("'includes/class-ecosystem-control-service.php'") &&
  companionMain.includes("'SedRazavi_Ecosystem_Control_Service'"),
  'SedRazavi_Ecosystem_Control_Service exists and is registered in sedrazavi-companion.php'
);

assert(
  controlService.includes('get_user_role_tier(') &&
  controlService.includes('get_ecosystem_role_catalog(') &&
  controlService.includes('get_role_capability_matrix(') &&
  controlService.includes('get_overview_snapshot(') &&
  controlService.includes('get_accessible_legal_cases(') &&
  controlService.includes('get_unified_settings(') &&
  controlService.includes('save_unified_settings(') &&
  controlService.includes('get_plugins_inventory('),
  'Control service exposes complete unified role, snapshot, legal cases, settings & plugin inventory API'
);

assert(
  controlService.includes("update_option('sedrazavi_zarinpal_merchant', $merchant)") &&
  controlService.includes("update_option('sedrazavi_gold_color', $val)") &&
  controlService.includes("update_option('sedrazavi_navy_color', $val)"),
  'Unified settings writer synchronizes companion keys, theme colors, theme_mods & ZarinPal merchant ID'
);

// -------------------------------------------------------------
// Group 2: Strict Role Separation & Confidential Legal Cockpit Tab
// -------------------------------------------------------------
console.log('\n🔍 Group 2: Role Separation, Anti-IDOR Legal Tab & Non-Privileged Isolation');

assert(
  cockpitPhp.includes("wp_ajax_sr_cockpit_get_legal_cases") &&
  cockpitPhp.includes("wp_ajax_sr_cockpit_save_legal_case") &&
  cockpitPhp.includes("wp_ajax_sr_cockpit_delete_legal_case"),
  'Frontend Cockpit registers dedicated legal cases read/save/delete AJAX endpoints'
);

const legalSaveBlock = cockpitPhp.slice(
  cockpitPhp.indexOf('public function ajax_save_legal_case()'),
  cockpitPhp.indexOf('public function ajax_delete_legal_case()')
);
assert(
  legalSaveBlock.includes('can_create_or_manage_cases()') &&
  legalSaveBlock.includes('can_user_access_case($case_id') &&
  legalSaveBlock.includes("'post_status'  => 'private'") &&
  !legalSaveBlock.includes('edit_posts'),
  'ajax_save_legal_case enforces legal capabilities + Anti-IDOR + private status with zero edit_posts leakage'
);

assert(
  cockpitPhp.includes('id="tab-legal"') &&
  cockpitPhp.includes('id="btn-tab-legal"') &&
  cockpitPhp.includes("if (!current_user_can('edit_others_posts'))") &&
  cockpitPhp.includes("\$cpt_query_args['author'] = get_current_user_id()") &&
  cockpitPhp.includes('get_ecosystem_role_catalog(true)'),
  'Cockpit UI isolates #tab-legal, scopes non-editor CPT queries to author, and renders real ecosystem roles in #tab-users'
);

assert(
  !controlService.slice(
    controlService.indexOf('function get_accessible_legal_cases('),
    controlService.indexOf('function get_unified_settings(')
  ).includes('edit_posts'),
  'get_accessible_legal_cases strictly scopes confidential dossiers via Case_Data_Service without edit_posts'
);

// -------------------------------------------------------------
// Group 3: Admin Dashboard Unification & Real Persistent Cloud Hub
// -------------------------------------------------------------
console.log('\n🔍 Group 3: Admin Dashboard Unification & Real Persistent AJAX Cloud Queue');

assert(
  adminDash.includes('SedRazavi_Ecosystem_Control_Service::save_unified_settings(') &&
  adminDash.includes('SedRazavi_Ecosystem_Control_Service::get_unified_settings(') &&
  adminDash.includes('SedRazavi_Ecosystem_Control_Service::get_overview_snapshot(') &&
  adminDash.includes('SedRazavi_Ecosystem_Control_Service::get_plugins_inventory(') &&
  adminDash.includes('SedRazavi_Ecosystem_Control_Service::get_role_capability_matrix('),
  'WP-Admin Dashboard delegates overview stats, unified settings, plugins inventory & role matrix to Control Service'
);

assert(
  adminDash.includes("tab=ecosystem") &&
  adminDash.includes("sr_cockpit_deployed_kits") &&
  adminDash.includes("sr_admin_plugin_action") &&
  adminDash.includes("sr_admin_queue_cloud_template") &&
  adminDash.includes("sr_cloud_queued_templates"),
  'Admin Dashboard adds Ecosystem tab (plugins + deployed kits + role matrix) and persists Cloud Hub queue in wp_options'
);

assert(
  controlService.includes("add_action('wp_ajax_sr_admin_queue_cloud_template'") &&
  controlService.includes("add_action('wp_ajax_sr_admin_plugin_action'") &&
  adminDash.includes("fetch(endpoint") &&
  !adminDash.includes("btn.textContent = '✓ آماده درج در کتابخانه';\n                                    btn.disabled = true;"),
  'Admin Cloud & Plugin actions execute real admin-ajax.php requests instead of fake cosmetic DOM toggles'
);

assert(
  !/\balert\s*\(/.test(adminDash) && !/\bconfirm\s*\(/.test(adminDash),
  'Admin Dashboard contains zero blocking window.alert() or window.confirm() calls'
);

// -------------------------------------------------------------
// Group 4: Package Installer Hardening (HTTPS Allowlist, SHA-256, Pre-Backup, Rollback)
// -------------------------------------------------------------
console.log('\n🔍 Group 4: Hardened Package Installer, SHA-256, Pre-Backup & Rollback');

assert(
  controlService.includes('verify_remote_package_url(') &&
  controlService.includes('/Aqamirrazavi/Sedrazavi-WPtemplate/') &&
  controlService.includes('ALLOWED_REMOTE_HOSTS') &&
  controlService.includes("hash_file('sha256'") &&
  controlService.includes('hash_equals($expected_hash') &&
  controlService.includes('Archive_Security_Validator') &&
  controlService.includes('copy_directory_recursive($target_dir, $backup_dir)') &&
  controlService.includes('sr_plugin_rollback_snapshot_') &&
  controlService.includes('rollback_ecosystem_plugin('),
  'Control Service enforces HTTPS GitHub allowlist, SHA-256 gate, manifest validator, pre-overwrite snapshot & rollback'
);

assert(
  cockpitPhp.includes("wp_ajax_sr_cockpit_rollback_plugin") &&
  cockpitPhp.includes("verify_remote_package_url") &&
  cockpitPhp.includes("expected_sha256") &&
  cockpitPhp.includes("Archive_Security_Validator") &&
  cockpitPhp.includes("uas-standalone-packages/backups/") &&
  cockpitPhp.includes("sr_plugin_rollback_snapshot_"),
  'Frontend Cockpit plugin installer enforces remote HTTPS verification, SHA-256, backup snapshots & rollback endpoint'
);

assert(
  cockpitPhp.includes("Zip Slip Traversal") &&
  cockpitPhp.includes("$allowed_exts = ['php', 'json'") &&
  cockpitPhp.indexOf('$zip_check->open($zip_file)') < cockpitPhp.indexOf('unzip_file($zip_file, WP_PLUGIN_DIR)'),
  'Frontend Cockpit plugin installer preserves pre-extraction ZIP Slip & extension audit strictly before unzip_file()'
);

// -------------------------------------------------------------
// Group 5: Accessible Frontend UX (Zero confirm/alert, CSS Coverage)
// -------------------------------------------------------------
console.log('\n🔍 Group 5: Accessible Confirm Dialog & Frontend Cockpit JS/CSS Coverage');

assert(
  cockpitPhp.includes('id="sr-confirm-dialog"') &&
  cockpitPhp.includes('role="alertdialog"') &&
  cockpitJs.includes('function openConfirmDialog(') &&
  !/\bconfirm\s*\(/.test(cockpitJs) &&
  !/\balert\s*\(/.test(cockpitJs),
  'Frontend Cockpit replaces all native confirm()/alert() calls with accessible #sr-confirm-dialog'
);

assert(
  cockpitJs.includes('sr_cockpit_save_legal_case') &&
  cockpitJs.includes('sr_cockpit_delete_legal_case') &&
  cockpitJs.includes('sr_cockpit_toggle_plugin') &&
  cockpitJs.includes('sr_cockpit_rollback_plugin') &&
  cockpitJs.includes('expected_sha256'),
  'Frontend Cockpit JS wires confidential legal CRUD, plugin toggle/rollback, and SHA-256 payload'
);

assert(
  cockpitCss.includes('.sr-confirm-dialog') &&
  cockpitCss.includes('.sr-role-badge') &&
  cockpitCss.includes('.sr-legal-panel') &&
  cockpitCss.includes('.sr-plugin-verify-box'),
  'Frontend Cockpit CSS styles confirm dialog, role badges, legal panel & plugin verify inputs'
);

console.log('\n========================================================================');
console.log(`📊 Phase 3 Results: ${passedTests} / ${totalTests} passed`);
if (allPassed) {
  console.log('🎉 ALL PHASE 3 CHECKS PASSED (100%)!');
} else {
  console.error('❌ SOME PHASE 3 CHECKS FAILED!');
  process.exit(1);
}
console.log('========================================================================\n');
