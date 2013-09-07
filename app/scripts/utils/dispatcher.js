/*global define*/

define([
	'backbone.wreqr'
], function (Wreqr) {
	'use strict';

	var dispatcher = {
		events: new Wreqr.EventAggregator(),
		commands: new Wreqr.Commands(),
		reqres: new Wreqr.RequestResponse()
	};

	// shortcuts for common methods
	dispatcher.on = function() {
		return this.events.on.apply(this.events, arguments);
	};
	dispatcher.trigger = function() {
		return this.events.trigger.apply(this.events, arguments);
	};
	dispatcher.setHandler = function() {
		return this.reqres.setHandler.apply(this.reqres, arguments);
	};
	dispatcher.request = function() {
		return this.reqres.request.apply(this.reqres, arguments);
	};

	return dispatcher;
});
