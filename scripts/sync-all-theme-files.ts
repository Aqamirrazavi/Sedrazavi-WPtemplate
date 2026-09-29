import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { WORDPRESS_THEME_FILES } from '../src/data/wordPressThemeFiles';
import { WORDPRESS_PLUGIN_FILES } from '../src/data/wordPressPluginFiles';

const rootDir = path.resolve('.');
const themeDir = path.resolve('wordpress-theme');
const pluginDir = path.resolve('sedrazavi-addons');
const publicDir = path.resolve('public');

async function syncTheme() {
  console.log(`Writing ${WORDPRESS_THEME_FILES.length} theme files to ${themeDir}...`);
  if (!fs.existsSync(themeDir)) {
    fs.mkdirSync(themeDir, { recursive: true });
  }

  for (const file of WORDPRESS_THEME_FILES) {
    if (file.path === 'screenshot.png') continue;
    const destPath = path.join(themeDir, file.path);
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.writeFileSync(destPath, file.code, 'utf8');
  }

  // Ensure screenshot.png is copied
  if (fs.existsSync(path.join(rootDir, 'screenshot.png'))) {
    fs.copyFileSync(
      path.join(rootDir, 'screenshot.png'),
      path.join(themeDir, 'screenshot.png')
    );
  }

  // Ensure dist is populated
  const themeDistDir = path.join(themeDir, 'dist');
  if (!fs.existsSync(themeDistDir)) fs.mkdirSync(themeDistDir, { recursive: true });

  const appDistDir = path.join(publicDir, 'app-dist');
  if (fs.existsSync(path.join(appDistDir, 'index.css'))) {
    fs.copyFileSync(path.join(appDistDir, 'index.css'), path.join(themeDistDir, 'index.css'));
  }
  if (fs.existsSync(path.join(appDistDir, 'index.js'))) {
    fs.copyFileSync(path.join(appDistDir, 'index.js'), path.join(themeDistDir, 'index.js'));
  }
}

async function syncPlugin() {
  console.log(`Writing ${WORDPRESS_PLUGIN_FILES.length} plugin files to ${pluginDir}...`);
  if (!fs.existsSync(pluginDir)) {
    fs.mkdirSync(pluginDir, { recursive: true });
  }

  for (const file of WORDPRESS_PLUGIN_FILES) {
    const destPath = path.join(pluginDir, file.path);
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.writeFileSync(destPath, file.code, 'utf8');
  }

  // Ensure dist is populated
  const pluginDistDir = path.join(pluginDir, 'dist');
  if (!fs.existsSync(pluginDistDir)) fs.mkdirSync(pluginDistDir, { recursive: true });

  const appDistDir = path.join(publicDir, 'app-dist');
  if (fs.existsSync(path.join(appDistDir, 'index.css'))) {
    fs.copyFileSync(path.join(appDistDir, 'index.css'), path.join(pluginDistDir, 'index.css'));
  }
  if (fs.existsSync(path.join(appDistDir, 'index.js'))) {
    fs.copyFileSync(path.join(appDistDir, 'index.js'), path.join(pluginDistDir, 'index.js'));
  }
}

async function addDirectoryToZip(zip: JSZip, currentDir: string, rootDir: string) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const filePath = path.join(currentDir, file);
    const relPath = path.relative(rootDir, filePath);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await addDirectoryToZip(zip, filePath, rootDir);
    } else {
      const content = fs.readFileSync(filePath);
      zip.file(relPath, content);
    }
  }
}

