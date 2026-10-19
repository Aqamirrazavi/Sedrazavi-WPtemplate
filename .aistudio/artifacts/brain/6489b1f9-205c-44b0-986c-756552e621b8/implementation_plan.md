# نقشه جامع مهندسی و ارتقای معماری SedRazavi OS 6.0 (Enterprise Multi-Niche Suite)

این سند جامع مهندسی، نقشه راه پیاده‌سازی تحول ساختاری اکوسیستم قالب و افزونه وردپرس را با هدف تبدیل پروژه به یک **سیستم‌عامل طراحی وب چندمنظوره (WordPress Designer OS)** مستقل از صنف حقوقی، امن در لایه REST/AJAX، سبک و با نمره سرعت بالای ۹۰ تبیین می‌نماید.

---

### ۱. تصمیمات کلیدی و توافقات راهبردی (Strategic Decisions & Alignment)

> [!IMPORTANT]
> با توجه به پاسخ کاربر و اختیارات کامل فنی واگذار شده، هر سه محور زیر در اولویت اجرای همزمان قرار می‌گیرند:
> 1. **خنثی‌سازی کامل پوسته والد (Parent Neutralization):** تمام اطلاعات هویت، پروانه و ترازوی وکالت از هسته پوسته (`header.php`, `footer.php`, `front-page.php`) پاک شده و به صورت داینامیک از Customizer و چایلدتم حقوقی تغذیه می‌شود.
> 2. **بهینه‌سازی حداکثری سرعت (Asset Conditional Loading):** باندل سنگین ۱.۱ مگابایتی React از فرانت عمومی حذف شده و صرفاً به صورت شرطی در برگه‌های دارای شورتکد تعاملی یا پیشخوان مدیریت لود می‌شود تا حجم صفحات لندینگ به زیر ۱۲۰ کیلوبایت برسد.
> 3. **ویجت‌های بومی المنتور (Native Elementor Controls):** تمامی ویجت‌ها مجهز به تب استایل کامل (Typography, Color, Spacing, Border, Shadow) می‌شوند تا طراح بتواند بدون کدنویسی ظاهر هر ویجت را سفارشی‌سازی کند.

---

### ۲. معماری ماژولار ۴ سطحی اکوسیستم

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SEDRAZAVI OS 6.0 MODULAR ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  1. Agnostic Core Parent Theme (wordpress-theme/)                           │
│     ├── header.php (منوی داینامیک + the_custom_logo + نوار اعلان دلخواه)   │
│     ├── footer.php (سایدبارهای ابزارک پویا + کپی‌رایت نام سایت)              │
│     ├── front-page.php (لود هوشمند تمپلت‌ پارت بر اساس آرکیتایپ فعال)      │
│     └── template-parts/                                                     │
│         ├── front-agency.php    (لندینگ آژانسی، بنتو گرید، فرم محاسبه پروژه)│
│         ├── front-store.php     (ویترین ووکامرس، بنرها، تسویه حساب شتاب)    │
│         ├── front-corporate.php (هلدینگ بین‌الملل، آمارها، استانداردهای ESG)│
│         └── front-legal.php     (اتوماسیون وکالت، پیگیری پرونده و داوری)    │
├─────────────────────────────────────────────────────────────────────────────┤
│  2. Companion & Architecture Engine (sedrazavi-companion/)                  │
│     ├── class-demo-importer.php         (درون‌ریز واقعی با AJAX و ساخت صفحات)│
│     ├── class-design-tokens.php         (متغیرهای CSS + همگام‌ساز المنتور)    │
│     ├── class-sms-gateway-adapter.php   (پشتیبانی Digits + IPPanel/کاوهنگار)│
│     ├── class-email-engine.php          (ایمیل تراکنشی با دامنه داینامیک)   │
│     └── class-admin-dashboard.php       (پیشخوان مدرن ۵ زبانه و سبک)         │
├─────────────────────────────────────────────────────────────────────────────┤
│  3. Universal Elementor Suite (elementor-addon-suite/)                      │
│     ├── ۲۲ ویجت با کنترل کامل Content و Style (Typography, Padding, Border) │
│     └── کاتالوگ ۹ هدر، ۹ هیرو و ۹ فوتر استاندارد                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  4. Specialized Child Themes (child-themes/)                                │
│     ├── agency-designer / corporate-pro / store-modern / legal-firm         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### ۳. فازهای اجرایی گام‌به‌گام (Step-by-Step Task Breakdown)

#### فاز ۱: خنثی‌سازی کامل پوسته مادر و رفع گلوگاه‌های هاردکد (Parent Sanitization)
1. **بازنویسی `wordpress-theme/header.php`:**
   - حذف تمام متون و شماره پروانه هاردکد وکالت («۱۸۴۵۲ / ک.و.م»، آیکون ترازوی عدالت، شماره ثابت «۰۲۱-۸۸۹۹۰۰۱۱»).
   - اتصال به `get_theme_mod('sedrazavi_header_phone')`، `get_theme_mod('sedrazavi_show_topbar')` و `the_custom_logo()`.
   - ایجاد فال‌بک نام برند با `get_bloginfo('name')`.
2. **بازنویسی `wordpress-theme/footer.php`:**
   - حذف نام و بیوگرافی ثابت دکتر سیده مریم رضوی.
   - ثبت ۳ ناحیه ابزارک پویا (`dynamic_sidebar`) با فال‌بک‌های سازمانی، خدمات و تماس.
   - کپی‌رایت پویا: `© [سال جاری] [نام سایت]. تمامی حقوق محفوظ است.`.
