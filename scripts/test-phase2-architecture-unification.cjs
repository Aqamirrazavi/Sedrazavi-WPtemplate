/**
 * Phase 2: Architecture, Hook Unification & Unified Asset Manifest Verification Suite
 *
 * Verifies:
 * 1. Single Source of Truth asset-manifest.json exists and resolves 100% on disk
 * 2. Every Elementor widget style/script handle resolves in asset-manifest.json
 * 3. Frontend, Elementor Editor, Preview, and WP Admin scopes are cleanly isolated
 * 4. Duplicate/deprecated widget hooks (widgets_registered), mid-hook plugin require_once,
 *    duplicate Theme Builder locations, and double app-dist bundle loads are eliminated
 *
 * @package SedRazavi
 */

const fs = require('fs');
const path = require('path');

console.log('========================================================================');
console.log('🏛️ Phase 2: Architecture, Registry & Asset Manifest Verification Suite');
console.log('========================================================================\n');

const ROOT = path.join(__dirname, '..');
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
// Group 1: Unified Asset Manifest Integrity & Disk Resolution
// -------------------------------------------------------------
console.log('🔍 Test Group 1: Unified Asset Manifest (asset-manifest.json)');

const manifestPath = path.join(ROOT, 'elementor-addon-suite/assets/asset-manifest.json');
assert(fs.existsSync(manifestPath), 'elementor-addon-suite/assets/asset-manifest.json exists');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
assert(manifest.scopes && manifest.scopes.frontend && manifest.scopes.editor && manifest.scopes.admin, 'Manifest cleanly defines frontend, editor, and admin scopes');

const allStyleHandles = new Set();
const allScriptHandles = new Set();
let missingOnDisk = 0;

for (const [scopeName, scope] of Object.entries(manifest.scopes)) {
  for (const entry of (scope.styles || [])) {
    allStyleHandles.add(entry.handle);
    const full = path.join(ROOT, 'elementor-addon-suite', entry.path);
    if (!fs.existsSync(full)) {
      console.error(`    Missing style on disk [${scopeName}]: ${entry.path}`);
      missingOnDisk++;
    }
  }
  for (const entry of (scope.scripts || [])) {
    allScriptHandles.add(entry.handle);
    const full = path.join(ROOT, 'elementor-addon-suite', entry.path);
    if (!fs.existsSync(full)) {
      console.error(`    Missing script on disk [${scopeName}]: ${entry.path}`);
      missingOnDisk++;
    }
  }
}

assert(missingOnDisk === 0, 'Every manifest CSS/JS file path exists on disk (0 missing)');
assert((manifest.scopes.frontend.styles || []).length >= 21, `Frontend style manifest covers core + 19 widget + standalone/compat styles (Found: ${(manifest.scopes.frontend.styles || []).length})`);
assert((manifest.scopes.frontend.scripts || []).length >= 14, `Frontend script manifest covers core + 12 widget + standalone/industry scripts (Found: ${(manifest.scopes.frontend.scripts || []).length})`);

// -------------------------------------------------------------
// Group 2: Cross-Check All 31 Elementor Widgets Against Manifest
// -------------------------------------------------------------
console.log('\n🔍 Test Group 2: 31 Widget Dependency Handles vs Asset Manifest');

const widgetsDir = path.join(ROOT, 'elementor-addon-suite/includes/widgets');
const widgetFiles = fs.readdirSync(widgetsDir).filter(f => f.endsWith('.php')).sort();
assert(widgetFiles.length === 31, `All 31 widget files scanned (Found: ${widgetFiles.length})`);

let invalidWidgetHandles = 0;
let nonBaseWidgets = 0;

for (const wf of widgetFiles) {
  const code = fs.readFileSync(path.join(widgetsDir, wf), 'utf8');
  if (!code.includes('extends Universal_Widget_Base')) {
    console.error(`    Widget does not extend Universal_Widget_Base: ${wf}`);
    nonBaseWidgets++;
  }
  const sMatch = code.match(/get_style_depends[\s\S]*?return\s*\[([\s\S]*?)\]/);
  const jMatch = code.match(/get_script_depends[\s\S]*?return\s*\[([\s\S]*?)\]/);
  const sHandles = sMatch ? [...sMatch[1].matchAll(/'([^']+)'/g)].map(x => x[1]) : [];
  const jHandles = jMatch ? [...jMatch[1].matchAll(/'([^']+)'/g)].map(x => x[1]) : [];

  for (const h of sHandles) {
    if (!allStyleHandles.has(h)) {
      console.error(`    Unregistered style handle "${h}" in ${wf}`);
      invalidWidgetHandles++;
    }
  }
  for (const h of jHandles) {
    if (!allScriptHandles.has(h)) {
      console.error(`    Unregistered script handle "${h}" in ${wf}`);
      invalidWidgetHandles++;
    }
  }
}

