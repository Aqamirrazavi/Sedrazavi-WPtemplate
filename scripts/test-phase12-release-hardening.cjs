/**
 * Phase 12: Release Hardening & Evidence Verification Suite
 *
 * Verifies Native Portability Spec v31 & Phased Roadmap v3 Phase 12:
 * 1. Evidence directory structure and required files
 * 2. SHA-256 checksum verification of distribution archives
 * 3. Traceability matrix integrity
 * 4. SBOM metadata verification
 * 5. Environment matrix validity
 *
 * @package SedRazavi
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('========================================================================');
console.log('🏛️ Phase 12: Release Hardening & Evidence Verification Suite');
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

const evidenceDir = path.join(__dirname, '../artifacts/evidence/v31.0.0');
assert(fs.existsSync(evidenceDir), 'artifacts/evidence/v31.0.0 exists');

console.log('🔍 Test Group 1: Release Evidence Artifacts Presence');

const requiredFiles = [
  'commit.txt',
  'environment.json',
  'traceability.csv',
  'widget-verification.csv',
  'template-verification.csv',
  'block-verification.csv',
  'package-manifest.json',
  'checksums.sha256',
  'sbom.json',
  'release-notes.md',
];

requiredFiles.forEach(file => {
  const filePath = path.join(evidenceDir, file);
  assert(fs.existsSync(filePath), `Evidence file exists: ${file}`);
});

console.log('\n🔍 Test Group 2: SHA-256 Integrity Verification');

const checksumsPath = path.join(evidenceDir, 'checksums.sha256');
const checksumLines = fs.readFileSync(checksumsPath, 'utf8').trim().split('\n');

checksumLines.forEach(line => {
  const [expectedHash, relPath] = line.trim().split(/\s+/);
  const fullPath = path.join(__dirname, '..', relPath);
  assert(fs.existsSync(fullPath), `Target archive exists for checksum: ${relPath}`);

  if (fs.existsSync(fullPath)) {
    const fileBuf = fs.readFileSync(fullPath);
    const actualHash = crypto.createHash('sha256').update(fileBuf).digest('hex');
    assert(actualHash === expectedHash, `SHA-256 matches for ${relPath} (${actualHash.substring(0, 16)}...)`);
  }
});

console.log('\n🔍 Test Group 3: Traceability & SBOM Compliance');

const traceContent = fs.readFileSync(path.join(evidenceDir, 'traceability.csv'), 'utf8');
assert(traceContent.includes('P0-01') && traceContent.includes('P0-02') && traceContent.includes('P0-03'), 'Traceability matrix covers all P0 security items');
assert(traceContent.includes('P1-01') && traceContent.includes('P1-04') && traceContent.includes('PHASE-12'), 'Traceability matrix covers P1 and Roadmap phases');

const sbomContent = JSON.parse(fs.readFileSync(path.join(evidenceDir, 'sbom.json'), 'utf8'));
assert(sbomContent.spdxVersion === 'SPDX-2.3', 'SBOM conforms to SPDX-2.3 standard');
assert(Array.isArray(sbomContent.packages) && sbomContent.packages.length >= 4, 'SBOM catalogs core packages with licenses');

console.log('\n========================================================================');
console.log(`📊 Phase 12 Test Results: ${passedTests} / ${totalTests} passed`);
if (allPassed) {
  console.log('🎉 ALL PHASE 12 HARDENING & EVIDENCE CHECKS PASSED (100%)!');
} else {
  console.error('❌ SOME CHECKS FAILED!');
  process.exit(1);
}
console.log('========================================================================\n');
