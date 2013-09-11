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

		showActivity: function(activity) {
			if (typeof activity === 'string') {
				activity = new Activity({ id: activity });
			}
			this.view = new ActivityView({ model: activity });
			this.region.show(this.view);
			activity.fetch();
		}
	});

	return Controller;
});
