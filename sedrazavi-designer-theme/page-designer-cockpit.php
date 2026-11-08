<?php
/**
 * Template Name: Designer Cockpit
 *
 * Dedicated frontend cockpit for the WordPress designer/admin to monitor leads,
 * update tracking statuses, and oversee site configurations.
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!is_user_logged_in() || !current_user_can('manage_options')) {
    wp_safe_redirect(home_url('/portal-auth/'));
    exit;
}

global $wpdb;
$table = $wpdb->prefix . 'sedrazavi_inquiries';
$inquiries = [];

// Handle status updates from cockpit
if ('POST' === $_SERVER['REQUEST_METHOD'] && isset($_POST['sr_update_lead_status'])) {
    check_admin_referer('sr_cockpit_action', 'sr_cockpit_nonce');
    $lead_id = intval($_POST['lead_id']);
    $new_status = sanitize_text_field($_POST['new_status']);
    $new_notes = sanitize_textarea_field($_POST['new_notes']);

    if ($wpdb->get_var("SHOW TABLES LIKE '$table'") === $table) {
        $wpdb->update(
            $table,
            ['status' => $new_status, 'notes' => $new_notes],
            ['id' => $lead_id],
            ['%s', '%s'],
            ['%d']
        );
    }
}

if ($wpdb->get_var("SHOW TABLES LIKE '$table'") === $table) {
    $inquiries = $wpdb->get_results("SELECT * FROM $table ORDER BY id DESC LIMIT 20");
}

get_header();
?>

<div class="sr-container sr-cockpit-container">
    <div class="sr-dashboard-topbar">
        <div>
            <span class="sr-badge-pill sr-badge-primary">کاک‌پیت معمار سیستم (Designer Cockpit)</span>
            <h1 class="sr-dash-title">مدیریت سفارش‌ها و لیدهای ورودی</h1>
        </div>
        <div class="sr-dash-actions">
            <a href="<?php echo esc_url(admin_url()); ?>" class="sr-btn sr-btn-sm sr-btn-outline">
                <span>پیشخوان وردپرس</span>
                <span class="sr-btn-icon">⚙️</span>
            </a>
            <a href="<?php echo esc_url(wp_logout_url(home_url('/'))); ?>" class="sr-btn sr-btn-sm sr-btn-outline">
                <span>خروج</span>
                <span class="sr-btn-icon">🚪</span>
            </a>
        </div>
    </div>

    <!-- Quick Stats Cards -->
    <div class="sr-cockpit-stats">
        <div class="sr-stat-card">
            <span class="sr-stat-num"><?php echo count($inquiries); ?></span>
            <span class="sr-stat-label">کل سفارش‌های ثبت‌شده</span>
        </div>
        <div class="sr-stat-card">
            <span class="sr-stat-num">۶۶</span>
            <span class="sr-stat-label">پالت‌های فعال</span>
        </div>
        <div class="sr-stat-card">
            <span class="sr-stat-num">۱۰۰٪</span>
            <span class="sr-stat-label">سازگاری با المنتور پرو</span>
        </div>
        <div class="sr-stat-card">
            <span class="sr-stat-num">۰ خط</span>
            <span class="sr-stat-label">وابستگی به ری‌اکت در فرانت</span>
        </div>
    </div>

    <!-- Leads & Inquiries Table -->
    <div class="sr-card sr-cockpit-card">
        <div class="sr-card-head">
            <h3 class="sr-card-title">📋 لیست آخرین درخواست‌های پروژه و استعلام‌ها</h3>
            <span class="sr-badge-pill">بروزرسانی لحظه‌ای</span>
        </div>

        <?php if (!empty($inquiries)) : ?>
            <div class="sr-table-responsive">
                <table class="sr-table">
                    <thead>
                        <tr>
                            <th>کد رهگیری</th>
                            <th>نام کارفرما</th>
                            <th>شماره تماس</th>
                            <th>نوع پروژه</th>
                            <th>وضعیت</th>
                            <th>تاریخ ثبت</th>
                            <th>مدیریت</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($inquiries as $lead) : ?>
                            <tr>
                                <td><code class="sr-code-tag"><?php echo esc_html($lead->tracking_code); ?></code></td>
                                <td><strong><?php echo esc_html($lead->client_name); ?></strong></td>
                                <td dir="ltr"><?php echo esc_html($lead->client_phone); ?></td>
                                <td>
                                    <span class="sr-badge-pill sr-badge-sm"><?php echo esc_html($lead->project_type); ?></span>
                                </td>
                                <td>
                                    <form method="post" action="" class="sr-inline-form">
                                        <?php wp_nonce_field('sr_cockpit_action', 'sr_cockpit_nonce'); ?>
                                        <input type="hidden" name="sr_update_lead_status" value="1">
                                        <input type="hidden" name="lead_id" value="<?php echo esc_attr($lead->id); ?>">
                                        <select name="new_status" onchange="this.form.submit()" class="sr-select-sm">
                                            <option value="received" <?php selected($lead->status, 'received'); ?>>دریافت اولیه</option>
                                            <option value="in_progress" <?php selected($lead->status, 'in_progress'); ?>>در حال طراحی المنتور</option>
                                            <option value="review" <?php selected($lead->status, 'review'); ?>>بازبینی کارفرما</option>
                                            <option value="completed" <?php selected($lead->status, 'completed'); ?>>تحویل نهایی</option>
                                        </select>
                                    </form>
                                </td>
                                <td><?php echo esc_html(date_i18n('Y/m/d H:i', strtotime($lead->created_at))); ?></td>
                                <td>
                                    <a href="tel:<?php echo esc_attr($lead->client_phone); ?>" class="sr-btn sr-btn-xs sr-btn-outline" title="تماس">📞</a>
                                    <a href="https://t.me/share/url?url=<?php echo urlencode('سلام، در مورد پروژه شما در استودیو سیدرضوی:'); ?>" target="_blank" rel="noopener noreferrer" class="sr-btn sr-btn-xs sr-btn-outline" title="ارسال پیام">💬</a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php else : ?>
            <div class="sr-empty-state text-center">
                <span class="sr-empty-icon">📥</span>
                <h4>هنوز هیچ لیدی ثبت نشده است</h4>
                <p>فرم مشاوره سریع در صفحه اصلی را تکمیل و تست کنید تا اولین سفارش در این جدول ظاهر شود.</p>
                <a href="<?php echo esc_url(home_url('/')); ?>" class="sr-btn sr-btn-sm sr-btn-glow">مشاهده صفحه اصلی &larr;</a>
            </div>
        <?php endif; ?>
    </div>
</div>

<?php
get_footer();
