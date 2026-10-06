const fs = require('fs');
const path = require('path');

const themeDir = path.resolve('wordpress-theme');
const tsOutputFile = path.resolve('src/data/wordPressThemeFiles.ts');

function getCategory(filePath) {
  if (filePath.startsWith('inc/')) return 'توابع و هسته (inc)';
  if (filePath.startsWith('includes/')) return 'کلاس‌های معماری و امنیت (includes)';
  if (filePath.startsWith('assets/')) return 'ابزارک‌ها و استایل‌ها';
  if (filePath.startsWith('languages/') || filePath.endsWith('.md') || filePath.endsWith('.txt') || filePath.endsWith('.json')) return 'مستندات و پیکربندی';
  if (filePath.startsWith('page-') || filePath.startsWith('archive') || filePath.startsWith('single') || filePath === 'category.php' || filePath === 'tag.php' || filePath === 'search.php' || filePath === 'page.php' || filePath === 'home.php' || filePath.startsWith('template-')) {
    return 'برگه‌ها و آرشیوها';
  }
  return 'پوسته اصلی و هدرها';
}

function getDescription(filePath) {
  const descriptions = {
    'style.css': 'هدر رسمی پوسته وردپرس با نام SedRazavi، متغیرهای طلایی/سرمه‌ای و استایل‌های ۱۰۰٪ کامل.',
    'functions.php': 'موتور اصلی وردپرس: انکیو استایل‌ها، رجیستر شورت‌کدها، احراز هویت ری‌اکت و متصل‌کننده ۳۱ ماژول هسته.',
    'header.php': 'سربرگ رسمی با سئوی داینامیک، متاتگ‌های پیشرفته OpenGraph و Schema.org محلی وکیل.',
    'footer.php': 'پانوشت استاندارد وردپرس با هوک wp_footer و نوار شناور درصد مطالعه (Gold Scroll).',
    'front-page.php': 'صفحه نخست با پشتیبانی SSR و قابلیت جایگزینی با المنتور و کامپوننت‌های ری‌اکت.',
    'index.php': 'قالب اصلی خروجی وردپرس و میزبان روت اپلیکیشن ری‌اکت.',
    'register-react-shortcodes.php': 'موتور ثبت شورت‌کدهای یونیورسال [react_component name="..."] با پشتیبانی اسکلتون لودر.',
    'inc/rest-api.php': 'اندپوینت‌های REST API با امنیت سخت‌گیرانه، اعتبارسنجی ورودی‌ها و محافظت دسترسی وکیل/ادمین.',
    'inc/api-handlers.php': 'هندلرهای اختصاصی ذخیره‌سازی پروفایل و توکن‌های طراحی در پیشخوان.',
    'inc/wp-rest-auth.php': 'لایه احراز هویت و بررسی نانس و دسترسی داسکیه پرونده‌ها.',
    'inc/seo-bridge.php': 'پل سئوی مستقل از جاوااسکریپت و کدهای ساختاریافته Schema.org.',
    'inc/customizer-seo.php': 'تنظیمات سفارشی‌سازی سئو، متاتگ‌ها و کدهای گوگل آنالیتیکس در کاستومایزر وردپرس.',
    'inc/manifest-bridge.php': 'همگام‌ساز خودکار و Idempotent برگه‌های وب‌سایت با manifest.json.',
    'inc/meta-boxes.php': 'متاباکس‌های بومی وردپرس برای تنظیمات اختصاصی برگه‌ها.',
    'inc/react-shortcodes.php': 'مجموعه ۱۵+ شورت‌کد کامپوننت‌های تعاملی با کانتینر .sedrazavi-react-root.',
    'inc/security.php': 'هدرهای امنیتی HTTP، محافظت در برابر حملات بروت‌فورس و فیلتر آپلود.',
    'inc/case-management.php': 'پست تایپ اختصاصی پرونده‌های حقوقی sedrazavi_case و وضعیت‌های دادرسی.',
    'inc/booking.php': 'سامانه بومی رزرواسیون نوبت مشاوره حقوقی با محدودسازی نرخ درخواست.',
    'inc/elementor-widgets.php': 'پل اتصال ابزارک‌های اختصاصی المنتور به هسته وردپرس.',
    'inc/class-sedrazavi-calculators.php': 'محاسبه‌گر تعرفه‌های قضایی، حق‌الوکاله و هزینه دادرسی.',
    'inc/class-sedrazavi-client-portal.php': 'پورتال اختصاصی موکلین برای پیگیری پرونده و ارسال مدارک.',
    'inc/class-sedrazavi-dashboard.php': 'پیشخوان مدیریت پرونده‌ها و گزارشات کارتابل وکالت.',
    'inc/arbitration-cpt.php': 'پست تایپ و مدیریت دعاوی داوری تجاری بین‌المللی و داخلی.',
    'inc/corporate-international.php': 'تحلیل حقوقی شرکت‌ها، حدنصاب مجمع و اینکوترمز ۲۰۲۰.',
    'inc/legal-vault-deadlines.php': 'گاوصندوق اسناد محرمانه و مواعد قانونی تجدیدنظر و دیوان.',
    'inc/advanced-backup.php': 'سامانه پشتیبان‌گیری و کنترل نگارش‌های پایگاه داده و تنظیمات.',
    'inc/analytics-reports.php': 'گزارش‌گیری تحلیلی، KPIهای وکالت و نرخ موفقیت پرونده‌ها.',
    'inc/class-sedrazavi-elementor.php': 'دسته‌بندی و هوک‌های المنتور برای ویجت‌های حقوقی اختصاصی.',
    'inc/class-sedrazavi-security.php': 'محافظت امنیتی پیشرفته و فیلتر فایل‌های مجاز دادگستری.',
    'inc/class-sedrazavi-updater.php': 'موتور به‌روزرسانی خودکار پوسته از گیت‌هاب.',
    'inc/dashboard.php': 'منوی داشبورد مدیریت دفتر حقوقی در پیشخوان ادمین وردپرس.',
    'inc/educational-tour.php': 'تور آموزشی تعاملی برای آشنایی با امکانات پوسته.',
    'inc/integrations.php': 'یکپارچه‌سازی با ووکامرس، فت‌سئو و پلاگین‌های بهینه‌سازی کش.',
    'inc/precedents-cpt.php': 'آرای وحدت رویه دیوان عالی کشور و نظریات مشورتی.',
    'inc/setup.php': 'بررسی پیش‌نیازهای افزونه‌ها و پیکربندی اولیه قالب.',
    'inc/theme-options.php': 'تنظیمات رنگ‌بندی، لوگو و اطلاعات دفتر در کاستومایزر.',
    'inc/user-roles.php': 'نقش‌های کاربری حقوقی (وکیل، منشی دفتر، کارآموز وکالت، موکل).',
    'inc/ux-improvements.php': 'بهینه‌سازی تجربه کاربری و اسکلتون لودرهای هوشمند.',
    'assets/js/sedrazavi-react-mount.js': 'موتور شناسایی خودکار روت‌های .sedrazavi-react-root و هیدراتاسیون React در وردپرس.',
    'page-dashboard.php': 'قالب اختصاصی پیشخوان وکیل و ادمین با سوییچر نقش و کارتابل جامع.',
    'page-template-dashboard.php': 'قالب تمام‌صفحه اختصاصی داشبورد مدیریت وکالت.',
    'page-case-timeline.php': 'تایم‌لاین تعاملی پیشرفت دادرسی و ابلاغیه‌های دادگاه.',
    'page-corporate-insolvency.php': 'سامانه ورشکستگی، تصفیه دیون تجاری و قراردادهای ارفاقی.',
    'page-tracking.php': 'سامانه آنلاین استعلام و پیگیری وضعیت پرونده با کدرهگیری.',
  };

  if (descriptions[filePath]) return descriptions[filePath];
  if (filePath.startsWith('page-')) return `قالب اختصاصی برگه وردپرس (${filePath}) سازگار با المنتور و شورت‌کدهای تعاملی.`;
  if (filePath.startsWith('inc/')) return `ماژول هسته پوسته وردپرس (${filePath}) با بارگذاری خودکار.`;
  if (filePath.startsWith('includes/')) return `کلاس ساختاری شی‌گرا (${filePath}) منطبق با استانداردهای وردپرس.`;
  return `فایل رسمی پوسته وردپرس: ${filePath}`;
}

