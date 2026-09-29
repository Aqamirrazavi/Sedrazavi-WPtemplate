<?php
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
