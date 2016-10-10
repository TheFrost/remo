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
    };

  }());

  global.Utils = Utils;

}(window));
