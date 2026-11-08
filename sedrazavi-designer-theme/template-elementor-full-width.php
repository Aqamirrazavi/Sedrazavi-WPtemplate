<?php
/**
 * Template Name: Elementor Full Width (Sedrazavi)
 * Template Post Type: page, post, portfolio, services
 *
 * Dedicated 100% full-width template for Elementor pages with theme header and footer.
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="sr-elementor-full-width-wrapper" id="content">
    <?php
    while (have_posts()) :
        the_post();
        the_content();
    endwhile;
    ?>
</div>

<?php
get_footer();
