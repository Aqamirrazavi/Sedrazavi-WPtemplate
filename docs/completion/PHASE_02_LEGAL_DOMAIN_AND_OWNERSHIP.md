# PHASE 2 — Legal Domain Model, Data Persistence & Anti-IDOR Ownership Hardening Report (SedRazavi v31)

> **تاریخ اجرا:** 2026-11-18  
> **فاز جاری:** `PHASE 2 — Legal Domain Model, Data Persistence & Anti-IDOR Ownership Hardening`  
> **وضعیت کلی فاز ۲:** تمام اصلاحات دامنه حقوقی، یکپارچه‌سازی SSOT مالکیت در افزونه و پوسته، حذف کامل داده‌های جعلی/تزریقی و سخت‌سازی کنترل دسترسی Anti-IDOR پیاده‌سازی، بازبسته‌بندی و در سطح Node (`npm run test:all` و `test:v31-phase2`) آزمایش شدند (`STATICALLY_CHECKED` / `TESTED`). اجرای زنده PHP/WordPress REST و تست نفوذ واقعی Anti-IDOR بین کاربران متمایز در این کانتینر به‌دلیل نبود باینری `php` و سرور وردپرس همچنان **`BLOCKED` (`PHP_NOT_INSTALLED`)** است.  
> **اسناد مرجع قبلی:** `docs/completion/PHASE_00_FORENSIC_AUDIT.md`, `docs/completion/PHASE_01_PHP_INTEGRITY_AND_BOOTSTRAP.md`

---

## ۱. خلاصه تغییرات کلیدی و رفع آسیب‌پذیری‌های P0/P1

### الف) تک‌منبع حقیقت پرونده‌ها و مجوزهای اختصاصی وکالت در سطح افزونه (`Plugin SSOT`)
1. **ایجاد سرویس واحد `SedRazavi_Case_Data_Service` در `sedrazavi-companion`:**
   - **محل:** `sedrazavi-companion/includes/class-case-data-service.php` (بارگذاری‌شده در `sedrazavi-companion/sedrazavi-companion.php` همراه با ثبت مجوزها روی هوک `init` با اولویت `5`) و هم‌ترازسازی کامل نسخه محافظت‌شده در `wordpress-theme/inc/class-case-data-service.php` با شرط `if (!class_exists('SedRazavi_Case_Data_Service'))`.
   - **دستاورد:** پوسته‌های مستقل یا ثالث دیگر وابسته به پوسته مادر نیستند و از همان سرویس واحد برای CPT محرمانه `sedrazavi_case`، مجوزهای اختصاصی (`sedrazavi_manage_cases`, `sedrazavi_view_cases`, `sedrazavi_view_all_cases`, `sedrazavi_create_cases`, `sedrazavi_view_own_cases`)، متدهای `is_privileged_legal_staff()`، `can_user_access_case()`، `can_user_access_matter_record()` و لیست CPTهای محرمانه `get_confidential_cpts()` استفاده می‌کنند.
   - **وضعیت:** `IMPLEMENTED` / `STATICALLY_CHECKED`.

### ب) رفع رخنه ارتقای دسترسی (`edit_posts` Bypass) و سخت‌سازی Anti-IDOR
1. **`sedrazavi-companion/includes/class-legal-matter-portal.php`:**
   - **حذف رخنه P0:** حذف کامل `current_user_can('edit_posts')` از `is_staff_user()` (جلوگیری از دسترسی Contributor/Author به تمام پرونده‌ها و اسناد محرمانه).
   - **حاکمیت Anti-IDOR یکپارچه:** معرفی `resolve_user_id()`, `can_access_matter()`, و اتصال مستقیم به `SedRazavi_Case_Data_Service::can_user_access_matter_record()` و متاهای `_sedrazavi_client_user_id`, `_client_user_id`, `_sedrazavi_assigned_lawyer_id`, `_sedrazavi_client_portal_id`, و `post_author`.
   - **کنترل اتصال سند به پرونده (`is_document_bound_to_matter`):** در `/matters/download-token` و `/matters/secure-file` علاوه‌بر بررسی امضای HMAC و انقضای ۱۵ دقیقه‌ای (`base64_decode(..., true)`)، تعلق واقعی `document_id` به اسناد پرونده (`_sedrazavi_documents` یا پیوست `attachment->post_parent`) و تطابق نشست فعال بررسی می‌شود.
