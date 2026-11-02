# مستندات و گزارش اصلاحات تکمیلی اکوسیستم المنتور و وردپرس SedRazavi OS v6.0

بر اساس نتایج بازرسی جامع، کلیه ۷ محور اصلاحی، بهینه‌سازی و امنیتی به صورت کامل، استاندارد و بدون وابستگی به فریم‌ورک‌های غیربومی اعمال و با ۱۱۲ آزمون خودکار راستی‌آزمایی گردید:

---

## ۱. اصلاح بسته‌بندی پوسته اصلی و تفکیک چایلدتم‌ها (Packaging Fix)
- **مشکل قبلی**: پوشه `wordpress-theme/child-themes/` (شامل ۸ چایلدتم تخصصی اصناف به حجم ۱۰.۷۶ مگابایت) به اشتباه درون فایل `sedrazavi-theme.zip` فشرده می‌شد و حجم پوسته اصلی را به حدود ۱۴ مگابایت افزایش می‌داد.
- **اصلاح انجام‌شده**:
  - قانون نادیده‌گیری `child-themes/` در `wordpress-theme/.distignore` درج شد.
  - اسکریپت‌های `scripts/pack-theme-zips.cjs` و `scripts/package-theme.js` به‌روزرسانی شدند تا پوشه `child-themes` از پوسته والد استثنا شود.
  - **نتیجه ملموس**: حجم فایل `sedrazavi-theme.zip` از **۱۴ مگابایت به ۳.۰۶ مگابایت** کاهش یافت و چایلدتم‌ها به‌صورت مجزا در پوشه `public/child-themes/` و درون پکیج جامع قرار گرفتند.

---

## ۲. یکپارچه‌سازی و همگام‌سازی خطوط لوله بیلد و بسته‌بندی (CI/CD Synchronization)
- خط لوله `scripts/package-theme.js` به‌طور کامل با `scripts/pack-theme-zips.cjs` همگام‌سازی شد.
- تمایز شفاف بین:
  - `elementor-addon-suite.zip`: افزونه عمومی و مستقل ویجت‌ها و بانک ۲۳ تمپلیت المنتور
  - `sedrazavi-addons.zip`: افزونه تخصصی مدیریت پرونده‌های حقوقی و رزرواسیون
  - `sedrazavi-companion.zip`: افزونه ابزارهای سیستمی و مدیریت توکن‌های طراحی
  - `sedrazavi-theme.zip`: پوسته والد سبک ۳ مگابایتی
  - `sedrazavi-complete-ecosystem.zip`: پکیج کامل همه اجزا

---

## ۳. پاک‌سازی فایل‌های مرحله‌ای و ارتقای `.gitignore`
- فایل‌های مرحله‌ای موقت (از جمله `elementor-widget-plugin-maker_1__ef79b26d.php`) از `public/assets/aistudio/` و `wordpress-theme/app-dist/aistudio/` به صورت قطعی حذف شدند.
- الگوهای `public/assets/aistudio/`، `wordpress-theme/app-dist/aistudio/` و `*.php.bak` به `.gitignore` و `.distignore` اضافه شدند تا هیچ فایل غیرتولیدی در توزیع یا مخزن وارد نشود.

---

## ۴. سخت‌گیری امنیتی در کنترل دسترسی‌های آجاکس (Security Hardening)
- در متدهای `ajax_import_templates` و `ajax_import_single_template` در فایل `elementor-addon-suite/includes/class-plugin.php`:
  - بررسی سطح دسترسی از `edit_posts` (که به نویسندگان عادی و مشارکت‌کنندگان اجازه می‌داد) به `manage_options` ارتقا یافت تا صرفاً مدیر کل وب‌سایت مجاز به درون‌ریزی ساختارهای تمپلیت باشد.

---

## ۵. بهینه‌سازی سرعت فعال‌سازی افزونه (Zero Timeout Activation)
- در کلاس `Universal_Elementor_Addon_Suite` و متد `on_activation`:
  - فراخوانی اجباری `Template_Importer::run_activation_import()` در لحظه فعال‌سازی حذف شد.
  - فعال‌سازی افزونه اکنون در کسر ثانیه (بدون ریسک PHP Timeout یا سربار حافظه) انجام می‌شود و فرآیند درون‌ریزی به انتخاب کاربر از طریق پیشخوان بصری «بانک الگوهای المنتور» واگذار شده است.

---

## ۶. ماژولار کردن کدهای جاوااسکریپت ویجت‌های لندینگ‌پیج
- تگ‌های اسکریپت درون‌خطی (`<script>`) و رویدادهای `onclick`/`oninput` از ویجت‌های زیر حذف شدند:
  1. `uas_pricing_switcher` (سوییچر تعرفه‌ها)
  2. `uas_fomo_countdown` (شمارش معکوس فوریت فروش)
  3. `uas_before_after` (اسلایدر قبل و بعد)
- فایل‌های اختصاصی جاوااسکریپت در مسیر `elementor-addon-suite/assets/js/widgets/` ایجاد و استاندارد شدند:
  - `pricing-switcher.js`
  - `fomo-countdown.js`
  - `before-after.js`
- هر ویجت با متد `get_script_depends()` به هندل اسکریپت خود متصل گردید و هوک استاندارد المنتور `elementorFrontend.hooks.addAction('frontend/element_ready/...')` پیاده‌سازی شد تا در پیش‌نمایش زنده ویرایشگر المنتور نیز بی‌درنگ پاسخگو باشد.

---

## ۷. یکنواخت‌سازی نسخه و شناسنامه پوسته والد
- فایل `wordpress-theme/style.css` به نسخه `6.0.0` ارتقا یافت.
- توضیحات محدود و اختصاصی وکالت با توصیف استاندارد و چندصنفی سیستم‌عامل `SedRazavi OS v6.0` جایگزین شد.

---

## وضعیت راستی‌آزمایی و بیلد
- **آزمون‌های خودکار**: ۱۱۲ از ۱۱۲ آزمون با موفقیت ۱۰۰٪ پاس شدند (`npm run test:all`).
- **لینتر تایپ‌اسکریپت**: بدون خطا (`tsc --noEmit`).
- **کامپایل پروژه**: موفق (`compile_applet`).
- **بسته‌های نصبی ZIP**: با ساختار استاندارد وردپرس تولید و در ریشه و `public/` در دسترس هستند.
