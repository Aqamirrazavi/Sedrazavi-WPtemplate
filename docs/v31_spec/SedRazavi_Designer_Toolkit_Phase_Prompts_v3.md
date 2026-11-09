# SedRazavi Phase Prompts v3 — Native Editor & Portability Execution

**اولویت:** این نسخه، promptهای v2 را برای موضوعات Elementor/Gutenberg/portability تکمیل و در صورت تعارض جایگزین می‌کند. همراه Master Prompt v5 و قرارداد فنی v31 استفاده شود.

## روش کار
- ابتدا فقط Prompt 00 را اجرا کن و هیچ کدی را تغییر نده.
- هر بار فقط یک فاز مصوب؛ در پایان توقف و ارائهٔ گزارش.
- اگر ابزار/محیط لازم در دسترس نیست، تست را `NOT_RUN` ثبت کن.
- قبل از هر تغییر، فایل فعلی را بخوان و diff ارائه بده.

## Prompt 00 — Current Commit Audit (Read Only)
مخزن `https://github.com/Aqamirrazavi/Sedrazavi-WPtemplate` را روی branch پیش‌فرض و commit جاری بررسی کن. SHA کامل، branch، timestamp و working tree را ثبت کن. اگر امکان دریافت SHA یا dirty state وجود ندارد، آن را `UNKNOWN/NOT_ACCESSIBLE` اعلام کن؛ حدس نزن. همه فایل‌های واقعی را inventory کن. سه افزونه `elementor-addon-suite`, `sedrazavi-addons`, `sedrazavi-companion` و هر core/theme دیگر را از نظر مالکیت قابلیت/داده بررسی کن. تعداد ویجت‌ها را از کلاس‌های `Widget_Base` و hook ثبت واقعی استخراج کن. تعداد تمپلیت‌ها را از فایل‌های بومی Elementor و تست import/editor استخراج کن. بلوک‌ها را از `block.json` و ثبت server-side بشمار. package manager را از نظر dependency graph, conflict, dry-run, archive validation, atomic install, rollback, uninstall و cross-site export بررسی کن. اسکریپت‌های package.json را با دستورات README، audit و CI مقایسه کن. برای هر ادعا مسیر، شماره خط، commit و evidence بده. هیچ کدی را تغییر نده. خروجی: baseline، traceability matrix، risk register، test evidence matrix و backlog اولویت‌بندی‌شده. توقف.

## Prompt 01 — P0 Security & Privacy
فقط P0ها را اصلاح کن. همه REST/AJAX routes، permission callbacks، handlers، CPTs، taxonomies، media/attachments، search, feeds, sitemap, export/download, cache و logs را inventory کن. nonce فقط CSRF است، نه authentication/authorization. default-deny، capability، object ownership، IDOR protection و data minimization اجرا کن. role matrix شامل anonymous، subscriber/client A، client B، staff و admin بساز. تست‌ها را در WordPress واقعی اجرا کن. هیچ ادعای PASS بدون log نده. توقف.

## Prompt 02 — Plugin Boundaries & Build Contracts
سه افزونهٔ موازی و themeها را تحلیل کن؛ قبل از ادغام، ownership matrix بساز. تنها یک service core تعیین کن، اما تا تصویب migration plan هیچ فایل یا داده‌ای را حذف نکن. build targets theme/plugin/Elementor/Gutenberg را جدا کن. asset handles، autoloading، PHP namespaces، text domains، CPT ownership، REST namespace، options، migrations، versions، license/SBOM و artifact checksums را ثبت کن. test scripts و CI واقعی را اجرا/مقایسه کن. توقف.

## Prompt 03 — WordPress Clean Install Foundation
theme و core plugin را روی یک WordPress تازه نصب کن. activation/deactivation، dependency absence، admin menus، roles/capabilities، settings، theme.json، template hierarchy، RTL/LTR، conditional assets و uninstall/data retention را تست کن. PHP lint و WPCS/PHPCS اجرا کن. نبود Elementor نباید fatal ایجاد کند. ZIP نصب‌پذیر واقعی تولید و نصب کن. توقف.

## Prompt 04 — Design System & Admin UX
design tokens مشترک میان Elementor و Gutenberg بساز: colors, typography, spacing, radii, shadows, container widths, breakpoints, focus and motion. پنل‌های مدیریت با PHP/HTML/CSS و JS ماژولار؛ بدون SPA مستقل. RTL/LTR، dark/light، keyboard، contrast، zoom، reduced motion و ترجمه را تست کن. کنترل تزئینی ممنوع. توقف.

## Prompt 05 — Golden Native Elementor Widget
فقط یک Hero Widget واقعی بساز. کلاس مستقل از `Elementor\Widget_Base`، `get_name/title/icon/categories/keywords`, `register_controls`, `render`, و در صورت نیاز `content_template`. تب‌های Content/Style/Advanced، responsive controls، typography/color/spacing، link/button security، accessibility و frontend/editor parity را پیاده کن. ثبت فقط از `elementor/widgets/register` و پس از تشخیص Elementor. asset dependencies را با registered handles و `get_style_depends/get_script_depends` محدود کن. shortcode/HTML wrapper/iframe ممنوع. در Elementor واقعی widget را پیدا کن، روی canvas بکش، controls را تغییر بده، save کن و frontend را تست کن. اگر محیط واقعی نیست NOT_RUN. توقف.

