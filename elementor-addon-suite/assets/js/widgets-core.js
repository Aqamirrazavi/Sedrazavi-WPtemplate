/**
 * Universal Elementor Addon Suite - Core Widgets Runtime JS
 * Version: 1.0.0
 */
(function ($) {
  'use strict';

  function bindWidgetBookingForms(scope) {
    var root = scope && scope[0] ? scope[0] : document;
    var forms = root.querySelectorAll('.uas-widget-booking-form');
    forms.forEach(function (form) {
      if (form.dataset.uasBound === '1') return;
      form.dataset.uasBound = '1';
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var fb = form.querySelector('.uas-booking-feedback');
        if (!fb) return;
        var nameInput = form.querySelector('input[name="full_name"]');
        var phoneInput = form.querySelector('input[name="phone"]');
        var detailsInput = form.querySelector('textarea[name="details"], textarea[name="message"], input[name="subject"]');
        var submitBtn = form.querySelector('button[type="submit"]');

        if (!nameInput || !nameInput.value.trim() || !phoneInput || !phoneInput.value.trim()) {
          fb.style.display = 'block';
          fb.style.background = 'rgba(239,68,68,0.12)';
          fb.style.border = '1px solid #ef4444';
          fb.style.color = '#fca5a5';
          fb.textContent = 'لطفاً نام و شماره موبایل را کامل وارد نمایید.';
          return;
        }

        var cfg = window.uasFrontendConfig || {};
        var endpoint = (cfg.restUrl || '/wp-json/sedrazavi/v1/').replace(/\/+$/, '') + '/inquiry/submit';
        var origText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'در حال ارسال...';
        }

        fetch(endpoint, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': cfg.restNonce || ''
          },
          body: JSON.stringify({
            full_name: nameInput.value.trim(),
            phone: phoneInput.value.trim(),
            service_type: 'elementor_contact_booking',
            details: detailsInput ? detailsInput.value.trim() : ''
          })
        })
          .then(function (res) {
            return res.json().then(function (data) {
              return { ok: res.ok, data: data };
            });
          })
          .then(function (result) {
            if (!result.ok || !result.data || !result.data.success) {
              throw new Error((result.data && result.data.message) || 'ثبت درخواست در سرور با خطا مواجه شد.');
            }
            fb.style.display = 'block';
            fb.style.background = 'rgba(16,185,129,0.12)';
            fb.style.border = '1px solid #10b981';
            fb.style.color = '#6ee7b7';
            fb.textContent = result.data.message || ('درخواست شما با شناسه پیگیری ' + (result.data.tracking_code || '') + ' ثبت گردید.');
            form.reset();
          })
          .catch(function (err) {
            fb.style.display = 'block';
            fb.style.background = 'rgba(239,68,68,0.12)';
            fb.style.border = '1px solid #ef4444';
            fb.style.color = '#fca5a5';
            fb.textContent = (err && err.message) ? err.message : 'خطا در ارتباط با سرور.';
          })
          .finally(function () {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = origText;
            }
          });
      });
    });
  }

  $(window).on('elementor/frontend/init', function () {
    bindWidgetBookingForms($(document));
    if (window.elementorFrontend && elementorFrontend.hooks) {
      elementorFrontend.hooks.addAction('frontend/element_ready/uas_contact_booking.default', function ($scope) {
        bindWidgetBookingForms($scope);
      });
    }
  });

  $(document).ready(function () {
    bindWidgetBookingForms($(document));
  });
})(jQuery);
