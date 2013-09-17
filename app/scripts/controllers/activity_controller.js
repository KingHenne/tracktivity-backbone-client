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
			if (this.view) {
				this.view.model = activity;
			} else {
				this.view = new ActivityView({ model: activity });
			}
			if (this.region.currentView === this.view) {
				activity.getTrack().then(_.bind(this.view.showTrack, this.view));
			} else {
				this.region.show(this.view);
				activity.fetch();
			}
		}
	});

	return Controller;
});
