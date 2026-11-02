import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const rootDir = path.resolve('.');
const themeDir = path.resolve('wordpress-theme');
const elementorSuiteDir = path.resolve('elementor-addon-suite');
const legalAddonsDir = path.resolve('sedrazavi-addons');
const companionDir = path.resolve('sedrazavi-companion');
const publicDir = path.resolve('public');

function loadDistignore(dir) {
  const distignorePath = path.join(dir, '.distignore');
  const ignorePatterns = [
    '.git',
    '.github',
    '.gitignore',
    '.gitattributes',
    '.distignore',
    '.env',
    '.env.*',
    'node_modules',
    'bun.lock',
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'vite.config.ts',
    '*.zip',
    '*.tar',
    '*.gz',
    '*.log',
    '*.tmp',
    '*.map',
    '.DS_Store',
    'Thumbs.db',
  ];

  if (fs.existsSync(distignorePath)) {
    const lines = fs.readFileSync(distignorePath, 'utf8')
      .split('\n')
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('#'));
    lines.forEach(l => ignorePatterns.push(l));
  }

  return Array.from(new Set(ignorePatterns));
}

function shouldIgnore(fileOrDirName, relPath, patterns) {
  for (const pattern of patterns) {
    if (pattern.startsWith('*.')) {
      const ext = pattern.slice(1);
      if (fileOrDirName.endsWith(ext)) return true;
    } else if (
      fileOrDirName === pattern ||
      relPath === pattern ||
      relPath.startsWith(pattern + path.sep) ||
      relPath.startsWith(pattern + '/')
    ) {
      return true;
    }
  }
  return false;
}

async function addDirectoryToZip(zip, currentDir, rootDirForRel, prefix = '', patterns = []) {
  if (!fs.existsSync(currentDir)) return;
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const filePath = path.join(currentDir, file);
    const relPath = path.relative(rootDirForRel, filePath).replace(/\\/g, '/');

    if (shouldIgnore(file, relPath, patterns)) {
      continue;
    }

    const zipPath = prefix ? `${prefix}/${relPath}` : relPath;
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await addDirectoryToZip(zip, filePath, rootDirForRel, prefix, patterns);
    } else {
      const content = fs.readFileSync(filePath);
      zip.file(zipPath, content);
    }
  }
}

async function packageTheme() {
  console.log('Packaging WordPress master theme from:', themeDir);
  const patterns = loadDistignore(themeDir);
  patterns.push('child-themes', 'app-dist/aistudio');
  const zip = new JSZip();
  await addDirectoryToZip(zip, themeDir, themeDir, 'sedrazavi-theme', patterns);

  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  const outRoot = path.join(rootDir, 'sedrazavi-theme.zip');
  fs.writeFileSync(outRoot, buffer);
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'sedrazavi-theme.zip'), buffer);
    fs.writeFileSync(path.join(publicDir, 'sedrazavi-law-firm-wordpress-theme.zip'), buffer);
  }
  const sizeMb = (buffer.length / (1024 * 1024)).toFixed(2);
  console.log(`✅ Successfully generated sedrazavi-theme.zip (${sizeMb} MB)`);
  return buffer;
}

async function packageElementorSuite() {
  if (!fs.existsSync(elementorSuiteDir)) return null;
  console.log('Packaging Elementor Addon Suite from:', elementorSuiteDir);
  const patterns = loadDistignore(elementorSuiteDir);
  const zip = new JSZip();
  await addDirectoryToZip(zip, elementorSuiteDir, elementorSuiteDir, 'elementor-addon-suite', patterns);

  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  fs.writeFileSync(path.join(rootDir, 'elementor-addon-suite.zip'), buffer);
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'elementor-addon-suite.zip'), buffer);
  }
  const sizeMb = (buffer.length / (1024 * 1024)).toFixed(2);
  console.log(`✅ Successfully generated elementor-addon-suite.zip (${sizeMb} MB)`);
  return buffer;
}

async function packageLegalAddons() {
  if (!fs.existsSync(legalAddonsDir)) return null;
  console.log('Packaging SedRazavi Addons (Legal Vertical) from:', legalAddonsDir);
  const patterns = loadDistignore(legalAddonsDir);
  const zip = new JSZip();
  await addDirectoryToZip(zip, legalAddonsDir, legalAddonsDir, 'sedrazavi-addons', patterns);

  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  fs.writeFileSync(path.join(rootDir, 'sedrazavi-addons.zip'), buffer);
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'sedrazavi-addons.zip'), buffer);
  }
  const sizeMb = (buffer.length / (1024 * 1024)).toFixed(2);
  console.log(`✅ Successfully generated sedrazavi-addons.zip (${sizeMb} MB)`);
  return buffer;
}

async function packageCompanion() {
  if (!fs.existsSync(companionDir)) return null;
  console.log('Packaging WordPress companion plugin from:', companionDir);
  const patterns = loadDistignore(companionDir);
  const zip = new JSZip();
  await addDirectoryToZip(zip, companionDir, companionDir, 'sedrazavi-companion', patterns);

  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  fs.writeFileSync(path.join(rootDir, 'sedrazavi-companion.zip'), buffer);
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'sedrazavi-companion.zip'), buffer);
  }
  const sizeMb = (buffer.length / (1024 * 1024)).toFixed(2);
  console.log(`✅ Successfully generated sedrazavi-companion.zip (${sizeMb} MB)`);
  return buffer;
}

