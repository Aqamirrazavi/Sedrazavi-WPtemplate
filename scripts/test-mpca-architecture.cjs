/**
 * Autonomous Verification Suite: Modular Portable Capability Architecture (MPCA)
 * Validates the 6-layer architecture, Capability Registry, Package Manager,
 * Contract Registry, native Elementor 3-tab controls, and portable package packaging.
 *
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */

const fs = require('fs');
const path = require('path');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failCount++;
  }
}

console.log('========================================================================');
console.log('🏛️ MPCA Verification Suite: Modular Portable Capability Architecture');
console.log('========================================================================');

// Test Group 1: Master Architectural Documentation & ADR 007
console.log('\n🔍 Test Group 1: Architectural Documents & ADR 007');
const mpcaDocPath = path.join(__dirname, '..', 'docs', 'MODULAR_PORTABLE_CAPABILITY_ARCHITECTURE.md');
assert(fs.existsSync(mpcaDocPath), 'MODULAR_PORTABLE_CAPABILITY_ARCHITECTURE.md exists');
if (fs.existsSync(mpcaDocPath)) {
  const content = fs.readFileSync(mpcaDocPath, 'utf8');
  assert(content.includes('Decoupled 6-Layer Architecture'), 'Document specifies Decoupled 6-Layer Architecture');
  assert(content.includes('Native Sidebar Controls'), 'Document specifies Native Sidebar Controls standard');
  assert(content.includes('manifest.json'), 'Document defines portable package manifest schema');
  assert(content.includes('PHASE_CONTEXT'), 'Document outlines token-safe PHASE_CONTEXT development flow');
}

const adrPath = path.join(__dirname, '..', 'architecture-decisions.md');
if (fs.existsSync(adrPath)) {
  const adrContent = fs.readFileSync(adrPath, 'utf8');
  assert(adrContent.includes('ADR 007: Modular Portable Capability Architecture (MPCA)'), 'architecture-decisions.md contains ADR 007');
}

// Test Group 2: Capability Registry
console.log('\n🔍 Test Group 2: Capability Registry (class-capability-registry.php)');
const capRegistryPath = path.join(__dirname, '..', 'elementor-addon-suite', 'includes', 'class-capability-registry.php');
assert(fs.existsSync(capRegistryPath), 'class-capability-registry.php exists');
if (fs.existsSync(capRegistryPath)) {
  const content = fs.readFileSync(capRegistryPath, 'utf8');
  assert(content.includes('class Capability_Registry'), 'Capability_Registry class is defined');
  assert(content.includes('uas_pricing_switcher'), 'Core capability uas_pricing_switcher is registered');
  assert(content.includes('uas_fomo_countdown'), 'Core capability uas_fomo_countdown is registered');
  assert(content.includes('uas_before_after'), 'Core capability uas_before_after is registered');
  assert(content.includes('uas_stat_counter'), 'Core capability uas_stat_counter is registered');
  assert(content.includes('uas_floating_cta'), 'Core capability uas_floating_cta is registered');
  assert(content.includes('uas_sovereign_asset_banks'), 'Core capability uas_sovereign_asset_banks is registered');
  assert(content.includes("register_rest_route('sedrazavi/v1', '/capabilities'"), 'REST route /sedrazavi/v1/capabilities is declared');
  assert(content.includes("register_rest_route('sedrazavi/v1', '/health-diagnostics'"), 'REST route /sedrazavi/v1/health-diagnostics is declared');
  assert(content.includes('manage_options'), 'Admin permission gate uses manage_options capability');
}

// Test Group 3: Package Manager & Dependency Resolver
console.log('\n🔍 Test Group 3: Package Manager (class-package-manager.php)');
const pkgManagerPath = path.join(__dirname, '..', 'elementor-addon-suite', 'includes', 'class-package-manager.php');
assert(fs.existsSync(pkgManagerPath), 'class-package-manager.php exists');
if (fs.existsSync(pkgManagerPath)) {
  const content = fs.readFileSync(pkgManagerPath, 'utf8');
  assert(content.includes('class Package_Manager'), 'Package_Manager class is defined');
  assert(content.includes('validate_manifest'), 'Manifest validation method exists');
  assert(content.includes('get_portable_packages'), 'get_portable_packages method exists');
  assert(content.includes('package-pricing-switcher'), 'Portable package package-pricing-switcher is declared');
  assert(content.includes('package-fomo-countdown'), 'Portable package package-fomo-countdown is declared');
  assert(content.includes('package-before-after'), 'Portable package package-before-after is declared');
  assert(content.includes('package-stat-counter'), 'Portable package package-stat-counter is declared');
  assert(content.includes('package-floating-cta'), 'Portable package package-floating-cta is declared');
  assert(content.includes("register_rest_route('sedrazavi/v1', '/packages'"), 'REST route /sedrazavi/v1/packages is declared');
}

