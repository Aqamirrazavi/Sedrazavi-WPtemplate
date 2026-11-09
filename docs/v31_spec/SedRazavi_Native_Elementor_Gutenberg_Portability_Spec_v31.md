# SedRazavi Native Elementor / Gutenberg / PHP / Portability Contract
## نسخه v31 — الحاقیه الزام‌آور بر سند مادر v30

**هدف:** تبدیل خواسته «ویجت‌ها و تمپلیت‌های واقعی، قابل‌ویرایش و قابل‌انتقال بدون Converter» به الزامات فنی و آزمون‌پذیر. این سند جایگزین بخش‌های متعارض v30 می‌شود.

---

## 1. تعریف دقیق خروجی‌های متفاوت

این چهار نوع خروجی را هرگز با یکدیگر اشتباه نگیر:

| نوع خروجی | قالب/فناوری | قابل ویرایش در Elementor؟ | نقش |
|---|---|---:|---|
| Elementor Widget | کلاس PHP مبتنی بر `\Elementor\Widget_Base` + controls | بله، در پنل Elementor | عنصر قابل‌استفاده در صفحات |
| Elementor Template | داده بومی Elementor (JSON/export format) | بله، اگر widgetها و dependencyها نصب باشند | صفحه/سکشن/قالب طراحی |
| WordPress PHP Template | `page.php`, `single.php`, `archive.php`, template hierarchy و PHP | خیر، مگر اینکه فقط wrapper برای محتوای Elementor باشد | fallback، SSR و ساختار theme |
| Gutenberg Block | `block.json` + ثبت سمت سرور + render PHP و JS رسمی در صورت نیاز | در Gutenberg، نه Elementor | بلوک مستقل WordPress |

**قانون:** اگر کاربر باید یک Header، Footer، Single، Archive یا Landing را در Elementor ویرایش کند، آن خروجی باید Elementor Template واقعی باشد و مسیر تخصیص/نمایش آن مستند و آزموده شود. فایل PHP متناظر فقط fallback یا shell است. هیچ‌گاه ادعا نکن یک PHP template به‌تنهایی در Elementor قابل‌ویرایش است.

## 2. Native Elementor Widget Contract

هر ویجت باید تمام موارد زیر را داشته باشد:

1. کلاس مستقل و namespaced که مستقیماً از `\Elementor\Widget_Base` ارث ببرد.
2. متدهای واقعی و متناسب: `get_name()`, `get_title()`, `get_icon()`, `get_categories()`, `get_keywords()`, `register_controls()`, `render()`؛ `content_template()` فقط اگر live preview نیاز دارد.
3. ثبت رسمی از hook `elementor/widgets/register` پس از تشخیص نسخه/آماده‌بودن Elementor؛ عدم وجود Elementor نباید fatal ایجاد کند.
4. بخش‌های کنترل معنادار در تب‌های Content، Style و Advanced. استفاده از `add_control`, `add_responsive_control`, `add_group_control`, repeater و conditions فقط در صورت نیاز واقعی.
5. Responsive values برای Desktop/Tablet/Mobile؛ مقادیر پیش‌فرض امن و قابل‌پیش‌بینی.
6. Dynamic tags/Query فقط در صورت پشتیبانی نسخه هدف؛ capability و escaping مناسب برای داده پویا.
7. خروجی HTML معنایی، escaping دقیق، sanitization ورودی، ARIA و keyboard behavior.
8. CSS/JS اختصاصی با namespace؛ assets فقط در صورت نیاز و از طریق handle ثبت‌شده و `get_style_depends()` / `get_script_depends()` بارگذاری شوند. از enqueue سراسری همه فایل‌ها اجتناب شود.
9. حالت editor و frontend باید یک ساختار داده و رفتار سازگار داشته باشند؛ preview جعلی یا placeholder، پیاده‌سازی محسوب نمی‌شود.
10. شناسه `get_name()` پایدار و یکتا باشد. تغییر ID پس از انتشار نیازمند migration و compatibility adapter است.
11. هر widget یک manifest entry و تست دارد: ID، class path، category، controls، asset handles، dependencies، supported versions، test IDs.
12. کاتالوگ/metadata/shortcode renderer/HTML preview به‌هیچ‌وجه native widget محسوب نمی‌شود.

