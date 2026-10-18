# نقشه جامع توسعه اصناف چندمنظوره و اصلاح پایپ‌لاین انتشار گیت‌هاب (SedRazavi OS - فاز ۶.۰)

این سند مهندسی، معماری ارتقای گیت‌هاب اکشنز با محیط پایدار Bun و بسته‌بندی ۴‌گانه، پیاده‌سازی ۵ ماژول اختصاصی تجاری در افزونه `sedrazavi-companion` (دوره‌های آموزشی و اسپات‌پلیر، اشتراک ویژه VIP و پی‌وال مدیا، باکس دانلود پیشرفته سبک Soft98، تحریریه خبری و مجله، و پورتال کاربری منعطف) و پترن‌های بومی گوتنبرگ و المنتور را تبیین می‌نماید.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> تصمیمات راهبردی و مصوب بر اساس نیازمندی‌های توسعه چندمنظوره و بهینه‌سازی DevOps:
> - **محیط بیلد گیت‌هاب اکشنز (Bun Engine):** جایگزینی کامل `npm` با `oven-sh/setup-bun@v2` جهت هماهنگی ۱۰۰٪ با فایل `bun.lock` موجود در مخزن، حذف خطای اعتبارسنجی دارایی‌ها با تصحیح مسیر به `wordpress-theme/app-dist/` و بسته‌بندی خودکار ۴ فایل ZIP در هر Release.
> - **به‌روزرسانی مخزن در هسته آپدیت:** تصحیح آدرس مخزن رسمی در `class-github-sync.php` به `Aqamirrazavi/Sedrazavi-WPtemplate`.
> - **ماژولار بودن اصناف (Zero-Break Hybrid Architecture):** ماژول‌های آموزشی (SpotPlayer)، اشتراک ویژه (VIP Paywall)، دانلودی (Soft98) و خبری بدون دستکاری در کدهای پایه هسته، به عنوان ساب‌سیستم‌های الحاقی در `sedrazavi-companion` لود می‌شوند تا در صورت عدم نیاز، هیچ بار اضافه روی سایت مشتری ایجاد نکنند.
> - **پیش‌نمایش تعاملی فرانت‌اند:** تعبیه نمای زنده اختصاصی در استک ری‌اکت جهت تست آنی پلیر ضدسرقت اسپات‌پلیر با واترمارک متحرک شماره موبایل، باکس دانلود چندسروره با کپی رمز، و سوییچ پلن‌های VIP.

---

### ۱. معماری و نیازمندی‌های سه‌گانه

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 اکوسیستم اصناف و پایپ‌لاین انتشار SedRazavi OS               │
├─────────────────────────────────────────────────────────────────────────────┤
│  [ GitHub Actions Pipeline (build-and-release.yml) ]                        │
│  bun install ──> bun run lint ──> bun run build                             │
│  Validate app-dist/index.js & css                                           │
│  ├── 1. sedrazavi-theme.zip          (پوسته اصلی خنثی)                     │
│  ├── 2. sedrazavi-companion.zip      (افزونه موتور اصناف + DRM + پرداخت)    │
│  ├── 3. sedrazavi-child-themes.zip   (۴ چایلدتم آژانسی، شرکتی، فروشگاهی، حقوقی)│
│  └── 4. sedrazavi-complete-suite.zip (بسته نصبی جامع + راهنما)              │
├─────────────────────────────────────────────────────────────────────────────┤
│  [ ساب‌سیستم‌های جدید افزونه همراه (sedrazavi-companion/includes/) ]         │
│  ├── 1. class-course-lms-bridge.php         (اسپات‌پلیر + واترمارک موبایل)  │
│  ├── 2. class-vip-membership-paywall.php    (پی‌وال و لینک دانلود موقت)     │
│  ├── 3. class-soft98-download-box.php       (باکس چندسروره + کپی رمز + هش)  │
│  ├── 4. class-magazine-editorial.php        (تیکر اخبار فوری + زمان مطالعه)│
│  └── 5. class-dynamic-client-dashboard.php  (پورتال هوشمند کاربر)          │
├─────────────────────────────────────────────────────────────────────────────┤
│  [ الگوهای بلاک گوتنبرگ و اینترفیس تعاملی ری‌اکت ]                           │
│  ├── block-patterns/ (سرفصل دوره، جعبه دانلود، پلن‌های VIP، گرید اخبار)     │
│  └── MultiNicheShowcaseSuite.tsx (تست زنده تعاملی ۵ ماژول در وب‌اپ)         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### ۲. جزئیات اجرایی فازها (Task Breakdown)