async function packageChildThemes() {
  const childThemesDir = path.join(themeDir, 'child-themes');
  if (!fs.existsSync(childThemesDir)) return {};

  const childEntries = fs.readdirSync(childThemesDir);
  const childBuffers = {};
  const childOutDir = path.join(publicDir, 'child-themes');
  if (fs.existsSync(publicDir) && !fs.existsSync(childOutDir)) {
    fs.mkdirSync(childOutDir, { recursive: true });
  }

  for (const entry of childEntries) {
    const entryPath = path.join(childThemesDir, entry);
    if (!fs.statSync(entryPath).isDirectory()) continue;

    const childZipSlug = `sedrazavi-child-${entry}`;
    const zip = new JSZip();
    const patterns = loadDistignore(entryPath);
    await addDirectoryToZip(zip, entryPath, entryPath, entry, patterns);

    const buffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 },
    });

    fs.writeFileSync(path.join(rootDir, `${childZipSlug}.zip`), buffer);
    if (fs.existsSync(publicDir)) {
      fs.writeFileSync(path.join(publicDir, `${childZipSlug}.zip`), buffer);
      fs.writeFileSync(path.join(childOutDir, `${entry}.zip`), buffer);
    }
    const sizeKb = (buffer.length / 1024).toFixed(1);
    console.log(`   📦 Child theme ${childZipSlug}.zip created: (${sizeKb} KB)`);
    childBuffers[entry] = { slug: childZipSlug, buffer };
  }

  return childBuffers;
}

async function packageCompleteSuite(themeBuffer, elementorBuffer, legalAddonsBuffer, companionBuffer, childBuffers = {}) {
  console.log('Packaging complete suite zip...');
  const zip = new JSZip();

  zip.file('1-پوسته-قالب-sedrazavi-theme.zip', themeBuffer);
  if (elementorBuffer) {
    zip.file('2-افزونه-المنتور-elementor-addon-suite.zip', elementorBuffer);
  }
  if (legalAddonsBuffer) {
    zip.file('3-افزونه-تخصصی-حقوقی-sedrazavi-addons.zip', legalAddonsBuffer);
  }
  if (companionBuffer) {
    zip.file('4-افزونه-همراه-sedrazavi-companion.zip', companionBuffer);
  }

  // Add individual child themes
  const childFolder = zip.folder('5-چایلدتم‌های-تخصصی-اصناف');
  for (const [name, data] of Object.entries(childBuffers)) {
    childFolder.file(`${data.slug}.zip`, data.buffer);
  }

  const guide = `================================================================================
🚀 پکیج جامع سیستم عامل وردپرس و المنتور SedRazavi OS v6.0 - راهنمای نصب استاندارد
================================================================================

این بسته شامل معماری کاملاً ماژولار و تفکیک‌شده است:

۱. پوسته اصلی (Parent Theme - sedrazavi-theme.zip):
   - فوق‌العاده سبک (~2MB) و فاقد فایل‌های زائد
   - معماری مستقل و بی‌نیاز از هرگونه فریم‌ورک غیربومی

۲. افزونه مستقل ویجت‌ها و تمپلیت‌های المنتور (elementor-addon-suite.zip):
   - ۲۴+ ویجت پیشرفته شامل FOMO، اسلایدر قبل و بعد، سوییچر قیمت‌گذاری و...
   - ۲۳ تمپلیت آماده المنتور در دسته‌های Theme Builder، صفحات کامل و سکشن‌های لندینگ
   - پنل اختصاصی درون‌ریزی تک‌کلیکی با استایل دارک مدرن

۳. افزونه تخصصی حقوقی (sedrazavi-addons.zip):
   - پست‌تایپ‌های تخصصی پرونده‌های محرمانه، داوری و رزرو وقت

۴. افزونه همراه و موتور ابزارها (sedrazavi-companion.zip):
   - ابزارهای ارتقا، اسنپ‌شات و توکن‌های طراحی

۵. چایلدتم‌های اصناف تخصصی:
   - قابل انتخاب و نصب متناسب با نیاز کسب‌وکار
================================================================================`;

  zip.file('README-راهنمای-نصب.txt', guide);

  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  fs.writeFileSync(path.join(rootDir, 'sedrazavi-complete-suite.zip'), buffer);
  fs.writeFileSync(path.join(rootDir, 'sedrazavi-complete-ecosystem.zip'), buffer);
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'sedrazavi-complete-suite.zip'), buffer);
    fs.writeFileSync(path.join(publicDir, 'sedrazavi-complete-ecosystem.zip'), buffer);
  }
  const sizeMb = (buffer.length / (1024 * 1024)).toFixed(2);
  console.log(`🎉 Successfully generated complete suite (${sizeMb} MB)`);
}

async function main() {
  const themeBuf = await packageTheme();
  const elementorBuf = await packageElementorSuite();
  const legalAddonsBuf = await packageLegalAddons();
  const companionBuf = await packageCompanion();
  const childBufs = await packageChildThemes();
  await packageCompleteSuite(themeBuf, elementorBuf, legalAddonsBuf, companionBuf, childBufs);
}

main().catch(console.error);
