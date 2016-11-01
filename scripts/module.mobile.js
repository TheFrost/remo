(function(global) {
  'use strict';

  var Mobile = (function() {

    var
    /*Public*/
    init = function (_bricks) {
      _cache = _getSelectors(_bricks);
      _bindEvents(_cache);
      _renderCrew();
      _renderImgDay();
    },

    /*Private*/
    _cache = null,
    _getSelectors = function (_bricks) {
      return {
        bricks: _bricks,
        caseBricks: $('.o-layout--mobile .o-brick[data-type=case]'),
        layout: $('.o-layout--mobile'),
        curtain: $('.o-curtain'),
        content: $('.o-content'),
        contentCase: $('.o-content--case'),
        caseTemplate: $('#case-template'),
        crewTemplate: $('#crew-template'),
        crewContainer: $('#crew-container-mobile'),
        imgDayContainer: $('#imgday-mobile')
      }
    },
    _bindEvents = function () {
      _cache.bricks.on('click', function (evt) {
        evt.preventDefault();

        var _that = $(this),
            _type = _that.data('type'),
            _slug = _that.data('slug');

        /*only active cards with cases data*/
        if (_type === 'case' && !_slug) {
          return false;
        }

        _flip(_that);

        if (_that.data('type') === 'case') {
          setTimeout(function () {
            _renderCase(_slug);
          }, 600);
        }
      });
    },
    _renderCase = function (_slug) {
      var _source = _cache.caseTemplate.html(),
          _case = {},
          _markup = '';

      _case = Service.cases.filter(function (item, index) {
        return item.slug === _slug;
      })[0];

      _markup = Utils.getMarkup(_source, _case);

      _cache.contentCase.html(_markup);
    },
    _renderCrew = function () {
      var _source = _cache.crewTemplate.html(),
          _crew = {},
          _markup = '';

      _crew = Service.crew;
      _markup = Utils.getMarkup(_source, _crew);
      _cache.crewContainer.html(_markup);
    },
    _flip = function (_el) {
  		if (_el.hasClass('js-flip')) {
  			_closeCurtain();
  		} else {
  			_switchCurtain(_el);
  		}
  	},
    _renderImgDay = function () {
      _cache.imgDayContainer.css('background-image', 'url(' + Service.dayImg[0].url + ')');
    },
    _closeCurtain = function () {
  		_cache.bricks.removeClass('js-flip');
  		_cache.layout.removeClass('js-show-content js-translate-up js-translate-down');
      setTimeout(function () {
        Utils.cleanContainer(_cache.contentCase);
      }, 600);
  	},
    _switchCurtain = function (_el) {
  		var index = _cache.bricks.index(_el);

  		_closeCurtain();

  		setTimeout(function () {

  			_el.addClass('js-flip');

  			if (index !== _cache.bricks.length - 1) {
  				var type = _el.data('type');

  				_cache.content.hide();
  				$('.o-content--' + type).show();
  				_cache.layout.addClass('js-show-content');

  				if (index > 1 && index < 4) {
  					_cache.layout.addClass('js-translate-up');
  					_cache.curtain.removeAttr('style').css('top', 100 / 4 * 2 + '%');
  				} else if (index >= 4 && index < 6) {
  					_cache.layout.addClass('js-translate-down');
  					_cache.curtain.removeAttr('style').css('bottom', 100 / 4 * 2 + '%');
  				} else if (index <= 1) {
  					_cache.curtain.removeAttr('style').css('top', 100 / 4 + '%');
  				} else if (index >= 6) {
  					_cache.curtain.removeAttr('style').css('bottom', 100 / 4 + '%');
  				}
  			}
  		}, 600);
  	};

    return {
      init: init
    };
  }());

  global.Mobile = Mobile;

}(window));
