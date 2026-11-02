/**
 * Universal FAQ Accordion & Live Filter JS
 *
 * @package Universal_Elementor_Suite
 */
(function ($) {
  'use strict';

  function initFaqAccordion($scope) {
    var $root = $scope ? $($scope) : $('.uas-faq-wrapper');

    // Accordion click toggle
    $root.find('.uas-faq-question').off('click').on('click', function () {
      var $item = $(this).closest('.uas-faq-item');
      var isActive = $item.hasClass('is-active');

      if (isActive) {
        $item.removeClass('is-active');
        $(this).attr('aria-expanded', 'false');
      } else {
        $item.addClass('is-active');
        $(this).attr('aria-expanded', 'true');
      }
    });

    // Live search filter
    $root.find('.uas-faq-search-input').off('input').on('input', function () {
      var query = $(this).val().trim().toLowerCase();
      var $items = $root.find('.uas-faq-item');

      if (!query) {
        $items.show();
        return;
      }

      $items.each(function () {
        var text = $(this).text().toLowerCase();
        if (text.indexOf(query) !== -1) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    });
  }

  $(document).ready(function () {
    initFaqAccordion();
  });

  $(window).on('elementor/frontend/init', function () {
    if (window.elementorFrontend && window.elementorFrontend.hooks) {
      elementorFrontend.hooks.addAction('frontend/element_ready/uas_faq.default', initFaqAccordion);
    }
  });
})(jQuery);
