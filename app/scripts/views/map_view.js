/*global define*/

define([
	'backbone.marionette',
	'hbs!template/activity_details',
	'hbs!template/activity_show',
	'leaflet'
], function (Marionette, tmplDetails, tmplLayout, L) {
	'use strict';

	var View = Marionette.ItemView.extend({
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

		showMultiPolyline: function(multiPolyline) {
			if (this.$el.is(':hidden')) {
				this.$el.fadeIn();
			}
			if (this.multiPolyline) {
				this.map.removeLayer(this.multiPolyline);
			}
			this.multiPolyline = L.multiPolyline(multiPolyline, {color: '#0073E5', opacity: 0.8});
			this.multiPolyline.addTo(this.map);
			this.map.fitBounds(this.multiPolyline.getLatLngs());
		},

		onBeforeClose: function() {
			this.map.remove();
		}
	});

	return View;
});
