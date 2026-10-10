<?php
/**
 * The template for displaying archive pages (Blog & Legal Articles)
 *
 * @package SedRazavi
 * @version 2.5.0
 */

get_header();
?>

<div class="archive-header-banner bg-[#0B132B] text-white py-16 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-l from-[#D4AF37]/10 to-transparent pointer-events-none"></div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold mb-3">
            <span>⚖️</span>
            <span><?php esc_html_e('بانک مقالات و پژوهش‌های حقوقی سید رضوی', 'sedrazavi'); ?></span>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white">
            <?php the_archive_title(); ?>
        </h1>
        <?php if (get_the_archive_description()) : ?>
            <div class="archive-description text-gray-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
                <?php the_archive_description(); ?>
            </div>
        <?php endif; ?>
    </div>
</div>

<section class="archive-posts-section py-16 bg-[#F4F6F9] dark:bg-[#070D1E]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <?php if (have_posts()) : ?>
            
            <!-- 3-Column Luxury Articles Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php while (have_posts()) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white dark:bg-[#0B132B] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group'); ?>>
                        
                        <!-- Article Thumbnail -->
                        <div class="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <?php if (has_post_thumbnail()) : ?>
                                <?php the_post_thumbnail('sedrazavi-service-card', array('class' => 'w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500')); ?>
                            <?php else : ?>
                                <div class="w-full h-full flex items-center justify-center bg-[#0B132B]/10 dark:bg-[#0B132B]/50 text-[#D4AF37]">
                                    <span class="text-4xl font-serif">⚖️</span>
                                </div>
                            <?php endif; ?>

                            <!-- Category Badge -->
                            <div class="absolute top-4 right-4">
                                <?php
                                $categories = get_the_category();
                                if (!empty($categories)) {
                                    echo '<span class="px-3 py-1 bg-[#0B132B]/85 backdrop-blur-sm text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold rounded-lg">' . esc_html($categories[0]->name) . '</span>';
                                }
                                ?>
                            </div>
                        </div>

                        <!-- Card Body -->
                        <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                            <div class="space-y-2">
                                <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                    <span class="flex items-center gap-1">
                                        <svg class="w-3.5 h-3.5 text-sr-gold inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        <span><?php echo get_the_date('j F Y'); ?></span>
                                    </span>
                                    <span>•</span>
                                    <span class="flex items-center gap-1">
                                        <svg class="w-3.5 h-3.5 text-sr-gold inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                        <span><?php echo max(1, round(str_word_count(strip_tags(get_the_content())) / 180)); ?> دقیقه مطالعه</span>
                                    </span>
                                </div>

                                <h2 class="text-xl font-bold font-serif text-[#0B132B] dark:text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h2>

                                <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                                    <?php echo wp_trim_words(get_the_excerpt(), 24); ?>
                                </p>
                            </div>

                            <!-- Card Footer -->
                            <div class="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                <span class="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    <svg class="w-3.5 h-3.5 text-sr-gold inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 20h9"></path>
                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                    </svg>
                                    <span><?php the_author(); ?></span>
                                </span>
                                <a href="<?php the_permalink(); ?>" class="text-xs font-bold text-[#D4AF37] group-hover:translate-x-[-4px] transition-transform flex items-center gap-1">
                                    <span>مطالعه کامل مقاله</span>
                                    <span>‹</span>
                                </a>
                            </div>
                        </div>

                    </article>
                <?php endwhile; ?>
            </div>

            <!-- Custom Gold/Navy Pagination -->
            <div class="posts-pagination mt-12 flex justify-center">
                <?php
                echo paginate_links(array(
                    'prev_text' => '‹ قبلی',
                    'next_text' => 'بعدی ›',
                    'type'      => 'list',
                    'before_page_number' => '<span class="screen-reader-text">' . __('برگه ', 'sedrazavi') . '</span>',
                ));
                ?>
            </div>

        <?php else : ?>
            <div class="bg-white dark:bg-[#0B132B] rounded-2xl p-12 text-center max-w-xl mx-auto border border-gray-200 dark:border-gray-800">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-sr-gold">
                    <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                <h3 class="text-xl font-bold font-serif text-[#0B132B] dark:text-white mb-2"><?php esc_html_e('مقاله‌ای در این آرشیو یافت نشد', 'sedrazavi'); ?></h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-6"><?php esc_html_e('می‌توانید از جستجوی سایت برای یافتن موضوع حقوقی مورد نظر استفاده فرمایید.', 'sedrazavi'); ?></p>
                <a href="<?php echo esc_url(home_url('/')); ?>" class="btn-gold text-xs"><?php esc_html_e('بازگشت به صفحه اصلی', 'sedrazavi'); ?></a>
            </div>
        <?php endif; ?>

    </div>
</section>

<?php
get_footer();
?>
