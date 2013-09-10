/*global define*/

define([
	'underscore',
	'backbone',
], function (_, Backbone) {
	'use strict';

	var Activity = Backbone.Model.extend({
		url: function() {
			return '/api/activities/' + this.get('id')
		}
	});

	return Activity;
});