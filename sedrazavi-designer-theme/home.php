<?php
/**
 * SedRazavi Designer Theme - Blog Index Template
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
        <span class="sr-badge-pill">مقالات و آموزش‌های تخصصی</span>
        <h1 class="sr-page-title">وبلاگ معماری بدون کد و ترفندهای المنتور</h1>
        <p class="sr-page-desc">جدیدترین راهکارها، مقایسه‌ها و ترفندهای افزایش نرخ تبدیل و بهینه‌سازی وب‌سایت</p>
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
            <span class="sr-empty-icon">✍️</span>
            <h3>هنوز مطلبی منتشر نشده است</h3>
            <p>به زودی مقالات و آموزش‌های تخصصی طراحی در این بخش قرار می‌گیرند.</p>
            <a href="<?php echo esc_url(home_url('/')); ?>" class="sr-btn sr-btn-sm sr-btn-glow">بازگشت به خانه</a>
        </div>
    <?php endif; ?>
</div>

<?php
get_footer();
