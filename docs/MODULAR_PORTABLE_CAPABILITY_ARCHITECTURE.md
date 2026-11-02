# سند جامع معماری بسته‌های ماژولار و مستقل قابلیت‌ها
## Modular Portable Capability Architecture (MPCA)
**پروژه:** اکوسیستم یکپارچه و بسته‌های مستقل وردپرس و المنتور سید رضوی (`SedRazavi Sovereign OS`)  
**نسخه سند:** 1.0.0  
**معمار:** سید امیر حسین رضوی فردویی (`@sedrazavi`)  
**وضعیت:** مصوب و آماده پیاده‌سازی گام‌به‌گام  

---

## ۱. چرایی و چشم‌انداز بنیادین (Vision & Core Rationale)

اکوسیستم SedRazavi نباید صرفاً یک قالب غول‌پیکر یا مجموعه‌ای درهم‌تنیده از ویجت‌های المنتور باشد. یک معماری مدرن و در سطح انترپرایز باید تضمین کند که **هر قابلیت (Feature / Capability)** به صورت یک واحد خودکفا، ماژولار و قابل انتقال (**Portable**) طراحی شود.

این بدان معناست که یک قابلیت (مانند «سیستم نمونه‌کارها»، «رزرواسیون آنلاین»، «جدول قیمت‌گذاری هوشمند» یا «رهگیری پرونده‌ها») بتواند:
1. هم در قالب اصلی SedRazavi کار کند.
2. هم به صورت یک افزونه یا بسته مستقل (`.zip`) خارج شده و بر روی هر سایت وردپرسی دیگر با یا بدون قالب نصب شود.
3. در صورت نبود المنتور پرو یا قالب مادر، دچار شکست نشود و با استراتژی **Graceful Degradation** کار کند.

---

## ۲. لایه‌بندی ۶ گانه سیستم (Decoupled 6-Layer Architecture)

برای جداسازی کامل منطق تجاری از رابط کاربری، کل سیستم به ۶ لایه تفکیک می‌شود:

