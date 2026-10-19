<?php
/**
 * SedRazavi Transactional Email Engine & Dynamic Domain Binding
 *
 * Automatically binds sender email to current domain (noreply@domain.com),
 * delivers responsive RTL HTML email templates, and integrates cleanly with SMTP.
 *
 * @package SedRazavi_Companion
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Email_Engine {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_filter('wp_mail_from', [$this, 'filter_mail_from']);
        add_filter('wp_mail_from_name', [$this, 'filter_mail_from_name']);
        add_filter('wp_mail_content_type', [$this, 'set_html_content_type']);
    }

    public function filter_mail_from($original_email) {
        $custom_email = get_option('sedrazavi_custom_from_email', '');
        if (!empty($custom_email) && is_email($custom_email)) {
            return $custom_email;
        }

        $host = wp_parse_url(home_url(), PHP_URL_HOST);
        if ($host) {
            // Strip 'www.' if present
            $host = preg_replace('/^www\./i', '', $host);
            return 'noreply@' . sanitize_text_field($host);
        }

        return $original_email;
    }

    public function filter_mail_from_name($original_name) {
        $custom_name = get_option('sedrazavi_custom_from_name', '');
        if (!empty($custom_name)) {
            return $custom_name;
        }

        $site_name = get_bloginfo('name');
        return !empty($site_name) ? $site_name : $original_name;
    }

    public function set_html_content_type() {
        return 'text/html';
    }

    public function send_transactional_email($to, $subject, $message, $action_text = '', $action_url = '') {
        $brand_name  = get_bloginfo('name');
        $accent_color = '#3b82f6';
        if (class_exists('SedRazavi_Design_Tokens')) {
            $palette = SedRazavi_Design_Tokens::get_instance()->get_active_palette();
            $accent_color = $palette['primary'];
        }

        ob_start();
        ?>
        <!DOCTYPE html>
        <html dir="rtl" lang="fa">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title><?php echo esc_html($subject); ?></title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #0b132b; font-family: Tahoma, 'Segoe UI', sans-serif; direction: rtl; text-align: right; color: #f8fafc;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #060b18; padding: 30px 15px;">
                <tr>
                    <td align="center">
                        <table role="presentation" width="100%" style="max-width: 600px; background-color: #0f172a; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.3);" cellspacing="0" cellpadding="0">
                            <!-- Header -->
                            <tr>
                                <td style="padding: 28px; background: linear-gradient(135deg, <?php echo esc_attr($accent_color); ?>22, #0f172a); border-bottom: 1px solid rgba(255,255,255,0.08); text-align: center;">
                                    <h1 style="margin: 0; font-size: 20px; color: #ffffff; font-weight: bold;"><?php echo esc_html($brand_name); ?></h1>
                                    <p style="margin: 6px 0 0; font-size: 12px; color: <?php echo esc_attr($accent_color); ?>;">سامانه اطلاع‌رسانی و احراز هویت</p>
                                </td>
                            </tr>
                            <!-- Body -->
                            <tr>
                                <td style="padding: 32px 28px; font-size: 14px; line-height: 1.8; color: #cbd5e1;">
                                    <?php echo wp_kses_post(wpautop($message)); ?>

                                    <?php if (!empty($action_text) && !empty($action_url)): ?>
                                        <div style="margin: 28px 0; text-align: center;">
                                            <a href="<?php echo esc_url($action_url); ?>" target="_blank" style="display: inline-block; padding: 12px 28px; background-color: <?php echo esc_attr($accent_color); ?>; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 13px;">
                                                <?php echo esc_html($action_text); ?>
                                            </a>
                                        </div>
                                    <?php endif; ?>
                                </td>
                            </tr>
                            <!-- Footer -->
                            <tr>
                                <td style="padding: 20px 28px; background-color: #090d1a; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; font-size: 11px; color: #64748b;">
                                    این ایمیل به صورت خودکار از طرف سامانه <?php echo esc_html($brand_name); ?> ارسال شده است.<br>
                                    © <?php echo date('Y'); ?> <?php echo esc_html($brand_name); ?>. تمامی حقوق محفوظ است.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        <?php
        $html_content = ob_get_clean();

        return wp_mail($to, $subject, $html_content);
    }
}
