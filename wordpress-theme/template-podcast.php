<?php
/**
 * Template Name: پخش پادکست و صوت با ویژوالایزر (Podcast & Audio Template)
 *
 * @package SedRazavi
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="sr-podcast-stream-page min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-sr-bg text-sr-primary" dir="rtl">
    <div class="max-w-4xl mx-auto space-y-8">
        
        <!-- عنوان و برچسب پادکست -->
        <div class="text-center space-y-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sr-gold/15 text-sr-gold border border-sr-gold/30">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                <span>پادکست و رادیو اینترنتی</span>
            </span>
            <h1 class="text-2xl sm:text-4xl font-extrabold font-serif text-sr-primary">
                <?php the_title(); ?>
            </h1>
            <p class="text-xs sm:text-sm text-sr-muted max-w-xl mx-auto">
                شنیدن تازه‌ترین قسمت‌ها، گفت‌وگوهای تخصصی و تحلیل‌های روز با بالاترین کیفیت صوتی
            </p>
        </div>

        <!-- کارت پلیر صوتی با ویژوالایزر موج صدا -->
        <div class="p-6 sm:p-8 rounded-3xl bg-sr-surface border border-sr-border shadow-2xl space-y-6">
            <div class="flex flex-col sm:flex-row items-center gap-6">
                <!-- کاور پادکست -->
                <div class="w-32 h-32 rounded-2xl overflow-hidden bg-slate-900 border border-sr-border shrink-0 shadow-lg shadow-black/30">
                    <?php if (has_post_thumbnail()): ?>
                        <?php the_post_thumbnail('medium', ['class' => 'w-full h-full object-cover']); ?>
                    <?php else: ?>
                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-tr from-sr-gold/20 to-sr-surface text-sr-gold">
                            <svg class="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                        </div>
                    <?php endif; ?>
                </div>

                <!-- کنترل‌ها و موج صدا -->
                <div class="flex-1 w-full space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <span class="text-xs text-sr-gold font-semibold">اپیزود در حال پخش</span>
                            <h2 class="text-lg font-bold text-sr-primary"><?php the_title(); ?></h2>
                        </div>
                        <span id="sr-audio-timer" class="font-mono text-xs text-sr-muted">۰۰:۰۰ / ۰۵:۳۰</span>
                    </div>

                    <!-- انیمیشن موج صدا (Waveform) -->
                    <div class="flex items-center justify-between gap-1 h-12 py-2 px-3 rounded-xl bg-sr-bg border border-sr-border overflow-hidden">
                        <?php for ($i = 0; $i < 36; $i++): 
                            $h = rand(20, 95); ?>
                            <span class="sr-wave-bar flex-1 bg-sr-gold/50 rounded-full transition-all duration-300" style="height: <?php echo $h; ?>%;"></span>
                        <?php endfor; ?>
                    </div>

                    <!-- تگ صوتی HTML5 مخفی برای هدایت -->
                    <audio id="sr-podcast-audio" preload="metadata" src="<?php echo esc_url(get_post_meta(get_the_ID(), 'sr_podcast_audio_url', true) ?: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); ?>"></audio>

                    <!-- دکمه‌های کنترل پخش -->
                    <div class="flex items-center justify-center gap-4 pt-2">
                        <button type="button" id="sr-skip-back" class="p-2 rounded-xl bg-sr-bg hover:bg-sr-surface border border-sr-border text-sr-secondary hover:text-sr-primary text-xs font-mono transition-colors" title="۱۰ ثانیه قبل">
                            -۱۰s ↺
                        </button>
                        <button type="button" id="sr-play-toggle" class="w-12 h-12 rounded-full bg-sr-gold hover:bg-sr-gold-hover text-sr-text-inverted flex items-center justify-center shadow-lg shadow-sr-gold/20 transition-all font-bold">
                            ▶
                        </button>
                        <button type="button" id="sr-skip-forward" class="p-2 rounded-xl bg-sr-bg hover:bg-sr-surface border border-sr-border text-sr-secondary hover:text-sr-primary text-xs font-mono transition-colors" title="۱۰ ثانیه بعد">
                            ↻ +۱۰s
                        </button>
                    </div>
                </div>
            </div>

            <!-- پلتفرم‌های پخش ثالث -->
            <div class="pt-4 border-t border-sr-border flex flex-wrap items-center justify-between gap-3 text-xs text-sr-muted">
                <span>همچنین گوش دهید در:</span>
                <div class="flex items-center gap-2">
                    <a href="https://castbox.fm" target="_blank" rel="noopener noreferrer" class="px-3 py-1 rounded-lg bg-sr-bg border border-sr-border hover:border-sr-gold text-sr-secondary hover:text-sr-gold transition-colors">
                        Castbox
                    </a>
                    <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" class="px-3 py-1 rounded-lg bg-sr-bg border border-sr-border hover:border-sr-gold text-sr-secondary hover:text-sr-gold transition-colors">
                        Spotify
                    </a>
                    <a href="https://apple.com" target="_blank" rel="noopener noreferrer" class="px-3 py-1 rounded-lg bg-sr-bg border border-sr-border hover:border-sr-gold text-sr-secondary hover:text-sr-gold transition-colors">
                        Apple Podcasts
                    </a>
                </div>
            </div>
        </div>

        <!-- محتوای توضیحات اپیزود -->
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
    var audio = document.getElementById('sr-podcast-audio');
    var playBtn = document.getElementById('sr-play-toggle');
    var skipBack = document.getElementById('sr-skip-back');
    var skipForward = document.getElementById('sr-skip-forward');
    var timer = document.getElementById('sr-audio-timer');
    var bars = document.querySelectorAll('.sr-wave-bar');

    if (!audio || !playBtn) return;

    playBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playBtn.innerText = '⏸';
            bars.forEach(function(b) { b.classList.add('animate-pulse'); b.style.backgroundColor = '#D4AF37'; });
        } else {
            audio.pause();
            playBtn.innerText = '▶';
            bars.forEach(function(b) { b.classList.remove('animate-pulse'); b.style.backgroundColor = 'rgba(212, 175, 55, 0.4)'; });
        }
    });

    if (skipBack) {
        skipBack.addEventListener('click', function() {
            audio.currentTime = Math.max(0, audio.currentTime - 10);
        });
    }
    if (skipForward) {
        skipForward.addEventListener('click', function() {
            audio.currentTime = Math.min(audio.duration || 9999, audio.currentTime + 10);
        });
    }

    audio.addEventListener('timeupdate', function() {
        var cur = Math.floor(audio.currentTime);
        var dur = Math.floor(audio.duration || 0);
        function pad(n) { return (n < 10 ? '0' : '') + n; }
        var curStr = pad(Math.floor(cur / 60)) + ':' + pad(cur % 60);
        var durStr = pad(Math.floor(dur / 60)) + ':' + pad(dur % 60);
        if (timer) timer.innerText = curStr + ' / ' + durStr;
    });
});
</script>

<?php
get_footer();
