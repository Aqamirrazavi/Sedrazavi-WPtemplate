<?php
/**
 * Standalone Main Index Template
 *
 * @package sedrazavi-clinic-theme
 */

get_header();
?>
<main id="primary" class="site-main" style="max-width: 1200px; margin: 40px auto; padding: 0 16px;">
    <?php
    if (have_posts()) :
        while (have_posts()) : the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="margin-bottom: 40px;">
                <h1 class="entry-title" style="color: #fff; margin-bottom: 16px;"><?php the_title(); ?></h1>
                <div class="entry-content" style="color: #CBD5E1; line-height: 1.8;">
                    <?php the_content(); ?>
                </div>
            </article>
            <?php
        endwhile;
    else :
        ?>
        <p style="color: #94A3B8;">هیچ محتوایی یافت نشد.</p>
        <?php
    endif;
    ?>
</main>
<?php
get_footer();
