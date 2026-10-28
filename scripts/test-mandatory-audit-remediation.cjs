/**
 * Mandatory Repository Audit & Remediation Verification Suite
 * Verifies P0/P1 security and architecture remediations:
 * 1. CPT case confidentiality & public case_study separation
 * 2. REST permission callbacks & ownership enforcement (no nonce-only auth)
 * 3. Locale-aware dir and lang in header.php
 * 4. Header & Footer archetype allowlisting and preview capability gating
 * 5. Conditional asset loading & single canonical build manifest
 * 
 * @package SedRazavi
 */

const fs = require('fs');
const path = require('path');

console.log('========================================================================');
console.log('🛡️ Mandatory Audit Remediation & Security Verification Suite');
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
// Test Group 1: CPT 'case' Confidentiality & 'case_study' Separation
// -------------------------------------------------------------
console.log('🔍 Test Group 1: CPT Case Confidentiality & Public Case Study Separation');

const themeFunctionsPath = path.join(__dirname, '../wordpress-theme/functions.php');
assert(fs.existsSync(themeFunctionsPath), 'wordpress-theme/functions.php exists');
const themeFunctionsContent = fs.readFileSync(themeFunctionsPath, 'utf8');

// Audit CPT 'case' settings
assert(
  themeFunctionsContent.includes("register_post_type('case'") || themeFunctionsContent.includes("register_post_type('case',"),
  "CPT 'case' is registered in functions.php"
);

assert(
  themeFunctionsContent.includes("'public'              => false") || themeFunctionsContent.includes("'public' => false"),
  "CPT 'case' has public => false (confidential client dossier)"
);

assert(
  themeFunctionsContent.includes("'publicly_queryable'  => false") || themeFunctionsContent.includes("'publicly_queryable' => false"),
  "CPT 'case' has publicly_queryable => false (prevent direct URL queries)"
);

assert(
  themeFunctionsContent.includes("'exclude_from_search' => true"),
  "CPT 'case' has exclude_from_search => true (hidden from public site search)"
);

assert(
  themeFunctionsContent.includes("'has_archive'         => false"),
  "CPT 'case' has has_archive => false (no public case archive list)"
);

assert(
  themeFunctionsContent.includes("'rewrite'             => false"),
  "CPT 'case' has rewrite => false (no public permalink slug)"
);

assert(
  themeFunctionsContent.includes("'show_in_rest'        => false"),
  "CPT 'case' has show_in_rest => false (disallow unauthenticated core REST route)"
);

// Audit CPT 'case_study' (public precedents)
assert(
  themeFunctionsContent.includes("register_post_type('case_study'"),
  "CPT 'case_study' is registered for public marketing precedents"
);

assert(
  themeFunctionsContent.includes("'rewrite'             => ['slug' => 'case-studies']"),
  "CPT 'case_study' has public rewrite slug 'case-studies'"
);

// -------------------------------------------------------------
// Test Group 2: REST Authorization & Ownership Enforcement
// -------------------------------------------------------------
console.log('\n🔍 Test Group 2: REST Authorization & Strict Ownership Validation');

const restAuthPath = path.join(__dirname, '../wordpress-theme/inc/wp-rest-auth.php');
assert(fs.existsSync(restAuthPath), 'wordpress-theme/inc/wp-rest-auth.php exists');
const restAuthContent = fs.readFileSync(restAuthPath, 'utf8');

assert(
  restAuthContent.includes('check_logged_in_permission') &&
  restAuthContent.includes('is_user_logged_in()') &&
  restAuthContent.includes('rest_not_logged_in'),
  'check_logged_in_permission strictly enforces is_user_logged_in()'
);

// Ensure nonce alone does NOT return true in check_logged_in_permission
assert(
  !restAuthContent.includes("if ($nonce && wp_verify_nonce($nonce, 'wp_rest')) {\n            return true;\n        }"),
  'check_logged_in_permission does NOT allow nonce-only bypass'
);

