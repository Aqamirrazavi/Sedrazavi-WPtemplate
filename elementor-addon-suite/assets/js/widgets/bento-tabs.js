/**
 * Universal Bento Interactive Tabs Widget Script
 * Handles category tab switching and animated filtering of bento cards.
 *
 * @package Universal_Elementor_Suite
 */
(function () {
  'use strict';

  function initBentoTabs($scope) {
    var container = $scope ? $scope[0] : document;
    var bentoWrappers = container.querySelectorAll('.uas-bento-tabs-container');

    bentoWrappers.forEach(function (wrapper) {
      if (wrapper.getAttribute('data-uas-initialized')) return;
      wrapper.setAttribute('data-uas-initialized', 'true');

      var tabButtons = wrapper.querySelectorAll('.uas-bento-tab-btn');
      var cards = wrapper.querySelectorAll('.uas-bento-card');

      tabButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var filter = btn.getAttribute('data-filter');

          // Active tab button styling
          tabButtons.forEach(function (b) {
            b.classList.remove('is-active');
          });
          btn.classList.add('is-active');

          // Filter cards with smooth opacity animation
          cards.forEach(function (card) {
            var cat = card.getAttribute('data-category');
            if (filter === 'all' || cat === filter || cat === 'all') {
              card.style.display = 'flex';
              card.style.opacity = '0';
              setTimeout(function () {
                card.style.opacity = '1';
              }, 20);
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    });
  }

  if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      initBentoTabs();
    });

    if (window.elementorFrontend && window.elementorFrontend.hooks) {
      window.elementorFrontend.hooks.addAction(
        'frontend/element_ready/uas_bento_tabs.default',
        initBentoTabs
      );
    } else {
      window.addEventListener('elementor/frontend/init', function () {
        if (window.elementorFrontend && window.elementorFrontend.hooks) {
          window.elementorFrontend.hooks.addAction(
            'frontend/element_ready/uas_bento_tabs.default',
            initBentoTabs
          );
        }
      });
    }
  }
})();
