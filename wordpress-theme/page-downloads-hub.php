<?php
/**
 * Template Name: مرکز دانلود نرم‌افزار، اپلیکیشن و بازی (Downloads Hub)
 * Description: Dedicated software, apps, and games download hub template with version badges, checksums, and direct links.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-downloads-hub-wrapper" dir="rtl" style="background-color: var(--sr-bg-body, #070D1E); color: #F8FAFC; min-height: 100vh; padding: 50px 16px;">
    <div class="container" style="max-width: 1100px; margin: 0 auto;">
        
        <!-- Header -->
        <div class="sedrazavi-downloads-header" style="text-align: center; margin-bottom: 40px;">
            <span style="display: inline-block; padding: 4px 14px; background: rgba(56, 189, 248, 0.15); color: #38BDF8; border-radius: 9999px; font-size: 13px; font-weight: bold; border: 1px solid rgba(56, 189, 248, 0.3); margin-bottom: 12px;">
                📦 مرکز دانلود فایل، نرم‌افزار و ابزارها
            </span>
            <h1 style="font-size: 32px; font-weight: 800; color: #FFFFFF; margin: 0 0 12px;">
                <?php esc_html_e('دانلود مستقیم نرم‌افزارها، اپلیکیشن‌های کاربردی و افزونه‌ها', 'sedrazavi'); ?>
            </h1>
            <p style="color: #94A3B8; font-size: 14px; max-width: 650px; margin: 0 auto;">
                <?php esc_html_e('لینک‌های مستقیم پرسرعت، بررسی امنیتی ضدبدافزار، هش SHA-256 و راهنمای نصب قدم‌به‌قدم', 'sedrazavi'); ?>
            </p>
        </div>

        <!-- Software Grid -->
        <div class="sedrazavi-downloads-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
            <!-- Software Item 1 -->
            <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 24px;">
                <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
                    <div style="width: 52px; height: 52px; background: rgba(56, 189, 248, 0.2); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 26px;">
                        💻
                    </div>
                    <div>
                        <h3 style="font-size: 16px; font-weight: bold; color: #FFFFFF; margin: 0 0 4px;">نرم‌افزار مدیریت پرونده‌های حقوقی (Desktop)</h3>
                        <span style="font-size: 11px; color: #38BDF8; font-weight: bold;">نسخه ۳.۲.۱ · ویندوز و مک</span>
                    </div>
                </div>
                <p style="font-size: 13px; color: #94A3B8; line-height: 1.6; margin-bottom: 16px;">
                    مدیریت آفلاین اسناد، محاسبه مواعد قانونی دادرسی و همگام‌سازی ابری با سرور اختصاصی دفتر.
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #94A3B8; border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 14px;">
                    <span>حجم: ۴۸ مگابایت</span>
                    <a href="#" class="sedrazavi-btn-download-file" style="background: #38BDF8; color: #070D1E; padding: 6px 14px; border-radius: 8px; font-weight: bold; text-decoration: none;">دانلود مستقیم ↓</a>
                </div>
            </div>

            <!-- Software Item 2 -->
            <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 24px;">
                <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
                    <div style="width: 52px; height: 52px; background: rgba(16, 185, 129, 0.2); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 26px;">
                        📱
                    </div>
                    <div>
                        <h3 style="font-size: 16px; font-weight: bold; color: #FFFFFF; margin: 0 0 4px;">اپلیکیشن همراه موکلین (Android / iOS)</h3>
                        <span style="font-size: 11px; color: #10B981; font-weight: bold;">نسخه ۲.۰.۴ · APK و PWA</span>
                    </div>
                </div>
                <p style="font-size: 13px; color: #94A3B8; line-height: 1.6; margin-bottom: 16px;">
                    مشاهده لحظه‌ای ابلاغیه‌های دادگاه، دریافت پیامک‌های وقت جلسه و گفتگوی مستقیم با وکیل سرپرست.
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #94A3B8; border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 14px;">
                    <span>حجم: ۱۸ مگابایت</span>
                    <a href="#" class="sedrazavi-btn-download-file" style="background: #10B981; color: #FFFFFF; padding: 6px 14px; border-radius: 8px; font-weight: bold; text-decoration: none;">دانلود مستقیم ↓</a>
                </div>
            </div>

            <!-- Software Item 3 -->
            <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 24px;">
                <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
                    <div style="width: 52px; height: 52px; background: rgba(99, 102, 241, 0.2); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 26px;">
                        ⚡
                    </div>
                    <div>
                        <h3 style="font-size: 16px; font-weight: bold; color: #FFFFFF; margin: 0 0 4px;">بسته فرم‌ها و شکواییه‌های استاندارد دادگستری</h3>
                        <span style="font-size: 11px; color: #818CF8; font-weight: bold;">فرمت Word & PDF</span>
                    </div>
                </div>
                <p style="font-size: 13px; color: #94A3B8; line-height: 1.6; margin-bottom: 16px;">
                    بیش از ۵۰۰ نمونه دادخواست حقوقی، کیفری، تجدیدنظر و لوایح دفاعی طبق قانون جدید دیوان عدالت.
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #94A3B8; border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 14px;">
                    <span>حجم: ۱۲ مگابایت (ZIP)</span>
                    <a href="#" class="sedrazavi-btn-download-file" style="background: #6366F1; color: #FFFFFF; padding: 6px 14px; border-radius: 8px; font-weight: bold; text-decoration: none;">دانلود مستقیم ↓</a>
                </div>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
