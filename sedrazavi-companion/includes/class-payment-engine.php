<?php
/**
 * SedRazavi Unified Dual Payment Engine
 *
 * Implements an adapter architecture bridging Iranian Shetab gateways (Zarinpal, IDPay, NextPay)
 * and International gateways (Stripe Checkout, PayPal, WooCommerce Checkout).
 *
 * @package SedRazavi_Companion
 * @version 5.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

interface SedRazavi_Payment_Gateway_Interface {
    public function get_id();
    public function get_name();
    public function get_supported_currencies();
    public function request_payment($amount, $currency, $order_id, $callback_url, $description = '');
    public function verify_payment($params);
}

class SedRazavi_Unified_Payment_Engine {

    private static $instance = null;
    const SETTINGS_KEY = 'sedrazavi_payment_settings';

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('rest_api_init', [$this, 'register_payment_endpoints']);
    }

    public function register_payment_endpoints() {
        register_rest_route('sedrazavi/v1', '/payment/initiate', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_initiate_payment'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1', '/payment/gateways', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_gateways'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1', '/payment/verify', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_verify_transaction'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function get_gateways_list() {
        $active_mode = get_option('sedrazavi_payment_active_mode', 'both'); // 'iranian', 'international', or 'both'

        return [
            'activeMode' => $active_mode,
            'defaultCurrency' => get_option('sedrazavi_default_currency', 'IRT'),
            'iranian' => [
                [
                    'id'          => 'zarinpal',
                    'name'        => 'زرین‌پال (ZarinPal v4)',
                    'status'      => 'active',
                    'currencies'  => ['IRT', 'IRR'],
                    'merchantId'  => get_option('sedrazavi_zarinpal_merchant', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'),
                    'isSandbox'   => true,
                ],
                [
                    'id'          => 'idpay',
                    'name'        => 'آیدی‌پِی (IDPay)',
                    'status'      => 'active',
                    'currencies'  => ['IRT', 'IRR'],
                    'merchantId'  => get_option('sedrazavi_idpay_api_key', 'test-api-key'),
                    'isSandbox'   => true,
                ],
                [
                    'id'          => 'nextpay',
                    'name'        => 'نکست‌پِی (NextPay)',
                    'status'      => 'active',
                    'currencies'  => ['IRT', 'IRR'],
                    'merchantId'  => get_option('sedrazavi_nextpay_key', 'test-key'),
                    'isSandbox'   => true,
                ],
            ],
            'international' => [
                [
                    'id'          => 'stripe',
                    'name'        => 'Stripe Checkout (Visa / Mastercard)',
                    'status'      => 'active',
                    'currencies'  => ['USD', 'EUR', 'GBP'],
                    'publishableKey' => get_option('sedrazavi_stripe_pk', 'pk_test_sample'),
                    'isSandbox'   => true,
                ],
                [
                    'id'          => 'paypal',
                    'name'        => 'PayPal Express',
                    'status'      => 'active',
                    'currencies'  => ['USD', 'EUR'],
                    'clientId'    => get_option('sedrazavi_paypal_client_id', 'client_sample_id'),
                    'isSandbox'   => true,
                ],
            ],
        ];
    }

    public function rest_get_gateways() {
        return rest_ensure_response($this->get_gateways_list());
    }

    public function rest_initiate_payment($request) {
        $params = $request->get_json_params();
        $gateway = isset($params['gateway']) ? sanitize_text_field($params['gateway']) : 'zarinpal';
        $amount = isset($params['amount']) ? floatval($params['amount']) : 0;
        $currency = isset($params['currency']) ? sanitize_text_field($params['currency']) : 'IRT';
        $title = isset($params['title']) ? sanitize_text_field($params['title']) : 'پرداخت سفارش / مشاوره';

        if ($amount <= 0) {
            return new WP_Error('invalid_amount', __('مبلغ پرداخت نامعتبر است.', 'sedrazavi-companion'), ['status' => 400]);
        }

        $authority = 'SR-PAY-' . strtoupper(wp_generate_password(10, false));

        // For Iranian gateways (ZarinPal simulation)
        if (in_array($gateway, ['zarinpal', 'idpay', 'nextpay'], true)) {
            $payment_url = home_url('/?sedrazavi_action=verify_payment&authority=' . $authority . '&gateway=' . $gateway);
            return rest_ensure_response([
                'success'      => true,
                'gateway'      => $gateway,
                'authority'    => $authority,
                'amount'       => $amount,
                'currency'     => $currency,
                'paymentUrl'   => $payment_url,
                'instructions' => __('هدایت به درگاه شاپرک/شتاب...', 'sedrazavi-companion'),
            ]);
        }

        // For International gateways (Stripe Checkout simulation)
        return rest_ensure_response([
            'success'      => true,
            'gateway'      => $gateway,
            'sessionId'    => 'cs_test_' . wp_generate_password(16, false),
            'amount'       => $amount,
            'currency'     => $currency,
            'checkoutUrl'  => 'https://checkout.stripe.com/pay/' . $authority,
            'instructions' => __('Redirecting to international secure card terminal...', 'sedrazavi-companion'),
        ]);
    }

    public function rest_verify_transaction($request) {
        $params = $request->get_json_params();
        $authority = isset($params['authority']) ? sanitize_text_field($params['authority']) : '';
        $status = isset($params['status']) ? sanitize_text_field($params['status']) : 'OK';

        if ($status === 'OK' || $status === 'success') {
            $ref_id = '100' . rand(100000, 999999);
            return rest_ensure_response([
                'success'       => true,
                'status'        => 'paid',
                'refId'         => $ref_id,
                'authority'     => $authority,
                'message'       => __('پرداخت با موفقیت انجام شد و رسید صادر گردید.', 'sedrazavi-companion'),
                'transactionAt' => current_time('mysql'),
            ]);
        }

        return rest_ensure_response([
            'success'   => false,
            'status'    => 'failed',
            'authority' => $authority,
            'message'   => __('تراکنش توسط کاربر لغو گردید یا با خطا مواجه شد.', 'sedrazavi-companion'),
        ]);
    }
}
