/**
 * Phase 10 Automated Verification Suite:
 * Gutenberg Native Blocks, Sovereign 66+ Asset Banks, Zero-CDN Audit,
 * Bi-directional Elementor & Gutenberg Co-existence.
 *
 * @package UniversalElementorSuite
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */

const fs = require('fs');
const path = require('path');

console.log('========================================================================');
console.log('🚀 Phase 10 Verification Suite: Gutenberg Native Blocks & 66+ Sovereign Banks');
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
// Test Group 1: Native Gutenberg Blocks Engine (PHP)
// -------------------------------------------------------------
console.log('🔍 Test Group 1: Gutenberg Blocks Engine & Registration');

const gutenbergClassPath = path.join(__dirname, '../elementor-addon-suite/includes/class-gutenberg-blocks.php');
assert(fs.existsSync(gutenbergClassPath), 'class-gutenberg-blocks.php exists');
const gutenbergContent = fs.readFileSync(gutenbergClassPath, 'utf8');

assert(
  gutenbergContent.includes('class Gutenberg_Blocks'),
  'Gutenberg_Blocks class is defined'
);

assert(
  gutenbergContent.includes('sedrazavi-sovereign'),
  'Gutenberg block category "sedrazavi-sovereign" is registered'
);

const expectedBlocks = [
  'sedrazavi/sovereign-vector-bg',
  'sedrazavi/sovereign-widget',
  'sedrazavi/sovereign-divider',
  'sedrazavi/sovereign-badge',
  'sedrazavi/sovereign-section',
  'sedrazavi/sovereign-motion',
  'sedrazavi/sovereign-icon',
];

expectedBlocks.forEach(blockName => {
  assert(
    gutenbergContent.includes(`'${blockName}'`),
    `Gutenberg block '${blockName}' is registered via register_block_type`
  );
});

const expectedCallbacks = [
  'render_vector_bg_block',
  'render_widget_block',
  'render_divider_block',
  'render_badge_block',
  'render_section_block',
  'render_motion_block',
  'render_icon_block',
];

expectedCallbacks.forEach(cb => {
  assert(
    gutenbergContent.includes(`function ${cb}`),
    `Server-side render callback '${cb}' is implemented`
  );
});

assert(
  gutenbergContent.includes('enqueue_block_editor_assets') &&
  gutenbergContent.includes('wp_add_inline_script'),
  'Gutenberg block editor script & inspector controls injection implemented'
);

// Verify plugin loader loads class-gutenberg-blocks.php
const mainPluginPath = path.join(__dirname, '../elementor-addon-suite/elementor-addon-suite.php');
const mainPluginContent = fs.readFileSync(mainPluginPath, 'utf8');
assert(
  mainPluginContent.includes('class-gutenberg-blocks.php') &&
  mainPluginContent.includes('Gutenberg_Blocks::instance()'),
  'elementor-addon-suite.php includes and boots Gutenberg_Blocks'
);

// -------------------------------------------------------------
// Test Group 2: Theme Gutenberg & Builder Support
// -------------------------------------------------------------
console.log('\n🔍 Test Group 2: Theme Gutenberg Support Alignment');

const themeFunctionsPath = path.join(__dirname, '../wordpress-theme/functions.php');
const themeFunctionsContent = fs.readFileSync(themeFunctionsPath, 'utf8');

assert(
  themeFunctionsContent.includes("add_theme_support('align-wide')"),
  'Theme enables align-wide support for wide/full Gutenberg blocks'
);

assert(
  themeFunctionsContent.includes("add_theme_support('wp-block-styles')"),
  'Theme enables wp-block-styles for default block styling'
);

assert(
  themeFunctionsContent.includes("add_theme_support('responsive-embeds')"),
  'Theme enables responsive-embeds for fluid media scaling'
);

assert(
  themeFunctionsContent.includes("add_theme_support('editor-styles')"),
  'Theme enables editor-styles for visual Gutenberg parity'
);

// -------------------------------------------------------------
// Test Group 3: Sovereign 66+ Asset Banks Integrity
// -------------------------------------------------------------
console.log('\n🔍 Test Group 3: Sovereign 66+ Asset Banks Count & Structure');

