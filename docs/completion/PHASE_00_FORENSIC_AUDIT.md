# PHASE 0 — Forensic Audit & Truth Baseline (SedRazavi v31 Legal WordPress & Elementor Completion)

> **تاریخ ممیزی:** 2026-11-17  
> **حالت اجرا:** `PHASE 0` (فقط ممیزی خواندنی و ثبت خط مبنای حقیقت — بدون تغییر در کد محصول)  
> **مبنای وضعیت کانتینر:** محیط دارای Node.js / Vite / TypeScript / JSZip است؛ باینری `php` (`PHP_NOT_INSTALLED`)، `wp` (WP-CLI)، `docker` و متادیتای `.git` در این کانتینر موجود نیستند.  
> **فهرست وضعیت‌های مجاز:** `PLANNED` | `IMPLEMENTED` | `STATICALLY_CHECKED` | `TESTED` | `VERIFIED` | `BLOCKED`

---

## ۱. چک‌لیست حقیقت محیط و مخزن (Environment & Repository Baseline)

- **Branch / Commit محلی:** Workspace snapshot بدون پوشه `.git` (`artifacts/evidence/v31.0.0/commit.txt`؛ آخرین کامیت گزارش‌شده در ممیزی مخزن: `2fde0e3` — `chore: finalize 12 phases and package ecosystem`).
- **فایل‌های PHP اسکن‌شده در ممیزی ایستای ساختار:** ۴۲۷ فایل `.php` در ۷ دایرکتوری اصلی (`wordpress-theme`, `standalone-themes`, `sedrazavi-companion`, `elementor-addon-suite`, `sedrazavi-addons`, `sedrazavi-designer-core`, `sedrazavi-designer-theme`).
- **ابزارهای اجرای زنده (`php -l`, WordPress, Elementor Editor, Docker):** در این کانتینر در دسترس نیستند (`BLOCKED` — `PHP_NOT_INSTALLED`). تمامی نتایج تست‌های Node/JSZip/TSC/Vite صراحتاً در سطح `STATICALLY_CHECKED` یا `TESTED` ثبت می‌شوند و هیچ موردی بدون اجرای واقعی در WordPress + Elementor برچسب `VERIFIED` نمی‌گیرد.

---

## ۲. یافته‌های بحرانی ممیزی (Critical Forensic Findings)

### الف) خطای نحوی قطعی PHP در هر ۸ پوسته مستقل (`P0 — Parse Error`)
- **محل دقیق:**
  - `standalone-themes/sedrazavi-lawyer-theme/functions.php` (خط ۲۵)
  - `standalone-themes/sedrazavi-legal-theme/functions.php` (خط ۳۳)
  - و ۶ پوسته مستقل دیگر (`agency` خط ۴۵، `clinic` خط ۳۱، `corporate` خط ۳۳، `education` خط ۳۱، `news` خط ۴۱، `store` خط ۳۳)
- **علت ریشه‌ای:** در `scripts/convert-to-standalone-themes.cjs` (خط ۳۴۰)، عبارت باقاعده تنبل `[\s\S]*?\}` شاخه اول `if (...) { ... }` را پاک کرده و شاخه `elseif (file_exists(dirname(get_template_directory()) . '/inc/frontend-cockpit-engine.php')) { ... }` را **بدون هیچ `if` متناظری** بلافاصله پس از `});` رها کرده است.
- **پیامد:** خطای قطعی PHP (`Parse error: syntax error, unexpected token "elseif"`) و از کار افتادن کامل پوسته به‌محض فعال‌سازی در وردپرس. تست‌های فعلی JSZip این خطا را کشف نکردند چون `php -l` در کانتینر اجرا نشده است.

