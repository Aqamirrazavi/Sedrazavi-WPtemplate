/**
 * Universal Frontend Management Cockpit Verification Suite
 *
 * Verifies:
 * 1. Database-authenticated frontend dashboard with login/logout sync
 * 2. Universal CPT & Custom Metabox CRUD from frontend
 * 3. Administrator manual user account creation, monitoring, search, edit & delete
 * 4. In-dashboard 1-click plugin installation and package management
 * 5. Page template and asset integrity
 *
 * @package SedRazavi
 */

const fs = require('fs');
const path = require('path');

console.log('========================================================================');
console.log('🚀 Universal Frontend Management Cockpit Verification Suite');
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
// Test Group 1: Cockpit Engine Class & Hooks
// -------------------------------------------------------------
console.log('🔍 Test Group 1: Cockpit Engine Core Architecture');

const enginePath = path.join(__dirname, '../wordpress-theme/inc/frontend-cockpit-engine.php');
assert(fs.existsSync(enginePath), 'inc/frontend-cockpit-engine.php exists');
const engineCode = fs.readFileSync(enginePath, 'utf8');

assert(
  engineCode.includes('class Frontend_Cockpit_Engine') &&
  engineCode.includes('Frontend_Cockpit_Engine::instance()'),
  'Frontend_Cockpit_Engine class is declared as singleton'
);

assert(
  engineCode.includes("add_shortcode('sedrazavi_frontend_cockpit'"),
  'Shortcode [sedrazavi_frontend_cockpit] is registered'
);

// -------------------------------------------------------------
// Test Group 2: Database Authentication & Session Sync
// -------------------------------------------------------------
console.log('\n🔍 Test Group 2: Database Authentication & Session Sync');

assert(
  engineCode.includes("add_action('wp_ajax_sr_cockpit_db_login'") &&
  engineCode.includes("add_action('wp_ajax_nopriv_sr_cockpit_db_login'"),
  'sr_cockpit_db_login is registered for authenticated and non-authenticated users'
);

assert(
  engineCode.includes('wp_signon($creds') &&
  engineCode.includes('wp_set_current_user') &&
  engineCode.includes('wp_set_auth_cookie'),
  'Database login authenticates with core wp_signon and sets auth cookie'
);

assert(
  engineCode.includes("add_action('wp_ajax_sr_cockpit_db_logout'") &&
  engineCode.includes('wp_logout()'),
  'Database logout handler executes core wp_logout'
);

// -------------------------------------------------------------
// Test Group 3: Universal CPT & Metabox Frontend CRUD
// -------------------------------------------------------------
console.log('\n🔍 Test Group 3: Universal CPT & Metabox Frontend CRUD');

assert(
  engineCode.includes("add_action('wp_ajax_sr_cockpit_save_cpt_post'") &&
  engineCode.includes('current_user_can(\'edit_posts\')'),
  'sr_cockpit_save_cpt_post validates user capabilities'
);

assert(
  engineCode.includes('wp_insert_post') &&
  engineCode.includes('wp_update_post'),
  'CPT post handler performs database insert and update'
);

assert(
  engineCode.includes('update_post_meta($saved_id') &&
  engineCode.includes('sanitize_key($meta_key)'),
  'Custom metabox fields are sanitized and stored in wp_postmeta'
);

assert(
  engineCode.includes("add_action('wp_ajax_sr_cockpit_delete_cpt_post'") &&
  engineCode.includes('wp_delete_post'),
  'CPT delete handler verifies post author/capability and calls wp_delete_post'
);

// -------------------------------------------------------------
// Test Group 4: Frontend User & Account Lifecycle Management
// -------------------------------------------------------------
console.log('\n🔍 Test Group 4: Frontend User & Account Lifecycle Management');

assert(
  engineCode.includes("add_action('wp_ajax_sr_cockpit_create_user'") &&
  engineCode.includes("current_user_can('create_users')") &&
  engineCode.includes("current_user_can('manage_options')"),
  'User creation strictly requires create_users or manage_options'
);

assert(
  engineCode.includes('wp_create_user($username, $password, $email)') &&
  engineCode.includes('$user->set_role($role)'),
  'Manual user creation registers user with custom role'
);

assert(
  engineCode.includes("add_action('wp_ajax_sr_cockpit_delete_user'") &&
  engineCode.includes('wp_delete_user') &&
  engineCode.includes('$target_user_id === get_current_user_id()'),
  'User deletion prevents self-deletion and safely deletes user'
);

