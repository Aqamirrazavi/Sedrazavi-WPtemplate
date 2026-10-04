<?php
/**
 * Template Name: پنل مدیریت وکیل و ادمین (Lawyer & Admin Dashboard)
 * Package: SedRazavi Attorney Theme
 * Specification: Part 6.1 - Part 6.7
 */

get_header();

// بررسی وضعیت لاگین یا دسترسی کاربر
$is_authorized = is_user_logged_in() || current_user_can('edit_posts') || current_user_can('manage_options');
?>

<main id="primary" class="site-main py-10 bg-gray-50 dark:bg-[#070D1E] min-h-screen text-right" dir="rtl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <?php if (!$is_authorized) : ?>
            <!-- سیستم ورود هوشمند با رمز یکبار مصرف ایمیلی (Email OTP Magic Login) -->
            <div class="max-w-xl mx-auto my-8 space-y-6">
                <div class="text-center space-y-2">
                    <span class="px-3.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/40 inline-flex items-center gap-1.5">
                        ⚖️ درگاه امن ورود پیشخوان حقوقی
                    </span>
                    <h1 class="text-2xl sm:text-3xl font-black font-serif text-[#0B132B] dark:text-white">
                        ورود به پیشخوان مدیریت وکیل و امور دفتر
                    </h1>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        جهت دسترسی به پرونده‌ها، مراجعین و هشدارهای دادگاه، با ایمیل یا نام کاربری خود وارد شوید.
                    </p>
                </div>

                <!-- فراخوانی شورت‌کد ورود با رمز یکبار مصرف ایمیلی -->
                <div class="sedrazavi-otp-login-card">
                    <?php echo do_shortcode('[sedrazavi_react_email_otp]'); ?>
                </div>

                <!-- ورود سنتی با نام کاربری و پسورد برای سازگاری کامل با وردپرس -->
                <details class="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300">
                    <summary class="font-bold cursor-pointer text-[#D4AF37] hover:underline">
                        یا ورود با نام کاربری و کلمه عبور سنتی وردپرس
                    </summary>
                    <form method="post" action="<?php echo esc_url(wp_login_url()); ?>" class="space-y-3 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                        <div>
                            <label class="block font-bold mb-1">نام کاربری یا ایمیل:</label>
                            <input type="text" name="log" required class="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs" />
                        </div>
                        <div>
                            <label class="block font-bold mb-1">رمز عبور:</label>
                            <input type="password" name="pwd" required class="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs" />
                        </div>
                        <button type="submit" class="w-full py-2.5 rounded-xl bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] font-bold text-xs shadow-md">
                            ورود مستقیم به حساب
                        </button>
                    </form>
                </details>
            </div>
        <?php else : ?>
            <!-- پیشخوان فعال فرانت‌اند با شورت‌کد React -->
            <div class="space-y-6">
                <!-- شورت‌کد سیستم اعلان‌های زنده مواعد دادگاه -->
                <?php echo do_shortcode('[sedrazavi_react_toast_notifier]'); ?>

                <!-- فراخوانی داشبورد کامل وکیل شامل نمودار راداری و دانلود داده‌ها -->
                <?php echo do_shortcode('[sedrazavi_react_dashboard]'); ?>
            </div>
        <?php endif; ?>
    </div>
</main>

<?php
get_footer();
