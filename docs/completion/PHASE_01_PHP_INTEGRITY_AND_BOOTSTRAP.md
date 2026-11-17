# PHASE 1 — PHP Integrity, Bootstrap & Clean Installation Report (SedRazavi v31)

> **تاریخ اجرا:** 2026-11-17  
> **فاز جاری:** `PHASE 1 — PHP Integrity, Bootstrap & Clean Installation`  
> **وضعیت کلی فاز ۱:** تکمیل اصلاحات کد، همگام‌سازی و بسته‌بندی قطعی ZIP (`STATICALLY_CHECKED` / `TESTED` در محیط Node)؛ اجرای زنده `php -l` و نصب واقعی WordPress/Elementor در این کانتینر **`BLOCKED` (`PHP_NOT_INSTALLED`)** است.  
> **سند مرجع قبلی:** `docs/completion/PHASE_00_FORENSIC_AUDIT.md`

---

## ۱. گزارش نحو PHP (PHP Syntax & Lexical Report)

### الف) خطاهای کشف‌شده و اصلاح‌شده
1. **رفع خطای قطعی نحوی (`Orphan elseif`) در هر ۸ پوسته مستقل و اسکریپت تولید:**
   - **محل باگ:** `scripts/convert-to-standalone-themes.cjs` (خط ۳۴۰) با Regex تنبل تنها بخش `if (...) { ... }` را از `child-themes/*/functions.php` حذف می‌کرد و شاخه `elseif (file_exists(dirname(get_template_directory()) . '/inc/frontend-cockpit-engine.php')) { ... }` را بلافاصله پس از `});` بدون `if` رها می‌کرد (`sedrazavi-agency-theme`, `sedrazavi-clinic-theme`, `sedrazavi-corporate-theme`, `sedrazavi-education-theme`, `sedrazavi-lawyer-theme`, `sedrazavi-legal-theme`, `sedrazavi-news-theme`, `sedrazavi-store-theme`).
   - **اصلاح:** جایگزینی Regex با تطبیق کامل ساختار `if ... elseif` شامل پرانتزهای تودرتو (`dirname(get_template_directory())`) و بازتولید هر ۸ پوسته مستقل در `standalone-themes/` و آرشیوهای `public/themes/*.zip`.
   - **وضعیت:** `IMPLEMENTED` و `STATICALLY_CHECKED` (۴۹/۴۹ چک اسکریپت `scripts/test-phase1-php-integrity.cjs`).

### ب) ماتریس بررسی نحو ۴۲۷ فایل PHP
| دامنه بررسی | تعداد فایل‌ها | روش بررسی اجراشده | نتیجه واقعی | وضعیت صادقانه |
| :--- | :---: | :--- | :--- | :---: |
| `wordpress-theme/` | ۶۶+ | تحلیلگر واژگانی Node (`brace/paren/bracket/string/heredoc/orphan-elseif`) | ۰ خطای نحوی | `STATICALLY_CHECKED` |
| `standalone-themes/` (۸ پوسته + ZIPها) | ۷۲+ | تحلیلگر واژگانی Node + بازخوانی مستقیم محتوای `functions.php` داخل هر ۸ ZIP | ۰ خطای نحوی / ۰ `Template:` | `STATICALLY_CHECKED` |
| `sedrazavi-companion/` | ۴۵+ | تحلیلگر واژگانی Node | ۰ خطای نحوی | `STATICALLY_CHECKED` |
| `elementor-addon-suite/` | ۶۵+ | تحلیلگر واژگانی Node + بررسی AST ویجت‌ها و JSONها | ۰ خطای نحوی | `STATICALLY_CHECKED` |
| `sedrazavi-addons/` | ۱۵+ | تحلیلگر واژگانی Node | ۰ خطای نحوی | `STATICALLY_CHECKED` |
| `sedrazavi-designer-core/` و `sedrazavi-designer-theme/` | ۲۰+ | تحلیلگر واژگانی Node | ۰ خطای نحوی | `STATICALLY_CHECKED` |
| **مجموع کل اکوسیستم** | **۴۲۷** | **`npm run test:phase1` (`scripts/test-phase1-php-integrity.cjs`)** | **۴۹ / ۴۹ PASS** | **`STATICALLY_CHECKED`** |
| **اجرای `php -l` (Zend PHP CLI Parser)** | **۴۲۷** | در دسترس نبودن باینری `php` در کانتینر | **اجرا نشد** | **`BLOCKED (PHP_NOT_INSTALLED)`** |

