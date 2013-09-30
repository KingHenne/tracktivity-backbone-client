/*global define*/

define([
	'backbone.marionette',
	'views/map_view',
	'hbs!template/live'
], function (Marionette, MapView, tmplLayout) {
	'use strict';

	var Layout = Marionette.Layout.extend({
		template: {
			type: 'handlebars',
			template: tmplLayout
		},
		className: 'row',

		regions: {
			contentRegion: '#content-region'
		},

		initialize: function() {
			this.mapView = new MapView();
		},

		onShow: function() {
			this.contentRegion.show(this.mapView);
		}
	});

	return Layout;
});
