/**
 * Universal Story Highlights Bar JS
 */
(function($) {
  'use strict';

  function initStoryBar($scope) {
    var $items = $scope.find('.uas-story-item');
    $items.attr('tabindex', '0').attr('role', 'button');

    function showStoryPreview($el) {
      var title = $el.data('title') || '';
      var content = $el.data('content') || 'محتوای استوری انتخاب شده';
      var $panel = $scope.find('.uas-story-inline-preview');
      if (!$panel.length) {
        $panel = $('<div class="uas-story-inline-preview" role="dialog" aria-modal="false" dir="rtl" style="margin-top:12px;padding:14px 16px;border-radius:12px;background:#0f172a;color:#f8fafc;border:1px solid #d4af37;display:flex;justify-content:space-between;align-items:flex-start;gap:12px;"><div class="uas-story-body"></div><button type="button" class="uas-story-close" aria-label="بستن پیش‌نمایش" style="background:transparent;border:none;color:#f8fafc;font-size:18px;cursor:pointer;">&times;</button></div>');
        $scope.append($panel);
        $panel.find('.uas-story-close').on('click', function() {
          $panel.hide();
        });
      }
      var $body = $panel.find('.uas-story-body').empty();
      $('<strong style="display:block;color:#d4af37;margin-bottom:4px;"></strong>').text(title).appendTo($body);
      $('<p style="margin:0;font-size:13px;line-height:1.7;"></p>').text(content).appendTo($body);
      $panel.show();
    }

    $items.on('click', function() {
      showStoryPreview($(this));
    });
    $items.on('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showStoryPreview($(this));
      }
    });
  }

  $(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/uas_story_bar.default', initStoryBar);
  });
})(jQuery);
