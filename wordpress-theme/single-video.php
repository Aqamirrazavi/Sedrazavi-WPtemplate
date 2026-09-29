<?php
/**
 * Single Video Template
 *
 * @package SedRazavi
 * @version 2.0.0
 */

get_header();
?>

<div class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <?php while (have_posts()) : the_post(); 
            $video_url = get_post_meta(get_the_ID(), '_sedrazavi_video_url', true);
            $duration = get_post_meta(get_the_ID(), '_sedrazavi_video_duration', true) ?: '۱۰ دقیقه';
            $speaker = get_post_meta(get_the_ID(), '_sedrazavi_video_speaker', true) ?: 'وکیل سید رضوی';
        ?>
            <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
                
                <!-- Video Player Container -->
                <div class="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl flex items-center justify-center">
                    <?php if (!empty($video_url)) : ?>
                        <iframe class="w-full h-full" src="<?php echo esc_url($video_url); ?>" title="<?php the_title_attribute(); ?>" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <?php else : ?>
                        <div class="text-center p-8 text-white">
                            <span class="text-5xl block mb-2">🎬</span>
                            <p class="text-sm text-gray-400">ویدیو به زودی بارگذاری می‌شود.</p>
                        </div>
                    <?php endif; ?>
                </div>

                <!-- Video Title & Meta -->
                <div class="space-y-3 border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span class="bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-md font-bold">🎬 سخنرانی حقوقی</span>
                        <span>⏱️ زمان: <?php echo esc_html($duration); ?></span>
                        <span>🎙️ مدرس: <?php echo esc_html($speaker); ?></span>
                    </div>
                    <h1 class="text-2xl sm:text-3xl font-bold font-serif text-[#0B132B] dark:text-white"><?php the_title(); ?></h1>
                </div>

                <!-- Content & Notes -->
                <div class="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                    <?php the_content(); ?>
                </div>

            </div>
        <?php endwhile; ?>
    </div>
</div>

<?php get_footer(); ?>
