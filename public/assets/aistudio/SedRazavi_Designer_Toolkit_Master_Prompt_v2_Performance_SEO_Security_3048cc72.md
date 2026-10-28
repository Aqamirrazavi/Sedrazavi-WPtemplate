# SedRazavi Designer Toolkit
## سند مادر معماری و پرامپت اجرایی Google AI Studio
### نسخهٔ 1.0 — WordPress-native، Elementor-first، Gutenberg-compatible، بدون shortcode به‌عنوان مسیر اصلی و بدون React SPA

**وضعیت:** سند هدف و پرامپت تولید است؛ وجود این سند اثبات پیاده‌سازی یا تست‌شدن محصول نیست.

**هدف:** ساخت قالب و افزونهٔ واقعی و نصب‌پذیر وردپرس برای طراحی انواع وب‌سایت‌ها و لندینگ‌پیج‌ها، با کتابخانهٔ گستردهٔ ویجت‌ها، بلوک‌ها، سکشن‌ها، قالب‌ها، SVG، وکتورهای ثابت/متحرک، فرم‌ها و اتوماسیون‌های بک‌اند. اولویت طراحی با Elementor است و Gutenberg باید با APIهای استاندارد پشتیبانی شود.

**مرجع بصری:** از تصویر SedRazavi Studio ارائه‌شده در گفتگو الهام بگیر: رابط تیرهٔ سرمه‌ای با لهجه‌های بنفش/آبی، RTL، کتابخانهٔ جست‌وجوپذیر در چپ، پیش‌نمایش زنده در مرکز، Inspector در راست، نوار بالایی برای undo/redo و preview/save/publish و نوار پایینی برای presetهای layout. تصویر فقط الهام است؛ خوانایی، دسترس‌پذیری و قابلیت پیاده‌سازی را ارتقا بده و دارایی‌های محصولات دیگر را کپی نکن.

---

# بخش A — پرامپت اصلی برای Google AI Studio

## A1. نقش و مأموریت

در نقش یک تیم مهندسی محصول شامل معمار WordPress، توسعه‌دهندهٔ PHP، متخصص Elementor و Gutenberg، طراح UI/UX، مهندس امنیت، متخصص SEO فنی، متخصص دسترس‌پذیری، مهندس QA و مدیر انتشار عمل کن. این نقش‌آفرینی ادعای بررسی انسانی واقعی نیست؛ تصمیم‌ها باید با کد، مستندات، تست و شواهد پشتیبانی شوند.

محصول را **قالب و افزونهٔ واقعی WordPress** بساز، نه وب‌اپ مستقل که فقط ظاهر وردپرس را تقلید می‌کند. خروجی باید ZIP نصب‌پذیر داشته باشد؛ صفحات عمومی با WordPress/PHP رندر شوند و برای نمایش صفحات منتشرشده به AI Studio یا سرویس ابری وابسته نباشند.

- نام محصول: `SedRazavi Designer Toolkit`
- قالب: `sedrazavi-studio`
- افزونه: `sedrazavi-toolkit`
- PHP namespace پیشنهادی: `SedRazavi\\Toolkit`
- prefix: `sedrazavi_`
- Gutenberg namespace: `sedrazavi/`
- prefix متادیتا/option: `_sedrazavi_`

قبل از تثبیت نام‌ها، مخزن واقعی را بررسی کن و از تعارض نام جلوگیری کن.

## A2. قواعد غیرقابل مذاکره

1. **WordPress-native:** از APIهای رسمی برای hooks، capabilities، settings، REST، media، enqueue، blocks، internationalization و data storage استفاده کن.
2. **Elementor-first:** ویجت‌ها با API رسمی Elementor ثبت شوند و controls، responsive controls، style controls، حالت خالی، accessibility و خروجی فرانت‌اند واقعی داشته باشند.
3. **Gutenberg-compatible:** بلوک‌ها با `block.json` و APIهای استاندارد ساخته شوند؛ در صورت امکان از dynamic/server-rendered blocks با PHP استفاده کن.
4. **بدون React SPA مستقل:** برای داشبورد خود محصول React/Vite/Next یا اپ جدا نساز. رابط‌های مدیریت با PHP، HTML معنایی، CSS و JavaScript ماژولار پیاده شوند. Gutenberg فناوری داخلی خود را دارد؛ اگر کنترل editor-side پیچیده به JS نیاز دارد از API رسمی `@wordpress/*` استفاده کن، اما یک runtime موازی نساز.
5. **بدون shortcode به‌عنوان روش اصلی:** قابلیت جدید را از طریق Elementor Widget، Gutenberg Block، Template/Pattern، Dynamic Tag یا صفحهٔ تنظیمات ارائه کن. shortcode فقط برای سازگاری legacy و به‌صورت adapter اختیاری و مستند مجاز است.
6. **بدون قابلیت جعلی:** دکمه، فرم یا widget تزئینی را تکمیل‌شده معرفی نکن. mock فقط در demo/test و با برچسب روشن مجاز است.
7. **امنیت:** nonce جای capability check نیست. هر عملیات باید مجوز، اعتبارسنجی ورودی، sanitize و escape خروجی متناسب داشته باشد.
8. **بدون تغییر مخرب:** import، update، migration، reset و delete باید پیش‌نمایش، گزارش، تأیید مناسب و رفتار شکست مشخص داشته باشند.
9. **عملکرد:** CSS/JS هر قابلیت را در صورت نیاز بارگذاری کن؛ dependencyهای سنگین و انیمیشن‌های دائمی غیرضروری ممنوع.
10. **RTL/LTR و زبان:** UI فارسی/RTL و انگلیسی/LTR را پشتیبانی کند؛ رشته‌ها قابل ترجمه باشند.
11. **دسترس‌پذیری:** keyboard navigation، focus visibility، labels، contrast، reduced motion و HTML معنایی اجباری‌اند.
12. **سازگاری واقع‌بینانه:** هیچ ادعای سازگاری با تمام نسخه‌ها یا تمام افزونه‌ها نکن؛ ماتریس نسخه/قابلیت داشته باش.
13. **بدون جعل شواهد:** تست اجرا‌نشده `NOT RUN` است؛ فایل یا قابلیت ساخته‌نشده `IMPLEMENTED` نیست.
14. **تحویل مرحله‌ای:** ابتدا تحلیل و معماری، سپس MVP عمودی، سپس بانک‌ها و integrations. تولید یک فایل عظیم یا preview زیبا به‌تنهایی تحویل محصول نیست.
15. **حقوق دارایی‌ها:** کد، متن، تصویر، SVG، قالب و asset پولی محصولات دیگر را کپی نکن؛ منبع و مجوز هر asset ثبت شود.