> **پایش ویژگی‌های نسخه PHP:** اسکن کل ۴۲۷ فایل نشان داد هیچ عملگر انحصاری PHP 8.x (`?->`, `match`, `enum`, `readonly`) وجود ندارد. هدر `Requires PHP` در `sedrazavi-designer-core/sedrazavi-core.php` (از `8.2` به `7.4`) و `sedrazavi-designer-theme/style.css` (از `8.0` به `7.4`) با حداقل نسخه رسمی اکوسیستم (`PHP >= 7.4` در `package-manifest.json` و `environment.json`) هم‌تراز شد.

---

## ۲. گزارش نصب تمیز، بوت‌استرپ و انعطاف‌پذیری Elementor (Clean Install & Bootstrap Report)

### الف) خطاهای کشف‌شده و اصلاح‌شده در لایه Bootstrap / Load Order / Fatal Risks
1. **تعارض قطعی کلاس `SedRazavi_Demo_Importer` (`Fatal: Cannot declare class`):**
   - `wordpress-theme/inc/class-demo-importer.php` بدون `if (!class_exists('SedRazavi_Demo_Importer'))` تعریف شده بود و هنگام فعال بودن هم‌زمان با `sedrazavi-companion/includes/class-demo-importer.php` خطای Fatal ایجاد می‌کرد.
   - **اصلاح:** هر دو تعریف کلاس و فراخوانی `SedRazavi_Demo_Importer::init()` در `wordpress-theme/inc/class-demo-importer.php` با `if (!class_exists('SedRazavi_Demo_Importer'))` محافظت شد.

2. **خطای قطعی `Call to undefined function is_plugin_active()` در فرانت‌اند و AJAX:**
   - `sedrazavi-companion/includes/class-frontend-cockpit.php` در متدهای `ajax_install_plugin()`، `ajax_toggle_plugin()` و هنگام رندر تب افزونه‌های شورت‌کد فرانت‌اند (خط ۱۵۰۳) توابع `is_plugin_active()`، `activate_plugin()` و `deactivate_plugins()` را بدون بارگذاری `ABSPATH . 'wp-admin/includes/plugin.php'` صدا می‌زد.
   - `elementor-addon-suite/includes/packaging/class-dependency-resolver.php` نیز در `check_package_conflicts()` تابع `plugin.php` را در محیط غیر‌ادمین بارگذاری نمی‌کرد.
   - **اصلاح:** افزودن متد کمکی `ensure_wp_plugin_admin_loaded()` در `Frontend_Cockpit_Engine` و محافظت `function_exists(...)` در هر ۳ نقطه و نیز در `Dependency_Resolver`.

3. **هشدارهای پی‌درپی فایل مفقود در هر درخواست (`6x WARNING / request`) و ناهماهنگی ترتیب بارگذاری افزونه‌ها:**
   - `sedrazavi-addons/sedrazavi-addons.php` در آرایه `$modules` ۶ فایل اختصاصی پوسته (`class-sedrazavi-auth-dual-mode.php` و...) را در مسیر `sedrazavi-addons/includes/` جستجو می‌کرد و در هر بار لود سایت ۶ خط `[WARNING]` در `debug.log` ثبت می‌نمود. همچنین ۲ ماژول واقعی موجود (`class-sedrazavi-legal-intelligence.php` و `class-sedrazavi-odr-arbitration.php`) در `$modules` ثبت نشده بودند.
   - **اصلاح:** حذف ۶ مسیر ناموجود پوسته از `$modules`، افزودن ۲ ماژول واقعی موجود با محافظ `if (!class_exists(...))`، و انتقال بررسی `UniversalElementorSuite\Plugin` در `sedrazavi-addons/includes/elementor-widgets.php` به داخل کالبک هوک‌ها تا ترتیب فعال‌سازی افزونه‌ها مشکلی ایجاد نکند.
   - **ترتیب بارگذاری Elementor:** در `elementor-addon-suite/elementor-addon-suite.php` هوک `plugins_loaded` روی اولویت `20` تنظیم شد تا همواره پس از مقداردهی Elementor (اولویت `0`) اجرا شود.

