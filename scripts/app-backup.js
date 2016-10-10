(function (window) {
	'use strict';

	var Utils = Utils || {
		create: function () {
			var instance = Object.create(this);
			return instance;
		},
		isMobile:function () {
			return $(window).innerWidth() < 768;
		}
	}
	window.Utils = Utils.create();



	function flipDesk(type) {
		$('.o-card--' + type + '-a').toggleClass('js-flip');

		setTimeout(function () {
			$('.o-card--' + type + '-b').toggleClass('js-flip');
		}, 200);

		if (type === "case" || type === "about") {
			if ($('.o-card--crew-b').hasClass('js-hide')) {
				setTimeout(function () {
					$('.o-card--crew-b').toggleClass('js-hide');
				}, 900);
			} else {
				$('.o-card--crew-b').toggleClass('js-hide');
			}
		}
	}

	function flipMobile (el) {
		var bricks = $('.o-layout--mobile .o-brick'),
				layout = $('.o-layout--mobile'),
				curtain = $('.o-curtain');

		if (el.hasClass('js-flip')) {
			closeCurtain(bricks, layout, curtain);
		} else {
			switchCurtain(bricks, layout, curtain, el);
		}
	}

	function closeCurtain (bricks, layout, curtain) {
		bricks.removeClass('js-flip');
		layout.removeClass('js-show-content js-translate-up js-translate-down');
	}

	function switchCurtain (bricks, layout, curtain, el) {
		var index = bricks.index(el);

		closeCurtain(bricks, layout, curtain);

		setTimeout(function () {
			el.addClass('js-flip');

			if (index !== bricks.length - 1) {
				var type = el.data('type');

				$('.o-content').hide();
				$('.o-content--' + type).show();
				layout.addClass('js-show-content');

				if (index > 1 && index < 4) {
					layout.addClass('js-translate-up');
					curtain.removeAttr('style').css('top', 100 / 4 * 2 + '%');
				} else if (index >= 4 && index < 6) {
					layout.addClass('js-translate-down');
					curtain.removeAttr('style').css('bottom', 100 / 4 * 2 + '%');
				} else if (index <= 1) {
					curtain.removeAttr('style').css('top', 100 / 4 + '%');
				} else if (index >= 6) {
					curtain.removeAttr('style').css('bottom', 100 / 4 + '%');
				}
			}
		}, 600);
	}
	

	$('.o-brick').on('click', function (evt) {
		evt.preventDefault();

		var type = $(this).data('type');

		if (Utils.isMobile()) {
			flipMobile($(this));
		} else {
			flipDesk(type);
		}

	});


	$('.o-close').on('click', function (evt) {
		evt.preventDefault();

		$('.o-card').removeClass('js-flip');
	});


})(window); 
