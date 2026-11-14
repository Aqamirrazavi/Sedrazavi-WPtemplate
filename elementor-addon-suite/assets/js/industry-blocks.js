/**
 * Universal Industry Blocks Runtime JS
 * Handles live legal/structural calculations, dental booking AJAX, and customs tracking without window.alert().
 */
(function () {
  'use strict';

  function formatFaNumber(num) {
    return Math.round(num).toLocaleString('fa-IR');
  }

  function initLegalCalculator() {
    var claimInput = document.getElementById('uas-law-claim');
    var forumSelect = document.getElementById('uas-law-forum');
    var courtEl = document.getElementById('uas-law-court-fee');
    var attorneyEl = document.getElementById('uas-law-attorney-fee');
    var taxEl = document.getElementById('uas-law-tax-fee');

    if (!claimInput || !forumSelect || !courtEl || !attorneyEl || !taxEl) {
      return;
    }

    var multipliers = {
      first_instance: { court: 0.035, attorney: 0.07 },
      appeal: { court: 0.045, attorney: 0.085 },
      supreme: { court: 0.055, attorney: 0.1 },
      arbitration: { court: 0.03, attorney: 0.08 }
    };

    function update() {
      var claim = Math.max(0, parseFloat(claimInput.value) || 0);
      var forum = forumSelect.value || 'first_instance';
      var rates = multipliers[forum] || multipliers.first_instance;

      var courtFee = claim * rates.court;
      var attorneyFee = Math.max(5000000, claim * rates.attorney);
      var taxFee = attorneyFee * 0.05;

      courtEl.textContent = formatFaNumber(courtFee) + ' تومان';
      attorneyEl.textContent = formatFaNumber(attorneyFee) + ' تومان';
      taxEl.textContent = formatFaNumber(taxFee) + ' تومان';
    }

    claimInput.addEventListener('input', update);
    forumSelect.addEventListener('change', update);
    update();
  }

  function initEngineeringCalculator() {
    var areaInput = document.getElementById('uas-eng-area');
    var systemSelect = document.getElementById('uas-eng-system');
    var steelEl = document.getElementById('uas-eng-steel');
    var concreteEl = document.getElementById('uas-eng-concrete');
    var durationEl = document.getElementById('uas-eng-duration');

    if (!areaInput || !systemSelect || !steelEl || !concreteEl || !durationEl) {
      return;
    }

    var specs = {
      concrete_moment: { steelKgPerM2: 50, concreteM3PerM2: 0.4, speedM2PerMonth: 260 },
      concrete_wall: { steelKgPerM2: 56, concreteM3PerM2: 0.45, speedM2PerMonth: 240 },
      steel_braced: { steelKgPerM2: 68, concreteM3PerM2: 0.22, speedM2PerMonth: 340 }
    };

    function update() {
      var area = Math.max(50, parseFloat(areaInput.value) || 0);
      var sys = systemSelect.value || 'concrete_moment';
      var s = specs[sys] || specs.concrete_moment;

      var steelTonsMin = (area * s.steelKgPerM2 * 0.95) / 1000;
      var steelTonsMax = (area * s.steelKgPerM2 * 1.05) / 1000;
      var concreteM3 = area * s.concreteM3PerM2;
      var months = Math.max(2, Math.ceil(area / s.speedM2PerMonth));

      steelEl.textContent = formatFaNumber(steelTonsMin) + ' تا ' + formatFaNumber(steelTonsMax) + ' تن فولاد مصرفی';
      concreteEl.textContent = formatFaNumber(concreteM3) + ' مترمکعب بتن رده C30';
      durationEl.textContent = formatFaNumber(months) + ' ماه با مدیریت پیمان تخصصی';
    }

    areaInput.addEventListener('input', update);
    systemSelect.addEventListener('change', update);
    update();
  }

  function showInlineMessage(el, msg, isError) {
    if (!el) return;
    el.style.display = 'block';
    el.style.padding = '10px 14px';
    el.style.marginTop = '12px';
    el.style.borderRadius = '8px';
    el.style.fontSize = '13px';
    el.style.border = isError ? '1px solid #ef4444' : '1px solid #10b981';
    el.style.background = isError ? 'rgba(239,68,68,0.12)' : 'rgba(16,185,129,0.12)';
    el.style.color = isError ? '#fca5a5' : '#6ee7b7';
    el.textContent = msg;
  }

  function initDentalBookingForms() {
    var forms = document.querySelectorAll('.uas-dental-form');
    var cfg = window.uasIndustryConfig || {};

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var feedback = form.querySelector('.uas-form-feedback');
        var nameInput = form.querySelector('input[name="patient_name"]');
        var treatmentSel = form.querySelector('select[name="treatment"]');
        var shiftSel = form.querySelector('select[name="shift"]');
        var submitBtn = form.querySelector('button[type="submit"]');

        var patientName = nameInput ? nameInput.value.trim() : '';
        if (!patientName) {
          showInlineMessage(feedback, 'لطفاً نام و شماره تماس خود را وارد نمایید.', true);
          return;
        }

        if (!cfg.ajaxUrl) {
          showInlineMessage(feedback, 'درخواست نوبت معاینه ثبت موقت شد؛ برای اتصال زنده با وردپرس افزونه را فعال کنید.', false);
          return;
        }

        if (submitBtn) submitBtn.disabled = true;

        var body = new URLSearchParams();
        body.append('action', 'uas_submit_dental_booking');
        body.append('nonce', cfg.nonce || '');
        body.append('patient_name', patientName);
        body.append('treatment', treatmentSel ? treatmentSel.value : '');
        body.append('shift', shiftSel ? shiftSel.value : '');

        fetch(cfg.ajaxUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
          body: body.toString(),
          credentials: 'same-origin'
        })
          .then(function (r) { return r.json(); })
          .then(function (res) {
            if (res && res.success) {
              showInlineMessage(feedback, res.data.message || 'نوبت معاینه شما با موفقیت ثبت شد.', false);
              form.reset();
            } else {
              var errMsg = (res && res.data && res.data.message) ? res.data.message : 'خطا در ثبت نوبت.';
              showInlineMessage(feedback, errMsg, true);
            }
          })
          .catch(function () {
            showInlineMessage(feedback, 'خطا در ارتباط با سرور کلینیک.', true);
          })
          .finally(function () {
            if (submitBtn) submitBtn.disabled = false;
          });
      });
    });
  }

  function initCustomsTrackers() {
    var trackers = document.querySelectorAll('.uas-customs-tracker');
    var cfg = window.uasIndustryConfig || {};

    trackers.forEach(function (box) {
      var input = box.querySelector('input[name="cotage_number"]');
      var btn = box.querySelector('.uas-customs-submit');
      var resultEl = box.querySelector('.uas-customs-result');

      if (!btn || !input) return;

      btn.addEventListener('click', function () {
        var code = input.value.trim();
        if (!code) {
          showInlineMessage(resultEl, 'لطفاً شماره ثبت سفارش یا کوتاژ گمرکی را وارد کنید.', true);
          return;
        }

        if (!cfg.ajaxUrl) {
          showInlineMessage(resultEl, 'امکان استعلام مستقیم بدون اتصال فعال به سرور وردپرس وجود ندارد.', true);
          return;
        }

        btn.disabled = true;
        var body = new URLSearchParams();
        body.append('action', 'uas_track_customs');
        body.append('nonce', cfg.nonce || '');
        body.append('cotage_number', code);

        fetch(cfg.ajaxUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
          body: body.toString(),
          credentials: 'same-origin'
        })
          .then(function (r) { return r.json(); })
          .then(function (res) {
            if (res && res.success && res.data) {
              showInlineMessage(resultEl, res.data.message, false);
            } else {
              var errMsg = (res && res.data && res.data.message) ? res.data.message : 'رکورد کوتاژ در سامانه یافت نشد.';
              showInlineMessage(resultEl, errMsg, true);
            }
          })
          .catch(function () {
            showInlineMessage(resultEl, 'خطا در برقراری ارتباط با سرویس استعلام.', true);
          })
          .finally(function () {
            btn.disabled = false;
          });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initLegalCalculator();
    initEngineeringCalculator();
    initDentalBookingForms();
    initCustomsTrackers();
  });
})();
