# PHASE 3 — Unified Frontend Cockpit, Backend Unification, Strict Role Separation & Package Installer Hardening Report (SedRazavi v31)

> **تاریخ اجرا:** 2026-11-18  
> **فاز جاری:** `PHASE 3 — Unified Frontend Cockpit, Backend Unification, Strict Role Separation & Package Installer Hardening`  
> **وضعیت کلی فاز ۳:** سرویس مشترک حقیقت واحد (`SedRazavi_Ecosystem_Control_Service`) در `sedrazavi-companion` ایجاد و هر دو سمت Frontend Cockpit (`SedRazavi\Frontend_Cockpit_Engine`) و WP-Admin (`SedRazavi_Admin_Dashboard` v6.2.0) به آن متصل شدند؛ تفکیک سخت‌گیرانه نقش‌ها، تب محرمانه پرونده‌های حقوقی (`#tab-legal`) با Anti-IDOR، کاتالوگ واقعی نقش‌های اکوسیستم در `#tab-users`، صف ابری متصل به دیتابیس (`sr_cloud_queued_templates`)، دیالوگ تایید دسترس‌پذیر (`#sr-confirm-dialog` بدون `alert`/`confirm`) و نصاب سخت‌گیرانه افزونه‌ها با پشتیبانی GitHub HTTPS Allowlist، اعتبارسنجی SHA-256، بازرسی Zip Slip، پشتیبان‌گیری پیش از بازنویسی و بازگشت خودکار/دستی پیاده‌سازی، همگام‌سازی، بازبسته‌بندی و در سطح Node (`npm run test:all` — ۲۵ مجموعه تست، `test:v31-phase3` — ۱۷/۱۷ و `tsc --noEmit`) تأیید شدند (`STATICALLY_CHECKED` / `TESTED`). اجرای زنده PHP (`php -l`)، ورود چندنقشه وردپرس، تست زنده REST/AJAX و بازگشت بسته در سرور WordPress در این کانتینر به‌دلیل نبود باینری `php` و سرور وردپرس همچنان **`BLOCKED (PHP_NOT_INSTALLED)`** است.  
> **اسناد مرجع قبلی:** `docs/completion/PHASE_00_FORENSIC_AUDIT.md`, `docs/completion/PHASE_01_PHP_INTEGRITY_AND_BOOTSTRAP.md`, `docs/completion/PHASE_02_LEGAL_DOMAIN_AND_OWNERSHIP.md`

---

## ۱. خلاصه تغییرات کلیدی و دستاوردهای فاز ۳

### الف) تک‌منبع حقیقت اکوسیستم در افزونه (`SedRazavi_Ecosystem_Control_Service`)
1. **فایل جدید `sedrazavi-companion/includes/class-ecosystem-control-service.php`:**
   - بارگذاری‌شده در `sedrazavi-companion/sedrazavi-companion.php` با دسترسی واحد برای هم Frontend Cockpit و هم WP-Admin.
   - **حاکمیت نقش‌ها و ماتریس مجوزها (`get_user_role_tier()`, `get_ecosystem_role_catalog()`, `get_role_capability_matrix()`):** دسته‌بندی شفاف سطوح دسترسی (`admin`, `legal_staff`, `client`, `editor`, `subscriber`) و ارائه نقش‌های واقعی اکوسیستم (`sedrazavi_lawyer`, `sedrazavi_client`, `sr_client`, `editor`, `author`, `subscriber`, `administrator`).
   - **آمار زنده و Snapshot یکپارچه (`get_overview_snapshot()`):** تجمیع شمارش‌های واقعی پرونده‌های فعال (`sedrazavi_case` / `case`)، صف پذیرش در انتظار (`sedrazavi_legal_intake_records`)، نوبت‌های مشاوره (`sedrazavi_legal_appointments_records`)، افزونه‌های فعال، کیت‌های مستقرشده (`sr_cockpit_deployed_kits`) و قالب‌های صف‌ابری (`sr_cloud_queued_templates`).
   - **همگام‌سازی تنظیمات واحد (`get_unified_settings()`, `save_unified_settings()`):** هم‌ترازسازی هم‌زمان گزینه‌های برندینگ و درگاه و اطلاعات دفتر (`sedrazavi_primary_gold` / `sedrazavi_gold_color` / `sedrazavi_primary_color`، `sedrazavi_secondary_navy` / `sedrazavi_navy_color`، `sedrazavi_shetab_merchant_id` / `sedrazavi_zarinpal_merchant` و همگام‌سازی `set_theme_mod()` برای تلفن/ایمیل/نشانی دفتر).
   - **عملیات افزونه‌ها و صف ابری (`get_plugins_inventory()`, `toggle_plugin_status()`, `install_plugin_package()`, `rollback_plugin_package()`, `queue_cloud_template()`, `get_queued_cloud_templates()`):** اشتراک‌گذاری منطق واحد با محافظت کامل nonce/capability، اعتبارسنجی آدرس و SHA-256 و ذخیره وضعیت در WP Options.
   - **لینک مستقیم Frontend Cockpit (`get_frontend_cockpit_url()`):** یافتن خودکار برگه منتشرشده دارای شورت‌کد `[sedrazavi_frontend_cockpit]` برای ناوبری متقابل از پنل WP-Admin.
   - **وضعیت:** `IMPLEMENTED` / `STATICALLY_CHECKED`.