### Widget verification record

برای هر ویجت در `qa/elementor-widget-verification.csv` حداقل این ستون‌ها را ثبت کن:
`widget_id,class,source_path,registration_hook,controls_content,controls_style,controls_advanced,responsive,render_method,assets,dependencies,editor_test,frontend_test,keyboard_test,status,evidence`.

**تعداد واقعی ویجت‌ها** باید از registry اجرایی و کلاس‌های بارگذاری‌شده استخراج شود. تعداد در README یا یک آرایهٔ نمایشی، معیار شمارش نیست.

## 3. Elementor Template Contract

1. منبع قالب باید ساختار دادهٔ بومی Elementor باشد؛ فایل JSON باید از نظر schema و ساختار با نسخه Elementor هدف سازگار باشد.
2. بهترین مرجع ساختار، template export واقعی تولیدشده از همان نسخه Elementor در محیط تست است. از حدس‌زدن ساختار داخلی یا نوشتن JSON ساختگی بدون import test خودداری کن.
3. از مسیر رسمی import/export یا APIهای عمومی/مستند Elementor استفاده کن؛ API داخلی/خصوصی را بدون version guard و test ننویس.
4. هر template باید شامل `template_id`, `title`, `type`, `required_plugins`, `required_widget_ids`, `minimum_versions`, `design_tokens`, `assets`, `conditions`, `license`, `checksum`, `schema_version` و migration notes باشد. این metadata می‌تواند در manifest جدا از فایل Elementor JSON نگهداری شود.
5. تمام widget IDs استفاده‌شده در template باید در plugin نصب‌شده وجود داشته باشند. قبل از import، preflight انجام بده: Elementor version، plugin version، widget registry، fonts/colors/globals، media، dynamic tags، CPT/meta dependencies و Pro requirements.
6. اگر widget یا dependency مفقود است، import را متوقف کن یا با گزارش واضح اجازهٔ ادامهٔ آگاهانه بده؛ هرگز با placeholder خاموش یا حذف widget موفقیت جعلی نشان نده.
7. پس از import، template باید در Elementor Library قابل مشاهده، بازشدنی و قابل ذخیره باشد. آزمون صرف وجود فایل JSON کافی نیست.
8. نسخه‌های Container/Flexbox و legacy sections را در ماتریس سازگاری ثبت کن. ساختارهای قدیمی را بی‌دلیل تولید نکن.
9. قالب‌هایی که به Elementor Pro Theme Builder، Popup یا WooCommerce Pro feature وابسته‌اند باید `requires_elementor_pro=true` داشته باشند. در صورت نبود Pro، fallback مشخص یا نسخهٔ رایگان مستقل ارائه شود.
10. برای Elementor Free، اگر SedRazavi شرط نمایش Header/Footer/Single/Archive را مدیریت می‌کند، این شرط‌ها باید در پنل خودش تعریف شوند؛ محتوای طراحی همچنان Elementor data باشد. Bridge نباید ادعا کند Theme Builder رسمی Pro است.
11. هر template را در یک WordPress/Elementor واقعی import کن، در editor باز کن، یک control را تغییر بده، save کن، frontend را render کن و screenshot/test evidence ثبت کن.

### Template verification record

`qa/elementor-template-verification.csv` ستون‌ها:
`template_id,file_path,type,elementor_version,required_plugin_versions,widget_ids,global_tokens,media_refs,pro_required,import_result,editor_open,edit_save,frontend_render,responsive_check,status,evidence`.

## 4. Gutenberg Contract

