# SedRazavi OS — سند مرجع محصول، معماری هدف و برنامهٔ پذیرش
## نسخهٔ 25.0 — بازنگری ساختاری، محصول حقوقی کامل‌تر و کتابخانهٔ مرکزی

**وضعیت سند:** `PROPOSED / ARCHITECTURE BASELINE`؛ این سند مشخصات هدف و قرارداد طراحی است، نه گواه پیاده‌سازی یا آمادگی انتشار.

**مخزن مرجع فعلی:** <https://github.com/Aqamirrazavi/Sedrazavi-WPtemplate>

**قاعدهٔ اصلی:** ابتدا محصول مطلوب و شواهد موردنیاز آن تعریف می‌شود؛ سپس مخزن فعلی با آن سنجیده می‌شود. وجود یک فایل در مخزن یا توضیح README به‌تنهایی اثبات عملکرد نیست. هر قابلیت باید وضعیت مستقلی داشته باشد: `VISION`, `REQUIREMENT`, `PROPOSED`, `DECIDED`, `IMPLEMENTED`, `TESTED`, `RELEASED`, `NOT_VERIFIED`, `BLOCKED`, `DEPRECATED` یا `OUT_OF_SCOPE`.

**این نسخه جایگزین نسخهٔ 24 به‌عنوان مرجع جاری است.** نسخهٔ 24 برای حفظ سابقه در فایل آرشیو جداگانه نگهداری شده است؛ مطالب تکراری تاریخی آن به‌جای اینکه بی‌نهایت به سند اصلی اضافه شوند، سابقه محسوب می‌شوند. اگر مفهومی از نسخهٔ قدیمی در این سند دوباره آمده، فقط تعریف و قرارداد این نسخه مرجع اجرایی است.

---

## 0. خلاصهٔ تصمیم‌ها و روش استفاده

### 0.1 محصولی که می‌سازیم

SedRazavi OS یک **پلتفرم ساخت، پیکربندی، بسته‌بندی و نگهداری محصولات وردپرسی** است؛ شامل هستهٔ runtime، بسته‌های تخصصی، سازنده/Studio، کتابخانهٔ مرکزی، آداپتورهای ادیتور و افزونه، و زنجیرهٔ ساخت و تضمین کیفیت. «OS» نام محصول است و به‌خودی‌خود به معنی سیستم‌عامل یا تضمین اجرای مستقل از WordPress نیست.

دو محصول نباید با هم اشتباه شوند:

1. **SedRazavi OS Platform:** زیرساخت ترکیب‌پذیر و چندحوزه‌ای.
2. **SedRazavi Legal:** نخستین بستهٔ تخصصی و محصول پرچم‌دار برای وکیل، دفتر وکالت، مشاور حقوقی و مجموعه‌های حقوقی؛ باید حفظ و به‌طور جدی تکمیل شود، نه اینکه به‌عنوان نمونه‌ای موقت کنار گذاشته شود.

### 0.2 تصمیم‌های معماری لازم‌الاجرا برای طراحی

- هستهٔ مشترک از منطق اختصاصی هر صنف جداست؛ قابلیت تخصصی در بستهٔ vertical قرار می‌گیرد، نه در شرط‌های پراکندهٔ هسته.
- کتابخانهٔ SedRazavi جزء اصلی محصول است؛ کاتالوگ راه‌دور باید manifest نسخه‌دار و artifactهای immutable داشته باشد. دریافت فایل از branch زنده یا اجرای خودکار کد خام از مخزن ممنوع است.
- WordPress runtime باید پس از نصب برای عملکردهای اصلی سایت به Studio یا سرویس AI وابسته نباشد. کاتالوگ و AI می‌توانند برای برخی عملیات آنلاین لازم باشند، اما قطع آن‌ها نباید سایت منتشرشده را از کار بیندازد.
- Gutenberg مسیر پایه و استاندارد وردپرس است؛ Elementor با آداپتور و قرارداد سازگاری جدا پشتیبانی می‌شود. «پشتیبانی از هر دو» ادعای parity کامل نیست؛ هر قابلیت ماتریس parity مستقل دارد.
- قالب، افزونهٔ قابلیت‌محور، بلوک/ویجت، داده، صفحه و asset مالکیت و چرخهٔ عمر جدا دارند. تغییر قالب نباید دادهٔ کسب‌وکار را حذف کند.
- هیچ محتوای حقوقی حساس، پروندهٔ موکل، سند محرمانه یا دادهٔ احراز هویت نباید به‌طور پیش‌فرض در CPT عمومی، REST عمومی، search عمومی، log یا prompt مدل قرار بگیرد.
- نصب، update، migration، import و حذف باید قابل پیش‌نمایش، قابل ثبت و تا حد ممکن قابل بازگشت باشند.
- کیفیت با سناریو و آزمون قابل تکرار سنجیده می‌شود؛ حجم قابلیت‌ها یا زیبایی UI به‌تنهایی معیار Done نیست.

### 0.3 آنچه این سند ادعا نمی‌کند

این سند ادعا نمی‌کند که تمام موارد در کد فعلی وجود دارند، تست شده‌اند، از نظر امنیتی تأیید شده‌اند یا برای انتشار آماده‌اند. صفحهٔ عمومی مخزن ساختارهایی مانند `wordpress-theme/`, `src/`, `sedrazavi-companion/` و `elementor-addon-suite/` را نمایش می‌دهد و README دربارهٔ theme هیبریدی، React/Vite، فرم‌ها و pipeline توضیح می‌دهد؛ این موارد صرفاً شواهد جهت‌دهنده برای ممیزی‌اند، نه اثبات رفتار runtime. در صفحهٔ عمومی بررسی‌شده، بخش Releases خالی نمایش داده می‌شد؛ وضعیت artifactهای محلی یا انتشارهای خارج از GitHub از این مشاهده معلوم نمی‌شود. منبع: <https://github.com/Aqamirrazavi/Sedrazavi-WPtemplate>.

### 0.4 ترتیب تقدم

1. امنیت، محرمانگی، حقوق اشخاص، مالکیت و قابلیت بازیابی داده.
2. نیاز تأییدشده و نتیجهٔ واقعی کاربر.
3. قراردادهای محصول و مرزهای معماری.
4. صحت، دسترس‌پذیری، عملکرد، نگهداری و قابلیت مهاجرت.
5. محدودیت‌های فنی اثبات‌شده.
6. هزینه، زمان و دامنهٔ تحویل.
7. حفظ کد موجود فقط در صورتی که با موارد بالاتر سازگار باشد.

---

## 1. ممیزی نسخهٔ 24: یافته‌ها، خلأها و اصلاحات

این ممیزی، ممیزی **خود سند** و بررسی سطحی شواهد عمومی مخزن است. بدون clone/build/test در محیط مشخص، نباید آن را ممیزی کامل کد یا تست نفوذ معرفی کرد.

| شناسه | یافته / شکاف | چرا مهم است | تصمیم نسخهٔ 25 | مدرک لازم برای بستن |
|---|---|---|---|---|
| AUD-01 | نسخهٔ 24 اطلاعات زیاد و مفید دارد، اما فصل‌های تاریخی و نسخه‌های پیاپی تکرار می‌شوند. | تناقض و ابهام دربارهٔ اینکه کدام بند حاکم است. | سند جاری ساختاریافته؛ نسخهٔ 24 به آرشیو منتقل می‌شود. | کنترل نسخه و فهرست تصمیم‌های فعال |
| AUD-02 | «کتابخانه» به شکل دسته‌بندی و قابلیت‌های کلی مطرح است، نه محصول end-to-end با چرخهٔ عمر کامل. | دریافت، نصب، اعتماد، update، rollback و حذف ممکن است رفتارهای متفاوت و ناایمن داشته باشند. | قرارداد کامل Library در فصل 6. | تست manifest، نصب، به‌روزرسانی، rollback و قطع شبکه |
| AUD-03 | محصول حقوقی به CPTهای عمومی و چند قابلیت وب‌سایت نزدیک‌تر است تا نقشهٔ محصول عملیاتی کامل. | سایت بازاریابی، دریافت درخواست، پرتال موکل و عملیات پرونده، ریسک‌ها و مالکیت دادهٔ متفاوت دارند. | سه سطح دامنه و مدل دادهٔ جدا در فصل 4. | سناریوهای پذیرش و threat model برای هر سطح |
| AUD-04 | مدل چندحوزه‌ای و extensionها مفهومی‌اند؛ مرز بسته، dependency و entitlement باید قابل‌ماشین‌خوانی باشد. | «انعطاف» بدون قرارداد به پیچیدگی شرطی و شکست نصب منجر می‌شود. | Package Contract و Capability Registry در فصل 5. | schema validation و dependency resolver tests |
| AUD-05 | سازگاری Gutenberg/Elementor تعریف شده، اما تصمیم محصولی برای اولویت، parity و fallback نیاز به گیت روشن دارد. | امکان وعدهٔ بیش از حد یا تجربهٔ ناهماهنگ. | Gutenberg-first، Elementor adapter، parity matrix. | ماتریس نسخه و آزمون editor/frontend |
| AUD-06 | اصول امنیتی مطرح‌اند، اما جریان‌های پرخطر Library و پروندهٔ حقوقی نیازمند کنترل دقیق‌تر trust boundary هستند. | artifact مخرب، SSRF، privilege escalation، IDOR یا نشت اطلاعات. | threat model مخصوص Library و legal workflow. | تست منفی و گزارش امنیتی مستقل |
| AUD-07 | شاخص‌های کیفیت و تست در سند وجود دارند، اما به release gateهای عددی و evidence package محصولی متصل نیستند. | «Done» قابل اثبات نیست. | gateهای مرحله‌ای و معیارهای سنجش در فصل 11. | گزارش CI، artifact، تست نصب و restore drill |
| AUD-08 | برخی تصمیم‌های پایه مثل cloud/self-hosted، پشتیبانی multisite، نسخه‌های PHP/WP، entitlement و jurisdiction هنوز بازند. | این تصمیم‌ها بر API، امنیت، عملیات و هزینه اثر مستقیم دارند. | فهرست تصمیم‌های مسدودکننده در فصل 13؛ حدس جایگزین تصمیم نمی‌شود. | ADR امضاشده توسط مالک محصول |
| AUD-09 | متن مستر معماری نمی‌تواند جای ممیزی واقعی مخزن، کد، وابستگی‌ها و بستهٔ نصب را بگیرد. | خطر فاصلهٔ زیاد بین سند و محصول. | دو دفتر جدا: «هدف» و «شواهد وضعیت فعلی». | commit، محیط، دستور، log و artifact |
| AUD-10 | ادعای نقدناپذیری مطلق قابل اثبات نیست. | ایجاد اطمینان کاذب و پنهان کردن ریسک باقی‌مانده. | معیار توقف مبتنی بر دو دور نقد پایدار، بدون P0/P1 بازِ بی‌پذیرش و ثبت residual risk. | دفتر findingها و صورت‌جلسهٔ هر دور |

