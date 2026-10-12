/**
 * SedRazavi Duplicator & Theme Packaging Engine
 * 
 * Packages:
 * 1. sedrazavi-theme.zip (Clean WordPress Theme for WP Admin installer)
 * 2. archive.zip (Full Duplicator Archive)
 * 3. sedrazavi-duplicator-package.zip (Full Duplicator Bundle: installer.php + database.sql + archive.zip)
 * 
 * @package SedRazavi
 */

const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

console.log('========================================================================');
console.log('📦 Starting SedRazavi Duplicator & Theme Zip Packaging');
console.log('========================================================================\n');

const themeDir = path.join(__dirname, '../wordpress-theme');
const duplicatorDir = path.join(themeDir, 'duplicator');
const publicDownloads = path.join(__dirname, '../public/downloads');

if (!fs.existsSync(publicDownloads)) {
  fs.mkdirSync(publicDownloads, { recursive: true });
}

// Helper: Recursively add folder to JSZip
function addFolderToZip(zip, folderPath, rootPath = folderPath, ignoreList = []) {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const fullPath = path.join(folderPath, file);
    const relPath = path.relative(rootPath, fullPath).replace(/\\/g, '/');

    // Skip ignored files/folders
    if (ignoreList.some(item => relPath === item || relPath.startsWith(item + '/'))) {
      continue;
    }

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      addFolderToZip(zip, fullPath, rootPath, ignoreList);
    } else {
      zip.file(relPath, fs.readFileSync(fullPath));
    }
  }
}

async function buildPackages() {
  try {
    // -------------------------------------------------------------
    // 1. Build Standalone Theme Zip (`sedrazavi-theme.zip`)
    // -------------------------------------------------------------
    console.log('⚙️ Step 1: Packaging Standalone WordPress Theme...');
    const themeZip = new JSZip();
    const themeFolder = themeZip.folder('sedrazavi');

    addFolderToZip(themeFolder, themeDir, themeDir, [
      'duplicator',
      '.git',
      '.github',
      'node_modules',
      'tests'
    ]);

    const themeBuffer = await themeZip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });

    const themeZipPath = path.join(publicDownloads, 'sedrazavi-theme.zip');
    fs.writeFileSync(themeZipPath, themeBuffer);
    console.log(`  ✅ Theme Zip created: ${themeZipPath} (${(themeBuffer.length / 1024).toFixed(1)} KB)`);

    // -------------------------------------------------------------
    // 2. Build Duplicator Archive (`archive.zip`)
    // -------------------------------------------------------------
    console.log('\n⚙️ Step 2: Packaging Duplicator Archive (archive.zip)...');
    const archiveZip = new JSZip();
    addFolderToZip(archiveZip, themeDir, themeDir, ['duplicator/archive.zip']);

    const archiveBuffer = await archiveZip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 5 }
    });

    const archivePath = path.join(duplicatorDir, 'archive.zip');
    fs.writeFileSync(archivePath, archiveBuffer);
    console.log(`  ✅ Duplicator archive.zip created: ${archivePath} (${(archiveBuffer.length / 1024).toFixed(1)} KB)`);

    // -------------------------------------------------------------
    // 3. Build Full Duplicator Bundle (`sedrazavi-duplicator-package.zip`)
    // -------------------------------------------------------------
    console.log('\n⚙️ Step 3: Packaging Complete Duplicator Bundle...');
    const duplicatorBundle = new JSZip();
    
    // Add installer.php
    duplicatorBundle.file('installer.php', fs.readFileSync(path.join(duplicatorDir, 'installer.php')));
    
    // Add database.sql
    duplicatorBundle.file('database.sql', fs.readFileSync(path.join(duplicatorDir, 'database.sql')));
    
    // Add portable-runner.php
    duplicatorBundle.file('portable-runner.php', fs.readFileSync(path.join(duplicatorDir, 'portable-runner.php')));
    
    // Add archive.zip
    duplicatorBundle.file('archive.zip', archiveBuffer);

    // Add README-INSTALL.txt
    const readmeContent = `========================================================================
بسته داپلیکیتور قالب و دموهای SedRazavi Pro (نوین‌وردپرس / پی‌کد)
========================================================================

راهنمای سریع نصب با داپلیکیتور:
۱. فایل‌های موجود در این پکیج را در پوشه اصلی هاست خود (public_html یا htdocs در زمپ) آپلود و اکسترکت کنید:
   - installer.php
   - archive.zip
   - database.sql

۲. یک پایگاه داده MySQL جدید در cPanel یا phpMyAdmin ایجاد کنید.

۳. آدرس نصاب را در مرورگر خود باز کنید:
   http://your-domain.com/installer.php
   یا در لوکال‌هاست:
   http://localhost/installer.php

۴. اطلاعات دیتابیس را وارد کرده و صنف مدنظر خود (از بین ۶ صنف پیش‌فرض) را انتخاب کنید.

۵. روی دکمه «شروع خودکار درون‌ریزی و نصب» کلیک کنید. در کمتر از ۱ دقیقه سایت آماده خواهد بود!

اطلاعات ورود پیش‌فرض مدیر:
نام کاربری: admin
رمز عبور: Admin@SedRazavi2026

توسعه‌یافته مطابق استانداردهای روز ۲۰۲۶.
`;
    duplicatorBundle.file('README-INSTALL.txt', readmeContent);

    const duplicatorBuffer = await duplicatorBundle.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });

    const duplicatorZipPath = path.join(publicDownloads, 'sedrazavi-duplicator-package.zip');
    fs.writeFileSync(duplicatorZipPath, duplicatorBuffer);
    console.log(`  ✅ Full Duplicator Bundle created: ${duplicatorZipPath} (${(duplicatorBuffer.length / 1024).toFixed(1)} KB)`);

    // If dist/downloads exists, copy there too
    const distDownloads = path.join(__dirname, '../dist/downloads');
    if (fs.existsSync(path.dirname(distDownloads))) {
      if (!fs.existsSync(distDownloads)) fs.mkdirSync(distDownloads, { recursive: true });
      fs.copyFileSync(themeZipPath, path.join(distDownloads, 'sedrazavi-theme.zip'));
      fs.copyFileSync(duplicatorZipPath, path.join(distDownloads, 'sedrazavi-duplicator-package.zip'));
    }

    console.log('\n🎉 ALL DUPLICATOR & THEME PACKAGES READY FOR PRODUCTION DEPLOYMENT!\n');
  } catch (err) {
    console.error('❌ Error packaging duplicator bundle:', err);
    process.exit(1);
  }
}

buildPackages();
