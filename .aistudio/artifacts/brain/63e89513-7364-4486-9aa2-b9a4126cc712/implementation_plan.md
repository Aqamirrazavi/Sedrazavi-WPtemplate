# بانک جامع ویجت‌ها و تمپلیت‌های المنتور و تم‌بیلدر المنتور پرو (SedRazavi Elementor Suite)

این برنامه بر اساس اولویت مستقیم شما برای ایجاد **یک بانک مستقل، حرفه‌ای و پریمیوم از ویجت‌ها و تمپلیت‌های المنتوری** بازنویسی شده است؛ به‌گونه‌ای که بتوانید این افزونه را به **هر وب‌سایت وردپرسی** اضافه کنید و در کوتاه‌ترین زمان، یک وب‌سایت مدرن و پرسرعت با صفحات فرود و بخش‌های پیش‌نیاز Theme Builder المنتور پرو ایجاد نمایید. تمام کدها ۱۰۰٪ مبتنی بر استانداردهای بومی WordPress 6.7+، Elementor Core/Pro، PHP 8.1–8.3، HTML5 معنایی و CSS3 بوده و هیچ‌گونه وابستگی به فریمورک‌های سنگین (نظیر ری‌اکت در وردپرس) ندارند.

---

## ۱. بانک تمپلیت‌های پیش‌نیاز Theme Builder المنتور پرو و صفحات اصلی

این تمپلیت‌ها با فرمت استاندارد رسمی المنتور (`elementor_library`) و متادیتای اختصاصی تولید می‌شوند تا طراح بتواند تنها با یک کلیک آن‌ها را در کتابخانه الگوهای المنتور وارد کند یا به بخش Theme Builder اختصاص دهد:

| نوع تمپلیت (Type) | نام تمپلیت در بسته | کارکرد و مشخصات فنی |
|---|---|---|
| **برگه اصلی (Homepage Canvas)** | `template-home-saas-master.json` | برگه اصلی استارتاپی و نرم‌افزاری: هیرو متحرک، بنتو گرید، آمار، معرفی ویژگی‌ها، تعرفه‌ها، نظرات و CTA نهایی. |
| **برگه اصلی (Homepage Corporate)** | `template-home-corporate-pro.json` | برگه اصلی رسمی و شرکتی: بنر اسلایدر ویدیویی، معرفی هیئت مدیره، جدول مقایسه خدمات، گواهینامه‌ها و فرم مشاوره. |
| **برگه اصلی (Agency Showcase)** | `template-home-creative-agency.json` | برگه اصلی آژانس‌های طراحی و بازاریابی: شوکیس نمونه‌کارها با هاور سه‌بعدی، بیانیه ماموریت و تایپوگرافی جسورانه. |
| **برگه نوشته تکی (Single Post)** | `template-single-post-modern.json` | پیش‌نیاز Theme Builder: هدر داینامیک، نوار پیشرفت مطالعه، کادر نویسنده، دکمه‌های اشتراک‌گذاری، باکس مقالات مرتبط و کامنت‌ها. |
| **برگه آرشیو و وبلاگ (Archive Posts)**| `template-archive-blog-grid.json` | پیش‌نیاز Theme Builder: گرید واکنش‌گرا با فیلتر دسته‌بندی‌ها، سایدبار چسبان جستجو و صفحه‌بندی آجاکس. |
| **سربرگ چسبان (Header)** | `template-header-sticky-glass.json` | پیش‌نیاز Theme Builder: هدر شیشه‌ای (Backdrop Filter)، سوییچر دوزبانه (FA/EN)، مگامنو و دکمه CTA سریع. |
| **پابرگ غنی (Footer)** | `template-footer-mega-4col.json` | پیش‌نیاز Theme Builder: ۴ ستون ناوبری، خبرنامه ایمیلی، شبکه‌های اجتماعی، نمادهای اعتماد و کپی‌رایت پویا. |
| **صفحه خطای ۴۰۴ (Error 404)** | `template-error-404-smart.json` | پیش‌نیاز Theme Builder: گرافیک برداری جذاب، کادر جستجوی هوشمند و لینک‌های سریع به صفحات کلیدی. |
| **برگه جستجو (Search Results)** | `template-search-results.json` | پیش‌نیاز Theme Builder: صفحه نتایج تمیز با هایلایت عبارت جستجو و فیلتر بر اساس تاریخ و دسته. |

---

## ۲. بانک ویجت‌های پریمیوم لندینگ‌پیج در افزونه `elementor-addon-suite`

ویجت‌های بومی ثبت‌شده با استانداردهای رسمی المنتور (`\Elementor\Widget_Base` و `\Elementor\Controls_Manager`):

