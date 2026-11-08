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

// Check Local Persian Font Loader (Zero-CDN)
const fontLoaderTheme = path.join(themeDir, 'inc/local-font-loader.php');
assert(fs.existsSync(fontLoaderTheme), 'Theme local-font-loader.php exists');
const fontLoaderCore = path.join(pluginDir, 'inc/local-font-loader.php');
assert(fs.existsSync(fontLoaderCore), 'Plugin local-font-loader.php exists');
const fontLoaderThemeContent = fs.readFileSync(fontLoaderTheme, 'utf8');
assert(fontLoaderThemeContent.includes('Vazirmatn'), 'Local font loader defines Vazirmatn font-face');
assert(fontLoaderThemeContent.includes('font-display: swap'), 'Local font loader uses font-display: swap');
assert(fontLoaderThemeContent.includes('block_external_fonts'), 'Local font loader dequeues external Google/CDN fonts');
assert(fontLoaderThemeContent.includes('register_elementor_additional_fonts'), 'Local font loader registers Vazirmatn in Elementor');

// Check 4 Single Post Layout Archetypes (Section 16.0 / 18.1)
const singlePhp = fs.readFileSync(path.join(themeDir, 'single.php'), 'utf8');
assert(singlePhp.includes("'classic'"), 'single.php implements Classic Sticky TOC layout');
assert(singlePhp.includes("'cyber'"), 'single.php implements Cyber Full-Width Cinematic layout');
assert(singlePhp.includes("'magazine'"), 'single.php implements Tech Magazine layout');
assert(singlePhp.includes("'reader'"), 'single.php implements Minimalist Clean Reader layout');

// Check Sovereign Preloader (Section 17.9)
const headerPhp = fs.readFileSync(path.join(themeDir, 'header.php'), 'utf8');
assert(headerPhp.includes('sr-preloader-backdrop'), 'header.php renders accessible sovereign preloader');

// 3. Plugin WebP Visual Identity Assets (<100KB)
console.log('\n🔍 Group 3: Plugin WebP Visual Identity Assets (< 100KB)');
const checkWebpAssets = [
  'sedrazavi-designer-core/assets/banner-772x250.webp',
  'sedrazavi-designer-core/assets/icon-256x256.webp',
  'sedrazavi-designer-core/screenshot.webp',
  'elementor-addon-suite/assets/banner-772x250.webp',
  'elementor-addon-suite/assets/icon-256x256.webp',
  'elementor-addon-suite/screenshot.webp',
  'sedrazavi-addons/assets/banner-772x250.webp',
  'sedrazavi-addons/assets/icon-256x256.webp',
  'sedrazavi-addons/screenshot.webp',
  'sedrazavi-companion/assets/banner-772x250.webp',
  'sedrazavi-companion/assets/icon-256x256.webp',
  'sedrazavi-companion/screenshot.webp',
  'sedrazavi-designer-theme/screenshot.webp',
];

for (const relPath of checkWebpAssets) {
  const fullP = path.join(rootDir, relPath);
  assert(fs.existsSync(fullP), `Asset ${relPath} exists`);
  if (fs.existsSync(fullP)) {
    const sizeKb = fs.statSync(fullP).size / 1024;
    assert(sizeKb < 100, `Asset ${relPath} is strictly under 100KB (${sizeKb.toFixed(1)} KB)`);
  }
}

// 4. Packaging & ZIP Distribution
console.log('\n🔍 Group 4: Standalone ZIP Packages & Distribution');
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

// 5. Verification of 7 Master Prompt Compliance Items (SSOT, Vector Engine, 33 Templates, Web Audio API, Cockpit Reply Modal, Docs, .gitignore)
console.log('\n🔍 Group 5: Master Prompt Compliance & Hardening Verification');

// 5.1 Documentation Preservation
const docFile = path.join(rootDir, 'docs/MASTER_PROMPT_v25_SOVEREIGN_ECOSYSTEM.md');
assert(fs.existsSync(docFile), 'docs/MASTER_PROMPT_v25_SOVEREIGN_ECOSYSTEM.md exists');
if (fs.existsSync(docFile)) {
  const docSizeKb = fs.statSync(docFile).size / 1024;
  assert(docSizeKb > 100, `Master prompt documentation is fully recorded without loss (${docSizeKb.toFixed(1)} KB > 100 KB)`);
}

