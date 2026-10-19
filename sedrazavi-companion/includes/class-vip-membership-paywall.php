<?php
/**
 * SedRazavi VIP Membership & Media Paywall
 *
 * Implements tiered subscription plans, content locking shortcodes,
 * and expiring download token generation to protect private direct file links.
 *
 * @package SedRazavi_Companion
 * @version 5.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_VIP_Paywall {

    private static $instance = null;
    const USER_TIER_META = '_sedrazavi_vip_tier';
    const USER_EXPIRY_META = '_sedrazavi_vip_expiry';

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_shortcode('sedrazavi_vip_guard', [$this, 'render_vip_guard_shortcode']);
        add_shortcode('sedrazavi_vip_pricing', [$this, 'render_vip_pricing_shortcode']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
    }

    public function get_user_vip_status($user_id = null) {
        if (!$user_id) {
            $user_id = get_current_user_id();
        }
        if (!$user_id) {
            return [
                'isVip'        => false,
                'tier'         => 'free',
                'daysRemaining'=> 0,
                'expiryDate'   => null,
            ];
        }

        if (user_can($user_id, 'manage_options')) {
            return [
                'isVip'        => true,
                'tier'         => 'admin_unlimited',
                'daysRemaining'=> 9999,
                'expiryDate'   => 'دسترسی نامحدود مدیریت',
            ];
        }

        $tier = get_user_meta($user_id, self::USER_TIER_META, true) ?: 'free';
        $expiry = get_user_meta($user_id, self::USER_EXPIRY_META, true);

        if (!$expiry || strtotime($expiry) < time()) {
            return [
                'isVip'        => false,
                'tier'         => 'expired',
                'daysRemaining'=> 0,
                'expiryDate'   => $expiry,
            ];
        }

        $days = ceil((strtotime($expiry) - time()) / 86400);

        return [
            'isVip'        => true,
            'tier'         => $tier,
            'daysRemaining'=> $days,
            'expiryDate'   => $expiry,
        ];
    }

    /**
     * Shortcode [sedrazavi_vip_guard plan="gold"]Secret Content[/sedrazavi_vip_guard]
     */
    public function render_vip_guard_shortcode($atts, $content = null) {
        $atts = shortcode_atts([
            'plan'         => 'silver', // silver, gold, diamond
            'upgrade_url'  => home_url('/#vip-plans'),
            'message'      => 'این بخش مختص کاربران دارای اشتراک ویژه است.',
        ], $atts);

        $status = $this->get_user_vip_status();

        if ($status['isVip']) {
            return '<div class="sr-vip-unlocked-content">' . do_shortcode($content) . '</div>';
        }

        ob_start();
        ?>
        <div class="sr-vip-paywall-locked relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-b from-slate-900 to-black p-6 text-center text-white my-4 shadow-xl" dir="rtl">
            <div class="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 shadow-md">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h3 class="text-base font-bold text-amber-300 mb-1">محتوای ویژه مشترکین VIP</h3>
            <p class="text-xs text-slate-400 max-w-md mx-auto mb-4"><?php echo esc_html($atts['message']); ?></p>
            <div class="flex items-center justify-center gap-3">
                <a href="<?php echo esc_url($atts['upgrade_url']); ?>" class="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all">
                    ارتقا به اشتراک ویژه
                </a>
                <a href="<?php echo esc_url(wp_login_url()); ?>" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors">
                    ورود به حساب کاربری
                </a>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * VIP Pricing Tiers Shortcode
     */
    public function render_vip_pricing_shortcode($atts) {
        $plans = [
            [
                'id'       => 'silver-1m',
                'name'     => 'اشتراک ۱ ماهه نقره‌ای',
                'price'    => '۱۸۰,۰۰۰ تومان',
                'period'   => '۳۰ روز دسترسی نامحدود',
                'features' => ['دانلود تمامی فیلم‌ها و سریال‌ها', 'لینک‌های پرسرعت نیم‌بها', 'پشتیبانی تیکتی'],
                'isPopular'=> false,
            ],
            [
                'id'       => 'gold-3m',
                'name'     => 'اشتراک ۳ ماهه طلایی',
                'price'    => '۴۵۰,۰۰۰ تومان',
                'period'   => '۹۰ روز دسترسی + ۲۰ روز هدیه',
                'features' => ['دانلود با کیفیت 4K و صوت دوبله', 'بدون محدودیت ترافیک سرور', 'دسترسی زودهنگام به قسمت‌های جدید'],
                'isPopular'=> true,
            ],
            [
                'id'       => 'diamond-1y',
                'name'     => 'اشتراک سالانه الماس',
                'price'    => '۱,۲۰۰,۰۰۰ تومان',
                'period'   => '۳۶۵ روز دسترسی نامحدود',
                'features' => ['همه امکانات پلن طلایی', 'پخش آنلاین بدون تبلیغات', 'پشتیبانی اختصاصی VIP'],
                'isPopular'=> false,
            ],
        ];

        ob_start();
        ?>
        <div class="sr-vip-pricing-grid grid grid-cols-1 md:grid-cols-3 gap-4" dir="rtl">
            <?php foreach ($plans as $plan): ?>
                <div class="p-5 rounded-2xl border <?php echo $plan['isPopular'] ? 'border-amber-500/60 bg-gradient-to-b from-amber-500/10 to-slate-900 shadow-xl' : 'border-slate-800 bg-slate-950/80'; ?> text-right space-y-4">
                    <div class="flex items-center justify-between">
                        <h4 class="text-sm font-bold text-white"><?php echo esc_html($plan['name']); ?></h4>
                        <?php if ($plan['isPopular']): ?>
                            <span class="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold">پیشنهاد ویژه</span>
                        <?php endif; ?>
                    </div>
                    <div>
                        <div class="text-lg font-bold text-amber-400 font-mono"><?php echo esc_html($plan['price']); ?></div>
                        <div class="text-xs text-slate-400 mt-0.5"><?php echo esc_html($plan['period']); ?></div>
                    </div>
                    <ul class="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
                        <?php foreach ($plan['features'] as $f): ?>
                            <li class="flex items-center gap-2">
                                <svg class="w-3.5 h-3.5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                                <span><?php echo esc_html($f); ?></span>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                    <button class="w-full py-2.5 rounded-xl font-bold text-xs transition-all <?php echo $plan['isPopular'] ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' : 'bg-slate-800 hover:bg-slate-700 text-white'; ?>">
                        انتخاب و تمدید اشتراک
                    </button>
                </div>
            <?php endforeach; ?>
        </div>
        <?php
        return ob_get_clean();
    }

    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/vip/status', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_vip_status'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1', '/download/generate-token', [
            'methods'             => 'POST',
            'callback'            => [$this, 'rest_generate_download_token'],
            'permission_callback' => function() {
                return is_user_logged_in();
            },
        ]);

        register_rest_route('sedrazavi/v1', '/download/(?P<token>[a-zA-Z0-9_-]+)', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_serve_download'],
            'permission_callback' => '__return_true',
            'args'                => [
                'token' => [
                    'required'          => true,
                    'sanitize_callback' => 'sanitize_text_field',
                ],
            ],
        ]);
    }

    public function rest_get_vip_status() {
        return rest_ensure_response($this->get_user_vip_status());
    }

    public function rest_generate_download_token($request) {
        $params = $request->get_json_params();
        $file_id = isset($params['fileId']) ? sanitize_text_field($params['fileId']) : 'sample-media-1080p';

        $token = 'DL-' . wp_generate_password(24, false);
        $user_id = get_current_user_id();

        // Expire token in 2 hours
        set_transient('sr_dl_token_' . $token, [
            'userId'    => $user_id,
            'fileId'    => $file_id,
            'ip'        => isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field($_SERVER['REMOTE_ADDR']) : '',
            'expiresAt' => time() + (2 * HOUR_IN_SECONDS),
        ], 2 * HOUR_IN_SECONDS);

        return rest_ensure_response([
            'success'     => true,
            'token'       => $token,
            'downloadUrl' => home_url('/wp-json/sedrazavi/v1/download/' . $token),
            'expiresIn'   => '۲ ساعت',
        ]);
    }

    public function rest_serve_download($request) {
        $token = $request->get_param('token');
        $data = get_transient('sr_dl_token_' . $token);

        if (!$data || !is_array($data)) {
            return new WP_Error('token_expired', 'لینک دانلود منقضی شده یا نامعتبر است. لطفاً مجدداً از پنل VIP اقدام به دریافت لینک فرمایید.', ['status' => 403]);
        }

        // IP integrity check if configured
        $current_ip = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field($_SERVER['REMOTE_ADDR']) : '';
        if (!empty($data['ip']) && $data['ip'] !== $current_ip && !apply_filters('sedrazavi_skip_download_ip_check', false)) {
            return new WP_Error('ip_mismatch', 'دسترسی غیرمجاز: آی‌پی شما با آی‌پی صادرکننده لینک همخوانی ندارد.', ['status' => 403]);
        }

        // Clean up transient if single-use, or allow multi-part resume
        $file_id = sanitize_text_field($data['fileId']);
        $sample_filename = 'sedrazavi-vip-pack-' . $file_id . '.zip';

        // Provide file download stream or secure redirection
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . $sample_filename . '"');
        header('Pragma: no-cache');
        header('Expires: 0');

        echo "SedRazavi OS Secure VIP Download Payload\n";
        echo "File ID: " . esc_html($file_id) . "\n";
        echo "Authorized for User: " . esc_html($data['userId']) . "\n";
        echo "Generated At: " . gmdate('Y-m-d H:i:s') . " UTC\n";
        exit;
    }
}
