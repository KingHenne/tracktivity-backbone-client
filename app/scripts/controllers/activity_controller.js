/*global define*/

define([
	'jquery',
	'underscore',
	'backbone.marionette'
], function ($, _, Marionette) {
	'use strict';

	var Controller = Marionette.Controller.extend({
		initialize: function(options) {
			this.region = options.region;
		},

		showActivity: function(activity) {
			
		}
	});

	return Controller;
});
