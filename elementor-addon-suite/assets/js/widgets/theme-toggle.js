/**
 * Universal Theme Switcher JS (Unified Dark/Light Token Polarity)
 */
(function($) {
  'use strict';

  function applyThemeMode(mode) {
    var root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    try {
      localStorage.setItem('uas-theme', mode);
      localStorage.setItem('sedrazavi_theme', mode);
    } catch (e) {}
  }

  function initThemeToggle($scope) {
    var $box = $scope.find('.uas-theme-toggle-box');
    var stored = null;
    try {
      stored = localStorage.getItem('uas-theme') || localStorage.getItem('sedrazavi_theme');
    } catch (e) {}

    if (stored === 'dark' || (!stored && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      applyThemeMode('dark');
    } else if (stored === 'light') {
      applyThemeMode('light');
    }

    $box.off('click.uasTheme').on('click.uasTheme', function() {
      var isDark = document.documentElement.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark';
      applyThemeMode(isDark ? 'light' : 'dark');
    });
  }

  $(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/uas_theme_toggle.default', initThemeToggle);
  });
})(jQuery);
