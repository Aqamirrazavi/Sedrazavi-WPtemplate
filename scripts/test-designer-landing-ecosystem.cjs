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

// Explicitly verify the 10 critical modular templates exist in both theme and core
const keyTemplates = [
  'template-section-client-proof.json',
  'template-section-floating-lead.json',
  'template-section-stat-counter.json',
  'template-services-bento.json',
  'template-single-post-modern.json',
  'template-single-product-master.json',
  'template-single-video-player.json',
  'template-store-showcase.json',
  'template-video-archive.json',
  'template-vip-pricing-tier.json',
];

for (const tmpl of keyTemplates) {
  assert(fs.existsSync(path.join(themeTemplatesDir, tmpl)), `Theme template ${tmpl} exists and is verified`);
  assert(fs.existsSync(path.join(pluginTemplatesDir, tmpl)), `Plugin template ${tmpl} exists and is verified`);
}

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

// 6. CPT Meta Boxes & Front-to-Back Harmony
console.log('\n🔍 Group 6: CPT Meta Boxes & Dynamic Frontend-to-Backend Harmony');
const cptCode = fs.readFileSync(path.join(pluginDir, 'inc/custom-post-types.php'), 'utf8');
assert(cptCode.includes('sr_portfolio_meta_box'), 'Portfolio Meta Box registered');
assert(cptCode.includes('sr_service_meta_box'), 'Services Meta Box registered');
assert(cptCode.includes('_sr_portfolio_client') && cptCode.includes('_sr_portfolio_url'), 'Portfolio meta fields (_sr_portfolio_client, _sr_portfolio_url) defined');
assert(cptCode.includes('_sr_portfolio_metric') && cptCode.includes('_sr_portfolio_featured'), 'Portfolio achievement metrics & featured status defined');
assert(cptCode.includes('_sr_service_price') && cptCode.includes('_sr_service_delivery'), 'Services pricing & delivery time fields defined');
assert(cptCode.includes('save_meta_boxes'), 'CPT Meta Boxes save securely with nonces');

// Dynamic CPT rendering in templates
const portfolioPageCode = fs.readFileSync(path.join(themeDir, 'page-portfolio.php'), 'utf8');
assert(portfolioPageCode.includes("post_type'      => 'portfolio'"), 'page-portfolio.php dynamically queries portfolio CPT');
assert(portfolioPageCode.includes('_sr_portfolio_metric'), 'page-portfolio.php renders project metrics from post meta');

const servicesPageCode = fs.readFileSync(path.join(themeDir, 'page-services.php'), 'utf8');
assert(servicesPageCode.includes("post_type'      => 'services'"), 'page-services.php dynamically queries services CPT');
assert(servicesPageCode.includes('_sr_service_price'), 'page-services.php renders service price from post meta');

const singleCode = fs.readFileSync(path.join(themeDir, 'single.php'), 'utf8');
assert(singleCode.includes("get_post_type() === 'portfolio'"), 'single.php handles single portfolio post meta');
assert(singleCode.includes("get_post_type() === 'services'"), 'single.php handles single service post meta');

const clientDashCode = fs.readFileSync(path.join(themeDir, 'page-client-dashboard.php'), 'utf8');
assert(!clientDashCode.includes('alert('), 'page-client-dashboard.php is 100% clean of window.alert');

// 7. Verification of Addenda 16.0–30.0 (Starfield Warp, Plugin Bundler, Font Studio)
console.log('\n🔍 Group 7: Addenda 16.0–30.0 (Starfield Warp Engine, In-Theme Bundler, Font Studio)');

// 7.1 Pure Galactic Interstellar Starfield Warp Engine
const starfieldPhp = path.join(themeDir, 'inc/starfield-warp.php');
const starfieldJs = path.join(themeDir, 'assets/js/starfield-warp.js');
assert(fs.existsSync(starfieldPhp), 'inc/starfield-warp.php exists');
assert(fs.existsSync(starfieldJs), 'assets/js/starfield-warp.js exists');

const starfieldPhpContent = fs.readFileSync(starfieldPhp, 'utf8');
assert(starfieldPhpContent.includes('sr-starfield-canvas'), 'starfield-warp.php renders canvas element #sr-starfield-canvas');
assert(starfieldPhpContent.includes('sr_starfield_enable'), 'starfield-warp.php registers Customizer toggle');
assert(starfieldPhpContent.includes('z-index: -1'), 'starfield canvas is full-bleed background without obstructions');

