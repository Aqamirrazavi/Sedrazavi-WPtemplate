<?php
/**
 * Template Name: پخش و دانلود موزیک و پادکست (Music & Podcast Hub)
 * Description: Dedicated Audio and Podcast player with playlist and direct MP3 download links.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-music-hub-wrapper" dir="rtl" style="background-color: var(--sr-bg-body, #070D1E); color: #F8FAFC; min-height: 100vh; padding: 50px 16px;">
    <div class="container" style="max-width: 1100px; margin: 0 auto;">
        
        <!-- Header -->
        <div class="sedrazavi-music-header" style="text-align: center; margin-bottom: 40px;">
            <span style="display: inline-block; padding: 4px 14px; background: rgba(236, 72, 153, 0.15); color: #F472B6; border-radius: 9999px; font-size: 13px; font-weight: bold; border: 1px solid rgba(236, 72, 153, 0.3); margin-bottom: 12px;">
                🎧 رسانه صوتی، موزیک و پادکست
            </span>
            <h1 style="font-size: 32px; font-weight: 800; color: #FFFFFF; margin: 0 0 12px;">
                <?php esc_html_e('آرشیو قطعات صوتی، پادکست‌های تحلیلی و گفتگوها', 'sedrazavi'); ?>
            </h1>
            <p style="color: #94A3B8; font-size: 14px; max-width: 650px; margin: 0 auto;">
                <?php esc_html_e('امکان پخش آنلاین، مشاهده متن اپیزود، تنظیم سرعت پخش و دانلود با کیفیت‌های ۳۲۰ و ۱۲۸ کیلوبیت', 'sedrazavi'); ?>
            </p>
        </div>

        <!-- Featured Player -->
        <div class="sedrazavi-music-player-card" style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(236, 72, 153, 0.3); border-radius: 24px; padding: 32px; margin-bottom: 40px; box-shadow: 0 10px 30px -10px rgba(236, 72, 153, 0.2);">
            <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
                <div style="width: 140px; height: 140px; background: linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%); border-radius: 18px; display: flex; align-items: center; justify-content: center; font-size: 48px; shrink-0;">
                    🎵
                </div>
                <div style="flex: 1; min-width: 260px;">
                    <span style="font-size: 11px; font-weight: bold; color: #F472B6; background: rgba(236, 72, 153, 0.2); padding: 3px 10px; border-radius: 9999px;">اپیزود شاخص هفته</span>
                    <h2 style="font-size: 20px; font-weight: 800; color: #FFFFFF; margin: 10px 0 6px;">
                        پادکست شماره ۱۲: تحلیل حقوقی قراردادهای هوشمند و بلاک‌چین
                    </h2>
                    <p style="font-size: 13px; color: #94A3B8; margin-bottom: 16px;">
                        مدت زمان: ۴۵ دقیقه · گوینده: دکتر سیده مریم رضوی · تاریخ انتشار: ۱۸ مهر ۱۴۰۳
                    </p>
                    <audio controls style="width: 100%; border-radius: 8px;">
                        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
                        مرورگر شما از پخش صدا پشتیبانی نمی‌کند.
                    </audio>
                </div>
            </div>
        </div>

        <!-- Audio Playlist Grid -->
        <div class="sedrazavi-music-playlist" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 11px; font-weight: bold; color: #818CF8; background: rgba(99, 102, 241, 0.15); padding: 3px 8px; border-radius: 6px;">پادکست آموزشی</span>
                    <span style="font-size: 12px; color: #94A3B8;">۳۲:۱۰</span>
                </div>
                <h3 style="font-size: 15px; font-weight: bold; color: #FFFFFF; margin: 0 0 8px;">نکات طلایی تنظیم قراردادهای پیمانکاری</h3>
                <p style="font-size: 12px; color: #94A3B8; margin-bottom: 14px;">بررسی شرایط عمومی پیمان و ضرر و زیان تأخیرات</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 12px; color: #F472B6; font-weight: bold;">پخش آنلاین ▶</span>
                    <a href="#" class="sedrazavi-btn-download-audio" style="font-size: 12px; color: #94A3B8; text-decoration: none;">دانلود MP3 (320kbps) ↓</a>
                </div>
            </div>

            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 11px; font-weight: bold; color: #10B981; background: rgba(16, 185, 129, 0.15); padding: 3px 8px; border-radius: 6px;">گفتگوی زنده</span>
                    <span style="font-size: 12px; color: #94A3B8;">۵۴:۲۰</span>
                </div>
                <h3 style="font-size: 15px; font-weight: bold; color: #FFFFFF; margin: 0 0 8px;">میزگرد بررسی جرایم رایانه‌ای و سایبری</h3>
                <p style="font-size: 12px; color: #94A3B8; margin-bottom: 14px;">با حضور کارشناسان پلیس فتا و وکلای پایه یک</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 12px; color: #F472B6; font-weight: bold;">پخش آنلاین ▶</span>
                    <a href="#" class="sedrazavi-btn-download-audio" style="font-size: 12px; color: #94A3B8; text-decoration: none;">دانلود MP3 (320kbps) ↓</a>
                </div>
            </div>

            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 11px; font-weight: bold; color: #D4AF37; background: rgba(212, 175, 55, 0.15); padding: 3px 8px; border-radius: 6px;">داوری و حقوق</span>
                    <span style="font-size: 12px; color: #94A3B8;">۲۸:۴۵</span>
                </div>
                <h3 style="font-size: 15px; font-weight: bold; color: #FFFFFF; margin: 0 0 8px;">شرط داوری در قراردادهای تجاری بین‌الملل</h3>
                <p style="font-size: 12px; color: #94A3B8; margin-bottom: 14px;">چگونگی تعیین محل و قواعد داوری اتاق پاریس ICC</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 12px; color: #F472B6; font-weight: bold;">پخش آنلاین ▶</span>
                    <a href="#" class="sedrazavi-btn-download-audio" style="font-size: 12px; color: #94A3B8; text-decoration: none;">دانلود MP3 (320kbps) ↓</a>
                </div>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
