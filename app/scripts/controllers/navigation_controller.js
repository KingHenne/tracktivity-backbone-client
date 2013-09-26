
/*global define*/

define([
	'backbone.marionette',
	'views/navigation_view'
], function (Marionette, View) {
	'use strict';

	var Controller = Marionette.Controller.extend({
		initialize: function(appRegion) {
			this.view = new View({el: appRegion.el});
			this._bindEvents();
		},

		_bindEvents: function() {
			// TODO: listen vor navigation events and update view accordingly
		}
	});

	return Controller;
});