### 1.1 محدودیت‌های این ممیزی

- README و فهرست فایل‌ها از صفحهٔ عمومی مخزن مشاهده شده‌اند؛ این به معنی اجرای کد یا تأیید همهٔ ادعاهای README نیست.
- فایل‌های محیط واقعی، secretها، تست‌های اجراشده، artifactهای نصب و رفتار سایت عملیاتی از این مشاهده قابل تأیید نیستند.
- انطباق حقوقی محصول با کشور یا حوزهٔ قضایی خاص هنوز تصمیم نشده است؛ این سند جای مشاورهٔ حقوقی محلی نیست.
- برای ادعای «پیاده‌سازی‌شده»، «امن»، «سازگار» یا «آمادهٔ انتشار» باید evidence package مربوط ارائه شود.

---

## 2. تعریف محصول و کاربران

### 2.1 کاربران و Jobs-to-be-done

| نقش | کار اصلی | خروجی موفق |
|---|---|---|
| مالک محصول / دفتر حقوقی | تعریف هویت، خدمات، محتوا و workflowهای مجاز | سایت و ابزارهای متناسب با کار واقعی دفتر |
| مدیر سایت | پیکربندی، نصب بسته، نگهداری و کنترل دسترسی | سایت قابل اداره بدون ویرایش کد |
| طراح / آژانس | انتخاب archetype، ترکیب section و شخصی‌سازی | طرح متمایز، قابل ویرایش و قابل تحویل |
| توسعه‌دهنده | ساخت extension، adapter و package | قرارداد پایدار، مستند و قابل تست |
| وکیل / کارمند مجاز | رسیدگی به درخواست‌ها و وظایف مجاز | کار درست با دسترسی حداقلی و audit trail |
| موکل / متقاضی | درخواست تماس یا استفاده از پرتال مجاز | مسیر روشن، محرمانه و قابل فهم |
| QA / عملیات | آزمون، بسته‌بندی، انتشار و بازیابی | خروجی قابل بازتولید با گزارش کیفیت |

### 2.2 لایه‌های محصول

1. **WordPress Runtime:** theme، companion/core plugin، vertical packs و adapters.
2. **SedRazavi Library:** کاتالوگ و جریان نصب بسته‌ها و assets.
3. **SedRazavi Studio:** محیط تعریف پروژه، طراحی، پیش‌نمایش، ساخت و QA؛ می‌تواند در آینده cloud، self-hosted یا hybrid باشد، اما مدل استقرار باید با ADR تعیین شود.
4. **Build & Release System:** تولید artifactهای نسخه‌دار، بررسی dependency، SBOM متناسب، checksum و تست نصب.
5. **Optional Services:** AI، telemetry رضایت‌محور، entitlement/license، notification provider و integrations. Runtime نباید برای نمایش صفحات عمومی به سرویس اختیاری وابسته باشد.

### 2.3 سه سطح محصول حقوقی

**سطح A — Public Law Firm Website (پایهٔ قابل عرضه):**
- صفحهٔ اصلی و landing pageهای خدمات؛
- معرفی وکیل/تیم، تخصص‌ها، حوزه‌های فعالیت، مقالات، FAQ، تماس و موقعیت؛
- فرم درخواست مشاوره/تماس با anti-spam، اطلاع‌رسانی حریم خصوصی و حداقل‌سازی داده؛
- SEO فنی، schema متناسب و بدون ادعای رتبهٔ تضمینی؛
- طراحی responsive، فارسی/RTL و قابلیت تغییر زبان/منطقه در صورت نیاز.

**سطح B — Intake & Office Workflow (افزونهٔ اختیاری):**
- صف درخواست‌های ورودی، وضعیت، تخصیص به کارمند، یادآوری، deduplication و گزارش؛
- تقویم و نوبت‌دهی با منطقهٔ زمانی، ظرفیت، لغو و عدم حضور؛
- فرم‌های چندمرحله‌ای با هشدار روشن دربارهٔ اطلاعاتی که نباید ارسال شود؛
- ثبت consent/notice در حد نیاز و retention قابل تنظیم؛
- عدم نمایش جزئیات درخواست در URL، notification عمومی یا log.

**سطح C — Client Portal & Matter Operations (محصول جداگانه با گیت امنیتی):**
- احراز هویت قوی، دسترسی موکل به پروندهٔ متعلق به خود، اسناد و پیام‌ها؛
- پرونده، اشخاص مرتبط، رویدادها، taskها، سندها، مهلت‌ها و تاریخچهٔ دسترسی؛
- کنترل tenant/firm و مالکیت هر رکورد در سمت سرور؛
- رمزنگاری مناسب، retention، export/erasure policy، backup/restore و incident response؛
- عدم عرضه تا تکمیل threat model، privacy impact assessment، تست‌های authorization/IDOR، بررسی حقوقی حوزهٔ هدف و بازیابی واقعی.

سطح C را نباید صرفاً با افزودن چند CPT یا یک داشبورد به سطح A تبدیل کرد. اگر معماری/قانون/میزبانی مناسب نباشد، اطلاعات پرونده باید در سامانهٔ تخصصی خارجی بماند و SedRazavi فقط از طریق adapter کنترل‌شده با آن یکپارچه شود.

### 2.4 Non-goals و مرز وعده‌ها

- سازگاری تضمینی با هر افزونه، هر نسخهٔ PHP یا هر page builder وعده داده نمی‌شود.
- AI بدون بررسی انسانی، مرجع تولید محتوای حقوقی قطعی یا ارائه‌دهندهٔ مشاورهٔ حقوقی نیست.
- هیچ قابلیت «خودترمیمی» حق ندارد بی‌اجازهٔ کاربر دادهٔ تولیدی را تغییر دهد.
- نصب package از مخزن عمومی به معنی تأیید امنیتی یا مجوز استفاده از محتوای آن نیست.
- رتبهٔ SEO، افزایش مشتری، یا نتیجهٔ حقوقی قابل تضمین نیست.

---

## 3. معماری مرجع و مرز مسئولیت

### 3.1 نمای کلان

```text
SedRazavi Studio / CLI
  ├─ Project Contract + Design System
  ├─ Composer / Preview / QA
  └─ Build Orchestrator
          │ signed/versioned artifacts
          ▼
SedRazavi Library Services ── Catalog Manifest / Artifact Store / Entitlement
          │                                  │
          ▼                                  ▼
WordPress Site Runtime                Publisher / Review Pipeline
  ├─ Theme (presentation)
  ├─ Core Companion Plugin (stable services)
  ├─ Vertical Pack(s) (e.g. Legal)
  ├─ Editor Adapters (Gutenberg / Elementor)
  └─ Third-party Integrations (explicit adapters)
```

این نمودار logical است؛ استقرار فیزیکی Studio و سرویس Library تا تصویب ADR قطعی نیست.

### 3.2 Theme

مسئول ظاهر، templateها، template parts، style variation، tokenها، patternهای presentation و integration حداقلی با چرخهٔ رندر وردپرس است. منطق تجاری، پروندهٔ موکل، مجوزها، migration داده و workflow حساس نباید فقط در theme باشد؛ تعویض theme نباید دادهٔ تجاری را از بین ببرد.

### 3.3 Core Companion Plugin

مسئول capability registry، APIهای داخلی، schema/validation، capability checks، event contracts، migration framework، health diagnostics و lifecycle قابلیت‌های مشترک است. هسته باید کوچک بماند؛ قابلیت‌هایی که همهٔ سایت‌ها لازم ندارند در module/package جدا باشند.

### 3.4 Vertical Package

هر vertical شامل manifest، schema محتوا، capabilityها، صفحات/الگوها، تنظیمات، ترجمه، permission matrix، dependency، migration، تست و مستندات خودش است. Legal نباید با `if (is_legal)`های پراکنده در هسته پیاده‌سازی شود.

### 3.5 Studio و Runtime

Studio محیط ساخت و عملیات پروژه است؛ Runtime سایت نهایی است. Studio می‌تواند آنلاین نباشد و Runtime همچنان صفحات عمومی را ارائه دهد. هر سرویس remote دارای timeout، retry محدود، cache، circuit breaker یا fallback متناسب است. کلیدهای محرمانه هرگز در JavaScript عمومی یا artifact قابل دانلود قرار نمی‌گیرند.

### 3.6 قواعد dependency

- وابستگی‌ها یک‌طرفه و ثبت‌شده باشند؛ cycle ممنوع است.
- theme به vertical plugin وابستگی سخت نداشته باشد؛ اگر module غیرفعال شد، fallback امن و پیام قابل فهم نشان دهد.
- vertical package می‌تواند core plugin را با حداقل نسخهٔ مشخص لازم بداند.
- adapterها فقط از API عمومی مستند استفاده کنند؛ وابستگی به private internals افزونهٔ ثالث نیازمند هشدار و تست نسخه‌ای است.
- هر قابلیت باید در نبود dependency حالت تعریف‌شده داشته باشد: `disabled`, `degraded`, `fallback` یا `blocked`.

---

