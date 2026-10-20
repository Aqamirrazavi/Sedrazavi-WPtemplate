# سند جامع معماری، چرخه نقد تخصصی و مشخصات اجرایی SedRazavi OS (v16.0 Omniscient Enterprise Blueprint)

**نسخه:** 8.0 – آماده بازبینی و اعمال به مخزن  
**مرجع بررسی:** مخزن `Aqamirrazavi/Sedrazavi-WPtemplate`  
**وضعیت:** طرح پالایش‌شده، نقد فنی چندتخصصی و کدهای حل مسئله

---

## ۱. گزارش چرخه نقد چندجانبه (Expert Review & Refinement Cycle)

برای بررسی ریشه‌ای گلایه‌های ثبت‌شده و جلوگیری از نقدهای تکراری، پروژه توسط ۵ نقش تخصصی بررسی و نقد شد:

### الف) نقد مهندس ارشد هسته وردپرس و توسعه المنتور (WordPress Core & Elementor Lead)
* **نقد وارد شده:** ایمپورتر دمو در نسخه‌ی قبل، برگه را با متن ساده و یک شورتکد ساختگی `[react_component name="multi-niche-showcase"]` می‌ساخت. کاربر وقتی دکمه «ویرایش با المنتور» را می‌زد، المنتور هیچ سکشن یا کانتینری نمی‌دید، بلکه یک بلوک متنی می‌دید. به همین دلیل هیچ المانی با کشیدن و رها کردن قابل جابجایی یا استایل‌دهی نبود.
* **راهکار بی‌پاسخ و قطعی:** 
  1. متادیتاهای بومی المنتور (`_elementor_edit_mode = 'builder'`، `_elementor_template_type = 'wp-page'` و `_wp_page_template = 'elementor_header_footer'`) مستقیماً به هنگام ایجاد برگه ثبت شوند.
  2. کانتنت اصلی قالب‌های JSON المنتور مستقیماً در فیلد متای `_elementor_data` به صورت JSON کدگذاری‌شده ذخیره شوند.
  3. کش فایل‌های CSS المنتور پاکسازی و متادیتاهای المنتور برای برگه تازه ساخته‌شده مجدداً بازسازی (`generate_css`) شوند.

### ب) نقد معمار تجربه کاربری و پیشخوان وردپرس (UI/UX & Admin Architect)
* **نقد وارد شده:** ارسال فرم‌ها اعلانی در پیشخوان ثبت نمی‌کرد. طراح نمی‌دانست چه کسی فرم پر کرده، آیا پیامک رفته، و آیا رکوردی ثبت شده است یا خیر. علاوه بر این، child themeها فقط یک فایل `style.css` با ۲ متغیر رنگی بودند و برگه‌های اختصاصی اصناف را نداشتند.
* **راهکار بی‌پاسخ و قطعی:**
  1. پیاده‌سازی جدول اختصاصی دیتابیس یا پست‌تایپ سیستمی `sr_notification` برای ثبت هر تراکنش، فرم رزرو، لید و خرید.
  2. طراحی هاب زنگوله نوتیفیکیشن (`SedRazavi Admin Notification Center`) در بالای ادمین‌بار وردپرس با نشانگر تعداد خوانده‌نشده (Unread Counter Badge) و منوی کشویی گرافیکی با AJAX Polling / Heartbeat.
  3. برای هر Child Theme، فایل‌های تمپلیت اختصاصی مثل `page-agency.php`، `single-case-study.php`، `archive-portfolio.php` و متغیرهای بصری منحصربه‌فرد مستقر شوند.

### ج) نقد مهندس ارشد امنیت و یکپارچگی داده‌ها (Security & Systems Engineer)
* **نقد وارد شده:** اگر المنتور روی سایت نصب یا فعال نباشد و کاربر دمو را ایمپورت کند، خطای مرگبار یا برگه‌های سفید بدون خروجی ایجاد می‌شود. در ضمن ایمپورت نباید فایل‌های تکراری بسازد.
* **راهکار بی‌پاسخ و قطعی:**
  1. ساختار Fallback هوشمند: اگر المنتور فعال باشد، به `_elementor_data` وارد می‌شود؛ اگر المنتور فعال نباشد، محتوای گوتنبرگ با الگوهای استاندارد وردپرس (`<!-- wp:group -->`) رندر می‌شود.
  2. چک تکرارپذیری بر اساس شناسه تمپلیت، بدون حذف برگه‌های اختصاصی که کاربر قبلاً روی آن‌ها کار کرده است.

### د) نقد مدیر فرآیند توزیع و GitHub Actions CI/CD (DevOps & Release Architect)
* **نقد وارد شده:** ورک‌فلو صدها فایل را در قالب یک زیپ غول‌پیکر تودرتو تولید می‌کرد که در وردپرس خطای «پوشه فاقد پوسته معتبر است» یا «بسته نصب نشد» می‌داد.
* **راهکار بی‌پاسخ و قطعی:**
  تفکیک دقیق ۴ آرتیفکت مجزا در GitHub Actions بدون تداخل:
  1. `sedrazavi-theme.zip` (پوسته والد مستقل)
  2. `sedrazavi-companion.zip` (افزونه هسته با ایمپورتر، نوتیفیکیشن سنتر، و اتصال‌ها)
  3. `sedrazavi-addons.zip` (افزونه اختصاصی ویجت‌ها و پست‌تایپ‌ها)
  4. پوشه `child-themes/` به صورت زیپ‌های تک‌تک برای هر صنف (`child-agency.zip`, `child-legal.zip`, ...)

---

## ۲. کد اجرایی ایمپورتر بومی المنتور (Native Elementor Importer Engine)

این قطعه کد باید در فایل `sedrazavi-companion/includes/class-demo-importer.php` جایگزین متد ساخت برگه شود تا فایل‌های JSON قالب‌ها مستقیماً به المنتور تزریق شوند:

```php
/**
 * ایجاد برگه با محتوای بومی المنتور
 *
 * @param string $page_title عنوان برگه
 * @param string $template_slug نام فایل قالب JSON در پوشه templates
 * @return int شناسه برگه ایجاد شده
 */
private function create_native_elementor_page($page_title, $template_slug = '') {
    // مسیر جستجوی قالب JSON در افزونه‌های همراه و اددان
    $json_paths = [
        WP_PLUGIN_DIR . '/elementor-addon-suite/templates/' . $template_slug . '.json',
        WP_PLUGIN_DIR . '/sedrazavi-companion/templates/' . $template_slug . '.json',
        get_template_directory() . '/templates/' . $template_slug . '.json'
    ];

    $elementor_data = null;
    foreach ($json_paths as $path) {
        if (file_exists($path)) {
            $raw_json = file_get_contents($path);
            $decoded = json_decode($raw_json, true);
            if (isset($decoded['content']) && is_array($decoded['content'])) {
                // اگر فایل خروجی استاندارد تمپلیت المنتور است
                $elementor_data = wp_slash(wp_json_encode($decoded['content']));
            } elseif (is_array($decoded)) {
                $elementor_data = wp_slash(wp_json_encode($decoded));
            }
            break;
        }
    }

    // ایجاد پست در دیتابیس وردپرس
    $page_id = wp_insert_post([
        'post_title'   => wp_strip_all_tags($page_title),
        'post_content' => '', // المنتور محتوا را از دیتای متادیتا رندر می‌کند
        'post_status'  => 'publish',
        'post_type'    => 'page',
    ]);

    if (!is_wp_error($page_id) && $page_id > 0) {
        // فعال‌سازی حالت ویرایش المنتور برای این برگه
        update_post_meta($page_id, '_elementor_edit_mode', 'builder');
        update_post_meta($page_id, '_elementor_template_type', 'wp-page');
        update_post_meta($page_id, '_elementor_version', '3.20.0');
        update_post_meta($page_id, '_wp_page_template', 'elementor_header_footer');

        // تزریق ساختار کانتینرها، سکشن‌ها و ستون‌های بومی
        if (!empty($elementor_data)) {
            update_post_meta($page_id, '_elementor_data', $elementor_data);
        }

        // پاکسازی کش المنتور در صورت فعال بودن
        if (class_exists('\Elementor\Plugin')) {
            \Elementor\Plugin::$instance->files_manager->clear_cache();
        }
    }

    return $page_id;
}
```

---

## ۳. سیستم اعلان‌های گرافیکی پیشخوان و فرانت‌اند (Notification Hub)

برای حل مشکل بی‌پاسخ ماندن فرم‌ها و نبود علامت اعلان:

### ساختار دیتابیس اعلان‌ها (`sr_notifications`)
هر بار که فرم تماس، محاسبه‌گر یا درخواست رزرواسیون ارسال شود:
1. داده در جدول امن ثبت می‌شود.
2. فیلد `is_read = 0` قرار می‌گیرد.
3. در ادمین بار وردپرس یک بج قرمز رنگ چشمک‌زن با شماره‌ی تعداد اعلان‌های جدید اضافه می‌شود.

```php
// افزودن زنگوله اعلان به ادمین بار وردپرس
add_action('admin_bar_menu', function($wp_admin_bar) {
    if (!current_user_can('manage_options')) return;

    $unread_count = SedRazavi_Notifications::get_unread_count();
    $badge = $unread_count > 0 ? " <span class='update-plugins count-{$unread_count}'><span class='plugin-count'>{$unread_count}</span></span>" : '';

    $wp_admin_bar->add_node([
        'id'    => 'sedrazavi-notifications',
        'title' => '<span class="ab-icon dashicons-bell" style="top:2px;"></span> پیشخوان اعلان‌ها' . $badge,
        'href'  => admin_url('admin.php?page=sedrazavi-notifications'),
        'meta'  => ['class' => 'sr-admin-bar-notify']
    ]);
}, 99);
```

---

## ۴. ساختار اختصاصی Child Themeها برای هر صنف

هر چایلدتم باید شامل این پرونده‌های واقعی باشد تا فقط یک استایل خالی نباشد:
1. `functions.php`: بارگذاری استایل، رنگ‌ها، فونت‌های محلی، و رجیستر کردن سایدبار و ابزارک اختصاصی همان صنف.
2. `page-dashboard.php`: تمپلیت پنل کاربری اختصاصی برای فرانت‌اند.
3. `single-{cpt}.php`: قالب اختصاصی نمایش محتوای تکی (مثلاً نمایش پرونده برای وکالت، پروژه برای آژانس، درس برای آموزشی).
4. `screenshot.png`: پیش‌نمایش گرافیکی و باکیفیت در بخش مدیریت پوسته‌ها.

---

## ۵. راهنمای گام‌به‌گام پیاده‌سازی در مخزن گیت‌هاب

برای اعمال این تغییرات در مخزن `Aqamirrazavi/Sedrazavi-WPtemplate`:
1. **گام اول:** در `sedrazavi-companion/includes/class-demo-importer.php`، متد `execute_import` با متد `create_native_elementor_page` بالا به‌روزرسانی شود تا برگه‌ها مستقیماً فایل‌های موجود در `elementor-addon-suite/templates/` را بخوانند.
2. **گام دوم:** کلاس `class-realtime-notifications.php` به صورت کامل در `sedrazavi-companion` اینکلود و به هوک‌های فرم متصل شود.
3. **گام سوم:** در `.github/workflows/build-and-release.yml`، زیپ‌کردن چایلدتم‌ها به صورت فایل‌های مجزا از زیپ والد تنظیم شود تا کاربر بتواند هر زیپ را به صورت جداگانه در وردپرس آپلود کند.

---

# الحاقیه‌ی نسخه 9.0: ماتریس Nicheها، فازبندی وابستگی‌ها و پذیرش آزمون‌پذیر

**وضعیت این الحاقیه:** مشخصات محصول و طرح اجرایی برای بازبینی؛ موارد زیر تا زمان پیاده‌سازی و اجرای آزمون‌ها، «موجود/تحویل‌شده» محسوب نمی‌شوند.  
**قاعده‌ی دامنه:** برای جلوگیری از ساخت یک افزونه‌ی عظیم و پرریسک، قابلیت هر niche به سه نوع تقسیم می‌شود: (۱) قابلیت بومی SedRazavi، (۲) اتصال به افزونه‌ی معتبر تخصصی، (۳) قابلیت خارج از دامنه که صریحاً وعده داده نمی‌شود.

## 6. ماتریس اختصاصی هر Niche

### 6.1 Agency / طراح سایت و آژانس دیجیتال

| بُعد | حداقل تجربه‌ی اختصاصی |
|---|---|
| برگه‌ها | خانه، خدمات، جزئیات خدمت، نمونه‌کارها، جزئیات پروژه/مطالعه موردی، درباره/تیم، فرایند همکاری، تعرفه یا درخواست برآورد، تماس، FAQ، سیاست حریم خصوصی |
| سکشن‌ها | Hero نمونه‌کارمحور، معرفی فرایند، کارت خدمت، Bento نمونه‌کار، نتایج/شاخص‌ها، تیم، testimonial، pricing/estimate، فرم brief، CTA پایانی، FAQ |
| خدمات | دسته‌بندی خدمت، محدوده‌ی تحویل، بازه‌ی قیمت اختیاری، زمان تقریبی، فرم درخواست پیشنهاد قیمت؛ قیمت نمونه نباید به‌صورت پیش‌فرض تعهد واقعی تلقی شود |
| پست‌تایپ‌ها | `sr_service`, `sr_project` یا `sr_case_study`, `sr_team_member` در صورت نیاز؛ taxonomy صنعت/نوع پروژه. داده‌ی موجود قبل از هر تغییر نام/slug حفظ شود |
| پنل کاربری | MVP: فرم brief و تأیید دریافت؛ مرحله‌ی بعد: پرتال مشتری برای وضعیت پروژه، فایل‌های تحویلی و پیام‌ها؛ پرتال فقط با احراز هویت و کنترل مالکیت |
| تنظیمات | لوگو/هویت، خدمات فعال، CTAها، email دریافت lead، شبکه‌های اجتماعی، نمونه‌کار شاخص، رنگ/فونت، متن فرم و رضایت‌نامه، integration اختیاری CRM |
| اتصال‌ها | ایمیل و فرم؛ CRM اختیاری. پرداخت پروژه‌ها خارج از هسته مگر با WooCommerce/درگاه معتبر |

### 6.2 Legal / وکالت، مشاوره حقوقی و داوری

| بُعد | حداقل تجربه‌ی اختصاصی |
|---|---|
| برگه‌ها | خانه، حوزه‌های فعالیت، جزئیات خدمت، وکلا/مشاوران، پروفایل فردی، مقالات، تماس/رزرو مشاوره، پرسش‌های متداول، حریم خصوصی و سلب مسئولیت |
| سکشن‌ها | Hero اعتمادمحور، حوزه‌های حقوقی، پروفایل وکیل، مراحل رسیدگی، رزرو مشاوره، پرسش اولیه‌ی محرمانه، مدارک موردنیاز، نظر مشتری با سیاست تأیید، CTA |
| خدمات | حوزه‌ی تخصص، نوع مشاوره، حضوری/آنلاین، مدت و هزینه‌ی اختیاری، شرایط لغو؛ متن باید قابل ویرایش و عدم ایجاد تضمین حقوقی باشد |
| پست‌تایپ‌ها | `sr_legal_service`, `sr_attorney`, `sr_legal_article`; داده‌ی پرونده فقط اگر محصول جداگانه با کنترل دسترسی و حریم خصوصی ساخته شود. پرونده‌ی موکل نباید public CPT یا REST عمومی باشد |
| پنل کاربری | MVP: درخواست مشاوره و وضعیت درخواست؛ پنل پرونده، اسناد، پیام و زمان‌بندی فقط در ماژول جداگانه، با دسترسی object-level، audit log و بازبینی امنیت/حریم خصوصی |
| تنظیمات | اطلاعات دفتر، مجوزها/تخصص‌ها، مناطق ارائه خدمت، روش رزرو، ایمیل امن دریافت درخواست، متن سلب مسئولیت، فیلدهای داده‌ی حساس و retention، زبان و قالب زمان |
| اتصال‌ها | تقویم/رزرو و ایمیل؛ ارسال پیامک اختیاری از adapter. ذخیره‌ی اطلاعات حساس حداقلی؛ عدم ادعای محرمانگی مطلق بدون ارزیابی فنی/حقوقی |

### 6.3 Education / آموزش، مدرسه‌ی آنلاین و دوره

| بُعد | حداقل تجربه‌ی اختصاصی |
|---|---|
| برگه‌ها | خانه، فهرست دوره‌ها، صفحه‌ی دوره، مدرس، سرفصل/درس، ثبت‌نام، حساب دانشجو، راهنمای شروع، FAQ، تماس |
| سکشن‌ها | Hero دوره، جست‌وجو/فیلتر دوره، curriculum، مدرس، خروجی یادگیری، پیش‌نیاز، قیمت/ثبت‌نام، درس نمونه، نظر، FAQ، CTA |
| خدمات | دوره‌ی رایگان/پولی، cohort یا self-paced، سطح و مدت، گواهی در صورت پشتیبانی LMS، lesson preview و CTA ثبت‌نام |
| پست‌تایپ‌ها | ترجیحاً مدل دوره/درس/ثبت‌نام متعلق به LMS تخصصی؛ SedRazavi فقط CPT معرفی/landing در صورت نبود LMS. برای جلوگیری از دوباره‌کاری، مالکیت داده و منبع حقیقت باید روشن باشد |
| پنل کاربری | داشبورد دانشجو، دوره‌های ثبت‌نام‌شده، پیشرفت، ادامه‌ی درس، دانلودهای مجاز، گواهی در صورت اتصال LMS؛ نقش مدرس/admin جدا |
| تنظیمات | provider LMS، قیمت‌گذاری، سیاست دسترسی، مدت اعتبار، درس نمونه، ایمیل‌ها، locale، اتصال ویدئو، سیاست تکمیل و گواهی |
| اتصال‌ها | LMS plugin، WooCommerce/درگاه معتبر، video host؛ هسته‌ی SedRazavi نباید LMS، پخش امن یا صدور گواهی جعلی/غیرقابل اعتبار بسازد |

### 6.4 Membership / اشتراک محتوا و عضویت

| بُعد | حداقل تجربه‌ی اختصاصی |
|---|---|
| برگه‌ها | معرفی عضویت، مقایسه‌ی پلن‌ها، محتوای رایگان، ثبت‌نام/ورود، حساب من، صورتحساب/تمدید، راهنمای لغو، FAQ و سیاست‌ها |
| سکشن‌ها | paywall preview، مقایسه‌ی سطح عضویت، مزایا، محتوای تازه، حالت قفل‌شده/باز، تمدید، تخفیف، FAQ |
| خدمات | سطح دسترسی، دوره‌ی آزمایشی فقط با پشتیبانی provider، تمدید/انقضا/لغو، محدودیت تعداد دستگاه/دانلود فقط اگر افزونه‌ی عضویت واقعاً پشتیبانی کند |
| پست‌تایپ‌ها | نوع membership/product/content در افزونه‌ی عضویت منتخب؛ `sr_content_collection` فقط برای دسته‌بندی/نمایش، نه جایگزین موتور entitlement |
| پنل کاربری | سطح فعلی، تاریخ تمدید/انقضا، روش مدیریت اشتراک، محتوای مجاز، فاکتورها/سفارش از provider و پیوند پشتیبانی؛ هر کاربر فقط رکورد خود را ببیند |
| تنظیمات | provider عضویت، قوانین دسترسی، grace period، متن paywall، قیمت/دوره، پیام لغو/تمدید، ایمیل transaction، درگاه و ارز |
| اتصال‌ها | افزونه‌ی عضویت/commerce و درگاه؛ پرداخت موفق از callback معتبر و idempotent؛ خاموشی/انقضا نباید داده‌های منتشرشده را نابود کند |

### 6.5 Download Library / کتابخانه‌ی فایل و نرم‌افزار

| بُعد | حداقل تجربه‌ی اختصاصی |
|---|---|
| برگه‌ها | صفحه‌ی اصلی دانلود، آرشیو دسته، جزئیات فایل، نسخه‌ها و changelog، صفحه‌ی خرید/مجوز، حساب کاربری، دانلودهای من، راهنمای نصب و پشتیبانی |
| سکشن‌ها | فایل منتخب، فیلتر سیستم‌عامل/دسته، مشخصات و حجم، تاریخ نسخه، checksum، changelog، پلن رایگان/پولی، باکس دانلود امن و هشدار نیازمندی |
| خدمات | ثبت نسخه و فایل، mirror، checksum، مجوز استفاده، رایگان/پولی، سقف دانلود، تاریخ انتشار/پایان پشتیبانی؛ هیچ فایل خصوصی با لینک مستقیم عمومی محافظت‌شده تلقی نشود |
| پست‌تایپ‌ها | `sr_download_item`, `sr_download_version`, taxonomy دسته/پلتفرم؛ سفارش/لایسنس/entitlement باید منبع حقیقت commerce یا افزونه‌ی مجوز منتخب باشد |
| پنل کاربری | دانلودهای مجاز، نسخه‌ی فعلی، سفارش/مجوز، تاریخ انقضا و لینک پشتیبانی؛ مالکیت و entitlement سمت سرور بررسی شود |
| تنظیمات | storage provider، محدودیت دسترسی، retention، حجم، checksum، mirror، سیاست نسخه‌بندی، مدت/حد دانلود، مجوز و هشدارهای امنیتی |
| اتصال‌ها | WooCommerce یا افزونه‌ی دانلود دیجیتال، storage خصوصی/CDN signed URLs؛ فایل مخرب/غیرقانونی خارج از مسئولیت ابزارسازی است و moderation/policy لازم است |

### 6.6 Video & Media / فیلم، سریال، پادکست و کتابخانه‌ی رسانه

| بُعد | حداقل تجربه‌ی اختصاصی |
|---|---|
| برگه‌ها | آرشیو رسانه، دسته/ژانر، جزئیات اثر، فصل/قسمت در صورت نیاز، صفحه‌ی تماشا/شنیدن، محتوای رایگان و پولی، حساب کاربری/لیست علاقه‌مندی |
| سکشن‌ها | پوستر/thumbnail، مشخصات اثر، ادامه‌ی مشاهده، related items، تریلر، فیلتر، paywall، player embed، وضعیت دسترسی و گزارش مشکل |
| خدمات | metadata، فصل/قسمت، زبان/زیرنویس، provider پخش، زمان انتشار، سطح دسترسی؛ فایل و player از سرویس تخصصی/مجاز تامین شود |
| پست‌تایپ‌ها | `sr_media_title`, `sr_media_episode` فقط برای catalog/metadata؛ مالکیت حقوق، entitlement و پخش در provider جدا |
| پنل کاربری | ادامه‌ی مشاهده، favorites، اشتراک/وضعیت دسترسی؛ progress فقط با consent و سیاست retention روشن |
| تنظیمات | provider ویدئو، embed privacy، رده‌بندی/هشدار محتوا، region، caption/زیرنویس، کیفیت و paywall provider |
| اتصال‌ها | سرویس پخش مجاز و افزونه‌ی membership/commerce. DRM مطلق وعده داده نشود؛ لینک مستقیم فایل عمومی به‌عنوان حفاظت‌شده معرفی نشود |

### 6.7 News & Editorial / خبرگزاری و مجله

| بُعد | حداقل تجربه‌ی اختصاصی |
|---|---|
| برگه‌ها | خانه‌ی خبری، دسته، موضوع/برچسب، آرشیو نویسنده، مقاله، جست‌وجو، تماس/درباره، اشتراک خبرنامه، قوانین تحریریه |
| سکشن‌ها | headline lead، اخبار فوری، دسته‌بندی، پربازدید/تازه، کارت نویسنده، خبر تصویری، خبرنامه، related stories، paywall اختیاری |
| خدمات | workflow پیش‌نویس/بازبینی/انتشار فقط با capability وردپرس؛ breaking-news bar، خبرنامه و structured data با کنترل کیفیت |
| پست‌تایپ‌ها | ابتدا `post` استاندارد و taxonomyها؛ `sr_news` فقط وقتی workflow/داده‌ی جدا ضرورت دارد. author/archive schema در theme/plugin adapter |
| پنل کاربری | نویسنده/ویرایشگر: پیش‌نویس و وضعیت بازبینی؛ خواننده: newsletter/preferences در provider؛ subscriptions با افزونه‌ی تخصصی |
| تنظیمات | logo/brand، breaking news، دسته‌های ویژه، author box، reading time، schema، related stories، pagination، newsletter provider و ad slots |
| اتصال‌ها | SEO plugin منتخب، newsletter provider، analytics consent-aware؛ ادغام تبلیغات/trackers خاموش به‌صورت پیش‌فرض |

### 6.8 Portfolio & Gallery / نمونه‌کار و گالری

| بُعد | حداقل تجربه‌ی اختصاصی |
|---|---|
| برگه‌ها | خانه، گالری/آرشیو، جزئیات پروژه/اثر، درباره‌ی هنرمند/عکاس، خدمات/سفارش، تماس، مجوز استفاده از تصویر |
| سکشن‌ها | masonry/grid، lightbox accessible، فیلتر پروژه، جزئیات پروژه، تصویر قبل/بعد، معرفی سازنده، سفارش/رزرو، CTA |
| خدمات | دسته‌بندی آثار، metadata دوربین/فرمت اختیاری، license/credit، ثبت سفارش/commission؛ watermark به‌تنهایی محافظت از فایل اصلی نیست |
| پست‌تایپ‌ها | `sr_portfolio_item`, `sr_gallery_album`; taxonomy medium/category؛ رسانه از Media Library و مشتقات responsive وردپرس |
| پنل کاربری | برای نسخه‌ی پایه لازم نیست؛ پنل مشتری/تحویل فایل فقط در صورت فروش و با integration دانلود/commerce |
| تنظیمات | layout، تعداد ستون، crop، lazy loading، lightbox، watermark derivative اختیاری، alt text، color palette و social links |
| اتصال‌ها | WooCommerce/booking در صورت فروش؛ تصاویر بهینه، حق نشر، alt text و رضایت حریم خصوصی الزامی |

### 6.9 Store / فروشگاه

| بُعد | حداقل تجربه‌ی اختصاصی |
|---|---|
| برگه‌ها | shop، category، product، cart، checkout، my account، order tracking/returns، FAQ و policy pages |
| سکشن‌ها | featured products، category tiles، offers، product specs، reviews، shipping/returns, trust, cart/checkout notices |
| خدمات | محصول فیزیکی/دیجیتال، قیمت، موجودی، تخفیف، ارسال/مالیات/مرجوعی با پیکربندی فروشگاه؛ قواعد WooCommerce منبع حقیقت باشد |
| پست‌تایپ‌ها | WooCommerce product/order/customer؛ ایجاد CPT موازی ممنوع مگر برای محتوای غیرتجاری مشخص |
| پنل کاربری | سفارش‌ها، آدرس‌ها، downloads و profile از WooCommerce؛ دسترسی براساس owner/capability |
| تنظیمات | currency، tax/shipping، gateway، email، checkout fields، privacy، inventory، store notices، locale |
| اتصال‌ها | WooCommerce و افزونه‌ی رسمی/معتبر درگاه. ذخیره‌سازی کارت یا تقلید gateway در Core ممنوع |

