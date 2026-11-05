/**
 * Universal Elementor Addon Suite - Admin Settings JS
 * Dark Mode Engine, AJAX Template Importer & Interactive Chart Toggle
 *
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */
(function($) {
  'use strict';

  $(document).ready(function() {
    // 1. Dark Mode Engine (ساختار حالت شب با حافظه محلی)
    var isDarkMode = localStorage.getItem('uas_admin_dark_mode') === 'true';
    if (isDarkMode) {
      $('.uas-admin-wrap').addClass('uas-dark-mode');
      updateThemeToggleBtn(true);
    }

    $('#uas-btn-theme-toggle').on('click', function(e) {
      e.preventDefault();
      var $wrap = $('.uas-admin-wrap');
      var nowDark = !$wrap.hasClass('uas-dark-mode');
      $wrap.toggleClass('uas-dark-mode', nowDark);
      localStorage.setItem('uas_admin_dark_mode', nowDark ? 'true' : 'false');
      updateThemeToggleBtn(nowDark);
    });

    function updateThemeToggleBtn(isDark) {
      var $btn = $('#uas-btn-theme-toggle');
      if (isDark) {
        $btn.html('<span>☀️</span> حالت روز');
      } else {
        $btn.html('<span>🌙</span> حالت شب');
      }
    }

    // 2. Chart Period Toggle (۷ روز گذشته / ۳۰ روز گذشته)
    $('.uas-chart-period-btn').on('click', function(e) {
      e.preventDefault();
      $('.uas-chart-period-btn').removeClass('active');
      $(this).addClass('active');

      var period = $(this).data('period');
      if (period === '30days') {
        $('#uas-chart-path-views').attr('d', 'M 0,110 Q 70,80 140,120 T 280,70 T 420,95 T 560,40');
        $('#uas-chart-path-visitors').attr('d', 'M 0,140 Q 70,120 140,150 T 280,110 T 420,130 T 560,90');
      } else {
        $('#uas-chart-path-views').attr('d', 'M 0,120 Q 70,70 140,90 T 280,45 T 420,60 T 560,30');
        $('#uas-chart-path-visitors').attr('d', 'M 0,150 Q 70,110 140,130 T 280,85 T 420,100 T 560,70');
      }
    });

    // 3. Template Library Category Filter Tabs
    $('.uas-tpl-filter-tab').on('click', function(e) {
      e.preventDefault();
      $('.uas-tpl-filter-tab').removeClass('active');
      $(this).addClass('active');

      var cat = $(this).data('category');
      if (!cat || cat === 'all') {
        $('.uas-template-card-item').fadeIn(200);
      } else {
        $('.uas-template-card-item').hide();
        $('.uas-template-card-item[data-category="' + cat + '"]').fadeIn(200);
      }
    });

    // 4. Batch Re-import Templates AJAX
    $('#uas-btn-reimport-templates').on('click', function(e) {
      e.preventDefault();
      var $btn = $(this);
      var $status = $('#uas-reimport-status');

      $btn.prop('disabled', true).text('در حال درون‌ریزی ۳۰ قالب آماده...');
      $status.removeClass('notice-error notice-success').addClass('notice notice-info').html('<p>در حال بارگذاری فایل‌های JSON و ثبت در کتابخانه المنتور...</p>').show();

      $.ajax({
        url: uasAdminVars.ajaxUrl,
        type: 'POST',
        data: {
          action: 'uas_import_templates',
          nonce: uasAdminVars.nonce
        },
        success: function(response) {
          $btn.prop('disabled', false).text('همگام‌سازی تمامی ۳۰ قالب');
          if (response.success) {
            $status.removeClass('notice-info').addClass('notice notice-success').html(
              '<p><strong>عملیات موفق!</strong> تمامی قالب‌ها و تم‌بیلدر با موفقیت درون‌ریزی شدند. (ایمپورت‌شده: ' + response.data.imported + ' | از پیش موجود: ' + response.data.skipped + ')</p>'
            );
          } else {
            $status.removeClass('notice-info').addClass('notice notice-error').html(
              '<p>خطا در ایمپورت: ' + (response.data.message || 'خطای ناشناخته') + '</p>'
            );
          }
        },
        error: function() {
          $btn.prop('disabled', false).text('همگام‌سازی تمامی ۳۰ قالب');
          $status.removeClass('notice-info').addClass('notice notice-error').html('<p>خطا در برقراری ارتباط با سرور.</p>');
        }
      });
    });

    // 5. Single Template Import AJAX
    $('.uas-import-single-btn').on('click', function(e) {
      e.preventDefault();
      var $btn = $(this);
      var slug = $btn.data('slug');
      if (!slug) return;

      var originalText = $btn.text();
      $btn.prop('disabled', true).text('در حال ثبت...');

      $.ajax({
        url: uasAdminVars.ajaxUrl,
        type: 'POST',
        data: {
          action: 'uas_import_single_template',
          slug: slug,
          nonce: uasAdminVars.nonce
        },
        success: function(response) {
          if (response.success) {
            $btn.css({'background': '#10B981', 'border-color': '#10B981'}).text('✓ نصب شد!');
            setTimeout(function() {
              location.reload();
            }, 800);
          } else {
            $btn.prop('disabled', false).text(originalText);
            alert(response.data && response.data.message ? response.data.message : 'خطا در درون‌ریزی قالب.');
          }
        },
        error: function() {
          $btn.prop('disabled', false).text(originalText);
          alert('خطای ارتباط با سرور.');
        }
      });
    });

    // 6. Toggle All / None Widgets
    $('#uas-btn-enable-all').on('click', function(e) {
      e.preventDefault();
      $('.uas-widget-checkbox').prop('checked', true);
    });

    $('#uas-btn-disable-all').on('click', function(e) {
      e.preventDefault();
      $('.uas-widget-checkbox').prop('checked', false);
    });

    // 7. Custom Project Kit Studio (استودیوی ساخت جعبه‌ابزار سفارشی)
    function updateKitCounters() {
      var wCount = $('.uas-kit-widget-cb:checked').length;
      $('#uas-kit-widgets-selected-count').text(wCount);

      var tCount = $('.uas-kit-template-cb:checked').length;
      $('#uas-kit-templates-selected-count').text(tCount);
    }

    $(document).on('change', '.uas-kit-widget-cb, .uas-kit-template-cb', function() {
      updateKitCounters();
    });

    $('#uas-kit-select-all-widgets').on('click', function(e) {
      e.preventDefault();
      $('.uas-kit-widget-cb').prop('checked', true);
      updateKitCounters();
    });

    $('#uas-kit-deselect-all-widgets').on('click', function(e) {
      e.preventDefault();
      $('.uas-kit-widget-cb').prop('checked', false);
      updateKitCounters();
    });

    $('#uas-kit-select-all-templates').on('click', function(e) {
      e.preventDefault();
      $('.uas-kit-template-cb').prop('checked', true);
      updateKitCounters();
    });

    $('#uas-kit-deselect-all-templates').on('click', function(e) {
      e.preventDefault();
      $('.uas-kit-template-cb').prop('checked', false);
      updateKitCounters();
    });

    $('#uas-btn-build-custom-bundle').on('click', function(e) {
      e.preventDefault();
      var $btn = $(this);
      var $status = $('#uas-custom-bundle-status');

      var projectName = $.trim($('#uas-kit-project-name').val()) || 'پروژه وب‌سایت سفارشی';
      var projectSlug = $.trim($('#uas-kit-project-slug').val()) || 'custom-elementor-kit';
      var niche = $('#uas-kit-niche').val() || 'general';
      var themeBridge = $('#uas-kit-theme-bridge').is(':checked') ? 1 : 0;
      var queryEngine = $('#uas-kit-query-engine').is(':checked') ? 1 : 0;

      var selectedWidgets = [];
      $('.uas-kit-widget-cb:checked').each(function() {
        selectedWidgets.push($(this).val());
      });

      var selectedTemplates = [];
      $('.uas-kit-template-cb:checked').each(function() {
        selectedTemplates.push($(this).val());
      });

      if (selectedWidgets.length === 0 && selectedTemplates.length === 0) {
        alert('لطفاً حداقل یک ویجت یا یک الگوی آماده را برای بسته سفارشی انتخاب فرمایید.');
        return;
      }

      var originalBtnText = $btn.html();
      $btn.prop('disabled', true).html('<span>⏳</span> در حال کامپایل بسته مستقل ZIP...');
      $status.show().html(
        '<div style="background:var(--uas-bg-card); border:1px solid #6366f1; border-radius:10px; padding:16px; margin-top:14px;">' +
        '<div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">' +
        '<span class="spinner is-active" style="float:none; margin:0;"></span>' +
        '<strong style="color:var(--uas-primary); font-size:13px;">سیستم در حال بسته‌بندی افزونه مستقل...</strong>' +
        '</div>' +
        '<p style="font-size:12px; color:var(--uas-text-muted); margin:0;">در حال جمع‌آوری ویجت‌های انتخاب‌شده (' + selectedWidgets.length + ')، الگوهای JSON (' + selectedTemplates.length + ') و تولید فایل‌های بارگذار خودکار وردپرس...</p>' +
        '</div>'
      );

      $.ajax({
        url: uasAdminVars.ajaxUrl,
        type: 'POST',
        data: {
          action: 'uas_build_custom_bundle',
          nonce: uasAdminVars.nonce,
          project_name: projectName,
          project_slug: projectSlug,
          niche: niche,
          include_theme_bridge: themeBridge,
          include_query_engine: queryEngine,
          widgets: selectedWidgets,
          templates: selectedTemplates
        },
        success: function(response) {
          $btn.prop('disabled', false).html(originalBtnText);
          if (response.success && response.data) {
            var data = response.data;
            var html = '<div style="background:linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(5,150,105,0.05) 100%); border:2px solid #10b981; border-radius:12px; padding:20px; margin-top:16px;">' +
              '<div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">' +
              '<div>' +
              '<h4 style="font-size:16px; font-weight:800; color:#065f46; margin:0 0 6px;">🎉 بسته مستقل پروژه با موفقیت کامپایل شد!</h4>' +
              '<p style="font-size:13px; color:#047857; margin:0 0 10px;">' + data.message + '</p>' +
              '<div style="display:flex; flex-wrap:wrap; gap:12px; font-size:12px; color:#334155;">' +
              '<span>📦 <strong>نام فایل:</strong> <code>' + data.filename + '</code></span>' +
              '<span>⚖️ <strong>حجم بسته:</strong> ' + data.filesize + '</span>' +
              '<span>🧩 <strong>تعداد ویجت‌ها:</strong> ' + data.widgets_count + '</span>' +
              '<span>📐 <strong>تعداد قالب‌ها:</strong> ' + data.templates_count + '</span>' +
              '</div>' +
              '</div>' +
              '<a href="' + data.zip_url + '" download class="button button-primary" style="padding:8px 20px; font-size:13px; font-weight:700; height:auto; background:#10b981; border-color:#059669; display:inline-flex; align-items:center; gap:6px;">' +
              '<span>⬇️</span> دانلود مستقیم فایل ZIP' +
              '</a>' +
              '</div>' +
              '<div style="margin-top:16px; border-top:1px dashed rgba(16,185,129,0.4); padding-top:12px; font-size:12px; color:#1e293b; line-height:1.7;">' +
              '<strong>💡 راهنمای استقرار سریع در سایت مشتری:</strong><br>' +
              '۱. وارد پیشخوان وردپرس مشتری شده و در بخش «افزونه‌ها > افزودن»، این فایل ZIP را بارگذاری و فعال فرمایید.<br>' +
              '۲. به محض فعال‌سازی، تمامی ' + data.templates_count + ' قالب انتخاب‌شده خودکار در «الگوهای ذخیره‌شده المنتور» قرار می‌گیرند.<br>' +
              '۳. هر ' + data.widgets_count + ' ویجت انتخاب‌شده در پنل کناری ویرایشگر المنتور آماده درج و ویرایش زنده خواهند بود.<br>' +
              '۴. افزونه تولیدشده ۱۰۰٪ مستقل بوده و به هیچ قالب یا افزونه اضافه‌ای (بجز هسته رایگان المنتور) نیاز ندارد.' +
              '</div>' +
              '</div>';

            $status.html(html);

            // Auto-trigger download
            if (data.zip_url) {
              window.location.href = data.zip_url;
            }
          } else {
            var errMsg = (response.data && response.data.message) ? response.data.message : 'خطای ناشناخته در سرور.';
            $status.html(
              '<div class="notice notice-error" style="padding:12px; margin-top:14px;"><p><strong>خطا در کامپایل بسته:</strong> ' + errMsg + '</p></div>'
            );
          }
        },
        error: function(xhr, status, error) {
          $btn.prop('disabled', false).html(originalBtnText);
          $status.html(
            '<div class="notice notice-error" style="padding:12px; margin-top:14px;"><p><strong>خطای ارتباط شبکه:</strong> ارتباط با سرور برقرار نشد (' + error + ').</p></div>'
          );
        }
      });
    });
  });
})(jQuery);