## 4. SedRazavi Legal — مدل محصول حقوقی و معیار تکمیل

### 4.1 ساختار دامنه

Legal به ماژول‌های مستقل تقسیم می‌شود تا مشتری بتواند فقط بخش موردنیاز را فعال کند:

- `legal-public-site`: خدمات، وکلا، مقالات، FAQ، CTA، صفحات محلی و schema عمومی؛
- `legal-intake`: فرم‌های ورودی، consent/notice، ضداسپم، triage و تخصیص؛
- `legal-appointments`: ظرفیت، timezone، رزرو، تغییر/لغو و اعلان؛
- `legal-client-portal`: هویت، مجوزهای موکل، اسناد و پیام‌ها؛
- `legal-matters`: مدل پرونده و فعالیت‌ها، فقط در سطح C و پس از گیت امنیتی؛
- `legal-documents`: metadata، نسخه‌ها، کنترل دسترسی و دانلود امن؛
- `legal-deadlines`: مهلت‌ها، تقویم، یادآوری و audit؛
- `legal-billing` (اختیاری): صورتحساب/پرداخت فقط با تصمیم مستقل و provider امن؛
- `legal-integrations`: adapterهای تقویم، CRM، ایمیل/SMS، امضای الکترونیکی و سامانه‌های پروندهٔ خارجی؛
- `legal-content-kit`: صفحه‌ها، patternها، templateها، محتواهای اولیه و طراحی‌های عمودی.

این فهرست نقشهٔ قابلیت است؛ هر ماژول برای انتشار نیازمند owner، scope، dependency و acceptance tests است.

### 4.2 مدل دادهٔ حقوقی پیشنهادی

| موجودیت | دادهٔ عمومی/خصوصی | ذخیره‌سازی پیش‌فرض | کنترل ضروری |
|---|---|---|---|
| Service / Practice Area | عمومی | CPT یا مدل محتوای WordPress | schema، SEO و taxonomy |
| Attorney Profile | عمدتاً عمومی | CPT یا post type موجود | رضایت/مجوز انتشار اطلاعات حرفه‌ای |
| Article / FAQ | عمومی | `post` یا الگوی محتوایی | editorial workflow، attribution |
| Intake Request | خصوصی | جدول اختصاصی یا provider فرم پس از ارزیابی | anti-spam، capability، retention، export/delete |
| Appointment | خصوصی | جدول/provider زمان‌بندی | timezone، conflict detection، object authorization |
| Client / Contact | خصوصی | user/provider/جدول طبق نیاز | data minimization و deduplication |
| Matter / Case | بسیار حساس | سامانهٔ تخصصی یا storage اختصاصی پس از threat model | tenant isolation، audit، retention، backup |
| Matter Participant | بسیار حساس | رابطهٔ اختصاصی | نقش هر شخص و دامنهٔ دسترسی |
| Document | بسیار حساس | private object storage یا سامانهٔ تخصصی؛ DB فقط metadata لازم | private URL، authorization در هر download، malware scanning |
| Deadline / Task | خصوصی یا حساس | جدول یا provider مناسب | ownership، audit و هشدارهای قابل پیگیری |
| Audit Event | حساس عملیاتی | append-oriented table/log backend | tamper resistance، redaction و retention |

**قانون:** پروندهٔ موکل هرگز با «نمونه‌کار حقوقی» یا محتوای عمومی یکسان نیست. نمونه‌کار منتشرشده فقط با مجوز معتبر و حذف اطلاعات شناسایی‌کننده منتشر می‌شود. شناسهٔ تصادفی جایگزین authorization نیست.

### 4.3 فرم intake و جلوگیری از جمع‌آوری بی‌رویه

- پیش از ارسال، هدف فرم، استفاده‌کنندگان داده، مقصد احتمالی و هشدار محرمانگی به زبان قابل فهم نمایش داده شود.
- فرم عمومی نباید از کاربر بخواهد بی‌جهت شرح کامل پرونده یا سند محرمانه بارگذاری کند.
- نوع فیلد، محدودیت طول/نوع، محدودیت فایل، malware scanning، rate limit و ضداسپم مشخص باشد.
- فرم به صورت server-side اعتبارسنجی شود؛ مخفی کردن دکمه یا nonce به‌تنهایی کنترل دسترسی نیست.
- اطلاعات خصوصی در query string، عنوان ایمیل، push notification، analytics و log قرار نگیرد.
- رسید ثبت درخواست فقط reference غیرحساس نشان دهد؛ reference به‌تنهایی امکان مشاهدهٔ درخواست را ندهد.
- حذف/ناشناس‌سازی طبق policy انجام شود؛ داده‌ای که باید به علت تعهد قانونی حفظ شود با دلیل و مدت retention ثبت شود.

### 4.4 Client Portal و authorization

هر عملیات روی رکورد خصوصی باید هم مجوز capability و هم مالکیت object را سمت سرور بررسی کند. آزمون اجباری: موکل A با شناسهٔ رکورد موکل B نتواند با تغییر ID به داده دسترسی پیدا کند؛ این آزمون باید برای REST، download، export، search، notification، job و backup restore تکرار شود.

مدل مجوز باید ترکیبی از role/capability و relationship-based checks باشد؛ نقش «Client» به‌تنهایی مجوز خواندن همهٔ رکوردهای مشتریان نیست. دسترسی کارمند نیز بر اساس firm/tenant، matter assignment و عملیات مجاز محدود می‌شود.

### 4.5 اسناد، فایل‌ها و نسخه‌ها

- فایل حساس در public uploads قابل دسترسی مستقیم نباشد؛ از private storage یا کنترل دانلود سمت سرور استفاده شود.
- بررسی نوع واقعی فایل، محدودیت اندازه، نام فایل بی‌خطر، scan بدافزار، quota و سیاست retention تعریف شود.
- لینک امضاشده (در صورت استفاده) کوتاه‌عمر و محدود به مجوز و عملیات باشد.
- version history، checksum، actor، timestamp و نتیجهٔ upload/download در حد ضرورت ثبت شود؛ محتوا یا tokenهای دسترسی در log نوشته نشوند.
- حذف منطقی/قطعی، backupها و legal hold باید رفتار تعریف‌شده داشته باشند.

### 4.6 Appointment و تقویم

- timezone دفتر و کاربر، daylight saving، تقویم محلی و فرمت تاریخ در UI جدا از ذخیره‌سازی canonical تعریف شوند.
- ظرفیت، مدت جلسه، buffer، تعطیلی، لغو، تغییر زمان، idempotency و race condition رزرو همزمان آزموده شوند.
- provider خارجی منبع حقیقت مشخص داشته باشد؛ دو تقویم با مالکیت مبهم قابل قبول نیست.
- اعلان ایمیل/SMS حداقل اطلاعات لازم را بفرستد و ترجیحات کانال/لغو اشتراک را رعایت کند.

### 4.7 محتوا و AI در حوزهٔ حقوق

- AI می‌تواند پیش‌نویس محتوای عمومی یا ساختار صفحه پیشنهاد دهد؛ نباید بدون تأیید انسان ادعای حقوقی، مادهٔ قانون، رأی، سابقه، تخصص یا نتیجهٔ پرونده را جعل یا منتشر کند.
- اسناد موکل، اطلاعات محرمانه و متن فرم intake به مدل بیرونی ارسال نمی‌شود مگر purpose، رضایت/مبنای قانونی، قرارداد provider، retention و کنترل دسترسی روشن و تصویب شده باشد.
- هر محتوای تولیدشده با AI وضعیت draft و provenance داشته باشد؛ publish نیازمند تأیید مجاز است.
- تاریخ اعتبار/حوزهٔ قضایی/منبع برای محتوای حقوقی زمان‌مند ثبت شود؛ هشدار «نیازمند بررسی وکیل» جایگزین صحت‌سنجی نیست.

### 4.8 معیار تکمیل Legal

Legal فقط زمانی «MVP تکمیل» اعلام می‌شود که:
1. سطح A در محیط پاک نصب و تمام صفحات اصلی در desktop/mobile/RTL آزموده شده باشد.
2. کاربر غیرتوسعه‌دهنده بتواند خدمات، پروفایل وکیل، FAQ و مقالات را ویرایش کند.
3. فرم intake با آزمون‌های منفی، rate limit، consent/notice و سیاست نگهداری کار کند.
4. SEO و schema بدون duplicate ownership یا دادهٔ ساختگی اعتبارسنجی شود.
5. theme غیرفعال/تعویض شود و دادهٔ خدمات/مقالات حفظ شود.
6. بستهٔ ZIP از CI نصب شود و خطاهای PHP/JS کنسول ثبت و triage شوند.
7. برای سطوح B/C، آزمون‌های permission، IDOR، privacy، backup/restore و incident runbook جداگانه پاس شوند.

---

## 5. هستهٔ انعطاف‌پذیر، بسته‌ها و Capability Registry

### 5.1 تعریف Package

هر package یک artifact نسخه‌دار با `package_id` پایدار، `version` معنایی، `type`, `publisher`, `license`, `release_channel`, `dependencies`, `conflicts`, `minimum_platform`, `compatibility`, `permissions_required`, `capabilities_provided`, `migrations`, `assets`, `integrity`, `provenance`, `support_policy` و `rollback_policy` است.

نوع package می‌تواند شامل این موارد باشد:
- `vertical-pack`؛
- `starter-site` یا `design-archetype`؛
- `theme-preset` و `style-variation`؛
- `page-template`, `template-part`, `pattern`, `section`؛
- `gutenberg-block`؛
- `elementor-widget`, `elementor-template`, `elementor-kit`؛
- `content-schema`, `cpt-taxonomy-pack`, `form-workflow`؛
- `integration-adapter`؛
- `icon-pack`, `svg-asset`, `media-pack`؛
- `automation`, `documentation`, `migration`.

Package می‌تواند چند نوع asset را با هم ترکیب کند؛ نصب باید dependency graph و impact summary نشان دهد.

### 5.2 Capability Registry

