<?php
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
