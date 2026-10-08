<?php
/**
 * Template Name: جرایم اقتصادی، بورس و دادگاه‌های ویژه (Economic Crimes Defense)
 * Description: سامانه دفاع حقوقی جرایم کلان اقتصادی، معاملات متکی بر اطلاعات نهانی بورس، ارزیابی قرارهای تامین و ردیابی مالی
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
        <div class="relative bg-gradient-to-br from-[#060B18] via-[#0B132B] to-[#1F1836] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 mb-10 shadow-2xl overflow-hidden">
            <div class="space-y-4 text-right max-w-3xl">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
                    <span>⚖️ دپارتمان تخصصی حقوق کیفری اقتصادی و بازار سرمایه</span>
                </div>
                <h1 class="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
                    دفاع تخصصی در مجتمع قضایی جرایم اقتصادی و دادگاه‌های ویژه
                </h1>
                <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                    وکالت تخصصی در پرونده‌های قانون مجازات اخلالگران در نظام اقتصادی کشور، تبانی در معاملات دولتی، جرایم بازار سرمایه و بورس اوراق بهادار، تبدیل قرار بازداشت موقت و اثبات عدم سوء‌نیت شرکتی.
                </p>
            </div>
        </div>

        <div class="mb-12">
            <?php
            if (shortcode_exists('react_component')) {
                echo do_shortcode('[react_component name="EconomicCrimesDefenseSuite"]');
            }
            ?>
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
