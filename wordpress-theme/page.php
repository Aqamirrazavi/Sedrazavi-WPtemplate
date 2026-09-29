<?php
/**
 * The template for displaying all pages
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

// بررسی سازگاری امن با المنتور
$is_elementor = false;
if ( did_action( 'elementor/loaded' ) && class_exists( 'Elementor\Plugin' ) ) {
    $elementor_instance = call_user_func( array( 'Elementor\Plugin', 'instance' ) );
    if ( $elementor_instance && isset( $elementor_instance->preview ) && is_object( $elementor_instance->preview ) ) {
        if ( method_exists( $elementor_instance->preview, 'is_preview_mode' ) && $elementor_instance->preview->is_preview_mode() ) {
            $is_elementor = true;
        }
    }
    if ( $elementor_instance && isset( $elementor_instance->editor ) && is_object( $elementor_instance->editor ) ) {
        if ( method_exists( $elementor_instance->editor, 'is_edit_mode' ) && $elementor_instance->editor->is_edit_mode() ) {
            $is_elementor = true;
        }
    }
}
if ( ! $is_elementor && is_singular() ) {
    $mode = get_post_meta( get_the_ID(), '_elementor_edit_mode', true );
    if ( $mode === 'builder' ) {
        $is_elementor = true;
    }
}

if ( $is_elementor ) :
    while ( have_posts() ) : the_post();
        the_content();
    endwhile;
else :
?>
<div id="primary" class="content-area py-16 bg-[#060B18] text-slate-100 min-h-[70vh]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('bg-[#0B132B] rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-2xl'); ?>>
                <?php if (!is_front_page()) : ?>
                    <header class="entry-header mb-8 pb-6 border-b border-slate-800 flex items-center gap-3">
                        <span class="w-2.5 h-8 bg-gradient-to-b from-[#D4AF37] to-[#AA820A] rounded-full inline-block"></span>
                        <h1 class="text-2xl sm:text-4xl font-serif font-bold text-white"><?php the_title(); ?></h1>
                    </header>
                <?php endif; ?>

                <div class="entry-content text-base leading-loose text-slate-300">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php endwhile; ?>
    </div>
</div>
<?php
endif;

get_footer();
?>
