<?php
/**
 * Template Name: مخزن متغیرهای سراسری دیزاین توکن (Design Tokens Suite)
 * Description: Live Design Tokens manager and theme CSS variable editor template.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-tokens-suite-wrapper" dir="rtl" style="background-color: var(--sr-bg-body, #070D1E); color: #F8FAFC; min-height: 100vh; padding: 50px 16px;">
    <div class="container" style="max-width: 1100px; margin: 0 auto;">
        
        <div class="sedrazavi-tokens-header" style="text-align: center; margin-bottom: 40px;">
            <span style="display: inline-block; padding: 4px 14px; background: rgba(212, 175, 55, 0.15); color: #D4AF37; border-radius: 9999px; font-size: 13px; font-weight: bold; border: 1px solid rgba(212, 175, 55, 0.3); margin-bottom: 12px;">
                🎨 پارت ۱۹ · سیستم Design Tokens
            </span>
            <h1 style="font-size: 30px; font-weight: 800; color: #FFFFFF; margin: 0 0 12px;">
                <?php esc_html_e('مخزن ۲۴ متغیر سراسری دیزاین توکن و ویرایشگر زنده CSS', 'sedrazavi'); ?>
            </h1>
            <p style="color: #94A3B8; font-size: 14px; max-width: 650px; margin: 0 auto;">
                <?php esc_html_e('مدیریت رنگ‌های اصلی، ثانویه، حاشیه‌ها، انحنای کارت‌ها و تایپوگرافی بدون دستکاری فایل‌های کد', 'sedrazavi'); ?>
            </p>
        </div>

        <div class="sedrazavi-tokens-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 22px;">
                <h3 style="font-size: 15px; font-weight: bold; color: #FFFFFF; margin-bottom: 12px;">متغیرهای رنگی (Color Tokens)</h3>
                <div style="font-size: 12px; color: #94A3B8; line-height: 2;">
                    <div><code>--sr-primary-accent</code>: <span style="color:#D4AF37;font-weight:bold;">#D4AF37 (طلایی)</span></div>
                    <div><code>--sr-bg-body</code>: <span style="color:#64748B;font-weight:bold;">#070D1E (سرمه‌ای تیره)</span></div>
                    <div><code>--sr-success-emerald</code>: <span style="color:#10B981;font-weight:bold;">#10B981 (سبز)</span></div>
                </div>
            </div>

            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 22px;">
                <h3 style="font-size: 15px; font-weight: bold; color: #FFFFFF; margin-bottom: 12px;">انحناها و شعاع کارت‌ها (Radius Tokens)</h3>
                <div style="font-size: 12px; color: #94A3B8; line-height: 2;">
                    <div><code>--sr-radius-sm</code>: 8px (دکمه‌ها و بج‌ها)</div>
                    <div><code>--sr-radius-md</code>: 14px (فیلدهای ورودی)</div>
                    <div><code>--sr-radius-xl</code>: 24px (کارت‌های مدرن)</div>
                </div>
            </div>

            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 22px;">
                <h3 style="font-size: 15px; font-weight: bold; color: #FFFFFF; margin-bottom: 12px;">سایه‌ها و عمق بصری (Elevation Tokens)</h3>
                <div style="font-size: 12px; color: #94A3B8; line-height: 2;">
                    <div><code>--sr-shadow-card</code>: 0 10px 25px -5px rgba(0,0,0,0.3)</div>
                    <div><code>--sr-shadow-glow</code>: 0 0 20px rgba(212, 175, 55, 0.25)</div>
                </div>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
