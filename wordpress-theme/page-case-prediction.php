<?php
/**
 * Template Name: تحلیل آماری و پیش‌بینی خروجی پرونده (Case Outcome Prediction)
 * Description: AI and statistical case prediction analyzer template with probability gauges and precedents comparison.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-prediction-suite-wrapper" dir="rtl" style="background-color: var(--sr-bg-body, #070D1E); color: #F8FAFC; min-height: 100vh; padding: 50px 16px;">
    <div class="container" style="max-width: 950px; margin: 0 auto;">
        
        <div class="sedrazavi-prediction-header" style="text-align: center; margin-bottom: 36px;">
            <span style="display: inline-block; padding: 4px 14px; background: rgba(168, 85, 247, 0.15); color: #C084FC; border-radius: 9999px; font-size: 13px; font-weight: bold; border: 1px solid rgba(168, 85, 247, 0.3); margin-bottom: 12px;">
                📊 پارت ۲۱ · هوش آماری دادرسی
            </span>
            <h1 style="font-size: 30px; font-weight: 800; color: #FFFFFF; margin: 0 0 12px;">
                <?php esc_html_e('سامانه تحلیل شانس موفقیت و ریسک‌سنجی پرونده‌های قضایی', 'sedrazavi'); ?>
            </h1>
            <p style="color: #94A3B8; font-size: 14px; max-width: 650px; margin: 0 auto;">
                <?php esc_html_e('بررسی داده‌محور بر پایه آرای قطعی محاکم تجدیدنظر، صلاحیت دادگاه‌ها و نظریات مشورتی اداره حقوقی', 'sedrazavi'); ?>
            </p>
        </div>

        <div class="sedrazavi-prediction-metrics-card" style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(168, 85, 247, 0.25); border-radius: 20px; padding: 28px; margin-bottom: 30px;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; text-align: center;">
                <div>
                    <div style="font-size: 32px; font-weight: 900; color: #10B981;">۸۴٪</div>
                    <div style="font-size: 12px; color: #94A3B8; margin-top: 4px;">میانگین شانس پیروزی با استناد به سند رسمی</div>
                </div>
                <div>
                    <div style="font-size: 32px; font-weight: 900; color: #F59E0B;">۲.۸ ماه</div>
                    <div style="font-size: 12px; color: #94A3B8; margin-top: 4px;">مدت زمان تخمینی تا صدور رای مرحله بدوی</div>
                </div>
                <div>
                    <div style="font-size: 32px; font-weight: 900; color: #38BDF8;">+۴,۲۰۰</div>
                    <div style="font-size: 12px; color: #94A3B8; margin-top: 4px;">دادنامه تحلیل‌شده در پایگاه داده وحدت رویه</div>
                </div>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