### 6.10 معیار یکنواخت تکمیل ماتریس هر niche
هر خانه‌ی ماتریس باید به یک issue/test/asset قابل ردیابی تبدیل شود؛ «بعداً» و «گرافیکی شود» معیار پذیرش نیست. هر Kit پیش از انتشار باید فهرست دقیق صفحات، نام template، source-of-truth داده، منوی admin، وابستگی افزونه، capabilityها، متن‌های fa/en، screenshotها و موارد خارج از دامنه را ثبت کند.

---

## 7. فازبندی اجرایی بر اساس وابستگی و اولویت

اصل برنامه: فاز بعدی تنها وقتی شروع شود که خروجی و معیار پایان فاز پیش‌نیاز پاس شده باشد. دامنه‌ی pilot پیشنهادی: **Agency + Legal** برای اعتبارسنجی kitها و **Education** به‌عنوان pilot بعدی پس از اثبات adapter به LMS؛ اگر درآمد آموزشی اولویت قطعی است، تصمیم‌گیرنده می‌تواند جای Legal را با Education عوض کند.

| فاز | اولویت / وابستگی | محدوده و خروجی ملموس | معیار پایان قابل‌اثبات |
|---|---|---|---|
| 0. خط مبنا و تکرار مشکل | P0؛ بدون وابستگی | اجرای CI، نگهداری log/artifact، شمارش ZIPها، بررسی `unzip -l`، ثبت نسخه WordPress/PHP/Elementor و نصب تمیز | run URL و commit ثبت شده؛ manifest خروجی و شمارش واقعی ZIPها؛ هر شکست دارای log و reproduction؛ تا این مرحله هیچ «علت» بدون evidence اعلام نشود |
| 1. قرارداد محصول و بسته‌ها | P0؛ فاز 0 | تعیین manifest بسته، slug/theme headers، نسخه پشتیبانی‌شده، وابستگی‌ها، naming، changelog | parent/plugin/child/Elementor ZIPها جدا و نصب‌پذیر؛ complete bundle اختیاری و فقط پوشه‌ی ZIPهای مستقل + راهنما؛ تست ساختار archive پاس |
| 2. تست نصب و lifecycle | P0؛ فاز 1 | CI ماتریسی WordPress/PHP، فعال/غیرفعال/آپدیت، تست وابستگی اختیاری و migration | هر ZIP در matrix اعلام‌شده install/activate/deactivate/upgrade می‌شود؛ هیچ fatal error؛ داده‌ی کاربر پس از خاموشی plugin/theme باقی می‌ماند |
| 3. قراردادهای Core و امنیت | P0؛ فاز 2 | capability، REST/AJAX، nonce، sanitization/escaping، schema/version، error handling | تست منفی غیرمجاز=401/403؛ payload بد رد می‌شود؛ داده‌ی حساس در پاسخ عمومی/log نیست؛ static/security scan بدون finding بحرانی باز |
| 4. اعلان و فرم end-to-end | P1؛ فاز 3 | ذخیره‌ی رویداد server-side، inbox، unread/read، filter، deep-link، وضعیت ارسال کانال | تست خودکار: submit موفق دقیقاً یک lead و یک اعلان ایجاد می‌کند؛ refresh/ورود دوباره اعلان را حفظ می‌کند؛ read counter کاهش می‌یابد؛ کاربر غیرمجاز دسترسی ندارد؛ failure notification ارسال فرم را از بین نمی‌برد |
| 5. Demo importer و idempotency | P1؛ فازهای 1–3 | mapping explicit page→template، Elementor JSON page data در صورت سازگاری، native block fallback، گزارش و rollback | import اول صفحات مورد انتظار و status را می‌دهد؛ import دوباره صفحه/منوی duplicate نمی‌سازد؛ محتوای تغییرکرده‌ی کاربر overwrite نمی‌شود؛ JSON خراب/نبود Elementor به fallback امن منتهی می‌شود؛ نتیجه در WP Admin قابل مشاهده است |
| 6. Gutenberg/Elementor Library | P1؛ فاز 5 | preview، search/filter، block patterns، Elementor saved templates، cache محلی و insertion flow | template در editor مربوط باز و قابل ویرایش است؛ coverage حداقل یک full-page و چند section برای هر pilot؛ قطع GitHub مانع استفاده از cache نمی‌شود؛ thumbnail و requirement درست‌اند |
| 7. Niche pilot kits | P1؛ فازهای 1–6 | اجرای Agency و Legal با صفحات/سکشن/CPT/داشبورد/تنظیمات اختصاصی مطابق ماتریس | نصب clean و یک-click recipe در staging؛ صفحات کامل و قابل ویرایش؛ منو و front-end واقعی؛ niche A داده‌ی niche B را نمی‌بیند؛ checklist matrix پاس |
| 8. Design system/localization | P2؛ فاز 6 | semantic tokens، palette builder، fa/en، RTL/LTR، accessibility | تغییر palette در front-end/Gutenberg/Elementor همگام؛ reset و undo؛ contrast warning؛ UI فارسی بدون overflow و انگلیسی LTR؛ reduced motion و keyboard checks پاس |
| 9. Integrations تجاری | P2؛ فازهای 3،7 | adapters برای انتخاب provider، SMTP/email، SMS، gateway، LMS/membership/download | sandbox success/failure و retry/idempotency آزموده؛ secret در repo/ZIP/browser/log نیست؛ عدم نصب provider graceful؛ entitlement/download با کاربر غیرمجاز رد می‌شود |
| 10. گسترش nicheها و license catalog | P3؛ فازهای 7–9 | Download, Video, News, Portfolio, Store و کنترل license برای catalog/update | هر niche از ماتریس و همان quality gate عبور کند؛ انقضای license فقط cloud updates را محدود می‌کند، سایت/محتوا کار می‌کند؛ release notes و migration مستند |

**قاعده توقف:** اگر فاز 0 تعداد/ساختار artifact را روشن نکرده باشد، بازنویسی workflow بر اساس حدس ممنوع است. اگر فاز 2 یا 3 شکست امنیتی دارد، فاز import عمومی یا فروش/عضویت شروع نشود. اگر فاز 5 فقط شورتکد بسازد، برچسب «Elementor editable» ممنوع است.

---

## 8. معیارهای پذیرش آزمون‌پذیر (Definition of Done)

### 8.1 اعلان‌ها و ارسال فرم
1. در WP test: user A capability مجاز فرم را ارسال می‌کند، پاسخ موفق و رکورد lead با شناسه‌ی یکتا می‌گیرد.
2. notification center برای مدیر مجاز unread count برابر 1 نشان می‌دهد؛ reload همان اعلان را نگه می‌دارد.
3. بازکردن اعلان آن را read می‌کند؛ شمارنده به 0 می‌رسد و پس از reload همچنان read است.
4. user با نقش غیرمجاز endpoint فهرست و جزئیات را نمی‌بیند (403)، حتی اگر URL/ID را حدس بزند.
5. دو درخواست تکراری با همان idempotency key رویداد تکراری ایجاد نمی‌کنند؛ اگر idempotency در فرم کاربرد ندارد، سیاست anti-duplicate مستند شود.
6. در خطای SMTP/SMS، lead محفوظ است، UI وضعیت «ثبت شد اما اعلان بیرونی ارسال نشد» یا خطای قابل‌فهم می‌دهد و امکان retry مدیریتی امن وجود دارد.
7. متن اعلان و log داده‌ی حساس غیرضروری (رمز، secret، اسناد، اطلاعات پرونده) ندارند؛ retention/delete/export تست می‌شود.
8. UI در WP Admin و dashboard مجاز، موبایل، keyboard، RTL و LTR آزموده؛ loading/error/empty states قابل مشاهده‌اند.

### 8.2 بسته‌بندی ZIP و GitHub Actions
1. برای هر release، manifest مورد انتظار شامل نام artifact و تعداد دقیق ZIP دارد؛ CI با اختلاف تعداد/نام fail می‌شود.
2. هر ZIP نصب‌پذیر در root خودش فقط یک پوشه‌ی theme یا plugin با فایل header اصلی دارد؛ فایل‌های `node_modules`, `.git`, تست و secret وجود ندارند.
3. ZIP theme در Themes > Add New و ZIP افزونه در Plugins > Add New نصب می‌شود؛ هر دو فعال و غیرفعال می‌شوند.
4. child theme در zip خود پوشه‌ی child دارد و `Template:` دقیقاً با نام directory parent پس از نصب برابر است؛ والد نیز قبل از فعال‌سازی در دسترس است.
5. complete suite (اگر ارائه شد) صرفاً outer bundle واضح است، محتوی آن `README`، manifest و ZIPهای مجزا است و کاربر آن را به‌اشتباه به‌عنوان theme zip معرفی نمی‌کند.
6. CI ساختار هر artifact را در log چاپ، checksum تولید و artifact مستقل upload می‌کند؛ هیچ bundle بازگشتی یا ZIP قبلی در بسته‌بندی دوباره وارد نمی‌شود.
7. workflow pull request تست می‌کند اما release/deploy نمی‌کند؛ release فقط روی tag/اجازه‌ی صریح و کمترین permission رخ می‌دهد.
8. build موفق بدون تست نصب WordPress با عنوان «قابل نصب تست‌شده» منتشر نمی‌شود.

### 8.3 Child Themeها
1. هر child با parent مشخص فعال می‌شود؛ بدون والد، وردپرس پیام missing parent عادی می‌دهد و سایت خراب نمی‌شود.
2. هر kit حداقل screenshot، style.css معتبر، `functions.php` idempotent، text domain، version و template/assetهای اعلام‌شده دارد.
3. پس از فعال‌سازی child، home/صفحات مخصوص niche و منو/پالت مورد انتظار در onboarding به‌صورت opt-in قابل تولید است؛ صرف تغییر رنگ، «niche kit کامل» شمرده نمی‌شود.
4. هر page template در Page Attributes/Editor قابل انتخاب و رندر می‌شود؛ archive/single مربوط به CPT در URLهای آزمون‌شده کار می‌کند.
5. تعویض child به parent یا child دیگر، محتوا، media، taxonomy و options مشترک را حذف نمی‌کند؛ demo import فقط صفحات/منوهای متعلق به همان import run را قابل rollback می‌کند.
6. parent update روی staging انجام و child customization باقی می‌ماند؛ هیچ customization مشترک ضروری فقط داخل فایل‌های parent قرار نگرفته باشد.
7. تست fa/en، RTL/LTR، mobile breakpoint، focus/keyboard و contrast برای هر kit پاس یا exception مستند داشته باشد.

### 8.4 تجربه‌ی پیشخوان (Admin UX)
1. نصب clean، یک صفحه‌ی شروع دارد که وضعیت وابستگی‌ها، انتخاب kit، preview و اقدام بعدی را نشان می‌دهد؛ هیچ دکمه‌ی نمایشی/غیرفعال وانمود به کار واقعی نمی‌کند.
2. هر تنظیم دارای label، توضیح کوتاه، default، validation، خطای درون‌فرمی و ذخیره‌ی موفق قابل مشاهده است.
3. برای destructive action (replace/reset/uninstall) preview و confirmation صریح؛ عدم انتخاب = عدم حذف.
4. Site Kit و moduleها دارای status (فعال، لازم، اختیاری، ناسازگار)، وابستگی‌ها و لینک مستقیم‌اند؛ نبود Elementor/WooCommerce پیام و fallback مناسب می‌دهد.
5. library با search/filter و preview واقعی پاسخ می‌دهد؛ هر کارت builder compatibility، نیاز افزونه و عملیات «درج/نصب» متمایز دارد.
6. منوها بر اساس role/capability نمایش داده می‌شوند؛ REST/AJAX نیز همان مجوز را سمت سرور بررسی می‌کند.
7. dashboard در viewport موبایل و عرض WP Admin، فارسی RTL و انگلیسی LTR، keyboard-only و screen reader پایه آزموده می‌شود.
8. آزمون usability با حداقل 3 طراح هدف: بدون راهنمای شفاهی بتوانند (الف) kit را نصب کنند، (ب) یک صفحه را با builder ویرایش کنند، (ج) اعلان فرم را پیدا کنند؛ زمان و نقاط سردرگمی ثبت شود. این نمونه معیار تضمین بازار نیست، بلکه gate طراحی اولیه است.

---

## 9. دور دوم نقد و پالایش نهایی

### نقد: ذخیره‌ی `_elementor_data` به‌تنهایی کافی نیست
JSON باید schema قابل‌قبول نسخه‌ی Elementor باشد؛ نوع template ممکن است `section`, `container` یا `page` باشد؛ Elementor ممکن است خروجی CSS/cache و تنظیمات document دیگری نیاز داشته باشد. پس معیار، فقط update_post_meta نیست: بازکردن واقعی در نسخه‌های پشتیبانی‌شده، render، ویرایش، ذخیره و reload لازم است. فایل‌های موجود که type=`section` دارند نباید به‌عنوان صفحه‌ی کامل تلقی شوند؛ برای هر برگه باید page template واقعی یا recipe ترکیبی از sectionها تعریف شود.

### نقد: metadata و template path در کد نمونه‌ی قبلی نباید hardcode فرض شود
مسیرهای `/wp-content/plugins/...` ممکن است با نام پوشه‌ی ZIP، multisite یا تغییر نام بسته شکست بخورند. resolver باید از constant واقعی plugin path، manifest/registry، validation و versioning استفاده کند. متادیتای `_elementor_version` نباید با عدد ساختگی ثابت شود؛ نسخه‌ی نصب‌شده‌ی Elementor یا API رسمی plugin در دسترس استفاده شود. در صورت نبود Elementor، عدم نوشتن metadata نیمه‌کاره و fallback بلوکی لازم است.

### نقد: زنگوله‌ی ادمین‌بار به‌تنهایی Notification Center نیست
باید وضعیت server-side، policy نقش، فیلتر و mark read، persistence، retention، query با pagination و عملکرد سایت بزرگ تعریف شود. polling پرتکرار و `style` inline در admin bar، پاسخ مقیاس‌پذیر نهایی نیست؛ از REST محدودشده و polling/backoff مناسب یا Heartbeat بهینه استفاده شود.

### نقد: «هر niche افزونه‌ی خودش» ممکن است افزونه‌های پراکنده بسازد
راهکار پالایش‌شده: یک Core مشترک و capability modules/niche packs با قرارداد manifest و dependency. فقط ماژول‌هایی که چرخه‌ی انتشار/امنیت/داده‌ی مستقل دارند ZIP جدا بگیرند؛ بقیه plugin module باشند. هر ماژول باید روشن/خاموش و قابل تشخیص باشد، بدون تکرار setting و CPT.

### نقد: زیاده‌روی در 9 مدل هر جزء بار نگهداری می‌سازد
9 مدل هدف طراحی است نه الزام release برای همه‌ی nicheها از روز اول. در pilot، هر 9 مورد فقط برای header/hero/footer زمانی قبول شود که واقعاً تفاوت کاربردی و accessibility دارد. برای اجزای کم‌کاربرد، تعداد کمتر اما با کیفیت مجاز است؛ ادعای «کتابخانه کامل» باید با inventory واقعی تطبیق کند.

### نقد: داشبورد اختصاصی همه‌ی کاربران می‌تواند حریم خصوصی را به خطر اندازد
پنل کاربری فقط برای سناریوی احراز هویت‌شده و با object-level authorization ساخته شود. اطلاعات پرونده، پرداخت، course progress، دانلود و پیام از role/capability و مالکیت شیء استفاده کنند؛ پنل فرانت‌اند به معنای public endpoint نیست.

**نتیجه‌ی پالایش:** راهکار قابل قبول، نه قول «بی‌نقص»، بلکه releaseهای کوچک دارای manifest، تست قابل تکرار، preview قبل از تغییر و rollback است. هر تصمیم غیرقطعی (providerها، نسخه‌های پشتیبانی‌شده و اولویت pilot) باید پیش از فاز مربوط تعیین شود؛ در غیر این صورت با adapter interface و scope محدود جلو برویم و integration را ادعا نکنیم.

---

## 10. ایده‌ی خلاقانه‌ی افزوده: Recipe Preview + Change Ledger

هر kit در قالب یک **Recipe نسخه‌دار** ارائه شود. پیش از import، طراح preview مقایسه‌ای می‌بیند که کدام صفحه/منو/template/CPT/palette ایجاد یا تغییر می‌کند، کدام افزونه لازم است، چند asset افزوده می‌شود و آیا محتوای موجود به تعارض می‌خورد. کاربر می‌تواند بخش‌ها را انتخاب کند و Replace فقط برای هر آیتم با تأیید مستقل ممکن باشد.

پس از اجرا، **Change Ledger** با شناسه‌ی اجرای import نگهداری می‌شود: موارد ساخته‌شده، شناسه‌ها، تنظیمات تغییرکرده، نسخه‌ی recipe، زمان و نتیجه. Rollback فقط مواردی را حذف/بازمی‌گرداند که همان اجرا ساخته و هنوز توسط مشتری تغییر داده نشده‌اند؛ اگر تغییر پس از import دیده شود، سیستم توقف کرده و گزینه‌ی دستی ارائه می‌کند. این نوآوری هم سرعت ساخت سایت را بالا می‌برد و هم مهم‌ترین خطر import دمو، یعنی overwrite ناخواسته‌ی محتوای واقعی را مهار می‌کند.

---

## 11. مسترپرامپت الحاقی برای پیاده‌سازی پس از تأیید

```text
به سند SedRazavi OS v8.0 یک نسخه‌ی افزوده با ماتریس‌های niche، فازبندی وابستگی و معیارهای پذیرش قابل‌آزمایش اضافه کن. این الحاقیه الزام‌ها و معیارهای release است، نه ادعای اینکه قابلیت‌ها پیاده‌سازی شده‌اند.

ماتریس‌های Agency، Legal، Education، Membership، Download Library، Video/Media، News/Editorial، Portfolio/Gallery و Store را شامل صفحات، سکشن‌ها، خدمات، CPT/taxonomy، پنل کاربری، تنظیمات و integration provider کن. برای هر قابلیت source of truth مشخص کن؛ CPT اختصاصی یا payment/LMS دوم نساز وقتی افزونه‌ی تخصصی منبع داده است. داده‌ی حساس را public نکن.

فازها را طبق وابستگی اجرا کن: baseline و artifact evidence؛ قرارداد بسته‌بندی و install matrix؛ امنیت/مهاجرت؛ اعلان و فرم end-to-end؛ importer idempotent؛ library Gutenberg/Elementor؛ دو niche pilot؛ Design System و fa/en RTL/LTR؛ integration؛ گسترش nicheها. برای هر فاز خروجی ملموس، وابستگی و آزمون پایان تعریف کن. فاز downstream بدون عبور gate پیش‌نیاز شروع نشود.

Demo importer باید برای هر page یک mapping صریح به page JSON کامل یا recipe ترکیب سکشن‌های JSON داشته باشد. فایل‌های type=section به‌تنهایی صفحه‌ی کامل نیستند. با Elementor فعال، JSON schema معتبر به متادیتای رسمی مربوط وصل و در editor واقعی باز/ذخیره/reload شود؛ از API/version موجود استفاده کن و version/path را hardcode نکن. Elementor غیرفعال یا JSON نامعتبر باشد، Gutenberg/native fallback رندر شود. Import دوباره duplicate نسازد؛ محتوای سفارشی مشتری overwrite نشود؛ preview و rollback مبتنی بر Change Ledger داشته باش.

معیار پذیرش قابل اجرا برای اعلان‌ها، ZIPها، child themeها و تجربه‌ی admin را مطابق بخش DoD سند اضافه کن. CI باید نام/تعداد artifactها را assert کند، هر ZIP را مستقل در log فهرست کند، packageهای تودرتوی ناخواسته را رد کند، child Template را با slug پوشه‌ی واقعی parent validate کند، و نصب/فعال‌سازی/آپدیت هر بسته را در WordPress واقعی تست کند. Build موفق به‌تنهایی معادل WordPress-tested نیست.

در پایان هر فاز، فقط تست‌هایی را که واقعاً اجرا شده‌اند گزارش کن؛ log/commit/نسخه‌ی WP/PHP/Elementor و artifactهای آزموده‌شده را ضمیمه کن. `|| true` برای سبز نشان دادن تست ممنوع است. هیچ داده‌ای را destructive حذف نکن و هیچ امنیتی را برای عبور CI خاموش نکن. عدم قطعیت‌ها و محدوده‌ی پشتیبانی را مستند کن؛ ادعای بی‌نقصی نکن.
```

---

## 12. تصمیم‌های باز پیش از implementation

1. برای pilot دوم، Legal انتخاب شود یا Education؟ پیشنهاد پیش‌فرض Agency + Legal است؛ اگر فروش دوره فوریت بیشتری دارد Agency + Education.
2. محدوده‌ی رسمی پشتیبانی WordPress/PHP و نسخه‌های Elementor/WooCommerce/LMS چیست؟ باید در `readme.txt` و CI همسان باشد.
3. برای education/membership/download کدام افزونه‌ی مرجع منبع حقیقت داده/پرداخت است؟ بدون انتخاب provider، فقط interface و UI setup قابل ساخت است، نه ادعای اجرای end-to-end.
4. در Recipe، سیاست default «فقط ایجاد موارد غایب» است؛ replace موردبه‌مورد opt-in می‌شود. هر سیاست دیگر باید explicit تصویب شود.
5. دسترسی کاتالوگ GitHub با license ممکن است، اما سایت مشتری، صفحات importشده و داده‌ی قبلی هرگز به انقضای license وابسته نمی‌شوند.

**پیشنهاد نهایی:** نخست فاز 0 تا 5 را با evidence و تست WordPress اجرا کنید؛ سپس Agency و یک pilot دوم را به‌صورت کامل تحویل دهید. تا پیش از عبور این معیارها، نصب فقط برای staging/آزمایش باشد، نه عرضه‌ی production به مشتری.


---

# ۱۳. نسخه ۱۰.۰: ارتقای جامع معماری، سئو، اتوماسیون و تجربه کاربری (SedRazavi OS v10.0 Enterprise)

## الف) چرخه بازرسی و نقد چندتخصصی دور سوم (Deep Cross-Disciplinary Review)

برای شناسایی زوایای پنهان و مواردی که تاکنون از دید دور مانده بود، پروژه با مشارکت ۵ نقش تخصصی جدید بررسی شد:

### ۱. نقد مدیر ارشد سئو تکنیکال و معماری داده (Technical SEO & Semantic Web Lead)
* **زوایای پنهان و ایرادات کشف‌شده:**
  - اکثر قالب‌های آماده وردپرس تمام بار سئو را روی دوش افزونه‌های سنگینی مثل Yoast یا RankMath می‌اندازند که کدهای اضافه تولید می‌کنند. اگر کارفرما افزونه سئو را نصب نکند، سایت عملاً هیچ Schema ساختاریافته‌ای ندارد.
  - تعویض دموها معمولاً دسته‌بندی‌ها، متاتگ‌ها و Canonicalها را به‌هم می‌ریزد و خطای Duplicate Content در گوگل ایجاد می‌کند.
* **راهکار بی‌پاسخ و غیرقابل نقد:**
  - **Native Schema Engine:** پیاده‌سازی یک موتور تولید JSON-LD پویا و سبک در هسته `sedrazavi-companion` که متناسب با هر صنف (Niche) اسکیماهای اختصاصی تزریق می‌کند:
    - صنف حقوقی: `LegalService` با فیلدهای وکیل، پروانه وکالت، ساعات کاری و نقشه.
    - صنف آموزشی: `Course` و `EducationalOccupationalCredential`.
    - صنف اشتراکی و دانلود: `DigitalDocument` و `SoftwareApplication` همراه با فیلدهای مجوز و حجم.
    - صنف خبری و مجله: `NewsArticle` با `author`, `publisher`, `dateModified`.
  - **OpenGraph & Twitter Card بومی:** تولید متاتگ‌های پیش‌نمایش شبکه‌های اجتماعی بر اساس تصویر شاخص و گزیده بدون افت سرعت.
  - **سیستم Breadcrumb منطبق بر Schema.org:** ناوبری خرده‌نانی خودکار با ریزداده‌های معتبر گوگل.

### ۲. نقد معمار سرعت، Core Web Vitals و استانداردهای وب (Performance & CWV Architect)
* **زوایای پنهان و ایرادات کشف‌شده:**
  - قالب‌های چندمنظوره معمولاً تمام فونت‌ها، اسکریپت‌ها، کتابخانه‌های انیمیشن (مثل GSAP یا Swiper) و آیکون‌ها را در تمام برگه‌ها لود می‌کنند که موجب افت فاحش LCP (Largest Contentful Paint) و افت رتبه PageSpeed می‌شود.
  - تغییر وکتورهای بک‌گراند اگر با فایل‌های SVG خام یا سنگین انجام شود، باعث پرش صفحه (CLS) و رندر مجدد غیرضروری می‌شود.
* **راهکار بی‌پاسخ و غیرقابل نقد:**
  - **Asset Tree-Shaking & Conditional Enqueue:** لود اختصاصی استایل و اسکریپت فقط در صفحاتی که آن ویجت یا المان خاص در آن‌ها رندر شده است.
  - **Dynamic Vector Background Generator:** سیستم تولید الگوهای پس‌زمینه SVG ریاضیاتی (Data URI) فوق‌سبک (زیر ۲ کیلوبایت) با قابلیت تغییر رنگ از متغیرهای CSS؛ بدون درخواست HTTP اضافه و بدون افت سرعت.
  - **فونت بومی دوزبانه بهینه‌سازی‌شده:** فونت وزیرمتن (فارسی) و اینتر (انگلیسی) با `font-display: swap` و preconnect محلی؛ تضمین CLS برابر صفر.

### ۳. نقد طراح ارشد سیستم‌های طراحی، رابط کاربری و دسترسی‌پذیری (UI/UX & Accessibility Lead)
* **زوایای پنهان و ایرادات کشف‌شده:**
  - «شخصی‌سازی رنگ‌ها» در وردپرس اگر صرفاً انتخاب‌گر رنگ معمولی باشد، کاربر رنگ‌هایی انتخاب می‌کند که کنتراست لازم را ندارند و متن‌ها ناخوانا می‌شوند (نقض استاندارد WCAG AAA).
  - کلیک‌های زیاد و گیج‌کننده بودن پنل تنظیمات باعث خستگی طراح و کارفرما می‌شود.