## Prompt 06 — Native Elementor Template & Theme Builder Bridge
یک landing template بومی Elementor تولید/صادر کن؛ ساختار را از export واقعی نسخه هدف بگیر، نه JSON حدسی. وارد Elementor Library کن، در editor باز کن، text/style/responsive values را تغییر بده، save کن و frontend render را تست کن. template manifest شامل widget IDs، plugin versions، global tokens، media، dynamic dependencies و Pro requirements باشد. برای Header/Footer/Single/Archive، Pro requirements را شفاف کن. اگر Free bridge وجود دارد، condition manager و rendering path مستقل آن را تست کن؛ آن را Theme Builder رسمی Pro معرفی نکن. PHP fallback را جدا نگه دار. توقف.

## Prompt 07 — Gutenberg Native Block
یک block با namespace `sedrazavi/hero` و `block.json` بساز؛ server registration با `register_block_type`، PHP render و JS رسمی WordPress فقط برای editor controls لازم. attribute schema، supports، editorStyle/style/viewScript و render.php را درست تعریف کن. block را در Gutenberg درج، ذخیره، بازخوانی و frontend render کن؛ validation error نباید باشد. توقف.

## Prompt 08 — Golden Portable Plugin & Site A → Site B
یک ZIP plugin قابل نصب بساز که Hero widget و template dependencyهایش را فراهم کند. manifest، version constraints، checksums، licenses، asset inventory و dependencies داشته باشد. روی Site A بساز و export کن. Site B باید WordPress تازه با DB/uploads جدا باشد. فقط dependencies اعلام‌شده را نصب کن؛ package را preflight و import کن؛ widget panel، editor open/edit/save، frontend render، assets/tokens و responsive را بررسی کن. missing required dep باید hard fail واضح بدهد؛ missing optional dep باید fallback مستند داشته باشد. تست tampered ZIP، zip-slip، duplicate files، conflict و rollback را اجرا کن. اگر دو سایت مستقل نداری NOT_RUN. توقف.

## Prompt 09 — Package Manager Lifecycle
Full, Selective, Standalone, Vertical Pack و Template-only modes را پیاده/آزمون کن. dependency graph، cycle/conflict detection، dry-run، staged install، backup، migrations، rollback، idempotency، upgrade/downgrade policy، deactivate/uninstall و data retention را پوشش بده. preflight نباید PHP بسته را اجرا کند. build باید فقط فایل‌های allowlisted ماژول انتخاب‌شده را شامل شود. هر failure در ZipArchive/write/checksum باید success=false باشد. توقف.

## Prompt 10 — Widget / Template / Block Batches
پس از قبولی Golden Slice، در هر batch حداکثر ۳ تا ۵ widget، ۲ تا ۳ template یا ۳ تا ۵ block اضافه کن. برای هر آیتم registry record و acceptance test بنویس. هر widget باید class + register + controls + render + editor test داشته باشد. هر template باید import + editor open + edit/save + frontend test داشته باشد. catalogued/implemented/tested/verified counts جدا باشند. توقف در پایان هر batch.

## Prompt 11 — Vertical Packs & Legal Portal
Legal pack را از هسته عمومی جدا کن. client/case confidentiality، strict ownership، RBAC، object-level permissions، audit trail، retention, export/delete, attachment privacy و secure notifications را threat-model کن. CPT پرونده محرمانه public/search/indexable نباشد. public case studies باید مدل جدا و anonymized داشته باشند. integrationهای WooCommerce/CF7/SEO/SMTP optional adapters باشند. تست dependency absent/present و access isolation را اجرا کن. توقف.

## Prompt 12 — Performance, SEO, Accessibility & Release
baseline/after metrics، Core Web Vitals، conditional asset loading، image/font optimization، query/cache, crawl/canonical/schema/sitemap, keyboard/screen reader/zoom/reduced motion و security regression را ثبت کن. PHP lint، WPCS، PHPUnit/WP tests، Elementor editor E2E و Gutenberg E2E در CI اجرا شود. clean install، upgrade، rollback و Site A→B portability gate را پاس کن. ZIP واقعی، checksum، SBOM، license notices، changelog و evidence bundle تحویل بده. NOT_RUNها مانع ادعای production-ready هستند. توقف.

---

# Promptهای تکمیلی ممیزی

## Prompt A — README / CI / Test Claim Reconciliation
تمام READMEها، audit reports، remediation plans، package.json scripts، workflow files و تست‌ها را cross-check کن. هر عدد test count را به فرمان دقیق، فایل test، آخرین اجرای CI و log مربوط کن. ادعاهای متناقض را در جدول ثبت کن. تا وقتی اجرای جاری و log قابل‌مشاهده نیست، PASS/228 of 228 را تأیید نکن. اصلاح docs فقط پس از اثبات source of truth.

## Prompt B — Elementor Native Census
تمام کلاس‌های ارث‌برنده از `Widget_Base`، hookهای registration، dynamic tags، controls و renderers را با static inventory و runtime Elementor registry تطبیق بده. duplicate IDs، unregistered classes، missing assets، shortcode renderers و catalogue-only items را مشخص کن. فقط widgetهای واقعاً قابل‌استفاده در editor را native count کن.

## Prompt C — Template Integrity
همه فایل‌های `templates/` را parse کن؛ نوع و schema version را ثبت کن؛ widget IDs را استخراج و با registry نصب‌شده تطبیق بده. در محیط Elementor واقعی import کن، editor open/edit/save و frontend render انجام بده. فقط مواردی که همه مراحل را پاس کردند VERIFIED شوند.

## Prompt D — Cross-Site Reproducibility
ساختار Site A و Site B را ثبت کن و ثابت کن DB/uploads/source files مشترک نیستند. export/import package را با checksum انجام بده. widget IDs، template JSON، globals, fonts, media, CPT/meta dependencies و dynamic tags را مقایسه کن. هر dependency پنهان یا reference شکسته = FAIL.
