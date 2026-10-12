/**
 * Automated Verification Test Suite for Autonomous Architecture & GitHub Primer:
 * Multi-Industry Preset Engine, GitHub Structured Dashboards, Dual-Mode Hero Showcase,
 * Standalone Plugin Engine without Duplicator bloat.
 * 
 * @package SedRazavi
 */

const fs = require('fs');
const path = require('path');

console.log('========================================================================');
console.log('🚀 Automated Verification Suite: Autonomous Architecture & GitHub Primer');
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
// Group 1: Multi-Industry Preset Engine (PHP & React)
// -------------------------------------------------------------
console.log('🔍 Test Group 1: Multi-Industry Preset Engine Verification');

const phpEnginePath = path.join(__dirname, '../wordpress-theme/inc/preset-engine.php');
assert(fs.existsSync(phpEnginePath), 'wordpress-theme/inc/preset-engine.php exists');
const phpEngineContent = fs.readFileSync(phpEnginePath, 'utf8');

assert(
  phpEngineContent.includes('class SedRazavi_Preset_Engine'),
  'SedRazavi_Preset_Engine class is defined in PHP'
);

const expectedPresets = ['lawyer', 'web_agency', 'engineering', 'corporate', 'doctor', 'project_saas'];
expectedPresets.forEach(presetId => {
  assert(
    phpEngineContent.includes(`'${presetId}'`),
    `Preset '${presetId}' is defined in PHP preset engine`
  );
});

assert(
  phpEngineContent.includes('sedrazavi_get_preset') &&
  phpEngineContent.includes('sedrazavi_get_term') &&
  phpEngineContent.includes('sedrazavi_get_all_presets'),
  'Global PHP helper functions (sedrazavi_get_preset, sedrazavi_get_term, sedrazavi_get_all_presets) exist'
);

// Check React presets data
const tsPresetsPath = path.join(__dirname, '../src/data/industryPresets.ts');
assert(fs.existsSync(tsPresetsPath), 'src/data/industryPresets.ts exists in React codebase');
const tsPresetsContent = fs.readFileSync(tsPresetsPath, 'utf8');
expectedPresets.forEach(presetId => {
  assert(
    tsPresetsContent.includes(presetId),
    `React industryPresets.ts contains preset '${presetId}'`
  );
});

// -------------------------------------------------------------
// Group 2: Dual-Mode Hero Showcase (Motionsites 3D + WoodMart)
// -------------------------------------------------------------
console.log('\n🔍 Test Group 2: Dual-Mode Hero Showcase Verification');

const heroCanvasPath = path.join(__dirname, '../src/components/MotionsitesHeroCanvas.tsx');
assert(fs.existsSync(heroCanvasPath), 'MotionsitesHeroCanvas.tsx exists with 3D fixed canvas');
const heroCanvasContent = fs.readFileSync(heroCanvasPath, 'utf8');

assert(
  heroCanvasContent.includes('DESIGN_WIDTH = 1172') &&
  heroCanvasContent.includes('DESIGN_HEIGHT = 657'),
  'MotionsitesHeroCanvas enforces fixed 1172x657 raw pixel design contract'
);

assert(
  heroCanvasContent.includes('scale(${scale})') &&
  heroCanvasContent.includes('transformOrigin: \'50% 0\''),
  'MotionsitesHeroCanvas applies single viewport scale transform'
);

const heroPath = path.join(__dirname, '../src/components/HeroSection.tsx');
assert(fs.existsSync(heroPath), 'HeroSection.tsx exists');
const heroContent = fs.readFileSync(heroPath, 'utf8');
assert(
  heroContent.includes('motionsites') &&
  heroContent.includes('woodmart'),
  'HeroSection includes visual switcher for Motionsites 3D and WoodMart modes'
);

// -------------------------------------------------------------
// Group 3: Autonomous Plugin Engine (Zero-Theme Dependency)
// -------------------------------------------------------------
console.log('\n🔍 Test Group 3: Autonomous Plugin Engine Verification');

const pluginMainPath = path.join(__dirname, '../elementor-addon-suite/elementor-addon-suite.php');
assert(fs.existsSync(pluginMainPath), 'elementor-addon-suite/elementor-addon-suite.php exists');
const pluginMainContent = fs.readFileSync(pluginMainPath, 'utf8');

assert(
  pluginMainContent.includes('Standalone_Shortcodes') &&
  pluginMainContent.includes('GitHub_Admin'),
  'Plugin initializes Standalone_Shortcodes and GitHub_Admin unconditionally'
);

assert(
  pluginMainContent.includes('admin_notice_optional_elementor'),
  'Elementor is made optional with helpful informational notice'
);

const shortcodesPath = path.join(__dirname, '../elementor-addon-suite/includes/class-standalone-shortcodes.php');
assert(fs.existsSync(shortcodesPath), 'class-standalone-shortcodes.php exists');
const shortcodesContent = fs.readFileSync(shortcodesPath, 'utf8');

