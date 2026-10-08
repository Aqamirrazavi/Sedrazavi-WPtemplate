<?php
/**
 * Template Name: تالار دادگاه مجازی و جلسات استماع
 * Description: شبیه‌ساز و بستر امن دادرسی الکترونیک با رمزنگاری سرتاسری و شمارشگر دفاع وکیل
 *
 * @package SedRazavi_Law_Firm
 * @version 6.0.0
 */

get_header();

// Sample courtroom session data for SSR
$session_code = sanitize_text_field($_GET['session'] ?? 'VR-1403-LAW-892');
$is_hearing_active = true;
?>

<main class="site-main py-10 px-4 sm:px-6 lg:px-8 bg-[#060B18] text-white min-h-screen">
    <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- Header Room Banner -->
        <header class="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#151D36] to-[#0B132B] border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="space-y-3">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-bold animate-pulse">
                        <span class="w-2 h-2 rounded-full bg-rose-500"></span>
                        <span>🔴 شعبه دادرسی برخط و استماع مجازی لایحه دفاعیه</span>
                    </div>
                    <h1 class="text-2xl md:text-3xl font-extrabold text-[#D4AF37] font-serif">
                        اتاق داوری و دادگاه مجازی دفتر وکالت ونک
                    </h1>
                    <p class="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
                        بستر امن دادرسی الکترونیک منطبق با بخشنامه دادرسی الکترونیکی قوه قضائیه، ضبط ثبتی جلسات استماع، ارزیابی ادله دیجیتال و تبادل محرمانه لوایح میان وکلا و داوران.
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row items-center gap-3">
                    <div class="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-emerald-400 font-mono flex items-center gap-2">
                        <span>🔐 256-Bit E2E Encrypted</span>
                    </div>
                    <span class="text-xs text-slate-400 font-mono">شناسه جلسه: <?php echo esc_html($session_code); ?></span>
                </div>
            </div>
        </header>

        <!-- React Interactive Container -->
        <div class="virtual-court-room-container">
            <?php echo do_shortcode('[sedrazavi_virtual_courtroom]'); ?>
        </div>

        <!-- Pure PHP / SSR Court Chamber Overview -->
        <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Chamber Agenda -->
            <div class="lg:col-span-2 p-6 rounded-3xl bg-[#0B132B]/90 border border-slate-800 shadow-xl space-y-4">
                <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h2 class="text-base font-bold text-[#D4AF37] flex items-center gap-2">
                        <span>📋 دستور جلسه استماع و نوبت دفاعیات</span>
                    </h2>
                    <span class="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">جلسه رسمی دادرسی</span>
                </div>

                <div class="space-y-3 text-xs text-slate-300">
                    <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <span class="w-6 h-6 rounded-full bg-[#D4AF37] text-[#0B132B] font-bold flex items-center justify-center text-xs">۱</span>
                            <span>احراز هویت ثنا و وکالت‌نامه رسمی وکلای طرفین</span>
                        </div>
                        <span class="text-emerald-400 font-bold">انجام شد</span>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <span class="w-6 h-6 rounded-full bg-[#D4AF37] text-[#0B132B] font-bold flex items-center justify-center text-xs">۲</span>
                            <span>استماع اظهارات وکیل خواهان پیرامون عدم اجرای تعهدات قراردادی</span>
                        </div>
                        <span class="text-amber-400 font-bold">در حال استماع (۱۵ دقیقه)</span>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <span class="w-6 h-6 rounded-full bg-slate-700 text-slate-300 font-bold flex items-center justify-center text-xs">۳</span>
                            <span>دفاعیات وکیل خوانده و ارائه اسناد و دفاتر مالی</span>
                        </div>
                        <span class="text-slate-500">نوبت بعدی</span>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <span class="w-6 h-6 rounded-full bg-slate-700 text-slate-300 font-bold flex items-center justify-center text-xs">۴</span>
                            <span>خاتمه رسیدگی و تنظیم صورت‌مجلس امضاشده دیجیتال</span>
                        </div>
                        <span class="text-slate-500">مرحله نهایی</span>
                    </div>
                </div>
            </div>

            <!-- Judicial Evidence & Files -->
            <div class="p-6 rounded-3xl bg-[#0B132B]/90 border border-slate-800 shadow-xl space-y-4">
                <h3 class="text-base font-bold text-white flex items-center gap-2">
                    <span>📁 اسناد و پرونده الکترونیک</span>
                </h3>
                <div class="space-y-2 text-xs">
                    <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <span class="text-slate-300">قرارداد مشارکت مدنی ۹۸</span>
                        <span class="text-[#D4AF37] text-[10px] font-mono">PDF (1.8 MB)</span>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <span class="text-slate-300">گواهی عدم حضور دفتر اسناد</span>
                        <span class="text-[#D4AF37] text-[10px] font-mono">JPG (840 KB)</span>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <span class="text-slate-300">نظر کارشناس رسمی دادگستری</span>
                        <span class="text-[#D4AF37] text-[10px] font-mono">PDF (4.2 MB)</span>
                    </div>
                </div>

                <div class="pt-4 border-t border-slate-800 text-center">
                    <a href="<?php echo esc_url(home_url('/contact')); ?>" class="w-full py-2.5 px-4 rounded-xl bg-[#D4AF37] text-[#0B132B] font-bold text-xs shadow hover:brightness-110 transition block">
                        رزرو جلسه استماع با سرداور
                    </a>
                </div>
            </div>
        </section>

    </div>
</main>

<?php
get_footer();
