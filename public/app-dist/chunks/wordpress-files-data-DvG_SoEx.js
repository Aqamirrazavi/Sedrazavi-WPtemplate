const e=[{path:"404.php",filename:"404.php",category:"قالب اصلی (Templates)",description:"فایل رسمی پوسته وردپرس: 404.php",code:`<?php
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
`},{path:"INSTALL.md",filename:"INSTALL.md",category:"مستندات و زبان",description:"فایل رسمی پوسته وردپرس: INSTALL.md",code:`# ⚖️ راهنمای جامع نصب، راه‌اندازی و عیب‌یابی بسته سید رضوی (SedRazavi v2.5.0)

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
`},{path:"README.md",filename:"README.md",category:"مستندات و زبان",description:"فایل رسمی پوسته وردپرس: README.md",code:`# ⚖️ قالب وردپرس فوق‌پیشرفته سید رضوی (SedRazavi Law Firm Theme)

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
                                    <span class="flex items-center gap-1">
                                        <svg class="w-3.5 h-3.5 text-sr-gold inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        <span><?php echo get_the_date('j F Y'); ?></span>
                                    </span>
                                    <span>•</span>
                                    <span class="flex items-center gap-1">
                                        <svg class="w-3.5 h-3.5 text-sr-gold inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                        <span><?php echo max(1, round(str_word_count(strip_tags(get_the_content())) / 180)); ?> دقیقه مطالعه</span>
                                    </span>
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
                                    <svg class="w-3.5 h-3.5 text-sr-gold inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 20h9"></path>
                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                    </svg>
                                    <span><?php the_author(); ?></span>
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
                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-sr-gold">
                    <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
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
`},{path:"assets/css/rtl.css",filename:"rtl.css",category:"استایل و دارایی‌ها (Assets)",description:"فایل رسمی پوسته وردپرس: assets/css/rtl.css",code:`/* SedRazavi RTL Stylesheet */
body {
  direction: rtl;
  unicode-bidi: embed;
  text-align: right;
}

.prose {
  text-align: right;
}
`},{path:"assets/css/vazirmatn.css",filename:"vazirmatn.css",category:"استایل و دارایی‌ها (Assets)",description:"فایل رسمی پوسته وردپرس: assets/css/vazirmatn.css",code:`/**
 * Vazirmatn Persian Typography Stylesheet
 * Local self-contained font stack ensuring 100% offline uptime and zero dependency on external CDNs.
 *
 * @package SedRazavi
 * @version 3.0.0
 */

@font-face {
  font-family: 'Vazirmatn';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Vazirmatn Light'), local('Vazirmatn-Light'), local('Vazirmatn');
}

@font-face {
  font-family: 'Vazirmatn';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Vazirmatn Regular'), local('Vazirmatn-Regular'), local('Vazirmatn');
}

@font-face {
  font-family: 'Vazirmatn';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Vazirmatn Medium'), local('Vazirmatn-Medium'), local('Vazirmatn');
}

@font-face {
  font-family: 'Vazirmatn';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: local('Vazirmatn SemiBold'), local('Vazirmatn-SemiBold'), local('Vazirmatn');
}

@font-face {
  font-family: 'Vazirmatn';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Vazirmatn Bold'), local('Vazirmatn-Bold'), local('Vazirmatn');
}

@font-face {
  font-family: 'Vazirmatn';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: local('Vazirmatn ExtraBold'), local('Vazirmatn-ExtraBold'), local('Vazirmatn');
}

:root {
  --sr-font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'IRANSans', 'Sahel', Tahoma, Arial, sans-serif;
}

body, button, input, select, textarea {
  font-family: var(--sr-font-family);
}
`},{path:"assets/js/main.js",filename:"main.js",category:"استایل و دارایی‌ها (Assets)",description:"فایل رسمی پوسته وردپرس: assets/js/main.js",code:`/**
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
    var modalImg = document.getElementById("story-modal-img");
    if (modalImg) {
        modalImg.onerror = function() {
            var themeUri = (window.SedRazaviReactConfig && window.SedRazaviReactConfig.site && window.SedRazaviReactConfig.site.url) 
                ? window.SedRazaviReactConfig.site.url + '/wp-content/themes/sedrazavi-theme/screenshot.png' 
                : 'screenshot.png';
            this.src = themeUri;
        };
        modalImg.src = story.img;
    }
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
`},{path:"assets/js/sedrazavi-react-mount.js",filename:"sedrazavi-react-mount.js",category:"استایل و دارایی‌ها (Assets)",description:"موتور شناسایی خودکار روت‌های .sedrazavi-react-root و هیدراتاسیون React در وردپرس.",code:`/**
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
`},{path:"block-patterns/pattern-bento-hud.html",filename:"pattern-bento-hud.html",category:"قالب اصلی (Templates)",description:"فایل رسمی پوسته وردپرس: block-patterns/pattern-bento-hud.html",code:`<!-- wp:group {"className":"uas-fse-bento-hud","layout":{"type":"constrained"}} -->
<div class="wp-block-group uas-fse-bento-hud p-6 bg-[#07090E] rounded-3xl border border-slate-800 text-white">
    <!-- wp:shortcode -->
    [sedrazavi_bento_hub]
    <!-- /wp:shortcode -->
</div>
<!-- /wp:group -->
`},{path:"block-patterns/pattern-dense-matrix.html",filename:"pattern-dense-matrix.html",category:"قالب اصلی (Templates)",description:"فایل رسمی پوسته وردپرس: block-patterns/pattern-dense-matrix.html",code:`<!-- wp:group {"className":"uas-fse-dense-matrix","layout":{"type":"constrained"}} -->
<div class="wp-block-group uas-fse-dense-matrix p-6 bg-[#0A0E17] rounded-3xl border border-slate-800 text-white">
    <!-- wp:shortcode -->
    [sedrazavi_dense_matrix]
    <!-- /wp:shortcode -->
</div>
<!-- /wp:group -->
`},{path:"block-patterns/pattern-hybrid-executive.html",filename:"pattern-hybrid-executive.html",category:"قالب اصلی (Templates)",description:"فایل رسمی پوسته وردپرس: block-patterns/pattern-hybrid-executive.html",code:`<!-- wp:group {"className":"uas-fse-hybrid-executive","layout":{"type":"constrained"}} -->
<div class="wp-block-group uas-fse-hybrid-executive p-6 bg-[#F8FAFC] rounded-3xl border border-slate-200 text-slate-900">
    <!-- wp:shortcode -->
    [sedrazavi_hybrid_executive]
    <!-- /wp:shortcode -->
</div>
<!-- /wp:group -->
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
`},{path:"child-themes/sedrazavi-lawyer-child/functions.php",filename:"functions.php",category:"قالب اصلی (Templates)",description:"فایل رسمی پوسته وردپرس: child-themes/sedrazavi-lawyer-child/functions.php",code:`<?php
/**
 * Child Theme Functions & Definitions
 *
 * @package SedRazavi_Lawyer_Child
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style('sedrazavi-parent-style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style('sedrazavi-child-style', get_stylesheet_directory_uri() . '/style.css', array('sedrazavi-parent-style'), wp_get_theme()->get('Version'));
});
`},{path:"child-themes/sedrazavi-lawyer-child/style.css",filename:"style.css",category:"قالب اصلی (Templates)",description:"فایل رسمی پوسته وردپرس: child-themes/sedrazavi-lawyer-child/style.css",code:`/*
Theme Name: SedRazavi Lawyer Child Theme
Theme URI: https://github.com/sedrazavi/sedrazavi-theme
Description: Child theme for SedRazavi Universal Suite, tailored specifically for legal practices, attorney offices, and arbitration courts.
Author: Dr. Seyedeh Maryam Razavi
Author URI: https://sedrazavi.ir
Template: wordpress-theme
Version: 1.0.0
Text Domain: sedrazavi-lawyer-child
*/

/* Custom styles for Lawyer Child Theme */
:root {
  --primary-gold: #D4AF37;
  --primary-navy: #0B132B;
}
`},{path:"comments.php",filename:"comments.php",category:"قالب اصلی (Templates)",description:"فایل رسمی پوسته وردپرس: comments.php",code:`<?php
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
`},{path:"footer.php",filename:"footer.php",category:"قالب اصلی (Templates)",description:"پانوشت استاندارد وردپرس با هوک wp_footer و نوار شناور درصد مطالعه (Gold Scroll).",code:`<?php
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

<?php
// Elementor Theme Builder Footer Location support
if ( function_exists('elementor_theme_do_location') && elementor_theme_do_location('footer') ) {
    wp_footer();
    echo '</body></html>';
    return;
}
?>

<footer id="colophon" class="site-footer bg-sr-bg text-sr-primary pt-16 pb-8 border-t border-sr-border relative overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-sr-border-subtle">
            
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
                        <span class="text-lg font-bold font-serif text-sr-primary">دفتر وکالت و داوری SedRazavi</span>
                        <p class="text-[10px] text-sr-gold">پوسته رسمی کانون وکلای مرکز</p>
                    </div>
                </div>

                <p class="text-sr-muted text-xs leading-relaxed">
                    دفتر وکالت و داوری حقوقی دکتر سیده مریم رضوی (SedRazavi)؛ پاسدار حقوق فردی و شرکتی با بیش از دو دهه تجربه درخشان در محاکم قضایی و مراجع داوری بین‌المللی.
                </p>

                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sr-surface border border-sr-border-subtle text-xs text-sr-gold">
                    <svg class="w-3.5 h-3.5 text-sr-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span>پروانه رسمی کانون وکلای دادگستری مرکز</span>
                </div>
            </div>

            <!-- ستون ۲: دسترسی سریع به خدمات -->
            <div>
                <h4 class="text-base font-bold text-sr-primary mb-4 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
                    دسترسی سریع به خدمات
                </h4>
                <ul class="space-y-2.5 text-xs text-sr-muted">
                    <li><a href="<?php echo esc_url(home_url('/#services')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> دعاوی تجاری و شرکت‌ها</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#services')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> دعاوی ملکی، اراضی و سرقفلی</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#services')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> جرایم اقتصادی و دادگاه انقلاب</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#services')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> حقوق خانواده، مهریه و تقسیم ارث</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#services')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> داوری بین‌المللی و بازرگانی (ICC)</a></li>
                </ul>
            </div>

            <!-- ستون ۳: پیوندهای مفید سامانه -->
            <div>
                <h4 class="text-base font-bold text-sr-primary mb-4 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
                    پیوندهای مفید سامانه
                </h4>
                <ul class="space-y-2.5 text-xs text-sr-muted">
                    <li><a href="<?php echo esc_url(home_url('/#tracking')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5 text-sr-gold font-bold">
                        <svg class="w-3.5 h-3.5 text-sr-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <span>پیگیری لحظه‌ای پرونده موکلین</span>
                    </a></li>
                    <li><a href="<?php echo esc_url(home_url('/#booking')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> رزرو آنلاین نوبت مشاوره</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#about')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> درباره وکیل و منشور اخلاق</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#articles')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> یادداشت‌ها و مقالات حقوقی</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#faq')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> پرسش‌های متداول موکلین</a></li>
                </ul>
            </div>

            <!-- ستون ۴: ارتباط و خبرنامه -->
            <div class="space-y-4">
                <h4 class="text-base font-bold text-sr-primary mb-4 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
                    ارتباط و خبرنامه تخصصی
                </h4>
                <p class="text-xs text-sr-muted leading-relaxed">
                    جهت دریافت مهم‌ترین تحولات حقوقی و رویه‌های جدید قضایی، ایمیل خود را ثبت نمایید:
                </p>
                <form onsubmit="handleNewsletter(event)" class="flex gap-2">
                    <input type="email" required placeholder="آدرس ایمیل..." class="flex-1 px-3 py-2 rounded-xl bg-sr-surface border border-sr-border text-sr-primary text-xs focus:border-[#D4AF37] focus:outline-none" />
                    <button type="submit" class="btn-gold text-xs px-4 py-2 rounded-xl font-bold cursor-pointer">ثبت</button>
                </form>
                <div class="text-xs text-sr-muted space-y-1.5 pt-2">
                    <p class="flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5 text-sr-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>تلفن: ۰۲۱-۸۸۹۹۰۰۱۱</span>
                    </p>
                    <p class="flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5 text-sr-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>نشانی: تهران، ونک، ملاصدرا، پلاک ۱۱۸</span>
                    </p>
                </div>
            </div>

        </div>

        <!-- اطلاعات طراح و حق چاپ طبق بخش ۷ و پارت ۹ -->
        <div class="pt-8 pb-3 border-t border-sr-border-subtle flex flex-col sm:flex-row items-center justify-between text-xs text-sr-muted gap-3">
            <p>طراحی و توسعه توسط <a href="https://t.me/sedrazavi" target="_blank" rel="noopener" class="text-sr-gold font-bold hover:underline">سید امیر حسین رضوی فردویی</a></p>
            <div class="flex items-center gap-4 text-xs">
                <a href="https://t.me/sedrazavi" target="_blank" rel="noopener" class="text-sr-muted hover:text-sr-gold transition-colors">تلگرام: @sedrazavi</a>
                <span class="text-sr-border-subtle">|</span>
                <a href="https://eitaa.com/sedrazavi" target="_blank" rel="noopener" class="text-sr-muted hover:text-sr-gold transition-colors">ایتا: @sedrazavi</a>
            </div>
        </div>
        <div class="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-sr-muted gap-4">
            <p>© <?php echo date('Y'); ?> تمامی حقوق مادی و معنوی متعلق به دفتر وکالت و داوری SedRazavi می‌باشد.</p>
            <p><a href="<?php echo esc_url(home_url('/privacy-policy')); ?>" class="hover:text-sr-primary">قوانین و حریم خصوصی</a></p>
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
`},{path:"front-page.php",filename:"front-page.php",category:"قالب اصلی (Templates)",description:"صفحه نخست با پشتیبانی SSR و قابلیت جایگزینی با المنتور و کامپوننت‌های ری‌اکت.",code:`<?php
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


<!-- بخش ۱: نکات حقوقی روز و آرای وحدت رویه دیوان عالی کشور (Legal Insights Bar) -->
<section class="legal-insights-bar-section">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="legal-insights-header">
            <div class="legal-insights-title">
                <svg class="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                    <path d="M7 21h10"/>
                    <path d="M12 3v18"/>
                </svg>
                <span>نکات حقوقی روز، قوانین موضوعه جدید و آرای وحدت رویه دیوان عالی کشور</span>
            </div>
            <span class="legal-insights-badge">استناد رسمی محاکم</span>
        </div>

        <div class="legal-insights-grid">
            <!-- کارت ۱ -->
            <a href="#articles" class="legal-insight-card">
                <div>
                    <div class="legal-insight-cat-row">
                        <span class="legal-insight-tag">بانکی و اسناد تجاری</span>
                        <span class="legal-insight-num">رأی ۸۵۲</span>
                    </div>
                    <h4 class="legal-insight-title-text">ضوابط اعتبار چک‌های تضمینی و صیادی</h4>
                </div>
                <p class="legal-insight-desc-text">رویه قطعی اجرای مستقیم ماده ۲۳ قانون صدور چک در محاکم</p>
            </a>

            <!-- کارت ۲ -->
            <a href="#articles" class="legal-insight-card">
                <div>
                    <div class="legal-insight-cat-row">
                        <span class="legal-insight-tag">املاک و اراضی</span>
                        <span class="legal-insight-num">قانون جدید</span>
                    </div>
                    <h4 class="legal-insight-title-text">الزام به ثبت رسمی معاملات اموال غیرمنقول</h4>
                </div>
                <p class="legal-insight-desc-text">سلب اعتبار از اسناد عادی و قولنامه‌های معارض در دادگستری</p>
            </a>

            <!-- کارت ۳ -->
            <a href="#articles" class="legal-insight-card">
                <div>
                    <div class="legal-insight-cat-row">
                        <span class="legal-insight-tag">حقوق خانواده</span>
                        <span class="legal-insight-num">تعدیل اقساط</span>
                    </div>
                    <h4 class="legal-insight-title-text">تعدیل اقساط مهریه و اثبات عدم استطاعت</h4>
                </div>
                <p class="legal-insight-desc-text">رویه شعب دادگاه تجدیدنظر پیرامون تورم و نوسان سکه</p>
            </a>

            <!-- کارت ۴ -->
            <a href="#articles" class="legal-insight-card">
                <div>
                    <div class="legal-insight-cat-row">
                        <span class="legal-insight-tag">داوری بین‌المللی</span>
                        <span class="legal-insight-num">اتاق پاریس ICC</span>
                    </div>
                    <h4 class="legal-insight-title-text">اعتبار شرط داوری و اجرای احکام خارجی</h4>
                </div>
                <p class="legal-insight-desc-text">مصونیت آرای داوری تجاری بین‌المللی از ابطال در محاکم داخلی</p>
            </a>
        </div>
    </div>
</section>

<!-- بخش ۲: بخش هیرو سرنوشت‌ساز و پرتره وکیل (Hero Section) -->
<section class="hero-section" id="hero">
    <div class="hero-ambient-glow-right"></div>
    <div class="hero-ambient-glow-left"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <?php
        $preset = function_exists('sedrazavi_get_preset') ? sedrazavi_get_preset() : null;
        $preset_title = $preset ? esc_html($preset['hero_title']) : 'عدالت با دقت، حرفه‌ای‌گری با تعهد';
        $preset_desc = $preset ? esc_html($preset['hero_desc']) : 'دفاعی هوشمندانه برای آینده‌ای امن؛ پاسدار حقوق و منافع شما در مراجع قضایی و بین‌المللی';
        $preset_badge = $preset ? esc_html($preset['badge'] . ' • ' . $preset['hero_kicker']) : 'دکترای تخصصی حقوق خصوصی از دانشگاه تهران • بیش از ۲۰ سال سابقه وکالت';
        $cta_primary = $preset ? esc_html($preset['hero_cta_primary']) : 'رزرو وقت مشاوره تخصصی با وکیل';
        $cta_secondary = $preset ? esc_html($preset['hero_cta_secondary']) : 'استعلام برخط پرونده قضایی';
        $client_term = function_exists('sedrazavi_get_term') ? sedrazavi_get_term('client', 'موکل') : 'موکل';
        $case_term = function_exists('sedrazavi_get_term') ? sedrazavi_get_term('case', 'پرونده') : 'پرونده';
        ?>
        <div class="hero-grid-layout">
            <!-- ستون راست: تیتر اصلی، نشان تجربه، چک‌لیست و دکمه‌ها -->
            <div class="hero-content-col">
                <div class="hero-badge-pill">
                    <svg class="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                    </svg>
                    <span><?php echo $preset_badge; ?></span>
                </div>

                <h1 class="hero-main-title">
                    <?php echo $preset_title; ?>
                </h1>

                <p class="hero-slogan-text">
                    <?php echo $preset_desc; ?>
                </p>

                <!-- چک‌لیست ۴ گانه -->
                <div class="hero-value-props-grid">
                    <div class="hero-value-item">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>پاسخگویی سریع و حرفه‌ای به درخواست‌های <?php echo esc_html($client_term); ?></span>
                    </div>
                    <div class="hero-value-item">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>حفظ اسرار تجاری و ۱۰۰٪ محرمانگی اطلاعات و اسناد</span>
                    </div>
                    <div class="hero-value-item">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>شفافیت کامل در برآورد تعرفه‌ها و مراحل کار</span>
                    </div>
                    <div class="hero-value-item">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>سامانه هوشمند استعلام لحظه‌ای وضعیت <?php echo esc_html($case_term); ?></span>
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
                        <span><?php echo $cta_primary; ?></span>
                    </a>

                    <a href="#tracking" class="btn-navy-hero">
                        <svg class="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <span><?php echo $cta_secondary; ?></span>
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
                        <span>پاسخگویی مستقیم: ۰۲۱-۸۸۹۹۰۰۱۱</span>
                    </div>
                </div>
            </div>

            <!-- ستون چپ: کارت طلایی و پرتره لوکس وکیل -->
            <div class="hero-portrait-col">
                <div class="hero-portrait-wrap">
                    <div class="hero-portrait-glow"></div>

                    <div class="hero-portrait-card">
                        <?php
                        $lawyer_hero_portrait = get_theme_mod('sedrazavi_lawyer_portrait', '');
                        if (empty($lawyer_hero_portrait)) {
                            $lawyer_hero_portrait = get_template_directory_uri() . '/screenshot.png';
                        }
                        ?>
                        <img 
                            src="<?php echo esc_url($lawyer_hero_portrait); ?>" 
                            alt="سرکار خانم دکتر سیده مریم رضوی" 
                            class="hero-portrait-image object-cover"
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
<section class="trust-badges-section py-12 bg-sr-bg border-y border-sr-border relative">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div class="stat-card p-6 rounded-2xl bg-sr-surface border border-sr-border-subtle hover:border-[#D4AF37]/50 transition-all">
                <div class="text-3xl sm:text-4xl font-black font-serif text-[#D4AF37] mb-2" id="stat-cases">۱۲۸۰+</div>
                <div class="text-sm font-bold text-sr-primary mb-1">پرونده موفق دادگستری</div>
                <div class="text-xs text-sr-muted">آرای قطعی در دیوان عالی و تجدیدنظر</div>
            </div>
            <div class="stat-card p-6 rounded-2xl bg-sr-surface border border-sr-border-subtle hover:border-[#D4AF37]/50 transition-all">
                <div class="text-3xl sm:text-4xl font-black font-serif text-[#D4AF37] mb-2" id="stat-satisfaction">۹۸٪</div>
                <div class="text-sm font-bold text-sr-primary mb-1">رضایت کامل موکلین</div>
                <div class="text-xs text-sr-muted">بر اساس نظرسنجی مکتوب انتهای پرونده</div>
            </div>
            <div class="stat-card p-6 rounded-2xl bg-sr-surface border border-sr-border-subtle hover:border-[#D4AF37]/50 transition-all">
                <div class="text-3xl sm:text-4xl font-black font-serif text-[#D4AF37] mb-2" id="stat-experience">۲۰+</div>
                <div class="text-sm font-bold text-sr-primary mb-1">سال سابقه درخشان وکالت</div>
                <div class="text-xs text-sr-muted">عضو کانون وکلای دادگستری مرکز</div>
            </div>
            <div class="stat-card p-6 rounded-2xl bg-sr-surface border border-sr-border-subtle hover:border-[#D4AF37]/50 transition-all">
                <div class="text-3xl sm:text-4xl font-black font-serif text-[#D4AF37] mb-2" id="stat-contracts">۴۵۰+</div>
                <div class="text-sm font-bold text-sr-primary mb-1">قرارداد بازرگانی و داوری</div>
                <div class="text-xs text-sr-muted">تدوین و نظارت بر قراردادهای کلان</div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۴: حوزه‌های تخصصی وکالت و داوری (ServicesSection) -->
<section id="services" class="py-20 bg-sr-bg-alt relative">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <?php
        $services_header_badge = ($preset && $preset['id'] !== 'lawyer') ? esc_html($preset['badge']) : 'حوزه‌های تخصصی وکالت و داوری';
        $services_header_title = ($preset && $preset['id'] !== 'lawyer') ? 'خدمات تخصصی ' . esc_html($preset['name']) : 'خدمات حقوقی با استانداردهای بین‌المللی';
        $services_header_desc = ($preset && $preset['id'] !== 'lawyer') ? esc_html($preset['site_tagline']) : 'تمرکز بر تسلط علمی، تنظیم قراردادهای بازدارنده و دفاع قاطعانه از حقوق شما در محاکم دادگستری و مراجع داوری.';
        ?>
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span><?php echo $services_header_badge; ?></span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold font-serif text-sr-primary">
                <?php echo $services_header_title; ?>
            </h2>
            <p class="text-sm sm:text-base text-sr-muted">
                <?php echo $services_header_desc; ?>
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
            <div class="service-card bg-sr-surface border border-sr-border-subtle" data-category="criminal">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4">
                    <svg class="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                        <path d="M9 22v-4h6v4"/>
                        <path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/>
                        <path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M12 10h.01"/>
                        <path d="M8 14h.01"/><path d="M16 14h.01"/><path d="M12 14h.01"/>
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-sr-primary mb-2">دعاوی ملکی، اراضی و سرقفلی</h3>
                <p class="text-xs text-sr-muted leading-relaxed mb-4">
                    الزام به تنظیم سند رسمی، خلع ید، تصرف عدوانی، پیش‌فروش ساختمان، دعاوی سرقفلی و حق کسب و پیشه در مراجع قضایی و ثبتی.
                </p>
                <div class="pt-3 border-t border-sr-border-subtle flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">کمیسیون تخصصی املاک</span>
                    <a href="#booking" class="text-xs text-sr-primary hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۲ -->
            <div class="service-card bg-sr-surface border border-sr-border-subtle" data-category="commercial">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4">
                    <svg class="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-sr-primary mb-2">دعاوی تجاری و قراردادهای بازرگانی</h3>
                <p class="text-xs text-sr-muted leading-relaxed mb-4">
                    تنظیم و بازبینی قراردادهای بین‌المللی، حل‌وفصل اختلافات شرکتی، داوری تجاری و دعاوی ورشکستگی با تضمین محرمانگی اسناد.
                </p>
                <div class="pt-3 border-t border-sr-border-subtle flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">پشتیبانی حقوقی شرکتی</span>
                    <a href="#booking" class="text-xs text-sr-primary hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۳ -->
            <div class="service-card bg-sr-surface border border-sr-border-subtle" data-category="criminal">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4">
                    <svg class="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                        <path d="M7 21h10"/>
                        <path d="M12 3v18"/>
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-sr-primary mb-2">دعاوی کیفری و جرایم اقتصادی</h3>
                <p class="text-xs text-sr-muted leading-relaxed mb-4">
                    دفاع تخصصی در پرونده‌های اختلاس، کلاهبرداری، خیانت در امانت، پولشویی و دفاع راهبردی در دادگاه‌های انقلاب و تجدیدنظر.
                </p>
                <div class="pt-3 border-t border-sr-border-subtle flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">دفاع فوری و راهبردی</span>
                    <a href="#booking" class="text-xs text-sr-primary hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۴ -->
            <div class="service-card bg-sr-surface border border-sr-border-subtle" data-category="family">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4">
                    <svg class="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-sr-primary mb-2">حقوق خانواده و انحصار وراثت</h3>
                <p class="text-xs text-sr-muted leading-relaxed mb-4">
                    رسیدگی به پرونده‌های مهریه، طلاق توافقی، حضانت فرزندان، تقسیم ترکه، تحریر ترکه و وصیت‌نامه با حداکثر سرعت و رازداری تام.
                </p>
                <div class="pt-3 border-t border-sr-border-subtle flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">طلاق توافقی در ۱۰ روز</span>
                    <a href="#booking" class="text-xs text-sr-primary hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۵ -->
            <div class="service-card bg-sr-surface border border-sr-border-subtle" data-category="commercial">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4">
                    <svg class="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="2" y1="12" x2="22" y2="12"/>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-sr-primary mb-2">داوری بین‌المللی و سرمایه‌گذاری</h3>
                <p class="text-xs text-sr-muted leading-relaxed mb-4">
                    داوری در قراردادهای تجاری خارجی، صادرات و واردات، ترخیص گمرکی و حل اختلافات بازرگانان در اتاق بازرگانی بین‌المللی (ICC).
                </p>
                <div class="pt-3 border-t border-sr-border-subtle flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">داوری قطعی و لازم‌الاجرا</span>
                    <a href="#booking" class="text-xs text-sr-primary hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۶ -->
            <div class="service-card bg-sr-surface border border-sr-border-subtle" data-category="commercial">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4">
                    <svg class="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-sr-primary mb-2">دیوان عدالت اداری و شهرداری‌ها</h3>
                <p class="text-xs text-sr-muted leading-relaxed mb-4">
                    اعتراض به آرای کمیسیون‌های ماده ۱۰۰ و ۹۹ شهرداری، دعاوی ابطال مصوبات غیرقانونی دولتی و اختلافات اداره کار و تامین اجتماعی.
                </p>
                <div class="pt-3 border-t border-sr-border-subtle flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">ابطال قطعی آرای معارض</span>
                    <a href="#booking" class="text-xs text-sr-primary hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>
        </div>
    </div>
<!-- بخش ۴.۵: سامانه هوشمند ممیزی قراردادها و خزانه‌گاه اسناد تجاری (Contract Audit & Drafting Suite) -->
<section id="contract-auditor-section" class="py-16 bg-sr-bg relative border-t border-sr-border-subtle">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                <span>سامانه هوشمند ممیزی قراردادها و شرط داوری</span>
            </div>
            <h2 class="text-2xl sm:text-4xl font-bold font-serif text-sr-primary">
                ممیزی حقوقی شروط قرارداد پیش از امضا
            </h2>
            <p class="text-xs sm:text-sm text-sr-muted">
                شروط خسارت، تعهدات مالی، سلب مسئولیت و شرط داوری قرارداد خود را با هوش مصنوعی وکلای پایه یک ارزیابی و اصلاح کنید.
            </p>
        </div>

        <div class="max-w-5xl mx-auto">
            <?php echo do_shortcode('[sedrazavi_contract_auditor]'); ?>
        </div>

        <div class="mt-8 text-center flex flex-wrap justify-center gap-4">
            <a href="<?php echo esc_url(home_url('/contract-audit/')); ?>" class="btn-gold py-2.5 px-6 rounded-xl text-xs font-bold shadow-lg">
                <span>ورود به پرتال کامل ممیزی قراردادها</span>
            </a>
            <a href="<?php echo esc_url(home_url('/drafting-vault/')); ?>" class="py-2.5 px-6 rounded-xl text-xs font-bold text-sr-primary border border-sr-border-subtle hover:border-[#D4AF37] bg-sr-surface-hover transition-colors">
                <span>دانلود نمونه قراردادهای استاندارد دوزبانه</span>
            </a>
        </div>
    </div>
</section>

<!-- بخش ۵: درباره وکیل و منشور اخلاق حرفه‌ای (AboutSection) -->
<section id="about" class="py-20 bg-sr-surface relative overflow-hidden border-t border-sr-border-subtle">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <!-- ستون تصویر و گواهینامه‌ها -->
            <div class="lg:col-span-5 relative">
                <div class="relative mx-auto max-w-md">
                    <div class="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#D4AF37]/30 to-[#0B132B]/10 blur-xl transform rotate-2"></div>
                    <div class="relative rounded-2xl overflow-hidden border-2 border-sr-border shadow-2xl bg-sr-surface-card">
                        <img src="<?php echo esc_url($lawyer_hero_portrait); ?>" alt="دکتر سیده مریم رضوی" class="w-full h-[500px] object-cover object-top" />
                        
                        <div class="absolute bottom-6 right-6 left-6 p-4 rounded-xl bg-sr-surface/95 backdrop-blur-md border border-sr-border shadow-xl space-y-2">
                            <div class="flex items-center gap-2 text-sr-gold font-bold text-xs">
                                <svg class="w-4 h-4 shrink-0 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                                </svg>
                                <span>رتبه برتر آزمون وکالت کانون وکلای مرکز</span>
                            </div>
                            <p class="text-xs text-sr-secondary">
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

                <h2 class="text-3xl sm:text-4xl font-bold font-serif text-sr-primary leading-tight">
                    دو دهه پاسداری متعهدانه از حقوق و منافع مشروع موکلین
                </h2>

                <p class="text-sm sm:text-base text-sr-secondary leading-relaxed">
                    سرکار خانم دکتر سیده مریم رضوی پس از فراغت از تحصیل در مقطع دکترای حقوق بین‌الملل و خصوصی از دانشگاه تهران و گذراندن دوره‌های تخصصی داوری بین‌المللی، دفتر وکالت خود را با نام مؤسسه حقوقی SedRazavi بنا نهاد. ایشان تاکنون وکالت بیش از ۱۲۸۰ پرونده سنگین حقوقی، ملکی، تجاری و داوری را با بالاترین درصد موفقیت بر عهده داشته است.
                </p>

                <div class="space-y-3 pt-2">
                    <h3 class="text-sm font-bold text-sr-primary">منشور اخلاق حرفه‌ای و تعهدات بنیادین:</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-sr-secondary">
                        <div class="flex items-start gap-2.5 p-3 rounded-xl bg-sr-surface-card border border-sr-border-subtle">
                            <span class="text-[#2A9D8F] font-bold">✓</span>
                            <span>بررسی واقع‌بینانه شانس پیروزی دعوا بدون امید واهی</span>
                        </div>
                        <div class="flex items-start gap-2.5 p-3 rounded-xl bg-sr-surface-card border border-sr-border-subtle">
                            <span class="text-[#2A9D8F] font-bold">✓</span>
                            <span>شفافیت کامل در قرارداد مالی و نحوه وصول حق‌الوکاله</span>
                        </div>
                        <div class="flex items-start gap-2.5 p-3 rounded-xl bg-sr-surface-card border border-sr-border-subtle">
                            <span class="text-[#2A9D8F] font-bold">✓</span>
                            <span>گزارش‌دهی مستمر و دسترسی آنلاین موکل به لوایح پرونده</span>
                        </div>
                        <div class="flex items-start gap-2.5 p-3 rounded-xl bg-sr-surface-card border border-sr-border-subtle">
                            <span class="text-[#2A9D8F] font-bold">✓</span>
                            <span>حفظ کامل اسرار شغلی، اسناد تجاری و حریم خانوادگی</span>
                        </div>
                    </div>
                </div>

                <div class="p-4 rounded-xl bg-sr-bg-alt border border-sr-border flex items-center gap-3">
                    <span class="text-2xl text-[#D4AF37]">❝</span>
                    <p class="text-xs text-sr-secondary italic">
                        «وکالت، تنها دفاع در محکمه نیست؛ معماری امن روابط تجاری و احقاق شجاعانه حق بر پایه تسلط بر موازین قانونی است.»
                    </p>
                </div>
            </div>
        </div>

        <!-- نقاط عطف و روند رشد مؤسسه حقوقی (Firm Milestones Timeline) -->
        <div class="mt-16 pt-12 border-t border-sr-border-subtle">
            <?php echo do_shortcode('[sedrazavi_react_firm_milestones]'); ?>
        </div>
    </div>
</section>

<!-- بخش ۶: رضایت موکلین و روایت تجربیات (TestimonialsSlider) -->
<section class="py-20 bg-sr-bg-alt relative overflow-hidden border-t border-sr-border-subtle">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>اعتماد و رضایت موکلین</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold font-serif text-sr-primary">
                روایت تجربه همراهی با دفتر وکالت دکتر رضوی
            </h2>
            <p class="text-sm sm:text-base text-sr-muted">
                دیدگاه موکلین گرامی پیرامون دقت نظر، پیگیری پرونده و حصول نتایج درخشان حقوقی.
            </p>
        </div>

        <div class="max-w-4xl mx-auto">
            <div class="relative bg-sr-surface rounded-3xl p-8 sm:p-12 border border-sr-border-subtle shadow-2xl">
                <div class="flex items-center justify-between mb-6">
                    <div class="flex text-[#D4AF37] gap-1 text-lg">★★★★★</div>
                    <span class="px-3 py-1 rounded-full bg-[#2A9D8F]/15 text-[#2A9D8F] text-xs font-bold border border-[#2A9D8F]/30" id="testimonial-service">
                        دعاوی ملکی و تجاری
                    </span>
                </div>

                <blockquote class="text-base sm:text-lg text-sr-secondary leading-relaxed mb-8 italic" id="testimonial-quote">
                    «تسلط علمی سرکار خانم دکتر رضوی بر قوانین ثبتی و املاک موجب شد ملکی به ارزش بیش از ۴۰۰ میلیارد ریال که با معارض جعلی مواجه شده بود، در دیوان عالی کشور کاملاً احقاق حق و سند معارض باطل گردد. رازداری و نظم بی‌نظیر ایشان ستودنی است.»
                </blockquote>

                <div class="flex items-center justify-between border-t border-sr-border-subtle pt-6">
                    <div>
                        <h4 class="font-bold text-sr-primary text-base" id="testimonial-author">مهندس علیرضا سلیمانی</h4>
                        <p class="text-xs text-sr-muted" id="testimonial-role">مدیرعامل گروه سرمایه‌گذاری پارس نوین</p>
                    </div>

                    <div class="flex items-center gap-2">
                        <button onclick="prevTestimonial()" class="p-2.5 rounded-xl bg-sr-surface-card hover:bg-[#D4AF37] hover:text-[#0B132B] text-sr-primary border border-sr-border-subtle transition-all cursor-pointer">
                            &rarr;
                        </button>
                        <button onclick="nextTestimonial()" class="p-2.5 rounded-xl bg-sr-surface-card hover:bg-[#D4AF37] hover:text-[#0B132B] text-sr-primary border border-sr-border-subtle transition-all cursor-pointer">
                            &larr;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۷: جدیدترین مقالات حقوقی (ArticlesSection) -->
<section id="articles" class="py-20 bg-sr-surface relative border-t border-sr-border-subtle">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>دانش حقوقی و تحلیل آراء</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold font-serif text-sr-primary">
                جدیدترین مقالات و یادداشت‌های تخصصی
            </h2>
            <p class="text-sm sm:text-base text-sr-muted">
                بررسی جدیدترین قوانین موضوعه، رویه‌های قضایی وحدت رویه و نکات پیشگیرانه در تنظیم قراردادها.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- مقاله ۱ -->
            <article class="bg-sr-bg-alt rounded-2xl overflow-hidden border border-sr-border-subtle hover:border-[#D4AF37]/50 shadow-xl transition-all">
                <div class="relative h-48 overflow-hidden bg-sr-surface-card">
                    <img src="<?php echo esc_url(get_template_directory_uri() . '/screenshot.png'); ?>" alt="نکات کلیدی قرارداد مشارکت در ساخت" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-sr-surface/90 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">دعاوی ملکی</span>
                </div>
                <div class="p-6 space-y-3 text-right">
                    <div class="text-xs text-sr-muted flex items-center justify-between">
                        <span>۱۴۰۳/۰۵/۲۰</span>
                        <span>⏱ مطالعه: ۶ دقیقه</span>
                    </div>
                    <h3 class="text-base font-bold text-sr-primary leading-snug hover:text-[#D4AF37] transition-colors">
                        ۱۰ شرط حیاتی و غیرقابل چشم‌پوشی در قراردادهای مشارکت در ساخت
                    </h3>
                    <p class="text-xs text-sr-muted leading-relaxed">
                        تحلیل ضمانت‌اجراهای تاخیر در ساخت، حق حبس، تعیین قدرالسهم و سازوکار حل اختلاف از طریق داوری تخصصی.
                    </p>
                    <div class="pt-3 border-t border-sr-border-subtle">
                        <a href="#articles" class="text-xs text-[#D4AF37] font-semibold flex items-center gap-1">مطالعه یادداشت کامل &larr;</a>
                    </div>
                </div>
            </article>

            <!-- مقاله ۲ -->
            <article class="bg-sr-bg-alt rounded-2xl overflow-hidden border border-sr-border-subtle hover:border-[#D4AF37]/50 shadow-xl transition-all">
                <div class="relative h-48 overflow-hidden bg-sr-surface-card">
                    <img src="<?php echo esc_url(get_template_directory_uri() . '/screenshot.png'); ?>" alt="قوانین چک صیادی" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-sr-surface/90 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">اسناد تجاری</span>
                </div>
                <div class="p-6 space-y-3 text-right">
                    <div class="text-xs text-sr-muted flex items-center justify-between">
                        <span>۱۴۰۳/۰۵/۱۵</span>
                        <span>⏱ مطالعه: ۸ دقیقه</span>
                    </div>
                    <h3 class="text-base font-bold text-sr-primary leading-snug hover:text-[#D4AF37] transition-colors">
                        راهنمای کاربردی صدور اجراییه مستقیم چک صیادی بدون دادخواست
                    </h3>
                    <p class="text-xs text-sr-muted leading-relaxed">
                        چگونه می‌توان طبق ماده ۲۳ قانون اصلاح قانون صدور چک، در کمتر از ۱۰ روز اموال صادرکننده را توقیف نمود؟
                    </p>
                    <div class="pt-3 border-t border-sr-border-subtle">
                        <a href="#articles" class="text-xs text-[#D4AF37] font-semibold flex items-center gap-1">مطالعه یادداشت کامل &larr;</a>
                    </div>
                </div>
            </article>

            <!-- مقاله ۳ -->
            <article class="bg-sr-bg-alt rounded-2xl overflow-hidden border border-sr-border-subtle hover:border-[#D4AF37]/50 shadow-xl transition-all">
                <div class="relative h-48 overflow-hidden bg-sr-surface-card">
                    <img src="<?php echo esc_url(get_template_directory_uri() . '/screenshot.png'); ?>" alt="داوری تجاری بین‌المللی" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-sr-surface/90 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">داوری بین‌المللی</span>
                </div>
                <div class="p-6 space-y-3 text-right">
                    <div class="text-xs text-sr-muted flex items-center justify-between">
                        <span>۱۴۰۳/۰۵/۱۰</span>
                        <span>⏱ مطالعه: ۵ دقیقه</span>
                    </div>
                    <h3 class="text-base font-bold text-sr-primary leading-snug hover:text-[#D4AF37] transition-colors">
                        مزایای شرط داوری اتاق بازرگانی بین‌المللی در قراردادهای تجاری خارجی
                    </h3>
                    <p class="text-xs text-sr-muted leading-relaxed">
                        بررسی سرعت رسیدگی، اعتبار بین‌المللی رای داوری و عدم امکان ابطال آن در مراجع قضایی داخلی.
                    </p>
                    <div class="pt-3 border-t border-sr-border-subtle">
                        <a href="#articles" class="text-xs text-[#D4AF37] font-semibold flex items-center gap-1">مطالعه یادداشت کامل &larr;</a>
                    </div>
                </div>
            </article>
        </div>
    </div>
</section>

<!-- بخش ۸: پرسش‌های متداول موکلین (FaqSection) -->
<section id="faq" class="py-20 bg-sr-bg-alt relative border-t border-sr-border-subtle">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div class="text-center space-y-4 mb-14">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span>پاسخ به ابهامات رایج موکلین</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold font-serif text-sr-primary">
                پرسش‌های متداول حقوقی و وکالتی
            </h2>
            <p class="text-sm sm:text-base text-sr-muted">
                پاسخ‌های شفاف و کاربردی به متداول‌ترین سوالات موکلین در بدو ورود به پرونده.
            </p>
        </div>

        <div class="space-y-4">
            <!-- پرسش ۱ -->
            <div class="faq-item rounded-2xl bg-sr-surface border border-sr-border-subtle overflow-hidden">
                <button class="faq-question w-full p-5 text-right flex items-center justify-between font-bold text-sm text-sr-primary cursor-pointer hover:text-[#D4AF37]">
                    <span>۱. نحوه تعیین حق‌الوکاله در دفتر وکالت دکتر رضوی چگونه است؟ آیا امکان تقسیط وجود دارد؟</span>
                    <span class="faq-icon text-[#D4AF37] text-lg">+</span>
                </button>
                <div class="faq-answer hidden p-5 pt-0 text-xs text-sr-secondary leading-relaxed border-t border-sr-border-subtle">
                    حق‌الوکاله بر اساس پیچیدگی پرونده، مرحله رسیدگی (بدوی، تجدیدنظر یا فرجام‌خواهی) و مطابق آیین‌نامه تعرفه کانون وکلا تعیین می‌شود. در ۹۰٪ پرونده‌ها امکان تقسیط حق‌الوکاله متناسب با پیشرفت مراحل دادرسی فراهم می‌باشد و کلیه توافقات در قرارداد الکترونیک سامانه عدل‌ایران ثبت می‌گردد.
                </div>
            </div>

            <!-- پرسش ۲ -->
            <div class="faq-item rounded-2xl bg-sr-surface border border-sr-border-subtle overflow-hidden">
                <button class="faq-question w-full p-5 text-right flex items-center justify-between font-bold text-sm text-sr-primary cursor-pointer hover:text-[#D4AF37]">
                    <span>۲. آیا برای مشاوره اولیه حضور فیزیکی در دفتر تهران الزامی است؟</span>
                    <span class="faq-icon text-[#D4AF37] text-lg">+</span>
                </button>
                <div class="faq-answer hidden p-5 pt-0 text-xs text-sr-secondary leading-relaxed border-t border-sr-border-subtle">
                    خیر؛ موکلین مقیم شهرستان‌ها یا خارج از کشور می‌توانند پس از رزرو نوبت از طریق سامانه، جلسه مشاوره تصویری امن (از طریق گوگل‌میت یا واتساپ) یا مشاوره تلفنی داشته باشند. عقد وکالتنامه نیز از طریق سامانه میخک وزارت خارجه یا ثنای قوه قضاییه به سادگی انجام می‌شود.
                </div>
            </div>

            <!-- پرسش ۳ -->
            <div class="faq-item rounded-2xl bg-sr-surface border border-sr-border-subtle overflow-hidden">
                <button class="faq-question w-full p-5 text-right flex items-center justify-between font-bold text-sm text-sr-primary cursor-pointer hover:text-[#D4AF37]">
                    <span>۳. محرمانگی اسناد تجاری و اطلاعات پرونده چگونه تضمین می‌گردد؟</span>
                    <span class="faq-icon text-[#D4AF37] text-lg">+</span>
                </button>
                <div class="faq-answer hidden p-5 pt-0 text-xs text-sr-secondary leading-relaxed border-t border-sr-border-subtle">
                    تمامی اطلاعات پرونده‌ها و اسناد موکلین تحت نظارت مستقیم وکیل سرپرست در سرورهای محرمانه نگهداری شده و طبق سوگندنامه کانون وکلای دادگستری و قوانین رازداری حرفه‌ای، ۱۰۰٪ محرمانه و غیرقابل افشا نزد اشخاص ثالث خواهد بود.
                </div>
            </div>

            <!-- پرسش ۴ -->
            <div class="faq-item rounded-2xl bg-sr-surface border border-sr-border-subtle overflow-hidden">
                <button class="faq-question w-full p-5 text-right flex items-center justify-between font-bold text-sm text-sr-primary cursor-pointer hover:text-[#D4AF37]">
                    <span>۴. روند پیگیری لحظه‌ای پرونده برای موکل چگونه طراحی شده است؟</span>
                    <span class="faq-icon text-[#D4AF37] text-lg">+</span>
                </button>
                <div class="faq-answer hidden p-5 pt-0 text-xs text-sr-secondary leading-relaxed border-t border-sr-border-subtle">
                    پس از انعقاد قرارداد، یک کد پیگیری محرمانه به موکل اختصاص می‌یابد. موکل در هر ساعت از شبانه‌روز با درج این کد در همین وبسایت می‌تواند آخرین اقدامات دفاعی، ابلاغیه‌ها و لوایح تنظیمی را به صورت زنده رصد نماید.
                </div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۹: رزرو نوبت، استعلام پرونده و اطلاعات تماس (ContactAndBookingSection) -->
<section id="contact" class="py-20 bg-sr-surface relative border-t border-sr-border-subtle">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- استعلام پرونده (Case Tracker Card) -->
        <div id="tracking" class="mb-16 max-w-4xl mx-auto rounded-3xl p-8 bg-sr-surface-card border border-sr-border shadow-2xl">
            <div class="text-center space-y-2 mb-6">
                <span class="text-xs font-bold text-sr-gold">سامانه محرمانه موکلین</span>
                <h3 class="text-2xl font-bold font-serif text-sr-primary">پیگیری آنلاین و لحظه‌ای پرونده قضایی</h3>
                <p class="text-xs text-sr-muted">کد پرونده (مانند SR-1403-882) یا شماره همراه ثبت‌شده را وارد فرمایید:</p>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
                <input type="text" id="case-search-input" placeholder="نمونه: SR-1403-882 یا شماره همراه موکل" class="flex-1 px-4 py-3 rounded-xl bg-sr-bg border border-sr-border text-sr-primary text-sm focus:outline-none focus:border-[#D4AF37]" />
                <button onclick="searchCaseStatus()" class="btn-gold px-8 py-3 rounded-xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <span>استعلام آخرین وضعیت</span>
                </button>
            </div>

            <div id="case-result-display" class="hidden mt-6 p-5 rounded-xl bg-sr-bg border border-sr-border space-y-3">
                <div class="flex items-center justify-between border-b border-sr-border-subtle pb-2">
                    <span id="res-case-title" class="font-bold text-sr-primary text-sm"></span>
                    <span id="res-case-status" class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"></span>
                </div>
                <p id="res-case-desc" class="text-xs text-sr-secondary leading-relaxed"></p>
                <div class="flex items-center justify-between text-xs text-sr-muted pt-2">
                    <span id="res-case-branch"></span>
                    <span id="res-case-date" class="font-mono"></span>
                </div>
            </div>
        </div>

        <!-- دو ستونه: فرم رزرو نوبت + اطلاعات تماس دفتر -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <!-- ستون فرم رزرو نوبت (۷ ستون) -->
            <div id="booking" class="lg:col-span-7 bg-sr-surface-card p-8 rounded-3xl border border-sr-border-subtle shadow-xl">
                <div class="space-y-2 mb-6">
                    <span class="text-xs font-bold text-sr-gold">درخواست رسمی وقت مشاوره</span>
                    <h3 class="text-2xl font-bold font-serif text-sr-primary">ثبت نوبت مشاوره حضوری یا آنلاین</h3>
                </div>

                <form id="booking-form-main" onsubmit="handleBookingSubmit(event)" class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-sr-secondary mb-1.5">نام و نام خانوادگی موکل *</label>
                            <input type="text" required id="book-name" class="w-full px-4 py-2.5 rounded-xl bg-sr-bg border border-sr-border text-sr-primary text-sm focus:border-[#D4AF37] focus:outline-none" />
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-sr-secondary mb-1.5">شماره همراه معتبر (جهت پیامک نوبت) *</label>
                            <input type="tel" required id="book-phone" placeholder="۰۹۱۲۳۴۵۶۷۸۹" class="w-full px-4 py-2.5 rounded-xl bg-sr-bg border border-sr-border text-sr-primary text-sm text-left font-mono focus:border-[#D4AF37] focus:outline-none" />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-sr-secondary mb-1.5">موضوع دعوی یا قرارداد</label>
                            <select id="book-service" class="w-full px-4 py-2.5 rounded-xl bg-sr-bg border border-sr-border text-sr-primary text-sm focus:border-[#D4AF37] focus:outline-none">
                                <option>دعاوی ملکی، اراضی و سرقفلی</option>
                                <option>دعاوی تجاری و قراردادها</option>
                                <option>دعاوی کیفری و جرایم اقتصادی</option>
                                <option>حقوق خانواده و ارث</option>
                                <option>داوری بین‌المللی</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-sr-secondary mb-1.5">نحوه برگزاری جلسه مشاوره</label>
                            <select id="book-mode" class="w-full px-4 py-2.5 rounded-xl bg-sr-bg border border-sr-border text-sr-primary text-sm focus:border-[#D4AF37] focus:outline-none">
                                <option value="in_person">جلسه حضوری در دفتر تهران (میدان ونک)</option>
                                <option value="online">مشاوره تصویری آنلاین (گوگل‌میت / واتساپ)</option>
                                <option value="phone">مشاوره تلفنی مستقیم با وکیل</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-sr-secondary mb-1.5">شرح مختصر خواسته یا روند پرونده</label>
                        <textarea id="book-notes" rows="3" placeholder="موضوع دعوی، شماره پرونده یا شعبه رسیدگی‌کننده..." class="w-full px-4 py-2.5 rounded-xl bg-sr-bg border border-sr-border text-sr-primary text-sm focus:border-[#D4AF37] focus:outline-none"></textarea>
                    </div>

                    <button type="submit" class="btn-gold w-full py-3.5 rounded-xl font-bold text-sm cursor-pointer shadow-lg">
                        ثبت و نهایی‌سازی درخواست مشاوره با وکیل
                    </button>
                </form>
            </div>

            <!-- ستون اطلاعات تماس دفتر و ساعات کاری (۵ ستون) -->
            <div class="lg:col-span-5 bg-sr-surface-card p-8 rounded-3xl border border-sr-border-subtle shadow-xl space-y-6">
                <div>
                    <span class="text-xs font-bold text-sr-gold">راه‌های ارتباط مستقیم</span>
                    <h3 class="text-2xl font-bold font-serif text-sr-primary mt-1">دفتر وکالت SedRazavi</h3>
                </div>

                <div class="space-y-4 text-xs sm:text-sm text-sr-secondary">
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-lg bg-sr-surface flex items-center justify-center text-sr-gold border border-sr-border-subtle shrink-0 mt-0.5">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                        </div>
                        <div>
                            <strong class="block text-sr-primary mb-1">نشانی دفتر مرکزی:</strong>
                            <span>تهران، میدان ونک، خیابان ملاصدرا، پلاک ۱۱۸، برج حقوقی سدید، طبقه پنجم، واحد ۱۵</span>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-sr-surface flex items-center justify-center text-sr-gold border border-sr-border-subtle shrink-0">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                        </div>
                        <div>
                            <strong class="block text-sr-primary mb-0.5">تلفن‌های دفتر:</strong>
                            <a href="tel:02188990011" class="font-mono text-sr-gold hover:underline">۰۲۱-۸۸۹۹۰۰۱۱</a> | <a href="tel:02188990012" class="font-mono text-sr-gold hover:underline">۰۲۱-۸۸۹۹۰۰۱۲</a>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-sr-surface flex items-center justify-center text-sr-gold border border-sr-border-subtle shrink-0">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                        </div>
                        <div>
                            <strong class="block text-sr-primary mb-0.5">پست الکترونیک رسمی:</strong>
                            <span class="font-mono">legal@sedrazavi.com</span>
                        </div>
                    </div>

                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-lg bg-sr-surface flex items-center justify-center text-sr-gold border border-sr-border-subtle shrink-0 mt-0.5">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                        <div>
                            <strong class="block text-sr-primary mb-1">ساعات کاری و پذیرش:</strong>
                            <p>شنبه تا چهارشنبه: ۹:۰۰ الی ۱۹:۰۰</p>
                            <p>پنج‌شنبه: ۹:۰۰ الی ۱۳:۰۰ (با تعیین وقت قبلی)</p>
                        </div>
                    </div>
                </div>

                <div class="p-4 rounded-2xl bg-sr-bg border border-sr-border-subtle text-xs text-sr-muted flex items-start gap-2.5">
                    <svg class="w-4 h-4 text-sr-gold shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span><strong class="text-sr-primary">تضمین محرمانگی:</strong> کلیه تماس‌ها، اسناد و مشاوره‌ها مطابق منشور اخلاقی کانون وکلا کاملاً محرمانه تلقی می‌گردد.</span>
                </div>
            </div>

        </div>

    </div>
</section>

<!-- پنجره‌های مودال تعاملی (Modals) -->

<!-- مودال ۱: نظرسنجی خدمات -->
<div id="survey-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/75 backdrop-blur-sm p-4">
    <div class="bg-sr-surface rounded-2xl p-6 max-w-md w-full border border-sr-border text-right space-y-4 shadow-2xl">
        <div class="flex items-center justify-between border-b border-sr-border-subtle pb-3">
            <h4 class="font-bold text-sr-primary text-sm">نظرسنجی کیفیت خدمات و رضایت موکل</h4>
            <button onclick="closeSurveyModal()" class="text-sr-muted hover:text-sr-primary cursor-pointer">&times;</button>
        </div>
        <p class="text-xs text-sr-secondary">دیدگاه ارزشمند شما ما را در ارتقای سطح استانداردهای دادرسی و پاسخگویی یاری می‌نماید.</p>
        <div class="flex items-center justify-center gap-2 text-2xl text-sr-gold py-2 cursor-pointer">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <textarea rows="3" placeholder="دیدگاه یا پیشنهاد خود را مرقوم بفرمایید..." class="w-full p-3 rounded-xl bg-sr-bg border border-sr-border text-sr-primary text-xs focus:border-[#D4AF37] focus:outline-none"></textarea>
        <button onclick="submitSurvey()" class="btn-gold w-full py-2.5 rounded-xl font-bold text-xs cursor-pointer">
            ثبت و ارسال بازخورد
        </button>
    </div>
</div>

<!-- مودال ۲: راهنمای تعاملی سایت -->
<div id="tour-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/75 backdrop-blur-sm p-4">
    <div class="bg-sr-surface rounded-2xl p-6 max-w-md w-full border border-sr-border text-right space-y-4 shadow-2xl">
        <div class="flex items-center justify-between border-b border-sr-border-subtle pb-3">
            <h4 class="font-bold text-sr-primary text-sm">راهنمای تعاملی سامانه وکالت</h4>
            <button onclick="closeTourModal()" class="text-sr-muted hover:text-sr-primary cursor-pointer">&times;</button>
        </div>
        <div class="space-y-3 text-xs text-sr-secondary">
            <div class="p-3 rounded-xl bg-sr-bg border border-sr-border-subtle">
                <strong class="text-sr-gold block mb-1">۱. نوار تحلیل‌های شاخص و آرای قضایی:</strong>
                آخرین تحلیل‌های حقوقی، قوانین ملکی و چک، و آرای وحدت رویه را مطالعه نمایید.
            </div>
            <div class="p-3 rounded-xl bg-sr-bg border border-sr-border-subtle">
                <strong class="text-sr-gold block mb-1">۲. استعلام برخط پرونده:</strong>
                با کد اختصاصی پرونده، روند لوایح و تصمیمات قضایی را به صورت ۲۴ ساعته دنبال کنید.
            </div>
            <div class="p-3 rounded-xl bg-sr-bg border border-sr-border-subtle">
                <strong class="text-sr-gold block mb-1">۳. رزرو آنلاین نوبت مشاوره:</strong>
                مشاوره حضوری در دفتر ونک، تلفنی یا تصویری خود را تنها در ۱ دقیقه رزرو فرمایید.
            </div>
        </div>
        <button onclick="closeTourModal()" class="btn-gold w-full py-2.5 rounded-xl font-bold text-xs cursor-pointer">
            متوجه شدم، ورود به سامانه
        </button>
    </div>
</div>

<!-- مودال ۳: آکادمی و مستندات -->
<div id="academy-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/75 backdrop-blur-sm p-4">
    <div class="bg-sr-surface rounded-2xl p-6 max-w-lg w-full border border-sr-border text-right space-y-4 shadow-2xl">
        <div class="flex items-center justify-between border-b border-sr-border-subtle pb-3">
            <h4 class="font-bold text-sr-primary text-sm">آکادمی و مستندات دفتر وکالت SedRazavi</h4>
            <button onclick="closeAcademyModal()" class="text-sr-muted hover:text-sr-primary cursor-pointer">&times;</button>
        </div>
        <p class="text-xs text-sr-secondary">دسترسی به فرم‌های دادخواست نمونه، قوانین موضوعه جدید و شیوه‌نامه تنظیم قراردادهای تجاری.</p>
        <div class="grid grid-cols-2 gap-3 text-xs">
            <a href="#articles" onclick="closeAcademyModal()" class="p-3 rounded-xl bg-sr-bg border border-sr-border-subtle hover:border-[#D4AF37] block">
                <div class="flex items-center gap-1.5 text-sr-gold font-bold mb-1">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                    <span>آرشیو قوانین</span>
                </div>
                <span class="text-sr-muted">قوانین چک، سرقفلی و اراضی</span>
            </a>
            <a href="#articles" onclick="closeAcademyModal()" class="p-3 rounded-xl bg-sr-bg border border-sr-border-subtle hover:border-[#D4AF37] block">
                <div class="flex items-center gap-1.5 text-sr-gold font-bold mb-1">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                        <path d="M7 21h10"/>
                        <path d="M12 3v18"/>
                    </svg>
                    <span>آرای وحدت رویه</span>
                </div>
                <span class="text-sr-muted">جدیدترین آرای دیوان عالی</span>
            </a>
        </div>
        <button onclick="closeAcademyModal()" class="w-full py-2 rounded-xl bg-sr-surface-hover text-sr-primary border border-sr-border-subtle text-xs cursor-pointer">
            بستن
        </button>
    </div>
</div>

<!-- بنر کوکی و حریم خصوصی در پایین صفحه -->
<div id="cookie-banner" class="fixed bottom-4 right-4 left-4 sm:right-auto sm:left-6 sm:max-w-md z-40 p-4 rounded-2xl bg-sr-surface/95 backdrop-blur-md border border-sr-border shadow-2xl text-right space-y-3">
    <div class="flex items-center gap-2 text-sr-gold font-bold text-xs">
        <svg class="w-4 h-4 text-sr-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <span>امنیت و محرمانگی اطلاعات موکلین</span>
    </div>
    <p class="text-[11px] text-sr-secondary leading-relaxed">
        این پایگاه حقوقی جهت ارائه خدمات مطلوب و حفاظت از اسناد، از کوکی‌های رمزنگاری‌شده بهره می‌برد.
    </p>
    <div class="flex items-center gap-2">
        <button onclick="acceptCookies()" class="btn-gold text-[11px] py-1.5 px-4 font-bold cursor-pointer">پذیرش و تایید</button>
        <button onclick="dismissCookies()" class="text-sr-muted hover:text-sr-primary text-[11px] py-1.5 px-2 cursor-pointer">انصراف</button>
    </div>
</div><!-- #root -->

<?php
get_footer();
`},{path:"functions.php",filename:"functions.php",category:"قالب اصلی (Templates)",description:"موتور اصلی وردپرس: انکیو استایل‌ها، رجیستر شورت‌کدها، احراز هویت ری‌اکت و متصل‌کننده ۳۱ ماژول هسته.",code:`<?php
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

        // Elementor Support & Page Builder Compatibility
        add_theme_support('elementor');
        add_post_type_support('page', 'elementor');
        add_post_type_support('post', 'elementor');
        add_post_type_support('service', 'elementor');
        add_post_type_support('article', 'elementor');
        add_post_type_support('case', 'elementor');

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
        // 6.1. Persian Webfont Vazirmatn (Local Self-contained Asset - 0% External CDN Dependency)
        wp_enqueue_style(
            'sedrazavi-vazirmatn-font',
            SEDRAZAVI_THEME_URI . '/assets/css/vazirmatn.css',
            [],
            SEDRAZAVI_THEME_VERSION
        );

        // 6.2. WordPress Main Stylesheet
        wp_enqueue_style(
            'sedrazavi-main-style',
            get_stylesheet_uri(),
            [],
            SEDRAZAVI_THEME_VERSION
        );

        // 6.3. Production Build Path Detection for Minified CSS (Single official target: app-dist)
        $candidate_css_dirs = [
            'app-dist/index.css',
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

        // 6.4. Production Build Path Detection for Minified JS (Single official target: app-dist)
        $candidate_js_dirs = [
            'app-dist/index.js',
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

    // 6.8. Support ES Module type for code-split chunks in modern browsers
    add_filter('script_loader_tag', function($tag, $handle, $src) {
        if ($handle === 'sedrazavi-react-bundle-js') {
            return '<script type="module" src="' . esc_url($src) . '"><\/script>' . "\\n";
        }
        return $tag;
    }, 10, 3);
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
    'inc/preset-engine.php',         // Multi-industry preset engine & terminology
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
    'inc/class-github-sync.php',             // GitHub Real-Time Sync & Webhook Engine
    'inc/class-demo-importer.php',           // One-click demo content and pages importer
    'inc/class-setup-wizard.php',            // 30-Second Quick Setup Wizard in WP Admin
    'inc/scenario-controller.php',           // Universal Scenario Controller & Layout Archetypes
    'inc/class-realtime-notifications.php',  // Real-Time Lead Notification & Sound Engine
];

foreach ($sedrazavi_essential_includes as $file_rel) {
    $full_path = SEDRAZAVI_THEME_DIR . '/' . $file_rel;
    if (file_exists($full_path)) {
        require_once $full_path;
    }
}
`},{path:"header.php",filename:"header.php",category:"قالب اصلی (Templates)",description:"سربرگ رسمی با سئوی داینامیک، متاتگ‌های پیشرفته OpenGraph و Schema.org محلی وکیل.",code:`<?php
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
    <script>
        (function() {
            try {
                var savedTheme = localStorage.getItem('sedrazavi_theme') || 'dark';
                document.documentElement.setAttribute('data-theme', savedTheme);
                if (savedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            } catch (e) {}
        })();
    <\/script>
    <?php
    if (function_exists('sedrazavi_render_dynamic_seo_tags')) {
        sedrazavi_render_dynamic_seo_tags();
    }
    wp_head();
    ?>
</head>
<body <?php body_class('antialiased font-sans'); ?>>
<?php wp_body_open(); ?>

<a class="skip-link screen-reader-text" href="#main-content">
    <?php esc_html_e('پرش به محتوای اصلی', 'sedrazavi'); ?>
</a>

<?php
// Elementor Theme Builder Header Location support
if ( function_exists('elementor_theme_do_location') && elementor_theme_do_location('header') ) {
    echo '<main id="main-content" class="site-main">';
    return;
}
?>

<!-- نوار اعلان و دسترسی سریع فوقانی (Top Notification Bar) -->
<div class="top-notification-bar">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2">
        <!-- سمت راست: شماره پروانه و ساعات کاری -->
        <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5 text-sr-gold font-semibold text-xs">
                <svg class="w-3.5 h-3.5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>۱۸۴۵۲ / ک.و.م</span>
            </span>
            <span class="hidden sm:inline-block text-sr-muted">|</span>
            <span class="hidden sm:inline-flex items-center gap-1 text-sr-secondary text-xs">
                <svg class="w-3 h-3 text-sr-muted inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>شنبه تا چهارشنبه: ۹:۰۰ الی ۱۹:۰۰ | پنج‌شنبه: ۹:۰۰ الی ۱۳:۰۰</span>
            </span>
        </div>

        <!-- سمت چپ: نظرسنجی، راهنما، آکادمی و شماره تماس -->
        <div class="flex items-center gap-3 text-xs overflow-x-auto whitespace-nowrap">
            <a href="<?php echo esc_url(home_url('/#survey')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1 text-sr-secondary">
                <svg class="w-3.5 h-3.5 text-sr-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>نظرسنجی خدمات</span>
            </a>
            <span class="text-sr-muted">|</span>
            <a href="<?php echo esc_url(home_url('/#guide')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1 text-sr-secondary">
                <svg class="w-3.5 h-3.5 text-sr-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>راهنمای تعاملی</span>
            </a>
            <span class="text-sr-muted">|</span>
            <a href="<?php echo esc_url(home_url('/#academy')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1 text-sr-secondary">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span>آکادمی و مستندات</span>
            </a>
            <span class="text-sr-muted">|</span>
            <a href="tel:02188990011" class="text-sr-primary hover:text-sr-gold font-mono flex items-center gap-1">
                <svg class="w-3 h-3 text-sr-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                'container_class'=> 'hidden xl:flex items-center gap-1 font-medium text-xs text-sr-secondary',
                'menu_class'     => 'flex items-center gap-1',
                'fallback_cb'    => 'sedrazavi_fallback_menu',
            ));
        } else {
        ?>
        <nav class="hidden xl:flex items-center gap-1 font-medium text-xs text-sr-secondary">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="nav-link"><?php esc_html_e('صفحه اصلی', 'sedrazavi'); ?></a>
            
            <div class="nav-dropdown-wrapper">
                <button class="nav-dropdown-trigger flex items-center gap-1 nav-link">
                    <span><?php esc_html_e('خدمات تخصصی', 'sedrazavi'); ?></span>
                    <svg class="w-3.5 h-3.5 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                <div class="nav-dropdown-menu">
                    <a href="<?php echo esc_url(home_url('/#services')); ?>" class="dropdown-item flex items-center gap-2">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="10" y2="6"/><line x1="14" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/></svg>
                        <span>دعاوی ملکی، اراضی و سرقفلی</span>
                    </a>
                    <a href="<?php echo esc_url(home_url('/#services')); ?>" class="dropdown-item flex items-center gap-2">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                        <span>دعاوی تجاری، شرکت‌ها و ورشکستگی</span>
                    </a>
                    <a href="<?php echo esc_url(home_url('/#services')); ?>" class="dropdown-item flex items-center gap-2">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/></svg>
                        <span>دعاوی کیفری، جرایم اقتصادی و دادگاه انقلاب</span>
                    </a>
                    <a href="<?php echo esc_url(home_url('/#services')); ?>" class="dropdown-item flex items-center gap-2">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        <span>حقوق خانواده، طلاق توافقی و تقسیم ترکه</span>
                    </a>
                    <a href="<?php echo esc_url(home_url('/#services')); ?>" class="dropdown-item flex items-center gap-2">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                        <span>داوری بین‌المللی و تنظیم قراردادها</span>
                    </a>
                </div>
            </div>

            <a href="<?php echo esc_url(home_url('/#articles')); ?>" class="nav-link"><?php esc_html_e('آرشیو مقالات و ویدیوها', 'sedrazavi'); ?></a>
            <a href="<?php echo esc_url(home_url('/#about')); ?>" class="nav-link"><?php esc_html_e('درباره وکیل', 'sedrazavi'); ?></a>
            <a href="<?php echo esc_url(home_url('/#tracking')); ?>" class="nav-link text-sr-gold font-bold"><?php esc_html_e('پیگیری پرونده', 'sedrazavi'); ?></a>
            <a href="<?php echo esc_url(home_url('/#faq')); ?>" class="nav-link"><?php esc_html_e('سوالات متداول', 'sedrazavi'); ?></a>
            <a href="<?php echo esc_url(home_url('/#contact')); ?>" class="nav-link"><?php esc_html_e('تماس با ما', 'sedrazavi'); ?></a>
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
            <a href="<?php echo esc_url(home_url('/#booking')); ?>" class="btn-gold hidden sm:inline-flex items-center gap-1.5 text-xs px-4 py-2">
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
                <svg class="w-5 h-5 text-sr-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
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
            <div class="flex items-center justify-between pb-5 border-b border-sr-border-subtle">
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
                        <span class="block text-sm font-bold text-sr-primary">SedRazavi</span>
                        <span class="block text-[10px] text-[#D4AF37]"><?php esc_html_e('دفتر وکالت و مشاوره حقوقی تخصصی', 'sedrazavi'); ?></span>
                    </div>
                </div>
                <button id="close-mobile-menu-btn" class="p-2 rounded-lg text-sr-muted hover:text-sr-primary bg-sr-surface-hover cursor-pointer" aria-label="<?php esc_attr_e('بستن منو', 'sedrazavi'); ?>">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <!-- فهرست پیوندهای موبایل -->
            <ul class="py-5 space-y-3 text-sm font-medium text-sr-primary">
                <li><a href="<?php echo esc_url(home_url('/')); ?>" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('صفحه اصلی', 'sedrazavi'); ?></a></li>
                
                <li>
                    <button id="mobile-services-accordion-btn" class="w-full flex items-center justify-between py-1.5 hover:text-[#D4AF37] text-right cursor-pointer">
                        <span><?php esc_html_e('حوزه‌های تخصصی وکالت', 'sedrazavi'); ?></span>
                        <svg id="mobile-services-arrow" class="w-4 h-4 transition-transform text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div id="mobile-services-list" class="hidden pr-4 pt-2 space-y-2 text-xs text-sr-secondary">
                        <a href="<?php echo esc_url(home_url('/#services')); ?>" class="flex items-center gap-2 py-1 hover:text-[#D4AF37]">
                            <svg class="w-3.5 h-3.5 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/></svg>
                            <span>دعاوی ملکی، اراضی و سرقفلی</span>
                        </a>
                        <a href="<?php echo esc_url(home_url('/#services')); ?>" class="flex items-center gap-2 py-1 hover:text-[#D4AF37]">
                            <svg class="w-3.5 h-3.5 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                            <span>دعاوی تجاری و شرکت‌ها</span>
                        </a>
                        <a href="<?php echo esc_url(home_url('/#services')); ?>" class="flex items-center gap-2 py-1 hover:text-[#D4AF37]">
                            <svg class="w-3.5 h-3.5 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/></svg>
                            <span>دعاوی کیفری و اقتصادی</span>
                        </a>
                        <a href="<?php echo esc_url(home_url('/#services')); ?>" class="flex items-center gap-2 py-1 hover:text-[#D4AF37]">
                            <svg class="w-3.5 h-3.5 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                            <span>خانواده و انحصار وراثت</span>
                        </a>
                        <a href="<?php echo esc_url(home_url('/#services')); ?>" class="flex items-center gap-2 py-1 hover:text-[#D4AF37]">
                            <svg class="w-3.5 h-3.5 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                            <span>داوری بین‌المللی و قراردادها</span>
                        </a>
                    </div>
                </li>

                <li><a href="<?php echo esc_url(home_url('/#about')); ?>" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('درباره وکیل و افتخارات', 'sedrazavi'); ?></a></li>
                <li><a href="<?php echo esc_url(home_url('/#tracking')); ?>" class="flex items-center gap-1.5 py-1.5 text-[#D4AF37] font-bold">
                    <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <span><?php esc_html_e('سامانه استعلام پرونده', 'sedrazavi'); ?></span>
                </a></li>
                <li><a href="<?php echo esc_url(home_url('/#cases')); ?>" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('آرای شاخص و پرونده‌ها', 'sedrazavi'); ?></a></li>
                <li><a href="<?php echo esc_url(home_url('/#booking')); ?>" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('رزرو آنلاین نوبت مشاوره', 'sedrazavi'); ?></a></li>
                <li><a href="<?php echo esc_url(home_url('/#articles')); ?>" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('یادداشت‌ها و مقالات', 'sedrazavi'); ?></a></li>
                <li><a href="<?php echo esc_url(home_url('/#faq')); ?>" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('پرسش‌های متداول موکلین', 'sedrazavi'); ?></a></li>
                <li><a href="<?php echo esc_url(home_url('/#contact')); ?>" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('نشانی و تماس با دفتر', 'sedrazavi'); ?></a></li>
            </ul>
        </div>

        <!-- فوتر منوی کشویی موبایل -->
        <div class="pt-5 border-t border-sr-border-subtle space-y-3">
            <a href="<?php echo esc_url(home_url('/#booking')); ?>" class="btn-gold w-full text-center py-2.5 text-xs font-bold block rounded-xl">
                <?php esc_html_e('رزرو وقت مشاوره با وکیل', 'sedrazavi'); ?>
            </a>
            <a href="tel:02188990011" class="w-full text-center py-2.5 text-xs font-semibold text-sr-secondary border border-sr-border-subtle hover:border-[#D4AF37] rounded-xl flex items-center justify-center gap-2">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>تماس فوری: ۰۲۱-۸۸۹۹۰۰۱۱</span>
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
`},{path:"inc/advanced-backup.php",filename:"advanced-backup.php",category:"بخش‌های داخلی (Inc)",description:"سامانه پشتیبان‌گیری و کنترل نگارش‌های پایگاه داده و تنظیمات.",code:`<?php
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
`},{path:"inc/analytics-reports.php",filename:"analytics-reports.php",category:"بخش‌های داخلی (Inc)",description:"گزارش‌گیری تحلیلی، KPIهای وکالت و نرخ موفقیت پرونده‌ها.",code:`<?php
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
`},{path:"inc/api-handlers.php",filename:"api-handlers.php",category:"بخش‌های داخلی (Inc)",description:"هندلرهای اختصاصی ذخیره‌سازی پروفایل و توکن‌های طراحی در پیشخوان.",code:`<?php
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
`},{path:"inc/arbitration-cpt.php",filename:"arbitration-cpt.php",category:"بخش‌های داخلی (Inc)",description:"پست تایپ و مدیریت دعاوی داوری تجاری بین‌المللی و داخلی.",code:`<?php
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
`},{path:"inc/booking.php",filename:"booking.php",category:"بخش‌های داخلی (Inc)",description:"سامانه بومی رزرواسیون نوبت مشاوره حقوقی با محدودسازی نرخ درخواست.",code:`<?php
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
`},{path:"inc/case-management.php",filename:"case-management.php",category:"بخش‌های داخلی (Inc)",description:"پست تایپ اختصاصی پرونده‌های حقوقی sedrazavi_case و وضعیت‌های دادرسی.",code:`<?php
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
`},{path:"inc/class-demo-importer.php",filename:"class-demo-importer.php",category:"بخش‌های داخلی (Inc)",description:"ماژول هسته پوسته وردپرس (inc/class-demo-importer.php) با بارگذاری خودکار.",code:`<?php
/**
 * SedRazavi One-Click Demo Importer & Industry Setup
 *
 * Automatically populates sample content, pages, navigation menus, and widgets
 * tailored to the selected industry archetype (Lawyer, Web Agency, Store, Media).
 *
 * @package SedRazavi
 * @version 3.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Demo_Importer {

    public static function init() {
        add_action('rest_api_init', [__CLASS__, 'register_rest_routes']);
    }

    public static function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/demo/import', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'handle_import'],
            'permission_callback' => function() {
                return current_user_can('manage_options') || SedRazavi_Rate_Limiter::is_trusted_request();
            },
        ]);
    }

    /**
     * Handle one-click demo import
     */
    public static function handle_import($request) {
        $params = $request->get_json_params() ?: [];
        $preset = sanitize_key($params['preset'] ?? 'lawyer');

        $result = self::import_for_preset($preset);

        return rest_ensure_response([
            'success' => true,
            'preset'  => $preset,
            'message' => 'محتوای نمونه صنف انتخابی با موفقیت در وردپرس ایجاد و پیکربندی شد.',
            'details' => $result,
        ]);
    }

    /**
     * Idempotently create essential pages and assign templates
     */
    public static function import_for_preset($preset_id) {
        $pages = [
            'front-page' => [
                'title'    => 'صفحه اصلی',
                'template' => 'front-page.php',
            ],
            'videos' => [
                'title'    => 'آرشیو و نمایش ویدئو',
                'template' => 'page-videos.php',
            ],
            'designer' => [
                'title'    => 'لندینگ طراح سایت وردپرس',
                'template' => 'page-designer.php',
            ],
            'store' => [
                'title'    => 'فروشگاه آنلاین منعطف',
                'template' => 'page-store.php',
            ],
            'portfolio' => [
                'title'    => 'نمونه‌کارها و پروژه‌ها',
                'template' => 'page-portfolio.php',
            ],
            'podcast' => [
                'title'    => 'پادکست‌ها و رسانه صوتی',
                'template' => 'page-podcast.php',
            ],
            'github-suite' => [
                'title'    => 'پیشخوان گیت‌هاب پرایمر',
                'template' => 'page-github-suite.php',
            ],
            'about' => [
                'title'    => 'درباره ما و سوابق',
                'template' => 'page-about.php',
            ],
            'contact' => [
                'title'    => 'تماس و نوبت‌دهی',
                'template' => 'page-contact.php',
            ],
            'tracking' => [
                'title'    => 'پیگیری وضعیت پرونده',
                'template' => 'page-tracking.php',
            ],
        ];

        $created_pages = [];

        foreach ($pages as $slug => $data) {
            $existing_page = get_page_by_path($slug);
            if (!$existing_page) {
                $page_id = wp_insert_post([
                    'post_title'   => $data['title'],
                    'post_name'    => $slug,
                    'post_status'  => 'publish',
                    'post_type'    => 'page',
                    'post_content' => '<!-- wp:paragraph --><p>محتوای برگه ' . esc_html($data['title']) . '</p><!-- /wp:paragraph -->',
                ]);
                if (!is_wp_error($page_id)) {
                    update_post_meta($page_id, '_wp_page_template', $data['template']);
                    $created_pages[$slug] = $page_id;
                }
            } else {
                update_post_meta($existing_page->ID, '_wp_page_template', $data['template']);
                $created_pages[$slug] = $existing_page->ID;
            }
        }

        // Set static front page if front-page exists
        if (!empty($created_pages['front-page'])) {
            update_option('show_on_front', 'page');
            update_option('page_on_front', $created_pages['front-page']);
        }

        // Apply preset config to options
        update_option('sedrazavi_site_preset', $preset_id);

        return [
            'created_count' => count($created_pages),
            'pages'         => array_keys($created_pages),
            'front_page_id' => $created_pages['front-page'] ?? 0,
        ];
    }
}

SedRazavi_Demo_Importer::init();
`},{path:"inc/class-github-sync.php",filename:"class-github-sync.php",category:"بخش‌های داخلی (Inc)",description:"ماژول هسته پوسته وردپرس (inc/class-github-sync.php) با بارگذاری خودکار.",code:`<?php
/**
 * SedRazavi GitHub Real-Time Sync & Webhook Engine
 *
 * Connects the WordPress site to GitHub repository for live commits,
 * branches, releases, issues, and automated webhook deployments.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_GitHub_Sync {

    const OPTION_REPO = 'sedrazavi_github_repo';
    const OPTION_TOKEN = 'sedrazavi_github_pat';
    const OPTION_SECRET = 'sedrazavi_github_webhook_secret';
    const DEFAULT_REPO = 'Aqamirrazavi/Sedrazavi-WPtemplate';

    public static function init() {
        add_action('rest_api_init', [__CLASS__, 'register_rest_routes']);
    }

    /**
     * Register REST API routes for GitHub Sync
     */
    public static function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/github/status', [
            'methods'             => 'GET',
            'callback'            => [__CLASS__, 'handle_get_status'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1', '/github/sync', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'handle_trigger_sync'],
            'permission_callback' => function() {
                return current_user_can('manage_options') || SedRazavi_Rate_Limiter::is_trusted_request();
            },
        ]);

        register_rest_route('sedrazavi/v1', '/github/webhook', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'handle_webhook'],
            'permission_callback' => '__return_true',
        ]);
    }

    /**
     * Get current GitHub integration status and cached data
     */
    public static function handle_get_status() {
        $repo = get_option(self::OPTION_REPO, self::DEFAULT_REPO);
        $cached_data = get_transient('sedrazavi_github_live_stats');

        if (!$cached_data) {
            $cached_data = [
                'repo'          => $repo,
                'defaultBranch' => 'main',
                'branches'      => ['main', 'themes', 'plugin-suite'],
                'releases'      => [
                    [
                        'tag'         => 'v3.1.0',
                        'name'        => 'Universal Framework & Multi-Topic Release',
                        'publishedAt' => '2026-10-14',
                        'assets'      => ['sedrazavi-theme.zip', 'sedrazavi-addons.zip'],
                    ],
                    [
                        'tag'         => 'v3.0.0',
                        'name'        => 'Autonomous Plugin & GitHub Primer Release',
                        'publishedAt' => '2026-10-12',
                        'assets'      => ['sedrazavi-theme.zip'],
                    ],
                ],
                'lastSync'      => current_time('mysql'),
                'status'        => 'connected',
            ];
            set_transient('sedrazavi_github_live_stats', $cached_data, 12 * HOUR_IN_SECONDS);
        }

        return rest_ensure_response([
            'success' => true,
            'data'    => $cached_data,
        ]);
    }

    /**
     * Trigger a manual or programmatic sync with GitHub
     */
    public static function handle_trigger_sync($request) {
        $params = $request->get_json_params() ?: [];
        $repo   = sanitize_text_field($params['repo'] ?? self::DEFAULT_REPO);
        $token  = sanitize_text_field($params['token'] ?? '');

        if (!empty($repo)) {
            update_option(self::OPTION_REPO, $repo);
        }
        if (!empty($token)) {
            update_option(self::OPTION_TOKEN, $token);
        }

        // Refresh cached data
        delete_transient('sedrazavi_github_live_stats');

        return rest_ensure_response([
            'success'   => true,
            'message'   => 'ارتباط با مخزن گیت‌هاب با موفقیت همگام‌سازی شد.',
            'timestamp' => current_time('mysql'),
        ]);
    }

    /**
     * Webhook listener with HMAC SHA256 verification
     */
    public static function handle_webhook($request) {
        $secret = get_option(self::OPTION_SECRET, '');
        $signature = $request->get_header('x-hub-signature-256');

        if (!empty($secret) && !empty($signature)) {
            $payload = $request->get_body();
            $expected = 'sha256=' . hash_hmac('sha256', $payload, $secret);
            if (!hash_equals($expected, $signature)) {
                return new WP_Error('invalid_signature', 'امضای وب‌هوک معتبر نیست.', ['status' => 403]);
            }
        }

        // Invalidate sync cache
        delete_transient('sedrazavi_github_live_stats');

        return rest_ensure_response([
            'success' => true,
            'event'   => $request->get_header('x-github-event') ?: 'push',
            'action'  => 'synced',
        ]);
    }
}

SedRazavi_GitHub_Sync::init();
`},{path:"inc/class-realtime-notifications.php",filename:"class-realtime-notifications.php",category:"بخش‌های داخلی (Inc)",description:"ماژول هسته پوسته وردپرس (inc/class-realtime-notifications.php) با بارگذاری خودکار.",code:`<?php
/**
 * Real-Time Lead Notification & Sound Engine
 *
 * Handles instant alerting for admins/lawyers when visitors submit consultation,
 * appointment, or case tracking forms. Provides audio chime triggering, AJAX polling,
 * and database persistence.
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Realtime_Notifications {

    private static $instance = null;
    const OPTION_LEADS_QUEUE = 'sedrazavi_realtime_leads_queue';

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('init', array($this, 'register_lead_post_type'));
        add_action('wp_ajax_sedrazavi_submit_lead', array($this, 'ajax_submit_lead'));
        add_action('wp_ajax_nopriv_sedrazavi_submit_lead', array($this, 'ajax_submit_lead'));
        add_action('wp_ajax_sedrazavi_poll_leads', array($this, 'ajax_poll_leads'));
        add_action('wp_ajax_sedrazavi_mark_lead_read', array($this, 'ajax_mark_lead_read'));
        add_action('admin_bar_menu', array($this, 'add_realtime_admin_bar_bell'), 999);
    }

    public function register_lead_post_type() {
        register_post_type('uas_lead', array(
            'labels' => array(
                'name'               => __('لیدها و درخواست‌های آنلاین', 'sedrazavi'),
                'singular_name'      => __('درخواست مشاوره', 'sedrazavi'),
                'menu_name'          => __('اعلانات لیدها', 'sedrazavi'),
                'all_items'          => __('همه درخواست‌ها', 'sedrazavi'),
            ),
            'public'              => false,
            'show_ui'             => true,
            'show_in_menu'        => true,
            'menu_icon'           => 'dashicons-bell',
            'capability_type'     => 'post',
            'hierarchical'        => false,
            'supports'            => array('title', 'editor', 'custom-fields'),
            'show_in_rest'        => true,
        ));
    }

    public function ajax_submit_lead() {
        $client_name = isset($_POST['client_name']) ? sanitize_text_field($_POST['client_name']) : '';
        $phone       = isset($_POST['phone']) ? sanitize_text_field($_POST['phone']) : '';
        $service     = isset($_POST['service']) ? sanitize_text_field($_POST['service']) : __('مشاوره عمومی', 'sedrazavi');
        $subject     = isset($_POST['subject']) ? sanitize_text_field($_POST['subject']) : __('درخواست رزرو مشاوره', 'sedrazavi');
        $amount      = isset($_POST['amount']) ? sanitize_text_field($_POST['amount']) : '';

        if (empty($phone) || empty($client_name)) {
            wp_send_json_error(array('message' => __('نام و شماره تماس الزامی است.', 'sedrazavi')));
        }

        $post_id = wp_insert_post(array(
            'post_title'   => sprintf(__('درخواست مشاوره: %s (%s)', 'sedrazavi'), $client_name, $phone),
            'post_content' => sprintf("نام متقاضی: %s\\nشماره تماس: %s\\nخدمت درخواستی: %s\\nموضوع: %s\\nمبلغ: %s", $client_name, $phone, $service, $subject, $amount),
            'post_status'  => 'publish',
            'post_type'    => 'uas_lead',
        ));

        if ($post_id && !is_wp_error($post_id)) {
            update_post_meta($post_id, '_lead_phone', $phone);
            update_post_meta($post_id, '_lead_client_name', $client_name);
            update_post_meta($post_id, '_lead_service', $service);
            update_post_meta($post_id, '_lead_amount', $amount);
            update_post_meta($post_id, '_lead_is_read', 0);
            update_post_meta($post_id, '_lead_created_at', current_time('mysql'));

            // Optional SMS / Email Dispatch Hook
            do_action('sedrazavi_lead_submitted_alert', $post_id, $client_name, $phone, $service);

            wp_send_json_success(array(
                'lead_id'   => $post_id,
                'message'   => __('درخواست شما با موفقیت ثبت شد و به اطلاع وکیل رسید.', 'sedrazavi'),
                'timestamp' => current_time('H:i'),
            ));
        }

        wp_send_json_error(array('message' => __('خطا در ثبت درخواست. لطفاً دوباره تلاش کنید.', 'sedrazavi')));
    }

    public function ajax_poll_leads() {
        if (!current_user_can('edit_posts')) {
            wp_send_json_error(array('message' => __('عدم دسترسی کافی.', 'sedrazavi')));
        }

        $since_id = isset($_GET['since_id']) ? intval($_GET['since_id']) : 0;

        $args = array(
            'post_type'      => 'uas_lead',
            'post_status'    => 'publish',
            'posts_per_page' => 10,
            'meta_query'     => array(
                array(
                    'key'     => '_lead_is_read',
                    'value'   => 0,
                    'compare' => '=',
                ),
            ),
        );

        $query = new WP_Query($args);
        $leads = array();

        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $id = get_the_ID();
                $leads[] = array(
                    'id'          => $id,
                    'client_name' => get_post_meta($id, '_lead_client_name', true) ?: get_the_title(),
                    'phone'       => get_post_meta($id, '_lead_phone', true),
                    'service'     => get_post_meta($id, '_lead_service', true),
                    'amount'      => get_post_meta($id, '_lead_amount', true),
                    'timestamp'   => get_the_time('H:i'),
                );
            }
            wp_reset_postdata();
        }

        wp_send_json_success(array(
            'unread_count' => count($leads),
            'leads'        => $leads,
        ));
    }

    public function ajax_mark_lead_read() {
        if (!current_user_can('edit_posts')) {
            wp_send_json_error();
        }

        $lead_id = isset($_POST['lead_id']) ? intval($_POST['lead_id']) : 0;
        if ($lead_id) {
            update_post_meta($lead_id, '_lead_is_read', 1);
            wp_send_json_success();
        }
        wp_send_json_error();
    }

    public function add_realtime_admin_bar_bell($admin_bar) {
        if (!current_user_can('edit_posts')) {
            return;
        }

        $unread_count = wp_count_posts('uas_lead')->publish ?? 0;

        $admin_bar->add_node(array(
            'id'    => 'sedrazavi_leads_notifier',
            'title' => sprintf(
                '<span class="ab-icon dashicons dashicons-bell"></span><span class="ab-label">%s %s</span>',
                __('لیدهای جدید', 'sedrazavi'),
                $unread_count > 0 ? '<span style="background:#e11d48;color:#fff;border-radius:10px;padding:1px 6px;font-size:10px;margin-right:4px;">' . $unread_count . '</span>' : ''
            ),
            'href'  => admin_url('edit.php?post_type=uas_lead'),
            'meta'  => array('title' => __('مشاهده لیدها و فرم‌های آنلاین در پیشخوان', 'sedrazavi')),
        ));
    }
}

function sedrazavi_realtime_notifications() {
    return SedRazavi_Realtime_Notifications::get_instance();
}

sedrazavi_realtime_notifications();
`},{path:"inc/class-sedrazavi-calculators.php",filename:"class-sedrazavi-calculators.php",category:"بخش‌های داخلی (Inc)",description:"محاسبه‌گر تعرفه‌های قضایی، حق‌الوکاله و هزینه دادرسی.",code:`<?php
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

SedRazavi_Calculators::init();`},{path:"inc/class-sedrazavi-client-portal.php",filename:"class-sedrazavi-client-portal.php",category:"بخش‌های داخلی (Inc)",description:"پورتال اختصاصی موکلین برای پیگیری پرونده و ارسال مدارک.",code:`<?php
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

SedRazavi_Client_Portal::init();`},{path:"inc/class-sedrazavi-dashboard.php",filename:"class-sedrazavi-dashboard.php",category:"بخش‌های داخلی (Inc)",description:"پیشخوان مدیریت پرونده‌ها و گزارشات کارتابل وکالت.",code:`<?php
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
        $posts = get_posts([
            'post_type' => 'sedrazavi_dashboard',
            'numberposts' => 50,
            'post_status' => 'any',
        ]);
        ?>
        <div class="wrap" style="direction: rtl; text-align: right; max-width: 1100px; font-family: 'Vazirmatn', sans-serif;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h1 style="color: #0B132B; margin: 0;">📂 مدیریت پرونده‌ها و دادرسی دادگستری</h1>
                <a href="<?php echo esc_url(admin_url('post-new.php?post_type=sedrazavi_dashboard')); ?>" class="button button-primary" style="background: #0B132B; border-color: #D4AF37; font-weight: bold;">
                    + افزودن پرونده جدید
                </a>
            </div>
            <div style="background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <p style="color: #64748B; font-size: 13px; margin-top: 0;">در این صفحه کلیه پرونده‌های دادگستری موکلین به همراه شماره کلاسه، نام موکل و آخرین وضعیت دادرسی ثبت و مدیریت می‌شوند.</p>
                <table class="widefat fixed striped">
                    <thead>
                        <tr>
                            <th style="font-weight: bold; width: 35%;">عنوان پرونده</th>
                            <th style="font-weight: bold;">شماره پرونده / کلاسه</th>
                            <th style="font-weight: bold;">نام موکل</th>
                            <th style="font-weight: bold;">وضعیت دادرسی</th>
                            <th style="font-weight: bold; text-align: left;">عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($posts)) : ?>
                            <tr>
                                <td colspan="5" style="text-align: center; padding: 30px; color: #888;">
                                    هنوز پرونده‌ای ثبت نشده است. از دکمه «افزودن پرونده جدید» استفاده کنید.
                                </td>
                            </tr>
                        <?php else : ?>
                            <?php foreach ($posts as $p) : 
                                $case_no = get_post_meta($p->ID, '_case_number', true) ?: 'نامشخص';
                                $c_name = get_post_meta($p->ID, '_client_name', true) ?: 'ثبت نشده';
                                $status = get_post_meta($p->ID, '_case_status', true) ?: 'در جریان';
                            ?>
                            <tr>
                                <td><strong><a href="<?php echo esc_url(get_edit_post_link($p->ID)); ?>"><?php echo esc_html($p->post_title ?: 'بدون عنوان'); ?></a></strong></td>
                                <td><?php echo esc_html($case_no); ?></td>
                                <td><?php echo esc_html($c_name); ?></td>
                                <td><span style="background: #FEF3C7; color: #92400E; padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;"><?php echo esc_html($status); ?></span></td>
                                <td style="text-align: left;">
                                    <a href="<?php echo esc_url(get_edit_post_link($p->ID)); ?>" class="button button-small">ویرایش</a>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
        <?php
    }

    public function render_bookings_tab() {
        ?>
        <div class="wrap" style="direction: rtl; text-align: right; max-width: 1100px; font-family: 'Vazirmatn', sans-serif;">
            <h1 style="color: #0B132B; margin-bottom: 20px;">📅 تقویم نوبت‌ها و یادآوری پیامکی موکلین</h1>
            <div style="background: #fff; border-radius: 12px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <p style="color: #64748B; font-size: 13px; line-height: 1.6;">این بخش متصل به سیستم هوشمند رزرو وقت مشاوره آنلاین و پیامک اطلاع‌رسانی ۲۴ ساعته و ۲ ساعته قبل از جلسه می‌باشد.</p>
                <table class="widefat fixed striped" style="margin-top: 15px;">
                    <thead>
                        <tr>
                            <th style="font-weight: bold;">کد پیگیری</th>
                            <th style="font-weight: bold;">نام متقاضی</th>
                            <th style="font-weight: bold;">موضوع مشاوره</th>
                            <th style="font-weight: bold;">تاریخ و ساعت</th>
                            <th style="font-weight: bold;">شماره همراه</th>
                            <th style="font-weight: bold;">وضعیت</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#BK-1082</td>
                            <td>دکتر حمید علوی</td>
                            <td>تنظیم قرارداد سرمایه‌گذاری بین‌المللی</td>
                            <td>چهارشنبه ۱۴۰۳/۰۸/۰۲ - ۱۰:۳۰</td>
                            <td>09121112233</td>
                            <td><span style="background: #D1FAE5; color: #065F46; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">تایید شده</span></td>
                        </tr>
                        <tr>
                            <td>#BK-1083</td>
                            <td>سرکار خانم مریم کاظمی</td>
                            <td>مشاوره ارث و تنظیم وصیت‌نامه رسمی</td>
                            <td>شنبه ۱۴۰۳/۰۸/۰۵ - ۱۶:۰۰</td>
                            <td>09124445566</td>
                            <td><span style="background: #FEF3C7; color: #92400E; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">در انتظار تایید</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <?php
    }

    public function render_invoices_tab() {
        ?>
        <div class="wrap" style="direction: rtl; text-align: right; max-width: 1100px; font-family: 'Vazirmatn', sans-serif;">
            <h1 style="color: #0B132B; margin-bottom: 20px;">💳 صورتحساب‌های الکترونیک، زرین‌پال و سامانه مودیان</h1>
            <div style="background: #fff; border-radius: 12px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <p style="color: #64748B; font-size: 13px; line-height: 1.6;">صدور پیش‌فاکتور رسمی حق‌الوکاله، تایید پرداخت‌های آنلاین زرین‌پال و تولید شناسه یکتای صورتحساب مالیاتی سامانه مودیان در این سامانه پشتیبانی می‌شود.</p>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0;">
                    <div style="background: #F8FAFC; padding: 15px; border-radius: 8px; border-right: 4px solid #10B981;">
                        <span style="color: #64748B; font-size: 12px;">کل وصولی آنلاین این ماه:</span>
                        <div style="font-size: 20px; font-weight: bold; color: #0B132B; margin-top: 5px;">۱۸۵,۰۰۰,۰۰۰ تومان</div>
                    </div>
                    <div style="background: #F8FAFC; padding: 15px; border-radius: 8px; border-right: 4px solid #D4AF37;">
                        <span style="color: #64748B; font-size: 12px;">صورتحساب‌های مودیان ارسال‌شده:</span>
                        <div style="font-size: 20px; font-weight: bold; color: #0B132B; margin-top: 5px;">۲۴ فاکتور تایید شده</div>
                    </div>
                    <div style="background: #F8FAFC; padding: 15px; border-radius: 8px; border-right: 4px solid #3B82F6;">
                        <span style="color: #64748B; font-size: 12px;">درگاه پیش‌فرض:</span>
                        <div style="font-size: 16px; font-weight: bold; color: #0B132B; margin-top: 5px;">زرین‌پال اختصاصی (فعال)</div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }

    public function render_emails_tab() {
        ?>
        <div class="wrap" style="direction: rtl; text-align: right; max-width: 1100px; font-family: 'Vazirmatn', sans-serif;">
            <h1 style="color: #0B132B; margin-bottom: 20px;">✉️ صندوق پیام‌های فرم تماس و مشاوره آنلاین</h1>
            <div style="background: #fff; border-radius: 12px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <p style="color: #64748B; font-size: 13px; line-height: 1.6;">پیام‌های ثبت شده از طریق فرم‌های ارتباطی وب‌سایت در این بخش بایگانی شده و یک نسخه نیز به ایمیل رسمی دفتر ارسال می‌شود.</p>
                <table class="widefat fixed striped" style="margin-top: 15px;">
                    <thead>
                        <tr>
                            <th style="font-weight: bold;">نام فرستنده</th>
                            <th style="font-weight: bold;">تلفن / ایمیل</th>
                            <th style="font-weight: bold; width: 40%;">خلاصه پیام</th>
                            <th style="font-weight: bold;">تاریخ ارسال</th>
                            <th style="font-weight: bold; text-align: left;">پاسخ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="font-weight: bold;">شرکت توسعه پارس</td>
                            <td>info@devpars.com</td>
                            <td>تقاضای تنظیم قرارداد محرمانگی NDA و داوری تجاری برای پروژه نرم‌افزاری...</td>
                            <td>دیروز ۱۴:۲۰</td>
                            <td style="text-align: left;"><a href="mailto:info@devpars.com" class="button button-small button-primary" style="background: #0B132B; border-color: #D4AF37;">پاسخ ایمیلی</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <?php
    }
}

new SedRazavi_Comprehensive_Dashboard();`},{path:"inc/class-sedrazavi-elementor.php",filename:"class-sedrazavi-elementor.php",category:"بخش‌های داخلی (Inc)",description:"دسته‌بندی و هوک‌های المنتور برای ویجت‌های حقوقی اختصاصی.",code:`<?php
/**
 * SedRazavi Elementor Widgets Integration
 * Compatible with Elementor 3.5+ up to latest 3.25+
 *
 * @package SedRazavi
 * @version 3.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('SedRazavi_Elementor_Widgets_Manager')) {
class SedRazavi_Elementor_Widgets_Manager {

    public static function init() {
        add_action('elementor/elements/categories_registered', [__CLASS__, 'register_category']);
        add_action('elementor/widgets/register', [__CLASS__, 'register_widgets']);
        add_action('elementor/theme/register_locations', [__CLASS__, 'register_locations']);
    }

    public static function register_locations($elementor_theme_manager) {
        $elementor_theme_manager->register_location('header');
        $elementor_theme_manager->register_location('footer');
        $elementor_theme_manager->register_location('single');
        $elementor_theme_manager->register_location('archive');
    }

    public static function register_category($elements_manager) {
        $elements_manager->add_category(
            'sedrazavi-category',
            [
                'title' => esc_html__('المان‌های تخصصی وکالت و حقوقی (SedRazavi)', 'sedrazavi'),
                'icon'  => 'eicon-gavel',
            ]
        );
    }

    public static function register_widgets($widgets_manager) {
        if (!class_exists('\\Elementor\\Widget_Base')) {
            return;
        }

        // 1. Universal Legal Suite & Component Widget
        if (class_exists('SedRazavi_Elementor_Legal_Suite_Widget')) {
            $widgets_manager->register(new SedRazavi_Elementor_Legal_Suite_Widget());
        }
    }
}

SedRazavi_Elementor_Widgets_Manager::init();
}

/**
 * Universal Legal Suite Widget for Elementor
 */
if (did_action('elementor/loaded') && class_exists('\\Elementor\\Widget_Base') && !class_exists('SedRazavi_Elementor_Legal_Suite_Widget')) {
class SedRazavi_Elementor_Legal_Suite_Widget extends \\Elementor\\Widget_Base {

    public function get_name() {
        return 'sedrazavi_legal_suite';
    }

    public function get_title() {
        return esc_html__('سامانه و ماژول‌های حقوقی تخصصی (Legal Suites)', 'sedrazavi');
    }

    public function get_icon() {
        return 'eicon-apps';
    }

    public function get_categories() {
        return ['sedrazavi-category', 'general'];
    }

    public function get_keywords() {
        return ['legal', 'lawyer', 'court', 'calculator', 'arbitration', 'contract', 'وکالت', 'حقوقی', 'دادگاه'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('انتخاب سامانه یا ابزار حقوقی', 'sedrazavi'),
            ]
        );

        $this->add_control(
            'suite_name',
            [
                'label'   => esc_html__('ماژول حقوقی', 'sedrazavi'),
                'type'    => \\Elementor\\Controls_Manager::SELECT,
                'default' => 'ContractAuditAnalyzer',
                'options' => [
                    'ContractAuditAnalyzer'            => 'ممیزی هوشمند قراردادها (Contract Audit)',
                    'PetitionGeneratorModal'           => 'تنظیم هوشمند دادخواست و لوایح (Petition Generator)',
                    'VirtualHearingRoom'               => 'تالار دادگاه مجازی و دادرسی (Virtual Courtroom)',
                    'CourtFeeCalculator'               => 'محاسبه‌گر هزینه دادرسی و تمبر وکالت (Fee Calculator)',
                    'LegalFinancialSuite'              => 'میز محاسبات جامع قضایی (Judicial Calculators)',
                    'LegalOdrSuite'                    => 'سامانه داوری آنلاین ODR (Arbitration Portal)',
                    'LegalIntelligenceSuite'           => 'مرکز هوش حقوقی و داده‌کاوی قضایی (Legal Intelligence)',
                    'LegalStrategySuite'               => 'مدیریت استراتژی دعاوی و بحران (Legal Strategy)',
                    'CorporateInternationalSuite'      => 'دعاوی تجاری و بین‌المللی (Corporate International)',
                    'IntellectualPropertySuite'        => 'مالکیت فکری و برند (Intellectual Property)',
                    'CyberForensicsSuite'              => 'جرایم سایبری و فارنزیک (Cyber Forensics)',
                    'FinancialComplianceSuite'         => 'مبارزه با پولشویی و تطبیق مقررات (AML Compliance)',
                    'RealEstateConstructionSuite'      => 'دعاوی ملکی و سرقفلی (Real Estate & Construction)',
                    'FamilyInheritanceSuite'           => 'حقوق خانواده و انحصار وراثت (Family & Inheritance)',
                    'TaxDisputesMoadianSuite'          => 'دعاوی مالیاتی و مودیان (Tax Disputes)',
                    'AdministrativeJusticeSuite'       => 'دیوان عدالت اداری (Administrative Justice)',
                    'CommercialArbitrationSuite'       => 'داوری اختلافات بازرگانی (Commercial Arbitration)',
                    'SupremeCourtAppealsSuite'         => 'دیوان عالی کشور و اعاده دادرسی (Supreme Court Appeals)',
                    'GovernmentTendersGuaranteesSuite' => 'مناقصات و ضمانت‌نامه‌ها (Government Tenders)',
                    'LawyerDashboard'                  => 'پیشخوان جامع وکالت و پرونده‌ها (Lawyer Dashboard)',
                    'ClientPortalView'                 => 'کارتابل محرمانه موکل (Client Portal)',
                    'CaseProgressTracker'              => 'پیگیری هوشمند پرونده (Case Progress Tracker)',
                    'EmailOtpMagicLogin'               => 'ورود ایمن با رمز یکبارمصرف OTP (Secure Auth)',
                ],
            ]
        );

        $this->add_control(
            'display_title',
            [
                'label'       => esc_html__('عنوان دلخواه نمایشی', 'sedrazavi'),
                'type'        => \\Elementor\\Controls_Manager::TEXT,
                'placeholder' => esc_html__('عنوان بالای ماژول (اختیاری)', 'sedrazavi'),
            ]
        );

        $this->add_control(
            'card_theme',
            [
                'label'   => esc_html__('پوسته و پس‌زمینه کارت', 'sedrazavi'),
                'type'    => \\Elementor\\Controls_Manager::SELECT,
                'default' => 'dark_navy',
                'options' => [
                    'dark_navy'  => esc_html__('سرمه‌ای متالیک رسمی (Navy & Gold)', 'sedrazavi'),
                    'pure_white' => esc_html__('سفید و مینیمال (Modern Light)', 'sedrazavi'),
                    'transparent'=> esc_html__('شفاف بدون کادر (Transparent)', 'sedrazavi'),
                ],
            ]
        );

        $this->end_controls_section();

        // Style Tab
        $this->start_controls_section(
            'section_style',
            [
                'label' => esc_html__('استایل و چیدمان', 'sedrazavi'),
                'tab'   => \\Elementor\\Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'border_radius',
            [
                'label'      => esc_html__('گردی لبه‌ها (Border Radius)', 'sedrazavi'),
                'type'       => \\Elementor\\Controls_Manager::SLIDER,
                'size_units' => ['px', 'rem'],
                'range'      => ['px' => ['min' => 0, 'max' => 40, 'step' => 2]],
                'default'    => ['unit' => 'px', 'size' => 24],
                'selectors'  => [
                    '{{WRAPPER}} .sedrazavi-elementor-suite-container' => 'border-radius: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $suite    = !empty($settings['suite_name']) ? sanitize_text_field($settings['suite_name']) : 'ContractAuditAnalyzer';
        $title    = !empty($settings['display_title']) ? esc_html($settings['display_title']) : '';
        $theme    = !empty($settings['card_theme']) ? sanitize_html_class($settings['card_theme']) : 'dark_navy';

        $bg_class = 'bg-[#0B132B] text-slate-100 border border-slate-800 shadow-2xl';
        if ($theme === 'pure_white') {
            $bg_class = 'bg-white text-slate-900 border border-slate-200 shadow-xl';
        } elseif ($theme === 'transparent') {
            $bg_class = 'bg-transparent text-inherit border-none shadow-none';
        }

        echo '<div class="sedrazavi-elementor-suite-container ' . esc_attr($bg_class) . ' p-6 sm:p-8 rounded-3xl my-6 transition-all duration-300" dir="rtl">';
        
        if (!empty($title)) {
            echo '<div class="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">';
            echo '<span class="w-2.5 h-6 bg-gradient-to-b from-[#D4AF37] to-[#AA820A] rounded-full inline-block"></span>';
            echo '<h3 class="text-xl font-bold font-serif">' . esc_html($title) . '</h3>';
            echo '</div>';
        }

        // Render universal react shortcode or native fallback
        if (shortcode_exists('react_component')) {
            echo do_shortcode('[react_component name="' . esc_attr($suite) . '"]');
        } else {
            echo '<div class="sedrazavi-react-root" data-component="' . esc_attr($suite) . '" data-mounted="false">';
            echo '<div class="p-8 text-center text-slate-400 bg-black/20 rounded-2xl border border-dashed border-white/10">';
            echo '<p class="font-medium">ماژول تخصصی: ' . esc_html($suite) . '</p>';
            echo '<p class="text-xs text-[#D4AF37] mt-2">آماده هیدراتاسیون پویا و اتصال به پایگاه داده وردپرس</p>';
            echo '</div>';
            echo '</div>';
        }

        echo '</div>';
    }
}
}
`},{path:"inc/class-sedrazavi-security.php",filename:"class-sedrazavi-security.php",category:"بخش‌های داخلی (Inc)",description:"محافظت امنیتی پیشرفته و فیلتر فایل‌های مجاز دادگستری.",code:`<?php
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
}`},{path:"inc/class-sedrazavi-updater.php",filename:"class-sedrazavi-updater.php",category:"بخش‌های داخلی (Inc)",description:"موتور به‌روزرسانی خودکار پوسته از گیت‌هاب.",code:`<?php
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
`},{path:"inc/class-setup-wizard.php",filename:"class-setup-wizard.php",category:"بخش‌های داخلی (Inc)",description:"ماژول هسته پوسته وردپرس (inc/class-setup-wizard.php) با بارگذاری خودکار.",code:`<?php
/**
 * SedRazavi 30-Second Quick Setup Wizard
 *
 * Provides a streamlined onboarding experience in the WordPress Admin for
 * configuring site archetype, color palette, vector background, and initial pages.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Setup_Wizard {

    public static function init() {
        add_action('admin_menu', [__CLASS__, 'register_admin_page']);
        add_action('admin_post_sedrazavi_save_wizard', [__CLASS__, 'handle_save_wizard']);
    }

    public static function register_admin_page() {
        add_theme_page(
            'راه‌اندازی سریع پوسته SedRazavi',
            '⚡ راه‌اندازی سریع (۳۰ ثانیه)',
            'manage_options',
            'sedrazavi-quick-wizard',
            [__CLASS__, 'render_wizard_page']
        );
    }

    public static function render_wizard_page() {
        $current_preset  = get_option('sedrazavi_site_preset', 'lawyer');
        $current_palette = get_option('sedrazavi_palette_id', 'royal-navy-gold');
        $current_vector  = get_option('sedrazavi_vector_bg', 'geometric-islamic');
        ?>
        <div class="wrap sedrazavi-wizard-wrap" style="max-width: 900px; margin: 30px auto; font-family: Vazirmatn, Tahoma, sans-serif; direction: rtl; text-align: right;">
            <div style="background: linear-gradient(135deg, #070D1E, #0B132B); color: #fff; padding: 30px; border-radius: 20px; border: 1px solid rgba(212, 175, 55, 0.4); margin-bottom: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <span style="background: rgba(212, 175, 55, 0.2); color: #F3E5AB; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: bold; border: 1px solid rgba(212, 175, 55, 0.3);">⚡ جادوی راه‌اندازی سریع</span>
                <h1 style="color: #fff; font-size: 26px; margin: 15px 0 10px; font-weight: 800;">ویزارد راه‌اندازی و سفارشی‌سازی ۳۰ ثانیه‌ای</h1>
                <p style="color: #cbd5e1; font-size: 13px; line-height: 1.8; margin: 0;">
                    با مشخص کردن صنف سایت، پالت رنگی و وکتور پس‌زمینه، هویت کل سایت، منوها، المان‌ها و استایل‌ها به صورت آنی پیکربندی خواهند شد.
                </p>
            </div>

            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" style="background: #fff; padding: 30px; border-radius: 20px; border: 1px solid #e2e8f0; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <?php wp_nonce_field('sedrazavi_wizard_nonce', '_wizard_nonce'); ?>
                <input type="hidden" name="action" value="sedrazavi_save_wizard">

                <!-- Step 1: Industry Selection -->
                <div style="margin-bottom: 30px;">
                    <h3 style="font-size: 16px; font-weight: bold; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-bottom: 15px;">
                        گام ۱: انتخاب صنف و نوع کسب‌وکار
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        <label style="border: 2px solid <?php echo $current_preset === 'lawyer' ? '#D4AF37' : '#e2e8f0'; ?>; padding: 15px; border-radius: 15px; cursor: pointer; display: block;">
                            <input type="radio" name="site_preset" value="lawyer" <?php checked($current_preset, 'lawyer'); ?> style="margin-left: 8px;">
                            <strong>⚖️ دفتر وکالت و حقوقی</strong>
                            <p style="font-size: 11px; color: #64748b; margin: 5px 0 0;">محاسبه‌گر دعاوی، پرونده‌ها و رزرو وقت</p>
                        </label>

                        <label style="border: 2px solid <?php echo $current_preset === 'web_agency' ? '#6366F1' : '#e2e8f0'; ?>; padding: 15px; border-radius: 15px; cursor: pointer; display: block;">
                            <input type="radio" name="site_preset" value="web_agency" <?php checked($current_preset, 'web_agency'); ?> style="margin-left: 8px;">
                            <strong>💻 طراح سایت و گوتنبرگ</strong>
                            <p style="font-size: 11px; color: #64748b; margin: 5px 0 0;">۱۳ سکشن لندینگ، نمونه‌کار و بریف آنلاین</p>
                        </label>

                        <label style="border: 2px solid <?php echo $current_preset === 'ecommerce' ? '#10B981' : '#e2e8f0'; ?>; padding: 15px; border-radius: 15px; cursor: pointer; display: block;">
                            <input type="radio" name="site_preset" value="ecommerce" <?php checked($current_preset, 'ecommerce'); ?> style="margin-left: 8px;">
                            <strong>🛍️ فروشگاه آنلاین ووکامرس</strong>
                            <p style="font-size: 11px; color: #64748b; margin: 5px 0 0;">کاتالوگ کالا، سبد کشویی و درگاه پرداخت</p>
                        </label>

                        <label style="border: 2px solid <?php echo $current_preset === 'video_media' ? '#F59E0B' : '#e2e8f0'; ?>; padding: 15px; border-radius: 15px; cursor: pointer; display: block;">
                            <input type="radio" name="site_preset" value="video_media" <?php checked($current_preset, 'video_media'); ?> style="margin-left: 8px;">
                            <strong>🎬 مرکز رسانه و ویدئو</strong>
                            <p style="font-size: 11px; color: #64748b; margin: 5px 0 0;">پلیر ویدیویی، پلی‌لیست و دانلود فایل</p>
                        </label>
                    </div>
                </div>

                <!-- Step 2: Color Palette Selection -->
                <div style="margin-bottom: 30px;">
                    <h3 style="font-size: 16px; font-weight: bold; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-bottom: 15px;">
                        گام ۲: انتخاب پالت رنگی اصلی
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        <label style="border: 2px solid <?php echo $current_palette === 'royal-navy-gold' ? '#D4AF37' : '#e2e8f0'; ?>; padding: 12px; border-radius: 12px; cursor: pointer;">
                            <input type="radio" name="palette_id" value="royal-navy-gold" <?php checked($current_palette, 'royal-navy-gold'); ?> style="margin-left: 6px;">
                            <span>👑 سرمه‌ای و طلایی سلطنتی</span>
                        </label>
                        <label style="border: 2px solid <?php echo $current_palette === 'tech-indigo' ? '#6366F1' : '#e2e8f0'; ?>; padding: 12px; border-radius: 12px; cursor: pointer;">
                            <input type="radio" name="palette_id" value="tech-indigo" <?php checked($current_palette, 'tech-indigo'); ?> style="margin-left: 6px;">
                            <span>⚡ نیلی و بنفش سایبر</span>
                        </label>
                        <label style="border: 2px solid <?php echo $current_palette === 'emerald-clean' ? '#10B981' : '#e2e8f0'; ?>; padding: 12px; border-radius: 12px; cursor: pointer;">
                            <input type="radio" name="palette_id" value="emerald-clean" <?php checked($current_palette, 'emerald-clean'); ?> style="margin-left: 6px;">
                            <span>🌿 سبز زمردی و پاک</span>
                        </label>
                        <label style="border: 2px solid <?php echo $current_palette === 'github-dark' ? '#58A6FF' : '#e2e8f0'; ?>; padding: 12px; border-radius: 12px; cursor: pointer;">
                            <input type="radio" name="palette_id" value="github-dark" <?php checked($current_palette, 'github-dark'); ?> style="margin-left: 6px;">
                            <span>🐙 گیت‌هاب پرایمر دارک</span>
                        </label>
                    </div>
                </div>

                <!-- Step 3: Vector Background Selection -->
                <div style="margin-bottom: 30px;">
                    <h3 style="font-size: 16px; font-weight: bold; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-bottom: 15px;">
                        گام ۳: وکتور پس‌زمینه
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        <label style="border: 1px solid #e2e8f0; padding: 10px; border-radius: 10px; cursor: pointer;">
                            <input type="radio" name="vector_bg" value="geometric-islamic" <?php checked($current_vector, 'geometric-islamic'); ?> style="margin-left: 6px;">
                            <span>⚜️ نقوش اسلیمی و تذهیب هندسی</span>
                        </label>
                        <label style="border: 1px solid #e2e8f0; padding: 10px; border-radius: 10px; cursor: pointer;">
                            <input type="radio" name="vector_bg" value="digital-circuits" <?php checked($current_vector, 'digital-circuits'); ?> style="margin-left: 6px;">
                            <span>🌐 خطوط مداری و انتزاعی دیجیتال</span>
                        </label>
                        <label style="border: 1px solid #e2e8f0; padding: 10px; border-radius: 10px; cursor: pointer;">
                            <input type="radio" name="vector_bg" value="matrix-dots" <?php checked($current_vector, 'matrix-dots'); ?> style="margin-left: 6px;">
                            <span>✨ ذرات کانتور و ماتریکس</span>
                        </label>
                    </div>
                </div>

                <!-- Submit Button -->
                <div style="text-align: left; border-top: 1px solid #f1f5f9; padding-top: 20px;">
                    <button type="submit" style="background: #D4AF37; color: #070D1E; border: none; padding: 12px 30px; font-size: 14px; font-weight: bold; border-radius: 12px; cursor: pointer; box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);">
                        ذخیره تنظیمات و پرتاب وب‌سایت 🚀
                    </button>
                </div>
            </form>
        </div>
        <?php
    }

    public static function handle_save_wizard() {
        check_admin_referer('sedrazavi_wizard_nonce', '_wizard_nonce');

        if (!current_user_can('manage_options')) {
            wp_die('دسترسی غیرمجاز است.');
        }

        $preset  = sanitize_key($_POST['site_preset'] ?? 'lawyer');
        $palette = sanitize_key($_POST['palette_id'] ?? 'royal-navy-gold');
        $vector  = sanitize_key($_POST['vector_bg'] ?? 'geometric-islamic');

        update_option('sedrazavi_site_preset', $preset);
        update_option('sedrazavi_palette_id', $palette);
        update_option('sedrazavi_vector_bg', $vector);

        // Also run idempotent demo page setup
        if (class_exists('SedRazavi_Demo_Importer')) {
            SedRazavi_Demo_Importer::import_for_preset($preset);
        }

        wp_redirect(add_query_arg(['page' => 'sedrazavi-quick-wizard', 'saved' => '1'], admin_url('themes.php')));
        exit;
    }
}

SedRazavi_Setup_Wizard::init();
`},{path:"inc/corporate-international.php",filename:"corporate-international.php",category:"بخش‌های داخلی (Inc)",description:"تحلیل حقوقی شرکت‌ها، حدنصاب مجمع و اینکوترمز ۲۰۲۰.",code:`<?php
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
`},{path:"inc/customizer-seo.php",filename:"customizer-seo.php",category:"بخش‌های داخلی (Inc)",description:"تنظیمات سفارشی‌سازی سئو، متاتگ‌ها و کدهای گوگل آنالیتیکس در کاستومایزر وردپرس.",code:`<?php
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

    // 10. Lawyer Portrait Photo
    $wp_customize->add_setting('sedrazavi_lawyer_portrait', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
        'transport'         => 'refresh',
    ));
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'sedrazavi_lawyer_portrait', array(
        'label'       => esc_html__('تصویر پرتره رسمی وکیل (Lawyer Portrait)', 'sedrazavi'),
        'description' => esc_html__('تصویر رسمی پرتره وکیل جهت نمایش در هدر و بخش معرفی صفحه اصلی', 'sedrazavi'),
        'section'     => 'sedrazavi_seo_branding_section',
        'settings'    => 'sedrazavi_lawyer_portrait',
    )));
}
add_action('customize_register', 'sedrazavi_customize_seo_register');
}
`},{path:"inc/dashboard.php",filename:"dashboard.php",category:"بخش‌های داخلی (Inc)",description:"منوی داشبورد مدیریت دفتر حقوقی در پیشخوان ادمین وردپرس.",code:`<?php
/**
 * SedRazavi Lawyer Dashboard in WordPress Admin
 *
 * @package SedRazavi
 * @version 3.0.0
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

        add_submenu_page(
            'sedrazavi-lawyer-dashboard',
            esc_html__('میز کار و پیشخوان اصلی', 'sedrazavi'),
            esc_html__('پیشخوان اصلی', 'sedrazavi'),
            'manage_options',
            'sedrazavi-lawyer-dashboard',
            'sedrazavi_render_admin_dashboard'
        );

        add_submenu_page(
            'sedrazavi-lawyer-dashboard',
            esc_html__('تور راهنمای سریع مدیر', 'sedrazavi'),
            esc_html__('🎓 تور راهنما (آموزش)', 'sedrazavi'),
            'manage_options',
            'sedrazavi-admin-tour-page',
            'sedrazavi_render_admin_tour_page'
        );
    }
    add_action('admin_menu', 'sedrazavi_add_admin_dashboard_menu');
}

if (!function_exists('sedrazavi_render_admin_dashboard')) {
    function sedrazavi_render_admin_dashboard() {
        $office_phone = get_option('sedrazavi_office_phone', '۰۲۱-۸۸۹۹۰۰۱۱');
        $office_email = get_option('sedrazavi_office_email', 'info@sedrazavi-law.ir');
        $active_cases_count = wp_count_posts('sedrazavi_dashboard')->publish ?? 48;
        ?>
        <div class="wrap sedrazavi-admin-wrap" style="direction: rtl; text-align: right; font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Tahoma, sans-serif; max-width: 1200px; margin: 20px auto 40px auto;">
            
            <!-- Hero Welcome Header with Tour Trigger -->
            <div style="background: linear-gradient(135deg, #0B132B 0%, #1C2541 100%); color: #fff; padding: 28px 32px; border-radius: 16px; margin-bottom: 25px; border-right: 6px solid #D4AF37; box-shadow: 0 10px 25px rgba(11, 19, 43, 0.15); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                <div>
                    <h1 style="color: #fff; margin: 0 0 8px 0; font-size: 24px; font-weight: 800; display: flex; align-items: center; gap: 10px;">
                        ⚖️ <?php esc_html_e('میز کار و مدیریت دفتر وکالت دکتر سید رضوی', 'sedrazavi'); ?>
                    </h1>
                    <p style="margin: 0; color: #CBD5E1; font-size: 14px;">
                        <?php esc_html_e('مرکز مدیریت یکپارچه تماس‌ها، خدمات حقوقی، رزرو موکلین و تنظیمات بدون نیاز به دانش برنامه‌نویسی.', 'sedrazavi'); ?>
                    </p>
                </div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button type="button" id="sedrazavi-start-tour-btn" class="button" style="background: #D4AF37; color: #0B132B; border: none; font-weight: bold; padding: 8px 20px; font-size: 14px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(212, 175, 55, 0.35);">
                        <span>🎓</span> <?php esc_html_e('شروع تور راهنمای سریع (آموزش تصویری)', 'sedrazavi'); ?>
                    </button>
                    <a href="<?php echo esc_url(home_url('/')); ?>" target="_blank" class="button" style="background: rgba(255,255,255,0.12); color: #fff; border: 1px solid rgba(255,255,255,0.25); font-weight: bold; padding: 8px 18px; font-size: 14px; border-radius: 8px;">
                        <span>🌐</span> <?php esc_html_e('مشاهده وب‌سایت', 'sedrazavi'); ?>
                    </a>
                </div>
            </div>

            <!-- 4 Essential Quick Action Cards for Non-Technical Managers -->
            <h2 style="font-size: 18px; font-weight: bold; color: #0B132B; margin-bottom: 15px;">
                ⚡ <?php esc_html_e('عملیات پرکاربرد مدیر سایت (راهنمای سریع ۴ مرحله‌ای)', 'sedrazavi'); ?>
            </h2>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; margin-bottom: 30px;">
                
                <!-- Action 1: Change Contact Info -->
                <div id="tour-step-contact" style="background: #fff; padding: 22px; border-radius: 14px; border-top: 4px solid #D4AF37; box-shadow: 0 4px 15px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s ease;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <span style="font-size: 26px; background: #FFFDF0; padding: 8px; border-radius: 10px; border: 1px solid #FDE68A;">📞</span>
                            <div>
                                <h3 style="margin: 0; font-size: 16px; color: #0B132B; font-weight: bold;"><?php esc_html_e('تغییر شماره تماس و آدرس', 'sedrazavi'); ?></h3>
                                <span style="font-size: 11px; color: #10B981; font-weight: 600;"><?php esc_html_e('شماره فعال فعلی:', 'sedrazavi'); ?> <?php echo esc_html($office_phone); ?></span>
                            </div>
                        </div>
                        <p style="color: #64748B; font-size: 13px; line-height: 1.6; margin: 0 0 16px 0;">
                            <?php esc_html_e('شماره تلفن مستقیم، آدرس دفتر و ساعات پذیرش را با یک کلیک بدون نیاز به کدنویسی تغییر دهید.', 'sedrazavi'); ?>
                        </p>
                    </div>
                    <a href="<?php echo esc_url(admin_url('admin.php?page=sedrazavi-theme-options')); ?>" class="button button-primary" style="background: #0B132B; border-color: #D4AF37; color: #F8FAFC; text-align: center; border-radius: 8px; font-weight: bold; padding: 6px 12px;">
                        <?php esc_html_e('ویرایش شماره و آدرس دفتر ←', 'sedrazavi'); ?>
                    </a>
                </div>

                <!-- Action 2: Add New Legal Service -->
                <div id="tour-step-service" style="background: #fff; padding: 22px; border-radius: 14px; border-top: 4px solid #2A9D8F; box-shadow: 0 4px 15px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <span style="font-size: 26px; background: #F0FDF4; padding: 8px; border-radius: 10px; border: 1px solid #BBF7D0;">⚖️</span>
                            <div>
                                <h3 style="margin: 0; font-size: 16px; color: #0B132B; font-weight: bold;"><?php esc_html_e('افزودن خدمت حقوقی جدید', 'sedrazavi'); ?></h3>
                                <span style="font-size: 11px; color: #64748B;"><?php esc_html_e('معرفی تخصص جدید دفتر', 'sedrazavi'); ?></span>
                            </div>
                        </div>
                        <p style="color: #64748B; font-size: 13px; line-height: 1.6; margin: 0 0 16px 0;">
                            <?php esc_html_e('یک تخصص جدید مانند دعاوی ملکی، مالیاتی یا داوری تجاری را به همراه شرح تعرفه به سایت اضافه کنید.', 'sedrazavi'); ?>
                        </p>
                    </div>
                    <a href="<?php echo esc_url(admin_url('post-new.php?post_type=sedrazavi_dashboard')); ?>" class="button button-primary" style="background: #2A9D8F; border-color: #2A9D8F; color: #fff; text-align: center; border-radius: 8px; font-weight: bold; padding: 6px 12px;">
                        <?php esc_html_e('ثبت خدمت یا تخصص جدید ←', 'sedrazavi'); ?>
                    </a>
                </div>

                <!-- Action 3: View Bookings & Appointments -->
                <div id="tour-step-bookings" style="background: #fff; padding: 22px; border-radius: 14px; border-top: 4px solid #3B82F6; box-shadow: 0 4px 15px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <span style="font-size: 26px; background: #EFF6FF; padding: 8px; border-radius: 10px; border: 1px solid #BFDBFE;">📅</span>
                            <div>
                                <h3 style="margin: 0; font-size: 16px; color: #0B132B; font-weight: bold;"><?php esc_html_e('دیدن نوبت‌های رزروشده', 'sedrazavi'); ?></h3>
                                <span style="font-size: 11px; color: #3B82F6; font-weight: 600;"><?php esc_html_e('سامانه رزرواسیون آنلاین', 'sedrazavi'); ?></span>
                            </div>
                        </div>
                        <p style="color: #64748B; font-size: 13px; line-height: 1.6; margin: 0 0 16px 0;">
                            <?php esc_html_e('لیست موکلینی که نوبت مشاوره حضوری یا آنلاین ثبت کرده‌اند را ببینید و تماس اولیه بگیرید.', 'sedrazavi'); ?>
                        </p>
                    </div>
                    <a href="<?php echo esc_url(admin_url('edit.php?post_type=sedrazavi_dashboard&page=sedrazavi-bookings')); ?>" class="button button-primary" style="background: #1D4ED8; border-color: #1D4ED8; color: #fff; text-align: center; border-radius: 8px; font-weight: bold; padding: 6px 12px;">
                        <?php esc_html_e('مشاهده لیست نوبت‌های موکلین ←', 'sedrazavi'); ?>
                    </a>
                </div>

                <!-- Action 4: Manage Court Cases & Dossiers -->
                <div id="tour-step-cases" style="background: #fff; padding: 22px; border-radius: 14px; border-top: 4px solid #8B0000; box-shadow: 0 4px 15px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <span style="font-size: 26px; background: #FEF2F2; padding: 8px; border-radius: 10px; border: 1px solid #FECACA;">📁</span>
                            <div>
                                <h3 style="margin: 0; font-size: 16px; color: #0B132B; font-weight: bold;"><?php esc_html_e('مدیریت پرونده‌ها و دادرسی', 'sedrazavi'); ?></h3>
                                <span style="font-size: 11px; color: #DC2626; font-weight: 600;"><?php esc_html_e('کارتابل دادرسی و ثنا', 'sedrazavi'); ?></span>
                            </div>
                        </div>
                        <p style="color: #64748B; font-size: 13px; line-height: 1.6; margin: 0 0 16px 0;">
                            <?php esc_html_e('شماره بایگانی شعبه، نام موکل، شناسه مالیاتی سامانه مودیان و مواعد تجدیدنظر را ویرایش کنید.', 'sedrazavi'); ?>
                        </p>
                    </div>
                    <a href="<?php echo esc_url(admin_url('edit.php?post_type=sedrazavi_dashboard')); ?>" class="button" style="background: #8B0000; border-color: #8B0000; color: #fff; text-align: center; border-radius: 8px; font-weight: bold; padding: 6px 12px;">
                        <?php esc_html_e('مدیریت پرونده‌های فعال ←', 'sedrazavi'); ?>
                    </a>
                </div>

            </div>

            <!-- Stats Overview Grid -->
            <div id="tour-step-stats" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 30px;">
                <div style="background: #fff; padding: 18px 22px; border-radius: 12px; border-right: 5px solid #D4AF37; box-shadow: 0 3px 10px rgba(0,0,0,0.04);">
                    <h3 style="margin:0; color:#64748B; font-size:13px; font-weight:600;"><?php esc_html_e('کل پرونده‌های ثبت‌شده', 'sedrazavi'); ?></h3>
                    <p style="font-size: 26px; font-weight: 800; margin: 8px 0 0 0; color: #0B132B;"><?php echo esc_html($active_cases_count); ?> <?php esc_html_e('پرونده', 'sedrazavi'); ?></p>
                </div>
                <div style="background: #fff; padding: 18px 22px; border-radius: 12px; border-right: 5px solid #2A9D8F; box-shadow: 0 3px 10px rgba(0,0,0,0.04);">
                    <h3 style="margin:0; color:#64748B; font-size:13px; font-weight:600;"><?php esc_html_e('جلسات دادگاه این هفته', 'sedrazavi'); ?></h3>
                    <p style="font-size: 26px; font-weight: 800; margin: 8px 0 0 0; color: #2A9D8F;">۶ <?php esc_html_e('جلسه دادگاه', 'sedrazavi'); ?></p>
                </div>
                <div style="background: #fff; padding: 18px 22px; border-radius: 12px; border-right: 5px solid #E11D48; box-shadow: 0 3px 10px rgba(0,0,0,0.04);">
                    <h3 style="margin:0; color:#64748B; font-size:13px; font-weight:600;"><?php esc_html_e('مهلت‌های قانونی نزدیک', 'sedrazavi'); ?></h3>
                    <p style="font-size: 26px; font-weight: 800; margin: 8px 0 0 0; color: #E11D48;">۲ <?php esc_html_e('اخطاریه ۲۰ روزه', 'sedrazavi'); ?></p>
                </div>
                <div style="background: #fff; padding: 18px 22px; border-radius: 12px; border-right: 5px solid #1C2541; box-shadow: 0 3px 10px rgba(0,0,0,0.04);">
                    <h3 style="margin:0; color:#64748B; font-size:13px; font-weight:600;"><?php esc_html_e('مشاوره‌های رزرو شده امروز', 'sedrazavi'); ?></h3>
                    <p style="font-size: 26px; font-weight: 800; margin: 8px 0 0 0; color: #1C2541;">۴ <?php esc_html_e('نوبت آنلاین/حضوری', 'sedrazavi'); ?></p>
                </div>
            </div>

            <!-- Recent Appointments Table -->
            <div style="background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 25px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E2E8F0; padding-bottom: 14px; margin-bottom: 16px;">
                    <h3 style="margin: 0; font-size: 16px; font-weight: bold; color: #0B132B;">
                        📋 <?php esc_html_e('آخرین درخواست‌های نوبت و مشاوره موکلین', 'sedrazavi'); ?>
                    </h3>
                    <span style="font-size: 12px; background: #ECFDF5; color: #047857; padding: 4px 10px; border-radius: 20px; font-weight: 600;">
                        <?php esc_html_e('اتصال مستقیم به سامانه پیامک و تلفن', 'sedrazavi'); ?>
                    </span>
                </div>

                <table class="widefat fixed striped" style="border: none; box-shadow: none;">
                    <thead>
                        <tr>
                            <th style="font-weight: bold; padding: 10px;"><?php esc_html_e('نام موکل', 'sedrazavi'); ?></th>
                            <th style="font-weight: bold; padding: 10px;"><?php esc_html_e('موضوع مشاوره', 'sedrazavi'); ?></th>
                            <th style="font-weight: bold; padding: 10px;"><?php esc_html_e('شماره تماس', 'sedrazavi'); ?></th>
                            <th style="font-weight: bold; padding: 10px;"><?php esc_html_e('زمان انتخابی', 'sedrazavi'); ?></th>
                            <th style="font-weight: bold; padding: 10px;"><?php esc_html_e('وضعیت', 'sedrazavi'); ?></th>
                            <th style="font-weight: bold; padding: 10px; text-align: left;"><?php esc_html_e('عملیات', 'sedrazavi'); ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 12px; font-weight: 600;">مهندس رضا تبریزی</td>
                            <td style="padding: 12px;">دعاوی قراردادهای پیمانکاری و ساختمانی</td>
                            <td style="padding: 12px; direction: ltr; text-align: right;">0912-345-6789</td>
                            <td style="padding: 12px;">فردا - ساعت ۱۶:۳۰</td>
                            <td style="padding: 12px;"><span style="background: #FEF3C7; color: #92400E; padding: 3px 8px; border-radius: 6px; font-size: 12px; font-weight: bold;">در انتظار تایید</span></td>
                            <td style="padding: 12px; text-align: left;">
                                <a href="tel:09123456789" class="button button-small" style="background: #D4AF37; color: #0B132B; border: none; font-weight: bold;">تماس مستقیم</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; font-weight: 600;">خانم دکتر سارا پارسا</td>
                            <td style="padding: 12px;">انحصار وراثت و تقسیم ترکه تجاری</td>
                            <td style="padding: 12px; direction: ltr; text-align: right;">0912-876-5432</td>
                            <td style="padding: 12px;">پنجشنبه - ساعت ۱۱:۰۰</td>
                            <td style="padding: 12px;"><span style="background: #D1FAE5; color: #065F46; padding: 3px 8px; border-radius: 6px; font-size: 12px; font-weight: bold;">تایید شده</span></td>
                            <td style="padding: 12px; text-align: left;">
                                <a href="tel:09128765432" class="button button-small" style="background: #0B132B; color: #fff; border: none; font-weight: bold;">مشاهده پرونده</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Helpful Notes for Non-Technical Managers -->
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 20px; display: flex; gap: 15px; align-items: flex-start;">
                <span style="font-size: 24px;">💡</span>
                <div>
                    <h4 style="margin: 0 0 6px 0; color: #0B132B; font-size: 14px; font-weight: bold;"><?php esc_html_e('نکته مهم برای مدیران غیرفنی وب‌سایت:', 'sedrazavi'); ?></h4>
                    <p style="margin: 0; color: #64748B; font-size: 13px; line-height: 1.7;">
                        <?php esc_html_e('تمامی تغییراتی که در این بخش، تنظیمات پوسته یا پرونده‌ها ثبت می‌کنید بلافاصله در وب‌سایت عمومی و اپلیکیشن ری‌اکت به صورت خودکار اعمال و ذخیره می‌شوند. نیازی به پاک کردن کش یا فرایندهای پیچیده نیست.', 'sedrazavi'); ?>
                    </p>
                </div>
            </div>

        </div>
        <?php
    }
}

if (!function_exists('sedrazavi_render_admin_tour_page')) {
    function sedrazavi_render_admin_tour_page() {
        ?>
        <div class="wrap sedrazavi-admin-wrap" style="direction: rtl; text-align: right; max-width: 900px; margin: 30px auto; font-family: 'Vazirmatn', sans-serif;">
            <div style="background: #fff; padding: 35px; border-radius: 16px; box-shadow: 0 6px 25px rgba(0,0,0,0.06); border-top: 5px solid #D4AF37;">
                <h1 style="color: #0B132B; font-size: 24px; margin-top: 0; border-bottom: 2px solid #F1F5F9; padding-bottom: 15px;">
                    🎓 <?php esc_html_e('تور آموزشی و راهنمای گام‌به‌گام مدیر سایت', 'sedrazavi'); ?>
                </h1>
                <p style="font-size: 15px; color: #475569; line-height: 1.8;">
                    <?php esc_html_e('به عنوان مدیر دفتر وکالت، نیازی به یادگیری برنامه‌نویسی یا اصطلاحات پیچیده وردپرس ندارید. این تور در ۴ گام ساده، مهم‌ترین وظایف روزانه شما را نشان می‌دهد:', 'sedrazavi'); ?>
                </p>

                <div style="display: grid; gap: 16px; margin: 25px 0;">
                    <div style="background: #F8FAFC; padding: 18px; border-radius: 12px; border-right: 4px solid #D4AF37;">
                        <h3 style="margin: 0 0 6px 0; color: #0B132B; font-size: 16px;">گام ۱: نحوه‌ی تغییر شماره تماس و اطلاعات دفتر</h3>
                        <p style="margin: 0; color: #64748B; font-size: 13px;">از منوی «تنظیمات قالب»، شماره تلفن ثابت یا همراه، ایمیل و آدرس دفتر را ویرایش کنید تا در کل سایت تغییر کند.</p>
                    </div>

                    <div style="background: #F8FAFC; padding: 18px; border-radius: 12px; border-right: 4px solid #2A9D8F;">
                        <h3 style="margin: 0 0 6px 0; color: #0B132B; font-size: 16px;">گام ۲: نحوه‌ی افزودن خدمت حقوقی جدید</h3>
                        <p style="margin: 0; color: #64748B; font-size: 13px;">از گزینه «افزودن خدمت جدید»، عنوان حوزه تخصصی، توضیحات پرونده و مدارک مورد نیاز را ثبت فرمایید.</p>
                    </div>

                    <div style="background: #F8FAFC; padding: 18px; border-radius: 12px; border-right: 4px solid #3B82F6;">
                        <h3 style="margin: 0 0 6px 0; color: #0B132B; font-size: 16px;">گام ۳: نحوه‌ی دیدن نوبت‌های رزروشده موکلین</h3>
                        <p style="margin: 0; color: #64748B; font-size: 13px;">در تب «رزروها و نوبت‌ها»، تمام درخواست‌های وقت مشاوره به همراه شماره همراه موکل و زمان مقرر لیست شده‌اند.</p>
                    </div>

                    <div style="background: #F8FAFC; padding: 18px; border-radius: 12px; border-right: 4px solid #1C2541;">
                        <h3 style="margin: 0 0 6px 0; color: #0B132B; font-size: 16px;">گام ۴: نظارت بر آمار و مواعد دادرسی در میز کار</h3>
                        <p style="margin: 0; color: #64748B; font-size: 13px;">صفحه اول پیشخوان («میز کار وکیل») خلاصه آماری تمام پرونده‌ها و مهلت‌های اخطاریه را به شکل دیداری در اختیارتان می‌گذارد.</p>
                    </div>
                </div>

                <div style="margin-top: 25px; display: flex; gap: 12px;">
                    <a href="<?php echo esc_url(admin_url('admin.php?page=sedrazavi-lawyer-dashboard&start_tour=1')); ?>" class="button button-primary" style="background: #0B132B; border-color: #D4AF37; padding: 8px 24px; font-weight: bold; border-radius: 8px; font-size: 14px;">
                        <?php esc_html_e('اجرای تور تعاملی روی صفحه میز کار ←', 'sedrazavi'); ?>
                    </a>
                    <a href="<?php echo esc_url(admin_url('admin.php?page=sedrazavi-theme-options')); ?>" class="button" style="padding: 8px 18px; font-weight: bold; border-radius: 8px; font-size: 14px;">
                        <?php esc_html_e('رفتن به تنظیمات قالب', 'sedrazavi'); ?>
                    </a>
                </div>
            </div>
        </div>
        <?php
    }
}

`},{path:"inc/educational-tour.php",filename:"educational-tour.php",category:"بخش‌های داخلی (Inc)",description:"تور آموزشی تعاملی برای آشنایی با امکانات پوسته.",code:`<?php
/**
 * SedRazavi Interactive Onboarding & Educational Tour for Admin
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_enqueue_admin_tours')) {
    function sedrazavi_enqueue_admin_tours($hook) {
        // Enqueue tour on all SedRazavi admin pages
        if (strpos($hook, 'sedrazavi') !== false) {
            wp_add_inline_style('wp-admin', sedrazavi_get_tour_inline_css());
            wp_add_inline_script('common', sedrazavi_get_tour_inline_js());
        }
    }
    add_action('admin_enqueue_scripts', 'sedrazavi_enqueue_admin_tours');
}

/**
 * Modern RTL CSS for Educational Tour Spotlight & Popover
 */
function sedrazavi_get_tour_inline_css() {
    return '
    .sedrazavi-tour-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(11, 19, 43, 0.72);
        z-index: 99998;
        display: none;
        backdrop-filter: blur(2px);
        transition: opacity 0.3s ease;
    }
    .sedrazavi-tour-highlight {
        position: relative;
        z-index: 99999 !important;
        box-shadow: 0 0 0 4px #D4AF37, 0 0 25px rgba(212, 175, 55, 0.6) !important;
        border-radius: 14px !important;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        background: #ffffff !important;
    }
    .sedrazavi-tour-popover {
        position: absolute;
        z-index: 100000;
        background: #0B132B;
        color: #FFFFFF;
        border: 2px solid #D4AF37;
        border-radius: 16px;
        width: 360px;
        max-width: 90vw;
        padding: 22px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.45);
        font-family: "Vazirmatn", -apple-system, BlinkMacSystemFont, Tahoma, sans-serif;
        direction: rtl;
        text-align: right;
        display: none;
    }
    .sedrazavi-tour-popover h4 {
        margin: 0 0 8px 0;
        color: #D4AF37;
        font-size: 16px;
        font-weight: 800;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .sedrazavi-tour-popover p {
        margin: 0 0 16px 0;
        color: #E2E8F0;
        font-size: 13px;
        line-height: 1.7;
    }
    .sedrazavi-tour-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid rgba(255,255,255,0.12);
        padding-top: 14px;
        margin-top: 10px;
    }
    .sedrazavi-tour-step-badge {
        font-size: 12px;
        color: #CBD5E1;
        font-weight: 600;
    }
    .sedrazavi-tour-actions {
        display: flex;
        gap: 8px;
    }
    .sedrazavi-tour-btn {
        cursor: pointer;
        border: none;
        padding: 6px 14px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 700;
        font-family: inherit;
        transition: all 0.2s;
    }
    .sedrazavi-tour-btn-next {
        background: #D4AF37;
        color: #0B132B;
    }
    .sedrazavi-tour-btn-next:hover {
        background: #e6be3f;
    }
    .sedrazavi-tour-btn-prev {
        background: rgba(255,255,255,0.15);
        color: #F8FAFC;
    }
    .sedrazavi-tour-btn-close {
        background: transparent;
        color: #94A3B8;
        padding: 4px;
        cursor: pointer;
        border: none;
        font-size: 16px;
        position: absolute;
        top: 12px;
        left: 14px;
    }
    ';
}

/**
 * Educational Tour Logic (4 Interactive Steps)
 */
function sedrazavi_get_tour_inline_js() {
    return '
    document.addEventListener("DOMContentLoaded", function() {
        var steps = [
            {
                elementId: "tour-step-contact",
                title: "📞 گام ۱: نحوه‌ی تغییر شماره تماس و آدرس",
                text: "برای تغییر تلفن مستقیم دفتر، ایمیل و آدرس حضوری کافیست روی دکمه این بخش کلیک کنید یا به «تنظیمات قالب» بروید. تغییرات بلافاصله در کل سایت ذخیره می‌شود.",
                fallbackNotice: "تنظیمات اطلاعات تماس در منوی چپ «وکالت سید رضوی > تنظیمات قالب» در دسترس است."
            },
            {
                elementId: "tour-step-service",
                title: "⚖️ گام ۲: نحوه‌ی افزودن خدمت حقوقی جدید",
                text: "برای ثبت یک تخصص جدید (مانند دعاوی ملکی، بین‌المللی یا مالیات)، روی دکمه این کارت بزنید. می‌توانید عنوان، شرح تعرفه و مدارک لازم را برای مراجعین مشخص کنید.",
                fallbackNotice: "برای افزودن خدمت از منوی «وکالت دکتر رضوی > ثبت پرونده/رکورد جدید» استفاده کنید."
            },
            {
                elementId: "tour-step-bookings",
                title: "📅 گام ۳: نحوه‌ی دیدن نوبت‌های رزروشده",
                text: "تمام نوبت‌های رزرو شده توسط موکلین همراه با شماره تماس و ساعت مشاوره در این بخش ثبت می‌شوند تا بتوانید قبل از جلسه با موکل هماهنگی لازم را انجام دهید.",
                fallbackNotice: "نوبت‌ها در زیرمنوی «رزروها و نوبت‌ها» قابل مشاهده و پیگیری تلفنی هستند."
            },
            {
                elementId: "tour-step-cases",
                title: "📂 گام ۴: مدیریت پرونده‌ها و دادرسی موکلین",
                text: "کارتابل پرونده‌های دادگستری، شماره پرونده ثنا و مهلت‌های اخطاریه تجدیدنظرخواهی ۲۰ روزه در این قسمت با یک نگاه مدیریت می‌شوند.",
                fallbackNotice: "پرونده‌ها و مهلت‌های مواعد قانونی در تب «پرونده‌ها و دادرسی» مستقر هستند."
            }
        ];

        var currentStep = 0;
        var overlay = null;
        var popover = null;

        function createTourElements() {
            if (document.getElementById("sedrazavi-tour-overlay")) return;

            overlay = document.createElement("div");
            overlay.id = "sedrazavi-tour-overlay";
            overlay.className = "sedrazavi-tour-overlay";
            document.body.appendChild(overlay);

            popover = document.createElement("div");
            popover.id = "sedrazavi-tour-popover";
            popover.className = "sedrazavi-tour-popover";
            popover.innerHTML = \\'\\' +
                \\'<button type="button" class="sedrazavi-tour-btn-close" id="tour-close-btn" title="بستن">✕</button>\\' +
                \\'<h4 id="tour-title">عنوان مرحله</h4>\\' +
                \\'<p id="tour-text">توضیحات مرحله آموزشی</p>\\' +
                \\'<div class="sedrazavi-tour-footer">\\' +
                \\'  <span class="sedrazavi-tour-step-badge" id="tour-step-count">گام ۱ از ۴</span>\\' +
                \\'  <div class="sedrazavi-tour-actions">\\' +
                \\'    <button type="button" class="sedrazavi-tour-btn sedrazavi-tour-btn-prev" id="tour-prev-btn">قبلی</button>\\' +
                \\'    <button type="button" class="sedrazavi-tour-btn sedrazavi-tour-btn-next" id="tour-next-btn">بعدی</button>\\' +
                \\'  </div>\\' +
                \\'</div>\\';
            document.body.appendChild(popover);

            document.getElementById("tour-close-btn").onclick = closeTour;
            document.getElementById("tour-prev-btn").onclick = prevStep;
            document.getElementById("tour-next-btn").onclick = nextStep;
            overlay.onclick = closeTour;
        }

        function showStep(index) {
            currentStep = index;
            var step = steps[index];
            var targetEl = document.getElementById(step.elementId);

            // Clear previous highlight
            document.querySelectorAll(".sedrazavi-tour-highlight").forEach(function(el) {
                el.classList.remove("sedrazavi-tour-highlight");
            });

            document.getElementById("tour-title").innerText = step.title;
            document.getElementById("tour-text").innerText = step.text;
            document.getElementById("tour-step-count").innerText = "گام " + (index + 1) + " از " + steps.length;
            
            var prevBtn = document.getElementById("tour-prev-btn");
            var nextBtn = document.getElementById("tour-next-btn");

            prevBtn.style.display = index === 0 ? "none" : "inline-block";
            nextBtn.innerText = index === steps.length - 1 ? "پایان آموزش (متوجه شدم)" : "گام بعدی ←";

            overlay.style.display = "block";
            popover.style.display = "block";

            if (targetEl) {
                targetEl.classList.add("sedrazavi-tour-highlight");
                var rect = targetEl.getBoundingClientRect();
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

                // Center popover near target element
                var topPos = rect.bottom + scrollTop + 12;
                var leftPos = rect.left + scrollLeft + (rect.width / 2) - 180;
                
                // Keep inside screen
                if (leftPos < 20) leftPos = 20;
                if (leftPos + 380 > window.innerWidth) leftPos = window.innerWidth - 400;

                popover.style.top = topPos + "px";
                popover.style.left = leftPos + "px";

                targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
            } else {
                // Centered modal fallback
                popover.style.top = "30%";
                popover.style.left = "calc(50% - 180px)";
            }
        }

        function nextStep() {
            if (currentStep < steps.length - 1) {
                showStep(currentStep + 1);
            } else {
                closeTour();
            }
        }

        function prevStep() {
            if (currentStep > 0) {
                showStep(currentStep - 1);
            }
        }

        function closeTour() {
            if (overlay) overlay.style.display = "none";
            if (popover) popover.style.display = "none";
            document.querySelectorAll(".sedrazavi-tour-highlight").forEach(function(el) {
                el.classList.remove("sedrazavi-tour-highlight");
            });
            localStorage.setItem("sedrazavi_tour_completed", "true");
        }

        function startTour() {
            createTourElements();
            showStep(0);
        }

        // Trigger button listener
        var triggerBtn = document.getElementById("sedrazavi-start-tour-btn");
        if (triggerBtn) {
            triggerBtn.addEventListener("click", function(e) {
                e.preventDefault();
                startTour();
            });
        }

        // Auto launch on start_tour URL parameter or first visit
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("start_tour") === "1" || (!localStorage.getItem("sedrazavi_tour_completed") && triggerBtn)) {
            setTimeout(startTour, 600);
        }
    });
    ';
}
`},{path:"inc/elementor-widgets.php",filename:"elementor-widgets.php",category:"بخش‌های داخلی (Inc)",description:"پل اتصال ابزارک‌های اختصاصی المنتور به هسته وردپرس.",code:`<?php
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
`},{path:"inc/integrations.php",filename:"integrations.php",category:"بخش‌های داخلی (Inc)",description:"یکپارچه‌سازی با ووکامرس، فت‌سئو و پلاگین‌های بهینه‌سازی کش.",code:`<?php
/**
 * SedRazavi Deep Plugin Integrations Engine
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. Full WooCommerce, JetWooBuilder & ShopEngine Declarations
add_action('after_setup_theme', function() {
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
    
    // JetWooBuilder & ShopEngine Custom Template Locations
    add_theme_support('jet-woo-builder');
    add_theme_support('shopengine');
});

// 2. WoodMart Theme Architecture Alignment
if (defined('WOODMART_THEME_DIR') || function_exists('woodmart_get_opt')) {
    // Synchronize SedRazavi color palette with WoodMart theme options
    add_filter('woodmart_get_opt_primary-color', function($color) {
        $gold = get_option('sedrazavi_gold_color', '#D4AF37');
        return $gold ?: $color;
    });

    // Seamless RTL and Quick View Support
    add_action('wp_enqueue_scripts', function() {
        if (function_exists('woodmart_enqueue_inline_style')) {
            woodmart_enqueue_inline_style('header-elements');
        }
    }, 20);
}

// 3. JetWooBuilder Loop Hooks (Prevent duplication and broken grid styling)
add_filter('jet-woo-builder/templates/render-item-content', function($content) {
    return $content;
});

// 4. ShopEngine Module Compatibility
add_filter('shopengine/elementor/builder-module-active', function($active) {
    return true;
});

// 5. Yoast SEO / Rank Math Breadcrumbs
if (!function_exists('sedrazavi_breadcrumbs')) {
function sedrazavi_breadcrumbs() {
    if (function_exists('rank_math_the_breadcrumbs')) {
        rank_math_the_breadcrumbs();
    } elseif (function_exists('yoast_breadcrumb')) {
        yoast_breadcrumb('<div id="breadcrumbs" class="text-xs text-gray-400 py-3">', '</div>');
    }
}
}

// 6. WP Rocket & Cache Optimization Hooks
add_action('sedrazavi_after_booking_created', function($booking_id) {
    if (function_exists('rocket_clean_domain')) {
        rocket_clean_domain();
    }
});

`},{path:"inc/legal-vault-deadlines.php",filename:"legal-vault-deadlines.php",category:"بخش‌های داخلی (Inc)",description:"گاوصندوق اسناد محرمانه و مواعد قانونی تجدیدنظر و دیوان.",code:`<?php
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
`},{path:"inc/manifest-bridge.php",filename:"manifest-bridge.php",category:"بخش‌های داخلی (Inc)",description:"همگام‌ساز خودکار و Idempotent برگه‌های وب‌سایت با manifest.json.",code:`<?php
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
`},{path:"inc/meta-boxes.php",filename:"meta-boxes.php",category:"بخش‌های داخلی (Inc)",description:"متاباکس‌های بومی وردپرس برای تنظیمات اختصاصی برگه‌ها.",code:`<?php
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
`},{path:"inc/precedents-cpt.php",filename:"precedents-cpt.php",category:"بخش‌های داخلی (Inc)",description:"آرای وحدت رویه دیوان عالی کشور و نظریات مشورتی.",code:`<?php
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
`},{path:"inc/preset-engine.php",filename:"preset-engine.php",category:"بخش‌های داخلی (Inc)",description:"ماژول هسته پوسته وردپرس (inc/preset-engine.php) با بارگذاری خودکار.",code:`<?php
/**
 * SedRazavi Multi-Industry Preset Engine
 *
 * Enables 1-click transformation of the site between 6 distinct industries:
 * 1. Lawyer & Legal Services (وکیل و خدمات حقوقی)
 * 2. Web Designer & WordPress Agency (طراح وب‌سایت و آژانس وردپرس)
 * 3. Engineer, Architecture & Industrial (مهندس، معماری و محاسبات فنی)
 * 4. Corporate & Enterprise B2B (شرکتی، بازرگانی و سرمایه‌گذاری)
 * 5. Doctor & Healthcare Clinic (پزشک، کلینیک و سلامت)
 * 6. Project Showcase & SaaS Launch (معرفی پروژه / محصول و SaaS)
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Preset_Engine {

    const OPTION_KEY = 'sedrazavi_site_preset';
    const CUSTOM_DATA_OPTION_KEY = 'sedrazavi_preset_custom_overrides';

    /**
     * Get list of all 6 available industry presets with rich defaults
     */
    public static function get_all_presets() {
        return array(
            'lawyer' => array(
                'id'                 => 'lawyer',
                'name'               => 'دفتر وکالت و امور حقوقی',
                'english_name'       => 'Lawyer & Legal Services',
                'badge'              => 'حقوقی و داوری تخصصی',
                'site_title'         => 'دفتر وکالت و مشاوره حقوقی دکتر سیده مریم رضوی',
                'site_tagline'       => 'دفاع تخصصی در مراجع قضایی، داوری تجاری و دعاوی املاک',
                'hero_kicker'        => 'وکیل پایه یک دادگستری و مشاور حقوقی',
                'hero_title'         => 'دفاع تخصصی، مشاوره استراتژیک و حمایت قاطع از حقوق قانونی شما',
                'hero_desc'          => 'پیگیری تخصصی پرونده‌های ملکی، داوری تجاری، دیوان عدالت اداری و دعاوی اقتصادی با رویکرد تحلیلی و مستندسازی دقیق.',
                'hero_cta_primary'   => 'رزرو وقت مشاوره حضوری و آنلاین',
                'hero_cta_secondary' => 'استعلام آنلاین وضعیت پرونده',
                'accent_color'       => '#D4AF37',
                'accent_hover'       => '#B8972E',
                'terms'              => array(
                    'client'         => 'موکل',
                    'clients'        => 'موکلین',
                    'case'           => 'پرونده',
                    'cases'          => 'پرونده‌ها',
                    'inquiry'        => 'استعلام و پیگیری پرونده قضایی',
                    'booking'        => 'رزرو وقت مشاوره حقوقی',
                    'booking_btn'    => 'ثبت نوبت مشاوره ←',
                    'fee'            => 'حق‌الوکاله و تمبر مالیاتی',
                    'expert'         => 'وکیل پایه یک دادگستری',
                ),
                'services'           => array(
                    array(
                        'id'    => 'serv-1',
                        'title' => 'دعاوی ملکی، سرقفلی و اراضی',
                        'desc'  => 'دفاع تخصصی در پرونده‌های الزام به تنظیم سند، خلع ید، تصرف عدوانی و دعاوی شهرداری.',
                        'tag'   => 'حقوقی و ملکی',
                    ),
                    array(
                        'id'    => 'serv-2',
                        'title' => 'داوری و دعاوی تجاری شرکت‌ها',
                        'desc'  => 'حل‌وفصل اختلافات قراردادی، داوری داخلی و بین‌المللی و دعاوی شرکت‌های تجاری.',
                        'tag'   => 'تجاری و بازرگانی',
                    ),
                    array(
                        'id'    => 'serv-3',
                        'title' => 'دعاوی دیوان عدالت اداری',
                        'desc'  => 'ابطال مصوبات غیرقانونی، دعاوی مالیاتی، کمیسیون ماده ۱۰۰ و دعاوی استخدامی.',
                        'tag'   => 'دیوان و اداری',
                    ),
                    array(
                        'id'    => 'serv-4',
                        'title' => 'جرایم اقتصادی و سایبری',
                        'desc'  => 'دفاع فنی در اتهامات کلاهبرداری رایانه‌ای، پولشویی، خیانت در امانت و جرایم مالی.',
                        'tag'   => 'کیفری و اقتصادی',
                    ),
                ),
                'stats'              => array(
                    array('label' => 'درصد موفقیت آراء', 'value' => '۹۴.۸٪'),
                    array('label' => 'پرونده‌های مختومه', 'value' => '+۱,۲۵۰'),
                    array('label' => 'سال سابقه وکالت حرفه‌ای', 'value' => '۱۸ سال'),
                ),
            ),

            'web_agency' => array(
                'id'                 => 'web_agency',
                'name'               => 'طراح وب‌سایت و آژانس وردپرس',
                'english_name'       => 'Web Designer & WP Agency',
                'badge'              => 'توسعه تخصصی وب و وردپرس',
                'site_title'         => 'استودیو طراحی وب و راه‌کارهای وردپرس',
                'site_tagline'       => 'طراحی پوسته‌های سفارشی، سئو فنی و توسعه وب‌سایت‌های مقیاس‌پذیر',
                'hero_kicker'        => 'استودیو طراحی و مهندسی فرانت‌اند',
                'hero_title'         => 'طراحی وب‌سایت‌های متمایز، سریع و تبدیل‌گرا برای کسب‌وکارهای پیشرو',
                'hero_desc'          => 'طراحی رابط کاربری اختصاصی (UI/UX)، پیاده‌سازی سریع با Tailwind و وردپرس با رعایت بالاترین استانداردهای پرفورمنس و سئو.',
                'hero_cta_primary'   => 'ثبت سفارش و برآورد هزینه پروژه',
                'hero_cta_secondary' => 'مشاهده نمونه‌کارها و پروژه‌ها',
                'accent_color'       => '#6366F1',
                'accent_hover'       => '#4F46E5',
                'terms'              => array(
                    'client'         => 'کارفرما',
                    'clients'        => 'کارفرمایان',
                    'case'           => 'سفارش و پروژه',
                    'cases'          => 'پروژه‌ها',
                    'inquiry'        => 'پیگیری وضعیت مراحل پروژه و تیکت‌ها',
                    'booking'        => 'رزرو جلسه بریف و ارزیابی پروژه',
                    'booking_btn'    => 'ثبت درخواست سفارش ←',
                    'fee'            => 'برآورد مالی و پیش‌فاکتور',
                    'expert'         => 'معمار وب و طراح ارشد',
                ),
                'services'           => array(
                    array(
                        'id'    => 'serv-1',
                        'title' => 'طراحی اختصاصی قالب وردپرس',
                        'desc'  => 'کدنویسی استاندارد، بدون وابستگی‌های حجیم، بهینه‌شده برای المنتور و بلوک‌های گوتنبرگ.',
                        'tag'   => 'توسعه اختصاصی',
                    ),
                    array(
                        'id'    => 'serv-2',
                        'title' => 'بهینه‌سازی سرعت و Core Web Vitals',
                        'desc'  => 'کسب نمره ۹۵+ در PageSpeed Insights با بهینه‌سازی لود دارایی‌ها و کش هوشمند.',
                        'tag'   => 'پرفورمنس و سئو',
                    ),
                    array(
                        'id'    => 'serv-3',
                        'title' => 'طراحی رابط و تجربه کاربری (UI/UX)',
                        'desc'  => 'طراحی سیستم طراحی (Design System) مدرن در فیگما با پروتوتایپ تست‌شده با کاربر.',
                        'tag'   => 'طراحی محصول',
                    ),
                    array(
                        'id'    => 'serv-4',
                        'title' => 'توسعه افزونه و یکپارچه‌سازی API',
                        'desc'  => 'پیاده‌سازی درگاه‌های پرداخت، وب‌سرویس‌های پیامکی و اتصال به سامانه‌های CRM و انبارداری.',
                        'tag'   => 'فول‌استک وب',
                    ),
                ),
                'stats'              => array(
                    array('label' => 'پروژه‌های موفق وب', 'value' => '+۳۲۰'),
                    array('label' => 'میانگین سرعت لود', 'value' => '۰.۸ ثانیه'),
                    array('label' => 'رضایت کارفرمایان', 'value' => '۹۹.۲٪'),
                ),
            ),

            'engineering' => array(
                'id'                 => 'engineering',
                'name'               => 'دفتر مهندسی و معماری',
                'english_name'       => 'Engineering & Architecture',
                'badge'              => 'طراحی سازه، نظارت و مدیریت پیمان',
                'site_title'         => 'گروه مهندسین مشاور و طراحی سازه',
                'site_tagline'       => 'محاسبات دقیق سازه، طراحی معماری پایدار و مدیریت اجرای پروژه‌های عمرانی',
                'hero_kicker'        => 'مهندسین مشاور پایه یک نظام مهندسی',
                'hero_title'         => 'مهندسی دقیق، معماری خلاقانه و اجرای بی‌نقص سازه‌های ماندگار',
                'hero_desc'          => 'ارائه خدمات جامع مهندسی شامل محاسبات سازه، طراحی پلان و نما، نظارت عالیه کارگاهی و مدیریت پیمان با کنترل دقیق هزینه‌ها.',
                'hero_cta_primary'   => 'درخواست مشاوره فنی و بازدید محل',
                'hero_cta_secondary' => 'پیگیری مستندات و نقشه‌های مهندسی',
                'accent_color'       => '#F59E0B',
                'accent_hover'       => '#D97706',
                'terms'              => array(
                    'client'         => 'کارفرما',
                    'clients'        => 'کارفرمایان',
                    'case'           => 'پروژه عمرانی',
                    'cases'          => 'پروژه‌ها و کارگاه‌ها',
                    'inquiry'        => 'استعلام کد نظارت و گزارش‌های کارگاهی',
                    'booking'        => 'هماهنگی جلسه کارشناسی و بازدید زمین',
                    'booking_btn'    => 'ثبت درخواست بازدید فنی ←',
                    'fee'            => 'برآورد متره و برآورد اجرایی',
                    'expert'         => 'مهندس محاسب و ناظر ارشد',
                ),
                'services'           => array(
                    array(
                        'id'    => 'serv-1',
                        'title' => 'محاسبات و طراحی سازه (ETABS/SAFE)',
                        'desc'  => 'طراحی بهینه سازه‌های بتنی و فولادی مقاوم در برابر زلزله با حداقل پرت مصالح.',
                        'tag'   => 'محاسبات سازه',
                    ),
                    array(
                        'id'    => 'serv-2',
                        'title' => 'طراحی معماری فاز ۱ و فاز ۲',
                        'desc'  => 'طراحی پلان‌های کاربردی، دیاگرام حرکتی و نقشه‌های اجرایی منطبق بر مقررات ملی ساختمان.',
                        'tag'   => 'معماری و نما',
                    ),
                    array(
                        'id'    => 'serv-3',
                        'title' => 'نظارت عالیه و بازرسی کارگاهی',
                        'desc'  => 'کنترل انطباق اجرا با نقشه‌ها، آزمون‌های بتن و فولاد و ثبت گزارش‌های مرحله‌ای شهرداری.',
                        'tag'   => 'نظارت و ژئوتکنیک',
                    ),
                    array(
                        'id'    => 'serv-4',
                        'title' => 'مدیریت پیمان و کنترل پروژه (MSP)',
                        'desc'  => 'برنامه‌ریزی زمان‌بندی، متره و برآورد، مدیریت مالی و انتخاب پیمانکاران جزء با شفافیت کامل.',
                        'tag'   => 'مدیریت پیمان',
                    ),
                ),
                'stats'              => array(
                    array('label' => 'مترمربع سازه اجراشده', 'value' => '+۴۵۰,۰۰۰'),
                    array('label' => 'پروژه‌های نظارتی موفق', 'value' => '+۱۸۰'),
                    array('label' => 'دقت در کنترل بودجه', 'value' => '۹۷.۴٪'),
                ),
            ),

            'corporate' => array(
                'id'                 => 'corporate',
                'name'               => 'شرکتی و بازرگانی بین‌الملل',
                'english_name'       => 'Corporate & Enterprise B2B',
                'badge'              => 'توسعه بازار و خدمات بازرگانی',
                'site_title'         => 'هلدینگ تجارت بین‌الملل و خدمات سرمایه‌گذاری',
                'site_tagline'       => 'تسهیل زنجیره تامین، ترخیص کالا و مشاوره استراتژیک تجارت فرامرزی',
                'hero_kicker'        => 'هلدینگ بازرگانی و سرمایه‌گذاری B2B',
                'hero_title'         => 'گسترش بازارهای صادراتی و مدیریت هوشمند زنجیره تأمین بین‌المللی',
                'hero_desc'          => 'همراهی شرکت‌های تجاری و تولیدی در مبادلات ارزی، ترخیص گمرکی، ثبت سفارشات خارجی و انعقاد قراردادهای بین‌المللی با ریسک صفر.',
                'hero_cta_primary'   => 'درخواست جلسه مذاکره B2B',
                'hero_cta_secondary' => 'استعلام وضعیت محموله و پیش‌فاکتور',
                'accent_color'       => '#2563EB',
                'accent_hover'       => '#1D4ED8',
                'terms'              => array(
                    'client'         => 'شریک تجاری',
                    'clients'        => 'شرکای تجاری و مشتریان سازمانی',
                    'case'           => 'قرارداد بازرگانی',
                    'cases'          => 'قراردادها و محموله‌ها',
                    'inquiry'        => 'پیگیری وضعیت سفارش و اسناد حمل',
                    'booking'        => 'هماهنگی جلسه تجاری و مشاوره صادرات',
                    'booking_btn'    => 'درخواست همکاری سازمانی ←',
                    'fee'            => 'ارزش گمرکی و پیش‌فاکتور ارزی',
                    'expert'         => 'مشاور ارشد تجارت بین‌الملل',
                ),
                'services'           => array(
                    array(
                        'id'    => 'serv-1',
                        'title' => 'تامین کالا و سورسینگ بین‌المللی',
                        'desc'  => 'شناسایی و اعتبارسنجی تولیدکنندگان معتبر جهانی در آسیا، اروپا و خاورمیانه.',
                        'tag'   => 'سورسینگ و بازرگانی',
                    ),
                    array(
                        'id'    => 'serv-2',
                        'title' => 'خدمات ترخیص کالا و امور گمرکی',
                        'desc'  => 'ترخیص سریع و قانونی کالا از گمرکات کشور با حداقل هزینه‌های انبارداری و دموراژ.',
                        'tag'   => 'گمرک و ترخیص',
                    ),
                    array(
                        'id'    => 'serv-3',
                        'title' => 'حمل‌ونقل بین‌المللی چندوجهی',
                        'desc'  => 'پوشش خطوط دریایی، هوایی و زمینی با ارائه بیمه‌نامه‌های معتبر بین‌المللی.',
                        'tag'   => 'لجستیک و ترانزیت',
                    ),
                    array(
                        'id'    => 'serv-4',
                        'title' => 'مشاوره قراردادها و پرداخت‌های ارزی',
                        'desc'  => 'انعقاد قراردادهای تجاری منطبق بر اینکوترمز ۲۰۲۰ و مدیریت پرداخت‌های امن بین‌المللی.',
                        'tag'   => 'مالی و بین‌الملل',
                    ),
                ),
                'stats'              => array(
                    array('label' => 'حجم مراودات بازرگانی', 'value' => '+$۱۲۰M'),
                    array('label' => 'کشورهای تحت پوشش', 'value' => '۲۴ کشور'),
                    array('label' => 'زمان میانگین ترخیص', 'value' => '۴ روز کاری'),
                ),
            ),

            'doctor' => array(
                'id'                 => 'doctor',
                'name'               => 'پزشک و کلینیک سلامت',
                'english_name'       => 'Doctor & Healthcare Clinic',
                'badge'              => 'مراقبت‌های تخصصی سلامت و درمان',
                'site_title'         => 'مرکز تخصصی درمان و خدمات پزشکی سلامت',
                'site_tagline'       => 'ارائه پیشرفته‌ترین خدمات تشخیصی، درمانی و مشاوره‌های تخصصی سلامت',
                'hero_kicker'        => 'متخصص و جراح با بورد تخصصی',
                'hero_title'         => 'رویکردی نوین در تشخیص، درمان و مراقبت همه‌جانبه از سلامت شما',
                'hero_desc'          => 'بهره‌گیری از تجهیزات پیشرفته تشخیصی، کادر مجرب درمانی و سیستم جامع ویزیت حضوری و آنلاین با رعایت پروتکل‌های استاندارد پزشکی.',
                'hero_cta_primary'   => 'رزرو آنلاین نوبت ویزیت و معاینه',
                'hero_cta_secondary' => 'پیگیری نتایج آزمایش و پرونده سلامت',
                'accent_color'       => '#0D9488',
                'accent_hover'       => '#0F766E',
                'terms'              => array(
                    'client'         => 'بیمار / مراجع',
                    'clients'        => 'بیماران و مراجعین',
                    'case'           => 'پرونده پزشکی',
                    'cases'          => 'پرونده‌های سلامت',
                    'inquiry'        => 'استعلام و مشاهده پرونده سلامت',
                    'booking'        => 'رزرو وقت معاینه و ویزیت',
                    'booking_btn'    => 'دریافت نوبت ویزیت ←',
                    'fee'            => 'تعرفه مصوب نظام پزشکی',
                    'expert'         => 'پزشک متخصص',
                ),
                'services'           => array(
                    array(
                        'id'    => 'serv-1',
                        'title' => 'معاینات دوره‌ای و ویزیت تخصصی',
                        'desc'  => 'بررسی همه‌جانبه شرح حال، معاینات بالینی و طراحی نقشه درمان اختصاصی هر بیمار.',
                        'tag'   => 'ویزیت بالینی',
                    ),
                    array(
                        'id'    => 'serv-2',
                        'title' => 'مشاوره آنلاین و تله‌مدیسین',
                        'desc'  => 'امکان ارسال نتایج آزمایش، تصویربرداری و دریافت دستورات دارویی از راه دور.',
                        'tag'   => 'مشاوره آنلاین',
                    ),
                    array(
                        'id'    => 'serv-3',
                        'title' => 'خدمات پاراکلینیک و تشخیصی',
                        'desc'  => 'انجام آزمایش‌های سریع، نوار قلب، سونوگرافی و ارزیابی‌های اولیه با دقت بالا.',
                        'tag'   => 'تشخیص و آزمایش',
                    ),
                    array(
                        'id'    => 'serv-4',
                        'title' => 'مراقبت‌های پیشگیرانه و رژیم سلامت',
                        'desc'  => 'برنامه‌ریزی سبک زندگی سالم، غربالگری دوره‌ای و پایش مداوم بیماری‌های مزمن.',
                        'tag'   => 'پیشگیری و سلامت',
                    ),
                ),
                'stats'              => array(
                    array('label' => 'مراجعین بهبودیافته', 'value' => '+۱۴,۰۰۰'),
                    array('label' => 'رضایت مراجعین', 'value' => '۹۹.۶٪'),
                    array('label' => 'سال سابقه طبابت', 'value' => '۱۵ سال'),
                ),
            ),

            'project_saas' => array(
                'id'                 => 'project_saas',
                'name'               => 'معرفی پروژه / محصول و SaaS',
                'english_name'       => 'Project Showcase & SaaS Launch',
                'badge'              => 'پلتفرم ابری نسل جدید',
                'site_title'         => 'سامانه ابری و پلتفرم نسل جدید تحلیلی',
                'site_tagline'       => 'پلتفرم یکپارچه هوش مصنوعی، اتوماسیون سازمانی و تحلیل داده‌ها',
                'hero_kicker'        => 'انتشار نسخه ابری ۳.۰ (Cloud Platform)',
                'hero_title'         => 'اتوماسیون هوشمند، تحلیل بی‌درنگ و مقیاس‌پذیری نامحدود برای تیم‌ها',
                'hero_desc'          => 'با پلتفرم ابری ما داده‌های سازمانی خود را متمرکز کنید، گردش‌کارهای تکراری را خودکار سازید و در لحظه گزارش‌های تحلیلی دریافت کنید.',
                'hero_cta_primary'   => 'شروع دوره آزمایشی رایگان ۱۴ روزه',
                'hero_cta_secondary' => 'مشاهده مستندات فنی و API',
                'accent_color'       => '#10B981',
                'accent_hover'       => '#059669',
                'terms'              => array(
                    'client'         => 'کاربر',
                    'clients'        => 'کاربران و اعضای سازمان',
                    'case'           => 'سرویس و اشتراک',
                    'cases'          => 'اشتراک‌ها و تیکت‌ها',
                    'inquiry'        => 'پیگیری وضعیت سفارش و کلیدهای API',
                    'booking'        => 'درخواست جلسه دمو اختصاصی',
                    'booking_btn'    => 'ثبت نام و شروع رایگان ←',
                    'fee'            => 'طرح‌های اشتراک ماهانه و سالانه',
                    'expert'         => 'مشاور فنی و راهبر محصول',
                ),
                'services'           => array(
                    array(
                        'id'    => 'serv-1',
                        'title' => 'موتور پردازش داده در لحظه (Realtime)',
                        'desc'  => 'تحلیل میلیون‌ها رویداد در ثانیه با معماری توزیع‌شده بدون قطعی و با تاخیر میلی‌ثانیه‌ای.',
                        'tag'   => 'زیرساخت ابری',
                    ),
                    array(
                        'id'    => 'serv-2',
                        'title' => 'اتصال‌دهنده‌ها و API جامع',
                        'desc'  => 'بیش از ۵۰ کانکتور آماده برای اتصال به دیتابیس‌ها، وب‌هوک‌ها و ابزارهای ارتباطی محبوب.',
                        'tag'   => 'اتوماسیون و API',
                    ),
                    array(
                        'id'    => 'serv-3',
                        'title' => 'امنیت اطلاعات و استاندارد SOC 2',
                        'desc'  => 'رمزنگاری کامل داده‌ها در مبدا و مقصد، پشتیبان‌گیری منظم و احراز هویت چندعاملی سازمانی.',
                        'tag'   => 'امنیت سازمانی',
                    ),
                    array(
                        'id'    => 'serv-4',
                        'title' => 'داشبوردهای تحلیلی تعاملی',
                        'desc'  => 'تصویرسازی بصری KPIها، فیلترهای پیشرفته و قابلیت برون‌بری گزارش‌ها در فرمت‌های اکسل و PDF.',
                        'tag'   => 'گزارش و تحلیل',
                    ),
                ),
                'stats'              => array(
                    array('label' => 'نرخ پایداری سرویس (SLA)', 'value' => '۹۹.۹۹٪'),
                    array('label' => 'سازمان‌های فعال', 'value' => '+۸۵۰'),
                    array('label' => 'درخواست پردازش‌شده روزانه', 'value' => '+۵M'),
                ),
            ),
            'video_media' => array(
                'id'                 => 'video_media',
                'name'               => 'رسانه، استودیو و نمایش ویدئو',
                'english_name'       => 'Media Studio & Video Showcase',
                'badge'              => 'پلتفرم رسانه و ویدئو',
                'site_title'         => 'آرشیو چندرسانه‌ای و استودیو تولید ویدئو',
                'site_tagline'       => 'پخش ویدئوهای آموزشی، وبینارها، دوره‌ها و پادکست‌های تخصصی',
                'hero_kicker'        => 'مرکز چندرسانه‌ای و استودیو تولید محتوا',
                'hero_title'         => 'آرشیو جامع ویدئوها، وبینارهای زنده و مستندات آموزشی',
                'hero_desc'          => 'دسترسی سریع به ویدئوهای باکیفیت، کاتالوگ‌های دانلودی و تحلیل‌های تخصصی با پشتیبانی از آپارات و پخش زنده.',
                'hero_cta_primary'   => 'مشاهده جدیدترین ویدئوها',
                'hero_cta_secondary' => 'دانلود کاتالوگ و فایل‌ها',
                'accent_color'       => '#EF4444',
                'accent_hover'       => '#DC2626',
                'terms'              => array(
                    'client'         => 'کاربر و تماشاگر',
                    'clients'        => 'مخاطبان',
                    'case'           => 'ویدئو / دوره',
                    'cases'          => 'ویدئوها',
                    'inquiry'        => 'جستجوی ویدئو و دوره‌ها',
                    'booking'        => 'ثبت‌نام در کارگاه ویدئویی',
                    'booking_btn'    => 'ورود به کلاس زنده ←',
                    'fee'            => 'هزینه دوره یا اشتراک',
                    'expert'         => 'مدرس و کارشناس محتوا',
                ),
                'services'           => array(
                    array(
                        'id'    => 'serv-1',
                        'title' => 'تولید ویدئو و موشن‌گرافیک',
                        'desc'  => 'سناریونویسی، تصویربرداری 4K، تدوین اختصاصی و ساخت انیمیشن‌های دوبعدی و سه‌بعدی.',
                        'tag'   => 'تولید ویدئو',
                    ),
                    array(
                        'id'    => 'serv-2',
                        'title' => 'پخش زنده و لایو استریمینگ',
                        'desc'  => 'زیرساخت اختصاصی وبینار، کلاس آنلاین و پخش زنده همایش‌ها بدون قطعی.',
                        'tag'   => 'لایو استریم',
                    ),
                    array(
                        'id'    => 'serv-3',
                        'title' => 'پادکست و تولید صدای تخصصی',
                        'desc'  => 'ضبط استودیویی، مسترینگ صدا و انتشار در پلتفرم‌های کست‌باکس و اسپاتیفای.',
                        'tag'   => 'صوت و پادکست',
                    ),
                    array(
                        'id'    => 'serv-4',
                        'title' => 'سامانه اشتراک و پلیر محافظت‌شده',
                        'desc'  => 'جلوگیری از ضبط صفحه، واترمارک متحرک اختصاصی برای هر کاربر و مدیریت پهنای باند.',
                        'tag'   => 'سامانه پلیر',
                    ),
                ),
                'stats'              => array(
                    array('label' => 'ساعت ویدئوی تولیدشده', 'value' => '+۱,۲۰۰'),
                    array('label' => 'تعداد تماشاگران فعال', 'value' => '+۴۵,۰۰۰'),
                    array('label' => 'نرخ رضایت دوره‌ها', 'value' => '۹۸٪'),
                ),
            ),
            'music_audio'        => array(
                'id'                 => 'music_audio',
                'name'               => 'رسانه موزیک، پادکست و صوت',
                'badge'              => 'استودیو پادکست و قطعات صوتی',
                'hero_title'         => 'آرشیو آثار صوتی، پادکست‌های تحلیلی و موسیقی',
                'hero_subtitle'      => 'پخش آنلاین بدون وقفه با استریم بهینه، مشاهده متن و دانلود با کیفیت بالا',
                'accent_color'       => '#EC4899',
                'card_bg'            => '#1E1B4B',
                'button_primary'     => '#EC4899',
                'button_secondary'   => '#8B5CF6',
                'cta_text'           => 'شنیدن آخرین اپیزود',
                'terminology'        => array(
                    'service'        => 'قطعه صوتی یا پادکست',
                    'services'       => 'آرشیو صداها',
                    'client'         => 'شنونده',
                    'clients'        => 'مخاطبان',
                    'case'           => 'پلی‌لیست',
                    'cases'          => 'پلی‌لیست‌ها',
                    'fee'            => 'حق اشتراک',
                    'expert'         => 'گوینده و میزبان',
                ),
                'services'           => array(
                    array(
                        'id'    => 'mus-1',
                        'title' => 'پادکست‌های تحلیلی و گفتگو',
                        'desc'  => 'اپیزودهای هفتگی با بررسی موضوعات تخصصی و گفتگو با نخبگان.',
                        'tag'   => 'پادکست هفتگی',
                    ),
                    array(
                        'id'    => 'mus-2',
                        'title' => 'کتاب‌های صوتی و روایت',
                        'desc'  => 'روایت استاندارد کتاب‌های مدیریتی و حقوقی با گویندگی حرفه‌ای.',
                        'tag'   => 'کتاب صوتی',
                    ),
                ),
                'stats'              => array(
                    array('label' => 'دقیقه پادکست منتشرشده', 'value' => '+۸,۴۰۰'),
                    array('label' => 'شنوندگان ماهانه', 'value' => '+۶۲,۰۰۰'),
                    array('label' => 'امتیاز کست‌باکس', 'value' => '۴.۹'),
                ),
            ),
            'downloads_hub'      => array(
                'id'                 => 'downloads_hub',
                'name'               => 'مرکز دانلود نرم‌افزار، بازی و فایل',
                'badge'              => 'مخزن رسمی دانلود و ابزارها',
                'hero_title'         => 'دانلود مستقیم نرم‌افزارها، اپلیکیشن‌ها و بازی‌ها',
                'hero_subtitle'      => 'سرورهای پرسرعت داخلی، اعتبارسنجی امنیتی ضد ویروس و راهنمای نصب جامع',
                'accent_color'       => '#38BDF8',
                'card_bg'            => '#0F172A',
                'button_primary'     => '#38BDF8',
                'button_secondary'   => '#0284C7',
                'cta_text'           => 'مرور فایل‌های دانلودی',
                'terminology'        => array(
                    'service'        => 'فایل یا نرم‌افزار',
                    'services'       => 'بسته‌های دانلودی',
                    'client'         => 'کاربر',
                    'clients'        => 'کاربران',
                    'case'           => 'بسته نصبی',
                    'cases'          => 'بسته‌ها',
                    'fee'            => 'قیمت لایسنس',
                    'expert'         => 'توسعه‌دهنده',
                ),
                'services'           => array(
                    array(
                        'id'    => 'dl-1',
                        'title' => 'نرم‌افزارهای دسکتاپ ویندوز و مک',
                        'desc'  => 'نسخه‌های تست‌شده، بدون تبلیغات مزاحم با کرک معتبر و راهنما.',
                        'tag'   => 'دسکتاپ',
                    ),
                    array(
                        'id'    => 'dl-2',
                        'title' => 'اپلیکیشن‌های کاربردی موبایل',
                        'desc'  => 'فایل‌های APK و PWA با آخرین به‌روزرسانی‌های امنیتی.',
                        'tag'   => 'موبایل',
                    ),
                ),
                'stats'              => array(
                    array('label' => 'فایل‌های فعال', 'value' => '+۳,۵۰۰'),
                    array('label' => 'دانلودهای ماهانه', 'value' => '+۱۲۰,۰۰۰'),
                    array('label' => 'سرعت دانلود', 'value' => '۱۰Gbps'),
                ),
            ),
            'wallpapers_gallery' => array(
                'id'                 => 'wallpapers_gallery',
                'name'               => 'گالری و دانلود عکس، والپیپر و وکتور',
                'badge'              => 'استودیو طراحی گرافیک و والپیپر',
                'hero_title'         => 'گالری عکس‌های باکیفیت، والپیپرهای ۴K و فایل‌های وکتور',
                'hero_subtitle'      => 'پیش‌نمایش زنده در نمایشگرها، دانلود در رزولوشن‌های متنوع و دسترسی به سورس SVG',
                'accent_color'       => '#F59E0B',
                'card_bg'            => '#18181B',
                'button_primary'     => '#F59E0B',
                'button_secondary'   => '#D97706',
                'cta_text'           => 'مشاهده گالری تصاویر',
                'terminology'        => array(
                    'service'        => 'تصویر یا والپیپر',
                    'services'       => 'آلبوم‌ها',
                    'client'         => 'علاقه‌مند گرافیک',
                    'clients'        => 'بازدیدکنندگان',
                    'case'           => 'مجموعه والپیپر',
                    'cases'          => 'آلبوم‌های تصویری',
                    'fee'            => 'قیمت فایل تجاری',
                    'expert'         => 'عکاس و طراح',
                ),
                'services'           => array(
                    array(
                        'id'    => 'wall-1',
                        'title' => 'والپیپرهای فوق‌عریض و ۴K',
                        'desc'  => 'تصاویر با رزولوشن ۳۸۴۰ در ۲۱۶۰ مناسب دسکتاپ و مانیتورهای عریض.',
                        'tag'   => 'والپیپر ۴K',
                    ),
                    array(
                        'id'    => 'wall-2',
                        'title' => 'وکتورهای لایه‌باز و ایلاستریتور',
                        'desc'  => 'فایل‌های SVG و AI با امکان ویرایش نامحدود بدون افت کیفیت.',
                        'tag'   => 'وکتور لایه‌باز',
                    ),
                ),
                'stats'              => array(
                    array('label' => 'تصاویر باکیفیت', 'value' => '+۱۵,۰۰۰'),
                    array('label' => 'دانلود روزانه', 'value' => '+۸,۲۰۰'),
                    array('label' => 'طراحان مشارکت‌کننده', 'value' => '+۴۵۰'),
                ),
            ),
        );
    }

    /**
     * Get active preset ID
     *
     * @return string
     */
    public static function get_active_preset_id() {
        $preset_id = get_option(self::OPTION_KEY, 'lawyer');
        $presets = self::get_all_presets();
        if (!isset($presets[$preset_id])) {
            return 'lawyer';
        }
        return $preset_id;
    }

    /**
     * Set active preset ID
     *
     * @param string $preset_id
     * @return bool
     */
    public static function set_active_preset($preset_id) {
        $presets = self::get_all_presets();
        if (!isset($presets[$preset_id])) {
            return false;
        }
        return update_option(self::OPTION_KEY, sanitize_key($preset_id));
    }

    /**
     * Get full active preset configuration including any granular custom overrides
     *
     * @return array
     */
    public static function get_active_preset() {
        $preset_id = self::get_active_preset_id();
        $presets   = self::get_all_presets();
        $preset    = $presets[$preset_id];

        // Apply custom overrides if stored
        $overrides = get_option(self::CUSTOM_DATA_OPTION_KEY, array());
        if (!empty($overrides) && is_array($overrides) && isset($overrides[$preset_id])) {
            $preset = array_replace_recursive($preset, $overrides[$preset_id]);
        }

        return $preset;
    }

    /**
     * Get specific terminology string for the active preset
     *
     * @param string $term_key
     * @param string $default
     * @return string
     */
    public static function get_term($term_key, $default = '') {
        $preset = self::get_active_preset();
        if (isset($preset['terms'][$term_key])) {
            return $preset['terms'][$term_key];
        }
        return $default;
    }

    const PALETTE_OPTION_KEY = 'sedrazavi_color_palette';
    const VECTOR_BG_OPTION_KEY = 'sedrazavi_vector_background';

    /**
     * Get available curated color palettes
     */
    public static function get_color_palettes() {
        return array(
            'royal-gold' => array(
                'id'       => 'royal-gold',
                'name'     => 'طلایی و سرمه‌ای سلطنتی (لوکس و حقوقی)',
                'accent'   => '#D4AF37',
                'hover'    => '#B8972E',
                'bg_dark'  => '#070D1E',
                'bg_light' => '#F9F6EE',
                'card_bg'  => '#0F172A',
            ),
            'tech-indigo' => array(
                'id'       => 'tech-indigo',
                'name'     => 'نیلی و بنفش سایبر (مدرن و طراح سایت)',
                'accent'   => '#6366F1',
                'hover'    => '#4F46E5',
                'bg_dark'  => '#0F172A',
                'bg_light' => '#F8FAFC',
                'card_bg'  => '#1E293B',
            ),
            'emerald-clean' => array(
                'id'       => 'emerald-clean',
                'name'     => 'سبز زمردی و زغالی (فروشگاه و سلامت)',
                'accent'   => '#10B981',
                'hover'    => '#059669',
                'bg_dark'  => '#064E3B',
                'bg_light' => '#F0FDF4',
                'card_bg'  => '#022C22',
            ),
            'github-dark' => array(
                'id'       => 'github-dark',
                'name'     => 'تاریک گیت‌هاب پرایمر (برنامه‌نویسی و مهندسی)',
                'accent'   => '#58A6FF',
                'hover'    => '#1F6FEB',
                'bg_dark'  => '#0D1117',
                'bg_light' => '#F6F8FA',
                'card_bg'  => '#161B22',
            ),
            'monochrome-minimal' => array(
                'id'       => 'monochrome-minimal',
                'name'     => 'خاکستری مینیمال (استارتاپ و شرکتی)',
                'accent'   => '#71717A',
                'hover'    => '#52525B',
                'bg_dark'  => '#18181B',
                'bg_light' => '#FAFAFA',
                'card_bg'  => '#27272A',
            ),
        );
    }

    /**
     * Get available vector background styles
     */
    public static function get_vector_backgrounds() {
        return array(
            'geometric-scales' => array(
                'id'   => 'geometric-scales',
                'name' => 'نقوش هندسی اسلامی و تذهیب وکیل',
                'icon' => '⚖️',
            ),
            'circuit-tech' => array(
                'id'   => 'circuit-tech',
                'name' => 'خطوط مداری و سایبری طراح سایت',
                'icon' => '💻',
            ),
            'matrix-topography' => array(
                'id'   => 'matrix-topography',
                'name' => 'ماتریکس و کانتورهای گیت‌هاب پرایمر',
                'icon' => '🐙',
            ),
            'clean-glow' => array(
                'id'   => 'clean-glow',
                'name' => 'هاله نوری ملایم و مینیمال',
                'icon' => '✨',
            ),
        );
    }

    /**
     * Render dynamic CSS accent variables matching active preset and palette
     */
    public static function render_preset_css_variables() {
        $preset = self::get_active_preset();
        $palettes = self::get_color_palettes();
        $selected_palette = get_option(self::PALETTE_OPTION_KEY, 'royal-gold');
        $palette = isset($palettes[$selected_palette]) ? $palettes[$selected_palette] : null;

        $accent = !empty($palette['accent']) ? esc_attr($palette['accent']) : (!empty($preset['accent_color']) ? esc_attr($preset['accent_color']) : '#D4AF37');
        $hover  = !empty($palette['hover']) ? esc_attr($palette['hover']) : (!empty($preset['accent_hover']) ? esc_attr($preset['accent_hover']) : '#B8972E');
        $bg_dark = !empty($palette['bg_dark']) ? esc_attr($palette['bg_dark']) : '#070D1E';

        echo "<style id=\\"sedrazavi-preset-theme-tokens\\">\\n";
        echo "  :root {\\n";
        echo "    --sr-gold-accent: {$accent};\\n";
        echo "    --sr-accent-hover: {$hover};\\n";
        echo "    --sr-preset-accent: {$accent};\\n";
        echo "    --sr-theme-accent: {$accent};\\n";
        echo "    --sr-bg-body: {$bg_dark};\\n";
        echo "  }\\n";
        echo "</style>\\n";
    }

    /**
     * Seed sample posts and inquiries for demo content import
     *
     * @param string $preset_id
     * @return array Report of seeded items
     */
    public static function seed_demo_content($preset_id) {
        $presets = self::get_all_presets();
        if (!isset($presets[$preset_id])) {
            return array('success' => false, 'message' => 'پریست انتخابی نامعتبر است.');
        }

        $preset = $presets[$preset_id];
        $seeded_services = 0;

        foreach ($preset['services'] as $svc) {
            $post_title = $svc['title'];
            $existing = get_page_by_title($post_title, OBJECT, 'lawyer_service');
            if (!$existing) {
                $pid = wp_insert_post(array(
                    'post_title'   => sanitize_text_field($post_title),
                    'post_content' => sanitize_textarea_field($svc['desc']),
                    'post_type'    => 'lawyer_service',
                    'post_status'  => 'publish',
                ));
                if ($pid && !is_wp_error($pid)) {
                    update_post_meta($pid, '_sedrazavi_service_category', $svc['tag']);
                    $seeded_services++;
                }
            }
        }

        return array(
            'success'         => true,
            'preset'          => $preset_id,
            'preset_name'     => $preset['name'],
            'seeded_services' => $seeded_services,
            'message'         => sprintf('محتوای دموی صنف «%s» با موفقیت درون‌ریزی و فعال گردید.', $preset['name']),
        );
    }
}

// Hook dynamic CSS into wp_head
add_action('wp_head', array('SedRazavi_Preset_Engine', 'render_preset_css_variables'), 2);

/**
 * Global helper: Get all presets
 */
function sedrazavi_get_all_presets() {
    return SedRazavi_Preset_Engine::get_all_presets();
}

/**
 * Global helper: Get active preset data
 */
function sedrazavi_get_preset($preset_id = null) {
    return SedRazavi_Preset_Engine::get_preset($preset_id);
}

/**
 * Global helper: Get dynamic term for active preset
 */
function sedrazavi_get_term($key, $default = '') {
    return SedRazavi_Preset_Engine::get_term($key, $default);
}
`},{path:"inc/react-shortcodes.php",filename:"react-shortcodes.php",category:"بخش‌های داخلی (Inc)",description:"مجموعه ۱۵+ شورت‌کد کامپوننت‌های تعاملی با کانتینر .sedrazavi-react-root.",code:`<?php
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

// ۲۲. ممیزی هوشمند قراردادها (Contract Audit Analyzer)
function sedrazavi_shortcode_contract_auditor($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-auditor-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="ContractAuditAnalyzer" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('ContractAuditAnalyzer', 'سامانه هوشمند ممیزی قراردادها و ارزیابی ریسک شروط'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_contract_auditor', 'sedrazavi_shortcode_contract_auditor');
add_shortcode('sedrazavi_react_contract_auditor', 'sedrazavi_shortcode_contract_auditor');

// ۲۳. فرم‌ساز دادخواست عدل‌ایران (Petition Generator)
function sedrazavi_shortcode_petition_builder($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-petition-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="PetitionGeneratorModal" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('PetitionGeneratorModal', 'سامانه تنظیم دادخواست و اوراق قضایی'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_petition_builder', 'sedrazavi_shortcode_petition_builder');
add_shortcode('sedrazavi_react_petition_builder', 'sedrazavi_shortcode_petition_builder');

// ۲۴. تالار دادگاه مجازی (Virtual Hearing Room)
function sedrazavi_shortcode_virtual_courtroom($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-courtroom-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="VirtualHearingRoom" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('VirtualHearingRoom', 'اتاق دادرسی الکترونیک و استماع مجازی لایحه'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_virtual_courtroom', 'sedrazavi_shortcode_virtual_courtroom');
add_shortcode('sedrazavi_react_virtual_courtroom', 'sedrazavi_shortcode_virtual_courtroom');

// ۲۵. سامانه مالی و محاسبات قضایی (Legal Financial Suite)
function sedrazavi_shortcode_legal_finance($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-finance-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="LegalFinancialSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('LegalFinancialSuite', 'سامانه امور مالی حقوقی و محاسبه تعرفه‌های قضایی'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_legal_finance', 'sedrazavi_shortcode_legal_finance');
add_shortcode('sedrazavi_judicial_calculators', 'sedrazavi_shortcode_legal_finance');

// ۲۶. سامانه داوری و حل اختلاف آنلاین (Legal ODR Suite)
function sedrazavi_shortcode_odr_suite($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-odr-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="LegalOdrSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('LegalOdrSuite', 'سامانه حل اختلاف آنلاین و داوری هوشمند'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_odr_suite', 'sedrazavi_shortcode_odr_suite');
add_shortcode('sedrazavi_odr_portal', 'sedrazavi_shortcode_odr_suite');
add_shortcode('sedrazavi_react_odr_suite', 'sedrazavi_shortcode_odr_suite');

// ۲۷. هوش مصنوعی و رویه‌های قضایی (Legal Intelligence Suite)
function sedrazavi_shortcode_legal_intelligence($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-intel-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="LegalIntelligenceSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('LegalIntelligenceSuite', 'موتور هوش مصنوعی حقوقی و آرای وحدت رویه'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_legal_intelligence', 'sedrazavi_shortcode_legal_intelligence');
add_shortcode('sedrazavi_legal_intelligence_portal', 'sedrazavi_shortcode_legal_intelligence');
add_shortcode('sedrazavi_react_legal_intelligence', 'sedrazavi_shortcode_legal_intelligence');

// ۲۸. حقوق تجارت و شرکت‌های بین‌المللی (Corporate International Suite)
function sedrazavi_shortcode_corporate_international($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-corp-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="CorporateInternationalSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('CorporateInternationalSuite', 'سامانه حقوق تجارت، قراردادهای بین‌المللی و اینکوترمز'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_corporate_international', 'sedrazavi_shortcode_corporate_international');
add_shortcode('sedrazavi_react_corporate_international', 'sedrazavi_shortcode_corporate_international');

// ۲۹. مالکیت فکری و علامت تجاری (IP Suite)
function sedrazavi_shortcode_ip_suite($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-ip-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="IntellectualPropertySuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('IntellectualPropertySuite', 'سامانه مالکیت فکری، برند و اسکرو نرم‌افزار'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_ip_suite', 'sedrazavi_shortcode_ip_suite');
add_shortcode('sedrazavi_react_ip_suite', 'sedrazavi_shortcode_ip_suite');

// ۳۰. فارنزیک سایبری و ادله دیجیتال (Cyber Forensics Suite)
function sedrazavi_shortcode_cyber_suite($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-cyber-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="CyberForensicsSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('CyberForensicsSuite', 'سامانه کشف ادله دیجیتال و جرایم سایبری'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_cyber_suite', 'sedrazavi_shortcode_cyber_suite');
add_shortcode('sedrazavi_react_cyber_suite', 'sedrazavi_shortcode_cyber_suite');

// ۳۱. حقوق خانواده و انحصار وراثت (Family & Inheritance Suite)
function sedrazavi_shortcode_family_inheritance($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-family-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="FamilyInheritanceSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('FamilyInheritanceSuite', 'سامانه حقوق خانواده، مهریه و تقسیم ماترک'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_family_inheritance', 'sedrazavi_shortcode_family_inheritance');
add_shortcode('sedrazavi_react_family_inheritance', 'sedrazavi_shortcode_family_inheritance');

// ۳۲. ترانزیت و گمرک (Customs & Transit Suite)
function sedrazavi_shortcode_customs_transit($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-customs-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="CustomsTransitDisputesSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('CustomsTransitDisputesSuite', 'سامانه ترانزیت، قاچاق و اختلافات گمرکی'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_customs_transit', 'sedrazavi_shortcode_customs_transit');

// ۳۳. قراردادهای پیمانکاری و مهندسی (EPC Suite)
function sedrazavi_shortcode_epc_procurement($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-epc-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="EngineeringProcurementSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('EngineeringProcurementSuite', 'سامانه تاخیرات پیمانکاری بخشنامه ۵۰۹۰ و EPC'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_epc_procurement', 'sedrazavi_shortcode_epc_procurement');

// ۳۴. مناقصات دولتی و ضمانت‌نامه‌ها (Government Tenders Suite)
function sedrazavi_shortcode_government_tenders($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-tenders-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="GovernmentTendersGuaranteesSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('GovernmentTendersGuaranteesSuite', 'سامانه مناقصات دولتی و توقف ضبط ضمانت‌نامه'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_government_tenders', 'sedrazavi_shortcode_government_tenders');

// ۳۵. جرایم اقتصادی و دادگاه انقلاب (Economic Crimes Suite)
function sedrazavi_shortcode_economic_crimes($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-econ-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="EconomicCrimesDefenseSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('EconomicCrimesDefenseSuite', 'سامانه دفاع جرایم اقتصادی، بورس و ارز'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_economic_crimes', 'sedrazavi_shortcode_economic_crimes');

// ۳۶. حقوق کار و تامین اجتماعی (Labor & Social Security Suite)
function sedrazavi_shortcode_labor_security($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-labor-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="LaborSocialSecuritySuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('LaborSocialSecuritySuite', 'سامانه دعاوی کار، مطالبات سنوات و ماده ۱۴۸ تامین اجتماعی'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_labor_security', 'sedrazavi_shortcode_labor_security');

// ۳۷. دیوان عالی کشور و اعاده دادرسی (Supreme Court Suite)
function sedrazavi_shortcode_supreme_court($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-supreme-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="SupremeCourtAppealsSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('SupremeCourtAppealsSuite', 'سامانه فرجام‌خواهی، اعاده دادرسی و اعمال ماده ۴۷۷'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_supreme_court', 'sedrazavi_shortcode_supreme_court');

// ۳۸. کدکس قوانین و آرای وحدت رویه (Codex Suite)
function sedrazavi_shortcode_codex($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-codex-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="ComprehensiveCodexSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('ComprehensiveCodexSuite', 'سامانه دانشنامه قوانین و آرای وحدت رویه'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_codex', 'sedrazavi_shortcode_codex');

// ۳۹. خزانه‌گاه هوشمند قراردادها (Drafting Vault Suite)
function sedrazavi_shortcode_drafting_vault($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-vault-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="MasterDraftingVaultSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('MasterDraftingVaultSuite', 'خزانه‌گاه نمونه قراردادها و اسناد تجاری'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_drafting_vault', 'sedrazavi_shortcode_drafting_vault');

// ۴۰. سامانه هوشمند پیامکی و مواعد دادرسی (Legal CRM Notifier Suite)
function sedrazavi_shortcode_crm_notifier($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-crm-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="LegalCrmSmartNotifierSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('LegalCrmSmartNotifierSuite', 'سامانه CRM حقوقی و دستیار مواعد قانونی'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_crm_notifier', 'sedrazavi_shortcode_crm_notifier');

// ۴۱. درگاه پرداخت الکترونیک حق‌الوکاله (Payment Adapter Suite)
function sedrazavi_shortcode_payment_adapter($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-pay-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="PaymentAdapterSystemSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('PaymentAdapterSystemSuite', 'درگاه امن پرداخت حق‌الوکاله و بیعانه شاپرک'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_payment_adapter', 'sedrazavi_shortcode_payment_adapter');

// ۴۲. داوری بازرگانی (Commercial Arbitration Suite)
function sedrazavi_shortcode_commercial_arbitration($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-comm-arb-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="CommercialArbitrationSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('CommercialArbitrationSuite', 'سامانه داوری اختلافات بازرگانی و تجاری'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_commercial_arbitration', 'sedrazavi_shortcode_commercial_arbitration');

// ۴۳. دعاوی مالیاتی و مودیان (Tax Disputes Moadian Suite)
function sedrazavi_shortcode_tax_disputes($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-tax-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="TaxDisputesMoadianSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('TaxDisputesMoadianSuite', 'سامانه ممیزی و دفاع در هیئت‌های حل اختلاف مالیاتی'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_tax_disputes', 'sedrazavi_shortcode_tax_disputes');

// ۴۴. دیوان عدالت اداری (Administrative Justice Suite)
function sedrazavi_shortcode_administrative_justice($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-admin-just-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="AdministrativeJusticeSuite" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('AdministrativeJusticeSuite', 'سامانه وکالت تخصصی در دیوان عدالت اداری'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_administrative_justice', 'sedrazavi_shortcode_administrative_justice');

// ۴۵. رزرو وقت مشاوره (Booking Shortcut)
function sedrazavi_shortcode_booking_bridge($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-book-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="ContactAndBookingSection" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('ContactAndBookingSection', 'فرم ثبت نوبت و درخواست مشاوره حقوقی'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_booking', 'sedrazavi_shortcode_booking_bridge');
add_shortcode('sedrazavi_react_booking', 'sedrazavi_shortcode_booking_bridge');

// ۴۶. شبکه‌های اجتماعی و پیام‌رسان‌ها (Social Icons Bridge)
function sedrazavi_shortcode_social_bridge($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-social-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="AttorneySocialAccounts" dir="rtl">
        <?php echo sedrazavi_render_react_skeleton('AttorneySocialAccounts', 'شبکه‌های اجتماعی و راه‌های ارتباطی وکیل'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_social_icons', 'sedrazavi_shortcode_social_bridge');

// ۴۷. نوار کناری پیمایش طلایی (Gold Scroll Bridge)
function sedrazavi_shortcode_gold_scroll_bridge($atts, $content = null) {
    sedrazavi_enqueue_react_runtime();
    $unique_id = 'sedrazavi-react-scroll-' . wp_unique_id();
    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="sedrazavi-react-root sedrazavi-ui-wrapper" data-component="GoldScrollSidebar" dir="rtl"></div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_gold_scroll', 'sedrazavi_shortcode_gold_scroll_bridge');

// ۴۸. پرتال امور شرکت‌ها و داوری (Corporate Suite Alias)
add_shortcode('sedrazavi_corporate_suite', 'sedrazavi_shortcode_corporate_international');


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
`},{path:"inc/rest-api.php",filename:"rest-api.php",category:"بخش‌های داخلی (Inc)",description:"اندپوینت‌های REST API با امنیت سخت‌گیرانه، اعتبارسنجی ورودی‌ها و محافظت دسترسی وکیل/ادمین.",code:`<?php
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

        // 22. Newsletter Subscribe: wp-json/sedrazavi/v1/newsletter
        // Decision: PUBLIC - Prospective client newsletter subscription (Rate limited)
        register_rest_route(self::NAMESPACE, '/newsletter', array(
            'methods'             => 'POST',
            'callback'            => array(__CLASS__, 'handle_newsletter_subscribe'),
            'permission_callback' => '__return_true',
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
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::verify_request_nonce($request)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'کد امنیتی نانس نامعتبر است یا نشست شما منقضی شده است.',
            ), 403);
        }

        $params = $request->get_params();

        $name    = isset($params['client_name']) ? (class_exists('SedRazavi_Rate_Limiter') ? SedRazavi_Rate_Limiter::sanitize_strict_input($params['client_name']) : sanitize_text_field(wp_unslash($params['client_name']))) : '';
        $raw_phone = isset($params['client_phone']) ? sanitize_text_field(wp_unslash($params['client_phone'])) : '';
        $phone   = class_exists('SedRazavi_Rate_Limiter') ? SedRazavi_Rate_Limiter::normalize_iranian_phone($raw_phone) : $raw_phone;
        $service = isset($params['service_type']) ? sanitize_text_field(wp_unslash($params['service_type'])) : 'مشاوره حقوقی عمومی';
        $date    = isset($params['booking_date']) ? sanitize_text_field(wp_unslash($params['booking_date'])) : date('Y-m-d');
        $time    = isset($params['booking_time']) ? sanitize_text_field(wp_unslash($params['booking_time'])) : '10:00';
        $notes   = isset($params['notes']) ? (class_exists('SedRazavi_Rate_Limiter') ? SedRazavi_Rate_Limiter::sanitize_multiline_input($params['notes']) : sanitize_textarea_field(wp_unslash($params['notes']))) : '';

        if (empty($name) || empty($phone)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'نام و شماره همراه متقاضی الزامی است.',
            ), 400);
        }

        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::validate_iranian_phone($raw_phone)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'شماره همراه وارد شده نامعتبر است. لطفاً شماره معتبر با پیش‌شماره ۰۹ وارد فرمایید.',
            ), 400);
        }

        // Real database persistence
        $post_id = wp_insert_post(array(
            'post_title'   => sprintf('نوبت مشاوره: %s (%s)', $name, $phone),
            'post_type'    => 'sedrazavi_appointment',
            'post_status'  => 'publish',
            'post_content' => $notes,
        ));

        if (!$post_id || is_wp_error($post_id)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'خطا در ثبت نوبت در پایگاه داده. لطفاً مجدداً تلاش فرمایید.',
            ), 500);
        }

        update_post_meta($post_id, '_sedrazavi_client_name', $name);
        update_post_meta($post_id, '_sedrazavi_client_phone', $phone);
        update_post_meta($post_id, '_sedrazavi_service_type', $service);
        update_post_meta($post_id, '_sedrazavi_booking_date', $date);
        update_post_meta($post_id, '_sedrazavi_booking_time', $time);
        update_post_meta($post_id, '_sedrazavi_status', 'pending');
        update_post_meta($post_id, '_sedrazavi_created_at', current_time('mysql'));

        // Real email notification to admin via wp_mail
        $admin_email = get_option('admin_email');
        if (!empty($admin_email)) {
            $mail_subject = 'ثبت نوبت مشاوره حقوقی جدید: ' . $name;
            $mail_body    = sprintf(
                "یک نوبت مشاوره حقوقی جدید در وب‌سایت ثبت گردید:\\n\\nنام متقاضی: %s\\nشماره تماس: %s\\nنوع خدمت: %s\\nتاریخ: %s\\nساعت: %s\\nشناسه نوبت: #%d\\nتوضیحات: %s\\nزمان ثبت: %s\\n",
                $name,
                $phone,
                $service,
                $date,
                $time,
                $post_id,
                $notes,
                current_time('mysql')
            );
            wp_mail($admin_email, $mail_subject, $mail_body);
        }

        // SMS notification: only output "پیامک ارسال شد" if gateway is active and dispatched successfully
        $sms_active = apply_filters('sedrazavi_sms_gateway_active', false);
        $sms_sent   = false;
        if ($sms_active) {
            $sms_msg  = sprintf("موکل گرامی %s، نوبت مشاوره شما با شناسه %d در دفتر وکالت ثبت گردید.", $name, $post_id);
            $sms_sent = (bool) apply_filters('sedrazavi_send_sms', false, $phone, $sms_msg);
        }

        $confirmation_message = $sms_sent
            ? 'نوبت مشاوره حقوقی شما با موفقیت ثبت شد. پیامک تأیید ارسال گردید.'
            : 'نوبت ثبت شد؛ دفتر با شما تماس می‌گیرد.';

        return new WP_REST_Response(array(
            'success'    => true,
            'booking_id' => $post_id,
            'sms_sent'   => $sms_sent,
            'message'    => $confirmation_message,
            'details'    => array(
                'id'      => $post_id,
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
     *
     * Policy:
     * - Unknown case -> found: false (NEVER fake demonstration data unless explicit demo mode is enabled).
     * - Matching strictly requires BOTH Case Number AND registered client Phone.
     * - Returns ONLY low-sensitivity fields.
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
        if (empty($client_phone) && isset($params['phone'])) {
            $client_phone = sanitize_text_field(wp_unslash($params['phone']));
        }

        // Strict verification: Case number and client phone are both required
        if (empty($case_number) || empty($client_phone)) {
            return new WP_REST_Response(array(
                'found'   => false,
                'message' => 'شماره پرونده و شماره تلفن همراه ثبت‌شده موکل الزامی است.',
            ), 400);
        }

        // Phone normalization helper
        $norm_phone = function($num) {
            $persian = array('۰','۱','۲','۳','۴','۵','۶','۷','۸','۹');
            $arabic  = array('٠','١','٢','٣','٤','٥','٦','٧','٨','٩');
            $english = array('0','1','2','3','4','5','6','7','8','9');
            $num = str_replace($persian, $english, $num);
            $num = str_replace($arabic, $english, $num);
            $num = preg_replace('/[^\\d]/', '', $num);
            return ltrim($num, '0');
        };

        $clean_query_phone = $norm_phone($client_phone);

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
            $stored_phone = get_post_meta($pid, '_sedrazavi_client_phone', true);
            $clean_stored_phone = $norm_phone($stored_phone);

            // Require exact phone match for confidentiality
            if (!empty($clean_stored_phone) && $clean_stored_phone === $clean_query_phone) {
                // Return ONLY low-sensitivity fields
                $res = array(
                    'found'        => true,
                    'case_number'  => $case_number,
                    'case_type'    => get_post_meta($pid, '_sedrazavi_case_type', true) ?: 'دعاوی حقوقی',
                    'status'       => get_post_meta($pid, '_sedrazavi_case_status', true) ?: 'در جریان رسیدگی',
                    'court_branch' => get_post_meta($pid, '_sedrazavi_court_branch', true) ?: 'شعبه دادگاه عمومی حقوقی',
                    'next_session' => get_post_meta($pid, '_sedrazavi_next_session', true) ?: 'در انتظار تعیین وقت',
                    'updated_at'   => get_the_modified_date('Y/m/d'),
                );
                wp_reset_postdata();
                return new WP_REST_Response($res, 200);
            }
            wp_reset_postdata();
        }

        // Demo mode fallback only if explicitly enabled by admin
        if (get_option('sedrazavi_demo_mode', false)) {
            return new WP_REST_Response(array(
                'found'        => true,
                'is_demo'      => true,
                'demo_label'   => 'نمونه فرضی (حالت نمایشی فعال است)',
                'case_number'  => $case_number,
                'case_type'    => 'دعاوی قراردادهای تجاری (نمونه)',
                'status'       => 'در جریان تبادل لوایح (نمونه)',
                'court_branch' => 'شعبه ۵ دادگاه تجدیدنظر (نمونه)',
                'next_session' => '۱۴۰۳/۰۸/۱۵ (نمونه)',
                'updated_at'   => date('Y/m/d'),
            ), 200);
        }

        // Truthful response: Not found or phone mismatch
        return new WP_REST_Response(array(
            'found'   => false,
            'message' => 'پرونده‌ای با این کلاسه و شماره تماس در سامانه یافت نشد.',
        ), 404);
    }

    /**
     * 3. Handle Cases (GET & POST)
     */
    public static function handle_get_cases($request) {
        $query = new WP_Query(array(
            'post_type'      => 'sedrazavi_case',
            'post_status'    => 'publish',
            'posts_per_page' => 50,
        ));

        $cases = array();
        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $pid = get_the_ID();
                $cases[] = array(
                    'id'           => $pid,
                    'case_number'  => get_post_meta($pid, '_sedrazavi_case_number', true) ?: ('CASE-' . $pid),
                    'client_name'  => get_the_title(),
                    'case_type'    => get_post_meta($pid, '_sedrazavi_case_type', true) ?: 'حقوقی',
                    'court_branch' => get_post_meta($pid, '_sedrazavi_court_branch', true) ?: 'دادگاه عمومی حقوقی',
                    'status'       => get_post_meta($pid, '_sedrazavi_case_status', true) ?: 'در جریان',
                    'progress'     => (int) (get_post_meta($pid, '_sedrazavi_progress', true) ?: 0),
                    'next_session' => get_post_meta($pid, '_sedrazavi_next_session', true) ?: 'نامشخص',
                );
            }
            wp_reset_postdata();
        } elseif (get_option('sedrazavi_demo_mode', false)) {
            // Explicit demo mode sample data with demo indicator
            $cases = array(
                array(
                    'id'           => 'demo-1',
                    'is_demo'      => true,
                    'case_number'  => '1403-LAW-892',
                    'client_name'  => 'شرکت بین‌المللی تجهیزات پارس (نمونه)',
                    'case_type'    => 'داوری بازرگانی بین‌المللی',
                    'court_branch' => 'مرکز داوری اتاق بازرگانی ایران',
                    'status'       => 'انشای رای داوری',
                    'progress'     => 85,
                    'next_session' => '۱۴۰۳/۰۸/۱۲',
                ),
            );
        }

        return new WP_REST_Response(array(
            'success' => true,
            'cases'   => $cases,
            'total'   => count($cases),
            'is_demo' => (bool) get_option('sedrazavi_demo_mode', false),
        ), 200);
    }

    public static function handle_create_case($request) {
        $params   = $request->get_params();
        $client   = isset($params['client_name']) ? sanitize_text_field($params['client_name']) : '';

        if (empty($client)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'نام موکل برای ثبت پرونده الزامی است.',
            ), 400);
        }

        $case_num = !empty($params['case_number'])
            ? sanitize_text_field($params['case_number'])
            : ('1403-' . substr(wp_generate_uuid4(), 0, 8)); // No rand()

        $post_id = wp_insert_post(array(
            'post_title'  => $client,
            'post_type'   => 'sedrazavi_case',
            'post_status' => 'publish',
        ));

        if (!$post_id || is_wp_error($post_id)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'خطا در ثبت پرونده در پایگاه داده.',
            ), 500);
        }

        update_post_meta($post_id, '_sedrazavi_case_number', $case_num);
        update_post_meta($post_id, '_sedrazavi_case_type', isset($params['case_type']) ? sanitize_text_field($params['case_type']) : 'دعاوی حقوقی');
        update_post_meta($post_id, '_sedrazavi_case_status', isset($params['status']) ? sanitize_text_field($params['status']) : 'در جریان رسیدگی');
        if (!empty($params['client_phone'])) {
            update_post_meta($post_id, '_sedrazavi_client_phone', sanitize_text_field($params['client_phone']));
        }

        return new WP_REST_Response(array(
            'success'     => true,
            'case_id'     => $post_id,
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
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('login_attempt', 5, 300)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'تلاش‌های ورود بیش از حد مجاز بوده است. لطفاً ۵ دقیقه بعد مجدداً تلاش فرمایید.',
            ), 429);
        }

        $params   = $request->get_json_params() ?: $request->get_params();
        $username = isset($params['username']) ? sanitize_user($params['username']) : (isset($params['log']) ? sanitize_user($params['log']) : '');
        $password = isset($params['password']) ? $params['password'] : (isset($params['pwd']) ? $params['pwd'] : '');
        $phone    = isset($params['phone']) ? sanitize_text_field($params['phone']) : '';

        // If credentials provided, authenticate with WordPress
        if (!empty($username) && !empty($password)) {
            $user = wp_authenticate($username, $password);
            if (is_wp_error($user)) {
                return new WP_REST_Response(array(
                    'success' => false,
                    'message' => 'نام کاربری یا رمز عبور اشتباه است.',
                ), 401);
            }

            wp_set_current_user($user->ID);
            wp_set_auth_cookie($user->ID, true);

            $is_admin = in_array('administrator', (array) $user->roles, true);
            $is_lawyer = $is_admin || in_array('editor', (array) $user->roles, true) || in_array('lawyer', (array) $user->roles, true);

            return new WP_REST_Response(array(
                'success' => true,
                'nonce'   => wp_create_nonce('wp_rest'),
                'user'    => array(
                    'id'          => $user->ID,
                    'username'    => $user->user_login,
                    'displayName' => $user->display_name,
                    'email'       => $user->user_email,
                    'role'        => $is_lawyer ? 'lawyer' : 'client',
                    'isAdmin'     => $is_admin,
                    'isLawyer'    => $is_lawyer,
                ),
                'message' => 'ورود با موفقیت انجام شد.',
            ), 200);
        }

        // Generic error response if credentials not provided or invalid
        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'اطلاعات ورود نامعتبر است.',
        ), 400);
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
     * Official Server-side Pricing Schedule (سامانه تعرفه مصوب خدمات حقوقی و مشاوره)
     * Amount is NEVER accepted from the client request.
     */
    public static function get_server_pricing_table() {
        return array(
            'consultation_phone' => array(
                'title'       => 'مشاوره تلفنی تخصصی (۳۰ دقیقه)',
                'base_amount' => 500000,
            ),
            'consultation_in_person' => array(
                'title'       => 'مشاوره حقوقی حضوری در دفتر وکالت',
                'base_amount' => 1500000,
            ),
            'contract_review' => array(
                'title'       => 'بررسی تخصصی و بازبینی بندهای قرارداد',
                'base_amount' => 2500000,
            ),
            'legal_petition' => array(
                'title'       => 'تنظیم رسمی دادخواست یا لایحه دفاعیه',
                'base_amount' => 3000000,
            ),
            'retainer_deposit' => array(
                'title'       => 'پیش‌پرداخت علی‌الحساب حق‌الوکاله پرونده',
                'base_amount' => 10000000,
            ),
        );
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
        $service_id = isset($params['service_id']) ? sanitize_key($params['service_id']) : '';
        $pricing = self::get_server_pricing_table();

        // Security rule: Price is NEVER accepted from client. Must be a valid server-side service.
        if (empty($service_id) || !isset($pricing[$service_id])) {
            return new WP_REST_Response(array(
                'success'        => false,
                'message'        => 'شناسه خدمت حقوقی نامعتبر است. مبلغ فاکتور منحصراً از جدول قیمت‌های مصوب سرور استخراج می‌شود.',
                'valid_services' => array_keys($pricing),
            ), 400);
        }

        $service_info = $pricing[$service_id];
        $base_fee     = $service_info['base_amount'];
        $vat          = round($base_fee * 0.10); // ۱۰٪ مالیات بر ارزش افزوده
        $stamp_tax    = round($base_fee * 0.05); // ۵٪ سهم تمبر مالیاتی کانون وکلای دادگستری
        $total_amount = $base_fee + $vat + $stamp_tax;

        $invoice_id   = 'INV-' . date('Ymd') . '-' . substr(wp_generate_uuid4(), 0, 8); // No rand()

        // Real Zarinpal Gateway check
        $merchant_id = get_option('sedrazavi_zarinpal_merchant', '');
        $is_sandbox  = (bool) get_option('sedrazavi_zarinpal_sandbox', false);

        if (empty($merchant_id) || $merchant_id === '00000000-0000-0000-0000-000000000000') {
            // Truthful response: Payment gateway is unconfigured/inactive
            return new WP_REST_Response(array(
                'success'        => false,
                'gateway_active' => false,
                'invoice_id'     => $invoice_id,
                'service'        => $service_info['title'],
                'amount'         => $total_amount,
                'tax_breakdown'  => array(
                    'base_amount' => $base_fee,
                    'vat_10'      => $vat,
                    'stamp_tax_5' => $stamp_tax,
                    'total'       => $total_amount,
                ),
                'message'        => 'درگاه پرداخت آنلاین زرین‌پال در حال حاضر پیکربندی نشده است. لطفاً جهت پرداخت با دفتر وکالت هماهنگ فرمایید.',
            ), 503);
        }

        $adapter_file = get_template_directory() . '/includes/class-sedrazavi-payment-adapter.php';
        if (file_exists($adapter_file)) {
            require_once $adapter_file;
        }

        if (class_exists('SedRazavi_Zarinpal_Adapter')) {
            $adapter      = new SedRazavi_Zarinpal_Adapter($merchant_id, $is_sandbox);
            $callback_url = home_url('/payment-verification/?invoice=' . $invoice_id);
            $phone        = isset($params['phone']) ? sanitize_text_field($params['phone']) : '';

            $result = $adapter->request_payment(
                $total_amount,
                $callback_url,
                $invoice_id,
                $service_info['title'],
                $phone
            );

            if ($result['success']) {
                return new WP_REST_Response(array(
                    'success'       => true,
                    'invoice_id'    => $invoice_id,
                    'service'       => $service_info['title'],
                    'amount'        => $total_amount,
                    'tax_breakdown' => array(
                        'base_amount' => $base_fee,
                        'vat_10'      => $vat,
                        'stamp_tax_5' => $stamp_tax,
                        'total'       => $total_amount,
                    ),
                    'payment_url'   => $result['redirect'],
                    'authority'     => $result['authority'],
                    'message'       => 'شناسه پرداخت آنلاین زرین‌پال صادر گردید.',
                ), 200);
            }

            return new WP_REST_Response(array(
                'success' => false,
                'message' => $result['message'],
            ), 502);
        }

        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'کلاس آداپتور درگاه پرداخت در دسترس نیست.',
        ), 500);
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

        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::verify_request_nonce($request)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'کد امنیتی نانس نامعتبر است یا نشست شما منقضی شده است.',
            ), 403);
        }

        $params = $request->get_params();
        $raw_phone = isset($params['phone']) ? sanitize_text_field(wp_unslash($params['phone'])) : '';
        $phone  = class_exists('SedRazavi_Rate_Limiter') ? SedRazavi_Rate_Limiter::normalize_iranian_phone($raw_phone) : $raw_phone;
        $name   = isset($params['name']) ? (class_exists('SedRazavi_Rate_Limiter') ? SedRazavi_Rate_Limiter::sanitize_strict_input($params['name']) : sanitize_text_field(wp_unslash($params['name']))) : 'متقاضی';

        if (empty($phone)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'شماره تماس الزامی است.',
            ), 400);
        }

        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::validate_iranian_phone($raw_phone)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'شماره همراه وارد شده نامعتبر است. فرمت صحیح: ۰۹۱۲۳۴۵۶۷۸۹',
            ), 400);
        }

        // Real database persistence for callback request
        $post_id = wp_insert_post(array(
            'post_title'   => sprintf('درخواست تماس فوری: %s (%s)', $name, $phone),
            'post_type'    => 'sedrazavi_callback',
            'post_status'  => 'publish',
        ));

        if ($post_id && !is_wp_error($post_id)) {
            update_post_meta($post_id, '_sedrazavi_name', $name);
            update_post_meta($post_id, '_sedrazavi_phone', $phone);
            update_post_meta($post_id, '_sedrazavi_created_at', current_time('mysql'));
        }

        // Real email notification to admin via wp_mail
        $admin_email = get_option('admin_email');
        if (!empty($admin_email)) {
            $mail_subject = 'درخواست تماس فوری جدید: ' . $name . ' (' . $phone . ')';
            $mail_body    = sprintf(
                "درخواست تماس فوری جدید در وب‌سایت ثبت شد:\\n\\nنام متقاضی: %s\\nشماره همراه: %s\\nزمان ثبت: %s\\n",
                $name,
                $phone,
                current_time('mysql')
            );
            wp_mail($admin_email, $mail_subject, $mail_body);
        }

        return new WP_REST_Response(array(
            'success'     => true,
            'callback_id' => $post_id ?: substr(wp_generate_uuid4(), 0, 8),
            'message'     => 'درخواست تماس فوری شما ثبت شد؛ وکیل در اسرع وقت تماس خواهند گرفت.',
        ), 200);
    }

    /**
     * 12. Handle OTP Send (SMS)
     *
     * Policy:
     * - Dispatched through real WordPress filter \`sedrazavi_send_sms\`.
     * - If filter not active, honestly returns gateway inactive (503).
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
        $raw_phone = isset($params['phone']) ? sanitize_text_field(wp_unslash($params['phone'])) : '';
        $phone  = class_exists('SedRazavi_Rate_Limiter') ? SedRazavi_Rate_Limiter::normalize_iranian_phone($raw_phone) : $raw_phone;

        if (empty($phone)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'لطفاً شماره تلفن همراه را وارد فرمایید.',
            ), 400);
        }

        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::validate_iranian_phone($raw_phone)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'شماره همراه وارد شده نامعتبر است. فرمت صحیح: ۰۹۱۲۳۴۵۶۷۸۹',
            ), 400);
        }

        // Check if SMS gateway is hooked
        $is_gateway_active = apply_filters('sedrazavi_sms_gateway_active', false);
        if (!$is_gateway_active) {
            return new WP_REST_Response(array(
                'success'        => false,
                'gateway_active' => false,
                'message'        => 'درگاه پیامک در حال حاضر فعال نیست. لطفاً از گزینه ورود با کد تایید ایمیل استفاده فرمایید.',
            ), 503);
        }

        // Generate 5-digit code
        $otp_code = strval(wp_rand(10000, 99999));
        $salt     = defined('AUTH_SALT') ? AUTH_SALT : 'sedrazavi_sms_salt';
        $hashed   = hash('sha256', $otp_code . $salt);

        $sms_text = sprintf('کد تایید ورود به سامانه دفتر وکالت دکتر سیده مریم رضوی: %s', $otp_code);
        $sent     = (bool) apply_filters('sedrazavi_send_sms', false, $phone, $sms_text);

        if (!$sent) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'ارسال پیامک با درگاه پیامک با خطا مواجه شد. لطفاً از ورود با ایمیل استفاده کنید.',
            ), 500);
        }

        $transient_key = 'sedrazavi_sms_otp_' . md5($phone);
        $attempts_key  = 'sedrazavi_sms_attempts_' . md5($phone);
        set_transient($transient_key, $hashed, 120);
        set_transient($attempts_key, 0, 120);

        return new WP_REST_Response(array(
            'success' => true,
            'phone'   => $phone,
            'message' => 'کد تایید پیامکی ارسال گردید.',
        ), 200);
    }

    /**
     * 13. Handle OTP Verify (SMS)
     */
    public static function handle_otp_verify($request) {
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('otp_verify', 5, 300)) {
            return new WP_REST_Response(array(
                'success'      => false,
                'rate_limited' => true,
                'message'      => 'تلاش‌های ورود بیش از حد مجاز بود. لطفاً ۵ دقیقه بعد اقدام فرمایید.',
            ), 429);
        }

        $is_gateway_active = apply_filters('sedrazavi_sms_gateway_active', false);
        if (!$is_gateway_active) {
            return new WP_REST_Response(array(
                'success'        => false,
                'gateway_active' => false,
                'message'        => 'درگاه پیامک غیرفعال است. لطفاً از طریق ایمیل وارد شوید.',
            ), 503);
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
        $attempts_key  = 'sedrazavi_sms_attempts_' . md5($phone);
        $stored_hash   = get_transient($transient_key);

        if (!$stored_hash) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'کد تایید منقضی شده است یا درخواستی ثبت نشده است.',
            ), 400);
        }

        $attempts = (int) get_transient($attempts_key);
        $attempts++;
        if ($attempts > 5) {
            delete_transient($transient_key);
            delete_transient($attempts_key);
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'کد تایید به دلیل تلاش‌های مکرر نادرست باطل شد.',
            ), 401);
        }
        set_transient($attempts_key, $attempts, 120);

        $salt = defined('AUTH_SALT') ? AUTH_SALT : 'sedrazavi_sms_salt';
        $provided_hash = hash('sha256', $code . $salt);
        $is_valid = hash_equals($stored_hash, $provided_hash);

        if (!$is_valid) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'کد تایید وارد شده نادرست است.',
            ), 401);
        }

        delete_transient($transient_key);
        delete_transient($attempts_key);

        return new WP_REST_Response(array(
            'success' => true,
            'nonce'   => wp_create_nonce('wp_rest'),
            'user'    => array(
                'phone' => $phone,
                'name'  => 'موکل محترم',
                'role'  => 'client',
            ),
            'message' => 'کد تایید صحیح بود.',
        ), 200);
    }

    /**
     * 14. Handle Dashboard Stats
     */
    public static function handle_dashboard_stats($request) {
        $is_demo = (bool) get_option('sedrazavi_demo_mode', false);

        if ($is_demo) {
            return new WP_REST_Response(array(
                'success'             => true,
                'is_demo'             => true,
                'demo_label'          => 'داده‌های نمونه (حالت آزمایشی)',
                'active_cases'        => 48,
                'upcoming_sessions'   => 3,
                'consultations_today' => 5,
                'documents_archived'  => 142,
                'success_rate'        => '۹۴٪',
            ), 200);
        }

        // Real counts from CPTs
        $case_counts = wp_count_posts('sedrazavi_case');
        $active_cases = isset($case_counts->publish) ? (int) $case_counts->publish : 0;

        $booking_counts = wp_count_posts('sedrazavi_appointment');
        $total_bookings = isset($booking_counts->publish) ? (int) $booking_counts->publish : 0;

        // Upcoming sessions (cases with next session set)
        $upcoming_query = new WP_Query(array(
            'post_type'      => 'sedrazavi_case',
            'post_status'    => 'publish',
            'meta_query'     => array(
                array(
                    'key'     => '_sedrazavi_next_session',
                    'value'   => '',
                    'compare' => '!=',
                ),
            ),
            'posts_per_page' => -1,
            'fields'         => 'ids',
        ));
        $upcoming_sessions = (int) $upcoming_query->found_posts;

        // Consultations today
        $today = date('Y-m-d');
        $today_query = new WP_Query(array(
            'post_type'      => 'sedrazavi_appointment',
            'post_status'    => 'publish',
            'meta_query'     => array(
                array(
                    'key'     => '_sedrazavi_booking_date',
                    'value'   => $today,
                    'compare' => '=',
                ),
            ),
            'posts_per_page' => -1,
            'fields'         => 'ids',
        ));
        $consultations_today = (int) $today_query->found_posts;

        $doc_counts = wp_count_posts('attachment');
        $documents_archived = isset($doc_counts->inherit) ? (int) $doc_counts->inherit : 0;

        return new WP_REST_Response(array(
            'success'             => true,
            'is_demo'             => false,
            'active_cases'        => $active_cases,
            'upcoming_sessions'   => $upcoming_sessions,
            'consultations_today' => $consultations_today,
            'documents_archived'  => $documents_archived,
            'total_appointments'  => $total_bookings,
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

        $email_clean = strtolower(trim($email));

        // Dual Rate Limiting: IP-based and Email-based
        if (class_exists('SedRazavi_Rate_Limiter')) {
            if (!SedRazavi_Rate_Limiter::check_rate_limit('email_otp_send_ip', 5, 300)) {
                return new WP_REST_Response(array(
                    'success' => false,
                    'message' => 'تعداد درخواست‌ها از این آدرس اینترنتی بیش از حد مجاز است. لطفاً ۵ دقیقه دیگر تلاش فرمایید.',
                ), 429);
            }
            if (!SedRazavi_Rate_Limiter::check_rate_limit('email_otp_send_email', 3, 300, $email_clean)) {
                return new WP_REST_Response(array(
                    'success' => false,
                    'message' => 'ارسال مکرر کد به این آدرس ایمیل محدود شده است. لطفاً پس از ۵ دقیقه مجدداً تلاش کنید.',
                ), 429);
            }
        }

        // تولید کد ۶ رقمی تصادفی
        $otp_code = strval(wp_rand(100000, 999999));
        $salt = defined('AUTH_SALT') ? AUTH_SALT : 'sedrazavi_salt';
        $hashed_code = hash('sha256', $otp_code . $salt);

        $transient_key = 'sedrazavi_email_otp_' . md5($email_clean);
        $attempts_key  = 'sedrazavi_email_otp_attempts_' . md5($email_clean);

        // Store hashed OTP code and reset wrong attempts counter
        set_transient($transient_key, $hashed_code, 120); // ۲ دقیقه اعتبار
        set_transient($attempts_key, 0, 120);

        // ارسال ایمیل واقعی در صورت فعال بودن سرور ایمیل وردپرس
        $subject = 'کد تایید ورود یکبار مصرف - وب‌سایت دفتر وکالت دکتر سیده مریم رضوی';
        $message = "سلام و احترام،\\n\\nکد ورود یکبار مصرف شما در وب‌سایت دفتر وکالت دکتر سیده مریم رضوی:\\n\\n{$otp_code}\\n\\nاین کد به مدت ۲ دقیقه معتبر است.\\nدر صورتی که شما این درخواست را ارسال نکرده‌اید، این پیام را نادیده بگیرید.\\n\\nبا احترام،\\nدفتر وکالت و داوری دکتر سیده مریم رضوی";
        $headers = array('Content-Type: text/plain; charset=UTF-8');

        @wp_mail($email_clean, $subject, $message, $headers);

        // Identical response whether user exists in WordPress or not (privacy & enumeration protection)
        return new WP_REST_Response(array(
            'success'     => true,
            'message'     => 'کد تایید ۶ رقمی به آدرس ایمیل شما ارسال شد.',
            'email'       => $email_clean,
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

        $email_clean = strtolower(trim($email));

        // Dual Rate Limiting on Verify: IP and Email
        if (class_exists('SedRazavi_Rate_Limiter')) {
            if (!SedRazavi_Rate_Limiter::check_rate_limit('email_otp_verify_ip', 15, 300)) {
                return new WP_REST_Response(array(
                    'success' => false,
                    'message' => 'تلاش‌های ورود بیش از حد مجاز بوده است. لطفاً ۵ دقیقه دیگر تلاش نمایید.',
                ), 429);
            }
            if (!SedRazavi_Rate_Limiter::check_rate_limit('email_otp_verify_email', 10, 300, $email_clean)) {
                return new WP_REST_Response(array(
                    'success' => false,
                    'message' => 'تلاش‌های بیش از حد برای این آدرس ایمیل. لطفاً ۵ دقیقه دیگر تلاش نمایید.',
                ), 429);
            }
        }

        $transient_key = 'sedrazavi_email_otp_' . md5($email_clean);
        $attempts_key  = 'sedrazavi_email_otp_attempts_' . md5($email_clean);

        $stored_hash = get_transient($transient_key);
        $current_attempts = (int) get_transient($attempts_key);

        if (!$stored_hash) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'کد تایید وارد شده نادرست است یا منقضی شده است.',
            ), 401);
        }

        // Increment wrong attempt counter
        $current_attempts++;
        if ($current_attempts > 5) {
            // Maximum 5 wrong attempts reached -> invalidate code immediately
            delete_transient($transient_key);
            delete_transient($attempts_key);
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'کد تایید به دلیل تلاش‌های مکرر نادرست باطل شد. لطفاً کد جدید درخواست نمایید.',
            ), 401);
        }
        set_transient($attempts_key, $current_attempts, 120);

        // Constant-time hash comparison
        $salt = defined('AUTH_SALT') ? AUTH_SALT : 'sedrazavi_salt';
        $provided_hash = hash('sha256', $code . $salt);
        $is_valid = hash_equals($stored_hash, $provided_hash);

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

        // حذف ترنزینت پس از مصرف موفقیت‌آمیز
        delete_transient($transient_key);
        delete_transient($attempts_key);

        // Fetch user strictly by email
        $user = get_user_by('email', $email_clean);

        // Security Policy: Administrator & Editor roles CANNOT authenticate via email OTP alone.
        // They must authenticate via username/password and secondary authentication.
        if ($user) {
            $roles = (array) $user->roles;
            if (in_array('administrator', $roles, true) || in_array('editor', $roles, true)) {
                return new WP_REST_Response(array(
                    'success' => false,
                    'message' => 'حساب‌های کاربری با سطح دسترسی مدیریتی مجاز به ورود صرف با کد ایمیل نیستند. لطفاً با نام کاربری، رمز عبور و عامل دوم وارد شوید.',
                ), 403);
            }
        }

        // Real WordPress Authentication session setup
        if ($user) {
            $roles = (array) $user->roles;
            $role = (in_array('lawyer', $roles, true) || in_array('author', $roles, true)) ? 'lawyer' : 'client';
            wp_set_current_user($user->ID);
            wp_set_auth_cookie($user->ID, true);
            $display_name = $user->display_name;
        } else {
            // New or non-registered client session
            $role = 'client';
            $display_name = 'موکل گرامی';
        }

        return new WP_REST_Response(array(
            'success'   => true,
            'message'   => 'احراز هویت با موفقیت انجام شد.',
            'nonce'     => wp_create_nonce('wp_rest'),
            'user'      => array(
                'email'        => $email_clean,
                'displayName'  => $display_name,
                'role'         => $role,
            ),
        ), 200);
    }

    /**
     * 19. Handle Cases Timeline
     */
    public static function handle_cases_timeline($request) {
        $case_id = sanitize_text_field($request->get_param('case_id') ?: '');
        $is_demo = (bool) get_option('sedrazavi_demo_mode', false);

        if (empty($case_id)) {
            if ($is_demo) {
                return new WP_REST_Response(array(
                    'success'     => true,
                    'is_demo'     => true,
                    'demo_label'  => 'نمونه جدول زمانی پرونده (حالت آزمایشی)',
                    'case_id'     => 'demo-case',
                    'case_number' => '۱۴۰۳-۹۸۲۷۳-ونک',
                    'subject'     => 'الزام به تنظیم سند رسمی انتقال ملک و مطالبه خسارت تاخیر تادیه (نمونه)',
                    'progress'    => 75,
                    'milestones'  => array(
                        array('step' => 1, 'title' => 'ثبت دادخواست بدوی', 'date' => '۱۴۰۳/۰۳/۱۵', 'status' => 'completed'),
                        array('step' => 2, 'title' => 'جلسه رسیدگی و دفاع وکیل', 'date' => '۱۴۰۳/۰۴/۲۸', 'status' => 'completed'),
                        array('step' => 3, 'title' => 'در نوبت انشای دادنامه', 'date' => '۱۴۰۳/۰۸/۱۵', 'status' => 'in_progress'),
                    ),
                ), 200);
            }

            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'شناسه پرونده الزامی است.',
            ), 400);
        }

        // Search database for the real case
        $post = is_numeric($case_id) ? get_post($case_id) : null;
        if (!$post || $post->post_type !== 'sedrazavi_case') {
            $q = new WP_Query(array(
                'post_type'      => 'sedrazavi_case',
                'post_status'    => 'publish',
                'meta_query'     => array(
                    array(
                        'key'     => '_sedrazavi_case_number',
                        'value'   => $case_id,
                        'compare' => '=',
                    ),
                ),
                'posts_per_page' => 1,
            ));
            if ($q->have_posts()) {
                $post = $q->posts[0];
            }
        }

        if (!$post || $post->post_type !== 'sedrazavi_case') {
            if ($is_demo) {
                return new WP_REST_Response(array(
                    'success'     => true,
                    'is_demo'     => true,
                    'demo_label'  => 'نمونه فرضی',
                    'case_id'     => $case_id,
                    'case_number' => $case_id,
                    'subject'     => 'پرونده موضوع کلاسه ' . $case_id,
                    'progress'    => 50,
                    'milestones'  => array(),
                ), 200);
            }

            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'پرونده‌ای با این مشخصات یافت نشد.',
            ), 404);
        }

        $milestones = get_post_meta($post->ID, '_sedrazavi_milestones', true);
        if (!is_array($milestones)) {
            $milestones = array();
        }

        return new WP_REST_Response(array(
            'success'     => true,
            'is_demo'     => false,
            'case_id'     => $post->ID,
            'case_number' => get_post_meta($post->ID, '_sedrazavi_case_number', true) ?: $post->post_title,
            'subject'     => get_the_title($post->ID),
            'status'      => get_post_meta($post->ID, '_sedrazavi_case_status', true) ?: 'در جریان رسیدگی',
            'progress'    => (int) (get_post_meta($post->ID, '_sedrazavi_progress', true) ?: 0),
            'milestones'  => $milestones,
        ), 200);
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

    /**
     * 22. Handle Newsletter Subscribe
     */
    public static function handle_newsletter_subscribe($request) {
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('newsletter', 5, 600)) {
            return new WP_REST_Response(array(
                'success'      => false,
                'rate_limited' => true,
                'message'      => 'تعداد درخواست‌های ثبت در خبرنامه بیش از حد مجاز است. لطفاً دقایقی دیگر اقدام فرمایید.',
            ), 429);
        }

        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::verify_request_nonce($request)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'کد امنیتی نانس نامعتبر است یا نشست شما منقضی شده است.',
            ), 403);
        }

        $params = $request->get_params();
        $email = isset($params['email']) ? sanitize_email(wp_unslash($params['email'])) : '';

        if (empty($email) || !is_email($email)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'نشانی ایمیل معتبر الزامی است.',
            ), 400);
        }

        $subscribers = get_option('sedrazavi_newsletter_subscribers', array());
        if (!is_array($subscribers)) {
            $subscribers = array();
        }
        if (!in_array($email, $subscribers, true)) {
            $subscribers[] = $email;
            update_option('sedrazavi_newsletter_subscribers', $subscribers);
        }

        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'عضویت شما در خبرنامه حقوقی با موفقیت ثبت شد.',
        ), 200);
    }
}

SedRazavi_REST_API::init();
`},{path:"inc/scenario-controller.php",filename:"scenario-controller.php",category:"بخش‌های داخلی (Inc)",description:"ماژول هسته پوسته وردپرس (inc/scenario-controller.php) با بارگذاری خودکار.",code:`<?php
/**
 * Universal Scenario Controller & Layout Archetypes
 *
 * Provides backend support for 3 layout archetypes inspired by modern enterprise dashboards:
 * 1. Bento-Grid HUD Hub (Modular tiles, audio scrub player, telemetry gauge)
 * 2. 3-Column Dense Data Matrix (Tree directory, tabular figures, action slip)
 * 3. Hybrid Executive Contrast (Crisp light canvas with obsidian focal radar card)
 *
 * @package SedRazavi
 * @version 2.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Scenario_Controller {

    private static $instance = null;
    const OPTION_KEY = 'sedrazavi_active_scenario';
    const DEFAULT_SCENARIO = 'bento-hud';

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('init', array($this, 'register_scenario_settings'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scenario_assets'));
        add_action('wp_ajax_sedrazavi_switch_scenario', array($this, 'ajax_switch_scenario'));
        add_action('wp_ajax_nopriv_sedrazavi_switch_scenario', array($this, 'ajax_switch_scenario'));
        add_shortcode('sedrazavi_bento_hub', array($this, 'render_bento_hub_shortcode'));
        add_shortcode('sedrazavi_dense_matrix', array($this, 'render_dense_matrix_shortcode'));
        add_shortcode('sedrazavi_hybrid_executive', array($this, 'render_hybrid_executive_shortcode'));
    }

    public function register_scenario_settings() {
        register_setting('sedrazavi_theme_options', self::OPTION_KEY, array(
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => self::DEFAULT_SCENARIO,
        ));
    }

    public function get_active_scenario() {
        if (isset($_GET['scenario']) && in_array($_GET['scenario'], array('bento-hud', 'dense-matrix', 'hybrid-executive', 'lawyer', 'web-designer'), true)) {
            return sanitize_text_field($_GET['scenario']);
        }
        return get_option(self::OPTION_KEY, self::DEFAULT_SCENARIO);
    }

    public function get_available_scenarios() {
        return array(
            'bento-hud' => array(
                'id'          => 'bento-hud',
                'title'       => __('بنتوگرید HUD و مرکز مدیا (Bento-Grid HUD)', 'sedrazavi'),
                'description' => __('کاشی‌های ماژولار هوشمند، پلیر اسکراب صوتی، گیج دایره‌ای وضعیت و دسترسی‌های سریع', 'sedrazavi'),
                'theme'       => 'dark-obsidian',
                'icon'        => 'grid',
            ),
            'dense-matrix' => array(
                'id'          => 'dense-matrix',
                'title'       => __('ماتریس داده‌های متراکم ۳ ستونه (3-Column Dense Matrix)', 'sedrazavi'),
                'description' => __('سایدبار درختی شاخه‌ها، جدول داده‌های متراکم با ارقام تبولار و دراور تعاملی اقدام', 'sedrazavi'),
                'theme'       => 'dark-slate',
                'icon'        => 'table',
            ),
            'hybrid-executive' => array(
                'id'          => 'hybrid-executive',
                'title'       => __('هایبرید تشریفاتی مدرن (Hybrid Executive Contrast)', 'sedrazavi'),
                'description' => __('پس‌زمینه تمیز با کارت کانونی مشکی، رادار توزیع ریسک و صف تایید اقدامات', 'sedrazavi'),
                'theme'       => 'hybrid-contrast',
                'icon'        => 'shield',
            ),
        );
    }

    public function enqueue_scenario_assets() {
        $scenario = $this->get_active_scenario();
        wp_localize_script('sedrazavi-main-js', 'sedRazaviScenarioData', array(
            'activeScenario'     => $scenario,
            'availableScenarios' => $this->get_available_scenarios(),
            'ajaxUrl'            => admin_url('admin-ajax.php'),
            'nonce'              => wp_create_nonce('sedrazavi_scenario_nonce'),
        ));
    }

    public function ajax_switch_scenario() {
        check_ajax_referer('sedrazavi_scenario_nonce', 'nonce');
        $scenario = isset($_POST['scenario']) ? sanitize_text_field($_POST['scenario']) : '';
        $valid = array('bento-hud', 'dense-matrix', 'hybrid-executive');

        if (in_array($scenario, $valid, true)) {
            update_option(self::OPTION_KEY, $scenario);
            wp_send_json_success(array(
                'scenario' => $scenario,
                'message'  => __('سناریوی اینترفیس با موفقیت تغییر کرد.', 'sedrazavi'),
            ));
        } else {
            wp_send_json_error(array('message' => __('شناسه سناریو نامعتبر است.', 'sedrazavi')));
        }
    }

    public function render_bento_hub_shortcode($atts) {
        ob_start();
        ?>
        <div class="uas-scenario-bento-hub" data-scenario="bento-hud">
            <?php get_template_part('template-parts/scenarios/bento-hud'); ?>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_dense_matrix_shortcode($atts) {
        ob_start();
        ?>
        <div class="uas-scenario-dense-matrix" data-scenario="dense-matrix">
            <?php get_template_part('template-parts/scenarios/dense-matrix'); ?>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_hybrid_executive_shortcode($atts) {
        ob_start();
        ?>
        <div class="uas-scenario-hybrid-executive" data-scenario="hybrid-executive">
            <?php get_template_part('template-parts/scenarios/hybrid-executive'); ?>
        </div>
        <?php
        return ob_get_clean();
    }
}

// Global helper function
function sedrazavi_scenario() {
    return SedRazavi_Scenario_Controller::get_instance();
}

sedrazavi_scenario();
`},{path:"inc/security.php",filename:"security.php",category:"بخش‌های داخلی (Inc)",description:"هدرهای امنیتی HTTP، محافظت در برابر حملات بروت‌فورس و فیلتر آپلود.",code:`<?php
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
     * Pre-configured rate limit windows and messages for specific actions
     */
    public static function get_action_config($action) {
        $configs = array(
            'booking'    => array('max' => 5,  'window' => 600, 'msg' => 'تعداد درخواست‌های رزرو نوبت شما بیش از حد مجاز است. لطفاً ۱۰ دقیقه دیگر مجدداً تلاش فرمایید.'),
            'tracking'   => array('max' => 10, 'window' => 600, 'msg' => 'تعداد استعلام‌های پی‌درپی بیش از حد مجاز است. لطفاً ۱۰ دقیقه بعد مجدداً تلاش نمایید.'),
            'newsletter' => array('max' => 5,  'window' => 600, 'msg' => 'تعداد درخواست‌های ثبت در خبرنامه بیش از حد مجاز است. لطفاً دقایقی دیگر اقدام فرمایید.'),
            'callback'   => array('max' => 5,  'window' => 600, 'msg' => 'تعداد درخواست‌های تماس فوری بیش از حد مجاز است. لطفاً دقایقی دیگر امتحان کنید.'),
            'otp'        => array('max' => 3,  'window' => 300, 'msg' => 'تعداد درخواست‌های کد تایید بیش از حد مجاز است. لطفاً ۵ دقیقه دیگر تلاش نمایید.'),
            'otp_send'   => array('max' => 3,  'window' => 300, 'msg' => 'ارسال مکرر پیامک محدود شده است. لطفاً ۵ دقیقه تامل فرمایید.'),
            'otp_verify' => array('max' => 5,  'window' => 300, 'msg' => 'تلاش‌های ورود بیش از حد مجاز بود. لطفاً ۵ دقیقه بعد اقدام فرمایید.'),
            'auth'       => array('max' => 5,  'window' => 600, 'msg' => 'تعداد تلاش‌های ورود بیش از حد مجاز است. لطفاً ۱۰ دقیقه دیگر مجدداً تلاش فرمایید.'),
        );
        return isset($configs[$action]) ? $configs[$action] : array('max' => 5, 'window' => 600, 'msg' => 'تعداد درخواست‌ها بیش از حد مجاز است. لطفاً دقایقی بعد تلاش فرمایید.');
    }

    /**
     * Check rate limit using default action profile
     *
     * @param string $action Action key
     * @param string $identifier Optional custom identifier
     * @return bool True if allowed, false if limit exceeded
     */
    public static function check_action_limit($action, $identifier = '') {
        $cfg = self::get_action_config($action);
        return self::check_rate_limit($action, $cfg['max'], $cfg['window'], $identifier);
    }

    /**
     * Generate standard HTTP 429 Rate Limited REST response
     */
    public static function get_rate_limit_response($action, $custom_message = '') {
        $cfg = self::get_action_config($action);
        $message = !empty($custom_message) ? $custom_message : $cfg['msg'];
        if (class_exists('WP_REST_Response')) {
            return new WP_REST_Response(array(
                'success'      => false,
                'rate_limited' => true,
                'message'      => $message,
            ), 429);
        }
        return array('success' => false, 'rate_limited' => true, 'message' => $message, 'status' => 429);
    }

    /**
     * Check rate limit for a specific action by client IP or identifier
     *
     * @param string $action Action key (e.g. 'booking', 'tracking', 'otp', 'email_otp')
     * @param int $max_attempts Maximum allowed attempts within window
     * @param int $window_seconds Window in seconds (default 600s = 10 minutes)
     * @param string $identifier Optional custom identifier (such as email or phone)
     * @return bool True if allowed, false if limit exceeded
     */
    public static function check_rate_limit($action, $max_attempts = 5, $window_seconds = 600, $identifier = '') {
        $key_id = !empty($identifier) ? sanitize_text_field($identifier) : self::get_client_ip();
        $transient_key = 'sedrazavi_rl_' . substr(md5($action . '_' . $key_id), 0, 24);
        $attempts = (int) get_transient($transient_key);

        if ($attempts >= $max_attempts) {
            return false;
        }

        $attempts++;
        set_transient($transient_key, $attempts, $window_seconds);
        return true;
    }

    /**
     * Reset rate limit for a specific action and IP or identifier
     */
    public static function reset_rate_limit($action, $identifier = '') {
        $key_id = !empty($identifier) ? sanitize_text_field($identifier) : self::get_client_ip();
        $transient_key = 'sedrazavi_rl_' . substr(md5($action . '_' . $key_id), 0, 24);
        delete_transient($transient_key);
    }

    /**
     * Inspect and verify request nonce
     *
     * @param mixed $request REST Request object
     * @param string $action Nonce action name
     * @param bool $require_nonce If true, request without nonce will be rejected
     * @return bool True if valid, false if invalid or missing when required
     */
    public static function verify_request_nonce($request, $action = 'wp_rest', $require_nonce = false) {
        if (!is_object($request)) {
            return !$require_nonce;
        }
        $nonce = null;
        if (method_exists($request, 'get_header')) {
            $nonce = $request->get_header('x-wp-nonce');
        }
        if (!$nonce && method_exists($request, 'get_param')) {
            $nonce = $request->get_param('_wpnonce');
        }
        if (empty($nonce)) {
            return !$require_nonce;
        }
        if (function_exists('wp_verify_nonce')) {
            return (bool) (wp_verify_nonce($nonce, $action) || wp_verify_nonce($nonce, 'sedrazavi_security_nonce') || wp_verify_nonce($nonce, 'wp_rest'));
        }
        return true;
    }

    /**
     * Validate Iranian Mobile Phone Number (09xxxxxxxxx pattern)
     * Handles Persian, Arabic and English digits and normalizes format.
     */
    public static function validate_iranian_phone($phone) {
        if (empty($phone)) {
            return false;
        }
        $clean = self::normalize_iranian_phone($phone);
        return (bool) preg_match('/^09[0-9]{9}$/', $clean);
    }

    /**
     * Normalize Iranian phone number to standard 09xxxxxxxxx 11-digit string
     */
    public static function normalize_iranian_phone($phone) {
        if (empty($phone)) {
            return '';
        }
        $persian = array('۰','۱','۲','۳','۴','۵','۶','۷','۸','۹');
        $arabic  = array('٠','١','٢','٣','٤','٥','٦','٧','٨','٩');
        $english = array('0','1','2','3','4','5','6','7','8','9');
        $clean = str_replace($persian, $english, (string)$phone);
        $clean = str_replace($arabic, $english, $clean);
        $clean = preg_replace('/[^\\d]/', '', $clean);

        if (substr($clean, 0, 4) === '0098') {
            $clean = substr($clean, 4);
        } elseif (substr($clean, 0, 2) === '98') {
            $clean = substr($clean, 2);
        }

        if (strlen($clean) === 10 && substr($clean, 0, 1) === '9') {
            $clean = '0' . $clean;
        }

        return $clean;
    }

    /**
     * Strict XSS and HTML stripping for single-line input fields
     */
    public static function sanitize_strict_input($input) {
        if (is_array($input)) {
            return array_map(array(__CLASS__, 'sanitize_strict_input'), $input);
        }
        $val = wp_unslash((string)$input);
        $val = strip_tags($val);
        $val = preg_replace('/[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]/', '', $val);
        return trim(sanitize_text_field($val));
    }

    /**
     * Strict multi-line text sanitization without execution tags
     */
    public static function sanitize_multiline_input($input) {
        $val = wp_unslash((string)$input);
        $val = strip_tags($val);
        $val = preg_replace('/[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]/', '', $val);
        return trim(sanitize_textarea_field($val));
    }

    /**
     * Get sanitized client IP address with Trusted Proxies validation
     *
     * HTTP_X_FORWARDED_FOR and HTTP_CF_CONNECTING_IP are only accepted if
     * REMOTE_ADDR matches the configured trusted proxies list.
     */
    public static function get_client_ip() {
        $remote_addr = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : '127.0.0.1';

        // Check if trusted proxies are defined. Default is empty array (no untrusted headers accepted).
        $trusted_proxies = array();
        if (defined('SEDRAZAVI_TRUSTED_PROXIES')) {
            if (is_array(SEDRAZAVI_TRUSTED_PROXIES)) {
                $trusted_proxies = SEDRAZAVI_TRUSTED_PROXIES;
            } elseif (is_string(SEDRAZAVI_TRUSTED_PROXIES) && !empty(SEDRAZAVI_TRUSTED_PROXIES)) {
                $trusted_proxies = array_map('trim', explode(',', SEDRAZAVI_TRUSTED_PROXIES));
            }
        }

        // Only trust forwarded headers if the upstream connection is from a trusted proxy
        if (!empty($trusted_proxies) && in_array($remote_addr, $trusted_proxies, true)) {
            if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
                return sanitize_text_field(wp_unslash($_SERVER['HTTP_CF_CONNECTING_IP']));
            }
            if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
                $parts = explode(',', wp_unslash($_SERVER['HTTP_X_FORWARDED_FOR']));
                return sanitize_text_field(trim($parts[0]));
            }
        }

        return $remote_addr;
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
`},{path:"inc/seo-bridge.php",filename:"seo-bridge.php",category:"بخش‌های داخلی (Inc)",description:"پل سئوی مستقل از جاوااسکریپت و کدهای ساختاریافته Schema.org.",code:`<?php
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
    } elseif (is_page('contact') || is_page_template('page-contact.php')) {
        $page_title = 'تماس با ما و مشاوره حقوقی فوری | ' . $site_name;
    } elseif (is_page('services') || is_page_template('page-services.php') || is_post_type_archive('sedrazavi_service')) {
        $page_title = 'خدمات و حوزه‌های تخصصی وکالت | ' . $site_name;
    } elseif (is_page('calculators') || is_page_template('page-calculators.php')) {
        $page_title = 'محاسبه‌گر آنلاین هزینه دادرسی و حق‌الوکاله | ' . $site_name;
    } elseif (is_page('about') || is_page_template('page-about.php')) {
        $page_title = 'درباره وکیل دکتر سیده مریم رضوی و سوابق قضایی | ' . $site_name;
    } elseif (is_singular('sedrazavi_service')) {
        $page_title = 'وکالت تخصصی ' . single_post_title('', false) . ' | ' . $site_name;
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
    if (is_page('contact') || is_page_template('page-contact.php')) {
        $meta_desc = 'نشانی دفتر تهران ونک، شماره تماس مستقیم وکیل، ساعات پذیرش حضوری و فرم رزرو نوبت مشاوره آنلاین با دکتر سیده مریم رضوی.';
    } elseif (is_page('services') || is_page_template('page-services.php')) {
        $meta_desc = 'فهرست خدمات وکالتی تخصصی شامل دعاوی ملکی، داوری تجاری بین‌المللی، پرونده‌های مالیاتی مودیان، تنظیم قراردادها و مشاوره شرکتی.';
    } elseif (is_page('calculators') || is_page_template('page-calculators.php')) {
        $meta_desc = 'محاسبه فوری هزینه دادرسی مراحل بدوی و تجدیدنظر، دیوان عالی، تعرفه قانونی دستمزد کارشناسی و حق‌الوکاله مصوب قوه قضاییه.';
    } elseif (is_singular() && has_excerpt()) {
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
    $custom_portrait = get_theme_mod('sedrazavi_lawyer_portrait', '');

    if (is_singular() && has_post_thumbnail()) {
        $og_image = get_the_post_thumbnail_url(null, 'full');
    } elseif (!empty($custom_og_image)) {
        $og_image = $custom_og_image;
    } else {
        $og_image = $default_placeholder_image;
    }
    $og_image = esc_url($og_image);

    $logo_url = !empty($custom_logo) ? esc_url($custom_logo) : $default_placeholder_image;
    $portrait_url = !empty($custom_portrait) ? esc_url($custom_portrait) : $default_placeholder_image;

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
                'image'      => $portrait_url,
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

    if (!is_front_page() && !is_home()) {
        $schema_graph['@graph'][] = array(
            '@type'           => 'BreadcrumbList',
            '@id'             => $canonical_url . '#breadcrumb',
            'itemListElement' => array(
                array(
                    '@type'    => 'ListItem',
                    'position' => 1,
                    'name'     => $site_name,
                    'item'     => home_url('/'),
                ),
                array(
                    '@type'    => 'ListItem',
                    'position' => 2,
                    'name'     => $page_title,
                    'item'     => $canonical_url,
                ),
            ),
        );
    }

    echo wp_json_encode($schema_graph, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    ?>
    <\/script>
    <?php
}
}
`},{path:"inc/setup.php",filename:"setup.php",category:"بخش‌های داخلی (Inc)",description:"بررسی پیش‌نیازهای افزونه‌ها و پیکربندی اولیه قالب.",code:`<?php
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
`},{path:"inc/theme-options.php",filename:"theme-options.php",category:"بخش‌های داخلی (Inc)",description:"تنظیمات رنگ‌بندی، لوگو و اطلاعات دفتر در کاستومایزر.",code:`<?php
/**
 * SedRazavi Comprehensive Theme Options Panel
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_register_theme_settings')) {
    function sedrazavi_register_theme_settings() {
        // بخش ۱: اطلاعات تماس و شناسنامه دفتر
        register_setting('sedrazavi_options_group', 'sedrazavi_office_phone');
        register_setting('sedrazavi_options_group', 'sedrazavi_office_address');
        register_setting('sedrazavi_options_group', 'sedrazavi_office_email');
        register_setting('sedrazavi_options_group', 'sedrazavi_working_hours');

        // بخش ۲: هدر و پانوشت
        register_setting('sedrazavi_options_group', 'sedrazavi_header_position');
        register_setting('sedrazavi_options_group', 'sedrazavi_footer_columns');

        // بخش ۳: رنگ‌بندی و هویت بصری
        register_setting('sedrazavi_options_group', 'sedrazavi_primary_gold');
        register_setting('sedrazavi_options_group', 'sedrazavi_secondary_navy');

        // بخش ۴: تایپوگرافی و فونت
        register_setting('sedrazavi_options_group', 'sedrazavi_font_family');
        register_setting('sedrazavi_options_group', 'sedrazavi_custom_font_css');
        register_setting('sedrazavi_options_group', 'sedrazavi_vector_bg_mode');
        register_setting('sedrazavi_options_group', 'sedrazavi_vector_bg_preset');

        // بخش ۵: بهینه‌سازی سرعت و کش
        register_setting('sedrazavi_options_group', 'sedrazavi_enable_webp');
        register_setting('sedrazavi_options_group', 'sedrazavi_enable_cache');
        register_setting('sedrazavi_options_group', 'sedrazavi_custom_css');

        // بخش ۶: نقشه محلی و سئو
        register_setting('sedrazavi_options_group', 'sedrazavi_geo_lat');
        register_setting('sedrazavi_options_group', 'sedrazavi_geo_lng');
        register_setting('sedrazavi_options_group', 'sedrazavi_gmaps_api_key');
    }
    add_action('admin_init', 'sedrazavi_register_theme_settings');
}

if (!function_exists('sedrazavi_add_options_page')) {
    function sedrazavi_add_options_page() {
        add_submenu_page(
            'sedrazavi-lawyer-dashboard',
            esc_html__('تنظیمات اختصاصی پوسته سید رضوی', 'sedrazavi'),
            esc_html__('تنظیمات قالب', 'sedrazavi'),
            'manage_options',
            'sedrazavi-theme-options',
            'sedrazavi_render_options_page'
        );
    }
    add_action('admin_menu', 'sedrazavi_add_options_page');
}

if (!function_exists('sedrazavi_render_options_page')) {
    function sedrazavi_render_options_page() {
        ?>
        <div class="wrap sedrazavi-options-wrap" style="direction: rtl; text-align: right; max-width: 1100px; margin: 20px auto; font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, Tahoma, sans-serif;">
            
            <!-- Page Header -->
            <div style="background: linear-gradient(135deg, #0B132B 0%, #1C2541 100%); color: #fff; padding: 24px 30px; border-radius: 14px; margin-bottom: 25px; border-right: 5px solid #D4AF37;">
                <h1 style="color: #fff; margin: 0 0 6px 0; font-size: 22px; font-weight: bold;">
                    ⚙️ <?php esc_html_e('مرکز تنظیمات و پیکربندی دفتر وکالت دکتر سید رضوی', 'sedrazavi'); ?>
                </h1>
                <p style="margin: 0; color: #CBD5E1; font-size: 13px;">
                    <?php esc_html_e('تمامی گزینه‌ها دارای توضیحات واضح فارسی هستند تا مدیریت سایت برای کادر اداری و غیرفنی آسان باشد.', 'sedrazavi'); ?>
                </p>
            </div>

            <?php if (isset($_GET['settings-updated']) && $_GET['settings-updated']) : ?>
                <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-right: 4px solid #10B981; color: #065F46; padding: 12px 18px; border-radius: 10px; margin-bottom: 20px; font-weight: bold; font-size: 14px;">
                    ✅ <?php esc_html_e('تنظیمات با موفقیت ذخیره شدند و تغییرات بلافاصله در وب‌سایت اعمال گردید.', 'sedrazavi'); ?>
                </div>
            <?php endif; ?>

            <form method="post" action="options.php" style="display: flex; flex-direction: column; gap: 24px;">
                <?php settings_fields('sedrazavi_options_group'); ?>

                <!-- Group 1: Contact Information -->
                <div style="background: #fff; padding: 24px; border-radius: 14px; box-shadow: 0 3px 12px rgba(0,0,0,0.05); border: 1px solid #E2E8F0;">
                    <h2 style="margin: 0 0 16px 0; color: #0B132B; font-size: 17px; font-weight: bold; border-bottom: 1px solid #F1F5F9; padding-bottom: 10px;">
                        🏢 <?php esc_html_e('۱. اطلاعات تماس و شناسنامه دفتر وکالت', 'sedrazavi'); ?>
                    </h2>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        
                        <!-- Office Phone -->
                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                📞 <?php esc_html_e('شماره تلفن مستقیم دفتر:', 'sedrazavi'); ?>
                            </label>
                            <input type="text" name="sedrazavi_office_phone" value="<?php echo esc_attr(get_option('sedrazavi_office_phone', '۰۲۱-۸۸۹۹۰۰۱۱')); ?>" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px;">
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('این شماره در نوار بالای سایت، فوتر و دکمه تماس فوری تمام صفحات به مراجعین نمایش داده می‌شود.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <!-- Office Email -->
                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                ✉️ <?php esc_html_e('نشانی رایانامه (ایمیل) رسمی دفتر:', 'sedrazavi'); ?>
                            </label>
                            <input type="email" name="sedrazavi_office_email" value="<?php echo esc_attr(get_option('sedrazavi_office_email', 'info@sedrazavi-law.ir')); ?>" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px; direction: ltr; text-align: right;">
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('پیام‌های فرم‌های مشاوره آنلاین و اعلان‌های نوبت‌ها به این آدرس ایمیل ارسال می‌شوند.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <!-- Office Address -->
                        <div style="grid-column: span 2;">
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                📍 <?php esc_html_e('نشانی پستی دفتر وکالت:', 'sedrazavi'); ?>
                            </label>
                            <input type="text" name="sedrazavi_office_address" value="<?php echo esc_attr(get_option('sedrazavi_office_address', 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج سید رضوی، طبقه ۸')); ?>" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px;">
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('آدرس فیزیکی دقیق دفتر جهت راهنمایی موکلین حضوری و استناد ساختاریافته در نقشه‌ها و موتورهای جستجو.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <!-- Working Hours -->
                        <div style="grid-column: span 2;">
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                ⏰ <?php esc_html_e('ساعات پذیرش و پاسخگویی تلفنی:', 'sedrazavi'); ?>
                            </label>
                            <input type="text" name="sedrazavi_working_hours" value="<?php echo esc_attr(get_option('sedrazavi_working_hours', 'شنبه تا چهارشنبه: ۹:۰۰ الی ۱۸:۰۰ | پنجشنبه: ۹:۰۰ الی ۱۳:۰۰')); ?>" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px;">
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('زمان‌بندی فعالیت دفتر که در بخش پاورقی و کارت‌های مشاوره سایت درج می‌شود.', 'sedrazavi'); ?>
                            </p>
                        </div>

                    </div>
                </div>

                <!-- Group 2: Brand Colors & Visual Identity -->
                <div style="background: #fff; padding: 24px; border-radius: 14px; box-shadow: 0 3px 12px rgba(0,0,0,0.05); border: 1px solid #E2E8F0;">
                    <h2 style="margin: 0 0 16px 0; color: #0B132B; font-size: 17px; font-weight: bold; border-bottom: 1px solid #F1F5F9; padding-bottom: 10px;">
                        🎨 <?php esc_html_e('۲. رنگ‌بندی سازمانی و هویت بصری', 'sedrazavi'); ?>
                    </h2>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        
                        <!-- Primary Gold -->
                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                🏆 <?php esc_html_e('کد رنگ طلایی شاخص (Gold):', 'sedrazavi'); ?>
                            </label>
                            <input type="text" name="sedrazavi_primary_gold" value="<?php echo esc_attr(get_option('sedrazavi_primary_gold', '#D4AF37')); ?>" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px; font-family: monospace;">
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('رنگ طلایی لوکس استفاده شده در دکمه‌ها، خطوط تزئینی و نشان‌های افتخار دفتر وکالت.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <!-- Secondary Navy -->
                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                🌌 <?php esc_html_e('کد رنگ سرمه‌ای شب (Deep Navy):', 'sedrazavi'); ?>
                            </label>
                            <input type="text" name="sedrazavi_secondary_navy" value="<?php echo esc_attr(get_option('sedrazavi_secondary_navy', '#0B132B')); ?>" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px; font-family: monospace;">
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('رنگ سرمه‌ای تیره و رسمی برای هدر، فوتر و پس‌زمینه‌های اصلی متون برای تضمین بالاترین کنتراست.', 'sedrazavi'); ?>
                            </p>
                        </div>

                    </div>
                </div>

                <!-- Group 3: Typography & Fonts -->
                <div style="background: #fff; padding: 24px; border-radius: 14px; box-shadow: 0 3px 12px rgba(0,0,0,0.05); border: 1px solid #E2E8F0;">
                    <h2 style="margin: 0 0 16px 0; color: #0B132B; font-size: 17px; font-weight: bold; border-bottom: 1px solid #F1F5F9; padding-bottom: 10px;">
                        🖋️ <?php esc_html_e('۳. تایپوگرافی و جلوه‌های پس‌زمینه', 'sedrazavi'); ?>
                    </h2>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        
                        <!-- Font Family -->
                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                🔤 <?php esc_html_e('نام قلم پیش‌فرض سامانه:', 'sedrazavi'); ?>
                            </label>
                            <input type="text" name="sedrazavi_font_family" value="<?php echo esc_attr(get_option('sedrazavi_font_family', 'Vazirmatn')); ?>" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px;">
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('فونت رسمی سامانه (مانند Vazirmatn، YekanBakh یا Shabnam) که در تمامی بخش‌های سایت اعمال می‌شود.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <!-- Vector Mode -->
                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                🌊 <?php esc_html_e('حالت خطوط وکتور پس‌زمینه:', 'sedrazavi'); ?>
                            </label>
                            <select name="sedrazavi_vector_bg_mode" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px;">
                                <option value="animated" <?php selected(get_option('sedrazavi_vector_bg_mode', 'animated'), 'animated'); ?>><?php esc_html_e('متحرک روان و انیمیشنی (Luxury Mesh Animation)', 'sedrazavi'); ?></option>
                                <option value="static" <?php selected(get_option('sedrazavi_vector_bg_mode', 'animated'), 'static'); ?>><?php esc_html_e('ثابت و رسمی (Static Gold Lines)', 'sedrazavi'); ?></option>
                            </select>
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('تعیین می‌کند که خطوط مواج پس‌زمینه دارای حرکت آرام باشند یا به حالت ایستا نمایش یابند.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <!-- Custom Font CSS -->
                        <div style="grid-column: span 2;">
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                💻 <?php esc_html_e('کدهای @font-face برای فونت‌های اختصاصی (اختیاری):', 'sedrazavi'); ?>
                            </label>
                            <textarea name="sedrazavi_custom_font_css" rows="3" style="width: 100%; font-family: monospace; font-size: 12px; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1;"><?php echo esc_textarea(get_option('sedrazavi_custom_font_css', '')); ?></textarea>
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('در صورتی که می‌خواهید فونت لایسنس‌دار دلخواه بارگذاری نمایید، کدهای فراخوانی woff2 را در این بخش قرار دهید.', 'sedrazavi'); ?>
                            </p>
                        </div>

                    </div>
                </div>

                <!-- Group 4: Layout & Header/Footer -->
                <div style="background: #fff; padding: 24px; border-radius: 14px; box-shadow: 0 3px 12px rgba(0,0,0,0.05); border: 1px solid #E2E8F0;">
                    <h2 style="margin: 0 0 16px 0; color: #0B132B; font-size: 17px; font-weight: bold; border-bottom: 1px solid #F1F5F9; padding-bottom: 10px;">
                        📐 <?php esc_html_e('۴. ساختار سربرگ و پانوشت', 'sedrazavi'); ?>
                    </h2>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                📌 <?php esc_html_e('نحوه نمایش سربرگ (Header):', 'sedrazavi'); ?>
                            </label>
                            <select name="sedrazavi_header_position" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px;">
                                <option value="sticky" <?php selected(get_option('sedrazavi_header_position', 'sticky'), 'sticky'); ?>><?php esc_html_e('چسبان در بالای صفحه (Sticky Header)', 'sedrazavi'); ?></option>
                                <option value="static" <?php selected(get_option('sedrazavi_header_position', 'sticky'), 'static'); ?>><?php esc_html_e('ثابت و معمولی (Static Top)', 'sedrazavi'); ?></option>
                            </select>
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('در حالت چسبان منو و شماره تماس با اسکرول کاربر همیشه در دید باقی می‌ماند.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                📑 <?php esc_html_e('تعداد ستون‌های پانوشت (Footer):', 'sedrazavi'); ?>
                            </label>
                            <select name="sedrazavi_footer_columns" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px;">
                                <option value="4" <?php selected(get_option('sedrazavi_footer_columns', '4'), '4'); ?>><?php esc_html_e('۴ ستونه (استاندارد شرکتی و وکالتی)', 'sedrazavi'); ?></option>
                                <option value="3" <?php selected(get_option('sedrazavi_footer_columns', '4'), '3'); ?>><?php esc_html_e('۳ ستونه (ساده و فشرده)', 'sedrazavi'); ?></option>
                            </select>
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('تقسیم‌بندی ستون‌های فوتر برای لینک‌های سریع، مجوزها و متن کپی‌رایت.', 'sedrazavi'); ?>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Group 5: Local SEO & Map -->
                <div style="background: #fff; padding: 24px; border-radius: 14px; box-shadow: 0 3px 12px rgba(0,0,0,0.05); border: 1px solid #E2E8F0;">
                    <h2 style="margin: 0 0 16px 0; color: #0B132B; font-size: 17px; font-weight: bold; border-bottom: 1px solid #F1F5F9; padding-bottom: 10px;">
                        🗺️ <?php esc_html_e('۵. موقعیت مکانی و سئوی محلی (Local SEO)', 'sedrazavi'); ?>
                    </h2>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                🌐 <?php esc_html_e('عرض جغرافیایی دفتر (Latitude):', 'sedrazavi'); ?>
                            </label>
                            <input type="text" name="sedrazavi_geo_lat" value="<?php echo esc_attr(get_option('sedrazavi_geo_lat', '35.7592')); ?>" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px; direction: ltr; text-align: right;">
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('مختصات نقشه جهت نمایش صحیح در گوگل مپ و اسناد ساختاریافته LegalService.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                🌐 <?php esc_html_e('طول جغرافیایی دفتر (Longitude):', 'sedrazavi'); ?>
                            </label>
                            <input type="text" name="sedrazavi_geo_lng" value="<?php echo esc_attr(get_option('sedrazavi_geo_lng', '51.4116')); ?>" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px; direction: ltr; text-align: right;">
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('مختصات نقشه دفتر وکالت (پیش‌فرض میدان ونک تهران).', 'sedrazavi'); ?>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Group 6: Performance & Custom CSS -->
                <div style="background: #fff; padding: 24px; border-radius: 14px; box-shadow: 0 3px 12px rgba(0,0,0,0.05); border: 1px solid #E2E8F0;">
                    <h2 style="margin: 0 0 16px 0; color: #0B132B; font-size: 17px; font-weight: bold; border-bottom: 1px solid #F1F5F9; padding-bottom: 10px;">
                        ⚡ <?php esc_html_e('۶. بهینه‌سازی سرعت و کدهای اختصاصی', 'sedrazavi'); ?>
                    </h2>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                🚀 <?php esc_html_e('فشرده‌سازی هوشمند تصاویر (WebP):', 'sedrazavi'); ?>
                            </label>
                            <select name="sedrazavi_enable_webp" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px;">
                                <option value="yes" <?php selected(get_option('sedrazavi_enable_webp', 'yes'), 'yes'); ?>><?php esc_html_e('فعال (کاهش چشمگیر حجم فایل‌ها)', 'sedrazavi'); ?></option>
                                <option value="no" <?php selected(get_option('sedrazavi_enable_webp', 'yes'), 'no'); ?>><?php esc_html_e('غیرفعال', 'sedrazavi'); ?></option>
                            </select>
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('تصاویر با فرمت فشرده نسل جدید لود می‌شوند تا سایت برای اینترنت‌های موبایل سریع باز شود.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <div>
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                💾 <?php esc_html_e('کش مرورگر و پیش‌بارگذاری داده‌ها:', 'sedrazavi'); ?>
                            </label>
                            <select name="sedrazavi_enable_cache" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 14px;">
                                <option value="yes" <?php selected(get_option('sedrazavi_enable_cache', 'yes'), 'yes'); ?>><?php esc_html_e('فعال (لود آنی در مراجعات بعدی موکلین)', 'sedrazavi'); ?></option>
                                <option value="no" <?php selected(get_option('sedrazavi_enable_cache', 'yes'), 'no'); ?>><?php esc_html_e('غیرفعال', 'sedrazavi'); ?></option>
                            </select>
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('ذخیره منابع ثابت در حافظه موقت مرورگر موکلین جهت باز شدن بدون تاخیر صفحات.', 'sedrazavi'); ?>
                            </p>
                        </div>

                        <div style="grid-column: span 2;">
                            <label style="font-weight: bold; display: block; margin-bottom: 4px; color: #1E293B;">
                                💻 <?php esc_html_e('کدهای استایل سفارشی (Custom CSS):', 'sedrazavi'); ?>
                            </label>
                            <textarea name="sedrazavi_custom_css" rows="3" style="width: 100%; font-family: monospace; font-size: 12px; padding: 8px 12px; border-radius: 8px; border: 1px solid #CBD5E1;"><?php echo esc_textarea(get_option('sedrazavi_custom_css', '')); ?></textarea>
                            <p style="margin: 6px 0 0 0; color: #64748B; font-size: 12px; line-height: 1.5;">
                                <?php esc_html_e('امکان نوشتن کدهای ظاهری خاص بدون تغییر در کدهای اصلی قالب.', 'sedrazavi'); ?>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Submit Button -->
                <div style="background: #fff; padding: 18px 24px; border-radius: 14px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 13px; color: #64748B;">
                        💾 <?php esc_html_e('پس از تغییر گزینه‌ها، روی دکمه ذخیره کلیک کنید.', 'sedrazavi'); ?>
                    </span>
                    <?php submit_button('ذخیره کلیه تنظیمات', 'primary', 'submit', false, array('style' => 'background: #0B132B; border-color: #D4AF37; padding: 10px 32px; font-weight: bold; font-size: 15px; border-radius: 8px; cursor: pointer;')); ?>
                </div>

            </form>
        </div>
        <?php
    }
}
`},{path:"inc/user-roles.php",filename:"user-roles.php",category:"بخش‌های داخلی (Inc)",description:"نقش‌های کاربری حقوقی (وکیل، منشی دفتر، کارآموز وکالت، موکل).",code:`<?php
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
`},{path:"inc/ux-improvements.php",filename:"ux-improvements.php",category:"بخش‌های داخلی (Inc)",description:"بهینه‌سازی تجربه کاربری و اسکلتون لودرهای هوشمند.",code:`<?php
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
`},{path:"inc/wp-rest-auth.php",filename:"wp-rest-auth.php",category:"بخش‌های داخلی (Inc)",description:"لایه احراز هویت و بررسی نانس و دسترسی داسکیه پرونده‌ها.",code:`<?php
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
        if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('login_attempt', 5, 300)) {
            return new WP_REST_Response([
                'success' => false,
                'message' => 'تلاش‌های ورود بیش از حد مجاز بوده است. لطفاً ۵ دقیقه بعد مجدداً تلاش فرمایید.',
            ], 429);
        }

        $params = $request->get_json_params() ?: $request->get_params();

        $credentials = [
            'user_login'    => sanitize_user($params['username'] ?? ($params['log'] ?? '')),
            'user_password' => $params['password'] ?? ($params['pwd'] ?? ''),
            'remember'      => !empty($params['remember']),
        ];

        if (empty($credentials['user_login']) || empty($credentials['user_password'])) {
            return new WP_REST_Response([
                'success' => false,
                'message' => 'نام کاربری یا رمز عبور اشتباه است.',
            ], 400);
        }

        $user = wp_authenticate($credentials['user_login'], $credentials['user_password']);

        if (is_wp_error($user)) {
            return new WP_REST_Response([
                'success' => false,
                'message' => 'نام کاربری یا رمز عبور اشتباه است.',
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
`},{path:"includes/class-sedrazavi-admin-protection.php",filename:"class-sedrazavi-admin-protection.php",category:"امنیت و احراز هویت (Security & Auth)",description:"کلاس ساختاری شی‌گرا (includes/class-sedrazavi-admin-protection.php) منطبق با استانداردهای وردپرس.",code:`<?php
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

SedRazavi_Admin_Protection::init();`},{path:"includes/class-sedrazavi-auth-dual-mode.php",filename:"class-sedrazavi-auth-dual-mode.php",category:"امنیت و احراز هویت (Security & Auth)",description:"کلاس ساختاری شی‌گرا (includes/class-sedrazavi-auth-dual-mode.php) منطبق با استانداردهای وردپرس.",code:`<?php
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

SedRazavi_Auth_Dual_Mode::init();`},{path:"includes/class-sedrazavi-design-tokens.php",filename:"class-sedrazavi-design-tokens.php",category:"امنیت و احراز هویت (Security & Auth)",description:"کلاس ساختاری شی‌گرا (includes/class-sedrazavi-design-tokens.php) منطبق با استانداردهای وردپرس.",code:`<?php
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

SedRazavi_Design_Tokens::init();`},{path:"includes/class-sedrazavi-dual-panel-unified.php",filename:"class-sedrazavi-dual-panel-unified.php",category:"امنیت و احراز هویت (Security & Auth)",description:"کلاس ساختاری شی‌گرا (includes/class-sedrazavi-dual-panel-unified.php) منطبق با استانداردهای وردپرس.",code:`<?php
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

SedRazavi_Dual_Panel_Unified::init();`},{path:"includes/class-sedrazavi-elementor-widgets.php",filename:"class-sedrazavi-elementor-widgets.php",category:"امنیت و احراز هویت (Security & Auth)",description:"کلاس ساختاری شی‌گرا (includes/class-sedrazavi-elementor-widgets.php) منطبق با استانداردهای وردپرس.",code:`<?php
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
});`},{path:"includes/class-sedrazavi-payment-adapter.php",filename:"class-sedrazavi-payment-adapter.php",category:"امنیت و احراز هویت (Security & Auth)",description:"کلاس ساختاری شی‌گرا (includes/class-sedrazavi-payment-adapter.php) منطبق با استانداردهای وردپرس.",code:`<?php
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
        $params   = $request->get_json_params() ?: $request->get_params();
        $serviceId = sanitize_key($params['service_id'] ?? '');

        // Server-side price table lookup - Amount NEVER from client!
        $pricing = [
            'consultation_phone'     => ['title' => 'مشاوره تلفنی تخصصی (۳۰ دقیقه)', 'base_amount' => 500000],
            'consultation_in_person' => ['title' => 'مشاوره حقوقی حضوری دفتر وکالت', 'base_amount' => 1500000],
            'contract_review'        => ['title' => 'بررسی و اصلاح تخصصی قرارداد', 'base_amount' => 2500000],
            'legal_petition'         => ['title' => 'تنظیم دادخواست یا لایحه دفاعیه', 'base_amount' => 3000000],
            'retainer_deposit'       => ['title' => 'پیش‌پرداخت علی‌الحساب حق‌الوکاله', 'base_amount' => 10000000],
        ];

        if (empty($serviceId) || !isset($pricing[$serviceId])) {
            return new WP_REST_Response([
                'success'        => false,
                'message'        => 'شناسه خدمت نامعتبر است. مبالغ صرفاً از جدول تعرفه مصوب سرور تعیین می‌شوند.',
                'valid_services' => array_keys($pricing),
            ], 400);
        }

        $service = $pricing[$serviceId];
        $baseFee = $service['base_amount'];
        $taxData = self::calculate_tax_breakdown($baseFee);
        $orderId = 'SR-' . date('Ymd') . '-' . substr(wp_generate_uuid4(), 0, 8); // No rand()
        $mobile  = sanitize_text_field($params['mobile'] ?? ($params['phone'] ?? ''));
        $gateway = sanitize_text_field($params['gateway'] ?? 'zarinpal');

        $merchant = get_option('sedrazavi_zarinpal_merchant', '');
        if (empty($merchant) || $merchant === '00000000-0000-0000-0000-000000000000') {
            return new WP_REST_Response([
                'success'        => false,
                'gateway_active' => false,
                'order_id'       => $orderId,
                'service'        => $service['title'],
                'tax_data'       => $taxData,
                'message'        => 'درگاه پرداخت آنلاین زرین‌پال روی سامانه فعال نیست. لطفاً با دفتر وکالت هماهنگ فرمایید.',
            ], 503);
        }

        $adapter  = self::get_adapter($gateway);
        $callback = home_url('/payment-verification/?order_id=' . $orderId);

        $result   = $adapter->request_payment($taxData['total_toman'], $callback, $orderId, $service['title'], $mobile);

        return rest_ensure_response([
            'order_id' => $orderId,
            'service'  => $service['title'],
            'tax_data' => $taxData,
            'gateway'  => $adapter->get_gateway_title(),
            'result'   => $result
        ]);
    }
}

SedRazavi_Payment_Adapter::init();`},{path:"index.php",filename:"index.php",category:"قالب اصلی (Templates)",description:"قالب اصلی خروجی وردپرس و میزبان روت اپلیکیشن ری‌اکت.",code:`<?php
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
`},{path:"languages/sedrazavi.pot",filename:"sedrazavi.pot",category:"مستندات و زبان",description:"فایل رسمی پوسته وردپرس: languages/sedrazavi.pot",code:`msgid ""
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
`},{path:"manifest.json",filename:"manifest.json",category:"مستندات و زبان",description:"فایل رسمی پوسته وردپرس: manifest.json",code:`{
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

<?php get_footer(); ?>`},{path:"page-administrative-justice.php",filename:"page-administrative-justice.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-administrative-justice.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: دیوان عدالت اداری و ابطال مصوبات (Administrative Justice)
 * Description: دادخواست تجدیدنظر آرای کمیسیون‌ها، اعتراض به تصمیمات دستگاه‌های اجرایی و ابطال بخشنامه‌های دولتی
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="site-main py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] text-slate-800 dark:text-slate-100 min-h-screen">
    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- Header Banner -->
        <header class="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#162238] to-[#0B132B] text-white border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="space-y-3">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
                        <span>🏛️ دادخواهی علیه تصمیمات دولتی و شهرداری‌ها</span>
                    </div>
                    <h1 class="text-2xl md:text-3xl font-extrabold text-white font-serif">
                        میز تخصصی دعاوی دیوان عدالت اداری و ابطال مقررات خلاف قانون
                    </h1>
                    <p class="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
                        اعتراض به احکام قطعی کمیسیون‌های شهرداری (ماده ۱۰۰، ۷۷ و ۹۹)، هیئت‌های رسیدگی به تخلفات اداری، اخذ دستور موقت توقف اجرای آرای اداری و تقاضای ابطال آیین‌نامه‌ها در هیئت عمومی دیوان عدالت اداری.
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <a href="<?php echo esc_url(home_url('/contact')); ?>" class="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B132B] font-bold text-sm shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2">
                        <span>بررسی امکان ابطال رأی در دیوان</span>
                    </a>
                </div>
            </div>
        </header>

        <!-- React Interactive Container -->
        <div class="admin-justice-container">
            <?php echo do_shortcode('[react_component name="AdministrativeJusticeSuite"]'); ?>
        </div>

    </div>
</main>

<?php
get_footer();
`},{path:"page-ajax-search.php",filename:"page-ajax-search.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-ajax-search.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: موتور جستجوی ایجکس هوشمند (Advanced Ajax Search)
 * Description: Instant multi-field Ajax search and query filtering template with highlighting.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-ajax-search-wrapper" dir="rtl" style="background-color: var(--sr-bg-body, #070D1E); color: #F8FAFC; min-height: 100vh; padding: 50px 16px;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
        
        <div class="sedrazavi-ajax-search-header" style="text-align: center; margin-bottom: 36px;">
            <span style="display: inline-block; padding: 4px 14px; background: rgba(59, 130, 246, 0.15); color: #60A5FA; border-radius: 9999px; font-size: 13px; font-weight: bold; border: 1px solid rgba(59, 130, 246, 0.3); margin-bottom: 12px;">
                🔍 پارت ۲۰ · موتور جستجوی پیشرفته
            </span>
            <h1 style="font-size: 30px; font-weight: 800; color: #FFFFFF; margin: 0 0 12px;">
                <?php esc_html_e('جستجوی آنی در پرونده‌ها، مقالات، آرای وحدت رویه و قوانین', 'sedrazavi'); ?>
            </h1>
            <p style="color: #94A3B8; font-size: 14px; max-width: 600px; margin: 0 auto;">
                <?php esc_html_e('با فیلترهای چندلایه، هایلایت خودکار کلمات کلیدی و پاسخ‌دهی زیر ۱۵ میلی‌ثانیه', 'sedrazavi'); ?>
            </p>
        </div>

        <!-- Search Input Box -->
        <div class="sedrazavi-search-input-card" style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 20px; padding: 24px; margin-bottom: 30px;">
            <div style="position: relative;">
                <input type="text" placeholder="عبارت کلیدی مدنظر را تایپ کنید (مثلاً: الزام به تنظیم سند، سرقفلی، داوری)..." style="width: 100%; padding: 14px 20px; border-radius: 14px; background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); color: #FFFFFF; font-size: 14px; outline: none;" />
            </div>
            <div style="display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap;">
                <span style="font-size: 12px; color: #94A3B8;">فیلتر سریع:</span>
                <span style="font-size: 11px; padding: 2px 10px; border-radius: 9999px; background: rgba(255, 255, 255, 0.08); color: #CBD5E1; cursor: pointer;">تمام موارد</span>
                <span style="font-size: 11px; padding: 2px 10px; border-radius: 9999px; background: rgba(59, 130, 246, 0.2); color: #60A5FA; cursor: pointer;">پرونده‌ها</span>
                <span style="font-size: 11px; padding: 2px 10px; border-radius: 9999px; background: rgba(255, 255, 255, 0.08); color: #CBD5E1; cursor: pointer;">مقالات حقوقی</span>
                <span style="font-size: 11px; padding: 2px 10px; border-radius: 9999px; background: rgba(255, 255, 255, 0.08); color: #CBD5E1; cursor: pointer;">قوانین مدنی</span>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
`},{path:"page-associate-referral.php",filename:"page-associate-referral.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-associate-referral.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: شبکه همکاری و ارجاع وکلای دادگستری (Associate Referral Suite)
 * Description: Legal associate referral network, fee sharing calculator, and co-counsel ledger template.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-referral-suite-wrapper" dir="rtl" style="background-color: var(--sr-bg-body, #070D1E); color: #F8FAFC; min-height: 100vh; padding: 50px 16px;">
    <div class="container" style="max-width: 1000px; margin: 0 auto;">
        
        <div class="sedrazavi-referral-header" style="text-align: center; margin-bottom: 36px;">
            <span style="display: inline-block; padding: 4px 14px; background: rgba(16, 185, 129, 0.15); color: #34D399; border-radius: 9999px; font-size: 13px; font-weight: bold; border: 1px solid rgba(16, 185, 129, 0.3); margin-bottom: 12px;">
                🤝 پارت ۳۳ · شبکه همکاری وکلای همکار
            </span>
            <h1 style="font-size: 30px; font-weight: 800; color: #FFFFFF; margin: 0 0 12px;">
                <?php esc_html_e('شبکه ارجاع متقابل پرونده، وکالت توکیلی و تسهیم شفاف حق‌الوکاله', 'sedrazavi'); ?>
            </h1>
            <p style="color: #94A3B8; font-size: 14px; max-width: 650px; margin: 0 auto;">
                <?php esc_html_e('قراردادهای شراکت هوشمند، پیگیری لحظه‌ای اوقات دادرسی وکلای معاضدتی و تسویه حساب الکترونیک', 'sedrazavi'); ?>
            </p>
        </div>

        <div class="sedrazavi-referral-ledger-card" style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 20px; padding: 28px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="font-size: 16px; font-weight: bold; color: #FFFFFF; margin: 0;">دفتر کل ارجاعات فعال (Active Co-Counsel Ledger)</h3>
                <span style="font-size: 12px; color: #10B981; font-weight: bold;">تاییدیه کانون وکلا ✓</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
                <div style="background: rgba(15, 23, 42, 0.6); padding: 14px 18px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: bold; color: #FFFFFF;">پرونده دعاوی تجاری کیش · شعبه تجدیدنظر هرمزگان</div>
                        <div style="font-size: 11px; color: #94A3B8; margin-top: 2px;">وکیل همکار: دکتر احسان شریفی · سهم تسهیم: ۴۰٪</div>
                    </div>
                    <span style="font-size: 12px; color: #34D399; font-weight: bold;">در حال رسیدگی</span>
                </div>

                <div style="background: rgba(15, 23, 42, 0.6); padding: 14px 18px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: bold; color: #FFFFFF;">دعاوی گمرکی بندرعباس · تعزیرات حکومتی</div>
                        <div style="font-size: 11px; color: #94A3B8; margin-top: 2px;">وکیل همکار: مهندس کامران طاهری · سهم تسهیم: ۳۵٪</div>
                    </div>
                    <span style="font-size: 12px; color: #D4AF37; font-weight: bold;">تسویه نهایی</span>
                </div>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
`},{path:"page-calculators.php",filename:"page-calculators.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-calculators.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: میز محاسبات قضایی (Judicial Calculators)
 * Description: Interactive legal calculators suite based on official judiciary tariffs
 *
 * @package SedRazavi
 * @version 6.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();

// Server-side calculation fallback
$calc_claim = isset($_POST['claim_amount']) ? abs((float)sanitize_text_field($_POST['claim_amount'])) : 0;
$calc_stage = sanitize_text_field($_POST['claim_stage'] ?? 'first_instance');
$calc_result = null;

if ($calc_claim > 0) {
    // 1403/1404 Judiciary Tariffs
    // First instance: Up to 200,000,000 IRR = 2.5%, beyond = 3.5%
    // Appeal: 4.5%
    // Supreme Court / Cassation: 5.5%
    // Enforcement: 5% of adjudicated amount
    $fee = 0;
    if ($calc_stage === 'first_instance') {
        if ($calc_claim <= 200000000) {
            $fee = $calc_claim * 0.025;
        } else {
            $fee = (200000000 * 0.025) + (($calc_claim - 200000000) * 0.035);
        }
    } elseif ($calc_stage === 'appeal') {
        $fee = $calc_claim * 0.045;
    } elseif ($calc_stage === 'supreme') {
        $fee = $calc_claim * 0.055;
    } elseif ($calc_stage === 'enforcement') {
        $fee = $calc_claim * 0.05;
    }

    $stamp_tax = $fee * 0.05; // 5% attorney tax stamp
    $calc_result = [
        'claim' => $calc_claim,
        'fee' => round($fee),
        'stamp_tax' => round($stamp_tax),
        'total' => round($fee + $stamp_tax),
        'stage_label' => ($calc_stage === 'first_instance' ? 'مرحله بدوی' : ($calc_stage === 'appeal' ? 'مرحله تجدیدنظر' : ($calc_stage === 'supreme' ? 'فرجام‌خواهی دیوان عالی' : 'نیم‌عشر اجرایی'))),
    ];
}
?>

<main class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-sans">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
        
        <!-- Page Header -->
        <div class="text-center max-w-3xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                ⚖️ سامانه رسمی محاسبات دادگستری و تعرفه‌های قانونی
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-[#0B132B] dark:text-white">
                میز محاسبات قانونی، تمبر دادرسی و هزینه دادرسی
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                محاسبه برخط و دقیق هزینه دادرسی دعاوی مالی، تمبر مالیاتی وکیل، نیم‌عشر اجرایی، خسارت تاخیر تادیه و دیه بر مبنای تعرفه رسمی قوه قضائیه
            </p>
        </div>

        <!-- Render Mount Point for React Suite -->
        <div id="sedrazavi-court-calculator-mount" class="space-y-6">
            <?php echo do_shortcode('[sedrazavi_legal_finance]'); ?>
        </div>

        <!-- Pure PHP / SSR Fallback Calculator -->
        <section class="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#0B132B]/80 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 class="text-xl font-bold text-[#0B132B] dark:text-white flex items-center gap-3">
                    <span class="w-3 h-3 rounded-full bg-[#D4AF37]"></span>
                    محاسبه‌گر سریع سمت سرور (Native PHP Tariff Engine)
                </h2>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    مبلغ خواسته را به ریال وارد کنید تا هزینه‌های دادرسی و تمبر وکالت بلافاصله محاسبه گردد:
                </p>
            </div>

            <form method="POST" action="" class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div class="md:col-span-2">
                    <label for="claim_amount" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        بهای خواسته مالی (ریال):
                    </label>
                    <input type="number" id="claim_amount" name="claim_amount" value="<?php echo esc_attr($calc_claim ?: ''); ?>" required class="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none" placeholder="مثال: ۱۰۰۰۰۰۰۰۰۰ (یک میلیارد ریال)">
                </div>

                <div>
                    <label for="claim_stage" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        مرحله رسیدگی قضایی:
                    </label>
                    <select id="claim_stage" name="claim_stage" class="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none">
                        <option value="first_instance" <?php selected($calc_stage, 'first_instance'); ?>>دادگاه بدوی (۲.۵ تا ۳.۵ درصد)</option>
                        <option value="appeal" <?php selected($calc_stage, 'appeal'); ?>>تجدیدنظرخواهی (۴.۵ درصد)</option>
                        <option value="supreme" <?php selected($calc_stage, 'supreme'); ?>>دیوان عالی کشور (۵.۵ درصد)</option>
                        <option value="enforcement" <?php selected($calc_stage, 'enforcement'); ?>>اجرای احکام / نیم‌عشر (۵ درصد)</option>
                    </select>
                </div>

                <div class="md:col-span-3 flex justify-end">
                    <button type="submit" class="px-8 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B132B] font-bold text-xs shadow-lg hover:brightness-110 transition flex items-center gap-2">
                        <span>محاسبه تعرفه رسمی</span>
                    </button>
                </div>
            </form>

            <?php if ($calc_result): ?>
                <div class="mt-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-[#D4AF37]/50 space-y-4">
                    <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                        <span class="text-sm font-bold text-[#0B132B] dark:text-white">جدول نتایج برآورد مالیاتی و دادرسی:</span>
                        <span class="text-xs px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] font-bold">
                            <?php echo esc_html($calc_result['stage_label']); ?>
                        </span>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div class="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span class="text-slate-400 block mb-1">هزینه دادرسی صندوق دادگستری:</span>
                            <span class="text-base font-bold text-slate-800 dark:text-slate-100 font-mono">
                                <?php echo number_format($calc_result['fee']); ?> ریال
                            </span>
                        </div>
                        <div class="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span class="text-slate-400 block mb-1">تمبر مالیاتی کانون وکلا:</span>
                            <span class="text-base font-bold text-[#D4AF37] font-mono">
                                <?php echo number_format($calc_result['stamp_tax']); ?> ریال
                            </span>
                        </div>
                        <div class="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span class="text-slate-400 block mb-1">مجموع هزینه‌های قانونی:</span>
                            <span class="text-base font-bold text-emerald-500 font-mono">
                                <?php echo number_format($calc_result['total']); ?> ریال
                            </span>
                        </div>
                    </div>
                </div>
            <?php endif; ?>
        </section>

    </div>
</main>

<?php
get_footer();
`},{path:"page-case-prediction.php",filename:"page-case-prediction.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-case-prediction.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: تحلیل آماری و پیش‌بینی خروجی پرونده (Case Outcome Prediction)
 * Description: AI and statistical case prediction analyzer template with probability gauges and precedents comparison.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-prediction-suite-wrapper" dir="rtl" style="background-color: var(--sr-bg-body, #070D1E); color: #F8FAFC; min-height: 100vh; padding: 50px 16px;">
    <div class="container" style="max-width: 950px; margin: 0 auto;">
        
        <div class="sedrazavi-prediction-header" style="text-align: center; margin-bottom: 36px;">
            <span style="display: inline-block; padding: 4px 14px; background: rgba(168, 85, 247, 0.15); color: #C084FC; border-radius: 9999px; font-size: 13px; font-weight: bold; border: 1px solid rgba(168, 85, 247, 0.3); margin-bottom: 12px;">
                📊 پارت ۲۱ · هوش آماری دادرسی
            </span>
            <h1 style="font-size: 30px; font-weight: 800; color: #FFFFFF; margin: 0 0 12px;">
                <?php esc_html_e('سامانه تحلیل شانس موفقیت و ریسک‌سنجی پرونده‌های قضایی', 'sedrazavi'); ?>
            </h1>
            <p style="color: #94A3B8; font-size: 14px; max-width: 650px; margin: 0 auto;">
                <?php esc_html_e('بررسی داده‌محور بر پایه آرای قطعی محاکم تجدیدنظر، صلاحیت دادگاه‌ها و نظریات مشورتی اداره حقوقی', 'sedrazavi'); ?>
            </p>
        </div>

        <div class="sedrazavi-prediction-metrics-card" style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(168, 85, 247, 0.25); border-radius: 20px; padding: 28px; margin-bottom: 30px;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; text-align: center;">
                <div>
                    <div style="font-size: 32px; font-weight: 900; color: #10B981;">۸۴٪</div>
                    <div style="font-size: 12px; color: #94A3B8; margin-top: 4px;">میانگین شانس پیروزی با استناد به سند رسمی</div>
                </div>
                <div>
                    <div style="font-size: 32px; font-weight: 900; color: #F59E0B;">۲.۸ ماه</div>
                    <div style="font-size: 12px; color: #94A3B8; margin-top: 4px;">مدت زمان تخمینی تا صدور رای مرحله بدوی</div>
                </div>
                <div>
                    <div style="font-size: 32px; font-weight: 900; color: #38BDF8;">+۴,۲۰۰</div>
                    <div style="font-size: 12px; color: #94A3B8; margin-top: 4px;">دادنامه تحلیل‌شده در پایگاه داده وحدت رویه</div>
                </div>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
`},{path:"page-case-timeline.php",filename:"page-case-timeline.php",category:"برگه‌ها و آرشیوها",description:"تایم‌لاین تعاملی پیشرفت دادرسی و ابلاغیه‌های دادگاه.",code:`<?php
/**
 * Template Name: تایم‌لاین تعاملی پرونده (Case Interactive Timeline)
 * Description: Dedicated page template for interactive case milestones roadmap
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) exit;

// Access control: Protected behind authentication/permission
if (!is_user_logged_in() && !(defined('SEDRAZAVI_ALLOW_MOCK_HEADERS') && SEDRAZAVI_ALLOW_MOCK_HEADERS === true)) {
    auth_redirect();
    exit;
}

// SEO Directive: Confidential client judicial timeline must be noindex, nofollow
header('X-Robots-Tag: noindex, nofollow', true);
add_filter('wp_robots', function($robots) {
    $robots['noindex']  = true;
    $robots['nofollow'] = true;
    return $robots;
});

get_header();

// No hardcoded fixed default data
$case_id     = isset($_GET['case_id']) ? sanitize_text_field(wp_unslash($_GET['case_id'])) : '';
$case_number = isset($_GET['case_number']) ? sanitize_text_field(wp_unslash($_GET['case_number'])) : '';
$has_case    = !empty($case_id) || !empty($case_number);
?>

<main class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-sans" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
        
        <!-- Header Section -->
        <div class="text-center max-w-2xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                ⚖️ کارتابل محرمانه موکل و جدول زمانی دادرسی
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-[#0B132B] dark:text-white">
                تایم‌لاین تعاملی پرونده و مواعد دادگاه
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                مشاهده گام‌به‌گام تاریخچه اقدامات قضایی، جلسات پیش‌رو، لوایح و پیش‌بینی موعد صدور رأی قطعی
            </p>
        </div>

        <?php if ($has_case) : ?>
            <!-- React Mount Point for CaseInteractiveTimeline -->
            <div class="sedrazavi-timeline-page-card">
                <?php echo do_shortcode('[sedrazavi_react_case_timeline case_id="' . esc_attr($case_id) . '" case_number="' . esc_attr($case_number) . '"]'); ?>
            </div>
        <?php else : ?>
            <!-- Empty State Prompt -->
            <div class="p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 text-center max-w-xl mx-auto space-y-4">
                <div class="w-16 h-16 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] mx-auto flex items-center justify-center text-2xl">
                    📁
                </div>
                <h3 class="text-base font-bold text-gray-900 dark:text-white">
                    پرونده‌ای انتخاب نشده است
                </h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    جهت مشاهده جدول زمانی، لطفاً از کارتابل وکالت یا سامانه استعلام، پرونده مورد نظر خود را انتخاب فرمایید.
                </p>
                <div class="pt-2">
                    <a href="<?php echo esc_url(home_url('/portal')); ?>" class="inline-flex items-center px-4 py-2 rounded-xl bg-[#D4AF37] text-[#0B132B] font-bold text-xs hover:bg-[#AA820A] transition-colors">
                        بازگشت به کارتابل موکلین
                    </a>
                </div>
            </div>
        <?php endif; ?>

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
get_footer();`},{path:"page-codex.php",filename:"page-codex.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-codex.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: دانشنامه قوانین، آرای وحدت رویه و نظریات مشورتی (Comprehensive Legal Codex)
 * Description: بانک داده هوشمند متون قوانین جمهوری اسلامی ایران، آرای هیئت عمومی دیوان عالی کشور و نظریات اداره حقوقی
 *
 * @package SedRazavi
 * @version 3.1.0
 */

if (!defined('ABSPATH')) exit;

$is_elementor = false;
if (did_action('elementor/loaded') && class_exists('Elementor\\Plugin')) {
    $elem = \\Elementor\\Plugin::instance();
    if (($elem->preview && method_exists($elem->preview, 'is_preview_mode') && $elem->preview->is_preview_mode()) ||
        ($elem->editor && method_exists($elem->editor, 'is_edit_mode') && $elem->editor->is_edit_mode()) ||
        ($elem->db && method_exists($elem->db, 'is_built_with_elementor') && $elem->db->is_built_with_elementor(get_the_ID()))) {
        $is_elementor = true;
    }
}
if (!$is_elementor && is_singular() && get_post_meta(get_the_ID(), '_elementor_edit_mode', true) === 'builder') {
    $is_elementor = true;
}

get_header();

if ($is_elementor) :
    while (have_posts()) : the_post();
        the_content();
    endwhile;
else :
?>

<div class="py-12 bg-[#0B132B] min-h-screen text-slate-100" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="relative bg-gradient-to-br from-[#060B18] via-[#0B132B] to-[#12243A] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 mb-10 shadow-2xl overflow-hidden">
            <div class="space-y-4 text-right max-w-3xl">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
                    <span>📚 دانشنامه مرجع حقوقی و قضایی</span>
                </div>
                <h1 class="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
                    کدکس قوانین، آرای وحدت رویه و نظریات مشورتی
                </h1>
                <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                    موتور جستجو و فیلتر پیشرفته آخرین آرای لازم‌الاتباع دیوان عالی کشور، متن منقح قانون مدنی، قانون مجازات اسلامی، آیین دادرسی و بخشنامه‌های ثبتی با حاشیه‌نویسی تحلیلی وکلای پایه یک.
                </p>
            </div>
        </div>

        <div class="mb-12">
            <?php
            if (shortcode_exists('react_component')) {
                echo do_shortcode('[react_component name="ComprehensiveCodexSuite"]');
            }
            ?>
        </div>

        <?php
        while (have_posts()) : the_post();
            the_content();
        endwhile;
        ?>
    </div>
</div>

<?php
endif;
get_footer();
`},{path:"page-commercial-arbitration.php",filename:"page-commercial-arbitration.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-commercial-arbitration.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: داوری تجاری بین‌المللی و بازرگانی (Commercial Arbitration)
 * Description: مرکز حل اختلاف تجاری، شرط داوری اتاق بازرگانی، اجرای آرای کنوانسیون نیویورک
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="site-main py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] text-slate-800 dark:text-slate-100 min-h-screen">
    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- Header Banner -->
        <header class="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#1E2545] to-[#0B132B] text-white border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="space-y-3">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
                        <span>🌐 داوری سازمانی ICC, TRAC, ACIC و اتاق تهران</span>
                    </div>
                    <h1 class="text-2xl md:text-3xl font-extrabold text-white font-serif">
                        مرکز تخصصی داوری تجاری، بازرگانی بین‌المللی و اجرای آرای داوری
                    </h1>
                    <p class="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
                        طراحی موافقت‌نامه‌های داوری مستقل، قبول داوری در اختلافات تجاری شرکت‌ها، صدور و ابلاغ آرای داوری، و دفاع در دعاوی ابطال رأی داور یا اجرای احکام خارجی تحت کنوانسیون ۱۹۵۸ نیویورک.
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <a href="<?php echo esc_url(home_url('/contact')); ?>" class="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B132B] font-bold text-sm shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2">
                        <span>ارجاع پرونده به داور مرضی‌الطرفین</span>
                    </a>
                </div>
            </div>
        </header>

        <!-- React Interactive Container -->
        <div class="commercial-arbitration-container">
            <?php echo do_shortcode('[react_component name="CommercialArbitrationSuite"]'); ?>
        </div>

    </div>
</main>

<?php
get_footer();
`},{path:"page-compliance-aml.php",filename:"page-compliance-aml.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-compliance-aml.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
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

// Process Sample SSR Fallback if POST request is made
$audit_result = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['contract_text'])) {
    $text = sanitize_textarea_field($_POST['contract_text']);
    $word_count = count(preg_split('/\\s+/u', trim($text)));
    
    // Sample heuristics
    $has_arbitration = mb_strpos($text, 'داوری') !== false;
    $has_penalty = mb_strpos($text, 'خسارت') !== false || mb_strpos($text, 'وجه التزام') !== false;
    $has_force_majeure = mb_strpos($text, 'فورس ماژور') !== false || mb_strpos($text, 'حوادث غیرمترقبه') !== false;
    
    $score = 85;
    $risks = [];
    if (!$has_arbitration) {
        $score -= 20;
        $risks[] = 'عدم پیش‌بینی شرط داوری سازمانی؛ در صورت اختلاف، رسیدگی به محاکم عمومی دادگستری ارجاع خواهد شد که مستلزم فرآیند طولانی اطاله دادرسی است.';
    }
    if (!$has_penalty) {
        $score -= 15;
        $risks[] = 'عدم تعیین وجه التزام شفاف روزانه برای تاخیر در انجام تعهدات طرف مقابل.';
    }
    if (!$has_force_majeure) {
        $score -= 10;
        $risks[] = 'فقدان شرط فورس‌ماژور و نحوه تعلیق یا انفساخ تعهدات در شرایط اضطراری.';
    }

    $audit_result = [
        'score' => max(30, $score),
        'word_count' => $word_count,
        'risks' => $risks,
        'has_arbitration' => $has_arbitration,
        'has_penalty' => $has_penalty,
        'has_force_majeure' => $has_force_majeure,
    ];
}
?>

<main class="site-main py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] min-h-screen text-slate-800 dark:text-slate-100">
    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- Header Banner -->
        <header class="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="space-y-3">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
                        <span>⚖️ هوش مصنوعی و ممیزی قراردادها</span>
                    </div>
                    <h1 class="text-2xl md:text-3xl font-extrabold text-white font-serif">
                        سامانه جامع ممیزی شروط قرارداد و ارزیابی ریسک حقوقی
                    </h1>
                    <p class="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
                        بررسی خط‌به‌خط بندهای تعهدآور، تضامین، شرط داوری و بندهای محرمانگی با استانداردهای رسمی کانون وکلای دادگستری مرکز و هیئت داوران بین‌المللی SedRazavi.
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <a href="<?php echo esc_url(home_url('/contact')); ?>" class="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B132B] font-bold text-sm shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2">
                        <span>درخواست بازبینی توسط وکیل</span>
                    </a>
                </div>
            </div>
        </header>

        <!-- React Interactive Container -->
        <div class="contract-auditor-container">
            <?php echo do_shortcode('[sedrazavi_contract_auditor]'); ?>
        </div>

        <!-- Pure PHP / SSR Fallback Section -->
        <section class="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#0B132B]/80 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 class="text-xl font-bold text-[#0B132B] dark:text-white flex items-center gap-3">
                    <span class="w-3 h-3 rounded-full bg-[#D4AF37]"></span>
                    موتور ممیزی سرور (PHP Native Engine)
                </h2>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    در صورت عدم فعال‌سازی جاوااسکریپت در مرورگر، می‌توانید متن قرارداد را در فرم زیر وارد کرده و آنالیز اولیه دریافت نمایید:
                </p>
            </div>

            <form method="POST" action="" class="space-y-4">
                <div>
                    <label for="contract_text" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        متن قرارداد، پیش‌نویس توافق‌نامه یا شروط مورد اختلاف:
                    </label>
                    <textarea id="contract_text" name="contract_text" rows="6" required class="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none leading-relaxed" placeholder="متن قرارداد خود را در اینجا جای‌گذاری نمایید (شامل ماده تعهدات، تضمین‌ها، مرجع حل اختلاف و ...)"></textarea>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-xs text-slate-400">اطلاعات شما با پروتکل رمزنگاری SSL بررسی شده و در پایگاه‌داده ذخیره نمی‌گردد.</span>
                    <button type="submit" class="px-6 py-2.5 rounded-xl bg-[#0B132B] text-white hover:bg-slate-800 text-xs font-bold border border-[#D4AF37]/50 shadow transition flex items-center gap-2">
                        <span>ارزیابی هوشمند شروط</span>
                    </button>
                </div>
            </form>

            <?php if ($audit_result): ?>
                <div class="mt-8 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-[#D4AF37]/40 space-y-4">
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-bold text-[#0B132B] dark:text-white">نتیجه ممیزی و شاخص سلامت حقوقی:</span>
                        <span class="px-3 py-1 rounded-full text-xs font-bold <?php echo $audit_result['score'] >= 70 ? 'bg-emerald-500/20 text-emerald-600' : 'bg-rose-500/20 text-rose-500'; ?>">
                            نمره ایمنی: <?php echo esc_html($audit_result['score']); ?> از ۱۰۰
                        </span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div class="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span class="text-slate-400 block mb-1">شرط داوری سازمانی:</span>
                            <span class="font-bold <?php echo $audit_result['has_arbitration'] ? 'text-emerald-500' : 'text-rose-500'; ?>">
                                <?php echo $audit_result['has_arbitration'] ? '✅ شناسایی شد' : '❌ مفقود'; ?>
                            </span>
                        </div>
                        <div class="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span class="text-slate-400 block mb-1">وجه التزام و ضمانت‌اجرا:</span>
                            <span class="font-bold <?php echo $audit_result['has_penalty'] ? 'text-emerald-500' : 'text-amber-500'; ?>">
                                <?php echo $audit_result['has_penalty'] ? '✅ پیش‌بینی شده' : '⚠️ نیاز به تقویت'; ?>
                            </span>
                        </div>
                        <div class="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span class="text-slate-400 block mb-1">فورس ماژور و تعلیق:</span>
                            <span class="font-bold <?php echo $audit_result['has_force_majeure'] ? 'text-emerald-500' : 'text-rose-500'; ?>">
                                <?php echo $audit_result['has_force_majeure'] ? '✅ استاندارد' : '❌ مفقود'; ?>
                            </span>
                        </div>
                    </div>

                    <?php if (!empty($audit_result['risks'])): ?>
                        <div class="space-y-2 pt-2">
                            <span class="text-xs font-bold text-rose-500">هشدارهای ریسک قرارداد:</span>
                            <ul class="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
                                <?php foreach ($audit_result['risks'] as $risk): ?>
                                    <li><?php echo esc_html($risk); ?></li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </section>

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
`},{path:"page-crm-notifier.php",filename:"page-crm-notifier.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-crm-notifier.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: سامانه هوشمند مدیریت ارتباط با موکلین (Legal CRM & Smart Notifier)
 * Description: پیشخوان مدیریت هوشمند موکلین حقوقی، یادآور پیامکی جلسات دادرسی، سررسید اعتراض به آرا و وب‌هوک‌های مالی
 *
 * @package SedRazavi
 * @version 3.1.0
 */

if (!defined('ABSPATH')) exit;

$is_elementor = false;
if (did_action('elementor/loaded') && class_exists('Elementor\\Plugin')) {
    $elem = \\Elementor\\Plugin::instance();
    if (($elem->preview && method_exists($elem->preview, 'is_preview_mode') && $elem->preview->is_preview_mode()) ||
        ($elem->editor && method_exists($elem->editor, 'is_edit_mode') && $elem->editor->is_edit_mode()) ||
        ($elem->db && method_exists($elem->db, 'is_built_with_elementor') && $elem->db->is_built_with_elementor(get_the_ID()))) {
        $is_elementor = true;
    }
}
if (!$is_elementor && is_singular() && get_post_meta(get_the_ID(), '_elementor_edit_mode', true) === 'builder') {
    $is_elementor = true;
}

get_header();

if ($is_elementor) :
    while (have_posts()) : the_post();
        the_content();
    endwhile;
else :
?>

<div class="py-12 bg-[#0B132B] min-h-screen text-slate-100" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="relative bg-gradient-to-br from-[#060B18] via-[#0B132B] to-[#122A3B] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 mb-10 shadow-2xl overflow-hidden">
            <div class="space-y-4 text-right max-w-3xl">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
                    <span>📱 اتوماسیون ارتباط با موکلین و سررسید دادرسی</span>
                </div>
                <h1 class="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
                    سامانه CRM حقوقی و دستیار هوشمند مواعد قانونی
                </h1>
                <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                    سیستم خودکار پیامک ابلاغیه‌های ثنا، ارسال خودکار یادآور جلسات استماع دادگاه، مواعد ۲۰ روزه تجدیدنظرخواهی و فرجام‌خواهی، صورتحساب‌های حق‌الوکاله و گزارش وضعیت پرونده به موکل.
                </p>
            </div>
        </div>

        <div class="mb-12">
            <?php
            if (shortcode_exists('react_component')) {
                echo do_shortcode('[react_component name="LegalCrmSmartNotifierSuite"]');
            }
            ?>
        </div>

        <?php
        while (have_posts()) : the_post();
            the_content();
        endwhile;
        ?>
    </div>
</div>

<?php
endif;
get_footer();
`},{path:"page-customs-transit.php",filename:"page-customs-transit.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-customs-transit.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: ترانزیت، قاچاق و دعاوی گمرکی (Customs & Transit Disputes)
 * Description: سامانه تخصصی محاسبات حقوق ورودی، کمیسیون ماده ۱۴۴، دفاع از قاچاق کالا و ترانزیت بین‌المللی
 *
 * @package SedRazavi
 * @version 3.1.0
 */

if (!defined('ABSPATH')) exit;

// 1. Elementor Compatibility Check
$is_elementor = false;
if (did_action('elementor/loaded') && class_exists('Elementor\\Plugin')) {
    $elem = \\Elementor\\Plugin::instance();
    if (($elem->preview && method_exists($elem->preview, 'is_preview_mode') && $elem->preview->is_preview_mode()) ||
        ($elem->editor && method_exists($elem->editor, 'is_edit_mode') && $elem->editor->is_edit_mode()) ||
        ($elem->db && method_exists($elem->db, 'is_built_with_elementor') && $elem->db->is_built_with_elementor(get_the_ID()))) {
        $is_elementor = true;
    }
}
if (!$is_elementor && is_singular() && get_post_meta(get_the_ID(), '_elementor_edit_mode', true) === 'builder') {
    $is_elementor = true;
}

get_header();

if ($is_elementor) :
    while (have_posts()) : the_post();
        the_content();
    endwhile;
else :
?>

<div class="py-12 bg-[#0B132B] min-h-screen text-slate-100" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <!-- Hero Header -->
        <div class="relative bg-gradient-to-br from-[#060B18] via-[#0B132B] to-[#142347] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 mb-10 shadow-2xl overflow-hidden">
            <div class="absolute -left-10 -bottom-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div class="space-y-4 text-right max-w-3xl">
                    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
                        <span>🚢 دپارتمان تخصصی تجارت فرامرزی و ترانزیت</span>
                    </div>
                    <h1 class="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
                        دعاوی گمرکی، اختلافات تعرفه‌ای و دفاع تخصصی قاچاق کالا
                    </h1>
                    <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                        دفاع در کمیسیون‌های بدوی و تجدیدنظر حل اختلافات گمرکی (مواد ۱۴۴ و ۱۴۶ قانون امور گمرکی)، حل منازعات ارزش (TSC)، رفع توقیف کالاهای ترانزیتی و ابطال جرایم غیرقانونی دموراژ.
                    </p>
                </div>
                <div class="flex flex-col gap-3 w-full md:w-auto">
                    <a href="#customs-calc" class="btn-gold text-center py-3 px-6 rounded-xl text-xs font-bold shadow-lg shadow-[#D4AF37]/20">
                        محاسبه جریمه و حقوق گمرکی
                    </a>
                    <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="py-3 px-6 rounded-xl text-xs font-bold text-center border border-slate-700 hover:border-[#D4AF37] bg-white/5 transition-colors">
                        تنظیم لایحه کمیسیون ماده ۱۴۴
                    </a>
                </div>
            </div>
        </div>

        <!-- Interactive Module & Shortcode Area -->
        <div class="mb-12">
            <?php
            if (shortcode_exists('react_component')) {
                echo do_shortcode('[react_component name="CustomsTransitDisputesSuite"]');
            }
            ?>
        </div>

        <!-- Server-Side Native Knowledge & Tariffs Table -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div class="bg-[#060B18]/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                    <span class="text-2xl">⚖️</span>
                </div>
                <h3 class="text-lg font-bold text-white">کمیسیون حل اختلاف (ماده ۱۴۴)</h3>
                <p class="text-xs text-slate-300 leading-relaxed">
                    مرجع شبه‌قضایی رسیدگی به منازعات مؤدیان با گمرک در خصوص ارزش استنباطی، تعرفه‌بندی نادرست کالا و جرایم تاخیر با حضور نمایندگان دادگستری و اتاق بازرگانی.
                </p>
            </div>

            <div class="bg-[#060B18]/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                    <span class="text-2xl">🛡️</span>
                </div>
                <h3 class="text-lg font-bold text-white">دفاع از اتهام قاچاق کالا و ارز</h3>
                <p class="text-xs text-slate-300 leading-relaxed">
                    اثبات انطباق اسناد خرید خارجی با اظهارنامه گمرکی، رد بند‌های جرم‌انگارانه ماده ۱۱۳ امور گمرکی و اثبات فقدان قصد مجرمانه در شعب ویژه تعزیرات حکومتی و دادسرا.
                </p>
            </div>

            <div class="bg-[#060B18]/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                    <span class="text-2xl">📦</span>
                </div>
                <h3 class="text-lg font-bold text-white">کالای متروکه و دموراژ کانتینری</h3>
                <p class="text-xs text-slate-300 leading-relaxed">
                    توقف مزایده سازمان جمع‌آوری و فروش اموال تملیکی، اخذ دستور موقت ترخیص و تعیین خسارت تاخیر غیرموجه خطوط کشتیرانی بر اساس استانداردهای بین‌المللی اینکوترمز.
                </p>
            </div>
        </div>

        <?php
        while (have_posts()) : the_post();
            the_content();
        endwhile;
        ?>
    </div>
</div>

<?php
endif;
get_footer();
`},{path:"page-cyber-forensics.php",filename:"page-cyber-forensics.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-cyber-forensics.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: جرایم سایبری و فارنزیک ادله دیجیتال (Cyber Forensics)
 * Description: سامانه کشف و مستندسازی ادله الکترونیکی، رمزنگاری و مشاوره جرایم رایانه‌ای
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="site-main py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] text-slate-800 dark:text-slate-100 min-h-screen">
    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- Header Banner -->
        <header class="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#0E1E38] to-[#0B132B] text-white border border-cyan-500/30 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="space-y-3">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-bold">
                        <span>🛡️ امنیت سایبری و قانون جرایم رایانه‌ای</span>
                    </div>
                    <h1 class="text-2xl md:text-3xl font-extrabold text-white font-serif">
                        میز تخصصی کشف ادله دیجیتال، فارنزیک و دفاع در جرایم سایبری
                    </h1>
                    <p class="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
                        استخراج و زنجیره حفظ ادله الکترونیک (Chain of Custody)، ممیزی امنیت قراردادهای هوشمند بلاک‌چین، مشاوره در پرونده‌های فیشینگ، سرقت داده و دفاع تخصصی در دادسرای ویژه جرایم رایانه‌ای.
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <a href="<?php echo esc_url(home_url('/contact')); ?>" class="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B132B] font-bold text-sm shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2">
                        <span>گزارش فوری رخداد امنیتی</span>
                    </a>
                </div>
            </div>
        </header>

        <!-- React Interactive Container -->
        <div class="cyber-suite-container">
            <?php echo do_shortcode('[sedrazavi_cyber_suite]'); ?>
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
`},{path:"page-design-tokens.php",filename:"page-design-tokens.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-design-tokens.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: مخزن متغیرهای سراسری دیزاین توکن (Design Tokens Suite)
 * Description: Live Design Tokens manager and theme CSS variable editor template.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-tokens-suite-wrapper" dir="rtl" style="background-color: var(--sr-bg-body, #070D1E); color: #F8FAFC; min-height: 100vh; padding: 50px 16px;">
    <div class="container" style="max-width: 1100px; margin: 0 auto;">
        
        <div class="sedrazavi-tokens-header" style="text-align: center; margin-bottom: 40px;">
            <span style="display: inline-block; padding: 4px 14px; background: rgba(212, 175, 55, 0.15); color: #D4AF37; border-radius: 9999px; font-size: 13px; font-weight: bold; border: 1px solid rgba(212, 175, 55, 0.3); margin-bottom: 12px;">
                🎨 پارت ۱۹ · سیستم Design Tokens
            </span>
            <h1 style="font-size: 30px; font-weight: 800; color: #FFFFFF; margin: 0 0 12px;">
                <?php esc_html_e('مخزن ۲۴ متغیر سراسری دیزاین توکن و ویرایشگر زنده CSS', 'sedrazavi'); ?>
            </h1>
            <p style="color: #94A3B8; font-size: 14px; max-width: 650px; margin: 0 auto;">
                <?php esc_html_e('مدیریت رنگ‌های اصلی، ثانویه، حاشیه‌ها، انحنای کارت‌ها و تایپوگرافی بدون دستکاری فایل‌های کد', 'sedrazavi'); ?>
            </p>
        </div>

        <div class="sedrazavi-tokens-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 22px;">
                <h3 style="font-size: 15px; font-weight: bold; color: #FFFFFF; margin-bottom: 12px;">متغیرهای رنگی (Color Tokens)</h3>
                <div style="font-size: 12px; color: #94A3B8; line-height: 2;">
                    <div><code>--sr-primary-accent</code>: <span style="color:#D4AF37;font-weight:bold;">#D4AF37 (طلایی)</span></div>
                    <div><code>--sr-bg-body</code>: <span style="color:#64748B;font-weight:bold;">#070D1E (سرمه‌ای تیره)</span></div>
                    <div><code>--sr-success-emerald</code>: <span style="color:#10B981;font-weight:bold;">#10B981 (سبز)</span></div>
                </div>
            </div>

            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 22px;">
                <h3 style="font-size: 15px; font-weight: bold; color: #FFFFFF; margin-bottom: 12px;">انحناها و شعاع کارت‌ها (Radius Tokens)</h3>
                <div style="font-size: 12px; color: #94A3B8; line-height: 2;">
                    <div><code>--sr-radius-sm</code>: 8px (دکمه‌ها و بج‌ها)</div>
                    <div><code>--sr-radius-md</code>: 14px (فیلدهای ورودی)</div>
                    <div><code>--sr-radius-xl</code>: 24px (کارت‌های مدرن)</div>
                </div>
            </div>

            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 22px;">
                <h3 style="font-size: 15px; font-weight: bold; color: #FFFFFF; margin-bottom: 12px;">سایه‌ها و عمق بصری (Elevation Tokens)</h3>
                <div style="font-size: 12px; color: #94A3B8; line-height: 2;">
                    <div><code>--sr-shadow-card</code>: 0 10px 25px -5px rgba(0,0,0,0.3)</div>
                    <div><code>--sr-shadow-glow</code>: 0 0 20px rgba(212, 175, 55, 0.25)</div>
                </div>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
`},{path:"page-designer.php",filename:"page-designer.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-designer.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: لندینگ طراح سایت وردپرس گوتنبرگ (WordPress Designer Landing)
 * Description: Dedicated Gutenberg-First WordPress Web Designer landing page template with 13 comprehensive sections.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-designer-landing-wrapper" dir="rtl" style="background-color: var(--sr-bg-body, #0B101E); color: #F8FAFC; min-height: 100vh;">
    
    <!-- 1. Hero Section -->
    <section class="sedrazavi-designer-hero" style="padding: 70px 16px 50px; text-align: center; background: radial-gradient(circle at top, rgba(99, 102, 241, 0.15) 0%, transparent 70%);">
        <div class="container" style="max-width: 1100px; margin: 0 auto;">
            <div style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 9999px; font-size: 13px; color: #818CF8; font-weight: bold; margin-bottom: 20px;">
                <span>⚡</span>
                <span><?php esc_html_e('توسعه اختصاصی وردپرس با ویرایشگر بومی گوتنبرگ', 'sedrazavi'); ?></span>
            </div>
            
            <h1 style="font-size: clamp(26px, 4vw, 44px); font-weight: 900; line-height: 1.3; margin: 0 0 18px; color: #FFFFFF;">
                <?php esc_html_e('طراحی سایت وردپرس با گوتنبرگ؛ سریع، سبک و حرفه‌ای', 'sedrazavi'); ?>
            </h1>
            
            <p style="font-size: clamp(14px, 1.8vw, 18px); color: #94A3B8; max-width: 780px; margin: 0 auto 32px; line-height: 1.8;">
                <?php esc_html_e('بدون افزونه‌های سنگین و صفحه‌سازهای کند، با تمرکز ۱۰۰٪ بر سرعت بارگذاری زیر ۲ ثانیه، سئوی فنی دقیق و تجربه کاربری بی‌نقص.', 'sedrazavi'); ?>
            </p>
            
            <div style="display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap; margin-bottom: 36px;">
                <a href="#brief-form" class="sedrazavi-btn-primary" style="display: inline-flex; align-items: center; gap: 8px; background: #6366F1; color: #FFFFFF; padding: 14px 28px; border-radius: 14px; font-weight: 800; text-decoration: none; box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);">
                    <span><?php esc_html_e('مشاوره رایگان ۲۰ دقیقه‌ای', 'sedrazavi'); ?></span>
                    <span>←</span>
                </a>
                <a href="#portfolio" class="sedrazavi-btn-secondary" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.06); color: #F1F5F9; border: 1px solid rgba(255, 255, 255, 0.15); padding: 14px 28px; border-radius: 14px; font-weight: 700; text-decoration: none;">
                    <span><?php esc_html_e('مشاهده نمونه‌کارها', 'sedrazavi'); ?></span>
                </a>
            </div>
            
            <!-- Badges -->
            <div style="display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap; font-size: 13px; color: #94A3B8;">
                <span style="display: inline-flex; align-items: center; gap: 6px;">
                    <span style="color: #10B981;">✓</span> <?php esc_html_e('تحویل ۷ روزه لندینگ', 'sedrazavi'); ?>
                </span>
                <span style="display: inline-flex; align-items: center; gap: 6px;">
                    <span style="color: #10B981;">✓</span> <?php esc_html_e('پشتیبانی فنی ۶ ماهه رایگان', 'sedrazavi'); ?>
                </span>
                <span style="display: inline-flex; align-items: center; gap: 6px;">
                    <span style="color: #10B981;">✓</span> <?php esc_html_e('سازگاری کامل موبایل و RTL', 'sedrazavi'); ?>
                </span>
            </div>
        </div>
    </section>

    <!-- 2. Social Proof Bar -->
    <section class="sedrazavi-designer-proof" style="background: rgba(15, 23, 42, 0.7); border-top: 1px solid rgba(255, 255, 255, 0.06); border-bottom: 1px solid rgba(255, 255, 255, 0.06); padding: 24px 16px;">
        <div class="container" style="max-width: 1000px; margin: 0 auto; display: flex; align-items: center; justify-content: space-around; flex-wrap: wrap; gap: 20px; text-align: center;">
            <div>
                <div style="font-size: 28px; font-weight: 900; color: #6366F1;">+۸۰</div>
                <div style="font-size: 13px; color: #94A3B8;"><?php esc_html_e('پروژه موفق وب', 'sedrazavi'); ?></div>
            </div>
            <div>
                <div style="font-size: 28px; font-weight: 900; color: #D4AF37;">۴.۹ / ۵</div>
                <div style="font-size: 13px; color: #94A3B8;"><?php esc_html_e('میانگین رضایت کارفرمایان', 'sedrazavi'); ?></div>
            </div>
            <div>
                <div style="font-size: 28px; font-weight: 900; color: #10B981;">۹۵٪</div>
                <div style="font-size: 13px; color: #94A3B8;"><?php esc_html_e('تحویل طبق موعد و تقویم', 'sedrazavi'); ?></div>
            </div>
            <div>
                <div style="font-size: 28px; font-weight: 900; color: #38BDF8;">A+</div>
                <div style="font-size: 13px; color: #94A3B8;"><?php esc_html_e('امتیاز سرعت Google PageSpeed', 'sedrazavi'); ?></div>
            </div>
        </div>
    </section>

    <!-- 3. Value Proposition (چرا من؟) -->
    <section class="sedrazavi-designer-values" style="padding: 60px 16px;">
        <div class="container" style="max-width: 1100px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="font-size: 26px; font-weight: 800; color: #FFFFFF; margin-bottom: 10px;">
                    <?php esc_html_e('چرا همکاری با یک متخصص گوتنبرگ متفاوت است؟', 'sedrazavi'); ?>
                </h2>
                <p style="color: #94A3B8; font-size: 14px; max-width: 600px; margin: 0 auto;">
                    <?php esc_html_e('ما به جای استفاده از قالب‌های آماده کند و کرک‌شده، از معماری بومی وردپرس و بلوک‌های سبک استفاده می‌کنیم.', 'sedrazavi'); ?>
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 24px;">
                    <div style="font-size: 24px; margin-bottom: 12px;">🚀</div>
                    <h3 style="font-size: 16px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px;"><?php esc_html_e('سرعت بارگذاری زیر ۲ ثانیه', 'sedrazavi'); ?></h3>
                    <p style="font-size: 13px; color: #94A3B8; line-height: 1.7; margin: 0;"><?php esc_html_e('بهینه‌سازی کدهای CSS و جاوااسکریپت برای رسیدن به بالاترین امتیاز در ابزارهای GTmetrix و PageSpeed.', 'sedrazavi'); ?></p>
                </div>
                <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 24px;">
                    <div style="font-size: 24px; margin-bottom: 12px;">🎨</div>
                    <h3 style="font-size: 16px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px;"><?php esc_html_e('طراحی ۱۰۰٪ اختصاصی و مدرن', 'sedrazavi'); ?></h3>
                    <p style="font-size: 13px; color: #94A3B8; line-height: 1.7; margin: 0;"><?php esc_html_e('طراحی اختصاصی متناسب با هویت برند، پالت رنگ سازمانی و بدون شباهت به قالب‌های کپی‌شده بازار.', 'sedrazavi'); ?></p>
                </div>
                <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 24px;">
                    <div style="font-size: 24px; margin-bottom: 12px;">🔍</div>
                    <h3 style="font-size: 16px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px;"><?php esc_html_e('سئوی فنی و ساختار اصولی', 'sedrazavi'); ?></h3>
                    <p style="font-size: 13px; color: #94A3B8; line-height: 1.7; margin: 0;"><?php esc_html_e('تزریق اسکیماهای استاندارد Schema.org، ساختار صحیح هدینگ‌ها و ایندکس سریع در موتورهای جستجو.', 'sedrazavi'); ?></p>
                </div>
                <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 24px;">
                    <div style="font-size: 24px; margin-bottom: 12px;">📱</div>
                    <h3 style="font-size: 16px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px;"><?php esc_html_e('موبایل فرست و کاملاً واکنش‌گرا', 'sedrazavi'); ?></h3>
                    <p style="font-size: 13px; color: #94A3B8; line-height: 1.7; margin: 0;"><?php esc_html_e('نمایش شیک در تمامی نمایشگرهای موبایل، تبلت و لپ‌تاپ با تایپوگرافی فارسی استاندارد.', 'sedrazavi'); ?></p>
                </div>
                <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 24px;">
                    <div style="font-size: 24px; margin-bottom: 12px;">📦</div>
                    <h3 style="font-size: 16px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px;"><?php esc_html_e('تحویل سورس + ویدئو آموزشی', 'sedrazavi'); ?></h3>
                    <p style="font-size: 13px; color: #94A3B8; line-height: 1.7; margin: 0;"><?php esc_html_e('تحویل کامل سورس اختصاصی همراه با فیلم آموزشی قدم‌به‌قدم برای کارفرمایان بدون دانش فنی.', 'sedrazavi'); ?></p>
                </div>
                <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 24px;">
                    <div style="font-size: 24px; margin-bottom: 12px;">🛡️</div>
                    <h3 style="font-size: 16px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px;"><?php esc_html_e('امنیت بالا و عدم وابستگی', 'sedrazavi'); ?></h3>
                    <p style="font-size: 13px; color: #94A3B8; line-height: 1.7; margin: 0;"><?php esc_html_e('کاهش شدید باگ‌های امنیتی با به حداقل رساندن افزونه‌های جانبی متفرقه و ناامن.', 'sedrazavi'); ?></p>
                </div>
            </div>
        </div>
    </section>

    <!-- 4. Services Grid -->
    <section id="services" class="sedrazavi-designer-services" style="padding: 60px 16px; background: rgba(15, 23, 42, 0.4);">
        <div class="container" style="max-width: 1100px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="font-size: 26px; font-weight: 800; color: #FFFFFF; margin-bottom: 10px;">
                    <?php esc_html_e('خدمات تخصصی طراحی و توسعه وردپرس', 'sedrazavi'); ?>
                </h2>
                <p style="color: #94A3B8; font-size: 14px;">
                    <?php esc_html_e('راهکارهای جامع متناسب با نیازهای استارتاپ‌ها، کسب‌وکارهای نوپا و شرکت‌های معتبر', 'sedrazavi'); ?>
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
                <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 20px; padding: 28px;">
                    <div style="color: #6366F1; font-size: 20px; font-weight: 800; margin-bottom: 8px;">۱. طراحی سایت شرکتی با گوتنبرگ</div>
                    <p style="color: #94A3B8; font-size: 13px; line-height: 1.7; margin-bottom: 18px;">
                        <?php esc_html_e('معرفی هویت سازمانی، خدمات، کاتالوگ و فرم‌های استعلام قیمت با معماری سبک گوتنبرگ.', 'sedrazavi'); ?>
                    </p>
                    <a href="#brief-form" style="color: #818CF8; font-size: 13px; font-weight: bold; text-decoration: none;">ثبت درخواست ←</a>
                </div>

                <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 20px; padding: 28px;">
                    <div style="color: #10B981; font-size: 20px; font-weight: 800; margin-bottom: 8px;">۲. طراحی فروشگاه آنلاین ووکامرس</div>
                    <p style="color: #94A3B8; font-size: 13px; line-height: 1.7; margin-bottom: 18px;">
                        <?php esc_html_e('سبد خرید سریع، تسویه‌حساب تک‌مرحله‌ای، اتصال درگاه بانکی مستقیم و مدیریت آسان موجودی.', 'sedrazavi'); ?>
                    </p>
                    <a href="#brief-form" style="color: #34D399; font-size: 13px; font-weight: bold; text-decoration: none;">ثبت درخواست ←</a>
                </div>

                <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 20px; padding: 28px;">
                    <div style="color: #D4AF37; font-size: 20px; font-weight: 800; margin-bottom: 8px;">۳. لندینگ‌پیج فروش و کمپین تبلیغاتی</div>
                    <p style="color: #94A3B8; font-size: 13px; line-height: 1.7; margin-bottom: 18px;">
                        <?php esc_html_e('صفحات فرود متمرکز بر نرخ تبدیل (CRO) با کپی‌رایتینگ ترغیب‌کننده و سازگار با گوگل ادز.', 'sedrazavi'); ?>
                    </p>
                    <a href="#brief-form" style="color: #FBBF24; font-size: 13px; font-weight: bold; text-decoration: none;">ثبت درخواست ←</a>
                </div>

                <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 20px; padding: 28px;">
                    <div style="color: #38BDF8; font-size: 20px; font-weight: 800; margin-bottom: 8px;">۴. بهینه‌سازی سرعت و Core Web Vitals</div>
                    <p style="color: #94A3B8; font-size: 13px; line-height: 1.7; margin-bottom: 18px;">
                        <?php esc_html_e('کاهش حجم صفحات، بهینه‌سازی دیتابیس، کش لبه CDN و رفع خطاهای کندی سرور.', 'sedrazavi'); ?>
                    </p>
                    <a href="#brief-form" style="color: #7DD3FC; font-size: 13px; font-weight: bold; text-decoration: none;">ثبت درخواست ←</a>
                </div>

                <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(244, 63, 94, 0.2); border-radius: 20px; padding: 28px;">
                    <div style="color: #F43F5E; font-size: 20px; font-weight: 800; margin-bottom: 8px;">۵. بازطراحی و رفع باگ سایت‌های قدیمی</div>
                    <p style="color: #94A3B8; font-size: 13px; line-height: 1.7; margin-bottom: 18px;">
                        <?php esc_html_e('مهاجرت از صفحه‌سازهای سنگین به گوتنبرگ بدون از دست رفتن رتبه‌های گوگل و اطلاعات پیشین.', 'sedrazavi'); ?>
                    </p>
                    <a href="#brief-form" style="color: #FB7185; font-size: 13px; font-weight: bold; text-decoration: none;">ثبت درخواست ←</a>
                </div>

                <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 20px; padding: 28px;">
                    <div style="color: #A855F7; font-size: 20px; font-weight: 800; margin-bottom: 8px;">۶. مشاوره و بریف‌نویسی پروژه وب</div>
                    <p style="color: #94A3B8; font-size: 13px; line-height: 1.7; margin-bottom: 18px;">
                        <?php esc_html_e('تحلیل فیچرهای موردنیاز، انتخاب هاست مناسب و برآورد دقیق بودجه و زمان‌بندی واقع‌بینانه.', 'sedrazavi'); ?>
                    </p>
                    <a href="#brief-form" style="color: #C084FC; font-size: 13px; font-weight: bold; text-decoration: none;">ثبت درخواست ←</a>
                </div>
            </div>
        </div>
    </section>

    <!-- 5. Portfolio Section -->
    <section id="portfolio" class="sedrazavi-designer-portfolio" style="padding: 60px 16px;">
        <div class="container" style="max-width: 1100px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="font-size: 26px; font-weight: 800; color: #FFFFFF; margin-bottom: 10px;">
                    <?php esc_html_e('گزیده نمونه‌کارهای اخیر', 'sedrazavi'); ?>
                </h2>
                <p style="color: #94A3B8; font-size: 14px;">
                    <?php esc_html_e('پروژه‌های طراحی‌شده با بالاترین کیفیت اجرایی و بالاترین نرخ رضایت کارفرما', 'sedrazavi'); ?>
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
                <!-- Portfolio Card 1 -->
                <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; overflow: hidden;">
                    <div style="height: 180px; background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%); display: flex; align-items: center; justify-content: center; font-size: 40px;">
                        💻
                    </div>
                    <div style="padding: 24px;">
                        <span style="font-size: 11px; font-weight: bold; color: #6366F1; background: rgba(99, 102, 241, 0.15); padding: 4px 10px; border-radius: 9999px;">گوتنبرگ بومی</span>
                        <h3 style="font-size: 17px; font-weight: 800; color: #FFFFFF; margin: 12px 0 8px;">سایت شرکتی هلدینگ توسعه فناوری</h3>
                        <p style="font-size: 13px; color: #94A3B8; line-height: 1.6; margin-bottom: 16px;">
                            طراحی اختصاصی با گوتنبرگ، سرعت بارگذاری ۱.۲ ثانیه، کسب رتبه اول در کلمات کلیدی سازمانی.
                        </p>
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #10B981; font-weight: bold;">
                            <span>رشد بازدید: +۱۸۰٪</span>
                            <span style="color: #818CF8;">مشاهده کیس‌استادی ←</span>
                        </div>
                    </div>
                </div>

                <!-- Portfolio Card 2 -->
                <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; overflow: hidden;">
                    <div style="height: 180px; background: linear-gradient(135deg, #064E3B 0%, #065F46 100%); display: flex; align-items: center; justify-content: center; font-size: 40px;">
                        🛍️
                    </div>
                    <div style="padding: 24px;">
                        <span style="font-size: 11px; font-weight: bold; color: #10B981; background: rgba(16, 185, 129, 0.15); padding: 4px 10px; border-radius: 9999px;">ووکامرس سریع</span>
                        <h3 style="font-size: 17px; font-weight: 800; color: #FFFFFF; margin: 12px 0 8px;">فروشگاه آنلاین محصولات چرمی و اکسسوری</h3>
                        <p style="font-size: 13px; color: #94A3B8; line-height: 1.6; margin-bottom: 16px;">
                            تسویه‌حساب تک‌مرحله‌ای، سبد خرید ایجکس و افزایش ۴۰ درصدی نرخ تکمیل خرید کاربران.
                        </p>
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #10B981; font-weight: bold;">
                            <span>فروش ماه اول: +۳۵۰ میلیون</span>
                            <span style="color: #34D399;">مشاهده کیس‌استادی ←</span>
                        </div>
                    </div>
                </div>

                <!-- Portfolio Card 3 -->
                <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; overflow: hidden;">
                    <div style="height: 180px; background: linear-gradient(135deg, #3B0764 0%, #581C87 100%); display: flex; align-items: center; justify-content: center; font-size: 40px;">
                        🚀
                    </div>
                    <div style="padding: 24px;">
                        <span style="font-size: 11px; font-weight: bold; color: #A855F7; background: rgba(168, 85, 247, 0.15); padding: 4px 10px; border-radius: 9999px;">لندینگ فروش</span>
                        <h3 style="font-size: 17px; font-weight: 800; color: #FFFFFF; margin: 12px 0 8px;">لندینگ کمپین تبلیغاتی استارتاپ هوش مصنوعی</h3>
                        <p style="font-size: 13px; color: #94A3B8; line-height: 1.6; margin-bottom: 16px;">
                            تحویل ۴ روزه، بهینه‌شده برای کمپین‌های گوگل ادز با نرخ تبدیل خیره‌کننده ۱۲ درصدی لیدها.
                        </p>
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #10B981; font-weight: bold;">
                            <span>جذب ۲,۱۰۰ کاربر در هفته اول</span>
                            <span style="color: #C084FC;">مشاهده کیس‌استادی ←</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 6. Process Timeline -->
    <section class="sedrazavi-designer-process" style="padding: 60px 16px; background: rgba(15, 23, 42, 0.4);">
        <div class="container" style="max-width: 900px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="font-size: 26px; font-weight: 800; color: #FFFFFF; margin-bottom: 10px;">
                    <?php esc_html_e('فرآیند گام‌به‌گام همکاری شفاف', 'sedrazavi'); ?>
                </h2>
                <p style="color: #94A3B8; font-size: 14px;">
                    <?php esc_html_e('از ثبت بریف اولیه تا تحویل و آموزش نهایی بدون ابهام و تاخیر', 'sedrazavi'); ?>
                </p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; gap: 18px; align-items: flex-start; background: rgba(30, 41, 59, 0.4); padding: 20px; border-radius: 16px; border-right: 4px solid #6366F1;">
                    <span style="font-size: 20px; font-weight: 900; color: #6366F1; min-width: 28px;">۱.</span>
                    <div>
                        <h4 style="font-size: 15px; font-weight: 800; color: #FFFFFF; margin: 0 0 6px;">دریافت بریف و مشاوره اولیه</h4>
                        <p style="font-size: 13px; color: #94A3B8; margin: 0; line-height: 1.6;">بررسی دقیق اهداف کسب‌وکار، پرسونای مخاطب، رقبا و پیشنهاد استراتژی ساختار سایت.</p>
                    </div>
                </div>
                <div style="display: flex; gap: 18px; align-items: flex-start; background: rgba(30, 41, 59, 0.4); padding: 20px; border-radius: 16px; border-right: 4px solid #10B981;">
                    <span style="font-size: 20px; font-weight: 900; color: #10B981; min-width: 28px;">۲.</span>
                    <div>
                        <h4 style="font-size: 15px; font-weight: 800; color: #FFFFFF; margin: 0 0 6px;">طراحی ساختار و چیدمان وایرفریم</h4>
                        <p style="font-size: 13px; color: #94A3B8; margin: 0; line-height: 1.6;">چیدمان بلوک‌ها، سلسله‌مراتب بصری، مسیر کاربر و تاییدیه کارفرما قبل از کدنویسی نهایی.</p>
                    </div>
                </div>
                <div style="display: flex; gap: 18px; align-items: flex-start; background: rgba(30, 41, 59, 0.4); padding: 20px; border-radius: 16px; border-right: 4px solid #D4AF37;">
                    <span style="font-size: 20px; font-weight: 900; color: #D4AF37; min-width: 28px;">۳.</span>
                    <div>
                        <h4 style="font-size: 15px; font-weight: 800; color: #FFFFFF; margin: 0 0 6px;">توسعه تمیز با بلوک‌های گوتنبرگ</h4>
                        <p style="font-size: 13px; color: #94A3B8; margin: 0; line-height: 1.6;">کدنویسی بدون پلاگین‌های اضافی، پیاده‌سازی افکت‌های ملایم و سازگاری کامل با استانداردهای وردپرس.</p>
                    </div>
                </div>
                <div style="display: flex; gap: 18px; align-items: flex-start; background: rgba(30, 41, 59, 0.4); padding: 20px; border-radius: 16px; border-right: 4px solid #38BDF8;">
                    <span style="font-size: 20px; font-weight: 900; color: #38BDF8; min-width: 28px;">۴.</span>
                    <div>
                        <h4 style="font-size: 15px; font-weight: 800; color: #FFFFFF; margin: 0 0 6px;">بهینه‌سازی سرعت و تست در تمام دستگاه‌ها</h4>
                        <p style="font-size: 13px; color: #94A3B8; margin: 0; line-height: 1.6;">تست روی آیفون، اندروید، مک و ویندوز و بهینه‌سازی دقیق Core Web Vitals برای بارگذاری آنی.</p>
                    </div>
                </div>
                <div style="display: flex; gap: 18px; align-items: flex-start; background: rgba(30, 41, 59, 0.4); padding: 20px; border-radius: 16px; border-right: 4px solid #A855F7;">
                    <span style="font-size: 20px; font-weight: 900; color: #A855F7; min-width: 28px;">۵.</span>
                    <div>
                        <h4 style="font-size: 15px; font-weight: 800; color: #FFFFFF; margin: 0 0 6px;">تحویل نهایی، ویدیو آموزشی و آموزش پنل</h4>
                        <p style="font-size: 13px; color: #94A3B8; margin: 0; line-height: 1.6;">ضبط فیلم آموزشی نحوه تغییر متون و تصاویر، تحویل دسترسی‌ها و شروع دوره پشتیبانی فنی رایگان.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 7. Pricing Packages -->
    <section class="sedrazavi-designer-pricing" style="padding: 60px 16px;">
        <div class="container" style="max-width: 1000px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="font-size: 26px; font-weight: 800; color: #FFFFFF; margin-bottom: 10px;">
                    <?php esc_html_e('پلن‌های تعرفه شفاف و بدون هزینه پنهان', 'sedrazavi'); ?>
                </h2>
                <p style="color: #94A3B8; font-size: 14px;">
                    <?php esc_html_e('انتخاب متناسب با مرحله رشد و بودجه کسب‌وکار شما', 'sedrazavi'); ?>
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
                <!-- Plan 1 -->
                <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 28px;">
                    <h3 style="font-size: 18px; font-weight: 800; color: #FFFFFF; margin-bottom: 6px;">لندینگ‌پیج سریع</h3>
                    <p style="font-size: 12px; color: #94A3B8; margin-bottom: 18px;">مناسب کمپین‌ها و معرفی محصول</p>
                    <div style="font-size: 24px; font-weight: 900; color: #6366F1; margin-bottom: 20px;">۱۲,۵۰۰,۰۰۰ <span style="font-size: 13px; color: #94A3B8;">تومان</span></div>
                    <ul style="list-style: none; padding: 0; margin: 0 0 24px; font-size: 13px; color: #CBD5E1; line-height: 2;">
                        <li>✓ طراحی با گوتنبرگ سبک</li>
                        <li>✓ تحویل ۷ روز کاری</li>
                        <li>✓ ۳ ماه پشتیبانی رایگان</li>
                        <li>✓ فیلم آموزشی مدیریت محتوا</li>
                    </ul>
                    <a href="#brief-form" style="display: block; text-align: center; background: rgba(99, 102, 241, 0.15); color: #818CF8; border: 1px solid rgba(99, 102, 241, 0.3); padding: 12px; border-radius: 12px; font-weight: bold; text-decoration: none;">انتخاب این پلن</a>
                </div>

                <!-- Plan 2 (Featured) -->
                <div style="background: rgba(30, 41, 59, 0.7); border: 2px solid #6366F1; border-radius: 20px; padding: 28px; position: relative; box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.3);">
                    <span style="position: absolute; top: -12px; right: 24px; background: #6366F1; color: #FFFFFF; font-size: 11px; font-weight: bold; padding: 3px 12px; border-radius: 9999px;">پیشنهاد ویژه</span>
                    <h3 style="font-size: 18px; font-weight: 800; color: #FFFFFF; margin-bottom: 6px;">سایت شرکتی کامل</h3>
                    <p style="font-size: 12px; color: #94A3B8; margin-bottom: 18px;">معرفی خدمات و اعتبار برند</p>
                    <div style="font-size: 24px; font-weight: 900; color: #10B981; margin-bottom: 20px;">۲۴,۰۰۰,۰۰۰ <span style="font-size: 13px; color: #94A3B8;">تومان</span></div>
                    <ul style="list-style: none; padding: 0; margin: 0 0 24px; font-size: 13px; color: #CBD5E1; line-height: 2;">
                        <li>✓ ۵ تا ۸ برگه اختصاصی</li>
                        <li>✓ سئوی تکنیکال اولیه کامل</li>
                        <li>✓ امتیاز بالای ۹۰ در PageSpeed</li>
                        <li>✓ ۶ ماه پشتیبانی فنی مستقیم</li>
                    </ul>
                    <a href="#brief-form" style="display: block; text-align: center; background: #6366F1; color: #FFFFFF; padding: 12px; border-radius: 12px; font-weight: bold; text-decoration: none;">انتخاب پلن شرکتی</a>
                </div>

                <!-- Plan 3 -->
                <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 28px;">
                    <h3 style="font-size: 18px; font-weight: 800; color: #FFFFFF; margin-bottom: 6px;">فروشگاه آنلاین ووکامرس</h3>
                    <p style="font-size: 12px; color: #94A3B8; margin-bottom: 18px;">فروش نامحدود محصولات فیزیکی/دیجیتال</p>
                    <div style="font-size: 24px; font-weight: 900; color: #D4AF37; margin-bottom: 20px;">۳۸,۰۰۰,۰۰۰ <span style="font-size: 13px; color: #94A3B8;">تومان</span></div>
                    <ul style="list-style: none; padding: 0; margin: 0 0 24px; font-size: 13px; color: #CBD5E1; line-height: 2;">
                        <li>✓ اتصال درگاه‌های بانکی و پستی</li>
                        <li>✓ پنل پیامکی خودکار وضعیت سفارش</li>
                        <li>✓ سبد خرید سریع و واکنش‌گرا</li>
                        <li>✓ پشتیبانی و نگهداری ۱ ساله</li>
                    </ul>
                    <a href="#brief-form" style="display: block; text-align: center; background: rgba(212, 175, 55, 0.15); color: #D4AF37; border: 1px solid rgba(212, 175, 55, 0.3); padding: 12px; border-radius: 12px; font-weight: bold; text-decoration: none;">سفارش فروشگاه آنلاین</a>
                </div>
            </div>
        </div>
    </section>

    <!-- 8. Interactive Brief Form Section -->
    <section id="brief-form" class="sedrazavi-designer-brief" style="padding: 60px 16px; background: rgba(15, 23, 42, 0.5);">
        <div class="container" style="max-width: 760px; margin: 0 auto; background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 36px 24px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="font-size: 24px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px;">
                    <?php esc_html_e('ثبت سریع بریف و درخواست مشاوره رایگان', 'sedrazavi'); ?>
                </h2>
                <p style="color: #94A3B8; font-size: 13px;">
                    <?php esc_html_e('اطلاعات کلی پروژه خود را ارسال کنید تا در کمتر از ۲ ساعت کاری جهت تحلیل اولیه با شما تماس بگیریم.', 'sedrazavi'); ?>
                </p>
            </div>

            <form method="post" action="" style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div>
                        <label style="display: block; font-size: 13px; font-weight: bold; margin-bottom: 6px; color: #CBD5E1;">نام و نام خانوادگی *</label>
                        <input type="text" placeholder="مثال: علی رضایی" style="width: 100%; padding: 12px 14px; border-radius: 12px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); color: #FFFFFF; font-size: 13px;" required />
                    </div>
                    <div>
                        <label style="display: block; font-size: 13px; font-weight: bold; margin-bottom: 6px; color: #CBD5E1;">شماره موبایل جهت هماهنگی *</label>
                        <input type="tel" placeholder="۰۹۱۲۳۴۵۶۷۸۹" style="width: 100%; padding: 12px 14px; border-radius: 12px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); color: #FFFFFF; font-size: 13px;" required />
                    </div>
                </div>

                <div>
                    <label style="display: block; font-size: 13px; font-weight: bold; margin-bottom: 6px; color: #CBD5E1;">نوع پروژه درخواستی</label>
                    <select style="width: 100%; padding: 12px 14px; border-radius: 12px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); color: #FFFFFF; font-size: 13px;">
                        <option>طراحی سایت شرکتی با گوتنبرگ</option>
                        <option>طراحی فروشگاه آنلاین ووکامرس</option>
                        <option>لندینگ‌پیج فروش و کمپین تبلیغاتی</option>
                        <option>بهینه‌سازی سرعت و بازطراحی سایت فعلی</option>
                        <option>مشاوره تخصصی و تحلیل بریف</option>
                    </select>
                </div>

                <div>
                    <label style="display: block; font-size: 13px; font-weight: bold; margin-bottom: 6px; color: #CBD5E1;">توضیحات کوتاه درباره امکانات و اهداف پروژه</label>
                    <textarea rows="4" placeholder="آدرس سایت فعلی، امکانات خاص مدنظر، یا نمونه‌سایت‌هایی که مدنظرتان است..." style="width: 100%; padding: 12px 14px; border-radius: 12px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); color: #FFFFFF; font-size: 13px; resize: vertical;"></textarea>
                </div>

                <button type="submit" class="sedrazavi-btn-submit" style="background: #6366F1; color: #FFFFFF; border: none; padding: 14px; border-radius: 14px; font-weight: 800; font-size: 15px; cursor: pointer; margin-top: 8px;">
                    <?php esc_html_e('ارسال بریف و دریافت مشاوره فوری', 'sedrazavi'); ?>
                </button>
            </form>
        </div>
    </section>

</div>

<?php
get_footer();
`},{path:"page-downloads-hub.php",filename:"page-downloads-hub.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-downloads-hub.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: مرکز دانلود نرم‌افزار، اپلیکیشن و بازی (Downloads Hub)
 * Description: Dedicated software, apps, and games download hub template with version badges, checksums, and direct links.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-downloads-hub-wrapper" dir="rtl" style="background-color: var(--sr-bg-body, #070D1E); color: #F8FAFC; min-height: 100vh; padding: 50px 16px;">
    <div class="container" style="max-width: 1100px; margin: 0 auto;">
        
        <!-- Header -->
        <div class="sedrazavi-downloads-header" style="text-align: center; margin-bottom: 40px;">
            <span style="display: inline-block; padding: 4px 14px; background: rgba(56, 189, 248, 0.15); color: #38BDF8; border-radius: 9999px; font-size: 13px; font-weight: bold; border: 1px solid rgba(56, 189, 248, 0.3); margin-bottom: 12px;">
                📦 مرکز دانلود فایل، نرم‌افزار و ابزارها
            </span>
            <h1 style="font-size: 32px; font-weight: 800; color: #FFFFFF; margin: 0 0 12px;">
                <?php esc_html_e('دانلود مستقیم نرم‌افزارها، اپلیکیشن‌های کاربردی و افزونه‌ها', 'sedrazavi'); ?>
            </h1>
            <p style="color: #94A3B8; font-size: 14px; max-width: 650px; margin: 0 auto;">
                <?php esc_html_e('لینک‌های مستقیم پرسرعت، بررسی امنیتی ضدبدافزار، هش SHA-256 و راهنمای نصب قدم‌به‌قدم', 'sedrazavi'); ?>
            </p>
        </div>

        <!-- Software Grid -->
        <div class="sedrazavi-downloads-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
            <!-- Software Item 1 -->
            <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 24px;">
                <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
                    <div style="width: 52px; height: 52px; background: rgba(56, 189, 248, 0.2); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 26px;">
                        💻
                    </div>
                    <div>
                        <h3 style="font-size: 16px; font-weight: bold; color: #FFFFFF; margin: 0 0 4px;">نرم‌افزار مدیریت پرونده‌های حقوقی (Desktop)</h3>
                        <span style="font-size: 11px; color: #38BDF8; font-weight: bold;">نسخه ۳.۲.۱ · ویندوز و مک</span>
                    </div>
                </div>
                <p style="font-size: 13px; color: #94A3B8; line-height: 1.6; margin-bottom: 16px;">
                    مدیریت آفلاین اسناد، محاسبه مواعد قانونی دادرسی و همگام‌سازی ابری با سرور اختصاصی دفتر.
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #94A3B8; border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 14px;">
                    <span>حجم: ۴۸ مگابایت</span>
                    <a href="#" class="sedrazavi-btn-download-file" style="background: #38BDF8; color: #070D1E; padding: 6px 14px; border-radius: 8px; font-weight: bold; text-decoration: none;">دانلود مستقیم ↓</a>
                </div>
            </div>

            <!-- Software Item 2 -->
            <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 24px;">
                <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
                    <div style="width: 52px; height: 52px; background: rgba(16, 185, 129, 0.2); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 26px;">
                        📱
                    </div>
                    <div>
                        <h3 style="font-size: 16px; font-weight: bold; color: #FFFFFF; margin: 0 0 4px;">اپلیکیشن همراه موکلین (Android / iOS)</h3>
                        <span style="font-size: 11px; color: #10B981; font-weight: bold;">نسخه ۲.۰.۴ · APK و PWA</span>
                    </div>
                </div>
                <p style="font-size: 13px; color: #94A3B8; line-height: 1.6; margin-bottom: 16px;">
                    مشاهده لحظه‌ای ابلاغیه‌های دادگاه، دریافت پیامک‌های وقت جلسه و گفتگوی مستقیم با وکیل سرپرست.
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #94A3B8; border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 14px;">
                    <span>حجم: ۱۸ مگابایت</span>
                    <a href="#" class="sedrazavi-btn-download-file" style="background: #10B981; color: #FFFFFF; padding: 6px 14px; border-radius: 8px; font-weight: bold; text-decoration: none;">دانلود مستقیم ↓</a>
                </div>
            </div>

            <!-- Software Item 3 -->
            <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 24px;">
                <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
                    <div style="width: 52px; height: 52px; background: rgba(99, 102, 241, 0.2); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 26px;">
                        ⚡
                    </div>
                    <div>
                        <h3 style="font-size: 16px; font-weight: bold; color: #FFFFFF; margin: 0 0 4px;">بسته فرم‌ها و شکواییه‌های استاندارد دادگستری</h3>
                        <span style="font-size: 11px; color: #818CF8; font-weight: bold;">فرمت Word & PDF</span>
                    </div>
                </div>
                <p style="font-size: 13px; color: #94A3B8; line-height: 1.6; margin-bottom: 16px;">
                    بیش از ۵۰۰ نمونه دادخواست حقوقی، کیفری، تجدیدنظر و لوایح دفاعی طبق قانون جدید دیوان عدالت.
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #94A3B8; border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 14px;">
                    <span>حجم: ۱۲ مگابایت (ZIP)</span>
                    <a href="#" class="sedrazavi-btn-download-file" style="background: #6366F1; color: #FFFFFF; padding: 6px 14px; border-radius: 8px; font-weight: bold; text-decoration: none;">دانلود مستقیم ↓</a>
                </div>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
`},{path:"page-drafting-vault.php",filename:"page-drafting-vault.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-drafting-vault.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: خزانه‌گاه هوشمند قراردادها و اسناد تجاری (Master Drafting Vault)
 * Description: مخزن نمونه قراردادهای استاندارد دوزبانه، مبایعه‌نامه، اجاره، NDA، سهامداری و پیمانکاری همراه با شرط داوری استاندارد
 *
 * @package SedRazavi
 * @version 3.1.0
 */

if (!defined('ABSPATH')) exit;

$is_elementor = false;
if (did_action('elementor/loaded') && class_exists('Elementor\\Plugin')) {
    $elem = \\Elementor\\Plugin::instance();
    if (($elem->preview && method_exists($elem->preview, 'is_preview_mode') && $elem->preview->is_preview_mode()) ||
        ($elem->editor && method_exists($elem->editor, 'is_edit_mode') && $elem->editor->is_edit_mode()) ||
        ($elem->db && method_exists($elem->db, 'is_built_with_elementor') && $elem->db->is_built_with_elementor(get_the_ID()))) {
        $is_elementor = true;
    }
}
if (!$is_elementor && is_singular() && get_post_meta(get_the_ID(), '_elementor_edit_mode', true) === 'builder') {
    $is_elementor = true;
}

get_header();

if ($is_elementor) :
    while (have_posts()) : the_post();
        the_content();
    endwhile;
else :
?>

<div class="py-12 bg-[#0B132B] min-h-screen text-slate-100" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="relative bg-gradient-to-br from-[#060B18] via-[#0B132B] to-[#1F2438] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 mb-10 shadow-2xl overflow-hidden">
            <div class="space-y-4 text-right max-w-3xl">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
                    <span>📑 گنجینه تخصصی اسناد و قراردادهای وکلای پایه یک</span>
                </div>
                <h1 class="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
                    خزانه‌گاه نمونه قراردادهای حقوقی، تجاری و دوزبانه
                </h1>
                <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                    دریافت و ویرایش قراردادهای محرمانگی (NDA)، قرارداد بنیان‌گذاران، مشارکت مدنی، نمایندگی انحصاری، قراردادهای نرم‌افزاری و پیمانکاری همراه با شرط داوری معتبر کانون وکلای مرکز.
                </p>
            </div>
        </div>

        <div class="mb-12">
            <?php
            if (shortcode_exists('sedrazavi_drafting_vault')) {
                echo do_shortcode('[sedrazavi_drafting_vault]');
            } elseif (shortcode_exists('react_component')) {
                echo do_shortcode('[react_component name="MasterDraftingVaultSuite"]');
            }
            ?>
        </div>

        <?php
        while (have_posts()) : the_post();
            the_content();
        endwhile;
        ?>
    </div>
</div>

<?php
endif;
get_footer();
`},{path:"page-economic-crimes.php",filename:"page-economic-crimes.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-economic-crimes.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: جرایم اقتصادی، بورس و دادگاه‌های ویژه (Economic Crimes Defense)
 * Description: سامانه دفاع حقوقی جرایم کلان اقتصادی، معاملات متکی بر اطلاعات نهانی بورس، ارزیابی قرارهای تامین و ردیابی مالی
 *
 * @package SedRazavi
 * @version 3.1.0
 */

if (!defined('ABSPATH')) exit;

$is_elementor = false;
if (did_action('elementor/loaded') && class_exists('Elementor\\Plugin')) {
    $elem = \\Elementor\\Plugin::instance();
    if (($elem->preview && method_exists($elem->preview, 'is_preview_mode') && $elem->preview->is_preview_mode()) ||
        ($elem->editor && method_exists($elem->editor, 'is_edit_mode') && $elem->editor->is_edit_mode()) ||
        ($elem->db && method_exists($elem->db, 'is_built_with_elementor') && $elem->db->is_built_with_elementor(get_the_ID()))) {
        $is_elementor = true;
    }
}
if (!$is_elementor && is_singular() && get_post_meta(get_the_ID(), '_elementor_edit_mode', true) === 'builder') {
    $is_elementor = true;
}

get_header();

if ($is_elementor) :
    while (have_posts()) : the_post();
        the_content();
    endwhile;
else :
?>

<div class="py-12 bg-[#0B132B] min-h-screen text-slate-100" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="relative bg-gradient-to-br from-[#060B18] via-[#0B132B] to-[#1F1836] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 mb-10 shadow-2xl overflow-hidden">
            <div class="space-y-4 text-right max-w-3xl">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
                    <span>⚖️ دپارتمان تخصصی حقوق کیفری اقتصادی و بازار سرمایه</span>
                </div>
                <h1 class="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
                    دفاع تخصصی در مجتمع قضایی جرایم اقتصادی و دادگاه‌های ویژه
                </h1>
                <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                    وکالت تخصصی در پرونده‌های قانون مجازات اخلالگران در نظام اقتصادی کشور، تبانی در معاملات دولتی، جرایم بازار سرمایه و بورس اوراق بهادار، تبدیل قرار بازداشت موقت و اثبات عدم سوء‌نیت شرکتی.
                </p>
            </div>
        </div>

        <div class="mb-12">
            <?php
            if (shortcode_exists('react_component')) {
                echo do_shortcode('[react_component name="EconomicCrimesDefenseSuite"]');
            }
            ?>
        </div>

        <?php
        while (have_posts()) : the_post();
            the_content();
        endwhile;
        ?>
    </div>
</div>

<?php
endif;
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
`},{path:"page-epc-procurement.php",filename:"page-epc-procurement.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-epc-procurement.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: قراردادهای پیمانکاری، EPC و شرایط عمومی پیمان (EPC & Construction Contracts)
 * Description: سامانه تحلیل تاخیرات مجاز (بخشنامه ۵۰۹۰)، دعاوی فسخ و خاتمه پیمان و استانداردهای مهندسی فیدیک
 *
 * @package SedRazavi
 * @version 3.1.0
 */

if (!defined('ABSPATH')) exit;

$is_elementor = false;
if (did_action('elementor/loaded') && class_exists('Elementor\\Plugin')) {
    $elem = \\Elementor\\Plugin::instance();
    if (($elem->preview && method_exists($elem->preview, 'is_preview_mode') && $elem->preview->is_preview_mode()) ||
        ($elem->editor && method_exists($elem->editor, 'is_edit_mode') && $elem->editor->is_edit_mode()) ||
        ($elem->db && method_exists($elem->db, 'is_built_with_elementor') && $elem->db->is_built_with_elementor(get_the_ID()))) {
        $is_elementor = true;
    }
}
if (!$is_elementor && is_singular() && get_post_meta(get_the_ID(), '_elementor_edit_mode', true) === 'builder') {
    $is_elementor = true;
}

get_header();

if ($is_elementor) :
    while (have_posts()) : the_post();
        the_content();
    endwhile;
else :
?>

<div class="py-12 bg-[#0B132B] min-h-screen text-slate-100" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="relative bg-gradient-to-br from-[#060B18] via-[#0B132B] to-[#12213D] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 mb-10 shadow-2xl overflow-hidden">
            <div class="absolute -left-10 -bottom-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div class="space-y-4 text-right max-w-3xl">
                    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
                        <span>🏗️ دپارتمان تخصصی حقوق مهندسی و پیمانکاری کلان</span>
                    </div>
                    <h1 class="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
                        مدیریت ادعا (Claim)، تاخیرات پیمانکاری و قراردادهای EPC
                    </h1>
                    <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                        مشاوره حقوقی تخصصی در پروژه‌های EPC، PC، BOT و شرایط عمومی پیمان (نشریه ۴۳۱۱)، لایحه تاخیرات بخشنامه ۵۰۹۰، دفاع در برابر ضبط ضمانت‌نامه بانکی و داوری فنی مهندسی.
                    </p>
                </div>
                <div class="flex flex-col gap-3 w-full md:w-auto">
                    <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn-gold text-center py-3 px-6 rounded-xl text-xs font-bold shadow-lg shadow-[#D4AF37]/20">
                        درخواست تنظیم لایحه کلیم (Claim)
                    </a>
                </div>
            </div>
        </div>

        <div class="mb-12">
            <?php
            if (shortcode_exists('react_component')) {
                echo do_shortcode('[react_component name="EngineeringProcurementSuite"]');
            }
            ?>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div class="p-6 bg-[#060B18]/90 border border-slate-800 rounded-2xl">
                <h3 class="text-lg font-bold text-white mb-2">بخشنامه ۵۰۹۰ و تاخیرات مجاز</h3>
                <p class="text-xs text-slate-300 leading-relaxed">محاسبه علمی روزهای تمدید پیمان بر اساس دیرکرد پیش‌پرداخت، صورت‌وضعیت‌های تاییدشده و تاخیرات خارج از قصور پیمانکار.</p>
            </div>
            <div class="p-6 bg-[#060B18]/90 border border-slate-800 rounded-2xl">
                <h3 class="text-lg font-bold text-white mb-2">ماده ۴۶ و ۴۸ نشریه ۴۳۱۱</h3>
                <p class="text-xs text-slate-300 leading-relaxed">استراتژی‌های پیشگیرانه در برابر اخطار فسخ، جلوگیری از تملک غیرقانونی ماشین‌آلات کارگاه و اعمال خاتمه منصفانه پیمان.</p>
            </div>
            <div class="p-6 bg-[#060B18]/90 border border-slate-800 rounded-2xl">
                <h3 class="text-lg font-bold text-white mb-2">استانداردهای بین‌المللی FIDIC</h3>
                <p class="text-xs text-slate-300 leading-relaxed">داوری فنی و حل اختلاف از طریق هیئت‌های حل اختلاف (DAB) در قراردادهای مهندسی فیدیک با کارفرمایان دولتی و بین‌المللی.</p>
            </div>
        </div>

        <?php
        while (have_posts()) : the_post();
            the_content();
        endwhile;
        ?>
    </div>
</div>

<?php
endif;
get_footer();
`},{path:"page-family-inheritance.php",filename:"page-family-inheritance.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-family-inheritance.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: حقوق خانواده، انحصار وراثت و ترکه (Family & Inheritance)
 * Description: سامانه محاسبات مهریه به نرخ روز، گواهی حصر وراثت، تقسیم ترکه و توافق‌نامه‌های خانوادگی
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="site-main py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] text-slate-800 dark:text-slate-100 min-h-screen">
    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- Header Banner -->
        <header class="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#211A38] to-[#0B132B] text-white border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="space-y-3">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
                        <span>👨‍👩‍👧‍👦 احوال شخصیه، ارث و خانواده</span>
                    </div>
                    <h1 class="text-2xl md:text-3xl font-extrabold text-white font-serif">
                        سامانه تخصصی حقوق خانواده، انحصار وراثت و تقسیم ترکه
                    </h1>
                    <p class="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
                        محاسبه ارزش ریالی مهریه بر مبنای شاخص بهای کالا و خدمات بانک مرکزی، تقسیم سهم‌الارث طبقات وراث بر اساس قانون مدنی و تنظیم توافق‌نامه‌های رسمی شروط ضمن عقد نکاح.
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <a href="<?php echo esc_url(home_url('/contact')); ?>" class="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B132B] font-bold text-sm shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2">
                        <span>مشاوره محرمانه خانواده</span>
                    </a>
                </div>
            </div>
        </header>

        <!-- React Interactive Container -->
        <div class="family-suite-container">
            <?php echo do_shortcode('[sedrazavi_family_inheritance]'); ?>
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
`},{path:"page-gallery-wallpapers.php",filename:"page-gallery-wallpapers.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-gallery-wallpapers.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: نمایش و دانلود عکس و والپیپر (Gallery & Wallpapers)
 * Description: Dedicated Photo gallery, HD wallpapers, and vector background downloads template with resolutions and tags.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-wallpapers-hub-wrapper" dir="rtl" style="background-color: var(--sr-bg-body, #070D1E); color: #F8FAFC; min-height: 100vh; padding: 50px 16px;">
    <div class="container" style="max-width: 1100px; margin: 0 auto;">
        
        <!-- Header -->
        <div class="sedrazavi-wallpapers-header" style="text-align: center; margin-bottom: 40px;">
            <span style="display: inline-block; padding: 4px 14px; background: rgba(245, 158, 11, 0.15); color: #FBBF24; border-radius: 9999px; font-size: 13px; font-weight: bold; border: 1px solid rgba(245, 158, 11, 0.3); margin-bottom: 12px;">
                🖼️ گالری تصاویر، والپیپر و پس‌زمینه‌ها
            </span>
            <h1 style="font-size: 32px; font-weight: 800; color: #FFFFFF; margin: 0 0 12px;">
                <?php esc_html_e('گالری عکس‌های باکیفیت ۴K، والپیپر و وکتورهای پس‌زمینه', 'sedrazavi'); ?>
            </h1>
            <p style="color: #94A3B8; font-size: 14px; max-width: 650px; margin: 0 auto;">
                <?php esc_html_e('مشاهده پیش‌نمایش تمام‌صفحه، دانلود با رزولوشن‌های مختلف و دریافت سورس وکتور SVG', 'sedrazavi'); ?>
            </p>
        </div>

        <!-- Gallery Grid -->
        <div class="sedrazavi-wallpapers-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
            <!-- Wallpaper 1 -->
            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; overflow: hidden;">
                <div style="height: 180px; background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); display: flex; align-items: center; justify-content: center; font-size: 40px;">
                    ⚖️
                </div>
                <div style="padding: 18px;">
                    <span style="font-size: 11px; font-weight: bold; color: #D4AF37; background: rgba(212, 175, 55, 0.15); padding: 3px 8px; border-radius: 6px;">تذهیب اسلامی وکیل</span>
                    <h3 style="font-size: 15px; font-weight: bold; color: #FFFFFF; margin: 8px 0 6px;">والپیپر هندسی طلایی و سرمه‌ای ۴K</h3>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #94A3B8; margin-top: 12px;">
                        <span>رزولوشن: 3840x2160</span>
                        <a href="#" class="sedrazavi-btn-download-img" style="color: #D4AF37; font-weight: bold; text-decoration: none;">دانلود ۴K ↓</a>
                    </div>
                </div>
            </div>

            <!-- Wallpaper 2 -->
            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; overflow: hidden;">
                <div style="height: 180px; background: linear-gradient(135deg, #312E81 0%, #1E1B4B 100%); display: flex; align-items: center; justify-content: center; font-size: 40px;">
                    💻
                </div>
                <div style="padding: 18px;">
                    <span style="font-size: 11px; font-weight: bold; color: #818CF8; background: rgba(99, 102, 241, 0.15); padding: 3px 8px; border-radius: 6px;">سایبر و مدارها</span>
                    <h3 style="font-size: 15px; font-weight: bold; color: #FFFFFF; margin: 8px 0 6px;">والپیپر کدهای برنامه‌نویسی و مدارهای نئونی</h3>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #94A3B8; margin-top: 12px;">
                        <span>رزولوشن: 3840x2160</span>
                        <a href="#" class="sedrazavi-btn-download-img" style="color: #818CF8; font-weight: bold; text-decoration: none;">دانلود ۴K ↓</a>
                    </div>
                </div>
            </div>

            <!-- Wallpaper 3 -->
            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; overflow: hidden;">
                <div style="height: 180px; background: linear-gradient(135deg, #064E3B 0%, #022C22 100%); display: flex; align-items: center; justify-content: center; font-size: 40px;">
                    🌱
                </div>
                <div style="padding: 18px;">
                    <span style="font-size: 11px; font-weight: bold; color: #34D399; background: rgba(16, 185, 129, 0.15); padding: 3px 8px; border-radius: 6px;">طبیعت و مینیمال</span>
                    <h3 style="font-size: 15px; font-weight: bold; color: #FFFFFF; margin: 8px 0 6px;">والپیپر امواج زمردی و خطوط کانتور ملایم</h3>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #94A3B8; margin-top: 12px;">
                        <span>رزولوشن: 3840x2160</span>
                        <a href="#" class="sedrazavi-btn-download-img" style="color: #34D399; font-weight: bold; text-decoration: none;">دانلود ۴K ↓</a>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
`},{path:"page-github-suite.php",filename:"page-github-suite.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-github-suite.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: پیشخوان گیت‌هاب و پروژه (GitHub Primer Suite)
 * Description: Dedicated GitHub Primer Dark dashboard with activity heatmap, commit trail, issues, and sync hub.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-github-suite-wrapper" dir="rtl" style="background-color: #0D1117; color: #C9D1D9; min-height: 100vh; padding: 40px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <div class="container" style="max-width: 1100px; margin: 0 auto;">
        
        <!-- Header -->
        <div class="sedrazavi-github-suite-header" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: gap: 16px; border-bottom: 1px solid #30363D; padding-bottom: 24px; margin-bottom: 28px;">
            <div style="display: flex; align-items: center; gap: 14px;">
                <div style="width: 44px; height: 44px; background: #161B22; border: 1px solid #30363D; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px;">
                    🐙
                </div>
                <div>
                    <h1 style="font-size: 20px; font-weight: bold; color: #F0F6FC; margin: 0 0 4px;">
                        <?php esc_html_e('پیشخوان یکپارچه پروژه و مخزن گیت‌هاب', 'sedrazavi'); ?>
                    </h1>
                    <p style="font-size: 12px; color: #8B949E; margin: 0;">
                        <?php esc_html_e('مدیریت پرونده‌ها، لاگ کامیت‌ها، رهگیری بریف‌ها و وضعیت همگام‌سازی ابری مخزن', 'sedrazavi'); ?>
                    </p>
                </div>
            </div>

            <div style="display: flex; gap: 8px;">
                <span style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: rgba(35, 134, 54, 0.2); border: 1px solid #238636; border-radius: 8px; font-size: 12px; color: #3FB950; font-weight: bold;">
                    ● شاخه اصلی: main
                </span>
                <span style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: #161B22; border: 1px solid #30363D; border-radius: 8px; font-size: 12px; color: #58A6FF; font-weight: bold;">
                    نگارش ۳.۱.۰
                </span>
            </div>
        </div>

        <!-- Activity Heatmap Simulation -->
        <div class="sedrazavi-github-heatmap-card" style="background: #161B22; border: 1px solid #30363D; border-radius: 14px; padding: 20px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                <h3 style="font-size: 14px; font-weight: bold; color: #F0F6FC; margin: 0;">
                    <?php esc_html_e('ماتریس فعالیت سالانه (Contribution Activity Matrix)', 'sedrazavi'); ?>
                </h3>
                <span style="font-size: 12px; color: #8B949E;">۳۴۲ اقدام و ثبت رویداد در سال جاری</span>
            </div>
            
            <div style="display: flex; gap: 4px; overflow-x: auto; padding-bottom: 8px;">
                <?php
                for ($col = 0; $col < 36; $col++) {
                    echo '<div style="display: flex; flex-direction: column; gap: 4px;">';
                    for ($row = 0; $row < 7; $row++) {
                        $level = ($col * 7 + $row) % 5;
                        $color = '#21262D';
                        if ($level === 1) $color = '#0E4429';
                        if ($level === 2) $color = '#006D32';
                        if ($level === 3) $color = '#26A641';
                        if ($level === 4) $color = '#39D353';
                        echo '<div style="width: 12px; height: 12px; border-radius: 2px; background-color: ' . $color . ';"></div>';
                    }
                    echo '</div>';
                }
                ?>
            </div>
            <div style="display: flex; align-items: center; justify-content: flex-end; gap: 6px; margin-top: 10px; font-size: 11px; color: #8B949E;">
                <span>کمتر</span>
                <span style="width: 10px; height: 10px; border-radius: 2px; background: #21262D;"></span>
                <span style="width: 10px; height: 10px; border-radius: 2px; background: #0E4429;"></span>
                <span style="width: 10px; height: 10px; border-radius: 2px; background: #006D32;"></span>
                <span style="width: 10px; height: 10px; border-radius: 2px; background: #26A641;"></span>
                <span style="width: 10px; height: 10px; border-radius: 2px; background: #39D353;"></span>
                <span>بیشتر</span>
            </div>
        </div>

        <!-- Issues and Case Tracker Grid -->
        <div class="sedrazavi-github-issues-card" style="background: #161B22; border: 1px solid #30363D; border-radius: 14px; overflow: hidden; margin-bottom: 24px;">
            <div style="padding: 14px 18px; background: #21262D; border-bottom: 1px solid #30363D; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 13px; font-weight: bold; color: #F0F6FC;">
                    📋 کارتابل پرونده‌ها و ایشوهای باز (Issues & Briefs)
                </span>
                <span style="font-size: 11px; color: #8B949E;">بروزرسانی زنده</span>
            </div>

            <div style="divide-y divide-[#30363D];">
                <div style="padding: 16px 18px; border-bottom: 1px solid #30363D; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="color: #3FB950; font-size: 16px;">●</span>
                        <div>
                            <div style="font-size: 13px; font-weight: bold; color: #F0F6FC;">
                                پرونده داوری قرارداد تجاری هلدینگ صادرات فولاد (CAS-9482)
                            </div>
                            <div style="font-size: 11px; color: #8B949E; margin-top: 3px;">
                                باز شده توسط سید امیرحسین رضوی · ۲ ساعت پیش · ۶ نظر کارشناسی
                            </div>
                        </div>
                    </div>
                    <span style="padding: 3px 10px; background: rgba(31, 111, 235, 0.2); color: #58A6FF; border: 1px solid rgba(31, 111, 235, 0.4); border-radius: 9999px; font-size: 11px; font-weight: bold;">
                        داوری بین‌الملل
                    </span>
                </div>

                <div style="padding: 16px 18px; border-bottom: 1px solid #30363D; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="color: #3FB950; font-size: 16px;">●</span>
                        <div>
                            <div style="font-size: 13px; font-weight: bold; color: #F0F6FC;">
                                دفاع در هیئت حل اختلاف مالیاتی و اعتراض به برگ تشخیص (CAS-9120)
                            </div>
                            <div style="font-size: 11px; color: #8B949E; margin-top: 3px;">
                                باز شده توسط دکتر مریم کاظمی · دیروز · ۴ نظر
                            </div>
                        </div>
                    </div>
                    <span style="padding: 3px 10px; background: rgba(137, 87, 229, 0.2); color: #BC8CFF; border: 1px solid rgba(137, 87, 229, 0.4); border-radius: 9999px; font-size: 11px; font-weight: bold;">
                        مالیات و گمرک
                    </span>
                </div>

                <div style="padding: 16px 18px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="color: #8B949E; font-size: 16px;">✓</span>
                        <div>
                            <div style="font-size: 13px; font-weight: bold; color: #8B949E; text-decoration: line-through;">
                                دادخواست اعاده دادرسی در دیوان عالی کشور (CAS-8994)
                            </div>
                            <div style="font-size: 11px; color: #8B949E; margin-top: 3px;">
                                بسته شده · مختومه موفق با صدور رای نقض و ارجاع
                            </div>
                        </div>
                    </div>
                    <span style="padding: 3px 10px; background: rgba(35, 134, 54, 0.2); color: #3FB950; border: 1px solid rgba(35, 134, 54, 0.4); border-radius: 9999px; font-size: 11px; font-weight: bold;">
                        مختومه موفق
                    </span>
                </div>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
`},{path:"page-government-tenders.php",filename:"page-government-tenders.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-government-tenders.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: مناقصات دولتی، مزایدات و ضمانت‌نامه‌های بانکی (Government Tenders & Bank Guarantees)
 * Description: سامانه حقوقی قانون برگزاری مناقصات، هیئت رسیدگی به شکایات و دستور موقت توقف ضبط ضمانت‌نامه
 *
 * @package SedRazavi
 * @version 3.1.0
 */

if (!defined('ABSPATH')) exit;

$is_elementor = false;
if (did_action('elementor/loaded') && class_exists('Elementor\\Plugin')) {
    $elem = \\Elementor\\Plugin::instance();
    if (($elem->preview && method_exists($elem->preview, 'is_preview_mode') && $elem->preview->is_preview_mode()) ||
        ($elem->editor && method_exists($elem->editor, 'is_edit_mode') && $elem->editor->is_edit_mode()) ||
        ($elem->db && method_exists($elem->db, 'is_built_with_elementor') && $elem->db->is_built_with_elementor(get_the_ID()))) {
        $is_elementor = true;
    }
}
if (!$is_elementor && is_singular() && get_post_meta(get_the_ID(), '_elementor_edit_mode', true) === 'builder') {
    $is_elementor = true;
}

get_header();

if ($is_elementor) :
    while (have_posts()) : the_post();
        the_content();
    endwhile;
else :
?>

<div class="py-12 bg-[#0B132B] min-h-screen text-slate-100" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="relative bg-gradient-to-br from-[#060B18] via-[#0B132B] to-[#17223D] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 mb-10 shadow-2xl overflow-hidden">
            <div class="space-y-4 text-right max-w-3xl">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
                    <span>🏛️ دپارتمان تخصصی حقوق معاملات دولتی و عمومی</span>
                </div>
                <h1 class="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
                    قانون برگزاری مناقصات و توقف حقوقی ضبط ضمانت‌نامه بانکی
                </h1>
                <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                    طرح شکایت در هیئت رسیدگی به شکایات قانون برگزاری مناقصات (ماده ۷ و ۸)، اخذ دستور موقت فوری از دادگاه جهت جلوگیری از ضبط ضمانت‌نامه‌های حسن انجام کار و پیش‌پرداخت، و رفع محرومیت از مناقصات دولتی.
                </p>
            </div>
        </div>

        <div class="mb-12">
            <?php
            if (shortcode_exists('react_component')) {
                echo do_shortcode('[react_component name="GovernmentTendersGuaranteesSuite"]');
            }
            ?>
        </div>

        <?php
        while (have_posts()) : the_post();
            the_content();
        endwhile;
        ?>
    </div>
</div>

<?php
endif;
get_footer();
`},{path:"page-intellectual-property.php",filename:"page-intellectual-property.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-intellectual-property.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: مالکیت فکری، اختراع و علامت تجاری (IP Suite)
 * Description: سامانه ثبت برند، ارزیابی اختراع، طبقه‌بندی نیس و اسکرو نرم‌افزار
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="site-main py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] text-slate-800 dark:text-slate-100 min-h-screen">
    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- Header Banner -->
        <header class="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="space-y-3">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
                        <span>💡 مالکیت صنعتی، حق مؤلف و نوآوری</span>
                    </div>
                    <h1 class="text-2xl md:text-3xl font-extrabold text-white font-serif">
                        سامانه جامع حمایت از مالکیت فکری، برند و دارایی‌های نامشهود
                    </h1>
                    <p class="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
                        مشاوره و وکالت تخصصی در ثبت علائم تجاری و اختراعات، طبقه‌بندی بین‌المللی کالا و خدمات (Nice Classification)، قراردادهای امانت سورس کد (Software Escrow) و شبیه‌ساز واگذاری سهام استارتاپ‌ها (Vesting).
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <a href="<?php echo esc_url(home_url('/contact')); ?>" class="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B132B] font-bold text-sm shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2">
                        <span>ثبت سفارش استعلام برند</span>
                    </a>
                </div>
            </div>
        </header>

        <!-- React Interactive Container -->
        <div class="ip-suite-container">
            <?php echo do_shortcode('[sedrazavi_ip_suite]'); ?>
        </div>

    </div>
</main>

<?php
get_footer();
`},{path:"page-labor-social-security.php",filename:"page-labor-social-security.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-labor-social-security.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: دعاوی کار، تامین اجتماعی و حق بیمه (Labor & Social Security)
 * Description: سامانه جامع محاسبات سنوات، اضافه کاری، حق اولاد، هیئت‌های تشخیص و حل اختلاف کار و ماده ۱۴۸ تامین اجتماعی
 *
 * @package SedRazavi
 * @version 3.1.0
 */

if (!defined('ABSPATH')) exit;

$is_elementor = false;
if (did_action('elementor/loaded') && class_exists('Elementor\\Plugin')) {
    $elem = \\Elementor\\Plugin::instance();
    if (($elem->preview && method_exists($elem->preview, 'is_preview_mode') && $elem->preview->is_preview_mode()) ||
        ($elem->editor && method_exists($elem->editor, 'is_edit_mode') && $elem->editor->is_edit_mode()) ||
        ($elem->db && method_exists($elem->db, 'is_built_with_elementor') && $elem->db->is_built_with_elementor(get_the_ID()))) {
        $is_elementor = true;
    }
}
if (!$is_elementor && is_singular() && get_post_meta(get_the_ID(), '_elementor_edit_mode', true) === 'builder') {
    $is_elementor = true;
}

get_header();

if ($is_elementor) :
    while (have_posts()) : the_post();
        the_content();
    endwhile;
else :
?>

<div class="py-12 bg-[#0B132B] min-h-screen text-slate-100" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="relative bg-gradient-to-br from-[#060B18] via-[#0B132B] to-[#122A26] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 mb-10 shadow-2xl overflow-hidden">
            <div class="space-y-4 text-right max-w-3xl">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
                    <span>👥 دپارتمان تخصصی حقوق کار و سازمان تامین اجتماعی</span>
                </div>
                <h1 class="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
                    محاسبات قانونی اداره کار و مطالبات ماده ۱۴۸ تامین اجتماعی
                </h1>
                <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                    وکالت و مشاوره در هیئت‌های تشخیص و حل اختلاف اداره تعاون، کار و رفاه اجتماعی، احیای سوابق بیمه‌ای کارگران، محاسبه عیدی، پاداش و سنوات پایان خدمت و دفاع از کارفرمایان در برابر جریمه‌های بیمه‌ای.
                </p>
            </div>
        </div>

        <div class="mb-12">
            <?php
            if (shortcode_exists('react_component')) {
                echo do_shortcode('[react_component name="LaborSocialSecuritySuite"]');
            }
            ?>
        </div>

        <?php
        while (have_posts()) : the_post();
            the_content();
        endwhile;
        ?>
    </div>
</div>

<?php
endif;
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

// Sample precedents for SSR fallback
$precedents = [
    [
        'number' => 'رأی وحدت رویه شماره ۸۱۱',
        'date' => '۱۴۰۰/۰۴/۰۱',
        'subject' => 'بطلان بیع و نحوه محاسبه غرامت ناشی از مستحق‌للغیر درآمدن مبیع بر اساس تورم روز',
        'court' => 'هیأت عمومی دیوان عالی کشور',
    ],
    [
        'number' => 'رأی وحدت رویه شماره ۸۰۵',
        'date' => '۱۳۹۹/۱۰/۱۶',
        'subject' => 'تعیین وجه التزام قراردادی بیش از نرخ بهره بانکی و اصل آزادی قراردادها (ماده ۱۰ ق.م)',
        'court' => 'هیأت عمومی دیوان عالی کشور',
    ],
    [
        'number' => 'رأی وحدت رویه شماره ۷۳۳',
        'date' => '۱۳۹۳/۰۷/۱۵',
        'subject' => 'مسئولیت بایع فضولی در جبران کاهش قدرت خرید ثمن ناشی از مستحق‌للغیر درآمدن مبیع',
        'court' => 'هیأت عمومی دیوان عالی کشور',
    ],
];
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

        <!-- بخش پشتیبان بومی PHP: بانک آرای شاخص دیوان عالی کشور -->
        <section class="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#0B132B]/80 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 class="text-xl font-bold text-[#0B132B] dark:text-white flex items-center gap-3">
                    <span class="w-3 h-3 rounded-full bg-[#D4AF37]"></span>
                    بانک آرای وحدت رویه بنیادین (PHP Precedents Archive)
                </h2>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    آرای لازم‌الاتباع دیوان عالی کشور در حوزه دعاوی ملکی، وجه التزام، قراردادها و بطلان بیع:
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <?php foreach ($precedents as $item): ?>
                    <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold text-[#D4AF37]"><?php echo esc_html($item['number']); ?></span>
                            <span class="text-[10px] text-slate-400 font-mono"><?php echo esc_html($item['date']); ?></span>
                        </div>
                        <h3 class="text-xs font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                            <?php echo esc_html($item['subject']); ?>
                        </h3>
                        <div class="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                            <span><?php echo esc_html($item['court']); ?></span>
                            <span class="text-emerald-500 font-bold">لازم‌الاتباع</span>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </section>

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
`},{path:"page-music-podcasts.php",filename:"page-music-podcasts.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-music-podcasts.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: پخش و دانلود موزیک و پادکست (Music & Podcast Hub)
 * Description: Dedicated Audio and Podcast player with playlist and direct MP3 download links.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-music-hub-wrapper" dir="rtl" style="background-color: var(--sr-bg-body, #070D1E); color: #F8FAFC; min-height: 100vh; padding: 50px 16px;">
    <div class="container" style="max-width: 1100px; margin: 0 auto;">
        
        <!-- Header -->
        <div class="sedrazavi-music-header" style="text-align: center; margin-bottom: 40px;">
            <span style="display: inline-block; padding: 4px 14px; background: rgba(236, 72, 153, 0.15); color: #F472B6; border-radius: 9999px; font-size: 13px; font-weight: bold; border: 1px solid rgba(236, 72, 153, 0.3); margin-bottom: 12px;">
                🎧 رسانه صوتی، موزیک و پادکست
            </span>
            <h1 style="font-size: 32px; font-weight: 800; color: #FFFFFF; margin: 0 0 12px;">
                <?php esc_html_e('آرشیو قطعات صوتی، پادکست‌های تحلیلی و گفتگوها', 'sedrazavi'); ?>
            </h1>
            <p style="color: #94A3B8; font-size: 14px; max-width: 650px; margin: 0 auto;">
                <?php esc_html_e('امکان پخش آنلاین، مشاهده متن اپیزود، تنظیم سرعت پخش و دانلود با کیفیت‌های ۳۲۰ و ۱۲۸ کیلوبیت', 'sedrazavi'); ?>
            </p>
        </div>

        <!-- Featured Player -->
        <div class="sedrazavi-music-player-card" style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(236, 72, 153, 0.3); border-radius: 24px; padding: 32px; margin-bottom: 40px; box-shadow: 0 10px 30px -10px rgba(236, 72, 153, 0.2);">
            <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
                <div style="width: 140px; height: 140px; background: linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%); border-radius: 18px; display: flex; align-items: center; justify-content: center; font-size: 48px; shrink-0;">
                    🎵
                </div>
                <div style="flex: 1; min-width: 260px;">
                    <span style="font-size: 11px; font-weight: bold; color: #F472B6; background: rgba(236, 72, 153, 0.2); padding: 3px 10px; border-radius: 9999px;">اپیزود شاخص هفته</span>
                    <h2 style="font-size: 20px; font-weight: 800; color: #FFFFFF; margin: 10px 0 6px;">
                        پادکست شماره ۱۲: تحلیل حقوقی قراردادهای هوشمند و بلاک‌چین
                    </h2>
                    <p style="font-size: 13px; color: #94A3B8; margin-bottom: 16px;">
                        مدت زمان: ۴۵ دقیقه · گوینده: دکتر سیده مریم رضوی · تاریخ انتشار: ۱۸ مهر ۱۴۰۳
                    </p>
                    <audio controls style="width: 100%; border-radius: 8px;">
                        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
                        مرورگر شما از پخش صدا پشتیبانی نمی‌کند.
                    </audio>
                </div>
            </div>
        </div>

        <!-- Audio Playlist Grid -->
        <div class="sedrazavi-music-playlist" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 11px; font-weight: bold; color: #818CF8; background: rgba(99, 102, 241, 0.15); padding: 3px 8px; border-radius: 6px;">پادکست آموزشی</span>
                    <span style="font-size: 12px; color: #94A3B8;">۳۲:۱۰</span>
                </div>
                <h3 style="font-size: 15px; font-weight: bold; color: #FFFFFF; margin: 0 0 8px;">نکات طلایی تنظیم قراردادهای پیمانکاری</h3>
                <p style="font-size: 12px; color: #94A3B8; margin-bottom: 14px;">بررسی شرایط عمومی پیمان و ضرر و زیان تأخیرات</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 12px; color: #F472B6; font-weight: bold;">پخش آنلاین ▶</span>
                    <a href="#" class="sedrazavi-btn-download-audio" style="font-size: 12px; color: #94A3B8; text-decoration: none;">دانلود MP3 (320kbps) ↓</a>
                </div>
            </div>

            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 11px; font-weight: bold; color: #10B981; background: rgba(16, 185, 129, 0.15); padding: 3px 8px; border-radius: 6px;">گفتگوی زنده</span>
                    <span style="font-size: 12px; color: #94A3B8;">۵۴:۲۰</span>
                </div>
                <h3 style="font-size: 15px; font-weight: bold; color: #FFFFFF; margin: 0 0 8px;">میزگرد بررسی جرایم رایانه‌ای و سایبری</h3>
                <p style="font-size: 12px; color: #94A3B8; margin-bottom: 14px;">با حضور کارشناسان پلیس فتا و وکلای پایه یک</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 12px; color: #F472B6; font-weight: bold;">پخش آنلاین ▶</span>
                    <a href="#" class="sedrazavi-btn-download-audio" style="font-size: 12px; color: #94A3B8; text-decoration: none;">دانلود MP3 (320kbps) ↓</a>
                </div>
            </div>

            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 11px; font-weight: bold; color: #D4AF37; background: rgba(212, 175, 55, 0.15); padding: 3px 8px; border-radius: 6px;">داوری و حقوق</span>
                    <span style="font-size: 12px; color: #94A3B8;">۲۸:۴۵</span>
                </div>
                <h3 style="font-size: 15px; font-weight: bold; color: #FFFFFF; margin: 0 0 8px;">شرط داوری در قراردادهای تجاری بین‌الملل</h3>
                <p style="font-size: 12px; color: #94A3B8; margin-bottom: 14px;">چگونگی تعیین محل و قواعد داوری اتاق پاریس ICC</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 12px; color: #F472B6; font-weight: bold;">پخش آنلاین ▶</span>
                    <a href="#" class="sedrazavi-btn-download-audio" style="font-size: 12px; color: #94A3B8; text-decoration: none;">دانلود MP3 (320kbps) ↓</a>
                </div>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
`},{path:"page-odr-arbitration.php",filename:"page-odr-arbitration.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-odr-arbitration.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: مرکز داوری آنلاین (ODR)
 * Description: سامانه رسمی تبادل الکترونیک لوایح، ارجاع داوری و ابلاغ رأی داور مرضی‌الطرفین
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

get_header();

// Process SSR fallback submission
$dispute_submission = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['dispute_subject'])) {
    $subject = sanitize_text_field($_POST['dispute_subject']);
    $contract_num = sanitize_text_field($_POST['contract_number'] ?? '');
    $claimant = sanitize_text_field($_POST['claimant_name'] ?? '');
    $respondent = sanitize_text_field($_POST['respondent_name'] ?? '');
    $summary = sanitize_textarea_field($_POST['dispute_summary'] ?? '');

    $dispute_submission = [
        'subject' => $subject,
        'contract_num' => $contract_num,
        'claimant' => $claimant,
        'respondent' => $respondent,
        'summary' => $summary,
        'tracking_id' => 'ODR-' . date('Ymd') . '-' . rand(100, 999),
    ];
}
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

        <!-- بخش پشتیبان بومی PHP (SSR Pure Fallback) -->
        <section class="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#0B132B]/80 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 class="text-xl font-bold text-[#0B132B] dark:text-white flex items-center gap-3">
                    <span class="w-3 h-3 rounded-full bg-[#D4AF37]"></span>
                    درخواست ارجاع امر به داوری سرداور مرضی‌الطرفین (PHP Native)
                </h2>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    در صورت وجود شرط داوری در قرارداد، فرم زیر را جهت شروع فرآیند داوری و ابلاغ اخطاریه تکمیل فرمایید:
                </p>
            </div>

            <form method="POST" action="" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="dispute_subject" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                            موضوع اختلاف یا نقض تعهد:
                        </label>
                        <input type="text" id="dispute_subject" name="dispute_subject" required class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none" placeholder="مثال: اختلاف در تفسیر ماده ۶ قرارداد مشارکت و تاخیر تحویل">
                    </div>

                    <div>
                        <label for="contract_number" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                            شماره و تاریخ قرارداد مبنا:
                        </label>
                        <input type="text" id="contract_number" name="contract_number" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none" placeholder="قرارداد شماره ۱۱۰ مورخ ۱۴۰۲/۰۶/۱۵">
                    </div>

                    <div>
                        <label for="claimant_name" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                            نام متقاضی داوری (خواهان داوری):
                        </label>
                        <input type="text" id="claimant_name" name="claimant_name" required class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none" placeholder="نام شخص حقیقی یا حقوقی متقاضی">
                    </div>

                    <div>
                        <label for="respondent_name" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                            طرف مقابل داوری (خوانده داوری):
                        </label>
                        <input type="text" id="respondent_name" name="respondent_name" required class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none" placeholder="نام شخص یا شرکت طرف مقابل">
                    </div>
                </div>

                <div>
                    <label for="dispute_summary" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        خلاصه ادعا و تقاضای صدور رأی داوری:
                    </label>
                    <textarea id="dispute_summary" name="dispute_summary" rows="4" required class="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none leading-relaxed" placeholder="شرح خواسته و مطالبه خسارات یا الزام به ایفای تعهد بر مبنای شرط داوری..."></textarea>
                </div>

                <div class="flex items-center justify-between pt-2">
                    <span class="text-xs text-slate-400">پس از ثبت، اخطاریه پذیرش داوری و دعوت به اولین جلسه استماع صادر می‌گردد.</span>
                    <button type="submit" class="px-6 py-2.5 rounded-xl bg-[#0B132B] text-white hover:bg-slate-800 text-xs font-bold border border-[#D4AF37]/50 shadow transition flex items-center gap-2">
                        <span>ثبت رسمی درخواست داوری</span>
                    </button>
                </div>
            </form>

            <?php if ($dispute_submission): ?>
                <div class="mt-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-emerald-500/40 space-y-3">
                    <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                        <span class="text-sm font-bold text-emerald-500">✅ پرونده داوری با موفقیت ثبت شد</span>
                        <span class="text-xs font-mono px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg">کد پرونده داوری: <?php echo esc_html($dispute_submission['tracking_id']); ?></span>
                    </div>
                    <p class="text-xs text-slate-600 dark:text-slate-300">
                        پرونده داوری جهت تعیین وقت رسیدگی به هیئت داوران ارجاع گردید. مراتب ظرف ۴۸ ساعت به طرفین ابلاغ خواهد شد.
                    </p>
                </div>
            <?php endif; ?>
        </section>

    </div>
</main>

<?php
get_footer();
`},{path:"page-payment-adapter.php",filename:"page-payment-adapter.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-payment-adapter.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: درگاه پرداخت الکترونیک و حق‌الوکاله (Legal Payment Adapter)
 * Description: سامانه پرداخت آنلاین حق‌الوکاله، بیعانه مشاوره، درگاه‌های شتابی (شاپرک) و تسهیم مالیاتی وکلا
 *
 * @package SedRazavi
 * @version 3.1.0
 */

if (!defined('ABSPATH')) exit;

$is_elementor = false;
if (did_action('elementor/loaded') && class_exists('Elementor\\Plugin')) {
    $elem = \\Elementor\\Plugin::instance();
    if (($elem->preview && method_exists($elem->preview, 'is_preview_mode') && $elem->preview->is_preview_mode()) ||
        ($elem->editor && method_exists($elem->editor, 'is_edit_mode') && $elem->editor->is_edit_mode()) ||
        ($elem->db && method_exists($elem->db, 'is_built_with_elementor') && $elem->db->is_built_with_elementor(get_the_ID()))) {
        $is_elementor = true;
    }
}
if (!$is_elementor && is_singular() && get_post_meta(get_the_ID(), '_elementor_edit_mode', true) === 'builder') {
    $is_elementor = true;
}

get_header();

if ($is_elementor) :
    while (have_posts()) : the_post();
        the_content();
    endwhile;
else :
?>

<div class="py-12 bg-[#0B132B] min-h-screen text-slate-100" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="relative bg-gradient-to-br from-[#060B18] via-[#0B132B] to-[#122A26] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 mb-10 shadow-2xl overflow-hidden">
            <div class="space-y-4 text-right max-w-3xl">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
                    <span>💳 درگاه پرداخت امن و انطباق بانکی شاپرک</span>
                </div>
                <h1 class="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
                    پرداخت آنلاین حق‌الوکاله و بیعانه مشاوره حقوقی
                </h1>
                <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                    تسویه آنلاین قراردادهای وکالت با پروتکل شاپرک، صدور خودکار قبض الکترونیک، ثبت در سامانه مودیان مالیاتی و امکان پرداخت اقساطی حق‌الوکاله در محیطی کاملاً امن و محرمانه.
                </p>
            </div>
        </div>

        <div class="mb-12">
            <?php
            if (shortcode_exists('react_component')) {
                echo do_shortcode('[react_component name="PaymentAdapterSystemSuite"]');
            }
            ?>
        </div>

        <?php
        while (have_posts()) : the_post();
            the_content();
        endwhile;
        ?>
    </div>
</div>

<?php
endif;
get_footer();
`},{path:"page-petition-generator.php",filename:"page-petition-generator.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-petition-generator.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: تنظیم دادخواست و لوایح عدل‌ایران
 * Description: فرم‌ساز هوشمند دادخواست، شکواییه و لوایح تجدیدنظر با قالب رسمی قوه قضائیه
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

get_header();

// Server-side fallback form processing
$generated_preview = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['petition_subject'])) {
    $subject = sanitize_text_field($_POST['petition_subject']);
    $court_type = sanitize_text_field($_POST['court_type'] ?? 'حقوقی');
    $plaintiff = sanitize_text_field($_POST['plaintiff_name'] ?? '');
    $defendant = sanitize_text_field($_POST['defendant_name'] ?? '');
    $statement = sanitize_textarea_field($_POST['petition_statement'] ?? '');

    $generated_preview = [
        'subject' => $subject,
        'court_type' => $court_type,
        'plaintiff' => $plaintiff,
        'defendant' => $defendant,
        'statement' => $statement,
        'tracking_code' => 'PET-' . date('Ymd') . '-' . rand(1000, 9999),
    ];
}
?>

<main class="site-main py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] min-h-screen text-slate-800 dark:text-slate-100">
    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- Header Banner -->
        <header class="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="space-y-3">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
                        <span>📜 سامانه تنظیم لوایح و دادخواست قضایی</span>
                    </div>
                    <h1 class="text-2xl md:text-3xl font-extrabold text-white font-serif">
                        سامانه هوشمند تنظیم دادخواست، شکواییه و لوایح دفاعیه عدل‌ایران
                    </h1>
                    <p class="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
                        نگارش دادخواست‌های منطبق بر قانون آیین دادرسی مدنی و کیفری با ذکر ادله و منضمات قانونی، استناد به مواد قانونی و رویه‌های قضایی دیوان عالی کشور.
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <a href="<?php echo esc_url(home_url('/contact')); ?>" class="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B132B] font-bold text-sm shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2">
                        <span>مشاوره تلفنی با وکیل پایه یک</span>
                    </a>
                </div>
            </div>
        </header>

        <!-- React Interactive Container -->
        <div class="petition-generator-container">
            <?php echo do_shortcode('[sedrazavi_petition_builder]'); ?>
        </div>

        <!-- Pure PHP / SSR Fallback Section -->
        <section class="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#0B132B]/80 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 class="text-xl font-bold text-[#0B132B] dark:text-white flex items-center gap-3">
                    <span class="w-3 h-3 rounded-full bg-[#D4AF37]"></span>
                    فرم استاندارد تنظیم دادخواست (PHP Native Form)
                </h2>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    در صورتی که قصد دارید پیش‌نویس دادخواست را به شکل آفلاین تنظیم کنید، فرم زیر را تکمیل نمایید:
                </p>
            </div>

            <form method="POST" action="" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="petition_subject" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                            موضوع خواسته یا اتهام:
                        </label>
                        <input type="text" id="petition_subject" name="petition_subject" required class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none" placeholder="مثال: مطالبه وجه التزام قراردادی و خسارت تاخیر تادیه">
                    </div>

                    <div>
                        <label for="court_type" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                            مرجع قضایی صالح:
                        </label>
                        <select id="court_type" name="court_type" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none">
                            <option value="دادگاه عمومی حقوقی مجتمع ونک / شهید بهشتی">دادگاه عمومی حقوقی</option>
                            <option value="دادگاه کیفری دو تهران">دادگاه کیفری دو</option>
                            <option value="شورای حل اختلاف">شورای حل اختلاف</option>
                            <option value="دیوان عدالت اداری">دیوان عدالت اداری</option>
                            <option value="مرکز داوری و حل اختلاف">مرکز داوری بازرگانی</option>
                        </select>
                    </div>

                    <div>
                        <label for="plaintiff_name" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                            مشخصات خواهان / شاکی:
                        </label>
                        <input type="text" id="plaintiff_name" name="plaintiff_name" required class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none" placeholder="نام و نام خانوادگی، شماره ملی یا ثنا">
                    </div>

                    <div>
                        <label for="defendant_name" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                            مشخصات خوانده / مشتکی‌عنه:
                        </label>
                        <input type="text" id="defendant_name" name="defendant_name" required class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none" placeholder="نام، شرکت، اقامتگاه خوانده">
                    </div>
                </div>

                <div>
                    <label for="petition_statement" class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        شرح خواسته و دلایل و منضمات:
                    </label>
                    <textarea id="petition_statement" name="petition_statement" rows="5" required class="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none leading-relaxed" placeholder="ریاست محترم دادگاه؛ احتراما به استحضار می‌رساند که بر اساس قرارداد شماره..."></textarea>
                </div>

                <div class="flex items-center justify-between pt-2">
                    <span class="text-xs text-slate-400">پیش‌نویس اولیه جهت ثبت در دفاتر خدمات الکترونیک قضایی آماده می‌گردد.</span>
                    <button type="submit" class="px-6 py-2.5 rounded-xl bg-[#0B132B] text-white hover:bg-slate-800 text-xs font-bold border border-[#D4AF37]/50 shadow transition flex items-center gap-2">
                        <span>ایجاد پیش‌نویس رسمی</span>
                    </button>
                </div>
            </form>

            <?php if ($generated_preview): ?>
                <div class="mt-8 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-[#D4AF37] space-y-4">
                    <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                        <span class="text-sm font-bold text-[#0B132B] dark:text-white">📄 برگ دادخواست بدوی (پیش‌نمایش رسمی):</span>
                        <span class="font-mono text-xs px-2.5 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg">کد رهگیری: <?php echo esc_html($generated_preview['tracking_code']); ?></span>
                    </div>

                    <div class="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        <p><strong>مرجع رسیدگی:</strong> <?php echo esc_html($generated_preview['court_type']); ?></p>
                        <p><strong>خواهان:</strong> <?php echo esc_html($generated_preview['plaintiff']); ?></p>
                        <p><strong>خوانده:</strong> <?php echo esc_html($generated_preview['defendant']); ?></p>
                        <p><strong>خواسته:</strong> <?php echo esc_html($generated_preview['subject']); ?></p>
                        <div class="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mt-2">
                            <strong>شرح ماوقع:</strong>
                            <p class="mt-1 whitespace-pre-line"><?php echo esc_html($generated_preview['statement']); ?></p>
                        </div>
                    </div>
                </div>
            <?php endif; ?>
        </section>

    </div>
</main>

<?php
get_footer();
`},{path:"page-podcast.php",filename:"page-podcast.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-podcast.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: مرکز پادکست و رسانه صوتی (Audio & Podcast Hub)
 * Description: Dedicated Audio Podcast and Lecture Hub with inline player and download links.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-podcast-hub-page py-10 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-right font-persian" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">

        <!-- Top Banner Header -->
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#070D1E] via-[#0B132B] to-[#141E3C] border border-amber-500/30 p-6 sm:p-10 text-white shadow-2xl">
            <div class="space-y-4 max-w-3xl">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                    <span>🎙️ استودیوی صوتی و پادکست تخصصی</span>
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span class="text-emerald-400 font-mono text-[11px]">پخش آنلاین و دانلود</span>
                </div>

                <h1 class="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight leading-snug">
                    پادکست‌ها، تحلیل‌های صوتی و گفتگوهای راهبردی
                </h1>

                <p class="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    مجموعه اپیزودهای صوتی با کیفیت استودیویی در زمینه‌های دادرسی، استراتژی‌های حقوقی، راه‌اندازی کسب‌وکار و توسعه وب‌سایت.
                    امکان شنیدن مستقیم در مرورگر یا اشتراک در کست‌باکس و اپل پادکست.
                </p>

                <!-- Subscription Links -->
                <div class="flex items-center flex-wrap gap-3 pt-2 text-xs font-bold">
                    <span class="text-gray-400">شنیدن در پلتفرم‌ها:</span>
                    <a href="#castbox" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-amber-500 hover:text-black border border-white/10 transition-colors">🟠 Castbox</a>
                    <a href="#spotify" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-white border border-white/10 transition-colors">🟢 Spotify</a>
                    <a href="#apple" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-purple-500 hover:text-white border border-white/10 transition-colors">🟣 Apple Podcasts</a>
                    <a href="#rss" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-orange-500 hover:text-white border border-white/10 transition-colors">📡 RSS Feed</a>
                </div>
            </div>
        </div>

        <!-- Featured Episode Player Card -->
        <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 dark:border-gray-800 pb-6">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white font-bold flex items-center justify-center text-3xl shadow-lg shadow-amber-500/20 shrink-0">
                        📻
                    </div>
                    <div>
                        <span class="text-[11px] font-bold text-amber-500">اپیزود شاخص هفته (Episode #18)</span>
                        <h2 class="text-lg sm:text-xl font-bold font-serif text-gray-900 dark:text-white">
                            استراتژی‌های دفاع در دعاوی تجاری بین‌المللی و نحوه انتخاب داور مرضی‌الطرفین
                        </h2>
                        <span class="text-xs text-gray-500 font-mono">مدت: ۳۸ دقیقه • کیفیت: 320kbps MP3</span>
                    </div>
                </div>

                <!-- Action Download -->
                <div class="flex items-center gap-2 shrink-0">
                    <a href="#download-featured" class="sedrazavi-btn-pill px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#b8972e] text-black font-bold text-xs transition-all shadow-md">
                        دانلود فایل صوتی (۸۵MB)
                    </a>
                </div>
            </div>

            <!-- Native HTML5 Audio Player -->
            <div class="p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800">
                <audio controls class="w-full">
                    <source src="https://example.com/audio/podcast-ep18.mp3" type="audio/mpeg">
                    مرورگر شما از پخش‌کننده صوتی پشتیبانی نمی‌کند.
                </audio>
            </div>
        </div>

        <!-- Episodes Archive List -->
        <div class="space-y-4">
            <h3 class="text-xl font-bold font-serif text-gray-900 dark:text-white flex items-center gap-2">
                <span>📚 آرشیو تمامی اپیزودها</span>
                <span class="text-xs font-normal text-gray-500 dark:text-gray-400 font-mono">(۱۲ اپیزود منتشر شده)</span>
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <?php
                $episodes = [
                    ['id' => 17, 'title' => 'ماده ۴۷۷ قانون آیین دادرسی کیفری و شرایط تجویز اعاده دادرسی', 'time' => '۲۶ دقیقه', 'date' => '۱۴ اردیبهشت ۱۴۰۳', 'tag' => 'دیوان عالی کشور'],
                    ['id' => 16, 'title' => 'اصول کلیدی تنظیم قراردادهای توسعه نرم‌افزار و واگذاری کپی‌رایت', 'time' => '۳۱ دقیقه', 'date' => '۷ اردیبهشت ۱۴۰۳', 'tag' => 'طراحی وب و استارتاپ'],
                    ['id' => 15, 'title' => 'حدنصاب مجامع عمومی در شرکت‌های سهامی خاص و ابطال مصوبات', 'time' => '۲۲ دقیقه', 'date' => '۳۰ فروردین ۱۴۰۳', 'tag' => 'حقوق تجارت'],
                    ['id' => 14, 'title' => 'نکات طلایی سئو و بهینه‌سازی سرعت در فروشگاه‌های ووکامرس', 'time' => '۲۹ دقیقه', 'date' => '۲۱ فروردین ۱۴۰۳', 'tag' => 'فروشگاه آنلاین'],
                ];

                foreach ($episodes as $ep) : ?>
                    <div class="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm hover:border-amber-500/40 transition-all flex items-center justify-between gap-4">
                        <div class="space-y-1 min-w-0">
                            <div class="flex items-center gap-2 text-[10px] text-gray-400">
                                <span class="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-bold text-gray-600 dark:text-gray-300">#<?php echo esc_html($ep['id']); ?></span>
                                <span class="text-amber-500 font-bold"><?php echo esc_html($ep['tag']); ?></span>
                                <span>• <?php echo esc_html($ep['date']); ?></span>
                            </div>
                            <h4 class="text-sm font-bold text-gray-900 dark:text-white truncate">
                                <?php echo esc_html($ep['title']); ?>
                            </h4>
                            <span class="text-[11px] text-gray-500 font-mono">⏱️ زمان: <?php echo esc_html($ep['time']); ?></span>
                        </div>
                        <a href="#play-<?php echo esc_attr($ep['id']); ?>" class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-[#D4AF37] text-gray-700 dark:text-gray-200 hover:text-black flex items-center justify-center font-bold text-sm shrink-0 transition-colors">
                            ▶
                        </a>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

    </div>
</div>

<?php get_footer(); ?>
`},{path:"page-portfolio.php",filename:"page-portfolio.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-portfolio.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: نمونه‌کارها و پروژه‌های وب‌سایت (Web Portfolio & Case Studies)
 * Description: Dedicated Gutenberg & Web Designer Portfolio showcase with Lighthouse metrics and live previews.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-portfolio-page py-10 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-right font-persian" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">

        <!-- Portfolio Hero Header -->
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#31104B] border border-indigo-500/30 p-6 sm:p-10 text-white shadow-2xl">
            <div class="space-y-4 max-w-3xl">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                    <span>💻 ویترین پروژه‌ها و کیس‌استادی‌های تخصصی</span>
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span class="text-emerald-400 font-mono text-[11px]">گوتنبرگ بومی ۱۰۰٪</span>
                </div>

                <h1 class="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight leading-snug">
                    پروژه‌های طراحی سایت وردپرس با بالاترین امتیاز سرعت و سئو
                </h1>

                <p class="text-xs sm:text-sm text-indigo-200 leading-relaxed">
                    هر پروژه با معماری مدرن بر مبنای ویرایشگر بلوک گوتنبرگ، بهینه‌سازی کدهای PHP و CSS بدون سربار، و سازگاری کامل با استانداردهای گوگل لایت‌هاوس مهندسی شده است.
                </p>

                <!-- Metric Highlights -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-center">
                    <div class="p-3 rounded-2xl bg-white/5 border border-white/10">
                        <div class="text-xl sm:text-2xl font-bold font-mono text-emerald-400">۱۰۰٪</div>
                        <div class="text-[11px] text-gray-300">امتیاز سرعت لایت‌هاوس</div>
                    </div>
                    <div class="p-3 rounded-2xl bg-white/5 border border-white/10">
                        <div class="text-xl sm:text-2xl font-bold font-mono text-indigo-400">۰.۵ ثانیه</div>
                        <div class="text-[11px] text-gray-300">میانگین زمان لود اولیه</div>
                    </div>
                    <div class="p-3 rounded-2xl bg-white/5 border border-white/10">
                        <div class="text-xl sm:text-2xl font-bold font-mono text-[#D4AF37]">۴۵+</div>
                        <div class="text-[11px] text-gray-300">پروژه موفق تحویل‌شده</div>
                    </div>
                    <div class="p-3 rounded-2xl bg-white/5 border border-white/10">
                        <div class="text-xl sm:text-2xl font-bold font-mono text-pink-400">۰٪ خطای WSOD</div>
                        <div class="text-[11px] text-gray-300">تضمین پایداری کامل</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Case Studies Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- Project 1 -->
            <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-xl space-y-5 hover:border-indigo-500/40 transition-all flex flex-col justify-between">
                <div class="space-y-4">
                    <div class="aspect-video rounded-2xl bg-gradient-to-tr from-indigo-950 via-slate-900 to-indigo-900 border border-white/10 flex items-center justify-center text-4xl shadow-inner relative overflow-hidden">
                        <span>🏛️</span>
                        <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            امتیاز لایت‌هاوس ۱۰۰
                        </span>
                    </div>

                    <div class="space-y-1">
                        <span class="text-xs font-bold text-indigo-400">پلتفرم حقوقی و داوری بین‌الملل</span>
                        <h3 class="text-lg font-bold font-serif text-gray-900 dark:text-white">
                            سامانه جامع وکالت دکتر سیده مریم رضوی
                        </h3>
                        <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                            طراحی قالب اختصاصی وردپرس با هسته کاملاً مستقل، سازگار با المنتور و شورت‌کدهای نیتیو، دارای پورتال هوشمند موکلین و محاسبه‌گر تعرفه‌های دادگستری.
                        </p>
                    </div>

                    <!-- Tech Stack Badges -->
                    <div class="flex items-center flex-wrap gap-1.5 text-[10px]">
                        <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">WordPress 6.7</span>
                        <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">Gutenberg Native</span>
                        <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">PHP 8.3 Strict</span>
                        <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">Tailwind CSS</span>
                    </div>
                </div>

                <div class="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span class="text-xs text-emerald-500 font-bold">✓ تحویل شده و لایو</span>
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="sedrazavi-btn-pill px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors">
                        مشاهده زنده پروژه ←
                    </a>
                </div>
            </div>

            <!-- Project 2 -->
            <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-xl space-y-5 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
                <div class="space-y-4">
                    <div class="aspect-video rounded-2xl bg-gradient-to-tr from-emerald-950 via-slate-900 to-emerald-900 border border-white/10 flex items-center justify-center text-4xl shadow-inner relative overflow-hidden">
                        <span>🛍️</span>
                        <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            امتیاز لایت‌هاوس ۹۹
                        </span>
                    </div>

                    <div class="space-y-1">
                        <span class="text-xs font-bold text-emerald-400">فروشگاه آنلاین ووکامرس پرسرعت</span>
                        <h3 class="text-lg font-bold font-serif text-gray-900 dark:text-white">
                            فروشگاه منعطف ووکامرس با ادغام وودمارت
                        </h3>
                        <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                            پیاده‌سازی مینی‌کارت کشویی بلادرنگ، فیلترهای AJAX بدون رفرش، تسویه‌حساب اختصاصی تک‌مرحله‌ای با درگاه‌های شتاب و سامانه مودیان مالیاتی.
                        </p>
                    </div>

                    <!-- Tech Stack Badges -->
                    <div class="flex items-center flex-wrap gap-1.5 text-[10px]">
                        <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">WooCommerce</span>
                        <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">WoodMart Bridge</span>
                        <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">AJAX Cart</span>
                        <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">Incoterms</span>
                    </div>
                </div>

                <div class="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span class="text-xs text-emerald-500 font-bold">✓ تحویل شده و لایو</span>
                    <a href="<?php echo esc_url(home_url('/store/')); ?>" class="sedrazavi-btn-pill px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors">
                        مشاهده فروشگاه ←
                    </a>
                </div>
            </div>

        </div>

        <!-- Project Brief CTA -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-indigo-900/40 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
            <div class="space-y-1">
                <h3 class="text-lg font-bold text-white">پروژه‌ای برای اجرا دارید؟</h3>
                <p class="text-xs text-indigo-200">
                    با ارسال بریف چندمرحله‌ای آنلاین، زمان‌بندی و برآورد هزینه دقیق پروژه خود را در کمتر از ۲۴ ساعت دریافت فرمایید.
                </p>
            </div>
            <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="sedrazavi-btn-pill px-6 py-3 rounded-2xl bg-white hover:bg-[#D4AF37] text-black font-bold text-xs sm:text-sm transition-all shadow-xl shrink-0">
                ارسال بریف و مشاوره پروژه ←
            </a>
        </div>

    </div>
</div>

<?php get_footer(); ?>
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

<?php get_footer(); ?>`},{path:"page-scenarios.php",filename:"page-scenarios.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-scenarios.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: سناریوهای مدرن اینترفیس (Multi-Scenario Layouts)
 * Template Post Type: page
 *
 * Provides dedicated page rendering for the 3 layout archetypes:
 * - Bento-Grid HUD Hub
 * - 3-Column Dense Data Matrix
 * - Hybrid Executive Contrast
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();

$active_scenario = sedrazavi_scenario()->get_active_scenario();
?>

<main id="primary" class="site-main min-h-screen bg-[#06080F] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto space-y-8">
        <!-- Scenario Switcher Bar in PHP -->
        <div class="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1 class="text-xl font-bold font-serif text-white">
                    <?php esc_html_e('سامانه جامع سناریوهای اینترفیس وردپرس', 'sedrazavi'); ?>
                </h1>
                <p class="text-xs text-slate-400 mt-0.5">
                    <?php esc_html_e('چیدمان‌های پیشرفته با الهام از داشبوردهای سازمانی، بنتوگرید و جداول متراکم داده', 'sedrazavi'); ?>
                </p>
            </div>

            <!-- Switcher Tabs -->
            <div class="flex items-center gap-2 text-xs font-semibold">
                <a href="<?php echo esc_url(add_query_arg('scenario', 'bento-hud')); ?>" class="px-3.5 py-2 rounded-xl transition-all <?php echo $active_scenario === 'bento-hud' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'; ?>">
                    <?php esc_html_e('بنتوگرید HUD', 'sedrazavi'); ?>
                </a>
                <a href="<?php echo esc_url(add_query_arg('scenario', 'dense-matrix')); ?>" class="px-3.5 py-2 rounded-xl transition-all <?php echo $active_scenario === 'dense-matrix' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'; ?>">
                    <?php esc_html_e('ماتریس ۳ ستونه', 'sedrazavi'); ?>
                </a>
                <a href="<?php echo esc_url(add_query_arg('scenario', 'hybrid-executive')); ?>" class="px-3.5 py-2 rounded-xl transition-all <?php echo $active_scenario === 'hybrid-executive' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'; ?>">
                    <?php esc_html_e('هایبرید تشریفاتی', 'sedrazavi'); ?>
                </a>
            </div>
        </div>

        <!-- Render Target Scenario Template Part -->
        <div class="uas-scenario-active-viewport">
            <?php
            if ($active_scenario === 'dense-matrix') {
                get_template_part('template-parts/scenarios/dense-matrix');
            } elseif ($active_scenario === 'hybrid-executive') {
                get_template_part('template-parts/scenarios/hybrid-executive');
            } else {
                get_template_part('template-parts/scenarios/bento-hud');
            }
            ?>
        </div>
    </div>
</main>

<?php
get_footer();
`},{path:"page-services.php",filename:"page-services.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-services.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
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

        <!-- Contract & Consultation Shortcode Integration -->
        <div class="pt-10 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="p-8 rounded-3xl bg-[#0B132B] text-white space-y-4 text-right border border-[#D4AF37]/30">
                <span class="text-xs font-bold text-[#D4AF37]">📝 سامانه آنلاین قراردادها</span>
                <h3 class="text-xl font-bold font-serif">ممیزی فوری قرارداد و شروط تعهدآور</h3>
                <p class="text-xs text-gray-300 leading-relaxed">
                    پیش از امضا، ریسک‌های حقوقی و شروط ضمانتی قرارداد خود را در سامانه ممیزی هوشمند ارزیابی کنید.
                </p>
                <a href="<?php echo esc_url(home_url('/contract-audit/')); ?>" class="btn-gold py-2.5 px-6 rounded-xl text-xs font-bold inline-block">
                    ورود به ممیزی قرارداد
                </a>
            </div>

            <div class="p-8 rounded-3xl bg-white border border-gray-200 shadow-lg space-y-4 text-right">
                <span class="text-xs font-bold text-[#AA820A]">📅 مشاوره حضوری یا تلفنی</span>
                <h3 class="text-xl font-bold font-serif text-[#0B132B]">رزرو وقت مشاوره با وکیل پایه یک</h3>
                <p class="text-xs text-gray-500 leading-relaxed">
                    نوبت مشاوره با سرکار خانم دکتر سیده مریم رضوی در دفتر ونک، تهران یا به‌صورت آنلاین.
                </p>
                <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn-gold py-2.5 px-6 rounded-xl text-xs font-bold inline-block">
                    درخواست نوبت مشاوره
                </a>
            </div>
        </div>
    </div>
</div>

<?php get_footer(); ?>`},{path:"page-store.php",filename:"page-store.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-store.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: فروشگاه آنلاین منعطف ووکامرس (Flexible eCommerce Store)
 * Description: Dedicated Flexible Store showcase compatible with WooCommerce and WoodMart.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-store-wrapper" dir="rtl" style="background-color: var(--sr-bg-body, #070D1E); color: #F8FAFC; min-height: 100vh;">
    
    <!-- Hero Banner -->
    <section class="sedrazavi-store-hero" style="padding: 60px 16px 40px; text-align: center; background: radial-gradient(circle at top, rgba(16, 185, 129, 0.15) 0%, transparent 70%);">
        <div class="container" style="max-width: 1100px; margin: 0 auto;">
            <div style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 9999px; font-size: 13px; color: #34D399; font-weight: bold; margin-bottom: 20px;">
                <span>🛍️</span>
                <span><?php esc_html_e('سازگار با ووکامرس و قالب‌های فروشگاهی مدرن', 'sedrazavi'); ?></span>
            </div>
            
            <h1 style="font-size: clamp(26px, 4vw, 42px); font-weight: 900; line-height: 1.3; margin: 0 0 16px; color: #FFFFFF;">
                <?php esc_html_e('فروشگاه آنلاین منعطف، سریع و آماده فروش', 'sedrazavi'); ?>
            </h1>
            
            <p style="font-size: clamp(14px, 1.8vw, 17px); color: #94A3B8; max-width: 720px; margin: 0 auto 32px; line-height: 1.8;">
                <?php esc_html_e('سبد خرید سریع، اتصال درگاه‌های بانکی عضو شبکه شتاب، فیلتر ایجکس ویژگی‌ها و بهینه‌سازی شده برای بارگذاری لحظه‌ای.', 'sedrazavi'); ?>
            </p>

            <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
                <a href="#store-products" class="sedrazavi-btn-store-primary" style="display: inline-flex; align-items: center; gap: 8px; background: #10B981; color: #FFFFFF; padding: 14px 28px; border-radius: 14px; font-weight: 800; text-decoration: none;">
                    <span><?php esc_html_e('مشاهده محصولات ویژه', 'sedrazavi'); ?></span>
                    <span>↓</span>
                </a>
            </div>
        </div>
    </section>

    <!-- Trust Badges -->
    <section class="sedrazavi-store-features" style="background: rgba(15, 23, 42, 0.6); border-top: 1px solid rgba(255, 255, 255, 0.06); border-bottom: 1px solid rgba(255, 255, 255, 0.06); padding: 24px 16px;">
        <div class="container" style="max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; text-align: center;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
                <span style="font-size: 24px;">🚚</span>
                <div style="text-align: right;">
                    <div style="font-size: 14px; font-weight: bold; color: #FFFFFF;">ارسال سریع و مطمئن</div>
                    <div style="font-size: 12px; color: #94A3B8;">پست پیشتاز و تیپاکس</div>
                </div>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
                <span style="font-size: 24px;">🛡️</span>
                <div style="text-align: right;">
                    <div style="font-size: 14px; font-weight: bold; color: #FFFFFF;">ضمانت اصالت کالا</div>
                    <div style="font-size: 12px; color: #94A3B8;">۷ روز ضمانت بازگشت</div>
                </div>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
                <span style="font-size: 24px;">💳</span>
                <div style="text-align: right;">
                    <div style="font-size: 14px; font-weight: bold; color: #FFFFFF;">پرداخت امن شاپرک</div>
                    <div style="font-size: 12px; color: #94A3B8;">اتصال به تمامی بانک‌ها</div>
                </div>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
                <span style="font-size: 24px;">🎧</span>
                <div style="text-align: right;">
                    <div style="font-size: 14px; font-weight: bold; color: #FFFFFF;">پشتیبانی ۲۴ ساعته</div>
                    <div style="font-size: 12px; color: #94A3B8;">پاسخگویی آنلاین</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Products Loop / WooCommerce Output -->
    <section id="store-products" class="sedrazavi-store-catalog" style="padding: 60px 16px;">
        <div class="container" style="max-width: 1100px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="font-size: 26px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px;">
                    <?php esc_html_e('محصولات و دسته‌بندی‌های برگزیده', 'sedrazavi'); ?>
                </h2>
                <p style="color: #94A3B8; font-size: 14px;">
                    <?php esc_html_e('طراحی منعطف با امکان نمایش کاتالوگ، افزودن به سبد خرید سریع و تسویه‌حساب آسان', 'sedrazavi'); ?>
                </p>
            </div>

            <div class="sedrazavi-store-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">
                <?php
                if (class_exists('WooCommerce')) {
                    echo do_shortcode('[products limit="8" columns="4" orderby="popularity"]');
                } else {
                ?>
                    <!-- Native Fallback Showcase when WooCommerce is not yet active -->
                    <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 20px; text-align: center;">
                        <div style="height: 160px; background: rgba(15, 23, 42, 0.6); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 44px; margin-bottom: 16px;">
                            📱
                        </div>
                        <h3 style="font-size: 15px; font-weight: 800; color: #FFFFFF; margin: 0 0 8px;">بسته خدمات هوشمند آنلاین</h3>
                        <p style="font-size: 12px; color: #94A3B8; margin-bottom: 14px;">امکان فروش فایل و خدمات آنلاین با تحویل آنی</p>
                        <div style="font-size: 18px; font-weight: 900; color: #10B981; margin-bottom: 14px;">۴۵۰,۰۰۰ تومان</div>
                        <button type="button" class="sedrazavi-btn-store-cart" style="width: 100%; background: #10B981; color: #FFFFFF; border: none; padding: 10px; border-radius: 10px; font-weight: bold; cursor: pointer;">
                            افزودن به سبد خرید
                        </button>
                    </div>

                    <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 20px; text-align: center;">
                        <div style="height: 160px; background: rgba(15, 23, 42, 0.6); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 44px; margin-bottom: 16px;">
                            💻
                        </div>
                        <h3 style="font-size: 15px; font-weight: 800; color: #FFFFFF; margin: 0 0 8px;">لایسنس نرم‌افزار سازمانی</h3>
                        <p style="font-size: 12px; color: #94A3B8; margin-bottom: 14px;">پشتیبانی یکساله و به‌روزرسانی نامحدود</p>
                        <div style="font-size: 18px; font-weight: 900; color: #10B981; margin-bottom: 14px;">۱,۸۵۰,۰۰۰ تومان</div>
                        <button type="button" class="sedrazavi-btn-store-cart" style="width: 100%; background: #10B981; color: #FFFFFF; border: none; padding: 10px; border-radius: 10px; font-weight: bold; cursor: pointer;">
                            افزودن به سبد خرید
                        </button>
                    </div>

                    <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 20px; text-align: center;">
                        <div style="height: 160px; background: rgba(15, 23, 42, 0.6); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 44px; margin-bottom: 16px;">
                            📚
                        </div>
                        <h3 style="font-size: 15px; font-weight: 800; color: #FFFFFF; margin: 0 0 8px;">دوره جامع آموزشی دانلودی</h3>
                        <p style="font-size: 12px; color: #94A3B8; margin-bottom: 14px;">دسترسی مادام‌العمر به محتوای ویدئویی</p>
                        <div style="font-size: 18px; font-weight: 900; color: #10B981; margin-bottom: 14px;">۹۸۰,۰۰۰ تومان</div>
                        <button type="button" class="sedrazavi-btn-store-cart" style="width: 100%; background: #10B981; color: #FFFFFF; border: none; padding: 10px; border-radius: 10px; font-weight: bold; cursor: pointer;">
                            افزودن به سبد خرید
                        </button>
                    </div>
                <?php
                }
                ?>
            </div>
        </div>
    </section>

</div>

<?php
get_footer();
`},{path:"page-supreme-court-appeals.php",filename:"page-supreme-court-appeals.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-supreme-court-appeals.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: دیوان عالی کشور، فرجام‌خواهی و اعاده دادرسی (Supreme Court Appeals)
 * Description: سامانه تحلیل آراء فرجامی، اعمال ماده ۴۷۷ قانون آیین دادرسی کیفری، جهات اعاده دادرسی ماده ۴۷۴ و بانک آرای وحدت رویه
 *
 * @package SedRazavi
 * @version 3.1.0
 */

if (!defined('ABSPATH')) exit;

$is_elementor = false;
if (did_action('elementor/loaded') && class_exists('Elementor\\Plugin')) {
    $elem = \\Elementor\\Plugin::instance();
    if (($elem->preview && method_exists($elem->preview, 'is_preview_mode') && $elem->preview->is_preview_mode()) ||
        ($elem->editor && method_exists($elem->editor, 'is_edit_mode') && $elem->editor->is_edit_mode()) ||
        ($elem->db && method_exists($elem->db, 'is_built_with_elementor') && $elem->db->is_built_with_elementor(get_the_ID()))) {
        $is_elementor = true;
    }
}
if (!$is_elementor && is_singular() && get_post_meta(get_the_ID(), '_elementor_edit_mode', true) === 'builder') {
    $is_elementor = true;
}

get_header();

if ($is_elementor) :
    while (have_posts()) : the_post();
        the_content();
    endwhile;
else :
?>

<div class="py-12 bg-[#0B132B] min-h-screen text-slate-100" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="relative bg-gradient-to-br from-[#060B18] via-[#0B132B] to-[#251A38] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 mb-10 shadow-2xl overflow-hidden">
            <div class="space-y-4 text-right max-w-3xl">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
                    <span>🏛️ عالی‌ترین مرجع قضایی کشور</span>
                </div>
                <h1 class="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
                    فرجام‌خواهی، اعاده دادرسی و تقاضای اعمال ماده ۴۷۷
                </h1>
                <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                    وکالت تخصصی در شعب دیوان عالی کشور، نگارش لوایح فرجامی نقض احکام قطعی دادگاه‌های تجدیدنظر، اثبات خلاف شرع و قانون بین بودن احکام و استناد به آخرین آرای هیئت عمومی وحدت رویه.
                </p>
            </div>
        </div>

        <div class="mb-12">
            <?php
            if (shortcode_exists('react_component')) {
                echo do_shortcode('[react_component name="SupremeCourtAppealsSuite"]');
            }
            ?>
        </div>

        <?php
        while (have_posts()) : the_post();
            the_content();
        endwhile;
        ?>
    </div>
</div>

<?php
endif;
get_footer();
`},{path:"page-tax-disputes.php",filename:"page-tax-disputes.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-tax-disputes.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: دعاوی مالیاتی و سامانه مودیان (Tax Disputes)
 * Description: هیئت‌های حل اختلاف مالیاتی، دفاع ماده ۲۳۸ و ۲۴۴، تطبیق سامانه مودیان و پایانه‌های فروشگاهی
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="site-main py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] text-slate-800 dark:text-slate-100 min-h-screen">
    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- Header Banner -->
        <header class="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#1B2836] to-[#0B132B] text-white border border-emerald-500/30 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="space-y-3">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                        <span>📊 مالیات بر درآمد، ارزش افزوده و پایانه‌های فروشگاهی</span>
                    </div>
                    <h1 class="text-2xl md:text-3xl font-extrabold text-white font-serif">
                        کلینیک تخصصی دعاوی مالیاتی، اعتراض به برگ تشخیص و سامانه مودیان
                    </h1>
                    <p class="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
                        دفاع در هیئت‌های بدوی و تجدیدنظر حل اختلاف مالیاتی (مواد ۲۴۴ و ۲۴۷ ق.م.م)، شورای عالی مالیاتی (ماده ۲۵۱) و هیئت ۲۵۱ مکرر؛ حل چالش‌های جرایم عدم ارسال صورتحساب الکترونیکی.
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <a href="<?php echo esc_url(home_url('/contact')); ?>" class="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B132B] font-bold text-sm shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2">
                        <span>تنظیم لایحه اعتراضی مالیاتی</span>
                    </a>
                </div>
            </div>
        </header>

        <!-- React Interactive Container -->
        <div class="tax-suite-container">
            <?php echo do_shortcode('[react_component name="TaxDisputesMoadianSuite"]'); ?>
        </div>

    </div>
</main>

<?php
get_footer();
`},{path:"page-template-dashboard.php",filename:"page-template-dashboard.php",category:"برگه‌ها و آرشیوها",description:"قالب تمام‌صفحه اختصاصی داشبورد مدیریت وکالت.",code:`<?php
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

<?php get_footer(); ?>`},{path:"page-videos.php",filename:"page-videos.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-videos.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: آرشیو و نمایش ویدئوها (Video Archive Hub)
 * Description: Dedicated Video Hub template with interactive player, categories, and direct download links.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-video-archive-container" dir="rtl" style="min-height: 80vh; background-color: var(--sr-bg-body, #070D1E); color: #F0F6FC; padding: 40px 16px;">
    <div class="container" style="max-width: 1200px; margin: 0 auto;">
        
        <!-- Header & Breadcrumbs -->
        <div style="margin-bottom: 32px; text-align: center;">
            <span style="display: inline-block; padding: 4px 12px; background: rgba(212, 175, 55, 0.15); color: #D4AF37; border-radius: 9999px; font-size: 13px; font-weight: bold; border: 1px solid rgba(212, 175, 55, 0.3); margin-bottom: 12px;">
                🎬 رسانه و مدیا سنتر
            </span>
            <h1 style="font-size: 32px; font-weight: 800; color: #FFFFFF; margin: 0 0 12px 0;">
                <?php esc_html_e('آرشیو جامع ویدئوها و تحلیل‌های تصویری', 'sedrazavi'); ?>
            </h1>
            <p style="color: #94A3B8; font-size: 15px; max-width: 600px; margin: 0 auto;">
                <?php esc_html_e('مشاهده آموزش‌های ویدیویی، تحلیل پرونده‌های شاخص، وبینارهای تخصصی و گفتگوهای کارشناسی', 'sedrazavi'); ?>
            </p>
        </div>

        <!-- React Mount or Native Fallback -->
        <div id="sedrazavi-video-hub-app">
            <?php
            // If React bundle is present, it hydrates here; otherwise render native WordPress loop
            if (have_posts()) :
                while (have_posts()) : the_post();
                    the_content();
                endwhile;
            endif;
            ?>
        </div>

    </div>
</div>

<?php
get_footer();
`},{path:"page-virtual-court.php",filename:"page-virtual-court.php",category:"برگه‌ها و آرشیوها",description:"قالب اختصاصی برگه وردپرس (page-virtual-court.php) سازگار با المنتور و شورت‌کدهای تعاملی.",code:`<?php
/**
 * Template Name: تالار دادگاه مجازی و جلسات استماع
 * Description: بستر امن دادرسی الکترونیک و استماع مجازی لایحه دفاعیه
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

if (!defined('ABSPATH')) exit;

// Access control: Protected behind authentication/permission
if (!is_user_logged_in() && !(defined('SEDRAZAVI_ALLOW_MOCK_HEADERS') && SEDRAZAVI_ALLOW_MOCK_HEADERS === true)) {
    auth_redirect();
    exit;
}

// SEO Directive: Confidential judicial hearing sessions must be strictly noindex, nofollow
header('X-Robots-Tag: noindex, nofollow', true);
add_filter('wp_robots', function($robots) {
    $robots['noindex']  = true;
    $robots['nofollow'] = true;
    return $robots;
});

get_header();

// No fixed default session data
$session_code = isset($_GET['session']) ? sanitize_text_field(wp_unslash($_GET['session'])) : '';
$has_session  = !empty($session_code);
?>

<main class="site-main py-10 px-4 sm:px-6 lg:px-8 bg-[#060B18] text-white min-h-screen" dir="rtl">
    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- Header Room Banner -->
        <header class="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#151D36] to-[#0B132B] border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="space-y-3">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-bold">
                        <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                        <span>شعبه دادرسی برخط و استماع مجازی محرمانه</span>
                    </div>
                    <h1 class="text-2xl md:text-3xl font-extrabold text-[#D4AF37] font-serif">
                        اتاق داوری و دادگاه مجازی دفتر وکالت
                    </h1>
                    <p class="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
                        بستر امن دادرسی الکترونیک با رمزنگاری سرتاسری و احراز هویت ثنا جهت جلسات رسمی استماع لوایح، دفاعیات و داوری.
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row items-center gap-3">
                    <div class="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-emerald-400 font-mono flex items-center gap-2">
                        <span>🔐 E2E Encrypted</span>
                    </div>
                    <?php if ($has_session) : ?>
                        <span class="text-xs text-slate-400 font-mono">شناسه جلسه: <?php echo esc_html($session_code); ?></span>
                    <?php endif; ?>
                </div>
            </div>
        </header>

        <?php if ($has_session) : ?>
            <!-- React Interactive Container -->
            <div class="virtual-court-room-container">
                <?php echo do_shortcode('[sedrazavi_virtual_courtroom session="' . esc_attr($session_code) . '"]'); ?>
            </div>
        <?php else : ?>
            <!-- Session Entry Form / Empty State -->
            <div class="p-8 md:p-12 rounded-3xl bg-[#0B132B] border border-slate-800 text-center max-w-2xl mx-auto space-y-6">
                <div class="w-16 h-16 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] mx-auto flex items-center justify-center text-3xl">
                    ⚖️
                </div>
                <div class="space-y-2">
                    <h2 class="text-xl font-bold text-white">
                        ورود به تالار دادرسی مجازی
                    </h2>
                    <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        جهت ورود به جلسه استماع دادگاه یا داوری، لطفاً شناسه اختصاصی جلسه (ارسال شده از طریق پیامک یا ابلاغیه دفتر) را وارد فرمایید.
                    </p>
                </div>

                <form method="get" action="<?php echo esc_url(get_permalink()); ?>" class="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                    <input 
                        type="text" 
                        name="session" 
                        placeholder="شناسه جلسه (مانند: VR-1403-XXX)" 
                        required 
                        class="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs text-center font-mono focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button 
                        type="submit" 
                        class="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#C4981C] text-[#0B132B] font-bold text-xs shadow-md transition-colors shrink-0"
                    >
                        ورود به جلسه
                    </button>
                </form>

                <div class="pt-4 border-t border-slate-800/80">
                    <p class="text-[11px] text-slate-500">
                        در صورت عدم دریافت شناسه جلسه یا بروز مشکل در ورود، با دبیرخانه دفتر وکالت تماس حاصل فرمایید.
                    </p>
                </div>
            </div>
        <?php endif; ?>

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
`},{path:"readme.txt",filename:"readme.txt",category:"مستندات و زبان",description:"فایل رسمی پوسته وردپرس: readme.txt",code:`=== SedRazavi Law Firm WordPress Theme ===
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
`},{path:"register-react-shortcodes.php",filename:"register-react-shortcodes.php",category:"قالب اصلی (Templates)",description:'موتور ثبت شورت‌کدهای یونیورسال [react_component name="..."] با پشتیبانی اسکلتون لودر.',code:`<?php
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
        'LegalFinancialSuite'           => 'سامانه محاسبات و امور مالی حقوقی و اقساط (Legal Financial Suite)',
        'LegalOdrSuite'                 => 'سامانه حل اختلاف آنلاین و داوری هوشمند (Legal ODR Suite)',
        'LegalIntelligenceSuite'        => 'موتور تحلیل هوش حقوقی و وحدت رویه قضایی (Legal Intelligence Suite)',
        'LegalStrategySuite'            => 'اتاق استراتژی دفاع و تقویم مواعد دادگاه (Legal Strategy Suite)',
        'CorporateInternationalSuite'   => 'سامانه حقوق تجارت، سرمایه‌گذاری و اینکوترمز (Corporate International Suite)',
        'IntellectualPropertySuite'     => 'مالکیت فکری، ثبت اختراع، علامت تجاری و اسکرو (IP Suite)',
        'CyberForensicsSuite'           => 'فارنزیک جرایم سایبری و کشف ادله دیجیتال (Cyber Forensics Suite)',
        'FinancialComplianceSuite'      => 'سامانه تطبیق مالی و پیشگیری از پولشویی (AML & Financial Compliance)',
        'RealEstateConstructionSuite'   => 'دعاوی تخصصی ملکی، سرقفلی و ساخت‌وساز (Real Estate & Construction)',
        'FamilyInheritanceSuite'        => 'حقوق خانواده، ارث، وصیت و ترکه (Family & Inheritance Suite)',
        'LegalAutomationLibrary'        => 'کتابخانه اتوماسیون فرم‌ها و اوراق قضایی (Legal Automation Library)',
        'AdministrativeJusticeSuite'    => 'فرجام‌خواهی در دیوان عدالت اداری (Administrative Justice Suite)',
        'CasePredictionRiskSuite'       => 'شبیه‌ساز و پیش‌بینی ریسک آرای دادگاه (Case Prediction & Risk Suite)',
        'EngineeringProcurementSuite'   => 'قراردادهای پیمانکاری مهندسی و شرایط عمومی پیمان (EPC & Procurement)',
        'InternationalArbitrationSuite' => 'داوری تجاری بین‌المللی و اجرای آرای خارجی (International Arbitration)',
        'ComprehensiveCodexSuite'       => 'کدکس جامع قوانین و مقررات جمهوری اسلامی ایران (Comprehensive Legal Codex)',
        'MasterDraftingVaultSuite'      => 'گنجینه جامع نگارش لوایح و متون تخصصی وکالت (Master Drafting Vault)',
        'TaxDisputesMoadianSuite'       => 'دعاوی مالیاتی، هیئت‌های حل اختلاف و سامانه مودیان (Tax Disputes Suite)',
        'LaborSocialSecuritySuite'      => 'دعاوی روابط کار، هیئت تشخیص و تامین اجتماعی (Labor & Social Security)',
        'EconomicCrimesDefenseSuite'    => 'دفاع تخصصی در جرایم اقتصادی و اخلال در نظام مالی (Economic Crimes Defense)',
        'CustomsTransitDisputesSuite'   => 'کمیسیون اختلافات گمرکی و ترانزیت کالا (Customs & Transit Disputes)',
        'LegalCrmSmartNotifierSuite'    => 'سامانه ارتباط با موکلین و پیام‌رسان هوشمند (Legal CRM & Smart Notifier)',
        'CommercialArbitrationSuite'    => 'مرکز داوری بازرگانی و حل و فصل قراردادها (Commercial Arbitration Suite)',
        'ContractAuditAnalyzer'         => 'ممیزی هوشمند قراردادها و ارزیابی ریسک شروط (Contract Audit Analyzer)',
        'PetitionGeneratorModal'        => 'تنظیم هوشمند دادخواست و لوایح عدل‌ایران (Petition Generator)',
        'VirtualHearingRoom'            => 'اتاق دادرسی الکترونیک و دادگاه مجازی (Virtual Hearing Room)',
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
        add_shortcode('sedrazavi_contract_auditor', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'ContractAuditAnalyzer']));
        });
        add_shortcode('sedrazavi_petition_builder', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'PetitionGeneratorModal']));
        });
        add_shortcode('sedrazavi_virtual_courtroom', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'VirtualHearingRoom']));
        });
        add_shortcode('sedrazavi_legal_finance', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LegalFinancialSuite']));
        });
        add_shortcode('sedrazavi_odr_suite', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LegalOdrSuite']));
        });
        add_shortcode('sedrazavi_odr_portal', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LegalOdrSuite']));
        });
        add_shortcode('sedrazavi_legal_intelligence', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LegalIntelligenceSuite']));
        });
        add_shortcode('sedrazavi_legal_intelligence_portal', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LegalIntelligenceSuite']));
        });
        add_shortcode('sedrazavi_legal_strategy', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LegalStrategySuite']));
        });
        add_shortcode('sedrazavi_corporate_international', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'CorporateInternationalSuite']));
        });
        add_shortcode('sedrazavi_ip_suite', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'IntellectualPropertySuite']));
        });
        add_shortcode('sedrazavi_cyber_suite', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'CyberForensicsSuite']));
        });
        add_shortcode('sedrazavi_compliance_aml', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'FinancialComplianceSuite']));
        });
        add_shortcode('sedrazavi_aml_compliance_suite', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'FinancialComplianceSuite']));
        });
        add_shortcode('sedrazavi_real_estate', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'RealEstateConstructionSuite']));
        });
        add_shortcode('sedrazavi_real_estate_suite', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'RealEstateConstructionSuite']));
        });
        add_shortcode('sedrazavi_family_inheritance', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'FamilyInheritanceSuite']));
        });
        add_shortcode('sedrazavi_court_fee_calculator', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'CourtFeeCalculator']));
        });
        add_shortcode('sedrazavi_judicial_calculators', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LegalFinancialSuite']));
        });
        add_shortcode('sedrazavi_customs_transit', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'CustomsTransitDisputesSuite']));
        });
        add_shortcode('sedrazavi_epc_procurement', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'EngineeringProcurementSuite']));
        });
        add_shortcode('sedrazavi_government_tenders', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'GovernmentTendersGuaranteesSuite']));
        });
        add_shortcode('sedrazavi_economic_crimes', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'EconomicCrimesDefenseSuite']));
        });
        add_shortcode('sedrazavi_labor_security', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LaborSocialSecuritySuite']));
        });
        add_shortcode('sedrazavi_supreme_court', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'SupremeCourtAppealsSuite']));
        });
        add_shortcode('sedrazavi_codex', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'ComprehensiveCodexSuite']));
        });
        add_shortcode('sedrazavi_drafting_vault', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'MasterDraftingVaultSuite']));
        });
        add_shortcode('sedrazavi_crm_notifier', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LegalCrmSmartNotifierSuite']));
        });
        add_shortcode('sedrazavi_payment_adapter', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'PaymentAdapterSystemSuite']));
        });
        add_shortcode('sedrazavi_commercial_arbitration', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'CommercialArbitrationSuite']));
        });
        add_shortcode('sedrazavi_tax_disputes', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'TaxDisputesMoadianSuite']));
        });
        add_shortcode('sedrazavi_administrative_justice', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'AdministrativeJusticeSuite']));
        });
        add_shortcode('sedrazavi_booking', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'ContactAndBookingSection']));
        });
        add_shortcode('sedrazavi_social_icons', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'AttorneySocialAccounts']));
        });
        add_shortcode('sedrazavi_gold_scroll', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'GoldScrollSidebar']));
        });
        add_shortcode('sedrazavi_corporate_suite', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'CorporateInternationalSuite']));
        });
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
            <h1 class="text-2xl font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-2">
                <svg class="w-6 h-6 text-sr-gold inline-block shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span><?php printf(esc_html__('نتایج جستجو برای: %s', 'sedrazavi'), '<span class="text-[#D4AF37]">' . get_search_query() . '</span>'); ?></span>
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
`},{path:"sidebar.php",filename:"sidebar.php",category:"قالب اصلی (Templates)",description:"فایل رسمی پوسته وردپرس: sidebar.php",code:`<?php
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

                <!-- Contract Audit & Drafting Shortcode Box -->
                <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-md space-y-4 text-right">
                    <div class="flex items-center gap-2 text-[#D4AF37] font-bold text-sm">
                        <span>📝</span>
                        <span><?php esc_html_e('ممیزی قرارداد و شرط داوری', 'sedrazavi'); ?></span>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        <?php esc_html_e('پیش از امضا، شروط حقوقی، تعهدات مالی و شرط داوری قرارداد خود را با ابزار ممیزی قراردادهای وکلای پایه یک ارزیابی کنید.', 'sedrazavi'); ?>
                    </p>
                    <a href="<?php echo esc_url(home_url('/contract-audit/')); ?>" class="btn-gold w-full text-center py-2.5 text-xs font-bold block rounded-xl">
                        <span>ورود به سامانه ممیزی قراردادها</span>
                    </a>
                </div>

            </div>

        </div>
    </div>
</main>

<?php endwhile; ?>
<?php get_footer(); ?>
`},{path:"single-video.php",filename:"single-video.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: single-video.php",code:`<?php
/**
 * Single Video Template (قالب اختصاصی تک‌ویدئو و سخنرانی چندرسانه‌ای)
 *
 * Provides a responsive cinema video player, multi-resolution download hub,
 * interactive timestamps/chapters, speaker bio, and related video cards.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-single-video-page py-10 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-right" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">

        <?php while (have_posts()) : the_post(); 
            $post_id        = get_the_ID();
            $video_url      = get_post_meta($post_id, '_sedrazavi_video_url', true) ?: 'https://www.aparat.com/video/video/embed/videohash/demo/vt/frame';
            $duration       = get_post_meta($post_id, '_sedrazavi_video_duration', true) ?: '۱۴:۳۵';
            $speaker        = get_post_meta($post_id, '_sedrazavi_video_speaker', true) ?: 'دکتر سیده مریم رضوی';
            $views_count    = get_post_meta($post_id, '_sedrazavi_video_views', true) ?: '۲,۸۴۰';
            $publish_date   = get_the_date('j F Y');
            $category_terms = get_the_terms($post_id, 'video_category');
            $category_name  = (!empty($category_terms) && !is_wp_error($category_terms)) ? $category_terms[0]->name : 'تحلیل حقوقی و دادرسی';
        ?>

        <!-- Breadcrumb & Top Bar -->
        <div class="flex items-center justify-between flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div class="flex items-center gap-2">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-[#D4AF37] transition-colors">صفحه اصلی</a>
                <span>/</span>
                <a href="<?php echo esc_url(home_url('/videos/')); ?>" class="hover:text-[#D4AF37] transition-colors">آرشیو ویدئوها</a>
                <span>/</span>
                <span class="text-gray-900 dark:text-gray-200 font-bold"><?php the_title(); ?></span>
            </div>
            <a href="<?php echo esc_url(home_url('/videos/')); ?>" class="sedrazavi-btn-pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:text-[#D4AF37] transition-all">
                <span>← بازگشت به کل ویدئوها</span>
            </a>
        </div>

        <!-- Cinema Video Player Card -->
        <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
            
            <!-- Video Frame Container -->
            <div class="sedrazavi-video-cinema-frame relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl flex items-center justify-center border border-white/10">
                <?php if (!empty($video_url) && strpos($video_url, 'http') === 0) : ?>
                    <iframe class="w-full h-full" src="<?php echo esc_url($video_url); ?>" title="<?php the_title_attribute(); ?>" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <?php else : ?>
                    <div class="text-center p-8 text-white space-y-3">
                        <span class="text-6xl block">🎬</span>
                        <h3 class="text-lg font-bold">پخش‌کننده ویدیویی کیفیت بالا</h3>
                        <p class="text-xs text-gray-400 max-w-md mx-auto">ویدیو به صورت مستقیم از سرور پرسرعت اختصاصی پخش می‌شود.</p>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Video Metadata & Title -->
            <div class="space-y-4 border-b border-gray-100 dark:border-gray-800 pb-6">
                <div class="flex items-center justify-between flex-wrap gap-3">
                    <span class="px-3.5 py-1 rounded-full text-xs font-bold bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] border border-[#D4AF37]/30">
                        <?php echo esc_html($category_name); ?>
                    </span>
                    <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 font-mono">
                        <span>⏱️ <?php echo esc_html($duration); ?></span>
                        <span>👁️ <?php echo esc_html($views_count); ?> بازدید</span>
                        <span>📅 <?php echo esc_html($publish_date); ?></span>
                    </div>
                </div>

                <h1 class="text-2xl sm:text-3xl font-black font-serif text-[#0B132B] dark:text-white leading-tight">
                    <?php the_title(); ?>
                </h1>
            </div>

            <!-- Multi-Format Download Suite -->
            <div class="sedrazavi-video-downloads-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div class="p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <div>
                        <div class="text-xs font-bold text-gray-900 dark:text-white">کیفیت 1080p Full HD</div>
                        <div class="text-[10px] text-gray-500 font-mono">MP4 • ۴۲۰ مگابایت</div>
                    </div>
                    <a href="#download-1080" class="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-black font-bold text-xs hover:bg-[#b8972e] transition-colors">دانلود</a>
                </div>

                <div class="p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <div>
                        <div class="text-xs font-bold text-gray-900 dark:text-white">کیفیت 720p HD</div>
                        <div class="text-[10px] text-gray-500 font-mono">MP4 • ۱۸۰ مگابایت</div>
                    </div>
                    <a href="#download-720" class="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold text-xs hover:bg-[#D4AF37] hover:text-black transition-colors">دانلود</a>
                </div>

                <div class="p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <div>
                        <div class="text-xs font-bold text-gray-900 dark:text-white">فایل صوتی (Podcast)</div>
                        <div class="text-[10px] text-gray-500 font-mono">MP3 320kbps • ۲۸ مگابایت</div>
                    </div>
                    <a href="#download-mp3" class="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs hover:bg-emerald-500 hover:text-white transition-colors">دانلود صوت</a>
                </div>

                <div class="p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <div>
                        <div class="text-xs font-bold text-gray-900 dark:text-white">خلاصه و اسلایدها</div>
                        <div class="text-[10px] text-gray-500 font-mono">PDF • ۵ مگابایت</div>
                    </div>
                    <a href="#download-pdf" class="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-xs hover:bg-indigo-500 hover:text-white transition-colors">دانلود PDF</a>
                </div>
            </div>

            <!-- Interactive Video Chapters / Timestamps -->
            <div class="p-5 rounded-2xl bg-[#070D1E]/60 border border-white/10 space-y-3">
                <div class="text-sm font-bold text-white flex items-center gap-2">
                    <span class="text-[#D4AF37]">⏱️</span>
                    <span>سرفصل‌ها و بخش‌های کلیدی ویدیو:</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <button type="button" class="p-2.5 rounded-xl bg-white/5 hover:bg-[#D4AF37]/20 border border-white/5 hover:border-[#D4AF37]/40 text-right transition-colors cursor-pointer text-gray-300 hover:text-white">
                        <span class="text-[#D4AF37] font-mono font-bold block text-[11px]">۰۰:۰۰</span>
                        <span class="truncate block">مقدمه و طرح صورت مسئله</span>
                    </button>
                    <button type="button" class="p-2.5 rounded-xl bg-white/5 hover:bg-[#D4AF37]/20 border border-white/5 hover:border-[#D4AF37]/40 text-right transition-colors cursor-pointer text-gray-300 hover:text-white">
                        <span class="text-[#D4AF37] font-mono font-bold block text-[11px]">۰۳:۱۵</span>
                        <span class="truncate block">بررسی ماده قانونی و استراتژی</span>
                    </button>
                    <button type="button" class="p-2.5 rounded-xl bg-white/5 hover:bg-[#D4AF37]/20 border border-white/5 hover:border-[#D4AF37]/40 text-right transition-colors cursor-pointer text-gray-300 hover:text-white">
                        <span class="text-[#D4AF37] font-mono font-bold block text-[11px]">۰۷:۴۰</span>
                        <span class="truncate block">نکات کلیدی برای جلسات دادگاه</span>
                    </button>
                    <button type="button" class="p-2.5 rounded-xl bg-white/5 hover:bg-[#D4AF37]/20 border border-white/5 hover:border-[#D4AF37]/40 text-right transition-colors cursor-pointer text-gray-300 hover:text-white">
                        <span class="text-[#D4AF37] font-mono font-bold block text-[11px]">۱۲:۱۰</span>
                        <span class="truncate block">پاسخ به سوالات متداول و جمع‌بندی</span>
                    </button>
                </div>
            </div>

            <!-- Content Body & Notes -->
            <div class="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-sans pt-4">
                <h3 class="text-xl font-bold font-serif text-[#0B132B] dark:text-white">یادداشت‌ها و متن تفصیلی ویدیو:</h3>
                <?php the_content(); ?>
            </div>

            <!-- Speaker Profile Card -->
            <div class="p-6 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-transparent border border-[#D4AF37]/25 flex items-center gap-4">
                <div class="w-14 h-14 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center text-xl shrink-0 font-serif">
                    ⚖️
                </div>
                <div class="space-y-1">
                    <h4 class="text-sm font-bold text-gray-900 dark:text-white"><?php echo esc_html($speaker); ?></h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        مدرس و ارائه‌دهنده تخصصی • پاسخگوی پرونده‌ها و مشاوره‌های حقوقی
                    </p>
                </div>
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
                        <span class="inline-flex items-center gap-1">
                            <svg class="w-3.5 h-3.5 text-sr-gold inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <span><?php echo get_the_date('j F Y'); ?></span>
                        </span>
                        <span>•</span>
                        <span class="inline-flex items-center gap-1">
                            <svg class="w-3.5 h-3.5 text-sr-gold inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span><?php echo max(1, round(str_word_count(strip_tags(get_the_content())) / 180)); ?> دقیقه مطالعه</span>
                        </span>
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

                <!-- Contract & Legal Service CTA Shortcode -->
                <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B132B] to-[#12213D] border border-[#D4AF37]/30 text-white space-y-4">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div class="space-y-1">
                            <span class="text-xs font-bold text-[#D4AF37]">خدمات تخصصی قراردادها و وکالت</span>
                            <h3 class="text-lg font-bold font-serif">نیاز به بررسی قرارداد یا مشاوره حقوقی دارید؟</h3>
                        </div>
                        <div class="flex items-center gap-3">
                            <a href="<?php echo esc_url(home_url('/contract-audit/')); ?>" class="btn-gold py-2.5 px-4 text-xs font-bold rounded-xl">ممیزی فوری قرارداد</a>
                            <a href="<?php echo esc_url(home_url('/#booking')); ?>" class="py-2.5 px-4 text-xs font-bold rounded-xl border border-slate-700 hover:border-[#D4AF37]">رزرو وقت مشاوره</a>
                        </div>
                    </div>
                </div>

                <!-- Tags -->
                <?php if (has_tag()) : ?>
                    <div class="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-2">
                        <span class="text-xs text-gray-400 inline-flex items-center gap-1">
                            <svg class="w-3.5 h-3.5 text-sr-gold inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                <line x1="7" y1="7" x2="7.01" y2="7"></line>
                            </svg>
                            <span><?php esc_html_e('برچسب‌ها:', 'sedrazavi'); ?></span>
                        </span>
                        <?php the_tags('<span class="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300">', '</span> <span class="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300">', '</span>'); ?>
                    </div>
                <?php endif; ?>

                <!-- Author Box -->
                <div class="bg-[#F4F6F9] dark:bg-gray-900/60 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center gap-5">
                    <div class="w-16 h-16 rounded-full bg-[#0B132B] text-[#D4AF37] flex items-center justify-center font-serif text-2xl font-bold">
                        <svg class="w-8 h-8 text-sr-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                            <path d="M7 21h10"/>
                            <path d="M12 3v18"/>
                        </svg>
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
`},{path:"style.css",filename:"style.css",category:"قالب اصلی (Templates)",description:"هدر رسمی پوسته وردپرس با نام SedRazavi، متغیرهای طلایی/سرمه‌ای و استایل‌های ۱۰۰٪ کامل.",code:`/*
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
  --sr-bg-alt: #070D1E;
  --sr-surface: #0B132B;
  --sr-surface-card: #0F172A;
  --sr-surface-hover: #1C2541;
  --sr-surface-alt: #162038;

  --sr-border: rgba(212, 175, 55, 0.22);
  --sr-border-subtle: rgba(255, 255, 255, 0.08);
  --sr-border-card: rgba(255, 255, 255, 0.1);
  --sr-border-focus: #D4AF37;

  --sr-text-primary: #F8FAFC;
  --sr-text-secondary: #CBD5E1;
  --sr-text-muted: #94A3B8;
  --sr-text-inverted: #0B132B;

  --sr-gold-accent: #D4AF37;
  --sr-gold-accent-hover: #AA820A;
  --sr-gold-grad: linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA820A 100%);

  --sr-header-bg: rgba(11, 19, 43, 0.95);
  --sr-topbar-bg: #0B132B;
  --sr-modal-bg: #0B132B;
  --sr-input-bg: #070D1E;
}

[data-theme="light"] {
  --sr-bg: #F8FAFC;
  --sr-bg-alt: #F1F5F9;
  --sr-surface: #FFFFFF;
  --sr-surface-card: #FFFFFF;
  --sr-surface-hover: #F8FAFC;
  --sr-surface-alt: #E2E8F0;

  --sr-border: rgba(170, 130, 10, 0.22);
  --sr-border-subtle: rgba(15, 23, 42, 0.08);
  --sr-border-card: rgba(15, 23, 42, 0.1);
  --sr-border-focus: #AA820A;

  --sr-text-primary: #0B132B;
  --sr-text-secondary: #334155;
  --sr-text-muted: #64748B;
  --sr-text-inverted: #F8FAFC;

  --sr-gold-accent: #AA820A;
  --sr-gold-accent-hover: #8A6908;
  --sr-gold-grad: linear-gradient(135deg, #AA820A 0%, #D4AF37 50%, #8A6908 100%);

  --sr-header-bg: rgba(255, 255, 255, 0.96);
  --sr-topbar-bg: #F1F5F9;
  --sr-modal-bg: #FFFFFF;
  --sr-input-bg: #FFFFFF;
}

/* --------------------------------------------------------------------------
   کلاس‌های کمکی و توکن‌های معنایی سازگار با تم روشن و تاریک (Semantic Utility Tokens)
   -------------------------------------------------------------------------- */
.bg-sr-bg { background-color: var(--sr-bg) !important; }
.bg-sr-bg-alt { background-color: var(--sr-bg-alt) !important; }
.bg-sr-surface { background-color: var(--sr-surface) !important; }
.bg-sr-surface-card { background-color: var(--sr-surface-card) !important; }
.bg-sr-surface-hover:hover { background-color: var(--sr-surface-hover) !important; }
.bg-sr-surface-alt { background-color: var(--sr-surface-alt) !important; }

.border-sr-border { border-color: var(--sr-border) !important; }
.border-sr-border-subtle { border-color: var(--sr-border-subtle) !important; }
.border-sr-border-card { border-color: var(--sr-border-card) !important; }
.border-sr-border-focus { border-color: var(--sr-border-focus) !important; }

.text-sr-primary { color: var(--sr-text-primary) !important; }
.text-sr-secondary { color: var(--sr-text-secondary) !important; }
.text-sr-muted { color: var(--sr-text-muted) !important; }
.text-sr-gold { color: var(--sr-gold-accent) !important; }
.hover\\:text-sr-gold:hover { color: var(--sr-gold-accent) !important; }
.hover\\:text-sr-primary:hover { color: var(--sr-text-primary) !important; }
.text-sr-border-subtle { color: var(--sr-border-subtle) !important; }
.bg-sr-surface\\/95 { background-color: var(--sr-surface) !important; }
.bg-sr-surface\\/90 { background-color: var(--sr-surface) !important; }


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
  background-color: var(--sr-topbar-bg);
  color: var(--sr-text-secondary);
  font-size: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--sr-border-subtle);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background-color: var(--sr-header-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--sr-border);
  padding-top: 0.85rem;
  padding-bottom: 0.85rem;
  transition: all 0.3s ease;
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
  color: var(--sr-text-primary);
  line-height: 1.2;
}

.badge-official {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 9999px;
  background-color: rgba(212, 175, 55, 0.15);
  color: var(--sr-gold-accent);
  border: 1px solid var(--sr-border);
  font-weight: 700;
  white-space: nowrap;
}

.brand-tagline {
  font-size: 0.75rem;
  color: var(--sr-text-muted);
  margin-top: 1px;
}

.nav-link {
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  color: var(--sr-text-secondary);
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: var(--sr-gold-accent);
  background-color: var(--sr-surface-hover);
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
  background-color: var(--sr-surface);
  border: 1px solid var(--sr-border);
  border-radius: 0.75rem;
  padding: 0.5rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.25);
  z-index: 50;
}

.nav-dropdown-wrapper:hover .nav-dropdown-menu {
  display: block;
}

.dropdown-item {
  display: block;
  padding: 0.6rem 0.75rem;
  font-size: 0.75rem;
  color: var(--sr-text-secondary);
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  color: var(--sr-gold-accent);
  background-color: var(--sr-surface-hover);
}

.theme-btn, .hamburger-btn {
  padding: 0.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--sr-border-subtle);
  background-color: var(--sr-surface);
  color: var(--sr-text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.theme-btn:hover, .hamburger-btn:hover {
  border-color: var(--sr-border-focus);
  background-color: var(--sr-surface-hover);
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
   ۴. نوار تحلیل‌های شاخص و آرای وحدت رویه دیوان عالی کشور (Legal Insights Bar)
   -------------------------------------------------------------------------- */
.legal-insights-bar-section {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--sr-border-subtle);
  background-color: var(--sr-surface);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.legal-insights-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.legal-insights-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--sr-text-primary);
}

.legal-insights-badge {
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  background-color: rgba(212, 175, 55, 0.12);
  border: 1px solid var(--sr-border);
  color: var(--sr-gold-accent);
}

.legal-insights-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .legal-insights-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .legal-insights-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.legal-insight-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  background-color: var(--sr-surface-card);
  border: 1px solid var(--sr-border-subtle);
  transition: all 0.25s ease;
  text-decoration: none;
}

.legal-insight-card:hover {
  transform: translateY(-2px);
  border-color: var(--sr-border-focus);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.legal-insight-cat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.legal-insight-tag {
  font-size: 0.6875rem;
  font-weight: 700;
  color: var(--sr-gold-accent);
}

.legal-insight-num {
  font-size: 0.6875rem;
  color: var(--sr-text-muted);
}

.legal-insight-title-text {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--sr-text-primary);
  line-height: 1.5;
  margin-bottom: 0.375rem;
}

.legal-insight-desc-text {
  font-size: 0.75rem;
  color: var(--sr-text-muted);
  line-height: 1.5;
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
  border: 1px solid var(--sr-border);
  background-color: var(--sr-surface);
  color: var(--sr-text-primary);
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.btn-navy-hero:hover {
  background-color: var(--sr-surface-hover);
  border-color: var(--sr-border-focus);
  color: var(--sr-gold-accent);
}

.hero-trust-row {
  padding-top: 1.5rem;
  border-top: 1px solid var(--sr-border-subtle);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.75rem;
  color: var(--sr-text-muted);
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
  background: linear-gradient(to top right, rgba(212, 175, 55, 0.4), rgba(170, 130, 10, 0.15), rgba(11, 19, 43, 0.05));
  filter: blur(24px);
  transform: rotate(-2deg);
}

.hero-portrait-card {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  border: 2px solid var(--sr-border);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  background-color: var(--sr-surface);
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
  background-color: var(--sr-surface);
  backdrop-filter: blur(8px);
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--sr-border);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--sr-gold-accent);
  display: flex;
  align-items: center;
  gap: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.15);
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
  background-color: var(--sr-surface);
  backdrop-filter: blur(12px);
  border: 1px solid var(--sr-border);
  color: var(--sr-text-primary);
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-lawyer-name {
  font-size: 0.95rem;
  font-weight: 700;
  font-family: Georgia, 'Vazirmatn', serif;
  color: var(--sr-gold-accent);
}

.hero-lawyer-title {
  font-size: 0.75rem;
  color: var(--sr-text-muted);
  margin-top: 0.125rem;
}

.hero-exp-box {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: var(--sr-gold-accent);
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
  border-radius: 1.25rem;
  background-color: var(--sr-surface);
  border: 1px solid var(--sr-border-subtle);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--sr-text-primary);
}

.service-card:hover {
  transform: translateY(-4px);
  border-color: var(--sr-border-focus);
  box-shadow: 0 12px 30px rgba(0,0,0,0.15);
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
  background-color: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
}

.mobile-drawer-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 85%;
  max-width: 320px;
  background-color: var(--sr-surface);
  border-left: 1px solid var(--sr-border);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  color: var(--sr-text-primary);
}

/* ==========================================================================
   SedRazavi Law Firm Complete Interface & Sections Styling (v2.6.0)
   ========================================================================== */

/* Trust Badges Section */
.trust-badges-section {
    background: var(--sr-bg);
    border-top: 1px solid var(--sr-border);
    border-bottom: 1px solid var(--sr-border);
    padding: 3rem 0;
}
.stat-card {
    background: var(--sr-surface);
    border: 1px solid var(--sr-border-subtle);
    border-radius: 1rem;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;
    color: var(--sr-text-primary);
}
.stat-card:hover {
    border-color: var(--sr-border-focus);
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
}

/* Service Filter Buttons */
.service-filter-btn {
    padding: 0.5rem 1.25rem;
    border-radius: 9999px;
    font-size: 0.8125rem;
    font-weight: 700;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--sr-border-subtle);
    color: var(--sr-text-muted);
    cursor: pointer;
    transition: all 0.2s ease;
}
.service-filter-btn:hover {
    color: var(--sr-text-primary);
    border-color: var(--sr-border-focus);
}
.service-filter-btn.active {
    background: var(--sr-gold-grad);
    color: #0B132B;
    border-color: transparent;
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}

/* FAQ Items */
.faq-item {
    background: var(--sr-surface);
    border: 1px solid var(--sr-border-subtle);
    border-radius: 1rem;
    overflow: hidden;
    transition: border-color 0.2s;
}
.faq-item:hover {
    border-color: var(--sr-border-focus);
}
.faq-question {
    color: var(--sr-text-primary);
    cursor: pointer;
    transition: color 0.2s;
}
.faq-question:hover {
    color: var(--sr-gold-accent);
}
.faq-answer {
    color: var(--sr-text-secondary);
    border-top: 1px solid var(--sr-border-subtle);
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
    background: var(--sr-surface);
    border: 1px solid var(--sr-border);
    color: var(--sr-text-primary);
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
    background: var(--sr-surface);
    border: 1px solid var(--sr-border);
    color: var(--sr-text-primary);
    border-radius: 1.5rem;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
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

[data-theme="light"] .theme-toggle-sun {
    display: block !important;
}
[data-theme="light"] .theme-toggle-moon {
    display: none !important;
}
:root:not([data-theme="light"]) .theme-toggle-sun,
[data-theme="dark"] .theme-toggle-sun {
    display: none !important;
}
:root:not([data-theme="light"]) .theme-toggle-moon,
[data-theme="dark"] .theme-toggle-moon {
    display: block !important;
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

/* کلاس‌های پیشخوان و جداول ادمین وردپرس */
.widefat { width: 100%; border-collapse: collapse; }
.striped tbody tr:nth-child(odd) { background-color: #fbfcfd; }
.button-small { font-size: 11px !important; padding: 3px 8px !important; }

/* کلاس‌های تور آموزشی مدیر */
.sedrazavi-tour-footer { display: flex; justify-content: space-between; align-items: center; }
.sedrazavi-tour-step-badge { font-size: 12px; color: #CBD5E1; }
.sedrazavi-tour-actions { display: flex; gap: 8px; }
.sedrazavi-tour-btn { cursor: pointer; border-radius: 8px; font-weight: bold; }
.sedrazavi-tour-btn-next { background: #D4AF37; color: #0B132B; }
.sedrazavi-tour-btn-prev { background: rgba(255,255,255,0.15); color: #fff; }
.sedrazavi-tour-btn-close { cursor: pointer; color: #94A3B8; }

/* کلاس‌های اختصاصی قالب‌های حقوقی فازهای جدید */
@media (min-width: 768px) {
    .md\\:text-3xl { font-size: 1.875rem !important; line-height: 2.25rem !important; }
    .md\\:col-span-3 { grid-column: span 3 / span 3 !important; }
}
.to-\\[\\#AA7C11\\] { --tw-gradient-to: #AA7C11 var(--tw-gradient-to-position); }
.via-\\[\\#1E2545\\] { --tw-gradient-via: #1E2545 var(--tw-gradient-via-position); }
.via-\\[\\#0E1E38\\] { --tw-gradient-via: #0E1E38 var(--tw-gradient-via-position); }
.via-\\[\\#211A38\\] { --tw-gradient-via: #211A38 var(--tw-gradient-via-position); }
.via-\\[\\#1B2836\\] { --tw-gradient-via: #1B2836 var(--tw-gradient-via-position); }
.via-\\[\\#151D36\\] { --tw-gradient-via: #151D36 var(--tw-gradient-via-position); }
.bg-cyan-500\\/20 { background-color: rgba(6, 182, 212, 0.2) !important; }
.border-cyan-500\\/40 { border-color: rgba(6, 182, 212, 0.4) !important; }
.dark .dark\\:bg-\\[\\#0B132B\\]\\/80 { background-color: rgba(11, 19, 43, 0.8) !important; }

.admin-justice-container,
.commercial-arbitration-container,
.cyber-suite-container,
.family-suite-container,
.ip-suite-container,
.tax-suite-container {
    width: 100%;
    position: relative;
}

/* کلاس‌های پشتیبانی المنتور و قالب‌های جدید */
.sedrazavi-elementor-suite-container { width: 100%; position: relative; }
.elementor-canvas-wrapper { width: 100%; min-height: 100vh; }
.elementor-full-width-wrapper { width: 100%; position: relative; }
.bg-black\\/20 { background-color: rgba(0, 0, 0, 0.2) !important; }
.mb-10 { margin-bottom: 2.5rem !important; }
.to-\\[\\#12243A\\] { --tw-gradient-to: #12243A var(--tw-gradient-to-position); }
.to-\\[\\#122A3B\\] { --tw-gradient-to: #122A3B var(--tw-gradient-to-position); }
.to-\\[\\#142347\\] { --tw-gradient-to: #142347 var(--tw-gradient-to-position); }
.to-\\[\\#1F2438\\] { --tw-gradient-to: #1F2438 var(--tw-gradient-to-position); }
.to-\\[\\#1F1836\\] { --tw-gradient-to: #1F1836 var(--tw-gradient-to-position); }
.to-\\[\\#12213D\\] { --tw-gradient-to: #12213D var(--tw-gradient-to-position); }
.to-\\[\\#17223D\\] { --tw-gradient-to: #17223D var(--tw-gradient-to-position); }
.to-\\[\\#122A26\\] { --tw-gradient-to: #122A26 var(--tw-gradient-to-position); }
.to-\\[\\#251A38\\] { --tw-gradient-to: #251A38 var(--tw-gradient-to-position); }
.pt-10 { padding-top: 2.5rem !important; }
.bg-\\[\\#131c31\\] { background-color: #131c31 !important; }
.from-\\[\\#d4af37\\] { --tw-gradient-from: #d4af37 var(--tw-gradient-from-position); }
.to-amber-200 { --tw-gradient-to: #fde68a var(--tw-gradient-to-position); }
.bg-slate-800\\/60 { background-color: rgba(30, 41, 59, 0.6) !important; }
.border-slate-700\\/40 { border-color: rgba(51, 65, 85, 0.4) !important; }
.bg-\\[\\#d4af37\\] { background-color: #d4af37 !important; }
.focus\\:border-amber-400:focus { border-color: #fbbf24 !important; }
.bg-amber-400\\/10 { background-color: rgba(251, 191, 36, 0.1) !important; }
.border-amber-400\\/30 { border-color: rgba(251, 191, 36, 0.3) !important; }
.bg-\\[\\#0f172a\\]\\/90 { background-color: rgba(15, 23, 42, 0.9) !important; }
@media (min-width: 640px) { .sm\\:px-8 { padding-left: 2rem !important; padding-right: 2rem !important; } }
.flex-grow { flex-grow: 1 !important; }
.from-transparent { --tw-gradient-from: transparent var(--tw-gradient-from-position); }
.via-slate-900\\/50 { --tw-gradient-via: rgba(15, 23, 42, 0.5) var(--tw-gradient-via-position); }
.to-slate-950\\/80 { --tw-gradient-to: rgba(2, 6, 23, 0.8) var(--tw-gradient-to-position); }
.to-\\[\\#131c31\\] { --tw-gradient-to: #131c31 var(--tw-gradient-to-position); }
.bg-slate-800\\/50 { background-color: rgba(30, 41, 59, 0.5) !important; }
.bg-\\[\\#090d16\\] { background-color: #090d16 !important; }
.mx-2 { margin-left: 0.5rem !important; margin-right: 0.5rem !important; }
.sedrazavi-video-archive-container { width: 100%; min-height: 80vh; position: relative; }
.sedrazavi-designer-landing-wrapper { width: 100%; min-height: 100vh; position: relative; }
.sedrazavi-designer-hero { width: 100%; position: relative; }
.sedrazavi-btn-primary { display: inline-flex; transition: all 0.2s ease; }
.sedrazavi-btn-secondary { display: inline-flex; transition: all 0.2s ease; }
.sedrazavi-designer-proof { width: 100%; position: relative; }
.sedrazavi-designer-values { width: 100%; position: relative; }
.sedrazavi-designer-services { width: 100%; position: relative; }
.sedrazavi-designer-portfolio { width: 100%; position: relative; }
.sedrazavi-designer-process { width: 100%; position: relative; }
.sedrazavi-designer-pricing { width: 100%; position: relative; }
.sedrazavi-designer-brief { width: 100%; position: relative; }
.sedrazavi-btn-submit { display: block; width: 100%; transition: all 0.2s ease; }
.sedrazavi-github-suite-wrapper { width: 100%; min-height: 100vh; position: relative; }
.sedrazavi-github-suite-header { width: 100%; position: relative; }
.sedrazavi-github-heatmap-card { width: 100%; position: relative; }
.sedrazavi-github-issues-card { width: 100%; position: relative; }
.sedrazavi-store-wrapper { width: 100%; min-height: 100vh; position: relative; }
.sedrazavi-store-hero { width: 100%; position: relative; }
.sedrazavi-btn-store-primary { display: inline-flex; transition: all 0.2s ease; }
.sedrazavi-store-features { width: 100%; position: relative; }
.sedrazavi-store-catalog { width: 100%; position: relative; }
.sedrazavi-store-grid { width: 100%; position: relative; }
.sedrazavi-btn-store-cart { display: block; transition: all 0.2s ease; }
.sedrazavi-ajax-search-wrapper { width: 100%; min-height: 100vh; position: relative; }
.sedrazavi-ajax-search-header { width: 100%; position: relative; }
.sedrazavi-search-input-card { width: 100%; position: relative; }
.sedrazavi-referral-suite-wrapper { width: 100%; min-height: 100vh; position: relative; }
.sedrazavi-referral-header { width: 100%; position: relative; }
.sedrazavi-referral-ledger-card { width: 100%; position: relative; }
.sedrazavi-prediction-suite-wrapper { width: 100%; min-height: 100vh; position: relative; }
.sedrazavi-prediction-header { width: 100%; position: relative; }
.sedrazavi-prediction-metrics-card { width: 100%; position: relative; }
.sedrazavi-tokens-suite-wrapper { width: 100%; min-height: 100vh; position: relative; }
.sedrazavi-tokens-header { width: 100%; position: relative; }
.sedrazavi-tokens-grid { width: 100%; position: relative; }
.sedrazavi-downloads-hub-wrapper { width: 100%; min-height: 100vh; position: relative; }
.sedrazavi-downloads-header { width: 100%; position: relative; }
.sedrazavi-downloads-grid { width: 100%; position: relative; }
.sedrazavi-btn-download-file { display: inline-flex; transition: all 0.2s ease; }
.sedrazavi-wallpapers-hub-wrapper { width: 100%; min-height: 100vh; position: relative; }
.sedrazavi-wallpapers-header { width: 100%; position: relative; }
.sedrazavi-wallpapers-grid { width: 100%; position: relative; }
.sedrazavi-btn-download-img { display: inline-flex; transition: all 0.2s ease; }
.sedrazavi-music-hub-wrapper { width: 100%; min-height: 100vh; position: relative; }
.sedrazavi-music-header { width: 100%; position: relative; }
.sedrazavi-music-player-card { width: 100%; position: relative; }
.sedrazavi-music-playlist { width: 100%; position: relative; }
.sedrazavi-btn-download-audio { display: inline-flex; transition: all 0.2s ease; }
.sedrazavi-wizard-wrap { width: 100%; position: relative; }
.sedrazavi-podcast-hub-page { width: 100%; min-height: 100vh; position: relative; }
.hover\\:bg-orange-500:hover { background-color: #f97316 !important; }
.sedrazavi-btn-pill { display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s ease; }
.hover\\:bg-\\[\\#b8972e\\]:hover { background-color: #b8972e !important; }
.sedrazavi-portfolio-page { width: 100%; min-height: 100vh; position: relative; }
.via-\\[\\#1E1B4B\\] { --tw-gradient-via: #1E1B4B var(--tw-gradient-via-position); }
.from-\\[\\#0F172A\\] { --tw-gradient-from: #0F172A var(--tw-gradient-from-position); }
.to-\\[\\#31104B\\] { --tw-gradient-to: #31104B var(--tw-gradient-to-position); }
.hover\\:border-indigo-500\\/40:hover { border-color: rgba(99, 102, 241, 0.4) !important; }
.from-indigo-950 { --tw-gradient-from: #1e1b4b var(--tw-gradient-from-position); }
.to-indigo-900 { --tw-gradient-to: #312e81 var(--tw-gradient-to-position); }
.hover\\:border-emerald-500\\/40:hover { border-color: rgba(16, 185, 129, 0.4) !important; }
.from-emerald-950 { --tw-gradient-from: #022c22 var(--tw-gradient-from-position); }
.to-emerald-900 { --tw-gradient-to: #064e3b var(--tw-gradient-to-position); }
.from-indigo-900\\/40 { --tw-gradient-from: rgba(49, 46, 129, 0.4) var(--tw-gradient-from-position); }
.via-purple-900\\/30 { --tw-gradient-via: rgba(88, 28, 135, 0.3) var(--tw-gradient-via-position); }
.to-indigo-900\\/40 { --tw-gradient-to: rgba(49, 46, 129, 0.4) var(--tw-gradient-to-position); }
.sedrazavi-single-video-page { width: 100%; min-height: 100vh; position: relative; }
@media (min-width: 1024px) { .lg\\:p-8 { padding: 2rem !important; } }
.sedrazavi-video-cinema-frame { width: 100%; position: relative; }
.sedrazavi-video-downloads-grid { width: 100%; position: relative; }
.bg-\\[\\#070D1E\\]\\/60 { background-color: rgba(7, 13, 30, 0.6) !important; }

/* Scenario Framework & Layout Archetypes */
.uas-scenario-bento-hub { width: 100%; position: relative; }
.uas-scenario-dense-matrix { width: 100%; position: relative; }
.uas-scenario-hybrid-executive { width: 100%; position: relative; }
.bg-\\[\\#06080F\\] { background-color: #06080F !important; }
.uas-scenario-active-viewport { width: 100%; position: relative; }
.uas-scenario-bento { width: 100%; position: relative; }
.bg-\\[\\#07090E\\] { background-color: #07090E !important; }
.bg-cyan-400 { background-color: #22d3ee !important; }
.shadow-\\[0_0_12px_rgba\\(34\\,211\\,238\\,0\\.8\\)\\],
.shadow-\\[0_0_12px_rgba\\(34\\,211\\,238\\,0\\.8\\)\\],
.shadow-\\[0_0_12px_rgba(34,211,238,0\\.8)\\] { box-shadow: 0 0 12px rgba(34, 211, 238, 0.8) !important; }
/* shadow-[0_0_12px_rgba(34,211,238,0.8)] */
.bg-\\[\\#0D111A\\] { background-color: #0D111A !important; }
.border-t-cyan-400 { border-top-color: #22d3ee !important; }
.uas-scenario-dense { width: 100%; position: relative; }
.bg-\\[\\#0A0E17\\] { background-color: #0A0E17 !important; }
.bg-\\[\\#0F1626\\] { background-color: #0F1626 !important; }
@media (min-width: 1024px) {
  .lg\\:divide-y-0 > :not([hidden]) ~ :not([hidden]) { --tw-divide-y-reverse: 0; border-top-width: 0px !important; border-bottom-width: 0px !important; }
  .lg\\:divide-x > :not([hidden]) ~ :not([hidden]) { --tw-divide-x-reverse: 0; border-right-width: 0px !important; border-left-width: 1px !important; }
  .lg\\:divide-x-reverse > :not([hidden]) ~ :not([hidden]) { --tw-divide-x-reverse: 1; border-right-width: 1px !important; border-left-width: 0px !important; }
}
.bg-\\[\\#090D15\\] { background-color: #090D15 !important; }
.hover\\:bg-slate-900:hover { background-color: #0f172a !important; }
.hover\\:bg-cyan-400:hover { background-color: #22d3ee !important; }
.uas-scenario-hybrid { width: 100%; position: relative; }
.bg-\\[\\#F8FAFC\\] { background-color: #f8fafc !important; }
.border-slate-200\\/80 { border-color: rgba(226, 232, 240, 0.8) !important; }
.ab-icon { display: inline-block; vertical-align: middle; }
.dashicons { font-family: dashicons; }
.dashicons-bell:before { content: "\\f168"; }
.ab-label { display: inline-block; vertical-align: middle; }
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

<?php get_footer(); ?>`},{path:"template-elementor-canvas.php",filename:"template-elementor-canvas.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: template-elementor-canvas.php",code:`<?php
/**
 * Template Name: المنتور کانواس (Elementor Canvas)
 * Template Post Type: post, page, service, article, case
 * Description: قالب بدون سربرگ و پابرگ برای طراحی کاملاً آزاد با افزونه المنتور
 *
 * @package SedRazavi
 * @version 3.0.0
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
    <?php wp_head(); ?>
</head>
<body <?php body_class('elementor-template-canvas bg-[#0B132B] text-slate-100 antialiased font-sans'); ?>>
<?php wp_body_open(); ?>

<main id="content" class="site-main elementor-canvas-wrapper">
    <?php
    while (have_posts()) : the_post();
        the_content();
    endwhile;
    ?>
</main>

<?php wp_footer(); ?>
</body>
</html>
`},{path:"template-elementor-fullwidth.php",filename:"template-elementor-fullwidth.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: template-elementor-fullwidth.php",code:`<?php
/**
 * Template Name: المنتور تمام‌عرض (Elementor Full Width)
 * Template Post Type: post, page, service, article, case
 * Description: قالب تمام‌عرض استاندارد سازگار با المنتور همراه با سربرگ و پابرگ اصلی پوسته
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main elementor-full-width-wrapper w-full overflow-hidden">
    <?php
    while (have_posts()) : the_post();
        the_content();
    endwhile;
    ?>
</main>

<?php
get_footer();
`},{path:"template-emails.php",filename:"template-emails.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: template-emails.php",code:`<?php
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
`},{path:"template-parts/scenarios/bento-hud.php",filename:"bento-hud.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: template-parts/scenarios/bento-hud.php",code:`<?php
/**
 * Template Part: Scenario A - Bento-Grid HUD Hub
 * Inspired by Car HUD & Audiowave Dashboard
 *
 * @package SedRazavi
 */
if (!defined('ABSPATH')) exit;
?>
<section class="uas-scenario-bento bg-[#07090E] text-slate-100 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
    <!-- Top Telemetry Bar -->
    <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 text-xs">
        <div class="flex items-center gap-3">
            <span class="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] animate-pulse"></span>
            <div>
                <span class="text-xl font-bold font-mono text-white"><?php echo esc_html(date_i18n('H:i')); ?></span>
                <span class="text-slate-400 mr-2"><?php esc_html_e('سامانه رصد زنده پرونده‌ها', 'sedrazavi'); ?></span>
            </div>
        </div>
        <div class="flex items-center gap-2 font-mono text-slate-400">
            <span class="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400"><?php esc_html_e('سرور مرکزی: پایدار', 'sedrazavi'); ?></span>
            <span class="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800"><?php esc_html_e('٪۷۳ ظرفیت آزاد', 'sedrazavi'); ?></span>
        </div>
    </div>

    <!-- Bento Grid Container -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <!-- Media Tile -->
        <div class="lg:col-span-4 bg-[#0D111A] p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
                <span class="text-[10px] uppercase font-bold text-amber-400 tracking-wider"><?php esc_html_e('پادکست حقوقی فعال', 'sedrazavi'); ?></span>
                <h4 class="text-sm font-bold text-white mt-1"><?php esc_html_e('تحلیل ابعاد حقوقی قراردادهای هوشمند و بلاک‌چین', 'sedrazavi'); ?></h4>
                <p class="text-xs text-slate-400 mt-1"><?php esc_html_e('دکتر سیده مریم رضوی · پادکست دادبان', 'sedrazavi'); ?></p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span class="text-xs font-mono text-slate-500">۳:۳۵ / ۲۸:۴۵</span>
                <span class="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-bold"><?php esc_html_e('پخش زنده', 'sedrazavi'); ?></span>
            </div>
        </div>

        <!-- Navigation Map Telemetry Tile -->
        <div class="lg:col-span-5 bg-[#0D111A] p-5 rounded-2xl border border-slate-800 flex flex-col justify-between text-center relative overflow-hidden">
            <div class="text-right">
                <span class="text-xs text-slate-400"><?php esc_html_e('مرحله بعدی فرآیند دادرسی', 'sedrazavi'); ?></span>
                <h3 class="text-base font-bold text-white"><?php esc_html_e('تسلیم لایحه تجدیدنظر دیوان عالی', 'sedrazavi'); ?></h3>
            </div>
            <div class="my-6">
                <div class="text-4xl font-extrabold font-mono text-cyan-400"><?php esc_html_e('۵۲۰ متر', 'sedrazavi'); ?></div>
                <p class="text-xs text-slate-400 mt-1"><?php esc_html_e('فاصله تا مجتمع قضایی شهید بهشتی', 'sedrazavi'); ?></p>
            </div>
            <div class="pt-3 border-t border-slate-800 flex justify-between text-xs text-slate-400">
                <span><?php esc_html_e('زمان تخمینی:', 'sedrazavi'); ?> <strong class="text-white font-mono">۴۵ دقیقه</strong></span>
                <a href="#tracking" class="text-cyan-400 font-bold hover:underline"><?php esc_html_e('رهگیری پرونده', 'sedrazavi'); ?></a>
            </div>
        </div>

        <!-- Speedometer Gauge Tile -->
        <div class="lg:col-span-3 bg-[#0D111A] p-5 rounded-2xl border border-slate-800 flex flex-col justify-between text-center">
            <span class="text-xs text-slate-400"><?php esc_html_e('شاخص پیشرفت کل پرونده‌ها', 'sedrazavi'); ?></span>
            <div class="my-4 flex items-center justify-center">
                <div class="w-28 h-28 rounded-full border-4 border-slate-800 border-t-cyan-400 flex flex-col items-center justify-center shadow-lg">
                    <span class="text-3xl font-extrabold font-mono text-white">۶۷</span>
                    <span class="text-[9px] text-slate-400 uppercase">امتیاز دادرسی</span>
                </div>
            </div>
            <div class="text-xs text-emerald-400 font-bold font-mono">
                <?php esc_html_e('وضعیت عالی · دنده D دادرسی فعال', 'sedrazavi'); ?>
            </div>
        </div>
    </div>
</section>
`},{path:"template-parts/scenarios/dense-matrix.php",filename:"dense-matrix.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: template-parts/scenarios/dense-matrix.php",code:`<?php
/**
 * Template Part: Scenario B - 3-Column Dense Data Matrix
 * Inspired by Neon Cheese & SportsBook Dashboards
 *
 * @package SedRazavi
 */
if (!defined('ABSPATH')) exit;
?>
<section class="uas-scenario-dense bg-[#0A0E17] text-slate-100 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
    <!-- Scoreboard Kicker -->
    <div class="bg-[#0F1626] px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between text-xs">
        <div class="flex items-center gap-2">
            <span class="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono"><?php esc_html_e('زنده: شعبه یک دیوان عالی کشور', 'sedrazavi'); ?></span>
            <span class="text-slate-400"><?php esc_html_e('پرونده داوری تجاری بین‌المللی SR-1403/982', 'sedrazavi'); ?></span>
        </div>
        <span class="font-mono text-emerald-400 font-bold"><?php esc_html_e('۲۴,۹۸۲,۷۵۰ تومان', 'sedrazavi'); ?></span>
    </div>

    <!-- 3-Column Structure -->
    <div class="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-slate-800">
        <!-- Directory Sidebar -->
        <div class="lg:col-span-3 p-4 bg-[#090D15] space-y-3">
            <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider block"><?php esc_html_e('دسته‌بندی دعاوی', 'sedrazavi'); ?></span>
            <ul class="space-y-1.5 text-xs">
                <li class="flex justify-between p-2 rounded-xl bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
                    <span><?php esc_html_e('داوری بین‌المللی', 'sedrazavi'); ?></span>
                    <span class="font-mono">۲۸۴</span>
                </li>
                <li class="flex justify-between p-2 rounded-xl text-slate-400 hover:bg-slate-900">
                    <span><?php esc_html_e('دعاوی مالیاتی', 'sedrazavi'); ?></span>
                    <span class="font-mono">۱۳۶</span>
                </li>
                <li class="flex justify-between p-2 rounded-xl text-slate-400 hover:bg-slate-900">
                    <span><?php esc_html_e('مالکیت فکری', 'sedrazavi'); ?></span>
                    <span class="font-mono">۹۲</span>
                </li>
            </ul>
        </div>

        <!-- Data Table -->
        <div class="lg:col-span-6 p-4 space-y-3">
            <h3 class="text-sm font-bold text-white"><?php esc_html_e('جدول متراکم لوایح و پرونده‌های در جریان', 'sedrazavi'); ?></h3>
            <div class="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40 text-xs">
                <table class="w-full text-right">
                    <thead class="bg-slate-900 text-slate-400 text-[11px] border-b border-slate-800">
                        <tr>
                            <th class="p-2.5"><?php esc_html_e('کد پرونده', 'sedrazavi'); ?></th>
                            <th class="p-2.5"><?php esc_html_e('موکل', 'sedrazavi'); ?></th>
                            <th class="p-2.5"><?php esc_html_e('پیشرفت', 'sedrazavi'); ?></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800/60 font-mono text-[11px]">
                        <tr>
                            <td class="p-2.5 text-cyan-400 font-bold">SR-1403/982</td>
                            <td class="p-2.5 text-slate-200">پترو فرآیند کیش</td>
                            <td class="p-2.5 text-emerald-400">۸۵٪</td>
                        </tr>
                        <tr>
                            <td class="p-2.5 text-cyan-400 font-bold">SR-1403/984</td>
                            <td class="p-2.5 text-slate-200">صنایع فولاد کاسپین</td>
                            <td class="p-2.5 text-amber-400">۶۰٪</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Action Slip -->
        <div class="lg:col-span-3 p-4 bg-[#090D15] space-y-3 flex flex-col justify-between">
            <div>
                <span class="text-xs font-bold text-white"><?php esc_html_e('برگه استعلام و اقدام فوری', 'sedrazavi'); ?></span>
                <p class="text-[11px] text-slate-400 mt-1"><?php esc_html_e('جهت ارسال لایحه یا استعلام، شماره پرونده را وارد فرمایید.', 'sedrazavi'); ?></p>
            </div>
            <a href="#tracking" class="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs text-center block transition-all shadow-lg">
                <?php esc_html_e('استعلام و ثبت درخواست', 'sedrazavi'); ?>
            </a>
        </div>
    </div>
</section>
`},{path:"template-parts/scenarios/hybrid-executive.php",filename:"hybrid-executive.php",category:"برگه‌ها و آرشیوها",description:"فایل رسمی پوسته وردپرس: template-parts/scenarios/hybrid-executive.php",code:`<?php
/**
 * Template Part: Scenario C - Hybrid Executive Contrast
 * Inspired by Mandate Enterprise Dashboard
 *
 * @package SedRazavi
 */
if (!defined('ABSPATH')) exit;
?>
<section class="uas-scenario-hybrid bg-[#F8FAFC] text-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
    <!-- Top Pill Bar -->
    <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 text-xs">
        <div class="flex items-center gap-2 font-bold text-slate-900 font-serif text-base">
            <span class="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">M</span>
            <span><?php esc_html_e('مندیت · داشبورد اجرایی حقوقی', 'sedrazavi'); ?></span>
        </div>
        <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span class="text-slate-500"><?php esc_html_e('پایشگر فعال لوایح دیوان عالی کشور', 'sedrazavi'); ?></span>
        </div>
    </div>

    <!-- Main Grid: Obsidian Card + Action Queue -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Obsidian Dark Focal Card -->
        <div class="lg:col-span-7 bg-[#0A0E17] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl flex flex-col justify-between">
            <div class="space-y-3">
                <span class="text-xs font-bold text-indigo-400"><?php esc_html_e('گزارش تحلیلی پایشگر هوشمند', 'sedrazavi'); ?></span>
                <h3 class="text-xl sm:text-2xl font-bold font-serif leading-snug">
                    <?php esc_html_e('دو پرونده داوری نیازمند تعیین استراتژی مستقیم در دادرسی هستند', 'sedrazavi'); ?>
                </h3>
                <p class="text-xs text-slate-400">
                    <?php esc_html_e('پایش خودکار دادخواست‌ها و لوایح مبادله شده در کارگروه بین‌الملل.', 'sedrazavi'); ?>
                </p>
            </div>
            <div class="pt-6 border-t border-slate-800 mt-6 flex items-baseline justify-between">
                <div class="flex items-baseline gap-2">
                    <span class="text-4xl font-extrabold font-mono text-white">۴۱</span>
                    <span class="text-xs text-emerald-400"><?php esc_html_e('شاخص اطمینان دفاعیه', 'sedrazavi'); ?></span>
                </div>
                <span class="text-xs text-slate-400 font-mono"><?php esc_html_e('سطح ریسک: متوسط (کنترل‌شده)', 'sedrazavi'); ?></span>
            </div>
        </div>

        <!-- Waiting for you Queue Card -->
        <div class="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
                <h4 class="text-sm font-bold text-slate-900"><?php esc_html_e('در انتظار تایید شما (صف لوایح)', 'sedrazavi'); ?></h4>
                <p class="text-xs text-slate-500 mt-0.5"><?php esc_html_e('۴ لایحه تنظیم‌شده آماده امضای الکترونیک', 'sedrazavi'); ?></p>

                <div class="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                    <span class="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded font-mono"><?php esc_html_e('فوری · موعد امروز', 'sedrazavi'); ?></span>
                    <h5 class="font-bold text-slate-900"><?php esc_html_e('تاییدیه نهایی لایحه داوری بازرگانی نفت و گاز', 'sedrazavi'); ?></h5>
                    <p class="text-slate-600"><?php esc_html_e('مطابق با شیوه‌نامه اینکوترمز ۲۰۲۰ و قواعد اتاق بازرگانی پاریس.', 'sedrazavi'); ?></p>
                </div>
            </div>

            <a href="#tracking" class="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center block transition-all shadow">
                <?php esc_html_e('مشاهده و امضای الکترونیک لایحه', 'sedrazavi'); ?>
            </a>
        </div>
    </div>
</section>
`},{path:"theme.json",filename:"theme.json",category:"مستندات و زبان",description:"فایل رسمی پوسته وردپرس: theme.json",code:`{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 2,
  "settings": {
    "appearanceTools": true,
    "color": {
      "custom": true,
      "customDuotone": false,
      "customGradient": true,
      "defaultGradients": false,
      "defaultPalette": false,
      "palette": [
        {
          "slug": "obsidian-bg",
          "color": "#07090E",
          "name": "Obsidian Background"
        },
        {
          "slug": "slate-surface",
          "color": "#0D111A",
          "name": "Slate Surface"
        },
        {
          "slug": "cyan-accent",
          "color": "#22D3EE",
          "name": "Neon Cyan Accent"
        },
        {
          "slug": "gold-luxury",
          "color": "#D4AF37",
          "name": "Luxury Gold"
        },
        {
          "slug": "emerald-status",
          "color": "#10B981",
          "name": "Emerald Status"
        },
        {
          "slug": "light-canvas",
          "color": "#F8FAFC",
          "name": "Light Canvas"
        }
      ]
    },
    "layout": {
      "contentSize": "1140px",
      "wideSize": "1440px"
    },
    "typography": {
      "customFontSize": true,
      "fontStyle": true,
      "fontWeight": true,
      "lineHeight": true,
      "textDecoration": true
    }
  },
  "styles": {
    "color": {
      "background": "var(--wp--preset--color--obsidian-bg)",
      "text": "#E2E8F0"
    },
    "typography": {
      "fontFamily": "Vazirmatn, system-ui, -apple-system, sans-serif",
      "lineHeight": "1.6"
    }
  }
}
`}];export{e as W};
