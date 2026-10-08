<?php
/**
 * Template Name: المنتور تمام‌عرض (Elementor Full Width)
 * Template Post Type: post, page, service, article, case
 * Description: قالب تمام‌عرض استاندارد سازگار با المنتور همراه با سربرگ و پابرگ اصلی پوسته
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main elementor-full-width-wrapper w-full overflow-hidden">
    <?php
    while (have_posts()) : the_post();
        the_content();
    endwhile;
    ?>
</main>

<?php
get_footer();
