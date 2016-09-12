(function (window) {
	'use strict';

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

	function flipMobile (type, info) {
		$('.o-container').hide();
		$('#' + info).show();
		$('.o-card--' + type).toggleClass('js-flip');
	}

	$('.o-brick').on('click', function (evt) {
		evt.preventDefault();

		var type = $(this).data('type');

		if (type === 'full') {
			var showInfo = $(this).data('show');
			flipMobile(type, showInfo);
		} else {
			flipDesk(type);
		}

	});


	$('.o-close').on('click', function (evt) {
		evt.preventDefault();

		$('.o-card').removeClass('js-flip');
	});


})(window); 