#### فاز ۱: ارتقا و رفع خطای گیت‌هاب اکشنز (`.github/workflows/build-and-release.yml`)
1. بازنویسی فایل اکشن با اکشن رسمی `oven-sh/setup-bun@v2`.
2. اجرای مراحل `bun install`، `bun run lint`، و `bun run build`.
3. تصحیح گام اعتبارسنجی یکپارچگی فایل‌ها (`Validate Theme & Plugin Integrity`):
   - بررسی وجود `wordpress-theme/app-dist/index.js` و `wordpress-theme/app-dist/index.css`.
   - بررسی هسته افزونه همراه `sedrazavi-companion/sedrazavi-companion.php` و کلاس لایسنسینگ.
4. تولید ۴ آرشیو ZIP مستقل بدون فایل‌های پنهان گیت:
   - `sedrazavi-theme.zip` (بدون پوشه child-themes)
   - `sedrazavi-companion.zip`
   - `sedrazavi-child-themes.zip`
   - `sedrazavi-complete-suite.zip` (شامل ۳ فایل بالا و فایل `INSTALL_GUIDE_FA.txt`)
5. آپلود بسته‌ها با ماندگاری ۳۰ روز در آرتیفکت‌های گیت‌هاب.
6. تصحیح `const REPO = 'Aqamirrazavi/Sedrazavi-WPtemplate';` در هر دو فایل `class-github-sync.php`.

#### فاز ۲: پیاده‌سازی ۵ کلاس اصناف چندمنظوره در `sedrazavi-companion/includes/`
1. **`class-course-lms-bridge.php` (آموزش، دوره‌ها و اسپات‌پلیر):**
   - تاکسونومی سرفصل‌ها و درس‌ها، فیلدهای متای نوع دسترسی (رایگان / ویژه / پولی).
   - وبهوک دریافت رویداد پرداخت و ارسال به API اسپات‌پلیر جهت تولید خودکار لایسنس.
   - شورتکد `[sedrazavi_lesson_player]` با واترمارک داینامیک متحرک شماره تماس کاربر روی ویدیو.
2. **`class-vip-membership-paywall.php` (اشتراک طلایی، نقره‌ای و پی‌وال رسانه):**
   - مدیریت دوره‌های اشتراک (۱ ماهه، ۳ ماهه، ۱ ساله) و تاریخ انقضا در متای کاربر.
   - شورتکد قفل محتوا `[sedrazavi_vip_guard plan="gold"]`.
   - تولیدکننده توکن لینک دانلود موقت با زمان انقضا (`/sedrazavi/v1/download/{token}`) جهت جلوگیری از لو رفتن لینک مستقیم سرور فایل.
3. **`class-soft98-download-box.php` (جعبه دانلود پیشرفته نرم‌افزار):**
   - شورتکد `[sedrazavi_download_box]` شامل مشخصات فنی، نسخه، سیستم‌عامل (Windows/Mac/Android).
   - لینک‌های کمکی (سرور ایران / سرور خارج)، هش سلامت MD5/SHA256.
   - دکمه کپی رمز فایل با یک کلیک و دکمه ایجکس گزارش خرابی لینک.
4. **`class-magazine-editorial.php` (تحریریه خبری و مجله):**
   - نوار اخبار فوری (Breaking News Marquee Ticker).
   - محاسبه‌گر خودکار زمان تقریبی مطالعه بر مبنای واژگان فارسی.
   - نوار پیشرفت مطالعه در بالای صفحه.