### ب) وضعیت غیرمنتوری و داده‌های جعلی در پوسته‌های حقوقی (`P0/P1 — Legal Parity & Mock Data`)
1. **قالب جایگزین غیرمرتبط در پوسته وکالت و حقوقی:**
   - `standalone-themes/sedrazavi-lawyer-theme/page.php` (خط ۱۳) و `index.php` در نبود محتوای المنتور به جای قالب اختصاصی حقوقی، `template-home-corporate-pro` را فراخوانی می‌کنند.
   - `standalone-themes/sedrazavi-legal-theme/page.php` (خط ۱۳) و `index.php` نیز از `template-home-saas-master` استفاده می‌کنند.
   - پوشه `standalone-themes/sedrazavi-lawyer-theme` فقط ۹ فایل عمومی دارد و فاقد صفحات/قالب‌های اختصاصی حقوقی است.
2. **داده‌های ثابت (Mock Data) در داشبورد حقوقی:**
   - `standalone-themes/sedrazavi-legal-theme/page-dashboard.php` (خطوط ۴۰، ۴۵، ۵۰) مقادیر ثابت HTML (`۰۲` پرونده جاری، `۱۴ آبان ۱۴۰۵` جلسه آینده، `تسویه مرحله دوم`) را به‌جای خواندن از سرویس داده پرونده‌ها یا دیتابیس نمایش می‌دهد.
   - `sedrazavi-companion/includes/class-legal-intake-appointments.php` (خطوط ۲۴۰–۲۸۰) هنگام خالی بودن `sedrazavi_legal_intake_records` به‌صورت خودکار رکوردهای دمو («مهندس آرش طاهری»، «خانم نگار کریمی»، «شرکت فناوران آریا») تزریق می‌کند.
3. **صفحات اصلی پوسته مادر (`wordpress-theme/`) همچنان PHP/HTML + شورت‌کد React هستند:**
   - `wordpress-theme/template-parts/front-legal.php` (۱۰۰۵ خط HTML ثابت + Tailwind + آمار ثابت `۱۲۸۰+` و `۹۸٪`)، `page-dashboard.php` (وابسته به `[sedrazavi_react_dashboard]` و `[sedrazavi_react_admin_portal]`)، `page-client-portal.php` (`[sedrazavi_client_portal]`)، `page-tracking.php` (فرم HTML دستی با اسکریپت inline) و `page-intake.php` (HTML دستی با Tailwind) هنوز به‌عنوان اسناد واقعی Elementor (`_elementor_data` + Flexbox Containers) پیاده‌سازی نشده‌اند.

### ج) گسست مدل داده، پراکندگی CPTها و رخنه‌های مجوز (`P0/P1 — Domain Model & Anti-IDOR`)
1. **تعدد و تعارض Slugهای CPT:**
   - پرونده حقوقی تحت **۵ نام مختلف** دیده می‌شود: `sedrazavi_case` (استاندارد در `SedRazavi_Case_Data_Service` و `sedrazavi-addons`)، `case` (alias در `functions.php`)، `arbitration_case` (`arbitration-cpt.php`)، `sedrazavi_dashboard` (`class-sedrazavi-dashboard.php`)، و `sr_case` (`class-instant-search.php` خط ۵۸/۷۲ با `post_status => 'publish'`!).
   - خدمات تحت ۴ نام: `services` (`Frontend_Cockpit_Engine` و `designer-core`)، `service` (`functions.php` و `sedrazavi-addons`)، `lawyer_service` (`rest-api.php`)، و `sr_service` (`class-instant-search.php`).
   - نوبت‌دهی تحت ۲ CPT (`sedrazavi_appointment`, `sedrazavi_booking`) به‌همراه `wp_options` (`sedrazavi_legal_appointments_records` / `sedrazavi_legal_intake_records`).
2. **گسست `Frontend_Cockpit_Engine` از سیستم پرونده‌های حقوقی:**
   - `sedrazavi-companion/includes/class-frontend-cockpit.php` (خطوط ۲۰۴–۲۰۶ و ۱۳۱۲) فقط `['post', 'portfolio', 'services', 'case_study']` را مدیریت می‌کند و هیچ اتصالی به `sedrazavi_case` / `SedRazavi_Case_Data_Service` ندارد.
   - مجوز `ajax_save_cpt_post()` در Cockpit متکی به `edit_posts` است و فاقد نگاشت مجوزهای اختصاصی پرونده‌هاست.
