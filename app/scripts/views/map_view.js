/*global define*/

define([
	'backbone.marionette',
	'hbs!template/activity_details',
	'hbs!template/activity_show',
	'leaflet'
], function (Marionette, tmplDetails, tmplLayout, L) {
	'use strict';

	var View = Marionette.ItemView.extend({
		initialize: function() {
			this.userMarkers = {};
		},

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

		_showMap: function() {
			if (this.$el.is(':hidden')) {
				this.$el.fadeIn();
			}
		},

		showMultiPolyline: function(multiPolyline) {
			this._showMap();
			if (this.multiPolyline) {
				this.map.removeLayer(this.multiPolyline);
			}
			this.multiPolyline = L.multiPolyline(multiPolyline, {color: '#0073E5', opacity: 0.8});
			this.multiPolyline.addTo(this.map);
			this.map.fitBounds(this.multiPolyline.getLatLngs());
		},

		showUserLocation: function(username, point) {
			this._showMap();
			var latlng = new L.LatLng(point.lat, point.lon);
			var marker = this.userMarkers[username];
			if (marker) {
				marker.setLatLng(latlng);
			} else {
				marker = L.marker(latlng);
				marker.addTo(this.map);
				this.userMarkers[username] = marker;
			}
			// TODO: only pan/zoom if the user hasn't panned/zoomed
			this.map.setView(latlng, 16);
		},

		deleteUserLocation: function(username) {
			var marker = this.userMarkers[username];
			if (marker) {
				this.map.removeLayer(marker);
				delete this.userMarkers[username];
			}
		},

		onBeforeClose: function() {
			this.map.remove();
		}
	});

	return View;
});
