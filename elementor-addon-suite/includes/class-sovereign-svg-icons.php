<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Sovereign SVG Icons Bank (66+ Models)
 * Zero external CDN dependencies - 100% inline SVG engine
 *
 * @package Universal_Elementor_Suite
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */
class Sovereign_Svg_Icons {

    private static $_instance = null;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        add_shortcode('sedrazavi_icon', [$this, 'render_icon_shortcode']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
    }

    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/icons-bank', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_icons_bank'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function rest_get_icons_bank($request) {
        $icons = $this->get_icons_catalog();
        return rest_ensure_response([
            'success' => true,
            'total'   => count($icons),
            'icons'   => $icons,
        ]);
    }

    public function render_icon_shortcode($atts) {
        $atts = shortcode_atts([
            'name'   => 'scales-of-justice-gold',
            'size'   => '24',
            'color'  => '#D4AF37',
            'class'  => '',
            'stroke' => '1.8',
        ], $atts, 'sedrazavi_icon');

        $catalog = $this->get_icons_catalog();
        $name = sanitize_key($atts['name']);
        if (!isset($catalog[$name])) {
            $name = 'scales-of-justice-gold';
        }

        $icon = $catalog[$name];
        $size = intval($atts['size']);
        $color = esc_attr($atts['color']);
        $custom_class = esc_attr($atts['class']);
        $stroke = esc_attr($atts['stroke']);

        return sprintf(
            '<span class="sr-svg-icon sr-icon-%1$s %2$s" style="display:inline-flex;align-items:center;justify-content:center;color:%3$s;" aria-label="%4$s"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="%5$d" height="%5$d" viewBox="%6$s" fill="none" stroke="currentColor" stroke-width="%7$s" stroke-linecap="round" stroke-linejoin="round">%8$s</svg></span>',
            esc_attr($name),
            $custom_class,
            $color,
            esc_attr($icon['title']),
            $size,
            esc_attr($icon['viewBox']),
            $stroke,
            $icon['path']
        );
    }

