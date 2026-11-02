const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

function addDirectoryToZip(zip, folderPath, rootFolderName = '') {
  if (!fs.existsSync(folderPath)) return;
  const items = fs.readdirSync(folderPath);
  for (const item of items) {
    if (item === '.git' || item === 'node_modules' || item.endsWith('.DS_Store')) continue;
    const fullPath = path.join(folderPath, item);
    const stat = fs.statSync(fullPath);
    const zipPath = rootFolderName ? `${rootFolderName}/${item}` : item;
    if (stat.isDirectory()) {
      addDirectoryToZip(zip, fullPath, zipPath);
    } else {
      const content = fs.readFileSync(fullPath);
      zip.file(zipPath, content);
    }
  }
}

async function buildZips() {
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Elementor Addon Suite (Standalone Elementor & Elementor Pro Widget & Template Kit)
  console.log('Packaging Elementor Addon Suite ZIP...');
  const elementorSuiteZip = new JSZip();
  addDirectoryToZip(elementorSuiteZip, path.join(__dirname, '../elementor-addon-suite'), 'elementor-addon-suite');
  const elementorBuffer = await elementorSuiteZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(path.join(publicDir, 'elementor-addon-suite.zip'), elementorBuffer);
  console.log(`✅ elementor-addon-suite.zip created: ${(elementorBuffer.length / 1024 / 1024).toFixed(2)} MB`);

  // 2. SedRazavi Addons (Specialized Vertical Plugin for Legal, Booking & Intake)
  console.log('Packaging SedRazavi Addons Vertical Plugin ZIP...');
  const sedrazaviAddonsZip = new JSZip();
  addDirectoryToZip(sedrazaviAddonsZip, path.join(__dirname, '../sedrazavi-addons'), 'sedrazavi-addons');
  const addonsBuffer = await sedrazaviAddonsZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(path.join(publicDir, 'sedrazavi-addons.zip'), addonsBuffer);
  console.log(`✅ sedrazavi-addons.zip created: ${(addonsBuffer.length / 1024 / 1024).toFixed(2)} MB`);

  // 3. SedRazavi Companion (Shared Utility & One-Click Demo Importer Plugin)
  console.log('Packaging SedRazavi Companion Plugin ZIP...');
  const companionZip = new JSZip();
  addDirectoryToZip(companionZip, path.join(__dirname, '../sedrazavi-companion'), 'sedrazavi-companion');
  const companionBuffer = await companionZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(path.join(publicDir, 'sedrazavi-companion.zip'), companionBuffer);
  console.log(`✅ sedrazavi-companion.zip created: ${(companionBuffer.length / 1024 / 1024).toFixed(2)} MB`);

  // 4. WordPress Master Theme
  console.log('Packaging WordPress Master Theme ZIP...');
  const themeZip = new JSZip();
  addDirectoryToZip(themeZip, path.join(__dirname, '../wordpress-theme'), 'sedrazavi-theme');
  const themeBuffer = await themeZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(path.join(publicDir, 'sedrazavi-theme.zip'), themeBuffer);
  fs.writeFileSync(path.join(publicDir, 'sedrazavi-law-firm-wordpress-theme.zip'), themeBuffer);
  console.log(`✅ sedrazavi-theme.zip created: ${(themeBuffer.length / 1024 / 1024).toFixed(2)} MB`);

  // 5. Individual Child Themes
  const childThemesDir = path.join(__dirname, '../wordpress-theme/child-themes');
  const childZipBuffers = {};
  if (fs.existsSync(childThemesDir)) {
    const childFolders = fs.readdirSync(childThemesDir);
    const childOutDir = path.join(publicDir, 'child-themes');
    if (!fs.existsSync(childOutDir)) fs.mkdirSync(childOutDir, { recursive: true });

    for (const folder of childFolders) {
      const folderPath = path.join(childThemesDir, folder);
      if (fs.statSync(folderPath).isDirectory()) {
        const czip = new JSZip();
        addDirectoryToZip(czip, folderPath, folder);
        const cbuf = await czip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
        fs.writeFileSync(path.join(childOutDir, `${folder}.zip`), cbuf);
        childZipBuffers[folder] = cbuf;
        console.log(`   📦 Child theme ${folder}.zip created: ${(cbuf.length / 1024).toFixed(1)} KB`);
      }
    }
  }

  // 6. Complete All-in-One Ecosystem Suite ZIP
  console.log('Packaging Complete Ecosystem Suite ZIP...');
  const suiteZip = new JSZip();
  suiteZip.file('1-افزونه-المنتور-elementor-addon-suite.zip', elementorBuffer);
  suiteZip.file('2-افزونه-تخصصی-حقوقی-sedrazavi-addons.zip', addonsBuffer);
  suiteZip.file('3-افزونه-هسته-و-ایمپورت-sedrazavi-companion.zip', companionBuffer);
  suiteZip.file('4-پوسته-اصلی-sedrazavi-theme.zip', themeBuffer);

  const childThemesFolderInSuite = suiteZip.folder('پوسته‌های-فرزند-Child-Themes');
  for (const [name, buf] of Object.entries(childZipBuffers)) {
    childThemesFolderInSuite.file(`${name}.zip`, buf);
  }

  suiteZip.file('راهنمای_سریع_نصب_و_همگام_سازی.txt', `========================================================================
🚀 راهنمای نصب مستقل و تفکیک‌شده اکوسیستم وردپرس و المنتور SedRazavi
========================================================================

این پکیج بر اساس نیاز شما به صورت ۱۰۰٪ ماژولار و مستقل تفکیک شده است:

۱. افزونه مستقل ویجت‌های المنتور (elementor-addon-suite.zip):
   - شامل ۲۴+ ویجت پیشرفته المنتور و المنتور پرو
   - بانک تمپلیت‌های آماده JSON با قابلیت درون‌ریزی تک‌کلیکی (Landing, Hero, Bento, Timeline, VIP Pricing, Popups)
   - پنل تنظیمات پیشخوان وردپرس اختصاصی با استایل دارک و بهینه‌سازی سرعت
   - قابل نصب روی هر قالب دلخواه وردپرس (بدون وابستگی به قالب خاص)

۲. افزونه تخصصی حقوقی و پرونده‌ها (sedrazavi-addons.zip):
   - پست‌تایپ‌های تخصصی و سیستم مدیریت پرونده موکلین
   - سامانه نوبت‌دهی مشاوره و رزرواسیون وقت
   - داوری آنلاین و استعلام رمز یکبار مصرف (OTP)

۳. افزونه دستیار و ایمپورتر جامع (sedrazavi-companion.zip):
   - سیستم مدیریت توکن‌های طراحی (Design Tokens)
   - موتور پایش سلامت سیستم و ابزارهای توسعه‌دهنده

۴. پوسته اصلی مستقل (sedrazavi-theme.zip) به همراه ۸ پوسته فرزند:
   - مناسب برای آژانس، کلینیک، حقوقی، فروشگاه، آموزشی و مجله خبری

------------------------------------------------------------------------
مراحل نصب در پیشخوان وردپرس:
۱. از منوی «افزونه‌ها > افزودن افزونه جدید > بارگذاری افزونه» هر کدام از افزونه‌های مورد نیاز را نصب و فعال فرمایید.
۲. در صورت تمایل به استفاده از پوسته، فایل «4-پوسته-اصلی-sedrazavi-theme.zip» را از بخش «نمایش > پوسته‌ها» نصب کنید.
۳. در منوی پیشخوان به بخش «Universal Suite» بروید تا ویجت‌ها را مدیریت یا تمپلیت‌ها را به صورت خودکار ایمپورت نمایید.
========================================================================
`);

  const suiteBuffer = await suiteZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(path.join(publicDir, 'sedrazavi-complete-ecosystem.zip'), suiteBuffer);
  fs.writeFileSync(path.join(publicDir, 'sedrazavi-complete-suite.zip'), suiteBuffer);
  console.log(`🎉 Complete Ecosystem Suite created: ${(suiteBuffer.length / 1024 / 1024).toFixed(2)} MB`);
}

buildZips().catch(console.error);