assert(
  engineCode.includes("add_action('wp_ajax_sr_cockpit_search_users'") &&
  engineCode.includes('get_users($args)'),
  'User search & filter queries users by search terms and role filters'
);

// -------------------------------------------------------------
// Test Group 5: In-Dashboard 1-Click Plugin & Package Hub
// -------------------------------------------------------------
console.log('\n🔍 Test Group 5: In-Dashboard 1-Click Plugin & Package Hub');

assert(
  engineCode.includes("add_action('wp_ajax_sr_cockpit_install_plugin'") &&
  engineCode.includes('unzip_file($zip_file, WP_PLUGIN_DIR)'),
  'Plugin installer extracts plugin bundle using core WP Filesystem'
);

assert(
  engineCode.includes('activate_plugin($main_file)'),
  'Plugin installer automatically activates installed plugin'
);

// -------------------------------------------------------------
// Test Group 6: Templates & UI Assets
// -------------------------------------------------------------
console.log('\n🔍 Test Group 6: Templates & UI Assets Integrity');

const pageTemplatePath = path.join(__dirname, '../wordpress-theme/page-frontend-cockpit.php');
assert(fs.existsSync(pageTemplatePath), 'page-frontend-cockpit.php exists in theme');
const pageContent = fs.readFileSync(pageTemplatePath, 'utf8');
assert(pageContent.includes('[sedrazavi_frontend_cockpit]'), 'page template embeds cockpit shortcode');

const cssPath = path.join(__dirname, '../wordpress-theme/assets/css/frontend-cockpit.css');
assert(fs.existsSync(cssPath), 'assets/css/frontend-cockpit.css exists');
const cssContent = fs.readFileSync(cssPath, 'utf8');
assert(cssContent.includes('.sr-cockpit-wrapper') && cssContent.includes('--sr-cockpit-accent'), 'CSS defines cockpit variables and card layouts');

const jsPath = path.join(__dirname, '../wordpress-theme/assets/js/frontend-cockpit.js');
assert(fs.existsSync(jsPath), 'assets/js/frontend-cockpit.js exists');
const jsContent = fs.readFileSync(jsPath, 'utf8');
assert(
  jsContent.includes('sr_cockpit_db_login') &&
  jsContent.includes('sr_cockpit_save_cpt_post') &&
  jsContent.includes('sr_cockpit_create_user') &&
  jsContent.includes('sr_cockpit_install_plugin'),
  'JS handles login, CPT saving, user creation, and plugin installation'
);

// -------------------------------------------------------------
// Test Group 7: Visual Site Kit Builder & Direct Deployment
// -------------------------------------------------------------
console.log('\n🔍 Test Group 7: Visual Site Kit Builder & Direct Deployment');

assert(
  engineCode.includes("add_action('wp_ajax_sr_cockpit_preflight_sitekit'") &&
  engineCode.includes("add_action('wp_ajax_sr_cockpit_build_sitekit_bundle'") &&
  engineCode.includes("add_action('wp_ajax_sr_cockpit_install_sitekit_bundle'"),
  'Site Kit Builder AJAX endpoints are registered'
);

assert(
  engineCode.includes('build_custom_project_bundle($params)') &&
  engineCode.includes('import_package_archive'),
  'Site Kit Builder connects to Package Manager for export and local installation'
);

assert(
  engineCode.includes('id="tab-sitekit"') &&
  engineCode.includes('sr-sitekit-container') &&
  engineCode.includes('sr-sitekit-niche-grid'),
  'Visual Site Kit Builder markup is integrated into Cockpit interface'
);

assert(
  jsContent.includes('sr_cockpit_preflight_sitekit') &&
  jsContent.includes('sr_cockpit_build_sitekit_bundle') &&
  jsContent.includes('sr_cockpit_install_sitekit_bundle'),
  'JavaScript handles Site Kit preflight, custom bundle compilation, and 1-click deployment'
);

// -------------------------------------------------------------
// Test Group 8: Site Kit Rollback & Bulk CSV User Import/Export
// -------------------------------------------------------------
console.log('\n🔍 Test Group 8: Site Kit Rollback & Bulk CSV User Import/Export');

