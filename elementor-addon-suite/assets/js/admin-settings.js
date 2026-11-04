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
  });
})(jQuery);
