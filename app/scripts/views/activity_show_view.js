/*global define*/

define([
	'backbone.marionette',
	'templates',
	'leaflet'
], function (Marionette, JST, Leaflet) {
	'use strict';

	var View = Marionette.ItemView.extend({
		template: JST['app/scripts/templates/activity_show.hbs'],
		modelEvents: {
			'change': 'render'
		},

		onRender: function() {
			var track = this.model.get('track');
			if (track) {
				var mapContainer = this.$('.activity-map')[0];
				this.map = Leaflet.map(mapContainer);

				Leaflet.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
					key: '6eac6d67cf3f4fa8a18bbf5bec747cdc',
					styleId: 70963,
				    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://cloudmade.com">CloudMade</a>',
				    maxZoom: 18,
				    detectRetina: true
				}).addTo(this.map);

				this.showTrack(track);
			}
		},

		showTrack: function(track) {
			if (this.multiPolyline) {
				this.map.removeLayer(this.multiPolyline);
			}
			this.multiPolyline = Leaflet.multiPolyline(track.sparseMultiPolyline, {color: '#0073E5', opacity: 0.8});
			this.multiPolyline.addTo(this.map);
			this.map.fitBounds(track.latLngBounds);
		}
	});

	return View;
});
