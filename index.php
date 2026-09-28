<?php
/**
 * برگه اصلی پوسته وردپرس SedRazavi Law Firm
 * 
 * این فایل نقطه ورود اصلی (Main Entry Point) پوسته هایبرید وردپرس است.
 * هم به عنوان کانتینر اجرای اپلیکیشن فوق‌پیشرفته React عمل می‌کند و هم در صورت
 * نیاز، محتوای استاندارد نوشته‌ها یا برگه‌ساز المنتور را درون خود رندر می‌نماید.
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main">
    <!-- کانتینر اصلی اپلیکیشن فرانت‌اند React -->
    <div id="root">
        <?php
        // در صورت وجود محتوای سروری وردپرس (جهت سازگاری با سئو و موتورهای جستجو)
        if (have_posts()) :
            while (have_posts()) :
                the_post();
                ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('sr-only'); ?>>
                    <h1><?php the_title(); ?></h1>
                    <div class="entry-content">
                        <?php the_content(); ?>
                    </div>
                </article>
                <?php
            endwhile;
        endif;
        ?>
        <!-- اسکلت پیش‌بارگذار تا زمان اجرای ری‌اکت -->
        <noscript>
            <div style="padding: 2rem; text-align: center; color: #fff; background: #0B132B;">
                <h2>دفتر وکالت و مشاوره حقوقی سیده مریم رضوی</h2>
                <p>جهت مشاهده کامل امکانات تعاملی، استعلام آنلاین پرونده‌ها و محاسبه‌گرهای قضایی، جاوااسکریپت مرورگر خود را فعال کنید.</p>
            </div>
        </noscript>
    </div>
</main>

<?php
get_footer();
