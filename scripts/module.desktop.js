(function(global) {
  'use strict';

  var Desktop = (function() {

    var
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
        allCards: $('.o-card'),
        root: $('html body'),
        body: $('body'),
        actionLinks: $('.o-case__actions-link'),
        imgDayContainer: $('#imgday-desktop'),
        undegroundLinks: $('.js-underground-link'),
        audioCard: $('.o-card--audio'),
        audioCtrl: $('.o-audio__ctrl'),
        audioIcon: $('.o-audio__icon'),
        audioObj: $('.o-audio__object'),
        aboutB: $('.o-card--about'),
        aboutCarousel: $('#jcarousel-about'),
        customersCarousel: $('#jcarousel-customers'),
        customersB: $('.o-card--customers-b'),
        currentType: null
      }
    },
    _bindEvents = function () {
      _cache.aboutCarousel.on('jcarousel:reload jcarousel:create', function () {
        var carousel = $(this),
            width = carousel.innerWidth();

        carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
      });
      _cache.customersCarousel.on('jcarousel:reload jcarousel:create', function () {
        var carousel = $(this),
            carouselWidth = carousel.innerWidth(),
            carouselHeight = carousel.innerHeight(),
            width = 0;

        if (carouselWidth > 1200) {
          width = carouselWidth / 4;
        } else if (carouselWidth > 1000) {
          width = carouselWidth / 3;
        } else if (carouselWidth >= 768) {
          width = carouselWidth / 2;
        }

        carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
        carousel.find('.o-customers__fig img').css('max-height', carouselHeight + 'px');
      });
      _cache.audioCtrl.on('click', function (evt) {
        evt.preventDefault();

        _toggleAudio();
        _toggleAudioIcon();
      });
      _cache.audioObj.on('ended', function () {
        _toggleAudioIcon();
      });
      _cache.undegroundLinks.on('click', function (evt) {
        evt.stopPropagation();
      });
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

        if (_that.hasClass('js-flip')) {
          _closeFlip(_cache.currentType);
        } else if ($('.o-card.js-flip').length) {
          _switchFlip(_type, _cache.currentType);
        } else {
          _flip(_type);
        }

        _cache.currentType = _type;
      });

      var _closeCaseFn = _.debounce(_closeCase, 300);
      _cache.doc.on('click', '.o-close', _closeCaseFn);

      _cache.doc.on('click', '.o-case__actions-link', function (evt) {
        evt.preventDefault();

        var _that = $(this),
            _hash = _that.attr('href');

        _scrollTo(_cache.caseMediaContainer.find('.o-case__resources'), _hash);
      });

      $(document).on('click', '.o-jcarousel__pager-item', function () {
        $('.o-jcarousel__pager-item').removeClass('js-active');
        $(this).addClass('js-active');
      });
    },
    _initAboutCarousel = function () {
      _cache.aboutCarousel.jcarousel({
        list: '.o-about__desc',
        items: '.o-about__block',
        animation: 'slow'
      });
      $('.o-about__pager').jcarouselPagination({
        item: function(page) {
          return '<a href="#' + page + '" class="o-jcarousel__pager-item"></a>';
        }
      });

      $('.o-jcarousel__pager-item:first-child').trigger('click');

      _cache.aboutCarousel.animate({opacity:1}, 'slow');
    },
    _destroyAboutCarousel = function () {
      _cache.aboutCarousel.jcarousel('destroy');
    },
    _initCustomersCarousel = function () {
      _cache.customersCarousel.jcarousel({
        list: '.o-customers__container',
        items: '.o-customers__item',
        animation: 'slow',
        wrap: 'circular'
      }).jcarouselAutoscroll({
        interval: 3000,
        target: '+=1',
        autostart: true
      });
    },
    _destroyCustomerCarousel = function () {
      _cache.customersCarousel.jcarousel('destroy');
    },
    _reloadCustomerCarousel = function () {
      _cache.customersCarousel.jcarousel('reload');
    },
    _toggleAudio = function () {
      if (_cache.audioIcon.hasClass('fa-pause')) {
        _cache.audioObj[0].pause();
      } else {
        _cache.audioObj[0].play();
      }
    },
    _toggleAudioIcon = function () {
      _cache.audioIcon.toggleClass('fa-pause');
    },
    _stopAudio = function () {
      _cache.audioObj[0].pause();
      _cache.audioObj[0].currentTime = 0;
      _cache.audioIcon.removeClass('fa-pause');
    },
    _scrollTo = function (_container, _hash) {
      var _anchor = $(_hash),
          _distance = _anchor.position().top + _container.scrollTop();

      _container.animate({scrollTop: _distance}, 500);
    },
    _closeCase = function () {
      if (_cache.root.scrollTop() > 0) {
        _cache.root.animate({scrollTop: 0}, 500, 'swing', function () {
          _flip('case');
          setTimeout(function () {
            Utils.cleanContainer(_cache.caseInfoContainer);
            Utils.cleanContainer(_cache.caseMediaContainer);
          }, 500);
        });
      } else {
        _flip('case');
        setTimeout(function () {
          Utils.cleanContainer(_cache.caseInfoContainer);
          Utils.cleanContainer(_cache.caseMediaContainer);
        }, 500);
      }
    },
    _renderImgDay = function () {
      _cache.imgDayContainer.css('background-image', 'url(' + Service.dayImg[0].url + ')');
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
    _closeFlip = function (_type) {
      _flip(_type);
    },
    _switchFlip = function (_type, _currentType) {
      _closeFlip(_currentType);

      setTimeout(function () {
        _flip(_type);
      }, 800);
    },
    _flip = function (_type) {
      var flipExist = $('js-flip').length;

      /*Customers functionaliy*/
      // if (_type === 'customers') {
      //   if (_cache.customersB.hasClass('js-flip')) {
      //     setTimeout(function () {
      //       _cache.customersB.hide();
      //       _cache.customersCarousel.fadeOut();
      //     }, 900);
      //   } else {
      //     if (flipExist) {
      //       setTimeout(function () {
      //         _cache.customersCarousel.delay(1000).fadeIn();
      //       }, 900);
      //     } else {
      //       _cache.customersB.show();
      //       _cache.customersCarousel.delay(1000).fadeIn();
      //     }
      //   }
      // }

      /*If audio card stop audio and close flop*/
      if (_type === 'audio') {
        if (_cache.audioCard.hasClass('js-flip')) {
          setTimeout(function () {
            _stopAudio();
          }, 900);
        }
      }

      /*Create/reload carousel when open about card*/
      if (_type === "about") {
        if (!_cache.aboutB.hasClass('js-flip')) {
          setTimeout(function () {
            _initAboutCarousel();
          }, 900);
        }
      }

      /*Create/reload carousel when open customers card*/
      if (_type === "customers") {
        if (!_cache.customersB.hasClass('js-flip')) {
          if (flipExist) {
            setTimeout(function () {
              _cache.customersB.show();
              _initCustomersCarousel();
              _cache.customersCarousel.delay(1000).animate({opacity:1}, 'slow');
            }, 900);
          } else {
            _cache.customersB.show();
            _initCustomersCarousel();
            _cache.customersCarousel.delay(1000).animate({opacity:1}, 'slow');
          }
        } else {
          setTimeout(function () {
            _cache.customersB.hide();
            _destroyCustomerCarousel();
            _cache.customersCarousel.animate({opacity:0}, 'slow');
          }, 900);
        }
      }

      /*Toggle flip logic*/
  		$('.o-card--' + _type + '-a').toggleClass('js-flip');

  		setTimeout(function () {
  			$('.o-card--' + _type + '-b').toggleClass('js-flip');
  		}, 200);

      // /*Crew ghost div show or hide*/
  		// if (_type === "case" || _type === "about") {
  		// 	if (_cache.crewB.hasClass('js-hide')) {
  		// 		setTimeout(function () {
  		// 			_cache.crewB.toggleClass('js-hide');
  		// 		}, 900);
  		// 	} else {
  		// 		_cache.crewB.toggleClass('js-hide');
  		// 	}
  		// }
      //
      // /*If case scroll to top*/
      // if (_type === 'case') {
      //   Utils.resetScroll(_cache.root);
      // }
  	},

    /*Public*/
    init = function (_bricks) {
      _cache = _getSelectors(_bricks);
      _bindEvents();
      _renderImgDay();
    };

    return {
      init: init
    };

  }());

  global.Desktop = Desktop;

}(window));