    public function get_icons_catalog() {
        return [
            // 1-11: Legal & Justice
            'scales-of-justice-gold' => [
                'number' => 1,
                'title' => 'ترازوی زرین عدالت و دادرسی منصفانه',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
            ],
            'gavel-verdict-sovereign' => [
                'number' => 2,
                'title' => 'چکش قضاوت و رای قطعی دادگاه',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="m14 13-7.5 7.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/>',
            ],
            'legal-parchment-scroll' => [
                'number' => 3,
                'title' => 'طومار قانون و اسناد رسمی لازم‌الاجرا',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v2a2 2 0 0 1-2 2Z"/><path d="M4 5v14a2 2 0 0 0 2 2h2"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="14" y2="13"/>',
            ],
            'courthouse-pillars-facade' => [
                'number' => 4,
                'title' => 'کاخ دادگستری و ستون‌های دیوان عالی',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M2 10h20"/><path d="M4 10v10"/><path d="M8 10v10"/><path d="M12 10v10"/><path d="M16 10v10"/><path d="M20 10v10"/><path d="M2 20h20"/><path d="M12 2 2 7h20z"/>',
            ],
            'case-file-attorney' => [
                'number' => 5,
                'title' => 'پوشه پرونده قضایی دارای مهر تایید',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="m9 13 2 2 4-4"/>',
            ],
            'law-book-civil-code' => [
                'number' => 6,
                'title' => 'مجموعه قوانین مدنی و کیفری زرین',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/><path d="M6 14h6"/>',
            ],
            'attorney-advocate-badge' => [
                'number' => 7,
                'title' => 'مدال افتخار وکیل پایه یک دادگستری',
                'viewBox' => '0 0 24 24',
                'path' => '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
            ],
            'arbitration-handshake-justice' => [
                'number' => 8,
                'title' => 'سازش، داوری و مصالحه حقوقی',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-3-3a1 1 0 0 0-1.4 0L13 11.6"/><path d="m18 11 3-3a1 1 0 0 0 0-1.4l-4.6-4.6a1 1 0 0 0-1.4 0L12 5"/><path d="m2 14 3-3a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1 0 1.4L5.1 19.7a1 1 0 0 1-1.4 0L2 18a1 1 0 0 1 0-1.4l0 0"/><path d="m6 10-3-3a1 1 0 0 1 0-1.4L7.6 1a1 1 0 0 1 1.4 0L12 4"/>',
            ],
            'property-deed-real-estate' => [
                'number' => 9,
                'title' => 'سند تک‌برگ کاداستر و مالکیت اراضی',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/><circle cx="12" cy="7" r="1"/>',
            ],
            'judicial-subpoena-envelope' => [
                'number' => 10,
                'title' => 'ابلاغیه الکترونیکی سامانه ثنا',
                'viewBox' => '0 0 24 24',
                'path' => '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><circle cx="18" cy="8" r="2" fill="currentColor"/>',
            ],
            'supreme-court-appeal-stamp' => [
                'number' => 11,
                'title' => 'مهر فرجام‌خواهی دیوان عالی کشور',
                'viewBox' => '0 0 24 24',
                'path' => '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/><path d="M12 2a10 10 0 0 1 10 10" stroke-dasharray="2 4"/>',
            ],

            // 12-22: Security & Cryptography
            'shield-anti-idor-barrier' => [
                'number' => 12,
                'title' => 'سپر ضد نفوذ و پدافند Anti-IDOR',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
            ],
            'hmac-token-keyhole' => [
                'number' => 13,
                'title' => 'کلید رمزنگاری امضای HMAC-SHA256',
                'viewBox' => '0 0 24 24',
                'path' => '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
            ],
            'pgp-encryption-fingerprint' => [
                'number' => 14,
                'title' => 'اثر انگشت کلید خصوصی و عمومی PGP',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M2 12a10 10 0 0 1 18-6"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/>',
            ],
            'safe-vault-encrypted' => [
                'number' => 15,
                'title' => 'گاوصندوق اسناد و فایل‌های فوق‌محرمانه',
                'viewBox' => '0 0 24 24',
                'path' => '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="8" x2="12" y2="10"/><line x1="12" y1="14" x2="12" y2="16"/><line x1="8" y1="12" x2="10" y2="12"/><line x1="14" y1="12" x2="16" y2="12"/>',
            ],
            'blockchain-block-link' => [
                'number' => 16,
                'title' => 'بلوک زنجیره متصل به دفتر کل توزیع‌شده',
                'viewBox' => '0 0 24 24',
                'path' => '<rect width="8" height="8" x="2" y="2" rx="1"/><rect width="8" height="8" x="14" y="2" rx="1"/><rect width="8" height="8" x="14" y="14" rx="1"/><rect width="8" height="8" x="2" y="14" rx="1"/><line x1="10" y1="6" x2="14" y2="6"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="10" y1="18" x2="14" y2="18"/><line x1="18" y1="10" x2="18" y2="14"/>',
            ],
            'cyber-forensics-binary-bug' => [
                'number' => 17,
                'title' => 'کشف جرایم رایانه‌ای و جرم‌شناسی سایبری',
                'viewBox' => '0 0 24 24',
                'path' => '<rect width="16" height="12" x="4" y="6" rx="2"/><circle cx="8" cy="12" r="1"/><circle cx="16" cy="12" r="1"/><path d="M12 2v4"/><path d="m19 19-3-3"/><path d="m5 19 3-3"/><path d="M2 12h2"/><path d="M20 12h2"/>',
            ],
            'qr-code-authenticator' => [
                'number' => 18,
                'title' => 'بارکد دوبعدی اصالت‌سنجی هویت دیجیتال',
                'viewBox' => '0 0 24 24',
                'path' => '<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/>',
            ],
            'padlock-two-factor-auth' => [
                'number' => 19,
                'title' => 'قفل ورود دو مرحله‌ای با پیامک و OTP',
                'viewBox' => '0 0 24 24',
                'path' => '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1.5"/>',
            ],
            'audit-log-check-list' => [
                'number' => 20,
                'title' => 'سیاهه بازرسی امنیتی و لاگ رخدادها',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/>',
            ],
            'anti-crawler-bot-barrier' => [
                'number' => 21,
                'title' => 'دیواره محافظت در برابر ربات‌ها و خزنده‌ها',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M12 2a4 4 0 0 0-4 4v1H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4Z"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><line x1="9" y1="17" x2="15" y2="17"/>',
            ],
            'data-encryption-matrix' => [
                'number' => 22,
                'title' => 'ماتریس کدگذاری داده‌ها و هش SHA-512',
                'viewBox' => '0 0 24 24',
                'path' => '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h.01"/><path d="M12 7h.01"/><path d="M17 7h.01"/><path d="M7 12h.01"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 17h.01"/><path d="M12 17h.01"/><path d="M17 17h.01"/>',
            ],

            // 23-33: Technology & Performance
            'terminal-cli-prompt' => [
                'number' => 23,
                'title' => 'ترمینال کامندلاین یونیکس و مهندسی پرامپت',
                'viewBox' => '0 0 24 24',
                'path' => '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
            ],
            'cpu-processor-quantum' => [
                'number' => 24,
                'title' => 'پردازنده کوانتومی با سرعت کلاک بالا',
                'viewBox' => '0 0 24 24',
                'path' => '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 14h3"/><path d="M1 9h3"/><path d="M1 14h3"/>',
            ],
            'speedometer-ttfb-gauge' => [
                'number' => 25,
                'title' => 'کیلومترشمار سرعت لود و تاخیر TTFB',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
            ],
            'git-merge-commit-branch' => [
                'number' => 26,
                'title' => 'شاخه گیت و کامی‌های نسخه‌بندی کد',
                'viewBox' => '0 0 24 24',
                'path' => '<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
            ],
            'database-sql-server' => [
                'number' => 27,
                'title' => 'پایگاه داده رابطه‌ای SQL با ایندکس سریع',
                'viewBox' => '0 0 24 24',
                'path' => '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>',
            ],
            'api-rest-webhook-cloud' => [
                'number' => 28,
                'title' => 'وب‌هوک ابری و وب‌سرویس RESTful API',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="m13 11-3 3 3 3"/>',
            ],
            'zap-energy-turbo-boost' => [
                'number' => 29,
                'title' => 'صاعقه توربوشارژ و بوست ۱۰۰٪ گوگلی',
                'viewBox' => '0 0 24 24',
                'path' => '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
            ],
            'responsive-devices-trio' => [
                'number' => 30,
                'title' => 'واکنش‌گرایی سه‌گانه: موبایل، تبلت و دسکتاپ',
                'viewBox' => '0 0 24 24',
                'path' => '<rect width="18" height="12" x="3" y="4" rx="2"/><path d="M2 20h20"/><path d="M12 16v4"/>',
            ],
            'code-xml-bracket-clean' => [
                'number' => 31,
                'title' => 'تگ‌های تمیز برنامه‌نویسی و کدهای بهینه',
                'viewBox' => '0 0 24 24',
                'path' => '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
            ],
            'server-rack-datacenter' => [
                'number' => 32,
                'title' => 'رک سرور دیتابیس مرکز داده با پایداری ۹۹.۹٪',
                'viewBox' => '0 0 24 24',
                'path' => '<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>',
            ],
            'cache-purge-clean-broom' => [
                'number' => 33,
                'title' => 'پاکسازی خودکار کش و ترنزینت‌های سرور',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
            ],

            // 34-44: Finance & eCommerce
            'currency-rial-gold-coin' => [
                'number' => 34,
                'title' => 'سکه طلای بهار آزادی و محاسبات ریالی',
                'viewBox' => '0 0 24 24',
                'path' => '<circle cx="12" cy="12" r="8"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
            ],
            'calculator-tax-stamp' => [
                'number' => 35,
                'title' => 'ماشین حساب مالیات، تمبر و حق‌الوکاله',
                'viewBox' => '0 0 24 24',
                'path' => '<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',
            ],
            'shopping-cart-drawer-fast' => [
                'number' => 36,
                'title' => 'سبد خرید سریع کشویی با تسویه آنی',
                'viewBox' => '0 0 24 24',
                'path' => '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
            ],
            'zarinpal-shaparak-gateway' => [
                'number' => 37,
                'title' => 'درگاه پرداخت شاپرک و زرین‌پال امن',
                'viewBox' => '0 0 24 24',
                'path' => '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>',
            ],
            'crown-vip-membership' => [
                'number' => 38,
                'title' => 'تاج پادشاهی و عضویت در کلوب VIP',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>',
            ],
            'trending-roi-growth-chart' => [
                'number' => 39,
                'title' => 'نمودار صعودی بازدهی سرمایه‌گذاری (ROI)',
                'viewBox' => '0 0 24 24',
                'path' => '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
            ],
            'invoice-receipt-tax' => [
                'number' => 40,
                'title' => 'پیش‌فاکتور رسمی و صورتحساب مودیان مالیاتی',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17V7"/>',
            ],
            'wallet-escrow-arbitration' => [
                'number' => 41,
                'title' => 'کیف پول امانت و حساب امانی داوری (Escrow)',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
            ],
            'percent-discount-badge' => [
                'number' => 42,
                'title' => 'بج تخفیف ویژه سالانه و آفر طلایی',
                'viewBox' => '0 0 24 24',
                'path' => '<line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
            ],
            'package-delivery-truck' => [
                'number' => 43,
                'title' => 'کامیون ارسال پست پیشتاز کتاب‌ها و لوایح',
                'viewBox' => '0 0 24 24',
                'path' => '<rect width="14" height="12" x="1" y="6" rx="2"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/><path d="M15 8h4.5a2 2 0 0 1 1.8 1.1l1.7 3.4V16h-3"/>',
            ],
            'bank-check-sayad' => [
                'number' => 44,
                'title' => 'چک صیادی بنفش با استعلام ثبت سامانه پیچک',
                'viewBox' => '0 0 24 24',
                'path' => '<rect width="20" height="12" x="2" y="6" rx="2"/><line x1="6" y1="12" x2="14" y2="12"/><line x1="16" y1="12" x2="18" y2="12"/><circle cx="18" cy="9" r="1"/>',
            ],

            // 45-55: Islamic Art & Persian Parametric
            'shamseh-twelve-star-gold' => [
                'number' => 45,
                'title' => 'شمسه دوازده‌پر زرین و گره‌چینی اسلامی',
                'viewBox' => '0 0 24 24',
                'path' => '<polygon points="12 2 15 8 21 9 17 14 18 20 12 17 6 20 7 14 3 9 9 8 12 2"/><circle cx="12" cy="12" r="3"/>',
            ],
            'muqarnas-arch-dome' => [
                'number' => 46,
                'title' => 'مقرنس طاق و گنبد ابنیه تاریخی اصفهان',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M12 2C7 2 4 8 4 14v8h16v-8c0-6-3-12-8-12z"/><path d="M12 6c-3 0-5 4-5 8v8h10v-8c0-4-2-8-5-8z"/><path d="M12 10c-1.5 0-2.5 2-2.5 4v8h5v-8c0-2-1-4-2.5-4z"/>',
            ],
            'persian-toranj-medallion' => [
                'number' => 47,
                'title' => 'ترنج شاه‌عباسی و لچک فرش ایرانی',
                'viewBox' => '0 0 24 24',
                'path' => '<ellipse cx="12" cy="12" rx="9" ry="5"/><ellipse cx="12" cy="12" rx="5" ry="9"/><circle cx="12" cy="12" r="2"/>',
            ],
            'arabesque-vine-scroll' => [
                'number' => 48,
                'title' => 'شاخه اسلیمی ده‌تند و ختایی محراب',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M12 22c5-5 8-8 8-13a8 8 0 0 0-16 0c0 5 3 8 8 13Z"/><circle cx="12" cy="9" r="3"/>',
            ],
            'calligraphy-qalam-feather' => [
                'number' => 49,
                'title' => 'قلم نی خوشنویسی و خط ثلث و نستعلیق',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="m19 11-8-8-8.5 8.5a2.12 2.12 0 0 0 0 3L7 19l4 4 4.5-4.5a2.12 2.12 0 0 0 0-3L19 11z"/><line x1="18" y1="2" x2="22" y2="6"/>',
            ],
            'mosque-minaret-crescent' => [
                'number' => 50,
                'title' => 'هلال ماه زرین و مناره‌های عدلیه اسلامی',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1Z"/><polygon points="19 3 20 5 22 6 20 7 19 9 18 7 16 6 18 5 19 3"/>',
            ],
            'girih-ten-star-tile' => [
                'number' => 51,
                'title' => 'کاشی‌کاری گره‌چینی ده‌پر حرم مطهر',
                'viewBox' => '0 0 24 24',
                'path' => '<polygon points="12 2 14.5 7.5 20.5 8 16 12 17.5 18 12 15 6.5 18 8 12 3.5 8 9.5 7.5 12 2"/>',
            ],
            'sedrazavi-hawk-sovereign' => [
                'number' => 52,
                'title' => 'نشان شاهین زرین اقتدار سید رضوی',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M12 2 4 9l8 13 8-13-8-7z"/><path d="m4 9 8 3 8-3"/><line x1="12" y1="12" x2="12" y2="22"/>',
            ],
            'compass-qibla-navigation' => [
                'number' => 53,
                'title' => 'قطب‌نمای اسطرلابی و قبله‌نمای برنجی',
                'viewBox' => '0 0 24 24',
                'path' => '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
            ],
            'sundial-solar-time' => [
                'number' => 54,
                'title' => 'ساعت آفتابی رصدخانه و وقت دادرسی',
                'viewBox' => '0 0 24 24',
                'path' => '<circle cx="12" cy="12" r="9"/><line x1="12" y1="12" x2="18" y2="6"/><line x1="12" y1="3" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="3" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="21" y2="12"/>',
            ],
            'persian-paisley-boteh' => [
                'number' => 55,
                'title' => 'بته‌جقه اصیل ایرانی و نماد آزادگی',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M12 2C7 2 5 7 5 12c0 6 3 10 7 10 3 0 7-3 7-8 0-4-3-6-5-7 3-1 2-5-2-7Z"/>',
            ],

            // 56-66: UI, Layout & Media Controls
            'mega-menu-grid-columns' => [
                'number' => 56,
                'title' => 'مگامنوی ۴ ستونه ناوبری با آیکون‌های دسته‌بندی',
                'viewBox' => '0 0 24 24',
                'path' => '<rect width="18" height="18" x="3" y="3" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/><line x1="15" y1="21" x2="15" y2="9"/>',
            ],
            'floating-island-pill' => [
                'number' => 57,
                'title' => 'هدر جزیره‌ای شناور با کپسول شیشه‌ای',
                'viewBox' => '0 0 24 24',
                'path' => '<rect width="20" height="8" x="2" y="8" rx="4"/><circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/>',
            ],
            'bento-layout-asymmetric' => [
                'number' => 58,
                'title' => 'چیدمان بنتوگرید نامتقارن ۲۰۲۶',
                'viewBox' => '0 0 24 24',
                'path' => '<rect width="7" height="18" x="3" y="3" rx="1"/><rect width="10" height="8" x="12" y="3" rx="1"/><rect width="10" height="8" x="12" y="13" rx="1"/>',
            ],
            'audio-waveform-sound' => [
                'number' => 59,
                'title' => 'امواج صوتی پادکست و وویس نوت تلگرام',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M2 10v4"/><path d="M6 6v12"/><path d="M10 3v18"/><path d="M14 8v8"/><path d="M18 5v14"/><path d="M22 10v4"/>',
            ],
            'video-chapters-player' => [
                'number' => 60,
                'title' => 'پلیر ویدیویی با فصل‌بندی زمانی',
                'viewBox' => '0 0 24 24',
                'path' => '<polygon points="5 3 19 12 5 21 5 3"/><line x1="19" y1="3" x2="19" y2="21"/>',
            ],
            'spotplayer-anti-piracy' => [
                'number' => 61,
                'title' => 'قفل لایسنس اسپات‌پلیر ضد ضبط صفحه',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V17a1 1 0 0 1-2 0v-.07A7.003 7.003 0 0 1 5.07 11H5a1 1 0 0 1 0-2h.07A7.003 7.003 0 0 1 11 5.07V5a1 1 0 0 1 2 0v.07A7.003 7.003 0 0 1 18.93 11H19a1 1 0 0 1 0 2h-.07A7.003 7.003 0 0 1 13 16.93z"/>',
            ],
            'story-circle-instagram' => [
                'number' => 62,
                'title' => 'حلقه استوری اینستاگرام و ایتا با گرادیان طلایی',
                'viewBox' => '0 0 24 24',
                'path' => '<circle cx="12" cy="12" r="10" stroke-dasharray="3 3"/><circle cx="12" cy="12" r="6"/>',
            ],
            'star-five-gold-rating' => [
                'number' => 63,
                'title' => 'ستاره طلایی رضایت‌سنجی ۵ ستاره',
                'viewBox' => '0 0 24 24',
                'path' => '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
            ],
            'soft98-download-arrow' => [
                'number' => 64,
                'title' => 'باکس دانلود چندسروره سافت۹۸',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
            ],
            'dark-light-mode-toggle' => [
                'number' => 65,
                'title' => 'سوییچر جادویی تم شب، روز و سیستم',
                'viewBox' => '0 0 24 24',
                'path' => '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
            ],
            'sovereign-master-seal-official' => [
                'number' => 66,
                'title' => 'مهر و امضای رسمی معمار سامانه: سید امیر حسین رضوی فردویی',
                'viewBox' => '0 0 24 24',
                'path' => '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6"/><polygon points="12 4 14 8 18 9 15 13 16 18 12 15 8 18 9 13 6 9 10 8 12 4"/>',
            ],
        ];
    }
}

