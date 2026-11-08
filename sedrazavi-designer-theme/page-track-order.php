<?php
/**
 * Template Name: Track Order / Inquiry
 *
 * Dedicated live tracking page for project inquiries and client orders (SR-XXXXX).
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

// Process search if tracking code submitted via GET or POST
$tracking_code = isset($_REQUEST['tracking_code']) ? sanitize_text_field(trim($_REQUEST['tracking_code'])) : '';
$inquiry_data = null;
$error_message = '';

if (!empty($tracking_code)) {
    global $wpdb;
    $table = $wpdb->prefix . 'sedrazavi_inquiries';
    if ($wpdb->get_var("SHOW TABLES LIKE '$table'") === $table) {
        $inquiry_data = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table WHERE tracking_code = %s OR client_phone = %s ORDER BY id DESC LIMIT 1",
            $tracking_code,
            $tracking_code
        ));
        if (!$inquiry_data) {
            $error_message = 'سفارشی با کد یا شماره رهگیری وارد شده پیدا نشد. لطفاً کد دریافتی (مثال: SR-84920) را بررسی کنید.';
        }
    } else {
        // Fallback demo mode if plugin table is not yet installed
        if (strtoupper(substr($tracking_code, 0, 3)) === 'SR-') {
            $inquiry_data = (object)[
                'tracking_code' => esc_html($tracking_code),
                'client_name'   => 'کارفرمای محترم',
                'project_type'  => 'landing',
                'status'        => 'in_progress',
                'created_at'    => current_time('mysql'),
                'notes'         => 'پروژه در حال بازبینی و ساخت در المنتور پرو است.',
            ];
        } else {
            $error_message = 'کد رهگیری باید به فرمت SR-XXXXX باشد.';
        }
    }
}
?>

<div class="sr-container sr-page-container">
    <div class="sr-page-header text-center">
        <span class="sr-badge-pill">سامانه برخط رهگیری</span>
        <h1 class="sr-page-title">رهگیری آنلاین پروژه و استعلام وضعیت</h1>
        <p class="sr-page-desc">کد اختصاصی رهگیری دریافتی (مانند SR-84920) یا شماره همراه ثبت شده را وارد کنید:</p>
    </div>

    <!-- Search Box -->
    <div class="sr-tracker-card">
        <form method="get" action="" class="sr-tracker-form">
            <div class="sr-tracker-input-wrap">
                <input type="text" name="tracking_code" value="<?php echo esc_attr($tracking_code); ?>" placeholder="مثال: SR-84920 یا ۰۹۱۲۳۴۵۶۷۸۹" required dir="ltr">
                <button type="submit" class="sr-btn sr-btn-glow">
                    <span>استعلام لحظه‌ای</span>
                    <span class="sr-btn-icon">⚡</span>
                </button>
            </div>
        </form>

        <?php if (!empty($error_message)) : ?>
            <div class="sr-alert sr-alert-danger">
                <span>⚠️ <?php echo esc_html($error_message); ?></span>
            </div>
        <?php endif; ?>

        <?php if ($inquiry_data) :
            $status_steps = [
                'received'    => ['label' => 'ثبت درخواست اولیه', 'icon' => '📥', 'percent' => 20],
                'in_progress' => ['label' => 'طراحی در المنتور و معماری بصری', 'icon' => '⚡', 'percent' => 50],
                'review'      => ['label' => 'بررسی کارفرما و بازبینی', 'icon' => '👁️', 'percent' => 80],
                'completed'   => ['label' => 'تحویل قطعی و تحویل دسترسی‌ها', 'icon' => '🚀', 'percent' => 100],
            ];
            $current_status = !empty($inquiry_data->status) ? $inquiry_data->status : 'in_progress';
            $progress_info = isset($status_steps[$current_status]) ? $status_steps[$current_status] : $status_steps['in_progress'];
        ?>
            <!-- Result Box -->
            <div class="sr-order-result-box">
                <div class="sr-order-result-header">
                    <div>
                        <span class="sr-res-code">کد پیگیری: <strong><?php echo esc_html($inquiry_data->tracking_code); ?></strong></span>
                        <h3 class="sr-res-client">کارفرما: <?php echo esc_html($inquiry_data->client_name); ?></h3>
                    </div>
                    <div class="sr-res-status-badge">
                        <span class="sr-badge-pill sr-badge-primary"><?php echo esc_html($progress_info['label']); ?></span>
                    </div>
                </div>

                <!-- Progress Bar -->
                <div class="sr-progress-track">
                    <div class="sr-progress-bar" style="width: <?php echo esc_attr($progress_info['percent']); ?>%;"></div>
                </div>

                <!-- Timeline Steps -->
                <div class="sr-timeline-steps">
                    <div class="sr-step <?php echo in_array($current_status, ['received', 'in_progress', 'review', 'completed']) ? 'is-done' : ''; ?>">
                        <span class="sr-step-num">۱</span>
                        <span class="sr-step-txt">ثبت نیازها</span>
                    </div>
                    <div class="sr-step <?php echo in_array($current_status, ['in_progress', 'review', 'completed']) ? 'is-done' : ''; ?>">
                        <span class="sr-step-num">۲</span>
                        <span class="sr-step-txt">طراحی در المنتور</span>
                    </div>
                    <div class="sr-step <?php echo in_array($current_status, ['review', 'completed']) ? 'is-done' : ''; ?>">
                        <span class="sr-step-num">۳</span>
                        <span class="sr-step-txt">بازبینی کارفرما</span>
                    </div>
                    <div class="sr-step <?php echo $current_status === 'completed' ? 'is-done' : ''; ?>">
                        <span class="sr-step-num">۴</span>
                        <span class="sr-step-txt">تحویل نهایی</span>
                    </div>
                </div>

                <!-- Notes from Designer -->
                <div class="sr-designer-note-box">
                    <span class="sr-note-title">💬 یادداشت طراح (استودیو سیدرضوی):</span>
                    <p class="sr-note-content">
                        <?php echo !empty($inquiry_data->notes) ? esc_html($inquiry_data->notes) : 'پروژه طبق برنامه زمان‌بندی در حال پیشرفت است و برای بازبینی در تاریخ توافق‌شده در دسترس قرار می‌گیرد.'; ?>
                    </p>
                </div>

                <!-- Direct Action -->
                <div class="sr-tracker-actions">
                    <a href="https://t.me/<?php echo esc_attr(ltrim(get_theme_mod('sedrazavi_telegram_handle', '@sedrazavi'), '@')); ?>" target="_blank" rel="noopener noreferrer" class="sr-btn sr-btn-sm sr-btn-outline">
                        <span>ارتباط تلگرام با طراح</span>
                        <span class="sr-btn-icon">✈️</span>
                    </a>
                    <a href="<?php echo esc_url(home_url('/portal-auth/')); ?>" class="sr-btn sr-btn-sm sr-btn-glow">
                        <span>ورود به پورتال اختصاصی</span>
                        <span class="sr-btn-arrow">&larr;</span>
                    </a>
                </div>
            </div>
        <?php endif; ?>
    </div>
</div>

<?php
get_footer();
