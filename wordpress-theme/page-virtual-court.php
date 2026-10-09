<?php
/**
 * Template Name: تالار دادگاه مجازی و جلسات استماع
 * Description: بستر امن دادرسی الکترونیک و استماع مجازی لایحه دفاعیه
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

if (!defined('ABSPATH')) exit;

// Access control: Protected behind authentication/permission
if (!is_user_logged_in() && !(defined('SEDRAZAVI_ALLOW_MOCK_HEADERS') && SEDRAZAVI_ALLOW_MOCK_HEADERS === true)) {
    auth_redirect();
    exit;
}

// SEO Directive: Confidential judicial hearing sessions must be strictly noindex, nofollow
header('X-Robots-Tag: noindex, nofollow', true);
add_filter('wp_robots', function($robots) {
    $robots['noindex']  = true;
    $robots['nofollow'] = true;
    return $robots;
});

get_header();

// No fixed default session data
$session_code = isset($_GET['session']) ? sanitize_text_field(wp_unslash($_GET['session'])) : '';
$has_session  = !empty($session_code);
?>

<main class="site-main py-10 px-4 sm:px-6 lg:px-8 bg-[#060B18] text-white min-h-screen" dir="rtl">
    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- Header Room Banner -->
        <header class="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#151D36] to-[#0B132B] border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="space-y-3">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-bold">
                        <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                        <span>شعبه دادرسی برخط و استماع مجازی محرمانه</span>
                    </div>
                    <h1 class="text-2xl md:text-3xl font-extrabold text-[#D4AF37] font-serif">
                        اتاق داوری و دادگاه مجازی دفتر وکالت
                    </h1>
                    <p class="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
                        بستر امن دادرسی الکترونیک با رمزنگاری سرتاسری و احراز هویت ثنا جهت جلسات رسمی استماع لوایح، دفاعیات و داوری.
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row items-center gap-3">
                    <div class="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-emerald-400 font-mono flex items-center gap-2">
                        <span>🔐 E2E Encrypted</span>
                    </div>
                    <?php if ($has_session) : ?>
                        <span class="text-xs text-slate-400 font-mono">شناسه جلسه: <?php echo esc_html($session_code); ?></span>
                    <?php endif; ?>
                </div>
            </div>
        </header>

        <?php if ($has_session) : ?>
            <!-- React Interactive Container -->
            <div class="virtual-court-room-container">
                <?php echo do_shortcode('[sedrazavi_virtual_courtroom session="' . esc_attr($session_code) . '"]'); ?>
            </div>
        <?php else : ?>
            <!-- Session Entry Form / Empty State -->
            <div class="p-8 md:p-12 rounded-3xl bg-[#0B132B] border border-slate-800 text-center max-w-2xl mx-auto space-y-6">
                <div class="w-16 h-16 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] mx-auto flex items-center justify-center text-3xl">
                    ⚖️
                </div>
                <div class="space-y-2">
                    <h2 class="text-xl font-bold text-white">
                        ورود به تالار دادرسی مجازی
                    </h2>
                    <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        جهت ورود به جلسه استماع دادگاه یا داوری، لطفاً شناسه اختصاصی جلسه (ارسال شده از طریق پیامک یا ابلاغیه دفتر) را وارد فرمایید.
                    </p>
                </div>

                <form method="get" action="<?php echo esc_url(get_permalink()); ?>" class="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                    <input 
                        type="text" 
                        name="session" 
                        placeholder="شناسه جلسه (مانند: VR-1403-XXX)" 
                        required 
                        class="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs text-center font-mono focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button 
                        type="submit" 
                        class="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#C4981C] text-[#0B132B] font-bold text-xs shadow-md transition-colors shrink-0"
                    >
                        ورود به جلسه
                    </button>
                </form>

                <div class="pt-4 border-t border-slate-800/80">
                    <p class="text-[11px] text-slate-500">
                        در صورت عدم دریافت شناسه جلسه یا بروز مشکل در ورود، با دبیرخانه دفتر وکالت تماس حاصل فرمایید.
                    </p>
                </div>
            </div>
        <?php endif; ?>

    </div>
</main>

<?php
get_footer();
