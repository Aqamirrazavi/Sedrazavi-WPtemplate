<?php
/**
 * Standalone Page Template
 *
 * @package sedrazavi-news-theme
 */

get_header();
?>
<main id="primary" class="site-main" style="max-width: 1200px; margin: 40px auto; padding: 0 16px;">
    <?php
    $rendered_by_elementor = function_exists('sedrazavi_standalone_try_render_elementor')
        && sedrazavi_standalone_try_render_elementor('template-archive-blog-grid');
    if (!$rendered_by_elementor) :
        while (have_posts()) : the_post();
            the_content();
        endwhile;
    endif;
    ?>
</main>
<?php
get_footer();