* **راهکار بی‌پاسخ و غیرقابل نقد:**
  - **Harmonic Palette Generator:** به جای انتخاب رنگ تک‌تک بخش‌ها، سیستم بر اساس یک «رنگ شاخص» (Primary Color)، کل پالت‌های مکمل، سایه‌ها، رنگ سطوح (Surfaces) و گرادیان‌ها را با فرمول‌های ریاضی و تطبیق استاندارد WCAG 2.1 محاسبه کرده و در CSS Custom Properties تزریق می‌کند.
  - **پیش‌نمایش آنی (Instant Customizer Preview):** تغییر رنگ یا وکتور پس‌زمینه در ادمین بدون نیاز به رفرش صفحه با postMessage رندر می‌شود.

### ۴. نقد مهندس ارشد اتوماسیون، ادغام‌ها و پیام‌رسانی (Automation & Event-Driven Lead)
* **زوایای پنهان و ایرادات کشف‌شده:**
  - اتوماسیون‌های وردپرس معمولاً تک‌بعدی هستند (فقط ارسال ایمیل). در ایران ایمیل خوانده نمی‌شود و پیامک اولویت اول است، اما برای کارفرما اتصال به وب‌هوک‌ها، پیام‌رسان‌ها (تلگرام، بله، ایتا) و گوگل‌شیت حیاتی است.
* **راهکار بی‌پاسخ و غیرقابل نقد:**
  - **Unified Event & Webhook Dispatcher:** تعریف قلاب‌های رویدادی (Events Hook) استاندارد برای:
    - ثبت فرم تماس / رزرو وقت
    - خرید دوره یا اشتراک
    - ورود با رمز یکبارمصرف (OTP)
    - ارسال تیکت یا پیام جدید
  - هر رویداد می‌تواند همزمان به ۳ کانال شلیک شود:
    1. پیامک به کاربر و مدیر (از طریق درگاه‌های پیامکی پترن‌محور ایرانی مانند کاوه‌نگار، فرازاس‌ام‌اس، نجوا و ...)
    2. وب‌هوک امن (Webhook Payload) برای ارسال به ابزارهای اتوماسیون (n8n, Zapier, Webhook URL)
    3. اعلان زنده پیشخوان وردپرس (Notification Hub) با زنگوله و ثبت وضعیت دیده‌شده/نشده.

### ۵. نقد مدیر امنیت و مدیریت چرخه حیات مشتری (Client Handover & Lifecycle Architect)
* **زوایای پنهان و ایرادات کشف‌شده:**
  - بزرگ‌ترین چالش طراحان سایت زمانی رخ می‌دهد که سایت را به کارفرما تحویل می‌دهند؛ کارفرما با دستکاری منوها، تغییر قالب‌ها یا پاک کردن برگه‌ها کل طراحی را به هم می‌ریزد.
* **راهکار بی‌پاسخ و غیرقابل نقد:**
  - **Client Handover & White-Label Mode:**
    - امکان فعال‌سازی حالت «تحویل به کارفرما» با یک کلیک: قفل شدن منوهای حساس افزونه‌ها، کاتالوگ گیت‌هاب و تنظیمات پیشرفته.
    - باز ماندن فقط بخش‌های مدیریت محتوا (نوشته‌ها، محصولات، سفارش‌ها، پیام‌های دریافتی).
    - داشبورد اختصاصی کارفرما با نشان‌های تجاری اختصاصی طراح (White-label) و راهنماهای گام‌به‌گام ویدیویی و متنی.

---

## ب) ماتریس جامع اتوماسیون‌ها و اعلان‌های سیستم (Automation & Notification Matrix)

| رویداد سیستمی | کانال ۱: پیامک (SMS Pattern) | کانال ۲: ایمیل بومی (Domain SMTP) | کانال ۳: نوتیفیکیشن پیشخوان (Admin Bar) | کانال ۴: وب‌هوک (Outgoing Webhook) |
| :--- | :--- | :--- | :--- | :--- |
| **ارسال فرم تماس / لید** | پیامک خوش‌آمد به کاربر + هشدار به مدیر | ارسال متن کامل پیام به ایمیل دپارتمان | پاپ‌آپ زنگوله قرمز + شمارنده خوانده‌نشده | ارسال به CRM / شیت / n8n |
| **رزرو وقت / مشاوره (حقوقی/پزشکی)** | پیامک کد رهگیری و تاریخ جلسه | ارسال دعوتنامه تقویم (.ics) | ثبت در تقویم رزروهای پیشخوان | همگام‌سازی با Google Calendar |
| **خرید دوره / اشتراک VIP** | پیامک فعال‌سازی حساب و لینک پنل | ارسال فاکتور رسمی با فرمت PDF/HTML | ثبت در لاگ مالی و نمودار فروش امروز | وب‌هوک به پنل سامانه صدور لایسنس (SpotPlayer) |
| **ثبت نام / درخواست رمز یکبارمصرف (OTP)** | پیامک کد تأیید ۶ رقمی (زیر ۵ ثانیه) | ارسال لینک ورود سریع یکبارمصرف | — (جهت حفظ امنیت و محرمانگی) | ثبت رویداد امنیتی در لاگ ممیزی |
| **دانلود فایل غیرمجاز / ورود مشکوک** | پیامک هشدار امنیتی به مدیر | ایمیل گزارش IP و جزئیات ورود | علامت هشدار زرد رنگ امنیتی در پیشخوان | ارسال لاگ به سامانه مانیتورینگ امنیتی |

---

## ج) نوآوری‌های خلاقانه افزوده (Unthought-of Innovations)

### ۱. ابزار عیب‌یابی خودکار با یک کلیک (Self-Healing Diagnostic Agent)
در پیشخوان افزونه هسته، تب جدیدی به نام «پزشک سایت (Health Doctor)» اضافه می‌شود که موارد زیر را در ۵ ثانیه بررسی کرده و در صورت وجود مشکل، دکمه «تعمیر خودکار (Auto-Fix)» را ارائه می‌دهد:
- بررسی بازسازی متادیتای المنتور (`_elementor_data`) و ایجاد مجدد فایل‌های CSS کش‌شده.
- بررسی اتصال درگاه پیامک و اعتبارسنجی پترن‌های ارسالی.
- بررسی تداخل پیوندهای یکتا (Permalinks Flush) پس از ایمپورت برگه جدید.
- بررسی سازگاری نسخه PHP و متغیرهای حافظه سرور (`memory_limit >= 256M`).

### ۲. سیستم وکتور بک‌گراند داینامیک بدون بارگذاری فایل (Zero-Asset SVG Pattern Engine)
به جای دانلود تصاویر حجیم PNG یا SVG از سرور، کلاس `class-vector-patterns.php` اضافه می‌شود که بیش از ۲۰ الگوی ترند مدرن (Grid, Dot Matrix, Topography, Bauhaus Waves, Mesh Gradient) را با کد خام SVG تولید و متغیرهای رنگی تم (`--sr-primary`, `--sr-surface`) را مستقیماً در آن‌ها تزریق می‌کند. طراح فقط نوع الگو و اوپاسیتی (Opacity) را با یک اسلایدر تغییر می‌دهد.

---

## د) مسترپرامپت نهایی ارتقایافته (v10.0 Enterprise Master Prompt)

```text
سند SedRazavi OS را به نسخه جامع v10.0 Enterprise ارتقا بده. این نسخه شامل معماری کامل سئو بومی، موتور وکتورهای سبک، سیستم پیشرفته رویدادها و اتوماسیون (SMS/Email/Webhooks)، مرکز اعلان‌های یکپارچه و حالت تحویل به کارفرما است.

۱. سئو بومی (Native SEO):
کلاس `class-seo-engine.php` را در هسته افزونه پیاده‌سازی کن. بدون نیاز به افزونه‌های ثالث، اسکیماهای JSON-LD منطبق بر صنف فعال (LegalService, Course, DigitalDocument, NewsArticle, Store)، برچسب‌های OpenGraph و خرده‌نان (Breadcrumbs) استاندارد را به تگ `<head>` تزریق کن.

۲. اتوماسیون و وب‌هوک‌ها (Automation Engine):
کلاس `class-events-dispatcher.php` را ایجاد کن. هنگام رویدادهای کلیدی (ارسال فرم، رزرو، خرید اشتراک، ورود OTP)، رویداد را گرفته و به‌صورت همزمان به پیامک پترن‌محور، ایمیل رسمی دامنه، هاب اعلان‌های پیشخوان (`sr_notification`) و وب‌هوک‌های خروجی ارسال کن.

۳. وکتور بک‌گراند و پالت رنگی ریاضیاتی (Design Tokens & Vector Engine):
کلاس `class-vector-patterns.php` را برای تزریق الگوهای پس‌زمینه SVG ریاضیاتی (زیر ۲ کیلوبایت) پیاده‌سازی کن. سیستم `class-design-tokens.php` را ارتقا بده تا پالت‌های سازگار با WCAG AAA تولید کند و مستقیماً به متغیرهای CSS و المنتور کیت متصل شود.

۴. ابزار عیب‌یابی و پزشک سایت (Self-Healing Diagnostic):
در پیشخوان، تب Diagnostic اضافه کن تا سلامت متادیتای المنتور، پیوندهای یکتا، حافظه، کش CSS و وضعیت اکشنز گیت‌هاب را سنجیده و با دکمه Auto-Fix موارد معیوب را بازسازی کند.

۵. حالت تحویل به کارفرما (Client Handover Mode):
قابلیتی به تنظیمات اضافه کن که طراح با زدن دکمه «تحویل پروژه»، منوهای پیشرفته و کاتالوگ مخزن را مخفی کند و یک پیشخوان ساده‌شده و آماده به کاربری همراه با دسترسی فقط به ویرایش محتوا به کارفرما تحویل دهد.

کدها باید کاملاً ماژولار، سازگار با وردپرس ۶.۴+ و PHP 8.1+، عاری از خطای سینتکس، همراه با مستندات کامل و بدون فرضیات اثبات‌نشده باشند.
```


---

# ۱۴. نسخه ۱۱.۰: سیستم پیشرفته ناوبری، مگامنوها، موشن و استانداردهای سازگاری وردپرس (SedRazavi OS v11.0 Hyper-Design & Core Engine)

## الف) تحلیل و مهندسی معکوس الگوهای بصری و تجربی (UI/UX Deconstruction of Uploaded Visual Assets)

بر اساس ۱۰ تصویر ارائه‌شده از ترندهای برتر ۲۰۲۵/۲۰۲۶ (از داشبوردهای گیمینگ، پلتفرم‌های فین‌تک Trustlio، لندینگ مینیمال کلینیک Aurora Dental، اپلیکیشن لوکس قهوه، تا سامانه‌های سایبری CyberGuard و تلمتری تسلا)، پنج زبان طراحی و مؤلفه بصری استخراج و استانداردسازی شدند:

۱. **ناوبری جزیره‌ای شناور (Floating Island Navigation) & شیشه‌ای (Frosted Glassmorphism):**
   - مانند نمونه‌های Aurora Dental و Next World، هدرها به صورت کپسولی شناور با پدینگ متقارن، بوردرهای نیمه‌شفاف (`rgba(255,255,255,0.12)`) و افکت بلور پس‌زمینه (`backdrop-filter: blur(16px)`) پیاده‌سازی می‌شوند.
   - هدر هوشمند دوحالته (Smart Auto-Hide / Sticky): هنگام اسکرول به پایین مخفی شده و با کوچک‌ترین اسکرول به بالا بدون پرش فریم نرم بازمی‌گردد.

۲. **داک ناوبری عمودی تعاملی (Vertical Dock & Rail Navigation):**
   - با الهام از داشبورد خودرو و پنل مسابقات گیمینگ (EZX و Neon Cheese)، یک داک آیکونی باریک و شناور در کناره صفحه برای پنل کاربری، پیشخوان اصناف و لندینگ‌های مدرن طراحی شد که در هاور باز شده و در حالت لمسی با سوایپ هدایت می‌شود.

۳. **نوار شناور زیرین اختصاصی موبایل (Native Mobile Floating App-Bar):**
   - همانند نمونه‌های اپلیکیشن قهوه، شرط‌بندی ورزشی و سایبرگارد، در نمایشگرهای موبایل منوی همبرگری سنتی جای خود را به یک «نوار لمسی پایینی (Bottom App Bar)» با دکمه‌های سریع (تماس/رزرو فوری، سبد خرید، حساب کاربری و کاتالوگ) می‌دهد تا نرخ تبدیل لید تا ۳ برابر افزایش یابد.

۴. **کارت‌های با عمق بصری و گجت‌های اینتراکتیو (Gauges, Bento & Micro-Pills):**
   - کارت‌های Bento با گرادیان‌های محیطی ملایم (Ambient Glows)، برچسب‌های وضعیت پ قرصی‌شکل (Pill Badges)، نمودارهای شتابی (Spline Curves مانند Trustlio) و گیج‌های عقربه‌ای (مانند CyberGuard) برای نمایش رتبه، پیشرفت و گزارش‌ها.

---

## ب) چرخه بازرسی و نقد چندتخصصی دور چهارم (Deep Cross-Disciplinary Review Cycle)

### ۱. نقد مهندس ارشد تعاملات، موشن و انیمیشن (Motion & Interaction Design Specialist)
* **ایرادات و زوایای پنهان کشف‌شده:**
  - اکثر قالب‌های مگامنو در وردپرس با جاوااسکریپت سنگین باز می‌شوند و در تاچ موبایل به دلیل نداشتن Delay یا Event Handler مناسب باگ دارند.
  - اسکرول‌های قفل‌شونده و فریزکننده (Pinned/Freezer Sections) اگر استاندارد نباشند، در مرورگرهای سافاری و موبایل موجب Lag و مسدود شدن اسکرول صفحه (Scroll Jacking) می‌شوند.
* **راهکار قطعی و غیرقابل نقد:**
  - **CSS Hardware-Accelerated Menu Transitions:** ترنزیشن مگامنوها ۱۰۰٪ با CSS (`transform: translate3d` و `opacity`) با متغیرهای زمانی کوتاه (۱۵۰ms) پیاده‌سازی شوند.
  - **Safe Freezer Engine (Sticky Viewport Locking):** فریز شدن سکشن‌ها به جای بازنویسی اسکرول اصلی صفحه، از قابلیت استاندارد `position: sticky; top: var(--header-height)` به همراه `IntersectionObserver` استفاده کند؛ بدین ترتیب حس انیمیشن فریز شده بدون ریسک پرش و لگ در موبایل القا می‌شود.
  - **Motion Budget & Reduced Motion Safe-Guard:** به ازای هر انیمیشن، مدیا کوئری `@media (prefers-reduced-motion: reduce)` انیمیشن‌ها را به صفر ثانیه کاهش دهد تا سایت برای کاربران حساس یا دستگاه‌های ضعیف کاملاً ایستا و روان باشد.

### ۲. نقد معمار هسته وردپرس، سازگاری PHP و پایگاه‌داده MySQL (WordPress Core, PHP & DB Architect)
* **ایرادات و زوایای پنهان کشف‌شده:**
  - اضافه شدن تنظیمات فراوان برای مگامنوها، انیمیشن‌ها و اصناف، اگر در جدول `wp_options` بدون مدیریت ذخیره شود، متغیر `alloptions` را به چند مگابایت می‌رساند و TTFB (زمان دریافت اولین بایت) را روی سرورهای اشتراکی کند می‌کند.
  - کدهای PHP اگر نوع داده سخت‌گیرانه (Strict Types) نداشته باشند، در هاست‌هایی با PHP 8.2 و 8.3 هشدارهای Deprecation چاپ کرده و هدرهای ارسالی را خراب می‌کنند.
* **راهکار قطعی و غیرقابل نقد:**
  - **PHP 8.1 - 8.3 Strict Compatibility:** تمام کلاس‌های هسته افزونه از `declare(strict_types=1);` استفاده کرده و دارای Type Hints کامل و تابع‌های fallback برای هاست‌های قدیمی‌تر باشند.
  - **Single Cached Options Tree (Transients / Object Cache):** تمام تنظیمات منوها، رنگ‌ها و مگامنوها در یک رکورد واحد فشرده ذخیره شوند و از سیستم کش گذرا (Transients API) وردپرس با قابلیت بروزرسانی آنی بهره ببرند.
  - **MySQL 5.7 / 8.0 & MariaDB Zero-Penalty Schema:** جداول نوتیفیکیشن و لاگ‌ها دارای Index اختصاصی روی فیلدهای `user_id`، `status` و `created_at` باشند؛ بدون کوئری‌های سنگین JOIN چندسطحی.

### ۳. نقد طراح ارشد سیستم‌های ناوبری و مگامنو (Navigation & Mega Menu Architect)
* **ایرادات و زوایای پنهان کشف‌شده:**
  - ایجاد مگامنو با شورتکد یا ابزارک‌های قدیمی در وردپرس تجربه کاربری ادمین را کلافه‌کننده می‌کند؛ طراح باید بتواند همانند المنتور و گوتنبرگ، ستون‌ها و المان‌ها را مستقیماً درون مگامنو بچیند.
* **راهکار قطعی و غیرقابل نقد:**
  - **SedRazavi Native Mega Menu Builder:**
    - به صفحه «فهرست‌ها» در پیشخوان وردپرس فیلد جدید «فعال‌سازی مگامنو» اضافه می‌شود.
    - طراح می‌تواند برای هر زیرمنو یک «الگوی ذخیره‌شده المنتور (Elementor Saved Template)» یا «الگوی گوتنبرگ (Block Pattern)» را به عنوان محتوای مگامنو انتخاب کند.
    - قابلیت نمایش شبکه‌ای ۲، ۳ یا ۴ ستونه با آیکون‌های SVG، بنر اختصاصی حراج/رزرو و برچسب‌های متنی (مانند New, Hot, Sale).

### ۴. نقد تعمیم معماری لندینگ به سایر اصناف (Niche Architectural Adaptation)
* **ایرادات و زوایای پنهان کشف‌شده:**
  - ساختار تعاملی وکالت (مشاوره، رزرو پرونده، کارت وکیل) نباید فقط منحصر به وکالت بماند؛ باید در قالب الگوهای بنیادین به سایر اصناف تسری یابد.
* **راهکار قطعی و غیرقابل نقد:**
  - **پترن‌های معادل صنف به صنف:**
    - *پزشکی و کلینیک (مانند Aurora Dental):* جدول رزرو ویزیت، برچسب‌های اینتراکتیو روی تصاویر دندانپزشکی، کارت‌های قبل/بعد، اسلایدر معرفی پزشکان.
    - *کافه، رستوران و بار لوکس (مانند اپلیکیشن قهوه):* منوی کشویی محصولات، بج‌های طعم و غلظت، سبد سفارش سریع بیرون‌بر.
    - *فین‌تک، امنیت و SaaS (مانند Trustlio & CyberGuard):* ماشین‌حساب محاسبه سود یا هزینه، گیج وضعیت امنیتی، مقایسه جداول پلن‌ها، فید زنده رویدادها.
    - *گیمینگ و مارکت‌پلیس دارایی‌های دیجیتال (مانند EZX & Neon Cheese):* فیلتر تگی زنده، نمایش موجودی و کمیابی، استاتوس برد پیروزی/شکست.

---

## ج) کاتالوگ مدل‌های ناوبری و مگامنوهای پیاده‌سازی‌شده (Navigation Architecture Suite)

۱. **مدل ۱: Floating Island Header (هدر کپسولی شیشه‌ای با مگامنوی ستونی)**
   - بدنه کپسولی با انحنای ۱۰۰px، پس‌زمینه نیمه‌شفاف بلور، دکمه CTA گرادیانی، مگامنوی ۴ ستونه با بنر تخفیف.
۲. **مدل ۲: Tech Split Nav (هدر دونیمه مهندسی)**
   - لوگو و جستجوی زنده در چپ، ناوبری دسته‌بندی‌ها در راست، بدون نیاز به اسکرول اضافه.
۳. **مدل ۳: Vertical Rail & Dock (داک شناور عمودی)**
   - ایده‌آل برای داشبوردها و سایت‌های تک‌صفحه‌ای با ناوبری آیکونی و پاپ‌آپ‌های ناوبری در هاور.
۴. **مدل ۴: Minimalist Clean (هدر سفید کلینیکی مانند Aurora Dental)**
   - تایپوگرافی پررنگ، خطوط بسیار باریک، منوی کشویی تمیز با آیکون‌های وکتور تخت.
۵. **مدل ۵: Mobile Tab Bar (اپ‌بار اختصاصی اپلیکیشن‌های موبایل)**
   - ناوبری ۵ دکمه‌ای ثابت در انتهای صفحه با انیمیشن فنری (Spring) هنگام سوئیچ تب‌ها.

---

## د) مسترپرامپت الحاقی v11.0 (Navigation, Motion & WordPress Core Master Prompt)

```text
سند معماری SedRazavi OS را به نسخه v11.0 Hyper-Design & Core Engine ارتقا بده. این نسخه بر پیاده‌سازی سیستم هدرها و مگامنوهای فوق‌پیشرفته، انیمیشن‌های سخت‌افزاری بدون لگ، استانداردهای سازگاری دقیق با PHP 8.1-8.3 و دیتابیس MySQL، و تعمیم الگوهای اینتراکتیو به تمامی اصناف تمرکز دارد.

۱. سیستم مگامنوی بومی (Native Mega Menu Engine):
کلاس `class-mega-menu.php` و واکر اختصاصی فهرست‌های وردپرس (`SedRazavi_Menu_Walker`) را پیاده‌سازی کن:
- امکان تعریف مگامنوی ۲، ۳ و ۴ ستونه با اختصاص مستقیم Template ID المنتور یا Block Pattern گوتنبرگ.
- هدر کپسولی شناور شیشه‌ای (Island Navbar) با افکت بلور، تغییر خودکار وضعیت اسکرول (Sticky Smart Hide/Show)، و پالت‌های متغیر رنگی.
- نوار ناوبری پایینی موبایل (Mobile Bottom App-Bar) برای دستگاه‌های زیر ۷۶۸ پیکسل با دکمه‌های اقدام سریع.

۲. موتور موشن و سکشن‌های فریزکننده (Safe Motion & Freezer Engine):
استایل‌ها و رفتارهای حرکتی را با CSS Hardware-Acceleration (`transform: translate3d`) و بدون اسکرول‌جکینگ پیاده‌سازی کن. قابلیت سکشن‌های Pinned/Sticky را با `IntersectionObserver` و متغیرهای ویوپورت فراهم کن، همراه با غیرفعال‌سازی خودکار در مدیاکوئری `prefers-reduced-motion`.

۳. سازگاری دقیق با هسته وردپرس و PHP 8.3:
تمام فایل‌های PHP با `declare(strict_types=1);`، بررسی متغیرها با null-safe operator و جلوگیری کامل از ارورهای Deprecated تدوین شوند. ذخیره‌سازی تنظیمات در `wp_options` به‌صورت کلید فشرده تک‌رکوردی و با کش گذرا (Transients API) انجام شود تا حجم `alloptions` افزایش نیابد.

۴. ماتریس کامپوننت‌های تعاملی اصناف:
الگوهای فرم، رزرو و کارت‌های اینتراکتیو صنف حقوقی را برای کلینیک و سلامت (رزرو نوبت و تگ‌های تصویر)، کافه/رستوران (منوی طعم و سفارش سریع)، امنیت/فین‌تک (گیج عقربه‌ای و نمودار وضعیت)، و گیمینگ/مارکت‌پلیس (کارت دارایی با بج کمیابی) پیاده‌سازی کن.
```


---

# ۱۵. نسخه ۱۲.۰: ماتریس دسترسی چندنقشی (RBAC)، هاب نظرات هوشمند و پوشش شکاف‌های ساختاری (SedRazavi OS v12.0 Ecosystem Master Blueprint)

## الف) واکاوی شکاف‌ها و ابعاد مغفول در معماری پورتال‌ها و پیشخوان‌ها (Architectural Gap Analysis)

در بررسی عمیق سامانه‌ها و نیازمندی‌های مقیاس تجاری، ۴ شکاف بنیادین در اکوسیستم‌های پیشین شناسایی شد:

۱. **شکاف دسترسی و تفکیک نقش‌ها (Role Segregation Gap):**
   - در اکثر قالب‌ها یا فقط پنل پیش‌فرض وردپرس وجود دارد یا یک پنل ساده مشتری. جایگاه «کادر اداری و همکاران» (منشی، وکیل همکار، مدرس کمکی، مشاور، پزشک کشیک، پشتیبان) کاملاً مغفول مانده بود. این افراد نباید به تنظیمات اصلی و درآمدهای کل سایت دسترسی داشته باشند، اما باید کارهای روزمره خود را بدون اصطکاک انجام دهند.

۲. **شکاف سیستم تعاملی نظرات، رضایت‌سنجی و FAQ (Modern Social Proof & Community Engine):**
   - سیستم پیش‌فرض `comments.php` وردپرس بسیار قدیمی است، نیاز به رفرش صفحه دارد، از امتیازدهی چندمعیاره پشتیبانی نمی‌کند و حس یک برنامه مدرن را نمی‌دهد. نظرات برای سئو و نرخ تبدیل حیاتی‌ترین بخش هستند.

۳. **شکاف جستجوی زنده و پالت فرمان (Command Palette / CMD+K):**
   - کاربران در سایت‌های مدرن به دنبال فرم سرچ سنتی نمی‌گردند؛ آن‌ها انتظار دارند با زدن دکمه یا کلید میانبر `Ctrl+K`، پاپ‌آپ جستجوی آنی بدون رفرش با فیلتر هوشمند خدمات، مقالات، اسناد و رزروها باز شود.

۴. **شکاف چندشعبه‌ای و تقویم کاری پیشرفته (Multi-Branch & Shift Management):**
   - در اصناف پزشکی، وکالت، کافه و نمایندگی‌ها، کسب‌وکارها تک‌مکانه نیستند؛ امکان انتخاب شعبه، متخصص مربوطه، شیفت‌های کاری و موقعیت نقشه مجزا ضروری است.

---

## ب) ماتریس سطوح دسترسی و تفکیک پیشخوان‌ها (Multi-Role RBAC Dashboard Matrix)

