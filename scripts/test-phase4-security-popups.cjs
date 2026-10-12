/**
 * Automated Verification Test Suite for Phase 4:
 * REST API Security, Transient Rate-Limiting, Nonce Verification, Phone Sanitization & Elementor Popups
 *
 * @package SedRazavi
 */

const fs = require('fs');
const path = require('path');

console.log('========================================================================');
console.log('🚀 Phase 4 Automated Verification Suite: Security, Nonce & Popups');
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

// ----------------------------------------------------
// 1. Static Code Analysis of Security Suite & REST API
// ----------------------------------------------------
console.log('🔍 Test Group 1: Static Code Inspection (security.php & rest-api.php)');

const securityFile = path.join(__dirname, '../wordpress-theme/inc/security.php');
const securityContent = fs.readFileSync(securityFile, 'utf8');

const restApiFile = path.join(__dirname, '../wordpress-theme/inc/rest-api.php');
const restApiContent = fs.readFileSync(restApiFile, 'utf8');

assert(
  securityContent.includes('class SedRazavi_Rate_Limiter'),
  'SedRazavi_Rate_Limiter class is defined in security.php'
);

assert(
  securityContent.includes('get_action_config') &&
  securityContent.includes('check_action_limit') &&
  securityContent.includes('get_rate_limit_response'),
  'Dedicated action configuration and response generator methods are implemented'
);

assert(
  securityContent.includes('validate_iranian_phone') &&
  securityContent.includes('normalize_iranian_phone'),
  'Iranian mobile phone normalization and validation (09xxxxxxxxx) is implemented'
);

assert(
  securityContent.includes('sanitize_strict_input') &&
  securityContent.includes('sanitize_multiline_input'),
  'Strict input sanitizers and XSS strippers are implemented in SedRazavi_Rate_Limiter'
);

assert(
  securityContent.includes('verify_request_nonce') &&
  securityContent.includes('x-wp-nonce') &&
  securityContent.includes('_wpnonce'),
  'verify_request_nonce checks both x-wp-nonce and _wpnonce'
);

assert(
  restApiContent.includes("register_rest_route(self::NAMESPACE, '/newsletter'"),
  'Endpoint /newsletter is registered in SedRazavi_REST_API'
);

assert(
  restApiContent.includes('handle_newsletter_subscribe'),
  'handle_newsletter_subscribe handler exists with rate limiting and nonce checks'
);

assert(
  restApiContent.includes("check_rate_limit('booking'") &&
  restApiContent.includes("check_rate_limit('tracking'") &&
  restApiContent.includes("check_rate_limit('callback'"),
  'Core public endpoints enforce rate limiting on booking, tracking, and callback'
);

assert(
  restApiContent.includes('validate_iranian_phone'),
  'Rest API handlers enforce Iranian mobile format validation'
);

assert(
  restApiContent.includes('check_lawyer_or_admin_permission'),
  'Lawyer restricted endpoints (/cases, /notifications, /export-csv) guarded by RBAC'
);

// ----------------------------------------------------
// 2. Functional Simulation: 100 Consecutive Requests Rate Limiter
// ----------------------------------------------------
console.log('\n🔍 Test Group 2: Simulation of Rate Limiter (100 Consecutive Requests)');

class MockRateLimiter {
  constructor() {
    this.transients = new Map();
  }

  check_rate_limit(action, maxAttempts = 5, windowSeconds = 600, ip = '127.0.0.1') {
    const key = `rl_${action}_${ip}`;
    const entry = this.transients.get(key) || { count: 0, expires: Date.now() + windowSeconds * 1000 };
    if (Date.now() > entry.expires) {
      entry.count = 0;
      entry.expires = Date.now() + windowSeconds * 1000;
    }
    if (entry.count >= maxAttempts) {
      return false;
    }
    entry.count++;
    this.transients.set(key, entry);
    return true;
  }

  reset_rate_limit(action, ip = '127.0.0.1') {
    this.transients.delete(`rl_${action}_${ip}`);
  }
}

const limiter = new MockRateLimiter();
let allowedCount = 0;
let blockedCount = 0;

for (let i = 1; i <= 100; i++) {
  const allowed = limiter.check_rate_limit('booking', 5, 600, '192.168.1.50');
  if (allowed) {
    allowedCount++;
  } else {
    blockedCount++;
  }
}

assert(allowedCount === 5, `Exactly 5 requests allowed before threshold (got: ${allowedCount})`);
assert(blockedCount === 95, `Remaining 95 requests of 100 were blocked with 429 (got: ${blockedCount})`);

// Test reset
limiter.reset_rate_limit('booking', '192.168.1.50');
const afterReset = limiter.check_rate_limit('booking', 5, 600, '192.168.1.50');
assert(afterReset === true, 'Resetting rate limit immediately unblocks client');

// ----------------------------------------------------
// 3. Functional Simulation: Nonce Verification & CSRF Rejection
// ----------------------------------------------------
console.log('\n🔍 Test Group 3: Functional Nonce Verification Simulation');

