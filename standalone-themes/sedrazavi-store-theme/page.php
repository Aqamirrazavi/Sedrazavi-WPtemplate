<?php
/**
 * Standalone Page Template
 *
 * @package sedrazavi-store-theme
 */

get_header();
?>
<main id="primary" class="site-main" style="max-width: 1200px; margin: 40px auto; padding: 0 16px;">
    <?php
    while (have_posts()) : the_post();
        the_content();
    endwhile;
    ?>
</main>
<?php
get_footer();
