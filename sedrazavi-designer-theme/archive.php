<?php
/**
 * SedRazavi Designer Theme - Archive Template
 *
 * Dedicated standalone archive template with Elementor Theme Builder compatibility.
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

// Elementor Theme Builder Archive Location Check
if (function_exists('elementor_theme_do_location') && elementor_theme_do_location('archive')) {
    get_footer();
    return;
}
?>

<div class="sr-container sr-page-container">
    <div class="sr-page-header text-center">
        <span class="sr-badge-pill">بایگانی مقالات و آموزش‌ها</span>
        <h1 class="sr-page-title"><?php the_archive_title(); ?></h1>
        <?php the_archive_description('<div class="sr-page-desc">', '</div>'); ?>
    </div>

    <?php if (have_posts()) : ?>
        <div class="sr-blog-grid">
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('sr-card sr-blog-card'); ?>>
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="sr-blog-thumb">
                            <a href="<?php the_permalink(); ?>">
                                <?php the_post_thumbnail('medium'); ?>
                            </a>
                        </div>
                    <?php endif; ?>

                    <div class="sr-blog-content">
                        <div class="sr-blog-meta">
                            <span>📅 <?php echo esc_html(date_i18n('j F Y', get_the_time('U'))); ?></span>
                        </div>
                        <h2 class="sr-blog-title">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h2>
                        <p class="sr-blog-excerpt">
                            <?php echo wp_trim_words(get_the_excerpt(), 22, '...'); ?>
                        </p>
                        <a href="<?php the_permalink(); ?>" class="sr-link-accent">ادامه مطالعه مطلب &larr;</a>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>

        <div class="sr-pagination-wrap text-center">
            <?php
            the_posts_pagination([
                'mid_size'  => 2,
                'prev_text' => '← قبلی',
                'next_text' => 'بعدی →',
            ]);
            ?>
        </div>
    <?php else : ?>
        <div class="sr-empty-state text-center">
            <span class="sr-empty-icon">📂</span>
            <h3>مطلبی در این بایگانی یافت نشد</h3>
            <p>می‌توانید به صفحه اصلی بازگردید یا از جستجو استفاده کنید.</p>
            <a href="<?php echo esc_url(home_url('/')); ?>" class="sr-btn sr-btn-sm sr-btn-glow">صفحه اصلی</a>
        </div>
    <?php endif; ?>
</div>

<?php
get_footer();
