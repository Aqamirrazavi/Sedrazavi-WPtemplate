<?php
/**
 * موتور پردازش امور شرکت‌ها، بازرگانی بین‌الملل و داوری (فاز ۸)
 *
 * @package SedRazavi
 * @version 8.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * ثبت شورت‌کد اصلی پرتال فاز ۸
 */
function sedrazavi_corporate_suite_shortcode($atts) {
    ob_start();
    ?>
    <div id="sedrazavi-corporate-suite-root" class="w-full">
        <!-- کامپوننت ری‌اکت در فرانت‌اند به این المان متصل می‌شود -->
        <div class="p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white font-serif">سامانه امور شرکت‌ها و داوری بازرگانی بین‌المللی فعال شد</h3>
            <p class="text-xs text-slate-500">تمامی ماژول‌های محاسباتی حد نصاب مجامع و اینکوترمز ۲۰۲۰ بارگذاری شدند.</p>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_corporate_suite', 'sedrazavi_corporate_suite_shortcode');

/**
 * ثبت REST API جهت محاسبه آنلاین حد نصاب مجامع شرکتی
 */
function sedrazavi_register_corporate_api() {
    register_rest_route('sedrazavi/v1', '/corporate-quorum', array(
        'methods'  => 'POST',
        'callback' => 'sedrazavi_calculate_quorum_api',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'sedrazavi_register_corporate_api');

function sedrazavi_calculate_quorum_api($request) {
    $company_type = sanitize_text_field($request->get_param('company_type')); // public_joint_stock, private_joint_stock, llc
    $meeting_type = sanitize_text_field($request->get_param('meeting_type')); // general_ordinary, extraordinary
    $turn = intval($request->get_param('turn')) ?: 1; // 1 or 2
    $attended_shares_pct = floatval($request->get_param('attended_shares_pct')); // e.g. 55.5

    $is_quorum_met = false;
    $required_quorum_desc = '';

    if ($company_type === 'private_joint_stock' || $company_type === 'public_joint_stock') {
        if ($meeting_type === 'general_ordinary') {
            if ($turn === 1) {
                $is_quorum_met = $attended_shares_pct > 50.0;
                $required_quorum_desc = 'بیش از ۵۰ درصد سهام دارای حق رأی (ماده ۸۴ لایحه اصلاحی قانون تجارت)';
            } else {
                $is_quorum_met = $attended_shares_pct > 0;
                $required_quorum_desc = 'با حضور هر عده از صاحبان سهام رسمیت می‌یابد (ماده ۸۴)';
            }
        } elseif ($meeting_type === 'extraordinary') {
            if ($turn === 1) {
                $is_quorum_met = $attended_shares_pct > 50.0;
                $required_quorum_desc = 'بیش از نصف سهام دارای حق رأی (ماده ۸۴)';
            } else {
                $is_quorum_met = $attended_shares_pct > 33.33;
                $required_quorum_desc = 'بیش از یک سوم سهام دارای حق رأی (ماده ۸۴)';
            }
        }
    }

    return rest_ensure_response(array(
        'company_type'         => $company_type,
        'meeting_type'         => $meeting_type,
        'turn'                 => $turn,
        'attended_shares_pct'  => $attended_shares_pct,
        'is_quorum_met'        => $is_quorum_met,
        'required_quorum_desc' => $required_quorum_desc,
        'supervised_by'        => 'دکتر سیده مریم رضوی - دکتری حقوق بین‌الملل'
    ));
}

/**
 * ثبت شورت‌کدهای فاز ۱۱ و ۱۲ (AML Compliance و Real Estate Construction)
 */
if (!function_exists('sedrazavi_aml_compliance_suite_shortcode')) {
    function sedrazavi_aml_compliance_suite_shortcode($atts) {
        ob_start();
        ?>
        <div id="sedrazavi-aml-compliance-root" class="sedrazavi-react-root" data-component="AmlComplianceSuite" dir="rtl">
            <div class="p-6 rounded-2xl bg-gray-900 border border-amber-500/30 text-white text-center">
                <span class="text-[#D4AF37] font-bold text-sm">میز تخصصی انطباق بانکی، AML، و بررسی فهرست‌های تحریم‌های بین‌المللی</span>
                <p class="text-xs text-gray-400 mt-2">سامانه در حال بارگذاری مؤلفه استعلام تحریم‌ها و ممیزی تراکنش‌های مشکوک...</p>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    add_shortcode('sedrazavi_aml_compliance_suite', 'sedrazavi_aml_compliance_suite_shortcode');
}

if (!function_exists('sedrazavi_real_estate_suite_shortcode')) {
    function sedrazavi_real_estate_suite_shortcode($atts) {
        ob_start();
        ?>
        <div id="sedrazavi-real-estate-root" class="sedrazavi-react-root" data-component="RealEstateSuite" dir="rtl">
            <div class="p-6 rounded-2xl bg-gray-900 border border-[#D4AF37]/30 text-white text-center">
                <span class="text-[#D4AF37] font-bold text-sm">سامانه تخصصی دعاوی ملکی، سرقفلی و قراردادهای مشارکت در ساخت</span>
                <p class="text-xs text-gray-400 mt-2">محاسبه‌گر قدرالسهم و تحلیل حقوقی کمیسیون ماده ۱۰۰ شهرداری در حال اجراست...</p>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    add_shortcode('sedrazavi_real_estate_suite', 'sedrazavi_real_estate_suite_shortcode');
}
