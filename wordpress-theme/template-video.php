<?php
/**
 * Template Name: پخش ویدیو و استریم چندرسانه‌ای (Video Stream Template)
 *
 * @package SedRazavi
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="sr-video-stream-page min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-sr-bg text-sr-primary" dir="rtl">
    <div class="max-w-5xl mx-auto space-y-8">
        
        <!-- عنوان و ناوبری بالا -->
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-sr-border pb-6">
            <div>
                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-sr-gold/15 text-sr-gold border border-sr-gold/30">
                    پخش اختصاصی با پلیر مدرن
                </span>
                <h1 class="text-2xl sm:text-3xl font-extrabold mt-2 font-serif text-sr-primary">
                    <?php the_title(); ?>
                </h1>
            </div>
            <div class="flex items-center gap-2">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="px-4 py-2 rounded-xl bg-sr-surface border border-sr-border text-sr-secondary hover:text-sr-primary text-xs font-semibold transition-colors">
                    بازگشت به خانه
                </a>
            </div>
        </div>

        <!-- کانتینر پلیر ویدیو با کنترل‌های پیشرفته -->
        <div class="rounded-3xl overflow-hidden bg-black/90 border border-sr-border shadow-2xl relative">
            <div class="aspect-video relative flex items-center justify-center bg-slate-950">
                <video id="sr-custom-video-player" class="w-full h-full object-contain" controls preload="metadata" poster="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'full'); ?>">
                    <source src="<?php echo esc_url(get_post_meta(get_the_ID(), 'sr_video_stream_url', true) ?: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'); ?>" type="video/mp4">
                    مرورگر شما از پخش مستقیم ویدیو پشتیبانی نمی‌کند.
                </video>
            </div>

            <!-- نوار کنترل اختصاصی زیر پلیر -->
            <div class="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
                <div class="flex items-center gap-2">
                    <span class="font-bold text-white">سرعت پخش:</span>
                    <button type="button" class="sr-speed-btn px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono" data-speed="0.75">0.75x</button>
                    <button type="button" class="sr-speed-btn px-2.5 py-1 rounded-lg bg-blue-600 text-white font-mono font-bold" data-speed="1.0">1.0x</button>
                    <button type="button" class="sr-speed-btn px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono" data-speed="1.25">1.25x</button>
                    <button type="button" class="sr-speed-btn px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono" data-speed="1.5">1.5x</button>
                    <button type="button" class="sr-speed-btn px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono" data-speed="2.0">2.0x</button>
                </div>

                <div class="flex items-center gap-2">
                    <span class="text-sr-gold">کیفیت: 1080p Full HD</span>
                    <span class="text-slate-600">|</span>
                    <span>سرور نیم‌بهاء داخلی</span>
                </div>
            </div>
        </div>

        <!-- سرفصل‌های ویدیو (Video Chapters) -->
        <div class="p-6 rounded-2xl bg-sr-surface border border-sr-border space-y-4">
            <h3 class="text-base font-bold text-sr-primary font-serif">فهرست بخش‌ها و نشانه‌گذاری زمانی (Chapters)</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <button type="button" class="sr-chapter-btn p-3 rounded-xl bg-sr-bg border border-sr-border hover:border-sr-gold text-right flex items-center justify-between transition-colors" data-time="0">
                    <span class="font-semibold text-sr-primary">۱. مقدمه و شروع مبحث</span>
                    <span class="font-mono text-sr-gold">۰۰:۰۰</span>
                </button>
                <button type="button" class="sr-chapter-btn p-3 rounded-xl bg-sr-bg border border-sr-border hover:border-sr-gold text-right flex items-center justify-between transition-colors" data-time="180">
                    <span class="font-semibold text-sr-primary">۲. تشریح الزامات و مستندات</span>
                    <span class="font-mono text-sr-gold">۰۳:۰۰</span>
                </button>
                <button type="button" class="sr-chapter-btn p-3 rounded-xl bg-sr-bg border border-sr-border hover:border-sr-gold text-right flex items-center justify-between transition-colors" data-time="420">
                    <span class="font-semibold text-sr-primary">۳. جمع‌بندی و نتیجه‌گیری</span>
                    <span class="font-mono text-sr-gold">۰۷:۰۰</span>
                </button>
            </div>
        </div>

        <!-- محتوای متنی و ضمیمه‌ها -->
        <div class="p-6 rounded-2xl bg-sr-surface border border-sr-border prose max-w-none text-sr-primary text-sm leading-relaxed">
            <?php
            while (have_posts()) : the_post();
                the_content();
            endwhile;
            ?>
        </div>

    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    var vid = document.getElementById('sr-custom-video-player');
    if (!vid) return;

    document.querySelectorAll('.sr-speed-btn').forEach(function(b) {
        b.addEventListener('click', function() {
            var speed = parseFloat(this.getAttribute('data-speed'));
            vid.playbackRate = speed;
            document.querySelectorAll('.sr-speed-btn').forEach(function(el) {
                el.classList.remove('bg-blue-600', 'font-bold');
                el.classList.add('bg-slate-800');
            });
            this.classList.remove('bg-slate-800');
            this.classList.add('bg-blue-600', 'font-bold');
        });
    });

    document.querySelectorAll('.sr-chapter-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var t = parseInt(this.getAttribute('data-time'), 10);
            vid.currentTime = t;
            vid.play();
        });
    });
});
</script>

<?php
get_footer();
