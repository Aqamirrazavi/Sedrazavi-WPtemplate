/**
 * Universal Hero Split Screen Widget Script
 * Handles inline lead form submission animation and trust badge interaction.
 *
 * @package Universal_Elementor_Suite
 */
(function () {
  'use strict';

  function initHeroSplit($scope) {
    var container = $scope ? $scope[0] : document;
    var heroes = container.querySelectorAll('.uas-hero-split-container');

    heroes.forEach(function (hero) {
      if (hero.getAttribute('data-uas-initialized')) return;
      hero.setAttribute('data-uas-initialized', 'true');

      var form = hero.querySelector('.uas-hero-lead-form');
      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var input = form.querySelector('.uas-form-input');
          var btn = form.querySelector('.uas-form-submit-btn');
          var successBox = form.querySelector('.uas-form-success-msg');
          var errorBox = form.querySelector('.uas-form-error-msg');
          var phone = input ? input.value.trim() : '';

          if (errorBox) {
            errorBox.style.display = 'none';
            errorBox.textContent = '';
          }

          if (!phone || phone.length < 10) {
            if (errorBox) {
              errorBox.textContent = 'لطفاً شماره تماس معتبر (حداقل ۱۰ رقم) وارد نمایید.';
              errorBox.style.display = 'block';
            }
            return;
          }

          var cfg = window.uasFrontendConfig || {};
          var endpoint = (cfg.restUrl || '/wp-json/sedrazavi/v1/').replace(/\/+$/, '') + '/inquiry/submit';
          var origBtnText = btn ? btn.textContent : '';
          if (btn) {
            btn.disabled = true;
            btn.textContent = 'در حال ثبت درخواست...';
          }

          fetch(endpoint, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              'X-WP-Nonce': cfg.restNonce || ''
            },
            body: JSON.stringify({
              name: 'متقاضی تماس سریع (هیرو اسپلیت)',
              phone: phone,
              service_type: 'hero_lead_capture'
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
              form.classList.add('is-submitted');
              if (input) input.disabled = true;
              if (successBox) {
                successBox.textContent = result.data.message || 'درخواست شما با موفقیت ثبت شد.';
              }
            })
            .catch(function (err) {
              if (errorBox) {
                errorBox.textContent = (err && err.message) ? err.message : 'خطا در ارتباط با سرور. لطفاً مجدداً تلاش کنید.';
                errorBox.style.display = 'block';
              }
            })
            .finally(function () {
              if (btn && !form.classList.contains('is-submitted')) {
                btn.disabled = false;
                btn.textContent = origBtnText;
              }
            });
        });
      }
    });
  }

  if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      initHeroSplit();
    });

    if (window.elementorFrontend && window.elementorFrontend.hooks) {
      window.elementorFrontend.hooks.addAction(
        'frontend/element_ready/uas_hero_split.default',
        initHeroSplit
      );
    } else {
      window.addEventListener('elementor/frontend/init', function () {
        if (window.elementorFrontend && window.elementorFrontend.hooks) {
          window.elementorFrontend.hooks.addAction(
            'frontend/element_ready/uas_hero_split.default',
            initHeroSplit
          );
        }
      });
    }
  }
})();
