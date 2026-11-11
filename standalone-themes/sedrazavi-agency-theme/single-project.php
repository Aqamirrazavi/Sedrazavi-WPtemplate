<?php
/**
 * Single Project Template for Agency Child Theme
 *
 * @package SedRazavi_Child_Agency
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<article class="sr-agency-single-project py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100 min-h-screen" dir="rtl">
    <div class="max-w-5xl mx-auto space-y-8">
        
        <div class="space-y-4">
            <a href="<?php echo esc_url(home_url('/#portfolio')); ?>" class="text-xs text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1">
                ← بازگشت به گالری نمونه‌کارها
            </a>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-white">
                <?php the_title(); ?>
            </h1>
            <div class="flex flex-wrap items-center gap-4 text-xs text-slate-400 pb-4 border-b border-slate-800">
                <span>دسته‌بندی: طراحی رابط و تجربه کاربری (UI/UX)</span>
                <span>•</span>
                <span>سال اجرا: ۲۰۲۶</span>
                <span>•</span>
                <span class="text-emerald-400 font-semibold">پروژه تکمیل‌شده و تحویل نهایی</span>
            </div>
        </div>

        <?php if (has_post_thumbnail()): ?>
            <div class="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                <?php the_post_thumbnail('full', ['class' => 'w-full h-auto object-cover']); ?>
            </div>
        <?php endif; ?>

        <div class="p-8 rounded-3xl bg-slate-900 border border-slate-800 prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed">
            <?php
            while (have_posts()) : the_post();
                the_content();
            endwhile;
            ?>
        </div>

    </div>
</article>

<?php
get_footer();