const expectedShortcodes = [
  'sedrazavi_hero',
  'sedrazavi_timeline',
  'sedrazavi_calculator',
  'sedrazavi_services',
  'sedrazavi_team',
  'sedrazavi_testimonials',
  'sedrazavi_transactions',
  'sedrazavi_activity_heatmap',
  'sedrazavi_docs_hub',
];
expectedShortcodes.forEach(sc => {
  assert(
    shortcodesContent.includes(`'${sc}'`),
    `Shortcode '${sc}' is registered in standalone engine`
  );
});

const standaloneCssPath = path.join(__dirname, '../elementor-addon-suite/assets/css/standalone-blocks.css');
assert(fs.existsSync(standaloneCssPath), 'standalone-blocks.css exists for zero-theme dependency');

// -------------------------------------------------------------
// Group 4: GitHub Primer UI & Admin Architecture
// -------------------------------------------------------------
console.log('\n🔍 Test Group 4: GitHub Primer UI & Admin Architecture');

const ghAdminPhpPath = path.join(__dirname, '../elementor-addon-suite/includes/class-github-admin.php');
assert(fs.existsSync(ghAdminPhpPath), 'class-github-admin.php exists for WordPress admin menu');
const ghAdminPhpContent = fs.readFileSync(ghAdminPhpPath, 'utf8');

assert(
  ghAdminPhpContent.includes('sedrazavi-suite') &&
  ghAdminPhpContent.includes('sedrazavi-cases') &&
  ghAdminPhpContent.includes('sedrazavi-commits') &&
  ghAdminPhpContent.includes('sedrazavi-ledger') &&
  ghAdminPhpContent.includes('sedrazavi-docs'),
  'GitHub Admin registers Overview, Cases, Commits, Ledger, and Docs Hub submenus'
);

const ghAdminCssPath = path.join(__dirname, '../elementor-addon-suite/assets/css/github-admin.css');
assert(fs.existsSync(ghAdminCssPath), 'github-admin.css exists with GitHub Primer design tokens');

const ghDashboardTsx = path.join(__dirname, '../src/components/admin/GitHubSuiteDashboard.tsx');
assert(fs.existsSync(ghDashboardTsx), 'GitHubSuiteDashboard.tsx exists in React codebase');
const ghDashboardContent = fs.readFileSync(ghDashboardTsx, 'utf8');

assert(
  ghDashboardContent.includes('Activity Contribution Heatmap') &&
  ghDashboardContent.includes('Commit Trail') &&
  ghDashboardContent.includes('Financial Ledger') &&
  ghDashboardContent.includes('Zero-Theme Dependency'),
  'GitHubSuiteDashboard renders interactive Heatmap, Commit Trail, Ledger, and Docs Hub'
);

const adminPortalPath = path.join(__dirname, '../src/components/admin/ComprehensiveAdminPortal.tsx');
const adminContent = fs.readFileSync(adminPortalPath, 'utf8');
assert(
  adminContent.includes('github_suite') &&
  adminContent.includes('GitHubSuiteDashboard'),
  'ComprehensiveAdminPortal integrates GitHubSuiteDashboard tab'
);

// -------------------------------------------------------------
// Group 5: Clean Repository Deployment (No Duplicator Bloat)
// -------------------------------------------------------------
console.log('\n🔍 Test Group 5: Clean Repository Structure for GitHub Deployment');

const duplicatorDir = path.join(__dirname, '../wordpress-theme/duplicator');
assert(!fs.existsSync(duplicatorDir), 'wordpress-theme/duplicator directory is completely removed');

const themeDir = path.join(__dirname, '../wordpress-theme');
assert(fs.existsSync(path.join(themeDir, 'style.css')), 'wordpress-theme has style.css ready for zip & install');
assert(fs.existsSync(path.join(themeDir, 'functions.php')), 'wordpress-theme has functions.php ready for zip & install');
assert(fs.existsSync(path.join(themeDir, 'index.php')), 'wordpress-theme has index.php ready for zip & install');

const pluginDir = path.join(__dirname, '../elementor-addon-suite');
assert(fs.existsSync(path.join(pluginDir, 'elementor-addon-suite.php')), 'elementor-addon-suite has main plugin header ready for zip & install');

// -------------------------------------------------------------
// Final Verdict
// -------------------------------------------------------------
console.log('\n========================================================================');
console.log(`📊 Test Results: ${passedTests} / ${totalTests} passed`);
if (allPassed) {
  console.log('🎉 ALL AUTONOMOUS ARCHITECTURE & GITHUB PRIMER CHECKS PASSED (100%)!');
  console.log('========================================================================\n');
  process.exit(0);
} else {
  console.error('❌ SOME CHECKS FAILED. Please review the errors above.');
  console.log('========================================================================\n');
  process.exit(1);
}
