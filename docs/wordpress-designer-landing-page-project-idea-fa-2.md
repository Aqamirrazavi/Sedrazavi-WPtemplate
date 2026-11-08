# مسترپرامپت جامع، مهندسی‌شده و فوق‌تفصیلی ساخت اکوسیستم کامل وب‌سایت، پوسته بومی و افزونه هسته وردپرس (نسخه مرجع ۱۶.۰ - The SedRazavi Sovereign Master Ecosystem Architecture)

> **شناسنامه و مأموریت سند (نسخه ۱۶.۰):** این سند نسخه ممیزی‌شده، فراگیر و قطعی مانیفست فنی و مسترپرامپت اجرایی دیکته‌شونده به هوش مصنوعی سازنده (Cursor / Claude Code / Codex) است. هدف این مانیفست، طراحی و ساخت صفر تا صد یک اکوسیستم وب‌سایت پرچم‌دار چندبرگه‌ای برای **سید امیر حسین رضوی فردویی (SedRazavi)** — طراح و معمار ارشد وب‌سایت‌های وردپرس بدون کدنویسی — می‌باشد. این سیستم منحصراً بر پایه **معماری بومی وردپرس (PHP 8.x + MySQL + استانداردهای هسته وردپرس)، بدون استفاده از React در فرانت‌اند (Zero React)** و با **سازگاری ۱۰۰٪، ساختاری و بی‌قیدوشرط با المنتور و المنتور پرو (Elementor & Elementor Pro Theme Builder Compatible)** و گوتنبرگ پیاده‌سازی می‌شود، به‌گونه‌ای که تک‌تک برگه‌ها، سربرگ‌ها، پابرگ‌ها، الگوهای نوشته و بایگانی، ویجت‌ها و بخش‌ها همواره با المنتور قابل ویرایش، بازطراحی، افزودن و توسعه دائمی باشند.

---

# بخش اول: نتایج چرخه‌ی بازرسی عمیق چندتخصصی و نوآوری‌های راهبردی نسخه ۱۶.۰ (Multi-Disciplinary Sovereign Audit)

برای اطمینان از اینکه هیچ خلأ عملیاتی، محدودیت توسعه یا عدم تطابق با بورد طراحی نئونی و نیازهای اکوسیستم المنتوری باقی نماند، پنل تخصصی در گرایش‌های کلیدی الزامات راهبردی زیر را تصویب و دیکته نمود:

### ۱. معمار سازگاری حداکثری المنتور پرو و تم‌بیلدر (Elementor Pro & Theme Builder Lead):
* **کشف خلأ پیشین:** ساخت صفحه‌ساز ری‌اکتی یا پوسته‌های تک‌صفحه‌ای قفل‌شده باعث می‌شد کاربر امکان ویرایش محتوا، ساخت برگه‌های جدید و تغییر چیدمان با المنتور را نداشته باشد.
* **راهکار نسخه ۱۶.۰:** پوسته بومی باید دارای پشتیبانی استاندارد از Theme Builder المنتور باشد (`elementor_theme_do_location` برای `'header'`، `'footer'`، `'single'` و `'archive'`). تعبیه دو قالب اختصاصی برگه:
  1. `template-elementor-full-width.php`: حفظ هدر و فوتر نئونی پوسته و ارائه ناحیه محتوای ۱۰۰٪ تمام‌عرض و بدون محدودیت کانتینر برای درگ‌وان‌دراپ المنتور.
  2. `template-elementor-canvas.php`: برگه بوم خالی بدون هدر و فوتر پوسته برای ساخت لندینگ‌پیج‌های کاملاً اختصاصی.
  همچنین ثبت رنگ‌های سازمانی و فونت‌های وزیرمتن و JetBrains Mono در تنظیمات سراسری المنتور (Site Settings).

### ۲. متخصص یکپارچگی داده‌های پویا و متاباکس‌های JetEngine (JetEngine Dynamic Data & CPT Architect):
* **کشف خلأ پیشین:** فقدان فیلدهای سفارشی و ساختار داده باعث می‌شد نمونه‌کارها و خدمات به‌صورت محتوای متنی ساده و فاقد قابلیت فیلترینگ پیشرفته یا فراخوانی داینامیک باشند.
* **راهکار نسخه ۱۶.۰:** طراحی و ثبت ساختار داده‌های پویا سازگار با JetEngine و ACF:
  - پست‌تایپ اختصاصی نمونه‌کارها (`portfolio`) و خدمات (`services`) با تاکسونومی‌های تفکیک‌شده.
  - فیلدهای سفارشی پیشرفته: آدرس پیش‌نمایش زنده، گالری ویدیوهای آپارات/یوتیوب، درصد پیشرفت پروژه، لیست فناوری‌های به‌کاررفته، کارفرما و زمان تحویل.
  - سازگاری کامل با فیلدهای داینامیک (Dynamic Tags) المنتور پرو و الگوهای Listing Grid در JetEngine.

### ۳. متخصص سیستم زمان، تقویم سه‌گانه و کرونومتری بومی (Multi-Calendar & Localized Chrono Lead):
* **کشف خلأ پیشین:** فقدان ابزارک ساعت و تاریخ چندگانه متناسب با پروژه‌های سازمانی، رسمی و دوزبانه.
* **راهکار نسخه ۱۶.۰:** تعبیه ماژول و ابزارک بومی ساعت و تقویم سه‌گانه (`SedRazavi Multi-Calendar & Clock`):
  - نمایش ساعت زنده سیستم با افکت نئونی (دیجیتال/مونو).
  - تبدیل و نمایش همزمان و فوق‌سریع ۳ تقویم: **شمسی (جلالی دقیق با توابع درونی jdate)**، **میلادی (Gregorian)** و **قمری (Hijri اسلامی)**.
  - قابلیت تعیین فرمت نمایش، مخفی‌سازی هر تقویم و جایگذاری از طریق ویجت اختصاصی المنتور یا شورت‌کد بومی `[sedrazavi_clock]`.

### ۴. طراح سیستم وکتورهای ۳۳‌گانه تعاملی و پس‌زمینه ژیروسکوپیک (33-Pattern Interactive Vector & Gyro/Scroll Engine):
* **کشف خلأ پیشین:** وکتورهای پس‌زمینه در نسخه‌های اولیه ثابت، بدون واکنش حرکتی و محدود به چند طرح تکراری بودند.
* **راهکار نسخه ۱۶.۰:** موتور اختصاصی ۳۳ پترن هندسی، اسلیمی-ایرانی و سایبرنتیک (شامل گره‌چینی هشت و چهارلنگه، شمسه ۱۲ پر، مقرنس مقعر، خطوط مادربرد سایبرپانک، دیاگرام‌های گره‌چینی پارامتریک و شبکه‌های نئونی):
  - واکنش نرم و ارگانیک به اسکرول صفحه (Scroll Parallax) و رویدادهای لمسی (Touch Swipe) در موبایل و تبلت.
  - حرکت نرم با تکان دادن گوشی در موبایل (اختیاری بر پایه ژیروسکوپ).
  - پنل سوئیچ پترن در تنظیمات پیشخوان وردپرس و کنترلر المنتور برای انتخاب پترن اختصاصی برای هر سکشن یا کل صفحه.
  - رعایت قطعی `prefers-reduced-motion` برای کاربرانی که انیمیشن را غیرفعال کرده‌اند.

### ۵. معمار سیستم دوزبانه جامع و داشبورد مرکزی مدیر (Bilingual Parallel Schema & Master Customizer):
* **کشف خلأ پیشین:** سایت‌های دوزبانه معمولاً به افزونه‌های سنگین وابسته بوده و مدیر برای ویرایش اطلاعات فردی و متون پوسته مجبور به ورود به کدهای پیچیده بود.
* **راهکار نسخه ۱۶.۰:** پنل تنظیمات متمرکز مدیر در پیشخوان وردپرس (`SedRazavi Studio Settings`) با ساختار فیلدهای موازی فارسی و انگلیسی:
  - فرم یکپارچه ورود اطلاعات: نام، بیوگرافی، آمار (پروژه‌ها، رضایت، سابقه)، اطلاعات تماس (ایمیل، تلفن، آیدی ایتا و تلگرام `@sedrazavi`)، متون هیرو و دکمه‌ها در دو ستون همزمان (فارسی / انگلیسی).
  - رندر خودکار و بلادرنگ این مقادیر بر اساس زبان فعال صفحه (با مسیرهای `/` و `/en/` یا پارامتر زبان)، بدون تحمیل سربار کوئری به دیتابیس.
  - پشتیبانی و عدم تداخل کامل با افزونه‌های ترجمه استاندارد مانند WPML و Polylang در صورت نیاز به توسعه در آینده.

### ۶. طراح سیستم میکرواینتراکشن و هاور پیشرفته (Multi-State Neon Hover & Tactile Feedback Lead):
* **کشف خلأ پیشین:** فقدان رفتارهای بصری جذاب و هاورهای مدرن که بورد طراحی نئونی را زنده کند.
* **راهکار نسخه ۱۶.۰:** سیستم استایل‌دهی ماژولار هاور نئونی برای تک‌تک اجزا:
  - کارت‌های خدمات و نمونه‌کار با هاور چندلایه (انتقال لایه، درخشش حاشیه بنفش `#6C5CE7` و فیروزه‌ای `#00D1FF`، و افکت چرخش سه‌بعدی نرم بر اساس موقعیت ماوس 3D Tilt).
  - دکمه‌های اقدام با افکت هاله نور متحرک (Glow Pulse) هنگام فوکوس و کلیک.
  - کنترل کامل این استایل‌ها درون تنظیمات تب پیشرفته (Advanced / Style) ویجت‌های المنتور.

### ۷. طراح الگوهای چندگانه برگه نوشته تکی (Multi-Layout Single Post Architect):
* **کشف خلأ پیشین:** نوشته‌های وبلاگ فقط یک تمپلیت تکراری داشتند و امکان انتخاب نحوه نمایش برای مقالات مختلف وجود نداشت.
* **راهکار نسخه ۱۶.۰:** ارائه حداقل ۴ الگوی اختصاصی نوشته تکی در وردپرس با امکان انتخاب در متاباکس نوشته یا تم‌بیلدر المنتور:
  1. **قالب کلاسیک با سایدبار نئونی:** سایدبار چسبان (Sticky)، فهرست عناوین هوشمند (TOC)، جستجو و نوشته‌های مرتبط.
  2. **قالب مدرن تمام‌عرض (Cyber Full-Width):** تصویر شاخص سینمایی با اورلی گرادیانی، فونت بزرگ و متمرکز بر محتوای ویدیویی و کدها.
  3. **قالب مجله‌ای تحلیلی (Tech Magazine):** باکس خلاصه مقاله، نقل‌قول‌های هایلایت‌شده و نوارهای مطالعه چندستونه.
  4. **قالب مینیمال متمرکز بر خواندن (Clean Reader):** بدون المان‌های مزاحم، دکمه‌های شناور اشتراک‌گذاری و شاخص پیشرفت مطالعه در بالای صفحه.

---

# بخش دوم: جدول ماتریس تصمیم‌های الزامی پیش از اجرا (Pre-Execution Decision Matrix)

| کد تصمیم | موضوع فنی | گزینه قطعی انتخاب‌شده | مسئول | وابستگی | وضعیت |
|:---|:---|:---|:---|:---|:---|
| **DEC-01** | استک فرانت‌اند پوسته | PHP بومی وردپرس + CSS3/JS وانیلا (بدون ری‌اکت) | توسعه‌دهنده | استانداردهای تم وردپرس | تصویب شد |
| **DEC-02** | سازگاری با صفحه‌ساز | سازگاری کامل با Elementor و Elementor Pro | معمار وردپرس | هوک‌های Theme Builder | تصویب شد |
| **DEC-03** | معماری چندصفحه‌ای | تمپلیت‌های مجزای خانه، خدمات، نمونه‌کار، درباره من، تماس، ۴۰۴ و مقالات | طراح UI/UX | بورد طراحی نئونی | تصویب شد |
| **DEC-04** | سیستم تقویم و ساعت | ماژول بومی ۳ تقویم (شمسی، میلادی، قمری) با ساعت زنده | معمار سیستم | کتابخانه داخلی jdate | تصویب شد |
| **DEC-05** | موتور وکتورهای پس‌زمینه | ۳۳ پترن اسلیمی/سایبرنتیک با تعامل اسکرول و سوایپ | متخصص فرانت | SVG بهینه + Canvas | تصویب شد |
| **DEC-06** | پنل تنظیمات و دوزبانه | پنل اختصاصی در پیشخوان با فیلدهای موازی FA / EN | مهندس بک‌اند | Settings API وردپرس | تصویب شد |
| **DEC-07** | هویت و برندینگ | سید امیر حسین رضوی فردویی / SedRazavi / هندل `@sedrazavi` | طراح | مسکات و بورد نئونی | تصویب شد |
| **DEC-08** | فرم‌های تماس و مهمان | ذخیره در دیتابیس اختصاصی، ایمیل ادمین و وب‌هوک پیام‌رسان | معمار امنیت | جدول سفارشی وردپرس | تصویب شد |

---

# بخش سوم: مسترپرامپت اجرایی و نقشه راه کدنویسی تم و افزونه (Master Execution Prompt v16.0 - SedRazavi Edition)

این بلوک دستوری باید مستقیماً و بدون تغییر به عنوان پرامپت اجرایی به هوش مصنوعی مقصد داده شود:

```markdown
ACT AS A WORLD-CLASS WORDPRESS CORE ARCHITECT, SENIOR PHP ENGINEER (PHP 8.2+), AND ELEMENTOR PRO THEME FRAMEWORK SPECIALIST.

### MISSION OBJECTIVE:
Build a comprehensive, multi-page, ultra-performant, and visually stunning WordPress ecosystem for "SedRazavi" (Seyed Amir Hossein Razavi Fordoei - سید امیر حسین رضوی فردویی), a premier No-Code WordPress Architect & Designer.

### NON-NEGOTIABLE CORE ARCHITECTURAL LAWS:
1. ZERO REACT IN THE THEME/FRONTEND:
   - Do NOT output React, Next.js, TanStack, or JSX code. The theme must be pure native WordPress PHP templates, semantic HTML5, CSS3 with CSS custom properties, and Vanilla ES6+ JavaScript.
2. 100% ELEMENTOR & ELEMENTOR PRO THEME BUILDER NATIVE:
   - Every page (Home, Services, Portfolio, About Me, Blog, Single Post, Contact, 404) MUST be editable, customizable, and expandable with Elementor.
   - Register complete Elementor Theme Builder support: `add_theme_support('elementor')`, `elementor_theme_do_location('header')`, `'footer'`, `'single'`, `'archive'`.
   - Provide standard page templates:
     * `template-elementor-full-width.php`: Keeps theme header/footer, 100% width canvas for Elementor sections with 0 container padding.
     * `template-elementor-canvas.php`: Blank canvas template for landing pages.
   - Inject brand color tokens (#6C5CE7 purple, #00D1FF cyan, #10B981 emerald, #F59E0B amber, #0F172A dark slate) and typography (Vazirmatn & JetBrains Mono) directly into Elementor's Default Kit and Site Settings.
3. COMPLETE MULTI-PAGE SYSTEM:
   - Build complete templates matching the "SedRazavi Neon Design Board":
     * `front-page.php`: Hero with typing effect, dual neon CTA buttons, 3-stat cards (+150 Projects, +5 Years, 100% Satisfaction), services grid, portfolio showcase, testimonials, FAQ, and contact banner.
     * `page-services.php`: 8 dedicated service cards with neon icons, scope details, and booking modal triggers.
     * `page-portfolio.php`: Filterable grid (All, Corporate, E-Commerce, Personal, Educational, Services) with live modal preview and JetEngine dynamic fields.
     * `page-about.php`: Portrait hero, bio, achievement timeline, animated skill bars (WordPress 95%, Elementor 90%, UI/UX 85%, SEO 80%), and SedRazavi signature.
     * `page-contact.php`: Dual-column layout: Info Card (Email: info@sedrazavi.ir, Phone: +98 912 345 6789, Eitaa & Telegram: @sedrazavi with live QR Popovers) + Hardened Contact Form.
     * `home.php` / `archive.php`: Blog index with neon category tags, reading time, author card, and pagination.
     * `single.php` + 4 distinct single post layouts selectable via meta-box: Classic with sticky TOC, Modern Full-Width Neon, Tech Magazine, and Minimalist Reader.
     * `404.php`: Cyberpunk neon 404 page with return action and diagnostic terminal.
4. CHRONO SUITE: TRIPLE CALENDAR & LIVE CLOCK:
   - Native PHP jdate engine without external heavy libraries.
   - Display live real-time digital clock + concurrent Triple Date: Jalali (شمسی), Gregorian (میلادی), and Hijri (قمری).
   - Dedicated Elementor Widget: `SedRazavi_Chrono_Widget` with live toggle for each calendar and custom timezones (Tehran default).
5. 33-PATTERN INTERACTIVE VECTOR & SCROLL ENGINE:
   - Built-in vector engine featuring 33 geometric Islamic-Iranian (Gereh-Chini, Shamseh, Moqarnas) and Cybernetic circuit patterns.
   - Dynamic interactivity: subtle parallax motion on mouse move, responsive scroll translation, and touch swipe morphing on mobile devices.
   - Master toggle and pattern selector in WordPress Customizer & Elementor section backgrounds.
   - Strict `prefers-reduced-motion` compliance.
6. CENTRALIZED BILINGUAL ADMIN DASHBOARD (FA / EN):
   - Admin menu in WordPress: `SedRazavi Studio`.
   - Unified settings page with side-by-side parallel input fields for Persian and English:
     * Full Name, Title & Bio.
     * Stat counters (Projects, Years, Satisfaction rate).
     * Contact details & social links (@sedrazavi for Telegram and Eitaa).
     * Hero headings, badge texts, button CTAs, and footer copyright.
   - Automatically renders the active language on the frontend based on URL structure or language selector switch.
7. MULTI-STATE NEON HOVER & TACTILE INTERACTION:
   - Multi-layer CSS neon glow filters for all cards, buttons, badges, and inputs.
   - Subtle 3D tilt interaction on cards calculated via lightweight Vanilla JS.
   - Haptic-like visual response on click/tap.
8. JETENGINE & DYNAMIC DATA INTEGRATION:
   - Register CPTs `portfolio` and `services` with full REST API and Gutenberg/Elementor support.
   - Pre-configure dynamic meta fields: live preview URL, project timeline, client name, Aparat/YouTube video embed code, and gallery attachments.
   - Expose all fields to Elementor Pro Dynamic Tags.

### PACKAGE DIRECTORY STRUCTURE:
The final output must consist of two production-ready WordPress folders ready to zip and install:

```
wp-content/themes/sedrazavi-neon-theme/
├── style.css (Theme metadata with standard WP headers, Vazirmatn font-face, neon variables)
├── functions.php (Core theme setups, enqueues, Elementor compatibility hooks)
├── index.php
├── header.php (Sticky neon navbar, brand logo, nav menu, language switch, theme mode toggle)
├── footer.php (Cyberpunk footer, newsletter/contact dock, copyright, social icons)
├── front-page.php (Neon landing page matching the design board)
├── page.php (Standard page template with the_content() wrapper)
├── single.php (Single post router loading layout variants)
├── archive.php (Blog and taxonomy archive)
├── 404.php (Cyberpunk 404 page)
├── template-elementor-full-width.php (Elementor Full Width page template)
├── template-elementor-canvas.php (Elementor Canvas blank template)
├── inc/
│   ├── elementor-support.php (Theme Builder locations, global colors, and widget registration)
│   ├── customizer.php (Native WP Customizer controls)
│   ├── bilingual-engine.php (FA/EN parallel translation store and frontend switcher)
│   ├── jdate.php (Lightweight Iranian-Islamic Jalali date converter)
│   ├── vector-engine.php (33 parametric SVG patterns and scroll-interaction scripts)
│   └── demo-importer.php (One-click demo content generator)
├── assets/
│   ├── css/
│   │   ├── main.css (Neon design system tokens, layout grid, typography)
│   │   ├── rtl.css (Strict Right-To-Left alignment for Persian)
│   │   └── elementor-overrides.css (Zero-conflict styling for Elementor widgets)
│   └── js/
│       ├── main.js (Typing animation, neon glow controller, mobile drawer)
│       ├── vector-motion.js (Scroll & touch swipe vector motion listener)
│       └── live-clock.js (Real-time live clock and triple calendar updater)