هر capability دارای شناسهٔ namespaced، نسخهٔ قرارداد، provider، نیازمندی، وضعیت فعال، سطح اعتماد، permissions، feature flags، lifecycle و health check است. «قابل کشف بودن» به معنی «قابل اعتماد بودن» نیست؛ capability جدید تا وقتی مجوز و policy آن تأیید نشده فعال نمی‌شود.

### 5.3 تغییر vertical

تغییر از Legal به حوزهٔ دیگر باید با انتخاب blueprint و نصب/حذف packageهای مرتبط انجام شود، نه با پاک کردن بی‌قید داده‌ها یا rewrite هسته. قبل از تغییر، سیستم نشان می‌دهد کدام صفحه‌ها، CPTها، taxonomyها، فرم‌ها، integrationها و محتوا باقی می‌مانند، مهاجرت می‌کنند یا پس از backup حذف می‌شوند. هیچ داده‌ای به دلیل تغییر archetype بی‌صدا حذف نمی‌شود.

### 5.4 قرارداد versioning

- SemVer برای API/packageهایی که قرارداد عمومی دارند؛ schema version برای داده و manifest.
- نسخهٔ `latest` فقط alias کانال است، نه هویت artifact نصب‌شده.
- build تولیدی به digest/immutable artifact متصل است.
- dependency range باید محدود و قابل حل باشد؛ نصب ناممکن به‌جای تلاش کورکورانه متوقف می‌شود.
- breaking change نیازمند migration، deprecation window و release notes است.

---

## 6. SedRazavi Library — مشخصات کامل کاتالوگ مرکزی

### 6.1 تجربهٔ کاربری موردنیاز

کتابخانه از داخل WordPress Admin و در صورت نیاز از Studio قابل دسترسی است و دست‌کم این بخش‌ها را دارد:

- جست‌وجوی متن، فیلتر نوع asset، vertical، archetype، هدف صفحه، سبک بصری، زبان/RTL، editor، نسخهٔ WordPress/PHP، نیازمندی‌ها و license؛
- دسته‌بندی، tag، favorites، recently viewed/used، تاریخچهٔ نصب و update؛
- کارت asset با preview واقعی، تصاویر responsive، توضیح، نسخه، ناشر، مجوز، نیازمندی، حجم، تاریخ انتشار، changelog و known limitations؛
- مقایسهٔ نسخه/پیش‌نمایش قبل و بعد، نمایش وابستگی‌ها و تعارض‌ها؛
- فیلتر «سازگار با این سایت» و توضیح روشن برای ناسازگاری؛
- نصب تکی یا مجموعه‌ای، صف عملیات، پیشرفت، گزارش نتیجه و retry ایمن؛
- حالت آفلاین/خطای شبکه با نشان‌دادن تازگی cache؛
- مدیریت asset نصب‌شده، update، pin version، rollback در محدودهٔ پشتیبانی‌شده و uninstall؛
- گزارش اعتماد: منبع، publisher، checksum/signature status، سطح review و مجوز؛
- پیش‌نمایش بدون اعمال تغییر روی سایت اصلی، در حدی که معماری میزبان پشتیبانی کند.

### 6.2 منابع کاتالوگ و قرارداد شبکه

GitHub می‌تواند در شروع یکی از sourceها باشد، اما runtime نباید به ساختار خصوصی repository، HTML صفحهٔ GitHub یا branch زنده وابسته شود. Library از provider interface استفاده می‌کند:

- `CatalogProvider`: دریافت manifest، index و metadata؛
- `ArtifactProvider`: دریافت artifact immutable با اندازه/نوع مورد انتظار؛
- `EntitlementProvider`: بررسی مجوز نصب/استفاده در صورت نیاز تجاری؛
- `TrustPolicy`: تصمیم دربارهٔ publisher، signature و سطح اعتماد؛
- `CacheStore`: نگهداری manifest و metadata با TTL/ETag؛
- `InstallOrchestrator`: plan، preflight، backup، install، verify و recovery.

منبع نخست می‌تواند static manifest روی CDN یا GitHub Releases باشد، اما باید از طریق این قرارداد مصرف شود. API server-side مرکزی در آینده قابل افزودن است، بدون تغییر UI/installer.

### 6.3 Manifest حداقلی

Manifest باید JSON نسخه‌دار و schema-validated باشد و حداقل این فیلدها را تعریف کند:

```json
{
  "schema_version": "1.0",
  "catalog_id": "sedrazavi.public",
  "generated_at": "2026-10-24T00:00:00Z",
  "items": [
    {
      "package_id": "sedrazavi.legal.starter",
      "version": "1.0.0",
      "type": "starter-site",
      "title": "Legal Starter",
      "publisher": "SedRazavi",
      "license": "SEE_PACKAGE_LICENSE",
      "artifact": {
        "url": "https://catalog.example.invalid/releases/legal-starter-1.0.0.zip",
        "sha256": "REPLACE_WITH_REAL_SHA256",
        "size_bytes": 123456
      },
      "requires": {
        "wordpress": ">=6.5",
        "php": ">=8.1",
        "plugins": []
      },
      "provides": ["sedrazavi.legal.public-site"],
      "conflicts": [],
      "release_channel": "stable",
      "review_status": "not_verified"
    }
  ]
}
```

این نمونه آموزشی است؛ URL، hash، نسخه‌ها و مجوزهای نمونه تأییدشده نیستند و نباید به‌عنوان catalog واقعی منتشر شوند. schema واقعی باید با JSON Schema یا معادل نسخه‌دار اعتبارسنجی شود. `review_status` باید قابل‌ردیابی باشد و «not_verified» به‌صورت گمراه‌کننده به «verified» تبدیل نشود.

### 6.4 چرخهٔ نصب امن

1. دریافت manifest از source مجاز؛ اعتبارسنجی schema، زمان، نسخه و اندازه.
2. نمایش metadata و trust status؛ دریافت artifact از URL مجاز provider، نه URL آزاد کاربر.
3. بررسی redirect، TLS، content type، اندازه، timeout و مقصد شبکه برای کاهش SSRF؛ آدرس‌های loopback/private/link-local/metadata endpoint مسدود باشند مگر سناریوی کنترل‌شده و مجاز.
4. محاسبهٔ checksum و بررسی signature در صورت پشتیبانی؛ mismatch موجب توقف قطعی می‌شود.
5. بررسی zip-slip/path traversal، symlink، فایل اجرایی غیرمجاز، ساختار بسته، license، dependency و نسخهٔ WordPress/PHP.
6. محاسبهٔ install plan: فایل‌ها، تغییر تنظیمات، schema/migration، conflict، hookها، حجم و اثر بر runtime.
7. پیش‌نمایش diff و گرفتن backup/snapshot متناسب با ریسک؛ عملیات destructive نیازمند تأیید صریح است.
8. نصب در staging یا مسیر موقت، اجرای migration قابل resume و idempotent، سپس verification.
9. commit اتمیک تا حد امکان؛ در خطا، recovery/rollback خودکار یا توقف امن با دستورالعمل بازیابی.
10. ثبت audit event بدون secrets و دادهٔ حساس؛ نمایش گزارش نهایی، artifact/version/hash و وضعیت هر مرحله.

**ممنوع:** اجرای PHP یا JavaScript دریافتی پیش از اعتبارسنجی/اعتماد، overwrite بی‌هشدار فایل دست‌کاری‌شده، نصب بر اساس نام بسته بدون pinning نسخه، یا rollback ادعایی بدون آزمون واقعی.

### 6.5 Update و Rollback

- update ابتدا changelog، تغییرات schema، dependency و conflict را محاسبه می‌کند.
- نسخهٔ قبلی و metadata نصب نگهداری می‌شود؛ rollback کد به‌تنهایی برای rollback داده کافی نیست.
- migration باید precondition، postcondition، idempotency، progress marker و در صورت امکان compensating migration داشته باشد.
- اگر rollback داده امن/قابل انجام نیست، UI باید صریحاً این محدودیت را قبل از update اعلام کند و backup restore path موجود باشد.
- auto-update فقط برای کانال و packageهای مجاز، با policy روشن، staging/health check و کنترل opt-in قابل طرح است؛ تغییرات حساس یا major نیازمند تأیید است.
- در سایت multisite، scope عملیات (network/site) باید واضح باشد و تست جدا داشته باشد.

### 6.6 حذف (Uninstall) و وابستگی مشترک

Uninstall باید فرق بین «غیرفعال‌سازی»، «حذف فایل package»، «حذف دادهٔ متعلق به package» و «پاک‌سازی کامل» را نشان دهد. حذف داده به‌طور پیش‌فرض محافظه‌کارانه است؛ پیش از حذف، dependencyها، محتواهای وابسته، shortcodes/blocks باقی‌مانده و دادهٔ کاربر فهرست شوند. پاک‌سازی کامل داده فقط با مجوز و تأیید روشن انجام شود. در packageهای مشترک، حذف provider نباید capability مورد استفادهٔ بسته‌های دیگر را بشکند بی‌آنکه هشدار داده شود.

### 6.7 Trust، publisher و مجوز

حداقل سطوح اعتماد:
- `first_party_signed`: ناشر رسمی با زنجیرهٔ انتشار و امضای معتبر؛
- `reviewed_partner`: ناشر همکار با review ثبت‌شده؛
- `community_unreviewed`: community، بدون ادعای بررسی امنیتی کامل؛
- `blocked/revoked`: ممنوع یا لغوشده.

سطح اعتماد نباید فقط یک badge بصری باشد؛ policy نصب و محدودیت‌های capability به آن متصل‌اند. مجوز asset، فونت، آیکون، تصویر، SVG، متن، کد و dependency جداگانه ثبت می‌شود. گزارش takedown و revocation باید وجود داشته باشد. «امضا» اصالت منبع را تقویت می‌کند، اما به‌تنهایی کد را امن نمی‌کند.

### 6.8 تجربهٔ سازنده/ناشر (Publisher Pipeline)

