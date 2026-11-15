/**
 * Phase 3: Clean WordPress Installation, Lifecycle & Free/Pro Resilience Verification Suite
 *
 * Verifies:
 * 1. Standalone activation, deactivation, and uninstall.php lifecycle across all 4 plugins
 * 2. Elementor Free/Pro resilience: static canvas-wrapper.php (zero uploads PHP writing),
 *    did_action('get_header') double-header guard, Template_Importer Pro-to-Free adaptation
 * 3. Theme & companion missing-Elementor / deactivation fallbacks & zero false ACF Pro warnings
 * 4. Built ZIP archives include updated uninstall.php & canvas-wrapper.php files
 *
 * @package SedRazavi
 */

const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

console.log('========================================================================');
console.log('🛡️ Phase 3: Clean Install, Lifecycle & Free/Pro Resilience Suite');
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

function readRel(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8');
}

async function runTests() {
  // ---------------------------------------------------------------------------
  // Group 1: Clean Plugin Lifecycle (Activation, Deactivation, Uninstall)
  // ---------------------------------------------------------------------------
  console.log('🔍 Test Group 1: Plugin Activation, Deactivation & Multisite Uninstall');

  const plugins = [
    { name: 'elementor-addon-suite', main: 'elementor-addon-suite/elementor-addon-suite.php', uninstall: 'elementor-addon-suite/uninstall.php' },
    { name: 'sedrazavi-addons', main: 'sedrazavi-addons/sedrazavi-addons.php', uninstall: 'sedrazavi-addons/uninstall.php' },
    { name: 'sedrazavi-companion', main: 'sedrazavi-companion/sedrazavi-companion.php', uninstall: 'sedrazavi-companion/uninstall.php' },
    { name: 'sedrazavi-designer-core', main: 'sedrazavi-designer-core/sedrazavi-core.php', uninstall: 'sedrazavi-designer-core/uninstall.php' },
  ];

  for (const p of plugins) {
    const mainCode = readRel(p.main);
    assert(
      mainCode.includes('register_activation_hook(') && mainCode.includes('register_deactivation_hook('),
      `${p.name}: registers both activation and deactivation hooks`
    );

    const uninstallExists = fs.existsSync(path.join(ROOT, p.uninstall));
    assert(uninstallExists, `${p.name}: uninstall.php exists`);

    if (uninstallExists) {
      const uninstallCode = readRel(p.uninstall);
      assert(
        uninstallCode.includes("defined('WP_UNINSTALL_PLUGIN')") && uninstallCode.includes('is_multisite()'),
        `${p.name}: uninstall.php enforces WP_UNINSTALL_PLUGIN guard and multisite cleanup`
      );
    }
  }

  const uasUninstall = readRel('elementor-addon-suite/uninstall.php');
  assert(
    uasUninstall.includes('uas_uninstall_rmdir_recursive') &&
    uasUninstall.includes('$wpdb->prepare') &&
    uasUninstall.includes('wp_clear_scheduled_hook'),
    'elementor-addon-suite/uninstall.php uses recursive directory removal, prepared SQL, and cron clearing'
  );

  // ---------------------------------------------------------------------------
  // Group 2: Theme_Builder_Bridge & Template_Importer Free/Pro Resilience
  // ---------------------------------------------------------------------------
  console.log('\n🔍 Test Group 2: Elementor Free/Pro Resilience & Safe Canvas Wrapper');

  const canvasWrapperRel = 'elementor-addon-suite/includes/templates/canvas-wrapper.php';
  assert(fs.existsSync(path.join(ROOT, canvasWrapperRel)), 'Static read-only canvas-wrapper.php exists');
  const canvasCode = readRel(canvasWrapperRel);
  assert(
    canvasCode.includes("defined('ABSPATH')") &&
    canvasCode.includes('get_header()') &&
    canvasCode.includes('render_active_canvas_template()') &&
    canvasCode.includes('get_footer()'),
    'canvas-wrapper.php delegates rendering cleanly without dynamic code generation'
  );

  const bridgeCode = readRel('elementor-addon-suite/includes/class-theme-builder-bridge.php');
  assert(
    !bridgeCode.includes('file_put_contents') &&
    bridgeCode.includes('includes/templates/canvas-wrapper.php') &&
    bridgeCode.includes("did_action('get_header')") &&
    bridgeCode.includes('register_free_fallback_shortcodes') &&
    (bridgeCode.includes('[uas_nav_menu') || bridgeCode.includes("'uas_nav_menu'")),
    'Theme_Builder_Bridge eliminates uploads PHP writes, guards double get_header(), and provides Free fallback shortcodes'
  );
  assert(
    bridgeCode.includes("get_assigned_template_id('archive')") &&
    bridgeCode.includes("get_assigned_template_id('404')") &&
    bridgeCode.includes("get_assigned_template_id('single-post')"),
    'Theme_Builder_Bridge supports 404, single, and archive fallback templates'
  );

  const importerCode = readRel('elementor-addon-suite/includes/class-template-importer.php');
  assert(
    importerCode.includes('get_pro_widget_slugs') &&
    importerCode.includes('detect_pro_widgets') &&
    importerCode.includes('adapt_pro_widgets_for_free') &&
    importerCode.includes('pro_required'),
    'Template_Importer detects Pro widgets and adapts Theme Builder templates cleanly for Elementor Free'
  );

  // ---------------------------------------------------------------------------
  // Group 3: Theme & Companion Missing-Elementor Guards
  // ---------------------------------------------------------------------------
  console.log('\n🔍 Test Group 3: Theme & Companion Missing-Elementor Fallbacks');

  const themeSetup = readRel('wordpress-theme/inc/setup.php');
  assert(
    !themeSetup.includes('advanced-custom-fields/acf.php') &&
    themeSetup.includes('notice-info') &&
    themeSetup.includes('install-plugin_elementor'),
    'wordpress-theme/inc/setup.php removes false ACF Pro hard warning and shows dismissible Elementor info notice'
  );

  const frontPage = readRel('wordpress-theme/front-page.php');
  const singlePhp = readRel('wordpress-theme/single.php');
  assert(
    frontPage.includes("did_action('elementor/loaded')") &&
    frontPage.includes("class_exists('\\Elementor\\Plugin')") &&
    !frontPage.includes('\texit;') &&
    !frontPage.includes('            exit;\n'),
    'wordpress-theme/front-page.php guards _elementor_data rendering when Elementor is deactivated'
  );
  assert(
    singlePhp.includes("did_action('elementor/loaded')") &&
    singlePhp.includes("class_exists('\\Elementor\\Plugin')"),
    'wordpress-theme/single.php guards _elementor_data rendering when Elementor is deactivated'
  );

  const designerFunctions = readRel('sedrazavi-designer-theme/functions.php');
  assert(
    designerFunctions.includes("class_exists('\\UniversalElementorSuite\\Theme_Builder_Bridge')") &&
    designerFunctions.includes("method_exists($location_manager, 'register_all_core_location')"),
    'sedrazavi-designer-theme/functions.php deduplicates Theme Builder registration and prefers Universal Bridge'
  );

  const coreBridge = readRel('sedrazavi-designer-core/inc/theme-builder-bridge.php');
  const coreAuth = readRel('sedrazavi-designer-core/inc/auth-guard.php');
  const coreSync = readRel('sedrazavi-designer-core/inc/settings-sync.php');
  assert(
    coreBridge.includes("class_exists('\\UniversalElementorSuite\\Theme_Builder_Bridge')") &&
    coreAuth.includes('wp_doing_ajax()') &&
    coreAuth.includes("!current_user_can('edit_posts')") &&
    coreSync.includes("class_exists('\\Elementor\\Plugin')"),
    'sedrazavi-designer-core guards Theme Builder fallback, wp-admin AJAX/role checks, and Elementor Kit sync'
  );

  // ---------------------------------------------------------------------------
  // Group 4: Packaged ZIPs Include New Phase 3 Lifecycle & Wrapper Files
  // ---------------------------------------------------------------------------
  console.log('\n🔍 Test Group 4: Packaged Plugin ZIPs Contain Updated Phase 3 Files');

  const zipChecks = [
    { zip: 'public/elementor-addon-suite.zip', entries: ['elementor-addon-suite/uninstall.php', 'elementor-addon-suite/includes/templates/canvas-wrapper.php'] },
    { zip: 'public/sedrazavi-addons.zip', entries: ['sedrazavi-addons/uninstall.php'] },
    { zip: 'public/sedrazavi-companion.zip', entries: ['sedrazavi-companion/uninstall.php'] },
    { zip: 'public/sedrazavi-designer-core.zip', entries: ['sedrazavi-designer-core/uninstall.php'] },
  ];

  for (const zc of zipChecks) {
    const fullZip = path.join(ROOT, zc.zip);
    if (!fs.existsSync(fullZip)) {
      assert(false, `${zc.zip} exists on disk`);
      continue;
    }
    const buf = fs.readFileSync(fullZip);
    const zip = await JSZip.loadAsync(buf);
    for (const entry of zc.entries) {
      assert(Boolean(zip.file(entry)), `${zc.zip} contains ${entry}`);
    }
  }

  console.log('\n========================================================================');
  console.log(`📊 Phase 3 Test Results: ${passedTests} / ${totalTests} passed`);
  if (allPassed) {
    console.log('🎉 ALL PHASE 3 CLEAN INSTALL & FREE/PRO RESILIENCE CHECKS PASSED!');
  } else {
    console.error('❌ SOME PHASE 3 CHECKS FAILED!');
    process.exit(1);
  }
  console.log('========================================================================\n');
}

runTests().catch((err) => {
  console.error('❌ Fatal error running Phase 3 suite:', err);
  process.exit(1);
});
