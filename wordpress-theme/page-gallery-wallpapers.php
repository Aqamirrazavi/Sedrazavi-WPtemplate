<?php
/**
 * Template Name: نمایش و دانلود عکس و والپیپر (Gallery & Wallpapers)
 * Description: Dedicated Photo gallery, HD wallpapers, and vector background downloads template with resolutions and tags.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-wallpapers-hub-wrapper" dir="rtl" style="background-color: var(--sr-bg-body, #070D1E); color: #F8FAFC; min-height: 100vh; padding: 50px 16px;">
    <div class="container" style="max-width: 1100px; margin: 0 auto;">
        
        <!-- Header -->
        <div class="sedrazavi-wallpapers-header" style="text-align: center; margin-bottom: 40px;">
            <span style="display: inline-block; padding: 4px 14px; background: rgba(245, 158, 11, 0.15); color: #FBBF24; border-radius: 9999px; font-size: 13px; font-weight: bold; border: 1px solid rgba(245, 158, 11, 0.3); margin-bottom: 12px;">
                🖼️ گالری تصاویر، والپیپر و پس‌زمینه‌ها
            </span>
            <h1 style="font-size: 32px; font-weight: 800; color: #FFFFFF; margin: 0 0 12px;">
                <?php esc_html_e('گالری عکس‌های باکیفیت ۴K، والپیپر و وکتورهای پس‌زمینه', 'sedrazavi'); ?>
            </h1>
            <p style="color: #94A3B8; font-size: 14px; max-width: 650px; margin: 0 auto;">
                <?php esc_html_e('مشاهده پیش‌نمایش تمام‌صفحه، دانلود با رزولوشن‌های مختلف و دریافت سورس وکتور SVG', 'sedrazavi'); ?>
            </p>
        </div>

        <!-- Gallery Grid -->
        <div class="sedrazavi-wallpapers-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
            <!-- Wallpaper 1 -->
            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; overflow: hidden;">
                <div style="height: 180px; background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); display: flex; align-items: center; justify-content: center; font-size: 40px;">
                    ⚖️
                </div>
                <div style="padding: 18px;">
                    <span style="font-size: 11px; font-weight: bold; color: #D4AF37; background: rgba(212, 175, 55, 0.15); padding: 3px 8px; border-radius: 6px;">تذهیب اسلامی وکیل</span>
                    <h3 style="font-size: 15px; font-weight: bold; color: #FFFFFF; margin: 8px 0 6px;">والپیپر هندسی طلایی و سرمه‌ای ۴K</h3>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #94A3B8; margin-top: 12px;">
                        <span>رزولوشن: 3840x2160</span>
                        <a href="#" class="sedrazavi-btn-download-img" style="color: #D4AF37; font-weight: bold; text-decoration: none;">دانلود ۴K ↓</a>
                    </div>
                </div>
            </div>

            <!-- Wallpaper 2 -->
            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; overflow: hidden;">
                <div style="height: 180px; background: linear-gradient(135deg, #312E81 0%, #1E1B4B 100%); display: flex; align-items: center; justify-content: center; font-size: 40px;">
                    💻
                </div>
                <div style="padding: 18px;">
                    <span style="font-size: 11px; font-weight: bold; color: #818CF8; background: rgba(99, 102, 241, 0.15); padding: 3px 8px; border-radius: 6px;">سایبر و مدارها</span>
                    <h3 style="font-size: 15px; font-weight: bold; color: #FFFFFF; margin: 8px 0 6px;">والپیپر کدهای برنامه‌نویسی و مدارهای نئونی</h3>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #94A3B8; margin-top: 12px;">
                        <span>رزولوشن: 3840x2160</span>
                        <a href="#" class="sedrazavi-btn-download-img" style="color: #818CF8; font-weight: bold; text-decoration: none;">دانلود ۴K ↓</a>
                    </div>
                </div>
            </div>

            <!-- Wallpaper 3 -->
            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; overflow: hidden;">
                <div style="height: 180px; background: linear-gradient(135deg, #064E3B 0%, #022C22 100%); display: flex; align-items: center; justify-content: center; font-size: 40px;">
                    🌱
                </div>
                <div style="padding: 18px;">
                    <span style="font-size: 11px; font-weight: bold; color: #34D399; background: rgba(16, 185, 129, 0.15); padding: 3px 8px; border-radius: 6px;">طبیعت و مینیمال</span>
                    <h3 style="font-size: 15px; font-weight: bold; color: #FFFFFF; margin: 8px 0 6px;">والپیپر امواج زمردی و خطوط کانتور ملایم</h3>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #94A3B8; margin-top: 12px;">
                        <span>رزولوشن: 3840x2160</span>
                        <a href="#" class="sedrazavi-btn-download-img" style="color: #34D399; font-weight: bold; text-decoration: none;">دانلود ۴K ↓</a>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
