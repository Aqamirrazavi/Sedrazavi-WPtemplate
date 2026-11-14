/**
 * SedRazavi Addons Shortcodes Interactive Runtime (REST API + Nonce)
 * Zero fake client-only states; all forms submit to verified WordPress REST endpoints.
 */
(function () {
  'use strict';

  function getRestBase() {
    var cfg = window.sedrazaviAddonsConfig || window.SedRazaviThemeConfig || {};
    return (cfg.restUrl || '/wp-json/sedrazavi/v1/').replace(/\/+$/, '');
  }

  function getNonce() {
    var cfg = window.sedrazaviAddonsConfig || window.SedRazaviThemeConfig || {};
    return cfg.restNonce || '';
  }

  function showStatus(el, msg, isError) {
    if (!el) return;
    el.style.display = 'block';
    el.style.marginTop = '10px';
    el.style.padding = '10px 12px';
    el.style.borderRadius = '10px';
    el.style.fontSize = '12px';
    el.style.background = isError ? 'rgba(239,68,68,0.12)' : 'rgba(16,185,129,0.12)';
    el.style.border = isError ? '1px solid #ef4444' : '1px solid #10b981';
    el.style.color = isError ? '#b91c1c' : '#047857';
    el.textContent = msg;
  }

  function setDarkAwareStatus(el, msg, isError, darkMode) {
    showStatus(el, msg, isError);
    if (el && darkMode) {
      el.style.color = isError ? '#fca5a5' : '#6ee7b7';
    }
  }

  function bindOtpForms() {
    document.querySelectorAll('.sr-otp-login-form').forEach(function (form) {
      if (form.dataset.srBound === '1') return;
      form.dataset.srBound = '1';

      var phoneInput = form.querySelector('input[name="phone"]');
      var step2Wrap = form.querySelector('.sr-otp-step-2');
      var codeInput = form.querySelector('input[name="otp_code"]');
      var sendBtn = form.querySelector('.sr-otp-send-btn');
      var verifyBtn = form.querySelector('.sr-otp-verify-btn');
      var statusEl = form.querySelector('.sr-shortcode-status');
      var activeToken = '';

      function sendOtp() {
        var phone = phoneInput ? phoneInput.value.trim() : '';
        if (!phone) {
          showStatus(statusEl, 'لطفاً شماره موبایل معتبر وارد کنید.', true);
          return;
        }
        var origText = sendBtn ? sendBtn.textContent : '';
        if (sendBtn) {
          sendBtn.disabled = true;
          sendBtn.textContent = 'در حال ارسال کد...';
        }
        fetch(getRestBase() + '/otp/send', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': getNonce()
          },
          body: JSON.stringify({ phone: phone })
        })
          .then(function (r) {
            return r.json().then(function (d) { return { ok: r.ok, d: d }; });
          })
          .then(function (res) {
            if (!res.ok || !res.d || !res.d.success || !res.d.otpToken) {
              throw new Error((res.d && res.d.message) || 'خطا در ارسال کد پیامکی.');
            }
            activeToken = res.d.otpToken;
            if (step2Wrap) step2Wrap.style.display = 'block';
            if (codeInput) codeInput.focus();
            showStatus(statusEl, res.d.message || 'کد تایید ارسال شد. لطفاً کد ۶ رقمی را وارد کنید.', false);
          })
          .catch(function (err) {
            showStatus(statusEl, (err && err.message) || 'خطا در برقراری ارتباط با سرور.', true);
          })
          .finally(function () {
            if (sendBtn) {
              sendBtn.disabled = false;
              sendBtn.textContent = origText;
            }
          });
      }

      function verifyOtp() {
        var phone = phoneInput ? phoneInput.value.trim() : '';
        var code = codeInput ? codeInput.value.trim() : '';
        if (!activeToken || !code) {
          showStatus(statusEl, 'لطفاً کد تایید دریافت‌شده را وارد کنید.', true);
          return;
        }
        var origText = verifyBtn ? verifyBtn.textContent : '';
        if (verifyBtn) {
          verifyBtn.disabled = true;
          verifyBtn.textContent = 'در حال بررسی...';
        }
        fetch(getRestBase() + '/otp/verify', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': getNonce()
          },
          body: JSON.stringify({
            otpToken: activeToken,
            phone: phone,
            code: code
          })
        })
          .then(function (r) {
            return r.json().then(function (d) { return { ok: r.ok, d: d }; });
          })
          .then(function (res) {
            if (!res.ok || !res.d || (!res.d.success && !res.d.verified)) {
              throw new Error((res.d && res.d.message) || 'کد وارد شده صحیح نیست یا منقضی شده است.');
            }
            showStatus(statusEl, res.d.message || 'شماره موبایل با موفقیت تایید شد.', false);
            if (res.d.redirect_url) {
              setTimeout(function () {
                window.location.href = res.d.redirect_url;
              }, 700);
            }
          })
          .catch(function (err) {
            showStatus(statusEl, (err && err.message) || 'خطا در تایید کد پیامکی.', true);
          })
          .finally(function () {
            if (verifyBtn) {
              verifyBtn.disabled = false;
              verifyBtn.textContent = origText;
            }
          });
      }

      if (sendBtn) sendBtn.addEventListener('click', sendOtp);
      if (verifyBtn) verifyBtn.addEventListener('click', verifyOtp);
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (activeToken && step2Wrap && step2Wrap.style.display !== 'none') {
          verifyOtp();
        } else {
          sendOtp();
        }
      });
    });
  }

  function bindQuickCallbackForms() {
    document.querySelectorAll('.sr-quick-callback-form').forEach(function (form) {
      if (form.dataset.srBound === '1') return;
      form.dataset.srBound = '1';

      var phoneInput = form.querySelector('input[name="phone"]');
      var trapInput = form.querySelector('input[name="sr_website_trap"]');
      var submitBtn = form.querySelector('button[type="submit"], .sr-quick-callback-btn');
      var statusEl = form.querySelector('.sr-shortcode-status') || form.parentElement.querySelector('.sr-shortcode-status');

      function submitCallback(e) {
        if (e) e.preventDefault();
        var phone = phoneInput ? phoneInput.value.trim() : '';
        if (!phone) {
          showStatus(statusEl, 'لطفاً شماره موبایل خود را وارد نمایید.', true);
          return;
        }
        var origText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'در حال ثبت...';
        }
        fetch(getRestBase() + '/quick-callback', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': getNonce()
          },
          body: JSON.stringify({
            phone: phone,
            sr_website_trap: trapInput ? trapInput.value : ''
          })
        })
          .then(function (r) {
            return r.json().then(function (d) { return { ok: r.ok, d: d }; });
          })
          .then(function (res) {
            if (!res.ok || !res.d || !res.d.success) {
              throw new Error((res.d && res.d.message) || 'ثبت درخواست تماس با خطا مواجه شد.');
            }
            var msg = (res.d.message || 'درخواست تماس ثبت شد.') + (res.d.tracking_code ? ' (کد پیگیری: ' + res.d.tracking_code + ')' : '');
            showStatus(statusEl, msg, false);
            form.reset();
          })
          .catch(function (err) {
            showStatus(statusEl, (err && err.message) || 'خطا در اتصال به سرور.', true);
          })
          .finally(function () {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = origText;
            }
          });
      }

      form.addEventListener('submit', submitCallback);
      if (submitBtn && submitBtn.type !== 'submit') {
        submitBtn.addEventListener('click', submitCallback);
      }
    });
  }

  function bindCaseTrackForms() {
    document.querySelectorAll('.sr-case-track-form').forEach(function (form) {
      if (form.dataset.srBound === '1') return;
      form.dataset.srBound = '1';

      var caseInput = form.querySelector('input[name="case_number"]');
      var phoneInput = form.querySelector('input[name="phone"]');
      var submitBtn = form.querySelector('button[type="submit"], .sr-case-track-btn');
      var container = form.closest('.sedrazavi-client-portal-wrapper, .sedrazavi-tracking-box') || form.parentElement;
      var statusEl = container.querySelector('.sr-shortcode-status');
      var resultEl = container.querySelector('.sr-case-result-panel');
      var darkMode = form.getAttribute('data-theme') === 'dark';

      function submitQuery(e) {
        if (e) e.preventDefault();
        var caseNo = caseInput ? caseInput.value.trim() : '';
        var phone = phoneInput ? phoneInput.value.trim() : '';
        if (resultEl) {
          resultEl.style.display = 'none';
          resultEl.textContent = '';
        }
        if (!caseNo || !phone) {
          setDarkAwareStatus(statusEl, 'برای حفظ محرمانگی، وارد کردن هر دو فیلد شماره کلاسه و شماره موبایل ثبت‌شده الزامی است.', true, darkMode);
          return;
        }
        var origText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'در حال استعلام...';
        }
        fetch(getRestBase() + '/track-case', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': getNonce()
          },
          body: JSON.stringify({
            case_number: caseNo,
            phone: phone
          })
        })
          .then(function (r) {
            return r.json().then(function (d) { return { ok: r.ok, d: d }; });
          })
          .then(function (res) {
            if (!res.ok || !res.d || !res.d.found) {
              throw new Error((res.d && res.d.message) || 'پرونده‌ای با این مشخصات یافت نشد.');
            }
            setDarkAwareStatus(statusEl, 'وضعیت پرونده با موفقیت استعلام شد.', false, darkMode);
            if (resultEl) {
              resultEl.style.display = 'block';
              resultEl.style.marginTop = '12px';
              resultEl.style.padding = '12px';
              resultEl.style.borderRadius = '12px';
              resultEl.style.border = '1px solid rgba(212,175,55,0.45)';
              resultEl.style.background = darkMode ? 'rgba(255,255,255,0.06)' : '#f8fafc';
              resultEl.textContent = '';

              var rows = [
                ['شماره پرونده', res.d.case_number || caseNo],
                ['وضعیت فعلی', res.d.status || 'در جریان رسیدگی'],
                ['شعبه / مرجع', res.d.court_branch || 'ثبت نشده'],
                ['جلسه بعدی', res.d.next_session || 'تعیین نشده'],
                ['آخرین بروزرسانی', res.d.updated_at || '-']
              ];
              rows.forEach(function (pair) {
                var rowDiv = document.createElement('div');
                rowDiv.style.display = 'flex';
                rowDiv.style.justifyContent = 'space-between';
                rowDiv.style.gap = '8px';
                rowDiv.style.padding = '4px 0';
                rowDiv.style.fontSize = '12px';
                var kSpan = document.createElement('strong');
                kSpan.textContent = pair[0] + ':';
                var vSpan = document.createElement('span');
                vSpan.textContent = String(pair[1]);
                rowDiv.appendChild(kSpan);
                rowDiv.appendChild(vSpan);
                resultEl.appendChild(rowDiv);
              });
            }
          })
          .catch(function (err) {
            setDarkAwareStatus(statusEl, (err && err.message) || 'خطا در استعلام پرونده از سرور.', true, darkMode);
          })
          .finally(function () {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = origText;
            }
          });
      }

      form.addEventListener('submit', submitQuery);
      if (submitBtn && submitBtn.type !== 'submit') {
        submitBtn.addEventListener('click', submitQuery);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    bindOtpForms();
    bindQuickCallbackForms();
    bindCaseTrackForms();
  });
})();
