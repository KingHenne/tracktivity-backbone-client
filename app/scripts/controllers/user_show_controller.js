/*global define*/

define([
	'jquery',
	'underscore',
	'backbone.marionette',
	'utils/dispatcher'
], function ($, _, Marionette, Dispatcher) {
	'use strict';

	var Controller = Marionette.Controller.extend({
		initialize: function(optons) {
			this.user = options.user;
			this.region = options.region;
		},

		showUser: function() {
			
		}
	});

	return Controller;
});
