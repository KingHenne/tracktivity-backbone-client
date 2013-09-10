/*global define*/

define([
	'backbone.marionette',
	'templates'
], function (Marionette, JST) {
	'use strict';

	var View = Marionette.ItemView.extend({
		template: JST['app/scripts/templates/activity_show.hbs'],
		modelEvents: {
			'change': 'render'
		}
	});

	return View;
});
