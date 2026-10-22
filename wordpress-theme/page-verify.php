<?php
/**
 * Template Name: تأییدیه اصالت ارتباطات و هویت (Official Verification Portal)
 * Description: Anti-impersonation and cryptographic identity verification portal for Seyyed Amir Hossein Razavi Fordoei.
 *
 * @package SedRazavi
 * @version 6.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="sr-verify-wrapper py-12 px-4 max-w-5xl mx-auto">
    <div class="sr-verify-header bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-8 text-center text-white shadow-2xl relative overflow-hidden">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-4">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span><?php esc_html_e('مرجع رسمی تأیید هویت و ارتباطات', 'sedrazavi'); ?></span>
        </div>

        <h1 class="text-3xl md:text-4xl font-black mb-3">
            <?php esc_html_e('تأییدیه اصالت هویت: سید امیر حسین رضوی فردویی', 'sedrazavi'); ?>
        </h1>
        <p class="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            <?php esc_html_e('جهت مقابله با سوءاستفاده‌های احتمالی و حساب‌های کاربری جعلی، کلیه مکاتبات رسمی، استعلامات و قراردادهای تجاری منحصراً از طریق شناسه‌های تاییدشده زیر صورت می‌پذیرد.', 'sedrazavi'); ?>
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Eitaa Official Channel & ID -->
        <div class="sr-verify-card bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-white relative">
            <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xl border border-orange-500/30">
                    E
                </div>
                <div>
                    <h3 class="font-bold text-lg"><?php esc_html_e('پیام‌رسان رسمی ایتا (Eitaa)', 'sedrazavi'); ?></h3>
                    <span class="text-xs text-emerald-400 flex items-center gap-1">✓ <?php esc_html_e('حساب رسمی تاییدشده', 'sedrazavi'); ?></span>
                </div>
            </div>
            <p class="text-slate-400 text-sm mb-4">
                <?php esc_html_e('پاسخگویی سریع به پیام‌ها و پروژه‌های داخلی با قابلیت اتصال مستقیم پروتکل.', 'sedrazavi'); ?>
            </p>
            <div class="bg-black/40 rounded-xl p-3 flex items-center justify-between font-mono text-sm border border-slate-800 mb-4">
                <span class="text-slate-300">@sedrazavi</span>
                <span class="text-xs text-slate-500">https://eitaa.com/sedrazavi</span>
            </div>
            <a href="https://eitaa.com/sedrazavi" target="_blank" rel="noopener noreferrer" class="sr-verify-btn block text-center py-2.5 px-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold transition-all">
                <?php esc_html_e('شروع گفت‌وگو در ایتا ←', 'sedrazavi'); ?>
            </a>
        </div>

        <!-- Telegram Official Channel & ID -->
        <div class="sr-verify-card bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-white relative">
            <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xl border border-sky-500/30">
                    T
                </div>
                <div>
                    <h3 class="font-bold text-lg"><?php esc_html_e('پیام‌رسان رسمی تلگرام (Telegram)', 'sedrazavi'); ?></h3>
                    <span class="text-xs text-emerald-400 flex items-center gap-1">✓ <?php esc_html_e('حساب رسمی تاییدشده', 'sedrazavi'); ?></span>
                </div>
            </div>
            <p class="text-slate-400 text-sm mb-4">
                <?php esc_html_e('هندل بین‌المللی جهت ارسال اسناد پروژه، فایل‌های فیگما و جلسات آنلاین.', 'sedrazavi'); ?>
            </p>
            <div class="bg-black/40 rounded-xl p-3 flex items-center justify-between font-mono text-sm border border-slate-800 mb-4">
                <span class="text-slate-300">@sedrazavi</span>
                <span class="text-xs text-slate-500">https://t.me/sedrazavi</span>
            </div>
            <a href="https://t.me/sedrazavi" target="_blank" rel="noopener noreferrer" class="sr-verify-btn block text-center py-2.5 px-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold transition-all">
                <?php esc_html_e('ارسال پیام در تلگرام ←', 'sedrazavi'); ?>
            </a>
        </div>
    </div>

    <!-- PGP Signature & Security Certificate -->
    <div class="sr-verify-pgp bg-black/60 border border-slate-800 rounded-2xl p-6 text-slate-300 font-mono text-xs">
        <div class="text-amber-400 font-bold mb-2 flex items-center gap-2">
            <span>🛡️</span>
            <span><?php esc_html_e('امضای دیجیتال و اثر انگشت PGP معمار سامانه:', 'sedrazavi'); ?></span>
        </div>
        <p class="text-slate-400 leading-relaxed break-all">
            F67B 90A2 E834 1C5D B399 43E1 8DA2 7430 52C9 ED1F // Seyyed Amir Hossein Razavi Fordoei &lt;sar42ei@gmail.com&gt;
        </p>
    </div>
</div>

<?php
get_footer();
