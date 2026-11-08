<?php
/**
 * SedRazavi Designer Theme - Single Post Template
 *
 * Dedicated standalone single post template with Elementor Theme Builder support,
 * and 4 distinct selectable layout archetypes (Classic Sticky TOC, Cyber Full-Width,
 * Tech Magazine, and Minimalist Clean Reader).
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

while (have_posts()) : the_post();
    $content = get_the_content();
    $word_count = str_word_count(strip_tags($content));
    $reading_time = max(1, ceil($word_count / 220));

    // Format dates (Triple Calendar)
    $gregorian_date = get_the_date('j F Y');
    $jalali_date = date_i18n('j F Y', get_the_time('U'));

    // Determine layout archetype: classic, cyber, magazine, reader
    $layout = isset($_GET['layout']) ? sanitize_text_field($_GET['layout']) : get_post_meta(get_the_ID(), '_sr_single_layout', true);
    if (!in_array($layout, ['classic', 'cyber', 'magazine', 'reader'], true)) {
        $layout = 'classic';
    }
?>

<?php if ('reader' === $layout) : ?>
    <!-- Layout 4: Minimalist Clean Reader with Reading Progress Indicator -->
    <div class="sr-reading-progress-bar" id="sr-reading-progress"></div>
<?php endif; ?>

<div class="sr-container sr-single-container sr-single-layout-<?php echo esc_attr($layout); ?>">
    
    <!-- Layout Switcher Bar (Demo & Tester Controls) -->
    <div class="sr-layout-switcher-pill">
        <span class="sr-switcher-label">چیدمان الگو:</span>
        <a href="<?php echo esc_url(add_query_arg('layout', 'classic')); ?>" class="sr-switch-link <?php echo $layout === 'classic' ? 'is-active' : ''; ?>">کلاسیک با TOC</a>
        <a href="<?php echo esc_url(add_query_arg('layout', 'cyber')); ?>" class="sr-switch-link <?php echo $layout === 'cyber' ? 'is-active' : ''; ?>">تمام‌عرض سایبر</a>
        <a href="<?php echo esc_url(add_query_arg('layout', 'magazine')); ?>" class="sr-switch-link <?php echo $layout === 'magazine' ? 'is-active' : ''; ?>">مجله‌ای تحلیلی</a>
        <a href="<?php echo esc_url(add_query_arg('layout', 'reader')); ?>" class="sr-switch-link <?php echo $layout === 'reader' ? 'is-active' : ''; ?>">حالت خواندن متمرکز</a>
    </div>

    <article id="post-<?php the_ID(); ?>" <?php post_class('sr-single-article'); ?>>
        
        <?php if ('cyber' === $layout) : ?>
            <!-- Layout 2: Modern Cyber Full-Width Header -->
            <header class="sr-cyber-cinematic-header">
                <?php if (has_post_thumbnail()) : ?>
                    <div class="sr-cinematic-backdrop">
                        <?php the_post_thumbnail('full'); ?>
                        <div class="sr-cinematic-overlay"></div>
                    </div>
                <?php endif; ?>
                <div class="sr-cinematic-content text-center">
                    <span class="sr-badge-pill sr-badge-primary">مطلب تخصصی معماری نئونی</span>
                    <h1 class="sr-single-title"><?php the_title(); ?></h1>
                    <div class="sr-single-meta">
                        <span>📅 شمسی: <?php echo esc_html($jalali_date); ?></span>
                        <span>🌐 میلادی: <?php echo esc_html($gregorian_date); ?></span>
                        <span>⏱️ زمان مطالعه: <?php echo esc_html($reading_time); ?> دقیقه</span>
                    </div>
                </div>
            </header>
        <?php else : ?>
            <!-- Default / Classic / Magazine / Reader Header -->
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

                <?php if (has_post_thumbnail() && 'reader' !== $layout) : ?>
                    <div class="sr-single-thumb">
                        <?php the_post_thumbnail('large'); ?>
                    </div>
                <?php endif; ?>
            </header>
        <?php endif; ?>

        <?php if ('magazine' === $layout) : ?>
            <!-- Layout 3: Tech Magazine Key Takeaways Box -->
            <div class="sr-magazine-takeaways-card">
                <div class="sr-takeaway-head">
                    <span class="sr-takeaway-icon">💡</span>
                    <h4>نکات کلیدی مقاله در یک نگاه (Executive Summary)</h4>
                </div>
                <p><?php echo wp_trim_words(get_the_excerpt(), 35, '...'); ?></p>
            </div>
        <?php endif; ?>

        <div class="sr-single-layout-wrapper <?php echo $layout === 'classic' ? 'has-sidebar' : ''; ?>">
            
            <?php if ('classic' === $layout) : ?>
                <!-- Layout 1: Classic Sticky Table of Contents (TOC) -->
                <aside class="sr-sticky-toc-sidebar">
                    <div class="sr-toc-card">
                        <h4 class="sr-toc-title">📑 فهرست سرفصل‌ها</h4>
                        <ul class="sr-toc-list" id="sr-article-toc">
                            <li><a href="#sec-intro">مقدمه و شروع بحث</a></li>
                            <li><a href="#sec-body">بررسی راهکارها و جزئیات</a></li>
                            <li><a href="#sec-summary">نتیجه‌گیری و جمع‌بندی</a></li>
                        </ul>
                        <div class="sr-toc-share">
                            <span>اشتراک‌گذاری:</span>
                            <a href="https://t.me/share/url?url=<?php echo urlencode(get_permalink()); ?>" target="_blank" rel="noopener noreferrer" class="sr-btn sr-btn-xs sr-btn-outline">تلگرام</a>
                            <a href="https://eitaa.com/share/url?url=<?php echo urlencode(get_permalink()); ?>" target="_blank" rel="noopener noreferrer" class="sr-btn sr-btn-xs sr-btn-outline">ایتا</a>
                        </div>
                    </div>
                </aside>
            <?php endif; ?>

            <div class="sr-single-body">
                <div class="sr-entry-content" id="sr-article-body">
                    <?php the_content(); ?>
                </div>

                <footer class="sr-entry-footer">
                    <div class="sr-post-tags">
                        <?php the_tags('<span class="sr-tag-label">برچسب‌ها:</span> ', ' ', ''); ?>
                    </div>

                    <div class="sr-share-bar">
                        <span>اشتراک‌گذاری در پیام‌رسان‌ها:</span>
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
        </div>
    </article>
</div>

<?php
endwhile;

get_footer();
