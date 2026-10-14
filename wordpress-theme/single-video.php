<?php
/**
 * Single Video Template (قالب اختصاصی تک‌ویدئو و سخنرانی چندرسانه‌ای)
 *
 * Provides a responsive cinema video player, multi-resolution download hub,
 * interactive timestamps/chapters, speaker bio, and related video cards.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-single-video-page py-10 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-right" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">

        <?php while (have_posts()) : the_post(); 
            $post_id        = get_the_ID();
            $video_url      = get_post_meta($post_id, '_sedrazavi_video_url', true) ?: 'https://www.aparat.com/video/video/embed/videohash/demo/vt/frame';
            $duration       = get_post_meta($post_id, '_sedrazavi_video_duration', true) ?: '۱۴:۳۵';
            $speaker        = get_post_meta($post_id, '_sedrazavi_video_speaker', true) ?: 'دکتر سیده مریم رضوی';
            $views_count    = get_post_meta($post_id, '_sedrazavi_video_views', true) ?: '۲,۸۴۰';
            $publish_date   = get_the_date('j F Y');
            $category_terms = get_the_terms($post_id, 'video_category');
            $category_name  = (!empty($category_terms) && !is_wp_error($category_terms)) ? $category_terms[0]->name : 'تحلیل حقوقی و دادرسی';
        ?>

        <!-- Breadcrumb & Top Bar -->
        <div class="flex items-center justify-between flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div class="flex items-center gap-2">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-[#D4AF37] transition-colors">صفحه اصلی</a>
                <span>/</span>
                <a href="<?php echo esc_url(home_url('/videos/')); ?>" class="hover:text-[#D4AF37] transition-colors">آرشیو ویدئوها</a>
                <span>/</span>
                <span class="text-gray-900 dark:text-gray-200 font-bold"><?php the_title(); ?></span>
            </div>
            <a href="<?php echo esc_url(home_url('/videos/')); ?>" class="sedrazavi-btn-pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:text-[#D4AF37] transition-all">
                <span>← بازگشت به کل ویدئوها</span>
            </a>
        </div>

        <!-- Cinema Video Player Card -->
        <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
            
            <!-- Video Frame Container -->
            <div class="sedrazavi-video-cinema-frame relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl flex items-center justify-center border border-white/10">
                <?php if (!empty($video_url) && strpos($video_url, 'http') === 0) : ?>
                    <iframe class="w-full h-full" src="<?php echo esc_url($video_url); ?>" title="<?php the_title_attribute(); ?>" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <?php else : ?>
                    <div class="text-center p-8 text-white space-y-3">
                        <span class="text-6xl block">🎬</span>
                        <h3 class="text-lg font-bold">پخش‌کننده ویدیویی کیفیت بالا</h3>
                        <p class="text-xs text-gray-400 max-w-md mx-auto">ویدیو به صورت مستقیم از سرور پرسرعت اختصاصی پخش می‌شود.</p>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Video Metadata & Title -->
            <div class="space-y-4 border-b border-gray-100 dark:border-gray-800 pb-6">
                <div class="flex items-center justify-between flex-wrap gap-3">
                    <span class="px-3.5 py-1 rounded-full text-xs font-bold bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] border border-[#D4AF37]/30">
                        <?php echo esc_html($category_name); ?>
                    </span>
                    <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 font-mono">
                        <span>⏱️ <?php echo esc_html($duration); ?></span>
                        <span>👁️ <?php echo esc_html($views_count); ?> بازدید</span>
                        <span>📅 <?php echo esc_html($publish_date); ?></span>
                    </div>
                </div>

                <h1 class="text-2xl sm:text-3xl font-black font-serif text-[#0B132B] dark:text-white leading-tight">
                    <?php the_title(); ?>
                </h1>
            </div>

            <!-- Multi-Format Download Suite -->
            <div class="sedrazavi-video-downloads-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div class="p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <div>
                        <div class="text-xs font-bold text-gray-900 dark:text-white">کیفیت 1080p Full HD</div>
                        <div class="text-[10px] text-gray-500 font-mono">MP4 • ۴۲۰ مگابایت</div>
                    </div>
                    <a href="#download-1080" class="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-black font-bold text-xs hover:bg-[#b8972e] transition-colors">دانلود</a>
                </div>

                <div class="p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <div>
                        <div class="text-xs font-bold text-gray-900 dark:text-white">کیفیت 720p HD</div>
                        <div class="text-[10px] text-gray-500 font-mono">MP4 • ۱۸۰ مگابایت</div>
                    </div>
                    <a href="#download-720" class="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold text-xs hover:bg-[#D4AF37] hover:text-black transition-colors">دانلود</a>
                </div>

                <div class="p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <div>
                        <div class="text-xs font-bold text-gray-900 dark:text-white">فایل صوتی (Podcast)</div>
                        <div class="text-[10px] text-gray-500 font-mono">MP3 320kbps • ۲۸ مگابایت</div>
                    </div>
                    <a href="#download-mp3" class="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs hover:bg-emerald-500 hover:text-white transition-colors">دانلود صوت</a>
                </div>

                <div class="p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <div>
                        <div class="text-xs font-bold text-gray-900 dark:text-white">خلاصه و اسلایدها</div>
                        <div class="text-[10px] text-gray-500 font-mono">PDF • ۵ مگابایت</div>
                    </div>
                    <a href="#download-pdf" class="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-xs hover:bg-indigo-500 hover:text-white transition-colors">دانلود PDF</a>
                </div>
            </div>

            <!-- Interactive Video Chapters / Timestamps -->
            <div class="p-5 rounded-2xl bg-[#070D1E]/60 border border-white/10 space-y-3">
                <div class="text-sm font-bold text-white flex items-center gap-2">
                    <span class="text-[#D4AF37]">⏱️</span>
                    <span>سرفصل‌ها و بخش‌های کلیدی ویدیو:</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <button type="button" class="p-2.5 rounded-xl bg-white/5 hover:bg-[#D4AF37]/20 border border-white/5 hover:border-[#D4AF37]/40 text-right transition-colors cursor-pointer text-gray-300 hover:text-white">
                        <span class="text-[#D4AF37] font-mono font-bold block text-[11px]">۰۰:۰۰</span>
                        <span class="truncate block">مقدمه و طرح صورت مسئله</span>
                    </button>
                    <button type="button" class="p-2.5 rounded-xl bg-white/5 hover:bg-[#D4AF37]/20 border border-white/5 hover:border-[#D4AF37]/40 text-right transition-colors cursor-pointer text-gray-300 hover:text-white">
                        <span class="text-[#D4AF37] font-mono font-bold block text-[11px]">۰۳:۱۵</span>
                        <span class="truncate block">بررسی ماده قانونی و استراتژی</span>
                    </button>
                    <button type="button" class="p-2.5 rounded-xl bg-white/5 hover:bg-[#D4AF37]/20 border border-white/5 hover:border-[#D4AF37]/40 text-right transition-colors cursor-pointer text-gray-300 hover:text-white">
                        <span class="text-[#D4AF37] font-mono font-bold block text-[11px]">۰۷:۴۰</span>
                        <span class="truncate block">نکات کلیدی برای جلسات دادگاه</span>
                    </button>
                    <button type="button" class="p-2.5 rounded-xl bg-white/5 hover:bg-[#D4AF37]/20 border border-white/5 hover:border-[#D4AF37]/40 text-right transition-colors cursor-pointer text-gray-300 hover:text-white">
                        <span class="text-[#D4AF37] font-mono font-bold block text-[11px]">۱۲:۱۰</span>
                        <span class="truncate block">پاسخ به سوالات متداول و جمع‌بندی</span>
                    </button>
                </div>
            </div>

            <!-- Content Body & Notes -->
            <div class="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-sans pt-4">
                <h3 class="text-xl font-bold font-serif text-[#0B132B] dark:text-white">یادداشت‌ها و متن تفصیلی ویدیو:</h3>
                <?php the_content(); ?>
            </div>

            <!-- Speaker Profile Card -->
            <div class="p-6 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-transparent border border-[#D4AF37]/25 flex items-center gap-4">
                <div class="w-14 h-14 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center text-xl shrink-0 font-serif">
                    ⚖️
                </div>
                <div class="space-y-1">
                    <h4 class="text-sm font-bold text-gray-900 dark:text-white"><?php echo esc_html($speaker); ?></h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        مدرس و ارائه‌دهنده تخصصی • پاسخگوی پرونده‌ها و مشاوره‌های حقوقی
                    </p>
                </div>
            </div>

        </div>

        <?php endwhile; ?>

    </div>
</div>

<?php get_footer(); ?>
