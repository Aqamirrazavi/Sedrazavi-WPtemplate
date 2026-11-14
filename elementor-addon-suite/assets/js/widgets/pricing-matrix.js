/**
 * Universal Pricing Comparison Matrix Widget Script
 * Handles responsive mobile column switching and tooltip hover/clicks.
 *
 * @package Universal_Elementor_Suite
 */
(function () {
  'use strict';

  function initPricingMatrix($scope) {
    var container = $scope ? $scope[0] : document;
    var matrices = container.querySelectorAll('.uas-pricing-matrix-container');

    matrices.forEach(function (matrix) {
      if (matrix.getAttribute('data-uas-initialized')) return;
      matrix.setAttribute('data-uas-initialized', 'true');

      // Tooltip interactive accessible popover on click
      var tooltips = matrix.querySelectorAll('.uas-matrix-tooltip');
      tooltips.forEach(function (tip) {
        tip.setAttribute('tabindex', '0');
        tip.setAttribute('role', 'button');
        var togglePopover = function (e) {
          e.stopPropagation();
          var title = tip.getAttribute('title') || tip.getAttribute('data-tooltip');
          if (!title) return;
          tip.setAttribute('data-tooltip', title);
          var existing = matrix.querySelector('.uas-matrix-popover');
          if (existing) existing.remove();
          var pop = document.createElement('div');
          pop.className = 'uas-matrix-popover';
          pop.setAttribute('role', 'status');
          pop.style.cssText = 'margin-top:8px;padding:10px 14px;border-radius:10px;background:#0f172a;color:#f8fafc;border:1px solid #d4af37;font-size:12px;line-height:1.6;';
          pop.textContent = title;
          matrix.insertBefore(pop, matrix.firstChild);
          setTimeout(function () {
            if (pop.parentNode) pop.remove();
          }, 4500);
        };
        tip.addEventListener('click', togglePopover);
        tip.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            togglePopover(e);
          }
        });
      });
    });
  }

  if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      initPricingMatrix();
    });

    if (window.elementorFrontend && window.elementorFrontend.hooks) {
      window.elementorFrontend.hooks.addAction(
        'frontend/element_ready/uas_pricing_matrix.default',
        initPricingMatrix
      );
    } else {
      window.addEventListener('elementor/frontend/init', function () {
        if (window.elementorFrontend && window.elementorFrontend.hooks) {
          window.elementorFrontend.hooks.addAction(
            'frontend/element_ready/uas_pricing_matrix.default',
            initPricingMatrix
          );
        }
      });
    }
  }
})();