```
elementor-addon-suite/includes/widgets/
├── class-widget-landing-hero.php         # هیرو فرود تعاملی با دکمه‌های تبدیل و ویدیو مودال
├── class-widget-pricing-switcher.php     # جدول قیمت با سوییچ ماهانه/سالانه و تخفیف خودکار
├── class-widget-bento-features.php       # شبکه بنتو گرید نامتقارن با آیکون‌های SVG داخلی
├── class-widget-fomo-countdown.php       # نوار فوریت و شمارش معکوس روانشناسی فروش
├── class-widget-social-proof-ticker.php  # اعلان فعالیت و خریدهای زنده کاربران
├── class-widget-before-after.php         # اسلایدر مقایسه تصویری قبل و بعد
├── class-widget-faq-schema.php           # آکاردئون سوالات متداول با تولید خودکار Schema.org
├── class-widget-testimonial-carousel.php # اسلایدر نظرات با ریتینگ و پاپ‌آپ ویدیوی رضایت
├── class-widget-case-timeline.php        # تایم‌لاین مراحل کار و داستان رشد
├── class-widget-contact-booking.php      # فرم رزرو و لید چندمرحله‌ای با اعتبارسنجی
├── class-widget-floating-dock.php        # داک شناور تماس سریع و شبکه‌های اجتماعی
└── class-widget-banner-slider.php        # اسلایدر بنر سبک با کنترل‌های تاچ
```

---

## ۳. موتور درون‌ریزی مستقیم به کتابخانه المنتور (Template Importer Engine)

برای این که اضافه کردن تمپلیت‌ها به هر وب‌سایت در چند ثانیه و بدون نیاز به آپلود دستی فایل انجام شود:

۱. **کلاس `UniversalElementorSuite\Template_Importer`**:
   - اسکن خودکار پوشه `elementor-addon-suite/templates/`.
   - استخراج متادیتای هر تمپلیت (عنوان، دسته‌بندی، نوع تم‌بیلدر، اسکرین‌شات پیش‌نمایش).
   - تابع بومی `import_template_to_library($template_slug)`:
     - ثبت رکورد در `wp_posts` با `post_type = 'elementor_library'`.
     - ذخیره تنظیمات در `_elementor_data` و `_elementor_template_type` (مانند `section`، `page`، `header`، `footer`، `single-post`).
     - ذخیره متای ویرایشگر `_elementor_edit_mode = 'builder'`.
۲. **صفحه پیشخوان الگوها در وردپرس**:
   - تب «الگوهای آماده المنتور» در منوی پیشخوان وردپرس.
   - کارت‌های تصویری با دکمه «پیش‌نمایش زنده» و دکمه سبز «درون‌ریزی به الگوهای المنتور».
   - پشتیبانی از سازگاری کامل با المنتور رایگان و المنتور پرو بدون تداخل.

---

## ۴. سازنده و بسته‌بند افزونه (Elementor Widget Plugin Maker & Packager)

منطبق بر ابزار اختصاصی بارگذاری‌شده (`elementor-widget-plugin-maker`):
- قابلیت اسکن اتوماتیک تمام کلاس‌های ویجت.
- تولید فایل اصلی لودر ویجت‌ها (`includes/widgets-loader.php`) با اکشن `elementor/widgets/register`.
- ساخت خودکار بسته ZIP استاندارد، مستقل و قابل نصب روی هر سایت وردپرسی با یک کلیک.
- امکان نصب در هاست‌های اشتراکی، لایت‌اسپید و سرورهای اختصاصی با PHP 7.4 تا 8.3+.

---

## ۵. گام‌های اجرایی فازبندی‌شده (Implementation Steps)

1. **گام ۱: توسعه فایل‌های تمپلیت JSON برای صفحات فرود و Theme Builder**:
   - ایجاد تمپلیت‌های کامل در `elementor-addon-suite/templates/`:
     - `template-home-saas-master.json`
     - `template-single-post-modern.json`
     - `template-archive-blog-grid.json`
     - `template-header-sticky-glass.json`
     - `template-footer-mega-4col.json`
     - `template-error-404-smart.json`
2. **گام ۲: پیاده‌سازی و نهایی‌سازی ویجت‌های لندینگ‌پیج در `includes/widgets/`**:
   - کدنویسی کامل کلاس‌های `class-widget-landing-hero.php`, `class-widget-pricing-switcher.php`, `class-widget-bento-features.php`, `class-widget-fomo-countdown.php`, `class-widget-social-proof-ticker.php`, `class-widget-before-after.php`, `class-widget-faq-schema.php`.
   - ثبت در `class-plugin.php` و پشتیبانی از استایل‌های واکنش‌گرا.
3. **گام ۳: ارتقای موتور `Template_Importer` برای درون‌ریزی تک‌کلیکی به `elementor_library`**:
   - پیاده‌سازی اکشن آجاکس `uas_import_template` با بررسی Nonce و دسترسی مدیر (`manage_options`).
4. **گام ۴: طراحی پیشخوان تنظیمات و کاتالوگ الگوها در وردپرس بدون ری‌اکت**:
   - صفحه تنظیمات ساده، سریع و مدرن برای فعال/غیرفعال کردن ویجت‌ها و دکمه‌های ایمپورت تمپلیت‌ها.
5. **گام ۵: بسته‌بندی فایل ZIP نهایی و اعتبارسنجی خودکار**:
   - اجرای اسکریپت ساخت فایل فشرده `elementor-addon-suite.zip` در پوشه عمومی.
   - اجرای تست‌های تضمین کیفیت و اطمینان از سلامت ۱۰۰٪ عملکرد.