## A3. معماری محصول

مرزها را حفظ کن؛ هر تغییر باید با دلیل و ADR (Architecture Decision Record) ثبت شود.

- **Theme:** ظاهر، `theme.json`، templates، template parts، patterns، style variations، header/footer و responsive layout.
- **Core plugin:** قابلیت‌های مشترک، registry، تنظیمات، permissions، REST endpoints، migration، Library client، diagnostics و contracts.
- **Elementor adapter:** widgets، controls، dynamic tags و integrationهای مستند.
- **Gutenberg adapter:** `block.json`، dynamic blocks، patterns، variations و editor integration.
- **Integration adapters:** WooCommerce، Contact Form 7، SEO، multilingual، SMTP، calendar/CRM و پیام‌رسان‌ها؛ هرکدام اختیاری و جدا.
- **Vertical packs:** Legal، Designer Portfolio، Agency، Business Services و E-commerce؛ منطق صنفی در هسته پخش نشود.
- **Library:** manifest نسخه‌دار و artifactهای immutable؛ نصب از branch زنده یا اجرای مستقیم کد خام repository ممنوع.
- **QA/release:** lint، static analysis، tests، accessibility/performance checks، ZIP build و upgrade/rollback tests.

### فایل‌درخت پیشنهادی

```text
sedrazavi-studio/
  style.css
  functions.php
  theme.json
  templates/
  parts/
  patterns/
  styles/
  assets/css/
  assets/js/
  languages/
  inc/

sedrazavi-toolkit/
  sedrazavi-toolkit.php
  uninstall.php
  readme.txt
  composer.json
  phpcs.xml.dist
  phpunit.xml.dist
  includes/
    Core/
    Admin/
    Capabilities/
    Settings/
    REST/
    Security/
    Assets/
    Library/
    ImportExport/
    Migration/
    Diagnostics/
    Integrations/
      Elementor/
      Gutenberg/
      WooCommerce/
      ContactForm7/
      SEO/
      Multilingual/
      Messaging/
    Modules/
      DesignSystem/
      Forms/
      Workflow/
      Motion/
      Popups/
      MegaMenu/
      DynamicContent/
      Legal/
      Portfolio/
      Agency/
      Ecommerce/
  blocks/
  elementor/widgets/
  elementor/controls/
  elementor/dynamic-tags/
  patterns/
  templates/
  assets/css/
  assets/js/
  assets/icons/
  assets/vectors/
  assets/motion/
  languages/
  tests/unit/
  tests/integration/
  tests/e2e/
  docs/
```

این الگو با کد واقعی تطبیق داده شود؛ فایل خالی برای نمایش ظاهری پیشرفت نساز. اگر build لازم است، سورس، دستور build و artifact لازم برای نصب را نگه دار.

## A4. زبان‌ها و استانداردهای برنامه‌نویسی

### Backend
- **PHP** با WordPress APIs و WordPress Coding Standards.
- حداقل نسخه‌های PHP و WordPress را بر اساس مستندات جاری و محیط هدف تعیین و در README/CI ثبت کن؛ حدس نزن.
- برای داده‌های عادی از Options API، post meta، user meta، CPT و taxonomy استفاده کن؛ دادهٔ حساس یا پرتراکنش را بدون مدل‌سازی در postmeta انباشته نکن.
- درخواست‌های بیرونی با WordPress HTTP API، timeout، allowlist و کنترل SSRF.
- SQL سفارشی فقط در صورت ضرورت، با `$wpdb->prepare()` و تست.

### Frontend
- HTML معنایی، CSS مدرن، JavaScript ماژولار و progressive enhancement.
- از APIهای رسمی Elementor و WordPress به‌جای framework موازی استفاده کن.
- CSS namespaced مانند `.srt-` و CSS variables؛ از selectorهای global مخرب و `!important` فراگیر پرهیز کن.
- SVG فقط از منابع معتبر و پس از sanitization؛ تزریق HTML/SVG دلخواه ممنوع.
- motion با CSS transitions/keyframes و در صورت نیاز Web Animations API؛ `prefers-reduced-motion` اجباری.
- secretها، API keyها و دادهٔ حساس هرگز در JavaScript عمومی قرار نگیرند.

### ابزار کیفیت
Composer در صورت نیاز، PHPCS با WordPress Coding Standards، PHP lint، PHPUnit یا تست‌های متناسب، تست‌های E2E در صورت امکان، بررسی accessibility، Lighthouse، Git، CI، changelog و semantic versioning. هر dependency باید دلیل، نسخه و مجوز ثبت‌شده داشته باشد.

### نکتهٔ فنی Gutenberg
«بدون React» را به معنای «بدون ساخت React SPA مستقل» اجرا کن. Gutenberg ممکن است برای کنترل‌های editor-side از JS رسمی WordPress استفاده کند. اولویت با PHP-rendered blocks و حداقل JS لازم است؛ از ساخت اپ موازی با React/Vite/Next اجتناب کن.

## A5. تجربهٔ کاربری و پنل مدیریت

پنل باید حرفه‌ای، سریع، responsive، RTL/LTR و هماهنگ با وردپرس باشد.

1. **Dashboard:** راه‌اندازی اولیه، سلامت سیستم، نسخه‌ها، فعالیت اخیر و اقدام‌های ضروری.
2. **Library:** جست‌وجو، دسته‌بندی، tag، فیلتر سطح/ادیتور/مجوز/وابستگی، favorites، recently used، preview، changelog و وضعیت deprecated.
3. **Design System:** رنگ، فونت، تایپوگرافی، spacing، radius، shadow، container widths، breakpoints و focus styles.
4. **Widgets/Blocks:** فعال‌سازی دسته‌ها، dependencyها و تنظیمات پیش‌فرض.
5. **Forms/Workflows:** تعریف مسیر داده، مقصد، consent/notice، ضداسپم، notification، assignment و retention.
6. **Integrations:** وضعیت، تست اتصال، مجوزها، نسخه و diagnostics.
7. **Import/Export:** preview، mapping، conflict report، dry-run، apply و recovery plan.
8. **System Status:** health checks، نسخه‌ها، debug log با redaction و export گزارش.
9. **Access & Privacy:** roles/capabilities، retention، export/delete policy.
10. **Help:** راهنمای contextual و پیام خطای قابل اقدام.

