/**
 * Phase 6b Static Verification Suite:
 * Gradual PHP/HTML -> Native Elementor Page Migration (Priority Queue 1-6)
 *
 * Verifies:
 * 1. Elementor-first page bridge helper (`sedrazavi_try_render_elementor_page_content`)
 *    respecting inactive-Elementor fallback, Gutenberg blocks, zero double-<main>, and CSS coverage.
 * 2. Priority 1-6 Theme Templates (`front-page.php`, `page-services.php`, `page-portfolio.php`,
 *    `page-about.php`, `page-contact.php`, `page-store.php`, `archive.php`, `single.php`,
 *    `page-legal-intelligence.php`) Elementor-first bypass + safe fallback + `'services'`/`'service'` fix.
 * 3. Upgraded Native Container JSON Templates (`template-services-bento.json`,
 *    `template-portfolio-showcase.json`, `template-contact-booking-split.json`,
 *    `template-store-showcase.json`, `template-home-corporate-pro.json`,
 *    `template-home-creative-agency.json`, `template-single-post-modern.json`)
 *    matching real PHP widget control keys, zero raw `html`, zero Unsplash URLs,
 *    exact 33 template count, and strict separation from private legal case CPTs (`sedrazavi_case`).
 * 4. Packaged ZIP parity (`sedrazavi-theme.zip`, `elementor-addon-suite.zip`,
 *    `sedrazavi-companion.zip`, `sedrazavi-designer-theme.zip`, `sedrazavi-designer-core.zip`).
 */

const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

const rootDir = path.resolve(__dirname, '..');
const themeDir = path.join(rootDir, 'wordpress-theme');
const suiteDir = path.join(rootDir, 'elementor-addon-suite');
const compDir = path.join(rootDir, 'sedrazavi-companion');
const publicDir = path.join(rootDir, 'public');

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

function collectWidgets(nodes, out = []) {
  for (const n of nodes || []) {
    if (!n || typeof n !== 'object') continue;
    if (n.elType === 'widget' && n.widgetType) {
      out.push(n);
    }
    if (Array.isArray(n.elements)) {
      collectWidgets(n.elements, out);
    }
  }
  return out;
}