| نقش کاربر در سیستم | دسترسی‌ها و ابزارهای اختصاصی پیشخوان | محدودیت‌ها و مرزهای امنیتی |
| :--- | :--- | :--- |
| **۱. طراح و معمار سایت (Super Admin / Developer)** | - دسترسی به Design Tokens، همگام‌سازی کاتالوگ GitHub، لایسنس، تب عیب‌یابی (Self-Healing)، مدیریت ورک‌فلوها و لاگ‌های سرور. | بالاترین سطح؛ محافظت‌شده در حالت Client Handover Mode. |
| **۲. مالک و مدیر کسب‌وکار (Business Owner / CEO)** | - داشبورد مالی و نمودارهای درآمد، گزارش لیدها و پیام‌های جدید، تنظیمات درگاه و پیامک، مدیریت اعضای تیم، گزارش نظرات و ممیزی. | دسترسی به کدهای مخزن، ویرایش فایل‌های تم و تنظیمات سیستمی سرور مسدود است. |
| **۳. کادر اداری و همکاران (Staff / Associates / Operators)** | - مشاهده و مدیریت نوبت‌های رزروشده، ارسال پاسخ به موکل/بیمار/دانشجو، آپلود فایل پرونده یا تکالیف، ثبت وضعیت سفارش‌ها، تغییر ساعت حضور. | عدم دسترسی به گزارش‌های مالی کل، تنظیمات سایت، مدیریت پلاگین‌ها و سایر کارمندان. |
| **۴. کاربر نهایی / مشتری / موکل (Client / Member / Student)** | - پیشخوان فرانت‌اند لوکس، پیگیری پرونده/نوبت، دسترسی به دانلودهای مجاز یا دوره‌ها، صدور پیش‌فاکتور/فاکتور، تیکت پشتیبانی، تنظیمات احراز هویت دوعاملی. | دسترسی ۱۰۰٪ در محیط فرانت‌اند بدون کوچک‌ترین ورود به مسیر `/wp-admin/`. |

---

## ج) هاب مدرن نظرات، نقدها و پرسش‌وپاسخ (Next-Gen Comments & Reviews Hub)

برای رفع ضعف نظرات وردپرس، کلاس `class-modern-comments.php` با مشخصات زیر طراحی شد:
۱. **ثبت و لود آژاکسی بدون رفرش (Zero-Reload AJAX / REST):** ارسال نظر، دریافت پاسخ، و لود صفحات بعدی بدون رفرش برگه.
۲. **نشان خریدار یا مشتری تأییدشده (Verified Client Badge):** بررسی خودکار سابقه خرید، دوره یا رزرو وقت کاربر در دیتابیس و اعطای تیک سبز «موکل تأییدشده / خریدار واقعی».
۳. **سیستم امتیازدهی چندمعیاره (Multi-Criteria Rating):** امکان امتیازدهی ۱ تا ۵ ستاره بر اساس مؤلفه‌های صنف (مثلاً: کیفیت مشاوره، پاسخگویی، ارزش خدمات).
۴. **تأییدیه سریع با واکنش (Reaction & Helpful Votes):** دکمه‌های «این دیدگاه برای من مفید بود» و واکنش‌های سریع ایموجی.
۵. **پیوست تصویر و سند با محدودیت امنیتی:** اعتبارسنجی نوع فایل، حجم حداکثر ۲ مگابایت، اسکن امنیتی و فشرده‌سازی خودکار به فرمت WebP.

---

## د) پوشش ابعاد استراتژیک افزوده (Strategic Additions Suite)

۱. **پالت فرمان جستجوی آنی (Instant Command Palette - Spotlight Search):**
   - ماژول جاوااسکریپتی سبک با کلید میانبر `Ctrl+K` یا کلیک روی آیکون جستجو در هدر، با قابلیت جستجوی فازی در CPTها، اصناف، وکلا، دوره‌ها و دسترسی مستقیم بدون اتلاف وقت.
۲. **موتور صدور فاکتور رسمی چاپی (Branded PDF/Print Invoice Generator):**
   - تولید فاکتور رسمی استاندارد با QR کد اعتبارسنجی، محاسبه مالیات و تخفیف، آماده برای پرینت و سازگار با سیستم‌های حسابداری.
۳. **نوار اطلاعیه اضطراری و نوار تخفیف شناور (Smart Notice & Top-Bar):**
   - نوار اعلان بالای صفحه با تایمر شمارش معکوس، دکمه بستن با ذخیره کوکی در لوکال استوریج، و هدف‌گذاری بر اساس برگه یا دستگاه.

---

## ه) چرخه نقد چندتخصصی دور پنجم (Fifth Multi-Discipline Review Cycle)

### نقد کارشناس ارشد امنیت دسترسی و پایگاه‌داده (RBAC & Database Security Lead)
* **نقد وارد شده:** ایجاد رول‌های کاربری جدید اگر مستقیماً به دیتابیس تزریق شوند، در صورت غیرفعال شدن افزونه در دیتابیس یتیم (Orphan) باقی می‌مانند و ممکن است در صورت ضعف در `current_user_can()` آسیب‌پذیری Privilege Escalation ایجاد کنند.
* **راهکار قطعی:** قابلیت‌های نقش‌ها با Custom Capabilities استاندارد وردپرس (`sr_manage_appointments`, `sr_view_own_cases`) نام‌گذاری شوند و هنگام پاکسازی یا بروزرسانی، ساختار نقش‌ها با API رسمی `add_role()` و `remove_role()` در هوک فعال‌سازی مدیریت گردند.

### نقد مدیر تجربه مشتری و شبکه‌های اجتماعی (Customer Experience & Social Proof Architect)
* **نقد وارد شده:** سیستم نظرات پیشرفته ممکن است قربانی اسپم ربات‌ها شود و مدیر را غرق در نوتیفیکیشن کند.
* **راهکار قطعی:** تزریق فیلد تله نامرئی (Honeypot)، محدودیت نرخ ارسال (Rate Limiting) بر اساس IP و نشست کاربر، به همراه اعتبارسنجی خودکار با API وب‌هوک ضداسپم بدون نیاز به کپچاهای تصویری آزاردهنده برای کاربر.

---

## و) مسترپرامپت الحاقی v12.0 (Role-Based Dashboards & Community Hub Master Prompt)

```text
سند معماری SedRazavi OS را به نسخه v12.0 Ecosystem Master Blueprint ارتقا بده. این نسخه ماتریس کامل دسترسی چندنقشی (RBAC)، هاب مدرن نظرات و نقدها، پالت فرمان جستجوی آنی (CMD+K)، سیستم صدور فاکتور و مدیریت چندشعبه‌ای را محقق می‌کند.

۱. تفکیک نقش‌ها و پیشخوان‌های اختصاصی (Multi-Role RBAC):
کلاس `class-role-manager.php` را ایجاد کن. ۴ سطح نقش مجزا پیاده‌سازی کن:
- معمار و طراح سایت (مدیریت زیرساخت و کاتالوگ)
- مدیر کسب‌وکار (داشبورد تجاری، فروش، پیام‌ها و کادر)
- همکاران و کادر تخصصی (مدیریت نوبت‌ها، پرونده‌های اختصاصی و محتوا بدون دسترسی مالی)
- مشتریان نهایی (پورتال فرانت‌اند با تاریخچه سفارشات، دانلودها و تیکت‌ها)

۲. سیستم مدرن نظرات و پرسش‌وپاسخ (Next-Gen Comments Hub):
کلاس `class-modern-comments.php` را به همراه تمپلیت فرانت‌اند بازنویسی کن:
- ارسال و پاسخ آژاکسی بدون رفرش برگه
- برچسب مشتری تأییدشده (Verified Client Badge)
- فیلدهای امتیازدهی ستاره‌ای چندمعیاره متناسب با هر صنف
- رأی‌دهی به مفید بودن دیدگاه‌ها و پیوست تصویر بهینه‌شده با فیلتر امنیتی
- مکانیزم ضداستفاده ناهنجار و فیلد Honeypot ضداسپم

۳. ماژول پالت فرمان و جستجوی آنی (Command Palette CMD+K):
قابلیت باز شدن مودال جستجو با کلید میانبر `Ctrl+K`، جستجوی همزمان در انواع پست‌تایپ‌ها (مقالات، خدمات، دوره‌ها، وکلا/پزشکان) با نمایش دسته‌بندی‌شده و پاسخ در کمتر از ۵۰ میلی‌ثانیه.

۴. موتور صدور فاکتور و اعلان هوشمند:
طراحی تمپلیت فاکتور استاندارد با قابلیت پرینت و دانلود، به همراه هماهنگی کامل با ماژول نوتیفیکیشن‌ها و وب‌هوک‌های ارسالی.
```


---

# ۱۶. نسخه ۱۳.۰: شبکه عصبی اعلانات نقش‌محور، تضمین سازگاری با Overedge.dev و همزیستی بدون تداخل افزونه‌ها (SedRazavi OS v13.0 Zero-Conflict Architecture)

## الف) معماری شبکه عصبی توزیع اعلانات نقش‌محور (Role-Based Notification Routing & Dispatcher Engine)

هنگامی که یک کاربر مهمان یا مشتری در فرانت‌اند فرمی پر می‌کند، نوبتی رزرو می‌کند، نظری ثبت می‌نماید یا خریدی انجام می‌دهد، رویدادها نباید به‌صورت کور برای همه ارسال شوند. کلاس `class-notification-router.php` با ماتریس ماتریسی زیر، رویدادها را بر اساس دسترسی و صنف تفکیک می‌کند:

### ۱. ماتریس مسیریابی اعلان‌ها بر اساس نقش (Routing Matrix)

| نوع رویداد فرانت‌اند | ادمین / توسعه‌دهنده | مالک / مدیر عامل کسب‌وکار | کادر و همکاران تخصصی (پزشک/وکیل/مدرس) | نویسنده / تولیدکننده محتوا | مشتری / مهمان |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **رزرو نوبت / پرونده جدید** | ثبت در لاگ سیستم | پیامک فوری + زنگوله پیشخوان + ایمیل | پیامک تاریخ نوبت + نمایش در پیشخوان اختصاصی | — (عدم دسترسی به حریم خصوصی) | پیامک کد پیگیری و فاکتور |
| **دیدگاه / نقد روی یک مقاله** | ثبت در لاگ سیستم | زنگوله پیشخوان (در صورت تنظیم) | — | نوتیفیکیشن پیشخوان و ایمیل فوری با دکمه پاسخ | پیامک/ایمیل پس از تأیید و انتشار نظر |
| **خرید محصول / اشتراک دوره** | لاگ مالی و سیستمی | پیامک فروش + نمودار پیشخوان + وب‌هوک | نوتیفیکیشن داشبورد (فقط مدرس همان دوره) | — | فاکتور خرید + لینک آنی لایسنس/دسترسی |
| **خطای امنیتی / تلاش نفوذ** | پیامک بحرانی + اعلان قرمز پیشخوان | ایمیل گزارش وضعیت امنیتی | — | — | — |
| **ارسال تیکت پشتیبانی** | لاگ سیستم | زنگوله پیشخوان + ایمیل | نوتیفیکیشن در پنل (فقط کارشناس مسئول تیکت) | — | پیامک ثبت تیکت با کد پیگیری |

### ۲. کانال‌های تحویل و پایداری اعلانات (Delivery Mechanisms)
- **پینگ زنده پیشخوان (Heartbeat / SSE Push):** زنگوله ادمین‌بار بدون لود سنگین، با استفاده از WordPress Heartbeat API هر ۶۰ ثانیه یا در رخدادهای حساس به‌صورت فوری عدد شمارنده قرمز را بروزرسانی می‌کند.
- **سیستم اولویت‌بندی (Severity Levels):**
  - `CRITICAL`: پیامک آنی به مدیر + هشدار پاپ‌آپ قرمز در پیشخوان.
  - `ACTION_REQUIRED`: زنگوله پیشخوان با نشان زرد (نیاز به تأیید رزرو یا پاسخ تیکت).
  - `INFO`: ثبت خاموش در لاگ نوتیفیکیشن‌های کاربر جهت بررسی‌های بعدی.

---

## ب) تضمین سازگاری ۱۰۰٪ با Overedge.dev و استانداردهای تبدیل کد

سایت **Overedge.dev** پلتفرمی تخصصی برای اعتبارسنجی، بهینه‌سازی و تبدیل کامپوننت‌های مدرن (React/Tailwind/HTML) به قالب‌ها و الگوهای استاندارد وردپرس (FSE و PHP کلاسیک) است. برای اینکه تمپلیت‌ها و کدهای SedRazavi در Overedge.dev بدون هیچ خطایی پذیرفته و بهینه شوند، اصول زیر در کدنویسی اعمال شده است:

۱. **جداسازی کامل DOM و عدم تداخل هوک‌ها (Clean DOM Separation):**
   - هیچ‌کدام از کدهای جاوااسکریپت نباید مستقیماً المنت‌های هسته وردپرس (`#wpcontent`, `#wpadminbar`) را دستکاری کنند.
   - تمام رندرهای فرانت‌اند داخل کانتینرهای ایزوله با کلاس پیشونددار (`sr-container`, `sr-canvas`) محصور شده‌اند.

۲. **سلسله‌مراتب استاندارد قالب وردپرس (Standard Template Hierarchy):**
   - ساختار پوشه‌ها و نام‌گذاری فایل‌ها دقیقاً منطبق بر Codex وردپرس است (`header.php`, `footer.php`, `index.php`, `single.php`, `archive.php`, `404.php`, `functions.php`).
   - فایل‌های متادیتا شامل `style.css` با هدرهای معتبر تم، `theme.json` منطبق بر مشخصات نسخه ۳ گوتنبرگ، و `screenshot.png` با ابعاد استاندارد ۱۲۰۰×۹۰۰ پیکسل.

۳. **پرهیز از وابستگی‌های Hardcoded در باندل‌ها:**
   - تمام دارایی‌های استاتیک از طریق توابع رسمی `wp_enqueue_script()` و `wp_enqueue_style()` با ثبت وابستگی‌های دقیق (`wp-i18n`, `wp-element`, `wp-hooks`) لود می‌شوند؛ به طوری که موتور بهینه‌ساز Overedge بتواند دارایی‌ها را Tree-shake و بهینه‌سازی کند.

---

## ج) معماری همزیستی بدون تداخل با سایر افزونه‌های وردپرس (Zero-Conflict Plugin Architecture)

یکی از بزرگ‌ترین خطرات قالب‌های سفارشی، تداخل با سایر پلاگین‌های محبوب سایت (مثل افزونه‌های سئو، کش، امنیت، درگاه و پیامک) است. کلاس `class-plugin-compatibility.php` سازوکار هوشمند همزیستی را به شرح زیر اجرا می‌کند:

### ۱. همزیستی با افزونه‌های سئو (Yoast SEO, Rank Math, SEOPress)
- **شناسایی خودکار و خروج داوطلبانه (Self-Deactivating Schema):** اگر هر یک از افزونه‌های Yoast، Rank Math یا All in One SEO فعال باشند، موتور سئوی بومی ما (`class-seo-engine.php`) به‌طور خودکار متاتگ‌ها و اسکیماهای موازی را غیرفعال می‌کند تا از ایجاد Duplicate Schema در گوگل جلوگیری شود، اما فیلدهای اختصاصی اصناف (مانند پروانه وکالت یا مشخصات پزشک) را از طریق فیلترهای استاندارد به Rank Math و Yoast تزریق می‌نماید.

### ۲. همزیستی با افزونه‌های کش و بهینه‌سازی (WP Rocket, LiteSpeed Cache, FlyingPress)
- **پرهیز از شکستن جاوااسکریپت در Minification:**
  - تمام اسکریپت‌های حیاتی (مانند ارسال فرم آژاکسی و رزرو نوبت) با لایسنس و بدون وابستگی‌های متغیر در آبجکت جهانی `window.SedRazaviConfig` مقداردهی می‌شوند.
  - مسیرهای REST API و درخواست‌های نوتیفیکیشن به‌طور خودکار به لیست استثناهای کش (Cache Exclusions) اضافه می‌شوند تا هیچ درخواستی کش کاذب نشود.

### ۳. همزیستی با افزونه‌های ورود پیامکی (Digits, Persian Mobile, فرازاس‌ام‌اس، کاوه‌نگار)
- **استاندارد Adapter Pattern:** درگاه ورود OTP ما دارای وضعیت «حالت ادغام» است. اگر افزونه Digits نصب باشد، فرم‌های ورود قالب به‌صورت بومی به مودال و API دیجیتس سوئیچ می‌کنند و هیچ پیامک تکراری یا دیتابیس دومی ایجاد نمی‌شود.

### ۴. همزیستی با صفحه‌سازها (Elementor, Gutenberg, Bricks)
- **عدم بازنویسی هسته ادیتورها:** کدهای ما فقط از Action Hookها و Filter Hookهای رسمی (`elementor/widgets/register`, `init`, `block_categories_all`) استفاده می‌کنند. اگر المنتور غیرفعال شود، هیچ شورتکد خرابی در سایت باقی نمی‌ماند و بلوک‌های گوتنبرگ با ساختار بومی HTML جایگزین می‌شوند.

---

## د) چرخه نقد چندتخصصی دور ششم (Sixth Multi-Discipline Review Cycle)

### نقد کارشناس ارشد یکپارچه‌سازی و اکوسیستم وردپرس (WordPress Interoperability Lead)
* **نقد وارد شده:** اگر دو پلاگین مختلف همزمان به یک هوک مثل `wp_mail` یا رخداد ارسال فرم وصل شوند، ممکن است پیامک‌های تکراری ارسال شود یا یکی از پلاگین‌ها رویداد دیگری را لغو کند.
* **راهکار قطعی:** تعریف سیستم صف و بازرسی وضعیت (Deduplication Flag): برای هر پیامک یا اعلان، یک `event_id` یکتا تولید می‌شود و پیش از شلیک بررسی می‌گردد تا از ارسال تکراری در فاصله کمتر از ۳ دقیقه جلوگیری شود.

### نقد مهندس ارشد کنترل کیفیت و امنیت جریان داده (QA & Data Pipeline Architect)
* **نقد وارد شده:** آیا اگر هاست از سرورهای لایت‌اسپید با کش ESI استفاده کند، نوتیفیکیشن‌های پیشخوان برای کاربران مختلف جابجا نمی‌شود؟
* **راهکار قطعی:** تمام اطلاعات نوتیفیکیشن‌ها و توکن‌های نشست به‌صورت خصوصی (Private Cache Hole) و از طریق درخواست هدرهای استاندارد `X-WP-Nonce` از کش مرورگر و وب‌سرور معاف می‌شوند.

---

## ه) مسترپرامپت الحاقی v13.0 (Zero-Conflict & Smart Routing Master Prompt)

```text
سند معماری SedRazavi OS را به نسخه v13.0 Zero-Conflict Architecture ارتقا بده. این نسخه بر پیاده‌سازی سیستم عصبی اعلانات نقش‌محور، تضمین سازگاری کامل با استانداردهای Overedge.dev، و معماری همزیستی مسالمت‌آمیز با تمامی پلاگین‌های رسمی وردپرس تمرکز دارد.

۱. سیستم توزیع هوشمند اعلانات (Granular Notification Routing):
کلاس `class-notification-router.php` را ایجاد کن. بر اساس نوع رخداد (رزرو وقت، خرید، نظر، پیام فرم، هشدار نفوذ)، اعلان را فقط به نقش‌های مجاز (ادمین، مالک، کادر تخصصی، نویسنده) در کانال‌های تعیین‌شده (پیامک، زنگوله ادمین، ایمیل، وب‌هوک) مخابره کن.

۲. تضمین استانداردهای Overedge.dev و FSE:
تمام ساختار تم را طبق سلسله‌مراتب رسمی وردپرس و تمپلیت‌های FSE/Classic سازمان‌دهی کن. از ایزوله بودن کانتینرهای بصری، ثبت دارایی‌ها با `wp_enqueue_script` استاندارد و نبود تداخل با کدهای ادمین‌بار اطمینان حاصل کن.

۳. سازگاری خودکار با افزونه‌های ثالث (Zero-Conflict Adapters):
کلاس `class-plugin-compatibility.php` را پیاده‌سازی کن:
- در صورت فعال بودن Yoast/Rank Math، اسکیماهای بومی موازی را به‌طور خودکار قطع کن تا سئو دچار دوگانگی نشود.
- درخواست‌های REST و پینگ‌های اعلانات را از کش لایت‌اسپید، راکت و کش‌های سروری مستثنی کن.
- در صورت وجود Digits، فرم ورود پیامکی را با Digits API همگام کن.
```


---

# ۱۷. نسخه ۱۴.۰: مهندسی نصب‌پذیری تضمینی، بازتولید ساختار فایل‌ها، پورتال چندرسانه‌ای و استانداردهای Neve & Spectra (SedRazavi OS v14.0 Enterprise Ultimate)

## الف) واکاوی ریشه‌ای علل شکست نصب زیپ‌ها در وردپرس و بازطراحی GitHub Actions

### ۱. چرا وردپرس خطای «پوشه فاقد پوسته معتبر است» یا «افزونه نصب نشد» می‌داد؟
بررسی ساختار پیشین آرتیفکت‌های گیت‌هاب نشان داد:
- **تودرتویی نادرست پوشه‌ها (Directory Nesting Flaw):** زیپ‌ها پوشه ریشه اضافه داشتند (مثلاً `build/sedrazavi-theme/sedrazavi-theme/style.css`). هسته وردپرس مستقیماً پوشه اول بعد از اکسترکت را چک می‌کند؛ اگر `style.css` در عمق ۲ باشد، خطای نبود استایل‌شیت صادر می‌شود.
- **تجمع صد زیپ در یک زیپ تکی:** ورک‌فلو به جای تولید چند فایل Release مشخص، کل خروجی را در یک `artifacts.zip` حجیم بسته‌بندی می‌کرد که قابل آپلود مستقیم در صفحه «افزودن پوسته» یا «افزودن افزونه» وردپرس نبود.
- **هدرهای ناقص در فایل اصلی:** نبود هدر استاندارد `/* Theme Name: ... */` در خط ۱ فایل `style.css` یا نبود هدر `/* Plugin Name: ... */` در فایل ریشه افزونه.

### ۲. استاندارد بسته‌بندی قطعی و بدون خطای وردپرس (Zero-Failure Packaging Standard)
هر آرتیفکت باید در بالاترین لایه (Root Level) دقیقاً یک پوشه با نام اسلاگ خود داشته باشد:
- `sedrazavi-theme.zip` حاوی پوشه ریشه `sedrazavi-theme/` و بلافاصله داخل آن `style.css`, `index.php`, `functions.php`.
- `sedrazavi-companion.zip` حاوی پوشه ریشه `sedrazavi-companion/` و بلافاصله داخل آن `sedrazavi-companion.php`.
- `sedrazavi-addons.zip` حاوی پوشه ریشه `sedrazavi-addons/` و بلافاصله داخل آن `sedrazavi-addons.php`.
- بسته‌های چایلدتم‌ها به‌صورت مجزا: `sedrazavi-child-agency.zip`، `sedrazavi-child-legal.zip`، `sedrazavi-child-store.zip`، و ...

---

## ب) درخت دقیق و چینش جامع فایل‌های پروژه (Canonical Project Directory Tree)

```text
Sedrazavi-WPtemplate/
├── .github/
│   └── workflows/
│       └── build-and-release.yml        # ورک‌فلو تصحیح‌شده با تولید زیپ‌های مستقل و تست نصب خودکار
├── sedrazavi-theme/                    # ۱. پوسته والد مستقل (Pure Neutral Parent Theme)
│   ├── style.css                       # هدر رسمی پوسته + متغیرهای پایه CSS
│   ├── index.php                       # تمپلیت پشتیبان گوتنبرگ و بلاگ
│   ├── functions.php                   # لود دارایی‌ها، رجیستر مکان‌های فهرست و ابزارک‌ها
│   ├── header.php                      # هدر کپسولی شناور شیشه‌ای + داک کناری
│   ├── footer.php                      # ۹ مدل فوتر ماژولار + اپ‌بار موبایل
│   ├── single.php                      # تمپلیت نوشته و رسانه‌ها
│   ├── archive.php                     # تمپلیت آرشیو بلاگ و نمونه‌کارها
│   ├── 404.php                         # صفحه خطای ۴۰۴ گرافیکی تعاملی
│   ├── theme.json                      # استانداردهای مدرن Full Site Editing (FSE)
│   ├── screenshot.png                  # پیش‌نمایش رسمی تم در پیشخوان (1200x900)
│   ├── templates/                      # قالب‌های اختصاصی صفحات
│   │   ├── template-canvas.php         # صفحه تمام‌عرض خالی برای المنتور
│   │   ├── template-video.php          # صفحه اختصاصی استریم ویدیو با پلیر مدرن
│   │   ├── template-podcast.php        # صفحه پخش پادکست و صوت با Waveform
│   │   └── template-storefront.php     # صفحه اصلی اختصاصی فروشگاه و حراج
│   └── assets/
│       ├── css/                        # استایل‌های بهینه‌شده و Tree-shaken
│       └── js/                         # اسکریپت‌های سبک هدر، موشن و منو
├── sedrazavi-companion/                # ۲. افزونه هسته و موتور اجرایی (Core Engine Plugin)
│   ├── sedrazavi-companion.php         # فایل اصلی افزونه با بررسی پیش‌نیازها و فعال‌سازی
│   ├── includes/
│   │   ├── class-admin-dashboard.php   # پیشخوان متمرکز تک‌منو (الهام از Neve & Spectra)
│   │   ├── class-demo-importer.php     # ایمپورتر بومی المنتور و گوتنبرگ با Recipe Ledger
│   │   ├── class-design-tokens.php     # مدیریت پالت‌های رنگی و اتصال به theme.json و المنتور
│   │   ├── class-vector-patterns.php   # موتور تولید وکتور بک‌گراند بدون فایل (زیر ۲KB)
│   │   ├── class-seo-engine.php        # موتور سئوی بومی JSON-LD، OpenGraph و Breadcrumbs
│   │   ├── class-notification-router.php # سیستم توزیع اعلانات نقش‌محور (پیامک، زنگوله، ایمیل، وب‌هوک)
│   │   ├── class-modern-comments.php   # هاب مدرن نظرات آژاکسی با بج خریدار تأییدشده
│   │   ├── class-role-manager.php      # مدیریت دسترسی چندنقشی (RBAC) و پنل‌های ایزوله
│   │   ├── class-media-player.php      # ماژول پلیر اختصاصی ویدیو و صوت
│   │   ├── class-woocommerce-kit.php   # ماژول بهینه‌ساز فروشگاه، درگاه‌ها و سبد خرید شناور
│   │   └── class-diagnostic.php        # ابزار پزشک سایت (Self-Healing با یک کلیک)
│   └── templates/                      # تمپلیت‌های فرانت‌اند پیشخوان و نوتیفیکیشن‌ها
├── sedrazavi-addons/                   # ۳. افزونه ویجت‌ها و پست‌تایپ‌ها (Custom Post Types & Widgets)
│   ├── sedrazavi-addons.php            # فایل ریشه افزونه ادآن‌ها
│   ├── post-types/                     # پست‌تایپ‌های تخصصی اصناف
│   │   ├── cpt-services.php            # خدمات
│   │   ├── cpt-portfolio.php           # نمونه‌کارها
│   │   ├── cpt-team.php                # اعضای تیم و متخصصان
│   │   ├── cpt-courses.php             # دوره‌های آموزشی
│   │   └── cpt-cases.php               # پرونده‌ها و پروژه‌ها
│   └── elementor-widgets/              # ویجت‌های بومی المنتور مبتنی بر Container
│       ├── widget-hero-slider.php      # هیروسکشن تعاملی با بج و انیمیشن
│       ├── widget-team-grid.php        # کارت‌های اعضای تیم و رزومه شناور
│       ├── widget-pricing-matrix.php   # جدول مقایسه تعرفه‌ها با سوئیچر
│       └── widget-media-player.php     # ویجت پلیر ویدیو و پادکست
└── child-themes/                       # ۴. چایلدتم‌های تخصصی اصناف (Niche Child Themes)
    ├── sedrazavi-child-agency/         # چایلدتم آژانس و طراح
    ├── sedrazavi-child-legal/          # چایلدتم وکالت و حقوقی
    ├── sedrazavi-child-clinic/         # چایلدتم کلینیک و دندانپزشکی (مانند Aurora Dental)
    ├── sedrazavi-child-store/          # چایلدتم فروشگاهی مدرن
    └── sedrazavi-child-education/      # چایلدتم آموزشی و فروش اشتراک
```