### اصول UX
- progressive disclosure؛ تنظیمات پیچیده در Advanced panels، نه نمایش هم‌زمان همهٔ گزینه‌ها.
- preview دسکتاپ/تبلت/موبایل؛ preview جای آزمون دستگاه واقعی نیست.
- autosave فقط برای draftهای کم‌خطر و با وضعیت روشن؛ عملیات حساس نیازمند تأیید.
- undo/redo فقط برای محدوده‌ای که واقعاً قابل اتکا پیاده شده است؛ عملیات داده‌ای حساس audit/rollback مستقل می‌خواهد.
- keyboard-first، focus ring، label، پیام خطا نزدیک فیلد و رنگ به‌عنوان تنها نشانگر وضعیت ممنوع.
- dark/light mode اختیاری با کنتراست مناسب.
- هر کنترل باید اثر واقعی و قابل مشاهده داشته باشد؛ کنترل غیرعملیاتی نمایش داده نشود.

## A6. قرارداد بانک «۹۶ × ۳»

برای هر بانک اصلی، هدف کاتالوگ عبارت است از:
- **متوسط: ۹۶ آیتم مستقل**
- **پیشرفته: ۹۶ آیتم مستقل**
- **ماکزیمال‌کمپلکس: ۹۶ آیتم مستقل**

۹۶ مورد هر سطح باید تفاوت واقعی در کاربرد، ساختار یا رفتار داشته باشند؛ تغییر صرف رنگ، radius یا متن، آیتم مستقل محسوب نمی‌شود. این هدف کاتالوگ/roadmap است، نه ادعای تکمیل فوری ۲۸۸ قابلیت. ابتدا schema و نمونهٔ end-to-end بساز، سپس آیتم‌ها را دسته‌ای پیاده‌سازی و تست کن.

هر رکورد باید داشته باشد:
`id`, `name`, `category`, `tier`, `use_case`, `editor_support`, `controls`, `data_contract`, `dependencies`, `security_notes`, `accessibility_notes`, `performance_cost`, `license`, `status`, `acceptance_test`.

### بانک‌های اصلی
1. Hero و headerهای landing page.
2. Navigation، mega menu، sticky/mobile menu.
3. Footer، CTA و contact bars.
4. Containers، grids، flex، split layouts، masonry و responsive composition.
5. Typography، rich text، headings و badges.
6. Buttons، links و action groups.
7. Feature/service/team/portfolio/case-study cards.
8. Testimonials، reviews و trust signals.
9. Pricing و comparison tables.
10. FAQ، accordion، tabs و disclosure.
11. Galleries، carousels، sliders و media.
12. Forms، multi-step، conditional fields و upload controls.
13. Search، filters، sorting، pagination و query lists.
14. Dynamic content و related content.
15. Popups، drawers، off-canvas و announcement bars.
16. Metrics، timelines، process steps و counters.
17. Maps، locations و opening hours.
18. WooCommerce product/category/cart/account/checkout companion UI.
19. Lead capture، CRM mapping، notifications و assignments.
20. Legal services, lawyer profiles, case-intake and portal shells.
21. Designer portfolio، agency، process، tools stack و availability.
22. SVG icons، illustrations، shape dividers، masks و backgrounds.
23. Motion presets، scroll reveal، hover و parallax سبک.
24. Design tokens، global styles و reusable presets.
25. Accessibility helpers و reduced-motion alternatives.
26. SEO-oriented patterns، breadcrumbs و structured data معتبر.
27. Admin dashboard widgets، settings و diagnostics.
28. Data tables، status badges و activity logs.
29. Import/export و library installer.
30. Integration adapters و fallbacks.
31. Empty/error/loading/success states.
32. Login/profile/account interfaces.
33. Social/contact channels: Telegram، Instagram، X، Eitaa، Rubika و غیره فقط با لینک/adapter معتبر؛ دسترسی API و قوانین سرویس‌ها را فرض نکن.
34. Multilingual، RTL/LTR، locale، date/time و currency.
35. Consent/privacy/retention UX.
36. Starter sites برای صنایع مختلف.

برای هر بانک، ابتدا منابع را بررسی و سپس ۹۶×۳ را به‌صورت کاتالوگ ماشین‌خوانا/Markdown ثبت کن. موارد تکراری را حذف کن. فهرست برنامه‌ریزی را با قابلیت کدنویسی‌شده یکی نکن.

## A7. سیستم SVG، وکتور، تصویر و موشن

Assetها باید شناسنامه و چرخهٔ عمر داشته باشند: شناسهٔ پایدار، نوع، preview، alt text، منبع، مجوز، attribution، اندازه/ابعاد، viewBox/duration، رنگ‌پذیری، dark/light variant، responsive behavior، reduced-motion fallback، checksum/version و وضعیت اعتماد.

خانواده‌های اولیه: abstract geometric lines، flowing lines، mesh gradients، dot matrices، grid/blueprint، organic blobs، waves، radial rings، particles سبک، orbit systems، layered cards، code/editor motifs، legal motifs، creative portfolio، commerce و business service motifs.

- SVG/CSS سبک را بر asset سنگین ترجیح بده.
- animation فقط وقتی فعال باشد که هدف طراحی را تقویت کند.
- موبایل و `prefers-reduced-motion` نسخهٔ ساده داشته باشند.
- مجوز همهٔ assetها ثبت شود؛ دارایی اختصاصی بساز یا مجوز معتبر تهیه کن.
- فایل‌های بزرگ lazy-load شوند و budget عملکرد داشته باشند.

## A8. فرم‌ها و اتوماسیون بک‌اند

هر فرم باید چرخهٔ کامل داشته باشد:
**UI → server-side validation → permission/authorization (اگر لازم است) → persistence یا adapter → notification/action → audit/retention → feedback واقعی به کاربر.**

### انواع فرم
- تماس، callback، lead generation، درخواست قیمت؛
- فرم چندمرحله‌ای و conditional logic؛
- رزرو/درخواست مشاوره؛
- upload امن؛
- intake حقوقی؛
- تیکت پشتیبانی و feedback؛
- فرم‌های متصل به CRM/webhook؛
- فرم سفارش که باید با WooCommerce ادغام شود، نه checkout مستقل و ناامن.

### قرارداد داده
هر فیلد دارای type، label، required، validation، normalization، visibility، privacy classification و storage policy باشد. حداقل دادهٔ لازم جمع‌آوری شود. دادهٔ شخصی/پرونده در URL، analytics event، log یا prompt مدل قرار نگیرد. از CSRF protection مناسب، anti-spam، rate limiting، validation سمت سرور و پیام خطای غیرحساس استفاده کن. nonce به‌تنهایی ضداسپم یا authorization نیست.

