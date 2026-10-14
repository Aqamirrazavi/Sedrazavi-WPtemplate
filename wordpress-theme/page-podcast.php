<?php
/**
 * Template Name: مرکز پادکست و رسانه صوتی (Audio & Podcast Hub)
 * Description: Dedicated Audio Podcast and Lecture Hub with inline player and download links.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-podcast-hub-page py-10 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-right font-persian" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">

        <!-- Top Banner Header -->
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#070D1E] via-[#0B132B] to-[#141E3C] border border-amber-500/30 p-6 sm:p-10 text-white shadow-2xl">
            <div class="space-y-4 max-w-3xl">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                    <span>🎙️ استودیوی صوتی و پادکست تخصصی</span>
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span class="text-emerald-400 font-mono text-[11px]">پخش آنلاین و دانلود</span>
                </div>

                <h1 class="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight leading-snug">
                    پادکست‌ها، تحلیل‌های صوتی و گفتگوهای راهبردی
                </h1>

                <p class="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    مجموعه اپیزودهای صوتی با کیفیت استودیویی در زمینه‌های دادرسی، استراتژی‌های حقوقی، راه‌اندازی کسب‌وکار و توسعه وب‌سایت.
                    امکان شنیدن مستقیم در مرورگر یا اشتراک در کست‌باکس و اپل پادکست.
                </p>

                <!-- Subscription Links -->
                <div class="flex items-center flex-wrap gap-3 pt-2 text-xs font-bold">
                    <span class="text-gray-400">شنیدن در پلتفرم‌ها:</span>
                    <a href="#castbox" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-amber-500 hover:text-black border border-white/10 transition-colors">🟠 Castbox</a>
                    <a href="#spotify" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-white border border-white/10 transition-colors">🟢 Spotify</a>
                    <a href="#apple" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-purple-500 hover:text-white border border-white/10 transition-colors">🟣 Apple Podcasts</a>
                    <a href="#rss" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-orange-500 hover:text-white border border-white/10 transition-colors">📡 RSS Feed</a>
                </div>
            </div>
        </div>

        <!-- Featured Episode Player Card -->
        <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 dark:border-gray-800 pb-6">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white font-bold flex items-center justify-center text-3xl shadow-lg shadow-amber-500/20 shrink-0">
                        📻
                    </div>
                    <div>
                        <span class="text-[11px] font-bold text-amber-500">اپیزود شاخص هفته (Episode #18)</span>
                        <h2 class="text-lg sm:text-xl font-bold font-serif text-gray-900 dark:text-white">
                            استراتژی‌های دفاع در دعاوی تجاری بین‌المللی و نحوه انتخاب داور مرضی‌الطرفین
                        </h2>
                        <span class="text-xs text-gray-500 font-mono">مدت: ۳۸ دقیقه • کیفیت: 320kbps MP3</span>
                    </div>
                </div>

                <!-- Action Download -->
                <div class="flex items-center gap-2 shrink-0">
                    <a href="#download-featured" class="sedrazavi-btn-pill px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#b8972e] text-black font-bold text-xs transition-all shadow-md">
                        دانلود فایل صوتی (۸۵MB)
                    </a>
                </div>
            </div>

            <!-- Native HTML5 Audio Player -->
            <div class="p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800">
                <audio controls class="w-full">
                    <source src="https://example.com/audio/podcast-ep18.mp3" type="audio/mpeg">
                    مرورگر شما از پخش‌کننده صوتی پشتیبانی نمی‌کند.
                </audio>
            </div>
        </div>

        <!-- Episodes Archive List -->
        <div class="space-y-4">
            <h3 class="text-xl font-bold font-serif text-gray-900 dark:text-white flex items-center gap-2">
                <span>📚 آرشیو تمامی اپیزودها</span>
                <span class="text-xs font-normal text-gray-500 dark:text-gray-400 font-mono">(۱۲ اپیزود منتشر شده)</span>
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <?php
                $episodes = [
                    ['id' => 17, 'title' => 'ماده ۴۷۷ قانون آیین دادرسی کیفری و شرایط تجویز اعاده دادرسی', 'time' => '۲۶ دقیقه', 'date' => '۱۴ اردیبهشت ۱۴۰۳', 'tag' => 'دیوان عالی کشور'],
                    ['id' => 16, 'title' => 'اصول کلیدی تنظیم قراردادهای توسعه نرم‌افزار و واگذاری کپی‌رایت', 'time' => '۳۱ دقیقه', 'date' => '۷ اردیبهشت ۱۴۰۳', 'tag' => 'طراحی وب و استارتاپ'],
                    ['id' => 15, 'title' => 'حدنصاب مجامع عمومی در شرکت‌های سهامی خاص و ابطال مصوبات', 'time' => '۲۲ دقیقه', 'date' => '۳۰ فروردین ۱۴۰۳', 'tag' => 'حقوق تجارت'],
                    ['id' => 14, 'title' => 'نکات طلایی سئو و بهینه‌سازی سرعت در فروشگاه‌های ووکامرس', 'time' => '۲۹ دقیقه', 'date' => '۲۱ فروردین ۱۴۰۳', 'tag' => 'فروشگاه آنلاین'],
                ];

                foreach ($episodes as $ep) : ?>
                    <div class="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm hover:border-amber-500/40 transition-all flex items-center justify-between gap-4">
                        <div class="space-y-1 min-w-0">
                            <div class="flex items-center gap-2 text-[10px] text-gray-400">
                                <span class="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-bold text-gray-600 dark:text-gray-300">#<?php echo esc_html($ep['id']); ?></span>
                                <span class="text-amber-500 font-bold"><?php echo esc_html($ep['tag']); ?></span>
                                <span>• <?php echo esc_html($ep['date']); ?></span>
                            </div>
                            <h4 class="text-sm font-bold text-gray-900 dark:text-white truncate">
                                <?php echo esc_html($ep['title']); ?>
                            </h4>
                            <span class="text-[11px] text-gray-500 font-mono">⏱️ زمان: <?php echo esc_html($ep['time']); ?></span>
                        </div>
                        <a href="#play-<?php echo esc_attr($ep['id']); ?>" class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-[#D4AF37] text-gray-700 dark:text-gray-200 hover:text-black flex items-center justify-center font-bold text-sm shrink-0 transition-colors">
                            ▶
                        </a>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

    </div>
</div>

<?php get_footer(); ?>