- هر block با namespace پایدار `sedrazavi/slug` و `block.json` ثبت شود.
- ثبت سمت سرور با `register_block_type()` و metadata path انجام شود؛ در صورت نیاز `render.php` یا `render_callback` داشته باشد.
- PHP-only dynamic block برای موارد مناسب مجاز و ترجیحی است. اگر editor-side controls نیازمند JS هستند فقط از API رسمی WordPress packages استفاده کن؛ React مستقل/SPA نساز.
- attribute schema، supports، editorScript/editorStyle/style/viewScript و render strategy دقیق ثبت شوند.
- ذخیره/بازخوانی، block validation، editor preview و frontend rendering تست شوند.
- block patterns با block type اشتباه نشوند؛ pattern، template و block هرکدام inventory مستقل دارند.

## 5. PHP Theme / WordPress Contract

- Theme فقط presentation، template hierarchy، theme.json، template parts، patterns، menus و fallback را مالک باشد.
- business logic، CPTهای حساس، فرم‌ها، پرونده‌ها، workflow و دادهٔ کاربر در plugin/vertical package قرار بگیرند تا با تعویض Theme حذف نشوند.
- از WordPress template hierarchy و escaping/sanitization رسمی استفاده شود.
- برای برگه‌ای که Elementor طراحی می‌کند، قالب PHP باید محتوای ذخیره‌شده را از مسیر استاندارد WordPress render کند و Elementor Canvas/Full Width را با fallback مناسب پشتیبانی کند.
- PHP page templates به‌عنوان Elementor-editable شمرده نشوند مگر اینکه صرفاً host یک Elementor document واقعی باشند.

## 6. No-Converter Principle

Converter لازم نیست، اگر از ابتدا هر artifact در قالب مقصد تولید شده باشد:
- Widget → PHP Elementor Widget class.
- Page/section/template → native Elementor data/export.
- Gutenberg content → native block markup / block definitions.
- Theme fallback → PHP template hierarchy.

این اصل به معنای تبدیل خودکار هر PHP/HTML دلخواه به Elementor نیست. محتوای legacy اگر وجود دارد، migration جداگانه و اختیاری است و نباید در مسیر تولید بومی دخالت کند.

## 7. Portability Package Contract

هر بسته مستقل باید حداقل شامل موارد زیر باشد:

```text
package-slug/
  package.json (SedRazavi manifest; JSON)
  README.md
  CHANGELOG.md
  LICENSES/NOTICES.md
  checksums.sha256
  plugin/ (installable plugin files)
  templates/ (native Elementor exports)
  patterns/ (Gutenberg patterns, if any)
  assets/ (only referenced assets)
  migrations/ (versioned, reversible where possible)
  tests/ (smoke/integration fixtures)
```

Manifest fields:
`id,version,package_type,requires_php,requires_wp,requires_elementor,requires_elementor_pro,requires_woocommerce,dependencies,optional_dependencies,conflicts,provides_widgets,provides_blocks,provides_templates,assets,capabilities,license,source_commit,build_id,checksum,signature,upgrade_from,migrations,rollback_policy,uninstall_policy`.

### Package manager must implement
- Full ecosystem, selective kit, standalone plugin, template-only bundle (with dependency checks) and vertical pack modes.
- Dependency resolution as a directed graph; reject missing required dependencies and cycles; distinguish optional dependencies.
- Conflict detection for duplicate widget IDs, CPT/taxonomy ownership, REST namespace/routes, option keys, script/style handles, PHP class names, text domains and plugin slugs.
- Dry-run plan with exact file list and actions before install.
- Secure archive validation: zip-slip/path traversal, symlinks, absolute paths, duplicate paths, oversized entries/zip bombs, unexpected PHP, executable payloads, checksum mismatch and tampering.
- Never execute package PHP during inspection/preflight. Do not permit arbitrary user-supplied PHP to be generated and executed on live sites.
- Atomic-ish staged install, backup of overwritten files, database migration, rollback on failure, idempotent repeat install, clear logs.
- Upgrade, downgrade policy, deactivate, uninstall and data-retention choices.
- Export must fail closed if ZipArchive/write/checksum/final artifact validation fails; no `success:true` on partial failure.
- Build only whitelisted files from selected modules; generated bundle must not reference unselected classes or assets.
- Rebuild same source/version twice and compare deterministic manifest/artifact where feasible.

## 8. Cross-Site Portability Acceptance Test (mandatory release gate)