### ب) تفکیک سخت‌گیرانه نقش‌ها و تب محرمانه پرونده‌ها در Frontend Cockpit
1. **`sedrazavi-companion/includes/class-frontend-cockpit.php`:**
   - **کنترل دسترسی پرونده‌های حقوقی (`ajax_get_legal_cases()`, `ajax_save_legal_case()`, `ajax_delete_legal_case()`):** اتصال مستقیم به `SedRazavi_Case_Data_Service::can_create_or_manage_cases()` و `can_user_access_case()` با ذخیره قطعی پرونده‌ها به‌صورت `'post_status' => 'private'` و بدون تکیه بر `edit_posts`.
   - **تب جدید `#tab-legal`:** نمایش پرونده‌های حقوقی مجاز کاربر با فیلتر مالکیت در سطح سرور (وکلا پرونده‌های مجاز، موکلان صرفاً پرونده‌های متعلق به خود، و نقش‌های غیرحقوقی مسدود).
   - **محدودسازی کوئری CPTهای عمومی (`$cpt_query_args`):** کاربران غیر ویراستار (`!current_user_can('edit_others_posts')`) در تب محتوا صرفاً به نوشته‌های خود (`'author' => get_current_user_id()`) محدود می‌شوند.
   - **فهرست نقش‌های واقعی در `#tab-users`:** جایگزینی لیست ایستا با `SedRazavi_Ecosystem_Control_Service::get_ecosystem_role_catalog(true)` شامل نقش‌های حقوقی و موکلان اکوسیستم.
   - **همگام‌سازی `#tab-settings`:** مقداردهی اولیه فیلدهای تنظیمات از `SedRazavi_Ecosystem_Control_Service::get_unified_settings()` با حفظ fallback به `get_option()`.
   - **حذف کامل `alert()` / `confirm()` و دیالوگ دسترس‌پذیر:** افزودن `#sr-confirm-dialog` با `role="alertdialog"` و پشتیبانی صفحه‌کلید در `class-frontend-cockpit.php`, `assets/js/frontend-cockpit.js` و `assets/css/frontend-cockpit.css`.
   - **وضعیت:** `IMPLEMENTED` / `STATICALLY_CHECKED`.

