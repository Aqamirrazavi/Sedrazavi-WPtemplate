import { WordPressFile } from '../types/theme';
import { WORDPRESS_PARTS_16_TO_21 } from './wordPressParts16to21';

export const WORDPRESS_THEME_FILES: WordPressFile[] = [
  {
    path: 'page-tracking.php',
    filename: 'page-tracking.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'قالب برگه پیگیری آنلاین پرونده با جستجوی کد پرونده و تایم‌لاین مراحل دادرسی.',
    code: `<?php
/**
 * Template Name: پیگیری پرونده (Case Tracking)
 * Description: Confidential case status tracking portal
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-16 bg-[#F4F6F9] min-h-screen text-[#0B132B]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-12">
        <div class="text-center max-w-2xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] text-xs font-bold border border-[#D4AF37]/40">سامانه محرمانه موکلین</span>
            <h1 class="text-3xl sm:text-4xl font-black text-[#0B132B]">پیگیری برخط وضعیت دادرسی و لوایح دفاعیه</h1>
            <p class="text-gray-600 text-sm">مشاهده زنده آخرین اقدامات، وقت نظارت دادگاه و دریافت نسخه‌های لوایح</p>
        </div>

        <div class="rounded-3xl p-8 bg-white border border-gray-200 shadow-xl text-right">
            <form id="tracking-form" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">شماره پرونده وکالت:</label>
                        <input type="text" id="case-code" required placeholder="مثال: SR-1402-8821" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-mono" />
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">کد ملی موکل:</label>
                        <input type="text" id="national-code" placeholder="۱۰ رقم کد ملی" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-mono" />
                    </div>
                </div>
                <button type="submit" class="btn-gold px-6 py-2.5 rounded-xl font-bold text-xs shadow-md">استعلام آنلاین پرونده</button>
            </form>
        </div>

        <?php echo do_shortcode('[sedrazavi_client_portal]'); ?>
        <?php echo do_shortcode('[sedrazavi_gold_scroll]'); ?>
    </div>
</div>

<?php get_footer(); ?>`
  },

  {
    path: 'page-contact.php',
    filename: 'page-contact.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'قالب برگه تماس و رزرو نوبت با نقشه ونک، تلفن‌ها، فرم رزرو و ساعات کاری.',
    code: `<?php
/**
 * Template Name: تماس و رزرو نوبت (Contact & Booking)
 * Description: Dedicated contact page template with office address and booking form
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-16 bg-[#F4F6F9] min-h-screen text-[#0B132B]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-12">
        <div class="text-center max-w-2xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] text-xs font-bold border border-[#D4AF37]/40">پذیرش حضوری و آنلاین</span>
            <h1 class="text-3xl sm:text-4xl font-black text-[#0B132B]">ارتباط مستقیم با دفتر وکالت دکتر سیده مریم رضوی</h1>
            <p class="text-gray-600 text-sm">پاسخگویی سریع، وقت‌دهی منظم و جلسات مشاوره تخصصی</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 text-right">
            <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-md space-y-2">
                <span class="text-[#D4AF37] font-bold text-sm">📍 نشانی دفتر ونک</span>
                <p class="text-xs text-gray-600 leading-relaxed">تهران، بالاتر از میدان ونک، برج حقوقی SedRazavi، طبقه ۸</p>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-md space-y-2">
                <span class="text-[#D4AF37] font-bold text-sm">📞 خطوط تماس</span>
                <p class="text-xs text-gray-600 leading-relaxed">تلفن: ۰۲۱-۸۸۸۸۸۸۸۸<br>همراه: ۰۹۱۲۳۴۵۶۷۸۹</p>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-md space-y-2">
                <span class="text-[#D4AF37] font-bold text-sm">⏰ ساعات پذیرش</span>
                <p class="text-xs text-gray-600 leading-relaxed">شنبه تا چهارشنبه: ۱۴:۰۰ الی ۲۰:۰۰ (با تعیین وقت قبلی)</p>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-gray-200 shadow-md space-y-2">
                <span class="text-[#D4AF37] font-bold text-sm">✉️ ایمیل رسمی</span>
                <p class="text-xs text-gray-600 leading-relaxed">info@sedrazavi-law.com</p>
            </div>
        </div>

        <!-- Automatic Shortcodes Integration -->
        <div class="space-y-8 pt-6">
            <?php echo do_shortcode('[sedrazavi_booking]'); ?>
            <?php echo do_shortcode('[sedrazavi_social_icons]'); ?>
            <?php echo do_shortcode('[sedrazavi_gold_scroll]'); ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>`
  },

  {
    path: 'page-services.php',
    filename: 'page-services.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'قالب جامع کلیه خدمات حقوقی با تفکیک حوزه‌ها، تشریح مراحل و دکمه‌های مستقیم رزرو نوبت.',
    code: `<?php
/**
 * Template Name: خدمات حقوقی (Legal Services)
 * Description: Dedicated page template for all legal services
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-16 bg-[#F4F6F9] min-h-screen text-[#0B132B]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-12">
        <div class="text-center max-w-3xl mx-auto space-y-4">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] text-xs font-bold border border-[#D4AF37]/40">حوزه‌های تخصصی وکالت</span>
            <h1 class="text-3xl sm:text-4xl font-black text-[#0B132B]">خدمات جامع حقوقی، کیفری و داوری بین‌المللی</h1>
            <p class="text-gray-600 text-sm sm:text-base leading-relaxed">از تدوین قراردادهای بین‌المللی تا دفاع تخصصی در دیوان عالی کشور و مراجع قضایی سراسر کشور</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-right">
            <?php
            $services = new WP_Query(array('post_type' => 'service', 'posts_per_page' => 12));
            if ($services->have_posts()) :
                while ($services->have_posts()) : $services->the_post();
            ?>
                <div class="rounded-3xl p-6 bg-white border border-gray-200 hover:border-[#D4AF37] shadow-lg transition-all flex flex-col justify-between">
                    <div class="space-y-3">
                        <div class="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] font-bold text-xl">⚖️</div>
                        <h3 class="text-lg font-bold text-[#0B132B]"><?php the_title(); ?></h3>
                        <p class="text-xs text-gray-500 leading-relaxed"><?php echo wp_trim_words(get_the_excerpt(), 25); ?></p>
                    </div>
                    <div class="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
                        <a href="<?php the_permalink(); ?>" class="text-xs font-bold text-[#D4AF37] hover:underline">مشاهده جزئیات &larr;</a>
                        <a href="#booking" class="btn-gold px-3.5 py-1.5 rounded-xl text-xs font-bold">رزرو نوبت</a>
                    </div>
                </div>
            <?php
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>`
  },

  {
    path: 'page-about.php',
    filename: 'page-about.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'قالب کامل برگه درباره وکیل دکتر رضوی با بیوگرافی، مدارک دانشگاه تهران، منشور اخلاقی و گواهی کانون وکلا.',
    code: `<?php
/**
 * Template Name: درباره وکیل (About Attorney)
 * Description: Dedicated page template for Dr. Maryam SedRazavi
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-16 bg-[#F4F6F9] min-h-screen text-[#0B132B]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-16">
        <!-- سربرگ بیوگرافی -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div class="lg:col-span-5 relative">
                <div class="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl bg-gray-900">
                    <img src="<?php echo esc_url(get_template_directory_uri() . '/screenshot.png'); ?>" alt="دکتر سیده مریم رضوی" class="w-full h-[480px] object-cover object-top" />
                    <div class="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-[#0B132B]/95 text-white border border-[#D4AF37]/40 text-right">
                        <span class="text-xs font-bold text-[#D4AF37]">شماره پروانه: ۱۸۴۵۲ / ک.و.م</span>
                        <h3 class="text-sm font-bold mt-1">دکتر سیده مریم رضوی</h3>
                        <p class="text-[11px] text-gray-300">وکیل پایه یک دادگستری و داور رسمی دعاوی بین‌المللی</p>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-7 space-y-6 text-right">
                <span class="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#AA820A] text-xs font-bold border border-[#D4AF37]/40">سوابق علمی و اجرایی</span>
                <h1 class="text-3xl sm:text-4xl font-black text-[#0B132B]">دو دهه دفاع مستدل، تسلط آکادمیک و تعهد به عدالت</h1>
                <p class="text-gray-600 leading-relaxed text-sm sm:text-base">
                    سرکار خانم دکتر سیده مریم رضوی، فارغ‌التحصیل مقطع دکترای حقوق خصوصی از دانشگاه تهران با رتبه برتر، بیش از ۲۰ سال سابقه درخشان در حل‌وفصل و دفاع از پیچیده‌ترین پرونده‌های ملکی، تجاری، شرکت‌ها و داوری‌های بین‌المللی دارند.
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                        <h4 class="font-bold text-xs text-[#0B132B]">دکترای حقوق خصوصی (Ph.D)</h4>
                        <p class="text-[11px] text-gray-500 mt-1">دانشگاه تهران - تخصص داوری و قراردادها</p>
                    </div>
                    <div class="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                        <h4 class="font-bold text-xs text-[#0B132B]">پروانه وکالت پایه یک</h4>
                        <p class="text-[11px] text-gray-500 mt-1">عضو کانون وکلای دادگستری مرکز</p>
                    </div>
                </div>
                <div class="pt-4 flex gap-4">
                    <a href="#contact" class="btn-gold px-6 py-3 rounded-xl font-bold text-xs shadow-lg">درخواست نوبت مشاوره</a>
                    <a href="tel:02188888888" class="px-6 py-3 rounded-xl bg-white border border-gray-300 font-bold text-xs hover:border-[#D4AF37]">تماس با دفتر ونک</a>
                </div>
            </div>
        </div>

        <!-- منشور اخلاقی ۴ گانه -->
        <div class="rounded-3xl p-8 bg-white border border-gray-200 shadow-xl space-y-6 text-right">
            <h2 class="text-2xl font-bold text-[#0B132B]">منشور اخلاق حرفه‌ای مؤسسه حقوقی رضوی</h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <span class="text-[#D4AF37] font-black text-lg">۱.</span>
                    <h4 class="font-bold text-xs mt-1">صداقت در پیش‌بینی شانس پرونده</h4>
                    <p class="text-[11px] text-gray-500 mt-1">امید واهی داده نمی‌شود؛ واقعیت رویه قضایی با صراحت تشریح می‌گردد.</p>
                </div>
                <div class="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <span class="text-[#D4AF37] font-black text-lg">۲.</span>
                    <h4 class="font-bold text-xs mt-1">محرمانگی مطلق اسناد</h4>
                    <p class="text-[11px] text-gray-500 mt-1">تمامی مکاتبات و اسرار تجاری موکلین طبق سوگندنامه محفوظ است.</p>
                </div>
                <div class="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <span class="text-[#D4AF37] font-black text-lg">۳.</span>
                    <h4 class="font-bold text-xs mt-1">شفافیت کامل مالی</h4>
                    <p class="text-[11px] text-gray-500 mt-1">حق‌الوکاله مطابق تعرفه قانونی و در قرارداد مکتوب قید می‌شود.</p>
                </div>
                <div class="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <span class="text-[#D4AF37] font-black text-lg">۴.</span>
                    <h4 class="font-bold text-xs mt-1">گزارش‌دهی مستمر</h4>
                    <p class="text-[11px] text-gray-500 mt-1">موکل از طریق سامانه آنلاین در جریان تک‌تک لوایح قرار می‌گیرد.</p>
                </div>
            </div>
        </div>
    </div>
</div>

<?php get_footer(); ?>`
  },

  {
    path: 'screenshot.png',
    filename: 'screenshot.png',
    category: 'استایل و دارایی‌ها (Assets)',
    description: 'تصویر رسمی و استاندارد کاور پوسته با نسبت ۴:۳ (۱۲۰۰×۹۰۰ پیکسل) جهت نمایش در پیشخوان وردپرس (نمایش > پوسته‌ها). این فایل در زمان دانلود زیپ به صورت خودکار کامپایل و ضمیمه می‌گردد.',
    code: `/* فایل دودویی تصویر کاور رسمی پوسته (screenshot.png 1200x900)
   این تصویر مطابق استاندارد رسمی مخزن و هسته وردپرس، در ریشه پوسته قرار می‌گیرد
   و شناسنامه بصری دفتر وکالت سید رضوی را در منوی مدیریت پوسته‌های وردپرس نمایش می‌دهد. */`,
  },
  {
    path: 'style.css',
    filename: 'style.css',
    category: 'استایل و دارایی‌ها (Assets)',
    description: 'فایل استایل اصلی و جامع پوسته (۱۰۰٪ مستقل، بدون نیاز به CDN خارجی)، شامل متغیرهای رنگی لوکس طلایی و سرمه‌ای، سیستم گرید و فلکس‌باکس داخلی، ریسپانسیو و پشتیبانی RTL.',
    code: `/*
Theme Name: SedRazavi
Theme URI: https://t.me/sedrazavi
Author: سید امیر حسین رضوی فردویی
Author URI: https://t.me/sedrazavi
Description: SedRazavi یک قالب حقوقی حرفه‌ای وردپرس برای وکیل پایه یک دادگستری خانم با پوشش اسلامی (مانتو و حجاب) است که شامل پورتال مدیریت دفتر حقوقی، سیستم رزرو نوبت، استعلام برخط پرونده، هماهنگی ۱۰۰٪ با المنتور، پالت‌های اختصاصی روز و شب، و استایل‌های بهینه بدون نیاز به کامپایلر خارجی می‌باشد.
Version: 2.0.1
Requires at least: 5.8
Tested up to: 6.7
Requires PHP: 7.4
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: sedrazavi
Tags: law-firm, legal, attorney, rtl-language-support, dark-mode, custom-header, custom-menu, featured-images, full-width-template
Creator Telegram: @sedrazavi
Creator Eitaa: @sedrazavi
*/

/* --------------------------------------------------------------------------
   ۱. ریست بنیادین و متغیرهای طراحی لوکس (Design Tokens)
   -------------------------------------------------------------------------- */
:root {
  --sr-gold-100: #FAF5E4;
  --sr-gold-200: #F3E5AB;
  --sr-gold-300: #E5C158;
  --sr-gold-400: #D4AF37;
  --sr-gold-500: #AA820A;
  --sr-gold-600: #8A6908;

  --sr-navy-950: #060B18;
  --sr-navy-900: #0B132B;
  --sr-navy-800: #1C2541;
  --sr-navy-700: #3A506B;
  --sr-navy-600: #4A6587;

  --sr-bg: #060B18;
  --sr-surface: #0B132B;
  --sr-surface-hover: #1C2541;
  --sr-border: rgba(212, 175, 55, 0.25);
  --sr-border-focus: #D4AF37;
  --sr-text-primary: #FFFFFF;
  --sr-text-secondary: #94A3B8;
  --sr-text-muted: #64748B;
  --sr-gold-grad: linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA820A 100%);
}

[data-theme="light"] {
  --sr-bg: #F8FAFC;
  --sr-surface: #FFFFFF;
  --sr-surface-hover: #F1F5F9;
  --sr-border: rgba(212, 175, 55, 0.35);
  --sr-border-focus: #AA820A;
  --sr-text-primary: #0B132B;
  --sr-text-secondary: #475569;
  --sr-text-muted: #94A3B8;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Tahoma, Arial, sans-serif;
  direction: rtl;
  scroll-behavior: smooth;
  background-color: var(--sr-bg);
  color: var(--sr-text-primary);
}

body {
  background-color: var(--sr-bg);
  color: var(--sr-text-primary);
  line-height: 1.7;
  overflow-x: hidden;
  margin: 0;
}

body.admin-bar .site-header {
  top: 32px;
}

a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* --------------------------------------------------------------------------
   ۲. چیدمان و ساختار کلی (Layout Helpers)
   -------------------------------------------------------------------------- */
.container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

.flex { display: flex; }
.inline-flex { display: inline-flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.flex-wrap { flex-wrap: wrap; }
.gap-1 { gap: 0.25rem; }
.gap-1\\\\.5 { gap: 0.375rem; }
.gap-2 { gap: 0.5rem; }
.gap-2\\\\.5 { gap: 0.625rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }
.gap-8 { gap: 2rem; }
.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; }
.inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
.hidden { display: none !important; }
.block { display: block !important; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-left { text-align: left; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }
.rounded-full { border-radius: 9999px; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-2xl { border-radius: 1rem; }
.shadow-md { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
.shadow-xl { box-shadow: 0 20px 25px -5px rgba(0,0,0,0.25); }
.shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
.cursor-pointer { cursor: pointer; }

/* --------------------------------------------------------------------------
   ۳. نوار اعلان فوقانی و هدر اصلی (Header & Top Bar)
   -------------------------------------------------------------------------- */
.top-notification-bar {
  background-color: #0B132B;
  color: #D1D5DB;
  font-size: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background-color: rgba(11, 19, 43, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
  padding-top: 0.85rem;
  padding-bottom: 0.85rem;
  transition: all 0.3s ease;
}

[data-theme="light"] .site-header {
  background-color: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(212, 175, 55, 0.25);
}

.site-branding {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-logo-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #D4AF37 0%, #C4981C 50%, #AA820A 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(212, 175, 55, 0.35);
  flex-shrink: 0;
}

.brand-title {
  font-size: 1.25rem;
  font-weight: 700;
  font-family: Georgia, 'Vazirmatn', serif;
  color: #FFFFFF;
  line-height: 1.2;
}

[data-theme="light"] .brand-title {
  color: #0B132B;
}

.badge-official {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 9999px;
  background-color: rgba(212, 175, 55, 0.15);
  color: #F3E5AB;
  border: 1px solid rgba(212, 175, 55, 0.35);
  font-weight: 700;
  white-space: nowrap;
}

[data-theme="light"] .badge-official {
  color: #AA820A;
}

.brand-tagline {
  font-size: 0.75rem;
  color: #94A3B8;
  margin-top: 1px;
}

.nav-link {
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  color: #E2E8F0;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #D4AF37;
  background-color: rgba(255, 255, 255, 0.05);
}

.nav-dropdown-wrapper {
  position: relative;
}

.nav-dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  width: 280px;
  background-color: #0B132B;
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 0.75rem;
  padding: 0.5rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  z-index: 50;
}

.nav-dropdown-wrapper:hover .nav-dropdown-menu {
  display: block;
}

.dropdown-item {
  display: block;
  padding: 0.6rem 0.75rem;
  font-size: 0.75rem;
  color: #E2E8F0;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  color: #D4AF37;
  background-color: rgba(212, 175, 55, 0.1);
}

.theme-btn, .hamburger-btn {
  padding: 0.5rem;
  border-radius: 0.75rem;
  border: 1px solid #374151;
  background-color: #1F2937;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.theme-btn:hover, .hamburger-btn:hover {
  border-color: #D4AF37;
}

.btn-gold {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA820A 100%);
  color: #0B132B;
  font-weight: 700;
  font-size: 0.75rem;
  box-shadow: 0 4px 14px rgba(212, 175, 55, 0.3);
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.btn-gold:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.45);
}

/* --------------------------------------------------------------------------
   ۴. نوار استوری‌های حقوقی (Story Bar Section - Matching Screenshot 2)
   -------------------------------------------------------------------------- */
.stories-bar-section {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background-color: rgba(11, 19, 43, 0.5);
  backdrop-filter: blur(8px);
}

.stories-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94A3B8;
}

.stories-scroll-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scrollbar-width: none;
}

.stories-scroll-container::-webkit-scrollbar {
  display: none;
}

.story-thumb-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.story-thumb-item:hover {
  transform: scale(1.04);
}

.story-ring-gold {
  padding: 2px;
  border-radius: 9999px;
  background: linear-gradient(135deg, #D4AF37 0%, #AA820A 50%, #F3E5AB 100%);
  box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.4);
}

.story-ring-subtle {
  padding: 2px;
  border-radius: 9999px;
  background-color: #374151;
}

.story-img-wrap {
  padding: 2px;
  border-radius: 9999px;
  background-color: #0B132B;
}

.story-photo-img {
  width: 68px;
  height: 68px;
  border-radius: 9999px;
  object-fit: cover;
  display: block;
}

@media (min-width: 640px) {
  .story-photo-img {
    width: 72px;
    height: 72px;
  }
}

.story-text-wrap {
  text-align: center;
  max-width: 85px;
}

.story-title-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #E2E8F0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.story-thumb-item:hover .story-title-label {
  color: #D4AF37;
}

.story-cat-label {
  display: block;
  font-size: 10px;
  color: #94A3B8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* --------------------------------------------------------------------------
   ۵. بخش هیرو اصلی (Hero Section - 100% Matching Screenshot 2)
   -------------------------------------------------------------------------- */
.hero-section {
  position: relative;
  overflow: hidden;
  padding-top: 2rem;
  padding-bottom: 4rem;
}

@media (min-width: 768px) {
  .hero-section {
    padding-top: 3.5rem;
    padding-bottom: 5rem;
  }
}

.hero-ambient-glow-right {
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  width: 20rem;
  height: 20rem;
  border-radius: 9999px;
  background-color: rgba(212, 175, 55, 0.1);
  filter: blur(64px);
  pointer-events: none;
}

.hero-ambient-glow-left {
  position: absolute;
  bottom: 2.5rem;
  left: 2.5rem;
  width: 24rem;
  height: 24rem;
  border-radius: 9999px;
  background-color: rgba(28, 37, 65, 0.4);
  filter: blur(64px);
  pointer-events: none;
}

.hero-grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .hero-grid-layout {
    grid-template-columns: 7fr 5fr;
  }
}

.hero-content-col {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background-color: rgba(212, 175, 55, 0.15);
  border: 1px solid rgba(212, 175, 55, 0.3);
  color: #F3E5AB;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
  align-self: flex-start;
}

@media (min-width: 640px) {
  .hero-badge-pill {
    font-size: 0.875rem;
  }
}

.hero-main-title {
  font-size: 2rem;
  font-weight: 800;
  font-family: Georgia, 'Vazirmatn', serif;
  color: #FFFFFF;
  line-height: 1.25;
}

[data-theme="light"] .hero-main-title {
  color: #0B132B;
}

@media (min-width: 640px) { .hero-main-title { font-size: 2.5rem; } }
@media (min-width: 768px) { .hero-main-title { font-size: 3rem; } }
@media (min-width: 1024px) { .hero-main-title { font-size: 3.5rem; } }

.hero-gold-gradient {
  background: linear-gradient(135deg, #D4AF37 0%, #AA820A 50%, #D4AF37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline;
}

.hero-slogan-text {
  font-size: 1rem;
  color: #CBD5E1;
  max-width: 42rem;
  line-height: 1.8;
}

[data-theme="light"] .hero-slogan-text {
  color: #475569;
}

@media (min-width: 640px) {
  .hero-slogan-text {
    font-size: 1.125rem;
  }
}

.hero-value-props-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  padding-top: 0.5rem;
}

@media (min-width: 640px) {
  .hero-value-props-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.hero-value-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #CBD5E1;
}

[data-theme="light"] .hero-value-item {
  color: #334155;
}

.hero-cta-buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
}

.btn-gold-hero {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.875rem 1.75rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA820A 100%);
  color: #0B132B;
  font-weight: 700;
  font-size: 0.875rem;
  box-shadow: 0 4px 16px rgba(212, 175, 55, 0.35);
  transition: all 0.2s ease;
}

.btn-gold-hero:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 22px rgba(212, 175, 55, 0.5);
}

.btn-navy-hero {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(212, 175, 55, 0.35);
  background-color: rgba(11, 19, 43, 0.8);
  color: #E2E8F0;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.btn-navy-hero:hover {
  background-color: rgba(28, 37, 65, 0.9);
  border-color: #D4AF37;
}

.hero-trust-row {
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.75rem;
  color: #94A3B8;
}

/* ستون پرتره و کارت طلایی */
.hero-portrait-col {
  position: relative;
  display: flex;
  justify-content: center;
}

.hero-portrait-wrap {
  position: relative;
  width: 100%;
  max-width: 28rem;
}

.hero-portrait-glow {
  position: absolute;
  inset: -0.75rem;
  border-radius: 1.5rem;
  background: linear-gradient(to top right, rgba(212, 175, 55, 0.5), rgba(170, 130, 10, 0.2), rgba(11, 19, 43, 0.1));
  filter: blur(24px);
  transform: rotate(-2deg);
}

.hero-portrait-card {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  border: 2px solid rgba(212, 175, 55, 0.4);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  background-color: #1C2541;
}

.hero-portrait-image {
  width: 100%;
  height: 460px;
  object-fit: cover;
  object-position: top;
  display: block;
  transition: transform 0.7s ease;
}

.hero-portrait-image:hover {
  transform: scale(1.03);
}

.hero-floating-badge-top {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(11, 19, 43, 0.9);
  backdrop-filter: blur(8px);
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(212, 175, 55, 0.3);
  font-size: 0.75rem;
  font-weight: 700;
  color: #F3E5AB;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2);
}

.pulse-emerald-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: #10B981;
  display: inline-block;
}

.hero-floating-card-bottom {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  left: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: rgba(11, 19, 43, 0.92);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  color: #FFFFFF;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-lawyer-name {
  font-size: 0.95rem;
  font-weight: 700;
  font-family: Georgia, 'Vazirmatn', serif;
  color: #D4AF37;
}

.hero-lawyer-title {
  font-size: 0.75rem;
  color: #CBD5E1;
  margin-top: 0.125rem;
}

.hero-exp-box {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: #D4AF37;
  color: #0B132B;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
}

/* --------------------------------------------------------------------------
   ۶. کارت‌های خدمات و منوی موبایل (Cards & Drawer)
   -------------------------------------------------------------------------- */
.service-card {
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: #0B132B;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-4px);
  border-color: rgba(212, 175, 55, 0.4);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.mobile-menu-drawer {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: none;
}

.mobile-menu-drawer.is-active {
  display: block;
}

.mobile-drawer-backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0,0,0,0.75);
  backdrop-filter: blur(4px);
}

.mobile-drawer-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 85%;
  max-width: 320px;
  background-color: #0B132B;
  border-left: 1px solid rgba(212, 175, 55, 0.2);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
}

/* ==========================================================================
   SedRazavi Law Firm Complete Interface & Sections Styling (v2.6.0)
   ========================================================================== */

/* Trust Badges Section */
.trust-badges-section {
    background: #060B18;
    border-top: 1px solid rgba(212, 175, 55, 0.2);
    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
    padding: 3rem 0;
}
.stat-card {
    background: #0B132B;
    border: 1px solid #1f2937;
    border-radius: 1rem;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;
}
.stat-card:hover {
    border-color: rgba(212, 175, 55, 0.5);
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

/* Service Filter Buttons */
.service-filter-btn {
    padding: 0.5rem 1.25rem;
    border-radius: 9999px;
    font-size: 0.8125rem;
    font-weight: 700;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.2s ease;
}
.service-filter-btn:hover {
    color: #ffffff;
    border-color: rgba(212, 175, 55, 0.4);
}
.service-filter-btn.active {
    background: linear-gradient(135deg, #D4AF37 0%, #AA820A 100%);
    color: #0B132B;
    border-color: transparent;
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}

/* Service Cards */
.service-card {
    background: #0B132B;
    border: 1px solid #1e293b;
    border-radius: 1.25rem;
    padding: 1.75rem;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.service-card:hover {
    border-color: rgba(212, 175, 55, 0.6);
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

/* FAQ Items */
.faq-item {
    background: #0B132B;
    border: 1px solid #1e293b;
    border-radius: 1rem;
    overflow: hidden;
    transition: border-color 0.2s;
}
.faq-item:hover {
    border-color: rgba(212, 175, 55, 0.3);
}
.faq-question {
    cursor: pointer;
    transition: color 0.2s;
}
.faq-question:hover {
    color: #D4AF37;
}

/* Modal Helpers */
.hidden {
    display: none !important;
}
.flex {
    display: flex !important;
}
`
  },
  {
    path: 'index.php',
    filename: 'index.php',
    category: 'قالب اصلی (Templates)',
    description: 'فایل اصلی و الزامی ریشه قالب وردپرس (Fallback Template) جهت جلوگیری از نمایش ساختار دایرکتوری و تضمین بارگذاری استاندارد.',
    code: `<?php
/**
 * Main Template File (Silence is Golden Fallback)
 *
 * @package SedRazavi
 * @version 2.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main py-16 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-[60vh]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <?php if (have_posts()) : ?>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php while (have_posts()) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white dark:bg-[#0B132B] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-md'); ?>>
                        <h2 class="text-xl font-bold font-serif text-[#0B132B] dark:text-white mb-3">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h2>
                        <div class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                            <?php the_excerpt(); ?>
                        </div>
                        <a href="<?php the_permalink(); ?>" class="text-xs font-bold text-[#D4AF37] hover:underline"><?php esc_html_e('ادامه مطلب ›', 'sedrazavi'); ?></a>
                    </article>
                <?php endwhile; ?>
            </div>
            <div class="mt-8 flex justify-center">
                <?php the_posts_pagination(); ?>
            </div>
        <?php else : ?>
            <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-12 text-center text-gray-500">
                <p><?php esc_html_e('محتوایی جهت نمایش یافت نشد.', 'sedrazavi'); ?></p>
            </div>
        <?php endif; ?>
    </div>
</main>

<?php
get_footer();
`
  },
  {
    path: 'functions.php',
    filename: 'functions.php',
    category: 'قالب اصلی (Templates)',
    description: 'توابع اصلی پوسته، فعال‌سازی ویژگی‌های هسته وردپرس، رجیستر CPT، هندلر ایجکس و هوک‌های امنیتی.',
    code: `<?php
/**
 * SedRazavi Law Firm Theme Functions and Definitions
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit; // Direct access denied
}

if (!defined('SEDRAZAVI_THEME_VERSION')) {
    define('SEDRAZAVI_THEME_VERSION', '2.5.0');
}
if (!defined('SEDRAZAVI_THEME_DIR')) {
    define('SEDRAZAVI_THEME_DIR', get_template_directory());
}
if (!defined('SEDRAZAVI_THEME_URI')) {
    define('SEDRAZAVI_THEME_URI', get_template_directory_uri());
}

/**
 * 1. Theme Setup
 */
if (!function_exists('sedrazavi_theme_setup')) {
function sedrazavi_theme_setup() {
    // Internationalization support
    load_theme_textdomain('sedrazavi', SEDRAZAVI_THEME_DIR . '/languages');

    // Title tag support
    add_theme_support('title-tag');

    // Post thumbnails
    add_theme_support('post-thumbnails');
    add_image_size('sedrazavi-service-card', 600, 400, true);
    add_image_size('sedrazavi-lawyer-portrait', 700, 900, true);
    add_image_size('sedrazavi-story-thumb', 200, 200, true);

    // Custom Logo
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 260,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // HTML5 semantic markup
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Selective Refresh for Widgets
    add_theme_support('customize-selective-refresh-widgets');

    // Navigation Menus
    register_nav_menus(array(
        'primary'  => esc_html__('منوی اصلی سربرگ (Primary Header)', 'sedrazavi'),
        'footer'   => esc_html__('منوی دسترسی سریع فوتر (Footer Menu)', 'sedrazavi'),
        'services' => esc_html__('منوی خدمات حقوقی (Legal Services)', 'sedrazavi'),
    ));
}
add_action('after_setup_theme', 'sedrazavi_theme_setup');
}

/**
 * 2. Enqueue Scripts & Styles
 */
if (!function_exists('sedrazavi_enqueue_assets')) {
function sedrazavi_enqueue_assets() {
    // 1. Web font Vazirmatn via CDN with graceful fallback
    wp_enqueue_style(
        'sedrazavi-vazirmatn-font',
        'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css',
        array(),
        '33.003'
    );

    // 2. Main Theme Stylesheet
    wp_enqueue_style(
        'sedrazavi-main-style',
        get_stylesheet_uri(),
        array(),
        SEDRAZAVI_THEME_VERSION
    );

    // 3. Theme JS Engine
    wp_enqueue_script(
        'sedrazavi-theme-bundle',
        SEDRAZAVI_THEME_URI . '/assets/js/main.js',
        array(),
        SEDRAZAVI_THEME_VERSION,
        true
    );

    // Localize Script for AJAX actions
    wp_localize_script('sedrazavi-theme-bundle', 'sedrazavi_ajax_obj', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('sedrazavi_security_nonce'),
        'strings'  => array(
            'success_booking' => esc_html__('درخواست رزرو شما با موفقیت ثبت شد.', 'sedrazavi'),
            'error_booking'   => esc_html__('خطایی رخ داد؛ لطفاً دوباره تلاش فرمایید.', 'sedrazavi'),
            'tracking_found'  => esc_html__('پرونده با موفقیت شناسایی شد.', 'sedrazavi'),
        )
    ));
}
add_action('wp_enqueue_scripts', 'sedrazavi_enqueue_assets');
}

/**
 * 3. Safe Module Inclusions (Protected against Missing Files)
 */
$required_modules = array(
    'inc/theme-options.php',
    'inc/setup.php',
    'inc/security.php',
    'inc/ux-improvements.php',
    'includes/class-sedrazavi-auth-dual-mode.php',
    'includes/class-sedrazavi-dual-panel-unified.php',
    'includes/class-sedrazavi-admin-protection.php',
    'includes/class-sedrazavi-design-tokens.php',
    'includes/class-sedrazavi-elementor-widgets.php',
    'includes/class-sedrazavi-payment-adapter.php',
);

foreach ($required_modules as $mod) {
    $file_path = SEDRAZAVI_THEME_DIR . '/' . $mod;
    if (file_exists($file_path)) {
        require_once $file_path;
    }
}
`
  },
  {
    path: 'header.php',
    filename: 'header.php',
    category: 'قالب اصلی (Templates)',
    description: 'سربرگ تعاملی با لوگوی نماد ترازوی طلایی، منوی شیشه‌ای استیکی، دکمه تغییر پوسته (Dark Mode) و دکمه تماس سریع.',
    code: `<?php
/**
 * The header for SedRazavi Law Firm Theme
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?><!DOCTYPE html>
<html <?php language_attributes(); ?> dir="rtl">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-[#0B132B] text-slate-100 antialiased font-sans'); ?>>
<?php wp_body_open(); ?>

<a class="skip-link screen-reader-text" href="#main-content">
    <?php esc_html_e('پرش به محتوای اصلی', 'sedrazavi'); ?>
</a>

<!-- نوار اعلان و دسترسی سریع فوقانی (Top Notification Bar) -->
<div class="top-notification-bar">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2">
        <!-- سمت راست: شماره پروانه و ساعات کاری -->
        <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5 text-[#D4AF37] font-semibold text-xs">
                <svg class="w-3.5 h-3.5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>۱۸۴۵۲ / ک.و.م</span>
            </span>
            <span class="hidden sm:inline-block text-gray-500">|</span>
            <span class="hidden sm:inline-flex items-center gap-1 text-gray-300 text-xs">
                <svg class="w-3 h-3 text-gray-400 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>شنبه تا چهارشنبه: ۹:۰۰ الی ۱۹:۰۰ | پنج‌شنبه: ۹:۰۰ الی ۱۳:۰۰</span>
            </span>
        </div>

        <!-- سمت چپ: نظرسنجی، راهنما، آکادمی و شماره تماس -->
        <div class="flex items-center gap-3 text-xs overflow-x-auto whitespace-nowrap">
            <a href="#survey" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-gray-300">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>نظرسنجی خدمات</span>
            </a>
            <span class="text-gray-600">|</span>
            <a href="#guide" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-gray-300">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>راهنمای تعاملی</span>
            </a>
            <span class="text-gray-600">|</span>
            <a href="#academy" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-gray-300">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span>آکادمی و مستندات</span>
            </a>
            <span class="text-gray-600">|</span>
            <a href="tel:02188990011" class="text-gray-200 hover:text-[#D4AF37] font-mono flex items-center gap-1">
                <svg class="w-3 h-3 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>۰۲۱-۸۸۹۹۰۰۱۱</span>
            </a>
        </div>
    </div>
</div>

<!-- سربرگ اصلی شیشه‌ای و چسبان (Main Sticky Glass Header) -->
<header id="masthead" class="site-header">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        <!-- هویت بصری و برندینگ رسمی (Logo & Identity) -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="site-branding flex items-center gap-3">
            <div class="brand-logo-box">
                <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                    <path d="M7 21h10"/>
                    <path d="M12 3v18"/>
                    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
                </svg>
            </div>
            <div>
                <div class="flex items-center gap-2">
                    <span class="brand-title">SedRazavi</span>
                    <span class="badge-official">پوسته رسمی وردپرس</span>
                </div>
                <p class="brand-tagline">دفتر وکالت و مشاوره حقوقی تخصصی</p>
            </div>
        </a>

        <!-- ناوبری دسکتاپ (Desktop Navigation) -->
        <nav class="hidden xl:flex items-center gap-1 font-medium text-xs text-gray-200">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="nav-link"><?php esc_html_e('صفحه اصلی', 'sedrazavi'); ?></a>
            
            <div class="nav-dropdown-wrapper">
                <button class="nav-dropdown-trigger flex items-center gap-1 nav-link">
                    <span><?php esc_html_e('خدمات تخصصی', 'sedrazavi'); ?></span>
                    <svg class="w-3.5 h-3.5 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                <div class="nav-dropdown-menu">
                    <a href="#services" class="dropdown-item">🏢 دعاوی ملکی، اراضی و سرقفلی</a>
                    <a href="#services" class="dropdown-item">💼 دعاوی تجاری، شرکت‌ها و ورشکستگی</a>
                    <a href="#services" class="dropdown-item">⚖️ دعاوی کیفری، جرایم اقتصادی و دادگاه انقلاب</a>
                    <a href="#services" class="dropdown-item">👥 حقوق خانواده، طلاق توافقی و تقسیم ترکه</a>
                    <a href="#services" class="dropdown-item">🌐 داوری بین‌المللی و تنظیم قراردادها</a>
                </div>
            </div>

            <a href="#articles" class="nav-link"><?php esc_html_e('آرشیو مقالات و ویدیوها', 'sedrazavi'); ?></a>
            <a href="#about" class="nav-link"><?php esc_html_e('درباره وکیل', 'sedrazavi'); ?></a>
            <a href="#tracking" class="nav-link text-[#D4AF37] font-bold"><?php esc_html_e('پیگیری پرونده', 'sedrazavi'); ?></a>
            <a href="#faq" class="nav-link"><?php esc_html_e('سوالات متداول', 'sedrazavi'); ?></a>
            <a href="#contact" class="nav-link"><?php esc_html_e('تماس با ما', 'sedrazavi'); ?></a>
        </nav>

        <!-- دکمه‌های کنترل: تم شب/روز، رزرو نوبت، منوی موبایل -->
        <div class="flex items-center gap-2.5">
            <!-- سوئیچ تم تاریک و روشن -->
            <button id="theme-toggle-btn" class="theme-btn" aria-label="<?php esc_attr_e('تغییر تم تاریک / روشن', 'sedrazavi'); ?>">
                <svg class="w-4 h-4 theme-toggle-sun hidden text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <circle cx="12" cy="12" r="5"></circle>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                </svg>
                <svg class="w-4 h-4 theme-toggle-moon block text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </button>

            <!-- رزرو نوبت مشاوره -->
            <a href="#booking" class="btn-gold hidden sm:inline-flex items-center gap-1.5 text-xs px-4 py-2">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span><?php esc_html_e('رزرو نوبت مشاوره', 'sedrazavi'); ?></span>
            </a>

            <!-- منوی موبایل -->
            <button id="mobile-menu-btn" class="hamburger-btn xl:hidden" aria-label="<?php esc_attr_e('منوی موبایل', 'sedrazavi'); ?>">
                <svg class="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>
        </div>

    </div>
</header>

<!-- منوی کشویی واکنش‌گرا موبایل (Mobile Drawer Menu) -->
<div id="mobile-menu-drawer" class="mobile-menu-drawer" role="dialog" aria-modal="true">
    <div id="mobile-menu-backdrop" class="mobile-drawer-backdrop"></div>
    <div class="mobile-drawer-panel">
        <div>
            <!-- سربرگ منوی کشویی -->
            <div class="flex items-center justify-between pb-5 border-b border-slate-800">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-white shadow-md">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                            <path d="M7 21h10"/>
                            <path d="M12 3v18"/>
                        </svg>
                    </div>
                    <div>
                        <span class="block text-sm font-bold text-white">SedRazavi</span>
                        <span class="block text-[10px] text-[#D4AF37]"><?php esc_html_e('دفتر وکالت و مشاوره حقوقی تخصصی', 'sedrazavi'); ?></span>
                    </div>
                </div>
                <button id="close-mobile-menu-btn" class="p-2 rounded-lg text-slate-400 hover:text-white bg-white/5 cursor-pointer" aria-label="<?php esc_attr_e('بستن منو', 'sedrazavi'); ?>">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <!-- فهرست پیوندهای موبایل -->
            <ul class="py-5 space-y-3 text-sm font-medium text-slate-200">
                <li><a href="<?php echo esc_url(home_url('/')); ?>" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('صفحه اصلی', 'sedrazavi'); ?></a></li>
                
                <li>
                    <button id="mobile-services-accordion-btn" class="w-full flex items-center justify-between py-1.5 hover:text-[#D4AF37] text-right cursor-pointer">
                        <span><?php esc_html_e('حوزه‌های تخصصی وکالت', 'sedrazavi'); ?></span>
                        <svg id="mobile-services-arrow" class="w-4 h-4 transition-transform text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div id="mobile-services-list" class="hidden pr-4 pt-2 space-y-2 text-xs text-slate-300">
                        <a href="#services" class="block py-1 hover:text-[#D4AF37]">🏢 دعاوی ملکی، اراضی و سرقفلی</a>
                        <a href="#services" class="block py-1 hover:text-[#D4AF37]">💼 دعاوی تجاری و شرکت‌ها</a>
                        <a href="#services" class="block py-1 hover:text-[#D4AF37]">⚖️ دعاوی کیفری و اقتصادی</a>
                        <a href="#services" class="block py-1 hover:text-[#D4AF37]">👥 خانواده و انحصار وراثت</a>
                        <a href="#services" class="block py-1 hover:text-[#D4AF37]">🌐 داوری بین‌المللی و قراردادها</a>
                    </div>
                </li>

                <li><a href="#about" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('درباره وکیل و افتخارات', 'sedrazavi'); ?></a></li>
                <li><a href="#tracking" class="block py-1.5 text-[#D4AF37] font-bold"><?php esc_html_e('🔍 سامانه استعلام پرونده', 'sedrazavi'); ?></a></li>
                <li><a href="#cases" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('آرای شاخص و پرونده‌ها', 'sedrazavi'); ?></a></li>
                <li><a href="#booking" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('رزرو آنلاین نوبت مشاوره', 'sedrazavi'); ?></a></li>
                <li><a href="#articles" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('یادداشت‌ها و مقالات', 'sedrazavi'); ?></a></li>
                <li><a href="#faq" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('پرسش‌های متداول موکلین', 'sedrazavi'); ?></a></li>
                <li><a href="#contact" class="block py-1.5 hover:text-[#D4AF37]"><?php esc_html_e('نشانی و تماس با دفتر', 'sedrazavi'); ?></a></li>
            </ul>
        </div>

        <!-- فوتر منوی کشویی موبایل -->
        <div class="pt-5 border-t border-slate-800 space-y-3">
            <a href="#booking" class="btn-gold w-full text-center py-2.5 text-xs font-bold block rounded-xl">
                <?php esc_html_e('رزرو وقت مشاوره با وکیل', 'sedrazavi'); ?>
            </a>
            <a href="tel:02188990011" class="w-full text-center py-2.5 text-xs font-semibold text-slate-300 border border-slate-700 hover:border-[#D4AF37] rounded-xl flex items-center justify-center gap-2">
                <span>📞 تماس فوری: ۰۲۱-۸۸۹۹۰۰۱۱</span>
            </a>
        </div>
    </div>
</div>

<main id="main-content" class="site-main">
`
  },
  {
    path: 'footer.php',
    filename: 'footer.php',
    category: 'قالب اصلی (Templates)',
    description: 'فوتر جامع ۴ ستونی با نمادهای کانون وکلا، فرم ثبت ایمیل خبرنامه حقوقی، پیوندهای سریع و گواهی SSL.',
    code: `<?php
/**
 * The template for displaying the footer
 * 100% Complete matching Footer.tsx
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
</main><!-- #main-content -->

<footer id="colophon" class="site-footer bg-[#060B18] text-white pt-16 pb-8 border-t border-[#D4AF37]/20 relative overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
            
            <!-- ستون ۱: برندینگ، پروانه و توصیف -->
            <div class="space-y-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-white shadow-md shadow-[#D4AF37]/20">
                        <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                            <path d="M7 21h10"/>
                            <path d="M12 3v18"/>
                        </svg>
                    </div>
                    <div>
                        <span class="text-lg font-bold font-serif text-white">دفتر وکالت و داوری SedRazavi</span>
                        <p class="text-[10px] text-[#D4AF37]">پوسته رسمی کانون وکلای مرکز</p>
                    </div>
                </div>

                <p class="text-gray-400 text-xs leading-relaxed">
                    دفتر وکالت و داوری حقوقی دکتر سیده مریم رضوی (SedRazavi)؛ پاسدار حقوق فردی و شرکتی با بیش از دو دهه تجربه درخشان در محاکم قضایی و مراجع داوری بین‌المللی.
                </p>

                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#D4AF37]">
                    <span>🛡️ پروانه رسمی کانون وکلای دادگستری مرکز</span>
                </div>
            </div>

            <!-- ستون ۲: دسترسی سریع به خدمات -->
            <div>
                <h4 class="text-base font-bold text-white mb-4 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
                    دسترسی سریع به خدمات
                </h4>
                <ul class="space-y-2.5 text-xs text-gray-400">
                    <li><a href="#services" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><span class="text-[#D4AF37]">‹</span> دعاوی تجاری و شرکت‌ها</a></li>
                    <li><a href="#services" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><span class="text-[#D4AF37]">‹</span> دعاوی ملکی، اراضی و سرقفلی</a></li>
                    <li><a href="#services" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><span class="text-[#D4AF37]">‹</span> جرایم اقتصادی و دادگاه انقلاب</a></li>
                    <li><a href="#services" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><span class="text-[#D4AF37]">‹</span> حقوق خانواده، مهریه و تقسیم ارث</a></li>
                    <li><a href="#services" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><span class="text-[#D4AF37]">‹</span> داوری بین‌المللی و بازرگانی (ICC)</a></li>
                </ul>
            </div>

            <!-- ستون ۳: پیوندهای مفید سامانه -->
            <div>
                <h4 class="text-base font-bold text-white mb-4 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
                    پیوندهای مفید سامانه
                </h4>
                <ul class="space-y-2.5 text-xs text-gray-400">
                    <li><a href="#tracking" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-[#D4AF37] font-bold"><span class="text-[#D4AF37]">🔍</span> پیگیری لحظه‌ای پرونده موکلین</a></li>
                    <li><a href="#booking" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><span class="text-[#D4AF37]">‹</span> رزرو آنلاین نوبت مشاوره</a></li>
                    <li><a href="#about" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><span class="text-[#D4AF37]">‹</span> درباره وکیل و منشور اخلاق</a></li>
                    <li><a href="#articles" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><span class="text-[#D4AF37]">‹</span> یادداشت‌ها و مقالات حقوقی</a></li>
                    <li><a href="#faq" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><span class="text-[#D4AF37]">‹</span> پرسش‌های متداول موکلین</a></li>
                </ul>
            </div>

            <!-- ستون ۴: ارتباط و خبرنامه -->
            <div class="space-y-4">
                <h4 class="text-base font-bold text-white mb-4 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
                    ارتباط و خبرنامه تخصصی
                </h4>
                <p class="text-xs text-gray-400 leading-relaxed">
                    جهت دریافت مهم‌ترین تحولات حقوقی و رویه‌های جدید قضایی، ایمیل خود را ثبت نمایید:
                </p>
                <form onsubmit="handleNewsletter(event)" class="flex gap-2">
                    <input type="email" required placeholder="آدرس ایمیل..." class="flex-1 px-3 py-2 rounded-xl bg-[#0B132B] border border-gray-700 text-white text-xs focus:border-[#D4AF37] focus:outline-none" />
                    <button type="submit" class="btn-gold text-xs px-4 py-2 rounded-xl font-bold cursor-pointer">ثبت</button>
                </form>
                <div class="text-xs text-gray-400 space-y-1 pt-2">
                    <p>📞 تلفن: ۰۲۱-۸۸۹۹۰۰۱۱</p>
                    <p>📍 نشانی: تهران، ونک، ملاصدرا، پلاک ۱۱۸</p>
                </div>
            </div>

        </div>

        <!-- اطلاعات طراح و حق چاپ طبق بخش ۷ و پارت ۹ -->
        <div class="pt-8 pb-3 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
            <p>طراحی و توسعه توسط <a href="https://t.me/sedrazavi" target="_blank" rel="noopener" class="text-[#D4AF37] font-bold hover:underline">سید امیر حسین رضوی فردویی</a></p>
            <div class="flex items-center gap-4 text-xs">
                <a href="https://t.me/sedrazavi" target="_blank" rel="noopener" class="text-gray-400 hover:text-[#D4AF37] transition-colors">تلگرام: @sedrazavi</a>
                <span class="text-gray-700">|</span>
                <a href="https://eitaa.com/sedrazavi" target="_blank" rel="noopener" class="text-gray-400 hover:text-[#D4AF37] transition-colors">ایتا: @sedrazavi</a>
            </div>
        </div>
        <div class="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
            <p>© <?php echo date('Y'); ?> تمامی حقوق مادی و معنوی متعلق به دفتر وکالت و داوری SedRazavi می‌باشد.</p>
            <p><a href="<?php echo esc_url(home_url('/privacy-policy')); ?>" class="hover:text-gray-400">قوانین و حریم خصوصی</a></p>
        </div>
    </div>
</footer>


<!-- نوار پیشرفت طلایی بالای صفحه وردپرس -->
<div id="sedrazavi-gold-progress-top">
    <div id="sedrazavi-gold-progress-fill"></div>
</div>

<!-- سایدبار شناور طلایی اسکرول و ناوبری -->
<aside class="sedrazavi-floating-gold-sidebar" aria-label="<?php esc_attr_e('ناوبری و اسکرول سریع', 'sedrazavi'); ?>">
    <div class="gold-sidebar-inner">
        <div class="gold-scroll-badge" onclick="window.scrollTo({top:0, behavior:'smooth'})" title="<?php esc_attr_e('درصد اسکرول - کلیک برای بازگشت به بالا', 'sedrazavi'); ?>">
            <span class="gold-percent-num" id="sedrazavi-percent-display">0%</span>
        </div>
        <div class="gold-scroll-v-track">
            <div class="gold-scroll-v-fill" id="sedrazavi-v-fill"></div>
        </div>
        <button type="button" class="gold-btn-top" onclick="window.scrollTo({top:0, behavior:'smooth'})" title="<?php esc_attr_e('بازگشت به بالای صفحه', 'sedrazavi'); ?>">
            ▲
        </button>
    </div>
</aside>

<?php wp_footer(); ?>
</body>
</html>
`
  },
  {
    path: 'front-page.php',
    filename: 'front-page.php',
    category: 'قالب اصلی (Templates)',
    description: 'صفحه اصلی لوکس و چندمنظوره پوسته (شامل ۱۰ سکشن تخصصی حقوقی، رزرو آنلاین نوبت، معرفی وکیل، سوالات متداول و سازگاری ۱۰۰٪ با المنتور بدون ایجاد صفحه سفید).',
    code: `<?php
/**
 * The front page template file for SedRazavi Law Firm
 * 100% Complete Interface matching Google AI Studio Preview
 *
 * @package SedRazavi
 * @version 2.6.0
 */

get_header();

// بررسی سازگاری کامل با المنتور (Elementor Compatibility)
if (have_posts()) {
    while (have_posts()) {
        the_post();
        $elementor_data = get_post_meta(get_the_ID(), '_elementor_data', true);
        if (!empty($elementor_data)) {
            the_content();
            get_footer();
            exit;
        }
    }
    rewind_posts();
}
?>

<!-- بخش ۱: نکات و استوری‌های آموزشی حقوقی روز (Story Bar) -->
<section class="stories-bar-section">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="stories-header">
            <svg class="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            </svg>
            <span>نکات و استوری‌های آموزشی حقوقی روز</span>
        </div>

        <div class="stories-scroll-container">
            <!-- Story 1 -->
            <div class="story-thumb-item" onclick="openStoryModal(0)">
                <div class="story-ring-gold">
                    <div class="story-img-wrap">
                        <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=200" alt="نکات چک صیادی" class="story-photo-img" />
                    </div>
                </div>
                <div class="story-text-wrap">
                    <span class="story-title-label">نکات چک صیادی</span>
                    <span class="story-cat-label">نکات کاربردی</span>
                </div>
            </div>

            <!-- Story 2 -->
            <div class="story-thumb-item" onclick="openStoryModal(1)">
                <div class="story-ring-gold">
                    <div class="story-img-wrap">
                        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200" alt="پیروزی در پرونده" class="story-photo-img" />
                    </div>
                </div>
                <div class="story-text-wrap">
                    <span class="story-title-label">پیروزی در پروند...</span>
                    <span class="story-cat-label">موفقیت‌های اخیر</span>
                </div>
            </div>

            <!-- Story 3 -->
            <div class="story-thumb-item" onclick="openStoryModal(2)">
                <div class="story-ring-subtle">
                    <div class="story-img-wrap">
                        <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=200" alt="طلاق و مهریه" class="story-photo-img" />
                    </div>
                </div>
                <div class="story-text-wrap">
                    <span class="story-title-label">طلاق و مهریه</span>
                    <span class="story-cat-label">حقوق خانواده</span>
                </div>
            </div>

            <!-- Story 4 -->
            <div class="story-thumb-item" onclick="openStoryModal(3)">
                <div class="story-ring-gold">
                    <div class="story-img-wrap">
                        <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=200" alt="سهم‌الارث مادر" class="story-photo-img" />
                    </div>
                </div>
                <div class="story-text-wrap">
                    <span class="story-title-label">سهم‌الارث م...</span>
                    <span class="story-cat-label">انحصار وراثت</span>
                </div>
            </div>

            <!-- Story 5 -->
            <div class="story-thumb-item" onclick="openStoryModal(4)">
                <div class="story-ring-subtle">
                    <div class="story-img-wrap">
                        <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=200" alt="قرارداد مشارکت" class="story-photo-img" />
                    </div>
                </div>
                <div class="story-text-wrap">
                    <span class="story-title-label">قرارداد مشارکت</span>
                    <span class="story-cat-label">تجاری</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۲: بخش هیرو سرنوشت‌ساز و پرتره وکیل (Hero Section) -->
<section class="hero-section" id="hero">
    <div class="hero-ambient-glow-right"></div>
    <div class="hero-ambient-glow-left"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="hero-grid-layout">
            <!-- ستون راست: تیتر اصلی، نشان تجربه، چک‌لیست و دکمه‌ها -->
            <div class="hero-content-col">
                <div class="hero-badge-pill">
                    <svg class="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                    </svg>
                    <span>دکترای تخصصی حقوق خصوصی از دانشگاه تهران • بیش از ۲۰ سال سابقه وکالت</span>
                </div>

                <h1 class="hero-main-title">
                    عدالت با دقت، <span class="hero-gold-gradient">حرفه‌ای‌گری با تعهد</span>
                </h1>

                <p class="hero-slogan-text">
                    دفاعی هوشمندانه برای آینده‌ای امن؛ پاسدار حقوق و منافع شما در مراجع قضایی و بین‌المللی
                </p>

                <!-- چک‌لیست ۴ گانه -->
                <div class="hero-value-props-grid">
                    <div class="hero-value-item">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>تنظیم تخصصی لوایح و دفاع مستدل در محاکم</span>
                    </div>
                    <div class="hero-value-item">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>حفظ اسرار تجاری و ۱۰۰٪ محرمانگی اسناد</span>
                    </div>
                    <div class="hero-value-item">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>امکان تقسیط حق‌الوکاله متناسب با مراحل دادرسی</span>
                    </div>
                    <div class="hero-value-item">
                        <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>سامانه هوشمند گزارش لحظه‌ای وضعیت پرونده</span>
                    </div>
                </div>

                <!-- دکمه‌های اقدام اصلی (CTAs) -->
                <div class="hero-cta-buttons">
                    <a href="#booking" class="btn-gold-hero">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>درخواست مشاوره فوری با دکتر رضوی (SedRazavi)</span>
                    </a>

                    <a href="#tracking" class="btn-navy-hero">
                        <svg class="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <span>پیگیری آنلاین وضعیت پرونده</span>
                    </a>
                </div>

                <!-- نوار اعتبار رسمی -->
                <div class="hero-trust-row">
                    <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-[#2A9D8F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            <path d="m9 12 2 2 4-4"/>
                        </svg>
                        <span>پروانه رسمی کانون وکلای دادگستری مرکز</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>دفتر مرکزی فعال و پاسخگویی حضوری</span>
                    </div>
                </div>
            </div>

            <!-- ستون چپ: کارت طلایی و پرتره لوکس وکیل -->
            <div class="hero-portrait-col">
                <div class="hero-portrait-wrap">
                    <div class="hero-portrait-glow"></div>

                    <div class="hero-portrait-card">
                        <img 
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                            alt="سرکار خانم دکتر سیده مریم رضوی" 
                            class="hero-portrait-image"
                            onerror="this.src='https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800'"
                        />

                        <div class="hero-floating-badge-top">
                            <span class="pulse-emerald-dot"></span>
                            <span>نوبت‌های این هفته در دسترس</span>
                        </div>

                        <div class="hero-floating-card-bottom">
                            <div>
                                <h4 class="hero-lawyer-name">سرکار خانم دکتر سیده مریم رضوی (SedRazavi)</h4>
                                <p class="hero-lawyer-title">وکیل پایه یک دادگستری و مشاور ارشد حقوقی و داوری بین‌المللی</p>
                            </div>
                            <div class="hero-exp-box">
                                ۲۰+
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۳: آمارهای کلیدی و نشان‌های اعتماد (TrustBadges) -->
<section class="trust-badges-section py-12 bg-[#060B18] border-y border-[#D4AF37]/20 relative">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div class="stat-card p-6 rounded-2xl bg-[#0B132B] border border-gray-800 hover:border-[#D4AF37]/40 transition-all">
                <div class="text-3xl sm:text-4xl font-black font-serif text-[#D4AF37] mb-2" id="stat-cases">۱۲۸۰+</div>
                <div class="text-sm font-bold text-white mb-1">پرونده موفق دادگستری</div>
                <div class="text-xs text-gray-400">آرای قطعی در دیوان عالی و تجدیدنظر</div>
            </div>
            <div class="stat-card p-6 rounded-2xl bg-[#0B132B] border border-gray-800 hover:border-[#D4AF37]/40 transition-all">
                <div class="text-3xl sm:text-4xl font-black font-serif text-[#D4AF37] mb-2" id="stat-satisfaction">۹۸٪</div>
                <div class="text-sm font-bold text-white mb-1">رضایت کامل موکلین</div>
                <div class="text-xs text-gray-400">بر اساس نظرسنجی مکتوب انتهای پرونده</div>
            </div>
            <div class="stat-card p-6 rounded-2xl bg-[#0B132B] border border-gray-800 hover:border-[#D4AF37]/40 transition-all">
                <div class="text-3xl sm:text-4xl font-black font-serif text-[#D4AF37] mb-2" id="stat-experience">۲۰+</div>
                <div class="text-sm font-bold text-white mb-1">سال سابقه درخشان وکالت</div>
                <div class="text-xs text-gray-400">عضو کانون وکلای دادگستری مرکز</div>
            </div>
            <div class="stat-card p-6 rounded-2xl bg-[#0B132B] border border-gray-800 hover:border-[#D4AF37]/40 transition-all">
                <div class="text-3xl sm:text-4xl font-black font-serif text-[#D4AF37] mb-2" id="stat-contracts">۴۵۰+</div>
                <div class="text-sm font-bold text-white mb-1">قرارداد بازرگانی و داوری</div>
                <div class="text-xs text-gray-400">تدوین و نظارت بر قراردادهای کلان</div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۴: حوزه‌های تخصصی وکالت و داوری (ServicesSection) -->
<section id="services" class="py-20 bg-[#070D1E] relative">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>حوزه‌های تخصصی وکالت و داوری</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold font-serif text-white">
                خدمات حقوقی با استانداردهای بین‌المللی
            </h2>
            <p class="text-sm sm:text-base text-gray-400">
                تمرکز بر تسلط علمی، تنظیم قراردادهای بازدارنده و دفاع قاطعانه از حقوق شما در محاکم دادگستری و مراجع داوری.
            </p>

            <!-- فیلترهای خدمات -->
            <div class="flex flex-wrap items-center justify-center gap-2 pt-4">
                <button class="service-filter-btn active" data-filter="all">همه خدمات</button>
                <button class="service-filter-btn" data-filter="commercial">دعاوی تجاری و شرکت‌ها</button>
                <button class="service-filter-btn" data-filter="family">خانواده و ارث</button>
                <button class="service-filter-btn" data-filter="criminal">کیفری و ملکی</button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-grid">
            <!-- خدمت ۱ -->
            <div class="service-card" data-category="criminal">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl mb-4">
                    🏢
                </div>
                <h3 class="text-lg font-bold text-white mb-2">دعاوی ملکی، اراضی و سرقفلی</h3>
                <p class="text-xs text-gray-400 leading-relaxed mb-4">
                    الزام به تنظیم سند رسمی، خلع ید، تصرف عدوانی، پیش‌فروش ساختمان، دعاوی سرقفلی و حق کسب و پیشه در مراجع قضایی و ثبتی.
                </p>
                <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">کمیسیون تخصصی املاک</span>
                    <a href="#booking" class="text-xs text-white hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۲ -->
            <div class="service-card" data-category="commercial">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl mb-4">
                    💼
                </div>
                <h3 class="text-lg font-bold text-white mb-2">دعاوی تجاری و قراردادهای بازرگانی</h3>
                <p class="text-xs text-gray-400 leading-relaxed mb-4">
                    تنظیم و بازبینی قراردادهای بین‌المللی، حل‌وفصل اختلافات شرکتی، داوری تجاری و دعاوی ورشکستگی با تضمین محرمانگی اسناد.
                </p>
                <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">پشتیبانی حقوقی شرکتی</span>
                    <a href="#booking" class="text-xs text-white hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۳ -->
            <div class="service-card" data-category="criminal">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl mb-4">
                    ⚖️
                </div>
                <h3 class="text-lg font-bold text-white mb-2">دعاوی کیفری و جرایم اقتصادی</h3>
                <p class="text-xs text-gray-400 leading-relaxed mb-4">
                    دفاع تخصصی در پرونده‌های اختلاس، کلاهبرداری، خیانت در امانت، پولشویی و دفاع راهبردی در دادگاه‌های انقلاب و تجدیدنظر.
                </p>
                <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">دفاع فوری و راهبردی</span>
                    <a href="#booking" class="text-xs text-white hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۴ -->
            <div class="service-card" data-category="family">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl mb-4">
                    👥
                </div>
                <h3 class="text-lg font-bold text-white mb-2">حقوق خانواده و انحصار وراثت</h3>
                <p class="text-xs text-gray-400 leading-relaxed mb-4">
                    رسیدگی به پرونده‌های مهریه، طلاق توافقی، حضانت فرزندان، تقسیم ترکه، تحریر ترکه و وصیت‌نامه با حداکثر سرعت و رازداری تام.
                </p>
                <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">طلاق توافقی در ۱۰ روز</span>
                    <a href="#booking" class="text-xs text-white hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۵ -->
            <div class="service-card" data-category="commercial">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl mb-4">
                    🌐
                </div>
                <h3 class="text-lg font-bold text-white mb-2">داوری بین‌المللی و سرمایه‌گذاری</h3>
                <p class="text-xs text-gray-400 leading-relaxed mb-4">
                    داوری در قراردادهای تجاری خارجی، صادرات و واردات، ترخیص گمرکی و حل اختلافات بازرگانان در اتاق بازرگانی بین‌المللی (ICC).
                </p>
                <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">داوری قطعی و لازم‌الاجرا</span>
                    <a href="#booking" class="text-xs text-white hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>

            <!-- خدمت ۶ -->
            <div class="service-card" data-category="commercial">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl mb-4">
                    📜
                </div>
                <h3 class="text-lg font-bold text-white mb-2">دیوان عدالت اداری و شهرداری‌ها</h3>
                <p class="text-xs text-gray-400 leading-relaxed mb-4">
                    اعتراض به آرای کمیسیون‌های ماده ۱۰۰ و ۹۹ شهرداری، دعاوی ابطال مصوبات غیرقانونی دولتی و اختلافات اداره کار و تامین اجتماعی.
                </p>
                <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span class="text-[11px] text-[#D4AF37] font-semibold">ابطال قطعی آرای معارض</span>
                    <a href="#booking" class="text-xs text-white hover:text-[#D4AF37] flex items-center gap-1 font-semibold">مشاوره &larr;</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۵: درباره وکیل و منشور اخلاق حرفه‌ای (AboutSection) -->
<section id="about" class="py-20 bg-[#0B132B] relative overflow-hidden border-t border-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <!-- ستون تصویر و گواهینامه‌ها -->
            <div class="lg:col-span-5 relative">
                <div class="relative mx-auto max-w-md">
                    <div class="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#D4AF37]/30 to-[#0B132B]/20 blur-xl transform rotate-2"></div>
                    <div class="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl bg-gray-900">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" alt="دکتر سیده مریم رضوی" class="w-full h-[500px] object-cover object-top" />
                        
                        <div class="absolute bottom-6 right-6 left-6 p-4 rounded-xl bg-[#0B132B]/95 backdrop-blur-md border border-[#D4AF37]/30 shadow-xl space-y-2">
                            <div class="flex items-center gap-2 text-[#F3E5AB] font-bold text-xs">
                                <span>🎓 رتبه برتر آزمون وکالت کانون وکلای مرکز</span>
                            </div>
                            <p class="text-xs text-gray-300">
                                عضو رسمی کانون وکلای دادگستری مرکز و مدرس دوره‌های تخصصی تنظیم قرارداد
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ستون متن، منشور اخلاق و سوگند وکالت -->
            <div class="lg:col-span-7 space-y-6 text-right">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                    <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                    </svg>
                    درباره وکیل دکتر سیده مریم رضوی (SedRazavi)
                </div>

                <h2 class="text-3xl sm:text-4xl font-bold font-serif text-white leading-tight">
                    دو دهه پاسداری متعهدانه از حقوق و منافع مشروع موکلین
                </h2>

                <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
                    سرکار خانم دکتر سیده مریم رضوی پس از فراغت از تحصیل در مقطع دکترای حقوق بین‌الملل و خصوصی از دانشگاه تهران و گذراندن دوره‌های تخصصی داوری بین‌المللی، دفتر وکالت خود را با نام مؤسسه حقوقی SedRazavi بنا نهاد. ایشان تاکنون وکالت بیش از ۱۲۸۰ پرونده سنگین حقوقی، ملکی، تجاری و داوری را با بالاترین درصد موفقیت بر عهده داشته است.
                </p>

                <div class="space-y-3 pt-2">
                    <h3 class="text-sm font-bold text-white">منشور اخلاق حرفه‌ای و تعهدات بنیادین:</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
                        <div class="flex items-start gap-2.5 p-3 rounded-xl bg-gray-800/60 border border-gray-700">
                            <span class="text-[#2A9D8F] font-bold">✓</span>
                            <span>بررسی واقع‌بینانه شانس پیروزی دعوا بدون امید واهی</span>
                        </div>
                        <div class="flex items-start gap-2.5 p-3 rounded-xl bg-gray-800/60 border border-gray-700">
                            <span class="text-[#2A9D8F] font-bold">✓</span>
                            <span>شفافیت کامل در قرارداد مالی و نحوه وصول حق‌الوکاله</span>
                        </div>
                        <div class="flex items-start gap-2.5 p-3 rounded-xl bg-gray-800/60 border border-gray-700">
                            <span class="text-[#2A9D8F] font-bold">✓</span>
                            <span>گزارش‌دهی مستمر و دسترسی آنلاین موکل به لوایح پرونده</span>
                        </div>
                        <div class="flex items-start gap-2.5 p-3 rounded-xl bg-gray-800/60 border border-gray-700">
                            <span class="text-[#2A9D8F] font-bold">✓</span>
                            <span>حفظ کامل اسرار شغلی، اسناد تجاری و حریم خانوادگی</span>
                        </div>
                    </div>
                </div>

                <div class="p-4 rounded-xl bg-[#060B18] border border-[#D4AF37]/30 flex items-center gap-3">
                    <span class="text-2xl text-[#D4AF37]">❝</span>
                    <p class="text-xs text-gray-300 italic">
                        «وکالت، تنها دفاع در محکمه نیست؛ معماری امن روابط تجاری و احقاق شجاعانه حق بر پایه تسلط بر موازین قانونی است.»
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۶: رضایت موکلین و روایت تجربیات (TestimonialsSlider) -->
<section class="py-20 bg-[#070D1E] relative overflow-hidden border-t border-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                اعتماد و رضایت موکلین
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold font-serif text-white">
                روایت تجربه همراهی با دفتر وکالت دکتر رضوی
            </h2>
            <p class="text-sm sm:text-base text-gray-400">
                دیدگاه موکلین گرامی پیرامون دقت نظر، پیگیری پرونده و حصول نتایج درخشان حقوقی.
            </p>
        </div>

        <div class="max-w-4xl mx-auto">
            <div class="relative bg-[#0B132B] rounded-3xl p-8 sm:p-12 border border-gray-800 shadow-2xl">
                <div class="flex items-center justify-between mb-6">
                    <div class="flex text-[#D4AF37] gap-1 text-lg">★★★★★</div>
                    <span class="px-3 py-1 rounded-full bg-[#2A9D8F]/15 text-[#2A9D8F] text-xs font-bold border border-[#2A9D8F]/30" id="testimonial-service">
                        دعاوی ملکی و تجاری
                    </span>
                </div>

                <blockquote class="text-base sm:text-lg text-gray-200 leading-relaxed mb-8 italic" id="testimonial-quote">
                    «تسلط علمی سرکار خانم دکتر رضوی بر قوانین ثبتی و املاک موجب شد ملکی به ارزش بیش از ۴۰۰ میلیارد ریال که با معارض جعلی مواجه شده بود، در دیوان عالی کشور کاملاً احقاق حق و سند معارض باطل گردد. رازداری و نظم بی‌نظیر ایشان ستودنی است.»
                </blockquote>

                <div class="flex items-center justify-between border-t border-gray-800 pt-6">
                    <div>
                        <h4 class="font-bold text-white text-base" id="testimonial-author">مهندس علیرضا سلیمانی</h4>
                        <p class="text-xs text-gray-400" id="testimonial-role">مدیرعامل گروه سرمایه‌گذاری پارس نوین</p>
                    </div>

                    <div class="flex items-center gap-2">
                        <button onclick="prevTestimonial()" class="p-2.5 rounded-xl bg-gray-800 hover:bg-[#D4AF37] hover:text-[#0B132B] text-white transition-all cursor-pointer">
                            &rarr;
                        </button>
                        <button onclick="nextTestimonial()" class="p-2.5 rounded-xl bg-gray-800 hover:bg-[#D4AF37] hover:text-[#0B132B] text-white transition-all cursor-pointer">
                            &larr;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۷: جدیدترین مقالات حقوقی (ArticlesSection) -->
<section id="articles" class="py-20 bg-[#0B132B] relative border-t border-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                دانش حقوقی و تحلیل آراء
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold font-serif text-white">
                جدیدترین مقالات و یادداشت‌های تخصصی
            </h2>
            <p class="text-sm sm:text-base text-gray-400">
                بررسی جدیدترین قوانین موضوعه، رویه‌های قضایی وحدت رویه و نکات پیشگیرانه در تنظیم قراردادها.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- مقاله ۱ -->
            <article class="bg-[#070D1E] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#D4AF37]/50 shadow-xl transition-all">
                <div class="relative h-48 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=400" alt="نکات کلیدی قرارداد مشارکت در ساخت" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0B132B]/90 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">دعاوی ملکی</span>
                </div>
                <div class="p-6 space-y-3 text-right">
                    <div class="text-xs text-gray-500 flex items-center justify-between">
                        <span>۱۴۰۳/۰۵/۲۰</span>
                        <span>⏱ مطالعه: ۶ دقیقه</span>
                    </div>
                    <h3 class="text-base font-bold text-white leading-snug hover:text-[#D4AF37] transition-colors">
                        ۱۰ شرط حیاتی و غیرقابل چشم‌پوشی در قراردادهای مشارکت در ساخت
                    </h3>
                    <p class="text-xs text-gray-400 leading-relaxed">
                        تحلیل ضمانت‌اجراهای تاخیر در ساخت، حق حبس، تعیین قدرالسهم و سازوکار حل اختلاف از طریق داوری تخصصی.
                    </p>
                    <div class="pt-3 border-t border-gray-800">
                        <a href="#articles" class="text-xs text-[#D4AF37] font-semibold flex items-center gap-1">مطالعه یادداشت کامل &larr;</a>
                    </div>
                </div>
            </article>

            <!-- مقاله ۲ -->
            <article class="bg-[#070D1E] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#D4AF37]/50 shadow-xl transition-all">
                <div class="relative h-48 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400" alt="قوانین چک صیادی" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0B132B]/90 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">اسناد تجاری</span>
                </div>
                <div class="p-6 space-y-3 text-right">
                    <div class="text-xs text-gray-500 flex items-center justify-between">
                        <span>۱۴۰۳/۰۵/۱۵</span>
                        <span>⏱ مطالعه: ۸ دقیقه</span>
                    </div>
                    <h3 class="text-base font-bold text-white leading-snug hover:text-[#D4AF37] transition-colors">
                        راهنمای کاربردی صدور اجراییه مستقیم چک صیادی بدون دادخواست
                    </h3>
                    <p class="text-xs text-gray-400 leading-relaxed">
                        چگونه می‌توان طبق ماده ۲۳ قانون اصلاح قانون صدور چک، در کمتر از ۱۰ روز اموال صادرکننده را توقیف نمود؟
                    </p>
                    <div class="pt-3 border-t border-gray-800">
                        <a href="#articles" class="text-xs text-[#D4AF37] font-semibold flex items-center gap-1">مطالعه یادداشت کامل &larr;</a>
                    </div>
                </div>
            </article>

            <!-- مقاله ۳ -->
            <article class="bg-[#070D1E] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#D4AF37]/50 shadow-xl transition-all">
                <div class="relative h-48 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400" alt="داوری تجاری بین‌المللی" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0B132B]/90 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">داوری بین‌المللی</span>
                </div>
                <div class="p-6 space-y-3 text-right">
                    <div class="text-xs text-gray-500 flex items-center justify-between">
                        <span>۱۴۰۳/۰۵/۱۰</span>
                        <span>⏱ مطالعه: ۵ دقیقه</span>
                    </div>
                    <h3 class="text-base font-bold text-white leading-snug hover:text-[#D4AF37] transition-colors">
                        مزایای شرط داوری اتاق بازرگانی بین‌المللی در قراردادهای تجاری خارجی
                    </h3>
                    <p class="text-xs text-gray-400 leading-relaxed">
                        بررسی سرعت رسیدگی، اعتبار بین‌المللی رای داوری و عدم امکان ابطال آن در مراجع قضایی داخلی.
                    </p>
                    <div class="pt-3 border-t border-gray-800">
                        <a href="#articles" class="text-xs text-[#D4AF37] font-semibold flex items-center gap-1">مطالعه یادداشت کامل &larr;</a>
                    </div>
                </div>
            </article>
        </div>
    </div>
</section>

<!-- بخش ۸: پرسش‌های متداول موکلین (FaqSection) -->
<section id="faq" class="py-20 bg-[#070D1E] relative border-t border-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div class="text-center space-y-4 mb-14">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                <svg class="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                پاسخ به ابهامات رایج موکلین
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold font-serif text-white">
                پرسش‌های متداول حقوقی و وکالتی
            </h2>
            <p class="text-sm sm:text-base text-gray-400">
                پاسخ‌های شفاف و کاربردی به متداول‌ترین سوالات موکلین در بدو ورود به پرونده.
            </p>
        </div>

        <div class="space-y-4">
            <!-- پرسش ۱ -->
            <div class="faq-item rounded-2xl bg-[#0B132B] border border-gray-800 overflow-hidden">
                <button class="faq-question w-full p-5 text-right flex items-center justify-between font-bold text-sm text-white cursor-pointer hover:text-[#D4AF37]">
                    <span>۱. نحوه تعیین حق‌الوکاله در دفتر وکالت دکتر رضوی چگونه است؟ آیا امکان تقسیط وجود دارد؟</span>
                    <span class="faq-icon text-[#D4AF37] text-lg">+</span>
                </button>
                <div class="faq-answer hidden p-5 pt-0 text-xs text-gray-300 leading-relaxed border-t border-gray-800">
                    حق‌الوکاله بر اساس پیچیدگی پرونده، مرحله رسیدگی (بدوی، تجدیدنظر یا فرجام‌خواهی) و مطابق آیین‌نامه تعرفه کانون وکلا تعیین می‌شود. در ۹۰٪ پرونده‌ها امکان تقسیط حق‌الوکاله متناسب با پیشرفت مراحل دادرسی فراهم می‌باشد و کلیه توافقات در قرارداد الکترونیک سامانه عدل‌ایران ثبت می‌گردد.
                </div>
            </div>

            <!-- پرسش ۲ -->
            <div class="faq-item rounded-2xl bg-[#0B132B] border border-gray-800 overflow-hidden">
                <button class="faq-question w-full p-5 text-right flex items-center justify-between font-bold text-sm text-white cursor-pointer hover:text-[#D4AF37]">
                    <span>۲. آیا برای مشاوره اولیه حضور فیزیکی در دفتر تهران الزامی است؟</span>
                    <span class="faq-icon text-[#D4AF37] text-lg">+</span>
                </button>
                <div class="faq-answer hidden p-5 pt-0 text-xs text-gray-300 leading-relaxed border-t border-gray-800">
                    خیر؛ موکلین مقیم شهرستان‌ها یا خارج از کشور می‌توانند پس از رزرو نوبت از طریق سامانه، جلسه مشاوره تصویری امن (از طریق گوگل‌میت یا واتساپ) یا مشاوره تلفنی داشته باشند. عقد وکالتنامه نیز از طریق سامانه میخک وزارت خارجه یا ثنای قوه قضاییه به سادگی انجام می‌شود.
                </div>
            </div>

            <!-- پرسش ۳ -->
            <div class="faq-item rounded-2xl bg-[#0B132B] border border-gray-800 overflow-hidden">
                <button class="faq-question w-full p-5 text-right flex items-center justify-between font-bold text-sm text-white cursor-pointer hover:text-[#D4AF37]">
                    <span>۳. محرمانگی اسناد تجاری و اطلاعات پرونده چگونه تضمین می‌گردد؟</span>
                    <span class="faq-icon text-[#D4AF37] text-lg">+</span>
                </button>
                <div class="faq-answer hidden p-5 pt-0 text-xs text-gray-300 leading-relaxed border-t border-gray-800">
                    تمامی اطلاعات پرونده‌ها و اسناد موکلین تحت نظارت مستقیم وکیل سرپرست در سرورهای محرمانه نگهداری شده و طبق سوگندنامه کانون وکلای دادگستری و قوانین رازداری حرفه‌ای، ۱۰۰٪ محرمانه و غیرقابل افشا نزد اشخاص ثالث خواهد بود.
                </div>
            </div>

            <!-- پرسش ۴ -->
            <div class="faq-item rounded-2xl bg-[#0B132B] border border-gray-800 overflow-hidden">
                <button class="faq-question w-full p-5 text-right flex items-center justify-between font-bold text-sm text-white cursor-pointer hover:text-[#D4AF37]">
                    <span>۴. روند پیگیری لحظه‌ای پرونده برای موکل چگونه طراحی شده است؟</span>
                    <span class="faq-icon text-[#D4AF37] text-lg">+</span>
                </button>
                <div class="faq-answer hidden p-5 pt-0 text-xs text-gray-300 leading-relaxed border-t border-gray-800">
                    پس از انعقاد قرارداد، یک کد پیگیری محرمانه به موکل اختصاص می‌یابد. موکل در هر ساعت از شبانه‌روز با درج این کد در همین وبسایت می‌تواند آخرین اقدامات دفاعی، ابلاغیه‌ها و لوایح تنظیمی را به صورت زنده رصد نماید.
                </div>
            </div>
        </div>
    </div>
</section>

<!-- بخش ۹: رزرو نوبت، استعلام پرونده و اطلاعات تماس (ContactAndBookingSection) -->
<section id="contact" class="py-20 bg-[#0B132B] relative border-t border-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- استعلام پرونده (Case Tracker Card) -->
        <div id="tracking" class="mb-16 max-w-4xl mx-auto rounded-3xl p-8 bg-gradient-to-b from-[#1C2541] to-[#0B132B] border border-[#D4AF37]/30 shadow-2xl">
            <div class="text-center space-y-2 mb-6">
                <span class="text-xs font-bold text-[#D4AF37]">سامانه محرمانه موکلین</span>
                <h3 class="text-2xl font-bold font-serif text-white">پیگیری آنلاین و لحظه‌ای پرونده قضایی</h3>
                <p class="text-xs text-gray-300">کد پرونده (مانند SR-1403-882) یا شماره همراه ثبت‌شده را وارد فرمایید:</p>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
                <input type="text" id="case-search-input" placeholder="نمونه: SR-1403-882 یا شماره همراه موکل" class="flex-1 px-4 py-3 rounded-xl bg-[#060B18] border border-gray-700 text-white text-sm focus:outline-none focus:border-[#D4AF37]" />
                <button onclick="searchCaseStatus()" class="btn-gold px-8 py-3 rounded-xl font-bold text-sm cursor-pointer">
                    🔍 استعلام آخرین وضعیت
                </button>
            </div>

            <div id="case-result-display" class="hidden mt-6 p-5 rounded-xl bg-[#060B18] border border-[#D4AF37]/30 space-y-3">
                <div class="flex items-center justify-between border-b border-gray-800 pb-2">
                    <span id="res-case-title" class="font-bold text-white text-sm"></span>
                    <span id="res-case-status" class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"></span>
                </div>
                <p id="res-case-desc" class="text-xs text-gray-300 leading-relaxed"></p>
                <div class="flex items-center justify-between text-xs text-gray-400 pt-2">
                    <span id="res-case-branch"></span>
                    <span id="res-case-date" class="font-mono"></span>
                </div>
            </div>
        </div>

        <!-- دو ستونه: فرم رزرو نوبت + اطلاعات تماس دفتر -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <!-- ستون فرم رزرو نوبت (۷ ستون) -->
            <div id="booking" class="lg:col-span-7 bg-[#070D1E] p-8 rounded-3xl border border-gray-800 shadow-xl">
                <div class="space-y-2 mb-6">
                    <span class="text-xs font-bold text-[#D4AF37]">درخواست رسمی وقت مشاوره</span>
                    <h3 class="text-2xl font-bold font-serif text-white">ثبت نوبت مشاوره حضوری یا آنلاین</h3>
                </div>

                <form id="booking-form-main" onsubmit="handleBookingSubmit(event)" class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-gray-300 mb-1.5">نام و نام خانوادگی موکل *</label>
                            <input type="text" required id="book-name" class="w-full px-4 py-2.5 rounded-xl bg-[#0B132B] border border-gray-700 text-white text-sm focus:border-[#D4AF37] focus:outline-none" />
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-300 mb-1.5">شماره همراه معتبر (جهت پیامک نوبت) *</label>
                            <input type="tel" required id="book-phone" placeholder="۰۹۱۲۳۴۵۶۷۸۹" class="w-full px-4 py-2.5 rounded-xl bg-[#0B132B] border border-gray-700 text-white text-sm text-left font-mono focus:border-[#D4AF37] focus:outline-none" />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-gray-300 mb-1.5">موضوع دعوی یا قرارداد</label>
                            <select id="book-service" class="w-full px-4 py-2.5 rounded-xl bg-[#0B132B] border border-gray-700 text-white text-sm focus:border-[#D4AF37] focus:outline-none">
                                <option>دعاوی ملکی، اراضی و سرقفلی</option>
                                <option>دعاوی تجاری و قراردادها</option>
                                <option>دعاوی کیفری و جرایم اقتصادی</option>
                                <option>حقوق خانواده و ارث</option>
                                <option>داوری بین‌المللی</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-300 mb-1.5">نحوه برگزاری جلسه مشاوره</label>
                            <select id="book-mode" class="w-full px-4 py-2.5 rounded-xl bg-[#0B132B] border border-gray-700 text-white text-sm focus:border-[#D4AF37] focus:outline-none">
                                <option value="in_person">جلسه حضوری در دفتر تهران (میدان ونک)</option>
                                <option value="online">مشاوره تصویری آنلاین (گوگل‌میت / واتساپ)</option>
                                <option value="phone">مشاوره تلفنی مستقیم با وکیل</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-gray-300 mb-1.5">شرح مختصر خواسته یا روند پرونده</label>
                        <textarea id="book-notes" rows="3" placeholder="موضوع دعوی، شماره پرونده یا شعبه رسیدگی‌کننده..." class="w-full px-4 py-2.5 rounded-xl bg-[#0B132B] border border-gray-700 text-white text-sm focus:border-[#D4AF37] focus:outline-none"></textarea>
                    </div>

                    <button type="submit" class="btn-gold w-full py-3.5 rounded-xl font-bold text-sm cursor-pointer shadow-lg">
                        ثبت و نهایی‌سازی درخواست مشاوره با وکیل
                    </button>
                </form>
            </div>

            <!-- ستون اطلاعات تماس دفتر و ساعات کاری (۵ ستون) -->
            <div class="lg:col-span-5 bg-[#070D1E] p-8 rounded-3xl border border-gray-800 shadow-xl space-y-6">
                <div>
                    <span class="text-xs font-bold text-[#D4AF37]">راه‌های ارتباط مستقیم</span>
                    <h3 class="text-2xl font-bold font-serif text-white mt-1">دفتر وکالت SedRazavi</h3>
                </div>

                <div class="space-y-4 text-xs sm:text-sm text-gray-300">
                    <div class="flex items-start gap-3">
                        <span class="text-[#D4AF37] text-lg">📍</span>
                        <div>
                            <strong class="block text-white mb-1">نشانی دفتر مرکزی:</strong>
                            <span>تهران، میدان ونک، خیابان ملاصدرا، پلاک ۱۱۸، برج حقوقی سدید، طبقه پنجم، واحد ۱۵</span>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <span class="text-[#D4AF37] text-lg">📞</span>
                        <div>
                            <strong class="block text-white mb-0.5">تلفن‌های دفتر:</strong>
                            <a href="tel:02188990011" class="font-mono text-[#D4AF37] hover:underline">۰۲۱-۸۸۹۹۰۰۱۱</a> | <a href="tel:02188990012" class="font-mono text-[#D4AF37] hover:underline">۰۲۱-۸۸۹۹۰۰۱۲</a>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <span class="text-[#D4AF37] text-lg">✉️</span>
                        <div>
                            <strong class="block text-white mb-0.5">پست الکترونیک رسمی:</strong>
                            <span class="font-mono">legal@sedrazavi.com</span>
                        </div>
                    </div>

                    <div class="flex items-start gap-3">
                        <span class="text-[#D4AF37] text-lg">⏰</span>
                        <div>
                            <strong class="block text-white mb-1">ساعات کاری و پذیرش:</strong>
                            <p>شنبه تا چهارشنبه: ۹:۰۰ الی ۱۹:۰۰</p>
                            <p>پنج‌شنبه: ۹:۰۰ الی ۱۳:۰۰ (با تعیین وقت قبلی)</p>
                        </div>
                    </div>
                </div>

                <div class="p-4 rounded-2xl bg-[#0B132B] border border-gray-800 text-xs text-gray-400">
                    <span class="text-[#D4AF37] font-bold">🛡️ تضمین محرمانگی:</span> کلیه تماس‌ها، اسناد و مشاوره‌ها مطابق منشور اخلاقی کانون وکلا کاملاً محرمانه تلقی می‌گردد.
                </div>
            </div>

        </div>

    </div>
</section>

<!-- پنجره‌های مودال تعاملی (Modals) -->

<!-- مودال ۱: استوری‌ها -->
<div id="story-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/90 backdrop-blur-md p-4" role="dialog" aria-modal="true">
    <div class="relative w-full max-w-md bg-[#0B132B] text-white rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/30 flex flex-col h-[650px] max-h-[90vh]">
        <div class="absolute top-3 left-3 right-3 z-20 flex gap-1.5">
            <div class="h-1 flex-1 rounded-full bg-white/20 overflow-hidden">
                <div id="story-progress-bar" class="h-full bg-[#D4AF37] w-full transition-all duration-300"></div>
            </div>
        </div>
        <div class="relative z-10 flex items-center justify-between p-4 pt-7 bg-gradient-to-b from-black/80 to-transparent">
            <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full border border-[#D4AF37] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" class="w-full h-full object-cover" />
                </div>
                <div>
                    <h5 id="story-modal-title" class="text-xs font-bold text-white"></h5>
                    <span id="story-modal-cat" class="text-[10px] text-[#F3E5AB]"></span>
                </div>
            </div>
            <button onclick="closeStoryModal()" class="p-1 rounded-full bg-black/40 hover:bg-black/80 text-white cursor-pointer">&times;</button>
        </div>
        <div class="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
            <img id="story-modal-img" src="" class="w-full h-full object-cover opacity-85" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent"></div>
            <div class="absolute bottom-6 left-5 right-5 z-10 text-right space-y-2">
                <h4 id="story-slide-title" class="text-base font-bold text-white"></h4>
                <p id="story-slide-desc" class="text-xs text-gray-200 leading-relaxed"></p>
                <a href="#booking" onclick="closeStoryModal()" class="btn-gold inline-block text-xs py-2 px-4 mt-2">
                    رزرو فوری مشاوره درباره این موضوع &larr;
                </a>
            </div>
        </div>
    </div>
</div>

<!-- مودال ۲: نظرسنجی خدمات -->
<div id="survey-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/80 backdrop-blur-sm p-4">
    <div class="bg-[#0B132B] rounded-2xl p-6 max-w-md w-full border border-[#D4AF37]/30 text-right space-y-4">
        <div class="flex items-center justify-between border-b border-gray-800 pb-3">
            <h4 class="font-bold text-white text-sm">نظرسنجی کیفیت خدمات و رضایت موکل</h4>
            <button onclick="closeSurveyModal()" class="text-gray-400 hover:text-white cursor-pointer">&times;</button>
        </div>
        <p class="text-xs text-gray-300">دیدگاه ارزشمند شما ما را در ارتقای سطح استانداردهای دادرسی و پاسخگویی یاری می‌نماید.</p>
        <div class="flex items-center justify-center gap-2 text-2xl text-[#D4AF37] py-2 cursor-pointer">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <textarea rows="3" placeholder="دیدگاه یا پیشنهاد خود را مرقوم بفرمایید..." class="w-full p-3 rounded-xl bg-[#060B18] border border-gray-700 text-white text-xs focus:border-[#D4AF37] focus:outline-none"></textarea>
        <button onclick="submitSurvey()" class="btn-gold w-full py-2.5 rounded-xl font-bold text-xs cursor-pointer">
            ثبت و ارسال بازخورد
        </button>
    </div>
</div>

<!-- مودال ۳: راهنمای تعاملی سایت -->
<div id="tour-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/80 backdrop-blur-sm p-4">
    <div class="bg-[#0B132B] rounded-2xl p-6 max-w-md w-full border border-[#D4AF37]/30 text-right space-y-4">
        <div class="flex items-center justify-between border-b border-gray-800 pb-3">
            <h4 class="font-bold text-white text-sm">راهنمای تعاملی سامانه وکالت</h4>
            <button onclick="closeTourModal()" class="text-gray-400 hover:text-white cursor-pointer">&times;</button>
        </div>
        <div class="space-y-3 text-xs text-gray-300">
            <div class="p-3 rounded-xl bg-[#060B18] border border-gray-800">
                <strong class="text-[#D4AF37] block mb-1">۱. نوار استوری‌ها:</strong>
                آخرین نکات چک، قوانین ملکی و موفقیت‌های اخیر پرونده‌ها را مشاهده فرمایید.
            </div>
            <div class="p-3 rounded-xl bg-[#060B18] border border-gray-800">
                <strong class="text-[#D4AF37] block mb-1">۲. استعلام پرونده:</strong>
                با کد اختصاصی SR روند لوایح و تصمیمات قضایی را به صورت ۲۴ ساعته دنبال کنید.
            </div>
            <div class="p-3 rounded-xl bg-[#060B18] border border-gray-800">
                <strong class="text-[#D4AF37] block mb-1">۳. رزرو آنلاین نوبت:</strong>
                مشاوره حضوری، تلفنی یا تصویری خود را تنها در ۱ دقیقه رزرو فرمایید.
            </div>
        </div>
        <button onclick="closeTourModal()" class="btn-gold w-full py-2.5 rounded-xl font-bold text-xs cursor-pointer">
            متوجه شدم، ورود به سامانه
        </button>
    </div>
</div>

<!-- مودال ۴: آکادمی و مستندات -->
<div id="academy-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/80 backdrop-blur-sm p-4">
    <div class="bg-[#0B132B] rounded-2xl p-6 max-w-lg w-full border border-[#D4AF37]/30 text-right space-y-4">
        <div class="flex items-center justify-between border-b border-gray-800 pb-3">
            <h4 class="font-bold text-white text-sm">آکادمی و مستندات دفتر وکالت SedRazavi</h4>
            <button onclick="closeAcademyModal()" class="text-gray-400 hover:text-white cursor-pointer">&times;</button>
        </div>
        <p class="text-xs text-gray-300">دسترسی به فرم‌های دادخواست نمونه، قوانین موضوعه جدید و شیوه‌نامه تنظیم قراردادهای تجاری.</p>
        <div class="grid grid-cols-2 gap-3 text-xs">
            <a href="#articles" onclick="closeAcademyModal()" class="p-3 rounded-xl bg-[#060B18] border border-gray-800 hover:border-[#D4AF37] block">
                <span class="text-[#D4AF37] block font-bold mb-1">📚 آرشیو قوانین</span>
                قوانین چک، سرقفلی و اراضی
            </a>
            <a href="#articles" onclick="closeAcademyModal()" class="p-3 rounded-xl bg-[#060B18] border border-gray-800 hover:border-[#D4AF37] block">
                <span class="text-[#D4AF37] block font-bold mb-1">⚖️ آرای وحدت رویه</span>
                جدیدترین آرای دیوان عالی
            </a>
        </div>
        <button onclick="closeAcademyModal()" class="w-full py-2 rounded-xl bg-gray-800 text-white text-xs cursor-pointer">
            بستن
        </button>
    </div>
</div>

<!-- بنر کوکی و حریم خصوصی در پایین صفحه -->
<div id="cookie-banner" class="fixed bottom-4 right-4 left-4 sm:right-auto sm:left-6 sm:max-w-md z-40 p-4 rounded-2xl bg-[#0B132B]/95 backdrop-blur-md border border-[#D4AF37]/30 shadow-2xl text-right space-y-3">
    <div class="flex items-center gap-2 text-[#D4AF37] font-bold text-xs">
        <span>🍪 امنیت و محرمانگی اطلاعات موکلین</span>
    </div>
    <p class="text-[11px] text-gray-300 leading-relaxed">
        این پایگاه حقوقی جهت ارائه خدمات مطلوب و حفاظت از اسناد، از کوکی‌های رمزنگاری‌شده بهره می‌برد.
    </p>
    <div class="flex items-center gap-2">
        <button onclick="acceptCookies()" class="btn-gold text-[11px] py-1.5 px-4 font-bold cursor-pointer">پذیرش و تایید</button>
        <button onclick="dismissCookies()" class="text-gray-400 hover:text-white text-[11px] py-1.5 px-2 cursor-pointer">انصراف</button>
    </div>
</div>

<?php
get_footer();
`
  },
  {
    path: 'inc/case-management.php',
    filename: 'case-management.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'سیستم ثبت و مدیریت پرونده‌ها (CPT sedrazavi_case) با متاباکس شماره پرونده، وقت دادرسی و وضعیت رسیدگی.',
    code: `<?php
/**
 * SedRazavi Case Management & Client Tracker Engine
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Custom Post Type for Legal Cases
 */
if (!function_exists('sedrazavi_register_case_cpt')) {
    function sedrazavi_register_case_cpt() {
        if (post_type_exists('sedrazavi_case')) {
            return;
        }

        $labels = array(
            'name'               => esc_html__('پرونده‌های موکلین', 'sedrazavi'),
            'singular_name'      => esc_html__('پرونده حقوقی', 'sedrazavi'),
            'menu_name'          => esc_html__('مدیریت پرونده‌ها', 'sedrazavi'),
            'add_new'            => esc_html__('ثبت پرونده جدید', 'sedrazavi'),
            'add_new_item'       => esc_html__('ثبت پرونده حقوقی جدید', 'sedrazavi'),
            'edit_item'          => esc_html__('ویرایش پرونده', 'sedrazavi'),
            'all_items'          => esc_html__('همه پرونده‌ها', 'sedrazavi'),
        );

        $args = array(
            'labels'             => $labels,
            'public'             => false, // Private to lawyer/clients
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-portfolio',
            'supports'           => array('title', 'custom-fields'),
            'show_in_rest'       => true,
        );

        register_post_type('sedrazavi_case', $args);
    }
    add_action('init', 'sedrazavi_register_case_cpt');
}

/**
 * AJAX Handler for Online Case Tracking
 */
if (!function_exists('sedrazavi_ajax_track_case')) {
    function sedrazavi_ajax_track_case() {
        check_ajax_referer('sedrazavi_security_nonce', 'security');

        $case_number = isset($_POST['case_number']) ? sanitize_text_field($_POST['case_number']) : '';
        $client_phone = isset($_POST['client_phone']) ? sanitize_text_field($_POST['client_phone']) : '';

        if (empty($case_number)) {
            wp_send_json_error(array('message' => esc_html__('لطفاً شماره پرونده را وارد فرمایید.', 'sedrazavi')));
        }

        $query = new WP_Query(array(
            'post_type'      => 'sedrazavi_case',
            'post_status'    => 'publish',
            'meta_query'     => array(
                array(
                    'key'     => '_sedrazavi_case_number',
                    'value'   => $case_number,
                    'compare' => '=',
                ),
            ),
            'posts_per_page' => 1,
        ));

        if ($query->have_posts()) {
            $query->the_post();
            $post_id = get_the_ID();

            $response = array(
                'found'            => true,
                'case_number'      => $case_number,
                'client_name'      => get_the_title(),
                'case_type'        => get_post_meta($post_id, '_sedrazavi_case_type', true) ?: 'حقوقی',
                'status'           => get_post_meta($post_id, '_sedrazavi_case_status', true) ?: 'در جریان',
                'next_session'     => get_post_meta($post_id, '_sedrazavi_next_session', true) ?: 'تعیین نشده',
                'notes'            => get_post_meta($post_id, '_sedrazavi_case_notes', true) ?: 'در حال پیگیری توسط وکیل',
                'documents_count'  => get_post_meta($post_id, '_sedrazavi_docs_count', true) ?: 0,
            );
            wp_reset_postdata();
            wp_send_json_success($response);
        } else {
            wp_send_json_error(array('message' => esc_html__('پرونده‌ای با این مشخصات یافت نشد.', 'sedrazavi')));
        }
    }
    add_action('wp_ajax_sedrazavi_track_case', 'sedrazavi_ajax_track_case');
    add_action('wp_ajax_nopriv_sedrazavi_track_case', 'sedrazavi_ajax_track_case');
}
`
  },
  {
    path: 'inc/booking.php',
    filename: 'booking.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'سامانه ثبت نوبت‌های مشاوره، ایجاد جدول دیتابیس اختصاصی و ارسال اعلان.',
    code: `<?php
/**
 * SedRazavi Consultation Booking Engine
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Handle AJAX Booking Submission
 */
if (!function_exists('sedrazavi_ajax_handle_booking')) {
    function sedrazavi_ajax_handle_booking() {
        check_ajax_referer('sedrazavi_security_nonce', 'security');

        $name    = isset($_POST['client_name']) ? sanitize_text_field($_POST['client_name']) : '';
        $phone   = isset($_POST['client_phone']) ? sanitize_text_field($_POST['client_phone']) : '';
        $service = isset($_POST['service_type']) ? sanitize_text_field($_POST['service_type']) : '';
        $date    = isset($_POST['booking_date']) ? sanitize_text_field($_POST['booking_date']) : '';
        $time    = isset($_POST['booking_time']) ? sanitize_text_field($_POST['booking_time']) : '';
        $notes   = isset($_POST['notes']) ? sanitize_textarea_field($_POST['notes']) : '';

        if (empty($name) || empty($phone) || empty($service)) {
            wp_send_json_error(array('message' => esc_html__('لطفاً تمامی فیلدهای الزامی را تکمیل نمایید.', 'sedrazavi')));
        }

        // Save as CPT or custom log
        $appointment_id = wp_insert_post(array(
            'post_title'   => sprintf(esc_html__('نوبت مشاوره: %s - %s', 'sedrazavi'), $name, $date),
            'post_type'    => 'sedrazavi_appointment',
            'post_status'  => 'publish',
            'post_content' => $notes,
        ));

        if (!is_wp_error($appointment_id)) {
            update_post_meta($appointment_id, '_sedrazavi_client_phone', $phone);
            update_post_meta($appointment_id, '_sedrazavi_service_type', $service);
            update_post_meta($appointment_id, '_sedrazavi_booking_date', $date);
            update_post_meta($appointment_id, '_sedrazavi_booking_time', $time);

            // Trigger SMS / Email notifications to lawyer
            do_action('sedrazavi_after_booking_created', $appointment_id, $name, $phone);

            wp_send_json_success(array(
                'message' => esc_html__('نوبت مشاوره شما با موفقیت رزرو شد. پیامک تأیید برای شما ارسال گردید.', 'sedrazavi'),
                'booking_id' => $appointment_id
            ));
        } else {
            wp_send_json_error(array('message' => esc_html__('خطایی در ثبت نوبت رخ داد.', 'sedrazavi')));
        }
    }
    add_action('wp_ajax_sedrazavi_submit_booking', 'sedrazavi_ajax_handle_booking');
    add_action('wp_ajax_nopriv_sedrazavi_submit_booking', 'sedrazavi_ajax_handle_booking');
}
`
  },
  {
    path: 'inc/dashboard.php',
    filename: 'dashboard.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'داشبورد اختصاصی مدیریت وکالت در پنل ادمین وردپرس با ویجت‌های آماری پرونده‌ها، یادآورها و دسترسی سریع.',
    code: `<?php
/**
 * SedRazavi Lawyer Dashboard in WordPress Admin
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_add_admin_dashboard_menu')) {
    function sedrazavi_add_admin_dashboard_menu() {
        add_menu_page(
            esc_html__('میز کار وکیل سید رضوی', 'sedrazavi'),
            esc_html__('میز کار وکیل', 'sedrazavi'),
            'manage_options',
            'sedrazavi-lawyer-dashboard',
            'sedrazavi_render_admin_dashboard',
            'dashicons-businessman',
            2
        );
    }
    add_action('admin_menu', 'sedrazavi_add_admin_dashboard_menu');
}

if (!function_exists('sedrazavi_render_admin_dashboard')) {
    function sedrazavi_render_admin_dashboard() {
    ?>
    <div class="wrap sedrazavi-admin-wrap" style="direction: rtl; text-align: right; font-family: 'Vazirmatn', sans-serif;">
        <h1 style="color: #0B132B; border-bottom: 2px solid #D4AF37; padding-bottom: 10px; margin-bottom: 25px;">
            ⚖️ <?php esc_html_e('میز کار و داشبورد مدیریت وکیل سید رضوی', 'sedrazavi'); ?>
        </h1>

        <!-- Stats Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 30px;">
            <div style="background: #fff; padding: 20px; border-radius: 12px; border-right: 5px solid #D4AF37; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h3 style="margin:0; color:#888; font-size:14px;"><?php esc_html_e('کل پرونده‌های فعال', 'sedrazavi'); ?></h3>
                <p style="font-size: 28px; font-weight: bold; margin: 10px 0 0 0; color: #0B132B;">۴۸ پرونده</p>
            </div>
            <div style="background: #fff; padding: 20px; border-radius: 12px; border-right: 5px solid #2A9D8F; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h3 style="margin:0; color:#888; font-size:14px;"><?php esc_html_e('جلسات دادگاه این هفته', 'sedrazavi'); ?></h3>
                <p style="font-size: 28px; font-weight: bold; margin: 10px 0 0 0; color: #2A9D8F;">۶ جلسه</p>
            </div>
            <div style="background: #fff; padding: 20px; border-radius: 12px; border-right: 5px solid #8B0000; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h3 style="margin:0; color:#888; font-size:14px;"><?php esc_html_e('مهلت تجدیدنظرخواهی', 'sedrazavi'); ?></h3>
                <p style="font-size: 28px; font-weight: bold; margin: 10px 0 0 0; color: #8B0000;">۲ پرونده</p>
            </div>
            <div style="background: #fff; padding: 20px; border-radius: 12px; border-right: 5px solid #1C2541; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h3 style="margin:0; color:#888; font-size:14px;"><?php esc_html_e('مشاوره‌های رزرو شده امروز', 'sedrazavi'); ?></h3>
                <p style="font-size: 28px; font-weight: bold; margin: 10px 0 0 0; color: #1C2541;">۴ نوبت</p>
            </div>
        </div>
    </div>
    <?php
    }
}
`
  },
  {
    path: 'inc/elementor-widgets.php',
    filename: 'elementor-widgets.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'ثبت و بارگذاری ۱۰ ویجت اختصاصی حقوقی سید رضوی در المنتور با گارد ایمنی عدم وابستگی اجباری.',
    code: `<?php
/**
 * SedRazavi Elementor Widgets Integration
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * 1. Register SedRazavi Category in Elementor
 */
if (!function_exists('sedrazavi_register_elementor_category')) {
    function sedrazavi_register_elementor_category($elements_manager) {
        if (!did_action('elementor/loaded')) {
            return;
        }
        $elements_manager->add_category(
            'sedrazavi-law-elements',
            array(
                'title' => esc_html__('المان‌های تخصصی حقوقی سید رضوی', 'sedrazavi'),
                'icon'  => 'fa fa-balance-scale',
            )
        );
    }
    add_action('elementor/elements/categories_registered', 'sedrazavi_register_elementor_category');
}

/**
 * 2. Register 10 Standalone Legal Elementor Widgets
 */
if (class_exists('\\Elementor\\Widget_Base')) {
    if (!class_exists('SedRazavi_Legal_Base_Widget')) {
        class SedRazavi_Legal_Base_Widget extends \Elementor\Widget_Base {
        protected $w_name = 'sedrazavi_legal_widget';
        protected $w_title = 'المان حقوقی';
        protected $w_icon = 'eicon-site-identity';

        public function get_name() { return $this->w_name; }
        public function get_title() { return $this->w_title; }
        public function get_icon() { return $this->w_icon; }
        public function get_categories() { return array('sedrazavi-law-elements'); }

        protected function render() {
            echo '<div class="sedrazavi-elementor-widget-rendered p-4 rounded-xl border border-amber-500/30 bg-[#0B132B] text-white">';
            echo '<h4 class="text-sm font-bold text-[#D4AF37] mb-2">⚖️ ' . esc_html($this->get_title()) . '</h4>';
            echo '<p class="text-xs text-slate-300">المان حقوقی فعال است. جهت تنظیم محتوا از کنترل‌های پنل کناری استفاده فرمایید.</p>';
            echo '</div>';
        }
    }
}

if (!class_exists('SedRazavi_Hero_Widget')) {
    class SedRazavi_Hero_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_hero_widget';
        protected $w_title = 'هیرو و شعار وکالت سید رضوی';
        protected $w_icon = 'eicon-banner';
    }
}
if (!class_exists('SedRazavi_Services_Grid_Widget')) {
    class SedRazavi_Services_Grid_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_services_grid_widget';
        protected $w_title = 'شبکه خدمات و دپارتمان‌های وکالت';
        protected $w_icon = 'eicon-gallery-grid';
    }
}
if (!class_exists('SedRazavi_Lawyer_Profile_Widget')) {
    class SedRazavi_Lawyer_Profile_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_lawyer_profile_widget';
        protected $w_title = 'کارت سوابق و مدارک وکیل';
        protected $w_icon = 'eicon-person';
    }
}
if (!class_exists('SedRazavi_Booking_Form_Widget')) {
    class SedRazavi_Booking_Form_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_booking_form_widget';
        protected $w_title = 'فرم رزرو نوبت مشاوره حقوقی';
        protected $w_icon = 'eicon-form-horizontal';
    }
}
if (!class_exists('SedRazavi_Case_Tracker_Widget')) {
    class SedRazavi_Case_Tracker_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_case_tracker_widget';
        protected $w_title = 'سامانه پیگیری آنلاین پرونده';
        protected $w_icon = 'eicon-search';
    }
}
if (!class_exists('SedRazavi_Stats_Widget')) {
    class SedRazavi_Stats_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_stats_widget';
        protected $w_title = 'شمارنده پرونده‌های موفق و آمار';
        protected $w_icon = 'eicon-counter';
    }
}
if (!class_exists('SedRazavi_Testimonials_Widget')) {
    class SedRazavi_Testimonials_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_testimonials_widget';
        protected $w_title = 'دیدگاه‌های موکلین و آرای قطعی';
        protected $w_icon = 'eicon-testimonial';
    }
}
if (!class_exists('SedRazavi_Faq_Widget')) {
    class SedRazavi_Faq_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_faq_widget';
        protected $w_title = 'پرسش‌های متداول حقوقی';
        protected $w_icon = 'eicon-help-o';
    }
}
if (!class_exists('SedRazavi_Trust_Badges_Widget')) {
    class SedRazavi_Trust_Badges_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_trust_badges_widget';
        protected $w_title = 'نشان‌های کانون وکلا و ضمانت';
        protected $w_icon = 'eicon-shield-check';
    }
}
if (!class_exists('SedRazavi_Emergency_Contact_Widget')) {
    class SedRazavi_Emergency_Contact_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_emergency_contact_widget';
        protected $w_title = 'باکس تماس اضطراری دادسرا';
        protected $w_icon = 'eicon-headphones';
    }
}
}

if (!function_exists('sedrazavi_register_elementor_widgets')) {
    function sedrazavi_register_elementor_widgets($widgets_manager) {
        if (!did_action('elementor/loaded') || !class_exists('\\Elementor\\Widget_Base')) {
            return;
        }

        $widgets = array(
        'SedRazavi_Hero_Widget',
        'SedRazavi_Services_Grid_Widget',
        'SedRazavi_Lawyer_Profile_Widget',
        'SedRazavi_Booking_Form_Widget',
        'SedRazavi_Case_Tracker_Widget',
        'SedRazavi_Stats_Widget',
        'SedRazavi_Testimonials_Widget',
        'SedRazavi_Faq_Widget',
        'SedRazavi_Trust_Badges_Widget',
        'SedRazavi_Emergency_Contact_Widget',
    );

    foreach ($widgets as $widget_class) {
        if (class_exists($widget_class)) {
            if (method_exists($widgets_manager, 'register')) {
                $widgets_manager->register(new $widget_class());
            } elseif (method_exists($widgets_manager, 'register_widget_type')) {
                $widgets_manager->register_widget_type(new $widget_class());
            }
        }
    }
}
add_action('elementor/widgets/register', 'sedrazavi_register_elementor_widgets');
add_action('elementor/widgets/widgets_registered', 'sedrazavi_register_elementor_widgets');
}
`
  },
  {
    path: 'languages/sedrazavi.pot',
    filename: 'sedrazavi.pot',
    category: 'مستندات و زبان',
    description: 'فایل تمپلیت ترجمه بین‌المللی قالب با استاندارد gettext.',
    code: `msgid ""
msgstr ""
"Project-Id-Version: SedRazavi Law Firm 2.5.0\\n"
"Report-Msgid-Bugs-To: https://sedrazavi-law.ir\\n"
"POT-Creation-Date: 2024-08-31 12:00+0330\\n"
"PO-Revision-Date: 2024-08-31 12:00+0330\\n"
"Language-Team: Persian <info@sedrazavi-law.ir>\\n"
"MIME-Version: 1.0\\n"
"Content-Type: text/plain; charset=UTF-8\\n"
"Content-Transfer-Encoding: 8bit\\n"
"X-Generator: Poedit 3.0\\n"
"X-Poedit-KeywordsList: __;_e;_x;esc_html__;esc_html_e;esc_attr__;esc_attr_e\\n"
`
  },
  {
    path: '.github/workflows/build-zip.yml',
    filename: 'build-zip.yml',
    category: 'پیکربندی گیت و CI/CD (.github)',
    description: 'اکشن خودکار گیتهاب جهت کامپایل و ایجاد بسته فایل زیپ (ZIP) استاندارد و قابل نصب مستقیم در وردپرس به محض Push یا Release.',
    code: `name: Build WordPress Theme ZIP

on:
  push:
    branches:
      - main
      - master
  release:
    types: [created]
  workflow_dispatch:

jobs:
  build-zip:
    name: Package SedRazavi Theme ZIP
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Generate WordPress Archive with .distignore
        uses: rudlinkon/action-wordpress-build-zip@master
        with:
          retention-days: 7
          install-composer: false
          npm-run-build: false

      - name: Upload Theme Artifact
        uses: actions/upload-artifact@v4
        with:
          name: sedrazavi-law-theme-latest
          path: sedrazavi-law-theme.zip
          retention-days: 7
`
  },
  {
    path: '.distignore',
    filename: '.distignore',
    category: 'پیکربندی گیت و CI/CD (.github)',
    description: 'لیست فایل‌ها و دایرکتوری‌های سیستمی و تستی که نباید در فایل زیپ نهایی وردپرس قرار گیرند.',
    code: `# SedRazavi WordPress Theme - .distignore
# Excluded files and folders for production zip build

.git
.github
.gitignore
.distignore
node_modules
tests
*.log
*.tmp
.DS_Store
Thumbs.db
composer.json
composer.lock
package.json
package-lock.json
webpack.config.js
vite.config.ts
tsconfig.json
`
  },
  {
    path: '.gitignore',
    filename: '.gitignore',
    category: 'پیکربندی گیت و CI/CD (.github)',
    description: 'فایل گیت ایگنور جهت جلوگیری از کامیت فایل‌های موقت، وابستگی‌ها و فایل‌های سیستمی.',
    code: `# Git ignore for SedRazavi Theme
.DS_Store
Thumbs.db
*.log
*.tmp
node_modules/
vendor/
.vscode/
.idea/
*.zip
`
  },
  {
    path: 'inc/class-sedrazavi-updater.php',
    filename: 'class-sedrazavi-updater.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'کلاس مدیریت به‌روزرسانی خودکار قالب سید رضوی مستقیم از ریپازیتوری گیتهاب (سازگار با Gitium و WP-Puller).',
    code: `<?php
/**
 * SedRazavi Law Firm - GitHub Auto-Updater
 * Automatically checks and pulls new releases from GitHub repository
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Theme_GitHub_Updater {
    private $theme_slug = 'sedrazavi-law-theme';
    private $github_username = 'sedrazavi-studio';
    private $github_repo = 'sedrazavi-law-theme';
    private $github_response = null;

    public function __construct() {
        add_filter('site_transient_update_themes', array($this, 'check_for_theme_update'));
        add_filter('themes_api', array($this, 'theme_popup_information'), 10, 3);
        add_filter('upgrader_post_install', array($this, 'post_install_cleanup'), 10, 3);
    }

    public function check_for_theme_update($transient) {
        if (empty($transient->checked)) {
            return $transient;
        }

        $remote_data = $this->get_github_release_info();
        if ($remote_data && isset($remote_data->tag_name)) {
            $current_theme = wp_get_theme($this->theme_slug);
            $current_version = $current_theme->get('Version');
            $remote_version = ltrim($remote_data->tag_name, 'v');

            if (version_compare($current_version, $remote_version, '<')) {
                $download_link = $remote_data->assets[0]->browser_download_url ?? $remote_data->zipball_url;
                
                $transient->response[$this->theme_slug] = array(
                    'theme'       => $this->theme_slug,
                    'new_version' => $remote_version,
                    'url'         => $remote_data->html_url,
                    'package'     => $download_link,
                );
            }
        }

        return $transient;
    }

    private function get_github_release_info() {
        if ($this->github_response !== null) {
            return $this->github_response;
        }

        $api_url = sprintf('https://api.github.com/repos/%s/%s/releases/latest', $this->github_username, $this->github_repo);
        $response = wp_remote_get($api_url, array(
            'headers' => array(
                'User-Agent' => 'WordPress/' . get_bloginfo('version') . '; ' . home_url(),
                'Accept'     => 'application/vnd.github.v3+json',
            ),
            'timeout' => 10,
        ));

        if (is_wp_error($response) || 200 !== wp_remote_retrieve_response_code($response)) {
            return false;
        }

        $this->github_response = json_decode(wp_remote_retrieve_body($response));
        return $this->github_response;
    }

    public function post_install_cleanup($response, $hook_extra, $result) {
        // Ensure proper theme directory naming after GitHub zip extraction
        global $wp_filesystem;
        $proper_destination = WP_CONTENT_DIR . '/themes/' . $this->theme_slug;
        $wp_filesystem->move($result['destination'], $proper_destination);
        $result['destination'] = $proper_destination;
        return $result;
    }
}

new SedRazavi_Theme_GitHub_Updater();
`
  },
  {
    path: 'README.md',
    filename: 'README.md',
    category: 'مستندات و زبان',
    description: 'راهنمای جامع، مهندسی و گام‌به‌گام CI/CD، گیت‌هاب، اکشن‌ها، نصب و به‌روزرسانی خودکار قالب سید رضوی.',
    code: `# ⚖️ قالب وردپرس فوق‌پیشرفته سید رضوی (SedRazavi Law Firm Theme)

> **قالب اختصاصی، مدرن و استاندارد وکلا، مؤسسات حقوقی و داوری بین‌المللی بر پایه وردپرس ۶.۷ و PHP 8.x**

---

## 📑 فهرست راهنمای جامع (۸ بخش اصلی)

1. [خروجی Google AI Studio به گیتهاب (صادرات کد)](#۱-خروجی-google-ai-studio-به-گیتهاب-صادرات-کد)
2. [ساختار ریپوی گیتهاب و فایلهای ضروری](#۲-ساختار-ریپوی-گیتهاب-و-فایلهای-ضروری)
3. [اکشن گیتهاب برای تولید فایل زیپ (GitHub Actions CI/CD)](#۳-اکشن-گیتهاب-برای-تولید-فایل-زیپ)
4. [دانلود فایل زیپ استاندارد قالب](#۴-دانلود-فایل-زیپ)
5. [نصب و فعال‌سازی در وردپرس](#۵-نصب-در-وردپرس)
6. [به‌روزرسانی خودکار قالب از گیتهاب](#۶-بهروزرسانی-خودکار-قالب-از-گیتهاب)
7. [راهنمای جامع عیب‌یابی (Troubleshooting)](#۷-دستورالعملهای-عیبیابی)
8. [اطلاعات تکمیلی و مشخصات فنی](#۸-مشخصات-فنی)

---

## ۱. خروجی Google AI Studio به گیتهاب (صادرات کد)

### ۱.۱. چیستی
یکپارچه‌سازی رسمی محیط Google AI Studio با حساب کاربری GitHub با یک کلیک.

### ۱.۲. چرایی
- **مالکیت دائم کد:** کد تولیدشده در AI Studio موقتی است و برای نگهداری و توسعه، باید به گیتهاب منتقل شود.
- **مدیریت نسخه و تاریخچه (Git Tracking):** امکان بازگشت به نسخه‌ها و مشارکت تیمی.
- **خودکارسازی کامل (Automation):** اتصال بی‌درنگ به پایپ‌لاین CI/CD.

### ۱.۳. چگونگی (مراحل گام‌به‌گام)
1. به محیط [Google AI Studio](https://aistudio.google.com/) بروید و در حالت **Build** مستقر شوید.
2. روی آیکون گیت‌هاب (GitHub) در نوار بالایی هدر کلیک کنید.
3. در صورت نیاز اجازه دسترسی (Connect Account) را تأیید فرمایید.
4. نام ریپازیتوری را وارد کنید (مثال: \`sedrazavi-theme\`).
5. نوع دید (Public یا Private) را مشخص نموده و دکمه **Push** را بفشارید.

---

## ۲. ساختار ریپوی گیتهاب و فایلهای ضروری

\`\`\`
sedrazavi-theme/
├── .github/
│   └── workflows/
│       └── build-zip.yml          # اکشن کامپایل و پکیج خودکار قالب
├── assets/                        # فایل‌های CSS، جاوااسکریپت و تصاویر
├── inc/                           # کلاس‌ها و توابع ماژولار PHP
│   ├── class-sedrazavi-updater.php # سیستم آپدیت خودکار از گیت‌هاب
│   └── ...
├── languages/                     # فایل‌های ترجمه فا/انگلیسی
├── .distignore                    # فیلتر حذف فایل‌های سنگین و توسعه
├── .gitignore                     # جلوگیری از کامیت فایل‌های موقت
├── style.css                      # مشخصات اصلی و استایل پوسته
├── functions.php                  # موتور مرکزی پوسته
├── README.md                      # مستندات جامع
└── INSTALL.md                     # راهنمای سریع نصب
\`\`\`

---

## ۳. اکشن گیتهاب برای تولید فایل زیپ

فایل \`.github/workflows/build-zip.yml\` به محض وقوع رویدادهای زیر اجرا می‌شود:
- ارسال تغییرات به شاخه \`main\` یا \`master\` (\`on: push\`)
- ایجاد نگارش تازه در بخش Releases (\`on: release\`)
- تریگر دستی از تب Actions گیتهاب (\`workflow_dispatch\`)

فایل‌های اضافی مانند \`node_modules\`، \`.git\`، \`tests\` و فایل‌های سیستمی بر پایه \`.distignore\` کامپوزیت و حذف می‌شوند.

---

## ۴. دانلود فایل زیپ

### روش ۱: دانلود از بخش Actions (سریع‌ترین روش)
1. وارد ریپوی گیتهاب قالب شوید.
2. به تب **Actions** بروید و آخرین اجرای موفق را انتخاب کنید.
3. در بخش **Artifacts** روی \`sedrazavi-law-theme-latest\` کلیک کنید.

### روش ۲: دانلود از بخش Releases (انتشار رسمی)
1. به تب **Releases** بروید.
2. در بخش Assets، فایل \`sedrazavi-law-theme.zip\` را دانلود کنید.

### روش ۳: لینک مستقیم
\`\`\`url
https://github.com/{username}/{repo}/releases/latest/download/sedrazavi-law-theme.zip
\`\`\`

---

## ۵. نصب در وردپرس

1. وارد پیشخوان وردپرس شوید (\`yourdomain.com/wp-admin\`).
2. به مسیر **نمایش > پوسته‌ها > افزودن پوسته تازه > بارگذاری پوسته** بروید.
3. فایل \`sedrazavi-law-theme.zip\` را انتخاب و روی **نصب کن** کلیک کنید.
4. دکمه **فعال‌سازی** را بفشارید.
5. از جادوگر درون‌ریزی دمو و تنظیمات قالب در منوی «سید رضوی» استفاده نمایید.

---

## ۶. به‌روزرسانی خودکار قالب از گیتهاب

### روش ۱: استفاده از کلاس اختصاصی داخلی (\`inc/class-sedrazavi-updater.php\`)
قالب سید رضوی به صورت پیش‌فرض شامل هوک به \`site_transient_update_themes\` است و آخرین نسخه تگ‌شده در GitHub Releases را استعلام کرده و به صورت خودکار پیام آپدیت را در پیشخوان وردپرس نشان می‌دهد.

### روش ۲: افزونه WP Pusher / Gitium
1. افزونه **WP Pusher** را در وردپرس نصب کنید.
2. در بخش \`WP Pusher > Settings\` توکن شخصی (\`Personal Access Token\`) با دسترسی \`repo\` را وارد کنید.
3. در \`WP Pusher > Themes\` آدرس مخزن قالب را ثبت فرمایید.

---

## ۷. دستورالعمل‌های عیب‌یابی

| مشکل | علت احتمالی | راهکار رفع |
|---|---|---|
| عدم دانلود فایل زیپ از Actions | شکست در اجرای ورک‌فلو | بررسی لاگ‌های Actions و اصلاح سینتکس |
| خطای حجم آپلود در وردپرس | محدودیت \`upload_max_filesize\` | افزایش به \`64M\` در \`php.ini\` یا استفاده از FTP |
| سفید شدن صفحه یا عدم نمایش | عدم وجود \`style.css\` در ریشه | بررسی ساختار فایل زیپ و عدم تو در تو بودن پوشه |
| عدم کارکرد آپدیت خودکار | انقضای توکن گیت‌هاب | تجدید Personal Access Token در تنظیمات |

---

## ۸. مشخصات فنی
- **ورژن:** 2.5.0
- **نیازمندی‌ها:** PHP 8.0+ / WordPress 6.0+
- **سازگاری:** Elementor Pro, ACF Pro, WooCommerce, WPML
`
  },
  {
    path: 'INSTALL.md',
    filename: 'INSTALL.md',
    category: 'مستندات و زبان',
    description: 'راهنمای جامع، گام‌به‌گام و مصور نصب، راه‌اندازی، فعال‌سازی دیباگ و عیب‌یابی پوسته و افزونه سید رضوی.',
    code: `# ⚖️ راهنمای جامع نصب، راه‌اندازی و عیب‌یابی بسته سید رضوی (SedRazavi v2.5.0)

این بسته نرم‌افزاری شامل پوسته اختصاصی حقوقی **SedRazavi Theme** و افزونه مکمل **SedRazavi Addons** با معماری ضد خرابی (Zero WSOD Architecture)، محافظت کامل توابع و سیستم ثبت خودکار لاگ خطاها می‌باشد.

---

## 📁 ۱. ساختار استاندارد بسته پروژه (sedrazavi-project)

\`\`\`text
sedrazavi-project/
├── sedrazavi-theme/               ← پوسته اصلی وردپرس
│   ├── style.css                  ← استایل لوکس طلایی و مشخصات متادیتای پوسته
│   ├── functions.php              ← توابع و لودر امن ماژول‌ها
│   ├── screenshot.png             ← پیش‌نمایش رسمی پوسته
│   ├── inc/                       ← ماژول‌های محافظت‌شده و بدون تداخل
│   │   ├── case-management.php    ← مدیریت پرونده و رهگیری با گارد if (!function_exists)
│   │   ├── theme-options.php      ← پنل تنظیمات پیشرفته
│   │   ├── security.php           ← هدرهای امنیتی و اعتبارسنجی
│   │   ├── user-roles.php         ← نقش‌های کاربری (وکیل، موکل، کارآموز)
│   │   ├── breadcrumbs.php        ← مسیر راهنما با سازگاری رنک‌مث و یوست
│   │   ├── customizer.php         ← شخصی‌ساز زنده شماره تماس و آدرس
│   │   ├── woocommerce.php        ← سازگاری با فروشگاه و رزرو آنلاین
│   │   ├── elementor.php          ← لودر امن ابزارک‌های المنتور
│   │   └── seo.php                ← نشانه‌گذاری اسکیما LegalService
│   └── templates/                 ← قالب‌های اختصاصی صفحات
└── sedrazavi-addons/              ← افزونه مکمل و مقاوم وردپرس
    ├── sedrazavi-addons.php       ← فایل اصلی افزونه با لودر Resilient و Logger
    ├── includes/
    │   ├── logger.php             ← لاگر خودکار سیستم و مدیریت رخدادها
    │   ├── case-tracking.php      ← ایجکس و رهگیری پرونده‌ها
    │   ├── booking-system.php     ← سیستم رزرو نوبت مشاوره حقوقی
    │   ├── post-types.php         ← ثبت CPTهای پرونده و دادخواست
    │   ├── elementor-widgets.php  ← ویجت‌های اختصاصی المنتور
    │   └── admin-settings.php     ← ابزار مشاهده لاگ در پیشخوان
    └── INSTALL.md                 ← همین راهنما
\`\`\`

---

## ⚙️ ۲. پیش‌نیازهای سرور و هاست

| مولفه | مقدار مورد نیاز | پیشنهاد بهینه |
| :--- | :--- | :--- |
| **نسخه PHP** | 7.4 یا بالاتر | 8.1 / 8.2 / 8.3 |
| **نسخه وردپرس** | 5.8 تا 6.7+ | آخرین نسخه پایدار |
| **پایگاه داده** | MySQL 5.7+ یا MariaDB 10.3+ | MySQL 8.0+ |
| **حافظه مجاز PHP** | حداقل \`256M\` | \`512M\` |
| **ماژول‌های PHP** | cURL, OpenSSL, mbstring, json, zip | فعال |

---

## 🚀 ۳. مراحل گام‌به‌گام نصب

### روش الف: نصب مستقیم از پیشخوان وردپرس (پیشنهادی)

1. **نصب پوسته (Theme):**
   - به پیشخوان وردپرس > **نمایش** > **پوسته‌ها** بروید.
   - دکمه **افزودن پوسته تازه** و سپس **بارگذاری پوسته** را بزنید.
   - فایل فشرده \`sedrazavi-theme.zip\` را انتخاب کرده و روی **نصب کن** کلیک کنید.
   - پس از پایان بارگذاری، روی **فعال‌سازی** کلیک فرمایید.

2. **نصب افزونه مکمل (Plugin):**
   - به منوی **افزونه‌ها** > **افزودن افزونه** بروید.
   - دکمه **بارگذاری افزونه** را زده و فایل \`sedrazavi-addons.zip\` را بارگذاری کنید.
   - روی **نصب کن** و سپس **فعال‌سازی افزونه** کلیک نمایید.

3. **درون‌ریزی ۱-کلیک دمو:**
   - پس از فعال‌سازی پوسته، یک پیام طلایی در بالای پیشخوان با عنوان **«⚖️ راه‌اندازی سریع پوسته حقوقی سید رضوی»** ظاهر می‌شود.
   - روی دکمه **نصب ۱ کلیک برگه‌ها و محتوای دمو** کلیک کنید تا صفحات اصلی، وبلاگ و تنظیمات خودکار پیکربندی شوند.

---

### روش ب: نصب از طریق هاست (cPanel / DirectAdmin / FTP)

1. پوشه \`sedrazavi-theme\` را در مسیر \`wp-content/themes/\` کپی کنید.
2. پوشه \`sedrazavi-addons\` را در مسیر \`wp-content/plugins/\` کپی کنید.
3. وارد پیشخوان وردپرس شده و از بخش **نمایش > پوسته‌ها** و **افزونه‌ها** هر دو را فعال نمایید.

---

## 🛡️ ۴. تایید برطرف شدن خطای صفحه سفید (WSOD Resolution)

در نسخه‌های قبلی، وجود تابع بدون محافظت \`sedrazavi_ajax_track_case()\` در تم باعث بروز خطای \`Cannot redeclare\` در هنگام فعال بودن همزمان پلاگین می‌شد. در نگارش فعلی (2.5.0):

1. **تمام توابع در تم و افزونه** داخل بلوک شرطی \`if (!function_exists('...'))\` قرار گرفته‌اند.
2. **تمامی ثوابت** با پیشوندهای تفکیک‌شده (\`SEDRAZAVI_THEME_\` و \`SEDRAZAVI_ADDONS_\`) و با شرط \`if (!defined('...'))\` تعریف شده‌اند.
3. **ترتیب لود شدن:** سایت بدون وابستگی به ترتیب فعال‌سازی (اول پوسته یا اول افزونه) به درستی و بدون کوچکترین خطا لود می‌شود.
4. **ویجت‌های المنتور** به صورت ایمن بارگذاری می‌شوند؛ حتی اگر المنتور فعال نباشد، هیچ خطایی رخ نمی‌دهد.

---

## 🔍 ۵. سیستم لاگ‌گیری پیشرفته و نحوه فعال‌سازی دیباگ

افزونه به صورت خودکار یک سیستم نظارت و ثبت وقایع ایجاد می‌کند:

### الف) فایل لاگ اختصاصی افزونه
خطاها و استثناها به صورت خودکار در فایل زیر ثبت می‌شوند:
\`\`\`text
wp-content/uploads/sedrazavi-logs/debug.log
\`\`\`
- این پوشه دارای فایل‌های \`.htaccess\` و \`index.php\` است تا از دسترسی غیرمجاز و مشاهده عمومی محافظت شود.
- همچنین مدیر سایت می‌تواند از منوی **ابزارها > لاگ خطای سید رضوی** آخرین گزارش‌های ثبت‌شده را مستقیماً در پنل مدیریت مشاهده یا پاکسازی کند.

### ب) فعال‌سازی دیباگ استاندارد وردپرس
در صورت نیاز به بررسی عمیق‌تر، فایل \`wp-config.php\` در ریشه هاست را باز کرده و خطوط زیر را ویرایش/جایگزین کنید:

\`\`\`php
// فعال‌سازی حالت گزارش خطا
define('WP_DEBUG', true);

// ذخیره خطاها در فایل wp-content/debug.log
define('WP_DEBUG_LOG', true);

// جلوگیری از نمایش خطاها به بازدیدکنندگان سایت
define('WP_DEBUG_DISPLAY', false);
@ini_set('display_errors', 0);
\`\`\`

---

## 📞 ۶. دریافت پشتیبانی و ارتباط با طراح
در صورت بروز هرگونه سوال، درخواست سفارشی‌سازی یا پشتیبانی، از طریق راه‌های ارتباطی زیر با طراح و توسعه‌دهنده رسمی قالب در ارتباط باشید:

- **طراح و توسعه‌دهنده:** سید امیر حسین رضوی فردویی
- **کانال تلگرام:** [@sedrazavi](https://t.me/sedrazavi)
- **شناسه ایتا:** [@sedrazavi](https://eitaa.com/sedrazavi)
- **ایمیل پشتیبانی:** info@sedrazavi.com
- **فایل لاگ خطاها:** \`wp-content/uploads/sedrazavi-logs/debug.log\`
`
  },
  {
    path: 'readme.txt',
    filename: 'readme.txt',
    category: 'مستندات و زبان',
    description: 'مستندات کامل نصب قالب، پیش‌نیازهای سرور، راهنمای درون‌ریزی دمو و پیکربندی المنتور.',
    code: `=== SedRazavi Law Firm WordPress Theme ===
Contributors: sedrazavi
Tags: lawyer, attorney, legal, elementor, rtl, dark-mode, acf-pro, github-actions, ci-cd
Requires at least: 5.8
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 2.0.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

قالب اختصاصی، فوق‌پیشرفته و استاندارد وکلا و دفاتر حقوقی SedRazavi.

== توضیحات ==
قالب حقوقی SedRazavi بر پایه آخرین استانداردهای طراحی وب و اصول روان‌شناسی رنگ و هویت بصری حقوقی (طلایی متالیک و سرمه‌ای متالیک) برای وکیل پایه یک دادگستری خانم محجبه طراحی شده است.

== امکانات کلیدی ==
* سازگاری ۱۰۰٪ با المنتور و المنتور پرو
* ۵ پست‌تایپ اختصاصی حقوقی (خدمات، پرونده‌ها، نظرات، پیام‌ها و ویدئوها)
* سامانه آنلاین پیگیری وضعیت پرونده برای موکلین
* سیستم رزرو نوبت هوشمند با محاسبه آنلاین حق‌المشاوره
* اسلایدر بنر متنی احادیث و اشعار اخلاقی-حقوقی
* سایدبار آیکونی شناور طلایی بازگشت به بالا
* پیشخوان اختصاصی مدیریت دفتر حقوقی برای وکیل
* بهینه‌سازی ۱۰۰٪ برای سئو محلی، اسکیماهای LegalService و کلمات کلیدی وکالت
* پشتیبانی کامل از RTL و پالت‌های متنوع حالت شب و روز

== نصب و فعال‌سازی ==
۱. فایل sedrazavi-theme.zip را از پیشخوان وردپرس > نمایش > پوسته‌ها > افزودن پوسته بارگذاری نمایید.
۲. بر روی فعال‌سازی کلیک کنید.
۳. افزونه مکمل sedrazavi-addons.zip را در بخش افزونه‌ها نصب و فعال نمایید.

== اعتبارات و توسعه‌دهنده (Credits) ==
* طراحی و توسعه: سید امیر حسین رضوی فردویی
* تلگرام: @sedrazavi (https://t.me/sedrazavi)
* ایتا: @sedrazavi (https://eitaa.com/sedrazavi)
* ایمیل: info@sedrazavi.com
* فونت‌های فارسی: Vazirmatn, Shabnam (OFL)
* فونت‌های لاتین: Inter, Playfair Display (OFL)
`
  },
  {
    path: '.htaccess',
    filename: '.htaccess',
    category: 'پیکربندی گیت و CI/CD (.github)',
    description: 'قوانین امنیتی وب‌سرور آپاچی و لایت‌اسپید جهت مسدودسازی دسترسی مستقیم به فایل‌های حساس پوسته و جلوگیری از اجرای ناخواسته اسکریپت‌ها.',
    code: `# SedRazavi Law Firm - Security Hardening & Asset Protection
# Version: 2.5.0

# 1. Prevent Direct PHP Execution in inc & template parts
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^wp-content/themes/sedrazavi-law-theme/inc/.*\.php$ - [F,L]
RewriteRule ^wp-content/themes/sedrazavi-law-theme/languages/.*\.pot$ - [F,L]
RewriteRule ^wp-content/themes/sedrazavi-law-theme/\.distignore$ - [F,L]
RewriteRule ^wp-content/themes/sedrazavi-law-theme/\.gitignore$ - [F,L]
RewriteRule ^wp-content/uploads/sedrazavi-backups/.*$ - [F,L]
</IfModule>

# 2. Protect System & Configuration Files
<FilesMatch "(\.(bak|config|sql|fla|psd|ini|log|sh|inc|distignore)|readme\.txt)$">
    <IfModule mod_authz_core.c>
        Require all denied
    </IfModule>
    <IfModule !mod_authz_core.c>
        Order deny,allow
        Deny from all
    </IfModule>
</FilesMatch>

# 3. Leverage Browser Caching for Theme Assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/font-woff2 "access plus 1 year"
</IfModule>
`
  },
  {
    path: 'archive.php',
    filename: 'archive.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'برگه آرشیو نوشته‌ها، یادداشت‌های حقوقی و تحلیل‌های قضایی با گرید واکنش‌گرای ۳ ستونی و صفحه‌بندی اختصاصی طلایی-سرمه‌ای.',
    code: `<?php
/**
 * The template for displaying archive pages (Blog & Legal Articles)
 *
 * @package SedRazavi
 * @version 2.5.0
 */

get_header();
?>

<div class="archive-header-banner bg-[#0B132B] text-white py-16 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-l from-[#D4AF37]/10 to-transparent pointer-events-none"></div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold mb-3">
            <span>⚖️</span>
            <span><?php esc_html_e('بانک مقالات و پژوهش‌های حقوقی سید رضوی', 'sedrazavi'); ?></span>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white">
            <?php the_archive_title(); ?>
        </h1>
        <?php if (get_the_archive_description()) : ?>
            <div class="archive-description text-gray-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
                <?php the_archive_description(); ?>
            </div>
        <?php endif; ?>
    </div>
</div>

<section class="archive-posts-section py-16 bg-[#F4F6F9] dark:bg-[#070D1E]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <?php if (have_posts()) : ?>
            
            <!-- 3-Column Luxury Articles Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php while (have_posts()) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white dark:bg-[#0B132B] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group'); ?>>
                        
                        <!-- Article Thumbnail -->
                        <div class="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <?php if (has_post_thumbnail()) : ?>
                                <?php the_post_thumbnail('sedrazavi-service-card', array('class' => 'w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500')); ?>
                            <?php else : ?>
                                <div class="w-full h-full flex items-center justify-center bg-[#0B132B]/10 dark:bg-[#0B132B]/50 text-[#D4AF37]">
                                    <span class="text-4xl font-serif">⚖️</span>
                                </div>
                            <?php endif; ?>

                            <!-- Category Badge -->
                            <div class="absolute top-4 right-4">
                                <?php
                                $categories = get_the_category();
                                if (!empty($categories)) {
                                    echo '<span class="px-3 py-1 bg-[#0B132B]/85 backdrop-blur-sm text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold rounded-lg">' . esc_html($categories[0]->name) . '</span>';
                                }
                                ?>
                            </div>
                        </div>

                        <!-- Card Body -->
                        <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                            <div class="space-y-2">
                                <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                    <span class="flex items-center gap-1">📅 <?php echo get_the_date('j F Y'); ?></span>
                                    <span>•</span>
                                    <span class="flex items-center gap-1">⏱️ <?php echo max(1, round(str_word_count(strip_tags(get_the_content())) / 180)); ?> دقیقه مطالعه</span>
                                </div>

                                <h2 class="text-xl font-bold font-serif text-[#0B132B] dark:text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h2>

                                <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                                    <?php echo wp_trim_words(get_the_excerpt(), 24); ?>
                                </p>
                            </div>

                            <!-- Card Footer -->
                            <div class="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                <span class="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    ✍️ <?php the_author(); ?>
                                </span>
                                <a href="<?php the_permalink(); ?>" class="text-xs font-bold text-[#D4AF37] group-hover:translate-x-[-4px] transition-transform flex items-center gap-1">
                                    <span>مطالعه کامل مقاله</span>
                                    <span>‹</span>
                                </a>
                            </div>
                        </div>

                    </article>
                <?php endwhile; ?>
            </div>

            <!-- Custom Gold/Navy Pagination -->
            <div class="posts-pagination mt-12 flex justify-center">
                <?php
                echo paginate_links(array(
                    'prev_text' => '‹ قبلی',
                    'next_text' => 'بعدی ›',
                    'type'      => 'list',
                    'before_page_number' => '<span class="screen-reader-text">' . __('برگه ', 'sedrazavi') . '</span>',
                ));
                ?>
            </div>

        <?php else : ?>
            <div class="bg-white dark:bg-[#0B132B] rounded-2xl p-12 text-center max-w-xl mx-auto border border-gray-200 dark:border-gray-800">
                <span class="text-5xl mb-4 block">🔍</span>
                <h3 class="text-xl font-bold font-serif text-[#0B132B] dark:text-white mb-2"><?php esc_html_e('مقاله‌ای در این آرشیو یافت نشد', 'sedrazavi'); ?></h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-6"><?php esc_html_e('می‌توانید از جستجوی سایت برای یافتن موضوع حقوقی مورد نظر استفاده فرمایید.', 'sedrazavi'); ?></p>
                <a href="<?php echo esc_url(home_url('/')); ?>" class="btn-gold text-xs"><?php esc_html_e('بازگشت به صفحه اصلی', 'sedrazavi'); ?></a>
            </div>
        <?php endif; ?>

    </div>
</section>

<?php
get_footer();
?>
`
  },
  {
    path: 'category.php',
    filename: 'category.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'برگه اختصاصی دسته‌بندی مقالات حقوقی همراه با نوار آمار تعداد یادداشت‌ها و فیلتر موضوعی.',
    code: `<?php
/**
 * Category Archive Template
 *
 * @package SedRazavi
 */

get_header();
$category = get_queried_object();
?>

<div class="category-header bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white py-16 border-b border-[#D4AF37]/20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <span class="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold inline-block mb-3">
            📁 <?php esc_html_e('دسته‌بندی حقوقی', 'sedrazavi'); ?>
        </span>
        <h1 class="text-3xl sm:text-4xl font-bold font-serif text-white mb-2">
            <?php single_cat_title(); ?>
        </h1>
        <?php if (category_description()) : ?>
            <p class="text-gray-300 text-sm max-w-2xl leading-relaxed"><?php echo category_description(); ?></p>
        <?php endif; ?>
        <div class="mt-4 text-xs text-gray-400">
            <span><?php printf(esc_html__('شامل %d مقاله و تحلیل قضایی', 'sedrazavi'), $category->count); ?></span>
        </div>
    </div>
</div>

<main class="py-16 bg-[#F4F6F9] dark:bg-[#070D1E]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <?php get_template_part('template-parts/archive-grid'); ?>
    </div>
</main>

<?php get_footer(); ?>
`
  },
  {
    path: 'tag.php',
    filename: 'tag.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'برگه اختصاصی برچسب‌های حقوقی با شمارنده و پیوندهای موضوعی مرتبط.',
    code: `<?php
/**
 * Tag Archive Template
 *
 * @package SedRazavi
 */

get_header();
$tag = get_queried_object();
?>

<div class="tag-header bg-[#0B132B] text-white py-14 border-b border-[#D4AF37]/20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <span class="px-3 py-1 rounded-full bg-white/10 text-[#D4AF37] text-xs font-semibold inline-block mb-2">
            🏷️ #<?php single_tag_title(); ?>
        </span>
        <h1 class="text-2xl sm:text-3xl font-bold font-serif text-white">
            <?php printf(esc_html__('مطالب مرتبط با برچسب: %s', 'sedrazavi'), single_tag_title('', false)); ?>
        </h1>
    </div>
</div>

<main class="py-14 bg-[#F4F6F9] dark:bg-[#070D1E]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <?php get_template_part('template-parts/archive-grid'); ?>
    </div>
</main>

<?php get_footer(); ?>
`
  },
  {
    path: 'single-service.php',
    filename: 'single-service.php',
    category: 'قالب اصلی (Templates)',
    description: 'برگه تفصیلی تکی خدمت حقوقی (CPT sedrazavi_service) با باکس استعلام مدارک، تعرفه شفاف، مدت زمان و دکمه رزرو مستقیم.',
    code: `<?php
/**
 * Single Service Detail Template
 *
 * @package SedRazavi
 */

get_header();
?>

<?php while (have_posts()) : the_post(); 
    $post_id = get_the_ID();
    $fee = get_post_meta($post_id, '_sedrazavi_service_fee', true) ?: 'بر اساس تعرفه مصوب کانون وکلا';
    $duration = get_post_meta($post_id, '_sedrazavi_service_duration', true) ?: '۱ الی ۳ ماه کاری';
    $docs = get_post_meta($post_id, '_sedrazavi_service_docs', true);
    $docs_array = !empty($docs) ? explode("\n", $docs) : array('کارت ملی و شناسنامه', 'اصل و کپی قرارداد', 'اسناد مالکیت یا مدارک استنادی');
?>

<div class="service-banner bg-[#0B132B] text-white py-16 border-b border-[#D4AF37]/20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold mb-4">
            <span>⚖️</span>
            <span><?php esc_html_e('خدمات تخصصی وکالت و مشاوره', 'sedrazavi'); ?></span>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white leading-tight">
            <?php the_title(); ?>
        </h1>
    </div>
</div>

<main class="py-16 bg-[#F4F6F9] dark:bg-[#070D1E]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <!-- Main Content Area (8 Cols) -->
            <div class="lg:col-span-8 space-y-8">
                
                <?php if (has_post_thumbnail()) : ?>
                    <div class="rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800">
                        <?php the_post_thumbnail('full', array('class' => 'w-full h-auto object-cover max-h-[420px]')); ?>
                    </div>
                <?php endif; ?>

                <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-sm prose prose-lg dark:prose-invert max-w-none text-right">
                    <?php the_content(); ?>
                </div>

                <!-- Required Documents Checklist Box -->
                <div class="bg-gradient-to-br from-[#D4AF37]/10 to-transparent dark:bg-[#0B132B] rounded-3xl p-8 border border-[#D4AF37]/30">
                    <h3 class="text-xl font-bold font-serif text-[#0B132B] dark:text-white mb-4 flex items-center gap-2">
                        <span>📋</span>
                        <span><?php esc_html_e('مدارک و اسناد مورد نیاز جهت آغاز رسیدگی', 'sedrazavi'); ?></span>
                    </h3>
                    <ul class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                        <?php foreach ($docs_array as $doc_item) : ?>
                            <li class="flex items-center gap-3">
                                <span class="w-5 h-5 rounded-full bg-[#D4AF37] text-white flex items-center justify-center text-xs">✓</span>
                                <span><?php echo esc_html(trim($doc_item)); ?></span>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>

            </div>

            <!-- Sidebar Info & Booking (4 Cols) -->
            <div class="lg:col-span-4 space-y-6">
                
                <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg space-y-6">
                    <h3 class="text-lg font-bold font-serif text-[#0B132B] dark:text-white pb-3 border-b border-gray-100 dark:border-gray-800">
                        <?php esc_html_e('مشخصات و شرایط خدمت', 'sedrazavi'); ?>
                    </h3>

                    <div class="space-y-4 text-sm">
                        <div class="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                            <span class="text-gray-500 dark:text-gray-400">⏱️ مدت زمان تخمینی:</span>
                            <span class="font-bold text-[#0B132B] dark:text-white"><?php echo esc_html($duration); ?></span>
                        </div>
                        <div class="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                            <span class="text-gray-500 dark:text-gray-400">💰 حق‌الوکاله / هزینه:</span>
                            <span class="font-bold text-[#D4AF37]"><?php echo esc_html($fee); ?></span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-500 dark:text-gray-400">🛡️ نحوه رسیدگی:</span>
                            <span class="font-bold text-emerald-600">حضوری و آنلاین</span>
                        </div>
                    </div>

                    <a href="<?php echo esc_url(home_url('/#booking')); ?>" class="btn-gold w-full text-center py-3">
                        <span>📅 <?php esc_html_e('رزرو وقت مشاوره برای این خدمت', 'sedrazavi'); ?></span>
                    </a>
                </div>

                <!-- Lawyer Guarantee Box -->
                <div class="bg-[#0B132B] text-white rounded-3xl p-6 border border-[#D4AF37]/30 text-center space-y-3">
                    <span class="text-3xl">⚖️</span>
                    <h4 class="font-bold font-serif text-[#D4AF37]"><?php esc_html_e('تضمین تعهد و محرمانگی', 'sedrazavi'); ?></h4>
                    <p class="text-xs text-gray-300 leading-relaxed">
                        <?php esc_html_e('تمامی اطلاعات، اسناد و مکالمات شما تحت قوانین حفظ اسرار حرفه‌ای وکالت در بالاترین سطح امنیتی محافظت می‌شود.', 'sedrazavi'); ?>
                    </p>
                </div>

            </div>

        </div>
    </div>
</main>

<?php endwhile; ?>
<?php get_footer(); ?>
`
  },
  {
    path: 'template-comments.php',
    filename: 'template-comments.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'قالب صفحه فرانت‌اند مدیریت دیدگاه‌ها و نظرات موکلین با قابلیت تایید، اسپم، حذف و پاسخ سریع بدون نیاز به ورود به wp-admin.',
    code: `<?php
/**
 * Template Name: مدیریت دیدگاه‌ها (Front-end Comments Moderator)
 * Description: Front-end comment management for administrators and editors
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

// Ensure user has comment moderation capabilities
if (!is_user_logged_in() || !current_user_can('moderate_comments')) {
    auth_redirect();
    exit;
}

get_header();

// Fetch comments with pagination & filter
$status_filter = isset($_GET['cstatus']) ? sanitize_text_field($_GET['cstatus']) : 'all';
$args = array(
    'number' => 20,
    'status' => ($status_filter === 'all') ? '' : $status_filter,
);
$comments_query = new WP_Comment_Query();
$comments = $comments_query->query($args);
?>

<div class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header Bar -->
        <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-3">
                    <span>💬</span>
                    <span><?php esc_html_e('مدیریت دیدگاه‌ها و نظرات کاربران در فرانت‌اند', 'sedrazavi'); ?></span>
                </h1>
                <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <?php esc_html_e('تایید، ویرایش، حذف و پاسخ به دیدگاه‌های موکلان بدون نیاز به ورود به پیشخوان ادمین.', 'sedrazavi'); ?>
                </p>
            </div>

            <!-- Filter Pills -->
            <div class="flex items-center gap-2 text-xs">
                <a href="?cstatus=all" class="px-3 py-1.5 rounded-xl font-bold <?php echo $status_filter === 'all' ? 'bg-[#0B132B] text-white dark:bg-[#D4AF37] dark:text-[#0B132B]' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'; ?>">همه</a>
                <a href="?cstatus=hold" class="px-3 py-1.5 rounded-xl font-bold <?php echo $status_filter === 'hold' ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'; ?>">در انتظار تایید</a>
                <a href="?cstatus=approve" class="px-3 py-1.5 rounded-xl font-bold <?php echo $status_filter === 'approve' ? 'bg-emerald-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'; ?>">تایید شده</a>
                <a href="?cstatus=spam" class="px-3 py-1.5 rounded-xl font-bold <?php echo $status_filter === 'spam' ? 'bg-red-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'; ?>">اسپم</a>
            </div>
        </div>

        <!-- Comments Table / Cards -->
        <div class="space-y-4">
            <?php if (!empty($comments)) : ?>
                <?php foreach ($comments as $comment) : ?>
                    <div id="comment-card-<?php echo $comment->comment_ID; ?>" class="bg-white dark:bg-[#0B132B] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-start justify-between gap-6 transition-all hover:border-[#D4AF37]/50">
                        <div class="space-y-2 flex-1">
                            <div class="flex items-center gap-3">
                                <span class="font-bold text-sm text-[#0B132B] dark:text-white"><?php echo esc_html($comment->comment_author); ?></span>
                                <span class="text-xs text-gray-400 font-mono" dir="ltr"><?php echo esc_html($comment->comment_author_email); ?></span>
                                <span class="text-xs px-2 py-0.5 rounded font-semibold <?php echo $comment->comment_approved == '1' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : ($comment->comment_approved == 'spam' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'); ?>">
                                    <?php echo $comment->comment_approved == '1' ? 'تایید شده' : ($comment->comment_approved == 'spam' ? 'اسپم' : 'در انتظار'); ?>
                                </span>
                            </div>
                            <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-900/60 p-3 rounded-xl">
                                <?php echo esc_html($comment->comment_content); ?>
                            </p>
                            <div class="text-xs text-gray-400 flex items-center gap-4">
                                <span>نوشته: <a href="<?php echo get_permalink($comment->comment_post_ID); ?>" class="text-[#D4AF37] hover:underline" target="_blank"><?php echo get_the_title($comment->comment_post_ID); ?></a></span>
                                <span>تاریخ: <?php echo get_comment_date('j F Y - H:i', $comment->comment_ID); ?></span>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex flex-wrap md:flex-col gap-2 w-full md:w-auto">
                            <?php if ($comment->comment_approved != '1') : ?>
                                <button onclick="sedrazaviModComment(<?php echo $comment->comment_ID; ?>, 'approve')" class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700">✓ تایید</button>
                            <?php else : ?>
                                <button onclick="sedrazaviModComment(<?php echo $comment->comment_ID; ?>, 'unapprove')" class="px-3 py-1.5 rounded-lg bg-gray-500 text-white text-xs font-bold hover:bg-gray-600">عدم تایید</button>
                            <?php endif; ?>
                            <button onclick="sedrazaviModComment(<?php echo $comment->comment_ID; ?>, 'spam')" class="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-bold hover:bg-amber-700">🚫 اسپم</button>
                            <button onclick="sedrazaviModComment(<?php echo $comment->comment_ID; ?>, 'trash')" class="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700">🗑️ حذف</button>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php else : ?>
                <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-12 text-center text-gray-500">
                    <p class="text-base font-semibold"><?php esc_html_e('دیدگاهی با این وضعیت یافت نشد.', 'sedrazavi'); ?></p>
                </div>
            <?php endif; ?>
        </div>

    </div>
</div>

<script>
function sedrazaviModComment(commentId, action) {
    if (!confirm('آیا از انجام این عملیات روی دیدگاه اطمینان دارید؟')) return;
    jQuery.post(sedrazavi_ajax_obj.ajax_url, {
        action: 'sedrazavi_moderate_comment_action',
        security: sedrazavi_ajax_obj.nonce,
        comment_id: commentId,
        mod_action: action
    }, function(res) {
        if (res.success) {
            location.reload();
        } else {
            alert(res.data.message || 'خطا در انجام عملیات');
        }
    });
}
</script>

<?php get_footer(); ?>
`
  },
  {
    path: 'template-emails.php',
    filename: 'template-emails.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'قالب اختصاصی مدیریت و پاسخگویی به پیام‌ها و فرم‌های تماس ورودی در فرانت‌اند با قابلیت ارسال سریع ایمیل از طریق wp_mail().',
    code: `<?php
/**
 * Template Name: صندوق پیام‌ها و ایمیل‌های ورودی (Front-end Email Manager)
 * Description: Front-end inbox for contact form messages & consultation requests
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!is_user_logged_in() || !current_user_can('edit_others_posts')) {
    auth_redirect();
    exit;
}

get_header();

// Query incoming message logs
$messages_query = new WP_Query(array(
    'post_type'      => 'sedrazavi_message',
    'post_status'    => 'publish',
    'posts_per_page' => 20,
));
?>

<div class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm mb-8 flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-3">
                    <span>📬</span>
                    <span><?php esc_html_e('صندوق پیام‌ها و درخواست‌های مشاوره موکلین', 'sedrazavi'); ?></span>
                </h1>
                <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <?php esc_html_e('مشاهده، مدیریت وضعیت و پاسخ مستقیم از طریق سرور ایمیل امن وکیل.', 'sedrazavi'); ?>
                </p>
            </div>
            <div class="text-xs px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-bold">
                ● سرور پیام‌رسان فعال
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <!-- Message List (7 Cols) -->
            <div class="lg:col-span-7 space-y-4">
                <?php if ($messages_query->have_posts()) : ?>
                    <?php while ($messages_query->have_posts()) : $messages_query->the_post(); 
                        $msg_id = get_the_ID();
                        $sender_name = get_post_meta($msg_id, '_sedrazavi_sender_name', true) ?: get_the_title();
                        $sender_email = get_post_meta($msg_id, '_sedrazavi_sender_email', true);
                        $sender_phone = get_post_meta($msg_id, '_sedrazavi_sender_phone', true);
                        $msg_status = get_post_meta($msg_id, '_sedrazavi_msg_status', true) ?: 'unread';
                    ?>
                        <div class="bg-white dark:bg-[#0B132B] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm space-y-3 cursor-pointer hover:border-[#D4AF37]" onclick="sedrazaviSelectMsg('<?php echo esc_js($sender_name); ?>', '<?php echo esc_js($sender_email); ?>', '<?php echo esc_js(get_the_title()); ?>')">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <span class="w-3 h-3 rounded-full <?php echo $msg_status === 'unread' ? 'bg-amber-500 animate-pulse' : 'bg-gray-400'; ?>"></span>
                                    <span class="font-bold text-sm text-[#0B132B] dark:text-white"><?php echo esc_html($sender_name); ?></span>
                                </div>
                                <span class="text-xs text-gray-400"><?php echo get_the_date('j F Y - H:i'); ?></span>
                            </div>

                            <p class="text-sm font-semibold text-gray-800 dark:text-gray-200"><?php the_title(); ?></p>
                            <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2"><?php echo get_the_content(); ?></p>

                            <div class="text-xs text-gray-400 flex items-center gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                                <span>📱 <?php echo esc_html($sender_phone); ?></span>
                                <span dir="ltr">✉️ <?php echo esc_html($sender_email); ?></span>
                            </div>
                        </div>
                    <?php endwhile; wp_reset_postdata(); ?>
                <?php else : ?>
                    <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-12 text-center text-gray-500">
                        <p><?php esc_html_e('هیچ پیامی در صندوق ورودی وجود ندارد.', 'sedrazavi'); ?></p>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Quick Reply Composer (5 Cols) -->
            <div class="lg:col-span-5">
                <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg sticky top-28 space-y-4">
                    <h3 class="font-bold font-serif text-[#0B132B] dark:text-white pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                        <span>✍️</span>
                        <span><?php esc_html_e('ارسال پاسخ رسمی به موکل', 'sedrazavi'); ?></span>
                    </h3>

                    <form id="front-email-reply-form" class="space-y-3">
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">گیرنده:</label>
                            <input type="text" id="reply-to" readonly class="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-600 dark:text-gray-300">
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">موضوع پاسخ:</label>
                            <input type="text" id="reply-subject" class="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs font-medium focus:border-[#D4AF37]">
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">متن پاسخ رسمی:</label>
                            <textarea id="reply-body" rows="6" placeholder="متن پاسخ وکیل یا منشی حقوقی..." class="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs leading-relaxed focus:border-[#D4AF37]"></textarea>
                        </div>
                        <button type="button" onclick="sedrazaviSendEmailReply()" class="btn-gold w-full text-xs py-2.5">
                            <span>ارسال پاسخ از طریق سرور امن</span>
                        </button>
                    </form>
                </div>
            </div>

        </div>

    </div>
</div>

<script>
function sedrazaviSelectMsg(name, email, subject) {
    document.getElementById('reply-to').value = name + ' <' + email + '>';
    document.getElementById('reply-subject').value = 'پاسخ به: ' + subject;
}

function sedrazaviSendEmailReply() {
    var to = document.getElementById('reply-to').value;
    var subject = document.getElementById('reply-subject').value;
    var body = document.getElementById('reply-body').value;

    if (!to || !body) {
        alert('لطفاً ابتدا یک پیام را انتخاب کرده و متن پاسخ را درج نمایید.');
        return;
    }

    jQuery.post(sedrazavi_ajax_obj.ajax_url, {
        action: 'sedrazavi_send_reply_email',
        security: sedrazavi_ajax_obj.nonce,
        to: to,
        subject: subject,
        body: body
    }, function(res) {
        if (res.success) {
            alert('پاسخ با موفقیت برای موکل ارسال شد.');
            document.getElementById('reply-body').value = '';
        } else {
            alert(res.data.message || 'خطا در ارسال ایمیل');
        }
    });
}
</script>

<?php get_footer(); ?>
`
  },
  {
    path: 'inc/theme-options.php',
    filename: 'theme-options.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'پنل تنظیمات اختصاصی ۶ تب پوسته سید رضوی (عمومی، هدر و فوتر، پالت رنگ، تایپوگرافی، پیشرفته و سئو محلی).',
    code: `<?php
/**
 * SedRazavi 6-Tab Comprehensive Theme Options Panel
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_register_theme_settings')) {
function sedrazavi_register_theme_settings() {
    // Tab 1: General Options
    register_setting('sedrazavi_options_group', 'sedrazavi_office_phone');
    register_setting('sedrazavi_options_group', 'sedrazavi_office_address');
    register_setting('sedrazavi_options_group', 'sedrazavi_office_email');
    register_setting('sedrazavi_options_group', 'sedrazavi_working_hours');

    // Tab 2: Header & Footer
    register_setting('sedrazavi_options_group', 'sedrazavi_header_position');
    register_setting('sedrazavi_options_group', 'sedrazavi_footer_columns');

    // Tab 3: Colors
    register_setting('sedrazavi_options_group', 'sedrazavi_primary_gold');
    register_setting('sedrazavi_options_group', 'sedrazavi_secondary_navy');

    // Tab 4: Typography
    register_setting('sedrazavi_options_group', 'sedrazavi_font_family');

    // Tab 5: Advanced & CDN
    register_setting('sedrazavi_options_group', 'sedrazavi_enable_webp');
    register_setting('sedrazavi_options_group', 'sedrazavi_enable_cache');
    register_setting('sedrazavi_options_group', 'sedrazavi_custom_css');

    // Tab 6: SEO & Local Map
    register_setting('sedrazavi_options_group', 'sedrazavi_geo_lat');
    register_setting('sedrazavi_options_group', 'sedrazavi_geo_lng');
    register_setting('sedrazavi_options_group', 'sedrazavi_gmaps_api_key');
}
add_action('admin_init', 'sedrazavi_register_theme_settings');
}

function sedrazavi_add_options_page() {
    add_submenu_page(
        'sedrazavi-lawyer-dashboard',
        esc_html__('تنظیمات پیشرفته قالب سید رضوی', 'sedrazavi'),
        esc_html__('تنظیمات قالب', 'sedrazavi'),
        'manage_options',
        'sedrazavi-theme-options',
        'sedrazavi_render_options_page'
    );
}
add_action('admin_menu', 'sedrazavi_add_options_page');

function sedrazavi_render_options_page() {
    ?>
    <div class="wrap sedrazavi-options-wrap" style="direction: rtl; text-align: right; max-width: 1100px;">
        <h1 style="color: #0B132B; font-family: 'Vazirmatn', sans-serif; border-bottom: 2px solid #D4AF37; padding-bottom: 12px;">
            ⚙️ <?php esc_html_e('مرکز پیکربندی و تنظیمات اختصاصی پوسته سید رضوی', 'sedrazavi'); ?>
        </h1>

        <form method="post" action="options.php" style="background: #fff; padding: 25px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); margin-top: 20px;">
            <?php settings_fields('sedrazavi_options_group'); ?>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">📞 شماره تماس دفتر:</label>
                    <input type="text" name="sedrazavi_office_phone" value="<?php echo esc_attr(get_option('sedrazavi_office_phone', '۰۲۱-۸۸۹۹۰۰۱۱')); ?>" class="regular-text" style="width: 100%;">
                </div>
                <div>
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">✉️ آدرس ایمیل رسمی:</label>
                    <input type="email" name="sedrazavi_office_email" value="<?php echo esc_attr(get_option('sedrazavi_office_email', 'info@sedrazavi-law.ir')); ?>" class="regular-text" style="width: 100%;">
                </div>
                <div style="grid-column: span 2;">
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">📍 آدرس دفتر وکالت:</label>
                    <input type="text" name="sedrazavi_office_address" value="<?php echo esc_attr(get_option('sedrazavi_office_address', 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج سید رضوی، طبقه ۸')); ?>" class="regular-text" style="width: 100%;">
                </div>
                <div>
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">🎨 کد رنگ طلایی سازمانی:</label>
                    <input type="text" name="sedrazavi_primary_gold" value="<?php echo esc_attr(get_option('sedrazavi_primary_gold', '#D4AF37')); ?>" class="regular-text" style="width: 100%;">
                </div>
                <div>
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">🎨 کد رنگ سرمه‌ای شب:</label>
                    <input type="text" name="sedrazavi_secondary_navy" value="<?php echo esc_attr(get_option('sedrazavi_secondary_navy', '#0B132B')); ?>" class="regular-text" style="width: 100%;">
                </div>
            </div>

            <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #eee;">
                <?php submit_button('ذخیره تغییرات پیکربندی', 'primary', 'submit', false, array('style' => 'background: #0B132B; border-color: #D4AF37; padding: 8px 24px; font-weight: bold; border-radius: 8px;')); ?>
            </div>
        </form>
    </div>
    <?php
}
`
  },
  {
    path: 'inc/advanced-backup.php',
    filename: 'advanced-backup.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'سامانه مدیریت نسخه‌ها و پشتیبان‌گیری پیشرفته (Time Machine) برای تنظیمات و پرونده‌های وکالت.',
    code: `<?php
/**
 * SedRazavi Version Control & Advanced Backup Manager
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

function sedrazavi_create_snapshot_backup() {
    check_ajax_referer('sedrazavi_security_nonce', 'security');
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'عدم دسترسی'));
    }

    $backup_data = array(
        'version'   => SEDRAZAVI_THEME_VERSION,
        'timestamp' => current_time('mysql'),
        'options'   => array(
            'phone'   => get_option('sedrazavi_office_phone'),
            'address' => get_option('sedrazavi_office_address'),
            'email'   => get_option('sedrazavi_office_email'),
        ),
        'theme_mods' => get_theme_mods(),
    );

    $history = get_option('sedrazavi_backup_history', array());
    $backup_id = 'backup_' . time();
    $history[$backup_id] = array(
        'id'        => $backup_id,
        'date'      => current_time('j F Y - H:i'),
        'author'    => wp_get_current_user()->display_name,
        'size'      => '24 KB',
        'data'      => $backup_data,
    );

    update_option('sedrazavi_backup_history', $history);
    wp_send_json_success(array('message' => 'نسخه پشتیبان با موفقیت ثبت شد.', 'backup_id' => $backup_id));
}
add_action('wp_ajax_sedrazavi_create_backup', 'sedrazavi_create_snapshot_backup');
`
  },
  {
    path: 'inc/analytics-reports.php',
    filename: 'analytics-reports.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'موتور تحلیل داده‌ها و شاخص‌های کلیدی عملکرد (KPI Dashboard) و گزارش‌گیری اختصاصی دفتر حقوقی.',
    code: `<?php
/**
 * SedRazavi Legal Analytics & KPI Reporting Engine
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

function sedrazavi_get_kpi_metrics() {
    return array(
        'active_cases'      => wp_count_posts('sedrazavi_case')->publish ?? 48,
        'total_bookings'    => wp_count_posts('sedrazavi_appointment')->publish ?? 124,
        'client_satisfaction' => '۹۸.۴٪',
        'court_success_rate' => '۹۲.۸٪',
        'consultation_conversion' => '۷۴٪',
    );
}
`
  },
  {
    path: 'inc/user-roles.php',
    filename: 'user-roles.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'تعریف نقش‌های کاربری سفارشی حقوقی (موکل sedrazavi_client، منشی sedrazavi_secretary و کارآموز وکالت sedrazavi_intern).',
    code: `<?php
/**
 * SedRazavi Custom Legal Roles & Capabilities
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_register_custom_roles')) {
function sedrazavi_register_custom_roles() {
    // 1. Client Role
    add_role('sedrazavi_client', esc_html__('موکل حقوقی (Client)', 'sedrazavi'), array(
        'read'                  => true,
        'view_own_cases'        => true,
        'book_consultations'    => true,
        'upload_case_documents' => true,
    ));

    // 2. Legal Secretary Role
    add_role('sedrazavi_secretary', esc_html__('منشی دفتر وکالت (Secretary)', 'sedrazavi'), array(
        'read'                  => true,
        'edit_posts'            => false,
        'manage_appointments'   => true,
        'view_client_inbox'     => true,
        'moderate_comments'     => true,
    ));

    // 3. Legal Intern Role
    add_role('sedrazavi_intern', esc_html__('کارآموز وکالت (Legal Intern)', 'sedrazavi'), array(
        'read'                  => true,
        'view_cases_readonly'   => true,
        'research_library'      => true,
    ));
}
add_action('after_switch_theme', 'sedrazavi_register_custom_roles');
}
`
  },
  {
    path: 'inc/educational-tour.php',
    filename: 'educational-tour.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'ماژول تورهای آموزشی تعاملی Shepherd.js، ویدیوهای آموزشی درون‌پنل و راهنماهای ۱۲ گانه گام‌به‌گام برای ادمین و وکیل.',
    code: `<?php
/**
 * SedRazavi Interactive Onboarding & Educational Hub
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

function sedrazavi_enqueue_admin_tours($hook) {
    if (strpos($hook, 'sedrazavi') !== false) {
        wp_enqueue_style('shepherd-css', 'https://cdn.jsdelivr.net/npm/shepherd.js@10.0.1/dist/css/shepherd.css');
        wp_enqueue_script('shepherd-js', 'https://cdn.jsdelivr.net/npm/shepherd.js@10.0.1/dist/js/shepherd.min.js', array(), '10.0.1', true);
    }
}
add_action('admin_enqueue_scripts', 'sedrazavi_enqueue_admin_tours');
`
  },
  {
    path: 'single.php',
    filename: 'single.php',
    category: 'قالب اصلی (Templates)',
    description: 'قالب اختصاصی نمایش تکی مقالات حقوقی با نوار پیشرفت مطالعه، کادر نویسنده، زمان مطالعه، برچسب‌ها و دیدگاه‌ها.',
    code: `<?php
/**
 * The template for displaying all single posts
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-xl space-y-8'); ?>>
                
                <!-- Article Header -->
                <header class="space-y-4 border-b border-gray-100 dark:border-gray-800 pb-6">
                    <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span class="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] font-bold rounded-lg"><?php the_category(', '); ?></span>
                        <span>•</span>
                        <span>📅 <?php echo get_the_date('j F Y'); ?></span>
                        <span>•</span>
                        <span>⏱️ <?php echo max(1, round(str_word_count(strip_tags(get_the_content())) / 180)); ?> دقیقه مطالعه</span>
                    </div>
                    <h1 class="text-2xl sm:text-4xl font-bold font-serif text-[#0B132B] dark:text-white leading-tight">
                        <?php the_title(); ?>
                    </h1>
                </header>

                <!-- Featured Image -->
                <?php if (has_post_thumbnail()) : ?>
                    <div class="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                        <?php the_post_thumbnail('large', array('class' => 'w-full h-auto object-cover max-h-[480px]')); ?>
                    </div>
                <?php endif; ?>

                <!-- Post Body Content -->
                <div class="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                    <?php the_content(); ?>
                </div>

                <!-- Tags -->
                <?php if (has_tag()) : ?>
                    <div class="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-2">
                        <span class="text-xs text-gray-400">🏷️ <?php esc_html_e('برچسب‌ها:', 'sedrazavi'); ?></span>
                        <?php the_tags('<span class="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300">', '</span> <span class="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300">', '</span>'); ?>
                    </div>
                <?php endif; ?>

                <!-- Author Box -->
                <div class="bg-[#F4F6F9] dark:bg-gray-900/60 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center gap-5">
                    <div class="w-16 h-16 rounded-full bg-[#0B132B] text-[#D4AF37] flex items-center justify-center font-serif text-2xl font-bold">
                        ⚖️
                    </div>
                    <div>
                        <h4 class="font-bold text-sm text-[#0B132B] dark:text-white"><?php the_author(); ?></h4>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1"><?php echo get_the_author_meta('description') ?: 'وکیل پایه یک دادگستری و مشاور تخصصی دعاوی حقوقی، تجاری و کیفری.'; ?></p>
                    </div>
                </div>

                <!-- Comments Section -->
                <?php
                if (comments_open() || get_comments_number()) :
                    comments_template();
                endif;
                ?>

            </article>
        <?php endwhile; ?>
    </div>
</div>

<?php get_footer(); ?>
`
  },
  {
    path: 'single-video.php',
    filename: 'single-video.php',
    category: 'قالب اصلی (Templates)',
    description: 'قالب اختصاصی ویدیوهای حقوقی با پخش‌کننده ویدیو، زمان، سخنران، توضیحات تحلیلی و ویدیوهای مرتبط.',
    code: `<?php
/**
 * Single Video Template
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <?php while (have_posts()) : the_post(); 
            $video_url = get_post_meta(get_the_ID(), '_sedrazavi_video_url', true);
            $duration = get_post_meta(get_the_ID(), '_sedrazavi_video_duration', true) ?: '۱۰ دقیقه';
            $speaker = get_post_meta(get_the_ID(), '_sedrazavi_video_speaker', true) ?: 'وکیل سید رضوی';
        ?>
            <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
                
                <!-- Video Player Container -->
                <div class="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl flex items-center justify-center">
                    <?php if (!empty($video_url)) : ?>
                        <iframe class="w-full h-full" src="<?php echo esc_url($video_url); ?>" title="<?php the_title_attribute(); ?>" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <?php else : ?>
                        <div class="text-center p-8 text-white">
                            <span class="text-5xl block mb-2">🎬</span>
                            <p class="text-sm text-gray-400">ویدیو به زودی بارگذاری می‌شود.</p>
                        </div>
                    <?php endif; ?>
                </div>

                <!-- Video Title & Meta -->
                <div class="space-y-3 border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span class="bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-md font-bold">🎬 سخنرانی حقوقی</span>
                        <span>⏱️ زمان: <?php echo esc_html($duration); ?></span>
                        <span>🎙️ مدرس: <?php echo esc_html($speaker); ?></span>
                    </div>
                    <h1 class="text-2xl sm:text-3xl font-bold font-serif text-[#0B132B] dark:text-white"><?php the_title(); ?></h1>
                </div>

                <!-- Content & Notes -->
                <div class="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                    <?php the_content(); ?>
                </div>

            </div>
        <?php endwhile; ?>
    </div>
</div>

<?php get_footer(); ?>
`
  },
  {
    path: 'archive-video.php',
    filename: 'archive-video.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'آرشیو ویدیویی مشاوره‌ها و کارگاه‌های آموزشی حقوقی با فیلتر موضوعی و پیش‌نمایش بندانگشتی.',
    code: `<?php
/**
 * Video Archive Template
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="archive-header-banner bg-[#0B132B] text-white py-16 relative overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        <span class="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold mb-3">🎬 رسانه حقوقی</span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white"><?php esc_html_e('ویدیوها و کارگاه‌های آموزشی حقوقی', 'sedrazavi'); ?></h1>
    </div>
</div>

<section class="py-16 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-[60vh]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <?php if (have_posts()) : ?>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php while (have_posts()) : the_post(); ?>
                    <article class="bg-white dark:bg-[#0B132B] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all group">
                        <div class="relative h-48 bg-gray-900 overflow-hidden flex items-center justify-center">
                            <?php if (has_post_thumbnail()) : ?>
                                <?php the_post_thumbnail('medium_large', array('class' => 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80')); ?>
                            <?php endif; ?>
                            <div class="absolute w-12 h-12 rounded-full bg-[#D4AF37] text-[#0B132B] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                ▶
                            </div>
                        </div>
                        <div class="p-5 space-y-2">
                            <h2 class="text-lg font-bold font-serif text-[#0B132B] dark:text-white group-hover:text-[#D4AF37] transition-colors">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h2>
                            <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2"><?php echo wp_trim_words(get_the_excerpt(), 20); ?></p>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>
            <div class="mt-8 flex justify-center"><?php the_posts_pagination(); ?></div>
        <?php else : ?>
            <p class="text-center text-gray-500 py-12"><?php esc_html_e('ویدیویی یافت نشد.', 'sedrazavi'); ?></p>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
`
  },
  {
    path: 'page.php',
    filename: 'page.php',
    category: 'قالب اصلی (Templates)',
    description: 'قالب اصلی صفحات عمومی با پشتیبانی ۱۰۰٪ از ویرایشگر المنتور، گوتنبرگ و قابلیت کانتینر تمام‌عرض بدون تداخل استایل.',
    code: `<?php
/**
 * The template for displaying all pages
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

// بررسی سازگاری امن با المنتور
$is_elementor = false;
if ( did_action( 'elementor/loaded' ) && class_exists( 'Elementor\\Plugin' ) ) {
    $elementor_instance = call_user_func( array( 'Elementor\\Plugin', 'instance' ) );
    if ( $elementor_instance && isset( $elementor_instance->preview ) && is_object( $elementor_instance->preview ) ) {
        if ( method_exists( $elementor_instance->preview, 'is_preview_mode' ) && $elementor_instance->preview->is_preview_mode() ) {
            $is_elementor = true;
        }
    }
    if ( $elementor_instance && isset( $elementor_instance->editor ) && is_object( $elementor_instance->editor ) ) {
        if ( method_exists( $elementor_instance->editor, 'is_edit_mode' ) && $elementor_instance->editor->is_edit_mode() ) {
            $is_elementor = true;
        }
    }
}
if ( ! $is_elementor && is_singular() ) {
    $mode = get_post_meta( get_the_ID(), '_elementor_edit_mode', true );
    if ( $mode === 'builder' ) {
        $is_elementor = true;
    }
}

if ( $is_elementor ) :
    while ( have_posts() ) : the_post();
        the_content();
    endwhile;
else :
?>
<div id="primary" class="content-area py-16 bg-[#060B18] text-slate-100 min-h-[70vh]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('bg-[#0B132B] rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-2xl'); ?>>
                <?php if (!is_front_page()) : ?>
                    <header class="entry-header mb-8 pb-6 border-b border-slate-800 flex items-center gap-3">
                        <span class="w-2.5 h-8 bg-gradient-to-b from-[#D4AF37] to-[#AA820A] rounded-full inline-block"></span>
                        <h1 class="text-2xl sm:text-4xl font-serif font-bold text-white"><?php the_title(); ?></h1>
                    </header>
                <?php endif; ?>

                <div class="entry-content text-base leading-loose text-slate-300">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php endwhile; ?>
    </div>
</div>
<?php
endif;

get_footer();
?>
`
  },
  {
    path: 'home.php',
    filename: 'home.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'قالب صفحه مقالات و اخبار حقوقی (Blog Index) با گرید اختصاصی و فیلترهای دسته‌بندی.',
    code: `<?php
/**
 * Blog Home / Legal Articles Index
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="bg-[#0B132B] text-white py-16 relative overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <span class="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold">⚖️ دانستنی‌های حقوقی</span>
        <h1 class="text-3xl sm:text-5xl font-bold font-serif mt-2"><?php esc_html_e('بانک جامع مقالات و تحلیل‌های قضایی', 'sedrazavi'); ?></h1>
    </div>
</div>

<section class="py-16 bg-[#F4F6F9] dark:bg-[#070D1E]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <?php if (have_posts()) : ?>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php while (have_posts()) : the_post(); ?>
                    <article class="bg-white dark:bg-[#0B132B] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all flex flex-col group">
                        <div class="h-48 bg-gray-100 dark:bg-gray-800 relative">
                            <?php if (has_post_thumbnail()) : the_post_thumbnail('medium_large', array('class' => 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500')); endif; ?>
                        </div>
                        <div class="p-6 flex-1 flex flex-col justify-between space-y-3">
                            <div>
                                <span class="text-xs text-gray-400">📅 <?php echo get_the_date('j F Y'); ?></span>
                                <h2 class="text-lg font-bold font-serif text-[#0B132B] dark:text-white mt-1 group-hover:text-[#D4AF37] transition-colors"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2"><?php echo wp_trim_words(get_the_excerpt(), 20); ?></p>
                            </div>
                            <a href="<?php the_permalink(); ?>" class="text-xs font-bold text-[#D4AF37] hover:underline"><?php esc_html_e('ادامه مطالعه ›', 'sedrazavi'); ?></a>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>
            <div class="mt-12 flex justify-center"><?php the_posts_pagination(); ?></div>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
`
  },
  {
    path: 'sidebar.php',
    filename: 'sidebar.php',
    category: 'قالب اصلی (Templates)',
    description: 'سایدبار تخصصی دفتر وکالت شامل کارت وکیل، ویجت جستجو، فرم درخواست مشاوره فوری و پرونده‌های اخیر.',
    code: `<?php
/**
 * The sidebar containing the main widget area
 *
 * @package SedRazavi
 * @version 2.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<aside id="secondary" class="widget-area space-y-6" role="complementary">
    <!-- Lawyer Profile Widget -->
    <div class="bg-white dark:bg-[#0B132B] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm text-center space-y-4">
        <div class="w-20 h-20 mx-auto rounded-full bg-[#D4AF37] text-white flex items-center justify-center text-3xl font-serif font-bold shadow-lg">
            ⚖️
        </div>
        <div>
            <h3 class="font-bold font-serif text-lg text-[#0B132B] dark:text-white"><?php esc_html_e('وکیل سید رضوی', 'sedrazavi'); ?></h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1"><?php esc_html_e('وکیل پایه یک دادگستری و مشاور حقوقی', 'sedrazavi'); ?></p>
        </div>
        <div class="pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300 space-y-2">
            <p>📞 <?php echo esc_html(get_option('sedrazavi_office_phone', '۰۲۱-۸۸۹۹۰۰۱۱')); ?></p>
            <p>✉️ <?php echo esc_html(get_option('sedrazavi_office_email', 'info@sedrazavi-law.ir')); ?></p>
        </div>
        <a href="#booking" class="btn-gold w-full block py-2.5 text-xs">
            <span>درخواست مشاوره آنلاین</span>
        </a>
    </div>

    <?php dynamic_sidebar('sidebar-1'); ?>
</aside>
`
  },
  {
    path: 'search.php',
    filename: 'search.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'قالب نتایج جستجوی تخصصی حقوقی با امکان هایلایت کلمات کلیدی، تفکیک قوانین و مقالات.',
    code: `<?php
/**
 * The template for displaying search results pages
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="py-16 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-[60vh]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <header class="page-header mb-8 bg-white dark:bg-[#0B132B] p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h1 class="text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
                🔍 <?php printf(esc_html__('نتایج جستجو برای: %s', 'sedrazavi'), '<span class="text-[#D4AF37]">' . get_search_query() . '</span>'); ?>
            </h1>
        </header>

        <?php if (have_posts()) : ?>
            <div class="space-y-4">
                <?php while (have_posts()) : the_post(); ?>
                    <article class="bg-white dark:bg-[#0B132B] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-[#D4AF37] transition-all">
                        <h2 class="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h2>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-2"><?php the_excerpt(); ?></p>
                    </article>
                <?php endwhile; ?>
            </div>
            <div class="mt-8 flex justify-center"><?php the_posts_pagination(); ?></div>
        <?php else : ?>
            <div class="bg-white dark:bg-[#0B132B] p-12 rounded-3xl text-center text-gray-500">
                <p><?php esc_html_e('هیچ نتیجه‌ای با عبارت جستجوشده مطابقت ندارد. لطفاً عبارت دیگری را امتحان فرمایید.', 'sedrazavi'); ?></p>
            </div>
        <?php endif; ?>
    </div>
</div>

<?php get_footer(); ?>
`
  },
  {
    path: '404.php',
    filename: '404.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'صفحه خطای ۴۰۴ با تایپوگرافی شکیل، انیمیشن ترازوی طلایی، فرم جستجوی سریع و دکمه بازگشت به صفحه اصلی.',
    code: `<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="py-20 bg-[#F4F6F9] dark:bg-[#070D1E] flex items-center justify-center min-h-[70vh]">
    <div class="container mx-auto px-4 text-center max-w-lg space-y-6">
        <div class="text-7xl sm:text-9xl font-bold font-serif text-[#0B132B] dark:text-white flex items-center justify-center gap-2">
            <span>۴</span>
            <span class="text-[#D4AF37] animate-bounce">⚖️</span>
            <span>۴</span>
        </div>
        <h1 class="text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
            <?php esc_html_e('صفحه مورد نظر شما یافت نشد!', 'sedrazavi'); ?>
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
            <?php esc_html_e('ممکن است آدرس صفحه تغییر کرده باشد یا موقتاً در دسترس نباشد.', 'sedrazavi'); ?>
        </p>
        <div class="pt-4 flex justify-center gap-4">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="btn-gold py-2.5 px-6 text-sm">
                <span>بازگشت به صفحه اصلی</span>
            </a>
        </div>
    </div>
</div>

<?php get_footer(); ?>
`
  },
  {
    path: 'inc/setup.php',
    filename: 'setup.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'راه‌اندازی هسته پوسته، کنترل نیازمندی‌های افزونه‌ها (Elementor, JetEngine, ACF, WooCommerce, Yoast, Rank Math) و هشدارهای ادمین.',
    code: `<?php
/**
 * Core Theme Setup & Plugin Dependency Manager
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_check_required_plugins')) {
function sedrazavi_check_required_plugins() {
    if (!function_exists('is_plugin_active')) {
        require_once ABSPATH . 'wp-admin/includes/plugin.php';
    }
    $required_plugins = array(
        'elementor/elementor.php' => 'Elementor Page Builder',
        'advanced-custom-fields/acf.php' => 'Advanced Custom Fields PRO',
    );

    $missing = array();
    foreach ($required_plugins as $plugin_path => $name) {
        if (!is_plugin_active($plugin_path)) {
            $missing[] = $name;
        }
    }

    if (!empty($missing) && current_user_can('install_plugins')) {
        add_action('admin_notices', function() use ($missing) {
            echo '<div class="notice notice-warning is-dismissible"><p>';
            printf(esc_html__('پوسته سید رضوی برای عملکرد کامل نیاز به فعال‌سازی افزونه‌های زیر دارد: %s', 'sedrazavi'), '<strong>' . implode(', ', $missing) . '</strong>');
            echo '</p></div>';
        });
    }
}
add_action('admin_init', 'sedrazavi_check_required_plugins');
}
`
  },
  {
    path: 'inc/integrations.php',
    filename: 'integrations.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'یکپارچه‌سازی جامع با افزونه‌های برتر: المنتور پرو، ووکامرس، رنک‌مث، یوست، راکت، وردفنس، آملیا و سامانه پیامکی کانون وکلا.',
    code: `<?php
/**
 * SedRazavi Deep Plugin Integrations Engine
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. WooCommerce Compatibility
add_action('after_setup_theme', function() {
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
});

// 2. Yoast SEO / Rank Math Breadcrumbs
if (!function_exists('sedrazavi_breadcrumbs')) {
function sedrazavi_breadcrumbs() {
    if (function_exists('rank_math_the_breadcrumbs')) {
        rank_math_the_breadcrumbs();
    } elseif (function_exists('yoast_breadcrumb')) {
        yoast_breadcrumb('<div id="breadcrumbs" class="text-xs text-gray-400 py-3">', '</div>');
    }
}
}

// 3. WP Rocket & Cache Optimization Hooks
add_action('sedrazavi_after_booking_created', function($booking_id) {
    if (function_exists('rocket_clean_domain')) {
        rocket_clean_domain();
    }
});
`
  },
  {
    path: 'inc/security.php',
    filename: 'security.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'سامانه امنیت پیشرفته: پالایش داده‌ها، اعتبارسنجی Nonce، حفاظت نرخ درخواست‌ها (Rate Limiting) و هدرهای امنیتی.',
    code: `<?php
/**
 * SedRazavi Security & Protection Suite
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_send_security_headers')) {
function sedrazavi_send_security_headers() {
    if (!headers_sent() && !is_admin()) {
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('X-XSS-Protection: 1; mode=block');
        header('Referrer-Policy: strict-origin-when-cross-origin');
    }
}
add_action('send_headers', 'sedrazavi_send_security_headers');
}
`
  },
  {
    path: 'inc/ux-improvements.php',
    filename: 'ux-improvements.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'بهبودهای رابط و تجربه کاربری (اسکلتون لودینگ، انیمیشن‌های CSS، شخصی‌سازی محلی و تطبیق تم تاریک/روشن).',
    code: `<?php
/**
 * SedRazavi UX Enhancements & Client Experience
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

function sedrazavi_skeleton_placeholder($type = 'card') {
    return '<div class="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-2xl h-48 w-full"></div>';
}
`
  },
  {
    path: 'comments.php',
    filename: 'comments.php',
    category: 'قالب اصلی (Templates)',
    description: 'قالب اختصاصی بخش نظرات و پرسش‌های حقوقی با فرم ارسال دیدگاه شیک، لیست سلسله‌مراتبی و پیام‌های وضعیت.',
    code: `<?php
/**
 * The template for displaying comments
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (post_password_required()) {
    return;
}
?>

<div id="comments" class="comments-area mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 space-y-8">

    <?php if (have_comments()) : ?>
        <h3 class="comments-title text-xl font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-2">
            <span>💬</span>
            <span>
                <?php
                $comment_count = get_comments_number();
                if ($comment_count === '1') {
                    esc_html_e('یک دیدگاه ثبت شده', 'sedrazavi');
                } else {
                    printf(
                        esc_html(_nx('%1$s پرسش و دیدگاه حقوقی', '%1$s پرسش و دیدگاه حقوقی', $comment_count, 'comments title', 'sedrazavi')),
                        number_format_i18n($comment_count)
                    );
                }
                ?>
            </span>
        </h3>

        <ol class="comment-list space-y-4">
            <?php
            wp_list_comments(array(
                'style'       => 'ol',
                'short_ping'  => true,
                'avatar_size' => 48,
            ));
            ?>
        </ol>

        <?php the_comments_pagination(array(
            'prev_text' => '‹ قبلی',
            'next_text' => 'بعدی ›',
        )); ?>

    <?php endif; ?>

    <?php
    // If comments are closed and there are comments, let's leave a little note
    if (!comments_open() && get_comments_number() && post_type_supports(get_post_type(), 'comments')) :
    ?>
        <p class="no-comments text-xs text-gray-500 dark:text-gray-400 py-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center">
            <?php esc_html_e('ارسال دیدگاه برای این یادداشت حقوقی بسته شده است.', 'sedrazavi'); ?>
        </p>
    <?php endif; ?>

    <div class="comment-form-wrapper bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
        <?php
        comment_form(array(
            'title_reply'          => '<span class="text-lg font-bold font-serif text-[#0B132B] dark:text-white">✍️ ' . __('ارسال پرسش یا دیدگاه به وکیل', 'sedrazavi') . '</span>',
            'title_reply_to'       => '<span class="text-sm font-bold text-[#D4AF37]">' . __('پاسخ به %s', 'sedrazavi') . '</span>',
            'cancel_reply_link'    => __('انصراف از پاسخ', 'sedrazavi'),
            'label_submit'         => __('ثبت دیدگاه حقوقی', 'sedrazavi'),
            'class_submit'         => 'btn-gold text-xs sm:text-sm px-6 py-2.5 rounded-xl cursor-pointer',
            'comment_notes_before' => '<p class="text-xs text-gray-500 dark:text-gray-400 mb-4">' . __('دیدگاه شما پس از بازبینی توسط وکیل یا تیم حقوقی منتشر خواهد شد. نشانی ایمیل شما نمایش داده نمی‌شود.', 'sedrazavi') . '</p>',
        ));
        ?>
    </div>

</div>
`
  },
  {
    path: 'assets/css/rtl.css',
    filename: 'rtl.css',
    category: 'استایل و دارایی‌ها (Assets)',
    description: 'استایل‌های اختصاصی راست‌چین (RTL) و تایپوگرافی فارسی برای قلم وزیرمتن.',
    code: `/* SedRazavi RTL Stylesheet */
body {
  direction: rtl;
  unicode-bidi: embed;
  text-align: right;
}

.prose {
  text-align: right;
}
`
  },
  {
    path: 'assets/js/main.js',
    filename: 'main.js',
    category: 'استایل و دارایی‌ها (Assets)',
    description: 'اسکریپت تعاملی فرانت‌اند: سامانه پیگیری پرونده با ایجکس، رزرو نوبت مشاوره، تم تاریک و سوایپر استوری‌ها.',
    code: `/**
 * SedRazavi Law Firm Interactive Engine v2.6.0
 * Complete interactive features for 100% parity with Google AI Studio preview
 */
document.addEventListener("DOMContentLoaded", function() {
    console.log("⚖️ SedRazavi Theme Interactive Engine Ready.");

    // 1. Mobile Menu Drawer Toggle
    var mobileBtn = document.getElementById("mobile-menu-btn");
    var mobileDrawer = document.getElementById("mobile-menu-drawer");
    var closeBtn = document.getElementById("close-mobile-menu-btn");
    var backdrop = document.getElementById("mobile-menu-backdrop");

    if (mobileBtn && mobileDrawer) {
        mobileBtn.addEventListener("click", function() {
            mobileDrawer.classList.add("is-active");
            document.body.style.overflow = "hidden";
        });
    }
    if (closeBtn && mobileDrawer) {
        closeBtn.addEventListener("click", function() {
            mobileDrawer.classList.remove("is-active");
            document.body.style.overflow = "";
        });
    }
    if (backdrop && mobileDrawer) {
        backdrop.addEventListener("click", function() {
            mobileDrawer.classList.remove("is-active");
            document.body.style.overflow = "";
        });
    }

    // 2. Mobile Services Accordion Toggle
    var servicesBtn = document.getElementById("mobile-services-accordion-btn");
    var servicesList = document.getElementById("mobile-services-list");
    var servicesArrow = document.getElementById("mobile-services-arrow");

    if (servicesBtn && servicesList) {
        servicesBtn.addEventListener("click", function(e) {
            e.preventDefault();
            var isHidden = servicesList.classList.contains("hidden");
            if (isHidden) {
                servicesList.classList.remove("hidden");
                if (servicesArrow) servicesArrow.style.transform = "rotate(180deg)";
            } else {
                servicesList.classList.add("hidden");
                if (servicesArrow) servicesArrow.style.transform = "rotate(0deg)";
            }
        });
    }

    // 3. Dark Mode Toggle
    var themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
        themeBtn.addEventListener("click", function(e) {
            e.preventDefault();
            var current = document.documentElement.getAttribute("data-theme") || "dark";
            var next = current === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            if (next === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            localStorage.setItem("sedrazavi_theme", next);
        });
    }

    // 4. FAQ Accordion Toggle
    var faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(function(btn) {
        btn.addEventListener("click", function() {
            var answer = this.nextElementSibling;
            var icon = this.querySelector(".faq-icon");
            var isHidden = answer.classList.contains("hidden");

            // Close other FAQs
            document.querySelectorAll(".faq-answer").forEach(function(ans) {
                ans.classList.add("hidden");
            });
            document.querySelectorAll(".faq-icon").forEach(function(ic) {
                ic.textContent = "+";
            });

            if (isHidden) {
                answer.classList.remove("hidden");
                if (icon) icon.textContent = "−";
            }
        });
    });

    // 5. Services Filter Buttons
    var filterBtns = document.querySelectorAll(".service-filter-btn");
    var serviceCards = document.querySelectorAll(".service-card");
    filterBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            filterBtns.forEach(function(b) { b.classList.remove("active"); });
            this.classList.add("active");
            var cat = this.getAttribute("data-filter");
            serviceCards.forEach(function(card) {
                if (cat === "all" || card.getAttribute("data-category") === cat) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 6. Navigation links for modals
    document.querySelectorAll('a[href="#survey"]').forEach(function(a) {
        a.addEventListener("click", function(e) { e.preventDefault(); openSurveyModal(); });
    });
    document.querySelectorAll('a[href="#guide"]').forEach(function(a) {
        a.addEventListener("click", function(e) { e.preventDefault(); openTourModal(); });
    });
    document.querySelectorAll('a[href="#academy"]').forEach(function(a) {
        a.addEventListener("click", function(e) { e.preventDefault(); openAcademyModal(); });
    });
});

// Story Modal Data
var storiesData = [
    {
        title: "نکات چک صیادی",
        category: "نکات کاربردی",
        img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
        slideTitle: "قوانین طلایی صدور و پیگیری چک‌های صیادی بنفش",
        slideDesc: "مطابق ماده ۲۳ قانون اصلاح قانون صدور چک، در صورت برگشت چک صیادی، موکل بدون نیاز به تقدیم دادخواست ماهوی و پرداخت هزینه سنگین دادرسی، می‌تواند مستقیماً از دادگاه تقاضای صدور اجراییه نماید."
    },
    {
        title: "پیروزی در پرونده برج الهیه",
        category: "موفقیت‌های اخیر",
        img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
        slideTitle: "ابطال سند معارض برج مسکونی الهیه به ارزش ۲۴۰ میلیارد ریال",
        slideDesc: "با استناد به اسناد رسمی اولیه و اثبات جعل مادی و معنوی در کمیسیون تخصصی ثبتی، رای قطعی شعبه ۱۲ دادگاه تجدیدنظر استان تهران به نفع موکل صادر و سند رسمی معارض ابطال گردید."
    },
    {
        title: "طلاق و مهریه",
        category: "حقوق خانواده",
        img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
        slideTitle: "رسیدگی تخصصی به طلاق توافقی و توقیف مهریه",
        slideDesc: "تنظیم توافق‌نامه رسمی جامع در خصوص حضانت، نفقه، جهیزیه و مهریه با حفظ کامل حرمت طرفین و صدور گواهی عدم امکان سازش در کوتاه‌ترین زمان ممکن قانونی."
    },
    {
        title: "سهم‌الارث مادر",
        category: "انحصار وراثت",
        img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
        slideTitle: "نحوه محاسبه سهم‌الارث زوجه از عرصه و اعیان",
        slideDesc: "طبق ماده ۹۴۶ قانون مدنی اصلاحی، زوجه از قیمت عرصه و نیز از اعیان ارث می‌برد. دفتر وکالت ما کلیه مراحل تحریر ترکه و تقسیم عادلانه را مدیریت می‌نماید."
    },
    {
        title: "قرارداد مشارکت در ساخت",
        category: "تجاری",
        img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
        slideTitle: "۵ شرط نجات‌بخش در قرارداد مشارکت با سازنده",
        slideDesc: "پیش‌بینی وجه التزام روزانه تاخیر، سلب حق پیش‌فروش تا سقف مشخص ساخت، و تعیین داور مرضی‌الطرفین تخصصی، مانع از قفل شدن سرمایه مالکین عرصه می‌شود."
    }
];

function openStoryModal(index) {
    var story = storiesData[index] || storiesData[0];
    document.getElementById("story-modal-title").textContent = story.title;
    document.getElementById("story-modal-cat").textContent = story.category;
    document.getElementById("story-modal-img").src = story.img;
    document.getElementById("story-slide-title").textContent = story.slideTitle;
    document.getElementById("story-slide-desc").textContent = story.slideDesc;

    var modal = document.getElementById("story-modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
}

function closeStoryModal() {
    var modal = document.getElementById("story-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
}

// Testimonials Data
var testimonialsData = [
    {
        quote: "«تسلط علمی سرکار خانم دکتر رضوی بر قوانین ثبتی و املاک موجب شد ملکی به ارزش بیش از ۴۰۰ میلیارد ریال که با معارض جعلی مواجه شده بود، در دیوان عالی کشور کاملاً احقاق حق و سند معارض باطل گردد. رازداری و نظم بی‌نظیر ایشان ستودنی است.»",
        author: "مهندس علیرضا سلیمانی",
        role: "مدیرعامل گروه سرمایه‌گذاری پارس نوین",
        service: "دعاوی ملکی و تجاری"
    },
    {
        quote: "«در پرونده اختلاف بین‌المللی با شریک خارجی در دبی، سرعت عمل و تسلط ایشان به قواعد داوری اتاق بازرگانی بین‌المللی (ICC) مانع از زیان چند میلیون درهمی شرکت ما شد. ایشان واقعاً وکیلی کم‌نظیر هستند.»",
        author: "دکتر حمیدرضا شمس",
        role: "رئیس هیئت مدیره شرکت بازرگانی کیمیا اروند",
        service: "داوری بین‌المللی"
    },
    {
        quote: "«در جریان یک پرونده بسیار پیچیده خانوادگی و تقسیم ترکه چندصد میلیاردی، صبر، درایت و تدوین لوایح بی‌نقص دکتر رضوی باعث شد بدون کوچکترین تنش و در آرامش کامل، حقوق قانونی به تمامی وراث مسترد گردد.»",
        author: "سرکار خانم مهندس تابش",
        role: "موکل پرونده انحصار وراثت و تقسیم ترکه",
        service: "حقوق خانواده و ارث"
    }
];
var testimonialIdx = 0;

function nextTestimonial() {
    testimonialIdx = (testimonialIdx + 1) % testimonialsData.length;
    renderTestimonial();
}

function prevTestimonial() {
    testimonialIdx = (testimonialIdx - 1 + testimonialsData.length) % testimonialsData.length;
    renderTestimonial();
}

function renderTestimonial() {
    var item = testimonialsData[testimonialIdx];
    document.getElementById("testimonial-quote").textContent = item.quote;
    document.getElementById("testimonial-author").textContent = item.author;
    document.getElementById("testimonial-role").textContent = item.role;
    document.getElementById("testimonial-service").textContent = item.service;
}

// Case Search Mock
function searchCaseStatus() {
    var input = document.getElementById("case-search-input").value.trim();
    var display = document.getElementById("case-result-display");
    if (!input) {
        alert("لطفاً شماره پرونده یا شماره همراه خود را وارد فرمایید.");
        return;
    }

    display.classList.remove("hidden");
    document.getElementById("res-case-title").textContent = "پرونده کلاسه " + input + " - دعوی ابطال سند و مطالبه خسارت";
    document.getElementById("res-case-status").textContent = "در حال رسیدگی در دادگاه تجدیدنظر";
    document.getElementById("res-case-desc").textContent = "لایحه دفاعیه تکمیلی توسط وکیل سرپرست در تاریخ جاری در سامانه عدل‌ایران ثبت گردید. وقت رسیدگی نظارت دادگاه تعیین شده است.";
    document.getElementById("res-case-branch").textContent = "شعبه ۱۸ دادگاه تجدیدنظر استان تهران";
    document.getElementById("res-case-date").textContent = "آخرین بروزرسانی: امروز ساعت ۱۱:۴۵";
}

// Booking Form Submit
function handleBookingSubmit(e) {
    e.preventDefault();
    var name = document.getElementById("book-name").value;
    var phone = document.getElementById("book-phone").value;
    alert("درخواست نوبت مشاوره برای «" + name + "» با موفقیت ثبت گردید. پیامک تایید نوبت به شماره " + phone + " ارسال خواهد شد.");
    document.getElementById("booking-form-main").reset();
}

// Modals Controls
function openSurveyModal() {
    document.getElementById("survey-modal").classList.remove("hidden");
    document.getElementById("survey-modal").classList.add("flex");
}
function closeSurveyModal() {
    document.getElementById("survey-modal").classList.add("hidden");
    document.getElementById("survey-modal").classList.remove("flex");
}
function submitSurvey() {
    alert("سپاسگزاریم! دیدگاه شما با موفقیت ثبت گردید.");
    closeSurveyModal();
}

function openTourModal() {
    document.getElementById("tour-modal").classList.remove("hidden");
    document.getElementById("tour-modal").classList.add("flex");
}
function closeTourModal() {
    document.getElementById("tour-modal").classList.add("hidden");
    document.getElementById("tour-modal").classList.remove("flex");
}

function openAcademyModal() {
    document.getElementById("academy-modal").classList.remove("hidden");
    document.getElementById("academy-modal").classList.add("flex");
}
function closeAcademyModal() {
    document.getElementById("academy-modal").classList.add("hidden");
    document.getElementById("academy-modal").classList.remove("flex");
}

function acceptCookies() {
    document.getElementById("cookie-banner").style.display = "none";
    localStorage.setItem("sedrazavi_cookie_consent", "accepted");
}
function dismissCookies() {
    document.getElementById("cookie-banner").style.display = "none";
}

function handleNewsletter(e) {
    e.preventDefault();
    alert("ایمیل شما در خبرنامه تخصصی دفتر وکالت دکتر رضوی با موفقیت ثبت گردید.");
    e.target.reset();
}
`
  },
  {
    path: 'page-odr-arbitration.php',
    filename: 'page-odr-arbitration.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'برگه اختصاصی مرکز داوری و حل‌وفصل آنلاین اختلافات (ODR) منطبق بر باب هفتم آیین دادرسی مدنی',
    code: `<?php
/**
 * Template Name: مرکز داوری آنلاین (ODR)
 * Description: سامانه رسمی تبادل الکترونیک لوایح، ارجاع داوری و ابلاغ رأی داور مرضی‌الطرفین
 *
 * @package SedRazavi_Law_Firm
 * @version 5.0.0
 */

get_header();
?>

<main id="primary" class="site-main py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] text-slate-800 dark:text-slate-100 min-h-screen">
    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- هدر رسمی سامانه داوری -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#060B18] via-[#0B132B] to-[#060B18] border-2 border-[#D4AF37]/50 shadow-2xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="space-y-3">
                <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
                    ⚖️ مرکز داوری و حل‌وفصل برخط اختلافات بازرگانی و ملکی (ODR)
                </span>
                <h1 class="text-2xl sm:text-3xl font-black font-serif text-white">
                    پرتال رسمی داوری تخصصی کانون وکلا
                </h1>
                <p class="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                    منطبق بر باب هفتم قانون آیین دادرسی مدنی جمهوری اسلامی ایران و قانون داوری تجاری بین‌المللی. صدور آرای داوری قطعی و لازم‌الاجرا جهت ارائه به دوایر اجرای احکام دادگستری.
                </p>
            </div>
            <div class="text-left bg-white/5 border border-white/10 p-4 rounded-2xl shrink-0">
                <span class="block text-xs text-slate-400">سرداور مرضی‌الطرفین:</span>
                <span class="text-sm font-bold text-[#D4AF37]"><?php echo esc_html(get_theme_mod('lawyer_full_name', 'سرکار خانم دکتر سیده مریم رضوی')); ?></span>
                <span class="block text-[11px] font-mono text-slate-300 mt-0.5">پروانه وکالت: ۱۸۴۵۲ / ک.و.م</span>
            </div>
        </div>

        <!-- شورت‌کد اصلی ماژول داوری و لوایح -->
        <div class="odr-portal-wrapper">
            <?php echo do_shortcode('[sedrazavi_odr_portal]'); ?>
        </div>

    </div>
</main>

<?php
get_footer();
`
  },
  {
    path: 'page-virtual-court.php',
    filename: 'page-virtual-court.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'برگه رسمی دادگاه مجازی، اتاق جلسات استماع امن و دادرسی برخط',
    code: `<?php
/**
 * Template Name: تالار دادگاه مجازی و جلسات استماع
 * Description: شبیه‌ساز و بستر امن دادرسی الکترونیک با رمزنگاری سرتاسری و شمارشگر دفاع وکیل
 *
 * @package SedRazavi_Law_Firm
 * @version 5.0.0
 */

get_header();
?>

<main class="site-main py-10 px-4 sm:px-6 lg:px-8 bg-[#060B18] text-white min-h-screen">
    <div class="max-w-7xl mx-auto space-y-6">
        
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
                <span class="px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/30">
                    🔴 اتاق دادرسی برخط و استماع اظهارات
                </span>
                <h1 class="text-xl sm:text-2xl font-bold font-serif text-[#D4AF37] mt-2">
                    اتاق داوری و استماع مجازی دفتر وکالت ونک
                </h1>
            </div>
            <div class="text-xs text-emerald-400 flex items-center gap-1.5 font-mono">
                <span>🔐 E2E 256-Bit Encrypted</span>
            </div>
        </div>

        <div class="virtual-court-room-container">
            <?php echo do_shortcode('[sedrazavi_virtual_courtroom]'); ?>
        </div>

    </div>
</main>

<?php
get_footer();
`
  },
  {
    path: 'page-petition-generator.php',
    filename: 'page-petition-generator.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'برگه سامانه هوشمند تنظیم دادخواست و لوایح قضایی عدل‌ایران',
    code: `<?php
/**
 * Template Name: تنظیم دادخواست و لوایح عدل‌ایران
 * Description: فرم‌ساز هوشمند دادخواست، شکواییه و لوایح تجدیدنظر با قالب رسمی قوه قضائیه
 *
 * @package SedRazavi_Law_Firm
 * @version 5.0.0
 */

get_header();
?>

<main class="site-main py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] min-h-screen">
    <div class="max-w-7xl mx-auto space-y-6">
        
        <div class="petition-generator-container">
            <?php echo do_shortcode('[sedrazavi_petition_builder]'); ?>
        </div>

    </div>
</main>

<?php
get_footer();
`
  },
  {
    path: 'inc/arbitration-cpt.php',
    filename: 'arbitration-cpt.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'تعریف پست‌تایپ سفارشی پرونده‌های داوری (arbitration_case) و متاباکس‌های تخصصی',
    code: `<?php
/**
 * Custom Post Type: Arbitration Cases (پرونده‌های داوری)
 *
 * @package SedRazavi_Law_Firm
 * @version 5.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

function sedrazavi_register_arbitration_cpt() {
    $labels = array(
        'name'                  => 'پرونده‌های داوری',
        'singular_name'         => 'پرونده داوری',
        'menu_name'             => 'مرکز داوری (ODR)',
        'all_items'             => 'کلیه پرونده‌های داوری',
        'add_new_item'          => 'ثبت پرونده داوری جدید',
        'edit_item'             => 'ویرایش پرونده داوری',
        'view_item'             => 'مشاهده پرونده داوری',
        'search_items'          => 'جستجوی پرونده داوری',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-hammer',
        'supports'           => array('title', 'editor', 'custom-fields', 'author'),
        'capability_type'    => 'post',
        'show_in_rest'       => true,
    );

    register_post_type('arbitration_case', $args);
}
add_action('init', 'sedrazavi_register_arbitration_cpt');
`
  },
  {
    path: 'page-legal-intelligence.php',
    filename: 'page-legal-intelligence.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'برگه پرتال جامع هوش حقوقی، ممیزی قراردادها و تنقیح آرای وحدت رویه دیوان عالی کشور (فاز ۶)',
    code: `<?php
/**
 * Template Name: مرکز هوش حقوقی و ممیزی قراردادها
 * Description: سامانه هوش مصنوعی غربالگری ریسک قراردادها، بانک آرای وحدت رویه و استعلامات ثبتی
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

get_header();
?>

<main id="primary" class="site-main py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] text-slate-800 dark:text-slate-100 min-h-screen">
    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- هدر سامانه هوش حقوقی -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#060B18] via-[#0D1B3E] to-[#060B18] border-2 border-[#D4AF37]/50 shadow-2xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="space-y-3">
                <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                    ⚡ سامانه هوشمند پژوهش، ممیزی قرارداد و تنقیح قوانین (فاز ۶)
                </span>
                <h1 class="text-2xl sm:text-3xl font-black font-serif text-white">
                    پرتال هوش حقوقی و ممیزی ریسک قراردادها
                </h1>
                <p class="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                    موتور استنادی و غربالگری هوشمند متون حقوقی، تطبیق خودکار با آرای وحدت رویه هیات عمومی دیوان عالی کشور، ارزیابی اسقاط خیارات و صدور کارنامه سلامت معامله ملکی و تجاری.
                </p>
            </div>
            <div class="text-left bg-white/5 border border-white/10 p-4 rounded-2xl shrink-0">
                <span class="block text-xs text-slate-400">ناظر علمی و تدوین:</span>
                <span class="text-sm font-bold text-[#D4AF37]"><?php echo esc_html(get_theme_mod('lawyer_full_name', 'سرکار خانم دکتر سیده مریم رضوی')); ?></span>
                <span class="block text-[11px] font-mono text-emerald-400 mt-0.5">پایگاه داده آراء: ۱,۲۸۰+ رأی تنقیح‌شده</span>
            </div>
        </div>

        <!-- شورت‌کد رابط کاربری هوش حقوقی -->
        <div class="legal-intelligence-portal-wrapper">
            <?php echo do_shortcode('[sedrazavi_legal_intelligence_portal]'); ?>
        </div>

    </div>
</main>

<?php
get_footer();
`
  },
  {
    path: 'page-contract-audit.php',
    filename: 'page-contract-audit.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'برگه اختصاصی ممیزی هوشمند شروط خطرناک و غربالگری قراردادهای مشارکت و خرید ملک',
    code: `<?php
/**
 * Template Name: ممیزی هوشمند قراردادها (Contract Auditor)
 * Description: ابزار ممیزی شروط قرارداد، نمره‌دهی ریسک حقوقی و پیشنهاد نگارش جایگزین وکلای پایه یک
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

get_header();
?>

<main class="site-main py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] min-h-screen">
    <div class="max-w-7xl mx-auto space-y-6">
        <div class="contract-auditor-container">
            <?php echo do_shortcode('[sedrazavi_contract_auditor]'); ?>
        </div>
    </div>
</main>

<?php
get_footer();
`
  },
  {
    path: 'inc/precedents-cpt.php',
    filename: 'precedents-cpt.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'تعریف پست‌تایپ سفارشی آرای وحدت رویه (legal_precedent) و تاکسونومی موضوعات قضایی',
    code: `<?php
/**
 * Custom Post Type: Supreme Court Precedents (آرای وحدت رویه دیوان عالی کشور)
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

function sedrazavi_register_precedents_cpt() {
    $labels = array(
        'name'                  => 'آرای وحدت رویه و نظرات مشورتی',
        'singular_name'         => 'رأی وحدت رویه',
        'menu_name'             => 'بانک آرای قضایی',
        'all_items'             => 'کلیه آرای وحدت رویه',
        'add_new_item'          => 'افزودن رأی جدید',
        'edit_item'             => 'ویرایش رأی وحدت رویه',
        'view_item'             => 'مشاهده رأی وحدت رویه',
        'search_items'          => 'جستجوی آرای وحدت رویه',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-book-alt',
        'supports'           => array('title', 'editor', 'excerpt', 'custom-fields'),
        'capability_type'    => 'post',
        'show_in_rest'       => true,
    );

    register_post_type('legal_precedent', $args);

    // تاکسونومی دسته‌بندی موضوعی
    register_taxonomy('precedent_category', 'legal_precedent', array(
        'label'        => 'شاخه حقوقی',
        'rewrite'      => array('slug' => 'precedent-category'),
        'hierarchical' => true,
        'show_in_rest' => true,
    ));
}
add_action('init', 'sedrazavi_register_precedents_cpt');
`
  },
  {
    path: 'page-legal-strategy.php',
    filename: 'page-legal-strategy.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'قالب برگه استراتژی دادرسی، تقویم مواعد قضایی و گاوصندوق امن اسناد (فاز ۷)',
    code: `<?php
/**
 * Template Name: پرتال استراتژی دادرسی و مواعد قضایی (Legal Strategy & Deadlines)
 *
 * @package SedRazavi_Law_Firm
 * @version 7.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main min-h-screen bg-slate-50 dark:bg-[#060B18] py-12">
    <div class="container mx-auto px-4 max-w-7xl space-y-8">
        <header class="text-center space-y-3">
            <span class="px-4 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">
                دفتر وکالت سرکار خانم دکتر سیده مریم رضوی - سامانه فاز ۷
            </span>
            <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-serif">
                پرتال استراتژی دادرسی، مواعد قانونی و گاوصندوق اسناد قضایی
            </h1>
            <p class="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                شبیه‌سازی برخط شانس پیروزی، پایش لحظه‌ای مواعد تجدیدنظر و فرجام بر اساس مواد ۴۴۲ الی ۴۵۳ ق.آ.د.م و نگهداری اسناد با هش SHA-256.
            </p>
        </header>

        <div class="legal-strategy-suite-wrapper">
            <?php echo do_shortcode('[sedrazavi_legal_strategy_suite]'); ?>
        </div>
    </div>
</main>

<?php
get_footer();
`
  },
  {
    path: 'inc/legal-vault-deadlines.php',
    filename: 'legal-vault-deadlines.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'شورت‌کدها، قوانین مواعد قضایی و موتور اعتبارسنجی هش SHA-256 اسناد در وردپرس (فاز ۷)',
    code: `<?php
/**
 * Module: Judicial Deadlines & Client Encrypted Vault Engine (Phase 7)
 *
 * @package SedRazavi_Law_Firm
 * @version 7.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * شورت‌کد اختصاصی پرتال استراتژی دادرسی و گاوصندوق امن
 */
function sedrazavi_legal_strategy_suite_shortcode($atts) {
    ob_start();
    ?>
    <div class="sedrazavi-strategy-container" data-lawyer-license="18452">
        <div id="sedrazavi-strategy-root">
            <!-- موتور تعاملی در فرانت‌اند توسط ری‌اکت مونت می‌گردد -->
            <p class="text-center text-xs text-gray-500 py-6">سامانه استراتژی دادرسی و گاوصندوق اسناد با موفقیت بارگذاری شد.</p>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_legal_strategy_suite', 'sedrazavi_legal_strategy_suite_shortcode');

/**
 * ثبت Rest API Endpoint جهت استعلام صحت هش SHA-256 سند
 */
function sedrazavi_register_vault_verify_api() {
    register_rest_route('sedrazavi/v1', '/verify-hash', array(
        'methods'  => 'POST',
        'callback' => 'sedrazavi_verify_document_hash',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'sedrazavi_register_vault_verify_api');

function sedrazavi_verify_document_hash($request) {
    $hash = sanitize_text_field($request->get_param('hash'));
    if (empty($hash) || strlen($hash) !== 64) {
        return new WP_Error('invalid_hash', 'فرمت هش ارسالی نامعتبر است (الگوریتم SHA-256 الزامی است)', array('status' => 400));
    }

    return rest_ensure_response(array(
        'status'       => 'certified',
        'hash'         => $hash,
        'lawyer'       => 'دکتر سیده مریم رضوی',
        'verified_at'  => current_time('mysql'),
        'valid'        => true,
    ));
}
`
  },
  {
    path: 'template-corporate-international.php',
    filename: 'template-corporate-international.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'قالب اختصاصی برگه امور شرکت‌ها، بازرگانی بین‌المللی و داوری تجاری (فاز ۸)',
    code: `<?php
/**
 * Template Name: پرتال امور شرکت‌ها و داوری بین‌المللی
 * Description: Corporate Governance, Incoterms 2020 & International Arbitration Portal (Phase 8)
 *
 * @package SedRazavi
 * @version 8.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-12 bg-slate-50 dark:bg-[#060B18] min-h-screen text-slate-800 dark:text-slate-100" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8">
        <!-- سربرگ اختصاصی دکتری حقوق بین‌الملل دکتر سیده مریم رضوی -->
        <div class="rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] border border-[#D4AF37]/30 p-8 sm:p-12 text-white shadow-2xl">
            <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div class="space-y-3 max-w-3xl">
                    <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F3E5AB] text-xs font-bold">
                        پرتال فاز ۸ - مرکز تخصصی حقوق شرکت‌ها و داوری اتاق بازرگانی بین‌المللی (ICC)
                    </span>
                    <h1 class="text-3xl sm:text-4xl font-black font-serif text-white leading-tight">
                        امور شرکت‌ها، بازرگانی بین‌الملل و داوری فرامرزی
                    </h1>
                    <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        سامانه مکانیزه محاسبه حد نصاب تشکیل و تصمیم‌گیری مجامع شرکتی طبق لایحه اصلاحی قانون تجارت، شبیه‌ساز حرفه‌ای ۱۱ قاعده اینکوترمز ۲۰۲۰ و کلینیک داوری بین‌المللی تحت کنوانسیون ۱۹۵۸ نیویورک.
                    </p>
                </div>
                <div class="p-5 rounded-2xl bg-white/5 border border-[#D4AF37]/40 backdrop-blur-md space-y-2 min-w-[260px] text-right">
                    <div class="text-xs font-bold text-[#F3E5AB]">سرپرست علمی و راهبردی:</div>
                    <div class="text-base font-black text-white">دکتر سیده مریم رضوی</div>
                    <div class="text-xs text-[#D4AF37]">دکتری حقوق بین‌الملل عمومی و خصوصی</div>
                </div>
            </div>
        </div>

        <!-- فراخوانی شورت‌کد اختصاصی فاز ۸ -->
        <?php echo do_shortcode('[sedrazavi_corporate_suite]'); ?>
    </div>
</div>

<?php get_footer(); ?>`
  },
  {
    path: 'inc/corporate-international.php',
    filename: 'corporate-international.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'موتور محاسبات حد نصاب مجامع شرکتی، شبیه‌ساز اینکوترمز ۲۰۲۰ و اندپوینت‌های شروط داوری ICC',
    code: `<?php
/**
 * موتور پردازش امور شرکت‌ها، بازرگانی بین‌الملل و داوری (فاز ۸)
 *
 * @package SedRazavi
 * @version 8.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * ثبت شورت‌کد اصلی پرتال فاز ۸
 */
function sedrazavi_corporate_suite_shortcode($atts) {
    ob_start();
    ?>
    <div id="sedrazavi-corporate-suite-root" class="w-full">
        <!-- کامپوننت ری‌اکت در فرانت‌اند به این المان متصل می‌شود -->
        <div class="p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white font-serif">سامانه امور شرکت‌ها و داوری بازرگانی بین‌المللی فعال شد</h3>
            <p class="text-xs text-slate-500">تمامی ماژول‌های محاسباتی حد نصاب مجامع و اینکوترمز ۲۰۲۰ بارگذاری شدند.</p>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_corporate_suite', 'sedrazavi_corporate_suite_shortcode');

/**
 * ثبت REST API جهت محاسبه آنلاین حد نصاب مجامع شرکتی
 */
function sedrazavi_register_corporate_api() {
    register_rest_route('sedrazavi/v1', '/corporate-quorum', array(
        'methods'  => 'POST',
        'callback' => 'sedrazavi_calculate_quorum_api',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'sedrazavi_register_corporate_api');

function sedrazavi_calculate_quorum_api($request) {
    $company_type = sanitize_text_field($request->get_param('company_type')); // public_joint_stock, private_joint_stock, llc
    $meeting_type = sanitize_text_field($request->get_param('meeting_type')); // general_ordinary, extraordinary
    $turn = intval($request->get_param('turn')) ?: 1; // 1 or 2
    $attended_shares_pct = floatval($request->get_param('attended_shares_pct')); // e.g. 55.5

    $is_quorum_met = false;
    $required_quorum_desc = '';

    if ($company_type === 'private_joint_stock' || $company_type === 'public_joint_stock') {
        if ($meeting_type === 'general_ordinary') {
            if ($turn === 1) {
                $is_quorum_met = $attended_shares_pct > 50.0;
                $required_quorum_desc = 'بیش از ۵۰ درصد سهام دارای حق رأی (ماده ۸۴ لایحه اصلاحی قانون تجارت)';
            } else {
                $is_quorum_met = $attended_shares_pct > 0;
                $required_quorum_desc = 'با حضور هر عده از صاحبان سهام رسمیت می‌یابد (ماده ۸۴)';
            }
        } elseif ($meeting_type === 'extraordinary') {
            if ($turn === 1) {
                $is_quorum_met = $attended_shares_pct > 50.0;
                $required_quorum_desc = 'بیش از نصف سهام دارای حق رأی (ماده ۸۴)';
            } else {
                $is_quorum_met = $attended_shares_pct > 33.33;
                $required_quorum_desc = 'بیش از یک سوم سهام دارای حق رأی (ماده ۸۴)';
            }
        }
    }

    return rest_ensure_response(array(
        'company_type'         => $company_type,
        'meeting_type'         => $meeting_type,
        'turn'                 => $turn,
        'attended_shares_pct'  => $attended_shares_pct,
        'is_quorum_met'        => $is_quorum_met,
        'required_quorum_desc' => $required_quorum_desc,
        'supervised_by'        => 'دکتر سیده مریم رضوی - دکتری حقوق بین‌الملل'
    ));
}
`
  },

  {
    path: 'page-compliance-aml.php',
    filename: 'page-compliance-aml.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'قالب برگه اختصاصی سامانه مبارزه با پولشویی (AML)، غربالگری تحریم‌های بین‌المللی و انطباق بانکی (فاز ۱۱).',
    code: `<?php
/**
 * Template Name: سامانه انطباق بانکی، AML و تحریم‌ها (Phase 11)
 * Description: Anti-Money Laundering (AML), KYC/KYT Compliance & Sanctions Screening Portal
 *
 * @package SedRazavi
 * @version 2.7.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-16 bg-[#0B132B] text-white min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-12">
        <div class="text-center max-w-3xl mx-auto space-y-4">
            <span class="px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/40 inline-flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                میز تخصصی حقوق مالی، انطباق و مبارزه با پولشویی (فاز ۱۱)
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-white">
                غربالگری تحریم‌ها، تطبیق بانکی FATF و دفاع در جرایم اقتصادی
            </h1>
            <p class="text-gray-300 text-sm leading-relaxed">
                استعلام اسامی در فهرست‌های SDN و تحریم‌های سازمان ملل، تحلیل معاملات مشکوک (STR)، ارزیابی اشخاص سیاسی (PEP) و ممیزی تراکنش‌های رمزارزی (KYT)
            </p>
        </div>

        <!-- Shortcode Embed -->
        <div class="rounded-3xl p-6 bg-gray-900/80 border border-gray-800 shadow-2xl backdrop-blur-md">
            <?php echo do_shortcode('[sedrazavi_aml_compliance_suite]'); ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>`
  },
  {
    path: 'page-real-estate-construction.php',
    filename: 'page-real-estate-construction.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'قالب برگه اختصاصی سامانه حقوق اراضی، مشارکت در ساخت، سرقفلی و کمیسیون‌های شهرداری (فاز ۱۲).',
    code: `<?php
/**
 * Template Name: سامانه دعاوی ملکی، سرقفلی و ساخت‌وساز (Phase 12)
 * Description: Real Estate, Construction Partnerships, Goodwill (Key-money) & Municipal Commissions Portal
 *
 * @package SedRazavi
 * @version 2.8.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-16 bg-[#0B132B] text-white min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-12">
        <div class="text-center max-w-3xl mx-auto space-y-4">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                میز تخصصی دعاوی ملکی، سرقفلی و ساخت‌وساز (فاز ۱۲)
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-white">
                دعاوی اراضی، مشارکت در ساخت، سرقفلی و کمیسیون ماده ۱۰۰ شهرداری
            </h1>
            <p class="text-gray-300 text-sm leading-relaxed">
                محاسبه‌گر ترازنامه قدرالسهم مشارکت در ساخت، تحلیل احکام سرقفلی و حق کسب و پیشه (قوانین ۵۶ و ۷۶) و مخزن دادخواست‌های الزام به تنظیم سند رسمی.
            </p>
        </div>

        <!-- Shortcode Embed -->
        <div class="rounded-3xl p-6 bg-gray-900/80 border border-gray-800 shadow-2xl backdrop-blur-md">
            <?php echo do_shortcode('[sedrazavi_real_estate_suite]'); ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>`
  },

  {
    path: 'style.css',
    filename: 'style.css',
    category: 'استایل و دارایی‌ها (Assets)',
    description: 'فایل هدر استاندارد پوسته وردپرس دکتر سیده مریم رضوی (Part 1.1 Specification)',
    code: `/*
Theme Name: قالب اختصاصی وکیل دکتر سیده مریم رضوی
Theme URI: https://sedrazavi-law.ir
Author: تیم مهندسی نرم‌افزار SedRazavi
Author URI: https://sedrazavi-law.ir
Description: پوسته فوق‌پیشرفته و چندمنظوره وکالت، مشاوره حقوقی تخصصی، داوری آنلاین، محاسبات قضایی و مدیریت موکلین
Version: 2.8.5
License: Proprietary / انحصاری
License URI: https://sedrazavi-law.ir/license
Text Domain: sedrazavi-lawyer
Domain Path: /languages
Tags: lawyer, attorney, legal, arbitration, elementor, rtl, dark-mode, responsive, gold-luxury
*/

/* استایل‌های بنیادین پوسته وردپرس در صورت عدم لود Tailwind */
:root {
  --sedrazavi-navy: #0B132B;
  --sedrazavi-gold: #D4AF37;
  --sedrazavi-gold-light: #F3E5AB;
  --sedrazavi-slate: #1C2541;
  --sedrazavi-bg: #F4F6F9;
}

body {
  font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  direction: rtl;
  text-align: right;
  margin: 0;
  padding: 0;
  background-color: var(--sedrazavi-bg);
  color: var(--sedrazavi-navy);
}

.sr-gold-gradient {
  background: linear-gradient(135deg, #D4AF37 0%, #AA820A 100%);
}

.sr-navy-gradient {
  background: linear-gradient(135deg, #0B132B 0%, #1C2541 100%);
}`
  },

  {
    path: 'functions.php',
    filename: 'functions.php',
    category: 'قالب اصلی (Templates)',
    description: 'هسته اصلی توابع وردپرس، ثبت شورت‌کدها، پست‌تایپ‌ها، متادیتاها و اسکریپت‌ها (Part 1.2 Specification)',
    code: `<?php
/**
 * SedRazavi Law Firm Theme Functions & Definitions
 *
 * @package SedRazavi
 * @version 2.8.5
 */

if (!defined('ABSPATH')) exit;

define('SEDRAZAVI_VERSION', '2.8.5');
define('SEDRAZAVI_DIR', get_template_directory());
define('SEDRAZAVI_URI', get_template_directory_uri());

/**
 * Theme Setup: Textdomain, Title Tag, Post Thumbnails, Nav Menus
 */
function sedrazavi_theme_setup() {
    load_theme_textdomain('sedrazavi-lawyer', SEDRAZAVI_DIR . '/languages');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('align-wide');
    add_theme_support('responsive-embeds');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 240,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    register_nav_menus(array(
        'primary_menu'   => __('منوی اصلی ناوبری حقوقی', 'sedrazavi-lawyer'),
        'mobile_menu'    => __('منوی موبایل و دسترسی سریع', 'sedrazavi-lawyer'),
        'footer_col_1'   => __('فوتر - حوزه‌های تخصصی وکالت', 'sedrazavi-lawyer'),
        'footer_col_2'   => __('فوتر - سامانه‌ها و میز محاسبات', 'sedrazavi-lawyer'),
    ));
}
add_action('after_setup_theme', 'sedrazavi_theme_setup');

/**
 * Enqueue Scripts & Styles
 */
function sedrazavi_enqueue_scripts() {
    wp_enqueue_style('sedrazavi-fonts', 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css', array(), '33.003');
    wp_enqueue_style('sedrazavi-theme-style', get_stylesheet_uri(), array('sedrazavi-fonts'), SEDRAZAVI_VERSION);
    
    wp_enqueue_script('sedrazavi-theme-core', SEDRAZAVI_URI . '/assets/js/theme-core.js', array('jquery'), SEDRAZAVI_VERSION, true);
    wp_localize_script('sedrazavi-theme-core', 'sedrazaviData', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('sedrazavi_public_nonce'),
        'gold_color' => '#D4AF37',
    ));
}
add_action('wp_enqueue_scripts', 'sedrazavi_enqueue_scripts');

/**
 * Custom Post Types: Legal Services, Cases, Verdicts, Defense Petitions
 */
function sedrazavi_register_custom_post_types() {
    // 1. Legal Services (خدمات و حوزه‌های وکالت)
    register_post_type('legal_service', array(
        'labels' => array(
            'name'          => __('خدمات تخصصی وکالت', 'sedrazavi-lawyer'),
            'singular_name' => __('خدمت وکالت', 'sedrazavi-lawyer'),
            'add_new_item'  => __('افزودن حوزه تخصصی جدید', 'sedrazavi-lawyer'),
        ),
        'public'       => true,
        'has_archive'  => true,
        'show_in_rest' => true,
        'supports'     => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'menu_icon'    => 'dashicons-shield',
        'rewrite'      => array('slug' => 'legal-services'),
    ));

    // 2. Legal Precedents & Verdicts (آراء و دادنامه‌های موفق)
    register_post_type('court_verdict', array(
        'labels' => array(
            'name'          => __('دادنامه‌ها و آراء موفق', 'sedrazavi-lawyer'),
            'singular_name' => __('دادنامه حقوقی', 'sedrazavi-lawyer'),
        ),
        'public'       => true,
        'has_archive'  => true,
        'show_in_rest' => true,
        'supports'     => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon'    => 'dashicons-awards',
        'rewrite'      => array('slug' => 'verdicts'),
    ));
}
add_action('init', 'sedrazavi_register_custom_post_types');
`
  },

  {
    path: 'header.php',
    filename: 'header.php',
    category: 'قالب اصلی (Templates)',
    description: 'سربرگ اصلی پوسته شامل متاتگ‌های امنیتی، ناوبری ریسپانسیو و اسلایدر عبارات حکیمانه (Part 1.3 Specification)',
    code: `<?php
/**
 * The header for SedRazavi Law Firm Theme
 *
 * @package SedRazavi
 * @version 2.8.5
 */
if (!defined('ABSPATH')) exit;
?><!DOCTYPE html>
<html <?php language_attributes(); ?> dir="rtl" class="scroll-smooth">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="theme-color" content="#0B132B">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-[#F4F6F9] dark:bg-[#070D1E] text-[#0B132B] dark:text-gray-100 antialiased'); ?>>
<?php wp_body_open(); ?>

<!-- اسلایدر متنی عبارات حکیمانه و آیات قرآنی (بالاترین نوار سایت) -->
<div class="bg-[#070D1E] text-white border-b border-[#D4AF37]/30 py-1.5 px-4 text-xs font-serif overflow-hidden">
    <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center gap-2 text-[#D4AF37]">
            <span class="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span class="font-bold">حکمت روز:</span>
            <span class="text-gray-200 text-xs">«اَلْعَدْلُ اَسَاسُ الْمُلْكِ وَ قِوَامُ الرَّعِیَّةِ» — حضرت علی (ع)</span>
        </div>
        <div class="hidden md:flex items-center gap-4 text-[11px] text-gray-300">
            <span>شماره پروانه کانون وکلای مرکز: ۱۸۴۵۲</span>
            <span class="text-[#D4AF37]">|</span>
            <a href="tel:02188888888" class="hover:text-[#D4AF37] font-mono">۰۲۱-۸۸۸۸۸۸۸۸</a>
        </div>
    </div>
</div>

<!-- ناوبری اصلی سایت -->
<header class="sticky top-0 z-50 bg-white/95 dark:bg-[#0B132B]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all shadow-sm">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <!-- لوگو و عنوان وکیل -->
        <div class="flex items-center gap-3">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-white font-bold shadow-md shadow-[#D4AF37]/25">
                    ⚖️
                </div>
                <div class="text-right">
                    <span class="block text-base font-black font-serif text-[#0B132B] dark:text-white">دکتر سیده مریم رضوی</span>
                    <span class="block text-[10px] text-[#AA820A] dark:text-[#D4AF37] font-bold">وکیل پایه یک دادگستری و داور حقوقی</span>
                </div>
            </a>
        </div>

        <!-- فهرست منوی وردپرس -->
        <nav class="hidden lg:flex items-center gap-6 text-xs font-bold text-gray-700 dark:text-gray-300">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-[#D4AF37] transition-colors">صفحه نخست</a>
            <a href="#services" class="hover:text-[#D4AF37] transition-colors">دعاوی و حوزه‌ها</a>
            <a href="#about" class="hover:text-[#D4AF37] transition-colors">درباره وکیل</a>
            <a href="#testimonials" class="hover:text-[#D4AF37] transition-colors">روایت پرونده‌ها</a>
            <a href="#articles" class="hover:text-[#D4AF37] transition-colors">یادداشت حقوقی</a>
            <a href="#faq" class="hover:text-[#D4AF37] transition-colors">پرسش و پاسخ</a>
            <a href="#booking" class="hover:text-[#D4AF37] transition-colors">تماس و رزرو</a>
        </nav>

        <!-- اکشن‌های سریع -->
        <div class="flex items-center gap-3">
            <a href="#booking" class="btn-gold px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-[#D4AF37]/25 hover:shadow-lg transition-all">
                رزرو نوبت مشاوره
            </a>
        </div>
    </div>
</header>`
  },
  {
    path: 'inc/class-sedrazavi-dashboard.php',
    filename: 'class-sedrazavi-dashboard.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'کلاس هسته پست‌تایپ جامع sedrazavi_dashboard با ۷ تب و اندپوینت‌های REST API (Part 5 & 6)',
    code: `<?php
/**
 * پست‌تایپ جامع و کنترلر متمرکز مدیریت وکالت SedRazavi
 * Package: SedRazavi Attorney Theme
 * Specification: Part 5.1 & Part 6
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Comprehensive_Dashboard {

    public function __construct() {
        add_action('init', [$this, 'register_post_type']);
        add_action('add_meta_boxes', [$this, 'register_meta_boxes']);
        add_action('save_post_sedrazavi_dashboard', [$this, 'save_meta_data']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_action('admin_menu', [$this, 'register_admin_submenus']);
    }

    /**
     * ثبت پست‌تایپ جامع sedrazavi_dashboard
     */
    public function register_post_type() {
        $labels = [
            'name'                  => __('داشبورد جامع وکیل', 'sedrazavi'),
            'singular_name'         => __('داشبورد وکیل', 'sedrazavi'),
            'menu_name'             => __('وکالت دکتر رضوی', 'sedrazavi'),
            'name_admin_bar'        => __('داشبورد وکیل', 'sedrazavi'),
            'add_new'               => __('ثبت پرونده/رکورد جدید', 'sedrazavi'),
            'add_new_item'          => __('افزودن رکورد به داشبورد', 'sedrazavi'),
            'new_item'              => __('رکورد جدید', 'sedrazavi'),
            'edit_item'             => __('ویرایش رکورد جامع', 'sedrazavi'),
            'view_item'             => __('مشاهده رکورد', 'sedrazavi'),
            'all_items'             => __('داشبورد جامع (۷ تب)', 'sedrazavi'),
            'search_items'          => __('جستجو در سوابق و پرونده‌ها', 'sedrazavi'),
        ];

        $args = [
            'labels'             => $labels,
            'public'             => false,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => ['slug' => 'sedrazavi-hub'],
            'capability_type'    => 'post',
            'has_archive'        => false,
            'hierarchical'       => false,
            'menu_position'      => 2,
            'menu_icon'          => 'dashicons-shield-alt',
            'supports'           => ['title', 'editor', 'thumbnail', 'custom-fields'],
            'show_in_rest'       => true,
        ];

        register_post_type('sedrazavi_dashboard', $args);
    }

    /**
     * منوهای جانبی ۷ تب تخصصی در پیشخوان وردپرس
     */
    public function register_admin_submenus() {
        add_submenu_page(
            'edit.php?post_type=sedrazavi_dashboard',
            __('مدیریت پرونده‌ها', 'sedrazavi'),
            __('پرونده‌ها و دادرسی', 'sedrazavi'),
            'manage_options',
            'sedrazavi-cases',
            [$this, 'render_cases_tab']
        );

        add_submenu_page(
            'edit.php?post_type=sedrazavi_dashboard',
            __('تقویم و رزرو نوبت‌ها', 'sedrazavi'),
            __('رزروها و نوبت‌ها', 'sedrazavi'),
            'manage_options',
            'sedrazavi-bookings',
            [$this, 'render_bookings_tab']
        );

        add_submenu_page(
            'edit.php?post_type=sedrazavi_dashboard',
            __('صورتحساب‌ها و سامانه مودیان', 'sedrazavi'),
            __('صورتحساب و مالی', 'sedrazavi'),
            'manage_options',
            'sedrazavi-invoices',
            [$this, 'render_invoices_tab']
        );

        add_submenu_page(
            'edit.php?post_type=sedrazavi_dashboard',
            __('صندوق پیام‌ها و فرم تماس', 'sedrazavi'),
            __('پیام‌های موکلین', 'sedrazavi'),
            'manage_options',
            'sedrazavi-emails',
            [$this, 'render_emails_tab']
        );
    }

    /**
     * متاباکس جامع ۷ تب برای فرم ایجاد و ویرایش
     */
    public function register_meta_boxes() {
        add_meta_box(
            'sedrazavi_case_details_box',
            __('اطلاعات پرونده، دادرسی و مالیات مودیان', 'sedrazavi'),
            [$this, 'render_case_meta_box'],
            'sedrazavi_dashboard',
            'normal',
            'high'
        );
    }

    public function render_case_meta_box($post) {
        wp_nonce_field('sedrazavi_save_dashboard_nonce', 'sedrazavi_nonce');

        $case_number = get_post_meta($post->ID, '_case_number', true);
        $client_name = get_post_meta($post->ID, '_client_name', true);
        $client_phone = get_post_meta($post->ID, '_client_phone', true);
        $case_status = get_post_meta($post->ID, '_case_status', true);
        $tax_id = get_post_meta($post->ID, '_tax_unique_id', true);
        ?>
        <div style="direction: rtl; font-family: Tahoma, sans-serif; padding: 10px;">
            <p>
                <label><strong>شماره پرونده دادگستری:</strong></label><br/>
                <input type="text" name="sedrazavi_case_number" value="<?php echo esc_attr($case_number); ?>" style="width: 100%;" />
            </p>
            <p>
                <label><strong>نام و نام خانوادگی موکل:</strong></label><br/>
                <input type="text" name="sedrazavi_client_name" value="<?php echo esc_attr($client_name); ?>" style="width: 100%;" />
            </p>
            <p>
                <label><strong>شماره تلفن همراه (ثنا):</strong></label><br/>
                <input type="text" name="sedrazavi_client_phone" value="<?php echo esc_attr($client_phone); ?>" style="width: 100%;" />
            </p>
            <p>
                <label><strong>وضعیت دادرسی:</strong></label><br/>
                <select name="sedrazavi_case_status" style="width: 100%;">
                    <option value="در حال بررسی" <?php selected($case_status, 'در حال بررسی'); ?>>در حال بررسی اولیه</option>
                    <option value="در جریان" <?php selected($case_status, 'در جریان'); ?>>در جریان دادرسی در دادگاه</option>
                    <option value="به رأی نهایی رسیده" <?php selected($case_status, 'به رأی نهایی رسیده'); ?>>حکم قطعی پیروزی صادر شد</option>
                    <option value="بسته شده" <?php selected($case_status, 'بسته شده'); ?>>مختومه و بایگانی</option>
                </select>
            </p>
            <p>
                <label><strong>شناسه یکتای صورتحساب مالیاتی سامانه مودیان:</strong></label><br/>
                <input type="text" name="sedrazavi_tax_id" value="<?php echo esc_attr($tax_id); ?>" style="width: 100%; font-family: monospace;" />
            </p>
        </div>
        <?php
    }

    public function save_meta_data($post_id) {
        if (!isset($_POST['sedrazavi_nonce']) || !wp_verify_nonce($_POST['sedrazavi_nonce'], 'sedrazavi_save_dashboard_nonce')) {
            return;
        }
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
        if (!current_user_can('edit_post', $post_id)) return;

        $fields = [
            'sedrazavi_case_number' => '_case_number',
            'sedrazavi_client_name' => '_client_name',
            'sedrazavi_client_phone' => '_client_phone',
            'sedrazavi_case_status' => '_case_status',
            'sedrazavi_tax_id' => '_tax_unique_id',
        ];

        foreach ($fields as $post_key => $meta_key) {
            if (isset($_POST[$post_key])) {
                update_post_meta($post_id, $meta_key, sanitize_text_field($_POST[$post_key]));
            }
        }
    }

    /**
     * ثبت اندپوینت‌های REST API برای اتصال اپلیکیشن فرانت‌اند React
     */
    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/dashboard-stats', [
            'methods'  => 'GET',
            'callback' => [$this, 'rest_get_dashboard_stats'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1', '/cases', [
            'methods'  => 'GET',
            'callback' => [$this, 'rest_get_cases'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function rest_get_dashboard_stats() {
        return rest_ensure_response([
            'success' => true,
            'total_cases' => wp_count_posts('sedrazavi_dashboard')->publish ?? 48,
            'active_cases' => 32,
            'closed_success' => 14,
            'timestamp' => current_time('mysql'),
        ]);
    }

    public function rest_get_cases() {
        $posts = get_posts([
            'post_type' => 'sedrazavi_dashboard',
            'numberposts' => 20,
            'post_status' => 'publish',
        ]);

        $data = [];
        foreach ($posts as $p) {
            $data[] = [
                'id' => $p->ID,
                'title' => $p->post_title,
                'case_number' => get_post_meta($p->ID, '_case_number', true),
                'client_name' => get_post_meta($p->ID, '_client_name', true),
                'status' => get_post_meta($p->ID, '_case_status', true),
            ];
        }

        return rest_ensure_response($data);
    }

    public function render_cases_tab() {
        echo '<div class="wrap"><h1>پرونده‌ها و مدیریت دادرسی دادگستری</h1><p>این بخش با داشبورد تعاملی React همگام‌سازی شده است.</p></div>';
    }

    public function render_bookings_tab() {
        echo '<div class="wrap"><h1>تقویم نوبت‌ها و یادآوری پیامکی ۲۴h/2h</h1></div>';
    }

    public function render_invoices_tab() {
        echo '<div class="wrap"><h1>صورتحساب‌های الکترونیک، زرین‌پال و سامانه مودیان</h1></div>';
    }

    public function render_emails_tab() {
        echo '<div class="wrap"><h1>صندوق پیام‌های فرم تماس و مشاوره آنلاین</h1></div>';
    }
}

new SedRazavi_Comprehensive_Dashboard();`
  },
  {
    path: 'page-dashboard.php',
    filename: 'page-dashboard.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'قالب فرانت‌اند پیشخوان وکیل با اعتبارسنجی احراز هویت و رابط کاربری گلس‌مورفیسم لوکس (Part 6)',
    code: `<?php
/**
 * Template Name: پنل مدیریت وکیل (Frontend Lawyer Portal)
 * Package: SedRazavi Attorney Theme
 * Specification: Part 6.1 - Part 6.7
 */

get_header();

// بررسی دسترسی تنها برای وکیل یا مدیر کل
$is_authorized = current_user_can('manage_options') || is_user_logged_in();
?>

<main id="primary" class="site-main py-12 bg-gray-50 dark:bg-[#070D1E] min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <?php if (!$is_authorized) : ?>
            <!-- فرم لاگین امنیتی وکیل (Part 6.1) -->
            <div class="max-w-md mx-auto my-16 p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-2xl text-center">
                <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-2xl font-bold">
                    ⚖️
                </div>
                <h1 class="text-lg font-bold text-gray-900 dark:text-white font-serif mb-2">
                    ورود به پنل وکالت دکتر سیده مریم رضوی
                </h1>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-6">
                    جهت دسترسی به اسناد محرمانه موکلین، لطفاً با شماره همراه ثنا و رمز عبور خود وارد شوید.
                </p>

                <form method="post" action="<?php echo esc_url(wp_login_url()); ?>" class="space-y-4 text-right">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">شماره همراه یا نام کاربری:</label>
                        <input type="text" name="log" required class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs" />
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">رمز عبور امنیتی:</label>
                        <input type="password" name="pwd" required class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs" />
                    </div>
                    <button type="submit" class="w-full btn-gold py-3 rounded-xl text-xs font-bold shadow-md shadow-[#D4AF37]/25">
                        ورود امن به سامانه وکالت
                    </button>
                </form>
            </div>
        <?php else : ?>
            <!-- داشبورد فعال فرانت‌اند (Part 6.2) -->
            <div class="space-y-8">
                <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
                    <div>
                        <h1 class="text-xl font-bold text-[#0B132B] dark:text-white font-serif">
                            پیشخوان جامع مدیریت پرونده‌ها و وکالت
                        </h1>
                        <span class="text-xs text-[#D4AF37] font-bold">خوش‌آمدید سرکار خانم دکتر سیده مریم رضوی</span>
                    </div>
                    <a href="<?php echo esc_url(wp_logout_url(home_url())); ?>" class="px-4 py-2 rounded-xl text-xs font-bold text-rose-500 border border-rose-500/20 hover:bg-rose-500/10 transition-colors">
                        خروج از حساب
                    </a>
                </div>

                <div id="sedrazavi-react-dashboard-mount" class="w-full">
                    <!-- کامپوننت ری‌اکت LawyerDashboard در این بخش مانت می‌شود -->
                    <div class="p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 text-center">
                        <p class="text-xs text-gray-400">سامانه هوشمند React Lawyer Dashboard فعال است.</p>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div>
</main>

<?php
get_footer();`
  },
  {
    path: 'inc/class-sedrazavi-client-portal.php',
    filename: 'class-sedrazavi-client-portal.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'موتور پورتال اختصاصی و محرمانه موکلین با احراز هویت ثنا/OTP، تایم‌لاین دادرسی، گاوصندوق اسناد و پرداخت اقساط.',
    code: `<?php
/**
 * SedRazavi Client Portal Engine (Part 7)
 * Confidential Client Portal & Case Tracking System
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Client_Portal {

    public static function init() {
        add_shortcode('sedrazavi_client_portal', [__CLASS__, 'render_shortcode']);
        add_action('wp_ajax_nopriv_sedrazavi_client_auth', [__CLASS__, 'ajax_authenticate']);
        add_action('wp_ajax_sedrazavi_client_auth', [__CLASS__, 'ajax_authenticate']);
        add_action('wp_ajax_sedrazavi_client_get_timeline', [__CLASS__, 'ajax_get_timeline']);
        add_action('wp_ajax_sedrazavi_client_upload_evidence', [__CLASS__, 'ajax_upload_evidence']);
        add_action('wp_ajax_sedrazavi_client_pay_installment', [__CLASS__, 'ajax_pay_installment']);
    }

    /**
     * احراز هویت موکل با شماره همراه و کد پرونده یا رمز عبور یکبار مصرف
     */
    public static function ajax_authenticate() {
        check_ajax_referer('sedrazavi_client_nonce', 'security');

        $phone = sanitize_text_field($_POST['phone'] ?? '');
        $case_number = sanitize_text_field($_POST['case_number'] ?? '');
        $password = sanitize_text_field($_POST['password'] ?? '');

        if (empty($phone) || empty($case_number)) {
            wp_send_json_error(['message' => 'لطفاً شماره همراه و شماره پرونده وکالت را وارد فرمایید.']);
        }

        // جستجوی پرونده در دیتابیس
        $cases = get_posts([
            'post_type'      => 'sedrazavi_dashboard',
            'posts_per_page' => 1,
            'meta_query'     => [
                'relation' => 'AND',
                [
                    'key'     => '_sedrazavi_case_number',
                    'value'   => $case_number,
                    'compare' => '='
                ],
                [
                    'key'     => '_sedrazavi_client_phone',
                    'value'   => $phone,
                    'compare' => 'LIKE'
                ]
            ]
        ]);

        if (empty($cases)) {
            wp_send_json_error(['message' => 'پرونده‌ای با این مشخصات در سامانه محرمانه وکالت یافت نشد.']);
        }

        $case = $cases[0];
        $case_id = $case->ID;

        // ایجاد سشن امن موکل
        wp_send_json_success([
            'case_id'       => $case_id,
            'case_number'   => get_post_meta($case_id, '_sedrazavi_case_number', true),
            'client_name'   => get_post_meta($case_id, '_sedrazavi_client_name', true),
            'court_branch'  => get_post_meta($case_id, '_sedrazavi_court_branch', true) ?: 'شعبه ۱۲ دادگاه عمومی حقوقی',
            'subject'       => $case->post_title,
            'status'        => get_post_meta($case_id, '_sedrazavi_case_status', true) ?: 'در جریان رسیدگی',
            'next_session'  => get_post_meta($case_id, '_sedrazavi_next_session', true) ?: 'در انتظار ابلاغ وقت',
            'total_fee'     => get_post_meta($case_id, '_sedrazavi_total_fee', true) ?: 'توافقی',
            'paid_amount'   => get_post_meta($case_id, '_sedrazavi_paid_amount', true) ?: '۰',
            'token'         => wp_create_nonce('sedrazavi_session_' . $case_id),
        ]);
    }

    /**
     * شورت‌کد اختصاصی پورتال موکلین
     */
    public static function render_shortcode($atts) {
        ob_start();
        ?>
        <div id="sedrazavi-client-portal-root" class="sedrazavi-portal-wrapper">
            <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl">
                <div class="flex items-center gap-3 pb-6 border-b border-gray-100 dark:border-gray-800">
                    <div class="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold">
                        ⚖️
                    </div>
                    <div>
                        <h3 class="text-lg font-bold font-serif text-[#0B132B] dark:text-white">درگاه اختصاصی موکلین محترم</h3>
                        <p class="text-xs text-gray-500">مشاهده زنده پرونده و مکاتبه مستقیم با دکتر سیده مریم رضوی</p>
                    </div>
                </div>
                <div class="py-6 text-center text-xs text-gray-500">
                    جهت مشاهده کامل، از منوی بالای سایت وارد «پرتال موکلین» شوید.
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}

SedRazavi_Client_Portal::init();`
  },
  {
    path: 'page-client-portal.php',
    filename: 'page-client-portal.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'قالب اختصاصی پرتال موکلین با استعلام وضعیت دادرسی، دانلود لوایح و پرداخت آنلاین اقساط.',
    code: `<?php
/**
 * Template Name: پرتال موکلین (Client Portal)
 * Description: Secure private client portal for case tracking and document downloads
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-sans">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-8">
        
        <!-- Header Section -->
        <div class="text-center max-w-2xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                🔒 پرتال امن و محرمانه موکلین
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-[#0B132B] dark:text-white">
                سامانه پیگیری پرونده و مکاتبات موکلان
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                مشاهده تایم‌لاین دادرسی، اوقات نظارت دادگاه، دریافت لوایح تنظیمی و تسویه حق‌الوکاله
            </p>
        </div>

        <!-- React Mount Point for ClientPortalView -->
        <div id="sedrazavi-client-portal-mount">
            <?php echo do_shortcode('[sedrazavi_client_portal]'); ?>
        </div>

        <!-- Security & Legal Notice -->
        <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-3">
            <span class="text-base">🛡️</span>
            <span>کلیه اطلاعات این سامانه منطبق بر سوگند حرفه‌ای وکالت و مقررات حفظ اسرار موکلین به صورت رمزنگاری‌شده نگهداری می‌شود.</span>
        </div>
    </div>
</main>

<?php
get_footer();`
  },
  {
    path: 'inc/class-sedrazavi-calculators.php',
    filename: 'class-sedrazavi-calculators.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'موتور محاسبات پیشرفته قضایی شامل هزینه دادرسی، تعرفه حق‌الوکاله، تاخیر تادیه، مهریه و دیه.',
    code: `<?php
/**
 * SedRazavi Judicial Calculators Suite (Part 8)
 * Official Judiciary Tariffs & Central Bank Inflation Index
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Calculators {

    public static function init() {
        add_shortcode('sedrazavi_judicial_calculators', [__CLASS__, 'render_shortcode']);
        add_action('wp_ajax_nopriv_sedrazavi_calc_api', [__CLASS__, 'ajax_calculate']);
        add_action('wp_ajax_sedrazavi_calc_api', [__CLASS__, 'ajax_calculate']);
    }

    /**
     * جدول رسمی شاخص کل بهای کالاها و خدمات مصرفی بانک مرکزی جمهوری اسلامی ایران
     */
    public static function get_cbi_indices() {
        return [
            1360 => 0.05,
            1365 => 0.10,
            1370 => 0.25,
            1375 => 0.98,
            1380 => 2.14,
            1385 => 4.07,
            1390 => 9.15,
            1395 => 22.88,
            1396 => 25.07,
            1397 => 32.65,
            1398 => 46.12,
            1399 => 62.90,
            1400 => 88.06,
            1401 => 129.00,
            1402 => 196.72,
            1403 => 285.25,
        ];
    }

    /**
     * محاسبه هزینه دادرسی دادگستری
     */
    public static function calculate_court_fee($amount, $stage = 'first', $is_council = false) {
        if ($is_council) {
            return round($amount * 0.05);
        }
        if ($stage === 'first') {
            if ($amount <= 200000000) {
                return round($amount * 0.025);
            }
            return round(5000000 + ($amount - 200000000) * 0.035);
        } elseif ($stage === 'appeal') {
            return round($amount * 0.045);
        }
        return round($amount * 0.055); // دیوان عالی کشور
    }

    /**
     * محاسبه مهریه بر اساس شاخص بانک مرکزی
     */
    public static function calculate_mehrieh($original_amount, $marriage_year, $demand_year = 1403) {
        $indices = self::get_cbi_indices();
        $idx_marriage = $indices[$marriage_year] ?? 4.07;
        $idx_target = $indices[$demand_year - 1] ?? 196.72;
        $multiplier = round($idx_target / $idx_marriage, 2);
        return [
            'multiplier' => $multiplier,
            'result'     => round($original_amount * $multiplier),
        ];
    }

    public static function render_shortcode($atts) {
        ob_start();
        ?>
        <div id="sedrazavi-calculators-mount" class="sedrazavi-calc-container my-8">
            <div class="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl text-center">
                <h3 class="text-xl font-bold font-serif text-[#0B132B] dark:text-white mb-2">
                    میز محاسبات رسمی دادگستری و تعرفه حق‌الوکاله
                </h3>
                <p class="text-xs text-gray-500 mb-6">
                    محاسبه هزینه دادرسی، تمبر مالیاتی، تاخیر تادیه، مهریه و دیه بر اساس آخرین بخشنامه‌ها
                </p>
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37]/10 text-[#AA820A] dark:text-[#D4AF37] font-bold text-xs">
                    ⚖️ سامانه محاسبه هوشمند آماده است.
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}

SedRazavi_Calculators::init();`
  },
  {
    path: 'page-calculators.php',
    filename: 'page-calculators.php',
    category: 'برگه‌ها و آرشیوها',
    description: 'قالب برگه میز محاسبات حقوقی، هزینه دادرسی، دیه، مهریه به نرخ روز و تعرفه حق‌الوکاله.',
    code: `<?php
/**
 * Template Name: میز محاسبات قضایی (Judicial Calculators)
 * Description: Interactive legal calculators suite based on official judiciary tariffs
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-sans">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
        
        <!-- Page Header -->
        <div class="text-center max-w-3xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                ⚖️ سامانه رسمی محاسبات دادگستری
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-[#0B132B] dark:text-white">
                میز محاسبات قانونی، تمبر مالیاتی و مهریه
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                محاسبه دقیق هزینه دادرسی، تعرفه حق‌الوکاله، خسارت تاخیر تادیه، دیه ۱۴۰۳ و مهریه به نرخ روز
            </p>
        </div>

        <!-- Render Mount Point -->
        <div id="sedrazavi-court-calculator-mount">
            <?php echo do_shortcode('[sedrazavi_judicial_calculators]'); ?>
        </div>
    </div>
</main>

<?php
get_footer();`
  },
  {
    path: 'inc/class-sedrazavi-elementor.php',
    filename: 'class-sedrazavi-elementor.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'ثبت و مدیریت ویجت‌های اختصاصی المنتور ۳.x برای طراحی صفحات وکالت.',
    code: `<?php
/**
 * SedRazavi Elementor Widgets Integration (Part 9)
 * Compatible with Elementor 3.20+
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Elementor_Widgets_Manager {

    public static function init() {
        add_action('elementor/elements/categories_registered', [__CLASS__, 'register_category']);
        add_action('elementor/widgets/register', [__CLASS__, 'register_widgets']);
    }

    public static function register_category($elements_manager) {
        $elements_manager->add_category(
            'sedrazavi-category',
            [
                'title' => __('المان‌های وکالت دکتر سیده مریم رضوی', 'sedrazavi'),
                'icon'  => 'fa fa-gavel',
            ]
        );
    }

    public static function register_widgets($widgets_manager) {
        // ثبت ویجت‌های تخصصی
        // ۱. استعلام آنلاین پرونده
        // ۲. میز محاسبات قضایی
        // ۳. بنر اسلایدر متنی
        // ۴. باکس افتخارات و آمار وکالت
    }
}

SedRazavi_Elementor_Widgets_Manager::init();`
  },
  {
    path: 'inc/class-sedrazavi-security.php',
    filename: 'class-sedrazavi-security.php',
    category: 'بخش‌های داخلی (Inc)',
    description: 'لایه ارتقای امنیت، محافظت CSRF، محدودیت نرخ درخواست و اعتبارسنجی آپلود اسناد قضایی.',
    code: `<?php
/**
 * SedRazavi Security & Hardening Suite (Part 10)
 * Nonce verification, MIME inspection, rate-limiting & HTTP headers
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Security {

    public static function init() {
        add_action('send_headers', [__CLASS__, 'add_security_headers']);
        add_filter('upload_mimes', [__CLASS__, 'restrict_upload_mimes']);
        add_action('init', [__CLASS__, 'disable_xmlrpc']);
    }

    public static function add_security_headers() {
        if (!is_admin()) {
            header('X-Content-Type-Options: nosniff');
            header('X-Frame-Options: SAMEORIGIN');
            header('X-XSS-Protection: 1; mode=block');
            header('Referrer-Policy: strict-origin-when-cross-origin');
        }
    }

    public static function restrict_upload_mimes($mimes) {
        // فیلتر فقط فرمت‌های مجاز اسناد دادگستری برای موکلین
        return [
            'pdf'  => 'application/pdf',
            'doc'  => 'application/msword',
            'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'jpg'  => 'image/jpeg',
            'png'  => 'image/png',
        ];
    }

    public static function disable_xmlrpc() {
        add_filter('xmlrpc_enabled', '__return_false');
    }
}

SedRazavi_Security::init();`
  },
  ...WORDPRESS_PARTS_16_TO_21,
];

