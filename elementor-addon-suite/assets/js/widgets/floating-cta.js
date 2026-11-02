/**
 * Universal High-Converting Floating CTA Dock Script
 * Handles viewport scroll trigger, responsive show/hide, and session dismissal.
 *
 * @package Universal_Elementor_Suite
 */
(function () {
  'use strict';

  function initFloatingCTA($scope) {
    var container = $scope ? $scope[0] : document;
    var docks = container.querySelectorAll('.uas-floating-cta-dock');

    docks.forEach(function (dock) {
      if (dock.getAttribute('data-uas-initialized')) return;
      dock.setAttribute('data-uas-initialized', 'true');

      var trigger = parseInt(dock.getAttribute('data-trigger'), 10) || 150;
      var dismissBtn = dock.querySelector('.uas-floating-dismiss');

      // Check if dismissed in this session
      if (window.sessionStorage && sessionStorage.getItem('uas_cta_dismissed') === 'true') {
        dock.style.display = 'none';
        return;
      }

      function checkScroll() {
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollY >= trigger) {
          dock.classList.add('is-visible');
        } else {
          dock.classList.remove('is-visible');
        }
      }

      window.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll(); // Initial check

      if (dismissBtn) {
        dismissBtn.addEventListener('click', function () {
          dock.classList.remove('is-visible');
          if (window.sessionStorage) {
            sessionStorage.setItem('uas_cta_dismissed', 'true');
          }
          setTimeout(function () {
            dock.style.display = 'none';
          }, 300);
        });
      }
    });
  }

  if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      initFloatingCTA();
    });

    if (window.elementorFrontend && window.elementorFrontend.hooks) {
      window.elementorFrontend.hooks.addAction(
        'frontend/element_ready/uas_floating_cta.default',
        initFloatingCTA
      );
    } else {
      window.addEventListener('elementor/frontend/init', function () {
        if (window.elementorFrontend && window.elementorFrontend.hooks) {
          window.elementorFrontend.hooks.addAction(
            'frontend/element_ready/uas_floating_cta.default',
            initFloatingCTA
          );
        }
      });
    }
  }
})();
