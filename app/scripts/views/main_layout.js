/*global define*/

define([
	'backbone.marionette',
	'hbs!template/main'
], function (Marionette, tmplLayout) {
	'use strict';

	var Layout = Marionette.Layout.extend({
		template: {
			type: 'handlebars',
			template: tmplLayout
		},
		className: 'row',

		regions: {
			asideRegion: '#aside-region',
			contentRegion: '#content-region'
		}
	});

	return Layout;
});
