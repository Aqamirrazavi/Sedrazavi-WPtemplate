<?php
/**
 * Template Name: ممیزی هوشمند قراردادها (Contract Auditor)
 * Description: ابزار ممیزی شروط قرارداد، نمره‌دهی ریسک حقوقی و پیشنهاد نگارش جایگزین وکلای پایه یک
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

get_header();
?>

<main class="site-main py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#060B18] min-h-screen">
    <div class="max-w-7xl mx-auto space-y-6">
        <div class="contract-auditor-container">
            <?php echo do_shortcode('[sedrazavi_contract_auditor]'); ?>
        </div>
    </div>
</main>

<?php
get_footer();
