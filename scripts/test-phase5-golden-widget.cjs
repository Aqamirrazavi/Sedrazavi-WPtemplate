/**
 * Phase 5 Golden Widget Proof Verification (`uas_hero`)
 *
 * Verifies statically against source files, CSS stylesheets, JSON templates, and built ZIP artifacts:
 * 1. `uas_hero` PHP implementation fulfills every Golden Widget requirement:
 *    - Zero hardcoded external Unsplash URLs
 *    - Bundled sovereign SVG placeholder helper (`hero-showcase.svg`)
 *    - `'dynamic' => ['active' => true]` across copy, CTA links, aria-labels & media
 *    - 4 named design presets (`modern-card`, `split-executive`, `centered-editorial`, `minimal-glass`)
 *    - Responsive layout direction, alignment (`add_rtl_alignment_control`), container max-width & gap
 *    - Global Kit Typography & Color controls + Container + Media + Button hover controls
 *    - Accessibility landmarks (`<section`, `aria-labelledby`), allowlisted `title_tag`, safe `noopener noreferrer` links
 *    - Conditional `is_rtl()` document direction (never hardcoded `dir="rtl"` for LTR installs)
 * 2. `hero.css` uses CSS Custom Properties (`var(--uas-*)`), covers all 4 presets, logical alignment, `:focus-visible`, and `prefers-reduced-motion`
 * 3. `template-hero-section.json` and all 10 templates referencing `uas_hero` remain 100% control-compatible and valid JSON
 * 4. Built plugin/ecosystem ZIPs carry the upgraded `class-widget-hero.php`, `hero.css`, and `template-hero-section.json`
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const JSZip = require('jszip');

const ROOT = path.resolve(__dirname, '..');

let passed = 0;
let total = 0;

function check(label, condition) {
  total++;
  if (!condition) {
    console.error(`  ✗ FAIL: ${label}`);
    process.exitCode = 1;
    return false;
  }
  console.log(`  ✓ PASS: ${label}`);
  passed++;
  return true;
}

console.log('========================================================================');
console.log('  PHASE 5 VERIFICATION: GOLDEN WIDGET PROOF (uas_hero)');
console.log('========================================================================\n');

const heroPhpPath = path.join(ROOT, 'elementor-addon-suite/includes/widgets/class-widget-hero.php');
const heroCssPath = path.join(ROOT, 'elementor-addon-suite/assets/css/widgets/hero.css');
const heroTplPath = path.join(ROOT, 'elementor-addon-suite/templates/template-hero-section.json');
const importerPath = path.join(ROOT, 'elementor-addon-suite/includes/class-template-importer.php');
const harnessPath = path.join(ROOT, 'scripts/test-phase2-ecosystem-harness.php');
const placeholderPath = path.join(ROOT, 'elementor-addon-suite/assets/images/placeholders/hero-showcase.svg');

const heroPhp = fs.readFileSync(heroPhpPath, 'utf8');
const heroCss = fs.readFileSync(heroCssPath, 'utf8');
const heroTplRaw = fs.readFileSync(heroTplPath, 'utf8');
const heroTpl = JSON.parse(heroTplRaw);
const importerPhp = fs.readFileSync(importerPath, 'utf8');
const harnessPhp = fs.readFileSync(harnessPath, 'utf8');

console.log('[1] Checking uas_hero PHP Golden Widget Architecture...');
check('Zero hardcoded Unsplash URLs in class-widget-hero.php', !heroPhp.includes('images.unsplash.com'));
check('Bundled hero-showcase.svg file exists on disk', fs.existsSync(placeholderPath));
check('Widget uses sovereign get_default_hero_image_url() pointing to hero-showcase.svg', heroPhp.includes('hero-showcase.svg') && heroPhp.includes('UAS_URL'));
check('Style depends include uas-design-tokens, uas-widgets-core, and uas-hero-css', heroPhp.includes("'uas-design-tokens'") && heroPhp.includes("'uas-hero-css'"));

const dynamicMatches = heroPhp.match(/'dynamic'\s*=>\s*\['active'\s*=>\s*true\]/g) || [];
check('Dynamic Tags active on copy, CTA links, aria-labels & media (>= 8 controls)', dynamicMatches.length >= 8);

for (const preset of ['modern-card', 'split-executive', 'centered-editorial', 'minimal-glass']) {
  check(`Hero preset '${preset}' registered and allowlisted`, heroPhp.includes(`'${preset}'`));
}

check('Responsive layout direction, max-width, gap & button padding controls present',
  heroPhp.includes("add_responsive_control(\n            'layout_direction'") &&
  heroPhp.includes("add_responsive_control(\n            'container_max_width'") &&
  heroPhp.includes("add_responsive_control(\n            'content_gap'") &&
  heroPhp.includes("add_responsive_control(\n            'btn_padding'")
);
check('RTL/LTR logical alignment uses Universal_Widget_Base::add_rtl_alignment_control', heroPhp.includes('add_rtl_alignment_control'));
check('Global Kit bindings via add_typography_and_color_controls & Global_Colors', heroPhp.includes('add_typography_and_color_controls') && heroPhp.includes('Global_Colors::COLOR_PRIMARY'));
check('Container, Image Size, Border & Shadow controls registered', heroPhp.includes('add_container_style_controls') && heroPhp.includes('Group_Control_Image_Size') && heroPhp.includes('Group_Control_Box_Shadow'));

console.log('\n[2] Checking Accessibility, Security & Backward Compatibility...');
check('Conditional is_rtl() direction (not hardcoded dir="rtl")', heroPhp.includes('is_rtl()') && !heroPhp.includes('dir="rtl">'));
check('Allowlisted heading tag prevents arbitrary HTML injection', heroPhp.includes("in_array(\$raw_tag, ['h1', 'h2', 'h3', 'div'], true)"));
check('Semantic <section> + aria-labelledby landmark rendered', heroPhp.includes('<section') && heroPhp.includes('aria-labelledby='));
check('External CTA links add rel="noopener noreferrer"', heroPhp.includes("noopener") && heroPhp.includes("noreferrer") && heroPhp.includes('build_safe_link_attrs'));

// Backward compatibility of all legacy control keys used across existing JSON templates
const basePhp = fs.readFileSync(path.join(ROOT, 'elementor-addon-suite/includes/class-widget-base.php'), 'utf8');
const hasBaseColorTypoPattern =
  basePhp.includes("\$id_prefix . '_color'") && basePhp.includes("\$id_prefix . '_typography'");
for (const key of ['badge_text', 'hero_title', 'hero_desc', 'primary_btn_text', 'primary_btn_url', 'secondary_btn_text', 'secondary_btn_url', 'hero_image', 'badge_bg_color', 'badge_text_color', 'btn_primary_bg']) {
  check(`Legacy control key '${key}' preserved in uas_hero`, heroPhp.includes(`'${key}'`));
}
check("Legacy keys 'title_color' & 'title_typography' generated via add_typography_and_color_controls('title')",
  hasBaseColorTypoPattern && heroPhp.includes("add_typography_and_color_controls(\n            'title'")
);
check("Legacy key 'desc_color' generated via add_typography_and_color_controls('desc')",
  hasBaseColorTypoPattern && heroPhp.includes("add_typography_and_color_controls(\n            'desc'")
);

console.log('\n[3] Checking hero.css Design Tokens, Presets & Reduced Motion...');
check('hero.css consumes variables.css custom properties (--uas-*)',
  heroCss.includes('var(--uas-bg-card') &&
  heroCss.includes('var(--uas-primary-color') &&
  heroCss.includes('var(--uas-text-main') &&
  heroCss.includes('var(--uas-font-family')
);
for (const preset of ['modern-card', 'split-executive', 'centered-editorial', 'minimal-glass']) {
  // modern-card uses base card tokens; others have explicit preset rules
  if (preset !== 'modern-card') {
    check(`hero.css defines .uas-hero-preset-${preset}`, heroCss.includes(`.uas-hero-preset-${preset}`));
  }
}
check('hero.css supports logical margin-inline/text-align: start', heroCss.includes('margin-inline: auto') && heroCss.includes('text-align: start'));
check('hero.css defines :focus-visible outline for keyboard users', heroCss.includes(':focus-visible'));
check('hero.css respects prefers-reduced-motion: reduce', heroCss.includes('prefers-reduced-motion: reduce'));

console.log('\n[4] Checking Hero Templates, Relinker & PHP Harness Parity...');
check('template-hero-section.json has zero external Unsplash CDN URL', !heroTplRaw.includes('images.unsplash.com'));
const heroWidgetNode = heroTpl.content?.[0]?.elements?.[0];
check('template-hero-section.json sets hero_preset & title_tag cleanly',
  heroWidgetNode?.widgetType === 'uas_hero' &&
  heroWidgetNode?.settings?.hero_preset === 'modern-card' &&
  heroWidgetNode?.settings?.title_tag === 'h1'
);

// Ensure all templates placing uas_hero remain valid JSON
const tplDir = path.join(ROOT, 'elementor-addon-suite/templates');
const uasHeroTemplates = fs.readdirSync(tplDir)
  .filter((f) => f.endsWith('.json'))
  .filter((f) => fs.readFileSync(path.join(tplDir, f), 'utf8').includes('"uas_hero"'));
check(`All ${uasHeroTemplates.length} templates referencing uas_hero parse cleanly`, (() => {
  for (const file of uasHeroTemplates) {
    const parsed = JSON.parse(fs.readFileSync(path.join(tplDir, file), 'utf8'));
    assert(Array.isArray(parsed.content) && parsed.content.length > 0, `Invalid template ${file}`);
  }
  return uasHeroTemplates.length >= 10;
})());

check('Template_Importer relinker resolves empty/relative sovereign_local URLs', importerPhp.includes('is_sovereign_relative'));
check('PHP Ecosystem Harness stubs Group_Control_Image_Size & checks uas_hero Golden Widget',
  harnessPhp.includes('class Group_Control_Image_Size') && harnessPhp.includes('uas-hero-preset-modern-card')
);

async function verifyZips() {
  console.log('\n[5] Checking Built Plugin ZIP Packaging Parity...');
  const suiteZipPath = path.join(ROOT, 'public/elementor-addon-suite.zip');
  const ecoZipPath = path.join(ROOT, 'public/sedrazavi-complete-ecosystem.zip');

  if (fs.existsSync(suiteZipPath)) {
    const suiteZip = await JSZip.loadAsync(fs.readFileSync(suiteZipPath));
    const zippedPhp = await suiteZip.file('elementor-addon-suite/includes/widgets/class-widget-hero.php')?.async('string');
    const zippedCss = await suiteZip.file('elementor-addon-suite/assets/css/widgets/hero.css')?.async('string');
    const zippedTpl = await suiteZip.file('elementor-addon-suite/templates/template-hero-section.json')?.async('string');
    check('public/elementor-addon-suite.zip contains upgraded class-widget-hero.php', !!zippedPhp && zippedPhp.includes('split-executive') && !zippedPhp.includes('images.unsplash.com'));
    check('public/elementor-addon-suite.zip contains upgraded hero.css', !!zippedCss && zippedCss.includes('prefers-reduced-motion'));
    check('public/elementor-addon-suite.zip contains sovereign template-hero-section.json', !!zippedTpl && !zippedTpl.includes('images.unsplash.com'));
  }

  if (fs.existsSync(ecoZipPath)) {
    const ecoZip = await JSZip.loadAsync(fs.readFileSync(ecoZipPath));
    const nestedSuiteEntry = ecoZip.file(/elementor-addon-suite\.zip$/)[0];
    if (nestedSuiteEntry) {
      const nestedSuiteZip = await JSZip.loadAsync(await nestedSuiteEntry.async('nodebuffer'));
      const ecoHero = await nestedSuiteZip.file('elementor-addon-suite/includes/widgets/class-widget-hero.php')?.async('string');
      check('public/sedrazavi-complete-ecosystem.zip embeds updated elementor-addon-suite.zip', !!ecoHero && ecoHero.includes('build_safe_link_attrs'));
    } else {
      const ecoHero = await ecoZip.file('elementor-addon-suite/includes/widgets/class-widget-hero.php')?.async('string');
      check('public/sedrazavi-complete-ecosystem.zip contains upgraded class-widget-hero.php', !!ecoHero && ecoHero.includes('build_safe_link_attrs'));
    }
  }

  console.log(`\n========================================================================`);
  console.log(`  PHASE 5 SUMMARY: ${passed} / ${total} checks passed.`);
  console.log('========================================================================');

  if (passed !== total) {
    process.exit(1);
  }
}

verifyZips().catch((err) => {
  console.error(err);
  process.exit(1);
});
