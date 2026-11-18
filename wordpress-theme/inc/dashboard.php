<?php
/**
 * SedRazavi Lawyer Dashboard in WordPress Admin
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_add_admin_dashboard_menu')) {
    function sedrazavi_add_admin_dashboard_menu() {
        add_menu_page(
            esc_html__('میز کار وکیل سید رضوی', 'sedrazavi'),
            esc_html__('میز کار وکیل', 'sedrazavi'),
            'manage_options',
            'sedrazavi-lawyer-dashboard',
            'sedrazavi_render_admin_dashboard',
            'dashicons-businessman',
            2
        );

        add_submenu_page(
            'sedrazavi-lawyer-dashboard',
            esc_html__('میز کار و پیشخوان اصلی', 'sedrazavi'),
            esc_html__('پیشخوان اصلی', 'sedrazavi'),
            'manage_options',
            'sedrazavi-lawyer-dashboard',
            'sedrazavi_render_admin_dashboard'
        );

        add_submenu_page(
            'sedrazavi-lawyer-dashboard',
            esc_html__('تور راهنمای سریع مدیر', 'sedrazavi'),
            esc_html__('🎓 تور راهنما (آموزش)', 'sedrazavi'),
            'manage_options',
            'sedrazavi-admin-tour-page',
            'sedrazavi_render_admin_tour_page'
        );
    }
    add_action('admin_menu', 'sedrazavi_add_admin_dashboard_menu');
}

if (!function_exists('sedrazavi_render_admin_dashboard')) {
    function sedrazavi_render_admin_dashboard() {
        $office_phone = get_option('sedrazavi_office_phone', '');
        $office_email = get_option('sedrazavi_office_email', '');

        $active_cases_count = class_exists('SedRazavi_Case_Data_Service')
            ? SedRazavi_Case_Data_Service::count_active_cases()
            : 0;
        if ($active_cases_count === 0 && post_type_exists('sedrazavi_dashboard')) {
            $dash_counts = wp_count_posts('sedrazavi_dashboard');
            $active_cases_count = (int) ($dash_counts->publish ?? 0) + (int) ($dash_counts->private ?? 0);
        }

        $case_post_types = class_exists('SedRazavi_Case_Data_Service')
            ? SedRazavi_Case_Data_Service::get_case_post_types()
            : ['sedrazavi_case', 'case', 'arbitration_case', 'sedrazavi_dashboard'];

        $sessions_query = new WP_Query([
            'post_type'      => $case_post_types,
            'post_status'    => ['private', 'publish'],
            'posts_per_page' => 1,
            'fields'         => 'ids',
            'meta_query'     => [
                [
                    'key'     => '_sedrazavi_next_session',
                    'value'   => '',
                    'compare' => '!=',
                ],
            ],
        ]);
        $court_sessions_count = (int) $sessions_query->found_posts;

        $deadlines_query = new WP_Query([
            'post_type'      => $case_post_types,
            'post_status'    => ['private', 'publish'],
            'posts_per_page' => 1,
            'fields'         => 'ids',
            'meta_query'     => [
                [
                    'key'     => '_sedrazavi_deadlines',
                    'value'   => '',
                    'compare' => '!=',
                ],
            ],
        ]);
        $upcoming_deadlines_count = (int) $deadlines_query->found_posts;

        $recent_appointments = [];
        $appt_posts = get_posts([
            'post_type'      => ['sedrazavi_appointment', 'sedrazavi_booking'],
            'numberposts'    => 10,
            'post_status'    => 'any',
            'orderby'        => 'date',
            'order'          => 'DESC',
        ]);
        foreach ($appt_posts as $ap) {
            $recent_appointments[] = [
                'name'   => get_post_meta($ap->ID, '_client_name', true) ?: $ap->post_title,
                'topic'  => get_post_meta($ap->ID, '_service_type', true) ?: __('مشاوره حقوقی', 'sedrazavi'),
                'phone'  => get_post_meta($ap->ID, '_client_phone', true) ?: '',
                'time'   => get_post_meta($ap->ID, '_booking_date', true) ?: get_the_date('Y-m-d H:i', $ap->ID),
                'status' => get_post_meta($ap->ID, '_booking_status', true) ?: 'scheduled',
            ];
        }
        $opt_appointments = get_option('sedrazavi_legal_appointments_records', []);
        if (is_array($opt_appointments)) {
            foreach (array_reverse($opt_appointments) as $rec) {
                if (!is_array($rec)) {
                    continue;
                }
                $recent_appointments[] = [
                    'name'   => $rec['client_name'] ?? '—',
                    'topic'  => $rec['meeting_type'] ?? __('مشاوره حقوقی', 'sedrazavi'),
                    'phone'  => $rec['phone'] ?? '',
                    'time'   => $rec['slot_id'] ?? ($rec['created_at'] ?? '—'),
                    'status' => $rec['status'] ?? 'scheduled',
                ];
            }
        }
        $appointments_count = count($recent_appointments);
        ?>
        <div class="wrap sedrazavi-admin-wrap" style="direction: rtl; text-align: right; font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Tahoma, sans-serif; max-width: 1200px; margin: 20px auto 40px auto;">
            
            <!-- Hero Welcome Header with Tour Trigger -->
            <div style="background: linear-gradient(135deg, #0B132B 0%, #1C2541 100%); color: #fff; padding: 28px 32px; border-radius: 16px; margin-bottom: 25px; border-right: 6px solid #D4AF37; box-shadow: 0 10px 25px rgba(11, 19, 43, 0.15); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                <div>
                    <h1 style="color: #fff; margin: 0 0 8px 0; font-size: 24px; font-weight: 800; display: flex; align-items: center; gap: 10px;">
                        ⚖️ <?php esc_html_e('میز کار و مدیریت دفتر وکالت دکتر سید رضوی', 'sedrazavi'); ?>
                    </h1>
                    <p style="margin: 0; color: #CBD5E1; font-size: 14px;">
                        <?php esc_html_e('مرکز مدیریت یکپارچه تماس‌ها، خدمات حقوقی، رزرو موکلین و تنظیمات بدون نیاز به دانش برنامه‌نویسی.', 'sedrazavi'); ?>
                    </p>
                </div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button type="button" id="sedrazavi-start-tour-btn" class="button" style="background: #D4AF37; color: #0B132B; border: none; font-weight: bold; padding: 8px 20px; font-size: 14px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(212, 175, 55, 0.35);">
                        <span>🎓</span> <?php esc_html_e('شروع تور راهنمای سریع (آموزش تصویری)', 'sedrazavi'); ?>
                    </button>
                    <a href="<?php echo esc_url(home_url('/')); ?>" target="_blank" class="button" style="background: rgba(255,255,255,0.12); color: #fff; border: 1px solid rgba(255,255,255,0.25); font-weight: bold; padding: 8px 18px; font-size: 14px; border-radius: 8px;">
                        <span>🌐</span> <?php esc_html_e('مشاهده وب‌سایت', 'sedrazavi'); ?>
                    </a>
                </div>
            </div>

            <!-- 4 Essential Quick Action Cards for Non-Technical Managers -->
            <h2 style="font-size: 18px; font-weight: bold; color: #0B132B; margin-bottom: 15px;">
                ⚡ <?php esc_html_e('عملیات پرکاربرد مدیر سایت (راهنمای سریع ۴ مرحله‌ای)', 'sedrazavi'); ?>
            </h2>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; margin-bottom: 30px;">
                
                <!-- Action 1: Change Contact Info -->
                <div id="tour-step-contact" style="background: #fff; padding: 22px; border-radius: 14px; border-top: 4px solid #D4AF37; box-shadow: 0 4px 15px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s ease;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <span style="font-size: 26px; background: #FFFDF0; padding: 8px; border-radius: 10px; border: 1px solid #FDE68A;">📞</span>
                            <div>
                                <h3 style="margin: 0; font-size: 16px; color: #0B132B; font-weight: bold;"><?php esc_html_e('تغییر شماره تماس و آدرس', 'sedrazavi'); ?></h3>
                                <span style="font-size: 11px; color: #10B981; font-weight: 600;"><?php esc_html_e('شماره فعال فعلی:', 'sedrazavi'); ?> <?php echo esc_html($office_phone); ?></span>
                            </div>
                        </div>
                        <p style="color: #64748B; font-size: 13px; line-height: 1.6; margin: 0 0 16px 0;">
                            <?php esc_html_e('شماره تلفن مستقیم، آدرس دفتر و ساعات پذیرش را با یک کلیک بدون نیاز به کدنویسی تغییر دهید.', 'sedrazavi'); ?>
                        </p>
                    </div>
                    <a href="<?php echo esc_url(admin_url('admin.php?page=sedrazavi-theme-options')); ?>" class="button button-primary" style="background: #0B132B; border-color: #D4AF37; color: #F8FAFC; text-align: center; border-radius: 8px; font-weight: bold; padding: 6px 12px;">
                        <?php esc_html_e('ویرایش شماره و آدرس دفتر ←', 'sedrazavi'); ?>
                    </a>
                </div>

                <!-- Action 2: Add New Legal Service -->
                <div id="tour-step-service" style="background: #fff; padding: 22px; border-radius: 14px; border-top: 4px solid #2A9D8F; box-shadow: 0 4px 15px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <span style="font-size: 26px; background: #F0FDF4; padding: 8px; border-radius: 10px; border: 1px solid #BBF7D0;">⚖️</span>
                            <div>
                                <h3 style="margin: 0; font-size: 16px; color: #0B132B; font-weight: bold;"><?php esc_html_e('افزودن خدمت حقوقی جدید', 'sedrazavi'); ?></h3>
                                <span style="font-size: 11px; color: #64748B;"><?php esc_html_e('معرفی تخصص جدید دفتر', 'sedrazavi'); ?></span>
                            </div>
                        </div>
                        <p style="color: #64748B; font-size: 13px; line-height: 1.6; margin: 0 0 16px 0;">
                            <?php esc_html_e('یک تخصص جدید مانند دعاوی ملکی، مالیاتی یا داوری تجاری را به همراه شرح تعرفه به سایت اضافه کنید.', 'sedrazavi'); ?>
                        </p>
                    </div>
                    <a href="<?php echo esc_url(admin_url('post-new.php?post_type=sedrazavi_dashboard')); ?>" class="button button-primary" style="background: #2A9D8F; border-color: #2A9D8F; color: #fff; text-align: center; border-radius: 8px; font-weight: bold; padding: 6px 12px;">
                        <?php esc_html_e('ثبت خدمت یا تخصص جدید ←', 'sedrazavi'); ?>
                    </a>
                </div>

                <!-- Action 3: View Bookings & Appointments -->
                <div id="tour-step-bookings" style="background: #fff; padding: 22px; border-radius: 14px; border-top: 4px solid #3B82F6; box-shadow: 0 4px 15px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <span style="font-size: 26px; background: #EFF6FF; padding: 8px; border-radius: 10px; border: 1px solid #BFDBFE;">📅</span>
                            <div>
                                <h3 style="margin: 0; font-size: 16px; color: #0B132B; font-weight: bold;"><?php esc_html_e('دیدن نوبت‌های رزروشده', 'sedrazavi'); ?></h3>
                                <span style="font-size: 11px; color: #3B82F6; font-weight: 600;"><?php esc_html_e('سامانه رزرواسیون آنلاین', 'sedrazavi'); ?></span>
                            </div>
                        </div>
                        <p style="color: #64748B; font-size: 13px; line-height: 1.6; margin: 0 0 16px 0;">
                            <?php esc_html_e('لیست موکلینی که نوبت مشاوره حضوری یا آنلاین ثبت کرده‌اند را ببینید و تماس اولیه بگیرید.', 'sedrazavi'); ?>
                        </p>
                    </div>
                    <a href="<?php echo esc_url(admin_url('edit.php?post_type=sedrazavi_dashboard&page=sedrazavi-bookings')); ?>" class="button button-primary" style="background: #1D4ED8; border-color: #1D4ED8; color: #fff; text-align: center; border-radius: 8px; font-weight: bold; padding: 6px 12px;">
                        <?php esc_html_e('مشاهده لیست نوبت‌های موکلین ←', 'sedrazavi'); ?>
                    </a>
                </div>

                <!-- Action 4: Manage Court Cases & Dossiers -->
                <div id="tour-step-cases" style="background: #fff; padding: 22px; border-radius: 14px; border-top: 4px solid #8B0000; box-shadow: 0 4px 15px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <span style="font-size: 26px; background: #FEF2F2; padding: 8px; border-radius: 10px; border: 1px solid #FECACA;">📁</span>
                            <div>
                                <h3 style="margin: 0; font-size: 16px; color: #0B132B; font-weight: bold;"><?php esc_html_e('مدیریت پرونده‌ها و دادرسی', 'sedrazavi'); ?></h3>
                                <span style="font-size: 11px; color: #DC2626; font-weight: 600;"><?php esc_html_e('کارتابل دادرسی و ثنا', 'sedrazavi'); ?></span>
                            </div>
                        </div>
                        <p style="color: #64748B; font-size: 13px; line-height: 1.6; margin: 0 0 16px 0;">
                            <?php esc_html_e('شماره بایگانی شعبه، نام موکل، شناسه مالیاتی سامانه مودیان و مواعد تجدیدنظر را ویرایش کنید.', 'sedrazavi'); ?>
                        </p>
                    </div>
                    <a href="<?php echo esc_url(admin_url('edit.php?post_type=sedrazavi_dashboard')); ?>" class="button" style="background: #8B0000; border-color: #8B0000; color: #fff; text-align: center; border-radius: 8px; font-weight: bold; padding: 6px 12px;">
                        <?php esc_html_e('مدیریت پرونده‌های فعال ←', 'sedrazavi'); ?>
                    </a>
                </div>

            </div>

            <!-- Stats Overview Grid -->
            <div id="tour-step-stats" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 30px;">
                <div style="background: #fff; padding: 18px 22px; border-radius: 12px; border-right: 5px solid #D4AF37; box-shadow: 0 3px 10px rgba(0,0,0,0.04);">
                    <h3 style="margin:0; color:#64748B; font-size:13px; font-weight:600;"><?php esc_html_e('کل پرونده‌های ثبت‌شده', 'sedrazavi'); ?></h3>
                    <p style="font-size: 26px; font-weight: 800; margin: 8px 0 0 0; color: #0B132B;"><?php echo esc_html(number_format_i18n($active_cases_count)); ?> <?php esc_html_e('پرونده', 'sedrazavi'); ?></p>
                </div>
                <div style="background: #fff; padding: 18px 22px; border-radius: 12px; border-right: 5px solid #2A9D8F; box-shadow: 0 3px 10px rgba(0,0,0,0.04);">
                    <h3 style="margin:0; color:#64748B; font-size:13px; font-weight:600;"><?php esc_html_e('جلسات دادگاه ثبت‌شده', 'sedrazavi'); ?></h3>
                    <p style="font-size: 26px; font-weight: 800; margin: 8px 0 0 0; color: #2A9D8F;"><?php echo esc_html(number_format_i18n($court_sessions_count)); ?> <?php esc_html_e('جلسه دادگاه', 'sedrazavi'); ?></p>
                </div>
                <div style="background: #fff; padding: 18px 22px; border-radius: 12px; border-right: 5px solid #E11D48; box-shadow: 0 3px 10px rgba(0,0,0,0.04);">
                    <h3 style="margin:0; color:#64748B; font-size:13px; font-weight:600;"><?php esc_html_e('مهلت‌های قانونی ثبت‌شده', 'sedrazavi'); ?></h3>
                    <p style="font-size: 26px; font-weight: 800; margin: 8px 0 0 0; color: #E11D48;"><?php echo esc_html(number_format_i18n($upcoming_deadlines_count)); ?> <?php esc_html_e('پرونده دارای موعد', 'sedrazavi'); ?></p>
                </div>
                <div style="background: #fff; padding: 18px 22px; border-radius: 12px; border-right: 5px solid #1C2541; box-shadow: 0 3px 10px rgba(0,0,0,0.04);">
                    <h3 style="margin:0; color:#64748B; font-size:13px; font-weight:600;"><?php esc_html_e('نوبت‌های مشاوره ثبت‌شده', 'sedrazavi'); ?></h3>
                    <p style="font-size: 26px; font-weight: 800; margin: 8px 0 0 0; color: #1C2541;"><?php echo esc_html(number_format_i18n($appointments_count)); ?> <?php esc_html_e('نوبت آنلاین/حضوری', 'sedrazavi'); ?></p>
                </div>
            </div>

            <!-- Recent Appointments Table -->
            <div style="background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 25px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E2E8F0; padding-bottom: 14px; margin-bottom: 16px;">
                    <h3 style="margin: 0; font-size: 16px; font-weight: bold; color: #0B132B;">
                        📋 <?php esc_html_e('آخرین درخواست‌های نوبت و مشاوره موکلین', 'sedrazavi'); ?>
                    </h3>
                    <span style="font-size: 12px; background: #ECFDF5; color: #047857; padding: 4px 10px; border-radius: 20px; font-weight: 600;">
                        <?php esc_html_e('اتصال مستقیم به پایگاه داده رزرو نوبت', 'sedrazavi'); ?>
                    </span>
                </div>

                <table class="widefat fixed striped" style="border: none; box-shadow: none;">
                    <thead>
                        <tr>
                            <th style="font-weight: bold; padding: 10px;"><?php esc_html_e('نام موکل', 'sedrazavi'); ?></th>
                            <th style="font-weight: bold; padding: 10px;"><?php esc_html_e('موضوع مشاوره', 'sedrazavi'); ?></th>
                            <th style="font-weight: bold; padding: 10px;"><?php esc_html_e('شماره تماس', 'sedrazavi'); ?></th>
                            <th style="font-weight: bold; padding: 10px;"><?php esc_html_e('زمان انتخابی', 'sedrazavi'); ?></th>
                            <th style="font-weight: bold; padding: 10px;"><?php esc_html_e('وضعیت', 'sedrazavi'); ?></th>
                            <th style="font-weight: bold; padding: 10px; text-align: left;"><?php esc_html_e('عملیات', 'sedrazavi'); ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($recent_appointments)) : ?>
                            <tr>
                                <td colspan="6" style="padding: 24px; text-align: center; color: #64748B;">
                                    <?php esc_html_e('هیچ نوبت مشاوره‌ای تاکنون ثبت نشده است.', 'sedrazavi'); ?>
                                </td>
                            </tr>
                        <?php else : ?>
                            <?php foreach (array_slice($recent_appointments, 0, 10) as $appt) : ?>
                                <tr>
                                    <td style="padding: 12px; font-weight: 600;"><?php echo esc_html($appt['name']); ?></td>
                                    <td style="padding: 12px;"><?php echo esc_html($appt['topic']); ?></td>
                                    <td style="padding: 12px; direction: ltr; text-align: right;"><?php echo esc_html($appt['phone'] ?: '—'); ?></td>
                                    <td style="padding: 12px;"><?php echo esc_html($appt['time']); ?></td>
                                    <td style="padding: 12px;"><span style="background: #EFF6FF; color: #1E40AF; padding: 3px 8px; border-radius: 6px; font-size: 12px; font-weight: bold;"><?php echo esc_html($appt['status']); ?></span></td>
                                    <td style="padding: 12px; text-align: left;">
                                        <?php if (!empty($appt['phone'])) : ?>
                                            <a href="<?php echo esc_url('tel:' . preg_replace('/[^0-9+]/', '', $appt['phone'])); ?>" class="button button-small" style="background: #D4AF37; color: #0B132B; border: none; font-weight: bold;"><?php esc_html_e('تماس مستقیم', 'sedrazavi'); ?></a>
                                        <?php else : ?>
                                            <span style="color: #64748B; font-size: 12px;">—</span>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>

            <!-- Helpful Notes for Non-Technical Managers -->
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 20px; display: flex; gap: 15px; align-items: flex-start;">
                <span style="font-size: 24px;">💡</span>
                <div>
                    <h4 style="margin: 0 0 6px 0; color: #0B132B; font-size: 14px; font-weight: bold;"><?php esc_html_e('نکته مهم برای مدیران غیرفنی وب‌سایت:', 'sedrazavi'); ?></h4>
                    <p style="margin: 0; color: #64748B; font-size: 13px; line-height: 1.7;">
                        <?php esc_html_e('تمامی تغییراتی که در این بخش، تنظیمات پوسته یا پرونده‌ها ثبت می‌کنید بلافاصله در وب‌سایت عمومی و اپلیکیشن ری‌اکت به صورت خودکار اعمال و ذخیره می‌شوند. نیازی به پاک کردن کش یا فرایندهای پیچیده نیست.', 'sedrazavi'); ?>
                    </p>
                </div>
            </div>

        </div>
        <?php
    }
}

if (!function_exists('sedrazavi_render_admin_tour_page')) {
    function sedrazavi_render_admin_tour_page() {
        ?>
        <div class="wrap sedrazavi-admin-wrap" style="direction: rtl; text-align: right; max-width: 900px; margin: 30px auto; font-family: 'Vazirmatn', sans-serif;">
            <div style="background: #fff; padding: 35px; border-radius: 16px; box-shadow: 0 6px 25px rgba(0,0,0,0.06); border-top: 5px solid #D4AF37;">
                <h1 style="color: #0B132B; font-size: 24px; margin-top: 0; border-bottom: 2px solid #F1F5F9; padding-bottom: 15px;">
                    🎓 <?php esc_html_e('تور آموزشی و راهنمای گام‌به‌گام مدیر سایت', 'sedrazavi'); ?>
                </h1>
                <p style="font-size: 15px; color: #475569; line-height: 1.8;">
                    <?php esc_html_e('به عنوان مدیر دفتر وکالت، نیازی به یادگیری برنامه‌نویسی یا اصطلاحات پیچیده وردپرس ندارید. این تور در ۴ گام ساده، مهم‌ترین وظایف روزانه شما را نشان می‌دهد:', 'sedrazavi'); ?>
                </p>

                <div style="display: grid; gap: 16px; margin: 25px 0;">
                    <div style="background: #F8FAFC; padding: 18px; border-radius: 12px; border-right: 4px solid #D4AF37;">
                        <h3 style="margin: 0 0 6px 0; color: #0B132B; font-size: 16px;">گام ۱: نحوه‌ی تغییر شماره تماس و اطلاعات دفتر</h3>
                        <p style="margin: 0; color: #64748B; font-size: 13px;">از منوی «تنظیمات قالب»، شماره تلفن ثابت یا همراه، ایمیل و آدرس دفتر را ویرایش کنید تا در کل سایت تغییر کند.</p>
                    </div>

                    <div style="background: #F8FAFC; padding: 18px; border-radius: 12px; border-right: 4px solid #2A9D8F;">
                        <h3 style="margin: 0 0 6px 0; color: #0B132B; font-size: 16px;">گام ۲: نحوه‌ی افزودن خدمت حقوقی جدید</h3>
                        <p style="margin: 0; color: #64748B; font-size: 13px;">از گزینه «افزودن خدمت جدید»، عنوان حوزه تخصصی، توضیحات پرونده و مدارک مورد نیاز را ثبت فرمایید.</p>
                    </div>

                    <div style="background: #F8FAFC; padding: 18px; border-radius: 12px; border-right: 4px solid #3B82F6;">
                        <h3 style="margin: 0 0 6px 0; color: #0B132B; font-size: 16px;">گام ۳: نحوه‌ی دیدن نوبت‌های رزروشده موکلین</h3>
                        <p style="margin: 0; color: #64748B; font-size: 13px;">در تب «رزروها و نوبت‌ها»، تمام درخواست‌های وقت مشاوره به همراه شماره همراه موکل و زمان مقرر لیست شده‌اند.</p>
                    </div>

                    <div style="background: #F8FAFC; padding: 18px; border-radius: 12px; border-right: 4px solid #1C2541;">
                        <h3 style="margin: 0 0 6px 0; color: #0B132B; font-size: 16px;">گام ۴: نظارت بر آمار و مواعد دادرسی در میز کار</h3>
                        <p style="margin: 0; color: #64748B; font-size: 13px;">صفحه اول پیشخوان («میز کار وکیل») خلاصه آماری تمام پرونده‌ها و مهلت‌های اخطاریه را به شکل دیداری در اختیارتان می‌گذارد.</p>
                    </div>
                </div>

                <div style="margin-top: 25px; display: flex; gap: 12px;">
                    <a href="<?php echo esc_url(admin_url('admin.php?page=sedrazavi-lawyer-dashboard&start_tour=1')); ?>" class="button button-primary" style="background: #0B132B; border-color: #D4AF37; padding: 8px 24px; font-weight: bold; border-radius: 8px; font-size: 14px;">
                        <?php esc_html_e('اجرای تور تعاملی روی صفحه میز کار ←', 'sedrazavi'); ?>
                    </a>
                    <a href="<?php echo esc_url(admin_url('admin.php?page=sedrazavi-theme-options')); ?>" class="button" style="padding: 8px 18px; font-weight: bold; border-radius: 8px; font-size: 14px;">
                        <?php esc_html_e('رفتن به تنظیمات قالب', 'sedrazavi'); ?>
                    </a>
                </div>
            </div>
        </div>
        <?php
    }
}