3. **بازنویسی `wordpress-theme/front-page.php`:**
   - تشخیص صنف فعال از تنظیمات `get_option('sedrazavi_active_archetype', 'agency-designer')`.
   - فراخوانی فایل متناظر از `template-parts/front-{archetype}.php` یا رندر `the_content()` در صورت استفاده از المنتور.

#### فاز ۲: ساخت قالب‌های صفحه نخست در `wordpress-theme/template-parts/`
1. **`template-parts/front-agency.php`:**
   - هیروی آژانسی گلس‌مورفیسم، بنتو گرید خدمات طراحی وب و سئو، فرم سفارش پروژه.
2. **`template-parts/front-store.php`:**
   - ویترین ووکامرس، اسلایدر محصولات تخفیف‌دار، دکمه‌های خرید سریع و بج‌های اعتماد (اینماد و ضمانت).
3. **`template-parts/front-corporate.php`:**
   - لندینگ شرکتی چندستونه، کانتر آمارهای موفقیت هلدینگ و معرفی راهکارها.
4. **`template-parts/front-legal.php`:**
   - انتقال تمیز و ایزوله ماژول‌های وکالت، محاسبه‌گر تمبر و پیگیری پرونده به این فایل.

#### فاز ۳: امن‌سازی زیرساخت REST API و AJAX (Zero-Trust Security)
1. بررسی و اصلاح تمام اندپوینتهای REST در `sedrazavi-companion` و `sedrazavi-addons`:
   - جایگزینی `permission_callback => '__return_true'` در اندپوینتهای تغییر دهنده وضعیت با `current_user_can('manage_options')` یا کنترل توکن.
2. امن‌سازی تمامی درخواست‌های AJAX فرم‌ها و گزارش‌ها با `check_ajax_referer('sedrazavi_nonce', 'nonce')`.
3. اعمال ریت‌لیمیتینگ روی تمامی اندپوینتهای عمومی ثبت فرم و پیامک.

#### فاز ۴: توانمندسازی سامانه درون‌ریز دمو (`class-demo-importer.php`)
1. حذف `alert(...)` در پیشخوان ادمین و جایگزینی با فرآیند واقعی ناهمگام (AJAX/Fetch) به `/wp-json/sedrazavi/v1/demo/import`.
2. ساخت خودکار برگه‌های استاندارد (صفحه اصلی، تماس، خدمات، فروشگاه یا دوره‌ها).
3. ساخت و انتساب فهرست ناوبری (`nav_menu`) و تنظیم صفحه نخست (`page_on_front`).
4. نمایش پروگرس‌بار زنده و لاگ ترمینال برای کاربر در پیشخوان وردپرس.

#### فاز ۵: موتور دیزاین توکن‌ها و همگام‌ساز پالت‌ها (`class-design-tokens.php`)
1. تعریف متغیرهای ریشه‌ای CSS:
   `--sr-primary`, `--sr-secondary`, `--sr-accent`, `--sr-surface`, `--sr-bg`, `--sr-text`, `--sr-border`.
2. هوک به `wp_theme_json_data_theme` برای تزریق لحظه‌ای پالت‌ها به ویرایشگر گوتنبرگ.
3. هوک به `elementor/kits_manager` برای همگام‌سازی رنگ‌های سیستم المنتور (`system_colors`).
4. اتصال پس‌زمینه‌های وکتور SVG به متغیرهای CSS به جای کدهای رنگی هاردکد.

#### فاز ۶: آداپتور پیامک ایرانی و ایمیل‌های تراکنشی پویا
1. **`class-sms-gateway-adapter.php`:**
   - بررسی وجود افزونه Digits و ارجاع ورود به Digits در صورت فعال بودن.
   - پشتیبانی از وب‌سرویس پترن و خدماتی IPPanel (فراز اس‌ام‌اس، لیمو، مکث) و کاوهنگار.
2. **`class-email-engine.php`:**
   - استخراج خودکار دامنه از `home_url()` برای `wp_mail_from` (مانند `noreply@domain.com`).
   - تنظیم نام فرستنده با `get_bloginfo('name')`.
   - قالب HTML راست‌چین و مدرن برای کد ورود، بازیابی کلمه عبور و نوتیفیکیشن‌ها.

#### فاز ۷: ارتقای ویجت‌های المنتور به سطح Native (Style Controls)
1. تجهیز ویجت‌های `uas_download_box`, `uas_spotplayer_course`, `uas_vip_pricing`, `uas_news_ticker`, `uas_client_portal`:
   - افزودن تب `TAB_STYLE` المنتور با کنترلهای:
     * `Group_Control_Typography`
     * `Color` (Primary, Secondary, Background)
     * `Slider` (Padding, Margin, Gap)
     * `Group_Control_Border` و `Border_Radius`
     * `Group_Control_Box_Shadow`

#### فاز ۸: شرطی‌سازی هوشمند دارایی‌ها (Asset Conditional Loading)
1. بررسی حضور شورتکد یا بلاک در `wordpress-theme/functions.php` قبل از `wp_enqueue_script` باندل React (`app-dist/index.js`).
2. لود نشدن فایل‌های سنگین ری‌اکت در صفحات ساده و استاتیک جهت حفظ TTFB عالی و امتیاز ۹۰+ سئو.

#### فاز ۹: اعتبارسنجی، تست‌های خودکار و بسته‌بندی گیت‌هاب اکشنز
1. اجرای `bun install` و `bun run lint`.
2. اجرای سوئیت کامل تست‌ها: `npm run test:all`.
3. بیلد نهایی دارایی‌ها با `bun run build`.
4. اعتبارسنجی تولید ۵ فایل ZIP در ورک‌فلو گیت‌هاب اکشنز.
