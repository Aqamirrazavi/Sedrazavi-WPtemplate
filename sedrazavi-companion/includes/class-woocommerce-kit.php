<?php
/**
 * SedRazavi OS - Modern WooCommerce Conversion & Slide-over Cart Kit
 * Location: sedrazavi-companion/includes/class-woocommerce-kit.php
 *
 * @package SedRazavi_Companion
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_WooCommerce_Kit {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        if (!class_exists('WooCommerce')) {
            return;
        }

        add_action('wp_footer', [$this, 'render_slideover_cart_drawer']);
        add_action('wp_footer', [$this, 'render_sticky_mobile_add_to_cart']);
        add_filter('woocommerce_add_to_cart_fragments', [$this, 'ajax_cart_fragments']);
    }

    /**
     * Render high-conversion Slide-over Cart Drawer
     */
    public function render_slideover_cart_drawer() {
        if (is_cart() || is_checkout()) {
            return;
        }
        ?>
        <div id="sr-cart-drawer" class="fixed inset-0 z-[1000] pointer-events-none transition-opacity duration-300 opacity-0" aria-hidden="true" dir="rtl">
            <!-- Backdrop -->
            <div id="sr-cart-backdrop" class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
            
            <!-- Drawer Panel -->
            <div id="sr-cart-panel" class="absolute inset-y-0 left-0 max-w-full w-96 bg-slate-900 border-r border-slate-800 shadow-2xl flex flex-col justify-between transform -translate-x-full transition-transform duration-300 ease-in-out pointer-events-auto">
                
                <!-- Drawer Header -->
                <div class="p-5 border-b border-slate-800 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                        <h3 class="font-bold text-white text-base">سبد خرید شما</h3>
                    </div>
                    <button id="sr-close-cart-btn" type="button" class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors" aria-label="بستن سبد خرید">
                        ✕
                    </button>
                </div>

                <!-- Free Shipping Indicator -->
                <div class="px-5 py-3 bg-blue-950/40 border-b border-blue-900/30 text-xs">
                    <div class="flex items-center justify-between text-blue-300 mb-1.5">
                        <span>ارسال رایگان به سراسر کشور</span>
                        <span class="font-bold">فعال</span>
                    </div>
                    <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div class="bg-blue-500 h-full w-full"></div>
                    </div>
                </div>

                <!-- Drawer Content -->
                <div class="flex-1 overflow-y-auto p-5 sr-cart-widget-content">
                    <?php woocommerce_mini_cart(); ?>
                </div>

                <!-- Drawer Footer -->
                <div class="p-5 border-t border-slate-800 bg-slate-950/80 space-y-3">
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-slate-400">جمع کل سبد:</span>
                        <span class="font-bold text-white text-base"><?php echo WC()->cart ? WC()->cart->get_cart_subtotal() : '۰ تومان'; ?></span>
                    </div>
                    <a href="<?php echo esc_url(wc_get_checkout_url()); ?>" class="block w-full text-center py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all">
                        تسویه‌حساب و پرداخت فوری ←
                    </a>
                </div>
            </div>
        </div>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            var drawer = document.getElementById('sr-cart-drawer');
            var panel = document.getElementById('sr-cart-panel');
            var closeBtn = document.getElementById('sr-close-cart-btn');
            var backdrop = document.getElementById('sr-cart-backdrop');

            function openCart() {
                drawer.classList.remove('opacity-0', 'pointer-events-none');
                panel.classList.remove('-translate-x-full');
            }
            function closeCart() {
                panel.classList.add('-translate-x-full');
                drawer.classList.add('opacity-0', 'pointer-events-none');
            }

            if (closeBtn) closeBtn.addEventListener('click', closeCart);
            if (backdrop) backdrop.addEventListener('click', closeCart);

            document.querySelectorAll('.sr-trigger-cart, a[href*="cart"]').forEach(function(el) {
                el.addEventListener('click', function(e) {
                    if (window.innerWidth >= 768) {
                        e.preventDefault();
                        openCart();
                    }
                });
            });
        });
        </script>
        <?php
    }

    /**
     * Render sticky mobile add-to-cart on single product page
     */
    public function render_sticky_mobile_add_to_cart() {
        if (!is_product()) {
            return;
        }

        global $product;
        if (!$product) {
            return;
        }
        ?>
        <div class="sr-sticky-cart-mobile md:hidden fixed bottom-16 inset-x-3 z-50 p-2.5 rounded-2xl bg-slate-900/95 border border-slate-700/80 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-3 text-xs" dir="rtl">
            <div class="flex items-center gap-2 overflow-hidden">
                <?php echo $product->get_image('thumbnail', ['class' => 'w-9 h-9 rounded-xl object-cover shrink-0']); ?>
                <div class="truncate">
                    <p class="font-bold text-white truncate"><?php echo esc_html($product->get_name()); ?></p>
                    <p class="text-blue-400 font-semibold"><?php echo $product->get_price_html(); ?></p>
                </div>
            </div>
            <a href="<?php echo esc_url($product->add_to_cart_url()); ?>" class="shrink-0 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md shadow-blue-500/20">
                خرید سریع
            </a>
        </div>
        <?php
    }

    /**
     * Update cart fragments on AJAX add to cart
     */
    public function ajax_cart_fragments($fragments) {
        ob_start();
        ?>
        <span class="sr-cart-count-badge">
            <?php echo WC()->cart ? WC()->cart->get_cart_contents_count() : 0; ?>
        </span>
        <?php
        $fragments['.sr-cart-count-badge'] = ob_get_clean();
        return $fragments;
    }
}