### ج) یکپارچه‌سازی پنل مدیریت وردپرس (`SedRazavi_Admin_Dashboard` v6.2.0)
1. **`sedrazavi-companion/includes/class-admin-dashboard.php`:**
   - **بازطراحی کامل در ۶ تب عملیاتی (`health`, `archetype`, `branding`, `integrations`, `cloud`, `ecosystem`):**
     - لینک مستقیم به صفحه منتشرشده Frontend Cockpit در هدر پنل.
     - تب `health` متصل به شمارنده‌های زنده SSOT (`active_cases_count`, `pending_intake_count`, `appointments_count`, `active_plugins_count`, `deployed_kits_count`, `queued_cloud_count`) و خلاصه ماتریس RBAC/Anti-IDOR.
     - تب‌های `branding` و `integrations` متصل به `get_unified_settings()` و `save_unified_settings()`.
     - تب `cloud` با ثبت واقعی در دیتابیس از طریق `wp_ajax_sr_admin_queue_cloud_template` و نمایش وضعیت صف (`#sr-cloud-queued-badge`, `#sr-cloud-template-feedback`, دکمه‌های `.sr-cloud-insert-btn` با `data-template-id` و `data-title`).
     - تب `ecosystem` شامل کارت‌های مدیریت افزونه‌ها (`.sr-admin-pkg-card` با ورودی اختیاری URL امن و هش ۶۴ کاراکتری SHA-256، عملیات `toggle`, `install`, `rollback` از طریق `wp_ajax_sr_admin_plugin_action`)، جدول کیت‌های مستقرشده (`sr_cockpit_deployed_kits`) و جدول ماتریس تفکیک نقش‌ها؛ کاملاً عاری از `alert()` و `confirm()`.
2. **`sedrazavi-companion/sedrazavi-companion.php`:**
   - **رفع تداخل منوی مدیریت (`sedrazavi-companion-hub`):** محافظت تابع قدیمی `sedrazavi_companion_render_admin_dashboard` با شرط `if (class_exists('SedRazavi_Admin_Dashboard')) { return; }` تا ثبت دوگانه یا بازنویسی صفحه منوی `SedRazavi_Admin_Dashboard` رخ ندهد.

### د) سخت‌سازی نصاب بسته‌های افزونه، SHA-256، پیش‌پشتیبان و بازگشت (Installer Hardening)
1. **تضمین امنیت چندلایه در `SedRazavi_Ecosystem_Control_Service::install_plugin_package()` و `Frontend_Cockpit_Engine::ajax_install_plugin()` / `ajax_rollback_plugin()`:**
   - **لیست سفید HTTPS GitHub Allowlist:** محدودسازی منبع دانلود به دامنه/مسیر معتبر GitHub HTTPS.
   - **تطبیق اجباری هش SHA-256 (۶۴ کاراکتر هگز):** بررسی تطبیق `hash_file('sha256', ...)` پیش از استخراج در صورت ارائه یا پیکربندی.
   - **اعتبارسنجی آرشیو (`Archive_Security_Validator` + بازرسی `ZipArchive` پیش از `unzip_file`):** کنترل عبور مسیر (`Zip Slip` / `..`) و پسوندهای مجاز (`$allowed_exts`) پیش از بازکردن فایل فشرده.
   - **پشتیبان‌گیری پیش از بازنویسی و بازگشت (`sr_plugin_rollback_snapshot_*`):** تهیه نسخه پشتیبان پیش از جایگزینی پوشه افزونه، بازگشت خودکار (fail-closed auto-rollback) در صورت خطای استخراج، و ارائه اکشن صریح `rollback` در هر دو سمت Frontend Cockpit و WP-Admin.

---

## ۲. ماتریس راستی‌آزمایی و وضعیت کنترل‌های فاز ۳

