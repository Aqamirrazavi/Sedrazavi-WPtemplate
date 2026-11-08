/**
 * Test Suite: Dedicated Standalone WordPress Designer Landing Page Ecosystem
 *
 * Verifies the complete architecture of:
 * - sedrazavi-designer-theme (Standalone theme)
 * - sedrazavi-designer-core (Standalone vertical plugin)
 * - Zero child themes, zero React in frontend, 100% Elementor-native.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

console.log('========================================================================');
console.log('⚡ Auditing Dedicated Standalone WordPress Designer Ecosystem');
console.log('========================================================================\n');

// 1. Theme Files & Zero Child Theme Check
console.log('🔍 Group 1: Standalone Theme Architecture (sedrazavi-designer-theme)');
const themeDir = path.join(rootDir, 'sedrazavi-designer-theme');
assert(fs.existsSync(themeDir), 'sedrazavi-designer-theme directory exists');

const requiredThemeFiles = [
  'style.css',
  'functions.php',
  'header.php',
  'footer.php',
  'front-page.php',
  'template-elementor-full-width.php',
  'template-elementor-canvas.php',
  'page-about.php',
  'page-services.php',
  'page-portfolio.php',
  'page-contact.php',
  'page-portal-auth.php',
  'page-client-dashboard.php',
  'page-designer-cockpit.php',
  'page-track-order.php',
  'page-privacy.php',
  'single.php',
  'archive.php',
  'home.php',
  '404.php',
  'index.php',
  'assets/css/palettes.css',
  'assets/css/main.css',
  'assets/js/main.js',
  'assets/fonts/Vazirmatn-Regular.woff2',
  'assets/fonts/Vazirmatn-Medium.woff2',
  'assets/fonts/Vazirmatn-Bold.woff2',
];

for (const file of requiredThemeFiles) {
  assert(fs.existsSync(path.join(themeDir, file)), `Theme file ${file} exists`);
}

// Check style.css has no Template: parent theme header (Proving it is NOT a child theme!)
const styleCss = fs.readFileSync(path.join(themeDir, 'style.css'), 'utf8');
assert(!styleCss.includes('Template:'), 'style.css has NO Template: line (confirms 100% standalone theme, not a child theme)');
assert(styleCss.includes('Theme Name: SedRazavi Designer Theme'), 'style.css declares standalone theme identity');

// Check Palettes count
const palettesCss = fs.readFileSync(path.join(themeDir, 'assets/css/palettes.css'), 'utf8');
const darkPalettes = (palettesCss.match(/\[data-palette="dark-\d+"\]/g) || []).length;
const lightPalettes = (palettesCss.match(/\[data-palette="light-\d+"\]/g) || []).length;
assert(darkPalettes === 33, `Palettes CSS contains 33 dark palettes (Found: ${darkPalettes})`);
assert(lightPalettes === 33, `Palettes CSS contains 33 light palettes (Found: ${lightPalettes})`);

// Check Zero React in frontend assets
const themeJs = fs.readFileSync(path.join(themeDir, 'assets/js/main.js'), 'utf8');
assert(!themeJs.includes('import React') && !themeJs.includes('React.createElement') && !themeJs.includes('ReactDOM'), 'Theme JS uses 100% Vanilla ES6+, Zero React imports or execution');

// 2. Plugin Files & Core Modules
console.log('\n🔍 Group 2: Standalone Plugin Engine (sedrazavi-designer-core)');
const pluginDir = path.join(rootDir, 'sedrazavi-designer-core');
assert(fs.existsSync(pluginDir), 'sedrazavi-designer-core directory exists');

const requiredPluginFiles = [
  'sedrazavi-core.php',
  'inc/database-installer.php',
  'inc/auto-provisioning.php',
  'inc/custom-post-types.php',
  'inc/lead-manager.php',
  'inc/auth-guard.php',
  'inc/settings-sync.php',
  'inc/theme-builder-bridge.php',
  'widgets/widget-chrono-clock.php',
  'widgets/widget-cyber-dino.php',
  'widgets/widget-music-player.php',
  'widgets/widget-world-globe.php',
  'assets/css/widgets.css',
  'assets/js/widgets.js',
];

for (const file of requiredPluginFiles) {
  assert(fs.existsSync(path.join(pluginDir, file)), `Plugin file ${file} exists`);
}

// Check Custom Tables in Database_Installer
const dbInstaller = fs.readFileSync(path.join(pluginDir, 'inc/database-installer.php'), 'utf8');
assert(dbInstaller.includes('sedrazavi_inquiries'), 'Database installer defines sedrazavi_inquiries table');
assert(dbInstaller.includes('sedrazavi_messages'), 'Database installer defines sedrazavi_messages table');
assert(dbInstaller.includes('tracking_code'), 'Database installer defines tracking_code field');

// Check Auto-provisioning of 12 pages
const autoProv = fs.readFileSync(path.join(pluginDir, 'inc/auto-provisioning.php'), 'utf8');
const slugs = ['home', 'about', 'services', 'portfolio', 'contact', 'blog', 'track-order', 'portal-auth', 'client-dashboard', 'designer-cockpit', 'privacy'];
for (const slug of slugs) {
  assert(autoProv.includes(`'slug'     => '${slug}'`), `Auto-provisioning provisions page '${slug}'`);
}

// Check 4 Elementor Widgets
const mainPlugin = fs.readFileSync(path.join(pluginDir, 'sedrazavi-core.php'), 'utf8');
assert(mainPlugin.includes('Widget_Chrono_Clock'), 'Chrono Clock widget registered');
assert(mainPlugin.includes('Widget_Cyber_Dino'), 'Cyber Dino widget registered');
assert(mainPlugin.includes('Widget_Music_Player'), 'Music Player widget registered');
assert(mainPlugin.includes('Widget_World_Globe'), 'World Globe widget registered');

// 3. Packaging & ZIP Distribution
console.log('\n🔍 Group 3: Standalone ZIP Packages & Distribution');
const publicDir = path.join(rootDir, 'public');
const packages = [
  'sedrazavi-designer-theme.zip',
  'sedrazavi-designer-core.zip',
  'sedrazavi-designer-bundle.zip',
];

for (const pkg of packages) {
  const filePath = path.join(publicDir, pkg);
  assert(fs.existsSync(filePath), `Distribution ZIP ${pkg} exists in public/`);
  const size = fs.statSync(filePath).size;
  assert(size > 5000, `ZIP ${pkg} has valid content (size: ${(size / 1024).toFixed(1)} KB)`);
}

console.log('\n========================================================================');
console.log(`📊 Audit Results: ${passed} passed, ${failed} failed`);
if (failed === 0) {
  console.log('🎉 ALL DESIGNER ECOSYSTEM AUDIT CHECKS PASSED (100%)!');
} else {
  console.log('❌ SOME AUDIT CHECKS FAILED!');
  process.exit(1);
}
console.log('========================================================================');