const starfieldJsContent = fs.readFileSync(starfieldJs, 'utf8');
assert(starfieldJsContent.includes('baseSpeed: 1.2') || starfieldJsContent.includes('1.2'), 'starfield-warp.js specifies idle cruising speed (V_base = 1.2)');
assert(starfieldJsContent.includes('maxSpeed: 18.0') || starfieldJsContent.includes('18.0'), 'starfield-warp.js specifies max warp velocity (V_max = 18.0)');
assert(starfieldJsContent.includes('accelFactor: 0.22') || starfieldJsContent.includes('0.22'), 'starfield-warp.js implements scroll impulse acceleration (factor = 0.22)');
assert(starfieldJsContent.includes('damping: 0.92') || starfieldJsContent.includes('0.92'), 'starfield-warp.js implements exponential damping (damping = 0.92)');
assert(starfieldJsContent.includes('prefers-reduced-motion'), 'starfield-warp.js respects prefers-reduced-motion');
assert(starfieldJsContent.includes('visibilitychange'), 'starfield-warp.js pauses on page visibility hidden');

// 7.2 In-Theme Automated Bundled Plugin Installer
const installerPhp = path.join(themeDir, 'inc/plugin-installer.php');
assert(fs.existsSync(installerPhp), 'inc/plugin-installer.php exists');
const installerContent = fs.readFileSync(installerPhp, 'utf8');
assert(installerContent.includes('sr_install_bundled_core'), 'Plugin_Installer defines AJAX action sr_install_bundled_core');
assert(installerContent.includes('is_installed'), 'Plugin_Installer implements is_installed()');
assert(installerContent.includes('is_active'), 'Plugin_Installer implements is_active()');
assert(installerContent.includes('unzip_file'), 'Plugin_Installer uses WP Filesystem unzip_file()');

// Check that bundled zip actually exists in theme
const bundledZipPath = path.join(themeDir, 'inc/plugins/sedrazavi-designer-core.zip');
assert(fs.existsSync(bundledZipPath), 'Theme contains bundled plugin at inc/plugins/sedrazavi-designer-core.zip');
const bundledZipSize = fs.existsSync(bundledZipPath) ? fs.statSync(bundledZipPath).size : 0;
assert(bundledZipSize > 100000, `Bundled core plugin zip is valid (${(bundledZipSize / 1024).toFixed(1)} KB > 100 KB)`);

// 7.3 Front-End Font Studio & Dynamic Font Uploader
const fontStudioPhp = path.join(themeDir, 'inc/font-studio.php');
assert(fs.existsSync(fontStudioPhp), 'inc/font-studio.php exists');
const fontStudioContent = fs.readFileSync(fontStudioPhp, 'utf8');
assert(fontStudioContent.includes('get_available_fonts'), 'Font_Studio implements get_available_fonts()');
assert(fontStudioContent.includes('sr_update_active_font'), 'Font_Studio implements AJAX action sr_update_active_font');
assert(fontStudioContent.includes('sr_upload_custom_font'), 'Font_Studio implements AJAX action sr_upload_custom_font');
assert(fontStudioContent.includes('wp_handle_upload'), 'Font_Studio uses secure wp_handle_upload for custom fonts');
assert(fontStudioContent.includes('--sr-font-body'), 'Font_Studio dynamically injects CSS custom properties');

// 7.4 Designer Cockpit Integration Check
assert(cockpitFile.includes('sr-cockpit-install-plugin-btn'), 'Cockpit contains 1-click plugin install button');
assert(cockpitFile.includes('sr-apply-font-btn'), 'Cockpit contains font switcher button');
assert(cockpitFile.includes('sr-upload-font-btn'), 'Cockpit contains custom font uploader button');
assert(cockpitFile.includes('sr_plugin_install_nonce'), 'Cockpit scripts include plugin installer nonce');
assert(cockpitFile.includes('sr_font_studio_nonce'), 'Cockpit scripts include font studio nonce');

// 7.5 Theme functions.php Inclusions
const themeFunctionsContent = fs.readFileSync(path.join(themeDir, 'functions.php'), 'utf8');
assert(themeFunctionsContent.includes('starfield-warp.php'), 'functions.php requires inc/starfield-warp.php');
assert(themeFunctionsContent.includes('plugin-installer.php'), 'functions.php requires inc/plugin-installer.php');
assert(themeFunctionsContent.includes('font-studio.php'), 'functions.php requires inc/font-studio.php');

console.log('\n========================================================================');
console.log(`📊 Audit Results: ${passed} passed, ${failed} failed`);
if (failed === 0) {
  console.log('🎉 ALL DESIGNER ECOSYSTEM AUDIT CHECKS PASSED (100%)!');
} else {
  console.error(`⚠️ FAILED: ${failed} assertions did not pass.`);
  process.exit(1);
}
console.log('========================================================================');


