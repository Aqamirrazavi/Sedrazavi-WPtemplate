/**
 * Universal Pricing Switcher Widget JS
 * Compatible with Elementor Frontend & Live Editor
 */
(function($) {
  'use strict';

  function initPricingSwitcher($scope) {
    var $wrapper = $scope.find('.uas-pricing-wrapper');
    if (!$wrapper.length) return;

    var $buttons = $wrapper.find('.uas-switch-btn');
    var $monthlies = $wrapper.find('.uas-price-monthly');
    var $yearlies = $wrapper.find('.uas-price-yearly');

    $buttons.off('click.uasPricing').on('click.uasPricing', function(e) {
      e.preventDefault();
      var $btn = $(this);
      var period = $btn.data('period');

      $buttons.removeClass('active').css({
        background: 'transparent',
        color: '#64748b',
        boxShadow: 'none'
      });

      $btn.addClass('active').css({
        background: '#fff',
        color: '#0f172a',
        boxShadow: '0 2px 4px rgba(0,0,0,0.06)'
      });

      if (period === 'yearly') {
        $monthlies.hide();
        $yearlies.css('display', 'inline-block');
      } else {
        $yearlies.hide();
        $monthlies.css('display', 'inline-block');
      }
    });
  }

  $(window).on('elementor/frontend/init', function() {
    if (window.elementorFrontend && window.elementorFrontend.hooks) {
      window.elementorFrontend.hooks.addAction('frontend/element_ready/uas_pricing_switcher.default', initPricingSwitcher);
    }
  });

  $(document).ready(function() {
    $('.uas-pricing-wrapper').each(function() {
      initPricingSwitcher($(this).closest('.elementor-widget-uas_pricing_switcher, .elementor-element'));
    });
  });
})(jQuery);
