<?php
/**
 * Template Name: ورود با رمز یکبار مصرف ایمیلی (Email OTP Login)
 * Description: Dedicated page template for Email OTP Magic Login (like MihanWordPress)
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<main class="py-16 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-sans" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-xl space-y-8">
        
        <!-- Header Section -->
        <div class="text-center space-y-3">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                ✉️ احراز هویت هوشمند بدون پسورد
            </span>
            <h1 class="text-3xl sm:text-4xl font-black font-serif text-[#0B132B] dark:text-white">
                ورود سریع با رمز یکبار مصرف ایمیلی
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                تنها با وارد کردن آدرس ایمیل خود، کد ۶ رقمی امن را دریافت نموده و بدون نیاز به حفظ کلمه عبور وارد کارتابل شوید.
            </p>
        </div>

        <!-- React Mount Point for EmailOtpAuthComponent -->
        <div class="sedrazavi-otp-login-card">
            <?php echo do_shortcode('[sedrazavi_react_email_otp]'); ?>
        </div>

        <!-- Security & Legal Notice -->
        <div class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-3">
            <span class="text-base">🛡️</span>
            <span>کدهای تایید موقت به مدت ۱۲۰ ثانیه معتبر بوده و از الگوریتم رمزنگاری یک‌طرفه محافظت می‌شوند.</span>
        </div>

        <!-- Alternative link to regular login -->
        <div class="text-center text-xs text-gray-500 dark:text-gray-400 pt-2">
            <a href="<?php echo esc_url(wp_login_url()); ?>" class="text-[#D4AF37] font-bold hover:underline">
                ورود با نام کاربری و رمز عبور سنتی وردپرس &larr;
            </a>
        </div>
    </div>
</main>

<?php
get_footer();