Upload باید type/size/path کنترل‌شده و دسترسی مناسب داشته باشد. ایمیل کانال اطلاع‌رسانی است، نه پایگاه اصلی دادهٔ حساس. retention و حذف برای هر فرم تعریف شود.

### Workflow engine
- Trigger: form submitted، status changed، order event، scheduled event یا admin action.
- Conditions: field match، role، product/category، status و time window.
- Actions: create record، assign owner، notify، add tag، webhook adapter و reminder.
- Safeguards: permission checks، idempotency، retry محدود، error queue در صورت نیاز، audit event، secret redaction و kill switch.
- اجرای PHP/SQL دلخواه توسط کاربر یا اجرای مستقیم کد از فرم ممنوع است.

## A9. ادغام افزونه‌ها

### Elementor
نسخه و فعال بودن را تشخیص بده؛ فقط APIهای رسمی و مستند را ترجیح بده. Controls در Content/Style/Advanced تفکیک شوند؛ responsive controls، dynamic data، editor preview و frontend render تست شوند. قابلیت وابسته به Elementor Pro باید صریحاً مشخص شود و fallback داشته باشد.

### Gutenberg
`block.json` مرجع metadata باشد. نام block namespaced و پایدار بماند؛ تغییر نام بعد از استفاده ممکن است محتوای ذخیره‌شده را بشکند. markup نهایی semantic باشد. patterns/templates با API رسمی ثبت شوند.

### WooCommerce
ادغام اختیاری با detection. از CRUD APIهای WooCommerce استفاده کن؛ سفارش‌ها را با SQL مستقیم یا فرض ذخیره در `wp_posts/wp_postmeta` مدیریت نکن. HPOS باید در ماتریس سازگاری باشد. پرداخت و اطلاعات کارت را ذخیره نکن؛ gateway معتبر استفاده شود. قیمت، مالیات، موجودی، تخفیف، حمل و وضعیت سفارش تحت مالکیت WooCommerce باقی بمانند. checkout، guest/customer، failure و HPOS تست شوند.

### Contact Form 7
CF7 را به‌عنوان adapter پشتیبانی کن و تنظیمات فرم موجود را بدون اجازه overwrite نکن. از hooks/APIهای مستند و بررسی نسخه استفاده کن. CF7 را خودکار CRM یا پایگاه ذخیرهٔ همهٔ submissions فرض نکن؛ در صورت نیاز integration ذخیره‌سازی مجاز/معتبر اضافه کن. ارسال موفق را صرفاً از کلیک دکمه نتیجه نگیر؛ از پاسخ/رویداد واقعی استفاده کن.

### SEO و دیگر integrations
از duplicate title/meta/schema جلوگیری کن و یک مالک مشخص برای هر فیلد SEO داشته باش. multilingual، SMTP، calendar، CRM، analytics، messaging، cache/security و membership از طریق adapter جدا باشند. برای هر integration وضعیت `supported / partial / unsupported / not tested` و نسخهٔ آزموده‌شده ثبت شود.

## A10. بستهٔ حقوقی SedRazavi Legal

این vertical باید بیش از چند ویجت با آیکون ترازو باشد.

### سطح عمومی
صفحهٔ اصلی دفتر، وکلا/تیم، حوزه‌های فعالیت، خدمات، مقالات، FAQ، تماس، ساعات/موقعیت، CTA و فرم درخواست مشاوره. CPTها برای محتوای عمومی مانند وکیل، خدمات و مقالات مناسب‌اند؛ متن و ادعاهای حقوقی ساختگی تولید نکن.

### Intake و عملیات
درخواست‌ها باید وضعیت، مسئول، زمان، اولویت، منبع و تاریخچه داشته باشند. دسترسی پنل با capability check باشد. conflict check احتمالی نیازمند بررسی انسانی است؛ سیستم نباید خودکار رابطهٔ وکیل-موکل یا پذیرش پرونده را اعلام کند.

### پرتال موکل/پرونده
مدل مفهومی: Firm/Tenant → Client → Matter/Case → Party → Document → Activity/Task → Deadline → Message.
تمام رکوردها باید firm/tenant scope داشته باشند. دسترسی به پروندهٔ دیگران با تغییر ID/URL/REST parameter باید رد شود. اسناد private by default، دانلود با authorization در هر درخواست و audit access باشند. MFA/SSO، رمزنگاری backup، incident response، retention و jurisdiction نیازمند تصمیم‌اند. این سطح تا threat model، تست امنیتی مستقل، restore drill و بررسی الزامات حوزهٔ هدف، آمادهٔ تولید برای دادهٔ حساس نیست. اگر امنیت کافی ممکن نیست، از سامانهٔ تخصصی بیرونی با adapter امن استفاده کن.

## A11. Starter sites و قالب‌های صفحه

Starter siteها باید از نظر ساختار و کاربرد متفاوت باشند، نه صرفاً رنگ متفاوت. هر بسته شامل صفحات، header/footer، templateها، tokens، patterns، navigation، نمونه‌محتوا، دارایی‌های مجاز، فرم demo با برچسب روشن، SEO پایه و راهنمای سفارشی‌سازی باشد.

دسته‌های اولیه: طراح/توسعه‌دهنده وردپرس، آژانس خلاق، فریلنسر، SaaS، خدمات تجاری، دفتر وکالت، فروشگاه، آموزش، رویداد، کسب‌وکار محلی، nonprofit، مجله/وبلاگ، waitlist اپ، رستوران/مهمان‌پذیری، املاک و پورتفولیو هنری.

Import باید idempotent باشد؛ اجرای دوباره duplicate pages/posts/media نسازد. قبل از import، انتخاب صفحات مقصد، حفظ/جایگزینی محتوا و mapping منوها نمایش داده شود.

## A12. کتابخانهٔ راه‌دور و چرخهٔ عمر بسته

Manifest هر package باید شناسه، version، type، category، title، description، author، license، attribution، حداقل نسخه‌های آزموده‌شدهٔ WP/PHP/Elementor/WooCommerce، dependencies، conflicts، asset inventory، checksums، capabilities requested، migration/rollback، artifact URL، provenance/signature در صورت وجود، changelog و deprecation status داشته باشد.

