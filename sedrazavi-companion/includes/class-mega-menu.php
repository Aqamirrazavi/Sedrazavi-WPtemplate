<?php
/**
 * SedRazavi OS - Floating Island Navigation & Native Mega Menu Engine
 * Location: sedrazavi-companion/includes/class-mega-menu.php
 *
 * @package SedRazavi_Companion
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Mega_Menu_Engine {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        add_action('wp_footer', [$this, 'render_mobile_bottom_app_bar']);
        add_filter('wp_nav_menu_args', [$this, 'inject_custom_walker']);
    }

    /**
     * Inject custom walker if menu supports mega menu
     */
    public function inject_custom_walker($args) {
        if (isset($args['theme_location']) && $args['theme_location'] === 'primary') {
            if (!isset($args['walker']) || empty($args['walker'])) {
                $args['walker'] = new SedRazavi_Mega_Menu_Walker();
            }
        }
        return $args;
    }

    /**
     * Render high-converting Mobile Bottom App Bar for screens < 768px
     */
    public function render_mobile_bottom_app_bar() {
        if (is_admin()) {
            return;
        }

        $phone = get_theme_mod('sedrazavi_header_phone', '۰۲۱-۱۲۳۴۵۶۷۸');
        $clean_phone = preg_replace('/[^0-9+]/', '', $phone);
        $portal_url = home_url('/#portal');
        $cart_count = (function_exists('WC') && WC()->cart) ? WC()->cart->get_cart_contents_count() : 0;
        ?>
        <!-- نوار ناوبری پایینی موبایل (Native Mobile Floating App-Bar) -->
        <nav class="sr-mobile-appbar md:hidden fixed bottom-3 inset-x-4 z-[999] h-14 rounded-2xl bg-slate-900/90 border border-slate-700/60 backdrop-blur-xl shadow-2xl flex items-center justify-around px-2 text-[11px] font-medium text-slate-300" aria-label="<?php esc_attr_e('منوی دسترسی سریع موبایل', 'sedrazavi-companion'); ?>">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="flex flex-col items-center gap-0.5 hover:text-blue-400 transition-colors">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                <span>خانه</span>
            </a>
            
            <a href="<?php echo esc_url(home_url('/#services')); ?>" class="flex flex-col items-center gap-0.5 hover:text-blue-400 transition-colors">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                <span>خدمات</span>
            </a>

            <?php if (class_exists('WooCommerce')): ?>
            <a href="<?php echo esc_url(wc_get_cart_url()); ?>" class="relative flex flex-col items-center gap-0.5 hover:text-blue-400 transition-colors">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                <span>سبد خرید</span>
                <?php if ($cart_count > 0): ?>
                    <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                        <?php echo esc_html($cart_count); ?>
                    </span>
                <?php endif; ?>
            </a>
            <?php endif; ?>

            <a href="<?php echo esc_url($portal_url); ?>" class="flex flex-col items-center gap-0.5 hover:text-blue-400 transition-colors">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>حساب من</span>
            </a>

            <?php if (!empty($clean_phone)): ?>
            <a href="tel:<?php echo esc_attr($clean_phone); ?>" class="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-md shadow-blue-500/20">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>تماس فوری</span>
            </a>
            <?php endif; ?>
        </nav>
        <?php
    }
}

/**
 * Custom WordPress Nav Menu Walker with Mega Menu support
 */
class SedRazavi_Mega_Menu_Walker extends Walker_Nav_Menu {
    public function start_lvl(&$output, $depth = 0, $args = null) {
        $indent = str_repeat("\t", $depth);
        if ($depth === 0) {
            $output .= "\n{$indent}<ul class=\"sub-menu mega-menu-dropdown absolute top-full right-0 mt-2 min-w-[240px] bg-slate-900/95 border border-slate-700/80 rounded-2xl p-3 shadow-2xl backdrop-blur-xl z-50 flex flex-col gap-1\">\n";
        } else {
            $output .= "\n{$indent}<ul class=\"sub-menu\">\n";
        }
    }
}