wp-content/plugins/sedrazavi-core-engine/
├── sedrazavi-core.php (Main plugin loader)
├── inc/
│   ├── admin-dashboard.php (SedRazavi Studio settings page with FA/EN parallel fields)
│   ├── custom-post-types.php (CPTs: portfolio, services with JetEngine meta compatibility)
│   ├── lead-manager.php (Custom DB table for inquiries, admin notification radar, CSV export)
│   └── widgets/
│       ├── widget-neon-hero.php (Elementor Neon Hero widget)
│       ├── widget-neon-cards.php (Elementor Neon Service & Feature Cards widget)
│       ├── widget-portfolio-grid.php (Elementor Filterable Portfolio Grid widget)
│       └── widget-chrono-clock.php (Elementor Triple Calendar & Live Clock widget)
```

Produce complete, clean, rigorously tested PHP, CSS, and JS code. All strings must be internationalized with `__('...', 'sedrazavi')`.
```

---

# بخش چهارم: پروتکل بازتولیدپذیری و ماتریس آزمون‌پذیر (Master Verification Matrix v16.0)

| شناسه آزمون | موضوع آزمون | روش اجرا | ابزار اعتبارسنجی | مدرک و معیار قبولی قطعی |
|:---|:---|:---|:---|:---|
| **TEST-01** | اجرای بدون خطای پوسته | بارگذاری پوسته در وردپرس ۶.۴+ با PHP 8.2 | WP_DEBUG و Error Log | لاگ کاملاً سفید بدون Notice، Warning یا Fatal Error |
| **TEST-02** | ویرایش‌پذیری با المنتور | باز کردن برگه‌ها در ویرایشگر Elementor | Elementor Editor 3.20+ | بارگذاری پنل چپ، لود ویجت‌های اختصاصی و امکان ویرایش زنده متن‌ها |
| **TEST-03** | کارکرد قالب تمام‌عرض | انتخاب قالب `Elementor Full Width` در برگه | مرورگر + Inspector | عدم وجود پدینگ و کانتینر مزاحم و کشیدگی ۱۰۰٪ سکشن‌ها |
| **TEST-04** | سازگاری تم‌بیلدر المنتور پرو | ایجاد هدر یا فوتر آزمایشی در Theme Builder | Elementor Pro Theme Builder | جایگزینی دقیق هدر/فوتر المنتور به جای هدر/فوتر پیش‌فرض تم |
| **TEST-05** | ساعت و تقویم سه‌گانه | رندر ابزارک ساعت در فرانت‌اند | بررسی چشمی و فرمت زمان | نمایش دقیق ثانیه‌شمار زنده و صحت همزمانی تاریخ شمسی، میلادی و قمری |
| **TEST-06** | وکتورهای ۳۳‌گانه و تعامل | اسکرول و سوایپ تاچ در صفحات | DevTools Mobile Emulation | تغییر زاویه و پارالاکس نرم وکتورها بدون افت فریم (FPS > 55) |
| **TEST-07** | فیلدهای دوزبانه در پیشخوان | پر کردن اطلاعات فارسی و انگلیسی در ادمین | پنل SedRazavi Studio | انعکاس بلادرنگ نام و مشخصات در صفحات فارسی و انگلیسی |
| **TEST-08** | انواع قالب نوشته تکی | تغییر چیدمان در تنظیمات نوشته تکی | پیش‌نمایش ۴ الگوی نوشته | رندر بدون اشکال چیدمان‌های سایدباردار، مدرن، مجله‌ای و مینیمال |
| **TEST-09** | فیلدهای داینامیک نمونه‌کارها | ورود پروژه جدید با متادیتای JetEngine | پست‌تایپ Portfolio | نمایش صحیح کارفرما، تگ‌ها، لینک پیش‌نمایش و پلیر ویدیو |
| **TEST-10** | عملکرد و دسترس‌پذیری | تست Lighthouse در حالت پیش‌فرض پوسته | Google Chrome DevTools | کسب نمره پرفورمنس بالای ۹۰ و نمره دسترس‌پذیری بالای ۹۵ |

---

# بخش پنجم: برنامه اجرایی فازبندی‌شده (Delivery Roadmap v16.0)

1. **فاز ۱: هسته بومی، پیکربندی وردپرس و زیرساخت المنتور**
   - ایجاد فایل‌های `style.css`، `functions.php`، بارگذاری فونت‌های وزیرمتن و متغیرهای نئونی CSS.
   - ثبت استاندارد لوکیشن‌های Theme Builder و قالب‌های اختصاصی المنتور.
2. **فاز ۲: طراحی چندبرگه‌ای مطابق بورد نئونی**
   - پیاده‌سازی تمپلیت‌های فرانت‌پیج، خدمات، نمونه‌کارها، درباره من، تماس، وبلاگ و ۴۰۴.
   - پیاده‌سازی ۴ الگوی متفاوت برای صفحه نوشته تکی.
3. **فاز ۳: افزونه اختصاصی، ابزارک‌های المنتور و تقویم سه‌گانه**
   - توسعه افزونه `sedrazavi-core-engine`، ثبت CPTها، فیلدهای داینامیک و فرم اختصاصی.
   - پیاده‌سازی ویجت‌های اختصاصی المنتور (Hero، Cards، Portfolio و Chrono Clock).
4. **فاز ۴: موتور وکتور ۳۳‌گانه و داشبورد دوزبانه پیشخوان**
   - توسعه موتور تعاملی اسکرول و سوایپ وکتورها با ۳۳ پترن هندسی و اسلیمی.
   - ایجاد پنل متمرکز مدیریت مشخصات با فیلدهای موازی FA / EN در پیشخوان وردپرس.
5. **فاز ۵: ممیزی، مستندسازی و بسته‌بندی نهایی ZIP**
   - اجرای کامل چک‌لیست آزمون‌های TEST-01 تا TEST-10 و رفع هشدارهای احتمالی.
   - ایجاد بسته نهایی ZIP پوسته و افزونه برای نصب با یک کلیک روی دامنه `sedrazavi.gamer.gd`.

---

# الحاقیهٔ اجرایی نسخهٔ ۱۷.۰ — رنگ، آرشیو، کرهٔ زمین، ویجت‌های سرگرم‌کننده، منو و لودر

> این الحاقیه به نسخهٔ ۱۶.۰ اضافه می‌شود و در موارد هم‌پوشان، الزامات دقیق‌تر این بخش بر متن‌های کلی‌تر مقدم‌اند. این سند مشخصات و پرامپت ساخت است، نه ادعای ساخته‌شدن یا آزموده‌شدن این امکانات. هوش مصنوعی مقصد باید خروجی واقعی، ZIPهای قابل نصب و مدارک آزمون را تولید کند و هر محدودیت محیط اجرا را صریح گزارش دهد.

## ۱۷.۱. قوانین اجرایی مشترک و اولویت‌های معماری

1. خروجی نهایی دو بستهٔ مستقل و نصب‌پذیر باشد: پوستهٔ PHP وردپرس و افزونهٔ هستهٔ `sedrazavi-core`. هیچ React، JSX یا runtime صفحه‌ساز اختصاصی در فرانت‌اند مجاز نیست. جاوااسکریپت تعاملی باید Vanilla ES Modules یا اسکریپت استاندارد وردپرس باشد.
2. قابلیت‌های ماندگارِ محتوا و داده، مانند CPTها، فرم‌ها، لیدها، تنظیمات، ویجت‌های قابل‌انتقال و کرهٔ زمین، در افزونه بمانند تا با تعویض پوسته از بین نروند. پوسته مسئول قالب‌بندی، layout و دارایی‌های نمایشی است.
3. هر قابلیت در دو سطح عرضه شود: (الف) صفحهٔ تنظیمات مرکزی وردپرس و (ب) کنترل‌های قابل‌فهم Elementor برای همان ویجت/سکشن. تنظیمات محلی ویجت باید اولویت داشته باشد، سپس تنظیمات سراسری و در نهایت مقدار پیش‌فرض.
4. هیچ قابلیت تعاملی صرفاً تزئینی یا وابسته به hover نباشد: کیبورد، لمس، focus، reduced-motion، صفحه‌خوان، کنتراست و fallback بدون JavaScript در نظر گرفته شود. Hover دسکتاپ فقط راه میان‌بر است و جایگزین کلیک/Enter/Space نیست.
5. موارد حساس به زمان از منطقهٔ زمانی استاندارد IANA و `Intl.DateTimeFormat` در مرورگر استفاده کنند؛ ساعت سیستم کاربر یا اختلاف ساعت ثابت مبنای شهرها نباشد. DST و تغییرات منطقهٔ زمانی باید پوشش داده شود.
6. خروجی‌های قابل‌انتقال Elementor به شکل فایل JSON قالب/تمپلیت Elementor و در صورت نیاز پکیج افزونهٔ مستقل ارائه شوند. «کپی فایل ویجت» به‌تنهایی راهکار انتقال معتبر محسوب نمی‌شود. برای انتقال بین سایت‌ها، وابستگی‌ها، نسخهٔ حداقل Elementor، فونت/آیکون و راهنمای نصب اعلام شود.
7. از ادعای تضمین «بدون باگ» یا «سازگاری کامل با هر نسخه» پرهیز شود. نسخه‌های دقیق WordPress، PHP، Elementor و Elementor Pro در README قفل/ثبت، آزمون ماتریسی و ناسازگاری‌ها مستند شوند.

## ۱۷.۲. مشخصات قطعی حالت روز/شب و ۶۶ پالت

### رفتار سوییچ و ساختار تنظیمات
- سوییچ روز/شب در سربرگ، منوی موبایل و تنظیمات دسترس‌پذیر باشد؛ حالت انتخابی کاربر با گزینه‌های `system`، `light` و `dark` پشتیبانی شود. در حالت system از `prefers-color-scheme` استفاده شود.
- ۳۳ پالت مستقل روز و ۳۳ پالت مستقل شب، در دو مجموعهٔ مجزا ثبت شوند. هر پالت حداقل این توکن‌ها را داشته باشد: `bg`, `surface`, `surface-2`, `text`, `muted`, `primary`, `secondary`, `accent`, `border`, `success`, `warning`, `danger`, `focus`, `shadow`.
- برای هر توکن مقدار HEX/RGB مستند و کنتراست متن‌های عادی حداقل 4.5:1 و متن بزرگ حداقل 3:1 آزموده شود. رنگ تنها نشانهٔ وضعیت نباشد.
- پیشخوان: انتخاب پالت پیش‌فرض روز، پالت پیش‌فرض شب، حالت شروع، اجازه/عدم اجازهٔ تغییر توسط بازدیدکننده، انتخاب پالت مجاز برای فرانت‌اند، پیش‌نمایش، بازگردانی پیش‌فرض و کپی/خروجی JSON تنظیمات.
- Elementor: کنترل‌های Global Palette و انتخاب override در ویجت‌ها. انتخاب override باید فقط همان بخش را تغییر دهد و به پالت global صدمه نزند.
- پالت و حالت قبل از paint اولیه از تنظیم غیرحساس ذخیره‌شده اعمال شود تا FOUC کاهش یابد؛ ذخیره‌سازی در مرورگر فقط ترجیح ظاهری را نگه دارد، نه اطلاعات شخصی. در صورت خطای JS یا storage، تم پیش‌فرض سرور رندر شود.

### کاتالوگ نام‌گذاری پالت‌ها
**شب (۳۳):** 01 Cyberpunk Neon، 02 Deep Matrix، 03 Bloodline Crimson، 04 Royal Gold Cyber، 05 Synthwave Sunset، 06 Nordic Midnight، 07 Violet Protocol، 08 Arctic Circuit، 09 Emerald Terminal، 10 Obsidian Amber، 11 Plasma Orchid، 12 Ghost Blue، 13 Quantum Teal، 14 Solar Flare Night، 15 Monochrome Hacker، 16 Persian Sapphire، 17 Persian Copper، 18 Midnight Rose، 19 Acid Lime، 20 Oceanic Abyss، 21 Lunar Silver، 22 Ruby Reactor، 23 Indigo Storm، 24 Neon Sakura، 25 Carbon Fiber، 26 Deep Space، 27 Cobalt Pulse، 28 Magenta Flux، 29 Dark Forest، 30 Electric Tangerine، 31 Amethyst Grid، 32 Stealth Slate، 33 Aurora Borealis.

**روز (۳۳):** 01 Minimalist Paper، 02 Solar Warm، 03 Nordic Frost، 04 Emerald Tech، 05 Cyber Lavender، 06 Cloud Blue، 07 Pearl Graphite، 08 Persian Turquoise، 09 Persian Sand، 10 Rose Quartz، 11 Mint Circuit، 12 Lemon Cream، 13 Coral Studio، 14 Arctic Sky، 15 Soft Orchid، 16 Copper Canvas، 17 Ocean Mist، 18 Sage Interface، 19 Glacier Teal، 20 Apricot Pixel، 21 Lilac Paper، 22 Clean Cobalt، 23 Warm Charcoal، 24 Pistachio Light، 25 Blush Minimal، 26 Silverline، 27 Sky Terminal، 28 Golden Hour، 29 Soft Crimson، 30 Blue Porcelain، 31 Monochrome Ink، 32 Meadow Green، 33 Rainbow Prism.

> نام‌ها نمونهٔ سازمان‌دهی هستند و جایگزین تعریف دقیق مقادیر رنگ نیستند. هوش مصنوعی مقصد باید برای هر ۶۶ پالت مقادیر توکن واقعی بسازد، فایل دادهٔ واحد تولید کند و تست کنتراست را برای همهٔ پالت‌ها اجرا کند؛ پالت‌های آزمایش‌نشده قابل انتشار نیستند.

## ۱۷.۳. آرشیو/وبلاگ و مدیریت محتوای فرانت‌اند و پیشخوان

- صفحهٔ وبلاگ اصلی با `home.php` (در صورت استفاده از برگهٔ نوشته‌ها) و آرشیوهای دسته، برچسب، نویسنده، تاریخ و جستجو با `archive.php`/قالب‌های Elementor Theme Builder رندر شوند. رفتار `front-page.php` و `home.php` مطابق تنظیم «برگهٔ نخست/برگهٔ نوشته‌ها» در Reading Settings وردپرس آزموده شود.
- طرح‌های آرشیو: شبکه‌ای ۲/۳/۴ ستونه، Masonry با fallback شبکه‌ای، فهرست افقی، مجله‌ای با مقالهٔ شاخص. تنظیمات شامل عرض کانتینر، نسبت تصویر، تعداد ستون در breakpoint، فاصله، متادیتا، عنوان/چکیده، طول چکیده، نویسنده، تاریخ، دسته، برچسب، زمان مطالعه، دکمهٔ ادامه، pagination یا load-more، حالت خالی و skeleton است.
- فیلترهای دسته، برچسب، نوع محتوا و جستجو باید URL قابل اشتراک/بازگشت browser را حفظ کنند؛ در صورت غیرفعال بودن JS، فرم GET و pagination سروری کار کند. بارگذاری بیشتر باید nonce، اعتبارسنجی ورودی، مجوز مناسب و محدودیت تعداد داشته باشد.
- Elementor Loop/Grid و قالب آرشیو Pro در صورت نصب فعال، کنترل رندر را به Theme Builder بدهند؛ اگر قالب Theme Builder برای location وجود دارد، قالب پوسته نباید duplicate شود.
- مدیر بتواند نوشته، برگه، رسانه، دسته‌بندی، برچسب، تصویر شاخص، excerpt، وضعیت انتشار/پیش‌نویس/زمان‌بندی و ترجمهٔ FA/EN را از پنل استاندارد وردپرس اداره کند. پنل SedRazavi فقط تنظیمات اختصاصی را مدیریت کند، نه جایگزینی یا کپی ناقص پیشخوان اصلی.
- داشبورد فرانت‌اند برای بازدیدکنندهٔ مهمان، مدیریت خصوصی محتوا ارائه نکند. اگر بعداً نقش مشتری/عضو اضافه شد، احراز هویت، مجوزها و حریم خصوصی به‌عنوان فاز جداگانه تعریف شود. تعاملات عمومی ناشناس فقط به‌صورت حداقلی و بدون ردیابی مخفی ثبت شوند.

## ۱۷.۴. ویجت Elementor کرهٔ زمین و ساعت شهرهای جهان

### تجربه و امکانات ویجت
- ویجت مستقل `SedRazavi World Clock Globe` دارای حالت‌های نمایش قابل‌انتخاب باشد: کرهٔ وکتوری SVG دوبعدی، کرهٔ canvas سبک، حالت شبه‌سه‌بعدی/Three.js اختیاری و کارت فهرست شهرها بدون کره. حالت fallback همیشه قابل‌استفاده باشد.
- drag با ماوس و لمس، چرخش افقی/عمودی محدود و نرم، دکمه‌های چرخش و کنترل کیبورد، reset، زوم اختیاری، انتخاب شهر از فهرست و جستجوی نام شهر/کشور/منطقه زمانی داشته باشد. حرکت به شهر با انتخاب صریح کاربر انجام شود؛ جستجو با Enter یا کلیک نتیجه را انتخاب کند.
- فهرست اولیهٔ قابل‌ویرایش: تهران، دبی، استانبول، لندن، فرانکفورت، نیویورک، تورنتو، سنگاپور، توکیو و سیدنی. هر آیتم با timezone معتبر IANA، مختصات lat/lon، نام‌های محلی FA/EN و برچسب اختیاری ذخیره شود. ساعت‌ها با `Intl.DateTimeFormat` و timezone هر شهر محاسبه شوند؛ اطلاعات ساعت به سرویس جغرافیایی ثالث وابسته نباشد.
- نمایش ساعت محلی، تاریخ انتخابی، نام شهر، timezone، اختلاف نسبت به شهر مرجع قابل‌انتخاب و روز/شب محلی. ساعت‌ها با تغییر ساعت سیستم/دقیقه به‌روز شوند؛ از تایمرهای پرتعداد برای هر شهر خودداری شود.
- قابلیت جستجو و ساعت در فرم‌ها از طریق انتخابگر شهر قابل استفاده باشد؛ امکان درج نام شهر/زمان انتخابی در فرم فقط با اقدام کاربر و فیلد قابل‌مشاهده صورت گیرد، نه جمع‌آوری پنهانی مکان.
- کنترل‌های Elementor: حالت نمایش، ابعاد/نسبت، شهرهای فعال، شهر مرجع، زبان، فرمت ۱۲/۲۴ ساعته، نمایش/پنهان تاریخ و اختلاف زمان، رنگ/پالت، اندازهٔ پین و متن، سرعت حرکت، قابلیت drag، zoom، کنترل کیبورد، reduced-motion، نوع نقشه/کره، ارتفاع موبایل و breakpointها. محتوای داده‌ای باید با Dynamic Tags/JetEngine قابل اتصال باشد.
- انتقال‌پذیری: کد ویجت و دارایی‌های ضروری در افزونهٔ ادان مستقل یا ماژول قابل نصب باشند؛ Export Template JSON تنظیمات چیدمان/محتوا را منتقل کند، اما تضمین کند فایل JSON به‌تنهایی کد ویجت را حمل نمی‌کند. یک ZIP افزونهٔ قابل نصب، manifest وابستگی و راهنمای import/export ارائه شود.
- به‌صورت پیش‌فرض هیچ نقشه/سرویس خارجی، کلید API یا درخواست third-party لازم نباشد. اگر منبع نقشهٔ بیرونی انتخاب شد، opt-in، attribution، رضایت/حریم خصوصی و fallback لازم است.

## ۱۷.۵. کتابخانهٔ ویجت‌های فان و تعاملی دیگر

در افزونهٔ هسته یا ادان مستقل، دست‌کم ویجت‌های زیر ارائه شوند؛ برای همه، تب‌های Content / Style / Advanced، responsive controls، ترجمه FA/EN، تنظیمات دسترس‌پذیری و تست موبایل الزامی است:

