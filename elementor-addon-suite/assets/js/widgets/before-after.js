/**
 * Universal Before/After Image Comparison Widget JS
 * Compatible with Elementor Frontend & Live Editor
 */
(function($) {
  'use strict';

  function initBeforeAfter($scope) {
    var $containers = $scope.find('.uas-ba-container');
    if (!$containers.length) return;

    $containers.each(function() {
      var $container = $(this);
      var $before = $container.find('.uas-ba-before');
      var $beforeImg = $before.find('img');
      var $handle = $container.find('.uas-ba-handle');
      var $range = $container.find('.uas-ba-range');

      function updateDimensions() {
        var containerWidth = $container.outerWidth();
        if (containerWidth > 0) {
          $beforeImg.css('width', containerWidth + 'px');
        }
      }

      function updatePosition(val) {
        $before.css('width', val + '%');
        $handle.css('left', val + '%');
        updateDimensions();
      }

      $range.off('input.uasBA change.uasBA').on('input.uasBA change.uasBA', function() {
        updatePosition($(this).val());
      });

      // Initial dimension sync
      updateDimensions();
      if ($range.length) {
        updatePosition($range.val());
      }

      // Sync on window resize
      $(window).off('resize.uasBA_' + $container.attr('id')).on('resize.uasBA_' + $container.attr('id'), function() {
        updateDimensions();
      });
    });
  }

  $(window).on('elementor/frontend/init', function() {
    if (window.elementorFrontend && window.elementorFrontend.hooks) {
      window.elementorFrontend.hooks.addAction('frontend/element_ready/uas_before_after.default', initBeforeAfter);
    }
  });

  $(document).ready(function() {
    $('.uas-ba-container').each(function() {
      initBeforeAfter($(this).closest('.elementor-widget-uas_before_after, .elementor-element'));
    });
  });
})(jQuery);
