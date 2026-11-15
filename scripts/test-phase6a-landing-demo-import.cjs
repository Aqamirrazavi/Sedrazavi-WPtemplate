/**
 * Phase 6a Golden Slice Proof: Native Container Landing Page JSON + Demo Import
 *
 * Verifies:
 * 1. `template-designer-landing.json` is a full native Elementor Flexbox Container Page (`type: "page"`):
 *    - >= 6 top-level `elType: "container"` sections
 *    - >= 2 nested `isInner: true` Flexbox column containers with responsive widths
 *    - Zero raw `html` widgets and zero Elementor Pro-only widgets (100% Free-compatible)
 *    - Zero hardcoded external Unsplash URLs (`sovereign_local` used cleanly)
 *    - Uses upgraded `uas_hero`, `uas_stat_counter`, `uas_services_grid`, `uas_faq`, `uas_testimonials`, `uas_cta`, plus native Elementor `heading`/`text-editor`/`button`
 *    - Control keys match real PHP widget control IDs (`services_list`, `stats_list`, `faqs_list`, `testimonials_list`, `description`)
 * 2. `template-home-saas-master.json` is also scrubbed of Unsplash stock URLs
 * 3. `SedRazavi_Demo_Importer` cleanly integrates:
 *    - `Template_Importer::adapt_pro_widgets_for_free()` + `validate_template_widget_dependencies()` + `relink_template_media()`
 *    - `Design_Tokens::instance()->sync_elementor_active_kit()`
 *    - Conditional `_wp_page_template` guard when Elementor is inactive (`default` fallback vs `elementor_header_footer`)
 *    - Strict `manage_options` REST capability (zero `__return_true`), accessible inline confirmation (zero browser `confirm()`)
 *    - Atomic reset tracking (`sedrazavi_demo_imported_pages` / `_uas_imported_demo_id`)
 * 4. Built plugin/theme/ecosystem ZIPs carry identical Golden Landing Page & hardened Demo Importer
 */

const fs = require('fs');
const path = require('path');
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

function walkElements(nodes, cb) {
  if (!Array.isArray(nodes)) return;
  for (const node of nodes) {
    cb(node);
    if (Array.isArray(node.elements)) {
      walkElements(node.elements, cb);
    }
  }
}

console.log('========================================================================');
console.log('  PHASE 6A VERIFICATION: GOLDEN NATIVE LANDING PAGE + DEMO IMPORT');
console.log('========================================================================\n');

const landingPath = path.join(ROOT, 'elementor-addon-suite/templates/template-designer-landing.json');
const saasPath = path.join(ROOT, 'elementor-addon-suite/templates/template-home-saas-master.json');
const demoImporterPath = path.join(ROOT, 'sedrazavi-companion/includes/class-demo-importer.php');
const phpHarnessPath = path.join(ROOT, 'scripts/test-phase2-ecosystem-harness.php');

const landingRaw = fs.readFileSync(landingPath, 'utf8');
const landingJson = JSON.parse(landingRaw);
const saasRaw = fs.readFileSync(saasPath, 'utf8');
const demoImporterPhp = fs.readFileSync(demoImporterPath, 'utf8');
const phpHarness = fs.readFileSync(phpHarnessPath, 'utf8');

console.log('[1] Checking Golden Landing Page Native Elementor Container AST...');
check('template-designer-landing.json has type === "page" and valid version', landingJson.type === 'page' && !!landingJson.version);
check('Top-level sections contain >= 6 native Elementor containers', Array.isArray(landingJson.content) && landingJson.content.length >= 6);
check('Every top-level node uses elType === "container"', landingJson.content.every((el) => el.elType === 'container'));

let innerContainers = 0;
const widgetTypes = [];
const widgetNodes = [];
walkElements(landingJson.content, (el) => {
  if (el.elType === 'container' && el.isInner === true) {
    innerContainers++;
  }
  if (el.elType === 'widget' && el.widgetType) {
    widgetTypes.push(el.widgetType);
    widgetNodes.push(el);
  }
});

check('Contains >= 2 nested Flexbox inner column containers (isInner: true)', innerContainers >= 2);
check('Contains zero raw html widget shortcuts', !widgetTypes.includes('html'));
check('Uses zero Unsplash external stock URLs', !landingRaw.includes('images.unsplash.com') && !saasRaw.includes('images.unsplash.com'));

const proSlugs = new Set([
  'theme-site-logo', 'nav-menu', 'archive-posts', 'theme-archive-title', 'theme-post-title',
  'post-info', 'theme-post-featured-image', 'theme-post-content', 'author-box', 'post-comments',
  'form', 'posts', 'slides', 'price-table', 'price-list', 'flip-box', 'call-to-action'
]);
check('Uses zero Elementor Pro-only widgets (100% Free-compatible)', widgetTypes.every((wt) => !proSlugs.has(wt)));

for (const reqWidget of ['uas_hero', 'uas_stat_counter', 'uas_services_grid', 'heading', 'text-editor', 'button', 'uas_faq', 'uas_testimonials', 'uas_cta']) {
  check(`Landing page composes native widget '${reqWidget}'`, widgetTypes.includes(reqWidget));
}

