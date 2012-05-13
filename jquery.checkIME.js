!function( $ ){
	var CheckIME = function ( element, options ) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.checkIME.defaults, options);
		// check
		var keypressCount = 0;
		var isKeyDown = false;
		var data = {};
		var checkKeyPress = function(e) {
			if (e.keyCode != 241 && e.keyCode != 242) {
				keypressCount++;
			}
		}
		var checkKeyDown = function(e) {
			isKeyDown = e.keyCode == 229 || !($.browser.msie || $.browser.webkit);
		}
		var checkKeyUp = function(e) {
			var $this = $(this);
			var triggers = [];
			var _status = 0;
			data.keyCode = e.keyCode;
			keypressCount--;
			triggers.push('checkIME.keyup');
			if ( keypressCount < 0 ) {
				if (e.keyCode == 13) {
					_status = -1; // confirmed conversion
					triggers.push('checkIME.confirmed');
				} else if (isKeyDown) {
					_status = 1; // in progress
					triggers.push('checkIME.progress');
				}
			}
			if (!_status) {
				// ime-mode on
				triggers.push('checkIME.imeon');
				keypressCount = 0;
			} else {
				// ime-mode off
				triggers.push('checkIME.imeoff');
			}
			$this.attr('data-checkime', data.status = _status);
			// triger
			$.each(triggers, function(i, t){
				$this.triggerHandler(t, data);
			});
			return data.status;
		}
		// bind
		$(element).keyup(checkKeyUp).keypress(checkKeyPress).keydown(checkKeyDown);
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
