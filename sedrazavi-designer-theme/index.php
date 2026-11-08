<?php
/**
 * SedRazavi Designer Theme - Main Index Fallback
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="sr-container sr-page-container">
    <?php if (have_posts()) : ?>
        <div class="sr-default-content">
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <h1 class="sr-page-title"><?php the_title(); ?></h1>
                    <div class="sr-entry-content">
                        <?php the_content(); ?>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>
    <?php else : ?>
        <p><?php esc_html_e('محتوایی یافت نشد.', 'sedrazavi-designer'); ?></p>
    <?php endif; ?>
</div>

<?php
get_footer();
