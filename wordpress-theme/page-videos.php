<?php
/**
 * Template Name: آرشیو و نمایش ویدئوها (Video Archive Hub)
 * Description: Dedicated Video Hub template with interactive player, categories, and direct download links.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-video-archive-container" dir="rtl" style="min-height: 80vh; background-color: var(--sr-bg-body, #070D1E); color: #F0F6FC; padding: 40px 16px;">
    <div class="container" style="max-width: 1200px; margin: 0 auto;">
        
        <!-- Header & Breadcrumbs -->
        <div style="margin-bottom: 32px; text-align: center;">
            <span style="display: inline-block; padding: 4px 12px; background: rgba(212, 175, 55, 0.15); color: #D4AF37; border-radius: 9999px; font-size: 13px; font-weight: bold; border: 1px solid rgba(212, 175, 55, 0.3); margin-bottom: 12px;">
                🎬 رسانه و مدیا سنتر
            </span>
            <h1 style="font-size: 32px; font-weight: 800; color: #FFFFFF; margin: 0 0 12px 0;">
                <?php esc_html_e('آرشیو جامع ویدئوها و تحلیل‌های تصویری', 'sedrazavi'); ?>
            </h1>
            <p style="color: #94A3B8; font-size: 15px; max-width: 600px; margin: 0 auto;">
                <?php esc_html_e('مشاهده آموزش‌های ویدیویی، تحلیل پرونده‌های شاخص، وبینارهای تخصصی و گفتگوهای کارشناسی', 'sedrazavi'); ?>
            </p>
        </div>

        <!-- React Mount or Native Fallback -->
        <div id="sedrazavi-video-hub-app">
            <?php
            // If React bundle is present, it hydrates here; otherwise render native WordPress loop
            if (have_posts()) :
                while (have_posts()) : the_post();
                    the_content();
                endwhile;
            endif;
            ?>
        </div>

    </div>
</div>

<?php
get_footer();