2. **`wordpress-theme/inc/class-sedrazavi-dashboard.php` و `wordpress-theme/inc/arbitration-cpt.php`:**
   - تغییر `capability_type` در هر دو CPT محرمانه `sedrazavi_dashboard` و `arbitration_case` از `'post'` به `['sedrazavi_case', 'sedrazavi_cases']` به‌همراه `'map_meta_cap' => true` و حفظ `'show_in_rest' => false`.
   - تغییر سطح دسترسی زیرمنوهای داشبورد وکیل از `'manage_options'` عمومی به `'sedrazavi_manage_cases'` (اعطاشده به Administrator و `sedrazavi_lawyer`).
3. **`wordpress-theme/inc/class-realtime-notifications.php`:**
   - جداسازی کامل CPT لیدها (`uas_lead`) از REST API عمومی وردپرس (`'show_in_rest' => false`, `'publicly_queryable' => false`, `'exclude_from_search' => true`, `'capability_type' => ['sedrazavi_case', 'sedrazavi_cases']`, `'map_meta_cap' => true`).
   - حذف کامل `current_user_can('edit_posts')` از `ajax_poll_leads()`, `ajax_mark_lead_read()` و `add_realtime_admin_bar_bell()` و جایگزینی با `can_manage_leads()` مبتنی بر `SedRazavi_Case_Data_Service::is_privileged_legal_staff()` و `manage_appointments`.
4. **`sedrazavi-companion/includes/class-instant-search.php` و `class-role-manager.php`:**
   - حذف `'sr_case'`، `'sr_course'` و `'sr_service'` از جستجوی عمومی `/sedrazavi/v1/search` و اعمال فیلتر قطعی `SedRazavi_Case_Data_Service::get_confidential_cpts()`.
   - پوشش هر دو نقش موکل (`sr_client` و `sedrazavi_client`) در `restrict_admin_access_by_role()`.
5. **`sedrazavi-addons/includes/case-tracking.php` و `class-sedrazavi-odr-arbitration.php`:**
   - یکپارچه‌سازی `sedrazavi_ajax_track_case()` با پشتیبانی امن از `nonce` / `security`، تطبیق زمان‌ثابت `hash_equals()` برای کدملی و شماره موبایل روی `SedRazavi_Case_Data_Service::get_litigation_post_types()` (`sedrazavi_case`, `case`).
   - واگذاری بررسی مالکیت لوایح داوری (`ajax_submit_pleading`) و صدور رأی (`ajax_issue_award`) به متدهای `SedRazavi_Case_Data_Service`.

### ج) حذف کامل داده‌های جعلی و اتصال جداول به دیتابیس واقعی (Zero Mock PII)
1. **`sedrazavi-companion/includes/class-legal-intake-appointments.php`:**
   - حذف کامل تزریق خودکار ۳ رکورد جعلی («مهندس آرش طاهری»، «خانم نگار کریمی»، «شرکت فناوران آریا») از `rest_get_triage_queue()`.
   - افزودن مجوز استاندارد `sedrazavi_view_cases` + `SedRazavi_Case_Data_Service::is_privileged_legal_staff()` (با حفظ سازگاری `view_sedrazavi_cases`)، افزودن لیست سفید وضعیت‌های مجاز تریاژ (`allowed_statuses`) و جایگزینی `date()` با `gmdate()`.
2. **`wordpress-theme/inc/class-sedrazavi-dashboard.php`:**
   - جایگزینی کامل ردیف‌های جعلی در `render_bookings_tab()` (دکتر حمید علوی، مریم کاظمی)، آمار ثابت `render_invoices_tab()` (۱۸۵,۰۰۰,۰۰۰ تومان، ۲۴ فاکتور) و `render_emails_tab()` (شرکت توسعه پارس / `info@devpars.com`) با کوئری‌های زنده WP CPT، `sedrazavi_legal_appointments_records`، `sedrazavi_legal_intake_records` و جداول `sedrazavi_consultations` / `sedrazavi_payments` به‌همراه وضعیت صادقانه «خالی».
