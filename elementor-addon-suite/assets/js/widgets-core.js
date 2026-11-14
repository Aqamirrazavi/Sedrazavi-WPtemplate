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
        if (!nameInput || !nameInput.value.trim() || !phoneInput || !phoneInput.value.trim()) {
          fb.style.display = 'block';
          fb.style.background = 'rgba(239,68,68,0.12)';
          fb.style.border = '1px solid #ef4444';
          fb.style.color = '#fca5a5';
          fb.textContent = 'لطفاً نام و شماره موبایل را کامل وارد نمایید.';
          return;
        }
        var ref = 'SR-' + Math.floor(100000 + Math.random() * 900000);
        fb.style.display = 'block';
        fb.style.background = 'rgba(16,185,129,0.12)';
        fb.style.border = '1px solid #10b981';
        fb.style.color = '#6ee7b7';
        fb.textContent = 'درخواست شما با شناسه پیگیری ' + ref + ' ثبت گردید.';
        form.reset();
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
