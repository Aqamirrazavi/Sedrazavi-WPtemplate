<?php
/**
 * Template Name: سناریوهای مدرن اینترفیس (Multi-Scenario Layouts)
 * Template Post Type: page
 *
 * Provides dedicated page rendering for the 3 layout archetypes:
 * - Bento-Grid HUD Hub
 * - 3-Column Dense Data Matrix
 * - Hybrid Executive Contrast
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();

$active_scenario = sedrazavi_scenario()->get_active_scenario();
?>

<main id="primary" class="site-main min-h-screen bg-[#06080F] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto space-y-8">
        <!-- Scenario Switcher Bar in PHP -->
        <div class="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1 class="text-xl font-bold font-serif text-white">
                    <?php esc_html_e('سامانه جامع سناریوهای اینترفیس وردپرس', 'sedrazavi'); ?>
                </h1>
                <p class="text-xs text-slate-400 mt-0.5">
                    <?php esc_html_e('چیدمان‌های پیشرفته با الهام از داشبوردهای سازمانی، بنتوگرید و جداول متراکم داده', 'sedrazavi'); ?>
                </p>
            </div>

            <!-- Switcher Tabs -->
            <div class="flex items-center gap-2 text-xs font-semibold">
                <a href="<?php echo esc_url(add_query_arg('scenario', 'bento-hud')); ?>" class="px-3.5 py-2 rounded-xl transition-all <?php echo $active_scenario === 'bento-hud' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'; ?>">
                    <?php esc_html_e('بنتوگرید HUD', 'sedrazavi'); ?>
                </a>
                <a href="<?php echo esc_url(add_query_arg('scenario', 'dense-matrix')); ?>" class="px-3.5 py-2 rounded-xl transition-all <?php echo $active_scenario === 'dense-matrix' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'; ?>">
                    <?php esc_html_e('ماتریس ۳ ستونه', 'sedrazavi'); ?>
                </a>
                <a href="<?php echo esc_url(add_query_arg('scenario', 'hybrid-executive')); ?>" class="px-3.5 py-2 rounded-xl transition-all <?php echo $active_scenario === 'hybrid-executive' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'; ?>">
                    <?php esc_html_e('هایبرید تشریفاتی', 'sedrazavi'); ?>
                </a>
            </div>
        </div>

        <!-- Render Target Scenario Template Part -->
        <div class="uas-scenario-active-viewport">
            <?php
            if ($active_scenario === 'dense-matrix') {
                get_template_part('template-parts/scenarios/dense-matrix');
            } elseif ($active_scenario === 'hybrid-executive') {
                get_template_part('template-parts/scenarios/hybrid-executive');
            } else {
                get_template_part('template-parts/scenarios/bento-hud');
            }
            ?>
        </div>
    </div>
</main>

<?php
get_footer();
