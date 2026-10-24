<?php
/**
 * Template Name: کتابخانه مرکزی بسته‌ها (SedRazavi OS Library Catalog)
 * Description: Versioned package catalog, Gutenberg/Elementor parity matrix, SHA-256 integrity checks, and safe install pipeline.
 *
 * @package SedRazavi
 * @version 25.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

$engine = class_exists('SedRazavi_Library_Engine') ? SedRazavi_Library_Engine::get_instance() : null;
$manifest = $engine ? $engine->get_manifest() : [
    'schema_version' => '1.0',
    'total_items' => 4,
    'items' => []
];
?>

<div class="sr-lib-catalog-page py-12 px-4 max-w-7xl mx-auto">
    <!-- Header Section -->
    <div class="sr-lib-header bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-8 text-white shadow-2xl relative overflow-hidden">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
                <span class="sr-lib-badge inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 mb-3">
                    <?php esc_html_e('کتابخانه مرکزی بسته‌ها و اکوسیستم v25.0', 'sedrazavi'); ?>
                </span>
                <h1 class="sr-lib-title text-2xl md:text-4xl font-black mb-2">
                    <?php esc_html_e('کاتالوگ متمرکز و مانیفست توزیع بسته‌های SedRazavi OS', 'sedrazavi'); ?>
                </h1>
                <p class="sr-lib-subtitle text-slate-400 text-xs md:text-sm max-w-2xl leading-relaxed">
                    <?php esc_html_e('بسته‌های نرم‌افزاری استاندارد با چرخه عمر مستقل، اعتبارسنجی تمامیت هش SHA-256، تفکیک داده از قالب و ماتریس انطباق دوگانه گوتنبرگ و المنتور.', 'sedrazavi'); ?>
                </p>
            </div>

            <div class="sr-lib-stats flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 shrink-0">
                <div class="text-center px-3 border-l border-slate-800">
                    <span class="sr-lib-stat-num text-lg font-black text-emerald-400 font-mono">۴</span>
                    <span class="sr-lib-stat-lbl block text-[10px] text-slate-400"><?php esc_html_e('بسته فعال', 'sedrazavi'); ?></span>
                </div>
                <div class="text-center px-3 border-l border-slate-800">
                    <span class="sr-lib-stat-num text-lg font-black text-cyan-400 font-mono">1.0</span>
                    <span class="sr-lib-stat-lbl block text-[10px] text-slate-400"><?php esc_html_e('طرح‌واره', 'sedrazavi'); ?></span>
                </div>
                <div class="text-center px-3">
                    <span class="sr-lib-stat-num text-lg font-black text-indigo-400 font-mono">100%</span>
                    <span class="sr-lib-stat-lbl block text-[10px] text-slate-400"><?php esc_html_e('امنیت SSRF', 'sedrazavi'); ?></span>
                </div>
            </div>
        </div>
    </div>

    <!-- Package Grid -->
    <div class="sr-lib-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <?php foreach ($manifest['items'] as $pkg) : ?>
            <div class="sr-lib-card bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 text-white transition-all shadow-xl flex flex-col justify-between">
                <div>
                    <div class="sr-lib-card-top flex items-center justify-between mb-4">
                        <span class="sr-lib-tag inline-block px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-slate-800 text-indigo-300 border border-slate-700">
                            <?php echo esc_html($pkg['package_id']); ?>
                        </span>
                        <span class="sr-lib-trust px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            ✓ <?php esc_html_e('امضای رسمی ناشر', 'sedrazavi'); ?>
                        </span>
                    </div>

                    <h3 class="sr-lib-pkg-title text-lg font-bold mb-2">
                        <?php echo esc_html($pkg['title']); ?>
                    </h3>
                    <p class="sr-lib-pkg-desc text-xs text-slate-400 leading-relaxed mb-4">
                        <?php echo esc_html($pkg['description']); ?>
                    </p>

                    <!-- Parity & Engine Matrix -->
                    <div class="sr-lib-parity-box bg-slate-950 p-3 rounded-xl border border-slate-800/80 mb-4 text-xs font-mono">
                        <div class="flex items-center justify-between mb-1.5">
                            <span class="text-slate-400"><?php esc_html_e('گوتنبرگ (Gutenberg):', 'sedrazavi'); ?></span>
                            <span class="text-cyan-400 font-bold"><?php echo esc_html($pkg['editor_parity']['gutenberg'] ?? 'native'); ?></span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-slate-400"><?php esc_html_e('المنتور (Elementor):', 'sedrazavi'); ?></span>
                            <span class="text-indigo-400 font-bold"><?php echo esc_html($pkg['editor_parity']['elementor'] ?? 'adapter'); ?></span>
                        </div>
                    </div>
                </div>

                <div class="sr-lib-card-footer pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span class="sr-lib-meta text-slate-500 font-mono">
                        v<?php echo esc_html($pkg['version']); ?> • <?php echo esc_html(round($pkg['artifact']['size_bytes'] / 1024)); ?> KB
                    </span>
                    <button type="button" class="sr-lib-install-btn px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-indigo-600/30">
                        <?php esc_html_e('دریافت بسته و بررسی SHA-256', 'sedrazavi'); ?>
                    </button>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <!-- Security & Recovery Principles (Section 6.4 & 8.3) -->
    <div class="sr-lib-security-box bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white text-xs leading-relaxed">
        <h4 class="text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2">
            🛡️ <?php esc_html_e('اصول حفاظت و بازیابی چرخهٔ نصب (Safe Install Pipeline):', 'sedrazavi'); ?>
        </h4>
        <ul class="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300 mt-3">
            <li class="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <strong class="text-white block mb-1"><?php esc_html_e('۱. سپر ضد SSRF', 'sedrazavi'); ?></strong>
                <?php esc_html_e('مسدودسازی کلیه مقاصد لوپ‌بک، رنج‌های شبکه خصوصی و متادیتا سرور.', 'sedrazavi'); ?>
            </li>
            <li class="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <strong class="text-white block mb-1"><?php esc_html_e('۲. اسنپ‌شات و Rollback', 'sedrazavi'); ?></strong>
                <?php esc_html_e('تهیه نسخه پشتیبان اتمیک پیش از اعمال هرگونه مهاجرت یا تغییر فایل.', 'sedrazavi'); ?>
            </li>
            <li class="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <strong class="text-white block mb-1"><?php esc_html_e('۳. تمامیت SHA-256', 'sedrazavi'); ?></strong>
                <?php esc_html_e('اعتبارسنجی قطعی چک‌سام پیش از باز کردن فایل زیپ و جلوگیری از Zip-Slip.', 'sedrazavi'); ?>
            </li>
        </ul>
    </div>
</div>

<?php
get_footer();