3. **باگ باقی‌مانده مجوز در پورتال پرونده‌ها:**
   - `sedrazavi-companion/includes/class-legal-matter-portal.php` (خط ۴۱۵) در متد `is_staff_user()` هنوز از `current_user_can('edit_posts')` استفاده می‌کند؛ یعنی کاربران Contributor/Author وردپرس می‌توانند به‌عنوان Staff تلقی شوند و از کنترل مالکیت Anti-IDOR عبور کنند! همچنین داده را هم از `wp_options` (`sedrazavi_legal_matters_records`) و هم از `get_posts` می‌خواند بدون فراخوانی `SedRazavi_Case_Data_Service::can_user_access_case()`.

### د) شکاف یکپارچگی Frontend / Backend و نصب‌کننده افزونه (`P1 — Unified Cockpit & Package Installer`)
- **دوپارگی پنل ادمین و فرانت‌اند:**
  - `SedRazavi_Admin_Dashboard` (`class-admin-dashboard.php`) در WP Admin فقط تب‌های سلامت، صنف، پالت، پیامک/شتاب و کاتالوگ ابری دارد و فاقد مدیریت پرونده‌ها، کاربران، نصب افزونه و Site Kit Builder است.
  - در مقابل، `Frontend_Cockpit_Engine` در فرانت‌اند مدیریت CPT عمومی، کاربران، نصب افزونه، Site Kit و تنظیمات برند را دارد اما به پرونده‌های حقوقی (`sedrazavi_case`)، نوبت‌دهی، مدارک، صورت‌حساب‌ها و تنظیمات فنی بک‌اند متصل نیست و سرویس واحدی بین آن دو به اشتراک گذاشته نشده است.
- **محدودیت `ajax_install_plugin()` در Cockpit (`class-frontend-cockpit.php` خطوط ۷۷۹–۸۸۹):**
  - فقط ۴ شناسه افزونه داخلی (`sedrazavi-designer-core`, `elementor-addon-suite`, `sedrazavi-addons`, `sedrazavi-companion`) را از ۴ مسیر محلی فایل‌سیستم می‌خواند.
  - اگرچه بررسی Zip-Slip / اندازه / پسوند را انجام می‌دهد، اما به `Package_Manifest_Validator`، بررسی SHA-256 checksum، منشأ تأییدشده GitHub/URL مجاز، Dependency Resolver و Atomic Rollback موجود در `Package_Manager` متصل نیست.

### هـ) وضعیت قالب‌ها، ویجت‌های Elementor و خطای CI قبلی
- **ویجت‌ها و قالب‌های Elementor:** ۳۱ کلاس `Widget_Base` در `elementor-addon-suite/includes/widgets/` و ۳۳ قالب JSON (`۳۰` قالب + `۳` پاپ‌آپ) در `elementor-addon-suite/templates/` موجودند و تمام ۳۱ ویجت در قالب‌ها قرار گرفته‌اند (`audit-reconcile-evidence.cjs`). با این حال:
  - ویجت‌ها و قالب‌ها به‌صورت ایستا بررسی شده‌اند و اجرای واقعی در Elementor Editor (باز کردن، ویرایش، ذخیره، بازخوانی و رندر زنده) هنوز انجام نشده (`BLOCKED` / `NOT_RUN`).
  - برای صفحات اختصاصی دفتر وکالت (صفحه اصلی وکیل، فهرست و جزئیات پرونده، داشبورد موکل/وکیل، رزرو جلسه حقوقی) هنوز کیت صفحات حقوقی بومی مبتنی بر Dynamic Tags و اتصال به `sedrazavi_case` جایگزین فایل‌های `front-legal.php` / `page-dashboard.php` نشده است.
