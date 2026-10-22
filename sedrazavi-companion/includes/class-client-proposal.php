<?php
/**
 * SedRazavi OS - Printable Tactical Proposal & Spec Sheet Generator
 * Generates an executive A4 printable project specification and pre-invoice
 * with the verified identity of Seyyed Amir Hossein Razavi Fordoei.
 *
 * Location: sedrazavi-companion/includes/class-client-proposal.php
 * @package SedRazavi_Companion
 * @version 6.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Client_Proposal {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
        add_action('wp_ajax_sedrazavi_generate_proposal', [$this, 'ajax_generate_proposal']);
        add_action('wp_ajax_nopriv_sedrazavi_generate_proposal', [$this, 'ajax_generate_proposal']);
    }

    public function register_routes() {
        register_rest_route('sedrazavi/v1', '/proposal/generate', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_generate_proposal'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function calculate_specs($data) {
        $project_type   = sanitize_text_field($data['project_type'] ?? 'enterprise');
        $bilingual      = !empty($data['bilingual']);
        $speed_opt      = !empty($data['speed_opt']);
        $custom_portal  = !empty($data['custom_portal']);
        $offline_queue  = !empty($data['offline_queue']);
        $base_budget    = 25000000; // 25 Million Tomans base
        $base_timeline  = 14; // 14 business days

        $deliverables = [
            'معماری پوسته اختصاصی فوق‌سریع بدون بارگذاری فریم‌ورک‌های سنگین (Zero Bloat)',
            'طراحی ریسپانسیو اختصاصی منطبق بر استاندارد‌های Core Web Vitals (LCP < 1.0s)',
            'سازگاری کامل با استانداردهای امنیتی و گواهینامه‌های SSL/TLS سخت‌گیرانه',
        ];

        if ($project_type === 'enterprise') {
            $base_budget += 15000000;
            $base_timeline += 7;
            $deliverables[] = 'زیرساخت اختصاصی JetEngine و CPTهای سفارشی سطح سازمانی';
        } elseif ($project_type === 'crypto_web3') {
            $base_budget += 20000000;
            $base_timeline += 10;
            $deliverables[] = 'طراحی ترمینال سایبرنتیک Web3 با نمودارهای نرخ زنده و امنیت رمزنگاری';
        }

        if ($bilingual) {
            $base_budget += 8000000;
            $base_timeline += 4;
            $deliverables[] = 'سیستم دوزبانه سروری (/en/) با نگاشت هدرهای hreflang و ترجمه مستقل بدون کندی';
        }

        if ($speed_opt) {
            $base_budget += 6000000;
            $base_timeline += 3;
            $deliverables[] = 'بهینه‌سازی حداکثری LCP و CLS=0 با فونت‌های بهینه WOFF2 و کشینگ لبه';
        }

        if ($custom_portal) {
            $base_budget += 12000000;
            $base_timeline += 6;
            $deliverables[] = 'پیشخوان اختصاصی و پورتال کاربری مستقل فرانت‌اند با کنترل دسترسی چندنقشی (RBAC)';
        }

        if ($offline_queue) {
            $base_budget += 4000000;
            $deliverables[] = 'موتور ارسال فرم با صف ذخیره‌سازی آفلاین و همگام‌سازی خودکار در زمان اختلال اینترنت';
        }

        return [
            'architect'       => 'سید امیر حسین رضوی فردویی (SedRazavi)',
            'title'           => 'سند مشخصات فنی و پیش‌فاکتور رسمی معماری وب‌سایت',
            'reference_code'  => 'SR-PROP-' . strtoupper(substr(md5(uniqid()), 0, 8)),
            'created_at'      => current_time('Y/m/d H:i'),
            'project_type'    => $project_type,
            'estimated_days'  => $base_timeline,
            'total_investment'=> number_format($base_budget) . ' تومان',
            'deliverables'    => $deliverables,
            'official_links'  => [
                'telegram' => 'https://t.me/sedrazavi',
                'eitaa'    => 'https://eitaa.com/sedrazavi',
                'handle'   => '@sedrazavi',
            ],
        ];
    }

    public function rest_generate_proposal($request) {
        $params = $request->get_json_params() ?: $request->get_params();
        $specs  = $this->calculate_specs($params);

        return rest_ensure_response([
            'success' => true,
            'data'    => $specs,
        ]);
    }

    public function ajax_generate_proposal() {
        $data  = $_POST;
        $specs = $this->calculate_specs($data);
        wp_send_json_success($specs);
    }
}
