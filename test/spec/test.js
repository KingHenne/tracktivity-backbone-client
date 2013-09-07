/*global define, describe, it, expect */
'use strict';

define([
	'backbone',
	'backbone.marionette',
	'utils/dispatcher'
], function (Backbone, Marionette, Dispatcher) {

	describe('The Dispatcher', function () {
		it('should have valid shortcuts for Wreqr\'s reqres functions', function (done) {
			Dispatcher.setHandler('test', function() { return 'OK'; });
			var result = Dispatcher.request('test');
			expect(result).to.equal('OK');
			done();
		});
		it('should have valid shortcuts for Wreqr\'s event functions', function () {
			var result = null;
			Dispatcher.on('test', function() { result = 'OK'; });
			Dispatcher.trigger('test');
			expect(result).to.equal('OK');
		});
	});
})();