// 1. Vector backgrounds
const vectorBgPath = path.join(__dirname, '../src/data/vectorBackgroundPresets.ts');
assert(fs.existsSync(vectorBgPath), 'vectorBackgroundPresets.ts exists');
const vectorBgContent = fs.readFileSync(vectorBgPath, 'utf8');
const vectorMatch = vectorBgContent.match(/number:\s*(\d+)/g);
const vectorCount = vectorMatch ? vectorMatch.length : 0;
assert(vectorCount >= 66, `Vector backgrounds bank contains at least 66 presets (got: ${vectorCount})`);

// 2. Sovereign Widgets
const widgetsBankPath = path.join(__dirname, '../src/data/sovereignWidgetsBank.ts');
assert(fs.existsSync(widgetsBankPath), 'sovereignWidgetsBank.ts exists');
const widgetsContent = fs.readFileSync(widgetsBankPath, 'utf8');
const widgetMatches = widgetsContent.match(/number:\s*(\d+)/g);
const widgetCount = widgetMatches ? widgetMatches.length : 0;
assert(widgetCount >= 72, `Sovereign widgets bank contains at least 72 widgets (got: ${widgetCount})`);

// 3. Sovereign Assets (Dividers, Badges, Sections, Motions)
const assetsBankPath = path.join(__dirname, '../src/data/sovereignAssetsBank.ts');
assert(fs.existsSync(assetsBankPath), 'sovereignAssetsBank.ts exists');
const assetsContent = fs.readFileSync(assetsBankPath, 'utf8');

assert(assetsContent.includes('SOVEREIGN_SHAPE_DIVIDERS'), 'SOVEREIGN_SHAPE_DIVIDERS exported');
assert(assetsContent.includes('SOVEREIGN_TRUST_BADGES'), 'SOVEREIGN_TRUST_BADGES exported');
assert(assetsContent.includes('SOVEREIGN_SECTION_BLUEPRINTS'), 'SOVEREIGN_SECTION_BLUEPRINTS exported');
assert(assetsContent.includes('SOVEREIGN_MOTION_PRESETS'), 'SOVEREIGN_MOTION_PRESETS exported');

// 4. Icons Bank
const iconsBankPath = path.join(__dirname, '../src/data/sovereignIconsBank.ts');
assert(fs.existsSync(iconsBankPath), 'sovereignIconsBank.ts exists');
const iconsContent = fs.readFileSync(iconsBankPath, 'utf8');
const iconMatches = iconsContent.match(/number:\s*(\d+)/g);
const iconCount = iconMatches ? iconMatches.length : 0;
assert(iconCount >= 66, `Sovereign icons bank contains at least 66 zero-CDN icons (got: ${iconCount})`);

// -------------------------------------------------------------
// Test Group 4: PHP Addon Suite Endpoints & Cross-Builder Shortcodes
// -------------------------------------------------------------
console.log('\n🔍 Test Group 4: Cross-Builder Endpoints & Shortcodes');

const registryPath = path.join(__dirname, '../elementor-addon-suite/includes/class-sovereign-widgets-registry.php');
const registryContent = fs.readFileSync(registryPath, 'utf8');

assert(
  registryContent.includes('/sedrazavi/v1') && registryContent.includes('/widgets-bank'),
  'REST route /sedrazavi/v1/widgets-bank registered'
);

assert(
  registryContent.includes('/sedrazavi/v1') && registryContent.includes('/assets-bank'),
  'REST route /sedrazavi/v1/assets-bank registered'
);

assert(
  registryContent.includes('sedrazavi-sovereign-suite'),
  'Elementor custom category "sedrazavi-sovereign-suite" registered'
);

// -------------------------------------------------------------
// Test Group 5: Zero-CDN Purity & Security Audit
// -------------------------------------------------------------
console.log('\n🔍 Test Group 5: Zero-CDN Purity & Security Verification');

assert(
  !gutenbergContent.includes('cdnjs.cloudflare.com') &&
  !gutenbergContent.includes('fonts.googleapis.com'),
  'Gutenberg blocks engine has zero external CDN dependencies'
);

assert(
  !iconsContent.includes('font-awesome') &&
  !iconsContent.includes('unpkg.com'),
  'Sovereign icons bank has zero external font-kit or CDN dependencies'
);

console.log('========================================================================');
console.log(`📊 Test Results: ${passedTests} / ${totalTests} passed`);
if (allPassed) {
  console.log('🎉 ALL PHASE 10 GUTENBERG & SOVEREIGN AUDIT CHECKS PASSED (100%)!');
} else {
  console.error('❌ SOME CHECKS FAILED!');
  process.exit(1);
}
console.log('========================================================================\n');
