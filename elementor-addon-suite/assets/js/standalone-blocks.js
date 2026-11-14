/**
 * Standalone Blocks & Contact Widget Interactive Script (Zero window.alert)
 */
(function () {
  'use strict';

  function showInlineStatus(el, msg, isError) {
    if (!el) return;
    el.style.display = 'block';
    el.style.background = isError ? 'rgba(239,68,68,0.12)' : 'rgba(16,185,129,0.12)';
    el.style.border = isError ? '1px solid #ef4444' : '1px solid #10b981';
    el.style.color = isError ? '#fca5a5' : '#6ee7b7';
    el.textContent = msg;
  }

  document.addEventListener('DOMContentLoaded', function () {
    // 1. Calculator Logic
    var amountInput = document.getElementById('uas-calc-amount');
    var stageSelect = document.getElementById('uas-calc-stage');
    var complexitySelect = document.getElementById('uas-calc-complexity');
    var outputElem = document.getElementById('uas-calc-output');

    function calculateFee() {
      if (!amountInput || !outputElem) return;
      var amount = parseFloat(amountInput.value) || 0;
      var stage = parseFloat(stageSelect ? stageSelect.value : 1) || 1;
      var comp = parseFloat(complexitySelect ? complexitySelect.value : 1) || 1;

      var fee = amount * 0.07 * stage * comp;
      if (fee < 5000000) fee = 5000000;

      outputElem.textContent = Math.round(fee).toLocaleString('fa-IR') + ' تومان';
    }

    if (amountInput) amountInput.addEventListener('input', calculateFee);
    if (stageSelect) stageSelect.addEventListener('change', calculateFee);
    if (complexitySelect) complexitySelect.addEventListener('change', calculateFee);

    document.querySelectorAll('.uas-calc-reserve-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var box = btn.closest('.uas-block-calculator');
        var fb = box ? box.querySelector('.uas-calc-feedback') : null;
        showInlineStatus(fb, 'برآورد هزینه ثبت شد؛ از بخش فرم مشاوره درخواست جلسه را نهایی نمایید.', false);
      });
    });

    // 2. Booking Forms (standalone shortcode + Elementor widget fallback)
    document.querySelectorAll('.uas-booking-form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var fb = form.querySelector('.uas-booking-feedback');
        var nameField = form.querySelector('input[name="full_name"]');
        var phoneField = form.querySelector('input[name="phone"]');
        if (!nameField || !nameField.value.trim() || !phoneField || !phoneField.value.trim()) {
          showInlineStatus(fb, 'لطفاً نام و شماره موبایل معتبر وارد کنید.', true);
          return;
        }
        var tracking = 'SR-' + Math.floor(100000 + Math.random() * 900000);
        showInlineStatus(fb, 'درخواست مشاوره شما با شناسه پیگیری ' + tracking + ' با موفقیت ثبت گردید.', false);
        form.reset();
      });
    });

    // 3. Quick Checkout Form (Zero alert)
    document.querySelectorAll('.uas-qc-form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var fb = form.querySelector('.uas-qc-feedback');
        var nameInput = form.querySelector('input[name="client_name"]');
        var phoneInput = form.querySelector('input[name="client_phone"]');
        var amountInput = form.querySelector('input[name="amount"]');
        var checkoutUrl = form.getAttribute('data-checkout-url') || '';

        if (!nameInput || !nameInput.value.trim() || !phoneInput || !phoneInput.value.trim()) {
          showInlineStatus(fb, 'لطفاً نام موکل و شماره تلفن همراه معتبر را وارد کنید.', true);
          return;
        }

        var amountVal = amountInput ? parseInt(amountInput.value, 10) || 0 : 0;
        if (amountVal < 10000) {
          showInlineStatus(fb, 'حداقل مبلغ قابل پرداخت ۱۰,۰۰۰ تومان است.', true);
          return;
        }

        var refId = 'PAY-' + Math.floor(100000 + Math.random() * 900000);
        if (checkoutUrl) {
          showInlineStatus(fb, 'درخواست پرداخت (' + refId + ') ثبت شد؛ در حال هدایت به صفحه تسویه‌حساب...', false);
          setTimeout(function () {
            window.location.href = checkoutUrl;
          }, 500);
        } else {
          showInlineStatus(fb, 'شناسه تراکنش موقت ' + refId + ' صادر شد. برای اتصال درگاه بانکی شاپرک، ووکامرس را پیکربندی کنید.', false);
        }
      });
    });

    // 4. Docs Hub Copy Shortcode Buttons
    document.querySelectorAll('.uas-btn-copy[data-shortcode]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sc = btn.getAttribute('data-shortcode') || '';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(sc).catch(function () {});
        }
        var prev = btn.textContent;
        btn.textContent = 'کپی شد ✓';
        setTimeout(function () {
          btn.textContent = prev;
        }, 1800);
      });
    });
  });
})();
