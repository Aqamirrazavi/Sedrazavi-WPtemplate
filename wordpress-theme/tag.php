<?php
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
