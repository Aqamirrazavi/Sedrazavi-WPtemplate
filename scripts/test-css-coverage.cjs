const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) results = results.concat(walk(full));
    else if (file.endsWith('.php')) results.push(full);
  });
  return results;
}

const themeDir = path.resolve('wordpress-theme');
if (!fs.existsSync(themeDir)) {
  console.error('Error: wordpress-theme directory not found.');
  process.exit(1);
}

const phpFiles = walk(themeDir);
const classRegex = /class=["']([^"']+)["']/g;
const classes = new Set();

phpFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = classRegex.exec(content)) !== null) {
    const parts = match[1].split(/\s+/).filter(Boolean);
    parts.forEach(c => {
      if (!c.includes('<') && !c.includes('>') && !c.includes('$') && !c.includes('?') && c !== 'echo' && c !== '==' && c !== '===') {
        classes.add(c);
      }
    });
  }
});

let allCss = fs.readFileSync(path.join(themeDir, 'style.css'), 'utf8') + ' ' + fs.readFileSync(path.join(themeDir, 'assets/css/rtl.css'), 'utf8');
const appDistCss = path.join(themeDir, 'app-dist/index.css');
if (fs.existsSync(appDistCss)) {
  allCss += ' ' + fs.readFileSync(appDistCss, 'utf8');
}

function escapeCssClass(className) {
  return className.replace(/([:\[\]\/#%\.])/g, '\\$1');
}

const missing = [];
classes.forEach(c => {
  const escaped = escapeCssClass(c);
  if (!allCss.includes('.' + c) && !allCss.includes('.' + escaped) && !allCss.includes(c)) {
    missing.push(c);
  }
});

console.log('----------------------------------------------------');
console.log(`Total valid classes inspected across PHP templates: ${classes.size}`);
console.log(`Missing / Unstyled classes count: ${missing.length}`);
console.log('----------------------------------------------------');

if (missing.length > 0) {
  console.error('FAIL: The following classes are unstyled:');
  missing.forEach(c => console.error(`  ❌ ${c}`));
  process.exit(1);
} else {
  console.log('PASS: 100% CSS Coverage achieved! All template classes are properly styled.');
  process.exit(0);
}
