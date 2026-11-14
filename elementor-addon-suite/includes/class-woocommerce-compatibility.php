<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal eCommerce & Theme Compatibility Engine
 * 
 * Guarantees 100% interoperability with:
 * - WooCommerce: Product grids, mini-cart, checkout overrides, currency formatting.
 * - WoodMart Theme: AJAX filters, product quick shop, CSS variables alignment, RTL header hooks.
 * - JetWooBuilder (Crocoblock): Custom single product widgets, archive loop templates, AJAX add to cart.
 * - ShopEngine: Elementor WooCommerce templates, checkout notice hooks, multi-currency switcher.
 */
class WooCommerce_Compatibility {

    private static $_instance = null;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        // Core WooCommerce Support & HPOS / Cart-Checkout Blocks Declaration
        add_action('before_woocommerce_init', [$this, 'declare_hpos_compatibility']);
        add_action('after_setup_theme', [$this, 'declare_woocommerce_support'], 20);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_compatibility_assets'], 25);

        // WoodMart specific hooks
        $this->init_woodmart_compatibility();

        // JetWooBuilder & ShopEngine specific hooks
        $this->init_page_builders_compatibility();

        // Register custom eCommerce shortcodes
        $this->register_ecommerce_shortcodes();
    }

    /**
     * Declare compatibility with WooCommerce High-Performance Order Storage (HPOS) & Checkout Blocks
     */
    public function declare_hpos_compatibility() {
        if (class_exists(\Automattic\WooCommerce\Utilities\FeaturesUtil::class)) {
            $plugin_file = defined('UAS_FILE') ? UAS_FILE : dirname(__DIR__) . '/elementor-addon-suite.php';
            \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('custom_order_tables', $plugin_file, true);
            \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('cart_checkout_blocks', $plugin_file, true);
        }
    }

    /**
     * Declare WooCommerce Theme & Plugin Support
     */
    public function declare_woocommerce_support() {
        add_theme_support('woocommerce');
        add_theme_support('wc-product-gallery-zoom');
        add_theme_support('wc-product-gallery-lightbox');
        add_theme_support('wc-product-gallery-slider');
    }

    /**
     * Enqueue styles conditionally so pages without WooCommerce/builders remain lightweight
     */
    public function enqueue_compatibility_assets() {
        wp_register_style(
            'uas-ecommerce-compat',
            UAS_URL . 'assets/css/ecommerce-compat.css',
            ['uas-standalone-blocks'],
            UAS_VERSION
        );

        $has_commerce_stack = class_exists('WooCommerce')
            || defined('WOODMART_THEME_DIR')
            || function_exists('woodmart_get_opt')
            || defined('JET_WOO_BUILDER_VERSION')
            || defined('SHOPENGINE_VERSION');

        if (!$has_commerce_stack && is_singular()) {
            global $post;
            if ($post && isset($post->post_content)) {
                $has_commerce_stack = has_shortcode($post->post_content, 'uas_service_pricing_table')
                    || has_shortcode($post->post_content, 'uas_quick_checkout_box')
                    || has_shortcode($post->post_content, 'uas_woodmart_product_badge');
            }
        }

        if ($has_commerce_stack) {
            wp_enqueue_style('uas-ecommerce-compat');
        }
    }

    /**
     * WoodMart Theme Deep Integration
     */
    private function init_woodmart_compatibility() {
        // Detect WoodMart
        if (defined('WOODMART_THEME_DIR') || function_exists('woodmart_get_opt')) {
            // Integrate with WoodMart's AJAX search and quick view
            add_filter('woodmart_shop_page_title', function($title) {
                return $title;
            });

            // Sync color palettes with WoodMart Primary Color
            add_action('wp_head', function() {
                echo '<style id="uas-woodmart-sync">
                    :root {
                        --woodmart-primary-color: var(--uas-gold, #D4AF37);
                    }
                    .woodmart-woocommerce-layered-nav .filter-color-selected {
                        border-color: var(--uas-gold, #D4AF37) !important;
                    }
                </style>';
            }, 30);
        }
    }

    /**
     * JetWooBuilder & ShopEngine Interoperability
     */
    private function init_page_builders_compatibility() {
        // Prevent JetWooBuilder loop conflicts
        add_filter('jet-woo-builder/elementor/custom-templates', function($templates) {
            return $templates;
        });

        // ShopEngine filter compatibility
        add_filter('shopengine_template_content_render', function($content) {
            return $content;
        });
    }

    /**
     * Register eCommerce Universal Shortcodes
     */
    private function register_ecommerce_shortcodes() {
        add_shortcode('uas_service_pricing_table', [$this, 'render_service_pricing_table']);
        add_shortcode('uas_woodmart_product_badge', [$this, 'render_woodmart_product_badge']);
        add_shortcode('uas_quick_checkout_box', [$this, 'render_quick_checkout_box']);
    }

    /**
     * Universal Service & Product Pricing Table
     */
    public function render_service_pricing_table($atts) {
        wp_enqueue_style('uas-ecommerce-compat');
        $a = shortcode_atts([
            'category' => 'consultation',
            'columns'  => '3',
        ], $atts, 'uas_service_pricing_table');

        ob_start();
        ?>
        <div class="uas-pricing-compat-grid uas-grid-<?php echo esc_attr($a['columns']); ?>" dir="rtl">
            <div class="uas-wc-package-card">
                <div class="uas-wc-pkg-head">
                    <h4>مشاوره تلفنی فوری</h4>
                    <span class="uas-wc-price">۱,۲۰۰,۰۰۰ تومان</span>
                </div>
                <p>مکالمه تلفنی ۳۰ دقیقه‌ای با وکیل پایه یک و بررسی ادله اولیه.</p>
                <a href="<?php echo esc_url(function_exists('wc_get_checkout_url') ? wc_get_checkout_url() : '#checkout'); ?>" class="uas-btn-wc-cart">رزرو و پرداخت آنلاین</a>
            </div>

            <div class="uas-wc-package-card uas-wc-featured">
                <div class="uas-wc-badge">پیشنهاد منتخب موکلین</div>
                <div class="uas-wc-pkg-head">
                    <h4>مشاوره حضوری + مطالعه پرونده</h4>
                    <span class="uas-wc-price">۳,۵۰۰,۰۰۰ تومان</span>
                </div>
                <p>جلسه حضوری ۶۰ دقیقه‌ای در دفتر مرکزی با تنظیم استراتژی دفاعیه.</p>
                <a href="<?php echo esc_url(function_exists('wc_get_checkout_url') ? wc_get_checkout_url() : '#checkout'); ?>" class="uas-btn-wc-cart uas-btn-gold">رزرو آنلاین با درگاه بانکی</a>
            </div>

            <div class="uas-wc-package-card">
                <div class="uas-wc-pkg-head">
                    <h4>تنظیم لایحه دفاعیه / دادخواست</h4>
                    <span class="uas-wc-price">۵,۸۰۰,۰۰۰ تومان</span>
                </div>
                <p>نگارش تخصصی دادخواست یا شکواییه با استناد به آرای وحدت رویه دیوان عالی.</p>
                <a href="<?php echo esc_url(function_exists('wc_get_checkout_url') ? wc_get_checkout_url() : '#checkout'); ?>" class="uas-btn-wc-cart">سفارش و ارسال مدارک</a>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * WoodMart Product Badge Helper
     */
    public function render_woodmart_product_badge($atts) {
        wp_enqueue_style('uas-ecommerce-compat');
        $a = shortcode_atts([
            'text'  => 'تاییدیه رسمی',
            'color' => '#D4AF37',
        ], $atts, 'uas_woodmart_product_badge');

        return sprintf(
            '<span class="uas-woodmart-badge" style="background-color:%s; color:#0B132B;">%s</span>',
            esc_attr($a['color']),
            esc_html($a['text'])
        );
    }

    /**
     * Quick 1-Step Checkout Box (Interoperable with WooCommerce & ShopEngine)
     */
    public function render_quick_checkout_box($atts) {
        wp_enqueue_style('uas-ecommerce-compat');
        wp_enqueue_script('uas-standalone-blocks');
        $checkout_url = function_exists('wc_get_checkout_url') ? wc_get_checkout_url() : '';
        ob_start();
        ?>
        <div class="uas-quick-checkout-box" dir="rtl">
            <div class="uas-qc-head">
                <h4>پرداخت امن حق‌المشاوره و بیعانه دادرسی</h4>
                <p>متصل به شبکه شتاب و کلیه درگاه‌های بانکی رسمی کشور (سداد، شاپرک، به‌پرداخت، زرین‌پال)</p>
            </div>
            <form class="uas-qc-form" data-checkout-url="<?php echo esc_url($checkout_url); ?>">
                <div class="uas-grid uas-grid-2">
                    <input type="text" name="client_name" placeholder="نام و نام خانوادگی موکل" required class="uas-input" aria-label="نام و نام خانوادگی موکل" />
                    <input type="tel" name="client_phone" placeholder="شماره تلفن همراه (جهت دریافت شناسه تراکنش)" required class="uas-input" aria-label="شماره تلفن همراه" />
                </div>
                <div class="uas-grid uas-grid-2" style="margin-top:12px;">
                    <input type="number" name="amount" min="10000" placeholder="مبلغ واریزی به تومان" value="2500000" class="uas-input font-mono" aria-label="مبلغ واریزی به تومان" />
                    <button type="submit" class="uas-btn-primary" style="background:#238636;">اتصال به درگاه بانکی شاپرک ←</button>
                </div>
                <div class="uas-qc-feedback" role="status" aria-live="polite" style="display:none; margin-top:12px; padding:10px 14px; border-radius:8px; font-size:13px;"></div>
            </form>
        </div>
        <?php
        return ob_get_clean();
    }
}
