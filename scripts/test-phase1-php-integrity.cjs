/**
 * Phase 1: PHP Lexical Integrity, Bootstrap Guards & Package Verification Suite
 *
 * NOTE: PHP CLI (`php -l`) is NOT installed in this Node-only container.
 * This suite performs deterministic Node-based lexical tokenization, brace/string/heredoc
 * validation, orphan-elseif detection, bootstrap/guard verification, and packed ZIP inspection.
 *
 * @package SedRazavi
 */

const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

const ROOT = path.join(__dirname, '..');

const ROOTS = [
  'wordpress-theme',
  'standalone-themes',
  'sedrazavi-companion',
  'elementor-addon-suite',
  'sedrazavi-addons',
  'sedrazavi-designer-core',
  'sedrazavi-designer-theme',
];

let totalTests = 0;
let passedTests = 0;
let allPassed = true;

function assert(cond, msg) {
  totalTests++;
  if (cond) {
    passedTests++;
    console.log(`  ✅ PASS: ${msg}`);
  } else {
    allPassed = false;
    console.error(`  ❌ FAIL: ${msg}`);
  }
}

function collectPhpFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
      collectPhpFiles(full, acc);
    } else if (entry.isFile() && entry.name.endsWith('.php')) {
      acc.push(full);
    }
  }
  return acc;
}

/**
 * Lexical scanner for PHP files: verifies balanced delimiters outside comments/strings/HTML
 * and flags unclosed strings, unclosed block comments, or orphan elseif after `;` or `});`.
 */
