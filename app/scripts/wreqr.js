/*global define*/

define([
	'backbone.wreqr'
], function (Wreqr) {
	'use strict';

	var wreqr = {
		vent: new Wreqr.EventAggregator(),
		commands: new Wreqr.Commands(),
		reqres: new Wreqr.RequestResponse()
	};
	
	return wreqr;
});
