<?php
/**
 * Template part for Store Modern E-Commerce Niche Front-Page
 *
 * @package SedRazavi
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
<div class="sr-store-frontpage space-y-16 py-8" dir="rtl">

    <!-- ۱. هیرو بنر فروشگاهی با پیشنهاد ویژه و تایمر (Store Hero Banner) -->
    <section class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-emerald-900/40 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/50 shadow-2xl flex flex-wrap items-center justify-between gap-8">
            <div class="max-w-xl space-y-4">
                <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    جشنواره تخفیف فصلی • تا ۴۵٪ تخفیف محصولات منتخب
                </span>
                <h1 class="text-3xl sm:text-5xl font-black text-white leading-tight">
                    فروشگاه مدرن آنلاین با <span class="text-emerald-400">تحویل فوری</span> و ضمانت اصالت
                </h1>
                <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    تجربه خریدی بی‌نظیر با سبد خرید شناور بدون رفرش، تسویه‌حساب مستقیم با کلیه کارت‌های عضو شبکه شتاب و پشتیبانی تلفنی و آنلاین ۲۴ ساعته.
                </p>
                <div class="pt-2 flex flex-wrap items-center gap-3">
                    <a href="#products-showcase" class="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all">
                        مشاهده ویترین محصولات ←
                    </a>
                    <button type="button" onclick="var d=document.getElementById('sr-slideover-cart-drawer'); if(d){d.style.display='block';}else{var fb=document.getElementById('sr-store-cart-status'); if(fb){fb.classList.remove('hidden'); fb.textContent='سبد خرید شناور برای فروشگاه‌های دارای افزونه ووکامرس فعال در دسترس است.';}}" class="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-semibold">
                        🛒 باز کردن سبد خرید شناور
                    </button>
                </div>
                <div id="sr-store-cart-status" role="status" aria-live="polite" class="hidden mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold"></div>
            </div>

            <!-- بج گرافیکی پیشنهاد شگفت‌انگیز -->
            <div class="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-2 shrink-0 w-full sm:w-auto">
                <span class="text-xs text-slate-400">فرصت باقیمانده تخفیف ویژه:</span>
                <div class="flex items-center justify-center gap-2 font-mono text-xl font-bold text-emerald-400" dir="ltr">
                    <span class="p-2 rounded-lg bg-slate-950 border border-slate-800">14</span>:
                    <span class="p-2 rounded-lg bg-slate-950 border border-slate-800">42</span>:
                    <span class="p-2 rounded-lg bg-slate-950 border border-slate-800">08</span>
                </div>
                <span class="text-[11px] text-slate-500">ساعت : دقیقه : ثانیه</span>
            </div>
        </div>
    </section>

    <!-- ۲. ویترین محصولات ووکامرس (WooCommerce Products Grid) -->
    <section class="container mx-auto px-4 sm:px-6 lg:px-8" id="products-showcase">
        <div class="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
            <div>
                <h2 class="text-xl sm:text-2xl font-bold text-white">جدیدترین محصولات و پیشنهادات برگزیده</h2>
                <p class="text-xs text-slate-400 mt-1">امکان خرید آنی و افزودن به سبد خرید شناور</p>
            </div>
            <a href="<?php echo esc_url(function_exists('wc_get_page_permalink') ? wc_get_page_permalink('shop') : '#shop'); ?>" class="text-xs font-bold text-emerald-400 hover:underline">
                مشاهده همه محصولات ←
            </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <?php
            $wc_products = [];
            if (function_exists('wc_get_products')) {
                $wc_products = wc_get_products([
                    'limit'  => 4,
                    'status' => 'publish',
                ]);
            }

            if (!empty($wc_products)) :
                foreach ($wc_products as $product) :
                    ?>
                    <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3 flex flex-col justify-between">
                        <div class="aspect-square rounded-xl bg-slate-950 overflow-hidden flex items-center justify-center relative">
                            <?php if ($product->get_image_id()) : ?>
                                <?php echo $product->get_image('medium', ['class' => 'object-cover w-full h-full']); ?>
                            <?php else : ?>
                                <span class="text-3xl text-slate-600">📦</span>
                            <?php endif; ?>
                            <?php if ($product->is_on_sale()) : ?>
                                <span class="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-bold">حراج</span>
                            <?php endif; ?>
                        </div>

                        <div>
                            <h3 class="text-sm font-bold text-white line-clamp-1"><?php echo esc_html($product->get_name()); ?></h3>
                            <div class="text-xs font-bold text-emerald-400 mt-2">
                                <?php echo $product->get_price_html(); ?>
                            </div>
                        </div>

                        <?php
                        $supports_ajax = method_exists($product, 'supports') && $product->supports('ajax_add_to_cart');
                        $btn_classes   = 'w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center transition-all button';
                        if ($supports_ajax && $product->is_purchasable() && $product->is_in_stock()) {
                            $btn_classes .= ' add_to_cart_button ajax_add_to_cart';
                        }
                        ?>
                        <a href="<?php echo esc_url($product->add_to_cart_url()); ?>" data-quantity="1" data-product_id="<?php echo esc_attr($product->get_id()); ?>" data-product_sku="<?php echo esc_attr($product->get_sku()); ?>" rel="nofollow" class="<?php echo esc_attr($btn_classes); ?>">
                            <?php echo esc_html($product->add_to_cart_text()); ?>
                        </a>
                    </div>
                    <?php
                endforeach;
            else :
                $wc_active = class_exists('WooCommerce');
                $empty_msg = $wc_active
                    ? 'هنوز محصولی در فروشگاه ووکامرس منتشر نشده است.'
                    : 'برای فعال‌سازی سبد خرید واقعی و فروش محصولات، افزونه WooCommerce را نصب و پیکربندی نمایید.';
                $cta_url = current_user_can('manage_options')
                    ? admin_url($wc_active ? 'post-new.php?post_type=product' : 'plugin-install.php?s=woocommerce&tab=search&type=term')
                    : home_url('/#contact');
                $cta_lbl = current_user_can('manage_options')
                    ? ($wc_active ? '+ افزودن اولین محصول در ووکامرس' : 'نصب یا پیکربندی ووکامرس از پیشخوان')
                    : 'درخواست اطلاعات یا سفارش';
                ?>
                <div class="sm:col-span-2 lg:col-span-4 p-8 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-4">
                    <div class="text-3xl">🛒</div>
                    <h3 class="text-base font-bold text-white"><?php echo esc_html($wc_active ? 'ویترین محصولات ووکامرس آماده است' : 'افزونه فروشگاه ووکامرس غیرفعال است'); ?></h3>
                    <p class="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed"><?php echo esc_html($empty_msg); ?></p>
                    <a href="<?php echo esc_url($cta_url); ?>" class="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all">
                        <?php echo esc_html($cta_lbl); ?>
                    </a>
                </div>
                <?php
            endif;
            ?>
        </div>
    </section>

    <!-- ۳. بج‌های اعتماد و ارزش‌های خرید (Trust Badges) -->
    <section class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <div class="space-y-1">
                <div class="text-xl">🛡️</div>
                <div class="text-xs font-bold text-white">ضمانت اصالت و سلامت</div>
                <div class="text-[11px] text-slate-400">تضمین ۱۰۰٪ کیفیت کالا</div>
            </div>
            <div class="space-y-1">
                <div class="text-xl">⚡</div>
                <div class="text-xs font-bold text-white">تحویل آنی و اکسپرس</div>
                <div class="text-[11px] text-slate-400">ارسال در کوتاه‌ترین زمان</div>
            </div>
            <div class="space-y-1">
                <div class="text-xl">💳</div>
                <div class="text-xs font-bold text-white">درگاه پرداخت امن شتاب</div>
                <div class="text-[11px] text-slate-400">زرین‌پال، آیدی‌پی، نکست‌پِی</div>
            </div>
            <div class="space-y-1">
                <div class="text-xl">🎧</div>
                <div class="text-xs font-bold text-white">پشتیبانی همیشگی ۲۴/۷</div>
                <div class="text-[11px] text-slate-400">پاسخگویی سریع و حرفه‌ای</div>
            </div>
        </div>
    </section>

</div>
