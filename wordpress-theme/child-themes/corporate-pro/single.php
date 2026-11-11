<?php
/**
 * Standalone Single Post Template
 *
 * @package sedrazavi-corporate-theme
 */

get_header();
?>
<main id="primary" class="site-main" style="max-width: 900px; margin: 40px auto; padding: 0 16px;">
    <?php
    while (have_posts()) : the_post();
        ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <h1 style="color: #fff; margin-bottom: 20px; font-size: 28px;"><?php the_title(); ?></h1>
            <div class="entry-content" style="color: #E2E8F0; line-height: 1.9; font-size: 16px;">
                <?php the_content(); ?>
            </div>
        </article>
        <?php
    endwhile;
    ?>
</main>
<?php
get_footer();