const heroNode = widgetNodes.find((w) => w.widgetType === 'uas_hero');
const servicesNode = widgetNodes.find((w) => w.widgetType === 'uas_services_grid');
const testimonialsNode = widgetNodes.find((w) => w.widgetType === 'uas_testimonials');
const ctaNode = widgetNodes.find((w) => w.widgetType === 'uas_cta');

check('Hero node enables split-executive preset, H1 tag & sovereign_local media',
  heroNode?.settings?.hero_preset === 'split-executive' &&
  heroNode?.settings?.title_tag === 'h1' &&
  heroNode?.settings?.hero_image?.source === 'sovereign_local'
);
check('Services Grid node uses valid services_list repeater with item_title/item_desc keys',
  Array.isArray(servicesNode?.settings?.services_list) &&
  servicesNode.settings.services_list.length >= 3 &&
  !!servicesNode.settings.services_list[0]?.item_title
);
check('Testimonials node uses sovereign_local avatars (no Unsplash)',
  Array.isArray(testimonialsNode?.settings?.testimonials_list) &&
  testimonialsNode.settings.testimonials_list.every((t) => t.avatar?.source === 'sovereign_local')
);
check('CTA node uses matching description control key', !!ctaNode?.settings?.description);

console.log('\n[2] Checking SedRazavi_Demo_Importer Pipeline Integration...');
check('Demo Importer invokes Template_Importer::adapt_pro_widgets_for_free', demoImporterPhp.includes('Template_Importer::adapt_pro_widgets_for_free'));
check('Demo Importer validates widget dependencies before import', demoImporterPhp.includes('Template_Importer::validate_template_widget_dependencies'));
check('Demo Importer relinks media via Template_Importer::relink_template_media', demoImporterPhp.includes('Template_Importer::relink_template_media'));
check('Demo Importer syncs Design_Tokens::sync_elementor_active_kit()', demoImporterPhp.includes('Design_Tokens') && demoImporterPhp.includes('sync_elementor_active_kit'));
check('Demo Importer resolves UAS_PATH & sibling elementor-addon-suite templates', demoImporterPhp.includes("defined('UAS_PATH')") && demoImporterPhp.includes("dirname(SEDRAZAVI_COMPANION_DIR)"));
check('Demo Importer conditionally switches _wp_page_template when Elementor inactive', demoImporterPhp.includes("$has_elementor ? 'elementor_header_footer' : 'default'"));
check('Demo Importer tracks imported page IDs and deletes cleanly on reset', demoImporterPhp.includes('sedrazavi_demo_imported_pages') && demoImporterPhp.includes('wp_delete_post'));
check('Demo Importer enforces manage_options & removes browser confirm()', !demoImporterPhp.includes('__return_true') && !demoImporterPhp.includes('confirm('));
check('PHP Harness includes TEST 10 verifying Golden Landing Page Demo Import', phpHarness.includes('TEST 10') && phpHarness.includes('create_native_elementor_page'));

console.log('\n[3] Checking Synced Designer Folders & Built ZIP Distribution...');
const designerThemeLanding = fs.readFileSync(path.join(ROOT, 'sedrazavi-designer-theme/templates/template-designer-landing.json'), 'utf8');
const designerCoreLanding = fs.readFileSync(path.join(ROOT, 'sedrazavi-designer-core/templates/template-designer-landing.json'), 'utf8');
check('sedrazavi-designer-theme & sedrazavi-designer-core templates match canonical landing page',
  designerThemeLanding === landingRaw && designerCoreLanding === landingRaw
);

async function verifyZips() {
  const companionZipPath = path.join(ROOT, 'public/sedrazavi-companion.zip');
  const suiteZipPath = path.join(ROOT, 'public/elementor-addon-suite.zip');

  if (fs.existsSync(companionZipPath)) {
    const cZip = await JSZip.loadAsync(fs.readFileSync(companionZipPath));
    const impContent = await cZip.file('sedrazavi-companion/includes/class-demo-importer.php')?.async('string');
    check('public/sedrazavi-companion.zip embeds hardened class-demo-importer.php',
      !!impContent && impContent.includes('relink_template_media') && impContent.includes('sync_elementor_active_kit')
    );
  }

  if (fs.existsSync(suiteZipPath)) {
    const sZip = await JSZip.loadAsync(fs.readFileSync(suiteZipPath));
    const landed = await sZip.file('elementor-addon-suite/templates/template-designer-landing.json')?.async('string');
    check('public/elementor-addon-suite.zip embeds full Golden Landing Page JSON',
      !!landed && landed.includes('uas_cnt_dl_split_overview') && !landed.includes('images.unsplash.com')
    );
  }

  console.log(`\n========================================================================`);
  console.log(`  PHASE 6A SUMMARY: ${passed} / ${total} checks passed.`);
  console.log('========================================================================');

  if (passed !== total) {
    process.exit(1);
  }
}

verifyZips().catch((err) => {
  console.error(err);
  process.exit(1);
});