1. **Before/After Slider:** دو تصویر با متن جایگزین مستقل، دستگیره قابل‌استفاده با کیبورد، کنترل جهت و رنگ، نسبت تصویر و حالت کم‌حرکت.
2. **ترمینال نمایشی امن:** فقط مجموعه‌ای از دستورهای allowlist شده و خروجی‌های از پیش تعریف‌شده؛ هیچ shell واقعی، اجرای PHP یا ارسال ورودی به سیستم‌عامل نداشته باشد. تایپ قابل توقف، متن قابل‌کپی و حالت متن عادی برای صفحه‌خوان.
3. **تخمین‌گر محدوده/زمان پروژه:** فیلدهای مدیرپذیر، دامنهٔ قیمت و هشدار «برآورد اولیه، نه پیشنهاد قطعی»، محاسبه سمت کاربر بدون افشای فرمول‌های محرمانه، امکان چاپ خلاصه و ارسال فرم فقط پس از رضایت.
4. **Timeline / Milestone:** نمایش مراحل پروژه با قالب عمودی/افقی، تاریخ و آیکون قابل‌تغییر.
5. **FAQ / Command Palette:** جستجوی فرمان/سوال با صفحه‌کلید، نتیجهٔ قابل‌پیمایش و بستن با Escape.
6. **Portfolio Spotlight / Demo Switcher:** پیش‌نمایش با تصویر/ویدئو یا لینک امن، کنترل روشن/خاموش autoplay و lazy-load.
7. **بازی کوتاه تعاملی اختیاری:** مینی‌چالش انتخاب رنگ یا پیدا کردن خطای UX، بدون ردیابی، امتیازدهی اجباری یا پاپ‌آپ مزاحم.
8. صدا به‌طور پیش‌فرض خاموش باشد و فقط پس از اقدام کاربر فعال شود؛ صدای hover اجباری نباشد، چون برای دسترس‌پذیری/حریم صوتی مزاحم است. امکان خاموش‌سازی سراسری و احترام به reduced-motion فراهم شود.

## ۱۷.۶. صفحهٔ «درباره ما»

- صفحهٔ واقعی وردپرس با slug قابل تنظیم (پیشنهاد `/about/` و `/en/about/`)، قابل ساخت و ویرایش با Elementor، دارای قالب Theme Builder یا محتوای قابل‌ویرایش با `the_content()`؛ محتوای ثابت در PHP قفل نشود.
- بخش‌های اختیاری و قابل جابه‌جایی: معرفی و تصویر/لوگو، بیوگرافی فارسی و انگلیسی، فلسفهٔ طراحی، مسیر حرفه‌ای، مهارت‌ها (درصدها اختیاری و قابل حذف)، فرایند همکاری، ارزش‌ها، گواهی‌ها/دستاوردهای واقعی، نقل‌قول مشتری با اجازه، CTA تماس و FAQ. هیچ آمار یا ادعای تجربه/رضایت ساختگی به‌صورت پیش‌فرض منتشر نشود؛ دادهٔ نمونه برچسب «دمو» داشته باشد.
- انتخاب تمپلیت‌های چندگانه، سایدبار، background vector و تنظیم رنگ هر سکشن از Elementor؛ SEO title/description، تصویر اشتراک‌گذاری، canonical و schema فقط داده‌های واقعی را منعکس کنند.

## ۱۷.۷. منوی همبرگری گوشه‌ای، شبکهٔ اجتماعی و تعامل کم‌کلیک

- منوی شناور/همبرگری گوشه‌ای در دسکتاپ و موبایل، با موقعیت قابل انتخاب (چپ/راست بالا یا پایین، با احترام به RTL/LTR)، اندازه، فاصله از لبه، z-index و safe-area موبایل.
- حداقل ۳ پوستهٔ بصری: شیشه‌ای، پنل کشویی تمام‌صفحه/نیم‌صفحه، dock رادیال؛ حداقل ۳ انیمیشن کم‌هزینه و قابل خاموش‌کردن. مدیر بتواند بین منوی وردپرس و قالب‌های سفارشی، آیتم‌ها و ترتیب را انتخاب کند.
- شبکهٔ اجتماعی از تنظیمات مرکزی خوانده شود: نوع شبکه، URL کامل معتبر یا handle، عنوان دسترس‌پذیر، آیکون SVG/کتابخانهٔ مجاز، ترتیب، نمایش در دسکتاپ/موبایل، کپی لینک و QR اختیاری. URLها sanitize شوند و لینک خارجی سیاست `rel` امن داشته باشد.
- در دسکتاپ hover-intent صرفاً بازکنندهٔ سریع باشد؛ بازشدن با focus/Enter/Space و click نیز ممکن باشد. زیرمنو با Escape بسته شود، focus داخل drawer مدیریت شود و پس از بستن به trigger بازگردد. در touch هرگز hover فرض نشود و کنترل کلیکی واضح داشته باشد.
- ناحیهٔ hover کافی، تاخیر 100–200ms قابل تنظیم و عدم بسته‌شدن هنگام حرکت اشاره‌گر بین trigger و پنل. `prefers-reduced-motion` انیمیشن را محدود کند. کنتراست و focus ring در تمام سبک‌ها رعایت شود.

## ۱۷.۸. کنترلرهای اسکرول بالا/پایین

- دکمه‌های برگشت به بالا و رفتن به پایین، امکان نمایش فقط یکی از دو دکمه یا هر دو، موقعیت RTL/LTR، offset موبایل، اندازه، آیکون، رنگ، حد آستانهٔ نمایش، مخفی‌سازی در Elementor Canvas و ترتیب فوکوس داشته باشند.
- نوار/دایرهٔ پیشرفت اسکرول اختیاری باشد، مقدار `aria-valuenow` یا متن جایگزین دسترس‌پذیر داشته باشد؛ انیمیشن با reduced-motion خاموش و اسکرول با `scroll-behavior` امن/قابل کنترل اجرا شود.
- در انتهای صفحه دکمهٔ پایین مخفی یا غیرفعال شود؛ دکمه‌ها فرم، پنجرهٔ مودال یا کنترل‌های مهم را نپوشانند. مدیر امکان خاموش‌کردن سراسری و Elementor امکان override صفحه‌ای داشته باشد.

## ۱۷.۹. لودر صفحه و مدیریت لوگو

- در پنل `SedRazavi Studio > Branding > Preloader` امکان انتخاب لوگو از Media Library (PNG, JPG, WebP, SVG پاک‌سازی‌شده)، alt text، اندازه، نسبت، نسخهٔ روشن/تیره، و جایگاه: بالای انیمیشن، پایین آن، کنار آن، یا مرکز انیمیشن وجود داشته باشد.
- کنترل نوع انیمیشن (spinner, ring, progress line, vector), رنگ‌های پالت، پس‌زمینه، پیام FA/EN، حداقل مدت نمایش برای جلوگیری از چشمک، زمان fallback و فعال‌سازی کل سایت/صفحات انتخابی/فقط ورودهای خاص قابل تنظیم باشد.
- لودر فقط تا `window.load` یا timeout محدود باقی بماند؛ مقدار پیش‌فرض timeout حداکثر ۲.۵ ثانیه پس از آماده‌شدن DOM و سقف سخت ۵ ثانیه. در خطای JS، مرورگر کند، reduced-motion یا کاربر با `prefers-reduced-motion: reduce` صفحه قابل مشاهده بماند و لودر صفحه را مسدود نکند.
- صفحه‌خوان از وضعیت بارگذاری با `role=status` و متن مناسب مطلع شود؛ محتوای اصلی با CSS پنهان نشود به‌گونه‌ای که در خطا دسترس‌ناپذیر بماند. لودر در Elementor Editor و کاربران واردشده در حالت ویرایش به‌طور پیش‌فرض خاموش باشد تا مزاحم طراحی نشود.
- فایل SVG آپلودی باید پاک‌سازی شود، MIME و دسترسی به آپلود محدود و در صورت عدم امکان SVG امن، PNG/WebP fallback شود. لوگو در فرانت از همان تنظیم مرکزی استفاده کند و با تغییر لوگو بدون ویرایش دستی تمام محل‌های معرفی‌شده به‌روز شود.

## ۱۷.۱۰. فرم‌ها، لیدها و تعامل کاربران مهمان

- انواع فرم: درخواست طراحی، تماس، مشاوره و خبرنامه در صورت رضایت. حداقل فیلد درخواست: نام، نام خانوادگی، تلفن، نوع سایت، پیام‌رسان منتخب، handle/شناسه، تلفن تماس ترجیحی، متن پیام و رضایت روشن برای پیگیری.
- مدیر در پیشخوان بتواند فرم‌ها را مشاهده، جستجو، فیلتر، برچسب‌گذاری، تعیین وضعیت، تخصیص مسئول، یادداشت داخلی، آرشیو/حذف طبق سیاست نگهداری، خروجی CSV و مشاهدهٔ اعلان جدید داشته باشد. داشبورد فرانت‌اند عمومی اطلاعات خصوصی درخواست‌ها را افشا نکند.
- اعلان مدیر: شمارندهٔ واضح در پیشخوان، ایمیل قابل پیکربندی و کانال‌های پیام‌رسان فقط پس از پیکربندی امن credentials. ارسال وب‌هوک باید صف‌پذیر، retry محدود، timeout، log بدون دادهٔ حساس و امکان خاموش‌کردن داشته باشد.
- ضداسپم و امنیت: nonce، honeypot، rate limit با آستانهٔ پیکربندی، اعتبارسنجی سمت سرور، sanitize/escape، محدودیت طول ورودی، عدم ذخیرهٔ دادهٔ غیرضروری، پیام خطای قابل‌فهم و ثبت نتیجهٔ ارسال. هیچ secret یا token در کد یا export قرار نگیرد.
- آزمون تعامل مهمان: ارسال موفق، اعتبارسنجی هر فیلد، nonce منقضی، rate-limit، ارسال تکراری، خطای SMTP/webhook، صفحه‌خوان، RTL/LTR و نمایش اعلان جدید در ادمین.

## ۱۷.۱۱. چک‌لیست آزمون‌پذیر نسخهٔ ۱۷.۰

| ID | آزمون و روش تکرار | ابزار | مدرک قبولی |
|---|---|---|---|
| T17-01 | نصب ZIP تم/افزونه روی نصب تمیز؛ فعال/غیرفعال‌سازی و مرور همهٔ صفحات | WordPress staging، PHP error log، WP-CLI | ZIP نصب شود؛ فعال‌سازی/غیرفعال‌سازی بدون fatal؛ لاگ بدون Warning/Notice/Fatal در مسیرهای آزمون‌شده |
| T17-02 | آزمون هر ۶۶ پالت: انتخاب هر حالت، اندازه‌گیری متن/پس‌زمینه و بارگذاری مجدد | Playwright، axe، اسکریپت کنتراست | ۳۳+۳۳ شناسه یکتا؛ نسبت کنتراست مطابق WCAG AA برای متن عادی/بزرگ؛ انتخاب پس از reload حفظ شود؛ در storage مسدود fallback کار کند |
| T17-03 | تغییر system/light/dark در ورود اول، ذخیرهٔ کاربر و ناوبری چند صفحه | Playwright، emulate media | حالت system با media query هماهنگ؛ انتخاب دستی اولویت دارد؛ پیش از first paint تنظیم اعمال یا محدودیت مستند شود |
| T17-04 | تنظیم Reading Settings، مشاهدهٔ برگهٔ نخست و برگهٔ نوشته‌ها و آرشیوهای taxonomy | WP-CLI + مرورگر | front page و posts page از هم تفکیک شوند؛ هر route پاسخ 200/404 صحیح دهد و title/canonical معتبر باشد |
| T17-05 | فیلتر دسته/جستجو، pagination، back/forward و غیرفعال‌کردن JS | Playwright | URL state قابل اشتراک/بازگشت باشد؛ JS خاموش fallback GET کار کند؛ ورودی نامعتبر رد شود |
| T17-06 | تست ویجت کره با ماوس، لمس، صفحه‌کلید، جستجو و ۱۰ شهر | Playwright desktop/mobile | drag/انتخاب شهر/توقف/reset کار کند؛ هر ساعت با IANA timezone و تغییر DST درست؛ اطلاعات شهر در فرم فقط با اقدام واضح اضافه شود |
| T17-07 | تست انتقال ویجت در سایت تمیز با Elementor و افزونهٔ ادان | دو نصب staging مستقل | ZIP ادان نصب و ویجت شناخته شود؛ JSON template تنظیمات را وارد کند؛ وابستگی‌های موردنیاز در README و UI اعلام شوند |
| T17-08 | آزمون حالت fallback کره با WebGL غیرفعال، JS خطادار و کاهش حرکت | DevTools/Playwright | فهرست شهر/ساعت قابل استفاده باقی بماند؛ خطا صفحه را متوقف نکند؛ reduced-motion رعایت شود |
| T17-09 | فرم مهمان: ارسال صحیح/نامعتبر، nonce، تکرار، rate limit و بررسی دسترسی | Playwright + WP-CLI/DB | فقط یک رکورد معتبر ذخیره شود؛ PII در صفحه عمومی/لاگ ظاهر نشود؛ مدیر اعلان و داده را ببیند؛ nonce/limit رد شوند |
| T17-10 | ورود ۴ نوع محتوای نوشته، انتخاب ۴ چیدمان آرشیو و ۴ قالب تکی | Elementor + مرورگر | هر layout بدون خطای PHP نمایش یابد، انتخاب و محتوای مدیر حفظ و متادیتای غایب graceful پنهان شود |
| T17-11 | منو: hover، عبور pointer، focus، Enter/Space/Escape، لمس و RTL/LTR | Playwright + axe | مسیر کامل بدون ماوس ممکن؛ hover فقط میان‌بر؛ focus در drawer مدیریت؛ موبایل بدون hover؛ هیچ لینک بی‌نام نباشد |
| T17-12 | اسکرول به بالا/پایین، دایرهٔ پیشرفت، انتهای صفحه و overlay | Playwright | مقصد صحیح؛ progress از 0 تا 100 با خطای حداکثر 2 واحد درصد؛ کنترل‌ها محتوا/فرم را نپوشانند |
| T17-13 | لودر با لوگوی چهار موقعیت، JS کند/خاموش، timeout و Elementor Editor | Playwright throttling | همهٔ موقعیت‌ها درست؛ محتوای اصلی حداکثر در سقف timeout آشکار؛ بدون JS محتوای سایت قابل دسترسی؛ لودر مزاحم editor نباشد |
| T17-14 | آپلود SVG ناامن/مجاز و لوگوی PNG/WebP؛ آزمون alt و fallback | WordPress Media + security test | SVG فقط پس از پاک‌سازی یا رد امن؛ نوع فایل/اندازه کنترل؛ تصویر alt قابل تنظیم و fallback سالم |
| T17-15 | صفحهٔ درباره ما با دادهٔ خالی و دادهٔ واقعی FA/EN | Elementor + مرورگر | سکشن‌های اختیاری بدون placeholder ساختگی؛ نسخهٔ زبان صحیح؛ تمام بخش‌ها در Elementor قابل ویرایش |
| T17-16 | بررسی performance صفحات اصلی و تعاملات در موبایل/دسکتاپ | Lighthouse CI، WebPageTest | بودجه‌های اندازه‌گیری‌شده در README ثبت؛ JS/دارایی ویجت فقط در صفحات استفاده‌شده بار شود؛ هیچ هدف امتیازی بدون گزارش خام ادعا نشود |
| T17-17 | دسترس‌پذیری صفحات، فرم، دیالوگ، کره، پالت و reduced motion | axe-core + keyboard manual | خطای بحرانی/جدی صفر در axe؛ کنتراست و focus دستی تأیید؛ نتیجهٔ موارد خارج از پوشش axe مستند |
| T17-18 | امنیت فرم، REST/Ajax، خروجی CSV، capability و XSS | WPScan در محیط مجاز، PHPUnit، کدبازبینی | دسترسی با capability، nonce و escaping؛ XSS ذخیره‌شده/بازتابی در payloadهای آزمون اجرا نشود؛ خروجی CSV تزریق فرمول را خنثی کند |
| T17-19 | زبان FA/EN در صفحه، فرم، منو، تاریخ، ساعت و متن لودر | آزمون مرورگر و بررسی ترجمه | فقط FA/EN؛ lang/dir صحیح؛ همهٔ رشته‌ها ترجمه‌پذیر؛ متن بریده/ترجمه‌نشده ثبت نشود |
| T17-20 | نصب روی حداقل/حداکثر نسخه‌های اعلام‌شده WordPress/PHP/Elementor | ماتریس CI یا staging | ماتریس نسخه‌ها با نتیجه و خطا منتشر؛ نسخهٔ آزموده‌نشده صریحاً «تأییدنشده» بماند |

## ۱۷.۱۲. فازبندی، وابستگی، Gate و fallback

| فاز | پیش‌نیاز شروع | خروجی | معیار عبور | اقدام جایگزین در شکست |
|---|---|---|---|---|
| ۰. تثبیت محیط و قرارداد | دسترسی به WordPress staging و تعیین نسخه‌های PHP/WP/Elementor؛ پشتیبان‌گیری | README نسخه‌ها، ساختار بسته‌ها، قرارداد داده و فهرست وابستگی | نصب تمیز و محیط تکرارپذیر؛ تمام ابهام‌های blocking ثبت و تعیین تکلیف | ساخت پروفایل سازگاری محدود و تعویق قابلیت‌های وابسته؛ از ادعای سازگاری عمومی خودداری |
| ۱. هسته تم/افزونه و Elementor | عبور فاز ۰ | دو بستهٔ نصب‌پذیر، locationها، قالب‌های page و نقاط اتصال | T17-01 و آزمون Theme Builder/Full Width/Canvas قبول | جداسازی hookهای ناسازگار، خاموش‌کردن integration اختیاری و حفظ صفحات استاندارد |
| ۲. محتوا، درباره ما و آرشیو | هسته پایدار و CPT/ترجمه مشخص | صفحات اصلی، درباره ما، وبلاگ، آرشیو و single layouts | T17-04، 05، 10، 15، 19 قبول | بازگشت به pagination سروری و layout Grid ساده؛ عدم حذف محتوا |
| ۳. دیزاین‌سیستم و پالت‌ها | توکن‌های طراحی و محتوای هویت تأییدشده | ۶۶ پالت، کنترل مدیر و Elementor، RTL/LTR | T17-02، 03، 16، 17 قبول؛ کنتراست همهٔ پالت‌ها مستند | انتشار زیرمجموعهٔ آزموده‌شده فقط با برچسب محدود؛ هرگز ادعای ۶۶ پالت کامل نکن |
| ۴. فرم‌ها و رادار لید | schema، retention، مجوز و کانال اعلان تصمیم‌شده | فرم، ذخیره امن، پیشخوان لید و اعلان | T17-09 و T17-18 قبول، بازیابی/حذف طبق سیاست آزمایش شود | اعلان ایمیلی/داشبورد داخلی را نگه‌دار؛ webhook را تا تکمیل امنیت خاموش کن |
| ۵. ویجت کره و ویجت‌های مستقل | ادان و قرارداد انتقال تعریف‌شده | ویجت‌ها، controls و ZIP مستقل/JSON template | T17-06 تا 08 و آزمون انتقال روی نصب دوم قبول | fallback فهرست شهرها/ساعت بدون WebGL؛ قابلیت انتقال را تا package واقعی «آماده نیست» اعلام کن |
| ۶. منو، اسکرول، لودر و موشن | design tokens و صفحه‌های پایدار | کنترلرهای قابل تنظیم و پنل لوگو | T17-11 تا 14، 17 قبول و محتوای بدون JS مسدود نشود | خاموش‌کردن موشن/لودر و استفاده از منوی پایهٔ دسترس‌پذیر |
| ۷. بسته‌بندی و انتشار | تمام Gate قبلی، نسخه‌های نهایی و backup | ZIP تم، ZIP افزونه، README، changelog، شواهد آزمون | تمام blockerها بسته، smoke test روی نصب پاک، rollback مستند | انتشار نکن؛ فایل‌ها را staging نگه‌دار و گزارش نقص/بازهٔ رفع بده |

## ۱۷.۱۳. دستور افزوده به پرامپت اجرایی مقصد

