/*global define*/

define([
	'underscore',
	'backbone',
	'models/Activity-model'
], function (_, Backbone, Activity) {
	'use strict';

	var ActivitiesCollection = Backbone.Collection.extend({
		model: Activity,
		url: '/api/activities'
	});

	return ActivitiesCollection;
});