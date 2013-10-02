/*global define, MozWebSocket*/

define([
	'underscore',
	'backbone.marionette',
	'views/live_layout',
	'views/error_view'
], function (_, Marionette, Layout, ErrorView) {
	'use strict';

	var Controller = Marionette.Controller.extend({
		initialize: function(appRegion) {
			this.appRegion = appRegion;
			this.layout = new Layout();
			_.bindAll(this, 'onSocketOpen', 'onSocketClose', 'onSocketMessage');
		},

		showLiveTracking: function() {
			this.appRegion.show(this.layout);
			if (window.location.protocol === 'http:') {
				this.connect('ws://' + window.location.host + ':8080/live');
			} else {
				this.connect('wss://hendrik:123456@' + window.location.host + '/live');
			}
		},

		connect: function(host) {
			if ('WebSocket' in window) {
				this.socket = new WebSocket(host);
			} else if ('MozWebSocket' in window) {
				this.socket = new MozWebSocket(host);
			} else {
				this.layout.contentRegion.show(new ErrorView({
					error: 'WebSocket is not supported by this browser.'
				}));
				return;
			}
			this.socket.onopen = this.onSocketOpen;
			this.socket.onclose = this.onSocketClose;
			this.socket.onmessage = this.onSocketMessage;
		},

		onSocketOpen: function() {
			console.log('WebSocket connection opened.');
		},

		onSocketClose: function() {
			console.log('WebSocket closed.');
		},

		onSocketMessage: function(message) {
			var data = JSON.parse(message.data);
			if (data.event === 'STARTED') {
				console.log('User ' + data.username + ' started an activity.');
			} else if (data.event === 'RECORDING') {
				this.layout.mapView.showUserLocation(data.username, data.point);
			} else if (data.event === 'PAUSED') {
				console.log('User ' + data.username + ' paused his activity.');
			} else if (data.event === 'FINISHED') {
				console.log('User ' + data.username + ' finished his activity.');
				this.layout.mapView.deleteUserLocation(data.username);
			}
		}
	});

	return Controller;
});
