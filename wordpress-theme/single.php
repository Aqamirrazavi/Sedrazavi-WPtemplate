<?php
/**
 * The template for displaying all single posts
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-xl space-y-8'); ?>>
                
                <!-- Article Header -->
                <header class="space-y-4 border-b border-gray-100 dark:border-gray-800 pb-6">
                    <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span class="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] font-bold rounded-lg"><?php the_category(', '); ?></span>
                        <span>•</span>
                        <span>📅 <?php echo get_the_date('j F Y'); ?></span>
                        <span>•</span>
                        <span>⏱️ <?php echo max(1, round(str_word_count(strip_tags(get_the_content())) / 180)); ?> دقیقه مطالعه</span>
                    </div>
                    <h1 class="text-2xl sm:text-4xl font-bold font-serif text-[#0B132B] dark:text-white leading-tight">
                        <?php the_title(); ?>
                    </h1>
                </header>

                <!-- Featured Image -->
                <?php if (has_post_thumbnail()) : ?>
                    <div class="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                        <?php the_post_thumbnail('large', array('class' => 'w-full h-auto object-cover max-h-[480px]')); ?>
                    </div>
                <?php endif; ?>

                <!-- Post Body Content -->
                <div class="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                    <?php the_content(); ?>
                </div>

                <!-- Tags -->
                <?php if (has_tag()) : ?>
                    <div class="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-2">
                        <span class="text-xs text-gray-400">🏷️ <?php esc_html_e('برچسب‌ها:', 'sedrazavi'); ?></span>
                        <?php the_tags('<span class="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300">', '</span> <span class="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300">', '</span>'); ?>
                    </div>
                <?php endif; ?>

                <!-- Author Box -->
                <div class="bg-[#F4F6F9] dark:bg-gray-900/60 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center gap-5">
                    <div class="w-16 h-16 rounded-full bg-[#0B132B] text-[#D4AF37] flex items-center justify-center font-serif text-2xl font-bold">
                        ⚖️
                    </div>
                    <div>
                        <h4 class="font-bold text-sm text-[#0B132B] dark:text-white"><?php the_author(); ?></h4>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1"><?php echo get_the_author_meta('description') ?: 'وکیل پایه یک دادگستری و مشاور تخصصی دعاوی حقوقی، تجاری و کیفری.'; ?></p>
                    </div>
                </div>

                <!-- Comments Section -->
                <?php
                if (comments_open() || get_comments_number()) :
                    comments_template();
                endif;
                ?>

            </article>
        <?php endwhile; ?>
    </div>
</div>

<?php get_footer(); ?>