---

## ج) الهام‌گیری از معماری و استانداردهای Neve و Spectra

برای دستیابی به نهایت کارایی و رضایت طراح سایت، از دو الگوی مطرح بین‌المللی الهام گرفته شد:

### ۱. درس‌های معماری از قالب Neve (Themeisle):
- **تک‌منوی پیشخوان و حذف شلوغی:** به جای ایجاد ۱۰ زیرمنوی پراکنده در ادمین وردپرس، یک هاب متمرکز با نام `SedRazavi OS` در منوی اصلی قرار می‌گیرد که تمامی بخش‌ها (شخصی‌سازی، فعال‌سازی ماژول‌ها، کاتالوگ و مستندات) را در یک پنل تک‌صفحه‌ای React/Tailwind بسیار تمیز و سبک مدیریت می‌کند.
- **موتور استارتر سایت ابری (Cloud Template Hub):** پیش‌نمایش زنده‌ی قالب‌ها قبل از ایمپورت با قابلیت انتخاب اجزای دلخواه (فقط صفحات، فقط ویجت‌ها، یا فقط پالت رنگی).

### ۲. درس‌های معماری از افزونه Spectra (Brainstorm Force):
- **سامانه مدیریت ماژولار بلوک‌ها (Block/Widget Manager):** طراح می‌تواند هر ویجت یا ماژولی را که در پروژه نیاز ندارد، با یک کلیک خاموش کند تا حتی یک خط CSS یا JS اضافه در سایت لود نشود.
- **پیش‌تنظیم‌های بصری با یک کلیک (Visual Preset Picker):** برای هر سکشن و المان، ۵ پیش‌تنظیم آماده طراحی (Minimal, Glassmorphism, Dark Neon, Bento, Luxury Gold) ارائه می‌شود تا بدون اتلاف وقت استایل موردنظر اعمال شود.

---

## د) پورتال‌های چندرسانه‌ای و فروشگاهی اختصاصی (Media & Storefront Engine)

۱. **برگه و تمپلیت اختصاصی ویدیو (Video Stream Template):**
   - پلیر اختصاصی بدون نیاز به افزونه با سرعت پخش (0.75x تا 2x)، نشانه‌گذاری فصل‌های ویدیو (Video Chapters)، دانلود فایل در کیفیت‌های مختلف، و ثبت مدت‌زمان تماشاشده برای اعضای ویژه.

۲. **برگه و پلیر اختصاصی صوت و پادکست (Podcast & Audio Template):**
   - ویژوالایزر موج صدا (Waveform Visualizer)، دکمه رد کردن ۱۰ ثانیه‌ای، فهرست اپیزودها، و لینک‌های دسترسی سریع به کست‌باکس، اسپاتیفای و شنوتو.

۳. **سوئیت فروشگاهی ووکامرس بدون تداخل (Modern Storefront Suite):**
   - **سبد خرید کشویی شناور (Slide-over Drawer Cart):** نمایش سبد خرید بدون لود صفحه جدید، نوار پیشرفت ارسال رایگان (Free Shipping Progress Bar)، و تسویه‌حساب مرحله‌ای بهینه برای موبایل.
   - **کارت محصول تعاملی:** پیش‌نمایش سریع (Quick View)، برچسب تخفیف متحرک، دکمه افزودن سریع، و گالری تعویض رنگ بدون رفرش.

۴. **سکشن‌های هویت تیم و مالک سایت (Team & Founder Bento Section):**
   - سکشن معرفی مدیر و تیم با کارت‌های مدرن بنتو، لینک‌های شبکه‌های اجتماعی با افکت شناور، تخصص‌ها، رزومه مختصر و دکمه اتصال مستقیم به پیام‌رسان‌ها (واتساپ/تلگرام/بله/ایتا).

---

## ه) چرخه نقد چندتخصصی دور هفتم (Seventh Multi-Discipline Review Cycle)

### نقد مهندس ارشد استانداردسازی و بسته‌بندی وردپرس (Packaging & Distribution Lead)
* **نقد وارد شده:** اگر در اکشنز گیت‌هاب دستور زیپ‌کردن به درستی اجرا نشود و پوشه اصلی شامل فایل‌های مخفی گیت (`.git`, `.github`, `.DS_Store`, `node_modules`) باشد، حجم فایل‌ها به بیش از ۵۰ مگابایت می‌رسد و هاست‌های با آپلود محدود خطای حجم می‌دهند.
* **راهکار قطعی:** تعریف دقیق فایل `.gitattributes` و استفاده از دستور `zip -r -q {pkg_name}.zip {slug}/ -x "*.git*" "*node_modules*" "*.DS_Store*"` تا حجم هر پوسته و افزونه زیر ۲ مگابایت باقی بماند و کاملاً سبک دانلود و نصب شود.

### نقد مدیر فروش و مارکتینگ دیجیتال و وفاداری کاربر (Conversion Rate & E-Commerce Lead)
* **نقد وارد شده:** فروشگاه‌های اینترنتی در ایران اگر دکمه پرداخت سریع در موبایل (Sticky Add-to-Cart) نداشته باشند، نرخ انصراف بالایی دارند.
* **راهکار قطعی:** نوار چسبان خرید سریع در پایین صفحه محصول در نسخه موبایل تعبیه شد که همزمان با اسکرول فعال شده و قیمت، تنوع و دکمه خرید را بدون نیاز به بازگشت به بالای صفحه در دسترس کاربر قرار می‌دهد.

---

## و) مسترپرامپت الحاقی v14.0 (Zero-Failure Packaging & Media Storefront Master Prompt)

```text
سند معماری SedRazavi OS را به نسخه نهایی v14.0 Enterprise Ultimate ارتقا بده. این نسخه بر بسته‌بندی تضمینی زیپ‌ها بدون خطای وردپرس، پیاده‌سازی درخت جامع فایل‌ها، هاب متمرکز تک‌منوی الهام‌گرفته از Neve و Spectra، تمپلیت‌های ویدیو و پادکست و پورتال فروشگاهی متمرکز است.

۱. بسته‌بندی قطعی در GitHub Actions:
ورک‌فلو `.github/workflows/build-and-release.yml` را طوری تنظیم کن که دقیقاً فایل‌های مجزای زیر را با ساختار ریشه بدون لایه اضافه تولید کند:
- `sedrazavi-theme.zip` (پوشه اصلی sedrazavi-theme/)
- `sedrazavi-companion.zip` (پوشه اصلی sedrazavi-companion/)
- `sedrazavi-addons.zip` (پوشه اصلی sedrazavi-addons/)
- زیپ‌های مجزا برای هر چایلدتم در دایرکتوری child-themes/
فایل‌های `.git`, `node_modules` و فایل‌های زائد از بسته‌بندی حذف شوند.

۲. پیشخوان متمرکز تک‌منو (الهام از Neve & Spectra):
کلاس `class-admin-dashboard.php` را به عنوان یک تک‌منوی اصلی به نام `SedRazavi OS` پیاده‌سازی کن و از ایجاد ۱۰ زیرمنوی پراکنده در ادمین وردپرس خودداری نما. این صفحه باید دارای تب‌های روشن/خاموش کردن ماژول‌ها، کاتالوگ ابری، تنظیمات رنگ و برندینگ، و ابزار Self-Healing باشد.

۳. تمپلیت‌های چندرسانه‌ای (Video & Podcast Templates):
فایل‌های `template-video.php` و `template-podcast.php` را با پلیرهای HTML5 مدرن، کنترل سرعت، موج صدای ویژوال و فصل‌بندی ویدیو تدوین کن.

۴. سوئیت پیشرفته ووکامرس:
کلاس `class-woocommerce-kit.php` را با سبد خرید کشویی بدون رفرش (Slide-over Cart)، دکمه خرید چسبان موبایل (Sticky Add-to-Cart)، و هماهنگی کامل با درگاه‌های بانکی و پالت رنگی قالب پیاده‌سازی کن.
```


---

# ۱۸. نسخه ۱۵.۰: معیارهای پذیرش آزمون‌پذیر، مهندسی ضدشکست بسته‌بندی، فازبندی فروشگاه و شبکه اعلانات ۲.۰ (SedRazavi OS v15.0 Enterprise Final Masterwork)

## الف) معیارهای پذیرش کاملاً آزمون‌پذیر (Testable Definition of Done - DoD)

برای حذف هرگونه ابهام و اطمینان از کیفیت نهایی، هر بخش دارای تست‌های خودکار و دستی شفاف است:

### ۱. معیار پذیرش نصب‌پذیری ZIPها در وردپرس (Packaging & Installation DoD)
- **آزمون نصب با WP-CLI:** اجرای دستور `wp theme install sedrazavi-theme.zip --activate` و `wp plugin install sedrazavi-companion.zip --activate` باید با کد خروجی ۰ و بدون هیچ پیغام Warning یا Notice انجام شود.
- **آزمون رابط کاربری ادمین (Admin Upload Test):** در نسخه رسمی WordPress 6.4 تا 6.7، آپلود فایل از مسیر «نمایش > پوسته‌ها > افزودن» بدون خطای «پوشه فاقد پوسته معتبر است» ظرف کمتر از ۵ ثانیه نصب و فعال شود.
- **سقف حجم فایل (Artifact Size Budget):** حجم هر فایل ZIP نباید از ۳ مگابایت فراتر رود (جهت سازگاری با هاست‌های اشتراکی و محدودیت `upload_max_filesize`).

### ۲. معیار سازگاری PHP و پایگاه‌داده (PHP & Database DoD)
- **پوشش نسخه‌های PHP:** اجرای PHPStan در سطح Level 8 روی تمامی کدهای PHP برای نسخه‌های PHP 7.4, 8.0, 8.1, 8.2, 8.3 بدون حتی یک ارور Deprecated یا Type Mismatch.
- **بهینه‌سازی دیتابیس (Zero Slow Queries):** تمام کوئری‌های جداول سفارشی (نوتیفیکیشن‌ها و لاگ‌ها) باید دارای Index روی کلیدهای پرکاربرد باشند و اجرای آن‌ها زیر ۱۵ میلی‌ثانیه زمان ببرد. دستور `SHOW FULL PROCESSLIST` نباید هیچ کوئری قفل‌شده‌ای نشان دهد.

### ۳. معیار پذیرش کیفیت رابط کاربری و عملکرد (UI/UX & Core Web Vitals DoD)
- **معیار LCP و CLS:** زمان Largest Contentful Paint در هاست معمولی زیر ۱.۸ ثانیه و Cumulative Layout Shift دقیقاً ۰.۰۰ باشد.
- **کنتراست و دسترس‌پذیری:** انطباق ۱۰۰٪ تمامی پالت‌های رنگی تولیدشده با استاندارد WCAG 2.1 سطح AA و برای متون اصلی سطح AAA (حداقل نسبت کنتراست ۴.۵:۱ برای متن عادی و ۷:۱ برای تیترها).
- **واکنش‌گرایی واقعی (True Responsiveness):** بدون شکستگی در عرض‌های ۳۲۰px (موبایل‌های کوچک)، ۳۷۵px، ۴۱۴px، ۷۶۸px (تبلت)، ۱۰۲۴px، ۱۴۴۰px و ۴K.

### ۴. معیار پذیرش سوئیت فروشگاهی ووکامرس (WooCommerce Performance DoD)
- **سبد خرید کشویی (Slide-over Cart):** باز شدن و افزودن محصول به سبد بدون رفرش با تأخیر کمتر از ۱۵۰ میلی‌ثانیه.
- **نوار چسبان خرید موبایل (Sticky Mobile CTA):** پس از اسکرول به میزان ۳۰۰ پیکسل از دکمه اصلی خرید ظاهر شده و بدون تداخل با اپ‌بار پایینی کار کند.

---

## ب) سناریوهای شکست محتمل در ساخت ZIPها و آزمون‌های پیشگیرانه در CI (Packaging Failure Modes & Pre-flight Assertions)

| سناریوی شکست (Failure Mode) | علت فنی در سیستم | آزمون پیشگیرانه خودکار در GitHub Actions |
| :--- | :--- | :--- |
| **۱. تودرتویی عمقی (Deep Nesting)** | زیپ کردن پوشه والد به جای محتوا (مسیر theme/theme/style.css) | بررسی وجود style.css دقیقاً در عمق ۱ با دستور unzip |
| **۲. نبود یا خرابی هدر تم/پلاگین** | فراموشی هدر رسمی یا کاراکترهای مخفی BOM | اعتبارسنجی regex خط اول فایل با کدهای استاندارد |
| **۳. نشت فایل‌های توسعه (Dev Leakage)** | وجود node_modules, .git, .env در زیپ نهایی | بررسی خودکار عدم وجود مسیرهای ممنوعه در آرشیو |
| **۴. مسیرهای بک‌اسلش در ویندوز** | تولید ZIP در رانر ویندوز با بک‌اسلش | استفاده قطعی از رانر ubuntu-latest در گیت‌هاب اکشنز |
| **۵. حجم غیرمجاز (Bloat Overflow)** | عدم فشرده‌سازی دارایی‌ها و رسیدن به حجم بالا | گیت بررسی حجم فایل‌ها و شکست بیلد در صورت عبور از ۳MB |

---

## ج) جزئیات معماری پیشخوان متمرکز (SedRazavi OS Hub) بر اساس سطوح کاربری

```text
+---------------------------------------------------------------------------------------+
|  [Logo] SedRazavi OS Hub                                         [Role: Super Admin]  |
+---------------------------------------------------------------------------------------+
|  [Tab 1: Modules & Blocks]  |  [Tab 2: Cloud Kits]  |  [Tab 3: Styling]  | [Doctor]   |
+---------------------------------------------------------------------------------------+
|  ماژول‌های فعال (Toggle System):                                                       |
|  [ON]  موتور سئوی بومی (JSON-LD Schemas)             [ON]  سبد خرید کشویی ووکامرس       |
|  [ON]  سیستم اعلان‌های چندکاناله                    [OFF] پلیر تخصصی پادکست و موج صدا  |
|  [ON]  مگامنوهای شناور و هدر جزیره‌ای                 [ON]  پالت‌های هوشمند رنگ ریاضیاتی  |
|                                                                                       |
|  کلیدهای سریع اقدام:                                                                  |
|  [ همگام‌سازی کاتالوگ GitHub ]     [ پاکسازی کش و بازسازی CSS ]     [ حالت تحویل پروژه ]    |
+---------------------------------------------------------------------------------------+
```

### تفکیک تجربه ادمین بر اساس دسترسی:
۱. **برای توسعه‌دهنده (Super Admin):** نمایش کامل لاگ‌های سرور، ابزار عیب‌یابی خودکار (Self-Healing)، مدیریت توکن‌های CSS و کاتالوگ ابری.
۲. **برای مدیر فروشگاه / مالک کسب‌وکار (Store Owner / CEO):** داشبورد مالی و آمار لیدها، مدیریت شارژ پیامک، لیست نوبت‌ها، تنظیمات تخفیف‌ها و گزارش دیدگاه‌ها؛ بدون گزینه‌های تغییر کد یا دستکاری قالب.
۳. **برای نویسندگان و تولیدکنندگان محتوا (Editorial & Authors):** پنل ساده ارسال نوشته با نمره سئوی درون‌برنامه‌ای، بارگذاری پادکست/ویدیو، و پاسخ‌دهی به نظرات کاربران همان نوشته.
۴. **برای کارشناسان و کادر تخصصی (Doctors, Lawyers, Instructors):** تقویم نوبت‌های رزروشده، ارسال نسخه یا لایحه، مشاهده دانشجویان ثبت‌نام‌شده در دوره‌های خود.

---

## د) فازبندی اجرایی اولویت‌بندی‌شده (Phased Implementation Roadmap)

```text
[فاز ۱: هسته و پکیجینگ بدون خطا] ---> [فاز ۲: هاب پیشخوان و دسترسی RBAC]
             |                                          |
             v                                          v
[فاز ۳: پورتال چندرسانه‌ای و مقالات] <--- [فاز ۴: سوئیت فروشگاهی و سبد کشویی]
             |
             v
[فاز ۵: شبکه اعلانات ۲.۰ و اتوماسیون سراسری]
```

- **فاز ۱ (Core & Zero-Failure Packaging):** تصحیح کامل فایل ورک‌فلو `.github/workflows/build-and-release.yml` با آزمون‌های پیشگیرانه؛ تضمین نصب‌پذیری پوسته‌ها و افزونه‌ها در وردپرس خام.
- **فاز ۲ (Unified Admin Hub & RBAC):** پیاده‌سازی کلاس `class-admin-dashboard.php` به صورت تک‌منو همراه با سیستم مدیریت ماژول‌ها و اعمال سطوح دسترسی ۴ گانه.
- **فاز ۳ (Rich Media & Content Suite):** ساخت تمپلیت‌های اختصاصی استریم ویدیو با پلیر مدرن و برگه اختصاصی پادکست با ویژوالایزر امواج صوتی.
- **فاز ۴ (WooCommerce High-Conversion Storefront):** پیاده‌سازی سبد خرید کشویی شناور (Slide-over Drawer Cart)، نوار خرید چسبان موبایل، و کارت‌های محصول تعاملی.
- **فاز ۵ (Notification Network 2.0):** راه‌اندازی کلاس روتینگ اعلانات با کانال‌های جایگزین (Failover)، سایلنت شبانه و الگوهای خدماتی پیامک ایران.

---

## ه) شبکه اعلانات ۲.۰: سیاست‌های ارتقا، سایلنت شبانه و الگوهای پیامک (Notification Network 2.0)

۱. **مکانیزم کانال جایگزین (Failover Delivery Pipeline):**
   اگر ارسال پیامک ظرف ۱۰ ثانیه با خطا مواجه شود یا سامانه پیامکی در دسترس نباشد، رویداد به‌طور خودکار به کانال دوم (ایمیل فوری دامنه) شیفت می‌کند و یک اعلان با اولویت زرد در پیشخوان مدیر ثبت می‌نماید تا هیچ لید یا خریدی از دست نرود.

۲. **ساعات سکوت و استراحت کادر (Do Not Disturb - DND Policy):**
   برای همکاران و کادر تخصصی (پزشکان، وکلا)، ساعت سکوت (مثلاً ۲۲:۰۰ الی ۰۸:۰۰) قابل تنظیم است؛ پیامک‌های غیربحرانی در این ساعات به صف انتظار منتقل شده و صبح روز بعد رأس ساعت کاری ارسال می‌شوند. پیامک‌های امنیتی ادمین از این قاعده مستثنی هستند.

۳. **الگوهای پترن پیامک خدماتی ایران (Iranian Service Patterns):**
   به جای ارسال پیامک‌های عادی با خطوط تبلیغاتی که مسدود می‌شوند، تمام پیام‌ها از متدهای پترن‌محور (Lookup/Pattern Based) سامانه‌های معتبر (کاوه‌نگار، فرازاس‌ام‌اس، نجوا) با متغیرهای کد پیگیری، نام کاربر و مبلغ ارسال می‌گردند تا تحویل زیر ۵ ثانیه حتی به شماره‌های بلک‌لیست تضمین شود.

---

## و) مسترپرامپت نهایی جامع v15.0 (Testable Enterprise Masterwork Prompt)

```text
سند معماری SedRazavi OS را به نسخه جامع v15.0 Enterprise Final Masterwork ارتقا بده. این نسخه شامل معیارهای پذیرش آزمون‌پذیر (DoD)، پیشگیری خودکار از شکست بسته‌بندی در CI، پیشخوان متمرکز چندنقشی، پورتال‌های چندرسانه‌ای و فروشگاهی، و شبکه اعلانات ۲.۰ است.

۱. مهندسی پکیجینگ و CI بدون خطا:
فایل `.github/workflows/build-and-release.yml` را با آزمون‌های پیشگیرانه بازنویسی کن:
- استخراج و اعتبارسنجی خودکار ساختار ریشه ZIPها (نبود دایرکتوری تودرتو).
- بررسی صحت هدرهای Theme Name و Plugin Name در فایل‌های اصلی.
- حذف قطعی دایرکتوری‌های توسعه (node_modules, .git, .env) و محدودیت سقف حجم زیر ۳ مگابایت.
- تست خودکار نصب و فعال‌سازی با WP-CLI در رانر لینوکس.

۲. پیشخوان متمرکز تک‌منو (SedRazavi OS Hub):
کلاس `class-admin-dashboard.php` را به عنوان یک هاب واحد طراحی کن:
- مدیریت روشن/خاموش کردن ماژول‌ها (سئو، فروشگاه، پلیر رسانه، اعلانات).
- تفکیک رابط کاربری برای توسعه‌دهنده، مدیر فروشگاه، تولیدکننده محتوا و کادر تخصصی.
- ابزار عیب‌یابی خودکار با یک کلیک (Self-Healing).

۳. سوئیت چندرسانه‌ای و ووکامرس:
- تمپلیت‌های اختصاصی ویدیو و پادکست را با پلیر HTML5، کنترل سرعت و Waveform پیاده‌سازی کن.
- سبد خرید کشویی بدون رفرش (Slide-over Cart) و دکمه چسبان خرید موبایل را در کلاس `class-woocommerce-kit.php` اضافه کن.

۴. شبکه اعلانات ۲.۰:
سیستم اعلانات را به مکانیزم کانال جایگزین (Failover به ایمیل در صورت خطای پیامک)، ساعات سکوت پرسنل (DND)، و الگوهای خدماتی پترن‌محور مجهز کن.
```


---

# ۱۹. نسخه ۱۶.۰: معماری تمام‌بعدی، ابعاد مغفول، بازیابی بحران و هویت تجاری آژانس (SedRazavi OS v16.0 Omniscient Enterprise Blueprint)

در این نسخه، کلیه لایه‌ها و ابعاد نادیده‌مانده یا کمتر پرداخته‌شده در نسخه‌های پیشین با جزئیات دقیق مهندسی، معماری داده و راهکارهای اجرایی مدون شده‌اند تا سیستم به یک سیستم‌عامل جامع و بی‌نقص برای طراحان وب، آژانس‌های دیجیتال و مشتریان نهایی تبدیل گردد.

---

## الف) واکاوی ابعاد مغفول و لایه‌های غایب در نسخه‌های قبلی (Deep Gap Analysis)

| بعد معماری | وضعیت در نسخه‌های قبلی | ریسک عملیاتی در دنیای واقعی | راهکار مهندسی در نسخه ۱۶.۰ |
| :--- | :--- | :--- | :--- |
| **۱. مدیریت بحران و بازگشت به عقب (Disaster Recovery & Atomic Rollback)** | درون‌ریزی دمو فقط متادیتا و صفحات را تزریق می‌کرد. | در صورت قطع اینترنت حین ایمپورت، خطای سرور یا تداخل با دیتای قبلی مشتری، سایت نیمه‌کاره شکسته می‌شد. | موتور ایمپورت تراکنشی با جدول `sr_snapshots`، پیش‌بررسی شبیه‌سازی (Dry-Run)، و بازگشت اتمیک با یک کلیک به نقطه صفر قبل از نصب دمو. |
| **۲. هویت بصری آژانس و وایت‌لیبل (Agency White-Label & Client Handover)** | نام و برند SedRazavi OS در منوها و پیشخوان نمایش داده می‌شد. | طراح سایت نمی‌توانست محصول را با برند رسمی آژانس خود به مشتری بفروشد یا دسترسی‌های خطرناک را از کارفرما پنهان کند. | موتور وایت‌لیبل کامل: تغییر نام، لوگوی لاگین، کپی‌رایت فوتر ادمین، مخفی‌سازی تب‌های حساس برای غیرسوپرادمین و ویجت اختصاصی آموزش ویدئویی کارفرما. |
| **۳. صیانت حقوقی از دستمزد طراح (Designer Contract & Milestone Protection)** | هیچ سازوکار فنی برای کارفرمایان بدحساب یا عدم تسویه فاز نهایی وجود نداشت. | طراح بعد از آپلود سایت روی هاست کارفرما، اهرم فشاری برای دریافت تسویه حساب نهایی نداشت و حذف دستی کد پیگرد قانونی داشت. | حالت «حفاظت از قرارداد (Graceful Milestone Mode)»: امکان فعال‌سازی حالت پیش‌نمایش مشروط (Watermark امن یا قفل موقت ویرایش) بدون تخریب سایت یا آسیب به داده‌ها. |
| **۴. موتور تایپوگرافی بومی و تقویم شمسی (Typography & Dual-Calendar Engine)** | اتکا به فونت‌های استاتیک یا پلاگین‌های جانبی حجیم بدون استاندارد Core Web Vitals. | خطای جابجایی چیدمان (CLS)، تاخیر بارگذاری وب‌فونت (FOIT)، و نیاز اجباری به نصب افزونه‌های سنگین جلالی/شمسی. | هاستینگ محلی ۱۰۰٪ فونت‌های فارسی (ایران‌یکان، وزیرمتن، دانا، شبنم) با فرمت WOFF2، بهینه‌سازی `font-display: swap` و موتور تقویم دوگانه جلالی-میلادی بومی سبک بدون افت سرعت. |
| **۵. جستجوی زنده آنی و ناوبری سریع (CMD+K Instant Search & Launcher)** | فقط فرم جستجوی پیش‌فرض وردپرس و بدون پوشش دوره‌ها، فایل‌ها و محصولات. | کاربر برای یافتن فایل یا دوره باید کل سایت را رفرش می‌کرد؛ مدیر هم در پیشخوان برای دسترسی به تنظیمات سردرگم می‌شد. | هاب جستجوی زنده ایجکس در فرانت‌اند با کش محلی IndexedDB، و پرتاب‌گر سریع کلید میانبر CMD+K در پیشخوان ادمین برای پرش فوری به هر صفحه یا تنظیم. |
| **۶. استایلر بصری ایمیل‌ها و پیامک‌های تراکنشی (Transactional Email & SMS Visual Styler)** | قالب‌های پیش‌فرض ایمیل ووکامرس/وردپرس قدیمی و غیرمنطبق با دیزاین توکن‌ها بود. | هویت بصری برند در ایمیل‌های فاکتور و ثبت‌نام می‌شکست و پیامک‌ها الگوهای نامشخص داشتند. | موتور قالب‌بندی بصری ایمیل با پشتیبانی از پالت رنگی داینامیک، و ویرایشگر پیش‌نمایش پیامک‌های خدماتی با توکن‌های پترن معتبر. |
| **۷. وب‌هوک‌های دوطرفه و آمادگی اپلیکیشن موبایل (REST API & Headless Webhooks)** | اتوماسیون‌ها فقط در داخل هسته وردپرس اجرا می‌شدند. | عدم امکان اتصال به نرم‌افزارهای حسابداری، اپلیکیشن‌های موبایل (Flutter/React Native)، یا سناریوهای n8n و Make. | اندپوینت‌های اختصاصی `/wp-json/sedrazavi/v1/` با احراز هویت امن JWT و سیستم وب‌هوک‌های خروجی و ورودی امضاشده با HMAC SHA-256. |

