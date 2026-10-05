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
            <?php
            $is_admin = current_user_can('manage_options');
            $active_panel = isset($_GET['panel']) ? sanitize_text_field($_GET['panel']) : 'lawyer';
            ?>

            <?php if ($is_admin) : ?>
                <!-- نوار راهبری و تفکیک نقش ویژه مدیر ارشد سایت -->
                <div class="mb-6 p-4 rounded-3xl bg-[#0B132B] border border-[#D4AF37]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                        <span class="w-10 h-10 rounded-2xl bg-[#D4AF37] text-[#0B132B] flex items-center justify-center font-black text-lg shrink-0 shadow-md">
                            🛡️
                        </span>
                        <div>
                            <div class="flex items-center gap-2">
                                <h2 class="text-sm font-bold text-white">
                                    پیشخوان راهبری مدیر کل سیستم (دسترسی همزمان ادمین و وکیل سرپرست)
                                </h2>
                                <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                                    جانشینی حقوقی فعال
                                </span>
                            </div>
                            <p class="text-xs text-gray-300 mt-0.5">
                                در صورت غیاب وکیل یا ارجاع پرونده‌ها به وکلای شریک و رسیدگی به امور موکلان، دسترسی کامل به میز کار وکیل در اختیار شماست.
                            </p>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 w-full md:w-auto">
                        <a 
                            href="<?php echo esc_url(add_query_arg('panel', 'lawyer')); ?>" 
                            class="flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-center <?php echo $active_panel === 'lawyer' ? 'bg-[#D4AF37] text-[#0B132B] shadow-md shadow-[#D4AF37]/30 font-black' : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/15'; ?>"
                        >
                            ⚖️ میز کار و داشبورد وکیل
                        </a>
                        <a 
                            href="<?php echo esc_url(add_query_arg('panel', 'admin')); ?>" 
                            class="flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-center <?php echo $active_panel === 'admin' ? 'bg-[#D4AF37] text-[#0B132B] shadow-md shadow-[#D4AF37]/30 font-black' : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/15'; ?>"
                        >
                            ⚙️ پرتال جامع ادمین سایت
                        </a>
                    </div>
                </div>
            <?php endif; ?>

            <!-- پیشخوان فعال فرانت‌اند با شورت‌کد React -->
            <div class="space-y-6">
                <!-- شورت‌کد سیستم اعلان‌های زنده مواعد دادگاه -->
                <?php echo do_shortcode('[sedrazavi_react_toast_notifier]'); ?>

                <?php if ($active_panel === 'admin' && $is_admin) : ?>
                    <!-- پرتال جامع ادمین سایت -->
                    <?php echo do_shortcode('[sedrazavi_react_admin_portal]'); ?>
                <?php else : ?>
                    <!-- فراخوانی داشبورد کامل وکیل شامل نمودار راداری و دانلود داده‌ها -->
                    <?php echo do_shortcode('[sedrazavi_react_dashboard is_admin_acting_as_lawyer="' . ($is_admin ? 'true' : 'false') . '"]'); ?>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
</main>

<?php
get_footer();
