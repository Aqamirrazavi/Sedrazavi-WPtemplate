<?php
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
            <h1 class="text-2xl font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-2">
                <svg class="w-6 h-6 text-sr-gold inline-block shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span><?php printf(esc_html__('نتایج جستجو برای: %s', 'sedrazavi'), '<span class="text-[#D4AF37]">' . get_search_query() . '</span>'); ?></span>
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