نصب امن:
1. دریافت manifest از provider allowlisted؛
2. اعتبارسنجی schema، نسخه، اندازه، checksum و provenance؛
3. بررسی dependency، conflict، capability و compatibility؛
4. preview تغییرات؛
5. تأیید صریح عملیات حساس؛
6. backup/restore point در صورت پشتیبانی؛
7. unpack در مسیر موقت و جلوگیری از path traversal؛
8. migration مرحله‌ای و log با redaction؛
9. health check و گزارش نتیجه؛
10. recovery/rollback plan و اعلام محدودیت‌های برگشت‌پذیری.

Branch زنده منبع نصب تولیدی نیست. artifact release باید immutable و نسخه‌دار باشد. عدم وجود امضای معتبر باید شفاف اعلام شود و checksum به‌تنهایی جای امضای ناشر را نمی‌گیرد.

## A13. SEO، عملکرد و امنیت

- semantic HTML، heading hierarchy، crawlable links، metadata با مالک مشخص و structured data معتبر.
- تصاویر responsive و ابعاد مشخص؛ تصویر LCP را بی‌دلیل lazy-load نکن.
- CSS/JS شرطی، queryهای محدود و pagination؛ فونت با fallback و CLS پایین.
- animation خوانایی را مختل نکند و reduced-motion داشته باشد.
- nonce + capability checks + validation + escaping؛ هرکدام وظیفهٔ جدا دارد.
- REST routeها `permission_callback` واقعی داشته باشند؛ `__return_true` فقط برای endpoint واقعاً عمومی.
- کنترل XSS، CSRF، SQL injection، SSRF، IDOR، privilege escalation، upload abuse، path traversal و rate abuse.
- secret/token/password/PII در log ثبت نشود؛ پاسخ عمومی stack trace یا اطلاعات داخلی افشا نکند.
- AI اختیاری و opt-in باشد؛ دادهٔ حساس به سرویس بیرونی بدون مجوز صریح ارسال نشود.
- رتبهٔ SEO، افزایش فروش یا نتیجهٔ حقوقی تضمین نشود.

## A14. آزمون و Definition of Done

حداقل suite:
- install/activate/deactivate/uninstall؛ حذف افزونه نباید دادهٔ کاربر را بی‌اجازه پاک کند.
- نبود Elementor/WooCommerce/CF7 و fallback.
- Gutenberg save/render و Elementor editor/frontend render.
- RTL/LTR، mobile/tablet/desktop، keyboard و reduced motion.
- nonce/capability نامعتبر، malformed data، XSS/CSRF/SQLi/SSRF/IDOR و upload نامجاز.
- فرم invalid، duplicate submit، rate limit، notification failure/retry.
- WooCommerce HPOS، guest/customer، payment failure در محیط تست.
- import تکراری، manifest خراب، checksum mismatch، dependency conflict، قطع شبکه و recovery.
- upgrade/migration failure، performance و backup/restore.
- accessibility و visual regression.

وضعیت‌ها: `VISION`, `PROPOSED`, `DECIDED`, `IMPLEMENTED`, `TESTED`, `RELEASED`, `NOT_VERIFIED`, `BLOCKED`, `DEPRECATED`, `OUT_OF_SCOPE`.
`TESTED` به دستور، محیط، نسخه، نتیجه و log/artifact نیاز دارد؛ `RELEASED` به ZIP نسخه‌دار و changelog.

---

# بخش B — قراردادهای نمونه

## B1. Widget Elementor
هر widget با API رسمی ثبت شود؛ category اختصاصی `sedrazavi`، controls در Content/Style/Advanced، responsive controls، defaults، dynamic data، semantic markup، escaping، empty state، assets شرطی و تست editor/frontend داشته باشد. تغییر schema باید migration strategy داشته باشد.

## B2. Gutenberg Block
`block.json` metadata، نام namespaced پایدار، attributes با default، server-side rendering در صورت مناسب بودن، assets تفکیک‌شده، semantic markup، deprecation/migration strategy و تست save/render داشته باشد.

## B3. REST route
برای هر route، namespace/version، method، schema ورودی، permission callback، validation، response/error contract، rate protection، audit برای عملیات حساس، redaction و تست دسترسی مجاز/غیرمجاز مشخص شود. برای render عادی بی‌دلیل REST API نساز.

## B4. نمونهٔ قرارداد فرم

```json
{
  "id": "contact_request",
  "version": 1,
  "fields": [
    {"key": "name", "type": "text", "required": true, "privacy_class": "personal"},
    {"key": "email", "type": "email", "required": true, "privacy_class": "personal"}
  ],
  "workflow": {
    "trigger": "form_submitted",
    "actions": ["create_request", "notify_assignee"],
    "idempotent": true
  },
  "retention_policy": "contact_request_default"
}
```

این مثال فقط قرارداد نمونه است و نباید بی‌بررسی به فرم حقوقی یا پرداخت تعمیم یابد.

## B5. نمونهٔ manifest کتابخانه

```json
{
  "schema_version": "1.0",
  "id": "sedrazavi.patterns.designer-hero",
  "version": "1.0.0",
  "type": "elementor-template",
  "title": "Designer Hero",
  "license": "TBD",
  "requires": {
    "wordpress": "MINIMUM_TESTED_VERSION",
    "php": "MINIMUM_TESTED_VERSION",
    "elementor": "MINIMUM_TESTED_VERSION"
  },
  "dependencies": [],
  "conflicts": [],
  "assets": [],
  "artifact": {
    "url": "RELEASE_ARTIFACT_URL",
    "sha256": "GENERATED_AT_BUILD"
  },
  "migration": [],
  "status": "proposed"
}
```

Placeholderها باید در build واقعی جایگزین شوند؛ manifest دارای placeholder نباید قابل نصب باشد.

---

# بخش C — نقشهٔ ساخت مرحله‌ای

## C1. MVP عمودی؛ ابتدا همین را پیاده کن
1. قالب سبک با header/footer، home، single/archive/search/404 و `theme.json`.
2. افزونهٔ core با bootstrap امن، capability registry، settings، diagnostics و uninstall policy.
3. یک Elementor widget واقعی به نام `SRT Hero` با content/style/responsive controls.
4. یک Gutenberg block واقعی `sedrazavi/hero` با `block.json` و PHP rendering.
5. Design Tokens برای color، typography، spacing، radius، shadow و container.
6. فرم تماس با server-side validation، ذخیره‌سازی حداقلی یا adapter مشخص، anti-spam و اعلان قابل تست.
7. یک Library item داخلی با manifest و import preview.
8. یک starter page برای طراح وردپرس با RTL/LTR و mobile layout.
9. تست نصب پاک، dependency missing، render دو ادیتور، فرم invalid و permission checks.

