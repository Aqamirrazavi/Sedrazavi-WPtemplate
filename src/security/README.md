# ماژول امنیتی مرحله اول (Security P0 Middleware) — مسیر `src/security/`

این ماژول لایه کنترل دسترسی موکلان (Anti-IDOR / Ownership)، اعتبارسنجی نقش‌ها و کنترل متادیتای REST API را در سطح TypeScript/Middleware پیاده‌سازی می‌کند تا هم‌تراز با پیاده‌سازی PHP در اکوسیستم وردپرس عمل کند.

## ۱. کنترل دسترسی موکلان و جلوگیری از IDOR (`evaluateCaseAccess` و `requireCaseAccessOwnership`)
- **Fail-Closed Auth**: هر درخواست فاقد نشست احراز هویت معتبر (`userId <= 0` یا `isAuthenticated === false`) با کد `401` رد می‌شود.
- **منع جعل هدر نقش**: هدرهای قابل جعل سمت کلاینت مثل `x-sedrazavi-user-role` هرگز مبنای مجوز قرار نمی‌گیرند؛ هویت صرفاً از نشست تأییدشده سرور یا توکن HMAC استخراج می‌شود.
- **محدوده مجاز نوع پست (CPT Allowlist)**: تنها نوع پست‌های `sedrazavi_case`، `case`، `arbitration_case` و `sedrazavi_dashboard` مجاز به بررسی در مسیر پرونده‌ها هستند.
- **کنترل مالکیت شیء (Per-Object Ownership)**: موکلان عادی تنها پرونده‌هایی را مشاهده می‌کنند که `postAuthorId === userId`، `clientUserId === userId` یا در فهرست پرونده‌های منتسب کاربر (`assignedCaseIds`) با مقایسه زمان‌ثابت (`timingSafeEqualStrings`) مطابقت داشته باشند.
- **پوشش‌دهی متادیتای حساس (`redactCaseMetadataForActor`)**: فیلدهایی مانند شماره تماس موکل (`clientPhone`) برای کاربران غیرکارمند با `***` جایگزین می‌شوند.

## ۲. کنترل متادیتای REST API و CPT CRUD (`enforceRestMetadataPolicy` و `filterAllowedMetadata`)
- **لیست مجاز CPT در پیشخوان فرانت‌اند**: فقط `post`، `portfolio`، `services` و `case_study` مجازند؛ ارسال هر CPT دیگر (مانند پرونده‌های محرمانه یا پیکربندی سیستم) با وضعیت `403` مسدود می‌شود.
- **لیست مجاز کلیدهای متاباکس (`ALLOWED_COCKPIT_META_KEYS`)**: تنها کلیدهای تعریف‌شده زیر پذیرفته و پاک‌سازی می‌شوند و سایر کلیدهای دلخواه حذف می‌گردند:
  - `_sr_portfolio_client`
  - `_sr_portfolio_url` (اعتبارسنجی پروتکل `http:` / `https:`)
  - `_sr_portfolio_metric_val`
  - `_sr_portfolio_metric_label`
  - `_sr_service_price`
  - `_sr_service_delivery_time`

## ۳. جلوگیری از ارتقای سطح دسترسی و تزریق CSV (`isRoleAssignmentAllowed` و `sanitizeCsvCell`)
- کاربران فاقد قابلیت `manage_options` نمی‌توانند نقشی دارای قابلیت‌های حساس (`manage_options`, `edit_users`, `delete_users`, `create_users`, `promote_users`) اختصاص دهند.
- مقادیر خروجی CSV که با کاراکترهای فرمولی (`=`, `+`, `-`, `@`, Tab) شروع می‌شوند با `'` خنثی‌سازی می‌شوند.

## نگاشت مستقیم به لایه PHP وردپرس
| قابلیت امنیتی | ماژول TypeScript (`src/security/`) | ماژول PHP هم‌تراز |
|---|---|---|
| کنترل دسترسی پرونده‌ها و موکلان | `evaluateCaseAccess`, `requireCaseAccessOwnership` | `wordpress-theme/inc/wp-rest-auth.php`, `sedrazavi-companion/includes/class-legal-matter-portal.php` |
| کنترل متادیتا و CPT در پیشخوان | `enforceRestMetadataPolicy`, `filterAllowedMetadata` | `sedrazavi-companion/includes/class-frontend-cockpit.php` |
| جلوگیری از ارتقای دسترسی و CSV Injection | `isRoleAssignmentAllowed`, `sanitizeCsvCell` | `sedrazavi-companion/includes/class-frontend-cockpit.php`, `wordpress-theme/inc/rest-api.php` |