5. **`class-dynamic-client-dashboard.php` (پورتال هوشمند کاربری چندمنظوره):**
   - تطبیق خودکار تب‌های پنل بر مبنای نوع صنف فعال:
     - در سایت آموزشی: نمایش لایسنس‌های اسپات‌پلیر و دوره‌های ثبت‌نامی.
     - در سایت اشتراکی: نمایش وضعیت روزهای باقی‌مانده و تمدید اشتراک.
     - در سایت دانلودی: نمایش سابقه دانلودها و فیلتر فایل‌های ذخیره‌شده.

#### فاز ۳: الگوهای بلاک گوتنبرگ و ویجت‌های المنتور
1. افزودن فایل‌های پترن بومی گوتنبرگ در `wordpress-theme/block-patterns/`:
   - `pattern-course-curriculum.php`
   - `pattern-soft98-download-box.php`
   - `pattern-vip-pricing-tiers.php`
   - `pattern-freemium-showcase.php`
   - `pattern-news-grid.php`
2. توسعه کامپوننت تعاملی فرانت‌اند `MultiNicheShowcaseSuite.tsx` در ری‌اکت جهت شبیه‌سازی و تست زنده قابلیت‌ها در پیش‌نمایش اپلیکیشن.
3. اعتبارسنجی و کامپایل (`compile_applet` و `lint_applet`).

---

### ۳. استراتژی داده و امنیت (Security & Data Integrity)

- تمامی اندپوینتهای REST دارای بررسی Nonce و صلاحیت کاربر (`permission_callback`) خواهند بود.
- شماره موبایل خریدار به صورت تصادفی در بازه‌های ۱۰ ثانیه‌ای روی پلیر جابجا می‌شود تا ضبط صفحه غیرممکن گردد.
- توکن‌های دانلود پس از ۲ ساعت منقضی می‌شوند و به IP کاربر مقید می‌گردند.
- لایسنس اسپات‌پلیر در دیتابیس به صورت امن کش می‌شود تا در صورت قطعی اینترنت، کاربر به دوره دسترسی داشته باشد.

---

### ۴. وضعیت اجرای گام‌ها (Execution Status - Completed)

- **فاز ۱ [تکمیل شد]:** بازنویسی و اصلاح کامل پایپ‌لاین `.github/workflows/build-and-release.yml` با محیط Bun، تصحیح مسیر تست دارایی‌ها به `app-dist/` و تولید ۴ آرشیو ZIP رسمی (`sedrazavi-theme.zip`, `sedrazavi-companion.zip`, `sedrazavi-child-themes.zip`, `sedrazavi-complete-suite.zip`). به‌روزرسانی مقدار `const REPO` به `Aqamirrazavi/Sedrazavi-WPtemplate`.
- **فاز ۲ [تکمیل شد]:** پیاده‌سازی و ثبت ۵ ماژول تخصصی اصناف در `sedrazavi-companion/includes/`:
  - `class-course-lms-bridge.php`: وب‌هوک اسپات‌پلیر و پلیر ویدیویی با واترمارک متحرک شماره موبایل کاربر.
  - `class-vip-membership-paywall.php`: پلن‌های اشتراک VIP، شورتکد قفل محتوا و توکن موقت دانلود ۲ ساعته.
  - `class-soft98-download-box.php`: جعبه دانلود چندسروره با کپی رمز، بج‌های سیستم‌عامل و گزارش خرابی ایجکس.
  - `class-magazine-editorial.php`: تیکر اخبار فوری و تخمین زمان مطالعه مقالات به فارسی.
  - `class-dynamic-client-dashboard.php`: پورتال هوشمند و تطبیق‌پذیر کاربری.
- **فاز ۳ [تکمیل شد]:** ایجاد ۵ پترن بلاک بومی گوتنبرگ در `wordpress-theme/block-patterns/`.
- **فاز ۴ [تکمیل شد]:** ساخت کامپوننت تعاملی `MultiNicheShowcaseSuite.tsx` در ری‌اکت و اتصال مستقیم آن به نوار فوقانی هدر و مودال معماری تم.
- **فاز ۵ [تکمیل شد]:** اعتبارسنجی کامل بیلد و تایپ‌اسکریپت با `compile_applet` و `lint_applet` با موفقیت ۱۰۰٪ و بدون خطا.
