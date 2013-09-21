/*global define*/

define([
	'backbone.marionette',
	'templates',
	'leaflet'
], function (Marionette, JST, Leaflet) {
	'use strict';

	var DetailView = Marionette.ItemView.extend({
		template: JST['app/scripts/templates/activity_details.hbs'],
		modelEvents: {
			'change': 'render'
		}
	});

	var MapView = Marionette.ItemView.extend({
		render: function() {
			this.isClosed = false;
			this.map = Leaflet.map(this.el);
			Leaflet.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
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
			this.multiPolyline = Leaflet.multiPolyline(
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
		template: JST['app/scripts/templates/activity_show.hbs'],
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
		},

		onClose: function() {
			
		}
	});

	return Layout;
});
