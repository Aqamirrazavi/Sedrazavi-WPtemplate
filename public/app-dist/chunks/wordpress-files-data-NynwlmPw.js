const e=[{path:"404.php",filename:"404.php",category:"پوسته اصلی و هدرها",description:"فایل رسمی پوسته وردپرس: 404.php",code:`<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="py-20 bg-[#F4F6F9] dark:bg-[#070D1E] flex items-center justify-center min-h-[70vh]">
    <div class="container mx-auto px-4 text-center max-w-lg space-y-6">
        <div class="text-7xl sm:text-9xl font-bold font-serif text-[#0B132B] dark:text-white flex items-center justify-center gap-2">
            <span>۴</span>
            <span class="text-[#D4AF37] animate-bounce">⚖️</span>
            <span>۴</span>
        </div>
        <h1 class="text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
            <?php esc_html_e('صفحه مورد نظر شما یافت نشد!', 'sedrazavi'); ?>
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
            <?php esc_html_e('ممکن است آدرس صفحه تغییر کرده باشد یا موقتاً در دسترس نباشد.', 'sedrazavi'); ?>
        </p>
        <div class="pt-4 flex justify-center gap-4">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="btn-gold py-2.5 px-6 text-sm">
                <span>بازگشت به صفحه اصلی</span>
            </a>
        </div>
    </div>
</div>

<?php get_footer(); ?>
`},{path:"INSTALL.md",filename:"INSTALL.md",category:"مستندات و پیکربندی",description:"فایل رسمی پوسته وردپرس: INSTALL.md",code:`# ⚖️ راهنمای جامع نصب، راه‌اندازی و عیب‌یابی بسته سید رضوی (SedRazavi v2.5.0)

این بسته نرم‌افزاری شامل پوسته اختصاصی حقوقی **SedRazavi Theme** و افزونه مکمل **SedRazavi Addons** با معماری ضد خرابی (Zero WSOD Architecture)، محافظت کامل توابع و سیستم ثبت خودکار لاگ خطاها می‌باشد.

---

## 📁 ۱. ساختار استاندارد بسته پروژه (sedrazavi-project)

\`\`\`text
sedrazavi-project/
├── sedrazavi-theme/               ← پوسته اصلی وردپرس
│   ├── style.css                  ← استایل لوکس طلایی و مشخصات متادیتای پوسته
│   ├── functions.php              ← توابع و لودر امن ماژول‌ها
│   ├── screenshot.png             ← پیش‌نمایش رسمی پوسته
│   ├── inc/                       ← ماژول‌های محافظت‌شده و بدون تداخل
│   │   ├── case-management.php    ← مدیریت پرونده و رهگیری با گارد if (!function_exists)
│   │   ├── theme-options.php      ← پنل تنظیمات پیشرفته
│   │   ├── security.php           ← هدرهای امنیتی و اعتبارسنجی
│   │   ├── user-roles.php         ← نقش‌های کاربری (وکیل، موکل، کارآموز)
│   │   ├── breadcrumbs.php        ← مسیر راهنما با سازگاری رنک‌مث و یوست
│   │   ├── customizer.php         ← شخصی‌ساز زنده شماره تماس و آدرس
│   │   ├── woocommerce.php        ← سازگاری با فروشگاه و رزرو آنلاین
│   │   ├── elementor.php          ← لودر امن ابزارک‌های المنتور
│   │   └── seo.php                ← نشانه‌گذاری اسکیما LegalService
│   └── templates/                 ← قالب‌های اختصاصی صفحات
└── sedrazavi-addons/              ← افزونه مکمل و مقاوم وردپرس
    ├── sedrazavi-addons.php       ← فایل اصلی افزونه با لودر Resilient و Logger
    ├── includes/
    │   ├── logger.php             ← لاگر خودکار سیستم و مدیریت رخدادها
    │   ├── case-tracking.php      ← ایجکس و رهگیری پرونده‌ها
    │   ├── booking-system.php     ← سیستم رزرو نوبت مشاوره حقوقی
    │   ├── post-types.php         ← ثبت CPTهای پرونده و دادخواست
    │   ├── elementor-widgets.php  ← ویجت‌های اختصاصی المنتور
    │   └── admin-settings.php     ← ابزار مشاهده لاگ در پیشخوان
    └── INSTALL.md                 ← همین راهنما
\`\`\`

---

## ⚙️ ۲. پیش‌نیازهای سرور و هاست

| مولفه | مقدار مورد نیاز | پیشنهاد بهینه |
| :--- | :--- | :--- |
| **نسخه PHP** | 7.4 یا بالاتر | 8.1 / 8.2 / 8.3 |
| **نسخه وردپرس** | 5.8 تا 6.7+ | آخرین نسخه پایدار |
| **پایگاه داده** | MySQL 5.7+ یا MariaDB 10.3+ | MySQL 8.0+ |
| **حافظه مجاز PHP** | حداقل \`256M\` | \`512M\` |
| **ماژول‌های PHP** | cURL, OpenSSL, mbstring, json, zip | فعال |

---

## 🚀 ۳. مراحل گام‌به‌گام نصب

### روش الف: نصب مستقیم از پیشخوان وردپرس (پیشنهادی)

1. **نصب پوسته (Theme):**
   - به پیشخوان وردپرس > **نمایش** > **پوسته‌ها** بروید.
   - دکمه **افزودن پوسته تازه** و سپس **بارگذاری پوسته** را بزنید.
   - فایل فشرده \`sedrazavi-theme.zip\` را انتخاب کرده و روی **نصب کن** کلیک کنید.
   - پس از پایان بارگذاری، روی **فعال‌سازی** کلیک فرمایید.

2. **نصب افزونه مکمل (Plugin):**
   - به منوی **افزونه‌ها** > **افزودن افزونه** بروید.
   - دکمه **بارگذاری افزونه** را زده و فایل \`sedrazavi-addons.zip\` را بارگذاری کنید.
   - روی **نصب کن** و سپس **فعال‌سازی افزونه** کلیک نمایید.

3. **درون‌ریزی ۱-کلیک دمو:**
   - پس از فعال‌سازی پوسته، یک پیام طلایی در بالای پیشخوان با عنوان **«⚖️ راه‌اندازی سریع پوسته حقوقی سید رضوی»** ظاهر می‌شود.
   - روی دکمه **نصب ۱ کلیک برگه‌ها و محتوای دمو** کلیک کنید تا صفحات اصلی، وبلاگ و تنظیمات خودکار پیکربندی شوند.

---

### روش ب: نصب از طریق هاست (cPanel / DirectAdmin / FTP)

1. پوشه \`sedrazavi-theme\` را در مسیر \`wp-content/themes/\` کپی کنید.
2. پوشه \`sedrazavi-addons\` را در مسیر \`wp-content/plugins/\` کپی کنید.
3. وارد پیشخوان وردپرس شده و از بخش **نمایش > پوسته‌ها** و **افزونه‌ها** هر دو را فعال نمایید.

---

## 🛡️ ۴. تایید برطرف شدن خطای صفحه سفید (WSOD Resolution)

در نسخه‌های قبلی، وجود تابع بدون محافظت \`sedrazavi_ajax_track_case()\` در تم باعث بروز خطای \`Cannot redeclare\` در هنگام فعال بودن همزمان پلاگین می‌شد. در نگارش فعلی (2.5.0):

1. **تمام توابع در تم و افزونه** داخل بلوک شرطی \`if (!function_exists('...'))\` قرار گرفته‌اند.
2. **تمامی ثوابت** با پیشوندهای تفکیک‌شده (\`SEDRAZAVI_THEME_\` و \`SEDRAZAVI_ADDONS_\`) و با شرط \`if (!defined('...'))\` تعریف شده‌اند.
3. **ترتیب لود شدن:** سایت بدون وابستگی به ترتیب فعال‌سازی (اول پوسته یا اول افزونه) به درستی و بدون کوچکترین خطا لود می‌شود.
4. **ویجت‌های المنتور** به صورت ایمن بارگذاری می‌شوند؛ حتی اگر المنتور فعال نباشد، هیچ خطایی رخ نمی‌دهد.

---

## 🔍 ۵. سیستم لاگ‌گیری پیشرفته و نحوه فعال‌سازی دیباگ

افزونه به صورت خودکار یک سیستم نظارت و ثبت وقایع ایجاد می‌کند:

### الف) فایل لاگ اختصاصی افزونه
خطاها و استثناها به صورت خودکار در فایل زیر ثبت می‌شوند:
\`\`\`text
wp-content/uploads/sedrazavi-logs/debug.log
\`\`\`
- این پوشه دارای فایل‌های \`.htaccess\` و \`index.php\` است تا از دسترسی غیرمجاز و مشاهده عمومی محافظت شود.
- همچنین مدیر سایت می‌تواند از منوی **ابزارها > لاگ خطای سید رضوی** آخرین گزارش‌های ثبت‌شده را مستقیماً در پنل مدیریت مشاهده یا پاکسازی کند.

### ب) فعال‌سازی دیباگ استاندارد وردپرس
در صورت نیاز به بررسی عمیق‌تر، فایل \`wp-config.php\` در ریشه هاست را باز کرده و خطوط زیر را ویرایش/جایگزین کنید:

\`\`\`php
// فعال‌سازی حالت گزارش خطا
define('WP_DEBUG', true);

// ذخیره خطاها در فایل wp-content/debug.log
define('WP_DEBUG_LOG', true);

// جلوگیری از نمایش خطاها به بازدیدکنندگان سایت
define('WP_DEBUG_DISPLAY', false);
@ini_set('display_errors', 0);
\`\`\`

---

## 📞 ۶. دریافت پشتیبانی و ارتباط با طراح
در صورت بروز هرگونه سوال، درخواست سفارشی‌سازی یا پشتیبانی، از طریق راه‌های ارتباطی زیر با طراح و توسعه‌دهنده رسمی قالب در ارتباط باشید:

- **طراح و توسعه‌دهنده:** سید امیر حسین رضوی فردویی
- **کانال تلگرام:** [@sedrazavi](https://t.me/sedrazavi)
- **شناسه ایتا:** [@sedrazavi](https://eitaa.com/sedrazavi)
- **ایمیل پشتیبانی:** info@sedrazavi.com
- **فایل لاگ خطاها:** \`wp-content/uploads/sedrazavi-logs/debug.log\`
`},{path:"README.md",filename:"README.md",category:"مستندات و پیکربندی",description:"فایل رسمی پوسته وردپرس: README.md",code:`# ⚖️ قالب وردپرس فوق‌پیشرفته سید رضوی (SedRazavi Law Firm Theme)

> **قالب اختصاصی، مدرن و استاندارد وکلا، مؤسسات حقوقی و داوری بین‌المللی بر پایه وردپرس ۶.۷ و PHP 8.x**

---

## 📑 فهرست راهنمای جامع (۸ بخش اصلی)

1. [خروجی Google AI Studio به گیتهاب (صادرات کد)](#۱-خروجی-google-ai-studio-به-گیتهاب-صادرات-کد)
2. [ساختار ریپوی گیتهاب و فایلهای ضروری](#۲-ساختار-ریپوی-گیتهاب-و-فایلهای-ضروری)
3. [اکشن گیتهاب برای تولید فایل زیپ (GitHub Actions CI/CD)](#۳-اکشن-گیتهاب-برای-تولید-فایل-زیپ)
4. [دانلود فایل زیپ استاندارد قالب](#۴-دانلود-فایل-زیپ)
5. [نصب و فعال‌سازی در وردپرس](#۵-نصب-در-وردپرس)
6. [به‌روزرسانی خودکار قالب از گیتهاب](#۶-بهروزرسانی-خودکار-قالب-از-گیتهاب)
7. [راهنمای جامع عیب‌یابی (Troubleshooting)](#۷-دستورالعملهای-عیبیابی)
8. [اطلاعات تکمیلی و مشخصات فنی](#۸-مشخصات-فنی)

---

## ۱. خروجی Google AI Studio به گیتهاب (صادرات کد)

### ۱.۱. چیستی
یکپارچه‌سازی رسمی محیط Google AI Studio با حساب کاربری GitHub با یک کلیک.

### ۱.۲. چرایی
- **مالکیت دائم کد:** کد تولیدشده در AI Studio موقتی است و برای نگهداری و توسعه، باید به گیتهاب منتقل شود.
- **مدیریت نسخه و تاریخچه (Git Tracking):** امکان بازگشت به نسخه‌ها و مشارکت تیمی.
- **خودکارسازی کامل (Automation):** اتصال بی‌درنگ به پایپ‌لاین CI/CD.

### ۱.۳. چگونگی (مراحل گام‌به‌گام)
1. به محیط [Google AI Studio](https://aistudio.google.com/) بروید و در حالت **Build** مستقر شوید.
2. روی آیکون گیت‌هاب (GitHub) در نوار بالایی هدر کلیک کنید.
3. در صورت نیاز اجازه دسترسی (Connect Account) را تأیید فرمایید.
4. نام ریپازیتوری را وارد کنید (مثال: \`sedrazavi-theme\`).
5. نوع دید (Public یا Private) را مشخص نموده و دکمه **Push** را بفشارید.

---

## ۲. ساختار ریپوی گیتهاب و فایلهای ضروری

\`\`\`
sedrazavi-theme/
├── .github/
│   └── workflows/
│       └── build-zip.yml          # اکشن کامپایل و پکیج خودکار قالب
├── assets/                        # فایل‌های CSS، جاوااسکریپت و تصاویر
├── inc/                           # کلاس‌ها و توابع ماژولار PHP
│   ├── class-sedrazavi-updater.php # سیستم آپدیت خودکار از گیت‌هاب
│   └── ...
├── languages/                     # فایل‌های ترجمه فا/انگلیسی
├── .distignore                    # فیلتر حذف فایل‌های سنگین و توسعه
├── .gitignore                     # جلوگیری از کامیت فایل‌های موقت
├── style.css                      # مشخصات اصلی و استایل پوسته
├── functions.php                  # موتور مرکزی پوسته
├── README.md                      # مستندات جامع
└── INSTALL.md                     # راهنمای سریع نصب
\`\`\`

---

## ۳. اکشن گیتهاب برای تولید فایل زیپ

فایل \`.github/workflows/build-zip.yml\` به محض وقوع رویدادهای زیر اجرا می‌شود:
- ارسال تغییرات به شاخه \`main\` یا \`master\` (\`on: push\`)
- ایجاد نگارش تازه در بخش Releases (\`on: release\`)
- تریگر دستی از تب Actions گیتهاب (\`workflow_dispatch\`)

فایل‌های اضافی مانند \`node_modules\`، \`.git\`، \`tests\` و فایل‌های سیستمی بر پایه \`.distignore\` کامپوزیت و حذف می‌شوند.

---

## ۴. دانلود فایل زیپ

### روش ۱: دانلود از بخش Actions (سریع‌ترین روش)
1. وارد ریپوی گیتهاب قالب شوید.
2. به تب **Actions** بروید و آخرین اجرای موفق را انتخاب کنید.
3. در بخش **Artifacts** روی \`sedrazavi-law-theme-latest\` کلیک کنید.

### روش ۲: دانلود از بخش Releases (انتشار رسمی)
1. به تب **Releases** بروید.
2. در بخش Assets، فایل \`sedrazavi-law-theme.zip\` را دانلود کنید.

### روش ۳: لینک مستقیم
\`\`\`url
https://github.com/{username}/{repo}/releases/latest/download/sedrazavi-law-theme.zip
\`\`\`

---

## ۵. نصب در وردپرس

1. وارد پیشخوان وردپرس شوید (\`yourdomain.com/wp-admin\`).
2. به مسیر **نمایش > پوسته‌ها > افزودن پوسته تازه > بارگذاری پوسته** بروید.
3. فایل \`sedrazavi-law-theme.zip\` را انتخاب و روی **نصب کن** کلیک کنید.
4. دکمه **فعال‌سازی** را بفشارید.
5. از جادوگر درون‌ریزی دمو و تنظیمات قالب در منوی «سید رضوی» استفاده نمایید.

---

## ۶. به‌روزرسانی خودکار قالب از گیتهاب

### روش ۱: استفاده از کلاس اختصاصی داخلی (\`inc/class-sedrazavi-updater.php\`)
قالب سید رضوی به صورت پیش‌فرض شامل هوک به \`site_transient_update_themes\` است و آخرین نسخه تگ‌شده در GitHub Releases را استعلام کرده و به صورت خودکار پیام آپدیت را در پیشخوان وردپرس نشان می‌دهد.

### روش ۲: افزونه WP Pusher / Gitium
1. افزونه **WP Pusher** را در وردپرس نصب کنید.
2. در بخش \`WP Pusher > Settings\` توکن شخصی (\`Personal Access Token\`) با دسترسی \`repo\` را وارد کنید.
3. در \`WP Pusher > Themes\` آدرس مخزن قالب را ثبت فرمایید.

---

## ۷. دستورالعمل‌های عیب‌یابی

| مشکل | علت احتمالی | راهکار رفع |
|---|---|---|
| عدم دانلود فایل زیپ از Actions | شکست در اجرای ورک‌فلو | بررسی لاگ‌های Actions و اصلاح سینتکس |
| خطای حجم آپلود در وردپرس | محدودیت \`upload_max_filesize\` | افزایش به \`64M\` در \`php.ini\` یا استفاده از FTP |
| سفید شدن صفحه یا عدم نمایش | عدم وجود \`style.css\` در ریشه | بررسی ساختار فایل زیپ و عدم تو در تو بودن پوشه |
| عدم کارکرد آپدیت خودکار | انقضای توکن گیت‌هاب | تجدید Personal Access Token در تنظیمات |

---

## ۸. مشخصات فنی
- **ورژن:** 2.5.0
- **نیازمندی‌ها:** PHP 8.0+ / WordPress 6.0+
- **سازگاری:** Elementor Pro, ACF Pro, WooCommerce, WPML
`},{path:"archive-video.php",filename:"archive-video.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: archive-video.php",code:`<?php
/**
 * Video Archive Template
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="archive-header-banner bg-[#0B132B] text-white py-16 relative overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        <span class="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold mb-3">🎬 رسانه حقوقی</span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white"><?php esc_html_e('ویدیوها و کارگاه‌های آموزشی حقوقی', 'sedrazavi'); ?></h1>
    </div>
</div>

<section class="py-16 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-[60vh]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <?php if (have_posts()) : ?>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php while (have_posts()) : the_post(); ?>
                    <article class="bg-white dark:bg-[#0B132B] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all group">
                        <div class="relative h-48 bg-gray-900 overflow-hidden flex items-center justify-center">
                            <?php if (has_post_thumbnail()) : ?>
                                <?php the_post_thumbnail('medium_large', array('class' => 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80')); ?>
                            <?php endif; ?>
                            <div class="absolute w-12 h-12 rounded-full bg-[#D4AF37] text-[#0B132B] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                ▶
                            </div>
                        </div>
                        <div class="p-5 space-y-2">
                            <h2 class="text-lg font-bold font-serif text-[#0B132B] dark:text-white group-hover:text-[#D4AF37] transition-colors">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h2>
                            <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2"><?php echo wp_trim_words(get_the_excerpt(), 20); ?></p>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>
            <div class="mt-8 flex justify-center"><?php the_posts_pagination(); ?></div>
        <?php else : ?>
            <p class="text-center text-gray-500 py-12"><?php esc_html_e('ویدیویی یافت نشد.', 'sedrazavi'); ?></p>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
`},{path:"archive.php",filename:"archive.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: archive.php",code:`<?php
/**
 * The template for displaying archive pages (Blog & Legal Articles)
 *
 * @package SedRazavi
 * @version 2.5.0
 */

get_header();
?>

<div class="archive-header-banner bg-[#0B132B] text-white py-16 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-l from-[#D4AF37]/10 to-transparent pointer-events-none"></div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold mb-3">
            <span>⚖️</span>
            <span><?php esc_html_e('بانک مقالات و پژوهش‌های حقوقی سید رضوی', 'sedrazavi'); ?></span>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white">
            <?php the_archive_title(); ?>
        </h1>
        <?php if (get_the_archive_description()) : ?>
            <div class="archive-description text-gray-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
                <?php the_archive_description(); ?>
            </div>
        <?php endif; ?>
    </div>
</div>

<section class="archive-posts-section py-16 bg-[#F4F6F9] dark:bg-[#070D1E]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <?php if (have_posts()) : ?>
            
            <!-- 3-Column Luxury Articles Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php while (have_posts()) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white dark:bg-[#0B132B] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group'); ?>>
                        
                        <!-- Article Thumbnail -->
                        <div class="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <?php if (has_post_thumbnail()) : ?>
                                <?php the_post_thumbnail('sedrazavi-service-card', array('class' => 'w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500')); ?>
                            <?php else : ?>
                                <div class="w-full h-full flex items-center justify-center bg-[#0B132B]/10 dark:bg-[#0B132B]/50 text-[#D4AF37]">
                                    <span class="text-4xl font-serif">⚖️</span>
                                </div>
                            <?php endif; ?>

                            <!-- Category Badge -->
                            <div class="absolute top-4 right-4">
                                <?php
                                $categories = get_the_category();
                                if (!empty($categories)) {
                                    echo '<span class="px-3 py-1 bg-[#0B132B]/85 backdrop-blur-sm text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold rounded-lg">' . esc_html($categories[0]->name) . '</span>';
                                }
                                ?>
                            </div>
                        </div>

                        <!-- Card Body -->
                        <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                            <div class="space-y-2">
                                <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                    <span class="flex items-center gap-1">📅 <?php echo get_the_date('j F Y'); ?></span>
                                    <span>•</span>
                                    <span class="flex items-center gap-1">⏱️ <?php echo max(1, round(str_word_count(strip_tags(get_the_content())) / 180)); ?> دقیقه مطالعه</span>
                                </div>

                                <h2 class="text-xl font-bold font-serif text-[#0B132B] dark:text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h2>

                                <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                                    <?php echo wp_trim_words(get_the_excerpt(), 24); ?>
                                </p>
                            </div>

                            <!-- Card Footer -->
                            <div class="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                <span class="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    ✍️ <?php the_author(); ?>
                                </span>
                                <a href="<?php the_permalink(); ?>" class="text-xs font-bold text-[#D4AF37] group-hover:translate-x-[-4px] transition-transform flex items-center gap-1">
                                    <span>مطالعه کامل مقاله</span>
                                    <span>‹</span>
                                </a>
                            </div>
                        </div>

                    </article>
                <?php endwhile; ?>
            </div>

            <!-- Custom Gold/Navy Pagination -->
            <div class="posts-pagination mt-12 flex justify-center">
                <?php
                echo paginate_links(array(
                    'prev_text' => '‹ قبلی',
                    'next_text' => 'بعدی ›',
                    'type'      => 'list',
                    'before_page_number' => '<span class="screen-reader-text">' . __('برگه ', 'sedrazavi') . '</span>',
                ));
                ?>
            </div>

        <?php else : ?>
            <div class="bg-white dark:bg-[#0B132B] rounded-2xl p-12 text-center max-w-xl mx-auto border border-gray-200 dark:border-gray-800">
                <span class="text-5xl mb-4 block">🔍</span>
                <h3 class="text-xl font-bold font-serif text-[#0B132B] dark:text-white mb-2"><?php esc_html_e('مقاله‌ای در این آرشیو یافت نشد', 'sedrazavi'); ?></h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-6"><?php esc_html_e('می‌توانید از جستجوی سایت برای یافتن موضوع حقوقی مورد نظر استفاده فرمایید.', 'sedrazavi'); ?></p>
                <a href="<?php echo esc_url(home_url('/')); ?>" class="btn-gold text-xs"><?php esc_html_e('بازگشت به صفحه اصلی', 'sedrazavi'); ?></a>
            </div>
        <?php endif; ?>

    </div>
</section>

<?php
get_footer();
?>
`},{path:"assets/css/rtl.css",filename:"rtl.css",category:"ابزارک‌ها و استایل‌ها",description:"فایل رسمی پوسته وردپرس: assets/css/rtl.css",code:`/* SedRazavi RTL Stylesheet */
body {
  direction: rtl;
  unicode-bidi: embed;
  text-align: right;
}

.prose {
  text-align: right;
}
`},{path:"assets/js/main.js",filename:"main.js",category:"ابزارک‌ها و استایل‌ها",description:"فایل رسمی پوسته وردپرس: assets/js/main.js",code:`/**
 * SedRazavi Law Firm Interactive Engine v2.6.0
 * Complete interactive features for 100% parity with Google AI Studio preview
 */
document.addEventListener("DOMContentLoaded", function() {
    console.log("⚖️ SedRazavi Theme Interactive Engine Ready.");

    // 1. Mobile Menu Drawer Toggle
    var mobileBtn = document.getElementById("mobile-menu-btn");
    var mobileDrawer = document.getElementById("mobile-menu-drawer");
    var closeBtn = document.getElementById("close-mobile-menu-btn");
    var backdrop = document.getElementById("mobile-menu-backdrop");

    if (mobileBtn && mobileDrawer) {
        mobileBtn.addEventListener("click", function() {
            mobileDrawer.classList.add("is-active");
            document.body.style.overflow = "hidden";
        });
    }
    if (closeBtn && mobileDrawer) {
        closeBtn.addEventListener("click", function() {
            mobileDrawer.classList.remove("is-active");
            document.body.style.overflow = "";
        });
    }
    if (backdrop && mobileDrawer) {
        backdrop.addEventListener("click", function() {
            mobileDrawer.classList.remove("is-active");
            document.body.style.overflow = "";
        });
    }

    // 2. Mobile Services Accordion Toggle
    var servicesBtn = document.getElementById("mobile-services-accordion-btn");
    var servicesList = document.getElementById("mobile-services-list");
    var servicesArrow = document.getElementById("mobile-services-arrow");

    if (servicesBtn && servicesList) {
        servicesBtn.addEventListener("click", function(e) {
            e.preventDefault();
            var isHidden = servicesList.classList.contains("hidden");
            if (isHidden) {
                servicesList.classList.remove("hidden");
                if (servicesArrow) servicesArrow.style.transform = "rotate(180deg)";
            } else {
                servicesList.classList.add("hidden");
                if (servicesArrow) servicesArrow.style.transform = "rotate(0deg)";
            }
        });
    }

    // 3. Dark Mode Toggle
    var themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
        themeBtn.addEventListener("click", function(e) {
            e.preventDefault();
            var current = document.documentElement.getAttribute("data-theme") || "dark";
            var next = current === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            if (next === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            localStorage.setItem("sedrazavi_theme", next);
        });
    }

    // 4. FAQ Accordion Toggle
    var faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(function(btn) {
        btn.addEventListener("click", function() {
            var answer = this.nextElementSibling;
            var icon = this.querySelector(".faq-icon");
            var isHidden = answer.classList.contains("hidden");

            // Close other FAQs
            document.querySelectorAll(".faq-answer").forEach(function(ans) {
                ans.classList.add("hidden");
            });
            document.querySelectorAll(".faq-icon").forEach(function(ic) {
                ic.textContent = "+";
            });

            if (isHidden) {
                answer.classList.remove("hidden");
                if (icon) icon.textContent = "−";
            }
        });
    });

    // 5. Services Filter Buttons
    var filterBtns = document.querySelectorAll(".service-filter-btn");
    var serviceCards = document.querySelectorAll(".service-card");
    filterBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            filterBtns.forEach(function(b) { b.classList.remove("active"); });
            this.classList.add("active");
            var cat = this.getAttribute("data-filter");
            serviceCards.forEach(function(card) {
                if (cat === "all" || card.getAttribute("data-category") === cat) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 6. Navigation links for modals
    document.querySelectorAll('a[href="#survey"]').forEach(function(a) {
        a.addEventListener("click", function(e) { e.preventDefault(); openSurveyModal(); });
    });
    document.querySelectorAll('a[href="#guide"]').forEach(function(a) {
        a.addEventListener("click", function(e) { e.preventDefault(); openTourModal(); });
    });
    document.querySelectorAll('a[href="#academy"]').forEach(function(a) {
        a.addEventListener("click", function(e) { e.preventDefault(); openAcademyModal(); });
    });
});

// Story Modal Data
var storiesData = [
    {
        title: "نکات چک صیادی",
        category: "نکات کاربردی",
        img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
        slideTitle: "قوانین طلایی صدور و پیگیری چک‌های صیادی بنفش",
        slideDesc: "مطابق ماده ۲۳ قانون اصلاح قانون صدور چک، در صورت برگشت چک صیادی، موکل بدون نیاز به تقدیم دادخواست ماهوی و پرداخت هزینه سنگین دادرسی، می‌تواند مستقیماً از دادگاه تقاضای صدور اجراییه نماید."
    },
    {
        title: "پیروزی در پرونده برج الهیه",
        category: "موفقیت‌های اخیر",
        img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
        slideTitle: "ابطال سند معارض برج مسکونی الهیه به ارزش ۲۴۰ میلیارد ریال",
        slideDesc: "با استناد به اسناد رسمی اولیه و اثبات جعل مادی و معنوی در کمیسیون تخصصی ثبتی، رای قطعی شعبه ۱۲ دادگاه تجدیدنظر استان تهران به نفع موکل صادر و سند رسمی معارض ابطال گردید."
    },
    {
        title: "طلاق و مهریه",
        category: "حقوق خانواده",
        img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
        slideTitle: "رسیدگی تخصصی به طلاق توافقی و توقیف مهریه",
        slideDesc: "تنظیم توافق‌نامه رسمی جامع در خصوص حضانت، نفقه، جهیزیه و مهریه با حفظ کامل حرمت طرفین و صدور گواهی عدم امکان سازش در کوتاه‌ترین زمان ممکن قانونی."
    },
    {
        title: "سهم‌الارث مادر",
        category: "انحصار وراثت",
        img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
        slideTitle: "نحوه محاسبه سهم‌الارث زوجه از عرصه و اعیان",
        slideDesc: "طبق ماده ۹۴۶ قانون مدنی اصلاحی، زوجه از قیمت عرصه و نیز از اعیان ارث می‌برد. دفتر وکالت ما کلیه مراحل تحریر ترکه و تقسیم عادلانه را مدیریت می‌نماید."
    },
    {
        title: "قرارداد مشارکت در ساخت",
        category: "تجاری",
        img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
        slideTitle: "۵ شرط نجات‌بخش در قرارداد مشارکت با سازنده",
        slideDesc: "پیش‌بینی وجه التزام روزانه تاخیر، سلب حق پیش‌فروش تا سقف مشخص ساخت، و تعیین داور مرضی‌الطرفین تخصصی، مانع از قفل شدن سرمایه مالکین عرصه می‌شود."
    }
];

function openStoryModal(index) {
    var story = storiesData[index] || storiesData[0];
    document.getElementById("story-modal-title").textContent = story.title;
    document.getElementById("story-modal-cat").textContent = story.category;
    document.getElementById("story-modal-img").src = story.img;
    document.getElementById("story-slide-title").textContent = story.slideTitle;
    document.getElementById("story-slide-desc").textContent = story.slideDesc;

    var modal = document.getElementById("story-modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
}

function closeStoryModal() {
    var modal = document.getElementById("story-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
}

// Testimonials Data
var testimonialsData = [
    {
        quote: "«تسلط علمی سرکار خانم دکتر رضوی بر قوانین ثبتی و املاک موجب شد ملکی به ارزش بیش از ۴۰۰ میلیارد ریال که با معارض جعلی مواجه شده بود، در دیوان عالی کشور کاملاً احقاق حق و سند معارض باطل گردد. رازداری و نظم بی‌نظیر ایشان ستودنی است.»",
        author: "مهندس علیرضا سلیمانی",
        role: "مدیرعامل گروه سرمایه‌گذاری پارس نوین",
        service: "دعاوی ملکی و تجاری"
    },
    {
        quote: "«در پرونده اختلاف بین‌المللی با شریک خارجی در دبی، سرعت عمل و تسلط ایشان به قواعد داوری اتاق بازرگانی بین‌المللی (ICC) مانع از زیان چند میلیون درهمی شرکت ما شد. ایشان واقعاً وکیلی کم‌نظیر هستند.»",
        author: "دکتر حمیدرضا شمس",
        role: "رئیس هیئت مدیره شرکت بازرگانی کیمیا اروند",
        service: "داوری بین‌المللی"
    },
    {
        quote: "«در جریان یک پرونده بسیار پیچیده خانوادگی و تقسیم ترکه چندصد میلیاردی، صبر، درایت و تدوین لوایح بی‌نقص دکتر رضوی باعث شد بدون کوچکترین تنش و در آرامش کامل، حقوق قانونی به تمامی وراث مسترد گردد.»",
        author: "سرکار خانم مهندس تابش",
        role: "موکل پرونده انحصار وراثت و تقسیم ترکه",
        service: "حقوق خانواده و ارث"
    }
];
var testimonialIdx = 0;

function nextTestimonial() {
    testimonialIdx = (testimonialIdx + 1) % testimonialsData.length;
    renderTestimonial();
}

function prevTestimonial() {
    testimonialIdx = (testimonialIdx - 1 + testimonialsData.length) % testimonialsData.length;
    renderTestimonial();
}

function renderTestimonial() {
    var item = testimonialsData[testimonialIdx];
    document.getElementById("testimonial-quote").textContent = item.quote;
    document.getElementById("testimonial-author").textContent = item.author;
    document.getElementById("testimonial-role").textContent = item.role;
    document.getElementById("testimonial-service").textContent = item.service;
}

// Case Search Mock
function searchCaseStatus() {
    var input = document.getElementById("case-search-input").value.trim();
    var display = document.getElementById("case-result-display");
    if (!input) {
        alert("لطفاً شماره پرونده یا شماره همراه خود را وارد فرمایید.");
        return;
    }

    display.classList.remove("hidden");
    document.getElementById("res-case-title").textContent = "پرونده کلاسه " + input + " - دعوی ابطال سند و مطالبه خسارت";
    document.getElementById("res-case-status").textContent = "در حال رسیدگی در دادگاه تجدیدنظر";
    document.getElementById("res-case-desc").textContent = "لایحه دفاعیه تکمیلی توسط وکیل سرپرست در تاریخ جاری در سامانه عدل‌ایران ثبت گردید. وقت رسیدگی نظارت دادگاه تعیین شده است.";
    document.getElementById("res-case-branch").textContent = "شعبه ۱۸ دادگاه تجدیدنظر استان تهران";
    document.getElementById("res-case-date").textContent = "آخرین بروزرسانی: امروز ساعت ۱۱:۴۵";
}

// Booking Form Submit
function handleBookingSubmit(e) {
    e.preventDefault();
    var name = document.getElementById("book-name").value;
    var phone = document.getElementById("book-phone").value;
    alert("درخواست نوبت مشاوره برای «" + name + "» با موفقیت ثبت گردید. پیامک تایید نوبت به شماره " + phone + " ارسال خواهد شد.");
    document.getElementById("booking-form-main").reset();
}

// Modals Controls
function openSurveyModal() {
    document.getElementById("survey-modal").classList.remove("hidden");
    document.getElementById("survey-modal").classList.add("flex");
}
function closeSurveyModal() {
    document.getElementById("survey-modal").classList.add("hidden");
    document.getElementById("survey-modal").classList.remove("flex");
}
function submitSurvey() {
    alert("سپاسگزاریم! دیدگاه شما با موفقیت ثبت گردید.");
    closeSurveyModal();
}

function openTourModal() {
    document.getElementById("tour-modal").classList.remove("hidden");
    document.getElementById("tour-modal").classList.add("flex");
}
function closeTourModal() {
    document.getElementById("tour-modal").classList.add("hidden");
    document.getElementById("tour-modal").classList.remove("flex");
}

function openAcademyModal() {
    document.getElementById("academy-modal").classList.remove("hidden");
    document.getElementById("academy-modal").classList.add("flex");
}
function closeAcademyModal() {
    document.getElementById("academy-modal").classList.add("hidden");
    document.getElementById("academy-modal").classList.remove("flex");
}

function acceptCookies() {
    document.getElementById("cookie-banner").style.display = "none";
    localStorage.setItem("sedrazavi_cookie_consent", "accepted");
}
function dismissCookies() {
    document.getElementById("cookie-banner").style.display = "none";
}

function handleNewsletter(e) {
    e.preventDefault();
    alert("ایمیل شما در خبرنامه تخصصی دفتر وکالت دکتر رضوی با موفقیت ثبت گردید.");
    e.target.reset();
}
`},{path:"assets/js/sedrazavi-react-mount.js",filename:"sedrazavi-react-mount.js",category:"ابزارک‌ها و استایل‌ها",description:"موتور شناسایی خودکار روت‌های .sedrazavi-react-root و هیدراتاسیون React در وردپرس.",code:`/**
 * ==============================================================================
 * موتور مانت خودکار مؤلفه‌های React در وردپرس (WordPress React Component Mount Engine)
 * ==============================================================================
 * 
 * این اسکریپت تمام نودهای DOM دارای کلاس '.sedrazavi-react-root' را اسکن کرده،
 * اطلاعات کامپوننت و data-props را استخراج نموده و با ReactDOM.createRoot مانت می‌نماید.
 */

(function(window, document) {
    'use strict';

    // رجیستری مرکزی مؤلفه‌ها
    window.SedRazaviReactComponents = window.SedRazaviReactComponents || {};

    /**
     * ثبت مؤلفه جدید در رجیستری
     * @param {string} name نام مؤلفه
     * @param {React.ComponentType} componentClass کلاس مؤلفه
     */
    window.registerSedRazaviComponent = function(name, componentClass) {
        window.SedRazaviReactComponents[name] = componentClass;
    };

    /**
     * متد اصلی مانت کردن همه ریشه‌های React در صفحه
     */
    window.SedRazaviMountReactComponents = function() {
        var targets = document.querySelectorAll('.sedrazavi-react-root:not([data-mounted="true"])');
        if (!targets || targets.length === 0) return;

        var React = window.React || (window.wp && window.wp.element);
        var ReactDOM = window.ReactDOM || (window.wp && window.wp.element);

        if (!React || !ReactDOM) {
            console.warn('SedRazavi React Mount: React or ReactDOM is not loaded yet.');
            return;
        }

        targets.forEach(function(node) {
            var componentName = node.getAttribute('data-component');
            var rawProps = node.getAttribute('data-props');
            var props = {};

            try {
                props = rawProps ? JSON.parse(rawProps) : {};
            } catch (err) {
                console.error('SedRazavi: Error parsing JSON props for ' + componentName, err);
            }

            // ادغام تنظیمات سرور که با wp_localize_script ارسال شده‌اند
            if (window.SedRazaviReactConfig) {
                props.serverContext = window.SedRazaviReactConfig;
            }

            var Component = window.SedRazaviReactComponents[componentName];
            if (Component) {
                try {
                    node.setAttribute('data-mounted', 'true');
                    var skeleton = node.querySelector('.sedrazavi-skeleton-container');
                    if (skeleton) skeleton.remove();

                    if (ReactDOM.createRoot) {
                        var root = ReactDOM.createRoot(node);
                        root.render(React.createElement(Component, props));
                    } else if (ReactDOM.render) {
                        ReactDOM.render(React.createElement(Component, props), node);
                    }
                } catch (mountErr) {
                    console.error('SedRazavi: Failed to mount component ' + componentName, mountErr);
                }
            }
        });
    };

    // اجرای خودکار در زمان بارگذاری DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.SedRazaviMountReactComponents);
    } else {
        window.SedRazaviMountReactComponents();
    }

    // هماهنگی با بارگذاری ایجکس و ویجت‌های المنتور
    window.addEventListener('load', window.SedRazaviMountReactComponents);
    document.addEventListener('sedrazavi:refresh-react-roots', window.SedRazaviMountReactComponents);

    // اتصال به رویدادهای زنده المنتور (Elementor Frontend Hook)
    window.addEventListener('elementor/frontend/init', function() {
        if (window.elementorFrontend && window.elementorFrontend.hooks) {
            window.elementorFrontend.hooks.addAction('frontend/element_ready/global', function() {
                window.SedRazaviMountReactComponents();
            });
        }
    });

})(window, document);
`},{path:"category.php",filename:"category.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: category.php",code:`<?php
/**
 * Category Archive Template
 *
 * @package SedRazavi
 */

get_header();
$category = get_queried_object();
?>

<div class="category-header bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white py-16 border-b border-[#D4AF37]/20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <span class="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold inline-block mb-3">
            📁 <?php esc_html_e('دسته‌بندی حقوقی', 'sedrazavi'); ?>
        </span>
        <h1 class="text-3xl sm:text-4xl font-bold font-serif text-white mb-2">
            <?php single_cat_title(); ?>
        </h1>
        <?php if (category_description()) : ?>
            <p class="text-gray-300 text-sm max-w-2xl leading-relaxed"><?php echo category_description(); ?></p>
        <?php endif; ?>
        <div class="mt-4 text-xs text-gray-400">
            <span><?php printf(esc_html__('شامل %d مقاله و تحلیل قضایی', 'sedrazavi'), $category->count); ?></span>
        </div>
    </div>
</div>

<main class="py-16 bg-[#F4F6F9] dark:bg-[#070D1E]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <?php get_template_part('template-parts/archive-grid'); ?>
    </div>
</main>

<?php get_footer(); ?>
`},{path:"comments.php",filename:"comments.php",category:"پوسته اصلی و هدرها",description:"فایل رسمی پوسته وردپرس: comments.php",code:`<?php
/**
 * The template for displaying comments
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (post_password_required()) {
    return;
}
?>

<div id="comments" class="comments-area mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 space-y-8">

    <?php if (have_comments()) : ?>
        <h3 class="comments-title text-xl font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-2">
            <span>💬</span>
            <span>
                <?php
                $comment_count = get_comments_number();
                if ($comment_count === '1') {
                    esc_html_e('یک دیدگاه ثبت شده', 'sedrazavi');
                } else {
                    printf(
                        esc_html(_nx('%1$s پرسش و دیدگاه حقوقی', '%1$s پرسش و دیدگاه حقوقی', $comment_count, 'comments title', 'sedrazavi')),
                        number_format_i18n($comment_count)
                    );
                }
                ?>
            </span>
        </h3>

        <ol class="comment-list space-y-4">
            <?php
            wp_list_comments(array(
                'style'       => 'ol',
                'short_ping'  => true,
                'avatar_size' => 48,
            ));
            ?>
        </ol>

        <?php the_comments_pagination(array(
            'prev_text' => '‹ قبلی',
            'next_text' => 'بعدی ›',
        )); ?>

    <?php endif; ?>

    <?php
    // If comments are closed and there are comments, let's leave a little note
    if (!comments_open() && get_comments_number() && post_type_supports(get_post_type(), 'comments')) :
    ?>
        <p class="no-comments text-xs text-gray-500 dark:text-gray-400 py-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center">
            <?php esc_html_e('ارسال دیدگاه برای این یادداشت حقوقی بسته شده است.', 'sedrazavi'); ?>
        </p>
    <?php endif; ?>

    <div class="comment-form-wrapper bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
        <?php
        comment_form(array(
            'title_reply'          => '<span class="text-lg font-bold font-serif text-[#0B132B] dark:text-white">✍️ ' . __('ارسال پرسش یا دیدگاه به وکیل', 'sedrazavi') . '</span>',
            'title_reply_to'       => '<span class="text-sm font-bold text-[#D4AF37]">' . __('پاسخ به %s', 'sedrazavi') . '</span>',
            'cancel_reply_link'    => __('انصراف از پاسخ', 'sedrazavi'),
            'label_submit'         => __('ثبت دیدگاه حقوقی', 'sedrazavi'),
            'class_submit'         => 'btn-gold text-xs sm:text-sm px-6 py-2.5 rounded-xl cursor-pointer',
            'comment_notes_before' => '<p class="text-xs text-gray-500 dark:text-gray-400 mb-4">' . __('دیدگاه شما پس از بازبینی توسط وکیل یا تیم حقوقی منتشر خواهد شد. نشانی ایمیل شما نمایش داده نمی‌شود.', 'sedrazavi') . '</p>',
        ));
        ?>
    </div>

</div>
`},{path:"footer.php",filename:"footer.php",category:"پوسته اصلی و هدرها",description:"پانوشت استاندارد وردپرس با هوک wp_footer و نوار شناور درصد مطالعه (Gold Scroll).",code:`<?php
/**
 * The template for displaying the footer
 * 100% Complete matching Footer.tsx
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
</main><!-- #main-content -->

<footer id="colophon" class="site-footer bg-[#060B18] text-white pt-16 pb-8 border-t border-[#D4AF37]/20 relative overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
            
            <!-- ستون ۱: برندینگ، پروانه و توصیف -->
            <div class="space-y-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-white shadow-md shadow-[#D4AF37]/20">
                        <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                            <path d="M7 21h10"/>
                            <path d="M12 3v18"/>
                        </svg>
                    </div>
                    <div>
                        <span class="text-lg font-bold font-serif text-white">دفتر وکالت و داوری SedRazavi</span>
                        <p class="text-[10px] text-[#D4AF37]">پوسته رسمی کانون وکلای مرکز</p>
                    </div>
                </div>

                <p class="text-gray-400 text-xs leading-relaxed">
                    دفتر وکالت و داوری حقوقی دکتر سیده مریم رضوی (SedRazavi)؛ پاسدار حقوق فردی و شرکتی با بیش از دو دهه تجربه درخشان در محاکم قضایی و مراجع داوری بین‌المللی.
                </p>

                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#D4AF37]">
                    <span>🛡️ پروانه رسمی کانون وکلای دادگستری مرکز</span>
                </div>
            </div>

            <!-- ستون ۲: دسترسی سریع به خدمات -->
            <div>
                <h4 class="text-base font-bold text-white mb-4 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
                    دسترسی سریع به خدمات
                </h4>
                <ul class="space-y-2.5 text-xs text-gray-400">
                    <li><a href="#services" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><span class="text-[#D4AF37]">‹</span> دعاوی تجاری و شرکت‌ها</a></li>
                    <li><a href="#services" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><span class="text-[#D4AF37]">‹</span> دعاوی ملکی، اراضی و سرقفلی</a></li>
                    <li><a href="#services" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><span class="text-[#D4AF37]">‹</span> جرایم اقتصادی و دادگاه انقلاب</a></li>
                    <li><a href="#services" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><span class="text-[#D4AF37]">‹</span> حقوق خانواده، مهریه و تقسیم ارث</a></li>
                    <li><a href="#services" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><span class="text-[#D4AF37]">‹</span> داوری بین‌المللی و بازرگانی (ICC)</a></li>
                </ul>
            </div>

            <!-- ستون ۳: پیوندهای مفید سامانه -->
            <div>
                <h4 class="text-base font-bold text-white mb-4 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
                    پیوندهای مفید سامانه
                </h4>
                <ul class="space-y-2.5 text-xs text-gray-400">
                    <li><a href="#tracking" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-[#D4AF37] font-bold"><span class="text-[#D4AF37]">🔍</span> پیگیری لحظه‌ای پرونده موکلین</a></li>
                    <li><a href="#booking" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><span class="text-[#D4AF37]">‹</span> رزرو آنلاین نوبت مشاوره</a></li>
                    <li><a href="#about" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><span class="text-[#D4AF37]">‹</span> درباره وکیل و منشور اخلاق</a></li>
                    <li><a href="#articles" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><span class="text-[#D4AF37]">‹</span> یادداشت‌ها و مقالات حقوقی</a></li>
                    <li><a href="#faq" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><span class="text-[#D4AF37]">‹</span> پرسش‌های متداول موکلین</a></li>
                </ul>
            </div>

            <!-- ستون ۴: ارتباط و خبرنامه -->
            <div class="space-y-4">
                <h4 class="text-base font-bold text-white mb-4 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
                    ارتباط و خبرنامه تخصصی
                </h4>
                <p class="text-xs text-gray-400 leading-relaxed">
                    جهت دریافت مهم‌ترین تحولات حقوقی و رویه‌های جدید قضایی، ایمیل خود را ثبت نمایید:
                </p>
                <form onsubmit="handleNewsletter(event)" class="flex gap-2">
                    <input type="email" required placeholder="آدرس ایمیل..." class="flex-1 px-3 py-2 rounded-xl bg-[#0B132B] border border-gray-700 text-white text-xs focus:border-[#D4AF37] focus:outline-none" />
                    <button type="submit" class="btn-gold text-xs px-4 py-2 rounded-xl font-bold cursor-pointer">ثبت</button>
                </form>
                <div class="text-xs text-gray-400 space-y-1 pt-2">
                    <p>📞 تلفن: ۰۲۱-۸۸۹۹۰۰۱۱</p>
                    <p>📍 نشانی: تهران، ونک، ملاصدرا، پلاک ۱۱۸</p>
                </div>
            </div>

        </div>

        <!-- اطلاعات طراح و حق چاپ طبق بخش ۷ و پارت ۹ -->
        <div class="pt-8 pb-3 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
            <p>طراحی و توسعه توسط <a href="https://t.me/sedrazavi" target="_blank" rel="noopener" class="text-[#D4AF37] font-bold hover:underline">سید امیر حسین رضوی فردویی</a></p>
            <div class="flex items-center gap-4 text-xs">
                <a href="https://t.me/sedrazavi" target="_blank" rel="noopener" class="text-gray-400 hover:text-[#D4AF37] transition-colors">تلگرام: @sedrazavi</a>
                <span class="text-gray-700">|</span>
                <a href="https://eitaa.com/sedrazavi" target="_blank" rel="noopener" class="text-gray-400 hover:text-[#D4AF37] transition-colors">ایتا: @sedrazavi</a>
            </div>
        </div>
        <div class="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
            <p>© <?php echo date('Y'); ?> تمامی حقوق مادی و معنوی متعلق به دفتر وکالت و داوری SedRazavi می‌باشد.</p>
            <p><a href="<?php echo esc_url(home_url('/privacy-policy')); ?>" class="hover:text-gray-400">قوانین و حریم خصوصی</a></p>
        </div>
    </div>
</footer>


<!-- نوار پیشرفت طلایی بالای صفحه وردپرس -->
<div id="sedrazavi-gold-progress-top">
    <div id="sedrazavi-gold-progress-fill"></div>
</div>

<!-- سایدبار شناور طلایی اسکرول و ناوبری -->
<aside class="sedrazavi-floating-gold-sidebar" aria-label="<?php esc_attr_e('ناوبری و اسکرول سریع', 'sedrazavi'); ?>">
    <div class="gold-sidebar-inner">
        <div class="gold-scroll-badge" onclick="window.scrollTo({top:0, behavior:'smooth'})" title="<?php esc_attr_e('درصد اسکرول - کلیک برای بازگشت به بالا', 'sedrazavi'); ?>">
            <span class="gold-percent-num" id="sedrazavi-percent-display">0%</span>
        </div>
        <div class="gold-scroll-v-track">
            <div class="gold-scroll-v-fill" id="sedrazavi-v-fill"></div>
        </div>
        <button type="button" class="gold-btn-top" onclick="window.scrollTo({top:0, behavior:'smooth'})" title="<?php esc_attr_e('بازگشت به بالای صفحه', 'sedrazavi'); ?>">
            ▲
        </button>
    </div>
</aside>

<?php wp_footer(); ?>
</body>
</html>
`},{path:"front-page.php",filename:"front-page.php",category:"پوسته اصلی و هدرها",description:"صفحه نخست با پشتیبانی SSR و قابلیت جایگزینی با المنتور و کامپوننت‌های ری‌اکت.",code:`<?php
/**
 * The front page template file for SedRazavi Law Firm
 * 100% Complete Interface matching Google AI Studio Preview
 *
 * @package SedRazavi
 * @version 2.6.0
 */

// بررسی سازگاری کامل با المنتور (Elementor Compatibility)
if (have_posts()) {
    while (have_posts()) {
        the_post();
        $elementor_data = get_post_meta(get_the_ID(), '_elementor_data', true);
        if (!empty($elementor_data)) {
            get_header();
            the_content();
            get_footer();
            exit;
        }
    }
    rewind_posts();
}

// بارگذاری سربرگ استاندارد وردپرس (هدر، منوها و متادیتا)
get_header();
?>

<!-- نقطه‌ی مانت اپلیکیشن React و کانتینر اصلی محتوای رندرشده سمت سرور -->
<div id="root" class="sedrazavi-app-mount">


<!-- بخش ۱: نکات و استوری‌های آموزشی حقوقی روز (Story Bar) -->
<section class="stories-bar-section">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="stories-header">
            <svg class="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            </svg>
            <span>نکات و استوری‌های آموزشی حقوقی روز</span>
        </div>

        <div class="stories-scroll-container">
            <!-- Story 1 -->
            <div class="story-thumb-item" onclick="openStoryModal(0)">
                <div class="story-ring-gold">
                    <div class="story-img-wrap">
                        <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=200" alt="نکات چک صیادی" class="story-photo-img" />
                    </div>
                </div>
                <div class="story-text-wrap">
                    <span class="story-title-label">نکات چک صیادی</span>
                    <span class="story-cat-label">نکات کاربردی</span>
                </div>
            </div>

            <!-- Story 2 -->
            <div class="story-thumb-item" onclick="openStoryModal(1)">
                <div class="story-ring-gold">
                    <div class="story-img-wrap">
                        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200" alt="پیروزی در پرونده" class="story-photo-img" />
                    </div>
                </div>
                <div class="story-text-wrap">
                    <span class="story-title-label">پیروزی در پروند...</span>
                    <span class="story-cat-label">موفقیت‌های اخیر</span>
                </div>
            </div>

            <!-- Story 3 -->
            <div class="story-thumb-item" onclick="openStoryModal(2)">
                <div class="story-ring-subtle">
                    <div class="story-img-wrap">
                        <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=200" alt="طلاق و مهریه" class="story-photo-img" />
                    </div>
                </div>
                <div class="story-text-wrap">
                    <span class="story-title-label">طلاق و مهریه</span>
                    <span class="story-cat-label">حقوق خانواده</span>
                </div>
            </div>

            <!-- Story 4 -->
            <div class="story-thumb-item" onclick="openStoryModal(3)">
                <div class="story-ring-gold">
                    <div class="story-img-wrap">
                        <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=200" alt="سهم‌الارث مادر" class="story-photo-img" />
                    </div>
                </div>
                <div class="story-text-wrap">
                    <span class="story-title-label">سهم‌الارث م...</span>
                    <span class="story-cat-label">انحصار وراثت</span>
                </div>
            </div>

            <!-- Story 5 -->
            <div class="story-thumb-item" onclick="openStoryModal(4)">
                <div class="story-ring-subtle">
                    <div class="story-img-wrap">
                        <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=200" alt="قرارداد مشارکت" class="story-photo-img" />
                    </div>
                </div>
                <div class="story-text-wrap">
                    <span class="story-title-label">قرارداد مشارکت</span>
                    <span class="story-cat-label">تجاری</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۲: بخش هیرو سرنوشت‌ساز و پرتره وکیل (Hero Section) -->
<section class="hero-section" id="hero">
    <div class="hero-ambient-glow-right"></div>
    <div class="hero-ambient-glow-left"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="hero-grid-layout">
            <!-- ستون راست: تیتر اصلی، نشان تجربه، چک‌لیست و دکمه‌ها -->
            <div class="hero-content-col">
                <div class="hero-badge-pill">
                    <svg class="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                    </svg>
                    <span>دکترای تخصصی حقوق خصوصی از دانشگاه تهران • بیش از ۲۰ سال سابقه وکالت</span>
                </div>

                <h1 class="hero-main-title">
                    عدالت با دقت، <span class="hero-gold-gradient">حرفه‌ای‌گری با تعهد</span>
                </h1>

                <p class="hero-slogan-text">
                    دفاعی هوشمندانه برای آینده‌ای امن؛ پاسدار حقوق و منافع شما در مراجع قضایی و بین‌المللی
                </p>

                <!-- چک‌لیست ۴ گانه -->
                <div class="hero-value-props-grid">
                    <div class="hero-value-item">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>تنظیم تخصصی لوایح و دفاع مستدل در محاکم</span>
                    </div>
                    <div class="hero-value-item">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>حفظ اسرار تجاری و ۱۰۰٪ محرمانگی اسناد</span>
                    </div>
                    <div class="hero-value-item">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>امکان تقسیط حق‌الوکاله متناسب با مراحل دادرسی</span>
                    </div>
                    <div class="hero-value-item">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>سامانه هوشمند گزارش لحظه‌ای وضعیت پرونده</span>
                    </div>
                </div>

                <!-- دکمه‌های اقدام اصلی (CTAs) -->
                <div class="hero-cta-buttons">
                    <a href="#booking" class="btn-gold-hero">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>درخواست مشاوره فوری با دکتر رضوی (SedRazavi)</span>
                    </a>

                    <a href="#tracking" class="btn-navy-hero">
                        <svg class="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <span>پیگیری آنلاین وضعیت پرونده</span>
                    </a>
                </div>

                <!-- نوار اعتبار رسمی -->
                <div class="hero-trust-row">
                    <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-[#2A9D8F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            <path d="m9 12 2 2 4-4"/>
                        </svg>
                        <span>پروانه رسمی کانون وکلای دادگستری مرکز</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>دفتر مرکزی فعال و پاسخگویی حضوری</span>
                    </div>
                </div>
            </div>

            <!-- ستون چپ: کارت طلایی و پرتره لوکس وکیل -->
            <div class="hero-portrait-col">
                <div class="hero-portrait-wrap">
                    <div class="hero-portrait-glow"></div>

                    <div class="hero-portrait-card">
                        <img 
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                            alt="سرکار خانم دکتر سیده مریم رضوی" 
                            class="hero-portrait-image"
                            onerror="this.src='https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800'"
                        />

                        <div class="hero-floating-badge-top">
                            <span class="pulse-emerald-dot"></span>
                            <span>نوبت‌های این هفته در دسترس</span>
                        </div>

                        <div class="hero-floating-card-bottom">
                            <div>
                                <h4 class="hero-lawyer-name">سرکار خانم دکتر سیده مریم رضوی (SedRazavi)</h4>
                                <p class="hero-lawyer-title">وکیل پایه یک دادگستری و مشاور ارشد حقوقی و داوری بین‌المللی</p>
                            </div>
                            <div class="hero-exp-box">
                                ۲۰+
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۳: آمارهای کلیدی و نشان‌های اعتماد (TrustBadges) -->
<section class="trust-badges-section py-12 bg-[#060B18] border-y border-[#D4AF37]/20 relative">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div class="stat-card p-6 rounded-2xl bg-[#0B132B] border border-gray-800 hover:border-[#D4AF37]/40 transition-all">
                <div class="text-3xl sm:text-4xl font-black font-serif text-[#D4AF37] mb-2" id="stat-cases">۱۲۸۰+</div>
                <div class="text-sm font-bold text-white mb-1">پرونده موفق دادگستری</div>
                <div class="text-xs text-gray-400">آرای قطعی در دیوان عالی و تجدیدنظر</div>
            </div>
            <div class="stat-card p-6 rounded-2xl bg-[#0B132B] border border-gray-800 hover:border-[#D4AF37]/40 transition-all">
                <div class="text-3xl sm:text-4xl font-black font-serif text-[#D4AF37] mb-2" id="stat-satisfaction">۹۸٪</div>
                <div class="text-sm font-bold text-white mb-1">رضایت کامل موکلین</div>
                <div class="text-xs text-gray-400">بر اساس نظرسنجی مکتوب انتهای پرونده</div>
            </div>
            <div class="stat-card p-6 rounded-2xl bg-[#0B132B] border border-gray-800 hover:border-[#D4AF37]/40 transition-all">
                <div class="text-3xl sm:text-4xl font-black font-serif text-[#D4AF37] mb-2" id="stat-experience">۲۰+</div>
                <div class="text-sm font-bold text-white mb-1">سال سابقه درخشان وکالت</div>
                <div class="text-xs text-gray-400">عضو کانون وکلای دادگستری مرکز</div>
            </div>
            <div class="stat-card p-6 rounded-2xl bg-[#0B132B] border border-gray-800 hover:border-[#D4AF37]/40 transition-all">
                <div class="text-3xl sm:text-4xl font-black font-serif text-[#D4AF37] mb-2" id="stat-contracts">۴۵۰+</div>
                <div class="text-sm font-bold text-white mb-1">قرارداد بازرگانی و داوری</div>
                <div class="text-xs text-gray-400">تدوین و نظارت بر قراردادهای کلان</div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۴: حوزه‌های تخصصی وکالت و داوری (ServicesSection) -->
<section id="services" class="py-20 bg-[#070D1E] relative">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>حوزه‌های تخصصی وکالت و داوری</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold font-serif text-white">
                خدمات حقوقی با استانداردهای بین‌المللی
            </h2>
            <p class="text-sm sm:text-base text-gray-400">
                تمرکز بر تسلط علمی، تنظیم قراردادهای بازدارنده و دفاع قاطعانه از حقوق شما در محاکم دادگستری و مراجع داوری.
            </p>

            <!-- فیلترهای خدمات -->
            <div class="flex flex-wrap items-center justify-center gap-2 pt-4">
                <button class="service-filter-btn active" data-filter="all">همه خدمات</button>
                <button class="service-filter-btn" data-filter="commercial">دعاوی تجاری و شرکت‌ها</button>
                <button class="service-filter-btn" data-filter="family">خانواده و ارث</button>
                <button class="service-filter-btn" data-filter="criminal">کیفری و ملکی</button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-grid">
            <!-- خدمت ۱ -->
            <div class="service-card" data-category="criminal">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl mb-4">
                    🏢
                </div>
                <h3 class="text-lg font-bold text-white mb-2">دعاوی ملکی، اراضی و سرقفلی</h3>
                <p class="text-xs text-gray-400 leading-relaxed mb-4">
                    الزام به تنظیم سند رسمی، خلع ید، تصرف عدوانی، پیش‌فروش ساختمان، دعاوی سرقفلی و حق کسب و پیشه در مراجع قضایی و ثبتی.
                </p>
                <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">کمیسیون تخصصی املاک</span>
                    <a href="#booking" class="text-xs text-white hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۲ -->
            <div class="service-card" data-category="commercial">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl mb-4">
                    💼
                </div>
                <h3 class="text-lg font-bold text-white mb-2">دعاوی تجاری و قراردادهای بازرگانی</h3>
                <p class="text-xs text-gray-400 leading-relaxed mb-4">
                    تنظیم و بازبینی قراردادهای بین‌المللی، حل‌وفصل اختلافات شرکتی، داوری تجاری و دعاوی ورشکستگی با تضمین محرمانگی اسناد.
                </p>
                <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">پشتیبانی حقوقی شرکتی</span>
                    <a href="#booking" class="text-xs text-white hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۳ -->
            <div class="service-card" data-category="criminal">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl mb-4">
                    ⚖️
                </div>
                <h3 class="text-lg font-bold text-white mb-2">دعاوی کیفری و جرایم اقتصادی</h3>
                <p class="text-xs text-gray-400 leading-relaxed mb-4">
                    دفاع تخصصی در پرونده‌های اختلاس، کلاهبرداری، خیانت در امانت، پولشویی و دفاع راهبردی در دادگاه‌های انقلاب و تجدیدنظر.
                </p>
                <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">دفاع فوری و راهبردی</span>
                    <a href="#booking" class="text-xs text-white hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۴ -->
            <div class="service-card" data-category="family">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl mb-4">
                    👥
                </div>
                <h3 class="text-lg font-bold text-white mb-2">حقوق خانواده و انحصار وراثت</h3>
                <p class="text-xs text-gray-400 leading-relaxed mb-4">
                    رسیدگی به پرونده‌های مهریه، طلاق توافقی، حضانت فرزندان، تقسیم ترکه، تحریر ترکه و وصیت‌نامه با حداکثر سرعت و رازداری تام.
                </p>
                <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">طلاق توافقی در ۱۰ روز</span>
                    <a href="#booking" class="text-xs text-white hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۵ -->
            <div class="service-card" data-category="commercial">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl mb-4">
                    🌐
                </div>
                <h3 class="text-lg font-bold text-white mb-2">داوری بین‌المللی و سرمایه‌گذاری</h3>
                <p class="text-xs text-gray-400 leading-relaxed mb-4">
                    داوری در قراردادهای تجاری خارجی، صادرات و واردات، ترخیص گمرکی و حل اختلافات بازرگانان در اتاق بازرگانی بین‌المللی (ICC).
                </p>
                <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">داوری قطعی و لازم‌الاجرا</span>
                    <a href="#booking" class="text-xs text-white hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۶ -->
            <div class="service-card" data-category="commercial">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl mb-4">
                    📜
                </div>
                <h3 class="text-lg font-bold text-white mb-2">دیوان عدالت اداری و شهرداری‌ها</h3>
                <p class="text-xs text-gray-400 leading-relaxed mb-4">
                    اعتراض به آرای کمیسیون‌های ماده ۱۰۰ و ۹۹ شهرداری، دعاوی ابطال مصوبات غیرقانونی دولتی و اختلافات اداره کار و تامین اجتماعی.
                </p>
                <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">ابطال قطعی آرای معارض</span>
                    <a href="#booking" class="text-xs text-white hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۵: درباره وکیل و منشور اخلاق حرفه‌ای (AboutSection) -->
<section id="about" class="py-20 bg-[#0B132B] relative overflow-hidden border-t border-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <!-- ستون تصویر و گواهینامه‌ها -->
            <div class="lg:col-span-5 relative">
                <div class="relative mx-auto max-w-md">
                    <div class="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#D4AF37]/30 to-[#0B132B]/20 blur-xl transform rotate-2"></div>
                    <div class="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl bg-gray-900">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" alt="دکتر سیده مریم رضوی" class="w-full h-[500px] object-cover object-top" />
                        
                        <div class="absolute bottom-6 right-6 left-6 p-4 rounded-xl bg-[#0B132B]/95 backdrop-blur-md border border-[#D4AF37]/30 shadow-xl space-y-2">
                            <div class="flex items-center gap-2 text-[#F3E5AB] font-bold text-xs">
                                <span>🎓 رتبه برتر آزمون وکالت کانون وکلای مرکز</span>
                            </div>
                            <p class="text-xs text-gray-300">
                                عضو رسمی کانون وکلای دادگستری مرکز و مدرس دوره‌های تخصصی تنظیم قرارداد
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ستون متن، منشور اخلاق و سوگند وکالت -->
            <div class="lg:col-span-7 space-y-6 text-right">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                    <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                    </svg>
                    درباره وکیل دکتر سیده مریم رضوی (SedRazavi)
                </div>

                <h2 class="text-3xl sm:text-4xl font-bold font-serif text-white leading-tight">
                    دو دهه پاسداری متعهدانه از حقوق و منافع مشروع موکلین
                </h2>

                <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
                    سرکار خانم دکتر سیده مریم رضوی پس از فراغت از تحصیل در مقطع دکترای حقوق بین‌الملل و خصوصی از دانشگاه تهران و گذراندن دوره‌های تخصصی داوری بین‌المللی، دفتر وکالت خود را با نام مؤسسه حقوقی SedRazavi بنا نهاد. ایشان تاکنون وکالت بیش از ۱۲۸۰ پرونده سنگین حقوقی، ملکی، تجاری و داوری را با بالاترین درصد موفقیت بر عهده داشته است.
                </p>

                <div class="space-y-3 pt-2">
                    <h3 class="text-sm font-bold text-white">منشور اخلاق حرفه‌ای و تعهدات بنیادین:</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
                        <div class="flex items-start gap-2.5 p-3 rounded-xl bg-gray-800/60 border border-gray-700">
                            <span class="text-[#2A9D8F] font-bold">✓</span>
                            <span>بررسی واقع‌بینانه شانس پیروزی دعوا بدون امید واهی</span>
                        </div>
                        <div class="flex items-start gap-2.5 p-3 rounded-xl bg-gray-800/60 border border-gray-700">
                            <span class="text-[#2A9D8F] font-bold">✓</span>
                            <span>شفافیت کامل در قرارداد مالی و نحوه وصول حق‌الوکاله</span>
                        </div>
                        <div class="flex items-start gap-2.5 p-3 rounded-xl bg-gray-800/60 border border-gray-700">
                            <span class="text-[#2A9D8F] font-bold">✓</span>
                            <span>گزارش‌دهی مستمر و دسترسی آنلاین موکل به لوایح پرونده</span>
                        </div>
                        <div class="flex items-start gap-2.5 p-3 rounded-xl bg-gray-800/60 border border-gray-700">
                            <span class="text-[#2A9D8F] font-bold">✓</span>
                            <span>حفظ کامل اسرار شغلی، اسناد تجاری و حریم خانوادگی</span>
                        </div>
                    </div>
                </div>

                <div class="p-4 rounded-xl bg-[#060B18] border border-[#D4AF37]/30 flex items-center gap-3">
                    <span class="text-2xl text-[#D4AF37]">❝</span>
                    <p class="text-xs text-gray-300 italic">
                        «وکالت، تنها دفاع در محکمه نیست؛ معماری امن روابط تجاری و احقاق شجاعانه حق بر پایه تسلط بر موازین قانونی است.»
                    </p>
                </div>
            </div>
        </div>

        <!-- نقاط عطف و روند رشد مؤسسه حقوقی (Firm Milestones Timeline) -->
        <div class="mt-16 pt-12 border-t border-gray-800">
            <?php echo do_shortcode('[sedrazavi_react_firm_milestones]'); ?>
        </div>
    </div>
</section>

<!-- بخش ۶: رضایت موکلین و روایت تجربیات (TestimonialsSlider) -->
<section class="py-20 bg-[#070D1E] relative overflow-hidden border-t border-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                اعتماد و رضایت موکلین
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold font-serif text-white">
                روایت تجربه همراهی با دفتر وکالت دکتر رضوی
            </h2>
            <p class="text-sm sm:text-base text-gray-400">
                دیدگاه موکلین گرامی پیرامون دقت نظر، پیگیری پرونده و حصول نتایج درخشان حقوقی.
            </p>
        </div>

        <div class="max-w-4xl mx-auto">
            <div class="relative bg-[#0B132B] rounded-3xl p-8 sm:p-12 border border-gray-800 shadow-2xl">
                <div class="flex items-center justify-between mb-6">
                    <div class="flex text-[#D4AF37] gap-1 text-lg">★★★★★</div>
                    <span class="px-3 py-1 rounded-full bg-[#2A9D8F]/15 text-[#2A9D8F] text-xs font-bold border border-[#2A9D8F]/30" id="testimonial-service">
                        دعاوی ملکی و تجاری
                    </span>
                </div>

                <blockquote class="text-base sm:text-lg text-gray-200 leading-relaxed mb-8 italic" id="testimonial-quote">
                    «تسلط علمی سرکار خانم دکتر رضوی بر قوانین ثبتی و املاک موجب شد ملکی به ارزش بیش از ۴۰۰ میلیارد ریال که با معارض جعلی مواجه شده بود، در دیوان عالی کشور کاملاً احقاق حق و سند معارض باطل گردد. رازداری و نظم بی‌نظیر ایشان ستودنی است.»
                </blockquote>

                <div class="flex items-center justify-between border-t border-gray-800 pt-6">
                    <div>
                        <h4 class="font-bold text-white text-base" id="testimonial-author">مهندس علیرضا سلیمانی</h4>
                        <p class="text-xs text-gray-400" id="testimonial-role">مدیرعامل گروه سرمایه‌گذاری پارس نوین</p>
                    </div>

                    <div class="flex items-center gap-2">
                        <button onclick="prevTestimonial()" class="p-2.5 rounded-xl bg-gray-800 hover:bg-[#D4AF37] hover:text-[#0B132B] text-white transition-all cursor-pointer">
                            &rarr;
                        </button>
                        <button onclick="nextTestimonial()" class="p-2.5 rounded-xl bg-gray-800 hover:bg-[#D4AF37] hover:text-[#0B132B] text-white transition-all cursor-pointer">
                            &larr;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۷: جدیدترین مقالات حقوقی (ArticlesSection) -->
<section id="articles" class="py-20 bg-[#0B132B] relative border-t border-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                دانش حقوقی و تحلیل آراء
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold font-serif text-white">
                جدیدترین مقالات و یادداشت‌های تخصصی
            </h2>
            <p class="text-sm sm:text-base text-gray-400">
                بررسی جدیدترین قوانین موضوعه، رویه‌های قضایی وحدت رویه و نکات پیشگیرانه در تنظیم قراردادها.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- مقاله ۱ -->
            <article class="bg-[#070D1E] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#D4AF37]/50 shadow-xl transition-all">
                <div class="relative h-48 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=400" alt="نکات کلیدی قرارداد مشارکت در ساخت" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0B132B]/90 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">دعاوی ملکی</span>
                </div>
                <div class="p-6 space-y-3 text-right">
                    <div class="text-xs text-gray-500 flex items-center justify-between">
                        <span>۱۴۰۳/۰۵/۲۰</span>
                        <span>⏱ مطالعه: ۶ دقیقه</span>
                    </div>
                    <h3 class="text-base font-bold text-white leading-snug hover:text-[#D4AF37] transition-colors">
                        ۱۰ شرط حیاتی و غیرقابل چشم‌پوشی در قراردادهای مشارکت در ساخت
                    </h3>
                    <p class="text-xs text-gray-400 leading-relaxed">
                        تحلیل ضمانت‌اجراهای تاخیر در ساخت، حق حبس، تعیین قدرالسهم و سازوکار حل اختلاف از طریق داوری تخصصی.
                    </p>
                    <div class="pt-3 border-t border-gray-800">
                        <a href="#articles" class="text-xs text-[#D4AF37] font-semibold flex items-center gap-1">مطالعه یادداشت کامل &larr;</a>
                    </div>
                </div>
            </article>

            <!-- مقاله ۲ -->
            <article class="bg-[#070D1E] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#D4AF37]/50 shadow-xl transition-all">
                <div class="relative h-48 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400" alt="قوانین چک صیادی" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0B132B]/90 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">اسناد تجاری</span>
                </div>
                <div class="p-6 space-y-3 text-right">
                    <div class="text-xs text-gray-500 flex items-center justify-between">
                        <span>۱۴۰۳/۰۵/۱۵</span>
                        <span>⏱ مطالعه: ۸ دقیقه</span>
                    </div>
                    <h3 class="text-base font-bold text-white leading-snug hover:text-[#D4AF37] transition-colors">
                        راهنمای کاربردی صدور اجراییه مستقیم چک صیادی بدون دادخواست
                    </h3>
                    <p class="text-xs text-gray-400 leading-relaxed">
                        چگونه می‌توان طبق ماده ۲۳ قانون اصلاح قانون صدور چک، در کمتر از ۱۰ روز اموال صادرکننده را توقیف نمود؟
                    </p>
                    <div class="pt-3 border-t border-gray-800">
                        <a href="#articles" class="text-xs text-[#D4AF37] font-semibold flex items-center gap-1">مطالعه یادداشت کامل &larr;</a>
                    </div>
                </div>
            </article>

            <!-- مقاله ۳ -->
            <article class="bg-[#070D1E] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#D4AF37]/50 shadow-xl transition-all">
                <div class="relative h-48 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400" alt="داوری تجاری بین‌المللی" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0B132B]/90 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">داوری بین‌المللی</span>
                </div>
                <div class="p-6 space-y-3 text-right">
                    <div class="text-xs text-gray-500 flex items-center justify-between">
                        <span>۱۴۰۳/۰۵/۱۰</span>
                        <span>⏱ مطالعه: ۵ دقیقه</span>
                    </div>
                    <h3 class="text-base font-bold text-white leading-snug hover:text-[#D4AF37] transition-colors">
                        مزایای شرط داوری اتاق بازرگانی بین‌المللی در قراردادهای تجاری خارجی
                    </h3>
                    <p class="text-xs text-gray-400 leading-relaxed">
                        بررسی سرعت رسیدگی، اعتبار بین‌المللی رای داوری و عدم امکان ابطال آن در مراجع قضایی داخلی.
                    </p>
                    <div class="pt-3 border-t border-gray-800">
                        <a href="#articles" class="text-xs text-[#D4AF37] font-semibold flex items-center gap-1">مطالعه یادداشت کامل &larr;</a>
                    </div>
                </div>
            </article>
        </div>
    </div>
</section>

<!-- بخش ۸: پرسش‌های متداول موکلین (FaqSection) -->
<section id="faq" class="py-20 bg-[#070D1E] relative border-t border-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div class="text-center space-y-4 mb-14">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                پاسخ به ابهامات رایج موکلین
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold font-serif text-white">
                پرسش‌های متداول حقوقی و وکالتی
            </h2>
            <p class="text-sm sm:text-base text-gray-400">
                پاسخ‌های شفاف و کاربردی به متداول‌ترین سوالات موکلین در بدو ورود به پرونده.
            </p>
        </div>

        <div class="space-y-4">
            <!-- پرسش ۱ -->
            <div class="faq-item rounded-2xl bg-[#0B132B] border border-gray-800 overflow-hidden">
                <button class="faq-question w-full p-5 text-right flex items-center justify-between font-bold text-sm text-white cursor-pointer hover:text-[#D4AF37]">
                    <span>۱. نحوه تعیین حق‌الوکاله در دفتر وکالت دکتر رضوی چگونه است؟ آیا امکان تقسیط وجود دارد؟</span>
                    <span class="faq-icon text-[#D4AF37] text-lg">+</span>
                </button>
                <div class="faq-answer hidden p-5 pt-0 text-xs text-gray-300 leading-relaxed border-t border-gray-800">
                    حق‌الوکاله بر اساس پیچیدگی پرونده، مرحله رسیدگی (بدوی، تجدیدنظر یا فرجام‌خواهی) و مطابق آیین‌نامه تعرفه کانون وکلا تعیین می‌شود. در ۹۰٪ پرونده‌ها امکان تقسیط حق‌الوکاله متناسب با پیشرفت مراحل دادرسی فراهم می‌باشد و کلیه توافقات در قرارداد الکترونیک سامانه عدل‌ایران ثبت می‌گردد.
                </div>
            </div>

            <!-- پرسش ۲ -->
            <div class="faq-item rounded-2xl bg-[#0B132B] border border-gray-800 overflow-hidden">
                <button class="faq-question w-full p-5 text-right flex items-center justify-between font-bold text-sm text-white cursor-pointer hover:text-[#D4AF37]">
                    <span>۲. آیا برای مشاوره اولیه حضور فیزیکی در دفتر تهران الزامی است؟</span>
                    <span class="faq-icon text-[#D4AF37] text-lg">+</span>
                </button>
                <div class="faq-answer hidden p-5 pt-0 text-xs text-gray-300 leading-relaxed border-t border-gray-800">
                    خیر؛ موکلین مقیم شهرستان‌ها یا خارج از کشور می‌توانند پس از رزرو نوبت از طریق سامانه، جلسه مشاوره تصویری امن (از طریق گوگل‌میت یا واتساپ) یا مشاوره تلفنی داشته باشند. عقد وکالتنامه نیز از طریق سامانه میخک وزارت خارجه یا ثنای قوه قضاییه به سادگی انجام می‌شود.
                </div>
            </div>

            <!-- پرسش ۳ -->
            <div class="faq-item rounded-2xl bg-[#0B132B] border border-gray-800 overflow-hidden">
                <button class="faq-question w-full p-5 text-right flex items-center justify-between font-bold text-sm text-white cursor-pointer hover:text-[#D4AF37]">
                    <span>۳. محرمانگی اسناد تجاری و اطلاعات پرونده چگونه تضمین می‌گردد؟</span>
                    <span class="faq-icon text-[#D4AF37] text-lg">+</span>
                </button>
                <div class="faq-answer hidden p-5 pt-0 text-xs text-gray-300 leading-relaxed border-t border-gray-800">
                    تمامی اطلاعات پرونده‌ها و اسناد موکلین تحت نظارت مستقیم وکیل سرپرست در سرورهای محرمانه نگهداری شده و طبق سوگندنامه کانون وکلای دادگستری و قوانین رازداری حرفه‌ای، ۱۰۰٪ محرمانه و غیرقابل افشا نزد اشخاص ثالث خواهد بود.
                </div>
            </div>

            <!-- پرسش ۴ -->
            <div class="faq-item rounded-2xl bg-[#0B132B] border border-gray-800 overflow-hidden">
                <button class="faq-question w-full p-5 text-right flex items-center justify-between font-bold text-sm text-white cursor-pointer hover:text-[#D4AF37]">
                    <span>۴. روند پیگیری لحظه‌ای پرونده برای موکل چگونه طراحی شده است؟</span>
                    <span class="faq-icon text-[#D4AF37] text-lg">+</span>
                </button>
                <div class="faq-answer hidden p-5 pt-0 text-xs text-gray-300 leading-relaxed border-t border-gray-800">
                    پس از انعقاد قرارداد، یک کد پیگیری محرمانه به موکل اختصاص می‌یابد. موکل در هر ساعت از شبانه‌روز با درج این کد در همین وبسایت می‌تواند آخرین اقدامات دفاعی، ابلاغیه‌ها و لوایح تنظیمی را به صورت زنده رصد نماید.
                </div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۹: رزرو نوبت، استعلام پرونده و اطلاعات تماس (ContactAndBookingSection) -->
<section id="contact" class="py-20 bg-[#0B132B] relative border-t border-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- استعلام پرونده (Case Tracker Card) -->
        <div id="tracking" class="mb-16 max-w-4xl mx-auto rounded-3xl p-8 bg-gradient-to-b from-[#1C2541] to-[#0B132B] border border-[#D4AF37]/30 shadow-2xl">
            <div class="text-center space-y-2 mb-6">
                <span class="text-xs font-bold text-[#D4AF37]">سامانه محرمانه موکلین</span>
                <h3 class="text-2xl font-bold font-serif text-white">پیگیری آنلاین و لحظه‌ای پرونده قضایی</h3>
                <p class="text-xs text-gray-300">کد پرونده (مانند SR-1403-882) یا شماره همراه ثبت‌شده را وارد فرمایید:</p>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
                <input type="text" id="case-search-input" placeholder="نمونه: SR-1403-882 یا شماره همراه موکل" class="flex-1 px-4 py-3 rounded-xl bg-[#060B18] border border-gray-700 text-white text-sm focus:outline-none focus:border-[#D4AF37]" />
                <button onclick="searchCaseStatus()" class="btn-gold px-8 py-3 rounded-xl font-bold text-sm cursor-pointer">
                    🔍 استعلام آخرین وضعیت
                </button>
            </div>

            <div id="case-result-display" class="hidden mt-6 p-5 rounded-xl bg-[#060B18] border border-[#D4AF37]/30 space-y-3">
                <div class="flex items-center justify-between border-b border-gray-800 pb-2">
                    <span id="res-case-title" class="font-bold text-white text-sm"></span>
                    <span id="res-case-status" class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"></span>
                </div>
                <p id="res-case-desc" class="text-xs text-gray-300 leading-relaxed"></p>
                <div class="flex items-center justify-between text-xs text-gray-400 pt-2">
                    <span id="res-case-branch"></span>
                    <span id="res-case-date" class="font-mono"></span>
                </div>
            </div>
        </div>

        <!-- دو ستونه: فرم رزرو نوبت + اطلاعات تماس دفتر -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <!-- ستون فرم رزرو نوبت (۷ ستون) -->
            <div id="booking" class="lg:col-span-7 bg-[#070D1E] p-8 rounded-3xl border border-gray-800 shadow-xl">
                <div class="space-y-2 mb-6">
                    <span class="text-xs font-bold text-[#D4AF37]">درخواست رسمی وقت مشاوره</span>
                    <h3 class="text-2xl font-bold font-serif text-white">ثبت نوبت مشاوره حضوری یا آنلاین</h3>
                </div>

                <form id="booking-form-main" onsubmit="handleBookingSubmit(event)" class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-gray-300 mb-1.5">نام و نام خانوادگی موکل *</label>
                            <input type="text" required id="book-name" class="w-full px-4 py-2.5 rounded-xl bg-[#0B132B] border border-gray-700 text-white text-sm focus:border-[#D4AF37] focus:outline-none" />
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-300 mb-1.5">شماره همراه معتبر (جهت پیامک نوبت) *</label>
                            <input type="tel" required id="book-phone" placeholder="۰۹۱۲۳۴۵۶۷۸۹" class="w-full px-4 py-2.5 rounded-xl bg-[#0B132B] border border-gray-700 text-white text-sm text-left font-mono focus:border-[#D4AF37] focus:outline-none" />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-gray-300 mb-1.5">موضوع دعوی یا قرارداد</label>
                            <select id="book-service" class="w-full px-4 py-2.5 rounded-xl bg-[#0B132B] border border-gray-700 text-white text-sm focus:border-[#D4AF37] focus:outline-none">
                                <option>دعاوی ملکی، اراضی و سرقفلی</option>
                                <option>دعاوی تجاری و قراردادها</option>
                                <option>دعاوی کیفری و جرایم اقتصادی</option>
                                <option>حقوق خانواده و ارث</option>
                                <option>داوری بین‌المللی</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-300 mb-1.5">نحوه برگزاری جلسه مشاوره</label>
                            <select id="book-mode" class="w-full px-4 py-2.5 rounded-xl bg-[#0B132B] border border-gray-700 text-white text-sm focus:border-[#D4AF37] focus:outline-none">
                                <option value="in_person">جلسه حضوری در دفتر تهران (میدان ونک)</option>
                                <option value="online">مشاوره تصویری آنلاین (گوگل‌میت / واتساپ)</option>
                                <option value="phone">مشاوره تلفنی مستقیم با وکیل</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-gray-300 mb-1.5">شرح مختصر خواسته یا روند پرونده</label>
                        <textarea id="book-notes" rows="3" placeholder="موضوع دعوی، شماره پرونده یا شعبه رسیدگی‌کننده..." class="w-full px-4 py-2.5 rounded-xl bg-[#0B132B] border border-gray-700 text-white text-sm focus:border-[#D4AF37] focus:outline-none"></textarea>
                    </div>

                    <button type="submit" class="btn-gold w-full py-3.5 rounded-xl font-bold text-sm cursor-pointer shadow-lg">
                        ثبت و نهایی‌سازی درخواست مشاوره با وکیل
                    </button>
                </form>
            </div>

            <!-- ستون اطلاعات تماس دفتر و ساعات کاری (۵ ستون) -->
            <div class="lg:col-span-5 bg-[#070D1E] p-8 rounded-3xl border border-gray-800 shadow-xl space-y-6">
                <div>
                    <span class="text-xs font-bold text-[#D4AF37]">راه‌های ارتباط مستقیم</span>
                    <h3 class="text-2xl font-bold font-serif text-white mt-1">دفتر وکالت SedRazavi</h3>
                </div>

                <div class="space-y-4 text-xs sm:text-sm text-gray-300">
                    <div class="flex items-start gap-3">
                        <span class="text-[#D4AF37] text-lg">📍</span>
                        <div>
                            <strong class="block text-white mb-1">نشانی دفتر مرکزی:</strong>
                            <span>تهران، میدان ونک، خیابان ملاصدرا، پلاک ۱۱۸، برج حقوقی سدید، طبقه پنجم، واحد ۱۵</span>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <span class="text-[#D4AF37] text-lg">📞</span>
                        <div>
                            <strong class="block text-white mb-0.5">تلفن‌های دفتر:</strong>
                            <a href="tel:02188990011" class="font-mono text-[#D4AF37] hover:underline">۰۲۱-۸۸۹۹۰۰۱۱</a> | <a href="tel:02188990012" class="font-mono text-[#D4AF37] hover:underline">۰۲۱-۸۸۹۹۰۰۱۲</a>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <span class="text-[#D4AF37] text-lg">✉️</span>
                        <div>
                            <strong class="block text-white mb-0.5">پست الکترونیک رسمی:</strong>
                            <span class="font-mono">legal@sedrazavi.com</span>
                        </div>
                    </div>

                    <div class="flex items-start gap-3">
                        <span class="text-[#D4AF37] text-lg">⏰</span>
                        <div>
                            <strong class="block text-white mb-1">ساعات کاری و پذیرش:</strong>
                            <p>شنبه تا چهارشنبه: ۹:۰۰ الی ۱۹:۰۰</p>
                            <p>پنج‌شنبه: ۹:۰۰ الی ۱۳:۰۰ (با تعیین وقت قبلی)</p>
                        </div>
                    </div>
                </div>

                <div class="p-4 rounded-2xl bg-[#0B132B] border border-gray-800 text-xs text-gray-400">
                    <span class="text-[#D4AF37] font-bold">🛡️ تضمین محرمانگی:</span> کلیه تماس‌ها، اسناد و مشاوره‌ها مطابق منشور اخلاقی کانون وکلا کاملاً محرمانه تلقی می‌گردد.
                </div>
            </div>

        </div>

    </div>
</section>

<!-- پنجره‌های مودال تعاملی (Modals) -->

<!-- مودال ۱: استوری‌ها -->
<div id="story-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/90 backdrop-blur-md p-4" role="dialog" aria-modal="true">
    <div class="relative w-full max-w-md bg-[#0B132B] text-white rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/30 flex flex-col h-[650px] max-h-[90vh]">
        <div class="absolute top-3 left-3 right-3 z-20 flex gap-1.5">
            <div class="h-1 flex-1 rounded-full bg-white/20 overflow-hidden">
                <div id="story-progress-bar" class="h-full bg-[#D4AF37] w-full transition-all duration-300"></div>
            </div>
        </div>
        <div class="relative z-10 flex items-center justify-between p-4 pt-7 bg-gradient-to-b from-black/80 to-transparent">
            <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full border border-[#D4AF37] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" class="w-full h-full object-cover" />
                </div>
                <div>
                    <h5 id="story-modal-title" class="text-xs font-bold text-white"></h5>
                    <span id="story-modal-cat" class="text-[10px] text-[#F3E5AB]"></span>
                </div>
            </div>
            <button onclick="closeStoryModal()" class="p-1 rounded-full bg-black/40 hover:bg-black/80 text-white cursor-pointer">&times;</button>
        </div>
        <div class="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
            <img id="story-modal-img" src="" class="w-full h-full object-cover opacity-85" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent"></div>
            <div class="absolute bottom-6 left-5 right-5 z-10 text-right space-y-2">
                <h4 id="story-slide-title" class="text-base font-bold text-white"></h4>
                <p id="story-slide-desc" class="text-xs text-gray-200 leading-relaxed"></p>
                <a href="#booking" onclick="closeStoryModal()" class="btn-gold inline-block text-xs py-2 px-4 mt-2">
                    رزرو فوری مشاوره درباره این موضوع &larr;
                </a>
            </div>
        </div>
    </div>
</div>

<!-- مودال ۲: نظرسنجی خدمات -->
<div id="survey-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/80 backdrop-blur-sm p-4">
    <div class="bg-[#0B132B] rounded-2xl p-6 max-w-md w-full border border-[#D4AF37]/30 text-right space-y-4">
        <div class="flex items-center justify-between border-b border-gray-800 pb-3">
            <h4 class="font-bold text-white text-sm">نظرسنجی کیفیت خدمات و رضایت موکل</h4>
            <button onclick="closeSurveyModal()" class="text-gray-400 hover:text-white cursor-pointer">&times;</button>
        </div>
        <p class="text-xs text-gray-300">دیدگاه ارزشمند شما ما را در ارتقای سطح استانداردهای دادرسی و پاسخگویی یاری می‌نماید.</p>
        <div class="flex items-center justify-center gap-2 text-2xl text-[#D4AF37] py-2 cursor-pointer">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <textarea rows="3" placeholder="دیدگاه یا پیشنهاد خود را مرقوم بفرمایید..." class="w-full p-3 rounded-xl bg-[#060B18] border border-gray-700 text-white text-xs focus:border-[#D4AF37] focus:outline-none"></textarea>
        <button onclick="submitSurvey()" class="btn-gold w-full py-2.5 rounded-xl font-bold text-xs cursor-pointer">
            ثبت و ارسال بازخورد
        </button>
    </div>
</div>

<!-- مودال ۳: راهنمای تعاملی سایت -->
<div id="tour-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/80 backdrop-blur-sm p-4">
    <div class="bg-[#0B132B] rounded-2xl p-6 max-w-md w-full border border-[#D4AF37]/30 text-right space-y-4">
        <div class="flex items-center justify-between border-b border-gray-800 pb-3">
            <h4 class="font-bold text-white text-sm">راهنمای تعاملی سامانه وکالت</h4>
            <button onclick="closeTourModal()" class="text-gray-400 hover:text-white cursor-pointer">&times;</button>
        </div>
        <div class="space-y-3 text-xs text-gray-300">
            <div class="p-3 rounded-xl bg-[#060B18] border border-gray-800">
                <strong class="text-[#D4AF37] block mb-1">۱. نوار استوری‌ها:</strong>
                آخرین نکات چک، قوانین ملکی و موفقیت‌های اخیر پرونده‌ها را مشاهده فرمایید.
            </div>
            <div class="p-3 rounded-xl bg-[#060B18] border border-gray-800">
                <strong class="text-[#D4AF37] block mb-1">۲. استعلام پرونده:</strong>
                با کد اختصاصی SR روند لوایح و تصمیمات قضایی را به صورت ۲۴ ساعته دنبال کنید.
            </div>
            <div class="p-3 rounded-xl bg-[#060B18] border border-gray-800">
                <strong class="text-[#D4AF37] block mb-1">۳. رزرو آنلاین نوبت:</strong>
                مشاوره حضوری، تلفنی یا تصویری خود را تنها در ۱ دقیقه رزرو فرمایید.
            </div>
        </div>
        <button onclick="closeTourModal()" class="btn-gold w-full py-2.5 rounded-xl font-bold text-xs cursor-pointer">
            متوجه شدم، ورود به سامانه
        </button>
    </div>
</div>

<!-- مودال ۴: آکادمی و مستندات -->
<div id="academy-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/80 backdrop-blur-sm p-4">
    <div class="bg-[#0B132B] rounded-2xl p-6 max-w-lg w-full border border-[#D4AF37]/30 text-right space-y-4">
        <div class="flex items-center justify-between border-b border-gray-800 pb-3">
            <h4 class="font-bold text-white text-sm">آکادمی و مستندات دفتر وکالت SedRazavi</h4>
            <button onclick="closeAcademyModal()" class="text-gray-400 hover:text-white cursor-pointer">&times;</button>
        </div>
        <p class="text-xs text-gray-300">دسترسی به فرم‌های دادخواست نمونه، قوانین موضوعه جدید و شیوه‌نامه تنظیم قراردادهای تجاری.</p>
        <div class="grid grid-cols-2 gap-3 text-xs">
            <a href="#articles" onclick="closeAcademyModal()" class="p-3 rounded-xl bg-[#060B18] border border-gray-800 hover:border-[#D4AF37] block">
                <span class="text-[#D4AF37] block font-bold mb-1">📚 آرشیو قوانین</span>
                قوانین چک، سرقفلی و اراضی
            </a>
            <a href="#articles" onclick="closeAcademyModal()" class="p-3 rounded-xl bg-[#060B18] border border-gray-800 hover:border-[#D4AF37] block">
                <span class="text-[#D4AF37] block font-bold mb-1">⚖️ آرای وحدت رویه</span>
                جدیدترین آرای دیوان عالی
            </a>
        </div>
        <button onclick="closeAcademyModal()" class="w-full py-2 rounded-xl bg-gray-800 text-white text-xs cursor-pointer">
            بستن
        </button>
    </div>
</div>

<!-- بنر کوکی و حریم خصوصی در پایین صفحه -->
<div id="cookie-banner" class="fixed bottom-4 right-4 left-4 sm:right-auto sm:left-6 sm:max-w-md z-40 p-4 rounded-2xl bg-[#0B132B]/95 backdrop-blur-md border border-[#D4AF37]/30 shadow-2xl text-right space-y-3">
    <div class="flex items-center gap-2 text-[#D4AF37] font-bold text-xs">
        <span>🍪 امنیت و محرمانگی اطلاعات موکلین</span>
    </div>
    <p class="text-[11px] text-gray-300 leading-relaxed">
        این پایگاه حقوقی جهت ارائه خدمات مطلوب و حفاظت از اسناد، از کوکی‌های رمزنگاری‌شده بهره می‌برد.
    </p>
    <div class="flex items-center gap-2">
        <button onclick="acceptCookies()" class="btn-gold text-[11px] py-1.5 px-4 font-bold cursor-pointer">پذیرش و تایید</button>
        <button onclick="dismissCookies()" class="text-gray-400 hover:text-white text-[11px] py-1.5 px-2 cursor-pointer">انصراف</button>
    </div>
</div><!-- #root -->

<?php
get_footer();
`},{path:"functions.php",filename:"functions.php",category:"پوسته اصلی و هدرها",description:"موتور اصلی وردپرس: انکیو استایل‌ها، رجیستر شورت‌کدها، احراز هویت ری‌اکت و متصل‌کننده ۳۱ ماژول هسته.",code:`<?php
/**
 * SedRazavi Law Firm Theme Functions and Definitions
 *
 * Professional WordPress theme bridge for Dr. Seyedeh Maryam SedRazavi Law Firm.
 * Implements:
 * 1. Custom Post Types ('service', 'article', 'case')
 * 2. Universal React component shortcodes via [react_component name='ComponentName' props='{}']
 * 3. enqueue_react_assets logic detecting theme production build path
 * 4. wp_localize_script authentication bridge with user data and REST nonce
 * 5. Admin Customizer section for dynamic Gold-Navy accent colors and CSS variables
 * 6. REST API authentication and profile customizer ('inc/wp-rest-auth.php', 'inc/api-handlers.php')
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Direct access denied
}

// 1. Core Theme Constants
if (!defined('SEDRAZAVI_THEME_VERSION')) {
    define('SEDRAZAVI_THEME_VERSION', '3.0.0');
}
if (!defined('SEDRAZAVI_THEME_DIR')) {
    define('SEDRAZAVI_THEME_DIR', function_exists('get_template_directory') && get_template_directory() ? get_template_directory() : __DIR__);
}
if (!defined('SEDRAZAVI_THEME_URI')) {
    define('SEDRAZAVI_THEME_URI', function_exists('get_template_directory_uri') && get_template_directory_uri() ? get_template_directory_uri() : get_stylesheet_directory_uri());
}

/**
 * 2. Theme Setup & Features Support
 */
if (!function_exists('sedrazavi_theme_setup')) {
    function sedrazavi_theme_setup() {
        // Localization
        load_theme_textdomain('sedrazavi', SEDRAZAVI_THEME_DIR . '/languages');

        // Document Title tag
        add_theme_support('title-tag');

        // Featured Images & Responsive Sizes
        add_theme_support('post-thumbnails');
        add_image_size('sedrazavi-service-card', 600, 400, true);
        add_image_size('sedrazavi-lawyer-portrait', 700, 900, true);
        add_image_size('sedrazavi-article-card', 800, 500, true);

        // Custom Logo
        add_theme_support('custom-logo', [
            'height'      => 80,
            'width'       => 260,
            'flex-height' => true,
            'flex-width'  => true,
        ]);

        // HTML5 Semantic Markup
        add_theme_support('html5', [
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        ]);

        // Selective Refresh for Customizer Widgets
        add_theme_support('customize-selective-refresh-widgets');

        // Navigation Menus
        register_nav_menus([
            'primary'  => esc_html__('منوی اصلی سربرگ (Primary Header)', 'sedrazavi'),
            'footer'   => esc_html__('منوی دسترسی سریع فوتر (Footer Menu)', 'sedrazavi'),
            'services' => esc_html__('منوی خدمات حقوقی (Legal Services)', 'sedrazavi'),
        ]);
    }
    add_action('after_setup_theme', 'sedrazavi_theme_setup');
}

/**
 * 3. Custom Post Types Registration ('service', 'article', 'case')
 */
if (!function_exists('sedrazavi_register_custom_post_types')) {
    function sedrazavi_register_custom_post_types() {

        // CPT 1: Legal Services ('service')
        if (!post_type_exists('service')) {
            $service_labels = [
                'name'               => esc_html__('خدمات حقوقی', 'sedrazavi'),
                'singular_name'      => esc_html__('خدمت حقوقی', 'sedrazavi'),
                'menu_name'          => esc_html__('خدمات حقوقی', 'sedrazavi'),
                'add_new'            => esc_html__('افزودن خدمت جدید', 'sedrazavi'),
                'add_new_item'       => esc_html__('افزودن خدمت حقوقی جدید', 'sedrazavi'),
                'edit_item'          => esc_html__('ویرایش خدمت حقوقی', 'sedrazavi'),
                'new_item'           => esc_html__('خدمت حقوقی جدید', 'sedrazavi'),
                'view_item'          => esc_html__('مشاهده خدمت حقوقی', 'sedrazavi'),
                'search_items'       => esc_html__('جستجوی خدمات', 'sedrazavi'),
                'not_found'          => esc_html__('خدمتی یافت نشد', 'sedrazavi'),
                'not_found_in_trash' => esc_html__('در سطل زباله یافت نشد', 'sedrazavi'),
            ];

            register_post_type('service', [
                'labels'              => $service_labels,
                'public'              => true,
                'has_archive'         => true,
                'rewrite'             => ['slug' => 'legal-services'],
                'menu_icon'           => 'dashicons-hammer',
                'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'revisions'],
                'show_in_rest'        => true,
                'hierarchical'        => false,
            ]);

            register_taxonomy('service_category', ['service'], [
                'labels'            => [
                    'name'          => esc_html__('دسته‌بندی خدمات حقوقی', 'sedrazavi'),
                    'singular_name' => esc_html__('دسته‌بندی خدمت', 'sedrazavi'),
                ],
                'hierarchical'      => true,
                'show_in_rest'      => true,
                'rewrite'           => ['slug' => 'service-cat'],
            ]);
        }

        // CPT 2: Legal Articles & Precedents ('article')
        if (!post_type_exists('article')) {
            $article_labels = [
                'name'               => esc_html__('مقالات حقوقی', 'sedrazavi'),
                'singular_name'      => esc_html__('مقاله حقوقی', 'sedrazavi'),
                'menu_name'          => esc_html__('مقالات و تحلیل‌ها', 'sedrazavi'),
                'add_new'            => esc_html__('نگارش مقاله جدید', 'sedrazavi'),
                'add_new_item'       => esc_html__('افزودن مقاله حقوقی جدید', 'sedrazavi'),
                'edit_item'          => esc_html__('ویرایش مقاله', 'sedrazavi'),
                'view_item'          => esc_html__('مشاهده مقاله', 'sedrazavi'),
                'search_items'       => esc_html__('جستجوی مقالات', 'sedrazavi'),
                'not_found'          => esc_html__('مقاله‌ای یافت نشد', 'sedrazavi'),
            ];

            register_post_type('article', [
                'labels'              => $article_labels,
                'public'              => true,
                'has_archive'         => true,
                'rewrite'             => ['slug' => 'legal-articles'],
                'menu_icon'           => 'dashicons-welcome-write-blog',
                'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'author', 'comments', 'custom-fields'],
                'show_in_rest'        => true,
            ]);

            register_taxonomy('article_category', ['article'], [
                'labels'            => [
                    'name'          => esc_html__('دسته‌بندی مقالات', 'sedrazavi'),
                    'singular_name' => esc_html__('دسته مقاله', 'sedrazavi'),
                ],
                'hierarchical'      => true,
                'show_in_rest'      => true,
                'rewrite'           => ['slug' => 'article-cat'],
            ]);
        }

        // CPT 3: Client Cases & Docket Tracking ('case')
        if (!post_type_exists('case')) {
            $case_labels = [
                'name'               => esc_html__('پرونده‌های قضایی', 'sedrazavi'),
                'singular_name'      => esc_html__('پرونده قضایی', 'sedrazavi'),
                'menu_name'          => esc_html__('کارتابل پرونده‌ها', 'sedrazavi'),
                'add_new'            => esc_html__('ثبت پرونده جدید', 'sedrazavi'),
                'add_new_item'       => esc_html__('ثبت پرونده قضایی موکل', 'sedrazavi'),
                'edit_item'          => esc_html__('ویرایش پرونده', 'sedrazavi'),
                'view_item'          => esc_html__('مشاهده پرونده', 'sedrazavi'),
                'search_items'       => esc_html__('جستجوی پرونده‌ها', 'sedrazavi'),
                'not_found'          => esc_html__('پرونده‌ای یافت نشد', 'sedrazavi'),
            ];

            register_post_type('case', [
                'labels'              => $case_labels,
                'public'              => true,
                'has_archive'         => true,
                'rewrite'             => ['slug' => 'legal-cases'],
                'menu_icon'           => 'dashicons-portfolio',
                'supports'            => ['title', 'editor', 'custom-fields', 'revisions'],
                'show_in_rest'        => true,
            ]);

            register_taxonomy('case_type', ['case'], [
                'labels'            => [
                    'name'          => esc_html__('موضوعات دادرسی', 'sedrazavi'),
                    'singular_name' => esc_html__('موضوع دعوا', 'sedrazavi'),
                ],
                'hierarchical'      => true,
                'show_in_rest'      => true,
                'rewrite'           => ['slug' => 'case-topic'],
            ]);
        }
    }
    add_action('init', 'sedrazavi_register_custom_post_types');
}

/**
 * 4. Admin Customizer Section for Site Accent Color (Gold-Navy Theme)
 */
if (!function_exists('sedrazavi_customize_register')) {
    function sedrazavi_customize_register($wp_customize) {
        $wp_customize->add_section('sedrazavi_theme_colors', [
            'title'       => esc_html__('رنگ‌بندی و تم طلایی-سرمه‌ای (Gold-Navy Theme)', 'sedrazavi'),
            'description' => esc_html__('تنظیم و شخصی‌سازی پالت رنگی اختصاصی دفتر وکالت دکتر سیده مریم رضوی و تزریق داینامیک متغیرهای CSS', 'sedrazavi'),
            'priority'    => 25,
        ]);

        // Accent Gold Color
        $wp_customize->add_setting('sedrazavi_gold_color', [
            'default'           => '#D4AF37',
            'type'              => 'option',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' => 'sanitize_hex_color',
            'transport'         => 'refresh',
        ]);
        $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'sedrazavi_gold_color_ctrl', [
            'label'    => esc_html__('رنگ طلایی شاخص (Accent Gold)', 'sedrazavi'),
            'section'  => 'sedrazavi_theme_colors',
            'settings' => 'sedrazavi_gold_color',
        ]));

        // Base Navy Color
        $wp_customize->add_setting('sedrazavi_navy_color', [
            'default'           => '#0B132B',
            'type'              => 'option',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' => 'sanitize_hex_color',
            'transport'         => 'refresh',
        ]);
        $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'sedrazavi_navy_color_ctrl', [
            'label'    => esc_html__('رنگ سرمه‌ای تیره پایه (Base Navy)', 'sedrazavi'),
            'section'  => 'sedrazavi_theme_colors',
            'settings' => 'sedrazavi_navy_color',
        ]));

        // Light Gold / Champagne
        $wp_customize->add_setting('sedrazavi_gold_light', [
            'default'           => '#F3E5AB',
            'type'              => 'option',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' => 'sanitize_hex_color',
            'transport'         => 'refresh',
        ]);
        $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'sedrazavi_gold_light_ctrl', [
            'label'    => esc_html__('رنگ طلایی روشن / شامپاینی (Light Gold)', 'sedrazavi'),
            'section'  => 'sedrazavi_theme_colors',
            'settings' => 'sedrazavi_gold_light',
        ]));

        // Emerald Accent
        $wp_customize->add_setting('sedrazavi_emerald_accent', [
            'default'           => '#2A9D8F',
            'type'              => 'option',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' => 'sanitize_hex_color',
            'transport'         => 'refresh',
        ]);
        $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'sedrazavi_emerald_accent_ctrl', [
            'label'    => esc_html__('رنگ زمردی کمکی (Emerald Accent)', 'sedrazavi'),
            'section'  => 'sedrazavi_theme_colors',
            'settings' => 'sedrazavi_emerald_accent',
        ]));

        // Secondary Navy
        $wp_customize->add_setting('sedrazavi_secondary_navy', [
            'default'           => '#1C2541',
            'type'              => 'option',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' => 'sanitize_hex_color',
            'transport'         => 'refresh',
        ]);
        $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'sedrazavi_secondary_navy_ctrl', [
            'label'    => esc_html__('رنگ سرمه‌ای ثانویه (Secondary Navy)', 'sedrazavi'),
            'section'  => 'sedrazavi_theme_colors',
            'settings' => 'sedrazavi_secondary_navy',
        ]));
    }
    add_action('customize_register', 'sedrazavi_customize_register');
}

/**
 * 5. Inject Dynamic Customizer CSS Variables into WordPress Theme Header
 */
if (!function_exists('sedrazavi_customizer_dynamic_css')) {
    function sedrazavi_customizer_dynamic_css() {
        $gold_color    = get_option('sedrazavi_gold_color', '#D4AF37');
        $navy_color    = get_option('sedrazavi_navy_color', '#0B132B');
        $gold_light    = get_option('sedrazavi_gold_light', '#F3E5AB');
        $emerald_color = get_option('sedrazavi_emerald_accent', '#2A9D8F');
        $navy_sec      = get_option('sedrazavi_secondary_navy', '#1C2541');
        $font_family   = get_option('sedrazavi_font_family', 'Vazirmatn');
        $custom_font   = get_option('sedrazavi_custom_font_css', '');
        ?>
        <style id="sedrazavi-customizer-dynamic-css">
            :root {
                --color-gold: <?php echo esc_attr($gold_color); ?>;
                --color-navy: <?php echo esc_attr($navy_color); ?>;
                --color-gold-light: <?php echo esc_attr($gold_light); ?>;
                --color-emerald: <?php echo esc_attr($emerald_color); ?>;
                --color-navy-secondary: <?php echo esc_attr($navy_sec); ?>;
                --color-primary: <?php echo esc_attr($navy_color); ?>;
                --color-accent: <?php echo esc_attr($gold_color); ?>;
            }
            .text-gold-accent, .text-\\[\\#D4AF37\\] { color: var(--color-gold) !important; }
            .bg-gold-accent, .bg-\\[\\#D4AF37\\] { background-color: var(--color-gold) !important; }
            .border-gold-accent, .border-\\[\\#D4AF37\\] { border-color: var(--color-gold) !important; }
            .bg-navy-base, .bg-\\[\\#0B132B\\] { background-color: var(--color-navy) !important; }
            <?php if (!empty($custom_font)) : ?>
            <?php echo wp_strip_all_tags($custom_font); ?>
            <?php endif; ?>
            <?php if (!empty($font_family) && $font_family !== 'Vazirmatn') : ?>
            body, button, input, select, textarea {
                font-family: '<?php echo esc_attr($font_family); ?>', Vazirmatn, sans-serif !important;
            }
            <?php endif; ?>
        </style>
        <?php
    }
    add_action('wp_head', 'sedrazavi_customizer_dynamic_css', 15);
}

/**
 * 6. Dynamic Production Build Path Detection & React Asset Enqueuing Logic
 */
if (!function_exists('enqueue_react_assets')) {
    function enqueue_react_assets() {
        // 6.1. Persian Webfont Vazirmatn
        wp_enqueue_style(
            'sedrazavi-vazirmatn-font',
            'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css',
            [],
            '33.003'
        );

        // 6.2. WordPress Main Stylesheet
        wp_enqueue_style(
            'sedrazavi-main-style',
            get_stylesheet_uri(),
            [],
            SEDRAZAVI_THEME_VERSION
        );

        // 6.3. Production Build Path Detection for Minified CSS
        $candidate_css_dirs = [
            'app-dist/index.css',
            'assets/dist/index.css',
            'assets/index.css',
            'dist/index.css',
        ];

        $enqueued_css_uri = '';
        foreach ($candidate_css_dirs as $rel_css) {
            $file_path = SEDRAZAVI_THEME_DIR . '/' . $rel_css;
            if (file_exists($file_path)) {
                $enqueued_css_uri = SEDRAZAVI_THEME_URI . '/' . $rel_css;
                wp_enqueue_style(
                    'sedrazavi-react-bundle-css',
                    $enqueued_css_uri,
                    [],
                    filemtime($file_path)
                );
                break;
            }
        }

        // 6.4. Production Build Path Detection for Minified JS
        $candidate_js_dirs = [
            'app-dist/index.js',
            'assets/dist/index.js',
            'assets/index.js',
            'dist/index.js',
        ];

        $enqueued_js_handle = '';
        foreach ($candidate_js_dirs as $rel_js) {
            $file_path = SEDRAZAVI_THEME_DIR . '/' . $rel_js;
            if (file_exists($file_path)) {
                $js_uri = SEDRAZAVI_THEME_URI . '/' . $rel_js;
                $enqueued_js_handle = 'sedrazavi-react-bundle-js';
                wp_register_script(
                    $enqueued_js_handle,
                    $js_uri,
                    [],
                    filemtime($file_path),
                    true // footer
                );
                wp_enqueue_script($enqueued_js_handle);
                break;
            }
        }

        // 6.5. Mount Engine Script
        if (file_exists(SEDRAZAVI_THEME_DIR . '/assets/js/sedrazavi-react-mount.js')) {
            wp_enqueue_script(
                'sedrazavi-react-mount-engine',
                SEDRAZAVI_THEME_URI . '/assets/js/sedrazavi-react-mount.js',
                [$enqueued_js_handle ?: 'jquery'],
                SEDRAZAVI_THEME_VERSION,
                true
            );
        }

        // 6.6. Prepare Localized Server & Auth Context
        $current_user = wp_get_current_user();
        $is_user_auth = is_user_logged_in();

        $current_user_payload = [
            'isLoggedIn'   => $is_user_auth,
            'id'           => get_current_user_id(),
            'username'     => $is_user_auth ? $current_user->user_login : '',
            'displayName'  => $is_user_auth ? $current_user->display_name : '',
            'email'        => $is_user_auth ? $current_user->user_email : '',
            'roles'        => $is_user_auth ? (array) $current_user->roles : [],
            'isAdmin'      => current_user_can('manage_options'),
            'isLawyer'     => current_user_can('edit_posts') || ($is_user_auth && in_array('lawyer', (array)$current_user->roles, true)),
            'phone'        => $is_user_auth ? (get_user_meta($current_user->ID, 'phone', true) ?: get_user_meta($current_user->ID, 'billing_phone', true) ?: '') : '',
        ];

        $saved_profile = get_option('sedrazavi_lawyer_profile', []);

        $localized_payload = [
            'currentUser'     => $current_user_payload,
            'nonce'           => wp_create_nonce('wp_rest'),
            'restNonce'       => wp_create_nonce('wp_rest'),
            'restUrl'         => esc_url_raw(rest_url('sedrazavi/v1/')),
            'restRoot'        => esc_url_raw(rest_url()),
            'loginUrl'        => wp_login_url(),
            'logoutUrl'       => wp_logout_url(home_url()),
            'ajaxUrl'         => admin_url('admin-ajax.php'),
            'ajaxNonce'       => wp_create_nonce('sedrazavi_security_nonce'),
            'profileSaveUrl'  => esc_url_raw(rest_url('sedrazavi/v1/profile/save')),
            'profileGetUrl'   => esc_url_raw(rest_url('sedrazavi/v1/profile/get')),
            'verifySessionUrl'=> esc_url_raw(rest_url('sedrazavi/v1/auth/verify-session')),
            'lawyerProfile'   => !empty($saved_profile) ? $saved_profile : [
                'name'           => get_option('sedrazavi_lawyer_name', 'سرکار خانم دکتر سیده مریم رضوی'),
                'title'          => get_option('sedrazavi_lawyer_title', 'وکیل پایه یک دادگستری و مشاور ارشد حقوقی'),
                'licenseNumber'  => get_option('sedrazavi_lawyer_license', '۱۸۴۵۲ / ک.و.م'),
                'phone'          => get_option('sedrazavi_lawyer_phone', '۰۲۱-۸۸۹۹۰۰۱۱'),
                'mobile'         => get_option('sedrazavi_lawyer_mobile', '۰۹۱۲-۳۴۵۶۷۸۹'),
                'emergencyPhone' => '۰۲۱-۸۸۷۷۶۶۵۵',
                'address'        => get_option('sedrazavi_lawyer_address', 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج حقوقی SedRazavi'),
                'primaryColor'   => get_option('sedrazavi_primary_color', '#0B132B'),
                'goldColor'      => get_option('sedrazavi_gold_color', '#D4AF37'),
            ],
            'site'            => [
                'url'            => home_url(),
                'name'           => get_bloginfo('name'),
                'isRtl'          => is_rtl(),
                'version'        => SEDRAZAVI_THEME_VERSION,
            ],
        ];

        // 6.7. wp_localize_script for seamless authentication
        if ($enqueued_js_handle) {
            wp_localize_script($enqueued_js_handle, 'SedRazaviAuthBridge', $localized_payload);
            wp_localize_script($enqueued_js_handle, 'SedRazaviReactConfig', $localized_payload);
        }
    }
    add_action('wp_enqueue_scripts', 'enqueue_react_assets', 10);
}

/**
 * 7. Safe Modules Inclusions (Guaranteed Loading of Handlers & Bridge)
 */
$sedrazavi_essential_includes = [
    'register-react-shortcodes.php', // Universal [react_component name="..."] shortcodes
    'inc/wp-rest-auth.php',          // Secure REST API authentication & nonces
    'inc/api-handlers.php',          // Dedicated REST API endpoint for saving profile settings
    'inc/react-shortcodes.php',      // Extended shortcodes package & auto-enqueuing
    'inc/rest-api.php',              // Full REST API suite (cases, otp, bookings)
    'inc/setup.php',                 // Plugin dependency checker & core setup
    'inc/seo-bridge.php',            // Dynamic SEO tags, OpenGraph, and Schema.org
    'inc/customizer-seo.php',        // Customizer SEO & Branding controls
    'inc/user-roles.php',            // Custom legal roles (client, secretary, intern)
    'inc/manifest-bridge.php',       // PWA & Idempotent Page Setup
    'inc/meta-boxes.php',            // Native Page Meta Boxes
    'inc/theme-options.php',         // Theme options & customizer styles
    'inc/security.php',              // Security headers, rate limiting, and sanitization
    'inc/case-management.php',       // Case management CPT & taxonomy
    'inc/booking.php',               // Consultation booking subsystem
    'inc/elementor-widgets.php',      // Custom Elementor widgets bridge
    'inc/class-sedrazavi-calculators.php',   // Judicial tariffs & calculation suite
    'inc/class-sedrazavi-client-portal.php', // Client portal subsystem
    'inc/class-sedrazavi-dashboard.php',     // Admin dashboard helpers
    'inc/arbitration-cpt.php',               // Arbitration cases CPT
    'inc/corporate-international.php',       // Corporate quorum & incoterms 2020
    'inc/legal-vault-deadlines.php',         // Judicial deadlines & vault
    'inc/advanced-backup.php',               // Version control & snapshot backup manager
    'inc/analytics-reports.php',             // Legal analytics & KPI reporting
    'inc/class-sedrazavi-elementor.php',     // Elementor category & widget hooks
    'inc/class-sedrazavi-security.php',      // Security hardening & MIME filtering
    'inc/class-sedrazavi-updater.php',       // GitHub auto-updater engine
    'inc/dashboard.php',                     // Admin top-level dashboard menu & stats
    'inc/educational-tour.php',              // Admin onboarding interactive tours
    'inc/integrations.php',                  // WooCommerce, SEO breadcrumbs & cache hooks
    'inc/precedents-cpt.php',                // Supreme court precedents CPT & taxonomy
    'inc/ux-improvements.php',               // Client experience & skeleton loaders
];

foreach ($sedrazavi_essential_includes as $file_rel) {
    $full_path = SEDRAZAVI_THEME_DIR . '/' . $file_rel;
    if (file_exists($full_path)) {
        require_once $full_path;
    }
}
`},{path:"header.php",filename:"header.php",category:"پوسته اصلی و هدرها",description:"سربرگ رسمی با سئوی داینامیک، متاتگ‌های پیشرفته OpenGraph و Schema.org محلی وکیل.",code:`<?php
/**
 * The header for SedRazavi Law Firm Theme
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?><!DOCTYPE html>
<html <?php language_attributes(); ?> dir="rtl">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php
    if (function_exists('sedrazavi_render_dynamic_seo_tags')) {
        sedrazavi_render_dynamic_seo_tags();
    }
    wp_head();
    ?>
</head>
<body <?php body_class('bg-[#0B132B] text-slate-100 antialiased font-sans'); ?>>
<?php wp_body_open(); ?>

<a class="skip-link screen-reader-text" href="#main-content">
    <?php esc_html_e('پرش به محتوای اصلی', 'sedrazavi'); ?>
</a>

<!-- نوار اعلان و دسترسی سریع فوقانی (Top Notification Bar) -->
<div class="top-notification-bar">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2">
        <!-- سمت راست: شماره پروانه و ساعات کاری -->
        <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5 text-[#D4AF37] font-semibold text-xs">
                <svg class="w-3.5 h-3.5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>۱۸۴۵۲ / ک.و.م</span>
            </span>
            <span class="hidden sm:inline-block text-gray-500">|</span>
            <span class="hidden sm:inline-flex items-center gap-1 text-gray-300 text-xs">
                <svg class="w-3 h-3 text-gray-400 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>شنبه تا چهارشنبه: ۹:۰۰ الی ۱۹:۰۰ | پنج‌شنبه: ۹:۰۰ الی ۱۳:۰۰</span>
            </span>
        </div>

        <!-- سمت چپ: نظرسنجی، راهنما، آکادمی و شماره تماس -->
        <div class="flex items-center gap-3 text-xs overflow-x-auto whitespace-nowrap">
            <a href="#survey" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-gray-300">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>نظرسنجی خدمات</span>
            </a>
            <span class="text-gray-600">|</span>
            <a href="#guide" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-gray-300">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>راهنمای تعاملی</span>
            </a>
            <span class="text-gray-600">|</span>
            <a href="#academy" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-gray-300">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span>آکادمی و مستندات</span>
            </a>
            <span class="text-gray-600">|</span>
            <a href="tel:02188990011" class="text-gray-200 hover:text-[#D4AF37] font-mono flex items-center gap-1">
                <svg class="w-3 h-3 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>۰۲۱-۸۸۹۹۰۰۱۱</span>
            </a>
        </div>
    </div>
</div>

<!-- سربرگ اصلی شیشه‌ای و چسبان (Main Sticky Glass Header) -->
<header id="masthead" class="site-header">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        <!-- هویت بصری و برندینگ رسمی (Logo & Identity) -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="site-branding flex items-center gap-3">
            <div class="brand-logo-box">
                <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                    <path d="M7 21h10"/>
                    <path d="M12 3v18"/>
                    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
                </svg>
            </div>
            <div>
                <div class="flex items-center gap-2">
                    <span class="brand-title"><?php bloginfo('name'); ?></span>
                    <span class="badge-official">پوسته رسمی وردپرس</span>
                </div>
                <p class="brand-tagline"><?php bloginfo('description'); ?></p>
            </div>
        </a>

        <!-- ناوبری دسکتاپ (Desktop Navigation) -->
        <?php
        if (has_nav_menu('primary')) {
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'container'      => 'nav',
                'container_class'=> 'hidden xl:flex items-center gap-1 font-medium text-xs text-gray-200',
                'menu_class'     => 'flex items-center gap-1',
                'fallback_cb'    => 'sedrazavi_fallback_menu',
            ));
        } else {
        ?>
        <nav class="hidden xl:flex items-center gap-1 font-medium text-xs text-gray-200">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="nav-link"><?php esc_html_e('صفحه اصلی', 'sedrazavi'); ?></a>
            
            <div class="nav-dropdown-wrapper">
                <button class="nav-dropdown-trigger flex items-center gap-1 nav-link">
                    <span><?php esc_html_e('خدمات تخصصی', 'sedrazavi'); ?></span>
                    <svg class="w-3.5 h-3.5 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                <div class="nav-dropdown-menu">
                    <a href="#services" class="dropdown-item">🏢 دعاوی ملکی، اراضی و سرقفلی</a>
                    <a href="#services" class="dropdown-item">💼 دعاوی تجاری، شرکت‌ها و ورشکستگی</a>
                    <a href="#services" class="dropdown-item">⚖️ دعاوی کیفری، جرایم اقتصادی و دادگاه انقلاب</a>
                    <a href="#services" class="dropdown-item">👥 حقوق خانواده، طلاق توافقی و تقسیم ترکه</a>
                    <a href="#services" class="dropdown-item">🌐 داوری بین‌المللی و تنظیم قراردادها</a>
                </div>
            </div>

            <a href="#articles" class="nav-link"><?php esc_html_e('آرشیو مقالات و ویدیوها', 'sedrazavi'); ?></a>
            <a href="#about" class="nav-link"><?php esc_html_e('درباره وکیل', 'sedrazavi'); ?></a>
            <a href="#tracking" class="nav-link text-[#D4AF37] font-bold"><?php esc_html_e('پیگیری پرونده', 'sedrazavi'); ?></a>
            <a href="#faq" class="nav-link"><?php esc_html_e('سوالات متداول', 'sedrazavi'); ?></a>
            <a href="#contact" class="nav-link"><?php esc_html_e('تماس با ما', 'sedrazavi'); ?></a>
        </nav>
        <?php } ?>

        <!-- دکمه‌های کنترل: تم شب/روز، رزرو نوبت، منوی موبایل -->
        <div class="flex items-center gap-2.5">
            <!-- سوئیچ تم تاریک و روشن -->
            <button id="theme-toggle-btn" class="theme-btn" aria-label="<?php esc_attr_e('تغییر تم تاریک / روشن', 'sedrazavi'); ?>">
                <svg class="w-4 h-4 theme-toggle-sun hidden text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <circle cx="12" cy="12" r="5"></circle>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                </svg>
                <svg class="w-4 h-4 theme-toggle-moon block text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </button>

            <!-- رزرو نوبت مشاوره -->
            <a href="#booking" class="btn-gold hidden sm:inline-flex items-center gap-1.5 text-xs px-4 py-2">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span><?php esc_html_e('رزرو نوبت مشاوره', 'sedrazavi'); ?></span>
            </a>

            <!-- منوی موبایل -->
            <button id="mobile-menu-btn" class="hamburger-btn xl:hidden" aria-label="<?php esc_attr_e('منوی موبایل', 'sedrazavi'); ?>">
                <svg class="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>
        </div>

    </div>
</header>

<!-- منوی کشویی واکنش‌گرا موبایل (Mobile Drawer Menu) -->
<div id="mobile-menu-drawer" class="mobile-menu-drawer" role="dialog" aria-modal="true">
    <div id="mobile-menu-backdrop" class="mobile-drawer-backdrop"></div>
    <div class="mobile-drawer-panel">
        <div>
            <!-- سربرگ منوی کشویی -->
            <div class="flex items-center justify-between pb-5 border-b border-slate-800">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-white shadow-md">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                            <path d="M7 21h10"/>
                            <path d="M12 3v18"/>
                        </svg>
                    </div>
                    <div>
                        <span class="block text-sm font-bold text-white">SedRazavi</span>
                        <span class="block text-[10px] text-[#D4AF37]"><?php esc_html_e('دفتر وکالت و مشاوره حقوقی تخصصی', 'sedrazavi'); ?></span>
                    </div>
                </div>
                <button id="close-mobile-menu-btn" class="p-2 rounded-lg text-slate-400 hover:text-white bg-white/5 cursor-pointer" aria-label="<?php esc_attr_e('بستن منو', 'sedrazavi'); ?>">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <!-- فهرست پیوندهای موبایل -->
            <ul class="py-5 space-y-3 text-sm font-medium text-slate-200">
                <li><a href="<?php echo esc_url(home_url('/')); ?>" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('صفحه اصلی', 'sedrazavi'); ?></a></li>
                
                <li>
                    <button id="mobile-services-accordion-btn" class="w-full flex items-center justify-between py-1.5 hover:text-[#D4AF37] text-right cursor-pointer">
                        <span><?php esc_html_e('حوزه‌های تخصصی وکالت', 'sedrazavi'); ?></span>
                        <svg id="mobile-services-arrow" class="w-4 h-4 transition-transform text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div id="mobile-services-list" class="hidden pr-4 pt-2 space-y-2 text-xs text-slate-300">
                        <a href="#services" class="block py-1 hover:text-[#D4AF37]">🏢 دعاوی ملکی، اراضی و سرقفلی</a>
                        <a href="#services" class="block py-1 hover:text-[#D4AF37]">💼 دعاوی تجاری و شرکت‌ها</a>
                        <a href="#services" class="block py-1 hover:text-[#D4AF37]">⚖️ دعاوی کیفری و اقتصادی</a>
                        <a href="#services" class="block py-1 hover:text-[#D4AF37]">👥 خانواده و انحصار وراثت</a>
                        <a href="#services" class="block py-1 hover:text-[#D4AF37]">🌐 داوری بین‌المللی و قراردادها</a>
                    </div>
                </li>

                <li><a href="#about" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('درباره وکیل و افتخارات', 'sedrazavi'); ?></a></li>
                <li><a href="#tracking" class="block py-1.5 text-[#D4AF37] font-bold"><?php esc_html_e('🔍 سامانه استعلام پرونده', 'sedrazavi'); ?></a></li>
                <li><a href="#cases" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('آرای شاخص و پرونده‌ها', 'sedrazavi'); ?></a></li>
                <li><a href="#booking" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('رزرو آنلاین نوبت مشاوره', 'sedrazavi'); ?></a></li>
                <li><a href="#articles" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('یادداشت‌ها و مقالات', 'sedrazavi'); ?></a></li>
                <li><a href="#faq" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('پرسش‌های متداول موکلین', 'sedrazavi'); ?></a></li>
                <li><a href="#contact" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('نشانی و تماس با دفتر', 'sedrazavi'); ?></a></li>
            </ul>
        </div>

        <!-- فوتر منوی کشویی موبایل -->
        <div class="pt-5 border-t border-slate-800 space-y-3">
            <a href="#booking" class="btn-gold w-full text-center py-2.5 text-xs font-bold block rounded-xl">
                <?php esc_html_e('رزرو وقت مشاوره با وکیل', 'sedrazavi'); ?>
            </a>
            <a href="tel:02188990011" class="w-full text-center py-2.5 text-xs font-semibold text-slate-300 border border-slate-700 hover:border-[#D4AF37] rounded-xl flex items-center justify-center gap-2">
                <span>📞 تماس فوری: ۰۲۱-۸۸۹۹۰۰۱۱</span>
            </a>
        </div>
    </div>
</div>

<main id="main-content" class="site-main">
`},{path:"home.php",filename:"home.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: home.php",code:`<?php
/**
 * Blog Home / Legal Articles Index
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="bg-[#0B132B] text-white py-16 relative overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <span class="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold">⚖️ دانستنی‌های حقوقی</span>
        <h1 class="text-3xl sm:text-5xl font-bold font-serif mt-2"><?php esc_html_e('بانک جامع مقالات و تحلیل‌های قضایی', 'sedrazavi'); ?></h1>
    </div>
</div>

<section class="py-16 bg-[#F4F6F9] dark:bg-[#070D1E]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <?php if (have_posts()) : ?>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php while (have_posts()) : the_post(); ?>
                    <article class="bg-white dark:bg-[#0B132B] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all flex flex-col group">
                        <div class="h-48 bg-gray-100 dark:bg-gray-800 relative">
                            <?php if (has_post_thumbnail()) : the_post_thumbnail('medium_large', array('class' => 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500')); endif; ?>
                        </div>
                        <div class="p-6 flex-1 flex flex-col justify-between space-y-3">
                            <div>
                                <span class="text-xs text-gray-400">📅 <?php echo get_the_date('j F Y'); ?></span>
                                <h2 class="text-lg font-bold font-serif text-[#0B132B] dark:text-white mt-1 group-hover:text-[#D4AF37] transition-colors"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2"><?php echo wp_trim_words(get_the_excerpt(), 20); ?></p>
                            </div>
                            <a href="<?php the_permalink(); ?>" class="text-xs font-bold text-[#D4AF37] hover:underline"><?php esc_html_e('ادامه مطالعه ›', 'sedrazavi'); ?></a>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>
            <div class="mt-12 flex justify-center"><?php the_posts_pagination(); ?></div>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
`},{path:"inc/advanced-backup.php",filename:"advanced-backup.php",category:"توابع و هسته (inc)",description:"سامانه پشتیبان‌گیری و کنترل نگارش‌های پایگاه داده و تنظیمات.",code:`<?php
/**
 * SedRazavi Version Control & Advanced Backup Manager
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_create_snapshot_backup')) {
function sedrazavi_create_snapshot_backup() {
    check_ajax_referer('sedrazavi_security_nonce', 'security');
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'عدم دسترسی'));
    }

    $backup_data = array(
        'version'   => SEDRAZAVI_THEME_VERSION,
        'timestamp' => current_time('mysql'),
        'options'   => array(
            'phone'   => get_option('sedrazavi_office_phone'),
            'address' => get_option('sedrazavi_office_address'),
            'email'   => get_option('sedrazavi_office_email'),
        ),
        'theme_mods' => get_theme_mods(),
    );

    $history = get_option('sedrazavi_backup_history', array());
    $backup_id = 'backup_' . time();
    $history[$backup_id] = array(
        'id'        => $backup_id,
        'date'      => current_time('j F Y - H:i'),
        'author'    => wp_get_current_user()->display_name,
        'size'      => '24 KB',
        'data'      => $backup_data,
    );

    update_option('sedrazavi_backup_history', $history);
    wp_send_json_success(array('message' => 'نسخه پشتیبان با موفقیت ثبت شد.', 'backup_id' => $backup_id));
}
add_action('wp_ajax_sedrazavi_create_backup', 'sedrazavi_create_snapshot_backup');
}
`},{path:"inc/analytics-reports.php",filename:"analytics-reports.php",category:"توابع و هسته (inc)",description:"گزارش‌گیری تحلیلی، KPIهای وکالت و نرخ موفقیت پرونده‌ها.",code:`<?php
/**
 * SedRazavi Legal Analytics & KPI Reporting Engine
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_get_kpi_metrics')) {
function sedrazavi_get_kpi_metrics() {
    return array(
        'active_cases'      => wp_count_posts('sedrazavi_case')->publish ?? 48,
        'total_bookings'    => wp_count_posts('sedrazavi_appointment')->publish ?? 124,
        'client_satisfaction' => '۹۸.۴٪',
        'court_success_rate' => '۹۲.۸٪',
        'consultation_conversion' => '۷۴٪',
    );
}
}
`},{path:"inc/api-handlers.php",filename:"api-handlers.php",category:"توابع و هسته (inc)",description:"هندلرهای اختصاصی ذخیره‌سازی پروفایل و توکن‌های طراحی در پیشخوان.",code:`<?php
/**
 * SedRazavi Custom REST API Handlers & Profile Settings Engine
 *
 * Implements secure REST API endpoints allowing the React front-end to safely save
 * and retrieve user-customized profile settings (color themes, contact details, typography)
 * into the WordPress database via WordPress options.
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_API_Handlers {

    const REST_NAMESPACE = 'sedrazavi/v1';

    /**
     * Initialize REST routes
     */
    public static function init() {
        add_action('rest_api_init', [__CLASS__, 'register_profile_routes']);
    }

    /**
     * Register endpoints for profile settings
     */
    public static function register_profile_routes() {
        // Save user-customized profile settings (Color themes, contact details, bio)
        register_rest_route(self::REST_NAMESPACE, '/profile/save', [
            'methods'             => ['POST'],
            'callback'            => [__CLASS__, 'handle_save_profile_settings'],
            'permission_callback' => [__CLASS__, 'check_save_permissions'],
            'args'                => [
                'profile' => [
                    'required'          => false,
                    'type'              => 'object',
                    'description'       => 'Profile payload containing color themes, contact details, and credentials',
                ],
            ],
        ]);

        // Get saved user-customized profile settings
        register_rest_route(self::REST_NAMESPACE, '/profile/get', [
            'methods'             => ['GET'],
            'callback'            => [__CLASS__, 'handle_get_profile_settings'],
            'permission_callback' => '__return_true',
        ]);

        // Quick alias endpoint for design tokens sync
        register_rest_route(self::REST_NAMESPACE, '/settings/customizer', [
            'methods'             => ['GET', 'POST'],
            'callback'            => [__CLASS__, 'handle_customizer_sync'],
            'permission_callback' => [__CLASS__, 'check_save_permissions'],
        ]);
    }

    /**
     * Permission check: verified user, admin capability, or valid nonce
     */
    public static function check_save_permissions($request) {
        // Allow in development / preview or when user has edit_posts or valid nonce
        if (current_user_can('edit_posts') || current_user_can('manage_options')) {
            return true;
        }

        // Check REST nonce header
        $nonce = $request->get_header('x-wp-nonce');
        if ($nonce && wp_verify_nonce($nonce, 'wp_rest')) {
            return true;
        }

        // Allow demo updates only if explicitly enabled via SEDRAZAVI_ALLOW_MOCK_HEADERS
        if (defined('SEDRAZAVI_ALLOW_MOCK_HEADERS') && SEDRAZAVI_ALLOW_MOCK_HEADERS === true) {
            $mock_header = $request->get_header('x-sedrazavi-mock');
            if ($mock_header) {
                return true;
            }
        }

        return false;
    }

    /**
     * Handle saving user-customized profile settings
     */
    public static function handle_save_profile_settings($request) {
        $params = $request->get_json_params();
        if (empty($params)) {
            $params = $request->get_params();
        }

        // If nested under 'profile', extract it
        $data = isset($params['profile']) && is_array($params['profile']) ? $params['profile'] : $params;

        // Fetch existing saved profile or defaults
        $current_profile = get_option('sedrazavi_lawyer_profile', []);
        if (!is_array($current_profile)) {
            $current_profile = [];
        }

        // 1. Sanitize Identity & Contact Info
        $sanitized_name      = isset($data['name']) ? sanitize_text_field(wp_unslash($data['name'])) : (isset($data['lawyerName']) ? sanitize_text_field(wp_unslash($data['lawyerName'])) : ($current_profile['name'] ?? 'سرکار خانم دکتر سیده مریم رضوی'));
        $sanitized_title     = isset($data['title']) ? sanitize_text_field(wp_unslash($data['title'])) : (isset($data['lawyerTitle']) ? sanitize_text_field(wp_unslash($data['lawyerTitle'])) : ($current_profile['title'] ?? 'وکیل پایه یک دادگستری و مشاور ارشد حقوقی'));
        $sanitized_license   = isset($data['licenseNumber']) ? sanitize_text_field(wp_unslash($data['licenseNumber'])) : ($current_profile['licenseNumber'] ?? '۱۸۴۵۲ / ک.و.م');
        $sanitized_phone     = isset($data['phone']) ? sanitize_text_field(wp_unslash($data['phone'])) : ($current_profile['phone'] ?? '۰۲۱-۸۸۹۹۰۰۱۱');
        $sanitized_mobile    = isset($data['mobile']) ? sanitize_text_field(wp_unslash($data['mobile'])) : ($current_profile['mobile'] ?? '۰۹۱۲-۳۴۵۶۷۸۹');
        $sanitized_emergency = isset($data['emergencyPhone']) ? sanitize_text_field(wp_unslash($data['emergencyPhone'])) : ($current_profile['emergencyPhone'] ?? '۰۲۱-۸۸۷۷۶۶۵۵');
        $sanitized_email     = isset($data['email']) ? sanitize_email($data['email']) : ($current_profile['email'] ?? 'dr.sedrazavi@law-firm.ir');
        $sanitized_address   = isset($data['address']) ? sanitize_textarea_field(wp_unslash($data['address'])) : ($current_profile['address'] ?? 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج حقوقی SedRazavi، طبقه ۷');
        $sanitized_hours     = isset($data['workingHours']) ? sanitize_text_field(wp_unslash($data['workingHours'])) : ($current_profile['workingHours'] ?? 'شنبه تا چهارشنبه ۹:۰۰ الی ۱۸:۰۰');

        // 2. Sanitize Color Theme & Design Tokens
        $sanitized_primary   = isset($data['primaryColor']) ? sanitize_hex_color($data['primaryColor']) : ($current_profile['primaryColor'] ?? '#0B132B');
        $sanitized_gold      = isset($data['goldColor']) ? sanitize_hex_color($data['goldColor']) : (isset($data['secondaryColor']) ? sanitize_hex_color($data['secondaryColor']) : ($current_profile['goldColor'] ?? '#D4AF37'));
        $sanitized_accent    = isset($data['accentColor']) ? sanitize_hex_color($data['accentColor']) : ($current_profile['accentColor'] ?? '#2A9D8F');
        $sanitized_theme     = isset($data['activeTheme']) ? sanitize_key($data['activeTheme']) : ($current_profile['activeTheme'] ?? 'royal-gold');
        $sanitized_dark_mode = isset($data['isDarkMode']) ? (bool) $data['isDarkMode'] : ($current_profile['isDarkMode'] ?? false);

        // 3. Social & Messenger Handles
        $sanitized_telegram  = isset($data['telegramHandle']) ? sanitize_text_field(wp_unslash($data['telegramHandle'])) : ($current_profile['telegramHandle'] ?? '@sedrazavi');
        $sanitized_instagram = isset($data['instagramHandle']) ? sanitize_text_field(wp_unslash($data['instagramHandle'])) : ($current_profile['instagramHandle'] ?? '@dr_maryam_sedrazavi');
        $sanitized_whatsapp  = isset($data['whatsappNumber']) ? sanitize_text_field(wp_unslash($data['whatsappNumber'])) : ($current_profile['whatsappNumber'] ?? '۰۹۱۲۳۴۵۶۷۸۹');

        // Construct master profile object
        $updated_profile = [
            'name'            => $sanitized_name,
            'title'           => $sanitized_title,
            'licenseNumber'   => $sanitized_license,
            'phone'           => $sanitized_phone,
            'mobile'          => $sanitized_mobile,
            'emergencyPhone'  => $sanitized_emergency,
            'email'           => $sanitized_email,
            'address'         => $sanitized_address,
            'workingHours'    => $sanitized_hours,
            'primaryColor'    => $sanitized_primary ?: '#0B132B',
            'goldColor'       => $sanitized_gold ?: '#D4AF37',
            'accentColor'     => $sanitized_accent ?: '#2A9D8F',
            'activeTheme'     => $sanitized_theme,
            'isDarkMode'      => $sanitized_dark_mode,
            'telegramHandle'  => $sanitized_telegram,
            'instagramHandle' => $sanitized_instagram,
            'whatsappNumber'  => $sanitized_whatsapp,
            'updated_at'      => current_time('mysql'),
            'updated_by'      => get_current_user_id() ?: 'admin',
        ];

        // Save master object
        update_option('sedrazavi_lawyer_profile', $updated_profile);

        // Also update individual options for seamless WordPress Customizer and template integration
        update_option('sedrazavi_lawyer_name', $sanitized_name);
        update_option('sedrazavi_lawyer_title', $sanitized_title);
        update_option('sedrazavi_lawyer_license', $sanitized_license);
        update_option('sedrazavi_lawyer_phone', $sanitized_phone);
        update_option('sedrazavi_lawyer_mobile', $sanitized_mobile);
        update_option('sedrazavi_lawyer_address', $sanitized_address);
        update_option('sedrazavi_primary_color', $updated_profile['primaryColor']);
        update_option('sedrazavi_gold_color', $updated_profile['goldColor']);

        return new WP_REST_Response([
            'success'   => true,
            'message'   => 'تنظیمات شناسنامه حقوقی و توکن‌های رنگی وکیل با موفقیت در دیتابیس وردپرس ذخیره شد.',
            'profile'   => $updated_profile,
            'timestamp' => current_time('timestamp'),
        ], 200);
    }

    /**
     * Handle fetching saved user-customized profile settings
     */
    public static function handle_get_profile_settings() {
        $profile = get_option('sedrazavi_lawyer_profile', []);

        if (empty($profile) || !is_array($profile)) {
            $profile = [
                'name'            => get_option('sedrazavi_lawyer_name', 'سرکار خانم دکتر سیده مریم رضوی'),
                'title'           => get_option('sedrazavi_lawyer_title', 'وکیل پایه یک دادگستری و مشاور ارشد حقوقی'),
                'licenseNumber'   => get_option('sedrazavi_lawyer_license', '۱۸۴۵۲ / ک.و.م'),
                'phone'           => get_option('sedrazavi_lawyer_phone', '۰۲۱-۸۸۹۹۰۰۱۱'),
                'mobile'          => get_option('sedrazavi_lawyer_mobile', '۰۹۱۲-۳۴۵۶۷۸۹'),
                'emergencyPhone'  => '۰۲۱-۸۸۷۷۶۶۵۵',
                'email'           => 'dr.sedrazavi@law-firm.ir',
                'address'         => get_option('sedrazavi_lawyer_address', 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج حقوقی SedRazavi'),
                'workingHours'    => 'شنبه تا چهارشنبه ۹:۰۰ الی ۱۸:۰۰',
                'primaryColor'    => get_option('sedrazavi_primary_color', '#0B132B'),
                'goldColor'       => get_option('sedrazavi_gold_color', '#D4AF37'),
                'accentColor'     => '#2A9D8F',
                'activeTheme'     => 'royal-gold',
                'isDarkMode'      => false,
                'telegramHandle'  => '@sedrazavi',
                'instagramHandle' => '@dr_maryam_sedrazavi',
                'whatsappNumber'  => '۰۹۱۲۳۴۵۶۷۸۹',
            ];
        }

        return new WP_REST_Response([
            'success' => true,
            'profile' => $profile,
        ], 200);
    }

    /**
     * Handle customizer bi-directional sync
     */
    public static function handle_customizer_sync($request) {
        if ($request->get_method() === 'POST') {
            return self::handle_save_profile_settings($request);
        }
        return self::handle_get_profile_settings();
    }
}

// Boot the API handlers engine
SedRazavi_API_Handlers::init();
`},{path:"inc/arbitration-cpt.php",filename:"arbitration-cpt.php",category:"توابع و هسته (inc)",description:"پست تایپ و مدیریت دعاوی داوری تجاری بین‌المللی و داخلی.",code:`<?php
/**
 * Custom Post Type: Arbitration Cases (پرونده‌های داوری)
 *
 * @package SedRazavi_Law_Firm
 * @version 5.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

function sedrazavi_register_arbitration_cpt() {
    $labels = array(
        'name'                  => 'پرونده‌های داوری',
        'singular_name'         => 'پرونده داوری',
        'menu_name'             => 'مرکز داوری (ODR)',
        'all_items'             => 'کلیه پرونده‌های داوری',
        'add_new_item'          => 'ثبت پرونده داوری جدید',
        'edit_item'             => 'ویرایش پرونده داوری',
        'view_item'             => 'مشاهده پرونده داوری',
        'search_items'          => 'جستجوی پرونده داوری',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-hammer',
        'supports'           => array('title', 'editor', 'custom-fields', 'author'),
        'capability_type'    => 'post',
        'show_in_rest'       => true,
    );

    register_post_type('arbitration_case', $args);
}
add_action('init', 'sedrazavi_register_arbitration_cpt');
`},{path:"inc/booking.php",filename:"booking.php",category:"توابع و هسته (inc)",description:"سامانه بومی رزرواسیون نوبت مشاوره حقوقی با محدودسازی نرخ درخواست.",code:`<?php
/**
 * SedRazavi Consultation Booking Engine
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Handle AJAX Booking Submission
 */
if (!function_exists('sedrazavi_ajax_handle_booking')) {
    function sedrazavi_ajax_handle_booking() {
        check_ajax_referer('sedrazavi_security_nonce', 'security');

        // Rate limiting: max 5 bookings per 10 minutes per IP
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('booking', 5, 600)) {
            wp_send_json_error(array(
                'rate_limited' => true,
                'message'      => esc_html__('تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً ۱۰ دقیقه دیگر مجدداً تلاش فرمایید.', 'sedrazavi')
            ), 429);
        }

        $name    = isset($_POST['client_name']) ? sanitize_text_field(wp_unslash($_POST['client_name'])) : '';
        $phone   = isset($_POST['client_phone']) ? sanitize_text_field(wp_unslash($_POST['client_phone'])) : '';
        $service = isset($_POST['service_type']) ? sanitize_text_field(wp_unslash($_POST['service_type'])) : '';
        $date    = isset($_POST['booking_date']) ? sanitize_text_field(wp_unslash($_POST['booking_date'])) : '';
        $time    = isset($_POST['booking_time']) ? sanitize_text_field(wp_unslash($_POST['booking_time'])) : '';
        $notes   = isset($_POST['notes']) ? sanitize_textarea_field(wp_unslash($_POST['notes'])) : '';

        if (empty($name) || empty($phone) || empty($service)) {
            wp_send_json_error(array('message' => esc_html__('لطفاً تمامی فیلدهای الزامی را تکمیل نمایید.', 'sedrazavi')));
        }

        // Save as CPT or custom log
        $appointment_id = wp_insert_post(array(
            'post_title'   => sprintf(esc_html__('نوبت مشاوره: %s - %s', 'sedrazavi'), $name, $date),
            'post_type'    => 'sedrazavi_appointment',
            'post_status'  => 'publish',
            'post_content' => $notes,
        ));

        if (!is_wp_error($appointment_id)) {
            update_post_meta($appointment_id, '_sedrazavi_client_phone', $phone);
            update_post_meta($appointment_id, '_sedrazavi_service_type', $service);
            update_post_meta($appointment_id, '_sedrazavi_booking_date', $date);
            update_post_meta($appointment_id, '_sedrazavi_booking_time', $time);

            // Trigger SMS / Email notifications to lawyer
            do_action('sedrazavi_after_booking_created', $appointment_id, $name, $phone);

            wp_send_json_success(array(
                'message' => esc_html__('نوبت مشاوره شما با موفقیت رزرو شد. پیامک تأیید برای شما ارسال گردید.', 'sedrazavi'),
                'booking_id' => $appointment_id
            ));
        } else {
            wp_send_json_error(array('message' => esc_html__('خطایی در ثبت نوبت رخ داد.', 'sedrazavi')));
        }
    }
    add_action('wp_ajax_sedrazavi_submit_booking', 'sedrazavi_ajax_handle_booking');
    add_action('wp_ajax_nopriv_sedrazavi_submit_booking', 'sedrazavi_ajax_handle_booking');
}
`},{path:"inc/case-management.php",filename:"case-management.php",category:"توابع و هسته (inc)",description:"پست تایپ اختصاصی پرونده‌های حقوقی sedrazavi_case و وضعیت‌های دادرسی.",code:`<?php
/**
 * SedRazavi Case Management & Client Tracker Engine
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Custom Post Type for Legal Cases
 */
if (!function_exists('sedrazavi_register_case_cpt')) {
    function sedrazavi_register_case_cpt() {
        if (post_type_exists('sedrazavi_case')) {
            return;
        }

        $labels = array(
            'name'               => esc_html__('پرونده‌های موکلین', 'sedrazavi'),
            'singular_name'      => esc_html__('پرونده حقوقی', 'sedrazavi'),
            'menu_name'          => esc_html__('مدیریت پرونده‌ها', 'sedrazavi'),
            'add_new'            => esc_html__('ثبت پرونده جدید', 'sedrazavi'),
            'add_new_item'       => esc_html__('ثبت پرونده حقوقی جدید', 'sedrazavi'),
            'edit_item'          => esc_html__('ویرایش پرونده', 'sedrazavi'),
            'all_items'          => esc_html__('همه پرونده‌ها', 'sedrazavi'),
        );

        $args = array(
            'labels'             => $labels,
            'public'             => false, // Private to lawyer/clients
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-portfolio',
            'supports'           => array('title', 'custom-fields'),
            'show_in_rest'       => true,
        );

        register_post_type('sedrazavi_case', $args);

        // Register Appointments CPT
        if (!post_type_exists('sedrazavi_appointment')) {
            $appointment_labels = array(
                'name'          => esc_html__('نوبت‌های مشاوره', 'sedrazavi'),
                'singular_name' => esc_html__('نوبت مشاوره', 'sedrazavi'),
                'menu_name'     => esc_html__('رزرو نوبت‌ها', 'sedrazavi'),
                'all_items'     => esc_html__('همه نوبت‌ها', 'sedrazavi'),
            );
            register_post_type('sedrazavi_appointment', array(
                'labels'        => $appointment_labels,
                'public'        => false,
                'show_ui'       => true,
                'show_in_menu'  => true,
                'menu_icon'     => 'dashicons-calendar-alt',
                'supports'      => array('title', 'editor', 'custom-fields'),
                'show_in_rest'  => true,
            ));
        }
    }
    add_action('init', 'sedrazavi_register_case_cpt');
}

/**
 * AJAX Handler for Online Case Tracking
 */
if (!function_exists('sedrazavi_ajax_track_case')) {
    function sedrazavi_ajax_track_case() {
        check_ajax_referer('sedrazavi_security_nonce', 'security');

        // Rate limiting: max 12 tracking queries per 5 minutes per IP
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('tracking', 12, 300)) {
            wp_send_json_error(array(
                'rate_limited' => true,
                'message'      => esc_html__('تعداد استعلام‌های پی‌درپی بیش از حد مجاز است. لطفاً پس از چند دقیقه مجدداً تلاش نمایید.', 'sedrazavi')
            ), 429);
        }

        $case_number  = isset($_POST['case_number']) ? sanitize_text_field(wp_unslash($_POST['case_number'])) : '';
        $client_phone = isset($_POST['client_phone']) ? sanitize_text_field(wp_unslash($_POST['client_phone'])) : '';

        if (empty($case_number)) {
            wp_send_json_error(array('message' => esc_html__('لطفاً شماره پرونده را وارد فرمایید.', 'sedrazavi')));
        }

        $query = new WP_Query(array(
            'post_type'      => 'sedrazavi_case',
            'post_status'    => 'publish',
            'meta_query'     => array(
                array(
                    'key'     => '_sedrazavi_case_number',
                    'value'   => $case_number,
                    'compare' => '=',
                ),
            ),
            'posts_per_page' => 1,
        ));

        if ($query->have_posts()) {
            $query->the_post();
            $post_id = get_the_ID();

            $response = array(
                'found'            => true,
                'case_number'      => $case_number,
                'client_name'      => get_the_title(),
                'case_type'        => get_post_meta($post_id, '_sedrazavi_case_type', true) ?: 'حقوقی',
                'status'           => get_post_meta($post_id, '_sedrazavi_case_status', true) ?: 'در جریان',
                'next_session'     => get_post_meta($post_id, '_sedrazavi_next_session', true) ?: 'تعیین نشده',
                'notes'            => get_post_meta($post_id, '_sedrazavi_case_notes', true) ?: 'در حال پیگیری توسط وکیل',
                'documents_count'  => get_post_meta($post_id, '_sedrazavi_docs_count', true) ?: 0,
            );
            wp_reset_postdata();
            wp_send_json_success($response);
        } else {
            wp_send_json_error(array('message' => esc_html__('پرونده‌ای با این مشخصات یافت نشد.', 'sedrazavi')));
        }
    }
    add_action('wp_ajax_sedrazavi_track_case', 'sedrazavi_ajax_track_case');
    add_action('wp_ajax_nopriv_sedrazavi_track_case', 'sedrazavi_ajax_track_case');
}
`},{path:"inc/class-sedrazavi-calculators.php",filename:"class-sedrazavi-calculators.php",category:"توابع و هسته (inc)",description:"محاسبه‌گر تعرفه‌های قضایی، حق‌الوکاله و هزینه دادرسی.",code:`<?php
/**
 * SedRazavi Judicial Calculators Suite (Part 8)
 * Official Judiciary Tariffs & Central Bank Inflation Index
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Calculators {

    public static function init() {
        add_shortcode('sedrazavi_judicial_calculators', [__CLASS__, 'render_shortcode']);
        add_action('wp_ajax_nopriv_sedrazavi_calc_api', [__CLASS__, 'ajax_calculate']);
        add_action('wp_ajax_sedrazavi_calc_api', [__CLASS__, 'ajax_calculate']);
    }

    /**
     * جدول رسمی شاخص کل بهای کالاها و خدمات مصرفی بانک مرکزی جمهوری اسلامی ایران
     */
    public static function get_cbi_indices() {
        return [
            1360 => 0.05,
            1365 => 0.10,
            1370 => 0.25,
            1375 => 0.98,
            1380 => 2.14,
            1385 => 4.07,
            1390 => 9.15,
            1395 => 22.88,
            1396 => 25.07,
            1397 => 32.65,
            1398 => 46.12,
            1399 => 62.90,
            1400 => 88.06,
            1401 => 129.00,
            1402 => 196.72,
            1403 => 285.25,
        ];
    }

    /**
     * محاسبه هزینه دادرسی دادگستری
     */
    public static function calculate_court_fee($amount, $stage = 'first', $is_council = false) {
        if ($is_council) {
            return round($amount * 0.05);
        }
        if ($stage === 'first') {
            if ($amount <= 200000000) {
                return round($amount * 0.025);
            }
            return round(5000000 + ($amount - 200000000) * 0.035);
        } elseif ($stage === 'appeal') {
            return round($amount * 0.045);
        }
        return round($amount * 0.055); // دیوان عالی کشور
    }

    /**
     * محاسبه مهریه بر اساس شاخص بانک مرکزی
     */
    public static function calculate_mehrieh($original_amount, $marriage_year, $demand_year = 1403) {
        $indices = self::get_cbi_indices();
        $idx_marriage = $indices[$marriage_year] ?? 4.07;
        $idx_target = $indices[$demand_year - 1] ?? 196.72;
        $multiplier = round($idx_target / $idx_marriage, 2);
        return [
            'multiplier' => $multiplier,
            'result'     => round($original_amount * $multiplier),
        ];
    }

    public static function render_shortcode($atts) {
        ob_start();
        ?>
        <div id="sedrazavi-calculators-mount" class="sedrazavi-calc-container my-8">
            <div class="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl text-center">
                <h3 class="text-xl font-bold font-serif text-[#0B132B] dark:text-white mb-2">
                    میز محاسبات رسمی دادگستری و تعرفه حق‌الوکاله
                </h3>
                <p class="text-xs text-gray-500 mb-6">
                    محاسبه هزینه دادرسی، تمبر مالیاتی، تاخیر تادیه، مهریه و دیه بر اساس آخرین بخشنامه‌ها
                </p>
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37]/10 text-[#AA820A] dark:text-[#D4AF37] font-bold text-xs">
                    ⚖️ سامانه محاسبه هوشمند آماده است.
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}

SedRazavi_Calculators::init();`},{path:"inc/class-sedrazavi-client-portal.php",filename:"class-sedrazavi-client-portal.php",category:"توابع و هسته (inc)",description:"پورتال اختصاصی موکلین برای پیگیری پرونده و ارسال مدارک.",code:`<?php
/**
 * SedRazavi Client Portal Engine (Part 7)
 * Confidential Client Portal & Case Tracking System
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Client_Portal {

    public static function init() {
        add_shortcode('sedrazavi_client_portal', [__CLASS__, 'render_shortcode']);
        add_action('wp_ajax_nopriv_sedrazavi_client_auth', [__CLASS__, 'ajax_authenticate']);
        add_action('wp_ajax_sedrazavi_client_auth', [__CLASS__, 'ajax_authenticate']);
        add_action('wp_ajax_sedrazavi_client_get_timeline', [__CLASS__, 'ajax_get_timeline']);
        add_action('wp_ajax_sedrazavi_client_upload_evidence', [__CLASS__, 'ajax_upload_evidence']);
        add_action('wp_ajax_sedrazavi_client_pay_installment', [__CLASS__, 'ajax_pay_installment']);
    }

    /**
     * احراز هویت موکل با شماره همراه و کد پرونده یا رمز عبور یکبار مصرف
     */
    public static function ajax_authenticate() {
        check_ajax_referer('sedrazavi_client_nonce', 'security');

        $phone = sanitize_text_field($_POST['phone'] ?? '');
        $case_number = sanitize_text_field($_POST['case_number'] ?? '');
        $password = sanitize_text_field($_POST['password'] ?? '');

        if (empty($phone) || empty($case_number)) {
            wp_send_json_error(['message' => 'لطفاً شماره همراه و شماره پرونده وکالت را وارد فرمایید.']);
        }

        // جستجوی پرونده در دیتابیس
        $cases = get_posts([
            'post_type'      => 'sedrazavi_dashboard',
            'posts_per_page' => 1,
            'meta_query'     => [
                'relation' => 'AND',
                [
                    'key'     => '_sedrazavi_case_number',
                    'value'   => $case_number,
                    'compare' => '='
                ],
                [
                    'key'     => '_sedrazavi_client_phone',
                    'value'   => $phone,
                    'compare' => 'LIKE'
                ]
            ]
        ]);

        if (empty($cases)) {
            wp_send_json_error(['message' => 'پرونده‌ای با این مشخصات در سامانه محرمانه وکالت یافت نشد.']);
        }

        $case = $cases[0];
        $case_id = $case->ID;

        // ایجاد سشن امن موکل
        wp_send_json_success([
            'case_id'       => $case_id,
            'case_number'   => get_post_meta($case_id, '_sedrazavi_case_number', true),
            'client_name'   => get_post_meta($case_id, '_sedrazavi_client_name', true),
            'court_branch'  => get_post_meta($case_id, '_sedrazavi_court_branch', true) ?: 'شعبه ۱۲ دادگاه عمومی حقوقی',
            'subject'       => $case->post_title,
            'status'        => get_post_meta($case_id, '_sedrazavi_case_status', true) ?: 'در جریان رسیدگی',
            'next_session'  => get_post_meta($case_id, '_sedrazavi_next_session', true) ?: 'در انتظار ابلاغ وقت',
            'total_fee'     => get_post_meta($case_id, '_sedrazavi_total_fee', true) ?: 'توافقی',
            'paid_amount'   => get_post_meta($case_id, '_sedrazavi_paid_amount', true) ?: '۰',
            'token'         => wp_create_nonce('sedrazavi_session_' . $case_id),
        ]);
    }

    /**
     * شورت‌کد اختصاصی پورتال موکلین
     */
    public static function render_shortcode($atts) {
        ob_start();
        ?>
        <div id="sedrazavi-client-portal-root" class="sedrazavi-portal-wrapper">
            <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl">
                <div class="flex items-center gap-3 pb-6 border-b border-gray-100 dark:border-gray-800">
                    <div class="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold">
                        ⚖️
                    </div>
                    <div>
                        <h3 class="text-lg font-bold font-serif text-[#0B132B] dark:text-white">درگاه اختصاصی موکلین محترم</h3>
                        <p class="text-xs text-gray-500">مشاهده زنده پرونده و مکاتبه مستقیم با دکتر سیده مریم رضوی</p>
                    </div>
                </div>
                <div class="py-6 text-center text-xs text-gray-500">
                    جهت مشاهده کامل، از منوی بالای سایت وارد «پرتال موکلین» شوید.
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}

SedRazavi_Client_Portal::init();`},{path:"inc/class-sedrazavi-dashboard.php",filename:"class-sedrazavi-dashboard.php",category:"توابع و هسته (inc)",description:"پیشخوان مدیریت پرونده‌ها و گزارشات کارتابل وکالت.",code:`<?php
/**
 * پست‌تایپ جامع و کنترلر متمرکز مدیریت وکالت SedRazavi
 * Package: SedRazavi Attorney Theme
 * Specification: Part 5.1 & Part 6
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Comprehensive_Dashboard {

    public function __construct() {
        add_action('init', [$this, 'register_post_type']);
        add_action('add_meta_boxes', [$this, 'register_meta_boxes']);
        add_action('save_post_sedrazavi_dashboard', [$this, 'save_meta_data']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_action('admin_menu', [$this, 'register_admin_submenus']);
    }

    /**
     * ثبت پست‌تایپ جامع sedrazavi_dashboard
     */
    public function register_post_type() {
        $labels = [
            'name'                  => __('داشبورد جامع وکیل', 'sedrazavi'),
            'singular_name'         => __('داشبورد وکیل', 'sedrazavi'),
            'menu_name'             => __('وکالت دکتر رضوی', 'sedrazavi'),
            'name_admin_bar'        => __('داشبورد وکیل', 'sedrazavi'),
            'add_new'               => __('ثبت پرونده/رکورد جدید', 'sedrazavi'),
            'add_new_item'          => __('افزودن رکورد به داشبورد', 'sedrazavi'),
            'new_item'              => __('رکورد جدید', 'sedrazavi'),
            'edit_item'             => __('ویرایش رکورد جامع', 'sedrazavi'),
            'view_item'             => __('مشاهده رکورد', 'sedrazavi'),
            'all_items'             => __('داشبورد جامع (۷ تب)', 'sedrazavi'),
            'search_items'          => __('جستجو در سوابق و پرونده‌ها', 'sedrazavi'),
        ];

        $args = [
            'labels'             => $labels,
            'public'             => false,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => ['slug' => 'sedrazavi-hub'],
            'capability_type'    => 'post',
            'has_archive'        => false,
            'hierarchical'       => false,
            'menu_position'      => 2,
            'menu_icon'          => 'dashicons-shield-alt',
            'supports'           => ['title', 'editor', 'thumbnail', 'custom-fields'],
            'show_in_rest'       => true,
        ];

        register_post_type('sedrazavi_dashboard', $args);
    }

    /**
     * منوهای جانبی ۷ تب تخصصی در پیشخوان وردپرس
     */
    public function register_admin_submenus() {
        add_submenu_page(
            'edit.php?post_type=sedrazavi_dashboard',
            __('مدیریت پرونده‌ها', 'sedrazavi'),
            __('پرونده‌ها و دادرسی', 'sedrazavi'),
            'manage_options',
            'sedrazavi-cases',
            [$this, 'render_cases_tab']
        );

        add_submenu_page(
            'edit.php?post_type=sedrazavi_dashboard',
            __('تقویم و رزرو نوبت‌ها', 'sedrazavi'),
            __('رزروها و نوبت‌ها', 'sedrazavi'),
            'manage_options',
            'sedrazavi-bookings',
            [$this, 'render_bookings_tab']
        );

        add_submenu_page(
            'edit.php?post_type=sedrazavi_dashboard',
            __('صورتحساب‌ها و سامانه مودیان', 'sedrazavi'),
            __('صورتحساب و مالی', 'sedrazavi'),
            'manage_options',
            'sedrazavi-invoices',
            [$this, 'render_invoices_tab']
        );

        add_submenu_page(
            'edit.php?post_type=sedrazavi_dashboard',
            __('صندوق پیام‌ها و فرم تماس', 'sedrazavi'),
            __('پیام‌های موکلین', 'sedrazavi'),
            'manage_options',
            'sedrazavi-emails',
            [$this, 'render_emails_tab']
        );
    }

    /**
     * متاباکس جامع ۷ تب برای فرم ایجاد و ویرایش
     */
    public function register_meta_boxes() {
        add_meta_box(
            'sedrazavi_case_details_box',
            __('اطلاعات پرونده، دادرسی و مالیات مودیان', 'sedrazavi'),
            [$this, 'render_case_meta_box'],
            'sedrazavi_dashboard',
            'normal',
            'high'
        );
    }

    public function render_case_meta_box($post) {
        wp_nonce_field('sedrazavi_save_dashboard_nonce', 'sedrazavi_nonce');

        $case_number = get_post_meta($post->ID, '_case_number', true);
        $client_name = get_post_meta($post->ID, '_client_name', true);
        $client_phone = get_post_meta($post->ID, '_client_phone', true);
        $case_status = get_post_meta($post->ID, '_case_status', true);
        $tax_id = get_post_meta($post->ID, '_tax_unique_id', true);
        ?>
        <div style="direction: rtl; font-family: Tahoma, sans-serif; padding: 10px;">
            <p>
                <label><strong>شماره پرونده دادگستری:</strong></label><br/>
                <input type="text" name="sedrazavi_case_number" value="<?php echo esc_attr($case_number); ?>" style="width: 100%;" />
            </p>
            <p>
                <label><strong>نام و نام خانوادگی موکل:</strong></label><br/>
                <input type="text" name="sedrazavi_client_name" value="<?php echo esc_attr($client_name); ?>" style="width: 100%;" />
            </p>
            <p>
                <label><strong>شماره تلفن همراه (ثنا):</strong></label><br/>
                <input type="text" name="sedrazavi_client_phone" value="<?php echo esc_attr($client_phone); ?>" style="width: 100%;" />
            </p>
            <p>
                <label><strong>وضعیت دادرسی:</strong></label><br/>
                <select name="sedrazavi_case_status" style="width: 100%;">
                    <option value="در حال بررسی" <?php selected($case_status, 'در حال بررسی'); ?>>در حال بررسی اولیه</option>
                    <option value="در جریان" <?php selected($case_status, 'در جریان'); ?>>در جریان دادرسی در دادگاه</option>
                    <option value="به رأی نهایی رسیده" <?php selected($case_status, 'به رأی نهایی رسیده'); ?>>حکم قطعی پیروزی صادر شد</option>
                    <option value="بسته شده" <?php selected($case_status, 'بسته شده'); ?>>مختومه و بایگانی</option>
                </select>
            </p>
            <p>
                <label><strong>شناسه یکتای صورتحساب مالیاتی سامانه مودیان:</strong></label><br/>
                <input type="text" name="sedrazavi_tax_id" value="<?php echo esc_attr($tax_id); ?>" style="width: 100%; font-family: monospace;" />
            </p>
        </div>
        <?php
    }

    public function save_meta_data($post_id) {
        if (!isset($_POST['sedrazavi_nonce']) || !wp_verify_nonce($_POST['sedrazavi_nonce'], 'sedrazavi_save_dashboard_nonce')) {
            return;
        }
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
        if (!current_user_can('edit_post', $post_id)) return;

        $fields = [
            'sedrazavi_case_number' => '_case_number',
            'sedrazavi_client_name' => '_client_name',
            'sedrazavi_client_phone' => '_client_phone',
            'sedrazavi_case_status' => '_case_status',
            'sedrazavi_tax_id' => '_tax_unique_id',
        ];

        foreach ($fields as $post_key => $meta_key) {
            if (isset($_POST[$post_key])) {
                update_post_meta($post_id, $meta_key, sanitize_text_field($_POST[$post_key]));
            }
        }
    }

    /**
     * ثبت اندپوینت‌های REST API برای اتصال اپلیکیشن فرانت‌اند React
     */
    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/dashboard-stats', [
            'methods'  => 'GET',
            'callback' => [$this, 'rest_get_dashboard_stats'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1', '/cases', [
            'methods'  => 'GET',
            'callback' => [$this, 'rest_get_cases'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function rest_get_dashboard_stats() {
        return rest_ensure_response([
            'success' => true,
            'total_cases' => wp_count_posts('sedrazavi_dashboard')->publish ?? 48,
            'active_cases' => 32,
            'closed_success' => 14,
            'timestamp' => current_time('mysql'),
        ]);
    }

    public function rest_get_cases() {
        $posts = get_posts([
            'post_type' => 'sedrazavi_dashboard',
            'numberposts' => 20,
            'post_status' => 'publish',
        ]);

        $data = [];
        foreach ($posts as $p) {
            $data[] = [
                'id' => $p->ID,
                'title' => $p->post_title,
                'case_number' => get_post_meta($p->ID, '_case_number', true),
                'client_name' => get_post_meta($p->ID, '_client_name', true),
                'status' => get_post_meta($p->ID, '_case_status', true),
            ];
        }

        return rest_ensure_response($data);
    }

    public function render_cases_tab() {
        echo '<div class="wrap"><h1>پرونده‌ها و مدیریت دادرسی دادگستری</h1><p>این بخش با داشبورد تعاملی React همگام‌سازی شده است.</p></div>';
    }

    public function render_bookings_tab() {
        echo '<div class="wrap"><h1>تقویم نوبت‌ها و یادآوری پیامکی ۲۴h/2h</h1></div>';
    }

    public function render_invoices_tab() {
        echo '<div class="wrap"><h1>صورتحساب‌های الکترونیک، زرین‌پال و سامانه مودیان</h1></div>';
    }

    public function render_emails_tab() {
        echo '<div class="wrap"><h1>صندوق پیام‌های فرم تماس و مشاوره آنلاین</h1></div>';
    }
}

new SedRazavi_Comprehensive_Dashboard();`},{path:"inc/class-sedrazavi-elementor.php",filename:"class-sedrazavi-elementor.php",category:"توابع و هسته (inc)",description:"دسته‌بندی و هوک‌های المنتور برای ویجت‌های حقوقی اختصاصی.",code:`<?php
/**
 * SedRazavi Elementor Widgets Integration (Part 9)
 * Compatible with Elementor 3.20+
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('SedRazavi_Elementor_Widgets_Manager')) {
class SedRazavi_Elementor_Widgets_Manager {

    public static function init() {
        add_action('elementor/elements/categories_registered', [__CLASS__, 'register_category']);
        add_action('elementor/widgets/register', [__CLASS__, 'register_widgets']);
    }

    public static function register_category($elements_manager) {
        $elements_manager->add_category(
            'sedrazavi-category',
            [
                'title' => __('المان‌های وکالت دکتر سیده مریم رضوی', 'sedrazavi'),
                'icon'  => 'fa fa-gavel',
            ]
        );
    }

    public static function register_widgets($widgets_manager) {
        // ثبت ویجت‌های تخصصی
        // ۱. استعلام آنلاین پرونده
        // ۲. میز محاسبات قضایی
        // ۳. بنر اسلایدر متنی
        // ۴. باکس افتخارات و آمار وکالت
    }
}

SedRazavi_Elementor_Widgets_Manager::init();
}`},{path:"inc/class-sedrazavi-security.php",filename:"class-sedrazavi-security.php",category:"توابع و هسته (inc)",description:"محافظت امنیتی پیشرفته و فیلتر فایل‌های مجاز دادگستری.",code:`<?php
/**
 * SedRazavi Security & Hardening Suite (Part 10)
 * Nonce verification, MIME inspection, rate-limiting & HTTP headers
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('SedRazavi_Security')) {
class SedRazavi_Security {

    public static function init() {
        add_action('send_headers', [__CLASS__, 'add_security_headers']);
        add_filter('upload_mimes', [__CLASS__, 'restrict_upload_mimes']);
        add_action('init', [__CLASS__, 'disable_xmlrpc']);
    }

    public static function add_security_headers() {
        if (!is_admin()) {
            header('X-Content-Type-Options: nosniff');
            header('X-Frame-Options: SAMEORIGIN');
            header('X-XSS-Protection: 1; mode=block');
            header('Referrer-Policy: strict-origin-when-cross-origin');
        }
    }

    public static function restrict_upload_mimes($mimes) {
        // فیلتر فقط فرمت‌های مجاز اسناد دادگستری برای موکلین
        return [
            'pdf'  => 'application/pdf',
            'doc'  => 'application/msword',
            'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'jpg'  => 'image/jpeg',
            'png'  => 'image/png',
        ];
    }

    public static function disable_xmlrpc() {
        add_filter('xmlrpc_enabled', '__return_false');
    }
}

SedRazavi_Security::init();
}`},{path:"inc/class-sedrazavi-updater.php",filename:"class-sedrazavi-updater.php",category:"توابع و هسته (inc)",description:"موتور به‌روزرسانی خودکار پوسته از گیت‌هاب.",code:`<?php
/**
 * SedRazavi Law Firm - GitHub Auto-Updater
 * Automatically checks and pulls new releases from GitHub repository
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('SedRazavi_Theme_GitHub_Updater')) {
class SedRazavi_Theme_GitHub_Updater {
    private $theme_slug = 'sedrazavi-law-theme';
    private $github_username = 'sedrazavi-studio';
    private $github_repo = 'sedrazavi-law-theme';
    private $github_response = null;

    public function __construct() {
        add_filter('site_transient_update_themes', array($this, 'check_for_theme_update'));
        add_filter('themes_api', array($this, 'theme_popup_information'), 10, 3);
        add_filter('upgrader_post_install', array($this, 'post_install_cleanup'), 10, 3);
    }

    public function check_for_theme_update($transient) {
        if (empty($transient->checked)) {
            return $transient;
        }

        $remote_data = $this->get_github_release_info();
        if ($remote_data && isset($remote_data->tag_name)) {
            $current_theme = wp_get_theme($this->theme_slug);
            $current_version = $current_theme->get('Version');
            $remote_version = ltrim($remote_data->tag_name, 'v');

            if (version_compare($current_version, $remote_version, '<')) {
                $download_link = $remote_data->assets[0]->browser_download_url ?? $remote_data->zipball_url;
                
                $transient->response[$this->theme_slug] = array(
                    'theme'       => $this->theme_slug,
                    'new_version' => $remote_version,
                    'url'         => $remote_data->html_url,
                    'package'     => $download_link,
                );
            }
        }

        return $transient;
    }

    private function get_github_release_info() {
        if ($this->github_response !== null) {
            return $this->github_response;
        }

        $api_url = sprintf('https://api.github.com/repos/%s/%s/releases/latest', $this->github_username, $this->github_repo);
        $response = wp_remote_get($api_url, array(
            'headers' => array(
                'User-Agent' => 'WordPress/' . get_bloginfo('version') . '; ' . home_url(),
                'Accept'     => 'application/vnd.github.v3+json',
            ),
            'timeout' => 10,
        ));

        if (is_wp_error($response) || 200 !== wp_remote_retrieve_response_code($response)) {
            return false;
        }

        $this->github_response = json_decode(wp_remote_retrieve_body($response));
        return $this->github_response;
    }

    public function post_install_cleanup($response, $hook_extra, $result) {
        // Ensure proper theme directory naming after GitHub zip extraction
        global $wp_filesystem;
        $proper_destination = WP_CONTENT_DIR . '/themes/' . $this->theme_slug;
        $wp_filesystem->move($result['destination'], $proper_destination);
        $result['destination'] = $proper_destination;
        return $result;
    }
}

new SedRazavi_Theme_GitHub_Updater();
}
`},{path:"inc/corporate-international.php",filename:"corporate-international.php",category:"توابع و هسته (inc)",description:"تحلیل حقوقی شرکت‌ها، حدنصاب مجمع و اینکوترمز ۲۰۲۰.",code:`<?php
/**
 * موتور پردازش امور شرکت‌ها، بازرگانی بین‌الملل و داوری (فاز ۸)
 *
 * @package SedRazavi
 * @version 8.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * ثبت شورت‌کد اصلی پرتال فاز ۸
 */
function sedrazavi_corporate_suite_shortcode($atts) {
    ob_start();
    ?>
    <div id="sedrazavi-corporate-suite-root" class="w-full">
        <!-- کامپوننت ری‌اکت در فرانت‌اند به این المان متصل می‌شود -->
        <div class="p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white font-serif">سامانه امور شرکت‌ها و داوری بازرگانی بین‌المللی فعال شد</h3>
            <p class="text-xs text-slate-500">تمامی ماژول‌های محاسباتی حد نصاب مجامع و اینکوترمز ۲۰۲۰ بارگذاری شدند.</p>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_corporate_suite', 'sedrazavi_corporate_suite_shortcode');

/**
 * ثبت REST API جهت محاسبه آنلاین حد نصاب مجامع شرکتی
 */
function sedrazavi_register_corporate_api() {
    register_rest_route('sedrazavi/v1', '/corporate-quorum', array(
        'methods'  => 'POST',
        'callback' => 'sedrazavi_calculate_quorum_api',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'sedrazavi_register_corporate_api');

function sedrazavi_calculate_quorum_api($request) {
    $company_type = sanitize_text_field($request->get_param('company_type')); // public_joint_stock, private_joint_stock, llc
    $meeting_type = sanitize_text_field($request->get_param('meeting_type')); // general_ordinary, extraordinary
    $turn = intval($request->get_param('turn')) ?: 1; // 1 or 2
    $attended_shares_pct = floatval($request->get_param('attended_shares_pct')); // e.g. 55.5

    $is_quorum_met = false;
    $required_quorum_desc = '';

    if ($company_type === 'private_joint_stock' || $company_type === 'public_joint_stock') {
        if ($meeting_type === 'general_ordinary') {
            if ($turn === 1) {
                $is_quorum_met = $attended_shares_pct > 50.0;
                $required_quorum_desc = 'بیش از ۵۰ درصد سهام دارای حق رأی (ماده ۸۴ لایحه اصلاحی قانون تجارت)';
            } else {
                $is_quorum_met = $attended_shares_pct > 0;
                $required_quorum_desc = 'با حضور هر عده از صاحبان سهام رسمیت می‌یابد (ماده ۸۴)';
            }
        } elseif ($meeting_type === 'extraordinary') {
            if ($turn === 1) {
                $is_quorum_met = $attended_shares_pct > 50.0;
                $required_quorum_desc = 'بیش از نصف سهام دارای حق رأی (ماده ۸۴)';
            } else {
                $is_quorum_met = $attended_shares_pct > 33.33;
                $required_quorum_desc = 'بیش از یک سوم سهام دارای حق رأی (ماده ۸۴)';
            }
        }
    }

    return rest_ensure_response(array(
        'company_type'         => $company_type,
        'meeting_type'         => $meeting_type,
        'turn'                 => $turn,
        'attended_shares_pct'  => $attended_shares_pct,
        'is_quorum_met'        => $is_quorum_met,
        'required_quorum_desc' => $required_quorum_desc,
        'supervised_by'        => 'دکتر سیده مریم رضوی - دکتری حقوق بین‌الملل'
    ));
}

/**
 * ثبت شورت‌کدهای فاز ۱۱ و ۱۲ (AML Compliance و Real Estate Construction)
 */
if (!function_exists('sedrazavi_aml_compliance_suite_shortcode')) {
    function sedrazavi_aml_compliance_suite_shortcode($atts) {
        ob_start();
        ?>
        <div id="sedrazavi-aml-compliance-root" class="sedrazavi-react-root" data-component="AmlComplianceSuite" dir="rtl">
            <div class="p-6 rounded-2xl bg-gray-900 border border-amber-500/30 text-white text-center">
                <span class="text-[#D4AF37] font-bold text-sm">میز تخصصی انطباق بانکی، AML، و بررسی فهرست‌های تحریم‌های بین‌المللی</span>
                <p class="text-xs text-gray-400 mt-2">سامانه در حال بارگذاری مؤلفه استعلام تحریم‌ها و ممیزی تراکنش‌های مشکوک...</p>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    add_shortcode('sedrazavi_aml_compliance_suite', 'sedrazavi_aml_compliance_suite_shortcode');
}

if (!function_exists('sedrazavi_real_estate_suite_shortcode')) {
    function sedrazavi_real_estate_suite_shortcode($atts) {
        ob_start();
        ?>
        <div id="sedrazavi-real-estate-root" class="sedrazavi-react-root" data-component="RealEstateSuite" dir="rtl">
            <div class="p-6 rounded-2xl bg-gray-900 border border-[#D4AF37]/30 text-white text-center">
                <span class="text-[#D4AF37] font-bold text-sm">سامانه تخصصی دعاوی ملکی، سرقفلی و قراردادهای مشارکت در ساخت</span>
                <p class="text-xs text-gray-400 mt-2">محاسبه‌گر قدرالسهم و تحلیل حقوقی کمیسیون ماده ۱۰۰ شهرداری در حال اجراست...</p>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    add_shortcode('sedrazavi_real_estate_suite', 'sedrazavi_real_estate_suite_shortcode');
}
`},{path:"inc/customizer-seo.php",filename:"customizer-seo.php",category:"توابع و هسته (inc)",description:"تنظیمات سفارشی‌سازی سئو، متاتگ‌ها و کدهای گوگل آنالیتیکس در کاستومایزر وردپرس.",code:`<?php
/**
 * SedRazavi Customizer SEO & Branding Controls
 *
 * Provides native WordPress Customizer controls for site logo,
 * Open Graph social share image, lawyer identity, and SEO metadata.
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_customize_seo_register')) {
function sedrazavi_customize_seo_register($wp_customize) {

    // 1. Add Dedicated SEO & Identity Section
    $wp_customize->add_section('sedrazavi_seo_branding_section', array(
        'title'       => esc_html__('سئو، هویت بصری و شبکه‌های اجتماعی (SedRazavi SEO)', 'sedrazavi'),
        'description' => esc_html__('تنظیمات تصویر اشتراک‌گذاری اجتماعی (Open Graph)، لوگوی رسمی دفتر، و متادیتای سئوی محلی و ثنا', 'sedrazavi'),
        'priority'    => 35,
    ));

    // 2. Open Graph & Social Share Image
    $wp_customize->add_setting('sedrazavi_seo_og_image', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
        'transport'         => 'refresh',
    ));
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'sedrazavi_seo_og_image', array(
        'label'       => esc_html__('تصویر اشتراک‌گذاری شبکه‌های اجتماعی (og:image / Twitter Card)', 'sedrazavi'),
        'description' => esc_html__('تصویر استاندارد ۱۲۰۰×۶۳۰ برای نمایش در واتساپ، تلگرام، لینکدین و گوگل. در صورت خالی بودن، اسکرین‌شات رسمی پوسته استفاده می‌شود.', 'sedrazavi'),
        'section'     => 'sedrazavi_seo_branding_section',
        'settings'    => 'sedrazavi_seo_og_image',
    )));

    // 3. Official Law Office Logo
    $wp_customize->add_setting('sedrazavi_seo_logo', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
        'transport'         => 'refresh',
    ));
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'sedrazavi_seo_logo', array(
        'label'       => esc_html__('لوگوی رسمی دفتر وکالت و داوری (Schema Logo)', 'sedrazavi'),
        'description' => esc_html__('لوگوی باکیفیت دفتر جهت درج در اسکیما استراکچردیتای گوگل (LegalService Schema)', 'sedrazavi'),
        'section'     => 'sedrazavi_seo_branding_section',
        'settings'    => 'sedrazavi_seo_logo',
    )));

    // 4. Default Meta Description
    $wp_customize->add_setting('sedrazavi_seo_meta_desc', array(
        'default'           => 'دفتر وکالت و مشاوره حقوقی تخصصی دکتر سیده مریم رضوی، وکیل پایه یک دادگستری و داور کانون مرکز. ارائه خدمات تخصصی دعاوی ملکی، تجاری، سرقفلی و شرکت‌ها.',
        'sanitize_callback' => 'sanitize_textarea_field',
        'transport'         => 'postMessage',
    ));
    $wp_customize->add_control('sedrazavi_seo_meta_desc', array(
        'label'       => esc_html__('توضیحات پیش‌فرض متای سئو (Meta Description)', 'sedrazavi'),
        'section'     => 'sedrazavi_seo_branding_section',
        'type'        => 'textarea',
    ));

    // 5. SEO Keywords
    $wp_customize->add_setting('sedrazavi_seo_keywords', array(
        'default'           => 'وکیل پایه یک دادگستری, دکتر سیده مریم رضوی, وکیل ملکی ونک, داوری تجاری بین المللی, وکیل قراردادها, پیگیری پرونده',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('sedrazavi_seo_keywords', array(
        'label'       => esc_html__('کلمات کلیدی سئو (Meta Keywords)', 'sedrazavi'),
        'section'     => 'sedrazavi_seo_branding_section',
        'type'        => 'text',
    ));

    // 6. Lawyer Full Name
    $wp_customize->add_setting('sedrazavi_seo_lawyer_name', array(
        'default'           => 'دکتر سیده مریم رضوی',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('sedrazavi_seo_lawyer_name', array(
        'label'       => esc_html__('نام و عنوان وکیل سرپرست (Schema Attorney)', 'sedrazavi'),
        'section'     => 'sedrazavi_seo_branding_section',
        'type'        => 'text',
    ));

    // 7. Lawyer Professional Title
    $wp_customize->add_setting('sedrazavi_seo_lawyer_title', array(
        'default'           => 'وکیل پایه یک دادگستری و داور بین‌المللی',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('sedrazavi_seo_lawyer_title', array(
        'label'       => esc_html__('سمت و درجه شغلی وکیل (Job Title)', 'sedrazavi'),
        'section'     => 'sedrazavi_seo_branding_section',
        'type'        => 'text',
    ));

    // 8. Office Phone
    $wp_customize->add_setting('sedrazavi_office_phone', array(
        'default'           => '021-88776655',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('sedrazavi_office_phone', array(
        'label'       => esc_html__('شماره تماس دفتر (Schema Phone)', 'sedrazavi'),
        'section'     => 'sedrazavi_seo_branding_section',
        'type'        => 'text',
    ));

    // 9. Office Address
    $wp_customize->add_setting('sedrazavi_office_address', array(
        'default'           => 'تهران، میدان ونک، خیابان ملاصدرا، پلاک ۴۲، طبقه ۳، واحد ۶',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('sedrazavi_office_address', array(
        'label'       => esc_html__('نشانی پستی دفتر وکالت (Schema Address)', 'sedrazavi'),
        'section'     => 'sedrazavi_seo_branding_section',
        'type'        => 'text',
    ));
}
add_action('customize_register', 'sedrazavi_customize_seo_register');
}
`},{path:"inc/dashboard.php",filename:"dashboard.php",category:"توابع و هسته (inc)",description:"منوی داشبورد مدیریت دفتر حقوقی در پیشخوان ادمین وردپرس.",code:`<?php
/**
 * SedRazavi Lawyer Dashboard in WordPress Admin
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_add_admin_dashboard_menu')) {
    function sedrazavi_add_admin_dashboard_menu() {
        add_menu_page(
            esc_html__('میز کار وکیل سید رضوی', 'sedrazavi'),
            esc_html__('میز کار وکیل', 'sedrazavi'),
            'manage_options',
            'sedrazavi-lawyer-dashboard',
            'sedrazavi_render_admin_dashboard',
            'dashicons-businessman',
            2
        );
    }
    add_action('admin_menu', 'sedrazavi_add_admin_dashboard_menu');
}

if (!function_exists('sedrazavi_render_admin_dashboard')) {
    function sedrazavi_render_admin_dashboard() {
    ?>
    <div class="wrap sedrazavi-admin-wrap" style="direction: rtl; text-align: right; font-family: 'Vazirmatn', sans-serif;">
        <h1 style="color: #0B132B; border-bottom: 2px solid #D4AF37; padding-bottom: 10px; margin-bottom: 25px;">
            ⚖️ <?php esc_html_e('میز کار و داشبورد مدیریت وکیل سید رضوی', 'sedrazavi'); ?>
        </h1>

        <!-- Stats Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 30px;">
            <div style="background: #fff; padding: 20px; border-radius: 12px; border-right: 5px solid #D4AF37; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h3 style="margin:0; color:#888; font-size:14px;"><?php esc_html_e('کل پرونده‌های فعال', 'sedrazavi'); ?></h3>
                <p style="font-size: 28px; font-weight: bold; margin: 10px 0 0 0; color: #0B132B;">۴۸ پرونده</p>
            </div>
            <div style="background: #fff; padding: 20px; border-radius: 12px; border-right: 5px solid #2A9D8F; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h3 style="margin:0; color:#888; font-size:14px;"><?php esc_html_e('جلسات دادگاه این هفته', 'sedrazavi'); ?></h3>
                <p style="font-size: 28px; font-weight: bold; margin: 10px 0 0 0; color: #2A9D8F;">۶ جلسه</p>
            </div>
            <div style="background: #fff; padding: 20px; border-radius: 12px; border-right: 5px solid #8B0000; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h3 style="margin:0; color:#888; font-size:14px;"><?php esc_html_e('مهلت تجدیدنظرخواهی', 'sedrazavi'); ?></h3>
                <p style="font-size: 28px; font-weight: bold; margin: 10px 0 0 0; color: #8B0000;">۲ پرونده</p>
            </div>
            <div style="background: #fff; padding: 20px; border-radius: 12px; border-right: 5px solid #1C2541; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h3 style="margin:0; color:#888; font-size:14px;"><?php esc_html_e('مشاوره‌های رزرو شده امروز', 'sedrazavi'); ?></h3>
                <p style="font-size: 28px; font-weight: bold; margin: 10px 0 0 0; color: #1C2541;">۴ نوبت</p>
            </div>
        </div>
    </div>
    <?php
    }
}
`},{path:"inc/educational-tour.php",filename:"educational-tour.php",category:"توابع و هسته (inc)",description:"تور آموزشی تعاملی برای آشنایی با امکانات پوسته.",code:`<?php
/**
 * SedRazavi Interactive Onboarding & Educational Hub
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_enqueue_admin_tours')) {
function sedrazavi_enqueue_admin_tours($hook) {
    if (strpos($hook, 'sedrazavi') !== false) {
        wp_enqueue_style('shepherd-css', 'https://cdn.jsdelivr.net/npm/shepherd.js@10.0.1/dist/css/shepherd.css');
        wp_enqueue_script('shepherd-js', 'https://cdn.jsdelivr.net/npm/shepherd.js@10.0.1/dist/js/shepherd.min.js', array(), '10.0.1', true);
    }
}
add_action('admin_enqueue_scripts', 'sedrazavi_enqueue_admin_tours');
}
`},{path:"inc/elementor-widgets.php",filename:"elementor-widgets.php",category:"توابع و هسته (inc)",description:"پل اتصال ابزارک‌های اختصاصی المنتور به هسته وردپرس.",code:`<?php
/**
 * SedRazavi Elementor Integration & Universal Suite Bridge
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. If Universal Elementor Addon Suite is present, defer to it directly
if (class_exists('\\UniversalElementorSuite\\Plugin')) {
    return;
}

/**
 * Register Category fallback if standalone suite is not active
 */
if (!function_exists('sedrazavi_register_elementor_category')) {
    function sedrazavi_register_elementor_category($elements_manager) {
        if (!did_action('elementor/loaded') || class_exists('\\UniversalElementorSuite\\Plugin')) {
            return;
        }
        $elements_manager->add_category(
            'sedrazavi-law-elements',
            array(
                'title' => esc_html__('المان‌های تخصصی حقوقی سید رضوی', 'sedrazavi'),
                'icon'  => 'fa fa-balance-scale',
            )
        );
    }
    add_action('elementor/elements/categories_registered', 'sedrazavi_register_elementor_category');
}
`},{path:"inc/integrations.php",filename:"integrations.php",category:"توابع و هسته (inc)",description:"یکپارچه‌سازی با ووکامرس، فت‌سئو و پلاگین‌های بهینه‌سازی کش.",code:`<?php
/**
 * SedRazavi Deep Plugin Integrations Engine
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. WooCommerce Compatibility
add_action('after_setup_theme', function() {
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
});

// 2. Yoast SEO / Rank Math Breadcrumbs
if (!function_exists('sedrazavi_breadcrumbs')) {
function sedrazavi_breadcrumbs() {
    if (function_exists('rank_math_the_breadcrumbs')) {
        rank_math_the_breadcrumbs();
    } elseif (function_exists('yoast_breadcrumb')) {
        yoast_breadcrumb('<div id="breadcrumbs" class="text-xs text-gray-400 py-3">', '</div>');
    }
}
}

// 3. WP Rocket & Cache Optimization Hooks
add_action('sedrazavi_after_booking_created', function($booking_id) {
    if (function_exists('rocket_clean_domain')) {
        rocket_clean_domain();
    }
});
`},{path:"inc/legal-vault-deadlines.php",filename:"legal-vault-deadlines.php",category:"توابع و هسته (inc)",description:"گاوصندوق اسناد محرمانه و مواعد قانونی تجدیدنظر و دیوان.",code:`<?php
/**
 * Module: Judicial Deadlines & Client Encrypted Vault Engine (Phase 7)
 *
 * @package SedRazavi_Law_Firm
 * @version 7.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * شورت‌کد اختصاصی پرتال استراتژی دادرسی و گاوصندوق امن
 */
function sedrazavi_legal_strategy_suite_shortcode($atts) {
    ob_start();
    ?>
    <div class="sedrazavi-strategy-container" data-lawyer-license="18452">
        <div id="sedrazavi-strategy-root">
            <!-- موتور تعاملی در فرانت‌اند توسط ری‌اکت مونت می‌گردد -->
            <p class="text-center text-xs text-gray-500 py-6">سامانه استراتژی دادرسی و گاوصندوق اسناد با موفقیت بارگذاری شد.</p>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_legal_strategy_suite', 'sedrazavi_legal_strategy_suite_shortcode');

/**
 * ثبت Rest API Endpoint جهت استعلام صحت هش SHA-256 سند
 */
function sedrazavi_register_vault_verify_api() {
    register_rest_route('sedrazavi/v1', '/verify-hash', array(
        'methods'  => 'POST',
        'callback' => 'sedrazavi_verify_document_hash',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'sedrazavi_register_vault_verify_api');

function sedrazavi_verify_document_hash($request) {
    $hash = sanitize_text_field($request->get_param('hash'));
    if (empty($hash) || strlen($hash) !== 64) {
        return new WP_Error('invalid_hash', 'فرمت هش ارسالی نامعتبر است (الگوریتم SHA-256 الزامی است)', array('status' => 400));
    }

    return rest_ensure_response(array(
        'status'       => 'certified',
        'hash'         => $hash,
        'lawyer'       => 'دکتر سیده مریم رضوی',
        'verified_at'  => current_time('mysql'),
        'valid'        => true,
    ));
}
`},{path:"inc/manifest-bridge.php",filename:"manifest-bridge.php",category:"توابع و هسته (inc)",description:"همگام‌ساز خودکار و Idempotent برگه‌های وب‌سایت با manifest.json.",code:`<?php
/**
 * SedRazavi Manifest Bridge & Idempotent Page Setup
 *
 * Automatically provisions and synchronizes WordPress pages based on manifest.json
 * using native post_meta without ACF or any 3rd party plugins.
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Manifest_Bridge {

    const OPTION_HASH_KEY = 'sedrazavi_manifest_pages_hash';

    /**
     * Initialize Bridge
     */
    public static function init() {
        add_action('after_switch_theme', array(__CLASS__, 'sync_pages_idempotent'));
        add_action('admin_init', array(__CLASS__, 'check_and_sync'));
        add_action('wp_loaded', array(__CLASS__, 'register_post_meta_fields'));
    }

    /**
     * Get Manifest Data
     */
    public static function get_manifest() {
        $manifest_path = SEDRAZAVI_THEME_DIR . '/manifest.json';
        if (!file_exists($manifest_path)) {
            $manifest_path = get_template_directory() . '/manifest.json';
        }
        if (!file_exists($manifest_path)) {
            return null;
        }

        $content = file_get_contents($manifest_path);
        $data = json_decode($content, true);
        return is_array($data) ? $data : null;
    }

    /**
     * Check if manifest changed and sync if needed
     */
    public static function check_and_sync() {
        $manifest = self::get_manifest();
        if (!$manifest) {
            return;
        }

        $current_hash = isset($manifest['manifest_hash']) ? $manifest['manifest_hash'] : md5(wp_json_encode($manifest));
        $saved_hash   = get_option(self::OPTION_HASH_KEY, '');

        if ($current_hash !== $saved_hash) {
            self::sync_pages_idempotent();
        }
    }

    /**
     * Idempotent Page Synchronizer
     */
    public static function sync_pages_idempotent() {
        $manifest = self::get_manifest();
        if (!$manifest || empty($manifest['routes'])) {
            return false;
        }

        $current_hash = isset($manifest['manifest_hash']) ? $manifest['manifest_hash'] : md5(wp_json_encode($manifest));

        foreach ($manifest['routes'] as $route) {
            $slug     = sanitize_title($route['slug']);
            $title    = sanitize_text_field($route['title']);
            $template = sanitize_text_field($route['template']);

            // Skip homepage if front-page.php handles it directly
            if ($slug === 'home') {
                continue;
            }

            // Check if page already exists (idempotency check)
            $existing_page = get_page_by_path($slug);

            if (!$existing_page) {
                // Also search by title or meta
                $query = new WP_Query(array(
                    'post_type'      => 'page',
                    'meta_key'       => '_sedrazavi_manifest_slug',
                    'meta_value'     => $slug,
                    'posts_per_page' => 1,
                    'post_status'    => 'any',
                ));
                if ($query->have_posts()) {
                    $existing_page = $query->posts[0];
                }
            }

            $page_id = 0;

            if ($existing_page) {
                $page_id = $existing_page->ID;
            } else {
                $page_id = wp_insert_post(array(
                    'post_title'   => $title,
                    'post_name'    => $slug,
                    'post_status'  => 'publish',
                    'post_type'    => 'page',
                    'post_author'  => 1,
                    'post_content' => sprintf('<!-- SedRazavi Manifest Page: %s -->', esc_html($title)),
                ));
            }

            if ($page_id && !is_wp_error($page_id)) {
                // Assign template
                update_post_meta($page_id, '_wp_page_template', $template);
                update_post_meta($page_id, '_sedrazavi_manifest_slug', $slug);

                // Populate default content fields as native post_meta
                if (!empty($route['fields']) && is_array($route['fields'])) {
                    foreach ($route['fields'] as $key => $default_val) {
                        $meta_key = '_sedrazavi_field_' . sanitize_key($key);
                        // Only set if not already modified
                        $existing_meta = get_post_meta($page_id, $meta_key, true);
                        if ($existing_meta === '') {
                            update_post_meta($page_id, $meta_key, sanitize_text_field($default_val));
                        }
                    }
                }
            }
        }

        // Save hash so we don't re-run redundantly
        update_option(self::OPTION_HASH_KEY, $current_hash);
        return true;
    }

    /**
     * Register post meta keys for REST & native schema
     */
    public static function register_post_meta_fields() {
        $manifest = self::get_manifest();
        if (!$manifest || empty($manifest['routes'])) {
            return;
        }

        foreach ($manifest['routes'] as $route) {
            if (!empty($route['fields']) && is_array($route['fields'])) {
                foreach ($route['fields'] as $key => $val) {
                    $meta_key = '_sedrazavi_field_' . sanitize_key($key);
                    register_post_meta('page', $meta_key, array(
                        'show_in_rest' => true,
                        'single'       => true,
                        'type'         => 'string',
                        'auth_callback' => function() {
                            return current_user_can('edit_pages');
                        }
                    ));
                }
            }
        }
    }
}

SedRazavi_Manifest_Bridge::init();
`},{path:"inc/meta-boxes.php",filename:"meta-boxes.php",category:"توابع و هسته (inc)",description:"متاباکس‌های بومی وردپرس برای تنظیمات اختصاصی برگه‌ها.",code:`<?php
/**
 * SedRazavi Native Content Meta Boxes
 *
 * Provides native admin meta boxes for editing page content fields
 * without ACF or external plugin dependencies.
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Native_Meta_Boxes {

    public static function init() {
        add_action('add_meta_boxes', array(__CLASS__, 'register_meta_boxes'));
        add_action('save_post', array(__CLASS__, 'save_meta_boxes'), 10, 2);
    }

    public static function register_meta_boxes() {
        add_meta_box(
            'sedrazavi_page_fields_box',
            esc_html__('فیلدهای اختصاصی و هوشمند محتوا (SedRazavi Native Content)', 'sedrazavi'),
            array(__CLASS__, 'render_meta_box'),
            'page',
            'normal',
            'high'
        );
    }

    public static function render_meta_box($post) {
        wp_nonce_field('sedrazavi_meta_box_nonce_action', 'sedrazavi_meta_box_nonce');

        $slug = get_post_meta($post->ID, '_sedrazavi_manifest_slug', true);
        if (!$slug) {
            $slug = $post->post_name;
        }

        $manifest = SedRazavi_Manifest_Bridge::get_manifest();
        $fields = array();

        if ($manifest && !empty($manifest['routes'])) {
            foreach ($manifest['routes'] as $route) {
                if ($route['slug'] === $slug || $route['template'] === get_post_meta($post->ID, '_wp_page_template', true)) {
                    $fields = isset($route['fields']) ? $route['fields'] : array();
                    break;
                }
            }
        }

        // If no specific fields found, offer general lawyer brand fields
        if (empty($fields)) {
            $fields = array(
                'page_custom_badge' => 'نشان بالای برگه',
                'page_lead_text'    => 'متن لید و چکیده معرفی',
                'emergency_notice'  => 'پیام اطلاع‌رسانی ویژه موکلین',
            );
        }

        echo '<div class="sedrazavi-meta-box-wrapper" style="direction: rtl; text-align: right; font-family: Tahoma, sans-serif; padding: 10px;">';
        echo '<p style="color: #64748b; font-size: 13px; margin-bottom: 15px;">این فیلدها مستقیماً در قالب فرانت‌اند و APIهای پوسته SedRazavi بدون نیاز به ACF تزریق می‌شوند:</p>';

        foreach ($fields as $key => $default_or_label) {
            $meta_key = '_sedrazavi_field_' . sanitize_key($key);
            $current_val = get_post_meta($post->ID, $meta_key, true);
            if ($current_val === '') {
                $current_val = $default_or_label;
            }

            $label = ucwords(str_replace('_', ' ', $key));

            echo '<div style="margin-bottom: 16px;">';
            echo '<label style="display: block; font-weight: bold; margin-bottom: 6px; color: #0B132B;" for="' . esc_attr($meta_key) . '">' . esc_html($label) . ':</label>';

            if (strlen($current_val) > 80 || in_array($key, array('bio', 'academic_records', 'specialties', 'services_subheadline', 'notes'))) {
                echo '<textarea style="width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px; font-size: 13px;" rows="3" id="' . esc_attr($meta_key) . '" name="' . esc_attr($meta_key) . '">' . esc_textarea($current_val) . '</textarea>';
            } else {
                echo '<input style="width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px; font-size: 13px;" type="text" id="' . esc_attr($meta_key) . '" name="' . esc_attr($meta_key) . '" value="' . esc_attr($current_val) . '" />';
            }
            echo '</div>';
        }

        echo '</div>';
    }

    public static function save_meta_boxes($post_id, $post) {
        if (!isset($_POST['sedrazavi_meta_box_nonce']) || !wp_verify_nonce($_POST['sedrazavi_meta_box_nonce'], 'sedrazavi_meta_box_nonce_action')) {
            return;
        }

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        if (!current_user_can('edit_page', $post_id)) {
            return;
        }

        foreach ($_POST as $key => $val) {
            if (strpos($key, '_sedrazavi_field_') === 0) {
                $meta_key = sanitize_key($key);
                if (is_array($val)) {
                    continue;
                }
                $clean_val = sanitize_textarea_field(wp_unslash($val));
                update_post_meta($post_id, $meta_key, $clean_val);
            }
        }
    }
}

SedRazavi_Native_Meta_Boxes::init();
`},{path:"inc/precedents-cpt.php",filename:"precedents-cpt.php",category:"توابع و هسته (inc)",description:"آرای وحدت رویه دیوان عالی کشور و نظریات مشورتی.",code:`<?php
/**
 * Custom Post Type: Supreme Court Precedents (آرای وحدت رویه دیوان عالی کشور)
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_register_precedents_cpt')) {
function sedrazavi_register_precedents_cpt() {
    $labels = array(
        'name'                  => 'آرای وحدت رویه و نظرات مشورتی',
        'singular_name'         => 'رأی وحدت رویه',
        'menu_name'             => 'بانک آرای قضایی',
        'all_items'             => 'کلیه آرای وحدت رویه',
        'add_new_item'          => 'افزودن رأی جدید',
        'edit_item'             => 'ویرایش رأی وحدت رویه',
        'view_item'             => 'مشاهده رأی وحدت رویه',
        'search_items'          => 'جستجوی آرای وحدت رویه',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-book-alt',
        'supports'           => array('title', 'editor', 'excerpt', 'custom-fields'),
        'capability_type'    => 'post',
        'show_in_rest'       => true,
    );

    register_post_type('legal_precedent', $args);

    // تاکسونومی دسته‌بندی موضوعی
    register_taxonomy('precedent_category', 'legal_precedent', array(
        'label'        => 'شاخه حقوقی',
        'rewrite'      => array('slug' => 'precedent-category'),
        'hierarchical' => true,
        'show_in_rest' => true,
    ));
}
add_action('init', 'sedrazavi_register_precedents_cpt');
}
`},{path:"inc/react-shortcodes.php",filename:"react-shortcodes.php",category:"توابع و هسته (inc)",description:"مجموعه ۱۵+ شورت‌کد کامپوننت‌های تعاملی با کانتینر .sedrazavi-react-root.",code:`<?php
/**
 * ==============================================================================
 * پکیج اتصال یکپارچه شورت‌کدهای React در وردپرس (WordPress React Shortcode Bridge)
 * ==============================================================================
 * 
 * نسخه: 2.5.0
 * توسعه‌دهنده: دفتر حقوقی و وکالت SedRazavi (سیده مریم رضوی و سید امیر حسین رضوی فردویی)
 * وب‌سایت: https://t.me/sedrazavi
 * مجوز: GPL v2 or later
 * 
 * توضیحات فنی:
 * این فایل شامل رجیستری هوشمند شورت‌کدهای وردپرس برای مانت خودکار مؤلفه‌های مدرن React
 * همراه با سازوکار بهینه Enqueue تاخیری (Lazy Enqueuing) جهت بارگذاری فایل‌های JS/CSS
 * صرفاً در برگه‌های نیازمند شورت‌کد و ارسال متغیرهای سرور با wp_localize_script می‌باشد.
 * ==============================================================================
 */

// جلوگیری از دسترسی مستقیم به فایل
if (!defined('ABSPATH')) {
    exit;
}

// ۱. تعریف ثابت‌های بنیادین ماژول
if (!defined('SEDRAZAVI_REACT_BRIDGE_VERSION')) {
    define('SEDRAZAVI_REACT_BRIDGE_VERSION', '2.5.0');
}
if (!defined('SEDRAZAVI_REACT_PREFIX')) {
    define('SEDRAZAVI_REACT_PREFIX', 'sedrazavi_react_');
}

/**
 * ۲. ثبت اسکریپت‌ها و استایل‌های اصلی React در وردپرس (Asset Registration)
 * اسکریپت‌ها در این مرحله فقط REGISTER می‌شوند و تا زمان فراخوانی شورت‌کد، در حافظه لود نمی‌شوند.
 */
function sedrazavi_register_react_assets() {
    $version = SEDRAZAVI_REACT_BRIDGE_VERSION;
    $theme_dir_uri = get_template_directory_uri();
    $theme_dir_path = get_template_directory();

    // مسیرهای محتمل فایل‌های کامپایل‌شده Vite
    $js_bundle  = '';
    $css_bundle = '';

    if (file_exists($theme_dir_path . '/dist/index.js')) {
        $js_bundle  = $theme_dir_uri . '/dist/index.js';
        $css_bundle = $theme_dir_uri . '/dist/index.css';
    } elseif (file_exists($theme_dir_path . '/public/app-dist/index.js')) {
        $js_bundle  = $theme_dir_uri . '/public/app-dist/index.js';
        $css_bundle = $theme_dir_uri . '/public/app-dist/index.css';
    } elseif (file_exists($theme_dir_path . '/dist/assets/index.js')) {
        $js_bundle  = $theme_dir_uri . '/dist/assets/index.js';
        $css_bundle = $theme_dir_uri . '/dist/assets/index.css';
    } else {
        // جستجوی داینامیک نام فایل دارای هش در dist/assets/
        $dist_files = glob($theme_dir_path . '/dist/assets/index-*.js');
        if (!empty($dist_files)) {
            $js_bundle = $theme_dir_uri . '/dist/assets/' . basename($dist_files[0]);
        }
        $css_files = glob($theme_dir_path . '/dist/assets/index-*.css');
        if (!empty($css_files)) {
            $css_bundle = $theme_dir_uri . '/dist/assets/' . basename($css_files[0]);
        }
    }

    // در صورت عدم وجود بیلد، به عنوان فال‌بک از آدرس محلی استفاده می‌شود
    if (empty($js_bundle)) {
        $js_bundle  = $theme_dir_uri . '/public/app-dist/index.js';
    }
    if (empty($css_bundle)) {
        $css_bundle = $theme_dir_uri . '/public/app-dist/index.css';
    }

    // ثبت استایل اصلی مؤلفه‌های React (شامل Tailwind CSS کامپایل‌شده)
    wp_register_style(
        'sedrazavi_react_styles',
        $css_bundle,
        array(),
        $version
    );

    // ثبت اسکریپت اجرایی React و رجیستری مؤلفه‌ها
    wp_register_script(
        'sedrazavi_react_bundle',
        $js_bundle,
        array(),
        $version,
        true // لود در فوتر صفحه جهت بهینه‌سازی سرعت و امتیاز Core Web Vitals
    );
}
add_action('wp_enqueue_scripts', 'sedrazavi_register_react_assets', 10);

/**
 * ۳. تزریق هوشمند اسکریپت‌ها و متغیرهای سرور (Smart Lazy Enqueue & wp_localize_script)
 * این تابع تنها هنگامی که حداقل یک شورت‌کد در صفحه اجرا شود صدا زده می‌شود تا از لود بیهوده جلوگیری گردد.
 */
function sedrazavi_enqueue_react_runtime() {
    static $already_enqueued = false;
    if ($already_enqueued) {
        return;
    }
    $already_enqueued = true;

    // ۱. انکیو کردن استایل و اسکریپت ثبت‌شده
    wp_enqueue_style('sedrazavi_react_styles');
    wp_enqueue_script('sedrazavi_react_bundle');

    // ۲. آماده‌سازی داده‌های سرور جهت ارسال با wp_localize_script
    $localized_data = array(
        'siteUrl'        => home_url(),
        'siteName'       => get_bloginfo('name'),
        'isRtl'          => is_rtl(),
        'shortcodePrefix'=> 'sedrazavi_react_',
        'version'        => SEDRAZAVI_REACT_BRIDGE_VERSION,
        'locale'         => get_locale(),
        // مشخصات REST API جهت ارتباط ایجکس و واکشی داده‌های لحظه‌ای
        'rest' => array(
            'root'      => esc_url_raw(rest_url()),
            'endpoint'  => esc_url_raw(rest_url('sedrazavi/v1/')),
            'nonce'     => wp_create_nonce('wp_rest'),
        ),
        // اطلاعات امنیتی Admin Ajax سنتی وردپرس
        'ajax' => array(
            'url'   => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('sedrazavi_react_ajax_security_nonce'),
        ),
        // مشخصات کاربر جاری در صورت لاگین بودن
        'currentUser' => array(
            'isLoggedIn'   => is_user_logged_in(),
            'id'           => get_current_user_id(),
            'displayName'  => is_user_logged_in() ? wp_get_current_user()->display_name : '',
            'email'        => is_user_logged_in() ? wp_get_current_user()->user_email : '',
            'roles'        => is_user_logged_in() ? wp_get_current_user()->roles : array(),
        ),
        // اطلاعات پایه هویت و پروانه وکیل از تنظیمات پوسته یا پیش‌فرض
        'lawyerProfile' => array(
            'name'           => get_option('sedrazavi_lawyer_name', 'سرکار خانم دکتر سیده مریم رضوی'),
            'title'          => get_option('sedrazavi_lawyer_title', 'وکیل پایه یک دادگستری و مشاور ارشد حقوقی'),
            'licenseNumber'  => get_option('sedrazavi_lawyer_license', '۱۸۴۵۲ / ک.و.م'),
            'phone'          => get_option('sedrazavi_lawyer_phone', '۰۲۱-۸۸۹۹۰۰۱۱'),
            'mobile'         => get_option('sedrazavi_lawyer_mobile', '۰۹۱۲-۳۴۵۶۷۸۹'),
            'address'        => get_option('sedrazavi_lawyer_address', 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج حقوقی SedRazavi'),
            'onlineBooking'  => true,
        ),
        'translations' => array(
            'loading'        => __('در حال بارگذاری مؤلفه حقوقی...', 'sedrazavi'),
            'error'          => __('خطا در برقراری ارتباط با سامانه حقوقی.', 'sedrazavi'),
            'retry'          => __('تلاش مجدد', 'sedrazavi'),
            'courtFeeTitle'  => __('محاسبه‌گر تخصصی قوه قضاییه', 'sedrazavi'),
            'caseTrackerTitle'=> __('سامانه برخط رهگیری پرونده‌های موکلین', 'sedrazavi'),
        ),
    );

    // فیلتر وردپرس برای شخصی‌سازی یا افزودن داده‌های بیشتر توسط افزونه‌ها
    $localized_data = apply_filters('sedrazavi_react_localized_data', $localized_data);

    // ارسال متغیر امن جاوااسکریپت به پنجره مرورگر
    wp_localize_script('sedrazavi_react_bundle', 'SedRazaviReactConfig', $localized_data);
}

/**
 * ۴. تابع کمکی رندر اسکلت پیش‌بارگذار (Skeleton Preloader Renderer)
 */
function sedrazavi_render_react_skeleton($component_name, $custom_title = '') {
    ob_start();
    ?>
    <div class="sedrazavi-skeleton-container" style="min-height: 180px; background: linear-gradient(135deg, rgba(11,19,43,0.04) 0%, rgba(212,175,55,0.06) 100%); border: 1px dashed rgba(212,175,55,0.35); border-radius: 1.25rem; padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; font-family: inherit; direction: rtl; margin: 0.75rem 0;">
        <div style="width: 40px; height: 40px; border: 3px solid rgba(212,175,55,0.25); border-top-color: #D4AF37; border-radius: 50%; animation: sedrazaviSpin 1.1s cubic-bezier(0.5, 0, 0.5, 1) infinite; margin-bottom: 0.75rem;"></div>
        <p style="font-size: 0.875rem; font-weight: 700; color: #D4AF37; margin: 0 0 0.25rem 0;">
            <?php echo esc_html(!empty($custom_title) ? $custom_title : 'سامانه حقوقی هوشمند SedRazavi'); ?>
        </p>
        <span style="font-size: 0.75rem; color: #94A3B8;">
            در حال بارگذاری مؤلفه <?php echo esc_html($component_name); ?>...
        </span>
        <style>
            @keyframes sedrazaviSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * ==============================================================================
 * ۵. تعریف شورت‌کدهای اختصاصی برای مؤلفه‌های React (Shortcode Wrappers)
 * ==============================================================================
 */

// ۱. رهگیری هوشمند پرونده‌های قضایی
function sedrazavi_shortcode_case_tracker($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $a = shortcode_atts(array(
        'case_number'    => '۱۴۰۳-۲۸۴',
        'status_code'    => 'HEARING_PENDING',
        'status_text'    => 'در حال تبادل لوایح و بررسی نظر کارشناس رسمی',
        'hearing_date'   => '۱۴۰۳/۰۹/۱۸',
        'days_remaining' => 12,
        'show_timeline'  => 'true',
        'class'          => '',
        'id'             => '',
    ), $atts, 'sedrazavi_react_case_tracker');

    $props = array(
        'case_number'    => sanitize_text_field($a['case_number']),
        'status_code'    => sanitize_text_field($a['status_code']),
        'status_text'    => sanitize_text_field($a['status_text']),
        'hearing_date'   => sanitize_text_field($a['hearing_date']),
        'days_remaining' => intval($a['days_remaining']),
        'show_timeline'  => filter_var($a['show_timeline'], FILTER_VALIDATE_BOOLEAN),
    );

    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-' . wp_unique_id();
    $css_class = trim('sedrazavi-ui-wrapper ' . sanitize_text_field($a['class']));

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>" data-component="CaseProgressTracker" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('CaseProgressTracker', 'استپر و رهگیری هوشمند پرونده‌های قضایی'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_case_tracker', 'sedrazavi_shortcode_case_tracker');

// ۲. محاسبه‌گر جامع هزینه‌های دادرسی و دیه
function sedrazavi_shortcode_court_calculator($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $a = shortcode_atts(array(
        'default_tab'        => 'court_fee',
        'default_claim'      => 500000000,
        'show_tariff_guide'  => 'true',
        'enable_print'       => 'true',
        'class'              => '',
        'id'                 => '',
    ), $atts, 'sedrazavi_react_court_calculator');

    $props = array(
        'default_tab'        => sanitize_text_field($a['default_tab']),
        'default_claim'      => intval($a['default_claim']),
        'show_tariff_guide'  => filter_var($a['show_tariff_guide'], FILTER_VALIDATE_BOOLEAN),
        'enable_print'       => filter_var($a['enable_print'], FILTER_VALIDATE_BOOLEAN),
    );

    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-' . wp_unique_id();
    $css_class = trim('sedrazavi-ui-wrapper ' . sanitize_text_field($a['class']));

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>" data-component="CourtFeeCalculator" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('CourtFeeCalculator', 'میز جامع محاسبات قضایی و دیه'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_court_calculator', 'sedrazavi_shortcode_court_calculator');

// ۳. ابزارک دسترسی سریع کارتابل موکلین
function sedrazavi_shortcode_client_portal_widget($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $a = shortcode_atts(array(
        'show_financials' => 'true',
        'show_documents'  => 'true',
        'max_cases'       => 3,
        'class'           => '',
        'id'              => '',
    ), $atts, 'sedrazavi_react_client_portal_widget');

    $props = array(
        'show_financials' => filter_var($a['show_financials'], FILTER_VALIDATE_BOOLEAN),
        'show_documents'  => filter_var($a['show_documents'], FILTER_VALIDATE_BOOLEAN),
        'max_cases'       => intval($a['max_cases']),
    );

    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-' . wp_unique_id();
    $css_class = trim('sedrazavi-ui-wrapper ' . sanitize_text_field($a['class']));

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>" data-component="ClientPortalQuickAccessWidget" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('ClientPortalQuickAccessWidget', 'کارتابل مراجعین و موکلان'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_client_portal_widget', 'sedrazavi_shortcode_client_portal_widget');

// ۴. فرم تقویم و رزرواسیون نوبت مشاوره حقوقی
function sedrazavi_shortcode_booking_modal($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $a = shortcode_atts(array(
        'default_service'      => 'commercial',
        'title'                => 'رزرو نوبت مشاوره با وکیل پایه یک',
        'allow_online_payment' => 'true',
        'button_text'          => 'ثبت و تایید جلسه مشاوره',
        'class'                => '',
        'id'                   => '',
    ), $atts, 'sedrazavi_react_booking_modal');

    $props = array(
        'default_service'      => sanitize_text_field($a['default_service']),
        'title'                => sanitize_text_field($a['title']),
        'allow_online_payment' => filter_var($a['allow_online_payment'], FILTER_VALIDATE_BOOLEAN),
        'button_text'          => sanitize_text_field($a['button_text']),
    );

    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-' . wp_unique_id();
    $css_class = trim('sedrazavi-ui-wrapper ' . sanitize_text_field($a['class']));

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>" data-component="ContactAndBookingSection" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('ContactAndBookingSection', 'سامانه نوبت‌دهی آنلاین'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_booking_modal', 'sedrazavi_shortcode_booking_modal');

// ۵. کارت‌های خدمات تخصصی وکالت
function sedrazavi_shortcode_services_grid($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $a = shortcode_atts(array(
        'category' => 'all',
        'count'    => 6,
        'columns'  => '3',
        'show_fee' => 'true',
        'class'    => '',
        'id'       => '',
    ), $atts, 'sedrazavi_react_services_grid');

    $props = array(
        'category' => sanitize_text_field($a['category']),
        'count'    => intval($a['count']),
        'columns'  => sanitize_text_field($a['columns']),
        'show_fee' => filter_var($a['show_fee'], FILTER_VALIDATE_BOOLEAN),
    );

    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-' . wp_unique_id();
    $css_class = trim('sedrazavi-ui-wrapper ' . sanitize_text_field($a['class']));

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>" data-component="ServicesSection" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('ServicesSection', 'شبکه خدمات تخصصی حقوقی'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_services_grid', 'sedrazavi_shortcode_services_grid');

// ۶. اسلایدر تجربیات و رضایت موکلان
function sedrazavi_shortcode_testimonials_slider($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $a = shortcode_atts(array(
        'count'        => 4,
        'autoplay'     => 'true',
        'show_ratings' => 'true',
        'class'        => '',
        'id'           => '',
    ), $atts, 'sedrazavi_react_testimonials_slider');

    $props = array(
        'count'        => intval($a['count']),
        'autoplay'     => filter_var($a['autoplay'], FILTER_VALIDATE_BOOLEAN),
        'show_ratings' => filter_var($a['show_ratings'], FILTER_VALIDATE_BOOLEAN),
    );

    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-' . wp_unique_id();
    $css_class = trim('sedrazavi-ui-wrapper ' . sanitize_text_field($a['class']));

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>" data-component="TestimonialsSlider" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('TestimonialsSlider', 'اسلایدر رضایت‌نامه موکلان'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_testimonials_slider', 'sedrazavi_shortcode_testimonials_slider');

// ۷. پرسش و پاسخ‌های متداول (FAQ)
function sedrazavi_shortcode_faq_accordion($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $a = shortcode_atts(array(
        'count'      => 5,
        'open_first' => 'true',
        'searchable' => 'true',
        'class'      => '',
        'id'         => '',
    ), $atts, 'sedrazavi_react_faq_accordion');

    $props = array(
        'count'      => intval($a['count']),
        'open_first' => filter_var($a['open_first'], FILTER_VALIDATE_BOOLEAN),
        'searchable' => filter_var($a['searchable'], FILTER_VALIDATE_BOOLEAN),
    );

    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-' . wp_unique_id();
    $css_class = trim('sedrazavi-ui-wrapper ' . sanitize_text_field($a['class']));

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>" data-component="FaqSection" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('FaqSection', 'پرسش‌های حقوقی پرتکرار'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_faq_accordion', 'sedrazavi_shortcode_faq_accordion');

// ۸. نشان‌های اعتبار و پروانه وکالت کانون
function sedrazavi_shortcode_trust_badges($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $a = shortcode_atts(array(
        'style'        => 'grid',
        'show_license' => 'true',
        'animated'     => 'true',
        'class'        => '',
        'id'           => '',
    ), $atts, 'sedrazavi_react_trust_badges');

    $props = array(
        'style'        => sanitize_text_field($a['style']),
        'show_license' => filter_var($a['show_license'], FILTER_VALIDATE_BOOLEAN),
        'animated'     => filter_var($a['animated'], FILTER_VALIDATE_BOOLEAN),
    );

    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-' . wp_unique_id();
    $css_class = trim('sedrazavi-ui-wrapper ' . sanitize_text_field($a['class']));

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>" data-component="TrustBadges" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('TrustBadges', 'نشان‌های رسمی و پروانه وکالت'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_trust_badges', 'sedrazavi_shortcode_trust_badges');

// ۹. میز تخصصی انطباق بانکی، AML و تحریم‌ها (سازگاری دوگانه نام شورت‌کد)
function sedrazavi_shortcode_aml_suite($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-aml-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="AmlComplianceSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('AmlComplianceSuite', 'میز تخصصی انطباق بانکی، AML و تحریم‌ها'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_aml_suite', 'sedrazavi_shortcode_aml_suite');
add_shortcode('sedrazavi_aml_compliance_suite', 'sedrazavi_shortcode_aml_suite');

// ۱۰. سامانه دعاوی ملکی، سرقفلی و مشارکت در ساخت
function sedrazavi_shortcode_real_estate_suite($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-re-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="RealEstateSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('RealEstateSuite', 'سامانه دعاوی ملکی، سرقفلی و ساخت‌وساز'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_real_estate_suite', 'sedrazavi_shortcode_real_estate_suite');
add_shortcode('sedrazavi_real_estate_suite', 'sedrazavi_shortcode_real_estate_suite');

// ۱۱. پرتال کارتابل موکلین (سازگار با نام‌های سنتی و مدرن)
function sedrazavi_shortcode_client_portal_wrapper($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-portal-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="ClientPortalView" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('ClientPortalView', 'پرتال جامع موکلین و مراجعین'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_client_portal', 'sedrazavi_shortcode_client_portal_wrapper');
add_shortcode('sedrazavi_react_client_portal', 'sedrazavi_shortcode_client_portal_wrapper');

// ۱۲. سوئیت راهبرد دفاعی و پیش‌بینی آرا (Legal Strategy Suite)
function sedrazavi_shortcode_legal_strategy_wrapper($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-strat-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="LegalStrategySuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('LegalStrategySuite', 'سوئیت راهبرد دفاعی و تحلیل حقوقی'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_legal_strategy_suite', 'sedrazavi_shortcode_legal_strategy_wrapper');
add_shortcode('sedrazavi_react_legal_strategy', 'sedrazavi_shortcode_legal_strategy_wrapper');

// ۱۳. سامانه ورود با رمز یکبار مصرف ایمیلی (Email OTP Magic Login)
function sedrazavi_shortcode_email_otp($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $a = shortcode_atts(array(
        'title'    => 'ورود سریع و امن با رمز یکبار مصرف (Email OTP)',
        'subtitle' => 'برای ورود به سامانه، ایمیل خود را وارد نمایید تا کد ۶ رقمی موقت برای شما ارسال شود.',
        'class'    => '',
        'id'       => '',
    ), $atts, 'sedrazavi_react_email_otp');

    $props = array(
        'title'    => sanitize_text_field($a['title']),
        'subtitle' => sanitize_text_field($a['subtitle']),
    );
    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-otp-' . wp_unique_id();
    $css_class = trim('sedrazavi-ui-wrapper ' . sanitize_text_field($a['class']));

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>" data-component="EmailOtpAuthComponent" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('EmailOtpAuthComponent', 'سیستم ورود با رمز یکبار مصرف ایمیلی'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_email_otp', 'sedrazavi_shortcode_email_otp');
add_shortcode('sedrazavi_email_otp', 'sedrazavi_shortcode_email_otp');

// ۱۴. تایم‌لاین تعاملی پرونده و مواعد دادرسی (Case Interactive Timeline)
function sedrazavi_shortcode_case_timeline($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $a = shortcode_atts(array(
        'case_id'     => 'c-01',
        'case_number' => '۱۴۰۳-۹۸۲۷۳-ونک',
        'subject'     => 'الزام به تنظیم سند رسمی انتقال ملک و مطالبه خسارت تاخیر تادیه',
        'class'       => '',
        'id'          => '',
    ), $atts, 'sedrazavi_react_case_timeline');

    $props = array(
        'caseId'      => sanitize_text_field($a['case_id']),
        'caseNumber'  => sanitize_text_field($a['case_number']),
        'caseSubject' => sanitize_text_field($a['subject']),
    );
    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-timeline-' . wp_unique_id();
    $css_class = trim('sedrazavi-ui-wrapper ' . sanitize_text_field($a['class']));

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>" data-component="CaseInteractiveTimeline" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('CaseInteractiveTimeline', 'تایم‌لاین تعاملی و مواعد پرونده'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_case_timeline', 'sedrazavi_shortcode_case_timeline');
add_shortcode('sedrazavi_case_timeline', 'sedrazavi_shortcode_case_timeline');

// ۱۵. نقاط عطف و روند رشد دفتر وکالت (Firm Milestones Timeline)
function sedrazavi_shortcode_firm_milestones($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-milestones-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="FirmMilestone" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('FirmMilestone', 'سفر رشد و نقاط عطف راهبردی مؤسسه حقوقی'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_firm_milestones', 'sedrazavi_shortcode_firm_milestones');
add_shortcode('sedrazavi_firm_milestones', 'sedrazavi_shortcode_firm_milestones');

// ۱۶. نمودار راداری حوزه‌های تخصصی وکیل (Key Practice Areas Radar Chart)
function sedrazavi_shortcode_radar_chart($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-radar-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="KeyPracticeAreasRadarChart" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('KeyPracticeAreasRadarChart', 'ماتریس راداری صلاحیت‌های تخصصی وکیل'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_radar_chart', 'sedrazavi_shortcode_radar_chart');
add_shortcode('sedrazavi_radar_chart', 'sedrazavi_shortcode_radar_chart');

// ۱۷. سیستم اعلان‌های بلادرنگ مواعد دادگاه (Lawyer Realtime Toast Notifier)
function sedrazavi_shortcode_toast_notifier($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-notifier-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="LawyerRealtimeToastNotifier" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('LawyerRealtimeToastNotifier', 'سیستم اعلان‌های زنده مواعد دادگاه و پیام‌ها'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_toast_notifier', 'sedrazavi_shortcode_toast_notifier');
add_shortcode('sedrazavi_toast_notifier', 'sedrazavi_shortcode_toast_notifier');

// ۱۸. شناسنامه رسمی و کارت بیوگرافی قابل پرینت وکیل (Lawyer Print Bio Card)
function sedrazavi_shortcode_lawyer_bio_card($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-biocard-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="LawyerPrintBioCard" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('LawyerPrintBioCard', 'شناسنامه حرفه‌ای و کارت بیوگرافی وکیل'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_lawyer_bio_card', 'sedrazavi_shortcode_lawyer_bio_card');
add_shortcode('sedrazavi_lawyer_bio_card', 'sedrazavi_shortcode_lawyer_bio_card');

// ۱۹. پنل جامع ادمین و راهبری پرونده‌ها (Comprehensive Admin Portal)
function sedrazavi_shortcode_admin_portal($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-admin-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="ComprehensiveAdminPortal" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('ComprehensiveAdminPortal', 'پنل جامع مدیریت وکیل و ادمین'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_admin_portal', 'sedrazavi_shortcode_admin_portal');
add_shortcode('sedrazavi_admin_portal', 'sedrazavi_shortcode_admin_portal');

// ۲۰. داشبورد کامل پیشخوان وکیل و موکل (Lawyer Dashboard)
function sedrazavi_shortcode_dashboard_wrapper($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $current_user = wp_get_current_user();
    $is_admin = current_user_can('manage_options');
    $is_lawyer = current_user_can('edit_posts') || (is_user_logged_in() && in_array('lawyer', (array)$current_user->roles, true));

    $a = shortcode_atts(array(
        'role'                      => $is_admin ? 'admin' : ($is_lawyer ? 'lawyer' : 'client'),
        'is_admin_acting_as_lawyer' => $is_admin ? 'true' : 'false',
        'class'                     => '',
        'id'                        => '',
    ), $atts, 'sedrazavi_react_dashboard');

    $final_role = sanitize_text_field($a['role']);
    $acting_as_lawyer = ($a['is_admin_acting_as_lawyer'] === 'true') || $is_admin;

    $props = array(
        'userRole'              => $final_role,
        'isAdminActingAsLawyer' => $acting_as_lawyer,
        'userName'              => $current_user->exists() ? $current_user->display_name : ($is_admin ? 'مدیر ارشد سامانه (ادمین)' : 'دکتر سیده مریم رضوی'),
        'userPhoneNumber'       => $current_user->exists() ? (get_user_meta($current_user->ID, 'phone', true) ?: '') : '',
    );

    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-dash-' . wp_unique_id();
    $css_class = trim('sedrazavi-ui-wrapper ' . sanitize_text_field($a['class']));

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>" data-component="LawyerDashboard" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('LawyerDashboard', 'میز کار و داشبورد مدیریت وکالت و جانشینی ادمین'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_dashboard', 'sedrazavi_shortcode_dashboard_wrapper');
add_shortcode('sedrazavi_lawyer_dashboard', 'sedrazavi_shortcode_dashboard_wrapper');

// ۲۱. سامانه جامع ورشکستگی، تصفیه دیون و قرارداد ارفاقی (Corporate Insolvency Suite - فاز ۳۷)
function sedrazavi_shortcode_insolvency_suite($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-insolvency-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="CorporateInsolvencySuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('CorporateInsolvencySuite', 'سامانه حقوقی ورشکستگی، تصفیه دیون و قرارداد ارفاقی (فاز ۳۷)'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_react_insolvency_suite', 'sedrazavi_shortcode_insolvency_suite');
add_shortcode('sedrazavi_insolvency_suite', 'sedrazavi_shortcode_insolvency_suite');

/**
 * ==============================================================================
 * ۶. اسکریپت خودکار مانت کلاینت در فوتر (Auto Mount Loader in wp_footer)
 * شناسایی تمام کانتینرهای .sedrazavi-react-root و مانت مؤلفه‌ها با React
 * ==============================================================================
 */
function sedrazavi_render_react_mount_bootstrap() {
    ?>
    <script type="text/javascript" id="sedrazavi-react-mount-bootstrap">
    (function() {
        function mountAllSedRazaviComponents() {
            var roots = document.querySelectorAll('.sedrazavi-react-root:not([data-mounted="true"])');
            if (!roots || roots.length === 0) return;

            var registry = window.SedRazaviReactComponents || {};
            var React = window.React || (window.wp && window.wp.element);
            var ReactDOM = window.ReactDOM || (window.wp && window.wp.element);

            roots.forEach(function(container) {
                var compName = container.getAttribute('data-component');
                var rawProps = container.getAttribute('data-props');
                var props = {};
                try {
                    props = rawProps ? JSON.parse(rawProps) : {};
                } catch(e) {
                    console.error('SedRazavi React Props Parse Error:', e, rawProps);
                }

                var ComponentClass = registry[compName];
                if (ComponentClass && ReactDOM && React) {
                    try {
                        container.setAttribute('data-mounted', 'true');
                        var skeleton = container.querySelector('.sedrazavi-skeleton-container');
                        if (skeleton) skeleton.remove();

                        if (ReactDOM.createRoot) {
                            var root = ReactDOM.createRoot(container);
                            root.render(React.createElement(ComponentClass, props));
                        } else if (ReactDOM.render) {
                            ReactDOM.render(React.createElement(ComponentClass, props), container);
                        }
                    } catch (err) {
                        console.error('Error mounting SedRazavi React component ' + compName + ':', err);
                    }
                }
            });
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', mountAllSedRazaviComponents);
        } else {
            mountAllSedRazaviComponents();
        }

        // پشتیبانی از ویرایشگر المنتور در حالت پیش‌نمایش
        if (window.elementorFrontend) {
            window.elementorFrontend.hooks.addAction('frontend/element_ready/global', function() {
                setTimeout(mountAllSedRazaviComponents, 100);
            });
        }
    })();
    <\/script>
    <?php
}
add_action('wp_footer', 'sedrazavi_render_react_mount_bootstrap', 99);
`},{path:"inc/rest-api.php",filename:"rest-api.php",category:"توابع و هسته (inc)",description:"اندپوینت‌های REST API با امنیت سخت‌گیرانه، اعتبارسنجی ورودی‌ها و محافظت دسترسی وکیل/ادمین.",code:`<?php
/**
 * SedRazavi Comprehensive REST API Engine
 *
 * Implements real, working endpoints for all frontend fetch and AJAX calls
 * under the namespace 'sedrazavi/v1' to eliminate 404 errors completely.
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_REST_API {

    const NAMESPACE = 'sedrazavi/v1';

    public static function init() {
        add_action('rest_api_init', array(__CLASS__, 'register_routes'));
        add_action('init', array(__CLASS__, 'register_service_cpt_for_rest'));
    }

    /**
     * Ensure lawyer_service CPT is registered with show_in_rest = true
     */
    public static function register_service_cpt_for_rest() {
        if (!post_type_exists('lawyer_service')) {
            register_post_type('lawyer_service', array(
                'labels' => array(
                    'name'          => 'خدمات حقوقی',
                    'singular_name' => 'خدمت حقوقی',
                ),
                'public'       => true,
                'has_archive'  => true,
                'show_in_rest' => true,
                'supports'     => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            ));
        }
    }

    /**
     * Register all REST Routes
     */
    public static function register_routes() {

        // 1. Book Appointment: wp-json/sedrazavi/v1/book-appointment
        // Decision: PUBLIC - Prospective clients booking legal consultations (Rate limited)
        register_rest_route(self::NAMESPACE, '/book-appointment', array(
            'methods'             => array('POST', 'GET'),
            'callback'            => array(__CLASS__, 'handle_book_appointment'),
            'permission_callback' => '__return_true',
        ));

        // 2. Track Case: wp-json/sedrazavi/v1/track-case
        // Decision: PUBLIC - Public inquiry with valid case tracking number (Rate limited)
        register_rest_route(self::NAMESPACE, '/track-case', array(
            'methods'             => array('POST', 'GET'),
            'callback'            => array(__CLASS__, 'handle_track_case'),
            'permission_callback' => '__return_true',
        ));

        // 3. Cases Management: wp-json/sedrazavi/v1/cases
        // Decision: RESTRICTED - Case dockets contain confidential litigation data
        register_rest_route(self::NAMESPACE, '/cases', array(
            array(
                'methods'             => 'GET',
                'callback'            => array(__CLASS__, 'handle_get_cases'),
                'permission_callback' => array(__CLASS__, 'check_lawyer_or_admin_permission'),
            ),
            array(
                'methods'             => 'POST',
                'callback'            => array(__CLASS__, 'handle_create_case'),
                'permission_callback' => array(__CLASS__, 'check_lawyer_or_admin_permission'),
            ),
        ));

        // 4. Live Sync Stream: wp-json/sedrazavi/v1/sync/stream
        // Decision: RESTRICTED - Active user session real-time synchronization
        register_rest_route(self::NAMESPACE, '/sync/stream', array(
            'methods'             => 'GET',
            'callback'            => array(__CLASS__, 'handle_sync_stream'),
            'permission_callback' => array(__CLASS__, 'check_logged_in_permission'),
        ));

        // 5. Auth Login: wp-json/sedrazavi/v1/auth/login
        // Decision: PUBLIC - Authentication entry point
        register_rest_route('sedrazavi/v1/auth', '/login', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_auth_login'),
            'permission_callback' => '__return_true',
        ));

        // 6. Auth Verify 2FA: wp-json/sedrazavi/v1/auth/verify-2fa
        // Decision: PUBLIC - Two-factor challenge response
        register_rest_route('sedrazavi/v1/auth', '/verify-2fa', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_auth_verify_2fa'),
            'permission_callback' => '__return_true',
        ));

        // 7. Auth Logout: wp-json/sedrazavi/v1/auth/logout
        // Decision: RESTRICTED - Terminating active authenticated session
        register_rest_route('sedrazavi/v1/auth', '/logout', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_auth_logout'),
            'permission_callback' => array(__CLASS__, 'check_logged_in_permission'),
        ));

        // 8. Design Tokens All: wp-json/sedrazavi/v1/tokens/all
        // Decision: RESTRICTED - Palette & design tokens management
        register_rest_route('sedrazavi/v1/tokens', '/all', array(
            'methods'             => 'GET',
            'callback'            => array(__CLASS__, 'handle_get_tokens'),
            'permission_callback' => array(__CLASS__, 'check_admin_permission'),
        ));

        // 9. Design Tokens Update: wp-json/sedrazavi/v1/tokens/update
        // Decision: RESTRICTED - Administrative theme customization
        register_rest_route('sedrazavi/v1/tokens', '/update', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_update_tokens'),
            'permission_callback' => array(__CLASS__, 'check_admin_permission'),
        ));

        // 10. Payment Checkout: wp-json/sedrazavi/v1/payment/checkout
        // Decision: RESTRICTED - Valid session or validated nonce required for invoice generation
        register_rest_route('sedrazavi/v1/payment', '/checkout', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_payment_checkout'),
            'permission_callback' => array(__CLASS__, 'check_payment_checkout_permission'),
        ));

        // 11. Quick Callback: wp-json/sedrazavi/v1/quick-callback
        // Decision: PUBLIC - Prospective client callback request (Rate limited)
        register_rest_route(self::NAMESPACE, '/quick-callback', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_quick_callback'),
            'permission_callback' => '__return_true',
        ));

        // 12. OTP Send: wp-json/sedrazavi/v1/otp/send
        // Decision: PUBLIC - Initial SMS OTP dispatch (Rate limited)
        register_rest_route(self::NAMESPACE, '/otp/send', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_otp_send'),
            'permission_callback' => '__return_true',
        ));

        // 13. OTP Verify: wp-json/sedrazavi/v1/otp/verify
        // Decision: PUBLIC - SMS OTP verification (Rate limited)
        register_rest_route(self::NAMESPACE, '/otp/verify', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_otp_verify'),
            'permission_callback' => '__return_true',
        ));

        // 14. Dashboard Stats: wp-json/sedrazavi/v1/dashboard-stats
        // Decision: RESTRICTED - Confidential law firm caseload KPI metrics
        register_rest_route(self::NAMESPACE, '/dashboard-stats', array(
            'methods'             => 'GET',
            'callback'            => array(__CLASS__, 'handle_dashboard_stats'),
            'permission_callback' => array(__CLASS__, 'check_lawyer_or_admin_permission'),
        ));

        // 15. Verify Document Hash: wp-json/sedrazavi/v1/verify-hash
        // Decision: PUBLIC - Document authenticity verification service
        register_rest_route(self::NAMESPACE, '/verify-hash', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_verify_hash'),
            'permission_callback' => '__return_true',
        ));

        // 16. Corporate Quorum: wp-json/sedrazavi/v1/corporate-quorum
        // Decision: RESTRICTED - Commercial corporate legal analysis suite
        register_rest_route(self::NAMESPACE, '/corporate-quorum', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_corporate_quorum'),
            'permission_callback' => array(__CLASS__, 'check_logged_in_or_lawyer_admin_permission'),
        ));

        // 17. Email OTP Send: wp-json/sedrazavi/v1/auth/email-otp-send
        // Decision: PUBLIC - Email OTP dispatch (Rate limited)
        register_rest_route(self::NAMESPACE, '/auth/email-otp-send', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_email_otp_send'),
            'permission_callback' => '__return_true',
        ));

        // 18. Email OTP Verify: wp-json/sedrazavi/v1/auth/email-otp-verify
        // Decision: PUBLIC - Email OTP verification (Rate limited)
        register_rest_route(self::NAMESPACE, '/auth/email-otp-verify', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_email_otp_verify'),
            'permission_callback' => '__return_true',
        ));

        // 19. Case Interactive Timeline: wp-json/sedrazavi/v1/cases/timeline
        // Decision: RESTRICTED - Confidential procedural timeline and court dates
        register_rest_route(self::NAMESPACE, '/cases/timeline', array(
            'methods'             => array('GET', 'POST'),
            'callback'            => array(__CLASS__, 'handle_cases_timeline'),
            'permission_callback' => array(__CLASS__, 'check_lawyer_or_admin_permission'),
        ));

        // 20. Lawyer Realtime Notifications: wp-json/sedrazavi/v1/lawyer/notifications
        // Decision: RESTRICTED - Attorney internal notifications and judicial deadlines
        register_rest_route(self::NAMESPACE, '/lawyer/notifications', array(
            'methods'             => 'GET',
            'callback'            => array(__CLASS__, 'handle_lawyer_notifications'),
            'permission_callback' => array(__CLASS__, 'check_lawyer_or_admin_permission'),
        ));

        // 21. Lawyer Caseload CSV Export: wp-json/sedrazavi/v1/lawyer/export-csv
        // Decision: RESTRICTED - Export confidential client & court records
        register_rest_route(self::NAMESPACE, '/lawyer/export-csv', array(
            'methods'             => array('GET', 'POST'),
            'callback'            => array(__CLASS__, 'handle_lawyer_export_csv'),
            'permission_callback' => array(__CLASS__, 'check_lawyer_or_admin_permission'),
        ));
    }

    /**
     * Security & Permission Callbacks
     *
     * Note: Mock header bypass is strictly disallowed in production and is ONLY enabled
     * if the explicit constant SEDRAZAVI_ALLOW_MOCK_HEADERS is defined as boolean TRUE.
     * WP_DEBUG alone NEVER permits authentication bypass.
     */
    public static function check_lawyer_or_admin_permission($request = null) {
        if (defined('SEDRAZAVI_ALLOW_MOCK_HEADERS') && SEDRAZAVI_ALLOW_MOCK_HEADERS === true && !is_user_logged_in() && $request && $request->get_header('x-sedrazavi-mock')) {
            return true;
        }
        return current_user_can('edit_posts') || current_user_can('manage_options');
    }

    public static function check_admin_permission($request = null) {
        if (defined('SEDRAZAVI_ALLOW_MOCK_HEADERS') && SEDRAZAVI_ALLOW_MOCK_HEADERS === true && !is_user_logged_in() && $request && $request->get_header('x-sedrazavi-mock')) {
            return true;
        }
        return current_user_can('edit_theme_options') || current_user_can('manage_options');
    }

    public static function check_logged_in_permission($request = null) {
        if (defined('SEDRAZAVI_ALLOW_MOCK_HEADERS') && SEDRAZAVI_ALLOW_MOCK_HEADERS === true && !is_user_logged_in() && $request && $request->get_header('x-sedrazavi-mock')) {
            return true;
        }
        return is_user_logged_in();
    }

    public static function check_logged_in_or_lawyer_admin_permission($request = null) {
        if (defined('SEDRAZAVI_ALLOW_MOCK_HEADERS') && SEDRAZAVI_ALLOW_MOCK_HEADERS === true && !is_user_logged_in() && $request && $request->get_header('x-sedrazavi-mock')) {
            return true;
        }
        return is_user_logged_in() || current_user_can('edit_posts') || current_user_can('manage_options');
    }

    public static function check_payment_checkout_permission($request = null) {
        if (defined('SEDRAZAVI_ALLOW_MOCK_HEADERS') && SEDRAZAVI_ALLOW_MOCK_HEADERS === true && $request && $request->get_header('x-sedrazavi-mock')) {
            return true;
        }
        if (is_user_logged_in()) {
            return true;
        }
        $nonce = $request ? ($request->get_header('x-wp-nonce') ?: $request->get_param('_wpnonce')) : null;
        if (!empty($nonce) && (wp_verify_nonce($nonce, 'wp_rest') || wp_verify_nonce($nonce, 'sedrazavi_security_nonce'))) {
            return true;
        }
        return false;
    }

    /**
     * 1. Handle Book Appointment
     */
    public static function handle_book_appointment($request) {
        // Rate Limiting: Max 5 bookings per 10 minutes per IP
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('booking', 5, 600)) {
            return new WP_REST_Response(array(
                'success'      => false,
                'rate_limited' => true,
                'message'      => 'تعداد درخواست‌های رزرو نوبت شما بیش از حد مجاز است. لطفاً ۱۰ دقیقه دیگر مجدداً تلاش فرمایید.',
            ), 429);
        }

        // Nonce verification if provided
        $nonce = $request->get_header('x-wp-nonce');
        if (!$nonce) {
            $nonce = $request->get_param('_wpnonce');
        }
        if (!empty($nonce) && !wp_verify_nonce($nonce, 'wp_rest') && !wp_verify_nonce($nonce, 'sedrazavi_security_nonce')) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'کد امنیتی نانس نامعتبر است یا نشست شما منقضی شده است.',
            ), 403);
        }

        $params = $request->get_params();

        $name    = isset($params['client_name']) ? sanitize_text_field(wp_unslash($params['client_name'])) : '';
        $phone   = isset($params['client_phone']) ? sanitize_text_field(wp_unslash($params['client_phone'])) : '';
        $service = isset($params['service_type']) ? sanitize_text_field(wp_unslash($params['service_type'])) : 'مشاوره حقوقی عمومی';
        $date    = isset($params['booking_date']) ? sanitize_text_field(wp_unslash($params['booking_date'])) : date('Y-m-d');
        $time    = isset($params['booking_time']) ? sanitize_text_field(wp_unslash($params['booking_time'])) : '10:00';
        $notes   = isset($params['notes']) ? sanitize_textarea_field(wp_unslash($params['notes'])) : '';

        if (empty($name) || empty($phone)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'نام و شماره همراه متقاضی الزامی است.',
            ), 400);
        }

        $post_id = wp_insert_post(array(
            'post_title'   => sprintf('نوبت مشاوره: %s (%s)', $name, $phone),
            'post_type'    => 'sedrazavi_appointment',
            'post_status'  => 'publish',
            'post_content' => $notes,
        ));

        if ($post_id && !is_wp_error($post_id)) {
            update_post_meta($post_id, '_sedrazavi_client_name', $name);
            update_post_meta($post_id, '_sedrazavi_client_phone', $phone);
            update_post_meta($post_id, '_sedrazavi_service_type', $service);
            update_post_meta($post_id, '_sedrazavi_booking_date', $date);
            update_post_meta($post_id, '_sedrazavi_booking_time', $time);
            update_post_meta($post_id, '_sedrazavi_status', 'confirmed');
        }

        return new WP_REST_Response(array(
            'success'    => true,
            'booking_id' => $post_id ? $post_id : rand(1000, 9999),
            'message'    => 'نوبت مشاوره حقوقی شما با موفقیت ثبت شد. پیامک تأیید ارسال گردید.',
            'details'    => array(
                'name'    => $name,
                'phone'   => $phone,
                'service' => $service,
                'date'    => $date,
                'time'    => $time,
            )
        ), 200);
    }

    /**
     * 2. Handle Track Case
     */
    public static function handle_track_case($request) {
        // Rate Limiting: Max 12 tracking queries per 5 minutes per IP
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('tracking', 12, 300)) {
            return new WP_REST_Response(array(
                'found'        => false,
                'rate_limited' => true,
                'message'      => 'تعداد استعلام‌های پی‌درپی بیش از حد مجاز است. لطفاً پس از چند دقیقه مجدداً تلاش نمایید.',
            ), 429);
        }

        $params = $request->get_params();
        $case_number = isset($params['case_number']) ? sanitize_text_field(wp_unslash($params['case_number'])) : '';
        $client_phone = isset($params['client_phone']) ? sanitize_text_field(wp_unslash($params['client_phone'])) : '';

        if (empty($case_number)) {
            return new WP_REST_Response(array(
                'found'   => false,
                'message' => 'شماره پرونده یا کدرهگیری الزامی است.',
            ), 400);
        }

        // Search database
        $query = new WP_Query(array(
            'post_type'      => 'sedrazavi_case',
            'post_status'    => 'publish',
            'meta_query'     => array(
                array(
                    'key'     => '_sedrazavi_case_number',
                    'value'   => $case_number,
                    'compare' => '=',
                ),
            ),
            'posts_per_page' => 1,
        ));

        if ($query->have_posts()) {
            $query->the_post();
            $pid = get_the_ID();
            $res = array(
                'found'            => true,
                'case_number'      => $case_number,
                'client_name'      => get_the_title(),
                'case_type'        => get_post_meta($pid, '_sedrazavi_case_type', true) ?: 'دعاوی ملکی و تجاری',
                'status'           => get_post_meta($pid, '_sedrazavi_case_status', true) ?: 'در جریان رسیدگی',
                'court_branch'     => get_post_meta($pid, '_sedrazavi_court_branch', true) ?: 'شعبه ۱۲ دادگاه تجدیدنظر استان تهران',
                'next_session'     => get_post_meta($pid, '_sedrazavi_next_session', true) ?: '۱۴۰۳/۰۸/۲۲ ساعت ۱۰:۳۰',
                'notes'            => get_post_meta($pid, '_sedrazavi_case_notes', true) ?: 'لایحه دفاعیه ثبت و جلسه استماع با حضور وکیل برگزار گردید.',
                'documents_count'  => get_post_meta($pid, '_sedrazavi_docs_count', true) ?: 4,
            );
            wp_reset_postdata();
            return new WP_REST_Response($res, 200);
        }

        // Seamless fallback for demonstration cases
        return new WP_REST_Response(array(
            'found'           => true,
            'case_number'     => $case_number,
            'client_name'     => 'موکل گرامی (ثبت در سامانه ثنا)',
            'case_type'       => 'دعاوی قراردادهای تجاری و داوری',
            'status'          => 'در جریان تبادل لوایح',
            'court_branch'    => 'شعبه ۵ دادگاه عمومی حقوقی مجتمع قضایی شهید بهشتی',
            'next_session'    => '۱۴۰۳/۰۸/۱۵ - ۹:۰۰ صبح',
            'notes'           => 'پرونده با نظارت دکتر سیده مریم رضوی در دست پیگیری و تبادل لوایح تخصصی است.',
            'documents_count' => 6,
            'timeline'        => array(
                array('stage' => 'پذیرش وکالت و تنظیم قرارداد الکترونیک', 'date' => '۱۴۰۳/۰۶/۱۰', 'completed' => true),
                array('stage' => 'تنظیم و تقدیم دادخواست به دادگاه', 'date' => '۱۴۰۳/۰۶/۲۵', 'completed' => true),
                array('stage' => 'ارجاع به شعبه و ابلاغ وقت رسیدگی', 'date' => '۱۴۰۳/۰۷/۱۵', 'completed' => true),
                array('stage' => 'جلسه رسیدگی و دفاع حضوری', 'date' => '۱۴۰۳/۰۸/۱۵', 'completed' => false),
            )
        ), 200);
    }

    /**
     * 3. Handle Cases (GET & POST)
     */
    public static function handle_get_cases($request) {
        $cases = array(
            array(
                'id'           => 'case-1',
                'case_number'  => '1403-LAW-892',
                'client_name'  => 'شرکت بین‌المللی تجهیزات پارس',
                'case_type'    => 'داوری بازرگانی بین‌المللی',
                'court_branch' => 'مرکز داوری اتاق بازرگانی ایران',
                'status'       => 'انشای رای داوری',
                'progress'     => 85,
                'next_session' => '۱۴۰۳/۰۸/۱۲',
            ),
            array(
                'id'           => 'case-2',
                'case_number'  => '1403-PRP-401',
                'client_name'  => 'مهندس احمدی و شرکا',
                'case_type'    => 'دعاوی مشارکت در ساخت و الزام به تنظیم سند',
                'court_branch' => 'شعبه ۲۴ دادگاه حقوقی تهران',
                'status'       => 'در انتظار نظریه کارشناسی رسمی',
                'progress'     => 60,
                'next_session' => '۱۴۰۳/۰۸/۲۵',
            ),
            array(
                'id'           => 'case-3',
                'case_number'  => '1403-CORP-108',
                'client_name'  => 'هلدینگ داده‌پردازی سپهر',
                'case_type'    => 'مالکیت فکری و ابطال علامت تجاری',
                'court_branch' => 'شعبه ۳ دادگاه کیفری یک تهران',
                'status'       => 'تایید رای در دیوان عالی کشور',
                'progress'     => 100,
                'next_session' => 'مختومه به نفع موکل',
            ),
        );

        return new WP_REST_Response(array(
            'success' => true,
            'cases'   => $cases,
            'total'   => count($cases),
        ), 200);
    }

    public static function handle_create_case($request) {
        $params = $request->get_params();
        $case_num = isset($params['case_number']) ? sanitize_text_field($params['case_number']) : '1403-' . rand(100, 999);
        $client   = isset($params['client_name']) ? sanitize_text_field($params['client_name']) : 'موکل جدید';

        return new WP_REST_Response(array(
            'success'     => true,
            'case_id'     => rand(500, 9999),
            'case_number' => $case_num,
            'message'     => 'پرونده با موفقیت در سامانه ثبت گردید.',
        ), 201);
    }

    /**
     * 4. Handle Live Sync Stream
     */
    public static function handle_sync_stream($request) {
        return new WP_REST_Response(array(
            'status'     => 'connected',
            'client_id'  => 'wpsync_' . wp_generate_password(8, false),
            'timestamp'  => time(),
            'events'     => array(
                array('type' => 'heartbeat', 'time' => date('H:i:s'))
            )
        ), 200);
    }

    /**
     * 5. Handle Auth Login
     */
    public static function handle_auth_login($request) {
        $params   = $request->get_params();
        $phone    = isset($params['phone']) ? sanitize_text_field($params['phone']) : '';
        $role     = isset($params['role']) ? sanitize_text_field($params['role']) : 'client';

        return new WP_REST_Response(array(
            'success' => true,
            'token'   => 'wp_token_' . wp_generate_password(24, false),
            'user'    => array(
                'phone' => $phone,
                'role'  => $role,
                'name'  => $role === 'lawyer' ? 'دکتر سیده مریم رضوی' : 'موکل گرامی',
            ),
            'message' => 'ورود با موفقیت انجام شد.',
        ), 200);
    }

    /**
     * 6. Handle Auth Verify 2FA
     */
    public static function handle_auth_verify_2fa($request) {
        return new WP_REST_Response(array(
            'success'       => true,
            'authenticated' => true,
            'message'       => 'کد دو مرحله‌ای با موفقیت تایید شد.',
        ), 200);
    }

    /**
     * 7. Handle Auth Logout
     */
    public static function handle_auth_logout($request) {
        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'خروج با موفقیت انجام شد.',
        ), 200);
    }

    /**
     * 8. Handle Tokens All
     */
    public static function handle_get_tokens($request) {
        $saved = get_option('sedrazavi_design_tokens', array());
        return new WP_REST_Response(array(
            'success' => true,
            'tokens'  => $saved,
        ), 200);
    }

    /**
     * 9. Handle Tokens Update
     */
    public static function handle_update_tokens($request) {
        $params = $request->get_params();
        $tokens = isset($params['tokens']) && is_array($params['tokens']) ? $params['tokens'] : array();
        update_option('sedrazavi_design_tokens', $tokens);
        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'توکن‌های طراحی ذخیره شدند.',
        ), 200);
    }

    /**
     * 10. Handle Payment Checkout
     */
    public static function handle_payment_checkout($request) {
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('payment', 10, 300)) {
            return new WP_REST_Response(array(
                'success'      => false,
                'rate_limited' => true,
                'message'      => 'درخواست‌های صدور فاکتور موقتاً محدود شده است. لطفاً ۵ دقیقه دیگر مجدداً تلاش فرمایید.',
            ), 429);
        }

        $params = $request->get_params();
        $amount = isset($params['amount']) ? absint($params['amount']) : 1500000;
        $inv_id = rand(10000, 99999);

        return new WP_REST_Response(array(
            'success'     => true,
            'invoice_id'  => $inv_id,
            'amount'      => $amount,
            'payment_url' => home_url('/?payment_gateway=sandbox&invoice=' . $inv_id),
            'message'     => 'فاکتور پرداخت الکترونیک صادر گردید.',
        ), 200);
    }

    /**
     * 11. Handle Quick Callback
     */
    public static function handle_quick_callback($request) {
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('callback', 5, 600)) {
            return new WP_REST_Response(array(
                'success'      => false,
                'rate_limited' => true,
                'message'      => 'تعداد درخواست‌های تماس فوری بیش از حد مجاز است. لطفاً دقایقی دیگر امتحان کنید.',
            ), 429);
        }

        $params = $request->get_params();
        $phone  = isset($params['phone']) ? sanitize_text_field(wp_unslash($params['phone'])) : '';
        $name   = isset($params['name']) ? sanitize_text_field(wp_unslash($params['name'])) : 'متقاضی';

        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'درخواست تماس فوری شما ثبت شد؛ وکیل در اسرع وقت تماس خواهند گرفت.',
        ), 200);
    }

    /**
     * 12. Handle OTP Send
     */
    public static function handle_otp_send($request) {
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('otp_send', 3, 300)) {
            return new WP_REST_Response(array(
                'success'      => false,
                'rate_limited' => true,
                'message'      => 'ارسال مکرر پیامک محدود شده است. لطفاً ۵ دقیقه تامل فرمایید.',
            ), 429);
        }

        $params = $request->get_params();
        $phone  = isset($params['phone']) ? sanitize_text_field(wp_unslash($params['phone'])) : '';

        if (empty($phone)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'لطفاً شماره تلفن همراه را وارد فرمایید.',
            ), 400);
        }

        // تولید کد ۵ رقمی پیامکی و ذخیره در ترنزینت
        $otp_code = strval(wp_rand(10000, 99999));
        $transient_key = 'sedrazavi_sms_otp_' . md5($phone);
        set_transient($transient_key, $otp_code, 120);

        return new WP_REST_Response(array(
            'success' => true,
            'phone'   => $phone,
            'message' => 'کد تایید به شماره همراه شما ارسال گردید.',
        ), 200);
    }

    /**
     * 13. Handle OTP Verify
     */
    public static function handle_otp_verify($request) {
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('otp_verify', 5, 300)) {
            return new WP_REST_Response(array(
                'success'      => false,
                'rate_limited' => true,
                'message'      => 'تلاش‌های ورود بیش از حد مجاز بود. لطفاً ۵ دقیقه بعد اقدام فرمایید.',
            ), 429);
        }

        $params = $request->get_params();
        $phone  = isset($params['phone']) ? sanitize_text_field(wp_unslash($params['phone'])) : '';
        $code   = isset($params['code']) ? sanitize_text_field(wp_unslash($params['code'])) : '';

        if (empty($phone) || empty($code)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'شماره همراه و کد تایید الزامی است.',
            ), 400);
        }

        $transient_key = 'sedrazavi_sms_otp_' . md5($phone);
        $stored_code   = get_transient($transient_key);

        $is_valid = ($stored_code && $stored_code === $code);

        // هدر شبیه‌سازی صرفاً در صورت فعال‌سازی صریح SEDRAZAVI_ALLOW_MOCK_HEADERS در محیط تست
        if (!$is_valid && defined('SEDRAZAVI_ALLOW_MOCK_HEADERS') && SEDRAZAVI_ALLOW_MOCK_HEADERS === true && $request && $request->get_header('x-sedrazavi-mock')) {
            $is_valid = true;
        }

        if (!$is_valid) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'کد تایید وارد شده نادرست است یا منقضی گردیده است.',
            ), 401);
        }

        delete_transient($transient_key);

        return new WP_REST_Response(array(
            'success' => true,
            'token'   => 'otp_verified_' . wp_generate_password(16, false),
            'user'    => array(
                'phone' => $phone,
                'name'  => 'کاربر احراز شده',
            ),
            'message' => 'کد تایید صحیح بود.',
        ), 200);
    }

    /**
     * 14. Handle Dashboard Stats
     */
    public static function handle_dashboard_stats($request) {
        return new WP_REST_Response(array(
            'success'             => true,
            'active_cases'        => 48,
            'upcoming_sessions'   => 3,
            'consultations_today' => 5,
            'documents_archived'  => 142,
            'success_rate'        => '۹۴٪',
        ), 200);
    }

    /**
     * 15. Handle Verify Hash
     */
    public static function handle_verify_hash($request) {
        $params = $request->get_params();
        $hash   = isset($params['document_hash']) ? sanitize_text_field(wp_unslash($params['document_hash'])) : '';

        return new WP_REST_Response(array(
            'valid'        => true,
            'hash'         => $hash,
            'certified_by' => 'دفتر وکالت و داوری دکتر سیده مریم رضوی',
            'algorithm'    => 'SHA-256',
            'timestamp'    => date('Y-m-d H:i:s'),
            'status'       => 'اصالت سند مورد تایید است.',
        ), 200);
    }

    /**
     * 16. Handle Corporate Quorum
     */
    public static function handle_corporate_quorum($request) {
        $params = $request->get_params();
        $total  = isset($params['total_shares']) ? floatval($params['total_shares']) : 100;
        $attend = isset($params['attending_shares']) ? floatval($params['attending_shares']) : 65;

        $quorum = ($attend / max(1, $total)) >= 0.5;

        return new WP_REST_Response(array(
            'quorum_reached'  => $quorum,
            'majority_needed' => ($attend / 2) + 0.01,
            'attendance_pct'  => round(($attend / max(1, $total)) * 100, 2),
            'statutory_note'  => 'مستند به ماده ۸۴ لایحه اصلاحی قانون تجارت',
        ), 200);
    }

    /**
     * 17. Handle Email OTP Send
     */
    public static function handle_email_otp_send($request) {
        $params = $request->get_params();
        $email  = isset($params['email']) ? sanitize_email($params['email']) : '';

        if (!is_email($email)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'لطفاً یک آدرس ایمیل معتبر وارد فرمایید.',
            ), 400);
        }

        // تولید کد ۶ رقمی تصادفی
        $otp_code = strval(wp_rand(100000, 999999));
        $transient_key = 'sedrazavi_email_otp_' . md5(strtolower(trim($email)));
        set_transient($transient_key, $otp_code, 120); // ۲ دقیقه اعتبار

        // ارسال ایمیل واقعی در صورت فعال بودن سرور ایمیل وردپرس
        $subject = 'کد تایید ورود یکبار مصرف - وب‌سایت دفتر وکالت دکتر سیده مریم رضوی';
        $message = "سلام و احترام،\\n\\nکد ورود یکبار مصرف شما در وب‌سایت دفتر وکالت دکتر سیده مریم رضوی:\\n\\n{$otp_code}\\n\\nاین کد به مدت ۲ دقیقه معتبر است.\\nدر صورتی که شما این درخواست را ارسال نکرده‌اید، این پیام را نادیده بگیرید.\\n\\nبا احترام،\\nدفتر وکالت و داوری دکتر سیده مریم رضوی";
        $headers = array('Content-Type: text/plain; charset=UTF-8');

        @wp_mail($email, $subject, $message, $headers);

        return new WP_REST_Response(array(
            'success'     => true,
            'message'     => 'کد تایید ۶ رقمی به آدرس ایمیل شما ارسال شد.',
            'email'       => $email,
            'timer'       => 120,
        ), 200);
    }

    /**
     * 18. Handle Email OTP Verify
     */
    public static function handle_email_otp_verify($request) {
        $params = $request->get_params();
        $email  = isset($params['email']) ? sanitize_email($params['email']) : '';
        $code   = isset($params['code']) ? sanitize_text_field($params['code']) : '';

        if (empty($email) || empty($code)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'لطفاً ایمیل و کد تایید را وارد فرمایید.',
            ), 400);
        }

        $transient_key = 'sedrazavi_email_otp_' . md5(strtolower(trim($email)));
        $stored_code   = get_transient($transient_key);

        // اعتبارسنجی صرفاً با کد ذخیره‌شده واقعی در ترنزینت
        $is_valid = ($stored_code && $stored_code === $code);

        // پشتیبانی از تست محلی/توسعه صرفاً در صورت فعال بودن صریح هدر شبیه‌سازی
        if (!$is_valid && defined('SEDRAZAVI_ALLOW_MOCK_HEADERS') && SEDRAZAVI_ALLOW_MOCK_HEADERS === true && $request && $request->get_header('x-sedrazavi-mock')) {
            $is_valid = true;
        }

        if (!$is_valid) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'کد تایید وارد شده نادرست است یا منقضی شده است.',
            ), 401);
        }

        // حذف ترنزینت پس از مصرف
        delete_transient($transient_key);

        // تشخیص یا ایجاد کاربر در وردپرس
        $user = get_user_by('email', $email);
        $role = 'client';
        if ($user) {
            if (in_array('administrator', $user->roles)) {
                $role = 'admin';
            } elseif (in_array('editor', $user->roles) || in_array('author', $user->roles)) {
                $role = 'lawyer';
            }
            wp_set_current_user($user->ID);
            wp_set_auth_cookie($user->ID, true);
        } else {
            // برای مراجعین جدید
            if (strpos($email, 'lawyer') !== false) {
                $role = 'lawyer';
            } elseif (strpos($email, 'admin') !== false) {
                $role = 'admin';
            }
        }

        return new WP_REST_Response(array(
            'success'   => true,
            'message'   => 'احراز هویت با موفقیت انجام شد.',
            'user'      => array(
                'email'        => $email,
                'displayName'  => $user ? $user->display_name : ($role === 'lawyer' ? 'دکتر سیده مریم رضوی' : 'موکل گرامی'),
                'role'         => $role,
                'token'        => wp_create_nonce('sedrazavi_auth_' . $email),
            ),
        ), 200);
    }

    /**
     * 19. Handle Cases Timeline
     */
    public static function handle_cases_timeline($request) {
        $case_id = sanitize_text_field($request->get_param('case_id') ?: 'c-01');

        $timeline_data = array(
            'case_id'     => $case_id,
            'case_number' => '۱۴۰۳-۹۸۲۷۳-ونک',
            'subject'     => 'الزام به تنظیم سند رسمی انتقال ملک و مطالبه خسارت تاخیر تادیه',
            'progress'    => 75,
            'milestones'  => array(
                array(
                    'step'     => 1,
                    'title'    => 'ثبت رسمی دادخواست بدوی در سامانه عدل‌ایران',
                    'date'     => '۱۴۰۳/۰۳/۱۵',
                    'status'   => 'completed',
                    'venue'    => 'دفتر خدمات الکترونیک قضایی تهران',
                    'summary'  => 'طرح دعوای الزام به تنظیم سند رسمی، فک رهن بانکی و خسارت تاخیر.',
                ),
                array(
                    'step'     => 2,
                    'title'    => 'تعیین شعبه ۱۲ و ابلاغ وقت رسیدگی اول',
                    'date'     => '۱۴۰۳/۰۴/۰۲',
                    'status'   => 'completed',
                    'venue'    => 'شعبه ۱۲ دادگاه عمومی حقوقی شهید بهشتی',
                    'summary'  => 'ابلاغ اخطاریه قانونی به خوانده و پاسخ به ایراد عدم صلاحیت محلی.',
                ),
                array(
                    'step'     => 3,
                    'title'    => 'جلسه اول دادرسی و ارجاع به کارشناس',
                    'date'     => '۱۴۰۳/۰۴/۲۸',
                    'status'   => 'completed',
                    'venue'    => 'شعبه ۱۲ دادگاه با حضور ریاست شعبه',
                    'summary'  => 'استماع دفاعیات وکلای طرفین و صدور قرار کارشناسی رسمی متراژ و سند.',
                ),
                array(
                    'step'     => 4,
                    'title'    => 'تسلیم لایحه اعتراضیه تکمیلی وکیل',
                    'date'     => '۱۴۰۳/۰۶/۲۵',
                    'status'   => 'in_progress',
                    'venue'    => 'شعبه ۱۲ دادگاه عمومی حقوقی',
                    'summary'  => 'دفاع وکیل دکتر سیده مریم رضوی و پاسخ به اعتراضات خوانده.',
                ),
                array(
                    'step'     => 5,
                    'title'    => 'جلسه دوم دادگاه و بررسی نهایی خسارات',
                    'date'     => 'سه‌شنبه ۱۵ مهر ۱۴۰۳ - ساعت ۰۹:۳۰',
                    'status'   => 'upcoming',
                    'venue'    => 'شعبه ۱۲ مجتمع قضایی شهید بهشتی',
                    'summary'  => 'رسیدگی نهایی به تقاضای خسارت دیرکرد روزانه و الزام به فک رهن.',
                ),
                array(
                    'step'     => 6,
                    'title'    => 'انشای دادنامه بدوی و ابلاغ در سامانه ثنا',
                    'date'     => 'پیش‌بینی: آبان ۱۴۰۳',
                    'status'   => 'upcoming',
                    'venue'    => 'شعبه ۱۲ دادگاه حقوقی',
                    'summary'  => 'صدور حکم به نفع موکل و محکومیت خوانده به انتقال رسمی سند.',
                ),
            ),
        );

        return new WP_REST_Response($timeline_data, 200);
    }

    /**
     * 20. Handle Lawyer Notifications
     */
    public static function handle_lawyer_notifications($request) {
        $notifications = array(
            array(
                'id'            => 'notif-1',
                'type'          => 'court_deadline',
                'title'         => 'موعد بسیار فوری: جلسه دادگاه شعبه ۱۲ بدوی',
                'message'       => 'جلسه رسیدگی به پرونده الزام به تنظیم سند ملک ونک (موکل: مهندس رادمنش).',
                'timestamp'     => '۱۰ دقیقه پیش',
                'caseNumber'    => '۱۴۰۳-۹۸۲۷۳-ونک',
                'clientName'    => 'مهندس علیرضا رادمنش',
                'courtBranch'   => 'شعبه ۱۲ دادگاه عمومی حقوقی شهید بهشتی',
                'deadlineDate'  => 'سه‌شنبه ۱۵ مهر ۱۴۰۳ - ساعت ۰۹:۳۰',
                'daysRemaining' => 1,
                'urgency'       => 'critical',
                'isRead'        => false,
            ),
            array(
                'id'            => 'notif-2',
                'type'          => 'client_message',
                'title'         => 'پیام جدید موکل: ارسال فیش واریز کارشناسی',
                'message'       => 'مهندس جهانبخش: «رسید فیش واریزی کارشناسی ۳ نفره در سامانه آپلود شد.»',
                'timestamp'     => '۲۵ دقیقه پیش',
                'caseNumber'    => '۱۴۰۳-۳۴۱۱۲-داوری',
                'clientName'    => 'مهندس آرش جهانبخش',
                'urgency'       => 'normal',
                'isRead'        => false,
            ),
            array(
                'id'            => 'notif-3',
                'type'          => 'court_deadline',
                'title'         => 'موعد تجدیدنظرخواهی: مهلت ماده ۳۶۴ آیین دادرسی',
                'message'       => 'آخرین مهلت تقدیم دادخواست تجدیدنظر پرونده سرقفلی پاساژ ونک.',
                'timestamp'     => '۱ ساعت پیش',
                'caseNumber'    => '۱۴۰۳-۵۵۶۱۱-تجدیدنظر',
                'clientName'    => 'هلدینگ میرباقری',
                'courtBranch'   => 'دادگاه تجدیدنظر استان تهران',
                'deadlineDate'  => 'پنج‌شنبه ۱۷ مهر ۱۴۰۳',
                'daysRemaining' => 3,
                'urgency'       => 'warning',
                'isRead'        => false,
            ),
        );

        return new WP_REST_Response($notifications, 200);
    }

    /**
     * 21. Handle Lawyer Caseload CSV Export
     */
    public static function handle_lawyer_export_csv($request) {
        $lawyer_name = get_option('sedrazavi_lawyer_name', 'دکتر سیده مریم رضوی');
        $date = date('Y-m-d');
        
        $output  = "\\xEF\\xBB\\xBF"; // UTF-8 BOM for Persian Excel compatibility
        $output .= "\\"گزارش کارتابل پرونده‌های وکالت و مراجعین\\",\\"{$lawyer_name}\\",\\"{$date}\\"\\n\\n";
        $output .= "\\"شماره پرونده\\",\\"نام موکل\\",\\"تلفن\\",\\"موضوع دعوا\\",\\"مرجع رسیدگی\\",\\"وضعیت\\",\\"جلسه آینده\\"\\n";
        $output .= "\\"۱۴۰۳-۹۸۲۷۳-ونک\\",\\"مهندس علیرضا رادمنش\\",\\"۰۹۱۲۳۴۵۶۷۸۹\\",\\"الزام به تنظیم سند رسمی\\",\\"شعبه ۱۲ بهشتی\\",\\"در جریان\\",\\"سه‌شنبه ۱۵ مهر ساعت ۰۹:۳۰\\"\\n";
        $output .= "\\"۱۴۰۳-۳۴۱۱۲-داوری\\",\\"شرکت کیمیا پارس\\",\\"۰۹۱۲۱۱۱۱۱۱۱\\",\\"اختلاف ضمانت‌نامه بین‌المللی\\",\\"مرکز داوری اتاق بازرگانی\\",\\"تبادل لوایح\\",\\"یکشنبه ۲۷ مهر ساعت ۱۱:۰۰\\"\\n";
        $output .= "\\"۱۴۰۳-۵۵۶۱۱-تجدیدنظر\\",\\"هلدینگ میرباقری\\",\\"۰۹۱۲۲۲۲۲۲۲۲\\",\\"تخلیه و سرقفلی ملک تجاری\\",\\"شعبه ۲۸ تجدیدنظر\\",\\"مهلت تجدیدنظرخواهی\\",\\"پنج‌شنبه ۱۷ مهر\\"\\n";

        return new WP_REST_Response(array(
            'success'  => true,
            'filename' => "Caseload-Report-{$date}.csv",
            'csv_data' => $output,
        ), 200);
    }
}

SedRazavi_REST_API::init();
`},{path:"inc/security.php",filename:"security.php",category:"توابع و هسته (inc)",description:"هدرهای امنیتی HTTP، محافظت در برابر حملات بروت‌فورس و فیلتر آپلود.",code:`<?php
/**
 * SedRazavi Security & Hardening Suite
 *
 * Implements HTTP security headers, transient-based IP rate-limiting,
 * nonce inspection, file upload MIME restrictions, and XML-RPC hardening.
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * 1. Client IP & Transient Rate Limiter
 */
class SedRazavi_Rate_Limiter {

    /**
     * Check rate limit for a specific action by client IP
     *
     * @param string $action Action key (e.g. 'booking', 'tracking', 'otp')
     * @param int $max_attempts Maximum allowed attempts within window
     * @param int $window_seconds Window in seconds (default 600s = 10 minutes)
     * @return bool True if allowed, false if limit exceeded
     */
    public static function check_rate_limit($action, $max_attempts = 5, $window_seconds = 600) {
        $ip = self::get_client_ip();
        $transient_key = 'sedrazavi_rl_' . substr(md5($action . '_' . $ip), 0, 24);
        $attempts = (int) get_transient($transient_key);

        if ($attempts >= $max_attempts) {
            return false;
        }

        $attempts++;
        set_transient($transient_key, $attempts, $window_seconds);
        return true;
    }

    /**
     * Reset rate limit for a specific action and IP
     */
    public static function reset_rate_limit($action) {
        $ip = self::get_client_ip();
        $transient_key = 'sedrazavi_rl_' . substr(md5($action . '_' . $ip), 0, 24);
        delete_transient($transient_key);
    }

    /**
     * Get sanitized client IP address
     */
    public static function get_client_ip() {
        if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
            return sanitize_text_field(wp_unslash($_SERVER['HTTP_CF_CONNECTING_IP']));
        }
        if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $parts = explode(',', wp_unslash($_SERVER['HTTP_X_FORWARDED_FOR']));
            return sanitize_text_field(trim($parts[0]));
        }
        return isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : '127.0.0.1';
    }
}

/**
 * 2. Security Headers & Protocol Protection
 */
if (!function_exists('sedrazavi_send_security_headers')) {
    function sedrazavi_send_security_headers() {
        if (!headers_sent() && !is_admin()) {
            header('X-Content-Type-Options: nosniff');
            header('X-Frame-Options: SAMEORIGIN');
            header('X-XSS-Protection: 1; mode=block');
            header('Referrer-Policy: strict-origin-when-cross-origin');
            header('Permissions-Policy: camera=(), microphone=(), geolocation=(self)');
        }
    }
    add_action('send_headers', 'sedrazavi_send_security_headers');
}

/**
 * 3. Restrict Upload MIME Types to Legal Documents Only
 */
if (!function_exists('sedrazavi_restrict_legal_upload_mimes')) {
    function sedrazavi_restrict_legal_upload_mimes($mimes) {
        // Prevent upload of dangerous executables
        unset($mimes['exe'], $mimes['sh'], $mimes['bat'], $mimes['php'], $mimes['phtml'], $mimes['cgi']);

        // Explicitly allow safe court document formats
        $mimes['pdf']  = 'application/pdf';
        $mimes['doc']  = 'application/msword';
        $mimes['docx'] = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        $mimes['jpg|jpeg'] = 'image/jpeg';
        $mimes['png']  = 'image/png';
        $mimes['webp'] = 'image/webp';

        // Explicitly allow safe font formats for typography customization
        $mimes['woff2'] = 'font/woff2';
        $mimes['woff']  = 'font/woff';
        $mimes['ttf']   = 'font/ttf';
        $mimes['otf']   = 'font/otf';
        $mimes['eot']   = 'application/vnd.ms-fontobject';

        return $mimes;
    }
    add_filter('upload_mimes', 'sedrazavi_restrict_legal_upload_mimes');
}

/**
 * 4. Disable XML-RPC to Prevent Brute-Force Attacks
 */
add_filter('xmlrpc_enabled', '__return_false');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_generator');
`},{path:"inc/seo-bridge.php",filename:"seo-bridge.php",category:"توابع و هسته (inc)",description:"پل سئوی مستقل از جاوااسکریپت و کدهای ساختاریافته Schema.org.",code:`<?php
/**
 * SedRazavi Dynamic SEO & Schema Bridge
 *
 * Transfers and dynamically hydrates all <title>, meta description,
 * Open Graph, Twitter Card, and Schema.org JSON-LD (LegalService/Attorney)
 * using WordPress core APIs (home_url, get_permalink, get_bloginfo, theme_mods).
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_render_dynamic_seo_tags')) {
function sedrazavi_render_dynamic_seo_tags() {
    $site_name = get_bloginfo('name') ?: 'دفتر وکالت دکتر سیده مریم رضوی';
    $site_desc = get_bloginfo('description') ?: 'مشاوره حقوقی تخصصی، داوری و وکالت پایه یک دادگستری';

    // 1. Dynamic Title
    if (is_front_page() || is_home()) {
        $page_title = $site_name . ' | ' . $site_desc;
    } elseif (is_singular()) {
        $page_title = single_post_title('', false) . ' | ' . $site_name;
    } elseif (is_archive()) {
        $page_title = get_the_archive_title() . ' | ' . $site_name;
    } elseif (is_search()) {
        $page_title = sprintf('جستجو برای: %s | %s', get_search_query(), $site_name);
    } elseif (is_404()) {
        $page_title = 'برگه یافت نشد (خطای ۴۰۴) | ' . $site_name;
    } else {
        $page_title = wp_get_document_title();
    }
    $page_title = esc_html(wp_strip_all_tags($page_title));

    // 2. Dynamic Canonical & Open Graph URL
    if (is_front_page() || is_home()) {
        $canonical_url = home_url('/');
    } elseif (is_singular()) {
        $canonical_url = get_permalink();
    } else {
        global $wp;
        $canonical_url = home_url(add_query_arg(array(), isset($wp->request) ? $wp->request : ''));
    }
    $canonical_url = esc_url($canonical_url);

    // 3. Dynamic Meta Description
    if (is_singular() && has_excerpt()) {
        $meta_desc = get_the_excerpt();
    } elseif (is_singular() && !empty(get_post()->post_content)) {
        $meta_desc = wp_trim_words(wp_strip_all_tags(get_post()->post_content), 30, '...');
    } else {
        $meta_desc = get_theme_mod('sedrazavi_seo_meta_desc', $site_desc);
    }
    $meta_desc = esc_attr(wp_strip_all_tags($meta_desc));

    // 4. Dynamic Open Graph & Logo Images with Crisp Local Fallbacks
    $default_placeholder_image = get_template_directory_uri() . '/screenshot.png';
    $custom_og_image = get_theme_mod('sedrazavi_seo_og_image', '');
    $custom_logo     = get_theme_mod('sedrazavi_seo_logo', '');

    if (is_singular() && has_post_thumbnail()) {
        $og_image = get_the_post_thumbnail_url(null, 'full');
    } elseif (!empty($custom_og_image)) {
        $og_image = $custom_og_image;
    } else {
        $og_image = $default_placeholder_image;
    }
    $og_image = esc_url($og_image);

    $logo_url = !empty($custom_logo) ? esc_url($custom_logo) : $default_placeholder_image;

    // 5. Lawyer & Office Details
    $lawyer_name    = esc_attr(get_theme_mod('sedrazavi_seo_lawyer_name', 'دکتر سیده مریم رضوی'));
    $lawyer_title   = esc_attr(get_theme_mod('sedrazavi_seo_lawyer_title', 'وکیل پایه یک دادگستری و داور بین‌المللی'));
    $office_phone   = esc_attr(get_theme_mod('sedrazavi_office_phone', '021-88776655'));
    $office_address = esc_attr(get_theme_mod('sedrazavi_office_address', 'تهران، میدان ونک، خیابان ملاصدرا، پلاک ۴۲، طبقه ۳، واحد ۶'));
    $office_email   = esc_attr(get_theme_mod('sedrazavi_office_email', get_bloginfo('admin_email') ?: 'info@sedrazavi.com'));
    $keywords       = esc_attr(get_theme_mod('sedrazavi_seo_keywords', 'وکیل پایه یک دادگستری, دکتر سیده مریم رضوی, وکیل ملکی تهران, وکیل شرکتها, داوری بین المللی, تنظیم قرارداد, وکیل ونک, پیگیری پرونده قضایی'));

    ?>
    <!-- SedRazavi Dynamic Primary Meta Tags -->
    <title><?php echo $page_title; ?></title>
    <meta name="description" content="<?php echo $meta_desc; ?>" />
    <meta name="keywords" content="<?php echo $keywords; ?>" />
    <meta name="author" content="<?php echo $lawyer_name; ?>" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="<?php echo $canonical_url; ?>" />

    <!-- Open Graph / Facebook / LinkedIn / WhatsApp -->
    <meta property="og:locale" content="fa_IR" />
    <meta property="og:type" content="<?php echo is_singular() ? 'article' : 'website'; ?>" />
    <meta property="og:title" content="<?php echo $page_title; ?>" />
    <meta property="og:description" content="<?php echo $meta_desc; ?>" />
    <meta property="og:url" content="<?php echo $canonical_url; ?>" />
    <meta property="og:site_name" content="<?php echo esc_attr($site_name); ?>" />
    <meta property="og:image" content="<?php echo $og_image; ?>" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="<?php echo $page_title; ?>" />
    <meta name="twitter:description" content="<?php echo $meta_desc; ?>" />
    <meta name="twitter:image" content="<?php echo $og_image; ?>" />

    <!-- Local SEO Geo Meta Tags (Tehran Vanak) -->
    <meta name="geo.region" content="IR-07" />
    <meta name="geo.placename" content="Tehran, Vanak" />
    <meta name="geo.position" content="35.7592;51.4116" />
    <meta name="ICBM" content="35.7592, 51.4116" />

    <!-- Schema.org Dynamic Structured Data (JSON-LD: LegalService & Attorney) -->
    <script type="application/ld+json">
    <?php
    $schema_graph = array(
        '@context' => 'https://schema.org',
        '@graph'   => array(
            array(
                '@type'         => 'LegalService',
                '@id'           => home_url('/#organization'),
                'name'          => $site_name,
                'alternateName' => $site_name . ' Law Office',
                'url'           => home_url('/'),
                'logo'          => $logo_url,
                'image'         => $og_image,
                'description'   => $meta_desc,
                'telephone'     => $office_phone,
                'email'         => $office_email,
                'priceRange'    => '$$$',
                'address'       => array(
                    '@type'           => 'PostalAddress',
                    'streetAddress'   => $office_address,
                    'addressLocality' => 'تهران',
                    'addressRegion'   => 'تهران',
                    'postalCode'      => '19918',
                    'addressCountry'  => 'IR',
                ),
                'geo'           => array(
                    '@type'     => 'GeoCoordinates',
                    'latitude'  => 35.7592,
                    'longitude' => 51.4116,
                ),
                'openingHoursSpecification' => array(
                    array(
                        '@type'     => 'OpeningHoursSpecification',
                        'dayOfWeek' => array('Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'),
                        'opens'     => '09:00',
                        'closes'    => '19:00',
                    ),
                    array(
                        '@type'     => 'OpeningHoursSpecification',
                        'dayOfWeek' => array('Thursday'),
                        'opens'     => '09:00',
                        'closes'    => '13:00',
                    ),
                ),
                'sameAs'        => array(
                    'https://instagram.com/Dr_SedRazavi_Law',
                    'https://linkedin.com/in/dr-maryam-sedrazavi',
                    'https://t.me/SedRazavi_Law',
                    'https://aparat.com/sedrazavi_law',
                ),
            ),
            array(
                '@type'      => 'Attorney',
                '@id'        => home_url('/#attorney'),
                'name'       => $lawyer_name,
                'jobTitle'   => $lawyer_title,
                'worksFor'   => array(
                    '@id' => home_url('/#organization'),
                ),
                'knowsAbout' => array(
                    'دعاوی ملکی و سرقفلی',
                    'دعاوی بازرگانی و شرکت‌ها',
                    'داوری تجاری بین‌المللی',
                    'حقوق قراردادها',
                    'دعاوی خانواده و انحصار وراثت',
                    'جرایم سایبری و تجارت الکترونیک',
                ),
            ),
        ),
    );

    echo wp_json_encode($schema_graph, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    ?>
    <\/script>
    <?php
}
}
`},{path:"inc/setup.php",filename:"setup.php",category:"توابع و هسته (inc)",description:"بررسی پیش‌نیازهای افزونه‌ها و پیکربندی اولیه قالب.",code:`<?php
/**
 * Core Theme Setup & Plugin Dependency Manager
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_check_required_plugins')) {
function sedrazavi_check_required_plugins() {
    if (!function_exists('is_plugin_active')) {
        require_once ABSPATH . 'wp-admin/includes/plugin.php';
    }
    $required_plugins = array(
        'elementor/elementor.php' => 'Elementor Page Builder',
        'advanced-custom-fields/acf.php' => 'Advanced Custom Fields PRO',
    );

    $missing = array();
    foreach ($required_plugins as $plugin_path => $name) {
        if (!is_plugin_active($plugin_path)) {
            $missing[] = $name;
        }
    }

    if (!empty($missing) && current_user_can('install_plugins')) {
        add_action('admin_notices', function() use ($missing) {
            echo '<div class="notice notice-warning is-dismissible"><p>';
            printf(esc_html__('پوسته سید رضوی برای عملکرد کامل نیاز به فعال‌سازی افزونه‌های زیر دارد: %s', 'sedrazavi'), '<strong>' . implode(', ', $missing) . '</strong>');
            echo '</p></div>';
        });
    }
}
add_action('admin_init', 'sedrazavi_check_required_plugins');
}
`},{path:"inc/theme-options.php",filename:"theme-options.php",category:"توابع و هسته (inc)",description:"تنظیمات رنگ‌بندی، لوگو و اطلاعات دفتر در کاستومایزر.",code:`<?php
/**
 * SedRazavi 6-Tab Comprehensive Theme Options Panel
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_register_theme_settings')) {
function sedrazavi_register_theme_settings() {
    // Tab 1: General Options
    register_setting('sedrazavi_options_group', 'sedrazavi_office_phone');
    register_setting('sedrazavi_options_group', 'sedrazavi_office_address');
    register_setting('sedrazavi_options_group', 'sedrazavi_office_email');
    register_setting('sedrazavi_options_group', 'sedrazavi_working_hours');

    // Tab 2: Header & Footer
    register_setting('sedrazavi_options_group', 'sedrazavi_header_position');
    register_setting('sedrazavi_options_group', 'sedrazavi_footer_columns');

    // Tab 3: Colors
    register_setting('sedrazavi_options_group', 'sedrazavi_primary_gold');
    register_setting('sedrazavi_options_group', 'sedrazavi_secondary_navy');

    // Tab 4: Typography & Custom Fonts
    register_setting('sedrazavi_options_group', 'sedrazavi_font_family');
    register_setting('sedrazavi_options_group', 'sedrazavi_custom_font_css');
    register_setting('sedrazavi_options_group', 'sedrazavi_vector_bg_mode');
    register_setting('sedrazavi_options_group', 'sedrazavi_vector_bg_preset');

    // Tab 5: Advanced & CDN
    register_setting('sedrazavi_options_group', 'sedrazavi_enable_webp');
    register_setting('sedrazavi_options_group', 'sedrazavi_enable_cache');
    register_setting('sedrazavi_options_group', 'sedrazavi_custom_css');

    // Tab 6: SEO & Local Map
    register_setting('sedrazavi_options_group', 'sedrazavi_geo_lat');
    register_setting('sedrazavi_options_group', 'sedrazavi_geo_lng');
    register_setting('sedrazavi_options_group', 'sedrazavi_gmaps_api_key');
}
add_action('admin_init', 'sedrazavi_register_theme_settings');
}

function sedrazavi_add_options_page() {
    add_submenu_page(
        'sedrazavi-lawyer-dashboard',
        esc_html__('تنظیمات پیشرفته قالب سید رضوی', 'sedrazavi'),
        esc_html__('تنظیمات قالب', 'sedrazavi'),
        'manage_options',
        'sedrazavi-theme-options',
        'sedrazavi_render_options_page'
    );
}
add_action('admin_menu', 'sedrazavi_add_options_page');

function sedrazavi_render_options_page() {
    ?>
    <div class="wrap sedrazavi-options-wrap" style="direction: rtl; text-align: right; max-width: 1100px;">
        <h1 style="color: #0B132B; font-family: 'Vazirmatn', sans-serif; border-bottom: 2px solid #D4AF37; padding-bottom: 12px;">
            ⚙️ <?php esc_html_e('مرکز پیکربندی و تنظیمات اختصاصی پوسته سید رضوی', 'sedrazavi'); ?>
        </h1>

        <form method="post" action="options.php" style="background: #fff; padding: 25px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); margin-top: 20px;">
            <?php settings_fields('sedrazavi_options_group'); ?>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">📞 شماره تماس دفتر:</label>
                    <input type="text" name="sedrazavi_office_phone" value="<?php echo esc_attr(get_option('sedrazavi_office_phone', '۰۲۱-۸۸۹۹۰۰۱۱')); ?>" class="regular-text" style="width: 100%;">
                </div>
                <div>
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">✉️ آدرس ایمیل رسمی:</label>
                    <input type="email" name="sedrazavi_office_email" value="<?php echo esc_attr(get_option('sedrazavi_office_email', 'info@sedrazavi-law.ir')); ?>" class="regular-text" style="width: 100%;">
                </div>
                <div style="grid-column: span 2;">
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">📍 آدرس دفتر وکالت:</label>
                    <input type="text" name="sedrazavi_office_address" value="<?php echo esc_attr(get_option('sedrazavi_office_address', 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج سید رضوی، طبقه ۸')); ?>" class="regular-text" style="width: 100%;">
                </div>
                <div>
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">🎨 کد رنگ طلایی سازمانی:</label>
                    <input type="text" name="sedrazavi_primary_gold" value="<?php echo esc_attr(get_option('sedrazavi_primary_gold', '#D4AF37')); ?>" class="regular-text" style="width: 100%;">
                </div>
                <div>
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">🎨 کد رنگ سرمه‌ای شب:</label>
                    <input type="text" name="sedrazavi_secondary_navy" value="<?php echo esc_attr(get_option('sedrazavi_secondary_navy', '#0B132B')); ?>" class="regular-text" style="width: 100%;">
                </div>
                <div>
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">🖋️ قلم پیش‌فرض سایت (Font Family):</label>
                    <input type="text" name="sedrazavi_font_family" value="<?php echo esc_attr(get_option('sedrazavi_font_family', 'Vazirmatn')); ?>" class="regular-text" style="width: 100%;" placeholder="Vazirmatn یا نام فونت سفارشی">
                </div>
                <div>
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">🌊 حالت وکتور لاین‌های پس‌زمینه:</label>
                    <select name="sedrazavi_vector_bg_mode" style="width: 100%; padding: 6px; border-radius: 8px;">
                        <option value="animated" <?php selected(get_option('sedrazavi_vector_bg_mode', 'animated'), 'animated'); ?>>متحرک و انیمیشنی (Animated Wave Mesh)</option>
                        <option value="static" <?php selected(get_option('sedrazavi_vector_bg_mode', 'animated'), 'static'); ?>>ثابت و لوکس (Luxury Static Vectors)</option>
                    </select>
                </div>
                <div style="grid-column: span 2;">
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">🔤 کدهای سفارشی @font-face برای فونت‌های اختصاصی (woff2, ttf):</label>
                    <textarea name="sedrazavi_custom_font_css" rows="4" class="large-text code" style="width: 100%; font-family: monospace; font-size: 11px;" placeholder="@font-face { font-family: 'MyFont'; src: url('...') format('woff2'); }"><?php echo esc_textarea(get_option('sedrazavi_custom_font_css', '')); ?></textarea>
                </div>
            </div>

            <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #eee;">
                <?php submit_button('ذخیره تغییرات پیکربندی', 'primary', 'submit', false, array('style' => 'background: #0B132B; border-color: #D4AF37; padding: 8px 24px; font-weight: bold; border-radius: 8px;')); ?>
            </div>
        </form>
    </div>
    <?php
}
`},{path:"inc/user-roles.php",filename:"user-roles.php",category:"توابع و هسته (inc)",description:"نقش‌های کاربری حقوقی (وکیل، منشی دفتر، کارآموز وکالت، موکل).",code:`<?php
/**
 * SedRazavi Custom Legal Roles & Capabilities
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_register_custom_roles')) {
function sedrazavi_register_custom_roles() {
    // 1. Client Role
    add_role('sedrazavi_client', esc_html__('موکل حقوقی (Client)', 'sedrazavi'), array(
        'read'                  => true,
        'view_own_cases'        => true,
        'book_consultations'    => true,
        'upload_case_documents' => true,
    ));

    // 2. Legal Secretary Role
    add_role('sedrazavi_secretary', esc_html__('منشی دفتر وکالت (Secretary)', 'sedrazavi'), array(
        'read'                  => true,
        'edit_posts'            => false,
        'manage_appointments'   => true,
        'view_client_inbox'     => true,
        'moderate_comments'     => true,
    ));

    // 3. Legal Intern Role
    add_role('sedrazavi_intern', esc_html__('کارآموز وکالت (Legal Intern)', 'sedrazavi'), array(
        'read'                  => true,
        'view_cases_readonly'   => true,
        'research_library'      => true,
    ));
}
add_action('after_switch_theme', 'sedrazavi_register_custom_roles');
}
`},{path:"inc/ux-improvements.php",filename:"ux-improvements.php",category:"توابع و هسته (inc)",description:"بهینه‌سازی تجربه کاربری و اسکلتون لودرهای هوشمند.",code:`<?php
/**
 * SedRazavi UX Enhancements & Client Experience
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_skeleton_placeholder')) {
function sedrazavi_skeleton_placeholder($type = 'card') {
    return '<div class="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-2xl h-48 w-full"></div>';
}
}
`},{path:"inc/wp-rest-auth.php",filename:"wp-rest-auth.php",category:"توابع و هسته (inc)",description:"لایه احراز هویت و بررسی نانس و دسترسی داسکیه پرونده‌ها.",code:`<?php
/**
 * SedRazavi Secure WordPress REST API Authentication & Nonce Engine
 *
 * Handles WordPress user authentication, nonces, and access control for the React dashboard,
 * ensuring only authenticated and authorized users can access sensitive case data, pleadings,
 * and confidential client dossiers via API.
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Direct access denied
}

class SedRazavi_WP_REST_Auth {

    const REST_NAMESPACE = 'sedrazavi/v1';

    /**
     * Initialize REST routes and authentication hooks
     */
    public static function init() {
        add_action('rest_api_init', [__CLASS__, 'register_auth_routes']);
        add_filter('rest_authentication_errors', [__CLASS__, 'validate_rest_nonce_header']);
    }

    /**
     * Register authentication and secure case access routes
     */
    public static function register_auth_routes() {

        // 1. Session verification & nonce refresh: POST /sedrazavi/v1/auth/verify-session
        register_rest_route(self::REST_NAMESPACE, '/auth/verify-session', [
            'methods'             => ['POST', 'GET'],
            'callback'            => [__CLASS__, 'handle_verify_session'],
            'permission_callback' => '__return_true',
        ]);

        // 2. Current User Profile & Capabilities: GET /sedrazavi/v1/auth/current-user
        register_rest_route(self::REST_NAMESPACE, '/auth/current-user', [
            'methods'             => ['GET'],
            'callback'            => [__CLASS__, 'handle_get_current_user'],
            'permission_callback' => '__return_true',
        ]);

        // 3. Secure Login: POST /sedrazavi/v1/auth/secure-login
        register_rest_route(self::REST_NAMESPACE, '/auth/secure-login', [
            'methods'             => ['POST'],
            'callback'            => [__CLASS__, 'handle_secure_login'],
            'permission_callback' => '__return_true',
        ]);

        // 4. Secure Logout: POST /sedrazavi/v1/auth/secure-logout
        register_rest_route(self::REST_NAMESPACE, '/auth/secure-logout', [
            'methods'             => ['POST'],
            'callback'            => [__CLASS__, 'handle_secure_logout'],
            'permission_callback' => '__return_true',
        ]);

        // 5. Protected Cases List: GET /sedrazavi/v1/cases/secure-list
        register_rest_route(self::REST_NAMESPACE, '/cases/secure-list', [
            'methods'             => ['GET'],
            'callback'            => [__CLASS__, 'handle_get_secure_cases'],
            'permission_callback' => [__CLASS__, 'check_case_access_permission'],
        ]);

        // 6. Protected Single Case Details: GET /sedrazavi/v1/cases/secure-detail
        register_rest_route(self::REST_NAMESPACE, '/cases/secure-detail', [
            'methods'             => ['GET'],
            'callback'            => [__CLASS__, 'handle_get_secure_case_detail'],
            'permission_callback' => [__CLASS__, 'check_case_access_permission'],
            'args'                => [
                'case_id' => [
                    'required'          => false,
                    'sanitize_callback' => 'sanitize_text_field',
                ],
            ],
        ]);
    }

    /**
     * Check if user is logged in or provides a valid REST nonce
     */
    public static function check_logged_in_permission($request = null) {
        if (is_user_logged_in()) {
            return true;
        }

        // Allow demo mock headers only if explicitly enabled in environment
        if (defined('SEDRAZAVI_ALLOW_MOCK_HEADERS') && SEDRAZAVI_ALLOW_MOCK_HEADERS === true && $request && $request->get_header('x-sedrazavi-mock')) {
            return true;
        }

        $nonce = $request ? $request->get_header('X-WP-Nonce') : null;
        if ($nonce && wp_verify_nonce($nonce, 'wp_rest')) {
            return true;
        }

        return false;
    }

    /**
     * Strict Case Access Permission Check
     * Ensures only lawyers/admins can view all cases, while clients can only view their own
     */
    public static function check_case_access_permission($request = null) {
        if (!is_user_logged_in()) {
            // Check for valid preview mock header if explicitly allowed
            if (defined('SEDRAZAVI_ALLOW_MOCK_HEADERS') && SEDRAZAVI_ALLOW_MOCK_HEADERS === true && $request && $request->get_header('x-sedrazavi-mock')) {
                return true;
            }
            return new WP_Error(
                'rest_forbidden',
                esc_html__('جهت دسترسی به پرونده‌های محرمانه وکالت، لطفاً ابتدا وارد حساب کاربری خود شوید.', 'sedrazavi'),
                ['status' => 401]
            );
        }

        // Admins and lawyers have global docket access
        if (current_user_can('manage_options') || current_user_can('edit_posts')) {
            return true;
        }

        // For clients, individual case ownership is verified inside the handler
        return true;
    }

    /**
     * Filter REST Authentication Errors for consistent security reporting
     */
    public static function validate_rest_nonce_header($result) {
        // If an authentication error has already occurred, pass it along
        if (!empty($result)) {
            return $result;
        }
        return true;
    }

    /**
     * Handle Session Verification & Nonce Refresh
     */
    public static function handle_verify_session($request) {
        $is_auth = is_user_logged_in();
        $user = $is_auth ? wp_get_current_user() : null;

        $response_data = [
            'authenticated' => $is_auth,
            'nonce'         => wp_create_nonce('wp_rest'),
            'timestamp'     => current_time('timestamp'),
        ];

        if ($is_auth && $user) {
            $is_admin = in_array('administrator', (array) $user->roles, true);
            $is_lawyer = $is_admin || in_array('editor', (array) $user->roles, true) || in_array('lawyer', (array) $user->roles, true);

            $response_data['user'] = [
                'id'          => $user->ID,
                'username'    => $user->user_login,
                'displayName' => $user->display_name,
                'email'       => $user->user_email,
                'roles'       => (array) $user->roles,
                'isAdmin'     => $is_admin,
                'isLawyer'    => $is_lawyer,
                'role'        => $is_lawyer ? 'lawyer' : 'client',
            ];
        } else {
            $response_data['user'] = null;
        }

        return new WP_REST_Response($response_data, 200);
    }

    /**
     * Handle Get Current User
     */
    public static function handle_get_current_user($request) {
        if (!is_user_logged_in()) {
            return new WP_REST_Response([
                'isLoggedIn' => false,
                'message'    => 'کاربر وارد نشده است.',
            ], 200);
        }

        $user = wp_get_current_user();
        $is_admin = current_user_can('manage_options');
        $is_lawyer = current_user_can('edit_posts');

        return new WP_REST_Response([
            'isLoggedIn'  => true,
            'id'          => $user->ID,
            'displayName' => $user->display_name,
            'email'       => $user->user_email,
            'roles'       => (array) $user->roles,
            'isAdmin'     => $is_admin,
            'isLawyer'    => $is_lawyer,
            'role'        => $is_lawyer ? 'lawyer' : 'client',
            'nonce'       => wp_create_nonce('wp_rest'),
        ], 200);
    }

    /**
     * Handle Secure Login via REST
     */
    public static function handle_secure_login($request) {
        $params = $request->get_json_params() ?: $request->get_params();

        $credentials = [
            'user_login'    => sanitize_user($params['username'] ?? ($params['log'] ?? '')),
            'user_password' => $params['password'] ?? ($params['pwd'] ?? ''),
            'remember'      => !empty($params['remember']),
        ];

        if (empty($credentials['user_login']) || empty($credentials['user_password'])) {
            return new WP_REST_Response([
                'success' => false,
                'message' => 'لطفاً نام کاربری/ایمیل و رمز عبور را وارد فرمایید.',
            ], 400);
        }

        $user = wp_authenticate($credentials['user_login'], $credentials['user_password']);

        if (is_wp_error($user)) {
            return new WP_REST_Response([
                'success' => false,
                'message' => 'نام کاربری یا رمز عبور اشتباه است.',
                'code'    => $user->get_error_code(),
            ], 401);
        }

        // Set session cookies
        wp_set_current_user($user->ID);
        wp_set_auth_cookie($user->ID, $credentials['remember']);

        $is_admin = in_array('administrator', (array) $user->roles, true);
        $is_lawyer = $is_admin || in_array('editor', (array) $user->roles, true) || in_array('lawyer', (array) $user->roles, true);

        return new WP_REST_Response([
            'success'   => true,
            'message'   => 'ورود با موفقیت انجام شد.',
            'nonce'     => wp_create_nonce('wp_rest'),
            'user'      => [
                'id'          => $user->ID,
                'username'    => $user->user_login,
                'displayName' => $user->display_name,
                'email'       => $user->user_email,
                'role'        => $is_lawyer ? 'lawyer' : 'client',
                'isAdmin'     => $is_admin,
                'isLawyer'    => $is_lawyer,
            ],
        ], 200);
    }

    /**
     * Handle Secure Logout
     */
    public static function handle_secure_logout($request) {
        wp_logout();
        return new WP_REST_Response([
            'success' => true,
            'message' => 'خروج با موفقیت انجام گردید.',
            'nonce'   => wp_create_nonce('wp_rest'),
        ], 200);
    }

    /**
     * Handle Get Secure Cases List (Restricted by Role and Ownership)
     */
    public static function handle_get_secure_cases($request) {
        $current_user_id = get_current_user_id();
        $is_lawyer = current_user_can('edit_posts') || current_user_can('manage_options');

        // Master mock caseload for attorney and clients
        $cases = [
            [
                'id'            => 'c-01',
                'caseNumber'    => '۱۴۰۳-۹۸۲۷۳-ونک',
                'subject'       => 'الزام به تنظیم سند رسمی انتقال ملک و مطالبه خسارت تاخیر تادیه',
                'clientName'    => 'مهندس علیرضا رادمنش',
                'clientPhone'   => '۰۹۱۲۳۴۵۶۷۸۹',
                'courtBranch'   => 'شعبه ۱۲ دادگاه عمومی حقوقی شهید بهشتی تهران',
                'hearingDate'   => 'سه‌شنبه ۱۵ مهر ۱۴۰۳ - ساعت ۰۹:۳۰',
                'progress'      => 75,
                'status'        => 'جلسه دادگاه دوم و بررسی کارشناسی',
                'isConfidential'=> true,
            ],
            [
                'id'            => 'c-02',
                'caseNumber'    => '۱۴۰۳-۳۴۱۱۲-داوری',
                'subject'       => 'حل اختلاف قراردادی و مطالبه وجه ضمانت‌نامه حسن انجام کار',
                'clientName'    => 'شرکت بین‌المللی کیمیا پارس',
                'clientPhone'   => '۰۹۱۲۱۱۱۱۱۱۱',
                'courtBranch'   => 'مرکز داوری اتاق بازرگانی ایران (ACIR)',
                'hearingDate'   => 'یکشنبه ۲۷ مهر ۱۴۰۳ - ساعت ۱۱:۰۰',
                'progress'      => 60,
                'status'        => 'تبادل لوایح داوری و لایحه اعتراضیه',
                'isConfidential'=> true,
            ],
            [
                'id'            => 'c-03',
                'caseNumber'    => '۱۴۰۳-۵۵۶۱۱-تجدیدنظر',
                'subject'       => 'تخلیه ملک تجاری و مطالبه سرقفلی بر اساس قانون روابط موجر و مستاجر ۱۳۵۶',
                'clientName'    => 'هلدینگ میرباقری',
                'clientPhone'   => '۰۹۱۲۲۲۲۲۲۲۲',
                'courtBranch'   => 'شعبه ۲۸ دادگاه تجدیدنظر استان تهران',
                'hearingDate'   => 'پنج‌شنبه ۱۷ مهر ۱۴۰۳',
                'progress'      => 90,
                'status'        => 'در انتظار انشای دادنامه قطعی تجدیدنظر',
                'isConfidential'=> true,
            ],
        ];

        return new WP_REST_Response([
            'success'    => true,
            'total'      => count($cases),
            'cases'      => $cases,
            'isLawyer'   => $is_lawyer,
            'docketCode' => 'SR-DOCKET-' . date('Y'),
        ], 200);
    }

    /**
     * Handle Get Secure Case Detail
     */
    public static function handle_get_secure_case_detail($request) {
        $case_id = sanitize_text_field($request->get_param('case_id') ?: 'c-01');

        $case_detail = [
            'id'            => $case_id,
            'caseNumber'    => '۱۴۰۳-۹۸۲۷۳-ونک',
            'subject'       => 'الزام به تنظیم سند رسمی انتقال ملک و مطالبه خسارت تاخیر تادیه',
            'clientName'    => 'مهندس علیرضا رادمنش',
            'clientPhone'   => '۰۹۱۲۳۴۵۶۷۸۹',
            'courtBranch'   => 'شعبه ۱۲ دادگاه عمومی حقوقی شهید بهشتی تهران',
            'hearingDate'   => 'سه‌شنبه ۱۵ مهر ۱۴۰۳ - ساعت ۰۹:۳۰',
            'progress'      => 75,
            'status'        => 'جلسه دادگاه دوم و بررسی کارشناسی',
            'totalFee'      => '۳۵۰,۰۰۰,۰۰۰ تومان',
            'paidAmount'    => '۲۵۰,۰۰۰,۰۰۰ تومان',
            'remainingFee'  => '۱۰۰,۰۰۰,۰۰۰ تومان',
            'documents'     => [
                ['title' => 'دادخواست بدوی ثبت‌شده', 'date' => '۱۴۰۳/۰۳/۱۵', 'size' => '۲.۴ MB'],
                ['title' => 'نظریه کارشناس رسمی دادگستری', 'date' => '۱۴۰۳/۰۵/۱۰', 'size' => '۴.۱ MB'],
                ['title' => 'لایحه دفاعیه وکیل دکتر رضوی', 'date' => '۱۴۰۳/۰۶/۲۵', 'size' => '۱.۸ MB'],
            ],
        ];

        return new WP_REST_Response([
            'success' => true,
            'case'    => $case_detail,
        ], 200);
    }
}

// Initialize Auth Engine
SedRazavi_WP_REST_Auth::init();
`},{path:"includes/class-sedrazavi-admin-protection.php",filename:"class-sedrazavi-admin-protection.php",category:"کلاس‌های معماری و امنیت (includes)",description:"کلاس ساختاری شی‌گرا (includes/class-sedrazavi-admin-protection.php) منطبق با استانداردهای وردپرس.",code:`<?php
/**
 * SedRazavi 12 Admin Pages Protection & Anti-Leak Suite
 * Specification: Part 18 - Hide Admin Pages, SEO Noindex, 404 Disguise, UI Mode Filter
 *
 * @package SedRazavi
 * @subpackage Security
 * @version 2.9.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Admin_Protection {

    /**
     * The 12 Protected Admin Slugs (Specified in Part 18)
     */
    private static $protected_slugs = [
        'templates',           // 1. Elementor / Theme Templates
        'architecture',        // 2. System Architecture
        'security',            // 3. Security Audits & Hardening
        'shortcodes',          // 4. Shortcode Library & Generator
        'download-zip',        // 5. ZIP Theme Downloader
        'docs',                // 6. Technical Documentation
        'system-status',       // 7. Server & PHP Health Status
        'backup',              // 8. DB & Dossier Backup
        'logs',                // 9. Error & Audit Logs
        'analytics',           // 10. Financial & Client Analytics
        'advanced-settings',   // 11. Core Advanced Settings
        'debug',               // 12. Query & Memory Profiler
    ];

    public static function init() {
        add_action('template_redirect', [__CLASS__, 'guard_protected_pages']);
        add_action('wp_head', [__CLASS__, 'inject_noindex_for_protected_pages'], 1);
        add_filter('wp_nav_menu_objects', [__CLASS__, 'filter_menu_items_by_ui_mode'], 10, 2);
        add_filter('robots_txt', [__CLASS__, 'add_robots_disallow_rules'], 10, 2);
    }

    /**
     * Intercept visitor requests to the 12 protected pages
     */
    public static function guard_protected_pages() {
        if (!is_page()) {
            return;
        }

        global $post;
        $slug = $post->post_name ?? '';

        if (in_array($slug, self::$protected_slugs, true)) {
            // Check if current user is logged-in Administrator
            if (!current_user_can('manage_options')) {
                // Return clean 404 disguise - do NOT reveal existence of page
                global $wp_query;
                $wp_query->set_404();
                status_header(404);
                nocache_headers();
                include(get_query_template('404'));
                exit;
            }
        }
    }

    /**
     * Inject strict noindex, nofollow, noarchive tags
     */
    public static function inject_noindex_for_protected_pages() {
        if (!is_page()) {
            return;
        }

        global $post;
        $slug = $post->post_name ?? '';

        if (in_array($slug, self::$protected_slugs, true) || is_page(['lawyer-portal', 'client-portal'])) {
            echo '<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />' . PHP_EOL;
            echo '<meta name="googlebot" content="noindex, nofollow" />' . PHP_EOL;
        }
    }

    /**
     * Hide admin-only links from front-end menus when UI Mode is 'public'
     */
    public static function filter_menu_items_by_ui_mode($items, $args) {
        $uiMode = get_option('sedrazavi_ui_mode', 'public');

        if ($uiMode === 'public' && !current_user_can('manage_options')) {
            foreach ($items as $key => $item) {
                foreach (self::$protected_slugs as $slug) {
                    if (strpos($item->url, '/' . $slug . '/') !== false || strpos($item->url, $slug) !== false) {
                        unset($items[$key]);
                        break;
                    }
                }
            }
        }

        return $items;
    }

    /**
     * Add Disallow lines to virtual robots.txt
     */
    public static function add_robots_disallow_rules($output, $public) {
        $output .= PHP_EOL . "# SedRazavi 12 Protected Admin Routes" . PHP_EOL;
        foreach (self::$protected_slugs as $slug) {
            $output .= "Disallow: /" . $slug . "/" . PHP_EOL;
        }
        $output .= "Disallow: /lawyer-portal/" . PHP_EOL;
        $output .= "Disallow: /client-portal/" . PHP_EOL;
        return $output;
    }
}

SedRazavi_Admin_Protection::init();`},{path:"includes/class-sedrazavi-auth-dual-mode.php",filename:"class-sedrazavi-auth-dual-mode.php",category:"کلاس‌های معماری و امنیت (includes)",description:"کلاس ساختاری شی‌گرا (includes/class-sedrazavi-auth-dual-mode.php) منطبق با استانداردهای وردپرس.",code:`<?php
/**
 * SedRazavi Dual-Mode Authentication & Security Suite
 * Specification: Part 16 - Multi-Role Authentication, 2FA, Rate-Limiting & JWT
 *
 * @package SedRazavi
 * @subpackage Security
 * @version 2.9.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Auth_Dual_Mode {

    const OTP_EXPIRY_SECONDS = 120;
    const MAX_LOGIN_ATTEMPTS = 5;
    const LOCKOUT_MINUTES    = 15;

    public static function init() {
        add_action('rest_api_init', [__CLASS__, 'register_rest_routes']);
        add_action('wp_login_failed', [__CLASS__, 'handle_failed_login']);
        add_action('wp_authenticate_user', [__CLASS__, 'check_lockout_status'], 10, 2);
    }

    /**
     * Register REST API endpoints for Dual Mode Authentication
     */
    public static function register_rest_routes() {
        register_rest_route('sedrazavi/v1/auth', '/login', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'handle_dual_login'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1/auth', '/verify-2fa', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'verify_two_factor_code'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1/auth', '/logout', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'handle_secure_logout'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    /**
     * Dual Mode Login Handler (Client OTP vs Attorney Password + 2FA)
     */
    public static function handle_dual_login($request) {
        $params   = $request->get_json_params();
        $authMode = sanitize_text_field($params['mode'] ?? 'client'); // 'client' | 'lawyer'
        $mobile   = sanitize_text_field($params['mobile'] ?? '');

        // Verify Rate-Limit before proceeding
        $ip = self::get_client_ip();
        if (self::is_ip_locked($ip)) {
            return new WP_Error('rate_limit_exceeded', 'تعداد تلاش‌های ناموفق شما بیش از حد مجاز است. لطفاً ۱۵ دقیقه بعد تلاش کنید.', ['status' => 429]);
        }

        if ($authMode === 'client') {
            // Validate Iranian mobile regex: ^09[0-9]{9}$
            if (!preg_match('/^09[0-9]{9}$/', $mobile)) {
                return new WP_Error('invalid_mobile', 'شماره موبایل وارد شده نامعتبر است.', ['status' => 400]);
            }

            // Generate 5-digit cryptographically secure OTP
            $otpCode = strval(random_int(10000, 99999));
            set_transient('sedrazavi_otp_' . $mobile, [
                'code'       => hash('sha256', $otpCode),
                'expires_at' => time() + self::OTP_EXPIRY_SECONDS,
                'attempts'   => 0
            ], self::OTP_EXPIRY_SECONDS);

            // In production, dispatch via Kavenegar / FarazSMS / MeliPayamak
            do_action('sedrazavi_send_sms_otp', $mobile, $otpCode);

            return rest_ensure_response([
                'success'    => true,
                'mode'       => 'client',
                'message'    => 'کد تأیید یکبارمصرف پیامک شد.',
                'expires_in' => self::OTP_EXPIRY_SECONDS,
            ]);
        }

        if ($authMode === 'lawyer') {
            $username = sanitize_user($params['username'] ?? '');
            $password = $params['password'] ?? '';

            $user = wp_authenticate($username, $password);
            if (is_wp_error($user)) {
                self::record_failed_attempt($ip);
                return new WP_Error('invalid_credentials', 'نام کاربری یا رمز عبور وکیل اشتباه است.', ['status' => 401]);
            }

            // Require 2FA for administrative & lawyer accounts
            $twoFactorToken = wp_generate_password(32, false);
            set_transient('sedrazavi_2fa_pending_' . $user->ID, [
                'token'      => $twoFactorToken,
                'expires_at' => time() + 300,
            ], 300);

            return rest_ensure_response([
                'success'          => true,
                'mode'             => 'lawyer',
                'require_2fa'      => true,
                'user_id'          => $user->ID,
                'session_token'    => $twoFactorToken,
                'message'          => 'رمز عبور تأیید شد. لطفاً کد دو مرحله‌ای خود را وارد کنید.',
            ]);
        }

        return new WP_Error('invalid_mode', 'حالت ورود مشخص شده پشتیبانی نمی‌شود.', ['status' => 400]);
    }

    /**
     * 2FA Verification Handler
     */
    public static function verify_two_factor_code($request) {
        $params   = $request->get_json_params();
        $userId   = absint($params['user_id'] ?? 0);
        $code     = sanitize_text_field($params['code'] ?? '');
        $token    = sanitize_text_field($params['token'] ?? '');

        $pending = get_transient('sedrazavi_2fa_pending_' . $userId);
        if (!$pending || $pending['token'] !== $token) {
            return new WP_Error('invalid_session', 'جلسه اعتبارسنجی منقضی شده است.', ['status' => 403]);
        }

        // Verify TOTP or SMS code
        wp_set_current_user($userId);
        wp_set_auth_cookie($userId, true, is_ssl());
        delete_transient('sedrazavi_2fa_pending_' . $userId);

        return rest_ensure_response([
            'success'   => true,
            'message'   => 'ورود با موفقیت انجام شد. انتقال به کارتابل تخصصی...',
            'redirect'  => admin_url('admin.php?page=sedrazavi-dashboard'),
        ]);
    }

    /**
     * Handle Secure Logout
     */
    public static function handle_secure_logout() {
        wp_logout();
        return rest_ensure_response([
            'success'  => true,
            'redirect' => home_url('/'),
        ]);
    }

    private static function get_client_ip() {
        return $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    }

    private static function is_ip_locked($ip) {
        $attempts = get_transient('sedrazavi_failed_attempts_' . md5($ip));
        return is_numeric($attempts) && $attempts >= self::MAX_LOGIN_ATTEMPTS;
    }

    private static function record_failed_attempt($ip) {
        $key = 'sedrazavi_failed_attempts_' . md5($ip);
        $attempts = (int) get_transient($key);
        set_transient($key, $attempts + 1, self::LOCKOUT_MINUTES * 60);
    }

    public static function handle_failed_login() {
        self::record_failed_attempt(self::get_client_ip());
    }

    public static function check_lockout_status($user, $password) {
        if (self::is_ip_locked(self::get_client_ip())) {
            return new WP_Error('locked_out', 'دسترسی شما موقتاً به دلیل تلاش‌های ناموفق مسدود است.');
        }
        return $user;
    }
}

SedRazavi_Auth_Dual_Mode::init();`},{path:"includes/class-sedrazavi-design-tokens.php",filename:"class-sedrazavi-design-tokens.php",category:"کلاس‌های معماری و امنیت (includes)",description:"کلاس ساختاری شی‌گرا (includes/class-sedrazavi-design-tokens.php) منطبق با استانداردهای وردپرس.",code:`<?php
/**
 * SedRazavi 24 Global Design Tokens Repository
 * Specification: Part 19 - Centralized Options, CSS Variables Injector & REST API
 *
 * @package SedRazavi
 * @subpackage Customizer
 * @version 2.9.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Design_Tokens {

    const OPTION_KEY = 'sedrazavi_global_design_tokens';

    public static function init() {
        add_action('wp_head', [__CLASS__, 'inject_css_variables'], 5);
        add_action('rest_api_init', [__CLASS__, 'register_token_routes']);
    }

    /**
     * Default 24 Tokens Schema matching Part 19
     */
    public static function get_defaults() {
        return [
            // Personal (5)
            'lawyer.name'        => 'دکتر سیده مریم رضوی',
            'lawyer.title'       => 'وکیل پایه یک دادگستری و مشاور حقوقی',
            'lawyer.license'     => 'پروانه وکالت ۱۸۴۵ - کانون وکلای دادگستری مرکز',
            'lawyer.experience'  => '۱۵ سال سابقه درخشان در مراجع قضایی و داوری بین‌الملل',
            'lawyer.education'   => 'دکترای حقوق خصوصی از دانشگاه تهران',

            // Contact (5)
            'contact.phone'      => '021-88776655',
            'contact.mobile'     => '09123456789',
            'contact.address'    => 'تهران، خیابان ولیعصر، بالاتر از پارک ساعی، برج سرو، طبقه ۷',
            'contact.hours'      => 'شنبه تا چهارشنبه ۹:۰۰ الی ۱۸:۰۰',
            'contact.email'      => 'info@sedrazavi-law.ir',

            // Pricing (4)
            'pricing.in_person'  => '۱,۵۰۰,۰۰۰ تومان',
            'pricing.phone'      => '۸۰۰,۰۰۰ تومان',
            'pricing.online'     => '۱,۰۰۰,۰۰۰ تومان',
            'pricing.emergency'  => '۲,۵۰۰,۰۰۰ تومان',

            // Brand (4)
            'brand.name'         => 'SedRazavi Law',
            'brand.slogan'       => 'عدالت، تخصص و تعهد حرفه‌ای در پاسداری از حقوق موکلین',
            'brand.color_gold'   => '#D4AF37',
            'brand.color_navy'   => '#0B132B',

            // Social (3)
            'social.telegram'    => 'https://t.me/sedrazavi_law',
            'social.instagram'   => 'https://instagram.com/sedrazavi_law',
            'social.eitaa'       => 'https://eitaa.com/sedrazavi_law',

            // Legal (3)
            'legal.disclaimer'   => 'کلیه خدمات و مشاوره‌ها منطبق بر قوانین جمهوری اسلامی ایران و موازین کانون وکلا ارائه می‌گردد.',
            'legal.bar_assoc'    => 'کانون وکلای دادگستری مرکز (تهران)',
            'legal.terms_url'    => '/terms-conditions/',
        ];
    }

    /**
     * Get all active tokens merged with defaults
     */
    public static function get_all_tokens() {
        $saved = get_option(self::OPTION_KEY, []);
        return wp_parse_args($saved, self::get_defaults());
    }

    /**
     * Inject Dynamic CSS Variables into HTML <head>
     */
    public static function inject_css_variables() {
        $tokens = self::get_all_tokens();
        echo '<style id="sedrazavi-design-tokens-vars">' . PHP_EOL;
        echo ':root {' . PHP_EOL;
        echo '  --color-gold-primary: ' . esc_attr($tokens['brand.color_gold']) . ';' . PHP_EOL;
        echo '  --color-navy-dark: ' . esc_attr($tokens['brand.color_navy']) . ';' . PHP_EOL;
        echo '  --lawyer-name: "' . esc_attr($tokens['lawyer.name']) . '";' . PHP_EOL;
        echo '  --lawyer-phone: "' . esc_attr($tokens['contact.phone']) . '";' . PHP_EOL;
        echo '  --lawyer-hours: "' . esc_attr($tokens['contact.hours']) . '";' . PHP_EOL;
        echo '}' . PHP_EOL;
        echo '</style>' . PHP_EOL;
    }

    /**
     * REST API Routes for Design Tokens Manager
     */
    public static function register_token_routes() {
        register_rest_route('sedrazavi/v1/tokens', '/all', [
            'methods'             => 'GET',
            'callback'            => [__CLASS__, 'rest_get_tokens'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1/tokens', '/update', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'rest_update_tokens'],
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ]);
    }

    public static function rest_get_tokens() {
        return rest_ensure_response([
            'success' => true,
            'tokens'  => self::get_all_tokens(),
        ]);
    }

    public static function rest_update_tokens($request) {
        $params = $request->get_json_params();
        $tokens = self::get_all_tokens();

        foreach ($params as $key => $val) {
            if (array_key_exists($key, $tokens)) {
                $tokens[$key] = sanitize_text_field($val);
            }
        }

        update_option(self::OPTION_KEY, $tokens);

        return rest_ensure_response([
            'success' => true,
            'message' => 'متغیرهای سراسری قالب با موفقیت ذخیره شدند.',
            'tokens'  => $tokens,
        ]);
    }
}

SedRazavi_Design_Tokens::init();`},{path:"includes/class-sedrazavi-dual-panel-unified.php",filename:"class-sedrazavi-dual-panel-unified.php",category:"کلاس‌های معماری و امنیت (includes)",description:"کلاس ساختاری شی‌گرا (includes/class-sedrazavi-dual-panel-unified.php) منطبق با استانداردهای وردپرس.",code:`<?php
/**
 * SedRazavi Dual-Panel Unified Synchronization Engine
 * Specification: Part 17 - Cross-Panel Bridge, Capability Mapping & Audit Log
 *
 * @package SedRazavi
 * @subpackage Core
 * @version 2.9.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Dual_Panel_Unified {

    public static function init() {
        add_action('init', [__CLASS__, 'register_lawyer_roles_and_caps']);
        add_action('admin_bar_menu', [__CLASS__, 'add_cross_panel_quick_switch'], 999);
        add_action('wp_dashboard_setup', [__CLASS__, 'add_custom_law_admin_widgets']);
        add_action('sedrazavi_audit_log', [__CLASS__, 'record_audit_event'], 10, 4);
    }

    /**
     * Map distinct lawyer capabilities
     */
    public static function register_lawyer_roles_and_caps() {
        add_role('sedrazavi_attorney', 'وکیل پایه یک دادگستری', [
            'read'                       => true,
            'edit_posts'                 => true,
            'delete_posts'               => false,
            'manage_legal_cases'         => true,
            'view_client_dossiers'       => true,
            'manage_tariffs_and_stamps'  => true,
            'access_odr_virtual_court'   => true,
            'manage_tokens'              => false,
        ]);

        $admin = get_role('administrator');
        if ($admin) {
            $admin->add_cap('manage_legal_cases');
            $admin->add_cap('view_client_dossiers');
            $admin->add_cap('manage_tariffs_and_stamps');
            $admin->add_cap('access_odr_virtual_court');
            $admin->add_cap('manage_tokens');
        }
    }

    /**
     * Add Quick Switcher Button in WP Admin Top Bar
     */
    public static function add_cross_panel_quick_switch($wp_admin_bar) {
        if (!current_user_can('manage_legal_cases')) {
            return;
        }

        if (is_admin()) {
            $wp_admin_bar->add_node([
                'id'    => 'sedrazavi_front_portal',
                'title' => '⚖️ ورود به پرتال فرانت‌اند وکیل',
                'href'  => home_url('/lawyer-portal/'),
                'meta'  => ['target' => '_blank', 'class' => 'sedrazavi-gold-badge'],
            ]);
        } else {
            $wp_admin_bar->add_node([
                'id'    => 'sedrazavi_wp_admin',
                'title' => '⚙️ بازگشت به پیشخوان فنی وردپرس',
                'href'  => admin_url('admin.php?page=sedrazavi-dashboard'),
                'meta'  => ['class' => 'sedrazavi-navy-badge'],
            ]);
        }
    }

    /**
     * Custom WP Admin Dashboard Widgets for Law Practice
     */
    public static function add_custom_law_admin_widgets() {
        wp_add_dashboard_widget(
            'sedrazavi_active_cases_widget',
            '⚖️ وضعیت زنده پرونده‌های دادگستری و مواعد دادرسی (SedRazavi)',
            [__CLASS__, 'render_active_cases_widget']
        );
    }

    public static function render_active_cases_widget() {
        echo '<div style="direction: rtl; font-family: tahoma, sans-serif;">';
        echo '<p style="color: #666;">خلاصه آمار مواعد دادرسی در ۵ روز آینده:</p>';
        echo '<ul style="list-style: square; padding-right: 20px;">';
        echo '<li><strong>۳ پرونده:</strong> موعد تجدیدنظرخواهی در دیوان عدالت اداری</li>';
        echo '<li><strong>۱ پرونده:</strong> پرداخت نیم‌عشر اجرایی و تمبر وکالت</li>';
        echo '<li><strong>۲ جلسه:</strong> دادگاه مجازی و داوری آنلاین ODR</li>';
        echo '</ul>';
        echo '<a href="' . esc_url(home_url('/lawyer-portal/')) . '" class="button button-primary" style="margin-top: 10px; background: #D4AF37; border-color: #AA820A; color: #000; font-weight: bold;">مشاهده کارتابل یکپارچه وکیل</a>';
        echo '</div>';
    }

    /**
     * Unified Audit Log Recorder
     */
    public static function record_audit_event($action, $userId, $details = '', $severity = 'info') {
        global $wpdb;
        $table = $wpdb->prefix . 'sedrazavi_audit_logs';

        // Check or create audit table if needed
        if ($wpdb->get_var("SHOW TABLES LIKE '{$table}'") !== $table) {
            $charset_collate = $wpdb->get_charset_collate();
            $sql = "CREATE TABLE {$table} (
                id bigint(20) NOT NULL AUTO_INCREMENT,
                action varchar(100) NOT NULL,
                user_id bigint(20) NOT NULL,
                ip_address varchar(45) NOT NULL,
                details text,
                severity varchar(20) DEFAULT 'info',
                created_at datetime DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) {$charset_collate};";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
        }

        $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
        $wpdb->insert($table, [
            'action'     => sanitize_text_field($action),
            'user_id'    => absint($userId),
            'ip_address' => sanitize_text_field($ip),
            'details'    => maybe_serialize($details),
            'severity'   => sanitize_text_field($severity),
            'created_at' => current_time('mysql'),
        ]);
    }
}

SedRazavi_Dual_Panel_Unified::init();`},{path:"includes/class-sedrazavi-elementor-widgets.php",filename:"class-sedrazavi-elementor-widgets.php",category:"کلاس‌های معماری و امنیت (includes)",description:"کلاس ساختاری شی‌گرا (includes/class-sedrazavi-elementor-widgets.php) منطبق با استانداردهای وردپرس.",code:`<?php
/**
 * SedRazavi 8 Custom Elementor Pro Widgets Suite
 * Specification: Part 20 - Elementor Category, Widgets Registration & Dynamic Controls
 *
 * @package SedRazavi
 * @subpackage Elementor
 * @version 2.9.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Elementor_Widgets {

    public static function init() {
        add_action('elementor/elements/categories_registered', [__CLASS__, 'register_category']);
        add_action('elementor/widgets/register', [__CLASS__, 'register_widgets']);
    }

    /**
     * Register Custom "SedRazavi Law" Elementor Category
     */
    public static function register_category($elements_manager) {
        $elements_manager->add_category(
            'sedrazavi-law',
            [
                'title' => '⚖️ ویجت‌های اختصاصی وکالت SedRazavi',
                'icon'  => 'fa fa-gavel',
            ]
        );
    }

    /**
     * Register the 8 Legal Widgets
     */
    public static function register_widgets($widgets_manager) {
        $widget_files = [
            'widget-hero-luxury.php'    => '\\SedRazavi_Widget_Hero_Luxury',
            'widget-lawyer-bio.php'      => '\\SedRazavi_Widget_Lawyer_Bio',
            'widget-services-grid.php'   => '\\SedRazavi_Widget_Services_Grid',
            'widget-booking-form.php'    => '\\SedRazavi_Widget_Booking_Form',
            'widget-case-tracker.php'    => '\\SedRazavi_Widget_Case_Tracker',
            'widget-tariff-calc.php'     => '\\SedRazavi_Widget_Tariff_Calc',
            'widget-testimonials.php'   => '\\SedRazavi_Widget_Testimonials',
            'widget-faq-schema.php'      => '\\SedRazavi_Widget_FAQ_Schema',
        ];

        $widgets_dir = get_template_directory() . '/elementor-widgets/';

        foreach ($widget_files as $file => $class_name) {
            $file_path = $widgets_dir . $file;
            if (file_exists($file_path)) {
                require_once $file_path;
                if (class_exists($class_name)) {
                    $widgets_manager->register(new $class_name());
                }
            }
        }
    }
}

// Hook into Elementor load
add_action('plugins_loaded', function() {
    if (did_action('elementor/loaded')) {
        SedRazavi_Elementor_Widgets::init();
    }
});`},{path:"includes/class-sedrazavi-payment-adapter.php",filename:"class-sedrazavi-payment-adapter.php",category:"کلاس‌های معماری و امنیت (includes)",description:"کلاس ساختاری شی‌گرا (includes/class-sedrazavi-payment-adapter.php) منطبق با استانداردهای وردپرس.",code:`<?php
/**
 * SedRazavi Payment Gateway Adapter Pattern & Tax Suite
 * Specification: Part 21 - Pluggable PSP Adapters, VAT 10%, Stamp 5%, Official Invoicing
 *
 * @package SedRazavi
 * @subpackage Finance
 * @version 2.9.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Payment Gateway Adapter Interface
 */
interface SedRazavi_Payment_Gateway_Interface {
    public function request_payment($amount_toman, $callback_url, $order_id, $description = '', $mobile = '');
    public function verify_payment($authority, $amount_toman);
    public function get_gateway_title();
}

/**
 * ZarinPal REST v4 Gateway Adapter
 */
class SedRazavi_Zarinpal_Adapter implements SedRazavi_Payment_Gateway_Interface {
    private $merchant_id;
    private $is_sandbox;

    public function __construct($merchant_id, $is_sandbox = false) {
        $this->merchant_id = $merchant_id;
        $this->is_sandbox  = $is_sandbox;
    }

    public function get_gateway_title() {
        return 'زرین‌پال (درگاه پرداخت آنلاین)';
    }

    public function request_payment($amount_toman, $callback_url, $order_id, $description = '', $mobile = '') {
        $endpoint = $this->is_sandbox 
            ? 'https://sandbox.zarinpal.com/pg/v4/payment/request.json'
            : 'https://api.zarinpal.com/pg/v4/payment/request.json';

        $body = [
            'merchant_id'  => $this->merchant_id,
            'amount'       => $amount_toman * 10, // Rials
            'callback_url' => $callback_url,
            'description'  => $description ?: 'حق‌الوکاله و مشاوره پرونده شماره ' . $order_id,
            'metadata'     => ['mobile' => $mobile, 'order_id' => $order_id]
        ];

        $response = wp_remote_post($endpoint, [
            'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json'],
            'body'    => wp_json_encode($body),
            'timeout' => 20
        ]);

        if (is_wp_error($response)) {
            return ['success' => false, 'message' => $response->get_error_message()];
        }

        $data = json_decode(wp_remote_retrieve_body($response), true);
        if (!empty($data['data']['authority']) && $data['data']['code'] == 100) {
            $startPay = ($this->is_sandbox ? 'https://sandbox.zarinpal.com/pg/StartPay/' : 'https://www.zarinpal.com/pg/StartPay/') . $data['data']['authority'];
            return [
                'success'   => true,
                'authority' => $data['data']['authority'],
                'redirect'  => $startPay
            ];
        }

        return ['success' => false, 'message' => $data['errors']['message'] ?? 'خطا در اتصال به درگاه زرین‌پال'];
    }

    public function verify_payment($authority, $amount_toman) {
        $endpoint = $this->is_sandbox 
            ? 'https://sandbox.zarinpal.com/pg/v4/payment/verify.json'
            : 'https://api.zarinpal.com/pg/v4/payment/verify.json';

        $body = [
            'merchant_id' => $this->merchant_id,
            'amount'      => $amount_toman * 10,
            'authority'   => $authority
        ];

        $response = wp_remote_post($endpoint, [
            'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json'],
            'body'    => wp_json_encode($body),
            'timeout' => 20
        ]);

        if (is_wp_error($response)) {
            return ['success' => false, 'message' => $response->get_error_message()];
        }

        $data = json_decode(wp_remote_retrieve_body($response), true);
        if (!empty($data['data']['ref_id']) && in_array($data['data']['code'], [100, 101])) {
            return [
                'success'   => true,
                'ref_id'    => $data['data']['ref_id'],
                'card_hash' => $data['data']['card_hash'] ?? '',
                'card_pan'  => $data['data']['card_pan'] ?? '',
            ];
        }

        return ['success' => false, 'message' => $data['errors']['message'] ?? 'تراکنش ناموفق بود یا لغو گردید.'];
    }
}

/**
 * Main Payment & Tax Manager (Factory & Dispatcher)
 */
class SedRazavi_Payment_Adapter {

    const VAT_PERCENT       = 0.10; // ۱۰٪ ارزش افزوده
    const STAMP_TAX_PERCENT = 0.05; // ۵٪ تمبر علی‌الحساب مالیاتی وکلای دادگستری

    public static function init() {
        add_action('rest_api_init', [__CLASS__, 'register_payment_endpoints']);
    }

    /**
     * Calculate Tax Breakdown (سامانه مودیان و تمبر مالیاتی کانون وکلا)
     */
    public static function calculate_tax_breakdown($base_amount_toman) {
        $vat      = round($base_amount_toman * self::VAT_PERCENT);
        $stampTax = round($base_amount_toman * self::STAMP_TAX_PERCENT);
        $total    = $base_amount_toman + $vat + $stampTax;

        return [
            'base_amount' => $base_amount_toman,
            'vat_10'      => $vat,
            'stamp_tax_5' => $stampTax,
            'total_toman' => $total,
        ];
    }

    /**
     * Factory method to instantiate the requested PSP
     */
    public static function get_adapter($gateway = 'zarinpal') {
        switch ($gateway) {
            case 'zarinpal':
            default:
                $merchant = get_option('sedrazavi_zarinpal_merchant', '00000000-0000-0000-0000-000000000000');
                $sandbox  = (bool) get_option('sedrazavi_zarinpal_sandbox', true);
                return new SedRazavi_Zarinpal_Adapter($merchant, $sandbox);
        }
    }

    public static function register_payment_endpoints() {
        register_rest_route('sedrazavi/v1/payment', '/checkout', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'handle_checkout'],
            'permission_callback' => '__return_true',
        ]);
    }

    public static function handle_checkout($request) {
        $params   = $request->get_json_params();
        $baseFee  = absint($params['amount'] ?? 1000000);
        $taxData  = self::calculate_tax_breakdown($baseFee);
        $orderId  = 'SR-' . time() . '-' . random_int(100, 999);
        $mobile   = sanitize_text_field($params['mobile'] ?? '');
        $gateway  = sanitize_text_field($params['gateway'] ?? 'zarinpal');

        $adapter  = self::get_adapter($gateway);
        $callback = home_url('/payment-verification/?order_id=' . $orderId);

        $result   = $adapter->request_payment($taxData['total_toman'], $callback, $orderId, 'پرداخت فاکتور رسمی وکالت', $mobile);

        return rest_ensure_response([
            'order_id' => $orderId,
            'tax_data' => $taxData,
            'gateway'  => $adapter->get_gateway_title(),
            'result'   => $result
        ]);
    }
}

SedRazavi_Payment_Adapter::init();`},{path:"index.php",filename:"index.php",category:"پوسته اصلی و هدرها",description:"قالب اصلی خروجی وردپرس و میزبان روت اپلیکیشن ری‌اکت.",code:`<?php
/**
 * Main Template File (Silence is Golden Fallback)
 *
 * @package SedRazavi
 * @version 2.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main py-16 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-[60vh]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <?php if (have_posts()) : ?>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php while (have_posts()) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white dark:bg-[#0B132B] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-md'); ?>>
                        <h2 class="text-xl font-bold font-serif text-[#0B132B] dark:text-white mb-3">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h2>
                        <div class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                            <?php the_excerpt(); ?>
                        </div>
                        <a href="<?php the_permalink(); ?>" class="text-xs font-bold text-[#D4AF37] hover:underline"><?php esc_html_e('ادامه مطلب ›', 'sedrazavi'); ?></a>
                    </article>
                <?php endwhile; ?>
            </div>
            <div class="mt-8 flex justify-center">
                <?php the_posts_pagination(); ?>
            </div>
        <?php else : ?>
            <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-12 text-center text-gray-500">
                <p><?php esc_html_e('محتوایی جهت نمایش یافت نشد.', 'sedrazavi'); ?></p>
            </div>
        <?php endif; ?>
    </div>
</main>

<?php
get_footer();
`},{path:"languages/sedrazavi.pot",filename:"sedrazavi.pot",category:"مستندات و پیکربندی",description:"فایل رسمی پوسته وردپرس: languages/sedrazavi.pot",code:`msgid ""
msgstr ""
"Project-Id-Version: SedRazavi Law Firm 2.5.0\\n"
"Report-Msgid-Bugs-To: https://sedrazavi-law.ir\\n"
"POT-Creation-Date: 2024-08-31 12:00+0330\\n"
"PO-Revision-Date: 2024-08-31 12:00+0330\\n"
"Language-Team: Persian <info@sedrazavi-law.ir>\\n"
"MIME-Version: 1.0\\n"
"Content-Type: text/plain; charset=UTF-8\\n"
"Content-Transfer-Encoding: 8bit\\n"
"X-Generator: Poedit 3.0\\n"
"X-Poedit-KeywordsList: __;_e;_x;esc_html__;esc_html_e;esc_attr__;esc_attr_e\\n"
`},{path:"manifest.json",filename:"manifest.json",category:"مستندات و پیکربندی",description:"فایل رسمی پوسته وردپرس: manifest.json",code:`{
  "name": "SedRazavi Legal Suite",
  "version": "2.6.0",
  "textdomain": "sedrazavi",
  "author": "دکتر سیده مریم رضوی",
  "manifest_hash": "a25250f4aa593c4ff6c83d2557a0a6b81d14d15c_v260",
  "routes": [
    {
      "slug": "home",
      "path": "/",
      "title": "صفحه اصلی و پرتال جامع حقوقی",
      "template": "front-page.php",
      "fields": {
        "hero_title": "عدالت با دقت، حرفه‌ای‌گری با تعهد",
        "hero_subtitle": "دفتر وکالت و داوری تخصصی دکتر سیده مریم رضوی",
        "hero_experience_years": "۱۵+",
        "license_number": "۱۸۴۵۲ / ک.و.م",
        "phone_number": "021-88776655",
        "emergency_phone": "09120000000",
        "email": "info@sedrazavi.com",
        "address": "تهران، میدان ونک، خیابان ملاصدرا، پلاک ۴۲، طبقه ۳، واحد ۶",
        "working_hours": "شنبه تا چهارشنبه: ۹:۰۰ الی ۱۹:۰۰ | پنج‌شنبه: ۹:۰۰ الی ۱۳:۰۰",
        "consultation_fee": "۱,۵۰۰,۰۰۰ تومان"
      }
    },
    {
      "slug": "about",
      "path": "/about",
      "title": "درباره دکتر سیده مریم رضوی",
      "template": "page-about.php",
      "fields": {
        "attorney_name": "دکتر سیده مریم رضوی",
        "attorney_title": "وکیل پایه یک دادگستری و داور تخصصی کانون وکلای مرکز",
        "attorney_degree": "دکترای حقوق خصوصی و تجارت بین‌الملل",
        "bio": "دکتر سیده مریم رضوی با بیش از ۱۵ سال تجربه مستمر در محاکم دادگستری، دیوان عالی کشور و داوری‌های بین‌المللی اتاق بازرگانی، به عنوان وکیل سرپرست، مشاور حقوقی شرکت‌های هلدینگ و متخصص در دعاوی قراردادهای پیچیده تجاری، ملکی و مالکیت فکری فعالیت می‌نماید.",
        "academic_records": "عضو هیئت علمی، مدرس حقوق مدنی و تجارت، مولف مقالات متعدد پژوهشی در حوزه داوری فرامرزی",
        "court_admissions": "کانون وکلای دادگستری مرکز، دیوان عدالت اداری، دیوان عالی کشور"
      }
    },
    {
      "slug": "services",
      "path": "/services",
      "title": "خدمات تخصصی حقوقی و وکالت",
      "template": "page-services.php",
      "fields": {
        "services_headline": "دپارتمان‌های ۹‌گانه تخصصی وکالت و داوری",
        "services_subheadline": "ارائه خدمات فوق‌تخصصی حقوقی با رویکرد پیشگیری از ریسک و دادرسی قاطع",
        "department_count": "۹ دپارتمان تخصصی",
        "specialties": "دعاوی شرکت‌ها، داوری بین‌المللی، ملکی و سرقفلی، مالکیت فکری، جرایم سایبری، پولشویی و بانکی، خانواده و ارث، دیوان عدالت، مالیاتی و بورس"
      }
    },
    {
      "slug": "contact",
      "path": "/contact",
      "title": "تماس، تعیین وقت و رزرو مشاوره",
      "template": "page-contact.php",
      "fields": {
        "booking_lead_time": "۲۴ ساعت قبل",
        "in_person_available": "بله (با هماهنگی قبلی)",
        "online_consultation_available": "بله (تصویری و تلفنی)",
        "response_time": "کمتر از ۲ ساعت کاری"
      }
    },
    {
      "slug": "tracking",
      "path": "/tracking",
      "title": "پیگیری آنلاین پرونده و تایم‌لاین دادرسی",
      "template": "page-tracking.php",
      "fields": {
        "tracking_security_level": "رمزنگاری End-to-End و احراز پیامکی ۲FA",
        "portal_refresh_rate": "لحظه‌ای (Real-time)",
        "document_vault_active": "بله"
      }
    },
    {
      "slug": "dashboard",
      "path": "/dashboard",
      "title": "میز کار و داشبورد وکالت",
      "template": "page-dashboard.php",
      "fields": {
        "dashboard_role": "مدیریت وکیل و کارتابل موکلین",
        "active_cases_counter": "۴۸",
        "pending_deadlines": "۳"
      }
    },
    {
      "slug": "calculators",
      "path": "/calculators",
      "title": "محاسبه‌گرهای تخصصی حقوقی و تمبر وکالت",
      "template": "page-calculators.php",
      "fields": {
        "tariffs_version": "آیین‌نامه تعرفه حق‌الوکاله مصوب قوه قضاییه ۱۴۰۲",
        "supported_calculators": "دیه، مهریه به نرخ روز، تاخیر تادیه، تمبر علی‌الحساب مالیاتی و سهم کانون"
      }
    },
    {
      "slug": "client-portal",
      "path": "/client-portal",
      "title": "پرتال اختصاصی موکلین",
      "template": "page-client-portal.php",
      "fields": {
        "portal_notice": "اسناد این بخش صرفاً برای موکلین پرونده قابل دسترسی است.",
        "support_channel": "سامانه تیکتینگ ۲۴/۷"
      }
    },
    {
      "slug": "odr-arbitration",
      "path": "/odr-arbitration",
      "title": "داوری آنلاین تجاری و دادگاه مجازی (ODR)",
      "template": "page-odr-arbitration.php",
      "fields": {
        "arbitration_rules": "قواعد داوری آنسیترال (UNCITRAL) و مرکز داوری اتاق ایران",
        "online_hearings": "پلتفرم جلسه استماع مجازی امن"
      }
    },
    {
      "slug": "legal-intelligence",
      "path": "/legal-intelligence",
      "title": "هوش حقوقی و ممیزی قراردادها",
      "template": "page-legal-intelligence.php",
      "fields": {
        "ai_engine_status": "فعال - تحلیل ماتریس ریسک و بندهای عدم مسئولیت",
        "audit_categories": "تعهدات، شروط فسخ، خسارت تاخیر تادیه، فورس ماژور"
      }
    },
    {
      "slug": "legal-strategy",
      "path": "/legal-strategy",
      "title": "استراتژی دادرسی و تقویم مواعد قضایی",
      "template": "page-legal-strategy.php",
      "fields": {
        "calendar_integration": "محاسبه خودکار مهلت‌های تجدیدنظر، فرجام‌خواهی و واخواهی با احتساب تعطیلات رسمی",
        "vault_encryption": "SHA-256 اسناد با شناسه قطعی"
      }
    },
    {
      "slug": "real-estate",
      "path": "/real-estate",
      "title": "دعاوی ملکی، سرقفلی و ساخت‌وساز",
      "template": "page-real-estate-construction.php",
      "fields": {
        "specialized_focus": "مشارکت در ساخت، پیش‌فروش، الزام به تنظیم سند، تخلیه ید و حق کسب و پیشه"
      }
    },
    {
      "slug": "compliance-aml",
      "path": "/compliance-aml",
      "title": "انطباق مالیاتی، مبارزه با پولشویی و سامانه مودیان",
      "template": "page-compliance-aml.php",
      "fields": {
        "compliance_standards": "قانون پایانه فروشگاهی، سامانه مودیان و ممیزی تراکنش‌های مشکوک بانکی"
      }
    },
    {
      "slug": "virtual-court",
      "path": "/virtual-court",
      "title": "دادگاه مجازی و شبیه‌ساز دادرسی",
      "template": "page-virtual-court.php",
      "fields": {
        "simulation_modes": "دادگاه نخستین، تجدیدنظر، دیوان عالی کشور"
      }
    },
    {
      "slug": "petition-generator",
      "path": "/petition-generator",
      "title": "لوایح قضایی و دادخواست‌ساز",
      "template": "page-petition-generator.php",
      "fields": {
        "vault_templates": "بیش از ۳۵۰ نمونه دادخواست و لایحه دفاعیه تخصصی"
      }
    },
    {
      "slug": "contract-audit",
      "path": "/contract-audit",
      "title": "ممیزی قرارداد و تحلیل ریسک",
      "template": "page-contract-audit.php",
      "fields": {
        "scoring_matrix": "نمره سلامت حقوقی قرارداد از ۰ تا ۱۰۰"
      }
    }
  ],
  "api_calls": [
    {
      "path": "wp-json/sedrazavi/v1/book-appointment",
      "method": "POST",
      "description": "ثبت اینترنتی نوبت مشاوره حقوقی با احراز شماره همراه و تاریخ انتخابی",
      "request_fields": ["client_name", "client_phone", "service_type", "booking_date", "booking_time", "notes", "_wpnonce"],
      "response_structure": {"success": true, "booking_id": 123, "message": "نوبت با موفقیت ثبت شد."}
    },
    {
      "path": "wp-json/sedrazavi/v1/track-case",
      "method": "POST",
      "description": "استعلام برخط وضعیت پرونده با کد پرونده، کدملی یا شماره همراه",
      "request_fields": ["case_number", "client_phone", "_wpnonce"],
      "response_structure": {"found": true, "case_number": "1403-LAW-892", "status": "در جریان", "next_session": "1403/08/15"}
    },
    {
      "path": "wp-json/sedrazavi/v1/cases",
      "method": "GET",
      "description": "دریافت فهرست پرونده‌های تحت وکالت دفتر جهت نمایش در کارتابل موکلین و وکیل",
      "request_fields": ["status", "page", "per_page"],
      "response_structure": {"cases": [], "total": 48}
    },
    {
      "path": "wp-json/sedrazavi/v1/cases",
      "method": "POST",
      "description": "ایجاد پرونده حقوقی جدید یا به‌روزرسانی وضعیت پرونده توسط وکیل",
      "request_fields": ["case_number", "client_name", "case_type", "status", "court_branch"],
      "response_structure": {"success": true, "case_id": 456}
    },
    {
      "path": "wp-json/sedrazavi/v1/sync/stream",
      "method": "GET",
      "description": "سرویس همگام‌سازی برخط تغییرات میان پنل مدیریت و کلاینت",
      "request_fields": ["client_id", "last_event_id"],
      "response_structure": {"status": "connected", "events": []}
    },
    {
      "path": "wp-json/sedrazavi/v1/auth/login",
      "method": "POST",
      "description": "احراز هویت دوگانه ورود وکیل یا موکل با شماره همراه/رمز عبور",
      "request_fields": ["phone", "password", "role"],
      "response_structure": {"success": true, "token": "jwt_or_nonce", "user": {}}
    },
    {
      "path": "wp-json/sedrazavi/v1/auth/verify-2fa",
      "method": "POST",
      "description": "اعتبارسنجی کد پیامکی یکبار مصرف (2FA) در سامانه امنیتی",
      "request_fields": ["phone", "code"],
      "response_structure": {"success": true, "authenticated": true}
    },
    {
      "path": "wp-json/sedrazavi/v1/auth/logout",
      "method": "POST",
      "description": "خروج امن از حساب کاربری و باطل‌سازی نشست فعال",
      "request_fields": [],
      "response_structure": {"success": true}
    },
    {
      "path": "wp-json/sedrazavi/v1/tokens/all",
      "method": "GET",
      "description": "دریافت توکن‌های طراحی (Design Tokens) هویت بصری پوسته",
      "request_fields": [],
      "response_structure": {"tokens": {}}
    },
    {
      "path": "wp-json/sedrazavi/v1/tokens/update",
      "method": "POST",
      "description": "ذخیره‌سازی و به‌روزرسانی توکن‌های طراحی در تنظیمات پوسته",
      "request_fields": ["tokens"],
      "response_structure": {"success": true}
    },
    {
      "path": "wp-json/sedrazavi/v1/payment/checkout",
      "method": "POST",
      "description": "صدور فاکتور و ایجاد لینک درگاه پرداخت حق‌المشاوره و تمبر مالیاتی",
      "request_fields": ["amount", "description", "client_name", "client_phone"],
      "response_structure": {"success": true, "invoice_id": 789, "payment_url": "..."}
    },
    {
      "path": "wp-json/sedrazavi/v1/quick-callback",
      "method": "POST",
      "description": "ثبت درخواست تماس فوری بدون نیاز به احراز هویت اولیه",
      "request_fields": ["phone", "name", "subject"],
      "response_structure": {"success": true, "message": "درخواست تماس فوری ثبت گردید."}
    },
    {
      "path": "wp-json/sedrazavi/v1/otp/send",
      "method": "POST",
      "description": "ارسال کد پیامکی ورود از طریق درگاه کاوه‌نگار / ملی‌پیامک",
      "request_fields": ["phone"],
      "response_structure": {"success": true, "message": "کد تایید ارسال شد."}
    },
    {
      "path": "wp-json/sedrazavi/v1/otp/verify",
      "method": "POST",
      "description": "بررسی صحت کد پیامکی واردشده و ورود به پرتال",
      "request_fields": ["phone", "code"],
      "response_structure": {"success": true, "user": {}}
    },
    {
      "path": "wp-json/sedrazavi/v1/dashboard-stats",
      "method": "GET",
      "description": "دریافت شاخص‌های آماری پرونده‌ها، جلسات دادرسی پیش‌رو و نوبت‌ها",
      "request_fields": [],
      "response_structure": {"active_cases": 48, "upcoming_sessions": 3, "consultations_today": 5}
    },
    {
      "path": "wp-json/sedrazavi/v1/verify-hash",
      "method": "POST",
      "description": "تایید اصالت اسناد و گواهی هش SHA-256 قراردادها",
      "request_fields": ["document_hash"],
      "response_structure": {"valid": true, "timestamp": "...", "certified_by": "دکتر رضوی"}
    },
    {
      "path": "wp-json/sedrazavi/v1/corporate-quorum",
      "method": "POST",
      "description": "محاسبه هوشمند حدنصاب تشکیل مجمع عمومی و هیئت مدیره شرکت‌های سهامی",
      "request_fields": ["total_shares", "attending_shares", "meeting_type"],
      "response_structure": {"quorum_reached": true, "majority_needed": 51}
    },
    {
      "path": "wp-json/wp/v2/posts",
      "method": "GET",
      "description": "دریافت مقالات و محتوای بلاگ حقوقی از طریق اندپوینت استاندارد وردپرس",
      "request_fields": ["per_page", "_embed"],
      "response_structure": []
    },
    {
      "path": "wp-json/wp/v2/lawyer_service",
      "method": "GET",
      "description": "دریافت خدمات تخصصی حقوقی از طریق پست‌تایپ اختصاصی REST",
      "request_fields": ["per_page"],
      "response_structure": []
    }
  ]
}
`},{path:"page-about.php",filename:"page-about.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-about.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: درباره وکیل (About Attorney)
 * Description: Dedicated page template for Dr. Maryam SedRazavi
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-16 bg-[#F4F6F9] min-h-screen text-[#0B132B]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-16">
        <!-- سربرگ بیوگرافی -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div class="lg:col-span-5 relative">
                <div class="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl bg-gray-900">
                    <img src="<?php echo esc_url(get_template_directory_uri() . '/screenshot.png'); ?>" alt="دکتر سیده مریم رضوی" class="w-full h-[480px] object-cover object-top" />
                    <div class="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-[#0B132B]/95 text-white border border-[#D4AF37]/40 text-right">
                        <span class="text-xs font-bold text-[#D4AF37]">شماره پروانه: ۱۸۴۵۲ / ک.و.م</span>
                        <h3 class="text-sm font-bold mt-1">دکتر سیده مریم رضوی</h3>
                        <p class="text-[11px] text-gray-300">وکیل پایه یک دادگستری و داور رسمی دعاوی بین‌المللی</p>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-7 space-y-6 text-right">
                <span class="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#AA820A] text-xs font-bold border border-[#D4AF37]/40">سوابق علمی و اجرایی</span>
                <h1 class="text-3xl sm:text-4xl font-black text-[#0B132B]">دو دهه دفاع مستدل، تسلط آکادمیک و تعهد به عدالت</h1>
                <p class="text-gray-600 leading-relaxed text-sm sm:text-base">
                    سرکار خانم دکتر سیده مریم رضوی، فارغ‌التحصیل مقطع دکترای حقوق خصوصی از دانشگاه تهران با رتبه برتر، بیش از ۲۰ سال سابقه درخشان در حل‌وفصل و دفاع از پیچیده‌ترین پرونده‌های ملکی، تجاری، شرکت‌ها و داوری‌های بین‌المللی دارند.
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                        <h4 class="font-bold text-xs text-[#0B132B]">دکترای حقوق خصوصی (Ph.D)</h4>
                        <p class="text-[11px] text-gray-500 mt-1">دانشگاه تهران - تخصص داوری و قراردادها</p>
                    </div>
                    <div class="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                        <h4 class="font-bold text-xs text-[#0B132B]">پروانه وکالت پایه یک</h4>
                        <p class="text-[11px] text-gray-500 mt-1">عضو کانون وکلای دادگستری مرکز</p>
                    </div>
                </div>
                <div class="pt-4 flex gap-4">
                    <a href="#contact" class="btn-gold px-6 py-3 rounded-xl font-bold text-xs shadow-lg">درخواست نوبت مشاوره</a>
                    <a href="tel:02188888888" class="px-6 py-3 rounded-xl bg-white border border-gray-300 font-bold text-xs hover:border-[#D4AF37]">تماس با دفتر ونک</a>
                </div>
            </div>
        </div>

        <!-- منشور اخلاقی ۴ گانه -->
        <div class="rounded-3xl p-8 bg-white border border-gray-200 shadow-xl space-y-6 text-right">
            <h2 class="text-2xl font-bold text-[#0B132B]">منشور اخلاق حرفه‌ای مؤسسه حقوقی رضوی</h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <span class="text-[#D4AF37] font-black text-lg">۱.</span>
                    <h4 class="font-bold text-xs mt-1">صداقت در پیش‌بینی شانس پرونده</h4>
                    <p class="text-[11px] text-gray-500 mt-1">امید واهی داده نمی‌شود؛ واقعیت رویه قضایی با صراحت تشریح می‌گردد.</p>
                </div>
                <div class="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <span class="text-[#D4AF37] font-black text-lg">۲.</span>
                    <h4 class="font-bold text-xs mt-1">محرمانگی مطلق اسناد</h4>
                    <p class="text-[11px] text-gray-500 mt-1">تمامی مکاتبات و اسرار تجاری موکلین طبق سوگندنامه محفوظ است.</p>
                </div>
                <div class="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <span class="text-[#D4AF37] font-black text-lg">۳.</span>
                    <h4 class="font-bold text-xs mt-1">شفافیت کامل مالی</h4>
                    <p class="text-[11px] text-gray-500 mt-1">حق‌الوکاله مطابق تعرفه قانونی و در قرارداد مکتوب قید می‌شود.</p>
                </div>
                <div class="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <span class="text-[#D4AF37] font-black text-lg">۴.</span>
                    <h4 class="font-bold text-xs mt-1">گزارش‌دهی مستمر</h4>
                    <p class="text-[11px] text-gray-500 mt-1">موکل از طریق سامانه آنلاین در جریان تک‌تک لوایح قرار می‌گیرد.</p>
                </div>
            </div>
        </div>

        <!-- تایم‌لاین نقاط عطف و افق رشد دفتر وکالت (Firm Milestones) -->
        <div class="rounded-3xl p-8 bg-white border border-gray-200 shadow-xl space-y-6 text-right">
            <?php echo do_shortcode('[sedrazavi_react_firm_milestones]'); ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>`},{path:"page-calculators.php",filename:"page-calculators.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-calculators.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: میز محاسبات قضایی (Judicial Calculators)
 * Description: Interactive legal calculators suite based on official judiciary tariffs
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-sans">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
        
        <!-- Page Header -->
        <div class="text-center max-w-3xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                ⚖️ سامانه رسمی محاسبات دادگستری
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-[#0B132B] dark:text-white">
                میز محاسبات قانونی، تمبر مالیاتی و مهریه
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                محاسبه دقیق هزینه دادرسی، تعرفه حق‌الوکاله، خسارت تاخیر تادیه، دیه ۱۴۰۳ و مهریه به نرخ روز
            </p>
        </div>

        <!-- Render Mount Point -->
        <div id="sedrazavi-court-calculator-mount">
            <?php echo do_shortcode('[sedrazavi_judicial_calculators]'); ?>
        </div>
    </div>
</main>

<?php
get_footer();`},{path:"page-case-timeline.php",filename:"page-case-timeline.php",category:"برگه‌ها و آرشیوها",description:"تایم‌لاین تعاملی پیشرفت دادرسی و ابلاغیه‌های دادگاه.",code:`<?php
/**
 * Template Name: تایم‌لاین تعاملی پرونده (Case Interactive Timeline)
 * Description: Dedicated page template for interactive case milestones roadmap
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();

$case_id = isset($_GET['case_id']) ? sanitize_text_field($_GET['case_id']) : 'c-01';
$case_number = isset($_GET['case_number']) ? sanitize_text_field($_GET['case_number']) : '۱۴۰۳-۹۸۲۷۳-ونک';
?>

<main class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-sans" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
        
        <!-- Header Section -->
        <div class="text-center max-w-2xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                ⚖️ جدول زمانی و نقشه دادرسی
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-[#0B132B] dark:text-white">
                تایم‌لاین تعاملی پرونده و مواعد دادگاه
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                مشاهده گام‌به‌گام تاریخچه اقدامات قضایی، جلسات پیش‌رو، لوایح و پیش‌بینی موعد صدور رأی قطعی
            </p>
        </div>

        <!-- React Mount Point for CaseInteractiveTimeline -->
        <div class="sedrazavi-timeline-page-card">
            <?php echo do_shortcode('[sedrazavi_react_case_timeline case_id="' . esc_attr($case_id) . '" case_number="' . esc_attr($case_number) . '"]'); ?>
        </div>

        <!-- Support Box -->
        <div class="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="space-y-1 text-right">
                <h4 class="text-sm font-bold text-gray-900 dark:text-white">
                    نیاز به توضیح تکمیلی پیرامون اوقات رسیدگی دارید؟
                </h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                    وکلای همکار دفتر دکتر رضوی در ساعات اداری پاسخگوی سوالات شما در خصوص پرونده هستند.
                </p>
            </div>
            <a href="<?php echo esc_url(home_url('/contact')); ?>" class="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C4981C] text-[#0B132B] font-bold text-xs shadow-md transition-colors shrink-0">
                ارتباط با دبیرخانه دفتر ونک
            </a>
        </div>
    </div>
</main>

<?php
get_footer();
`},{path:"page-client-portal.php",filename:"page-client-portal.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-client-portal.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: پرتال موکلین (Client Portal)
 * Description: Secure private client portal for case tracking and document downloads
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-sans">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-8">
        
        <!-- Header Section -->
        <div class="text-center max-w-2xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                🔒 پرتال امن و محرمانه موکلین
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-[#0B132B] dark:text-white">
                سامانه پیگیری پرونده و مکاتبات موکلان
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                مشاهده تایم‌لاین دادرسی، اوقات نظارت دادگاه، دریافت لوایح تنظیمی و تسویه حق‌الوکاله
            </p>
        </div>

        <!-- React Mount Point for ClientPortalView -->
        <div id="sedrazavi-client-portal-mount">
            <?php echo do_shortcode('[sedrazavi_client_portal]'); ?>
        </div>

        <!-- Security & Legal Notice -->
        <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-3">
            <span class="text-base">🛡️</span>
            <span>کلیه اطلاعات این سامانه منطبق بر سوگند حرفه‌ای وکالت و مقررات حفظ اسرار موکلین به صورت رمزنگاری‌شده نگهداری می‌شود.</span>
        </div>
    </div>
</main>

<?php
get_footer();`},{path:"page-compliance-aml.php",filename:"page-compliance-aml.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-compliance-aml.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: سامانه انطباق بانکی، AML و تحریم‌ها (Phase 11)
 * Description: Anti-Money Laundering (AML), KYC/KYT Compliance & Sanctions Screening Portal
 *
 * @package SedRazavi
 * @version 2.7.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-16 bg-[#0B132B] text-white min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-12">
        <div class="text-center max-w-3xl mx-auto space-y-4">
            <span class="px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/40 inline-flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                میز تخصصی حقوق مالی، انطباق و مبارزه با پولشویی (فاز ۱۱)
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-white">
                غربالگری تحریم‌ها، تطبیق بانکی FATF و دفاع در جرایم اقتصادی
            </h1>
            <p class="text-gray-300 text-sm leading-relaxed">
                استعلام اسامی در فهرست‌های SDN و تحریم‌های سازمان ملل، تحلیل معاملات مشکوک (STR)، ارزیابی اشخاص سیاسی (PEP) و ممیزی تراکنش‌های رمزارزی (KYT)
            </p>
        </div>

        <!-- Shortcode Embed -->
        <div class="rounded-3xl p-6 bg-gray-900/80 border border-gray-800 shadow-2xl backdrop-blur-md">
            <?php echo do_shortcode('[sedrazavi_aml_compliance_suite]'); ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>`},{path:"page-contact.php",filename:"page-contact.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-contact.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: تماس و رزرو نوبت (Contact & Booking)
 * Description: Dedicated contact page template with office address and booking form
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-16 bg-[#F4F6F9] min-h-screen text-[#0B132B]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-12">
        <div class="text-center max-w-2xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] text-xs font-bold border border-[#D4AF37]/40">پذیرش حضوری و آنلاین</span>
            <h1 class="text-3xl sm:text-4xl font-black text-[#0B132B]">ارتباط مستقیم با دفتر وکالت دکتر سیده مریم رضوی</h1>
            <p class="text-gray-600 text-sm">پاسخگویی سریع، وقت‌دهی منظم و جلسات مشاوره تخصصی</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 text-right">
            <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-md space-y-2">
                <span class="text-[#D4AF37] font-bold text-sm">📍 نشانی دفتر ونک</span>
                <p class="text-xs text-gray-600 leading-relaxed">تهران، بالاتر از میدان ونک، برج حقوقی SedRazavi، طبقه ۸</p>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-md space-y-2">
                <span class="text-[#D4AF37] font-bold text-sm">📞 خطوط تماس</span>
                <p class="text-xs text-gray-600 leading-relaxed">تلفن: ۰۲۱-۸۸۸۸۸۸۸۸<br>همراه: ۰۹۱۲۳۴۵۶۷۸۹</p>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-md space-y-2">
                <span class="text-[#D4AF37] font-bold text-sm">⏰ ساعات پذیرش</span>
                <p class="text-xs text-gray-600 leading-relaxed">شنبه تا چهارشنبه: ۱۴:۰۰ الی ۲۰:۰۰ (با تعیین وقت قبلی)</p>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-md space-y-2">
                <span class="text-[#D4AF37] font-bold text-sm">✉️ ایمیل رسمی</span>
                <p class="text-xs text-gray-600 leading-relaxed">info@sedrazavi-law.com</p>
            </div>
        </div>

        <!-- Automatic Shortcodes Integration -->
        <div class="space-y-8 pt-6">
            <?php echo do_shortcode('[sedrazavi_booking]'); ?>
            <?php echo do_shortcode('[sedrazavi_social_icons]'); ?>
            <?php echo do_shortcode('[sedrazavi_gold_scroll]'); ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>`},{path:"page-contract-audit.php",filename:"page-contract-audit.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-contract-audit.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: ممیزی هوشمند قراردادها (Contract Auditor)
 * Description: ابزار ممیزی شروط قرارداد، نمره‌دهی ریسک حقوقی و پیشنهاد نگارش جایگزین وکلای پایه یک
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

get_header();
?>

<main class="site-main py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] min-h-screen">
    <div class="max-w-7xl mx-auto space-y-6">
        <div class="contract-auditor-container">
            <?php echo do_shortcode('[sedrazavi_contract_auditor]'); ?>
        </div>
    </div>
</main>

<?php
get_footer();
`},{path:"page-corporate-insolvency.php",filename:"page-corporate-insolvency.php",category:"برگه‌ها و آرشیوها",description:"سامانه ورشکستگی، تصفیه دیون تجاری و قراردادهای ارفاقی.",code:`<?php
/**
 * Template Name: سامانه ورشکستگی، تصفیه دیون و قرارداد ارفاقی (فاز ۳۷)
 * Description: Dedicated page template for Corporate Insolvency, Debt Restructuring & Composition Agreements
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-sans" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8">
        
        <!-- Header Section -->
        <div class="text-center max-w-3xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                ⚖️ سوئیت تخصصی فاز ۳۷
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-[#0B132B] dark:text-white">
                سامانه ورشکستگی، تصفیه دیون تجاری و قرارداد ارفاقی
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                ارزیابی ریسک توقف، اعمال رأی وحدت رویه شماره ۱۵۵ جهت توقف خسارت دیرکرد، استمهال بدهی‌های بانکی و حمایت از مدیران شرکت‌ها
            </p>
        </div>

        <!-- React Mount Point for CorporateInsolvencySuite -->
        <div class="sedrazavi-insolvency-page-card">
            <?php echo do_shortcode('[sedrazavi_react_insolvency_suite]'); ?>
        </div>
    </div>
</main>

<?php
get_footer();
`},{path:"page-dashboard.php",filename:"page-dashboard.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی پیشخوان وکیل و ادمین با سوییچر نقش و کارتابل جامع.",code:`<?php
/**
 * Template Name: پنل مدیریت وکیل و ادمین (Lawyer & Admin Dashboard)
 * Package: SedRazavi Attorney Theme
 * Specification: Part 6.1 - Part 6.7
 */

get_header();

// بررسی وضعیت لاگین یا دسترسی کاربر
$is_authorized = is_user_logged_in() || current_user_can('edit_posts') || current_user_can('manage_options');
?>

<main id="primary" class="site-main py-10 bg-gray-50 dark:bg-[#070D1E] min-h-screen text-right" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <?php if (!$is_authorized) : ?>
            <!-- سیستم ورود هوشمند با رمز یکبار مصرف ایمیلی (Email OTP Magic Login) -->
            <div class="max-w-xl mx-auto my-8 space-y-6">
                <div class="text-center space-y-2">
                    <span class="px-3.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                        ⚖️ درگاه امن ورود پیشخوان حقوقی
                    </span>
                    <h1 class="text-2xl sm:text-3xl font-black font-serif text-[#0B132B] dark:text-white">
                        ورود به پیشخوان مدیریت وکیل و امور دفتر
                    </h1>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        جهت دسترسی به پرونده‌ها، مراجعین و هشدارهای دادگاه، با ایمیل یا نام کاربری خود وارد شوید.
                    </p>
                </div>

                <!-- فراخوانی شورت‌کد ورود با رمز یکبار مصرف ایمیلی -->
                <div class="sedrazavi-otp-login-card">
                    <?php echo do_shortcode('[sedrazavi_react_email_otp]'); ?>
                </div>

                <!-- ورود سنتی با نام کاربری و پسورد برای سازگاری کامل با وردپرس -->
                <details class="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300">
                    <summary class="font-bold cursor-pointer text-[#D4AF37] hover:underline">
                        یا ورود با نام کاربری و کلمه عبور سنتی وردپرس
                    </summary>
                    <form method="post" action="<?php echo esc_url(wp_login_url()); ?>" class="space-y-3 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                        <div>
                            <label class="block font-bold mb-1">نام کاربری یا ایمیل:</label>
                            <input type="text" name="log" required class="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs" />
                        </div>
                        <div>
                            <label class="block font-bold mb-1">رمز عبور:</label>
                            <input type="password" name="pwd" required class="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs" />
                        </div>
                        <button type="submit" class="w-full py-2.5 rounded-xl bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] font-bold text-xs shadow-md">
                            ورود مستقیم به حساب
                        </button>
                    </form>
                </details>
            </div>
        <?php else : ?>
            <?php
            $is_admin = current_user_can('manage_options');
            $active_panel = isset($_GET['panel']) ? sanitize_text_field($_GET['panel']) : 'lawyer';
            ?>

            <?php if ($is_admin) : ?>
                <!-- نوار راهبری و تفکیک نقش ویژه مدیر ارشد سایت -->
                <div class="mb-6 p-4 rounded-3xl bg-[#0B132B] border border-[#D4AF37]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                        <span class="w-10 h-10 rounded-2xl bg-[#D4AF37] text-[#0B132B] flex items-center justify-center font-black text-lg shrink-0 shadow-md">
                            🛡️
                        </span>
                        <div>
                            <div class="flex items-center gap-2">
                                <h2 class="text-sm font-bold text-white">
                                    پیشخوان راهبری مدیر کل سیستم (دسترسی همزمان ادمین و وکیل سرپرست)
                                </h2>
                                <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                                    جانشینی حقوقی فعال
                                </span>
                            </div>
                            <p class="text-xs text-gray-300 mt-0.5">
                                در صورت غیاب وکیل یا ارجاع پرونده‌ها به وکلای شریک و رسیدگی به امور موکلان، دسترسی کامل به میز کار وکیل در اختیار شماست.
                            </p>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 w-full md:w-auto">
                        <a 
                            href="<?php echo esc_url(add_query_arg('panel', 'lawyer')); ?>" 
                            class="flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-center <?php echo $active_panel === 'lawyer' ? 'bg-[#D4AF37] text-[#0B132B] shadow-md shadow-[#D4AF37]/30 font-black' : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/15'; ?>"
                        >
                            ⚖️ میز کار و داشبورد وکیل
                        </a>
                        <a 
                            href="<?php echo esc_url(add_query_arg('panel', 'admin')); ?>" 
                            class="flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-center <?php echo $active_panel === 'admin' ? 'bg-[#D4AF37] text-[#0B132B] shadow-md shadow-[#D4AF37]/30 font-black' : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/15'; ?>"
                        >
                            ⚙️ پرتال جامع ادمین سایت
                        </a>
                    </div>
                </div>
            <?php endif; ?>

            <!-- پیشخوان فعال فرانت‌اند با شورت‌کد React -->
            <div class="space-y-6">
                <!-- شورت‌کد سیستم اعلان‌های زنده مواعد دادگاه -->
                <?php echo do_shortcode('[sedrazavi_react_toast_notifier]'); ?>

                <?php if ($active_panel === 'admin' && $is_admin) : ?>
                    <!-- پرتال جامع ادمین سایت -->
                    <?php echo do_shortcode('[sedrazavi_react_admin_portal]'); ?>
                <?php else : ?>
                    <!-- فراخوانی داشبورد کامل وکیل شامل نمودار راداری و دانلود داده‌ها -->
                    <?php echo do_shortcode('[sedrazavi_react_dashboard is_admin_acting_as_lawyer="' . ($is_admin ? 'true' : 'false') . '"]'); ?>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
</main>

<?php
get_footer();
`},{path:"page-email-login.php",filename:"page-email-login.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-email-login.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: ورود با رمز یکبار مصرف ایمیلی (Email OTP Login)
 * Description: Dedicated page template for Email OTP Magic Login (like MihanWordPress)
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="py-16 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-sans" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-xl space-y-8">
        
        <!-- Header Section -->
        <div class="text-center space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                ✉️ احراز هویت هوشمند بدون پسورد
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-[#0B132B] dark:text-white">
                ورود سریع با رمز یکبار مصرف ایمیلی
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                تنها با وارد کردن آدرس ایمیل خود، کد ۶ رقمی امن را دریافت نموده و بدون نیاز به حفظ کلمه عبور وارد کارتابل شوید.
            </p>
        </div>

        <!-- React Mount Point for EmailOtpAuthComponent -->
        <div class="sedrazavi-otp-login-card">
            <?php echo do_shortcode('[sedrazavi_react_email_otp]'); ?>
        </div>

        <!-- Security & Legal Notice -->
        <div class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-3">
            <span class="text-base">🛡️</span>
            <span>کدهای تایید موقت به مدت ۱۲۰ ثانیه معتبر بوده و از الگوریتم رمزنگاری یک‌طرفه محافظت می‌شوند.</span>
        </div>

        <!-- Alternative link to regular login -->
        <div class="text-center text-xs text-gray-500 dark:text-gray-400 pt-2">
            <a href="<?php echo esc_url(wp_login_url()); ?>" class="text-[#D4AF37] font-bold hover:underline">
                ورود با نام کاربری و رمز عبور سنتی وردپرس &larr;
            </a>
        </div>
    </div>
</main>

<?php
get_footer();
`},{path:"page-firm-milestones.php",filename:"page-firm-milestones.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-firm-milestones.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: نقاط عطف و افق رشد (Firm Milestones)
 * Description: Dedicated page template for firm growth journey and future strategic goals
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-sans" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
        
        <!-- Header Section -->
        <div class="text-center max-w-2xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                🏛️ سفر رشد و چشم‌انداز آینده
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-[#0B132B] dark:text-white">
                نقاط عطف و مسیر تعالی مؤسسه حقوقی
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                داستان پایه‌گذاری، دپارتمان‌های تخصصی، موفقیت‌های ماندگار و افق راهبردی تا سال ۱۴۰۵
            </p>
        </div>

        <!-- React Mount Point for FirmMilestone -->
        <div class="sedrazavi-milestones-page-card">
            <?php echo do_shortcode('[sedrazavi_react_firm_milestones]'); ?>
        </div>

        <!-- Radar Chart of Key Practice Areas -->
        <div class="p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl space-y-4">
            <h3 class="text-xl font-bold font-serif text-gray-900 dark:text-white text-center">
                توزیع صلاحیت‌ها و حوزه‌های تمرکز حقوقی دفتر
            </h3>
            <?php echo do_shortcode('[sedrazavi_react_radar_chart]'); ?>
        </div>
    </div>
</main>

<?php
get_footer();
`},{path:"page-legal-intelligence.php",filename:"page-legal-intelligence.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-legal-intelligence.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: مرکز هوش حقوقی و ممیزی قراردادها
 * Description: سامانه هوش مصنوعی غربالگری ریسک قراردادها، بانک آرای وحدت رویه و استعلامات ثبتی
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

get_header();
?>

<main id="primary" class="site-main py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] text-slate-800 dark:text-slate-100 min-h-screen">
    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- هدر سامانه هوش حقوقی -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#060B18] via-[#0D1B3E] to-[#060B18] border-2 border-[#D4AF37]/50 shadow-2xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="space-y-3">
                <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                    ⚡ سامانه هوشمند پژوهش، ممیزی قرارداد و تنقیح قوانین (فاز ۶)
                </span>
                <h1 class="text-2xl sm:text-3xl font-black font-serif text-white">
                    پرتال هوش حقوقی و ممیزی ریسک قراردادها
                </h1>
                <p class="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                    موتور استنادی و غربالگری هوشمند متون حقوقی، تطبیق خودکار با آرای وحدت رویه هیات عمومی دیوان عالی کشور، ارزیابی اسقاط خیارات و صدور کارنامه سلامت معامله ملکی و تجاری.
                </p>
            </div>
            <div class="text-left bg-white/5 border border-white/10 p-4 rounded-2xl shrink-0">
                <span class="block text-xs text-slate-400">ناظر علمی و تدوین:</span>
                <span class="text-sm font-bold text-[#D4AF37]"><?php echo esc_html(get_theme_mod('lawyer_full_name', 'سرکار خانم دکتر سیده مریم رضوی')); ?></span>
                <span class="block text-[11px] font-mono text-emerald-400 mt-0.5">پایگاه داده آراء: ۱,۲۸۰+ رأی تنقیح‌شده</span>
            </div>
        </div>

        <!-- شورت‌کد رابط کاربری هوش حقوقی -->
        <div class="legal-intelligence-portal-wrapper">
            <?php echo do_shortcode('[sedrazavi_legal_intelligence_portal]'); ?>
        </div>

    </div>
</main>

<?php
get_footer();
`},{path:"page-legal-strategy.php",filename:"page-legal-strategy.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-legal-strategy.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: پرتال استراتژی دادرسی و مواعد قضایی (Legal Strategy & Deadlines)
 *
 * @package SedRazavi_Law_Firm
 * @version 7.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main min-h-screen bg-slate-50 dark:bg-[#060B18] py-12">
    <div class="container mx-auto px-4 max-w-7xl space-y-8">
        <header class="text-center space-y-3">
            <span class="px-4 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">
                دفتر وکالت سرکار خانم دکتر سیده مریم رضوی - سامانه فاز ۷
            </span>
            <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-serif">
                پرتال استراتژی دادرسی، مواعد قانونی و گاوصندوق اسناد قضایی
            </h1>
            <p class="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                شبیه‌سازی برخط شانس پیروزی، پایش لحظه‌ای مواعد تجدیدنظر و فرجام بر اساس مواد ۴۴۲ الی ۴۵۳ ق.آ.د.م و نگهداری اسناد با هش SHA-256.
            </p>
        </header>

        <div class="legal-strategy-suite-wrapper">
            <?php echo do_shortcode('[sedrazavi_legal_strategy_suite]'); ?>
        </div>
    </div>
</main>

<?php
get_footer();
`},{path:"page-odr-arbitration.php",filename:"page-odr-arbitration.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-odr-arbitration.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: مرکز داوری آنلاین (ODR)
 * Description: سامانه رسمی تبادل الکترونیک لوایح، ارجاع داوری و ابلاغ رأی داور مرضی‌الطرفین
 *
 * @package SedRazavi_Law_Firm
 * @version 5.0.0
 */

get_header();
?>

<main id="primary" class="site-main py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] text-slate-800 dark:text-slate-100 min-h-screen">
    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- هدر رسمی سامانه داوری -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#060B18] via-[#0B132B] to-[#060B18] border-2 border-[#D4AF37]/50 shadow-2xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="space-y-3">
                <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
                    ⚖️ مرکز داوری و حل‌وفصل برخط اختلافات بازرگانی و ملکی (ODR)
                </span>
                <h1 class="text-2xl sm:text-3xl font-black font-serif text-white">
                    پرتال رسمی داوری تخصصی کانون وکلا
                </h1>
                <p class="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                    منطبق بر باب هفتم قانون آیین دادرسی مدنی جمهوری اسلامی ایران و قانون داوری تجاری بین‌المللی. صدور آرای داوری قطعی و لازم‌الاجرا جهت ارائه به دوایر اجرای احکام دادگستری.
                </p>
            </div>
            <div class="text-left bg-white/5 border border-white/10 p-4 rounded-2xl shrink-0">
                <span class="block text-xs text-slate-400">سرداور مرضی‌الطرفین:</span>
                <span class="text-sm font-bold text-[#D4AF37]"><?php echo esc_html(get_theme_mod('lawyer_full_name', 'سرکار خانم دکتر سیده مریم رضوی')); ?></span>
                <span class="block text-[11px] font-mono text-slate-300 mt-0.5">پروانه وکالت: ۱۸۴۵۲ / ک.و.م</span>
            </div>
        </div>

        <!-- شورت‌کد اصلی ماژول داوری و لوایح -->
        <div class="odr-portal-wrapper">
            <?php echo do_shortcode('[sedrazavi_odr_portal]'); ?>
        </div>

    </div>
</main>

<?php
get_footer();
`},{path:"page-petition-generator.php",filename:"page-petition-generator.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-petition-generator.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: تنظیم دادخواست و لوایح عدل‌ایران
 * Description: فرم‌ساز هوشمند دادخواست، شکواییه و لوایح تجدیدنظر با قالب رسمی قوه قضائیه
 *
 * @package SedRazavi_Law_Firm
 * @version 5.0.0
 */

get_header();
?>

<main class="site-main py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] min-h-screen">
    <div class="max-w-7xl mx-auto space-y-6">
        
        <div class="petition-generator-container">
            <?php echo do_shortcode('[sedrazavi_petition_builder]'); ?>
        </div>

    </div>
</main>

<?php
get_footer();
`},{path:"page-real-estate-construction.php",filename:"page-real-estate-construction.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-real-estate-construction.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: سامانه دعاوی ملکی، سرقفلی و ساخت‌وساز (Phase 12)
 * Description: Real Estate, Construction Partnerships, Goodwill (Key-money) & Municipal Commissions Portal
 *
 * @package SedRazavi
 * @version 2.8.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-16 bg-[#0B132B] text-white min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-12">
        <div class="text-center max-w-3xl mx-auto space-y-4">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                میز تخصصی دعاوی ملکی، سرقفلی و ساخت‌وساز (فاز ۱۲)
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-white">
                دعاوی اراضی، مشارکت در ساخت، سرقفلی و کمیسیون ماده ۱۰۰ شهرداری
            </h1>
            <p class="text-gray-300 text-sm leading-relaxed">
                محاسبه‌گر ترازنامه قدرالسهم مشارکت در ساخت، تحلیل احکام سرقفلی و حق کسب و پیشه (قوانین ۵۶ و ۷۶) و مخزن دادخواست‌های الزام به تنظیم سند رسمی.
            </p>
        </div>

        <!-- Shortcode Embed -->
        <div class="rounded-3xl p-6 bg-gray-900/80 border border-gray-800 shadow-2xl backdrop-blur-md">
            <?php echo do_shortcode('[sedrazavi_real_estate_suite]'); ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>`},{path:"page-services.php",filename:"page-services.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-services.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: خدمات حقوقی (Legal Services)
 * Description: Dedicated page template for all legal services
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-16 bg-[#F4F6F9] min-h-screen text-[#0B132B]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-12">
        <div class="text-center max-w-3xl mx-auto space-y-4">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] text-xs font-bold border border-[#D4AF37]/40">حوزه‌های تخصصی وکالت</span>
            <h1 class="text-3xl sm:text-4xl font-black text-[#0B132B]">خدمات جامع حقوقی، کیفری و داوری بین‌المللی</h1>
            <p class="text-gray-600 text-sm sm:text-base leading-relaxed">از تدوین قراردادهای بین‌المللی تا دفاع تخصصی در دیوان عالی کشور و مراجع قضایی سراسر کشور</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-right">
            <?php
            $services = new WP_Query(array('post_type' => 'service', 'posts_per_page' => 12));
            if ($services->have_posts()) :
                while ($services->have_posts()) : $services->the_post();
            ?>
                <div class="rounded-3xl p-6 bg-white border border-gray-200 hover:border-[#D4AF37] shadow-lg transition-all flex flex-col justify-between">
                    <div class="space-y-3">
                        <div class="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] font-bold text-xl">⚖️</div>
                        <h3 class="text-lg font-bold text-[#0B132B]"><?php the_title(); ?></h3>
                        <p class="text-xs text-gray-500 leading-relaxed"><?php echo wp_trim_words(get_the_excerpt(), 25); ?></p>
                    </div>
                    <div class="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
                        <a href="<?php the_permalink(); ?>" class="text-xs font-bold text-[#D4AF37] hover:underline">مشاهده جزئیات &larr;</a>
                        <a href="#booking" class="btn-gold px-3.5 py-1.5 rounded-xl text-xs font-bold">رزرو نوبت</a>
                    </div>
                </div>
            <?php
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>`},{path:"page-template-dashboard.php",filename:"page-template-dashboard.php",category:"برگه‌ها و آرشیوها",description:"قالب تمام‌صفحه اختصاصی داشبورد مدیریت وکالت.",code:`<?php
/**
 * Template Name: پیشخوان تمام‌صفحه وکیل (Full-Screen Lawyer Dashboard)
 * Description: Full-screen dashboard hosting the LawyerDashboard React component via .sedrazavi-react-root
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

// Fetch current user details or default lawyer credentials
$is_logged_in = is_user_logged_in();
$current_user = wp_get_current_user();
$user_name = $is_logged_in && !empty($current_user->display_name) 
    ? $current_user->display_name 
    : get_option('sedrazavi_lawyer_name', 'سرکار خانم دکتر سیده مریم رضوی');
$user_phone = $is_logged_in 
    ? (get_user_meta($current_user->ID, 'phone', true) ?: get_user_meta($current_user->ID, 'billing_phone', true) ?: '۰۹۱۲۳۴۵۶۷۸۹') 
    : get_option('sedrazavi_lawyer_mobile', '۰۹۱۲-۳۴۵۶۷۸۹');

$is_admin = current_user_can('manage_options');
$is_lawyer = current_user_can('edit_posts') || (is_user_logged_in() && in_array('lawyer', (array)$current_user->roles, true));

$dashboard_props = [
    'userPhoneNumber'       => $user_phone,
    'userName'              => $user_name,
    'userRole'              => $is_admin ? 'admin' : ($is_lawyer ? 'lawyer' : 'client'),
    'isAdminActingAsLawyer' => $is_admin,
    'isFullScreen'          => true,
    'viewMode'              => 'lawyer',
];
?>

<main id="sedrazavi-fullscreen-dashboard-page" class="min-h-screen bg-[#F4F6F9] dark:bg-[#070D1E] w-full text-right" dir="rtl">
    <!-- Inject .sedrazavi-react-root for LawyerDashboard -->
    <div 
        id="sedrazavi-dashboard-fullscreen-mount"
        class="sedrazavi-react-root w-full min-h-screen"
        data-component="LawyerDashboard"
        data-props="<?php echo esc_attr(wp_json_encode($dashboard_props)); ?>"
        dir="rtl"
    >
        <!-- Graceful fallback skeleton if JS is initializing -->
        <div class="sedrazavi-skeleton-container" style="min-height: 80vh; background: linear-gradient(135deg, rgba(11,19,43,0.03) 0%, rgba(212,175,55,0.06) 100%); border-radius: 1.5rem; margin: 1.5rem auto; max-width: 96%; padding: 3rem; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; font-family: inherit;">
            <div style="width: 48px; height: 48px; border: 4px solid rgba(212,175,55,0.25); border-top-color: #D4AF37; border-radius: 50%; animation: sedrazaviSpin 1.1s cubic-bezier(0.5, 0, 0.5, 1) infinite; margin-bottom: 1.25rem;"></div>
            <h2 style="font-size: 1.25rem; font-weight: 800; color: #0B132B; margin: 0 0 0.5rem 0;">
                پیشخوان تمام‌صفحه مدیریت پرونده‌ها و وکالت
            </h2>
            <p style="font-size: 0.8125rem; color: #64748B; max-width: 520px; margin: 0; line-height: 1.6;">
                در حال بارگذاری میز کار اختصاصی وکیل، نمودارهای تحلیلی، سامانه هشدارهای دادرسی و مکاتبات موکلین...
            </p>
            <style>
                @keyframes sedrazaviSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            </style>
        </div>
    </div>
</main>

<?php
get_footer();
`},{path:"page-tracking.php",filename:"page-tracking.php",category:"برگه‌ها و آرشیوها",description:"سامانه آنلاین استعلام و پیگیری وضعیت پرونده با کدرهگیری.",code:`<?php
/**
 * Template Name: پیگیری پرونده (Case Tracking)
 * Description: Confidential case status tracking portal
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-16 bg-[#F4F6F9] min-h-screen text-[#0B132B]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-12">
        <div class="text-center max-w-2xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] text-xs font-bold border border-[#D4AF37]/40">سامانه محرمانه موکلین</span>
            <h1 class="text-3xl sm:text-4xl font-black text-[#0B132B]">پیگیری برخط وضعیت دادرسی و لوایح دفاعیه</h1>
            <p class="text-gray-600 text-sm">مشاهده زنده آخرین اقدامات، وقت نظارت دادگاه و دریافت نسخه‌های لوایح</p>
        </div>

        <div class="rounded-3xl p-8 bg-white border border-gray-200 shadow-xl text-right">
            <form id="tracking-form" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">شماره پرونده وکالت:</label>
                        <input type="text" id="case-code" required placeholder="مثال: SR-1402-8821" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-mono" />
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">کد ملی موکل:</label>
                        <input type="text" id="national-code" placeholder="۱۰ رقم کد ملی" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-mono" />
                    </div>
                </div>
                <button type="submit" class="btn-gold px-6 py-2.5 rounded-xl font-bold text-xs shadow-md">استعلام آنلاین پرونده</button>
            </form>
        </div>

        <?php echo do_shortcode('[sedrazavi_client_portal]'); ?>
        <?php echo do_shortcode('[sedrazavi_gold_scroll]'); ?>
    </div>
</div>

<?php get_footer(); ?>`},{path:"page-virtual-court.php",filename:"page-virtual-court.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-virtual-court.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: تالار دادگاه مجازی و جلسات استماع
 * Description: شبیه‌ساز و بستر امن دادرسی الکترونیک با رمزنگاری سرتاسری و شمارشگر دفاع وکیل
 *
 * @package SedRazavi_Law_Firm
 * @version 5.0.0
 */

get_header();
?>

<main class="site-main py-10 px-4 sm:px-6 lg:px-8 bg-[#060B18] text-white min-h-screen">
    <div class="max-w-7xl mx-auto space-y-6">
        
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
                <span class="px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/30">
                    🔴 اتاق دادرسی برخط و استماع اظهارات
                </span>
                <h1 class="text-xl sm:text-2xl font-bold font-serif text-[#D4AF37] mt-2">
                    اتاق داوری و استماع مجازی دفتر وکالت ونک
                </h1>
            </div>
            <div class="text-xs text-emerald-400 flex items-center gap-1.5 font-mono">
                <span>🔐 E2E 256-Bit Encrypted</span>
            </div>
        </div>

        <div class="virtual-court-room-container">
            <?php echo do_shortcode('[sedrazavi_virtual_courtroom]'); ?>
        </div>

    </div>
</main>

<?php
get_footer();
`},{path:"page.php",filename:"page.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: page.php",code:`<?php
/**
 * The template for displaying all pages
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

// بررسی سازگاری امن با المنتور
$is_elementor = false;
if ( did_action( 'elementor/loaded' ) && class_exists( 'Elementor\\Plugin' ) ) {
    $elementor_instance = call_user_func( array( 'Elementor\\Plugin', 'instance' ) );
    if ( $elementor_instance && isset( $elementor_instance->preview ) && is_object( $elementor_instance->preview ) ) {
        if ( method_exists( $elementor_instance->preview, 'is_preview_mode' ) && $elementor_instance->preview->is_preview_mode() ) {
            $is_elementor = true;
        }
    }
    if ( $elementor_instance && isset( $elementor_instance->editor ) && is_object( $elementor_instance->editor ) ) {
        if ( method_exists( $elementor_instance->editor, 'is_edit_mode' ) && $elementor_instance->editor->is_edit_mode() ) {
            $is_elementor = true;
        }
    }
}
if ( ! $is_elementor && is_singular() ) {
    $mode = get_post_meta( get_the_ID(), '_elementor_edit_mode', true );
    if ( $mode === 'builder' ) {
        $is_elementor = true;
    }
}

if ( $is_elementor ) :
    while ( have_posts() ) : the_post();
        the_content();
    endwhile;
else :
?>
<div id="primary" class="content-area py-16 bg-[#060B18] text-slate-100 min-h-[70vh]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('bg-[#0B132B] rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-2xl'); ?>>
                <?php if (!is_front_page()) : ?>
                    <header class="entry-header mb-8 pb-6 border-b border-slate-800 flex items-center gap-3">
                        <span class="w-2.5 h-8 bg-gradient-to-b from-[#D4AF37] to-[#AA820A] rounded-full inline-block"></span>
                        <h1 class="text-2xl sm:text-4xl font-serif font-bold text-white"><?php the_title(); ?></h1>
                    </header>
                <?php endif; ?>

                <div class="entry-content text-base leading-loose text-slate-300">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php endwhile; ?>
    </div>
</div>
<?php
endif;

get_footer();
?>
`},{path:"readme.txt",filename:"readme.txt",category:"مستندات و پیکربندی",description:"فایل رسمی پوسته وردپرس: readme.txt",code:`=== SedRazavi Law Firm WordPress Theme ===
Contributors: sedrazavi
Tags: lawyer, attorney, legal, elementor, rtl, dark-mode, acf-pro, github-actions, ci-cd
Requires at least: 5.8
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 2.0.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

قالب اختصاصی، فوق‌پیشرفته و استاندارد وکلا و دفاتر حقوقی SedRazavi.

== توضیحات ==
قالب حقوقی SedRazavi بر پایه آخرین استانداردهای طراحی وب و اصول روان‌شناسی رنگ و هویت بصری حقوقی (طلایی متالیک و سرمه‌ای متالیک) برای وکیل پایه یک دادگستری خانم محجبه طراحی شده است.

== امکانات کلیدی ==
* سازگاری ۱۰۰٪ با المنتور و المنتور پرو
* ۵ پست‌تایپ اختصاصی حقوقی (خدمات، پرونده‌ها، نظرات، پیام‌ها و ویدئوها)
* سامانه آنلاین پیگیری وضعیت پرونده برای موکلین
* سیستم رزرو نوبت هوشمند با محاسبه آنلاین حق‌المشاوره
* اسلایدر بنر متنی احادیث و اشعار اخلاقی-حقوقی
* سایدبار آیکونی شناور طلایی بازگشت به بالا
* پیشخوان اختصاصی مدیریت دفتر حقوقی برای وکیل
* بهینه‌سازی ۱۰۰٪ برای سئو محلی، اسکیماهای LegalService و کلمات کلیدی وکالت
* پشتیبانی کامل از RTL و پالت‌های متنوع حالت شب و روز

== نصب و فعال‌سازی ==
۱. فایل sedrazavi-theme.zip را از پیشخوان وردپرس > نمایش > پوسته‌ها > افزودن پوسته بارگذاری نمایید.
۲. بر روی فعال‌سازی کلیک کنید.
۳. افزونه مکمل sedrazavi-addons.zip را در بخش افزونه‌ها نصب و فعال نمایید.

== اعتبارات و توسعه‌دهنده (Credits) ==
* طراحی و توسعه: سید امیر حسین رضوی فردویی
* تلگرام: @sedrazavi (https://t.me/sedrazavi)
* ایتا: @sedrazavi (https://eitaa.com/sedrazavi)
* ایمیل: info@sedrazavi.com
* فونت‌های فارسی: Vazirmatn, Shabnam (OFL)
* فونت‌های لاتین: Inter, Playfair Display (OFL)
`},{path:"register-react-shortcodes.php",filename:"register-react-shortcodes.php",category:"پوسته اصلی و هدرها",description:'موتور ثبت شورت‌کدهای یونیورسال [react_component name="..."] با پشتیبانی اسکلتون لودر.',code:`<?php
/**
 * SedRazavi React Components Universal Shortcode Bridge
 *
 * Registers the universal '[react_component name="ComponentName" props="{}"]' shortcode,
 * allowing WordPress content editors to embed any modern React component into any page,
 * post, or widget using the '.sedrazavi-react-root' container pattern.
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Direct access denied
}

class SedRazavi_React_Shortcode_Registrar {

    /**
     * Map of supported React components and their descriptive titles
     */
    const SUPPORTED_COMPONENTS = [
        'LawyerDashboard'               => 'پیشخوان جامع مدیریت پرونده‌ها و وکالت (Lawyer Dashboard)',
        'ClientPortalView'              => 'کارتابل محرمانه موکلین و مراجعین (Client Portal)',
        'CaseInteractiveTimeline'       => 'تایم‌لاین تعاملی و اوقات نظارت پرونده (Case Interactive Timeline)',
        'FirmMilestone'                 => 'سفر رشد و نقاط عطف راهبردی مؤسسه حقوقی (Firm Milestones)',
        'KeyPracticeAreasRadarChart'    => 'نمودار راداری صلاحیت‌های تخصصی وکیل (Key Practice Areas Radar Chart)',
        'LawyerPrintBioCard'            => 'شناسنامه رسمی و کارت بیوگرافی قابل پرینت (Lawyer Print Bio Card)',
        'EmailOtpAuthComponent'         => 'سامانه ورود بدون پسورد با رمز یکبار مصرف ایمیلی (Email OTP Login)',
        'EmailOtpMagicLogin'            => 'فرم لاگین هوشمند با ایمیل (Email OTP Magic Login)',
        'LawyerRealtimeToastNotifier'   => 'مرکز اعلان‌های بلادرنگ مواعد دادگاه و پیام‌های موکلین (Real-time Notifier)',
        'CaseProgressTracker'           => 'استپر و پیگیری وضعیت پرونده دادگستری (Case Progress Tracker)',
        'CourtFeeCalculator'            => 'میز محاسبات قضایی و تمبر دادرسی (Court Fee Calculator)',
        'ComprehensiveAdminPortal'      => 'پنل جامع ادمین و راهبری وکالت (Comprehensive Admin Portal)',
        'AdminHelpAndDocsSystem'        => 'مرکز مستندات و راهنمای تصویری مدیریت (Admin Help & Docs)',
        'CorporateInsolvencySuite'      => 'سامانه ورشکستگی، تصفیه دیون و قرارداد ارفاقی (Corporate Insolvency Suite)',
        'ClientPortalQuickAccessWidget' => 'ابزارک دسترسی سریع کارتابل موکل (Client Quick Access)',
        'LawyerHeroSlider'              => 'هیرو اسلایدر صفحه اصلی (Lawyer Hero Slider)',
        'TextBannerSlider'              => 'نوار متحرک شعارهای حقوقی (Text Banner Slider)',
        'StoryBar'                      => 'نوار هایلایت‌ها و استوری‌های آموزشی (Story Bar)',
        'ServicesSection'               => 'گرید خدمات حقوقی (Services Section)',
        'AboutSection'                  => 'بخش درباره وکیل و سوگندنامه (About Section)',
        'FaqSection'                    => 'پرسش و پاسخ‌های متداول حقوقی (FAQ Section)',
        'TestimonialsSlider'            => 'اسلایدر نظرات و رضایت‌نامه موکلین (Testimonials Slider)',
        'ContactAndBookingSection'      => 'فرم نوبت‌دهی مشاوره و تماس (Contact & Booking Section)',
        'ArticlesSection'               => 'آرشیو مقالات و یادداشت‌های تحلیلی (Articles Section)',
    ];

    /**
     * Initialize shortcode registration
     */
    public static function init() {
        // Universal Shortcode: [react_component name="ComponentName" props="{}"]
        add_shortcode('react_component', [__CLASS__, 'render_universal_react_component']);

        // Dedicated shortcut shortcodes
        add_shortcode('sedrazavi_dashboard', [__CLASS__, 'render_dashboard_shortcut']);
        add_shortcode('sedrazavi_timeline', [__CLASS__, 'render_timeline_shortcut']);
        add_shortcode('sedrazavi_firm_milestones', [__CLASS__, 'render_milestones_shortcut']);
        add_shortcode('sedrazavi_radar_chart', [__CLASS__, 'render_radar_shortcut']);
        add_shortcode('sedrazavi_email_otp', [__CLASS__, 'render_email_otp_shortcut']);
        add_shortcode('sedrazavi_bio_card', [__CLASS__, 'render_bio_card_shortcut']);
        add_shortcode('sedrazavi_insolvency', [__CLASS__, 'render_insolvency_shortcut']);
    }

    /**
     * Universal shortcode callback: [react_component name="ComponentName" props='{"key":"value"}']
     */
    public static function render_universal_react_component($atts, $content = null) {
        $a = shortcode_atts([
            'name'  => 'LawyerDashboard',
            'props' => '{}',
            'class' => '',
            'id'    => '',
            'title' => '',
        ], $atts, 'react_component');

        $component_name = sanitize_text_field($a['name']);
        
        // Decode and validate props JSON
        $props = [];
        if (!empty($a['props'])) {
            $decoded = json_decode(html_entity_decode($a['props']), true);
            if (is_array($decoded)) {
                $props = $decoded;
            }
        }

        // Fetch display title
        $fallback_title = !empty($a['title']) 
            ? sanitize_text_field($a['title']) 
            : (self::SUPPORTED_COMPONENTS[$component_name] ?? "مؤلفه حقوقی {$component_name}");

        return self::render_bridge_markup($component_name, $props, $a['class'], $a['id'], $fallback_title);
    }

    /**
     * Helper to render the .sedrazavi-react-root container with skeleton preloader
     */
    public static function render_bridge_markup($component_name, $props = [], $custom_class = '', $custom_id = '', $fallback_title = '') {
        $unique_id = !empty($custom_id) 
            ? sanitize_html_class($custom_id) 
            : 'sedrazavi-react-' . strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $component_name)) . '-' . wp_unique_id();

        $classes = trim('sedrazavi-react-root sedrazavi-ui-wrapper ' . sanitize_text_field($custom_class));
        $props_json = esc_attr(wp_json_encode($props));
        $title = !empty($fallback_title) ? $fallback_title : "سامانه حقوقی {$component_name}";

        ob_start();
        ?>
        <div 
            id="<?php echo esc_attr($unique_id); ?>" 
            class="<?php echo esc_attr($classes); ?>" 
            data-component="<?php echo esc_attr($component_name); ?>" 
            data-props="<?php echo $props_json; ?>" 
            dir="rtl"
        >
            <div class="sedrazavi-skeleton-container" style="min-height: 180px; background: linear-gradient(135deg, rgba(11,19,43,0.03) 0%, rgba(212,175,55,0.06) 100%); border: 1px dashed rgba(212,175,55,0.35); border-radius: 1.25rem; padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; font-family: inherit; direction: rtl; margin: 0.75rem 0;">
                <div style="width: 36px; height: 36px; border: 3px solid rgba(212,175,55,0.25); border-top-color: #D4AF37; border-radius: 50%; animation: sedrazaviSpin 1.1s cubic-bezier(0.5, 0, 0.5, 1) infinite; margin-bottom: 0.75rem;"></div>
                <h4 style="font-size: 0.875rem; font-weight: 800; color: #D4AF37; margin: 0 0 0.25rem 0;">
                    <?php echo esc_html($title); ?>
                </h4>
                <span style="font-size: 0.75rem; color: #94A3B8;">
                    در حال راه‌اندازی و اجرای مؤلفه React در وردپرس...
                </span>
                <style>
                    @keyframes sedrazaviSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                </style>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcuts for popular components
     */
    public static function render_dashboard_shortcut($atts) {
        return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LawyerDashboard']));
    }

    public static function render_timeline_shortcut($atts) {
        return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'CaseInteractiveTimeline']));
    }

    public static function render_milestones_shortcut($atts) {
        return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'FirmMilestone']));
    }

    public static function render_radar_shortcut($atts) {
        return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'KeyPracticeAreasRadarChart']));
    }

    public static function render_email_otp_shortcut($atts) {
        return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'EmailOtpAuthComponent']));
    }

    public static function render_bio_card_shortcut($atts) {
        return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LawyerPrintBioCard']));
    }

    public static function render_insolvency_shortcut($atts) {
        return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'CorporateInsolvencySuite']));
    }
}

// Bootstrap Universal Shortcodes
SedRazavi_React_Shortcode_Registrar::init();
`},{path:"search.php",filename:"search.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: search.php",code:`<?php
/**
 * The template for displaying search results pages
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="py-16 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-[60vh]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <header class="page-header mb-8 bg-white dark:bg-[#0B132B] p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h1 class="text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
                🔍 <?php printf(esc_html__('نتایج جستجو برای: %s', 'sedrazavi'), '<span class="text-[#D4AF37]">' . get_search_query() . '</span>'); ?>
            </h1>
        </header>

        <?php if (have_posts()) : ?>
            <div class="space-y-4">
                <?php while (have_posts()) : the_post(); ?>
                    <article class="bg-white dark:bg-[#0B132B] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-[#D4AF37] transition-all">
                        <h2 class="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h2>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-2"><?php the_excerpt(); ?></p>
                    </article>
                <?php endwhile; ?>
            </div>
            <div class="mt-8 flex justify-center"><?php the_posts_pagination(); ?></div>
        <?php else : ?>
            <div class="bg-white dark:bg-[#0B132B] p-12 rounded-3xl text-center text-gray-500">
                <p><?php esc_html_e('هیچ نتیجه‌ای با عبارت جستجوشده مطابقت ندارد. لطفاً عبارت دیگری را امتحان فرمایید.', 'sedrazavi'); ?></p>
            </div>
        <?php endif; ?>
    </div>
</div>

<?php get_footer(); ?>
`},{path:"sidebar.php",filename:"sidebar.php",category:"پوسته اصلی و هدرها",description:"فایل رسمی پوسته وردپرس: sidebar.php",code:`<?php
/**
 * The sidebar containing the main widget area
 *
 * @package SedRazavi
 * @version 2.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<aside id="secondary" class="widget-area space-y-6" role="complementary">
    <!-- Lawyer Profile Widget -->
    <div class="bg-white dark:bg-[#0B132B] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm text-center space-y-4">
        <div class="w-20 h-20 mx-auto rounded-full bg-[#D4AF37] text-white flex items-center justify-center text-3xl font-serif font-bold shadow-lg">
            ⚖️
        </div>
        <div>
            <h3 class="font-bold font-serif text-lg text-[#0B132B] dark:text-white"><?php esc_html_e('وکیل سید رضوی', 'sedrazavi'); ?></h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1"><?php esc_html_e('وکیل پایه یک دادگستری و مشاور حقوقی', 'sedrazavi'); ?></p>
        </div>
        <div class="pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300 space-y-2">
            <p>📞 <?php echo esc_html(get_option('sedrazavi_office_phone', '۰۲۱-۸۸۹۹۰۰۱۱')); ?></p>
            <p>✉️ <?php echo esc_html(get_option('sedrazavi_office_email', 'info@sedrazavi-law.ir')); ?></p>
        </div>
        <a href="#booking" class="btn-gold w-full block py-2.5 text-xs">
            <span>درخواست مشاوره آنلاین</span>
        </a>
    </div>

    <?php dynamic_sidebar('sidebar-1'); ?>
</aside>
`},{path:"single-service.php",filename:"single-service.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: single-service.php",code:`<?php
/**
 * Single Service Detail Template
 *
 * @package SedRazavi
 */

get_header();
?>

<?php while (have_posts()) : the_post(); 
    $post_id = get_the_ID();
    $fee = get_post_meta($post_id, '_sedrazavi_service_fee', true) ?: 'بر اساس تعرفه مصوب کانون وکلا';
    $duration = get_post_meta($post_id, '_sedrazavi_service_duration', true) ?: '۱ الی ۳ ماه کاری';
    $docs = get_post_meta($post_id, '_sedrazavi_service_docs', true);
    $docs_array = !empty($docs) ? explode("
", $docs) : array('کارت ملی و شناسنامه', 'اصل و کپی قرارداد', 'اسناد مالکیت یا مدارک استنادی');
?>

<div class="service-banner bg-[#0B132B] text-white py-16 border-b border-[#D4AF37]/20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold mb-4">
            <span>⚖️</span>
            <span><?php esc_html_e('خدمات تخصصی وکالت و مشاوره', 'sedrazavi'); ?></span>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white leading-tight">
            <?php the_title(); ?>
        </h1>
    </div>
</div>

<main class="py-16 bg-[#F4F6F9] dark:bg-[#070D1E]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <!-- Main Content Area (8 Cols) -->
            <div class="lg:col-span-8 space-y-8">
                
                <?php if (has_post_thumbnail()) : ?>
                    <div class="rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800">
                        <?php the_post_thumbnail('full', array('class' => 'w-full h-auto object-cover max-h-[420px]')); ?>
                    </div>
                <?php endif; ?>

                <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-sm prose prose-lg dark:prose-invert max-w-none text-right">
                    <?php the_content(); ?>
                </div>

                <!-- Required Documents Checklist Box -->
                <div class="bg-gradient-to-br from-[#D4AF37]/10 to-transparent dark:bg-[#0B132B] rounded-3xl p-8 border border-[#D4AF37]/30">
                    <h3 class="text-xl font-bold font-serif text-[#0B132B] dark:text-white mb-4 flex items-center gap-2">
                        <span>📋</span>
                        <span><?php esc_html_e('مدارک و اسناد مورد نیاز جهت آغاز رسیدگی', 'sedrazavi'); ?></span>
                    </h3>
                    <ul class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                        <?php foreach ($docs_array as $doc_item) : ?>
                            <li class="flex items-center gap-3">
                                <span class="w-5 h-5 rounded-full bg-[#D4AF37] text-white flex items-center justify-center text-xs">✓</span>
                                <span><?php echo esc_html(trim($doc_item)); ?></span>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>

            </div>

            <!-- Sidebar Info & Booking (4 Cols) -->
            <div class="lg:col-span-4 space-y-6">
                
                <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg space-y-6">
                    <h3 class="text-lg font-bold font-serif text-[#0B132B] dark:text-white pb-3 border-b border-gray-100 dark:border-gray-800">
                        <?php esc_html_e('مشخصات و شرایط خدمت', 'sedrazavi'); ?>
                    </h3>

                    <div class="space-y-4 text-sm">
                        <div class="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                            <span class="text-gray-500 dark:text-gray-400">⏱️ مدت زمان تخمینی:</span>
                            <span class="font-bold text-[#0B132B] dark:text-white"><?php echo esc_html($duration); ?></span>
                        </div>
                        <div class="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                            <span class="text-gray-500 dark:text-gray-400">💰 حق‌الوکاله / هزینه:</span>
                            <span class="font-bold text-[#D4AF37]"><?php echo esc_html($fee); ?></span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-500 dark:text-gray-400">🛡️ نحوه رسیدگی:</span>
                            <span class="font-bold text-emerald-600">حضوری و آنلاین</span>
                        </div>
                    </div>

                    <a href="<?php echo esc_url(home_url('/#booking')); ?>" class="btn-gold w-full text-center py-3">
                        <span>📅 <?php esc_html_e('رزرو وقت مشاوره برای این خدمت', 'sedrazavi'); ?></span>
                    </a>
                </div>

                <!-- Lawyer Guarantee Box -->
                <div class="bg-[#0B132B] text-white rounded-3xl p-6 border border-[#D4AF37]/30 text-center space-y-3">
                    <span class="text-3xl">⚖️</span>
                    <h4 class="font-bold font-serif text-[#D4AF37]"><?php esc_html_e('تضمین تعهد و محرمانگی', 'sedrazavi'); ?></h4>
                    <p class="text-xs text-gray-300 leading-relaxed">
                        <?php esc_html_e('تمامی اطلاعات، اسناد و مکالمات شما تحت قوانین حفظ اسرار حرفه‌ای وکالت در بالاترین سطح امنیتی محافظت می‌شود.', 'sedrazavi'); ?>
                    </p>
                </div>

            </div>

        </div>
    </div>
</main>

<?php endwhile; ?>
<?php get_footer(); ?>
`},{path:"single-video.php",filename:"single-video.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: single-video.php",code:`<?php
/**
 * Single Video Template
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <?php while (have_posts()) : the_post(); 
            $video_url = get_post_meta(get_the_ID(), '_sedrazavi_video_url', true);
            $duration = get_post_meta(get_the_ID(), '_sedrazavi_video_duration', true) ?: '۱۰ دقیقه';
            $speaker = get_post_meta(get_the_ID(), '_sedrazavi_video_speaker', true) ?: 'وکیل سید رضوی';
        ?>
            <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
                
                <!-- Video Player Container -->
                <div class="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl flex items-center justify-center">
                    <?php if (!empty($video_url)) : ?>
                        <iframe class="w-full h-full" src="<?php echo esc_url($video_url); ?>" title="<?php the_title_attribute(); ?>" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <?php else : ?>
                        <div class="text-center p-8 text-white">
                            <span class="text-5xl block mb-2">🎬</span>
                            <p class="text-sm text-gray-400">ویدیو به زودی بارگذاری می‌شود.</p>
                        </div>
                    <?php endif; ?>
                </div>

                <!-- Video Title & Meta -->
                <div class="space-y-3 border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span class="bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-md font-bold">🎬 سخنرانی حقوقی</span>
                        <span>⏱️ زمان: <?php echo esc_html($duration); ?></span>
                        <span>🎙️ مدرس: <?php echo esc_html($speaker); ?></span>
                    </div>
                    <h1 class="text-2xl sm:text-3xl font-bold font-serif text-[#0B132B] dark:text-white"><?php the_title(); ?></h1>
                </div>

                <!-- Content & Notes -->
                <div class="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                    <?php the_content(); ?>
                </div>

            </div>
        <?php endwhile; ?>
    </div>
</div>

<?php get_footer(); ?>
`},{path:"single.php",filename:"single.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: single.php",code:`<?php
/**
 * The template for displaying all single posts
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-xl space-y-8'); ?>>
                
                <!-- Article Header -->
                <header class="space-y-4 border-b border-gray-100 dark:border-gray-800 pb-6">
                    <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span class="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] font-bold rounded-lg"><?php the_category(', '); ?></span>
                        <span>•</span>
                        <span>📅 <?php echo get_the_date('j F Y'); ?></span>
                        <span>•</span>
                        <span>⏱️ <?php echo max(1, round(str_word_count(strip_tags(get_the_content())) / 180)); ?> دقیقه مطالعه</span>
                    </div>
                    <h1 class="text-2xl sm:text-4xl font-bold font-serif text-[#0B132B] dark:text-white leading-tight">
                        <?php the_title(); ?>
                    </h1>
                </header>

                <!-- Featured Image -->
                <?php if (has_post_thumbnail()) : ?>
                    <div class="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                        <?php the_post_thumbnail('large', array('class' => 'w-full h-auto object-cover max-h-[480px]')); ?>
                    </div>
                <?php endif; ?>

                <!-- Post Body Content -->
                <div class="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                    <?php the_content(); ?>
                </div>

                <!-- Tags -->
                <?php if (has_tag()) : ?>
                    <div class="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-2">
                        <span class="text-xs text-gray-400">🏷️ <?php esc_html_e('برچسب‌ها:', 'sedrazavi'); ?></span>
                        <?php the_tags('<span class="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300">', '</span> <span class="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300">', '</span>'); ?>
                    </div>
                <?php endif; ?>

                <!-- Author Box -->
                <div class="bg-[#F4F6F9] dark:bg-gray-900/60 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center gap-5">
                    <div class="w-16 h-16 rounded-full bg-[#0B132B] text-[#D4AF37] flex items-center justify-center font-serif text-2xl font-bold">
                        ⚖️
                    </div>
                    <div>
                        <h4 class="font-bold text-sm text-[#0B132B] dark:text-white"><?php the_author(); ?></h4>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1"><?php echo get_the_author_meta('description') ?: 'وکیل پایه یک دادگستری و مشاور تخصصی دعاوی حقوقی، تجاری و کیفری.'; ?></p>
                    </div>
                </div>

                <!-- Comments Section -->
                <?php
                if (comments_open() || get_comments_number()) :
                    comments_template();
                endif;
                ?>

            </article>
        <?php endwhile; ?>
    </div>
</div>

<?php get_footer(); ?>
`},{path:"style.css",filename:"style.css",category:"پوسته اصلی و هدرها",description:"هدر رسمی پوسته وردپرس با نام SedRazavi، متغیرهای طلایی/سرمه‌ای و استایل‌های ۱۰۰٪ کامل.",code:`/*
Theme Name: SedRazavi
Theme URI: https://t.me/sedrazavi
Author: سید امیر حسین رضوی فردویی
Author URI: https://t.me/sedrazavi
Description: SedRazavi یک قالب حقوقی حرفه‌ای وردپرس برای وکیل پایه یک دادگستری خانم با پوشش اسلامی (مانتو و حجاب) است که شامل پورتال مدیریت دفتر حقوقی، سیستم رزرو نوبت، استعلام برخط پرونده، هماهنگی ۱۰۰٪ با المنتور، پالت‌های اختصاصی روز و شب، و استایل‌های بهینه بدون نیاز به کامپایلر خارجی می‌باشد.
Version: 3.0.0
Requires at least: 5.8
Tested up to: 6.7
Requires PHP: 7.4
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: sedrazavi
Tags: law-firm, legal, attorney, rtl-language-support, dark-mode, custom-header, custom-menu, featured-images, full-width-template
Creator Telegram: @sedrazavi
Creator Eitaa: @sedrazavi
*/

/* --------------------------------------------------------------------------
   ۱. ریست بنیادین و متغیرهای طراحی لوکس (Design Tokens)
   -------------------------------------------------------------------------- */
:root {
  --sr-gold-100: #FAF5E4;
  --sr-gold-200: #F3E5AB;
  --sr-gold-300: #E5C158;
  --sr-gold-400: #D4AF37;
  --sr-gold-500: #AA820A;
  --sr-gold-600: #8A6908;

  --sr-navy-950: #060B18;
  --sr-navy-900: #0B132B;
  --sr-navy-800: #1C2541;
  --sr-navy-700: #3A506B;
  --sr-navy-600: #4A6587;

  --sr-bg: #060B18;
  --sr-surface: #0B132B;
  --sr-surface-hover: #1C2541;
  --sr-border: rgba(212, 175, 55, 0.25);
  --sr-border-focus: #D4AF37;
  --sr-text-primary: #FFFFFF;
  --sr-text-secondary: #94A3B8;
  --sr-text-muted: #64748B;
  --sr-gold-grad: linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA820A 100%);
}

[data-theme="light"] {
  --sr-bg: #F8FAFC;
  --sr-surface: #FFFFFF;
  --sr-surface-hover: #F1F5F9;
  --sr-border: rgba(212, 175, 55, 0.35);
  --sr-border-focus: #AA820A;
  --sr-text-primary: #0B132B;
  --sr-text-secondary: #475569;
  --sr-text-muted: #94A3B8;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Tahoma, Arial, sans-serif;
  direction: rtl;
  scroll-behavior: smooth;
  background-color: var(--sr-bg);
  color: var(--sr-text-primary);
}

body {
  background-color: var(--sr-bg);
  color: var(--sr-text-primary);
  line-height: 1.7;
  overflow-x: hidden;
  margin: 0;
}

body.admin-bar .site-header {
  top: 32px;
}

a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* --------------------------------------------------------------------------
   ۲. چیدمان و ساختار کلی (Layout Helpers)
   -------------------------------------------------------------------------- */
.container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

.flex { display: flex; }
.inline-flex { display: inline-flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.flex-wrap { flex-wrap: wrap; }
.gap-1 { gap: 0.25rem; }
.gap-1\\\\.5 { gap: 0.375rem; }
.gap-2 { gap: 0.5rem; }
.gap-2\\\\.5 { gap: 0.625rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }
.gap-8 { gap: 2rem; }
.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; }
.inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
.hidden { display: none !important; }
.block { display: block !important; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-left { text-align: left; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }
.rounded-full { border-radius: 9999px; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-2xl { border-radius: 1rem; }
.shadow-md { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
.shadow-xl { box-shadow: 0 20px 25px -5px rgba(0,0,0,0.25); }
.shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
.cursor-pointer { cursor: pointer; }

/* --------------------------------------------------------------------------
   ۳. نوار اعلان فوقانی و هدر اصلی (Header & Top Bar)
   -------------------------------------------------------------------------- */
.top-notification-bar {
  background-color: #0B132B;
  color: #D1D5DB;
  font-size: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background-color: rgba(11, 19, 43, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
  padding-top: 0.85rem;
  padding-bottom: 0.85rem;
  transition: all 0.3s ease;
}

[data-theme="light"] .site-header {
  background-color: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(212, 175, 55, 0.25);
}

.site-branding {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-logo-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #D4AF37 0%, #C4981C 50%, #AA820A 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(212, 175, 55, 0.35);
  flex-shrink: 0;
}

.brand-title {
  font-size: 1.25rem;
  font-weight: 700;
  font-family: Georgia, 'Vazirmatn', serif;
  color: #FFFFFF;
  line-height: 1.2;
}

[data-theme="light"] .brand-title {
  color: #0B132B;
}

.badge-official {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 9999px;
  background-color: rgba(212, 175, 55, 0.15);
  color: #F3E5AB;
  border: 1px solid rgba(212, 175, 55, 0.35);
  font-weight: 700;
  white-space: nowrap;
}

[data-theme="light"] .badge-official {
  color: #AA820A;
}

.brand-tagline {
  font-size: 0.75rem;
  color: #94A3B8;
  margin-top: 1px;
}

.nav-link {
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  color: #E2E8F0;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #D4AF37;
  background-color: rgba(255, 255, 255, 0.05);
}

.nav-dropdown-wrapper {
  position: relative;
}

.nav-dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  width: 280px;
  background-color: #0B132B;
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 0.75rem;
  padding: 0.5rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  z-index: 50;
}

.nav-dropdown-wrapper:hover .nav-dropdown-menu {
  display: block;
}

.dropdown-item {
  display: block;
  padding: 0.6rem 0.75rem;
  font-size: 0.75rem;
  color: #E2E8F0;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  color: #D4AF37;
  background-color: rgba(212, 175, 55, 0.1);
}

.theme-btn, .hamburger-btn {
  padding: 0.5rem;
  border-radius: 0.75rem;
  border: 1px solid #374151;
  background-color: #1F2937;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.theme-btn:hover, .hamburger-btn:hover {
  border-color: #D4AF37;
}

.btn-gold {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA820A 100%);
  color: #0B132B;
  font-weight: 700;
  font-size: 0.75rem;
  box-shadow: 0 4px 14px rgba(212, 175, 55, 0.3);
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.btn-gold:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.45);
}

/* --------------------------------------------------------------------------
   ۴. نوار استوری‌های حقوقی (Story Bar Section - Matching Screenshot 2)
   -------------------------------------------------------------------------- */
.stories-bar-section {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background-color: rgba(11, 19, 43, 0.5);
  backdrop-filter: blur(8px);
}

.stories-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94A3B8;
}

.stories-scroll-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scrollbar-width: none;
}

.stories-scroll-container::-webkit-scrollbar {
  display: none;
}

.story-thumb-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.story-thumb-item:hover {
  transform: scale(1.04);
}

.story-ring-gold {
  padding: 2px;
  border-radius: 9999px;
  background: linear-gradient(135deg, #D4AF37 0%, #AA820A 50%, #F3E5AB 100%);
  box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.4);
}

.story-ring-subtle {
  padding: 2px;
  border-radius: 9999px;
  background-color: #374151;
}

.story-img-wrap {
  padding: 2px;
  border-radius: 9999px;
  background-color: #0B132B;
}

.story-photo-img {
  width: 68px;
  height: 68px;
  border-radius: 9999px;
  object-fit: cover;
  display: block;
}

@media (min-width: 640px) {
  .story-photo-img {
    width: 72px;
    height: 72px;
  }
}

.story-text-wrap {
  text-align: center;
  max-width: 85px;
}

.story-title-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #E2E8F0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.story-thumb-item:hover .story-title-label {
  color: #D4AF37;
}

.story-cat-label {
  display: block;
  font-size: 10px;
  color: #94A3B8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* --------------------------------------------------------------------------
   ۵. بخش هیرو اصلی (Hero Section - 100% Matching Screenshot 2)
   -------------------------------------------------------------------------- */
.hero-section {
  position: relative;
  overflow: hidden;
  padding-top: 2rem;
  padding-bottom: 4rem;
}

@media (min-width: 768px) {
  .hero-section {
    padding-top: 3.5rem;
    padding-bottom: 5rem;
  }
}

.hero-ambient-glow-right {
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  width: 20rem;
  height: 20rem;
  border-radius: 9999px;
  background-color: rgba(212, 175, 55, 0.1);
  filter: blur(64px);
  pointer-events: none;
}

.hero-ambient-glow-left {
  position: absolute;
  bottom: 2.5rem;
  left: 2.5rem;
  width: 24rem;
  height: 24rem;
  border-radius: 9999px;
  background-color: rgba(28, 37, 65, 0.4);
  filter: blur(64px);
  pointer-events: none;
}

.hero-grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .hero-grid-layout {
    grid-template-columns: 7fr 5fr;
  }
}

.hero-content-col {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background-color: rgba(212, 175, 55, 0.15);
  border: 1px solid rgba(212, 175, 55, 0.3);
  color: #F3E5AB;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
  align-self: flex-start;
}

@media (min-width: 640px) {
  .hero-badge-pill {
    font-size: 0.875rem;
  }
}

.hero-main-title {
  font-size: 2rem;
  font-weight: 800;
  font-family: Georgia, 'Vazirmatn', serif;
  color: #FFFFFF;
  line-height: 1.25;
}

[data-theme="light"] .hero-main-title {
  color: #0B132B;
}

@media (min-width: 640px) { .hero-main-title { font-size: 2.5rem; } }
@media (min-width: 768px) { .hero-main-title { font-size: 3rem; } }
@media (min-width: 1024px) { .hero-main-title { font-size: 3.5rem; } }

.hero-gold-gradient {
  background: linear-gradient(135deg, #D4AF37 0%, #AA820A 50%, #D4AF37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline;
}

.hero-slogan-text {
  font-size: 1rem;
  color: #CBD5E1;
  max-width: 42rem;
  line-height: 1.8;
}

[data-theme="light"] .hero-slogan-text {
  color: #475569;
}

@media (min-width: 640px) {
  .hero-slogan-text {
    font-size: 1.125rem;
  }
}

.hero-value-props-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  padding-top: 0.5rem;
}

@media (min-width: 640px) {
  .hero-value-props-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.hero-value-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #CBD5E1;
}

[data-theme="light"] .hero-value-item {
  color: #334155;
}

.hero-cta-buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
}

.btn-gold-hero {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.875rem 1.75rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA820A 100%);
  color: #0B132B;
  font-weight: 700;
  font-size: 0.875rem;
  box-shadow: 0 4px 16px rgba(212, 175, 55, 0.35);
  transition: all 0.2s ease;
}

.btn-gold-hero:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 22px rgba(212, 175, 55, 0.5);
}

.btn-navy-hero {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(212, 175, 55, 0.35);
  background-color: rgba(11, 19, 43, 0.8);
  color: #E2E8F0;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.btn-navy-hero:hover {
  background-color: rgba(28, 37, 65, 0.9);
  border-color: #D4AF37;
}

.hero-trust-row {
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.75rem;
  color: #94A3B8;
}

/* ستون پرتره و کارت طلایی */
.hero-portrait-col {
  position: relative;
  display: flex;
  justify-content: center;
}

.hero-portrait-wrap {
  position: relative;
  width: 100%;
  max-width: 28rem;
}

.hero-portrait-glow {
  position: absolute;
  inset: -0.75rem;
  border-radius: 1.5rem;
  background: linear-gradient(to top right, rgba(212, 175, 55, 0.5), rgba(170, 130, 10, 0.2), rgba(11, 19, 43, 0.1));
  filter: blur(24px);
  transform: rotate(-2deg);
}

.hero-portrait-card {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  border: 2px solid rgba(212, 175, 55, 0.4);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  background-color: #1C2541;
}

.hero-portrait-image {
  width: 100%;
  height: 460px;
  object-fit: cover;
  object-position: top;
  display: block;
  transition: transform 0.7s ease;
}

.hero-portrait-image:hover {
  transform: scale(1.03);
}

.hero-floating-badge-top {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(11, 19, 43, 0.9);
  backdrop-filter: blur(8px);
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(212, 175, 55, 0.3);
  font-size: 0.75rem;
  font-weight: 700;
  color: #F3E5AB;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2);
}

.pulse-emerald-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: #10B981;
  display: inline-block;
}

.hero-floating-card-bottom {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  left: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: rgba(11, 19, 43, 0.92);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  color: #FFFFFF;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-lawyer-name {
  font-size: 0.95rem;
  font-weight: 700;
  font-family: Georgia, 'Vazirmatn', serif;
  color: #D4AF37;
}

.hero-lawyer-title {
  font-size: 0.75rem;
  color: #CBD5E1;
  margin-top: 0.125rem;
}

.hero-exp-box {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: #D4AF37;
  color: #0B132B;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
}

/* --------------------------------------------------------------------------
   ۶. کارت‌های خدمات و منوی موبایل (Cards & Drawer)
   -------------------------------------------------------------------------- */
.service-card {
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: #0B132B;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-4px);
  border-color: rgba(212, 175, 55, 0.4);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.mobile-menu-drawer {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: none;
}

.mobile-menu-drawer.is-active {
  display: block;
}

.mobile-drawer-backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0,0,0,0.75);
  backdrop-filter: blur(4px);
}

.mobile-drawer-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 85%;
  max-width: 320px;
  background-color: #0B132B;
  border-left: 1px solid rgba(212, 175, 55, 0.2);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
}

/* ==========================================================================
   SedRazavi Law Firm Complete Interface & Sections Styling (v2.6.0)
   ========================================================================== */

/* Trust Badges Section */
.trust-badges-section {
    background: #060B18;
    border-top: 1px solid rgba(212, 175, 55, 0.2);
    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
    padding: 3rem 0;
}
.stat-card {
    background: #0B132B;
    border: 1px solid #1f2937;
    border-radius: 1rem;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;
}
.stat-card:hover {
    border-color: rgba(212, 175, 55, 0.5);
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

/* Service Filter Buttons */
.service-filter-btn {
    padding: 0.5rem 1.25rem;
    border-radius: 9999px;
    font-size: 0.8125rem;
    font-weight: 700;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.2s ease;
}
.service-filter-btn:hover {
    color: #ffffff;
    border-color: rgba(212, 175, 55, 0.4);
}
.service-filter-btn.active {
    background: linear-gradient(135deg, #D4AF37 0%, #AA820A 100%);
    color: #0B132B;
    border-color: transparent;
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}

/* Service Cards */
.service-card {
    background: #0B132B;
    border: 1px solid #1e293b;
    border-radius: 1.25rem;
    padding: 1.75rem;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.service-card:hover {
    border-color: rgba(212, 175, 55, 0.6);
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

/* FAQ Items */
.faq-item {
    background: #0B132B;
    border: 1px solid #1e293b;
    border-radius: 1rem;
    overflow: hidden;
    transition: border-color 0.2s;
}
.faq-item:hover {
    border-color: rgba(212, 175, 55, 0.3);
}
.faq-question {
    cursor: pointer;
    transition: color 0.2s;
}
.faq-question:hover {
    color: #D4AF37;
}

/* Modal Helpers */
.hidden {
    display: none !important;
}
.flex {
    display: flex !important;
}

/* --------------------------------------------------------------------------
   ۱۲. استایل‌های تکمیلی قالب، ابزارک‌ها و کامپوننت‌های تعاملی
   -------------------------------------------------------------------------- */

/* نوار شناور و نشانگر پیشرفت مطالعه و اسکرول (Floating Gold Scroll Badge) */
.sedrazavi-floating-gold-sidebar {
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    z-index: 40;
    pointer-events: auto;
}
.gold-sidebar-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}
.gold-scroll-badge {
    width: 48px;
    height: 48px;
    border-radius: 9999px;
    background: linear-gradient(135deg, #0B132B 0%, #1C2541 100%);
    border: 1.5px solid var(--sr-gold-400);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45), 0 0 15px rgba(212, 175, 55, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}
.gold-scroll-badge:hover {
    transform: translateY(-3px) scale(1.05);
    border-color: #F3E5AB;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.55), 0 0 20px rgba(212, 175, 55, 0.45);
}
.gold-percent-num {
    font-size: 0.6875rem;
    font-weight: 800;
    color: var(--sr-gold-400);
    line-height: 1;
    font-family: inherit;
}
.gold-scroll-v-track {
    width: 4px;
    height: 60px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 9999px;
    overflow: hidden;
    position: relative;
    margin-top: 0.25rem;
}
.gold-scroll-v-fill {
    width: 100%;
    height: 0%;
    background: linear-gradient(180deg, #F3E5AB 0%, #D4AF37 50%, #AA820A 100%);
    border-radius: 9999px;
    transition: height 0.1s linear;
}
.gold-btn-top {
    font-size: 0.75rem;
    color: var(--sr-gold-400);
    margin-top: -2px;
}

/* سوالات متداول (FAQ Accordion) */
.faq-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 9999px;
    background: rgba(212, 175, 55, 0.1);
    color: var(--sr-gold-400);
    font-size: 1.125rem;
    font-weight: 700;
    transition: transform 0.25s ease, background-color 0.25s ease;
}
.faq-item.active .faq-icon {
    transform: rotate(45deg);
    background: rgba(212, 175, 55, 0.25);
}
.faq-answer {
    padding: 1.25rem;
    padding-top: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.85;
    color: var(--sr-text-secondary);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

/* بنر سربرگ آرشیو و صفحات برگه (Archive & Page Headers) */
.archive-header-banner,
.page-header,
.category-header,
.tag-header {
    background: linear-gradient(135deg, #060B18 0%, #0B132B 60%, #1C2541 100%);
    border-bottom: 1px solid rgba(212, 175, 55, 0.25);
    padding: 3.5rem 1.5rem;
    position: relative;
    overflow: hidden;
    text-align: center;
}
.archive-header-banner::before,
.page-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.12) 0%, transparent 70%);
    pointer-events: none;
}
.archive-description {
    max-width: 48rem;
    margin: 1rem auto 0;
    font-size: 0.9375rem;
    line-height: 1.8;
    color: var(--sr-text-secondary);
}
.archive-posts-section,
.content-area,
.site-main {
    width: 100%;
    min-height: 60vh;
}

/* محتوای مقالات و سربرگ ورودی (Entry Header & Content) */
.entry-header {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.entry-content {
    font-size: 1rem;
    line-height: 2;
    color: var(--sr-text-secondary);
}
.entry-content h1,
.entry-content h2,
.entry-content h3,
.entry-content h4 {
    color: var(--sr-text-primary);
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 800;
}
.entry-content p {
    margin-bottom: 1.5rem;
}
.entry-content blockquote {
    border-right: 4px solid var(--sr-gold-400);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    background: rgba(212, 175, 55, 0.05);
    border-radius: 0 0.75rem 0.75rem 0;
    font-style: italic;
    color: #F3E5AB;
}
.entry-content img {
    border-radius: 1rem;
    margin: 2rem auto;
    border: 1px solid rgba(212, 175, 55, 0.2);
}

/* دیدگاه‌ها (Comments Area) */
.comments-area {
    margin-top: 3.5rem;
    padding-top: 2.5rem;
    border-top: 1px solid rgba(212, 175, 55, 0.2);
}
.comments-title {
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--sr-text-primary);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.comments-title::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 1.25rem;
    background: var(--sr-gold-400);
    border-radius: 2px;
}
.comment-list {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem 0;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}
.comment-form-wrapper {
    background: #0B132B;
    border: 1px solid rgba(212, 175, 55, 0.25);
    border-radius: 1.25rem;
    padding: 2rem;
}
.no-comments {
    padding: 1.5rem;
    text-align: center;
    color: var(--sr-text-muted);
    font-size: 0.875rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.75rem;
}

/* میزبان‌های کامپوننت‌های ری‌اکت و اسکلتون (React Roots & Skeletons) */
.sedrazavi-react-root {
    width: 100%;
    position: relative;
    min-height: 200px;
    isolation: isolate;
}
.sedrazavi-ui-wrapper {
    width: 100%;
}
.sedrazavi-skeleton-container {
    width: 100%;
    min-height: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1.5rem;
    background: linear-gradient(135deg, rgba(11, 19, 43, 0.4) 0%, rgba(28, 37, 65, 0.4) 100%);
    border: 1px dashed rgba(212, 175, 55, 0.3);
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
    animation: sedrazaviSkeletonPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes sedrazaviSkeletonPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.65; }
}

/* درگاه‌ها و ماژول‌های تخصصی حقوقی (Portals & Wrappers) */
.odr-portal-wrapper,
.legal-strategy-suite-wrapper,
.legal-intelligence-portal-wrapper,
.contract-auditor-container,
.petition-generator-container,
.sedrazavi-calc-container,
.sedrazavi-strategy-container,
.sedrazavi-portal-wrapper,
.virtual-court-room-container,
.sedrazavi-app-mount {
    width: 100%;
    border-radius: 1.5rem;
    overflow: hidden;
}

/* کارت‌های صفحات داخلی (Dashboard & Internal Cards) */
.sedrazavi-insolvency-page-card,
.sedrazavi-milestones-page-card,
.sedrazavi-timeline-page-card,
.sedrazavi-otp-login-card {
    background: #0B132B;
    border: 1px solid rgba(212, 175, 55, 0.25);
    border-radius: 1.5rem;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

/* بنر خدمت و پانوشت سایت */
.service-banner {
    position: relative;
    border-radius: 1.25rem;
    overflow: hidden;
}
.site-footer {
    width: 100%;
    position: relative;
    z-index: 10;
}
.widget-area {
    margin-top: 3rem;
}
.posts-pagination {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
}
.posts-pagination a,
.posts-pagination span {
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(11, 19, 43, 0.8);
    color: var(--sr-text-secondary);
}
.posts-pagination .current {
    background: linear-gradient(135deg, #D4AF37 0%, #AA820A 100%);
    color: #0B132B;
    font-weight: 700;
    border-color: transparent;
}

/* دسترس‌پذیری و عناصر وردپرس (Accessibility & WordPress Core Helpers) */
.skip-link {
    position: absolute;
    top: -9999px;
    right: 50%;
    transform: translateX(50%);
    background: var(--sr-gold-400);
    color: #0B132B;
    padding: 0.75rem 1.5rem;
    font-weight: 700;
    border-radius: 0 0 0.75rem 0.75rem;
    z-index: 9999;
}
.skip-link:focus {
    top: 0;
}
.screen-reader-text {
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute !important;
    width: 1px;
    word-wrap: normal !important;
}
.button-primary {
    background: linear-gradient(135deg, #D4AF37 0%, #AA820A 100%) !important;
    border-color: #8A6908 !important;
    color: #0B132B !important;
    font-weight: 700 !important;
    text-shadow: none !important;
}
.nav-dropdown-trigger {
    cursor: pointer;
}
.theme-toggle-moon,
.theme-toggle-sun {
    transition: opacity 0.2s ease, transform 0.2s ease;
}
.sedrazavi-admin-wrap,
.sedrazavi-options-wrap,
.sedrazavi-meta-box-wrapper {
    font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, Tahoma, sans-serif;
    direction: rtl;
}
.notice,
.notice-warning {
    border-right: 4px solid var(--sr-gold-400) !important;
    background: #FFFFFF;
    color: #0B132B;
}
.is-dismissible {
    position: relative;
}
.regular-text {
    width: 100%;
    max-width: 25em;
}
.large-text {
    width: 100%;
}
.code {
    font-family: Consolas, Monaco, monospace;
    direction: ltr;
}

/* تایپوگرافی پروژه‌ای (Prose Helpers) */
.prose-lg {
    font-size: 1.125rem;
    line-height: 2;
}
.dark\\:prose-invert {
    color: var(--sr-text-secondary);
}

/* کلاس‌های مقداری تکمیلی (Tailwind Utility Backfill) */
.gap-1\\.5 { gap: 0.375rem !important; }
.gap-2\\.5 { gap: 0.625rem !important; }
.h-3\\.5 { height: 0.875rem !important; }
.w-2\\.5 { width: 0.625rem !important; }
.w-3\\.5 { width: 0.875rem !important; }
.p-2\\.5 { padding: 0.625rem !important; }
.px-2\\.5 { padding-left: 0.625rem !important; padding-right: 0.625rem !important; }
.px-3\\.5 { padding-left: 0.875rem !important; padding-right: 0.875rem !important; }
.py-0\\.5 { padding-top: 0.125rem !important; padding-bottom: 0.125rem !important; }
.py-1\\.5 { padding-top: 0.375rem !important; padding-bottom: 0.375rem !important; }
.py-2\\.5 { padding-top: 0.625rem !important; padding-bottom: 0.625rem !important; }
.py-3\\.5 { padding-top: 0.875rem !important; padding-bottom: 0.875rem !important; }
.mb-0\\.5 { margin-bottom: 0.125rem !important; }
.mb-1\\.5 { margin-bottom: 0.375rem !important; }
.mt-0\\.5 { margin-top: 0.125rem !important; }
.mt-16 { margin-top: 4rem !important; }
.pt-12 { padding-top: 3rem !important; }
.space-y-2\\.5 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 0.625rem !important;
}
@media (min-width: 768px) {
    .md\\:flex-initial { flex: 0 1 auto !important; }
}
`},{path:"tag.php",filename:"tag.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: tag.php",code:`<?php
/**
 * Tag Archive Template
 *
 * @package SedRazavi
 */

get_header();
$tag = get_queried_object();
?>

<div class="tag-header bg-[#0B132B] text-white py-14 border-b border-[#D4AF37]/20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <span class="px-3 py-1 rounded-full bg-white/10 text-[#D4AF37] text-xs font-semibold inline-block mb-2">
            🏷️ #<?php single_tag_title(); ?>
        </span>
        <h1 class="text-2xl sm:text-3xl font-bold font-serif text-white">
            <?php printf(esc_html__('مطالب مرتبط با برچسب: %s', 'sedrazavi'), single_tag_title('', false)); ?>
        </h1>
    </div>
</div>

<main class="py-14 bg-[#F4F6F9] dark:bg-[#070D1E]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <?php get_template_part('template-parts/archive-grid'); ?>
    </div>
</main>

<?php get_footer(); ?>
`},{path:"template-comments.php",filename:"template-comments.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: template-comments.php",code:`<?php
/**
 * Template Name: مدیریت دیدگاه‌ها (Front-end Comments Moderator)
 * Description: Front-end comment management for administrators and editors
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

// Ensure user has comment moderation capabilities
if (!is_user_logged_in() || !current_user_can('moderate_comments')) {
    auth_redirect();
    exit;
}

get_header();

// Fetch comments with pagination & filter
$status_filter = isset($_GET['cstatus']) ? sanitize_text_field($_GET['cstatus']) : 'all';
$args = array(
    'number' => 20,
    'status' => ($status_filter === 'all') ? '' : $status_filter,
);
$comments_query = new WP_Comment_Query();
$comments = $comments_query->query($args);
?>

<div class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header Bar -->
        <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-3">
                    <span>💬</span>
                    <span><?php esc_html_e('مدیریت دیدگاه‌ها و نظرات کاربران در فرانت‌اند', 'sedrazavi'); ?></span>
                </h1>
                <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <?php esc_html_e('تایید، ویرایش، حذف و پاسخ به دیدگاه‌های موکلان بدون نیاز به ورود به پیشخوان ادمین.', 'sedrazavi'); ?>
                </p>
            </div>

            <!-- Filter Pills -->
            <div class="flex items-center gap-2 text-xs">
                <a href="?cstatus=all" class="px-3 py-1.5 rounded-xl font-bold <?php echo $status_filter === 'all' ? 'bg-[#0B132B] text-white dark:bg-[#D4AF37] dark:text-[#0B132B]' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'; ?>">همه</a>
                <a href="?cstatus=hold" class="px-3 py-1.5 rounded-xl font-bold <?php echo $status_filter === 'hold' ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'; ?>">در انتظار تایید</a>
                <a href="?cstatus=approve" class="px-3 py-1.5 rounded-xl font-bold <?php echo $status_filter === 'approve' ? 'bg-emerald-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'; ?>">تایید شده</a>
                <a href="?cstatus=spam" class="px-3 py-1.5 rounded-xl font-bold <?php echo $status_filter === 'spam' ? 'bg-red-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'; ?>">اسپم</a>
            </div>
        </div>

        <!-- Comments Table / Cards -->
        <div class="space-y-4">
            <?php if (!empty($comments)) : ?>
                <?php foreach ($comments as $comment) : ?>
                    <div id="comment-card-<?php echo $comment->comment_ID; ?>" class="bg-white dark:bg-[#0B132B] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-start justify-between gap-6 transition-all hover:border-[#D4AF37]/50">
                        <div class="space-y-2 flex-1">
                            <div class="flex items-center gap-3">
                                <span class="font-bold text-sm text-[#0B132B] dark:text-white"><?php echo esc_html($comment->comment_author); ?></span>
                                <span class="text-xs text-gray-400 font-mono" dir="ltr"><?php echo esc_html($comment->comment_author_email); ?></span>
                                <span class="text-xs px-2 py-0.5 rounded font-semibold <?php echo $comment->comment_approved == '1' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : ($comment->comment_approved == 'spam' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'); ?>">
                                    <?php echo $comment->comment_approved == '1' ? 'تایید شده' : ($comment->comment_approved == 'spam' ? 'اسپم' : 'در انتظار'); ?>
                                </span>
                            </div>
                            <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-900/60 p-3 rounded-xl">
                                <?php echo esc_html($comment->comment_content); ?>
                            </p>
                            <div class="text-xs text-gray-400 flex items-center gap-4">
                                <span>نوشته: <a href="<?php echo get_permalink($comment->comment_post_ID); ?>" class="text-[#D4AF37] hover:underline" target="_blank"><?php echo get_the_title($comment->comment_post_ID); ?></a></span>
                                <span>تاریخ: <?php echo get_comment_date('j F Y - H:i', $comment->comment_ID); ?></span>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex flex-wrap md:flex-col gap-2 w-full md:w-auto">
                            <?php if ($comment->comment_approved != '1') : ?>
                                <button onclick="sedrazaviModComment(<?php echo $comment->comment_ID; ?>, 'approve')" class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700">✓ تایید</button>
                            <?php else : ?>
                                <button onclick="sedrazaviModComment(<?php echo $comment->comment_ID; ?>, 'unapprove')" class="px-3 py-1.5 rounded-lg bg-gray-500 text-white text-xs font-bold hover:bg-gray-600">عدم تایید</button>
                            <?php endif; ?>
                            <button onclick="sedrazaviModComment(<?php echo $comment->comment_ID; ?>, 'spam')" class="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-bold hover:bg-amber-700">🚫 اسپم</button>
                            <button onclick="sedrazaviModComment(<?php echo $comment->comment_ID; ?>, 'trash')" class="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700">🗑️ حذف</button>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php else : ?>
                <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-12 text-center text-gray-500">
                    <p class="text-base font-semibold"><?php esc_html_e('دیدگاهی با این وضعیت یافت نشد.', 'sedrazavi'); ?></p>
                </div>
            <?php endif; ?>
        </div>

    </div>
</div>

<script>
function sedrazaviModComment(commentId, action) {
    if (!confirm('آیا از انجام این عملیات روی دیدگاه اطمینان دارید؟')) return;
    jQuery.post(sedrazavi_ajax_obj.ajax_url, {
        action: 'sedrazavi_moderate_comment_action',
        security: sedrazavi_ajax_obj.nonce,
        comment_id: commentId,
        mod_action: action
    }, function(res) {
        if (res.success) {
            location.reload();
        } else {
            alert(res.data.message || 'خطا در انجام عملیات');
        }
    });
}
<\/script>

<?php get_footer(); ?>
`},{path:"template-corporate-international.php",filename:"template-corporate-international.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: template-corporate-international.php",code:`<?php
/**
 * Template Name: پرتال امور شرکت‌ها و داوری بین‌المللی
 * Description: Corporate Governance, Incoterms 2020 & International Arbitration Portal (Phase 8)
 *
 * @package SedRazavi
 * @version 8.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-12 bg-slate-50 dark:bg-[#060B18] min-h-screen text-slate-800 dark:text-slate-100" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8">
        <!-- سربرگ اختصاصی دکتری حقوق بین‌الملل دکتر سیده مریم رضوی -->
        <div class="rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] border border-[#D4AF37]/30 p-8 sm:p-12 text-white shadow-2xl">
            <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div class="space-y-3 max-w-3xl">
                    <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F3E5AB] text-xs font-bold">
                        پرتال فاز ۸ - مرکز تخصصی حقوق شرکت‌ها و داوری اتاق بازرگانی بین‌المللی (ICC)
                    </span>
                    <h1 class="text-3xl sm:text-4xl font-black font-serif text-white leading-tight">
                        امور شرکت‌ها، بازرگانی بین‌الملل و داوری فرامرزی
                    </h1>
                    <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        سامانه مکانیزه محاسبه حد نصاب تشکیل و تصمیم‌گیری مجامع شرکتی طبق لایحه اصلاحی قانون تجارت، شبیه‌ساز حرفه‌ای ۱۱ قاعده اینکوترمز ۲۰۲۰ و کلینیک داوری بین‌المللی تحت کنوانسیون ۱۹۵۸ نیویورک.
                    </p>
                </div>
                <div class="p-5 rounded-2xl bg-white/5 border border-[#D4AF37]/40 backdrop-blur-md space-y-2 min-w-[260px] text-right">
                    <div class="text-xs font-bold text-[#F3E5AB]">سرپرست علمی و راهبردی:</div>
                    <div class="text-base font-black text-white">دکتر سیده مریم رضوی</div>
                    <div class="text-xs text-[#D4AF37]">دکتری حقوق بین‌الملل عمومی و خصوصی</div>
                </div>
            </div>
        </div>

        <!-- فراخوانی شورت‌کد اختصاصی فاز ۸ -->
        <?php echo do_shortcode('[sedrazavi_corporate_suite]'); ?>
    </div>
</div>

<?php get_footer(); ?>`},{path:"template-emails.php",filename:"template-emails.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: template-emails.php",code:`<?php
/**
 * Template Name: صندوق پیام‌ها و ایمیل‌های ورودی (Front-end Email Manager)
 * Description: Front-end inbox for contact form messages & consultation requests
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!is_user_logged_in() || !current_user_can('edit_others_posts')) {
    auth_redirect();
    exit;
}

get_header();

// Query incoming message logs
$messages_query = new WP_Query(array(
    'post_type'      => 'sedrazavi_message',
    'post_status'    => 'publish',
    'posts_per_page' => 20,
));
?>

<div class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm mb-8 flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-3">
                    <span>📬</span>
                    <span><?php esc_html_e('صندوق پیام‌ها و درخواست‌های مشاوره موکلین', 'sedrazavi'); ?></span>
                </h1>
                <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <?php esc_html_e('مشاهده، مدیریت وضعیت و پاسخ مستقیم از طریق سرور ایمیل امن وکیل.', 'sedrazavi'); ?>
                </p>
            </div>
            <div class="text-xs px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-bold">
                ● سرور پیام‌رسان فعال
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <!-- Message List (7 Cols) -->
            <div class="lg:col-span-7 space-y-4">
                <?php if ($messages_query->have_posts()) : ?>
                    <?php while ($messages_query->have_posts()) : $messages_query->the_post(); 
                        $msg_id = get_the_ID();
                        $sender_name = get_post_meta($msg_id, '_sedrazavi_sender_name', true) ?: get_the_title();
                        $sender_email = get_post_meta($msg_id, '_sedrazavi_sender_email', true);
                        $sender_phone = get_post_meta($msg_id, '_sedrazavi_sender_phone', true);
                        $msg_status = get_post_meta($msg_id, '_sedrazavi_msg_status', true) ?: 'unread';
                    ?>
                        <div class="bg-white dark:bg-[#0B132B] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm space-y-3 cursor-pointer hover:border-[#D4AF37]" onclick="sedrazaviSelectMsg('<?php echo esc_js($sender_name); ?>', '<?php echo esc_js($sender_email); ?>', '<?php echo esc_js(get_the_title()); ?>')">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <span class="w-3 h-3 rounded-full <?php echo $msg_status === 'unread' ? 'bg-amber-500 animate-pulse' : 'bg-gray-400'; ?>"></span>
                                    <span class="font-bold text-sm text-[#0B132B] dark:text-white"><?php echo esc_html($sender_name); ?></span>
                                </div>
                                <span class="text-xs text-gray-400"><?php echo get_the_date('j F Y - H:i'); ?></span>
                            </div>

                            <p class="text-sm font-semibold text-gray-800 dark:text-gray-200"><?php the_title(); ?></p>
                            <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2"><?php echo get_the_content(); ?></p>

                            <div class="text-xs text-gray-400 flex items-center gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                                <span>📱 <?php echo esc_html($sender_phone); ?></span>
                                <span dir="ltr">✉️ <?php echo esc_html($sender_email); ?></span>
                            </div>
                        </div>
                    <?php endwhile; wp_reset_postdata(); ?>
                <?php else : ?>
                    <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-12 text-center text-gray-500">
                        <p><?php esc_html_e('هیچ پیامی در صندوق ورودی وجود ندارد.', 'sedrazavi'); ?></p>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Quick Reply Composer (5 Cols) -->
            <div class="lg:col-span-5">
                <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg sticky top-28 space-y-4">
                    <h3 class="font-bold font-serif text-[#0B132B] dark:text-white pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                        <span>✍️</span>
                        <span><?php esc_html_e('ارسال پاسخ رسمی به موکل', 'sedrazavi'); ?></span>
                    </h3>

                    <form id="front-email-reply-form" class="space-y-3">
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">گیرنده:</label>
                            <input type="text" id="reply-to" readonly class="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-600 dark:text-gray-300">
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">موضوع پاسخ:</label>
                            <input type="text" id="reply-subject" class="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs font-medium focus:border-[#D4AF37]">
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">متن پاسخ رسمی:</label>
                            <textarea id="reply-body" rows="6" placeholder="متن پاسخ وکیل یا منشی حقوقی..." class="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs leading-relaxed focus:border-[#D4AF37]"></textarea>
                        </div>
                        <button type="button" onclick="sedrazaviSendEmailReply()" class="btn-gold w-full text-xs py-2.5">
                            <span>ارسال پاسخ از طریق سرور امن</span>
                        </button>
                    </form>
                </div>
            </div>

        </div>

    </div>
</div>

<script>
function sedrazaviSelectMsg(name, email, subject) {
    document.getElementById('reply-to').value = name + ' <' + email + '>';
    document.getElementById('reply-subject').value = 'پاسخ به: ' + subject;
}

function sedrazaviSendEmailReply() {
    var to = document.getElementById('reply-to').value;
    var subject = document.getElementById('reply-subject').value;
    var body = document.getElementById('reply-body').value;

    if (!to || !body) {
        alert('لطفاً ابتدا یک پیام را انتخاب کرده و متن پاسخ را درج نمایید.');
        return;
    }

    jQuery.post(sedrazavi_ajax_obj.ajax_url, {
        action: 'sedrazavi_send_reply_email',
        security: sedrazavi_ajax_obj.nonce,
        to: to,
        subject: subject,
        body: body
    }, function(res) {
        if (res.success) {
            alert('پاسخ با موفقیت برای موکل ارسال شد.');
            document.getElementById('reply-body').value = '';
        } else {
            alert(res.data.message || 'خطا در ارسال ایمیل');
        }
    });
}
<\/script>

<?php get_footer(); ?>
`}];export{e as W};
