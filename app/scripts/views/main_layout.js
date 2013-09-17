/*global define*/

define([
	'backbone.marionette',
	'templates'
], function (Marionette, JST) {
	'use strict';

	var Layout = Marionette.Layout.extend({
		template: JST['app/scripts/templates/main.hbs'],
		className: 'row',

		regions: {
			asideRegion: '#aside-region',
			contentRegion: '#content-region'
		}
	});

	return Layout;
});
