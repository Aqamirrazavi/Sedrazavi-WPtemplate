<?php
/**
 * Template Name: پیشخوان گیت‌هاب و پروژه (GitHub Primer Suite)
 * Description: Dedicated GitHub Primer Dark dashboard with activity heatmap, commit trail, issues, and sync hub.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-github-suite-wrapper" dir="rtl" style="background-color: #0D1117; color: #C9D1D9; min-height: 100vh; padding: 40px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <div class="container" style="max-width: 1100px; margin: 0 auto;">
        
        <!-- Header -->
        <div class="sedrazavi-github-suite-header" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: gap: 16px; border-bottom: 1px solid #30363D; padding-bottom: 24px; margin-bottom: 28px;">
            <div style="display: flex; align-items: center; gap: 14px;">
                <div style="width: 44px; height: 44px; background: #161B22; border: 1px solid #30363D; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px;">
                    🐙
                </div>
                <div>
                    <h1 style="font-size: 20px; font-weight: bold; color: #F0F6FC; margin: 0 0 4px;">
                        <?php esc_html_e('پیشخوان یکپارچه پروژه و مخزن گیت‌هاب', 'sedrazavi'); ?>
                    </h1>
                    <p style="font-size: 12px; color: #8B949E; margin: 0;">
                        <?php esc_html_e('مدیریت پرونده‌ها، لاگ کامیت‌ها، رهگیری بریف‌ها و وضعیت همگام‌سازی ابری مخزن', 'sedrazavi'); ?>
                    </p>
                </div>
            </div>

            <div style="display: flex; gap: 8px;">
                <span style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: rgba(35, 134, 54, 0.2); border: 1px solid #238636; border-radius: 8px; font-size: 12px; color: #3FB950; font-weight: bold;">
                    ● شاخه اصلی: main
                </span>
                <span style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: #161B22; border: 1px solid #30363D; border-radius: 8px; font-size: 12px; color: #58A6FF; font-weight: bold;">
                    نگارش ۳.۱.۰
                </span>
            </div>
        </div>

        <!-- Activity Heatmap Simulation -->
        <div class="sedrazavi-github-heatmap-card" style="background: #161B22; border: 1px solid #30363D; border-radius: 14px; padding: 20px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                <h3 style="font-size: 14px; font-weight: bold; color: #F0F6FC; margin: 0;">
                    <?php esc_html_e('ماتریس فعالیت سالانه (Contribution Activity Matrix)', 'sedrazavi'); ?>
                </h3>
                <span style="font-size: 12px; color: #8B949E;">۳۴۲ اقدام و ثبت رویداد در سال جاری</span>
            </div>
            
            <div style="display: flex; gap: 4px; overflow-x: auto; padding-bottom: 8px;">
                <?php
                for ($col = 0; $col < 36; $col++) {
                    echo '<div style="display: flex; flex-direction: column; gap: 4px;">';
                    for ($row = 0; $row < 7; $row++) {
                        $level = ($col * 7 + $row) % 5;
                        $color = '#21262D';
                        if ($level === 1) $color = '#0E4429';
                        if ($level === 2) $color = '#006D32';
                        if ($level === 3) $color = '#26A641';
                        if ($level === 4) $color = '#39D353';
                        echo '<div style="width: 12px; height: 12px; border-radius: 2px; background-color: ' . $color . ';"></div>';
                    }
                    echo '</div>';
                }
                ?>
            </div>
            <div style="display: flex; align-items: center; justify-content: flex-end; gap: 6px; margin-top: 10px; font-size: 11px; color: #8B949E;">
                <span>کمتر</span>
                <span style="width: 10px; height: 10px; border-radius: 2px; background: #21262D;"></span>
                <span style="width: 10px; height: 10px; border-radius: 2px; background: #0E4429;"></span>
                <span style="width: 10px; height: 10px; border-radius: 2px; background: #006D32;"></span>
                <span style="width: 10px; height: 10px; border-radius: 2px; background: #26A641;"></span>
                <span style="width: 10px; height: 10px; border-radius: 2px; background: #39D353;"></span>
                <span>بیشتر</span>
            </div>
        </div>

        <!-- Issues and Case Tracker Grid -->
        <div class="sedrazavi-github-issues-card" style="background: #161B22; border: 1px solid #30363D; border-radius: 14px; overflow: hidden; margin-bottom: 24px;">
            <div style="padding: 14px 18px; background: #21262D; border-bottom: 1px solid #30363D; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 13px; font-weight: bold; color: #F0F6FC;">
                    📋 کارتابل پرونده‌ها و ایشوهای باز (Issues & Briefs)
                </span>
                <span style="font-size: 11px; color: #8B949E;">بروزرسانی زنده</span>
            </div>

            <div style="divide-y divide-[#30363D];">
                <div style="padding: 16px 18px; border-bottom: 1px solid #30363D; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="color: #3FB950; font-size: 16px;">●</span>
                        <div>
                            <div style="font-size: 13px; font-weight: bold; color: #F0F6FC;">
                                پرونده داوری قرارداد تجاری هلدینگ صادرات فولاد (CAS-9482)
                            </div>
                            <div style="font-size: 11px; color: #8B949E; margin-top: 3px;">
                                باز شده توسط سید امیرحسین رضوی · ۲ ساعت پیش · ۶ نظر کارشناسی
                            </div>
                        </div>
                    </div>
                    <span style="padding: 3px 10px; background: rgba(31, 111, 235, 0.2); color: #58A6FF; border: 1px solid rgba(31, 111, 235, 0.4); border-radius: 9999px; font-size: 11px; font-weight: bold;">
                        داوری بین‌الملل
                    </span>
                </div>

                <div style="padding: 16px 18px; border-bottom: 1px solid #30363D; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="color: #3FB950; font-size: 16px;">●</span>
                        <div>
                            <div style="font-size: 13px; font-weight: bold; color: #F0F6FC;">
                                دفاع در هیئت حل اختلاف مالیاتی و اعتراض به برگ تشخیص (CAS-9120)
                            </div>
                            <div style="font-size: 11px; color: #8B949E; margin-top: 3px;">
                                باز شده توسط دکتر مریم کاظمی · دیروز · ۴ نظر
                            </div>
                        </div>
                    </div>
                    <span style="padding: 3px 10px; background: rgba(137, 87, 229, 0.2); color: #BC8CFF; border: 1px solid rgba(137, 87, 229, 0.4); border-radius: 9999px; font-size: 11px; font-weight: bold;">
                        مالیات و گمرک
                    </span>
                </div>

                <div style="padding: 16px 18px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="color: #8B949E; font-size: 16px;">✓</span>
                        <div>
                            <div style="font-size: 13px; font-weight: bold; color: #8B949E; text-decoration: line-through;">
                                دادخواست اعاده دادرسی در دیوان عالی کشور (CAS-8994)
                            </div>
                            <div style="font-size: 11px; color: #8B949E; margin-top: 3px;">
                                بسته شده · مختومه موفق با صدور رای نقض و ارجاع
                            </div>
                        </div>
                    </div>
                    <span style="padding: 3px 10px; background: rgba(35, 134, 54, 0.2); color: #3FB950; border: 1px solid rgba(35, 134, 54, 0.4); border-radius: 9999px; font-size: 11px; font-weight: bold;">
                        مختومه موفق
                    </span>
                </div>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
