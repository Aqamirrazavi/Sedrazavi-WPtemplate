/**
 * Universal Animated Stat Counter Widget Script
 * Implements smooth requestAnimationFrame count-up triggered by IntersectionObserver.
 * Zero jQuery dependency for maximum Core Web Vitals speed.
 *
 * @package Universal_Elementor_Suite
 */
(function () {
  'use strict';

  function initStatCounter($scope) {
    var container = $scope ? $scope[0] : document;
    var counters = container.querySelectorAll('.uas-stat-counter-wrapper');

    counters.forEach(function (wrapper) {
      if (wrapper.getAttribute('data-uas-initialized')) return;
      wrapper.setAttribute('data-uas-initialized', 'true');

      var duration = parseInt(wrapper.getAttribute('data-duration'), 10) || 2000;
      var numberEls = wrapper.querySelectorAll('.uas-stat-number');

      var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          numberEls.forEach(function (el) {
            var target = parseInt(el.getAttribute('data-target'), 10) || 0;
            var start = 0;
            var startTime = null;

            function step(timestamp) {
              if (!startTime) startTime = timestamp;
              var progress = Math.min((timestamp - startTime) / duration, 1);
              // Ease-out cubic animation
              var easeOut = 1 - Math.pow(1 - progress, 3);
              var current = Math.floor(easeOut * target);

              el.textContent = current.toLocaleString('fa-IR');

              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                el.textContent = target.toLocaleString('fa-IR');
              }
            }

            window.requestAnimationFrame(step);
          });

          obs.unobserve(entry.target);
        });
      }, { threshold: 0.2 });

      observer.observe(wrapper);
    });
  }

  // Hook into Elementor Frontend and standard DOMContentLoaded
  if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      initStatCounter();
    });

    if (window.elementorFrontend && window.elementorFrontend.hooks) {
      window.elementorFrontend.hooks.addAction(
        'frontend/element_ready/uas_stat_counter.default',
        initStatCounter
      );
    } else {
      window.addEventListener('elementor/frontend/init', function () {
        if (window.elementorFrontend && window.elementorFrontend.hooks) {
          window.elementorFrontend.hooks.addAction(
            'frontend/element_ready/uas_stat_counter.default',
            initStatCounter
          );
        }
      });
    }
  }
})();
