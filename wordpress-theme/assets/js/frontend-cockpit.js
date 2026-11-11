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

  });
})(jQuery);