برای انتشار package:
1. schema و manifest lint؛
2. license/provenance و attribution؛
3. dependency/license/security scan؛
4. build reproducibility در حد عملی؛
5. package content allowlist و منع secret؛
6. test suite و نصب clean;
7. visual/accessibility checks برای assetهای UI؛
8. checksum/signature و immutable release؛
9. changelog، compatibility matrix و rollback notes؛
10. staged release، monitoring، revocation و support lifecycle.

### 6.9 معیار پذیرش Library

- manifest نامعتبر، hash اشتباه، بستهٔ ناسازگار و فایل دارای path traversal همگی رد شوند.
- تکرار نصب یک نسخه نتیجهٔ idempotent بدهد و duplicate محتوا/تنظیم ایجاد نکند.
- قطع شبکه در هر مرحله نتیجهٔ قابل فهم و حالت بازیابی داشته باشد.
- update شکست‌خورده باعث نیمه‌نصب ماندن سایت بدون تشخیص نشود.
- کاربر بدون capability مناسب نتواند install/update/uninstall انجام دهد، حتی با درخواست مستقیم REST/AJAX.
- اطلاعات شخصی، credential و token در گزارش‌ها ظاهر نشود.
- offline cache تازگی، منبع و محدودیت خود را نشان دهد؛ cache قدیمی به‌عنوان catalog جدید نمایش داده نشود.
- نصب روی محیط تست واقعی WordPress، با dependencyهای واقعی، انجام شود؛ mock به‌تنهایی کافی نیست.

---

## 7. Design Archetypes، Page Composer و Asset Pipeline

### 7.1 Archetype فراتر از skin

Archetype ساختار اطلاعاتی، چیدمان، navigation، content model، templateها، componentها، رفتار responsive و design tokens را تعریف می‌کند؛ صرفاً تعویض رنگ نیست. نمونه‌ها می‌توانند firm/corporate، editorial، portfolio، service marketplace، directory، membership، education یا commerce باشند. هیچ فهرستی بسته نیست؛ archetype جدید باید از قرارداد عمومی پیروی کند.

### 7.2 Page Composition Model

ساختار معنایی پیشنهادی:
`Site Blueprint → Template → Section/Pattern → Block/Widget → Content/Data Binding`.

هر node دارای ID پایدار، version، schema، responsive rules، accessibility semantics، editor support، dependency و ownership است. محتوا، style و layout تا جای ممکن جدا می‌شوند. template عمومی با محتوای خاص مشتری در یک فایل/رکورد مخلوط نمی‌شود.

### 7.3 حفظ تغییرات دستی

- generated/manual ownership برای فایل‌ها و fieldها تعریف شود.
- قبل از update، diff و impact report نمایش داده شود.
- conflict سه مسیر دارد: keep manual، accept upstream یا merge.
- هیچ ویرایش مهم دستی بی‌صدا overwrite نمی‌شود.
- revision history و backup برای تغییرات گسترده موجود باشد.

### 7.4 Gutenberg و Elementor

**Gutenberg-first:** از block patterns، templates، template parts و `theme.json` استاندارد استفاده شود، چون تنظیمات/استایل‌ها و تجربهٔ editor از قراردادهای WordPress بهره می‌برند. مرجع‌ها: <https://developer.wordpress.org/themes/global-settings-and-styles/introduction-to-theme-json/> و <https://developer.wordpress.org/themes/patterns/introduction-to-patterns/>.

**Elementor adapter:** widgetها، templateها و kitها از API و ساختار پشتیبانی‌شدهٔ Elementor استفاده کنند؛ import/export و dynamic tags جدا آزموده شوند. هر feature در ماتریس parity یکی از وضعیت‌های `native`, `adapter`, `fallback`, `unsupported` دارد.

**قواعد مشترک:**
- مدل معنایی و content schema تا جای ممکن مستقل از renderer بماند.
- output عمومی به editor خاص وابسته نشود مگر package به‌صراحت آن را لازم بداند.
- اگر Elementor غیرفعال شود، محتوای باقی‌مانده باید تا حد امکان قابل تشخیص و مهاجرت باشد؛ وعدهٔ تبدیل خودکار ۱۰۰٪ داده‌های اختصاصی داده نمی‌شود.
- نسخه‌های دقیق WP/PHP/Elementor و minimum/maximum supported version باید در release manifest اعلام شوند.

### 7.5 Asset و SVG

- SVG ورودی untrusted است؛ script، event handler، external reference و ساختار خطرناک حذف یا رد شود.
- asset دارای source/provenance، license، hash، ابعاد، MIME واقعی، alt text و نقش decorative/informative باشد.
- فونت و asset شخص ثالث بدون بررسی مجوز و بارگذاری/حریم خصوصی وارد package نشود.
- تصاویر responsive و بهینه‌سازی‌شده، lazy-loading در جای درست و ابعاد رزروشده برای کاهش layout shift داشته باشند.
- icon setها نام‌گذاری namespaced و سازگار با RTL باشند.

---

## 8. داده، API، امنیت و حریم خصوصی

### 8.1 قرارداد داده

برای هر entity: owner، lifecycle، schema version، public/private classification، retention، export/delete، index/query pattern، relationship، capability، REST exposure و migration تعریف شود. انتخاب بین CPT، post meta، user meta، options، custom tables و provider بر اساس semantics، حجم، query و sensitivity است؛ نه عادت.

### 8.2 امنیت WordPress

- تمام mutationها authorization سمت سرور، validation، sanitization، output escaping و nonce/CSRF control متناسب دارند.
- nonce به‌تنهایی authentication یا authorization نیست.
- REST endpoint دارای `permission_callback` مشخص، schema و validation است؛ object ownership به‌صورت جدا بررسی می‌شود.
- از APIهای استاندارد WordPress استفاده شود و ورودی/خروجی third-party untrusted فرض شود.
- secretها فقط در secret store/environment مجاز؛ هیچ secret در `wp_options` بدون ضرورت، browser bundle، log، prompt یا artifact عمومی قرار نگیرد.
- rate limit بر اساس IP به‌تنهایی کافی نیست؛ proxy، NAT، user/account و abuse pattern نیز باید ارزیابی شوند.
- خطای داخلی در UI عمومی جزئیات حساس را لو ندهد؛ logها PII را تا حد امکان redact کنند.

منابع رسمی: <https://developer.wordpress.org/apis/security/>، <https://developer.wordpress.org/plugins/rest-api/routes-endpoints/>، <https://developer.wordpress.org/plugins/privacy/>.

### 8.3 Threat model اختصاصی

دارایی‌ها: محتوای سایت، credentials، package artifacts، درخواست‌های intake، پرونده/اسناد، دادهٔ موکل، manifest، entitlement و backup.

مرزهای اعتماد: browser ↔ WordPress؛ WordPress ↔ Studio/Library؛ site ↔ third-party plugin; publisher ↔ artifact store؛ AI provider ↔ prompt/data؛ staff ↔ client portal؛ site ↔ backup storage.

سناریوهای اجباری:
- IDOR و افشای رکورد با تغییر ID؛
- privilege escalation از نقش editor یا client؛
- SSRF از URLهای manifest/artifact؛
- package tampering، zip-slip، symlink و dependency confusion؛
- XSS در metadata/preview/HTML/SVG؛
- CSRF روی install، update، delete و تنظیمات؛
- replay/duplicate webhook و job؛
- prompt injection و exfiltration؛
- log/notification/backup leak؛
- compromised publisher، revoked package و rollback؛
- brute force، spam، enumeration و file upload abuse.

### 8.4 حریم خصوصی و نگهداری

هر flow شخصی باید purpose، notice/consent در صورت نیاز، data minimization، access, retention, export, deletion/anonymization، third-party sharing و incident response داشته باشد. قوانین دقیق بسته به jurisdiction است و قبل از عرضهٔ سطح B/C باید بررسی شود. قابلیت‌های exporter/eraser وردپرس نقطهٔ شروع‌اند، نه تضمین پوشش تمام providerها و backupها.

### 8.5 Tenant و Multisite

اگر SaaS چندمشتری یا WordPress multisite پشتیبانی شود، tenant boundary در database queries، cache keys، jobs، object storage، exports، logs و support bundle اجباری است. `tenant_id` ارسالی client به‌تنهایی منبع حقیقت نیست. Multisite تا تصویب ADR و گذر از تست‌های network/site-level پشتیبانی‌شده اعلام نمی‌شود.

### 8.6 Backup و Disaster Recovery

- RPO/RTO بر اساس محصول و سطح حساسیت تعیین شود.
- backup رمزگذاری‌شده، محدودیت دسترسی، retention و جداسازی از محیط تولید داشته باشد.
- restore drill زمان‌بندی‌شده و گزارش‌دار؛ backup که restore نشده، قابل اعتماد فرض نشود.
- حذف/ناشناس‌سازی داده باید در سیاست بازگردانی backup نیز لحاظ شود.
- برای migration و package update، snapshot متناسب با blast radius گرفته شود.

---

## 9. Studio، UX، دسترس‌پذیری و تجربهٔ حرفه‌ای

### 9.1 سه سطح تجربه

- **Simple:** wizard هدایت‌شده، presetهای امن، واژگان روشن و پیش‌فرض‌های قابل قبول.
- **Advanced:** تنظیمات عمیق، dependency، version pinning، mapping و migration preview.
- **Expert:** manifest، logs، debug، feature flags، diff، diagnostics و CLI.

این سطوح باید به یک مدل تنظیمات واحد متصل باشند؛ نه سه implementation متفاوت.

### 9.2 صفحات کلیدی Studio/Library

- Project Dashboard؛
- Blueprint/Archetype Explorer؛
- Library Search + Asset Detail؛
- Install Plan / Conflict Resolution؛
- Site Composer / Preview؛
- Content Model & Workflow Builder؛
- Editor Compatibility Matrix؛
- Build & QA Console؛
- Release/Artifact Center؛
- Health, Logs & Support Bundle؛
- Permissions & Privacy Center؛
- Integrations/Adapter Registry؛
- Migration/Backup/Restore Center.

هر صفحه باید purpose، role/capability، primary action، loading/empty/error/partial/success states، keyboard path، responsive behavior، analytics/privacy impact و acceptance tests داشته باشد.