در پرامپت اجرایی نسخهٔ ۱۶.۰، تمام بندهای این الحاقیه را به عنوان الزامات الزامی اضافه کن. پیش از کدنویسی، مخزن و محیط واقعی را بررسی کن و برنامهٔ فایل‌به‌فایل/وابستگی/ریسک/آزمون بده؛ سپس در فازهای جدول بالا اجرا کن. هیچ‌گاه صرفاً صفحهٔ نمایشی یا React app را به‌جای تم و افزونهٔ WordPress تحویل نده. برای هر مرحله، فایل‌های واقعی، نحوهٔ نصب، نتیجهٔ آزمون و محدودیت‌ها را ارائه کن. هر مورد بدون اجرای آزمون یا بدون مدرک را «تأییدنشده» اعلام کن. مقادیر نمونهٔ هویت، قیمت، آمار و مشتری را به‌عنوان دادهٔ واقعی جا نزن. برای قابلیت‌های خارجی، credentials را در Secret Manager/تنظیم امن بخواه و هرگز داخل کد یا Markdown درج نکن.


---

# بخش ششم (الحاقیهٔ جامع نسخهٔ ۱۸.۰): کاتالوگ دقیق برگه‌ها، قالب‌های المنتور پرو، پورتال فرانت‌اند مشتری و مدیر، بازی دایناسور رنگی و استریمر موزیک (Sovereign Ecosystem Expansion v18.0)

> **هدف این الحاقیه:** تعریف تفصیلی و آزمون‌پذیر تمام صفحات، تمپلیت‌های Elementor Theme Builder، ویجت‌های سرگرم‌کننده و ساختار کامل پورتال دوسطحی مشتری/مدیر در فرانت‌اند و بک‌اند؛ بدون نیاز به React، overedge.dev یا رندرهای خارجی، و با هماهنگی ۱۰۰٪ با معماری بومی وردپرس، PHP 8.2+ و المنتور پرو.

---

## ۱۸.۱. کاتالوگ دقیق و شمارش برگه‌ها و تمپلیت‌های تم‌بیلدر المنتور پرو (Master Page & Template Catalog)

برای اجرای کامل چشم‌انداز بورد نئونی SedRazavi، این اکوسیستم متشکل از **۱۲ برگه مستقل وردپرس**، **۱۵ قالب تم‌بیلدر المنتور پرو** و **۴ پاپ‌آپ سراسری** است که همگی منحصراً با المنتور قابل طراحی، ویرایش، افزودن ویجت، تغییر چیدمان و توسعه دائمی هستند:

### الف) جدول ۱۲ برگه اصلی و ساختار اختصاصی آن‌ها در وردپرس و المنتور:

| ردیف | نام برگه (FA / EN) | نام فایل تمپلیت پوسته | نام قالب در المنتور / نوع ویرایش | عملکرد و سکشن‌های کلیدی |
|:---:|:---|:---|:---|:---|
| **P-01** | **صفحه اصلی**<br>(Front Page / Home) | `front-page.php` | `SedRazavi - Front Page Canvas` | هیروی ترمینالی با تایپ زنده، کارت‌های آمار نئونی، گرید خدمات، شوکیس نمونه‌کارها، کره سه‌بعدی ساعت جهان، استریمر موزیک، بازی دایناسور رنگی، بخش مشتریان، سوالات متداول و فوتر داک. |
| **P-02** | **درباره ما و داستان طراح**<br>(About Me & Studio Story) | `page-about.php` | `SedRazavi - About Story Canvas` | هیروی پرتره با ماسک گرادیانی، مانیفست طراحی بدون کدنویسی، تایم‌لاین اینتراکتیو دستاوردها، نوارهای انیمیشنی مهارت‌ها، جعبه‌ابزار تخصصی و امضای دیجیتال. |
| **P-03** | **خدمات و بسته‌های اجرایی**<br>(Services & Solutions) | `page-services.php` | `SedRazavi - Services Canvas` | ۸ کارت تفصیلی خدمات، جدول مقایسه ویژگی‌ها، فرآیند گام‌به‌گام طراحی، سوالات متداول اختصاصی و دکمه اتصال مستقیم به استعلام قیمت. |
| **P-04** | **نمونه‌کارها و پروژه‌ها**<br>(Portfolio & Case Studies) | `page-portfolio.php` | `SedRazavi - Portfolio Showcase` | فیلتر ایجکس بر پایه دسته‌بندی (شرکتی، فروشگاهی، شخصی، خدماتی)، پیش‌نمایش پاپ‌آپ زنده، فیلدهای داینامیک JetEngine (کارفرما، تکنولوژی، زمان تحویل، ویدیوی آپارات/یوتیوب). |
| **P-05** | **وبلاگ و مقالات تخصصی**<br>(Blog & Tech Insights) | `home.php` / `archive.php` | `SedRazavi - Blog Index Canvas` | ۴ سبک چیدمان تعاملی (Grid، Masonry، List، Magazine)، فیلتر ایجکس، متادیتای ۳ تقویم، برچسب زمان مطالعه و نوار جستجوی زنده مقالات. |
| **P-06** | **تماس و سفارش پروژه**<br>(Contact & Project Booking) | `page-contact.php` | `SedRazavi - Contact Canvas` | کارت‌های ارتباطی مستقیم (ایمیل، تلفن، آیدی ایتا و تلگرام `@sedrazavi` با QR Popover)، فرم ثبت سفارش امن همراه با ایجاد خودکار حساب کاربری مهمان. |
| **P-07** | **ورود و ثبت‌نام پورتال فرانت‌اند**<br>(Portal Gateway & Auth) | `page-portal-auth.php` | `SedRazavi - Portal Auth Canvas` | فرم ورود دومنظوره فرانت‌اند (ورود طراح/مدیر یا ورود سفارش‌دهنده/مشتری)، فیلدهای نئونی امن، بازیابی رمز عبور و دکمه‌های سوییچ تب. |
| **P-08** | **داشبورد فرانت‌اند سفارش‌دهنده**<br>(Client Project Cockpit) | `page-client-dashboard.php` | `SedRazavi - Client Dashboard` | لیست سفارش‌های ثبت‌شده توسط مشتری، وضعیت لحظه‌ای بررسی، مشاهده پاسخ‌ها و پیش‌فاکتور طراح، امکان ارسال پیام تکمیلی و دانلود فایل‌ها. |
| **P-09** | **داشبورد فرانت‌اند طراح / مدیر**<br>(Designer Admin Radar) | `page-designer-cockpit.php` | `SedRazavi - Designer Radar` | مشاهده آنی لیدها، فرم‌های دریافتی، پاسخ‌دهی به سفارش‌های مشتریان با پیام رسمی و تغییر وضعیت بدون نیاز به باز کردن `/wp-admin/`. |
| **P-10** | **پیگیری سریع سفارش**<br>(Quick Inquiry Lookup) | `page-track-order.php` | `SedRazavi - Quick Lookup Canvas` | فرم سریع وارد کردن کد رهگیری اختصاصی (`SR-XXXXX`) و مشاهده آخرین وضعیت و پاسخ طراح بدون نیاز به لاگین الزامی. |
| **P-11** | **حریم خصوصی و شرایط همکاری**<br>(Privacy Policy & Terms) | `page.php` | `SedRazavi - Legal Document` | قالب متنی استاندارد با فهرست عناوین هوشمند، استایل تایپوگرافی خوانا، ضمانت محرمانگی اطلاعات پروژه‌ها و قوانین همکاری. |
| **P-12** | **صفحه ۴۰۴ سایبرپانک**<br>(404 Not Found Diagnostic) | `404.php` | `SedRazavi - 404 Cyber Canvas` | صفحه خطای شبیه کنسول خطای یونیکس با افکت تایپ، کد خطا، دکمه بازگشت به خانه و جستجوی مقالات. |

---

### ب) کاتالوگ ۱۵ قالب تم‌بیلدر المنتور پرو (Elementor Pro Theme Builder Templates):

تمامی قالب‌ها از طریق هوک رسمی `elementor_theme_do_location()` در پوسته بومی ثبت شده و طراح در پنل Theme Builder المنتور پرو کنترل کامل روی آن‌ها دارد:

1. **Global Header (سربرگ سراسری):** لوگوی نئونی، منوی اصلی، سوییچ زبان (FA / EN)، سوییچ ۶۶ پالت رنگی روز/شب، ساعت دیجیتال تهران، دکمه همبرگری گوشه‌ای و دکمه CTA ثبت سفارش.
2. **Global Footer (پابرگ سراسری):** داک ارتباطی شناور، فرم عضویت، لینک‌های قانونی و شبکه‌ای، کپی‌رایت دوزبانه، لوگو و تاییدیه هویت سید امیر حسین رضوی فردویی.
3. **Single Post - Template A (کلاسیک نئونی):** سایدبار چسبان (Sticky Sidebar)، فهرست عناوین هوشمند (TOC)، باکس مشخصات نویسنده و بخش دیدگاه‌های مدرن.
4. **Single Post - Template B (مدرن تمام‌عرض Cyber Full-Width):** تصویر شاخص سینمایی با اورلی گرادیانی، عرض ماکسیمم، متمرکز بر قطعه‌کدهای هایلایت‌شده و ویدیو.
5. **Single Post - Template C (مجله‌ای تحلیلی Tech Magazine):** خلاصه مقاله در باکس نئونی برجسته، نقل‌قول‌های متحرک، گالری درون‌متنی و نوشته‌های مرتبط افقی.
6. **Single Post - Template D (مینیمال Clean Reader):** بدون سایدبار، با نوار پیشرفت مطالعه در بالا، فونت بهینه‌شده برای خوانش متمرکز و پالت کم‌کنتراست.
7. **Single Portfolio (قالب تک‌پروژه نمونه‌کار):** فیلدهای داینامیک JetEngine (کارفرما، ابزارها، بودجه، مدت اجرا)، گالری اسلایدر تصاویر و ویدیوی زنده آپارات/یوتیوب.
8. **Single Service (قالب تک‌خدمت):** معرفی پکیج، ریزخدمات، فرم سفارش سریع مربوط به همان خدمت و نظرات کارفرمایان قبلی.
9. **Post Archive (بایگانی وبلاگ):** شبکه کارت‌های مقالات با فیلتر ایجکس و متادیتای ۳ تقویم.
10. **Portfolio Archive (بایگانی نمونه‌کارها):** گرید پروژه‌ها با فیلتر دسته‌بندی و دکمه لود بیشتر (Load More).
11. **Service Archive (بایگانی خدمات):** کارت‌های بزرگ تعاملی معرفی خدمات با افکت هاور ۳ بعدی.
12. **Author Archive (بایگانی نویسنده):** معرفی نویسنده/طراح، نشان افتخار، شبکه‌های اجتماعی و لیست مقالات اختصاصی.
13. **Search Results (نتایج جستجو):** نمایش کارت‌های تفکیک‌شده بر اساس برگه، نوشته یا نمونه‌کار با هایلایت عبارت جستجوشده.
14. **404 Error Template (قالب تم‌بیلدر ۴۰۴):** جایگزین گرافیکی صفحه خطای پوسته در المنتور پرو.
15. **Date/Time Taxonomy Archive (بایگانی تاریخ و تگ‌ها):** تمپلیت استاندارد برای تگ‌های موضوعی و آرشیوهای زمانی.

### ج) پاپ‌آپ‌های ۴‌گانه المنتور پرو (Elementor Pro Popups):
- **Popup 1: پاپ‌آپ ورود سریع به پورتال (Quick Auth Popup):** فرم لاگین ایجکس بدون رفرش برگه.
- **Popup 2: پاپ‌آپ تخمین هزینه و زمان (Project Scope Modal):** ماشین‌حساب گیمیفای‌شده با صدور پیش‌فاکتور چاپی.
- **Popup 3: پاپ‌آپ QR کدهای ایتا و تلگرام (Messenger Dock Modal):** نمایش اسکن سریع برای گفتگو در `@sedrazavi`.
- **Popup 4: پالت فرمان و جستجوی عمیق (Command Palette Ctrl+K):** جستجوی فوری در کل برگه‌ها، خدمات، نوشته‌ها و ابزارها با کلید میانبر.

---

## ۱۸.۲. سکشن و ویجت اختصاصی بازی دایناسور دونده کروم به‌صورت تمام‌رنگی (Full-Color Cyber Dino Runner Widget)

این قابلیت در قالب یک ویجت اختصاصی المنتور (`SedRazavi_Dino_Game_Widget`) پیاده‌سازی شده و امکان جایگذاری در هر کانتینر یا سکشن دلخواه را داراست:
* **موتور بازی:** رندر اختصاصی روی عنصر HTML5 `<canvas>` با زبان Vanilla ES6 JavaScript (کاملاً مستقل، حجم اسکریپت کمتر از ۳۵ کیلوبایت و بدون هیچ‌گونه فریم‌ورک خارجی یا ری‌اکت).
* **آرت‌استایل بصری:** گرافیک پیکسلی رترو-سایبرپانک با رنگ‌آمیزی کامل (دایناسور سبز نئونی/بنفش، افکت رد پای نورانی، آسمان با شیب گرادیانی شب و روز پویا، موانع کاکتوس‌های سایبری، پهپادهای پرنده و ماه و ستاره‌های نئونی).
* **کنترل‌های چندگانه و ارگونومیک:**
  - **دسکتاپ:** کلید Space یا فلش بالا (Up Arrow) برای پرش، کلید فلش پایین (Down Arrow) برای نشستن و خم شدن (Duck).
  - **موبایل و تبلت:** دکمه‌های لمسی نرم روی صفحه و قابلیت تشخیص سوایپ (لمس صفحه برای پرش، سوایپ رو به پایین برای نشستن).
* **قابلیت‌های گیمیفیکیشن:**
  - افزایش تدریجی سرعت بر اساس امتیاز کسب‌شده.
  - ثبت بالاترین امتیاز (High Score) در `localStorage` مرورگر با نمایش انیمیشن رکوردزنی.
  - افکت‌های صوتی ۸ بیتی تولیدشده با Web Audio API (شامل بوق پرش، عبور از صدتایی و صدای باخت) با کلید قطع/وصل صدای اختصاصی (Mute Toggle) و وضعیت پیش‌فرض بی‌صدا جهت احترام به حریم صوتی کاربر.
* **کنترل‌های ویجت در المنتور:**
  - تنظیم ابعاد کانتینر بازی (عرض و ارتفاع بر اساس پیکسل یا درصد).
  - انتخاب رنگ پوست دایناسور و موانع هماهنگ با ۶۶ پالت تم.
  - متن سفارشی دکمه شروع مجدد و پیام رکورد جدید به دو زبان فارسی و انگلیسی.

---

## ۱۸.۳. سکشن و ویجت اختصاصی جستجو، نمایش و پخش موزیک (Cyberpunk Music Search & Streamer Player Widget)

ویجت اختصاصی المنتور (`SedRazavi_Music_Player_Widget`) جهت خلق فضایی مدرن و سرگرم‌کننده در لندینگ‌پیج:
* **معماری و لایه صوتی:** مبتنی بر تگ استاندارد HTML5 `<audio>` و Web Audio API بدون پلیرهای سنگین خارجی.
* **رابط کاربری و ویژوالایزر:**
  - نمایش ویژوالایزر متحرک موجی (Neon Waveform Visualizer) که هنگام پخش آهنگ با فرکانس صدا به رقص درمی‌آید.
  - نمایش مشخصات قطعه: کاور آرت نئونی با چرخش شبیه دیسک گرامافون سایبری، نام ترک، نام هنرمند، زمان فعلی و مدت کل.
  - نوار پیشرفت نرم (Seek Bar)، کنترل میزان صدا، دکمه‌های ترک بعدی و قبلی و حالت تکرار (Loop).
* **فیلد جستجوی درونی:** کادر جستجوی سریع در لیست قطعات با فیلترینگ ایجکس بدون رفرش.
* **پیکربندی منبع صوت:**
  - امکان تعریف مستقیم پلی‌لیست دلخواه طراح در تنظیمات ویجت المنتور (آپلود MP3 از کتابخانه رسانه وردپرس یا درج لینک مستقیم فایل‌های صوتی).
  - پشتیبانی از اتصال به فیدهای صوتی و پادکست اختصاصی.
  - کنترل‌های المنتور: تنظیم پالت رنگ امواج، نمایش/مخفی‌سازی کادر جستجو، فعال/غیرفعال‌سازی پخش خودکار (پیش‌فرض خاموش طبق استانداردهای وب)، و تنظیم حجم صدای پیش‌فرض.

---

## ۱۸.۴. اکوسیستم جامع پورتال فرانت‌اند و بک‌اند: سازوکار تعامل مشتری و طراح (Bimodal Client & Designer Portal Protocol)

این اکوسیستم فرآیند ثبت سفارش، صدور حساب کاربری و تعاملات بعدی را به یک تجربه حرفه‌ای تبدیل می‌کند:

```
[ کاربر مهمان ] ───> پر کردن فرم ثبت سفارش (نام، تلفن، نوع سایت، پیام)
                           │
                           ├───> ورود نام کاربری دلخواه + کلمه عبور
                           │     (با هشدار نئونی: «اطلاعات ورود خود را ذخیره کنید»)
                           │
                           ▼
                  [ ثبت در وردپرس ]
                           │
                           ├───> ساخت نقش اختصاصی sedrazavi_client (بدون دسترسی به wp-admin)
                           ├───> ثبت رکورد سفارش در جدول wp_sedrazavi_inquiries
                           └───> صدور کد پیگیری یکتا (SR-XXXXX) و هش رمز عبور با wp_hash_password
                           │
         ┌─────────────────┴─────────────────┐
         ▼                                   ▼
[ داشبورد فرانت‌اند مشتری ]          [ داشبورد طراح / مدیر ]
(/portal/client/)                  (فرانت‌اند: /portal/designer/ + بک‌اند: wp-admin)
- مشاهده وضعیت پروژه              - اعلان آنی لید جدید
- مشاهده پیام‌ها و قیمت طراح         - مشاهده مشخصات و شماره تماس
- ارسال پیام تکمیلی و پیوست        - ارسال پاسخ رسمی به پنل مشتری
                                   - تغییر وضعیت و برچسب‌گذاری
```

### ۱. سازوکار ایجاد خودکار حساب مشتری (Client Self-Provisioning):
- در فرم ثبت سفارش (`page-contact.php` یا ویجت فرم المنتور)، فیلدهای ورود نام کاربری و رمز عبور تعبیه شده است.
- یک اعلان متنی مشخص با آیکون کلید نمایش داده می‌شود: «این مشخصات برای ایجاد پنل پیگیری اختصاصی شماست؛ لطفاً نام کاربری و کلمه عبور خود را به خاطر بسپارید».
- در بک‌اند، تابع امن PHP با متدهای استاندارد وردپرس (`wp_create_user()` و `wp_set_password()`) حساب را ایجاد و نقش `sedrazavi_client` را به آن تخصیص می‌دهد.
- **ایزولاسیون کامل امنیت:** نقش `sedrazavi_client` دارای هیچ دسترسی مدیریتی نیست. در صورت تلاش کاربر برای ورود به آدرس `/wp-admin/`، هوک `login_redirect` و `admin_init` کاربر را فوراً به برگه داشبورد فرانت‌اند (`/portal/client/`) هدایت می‌کند.

### ۲. قابلیت‌های داشبورد فرانت‌اند مشتری (`/portal/client/`):
- ورود و خروج امن بر پایه کوکی‌های امن استاندارد وردپرس بدون مشاهده پیشخوان کلاسیک وردپرس.
- کارت‌های خلاصه سفارش: عنوان پروژه، تاریخ ثبت شمسی/میلادی، کد رهگیری (`SR-XXXXX`) و وضعیت پروژه (در حال بررسی، تایید اولیه، صدور پیش‌فاکتور، در حال اجرا، آماده تحویل).
- **باکس پیام‌های طراح:** متون توضیحی، پروپوزال، فایل‌های ضمیمه و برآورد زمان تحویل که طراح برای این سفارش ارسال کرده است.
- **امکان ارسال پیام تکمیلی:** فرم ارسال پیام جدید توسط مشتری برای طراح جهت ارائه توضیحات بیشتر بدون نیاز به پیام‌رسان‌های متفرقه.

