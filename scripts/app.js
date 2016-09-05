(function (window) {
	'use strict';

	$('.o-brick').on('click', function () {
		var type = $(this).data('type');

		$('.o-card--' + type + '-a').toggleClass('js-flip');

		setTimeout(function () {
			$('.o-card--' + type + '-b').toggleClass('js-flip');
		}, 200);

		if (type === "case" || type === "about") {
			if ($('.o-card--creew-b').hasClass('js-hide')) {
				setTimeout(function () {
					$('.o-card--creew-b').toggleClass('js-hide');
				}, 900);
			} else {
				$('.o-card--creew-b').toggleClass('js-hide');
			}
		}
	});


})(window); 
