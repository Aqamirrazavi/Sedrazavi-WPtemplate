<?php
/**
 * SedRazavi Notification Router & Admin Notification Center
 *
 * Manages database table sr_notifications, admin bar bell with unread badge,
 * event dispatching to SMS, domain email, admin bar, and outgoing HMAC webhooks.
 *
 * @package SedRazavi_Companion
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Notification_Router {

    private static $instance = null;
    const TABLE_NAME = 'sr_notifications';

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('admin_bar_menu', [$this, 'render_admin_bar_bell'], 99);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_action('admin_menu', [$this, 'register_admin_subpage']);
        add_action('init', [$this, 'ensure_table_exists']);

        // Listen for booking and lead events
        add_action('sedrazavi_after_booking_created', function($appointment_id, $name, $phone) {
            self::dispatch(
                'رزرو نوبت',
                "درخواست نوبت مشاوره جدید توسط {$name}",
                "شماره تماس: {$phone} • شناسه نوبت: {$appointment_id}",
                ['appointment_id' => $appointment_id, 'phone' => $phone]
            );
        }, 10, 3);

        add_action('sedrazavi_broken_link_reported', function($post_id, $link_url, $entry) {
            self::dispatch(
                'خرابی لینک',
                "گزارش خرابی لینک دانلود در نوشته {$post_id}",
                "آدرس لینک: {$link_url} • آی‌پی: {$entry['ip']}",
                ['post_id' => $post_id, 'link' => $link_url]
            );
        }, 10, 3);
    }

    public function ensure_table_exists() {
        global $wpdb;
        $table = $wpdb->prefix . self::TABLE_NAME;

        if ($wpdb->get_var("SHOW TABLES LIKE '{$table}'") !== $table) {
            require_once ABSPATH . 'wp-admin/includes/upgrade.php';
            $charset_collate = $wpdb->get_charset_collate();

            $sql = "CREATE TABLE {$table} (
                id bigint(20) NOT NULL AUTO_INCREMENT,
                event_type varchar(60) NOT NULL,
                title varchar(255) NOT NULL,
                message text NOT NULL,
                user_id bigint(20) DEFAULT 0 NOT NULL,
                is_read tinyint(1) DEFAULT 0 NOT NULL,
                metadata text NULL,
                created_at datetime NOT NULL,
                PRIMARY KEY  (id),
                KEY is_read (is_read),
                KEY created_at (created_at)
            ) {$charset_collate};";

            dbDelta($sql);
        }
    }

    public function register_admin_subpage() {
        add_submenu_page(
            'sedrazavi-companion-hub',
            'مرکز اعلانات و پیام‌ها (Notification Center)',
            'مرکز اعلانات',
            'manage_options',
            'sedrazavi-notifications',
            [$this, 'render_notifications_page']
        );
    }

    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/notifications/list', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_notifications'],
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ]);

        register_rest_route('sedrazavi/v1', '/notifications/mark-read', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_mark_read'],
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ]);
    }

    public static function dispatch($event_type, $title, $message, $metadata = []) {
        $inst = self::get_instance();
        global $wpdb;
        $table = $wpdb->prefix . self::TABLE_NAME;

        // 1. Insert into database
        $wpdb->insert($table, [
            'event_type' => sanitize_text_field($event_type),
            'title'      => sanitize_text_field($title),
            'message'    => sanitize_textarea_field($message),
            'user_id'    => get_current_user_id() ?: 0,
            'is_read'    => 0,
            'metadata'   => !empty($metadata) ? wp_json_encode($metadata) : null,
            'created_at' => current_time('mysql'),
        ]);

        $notification_id = $wpdb->insert_id;

        // 2. Dispatch Outgoing Webhook if configured
        $inst->dispatch_webhook($event_type, [
            'id'        => $notification_id,
            'eventType' => $event_type,
            'title'     => $title,
            'message'   => $message,
            'metadata'  => $metadata,
            'timestamp' => current_time('mysql'),
        ]);

        return $notification_id;
    }

    public static function get_unread_count() {
        global $wpdb;
        $table = $wpdb->prefix . self::TABLE_NAME;
        if ($wpdb->get_var("SHOW TABLES LIKE '{$table}'") !== $table) {
            return 0;
        }
        return (int) $wpdb->get_var("SELECT COUNT(*) FROM {$table} WHERE is_read = 0");
    }

    public function render_admin_bar_bell($wp_admin_bar) {
        if (!current_user_can('manage_options')) {
            return;
        }

        $unread_count = self::get_unread_count();
        $badge = $unread_count > 0 
            ? " <span class='update-plugins count-{$unread_count}' style='background:#ef4444; color:#fff; border-radius:10px; padding:1px 6px; font-size:10px; font-weight:bold; margin-right:4px;'><span class='plugin-count'>{$unread_count}</span></span>" 
            : '';

        $wp_admin_bar->add_node([
            'id'    => 'sedrazavi-notifications',
            'title' => '<span class="ab-icon dashicons-bell" style="top:2px;"></span> پیشخوان اعلانات' . $badge,
            'href'  => admin_url('admin.php?page=sedrazavi-notifications'),
            'meta'  => ['class' => 'sr-admin-bar-notify'],
        ]);
    }

    public function dispatch_webhook($event_type, $payload) {
        $webhook_url = get_option('sedrazavi_webhook_url', '');
        $secret_key  = get_option('sedrazavi_webhook_secret', '');

        if (empty($webhook_url) || !wp_http_validate_url($webhook_url)) {
            return false;
        }

        $body = wp_json_encode($payload);
        $signature = hash_hmac('sha256', $body, $secret_key ?: 'sr_default_secret');

        wp_remote_post($webhook_url, [
            'headers' => [
                'Content-Type'             => 'application/json',
                'X-SedRazavi-Signature'   => 'sha256=' . $signature,
                'X-SedRazavi-Event'       => $event_type,
            ],
            'body'    => $body,
            'timeout' => 5,
        ]);

        return true;
    }

    public function rest_get_notifications($request) {
        global $wpdb;
        $table = $wpdb->prefix . self::TABLE_NAME;
        $limit = min(50, absint($request->get_param('limit') ?: 20));

        $rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$table} ORDER BY id DESC LIMIT %d", $limit), ARRAY_A);

        return rest_ensure_response([
            'success'       => true,
            'unreadCount'   => self::get_unread_count(),
            'notifications' => $rows ?: [],
        ]);
    }

    public function rest_mark_read($request) {
        global $wpdb;
        $table = $wpdb->prefix . self::TABLE_NAME;
        $params = $request->get_json_params();
        $id = isset($params['id']) ? absint($params['id']) : 0;

        if ($id > 0) {
            $wpdb->update($table, ['is_read' => 1], ['id' => $id]);
        } else {
            // Mark all as read
            $wpdb->query("UPDATE {$table} SET is_read = 1 WHERE is_read = 0");
        }

        return rest_ensure_response([
            'success'     => true,
            'unreadCount' => self::get_unread_count(),
        ]);
    }

    public function render_notifications_page() {
        global $wpdb;
        $table = $wpdb->prefix . self::TABLE_NAME;
        $this->ensure_table_exists();

        // Handle mark read action
        if (isset($_GET['action']) && $_GET['action'] === 'mark_all_read' && check_admin_referer('sr_mark_read')) {
            $wpdb->query("UPDATE {$table} SET is_read = 1 WHERE is_read = 0");
            echo '<div class="updated"><p>تمامی اعلان‌ها به عنوان خوانده‌شده علامت‌گذاری شدند.</p></div>';
        }

        $items = $wpdb->get_results("SELECT * FROM {$table} ORDER BY id DESC LIMIT 50", ARRAY_A) ?: [];
        $unread = self::get_unread_count();
        ?>
        <div class="wrap" dir="rtl" style="max-width: 1000px; font-family: inherit;">
            <div style="background: linear-gradient(135deg, #1e293b, #0f172a); color: #fff; padding: 22px; border-radius: 14px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
                <div>
                    <h1 style="color: #fff; margin: 0 0 6px; font-size: 20px; display: flex; align-items: center; gap: 8px;">
                        <span class="dashicons dashicons-bell" style="font-size: 24px; color: #f59e0b;"></span>
                        مرکز اعلان‌ها و رخدادهای پیشخوان (SedRazavi Notification Hub)
                    </h1>
                    <p style="margin: 0; font-size: 13px; color: #94a3b8;">مشاهده برخط درخواست‌های مشاوره، سفارشات و هشدارهای امنیتی با قابلیت شلیک به وب‌هوک و پیامک.</p>
                </div>
                <div>
                    <?php if ($unread > 0): ?>
                        <a href="<?php echo esc_url(wp_nonce_url(admin_url('admin.php?page=sedrazavi-notifications&action=mark_all_read'), 'sr_mark_read')); ?>" class="button button-primary" style="border-radius: 8px;">
                            علامت‌گذاری همه به عنوان خوانده‌شده (<?php echo esc_html($unread); ?>)
                        </a>
                    <?php endif; ?>
                </div>
            </div>

            <?php if (empty($items)): ?>
                <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 40px; text-align: center; color: #64748b;">
                    <span class="dashicons dashicons-yes-alt" style="font-size: 48px; width: 48px; height: 48px; color: #10b981;"></span>
                    <h3 style="color: #0f172a; margin: 12px 0 6px;">هیچ اعلان خوانده‌نشده‌ای وجود ندارد</h3>
                    <p style="font-size: 13px; margin: 0;">تمامی فرم‌ها، رزروها و سفارشات جاری مدیریت شده‌اند.</p>
                </div>
            <?php else: ?>
                <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                    <table class="wp-list-table widefat fixed striped">
                        <thead>
                            <tr>
                                <th style="width: 140px;">نوع رویداد</th>
                                <th>عنوان</th>
                                <th>توضیحات و پیام</th>
                                <th style="width: 140px;">زمان ثبت</th>
                                <th style="width: 80px;">وضعیت</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($items as $item): ?>
                                <tr>
                                    <td>
                                        <span style="display: inline-block; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; background: #f1f5f9; color: #334155;">
                                            <?php echo esc_html($item['event_type']); ?>
                                        </span>
                                    </td>
                                    <td><strong><?php echo esc_html($item['title']); ?></strong></td>
                                    <td><?php echo esc_html($item['message']); ?></td>
                                    <td style="font-size: 12px; color: #64748b;"><?php echo esc_html($item['created_at']); ?></td>
                                    <td>
                                        <?php if ((int)$item['is_read'] === 0): ?>
                                            <span style="color: #ef4444; font-weight: bold; font-size: 11px;">جدید</span>
                                        <?php else: ?>
                                            <span style="color: #10b981; font-size: 11px;">خوانده‌شده</span>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            <?php endif; ?>
        </div>
        <?php
    }
}
