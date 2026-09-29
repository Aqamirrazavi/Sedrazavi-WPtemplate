<?php
/**
 * برگه نمایش تکی مقالات و اخبار حقوقی SedRazavi Law Firm
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="sedrazavi-single-article min-h-screen py-10 bg-[#070D1E] text-slate-100">
    <div class="container mx-auto px-4 max-w-4xl">
        <?php
        while (have_posts()) :
            the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('space-y-6'); ?>>
                <header class="space-y-4 pb-6 border-b border-slate-800">
                    <h1 class="text-2xl sm:text-4xl font-bold font-serif text-[#D4AF37]">
                        <?php the_title(); ?>
                    </h1>
                    <div class="flex items-center gap-4 text-xs text-slate-400">
                        <span>تاریخ انتشار: <?php echo get_the_date(); ?></span>
                        <span>نویسنده: <?php the_author(); ?></span>
                    </div>
                </header>

                <?php if (has_post_thumbnail()) : ?>
                    <div class="rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                        <?php the_post_thumbnail('full', array('class' => 'w-full h-auto object-cover')); ?>
                    </div>
                <?php endif; ?>

                <div class="entry-content text-slate-200 leading-relaxed space-y-4 prose prose-invert max-w-none">
                    <?php the_content(); ?>
                </div>

                <footer class="pt-6 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                    <div>
                        <?php the_category(' ، '); ?>
                    </div>
                    <div>
                        <?php the_tags('<span class="text-[#D4AF37]">برچسب‌ها:</span> ', ' ، '); ?>
                    </div>
                </footer>
            </article>
            <?php
        endwhile;
        ?>
    </div>
</div>

<?php
get_footer();
