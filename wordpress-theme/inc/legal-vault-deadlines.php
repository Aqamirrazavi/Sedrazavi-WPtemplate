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
 * ثبت Rest API Endpoint جهت استعلام صحت هش SHA-256 سند (در صورت عدم ثبت توسط SedRazavi_REST_API)
 */
function sedrazavi_register_vault_verify_api() {
    if (class_exists('SedRazavi_REST_API')) {
        return;
    }
    register_rest_route('sedrazavi/v1', '/verify-hash', array(
        'methods'             => 'POST',
        'callback'            => 'sedrazavi_verify_document_hash',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'sedrazavi_register_vault_verify_api', 20);

function sedrazavi_verify_document_hash($request) {
    if (class_exists('SedRazavi_Rate_Limiter') && !SedRazavi_Rate_Limiter::check_rate_limit('verify_hash', 15, 300)) {
        return new WP_Error('rate_limited', 'تعداد درخواست‌های استعلام اصالت بیش از حد مجاز است.', array('status' => 429));
    }

    $raw_hash = $request->get_param('hash') ?: $request->get_param('document_hash');
    $hash = strtolower(sanitize_text_field((string) $raw_hash));
    if (!preg_match('/^[a-f0-9]{64}$/', $hash)) {
        return new WP_Error('invalid_hash', 'فرمت هش ارسالی نامعتبر است (الگوریتم ۶۴ کاراکتری هگز SHA-256 الزامی است)', array('status' => 400));
    }

    $matched = get_posts(array(
        'post_type'      => array('sedrazavi_case', 'sedrazavi_dashboard', 'attachment'),
        'post_status'    => array('publish', 'private', 'inherit'),
        'posts_per_page' => 1,
        'fields'         => 'ids',
        'meta_query'     => array(
            array(
                'key'     => '_sedrazavi_doc_hash',
                'value'   => $hash,
                'compare' => '=',
            ),
        ),
    ));

    if (empty($matched)) {
        return new WP_REST_Response(array(
            'valid'   => false,
            'status'  => 'not_found',
            'hash'    => $hash,
            'message' => 'سندی با این امضای دیجیتال در بایگانی ثبت نشده است.',
        ), 404);
    }

    return rest_ensure_response(array(
        'valid'        => true,
        'status'       => 'certified',
        'hash'         => $hash,
        'record_id'    => (int) $matched[0],
        'verified_at'  => current_time('mysql'),
    ));
}
