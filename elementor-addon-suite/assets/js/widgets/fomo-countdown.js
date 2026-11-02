/**
 * Universal FOMO Countdown Widget JS
 * Compatible with Elementor Frontend & Live Editor
 */
(function($) {
  'use strict';

  function initFomoCountdown($scope) {
    var $bars = $scope.find('.uas-fomo-bar');
    if (!$bars.length) return;

    $bars.each(function() {
      var $bar = $(this);
      var widgetId = $bar.data('widget-id') || $bar.attr('id') || 'fomo';
      var storageKey = 'uas_fomo_end_' + widgetId;
      var duration = parseInt($bar.data('duration'), 10) || (12 * 3600);
      var durationMs = duration * 1000;

      var endTime = null;
      try {
        endTime = localStorage.getItem(storageKey);
      } catch (e) {
        endTime = null;
      }

      var now = Date.now();
      if (!endTime || isNaN(endTime) || parseInt(endTime, 10) < now) {
        endTime = now + durationMs;
        try {
          localStorage.setItem(storageKey, endTime);
        } catch (e) {}
      } else {
        endTime = parseInt(endTime, 10);
      }

      var $hEl = $bar.find('.uas-timer-hours');
      var $mEl = $bar.find('.uas-timer-minutes');
      var $sEl = $bar.find('.uas-timer-seconds');

      // Clear existing interval if re-initialized in editor
      if ($bar.data('timer-interval')) {
        clearInterval($bar.data('timer-interval'));
      }

      function update() {
        var remaining = Math.max(0, endTime - Date.now());
        var totalSec = Math.floor(remaining / 1000);
        var h = Math.floor(totalSec / 3600);
        var m = Math.floor((totalSec % 3600) / 60);
        var s = totalSec % 60;

        $hEl.text(String(h).padStart(2, '0'));
        $mEl.text(String(m).padStart(2, '0'));
        $sEl.text(String(s).padStart(2, '0'));

        if (remaining <= 0) {
          clearInterval(timer);
        }
      }

      update();
      var timer = setInterval(update, 1000);
      $bar.data('timer-interval', timer);
    });
  }

  $(window).on('elementor/frontend/init', function() {
    if (window.elementorFrontend && window.elementorFrontend.hooks) {
      window.elementorFrontend.hooks.addAction('frontend/element_ready/uas_fomo_countdown.default', initFomoCountdown);
    }
  });

  $(document).ready(function() {
    $('.uas-fomo-bar').each(function() {
      initFomoCountdown($(this).closest('.elementor-widget-uas_fomo_countdown, .elementor-element'));
    });
  });
})(jQuery);
