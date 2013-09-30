/*global define*/

define([
	'backbone.marionette',
	'views/map_view',
	'hbs!template/activity_details',
	'hbs!template/activity_show',
	'leaflet'
], function (Marionette, MapView, tmplDetails, tmplLayout, L) {
	'use strict';

	var DetailView = Marionette.ItemView.extend({
		template: {
			type: 'handlebars',
			template: tmplDetails
		},
		modelEvents: {
			'change': 'render'
		}
	});

	var Layout = Marionette.Layout.extend({
		template: {
			type: 'handlebars',
			template: tmplLayout
		},

		regions: {
			details: '.details',
			map: '.map'
		},

		initialize: function(options) {
			this.outerRegion = options.region;
			this.mapView = new MapView();
		},

		showActivity: function(activity) {
			if (this.outerRegion.currentView !== this) {
				this.outerRegion.show(this);
				this.map.show(this.mapView);
			}
			this.details.show(new DetailView({model: activity}));
		}
	});

	return Layout;
});
