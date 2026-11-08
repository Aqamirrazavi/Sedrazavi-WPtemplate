<?php
/**
 * Template Name: Designer Cockpit
 *
 * Dedicated frontend cockpit for the WordPress designer/admin to monitor leads,
 * submit official designer replies, update tracking statuses, and manage SSOT snapshots.
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
$table_inquiries = $wpdb->prefix . 'sedrazavi_inquiries';
$table_messages  = $wpdb->prefix . 'sedrazavi_messages';
$feedback_message = '';

// Handle official designer reply and real-time status update
if ('POST' === $_SERVER['REQUEST_METHOD'] && (isset($_POST['sr_submit_designer_reply']) || isset($_POST['sr_update_inquiry_status']))) {
    check_admin_referer('sr_cockpit_action', 'sr_cockpit_nonce');
    $lead_id       = intval($_POST['lead_id']);
    $new_status    = sanitize_text_field($_POST['new_status']);
    $designer_note = sanitize_textarea_field($_POST['designer_note']);
    $send_message  = isset($_POST['send_message_record']) ? 1 : 0;

    if ($wpdb->get_var("SHOW TABLES LIKE '$table_inquiries'") === $table_inquiries) {
        $wpdb->update(
            $table_inquiries,
            [
                'status'     => $new_status,
                'notes'      => $designer_note,
                'updated_at' => current_time('mysql'),
            ],
            ['id' => $lead_id],
            ['%s', '%s', '%s'],
            ['%d']
        );

        if ($send_message && !empty($designer_note) && $wpdb->get_var("SHOW TABLES LIKE '$table_messages'") === $table_messages) {
            $wpdb->insert(
                $table_messages,
                [
                    'inquiry_id'   => $lead_id,
                    'sender_type'  => 'designer',
                    'message_text' => $designer_note,
                    'created_at'   => current_time('mysql'),
                ],
                ['%d', '%s', '%s', '%s']
            );
        }

        $feedback_message = 'پاسخ و وضعیت سفارش با موفقیت ثبت و به پورتال کارفرما منعکس گردید.';
    }
}

// Fetch inquiries
$inquiries = [];
if ($wpdb->get_var("SHOW TABLES LIKE '$table_inquiries'") === $table_inquiries) {
    $inquiries = $wpdb->get_results("SELECT * FROM $table_inquiries ORDER BY id DESC LIMIT 30");
}

get_header();
?>

<div class="sr-container sr-cockpit-container">
    <div class="sr-dashboard-topbar">
        <div>
            <span class="sr-badge-pill sr-badge-primary">کاک‌پیت معمار سیستم (Designer Cockpit)</span>
            <h1 class="sr-dash-title">مدیریت سفارش‌ها، پاسخ رسمی به کارفرمایان و پایش SSOT</h1>
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

    <?php if (!empty($feedback_message)) : ?>
        <div class="sr-alert sr-alert-success">
            <span>✅ <?php echo esc_html($feedback_message); ?></span>
        </div>
    <?php endif; ?>

    <!-- Quick Stats Cards -->
    <div class="sr-cockpit-stats">
        <div class="sr-stat-card">
            <span class="sr-stat-num"><?php echo count($inquiries); ?></span>
            <span class="sr-stat-label">کل سفارش‌های ثبت‌شده</span>
        </div>
        <div class="sr-stat-card">
            <span class="sr-stat-num">۶۶</span>
            <span class="sr-stat-label">پالت‌های فعال نئونی</span>
        </div>
        <div class="sr-stat-card">
            <span class="sr-stat-num">۳۳</span>
            <span class="sr-stat-label">پترن‌های وکتوری فعال</span>
        </div>
        <div class="sr-stat-card">
            <span class="sr-stat-num">۱۰۰٪</span>
            <span class="sr-stat-label">سازگاری با المنتور پرو</span>
        </div>
    </div>

    <!-- Leads & Inquiries Table with Reply Interface -->
    <div class="sr-card sr-cockpit-card">
        <div class="sr-card-head">
            <h3 class="sr-card-title">📋 لیست آخرین درخواست‌های پروژه و استعلام‌ها</h3>
            <span class="sr-badge-pill">بروزرسانی لحظه‌ای و تعاملی</span>
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
                            <th>وضعیت فعلی</th>
                            <th>تاریخ ثبت</th>
                            <th>ارسال پاسخ رسمی</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($inquiries as $lead) : ?>
                            <tr>
                                <td><code class="sr-code-tag"><?php echo esc_html($lead->tracking_code); ?></code></td>
                                <td>
                                    <strong><?php echo esc_html($lead->client_name); ?></strong>
                                    <?php if (!empty($lead->client_email)) : ?>
                                        <br><small class="sr-link-muted"><?php echo esc_html($lead->client_email); ?></small>
                                    <?php endif; ?>
                                </td>
                                <td dir="ltr"><?php echo esc_html($lead->client_phone); ?></td>
                                <td>
                                    <span class="sr-badge-pill sr-badge-sm"><?php echo esc_html($lead->project_type); ?></span>
                                </td>
                                <td>
                                    <?php
                                    $status_labels = [
                                        'received'    => 'دریافت اولیه',
                                        'in_progress' => 'طراحی در المنتور',
                                        'review'      => 'بازبینی کارفرما',
                                        'completed'   => 'تحویل قطعی',
                                    ];
                                    $lbl = isset($status_labels[$lead->status]) ? $status_labels[$lead->status] : $lead->status;
                                    ?>
                                    <span class="sr-badge-pill sr-badge-sm sr-badge-primary"><?php echo esc_html($lbl); ?></span>
                                </td>
                                <td><?php echo esc_html(date_i18n('Y/m/d H:i', strtotime($lead->created_at))); ?></td>
                                <td>
                                    <button type="button" class="sr-btn sr-btn-xs sr-btn-glow sr-open-reply-modal"
                                            data-id="<?php echo esc_attr($lead->id); ?>"
                                            data-code="<?php echo esc_attr($lead->tracking_code); ?>"
                                            data-client="<?php echo esc_attr($lead->client_name); ?>"
                                            data-status="<?php echo esc_attr($lead->status); ?>"
                                            data-notes="<?php echo esc_attr($lead->notes); ?>">
                                        <span>پاسخ و تغییر وضعیت ⚡</span>
                                    </button>
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

<!-- Modal: Official Designer Reply & Status Update -->
<div class="sr-modal-backdrop" id="sr-designer-reply-modal" aria-hidden="true" role="dialog">
    <div class="sr-modal-card">
        <div class="sr-modal-header">
            <h3 class="sr-modal-title">💬 ثبت پاسخ رسمی معمار به کارفرما</h3>
            <button type="button" class="sr-modal-close" id="sr-reply-modal-close" aria-label="بستن">&times;</button>
        </div>
        <div class="sr-modal-body">
            <form method="post" action="" class="sr-lead-form">
                <?php wp_nonce_field('sr_cockpit_action', 'sr_cockpit_nonce'); ?>
                <input type="hidden" name="sr_submit_designer_reply" value="1">
                <input type="hidden" name="lead_id" id="reply_lead_id" value="">

                <div class="sr-form-group">
                    <label>مشخصات سفارش:</label>
                    <div class="sr-order-modal-summary">
                        کد پیگیری: <strong id="modal_tracking_code" style="color:var(--sr-primary);">--</strong> | 
                        کارفرما: <strong id="modal_client_name">--</strong>
                    </div>
                </div>

                <div class="sr-form-group">
                    <label for="reply_new_status">وضعیت جدید پرونده پروژه <span class="sr-req">*</span></label>
                    <select name="new_status" id="reply_new_status" required>
                        <option value="received">۱. دریافت اولیه و استعلام نیازها</option>
                        <option value="in_progress">۲. در حال طراحی نئونی و توسعه در المنتور</option>
                        <option value="review">۳. آماده بازبینی کارفرما و تست واکنش‌گرایی</option>
                        <option value="completed">۴. تحویل قطعی، آموزش کاربری و صدور دسترسی</option>
                    </select>
                </div>

                <div class="sr-form-group">
                    <label for="reply_designer_note">یادداشت رسمی و پیام طراح برای کارفرما <span class="sr-req">*</span></label>
                    <textarea name="designer_note" id="reply_designer_note" rows="5" required placeholder="پیام خود در خصوص وضعیت پیشرفت پروژه، لینک نسخه دمو یا زمان تحویل را بنویسید..."></textarea>
                </div>

                <div class="sr-form-group">
                    <label class="sr-checkbox-label">
                        <input type="checkbox" name="send_message_record" value="1" checked>
                        <span>ذخیره در تاریخچه گفتگوی پورتال مشتری (پیام رسمی)</span>
                    </label>
                </div>

                <div class="sr-form-submit">
                    <button type="submit" class="sr-btn sr-btn-glow sr-btn-full">
                        <span>ثبت قطعی و ارسال به پورتال کارفرما</span>
                        <span class="sr-btn-icon">⚡</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    const replyModal = document.getElementById('sr-designer-reply-modal');
    const closeBtn = document.getElementById('sr-reply-modal-close');
    const openBtns = document.querySelectorAll('.sr-open-reply-modal');

    openBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            document.getElementById('reply_lead_id').value = this.dataset.id;
            document.getElementById('modal_tracking_code').textContent = this.dataset.code;
            document.getElementById('modal_client_name').textContent = this.dataset.client;
            document.getElementById('reply_new_status').value = this.dataset.status;
            document.getElementById('reply_designer_note').value = this.dataset.notes || '';

            replyModal.classList.add('is-open');
            replyModal.setAttribute('aria-hidden', 'false');
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            replyModal.classList.remove('is-open');
            replyModal.setAttribute('aria-hidden', 'true');
        });
    }

    if (replyModal) {
        replyModal.addEventListener('click', function (e) {
            if (e.target === replyModal) {
                replyModal.classList.remove('is-open');
                replyModal.setAttribute('aria-hidden', 'true');
            }
        });
    }
});
</script>

<?php
get_footer();