// Test Group 4: Contract Registry & Schemas
console.log('\n🔍 Test Group 4: Contract Registry (class-contract-registry.php)');
const contractRegistryPath = path.join(__dirname, '..', 'elementor-addon-suite', 'includes', 'class-contract-registry.php');
assert(fs.existsSync(contractRegistryPath), 'class-contract-registry.php exists');
if (fs.existsSync(contractRegistryPath)) {
  const content = fs.readFileSync(contractRegistryPath, 'utf8');
  assert(content.includes('class Contract_Registry'), 'Contract_Registry class is defined');
  assert(content.includes('get_capabilities'), 'Contract get_capabilities is registered');
  assert(content.includes('get_packages'), 'Contract get_packages is registered');
  assert(content.includes('ajax_import_single_template'), 'Contract ajax_import_single_template is registered');
  assert(content.includes("register_rest_route('sedrazavi/v1', '/contracts'"), 'REST route /sedrazavi/v1/contracts is declared');
}

// Test Group 5: Widget Base 3-Tab & Query Helpers
console.log('\n🔍 Test Group 5: Enhanced Widget Base Standard (class-widget-base.php)');
const widgetBasePath = path.join(__dirname, '..', 'elementor-addon-suite', 'includes', 'class-widget-base.php');
assert(fs.existsSync(widgetBasePath), 'class-widget-base.php exists');
if (fs.existsSync(widgetBasePath)) {
  const content = fs.readFileSync(widgetBasePath, 'utf8');
  assert(content.includes('add_typography_and_color_controls'), 'Helper add_typography_and_color_controls is implemented');
  assert(content.includes('add_container_style_controls'), 'Helper add_container_style_controls is implemented');
  assert(content.includes('add_standard_query_controls'), 'Helper add_standard_query_controls is implemented');
  assert(content.includes('is_pro_active'), 'Helper is_pro_active is implemented');
}

// Test Group 6: Plugin Boot & Admin Integration
console.log('\n🔍 Test Group 6: Plugin Booting & Admin Packages Screen');
const pluginMainPath = path.join(__dirname, '..', 'elementor-addon-suite', 'elementor-addon-suite.php');
if (fs.existsSync(pluginMainPath)) {
  const content = fs.readFileSync(pluginMainPath, 'utf8');
  assert(content.includes('class-capability-registry.php'), 'elementor-addon-suite.php loads class-capability-registry.php');
  assert(content.includes('class-package-manager.php'), 'elementor-addon-suite.php loads class-package-manager.php');
  assert(content.includes('class-contract-registry.php'), 'elementor-addon-suite.php loads class-contract-registry.php');
}

const adminSettingsPath = path.join(__dirname, '..', 'elementor-addon-suite', 'includes', 'class-admin-settings.php');
if (fs.existsSync(adminSettingsPath)) {
  const content = fs.readFileSync(adminSettingsPath, 'utf8');
  assert(content.includes('universal-elementor-packages'), 'Admin menu registers universal-elementor-packages submenu');
  assert(content.includes('render_packages_page'), 'render_packages_page method is implemented');
}

// Test Group 7: Phase 5 Landing Page Widgets & Container Templates
console.log('\n🔍 Test Group 7: Phase 5 Landing Page Widgets & Container Templates');
const statWidgetPath = path.join(__dirname, '..', 'elementor-addon-suite', 'includes', 'widgets', 'class-widget-stat-counter.php');
assert(fs.existsSync(statWidgetPath), 'class-widget-stat-counter.php exists');

const floatingCtaPath = path.join(__dirname, '..', 'elementor-addon-suite', 'includes', 'widgets', 'class-widget-floating-cta.php');
assert(fs.existsSync(floatingCtaPath), 'class-widget-floating-cta.php exists');

const statJsPath = path.join(__dirname, '..', 'elementor-addon-suite', 'assets', 'js', 'widgets', 'stat-counter.js');
assert(fs.existsSync(statJsPath), 'stat-counter.js exists');

const floatingJsPath = path.join(__dirname, '..', 'elementor-addon-suite', 'assets', 'js', 'widgets', 'floating-cta.js');
assert(fs.existsSync(floatingJsPath), 'floating-cta.js exists');

const tplStatPath = path.join(__dirname, '..', 'elementor-addon-suite', 'templates', 'template-section-stat-counter.json');
assert(fs.existsSync(tplStatPath), 'template-section-stat-counter.json exists');
if (fs.existsSync(tplStatPath)) {
  const tplData = JSON.parse(fs.readFileSync(tplStatPath, 'utf8'));
  assert(tplData.version && tplData.content, 'template-section-stat-counter.json has valid Elementor schema');
}

const tplProofPath = path.join(__dirname, '..', 'elementor-addon-suite', 'templates', 'template-section-client-proof.json');
assert(fs.existsSync(tplProofPath), 'template-section-client-proof.json exists');

const tplFloatingPath = path.join(__dirname, '..', 'elementor-addon-suite', 'templates', 'template-section-floating-lead.json');
assert(fs.existsSync(tplFloatingPath), 'template-section-floating-lead.json exists');

console.log('========================================================================');
console.log(`📊 Test Results: ${passCount} passed, ${failCount} failed`);
if (failCount === 0) {
  console.log('🎉 ALL MPCA TESTS PASSED (100%)!');
} else {
  console.error(`❌ ${failCount} TESTS FAILED!`);
  process.exit(1);
}
console.log('========================================================================');