async function buildZipPackages() {
  console.log('Generating ZIP packages...');

  // 1. Theme ZIP
  const themeZip = new JSZip();
  await addDirectoryToZip(themeZip, themeDir, themeDir);
  const themeBuffer = await themeZip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });
  fs.writeFileSync(path.join(rootDir, 'sedrazavi-theme.zip'), themeBuffer);
  fs.writeFileSync(path.join(publicDir, 'sedrazavi-theme.zip'), themeBuffer);
  console.log(`✓ sedrazavi-theme.zip (${(themeBuffer.length / (1024 * 1024)).toFixed(2)} MB)`);

  // 2. Addons Plugin ZIP
  const pluginZip = new JSZip();
  await addDirectoryToZip(pluginZip, pluginDir, pluginDir);
  const pluginBuffer = await pluginZip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });
  fs.writeFileSync(path.join(rootDir, 'sedrazavi-addons.zip'), pluginBuffer);
  fs.writeFileSync(path.join(publicDir, 'sedrazavi-addons.zip'), pluginBuffer);
  console.log(`✓ sedrazavi-addons.zip (${(pluginBuffer.length / (1024 * 1024)).toFixed(2)} MB)`);

  // 3. Complete Suite 2-in-1 ZIP
  const suiteZip = new JSZip();
  suiteZip.file('1-پوسته-قالب-sedrazavi-theme.zip', themeBuffer);
  suiteZip.file('2-افزونه-مکمل-sedrazavi-addons.zip', pluginBuffer);
  suiteZip.file(
    'راهنمای_مهم_نصب_بدون_خطا.txt',
    `================================================================================
دفتر وکالت و داوری تخصصی دکتر سیده مریم رضوی - راهنمای نصب و اتوماسیون ۱۰۰٪ خودکار
================================================================================

کاربر گرامی،
این بسته مجهز به «موتور اتوماسیون خودکار اجرای ری‌اکت در وردپرس (Zero-Config Automation)» است.
تمامی کدهای کامپایل‌شده جاوااسکریپت و استایل‌های Tailwind درون بسته‌ها قرار دارند و نیازی به هیچ‌گونه تبدیل دستی یا دستورات سرور ندارید.

مرحله اول: نصب پوسته (Theme)
----------------------------------------
۱. در پیشخوان وردپرس به مسیر «نمایش > پوسته‌ها > افزودن پوسته تازه > بارگذاری پوسته» بروید.
۲. فایل زیپ شماره ۱ یعنی «1-پوسته-قالب-sedrazavi-theme.zip» را انتخاب و دکمه «نصب» را بزنید.
۳. پس از پایان نصب، روی «فعال‌سازی» کلیک کنید.

مرحله دوم: نصب افزونه مکمل (Plugin)
----------------------------------------
۱. در پیشخوان وردپرس به مسیر «افزونه‌ها > افزودن افزونه تازه > بارگذاری افزونه» بروید.
۲. فایل زیپ شماره ۲ یعنی «2-افزونه-مکمل-sedrazavi-addons.zip» را انتخاب و دکمه «نصب» را بزنید.
۳. پس از پایان نصب، روی «فعال‌کردن افزونه» کلیک نمایید.

نکته مهم:
وردپرس اجازه نمی‌دهد پوسته و افزونه در یک فایل زیپ تودرتو آپلود شوند. به همین دلیل دو فایل
فوق به صورت کاملاً مجزا و استاندارد درون این پوشه قرار گرفته‌اند.
================================================================================`
  );
  if (fs.existsSync(path.join(rootDir, 'INSTALL.md'))) {
    suiteZip.file('INSTALL.md', fs.readFileSync(path.join(rootDir, 'INSTALL.md')));
  }

  const suiteBuffer = await suiteZip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });
  fs.writeFileSync(path.join(rootDir, 'sedrazavi-complete-suite.zip'), suiteBuffer);
  fs.writeFileSync(path.join(publicDir, 'sedrazavi-complete-suite.zip'), suiteBuffer);
  console.log(`✓ sedrazavi-complete-suite.zip (${(suiteBuffer.length / (1024 * 1024)).toFixed(2)} MB)`);
}

async function main() {
  await syncTheme();
  await syncPlugin();
  await buildZipPackages();
  console.log('All theme and plugin files synced and packaged successfully!');
}

main().catch((err) => {
  console.error('Error during theme sync:', err);
  process.exit(1);
});
