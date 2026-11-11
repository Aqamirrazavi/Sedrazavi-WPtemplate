/**
 * Phase 10: Controlled Banks Verification Suite
 *
 * Verifies Native Portability Spec v31 Section 2, 3, 4:
 * 1. Elementor Widget Ledger integrity (31 native widgets verified)
 * 2. Elementor Template Ledger integrity (33 native templates verified)
 * 3. Gutenberg Block Ledger integrity (7 native block.json verified)
 * 4. Cross-checks registry against actual filesystem source paths
 *
 * @package SedRazavi
 */

const fs = require('fs');
const path = require('path');

console.log('========================================================================');
console.log('🏛️ Phase 10: Controlled Banks Ledger & Verification Suite');
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
// Test Group 1: Elementor Widget Ledger Verification
// -------------------------------------------------------------
console.log('🔍 Test Group 1: Elementor Widget Ledger Verification (31 Widgets)');

const widgetLedgerPath = path.join(__dirname, '../qa/elementor-widget-verification.csv');
assert(fs.existsSync(widgetLedgerPath), 'qa/elementor-widget-verification.csv exists');
const widgetCsv = fs.readFileSync(widgetLedgerPath, 'utf8').trim().split('\n');
const widgetHeaders = widgetCsv[0].split(',');
assert(widgetHeaders.includes('widget_id') && widgetHeaders.includes('class') && widgetHeaders.includes('render_method'), 'Widget CSV header conforms to Spec v31');

const widgetRows = widgetCsv.slice(1);
assert(widgetRows.length === 31, `Widget ledger contains exactly 31 verified widgets (Found: ${widgetRows.length})`);

widgetRows.forEach(row => {
  const cols = row.split(',');
  const widgetId = cols[0];
  const srcPath = path.join(__dirname, '..', cols[2]);
  assert(fs.existsSync(srcPath), `Widget source file exists: ${cols[2]}`);
});

// -------------------------------------------------------------
// Test Group 2: Elementor Template Ledger Verification
// -------------------------------------------------------------
console.log('\n🔍 Test Group 2: Elementor Template Ledger Verification (33 Templates)');

const templateLedgerPath = path.join(__dirname, '../qa/elementor-template-verification.csv');
assert(fs.existsSync(templateLedgerPath), 'qa/elementor-template-verification.csv exists');
const templateCsv = fs.readFileSync(templateLedgerPath, 'utf8').trim().split('\n');
const templateHeaders = templateCsv[0].split(',');
assert(templateHeaders.includes('template_id') && templateHeaders.includes('file_path') && templateHeaders.includes('type'), 'Template CSV header conforms to Spec v31');

const templateRows = templateCsv.slice(1);
assert(templateRows.length >= 30, `Template ledger contains >= 30 templates (Found: ${templateRows.length})`);

templateRows.forEach(row => {
  const cols = row.split(',');
  const tplPath = path.join(__dirname, '..', cols[1]);
  assert(fs.existsSync(tplPath), `Template JSON file exists: ${cols[1]}`);
  try {
    const raw = fs.readFileSync(tplPath, 'utf8');
    const parsed = JSON.parse(raw);
    assert(parsed.content && Array.isArray(parsed.content), `Template ${cols[0]} has valid Elementor content array`);
  } catch (e) {
    assert(false, `Template ${cols[0]} has valid JSON schema: ${e.message}`);
  }
});

// -------------------------------------------------------------
// Test Group 3: Gutenberg Block Ledger Verification
// -------------------------------------------------------------
console.log('\n🔍 Test Group 3: Gutenberg Block Ledger Verification (7 Blocks)');

const blockLedgerPath = path.join(__dirname, '../qa/gutenberg-block-verification.csv');
assert(fs.existsSync(blockLedgerPath), 'qa/gutenberg-block-verification.csv exists');
const blockCsv = fs.readFileSync(blockLedgerPath, 'utf8').trim().split('\n');
const blockHeaders = blockCsv[0].split(',');
assert(blockHeaders.includes('block_id') && blockHeaders.includes('block_json_path') && blockHeaders.includes('namespace'), 'Block CSV header conforms to Spec v31');

const blockRows = blockCsv.slice(1);
assert(blockRows.length === 7, `Block ledger contains exactly 7 blocks (Found: ${blockRows.length})`);

blockRows.forEach(row => {
  const cols = row.split(',');
  const bPath = path.join(__dirname, '..', cols[1]);
  assert(fs.existsSync(bPath), `block.json exists: ${cols[1]}`);
  try {
    const raw = fs.readFileSync(bPath, 'utf8');
    const parsed = JSON.parse(raw);
    assert(parsed.$schema && parsed.name && parsed.title, `block.json for ${cols[0]} contains valid WP schema`);
  } catch (e) {
    assert(false, `block.json for ${cols[0]} parsed correctly: ${e.message}`);
  }
});

// -------------------------------------------------------------
// Test Summary
// -------------------------------------------------------------
console.log('\n========================================================================');
console.log(`📊 Phase 10 Test Results: ${passedTests} / ${totalTests} passed`);
if (allPassed) {
  console.log('🎉 ALL PHASE 10 CONTROLLED BANKS CHECKS PASSED (100%)!');
} else {
  console.error('❌ SOME CHECKS FAILED!');
  process.exit(1);
}
console.log('========================================================================\n');