```
┌────────────────────────────────────────────────────────────────────────┐
│ لایه ۱: رابط‌های کاربری (User Interface Layer)                         │
│ • Elementor Widgets (با سایدبار ۳ تبه کامل)                             │
│ • Gutenberg Blocks (با اینسپکتور اختصاصی)                              │
│ • WordPress Admin Screens & UI                                         │
│ • Public Frontend Semantic HTML & SVG                                  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ لایه ۲: قراردادهای ارتباطی (API Contracts & Security Layer)             │
│ • REST API Endpoints با اعتبارسنجی ورودی/خروجی                         │
│ • Nonce Verification + Role/Capability Authorization                   │
│ • Contract Registry & Request/Response Schemas                         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ لایه ۳: سرویس‌های بک‌اند (Backend Services Layer)                       │
│ • Query Engine & Dynamic Query Builder                                 │
│ • Form Submission & Interaction Engine                                 │
│ • Notification & Messaging Engine                                      │
│ • Template Importer / Exporter Engine                                  │
│ • Automation & Workflow Engine (Sync & Async)                          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ لایه ۴: مدل داده و رویدادها (Data Model & Event Bus Layer)              │
│ • Custom Post Types (CPT) & Custom Taxonomies                          │
│ • Post Meta & Options (Validated & Sanitized)                          │
│ • Internal Event Bus (Actions/Filters decoupled)                       │
│ • Task Queue (Background cron / async queue)                           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ لایه ۵: مدیریت و نظارت (Admin Management & Diagnostics Layer)           │
│ • Capability Registry (فهرست و وضعیت ماژول‌ها)                         │
│ • Package Manager (نصب، ارتقا و خروجی بسته‌ها)                         │
│ • Query Monitor & API Monitor                                          │
│ • Workflow & Automation Monitor                                        │
│ • Audit Log & Health Diagnostics                                       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ لایه ۶: زیرساخت وردپرس و سرویس‌های خارجی (Infrastructure Layer)        │
│ • WordPress Core Database (wpdb)                                       │
│ • Transient & Object Cache                                             │
│ • Media Library & Zero-CDN Asset Storage                               │
│ • WooCommerce Integration (در صورت فعال بودن)                          │
│ • Webhooks & Outbound Integrations                                     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## ۳. استاندارد ویجت‌های المنتور: نوار تنظیمات کناری کامل (Native Sidebar Controls)

هیچ ویجتی نباید تنظیمات خود را به یک پنل بیرونی گره بزند. هر ویجت در سایدبار استاندارد ویرایشگر المنتور باید سه تب رسمی داشته باشد:

### تب ۱: Content (محتوا و منطق داده)
- **منبع داده (Data Source):** انتخاب CPT، پست‌ها، دسته‌بندی‌ها، تگ‌ها یا داده دستی/استاتیک.
- **کوئری بیلدر (Query Controls):** تعداد، مرتب‌سازی (ASC/DESC)، فیلتر بر اساس تاریخ یا نویسنده، نادیده‌گرفتن چسبان‌ها (Ignore Sticky).
- **کنترل‌های تکرارشونده (Repeater):** افزودن نامحدود آیتم‌ها، آیکون، عنوان، زیرعنوان، قیمت، لینک و برچسب ویژه.
- **انتخاب قالب و استایل نمایشی (Layout Selector):** گرید، اسلایدر، کاروسل، ماسونری، بنتو و لیست.

### تب ۲: Style (استایل و ظاهر بصری)
- **تایپوگرافی (Group_Control_Typography):** فونت، اندازه، وزن، ارتفاع خط و فاصله حروف.
- **رنگ‌بندی کامل (Color Controls):** رنگ عنوان، متن، قیمت، بج، دکمه و وضعیت‌های Hover.
- **پس‌زمینه و گرادینت (Group_Control_Background):** پس‌زمینه کارت‌ها، گرادینت و حاشیه‌ها.
- **سایه و بردر (Group_Control_Box_Shadow & Border):** شعاع گوشه‌ها (Border Radius)، سایه کارت و کانتینر.
- **فواصل (Dimensions):** پدینگ (Padding) و مارجین (Margin) واکنش‌گرا به تفکیک Desktop، Tablet و Mobile.

### تب ۳: Advanced (پیشرفته و رفتار)
- تنظیمات واکنش‌گرایی (نمایش یا پنهان‌سازی در ابعاد مختلف).
- کلاس‌ها و شناسه‌های CSS سفارشی.
- افکت‌های حرکتی و ورودی (Motion FX / Animations).
- شرایط نمایش پیشرفته (Display Conditions بر اساس لاگین بودن یا نقش کاربر).

---

## ۴. تمپلیت‌های ویرایش‌پذیر المنتور و کیت‌های سایت (Editable Templates & Site Kits)

تمپلیت‌ها نباید کدهای منجمد، تصاویر یا HTML غیرقابل تغییر باشند. تمپلیت‌ها باید در ۳ دسته مجزا ارائه شوند:

1. **Elementor Page & Section Templates:**
   - ساخته شده از ساختار رسمی Container و Flexbox المنتور.
   - قابلیت وارد کردن به کتابخانه کاربری المنتور با متادیتاهای کامل (`_elementor_data`, `_elementor_edit_mode`, `_elementor_template_type`).
   - قابل ویرایش مستقیم پس از درون‌ریزی در ویرایشگر کشیدن و رها کردن.

2. **Theme Builder Templates (سازگار با استانداردهای Elementor Pro):**
   - تمپلیت‌های Header، Footer، Single Post، Archive، 404، Search Results و WooCommerce Single/Archive.
   - همراه با شروط نمایش (Display Conditions).
   - **سازگاری هوشمند با نسخه رایگان:** در صورتی که المنتور پرو نصب نباشد، سیستم از هوک‌های بومی قالب یا کدهای درون‌ریزی اختصاصی استفاده کرده و پیام راهنمایی شفاف ارائه می‌دهد، بدون اینکه صفحه سایت با خطای Fatal مواجه شود.

3. **Site Kits (کیت‌های کامل سایت):**
   - بسته جامع شامل تنظیمات تم (`Site Settings`)، تایپوگرافی گلوبال، پالت رنگ، تمپلیت‌های تم‌بیلدر، صفحات لندینگ و محتوای دمو با قابلیت درون‌ریزی یکپارچه.

---

## ۵. سیستم پکیج‌های مستقل و پورتابل قابلیت‌ها (Modular Portable Capability Packages)

هر قابلیت می‌تواند به یک فایل زیپ مستقل (مانند `portfolio-system.zip` یا `pricing-system.zip`) تبدیل شود و مشخصات زیر را دارد:

### ساختار پوشه هر بسته پورتابل:
```
packages/capability-sample/
├── manifest.json              # مانیفست کامل بسته و نیازمندی‌ها
├── bootstrap.php              # نقطه ورود و راه‌اندازی بسته
├── includes/
│   ├── class-cpt.php          # ثبت CPT و تاکسونومی اختصاصی
│   ├── class-service.php      # سرویس منطق تجاری و کوئری
│   ├── class-api.php          # اندپوینت‌های REST و ایجکس
│   └── class-admin.php        # صفحه تنظیمات یا تب داشبورد
├── elementor/
│   └── class-widget.php       # ویجت اختصاصی المنتور با سایدبار کامل
├── gutenberg/
│   └── class-block.php        # بلوک گوتنبرگ با اینسپکتور
├── templates/
│   └── template-preset.json   # تمپلیت‌های آماده با فرمت استاندارد المنتور
├── assets/
│   ├── css/
│   └── js/
└── tests/
    └── test-capability.cjs    # تست‌های خودکار یکپارچگی بسته
