<?php
/**
 * Template Name: پیشخوان تمام‌صفحه وکیل (Full-Screen Lawyer Dashboard)
 * Description: Full-screen dashboard hosting the LawyerDashboard React component via .sedrazavi-react-root
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

// Fetch current user details or default lawyer credentials
$is_logged_in = is_user_logged_in();
$current_user = wp_get_current_user();
$user_name = $is_logged_in && !empty($current_user->display_name) 
    ? $current_user->display_name 
    : get_option('sedrazavi_lawyer_name', 'سرکار خانم دکتر سیده مریم رضوی');
$user_phone = $is_logged_in 
    ? (get_user_meta($current_user->ID, 'phone', true) ?: get_user_meta($current_user->ID, 'billing_phone', true) ?: '۰۹۱۲۳۴۵۶۷۸۹') 
    : get_option('sedrazavi_lawyer_mobile', '۰۹۱۲-۳۴۵۶۷۸۹');

$is_admin = current_user_can('manage_options');
$is_lawyer = current_user_can('edit_posts') || (is_user_logged_in() && in_array('lawyer', (array)$current_user->roles, true));

$dashboard_props = [
    'userPhoneNumber'       => $user_phone,
    'userName'              => $user_name,
    'userRole'              => $is_admin ? 'admin' : ($is_lawyer ? 'lawyer' : 'client'),
    'isAdminActingAsLawyer' => $is_admin,
    'isFullScreen'          => true,
    'viewMode'              => 'lawyer',
];
?>

<main id="sedrazavi-fullscreen-dashboard-page" class="min-h-screen bg-[#F4F6F9] dark:bg-[#070D1E] w-full text-right" dir="rtl">
    <!-- Inject .sedrazavi-react-root for LawyerDashboard -->
    <div 
        id="sedrazavi-dashboard-fullscreen-mount"
        class="sedrazavi-react-root w-full min-h-screen"
        data-component="LawyerDashboard"
        data-props="<?php echo esc_attr(wp_json_encode($dashboard_props)); ?>"
        dir="rtl"
    >
        <!-- Graceful fallback skeleton if JS is initializing -->
        <div class="sedrazavi-skeleton-container" style="min-height: 80vh; background: linear-gradient(135deg, rgba(11,19,43,0.03) 0%, rgba(212,175,55,0.06) 100%); border-radius: 1.5rem; margin: 1.5rem auto; max-width: 96%; padding: 3rem; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; font-family: inherit;">
            <div style="width: 48px; height: 48px; border: 4px solid rgba(212,175,55,0.25); border-top-color: #D4AF37; border-radius: 50%; animation: sedrazaviSpin 1.1s cubic-bezier(0.5, 0, 0.5, 1) infinite; margin-bottom: 1.25rem;"></div>
            <h2 style="font-size: 1.25rem; font-weight: 800; color: #0B132B; margin: 0 0 0.5rem 0;">
                پیشخوان تمام‌صفحه مدیریت پرونده‌ها و وکالت
            </h2>
            <p style="font-size: 0.8125rem; color: #64748B; max-width: 520px; margin: 0; line-height: 1.6;">
                در حال بارگذاری میز کار اختصاصی وکیل، نمودارهای تحلیلی، سامانه هشدارهای دادرسی و مکاتبات موکلین...
            </p>
            <style>
                @keyframes sedrazaviSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            </style>
        </div>
    </div>
</main>

<?php
get_footer();
