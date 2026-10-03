/**
 * Universal Story Highlights Bar JS
 */
(function($) {
  'use strict';

  function initStoryBar($scope) {
    var $items = $scope.find('.uas-story-item');
    $items.on('click', function() {
      var title = $(this).data('title');
      var content = $(this).data('content');
      alert(title + "\n\n" + (content || 'محتوای استوری انتخاب شده'));
    });
  }

  $(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/uas_story_bar.default', initStoryBar);
  });
})(jQuery);