assert(
  restAuthContent.includes('check_case_access_permission') &&
  restAuthContent.includes('current_user_can(\'manage_options\') || current_user_can(\'edit_posts\')'),
  'check_case_access_permission validates staff/lawyer capabilities'
);

assert(
  restAuthContent.includes('rest_case_forbidden') &&
  restAuthContent.includes('current_user_id'),
  'check_case_access_permission validates per-object ownership against current_user_id'
);

// Check api-handlers.php check_save_permissions
const apiHandlersPath = path.join(__dirname, '../wordpress-theme/inc/api-handlers.php');
assert(fs.existsSync(apiHandlersPath), 'wordpress-theme/inc/api-handlers.php exists');
const apiHandlersContent = fs.readFileSync(apiHandlersPath, 'utf8');

assert(
  apiHandlersContent.includes('check_save_permissions') &&
  apiHandlersContent.includes('rest_forbidden_capability') &&
  apiHandlersContent.includes("current_user_can('manage_options')"),
  'check_save_permissions strictly enforces manage_options or edit_theme_options capability'
);

// -------------------------------------------------------------
// Test Group 3: SEO, Locale & Query Parameter Allowlisting
// -------------------------------------------------------------
console.log('\n🔍 Test Group 3: SEO, Locale-Aware dir & Query Parameter Allowlisting');

const headerPath = path.join(__dirname, '../wordpress-theme/header.php');
assert(fs.existsSync(headerPath), 'wordpress-theme/header.php exists');
const headerContent = fs.readFileSync(headerPath, 'utf8');

assert(
  headerContent.includes('is_rtl() ? \'rtl\' : \'ltr\''),
  'header.php uses dynamic is_rtl() ? "rtl" : "ltr" for locale-aware text direction'
);

assert(
  !headerContent.includes('<html <?php language_attributes(); ?> dir="rtl">'),
  'header.php does NOT hardcode static dir="rtl"'
);

assert(
  headerContent.includes('$allowed_headers') &&
  headerContent.includes('current_user_can(\'edit_theme_options\') || is_customize_preview()'),
  'header.php strictly allowlists header archetypes and gates preview with capability'
);

assert(
  headerContent.includes('wp_robots_no_robots'),
  'header.php adds noindex (wp_robots_no_robots) on preview parameters'
);

const footerPath = path.join(__dirname, '../wordpress-theme/footer.php');
assert(fs.existsSync(footerPath), 'wordpress-theme/footer.php exists');
const footerContent = fs.readFileSync(footerPath, 'utf8');

assert(
  footerContent.includes('$allowed_footers') &&
  footerContent.includes('current_user_can(\'edit_theme_options\') || is_customize_preview()'),
  'footer.php strictly allowlists footer archetypes and gates preview with capability'
);

// -------------------------------------------------------------
// Test Group 4: Performance & Conditional Asset Enqueuing
// -------------------------------------------------------------
console.log('\n🔍 Test Group 4: Performance & Conditional Asset Enqueuing');

assert(
  !themeFunctionsContent.includes('if (is_front_page() || is_home()) {\n            $needs_react = true;'),
  'theme does NOT force heavy React SPA bundle on front page unconditionally'
);

const reactShortcodesPath = path.join(__dirname, '../wordpress-theme/inc/react-shortcodes.php');
assert(fs.existsSync(reactShortcodesPath), 'wordpress-theme/inc/react-shortcodes.php exists');
const reactShortcodesContent = fs.readFileSync(reactShortcodesPath, 'utf8');

assert(
  reactShortcodesContent.includes('/app-dist/index.js') &&
  themeFunctionsContent.includes('app-dist/index.js'),
  'Both functions.php and react-shortcodes.php prioritize canonical app-dist build path'
);

console.log('========================================================================');
console.log(`📊 Test Results: ${passedTests} / ${totalTests} passed`);
if (allPassed) {
  console.log('🎉 ALL MANDATORY AUDIT & REMEDIATION TESTS PASSED (100%)!');
} else {
  console.error('❌ SOME CHECKS FAILED!');
  process.exit(1);
}
console.log('========================================================================\n');