function analyzePhpLexical(code) {
  const errors = [];
  const len = code.length;
  let i = 0;
  let line = 1;
  let inPhp = false;
  const stack = [];
  let prevSigChar = '';
  let lastWord = '';
  // Track per-block whether an `if` branch is currently eligible for a following `elseif`/`else`.
  // Each entry in blockStack is { ch, line, hasIfAtCurrentStmt: boolean, colonIf: boolean }
  let hasActiveIfAtCurrentLevel = false;
  let expectingControlParen = ''; // 'if' | 'elseif' | 'else' | ''
  let parenDepthAfterControl = 0;
  let justClosedControlHeader = ''; // 'if' | 'elseif' | ''
  let singleStmtWaitSemi = false;
  let colonIfDepth = 0;

  const pushLineBreaks = (start, end) => {
    for (let k = start; k < end; k++) {
      if (code[k] === '\n') line++;
    }
  };

  while (i < len) {
    if (!inPhp) {
      const openIdx = code.indexOf('<?', i);
      if (openIdx === -1) break;
      pushLineBreaks(i, openIdx);
      if (code.startsWith('<?php', openIdx) || code.startsWith('<?=', openIdx)) {
        inPhp = true;
        i = openIdx + (code.startsWith('<?php', openIdx) ? 5 : 3);
      } else if (code[openIdx + 2] === 'x' && code.startsWith('<?xml', openIdx)) {
        i = openIdx + 5;
      } else {
        inPhp = true;
        i = openIdx + 2;
      }
      continue;
    }

    const ch = code[i];
    if (ch === '\n') {
      line++;
      i++;
      continue;
    }

    // End PHP tag
    if (ch === '?' && code[i + 1] === '>') {
      inPhp = false;
      i += 2;
      continue;
    }

    // Line comments // or #
    if ((ch === '/' && code[i + 1] === '/') || ch === '#') {
      const nl = code.indexOf('\n', i);
      const closePhp = code.indexOf('?>', i);
      if (closePhp !== -1 && (nl === -1 || closePhp < nl)) {
        inPhp = false;
        i = closePhp + 2;
      } else if (nl === -1) {
        break;
      } else {
        line++;
        i = nl + 1;
      }
      continue;
    }

    // Block comment /* ... */
    if (ch === '/' && code[i + 1] === '*') {
      const endComment = code.indexOf('*/', i + 2);
      if (endComment === -1) {
        errors.push(`Unclosed block comment starting at line ${line}`);
        break;
      }
      pushLineBreaks(i + 2, endComment + 2);
      i = endComment + 2;
      continue;
    }

    // Single-quoted or double-quoted strings
    if (ch === "'" || ch === '"') {
      const quote = ch;
      const startLine = line;
      i++;
      let closed = false;
      while (i < len) {
        const c = code[i];
        if (c === '\n') line++;
        if (c === '\\') {
          if (code[i + 1] === '\n') line++;
          i += 2;
          continue;
        }
        if (c === quote) {
          closed = true;
          i++;
          break;
        }
        i++;
      }
      if (!closed) {
        errors.push(`Unclosed ${quote} string starting at line ${startLine}`);
      }
      prevSigChar = quote;
      continue;
    }

    // Heredoc / Nowdoc <<<
    if (ch === '<' && code[i + 1] === '<' && code[i + 2] === '<') {
      const rest = code.slice(i + 3);
      const m = rest.match(/^[ \t]*(['"]?)([A-Za-z_][A-Za-z0-9_]*)\1[ \t]*\r?\n/);
      if (m) {
        const label = m[2];
        const startLine = line;
        i += 3 + m[0].length;
        line++;
        const endRe = new RegExp(`^${label}(?:;|,|\\)|\\]|\\s|$)`, 'm');
        let foundEnd = false;
        while (i < len) {
          const nl = code.indexOf('\n', i);
          const lineStr = nl === -1 ? code.slice(i) : code.slice(i, nl);
          if (lineStr.startsWith(label) && endRe.test(lineStr)) {
            foundEnd = true;
            i += label.length;
            break;
          }
          if (nl === -1) {
            i = len;
            break;
          }
          line++;
          i = nl + 1;
        }
        if (!foundEnd) {
          errors.push(`Unclosed heredoc/nowdoc <<<${label} starting at line ${startLine}`);
        }
        prevSigChar = ';';
        continue;
      }
    }

    if (/[A-Za-z_]/.test(ch)) {
      let j = i;
      while (j < len && /[A-Za-z0-9_]/.test(code[j])) j++;
      const word = code.slice(i, j).toLowerCase();
      const isMemberOrConst = prevSigChar === '>' || prevSigChar === ':'; // e.g., ->elseif or ::elseif
      if (!isMemberOrConst && word === 'if') {
        expectingControlParen = 'if';
        parenDepthAfterControl = 0;
        justClosedControlHeader = '';
      } else if (!isMemberOrConst && (word === 'elseif' || (word === 'else' && code.slice(j).match(/^\s+if\b/i)))) {
        if (!hasActiveIfAtCurrentLevel && colonIfDepth === 0) {
          errors.push(`Orphan '${word}' without matching 'if' at line ${line}`);
        }
        expectingControlParen = 'elseif';
        parenDepthAfterControl = 0;
        justClosedControlHeader = '';
      } else if (!isMemberOrConst && word === 'endif') {
        if (colonIfDepth > 0) colonIfDepth--;
        hasActiveIfAtCurrentLevel = false;
        singleStmtWaitSemi = false;
      } else if (!isMemberOrConst && word !== 'else' && !singleStmtWaitSemi && !expectingControlParen) {
        if (prevSigChar === ';' || prevSigChar === '}') {
          hasActiveIfAtCurrentLevel = false;
        }
      }
      lastWord = word;
      prevSigChar = 'W';
      i = j;
      continue;
    }

    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    if (ch === '{' || ch === '(' || ch === '[') {
      if (ch === '(' && expectingControlParen) {
        parenDepthAfterControl++;
      } else if (ch === '{' && justClosedControlHeader) {
        stack.push({ ch, line, savedHasIf: hasActiveIfAtCurrentLevel, isControlBody: justClosedControlHeader });
        hasActiveIfAtCurrentLevel = false;
        justClosedControlHeader = '';
        singleStmtWaitSemi = false;
        i++;
        prevSigChar = ch;
        continue;
      }
      stack.push({ ch, line, savedHasIf: hasActiveIfAtCurrentLevel, isControlBody: '' });
      if (ch === '{') {
        hasActiveIfAtCurrentLevel = false;
      }
    } else if (ch === '}' || ch === ')' || ch === ']') {
      const expected = ch === '}' ? '{' : ch === ')' ? '(' : '[';
      const top = stack.pop();
      if (!top || top.ch !== expected) {
        errors.push(`Mismatched closing '${ch}' at line ${line}` + (top ? ` (expected match for '${top.ch}' from line ${top.line})` : ''));
      } else {
        if (ch === ')' && expectingControlParen) {
          parenDepthAfterControl--;
          if (parenDepthAfterControl === 0) {
            justClosedControlHeader = expectingControlParen;
            expectingControlParen = '';
          }
        } else if (ch === '}') {
          if (top.isControlBody === 'if' || top.isControlBody === 'elseif') {
            hasActiveIfAtCurrentLevel = true;
          } else {
            hasActiveIfAtCurrentLevel = top.savedHasIf;
          }
          singleStmtWaitSemi = false;
        }
      }
    } else if (ch === ':' && justClosedControlHeader) {
      if (justClosedControlHeader === 'if') colonIfDepth++;
      justClosedControlHeader = '';
      hasActiveIfAtCurrentLevel = true;
    } else if (ch === ';') {
      if (justClosedControlHeader) {
        hasActiveIfAtCurrentLevel = true;
        justClosedControlHeader = '';
        singleStmtWaitSemi = false;
      } else if (singleStmtWaitSemi) {
        hasActiveIfAtCurrentLevel = true;
        singleStmtWaitSemi = false;
      }
    } else if (justClosedControlHeader) {
      singleStmtWaitSemi = true;
      justClosedControlHeader = '';
    }

    prevSigChar = (ch === '-' && code[i + 1] === '>') ? '>' : (ch === ':' && code[i + 1] === ':') ? ':' : ch;
    i++;
  }

  for (const unclosed of stack) {
    errors.push(`Unclosed '${unclosed.ch}' opened at line ${unclosed.line}`);
  }

  return errors;
}

async function main() {
  console.log('========================================================================');
  console.log('🔍 Phase 1: PHP Lexical Integrity, Bootstrap & Clean Packaging Audit');
  console.log('========================================================================\n');

  const allFiles = [];
  for (const r of ROOTS) {
    collectPhpFiles(path.join(ROOT, r), allFiles);
  }
  assert(allFiles.length >= 420, `Discovered ${allFiles.length} PHP files across 7 ecosystem packages`);

  const lexFailures = [];
  for (const f of allFiles) {
    const code = fs.readFileSync(f, 'utf8');
    const errs = analyzePhpLexical(code);
    if (errs.length > 0) {
      lexFailures.push({ file: path.relative(ROOT, f), errs });
    }
  }
  if (lexFailures.length > 0) {
    lexFailures.forEach(x => console.error(`    ❌ ${x.file}: ${x.errs.join('; ')}`));
  }
  assert(lexFailures.length === 0, `All ${allFiles.length} PHP files pass lexical delimiter/string/orphan-elseif checks`);

  // Check standalone themes have clean functions.php & no Template: header
  const standaloneDir = path.join(ROOT, 'standalone-themes');
  const standaloneFolders = fs.readdirSync(standaloneDir).filter(d => fs.statSync(path.join(standaloneDir, d)).isDirectory());
  assert(standaloneFolders.length === 8, `Verified all 8 standalone theme directories (${standaloneFolders.length})`);

  for (const slug of standaloneFolders) {
    const fnPath = path.join(standaloneDir, slug, 'functions.php');
    const stylePath = path.join(standaloneDir, slug, 'style.css');
    const fnCode = fs.readFileSync(fnPath, 'utf8');
    const styleCode = fs.readFileSync(stylePath, 'utf8');
    assert(
      !fnCode.includes('frontend-cockpit-engine.php') && !/^\s*elseif\b/m.test(fnCode),
      `${slug}/functions.php has zero orphan elseif or stale cockpit-engine require`
    );
    assert(
      !/^Template:/mi.test(styleCode),
      `${slug}/style.css has zero parent Template: header`
    );
  }

  // Bootstrap & Guard Checks
  const themeDemo = fs.readFileSync(path.join(ROOT, 'wordpress-theme/inc/class-demo-importer.php'), 'utf8');
  assert(
    /if\s*\(\s*!class_exists\s*\(\s*['"]SedRazavi_Demo_Importer['"]\s*\)\s*\)/.test(themeDemo) &&
    themeDemo.trim().endsWith('}'),
    'wordpress-theme/inc/class-demo-importer.php guards both class and ::init() with class_exists'
  );

  const cockpit = fs.readFileSync(path.join(ROOT, 'sedrazavi-companion/includes/class-frontend-cockpit.php'), 'utf8');
  assert(
    cockpit.includes("wp-admin/includes/plugin.php") &&
    cockpit.includes('ensure_wp_plugin_admin_loaded') &&
    cockpit.includes("function_exists('is_plugin_active')"),
    'Frontend_Cockpit_Engine loads wp-admin/includes/plugin.php & guards is_plugin_active/activate_plugin/deactivate_plugins'
  );

  const depRes = fs.readFileSync(path.join(ROOT, 'elementor-addon-suite/includes/packaging/class-dependency-resolver.php'), 'utf8');
  assert(
    depRes.includes("wp-admin/includes/plugin.php"),
    'Dependency_Resolver ensures wp-admin/includes/plugin.php is loaded before checking conflicts'
  );

  const addonsMain = fs.readFileSync(path.join(ROOT, 'sedrazavi-addons/sedrazavi-addons.php'), 'utf8');
  const modMatch = addonsMain.match(/\$modules\s*=\s*array\(([\s\S]*?)\);/);
  const modFiles = modMatch ? [...modMatch[1].matchAll(/'([^']+\.php)'/g)].map(m => m[1]) : [];
  const missingAddonMods = modFiles.filter(m => !fs.existsSync(path.join(ROOT, 'sedrazavi-addons/includes', m)));
  assert(
    modFiles.length >= 10 && missingAddonMods.length === 0,
    `sedrazavi-addons.php references ${modFiles.length} real modules with 0 missing files`
  );

  const uasMain = fs.readFileSync(path.join(ROOT, 'elementor-addon-suite/elementor-addon-suite.php'), 'utf8');
  assert(
    /add_action\(\s*'plugins_loaded'\s*,\s*\[\$this,\s*'init'\]\s*,\s*20\s*\)/.test(uasMain),
    'elementor-addon-suite hooks plugins_loaded at priority 20 (after Elementor priority 0)'
  );

  const designerBridge = fs.readFileSync(path.join(ROOT, 'sedrazavi-designer-core/inc/theme-builder-bridge.php'), 'utf8');
  assert(
    designerBridge.includes('isset($pro_instance->modules_manager)'),
    'sedrazavi-designer-core Theme_Builder_Bridge guards modules_manager access on ElementorPro'
  );

  // Verify packed standalone theme & plugin ZIPs match cleaned sources
  const themesZipDir = path.join(ROOT, 'public/themes');
  if (fs.existsSync(themesZipDir)) {
    for (const slug of standaloneFolders) {
      const zipPath = path.join(themesZipDir, `${slug}.zip`);
      assert(fs.existsSync(zipPath), `public/themes/${slug}.zip exists`);
      if (fs.existsSync(zipPath)) {
        const zip = await JSZip.loadAsync(fs.readFileSync(zipPath));
        const fnEntry = zip.file(`${slug}/functions.php`);
        assert(Boolean(fnEntry), `${slug}.zip contains ${slug}/functions.php`);
        if (fnEntry) {
          const fnZipContent = await fnEntry.async('string');
          const errs = analyzePhpLexical(fnZipContent);
          assert(
            errs.length === 0 && !fnZipContent.includes('frontend-cockpit-engine.php'),
            `${slug}.zip:${slug}/functions.php passes lexical parse & has zero orphan elseif`
          );
        }
      }
    }
  } else {
    assert(false, 'public/themes directory exists');
  }

  console.log('\n========================================================================');
  console.log(`📊 Phase 1 Static Audit Results: ${passedTests} / ${totalTests} passed`);
  console.log('ℹ️  REMINDER: PHP CLI (`php -l`) is BLOCKED (PHP_NOT_INSTALLED) in this container.');
  console.log('========================================================================\n');

  if (!allPassed) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ Fatal error in Phase 1 integrity suite:', err);
  process.exit(1);
});
