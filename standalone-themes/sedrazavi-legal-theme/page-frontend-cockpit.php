<?php
/**
 * Template Name: Frontend Management Cockpit
 *
 * Dedicated standalone page template rendering the Universal Frontend Management Cockpit
 *
 * @package SedRazavi
 * @version 6.0.0
 */

get_header();
?>

<main id="primary" class="site-main sr-cockpit-page-container" style="min-height: 80vh; padding: 40px 16px;">
    <?php echo do_shortcode('[sedrazavi_frontend_cockpit]'); ?>
</main>

<?php
get_footer();
