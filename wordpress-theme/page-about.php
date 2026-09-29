<?php
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

<?php get_footer(); ?>