---

## ب) چرخه نقد و پالایش تخصصی دور هشتم (Eighth Multi-Discipline Review Cycle)

پنج متخصص ارشد بین‌المللی این ابعاد جدید را به بوته نقد کشیدند تا تمامی زوایای تاریک و خطاهای احتمالی شناسایی و مهار شوند:

### ۱. نقد معمار ارشد پایگاه‌داده و بازیابی بحران (Lead Database & Disaster Recovery Architect)
> **نقد صریح:**
> «ایده اسنپ‌شات اتمیک عالی است، اما در هاست‌های اشتراکی با منابع محدود (مانند رم ۱۲۸ مگابایت یا حداکثر زمان اجرای ۳۰ ثانیه)، اکسپورت کل پایگاه داده یا کپی فایل‌های سنگین باعث خطای `Fatal Error: Maximum execution time exceeded` یا سرریز حافظه می‌شود. همچنین اگر رول‌بک ناقص انجام شود، پایگاه داده در وضعیت نامعتبر (Inconsistent State) رها خواهد شد.»
>
> **راهکار تثبیت‌شده و ضدشکست:**
> - اسنپ‌شات تنها جداول و رکوردهایی را ذخیره می‌کند که توسط ایمپورتر لمس می‌شوند (`wp_posts`, `wp_postmeta`, `wp_options` مرتبط با SedRazavi OS)، نه کل دیتابیس ۵۰۰ مگابایتی.
> - عملیات در چانک‌های (Chunks) کوچک ایجکس با پایش محدودیت زمانی و حافظه (`memory_get_usage`) انجام می‌شود.
> - ذخیره فرآیند در جدول تراکنشی اتمیک؛ اگر خطایی رخ دهد، ترنزکشن بلافاصله Rollback شده و رکوردها دست‌نخورده باقی می‌مانند.

### ۲. نقد مهندس ارشد بومی‌سازی و تایپوگرافی وب (Localization & Typography Lead)
> **نقد صریح:**
> «بسیاری از طراحان هنگام استفاده از فونت‌های فارسی، فایل‌های حجیم TTF یا WOFF با چندین وزن اضافه بارگذاری می‌کنند که منجر به FOUT (پرش فونت بدون استایل) و افت نمره PageSpeed می‌شود. همچنین فیلتر کردن توابع تاریخ وردپرس برای شمسی‌سازی در صورتی که با هسته ووکامرس تداخل کند، گزارش‌های مالی و فیلترهای تاریخی سفارشات را دچار خطای محاسباتی ۱ روزه در سال‌های کبیسه می‌کند.»
>
> **راهکار تثبیت‌شده و ضدشکست:**
> - سیستم تنها فایل‌های استاندارد `WOFF2 Variable` را بارگذاری کرده و زیرمجموعه‌سازی (Font Subsetting) برای کاراکترهای ضروری فارسی، عربی و انگلیسی فعال می‌شود (کاهش حجم از ۳۰۰ کیلوبایت به زیر ۴۵ کیلوبایت).
> - تعریف استراتژی `font-display: swap` همراه با تعریف `@font-face` اختصاصی در هدر برای جلوگیری کامل از پرش چیدمان (CLS = 0).
> - در موتور تاریخ شمسی، تاریخ ذخیره‌شده در دیتابیس همواره استاندارد بین‌المللی میلادی (UTC MySQL Timestamp) باقی می‌ماند و تنها لایه رندر نمایشی فرانت‌اند و پیشخوان با الگوریتم دقیق خیامی-بیرونی به شمسی تبدیل می‌شود؛ بنابراین گزارش‌های مالی ووکامرس هرگز دچار خطای محاسباتی نخواهند شد.

### ۳. نقد مدیر ارشد عملیات آژانس‌ها و تجاری‌سازی (Agency Operations & Commercial Strategy Director)
> **نقد صریح:**
> «اگر ویژگی وایت‌لیبل پیچیده باشد، طراح به جای صرفه‌جویی در زمان، ساعت‌ها درگیر تنظیمات ادمین می‌شود. از سوی دیگر، سازوکار صیانت از تسویه‌حساب طراح اگر غیرحرفه‌ای باشد و سایت مشتری ناگهان از کار بیفتد، مشتری می‌تواند به دلیل قطعی غیرمجاز شکایت کند یا کدهای طراح را دور بزند.»
>
> **راهکار تثبیت‌شده و ضدشکست:**
> - وایت‌لیبل با یک فرم ساده سه‌فیلدی (نام برند آژانس، لوگوی پیشخوان، متن کپی‌رایت) فعال می‌شود و تمام ردپاهای سیستم‌عامل در کسری از ثانیه تغییر نام می‌یابند.
> - سازوکار صیانت از قرارداد، بر مبنای قرارداد رسمی و توافق طرفین طراحی شده است: سیستم سایت را قطع نمی‌کند، بلکه تنها بخش تغییر تنظیمات تخصصی را به حالت "حالت بازبینی پروژه (Client Review Mode)" درآورده و یک نوار باریک غیرمخرب با متن "نسخه دمو و تاییدیه کارفرما" نمایش می‌دهد که پس از ثبت کلید تسویه طراح، به‌طور دائمی برداشته می‌شود.

### ۴. نقد مدیر ارشد امنیت، حریم خصوصی و ممیزی داده (Chief Compliance & Audit Officer)
> **نقد صریح:**
> «وقتی درگاه‌های پرداخت، اطلاعات تماس، دوره‌های آموزشی و سفارشات در سیستم ثبت می‌شوند، نبود سیستم لاگ فعالیت‌ها (Audit Trail) باعث می‌شود در صورت تغییر مشکوک موجودی یا حذف اشتباهی صفحات توسط پرسنل کارفرما، طراح سایت مقصر شناخته شود. همچنین ذخیره توکن‌های API بدون رمزنگاری ریسک بالایی دارد.»
>
> **راهکار تثبیت‌شده و ضدشکست:**
> - اضافه شدن جدول فوق‌سبک `sr_audit_logs` برای ثبت رویدادهای حساس: تغییر متغیرهای تم، دستکاری قیمت محصولات، فعال‌سازی ماژول‌ها و تغییر دسترسی‌ها با شناسه کاربر، IP و زمان دقیق.
> - رمزنگاری دوطرفه تمامی کلیدهای محرمانه و توکن‌های وب‌هوک با کلید نمک امنیتی وردپرس (`AUTH_KEY` / `SECURE_AUTH_KEY`).
> - انطباق کامل با حقوق حریم خصوصی کاربران (امکان خروجی گرفتن و پاکسازی داده‌های شخصی کاربران در راستای استاندارد GDPR).

### ۵. نقد مدیر ارشد تجربه کاربری و ارتباطات چندکاناله (Omni-Channel UX & Search Architect)
> **نقد صریح:**
> «جستجوهای ایجکس اگر بهینه‌سازی نشوند، با هر بار تایپ کلمه یک درخواست سنگین SQL به سرور می‌فرستند که هاست اشتراکی را دچار کندی وحشتناک می‌کند. ایمیل‌های طراحی‌شده نیز در کلاینت‌های حساسی مثل اوت‌لوک و جیمیل موبایل اغلب با شکستگی لایه‌بندی مواجه می‌شوند.»
>
> **راهکار تثبیت‌شده و ضدشکست:**
> - جستجوی زنده مجهز به Debounce هوشمند ۳۰۰ میلی‌ثانیه‌ای، حداقل طول کاراکتر ۳، و کش محلی نتایج پرجستجو در مرورگر کاربر است. همچنین جستجو با کوئری‌های بهینه ایندکس‌شده در فیلدهای `post_title` و رکوردهای SKU ووکامرس انجام می‌گیرد.
> - استایلر ایمیل بر اساس فریم‌ورک استاندارد جدول‌بندی شده سازگار با بیش از ۹۰ کلاینت ایمیل (از جمله Outlook 2016 تا 2026 و Apple Mail و Gmail Dark Mode) کدهای درون‌خطی (Inline CSS) تولید می‌کند.

---

## ج) نقشه‌راه و مشخصات فنی ابعاد جدید پیاده‌سازی‌شده

### ۱. معماری موتور اسنپ‌شات و بازیابی بحران (Atomic Disaster Recovery Engine)

```php
<?php
/**
 * SedRazavi OS - Atomic Snapshot & Rollback Engine
 * Location: sedrazavi-companion/includes/class-snapshot-engine.php
 */

if (!defined('ABSPATH')) exit;

class SedRazavi_Snapshot_Engine {

    const SNAPSHOT_TABLE = 'sr_snapshots';

    public static function init() {
        add_action('sedrazavi_before_recipe_import', [__CLASS__, 'create_preflight_snapshot'], 10, 2);
        add_action('wp_ajax_sedrazavi_rollback_snapshot', [__CLASS__, 'ajax_rollback']);
    }

    public static function create_preflight_snapshot($recipe_slug, $affected_entities = []) {
        global $wpdb;
        $table_name = $wpdb->prefix . self::SNAPSHOT_TABLE;

        $snapshot_data = [
            'theme_mods'    => get_theme_mods(),
            'sedrazavi_opts'=> get_option('sedrazavi_os_settings', []),
            'elementor_opts'=> get_option('elementor_active_kit', ''),
            'timestamp'     => current_time('mysql'),
            'recipe_slug'   => sanitize_key($recipe_slug)
        ];

        $wpdb->insert(
            $table_name,
            [
                'snapshot_key' => 'pre_' . $recipe_slug . '_' . time(),
                'recipe_slug'  => sanitize_key($recipe_slug),
                'payload'      => wp_json_encode($snapshot_data),
                'created_at'   => current_time('mysql')
            ],
            ['%s', '%s', '%s', '%s']
        );

        return $wpdb->insert_id;
    }

    public static function ajax_rollback() {
        check_ajax_referer('sedrazavi_admin_nonce', 'security');
        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('دسترسی غیرمجاز', 'sedrazavi')]);
        }

        $snapshot_id = isset($_POST['snapshot_id']) ? absint($_POST['snapshot_id']) : 0;
        global $wpdb;
        $table_name = $wpdb->prefix . self::SNAPSHOT_TABLE;

        $row = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table_name} WHERE id = %d", $snapshot_id));
        if (!$row) {
            wp_send_json_error(['message' => __('اسنپ‌شات یافت نشد.', 'sedrazavi')]);
        }

        $data = json_decode($row->payload, true);
        if (!empty($data['theme_mods'])) {
            foreach ($data['theme_mods'] as $mod => $val) {
                set_theme_mod($mod, $val);
            }
        }
        if (!empty($data['sedrazavi_opts'])) {
            update_option('sedrazavi_os_settings', $data['sedrazavi_opts']);
        }

        wp_send_json_success(['message' => __('بازگشت به نقطه امن با موفقیت انجام شد.', 'sedrazavi')]);
    }
}
```

---

### ۲. سیستم وایت‌لیبل و شخصی‌سازی برند آژانس (Agency White-Label Suite)

طراح وب در زبانه «هویت آژانس (White-Label)» پیشخوان متمرکز می‌تواند موارد زیر را تعیین کند:
- **نام سامانه (Rebranding):** جایگزینی کامل کلمه "SedRazavi OS" با نام دلخواه آژانس (مثلاً "WebCo Studio OS").
- **لوگوی صفحه ورود (Login Customizer):** تغییر لوگوی `wp-login.php`، تصویر پس‌زمینه و رنگ دکمه‌های ورود متناسب با برند مشتری.
- **فوتر اختصاصی پیشخوان:** نمایش متن دلخواه نظیر «پشتیبانی فنی: شرکت مهندسی وبکو - ۰۲۱۸۸۸۸۸۸۸۸».
- **منوی ابزارهای کارفرما (Client Safe Mode):** امکان پنهان‌سازی بخش ویرایشگر تم، ویرایشگر افزونه‌ها، و منوهای پیشرفته برای کاربران با نقش غیرسوپرادمین جهت جلوگیری از دستکاری ناخواسته.
- **ویجت ویدئوی آموزشی در داشبورد:** کادر پیشخوان با امکان بارگذاری ویدئوی راهنمای کار با سایت برای کارفرما (آپارات، یوتیوب یا فایل مستقیم).

---

### ۳. موتور تایپوگرافی بدون پرش و بهینه‌سازی فونت محلی

```css
/* استقرار فونت متغیر بهینه‌شده با CLS دقیقاً صفر */
@font-face {
    font-family: 'SedRazaviSans';
    src: url('../fonts/sedrazavi-sans-variable.woff2') format('woff2-variations'),
         url('../fonts/sedrazavi-sans-variable.woff2') format('woff2');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
    unicode-range: U+0600-06FF, U+FB50-FDFF, U+FE70-FEFF, U+0020-007E;
}

:root {
    --sr-font-primary: 'SedRazaviSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --sr-font-headings: var(--sr-font-primary);
}

body {
    font-family: var(--sr-font-primary);
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
}
```

---

### ۴. هاب جستجوی زنده فرانت‌اند و پرتاب‌گر ادمین CMD+K

- **فرانت‌اند:** مودال شناور جستجوی سراسری (Global Search Modal) که با کلید میانبر `/` یا آیکون ذره‌بین فعال می‌شود. نتایج بر اساس دسته‌بندی (محصولات، دوره‌ها، مقالات، فایل‌ها) تفکیک شده و دارای تصویر بندانگشتی، برچسب قیمت و دکمه دسترسی مستقیم است.
- **پیشخوان ادمین:** با فشردن کلیدهای `Ctrl + K` (در ویندوز) یا `Cmd + K` (در مک)، یک پالت فرمان (Command Palette) مدرن باز می‌شود که دسترسی آنی به موارد زیر را فراهم می‌آورد:
  - جستجو در بین برگه، نوشته، محصول یا کاربر
  - پرش مستقیم به تنظیمات رنگ‌ها، سئو، اعلان‌ها یا ابزار عیب‌یابی
  - پاکسازی کش و ری‌بیلد کردن CSS توکن‌ها با یک اینتر

---

### ۵. موتور ایمیل و پیامک تراکنشی با دیزاین توکن

تمامی ایمیل‌های ارسال‌شده توسط سامانه از قالب ریسپانسیو اختصاصی با متغیرهای زیر استفاده می‌کنند:
- هدر گرافیکی شامل لوگوی سایت و خط تأکید رنگ اصلی (`--sr-color-primary`).
- کارت محتوای تراکنش با تایپوگرافی خوانا و راست‌چین استاندارد.
- دکمه کال‌تو‌اکشن (CTA) با افکت هوور و رنگ مکمل.
- فوتر رسمی شامل اطلاعات تماس، شبکه‌های اجتماعی و لینک لغو اشتراک در صورت نیاز.

---

### ۶. وب‌هوک‌های دوطرفه و اندپوینت‌های REST API

سیستم‌عامل مجهز به اندپوینت‌های استاندارد امنیتی وردپرس است:
- `POST /wp-json/sedrazavi/v1/notifications`: ارسال اعلان به سامانه از طریق سیستم‌های خارجی.
- `GET /wp-json/sedrazavi/v1/health`: گزارش وضعیت سلامت و آمادگی سرور بدون افشای اطلاعات حساس.
- **وب‌هوک خروجی (Outbound Webhooks):** ارسال رخدادها به سیستم‌های اتوماسیون سازمانی با امضای هدر `X-SedRazavi-Signature: sha256={hash}` برای جلوگیری از حملات جعل داده (Man-in-the-Middle).

---

## د) معیارهای پذیرش آزمون‌پذیر الحاقی (Testable DoD for v16.0)

| شناسه | ویژگی | شرایط آزمون | معیار پذیرش قطعی (Acceptance Criteria) |
| :--- | :--- | :--- | :--- |
| **DOD-16.1** | **اسنپ‌شات اتمیک** | کلیک روی "انصراف و بازگشت به قبل" پس از ایمپورت نصفه دمو | بازگردانی فقط تنظیماتِ تحت مالکیت importer در محیط staging؛ checksum و شمار رکوردهای پیش/پس از آزمون برابر باشد و شکست میان‌مرحله‌ای گزارش و جبران شود. زمان اجرا بر اساس محیط آزمون ثبت شود، نه به‌عنوان تضمین عمومی. |
| **DOD-16.2** | **وایت‌لیبل کامل** | فعال‌سازی برند دلخواه در نقش Administrator | نام/لوگو در نقاط نمایشی مجاز و انتخاب‌شده تغییر کند؛ متادیتای فنی، مجوز و اطلاعات پشتیبانی دستکاری یا مخفی نشوند و آزمون فقط محدوده UI را بسنجد. |
| **DOD-16.3** | **فونت محلی و CLS** | تست صفحه اصلی با Lighthouse گوگل | عدم درخواست فونت خارجی، بارگذاری WOFF2 محلی و ثبت CLS در دستگاه/صفحه/شبکه مشخص؛ بودجه پیشنهادی CLS≤0.1 در محیط آزمون، بدون ادعای تضمین همه هاست‌ها. |
| **DOD-16.4** | **جستجوی CMD+K** | فشردن کلید میانبر در هر صفحه از پیشخوان ادمین | بازشدن پالت با صفحه‌کلید، فوکوس قابل مشاهده، جستجوی قابل استفاده و آزمون عملکرد در مرورگر/دستگاه ثبت‌شده؛ عدد latency فقط به‌عنوان نتیجه همان محیط گزارش شود. |
| **DOD-16.5** | **وب‌هوک امن** | ارسال پیلود تستی به اندپوینت خارجی | تولید هدر `X-SedRazavi-Signature` معتبر مطابق با الگوریتم HMAC-SHA256. |

---

## ه) مسترپرامپت نهایی جامع v16.0 (Enterprise Omniscient Master Prompt)

```text
سند معماری SedRazavi OS را به نسخه جامع v16.0 Enterprise Omniscient Blueprint ارتقا بده. این نسخه تمامی ابعاد مغفول، بازیابی بحران اتمیک، هویت تجاری آژانس (وایت‌لیبل)، موتور فونت بومی با صفر CLS، جستجوی زنده CMD+K، قالب‌بندی ایمیل‌های تراکنشی و وب‌هوک‌های امن را پوشش می‌دهد.

۱. مدیریت بحران و اسنپ‌شات اتمیک:
کلاس `class-snapshot-engine.php` را ایجاد کن:
- پیش از import، dry-run و ثبت snapshot محدود به داده‌های تحت مالکیت importer؛ دامنه دقیق داده/فایل‌های قابل‌بازگردانی مستند شود.
- برای عملیات غیرتراکنشی از rollback جبرانی استفاده کن؛ فقط پس از آزمون restore روی staging ادعای پوشش بده و هیچ داده قبلی مشتری را حذف نکن.
- عملیات chunked، قابل‌ادامه و دارای گزارش خطا باشد؛ زمان/حافظه قابل‌اندازه‌گیری باشد و از سقف محیط هدف فراتر نرود.

۲. سوئیت وایت‌لیبل آژانس (Agency White-Label Suite):
کلاس `class-white-label.php` را به هسته افزونه اضافه کن:
- تغییر نام تجاری، لوگوی ورود و فوتر پیشخوان در نقاط نمایشی مجاز، با حفظ متادیتای فنی و هویت/مجوز سازنده.
- نقش تحویل مشتری با کمترین دسترسی لازم و ویجت راهنما؛ کنترل دسترسی باید با capabilities سمت سرور انجام شود، نه صرفاً مخفی‌کردن منو.
- هیچ kill switch، قفل از راه دور، یا محدودسازی ویرایش برای فشار تسویه پیاده‌سازی نکن؛ تحویل مالی فقط با قرارداد و milestoneهای مورد توافق مدیریت شود.

۳. موتور تایپوگرافی بومی و چندزبانه:
- فونت محلی WOFF2 و `font-display: swap` را به‌صورت اختیاری/قابل انتخاب و با مجوز روشن پیاده‌سازی کن؛ fallback metric-compatible و تست CLS واقعی ارائه بده.
- از حفظ قرارداد ذخیره‌سازی تاریخ/زمان WordPress و WooCommerce اطمینان بده؛ تبدیل شمسی فقط با کتابخانه مشخص، مجوز معتبر و تست leap-year در لایه نمایش انجام شود.
- گزارش عملکرد را با دستگاه، شبکه، صفحه و نسخه مشخص ارائه کن؛ تضمین عمومی نده.

۴. هاب جستجوی آنی و پرتاب‌گر CMD+K:
- جستجوی فرانت‌اند با debounce، حداقل طول، rate limit، permission check و داده عمومی محدود؛ cache مرورگر فقط برای محتوای عمومی و با انقضا.
- پالت فرمان پیشخوان با میانبر CMD/CTRL+K، دسترس‌پذیری صفحه‌کلید و مجوزهای واقعی؛ داده خصوصی را فقط پس از احراز capability نمایش بده.

۵. ایمیل‌ها و پیامک‌های تراکنشی و وب‌هوک‌ها:
- قالب ایمیل قابل‌ویرایش و راست‌چین با تست در مجموعه کلاینت‌های مشخص؛ ایمیل تراکنشی از خبرنامه تفکیک شود.
- REST API با `permission_callback`، validation، TLS، rate limit و کنترل replay؛ webhook امضاشده با HMAC، timestamp/nonce، rotation کلید و idempotency. secrets در ZIP، log یا پاسخ API قرار نگیرند.
```


---

## و) تکمیل واکاوی شکاف‌ها: ابعادی که در ممیزی دوم نیز نیازمند برنامه‌ریزی بودند

ممیزی مجدد نسخه‌های ۷ تا ۱۶ نشان داد افزودن قابلیت‌های بیشتر به‌تنهایی بلوغ محصول را تضمین نمی‌کند. شکاف‌های زیر به‌عنوان الزامات معماری و عملیاتی افزوده می‌شوند؛ آن‌ها باید پیش از توسعه به سیاست‌های روشن، مالک مسئول و آزمون قابل‌تکرار تبدیل شوند.

### ۱. چرخه عمر، سازگاری و انتشار نسخه‌ها

**چیستی:** سیاست پشتیبانی نسخه‌های PHP/WordPress/WooCommerce، نسخه‌بندی افزونه/قالب/بسته‌های niche، مهاجرت پایگاه داده، و مسیر ارتقا و بازگشت.

**چرایی:** آپدیت ممکن است با نسخه PHP هاست مشتری یا نسخه قدیمی WooCommerce ناسازگار باشد؛ شکستن داده پس از آپدیت از خطای نصب اولیه پرهزینه‌تر است.

**چگونگی:**
- تعریف حداقل و حداکثر نسخه‌های پشتیبانی‌شده بر اساس ماتریس CI و اعلام شفاف آن در صفحه افزونه، هدرها و مستندات.
- مهاجرت دیتابیس نسخه‌دار و idempotent با `dbDelta()` عنداللزوم؛ اجرای آن فقط در activation/upgrade hook و ثبت schema version، نه در هر page load.
- ابتدا backup/checkpoint و آزمون پیش‌پرواز، سپس مهاجرت؛ در شکست، غیرفعال‌سازی قابلیت تازه و حفظ سایت و داده‌های قبلی.
- ساخت release candidate و کانال پایدار؛ changelog، checksum و manifest فایل‌های ZIP؛ انتشار افزونه هسته، هر child theme و هر niche pack به‌صورت artifact مستقل.
- سیاست deprecation با دوره انتقال و پیام مدیریتی؛ هیچ ارتقای مخربی بدون تأیید و نسخه پشتیبان انجام نشود.

### ۲. Multisite، نصب‌های شبکه‌ای و محیط‌های متفاوت میزبانی

- تعیین رفتار جداگانه برای فعال‌سازی در سطح سایت و شبکه، مالک تنظیمات و داده‌ها در هر حالت، و جلوگیری از تداخل پیشوند/جدول.
- CI باید حداقل محیط‌های PHP/WordPress اعلام‌شده، MySQL و MariaDB پشتیبانی‌شده، HTTPS، نصب در زیرپوشه، زبان RTL/LTR، و حالت کمبود دسترسی فایل را پوشش دهد.
- مواردی مانند WP-Cron خاموش، loopback ناموفق، SMTP غیرفعال، REST API محدودشده، object cache، proxy/CDN و محدودیت حافظه باید به‌عنوان وضعیت قابل‌تشخیص گزارش شوند، نه خطای مبهم یا صفحه سفید.
- عدم فرض دسترسی shell، Composer یا WP-CLI در هاست مشتری؛ این‌ها ابزار CI/پشتیبانی‌اند و نباید پیش‌شرط اجرای سایت باشند.

### ۳. حریم خصوصی، رضایت، نگهداری و حذف داده‌ها