- **وضعیت CI و Checksum:** در تست محلی پس از فاز ۱۲، ۲۶ آرشیو ZIP با `checksums.sha256` همگام شده‌اند (`TESTED` محلی)، اما در CI گزارش‌شده روی کامیت `2fde0e3` چهار چک‌سام ZIP شکست خورده و Job `wp-live-e2e` اجرا نشده (Skip) است؛ این عدم هم‌ترازی هنگام بیلد در Runnerهای CI باید در فاز ۱/۶/۸ بازنگری و تثبیت شود.

---

## ۳. ماتریس حقیقت وضعیت کل سیستم (Truth Baseline Matrix)

| زیرسیستم / قابلیت | وضعیت فعلی | شواهد واقعی موجود در کد | مانع / شکاف تا هدف نهایی (v31 Legal Completion) |
| :--- | :---: | :--- | :--- |
| **نحو PHP و بوت‌استرپ پوسته‌های مستقل (۸ پوسته)** | `BLOCKED` | وجود `elseif` بدون `if` در تمام ۸ فایل `standalone-themes/*/functions.php` ناشی از باگ `convert-to-standalone-themes.cjs` | خطای قطعی Parse Error در PHP؛ نیاز به اصلاح فوری در فاز ۱ و اجرای `php -l` روی تمام ۴۲۷ فایل |
| **پوسته مادر (`wordpress-theme`) و بوت‌استرپ افزونه‌ها** | `STATICALLY_CHECKED` | بوت‌استرپ ماژولار با `file_exists` و `try/catch` در `sedrazavi-companion.php` و قلاب‌های multisite | عدم اجرای `php -l` و نصب تمیز وردپرس بدون Docker (`PHP_NOT_INSTALLED`) |
| **مدل داده حقوقی (`sedrazavi_case`) و سرویس مالکیت** | `IMPLEMENTED` / `STATICALLY_CHECKED` | `SedRazavi_Case_Data_Service` و نقش `sedrazavi_lawyer` با وضعیت `private` و تست Node AST | تعارض ۵ slug پرونده (`sr_case` و...)، تعدد slug خدمات، و باگ `edit_posts` در `class-legal-matter-portal.php` |
| **پورتال موکل (`class-legal-matter-portal.php`)** | `IMPLEMENTED` | مسیرهای REST `/matters/*`، توکن امضاشده ۱۵ دقیقه‌ای، audit trail | تکیه به `edit_posts` در `is_staff_user()`، ذخیره دوگانه در `wp_options`، نبود تست زنده WP |
| **پذیرش و نوبت‌دهی (`class-legal-intake-appointments.php`)** | `STATICALLY_CHECKED` | `/intake/submit`, `/appointments/slots`, `/appointments/book`, honeypot, rate-limit, WP Privacy hooks | تزریق خودکار رکوردهای دمو در صف خالی؛ عدم اتصال به مدل واحد پرونده‌ها و UI المنتوری |
| **ویجت‌های سفارشی Elementor (`31` کلاس `Widget_Base`)** | `STATICALLY_CHECKED` | ۳۱ ویجت ثبت‌شده در `Plugin::get_widgets_map()` و جایگذاری ۳۱/۳۱ در ۳۳ JSON؛ توکن‌های طراحی Phase 4 | عدم اجرای واقعی در Elementor Editor (drag/style/save/reload) و تست رندر فرانت‌اند |
| **قالب‌های Elementor (`33` JSON) و صفحات حقوقی سایت** | `STATICALLY_CHECKED` | ۳۳ JSON کانتینری معتبر و پل `Theme_Builder_Bridge` با پرچم `OPTIONAL_PRO` (۴ قالب) | صفحات حقوقی (`front-legal.php`, `page-dashboard.php`, `sedrazavi-lawyer-theme/page.php`) همچنان به HTML ثابت یا `corporate-pro` وابسته‌اند |
| **بلوک‌های Gutenberg (`7 block.json` + `3` الگو)** | `STATICALLY_CHECKED` | ثبت‌شده در `Gutenberg_Blocks` و هم‌تراز با `tokens.json` و `theme.json` | عدم تست زنده در Block Editor وردپرس (`wp.serverSideRender`) |
| **پنل فرانت‌اند (`Frontend_Cockpit_Engine`)** | `TESTED` (Node Static) | مدیریت CPT عمومی، کاربران، CSV، نصب محلی ۴ افزونه، Site Kit Builder و Rollback | عدم اتصال به `sedrazavi_case` / پرونده‌های حقوقی؛ جدایی کامل از منو و قابلیت‌های بک‌اند WP Admin |
| **پنل بک‌اند (`SedRazavi_Admin_Dashboard`)** | `IMPLEMENTED` | تب‌های سلامت، صنف، پالت، پیامک/شتاب و کاتالوگ در WP Admin | عدم هم‌ترازی با ماژول‌های مدیریت پرونده، کاربران، Site Kit و مدیریت بسته‌های Cockpit |
| **نصب‌کننده و مدیر بسته‌ها (`Package_Manager` — ۶ کلاس)** | `TESTED` (Node + JSZip) | اعتبارسنجی Manifest، SHA-256، Anti-Zip-Slip، Dependency Resolver و Atomic Rollback | عدم اتصال کامل به `ajax_install_plugin()` در Cockpit؛ عدم پشتیبانی از منشأ آنلاین تأییدشده و مهاجرت Site A -> B |
| **سیستم طراحی (Tokens، Light/Dark، RTL/LTR، A11y)** | `STATICALLY_CHECKED` | `tokens.json`، `variables.css`، Active Kit Sync، `:focus-visible`، `prefers-reduced-motion` | تکمیل استاندارد تمام کامپوننت‌های داشبورد حقوقی (جداول، مدال، آپلود فایل، حالت‌های Empty/Loading/Error) |
| **چرخه نقد و بازطراحی UX/UI با Screenshot** | `BLOCKED` | ممیزی کد و تست‌های ایستا انجام شده؛ ابزار `playwright-cli` آماده است اما روی وردپرس زنده اجرا نشده | نیازمند حداقل ۳ دور Screenshot + نقد تخصصی روی دسکتاپ/تبلت/موبایل پس از اجرای وردپرس (`BLOCKED_VISUAL_REVIEW` تا آماده‌سازی محیط/صفحات) |
| **بسته‌بندی، شواهد انتشار، SBOM و CI Checksums** | `TESTED` (Node محلی) / `BLOCKED` (Live E2E) | ۲۶ ZIP محلی با `checksums.sha256` و `test:all` گذراندند؛ مستندات v31 موجود | خطای CI در کامیت `2fde0e3` (عدم تطابق ۴ چک‌سام در Runner) و عدم اجرای Docker `wp-live-e2e` |

