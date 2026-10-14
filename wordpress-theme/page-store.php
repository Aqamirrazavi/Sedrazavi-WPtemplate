<?php
/**
 * Template Name: فروشگاه آنلاین منعطف ووکامرس (Flexible eCommerce Store)
 * Description: Dedicated Flexible Store showcase compatible with WooCommerce and WoodMart.
 *
 * @package SedRazavi
 * @version 3.1.0
 */

get_header();
?>

<div class="sedrazavi-store-wrapper" dir="rtl" style="background-color: var(--sr-bg-body, #070D1E); color: #F8FAFC; min-height: 100vh;">
    
    <!-- Hero Banner -->
    <section class="sedrazavi-store-hero" style="padding: 60px 16px 40px; text-align: center; background: radial-gradient(circle at top, rgba(16, 185, 129, 0.15) 0%, transparent 70%);">
        <div class="container" style="max-width: 1100px; margin: 0 auto;">
            <div style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 9999px; font-size: 13px; color: #34D399; font-weight: bold; margin-bottom: 20px;">
                <span>🛍️</span>
                <span><?php esc_html_e('سازگار با ووکامرس و قالب‌های فروشگاهی مدرن', 'sedrazavi'); ?></span>
            </div>
            
            <h1 style="font-size: clamp(26px, 4vw, 42px); font-weight: 900; line-height: 1.3; margin: 0 0 16px; color: #FFFFFF;">
                <?php esc_html_e('فروشگاه آنلاین منعطف، سریع و آماده فروش', 'sedrazavi'); ?>
            </h1>
            
            <p style="font-size: clamp(14px, 1.8vw, 17px); color: #94A3B8; max-width: 720px; margin: 0 auto 32px; line-height: 1.8;">
                <?php esc_html_e('سبد خرید سریع، اتصال درگاه‌های بانکی عضو شبکه شتاب، فیلتر ایجکس ویژگی‌ها و بهینه‌سازی شده برای بارگذاری لحظه‌ای.', 'sedrazavi'); ?>
            </p>

            <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
                <a href="#store-products" class="sedrazavi-btn-store-primary" style="display: inline-flex; align-items: center; gap: 8px; background: #10B981; color: #FFFFFF; padding: 14px 28px; border-radius: 14px; font-weight: 800; text-decoration: none;">
                    <span><?php esc_html_e('مشاهده محصولات ویژه', 'sedrazavi'); ?></span>
                    <span>↓</span>
                </a>
            </div>
        </div>
    </section>

    <!-- Trust Badges -->
    <section class="sedrazavi-store-features" style="background: rgba(15, 23, 42, 0.6); border-top: 1px solid rgba(255, 255, 255, 0.06); border-bottom: 1px solid rgba(255, 255, 255, 0.06); padding: 24px 16px;">
        <div class="container" style="max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; text-align: center;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
                <span style="font-size: 24px;">🚚</span>
                <div style="text-align: right;">
                    <div style="font-size: 14px; font-weight: bold; color: #FFFFFF;">ارسال سریع و مطمئن</div>
                    <div style="font-size: 12px; color: #94A3B8;">پست پیشتاز و تیپاکس</div>
                </div>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
                <span style="font-size: 24px;">🛡️</span>
                <div style="text-align: right;">
                    <div style="font-size: 14px; font-weight: bold; color: #FFFFFF;">ضمانت اصالت کالا</div>
                    <div style="font-size: 12px; color: #94A3B8;">۷ روز ضمانت بازگشت</div>
                </div>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
                <span style="font-size: 24px;">💳</span>
                <div style="text-align: right;">
                    <div style="font-size: 14px; font-weight: bold; color: #FFFFFF;">پرداخت امن شاپرک</div>
                    <div style="font-size: 12px; color: #94A3B8;">اتصال به تمامی بانک‌ها</div>
                </div>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
                <span style="font-size: 24px;">🎧</span>
                <div style="text-align: right;">
                    <div style="font-size: 14px; font-weight: bold; color: #FFFFFF;">پشتیبانی ۲۴ ساعته</div>
                    <div style="font-size: 12px; color: #94A3B8;">پاسخگویی آنلاین</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Products Loop / WooCommerce Output -->
    <section id="store-products" class="sedrazavi-store-catalog" style="padding: 60px 16px;">
        <div class="container" style="max-width: 1100px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="font-size: 26px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px;">
                    <?php esc_html_e('محصولات و دسته‌بندی‌های برگزیده', 'sedrazavi'); ?>
                </h2>
                <p style="color: #94A3B8; font-size: 14px;">
                    <?php esc_html_e('طراحی منعطف با امکان نمایش کاتالوگ، افزودن به سبد خرید سریع و تسویه‌حساب آسان', 'sedrazavi'); ?>
                </p>
            </div>

            <div class="sedrazavi-store-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">
                <?php
                if (class_exists('WooCommerce')) {
                    echo do_shortcode('[products limit="8" columns="4" orderby="popularity"]');
                } else {
                ?>
                    <!-- Native Fallback Showcase when WooCommerce is not yet active -->
                    <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 20px; text-align: center;">
                        <div style="height: 160px; background: rgba(15, 23, 42, 0.6); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 44px; margin-bottom: 16px;">
                            📱
                        </div>
                        <h3 style="font-size: 15px; font-weight: 800; color: #FFFFFF; margin: 0 0 8px;">بسته خدمات هوشمند آنلاین</h3>
                        <p style="font-size: 12px; color: #94A3B8; margin-bottom: 14px;">امکان فروش فایل و خدمات آنلاین با تحویل آنی</p>
                        <div style="font-size: 18px; font-weight: 900; color: #10B981; margin-bottom: 14px;">۴۵۰,۰۰۰ تومان</div>
                        <button type="button" class="sedrazavi-btn-store-cart" style="width: 100%; background: #10B981; color: #FFFFFF; border: none; padding: 10px; border-radius: 10px; font-weight: bold; cursor: pointer;">
                            افزودن به سبد خرید
                        </button>
                    </div>

                    <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 20px; text-align: center;">
                        <div style="height: 160px; background: rgba(15, 23, 42, 0.6); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 44px; margin-bottom: 16px;">
                            💻
                        </div>
                        <h3 style="font-size: 15px; font-weight: 800; color: #FFFFFF; margin: 0 0 8px;">لایسنس نرم‌افزار سازمانی</h3>
                        <p style="font-size: 12px; color: #94A3B8; margin-bottom: 14px;">پشتیبانی یکساله و به‌روزرسانی نامحدود</p>
                        <div style="font-size: 18px; font-weight: 900; color: #10B981; margin-bottom: 14px;">۱,۸۵۰,۰۰۰ تومان</div>
                        <button type="button" class="sedrazavi-btn-store-cart" style="width: 100%; background: #10B981; color: #FFFFFF; border: none; padding: 10px; border-radius: 10px; font-weight: bold; cursor: pointer;">
                            افزودن به سبد خرید
                        </button>
                    </div>

                    <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 20px; text-align: center;">
                        <div style="height: 160px; background: rgba(15, 23, 42, 0.6); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 44px; margin-bottom: 16px;">
                            📚
                        </div>
                        <h3 style="font-size: 15px; font-weight: 800; color: #FFFFFF; margin: 0 0 8px;">دوره جامع آموزشی دانلودی</h3>
                        <p style="font-size: 12px; color: #94A3B8; margin-bottom: 14px;">دسترسی مادام‌العمر به محتوای ویدئویی</p>
                        <div style="font-size: 18px; font-weight: 900; color: #10B981; margin-bottom: 14px;">۹۸۰,۰۰۰ تومان</div>
                        <button type="button" class="sedrazavi-btn-store-cart" style="width: 100%; background: #10B981; color: #FFFFFF; border: none; padding: 10px; border-radius: 10px; font-weight: bold; cursor: pointer;">
                            افزودن به سبد خرید
                        </button>
                    </div>
                <?php
                }
                ?>
            </div>
        </div>
    </section>

</div>

<?php
get_footer();