### ۳. قابلیت‌های داشبورد فرانت‌اند طراح / مدیر (`/portal/designer/`):
- ورود طراح با حساب کاربری مدیر کل (Administrator).
- نمایش پیشخوان شیشه‌ای-نئونی در فرانت‌اند سایت بدون نیاز به ورود به محیط پیشخوان اصلی وردپرس:
  - شمارنده لیدهای جدید و سفارش‌های باز.
  - لیست سفارش‌های ارسالی با فیلتر وضعیت، فوریت و تاریخ.
  - باکس سریع ارسال پاسخ به مشتری: طراح متن پاسخ و پیش‌فاکتور را وارد می‌کند و این پیام بلادرنگ در داشبورد مشتری مربوطه درج می‌شود.
  - دکمه تغییر وضعیت پروژه با یک کلیک (در حال بررسی -> تایید -> ارسال پیش‌فاکتور -> در حال ساخت).
  - دسترسی به شماره تماس و دکمه باز کردن چت مستقیم ایتا یا تلگرام با مشتری.

### ۴. همگام‌سازی کامل با پیشخوان بک‌اند وردپرس (`wp-admin`):
- تمام داده‌های تبادل‌شده در جدول پایگاه داده `wp_sedrazavi_inquiries` و جدول پیام‌های متناظر `wp_sedrazavi_messages` ذخیره می‌شود.
- مدیر می‌تواند تمامی این موارد را از طریق منوی `پیشخوان وردپرس > SedRazavi Studio > مدیریت سفارش‌ها` نیز به شکل کامل مشاهده، خروجی اکسل/CSV تهیه و آرشیو کند.

---

## ۱۸.۵. استقلال کامل فنی: بدون نیاز به overedge.dev، ابزارهای واسط یا React

این اکوسیستم به گونه‌ای مهندسی شده که به هیچ ابزار بهینه‌سازی خارجی وابسته نباشد:
1. **سازگاری کامل با هسته PHP و LAMP/LEMP:** پوسته و افزونه روی وردپرس استاندارد (حتی هاست‌های اشتراکی استاندارد مانند هاست دامنه `sedrazavi.gamer.gd`) بدون کوچک‌ترین نیاز به Node.js، SSR خارجی یا پروکسی اجرا می‌شوند.
2. **عناصر معنایی HTML5 و CSS3 خالص:** فایل‌های CSS ماژولار با پیشوند ایزوله `sedrazavi-`، سازگاری کامل با RTL و LTR، متغیرهای استاندارد CSS و ترنزیشن‌های شتاب‌یافته با کارت گرافیک (GPU Accelerated Hardware Transitions) عملکرد عالی (Lighthouse > 90) را بدون فریم‌ورک‌های سنگین تضمین می‌کنند.
3. **المان‌های استاندارد المنتور:** تمامی تمپلیت‌ها با کدهای تمیز و قابلیت Export/Import به فرمت استاندارد المنتور (JSON Templates) ساخته می‌شوند و با هر بروزرسانی المنتور و وردپرس همواره قابل ارتقا و ویرایش خواهند بود.


---

# بخش هفتم (الحاقیهٔ جامع نسخهٔ ۱۹.۰): ممیزی عمیق تعارضات، هاردنینگ امنیتی پورتال‌ها، استانداردهای پلیر موزیک و زنجیرهٔ پرامپت‌های ماژولار Google AI Studio (Sovereign Ecosystem Hardening & Modular Gemini Pipeline v19.0)

> **شناسنامه و هدف این الحاقیه:** رفع تعارضات کارکردی میان ویرایشگر زنده المنتور، پورتال‌های پویا، بوم بازی و لایه صوتی؛ تعیین استانداردهای سخت‌گیرانه امنیت و حریم خصوصی در لاگین و فرم‌ها؛ شفاف‌سازی رفتار چندپلتفرمه پلیر موزیک؛ و تدوین زنجیره پرامپت‌های مرحله‌به‌مرحله و ماژولار متناسب با پنجره توکن و محدودیت‌های پلن رایگان Google AI Studio / Gemini Pro و Flash.

---

## ۱۹.۱. ممیزی تخصصی و حل تعارضات ساختاری میان اجزای فرانت‌اند و المنتور (Deep Conflict Resolution)

برای تضمین اینکه وب‌سایت هم در حالت ویرایش زنده توسط طراح در المنتور و هم در فرانت‌اند برای کاربر نهایی بدون کوچک‌ترین باگ، کندی یا کرش عمل کند، تعارضات زیر شناسایی و استانداردهای حل آن‌ها به پرامپت اجرایی دیکته می‌شود:

### ۱. تعارض رندرهای سنگین Canvas (بازی دایناسور) و Audio Context (پلیر موزیک) با ویرایشگر المنتور:
* **ریشه تعارض:** اجرای لوپ‌های انیمیشن `requestAnimationFrame` در بوم بازی یا لیسنرهای صوتی درون محیط ویرایشگر زنده المنتور (Elementor Editor Iframe) می‌تواند باعث کرش رم مرورگر، تداخل در کلیک‌های ابزارک‌ها و جابجایی کانتینرها شود.
* **راهکار و استاندارد اجرایی:**
  - در تمام ویجت‌های دارای رندر زنده (`SedRazavi_Dino_Game_Widget` و `SedRazavi_Music_Player_Widget`)، تابع شرطی PHP وردپرس بررسی شود:
    `if ( \Elementor\Plugin::$instance->editor->is_edit_mode() )`
  - در حالت ویرایش المنتور: به جای اجرای اسکریپت زنده، یک پیش‌نمایش گرافیکی استاتیک، شیک و سبک (Placeholder Preview) با برچسب نئونی «پیش‌نمایش زنده در فرانت‌اند فعال است» رندر شود تا طراح بتواند ابعاد، رنگ‌ها، متون و فاصله‌ها را با سرعت بالا و بدون تداخل تنظیم کند.
  - اسکریپت‌های بازی و پلیر صوتی منحصراً در فرانت‌اند و پس از بارگذاری کامل ساختار DOM اجرا شوند.

### ۲. تعارض کش صفحات (Page Caching) با وضعیت زنده داشبوردهای فرانت‌اند:
* **ریشه تعارض:** افزونه‌های کشینگ وردپرس (نظیر LiteSpeed Cache یا WP Rocket) ممکن است صفحات پورتال را کش کرده و اطلاعات یک مشتری یا سفارش‌های مدیر را به کاربری دیگر نمایش دهند (نشت حریم خصوصی) یا تغییرات وضعیت سفارش را منعکس نکنند.
* **راهکار و استاندارد اجرایی:**
  - در تمپلیت‌های `page-client-dashboard.php`، `page-designer-cockpit.php` و `page-portal-auth.php`، هدرهای عدم کش به شکل قطعی ارسال شوند:
    `nocache_headers(); define('DONOTCACHEPAGE', true);`
  - کلیه ارتباطات تبادل پیام، تغییر وضعیت و استعلام لیدها از طریق اندپوینت اختصاصی و امن REST API وردپرس (`/wp-json/sedrazavi/v1/inquiries`) با بررسی هدر `X-WP-Nonce` انجام گیرد تا اطلاعات همیشه ۱۰۰٪ زنده و مختص کاربر لاگین‌شده باشد.

### ۳. ایزوله‌سازی استایل‌ها و جلوگیری از شکستن استایل‌های جهانی المنتور:
* **راهکار:** کلیه کلاس‌های اختصاصی پوسته و افزونه با پیشوند محافظت‌شده `sedrazavi-` نام‌گذاری شده و از به‌کاربردن کدهای تخریب‌کننده نظیر `!important` روی المنت‌های عمومی HTML خودداری شود تا المنتور کنترل کامل خود بر رنگ‌ها، فاصله‌ها و تایپوگرافی را حفظ کند.

---

## ۱۹.۲. الزامات سخت‌گیرانه امنیت، احراز هویت و حفاظت از داده‌ها در پورتال‌ها (Enterprise Security Hardening)

امنیت سفارش‌دهندگان و طراح وب‌سایت در بالاترین سطح استانداردهای OWASP برای وردپرس به شرح زیر پیاده‌سازی می‌شود:

### ۱. معماری رمزنگاری و ذخیره‌سازی کلمات عبور:
- عدم استفاده از هرگونه متد رمزنگاری منسوخ یا غیراستاندارد. کلیه رمزهای عبور کاربران مهمان و مشتریان هنگام ثبت فرم با تابع استاندارد هسته وردپرس `wp_hash_password()` و مبتنی بر Saltهای یکتا و تصادفی موجود در `wp-config.php` به صورت هش‌شده ذخیره می‌شوند.
- اعتبارسنجی تطابق کلمه عبور در صفحه ورود با `wp_check_password()` انجام می‌گیرد.
- اعمال سیاست رمز عبور معتبر در فرانت‌اند: حداقل ۸ کاراکتر و ترکیبی از حروف و اعداد، همراه با اعتبارسنجی سمت سرور (Server-side Validation) که مانع از ثبت رمزهای ضعیف و حدس‌زدنی می‌شود.

### ۲. کنترل دسترسی مبتنی بر نقش (Strict Role-Based Access Control - RBAC):
- نقش اختصاصی مشتریان: `sedrazavi_client`. این نقش صرفاً دارای قابلیت `read` بوده و فاقد هرگونه دسترسی به ویرایش برگه‌ها، نصب افزونه، دسترسی به رسانه‌ها یا مدیریت وردپرس است.
- ایزولاسیون کامل بخش مدیریت:
  ```php
  add_action('admin_init', function() {
      if (defined('DOING_AJAX') && DOING_AJAX) return;
      if (current_user_can('sedrazavi_client')) {
          wp_safe_redirect(home_url('/portal/client/'));
          exit;
      }
  });
  add_filter('show_admin_bar', function($show) {
      if (current_user_can('sedrazavi_client')) return false;
      return $show;
  });
  ```
- بررسی سطح دسترسی در تک‌تک ریکوئست‌ها: هر کاربر مشتری فقط و فقط مجاز به خواندن و ارسال پیام روی سفارش‌های متعلق به شناسه کاربری (User ID) خود می‌باشد؛ مشاهده استعلام‌های دیگران به شکل ساختاری ناممکن است.

### ۳. محافظت در برابر حملات بروت‌فورس (Brute-Force Protection & Rate Limiting):
- ثبت تلاش‌های ناموفق ورود به پورتال در حافظه موقت امن با استفاده از Transients API وردپرس (`_transient_sedrazavi_login_attempts_{IP}`).
- در صورت وقوع ۵ تلاش ناموفق پیاپی از یک آدرس IP یا برای یک نام کاربری مشخص، فرم ورود به مدت ۱۵ دقیقه به طور خودکار قفل شده و پیام امنیتی نئونی «تعداد تلاش‌های ناموفق بیش از حد مجاز است. لطفاً ۱۵ دقیقه دیگر تلاش کنید» نمایش داده می‌شود.

### ۴. ضداسپم، حفاظت از جعل درخواست (CSRF) و پالایش داده‌های فرم:
- صدور و بررسی توکن امنیتی Nonce با طول عمر محدود برای هر تراکنش فرم (`wp_create_nonce('sedrazavi_portal_action')` و `check_admin_referer()`).
- تعبیه فیلد تله ربات‌ها (Honeypot): فیلد متنی مخفی که برای انسان نامرئی است اما در صورت پر شدن توسط ربات‌های اسپمر، ارسال فرم بلافاصله لغو و درخواست لاگین/ارسال مسدود می‌شود.
- پاک‌سازی و فراردهی عمیق تمام فیلدهای ورودی:
  - نام، تلفن، نوع سایت: `sanitize_text_field()`
  - متون پیام و پروپوزال: `sanitize_textarea_field()`
  - خروجی‌های HTML در فرانت‌اند و پیشخوان: `esc_html()`، `esc_attr()` و `esc_url()`
  - خروجی فایل‌های CSV از پیشخوان به گونه‌ای پالایش می‌شود که از حملات تزریق فرمول در اکسل (CSV Injection) جلوگیری به عمل آید.

---

## ۱۹.۳. استانداردهای رفتاری و پالیسی پلیر موزیک (Music Streamer Specification & Autoplay Policy)

سکشن موسیقی با رعایت کامل استانداردهای تجربه کاربری، محدودیت‌های مرورگر و پایداری شبکه پیاده‌سازی می‌شود:

### ۱. رعایت سخت‌گیرانه قوانین پخش خودکار مرورگرها (Autoplay Policy Compliance):
- مرورگرهای مدرن (Chrome, Safari, Firefox, Edge) اجازه پخش صدای خودکار بدون تعامل کاربر را مسدود می‌کنند.
- پلیر صوتی SedRazavi تحت هیچ شرایطی به صورت پیش‌فرض با لود صفحه صدا پخش نمی‌کند. اولین پخش منحصراً با تعامل صریح و آگاهانه کاربر (کلیک روی دکمه Play یا انتخاب یک قطعه) آغاز می‌گردد.
- ساخت لایه صوتی Web Audio API پس از دریافت اولین ایونت کاربری فعال‌سازی شده (`AudioContext.resume()`) تا از بروز هرگونه اخطار Unhandled Promise در کنسول مرورگر جلوگیری شود.

### ۲. تفکیک رفتاری در دسکتاپ و موبایل:
- **در دسکتاپ:** پلیر تمام‌عیار افقی با ویژوالایزر امواج نئونی زنده، دکمه‌های کنترل کامل، نوار پیمایش قطعه و کادر جستجوی پیشرفته.
- **در موبایل:** چیدمان فشرده و بهینه‌سازی‌شده برای لمس با انگشت، دکمه‌های بزرگ با فاصله ارگونومیک، و بهینه‌سازی مصرف باتری با توقف انیمیشن‌های سنگین پس‌زمینه ویژوالایزر هنگام قفل بودن صفحه یا غیرفعال بودن تب مرورگر.

### ۳. منبع صوتی منعطف و سناریوی تاب‌آوری در برابر خرابی (Fault Tolerance & Graceful Fallback):
- مدیر در تنظیمات ویجت المنتور می‌تواند منبع صوت را تعیین کند:
  1. آپلود مستقیم فایل‌های MP3 در رسانه وردپرس (پایدارترین و مطمئن‌ترین حالت).
  2. درج لینک‌های مستقیم فایل‌های صوتی خارجی مجاز.
  3. اتصال به فیدهای پادکست استاندارد (RSS Audio Stream).
- **سناریوی قطعی اینترنت یا خرابی منبع صوتی خارجی:**
  - اگر فایل صوتی در دسترس نباشد، خطای ۴۰۴ یا عدم دسترسی سرور رخ دهد، پلیر دچار کرش JS نمی‌شود. یک پیام شکیل نئونی («منبع صوتی موقتاً در دسترس نیست») ظاهر شده و دکمه بازخوانی تعبیه می‌شود.
  - تعبیه یک قطعه موسیقی امبینت لو-فای سبک (Ambient Lo-Fi) با حجم پایین درون بسته دارایی‌های محلی پوسته به عنوان منبع پشتیبان، تا در صورت تمایل مدیر، همیشه یک نوای پیش‌فرض مطمئن آماده پخش باشد.

---

## ۱۹.۴. زنجیرهٔ پرامپت‌های ماژولار متناسب با Google AI Studio و Gemini (Modular Prompt Pipeline for Gemini Free Plan)

به دلیل محدودیت سقف توکن خروجی در هر بار تولید (معمولاً بین ۲,۰۴۸ تا ۴,۰۹۶ توکن خروجی) و برای جلوگیری از خطای کمبود حافظه یا توهم هوش مصنوعی در پلن رایگان Google AI Studio / Gemini، توسعه کل اکوسیستم به **۵ ماژول مهندسی‌شده و زنجیره‌ای** تفکیک می‌شود. هر ماژول خودکفا، متمرکز و مجهز به گاردریل‌های معمارانه است:

```
[ پرامپت ماژول ۱ ] ───> هسته بومی پوسته، استایل‌های نئونی، متغیرهای ۶۶ پالت و تم‌بیلدر المنتور
         │
         ▼
[ پرامپت ماژول ۲ ] ───> افزونه هسته sedrazavi-core، جداول دیتابیس، CPTها و هاردنینگ امنیتی لاگین/فرم‌ها
         │
         ▼
[ پرامپت ماژول ۳ ] ───> ویجت‌های اختصاصی المنتور (کره زمین، بازی دایناسور، پلیر موزیک، ساعت سه‌گانه)
         │
         ▼
[ پرامپت ماژول ۴ ] ───> ۱۲ برگه اختصاصی، قالب‌های تم‌بیلدر المنتور پرو و داشبوردهای فرانت‌اند مشتری/طراح
         │
         ▼
[ پرامپت ماژول ۵ ] ───> پکیجینگ ZIP، تست‌های ماتریسی، راهنمای نصب و دمو ایمپورتر دامنه sedrazavi.gamer.gd
```

---

### گاردریل‌های تکرارشونده و الزامی در سربرگ تمام پرامپت‌های ماژولار (Sovereign Header Guardrails):
در ابتدای ارسال هر یک از ماژول‌ها به Gemini، این بلوک کنترلی باید درج شود تا مانع از انحراف مدل شود:
```markdown
[CORE ARCHITECTURAL INVARIANTS - ZERO DEVIATION PERMITTED]
1. ZERO REACT / ZERO NEXT.JS: Pure native WordPress PHP 8.2+, HTML5, CSS3, Vanilla ES6+ JS only.
2. 100% ELEMENTOR & ELEMENTOR PRO NATIVE: Every layout, page, and widget must be fully customizable inside Elementor Editor.
3. PRODUCTION CODE ONLY: Output complete, fully written files without placeholders like '// TODO' or '// add code here'.
4. STRICT ERROR-FREE COMPLIANCE: Adhere to WordPress Core Coding Standards, sanitization, nonces, and escaping.
```

---

### مشخصات و محتوای تفکیکی ۵ پرامپت ماژولار Gemini:

#### ماژول ۱: زیرساخت بومی پوسته وردپرس، سیستم ۶۶ پالت و تم‌بیلدر المنتور
* **ماموریت ماژول در Gemini:** تولید کامل فایل‌های ریشه پوسته:
  - `style.css`: هدرهای استاندارد وردپرس، تعریف فونت وزیرمتن و JetBrains Mono.
  - `functions.php`: ثبت استایل‌ها، اسکریپت‌ها، لوکیشن‌های رسمی المنتور تم‌بیلدر (`header`, `footer`, `single`, `archive`) و قالب‌های `template-elementor-full-width.php` و `template-elementor-canvas.php`.
  - `header.php` و `footer.php`: ساختار سمانتیک با متغیرهای نئونی و هوک‌های `wp_head()` و `wp_footer()`.
  - `assets/css/palettes.css`: تعریف متغیرهای CSS برای ۳۳ پالت روز و ۳۳ پالت شب.
  - `inc/bilingual-engine.php` و `inc/jdate.php`: موتورهای دوزبانه و تقویم بومی جلالی.

#### ماژول ۲: افزونه هسته `sedrazavi-core`، پایگاه داده، امنیت و پورتال ورود
* **ماموریت ماژول در Gemini:** تولید افزونه با امنیت سطح سازمانی:
  - `sedrazavi-core.php`: لودر افزونه و فعال‌ساز جداول دیتابیس `wp_sedrazavi_inquiries` و `wp_sedrazavi_messages`.
  - `inc/custom-post-types.php`: ثبت CPTهای `portfolio` و `services` سازگار با فیلدهای داینامیک JetEngine.
  - `inc/lead-manager.php`: مدیریت لیدها، صدور کد پیگیری `SR-XXXXX`، اعلان پیشخوان و هش پسورد با `wp_hash_password()`.
  - `inc/auth-guard.php`: ثبت نقش `sedrazavi_client`، هدایت امن به داشبورد فرانت‌اند و سیستم ضد بروت‌فورس با Transient API.

#### ماژول ۳: بسته ویجت‌های اختصاصی و سرگرم‌کننده المنتور
* **ماموریت ماژول در Gemini:** پیاده‌سازی ۴ ویجت اصلی المنتور همراه با ایزوله‌سازی حالت ادیتور المنتور:
  - `widgets/widget-world-globe.php`: کره سه‌بعدی وکتوری ساعت شهرهای جهان با جستجوی شهر (ماژولار و قابل انتقال).
  - `widgets/widget-cyber-dino.php`: بازی دایناسور رنگی کروم با Canvas و Vanilla JS همراه با ذخیره رکورد در LocalStorage.
  - `widgets/widget-music-player.php`: پلیر صوتی نئونی با ویژوالایزر موجی و سازگاری با پالیسی Autoplay.
  - `widgets/widget-chrono-clock.php`: ساعت دیجیتال تهران با تقویم سه‌گانه همزمان (شمسی، میلادی، قمری).