```

### ساختار فایل `manifest.json`:
```json
{
  "id": "uas-capability-portfolio",
  "name": "سیستم جامع نمونه‌کارها و پروژه‌ها",
  "version": "1.0.0",
  "author": "Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)",
  "package_type": "full_feature",
  "requirements": {
    "php": ">=7.4",
    "wordpress": ">=6.0",
    "elementor": ">=3.10",
    "elementor_pro": false,
    "theme_dependency": false
  },
  "cpt": ["portfolio_item"],
  "taxonomies": ["portfolio_category", "portfolio_tag"],
  "widgets": ["uas_portfolio_grid"],
  "gutenberg_blocks": ["sedrazavi/portfolio-grid"],
  "rest_routes": [
    "/sedrazavi/v1/portfolio/items",
    "/sedrazavi/v1/portfolio/filter"
  ],
  "capabilities_required": "edit_posts",
  "portable": true
}
```

---

## ۶. ماژول‌های مرکزی سیستم (Core System Modules)

برای هماهنگی بسته‌ها، هسته `Universal Elementor Suite` شامل ۱۲ ماژول مرکزی خواهد بود:

1. **Capability Registry:** ثبت و ایندکس کلیه قابلیت‌های فعال و شناسایی وابستگی‌ها.
2. **Package Manager:** مدیریت نصب، فعال‌سازی، به‌روزرسانی و استخراج زیپ مستقل هر قابلیت.
3. **Dependency Resolver:** بررسی عدم تداخل، چک کردن نسخه PHP/WordPress/Elementor قبل از نصب.
4. **Contract Registry:** ثبت ساختار درخواست/پاسخ و دسترسی‌های امنیتی هر اندپوینت.
5. **Event Bus:** برقراری ارتباط نامتقارن و رویدادمحور بین سرویس‌ها بدون کوپلینگ مستقیم.
6. **Workflow Engine:** مدیریت سناریوهای شرطی و اتوماسیون (مانند ارسال نوتیفیکیشن پس از فرم).
7. **Query Builder:** موتور ساخت کوئری‌های امن و بهینه با کش ترنزینت.
8. **Dashboard Registry:** ارائه ماژول‌های مانیتورینگ به مدیر سایت.
9. **Template Library:** فهرست و مدیریت الگوهای آماده جهت درون‌ریزی تکی یا گروهی.
10. **Migration Manager:** ارتقا و تبدیل داده‌ها در صورت تغییر نسخه‌ها.
11. **Feature Flags:** قابلیت روشن/خاموش کردن ویجت‌ها یا ماژول‌های خاص جهت کاهش بار پردازشی.
12. **Health Diagnostics:** ابزار تست سلامت و عیب‌یابی در پیشخوان وردپرس.

---

## ۷. چرخه توسعه مبتنی بر زمینه فازها (`PHASE_CONTEXT`)

برای پیشگیری از سرریز توکن (Token Exhaustion) در محیط‌های توسعه و هوش مصنوعی، توسعه بر اساس چرخه زیر پیش می‌رود:
- هر فاز دارای یک سند `PHASE_CONTEXT.md` کوچک و اختصاصی است.
- در ابتدای هر فاز فقط دامنه همان فاز با معیارهای پذیرش (Acceptance Criteria) سنجیده می‌شود.
- تا زمانی که تست‌های آن فاز ۱۰۰٪ پاس نشوند، فاز بعدی آغاز نخواهد شد.
