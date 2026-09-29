<?php
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
