<?php
/**
 * برگه استاندارد پوسته وردپرس SedRazavi Law Firm
 * 
 * پشتیبانی کامل از محتوای برگه‌ها، برگه‌ساز المنتور (Elementor) و شورت‌کدهای React.
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="sedrazavi-page-wrapper min-h-screen py-8">
    <div class="container mx-auto px-4">
        <?php
        while (have_posts()) :
            the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <div class="entry-content">
                    <?php
                    the_content();

                    wp_link_pages(array(
                        'before' => '<div class="page-links">' . esc_html__('برگه‌ها:', 'sedrazavi'),
                        'after'  => '</div>',
                    ));
                    ?>
                </div>
            </article>
            <?php
        endwhile;
        ?>
    </div>
</div>

<?php
get_footer();
