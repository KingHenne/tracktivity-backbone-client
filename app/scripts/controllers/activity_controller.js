/*global define*/

define([
	'jquery',
	'underscore',
	'backbone.marionette',
	'entities/Activity',
	'views/activity_show_layout'
], function ($, _, Marionette, Activity, ActivityLayout) {
	'use strict';

	var Controller = Marionette.Controller.extend({
		getLayout: function(region) {
			if (!this.layout) {
				this.layout = new ActivityLayout({
					region: region
				});
				this.listenToOnce(this.layout, 'close', this.resetLayout);
			}
			return this.layout;
		},

		resetLayout: function() {
			if (this.layout.isClosed) {
				this.layout = null;
			}
		},

		showActivity: function(region, activity) {
			if (typeof activity === 'string') {
				activity = new Activity({ id: activity });
			}
			var layout = this.getLayout(region);
			layout.showActivity(activity);
			activity.getMultiPolyLine().done(function(multiPolyline) {
				layout.mapView.showMultiPolyline(multiPolyline);
			});
		}
	});

	return Controller;
});
