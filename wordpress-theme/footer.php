<?php
/**
 * The template for displaying the footer
 * 100% Complete matching Footer.tsx
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
</main><!-- #main-content -->

<?php
// Elementor Theme Builder Footer Location support
if ( function_exists('elementor_theme_do_location') && elementor_theme_do_location('footer') ) {
    wp_footer();
    echo '</body></html>';
    return;
}
?>

<footer id="colophon" class="site-footer bg-sr-bg text-sr-primary pt-16 pb-8 border-t border-sr-border relative overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-sr-border-subtle">
            
            <!-- ستون ۱: برندینگ، پروانه و توصیف -->
            <div class="space-y-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-white shadow-md shadow-[#D4AF37]/20">
                        <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                            <path d="M7 21h10"/>
                            <path d="M12 3v18"/>
                        </svg>
                    </div>
                    <div>
                        <span class="text-lg font-bold font-serif text-sr-primary">دفتر وکالت و داوری SedRazavi</span>
                        <p class="text-[10px] text-sr-gold">پوسته رسمی کانون وکلای مرکز</p>
                    </div>
                </div>

                <p class="text-sr-muted text-xs leading-relaxed">
                    دفتر وکالت و داوری حقوقی دکتر سیده مریم رضوی (SedRazavi)؛ پاسدار حقوق فردی و شرکتی با بیش از دو دهه تجربه درخشان در محاکم قضایی و مراجع داوری بین‌المللی.
                </p>

                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sr-surface border border-sr-border-subtle text-xs text-sr-gold">
                    <svg class="w-3.5 h-3.5 text-sr-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span>پروانه رسمی کانون وکلای دادگستری مرکز</span>
                </div>
            </div>

            <!-- ستون ۲: دسترسی سریع به خدمات -->
            <div>
                <h4 class="text-base font-bold text-sr-primary mb-4 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
                    دسترسی سریع به خدمات
                </h4>
                <ul class="space-y-2.5 text-xs text-sr-muted">
                    <li><a href="<?php echo esc_url(home_url('/#services')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> دعاوی تجاری و شرکت‌ها</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#services')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> دعاوی ملکی، اراضی و سرقفلی</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#services')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> جرایم اقتصادی و دادگاه انقلاب</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#services')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> حقوق خانواده، مهریه و تقسیم ارث</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#services')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> داوری بین‌المللی و بازرگانی (ICC)</a></li>
                </ul>
            </div>

            <!-- ستون ۳: پیوندهای مفید سامانه -->
            <div>
                <h4 class="text-base font-bold text-sr-primary mb-4 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
                    پیوندهای مفید سامانه
                </h4>
                <ul class="space-y-2.5 text-xs text-sr-muted">
                    <li><a href="<?php echo esc_url(home_url('/#tracking')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5 text-sr-gold font-bold">
                        <svg class="w-3.5 h-3.5 text-sr-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <span>پیگیری لحظه‌ای پرونده موکلین</span>
                    </a></li>
                    <li><a href="<?php echo esc_url(home_url('/#booking')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> رزرو آنلاین نوبت مشاوره</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#about')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> درباره وکیل و منشور اخلاق</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#articles')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> یادداشت‌ها و مقالات حقوقی</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#faq')); ?>" class="hover:text-sr-gold transition-colors flex items-center gap-1.5"><span class="text-sr-gold">‹</span> پرسش‌های متداول موکلین</a></li>
                </ul>
            </div>

            <!-- ستون ۴: ارتباط و خبرنامه -->
            <div class="space-y-4">
                <h4 class="text-base font-bold text-sr-primary mb-4 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
                    ارتباط و خبرنامه تخصصی
                </h4>
                <p class="text-xs text-sr-muted leading-relaxed">
                    جهت دریافت مهم‌ترین تحولات حقوقی و رویه‌های جدید قضایی، ایمیل خود را ثبت نمایید:
                </p>
                <form onsubmit="handleNewsletter(event)" class="flex gap-2">
                    <input type="email" required placeholder="آدرس ایمیل..." class="flex-1 px-3 py-2 rounded-xl bg-sr-surface border border-sr-border text-sr-primary text-xs focus:border-[#D4AF37] focus:outline-none" />
                    <button type="submit" class="btn-gold text-xs px-4 py-2 rounded-xl font-bold cursor-pointer">ثبت</button>
                </form>
                <div class="text-xs text-sr-muted space-y-1.5 pt-2">
                    <p class="flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5 text-sr-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>تلفن: ۰۲۱-۸۸۹۹۰۰۱۱</span>
                    </p>
                    <p class="flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5 text-sr-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>نشانی: تهران، ونک، ملاصدرا، پلاک ۱۱۸</span>
                    </p>
                </div>
            </div>

        </div>

        <!-- اطلاعات طراح و حق چاپ طبق بخش ۷ و پارت ۹ -->
        <div class="pt-8 pb-3 border-t border-sr-border-subtle flex flex-col sm:flex-row items-center justify-between text-xs text-sr-muted gap-3">
            <p>طراحی و توسعه توسط <a href="https://t.me/sedrazavi" target="_blank" rel="noopener" class="text-sr-gold font-bold hover:underline">سید امیر حسین رضوی فردویی</a></p>
            <div class="flex items-center gap-4 text-xs">
                <a href="https://t.me/sedrazavi" target="_blank" rel="noopener" class="text-sr-muted hover:text-sr-gold transition-colors">تلگرام: @sedrazavi</a>
                <span class="text-sr-border-subtle">|</span>
                <a href="https://eitaa.com/sedrazavi" target="_blank" rel="noopener" class="text-sr-muted hover:text-sr-gold transition-colors">ایتا: @sedrazavi</a>
            </div>
        </div>
        <div class="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-sr-muted gap-4">
            <p>© <?php echo date('Y'); ?> تمامی حقوق مادی و معنوی متعلق به دفتر وکالت و داوری SedRazavi می‌باشد.</p>
            <p><a href="<?php echo esc_url(home_url('/privacy-policy')); ?>" class="hover:text-sr-primary">قوانین و حریم خصوصی</a></p>
        </div>
    </div>
</footer>


<!-- نوار پیشرفت طلایی بالای صفحه وردپرس -->
<div id="sedrazavi-gold-progress-top">
    <div id="sedrazavi-gold-progress-fill"></div>
</div>

<!-- سایدبار شناور طلایی اسکرول و ناوبری -->
<aside class="sedrazavi-floating-gold-sidebar" aria-label="<?php esc_attr_e('ناوبری و اسکرول سریع', 'sedrazavi'); ?>">
    <div class="gold-sidebar-inner">
        <div class="gold-scroll-badge" onclick="window.scrollTo({top:0, behavior:'smooth'})" title="<?php esc_attr_e('درصد اسکرول - کلیک برای بازگشت به بالا', 'sedrazavi'); ?>">
            <span class="gold-percent-num" id="sedrazavi-percent-display">0%</span>
        </div>
        <div class="gold-scroll-v-track">
            <div class="gold-scroll-v-fill" id="sedrazavi-v-fill"></div>
        </div>
        <button type="button" class="gold-btn-top" onclick="window.scrollTo({top:0, behavior:'smooth'})" title="<?php esc_attr_e('بازگشت به بالای صفحه', 'sedrazavi'); ?>">
            ▲
        </button>
    </div>
</aside>

<?php wp_footer(); ?>
</body>
</html>
