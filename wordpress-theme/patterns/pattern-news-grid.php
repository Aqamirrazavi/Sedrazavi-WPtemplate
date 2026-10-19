<?php
/**
 * Title: گرید تحریریه خبری و تیکر اخبار فوری (News & Editorial Grid)
 * Slug: sedrazavi/news-editorial-grid
 * Categories: sedrazavi-agency, featured
 * Description: نوار متحرک اخبار فوری به همراه گرید مقالات و زمان تخمینی مطالعه.
 */
?>
<!-- wp:group {"className":"sr-pattern-news-grid space-y-4 py-4"} -->
<div class="wp-block-group sr-pattern-news-grid space-y-4 py-4" dir="rtl">
    <!-- wp:shortcode -->
    [sedrazavi_breaking_news label="خبر فوری"]
    <!-- /wp:shortcode -->

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span class="text-[11px] text-blue-400 font-semibold">فناوری و وب</span>
            <h4 class="text-sm font-bold text-white leading-snug">رونمایی از سیستم‌عامل آژانسی SedRazavi OS نسخه ۵.۰ با معماری Bun</h4>
            <p class="text-xs text-slate-400 line-clamp-2">بررسی تخصصی تغییرات بنیادین در تفکیک چایلدتم‌ها و استقرار بدون وقفه در وبسایت‌های فعال.</p>
            <div class="flex items-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                <span>زمان مطالعه: ۳ دقیقه</span>
                <span>•</span>
                <span>امروز</span>
            </div>
        </div>
    </div>
</div>
<!-- /wp:group -->
