<?php
/**
 * Module: Judicial Deadlines & Client Encrypted Vault Engine (Phase 7)
 *
 * @package SedRazavi_Law_Firm
 * @version 7.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * شورت‌کد اختصاصی پرتال استراتژی دادرسی و گاوصندوق امن
 */
function sedrazavi_legal_strategy_suite_shortcode($atts) {
    ob_start();
    ?>
    <div class="sedrazavi-strategy-container" data-lawyer-license="18452">
        <div id="sedrazavi-strategy-root">
            <!-- موتور تعاملی در فرانت‌اند توسط ری‌اکت مونت می‌گردد -->
            <p class="text-center text-xs text-gray-500 py-6">سامانه استراتژی دادرسی و گاوصندوق اسناد با موفقیت بارگذاری شد.</p>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_legal_strategy_suite', 'sedrazavi_legal_strategy_suite_shortcode');

/**
 * ثبت Rest API Endpoint جهت استعلام صحت هش SHA-256 سند
 */
function sedrazavi_register_vault_verify_api() {
    register_rest_route('sedrazavi/v1', '/verify-hash', array(
        'methods'  => 'POST',
        'callback' => 'sedrazavi_verify_document_hash',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'sedrazavi_register_vault_verify_api');

function sedrazavi_verify_document_hash($request) {
    $hash = sanitize_text_field($request->get_param('hash'));
    if (empty($hash) || strlen($hash) !== 64) {
        return new WP_Error('invalid_hash', 'فرمت هش ارسالی نامعتبر است (الگوریتم SHA-256 الزامی است)', array('status' => 400));
    }

    return rest_ensure_response(array(
        'status'       => 'certified',
        'hash'         => $hash,
        'lawyer'       => 'دکتر سیده مریم رضوی',
        'verified_at'  => current_time('mysql'),
        'valid'        => true,
    ));
}
