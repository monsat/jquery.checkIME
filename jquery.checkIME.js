!function( $ ){
	var CheckIME = function ( element, options ) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.checkIME.defaults, options);
		// check
		var keypressCount = 0;
		var confirm = false;
		var checkImeModeOn = function(e) {
			var $this = $(this);
			var data = { status: 0, keyCode: e.keyCode};
			var triggers = [];
			if (e.type == 'keypress' && (e.keyCode != 241) && (e.keyCode != 242)) {
				keypressCount++;
			} else if (e.type == 'keyup') {
				keypressCount--;
				triggers.push('checkIME.keyup');
				if ( keypressCount < 0 ) {
					if (e.keyCode == 13) {
						data.status = -1; // confirmed conversion
						confirm = true;
						triggers.push('checkIME.confirmed');
					} else if (!confirm) {
						data.status = 1; // in progress
						triggers.push('checkIME.progress');
					} else {
						confirm = false;
					}
					triggers.push('checkIME.imeon');
					keypressCount = 0;
				} else {
					data.status = 0; // ime-mode off
					triggers.push('checkIME.imeoff');
				}
			}
			$this.attr('data-checkime', data.status);
			// triger
			$.each(triggers, function(i, t){
				$this.triggerHandler(t, data);
			});
			return data.status;
		}
		// bind
		$(element).keyup(checkImeModeOn)
			.keypress(checkImeModeOn);
	}
	CheckIME.prototype = {
		constructor: CheckIME
	}
	/* PLUGIN DEFINITION
	 * =========================== */
	$.fn.checkIME = function ( option ) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('checkIME');
			var options = typeof option == 'object' && option;
			if (!data) {
				$this.data('checkIME', (data = new CheckIME(this, options)));
			}
		});
	}
	// default options
	$.fn.checkIME.defaults = {};
	// construct
	$.fn.checkIME.Constructor = CheckIME;
	/* DATA-API
	 * ================== */
	$(function () {
		$('body').on('focus.checkIME.data-api', '[data-provide="checkIME"]', function (e) {
			var $this = $(this);
			$this.checkIME();
		});
	});
}( window.jQuery );
