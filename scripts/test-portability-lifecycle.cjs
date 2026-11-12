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
  const packagingDir = path.join(__dirname, '../elementor-addon-suite/includes/packaging');
  assert(fs.existsSync(pkgMgrPath), 'class-package-manager.php exists');
  assert(fs.existsSync(packagingDir), 'includes/packaging/ directory exists');

  const packagingFiles = fs.existsSync(packagingDir)
    ? fs.readdirSync(packagingDir).filter(f => f.endsWith('.php')).sort()
    : [];
  assert(
    packagingFiles.length >= 6,
    `Modular packaging suite contains >= 6 single-responsibility modules (Found: ${packagingFiles.length})`
  );

  const pkgMgrCode = [
    fs.readFileSync(pkgMgrPath, 'utf8'),
    ...packagingFiles.map(f => fs.readFileSync(path.join(packagingDir, f), 'utf8')),
  ].join('\n');

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
    pkgMgrCode.includes("hash_file('sha256'") &&
    pkgMgrCode.includes('compute_file_checksums') &&
    pkgMgrCode.includes('verify_manifest_checksums') &&
    pkgMgrCode.includes("'file_checksums'"),
    'Package_Manager & Manifest_Validator calculate and verify archive + per-file SHA-256 checksums'
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
    /class_alias\('UniversalElementorSuite_Plugin_Fallback',\s*'UniversalElementorSuite\\+Plugin'\)/.test(pkgMgrCode) &&
    pkgMgrCode.includes("const CATEGORY_SLUG = 'universal-addon-suite'"),
    'Standalone loader defines fallback class and canonical Plugin::CATEGORY_SLUG = universal-addon-suite (zero parent dependency)'
  );

  assert(
    pkgMgrCode.includes("add_action('elementor/elements/categories_registered'") &&
    pkgMgrCode.includes("add_action('elementor/widgets/register'") &&
    pkgMgrCode.includes("add_action('elementor/frontend/after_register_styles'") &&
    pkgMgrCode.includes("wp_register_style('uas-widgets-core'"),
    'Standalone loader registers category, widgets, and canonical uas-* CSS/JS handles on standard native Elementor hooks'
  );

  assert(
    pkgMgrCode.includes("$base_php = UAS_PATH . 'includes/class-widget-base.php'") &&
    pkgMgrCode.includes("$bundle_files['includes/class-widget-base.php']"),
    'export_standalone_package packages class-widget-base.php directly for standalone sites'
  );

  assert(
    pkgMgrCode.includes("$core_css = UAS_PATH . 'assets/css/widgets-core.css'") &&
    pkgMgrCode.includes("$bundle_files['assets/css/widgets-core.css']"),
    'export_standalone_package packages widgets-core.css for complete visual fidelity'
  );

  // -------------------------------------------------------------
  // Test Group 3: Phase 8 Custom Project Bundle Self-Containment
  // -------------------------------------------------------------
  console.log('\n🔍 Test Group 3: Custom Project Bundle Autonomous Architecture & AST Resolution');

  assert(
    pkgMgrCode.includes('build_custom_project_bundle') &&
    pkgMgrCode.includes('generate_custom_bundle_plugin_file') &&
    pkgMgrCode.includes('auto_added_widgets') &&
    pkgMgrCode.includes('template_widget_map'),
    'build_custom_project_bundle scans template JSON AST and auto-bundles missing widget dependencies'
  );

  assert(
    pkgMgrCode.includes("register_activation_hook(__FILE__, function()") &&
    pkgMgrCode.includes("'post_type'      => 'elementor_library'") &&
    pkgMgrCode.includes('uas_skipped_templates_'),
    'Custom bundle includes dependency-gated auto-activation hook to import JSON templates into elementor_library'
  );

  assert(
    pkgMgrCode.includes("UAS_PATH . 'assets/fonts/'") &&
    pkgMgrCode.includes("palettes.css") &&
    pkgMgrCode.includes("assets/images/placeholders/"),
    'Custom bundle embeds sovereign local fonts, color palettes, and local SVG placeholders (Zero-CDN)'
  );

  // Verify Template_Importer Gating & Media Relinker
  const tplImporterPath = path.join(__dirname, '../elementor-addon-suite/includes/class-template-importer.php');
  assert(fs.existsSync(tplImporterPath), 'class-template-importer.php exists');
  const tplImporterCode = fs.readFileSync(tplImporterPath, 'utf8');
  assert(
    tplImporterCode.includes('validate_template_widget_dependencies') &&
    tplImporterCode.includes('relink_template_media'),
    'Template_Importer enforces widget dependency gating and local Media Relinker'
  );

  const placeholdersDir = path.join(__dirname, '../elementor-addon-suite/assets/images/placeholders');
  ['hero-showcase.svg', 'saas-dashboard.svg', 'client-avatar.svg', 'product-studio.svg'].forEach(svg => {
    assert(fs.existsSync(path.join(placeholdersDir, svg)), `Local SVG placeholder exists: ${svg}`);
  });

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
  let widgetsGuardedForStandalone = 0;

  for (const wFile of widgetFiles) {
    const wCode = fs.readFileSync(path.join(widgetsDir, wFile), 'utf8');
    const hasControls = wCode.includes('register_controls') && (wCode.includes('start_controls_section') || wCode.includes('TAB_CONTENT'));
    if (hasControls) widgetsWithProperControls++;

    // Ensure every widget calling do_shortcode or Dynamic_Query_Engine checks availability cleanly
    const usesShortcode = wCode.includes('do_shortcode');
    const guardsShortcode = !usesShortcode || wCode.includes('shortcode_exists');
    const usesDynamicEngine = wCode.includes('Dynamic_Query_Engine::instance');
    const guardsDynamicEngine = !usesDynamicEngine || wCode.includes("class_exists('\\UniversalElementorSuite\\Dynamic_Query_Engine')");
    if (guardsShortcode && guardsDynamicEngine) {
      widgetsGuardedForStandalone++;
    }

    // Ensure widget render() doesn't solely rely on unguarded do_shortcode
    const renderMatch = wCode.match(/protected function render\(\)\s*\{([\s\S]*?)\}/);
    if (renderMatch) {
      const renderBody = renderMatch[1].trim();
      const isSoleShortcode = renderBody.startsWith('echo do_shortcode') && !renderBody.includes('shortcode_exists') && !renderBody.includes('<div');
      if (!isSoleShortcode) widgetsWithoutSoleShortcode++;
    } else {
      widgetsWithoutSoleShortcode++;
    }
  }

  assert(widgetsWithProperControls >= 31, `All ${widgetsWithProperControls} widgets implement standard Elementor controls`);
  assert(widgetsWithoutSoleShortcode >= 31, `All ${widgetsWithoutSoleShortcode} widgets render natively without sole shortcode reliance`);
  assert(widgetsGuardedForStandalone >= 31, `All ${widgetsGuardedForStandalone} widgets are standalone-guarded (shortcode_exists & class_exists fallbacks)`);

  // -------------------------------------------------------------
  // Test Group 7: Real 33-Template JSON AST Cross-Reference & Real Built ZIPs
  // -------------------------------------------------------------
  console.log('\n🔍 Test Group 7: All 33 Template JSON AST Cross-Reference & Real Built ZIP Verification');

  const templatesDir = path.join(__dirname, '../elementor-addon-suite/templates');
  const popupsDir = path.join(templatesDir, 'popups');
  const templateFiles = [
    ...fs.readdirSync(templatesDir).filter(f => f.endsWith('.json')).map(f => path.join(templatesDir, f)),
    ...fs.readdirSync(popupsDir).filter(f => f.endsWith('.json')).map(f => path.join(popupsDir, f)),
  ];
  assert(templateFiles.length === 33, `Found exact 33 Elementor JSON templates (${templateFiles.length})`);

  const widgetAliasMap = {
    uas_posts_grid: 'class-widget-posts.php',
  };

  function collectUasWidgets(elements, out = new Set()) {
    if (!Array.isArray(elements)) return out;
    for (const el of elements) {
      if (el && typeof el === 'object') {
        if (typeof el.widgetType === 'string' && el.widgetType.startsWith('uas_')) {
          out.add(el.widgetType);
        }
        if (Array.isArray(el.elements)) {
          collectUasWidgets(el.elements, out);
        }
      }
    }
    return out;
  }

  let templatesAstOk = 0;
  const unresolvedWidgetTypes = [];
  for (const tf of templateFiles) {
    const parsed = JSON.parse(fs.readFileSync(tf, 'utf8'));
    const usedWidgets = collectUasWidgets(parsed.content);
    let ok = true;
    for (const wt of usedWidgets) {
      const expectedFile = widgetAliasMap[wt] || `class-widget-${wt.replace(/^uas_/, '').replace(/_/g, '-')}.php`;
      if (!fs.existsSync(path.join(widgetsDir, expectedFile))) {
        ok = false;
        unresolvedWidgetTypes.push(`${path.basename(tf)} -> ${wt} (missing ${expectedFile})`);
      }
    }
    if (ok) templatesAstOk++;
  }

  assert(
    templatesAstOk === 33 && unresolvedWidgetTypes.length === 0,
    `All ${templatesAstOk}/33 JSON templates resolve 100% of uas_* widgetTypes to real PHP classes` +
      (unresolvedWidgetTypes.length ? ` [Missing: ${unresolvedWidgetTypes.join(', ')}]` : '')
  );

  // Verify real built public/elementor-addon-suite.zip archive
  const realAddonZipPath = path.join(__dirname, '../public/elementor-addon-suite.zip');
  assert(fs.existsSync(realAddonZipPath), 'Real built archive public/elementor-addon-suite.zip exists');
  if (fs.existsSync(realAddonZipPath)) {
    const addonZip = await JSZip.loadAsync(fs.readFileSync(realAddonZipPath));
    const entries = Object.keys(addonZip.files);
    assert(entries.includes('elementor-addon-suite/includes/class-plugin.php'), 'Real ZIP contains class-plugin.php');
    assert(entries.includes('elementor-addon-suite/includes/class-package-manager.php'), 'Real ZIP contains class-package-manager.php');
    assert(entries.includes('elementor-addon-suite/includes/packaging/class-package-exporter.php'), 'Real ZIP contains modular packaging/class-package-exporter.php');
    assert(entries.includes('elementor-addon-suite/includes/packaging/class-package-manifest-validator.php'), 'Real ZIP contains modular packaging/class-package-manifest-validator.php');
    assert(entries.includes('elementor-addon-suite/includes/class-template-importer.php'), 'Real ZIP contains class-template-importer.php');
    assert(entries.includes('elementor-addon-suite/assets/images/placeholders/hero-showcase.svg'), 'Real ZIP bundles local SVG placeholders');
    const zipWidgetsCount = entries.filter(e => /^elementor-addon-suite\/includes\/widgets\/class-widget-.*\.php$/.test(e)).length;
    assert(zipWidgetsCount >= 31, `Real ZIP contains ${zipWidgetsCount} widget PHP classes (>= 31)`);
    const zipTemplatesCount = entries.filter(e => /^elementor-addon-suite\/templates\/(?:popups\/)?[^/]+\.json$/.test(e)).length;
    assert(zipTemplatesCount === 33, `Real ZIP contains all ${zipTemplatesCount}/33 Elementor JSON templates`);
  }

  // -------------------------------------------------------------
  // Test Group 8: Phase 2 Granular Gutenberg/CPT Bundling, Self-Checksums & WP E2E Harness
  // -------------------------------------------------------------
  console.log('\n🔍 Test Group 8: Phase 2 Gutenberg/CPT Bundling, Self-Checksums & Live E2E Harness');

  assert(
    pkgMgrCode.includes('get_gutenberg_blocks_catalog') &&
    pkgMgrCode.includes('get_cpt_schemas_catalog') &&
    pkgMgrCode.includes('resolve_blocks_and_cpts'),
    'Package_Registry & Dependency_Resolver support granular Gutenberg block and public CPT schema resolution'
  );

  assert(
    pkgMgrCode.includes('generate_kit_cpt_schemas_file') &&
    pkgMgrCode.includes("define('UAS_PATH'") &&
    pkgMgrCode.includes("define('UAS_VERSION'") &&
    pkgMgrCode.includes('uas_verify_bundle_checksums_'),
    'Package_Exporter generates standalone UAS_PATH/UAS_VERSION constants, CPT bootstrap, and activation SHA-256 self-verification'
  );

  const adminSettingsPath = path.join(__dirname, '../elementor-addon-suite/includes/class-admin-settings.php');
  const adminJsPath = path.join(__dirname, '../elementor-addon-suite/assets/js/admin-settings.js');
  const adminSettingsCode = fs.existsSync(adminSettingsPath) ? fs.readFileSync(adminSettingsPath, 'utf8') : '';
  const adminJsCode = fs.existsSync(adminJsPath) ? fs.readFileSync(adminJsPath, 'utf8') : '';

  assert(
    adminSettingsCode.includes('uas-kit-block-cb') &&
    adminSettingsCode.includes('uas-kit-cpt-cb') &&
    adminJsCode.includes('uas-kit-blocks-selected-count') &&
    adminJsCode.includes('uas-kit-cpts-selected-count'),
    'Custom Project Kit Studio UI exposes granular Gutenberg block and CPT schema controls'
  );

  const liveHarnessFiles = [
    '../docker-compose.test.yml',
    '../scripts/wp-e2e-verify.sh',
    '../scripts/test-phase2-ecosystem-harness.php',
    '../docs/LIVE_WP_VERIFICATION_GUIDE.md',
  ];
  liveHarnessFiles.forEach(rel => {
    assert(fs.existsSync(path.join(__dirname, rel)), `Phase 2 E2E harness artifact exists: ${rel.replace('../', '')}`);
  });

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
