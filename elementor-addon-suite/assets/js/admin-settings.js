/**
 * Universal Elementor Addon Suite - Admin Settings JS
 */
(function($) {
  'use strict';

  $(document).ready(function() {
    // Re-import Templates AJAX
    $('#uas-btn-reimport-templates').on('click', function(e) {
      e.preventDefault();
      var $btn = $(this);
      var $status = $('#uas-reimport-status');

      $btn.prop('disabled', true).text('در حال ایمپورت تمپلیت‌ها و پاپ‌آپ‌ها...');
      $status.removeClass('notice-error notice-success').addClass('notice notice-info').html('<p>در حال بارگذاری فایل‌های JSON و ثبت در کتابخانه المنتور...</p>').show();

      $.ajax({
        url: uasAdminVars.ajaxUrl,
        type: 'POST',
        data: {
          action: 'uas_import_templates',
          nonce: uasAdminVars.nonce
        },
        success: function(response) {
          $btn.prop('disabled', false).text('ایمپورت مجدد تمپلیت‌ها و پاپ‌آپ‌ها');
          if (response.success) {
            $status.removeClass('notice-info').addClass('notice notice-success').html(
              '<p><strong>عملیات موفق!</strong> تمامی تمپلیت‌ها و پاپ‌آپ‌ها با موفقیت ایمپورت/همگام‌سازی شدند. (ایمپورت‌شده: ' + response.data.imported + ' | از پیش موجود: ' + response.data.skipped + ')</p>'
            );
          } else {
            $status.removeClass('notice-info').addClass('notice notice-error').html(
              '<p>خطا در ایمپورت: ' + (response.data.message || 'خطای ناشناخته') + '</p>'
            );
          }
        },
        error: function() {
          $btn.prop('disabled', false).text('ایمپورت مجدد تمپلیت‌ها و پاپ‌آپ‌ها');
          $status.removeClass('notice-info').addClass('notice notice-error').html('<p>خطا در برقراری ارتباط با سرور.</p>');
        }
      });
    });

    // Toggle All Widgets
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