#### ماژول ۴: تمپلیت‌های ۱۲ برگه، تم‌بیلدر المنتور پرو و پورتال فرانت‌اند
* **ماموریت ماژول در Gemini:** تولید ساختار صفحات و رابط کاربری پورتال:
  - فایل‌های برگه: `front-page.php`, `page-about.php`, `page-services.php`, `page-portfolio.php`, `page-contact.php`, `home.php`, `single.php`, `404.php`.
  - فایل‌های داشبورد فرانت‌اند: `page-portal-auth.php`, `page-client-dashboard.php`, `page-designer-cockpit.php`, `page-track-order.php`.
  - استایل‌های CSS شیشه‌ای-نئونی پورتال و اسکریپت‌های تبادل ایجکس امن.

#### ماژول ۵: مستندات، راهنمای نصب و بسته‌بندی نهایی
* **ماموریت ماژول در Gemini:**
  - راهنمای نصب گام‌به‌گام زیپ‌ها روی هاست وردپرس دامنه `sedrazavi.gamer.gd`.
  - فایل `demo-importer.php` برای درون‌ریزی با یک کلیک.
  - چک‌لیست بازرسی نهایی و اعتبارسنجی ۱۸ آزمون استاندارد برای اطمینان از سلامت کامل عملکرد بدون ارور PHP.


---

---

# الحاقیهٔ اجرایی نسخهٔ ۲۰.۰ — استودیوی فرانت‌اند مستقل، همگام‌ساز دوطرفهٔ المنتور، مدیا لودر اختصاصی و جادوگر راه‌اندازی خودکار
> **هدف الحاقیه ۲۰.۰:** رفع کامل وابستگی طراح و مدیر سایت به محیط بک‌اند (`/wp-admin/`)، اتصال بلادرنگ تنظیمات فرانت‌اند به کیت گلوبال المنتور (Active Kit Sync)، مدیریت کامل محتوا (ارسال مطلب، آپلود تصویر شاخص و رسانه) از پیشخوان فرانت‌اند، و تضمین استقرار بی‌دردسر و ۱۰۰٪ کارآمد روی هاست وردپرس با قابلیت درون‌ریزی و راه‌اندازی خودکار ساختار در اولین بوت.

---

## ۲۰.۱. معماری همگام‌سازی دوطرفهٔ فرانت‌اند با تنظیمات گلوبال المنتور (Bi-Directional Elementor Kit Sync)

### ۱. چالش فنی و مهندسی داده‌ها:
در وردپرس، تغییر متغیرهای CSS فرانت‌اند (`:root`) ظاهر قالب را تغییر می‌دهد، اما المنتور تنظیمات رنگ و تایپوگرافی ویجت‌های خود را در پست‌تایپ سیستمی `elementor_library` با متاکی `_elementor_page_settings` ذخیره می‌کند. برای اینکه هر رنگ و فونت انتخابی از داشبورد فرانت‌اند دقیقاً در المنتور و ویجت‌های آن نیز اعمال شود:
* **مکانیسم اکشن بومی:** کلاس `SedRazavi_Elementor_Sync` در افزونه هسته وظیفه دارد با فراخوانی متد `\Elementor\Plugin::$instance->kits_manager->get_active_kit_for_frontend()`، آرایه‌های `system_colors`, `custom_colors`, `system_typography` و `custom_typography` را بروزرسانی کند.
* **بازسازی کش سی‌اس‌اس المنتور:** بلافاصله پس از ذخیره پالت در فرانت‌اند، تابع `\Elementor\Plugin::$instance->files_manager->clear_cache()` اجرا می‌شود تا استایل‌های کانتینرها و ویجت‌های المنتور مجدداً تولید و همگام شوند.
* **کدبیس تزریق CSS پویا:** علاوه بر المنتور، هوک `wp_head` با اولویت ۹۹ استایل‌های درون‌خطی `:root` را بر اساس آخرین پالت انتخابی ذخیره‌شده در `sedrazavi_theme_options` بازتاب می‌دهد تا حتی در صورت خاموش بودن موقت المنتور، ظاهر نئونی سایت بدون نقص بماند.

---

## ۲۰.۲. استودیوی اختصاصی تولید محتوا و رسانه از فرانت‌اند (Front-End Content & Media Cockpit)

### ۱. ویرایشگر محتوای مینیمال نئونی (Distraction-Free Front-End Writer):
* در برگه اختصاصی `/cockpit/` (یا تب «نوشتن مطلب» در پورتال طراح)، یک ادیتور سمانتیک مبتنی بر استاندارد وب پیاده‌سازی می‌شود.
* دسترسی منحصراً محدود به کاربر لاگین‌شده با دسترسی `edit_posts` یا `administrator` (بررسی دقیق با `current_user_can()`).
* فیلدهای ورودی:
  - عنوان نوشته (`post_title`)
  - ویرایشگر متن ساختاریافته (پشتیبانی از تگ‌های `h2`, `h3`, `p`, `blockquote`, `code`, `ul`, `ol`, `link`)
  - چک‌باکس انتخاب دسته‌بندی‌ها و برچسب‌های موجود یا ایجاد آنی دسته‌بندی جدید.
  - متاباکس‌های اختصاصی JetEngine یا فیلدهای سفارشی (مانند لینک دمو، درصد پیشرفت پروژه).
  - کلیدهای کنترلی: «ذخیره به عنوان پیش‌نویس (Draft)» و «انتشار سراسری (Publish)».

### ۲. سیستم آپلود مدیا و تنظیم تصویر شاخص اختصاصی فرانت‌اند:
* **جریان آپلود ایمن (Secure Drag & Drop Uploader):**
  - فرم آپلودر از اندپوینت بومی REST API وردپرس (`/wp/v2/media`) یا اکشن ایجکس اختصاصی `sedrazavi_frontend_media_upload` با بررسی نانس معتبر (`wp_create_nonce('wp_rest')` یا `sedrazavi_upload_nonce`) استفاده می‌کند.
  - اعتبارسنجی فایل با `wp_handle_upload()`: مجاز بودن پسوندهای استاندارد وب (`.jpg`, `.png`, `.webp`, `.svg`)، محدودیت حجم فایل (قابل تنظیم تا ۱۰ مگابایت) و پاک‌سازی نام فایل.
  - فراخوانی `wp_generate_attachment_metadata()` برای ساخت خودکار تمام سایزهای استاندارد و تامبنیل‌های وبلاگ.
  - اتصال خودکار تصویر آپلودشده به عنوان تصویر شاخص پست (`set_post_thumbnail($post_id, $attachment_id)`).

---

## ۲۰.۳. نوار ابزار شناور کنترل سایبری (Floating Cyber-Dock Customizer)

### ۱. رفتار و جایگاه داک شناور:
* فقط برای کاربر مدیر لاگین‌شده نمایش داده می‌شود (عدم بارگذاری حتی ۱ بایت اسکریپت برای کاربران مهمان یا مشتریان عادی).
* جایگزین مدرن و سایبری برای Admin Bar پیش‌فرض وردپرس (نوار سیاه ادمین در فرانت‌اند با `show_admin_bar(false)` خاموش می‌شود و این داک شناور شیشه‌ای-نئونی جایگزین می‌گردد).
* **دکمه‌های اقدام سریع در داک:**
  1. **Color Engine:** دراپ‌داون سریع سوئیچ زنده بین ۶۶ پالت نئونی و ذخیره آنی در دیتابیس بدون رفرش صفحه.
  2. **Font Matrix:** سوئیچ بلادرنگ فونت‌های اصلی و کدنویسی سایت.
  3. **Vector Density:** اسلایدر تنظیم شفافیت و تراکم خطوط وکتوری گره‌چینی / سایبرنتیک.
  4. **Elementor Edit Quick-Link:** دکمه با اکشن مستقیم باز کردن برگه فعلی در ادیتور المنتور (`admin_url('post.php?post=' . get_the_ID() . '&action=elementor')`).
  5. **New Post / Portfolio Modal:** باز کردن پاپ‌آپ سریع نوشتن مطلب یا افزودن نمونه‌کار جدید بدون خروج از صفحه.
  6. **Inquiry Notification Badge:** نمایش تعداد استعلام‌ها و فرم‌های سفارش جدید با نشانگر قرمز نئونی چشمک‌زن.

---

## ۲۰.۴. سیستم خودکار راه‌اندازی و بوت اولیه قالب و افزونه (Zero-Click Auto-Provisioning Engine)

### ۱. حل معضل نصب اولیه روی وردپرس خام:
برای اینکه بلافاصله پس از آپلود و فعال‌سازی فایل زیپ پوسته و افزونه، سایت بدون برگه یا به هم ریخته نباشد:
* کلاس `SedRazavi_Activator` در هنگام فعال‌سازی افزونه هسته اجرا می‌شود:
  1. **ایجاد خودکار ۱۲ برگه اصلی:** چک کردن وجود برگه‌ها بر اساس slug (مانند `home`, `about`, `services`, `portfolio`, `contact`, `blog`, `client-portal`, `cockpit`, `track-order`). در صورت عدم وجود، ایجاد خودکار برگه با قالب اختصاصی تعیین‌شده (`template-elementor-full-width.php`).
  2. **تنظیم صفحه اصلی:** اجرای توابع `update_option('show_on_front', 'page')` و `update_option('page_on_front', $home_page_id)` و `update_option('page_for_posts', $blog_page_id)`.
  3. **ایجاد فهرست‌های ناوبری پیش‌فرض:** ساخت منوی اصلی هدر و مگامنو و پیوند زدن آن به لوکیشن `primary-menu` پوسته.
  4. **تنظیم مقادیر پیش‌فرض ۶۶ پالت و وکتورها:** ثبت پالت دیفالت نئونی شب در جدول گزینه‌های وردپرس.

---

## ۲۰.۵. خلاقیت‌های فناورانهٔ تعبیه‌شده برای کارایی و برندینگ (High-Impact Creative Edge)

### ۱. موتور افکت‌های صوتی وب بدون حجم فایل (Zero-Asset Web Audio API Soundboard):
* استفاده از تراشه سنتز نرم‌افزاری مرورگر (`window.AudioContext`): تولید فرکانس‌های سینوسی و مربعی ملایم برای صدای کلیک دکمه‌ها، سوئیچ پالت و هاورها با حجم فایل صفر (بدون نیاز به لود فایل‌های سنگین MP3).
* دکمه سوئیچ سراسری قطع/وصل صدا (Mute/Unmute) در هدر با ذخیره وضعیت در LocalStorage.

### ۲. وب‌اپلیکیشن پیشرونده (PWA Cyber-Cache Integration):
* ایجاد فایل استاندارد `manifest.json` و رجیستر `service-worker.js` با کش هوشمند دارایی‌های استاتیک، آیکون‌های وکتوری لوگوی SedRazavi و رنگ تم بنفش/فیروزه‌ای (`theme_color: #0F172A`).
* امکان نصب مستقیم سایت با یک کلیک به عنوان اپلیکیشن مستقل بر روی گوشی‌های اندروید/آیفون و دسکتاپ ویندوز/مک.

### ۳. ژنراتور پویای کارت‌های متای سوشال (Dynamic OG & Social Share Cards):
* ساخت خودکار تگ‌های OpenGraph و Twitter Cards برای هر برگه، نمونه‌کار و نوشته همراه با تصویر شاخص و عنوان دو زبانه جهت نمایش حرفه‌ای در تلگرام، ایتا، توییتر و لینکدین.

---

## ۲۰.۶. ارتقای برنامه اجرایی Gemini به ۶ ماژول قطعی

با توجه به افزودن زیرساخت استودیوی فرانت‌اند و درون‌ریز اولیه، زنجیره ماژولار پرامپت‌ها در Google AI Studio به ۶ مرحله ارتقا می‌یابد:
* **ماژول ۱:** ساختار پوسته بومی، استایل‌های ۶۶ پالت، تم‌بیلدر المنتور و داک شناور.
* **ماژول ۲:** افزونه هسته `sedrazavi-core`، پایگاه داده، امنیت، احراز هویت و اکتیویتور راه‌اندازی اولیه (Auto-Provisioning).
* **ماژول ۳:** موتور استودیوی فرانت‌اند (ادیتور ارسال پست و مقالات، آپلودر اختصاصی تصویر شاخص و مدیا، و همگام‌ساز دوطرفه با المنتور کیت).
* **ماژول ۴:** بسته ویجت‌های اختصاصی المنتور (کره زمین، بازی دایناسور، پلیر صوتی، ساعت سه‌گانه و افکت صوتی).
* **ماژول ۵:** تمپلیت‌های ۱۲ برگه، تم‌بیلدر المنتور پرو و پورتال اختصاصی کارفرما و طراح.
* **ماژول ۶:** راهنمای درون‌ریزی، آزمون‌های نهایی، تست REST API فرانت‌اند و بسته‌بندی زیپ نهایی.


---

# الحاقیهٔ اجرایی نسخهٔ ۲۱.۰ — زیرساخت متقارن تنظیمات بک‌اند (CPT & Metaboxes)، مرکز مانیتورینگ تعاملات و قانون قطعی خودکفایی محلی (Zero-CDN & 100% Self-Hosted Assets)

> **هدف الحاقیه ۲۱.۰:** برقراری تقارن کامل ۱۰۰٪ میان پیشخوان فرانت‌اند و پیشخوان مدیریت وردپرس (`/wp-admin/`) از طریق ساختار پست‌تایپ سیستمی تنظیمات و متاباکس‌های بومی، گزارش‌گیری و رهگیری بلادرنگ تعاملات کاربران مهمان و عضو در بک‌اند، و اعمال قانون بنیادین خودکفایی مطلق دارایی‌ها (بارگذاری تمام فونت‌ها، آیکون‌ها، اسکریپت‌ها و استایل‌ها منحصراً از هاست اختصاصی وب‌سایت بدون وابستگی به CDNهای خارجی).

---

## ۲۱.۱. تقارن کامل تنظیمات: پست‌تایپ سیستمی و متاباکس‌های مدیریت در بک‌اند (Symmetric Settings Engine)

### ۱. معماری پست‌تایپ سیستمی تنظیمات (`sedrazavi_config`):
برای اینکه تنظیمات علاوه بر جدول `wp_options` به‌صورت سرفصل‌های ساختاریافته، بازبینی‌پذیر و سازگار با فیلدهای داینامیک JetEngine/ACF در بک‌اند وردپرس نیز در دسترس باشند:
* **ثبت CPT اختصاصی سیستمی:** `sedrazavi_config` (با قابلیت `show_ui => true`, `show_in_menu => 'sedrazavi-studio'`, `supports => array('title')`).
* **مدل همگام‌سازی دوطرفه بلادرنگ (Bi-Directional Event Hook):**
  - هر تغییری در پیشخوان فرانت‌اند (مانند پالت رنگ، فونت، هندل‌های ایتا و تلگرام، یا تراکم وکتور) همزمان در پست مربوطه در `sedrazavi_config` و متاهای آن ذخیره می‌شود.
  - بالعکس، در صورت ویرایش متاباکس‌ها در پیشخوان بک‌اند وردپرس، هوک `save_post_sedrazavi_config` به‌صورت خودکار گزینه‌های سراسری `sedrazavi_theme_options` را بروزرسانی کرده و کیت فعال المنتور (`\Elementor\Plugin::$instance->kits_manager`) و متغیرهای فرانت‌اند را همگام می‌کند.

### ۲. متاباکس‌های جامع در پیشخوان بک‌اند:
صفحه تنظیمات در پیشخوان به ۵ تب متاباکس تفکیک می‌شود:
1. **متاباکس هویت بصری و رنگ:** انتخاب زنده ۳۳ پالت روز و ۳۳ پالت شب، پیش‌نمایش رنگ‌های نئونی، سوئیچ رنگ لهجه (Accent Color).
2. **متاباکس تایپوگرافی و فونت‌های محلی:** انتخاب فونت متون و کدهای برنامه‌نویسی از میان فونت‌های بارگذاری‌شده روی هاست.
3. **متاباکس ارتباطات و شبکه‌های اجتماعی:** ثبت هندل رسمی ایتا (`sedrazavi`)، تلگرام (`sedrazavi`)، شماره تماس، آدرس دفتر و وضعیت آنلاین/آفلاین استودیو.
4. **متاباکس موتور وکتورهای ایرانی-سایبرنتیک:** انتخاب دسته‌بندی وکتور پس‌زمینه (گره‌چینی، شمسه، مقرنس یا سایبرنتیک)، تنظیم ضریب تاری (Blur)، شفافیت (Opacity) و نرخ واکنش به اسکرول.
5. **متاباکس صدا و تعاملات نئونی:** فعال/غیرفعال‌سازی افکت‌های صوتی کلیک، تعیین ولوم پیش‌فرض و تنظیمات لودر اولیه.

---

## ۲۱.۲. مرکز مانیتورینگ جامع تعاملات کاربران مهمان و اعضا در پیشخوان بک‌اند (Unified Interaction Command Center)

### ۱. رهگیری و تفکیک تعاملات کاربران مهمان (Guest Interactions):
* **جدول دیتابیس اختصاصی و منوی مستقل:** منوی فرعی `sedrazavi-inquiries` در پیشخوان بک‌اند وردپرس.
* **ثبت ریز داده‌های کاربران مهمان:**
  - نام و نام خانوادگی، شماره تماس تاییدشده، نوع پروژه درخواستی (لندینگ‌پیج، شرکتی، فروشگاهی، پورتال).
  - پیام‌رسان منتخب کارفرما (ایتا یا تلگرام) همراه با هندل واردشده.
  - نتایج ماشین‌حساب تخمین قیمت و ویژگی‌های فنی علامت‌زده‌شده توسط کاربر.
  - تاریخ و ساعت دقیق ثبت با تقویم جلالی (`jdate`)، آدرس IP پالایش‌شده، کد پیگیری یکتا (`SR-XXXXX`) و وضعیت بررسی (جدید / در حال مذاکره / رد شده / قرارداد).
* **سیستم نوتیفیکیشن فعال بک‌اند:** نشانگر قرمز نئونی در سایدبار وردپرس با شمارنده لیدهای خوانده‌نشده (`sedrazavi_unread_badge`) و اعلان فوری در صفحه داشبورد ادمین.

### ۲. مانیتورینگ و لاگ فعالیت کاربران عضو و کارفرمایان (Client Portal Interactions):
* لاگ تمام تراکنش‌های ثبت‌شده در پورتال فرانت‌اند: زمان آخرین ورود کاربر (`last_login_gmt`)، تاریخچه ارسال پیام‌ها میان کارفرما و طراح، دانلود پیش‌فاکتورها، و تغییر وضعیت سفارش‌ها.
* قابلیت ارسال مستقیم پاسخ از متاباکس بک‌اند به پورتال فرانت‌اند کارفرما (همراه با هوک اعلان زنده).

---

## ۲۱.۳. قانون قطعی خودکفایی مطلق دارایی‌ها و صفر وابستگی خارجی (Zero-CDN & 100% Sovereign Self-Hosted)

### ۱. حذف قطعی و کامل کلیه لینک‌های CDN خارجی:
به منظور کارکرد بدون نقص، سرعت لود صدم‌ثانیه‌ای و مصونیت کامل در برابر فیلترینگ یا قطعی اینترنت بین‌الملل:
* **فونت‌ها (Local Self-Hosted Fonts):**
  - کلیه وزن‌های فونت **وزیرمتن (Vazirmatn)** (فرمت‌های `.woff2` و `.woff`) منحصراً در مسیر `sedrazavi-theme/assets/fonts/vazirmatn/` مستقر می‌شوند.
  - فونت مونو اسپیس نئونی **JetBrains Mono** منحصراً در پوشه `sedrazavi-theme/assets/fonts/jetbrains-mono/` قرار دارد.
  - هیچ درخواستی به `fonts.googleapis.com` یا سرورهای خارجی ارسال نخواهد شد (`@font-face` بومی محلی با `font-display: swap`).
