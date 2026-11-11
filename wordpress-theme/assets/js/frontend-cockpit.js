/**
 * Frontend Cockpit JavaScript Interactions
 * Vanilla ES6 (< 15KB), Responsive Tabs, AJAX Modals, Database Sync
 */

(function($) {
  'use strict';

  $(document).ready(function() {
    const data = window.srCockpitData || {};
    const ajaxUrl = data.ajaxUrl || '/wp-admin/admin-ajax.php';
    const nonce = data.nonce || '';

    // 1. Tab Switching
    $('.sr-tab-btn').on('click', function() {
      const target = $(this).data('tab');
      $('.sr-tab-btn').removeClass('active');
      $(this).addClass('active');

      $('.sr-tab-pane').removeClass('active');
      $('#' + target).addClass('active');
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

    // 3. Logout Button
    $('#sr-cockpit-logout-btn').on('click', function() {
      if (confirm('آیا از خروج از حساب کاربری اطمینان دارید؟')) {
        $.post(ajaxUrl, {
          action: 'sr_cockpit_db_logout',
          nonce: nonce
        }, function(res) {
          window.location.reload();
        });
      }
    });

    // 4. Modal Open & Close Controls
    $('#sr-btn-new-cpt').on('click', function() {
      $('#sr-cpt-modal').fadeIn(200);
    });

    $('#sr-btn-new-user').on('click', function() {
      $('#sr-user-modal').fadeIn(200);
    });

    $('.sr-modal-close, .sr-modal-cancel').on('click', function() {
      $('.sr-modal').fadeOut(200);
    });

    $(window).on('click', function(e) {
      if ($(e.target).hasClass('sr-modal')) {
        $('.sr-modal').fadeOut(200);
      }
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

    // 6. Delete CPT Post
    $('.sr-btn-delete-cpt').on('click', function() {
      const postId = $(this).data('id');
      const $row = $(this).closest('tr');

      if (confirm(data.strings ? data.strings.confirmDelete : 'حذف این مورد تأیید می‌شود؟')) {
        $.post(ajaxUrl, {
          action: 'sr_cockpit_delete_cpt_post',
          post_id: postId,
          nonce: nonce
        }, function(res) {
          if (res.success) {
            $row.fadeOut(300, function() { $(this).remove(); });
          } else {
            alert(res.data.message || 'خطا در حذف');
          }
        });
      }
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

      if (confirm(data.strings ? data.strings.confirmDeleteUser : 'آیا از حذف این کاربر اطمینان دارید؟')) {
        $.post(ajaxUrl, {
          action: 'sr_cockpit_delete_user',
          user_id: userId,
          nonce: nonce
        }, function(res) {
          if (res.success) {
            $row.fadeOut(300, function() { $(this).remove(); });
          } else {
            alert(res.data.message || 'خطا در حذف کاربر');
          }
        });
      }
    });

    // 9. In-Dashboard 1-Click Plugin Installation
    $('.sr-btn-install-pkg').on('click', function() {
      const $btn = $(this);
      const slug = $btn.data('slug');

      $btn.prop('disabled', true).text('در حال استخراج و فعال‌سازی...');

      $.post(ajaxUrl, {
        action: 'sr_cockpit_install_plugin',
        plugin_slug: slug,
        nonce: nonce
      }, function(res) {
        if (res.success) {
          $btn.text('فعال شد').css('background', '#10B981');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          $btn.prop('disabled', false).text('تلاش مجدد');
          alert(res.data.message || 'خطا در نصب افزونه');
        }
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
      $('#sr-sitekit-widget-count').text(widgetCount);
      $('#sr-sitekit-tpl-count').text(tplCount);

      // Check if any query widget is selected
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

        // Update widget checkboxes
        $('.sr-sitekit-widget-cb').each(function() {
          const val = $(this).val();
          $(this).prop('checked', preset.widgets.includes(val));
        });

        // Update template checkboxes
        $('.sr-sitekit-tpl-cb').each(function() {
          const val = $(this).val();
          $(this).prop('checked', preset.templates.includes(val));
        });

        updateRadarStats();
      }
    });

    $('.sr-sitekit-widget-cb, .sr-sitekit-tpl-cb').on('change', function() {
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

      $btn.prop('disabled', true).text('در حال اجرای ممیزی پیش‌پرواز...');

      $.post(ajaxUrl, {
        action: 'sr_cockpit_preflight_sitekit',
        nonce: nonce,
        widgets: widgets,
        templates: templates
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

      if (widgets.length === 0 && templates.length === 0) {
        alert('لطفاً حداقل یک ویجت یا یک قالب را انتخاب کنید.');
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

      if (!confirm(`آیا از استقرار مستقیم کیت «${name}» در افزونه‌های همین سایت اطمینان دارید؟`)) {
        return;
      }

      $btn.prop('disabled', true).text('در حال استقرار، فعال‌سازی و تزریق قالب‌ها...');

      $.post(ajaxUrl, {
        action: 'sr_cockpit_install_sitekit_bundle',
        nonce: nonce,
        project_name: name,
        project_slug: slug,
        niche: niche,
        widgets: widgets,
        templates: templates,
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
})(jQuery);