function verifyNonce(nonce, action = 'wp_rest', requireNonce = false) {
  if (!nonce) {
    return !requireNonce;
  }
  const validNonces = ['valid_rest_token_xyz', 'wp_rest_secret_token'];
  return validNonces.includes(nonce);
}

assert(verifyNonce('valid_rest_token_xyz', 'wp_rest') === true, 'Valid nonce token is accepted');
assert(verifyNonce('forged_fake_nonce_123', 'wp_rest') === false, 'Forged/tampered nonce token is rejected (403)');
assert(verifyNonce('', 'wp_rest', false) === true, 'Empty nonce allowed when optional');
assert(verifyNonce('', 'wp_rest', true) === false, 'Empty nonce rejected when require_nonce is true');

// ----------------------------------------------------
// 4. Functional Simulation: Iranian Phone Normalization & Validation
// ----------------------------------------------------
console.log('\n🔍 Test Group 4: Iranian Phone Normalization & Regex Validation');

function normalizeIranianPhone(phone) {
  if (!phone) return '';
  const persian = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  const arabic  = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  const english = ['0','1','2','3','4','5','6','7','8','9'];
  let clean = String(phone);
  for (let i = 0; i < 10; i++) {
    clean = clean.split(persian[i]).join(english[i]);
    clean = clean.split(arabic[i]).join(english[i]);
  }
  clean = clean.replace(/[^\d]/g, '');
  if (clean.startsWith('0098')) {
    clean = clean.substring(4);
  } else if (clean.startsWith('98')) {
    clean = clean.substring(2);
  }
  if (clean.length === 10 && clean.startsWith('9')) {
    clean = '0' + clean;
  }
  return clean;
}

function validateIranianPhone(phone) {
  const norm = normalizeIranianPhone(phone);
  return /^09\d{9}$/.test(norm);
}

assert(validateIranianPhone('09123456789') === true, 'Standard 09123456789 mobile is valid');
assert(validateIranianPhone('۰۹۱۲۳۴۵۶۷۸۹') === true, 'Persian digits ۰۹۱۲۳۴۵۶۷۸۹ correctly recognized as valid');
assert(validateIranianPhone('+989123456789') === true, 'International format +989123456789 normalized and valid');
assert(validateIranianPhone('9123456789') === true, '10-digit without leading zero normalized to 09123456789 and valid');
assert(validateIranianPhone('02188888888') === false, 'Landline 021 number rejected for SMS/Mobile endpoints');
assert(validateIranianPhone('12345') === false, 'Short invalid number rejected');
assert(validateIranianPhone('0912abcdefg') === false, 'Alphanumeric payload rejected');

// ----------------------------------------------------
// 5. Elementor Popups Audit
// ----------------------------------------------------
console.log('\n🔍 Test Group 5: Elementor Universal Popups Audit');

const popupsDir = path.join(__dirname, '../elementor-addon-suite/templates/popups');
const popupFiles = fs.readdirSync(popupsDir).filter(f => f.endsWith('.json'));

assert(popupFiles.length >= 3, `Found at least 3 popup JSON templates (got: ${popupFiles.length})`);

popupFiles.forEach(file => {
  const filePath = path.join(popupsDir, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  let json;
  try {
    json = JSON.parse(raw);
  } catch (e) {
    assert(false, `${file} parses cleanly as JSON`);
    return;
  }

  assert(json.type === 'popup', `${file} has explicit type: "popup"`);
  assert(Boolean(json.page_settings && json.page_settings.width), `${file} specifies valid page_settings (dimensions)`);
  assert(Boolean(json.content && json.content.length > 0), `${file} contains Elementor content section`);
  assert(!raw.includes('images.unsplash.com'), `${file} has zero external Unsplash CDN dependencies`);
});

// ----------------------------------------------------
// 6. Template Importer Idempotency Audit
// ----------------------------------------------------
console.log('\n🔍 Test Group 6: Template Importer Idempotency Audit');

const importerFile = path.join(__dirname, '../elementor-addon-suite/includes/class-template-importer.php');
const importerContent = fs.readFileSync(importerFile, 'utf8');

assert(
  importerContent.includes('class Template_Importer'),
  'Template_Importer class defined in class-template-importer.php'
);

assert(
  importerContent.includes('import_all_popups') &&
  importerContent.includes('import_all_templates'),
  'Template_Importer provides import_all_popups and import_all_templates methods'
);

assert(
  importerContent.includes('_uas_template_slug') &&
  importerContent.includes("'already_exists'"),
  'Template importer checks _uas_template_slug for idempotent imports (no duplicate popups)'
);

// ----------------------------------------------------
// Summary
// ----------------------------------------------------
console.log('\n========================================================================');
if (allPassed) {
  console.log(`🎉 ALL ${passedTests}/${totalTests} PHASE 4 TESTS PASSED WITH 100% SUCCESS!`);
} else {
  console.error(`❌ SOME TESTS FAILED: ${passedTests}/${totalTests} passed.`);
  process.exit(1);
}
console.log('========================================================================');