| حوزه کنترل | روش بررسی انجام‌شده | نتیجه واقعی | وضعیت صادقانه |
| :--- | :--- | :---: | :---: |
| **سرویس SSOT اکوسیستم، نقش‌ها، کاتالوگ و همگام‌سازی تنظیمات** | تست ایستا (`scripts/test-v31-phase3-cockpit-installer.cjs` — گروه ۱) | `PASS` | `STATICALLY_CHECKED` |
| **تفکیک نقش‌ها، `#tab-legal` محرمانه، Anti-IDOR و `#tab-users` واقعی** | تست ایستا (`test:v31-phase3` گروه ۲ + `test:cockpit` ۳۹/۳۹) | `PASS` | `TESTED` (Node Static) |
| **پنل مدیریت ۶ تب v6.2.0، صف ابری واقعی و تب Ecosystem + حذف تداخل منو** | تست ایستا (`test:v31-phase3` گروه ۳ + اسکن عدم وجود `alert`/`confirm`) | `PASS` | `TESTED` (Node Static) |
| **نصاب سخت‌گیرانه (Allowlist، SHA-256، Zip Slip، Pre-Backup و Rollback)** | تست ایستا (`test:v31-phase3` گروه ۴ + `test:remediation`) | `PASS` | `TESTED` (Node Static) |
| **دیالوگ `#sr-confirm-dialog` و حذف کامل `alert`/`confirm` در JS/PHP** | تست ایستا (`test:v31-phase3` گروه ۵ + `test:cockpit`) | `PASS` | `TESTED` (Node Static) |
| **مجموعه کامل تست‌های Node و TypeScript** | `npm run test:all` (**۲۵ مجموعه تست**)، `test:v31-phase3` (**۱۷/۱۷**)، `test:phase1` (**۴۹/۴۹** روی ۴۲۹ فایل PHP)، `npm run lint` (`tsc --noEmit`) | `25 / 25 Suites PASS` و `0 TS Errors` | `TESTED` (Node / TS) |
| **بازبسته‌بندی و تطبیق هش آرشیوهای انتشار** | `sync:all` + `vite build` + `pack-theme-zips.cjs` + `sha256sum -c` | `26 / 26 ZIP OK` | `TESTED` |
| **اجرای زنده PHP، ورود نقش‌های متمایز، AJAX نصب/بازگشت و تست مرورگر وردپرس** | در دسترس نبودن باینری `php`، `wp-cli` و سرور WordPress در کانتینر | **اجرا نشد** | **`BLOCKED (PHP_NOT_INSTALLED)`** |

---

## ۳. فهرست فایل‌های تغییریافته و همگام‌سازی بسته‌ها

- **فایل‌های کد اضافه‌شده یا تغییریافته در فاز ۳:**
  - `sedrazavi-companion/includes/class-ecosystem-control-service.php` *(جدید — SSOT کنترل اکوسیستم، نقش‌ها، نصب و بازگشت افزونه، صف ابری و تنظیمات یکپارچه)*
  - `sedrazavi-companion/sedrazavi-companion.php` *(بارگذاری سرویس جدید + محافظت از تداخل منوی `sedrazavi-companion-hub`)*
  - `sedrazavi-companion/includes/class-admin-dashboard.php` *(ارتقا به v6.2.0 با ۶ تب عملیاتی، صف ابری متصل به دیتابیس و تب اکوسیستم)*
  - `sedrazavi-companion/includes/class-frontend-cockpit.php` *(تفکیک نقش، تب محرمانه `#tab-legal`، Anti-IDOR، کاتالوگ واقعی نقش‌ها، همگام‌سازی `#tab-settings`، دیالوگ دسترس‌پذیر و بازگشت نصاب)*
  - `sedrazavi-companion/assets/js/frontend-cockpit.js` *(اتصال تب حقوقی، اکشن rollback، دیالوگ تایید دسترس‌پذیر بدون `alert`/`confirm`)*
  - `sedrazavi-companion/assets/css/frontend-cockpit.css` *(استایل‌های تب حقوقی، کارت‌های نقش، مودال تایید دسترس‌پذیر و نشانگرهای وضعیت)*
  - `scripts/test-v31-phase3-cockpit-installer.cjs` *(جدید — ۱۷ چک پوششی ۵ گروه فاز ۳)*
  - `package.json` *(افزودن `test:v31-phase3` و اتصال به `test:all` — مجموعاً ۲۵ مجموعه تست)*
  - `src/data/wordPressThemeFiles.ts` و `src/data/wordPressPluginFiles.ts` *(همگام‌سازی خودکار با `npm run sync:all`)*
- **آرشیوها و شواهد انتشار:**
  - تمامی ۲۶ آرشیو ZIP در `public/*.zip` و `public/themes/*.zip` بازسازی شده و فایل `artifacts/evidence/v31.0.0/checksums.sha256` با `sha256sum -c` (**۲۶/۲۶ `OK`**؛ از جمله `sedrazavi-companion.zip` با هش `1a06e3bd4722dd710a32c44ac371afe0b3828d2cd2de3dc524a3679f27298807`) تأیید گردید.
