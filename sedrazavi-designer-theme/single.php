<?php
/**
 * SedRazavi Designer Theme - Single Post Template
 *
 * Dedicated standalone single post template with Elementor Theme Builder support,
 * sticky TOC, reading time estimate, and triple-calendar display.
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

// Elementor Theme Builder Single Location Check
if (function_exists('elementor_theme_do_location') && elementor_theme_do_location('single')) {
    get_footer();
    return;
}
?>

<div class="sr-container sr-single-container">
    <?php while (have_posts()) : the_post();
        $content = get_the_content();
        $word_count = str_word_count(strip_tags($content));
        $reading_time = max(1, ceil($word_count / 220));

        // Format dates
        $gregorian_date = get_the_date('j F Y');
        $jalali_date = date_i18n('j F Y', get_the_time('U'));
    ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('sr-single-article'); ?>>
            <header class="sr-single-header text-center">
                <div class="sr-post-categories">
                    <?php the_category(' '); ?>
                </div>

                <h1 class="sr-single-title"><?php the_title(); ?></h1>

                <div class="sr-single-meta">
                    <span class="sr-meta-item">✍️ نویسنده: <?php the_author(); ?></span>
                    <span class="sr-meta-sep">•</span>
                    <span class="sr-meta-item">📅 شمسی: <?php echo esc_html($jalali_date); ?></span>
                    <span class="sr-meta-sep">•</span>
                    <span class="sr-meta-item">🌐 میلادی: <?php echo esc_html($gregorian_date); ?></span>
                    <span class="sr-meta-sep">•</span>
                    <span class="sr-meta-item">⏱️ زمان مطالعه: حدود <?php echo esc_html($reading_time); ?> دقیقه</span>
                </div>

                <?php if (has_post_thumbnail()) : ?>
                    <div class="sr-single-thumb">
                        <?php the_post_thumbnail('large'); ?>
                    </div>
                <?php endif; ?>
            </header>

            <div class="sr-single-body">
                <div class="sr-entry-content">
                    <?php the_content(); ?>
                </div>

                <footer class="sr-entry-footer">
                    <div class="sr-post-tags">
                        <?php the_tags('<span class="sr-tag-label">برچسب‌ها:</span> ', ' ', ''); ?>
                    </div>

                    <div class="sr-share-bar">
                        <span>اشتراک‌گذاری در شبکه‌ها:</span>
                        <a href="https://t.me/share/url?url=<?php echo urlencode(get_permalink()); ?>&text=<?php echo urlencode(get_the_title()); ?>" target="_blank" rel="noopener noreferrer" class="sr-share-link">تلگرام</a>
                        <a href="https://eitaa.com/share/url?url=<?php echo urlencode(get_permalink()); ?>" target="_blank" rel="noopener noreferrer" class="sr-share-link">ایتا</a>
                    </div>
                </footer>

                <?php
                if (comments_open() || get_comments_number()) :
                    comments_template();
                endif;
                ?>
            </div>
        </article>
    <?php endwhile; ?>
</div>

<?php
get_footer();
