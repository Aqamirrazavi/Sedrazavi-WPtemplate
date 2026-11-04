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

      // Tooltip interactive clicks on mobile
      var tooltips = matrix.querySelectorAll('.uas-matrix-tooltip');
      tooltips.forEach(function (tip) {
        tip.addEventListener('click', function (e) {
          e.stopPropagation();
          var title = tip.getAttribute('title');
          if (title) {
            window.alert(title);
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
