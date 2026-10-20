import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const themeDir = path.resolve('wordpress-theme');
const addonsDir = path.resolve('elementor-addon-suite');
const companionDir = path.resolve('sedrazavi-companion');
const outputThemeZip = path.resolve('sedrazavi-theme.zip');
const outputAddonsZip = path.resolve('sedrazavi-addons.zip');
const outputCompanionZip = path.resolve('sedrazavi-companion.zip');
const outputCompleteZip = path.resolve('sedrazavi-complete-suite.zip');
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
    } else if (fileOrDirName === pattern || relPath === pattern || relPath.startsWith(pattern + path.sep)) {
      return true;
    }
  }
  return false;
}

async function addDirectoryToZip(zip, currentDir, rootDir, prefix = '', patterns = []) {
  if (!fs.existsSync(currentDir)) return;
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const filePath = path.join(currentDir, file);
    const relPath = path.relative(rootDir, filePath);

    if (shouldIgnore(file, relPath, patterns)) {
      continue;
    }

    const zipPath = prefix ? path.join(prefix, relPath) : relPath;
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await addDirectoryToZip(zip, filePath, rootDir, prefix, patterns);
    } else {
      const content = fs.readFileSync(filePath);
      zip.file(zipPath, content);
    }
  }
}

async function packageTheme() {
  console.log('Packaging WordPress theme from:', themeDir);
  const patterns = loadDistignore(themeDir);
  const zip = new JSZip();
  // Standard WordPress package structure: single root folder named sedrazavi-theme
  await addDirectoryToZip(zip, themeDir, themeDir, 'sedrazavi-theme', patterns);

  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  fs.writeFileSync(outputThemeZip, buffer);
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'sedrazavi-theme.zip'), buffer);
  }
  const sizeMb = (buffer.length / (1024 * 1024)).toFixed(2);
  console.log(`Successfully generated ${outputThemeZip} (${sizeMb} MB)`);
  return buffer;
}

async function packageAddons() {
  console.log('Packaging WordPress addons plugin from:', addonsDir);
  const patterns = loadDistignore(addonsDir);
  const zip = new JSZip();
  // Standard WordPress plugin package structure: single root folder named sedrazavi-addons
  await addDirectoryToZip(zip, addonsDir, addonsDir, 'sedrazavi-addons', patterns);

  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  fs.writeFileSync(outputAddonsZip, buffer);
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'sedrazavi-addons.zip'), buffer);
  }
  const sizeMb = (buffer.length / (1024 * 1024)).toFixed(2);
  console.log(`Successfully generated ${outputAddonsZip} (${sizeMb} MB)`);
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

  fs.writeFileSync(outputCompanionZip, buffer);
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'sedrazavi-companion.zip'), buffer);
  }
  const sizeMb = (buffer.length / (1024 * 1024)).toFixed(2);
  console.log(`Successfully generated ${outputCompanionZip} (${sizeMb} MB)`);
  return buffer;
}

async function packageChildThemes() {
  const childThemesDir = path.join(themeDir, 'child-themes');
  if (!fs.existsSync(childThemesDir)) return {};

  const childEntries = fs.readdirSync(childThemesDir);
  const childBuffers = {};

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

    const outPath = path.resolve(`${childZipSlug}.zip`);
    fs.writeFileSync(outPath, buffer);
    if (fs.existsSync(publicDir)) {
      fs.writeFileSync(path.join(publicDir, `${childZipSlug}.zip`), buffer);
    }
    const sizeKb = (buffer.length / 1024).toFixed(1);
    console.log(`Successfully generated ${childZipSlug}.zip (${sizeKb} KB)`);
    childBuffers[entry] = { slug: childZipSlug, buffer };
  }

  return childBuffers;
}

