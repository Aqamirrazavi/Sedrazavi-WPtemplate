<?php
/**
 * SedRazavi Payment Gateway Adapter Pattern & Tax Suite
 * Specification: Part 21 - Pluggable PSP Adapters, VAT 10%, Stamp 5%, Official Invoicing
 *
 * @package SedRazavi
 * @subpackage Finance
 * @version 2.9.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Payment Gateway Adapter Interface
 */
interface SedRazavi_Payment_Gateway_Interface {
    public function request_payment($amount_toman, $callback_url, $order_id, $description = '', $mobile = '');
    public function verify_payment($authority, $amount_toman);
    public function get_gateway_title();
}

/**
 * ZarinPal REST v4 Gateway Adapter
 */
class SedRazavi_Zarinpal_Adapter implements SedRazavi_Payment_Gateway_Interface {
    private $merchant_id;
    private $is_sandbox;

    public function __construct($merchant_id, $is_sandbox = false) {
        $this->merchant_id = $merchant_id;
        $this->is_sandbox  = $is_sandbox;
    }

    public function get_gateway_title() {
        return 'زرین‌پال (درگاه پرداخت آنلاین)';
    }

    public function request_payment($amount_toman, $callback_url, $order_id, $description = '', $mobile = '') {
        $endpoint = $this->is_sandbox 
            ? 'https://sandbox.zarinpal.com/pg/v4/payment/request.json'
            : 'https://api.zarinpal.com/pg/v4/payment/request.json';

        $body = [
            'merchant_id'  => $this->merchant_id,
            'amount'       => $amount_toman * 10, // Rials
            'callback_url' => $callback_url,
            'description'  => $description ?: 'حق‌الوکاله و مشاوره پرونده شماره ' . $order_id,
            'metadata'     => ['mobile' => $mobile, 'order_id' => $order_id]
        ];

        $response = wp_remote_post($endpoint, [
            'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json'],
            'body'    => wp_json_encode($body),
            'timeout' => 20
        ]);

        if (is_wp_error($response)) {
            return ['success' => false, 'message' => $response->get_error_message()];
        }

        $data = json_decode(wp_remote_retrieve_body($response), true);
        if (!empty($data['data']['authority']) && $data['data']['code'] == 100) {
            $startPay = ($this->is_sandbox ? 'https://sandbox.zarinpal.com/pg/StartPay/' : 'https://www.zarinpal.com/pg/StartPay/') . $data['data']['authority'];
            return [
                'success'   => true,
                'authority' => $data['data']['authority'],
                'redirect'  => $startPay
            ];
        }

        return ['success' => false, 'message' => $data['errors']['message'] ?? 'خطا در اتصال به درگاه زرین‌پال'];
    }

    public function verify_payment($authority, $amount_toman) {
        $endpoint = $this->is_sandbox 
            ? 'https://sandbox.zarinpal.com/pg/v4/payment/verify.json'
            : 'https://api.zarinpal.com/pg/v4/payment/verify.json';

        $body = [
            'merchant_id' => $this->merchant_id,
            'amount'      => $amount_toman * 10,
            'authority'   => $authority
        ];

        $response = wp_remote_post($endpoint, [
            'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json'],
            'body'    => wp_json_encode($body),
            'timeout' => 20
        ]);

        if (is_wp_error($response)) {
            return ['success' => false, 'message' => $response->get_error_message()];
        }

        $data = json_decode(wp_remote_retrieve_body($response), true);
        if (!empty($data['data']['ref_id']) && in_array($data['data']['code'], [100, 101])) {
            return [
                'success'   => true,
                'ref_id'    => $data['data']['ref_id'],
                'card_hash' => $data['data']['card_hash'] ?? '',
                'card_pan'  => $data['data']['card_pan'] ?? '',
            ];
        }

        return ['success' => false, 'message' => $data['errors']['message'] ?? 'تراکنش ناموفق بود یا لغو گردید.'];
    }
}

/**
 * Main Payment & Tax Manager (Factory & Dispatcher)
 */
class SedRazavi_Payment_Adapter {

    const VAT_PERCENT       = 0.10; // ۱۰٪ ارزش افزوده
    const STAMP_TAX_PERCENT = 0.05; // ۵٪ تمبر علی‌الحساب مالیاتی وکلای دادگستری

    public static function init() {
        add_action('rest_api_init', [__CLASS__, 'register_payment_endpoints']);
    }

    /**
     * Calculate Tax Breakdown (سامانه مودیان و تمبر مالیاتی کانون وکلا)
     */
    public static function calculate_tax_breakdown($base_amount_toman) {
        $vat      = round($base_amount_toman * self::VAT_PERCENT);
        $stampTax = round($base_amount_toman * self::STAMP_TAX_PERCENT);
        $total    = $base_amount_toman + $vat + $stampTax;

        return [
            'base_amount' => $base_amount_toman,
            'vat_10'      => $vat,
            'stamp_tax_5' => $stampTax,
            'total_toman' => $total,
        ];
    }

    /**
     * Factory method to instantiate the requested PSP
     */
    public static function get_adapter($gateway = 'zarinpal') {
        switch ($gateway) {
            case 'zarinpal':
            default:
                $merchant = get_option('sedrazavi_zarinpal_merchant', '00000000-0000-0000-0000-000000000000');
                $sandbox  = (bool) get_option('sedrazavi_zarinpal_sandbox', true);
                return new SedRazavi_Zarinpal_Adapter($merchant, $sandbox);
        }
    }

    public static function register_payment_endpoints() {
        register_rest_route('sedrazavi/v1/payment', '/checkout', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'handle_checkout'],
            'permission_callback' => '__return_true',
        ]);
    }

    public static function handle_checkout($request) {
        $params   = $request->get_json_params();
        $baseFee  = absint($params['amount'] ?? 1000000);
        $taxData  = self::calculate_tax_breakdown($baseFee);
        $orderId  = 'SR-' . time() . '-' . random_int(100, 999);
        $mobile   = sanitize_text_field($params['mobile'] ?? '');
        $gateway  = sanitize_text_field($params['gateway'] ?? 'zarinpal');

        $adapter  = self::get_adapter($gateway);
        $callback = home_url('/payment-verification/?order_id=' . $orderId);

        $result   = $adapter->request_payment($taxData['total_toman'], $callback, $orderId, 'پرداخت فاکتور رسمی وکالت', $mobile);

        return rest_ensure_response([
            'order_id' => $orderId,
            'tax_data' => $taxData,
            'gateway'  => $adapter->get_gateway_title(),
            'result'   => $result
        ]);
    }
}

SedRazavi_Payment_Adapter::init();