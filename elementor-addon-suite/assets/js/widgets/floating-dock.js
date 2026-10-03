/**
 * Universal Floating Action Dock JS
 */
(function($) {
  'use strict';

  function initFloatingDock($scope) {
    var $dock = $scope.find('.uas-floating-dock');
    var $btn = $scope.find('.uas-scroll-top-btn');

    $(window).on('scroll', function() {
      if ($(window).scrollTop() > 300) {
        $dock.addClass('is-visible');
      } else {
        $dock.removeClass('is-visible');
      }
    });

    $btn.on('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  $(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/uas_floating_dock.default', initFloatingDock);
  });
})(jQuery);