- برای فرم، اعلان، پیامک، ایمیل، لاگ، وب‌هوک و حساب کاربری، نقشه داده (data inventory) و هدف جمع‌آوری تعریف شود؛ فقط داده لازم جمع‌آوری شود.
- مدت نگهداری قابل‌تنظیم، حذف/ناشناس‌سازی زمان‌بندی‌شده، خروجی‌گرفتن از داده شخصی، سیاست رضایت خبرنامه و ثبت لغو رضایت در نظر گرفته شود.
- IP، محتوای فرم و داده‌های حساس در لاگ‌ها حداقلی/ماسک‌شده باشند؛ برای لاگ امنیتی مدت و سطح دسترسی مجزا تعریف شود.
- قبل از ارسال داده به سرویس خارجی، مقصد، فیلدهای ارسالی و وضعیت رضایت مشخص باشد؛ کلیدها و payloadهای حساس هرگز در log یا پیام خطا چاپ نشوند.
- پاکسازی داده هنگام حذف افزونه باید انتخاب‌پذیر، مستند و با تأیید صریح مدیر باشد؛ غیرفعال‌سازی افزونه نباید داده مشتری را خودکار نابود کند.

### ۴. دسترس‌پذیری، راست‌به‌چپ و ورودی‌های متنوع

- هدف WCAG 2.2 AA برای تجربه‌های تحت کنترل محصول: کنتراست، focus واضح، صفحه‌کلید، برچسب فرم، پیام خطا، نام accessible، zoom، و عدم اتکا به رنگ یا hover تنها.
- آزمون با صفحه‌کلید و screen reader، بزرگنمایی 200٪، حالت کاهش حرکت، متن طولانی فارسی/انگلیسی، اعداد فارسی/لاتین، تاریخ و قیمت.
- از نظر معنایی `dir` و `lang` در سطح سند/جزء درست باشند؛ ترتیب آیکون و متن، breadcrumb، فرم‌ها و منوها در RTL/LTR با CSS منطقی (`margin-inline`) مدیریت شوند.
- tooltip صرفاً برای توضیح تکمیلی باشد، نه جایگزین label؛ در موبایل قابل‌دسترسی با tap و فوکوس باشد و با hover ناپدید نشود.

### ۵. مدل داده، ظرفیت، صف و نگهداری

- پیش از ساخت جدول سفارشی، دلیل عدم کفایت post type/options و lifecycle داده مستند شود؛ جدول اختصاصی برای رویدادهای پرتعداد فقط با schema، index، پاکسازی و migration مشخص.
- اعلان/وب‌هوک/SMS/email دارای وضعیت، شمارنده تلاش، زمان retry، کلید idempotency، خطای قابل‌نمایش و سیاست dead-letter باشند؛ retry نباید فرم/سفارش تکراری بسازد.
- رعایت محدودیت‌های هاست اشتراکی: پردازش دسته‌ای، زمان‌بندی قابل‌بازیابی، محدودکردن حجم payload، pagination و پاکسازی امن داده‌های منقضی.
- اگر صف واقعی و قابل‌اعتماد در محیط میزبان تضمین‌پذیر نیست، قابلیت به‌عنوان best-effort معرفی شود و راهکار جایگزین مشخص باشد.

### ۶. انتقال، تحویل و پشتیبانی سایت مشتری

- ابزار export/import تنظیمات و Site Recipe باید secrets، آدرس‌های خصوصی و داده کاربران را حذف/ماسک کند؛ در انتقال دامنه، URLها با روش استاندارد WordPress و بدون دستکاری serialized data اصلاح شوند.
- «Client Handover» شامل نقش مدیر محدود، حساب مالک، راهنمای کوتاه، اطلاعات تماس/پشتیبانی، backup reminder، فهرست افزونه‌ها و فهرست تغییرات است.
- ابزار تشخیص سلامت فقط پیشنهاد و اصلاحات برگشت‌پذیر ارائه دهد؛ هر تغییر خودکار با preview، رضایت، گزارش و دکمه undo باشد. هیچ قابلیت self-healing نباید فایل یا داده مشتری را بی‌اجازه حذف کند.
- پشتیبانی و telemetry به‌صورت opt-in، حداقلی، شفاف و قابل‌خاموش‌کردن باشد؛ ارسال اطلاعات به سازنده بدون رضایت ممنوع.

### ۷. جستجوی کاتالوگ و مجوز: تفکیک سایت مشتری از مخزن سازنده

- کاتالوگ GitHub عمومی/خصوصی، حق دریافت بسته، حق نصب قالب و حق استفاده از لایسنس باید سه مفهوم مجزا باشند.
- کنترل entitlement سمت سرور و امضای بسته به‌عنوان کنترل دسترسی طراحی شود؛ کلید مخفی یا توکن دائمی داخل ZIP عمومی قرار نگیرد.
- انقضای مجوز سازنده نباید قالب/محتوای نصب‌شده مشتری را از کار بیندازد؛ فقط قابلیت‌های مجازِ دریافت update/catalog/support محدود شوند و داده مشتری قابل‌دسترسی بماند.
- کش محلی کاتالوگ باید زمان انقضا و نسخه را ثبت کند؛ در قطعی GitHub، محتوای نصب‌شده حفظ و پیام وضعیت نمایش داده شود.

### ۸. شاخص‌های محصول و سنجش کیفیت

- تعریف سنجه‌های واقعی: موفقیت نصب و ارتقا، نرخ rollback، خطای import، زمان ساخت برگه با Recipe، نرخ تحویل اعلان، خطاهای PHP، شکایت دسترس‌پذیری و حجم assets.
- داده سنجش فقط با رضایت صریح و حداقل‌سازی ارسال شود؛ baseline و محیط آزمون برای هر عدد ثبت شود.
- ادعاهای «۱۰۰٪ سازگار»، «بدون تداخل»، «صفر CLS»، «تحویل زیر پنج ثانیه» یا «بدون خطا» حذف شوند، مگر آنکه دامنه آزمون و شواهد بازتولیدپذیر مشخص باشد.

---

## ز) نقد قرمز نسخه ۱۶ و اصلاح ادعاهای بیش‌ازحد قطعی (Red-Team Review & Corrections)

برای جلوگیری از تبدیل ایده‌های جذاب به تعهدهای نادرست، نقد نهایی موارد زیر را اصلاح می‌کند:

1. **«بی‌نقص و غیرقابل نقد» قابل تضمین نیست.** معیار نسخه نهایی، ریسک‌های شناخته‌شده، تصمیم‌های باز، شواهد آزمون و مالک هر ریسک است؛ این سند نقشه معماری است و جایگزین تست و بازبینی انسانی نمی‌شود.
2. **Snapshot نمونه، rollback کامل نیست.** کد نمونه در بخش ج فقط طرح مفهومی است: جدول را ایجاد نمی‌کند، حذف/ویرایش محتوای import شده را بازگردانی نمی‌کند، ارتباط `_elementor_data` و فایل‌های رسانه را پوشش نمی‌دهد، تراکنش را تضمین نمی‌کند و خطاهای `wpdb` را کامل مدیریت نمی‌کند. پیش از استفاده باید بازنویسی، migration، integrity check و آزمون restore روی staging انجام شود. تراکنش تنها وقتی معتبر است که همه جدول‌های دخیل از engine پشتیبان و عملیات در همان connection باشند.
3. **نباید snapshot دیتابیس یا restore را «اتمیک» نامید مگر atomicity اثبات شود.** در محیط‌های مختلف WordPress ممکن است عملیات چندجدولی و فایل‌سیستمی قابل‌تراکنش نباشند؛ اصطلاح درست تا زمان آزمون «قابل‌بازیابی و جبرانی (compensating rollback)» است.
4. **`AUTH_KEY`/`SECURE_AUTH_KEY` مستقیماً کلید رمزنگاری داده نیستند.** برای secrets از API امن، رمزنگاری با کلید خارج از DB/مسیر پیکربندی امن و rotation استفاده شود؛ اگر محیط کلید امن ندارد، secret ذخیره نشود یا نیاز به تعریف آن از مدیر باشد. کلیدهای وردپرس نباید بدون طراحی مشتق‌سازی استاندارد به‌عنوان رمزنگار استفاده شوند.
5. **حالت تسویه‌حساب/قفل قابلیت مشتری از هسته حذف می‌شود.** قطع دسترسی، watermark اجباری یا محدودکردن ویرایش برای فشار پرداخت، مسئله حقوقی و اعتمادساز است و می‌تواند به مشتری آسیب بزند. جایگزین: milestoneها، قرارداد، فاکتور، یادآوری و تحویل مرحله‌ای با رضایت طرفین؛ هیچ backdoor، kill switch یا قفل از راه دور در سایت مشتری ساخته نشود.
6. **CLS دقیقاً صفر و تضمین عملکرد همگانی، معیار پذیرش قابل‌دفاع نیست.** اهداف باید بر مبنای داده آزمایشگاهی/میدانی، دستگاه و شبکه مشخص باشند؛ مثلاً بودجه CLS≤0.1 در صفحه و محیط آزمون تعریف‌شده، بدون ادعای تضمین همه هاست‌ها. برای فونت، fallback metric-compatible و اندازه‌گیری واقعی لازم است.
7. **«عدم وجود نام SedRazavi در سورس» هدف مناسبی برای white-label نیست.** نام سازنده ممکن است در metadata، مجوز یا پشتیبانی باقی بماند؛ هدف درست، حذف برند از نقاط نمایشی انتخاب‌شده برای نقش/مجوز مجاز است، بدون مخفی‌سازی هویت کد، فریب کاربر یا حذف attribution لازم.
8. **ذخیره نتایج جستجو در IndexedDB پیش‌فرض نمی‌شود.** ممکن است داده خصوصی یا stale را نگه دارد. ابتدا جستجوی server-side کمینه، nonce/authorization، rate-limit، debounce و cache کوتاه سمت سرور؛ cache مرورگر فقط برای داده عمومی و با انقضا.
9. **تضمین تحویل پیامک، email یا webhook ممکن نیست.** وضعیت‌ها «پذیرفته‌شده، ارسال‌شده، تحویل‌شده در صورت پشتیبانی ارائه‌دهنده، شکست/نامعلوم» تفکیک شوند؛ ایمیل جایگزین همیشه معادل SMS نیست و failover خودکار باید طبق نوع رویداد و رضایت کاربر تنظیم شود.
10. **HMAC به‌تنهایی امنیت کامل API نیست.** TLS، timestamp، nonce/replay protection، rotation کلید، محدودسازی درخواست، امضای canonical payload و پاسخ امن نیز لازم است. REST route باید `permission_callback` مشخص و validation داشته باشد.
11. **تاریخ جلالی نباید با ادعای «الگوریتم خیامی-بیرونی دقیق» مبهم بماند.** کتابخانه/الگوریتم مشخص، مجوز، پوشش سال کبیسه و آزمون تطبیقی تعریف شود؛ مقدار ذخیره‌سازی زمان در WordPress/WooCommerce مطابق قرارداد UTC و timezone سایت باقی بماند.
12. **تضمین پشتیبانی از کلاینت‌های ایمیل یا انطباق کامل قانونی داده نمی‌شود.** مجموعه کلاینت آزموده‌شده، قواعد رضایت/نگهداری و مسئولیت مالک سایت باید مشخص باشد؛ GDPR یا قوانین محلی نیازمند بررسی حقوقی مستقل هستند.

---

## ح) فازهای اجرایی و دروازه‌های تصمیم برای ابعاد تازه

| فاز | خروجی | دروازه پایان / معیار قابل آزمون |
|---|---|---|
| **۱۶-A: Inventory و Threat/Data Model** | فهرست قابلیت‌ها، داده‌ها، نقش‌ها، secrets، جریان‌های بیرونی، نسخه‌های پشتیبانی و ریسک‌ها | هر داده دارای هدف/مالک/مدت نگهداری؛ هر endpoint دارای permission model؛ هیچ مورد «TODO امنیتی» بدون مسئول نماند. |
| **۱۶-B: Update/Migration/Recovery** | نسخه‌بندی schema، migration، preflight، گزارش، روش backup و recovery جبرانی | ارتقا از نسخه N و N-1 روی کپی staging موفق؛ خطای تزریقی در هر گام داده اصلی را حفظ کند؛ recovery با مقایسه checksum/تعداد رکوردها سنجیده شود. |
| **۱۶-C: Accessibilité/Localization/Performance** | آزمون دسترس‌پذیری، RTL/LTR، فونت محلی و بودجه عملکرد | keyboard-only مسیرهای اصلی کامل؛ خطای بحرانی axe صفر در scope آزمون؛ CLS/LCP/INP در محیط مشخص ثبت و زیر بودجه توافق‌شده باشند. |
| **۱۶-D: Integrations & Operations** | webhook/SMS/email queue، idempotency، retry، logهای ماسک‌شده و health check | retryهای تکراری یک اقدام/سفارش تکراری نسازند؛ timeout و پاسخ 4xx/5xx قابل مشاهده؛ secrets در log و ZIP یافت نشوند. |
| **۱۶-E: Agency Handover & Catalog** | وایت‌لیبل محدود و شفاف، role handover، کاتالوگ مجوزمحور، export پاک‌سازی‌شده | کاربر محدود نتواند تنظیمات/secret/کاتالوگ غیرمجاز را بخواند؛ قطع مخزن سازنده سایت مشتری را از کار نیندازد؛ export در محیط دوم با dry-run قابل‌بررسی باشد. |
| **۱۶-F: Beta & Evidence Release** | نسخه آزمایشی با changelog، checksum، ماتریس سازگاری و گزارش known issues | نصب تم/افزونه از ZIP مستقل روی WordPress پاک و ارتقای نسخه قبلی موفق؛ هیچ ادعای سازگاری فراتر از ماتریس CI منتشر نشود. |

---

## ط) نتیجه نهایی نقد چندتخصصی و تصمیمات باز

این سند اکنون علاوه بر طراحی و قابلیت‌ها، lifecycle انتشار، مهاجرت و بازیابی، multisite، حریم خصوصی، دسترس‌پذیری، محدودیت هاست، صف و idempotency، تحویل آژانس، مجوز کاتالوگ، سنجه‌های کیفیت و اصلاح ادعاهای بیش‌ازحد قطعی را پوشش می‌دهد. راهکار نهایی نه وعده «بدون خطا»، بلکه معماری قابل‌آزمون و قابل‌بازیابی با blast-radius محدود است.

**تصمیم‌های باز که باید پیش از پیاده‌سازی تعیین شوند:** حداقل نسخه PHP/WordPress و WooCommerce؛ پشتیبانی multisite؛ مدل مجوز و توزیع بسته؛ ارائه‌دهندگان مجاز SMS/SMTP؛ نگهداری/حذف داده؛ پشتیبانی از هر Elementor/Bricks؛ و اینکه کدام قابلیت‌ها در هسته، افزونه companion یا niche pack قرار می‌گیرند. مقدار این تصمیم‌ها نباید توسط AI حدس زده یا به‌عنوان موافقت مالک تعبیر شود.

**وضعیت:** محتوای این الحاقیه و مسترپرامپت آن طرح پیشنهادی برای تأیید است؛ کد مخزن، GitHub Actions یا نصب WordPress در این مرحله تغییر نکرده و صحت عملکرد قابلیت‌ها اثبات نشده است.


---

# ۲۰. نسخه ۱۷.۰: پایش‌پذیری، تحلیل عملیاتی و سیستم رابط/موشن تطبیقی (SedRazavi OS v17.0 Observability & Experience Blueprint)

## الف) هدف و مرزبندی پایش

پایش باید به مالک سایت پاسخ دهد: «آیا سایت و قابلیت‌های مهم سالم‌اند؟ چه چیزی شکست خورده؟ از چه زمانی؟ چه اقدامی امن است؟»؛ و به طراح/پشتیبان پاسخ دهد: «در کدام درخواست یا ماژول، با چه نسخه‌ای و در چه محیطی مشکل رخ داده؟».

