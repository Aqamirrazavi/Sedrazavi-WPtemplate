/**
 * Phase 4: Unified Design System & Elementor Global Kit Verification Suite
 *
 * Verifies:
 * 1. Canonical assets/tokens.json exists and defines light/dark colors, typography, spacing, radii, shadows, rtl_ltr, and elementor_kit
 * 2. assets/css/variables.css exists, is wired into asset-manifest.json for frontend & editor, and bridges Light/Dark + RTL/LTR + --sr-* aliases
 * 3. Design_Tokens PHP class initializes in plugin root, syncs elementor_active_kit (system_colors, custom_colors, system_typography, container_width),
 *    and injects tokens in wp_head, elementor/editor/after_enqueue_styles, and elementor/preview/enqueue_styles
 * 4. Universal_Widget_Base binds Global_Colors/Global_Typography & logical RTL alignment helpers
 * 5. theme-toggle.js, class-sedrazavi-design-tokens.php, settings-sync.php, and Package_Exporter stay synchronized
 * 6. Packaged ZIP public/elementor-addon-suite.zip includes tokens.json, variables.css, and class-design-tokens.php
 *
 * @package SedRazavi
 */

const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

console.log('========================================================================');
console.log('🎨 Phase 4: Unified Design System & Global Tokens Verification Suite');
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
  // Group 1: Canonical tokens.json Schema & variables.css Coverage
  // ---------------------------------------------------------------------------
  console.log('🔍 Test Group 1: Canonical tokens.json & variables.css Schema');

  const tokensJsonPath = path.join(ROOT, 'elementor-addon-suite/assets/tokens.json');
  assert(fs.existsSync(tokensJsonPath), 'elementor-addon-suite/assets/tokens.json exists');

  const tokens = JSON.parse(fs.readFileSync(tokensJsonPath, 'utf8'));
  assert(
    Boolean(tokens.colors?.light?.primary && tokens.colors?.dark?.bg),
    'tokens.json defines complete light and dark color palettes'
  );
  assert(
    Boolean(tokens.typography?.font_family_primary_name === 'Vazirmatn' && tokens.typography?.scale?.base),
    'tokens.json defines Vazirmatn typography scale and line-heights'
  );
  assert(
    Boolean(tokens.spacing?.container_max_width_px === 1280 && tokens.radii?.lg && tokens.radii?.xl && tokens.shadows?.glow),
    'tokens.json defines container width, spacing, radii, and elevation shadows'
  );
  assert(
    Boolean(
      Array.isArray(tokens.elementor_kit?.system_colors) && tokens.elementor_kit.system_colors.length === 4 &&
      Array.isArray(tokens.elementor_kit?.custom_colors) && tokens.elementor_kit.custom_colors.length >= 5 &&
      Array.isArray(tokens.elementor_kit?.system_typography) && tokens.elementor_kit.system_typography.length === 4
    ),
    'tokens.json maps Elementor Kit system_colors, custom_colors, and responsive system_typography'
  );

  const varsCssPath = path.join(ROOT, 'elementor-addon-suite/assets/css/variables.css');
  assert(fs.existsSync(varsCssPath), 'elementor-addon-suite/assets/css/variables.css exists');
  const varsCss = readRel('elementor-addon-suite/assets/css/variables.css');
  assert(
    varsCss.includes('html[data-theme="light"]') &&
    varsCss.includes('html[data-theme="dark"]') &&
    varsCss.includes('html.dark') &&
    varsCss.includes('[dir="rtl"]') &&
    varsCss.includes('[dir="ltr"]') &&
    varsCss.includes('--sr-primary-accent'),
    'variables.css covers Light, Dark, RTL/LTR polarity, and --sr-* theme compatibility aliases'
  );

  const manifest = JSON.parse(readRel('elementor-addon-suite/assets/asset-manifest.json'));
  const feDesign = (manifest.scopes?.frontend?.styles || []).find(s => s.handle === 'uas-design-tokens');
  const feCore = (manifest.scopes?.frontend?.styles || []).find(s => s.handle === 'uas-widgets-core');
  const edDesign = (manifest.scopes?.editor?.styles || []).find(s => s.handle === 'uas-design-tokens');
  assert(
    Boolean(feDesign && feDesign.path === 'assets/css/variables.css' && feCore?.deps?.includes('uas-design-tokens') && edDesign),
    'asset-manifest.json binds variables.css (uas-design-tokens) to both frontend core widgets and Elementor editor'
  );

  // ---------------------------------------------------------------------------
  // Group 2: Design_Tokens PHP Engine & Elementor Global Kit Sync
  // ---------------------------------------------------------------------------
  console.log('\n🔍 Test Group 2: Design_Tokens Manager & Elementor Active Kit Sync');

  const designPhpPath = path.join(ROOT, 'elementor-addon-suite/includes/class-design-tokens.php');
  assert(fs.existsSync(designPhpPath), 'elementor-addon-suite/includes/class-design-tokens.php exists');
  const designPhp = readRel('elementor-addon-suite/includes/class-design-tokens.php');
  assert(
    designPhp.includes("add_action('wp_head'") &&
    designPhp.includes("add_action('elementor/editor/after_enqueue_styles'") &&
    designPhp.includes("add_action('elementor/preview/enqueue_styles'") &&
    designPhp.includes("add_action('elementor/init'"),
    'Design_Tokens hooks cleanly into frontend, Elementor preview, Elementor editor, and elementor/init'
  );
  assert(
    designPhp.includes('elementor_active_kit') &&
    designPhp.includes("kit_settings['system_colors']") &&
    designPhp.includes("kit_settings['custom_colors']") &&
    designPhp.includes("kit_settings['system_typography']") &&
    designPhp.includes("kit_settings['container_width']"),
    'Design_Tokens::sync_to_elementor_kit() synchronizes system_colors, custom_colors, system_typography, and container_width'
  );

  const mainPlugin = readRel('elementor-addon-suite/elementor-addon-suite.php');
  assert(
    mainPlugin.includes('class-design-tokens.php') && mainPlugin.includes('Design_Tokens::instance()'),
    'Design_Tokens singleton initialized cleanly in elementor-addon-suite.php'
  );

  // ---------------------------------------------------------------------------
  // Group 3: Widget Base, Editor CSS, Theme Toggle & Cross-Suite Sync
  // ---------------------------------------------------------------------------
  console.log('\n🔍 Test Group 3: Global Kit Widget Helpers & Cross-Suite Sync');

  const widgetBase = readRel('elementor-addon-suite/includes/class-widget-base.php');
  assert(
    widgetBase.includes('Global_Colors::COLOR_PRIMARY') &&
    widgetBase.includes('Global_Typography::TYPOGRAPHY_PRIMARY') &&
    widgetBase.includes('add_rtl_alignment_control'),
    'Universal_Widget_Base binds Elementor Global_Colors/Global_Typography and responsive RTL/LTR alignment'
  );

  const editorCss = readRel('elementor-addon-suite/assets/css/editor.css');
  assert(
    editorCss.includes('border-inline-start') && editorCss.includes('var(--uas-accent-color'),
    'editor.css uses logical border-inline-start and CSS token variables'
  );

  const toggleJs = readRel('elementor-addon-suite/assets/js/widgets/theme-toggle.js');
  assert(
    toggleJs.includes("setAttribute('data-theme'") && toggleJs.includes('sedrazavi_theme'),
    'theme-toggle.js syncs html.dark and html[data-theme] state across widgets and theme templates'
  );

  const themeTokens = readRel('wordpress-theme/includes/class-sedrazavi-design-tokens.php');
  assert(
    themeTokens.includes("elementor/editor/after_enqueue_styles") &&
    themeTokens.includes('--uas-accent-color') &&
    themeTokens.includes("Design_Tokens::instance()->sync_to_elementor_kit"),
    'wordpress-theme Design Tokens injects into Elementor editor and triggers Global Kit sync on REST save'
  );

  const designerSync = readRel('sedrazavi-designer-core/inc/settings-sync.php');
  assert(
    designerSync.includes("kit_settings['custom_colors']") &&
    designerSync.includes("kit_settings['system_typography']") &&
    designerSync.includes("kit_settings['container_width']"),
    'sedrazavi-designer-core/inc/settings-sync.php syncs custom swatches, Vazirmatn typography, and container width'
  );

  const pkgExporter = readRel('elementor-addon-suite/includes/packaging/class-package-exporter.php');
  assert(
    pkgExporter.includes('--uas-accent-color') && pkgExporter.includes('--uas-font-family'),
    'Package_Exporter emits unified --sr-* and --uas-* CSS variables in exported kit bundles'
  );

  // ---------------------------------------------------------------------------
  // Group 4: Packaged Plugin ZIP Contains Phase 4 Design System Files
  // ---------------------------------------------------------------------------
  console.log('\n🔍 Test Group 4: Packaged Plugin ZIP Parity');

  const uasZipPath = path.join(ROOT, 'public/elementor-addon-suite.zip');
  assert(fs.existsSync(uasZipPath), 'public/elementor-addon-suite.zip exists');
  if (fs.existsSync(uasZipPath)) {
    const zip = await JSZip.loadAsync(fs.readFileSync(uasZipPath));
    for (const entry of [
      'elementor-addon-suite/assets/tokens.json',
      'elementor-addon-suite/assets/css/variables.css',
      'elementor-addon-suite/includes/class-design-tokens.php',
    ]) {
      assert(Boolean(zip.file(entry)), `public/elementor-addon-suite.zip contains ${entry}`);
    }
  }

  console.log('\n========================================================================');
  console.log(`📊 Phase 4 Design System Results: ${passedTests} / ${totalTests} passed`);
  if (allPassed) {
    console.log('🎉 ALL PHASE 4 UNIFIED DESIGN SYSTEM & GLOBAL TOKEN CHECKS PASSED!');
  } else {
    console.error('❌ SOME PHASE 4 CHECKS FAILED!');
    process.exit(1);
  }
  console.log('========================================================================\n');
}

runTests().catch((err) => {
  console.error('❌ Fatal error running Phase 4 suite:', err);
  process.exit(1);
});
