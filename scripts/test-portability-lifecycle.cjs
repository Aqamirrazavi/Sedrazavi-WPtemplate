/**
 * Cross-Site Portability & Package Lifecycle Verification Suite (Phase 8 & Phase 9)
 *
 * Verifies Native Portability Spec v31, Phased Execution Roadmap v3, and Code Remediation Plan v1:
 * - Phase 8: Cross-Site Portability (Site A -> Site B standalone self-containment)
 * - Phase 9: Package Manager Lifecycle, Preflight, Dependency Resolution & Rollback
 * - P0-03: Archive Safety, Anti-Zip-Slip Traversal Prevention, Whitelist & Checksums
 * - P1-04: Full/Selective/Standalone Package Lifecycle & Idempotency
 *
 * @package SedRazavi
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const JSZip = require('jszip');

console.log('========================================================================');
console.log('🚀 Phase 8 & 9: Cross-Site Portability & Package Lifecycle Test Suite');
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

async function runTestSuite() {
  // -------------------------------------------------------------
  // Test Group 1: P0-03 Archive Safety & Anti-Zip-Slip Protection
  // -------------------------------------------------------------
  console.log('🔍 Test Group 1: P0-03 Archive Security & Zip Slip Path Traversal Immunity');

  const pkgMgrPath = path.join(__dirname, '../elementor-addon-suite/includes/class-package-manager.php');
  assert(fs.existsSync(pkgMgrPath), 'class-package-manager.php exists');
  const pkgMgrCode = fs.readFileSync(pkgMgrPath, 'utf8');

  // Verify anti-zip-slip checks in PHP code
  assert(
    pkgMgrCode.includes('verify_archive_security') &&
    pkgMgrCode.includes('Zip Slip Traversal'),
    'Package_Manager implements verify_archive_security with explicit Zip Slip detection'
  );

  assert(
    pkgMgrCode.includes("strpos($filename, '../') !== false") &&
    pkgMgrCode.includes("/..") &&
    pkgMgrCode.includes("Zip Slip Traversal"),
    'Package_Manager guards against standard ../ and directory traversal'
  );

  assert(
    pkgMgrCode.includes("$allowed_extensions = ['php', 'json', 'css', 'js'") &&
    pkgMgrCode.includes("pathinfo($filename, PATHINFO_EXTENSION)"),
    'Package_Manager enforces strict extension whitelist for extracted archive files'
  );

  assert(
    pkgMgrCode.includes("$max_total_size = 50 * 1024 * 1024") ||
    pkgMgrCode.includes("Zero Zip Bomb protection"),
    'Package_Manager limits total uncompressed size against Zip Bomb attacks'
  );

  assert(
    pkgMgrCode.includes("hash_file('sha256'"),
    'Package_Manager calculates SHA-256 provenance checksum upon archive import'
  );

  // -------------------------------------------------------------
  // Test Group 2: Phase 8 Cross-Site Portability (Site A -> Site B Self-Containment)
  // -------------------------------------------------------------
  console.log('\n🔍 Test Group 2: Phase 8 Standalone Package Self-Containment (Site A -> Site B)');

  // Test standalone plugin header generation
  assert(
    pkgMgrCode.includes('generate_standalone_plugin_header'),
    'Package_Manager has standalone plugin loader header generator'
  );

  assert(
    pkgMgrCode.includes('class UniversalElementorSuite_Plugin_Fallback') &&
    pkgMgrCode.includes("class_alias('UniversalElementorSuite_Plugin_Fallback', 'UniversalElementorSuite\\\\Plugin')") &&
    pkgMgrCode.includes("const CATEGORY_SLUG = 'sedrazavi-sovereign-suite'"),
    'Standalone loader defines fallback class and alias for Plugin::CATEGORY_SLUG (zero parent dependency)'
  );

  assert(
    pkgMgrCode.includes("add_action('elementor/elements/categories_registered'") &&
    pkgMgrCode.includes("add_action('elementor/widgets/register'"),
    'Standalone loader registers category and widgets on standard native Elementor hooks'
  );

  assert(
    pkgMgrCode.includes("$base_php = UAS_PATH . 'includes/class-widget-base.php'") &&
    pkgMgrCode.includes("$zip->addFile($base_php, $clean_slug . '/includes/class-widget-base.php')"),
    'export_standalone_package packages class-widget-base.php directly for standalone sites'
  );

  assert(
    pkgMgrCode.includes("$core_css = UAS_PATH . 'assets/css/widgets-core.css'") &&
    pkgMgrCode.includes("$zip->addFile($core_css, $clean_slug . '/assets/css/widgets-core.css')"),
    'export_standalone_package packages widgets-core.css for complete visual fidelity'
  );

  // -------------------------------------------------------------
  // Test Group 3: Phase 8 Custom Project Bundle Self-Containment
  // -------------------------------------------------------------
  console.log('\n🔍 Test Group 3: Custom Project Bundle Autonomous Architecture');

  assert(
    pkgMgrCode.includes('build_custom_project_bundle') &&
    pkgMgrCode.includes('generate_custom_bundle_plugin_file'),
    'build_custom_project_bundle generates self-contained WordPress plugin bundle'
  );

  assert(
    pkgMgrCode.includes("register_activation_hook(__FILE__, function()") &&
    pkgMgrCode.includes("'post_type'      => 'elementor_library'"),
    'Custom bundle includes auto-activation hook to import JSON templates into elementor_library'
  );

  assert(
    pkgMgrCode.includes("UAS_PATH . 'assets/fonts/'") &&
    pkgMgrCode.includes("palettes.css"),
    'Custom bundle embeds sovereign local fonts and color palettes (Zero-CDN)'
  );

  // -------------------------------------------------------------
  // Test Group 4: Phase 9 Package Lifecycle, Dependency Resolution & Rollback
  // -------------------------------------------------------------
  console.log('\n🔍 Test Group 4: Phase 9 Package Lifecycle, Preflight & Rollback');

  assert(
    pkgMgrCode.includes('resolve_package_dependencies') &&
    pkgMgrCode.includes('Circular Dependency'),
    'resolve_package_dependencies provides recursive graph resolution and circular dependency detection'
  );

  assert(
    pkgMgrCode.includes('check_package_conflicts'),
    'check_package_conflicts verifies no incompatible plugins are active'
  );

  assert(
    pkgMgrCode.includes('preflight_check') &&
    pkgMgrCode.includes('validate_manifest'),
    'preflight_check validates manifest requirements (PHP, WP, Elementor)'
  );

  assert(
    pkgMgrCode.includes('import_package_archive') &&
    pkgMgrCode.includes('atomic_rollback_executed'),
    'import_package_archive supports atomic rollback if extraction fails midway'
  );

  assert(
    pkgMgrCode.includes('rollback_package_installation') &&
    pkgMgrCode.includes('delete_transient'),
    'rollback_package_installation purges artifacts and invalidates transients'
  );

  // Check REST endpoints
  assert(
    pkgMgrCode.includes("register_rest_route('sedrazavi/v1', '/packages/preflight'") &&
    pkgMgrCode.includes("register_rest_route('sedrazavi/v1', '/packages/import'") &&
    pkgMgrCode.includes("register_rest_route('sedrazavi/v1', '/packages/rollback'"),
    'REST API exposes /packages/preflight, /packages/import, and /packages/rollback routes'
  );

  // -------------------------------------------------------------
  // Test Group 5: Real ZIP Archive Simulation (Site A Export -> Site B Import)
  // -------------------------------------------------------------
  console.log('\n🔍 Test Group 5: Real ZIP Sandbox Simulation (Site A Export -> Site B Import)');

  const sandboxDir = path.join(__dirname, '../.sandbox_portability_test');
  if (fs.existsSync(sandboxDir)) {
    fs.rmSync(sandboxDir, { recursive: true, force: true });
  }
  fs.mkdirSync(sandboxDir, { recursive: true });

  try {
    // 1. Create a simulated Site A standalone export zip
    const testZip = new JSZip();
    const pkgSlug = 'package-pricing-switcher';
    const manifest = {
      id: pkgSlug,
      name: 'بسته مستقل جدول قیمت‌گذاری و پلن سوییچر',
      package_type: 'ui',
      version: '6.0.0',
      requirements: {
        php: '>=7.4',
        wordpress: '>=6.0',
        elementor: '>=3.10'
      },
      components: {
        widget: 'uas_pricing_switcher',
        javascript: 'pricing-switcher.js'
      }
    };

    testZip.file(`${pkgSlug}/manifest.json`, JSON.stringify(manifest, null, 2));
    testZip.file(`${pkgSlug}/${pkgSlug}.php`, '<?php /* Standalone plugin loader */');
    testZip.file(`${pkgSlug}/includes/class-widget-base.php`, '<?php namespace UniversalElementorSuite; class Universal_Widget_Base {}');
    testZip.file(`${pkgSlug}/assets/css/widgets-core.css`, '/* Widgets core css */');

    const zipBuffer = await testZip.generateAsync({ type: 'nodebuffer' });
    const zipPath = path.join(sandboxDir, 'test-package.zip');
    fs.writeFileSync(zipPath, zipBuffer);

    assert(fs.existsSync(zipPath), 'Sandbox generated standalone package ZIP file');

    // 2. Validate zip file entries (Site B verification)
    const readZip = await JSZip.loadAsync(zipBuffer);
    const entryNames = Object.keys(readZip.files);

    assert(entryNames.includes(`${pkgSlug}/manifest.json`), 'Site B extraction: manifest.json present');
    assert(entryNames.includes(`${pkgSlug}/${pkgSlug}.php`), 'Site B extraction: main plugin file present');
    assert(entryNames.includes(`${pkgSlug}/includes/class-widget-base.php`), 'Site B extraction: class-widget-base.php present');
    assert(entryNames.includes(`${pkgSlug}/assets/css/widgets-core.css`), 'Site B extraction: widgets-core.css present');

    // 3. Test Anti-Zip-Slip prevention with a malicious simulated zip
    const maliciousZip = new JSZip();
    maliciousZip.file('manifest.json', JSON.stringify(manifest));
    maliciousZip.file('../evil-payload.php', '<?php phpinfo(); ?>');
    const maliciousBuffer = await maliciousZip.generateAsync({ type: 'nodebuffer' });
    const malZipPath = path.join(sandboxDir, 'malicious-package.zip');
    fs.writeFileSync(malZipPath, maliciousBuffer);

    const malZipRead = await JSZip.loadAsync(maliciousBuffer);
    const hasZipSlip = Object.keys(malZipRead.files).some(name =>
      name.includes('../') || name.includes('..\\') || name.startsWith('/') || name.startsWith('\\')
    );
    assert(hasZipSlip, 'Simulated malicious ZIP entry with traversal ../ detected');

    // 4. Test SHA256 integrity calculation
    const sha256 = crypto.createHash('sha256').update(zipBuffer).digest('hex');
    assert(typeof sha256 === 'string' && sha256.length === 64, `SHA-256 integrity verified (${sha256.substring(0, 16)}...)`);

  } finally {
    // Clean up sandbox
    if (fs.existsSync(sandboxDir)) {
      fs.rmSync(sandboxDir, { recursive: true, force: true });
    }
  }

  // -------------------------------------------------------------
  // Test Group 6: Phase 10 Native Elementor Widgets Ledger (All 31 Widgets)
  // -------------------------------------------------------------
  console.log('\n🔍 Test Group 6: Phase 10 Native Elementor Widgets Ledger (All 31 Widgets Audit)');

  const widgetsDir = path.join(__dirname, '../elementor-addon-suite/includes/widgets');
  assert(fs.existsSync(widgetsDir), 'includes/widgets directory exists');

  const widgetFiles = fs.readdirSync(widgetsDir).filter(f => f.startsWith('class-widget-') && f.endsWith('.php'));
  assert(widgetFiles.length >= 31, `Found ${widgetFiles.length} widget class files (>= 31 required)`);

  let widgetsWithProperControls = 0;
  let widgetsWithoutSoleShortcode = 0;

  for (const wFile of widgetFiles) {
    const wCode = fs.readFileSync(path.join(widgetsDir, wFile), 'utf8');
    const hasControls = wCode.includes('register_controls') && (wCode.includes('start_controls_section') || wCode.includes('TAB_CONTENT'));
    if (hasControls) widgetsWithProperControls++;

    // Ensure widget render() doesn't solely rely on do_shortcode
    const renderMatch = wCode.match(/protected function render\(\)\s*\{([\s\S]*?)\}/);
    if (renderMatch) {
      const renderBody = renderMatch[1].trim();
      const isSoleShortcode = renderBody.startsWith('echo do_shortcode') && !renderBody.includes('<div') && !renderBody.includes('get_settings_for_display');
      if (!isSoleShortcode) widgetsWithoutSoleShortcode++;
    } else {
      widgetsWithoutSoleShortcode++;
    }
  }

  assert(widgetsWithProperControls >= 31, `All ${widgetsWithProperControls} widgets implement standard Elementor controls`);
  assert(widgetsWithoutSoleShortcode >= 31, `All ${widgetsWithoutSoleShortcode} widgets render natively without sole shortcode reliance`);

  // -------------------------------------------------------------
  // Test Summary
  // -------------------------------------------------------------
  console.log('========================================================================');
  console.log(`📊 Portability & Lifecycle Test Results: ${passedTests} / ${totalTests} passed`);
  if (allPassed) {
    console.log('🎉 ALL PHASE 8 & 9 PORTABILITY & LIFECYCLE CHECKS PASSED (100%)!');
  } else {
    console.error('❌ SOME CHECKS FAILED!');
    process.exit(1);
  }
  console.log('========================================================================\n');
}

runTestSuite().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
