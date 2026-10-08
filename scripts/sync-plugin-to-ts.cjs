const fs = require('fs');
const path = require('path');

const sedrazaviAddonsDir = path.resolve('sedrazavi-addons');
const elementorSuiteDir = path.resolve('elementor-addon-suite');
const tsOutputFile = path.resolve('src/data/wordPressPluginFiles.ts');

function getCategory(filePath) {
  if (filePath.includes('widgets/')) return 'صفحه‌ساز و ویجت‌ها (Elementor Widgets)';
  if (filePath.includes('otp-auth') || filePath.includes('security')) return 'امنیت و احراز هویت (Security & Auth)';
  if (filePath.includes('templates/')) return 'صفحه‌ساز و ویجت‌ها (Elementor Widgets)';
  if (filePath.includes('includes/')) return 'ماژول‌های افزونه (Plugin Includes)';
  if (filePath.endsWith('.txt') || filePath.endsWith('.md') || filePath.includes('languages/')) return 'مستندات و زبان';
  return 'افزونه مکمل (Plugin Addons)';
}

function getDescription(filename, relPath) {
  const descriptions = {
    'sedrazavi-addons.php': 'فایل اصلی افزونه مکمل حقوقی با بارگذاری مقاوم، ثبت قلاب‌ها و تعریف ثابت‌ها.',
    'elementor-addon-suite.php': 'فایل اصلی افزونه جامع مستقل المنتور (UAS) با سازگاری جهانی با تمام پوسته‌ها.',
    'class-plugin.php': 'کلاس هسته راه‌اندازی و مدیریت رویدادهای المنتور و بارگذاری ابزارک‌ها.',
    'class-widget-base.php': 'کلاس پایه و انتزاعی ابزارک‌های المنتور با متدهای استایل‌دهی و کنترل‌ها.',
    'class-admin-settings.php': 'صفحه اختصاصی تنظیمات و فعال/غیرفعال‌سازی ابزارک‌های المنتور در پیشخوان.',
    'class-template-importer.php': 'موتور درون‌ریزی خودکار قالب‌ها و پاپ‌آپ‌های از پیش‌طراحی‌شده المنتور.',
    'logger.php': 'لاگر خودکار خطاها و استثنائات در پوشه امنیتی wp-content/uploads/sedrazavi-logs.',
    'post-types.php': 'ثبت ۵ پست‌تایپ اختصاصی: خدمات حقوقی، پرونده‌ها، نظرات موکلین، پیام‌ها و ویدیوها.',
    'booking-system.php': 'هندلر فرم‌های نوبت‌دهی، ذخیره‌سازی در دیتابیس و اعتبارسنجی سرور.',
    'case-tracking.php': 'سامانه جستجو و استعلام وضعیت پرونده‌ها بر اساس کدرهگیری و شماره پرونده.',
    'elementor-widgets.php': 'پل ارتباطی ابزارک‌های پوسته و افزونه با صفحه‌ساز المنتور.',
    'admin-settings.php': 'پنل تنظیمات و مدیریت عمومی افزونه در پیشخوان وردپرس.',
    'case-metaboxes-ui.php': 'متاباکس‌های پیشرفته مدیریت پرونده (خواهان، خوانده، روند دادرسی، شعبه دادگاه).',
    'shortcodes-engine.php': 'موتور رندر شورت‌کدهای تعاملی و ثبت در هسته وردپرس.',
    'otp-auth-integration.php': 'یکپارچه‌سازی رمز یکبار مصرف ایمیلی با احراز هویت استاندارد وردپرس.',
    'class-sedrazavi-odr-arbitration.php': 'کلاس داوری و حل اختلاف آنلاین و تبادل لوایح محرمانه.',
    'class-sedrazavi-legal-intelligence.php': 'کلاس هوش مصنوعی حقوقی و ممیزی شروط قراردادها.',
    'uninstall.php': 'اسکریپت پاک‌سازی کامل دیتابیس و تنظیمات در زمان حذف افزونه.',
    'readme.txt': 'مستندات استاندارد مخزن وردپرس و راهنمای نصب افزونه.',
  };

  if (descriptions[filename]) return descriptions[filename];
  if (filename.startsWith('class-widget-')) {
    return `ابزارک پیشرفته و اختصاصی المنتور: ${filename.replace('class-widget-', '').replace('.php', '')}`;
  }
  if (filename.startsWith('template-')) {
    return `قالب آماده و بخش از پیش طراحی‌شده المنتور (${filename})`;
  }
  if (filename.startsWith('popup-')) {
    return `پاپ‌آپ تعاملی حقوقی المنتور (${filename})`;
  }
  return `ماژول افزونه وردپرس: ${relPath}`;
}

function walk(dir, base, prefix = '') {
  let res = [];
  if (!fs.existsSync(dir)) return res;
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    const rel = path.relative(base, full);
    if (f.startsWith('.') || f === 'node_modules' || f.endsWith('.zip')) return;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      res = res.concat(walk(full, base, prefix));
    } else {
      res.push({
        fullPath: full,
        relPath: prefix ? `${prefix}/${rel}` : rel,
        filename: f,
      });
    }
  });
  return res;
}

const filesAddons = walk(sedrazaviAddonsDir, sedrazaviAddonsDir, 'sedrazavi-addons');
const filesSuite = walk(elementorSuiteDir, elementorSuiteDir, 'elementor-addon-suite');
const allPluginFiles = [...filesAddons, ...filesSuite].sort((a, b) => a.relPath.localeCompare(b.relPath));

console.log(`Processing ${allPluginFiles.length} plugin files across both suites...`);

const entries = allPluginFiles.map(fileObj => {
  const code = fs.readFileSync(fileObj.fullPath, 'utf8');
  const category = getCategory(fileObj.relPath);
  const description = getDescription(fileObj.filename, fileObj.relPath);

  return {
    path: fileObj.relPath,
    filename: fileObj.filename,
    category,
    description,
    code,
  };
});

const tsContent = `import { WordPressFile } from '../types/theme';

/**
 * Single Source of Truth WordPress Plugin Files
 * Auto-generated from /sedrazavi-addons and /elementor-addon-suite.
 * Contains ${entries.length} fully readable, executable, and demonstrative files.
 */
export const WORDPRESS_PLUGIN_FILES: WordPressFile[] = ${JSON.stringify(entries, null, 2)};
`;

fs.writeFileSync(tsOutputFile, tsContent, 'utf8');
console.log(`Successfully synced ${entries.length} plugin files to ${tsOutputFile}`);
