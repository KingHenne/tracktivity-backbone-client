/*global define*/

define([
	'backbone.marionette',
	'views/live_layout',
	'views/error_view'
], function (Marionette, Layout, ErrorView) {
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
				this.connect('ws://localhost:8080/live');
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
				this.layout.contentRegion.show(new ErrorView({error:'WebSocket is not supported by this browser.'}));
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
			console.log('WebSocket received a message:', message.data);
		}
	});

	return Controller;
});
