<?php
/**
 * Template Name: نقاط عطف و افق رشد (Firm Milestones)
 * Description: Dedicated page template for firm growth journey and future strategic goals
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-sans" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
        
        <!-- Header Section -->
        <div class="text-center max-w-2xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                🏛️ سفر رشد و چشم‌انداز آینده
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-[#0B132B] dark:text-white">
                نقاط عطف و مسیر تعالی مؤسسه حقوقی
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                داستان پایه‌گذاری، دپارتمان‌های تخصصی، موفقیت‌های ماندگار و افق راهبردی تا سال ۱۴۰۵
            </p>
        </div>

        <!-- React Mount Point for FirmMilestone -->
        <div class="sedrazavi-milestones-page-card">
            <?php echo do_shortcode('[sedrazavi_react_firm_milestones]'); ?>
        </div>

        <!-- Radar Chart of Key Practice Areas -->
        <div class="p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl space-y-4">
            <h3 class="text-xl font-bold font-serif text-gray-900 dark:text-white text-center">
                توزیع صلاحیت‌ها و حوزه‌های تمرکز حقوقی دفتر
            </h3>
            <?php echo do_shortcode('[sedrazavi_react_radar_chart]'); ?>
        </div>
    </div>
</main>

<?php
get_footer();