function walk(dir, base) {
  let res = [];
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    const rel = path.relative(base, full);
    if (f.startsWith('.') || f === 'node_modules' || f === 'dist' || f === 'app-dist' || f.endsWith('.zip') || f === 'screenshot.png') return;
    // Exclude the compiled multi-megabyte app bundle inside assets to keep TS files lean
    if (rel === 'assets/index.js' || rel === 'assets/index.css') return;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) res = res.concat(walk(full, base));
    else res.push(rel);
  });
  return res;
}

const files = walk(themeDir, themeDir).sort();
console.log(`Processing ${files.length} theme files...`);

const entries = files.map(fileRel => {
  const fullPath = path.join(themeDir, fileRel);
  const code = fs.readFileSync(fullPath, 'utf8');
  const filename = path.basename(fileRel);
  const category = getCategory(fileRel);
  const description = getDescription(fileRel);

  return {
    path: fileRel,
    filename,
    category,
    description,
    code,
  };
});

const tsContent = `import { WordPressFile } from '../types/theme';

/**
 * Single Source of Truth Theme Files
 * Auto-generated directly from /wordpress-theme to guarantee 100% synchronization.
 * Contains ${entries.length} fully readable, executable, and demonstrative files.
 */
export const WORDPRESS_THEME_FILES: WordPressFile[] = ${JSON.stringify(entries, null, 2)};
`;

fs.writeFileSync(tsOutputFile, tsContent, 'utf8');
console.log(`Successfully synced ${entries.length} files to ${tsOutputFile}`);