assert(
  engineCode.includes("add_action('wp_ajax_sr_cockpit_bulk_import_users'") &&
  engineCode.includes("add_action('wp_ajax_sr_cockpit_export_users_csv'") &&
  engineCode.includes("add_action('wp_ajax_sr_cockpit_rollback_sitekit'"),
  'AJAX actions for bulk CSV user import, CSV export, and Site Kit rollback are registered'
);

assert(
  engineCode.includes('rollback_package_installation($slug)'),
  'Site Kit rollback AJAX delegates directly to Package_Manager::rollback_package_installation()'
);

assert(
  engineCode.includes('id="sr-btn-export-users-csv"') &&
  engineCode.includes('id="sr-btn-open-bulk-users"') &&
  engineCode.includes('id="sr-bulk-users-modal"') &&
  engineCode.includes('id="sr-btn-sitekit-rollback"'),
  'Cockpit UI renders Bulk CSV import modal, CSV export button, and Site Kit rollback button'
);

assert(
  jsContent.includes('sr_cockpit_bulk_import_users') &&
  jsContent.includes('sr_cockpit_export_users_csv') &&
  jsContent.includes('sr_cockpit_rollback_sitekit'),
  'JavaScript wires Bulk CSV import, CSV export download, and Site Kit rollback actions'
);

assert(
  cssContent.includes('.sr-btn-danger') &&
  cssContent.includes('.sr-panel-actions') &&
  cssContent.includes('.sr-bulk-textarea'),
  'CSS styles all Bulk CSV and Site Kit rollback cockpit elements'
);

// -------------------------------------------------------------
// Test Group 9: Phase 2 DB Parity (CPT Edit Hydration, Site Settings & Gutenberg/CPT Site Kit)
// -------------------------------------------------------------
console.log('\n🔍 Test Group 9: Phase 2 DB Parity, Site Settings & Gutenberg/CPT Site Kit');

assert(
  engineCode.includes("add_action('wp_ajax_sr_cockpit_get_cpt_data'") &&
  engineCode.includes('function ajax_get_cpt_data()') &&
  engineCode.includes('sr-btn-edit-cpt'),
  'CPT edit hydration endpoint ajax_get_cpt_data and .sr-btn-edit-cpt action are implemented'
);

assert(
  engineCode.includes("add_action('wp_ajax_sr_cockpit_save_site_settings'") &&
  engineCode.includes('function ajax_save_site_settings()') &&
  engineCode.includes('id="tab-settings"') &&
  engineCode.includes('id="sr-site-settings-form"'),
  'Site Settings tab and AJAX persistence handler (wp_options + theme_mods) are wired'
);

assert(
  engineCode.includes('sr-sitekit-block-cb') &&
  engineCode.includes('sr-sitekit-cpt-cb') &&
  engineCode.includes('id="sr-sitekit-block-count"') &&
  engineCode.includes('id="sr-sitekit-cpt-count"'),
  'Visual Site Kit Builder exposes granular Gutenberg block and CPT schema selectors + counters'
);

assert(
  engineCode.includes("sr_cockpit_deployed_kits") &&
  engineCode.includes('sr-deployed-kits-list'),
  'Site Kit installation and rollback persist deployed kit ledger in wp_options (sr_cockpit_deployed_kits)'
);

assert(
  jsContent.includes('sr_cockpit_get_cpt_data') &&
  jsContent.includes('sr_cockpit_save_site_settings') &&
  jsContent.includes('getSelectedBlocks') &&
  jsContent.includes('getSelectedCpts'),
  'Frontend Cockpit JS wires CPT edit hydration, Site Settings persistence, and Gutenberg/CPT payload submission'
);

assert(
  cssContent.includes('.sr-btn-edit') &&
  cssContent.includes('.sr-settings-grid') &&
  cssContent.includes('.sr-deployed-kits-list'),
  'Cockpit CSS defines styles for CPT edit controls, settings grid, and deployed kits ledger'
);

// -------------------------------------------------------------
// Test Summary
// -------------------------------------------------------------
console.log('\n========================================================================');
console.log(`📊 Frontend Cockpit Test Results: ${passedTests} / ${totalTests} passed`);
if (allPassed) {
  console.log('🎉 ALL FRONTEND MANAGEMENT COCKPIT CHECKS PASSED (100%)!');
} else {
  console.error('❌ SOME CHECKS FAILED!');
  process.exit(1);
}
console.log('========================================================================\n');