MVP وقتی پذیرفته است که واقعاً نصب شود، صفحه رندر شود، فرم نتیجهٔ واقعی بدهد و تست‌ها/محدودیت‌ها ثبت شوند؛ تعداد widgetها جای این پذیرش را نمی‌گیرد.

## C2. فازهای بعد
- Phase 2: خانوادهٔ پایهٔ widget/block، template library داخلی، design tokens و motion.
- Phase 3: form/workflow builder و integrations.
- Phase 4: WooCommerce adapter و starter sites فروشگاهی.
- Phase 5: Legal public site و intake؛ ابتدا بدون پروندهٔ حساس.
- Phase 6: remote Library با manifest/checksum/provenance/preview/dependency/update/rollback.
- Phase 7: client portal/matter operations پس از گیت امنیتی و حقوقی.
- Phase 8: گسترش بانک‌های ۹۶×۳ و vertical packهای جدید.

## C3. Release gates
- **A Design:** requirements، architecture، threat model و acceptance criteria.
- **B Build:** lint/build موفق و dependencyها ثبت شده‌اند.
- **C Install:** ZIP در WordPress پاک نصب و فعال شده است.
- **D Functional:** مسیرهای اصلی هر دو ادیتور و فرم کار می‌کنند.
- **E Security:** تست‌های منفی اجرا شده‌اند و P0 باز نیست.
- **F Compatibility:** ماتریس نسخه‌ها و integrations ثبت شده است.
- **G Release:** artifact، checksum، changelog، upgrade path و recovery guide آماده‌اند.

---

# بخش D — پرامپت‌های مرحله‌ای برای Google AI Studio

### D1 — تحلیل مخزن
«قبل از تغییر کد، کل مخزن و فایل‌های پیوست را فهرست و تحلیل کن. architecture، dependencies، قابلیت‌های موجود، کد مرده، ریسک امنیتی، فایل‌های تکراری و فاصله با سند را با مسیر فایل و شواهد گزارش کن. نام فایل یا README را اثبات پیاده‌سازی فرض نکن. فعلاً کد را تغییر نده.»

### D2 — معماری
«requirements شناسه‌دار، dependency graph، file tree، data flow، threat model، package contract، REST contracts و تصمیم‌های معماری لازم را تولید کن. برای تصمیم‌های مهم گزینه‌ها، trade-off و پیشنهاد بده. موارد مسدودکننده را جدا کن و حدس را به‌جای تصمیم ثبت نکن.»

### D3 — MVP
«فقط MVP بخش C1 را پیاده کن: یک Elementor widget، یک Gutenberg block، Design Tokens، فرم امن و Library item. قبل از تغییر، فایل‌ها و اثر تغییر را فهرست کن. کد را در فایل‌های درست بنویس، lint/build/test را اجرا و نتیجه را گزارش کن. از React SPA و shortcode به‌عنوان راهکار اصلی استفاده نکن.»

### D4 — بازرس امنیت
«کد را مستقل از توضیحات قبلی نقد کن: nonce، capabilities، REST permissions، escaping، SQL، uploads، SSRF، XSS، CSRF، IDOR، secrets، privacy، rate limit، path traversal و failure handling. هر finding دارای severity، مسیر، سناریو، اصلاح و regression test باشد. اصلاح کن و تست را دوباره اجرا کن؛ تست اجرا‌نشده را صریح ثبت کن.»

### D5 — بازرس UI/UX
«UI را در desktop/tablet/mobile و RTL/LTR نقد کن: hierarchy، readability، contrast، focus، keyboard، form errors، empty/loading/success/error states، responsive controls، reduced motion و progressive disclosure. برای هر ایراد سناریو و معیار پذیرش تعریف و اصلاح را در کد واقعی اعمال کن.»

### D6 — integrations
«Elementor، Gutenberg، WooCommerce، Contact Form 7 و SEO adapters را جداگانه بررسی کن. نسخه را تشخیص بده، API عمومی مستند را ترجیح بده، dependency اختیاری را جدا کن و fallback ارائه کن. سازگاری را بدون تست ادعا نکن. WooCommerce باید از CRUD API و HPOS پشتیبانی کند.»

### D7 — بانک ۹۶×۳
«برای بانک [نام بانک] دقیقاً ۹۶ آیتم متوسط، ۹۶ پیشرفته و ۹۶ ماکزیمال‌کمپلکس به‌عنوان catalog plan بساز. هر آیتم شناسه، کاربرد متمایز، editor support، controls، data contract، dependency، security/accessibility/performance notes و acceptance test داشته باشد. موارد تکراری و تفاوت صرفاً رنگی را حذف کن. سپس فقط یک دستهٔ کوچک را پیاده‌سازی و تست کن؛ roadmap را با کد ساخته‌شده یکی نکن.»

### D8 — بسته‌بندی
«قالب و افزونه را جداگانه ZIP کن. نصب پاک، فعال‌سازی، render، فرم، غیرفعال‌سازی و upgrade را تست کن. dependency/license، checksum، version و changelog را ثبت کن. تست اجرا‌نشده را NOT RUN اعلام کن و فقط لینک فایل موجود و تأییدشده بده.»

---

# بخش E — چرخهٔ نقد و معیار توقف

هر دور نقد باید این پنج خروجی را داشته باشد:
1. `Finding`: ایراد دقیق با شناسه و شدت.
2. `Evidence`: مسیر فایل، تست، log یا منبع معتبر.
3. `Remediation`: راهکار مشخص.
4. `Regression test`: آزمونی برای اثبات اصلاح و عدم شکست قابلیت قبلی.
5. `Residual risk`: ریسک باقیمانده، مالک تصمیم و دلیل پذیرش.

Severity:
- `P0`: نشت داده، اجرای غیرمجاز کد، از دست رفتن داده یا مانع اصلی نصب؛ انتشار متوقف.
- `P1`: مشکل جدی امنیتی/داده‌ای یا شکست مسیر اصلی؛ انتشار متوقف تا اصلاح یا پذیرش رسمی ریسک.
- `P2`: مشکل مهم UX/سازگاری/عملکرد با workaround؛ زمان‌بندی و ثبت شود.
- `P3`: بهبود کم‌خطر یا polish؛ backlog.

