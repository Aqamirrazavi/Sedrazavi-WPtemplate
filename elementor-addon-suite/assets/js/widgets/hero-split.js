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
          if (input && input.value.trim().length >= 10) {
            form.classList.add('is-submitted');
            input.disabled = true;
          }
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
