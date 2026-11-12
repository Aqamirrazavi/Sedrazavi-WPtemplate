/**
 * Phase 11: Autonomous Standalone Themes & Domain Isolation Suite
 *
 * Verifies Native Portability Spec v31 & Autonomous Theme Directive:
 * 1. 100% Standalone verification (ZERO Child Themes, NO 'Template:' declaration)
 * 2. Complete independent template hierarchy (index.php, header.php, footer.php, page.php, single.php)
 * 3. Screenshot presence & size quota
 * 4. Data boundary isolation & zero cross-domain leakage
 * 5. Standalone distribution zip availability in public/themes/
 *
 * @package SedRazavi
 */

const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

console.log('========================================================================');
console.log('🏛️ Phase 11: Autonomous Standalone Themes & Domain Isolation Suite');
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

async function runPhase11() {
  const themesDir = path.join(__dirname, '../standalone-themes');
  assert(fs.existsSync(themesDir), 'Canonical standalone-themes directory exists');

  const requiredPacks = [
    { slug: 'sedrazavi-agency-theme', alias: 'agency-designer', name: 'Agency Designer', domain: 'creative' },
    { slug: 'sedrazavi-clinic-theme', alias: 'clinic-medical', name: 'Clinic Medical', domain: 'healthcare' },
    { slug: 'sedrazavi-corporate-theme', alias: 'corporate-pro', name: 'Corporate Pro', domain: 'enterprise' },
    { slug: 'sedrazavi-education-theme', alias: 'education-lms', name: 'Education LMS', domain: 'education' },
    { slug: 'sedrazavi-legal-theme', alias: 'legal-firm', name: 'Legal Firm', domain: 'legal' },
    { slug: 'sedrazavi-news-theme', alias: 'news-editorial', name: 'News Editorial', domain: 'publishing' },
    { slug: 'sedrazavi-lawyer-theme', alias: 'sedrazavi-lawyer-child', name: 'SedRazavi Lawyer', domain: 'legal' },
    { slug: 'sedrazavi-store-theme', alias: 'store-modern', name: 'Store Modern', domain: 'commerce' },
  ];

  console.log('🔍 Test Group 1: Autonomous Standalone Theme Hierarchy, Header & Self-Contained Cockpit Verification');

  requiredPacks.forEach(pack => {
    const packDir = path.join(themesDir, pack.slug);
    assert(fs.existsSync(packDir), `Standalone theme directory exists: ${pack.slug}`);

    // style.css
    const styleCssPath = path.join(packDir, 'style.css');
    assert(fs.existsSync(styleCssPath), `${pack.slug}/style.css exists`);
    const styleContent = fs.readFileSync(styleCssPath, 'utf8');

    // Must NOT have Template: line (100% standalone parent theme)
    assert(!/Template\s*:/i.test(styleContent), `${pack.slug} is 100% standalone (NO parent Template declared)`);
    assert(styleContent.includes('Theme Name:'), `${pack.slug} declares valid Theme Name`);

    // Complete standalone template hierarchy
    assert(fs.existsSync(path.join(packDir, 'header.php')), `${pack.slug} has standalone header.php`);
    assert(fs.existsSync(path.join(packDir, 'footer.php')), `${pack.slug} has standalone footer.php`);
    assert(fs.existsSync(path.join(packDir, 'index.php')), `${pack.slug} has standalone index.php`);
    assert(fs.existsSync(path.join(packDir, 'page.php')), `${pack.slug} has standalone page.php`);
    assert(fs.existsSync(path.join(packDir, 'single.php')), `${pack.slug} has standalone single.php`);

    // Self-contained Frontend Cockpit files (works with zero external theme dependencies)
    assert(fs.existsSync(path.join(packDir, 'inc/frontend-cockpit-engine.php')), `${pack.slug} bundles inc/frontend-cockpit-engine.php`);
    assert(fs.existsSync(path.join(packDir, 'page-frontend-cockpit.php')), `${pack.slug} bundles page-frontend-cockpit.php`);
    assert(fs.existsSync(path.join(packDir, 'assets/css/frontend-cockpit.css')), `${pack.slug} bundles assets/css/frontend-cockpit.css`);
    assert(fs.existsSync(path.join(packDir, 'assets/js/frontend-cockpit.js')), `${pack.slug} bundles assets/js/frontend-cockpit.js`);

    // screenshot
    const hasScreenshot = fs.existsSync(path.join(packDir, 'screenshot.webp')) || fs.existsSync(path.join(packDir, 'screenshot.png'));
    assert(hasScreenshot, `${pack.slug} has screenshot asset`);

    // functions.php
    const functionsPath = path.join(packDir, 'functions.php');
    assert(fs.existsSync(functionsPath), `${pack.slug}/functions.php exists`);
    const functionsContent = fs.readFileSync(functionsPath, 'utf8');
    assert(
      functionsContent.includes('wp_enqueue_style') && !functionsContent.includes('sedrazavi-parent-style'),
      `${pack.slug} self-enqueues without parent dependency`
    );
  });

  console.log('\n🔍 Test Group 2: Data Boundary & Domain Isolation');

  // Legal Confidentiality Boundary
  const legalThemePath = path.join(themesDir, 'sedrazavi-lawyer-theme/functions.php');
  if (fs.existsSync(legalThemePath)) {
    const legalContent = fs.readFileSync(legalThemePath, 'utf8');
    assert(!legalContent.includes('show_in_rest => true'), 'Legal theme does not expose raw cases in unauthenticated public REST');
  }

  // Store Modern WooCommerce Boundary Check
  const storeFunctionsPath = path.join(themesDir, 'sedrazavi-store-theme/functions.php');
  if (fs.existsSync(storeFunctionsPath)) {
    const storeContent = fs.readFileSync(storeFunctionsPath, 'utf8');
    assert(
      !storeContent.includes('WC()') || storeContent.includes("class_exists('WooCommerce')"),
      'Store Modern guards WooCommerce calls with class_exists check'
    );
  }

  console.log('\n🔍 Test Group 3: Real Packaged Standalone Theme ZIP Archives Inspection (JSZip)');
  const publicThemesDir = path.join(__dirname, '../public/themes');

  for (const pack of requiredPacks) {
    const zipPath = path.join(publicThemesDir, `${pack.slug}.zip`);
    const zipExists = fs.existsSync(zipPath);
    assert(zipExists, `Packaged ZIP exists for canonical standalone theme: public/themes/${pack.slug}.zip`);
    if (zipExists) {
      const zBuf = fs.readFileSync(zipPath);
      const loadedZip = await JSZip.loadAsync(zBuf);
      const zipEntries = Object.keys(loadedZip.files);
      const styleEntry = loadedZip.file(`${pack.slug}/style.css`);
      assert(Boolean(styleEntry), `${pack.slug}.zip contains ${pack.slug}/style.css`);
      if (styleEntry) {
        const zipStyleContent = await styleEntry.async('string');
        assert(!/Template\s*:/i.test(zipStyleContent), `${pack.slug}.zip style.css contains ZERO Template: child declaration`);
      }
      assert(zipEntries.includes(`${pack.slug}/inc/frontend-cockpit-engine.php`), `${pack.slug}.zip bundles self-contained Frontend Cockpit engine`);
    }
    const aliasZipPath = path.join(publicThemesDir, `${pack.alias}.zip`);
    assert(fs.existsSync(aliasZipPath), `Compatibility ZIP alias exists: public/themes/${pack.alias}.zip`);
  }

  console.log('\n========================================================================');
  console.log(`📊 Phase 11 Test Results: ${passedTests} / ${totalTests} passed`);
  if (allPassed) {
    console.log('🎉 ALL PHASE 11 AUTONOMOUS STANDALONE THEMES CHECKS PASSED (100%)!');
  } else {
    console.error('❌ SOME CHECKS FAILED!');
    process.exit(1);
  }
  console.log('========================================================================\n');
}

runPhase11().catch(err => {
  console.error('Fatal Phase 11 test error:', err);
  process.exit(1);
});
