/*global define*/

define([
	'jquery',
	'underscore',
	'backbone.marionette',
	'entities/Activity',
	'views/activity_show_view'
], function ($, _, Marionette, Activity, ActivityView) {
	'use strict';

	var Controller = Marionette.Controller.extend({
		initialize: function(options) {
			this.region = options.region;
		},

		showActivity: function(activityId) {
			var activity = new Activity({ id: activityId });
			this.view = new ActivityView({ model: activity });
			this.region.show(this.view);
			activity.fetch();
		}
	});

	return Controller;
});
