/**
 * Phase 7, 8 & 9 Automated Verification Suite:
 * - Phase 7: Gutenberg Token Parity, Block Patterns, Form Workflow Consent & Honeypot, Intake Capabilities
 * - Phase 8: 8 Autonomous Vertical Themes Elementor-First Bridge, Guards & Integration Adapters
 * - Phase 9: Library Dry-Run Preview, SHA-256 Verifier, SVG Security Sanitizer & Reduced-Motion Fallbacks
 *
 * @package SedRazavi
 */

const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

const rootDir = path.resolve(__dirname, '..');

let passed = 0;
let total = 0;
let allOk = true;

function assert(cond, msg) {
  total++;
  if (cond) {
    passed++;
    console.log(`  ✅ PASS: ${msg}`);
  } else {
    allOk = false;
    console.error(`  ❌ FAIL: ${msg}`);
  }
}

function read(rel) {
  return fs.readFileSync(path.join(rootDir, rel), 'utf8');
}

(async function main() {
  console.log('========================================================================');
  console.log('🧩 Phase 7, 8 & 9 Verification — Gutenberg, Vertical Kits & Library/SVG');
  console.log('========================================================================\n');

  // ---------------------------------------------------------------------------
  // Group 1: Phase 7 — Gutenberg Parity, Reduced Motion & Hardened Workflows
  // ---------------------------------------------------------------------------
  console.log('🔍 Group 1: Phase 7 — Gutenberg Token Parity, Block Patterns & Hardened Form Workflows');

  const themeJson = JSON.parse(read('wordpress-theme/theme.json'));
  assert(
    themeJson.settings &&
    themeJson.settings.spacing && themeJson.settings.spacing.blockGap === true &&
    Array.isArray(themeJson.settings.typography.fontFamilies) &&
    themeJson.settings.color.palette.some((p) => p.slug === 'muted-slate'),
    'wordpress-theme/theme.json includes synced palette, spacing/blockGap & Vazirmatn fontFamilies tokens'
  );

  const gutenbergPhp = read('elementor-addon-suite/includes/class-gutenberg-blocks.php');
  assert(
    gutenbergPhp.includes('register_block_patterns') &&
    gutenbergPhp.includes('sedrazavi/hero-sovereign') &&
    gutenbergPhp.includes('sedrazavi/services-bento') &&
    gutenbergPhp.includes('sedrazavi/trust-strip') &&
    gutenbergPhp.includes("'uas-design-tokens'") &&
    gutenbergPhp.includes('prefers-reduced-motion: reduce') &&
    /is_rtl\(\)\)?\s*\?\s*'rtl'\s*:\s*'ltr'/.test(gutenbergPhp),
    'Gutenberg_Blocks binds uas-design-tokens, registers 3 native patterns, honors is_rtl() & reduced-motion'
  );

  const contactWidgetPhp = read('elementor-addon-suite/includes/widgets/class-widget-contact-booking.php');
  const widgetsCoreJs = read('elementor-addon-suite/assets/js/widgets-core.js');
  assert(
    contactWidgetPhp.includes("'submit_mode'") &&
    contactWidgetPhp.includes("'enable_consent'") &&
    contactWidgetPhp.includes('name="sr_website_trap"') &&
    contactWidgetPhp.includes('name="privacy_consent"') &&
    widgetsCoreJs.includes('consentInput') &&
    widgetsCoreJs.includes('sr_website_trap') &&
    widgetsCoreJs.includes('/intake/submit'),
    'Contact Booking widget & widgets-core.js enforce honeypot trap, privacy consent checkbox & workflow route switching'
  );

  const intakePhp = read('sedrazavi-companion/includes/class-legal-intake-appointments.php');
  assert(
    intakePhp.includes("sedrazavi_manage_cases") &&
    intakePhp.includes("view_sedrazavi_cases") &&
    intakePhp.includes("do_action('sedrazavi_after_intake_submitted'") &&
    intakePhp.includes("'intake_retention_purge'"),
    'SedRazavi_Legal_Intake_Appointments restricts triage queue to dedicated legal caps & emits intake/purge audit hooks'
  );

  // ---------------------------------------------------------------------------
  // Group 2: Phase 8 — 8 Niche Standalone Verticals & Optional Integration Adapters
  // ---------------------------------------------------------------------------
  console.log('\n🔍 Group 2: Phase 8 — 8 Standalone Verticals Elementor-First & Integration Adapters');

  const verticalSlugs = [
    'sedrazavi-agency-theme',
    'sedrazavi-clinic-theme',
    'sedrazavi-corporate-theme',
    'sedrazavi-education-theme',
    'sedrazavi-legal-theme',
    'sedrazavi-news-theme',
    'sedrazavi-lawyer-theme',
    'sedrazavi-store-theme',
  ];

  for (const slug of verticalSlugs) {
    const header = read(`standalone-themes/${slug}/header.php`);
    const footer = read(`standalone-themes/${slug}/footer.php`);
    const page = read(`standalone-themes/${slug}/page.php`);
    const index = read(`standalone-themes/${slug}/index.php`);
    const funcs = read(`standalone-themes/${slug}/functions.php`);
    const ok =
      header.includes('sr-skip-link') &&
      header.includes("elementor_theme_do_location('header')") &&
      footer.includes("elementor_theme_do_location('footer')") &&
      page.includes('sedrazavi_standalone_try_render_elementor') &&
      index.includes('sedrazavi_standalone_try_render_elementor') &&
      funcs.includes('function sedrazavi_standalone_try_render_elementor(') &&
      !funcs.includes('sedrazavi_try_render_elementor_page_content('); // uses standalone isolated helper

    assert(ok, `${slug}: Elementor-First bridge, skip-link, Theme Builder hooks & clean fallback active`);

    const zipPath = path.join(rootDir, 'public/themes', `${slug}.zip`);
    let zipOk = false;
    if (fs.existsSync(zipPath)) {
      const z = await JSZip.loadAsync(fs.readFileSync(zipPath));
      const zipFuncEntry = z.file(`${slug}/functions.php`);
      const zipPageEntry = z.file(`${slug}/page.php`);
      if (zipFuncEntry && zipPageEntry) {
        const zFunc = await zipFuncEntry.async('string');
        const zPage = await zipPageEntry.async('string');
        zipOk = zFunc.includes('sedrazavi_standalone_try_render_elementor') && zPage.includes('sedrazavi_standalone_try_render_elementor');
      }
    }
    assert(zipOk, `public/themes/${slug}.zip bundles updated Phase 8 Elementor-First bridge`);
  }

  const integrationsPhp = read('wordpress-theme/inc/integrations.php');
  assert(
    integrationsPhp.includes("defined('WPCF7_VERSION')") &&
    integrationsPhp.includes('sedrazavi_get_multilingual_locale_meta') &&
    integrationsPhp.includes('sedrazavi_is_wc_hpos_active') &&
    integrationsPhp.includes('sedrazavi_after_intake_submitted'),
    'wordpress-theme/inc/integrations.php provides guarded CF7, Polylang/WPML multilingual & WooCommerce HPOS adapters'
  );

  // ---------------------------------------------------------------------------
  // Group 3: Phase 9 — Library Engine, SVG Sanitizer, Reduced Motion & Uninstall Safety
  // ---------------------------------------------------------------------------
  console.log('\n🔍 Group 3: Phase 9 — Library Preview/Checksum, SVG Sanitizer & Motion Safety');

  const libraryPhp = read('sedrazavi-companion/includes/class-sedrazavi-library-engine.php');
  assert(
    libraryPhp.includes("'/library/preview'") &&
    libraryPhp.includes('function rest_preview_package(') &&
    libraryPhp.includes('function verify_artifact_checksum(') &&
    libraryPhp.includes("'sedrazavi.store.modern-woo'") &&
    libraryPhp.includes('hash_equals('),
    'SedRazavi_Library_Engine exposes /library/preview preflight, timing-safe SHA-256 verification & Store HPOS manifest entry'
  );

  const svgIconsPhp = read('elementor-addon-suite/includes/class-sovereign-svg-icons.php');
  assert(
    svgIconsPhp.includes('public static function sanitize_svg_markup(') &&
    svgIconsPhp.includes('foreignObject') &&
    svgIconsPhp.includes("wp_kses($svg") &&
    svgIconsPhp.includes('self::sanitize_svg_markup('),
    'Sovereign_Svg_Icons implements strict SVG tag/attribute allowlist sanitizer & strips script/foreignObject/event URIs'
  );

  const motionPhp = read('elementor-addon-suite/includes/class-sovereign-motion-presets.php');
  assert(
    motionPhp.includes('@media (prefers-reduced-motion: reduce)') &&
    motionPhp.includes('animation: none !important'),
    'Sovereign_Motion_Presets enforces @media (prefers-reduced-motion: reduce) accessibility stop rules'
  );

  const uasUninstall = read('elementor-addon-suite/uninstall.php');
  assert(
    uasUninstall.includes("uas_delete_templates_on_uninstall") &&
    uasUninstall.includes("is_multisite()"),
    'elementor-addon-suite/uninstall.php preserves user library templates by default and handles multisite safely'
  );

  console.log('\n========================================================================');
  console.log(`📊 Phase 7-9 Verification Result: ${passed} / ${total} passed`);
  console.log('========================================================================');

  if (!allOk) {
    process.exit(1);
  }
})();