Use two independent installations with separate databases and uploads:

**Site A:**
1. Install WordPress and the declared Elementor version.
2. Install SedRazavi plugin and selected package.
3. Create a page using at least two custom widgets, one responsive control, one dynamic field (if supported), one global token and one media asset.
4. Import the package's Elementor template; open it in Elementor; edit text/style/responsive value; save and publish.
5. Export the package and record checksum, manifest and dependencies.

**Site B:**
1. Fresh WordPress with no source DB, no source uploads and no SedRazavi files.
2. Install only declared required dependencies and selected package ZIP.
3. Run package preflight; import the native Elementor template.
4. Confirm widgets appear in Elementor panel, template opens, controls load, media/global tokens resolve, editing and saving work, frontend output matches expected and no PHP/JS fatal occurs.
5. Repeat with one optional dependency missing, one required dependency missing, and a conflicting package.
6. Upgrade the package, run migration, simulate failure, rollback, deactivate and uninstall according to policy.

**Pass criteria:** all required checks pass on Site B. A template that imports but loses custom widgets, styling, assets, dynamic data or editability is FAIL. A package that works only with Site A database/files is NOT PORTABLE. If no two-site environment exists, mark the entire cross-site gate `NOT_RUN`.

## 9. Release Gates & Evidence

| Gate | Required evidence | PASS condition |
|---|---|---|
| Elementor widgets | class path, registration log, editor screenshot/test, frontend test | each counted widget is native and editable |
| Elementor templates | actual export JSON, import result, editor save, frontend output | opens and remains editable |
| Gutenberg blocks | block.json, server registration, editor and frontend test | valid saved block, no validation errors |
| PHP theme | lint, install/activation, template hierarchy smoke tests | no fatal; fallback works |
| Portability | two-site logs, manifest/checksums, screenshots | site B works without site A state |
| Security | role/ownership/IDOR/archive tests | P0/P1 closed with regression tests |
| Performance | baseline and post-change metrics | budgets met on declared environment |
| Release artifact | ZIP inspection, checksum, SBOM/license, clean install | artifact is actually installable |

Never merge counts across catalogued, implemented, tested and verified items. Report four separate numbers.

## 10. AI Studio Execution Protocol

- Do not ask AI Studio to create 31 widgets + 30 templates + 100 blocks in one generation.
- First build one complete golden vertical slice: one Hero widget, one card/list widget, one native Elementor landing template, one Gutenberg block, one PHP fallback, one portable plugin ZIP.
- Install and test it on clean Site A and Site B. Only after PASS, treat it as a reference implementation.
- Then implement widgets in batches of 3–5 with exact acceptance tests; templates in batches of 2–3; blocks in batches of 3–5.
- After each batch: lint → unit/integration tests → editor verification → frontend verification → package smoke test → changelog/evidence.
- If a phase fails, fix and rerun only affected + regression tests; do not proceed to the next phase.
- Before editing any file, inspect its current contents. Never overwrite large files blindly. Produce patch/diff and list changed files.
- Work in the current branch/commit; preserve user changes; no destructive cleanup without approval.
- Keep a live traceability matrix: requirement → file/class → test → evidence → status.

## 11. Official technical references

- Elementor widget structure: https://developers.elementor.com/docs/widgets/widget-structure/
- Elementor widget controls: https://developers.elementor.com/docs/widgets/widget-controls/
- Elementor widget registration: https://developers.elementor.com/docs/addons/initialization/
- Elementor widget dependencies: https://developers.elementor.com/docs/widgets/widget-dependencies/
- Elementor data structure: https://developers.elementor.com/docs/data-structure/
- WordPress block registration: https://developer.wordpress.org/block-editor/getting-started/fundamentals/registration-of-a-block/
- WordPress block.json: https://developer.wordpress.org/block-editor/getting-started/fundamentals/block-json/
- WordPress dynamic block rendering: https://developer.wordpress.org/block-editor/getting-started/fundamentals/static-dynamic-rendering/

Check official docs against the actual minimum supported versions before implementation; do not assume a method or hook is available in every old version.
