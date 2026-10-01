const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.php')) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = walk('src').concat(walk('wordpress-theme')).concat(walk('sedrazavi-addons'));
const restEndpoints = new Set();
const bundleJs = fs.readFileSync('wordpress-theme/assets/index.js', 'utf8');

// Find in compiled bundle specifically
const bundleMatches = bundleJs.match(/wp-json\/[a-zA-Z0-9_\/-]+/g) || [];
bundleMatches.forEach(m => restEndpoints.add(m));

// Additional routes found in src
const srcFiles = walk('src');
srcFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const m = content.match(/wp-json\/([a-zA-Z0-9_\/-]+)/g) || [];
  m.forEach(e => restEndpoints.add(e));
  const m2 = content.match(/sedrazavi\/v1\/([a-zA-Z0-9_\/-]+)/g) || [];
  m2.forEach(e => restEndpoints.add('wp-json/' + e));
});

console.log('--- ALL JS/SRC WP-JSON ENDPOINTS ---');
const sortedEndpoints = Array.from(restEndpoints).sort();
console.log(JSON.stringify(sortedEndpoints, null, 2));
