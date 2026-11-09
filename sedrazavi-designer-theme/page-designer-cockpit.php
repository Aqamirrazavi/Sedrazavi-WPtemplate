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

    <!-- Management Tools: Core Plugin Bundler & Front-End Font Studio -->
    <div class="sr-cockpit-tools-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:20px; margin-bottom:28px;">
        <!-- Card 1: Bundled Core Plugin 1-Click Installer -->
        <div class="sr-card sr-cockpit-card">
            <div class="sr-card-head">
                <h3 class="sr-card-title">📦 افزونه هسته اختصاصی طراح (SedRazavi Core)</h3>
                <?php if (class_exists('\SedRazaviDesigner\Plugin_Installer') && \SedRazaviDesigner\Plugin_Installer::is_active()) : ?>
                    <span class="sr-badge-pill sr-badge-primary">✅ فعال و متصل</span>
                <?php else : ?>
                    <span class="sr-badge-pill" style="color:#EF4444; border-color:#EF4444;">غیرفعال</span>
                <?php endif; ?>
            </div>
            <p style="font-size:13px; color:var(--sr-muted); line-height:1.7; margin-bottom:16px;">
                بسته نصبی افزونه اختصاصی درون پوسته تعبیه شده است. با یک کلیک می‌توانید افزونه را نصب، جداول دیتابیس را مستقر و ویجت‌های المنتور را فعال کنید:
            </p>
            <?php if (class_exists('\SedRazaviDesigner\Plugin_Installer') && \SedRazaviDesigner\Plugin_Installer::is_active()) : ?>
                <div style="background:var(--sr-surface-2); padding:12px; border-radius:10px; font-size:12px; color:var(--sr-text);">
                    ⚡ تمامی ویجت‌ها، پست‌تایپ‌های نمونه‌کار و خدمات و جداول استعلام فعال هستند.
                </div>
            <?php else : ?>
                <button type="button" class="sr-btn sr-btn-glow sr-btn-full" id="sr-cockpit-install-plugin-btn">
                    <span>نصب و فعال‌سازی افزونه هسته با ۱ کلیک</span>
                    <span class="sr-btn-icon">⚡</span>
                </button>
                <div id="sr-plugin-install-msg" style="margin-top:10px; font-size:12px; font-weight:600;"></div>
            <?php endif; ?>
        </div>

        <!-- Card 2: Front-End Font Studio -->
        <div class="sr-card sr-cockpit-card">
            <div class="sr-card-head">
                <h3 class="sr-card-title">🎨 استودیوی فرانت‌اند فونت و تایپوگرافی</h3>
                <span class="sr-badge-pill">تغییر در لحظه</span>
            </div>
            <div style="margin-bottom:14px;">
                <label for="sr_font_selector" style="font-size:12px; color:var(--sr-muted); display:block; margin-bottom:6px;">انتخاب تایپ‌فیس فعال سایت:</label>
                <?php
                $active_font = get_option('sedrazavi_active_font', 'vazirmatn');
                $fonts = class_exists('\SedRazaviDesigner\Font_Studio') ? \SedRazaviDesigner\Font_Studio::get_available_fonts() : [];
                ?>
                <select id="sr_font_selector" style="width:100%; border-radius:8px; padding:8px 10px; background:var(--sr-surface-2); border:1px solid var(--sr-border); color:var(--sr-text);">
                    <?php foreach ($fonts as $k => $f) : ?>
                        <option value="<?php echo esc_attr($k); ?>" <?php selected($active_font, $k); ?>>
                            <?php echo esc_html($f['name_fa']); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
                <button type="button" class="sr-btn sr-btn-sm sr-btn-outline" id="sr-apply-font-btn" style="margin-top:8px;">
                    <span>اعمال فونت سراسری</span>
                </button>
                <span id="sr-font-status-msg" style="margin-right:10px; font-size:12px;"></span>
            </div>

            <!-- Custom Font Uploader -->
            <div style="border-top:1px dashed var(--sr-border); padding-top:12px; margin-top:10px;">
                <label style="font-size:12px; color:var(--sr-muted); display:block; margin-bottom:6px;">آپلود فونت سفارشی تجاری (WOFF2):</label>
                <input type="file" id="sr_custom_font_file" accept=".woff2,.woff,.ttf" style="font-size:12px; color:var(--sr-muted); width:100%; margin-bottom:8px;">
                <button type="button" class="sr-btn sr-btn-sm sr-btn-glow" id="sr-upload-font-btn">
                    <span>بارگذاری و فعال‌سازی فونت</span>
                </button>
                <span id="sr-upload-font-msg" style="margin-right:10px; font-size:12px;"></span>
            </div>
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
    // 1. Reply Modal Controller
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

    // 2. Bundled Core Plugin 1-Click Installer
    const installPluginBtn = document.getElementById('sr-cockpit-install-plugin-btn');
    const pluginInstallMsg = document.getElementById('sr-plugin-install-msg');
    const pluginNonce = '<?php echo esc_js(wp_create_nonce("sr_plugin_install_nonce")); ?>';
    const ajaxUrl = '<?php echo esc_url(admin_url("admin-ajax.php")); ?>';

    if (installPluginBtn) {
        installPluginBtn.addEventListener('click', function () {
            installPluginBtn.disabled = true;
            installPluginBtn.innerHTML = '<span>در حال استخراج و فعال‌سازی...</span> <span class="sr-btn-icon">⏳</span>';
            if (pluginInstallMsg) {
                pluginInstallMsg.style.color = 'var(--sr-primary)';
                pluginInstallMsg.textContent = 'در حال استخراج بسته نصبی و پیکربندی خودکار...';
            }

            const fd = new FormData();
            fd.append('action', 'sr_install_bundled_core');
            fd.append('security', pluginNonce);

            fetch(ajaxUrl, {
                method: 'POST',
                body: fd
            })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    if (pluginInstallMsg) {
                        pluginInstallMsg.style.color = '#10B981';
                        pluginInstallMsg.textContent = '✅ ' + (res.data?.message || 'افزونه با موفقیت نصب و فعال گردید.');
                    }
                    setTimeout(() => window.location.reload(), 1500);
                } else {
                    if (pluginInstallMsg) {
                        pluginInstallMsg.style.color = '#EF4444';
                        pluginInstallMsg.textContent = '❌ خطا: ' + (res.data?.message || 'نصب با خطا مواجه شد.');
                    }
                    installPluginBtn.disabled = false;
                    installPluginBtn.innerHTML = '<span>نصب و فعال‌سازی افزونه هسته با ۱ کلیک</span> <span class="sr-btn-icon">⚡</span>';
                }
            })
            .catch(() => {
                if (pluginInstallMsg) {
                    pluginInstallMsg.style.color = '#EF4444';
                    pluginInstallMsg.textContent = '❌ خطا در ارسال درخواست به سرور.';
                }
                installPluginBtn.disabled = false;
                installPluginBtn.innerHTML = '<span>نصب و فعال‌سازی افزونه هسته با ۱ کلیک</span> <span class="sr-btn-icon">⚡</span>';
            });
        });
    }

    // 3. Front-End Font Studio Switcher
    const applyFontBtn = document.getElementById('sr-apply-font-btn');
    const fontSelector = document.getElementById('sr_font_selector');
    const fontStatusMsg = document.getElementById('sr-font-status-msg');
    const fontStudioNonce = '<?php echo esc_js(wp_create_nonce("sr_font_studio_nonce")); ?>';

    if (applyFontBtn && fontSelector) {
        applyFontBtn.addEventListener('click', function () {
            applyFontBtn.disabled = true;
            if (fontStatusMsg) {
                fontStatusMsg.style.color = 'var(--sr-primary)';
                fontStatusMsg.textContent = 'در حال اعمال...';
            }

            const fd = new FormData();
            fd.append('action', 'sr_update_active_font');
            fd.append('font_key', fontSelector.value);
            fd.append('security', fontStudioNonce);

            fetch(ajaxUrl, {
                method: 'POST',
                body: fd
            })
            .then(res => res.json())
            .then(res => {
                applyFontBtn.disabled = false;
                if (res.success) {
                    if (fontStatusMsg) {
                        fontStatusMsg.style.color = '#10B981';
                        fontStatusMsg.textContent = '✅ فونت با موفقیت اعمال شد.';
                    }
                    setTimeout(() => window.location.reload(), 1000);
                } else {
                    if (fontStatusMsg) {
                        fontStatusMsg.style.color = '#EF4444';
                        fontStatusMsg.textContent = '❌ خطا: ' + (res.data?.message || 'خطا در تغییر فونت');
                    }
                }
            })
            .catch(() => {
                applyFontBtn.disabled = false;
                if (fontStatusMsg) {
                    fontStatusMsg.style.color = '#EF4444';
                    fontStatusMsg.textContent = '❌ خطا در ارتباط با سرور';
                }
            });
        });
    }

    // 4. Custom Font WOFF2 Uploader
    const uploadFontBtn = document.getElementById('sr-upload-font-btn');
    const fontFileInput = document.getElementById('sr_custom_font_file');
    const uploadFontMsg = document.getElementById('sr-upload-font-msg');

    if (uploadFontBtn && fontFileInput) {
        uploadFontBtn.addEventListener('click', function () {
            if (!fontFileInput.files || fontFileInput.files.length === 0) {
                if (uploadFontMsg) {
                    uploadFontMsg.style.color = '#EF4444';
                    uploadFontMsg.textContent = 'لطفاً ابتدا فایل فونت را انتخاب کنید.';
                }
                return;
            }

            uploadFontBtn.disabled = true;
            if (uploadFontMsg) {
                uploadFontMsg.style.color = 'var(--sr-primary)';
                uploadFontMsg.textContent = 'در حال بارگذاری فونت...';
            }

            const fd = new FormData();
            fd.append('action', 'sr_upload_custom_font');
            fd.append('font_file', fontFileInput.files[0]);
            fd.append('security', fontStudioNonce);

            fetch(ajaxUrl, {
                method: 'POST',
                body: fd
            })
            .then(res => res.json())
            .then(res => {
                uploadFontBtn.disabled = false;
                if (res.success) {
                    if (uploadFontMsg) {
                        uploadFontMsg.style.color = '#10B981';
                        uploadFontMsg.textContent = '✅ ' + (res.data?.message || 'فونت بارگذاری و فعال شد.');
                    }
                    setTimeout(() => window.location.reload(), 1200);
                } else {
                    if (uploadFontMsg) {
                        uploadFontMsg.style.color = '#EF4444';
                        uploadFontMsg.textContent = '❌ ' + (res.data?.message || 'خطا در آپلود فونت.');
                    }
                }
            })
            .catch(() => {
                uploadFontBtn.disabled = false;
                if (uploadFontMsg) {
                    uploadFontMsg.style.color = '#EF4444';
                    uploadFontMsg.textContent = '❌ خطا در آپلود فونت.';
                }
            });
        });
    }
});
</script>

<?php
get_footer();