4. **محافظت دسترسی `modules_manager` در Elementor Pro و سازگاری دو افزونه خروجی مستقل:**
   - در `sedrazavi-designer-core/inc/theme-builder-bridge.php` دسترسی به `\ElementorPro\Plugin::instance()->modules_manager` با `isset($pro_instance->modules_manager)` و `method_exists(...)` محافظت شد تا در نبود یا مقداردهی ناقص Pro خطا رخ ندهد.
   - در `elementor-addon-suite/includes/packaging/class-package-exporter.php` کلاس fallback با شرط `!class_exists('UniversalElementorSuite_Plugin_Fallback')` نیز محافظت گردید.

### ب) ماتریس سناریوهای نصب و فعال‌سازی / غیرفعال‌سازی / حذف (Lifecycle & Elementor Matrix)
| سناریو | بررسی ایستا (Code / Hook / Guard Audit) | اجرای زنده WP / Elementor |
| :--- | :--- | :---: |
| **نصب تمیز با Elementor غیرفعال** | `STATICALLY_CHECKED`: `wordpress-theme/front-page.php`, `single.php`, `inc/setup.php`, `elementor-addon-suite` (حالت مستقل شورت‌کد + گوتنبرگ) و `standalone-themes` همگی `did_action('elementor/loaded')` و `class_exists('\Elementor\Plugin')` را چک می‌کنند | `NOT_RUN (BLOCKED)` |
| **نصب تمیز با Elementor Free فقط** | `STATICALLY_CHECKED`: `Theme_Builder_Bridge` و `Template_Importer::adapt_pro_widgets_for_free()` و `sedrazavi-designer-core/inc/theme-builder-bridge.php` بدون `ElementorPro` اجرا می‌شوند | `NOT_RUN (BLOCKED)` |
| **نصب تمیز با Elementor Free + Pro** | `STATICALLY_CHECKED`: پل `Theme_Builder_Bridge` با بررسی `register_all_core_location` / `modules_manager` تداخل ثبت دوگانه لوکیشن نمی‌دهد | `NOT_RUN (BLOCKED)` |
| **فعال‌سازی / غیرفعال‌سازی / Uninstall تمیز** | `STATICALLY_CHECKED`: هر ۴ افزونه (`elementor-addon-suite`, `sedrazavi-addons`, `sedrazavi-companion`, `sedrazavi-designer-core`) دارای `register_activation_hook`, `register_deactivation_hook` (Multisite-aware) و `uninstall.php` با `WP_UNINSTALL_PLUGIN` هستند (`test:phase3`: PASS) | `NOT_RUN (BLOCKED)` |

---

## ۳. فایل‌های تغییریافته و وضعیت بازسازی بسته‌ها

- **فایل‌های کد و اسکریپت تغییریافته در فاز ۱:**
  - `scripts/convert-to-standalone-themes.cjs` (اصلاح Regex حذف Cockpit برای پرانتزهای تودرتو)
  - `standalone-themes/*/functions.php` (هر ۸ پوسته مستقل بازتولید شدند)
  - `wordpress-theme/inc/class-demo-importer.php`
  - `sedrazavi-companion/includes/class-frontend-cockpit.php`
  - `elementor-addon-suite/elementor-addon-suite.php`
  - `elementor-addon-suite/includes/packaging/class-dependency-resolver.php`
  - `elementor-addon-suite/includes/packaging/class-package-exporter.php`
  - `sedrazavi-addons/sedrazavi-addons.php`
  - `sedrazavi-addons/includes/elementor-widgets.php`
  - `sedrazavi-addons/includes/class-sedrazavi-legal-intelligence.php`
  - `sedrazavi-addons/includes/class-sedrazavi-odr-arbitration.php`
  - `sedrazavi-designer-core/inc/theme-builder-bridge.php`
  - `sedrazavi-designer-core/sedrazavi-core.php`
  - `sedrazavi-designer-theme/style.css`
  - `scripts/test-phase1-php-integrity.cjs` (اسکریپت جدید تست فاز ۱)
  - `package.json` (افزودن `test:phase1` به اسکریپت‌ها و `test:all`)
  - `src/data/wordPressThemeFiles.ts` و `src/data/wordPressPluginFiles.ts` (همگام‌سازی خودکار با `npm run sync:all`)
- **بسته‌های بازتولیدشده و اثر انگشت دیجیتال:**
  - تمامی ۲۶ آرشیو ZIP در `public/*.zip` و `public/themes/*.zip` با `node scripts/pack-theme-zips.cjs` بازسازی و در `artifacts/evidence/v31.0.0/checksums.sha256` ثبت و با `sha256sum -c` (۲۶/۲۶ `OK`) تأیید شدند (`TESTED`).
