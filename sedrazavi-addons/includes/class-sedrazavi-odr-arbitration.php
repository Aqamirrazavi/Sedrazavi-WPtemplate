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
        add_action('wp_ajax_nopriv_sedrazavi_submit_pleading', array($this, 'ajax_submit_pleading'));
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

        $case_id = intval($_POST['case_id']);
        $title   = sanitize_text_field($_POST['title']);
        $content = wp_kses_post($_POST['content']);
        $sender  = sanitize_text_field($_POST['sender']);

        if (!$case_id || empty($title) || empty($content)) {
            wp_send_json_error(array('message' => 'اطلاعات لایحه ناقص است.'));
        }

        $tracking_code = 'PLD-SR-' . rand(10000, 99999);

        // ذخیره به عنوان کامنت متصل به پست داوری یا جدول اختصاصی
        $pleading_data = array(
            'comment_post_ID'      => $case_id,
            'comment_content'      => $content,
            'comment_author'       => $sender,
            'comment_type'         => 'odr_pleading',
            'comment_approved'     => 1,
        );

        $comment_id = wp_insert_comment($pleading_data);
        add_comment_meta($comment_id, 'tracking_code', $tracking_code);
        add_comment_meta($comment_id, 'pleading_title', $title);

        // ارسال پیامک خودکار ابلاغ لایحه به طرف مقابل
        do_action('sedrazavi_odr_pleading_submitted', $case_id, $tracking_code);

        wp_send_json_success(array(
            'message'       => 'لایحه با موفقیت در پرونده داوری ثبت گردید.',
            'tracking_code' => $tracking_code
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