### 9.3 Design System

- tokenها برای color, type, spacing, radius, elevation, motion, breakpoint و z-index تعریف شوند.
- RTL در layout، icon direction، number/date formats، table, keyboard flow و validation سنجیده شود؛ صرفاً `direction: rtl` کافی نیست.
- design token layers: base → semantic → component → brand/tenant overrides؛ overrideهای کاربر باید قابل preview و reset باشند.
- حالت تاریک/روشن، contrast، focus visible، keyboard navigation، reduced motion و screen reader semantics آزموده شوند.
- دادهٔ مهم فقط با رنگ نمایش داده نشود؛ empty/error/warning state متن واضح داشته باشد.

### 9.4 دسترس‌پذیری

هدف پیشنهادی WCAG 2.2 AA برای flowهای اصلی است؛ این هدف تا آزمون واقعی «تأییدشده» نیست. آزمون شامل keyboard-only، focus order، labels، error association، contrast، zoom، reduced motion، screen reader و touch target است. waiver باید دامنه، دلیل، ریسک و تاریخ بازبینی داشته باشد.

### 9.5 عملکرد

بودجهٔ performance باید به‌صورت baseline اندازه‌گیری‌شده برای صفحات نمونه تعیین شود، نه با اعداد حدسی. موارد سنجش: Core Web Vitals، حجم JS/CSS، تعداد درخواست‌ها، LCP image، query count، PHP memory/time، cache hit، bundle size و عملکرد در موبایل واقعی. صفحه‌سازها و widgetها فقط وقتی بارگذاری شوند که لازم‌اند؛ heavy editor scripts به frontend عمومی نشت نکنند.

---

## 10. API، رویدادها، یکپارچه‌سازی و AI

### 10.1 REST API و قرارداد خطا

- namespace و versioning مشخص؛ schema ورودی/خروجی؛ permission callbacks؛ validation؛ pagination؛ rate limit؛ error code پایدار و idempotency برای عملیات حساس.
- HTTP read methods side effect نداشته باشند؛ jobهای طولانی با job ID، state، retry policy و cancellation تعریف شوند.
- API response حاوی دادهٔ حساس فقط با مجوز صریح و حداقل فیلد لازم برگردد.
- تغییرات breaking با deprecation policy و contract tests همراه باشند.

### 10.2 Event/Job/Webhook

هر event شامل `event_id`, `event_type`, `schema_version`, `occurred_at`, `actor`, `resource_ref`, `tenant/site scope`, `correlation_id` و payload حداقلی است. event عمومی نباید body پرونده یا secret را حمل کند. مصرف‌کننده باید duplicate، retry، timeout، out-of-order و dead-letter را مدیریت کند.

### 10.3 Adapterهای ثالث

هر adapter دارای provider ID، supported version range، auth method، data mapping، permission scope، timeout/rate limit، webhook validation، health check، error mapping، data retention، disconnect/revoke behavior و contract tests است. «افزونهٔ ناشناخته» به معنی adapter خودکار نیست؛ ابتدا discovery و compatibility report، سپس پیاده‌سازی/تأیید انسانی.

### 10.4 AI Safety & Governance

- AI خروجی پیشنهادی می‌دهد؛ قراردادها و تست‌ها مرجع حقیقت‌اند.
- promptها versioned و دارای input schema، output schema، evaluation set، privacy classification و approval policy باشند.
- محتوای repository، فایل‌های واردشده و صفحات وب untrusted data هستند و نباید به‌عنوان دستور سطح بالاتر تفسیر شوند.
- کد تولیدشده در محیط ایزوله build/test شود؛ secret یا دادهٔ موکل در context قرار نگیرد مگر مجوز و سیاست صریح.
- انتشار/اعمال patch مخرب یا destructive نیازمند تأیید انسانی و diff قابل بازبینی است.
- معیار ارزیابی: schema pass rate، test pass rate، regression rate، factuality review، security findings، cost/latency و rejection rate.
- برای محتوای حقوقی، منبع، تاریخ، jurisdiction و reviewer باید ثبت شوند؛ AI مجاز به جعل citation یا انتشار خودکار ادعای حقوقی نیست.

---

## 11. Build، QA، Release و پشتیبانی

### 11.1 Artifactهای مستقل

حداقل بسته‌های قابل تفکیک:
- WordPress theme ZIP؛
- core/companion plugin ZIP؛
- vertical package ZIP؛
- editor adapter/addon ZIP در صورت انتشار مستقل؛
- Studio build/installer طبق مدل استقرار مصوب؛
- Library catalog manifest و release metadata.

هر artifact دارای source commit، build environment، dependency inventory، version، checksum، license notices و release notes است. secret و فایل dev-only وارد ZIP نمی‌شود.

### 11.2 CI و تست‌ها

- lint/static analysis و type check؛
- PHP/JS unit tests؛
- schema/manifest contract tests؛
- WordPress integration tests؛
- install/upgrade/uninstall tests در محیط پاک؛
- security tests برای permission، nonce/CSRF، XSS، SSRF، upload و IDOR؛
- visual regression برای archetypeهای منتخب؛
- accessibility smoke tests و بررسی دستی flowهای اصلی؛
- performance budgets؛
- package integrity و dependency/license scan؛
- restore drill و testهای failure injection برای قابلیت‌های حساس.

### 11.3 ماتریس محیط

نسخه‌های دقیق WordPress/PHP و مرورگرها باید پیش از release در ADR/manifest تعیین شوند. آزمون حداقل شامل minimum supported و current supported versions، Gutenberg editor، Elementor versions اعلام‌شده، RTL و LTR، desktop/mobile و در صورت ادعا multisite است. «روی محیط توسعه کار کرد» کافی نیست.

### 11.4 Release Gates

- **G0 — Scope:** requirements، owner، threat model و acceptance criteria روشن.
- **G1 — Build:** artifact reproducible یا روند build مستند و قابل تکرار.
- **G2 — Functional:** سناریوهای اصلی و منفی پاس.
- **G3 — Security/Privacy:** P0 صفر؛ P1 حل‌شده یا waiver رسمی با محدودیت انتشار.
- **G4 — Compatibility:** ماتریس واقعی و known limitations منتشر.
- **G5 — Recovery:** update/rollback/restore در دامنهٔ ادعا آزموده.
- **G6 — Release:** checksum، changelog، license، support policy و artifact موجود.

P0 باز، دادهٔ حساس افشاشونده، migration مخرب بدون recovery، artifact دستکاری‌شده یا عدم امکان نصب clean مانع release است.

### 11.5 پشتیبانی و مشاهده‌پذیری

- structured logs با redaction؛ metrics و trace متناسب با هزینه و privacy؛ correlation ID؛
- support bundle با انتخاب صریح، redaction و preview پیش از export؛
- health checks برای dependencies، cron/jobs، storage و catalog freshness؛
- incident severity، مسئول پاسخ، ارتباط با مشتری، patch، revocation و postmortem؛
- هیچ telemetry غیرضروری بدون اطلاع‌رسانی و سیاست privacy ارسال نشود.

---

## 12. نقشهٔ راه مرحله‌ای و اولویت‌ها

### P0 — تثبیت حقیقت و baseline
1. ثبت commit جاری، branch، نسخهٔ runtime، dependency inventory و دستورهای build/test.
2. ساخت دفتر شواهد و اختلاف سند/کد؛ هر ادعا `NOT_VERIFIED` تا زمانی که مدرک دارد.
3. تعیین نسخه‌های هدف WordPress/PHP، مدل بسته‌بندی و مالکیت artifact.
4. آزمون نصب تمیز theme و plugin از artifact، نه فقط source tree.
5. بررسی امنیتی اولیهٔ فرم‌ها، REST/AJAX، upload، nonce، capability و داده‌های خصوصی.

### P1 — محصول حقوقی سطح A
1. تعریف sitemap و content model نهایی.
2. ساخت و آزمون صفحات اصلی و الگوهای responsive/RTL.
3. تکمیل ویرایش‌پذیری Gutenberg و Elementor طبق parity matrix.
4. فرم intake با حداقل‌سازی داده، ضداسپم، notice و retention.
5. SEO/schema، media licensing، accessibility و performance baseline.
6. release candidate و package install/upgrade/uninstall tests.

### P2 — Library MVP و بسته‌های آماده
1. manifest schema، static catalog provider و immutable artifacts.
2. Library UI: browse/search/detail/preview/install plan.
3. integrity/dependency/license checks و install orchestration.
4. گزارش عملیات و recovery path.
5. حداقل سه package واقعی با قرارداد متفاوت: legal starter، archetype عمومی غیرحقوقی و مجموعهٔ بلوک/section.
6. آزمون منفی برای tampering، incompatible package، network failure و repeated install.

### P3 — Legal Intake & Appointments
1. workflow ورودی و صف مدیریت؛
2. calendar/availability provider و timezone؛
3. roles/capabilities، audit، retention و privacy export/delete؛
4. integration contract tests و incident runbook.

### P4 — Client Portal / Matter Operations
فقط پس از تصویب threat model، privacy/legal review، hosting/data residency decisions، tenant model، restore drill و آزمون authorization مستقل. اگر پیش‌شرط‌ها فراهم نیست، اتصال به سامانهٔ تخصصی خارجی بر توسعهٔ storage حساس داخلی ترجیح داده شود.

### P5 — Studio و AI pipeline
Project Contract، visual preview، build orchestrator، isolated test environments، AI draft workflow و human approval.

### P6 — Ecosystem & scale
Publisher portal، partner review، signed releases، entitlement، community catalog، advanced analytics با رضایت و multisite/SaaS فقط پس از اثبات نیاز و تصویب ADR.

### قاعدهٔ اولویت
ابتدا یک vertical slice کامل و قابل‌تحویل بسازیم؛ هم‌زمان با آن، معماری را با یک بستهٔ غیرحقوقی و یک package ادیتورمحور بیازماییم تا انعطاف فقط روی کاغذ باقی نماند. افزودن ده‌ها قابلیت بدون install/recovery/test به معنی پیشرفت محصول نیست.

