(function(global) {
  'use strict';

  var Utils = (function() {
    var _window = $(window);

    return {
      isMobile: function () {
        return _window.innerWidth() < 768;
      },
      getMarkup: function (_source, _context) {
        var _template = Handlebars.compile(_source);
        return _template(_context);
      },
      resetScroll: function (_el) {
        _el.scrollTop(0);
      },
      cleanContainer: function (_container) {
        _container.empty();
      }
    };

  }());

  global.Utils = Utils;

}(window));