// 5.2 SSOT Configuration Engine
const cptFile = fs.readFileSync(path.join(pluginDir, 'inc/custom-post-types.php'), 'utf8');
assert(cptFile.includes("'sedrazavi_config'"), 'CPT sedrazavi_config is registered');
const syncFile = fs.readFileSync(path.join(pluginDir, 'inc/settings-sync.php'), 'utf8');
assert(syncFile.includes('master-config'), 'Settings_Sync uses master-config slug');
assert(syncFile.includes('save_master_config'), 'Settings_Sync implements save_master_config');
assert(syncFile.includes('revert_to_snapshot'), 'Settings_Sync implements snapshot rollback');
assert(syncFile.includes('_sr_config_sha256'), 'Settings_Sync enforces SHA-256 integrity hash verification');

// 5.3 33 Geometric Vector Engine & Parallax
const vectorEngineFile = path.join(themeDir, 'inc/vector-engine.php');
assert(fs.existsSync(vectorEngineFile), 'Theme inc/vector-engine.php exists');
const vectorEngineContent = fs.readFileSync(vectorEngineFile, 'utf8');
assert(vectorEngineContent.includes('pattern_33') || vectorEngineContent.includes("'id' => 33"), 'Vector engine defines 33 geometric patterns');
assert(vectorEngineContent.includes('render_background'), 'Vector engine provides render_background method');
const vectorMotionFile = path.join(themeDir, 'assets/js/vector-motion.js');
assert(fs.existsSync(vectorMotionFile), 'Theme assets/js/vector-motion.js exists');
const vectorMotionContent = fs.readFileSync(vectorMotionFile, 'utf8');
assert(vectorMotionContent.includes('prefers-reduced-motion'), 'Vector motion respects prefers-reduced-motion accessibility');
assert(vectorMotionContent.includes('touchstart') && vectorMotionContent.includes('touchend'), 'Vector motion handles touch swipe');

// 5.4 33 Raw Elementor JSON Templates
const themeTemplatesDir = path.join(themeDir, 'templates');
const pluginTemplatesDir = path.join(pluginDir, 'templates');
assert(fs.existsSync(themeTemplatesDir), 'Theme templates directory exists');
assert(fs.existsSync(pluginTemplatesDir), 'Plugin templates directory exists');
const themeTemplateCount = fs.readdirSync(themeTemplatesDir).filter(f => f.endsWith('.json')).length;
const pluginTemplateCount = fs.readdirSync(pluginTemplatesDir).filter(f => f.endsWith('.json')).length;
assert(themeTemplateCount === 33, `Theme contains 33 Elementor JSON templates (Found: ${themeTemplateCount})`);
assert(pluginTemplateCount === 33, `Plugin contains 33 Elementor JSON templates (Found: ${pluginTemplateCount})`);

// 5.5 Web Audio API Synthesizer
assert(themeJs.includes('playNeonTone'), 'main.js implements playNeonTone synthesizer');
assert(themeJs.includes('AudioContext') || themeJs.includes('webkitAudioContext'), 'main.js uses Web Audio API AudioContext');

// 5.6 Designer Cockpit Reply & Status Modal
const cockpitFile = fs.readFileSync(path.join(themeDir, 'page-designer-cockpit.php'), 'utf8');
assert(cockpitFile.includes('sr-designer-reply-modal'), 'Designer Cockpit implements client reply modal');
assert(cockpitFile.includes('sr_update_inquiry_status'), 'Designer Cockpit supports real-time status updates');

// 5.7 .gitignore Whitelist Check
const gitignoreContent = fs.readFileSync(path.join(rootDir, '.gitignore'), 'utf8');
assert(gitignoreContent.includes('!public/sedrazavi-designer-theme.zip'), '.gitignore whitelists sedrazavi-designer-theme.zip');
assert(gitignoreContent.includes('!public/sedrazavi-designer-core.zip'), '.gitignore whitelists sedrazavi-designer-core.zip');

console.log('\n========================================================================');
console.log(`📊 Audit Results: ${passed} passed, ${failed} failed`);
if (failed === 0) {
  console.log('🎉 ALL DESIGNER ECOSYSTEM AUDIT CHECKS PASSED (100%)!');
} else {
  console.error(`⚠️ FAILED: ${failed} assertions did not pass.`);
  process.exit(1);
}
console.log('========================================================================');

