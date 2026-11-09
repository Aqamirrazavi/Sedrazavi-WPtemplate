# SedRazavi — Code-Level Remediation & Acceptance Plan
## نسخه نهایی 1.0 | 2026-11-10

**هدف:** تبدیل یافته‌های بازبینی ایستای مخزن به کارهای قابل اجرا در Google AI Studio. این سند patch یا ادعای رفع نقص نیست.

## محدودیت شواهد
بازبینی قبلی از صفحات و سورس‌های قابل مشاهده GitHub انجام شده؛ repository clone، اجرای PHP/WordPress، نصب افزونه، تست مرورگر یا تست نفوذ انجام نشده است. بنابراین هر مورد در Phase 0 باید روی commit جاری بازتأیید شود.

## P0-01 — REST nonce-only authorization
- مسیر: `wordpress-theme/inc/wp-rest-auth.php`
- نشانه: `check_logged_in_permission()` مسیر موفقیت مبتنی بر nonce را پس از عدم احراز login نشان می‌دهد.
- اقدام: nonce فقط CSRF protection؛ authorization بر اساس session/login، capability و مالکیت object.
- بررسی وابسته: تمام `register_rest_route()` و permission callbackهای مصرف‌کننده.
- پذیرش: nonce معتبر برای anonymous یا کاربر فاقد capability دسترسی ایجاد نکند؛ ماتریس نقش‌ها در WP واقعی پاس شود.

## P0-02 — Legal case object ownership
- مسیرهای شروع: `wordpress-theme/functions.php`، `wordpress-theme/inc/wp-rest-auth.php` و handlerهای REST مرتبط.
- اقدام: دسترسی پرونده و اسناد، در هر عملیات و در سمت سرور بر اساس owner/client/staff/admin مجاز شود؛ list/search/export/attachment هم بررسی شود.
- پذیرش: client A با تغییر ID به پرونده client B دسترسی نداشته باشد؛ anonymous و roleهای نامرتبط رد شوند.

## P0-03 — Archive/package safety
- مسیر: `elementor-addon-suite`، به‌ویژه `Package_Manager` و مسیرهای export/import.
- اقدام: validate manifest/schema، normalize paths، منع traversal/symlink، محدودیت نوع/اندازه فایل، checksum، provenance، عدم اجرای PHP از archive، atomic write و rollback.
- پذیرش: tampered archive، zip slip، path traversal، failed ZIP open/write و missing ZipArchive هیچ‌گاه success کاذب برنگردانند.

## P0-04 — Evidence integrity
- مسیرها: `security-test-matrix.md`، `audit-report.md`، `release-evidence.md` و تست‌های `scripts/`.
- اقدام: static assertions را با برچسب static نگه دار؛ integration و browser tests مستقل اضافه کن؛ هر PASS باید log/artifact و محیط داشته باشد.
- پذیرش: `NOT_RUN` از PASS جدا باشد؛ عدد aggregate فقط تست‌های اجراشده و قابل بازتولید را بشمارد.

## P1-01 — Plugin boundary consolidation
- مسیرها: `elementor-addon-suite/`، `sedrazavi-addons/`، `sedrazavi-companion/`.
- اقدام: مالکیت یکتا برای هر capability؛ یک bootstrap و dependency graph؛ حذف duplicate registration و data ownership ambiguity.
- پذیرش: plugin boundary matrix کامل؛ فعال/غیرفعال‌سازی هر بسته بدون fatal error، duplicate routes یا duplicate tables.

## P1-02 — Elementor-native reality check
- مسیرها: `elementor-addon-suite`، registry و widget classes؛ `INSTALL.md`.
- اقدام: ثبت هر ویجت native واقعی و controls؛ تبدیل catalogue-only items به backlog؛ template import/export باید template قابل ویرایش Elementor باشد.
- پذیرش: تست editor برای هر widget family؛ native widget count از روی registry اجرایی محاسبه شود، نه کاتالوگ.

## P1-03 — Shortcode deprecation
- مسیرها: `INSTALL.md`، `sedrazavi-addons.php` activation provisioning و shortcode renderers.
- اقدام: حذف shortcode از مسیر پیش‌فرض onboarding؛ compatibility opt-in؛ migration و fallback مستند.
- پذیرش: نصب تازه بدون shortcode page قابل استفاده باشد؛ صفحات قدیمی بدون حذف ناگهانی محتوا مهاجرت کنند.

## P1-04 — Package Manager lifecycle
- مسیر: `Package_Manager` و package manifests.
- اقدام: dependency resolver، conflict/cycle detection، dry-run، install/import، upgrade، migrations، rollback، deactivate، uninstall و explicit purge.
- پذیرش: تست Full، Selective، Standalone، Portable، missing deps، conflict، idempotency، upgrade/rollback و cross-site import/export.

## P1-05 — Compatibility truth
- مسیرها: theme/plugin headers، READMEها، dependency matrix، CI.
- اقدام: یک منبع واحد برای minimum/tested versions.
- پذیرش: فقط نسخه‌هایی که CI واقعاً روی آن‌ها اجرا شده به‌عنوان Tested ثبت شوند.

## P2-01 — CI expansion
- اقدام: PHP lint، PHPCS/WPCS، PHPUnit، WordPress test environment، Elementor/Gutenberg browser tests، accessibility و performance budgets.
- پذیرش: clean install و build artifact قابل دانلود در pipeline.

## ترتیب اجرایی
1. Phase 0 بازتأیید و inventory.
2. P0-01 و P0-02.
3. P0-03 و P0-04.
4. P1-01 مرزبندی.
5. P1-02 و P1-03 editor-first.
6. P1-04 package lifecycle.
7. P1-05 و P2-01 CI/release.
8. سپس vertical packs و توسعه بانک قابلیت‌ها.

## قانون خروجی هر task
شناسه، مسیر/خط، before/after، migration impact، تست، command، محیط، نسخه، log، وضعیت و ریسک باقیمانده اجباری است. بدون اجرای واقعی، وضعیت `NOT_RUN` بماند.


---

## الحاقیه وضعیت 2026-11-10

این سند برنامهٔ اصلاحات قبلی را ثبت می‌کند، اما statusهای «رفع شد» در آن به‌معنای تأیید مجدد روی commit فعلی نیستند. همه موارد باید طبق `SedRazavi_Latest_Repository_Audit_2026-11-10.md` روی SHA دقیق جاری بازبینی شوند. برای ادعای ۲۲۸ تست، package.json، workflow و CI logs باید در یک commit واحد تطبیق داده شوند. برای ادعای ۳۱ ویجت و ۳۰ template، ledgerهای native widget/template و آزمون editor لازم‌اند. برای portability، Site A→Site B مستقل الزامی است.