توقف چرخه وقتی مجاز است که P0 باز نباشد، P1ها اصلاح یا رسماً با mitigation پذیرفته شده باشند، دو دور متوالی finding بحرانی جدید نداشته باشند، regression tests موفق باشند و ریسک‌ها/موارد NOT TESTED اعلام شده باشند. این معیار تضمین نمی‌کند هیچ نقدی در آینده ممکن نیست؛ یک معیار توقف مهندسی قابل دفاع است.

---

# بخش F — تصمیم‌های باز

این موارد نباید جعل یا با حدس پر شوند:
- حداقل نسخه‌های WordPress/PHP و نسخه‌های آزموده‌شدهٔ Elementor/WooCommerce؛
- multisite support؛
- مدل مجوز رایگان/پریمیوم؛
- cloud/self-hosted/hybrid بودن Studio و Library؛
- provider کاتالوگ، امضای artifact و مالکیت کلیدها؛
- حوزهٔ قضایی و الزامات privacy برای Legal؛
- retention و محل نگهداری داده؛
- provider پیامک/ایمیل/تقویم و مجوز API کانال‌ها؛
- مرورگرهای پشتیبانی‌شده و performance budget؛
- vulnerability disclosure و incident response؛
- مالکیت و attribution assetها.

تا زمان تصمیم، `TBD` ثبت و پیامدش را توضیح بده.

---

# بخش G — منابع رسمی و روش پژوهش

منابع رسمی را هنگام اجرا دوباره بررسی کن؛ مستندات جاری بر حافظهٔ مدل تقدم دارند:

1. WordPress Plugin Handbook: <https://developer.wordpress.org/plugins/>
2. WordPress Security: <https://developer.wordpress.org/apis/security/>
3. Block API Registration: <https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/>
4. WordPress Theme Handbook: <https://developer.wordpress.org/themes/>
5. WordPress Coding Standards: <https://developer.wordpress.org/coding-standards/wordpress-coding-standards/>
6. Elementor Developer Docs: <https://developers.elementor.com/docs/>
7. Elementor Widgets: <https://developers.elementor.com/docs/widgets/>
8. WooCommerce Developer Docs: <https://developer.woocommerce.com/docs/>
9. WooCommerce HPOS: <https://developer.woocommerce.com/docs/features/orders/high-performance-order-storage/>
10. Contact Form 7 Docs: <https://contactform7.com/docs/>
11. Google AI Studio Build mode: <https://ai.google.dev/gemini-api/docs/aistudio-build-mode>
12. Google AI Studio full-stack apps: <https://ai.google.dev/gemini-api/docs/aistudio-fullstack>

برای تحقیق تکمیلی، مستندات رسمی و changelogها را مرجع API و امنیت قرار بده؛ ویدئوهای فارسی/انگلیسی YouTube و Aparat برای کشف workflow و ایدهٔ UX مفیدند اما به‌تنهایی مرجع فنی نهایی نیستند. برای هر ایدهٔ بیرونی URL، تاریخ بررسی، خلاصه، تفاوت با نیاز پروژه، مجوز و تصمیم اقتباس ثبت شود. اگر امکان جست‌وجو یا دیدن ویدئو در محیط وجود ندارد، وانمود نکن بررسی شده؛ آن را در research backlog قرار بده.

---

# پیوست 1 — Definition of Done

یک قابلیت فقط وقتی `DONE` است که نیاز و سناریو تعریف شده، data/settings contract روشن، UI واقعی، frontend معنایی و responsive، backend/permission/persistence واقعی در صورت نیاز، خطا/خالی/بارگذاری/موفقیت، security/privacy/accessibility/SEO/performance review، تست تکرارپذیر، dependency/license/compatibility و مستندات/changelog داشته باشد.

# پیوست 2 — قرارداد اتصال فرانت‌اند و بک‌اند

برای هر interaction مشخص کن: آغازگر، دادهٔ ارسالی، محل validation، capability، محل ذخیره، event، پاسخ UI، timeout/retry/idempotency، داده‌های مجاز log، دسترسی‌ها و retention/deletion.

# پیوست 3 — اصل نهایی

**هدف بزرگ‌ترین فهرست ظاهری نیست؛ هدف بانک منظم و قابل اتکایی از قابلیت‌های واقعاً متفاوت، قابل ترکیب، قابل تنظیم، امن، قابل تست و قابل نگهداری است.** هرجا تعداد گزینه‌ها با UX، امنیت یا performance تعارض داشت، trade-off را ثبت کن. ابتدا هستهٔ کوچک end-to-end را اثبات کن و سپس بانک‌ها و vertical packها را با همان قرارداد گسترش بده.


---

# Prompt v2 Addendum — Mandatory Repository Audit, Performance, SEO and Security

## Context to inspect before changing anything
Repository: `https://github.com/Aqamirrazavi/Sedrazavi-WPtemplate`

The repository currently describes a hybrid setup: WordPress theme under `wordpress-theme/`, React/Vite developer or preview app under `src/`, and companion/add-on folders. Treat the public README as a claim to verify, not proof that the implementation is complete. Inspect actual files and current branch before writing code. If repository access or execution is unavailable, state the limitation and never fabricate test results.

## Mandatory first task: evidence-based audit
Read and map at minimum:
- `README.md`, `package.json`, lockfile, `vite.config.ts`, TypeScript config;
- `.github/workflows/*`, `scripts/*`;
- `wordpress-theme/style.css`, `functions.php`, `header.php`, `footer.php`, `index.php`, all template files;
- `wordpress-theme/inc/react-shortcodes.php`, `inc/wp-rest-auth.php`, `inc/api-handlers.php`;
- `elementor-addon-suite/`, `sedrazavi-addons/`, `sedrazavi-companion/`, `src/`;
- every PHP file that registers CPTs, REST routes, AJAX handlers, shortcodes, scripts/styles, capabilities, uploads, cron jobs or data export.
For each claim, record `finding_id`, severity P0-P3, evidence path/line, reproduction, impact, root cause, remediation, regression test, residual risk and status. Separate source findings from inference and unverified assumptions.

