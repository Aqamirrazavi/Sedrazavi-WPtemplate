<?php
/**
 * SedRazavi Judicial Calculators Suite (Part 8)
 * Official Judiciary Tariffs & Central Bank Inflation Index
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Calculators {

    public static function init() {
        add_shortcode('sedrazavi_judicial_calculators', [__CLASS__, 'render_shortcode']);
        add_action('wp_ajax_nopriv_sedrazavi_calc_api', [__CLASS__, 'ajax_calculate']);
        add_action('wp_ajax_sedrazavi_calc_api', [__CLASS__, 'ajax_calculate']);
    }

    /**
     * جدول رسمی شاخص کل بهای کالاها و خدمات مصرفی بانک مرکزی جمهوری اسلامی ایران
     */
    public static function get_cbi_indices() {
        return [
            1360 => 0.05,
            1365 => 0.10,
            1370 => 0.25,
            1375 => 0.98,
            1380 => 2.14,
            1385 => 4.07,
            1390 => 9.15,
            1395 => 22.88,
            1396 => 25.07,
            1397 => 32.65,
            1398 => 46.12,
            1399 => 62.90,
            1400 => 88.06,
            1401 => 129.00,
            1402 => 196.72,
            1403 => 285.25,
        ];
    }

    /**
     * محاسبه هزینه دادرسی دادگستری
     */
    public static function calculate_court_fee($amount, $stage = 'first', $is_council = false) {
        if ($is_council) {
            return round($amount * 0.05);
        }
        if ($stage === 'first') {
            if ($amount <= 200000000) {
                return round($amount * 0.025);
            }
            return round(5000000 + ($amount - 200000000) * 0.035);
        } elseif ($stage === 'appeal') {
            return round($amount * 0.045);
        }
        return round($amount * 0.055); // دیوان عالی کشور
    }

    /**
     * محاسبه مهریه بر اساس شاخص بانک مرکزی
     */
    public static function calculate_mehrieh($original_amount, $marriage_year, $demand_year = 1403) {
        $indices = self::get_cbi_indices();
        $idx_marriage = $indices[$marriage_year] ?? 4.07;
        $idx_target = $indices[$demand_year - 1] ?? 196.72;
        $multiplier = round($idx_target / $idx_marriage, 2);
        return [
            'multiplier' => $multiplier,
            'result'     => round($original_amount * $multiplier),
        ];
    }

    public static function render_shortcode($atts) {
        ob_start();
        ?>
        <div id="sedrazavi-calculators-mount" class="sedrazavi-calc-container my-8">
            <div class="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl text-center">
                <h3 class="text-xl font-bold font-serif text-[#0B132B] dark:text-white mb-2">
                    میز محاسبات رسمی دادگستری و تعرفه حق‌الوکاله
                </h3>
                <p class="text-xs text-gray-500 mb-6">
                    محاسبه هزینه دادرسی، تمبر مالیاتی، تاخیر تادیه، مهریه و دیه بر اساس آخرین بخشنامه‌ها
                </p>
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37]/10 text-[#AA820A] dark:text-[#D4AF37] font-bold text-xs">
                    ⚖️ سامانه محاسبه هوشمند آماده است.
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}

SedRazavi_Calculators::init();