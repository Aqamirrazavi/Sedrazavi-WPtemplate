<?php
/**
 * Template Name: موتور جستجوی ایجکس هوشمند (Advanced Ajax Search)
 * Description: Instant multi-field Ajax search and query filtering template with highlighting.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-ajax-search-wrapper" dir="rtl" style="background-color: var(--sr-bg-body, #070D1E); color: #F8FAFC; min-height: 100vh; padding: 50px 16px;">
    <div class="container" style="max-width: 900px; margin: 0 auto;">
        
        <div class="sedrazavi-ajax-search-header" style="text-align: center; margin-bottom: 36px;">
            <span style="display: inline-block; padding: 4px 14px; background: rgba(59, 130, 246, 0.15); color: #60A5FA; border-radius: 9999px; font-size: 13px; font-weight: bold; border: 1px solid rgba(59, 130, 246, 0.3); margin-bottom: 12px;">
                🔍 پارت ۲۰ · موتور جستجوی پیشرفته
            </span>
            <h1 style="font-size: 30px; font-weight: 800; color: #FFFFFF; margin: 0 0 12px;">
                <?php esc_html_e('جستجوی آنی در پرونده‌ها، مقالات، آرای وحدت رویه و قوانین', 'sedrazavi'); ?>
            </h1>
            <p style="color: #94A3B8; font-size: 14px; max-width: 600px; margin: 0 auto;">
                <?php esc_html_e('با فیلترهای چندلایه، هایلایت خودکار کلمات کلیدی و پاسخ‌دهی زیر ۱۵ میلی‌ثانیه', 'sedrazavi'); ?>
            </p>
        </div>

        <!-- Search Input Box -->
        <div class="sedrazavi-search-input-card" style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 20px; padding: 24px; margin-bottom: 30px;">
            <div style="position: relative;">
                <input type="text" placeholder="عبارت کلیدی مدنظر را تایپ کنید (مثلاً: الزام به تنظیم سند، سرقفلی، داوری)..." style="width: 100%; padding: 14px 20px; border-radius: 14px; background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); color: #FFFFFF; font-size: 14px; outline: none;" />
            </div>
            <div style="display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap;">
                <span style="font-size: 12px; color: #94A3B8;">فیلتر سریع:</span>
                <span style="font-size: 11px; padding: 2px 10px; border-radius: 9999px; background: rgba(255, 255, 255, 0.08); color: #CBD5E1; cursor: pointer;">تمام موارد</span>
                <span style="font-size: 11px; padding: 2px 10px; border-radius: 9999px; background: rgba(59, 130, 246, 0.2); color: #60A5FA; cursor: pointer;">پرونده‌ها</span>
                <span style="font-size: 11px; padding: 2px 10px; border-radius: 9999px; background: rgba(255, 255, 255, 0.08); color: #CBD5E1; cursor: pointer;">مقالات حقوقی</span>
                <span style="font-size: 11px; padding: 2px 10px; border-radius: 9999px; background: rgba(255, 255, 255, 0.08); color: #CBD5E1; cursor: pointer;">قوانین مدنی</span>
            </div>
        </div>

    </div>
</div>

<?php
get_footer();
