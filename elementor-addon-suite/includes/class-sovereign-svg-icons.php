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
            '<span class="sr-svg-icon sr-icon-%1$s %2$s" style="display:inline-flex;align-items:center;justify-content:center;color:%3$s;" aria-label="%4$s"><svg xmlns="http://www.w3.org/2000/svg" width="%5$d" height="%5$d" viewBox="%6$s" fill="none" stroke="currentColor" stroke-width="%7$s" stroke-linecap="round" stroke-linejoin="round">%8$s</svg></span>',
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
            'scales-of-justice-gold' => [
                'number' => 1,
                'title' => 'ترازوی زرین عدالت',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
            ],
            'gavel-verdict-sovereign' => [
                'number' => 2,
                'title' => 'چکش قضاوت و رای قطعی',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="m14 13-7.5 7.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/>',
            ],
            'legal-parchment-scroll' => [
                'number' => 3,
                'title' => 'طومار قانون و اسناد رسمی',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v2a2 2 0 0 1-2 2Z"/><path d="M4 5v14a2 2 0 0 0 2 2h2"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="14" y2="13"/>',
            ],
            'courthouse-pillars-facade' => [
                'number' => 4,
                'title' => 'کاخ دادگستری و دیوان عالی',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M2 10h20"/><path d="M4 10v10"/><path d="M8 10v10"/><path d="M12 10v10"/><path d="M16 10v10"/><path d="M20 10v10"/><path d="M2 20h20"/><path d="M12 2 2 7h20z"/>',
            ],
            'shield-anti-idor-barrier' => [
                'number' => 12,
                'title' => 'سپر ضد نفوذ Anti-IDOR',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
            ],
            'hmac-token-keyhole' => [
                'number' => 13,
                'title' => 'کلید رمزنگاری HMAC',
                'viewBox' => '0 0 24 24',
                'path' => '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
            ],
            'pgp-encryption-fingerprint' => [
                'number' => 14,
                'title' => 'اثر انگشت کلید PGP',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M2 12a10 10 0 0 1 18-6"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/>',
            ],
            'terminal-cli-prompt' => [
                'number' => 23,
                'title' => 'ترمینال کامندلاین یونیکس',
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
            'crown-vip-membership' => [
                'number' => 38,
                'title' => 'تاج عضویت کلوب VIP',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>',
            ],
            'shamseh-twelve-star-gold' => [
                'number' => 45,
                'title' => 'شمسه دوازده‌پر زرین اسلامی',
                'viewBox' => '0 0 24 24',
                'path' => '<polygon points="12 2 15 8 21 9 17 14 18 20 12 17 6 20 7 14 3 9 9 8 12 2"/><circle cx="12" cy="12" r="3"/>',
            ],
            'sedrazavi-hawk-sovereign' => [
                'number' => 52,
                'title' => 'نشان شاهین زرین SedRazavi',
                'viewBox' => '0 0 24 24',
                'path' => '<path d="M12 2 4 9l8 13 8-13-8-7z"/><path d="m4 9 8 3 8-3"/><line x1="12" y1="12" x2="12" y2="22"/>',
            ],
            'sovereign-master-seal-official' => [
                'number' => 66,
                'title' => 'مهر رسمی سید امیر حسین رضوی فردویی',
                'viewBox' => '0 0 24 24',
                'path' => '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6"/><polygon points="12 4 14 8 18 9 15 13 16 18 12 15 8 18 9 13 6 9 10 8 12 4"/>',
            ],
        ];
    }
}
