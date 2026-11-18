/**
 * Frontend Cockpit JavaScript Interactions (Plugin-Owned Asset)
 * Vanilla ES6 (< 15KB), Responsive Tabs, AJAX Modals, Database Sync
 */

(function($) {
  'use strict';

  $(document).ready(function() {
    const data = window.srCockpitData || {};
    const ajaxUrl = data.ajaxUrl || '/wp-admin/admin-ajax.php';
    const nonce = data.nonce || '';

    function showCockpitToast(msg, isSuccess) {
      let $toast = $('#sr-cockpit-toast');
      if (!$toast.length) {
        $toast = $('<div id="sr-cockpit-toast" class="sr-cockpit-toast" role="status" aria-live="polite"></div>');
        $('#sr-frontend-cockpit-root').prepend($toast);
      }
      $toast
        .removeClass('sr-toast-success sr-toast-error')
        .addClass(isSuccess ? 'sr-toast-success' : 'sr-toast-error')
        .text(msg)
        .stop(true, true)
        .fadeIn(180);
      clearTimeout($toast.data('timer'));
      $toast.data('timer', setTimeout(function() {
        $toast.fadeOut(250);
      }, 4800));
    }

    let pendingConfirmCallback = null;
    function openConfirmDialog(message, onConfirm) {
      const $dlg = $('#sr-confirm-dialog');
      if (!$dlg.length) {
        if (typeof onConfirm === 'function') {
          onConfirm();
        }
        return;
      }
      pendingConfirmCallback = typeof onConfirm === 'function' ? onConfirm : null;
      $('#sr-confirm-message').text(message || 'آیا از انجام این عملیات اطمینان دارید؟');
      $dlg.fadeIn(160);
      $('#sr-confirm-accept').trigger('focus');
    }

    $('#sr-confirm-accept').on('click', function() {
      const cb = pendingConfirmCallback;
      pendingConfirmCallback = null;
      $('#sr-confirm-dialog').fadeOut(140);
      if (cb) {
        cb();
      }
    });

    $('#sr-confirm-cancel').on('click', function() {
      pendingConfirmCallback = null;
      $('#sr-confirm-dialog').fadeOut(140);
    });

    // 1. Tab Switching (with ARIA sync)
    $('.sr-tab-btn').on('click', function() {
      const target = $(this).data('tab');
      $('.sr-tab-btn').removeClass('active').attr('aria-selected', 'false');
      $(this).addClass('active').attr('aria-selected', 'true');

      $('.sr-tab-pane').removeClass('active').attr('hidden', true);
      $('#' + target).addClass('active').removeAttr('hidden');
    });

    // 2. Database Login Form
    $('#sr-cockpit-login-form').on('submit', function(e) {
      e.preventDefault();
      const $form = $(this);
      const $btn = $form.find('button[type="submit"]');
      const $feedback = $form.find('.sr-form-feedback');

      $btn.prop('disabled', true).text('در حال بررسی اطلاعات...');
      $feedback.text('').css('color', '');

      $.post(ajaxUrl, {
        action: 'sr_cockpit_db_login',
        nonce: nonce,
        username: $('#sr_login_user').val(),
        password: $('#sr_login_pass').val(),
        remember: $form.find('input[name="remember"]').is(':checked') ? 1 : 0
      }, function(res) {
        if (res.success) {
          $feedback.text(res.data.message).css('color', '#10B981');
          setTimeout(() => {
            window.location.reload();
          }, 800);
        } else {
          $btn.prop('disabled', false).text('ورود به پیشخوان');
          $feedback.text(res.data.message || 'خطا در احراز هویت').css('color', '#EF4444');
        }
      }).fail(function() {
        $btn.prop('disabled', false).text('ورود به پیشخوان');
        $feedback.text('خطای اتصال به سرور').css('color', '#EF4444');
      });
    });

    // 3. Logout Button (Non-blocking confirmation)
    $('#sr-cockpit-logout-btn').on('click', function() {
      const msg = (data.strings && data.strings.confirmLogout) || 'آیا از خروج از حساب کاربری اطمینان دارید؟';
      openConfirmDialog(msg, function() {
        $.post(ajaxUrl, {
          action: 'sr_cockpit_db_logout',
          nonce: nonce
        }, function() {
          window.location.reload();
        });
      });
    });

    // 4. Modal Open & Close Controls
    $('#sr-btn-new-cpt').on('click', function() {
      $('#sr_cpt_post_id').val('');
      $('#sr-cpt-form')[0].reset();
      $('#sr-cpt-modal-title').text('ایجاد محتوای جدید');
      $('#sr-cpt-modal .sr-modal-feedback').text('');
      $('#sr-cpt-modal').fadeIn(200);
    });

    $('#sr-btn-new-user').on('click', function() {
      $('#sr-user-modal').fadeIn(200);
    });

    $('#sr-btn-new-legal-case').on('click', function() {
      $('#sr_legal_case_id').val('');
      const $form = $('#sr-legal-case-form');
      if ($form.length && $form[0]) {
        $form[0].reset();
      }
      $('#sr-legal-modal-title').text('ثبت پرونده محرمانه حقوقی');
      $('#sr-legal-case-modal .sr-modal-feedback').text('');
      $('#sr-legal-case-modal').fadeIn(200);
    });

    $('.sr-modal-close, .sr-modal-cancel').on('click', function() {
      pendingConfirmCallback = null;
      $('.sr-modal').fadeOut(200);
    });

    $(window).on('click', function(e) {
      if ($(e.target).hasClass('sr-modal')) {
        pendingConfirmCallback = null;
        $('.sr-modal').fadeOut(200);
      }
    });

    $(document).on('keydown', function(e) {
      if (e.key === 'Escape') {
        pendingConfirmCallback = null;
        $('.sr-modal:visible').fadeOut(200);
      }
    });

    // 4B. Load Single CPT & Metabox Data for Edit Modal
    $(document).on('click', '.sr-btn-edit-cpt', function() {
      const postId = $(this).data('id');
      const $btn = $(this);
      $btn.prop('disabled', true);

      $.post(ajaxUrl, {
        action: 'sr_cockpit_get_cpt_data',
        post_id: postId,
        nonce: nonce
      }, function(res) {
        $btn.prop('disabled', false);
        if (res.success && res.data) {
          const d = res.data;
          $('#sr_cpt_post_id').val(d.post_id);
          $('#sr_cpt_post_type').val(d.post_type);
          $('#sr_cpt_title').val(d.title);
          $('#sr_cpt_content').val(d.content);
          const meta = d.meta || {};
          $('#meta_portfolio_client').val(meta._sr_portfolio_client || '');
          $('#meta_portfolio_url').val(meta._sr_portfolio_url || '');
          $('#meta_portfolio_metric_val').val(meta._sr_portfolio_metric_val || '');
          $('#meta_portfolio_metric_label').val(meta._sr_portfolio_metric_label || '');
          $('#meta_service_price').val(meta._sr_service_price || '');
          $('#meta_service_delivery').val(meta._sr_service_delivery_time || '');
          $('#sr-cpt-modal-title').text('ویرایش محتوا (#' + d.post_id + ')');
          $('#sr-cpt-modal .sr-modal-feedback').text('');
          $('#sr-cpt-modal').fadeIn(200);
        } else {
          showCockpitToast((res.data && res.data.message) || 'خطا در بازیابی اطلاعات محتوا.', false);
        }
      }).fail(function() {
        $btn.prop('disabled', false);
        showCockpitToast('خطای ارتباط با سرور هنگام بارگذاری اطلاعات.', false);
      });
    });

    // 5. CPT Dynamic Form Submission
    $('#sr-cpt-form').on('submit', function(e) {
      e.preventDefault();
      const $form = $(this);
      const $feedback = $form.find('.sr-modal-feedback');
      const formData = $form.serializeArray();

      formData.push({ name: 'action', value: 'sr_cockpit_save_cpt_post' });
      formData.push({ name: 'nonce', value: nonce });

      $.post(ajaxUrl, formData, function(res) {
        if (res.success) {
          $feedback.text(res.data.message).css('color', '#10B981');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          $feedback.text(res.data.message || 'خطا در ذخیره سازی').css('color', '#EF4444');
        }
      });
    });

    // 5B. Confidential Legal Case Edit / Save / Delete
    $(document).on('click', '.sr-btn-edit-legal-case', function() {
      const $b = $(this);
      $('#sr_legal_case_id').val($b.data('id'));
      $('#sr_legal_case_title').val($b.data('title') || '');
      $('#sr_legal_case_number').val($b.data('number') || '');
      $('#sr_legal_case_stage').val($b.data('stage') || '');
      $('#sr_legal_court_branch').val($b.data('branch') || '');
      $('#sr_legal_next_hearing').val($b.data('hearing') || '');
      $('#sr_legal_client_uid').val($b.data('client') || '');
      $('#sr_legal_case_notes').val($b.data('notes') || '');
      $('#sr-legal-modal-title').text('ویرایش پرونده محرمانه (#' + $b.data('id') + ')');
      $('#sr-legal-case-modal .sr-modal-feedback').text('');
      $('#sr-legal-case-modal').fadeIn(200);
    });

    $('#sr-legal-case-form').on('submit', function(e) {
      e.preventDefault();
      const $form = $(this);
      const $feedback = $form.find('.sr-modal-feedback');
      const formData = $form.serializeArray();
      formData.push({ name: 'action', value: 'sr_cockpit_save_legal_case' });
      formData.push({ name: 'nonce', value: nonce });

      $.post(ajaxUrl, formData, function(res) {
        if (res.success) {
          $feedback.text(res.data.message).css('color', '#10B981');
          setTimeout(() => {
            window.location.reload();
          }, 900);
        } else {
          $feedback.text((res.data && res.data.message) || 'خطا در ذخیره پرونده').css('color', '#EF4444');
        }
      }).fail(function() {
        $feedback.text('خطای ارتباط با سرور در ثبت پرونده.').css('color', '#EF4444');
      });
    });

    $(document).on('click', '.sr-btn-delete-legal-case', function() {
      const caseId = $(this).data('id');
      const $row = $(this).closest('tr');
      openConfirmDialog(data.strings ? data.strings.confirmDelete : 'حذف این پرونده تأیید می‌شود؟', function() {
        $.post(ajaxUrl, {
          action: 'sr_cockpit_delete_legal_case',
          case_id: caseId,
          nonce: nonce
        }, function(res) {
          if (res.success) {
            $row.fadeOut(300, function() { $(this).remove(); });
            showCockpitToast('پرونده با موفقیت حذف شد.', true);
          } else {
            showCockpitToast((res.data && res.data.message) || 'خطا در حذف پرونده', false);
          }
        });
      });
    });

    // 6. Delete CPT Post
    $('.sr-btn-delete-cpt').on('click', function() {
      const postId = $(this).data('id');
      const $row = $(this).closest('tr');

      openConfirmDialog(data.strings ? data.strings.confirmDelete : 'حذف این مورد تأیید می‌شود؟', function() {
        $.post(ajaxUrl, {
          action: 'sr_cockpit_delete_cpt_post',
          post_id: postId,
          nonce: nonce
        }, function(res) {
          if (res.success) {
            $row.fadeOut(300, function() { $(this).remove(); });
            showCockpitToast('مورد انتخاب‌شده با موفقیت حذف شد.', true);
          } else {
            showCockpitToast((res.data && res.data.message) || 'خطا در حذف', false);
          }
        });
      });
    });

    // 7. Create User Account (Administrator)
    $('#sr-create-user-form').on('submit', function(e) {
      e.preventDefault();
      const $form = $(this);
      const $feedback = $form.find('.sr-modal-feedback');
      const formData = $form.serializeArray();

      formData.push({ name: 'action', value: 'sr_cockpit_create_user' });
      formData.push({ name: 'nonce', value: nonce });

      $.post(ajaxUrl, formData, function(res) {
        if (res.success) {
          $feedback.text(res.data.message).css('color', '#10B981');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          $feedback.text(res.data.message || 'خطا در ساخت کاربر').css('color', '#EF4444');
        }
      });
    });

    // 8. Delete User
    $('.sr-btn-delete-user').on('click', function() {
      const userId = $(this).data('id');
      const $row = $(this).closest('tr');

      openConfirmDialog(data.strings ? data.strings.confirmDeleteUser : 'آیا از حذف این کاربر اطمینان دارید؟', function() {
        $.post(ajaxUrl, {
          action: 'sr_cockpit_delete_user',
          user_id: userId,
          nonce: nonce
        }, function(res) {
          if (res.success) {
            $row.fadeOut(300, function() { $(this).remove(); });
            showCockpitToast('حساب کاربری با موفقیت حذف شد.', true);
          } else {
            showCockpitToast((res.data && res.data.message) || 'خطا در حذف کاربر', false);
          }
        });
      });
    });

    // 9. In-Dashboard Hardened Plugin Installation, Toggle & Rollback
    $('.sr-btn-install-pkg').on('click', function() {
      const $btn = $(this);
      const $card = $btn.closest('.sr-plugin-card');
      const slug = $btn.data('slug');
      const remoteUrl = ($card.find('.sr-plugin-remote-url').val() || '').trim();
      const expectedSha256 = ($card.find('.sr-plugin-sha256').val() || '').trim();
      const prevText = $btn.text();

      $btn.prop('disabled', true).text('در حال بررسی امضا، بکاپ و نصب...');

      $.post(ajaxUrl, {
        action: 'sr_cockpit_install_plugin',
        plugin_slug: slug,
        remote_url: remoteUrl,
        expected_sha256: expectedSha256,
        nonce: nonce
      }, function(res) {
        if (res.success) {
          $btn.text('فعال شد').css('background', '#10B981');
          showCockpitToast((res.data && res.data.message) || 'افزونه با موفقیت فعال شد.', true);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          $btn.prop('disabled', false).text(prevText || 'تلاش مجدد');
          showCockpitToast((res.data && res.data.message) || 'خطا در نصب افزونه', false);
        }
      }).fail(function() {
        $btn.prop('disabled', false).text(prevText || 'تلاش مجدد');
        showCockpitToast('خطای ارتباط با سرور هنگام نصب افزونه.', false);
      });
    });

    $('.sr-btn-toggle-pkg').on('click', function() {
      const $btn = $(this);
      const slug = $btn.data('slug');
      $btn.prop('disabled', true);
      $.post(ajaxUrl, {
        action: 'sr_cockpit_toggle_plugin',
        plugin_slug: slug,
        nonce: nonce
      }, function(res) {
        if (res.success) {
          showCockpitToast((res.data && res.data.message) || 'وضعیت افزونه تغییر یافت.', true);
          setTimeout(() => {
            window.location.reload();
          }, 800);
        } else {
          $btn.prop('disabled', false);
          showCockpitToast((res.data && res.data.message) || 'خطا در تغییر وضعیت افزونه.', false);
        }
      }).fail(function() {
        $btn.prop('disabled', false);
        showCockpitToast('خطای ارتباط با سرور هنگام تغییر وضعیت افزونه.', false);
      });
    });

    $('.sr-btn-rollback-pkg').on('click', function() {
      const $btn = $(this);
      const slug = $btn.data('slug');
      const msg = (data.strings && data.strings.confirmRollbackPkg) || `آیا از بازگشت افزونه «${slug}» به نسخه قبل اطمینان دارید؟`;
      openConfirmDialog(msg, function() {
        $btn.prop('disabled', true).text('در حال بازگشت...');
        $.post(ajaxUrl, {
          action: 'sr_cockpit_rollback_plugin',
          plugin_slug: slug,
          nonce: nonce
        }, function(res) {
          if (res.success) {
            showCockpitToast((res.data && res.data.message) || 'رول‌بک افزونه انجام شد.', true);
            setTimeout(() => {
              window.location.reload();
            }, 900);
          } else {
            $btn.prop('disabled', false).text('بازگشت به نسخه قبل (Rollback)');
            showCockpitToast((res.data && res.data.message) || 'خطا در رول‌بک افزونه.', false);
          }
        }).fail(function() {
          $btn.prop('disabled', false).text('بازگشت به نسخه قبل (Rollback)');
          showCockpitToast('خطای سرور هنگام اجرای رول‌بک افزونه.', false);
        });
      });
    });

    // 10. User Search / Filter
    $('#sr-user-search-input, #sr-user-role-filter').on('input change', function() {
      const q = $('#sr-user-search-input').val().toLowerCase();
      const role = $('#sr-user-role-filter').val().toLowerCase();

      $('#sr-users-table tbody tr').each(function() {
        const text = $(this).text().toLowerCase();
        const matchesQ = !q || text.includes(q);
        const matchesRole = !role || text.includes(role);

        if (matchesQ && matchesRole) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    });

    // 11. Visual Site Kit Builder Interactivity
    const nichePresets = {
      general: {
        slug: 'custom-general-kit',
        widgets: ['hero', 'cta', 'faq', 'posts', 'testimonials', 'stat_counter', 'contact_booking'],
        templates: ['template-home-saas-master', 'template-header-sticky-glass', 'template-footer-rich', 'template-contact-booking-split']
      },
      legal: {
        slug: 'sedrazavi-legal-kit',
        widgets: ['case_timeline', 'client_portal', 'contact_booking', 'faq', 'firm_milestones', 'hero', 'services_grid', 'testimonials'],
        templates: ['template-case-timeline', 'template-contact-booking-split', 'template-header-sticky-glass', 'template-footer-mega-4col', 'popup-status-tracker']
      },
      creative: {
        slug: 'sedrazavi-agency-kit',
        widgets: ['hero_split', 'bento_tabs', 'radar_chart', 'stat_counter', 'story_bar', 'video', 'before_after', 'theme_toggle'],
        templates: ['template-designer-landing', 'template-home-creative-agency', 'template-bento-services-grid', 'template-portfolio-showcase', 'popup-story-modal']
      },
      healthcare: {
        slug: 'sedrazavi-clinic-kit',
        widgets: ['contact_booking', 'faq', 'services_grid', 'team', 'testimonials', 'stat_counter', 'hero', 'before_after'],
        templates: ['template-contact-booking-split', 'template-header-sticky-glass', 'template-footer-rich', 'popup-booking-lead']
      },
      enterprise: {
        slug: 'sedrazavi-corporate-kit',
        widgets: ['hero', 'firm_milestones', 'pricing_matrix', 'pricing_switcher', 'team', 'testimonials', 'dynamic_grid', 'posts'],
        templates: ['template-home-corporate-pro', 'template-pricing-matrix-table', 'template-footer-mega-4col', 'template-header-sticky-glass']
      },
      education: {
        slug: 'sedrazavi-education-kit',
        widgets: ['spotplayer_course', 'video', 'faq', 'stat_counter', 'testimonials', 'pricing_switcher', 'download_box'],
        templates: ['template-single-video-player', 'template-video-archive', 'template-pricing-table', 'template-podcast-hub']
      },
      publishing: {
        slug: 'sedrazavi-news-kit',
        widgets: ['news_ticker', 'posts', 'story_bar', 'theme_toggle', 'banner_slider', 'video'],
        templates: ['template-archive-blog-grid', 'template-single-post-modern', 'template-header-sticky-glass', 'template-footer-rich']
      },
      commerce: {
        slug: 'sedrazavi-store-kit',
        widgets: ['fomo_countdown', 'pricing_switcher', 'vip_pricing', 'pricing_matrix', 'cta', 'banner_slider', 'before_after'],
        templates: ['template-store-showcase', 'template-single-product-master', 'template-vip-pricing-tier', 'template-pricing-table']
      }
    };

    function updateRadarStats() {
      const widgetCount = $('.sr-sitekit-widget-cb:checked').length;
      const tplCount = $('.sr-sitekit-tpl-cb:checked').length;
      const blockCount = $('.sr-sitekit-block-cb:checked').length;
      const cptCount = $('.sr-sitekit-cpt-cb:checked').length;
      $('#sr-sitekit-widget-count').text(widgetCount);
      $('#sr-sitekit-tpl-count').text(tplCount);
      $('#sr-sitekit-block-count').text(blockCount);
      $('#sr-sitekit-cpt-count').text(cptCount);

      let needsQuery = false;
      $('.sr-sitekit-widget-cb:checked').each(function() {
        const val = $(this).val();
        if (['dynamic_grid', 'posts', 'services_grid'].includes(val)) {
          needsQuery = true;
        }
      });

      if (needsQuery) {
        $('#sr-sitekit-query-dep').text('فعال (نیاز به Dynamic Query Engine)').css('color', '#3B82F6');
      } else {
        $('#sr-sitekit-query-dep').text('سبک (بدون نیاز به موتور کوئری)').css('color', '#10B981');
      }
    }

    $('.sr-niche-pill').on('click', function() {
      $('.sr-niche-pill').removeClass('active');
      $(this).addClass('active');

      const niche = $(this).data('niche');
      const preset = nichePresets[niche];
      if (preset) {
        $('#sr_sitekit_slug').val(preset.slug);

        $('.sr-sitekit-widget-cb').each(function() {
          const val = $(this).val();
          $(this).prop('checked', preset.widgets.includes(val));
        });

        $('.sr-sitekit-tpl-cb').each(function() {
          const val = $(this).val();
          $(this).prop('checked', preset.templates.includes(val));
        });

        updateRadarStats();
      }
    });

    $('.sr-sitekit-widget-cb, .sr-sitekit-tpl-cb, .sr-sitekit-block-cb, .sr-sitekit-cpt-cb').on('change', function() {
      updateRadarStats();
    });

    $('#sr-btn-select-all-widgets').on('click', function() {
      $('.sr-sitekit-widget-cb').prop('checked', true);
      updateRadarStats();
    });

    $('#sr-btn-deselect-all-widgets').on('click', function() {
      $('.sr-sitekit-widget-cb').prop('checked', false);
      updateRadarStats();
    });

    $('#sr-btn-select-all-templates').on('click', function() {
      $('.sr-sitekit-tpl-cb').prop('checked', true);
      updateRadarStats();
    });

    $('#sr-btn-deselect-all-templates').on('click', function() {
      $('.sr-sitekit-tpl-cb').prop('checked', false);
      updateRadarStats();
    });

    $('#sr-btn-select-all-blocks').on('click', function() {
      $('.sr-sitekit-block-cb').prop('checked', true);
      updateRadarStats();
    });

    $('#sr-btn-deselect-all-blocks').on('click', function() {
      $('.sr-sitekit-block-cb').prop('checked', false);
      updateRadarStats();
    });

    function getSelectedWidgets() {
      const arr = [];
      $('.sr-sitekit-widget-cb:checked').each(function() {
        arr.push($(this).val());
      });
      return arr;
    }

    function getSelectedTemplates() {
      const arr = [];
      $('.sr-sitekit-tpl-cb:checked').each(function() {
        arr.push($(this).val());
      });
      return arr;
    }

    function getSelectedBlocks() {
      const arr = [];
      $('.sr-sitekit-block-cb:checked').each(function() {
        arr.push($(this).val());
      });
      return arr;
    }

    function getSelectedCpts() {
      const arr = [];
      $('.sr-sitekit-cpt-cb:checked').each(function() {
        arr.push($(this).val());
      });
      return arr;
    }

    function showSitekitFeedback(msg, isSuccess) {
      const $fb = $('#sr-sitekit-feedback');
      $fb.text(msg).css({
        display: 'block',
        background: isSuccess ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
        color: isSuccess ? '#10B981' : '#EF4444',
        border: '1px solid ' + (isSuccess ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)')
      });
    }

    // 12. Preflight Check
    $('#sr-btn-sitekit-preflight').on('click', function() {
      const $btn = $(this);
      const widgets = getSelectedWidgets();
      const templates = getSelectedTemplates();
      const blocks = getSelectedBlocks();
      const cpts = getSelectedCpts();

      $btn.prop('disabled', true).text('در حال اجرای ممیزی پیش‌پرواز...');

      $.post(ajaxUrl, {
        action: 'sr_cockpit_preflight_sitekit',
        nonce: nonce,
        project_name: $('#sr_sitekit_name').val(),
        project_slug: $('#sr_sitekit_slug').val(),
        widgets: widgets,
        templates: templates,
        blocks: blocks,
        cpts: cpts
      }, function(res) {
        $btn.prop('disabled', false).text('🔍 اعتبارسنجی پیش‌پرواز (Preflight Check)');
        if (res.success) {
          showSitekitFeedback(res.data.message, true);
        } else {
          showSitekitFeedback(res.data.message || 'خطا در ارزیابی پیش‌پرواز', false);
        }
      }).fail(function() {
        $btn.prop('disabled', false).text('🔍 اعتبارسنجی پیش‌پرواز (Preflight Check)');
        showSitekitFeedback('خطای ارتباط با سرور هنگام پیش‌پرواز.', false);
      });
    });

    // 13. Build & Download Custom Bundle ZIP
    $('#sr-btn-sitekit-build').on('click', function() {
      const $btn = $(this);
      const name = $('#sr_sitekit_name').val();
      const slug = $('#sr_sitekit_slug').val();
      const niche = $('.sr-niche-pill.active').data('niche') || 'general';
      const widgets = getSelectedWidgets();
      const templates = getSelectedTemplates();
      const blocks = getSelectedBlocks();
      const cpts = getSelectedCpts();

      if (widgets.length === 0 && templates.length === 0 && blocks.length === 0 && cpts.length === 0) {
        showSitekitFeedback('لطفاً حداقل یک ویجت، بلوک، CPT یا قالب را انتخاب کنید.', false);
        return;
      }

      $btn.prop('disabled', true).text('در حال کامپایل بسته مستقل ZIP...');

      $.post(ajaxUrl, {
        action: 'sr_cockpit_build_sitekit_bundle',
        nonce: nonce,
        project_name: name,
        project_slug: slug,
        niche: niche,
        widgets: widgets,
        templates: templates,
        blocks: blocks,
        cpts: cpts,
        include_theme_bridge: 1,
        include_query_engine: 1
      }, function(res) {
        $btn.prop('disabled', false).text('📦 کامپایل و دانلود بسته مستقل ZIP');
        if (res.success) {
          showSitekitFeedback(res.data.message + ' دانلود آغاز شد...', true);
          if (res.data.zip_url) {
            window.location.href = res.data.zip_url;
          }
        } else {
          showSitekitFeedback(res.data.message || 'خطا در ساخت بسته مستقل', false);
        }
      }).fail(function() {
        $btn.prop('disabled', false).text('📦 کامپایل و دانلود بسته مستقل ZIP');
        showSitekitFeedback('خطای اتصال به سرور در تولید بسته.', false);
      });
    });

    // 14. 1-Click Direct Local Installation & Elementor Library Hydration
    $('#sr-btn-sitekit-install').on('click', function() {
      const $btn = $(this);
      const name = $('#sr_sitekit_name').val();
      const slug = $('#sr_sitekit_slug').val();
      const niche = $('.sr-niche-pill.active').data('niche') || 'general';
      const widgets = getSelectedWidgets();
      const templates = getSelectedTemplates();
      const blocks = getSelectedBlocks();
      const cpts = getSelectedCpts();

      openConfirmDialog(`آیا از استقرار مستقیم کیت «${name}» در افزونه‌های همین سایت اطمینان دارید؟`, function() {
        $btn.prop('disabled', true).text('در حال استقرار، فعال‌سازی و تزریق قالب‌ها...');

        $.post(ajaxUrl, {
          action: 'sr_cockpit_install_sitekit_bundle',
          nonce: nonce,
          project_name: name,
          project_slug: slug,
          niche: niche,
          widgets: widgets,
          templates: templates,
          blocks: blocks,
          cpts: cpts,
          include_theme_bridge: 1,
          include_query_engine: 1
        }, function(res) {
          $btn.prop('disabled', false).text('🚀 نصب و فعال‌سازی مستقیم در همین وردپرس');
          if (res.success) {
            showSitekitFeedback(res.data.message, true);
            setTimeout(() => {
              window.location.reload();
            }, 1800);
          } else {
            showSitekitFeedback(res.data.message || 'خطا در نصب مستقیم بسته', false);
          }
        }).fail(function() {
          $btn.prop('disabled', false).text('🚀 نصب و فعال‌سازی مستقیم در همین وردپرس');
          showSitekitFeedback('خطای سرور در استقرار مستقیم افزونه.', false);
        });
      });
    });

    // 15. Site Kit Rollback Handler
    $('#sr-btn-sitekit-rollback').on('click', function() {
      const $btn = $(this);
      const slug = $('#sr_sitekit_slug').val();
      if (!slug) {
        showSitekitFeedback('شناسه انگلیسی بسته (Slug) برای عملیات رول‌بک الزامی است.', false);
        return;
      }
      openConfirmDialog(`آیا از رول‌بک کامل کیت «${slug}» (غیرفعال‌سازی افزونه، حذف فایل‌ها و پاک‌سازی قالب‌های کتابخانه المنتور) اطمینان دارید؟`, function() {
        $btn.prop('disabled', true).text('در حال اجرای رول‌بک کامل...');
        $.post(ajaxUrl, {
          action: 'sr_cockpit_rollback_sitekit',
          nonce: nonce,
          project_slug: slug
        }, function(res) {
          $btn.prop('disabled', false).text('🔄 رول‌بک کامل کیت مستقرشده (Rollback)');
          if (res.success) {
            showSitekitFeedback(res.data.message || 'رول‌بک کامل با موفقیت انجام شد.', true);
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            showSitekitFeedback((res.data && res.data.message) || 'خطا در اجرای رول‌بک کیت.', false);
          }
        }).fail(function() {
          $btn.prop('disabled', false).text('🔄 رول‌بک کامل کیت مستقرشده (Rollback)');
          showSitekitFeedback('خطای ارتباط با سرور هنگام اجرای رول‌بک.', false);
        });
      });
    });

    // 16. Bulk CSV User Import & Export
    $('#sr-btn-open-bulk-users').on('click', function() {
      $('#sr-bulk-users-modal').fadeIn(200);
    });

    $('#sr-bulk-users-form').on('submit', function(e) {
      e.preventDefault();
      const $form = $(this);
      const $feedback = $form.find('.sr-modal-feedback');
      const csvData = $('#sr-bulk-users-csv').val();

      $.post(ajaxUrl, {
        action: 'sr_cockpit_bulk_import_users',
        nonce: nonce,
        csv_data: csvData
      }, function(res) {
        if (res.success) {
          $feedback.text(res.data.message).css('color', '#10B981');
          setTimeout(() => {
            window.location.reload();
          }, 1200);
        } else {
          $feedback.text((res.data && res.data.message) || 'خطا در درون‌ریزی CSV').css('color', '#EF4444');
        }
      }).fail(function() {
        $feedback.text('خطای ارتباط با سرور هنگام درون‌ریزی CSV.').css('color', '#EF4444');
      });
    });

    $('#sr-btn-export-users-csv').on('click', function() {
      const $btn = $(this);
      $btn.prop('disabled', true).text('در حال آماده‌سازی CSV...');
      $.post(ajaxUrl, {
        action: 'sr_cockpit_export_users_csv',
        nonce: nonce
      }, function(res) {
        $btn.prop('disabled', false).text('📤 خروجی CSV کاربران');
        if (res.success && res.data && res.data.csv) {
          const blob = new Blob([res.data.csv], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.setAttribute('href', url);
          link.setAttribute('download', res.data.filename || 'sedrazavi-users.csv');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        } else {
          showCockpitToast((res.data && res.data.message) || 'خطا در خروجی CSV کاربران', false);
        }
      }).fail(function() {
        $btn.prop('disabled', false).text('📤 خروجی CSV کاربران');
        showCockpitToast('خطای سرور در تولید خروجی CSV.', false);
      });
    });

    // 17. Save WordPress Site Settings & Design Tokens directly to wp_options
    $('#sr-site-settings-form').on('submit', function(e) {
      e.preventDefault();
      const $form = $(this);
      const $btn = $form.find('button[type="submit"]');
      const $fb = $('#sr-site-settings-feedback');
      const formData = $form.serializeArray();
      formData.push({ name: 'action', value: 'sr_cockpit_save_site_settings' });
      formData.push({ name: 'nonce', value: nonce });

      $btn.prop('disabled', true).text('در حال ذخیره در دیتابیس...');
      $.post(ajaxUrl, formData, function(res) {
        $btn.prop('disabled', false).text('💾 ذخیره مستقیم در دیتابیس وردپرس (wp_options)');
        if (res.success) {
          $fb.text(res.data.message).css('color', '#10B981');
        } else {
          $fb.text((res.data && res.data.message) || 'خطا در ذخیره تنظیمات.').css('color', '#EF4444');
        }
      }).fail(function() {
        $btn.prop('disabled', false).text('💾 ذخیره مستقیم در دیتابیس وردپرس (wp_options)');
        $fb.text('خطای ارتباط با سرور.').css('color', '#EF4444');
      });
    });

  });
})(jQuery);
