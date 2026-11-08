<?php
/**
 * Template Name: Elementor Canvas (Sedrazavi)
 * Template Post Type: page, post, portfolio, services
 *
 * Dedicated blank canvas template for Elementor landing pages without theme header or footer.
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> dir="rtl" <?php if (function_exists('sedrazavi_designer_html_attributes')) sedrazavi_designer_html_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class('sr-canvas-body'); ?>>
<?php wp_body_open(); ?>

<div class="sr-elementor-canvas-wrapper" id="content">
    <?php
    while (have_posts()) :
        the_post();
        the_content();
    endwhile;
    ?>
</div>

<?php wp_footer(); ?>
</body>
</html>
