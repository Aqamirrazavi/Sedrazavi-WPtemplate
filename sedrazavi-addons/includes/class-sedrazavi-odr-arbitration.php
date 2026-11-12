<?php
/**
 * Class SedRazavi_ODR_Arbitration
 *
 * @package SedRazavi_Core_Plugin
 * @version 5.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_ODR_Arbitration {

    public function __construct() {
        add_action('wp_ajax_sedrazavi_submit_pleading', array($this, 'ajax_submit_pleading'));
        add_action('wp_ajax_sedrazavi_issue_award', array($this, 'ajax_issue_award'));
        add_shortcode('sedrazavi_odr_portal', array($this, 'render_odr_portal'));
        add_shortcode('sedrazavi_virtual_courtroom', array($this, 'render_virtual_courtroom'));
        add_shortcode('sedrazavi_petition_builder', array($this, 'render_petition_builder'));
    }

    /**
     * ثبت لایحه جدید در پرونده داوری با پیامک خودکار
     */
    public function ajax_submit_pleading() {
        check_ajax_referer('sedrazavi_odr_nonce', 'security');

        if (!is_user_logged_in()) {
            wp_send_json_error(array('message' => 'احراز هویت برای ثبت لایحه الزامی است.'), 401);
        }

        $case_id = absint($_POST['case_id'] ?? 0);
        $title   = sanitize_text_field($_POST['title'] ?? '');
        $content = wp_kses_post($_POST['content'] ?? '');
        $sender  = sanitize_text_field($_POST['sender'] ?? '');

        if (!$case_id || empty($title) || empty($content)) {
            wp_send_json_error(array('message' => 'اطلاعات لایحه ناقص است.'), 400);
        }

        $case_post = get_post($case_id);
        if (!$case_post || !in_array($case_post->post_type, array('arbitration_case', 'sedrazavi_case', 'case'), true)) {
            wp_send_json_error(array('message' => 'پرونده داوری معتبر یافت نشد.'), 404);
        }

        $uid = get_current_user_id();
        $is_staff = current_user_can('edit_posts') || current_user_can('manage_options');
        $is_owner = ((int) $case_post->post_author === $uid) || ((int) get_post_meta($case_id, '_client_user_id', true) === $uid);
        if (!$is_staff && !$is_owner) {
            wp_send_json_error(array('message' => 'شما مجوز ثبت لایحه در این پرونده را ندارید.'), 403);
        }

        $tracking_code = 'PLD-SR-' . wp_rand(10000, 99999);

        $pleading_data = array(
            'comment_post_ID'  => $case_id,
            'comment_content'  => $content,
            'comment_author'   => $sender ?: wp_get_current_user()->display_name,
            'user_id'          => $uid,
            'comment_type'     => 'odr_pleading',
            'comment_approved' => 1,
        );

        $comment_id = wp_insert_comment($pleading_data);
        if (!$comment_id) {
            wp_send_json_error(array('message' => 'خطا در ثبت لایحه.'), 500);
        }
        add_comment_meta($comment_id, 'tracking_code', $tracking_code);
        add_comment_meta($comment_id, 'pleading_title', $title);

        do_action('sedrazavi_odr_pleading_submitted', $case_id, $tracking_code);

        wp_send_json_success(array(
            'message'       => 'لایحه با موفقیت در پرونده داوری ثبت گردید.',
            'tracking_code' => $tracking_code,
        ));
    }

    /**
     * صدور رأی داوری (صرفاً توسط داور/وکیل دارای مجوز edit_posts یا manage_options)
     */
    public function ajax_issue_award() {
        check_ajax_referer('sedrazavi_odr_nonce', 'security');

        if (!is_user_logged_in() || (!current_user_can('edit_posts') && !current_user_can('manage_options'))) {
            wp_send_json_error(array('message' => 'تنها داور یا مدیر مجاز به صدور رأی داوری است.'), 403);
        }

        $case_id = absint($_POST['case_id'] ?? 0);
        $award_text = wp_kses_post($_POST['award_text'] ?? '');
        if (!$case_id || empty($award_text)) {
            wp_send_json_error(array('message' => 'شناسه پرونده و متن رأی الزامی است.'), 400);
        }

        $case_post = get_post($case_id);
        if (!$case_post || !in_array($case_post->post_type, array('arbitration_case', 'sedrazavi_case', 'case'), true)) {
            wp_send_json_error(array('message' => 'پرونده داوری معتبر یافت نشد.'), 404);
        }

        $award_number = 'AWD-SR-' . wp_rand(100000, 999999);
        update_post_meta($case_id, '_sedrazavi_arbitration_award', $award_text);
        update_post_meta($case_id, '_sedrazavi_award_number', $award_number);
        update_post_meta($case_id, '_sedrazavi_case_status', 'رأی داوری صادر شد');

        wp_send_json_success(array(
            'message'      => 'رأی داوری با موفقیت ثبت و صادر گردید.',
            'award_number' => $award_number,
        ));
    }

    public function render_odr_portal() {
        ob_start();
        ?>
        <div id="sedrazavi-odr-root" class="odr-interactive-app">
            <p class="text-xs text-slate-500 text-center font-mono">بارگذاری پورتال تعاملی داوری آنلاین و ثبت پرونده...</p>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_virtual_courtroom() {
        ob_start();
        ?>
        <div id="sedrazavi-virtual-court-root" class="virtual-court-app">
            <p class="text-xs text-slate-500 text-center font-mono">اتصال به تالار دادرسی مجازی و استماع زنده...</p>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_petition_builder() {
        ob_start();
        ?>
        <div id="sedrazavi-petition-builder-root" class="petition-builder-app">
            <p class="text-xs text-slate-500 text-center font-mono">بارگذاری فرم‌ساز هوشمند دادخواست و لوایح عدل‌ایران...</p>
        </div>
        <?php
        return ob_get_clean();
    }
}

new SedRazavi_ODR_Arbitration();
