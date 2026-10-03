/**
 * Universal Theme Switcher JS
 */
(function($) {
  'use strict';

  function initThemeToggle($scope) {
    var $box = $scope.find('.uas-theme-toggle-box');

    // Check existing state from localStorage
    if (localStorage.getItem('uas-theme') === 'dark' || (!('uas-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      $('html').addClass('dark');
    }

    $box.on('click', function() {
      if ($('html').hasClass('dark')) {
        $('html').removeClass('dark');
        localStorage.setItem('uas-theme', 'light');
      } else {
        $('html').addClass('dark');
        localStorage.setItem('uas-theme', 'dark');
      }
    });
  }

  $(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/uas_theme_toggle.default', initThemeToggle);
  });
})(jQuery);