---

## ۴. نقشه گام بعدی و پیش‌نیاز عبور از Gate 0

- **وضعیت پیشرفت فاز ۰:** ۱۰۰٪ ممیزی حقیقت تکمیل و در این سند ثبت شد (**بدون هیچ‌گونه تغییر در کدهای اجرایی در طول فاز ۰**).
- **موارد `BLOCKED` در محیط فعلی:** اجرای `php -l`، تست‌های زنده WordPress، Elementor Editor و Docker `wp-live-e2e` تا فراهم شدن محیط PHP/Docker به صورت غیرقابل‌عبور `BLOCKED` می‌مانند؛ اما **تمام خطاهای PHP قابل‌رفع در کد، اصلاح مدل داده، اتصال سرویس‌ها، بازطراحی صفحات حقوقی Elementor، همگام‌سازی Cockpit/Admin و تثبیت CI** قابل اجرا در فازهای ۱ تا ۹ هستند.
- **دروازه خروج (Gate 0):** منتظر تأیید کاربر برای آغاز **Phase 1 — PHP Integrity, Bootstrap & Clean Installation** (رفع باگ `elseif` در `convert-to-standalone-themes.cjs` و هر ۸ پوسته مستقل، پاک‌سازی خطاهای نحوی/Include/Namespace تمام فایل‌های PHP، کنترل ترتیب بارگذاری افزونه‌ها و سازگاری با نبود/وجود Elementor Free/Pro، و بازسازی بسته‌ها).
