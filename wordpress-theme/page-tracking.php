<?php
/**
 * Template Name: پیگیری پرونده (Case Tracking)
 * Description: Confidential case status tracking portal
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-16 bg-[#F4F6F9] min-h-screen text-[#0B132B]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-12">
        <div class="text-center max-w-2xl mx-auto space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] text-xs font-bold border border-[#D4AF37]/40">سامانه محرمانه موکلین</span>
            <h1 class="text-3xl sm:text-4xl font-black text-[#0B132B]">پیگیری برخط وضعیت دادرسی و لوایح دفاعیه</h1>
            <p class="text-gray-600 text-sm">مشاهده زنده آخرین اقدامات، وقت نظارت دادگاه و دریافت نسخه‌های لوایح</p>
        </div>

        <div class="rounded-3xl p-8 bg-white border border-gray-200 shadow-xl text-right">
            <form id="tracking-form" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">شماره پرونده وکالت:</label>
                        <input type="text" id="case-code" required placeholder="مثال: SR-1402-8821" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-mono" />
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">شماره همراه ثبت‌شده موکل:</label>
                        <input type="tel" id="tracking-phone" dir="ltr" required placeholder="۰۹۱۲۳۴۵۶۷۸۹" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-mono text-left" />
                    </div>
                </div>
                <button type="submit" class="btn-gold px-6 py-2.5 rounded-xl font-bold text-xs shadow-md cursor-pointer">استعلام آنلاین پرونده</button>
                <div id="tracking-result-box" role="status" aria-live="polite" class="hidden p-4 rounded-xl text-xs leading-relaxed"></div>
            </form>
        </div>

        <?php echo do_shortcode('[sedrazavi_client_portal]'); ?>
        <?php echo do_shortcode('[sedrazavi_gold_scroll]'); ?>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    var tf = document.getElementById('tracking-form');
    if (!tf) return;
    tf.addEventListener('submit', function(e) {
        e.preventDefault();
        var code = (document.getElementById('case-code') || {}).value || '';
        var phone = (document.getElementById('tracking-phone') || {}).value || '';
        var box = document.getElementById('tracking-result-box');
        var btn = tf.querySelector('button[type="submit"]');
        var cfg = window.SedRazaviThemeConfig || {};
        var endpoint = (cfg.restUrl ? cfg.restUrl : '<?php echo esc_js(esc_url_raw(rest_url('sedrazavi/v1/'))); ?>') + 'track-case';
        if (!code.trim() || !phone.trim()) {
            if (box) {
                box.className = 'p-4 rounded-xl text-xs leading-relaxed bg-red-50 border border-red-200 text-red-700';
                box.textContent = 'وارد کردن شماره پرونده و شماره همراه ثبت‌شده موکل الزامی است.';
            }
            return;
        }
        if (btn) btn.disabled = true;
        if (box) {
            box.className = 'p-4 rounded-xl text-xs leading-relaxed bg-gray-50 border border-gray-200 text-gray-700';
            box.textContent = 'در حال استعلام از سامانه پرونده‌ها...';
        }
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': cfg.restNonce || ''
            },
            body: JSON.stringify({ case_number: code.trim(), client_phone: phone.trim() })
        })
        .then(function(r) { return r.json().then(function(d) { return { ok: r.ok, data: d }; }); })
        .then(function(res) {
            if (btn) btn.disabled = false;
            if (res.ok && res.data && res.data.found) {
                if (box) {
                    box.className = 'p-4 rounded-xl text-xs leading-relaxed bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1';
                    box.textContent = 'وضعیت پرونده ' + (res.data.case_number || code) + ': ' + (res.data.status || '') + ' | شعبه: ' + (res.data.court_branch || '') + ' | جلسه بعدی: ' + (res.data.next_session || '');
                }
            } else {
                if (box) {
                    box.className = 'p-4 rounded-xl text-xs leading-relaxed bg-red-50 border border-red-200 text-red-700';
                    box.textContent = (res.data && res.data.message) ? res.data.message : 'پرونده‌ای با این مشخصات یافت نشد.';
                }
            }
        })
        .catch(function() {
            if (btn) btn.disabled = false;
            if (box) {
                box.className = 'p-4 rounded-xl text-xs leading-relaxed bg-red-50 border border-red-200 text-red-700';
                box.textContent = 'خطا در برقراری ارتباط با سرور استعلام.';
            }
        });
    });
});
</script>

<?php get_footer(); ?>