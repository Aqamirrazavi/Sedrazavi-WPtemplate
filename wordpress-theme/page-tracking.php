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
                        <label class="block text-xs font-bold text-gray-700 mb-1">کد ملی موکل:</label>
                        <input type="text" id="national-code" placeholder="۱۰ رقم کد ملی" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-mono" />
                    </div>
                </div>
                <button type="submit" class="btn-gold px-6 py-2.5 rounded-xl font-bold text-xs shadow-md">استعلام آنلاین پرونده</button>
            </form>
        </div>

        <?php echo do_shortcode('[sedrazavi_client_portal]'); ?>
        <?php echo do_shortcode('[sedrazavi_gold_scroll]'); ?>
    </div>
</div>

<?php get_footer(); ?>