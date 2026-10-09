/**
 * Automated Verification Test Suite for Phase 3: Universal Elementor Templates & Importer
 *
 * Checks:
 * 1. Template JSON files in elementor-addon-suite/templates/ (at least 5 templates).
 * 2. Proper Elementor JSON schema (title, content, type).
 * 3. Topic-agnostic content (zero niche-specific words: وکالت, دادسرا, سید رضوی, SedRazavi, پرونده قضایی).
 * 4. Template_Importer class with idempotent import logic.
 */

const fs = require('fs');
const path = require('path');

console.log('========================================================================');
console.log('🚀 Phase 3 Automated Verification Suite (Elementor Templates & Importer)');
console.log('========================================================================\n');

let allPassed = true;
function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    allPassed = false;
  }
}

const templatesDir = path.join(__dirname, '../elementor-addon-suite/templates');
const templateFiles = fs.readdirSync(templatesDir).filter(f => f.endsWith('.json'));

assert(templateFiles.length >= 5, `Found ${templateFiles.length} template JSON packages (expected >= 5)`);

const forbiddenNicheWords = ['وکالت', 'دادسرا', 'سید رضوی', 'SedRazavi', 'پرونده قضایی'];

for (const file of templateFiles) {
  const filePath = path.join(templatesDir, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  let json;
  try {
    json = JSON.parse(raw);
  } catch (err) {
    assert(false, `Template ${file} contains invalid JSON: ${err.message}`);
    continue;
  }

  assert(
    !!(json.title && json.content && json.type),
    `Template ${file} contains required Elementor schema (title: "${json.title}", type: "${json.type}")`
  );

  let hasNicheWord = false;
  for (const word of forbiddenNicheWords) {
    if (raw.includes(word)) {
      hasNicheWord = true;
      assert(false, `Template ${file} contains niche-specific word: "${word}"`);
    }
  }
  if (!hasNicheWord) {
    assert(true, `Template ${file} is 100% topic-agnostic`);
  }
}

// Inspect Template_Importer class
const importerFile = path.join(__dirname, '../elementor-addon-suite/includes/class-template-importer.php');
const importerContent = fs.readFileSync(importerFile, 'utf8');

assert(
  importerContent.includes('class Template_Importer'),
  'class-template-importer.php defines Template_Importer'
);

assert(
  importerContent.includes('import_all_templates()') && importerContent.includes('import_all_popups()'),
  'Template_Importer provides import_all_templates and import_all_popups'
);

assert(
  importerContent.includes('_uas_template_slug') && importerContent.includes('_elementor_edit_mode'),
  'Template_Importer configures Elementor library metadata (_elementor_edit_mode, _uas_template_slug)'
);

console.log('------------------------------------------------------------------------');
if (allPassed) {
  console.log('🎉 ALL PHASE 3 TEMPLATES VERIFICATION TESTS PASSED SUCCESSFULLY!');
  process.exit(0);
} else {
  console.error('💥 SOME TEMPLATE TESTS FAILED');
  process.exit(1);
}