* **آیکون‌ها و المان‌های وکتوری (Pure Local Inline SVG / Local Icon System):**
  - عدم استفاده از CDN خارجی FontAwesome یا کتابخانه‌های آنلاین سنگین.
  - تعبیه فایل پکیج آیکون‌های وکتوری Lucide/Cyber منحصراً در فایل بومی `assets/icons/sedrazavi-icons.svg` یا رندر مستقیم اینلاین SVG با شورت‌کد و هلپرفانکشن بومی `sedrazavi_get_svg_icon($name)`.
* **کتابخانه‌های جاوااسکریپت (Bundled Vendor JS):**
  - اسکریپت رندرینگ کره سه‌بعدی (Three.js مینیمال)، کتابخانه ذرات، و کتابخانه QR Code به صورت فایل‌های مینیفای‌شده و استاندارد در پوشه `assets/js/vendor/` تم و افزونه قرار می‌گیرند و با `wp_enqueue_script()` محلی لود می‌شوند.
* **بدون نیاز به سرویس‌های پردازش تصویر ابری یا سرور شخص ثالث:**
  - پردازش تصاویر، تولید تامبنیل‌ها، کدهای QR و محاسبات صوتی Web Audio همگی با موتورهای درون‌مرورگری و توابع GD/Imagick لوکال هاست وب‌سایت انجام می‌پذیرد.


---

# الحاقیهٔ اجرایی نسخهٔ ۲۲.۰ — لایه سازگاری هیبریدی با CDN و شبکه‌های توزیع محتوا (Smart CDN Compatibility & Edge Cache Resilience)

> **هدف الحاقیه ۲۲.۰:** تضمین عملکرد دوگانه و بی‌نقص قالب و افزونه؛ به‌طوری‌که پیش‌فرض سیستم بر خودکفایی مطلق محلی (Zero-CDN) استوار باشد، اما در صورت تمایل مدیر به فعال‌سازی CDNها (مانند Cloudflare، ابرآروان، دراک، BunnyCDN یا افزونه‌های کش و بازنویسی آدرس رسانه)، کلیه دارایی‌ها، وب‌فونت‌ها، توکن‌های امنیتی و فراخوانی‌های ایجکس بدون تداخل، قفل‌شدگی یا خطای CORS به‌طور کاملاً روان کار کنند.

---

## ۲۲.۱. اصول پنج‌گانه سازگاری استاندارد با CDNهای Asset و Reverse-Proxy

### ۱. حذف آدرس‌های استاتیک و رعایت اصول داینامیک URL در وردپرس:
* عدم هاردکد کردن هیچ‌گونه دامنه یا آدرس مستقیم در کدهای PHP، JS یا CSS.
* فراخوانی کلیه فایل‌ها منحصراً از توابع استاندارد فیلترپذیر هسته وردپرس:
  - `get_template_directory_uri()` برای پوسته اصلی
  - `get_stylesheet_directory_uri()` برای چایلدتم و استایل‌ها
  - `plugins_url()` برای افزونه هسته
* **نتیجه:** هرگاه افزونه‌هایی مانند LiteSpeed Cache، WP Rocket یا CDN Enabler آدرس دارایی‌ها را به زیردامنه CDN (مانند `cdn.sedrazavi.gamer.gd`) بازنویسی (Rewrite) کنند، تمام فایل‌های استایل، اسکریپت و لوگوها بدون شکستگی آدرس از لبه CDN تحویل داده می‌شوند.

### ۲. حفاظت در برابر خطای CORS وب‌فونت‌ها در CDNها (Cross-Origin Font Delivery):
هنگامی که فونت‌ها از هاست فرعی یا آدرس CDN خوانده می‌شوند، مرورگرها به دلیل پالیسی امنیتی SOP آن را مسدود می‌کنند مگر اینکه هدرهای مربوطه تنظیم باشند:
* در افزونه هسته هوک `send_headers` پیاده‌سازی می‌شود که برای تمام پسوندهای فونت محلی (`.woff2`, `.woff`, `.ttf`, `.svg`) هدر استاندارد زیر را ارسال کند:
  `Access-Control-Allow-Origin: *`
* در فایل‌های CSS، آدرس فونت‌ها در `@font-face` به‌صورت نسبی (Relative Path) نسبت به دایرکتوری CSS درج می‌شود (مانند `url('../fonts/vazirmatn/vazirmatn-regular.woff2')`) تا تحت بازنویسی CDN، وابستگی ساختار فایل‌ها از بین نرود.

### ۳. مدیریت انقضای کش و سیستم نسخه‌گذاری هوشمند (Cache-Busting via Versioning):
* تمامی فایل‌های استایل و اسکریپت در تابع `wp_enqueue_style` و `wp_enqueue_script` همراه با متغیر نسخه داینامیک یا ثابت تم (`SEDRAZAVI_VERSION`) ثبت می‌شوند.
* در صورت تغییر و ذخیره پالت رنگی یا فونت از پیشخوان، یک کلید شستشوی کش (Cache-Busting Timestamp) به نسخه فایل‌های تزریق اضافه می‌شود تا لبه CDN فوراً نسخه جدید را دریافت کرده و کاربر با پالت قدیمی مواجه نشود.

### ۴. استثناسازی مسیرهای حساس و توکن‌های نانس از کش لبه CDN (Edge Cache Bypass Rules):
* درخواست‌های پورتال مشتریان (`/client-portal/`)، داشبورد طراح (`/cockpit/`) و اندپوینت‌های REST API و ایجکس با هدرهای صریح ضدکش ارسال می‌شوند:
  `Cache-Control: no-store, no-cache, must-revalidate, max-age=0`
* تنظیم هدر `Pragma: no-cache` تا پروکسی‌های معکوس مانند Cloudflare یا ابرآروان به اشتباه صفحات محرمانه سفارش‌ها، پیام‌های استعلام و توکن‌های ورود را کش نکنند.

### ۵. سوئیچ فعال‌سازی CDN خارجی در تنظیمات بک‌اند (Optional External Asset Provider):
* در متاباکس تنظیمات پیشخوان (`sedrazavi_config`)، یک گزینه اختیاری قرار می‌گیرد: «دامنه سفارشی CDN» (مانند `https://cdn.sedrazavi.gamer.gd`).
* در صورت پر شدن این فیلد، فیلترهای وردپرس آدرس دارایی‌های استاتیک را خودکار به سرور CDN متصل می‌کنند؛ و در صورت خالی بودن، سایت با حداکثر استقلال و به صورت کاملاً لوکال روی هاست اصلی به کار خود ادامه می‌دهد.


---

# الحاقیهٔ اجرایی نسخهٔ ۲۳.۰ — ممیزی قطعی معماری همگام‌سازی دوطرفه (SSOT & Conflict Engine) و ارتقای نهایی سئو، امنیت و حریم خصوصی

> **هدف الحاقیه ۲۳.۰:** رفع کلیه ابهامات و نقاط تداخل در همگام‌سازی تنظیمات، تعیین قطعی منبع حقیقت (Single Source of Truth)، پیاده‌سازی کنترل قفل خوش‌بینانه (Optimistic Concurrency Control)، مکانیزم بازگشت به نسخه سالم (Rollback & Audit Trail)، تکمیل هدرهای سخت‌گیرانه امنیتی، بهینه‌سازی رتبه‌بندی سئوی چندزبانه (JSON-LD & Core Web Vitals) و انطباق کامل با استاندارد حریم خصوصی و امحای داده‌ها (Privacy by Design).

---

## ۲۳.۱. ممیزی معماری همگام‌سازی دوطرفه: منبع حقیقت، مدیریت تداخل و بازیابی خطا

### ۱. تعیین صریح منبع حقیقت (Single Source of Truth - SSOT):
* **مشکل بنیادین در سیستم‌های دوطرفه:** ذخیره موازی در `wp_options` و پست‌تایپ `sedrazavi_config` بدون مشخص بودن مرجع نهایی باعث انشعاب داده‌ها (Split-Brain) در هنگام قطع اتصال می‌شود.
* **راهکار قطعی:**
  - **منبع حقیقت بلامنازع (Authoritative SSOT):** پست منفرد سیستمی در پست‌تایپ `sedrazavi_config` با شناسه اسلاگ ثابت `master-config` و متادیتاهای پیوست آن.
  - **لایه کش کامپایل‌شده (Compiled Read-Cache Layer):** رکورد `sedrazavi_theme_options` در جدول `wp_options` و داده‌های متای کیت فعال المنتور صرفاً به عنوان **کش ثانویه کامپایل‌شده** عمل می‌کنند. تمام توابع فرانت‌اند برای سرعت بالا از این کش می‌خوانند، اما هیچ داده‌ای بدون ثبت ابتدا در CPT مرجع، معتبر شناخته نمی‌شود.

### ۲. حل تداخل و مدیریت ویرایش همزمان (Optimistic Locking & Concurrency Control):
* یک فیلد متای عددی به نام `_config_version` و یک هش امضای محتوا (`_config_hash`) در هر تغییر ذخیره می‌شود.
* هر زمان پیشخوان فرانت‌اند یا متاباکس بک‌اند فرمی را برای ذخیره ارسال می‌کند، شماره نسخه جاری خود را می‌فرستد:
  - اگر `submitted_version === current_version`: تغییرات ثبت شده و شماره نسخه یکی افزایش می‌یابد (`version + 1`).
  - اگر `submitted_version !== current_version`: سیستم تشخیص می‌دهد که همزمان تب دیگری در حال ویرایش بوده است. بلافاصله با کد خطای `HTTP 409 Conflict` پاسخ داده و تغییرات را متوقف می‌کند؛ سپس با برگرداندن داده‌های جدیدترین نسخه، به کاربر اجازه می‌دهد تفاوت‌ها را بررسی و آگاهانه بازنویسی کند.

### ۳. تراکنش‌های اتمیک، ثبت وقایع و بازیابی خودکار خطا (Atomic Transaction & Rollback Engine):
* ذخیره تنظیمات با آغاز تراکنش دیتابیس صورت می‌گیرد:
  1. شروع تراکنش `$wpdb->query('START TRANSACTION')`.
  2. ایجاد اسنپ‌شات از وضعیت پیشین و ذخیره در آرایه تاریخچه ۱۰ نسخه اخیر (`_config_history_snapshots`).
  3. ثبت مقادیر جدید در متای CPT مرجع.
  4. همگام‌سازی و بازنویسی در `wp_options` و کامپایل متغیرهای کیت المنتور (`\Elementor\Plugin::$instance->kits_manager`).
  5. پاک‌سازی کش فایل‌های استایل المنتور (`\Elementor\Plugin::$instance->files_manager->clear_cache()`).
  6. در صورت بروز هرگونه استثنا یا خطای دیتابیس: اجرای آنی `$wpdb->query('ROLLBACK')`، بازیابی خودکار اسنپ‌شات قبلی و ثبت گزارش تفصیلی در جدول لاگ خطاهای سیستم (`sedrazavi_system_logs`).

---

## ۲۳.۲. الزامات تکمیلی و بازبینی‌شدهٔ سئو و پرفورمنس (Sovereign Technical SEO & Web Vitals)

### ۱. معماری کامل متاتگ‌ها و گراف دانش ساختاریافته (JSON-LD Schema Graph):
تعبیه هوک اختصاصی در `wp_head` با اولویت بالا جهت ساخت گراف چندگانه و بدون خطا:
* **Person Schema:** معرفی کامل «سید امیر حسین رضوی فردویی» (SedRazavi) با شغل طراح ارشد وردپرس، آدرس پروفایل‌های ایتا و تلگرام (`@sedrazavi`)، زبان‌ها و حوزه تخصص.
* **ProfessionalService / WebDevelopment Schema:** معرفی خدمات استودیوی دیجیتال، موقعیت جغرافیایی، دامنه خدمات و ساعت کاری آنلاین.
* **WebSite Schema با SearchAction:** تعریف ساختار جستجوی درونی سایت برای ایندکس سریع سرچ‌باکس گوگل.
* **OpenGraph & Twitter Card داینامیک:** تولید خودکار تگ‌های عنوان، توضیحات، آدرس کانونیکال و تصویر شاخص متناسب با هر زبان.

### ۲. سئوی بین‌المللی و تفکیک دوزبانه (Strict Hreflang & Canonical Protocol):
* درج خودکار تگ‌های `hreflang` متقابل برای تمام صفحات:
  - نسخه فارسی: `<link rel="alternate" hreflang="fa-IR" href="..." />`
  - نسخه انگلیسی: `<link rel="alternate" hreflang="en-US" href="..." />`
  - نسخه پیش‌فرض عمومی: `<link rel="alternate" hreflang="x-default" href="..." />`
* آدرس کانونیکال تمیز بدون پارامترهای ردیابی تبلیغاتی یا کوئری‌های زاید.

### ۳. نقشه سایت سبک بومی وردپرس (Zero-Plugin Native XML Sitemap):
* اتصال به فیلترهای رسمی `wp_sitemaps_init` وردپرس برای درج خودکار پست‌تایپ‌های نمونه‌کار (`portfolio`)، خدمات (`services`) و نوشته‌ها با اولویت‌بندی صحیح و فرکانس بروزرسانی مناسب.

### ۴. بهینه‌سازی عمیق شاخص‌های حیاتی وب (Core Web Vitals - LCP / CLS / INP):
* پیشگیری از پرش چیدمان (Zero CLS): تمام تگ‌های لوگو و تصاویر با خصیصه‌های `width` و `height` صریح رندر می‌شوند.
* بارگذاری سریع بزرگ‌ترین محتوا (LCP Boost): اعمال خصیصه `fetchpriority="high"` روی تصویر لوگوی کاراکتر SedRazavi و تصویر اصلی هیرو، و غیرفعال‌سازی Lazy-loading روی اولین تصویر صفحه با `loading="eager"`.
* عدم بلوکه شدن تعاملات (INP Optimization): کدهای جاوااسکریپت پس‌زمینه وکتوری و تقویم به صورت غیرهمگام (`defer`) لود می‌شوند.

---

## ۲۳.۳. هاردنینگ پیشرفته امنیت (Enterprise-Grade Security Hardening)

### ۱. هدرهای سخت‌گیرانه امنیتی HTTP در سطح پوسته و افزونه:
ارسال خودکار هدرهای حفاظتی در لایه PHP از طریق اکشن `send_headers`:
* `X-Content-Type-Options: nosniff`: جلوگیری از حملات جعل نوع فایل (MIME-sniffing).
* `X-Frame-Options: SAMEORIGIN`: محافظت قطعی در برابر کلیک‌جکینگ (Clickjacking).
* `X-XSS-Protection: 1; mode=block`: فعال‌سازی فیلتر بومی ضد اسکریپت‌نویسی متقاطع.
* `Referrer-Policy: strict-origin-when-cross-origin`: جلوگیری از نشت اطلاعات حساس آدرس در ارجاعات خارجی.
* `Permissions-Policy: camera=(), microphone=(), geolocation=()`: مسدودسازی دسترسی‌های غیرضروری سخت‌افزاری مرورگر.

### ۲. ضد بروت‌فورس و محدودکننده نرخ درخواست دو لایه (Dual-Tier Rate Limiting):
* نظارت بر فرم‌های ورود پورتال و فرم استعلام مهمان با Transient API وردپرس:
  - لایه ۱: محدودیت ۵ تلاش در ۵ دقیقه بر اساس IP پالایش‌شده.
  - لایه ۲: مسدودسازی موقت ۱۵ دقیقه‌ای با بازگرداندن وضعیت `HTTP 429 Too Many Requests` در صورت تکرار خطا.

### ۳. چرخه اعتبارسنجی و فراردهی سخت‌گیرانه داده‌ها (Sanitization & Escaping Cycle):
* ورودی‌ها: `sanitize_text_field()`, `sanitize_textarea_field()`, `wp_kses_post()`.
* کوئری‌های مستقیم: استفاده انحصاری از `$wpdb->prepare()` برای پیشگیری از SQL Injection.
* خروجی‌ها: تفکیک دقیق `esc_html()`, `esc_attr()`, `esc_url()` در تمام تمپلیت‌ها و ویجت‌های المنتور.

---

## ۲۳.۴. حریم خصوصی، شفافیت و انطباق با استاندارد امحای داده‌ها (Privacy by Design & Erasure Routine)

### ۱. حذف کامل ردیابی‌های مخفی و بدون کوکی بودن عملیات پایه:
* ذخیره‌سازی وضعیت پالت رنگی (روز/شب)، ولوم افکت‌های صوتی و وضعیت سایدبار منحصراً در `localStorage` مرورگر کاربر (بدون ارسال به سرور و بدون نیاز به بنر آزاردهنده کوکی).
* عدم بارگذاری هیچ اسکریپت ردیاب شخص ثالث خارجی یا ارسال داده به سرورهای تبلیغاتی.

### ۲. انطباق کامل با استاندارد رسمی حریم خصوصی وردپرس (Core Privacy Hooks):
* **برون‌بری داده‌های شخصی:** پیاده‌سازی هوک `wp_privacy_personal_data_exporters` برای استخراج کلیه سوابق پیام‌ها، پروژه‌ها و شماره تماس ثبت‌شده توسط کارفرما در قالب فایل استاندارد.
* **حذف و امحای کامل اطلاعات (Right to Erasure):** پیاده‌سازی هوک `wp_privacy_personal_data_erasers` برای پاک‌سازی بدون بازگشت کلیه سوابق سفارش‌ها، لاگ‌ها و استعلام‌های مربوط به یک شماره تماس یا ایمیل در صورت درخواست کارفرما یا دستور مدیر.


---

# الحاقیهٔ اجرایی نسخهٔ ۲۴.۰ — ممیزی انتقادی ادعاها، اصلاح ناسازگاری‌های PHP/MySQL/المنتور، سناریوهای شکست و پروتکل آزمون‌های پذیرش

> **هدف الحاقیه ۲۴.۰:** شناسایی و اصلاح ادعاهای پرریسک یا ناسازگار با معماری بومی وردپرس و هاست‌های اشتراکی، جایگزینی تراکنش‌های شکننده دیتابیس با الگوی بازگشت امن در سطح اپلیکیشن (Application SAGA & Rollback)، تعریف رفتار و پیام‌های دقیق خطا در هنگام تعارض یا خرابی، و اضافه کردن سناریوهای آزمون‌پذیر عملیاتی برای همگام‌سازی، سئو، امنیت و حریم خصوصی.

---

## ۲۴.۱. بازبینی انتقادی و اصلاح ادعاهای پرریسک نسخه ۲۳

### ۱. اصلاح ادعای تراکنش‌های اتمیک پایگاه‌داده (`START TRANSACTION` / `ROLLBACK`):
* **نقد فنی:** هاست‌های اشتراکی یا پایگاه‌های داده با جداول MyISAM از تراکنش و Rollback در سطح MySQL پشتیبانی نمی‌کنند. همچنین توابع متای وردپرس کش آبجکت درونی را تغییر می‌دهند که با Rollback اس‌کیو‌ال هماهنگ نیست.
* **اصلاح واقعی و پایدار (Application-Level Snapshot & Revert Pattern):**
  - قبل از اجرای هرگونه ذخیره‌سازی، کل رکورد قبلی متادیتا و آپشن در یک فیلد بک‌آپ اضطراری (`_config_preflight_snapshot`) ثبت می‌شود.
  - در صورت بروز هرگونه ارور یا پرتاب استثنا (Exception) در فرآیند همگام‌سازی، تابع بومی `sedrazavi_emergency_revert()` اجرا شده و رکورد قبلی را بازنشانی کرده و کش آبجکت وردپرس را با `wp_cache_delete()` پاک می‌کند.
  - این الگو مستقل از نوع موتور دیتابیس (InnoDB یا MyISAM) است و در ۱۰۰٪ هاست‌های وردپرس کار می‌کند.

### ۲. اصلاح وابستگی سخت به کلاس‌های المنتور (Elementor Fatal Error Prevention):
* **نقد فنی:** صدا زدن مستقیم متدهای `\Elementor\Plugin::$instance` در صورتی که المنتور نصب/فعال نباشد یا در حین بروزرسانی دچار اختلال شود، منجر به مرگ کامل سایت (PHP Fatal Error) می‌گردد.
* **اصلاح واقعی:**
  - تمامی فراخوانی‌های همگام‌سازی با کیت المنتور در یک لایه گارد محافظ با `did_action('elementor/loaded')` و `class_exists('\Elementor\Plugin')` قرار می‌گیرند.
  - در صورت غیاب المنتور، سیستم بدون خطا تنظیمات را در CSS درون‌خطی (`:root`) ذخیره می‌کند و سایت به کار خود ادامه می‌دهد (Graceful Degradation).