**مرزبندی حیاتی:** افزونه نصب‌شده در همان سایت نمی‌تواند قطعی کامل آن سایت را گزارش دهد، چون هنگام خاموشی PHP/هاست خودش هم اجرا نمی‌شود. برای uptime و دسترس‌پذیری از دید بیرونی، باید سرویس مستقل مانیتورینگ (در صورت انتخاب مالک) استفاده شود. افزونه فقط سلامت درون سایت و آخرین وضعیت ذخیره‌شده را گزارش می‌کند. هیچ ارسال telemetry به سازنده به‌صورت پیش‌فرض انجام نمی‌شود؛ پایش بیرونی و داده‌های تحلیلی نیازمند انتخاب آگاهانه و حداقل‌سازی اطلاعات است. راهنمای حریم خصوصی WordPress بر رضایت، محدودسازی جمع‌آوری، هدف مشخص و نگهداری محدود تأکید دارد.[Privacy](https://developer.wordpress.org/plugins/privacy/)

### طبقه‌بندی پایش

| لایه | چه چیزی سنجیده می‌شود | کجا نمایش داده می‌شود | چه چیزی از آن نتیجه نمی‌گیریم |
|---|---|---|---|
| **Site Health** | نسخه‌های PHP/WP/DB، REST، SSL، loopback، cron، به‌روزرسانی، فضای قابل‌دسترسی طبق آزمون‌های موجود | SedRazavi OS > سلامت، همراه پیوند به ابزار Site Health وردپرس | سلامت کامل شبکه، DNS یا سایت از دید بازدیدکننده را تضمین نمی‌کند |
| **قابلیت‌های خود افزونه** | import، ذخیره recipe، تولید CSS توکن، webhook، فرم، ارسال اعلان، migration | رویدادها و آخرین اجرای هر قابلیت | محتوای شخصی فرم یا اطلاعات کارت/رمز را در لاگ نمی‌گذارد |
| **کارهای پس‌زمینه** | صف، زمان‌بندی، مدت انتظار، موفق/ناموفق، retry و آخرین اجرا | تب عملیات/صف؛ در صورت وجود WooCommerce، لینک به Scheduled Actions | WP-Cron اجرای دقیق در ساعت معین را تضمین نمی‌کند؛ بر اساس بازدید ممکن است تأخیر داشته باشد.[WP-Cron](https://developer.wordpress.org/plugins/cron/) |
| **عملکرد سرور** | زمان پاسخ در درخواست‌های منتخب، خطاهای PHP، queryهای تشخیصی، مصرف حافظه در نقاط داخلی که اندازه‌گیری امن ممکن است | خلاصه کم‌حجم در محیط تشخیص؛ جزئیات فقط برای نقش مجاز | ابزار production جایگزین پروفایلر تخصصی نیست؛ query logging سراسری دائمی فعال نمی‌شود |
| **تجربه کاربر** | Core Web Vitals و خطاهای رابط در نمونه‌گیری/آزمون، فقط طبق رضایت و سیاست داده | گزارش محلی یا سرویس RUM انتخابی مالک | Lighthouse lab score معادل عملکرد همه کاربران نیست؛ داده میدانی باید ناشناس و رضایت‌مند باشد |
| **Uptime بیرونی** | پاسخ HTTP، TLS، انقضای گواهی و دسترس‌پذیری از مکان/شبکه مستقل | سرویس بیرونی انتخابی + خلاصه آخرین check در داشبورد | افزونه داخل همان سایت به تنهایی ناظر مستقل نیست |

WordPress Site Health خودش آزمون‌های مستقیم و غیرهم‌زمان برای مواردی مانند نسخه PHP، دیتابیس، cron و REST دارد و می‌تواند مبنای بررسی محلی باشد.[Site Health tests](https://developer.wordpress.org/reference/classes/wp_site_health/get_tests/) خطایابی WordPress نیز `WP_DEBUG_LOG` را برای توسعه/عیب‌یابی مستند می‌کند؛ در تولید، نمایش خطا به بازدیدکننده خاموش بماند و ثبت خطا با دسترسی محدود و پاک‌سازی دوره‌ای انجام شود.[Debugging WordPress](https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/)

## ب) طراحی «مرکز سلامت و عملیات» در پیشخوان

### صفحه Overview

- **وضعیت کلی قابل‌فهم:** سالم، نیازمند توجه، بحرانی، یا اطلاعات ناکافی؛ رنگ همراه با متن/آیکون، نه رنگ تنها.
- **چهار کارت اولویت‌دار:** خطاهای نیازمند اقدام، آخرین backup/recovery check (اگر ادغام شده)، وضعیت صف و اعلان‌ها، نسخه‌ها و سازگاری.
- **تغییرات اخیر:** آخرین import، update، تغییر پالت/recipe، تغییر نقش، migration و تنظیم integration؛ داده حساس ماسک شود.
- **راهنمای اقدام:** «چه رخ داده / اثر احتمالی / سطح اطمینان / گام پیشنهادی / آیا امن است که خودکار شود؟»؛ ابزار تشخیص فقط خواندنی است، هر تغییری با preview، تأیید و undo.
- هر شاخص باید زمان آخرین نمونه، منبع داده و محدودیت سنجش را نشان دهد؛ داشبورد نباید وضعیت قدیمی را به‌عنوان real-time جلوه دهد.

### صفحات تفصیلی

1. **سلامت محیط:** نسخه PHP/WordPress/MySQL یا MariaDB/WooCommerce، writable paths فقط به‌صورت وضعیت، REST/HTTPS/loopback، memory/time limits، object cache و افزونه‌های دارای هشدار سازگاری.
2. **لاگ رخدادها:** فیلتر زمان، سطح، ماژول، شناسه رخداد، نتیجه و correlation ID؛ خروجی قابل‌دانلود، با redaction و پنجره نگهداری.
3. **صف و زمان‌بندی:** کارهای pending/running/failed، آخرین اجرا و علت، تلاش بعدی، امکان retry تک‌موردی با capability مناسب و idempotency.
4. **یکپارچه‌سازی‌ها:** SMS، ایمیل، webhook، GitHub catalog و gateway؛ وضعیت اتصال/آخرین تست، دکمه «تست» با داده آزمایشی، نمایش نام credential نه مقدار آن.
5. **عملکرد:** زمان پاسخ درخواست‌های منتخب، تعداد/مدت query در تست تشخیصی، asset size و گزارش Lighthouse/CI؛ اندازه‌گیری پرهزینه فقط دستی یا نمونه‌گیری محدود.
6. **اعلان و سیاست هشدار:** severity، گیرندگان طبق role/capability، کانال، ساعات سکوت، dedupe/cooldown، وضعیت تحویل و fallback؛ ارسال آزمایشی جدا از عملیات واقعی.
7. **گزارش پشتیبانی:** فایل متنی/JSON با نسخه‌ها، تنظیمات غیرحساس، خطاهای ماسک‌شده و شناسه correlation؛ preview پیش از دانلود/ارسال؛ هرگز شامل رمز، token، محتوای فرم، ایمیل/موبایل کامل یا داده پرداخت نباشد.

### نقش‌ها و مجوز

| نقش | دسترسی مجاز پیش‌فرض |
|---|---|
| مدیر سایت/مالک | خلاصه سلامت، گزارش‌ها، اتصال‌ها، سیاست نگهداری؛ مشاهده secrets ممنوع، فقط امکان جایگزینی |
| طراح/پشتیبان مجاز | جزئیات فنی و export تشخیصی پس از مجوز موقت/ثبت‌شده؛ داده شخصی ماسک‌شده |
| مدیر فروشگاه/محتوا | فقط خطاهای مرتبط با عملیات روزمره، سفارش/فرم/صف محتوایی متناسب با capability؛ بدون تنظیم امنیتی یا token |
| عضو تیم/کاربر | اعلان‌ها و فعالیت‌های متعلق به خود یا scope کاری خود؛ بدون سلامت کلی سرور یا داده سایر اشخاص |
| Super Admin شبکه | تنظیمات network-level فقط در multisite و در صورت پشتیبانی اعلام‌شده |

قابلیت‌ها باید با `current_user_can()` یا `permission_callback` در سمت سرور بررسی شوند؛ پنهان‌کردن منو به تنهایی کنترل دسترسی نیست. راهنمای افزونه WordPress بر بررسی capability برای هر عملیات تأکید می‌کند.[Checking User Capabilities](https://developer.wordpress.org/plugins/security/checking-user-capabilities/) و endpointهای REST باید permission callback اختصاصی داشته باشند.[Adding Custom Endpoints](https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/)

## پ) معماری داده و رویداد پایش

### مدل رویداد حداقلی

هر رویداد عملیاتی فقط این فیلدها را داشته باشد، مگر دلیل مستند دیگری:

- `event_id` تصادفی/غیرقابل حدس، `occurred_at_utc`، `severity`، `module`, `event_name`, `outcome`.
- `correlation_id` برای پیوند امن مراحل یک عملیات؛ بدون ذخیره IP یا شناسه شخصی به‌صورت پیش‌فرض.
- نسخه افزونه/قالب، زمان اجرای عملیات، کد خطای پایدار و شناسه job در صورت وجود.
- `context` allowlist محدود؛ هر مقدار user input، URL دارای query خصوصی، payload، header احراز هویت، token و محتوای فرم ممنوع.

**سطوح:** `debug` فقط در حالت عیب‌یابی موقت؛ `info` رویداد عملیاتی؛ `notice` اقدام لازم نیست اما قابل‌ردیابی؛ `warning` نیازمند بررسی؛ `error` قابلیت شکست خورده؛ `critical` سایت یا اقدام مهم در معرض خطر. از ثبت پیام‌های تکراری با dedupe key جلوگیری شود.

### ذخیره، دسترسی و نگهداری

- پیش‌فرض کم‌هزینه: استفاده از logger استاندارد WooCommerce در صورت نصب/مناسب‌بودن، وگرنه logger داخلی با adapter و مسیر قابل‌تنظیم؛ هیچ فایل لاگ در web root عمومی قرار نگیرد.
- پایگاه داده سفارشی فقط اگر حجم/جستجو/retention آن را توجیه کند؛ schema version، index، pagination، پاک‌سازی batch و migration داشته باشد.
- لاگ‌ها با capability اختصاصی خوانده شوند؛ export شامل secrets و اطلاعات شخصی نباشد؛ مدت نگهداری قابل تنظیم و پیش‌فرض محدود (مثلاً ۱۴ روز، قابل تغییر از سوی مالک) باشد.
- در محیط تولید، متن stack trace به کاربر عمومی نمایش داده نشود؛ جزئیات در log مجاز و پیام کاربر با کد پیگیری ارائه شود.
- `SAVEQUERIES`، نمایش debug و tracing پرجزئیات دائمی فعال نشوند؛ فقط در حالت تشخیص موقت و با اخطار اثر بر performance.

## ت) تحلیل و داشبورد تحلیلی، بدون تبدیل به ابزار جاسوسی

### سنجه‌های داخلی محصول

- **نرخ موفقیت عملیات:** importهای کامل/شکست‌خورده، rollback و علت‌های دسته‌بندی‌شده.
- **تحویل اعلان:** پذیرفته‌شده توسط provider، تحویل در صورت گزارش provider، شکست، نامعلوم، retry و زمان تا نتیجه؛ «ارسال‌شده» با «تحویل‌شده» یکی نیست.
- **عملیات پس‌زمینه:** تعداد صف، پیرترین job، backlog، شکست‌های تکراری و زمان پردازش.
- **سازگاری:** نسخه‌های runtime مشاهده‌شده در آزمون‌های CI و گزارش تشخیصی opt-in، نه ارسال مخفی به سازنده.
- **عملکرد:** LCP، INP، CLS در داده میدانی رضایت‌مند یا محیط آزمایشگاه؛ سه Core Web Vitals کیفیت بارگذاری، پاسخ‌دهی و پایداری بصری را می‌سنجند و آستانه‌های عمومی باید مطابق مستند جاری و صدک ۷۵ تفسیر شوند.[Core Web Vitals](https://web.dev/articles/defining-core-web-vitals-thresholds)

### سیاست telemetry

- telemetry سازنده خاموش به‌صورت پیش‌فرض؛ opt-in جدا از قبول مجوز، با توضیح دقیق فیلدها، هدف، مقصد، تناوب، مدت نگهداری و روش لغو.
- telemetry عمومی سایت مشتری نیز فقط با تصمیم مالک و رعایت notice/consent سایت فعال شود؛ از ثبت بازدیدکننده، fingerprint، آدرس IP کامل، مسیر دارای اطلاعات شخصی یا محتوای فرم خودداری شود.
- ارائه گزینه «فقط محلی» برای سایت‌های حساس و امکان مشاهده payload پیش از روشن‌کردن telemetry.
- داشبورد گزارش‌های تجمعی را با حداقل تعداد نمونه نمایش دهد تا اطلاعات فردی از نمودار قابل استنتاج نباشد.

### هشدارها و آستانه‌ها

- تعریف هشدار بر اساس شدت و اثر کسب‌وکار؛ نمونه: import ناقص، webhook چندبار شکست‌خورده، صف اعلان انباشته، فضای upload ناکافی، REST یا cron مختل.
- dedupe و cooldown برای جلوگیری از بمباران اعلان؛ رویدادهای مرتبط یک incident می‌سازند.
- کانال‌ها configurable و مطابق consent/نوع پیام؛ fallback فقط وقتی منطقی و مجاز است. پیامک ناموفق نباید خودکار ایمیل را برای هر رخداد حساس افشا کند.
- هر هشدار: مالک، شدت، زمان، scope، وضعیت حل، گام بعدی و نتیجه رفع.
- برای سامانه‌هایی که WP-Cron به دلیل نبود بازدید دیر اجرا می‌شود، پنل باید این محدودیت را آشکار کند و استفاده از cron واقعی هاست را به‌عنوان گزینه معرفی کند؛ زمان‌بندی WordPress با page load فعال می‌شود و چندبار برنامه‌ریزی همان hook می‌تواند job تکراری بسازد.[Scheduling WP-Cron](https://developer.wordpress.org/plugins/cron/scheduling-wp-cron-events/)

### صف‌ها و WooCommerce

اگر WooCommerce و Action Scheduler حاضر هستند، برای کارهای batch بزرگ از همان زیرساخت و رابط مانیتورینگ استفاده شود، نه ساخت صف موازی بی‌دلیل. Action Scheduler ابزار صف traceable و صفحه مدیریت برای مشاهده pending/failed و log هر action ارائه می‌دهد؛ زمان‌بندی ووکامرس از مسیر WooCommerce > Status > Scheduled Actions قابل مشاهده است.[Action Scheduler](https://actionscheduler.org/admin/) لاگ افزونه‌های ووکامرس باید با logger استاندارد WooCommerce سازگار باشد.[WooCommerce logging](https://developer.woocommerce.com/docs/best-practices/data-management/logging/)

## ث) معماری تجربه بصری، موشن و انیمیشن نسخه ۱۷

### سیستم طراحی رابط (Design System) برای کل داشبورد و قالب‌ها

1. **توکن‌های معنایی:** رنگ‌ها بر مبنای نقش (`surface`, `text`, `border`, `success`, `warning`, `danger`, `focus`) و حالت روشن/تیره؛ نه رنگ ثابت هر صفحه. پالت niche فقط token را عوض کند و قراردادهای معنا/کنتراست را حفظ کند.
2. **مقیاس یکپارچه:** spacing، ارتفاع کنترل، شعاع، سایه، تایپوگرافی، breakpoint و لایه‌های z-index در tokenهای مستند؛ تفاوت‌های برند از theme preset/recipe بیاید.
3. **الگوهای سازگار WordPress:** صفحه افزونه از قراردادهای WordPress پیروی کند؛ در صورت استفاده از React، فقط public APIs و stylesheetهای نسخه هدف استفاده شوند. `@wordpress/admin-ui` برای ساختارهای متعارف صفحه ادمین تعریف شده است، اما package/نسخه باید با WordPress هدف تطبیق و وابستگی آزمایشی جداگانه ارزیابی شود.[WordPress Admin UI](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-admin-ui/) DataViews/DataForm می‌توانند برای صفحات داده و تنظیمات، الگوی آشنا و فیلتر/نمای سفارشی فراهم کنند؛ API انتخابی باید با نسخه هدف و وضعیت پایداری بررسی شود.[Data Views](https://developer.wordpress.org/news/2024/08/using-data-views-to-display-and-interact-with-data-in-plugins/) [DataForm](https://developer.wordpress.org/news/2026/01/how-to-use-dataform-to-create-plugin-settings-pages/)
4. **حالت‌های همه اجزا:** default, hover, focus-visible, active, disabled, loading, empty, success, warning, error, permission denied, offline/stale، و destructive confirmation.
5. **خوانایی عملیات:** خلاصه‌های کوتاه، progressive disclosure، breadcrumb، فیلتر/جستجو، view ذخیره‌شده، bulk action با تأیید، پیش‌نمایش recipe و undo/rollback برای تغییرهای برگشت‌پذیر.
6. **RTL/LTR واقعی:** CSS logical properties، ترتیب بصری و tab order درست، فونت fallback، تاریخ/ارقام و منوهای بازشونده آزموده شوند؛ ترجمه صرف کافی نیست.
7. **موبایل و touch:** جداول به کارت یا scroll آگاهانه تبدیل شوند؛ کنترل‌های لمسی target بزرگ، پنل‌های sticky فضای محتوا را نپوشانند، drawer با ESC و focus trap درست بسته شود.

### زبان طراحی موشن (Motion Language)

- **چهار کلاس:** (۱) بازخورد عملیاتی کوتاه: hover/focus/success؛ (۲) انتقال رابط: drawer/tab/dialog؛ (۳) نمایش محتوای غیرضروری: reveal محدود؛ (۴) motion تزئینی: background/hero. سطح ۴ به‌طور پیش‌فرض خاموش یا بسیار محدود و همیشه قابل کاهش باشد.
- برای تعامل‌های معمول، اولویت با `opacity` و `transform` است؛ انیمیت‌کردن ابعاد، موقعیت layout، blur بزرگ و سایه‌های سنگین می‌تواند هزینه paint/layout را بالا ببرد.[Animation performance](https://web.dev/articles/animations-and-performance)
- از scroll-jacking، parallax اجباری، auto-playing hero video، انیمیشن بی‌پایان، flashing، و ورود همه کارت‌ها با تأخیر زنجیره‌ای پرهیز شود.
- `prefers-reduced-motion` در CSS و JavaScript رعایت شود؛ در حالت کاهش حرکت، transformهای بزرگ، parallax و autoplay حذف/جایگزین شوند.[Reduced motion](https://web.dev/articles/prefers-reduced-motion) W3C توصیه می‌کند انیمیشن غیرضروری ناشی از تعامل قابل غیرفعال‌سازی باشد و برای حرکت/به‌روزرسانی خودکار طولانی کنترل pause/stop/hide فراهم شود.[WCAG animation](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions) [Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide)
- حرکت همواره نباید پیام را منتقل کند؛ وضعیت با متن، آیکون و semantics نیز اعلام شود. در UI ادمین، انیمیشن موفقیت نباید پیام فرم یا focus را جابه‌جا کند.
- برای همه transitionها مدت/curve token تعریف شود؛ به‌جای یک مدت جهان‌شمول، motion preset قابل تنظیم (خاموش/ملایم/استاندارد) و تست عملکرد روی موبایل ضعیف ارائه گردد.
- motion decor از محتوای اصلی جدا، کم‌کنتراست و بدون اثر روی کلیک/خوانایی باشد؛ برای carousel یا ticker خودکار کنترل pause/stop در نظر گرفته شود.

## ج) چرخه نقد چندتخصصی و پالایش نسخه ۱۷

این نقد به‌عنوان بازبینی معماری مبتنی بر منابع و معیارهای آزمون‌پذیر تدوین شده است؛ نه ادعای اینکه ده‌ها متخصص انسانی واقعاً در جلسه حضور داشته‌اند یا همه محصولات بازار آزمایش شده‌اند.

### دور ۱: معمار SRE و پایش
**نقد:** داشبورد وضعیت داخل سایت uptime واقعی را نمی‌سنجد و در زمان قطعی از دسترس خارج است.
**اصلاح:** تفکیک Site Health داخلی از uptime بیرونی؛ connector بیرونی اختیاری، با endpoint مستقل و opt-in.

### دور ۲: مهندس WordPress و Site Health
**نقد:** اجرای آزمون‌های سنگین روی هر page load، خودِ سایت را کند می‌کند.
**اصلاح:** خلاصه cache شده، آزمون‌های asynchronous/on-demand، زمان اجرای ثبت‌شده و عدم تکرار schedule در هر بار بارگذاری. WordPress Site Health خودش direct و async را تفکیک می‌کند.[Site Health tests](https://developer.wordpress.org/reference/classes/wp_site_health/get_tests/)

### دور ۳: مهندس صف و WooCommerce
**نقد:** صف اختصاصی جدید، با Scheduled Actions تداخل و دو سیستم retry ایجاد می‌کند.
**اصلاح:** adapter؛ در حضور WooCommerce/Action Scheduler از آن استفاده و برای حالت بدون آن، صف محدود و مستند با idempotency پیاده شود.

### دور ۴: مهندس امنیت
**نقد:** گزارش سلامت می‌تواند نسخه‌ها، مسیرها و خطاهای حساس را به کاربر نامجاز افشا کند.
**اصلاح:** capabilities در سطح API/عملیات، redaction، export preview، retention و بدون public health endpoint جز در صورت طراحی مشخص.

### دور ۵: مسئول حریم خصوصی
**نقد:** telemetry پیش‌فرض یا IP کامل با اصل کمینه‌سازی داده ناسازگار است.
**اصلاح:** local-first، opt-in، inventory، retention، حذف و دسترسی محدود؛ پیام روشن درباره مقصد داده.

### دور ۶: مهندس عملکرد
**نقد:** logging همه queryها و RUM دائمی overhead و هزینه ذخیره ایجاد می‌کند.
**اصلاح:** sampling و تشخیص on-demand، بودجه overhead، batch/retention، سنجش جداگانه اثر instrumentation.

### دور ۷: مدیر عملیات و پشتیبانی
**نقد:** نمودارهای بدون اقدام یا تاریخ آخرین refresh فقط تزئینی‌اند.
**اصلاح:** هر کارت دارای freshness، منبع، پیام اثر، اقدام پیشنهادی و محدودیت؛ گزارش پشتیبانی قابل اشتراک و ماسک‌شده.

### دور ۸: معمار اطلاعات و UX
**نقد:** داشبوردهای قبلی قابلیت‌های زیاد را به یک صفحه می‌ریختند و بار شناختی می‌ساختند.
**اصلاح:** نمای خلاصه role-based و مسیرهای progressive disclosure، جستجو، فیلتر، DataViews و دسته‌بندی وظیفه‌محور؛ بدون منوی طولانی.

### دور ۹: طراح دسترس‌پذیری
**نقد:** وضعیت فقط با رنگ و tooltip hover، برای صفحه‌کلید، موبایل و screen reader ناکافی است.
**اصلاح:** متن/آیکون/ARIA، focus visible، keyboard flow، hover+focus+tap، reduced motion و target قابل لمس.

### دور ۱۰: متخصص موشن و performance
**نقد:** انیمیشن‌های نمایشی فراوان می‌توانند LCP، INP، battery و تمرکز را بدتر کنند.
**اصلاح:** motion budget، ترجیح transform/opacity، عدم autoplay اجباری، کاهش حرکت و آزمایش روی دستگاه کم‌توان؛ معیارها از حس بصری جدا اندازه‌گیری شوند.

### دور ۱۱: متخصص Gutenberg/Elementor
**نقد:** داشبورد سفارشی جذاب ممکن است تجربه آشنای WordPress را بشکند و نسخه‌های block editor را دنبال نکند.
**اصلاح:** ابتدا الگوهای و componentهای public وردپرس و graceful fallback؛ آزمون روی نسخه‌های هدف، نه اتکا به API آزمایشی.

### دور ۱۲: طراح RTL و بومی‌سازی
**نقد:** آینه‌کردن CSS به‌تنهایی order، اعداد، تاریخ، focus و نمودار را درست نمی‌کند.
**اصلاح:** logical properties، locale واقعی، متن طولانی فارسی/انگلیسی، اعداد ترکیبی و screenshot regression در هر دو جهت.

### دور ۱۳: QA و تست‌پذیری
**نقد:** «سریع، جذاب، سالم» قابل قبول نیست مگر سناریو و محیط تست ثبت شود.
**اصلاح:** DoD مشخص در بخش چ، تست failure injection، ضبط نسخه/دستگاه/شبکه و تفکیک آزمایشگاهی از داده میدانی.

### دور ۱۴: مدیر محصول و پشتیبانی مشتری
**نقد:** سیستم ممکن است خطا را بدون مالک، سطح فوریت یا مسیر حل نشان دهد.
**اصلاح:** incident lifecycle: new → acknowledged → investigating → resolved/false positive، assignee، severity، dedupe و یادداشت حل؛ ثبت اطلاعات شخصی در یادداشت‌ها هشدار داده شود.

### دور ۱۵: بازبینی red-team نهایی
**نقد:** اعداد «۵۰ms پالت»، «صفر CLS»، «صددرصد uptime» و «بدون خطا» بدون دامنه/محیط، وعده غیرواقعی‌اند؛ self-healing بی‌اجازه نیز ریسک داده دارد.
**اصلاح:** baseline و آستانه در محیط تعریف‌شده؛ هدف عملکرد با نمونه‌گیری سنجیده؛ اصلاح خودکار فقط dry-run، رضایت، backup/checkpoint و undo.

## چ) معیارهای پذیرش آزمون‌پذیر برای پایش، تجربه و موشن

| شناسه | آزمون | معیار قبولی |
|---|---|---|
| **OBS-01** | نصب افزونه با telemetry خاموش و رصد درخواست‌های outbound | هیچ داده‌ای به سازنده ارسال نشود؛ outbound فقط برای قابلیت فعال‌شده و مقصد اعلام‌شده |
| **OBS-02** | تزریق خطای import، webhook و ارسال اعلان در staging | رخداد با شناسه، زمان، ماژول، outcome و کد خطا ثبت شود؛ secrets، payload شخصی و token در log جستجوپذیر نباشد |
| **OBS-03** | کاربر نقش عضو درخواست endpoint سلامت/لاگ مدیر را بزند | 403 یا پاسخ امن بدون اطلاعات حساس؛ UI تنها مخفی نشده باشد، کنترل سرور تأیید شود |
| **OBS-04** | job ناموفق و retry تکراری | وضعیت/تلاش بعدی قابل مشاهده؛ اجرای تکراری، سفارش/اعلان/ایمپورت تکراری نسازد؛ retry قابل‌کنترل باشد |
| **OBS-05** | WP-Cron بدون page view و سپس با traffic/cron واقعی | تأخیر زمان‌بندی توضیح داده شود؛ پنل آخرین run و overdue را نشان دهد، نه موفقیت ساختگی |
| **OBS-06** | export گزارش تشخیصی | preview و قابلیت حذف؛ بدون password/token، محتوای فرم، email/phone کامل، کوکی، authorization header و داده پرداخت |
| **OBS-07** | پاک‌سازی retention | رکوردهای منقضی در batch حذف شوند؛ حذف در درخواست عادی فرانت‌اند اجرا نشود؛ audit حداقلی باقی بماند |
| **OBS-08** | Lighthouse/field metrics | CI lab report با محیط ثبت‌شده؛ داده field فقط opt-in، نمونه‌گیری‌شده و بدون ادعای نمایندگی همه کاربران |
| **UX-01** | مسیرهای اصلی با keyboard و screen reader | focus قابل مشاهده، ترتیب منطقی، label/نام قابل دسترس و وضعیت خطا/موفقیت اعلام‌شده |
| **UX-02** | RTL/LTR و متن ترکیبی در صفحات داشبورد، منو، نمودار و فرم | هیچ clipping/وارونگی جهت/ترتیب tab ناموجه در viewports تعریف‌شده؛ screenshot regression ثبت شود |
| **MOTION-01** | تنظیم سیستم‌عامل `prefers-reduced-motion: reduce` | parallax/autoplay/transformهای غیرضروری خاموش یا جایگزین؛ اطلاعات و تعامل بدون انیمیشن قابل فهم بمانند |
| **MOTION-02** | motion تزئینی خودکار بیش از ۵ ثانیه یا محتوای auto-updating | کنترل pause/stop/hide یا خاموش‌بودن خودکار ارائه شود، مطابق scope WCAG مرتبط |
| **MOTION-03** | پروفایل عملکرد روی موبایل هدف | انیمیشن‌های اصلی عمدتاً به transform/opacity محدود؛ فریم‌دراپ و اثر روی INP/LCP/مصرف CPU در گزارش محیط آزمون ثبت شود |
| **OPS-01** | خاموشی سرویس بیرونی/SMTP/SMS/GitHub | وضعیت «نامعلوم/اتصال برقرار نیست» از «سالم» تفکیک؛ خطای امن و دستور اقدام نمایش داده شود |

## ح) فازبندی اجرایی افزوده

1. **فاز ۱۷-A — Event & Data Inventory:** فهرست eventها، داده مجاز/ممنوع، retention، roles، incident severity و outboundها؛ دروازه: threat model و data map تأییدپذیر.
2. **فاز ۱۷-B — Local Health MVP:** Site Health، وضعیت runtime، آخرین اجرا، log adapter و health cards فقط محلی؛ دروازه: تست permission، redaction و overhead.
3. **فاز ۱۷-C — Queue & Integrations:** adapter صف، اعلان‌ها، webhook retry/idempotency و retry visibility؛ دروازه: failure injection و بدون duplicate side effects.
4. **فاز ۱۷-D — Support & Analytics:** گزارش پشتیبانی قابل preview، آمار عملیات و شاخص‌های عملکرد کم‌هزینه؛ telemetry بیرونی جداگانه opt-in؛ دروازه: privacy review.
5. **فاز ۱۷-E — Design System & Motion:** tokens، حالت‌های اجزا، RTL/LTR، keyboard, reduced motion، asset/motion budget و screenshot tests؛ دروازه: QA accessibility + performance.
6. **فاز ۱۷-F — Beta, Docs & Rollout:** مستندات، known limitations، آموزش owner/designer، نسخه آزمایشی و rollout تدریجی؛ دروازه: گزارش نصب/ارتقا و rollback قابل بازبینی.

## خ) منابع مرجع برای تصمیم‌های نسخه ۱۷

این الحاقیه بر منابع فنی عمومی و مستندات رسمی زیر تکیه دارد؛ ارجاع‌ها برای مطالعه و بازبینی نسخه‌های بعدی هستند، نه ادعای آزمایش محصول SedRazavi OS:

- WordPress Plugin Handbook، privacy by design، error debugging و REST API permissions: [Plugin Handbook](https://developer.wordpress.org/plugins/)؛ [Privacy](https://developer.wordpress.org/plugins/privacy/)؛ [Debugging](https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/)؛ [REST API custom endpoints](https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/)
- WordPress Site Health و cron: [Site Health tests](https://developer.wordpress.org/reference/classes/wp_site_health/get_tests/)؛ [WP-Cron](https://developer.wordpress.org/plugins/cron/)؛ [Scheduling WP-Cron](https://developer.wordpress.org/plugins/cron/scheduling-wp-cron-events/)
- WooCommerce logging و job queues: [WooCommerce logging](https://developer.woocommerce.com/docs/best-practices/data-management/logging/)؛ [Action Scheduler administration](https://actionscheduler.org/admin/)
- استانداردهای performance/motion: [Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds)؛ [Animation performance](https://web.dev/articles/animations-and-performance)؛ [prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion)
- دسترس‌پذیری حرکت: [WCAG Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)؛ [Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide)
- الگوهای رابط ادمین/داده: [WordPress Admin UI](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-admin-ui/)؛ [Data Views](https://developer.wordpress.org/news/2024/08/using-data-views-to-display-and-interact-with-data-in-plugins/)؛ [DataForm](https://developer.wordpress.org/news/2026/01/how-to-use-dataform-to-create-plugin-settings-pages/)
- ابزار تشخیص توسعه: Query Monitor اسناد خود را برای queryها، PHP errors، hooks، blocks، assets و REST/AJAX منتشر می‌کند؛ این نمونه ابزار توسعه/diagnostics است و نباید به‌عنوان وابستگی اجباری محصول تلقی شود.[Query Monitor](https://wordpress.org/plugins/query-monitor/)

## د) مسترپرامپت الحاقی v17.0

```text
سند SedRazavi OS را با بخش نسخه ۱۷.۰، «پایش‌پذیری، تحلیل عملیاتی و سیستم رابط/موشن تطبیقی»، ارتقا بده. هدف، تشخیص ایمن و قابل‌فهم برای مالک و طراح سایت است، نه telemetry مخفی یا وعده uptime.

۱. Monitoring و Observability:
- مرکز سلامت پیشخوان را با Site Health، نسخه‌های runtime، REST/SSL/loopback/cron، خطاهای قابلیت‌ها، صف‌ها و آخرین زمان به‌روزرسانی بساز.
- سلامت داخلی را از uptime بیرونی تفکیک کن؛ قابلیت داخل سایت هیچ‌گاه ادعا نکند خاموشی کامل را گزارش می‌دهد. connector بیرونی اختیاری و با رضایت مالک باشد.
- event schema کمینه با event ID، UTC time، severity، module، outcome، correlation ID و context allowlist بساز. داده فرم، PII، secrets، cookies، authorization و payment data را log نکن.
- دسترسی گزارش و REST endpointها را server-side با capability/permission_callback کنترل کن؛ گزارش exportable پیش از دریافت preview و mask داشته باشد.
- telemetry سازنده خاموش پیش‌فرض؛ opt-in شفاف، قابل لغو، محلی‌محور و با retention مشخص.
- اگر WooCommerce/Action Scheduler وجود دارد با آن ادغام شو؛ صف موازی نساز مگر نیاز اثبات شود. WP-Cron ممکن است به‌دلیل page-load دیر اجرا شود؛ وضعیت overdue را صادقانه نمایش بده.
- هر هشدار dedupe، cooldown، severity، owner، action و وضعیت resolution داشته باشد. auto-remediation فقط dry-run، رضایت، checkpoint و undo.

۲. لاگ، تحلیل و کارایی:
- log adapter استاندارد، retention batch، redaction، pagination و capability اختصاصی.
- performance monitoring کم‌هزینه و sampling/on-demand؛ SAVEQUERIES و trace پرجزئیات دائمی فعال نشود.
- Core Web Vitals را از lab و field جدا کن؛ field فقط با رضایت، نمونه‌گیری و بدون شناسایی شخصی.
- فرم گزارش پشتیبانی، health checkهای خواندنی، last-seen و correlation ID اضافه کن.

۳. ارتقای Design System و Admin UX:
- tokenهای معنایی برای رنگ، فضا، تایپوگرافی، focus، سایه، motion و z-index؛ presetهای niche بدون شکستن کنتراست/معنا.
- از الگوهای عمومی و نسخه‌سازگار WordPress برای layout، data tables/views، forms و navigation استفاده کن؛ API آزمایشی بدون fallback/تست نسخه هدف را هسته نکن.
- role-based overview، progressive disclosure، جستجو/فیلتر، empty/loading/error/success/offline/permission states، preview و undo را پیاده کن.
- RTL/LTR، keyboard navigation، screen reader names، focus-visible، touch و متن طولانی را تست کن.

۴. Motion/Animation:
- taxonomy و motion budget تعریف کن؛ feedback و transitions کوتاه/معنادار، decorative motion خاموش/محدود، autoplay/parallax/scroll-jacking اجباری ممنوع.
- ترجیح transform/opacity و اجتناب از layout/paint-heavy animation؛ `prefers-reduced-motion` را در CSS و JS رعایت کن.
- motion خودکار طولانی یا محتوای auto-updating دارای pause/stop/hide باشد؛ انیمیشن جایگزین بازخورد متنی/semantic نشود.
- motion preset (off/reduced/standard)، visual regression و performance test روی موبایل هدف بساز.

۵. تست و تحویل:
- DoDهای OBS/UX/MOTION/OPS در سند را به تست‌های automated و manual با محیط/نسخه مشخص تبدیل کن.
- failure injection برای REST، cron، queue، SMTP/SMS/webhook/GitHub و محدودیت حافظه؛ ثابت کن duplicate action رخ نمی‌دهد و داده حساس در log/export ظاهر نمی‌شود.
- هر خروجی را با known limitations و evidence منتشر کن. ادعای «بدون خطا»، «در لحظه»، «۱۰۰٪ uptime» و «صفر CLS» نکن مگر دامنه سنجش تعریف و مدرک ثبت شده باشد.
```

## ذ) جمع‌بندی نسخه ۱۷ و وضعیت

طرح نسخه ۱۷، پایش را از یک نمودار تزئینی به چرخه عملیاتی «تشخیص ← توضیح اثر ← اقدام کنترل‌شده ← ثبت نتیجه» تبدیل می‌کند و رابط را با وضعیت‌های قابل‌فهم، motion قابل‌کنترل، قابلیت دسترسی و محدودیت‌های واقعی WordPress هماهنگ می‌سازد. این نسخه برنامه و معیار پذیرش است؛ افزونه، کد مانیتورینگ، analytics یا GitHub Actions تغییر نکرده و هنوز در محیط WordPress آزمایش نشده‌اند. منابع وب برای تدوین این نسخه بررسی شدند؛ این بررسی، آزمون تجربی محصول یا ادعای مطالعه همه سایت‌های بازار نیست.
