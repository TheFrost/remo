(function(global) {
  'use strict';

  var Desktop = (function() {

    var
    /*Public*/
    init = function (_bricks) {
      _cache = _getSelectors(_bricks);
      _bindEvents();
      _renderCrew();
    },

    /*Private*/
    _cache = null,
    _getSelectors = function (_bricks) {
      return {
        doc: $(document),
        bricks: _bricks,
        crewB: $('.o-card--crew-b'),
        infoTemplate: $('#case-template-info'),
        mediaTemplate: $('#case-template-media'),
        caseMediaContainer: $('.o-card--case-a > .o-card__flipper > .o-card__face--back'),
        caseInfoContainer: $('.o-card--case-b > .o-card__flipper > .o-card__face--back'),
        crewTemplate: $('#crew-template'),
        crewContainer: $('#crew-container-desktop'),
        allCards: $('.o-card')
      }
    },
    _bindEvents = function () {
      _cache.bricks.on('click', function (evt) {
        evt.preventDefault();
        var _that = $(this),
            _type = _that.data('type'),
            _slug = _that.data('slug');

        if (_type === 'case' && !_slug) {
          return false;
        }

        if (_type === 'case') {
          _renderCase(_slug);
        }
        _flip(_type);
      });
      _cache.doc.on('click', '.o-close', function (evt) {
        evt.preventDefault();

        _closeCase();
      });
    },
    _closeCase = function () {
      _flip('case');
    },
    _renderCase = function (_slug) {
      var _sourceInfo = _cache.infoTemplate.html(),
          _sourceMedia = _cache.mediaTemplate.html(),
          _case = {},
          _markupInfo = '',
          _markupMedia = '';

      _case = Service.cases.filter(function (item, index) {
        return item.slug === _slug;
      })[0];

      _markupInfo = Utils.getMarkup(_sourceInfo, _case);
      _markupMedia = Utils.getMarkup(_sourceMedia, _case);

      _cache.caseMediaContainer.html(_markupMedia);
      _cache.caseInfoContainer.html(_markupInfo);
    },
    _renderCrew = function () {
      var _source = _cache.crewTemplate.html(),
          _crew = {},
          _markup = '';

      _crew = Service.crew;
      _markup = Utils.getMarkup(_source, _crew);
      _cache.crewContainer.html(_markup);
    },
    _flip = function (_type) {
  		$('.o-card--' + _type + '-a').toggleClass('js-flip');

  		setTimeout(function () {
  			$('.o-card--' + _type + '-b').toggleClass('js-flip');
  		}, 200);

  		if (_type === "case" || _type === "about") {
  			if (_cache.crewB.hasClass('js-hide')) {
  				setTimeout(function () {
  					_cache.crewB.toggleClass('js-hide');
  				}, 900);
  			} else {
  				_cache.crewB.toggleClass('js-hide');
  			}
  		}
  	};

    return {
      init: init
    };

  }());

  global.Desktop = Desktop;

}(window));