### ۳. تفکیک مدیریت تعارض و پیام‌های خطای HTTP 409 در فرانت‌اند و بک‌اند:
* **نقد فنی:** ارسال کد وضعیت HTTP 409 در فرم‌های استاندارد POST پیشخوان مدیریت (`wp-admin`) باعث ایجاد صفحه سفید یا خطای ناشناخته می‌شود.
* **اصلاح واقعی:**
  - در فرانت‌اند و درخواست‌های REST API / AJAX: بازگرداندن وضعیت `HTTP 409 Conflict` همراه با آبجکت JSON شامل داده‌های جدید و پیام خطای انسانی.
  - در فرم‌های پیشخوان بک‌اند وردپرس: ثبت پیام در Transient و نمایش آنی اخطار استاندارد `notice notice-warning is-dismissible` در بالای صفحه ویرایشگر بدون ایجاد شکست در صفحه.

---

## ۲۴.۲. کاتالوگ رفتار دقیق سیستم در سناریوهای شکست، تعارض و خرابی کش

| کد سناریو | رخداد و علت شکست | رفتار قطعی سیستم (Fallback & Recovery) | متن و محل نمایش پیام خطا به کاربر/مدیر |
| :--- | :--- | :--- | :--- |
| **ERR-SYNC-01** | **تعارض همزمانی (Concurrent Conflict):** تلاش همزمان دو تب برای ذخیره پالت با شماره نسخه متفاوت. | متوقف‌سازی فوری فرآیند نوشتن، عدم بازنویسی متادیتا، استخراج آخرین نسخه معتبر از دیتابیس و ارسال تفاوت‌ها به کلاینت. | **فرانت‌اند:** مودال اخطار نئونی: «تداخل ذخیره‌سازی: تنظیمات همزمان در تب دیگری تغییر کرده است. آخرین تغییرات لود شد؛ لطفاً بررسی و مجدداً ذخیره کنید.»<br>**بک‌اند:** کادر زرد هشدار: «تنظیمات اخیراً بروزرسانی شده است؛ صفحه با آخرین مقادیر بازنشانی شد.» |
| **ERR-SYNC-02** | **خطای کامپایل استایل المنتور:** بروز ارور در حین اجرای `clear_cache` یا عدم دسترسی به دیسک. | متوقف‌سازی سینک المنتور، فعال‌سازی استایل داینامیک درون‌خطی (`inline CSS in wp_head`)، ثبت لاگ خطا در `sedrazavi_system_logs`. | **داک فرانت‌اند:** اخطار متنی نارنجی: «پالت در قالب اعمال شد، اما کش فایل‌های المنتور بروزرسانی نشد (عدم دسترسی نوشتن به پوشه uploads).» |
| **ERR-SYNC-03** | **قطعی پایگاه‌داده حین ذخیره (DB Exception):** خطای دیتابیس در ثبت فیلد متای CPT. | فراخوانی آنی `sedrazavi_emergency_revert`، بازنشانی داده‌ها از اسنپ‌شات و پاک‌سازی کش آبجکت وردپرس. | پیام قرمز پاپ‌آپ: «خطای ارتباط با پایگاه‌داده: عملیات ذخیره لغو شد و تنظیمات به وضعیت پایدار پیشین بازگردانده شد. (کد: DB_WRITE_FAIL)» |
| **ERR-MEDIA-01** | **خطای آپلود تصویر فرانت‌اند:** فایل با فرمت غیرمجاز، سایز فراتر از حد مجاز، یا پر بودن هاست. | جلوگیری از ساخت پست ناقص، حذف فایل موقت از دایرکتوری موقت با `@unlink`، پاک‌سازی ورودی فرم. | ارور قرمز زیر باکس آپلودر: «آپلود ناموفق: فرمت فایل مجاز نیست یا حجم آن بیشتر از سقف مجاز است. (فرمت‌های مجاز: JPG, PNG, WebP)» |

---

## ۲۴.۳. معیارهای پذیرش و سناریوهای آزمون اجرایی (Verification & Acceptance Test Protocols)

### ۱. پروتکل آزمون همگام‌سازی دوطرفه و حل تعارض (Test Protocol: Settings & Concurrency):
* **سناریوی آزمون TC-SYNC-01 (ویرایش همزمان):**
  - *پیش‌شرط:* باز کردن برگه تنظیمات در پیشخوان بک‌اند (`sedrazavi_config`) و باز کردن داک فرانت‌اند در یک تب دیگر با حساب مدیر.
  - *روش اجرا:* در فرانت‌اند پالت شماره ۵ شب انتخاب و دکمه ذخیره فشرده شود (نسخه از ۱ به ۲ ارتقا می‌یابد). بلافاصله در تب بک‌اند پالت شماره ۱۰ انتخاب و دکمه «بروزرسانی» کلیک شود.
  - *معیار قبولی:* بک‌اند نباید خطای ۵۰۰ یا صفحه سفید بدهد. سیستم باید اخطار تعارض را نمایش دهد، مقدار پالت ۵ را حفظ کند، و اجازه ندهد پالت ۱۰ بدون رفرش نسخه جدید جایگزین شود.
* **سناریوی آزمون TC-SYNC-02 (تست لغو و بازگشت اضطراری):**
  - *روش اجرا:* تزریق یک استثنای ساختگی (Mock Exception) در میانه اجرای ذخیره متادیتا.
  - *معیار قبولی:* متغیر `wp_options` و متای CPT باید دقیقاً برابر با مقادیر اسنپ‌شات پیش از شروع باشند و هیچ رکورد ناقصی در دیتابیس باقی نماند.

### ۲. پروتکل آزمون سئو فنی و متاتگ‌های دوزبانه (Test Protocol: SEO & Rich Results):
* **سناریوی آزمون TC-SEO-01 (اعتبارسنجی JSON-LD):**
  - *روش اجرا:* بررسی سورس کد صفحه اصلی با ابزار Rich Results Test گوگل یا اسکریپت تستر محلی.
  - *معیار قبولی:* وجود اسکیماهای تفکیک‌شده `Person`, `ProfessionalService` و `WebSite` با سینتکس معتبر، بدون خطای Missing Field، و مطابقت کامل آدرس پروفایل‌های ایتا و تلگرام (`sedrazavi`).
* **سناریوی آزمون TC-SEO-02 (تگ‌های متقابل Hreflang):**
  - *روش اجرا:* ارسال درخواست HTTP GET به صفحه `/` و `/en/` و استخراج تگ‌های هد.
  - *معیار قبولی:* هر دو صفحه باید حاوی دو تگ متقابل `hreflang="fa-IR"` و `hreflang="en-US"` به همراه تگ `x-default` باشند.

### ۳. پروتکل آزمون امنیت و ضد بروت‌فورس (Test Protocol: Security & Rate Limiting):
* **سناریوی آزمون TC-SEC-01 (محدودسازی نرخ تلاش ورود):**
  - *روش اجرا:* ارسال ۶ درخواست ورود ناموفق پیاپی در کمتر از ۲ دقیقه به اندپوینت ورود پورتال.
  - *معیار قبولی:* درخواست ششم باید مسدود شده و کد وضعیت `HTTP 429 Too Many Requests` همراه با پیام هشدار تاخیر موقت بازگردانده شود.
* **سناریوی آزمون TC-SEC-02 (بررسی هدرهای امنیتی):**
  - *روش اجرا:* بررسی هدرهای پاسخ سرور با دستور `curl -I`.
  - *معیار قبولی:* حضور قطعی هدرهای `X-Frame-Options: SAMEORIGIN` و `X-Content-Type-Options: nosniff`.

### ۴. پروتکل آزمون حریم خصوصی و امحای اطلاعات (Test Protocol: Privacy & Right to Erasure):
* **سناریوی آزمون TC-PRIV-01 (امحای کامل داده‌های کارفرما):**
  - *روش اجرا:* ثبت یک استعلام با شماره تماس و ایمیل تستی؛ سپس رفتن به منوی «ابزارها -> پاک‌سازی داده‌های شخصی» در وردپرس و ارسال درخواست حذف برای آن ایمیل.
  - *معیار قبولی:* کلیه رکوردهای مرتبط در جدول `wp_sedrazavi_inquiries` و لاگ‌های پیام باید بدون اثر جانبی پاک شوند و نتیجه در پنل به عنوان ۱۰۰٪ حذف‌شده گزارش شود.


---

# الحاقیهٔ اجرایی نسخهٔ ۲۵.۰ — ممیزی قطعی نهایی و راهنمای جامع فازبندی ۷ مرحله‌ای برای Google AI Studio / Gemini (Free Plan Optimized)

> **هدف الحاقیه ۲۵.۰:** جمع‌بندی جامع و قطعی مانیفست فنی اکوسیستم SedRazavi و شکستن کل پروژه به **۷ پرامپت اجرایی، خودکفا، زنجیره‌ای و متناسب با سقف خروجی توکن پلن رایگان Google AI Studio (زیر ۸,۱۹۲ توکن در هر مرحله)** به‌گونه‌ای که هوش مصنوعی مقصد (Gemini 1.5 Pro / Flash یا Gemini 2.0) بدون فراموشی قوانین معماری، بدون خلاصه‌سازی یا درج کدهای ناقص (`// TODO`)، کدهای کامل، تست‌شده و نصب‌پذیر PHP/CSS/JS را تولید کند.

---

## ۲۵.۱. چک‌لیست نهایی سلامت و یکپارچگی معماری (Final Sovereign Audit Checklist)

قبل از ارسال پرامپت‌ها به Google AI Studio، چک‌لیست زیر اطمینان می‌دهد هیچ تناقضی در کدها وجود ندارد:
1. **قانون Zero-React:** فرانت‌اند ۱۰۰٪ مبتنی بر PHP سمانتیک وردپرس، HTML5، CSS3 استاندارد و Vanilla JS سبک است.
2. **سازگاری کامل با Elementor و Elementor Pro:**
   - ثبت رسمی مکان‌های تم‌بیلدر (`header`, `footer`, `single`, `archive`).
   - ارائه دو قالب اختصاصی `template-elementor-full-width.php` و `template-elementor-canvas.php`.
   - ایزولاسیون کامل ویجت‌ها در ویرایشگر زنده المنتور (`\Elementor\Plugin::$instance->editor->is_edit_mode()`).
3. **خودکفایی کامل دارایی‌ها (Zero-CDN Default):** فونت‌های وزیرمتن و JetBrains Mono درون بسته پوسته قرار دارند و هیچ اتصالی به سرورهای خارجی برقرار نمی‌شود؛ در عین حال مسیرها فیلترپذیرند و در صورت تمایل مدیر با CDNهای Cloudflare/ابرآروان کاملاً سازگارند.
4. **منبع حقیقت و همگام‌سازی دوطرفه:** CPT سیستمی `sedrazavi_config` منبع حقیقت نهایی است و با مکانیزم اسنپ‌شات در لایه اپلیکیشن و قفل خوش‌بینانه (`_config_version`) از تداخل و خرابی دیتابیس جلوگیری می‌کند.
5. **استودیوی کامل فرانت‌اند:** طراح می‌تواند رنگ‌ها، فونت‌ها، نوشته‌ها، نمونه‌کارها و تصاویر شاخص را مستقیماً از فرانت‌اند بدون مراجعه به `/wp-admin/` مدیریت کند.

---

## ۲۵.۲. گاردریل الزامی سربرگ پرامپت‌ها در Google AI Studio (System Prompt Header)

در تنظیمات **System Instructions** یا در سربرگ هر پرامپت ارسالی به Gemini، متن زیر را عیناً کپی کنید:

```text
[SYSTEM INSTRUCTION: STRICT SOVEREIGN WORDPRESS & ELEMENTOR ARCHITECT]
You are a Principal WordPress Core & Elementor Pro Systems Architect.
You must generate 100% production-ready, fully written PHP 8.2+, CSS3, and Vanilla JS code for the SedRazavi Digital Studio ecosystem.
MANDATORY LAWS:
1. ZERO REACT: Never use React, JSX, or external JS build steps. Use pure WordPress native hooks, Semantic HTML, CSS variables, and Vanilla JS.
2. 100% ELEMENTOR & THEME BUILDER NATIVE: Ensure all templates, hooks, and widgets seamlessly integrate with Elementor Pro.
3. NO PLACEHOLDERS: Never output '// TODO', '// write logic here', or truncated code blocks. Every single function, query, loop, and style must be fully implemented.
4. STRICT SECURITY & SANITIZATION: Use sanitize_text_field(), wp_kses_post(), esc_html(), esc_attr(), esc_url(), $wpdb->prepare(), and nonces on all inputs/outputs.
5. ZERO-CDN ASSET COMPLIANCE: Assume all fonts (Vazirmatn, JetBrains Mono) and scripts are loaded locally via get_template_directory_uri() or plugins_url().
6. TOKEN AWARENESS: Stay laser-focused on the exact files requested in this phase to fit within Gemini's 8,192 token output limit without truncation.
```

---

## ۲۵.۳. نقشه راه و مشخصات ۷ پرامپت تفکیک‌شده اجرایی در Gemini

### پرامپت مرحله ۱: زیرساخت پوسته، سیستم ۶۶ پالت و تایپوگرافی محلی
* **ورودی به Gemini:** درخواست تولید فایل‌های پایه استایل و فونت‌ها.
* **فایل‌های تولیدی:**
  1. `sedrazavi-theme/style.css`: هدر رسمی پوسته، متغیرهای پایه و ایمپورت فونت‌ها.
  2. `sedrazavi-theme/assets/css/palettes.css`: تعریف متغیرهای ۶۶ پالت رنگی (۳۳ روز و ۳۳ شب) به صورت متغیرهای `:root` و کلاس‌های تم.
  3. `sedrazavi-theme/assets/css/main.css`: استایل‌های ریست، داک شیشه‌ای، چیدمان RTL و انیمیشن‌های نئونی سبک.
* **برآورد توکن خروجی:** ~۳,۵۰۰ توکن.

### پرامپت مرحله ۲: موتور هسته پوسته، سربرگ، پابرگ و تم‌بیلدر المنتور
* **ورودی به Gemini:** درخواست تولید ساختار هماهنگ پوسته با تم‌بیلدر.
* **فایل‌های تولیدی:**
  1. `sedrazavi-theme/functions.php`: ثبت استایل‌ها، اسکریپت‌ها، منوها، ویژگی‌های پوسته (`title-tag`, `post-thumbnails`) و انکیو محلی فونت‌ها.
  2. `sedrazavi-theme/inc/elementor-support.php`: ثبت لوکیشن‌های تم‌بیلدر المنتور (`header`, `footer`, `single`, `archive`) و متدهای تزریق هدر و فوتر.
  3. `sedrazavi-theme/header.php` و `sedrazavi-theme/footer.php`: ساختار سمانتیک با فراخوانی هوک‌های استاندارد وردپرس و المنتور.
  4. `sedrazavi-theme/template-elementor-full-width.php` و `sedrazavi-theme/template-elementor-canvas.php`.
* **برآورد توکن خروجی:** ~۴,۲۰۰ توکن.

### پرامپت مرحله ۳: افزونه هسته `sedrazavi-core`، راه‌اندازی خودکار و پایگاه‌داده
* **ورودی به Gemini:** درخواست ساختار افزونه، ایجاد جداول و ساخت خودکار برگه‌ها در اولین نصب.
* **فایل‌های تولیدی:**
  1. `sedrazavi-core/sedrazavi-core.php`: فایل اصلی افزونه با تعاریف ثابت‌ها و هوک‌های فعال‌سازی.
  2. `sedrazavi-core/inc/database-installer.php`: ایجاد جداول اختصاصی `wp_sedrazavi_inquiries` و `wp_sedrazavi_messages`.
  3. `sedrazavi-core/inc/auto-provisioning.php`: ساخت خودکار ۱۲ برگه، تنظیم صفحه اصلی و فهرست پیش‌فرض در اولین بوت بدون ارور.
  4. `sedrazavi-core/inc/custom-post-types.php`: ثبت CPTهای `portfolio`, `services` و CPT سیستمی تنظیمات `sedrazavi_config`.
* **برآورد توکن خروجی:** ~۴,۵۰۰ توکن.

### پرامپت مرحله ۴: موتور همگام‌سازی دوطرفه، قفل خوش‌بینانه و متاباکس‌های بک‌اند
* **ورودی به Gemini:** درخواست کلاس همگام‌ساز منبع حقیقت (SSOT)، مکانیزم Revert اضطراری و متاباکس‌های بک‌اند.
* **فایل‌های تولیدی:**
  1. `sedrazavi-core/inc/settings-sync.php`: کلاس `SedRazavi_Settings_Sync` با الگوی اسنپ‌شات و ریورت در صورت خطا، کنترل تداخل `_config_version` و همگام‌سازی ایمن با کیت فعال المنتور.
  2. `sedrazavi-core/inc/admin-metaboxes.php`: پیاده‌سازی ۵ تب متاباکس تنظیمات رنگ، فونت، هندل‌های پیام‌رسان، وکتور و صدا در پیشخوان `/wp-admin/`.
* **برآورد توکن خروجی:** ~۴,۸۰۰ توکن.

### پرامپت مرحله ۵: استودیوی فرانت‌اند، انتشار نوشته و مدیا لودر اختصاصی
* **ورودی به Gemini:** درخواست اسکریپت‌ها و اندپوینت‌های انتشار مطلب و آپلود عکس از فرانت‌اند بدون نیاز به پیشخوان.
* **فایل‌های تولیدی:**
  1. `sedrazavi-core/inc/frontend-publisher.php`: هندلر ایجکس و REST API با متدهای `wp_insert_post`, `wp_handle_upload` و `set_post_thumbnail` به همراه اعتبارسنجی نانس و `current_user_can('edit_posts')`.
  2. `sedrazavi-core/inc/lead-manager.php`: پردازش فرم‌های استعلام، ماشین‌حساب قیمت، تولید کد `SR-XXXXX` و شمارنده نوتیفیکیشن در منوی ادمین.
* **برآورد توکن خروجی:** ~۴,۱۰۰ توکن.

### پرامپت مرحله ۶: بسته ۴ ویجت اختصاصی و ایمن المنتور
* **ورودی به Gemini:** درخواست کد ۴ ویجت بومی سازگار با المنتور همراه با ایزولاسیون کامل ادیتور.
* **فایل‌های تولیدی:**
  1. `sedrazavi-core/widgets/widget-world-globe.php`: کره زمین سه‌بعدی و ساعت شهرهای جهان (با متد پیش‌نمایش ساده در حالت ادیتور المنتور).
  2. `sedrazavi-core/widgets/widget-cyber-dino.php`: بازی دونده دایناسور رنگی با HTML5 Canvas و LocalStorage.
  3. `sedrazavi-core/widgets/widget-audio-player.php`: موتور صوتی Web Audio API بدون حجم فایل و استریمر صوتی.
  4. `sedrazavi-core/widgets/widget-tri-calendar.php`: ساعت دیجیتال و تقویم سه‌گانه (شمسی `jdate`، میلادی و قمری).
* **برآورد توکن خروجی:** ~۵,۲۰۰ توکن.

### پرامپت مرحله ۷: تمپلیت‌های اصلی، داک شناور نئونی، تست و فایل فشرده
* **ورودی به Gemini:** درخواست فایل‌های تمپلیت برگه و قالب داک شناور.
* **فایل‌های تولیدی:**
  1. `sedrazavi-theme/front-page.php`: صفحه اصلی لندینگ‌پیج با هوک‌های کانتینر المنتور.
  2. `sedrazavi-theme/page-cockpit.php`: داشبورد فرانت‌اند طراح (استودیوی مدیریت رنگ، انتشار مطلب و مشاهده استعلام‌ها).
  3. `sedrazavi-theme/template-parts/floating-cyber-dock.php`: نوار ابزار شناور مدیر در فرانت‌اند با سوئیچ سریع پالت‌ها و اکشن ویرایش با المنتور.
  4. راهنمای نصب نهایی: نحوه زیپ کردن دو پوشه `sedrazavi-theme` و `sedrazavi-core` و آپلود روی وردپرس دامنه `sedrazavi.gamer.gd`.
* **برآورد توکن خروجی:** ~۴,۶۰۰ توکن.
