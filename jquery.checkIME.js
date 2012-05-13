!function( $ ){
	var CheckIME = function ( element, options ) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.checkIME.defaults, options);
		// check
		var keypressCount = 0;
		var checkImeModeOn = function(e) {
			var $this = $(this);
			var status = 0;
			if (e.type == 'keypress' && (e.keyCode != 241) && (e.keyCode != 242)) {
				keypressCount++;
			} else if (e.type == 'keyup') {
				keypressCount--;
				if ( keypressCount < 0 ) {
					if (e.keyCode == 13) {
						status = 9; // confirmed conversion
						$this.triggerHandler('checkIME.confirmed', {status: status});
					} else {
						status = 1; // in progress
						$this.triggerHandler('checkIME.progress', {status: status});
					}
					keypressCount = 0;
					$this.triggerHandler('checkIME.imeon', {status: status});
				} else {
					status = 0; // ime-mode off
					$this.triggerHandler('checkIME.imeoff', {status: status});
				}
			}
			$this.data('data-checkime', status);
			return status;
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
