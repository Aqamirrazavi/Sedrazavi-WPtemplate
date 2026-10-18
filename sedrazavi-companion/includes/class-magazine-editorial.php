<?php
/**
 * SedRazavi Editorial & News Magazine Suite
 *
 * Implements breaking news marquee ticker, Persian reading time estimator,
 * and top-of-page reading progress indicators.
 *
 * @package SedRazavi_Companion
 * @version 5.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Magazine_Editorial {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_shortcode('sedrazavi_breaking_news', [$this, 'render_breaking_news_shortcode']);
        add_shortcode('sedrazavi_reading_progress', [$this, 'render_reading_progress_shortcode']);
        add_filter('the_content', [$this, 'prepend_reading_time_badge']);
    }

    /**
     * Calculate Persian Reading Time
     */
    public static function calculate_reading_time($content) {
        $clean_words = str_word_count(strip_tags($content));
        $minutes = ceil($clean_words / 200); // 200 words/min average
        return max(1, $minutes);
    }

    /**
     * Prepend reading time badge on single posts
     */
    public function prepend_reading_time_badge($content) {
        if (is_single() && in_the_loop() && is_main_query()) {
            $minutes = self::calculate_reading_time($content);
            $badge = sprintf(
                '<div class="sr-reading-meta inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-300 text-xs mb-4" dir="rtl">
                    <svg class="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>زمان تخمینی مطالعه: <strong>%d دقیقه</strong></span>
                </div>',
                $minutes
            );
            return $badge . $content;
        }
        return $content;
    }

    /**
     * Breaking News Marquee Ticker
     */
    public function render_breaking_news_shortcode($atts) {
        $atts = shortcode_atts([
            'label' => 'اخبار فوری',
            'speed' => 'normal',
        ], $atts);

        $news_items = [
            'انتشار پکیج جامع معماری ۵.۰ با پشتیبانی کامل از اسپات‌پلیر و پی‌وال VIP',
            'افزایش سرعت لودینگ قالب به زیر ۰.۸ ثانیه با تفکیک کامل هسته والد',
            'پشتیبانی رسمی از درگاه‌های بین‌المللی Stripe و درگاه‌های شتابی شاپرک',
            'آرشیو رایگان بیش از ۵۰ بلوک آماده گوتنبرگ در کتابخانه اختصاصی آژانس',
        ];

        ob_start();
        ?>
        <div class="sr-breaking-news-bar flex items-center gap-3 p-2 bg-slate-950 border-y border-slate-800 text-xs overflow-hidden" dir="rtl">
            <div class="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-600 text-white font-bold shrink-0 shadow-md shadow-rose-600/20">
                <span class="w-2 h-2 rounded-full bg-white animate-ping"></span>
                <span><?php echo esc_html($atts['label']); ?></span>
            </div>
            <div class="sr-ticker-wrapper overflow-hidden whitespace-nowrap flex-1">
                <div class="inline-block animate-marquee text-slate-300 space-x-8 space-x-reverse font-medium">
                    <?php foreach ($news_items as $item): ?>
                        <span class="inline-block ml-8">✦ <?php echo esc_html($item); ?></span>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <style>
        @keyframes sr-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(50%); }
        }
        .animate-marquee {
            display: inline-block;
            white-space: nowrap;
            animation: sr-marquee 25s linear infinite;
        }
        </style>
        <?php
        return ob_get_clean();
    }

    /**
     * Top-of-page Scroll Reading Progress Bar
     */
    public function render_reading_progress_shortcode() {
        ob_start();
        ?>
        <div id="sr-reading-progress" class="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500 z-[9999] origin-right transform scale-x-0 transition-transform"></div>
        <script>
        window.addEventListener('scroll', function() {
            var el = document.getElementById('sr-reading-progress');
            if (!el) return;
            var h = document.documentElement, b = document.body;
            var st = 'scrollTop', sh = 'scrollHeight';
            var percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight);
            el.style.transform = 'scaleX(' + percent + ')';
        });
        </script>
        <?php
        return ob_get_clean();
    }
}
