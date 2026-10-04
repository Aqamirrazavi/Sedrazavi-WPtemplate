<?php
/**
 * Template Name: تایم‌لاین تعاملی پرونده (Case Interactive Timeline)
 * Description: Dedicated page template for interactive case milestones roadmap
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();

$case_id = isset($_GET['case_id']) ? sanitize_text_field($_GET['case_id']) : 'c-01';
$case_number = isset($_GET['case_number']) ? sanitize_text_field($_GET['case_number']) : '۱۴۰۳-۹۸۲۷۳-ونک';
?>

<main class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-sans" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
        
        <!-- Header Section -->
        <div class="text-center max-w-2xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                ⚖️ جدول زمانی و نقشه دادرسی
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-[#0B132B] dark:text-white">
                تایم‌لاین تعاملی پرونده و مواعد دادگاه
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                مشاهده گام‌به‌گام تاریخچه اقدامات قضایی، جلسات پیش‌رو، لوایح و پیش‌بینی موعد صدور رأی قطعی
            </p>
        </div>

        <!-- React Mount Point for CaseInteractiveTimeline -->
        <div class="sedrazavi-timeline-page-card">
            <?php echo do_shortcode('[sedrazavi_react_case_timeline case_id="' . esc_attr($case_id) . '" case_number="' . esc_attr($case_number) . '"]'); ?>
        </div>

        <!-- Support Box -->
        <div class="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="space-y-1 text-right">
                <h4 class="text-sm font-bold text-gray-900 dark:text-white">
                    نیاز به توضیح تکمیلی پیرامون اوقات رسیدگی دارید؟
                </h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                    وکلای همکار دفتر دکتر رضوی در ساعات اداری پاسخگوی سوالات شما در خصوص پرونده هستند.
                </p>
            </div>
            <a href="<?php echo esc_url(home_url('/contact')); ?>" class="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C4981C] text-[#0B132B] font-bold text-xs shadow-md transition-colors shrink-0">
                ارتباط با دبیرخانه دفتر ونک
            </a>
        </div>
    </div>
</main>

<?php
get_footer();
