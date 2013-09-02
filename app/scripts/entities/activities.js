/*global define*/

define([
	'underscore',
	'backbone',
	'entities/activity'
], function (_, Backbone, Activity) {
	'use strict';

	var Activities = Backbone.Collection.extend({
		model: Activity,
		url: '/api/activities'
	});

	return Activities;
});