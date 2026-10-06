const fs = require('fs');
const path = require('path');

const incDir = path.resolve('wordpress-theme/inc');
const functionsPhpPath = path.resolve('wordpress-theme/functions.php');

if (!fs.existsSync(incDir) || !fs.existsSync(functionsPhpPath)) {
  console.error('Error: wordpress-theme/inc or wordpress-theme/functions.php not found.');
  process.exit(1);
}

const functionsContent = fs.readFileSync(functionsPhpPath, 'utf8');

// Get all .php files in wordpress-theme/inc/
const incFiles = fs.readdirSync(incDir)
  .filter(file => file.endsWith('.php'));

console.log(`Found ${incFiles.length} PHP files in wordpress-theme/inc/.`);

// Check which files are referenced in functions.php
const unincludedFiles = [];
const includedFiles = [];

for (const file of incFiles) {
  const relPath = `inc/${file}`;
  // Check if relPath or file is present in functions.php require/include or $sedrazavi_essential_includes
  if (functionsContent.includes(relPath) || functionsContent.includes(`'${file}'`) || functionsContent.includes(`"${file}"`)) {
    includedFiles.push(file);
  } else {
    unincludedFiles.push(file);
  }
}

console.log('----------------------------------------------------');
console.log(`Included files count: ${includedFiles.length}`);
console.log(`Unincluded files count: ${unincludedFiles.length}`);
console.log('----------------------------------------------------');

if (unincludedFiles.length > 0) {
  console.error('FAIL: The following files in wordpress-theme/inc/ are NOT loaded in functions.php:');
  unincludedFiles.forEach(f => console.error(`  ❌ inc/${f}`));
  console.error('\nVerification failed: Every file in inc/ must either be explicitly included or removed.');
  process.exit(1);
} else {
  console.log('PASS: All files in wordpress-theme/inc/ are properly included in functions.php!');
  process.exit(0);
}
