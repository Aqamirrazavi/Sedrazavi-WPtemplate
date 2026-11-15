<?php
/**
 * Safe Static Canvas Wrapper for Elementor Free Theme Builder Fallback
 *
 * Served via template_include without writing executable PHP files into wp-content/uploads/.
 *
 * @package UniversalElementorSuite
 * @since 6.2.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>
<main id="content" class="site-main uas-canvas-main">
    <?php
    if (class_exists('\UniversalElementorSuite\Theme_Builder_Bridge')) {
        echo \UniversalElementorSuite\Theme_Builder_Bridge::render_active_canvas_template();
    }
    ?>
</main>
<?php
get_footer();
