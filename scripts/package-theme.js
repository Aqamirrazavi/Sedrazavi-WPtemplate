import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const themeDir = path.resolve('wordpress-theme');
const addonsDir = path.resolve('sedrazavi-addons');
const outputThemeZip = path.resolve('sedrazavi-theme.zip');
const outputAddonsZip = path.resolve('sedrazavi-addons.zip');
const outputCompleteZip = path.resolve('sedrazavi-complete-suite.zip');
const publicDir = path.resolve('public');

async function addDirectoryToZip(zip, currentDir, rootDir, prefix = '') {
  if (!fs.existsSync(currentDir)) return;
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const filePath = path.join(currentDir, file);
    const relPath = path.relative(rootDir, filePath);
    const zipPath = prefix ? path.join(prefix, relPath) : relPath;
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await addDirectoryToZip(zip, filePath, rootDir, prefix);
    } else {
      const content = fs.readFileSync(filePath);
      zip.file(zipPath, content);
    }
  }
}

async function packageTheme() {
  console.log('Packaging WordPress theme from:', themeDir);
  const zip = new JSZip();
  // Standard WordPress package structure: single root folder named sedrazavi-theme
  await addDirectoryToZip(zip, themeDir, themeDir, 'sedrazavi-theme');

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
  const zip = new JSZip();
  // Standard WordPress plugin package structure: single root folder named sedrazavi-addons
  await addDirectoryToZip(zip, addonsDir, addonsDir, 'sedrazavi-addons');

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

async function packageCompleteSuite(themeBuffer, addonsBuffer) {
  console.log('Packaging complete suite zip...');
  const zip = new JSZip();

  zip.file('1-پوسته-قالب-sedrazavi-theme.zip', themeBuffer);
  zip.file('2-افزونه-مکمل-sedrazavi-addons.zip', addonsBuffer);

  const guide = `================================================================================
دفتر وکالت و داوری تخصصی دکتر سیده مریم رضوی - راهنمای نصب استاندارد پوسته و افزونه
================================================================================

مرحله اول: نصب پوسته (Theme)
----------------------------------------
۱. در پیشخوان وردپرس به مسیر «نمایش > پوسته‌ها > افزودن پوسته تازه > بارگذاری پوسته» بروید.
۲. فایل «1-پوسته-قالب-sedrazavi-theme.zip» را انتخاب و روی «نصب» کلیک فرمایید.
۳. پس از پایان نصب، روی «فعال‌سازی» کلیک کنید.

مرحله دوم: نصب افزونه مکمل (Plugin)
----------------------------------------
۱. در پیشخوان وردپرس به مسیر «افزونه‌ها > افزودن افزونه تازه > بارگذاری افزونه» بروید.
۲. فایل «2-افزونه-مکمل-sedrazavi-addons.zip» را انتخاب و روی «نصب» کلیک نمایید.
۳. پس از پایان نصب، روی «فعال‌کردن افزونه» کلیک کنید.

سازگاری و نیازمندی‌ها:
- وردپرس نسخه ۵.۸ تا ۶.۷+
- نسخه PHP: 7.4 یا 8.0 یا 8.1 یا 8.2 یا 8.3+
- سازگار با المنتور (Elementor Free / Pro)
- تست شده و بدون کوچکترین تداخل، بدون خطای صفحه سفید (WSOD)
================================================================================`;

  zip.file('راهنمای_مهم_نصب_بدون_خطا.txt', guide);

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
  await packageCompleteSuite(themeBuf, addonsBuf);
}

main().catch((err) => {
  console.error('Error generating theme zip:', err);
  process.exit(1);
});

