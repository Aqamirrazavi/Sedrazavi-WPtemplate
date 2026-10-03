/**
 * Universal FAQ Accordion JS
 */
(function($) {
  'use strict';

  function initFaqAccordion($scope) {
    var $questions = $scope.find('.uas-faq-question');
    $questions.on('click', function() {
      var $item = $(this).closest('.uas-faq-item');
      var isActive = $item.hasClass('is-active');

      // Toggle current
      if (isActive) {
        $item.removeClass('is-active');
        $(this).attr('aria-expanded', 'false');
      } else {
        // Close siblings if single mode
        $scope.find('.uas-faq-item').removeClass('is-active');
        $scope.find('.uas-faq-question').attr('aria-expanded', 'false');
        $item.addClass('is-active');
        $(this).attr('aria-expanded', 'true');
      }
    });
  }

  $(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/uas_faq.default', initFaqAccordion);
  });
})(jQuery);