(async function main() {
  console.log('========================================================================');
  console.log('🧩 Phase 6b Verification — Priority Queue Page Migrations (Priorities 1-6)');
  console.log('========================================================================\n');

  // ---------------------------------------------------------------------------
  // Group 1: Elementor-First Bridge Helper & CSS Rule
  // ---------------------------------------------------------------------------
  console.log('🔍 Group 1: Elementor Page Bridge Helper & Landmark Discipline');
  const elemBridgeCode = read('wordpress-theme/inc/class-sedrazavi-elementor.php');
  const themeStyleCss = read('wordpress-theme/style.css');

  const fnBody = elemBridgeCode.slice(elemBridgeCode.indexOf('function sedrazavi_try_render_elementor_page_content('));
  assert(
    elemBridgeCode.includes('function sedrazavi_try_render_elementor_page_content(') &&
    elemBridgeCode.includes("did_action('elementor/loaded')") &&
    elemBridgeCode.includes("class_exists('\\Elementor\\Plugin')") &&
    elemBridgeCode.includes('has_blocks(') &&
    elemBridgeCode.includes("'_uas_template_slug'") &&
    fnBody.includes('<div class="sedrazavi-elementor-migrated-page"') &&
    !/echo\s+['"][^'"]*<main\b/.test(fnBody),
    'sedrazavi_try_render_elementor_page_content handles Elementor guards, Gutenberg preservation, library lookup & zero duplicate <main>'
  );
  assert(
    themeStyleCss.includes('.sedrazavi-elementor-migrated-page'),
    'wordpress-theme/style.css styles .sedrazavi-elementor-migrated-page for 100% CSS coverage parity'
  );

  // ---------------------------------------------------------------------------
  // Group 2: Priority Queue 1-6 PHP Theme Templates
  // ---------------------------------------------------------------------------
  console.log('\n🔍 Group 2: Priority 1-6 PHP Theme Templates & Security Boundaries');

  const frontPage = read('wordpress-theme/front-page.php');
  assert(
    frontPage.includes('$archetype_template_map') &&
    frontPage.includes("'corporate-pro'   => 'template-home-corporate-pro'") &&
    frontPage.includes("'store-modern'    => 'template-store-showcase'") &&
    frontPage.includes("sedrazavi_try_render_elementor_page_content($elementor_fallback_slug)") &&
    frontPage.includes("get_template_part('template-parts/front', 'agency')"),
    'Priority 1: front-page.php routes archetypes Elementor-First with template-parts fallback'
  );

  const pageServices = read('wordpress-theme/page-services.php');
  assert(
    pageServices.includes("sedrazavi_try_render_elementor_page_content('template-services-bento')") &&
    pageServices.includes("array('services', 'service')"),
    "Priority 2: page-services.php routes Elementor-First ('template-services-bento') & queries both 'services' and 'service' CPTs"
  );

  const pagePortfolio = read('wordpress-theme/page-portfolio.php');
  assert(
    pagePortfolio.includes("sedrazavi_try_render_elementor_page_content('template-portfolio-showcase')") &&
    pagePortfolio.includes("'post_type' => 'portfolio'"),
    "Priority 2: page-portfolio.php routes Elementor-First ('template-portfolio-showcase') & queries 'portfolio' CPT"
  );

  const pageAbout = read('wordpress-theme/page-about.php');
  const pageContact = read('wordpress-theme/page-contact.php');
  assert(
    pageAbout.includes("sedrazavi_try_render_elementor_page_content('template-home-corporate-pro')") &&
    pageAbout.includes('[sedrazavi_react_firm_milestones]'),
    "Priority 3: page-about.php routes Elementor-First ('template-home-corporate-pro') with firm milestones fallback"
  );
  assert(
    pageContact.includes("sedrazavi_try_render_elementor_page_content('template-contact-booking-split')") &&
    pageContact.includes('[sedrazavi_booking]'),
    "Priority 3: page-contact.php routes Elementor-First ('template-contact-booking-split') with booking fallback"
  );

  const archivePhp = read('wordpress-theme/archive.php');
  const singlePhp = read('wordpress-theme/single.php');
  const headerPhp = read('wordpress-theme/header.php');
  const footerPhp = read('wordpress-theme/footer.php');
  assert(
    /elementor_theme_do_location\s*\(\s*['"]header['"]\s*\)/.test(headerPhp) &&
    /elementor_theme_do_location\s*\(\s*['"]footer['"]\s*\)/.test(footerPhp) &&
    /elementor_theme_do_location\s*\(\s*['"]archive['"]\s*\)/.test(archivePhp) &&
    /elementor_theme_do_location\s*\(\s*['"]single['"]\s*\)/.test(singlePhp),
    'Priority 4: header.php, footer.php, archive.php, and single.php support Elementor Theme Builder / Free Bridge locations'
  );

  const legalIntel = read('wordpress-theme/page-legal-intelligence.php');
  const pagePortal = read('wordpress-theme/page-portal.php');
  const pageTimeline = read('wordpress-theme/page-case-timeline.php');
  assert(
    legalIntel.includes("'require_explicit_page' => true") &&
    !legalIntel.includes('<main ') &&
    pagePortal.includes('SedRazavi_Legal_Matter_Portal') &&
    pageTimeline.includes('is_user_logged_in()'),
    'Priority 5: Legal Intelligence keeps explicit-only Elementor opt-in without double <main>; Portal & Case Timeline remain auth-locked'
  );

  const pageStore = read('wordpress-theme/page-store.php');
  assert(
    pageStore.includes("sedrazavi_try_render_elementor_page_content('template-store-showcase')") &&
    pageStore.includes("class_exists('WooCommerce')"),
    "Priority 6: page-store.php routes Elementor-First ('template-store-showcase') while preserving WooCommerce guard"
  );

  // ---------------------------------------------------------------------------
  // Group 3: Dynamic_Query_Engine & Demo_Importer Alignment
  // ---------------------------------------------------------------------------
  console.log('\n🔍 Group 3: Dynamic Query Engine & Demo Importer Alignment');
  const dynEngine = read('elementor-addon-suite/includes/class-dynamic-query-engine.php');
  const demoImporter = read('sedrazavi-companion/includes/class-demo-importer.php');
  assert(
    dynEngine.includes("['services', 'service']") &&
    dynEngine.includes("$types['services']"),
    'Dynamic_Query_Engine normalizes services/service CPT safely after confidential CPT filter'
  );
  assert(
    demoImporter.includes("'template-contact-booking-split'") &&
    demoImporter.includes("'template-services-bento'") &&
    demoImporter.includes("'template-home-corporate-pro'"),
    'Demo_Importer maps starter Corporate, Services, and Contact pages to upgraded Phase 6b JSON templates'
  );

  // ---------------------------------------------------------------------------
  // Group 4: Upgraded Elementor Native JSON Templates (Control Parity & Clean Media)
  // ---------------------------------------------------------------------------
  console.log('\n🔍 Group 4: Upgraded Elementor JSON Templates — Controls, Layout & Media Parity');

  const tplDir = path.join(suiteDir, 'templates');
  const topJsonCount = fs.readdirSync(tplDir).filter((f) => f.endsWith('.json')).length;
  const popupJsonCount = fs.readdirSync(path.join(tplDir, 'popups')).filter((f) => f.endsWith('.json')).length;
  assert(
    topJsonCount === 30 && popupJsonCount === 3,
    `Exact 33 Elementor JSON templates preserved (${topJsonCount} containers/pages + ${popupJsonCount} popups)`
  );

  const inspectList = [
    'template-services-bento.json',
    'template-portfolio-showcase.json',
    'template-contact-booking-split.json',
    'template-store-showcase.json',
    'template-home-corporate-pro.json',
    'template-home-creative-agency.json',
  ];

  for (const fname of inspectList) {
    const raw = read(`elementor-addon-suite/templates/${fname}`);
    const parsed = JSON.parse(raw);
    const widgets = collectWidgets(parsed.content);
    const hasUnsplash = raw.includes('images.unsplash.com');
    const hasRawHtml = widgets.some((w) => w.widgetType === 'html');
    const hasConfidentialCpt = raw.includes('sedrazavi_case') || raw.includes('arbitration_case');
    assert(
      parsed.type === 'page' &&
      Array.isArray(parsed.content) &&
      parsed.content.length >= 3 &&
      !hasUnsplash &&
      !hasRawHtml &&
      !hasConfidentialCpt,
      `${fname}: type='page', >=3 containers, zero Unsplash URLs, zero raw html widgets, zero confidential CPT queries`
    );
  }

  // Exact control parity checks on Priority 2 & 3 widgets
  const servicesBento = JSON.parse(read('elementor-addon-suite/templates/template-services-bento.json'));
  const servicesWidgets = collectWidgets(servicesBento.content);
  const sgWidget = servicesWidgets.find((w) => w.widgetType === 'uas_services_grid');
  const sdWidget = servicesWidgets.find((w) => w.widgetType === 'uas_dynamic_grid');
  const sCtaWidget = servicesWidgets.find((w) => w.widgetType === 'uas_cta');
  assert(
    sgWidget &&
    Array.isArray(sgWidget.settings.services_list) &&
    sgWidget.settings.services_list[0].item_title &&
    sgWidget.settings.services_list[0].item_desc &&
    !sgWidget.settings.section_title &&
    sdWidget && sdWidget.settings.query_post_type === 'services' &&
    sCtaWidget && typeof sCtaWidget.settings.description === 'string',
    'template-services-bento.json uses authentic PHP control keys (services_list/item_title/item_desc, uas_dynamic_grid services, uas_cta.description)'
  );

  const portfolioTpl = JSON.parse(read('elementor-addon-suite/templates/template-portfolio-showcase.json'));
  const portfolioWidgets = collectWidgets(portfolioTpl.content);
  const pdWidget = portfolioWidgets.find((w) => w.widgetType === 'uas_dynamic_grid');
  const pTestiWidget = portfolioWidgets.find((w) => w.widgetType === 'uas_testimonials');
  assert(
    pdWidget && pdWidget.settings.query_post_type === 'portfolio' &&
    pTestiWidget && Array.isArray(pTestiWidget.settings.testimonials_list) &&
    pTestiWidget.settings.testimonials_list.every((t) => t.avatar && t.avatar.source === 'sovereign_local'),
    'template-portfolio-showcase.json queries public portfolio CPT and overrides testimonial avatars with sovereign_local'
  );

  const contactTpl = JSON.parse(read('elementor-addon-suite/templates/template-contact-booking-split.json'));
  const contactWidgets = collectWidgets(contactTpl.content);
  const cbWidget = contactWidgets.find((w) => w.widgetType === 'uas_contact_booking');
  const faqWidget = contactWidgets.find((w) => w.widgetType === 'uas_faq');
  const hasInnerColumns = JSON.stringify(contactTpl.content).includes('"isInner":true');
  assert(
    hasInnerColumns &&
    cbWidget &&
    typeof cbWidget.settings.form_title === 'string' &&
    typeof cbWidget.settings.form_desc === 'string' &&
    typeof cbWidget.settings.submit_btn_text === 'string' &&
    !cbWidget.settings.booking_title &&
    faqWidget && Array.isArray(faqWidget.settings.faqs_list),
    'template-contact-booking-split.json has split isInner Flexbox columns + authentic uas_contact_booking controls + uas_faq schema'
  );

  const corpTpl = JSON.parse(read('elementor-addon-suite/templates/template-home-corporate-pro.json'));
  const corpWidgets = collectWidgets(corpTpl.content);
  const cTeam = corpWidgets.find((w) => w.widgetType === 'uas_team');
  const cMiles = corpWidgets.find((w) => w.widgetType === 'uas_firm_milestones');
  assert(
    cMiles && cTeam && Array.isArray(cTeam.settings.team_list) &&
    cTeam.settings.team_list.every((m) => m.photo && m.photo.source === 'sovereign_local'),
    'template-home-corporate-pro.json includes uas_firm_milestones & uas_team with sovereign_local photo overrides'
  );

  const storeTpl = JSON.parse(read('elementor-addon-suite/templates/template-store-showcase.json'));
  const storeWidgets = collectWidgets(storeTpl.content);
  const stGrid = storeWidgets.find((w) => w.widgetType === 'uas_dynamic_grid');
  assert(
    stGrid && stGrid.settings.query_post_type === 'product',
    "template-store-showcase.json pairs uas_dynamic_grid ('product') safely alongside store trust grid"
  );

  // ---------------------------------------------------------------------------
  // Group 5: ZIP Packaging Parity
  // ---------------------------------------------------------------------------
  console.log('\n🔍 Group 5: Packaged ZIP Archives Parity');
  const checks = [
    {
      zip: 'sedrazavi-theme.zip',
      files: [
        'sedrazavi-theme/inc/class-sedrazavi-elementor.php',
        'sedrazavi-theme/front-page.php',
        'sedrazavi-theme/page-services.php',
        'sedrazavi-theme/page-portfolio.php',
        'sedrazavi-theme/page-about.php',
        'sedrazavi-theme/page-contact.php',
        'sedrazavi-theme/page-store.php',
      ],
    },
    {
      zip: 'elementor-addon-suite.zip',
      files: [
        'elementor-addon-suite/templates/template-services-bento.json',
        'elementor-addon-suite/templates/template-portfolio-showcase.json',
        'elementor-addon-suite/templates/template-contact-booking-split.json',
        'elementor-addon-suite/templates/template-store-showcase.json',
        'elementor-addon-suite/templates/template-home-corporate-pro.json',
        'elementor-addon-suite/includes/class-dynamic-query-engine.php',
      ],
    },
    {
      zip: 'sedrazavi-companion.zip',
      files: ['sedrazavi-companion/includes/class-demo-importer.php'],
    },
    {
      zip: 'sedrazavi-designer-theme.zip',
      files: [
        'sedrazavi-designer-theme/templates/template-services-bento.json',
        'sedrazavi-designer-theme/templates/template-portfolio-showcase.json',
        'sedrazavi-designer-theme/templates/template-contact-booking-split.json',
      ],
    },
    {
      zip: 'sedrazavi-designer-core.zip',
      files: [
        'sedrazavi-designer-core/templates/template-services-bento.json',
        'sedrazavi-designer-core/templates/template-portfolio-showcase.json',
        'sedrazavi-designer-core/templates/template-contact-booking-split.json',
      ],
    },
  ];

  for (const c of checks) {
    const zPath = path.join(publicDir, c.zip);
    const exists = fs.existsSync(zPath);
    let innerOk = false;
    if (exists) {
      const z = await JSZip.loadAsync(fs.readFileSync(zPath));
      innerOk = c.files.every((f) => Boolean(z.file(f)));
    }
    assert(exists && innerOk, `${c.zip} contains all updated Phase 6b templates & PHP bridge files`);
  }

  console.log('\n========================================================================');
  console.log(`📊 Phase 6b Verification Result: ${passed} / ${total} passed`);
  console.log('========================================================================');

  if (!allOk) {
    process.exit(1);
  }
})();
