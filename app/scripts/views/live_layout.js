/*global define*/

define([
	'backbone.marionette',
	'hbs!template/live'
], function (Marionette, tmplLayout) {
	'use strict';

	var Layout = Marionette.Layout.extend({
		template: {
			type: 'handlebars',
			template: tmplLayout
		},
		className: 'row',

		regions: {
			contentRegion: '#content-region'
		}
	});

	return Layout;
});
