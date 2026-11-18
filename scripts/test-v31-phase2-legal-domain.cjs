#!/usr/bin/env node
/**
 * SedRazavi v31 — Phase 2 Verification Suite:
 * Legal Domain Model, Data Persistence & Anti-IDOR Ownership Hardening
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

let passed = 0;
let total = 0;

function check(label, fn) {
  total++;
  try {
    fn();
    passed++;
    console.log(`  ✅ ${label}`);
  } catch (err) {
    console.error(`  ❌ ${label}: ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('\n🔍 SedRazavi v31 — Phase 2 Verification: Legal Domain, Persistence & Anti-IDOR');

// 1. Companion & Theme Case Data Service SSOT
check('Companion SSOT class-case-data-service.php exists and is loaded by sedrazavi-companion.php', () => {
  const compService = read('sedrazavi-companion/includes/class-case-data-service.php');
  const compBoot = read('sedrazavi-companion/sedrazavi-companion.php');
  const themeService = read('wordpress-theme/inc/class-case-data-service.php');

  assert(compService.includes("if (!class_exists('SedRazavi_Case_Data_Service'))"));
  assert(themeService.includes("if (!class_exists('SedRazavi_Case_Data_Service'))"));
  for (const sym of [
    "const CANONICAL_CPT = 'sedrazavi_case'",
    'get_confidential_cpts',
    'is_privileged_legal_staff',
    'can_user_access_case',
    'can_user_access_matter_record',
    'count_active_cases',
  ]) {
    assert(compService.includes(sym), `Companion missing ${sym}`);
    assert(themeService.includes(sym), `Theme missing ${sym}`);
  }
  assert(compBoot.includes("'includes/class-case-data-service.php'"));
  assert(compBoot.includes("register_legal_capabilities"));
});

// 2. Matter Portal Anti-IDOR & No edit_posts escalation
check('class-legal-matter-portal.php removes edit_posts privilege escalation & enforces Anti-IDOR + document binding', () => {
  const code = read('sedrazavi-companion/includes/class-legal-matter-portal.php');
  assert(!code.includes("current_user_can('edit_posts')"), 'edit_posts must not exist in matter portal');
  assert(code.includes('SedRazavi_Case_Data_Service::is_privileged_legal_staff'));
  assert(code.includes('SedRazavi_Case_Data_Service::can_user_access_matter_record'));
  assert(code.includes('is_document_bound_to_matter'));
  assert(code.includes('resolve_user_id'));
  assert(code.includes('_sedrazavi_assigned_lawyer_id'));
});

// 3. Intake & Appointments: zero fake PII seeding, canonical cap added, status allowlist
check('class-legal-intake-appointments.php removes demo PII seeding, adds canonical sedrazavi_view_cases & enforces status allowlist', () => {
  const code = read('sedrazavi-companion/includes/class-legal-intake-appointments.php');
  for (const fake of ['آرش طاهری', 'نگار کریمی', 'فناوران آریا']) {
    assert(!code.includes(fake), `Found forbidden fake/typo string: ${fake}`);
  }
  assert(code.includes('sedrazavi_view_cases'));
  assert(code.includes('SedRazavi_Case_Data_Service::is_privileged_legal_staff'));
  assert(code.includes('allowed_statuses'));
  assert(!code.includes("current_user_can('edit_posts')"));
  assert(!/\bdate\s*\(/.test(code), 'Should use gmdate() instead of date()');
});

// 4. Instant Search: excludes sr_case and confidential CPTs
check('class-instant-search.php removes sr_case from unauthenticated search and excludes confidential CPTs', () => {
  const code = read('sedrazavi-companion/includes/class-instant-search.php');
  assert(!code.includes("'sr_case'"), 'sr_case must not appear in public search');
  assert(code.includes('SedRazavi_Case_Data_Service::get_confidential_cpts'));
  assert(code.includes('legal_precedent'));
});

// 5. Role Manager: protects both sr_client and sedrazavi_client
check('class-role-manager.php isolates both sr_client and sedrazavi_client from wp-admin', () => {
  const code = read('sedrazavi-companion/includes/class-role-manager.php');
  assert(code.includes("'sr_client'") && code.includes("'sedrazavi_client'"));
});

// 6. Comprehensive Dashboard: dedicated capability_type & zero fake static rows
check('class-sedrazavi-dashboard.php uses sedrazavi_case capability_type & real DB queries with zero hardcoded demo PII', () => {
  const code = read('wordpress-theme/inc/class-sedrazavi-dashboard.php');
  assert(code.includes("'capability_type'     => ['sedrazavi_case', 'sedrazavi_cases']"));
  assert(code.includes("'map_meta_cap'        => true"));
  assert(code.includes("'show_in_rest'        => false"));
  for (const fake of [
    'دکتر حمید علوی',
    'مریم کاظمی',
    '۱۸۵,۰۰۰,۰۰۰',
    '۲۴ فاکتور',
    'شرکت توسعه پارس',
    'info@devpars.com',
  ]) {
    assert(!code.includes(fake), `Found hardcoded fake data: ${fake}`);
  }
  assert(code.includes('sedrazavi_consultations') && code.includes('sedrazavi_payments'));
});

// 7. Admin Dashboard Overview (inc/dashboard.php): zero fallback 48 or fake counters/rows
check('wordpress-theme/inc/dashboard.php removes ?? 48 and hardcoded KPIs/rows in favor of live DB counts', () => {
  const code = read('wordpress-theme/inc/dashboard.php');
  for (const fake of [
    '?? 48',
    '۶ <?php esc_html_e',
    '۲ <?php esc_html_e',
    '۴ <?php esc_html_e',
    'مهندس رضا تبریزی',
    'دکتر سارا پارسا',
  ]) {
    assert(!code.includes(fake), `Found hardcoded fake stat/row: ${fake}`);
  }
  assert(code.includes('SedRazavi_Case_Data_Service::count_active_cases'));
});

// 8. Arbitration CPT & Realtime Notifications Leads Isolation
check('arbitration-cpt.php and class-realtime-notifications.php enforce private sedrazavi_case caps & zero edit_posts', () => {
  const arb = read('wordpress-theme/inc/arbitration-cpt.php');
  assert(arb.includes("'capability_type'     => array('sedrazavi_case', 'sedrazavi_cases')"));
  assert(arb.includes("'map_meta_cap'        => true"));
  assert(arb.includes("'show_in_rest'        => false"));

  const rt = read('wordpress-theme/inc/class-realtime-notifications.php');
  assert(!rt.includes("current_user_can('edit_posts')"), 'edit_posts must be removed from uas_lead polling/bell');
  assert(rt.includes("'show_in_rest'        => false"));
  assert(rt.includes("'capability_type'     => array('sedrazavi_case', 'sedrazavi_cases')"));
  assert(rt.includes('can_manage_leads'));
});

// 9. Addons Case Tracking & ODR Delegation
check('sedrazavi-addons case-tracking.php & class-sedrazavi-odr-arbitration.php use SedRazavi_Case_Data_Service SSOT', () => {
  const track = read('sedrazavi-addons/includes/case-tracking.php');
  assert(track.includes('SedRazavi_Case_Data_Service::get_litigation_post_types'));
  assert(track.includes('hash_equals($stored_nid') && track.includes('hash_equals($stored_phone'));

  const odr = read('sedrazavi-addons/includes/class-sedrazavi-odr-arbitration.php');
  assert(odr.includes('SedRazavi_Case_Data_Service::can_user_access_case'));
  assert(odr.includes('SedRazavi_Case_Data_Service::can_create_or_manage_cases'));
  assert(!odr.includes('edit_posts'));
});

// 10. Standalone Legal Theme Portal Dashboard (page-dashboard.php)
check('standalone-themes/sedrazavi-legal-theme/page-dashboard.php removes static numbers & requires login + ownership check', () => {
  const pageDash = read('standalone-themes/sedrazavi-legal-theme/page-dashboard.php');
  for (const fake of ['۰۲', '۱۴ آبان ۱۴۰۵', 'تسویه مرحله دوم']) {
    assert(!pageDash.includes(fake), `Found static fake dashboard card text: ${fake}`);
  }
  assert(pageDash.includes('is_user_logged_in()'));
  assert(pageDash.includes('SedRazavi_Case_Data_Service::can_user_access_case'));
});

console.log(`\n📊 Phase 2 Verification Summary: ${passed}/${total} passed\n`);
if (process.exitCode && process.exitCode !== 0) {
  process.exit(process.exitCode);
}
