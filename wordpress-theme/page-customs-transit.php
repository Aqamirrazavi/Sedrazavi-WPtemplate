<?php
/**
 * Template Name: ترانزیت، قاچاق و دعاوی گمرکی (Customs & Transit Disputes)
 * Description: سامانه تخصصی محاسبات حقوق ورودی، کمیسیون ماده ۱۴۴، دفاع از قاچاق کالا و ترانزیت بین‌المللی
 *
 * @package SedRazavi
 * @version 3.1.0
 */

if (!defined('ABSPATH')) exit;

// 1. Elementor Compatibility Check
$is_elementor = false;
if (did_action('elementor/loaded') && class_exists('Elementor\Plugin')) {
    $elem = \Elementor\Plugin::instance();
    if (($elem->preview && method_exists($elem->preview, 'is_preview_mode') && $elem->preview->is_preview_mode()) ||
        ($elem->editor && method_exists($elem->editor, 'is_edit_mode') && $elem->editor->is_edit_mode()) ||
        ($elem->db && method_exists($elem->db, 'is_built_with_elementor') && $elem->db->is_built_with_elementor(get_the_ID()))) {
        $is_elementor = true;
    }
}
if (!$is_elementor && is_singular() && get_post_meta(get_the_ID(), '_elementor_edit_mode', true) === 'builder') {
    $is_elementor = true;
}

get_header();

if ($is_elementor) :
    while (have_posts()) : the_post();
        the_content();
    endwhile;
else :
?>

<div class="py-12 bg-[#0B132B] min-h-screen text-slate-100" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <!-- Hero Header -->
        <div class="relative bg-gradient-to-br from-[#060B18] via-[#0B132B] to-[#142347] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 mb-10 shadow-2xl overflow-hidden">
            <div class="absolute -left-10 -bottom-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div class="space-y-4 text-right max-w-3xl">
                    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
                        <span>🚢 دپارتمان تخصصی تجارت فرامرزی و ترانزیت</span>
                    </div>
                    <h1 class="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
                        دعاوی گمرکی، اختلافات تعرفه‌ای و دفاع تخصصی قاچاق کالا
                    </h1>
                    <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                        دفاع در کمیسیون‌های بدوی و تجدیدنظر حل اختلافات گمرکی (مواد ۱۴۴ و ۱۴۶ قانون امور گمرکی)، حل منازعات ارزش (TSC)، رفع توقیف کالاهای ترانزیتی و ابطال جرایم غیرقانونی دموراژ.
                    </p>
                </div>
                <div class="flex flex-col gap-3 w-full md:w-auto">
                    <a href="#customs-calc" class="btn-gold text-center py-3 px-6 rounded-xl text-xs font-bold shadow-lg shadow-[#D4AF37]/20">
                        محاسبه جریمه و حقوق گمرکی
                    </a>
                    <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="py-3 px-6 rounded-xl text-xs font-bold text-center border border-slate-700 hover:border-[#D4AF37] bg-white/5 transition-colors">
                        تنظیم لایحه کمیسیون ماده ۱۴۴
                    </a>
                </div>
            </div>
        </div>

        <!-- Interactive Module & Shortcode Area -->
        <div class="mb-12">
            <?php
            if (shortcode_exists('react_component')) {
                echo do_shortcode('[react_component name="CustomsTransitDisputesSuite"]');
            }
            ?>
        </div>

        <!-- Server-Side Native Knowledge & Tariffs Table -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div class="bg-[#060B18]/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                    <span class="text-2xl">⚖️</span>
                </div>
                <h3 class="text-lg font-bold text-white">کمیسیون حل اختلاف (ماده ۱۴۴)</h3>
                <p class="text-xs text-slate-300 leading-relaxed">
                    مرجع شبه‌قضایی رسیدگی به منازعات مؤدیان با گمرک در خصوص ارزش استنباطی، تعرفه‌بندی نادرست کالا و جرایم تاخیر با حضور نمایندگان دادگستری و اتاق بازرگانی.
                </p>
            </div>

            <div class="bg-[#060B18]/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                    <span class="text-2xl">🛡️</span>
                </div>
                <h3 class="text-lg font-bold text-white">دفاع از اتهام قاچاق کالا و ارز</h3>
                <p class="text-xs text-slate-300 leading-relaxed">
                    اثبات انطباق اسناد خرید خارجی با اظهارنامه گمرکی، رد بند‌های جرم‌انگارانه ماده ۱۱۳ امور گمرکی و اثبات فقدان قصد مجرمانه در شعب ویژه تعزیرات حکومتی و دادسرا.
                </p>
            </div>

            <div class="bg-[#060B18]/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                    <span class="text-2xl">📦</span>
                </div>
                <h3 class="text-lg font-bold text-white">کالای متروکه و دموراژ کانتینری</h3>
                <p class="text-xs text-slate-300 leading-relaxed">
                    توقف مزایده سازمان جمع‌آوری و فروش اموال تملیکی، اخذ دستور موقت ترخیص و تعیین خسارت تاخیر غیرموجه خطوط کشتیرانی بر اساس استانداردهای بین‌المللی اینکوترمز.
                </p>
            </div>
        </div>

        <?php
        while (have_posts()) : the_post();
            the_content();
        endwhile;
        ?>
    </div>
</div>

<?php
endif;
get_footer();
