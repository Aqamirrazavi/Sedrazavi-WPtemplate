<?php
/**
 * The sidebar containing the main widget area
 *
 * @package SedRazavi
 * @version 2.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<aside id="secondary" class="widget-area space-y-6" role="complementary">
    <!-- Lawyer Profile Widget -->
    <div class="bg-white dark:bg-[#0B132B] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm text-center space-y-4">
        <div class="w-20 h-20 mx-auto rounded-full bg-[#D4AF37] text-white flex items-center justify-center text-3xl font-serif font-bold shadow-lg">
            ⚖️
        </div>
        <div>
            <h3 class="font-bold font-serif text-lg text-[#0B132B] dark:text-white"><?php esc_html_e('وکیل سید رضوی', 'sedrazavi'); ?></h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1"><?php esc_html_e('وکیل پایه یک دادگستری و مشاور حقوقی', 'sedrazavi'); ?></p>
        </div>
        <div class="pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300 space-y-2">
            <p>📞 <?php echo esc_html(get_option('sedrazavi_office_phone', '۰۲۱-۸۸۹۹۰۰۱۱')); ?></p>
            <p>✉️ <?php echo esc_html(get_option('sedrazavi_office_email', 'info@sedrazavi-law.ir')); ?></p>
        </div>
        <a href="#booking" class="btn-gold w-full block py-2.5 text-xs">
            <span>درخواست مشاوره آنلاین</span>
        </a>
    </div>

    <?php dynamic_sidebar('sidebar-1'); ?>
</aside>
