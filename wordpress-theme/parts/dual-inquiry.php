<?php
/**
 * SedRazavi OS - Dual-Mode (GUI + CLI) Inquiry Gateway Part
 * Location: wordpress-theme/parts/dual-inquiry.php
 *
 * @package SedRazavi
 * @version 6.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

$inquiry_nonce = wp_create_nonce('sedrazavi_inquiry_action');
?>

<div class="sr-dual-gateway-section py-16 px-4 max-w-6xl mx-auto" id="inquiry-gateway">
    <div class="sr-dual-gateway-header text-center mb-10">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 mb-3">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span><?php esc_html_e('درگاه دومنظوره ثبت استعلام: گرافیکی یا ترمینال یونیکس', 'sedrazavi'); ?></span>
        </div>
        <h2 class="text-3xl md:text-4xl font-black text-white mb-3">
            <?php esc_html_e('شروع پروژه با معمار ارشد سید امیر حسین رضوی فردویی', 'sedrazavi'); ?>
        </h2>
        <p class="text-slate-400 text-sm max-w-2xl mx-auto">
            <?php esc_html_e('طراحی اختصاصی بدون کدنویسی مازاد. فرم استعلام مجهز به صف ذخیره‌سازی آفلاین (IndexedDB) در صورت اختلال شبکه است.', 'sedrazavi'); ?>
        </p>
    </div>

    <!-- Mode Switcher -->
    <div class="sr-mode-switcher-bar flex justify-center gap-3 mb-8">
        <button type="button" class="sr-mode-btn-gui px-6 py-2.5 rounded-xl text-xs font-black transition-all bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" data-mode="gui">
            <?php esc_html_e('فرم تعاملی سایبر-گلس (GUI)', 'sedrazavi'); ?>
        </button>
        <button type="button" class="sr-mode-btn-cli px-6 py-2.5 rounded-xl text-xs font-black transition-all bg-slate-900 text-slate-400 hover:text-white border border-slate-800" data-mode="cli">
            <?php esc_html_e('ترمینال یونیکس مهندسی (CLI)', 'sedrazavi'); ?>
        </button>
    </div>

    <!-- 1. GUI Form Container -->
    <div class="sr-gui-form-box bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
        <form class="sr-ajax-inquiry-form grid grid-cols-1 md:grid-cols-2 gap-6" method="post" action="<?php echo esc_url(rest_url('sedrazavi/v1/inquiry/submit')); ?>">
            <input type="hidden" name="_wpnonce" value="<?php echo esc_attr($inquiry_nonce); ?>">
            <!-- Honeypot -->
            <input type="text" name="website_hp" class="sr-honeypot-field hidden" tabindex="-1" autocomplete="off" style="display:none !important;">

            <div>
                <label class="sr-form-label block text-xs font-bold text-slate-300 mb-2">
                    <?php esc_html_e('نام و نام خانوادگی یا نام سازمان:', 'sedrazavi'); ?>
                </label>
                <input type="text" name="name" class="sr-form-input w-full px-4 py-3 bg-black/50 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500" placeholder="<?php esc_attr_e('مثال: مهندس راد / شرکت توسعه آریا', 'sedrazavi'); ?>" required>
            </div>

            <div>
                <label class="sr-form-label block text-xs font-bold text-slate-300 mb-2">
                    <?php esc_html_e('شماره تماس یا آیدی پیام‌رسان (ایتا/تلگرام):', 'sedrazavi'); ?>
                </label>
                <input type="text" name="contact" class="sr-form-input w-full px-4 py-3 bg-black/50 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 font-mono" placeholder="<?php esc_attr_e('0912... یا @username', 'sedrazavi'); ?>" required>
            </div>

            <div class="md:col-span-2">
                <label class="sr-form-label block text-xs font-bold text-slate-300 mb-2">
                    <?php esc_html_e('نوع معماری مدنظر برای وب‌سایت:', 'sedrazavi'); ?>
                </label>
                <div class="sr-project-type-grid grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label class="sr-type-card flex items-center gap-3 p-3.5 bg-black/40 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
                        <input type="radio" name="project_type" value="enterprise" class="text-indigo-600 focus:ring-0" checked>
                        <div>
                            <div class="text-xs font-bold text-white"><?php esc_html_e('سازمانی و شرکتی', 'sedrazavi'); ?></div>
                            <div class="text-[10px] text-slate-400"><?php esc_html_e('با ساختار بدون کد JetEngine', 'sedrazavi'); ?></div>
                        </div>
                    </label>

                    <label class="sr-type-card flex items-center gap-3 p-3.5 bg-black/40 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
                        <input type="radio" name="project_type" value="crypto_web3" class="text-indigo-600 focus:ring-0">
                        <div>
                            <div class="text-xs font-bold text-white"><?php esc_html_e('ترمینال Web3 / کریپتو', 'sedrazavi'); ?></div>
                            <div class="text-[10px] text-slate-400"><?php esc_html_e('داشبورد سایبرنتیک با امنیت بالا', 'sedrazavi'); ?></div>
                        </div>
                    </label>

                    <label class="sr-type-card flex items-center gap-3 p-3.5 bg-black/40 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
                        <input type="radio" name="project_type" value="portfolio_luxury" class="text-indigo-600 focus:ring-0">
                        <div>
                            <div class="text-xs font-bold text-white"><?php esc_html_e('پورتفولیو و شخصی لوکس', 'sedrazavi'); ?></div>
                            <div class="text-[10px] text-slate-400"><?php esc_html_e('گره‌چینی پارامتریک و موشن', 'sedrazavi'); ?></div>
                        </div>
                    </label>
                </div>
            </div>

            <div class="md:col-span-2">
                <label class="sr-form-label block text-xs font-bold text-slate-300 mb-2">
                    <?php esc_html_e('توضیحات تکمیلی یا الزامات کلیدی:', 'sedrazavi'); ?>
                </label>
                <textarea name="details" rows="3" class="sr-form-textarea w-full px-4 py-3 bg-black/50 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500" placeholder="<?php esc_attr_e('نیاز به چندزبانه، درگاه پرداخت، سئو تکنیکال و...', 'sedrazavi'); ?>"></textarea>
            </div>

            <div class="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div class="sr-offline-indicator text-xs text-slate-400 flex items-center gap-2">
                    <span class="sr-ping-dot w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span><?php esc_html_e('صف تاب‌آوری محلی (Offline-First) فعال است', 'sedrazavi'); ?></span>
                </div>
                <button type="submit" class="sr-submit-btn w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/30">
                    <?php esc_html_e('شلیک استعلام و دریافت توکن رهگیری ←', 'sedrazavi'); ?>
                </button>
            </div>
        </form>
    </div>

    <!-- 2. Terminal CLI Container (Hidden by default, toggled via data-mode) -->
    <div class="sr-cli-terminal-box hidden bg-black/95 border border-slate-800 rounded-3xl p-6 font-mono text-xs shadow-2xl" id="cli-terminal-container">
        <div class="sr-terminal-topbar flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-slate-500">
            <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span class="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span class="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                <span class="text-slate-400 mr-2 text-[11px]">sedrazavi-terminal-v16.0 -- bash (x86_64-pc-linux-gnu)</span>
            </div>
            <span class="text-[10px] text-slate-500">Type 'help' for commands</span>
        </div>

        <div class="sr-terminal-output space-y-2 text-slate-300 min-h-[220px] max-h-[350px] overflow-y-auto mb-4" id="cli-output-log">
            <div class="text-emerald-400 font-bold"><?php esc_html_e('Welcome to SedRazavi Sovereign CLI (Seyyed Amir Hossein Razavi Fordoei)', 'sedrazavi'); ?></div>
            <div class="text-slate-500"><?php esc_html_e('Official Channels: @sedrazavi on Eitaa & Telegram | Anti-Impersonation: Verified', 'sedrazavi'); ?></div>
            <div class="text-slate-400"><?php esc_html_e('Type "help" to view command list or "inquire" to register a fast project lead.', 'sedrazavi'); ?></div>
        </div>

        <div class="sr-terminal-prompt-line flex items-center gap-2 pt-2 border-t border-slate-900">
            <span class="text-emerald-400 font-bold">sedrazavi@sovereign:~$</span>
            <input type="text" class="sr-cli-input flex-1 bg-transparent text-white border-0 outline-none focus:ring-0 p-0 text-xs font-mono" placeholder="help, whoami, skills, verify, calc, clear..." id="cli-input-command">
        </div>
    </div>
</div>