3. **`wordpress-theme/inc/dashboard.php` و `standalone-themes/sedrazavi-legal-theme/page-dashboard.php`:**
   - حذف پیش‌فرض ثابت `?? 48`، آمارهای ساختگی `۶ / ۲ / ۴` و ردیف‌های «مهندس رضا تبریزی» / «دکتر سارا پارسا» در `inc/dashboard.php` و اتصال به `SedRazavi_Case_Data_Service::count_active_cases()` و کوئری‌های واقعی جلسات، مواعد و نوبت‌ها.
   - جایگزینی اعداد ثابت `۰۲`، `۱۴ آبان ۱۴۰۵` و `تسویه مرحله دوم` در `standalone-themes/sedrazavi-legal-theme/page-dashboard.php` با احراز هویت `is_user_logged_in()` و فیلتر پرونده‌های مالک‌شده کاربر via `SedRazavi_Case_Data_Service::can_user_access_case()`.

---

## ۲. ماتریس راستی‌آزمایی و وضعیت کنترل‌های فاز ۲

| حوزه کنترل | روش بررسی انجام‌شده | نتیجه واقعی | وضعیت صادقانه |
| :--- | :--- | :---: | :---: |
| **سرویس SSOT دامنه پرونده و مجوزها (`sedrazavi-companion` + `wordpress-theme`)** | تست ایستا (`scripts/test-v31-phase2-legal-domain.cjs`, `test-mandatory-audit-remediation.cjs`) | `PASS` | `STATICALLY_CHECKED` |
| **حذف `edit_posts`، جداسازی CPTهای محرمانه و Anti-IDOR پورتال/داوری/لید** | تست کامل `npm run test:all` (**۲۴ مجموعه تست**) | `24 / 24 Suites PASS` | `TESTED` (Node Static) |
| **حذف داده‌های جعلی (Intake, Dashboard Tabs, Legal Standalone Portal)** | اسکن عدم وجود رشته‌های جعلی + بررسی کوئری‌های DB (`test:v31-phase2`) | `10 / 10 PASS` | `TESTED` (Node Static) |
| **سلامت نحوی PHP و همگام‌سازی بسته‌ها** | `test:phase1` روی ۴۲۸ فایل PHP + بازسازی و تطبیق SHA-256 همه ۲۶ ZIP | `49 / 49 PASS` و `26 / 26 OK` | `STATICALLY_CHECKED` / `TESTED` |
| **اجرای زنده Anti-IDOR REST/AJAX بین دو موکل متمایز و Contributor** | در دسترس نبودن باینری `php`، `wp-cli` و سرور WordPress در کانتینر | **اجرا نشد** | **`BLOCKED (PHP_NOT_INSTALLED)`** |

---

## ۳. فهرست فایل‌های تغییریافته و همگام‌سازی بسته‌ها

- **فایل‌های کد تغییریافته یا اضافه‌شده در فاز ۲:**
  - `sedrazavi-companion/includes/class-case-data-service.php` *(جدید — Plugin SSOT)*
  - `sedrazavi-companion/sedrazavi-companion.php`
  - `sedrazavi-companion/includes/class-legal-matter-portal.php`
  - `sedrazavi-companion/includes/class-legal-intake-appointments.php`
  - `sedrazavi-companion/includes/class-instant-search.php`
  - `sedrazavi-companion/includes/class-role-manager.php`
  - `wordpress-theme/inc/class-case-data-service.php`
  - `wordpress-theme/inc/class-sedrazavi-dashboard.php`
  - `wordpress-theme/inc/dashboard.php`
  - `wordpress-theme/inc/arbitration-cpt.php`
  - `wordpress-theme/inc/class-realtime-notifications.php`
  - `sedrazavi-addons/includes/case-tracking.php`
  - `sedrazavi-addons/includes/class-sedrazavi-odr-arbitration.php`
  - `standalone-themes/sedrazavi-legal-theme/page-dashboard.php`
  - `scripts/test-v31-phase2-legal-domain.cjs` *(جدید — اسکریپت تست فاز ۲)*
  - `package.json` *(افزودن `test:v31-phase2` و اتصال به `test:all`)*
  - `src/data/wordPressThemeFiles.ts` و `src/data/wordPressPluginFiles.ts` *(همگام‌سازی خودکار با `npm run sync:all`)*
- **آرشیوها و شواهد انتشار:**
  - تمامی ۲۶ آرشیو ZIP در `public/*.zip` و `public/themes/*.zip` بازسازی شده و فایل `artifacts/evidence/v31.0.0/checksums.sha256` با `sha256sum -c` (**۲۶/۲۶ `OK`**) تأیید گردید.
