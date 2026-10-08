<?php
/**
 * Template Name: قراردادهای پیمانکاری، EPC و شرایط عمومی پیمان (EPC & Construction Contracts)
 * Description: سامانه تحلیل تاخیرات مجاز (بخشنامه ۵۰۹۰)، دعاوی فسخ و خاتمه پیمان و استانداردهای مهندسی فیدیک
 *
 * @package SedRazavi
 * @version 3.1.0
 */

if (!defined('ABSPATH')) exit;

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
        <div class="relative bg-gradient-to-br from-[#060B18] via-[#0B132B] to-[#12213D] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 mb-10 shadow-2xl overflow-hidden">
            <div class="absolute -left-10 -bottom-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div class="space-y-4 text-right max-w-3xl">
                    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
                        <span>🏗️ دپارتمان تخصصی حقوق مهندسی و پیمانکاری کلان</span>
                    </div>
                    <h1 class="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
                        مدیریت ادعا (Claim)، تاخیرات پیمانکاری و قراردادهای EPC
                    </h1>
                    <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                        مشاوره حقوقی تخصصی در پروژه‌های EPC، PC، BOT و شرایط عمومی پیمان (نشریه ۴۳۱۱)، لایحه تاخیرات بخشنامه ۵۰۹۰، دفاع در برابر ضبط ضمانت‌نامه بانکی و داوری فنی مهندسی.
                    </p>
                </div>
                <div class="flex flex-col gap-3 w-full md:w-auto">
                    <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn-gold text-center py-3 px-6 rounded-xl text-xs font-bold shadow-lg shadow-[#D4AF37]/20">
                        درخواست تنظیم لایحه کلیم (Claim)
                    </a>
                </div>
            </div>
        </div>

        <div class="mb-12">
            <?php
            if (shortcode_exists('react_component')) {
                echo do_shortcode('[react_component name="EngineeringProcurementSuite"]');
            }
            ?>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div class="p-6 bg-[#060B18]/90 border border-slate-800 rounded-2xl">
                <h3 class="text-lg font-bold text-white mb-2">بخشنامه ۵۰۹۰ و تاخیرات مجاز</h3>
                <p class="text-xs text-slate-300 leading-relaxed">محاسبه علمی روزهای تمدید پیمان بر اساس دیرکرد پیش‌پرداخت، صورت‌وضعیت‌های تاییدشده و تاخیرات خارج از قصور پیمانکار.</p>
            </div>
            <div class="p-6 bg-[#060B18]/90 border border-slate-800 rounded-2xl">
                <h3 class="text-lg font-bold text-white mb-2">ماده ۴۶ و ۴۸ نشریه ۴۳۱۱</h3>
                <p class="text-xs text-slate-300 leading-relaxed">استراتژی‌های پیشگیرانه در برابر اخطار فسخ، جلوگیری از تملک غیرقانونی ماشین‌آلات کارگاه و اعمال خاتمه منصفانه پیمان.</p>
            </div>
            <div class="p-6 bg-[#060B18]/90 border border-slate-800 rounded-2xl">
                <h3 class="text-lg font-bold text-white mb-2">استانداردهای بین‌المللی FIDIC</h3>
                <p class="text-xs text-slate-300 leading-relaxed">داوری فنی و حل اختلاف از طریق هیئت‌های حل اختلاف (DAB) در قراردادهای مهندسی فیدیک با کارفرمایان دولتی و بین‌المللی.</p>
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