---

## 13. تصمیم‌های باز که نباید با حدس بسته شوند

| ID | تصمیم | اثر | مالک تصمیم | پیش‌شرط بسته‌شدن |
|---|---|---|---|---|
| DEC-01 | مدل استقرار Studio: cloud/self-hosted/hybrid | auth، storage، عملیات، هزینه | مالک محصول | threat model و نیاز مشتری |
| DEC-02 | حداقل/حداکثر نسخهٔ WordPress و PHP | compatibility، build matrix | مسئول فنی | نصب و تست واقعی |
| DEC-03 | Elementor: نسخه‌ها و سطح پشتیبانی | adapter و QA | مسئول editor integration | ماتریس parity و تست |
| DEC-04 | catalog source نخست و مدل publisher | API، trust و release | مالک Library | threat model و هزینهٔ عملیات |
| DEC-05 | امضای artifact و مدیریت کلید | supply-chain security | مسئول امنیت/Release | طراحی rotation/revocation |
| DEC-06 | بازار و jurisdiction هدف Legal | notice، retention، compliance | مالک محصول + مشاور واجد صلاحیت | تصمیم مستند |
| DEC-07 | سطح C داخلی یا اتصال به case-management خارجی | ریسک و معماری داده | مالک محصول + مسئول امنیت | threat model و بررسی حقوقی |
| DEC-08 | multisite و tenant isolation | data boundary و testing | مسئول فنی | سناریوهای واقعی مشتری |
| DEC-09 | entitlement/license و مدل تجاری | UX نصب/update | مالک محصول | مدل فروش/مجوز |
| DEC-10 | RPO/RTO، پشتیبانی و incident SLA | backup و هزینه | مالک عملیات | تحلیل اثر و توان تیم |
| DEC-11 | telemetry و privacy defaults | observability و consent | مالک محصول/privacy | data map و notice |
| DEC-12 | کدام packageها در MVP‌اند | scope و زمان | مالک محصول | prioritization و success metrics |

تا زمان تصمیم، گزینهٔ پیش‌فرض محافظه‌کارانه ثبت شود؛ این گزینه نباید به‌عنوان تصمیم نهایی یا قابلیت پیاده‌شده معرفی شود.

---

## 14. چرخهٔ نقد تکرارشوندهٔ نسخهٔ 25

### 14.1 نقش‌های نقد

در هر دور، سند از این منظرها بررسی می‌شود: محصول/بازار، معماری، WordPress، امنیت و supply chain، privacy، Legal domain، UX/accessibility، performance، QA/release، operations/recovery، AI governance و developer ecosystem. این نام‌ها روش بررسی‌اند، نه ادعای اینکه افراد انسانی متخصص این بررسی را انجام داده‌اند.

### 14.2 چرخهٔ اجباری

1. تثبیت نسخه و دامنهٔ مورد بررسی.
2. استخراج requirement، فرض، تصمیم و ادعای قابل اثبات.
3. نقد مستقل هر منظر و ثبت finding با ID، severity، evidence/assumption، سناریوی شکست و blast radius.
4. دسته‌بندی: `P0 Critical`, `P1 High`, `P2 Medium`, `P3 Low`.
5. مقایسهٔ گزینه‌ها، trade-off و راهکار منتخب.
6. افزودن acceptance test و مالک/مهلت برای هر finding.
7. نقد دوبارهٔ خود راهکار: سوءاستفاده، failure modes، migration، هزینه و تعامل با دیگر ماژول‌ها.
8. اصلاح سند و contract/schema/ADR مرتبط.
9. بازبینی traceability و duplicate/conflicting requirements.
10. ثبت residual risk و تصمیم توقف/ادامه.

### 14.3 دفتر نقد اولیهٔ نسخهٔ 25

| ID | نقد | اصلاح اعمال‌شده | آزمون/شاهد لازم | وضعیت |
|---|---|---|---|---|
| R25-01 | سندهای افزایشی باعث تعارض می‌شوند. | سند مرجع پاک و آرشیو نسخهٔ 24. | کنترل لینک‌ها و یکتایی تصمیم‌ها. | اصلاح ساختاری انجام شد؛ بازبینی نهایی لازم |
| R25-02 | Library فقط فهرست asset نیست؛ نصب و اعتماد چرخهٔ عمر دارد. | manifest، trust tiers، installer، update/rollback/uninstall و publisher pipeline تعریف شد. | اجرای تست end-to-end روی WordPress واقعی. | NOT_VERIFIED |
| R25-03 | Legal website با مدیریت پروندهٔ حساس یکی نیست. | سه سطح محصول و گیت امنیتی سطح C تعریف شد. | threat model، authorization tests و privacy/legal review. | NOT_VERIFIED |
| R25-04 | «هر افزونه‌ای» قابل پشتیبانی نیست. | adapter contracts و compatibility tiers. | آزمون افزونه‌های هدف و گزارش محدودیت. | NOT_VERIFIED |
| R25-05 | checksum به‌تنهایی اعتماد یا امنیت را ثابت نمی‌کند. | checksum + signature/provenance/review/policy. | تست rotation/revocation و compromised publisher drill. | NOT_VERIFIED |
| R25-06 | rollback کد لزوماً rollback داده نیست. | migration contract، backup، compensating migration و restore drill. | failure injection و restore report. | NOT_VERIFIED |
| R25-07 | دادهٔ موکل می‌تواند از log، notification یا AI نشت کند. | data minimization، redaction، prompt policy و negative tests. | DLP/log review و prompt-injection tests. | NOT_VERIFIED |
| R25-08 | کیفیت سند مساوی کیفیت محصول نیست. | release gates و evidence package. | CI، artifact و test reports. | NOT_VERIFIED |
| R25-09 | برخی تصمیم‌ها به اطلاعات بازار/حقوقی واقعی نیاز دارند. | DEC-01..12 باز و صاحب تصمیم‌دار. | ADRهای مصوب. | BLOCKED تا تصمیم مالک محصول |

### 14.4 دور دوم نقد — حمله به راهکارهای اصلاح‌شده

این دور فرض می‌کند که راهکارهای دور اول خودشان ممکن است شکست بخورند؛ بنابراین صرف اضافه‌شدن یک بند به سند، finding را نمی‌بندد.

| ID | پرسش خصمانه | ضعف احتمالی راهکار اولیه | تقویت راهکار | وضعیت واقعی |
|---|---|---|---|---|
| R25-10 | اگر checksum از manifest مخربِ همان ناشر بیاید چه؟ | checksum به‌تنهایی اصالت ناشر را اثبات نمی‌کند. | امضای manifest/release با کلید خارج از artifact، rotation/revocation و سیاست ناشر؛ امضا هم جای review امنیتی را نمی‌گیرد. | طراحی شده؛ پیاده‌سازی NOT_VERIFIED |
| R25-11 | اگر update کد را rollback کند اما schema تغییر کرده باشد چه؟ | rollback فایل‌ها داده را به نسخهٔ قبلی برنمی‌گرداند. | migration forward/backward یا compensating strategy، snapshot، pre/postcondition و restore drill؛ در غیر این صورت update باید با هشدار و تأیید متوقف شود. | طراحی شده؛ تست NOT_VERIFIED |
| R25-12 | اگر سایت هنگام نصب نیمه‌کاره بماند یا worker قطع شود چه؟ | orchestration ساده ممکن است حالت میانی را جا بگذارد. | state machine پایدار، operation ID، lock، checkpoint، idempotent retry و recovery command؛ ثبت وضعیت `pending/committing/failed/recovered`. | طراحی شده؛ تست NOT_VERIFIED |
| R25-13 | اگر package رسمی بعداً آلوده یا لغو شود چه؟ | نسخهٔ immutable جلوی آسیب یک نسخهٔ قبلاً منتشرشده را نمی‌گیرد. | revocation feed، denylist امضاشده، هشدار فوری، توقف update/install و runbook incident؛ سیاست برای سایت آفلاین نیز تعریف شود. | طراحی شده؛ تصمیم اجرایی باز |
| R25-14 | اگر Elementor غیرفعال شود، محتوای وابسته قابل بازیابی است؟ | semantic model مشترک همهٔ امکانات proprietary را تبدیل نمی‌کند. | نمایش portability report پیش از نصب؛ برچسب `native/adapter/fallback/unsupported`؛ export و مسیر مهاجرت مستند، بدون وعدهٔ تبدیل کامل. | طراحی شده؛ تست parity NOT_VERIFIED |
| R25-15 | اگر موکل درخواست حذف بدهد ولی نسخهٔ پشتیبان هنوز داده را داشته باشد؟ | حذف از production به‌تنهایی چرخهٔ داده را تمام نمی‌کند. | backup retention، حذف/انقضای دوره‌ای، replay protection پس از restore و ثبت legal hold/exception؛ مالک policy باید تأیید کند. | نیازمند DEC-06/DEC-10 و بررسی حقوقی |
| R25-16 | اگر یک package به‌ظاهر مجاز، URL خارجی یا کد post-install اجرا کند؟ | بررسی مجوز و hash رفتار runtime را بی‌خطر نمی‌کند. | allowlist توانایی‌ها، manifest declarative، منع post-install دلخواه در trust tier پایین، محدودسازی network/file effects و approval برای migration اجرایی. | طراحی شده؛ پیاده‌سازی NOT_VERIFIED |
| R25-17 | اگر همزمان دو مدیر package را نصب یا update کنند؟ | race condition می‌تواند فایل و schema را ناسازگار کند. | lock در سطح سایت/package، optimistic version check، idempotency key و نمایش operation جاری؛ تست همزمانی اجباری. | طراحی شده؛ تست NOT_VERIFIED |
| R25-18 | اگر محتوای حقوقی برای کشور/استان دیگر استفاده شود؟ | یک Legal Starter عمومی ممکن است متن یا schema نامناسب القا کند. | محتوای seed به‌عنوان draft، jurisdiction و تاریخ برای محتوای حقوقی، localization pack و تأیید وکیل محلی پیش از انتشار. | تصمیم بازار/حوزهٔ قضایی باز |
| R25-19 | اگر Library در دسترس نباشد یا manifest قدیمی cache شود؟ | cache ممکن است نسخهٔ revoked یا ناسازگار را عرضه کند. | TTL/ETag، نمایش زمان آخرین sync، policy برای revocation، منع نصب بستهٔ تازه از cache منقضی مگر policy صریح، و ادامهٔ عملکرد runtime. | طراحی شده؛ تست outage NOT_VERIFIED |
| R25-20 | اگر audit log خودش اطلاعات محرمانه افشا کند؟ | audit trail بیش از حد پرجزئیات می‌تواند به مخزن نشت تبدیل شود. | ثبت actor/action/resource reference و نتیجه، نه body/secret؛ کنترل دسترسی، retention و redaction؛ دسترسی به log نیز audit شود. | طراحی شده؛ تست privacy NOT_VERIFIED |

