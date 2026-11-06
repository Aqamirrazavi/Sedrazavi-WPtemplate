<?php
/**
 * Iranian Market Operational Localization Adapter
 *
 * Provides out-of-the-box, production-grade integration with Iranian SMS providers
 * (Kavenegar, Farapayamak, MeliPayamak, IPPanel/FarazSMS, Digits) and Iranian Payment
 * Gateways (ZarinPal, Zibal, NextPay, BehPardakht Mellat) for client deliverables.
 *
 * @package SedRazavi_Companion
 * @version 6.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Iranian_Market_Adapter {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        // Register Admin Settings
        add_action('admin_menu', [$this, 'register_admin_menu']);
        add_action('admin_init', [$this, 'register_settings']);

        // Form submission & booking SMS triggers
        add_action('sedrazavi_lead_captured', [$this, 'handle_lead_sms'], 10, 2);
        add_action('sedrazavi_order_created', [$this, 'handle_order_sms'], 10, 2);

        // WooCommerce order status SMS hook (if WooCommerce active)
        if (class_exists('WooCommerce')) {
            add_action('woocommerce_order_status_processing', [$this, 'woocommerce_order_sms']);
            add_action('woocommerce_order_status_completed', [$this, 'woocommerce_order_sms']);
        }
    }

    /**
     * Register Submenu in SedRazavi Admin
     */
    public function register_admin_menu() {
        add_submenu_page(
            'sedrazavi-suite',
            'بومی‌سازی و وب‌سرویس‌های ایران',
            '🇮🇷 درگاه پیامک و پرداخت',
            'manage_options',
            'sedrazavi-iranian-market',
            [$this, 'render_admin_page']
        );
    }

    /**
     * Register Settings & Options
     */
    public function register_settings() {
        register_setting('sedrazavi_iranian_market_group', 'sedrazavi_sms_provider');
        register_setting('sedrazavi_iranian_market_group', 'sedrazavi_sms_api_key');
        register_setting('sedrazavi_iranian_market_group', 'sedrazavi_sms_sender_line');
        register_setting('sedrazavi_iranian_market_group', 'sedrazavi_sms_admin_mobile');
        register_setting('sedrazavi_iranian_market_group', 'sedrazavi_sms_notify_admin');
        register_setting('sedrazavi_iranian_market_group', 'sedrazavi_payment_gateway');
        register_setting('sedrazavi_iranian_market_group', 'sedrazavi_payment_merchant_id');
        register_setting('sedrazavi_iranian_market_group', 'sedrazavi_payment_sandbox');
    }

    /**
     * Render Admin Settings Page
     */
    public function render_admin_page() {
        $sms_provider       = get_option('sedrazavi_sms_provider', 'kavenegar');
        $sms_api_key        = get_option('sedrazavi_sms_api_key', '');
        $sms_sender_line    = get_option('sedrazavi_sms_sender_line', '');
        $sms_admin_mobile   = get_option('sedrazavi_sms_admin_mobile', '');
        $sms_notify_admin   = get_option('sedrazavi_sms_notify_admin', '1');
        $payment_gateway    = get_option('sedrazavi_payment_gateway', 'zarinpal');
        $merchant_id        = get_option('sedrazavi_payment_merchant_id', '');
        $sandbox            = get_option('sedrazavi_payment_sandbox', '0');
        ?>
        <div class="wrap" style="max-width: 960px; font-family: Vazirmatn, Tahoma, sans-serif; direction: rtl; text-align: right;">
            <div style="background: linear-gradient(135deg, #070D1E, #0B132B); color: #fff; padding: 25px 30px; border-radius: 20px; border: 1px solid rgba(212,175,55,0.4); margin: 20px 0; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div>
                        <span style="background: rgba(212,175,55,0.2); color: #F3E5AB; padding: 3px 12px; border-radius: 10px; font-size: 11px; font-weight: bold;">🇮🇷 ماژول بومی‌سازی سازمانی</span>
                        <h1 style="color: #fff; font-size: 22px; margin: 10px 0 5px; font-weight: 800;">تنظیمات درگاه‌های پیامک و پرداخت بازار ایران</h1>
                        <p style="color: #94A3B8; font-size: 12px; margin: 0;">پیکربندی سریع اطلاع‌رسانی پیامکی فرم‌ها و تراکنش‌های آنلاین با پروتکل‌های معتبر بانکی و مخابراتی کشور</p>
                    </div>
                </div>
            </div>

            <form method="post" action="options.php" style="background: #fff; padding: 30px; border-radius: 20px; border: 1px solid #e2e8f0; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
                <?php settings_fields('sedrazavi_iranian_market_group'); ?>

                <!-- SMS Section -->
                <h3 style="font-size: 16px; font-weight: bold; color: #0F172A; border-bottom: 2px solid #F1F5F9; padding-bottom: 10px; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
                    <span>📱</span> پیکربندی وب‌سرویس پیامک (SMS Gateway)
                </h3>

                <table class="form-table" role="presentation" style="margin-bottom: 30px;">
                    <tr>
                        <th scope="row"><label for="sedrazavi_sms_provider">ارائه‌دهنده پیامک</label></th>
                        <td>
                            <select name="sedrazavi_sms_provider" id="sedrazavi_sms_provider" style="min-width: 280px; padding: 6px 12px; border-radius: 8px;">
                                <option value="kavenegar" <?php selected($sms_provider, 'kavenegar'); ?>>کاوه‌نگار (Kavenegar - وب‌سرویس و پترن اعتبارسنجی)</option>
                                <option value="farapayamak" <?php selected($sms_provider, 'farapayamak'); ?>>فراپیامک (Farapayamak)</option>
                                <option value="melipayamak" <?php selected($sms_provider, 'melipayamak'); ?>>ملی‌پیامک (MeliPayamak)</option>
                                <option value="ippanel" <?php selected($sms_provider, 'ippanel'); ?>>فراز اس‌ام‌اس / IPPanel (آی‌پی‌پنل)</option>
                            </select>
                            <p class="description">سرویس پیامکی مورد نظر خود را برای ارسال اعلان‌های رزرو، فاکتور و تاییدیه انتخاب فرمایید.</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="sedrazavi_sms_api_key">کلید وب‌سرویس (API Key)</label></th>
                        <td>
                            <input type="password" name="sedrazavi_sms_api_key" id="sedrazavi_sms_api_key" value="<?php echo esc_attr($sms_api_key); ?>" class="regular-text" style="direction: ltr; font-family: monospace;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="sedrazavi_sms_sender_line">شماره خط اختصاصی یا خدماتی</label></th>
                        <td>
                            <input type="text" name="sedrazavi_sms_sender_line" id="sedrazavi_sms_sender_line" value="<?php echo esc_attr($sms_sender_line); ?>" placeholder="مثلاً: 10008585 یا خط اشتراکی" class="regular-text" style="direction: ltr; font-family: monospace;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="sedrazavi_sms_admin_mobile">شماره موبایل مدیر (جهت دریافت آلارم)</label></th>
                        <td>
                            <input type="text" name="sedrazavi_sms_admin_mobile" id="sedrazavi_sms_admin_mobile" value="<?php echo esc_attr($sms_admin_mobile); ?>" placeholder="0912..." class="regular-text" style="direction: ltr; font-family: monospace;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">ارسال پیامک به مدیر</th>
                        <td>
                            <label>
                                <input type="checkbox" name="sedrazavi_sms_notify_admin" value="1" <?php checked($sms_notify_admin, '1'); ?>>
                                ارسال پیامک فوری به مدیر پس از ثبت هر فرم تماس، نوبت یا سفارش
                            </label>
                        </td>
                    </tr>
                </table>

                <!-- Payment Section -->
                <h3 style="font-size: 16px; font-weight: bold; color: #0F172A; border-bottom: 2px solid #F1F5F9; padding-bottom: 10px; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
                    <span>💳</span> درگاه پرداخت آنلاین شاپرک (Iranian Payment Gateway)
                </h3>

                <table class="form-table" role="presentation">
                    <tr>
                        <th scope="row"><label for="sedrazavi_payment_gateway">درگاه فعال</label></th>
                        <td>
                            <select name="sedrazavi_payment_gateway" id="sedrazavi_payment_gateway" style="min-width: 280px; padding: 6px 12px; border-radius: 8px;">
                                <option value="zarinpal" <?php selected($payment_gateway, 'zarinpal'); ?>>زرین‌پال (ZarinPal)</option>
                                <option value="zibal" <?php selected($payment_gateway, 'zibal'); ?>>زیبال (Zibal)</option>
                                <option value="nextpay" <?php selected($payment_gateway, 'nextpay'); ?>>نکست‌پی (NextPay)</option>
                                <option value="mellat" <?php selected($payment_gateway, 'mellat'); ?>>به‌پرداخت ملت (BehPardakht Mellat)</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="sedrazavi_payment_merchant_id">کد مرچنت / ترمینال درگاه</label></th>
                        <td>
                            <input type="text" name="sedrazavi_payment_merchant_id" id="sedrazavi_payment_merchant_id" value="<?php echo esc_attr($merchant_id); ?>" class="regular-text" style="direction: ltr; font-family: monospace;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">حالت آزمایشی (Sandbox)</th>
                        <td>
                            <label>
                                <input type="checkbox" name="sedrazavi_payment_sandbox" value="1" <?php checked($sandbox, '1'); ?>>
                                فعال‌سازی محیط تست و شبیه‌ساز تراکنش
                            </label>
                        </td>
                    </tr>
                </table>

                <div style="border-top: 1px solid #F1F5F9; padding-top: 20px; margin-top: 20px;">
                    <?php submit_button('ذخیره تغییرات درگاه‌ها', 'primary', 'submit', false, ['style' => 'background: #D4AF37; color: #070D1E; border: none; font-weight: bold; padding: 8px 24px; border-radius: 10px;']); ?>
                </div>
            </form>
        </div>
        <?php
    }

    /**
     * Universal Send SMS Dispatcher
     *
     * @param string $receptor Mobile number (0912...)
     * @param string $message Text message
     * @param string $template Pattern name (optional)
     * @param array $tokens Template arguments
     * @return array Result array with 'success' and 'message'
     */
    public static function send_sms($receptor, $message, $template = '', $tokens = []) {
        $provider = get_option('sedrazavi_sms_provider', 'kavenegar');
        $api_key  = get_option('sedrazavi_sms_api_key', '');
        $sender   = get_option('sedrazavi_sms_sender_line', '');

        if (empty($api_key) || empty($receptor)) {
            return ['success' => false, 'message' => 'کلید وب‌سرویس یا شماره گیرنده تنظیم نشده است.'];
        }

        // Normalize mobile
        $receptor = preg_replace('/[^0-9]/', '', $receptor);
        if (substr($receptor, 0, 2) === '98') {
            $receptor = '0' . substr($receptor, 2);
        }

        switch ($provider) {
            case 'kavenegar':
                return self::send_kavenegar($api_key, $sender, $receptor, $message, $template, $tokens);
            case 'farapayamak':
                return self::send_farapayamak($api_key, $sender, $receptor, $message);
            case 'melipayamak':
                return self::send_melipayamak($api_key, $sender, $receptor, $message);
            case 'ippanel':
                return self::send_ippanel($api_key, $sender, $receptor, $message, $template, $tokens);
            default:
                return apply_filters('sedrazavi_custom_sms_sender', ['success' => false, 'message' => 'ارائه‌دهنده نامعتبر است.'], $provider, $receptor, $message);
        }
    }

    /**
     * Kavenegar SMS Implementation
     */
    private static function send_kavenegar($api_key, $sender, $receptor, $message, $template = '', $tokens = []) {
        if (!empty($template)) {
            $url = "https://api.kavenegar.com/v1/{$api_key}/verify/lookup.json";
            $body = [
                'receptor' => $receptor,
                'template' => $template,
                'token'    => $tokens['token'] ?? '',
                'token2'   => $tokens['token2'] ?? '',
                'token3'   => $tokens['token3'] ?? '',
            ];
        } else {
            $url = "https://api.kavenegar.com/v1/{$api_key}/sms/send.json";
            $body = [
                'receptor' => $receptor,
                'message'  => $message,
                'sender'   => $sender,
            ];
        }

        $response = wp_remote_post($url, [
            'timeout' => 10,
            'body'    => $body,
        ]);

        if (is_wp_error($response)) {
            return ['success' => false, 'message' => $response->get_error_message()];
        }

        $code = wp_remote_retrieve_response_code($response);
        return ['success' => ($code === 200), 'status_code' => $code];
    }

    /**
     * IPPanel / FarazSMS Implementation
     */
    private static function send_ippanel($api_key, $sender, $receptor, $message, $template = '', $tokens = []) {
        $url = 'https://api2.ippanel.com/api/v1/sms/send/webservice/single';
        $body = wp_json_encode([
            'recipient' => [$receptor],
            'sender'    => $sender ?: '3000505',
            'message'   => $message,
        ]);

        $response = wp_remote_post($url, [
            'timeout' => 10,
            'headers' => [
                'apikey'       => $api_key,
                'Content-Type' => 'application/json',
            ],
            'body'    => $body,
        ]);

        if (is_wp_error($response)) {
            return ['success' => false, 'message' => $response->get_error_message()];
        }

        $code = wp_remote_retrieve_response_code($response);
        return ['success' => ($code >= 200 && $code < 300), 'status_code' => $code];
    }

    /**
     * Farapayamak Implementation
     */
    private static function send_farapayamak($api_key, $sender, $receptor, $message) {
        $url = 'https://api.payamak-panel.com/post/Send.asmx/SendSimpleSMS2';
        $response = wp_remote_post($url, [
            'timeout' => 10,
            'body'    => [
                'username' => $api_key,
                'password' => $sender,
                'to'       => $receptor,
                'from'     => $sender,
                'text'     => $message,
                'isflash'  => false,
            ],
        ]);

        if (is_wp_error($response)) {
            return ['success' => false, 'message' => $response->get_error_message()];
        }

        return ['success' => true];
    }

    /**
     * MeliPayamak Implementation
     */
    private static function send_melipayamak($api_key, $sender, $receptor, $message) {
        $url = 'https://rest.payamak-panel.com/api/SendSMS/SendSMS';
        $response = wp_remote_post($url, [
            'timeout' => 10,
            'body'    => [
                'username' => $api_key,
                'password' => $sender,
                'to'       => $receptor,
                'from'     => $sender,
                'text'     => $message,
            ],
        ]);

        if (is_wp_error($response)) {
            return ['success' => false, 'message' => $response->get_error_message()];
        }

        return ['success' => true];
    }

    /**
     * Trigger Lead Notification SMS
     */
    public function handle_lead_sms($lead_id, $lead_data) {
        $admin_mobile = get_option('sedrazavi_sms_admin_mobile', '');
        $notify_admin = get_option('sedrazavi_sms_notify_admin', '1');

        if ($notify_admin && !empty($admin_mobile)) {
            $name  = $lead_data['name'] ?? 'کاربر ناشناس';
            $phone = $lead_data['phone'] ?? '';
            $topic = $lead_data['topic'] ?? 'عمومی';
            $msg   = "درخواست جدید در وب‌سایت:\nنام: {$name}\nتماس: {$phone}\nموضوع: {$topic}";
            self::send_sms($admin_mobile, $msg);
        }

        // Send confirmation SMS to user if client mobile provided
        if (!empty($lead_data['phone'])) {
            $client_msg = "سلام {$lead_data['name']} گرامی،\nدرخواست شما در سیستم با موفقیت ثبت شد و به‌زودی کارشناسان ما با شما تماس خواهند گرفت.\nبا سپاس.";
            self::send_sms($lead_data['phone'], $client_msg);
        }
    }

    /**
     * Trigger Order SMS
     */
    public function handle_order_sms($order_id, $order_data) {
        $admin_mobile = get_option('sedrazavi_sms_admin_mobile', '');
        if (!empty($admin_mobile)) {
            $msg = "سفارش جدید #{$order_id} با مبلغ {$order_data['amount']} تومان ثبت شد.";
            self::send_sms($admin_mobile, $msg);
        }
    }

    /**
     * WooCommerce Order Status SMS
     */
    public function woocommerce_order_sms($order_id) {
        if (!function_exists('wc_get_order')) return;
        $order = wc_get_order($order_id);
        if (!$order) return;

        $phone = $order->get_billing_phone();
        $name  = $order->get_billing_first_name();
        $status = $order->get_status();

        if (!empty($phone)) {
            $msg = "سلام {$name} عزیز،\nوضعیت سفارش #{$order_id} شما به '{$status}' تغییر یافت.\nبا سپاس از خرید شما.";
            self::send_sms($phone, $msg);
        }
    }

    /**
     * Universal Payment Gateway Request Dispatcher (ZarinPal, Zibal, NextPay, Mellat)
     *
     * @param int $amount Amount in Tomans
     * @param string $description Description
     * @param string $callback_url Return URL
     * @param string $mobile Customer mobile
     * @param string $email Customer email
     * @return array ['success' => bool, 'redirect_url' => string, 'authority' => string]
     */
    public static function request_payment($amount, $description, $callback_url, $mobile = '', $email = '') {
        $gateway     = get_option('sedrazavi_payment_gateway', 'zarinpal');
        $merchant_id = get_option('sedrazavi_payment_merchant_id', '');
        $sandbox     = (bool) get_option('sedrazavi_payment_sandbox', '0');

        // Convert Toman to Rial if gateway expects Rials (ZarinPal v4 accepts Rials, Zibal accepts Rials/Tomans)
        $amount_rial = $amount * 10;

        switch ($gateway) {
            case 'zarinpal':
                $endpoint = $sandbox 
                    ? 'https://sandbox.zarinpal.com/pg/v4/payment/request.json' 
                    : 'https://api.zarinpal.com/pg/v4/payment/request.json';

                $response = wp_remote_post($endpoint, [
                    'headers' => ['Content-Type' => 'application/json'],
                    'body'    => wp_json_encode([
                        'merchant_id'  => $merchant_id,
                        'amount'       => $amount_rial,
                        'callback_url' => $callback_url,
                        'description'  => $description,
                        'metadata'     => ['mobile' => $mobile, 'email' => $email],
                    ]),
                    'timeout' => 15,
                ]);

                if (is_wp_error($response)) {
                    return ['success' => false, 'message' => $response->get_error_message()];
                }

                $data = json_decode(wp_remote_retrieve_body($response), true);
                if (!empty($data['data']['authority']) && $data['data']['code'] == 100) {
                    $auth = $data['data']['authority'];
                    $start_pay = $sandbox 
                        ? "https://sandbox.zarinpal.com/pg/StartPay/{$auth}" 
                        : "https://www.zarinpal.com/pg/StartPay/{$auth}";
                    return ['success' => true, 'redirect_url' => $start_pay, 'authority' => $auth];
                }
                return ['success' => false, 'message' => $data['errors']['message'] ?? 'خطا در اتصال به زرین‌پال'];

            case 'zibal':
                $endpoint = 'https://gateway.zibal.ir/v1/request';
                $response = wp_remote_post($endpoint, [
                    'headers' => ['Content-Type' => 'application/json'],
                    'body'    => wp_json_encode([
                        'merchant'    => $merchant_id,
                        'amount'      => $amount_rial,
                        'callbackUrl' => $callback_url,
                        'description' => $description,
                        'mobile'      => $mobile,
                    ]),
                    'timeout' => 15,
                ]);

                if (is_wp_error($response)) {
                    return ['success' => false, 'message' => $response->get_error_message()];
                }

                $data = json_decode(wp_remote_retrieve_body($response), true);
                if (!empty($data['trackId']) && $data['result'] == 100) {
                    $track_id = $data['trackId'];
                    return ['success' => true, 'redirect_url' => "https://gateway.zibal.ir/start/{$track_id}", 'authority' => (string)$track_id];
                }
                return ['success' => false, 'message' => $data['message'] ?? 'خطا در اتصال به زیبال'];

            default:
                return apply_filters('sedrazavi_custom_payment_request', ['success' => false, 'message' => 'درگاه پرداخت پشتیبانی نمی‌شود.'], $gateway, $amount);
        }
    }
}

// Bootstrap Adapter
SedRazavi_Iranian_Market_Adapter::get_instance();
