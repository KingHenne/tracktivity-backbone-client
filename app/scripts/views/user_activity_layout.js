/*global define*/

define([
	'backbone.marionette',
	'templates'
], function (Marionette, JST) {
	'use strict';

	var Layout = Marionette.Layout.extend({
		template: JST['app/scripts/templates/user_activty_layout.hbs'],

		regions: {
			asideRegion: '#aside-region',
			contentRegion: '#content-region'
		}
	});

	return Layout;
});