async function packageCompleteSuite(themeBuffer, addonsBuffer, companionBuffer, childBuffers = {}) {
  console.log('Packaging complete suite zip...');
  const zip = new JSZip();

  zip.file('1-پوسته-قالب-sedrazavi-theme.zip', themeBuffer);
  if (companionBuffer) {
    zip.file('2-افزونه-همراه-sedrazavi-companion.zip', companionBuffer);
  }
  zip.file('3-افزونه-المنتور-sedrazavi-addons.zip', addonsBuffer);

  // Add individual child themes
  const childFolder = zip.folder('4-چایلدتم‌های-تخصصی-اصناف');
  for (const [name, data] of Object.entries(childBuffers)) {
    childFolder.file(`${data.slug}.zip`, data.buffer);
  }

  const guide = `================================================================================
پکیج جامع سیستم عامل وردپرس SedRazavi OS v6.0 - راهنمای نصب استاندارد
================================================================================

مرحله اول: نصب پوسته اصلی (Parent Theme)
----------------------------------------
۱. در پیشخوان وردپرس به مسیر «نمایش > پوسته‌ها > افزودن پوسته تازه > بارگذاری پوسته» بروید.
۲. فایل «1-پوسته-قالب-sedrazavi-theme.zip» را انتخاب و روی «نصب» کلیک فرمایید.
۳. پس از پایان نصب، روی «فعال‌سازی» کلیک کنید.

مرحله دوم: نصب افزونه همراه اصناف (Companion Plugin)
----------------------------------------
۱. در پیشخوان به مسیر «افزونه‌ها > افزودن > بارگذاری افزونه» بروید.
۲. فایل «2-افزونه-همراه-sedrazavi-companion.zip» را انتخاب و فعال فرمایید (شامل ماژول درگاه شتاب، اسپات‌پلیر، سابسکریپشن VIP و نصاب دمو).

مرحله سوم: نصب ویجت‌های المنتور (Elementor Addon Suite)
----------------------------------------
۱. فایل «3-افزونه-المنتور-sedrazavi-addons.zip» را از بخش افزونه‌ها نصب و فعال نمایید.

مرحله چهارم (اختیاری): فعال‌سازی چایلدتم متناسب با صنف شما
----------------------------------------
از پوشه «4-چایلدتم‌های-تخصصی-اصناف»، چایلدتم مورد نظر را انتخاب و در مسیر «نمایش > پوسته‌ها» نصب کنید:
- sedrazavi-child-agency-designer.zip (مخصوص آژانس دیجیتال و طراحان)
- sedrazavi-child-legal-firm.zip (مخصوص دفاتر وکالت و حقوقی)
- sedrazavi-child-corporate-pro.zip (مخصوص شرکت‌های تجاری و سازمانی)
- sedrazavi-child-store-modern.zip (مخصوص فروشگاه‌های آنلاین ووکامرس)
- sedrazavi-child-clinic-medical.zip (مخصوص کلینیک‌های پزشکی و سلامت)
- sedrazavi-child-education-lms.zip (مخصوص آکادمی و دوره‌های آنلاین)

سازگاری و نیازمندی‌ها:
- وردپرس نسخه ۵.۸ تا ۶.۷+
- نسخه PHP: 7.4 تا 8.3+
- سازگار با المنتور و ویرایشگر بلاک گوتنبرگ
================================================================================`;

  zip.file('README-راهنمای-نصب.txt', guide);

  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  fs.writeFileSync(outputCompleteZip, buffer);
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'sedrazavi-complete-suite.zip'), buffer);
  }
  const sizeMb = (buffer.length / (1024 * 1024)).toFixed(2);
  console.log(`Successfully generated ${outputCompleteZip} (${sizeMb} MB)`);
}

async function main() {
  const themeBuf = await packageTheme();
  const addonsBuf = await packageAddons();
  const companionBuf = await packageCompanion();
  const childBufs = await packageChildThemes();
  await packageCompleteSuite(themeBuf, addonsBuf, companionBuf, childBufs);
}

main().catch(console.error);