assert(nonBaseWidgets === 0, 'All 31 widgets inherit uas-widgets-core via Universal_Widget_Base');
assert(invalidWidgetHandles === 0, 'All widget get_style_depends/get_script_depends handles exist in asset-manifest.json');

// -------------------------------------------------------------
// Group 3: Asset_Manifest Class & Plugin/Theme Deduplication
// -------------------------------------------------------------
console.log('\n🔍 Test Group 3: Asset_Manifest Integration & Duplicate Hook Removal');

const assetMgrPath = path.join(ROOT, 'elementor-addon-suite/includes/class-asset-manifest.php');
assert(fs.existsSync(assetMgrPath), 'elementor-addon-suite/includes/class-asset-manifest.php exists');

const mainPlugin = fs.readFileSync(path.join(ROOT, 'elementor-addon-suite/elementor-addon-suite.php'), 'utf8');
const pluginPhp = fs.readFileSync(path.join(ROOT, 'elementor-addon-suite/includes/class-plugin.php'), 'utf8');
const adminSettings = fs.readFileSync(path.join(ROOT, 'elementor-addon-suite/includes/class-admin-settings.php'), 'utf8');
const githubAdmin = fs.readFileSync(path.join(ROOT, 'elementor-addon-suite/includes/class-github-admin.php'), 'utf8');
const motionPhp = fs.readFileSync(path.join(ROOT, 'elementor-addon-suite/includes/class-sovereign-motion-presets.php'), 'utf8');
const gutenbergPhp = fs.readFileSync(path.join(ROOT, 'elementor-addon-suite/includes/class-gutenberg-blocks.php'), 'utf8');
const addonsWidgets = fs.readFileSync(path.join(ROOT, 'sedrazavi-addons/includes/elementor-widgets.php'), 'utf8');
const themeElementor = fs.readFileSync(path.join(ROOT, 'wordpress-theme/inc/class-sedrazavi-elementor.php'), 'utf8');
const reactShortcodes = fs.readFileSync(path.join(ROOT, 'wordpress-theme/inc/react-shortcodes.php'), 'utf8');

assert(mainPlugin.includes('class-asset-manifest.php') && mainPlugin.includes('Asset_Manifest::instance()'), 'Asset_Manifest initialized in main plugin entry');
assert(
  pluginPhp.includes("Asset_Manifest::instance()->register_scope('frontend', 'styles')") &&
  pluginPhp.includes("Asset_Manifest::instance()->enqueue_scope('editor')") &&
  pluginPhp.includes("elementor/preview/enqueue_styles"),
  'Plugin delegates frontend/preview/editor assets cleanly to Asset_Manifest'
);
assert(
  adminSettings.includes("Asset_Manifest::instance()->enqueue_scope('admin'") &&
  githubAdmin.includes("Asset_Manifest::instance()->enqueue_scope('admin'"),
  'Admin Settings and GitHub Admin delegate admin CSS/JS to Asset_Manifest'
);
assert(
  !pluginPhp.includes('elementor/widgets/widgets_registered') &&
  pluginPhp.includes('static $already_registered = false') &&
  !addonsWidgets.includes('elementor/widgets/widgets_registered') &&
  !addonsWidgets.includes("require_once $standalone_suite"),
  'Deprecated widgets_registered duplicate hooks & unsafe mid-hook plugin require_once eliminated'
);
assert(
  themeElementor.includes("!class_exists('\\UniversalElementorSuite\\Theme_Builder_Bridge')"),
  'Theme deduplicates elementor/theme/register_locations when Theme_Builder_Bridge is active'
);
assert(
  motionPhp.includes('enqueue_admin_motion_styles') &&
  motionPhp.includes('static $enqueued = false') &&
  gutenbergPhp.includes("wp:sedrazavi/"),
  'Motion engine & Gutenberg frontend inline styles are scoped & deduplicated'
);
assert(
  reactShortcodes.includes("wp_script_is('sedrazavi-react-bundle-js', 'enqueued')"),
  'react-shortcodes.php prevents duplicate app-dist bundle enqueue when functions.php already loaded it'
);

// -------------------------------------------------------------
// Summary
// -------------------------------------------------------------
console.log('\n========================================================================');
console.log(`📊 Phase 2 Test Results: ${passedTests} / ${totalTests} passed`);
if (allPassed) {
  console.log('🎉 ALL PHASE 2 ARCHITECTURE & ASSET MANIFEST CHECKS PASSED (100%)!');
} else {
  console.error('❌ SOME CHECKS FAILED!');
  process.exit(1);
}
console.log('========================================================================\n');
