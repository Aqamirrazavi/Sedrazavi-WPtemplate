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
        var detailsField = form.querySelector('textarea[name="details"], textarea[name="message"], input[name="subject"]');
        var btn = form.querySelector('button[type="submit"]');

        if (!nameField || !nameField.value.trim() || !phoneField || !phoneField.value.trim()) {
          showInlineStatus(fb, 'لطفاً نام و شماره موبایل معتبر وارد کنید.', true);
          return;
        }

        var cfg = window.uasFrontendConfig || {};
        var endpoint = (cfg.restUrl || '/wp-json/sedrazavi/v1/').replace(/\/+$/, '') + '/inquiry/submit';
        var origText = btn ? btn.textContent : '';
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'در حال ارسال...';
        }

        fetch(endpoint, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': cfg.restNonce || ''
          },
          body: JSON.stringify({
            full_name: nameField.value.trim(),
            phone: phoneField.value.trim(),
            service_type: 'standalone_booking_block',
            details: detailsField ? detailsField.value.trim() : ''
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
            showInlineStatus(fb, result.data.message || ('درخواست مشاوره با کد پیگیری ' + (result.data.tracking_code || '') + ' ثبت شد.'), false);
            form.reset();
          })
          .catch(function (err) {
            showInlineStatus(fb, (err && err.message) ? err.message : 'خطا در برقراری ارتباط با سرور.', true);
          })
          .finally(function () {
            if (btn) {
              btn.disabled = false;
              btn.textContent = origText;
            }
          });
      });
    });

    // 3. Quick Checkout Form (Zero alert, Real Endpoint Guard - Never fabricates fake payment IDs)
    document.querySelectorAll('.uas-qc-form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var fb = form.querySelector('.uas-qc-feedback');
        var nameInput = form.querySelector('input[name="client_name"]');
        var phoneInput = form.querySelector('input[name="client_phone"]');
        var amountInput = form.querySelector('input[name="amount"]');
        var checkoutUrl = form.getAttribute('data-checkout-url') || '';
        var btn = form.querySelector('button[type="submit"]');

        if (!nameInput || !nameInput.value.trim() || !phoneInput || !phoneInput.value.trim()) {
          showInlineStatus(fb, 'لطفاً نام موکل و شماره تلفن همراه معتبر را وارد کنید.', true);
          return;
        }

        var amountVal = amountInput ? parseInt(amountInput.value, 10) || 0 : 0;
        if (amountVal < 10000) {
          showInlineStatus(fb, 'حداقل مبلغ قابل پرداخت ۱۰,۰۰۰ تومان است.', true);
          return;
        }

        if (!checkoutUrl) {
          showInlineStatus(fb, 'درگاه پرداخت یا صفحه تسویه‌حساب ووکامرس در تنظیمات این بلوک پیکربندی نشده است.', true);
          return;
        }

        var cfg = window.uasFrontendConfig || {};
        var endpoint = (cfg.restUrl || '/wp-json/sedrazavi/v1/').replace(/\/+$/, '') + '/inquiry/submit';
        var origText = btn ? btn.textContent : '';
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'در حال ثبت و هدایت به درگاه...';
        }

        fetch(endpoint, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': cfg.restNonce || ''
          },
          body: JSON.stringify({
            name: nameInput.value.trim(),
            phone: phoneInput.value.trim(),
            service_type: 'quick_checkout_init',
            details: 'درخواست پرداخت مبلغ: ' + amountVal + ' تومان'
          })
        })
          .then(function (res) {
            return res.json().then(function (data) {
              return { ok: res.ok, data: data };
            });
          })
          .then(function (result) {
            if (!result.ok || !result.data || !result.data.success) {
              throw new Error((result.data && result.data.message) || 'ثبت پیش‌فاکتور در سرور انجام نشد.');
            }
            showInlineStatus(fb, 'درخواست با کد پیگیری ' + (result.data.tracking_code || '') + ' ثبت شد؛ در حال انتقال به صفحه تسویه‌حساب...', false);
            setTimeout(function () {
              window.location.href = checkoutUrl;
            }, 400);
          })
          .catch(function (err) {
            showInlineStatus(fb, (err && err.message) ? err.message : 'خطا در اتصال به سرور پرداخت.', true);
          })
          .finally(function () {
            if (btn) {
              btn.disabled = false;
              btn.textContent = origText;
            }
          });
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
