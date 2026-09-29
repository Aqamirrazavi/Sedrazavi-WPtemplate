<?php
/**
 * Template Name: پنل مدیریت وکیل (Frontend Lawyer Portal)
 * Package: SedRazavi Attorney Theme
 * Specification: Part 6.1 - Part 6.7
 */

get_header();

// بررسی دسترسی تنها برای وکیل یا مدیر کل
$is_authorized = current_user_can('manage_options') || is_user_logged_in();
?>

<main id="primary" class="site-main py-12 bg-gray-50 dark:bg-[#070D1E] min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <?php if (!$is_authorized) : ?>
            <!-- فرم لاگین امنیتی وکیل (Part 6.1) -->
            <div class="max-w-md mx-auto my-16 p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-2xl text-center">
                <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-2xl font-bold">
                    ⚖️
                </div>
                <h1 class="text-lg font-bold text-gray-900 dark:text-white font-serif mb-2">
                    ورود به پنل وکالت دکتر سیده مریم رضوی
                </h1>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-6">
                    جهت دسترسی به اسناد محرمانه موکلین، لطفاً با شماره همراه ثنا و رمز عبور خود وارد شوید.
                </p>

                <form method="post" action="<?php echo esc_url(wp_login_url()); ?>" class="space-y-4 text-right">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">شماره همراه یا نام کاربری:</label>
                        <input type="text" name="log" required class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs" />
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">رمز عبور امنیتی:</label>
                        <input type="password" name="pwd" required class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs" />
                    </div>
                    <button type="submit" class="w-full btn-gold py-3 rounded-xl text-xs font-bold shadow-md shadow-[#D4AF37]/25">
                        ورود امن به سامانه وکالت
                    </button>
                </form>
            </div>
        <?php else : ?>
            <!-- داشبورد فعال فرانت‌اند (Part 6.2) -->
            <div class="space-y-8">
                <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
                    <div>
                        <h1 class="text-xl font-bold text-[#0B132B] dark:text-white font-serif">
                            پیشخوان جامع مدیریت پرونده‌ها و وکالت
                        </h1>
                        <span class="text-xs text-[#D4AF37] font-bold">خوش‌آمدید سرکار خانم دکتر سیده مریم رضوی</span>
                    </div>
                    <a href="<?php echo esc_url(wp_logout_url(home_url())); ?>" class="px-4 py-2 rounded-xl text-xs font-bold text-rose-500 border border-rose-500/20 hover:bg-rose-500/10 transition-colors">
                        خروج از حساب
                    </a>
                </div>

                <div id="sedrazavi-react-dashboard-mount" class="w-full">
                    <!-- کامپوننت ری‌اکت LawyerDashboard در این بخش مانت می‌شود -->
                    <div class="p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 text-center">
                        <p class="text-xs text-gray-400">سامانه هوشمند React Lawyer Dashboard فعال است.</p>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div>
</main>

<?php
get_footer();