<?php
/**
 * SedRazavi OS - Modern AJAX Comments, Reviews & Social Proof Hub
 * Location: sedrazavi-companion/includes/class-modern-comments.php
 *
 * @package SedRazavi_Companion
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Modern_Comments {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_action('wp_ajax_sr_submit_comment', [$this, 'ajax_submit_comment']);
        add_action('wp_ajax_nopriv_sr_submit_comment', [$this, 'ajax_submit_comment']);
        add_action('wp_ajax_sr_vote_helpful', [$this, 'ajax_vote_helpful']);
        add_action('wp_ajax_nopriv_sr_vote_helpful', [$this, 'ajax_vote_helpful']);
        add_shortcode('sedrazavi_reviews_hub', [$this, 'render_reviews_hub_shortcode']);
    }

    /**
     * Check if a commenter is a verified buyer/client
     */
    public static function is_verified_client($email_or_user_id) {
        if (is_numeric($email_or_user_id) && $email_or_user_id > 0) {
            $user_id = absint($email_or_user_id);
            // Check WooCommerce customer orders if active
            if (function_exists('wc_get_orders')) {
                $orders = wc_get_orders(['customer_id' => $user_id, 'limit' => 1, 'status' => ['completed', 'processing']]);
                if (!empty($orders)) {
                    return true;
                }
            }
            // Check booking/leads meta
            $user = get_userdata($user_id);
            if ($user && in_array('sr_client', (array)$user->roles, true)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Register REST API routes
     */
    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/comments/(?P<post_id>\d+)', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_comments'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1', '/comments', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_submit_comment'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function rest_get_comments($request) {
        $post_id = absint($request->get_param('post_id'));
        $comments = get_comments([
            'post_id' => $post_id,
            'status'  => 'approve',
            'order'   => 'DESC',
        ]);

        $formatted = [];
        foreach ($comments as $c) {
            $rating_quality = get_comment_meta($c->comment_ID, 'sr_rating_quality', true);
            $rating_speed   = get_comment_meta($c->comment_ID, 'sr_rating_speed', true);
            $helpful_votes  = absint(get_comment_meta($c->comment_ID, 'sr_helpful_count', true));
            $is_verified    = self::is_verified_client($c->user_id);

            $formatted[] = [
                'id'         => $c->comment_ID,
                'author'     => $c->comment_author,
                'date'       => mysql2date('Y/m/d', $c->comment_date),
                'content'    => $c->comment_content,
                'isVerified' => $is_verified,
                'ratingQuality' => $rating_quality ? floatval($rating_quality) : 5,
                'ratingSpeed'   => $rating_speed ? floatval($rating_speed) : 5,
                'helpfulCount'  => $helpful_votes,
            ];
        }

        return rest_ensure_response([
            'success'  => true,
            'comments' => $formatted,
            'total'    => count($formatted),
        ]);
    }

    public function rest_submit_comment($request) {
        // Anti-spam Honeypot Check
        $honeypot = $request->get_param('website_url_hp');
        if (!empty($honeypot)) {
            return new WP_Error('spam_detected', __('اسپم شناسایی شد.', 'sedrazavi-companion'), ['status' => 403]);
        }

        $post_id = absint($request->get_param('postId'));
        $author  = sanitize_text_field($request->get_param('author') ?? 'کاربر ناشناس');
        $email   = sanitize_email($request->get_param('email') ?? '');
        $content = sanitize_textarea_field($request->get_param('content') ?? '');
        $rating  = floatval($request->get_param('rating') ?? 5);

        if (empty($content) || $post_id <= 0) {
            return new WP_Error('invalid_data', __('متن دیدگاه نمی‌تواند خالی باشد.', 'sedrazavi-companion'), ['status' => 400]);
        }

        $user_id = get_current_user_id();
        $comment_id = wp_insert_comment([
            'comment_post_ID'      => $post_id,
            'comment_author'       => $author,
            'comment_author_email' => $email,
            'comment_content'      => $content,
            'user_id'              => $user_id,
            'comment_approved'     => 1, // Auto-approve or queue based on site settings
        ]);

        if (!$comment_id) {
            return new WP_Error('save_failed', __('خطا در ثبت دیدگاه.', 'sedrazavi-companion'), ['status' => 500]);
        }

        update_comment_meta($comment_id, 'sr_rating_quality', $rating);
        update_comment_meta($comment_id, 'sr_helpful_count', 0);

        return rest_ensure_response([
            'success'   => true,
            'message'   => __('دیدگاه شما با موفقیت ثبت شد.', 'sedrazavi-companion'),
            'commentId' => $comment_id,
        ]);
    }

    public function ajax_submit_comment() {
        check_ajax_referer('sedrazavi_nonce', 'nonce');
        $hp = sanitize_text_field($_POST['extra_hp'] ?? '');
        if (!empty($hp)) {
            wp_send_json_error(['message' => 'Spam detected']);
        }

        $post_id = absint($_POST['post_id'] ?? 0);
        $content = sanitize_textarea_field($_POST['content'] ?? '');
        $author  = sanitize_text_field($_POST['author'] ?? 'کاربر مهمان');

        if (empty($content)) {
            wp_send_json_error(['message' => 'متن نظر الزامی است.']);
        }

        $id = wp_insert_comment([
            'comment_post_ID'  => $post_id,
            'comment_author'   => $author,
            'comment_content'  => $content,
            'comment_approved' => 1,
        ]);

        wp_send_json_success(['comment_id' => $id, 'message' => 'نظر ثبت شد.']);
    }

    public function ajax_vote_helpful() {
        $cid = absint($_POST['comment_id'] ?? 0);
        if ($cid > 0) {
            $count = absint(get_comment_meta($cid, 'sr_helpful_count', true));
            $count++;
            update_comment_meta($cid, 'sr_helpful_count', $count);
            wp_send_json_success(['count' => $count]);
        }
        wp_send_json_error();
    }

    public function render_reviews_hub_shortcode($atts) {
        ob_start();
        ?>
        <div class="sr-modern-reviews-hub p-6 rounded-2xl bg-sr-surface border border-sr-border" dir="rtl">
            <h3 class="text-lg font-bold text-sr-primary mb-4">دیدگاه‌ها و تجربیات همراهان</h3>
            <div id="sr-comments-list" class="space-y-4">
                <!-- Comments rendered dynamically -->
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}
