const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

function addDirectoryToZip(zip, folderPath, rootFolderName = '', excludePatterns = []) {
  if (!fs.existsSync(folderPath)) return;
  const items = fs.readdirSync(folderPath);
  for (const item of items) {
    if (item === '.git' || item === 'node_modules' || item.endsWith('.DS_Store') || item.endsWith('.map')) continue;
    if (excludePatterns.some(pat => item === pat || item.startsWith(pat))) continue;
    const fullPath = path.join(folderPath, item);
    const stat = fs.statSync(fullPath);
    const zipPath = rootFolderName ? `${rootFolderName}/${item}` : item;
    if (stat.isDirectory()) {
      addDirectoryToZip(zip, fullPath, zipPath, excludePatterns);
    } else {
      const content = fs.readFileSync(fullPath);
      zip.file(zipPath, content);
    }
  }
}

async function buildZips() {
  const rootDir = path.join(__dirname, '..');
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
  fs.writeFileSync(path.join(rootDir, 'elementor-addon-suite.zip'), elementorBuffer);
  console.log(`✅ elementor-addon-suite.zip created: ${(elementorBuffer.length / 1024 / 1024).toFixed(2)} MB`);

  // 2. SedRazavi Addons (Specialized Vertical Plugin for Legal, Booking & Intake)
  console.log('Packaging SedRazavi Addons Vertical Plugin ZIP...');
  const sedrazaviAddonsZip = new JSZip();
  addDirectoryToZip(sedrazaviAddonsZip, path.join(__dirname, '../sedrazavi-addons'), 'sedrazavi-addons');
  const addonsBuffer = await sedrazaviAddonsZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(path.join(publicDir, 'sedrazavi-addons.zip'), addonsBuffer);
  fs.writeFileSync(path.join(rootDir, 'sedrazavi-addons.zip'), addonsBuffer);
  console.log(`✅ sedrazavi-addons.zip created: ${(addonsBuffer.length / 1024 / 1024).toFixed(2)} MB`);

  // 3. SedRazavi Companion (Shared Utility & One-Click Demo Importer Plugin)
  console.log('Packaging SedRazavi Companion Plugin ZIP...');
  const companionZip = new JSZip();
  addDirectoryToZip(companionZip, path.join(__dirname, '../sedrazavi-companion'), 'sedrazavi-companion');
  const companionBuffer = await companionZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(path.join(publicDir, 'sedrazavi-companion.zip'), companionBuffer);
  fs.writeFileSync(path.join(rootDir, 'sedrazavi-companion.zip'), companionBuffer);
  console.log(`✅ sedrazavi-companion.zip created: ${(companionBuffer.length / 1024 / 1024).toFixed(2)} MB`);

  // 4. WordPress Master Theme (Excluding child-themes and staging files to maintain sleek ~2MB size)
  console.log('Packaging WordPress Master Theme ZIP (Excluding child-themes)...');
  const themeZip = new JSZip();
  addDirectoryToZip(themeZip, path.join(__dirname, '../wordpress-theme'), 'sedrazavi-theme', ['child-themes', 'aistudio']);
  const themeBuffer = await themeZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(path.join(publicDir, 'sedrazavi-theme.zip'), themeBuffer);
  fs.writeFileSync(path.join(publicDir, 'sedrazavi-law-firm-wordpress-theme.zip'), themeBuffer);
  fs.writeFileSync(path.join(rootDir, 'sedrazavi-theme.zip'), themeBuffer);
  fs.writeFileSync(path.join(rootDir, 'sedrazavi-law-firm-wordpress-theme.zip'), themeBuffer);
  console.log(`✅ sedrazavi-theme.zip created: ${(themeBuffer.length / 1024 / 1024).toFixed(2)} MB`);

  // 4c. Dedicated Standalone WordPress Designer Core Plugin (sedrazavi-designer-core)
  console.log('Packaging Dedicated Standalone Designer Core Plugin ZIP...');
  const designerCoreZip = new JSZip();
  addDirectoryToZip(designerCoreZip, path.join(__dirname, '../sedrazavi-designer-core'), 'sedrazavi-designer-core');
  const designerCoreBuffer = await designerCoreZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(path.join(publicDir, 'sedrazavi-designer-core.zip'), designerCoreBuffer);
  fs.writeFileSync(path.join(rootDir, 'sedrazavi-designer-core.zip'), designerCoreBuffer);
  console.log(`✅ sedrazavi-designer-core.zip created: ${(designerCoreBuffer.length / 1024 / 1024).toFixed(2)} MB`);

  // Ensure bundled core is embedded directly inside sedrazavi-designer-theme/inc/plugins/
  const themePluginsDir = path.join(__dirname, '../sedrazavi-designer-theme/inc/plugins');
  if (!fs.existsSync(themePluginsDir)) {
    fs.mkdirSync(themePluginsDir, { recursive: true });
  }
  fs.writeFileSync(path.join(themePluginsDir, 'sedrazavi-designer-core.zip'), designerCoreBuffer);
  console.log('✅ Bundled core plugin embedded in sedrazavi-designer-theme/inc/plugins/');

  // 4b. Dedicated Standalone WordPress Designer Landing Theme (sedrazavi-designer-theme)
  console.log('Packaging Dedicated Standalone Designer Theme ZIP...');
  const designerThemeZip = new JSZip();
  addDirectoryToZip(designerThemeZip, path.join(__dirname, '../sedrazavi-designer-theme'), 'sedrazavi-designer-theme');
  const designerThemeBuffer = await designerThemeZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(path.join(publicDir, 'sedrazavi-designer-theme.zip'), designerThemeBuffer);
  fs.writeFileSync(path.join(rootDir, 'sedrazavi-designer-theme.zip'), designerThemeBuffer);
  console.log(`✅ sedrazavi-designer-theme.zip created: ${(designerThemeBuffer.length / 1024 / 1024).toFixed(2)} MB`);

  // 4d. Dedicated Designer All-In-One Bundle (Theme + Plugin + Guide)
  console.log('Packaging Dedicated Designer Bundle ZIP...');
  const designerBundleZip = new JSZip();
  designerBundleZip.file('1-پوسته-مستقل-طراح-sedrazavi-designer-theme.zip', designerThemeBuffer);
  designerBundleZip.file('2-افزونه-هسته-طراح-sedrazavi-designer-core.zip', designerCoreBuffer);
  designerBundleZip.file('راهنمای_سریع_طراح_وردپرس_بدون_کدنویسی.txt', `========================================================================
⚡ راهنمای استقرار بسته اختصاصی و مستقل طراح وردپرس (No-Code Architect)
========================================================================
این بسته کاملاً مستقل، بدون نیاز به چایلد تم، ۱۰۰٪ بدون ری‌اکت در فرانت و منطبق بر استانداردهای المنتور پرو است:

۱. نصب پوسته اختصاصی:
   - از پیشخوان وردپرس > نمایش > پوسته‌ها > افزودن پوسته تازه > بارگذاری، فایل «1-پوسته-مستقل-طراح-sedrazavi-designer-theme.zip» را نصب و فعال کنید.

۲. نصب افزونه هسته اختصاصی:
   - از پیشخوان وردپرس > افزونه‌ها > افزودن افزونه تازه > بارگذاری، فایل «2-افزونه-هسته-طراح-sedrazavi-designer-core.zip» را نصب و فعال کنید.

۳. ویژگی‌های خودکار پس از فعال‌سازی:
   - ایجاد خودکار ۱۲ برگه (خانه، درباره، خدمات، نمونه‌کار، تماس، رهگیری، پورتال و...)
   - ست شدن خودکار برگه خانه و وبلاگ در تنظیمات خواندن
   - ایجاد منوی اصلی و اتصال به سربرگ نئونی
   - فعال‌سازی جدول دیتابیس اختصاصی رهگیری سفارش‌ها (SR-XXXXX)
   - فعال‌سازی ۴ ویجت اختصاصی در پنل المنتور (ساعت سه‌گانه، بازی دایناسور نئونی، موزیک پلیر سایبرپانک، کره ساعت جهانی)
========================================================================
`);
  const designerBundleBuffer = await designerBundleZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(path.join(publicDir, 'sedrazavi-designer-bundle.zip'), designerBundleBuffer);
  fs.writeFileSync(path.join(rootDir, 'sedrazavi-designer-bundle.zip'), designerBundleBuffer);
  console.log(`✅ sedrazavi-designer-bundle.zip created: ${(designerBundleBuffer.length / 1024 / 1024).toFixed(2)} MB`);


  // 5. Individual Autonomous Standalone Themes (Exclusive Single Source of Truth: standalone-themes/)
  const standaloneThemesDir = path.join(__dirname, '../standalone-themes');
  const standaloneZipBuffers = {};
  const standaloneOutDir = path.join(publicDir, 'themes');
  const legacyOutDir = path.join(publicDir, 'child-themes');
  if (!fs.existsSync(standaloneOutDir)) fs.mkdirSync(standaloneOutDir, { recursive: true });
  if (!fs.existsSync(legacyOutDir)) fs.mkdirSync(legacyOutDir, { recursive: true });

  // 5a. Canonical Standalone Themes
  if (!fs.existsSync(standaloneThemesDir)) {
    throw new Error('Missing canonical standalone-themes/ directory. Run scripts/convert-to-standalone-themes.cjs first.');
  }
  const sFolders = fs.readdirSync(standaloneThemesDir);
  for (const folder of sFolders) {
    const folderPath = path.join(standaloneThemesDir, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      const czip = new JSZip();
      addDirectoryToZip(czip, folderPath, folder);
      const cbuf = await czip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
      fs.writeFileSync(path.join(standaloneOutDir, `${folder}.zip`), cbuf);
      standaloneZipBuffers[folder] = cbuf;
      console.log(`   📦 Standalone theme ${folder}.zip created: ${(cbuf.length / 1024).toFixed(1)} KB`);
    }
  }

  // 5b. Compatibility Slug Aliases (Strictly copied from canonical standalone buffers)
  const slugAliases = {
    'agency-designer': 'sedrazavi-agency-theme',
    'clinic-medical': 'sedrazavi-clinic-theme',
    'corporate-pro': 'sedrazavi-corporate-theme',
    'education-lms': 'sedrazavi-education-theme',
    'legal-firm': 'sedrazavi-legal-theme',
    'news-editorial': 'sedrazavi-news-theme',
    'sedrazavi-lawyer-child': 'sedrazavi-lawyer-theme',
    'store-modern': 'sedrazavi-store-theme',
  };

  for (const [slug, canon] of Object.entries(slugAliases)) {
    if (!standaloneZipBuffers[canon]) {
      throw new Error(`Missing canonical standalone buffer for ${canon}`);
    }
    fs.writeFileSync(path.join(standaloneOutDir, `${slug}.zip`), standaloneZipBuffers[canon]);
    fs.writeFileSync(path.join(legacyOutDir, `${slug}.zip`), standaloneZipBuffers[canon]);
    standaloneZipBuffers[slug] = standaloneZipBuffers[canon];
  }

  // 6. Complete All-in-One Ecosystem Suite ZIP
  console.log('Packaging Complete Ecosystem Suite ZIP...');
  const suiteZip = new JSZip();
  suiteZip.file('1-افزونه-المنتور-elementor-addon-suite.zip', elementorBuffer);
  suiteZip.file('2-افزونه-تخصصی-حقوقی-sedrazavi-addons.zip', addonsBuffer);
  suiteZip.file('3-افزونه-هسته-و-ایمپورت-sedrazavi-companion.zip', companionBuffer);
  suiteZip.file('4-پوسته-اصلی-sedrazavi-theme.zip', themeBuffer);

  const standaloneThemesFolderInSuite = suiteZip.folder('پوسته‌های-مستقل-Standalone-Themes');
  for (const [name, buf] of Object.entries(standaloneZipBuffers)) {
    standaloneThemesFolderInSuite.file(`${name}.zip`, buf);
  }

  suiteZip.file('راهنمای_سریع_نصب_و_همگام_سازی.txt', `========================================================================
🚀 راهنمای نصب مستقل و تفکیک‌شده اکوسیستم وردپرس و المنتور SedRazavi
========================================================================

این پکیج بر اساس نیاز شما به صورت ۱۰۰٪ ماژولار و مستقل تفکیک شده است:

۱. افزونه مستقل ویجت‌های المنتور (elementor-addon-suite.zip):
   - شامل ۳۱ ویجت پیشرفته المنتور و المنتور پرو
   - بانک تمپلیت‌های آماده JSON با قابلیت درون‌ریزی تک‌کلیکی و اسکن خودکار وابستگی‌ها
   - پنل تنظیمات پیشخوان وردپرس اختصاصی با استایل دارک و بهینه‌سازی سرعت
   - قابل نصب روی هر قالب دلخواه وردپرس (بدون وابستگی به قالب خاص)

۲. افزونه تخصصی حقوقی و پرونده‌ها (sedrazavi-addons.zip):
   - پست‌تایپ‌های تخصصی و سیستم مدیریت پرونده موکلین
   - سامانه نوبت‌دهی مشاوره و رزرواسیون وقت
   - داوری آنلاین و استعلام رمز یکبار مصرف (OTP)

۳. افزونه دستیار و ایمپورتر جامع (sedrazavi-companion.zip):
   - سیستم مدیریت توکن‌های طراحی (Design Tokens)
   - موتور پایش سلامت سیستم و ابزارهای توسعه‌دهنده

۴. پوسته اصلی مستقل (sedrazavi-theme.zip) به همراه ۸ پوسته کاملاً مستقل تخصصی (Standalone Parent Themes):
   - مناسب برای آژانس، کلینیک، حقوقی، فروشگاه، آموزشی، شرکتی، وکالت و مجله خبری (بدون هیچ وابستگی به پوسته والد)

------------------------------------------------------------------------
مراحل نصب در پیشخوان وردپرس:
۱. از منوی «افزونه‌ها > افزودن افزونه جدید > بارگذاری افزونه» هر کدام از افزونه‌های مورد نیاز را نصب و فعال فرمایید.
۲. در صورت تمایل به استفاده از پوسته، هر یک از پوسته‌های مستقل را مستقیماً از بخش «نمایش > پوسته‌ها» نصب و فعال کنید.
۳. در منوی پیشخوان یا صفحه /frontend-cockpit/ به ابزارهای مدیریت و سازنده کیت سایت دسترسی خواهید داشت.
========================================================================`);

  const suiteBuffer = await suiteZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(path.join(publicDir, 'sedrazavi-complete-ecosystem.zip'), suiteBuffer);
  fs.writeFileSync(path.join(publicDir, 'sedrazavi-complete-suite.zip'), suiteBuffer);
  console.log(`🎉 Complete Ecosystem Suite created: ${(suiteBuffer.length / 1024 / 1024).toFixed(2)} MB`);
}

buildZips().catch(console.error);
