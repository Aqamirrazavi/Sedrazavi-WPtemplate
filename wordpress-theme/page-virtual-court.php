<?php
/**
 * Template Name: تالار دادگاه مجازی و جلسات استماع
 * Description: شبیه‌ساز و بستر امن دادرسی الکترونیک با رمزنگاری سرتاسری و شمارشگر دفاع وکیل
 *
 * @package SedRazavi_Law_Firm
 * @version 5.0.0
 */

get_header();
?>

<main class="site-main py-10 px-4 sm:px-6 lg:px-8 bg-[#060B18] text-white min-h-screen">
    <div class="max-w-7xl mx-auto space-y-6">
        
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
                <span class="px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/30">
                    🔴 اتاق دادرسی برخط و استماع اظهارات
                </span>
                <h1 class="text-xl sm:text-2xl font-bold font-serif text-[#D4AF37] mt-2">
                    اتاق داوری و استماع مجازی دفتر وکالت ونک
                </h1>
            </div>
            <div class="text-xs text-emerald-400 flex items-center gap-1.5 font-mono">
                <span>🔐 E2E 256-Bit Encrypted</span>
            </div>
        </div>

        <div class="virtual-court-room-container">
            <?php echo do_shortcode('[sedrazavi_virtual_courtroom]'); ?>
        </div>

    </div>
</main>

<?php
get_footer();