## Immediate high-risk checks identified from the online repository snapshot
1. `wordpress-theme/functions.php` registers `case` with `public=true`, `has_archive=true`, and `show_in_rest=true`, while the repository describes case records as confidential. Default-deny private records, separate public case studies from confidential case records, and test permalink/archive/search/feed/sitemap/REST/attachment/export access. Do not release case management until anonymous and IDOR tests pass.
2. `inc/wp-rest-auth.php` contains a case permission callback that returns true for logged-in users outside the admin/editor branch, with ownership checks delegated to handlers. Prove ownership validation on every operation. Nonce is not authorization.
3. `inc/api-handlers.php` has a save-permission path accepting a valid REST nonce in addition to capability checks. Require capability + ownership + validation for every write; a nonce alone must never authorize changes.
4. `functions.php` and `inc/react-shortcodes.php` appear to manage built assets through different candidate paths. Create one build manifest and one enqueue service; fail CI on missing or inconsistent artifacts.
5. `header.php` hardcodes `dir="rtl"` despite Persian/English product goals. Use locale-aware direction and logical CSS; test mixed text, keyboard order and icon direction.
6. `header.php` and `footer.php` read header/footer archetypes from query parameters. Use strict allowlists and a permission-gated preview mode; prevent duplicate indexable URLs and cache variation.
7. Public profile/bootstrap endpoints and `wp_localize_script` payloads must be reviewed for unnecessary email, role, IDs, nonces or private settings; test HTML source and cache separation.
These are code-review findings from visible source, not a completed penetration test. Recheck current source before applying fixes.

## Non-negotiable architecture
- WordPress theme/plugin output is the customer-facing product. React may power the developer/admin interface or official editor integrations, but not replace WordPress content rendering with a separate SPA.
- Elementor is first priority. Gutenberg support is a real block implementation using WordPress block APIs and `block.json`; it is not merely a promise of compatibility.
- Shared component schema/data contract with independent Elementor and Gutenberg adapters.
- Shortcodes are compatibility/legacy only; do not use them as the primary authoring system for new capabilities.
- Business data, CPTs, workflows, permissions and private records belong in the plugin/domain packs; theme owns presentation and templates.
- Public HTML must contain the main content and meaningful links without requiring React hydration.
- Every claimed feature has status `idea/spec/prototype/implemented/tested/released/deprecated/blocked` and linked evidence. No invented “pass” results.

## Performance engineering gates
- Split build targets: public front-end, Elementor/Gutenberg editor adapters, and admin/developer app. Prevent charting, archive/ZIP, AI, motion or app-only libraries from leaking into public pages unless the page actually uses them.
- Central build manifest; dependency-aware enqueue; conditional assets per widget/block/template; no global loading of the whole catalog.
- Measure compressed/uncompressed JS/CSS, requests, unused JS, long tasks, database queries and field performance. Do not raise bundle warning limits to hide regressions.
- Set a per-recipe budget after baseline. Track regressions in CI.
- Responsive images with dimensions, `srcset`/`sizes`, correct LCP image priority, no lazy-loading the LCP image, lazy-load below-the-fold media, subset local fonts, reserve space for embeds, and avoid layout shifts.
- Third-party maps/video/chat/analytics are lazy and consent-aware when appropriate. Prefer lightweight facades for heavy embeds.
- Public page targets for field data at the 75th percentile: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1. These are targets to measure, not current claims.
- Test low-end mobile/slow network and real pages; Lighthouse score alone is not proof.

## SEO gates
- Exactly one owner for title/meta/canonical/Open Graph/schema; integrate with SEO plugins instead of duplicating output.
- Semantic server-rendered HTML, crawlable links, correct heading hierarchy, pagination, image alt policy, sitemap and robots rules.
- No private case, dashboard, preview, member-only or personal data in sitemap/schema/search/feed.
- Locale-aware `lang` and `dir`; true RTL/LTR and bidirectional text tests.
- Query-driven design preview must be allowlisted, non-indexable where appropriate, and cache-safe.
- Structured data must match visible content and verified facts; never invent ratings, reviews, legal credentials or organization attributes.

## Security and privacy gates
- Default-deny for sensitive CPTs and endpoints; route-specific `permission_callback`, typed argument schema, validation and sanitization, capability check, per-object ownership/tenant check.
- Nonce is CSRF intent signal, not identity, capability or authorization.
- Test anonymous, client, lawyer, editor, administrator, multisite and object-ID tampering.
- Audit XSS (stored/reflected/DOM), CSRF, IDOR, SSRF, SQL injection, upload polyglots, path traversal, open redirects, rate-limit bypass and cache leakage.
- Trusted proxy configuration only for client IP; never trust arbitrary forwarding headers.
- No secrets, session cookies, nonces, private form contents or case details in logs. Redact errors and diagnostics.
- SVG sanitization is strict allowlist; if safe sanitization cannot be proven, use attachment/raster preview instead of inline SVG.
- Demo/mock authentication must be impossible in production and CI must assert it is disabled.
- Dependency/license inventory, vulnerability scan, update/migration tests, backup and rollback evidence required.

## UX and accessibility gates
- Every panel and widget has loading, empty, error, success and disabled states; error explains next action without leaking internals.
- Keyboard-only navigation, visible focus, screen-reader names/status, contrast, zoom 200%, mobile 320px, long Persian/English strings and reduced-motion tests.
- Responsive controls must define inheritance and reset behavior; changing one breakpoint cannot silently overwrite others.
- Avoid configuration overload: progressive disclosure, searchable controls, safe defaults, presets, clear reset, and explanations for advanced/complex settings.
- Dark/light preference must have no avoidable flash and must remain usable without localStorage or JavaScript.

## CI/release requirements
Add to the existing workflow rather than assuming existing custom Node scripts cover these:
- PHP lint, WordPress Coding Standards/PHPCS, PHPUnit/WP integration tests;
- WordPress clean install and activation/deactivation;
- actual ZIP install, update and rollback;
- REST permission and IDOR tests;
- Elementor absent/Free/Pro and Gutenberg editor smoke tests for the supported matrix;
- WooCommerce HPOS tests if WooCommerce support is claimed;
- browser tests, accessibility smoke tests and performance budgets;
- artifact manifest/checksum, dependency/license inventory, changelog and known limitations.
A file-existence test or successful TypeScript build does not establish that a WordPress package works.

## Critique loop protocol
Repeat:
1. independent audit;
2. evidence-backed findings;
3. architecture decision record and trade-offs;
4. fix;
5. regression test;
6. second independent review;
7. record residual risk.
Stop only after two consecutive independent review rounds in the declared scope yield no new findings, all P0/P1 findings are closed, and tests pass. Call the result `reviewed-with-evidence`, never “perfect” or “fully secure”. If execution is unavailable, mark the relevant test `not-run` and block release claims.

## Required outputs from this phase
- `audit-report.md`
- `risk-register.csv`
- `dependency-matrix.csv`
- `architecture-decisions.md`
- `performance-baseline.json` plus report
- `seo-crawl-report.md`
- `security-test-matrix.md`
- `release-evidence.md`
- updated installable theme/plugin ZIPs only after the release gates pass
