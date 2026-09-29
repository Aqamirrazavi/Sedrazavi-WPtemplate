<?php
/**
 * Master Shortcode Engine for SedRazavi Law Firm
 *
 * @package SedRazavi_Addons
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;

/**
 * ۱. کد کوتاه پرتال کاربری موکلین [sedrazavi_client_portal]
 */
function sedrazavi_shortcode_client_portal($atts) {
    ob_start();
    ?>
    <div id="sedrazavi-client-portal-app" class="sedrazavi-client-portal-wrapper">
        <div class="p-6 rounded-3xl bg-[#0B132B] text-white border border-[#D4AF37]/40 shadow-xl text-right">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-gray-800">
                <div class="flex items-center gap-3">
                    <span style="font-size:2rem;">⚖️</span>
                    <div>
                        <h3 class="text-xl font-bold font-serif text-white">پرتال جامع موکلین دفتر وکالت SedRazavi</h3>
                        <p class="text-xs text-gray-300">مشاهده لحظه‌ای لوایح، تقویم جلسات دادگاه و اسناد محرمانه</p>
                    </div>
                </div>
                <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">سامانه امن ثنا</span>
            </div>
            <div class="py-6 text-center">
                <p class="text-sm text-gray-300 mb-4">برای مشاهده پرونده‌های خود، شماره پرونده یا کد ملی خود را وارد فرمایید:</p>
                <form class="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
                    <input type="text" placeholder="شماره کلاسه پرونده (مثال: ۱۴۰۳-۹۸۲۷۳-ونک)..." class="px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-900 text-white text-xs w-full sm:w-80" />
                    <button type="button" class="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold">ورود به کارتابل</button>
                </form>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_client_portal', 'sedrazavi_shortcode_client_portal');

/**
 * ۲. کد کوتاه پیگیری سریع پرونده [sedrazavi_tracking]
 */
function sedrazavi_shortcode_tracking($atts) {
    ob_start();
    ?>
    <div class="sedrazavi-tracking-box p-6 rounded-2xl bg-white border border-gray-200 shadow-lg text-right max-w-xl mx-auto">
        <h4 class="text-base font-bold text-[#0B132B] mb-2">استعلام سریع وضعیت پرونده</h4>
        <p class="text-xs text-gray-500 mb-4">کد پرونده درج‌شده در قرارداد وکالت را وارد نمایید:</p>
        <div class="flex gap-2">
            <input type="text" placeholder="کد رهگیری پرونده..." class="flex-1 px-4 py-2 rounded-xl border border-gray-300 text-xs font-mono" />
            <button class="btn-gold px-5 py-2 rounded-xl text-xs font-bold">استعلام</button>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_tracking', 'sedrazavi_shortcode_tracking');

/**
 * ۳. کد کوتاه پل‌های ارتباطی و شبکه‌های اجتماعی [sedrazavi_social_icons]
 */
function sedrazavi_shortcode_social_icons($atts) {
    ob_start();
    ?>
    <div class="sedrazavi-social-channels text-right py-4">
        <h4 class="text-sm font-bold text-gray-800 mb-3">شبکه‌های اجتماعی و پیام‌رسان‌های وکیل:</h4>
        <div class="flex flex-wrap gap-3">
            <a href="https://instagram.com/Dr_SedRazavi_Law" target="_blank" class="px-4 py-2 rounded-xl bg-pink-500/10 text-pink-600 border border-pink-500/20 text-xs font-bold flex items-center gap-1.5">
                <span>اینستاگرام رسمی: @Dr_SedRazavi_Law</span>
            </a>
            <a href="https://t.me/SedRazavi_Law" target="_blank" class="px-4 py-2 rounded-xl bg-sky-500/10 text-sky-600 border border-sky-500/20 text-xs font-bold flex items-center gap-1.5">
                <span>تلگرام دفتر: @SedRazavi_Law</span>
            </a>
            <a href="https://wa.me/989123456789" target="_blank" class="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5">
                <span>واتس‌اپ ارسال مدارک: ۰۹۱۲۳۴۵۶۷۸۹</span>
            </a>
            <a href="https://linkedin.com" target="_blank" class="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-600 border border-blue-500/20 text-xs font-bold flex items-center gap-1.5">
                <span>لینکدین تخصصی</span>
            </a>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_social_icons', 'sedrazavi_shortcode_social_icons');

/**
 * ۴. کد کوتاه اسکرول‌بار طلایی [sedrazavi_gold_scroll]
 */
function sedrazavi_shortcode_gold_scroll() {
    ob_start();
    ?>
    <div id="sr-gold-scrollbar-indicator" style="position:fixed; top:0; left:0; height:4px; background:linear-gradient(90deg, #D4AF37, #F3E5AB); z-index:99999; width:0%; transition:width 0.1s ease-out;"></div>
    <script>
    window.addEventListener('scroll', function() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        var el = document.getElementById('sr-gold-scrollbar-indicator');
        if (el) el.style.width = scrolled + '%';
    });
    </script>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_gold_scroll', 'sedrazavi_shortcode_gold_scroll');
