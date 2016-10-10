(function(global) {
  'use strict';

  var App = (function() {

    var
    /*Private*/
    _platform = Utils.isMobile() ? 'mobile' : 'desktop',
    _bricks = $('.o-layout--' + _platform + ' .o-brick'),
    _caseBricks = $('.o-layout--' + _platform + ' .o-brick[data-type=case]'),
    _renderData = function () {
      _caseBricks.each(function (i, item) {
        if (Service.cases[i]) {
          var _case = Service.cases[i];
          $(item)
            .attr('data-slug', _case.slug)
            .find('.o-card__face--back')
            .css('background-image', 'url(' + _case.logo + ')');
        }
      });
    },

    /*Public*/
    init = function () {
      Service.init();
    },
    start = function () {
      _renderData();

      if (Utils.isMobile()) {
        Mobile.init(_bricks);
      } else {
        Desktop.init(_bricks);
      }

      Router.init();
    }

    return {
      init: init,
      start: start
    }

  }());

  global.App = App;

  App.init();

}(window));
