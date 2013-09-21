/*global define*/

define([
	'backbone.marionette',
	'hbs!template/activity_details',
	'hbs!template/activity_show',
	'leaflet'
], function (Marionette, tmplDetails, tmplLayout, L) {
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

	var MapView = Marionette.ItemView.extend({
		render: function() {
			this.isClosed = false;
			this.map = L.map(this.el);
			L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
				key: '6eac6d67cf3f4fa8a18bbf5bec747cdc',
				styleId: 70963,
			    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://cloudmade.com">CloudMade</a>',
			    maxZoom: 18,
			    detectRetina: true
			}).addTo(this.map);
			return this;
		},

		showTrack: function(track) {
			if (this.$el.is(':hidden')) {
				this.$el.fadeIn();
			}
			if (this.multiPolyline) {
				this.map.removeLayer(this.multiPolyline);
			}
			this.multiPolyline = L.multiPolyline(
				track.sparseMultiPolyline,
				{color: '#0073E5', opacity: 0.8}
			);
			this.multiPolyline.addTo(this.map);
			this.map.fitBounds(track.latLngBounds);
		},

		onBeforeClose: function() {
			this.map.remove();
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
