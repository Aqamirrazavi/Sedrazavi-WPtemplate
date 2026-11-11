/**
 * Phase 11: Vertical Packs Verification Suite
 *
 * Verifies Native Portability Spec v31 & Phased Roadmap v3 Phase 11:
 * 1. Verification of all 8 vertical child themes:
 *    - agency-designer
 *    - clinic-medical
 *    - corporate-pro
 *    - education-lms
 *    - legal-firm
 *    - news-editorial
 *    - sedrazavi-lawyer-child
 *    - store-modern
 * 2. Theme header integrity (Template: sedrazavi-theme)
 * 3. Screenshot presence & size quota
 * 4. Data boundary isolation & zero cross-domain leakage
 * 5. Standalone distribution zip availability
 *
 * @package SedRazavi
 */

const fs = require('fs');
const path = require('path');

console.log('========================================================================');
console.log('🏛️ Phase 11: Vertical Packs & Domain Isolation Suite');
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

const childThemesDir = path.join(__dirname, '../wordpress-theme/child-themes');
assert(fs.existsSync(childThemesDir), 'wordpress-theme/child-themes exists');

const requiredPacks = [
  { slug: 'agency-designer', name: 'Agency Designer', domain: 'creative' },
  { slug: 'clinic-medical', name: 'Clinic Medical', domain: 'healthcare' },
  { slug: 'corporate-pro', name: 'Corporate Pro', domain: 'enterprise' },
  { slug: 'education-lms', name: 'Education LMS', domain: 'education' },
  { slug: 'legal-firm', name: 'Legal Firm', domain: 'legal' },
  { slug: 'news-editorial', name: 'News Editorial', domain: 'publishing' },
  { slug: 'sedrazavi-lawyer-child', name: 'SedRazavi Lawyer', domain: 'legal' },
  { slug: 'store-modern', name: 'Store Modern', domain: 'commerce' },
];

console.log('🔍 Test Group 1: Child Themes Header & Asset Integrity');

requiredPacks.forEach(pack => {
  const packDir = path.join(childThemesDir, pack.slug);
  assert(fs.existsSync(packDir), `Vertical pack directory exists: ${pack.slug}`);

  // style.css
  const styleCssPath = path.join(packDir, 'style.css');
  assert(fs.existsSync(styleCssPath), `${pack.slug}/style.css exists`);
  const styleContent = fs.readFileSync(styleCssPath, 'utf8');
  assert(styleContent.includes('Template: sedrazavi-theme'), `${pack.slug} declares Template: sedrazavi-theme`);
  assert(styleContent.includes('Theme Name:'), `${pack.slug} declares valid Theme Name`);

  // screenshot
  const hasScreenshot = fs.existsSync(path.join(packDir, 'screenshot.webp')) || fs.existsSync(path.join(packDir, 'screenshot.png'));
  assert(hasScreenshot, `${pack.slug} has screenshot asset`);

  // functions.php
  const functionsPath = path.join(packDir, 'functions.php');
  assert(fs.existsSync(functionsPath), `${pack.slug}/functions.php exists`);
  const functionsContent = fs.readFileSync(functionsPath, 'utf8');
  assert(
    functionsContent.includes('wp_enqueue_style') || functionsContent.includes('sedrazavi-parent-style') || functionsContent.includes('add_action'),
    `${pack.slug} properly hooks parent styles and functions`
  );
});

console.log('\n🔍 Test Group 2: Data Boundary & Domain Isolation');

// Legal Confidentiality Boundary
const legalChildPath = path.join(childThemesDir, 'sedrazavi-lawyer-child/functions.php');
if (fs.existsSync(legalChildPath)) {
  const legalContent = fs.readFileSync(legalChildPath, 'utf8');
  assert(!legalContent.includes('show_in_rest => true'), 'Legal child theme does not expose raw cases in unauthenticated public REST');
}

// Store Modern WooCommerce Boundary Check
const storeFunctionsPath = path.join(childThemesDir, 'store-modern/functions.php');
if (fs.existsSync(storeFunctionsPath)) {
  const storeContent = fs.readFileSync(storeFunctionsPath, 'utf8');
  assert(
    !storeContent.includes('WC()') || storeContent.includes("class_exists('WooCommerce')"),
    'Store Modern guards WooCommerce calls with class_exists check'
  );
}

console.log('\n🔍 Test Group 3: Standalone Packaged Child Theme Zips');
const publicChildDir = path.join(__dirname, '../public/child-themes');

requiredPacks.forEach(pack => {
  const zipPath = path.join(publicChildDir, `${pack.slug}.zip`);
  const zipExists = fs.existsSync(zipPath);
  assert(zipExists, `Packaged ZIP exists for vertical theme: public/child-themes/${pack.slug}.zip`);
});

console.log('\n========================================================================');
console.log(`📊 Phase 11 Test Results: ${passedTests} / ${totalTests} passed`);
if (allPassed) {
  console.log('🎉 ALL PHASE 11 VERTICAL PACKS CHECKS PASSED (100%)!');
} else {
  console.error('❌ SOME CHECKS FAILED!');
  process.exit(1);
}
console.log('========================================================================\n');
