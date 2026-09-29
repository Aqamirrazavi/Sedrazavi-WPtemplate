<?php
/**
 * Template Name: تنظیم دادخواست و لوایح عدل‌ایران
 * Description: فرم‌ساز هوشمند دادخواست، شکواییه و لوایح تجدیدنظر با قالب رسمی قوه قضائیه
 *
 * @package SedRazavi_Law_Firm
 * @version 5.0.0
 */

get_header();
?>

<main class="site-main py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] min-h-screen">
    <div class="max-w-7xl mx-auto space-y-6">
        
        <div class="petition-generator-container">
            <?php echo do_shortcode('[sedrazavi_petition_builder]'); ?>
        </div>

    </div>
</main>

<?php
get_footer();
