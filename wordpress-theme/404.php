<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="py-20 bg-[#F4F6F9] dark:bg-[#070D1E] flex items-center justify-center min-h-[70vh]">
    <div class="container mx-auto px-4 text-center max-w-lg space-y-6">
        <div class="text-7xl sm:text-9xl font-bold font-serif text-[#0B132B] dark:text-white flex items-center justify-center gap-2">
            <span>۴</span>
            <span class="text-[#D4AF37] animate-bounce">⚖️</span>
            <span>۴</span>
        </div>
        <h1 class="text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
            <?php esc_html_e('صفحه مورد نظر شما یافت نشد!', 'sedrazavi'); ?>
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
            <?php esc_html_e('ممکن است آدرس صفحه تغییر کرده باشد یا موقتاً در دسترس نباشد.', 'sedrazavi'); ?>
        </p>
        <div class="pt-4 flex justify-center gap-4">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="btn-gold py-2.5 px-6 text-sm">
                <span>بازگشت به صفحه اصلی</span>
            </a>
        </div>
    </div>
</div>

<?php get_footer(); ?>