### 14.5 دور سوم نقد — بررسی انسجام بین ماژول‌ها

این دور بر تعارض‌هایی تمرکز دارد که در یک فصل دیده نمی‌شوند:

1. **Library ↔ Editor adapters:** package باید قبل از نصب معلوم کند آیا به Gutenberg، Elementor یا هر دو نیاز دارد؛ installer باید وضعیت فعال‌بودن editor و نسخهٔ آن را در preflight لحاظ کند. اگر adapter غیرفعال شود، dependency resolver نباید به حذف ناخواستهٔ محتوای سایت منجر شود.
2. **Legal ↔ AI:** هیچ workflow تولید عمومی نباید به‌طور ضمنی دادهٔ intake یا matter را به prompt متصل کند. data classification باید در context builder enforce شود، نه اینکه صرفاً در راهنمای prompt نوشته شود.
3. **Legal ↔ Backup/Retention:** deletion policy، legal hold، export و backup restore باید یک چرخهٔ واحد داشته باشند؛ تصمیم حقوقی دربارهٔ مدت نگهداری هنوز باز است.
4. **Theme ↔ Data ownership:** تغییر archetype یا حذف theme نباید CPT/رکوردهای متعلق به plugin را حذف کند؛ حذف package باید impact report و تأیید داشته باشد.
5. **Studio ↔ Runtime:** قطع Studio/AI/Library نباید rendering صفحات منتشرشده را متوقف کند؛ عملیات نیازمند cloud باید با خطای قابل بازیابی متوقف شوند.
6. **Publisher ↔ Trust:** اگر کلید ناشر لو برود، rotation و revocation باید مستقل از انتشار package جدید ممکن باشد؛ catalog provider و UI باید وضعیت revoked را به installer منتقل کنند.
7. **Multisite ↔ Package operations:** چون multisite هنوز تصمیم نشده، ادعای پشتیبانی از آن ممنوع است؛ در صورت انتخاب، عملیات network-level و site-level باید جداگانه تست شوند.
8. **UX ↔ Security:** UI ساده نباید کنترل امنیتی را پنهان کند؛ کاربر novice نیز باید اثر، dependency، دادهٔ قابل حذف و محدودیت rollback را قبل از تأیید بفهمد.

### 14.6 نتیجهٔ سه دور نقد و residual risk

سه دور بالا **بازبینی تحلیلی سند** هستند؛ آن‌ها اجرای تست، audit مستقل انسانی یا تأیید امنیتی کد محسوب نمی‌شوند. پس از این دورها، راهکارها برای پوشش قراردادی کامل‌تر شده‌اند، اما ریسک‌های زیر باز می‌مانند:

- تصمیم‌های DEC-01 تا DEC-12 هنوز نیازمند مالک محصول و شواهد/اطلاعات بیرونی‌اند؛
- هیچ package واقعی در این مرحله از طریق Library نصب نشده است؛
- امضای artifact، revocation، migration recovery و concurrency فقط مشخصات هدف‌اند؛
- سطح C حقوقی تا بررسی حقوقی/حریم خصوصی و آزمون امنیتی واقعی قابل عرضه نیست؛
- سازگاری واقعی theme/plugin/Elementor و نسخه‌های پشتیبانی‌شده هنوز از روی artifact و CI باید ثابت شود.

بنابراین status درست سند `ARCHITECTURE BASELINE — IMPLEMENTATION NOT VERIFIED` است. این یک محدودیت پنهان نیست؛ مرز روشن بین راهکار طراحی‌شده و محصول اثبات‌شده است.

### 14.4 معیار توقف

نقد سند زمانی برای یک scope می‌تواند موقتاً متوقف شود که:
- هیچ P0 باز نباشد؛
- P1ها بسته شده یا waiver رسمی و محدودیت انتشار داشته باشند؛
- دو دور بازبینی متوالی در scope ثابت finding بحرانی جدید نداشته باشند؛
- تمام requirementهای P0/P1 به تصمیم، معیار پذیرش و آزمون متصل باشند؛
- تصمیم‌های باز دارای owner و موعد باشند؛
- residual risks، known limitations و شواهد ناقص آشکار باشند.

این معیار به معنی «دیگر هیچ نقدی ممکن نیست» نیست؛ فقط وضعیت فعلی و دلیل توقف را قابل ممیزی می‌کند. با تغییر نیاز، کد، dependency یا تهدید، چرخه باید دوباره اجرا شود.

---

## 15. Traceability، Definition of Done و مدارک انتشار

### 15.1 Traceability matrix

هر requirement دارای ID یکتا و پیوند به این زنجیره است:
`Requirement → Product decision/ADR → Contract/schema → Implementation issue/PR → Automated/manual test → Artifact/release → Known limitations`.

Requirement بدون test یا توضیح روشن دربارهٔ غیرقابل‌آزمون بودن آن، برای انتشار حساس پذیرفته نمی‌شود.

### 15.2 Definition of Ready

- مسئله و نقش کاربر روشن؛
- scope/non-goals و data classification مشخص؛
- وابستگی و compatibility معلوم؛
- acceptance criteria و error states تعریف شده؛
- threat/privacy impact ارزیابی شده؛
- مالک تصمیم و روش rollback روشن.

### 15.3 Definition of Done

- رفتار اصلی و حالت‌های loading/empty/error/partial/success کامل؛
- authorization server-side و آزمون منفی؛
- schema/manifest و مستندات به‌روز؛
- تست‌های لازم در CI پاس؛
- responsive، RTL/LTR و accessibility در دامنهٔ اعلام‌شده بررسی؛
- performance و dependency/license impact ثبت؛
- migration، uninstall و recovery تعریف و آزموده؛
- artifact از commit معلوم ساخته شده و checksum دارد؛
- known limitations و release notes منتشر؛
- شواهد به requirement پیوند خورده‌اند.

### 15.4 Evidence Package

برای ادعای آمادهٔ انتشار، حداقل این موارد باید ارائه شوند:
- commit/branch و versions؛
- build log و dependency inventory؛
- test reports شامل negative/security tests؛
- install/upgrade/uninstall report؛
- compatibility matrix واقعی؛
- performance/accessibility baseline؛
- backup/restore drill برای قابلیت‌های حساس؛
- security findings و disposition؛
- artifact checksum و SBOM متناسب؛
- release notes، support policy، incident contact/runbook؛
- تأیید مالک محصول و مسئول انتشار.

بدون این مدارک، وضعیت قابلیت `NOT_VERIFIED` است حتی اگر متن سند کامل به نظر برسد.

---

## 16. منابع فنی مرجع

منابع بیرونی برای اعتبارسنجی اصول فنی‌اند؛ تصمیم‌های محصولی و پیاده‌سازی باید با نسخه‌های پشتیبانی‌شدهٔ واقعی تطبیق داده شوند.

1. WordPress Theme Handbook — `theme.json`: <https://developer.wordpress.org/themes/global-settings-and-styles/introduction-to-theme-json/>.
2. WordPress Theme Handbook — Block Patterns: <https://developer.wordpress.org/themes/patterns/introduction-to-patterns/>.
3. WordPress Security APIs: <https://developer.wordpress.org/apis/security/>.
4. WordPress Plugin Handbook — REST routes/endpoints and permission callbacks: <https://developer.wordpress.org/plugins/rest-api/routes-endpoints/>.
5. WordPress Plugin Handbook — Privacy: <https://developer.wordpress.org/plugins/privacy/>.
6. WordPress REST API — Authentication: <https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/>.
7. SedRazavi public repository (README/tree is not proof of runtime behavior): <https://github.com/Aqamirrazavi/Sedrazavi-WPtemplate>.

---

## 17. جمع‌بندی نسخهٔ 25

نسخهٔ 25 جهت محصول را روشن‌تر و قابل ارزیابی‌تر می‌کند: SedRazavi OS یک پلتفرم چندحوزه‌ای است؛ SedRazavi Legal نخستین محصول تخصصی آن باقی می‌ماند و باید از وب‌سایت عمومی تا intake و در صورت توجیه امنیتی پرتال موکل، مرحله‌به‌مرحله تکمیل شود. SedRazavi Library از یک ایدهٔ عمومی به قرارداد محصولی با manifest، artifact، trust policy، نصب، update، rollback، uninstall و publisher pipeline تبدیل شده است. Gutenberg مسیر پایه است و Elementor با سطح سازگاری اعلام‌شده پشتیبانی می‌شود. امنیت، محرمانگی، قابلیت بازیابی و شواهد تست دروازهٔ انتشارند.

**گام بعدی درست، نوشتن نسخهٔ 26 نیست.** ابتدا باید P0ها روی مخزن واقعی اجرا شوند: baseline گرفتن، نصب clean، آزمون بسته‌بندی، ممیزی مسیرهای حساس و ساخت دفتر شواهد. پس از آن، نسخهٔ اجرایی هر requirement باید با commit، تست و artifact پیوند بخورد. این سند معماری هدف را تعریف می‌کند؛ کد و شواهد باید ثابت کنند که محصول به آن رسیده است.
