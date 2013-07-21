/*global define*/

define([
	'jquery',
	'backbone',
	'views/Navigation-view',
	'views/Activity-view',
	'models/Activity-model'
], function ($, Backbone, NavigationView, ActivityView, Activity) {
	'use strict';

	var AppRouter = Backbone.Router.extend({
		routes: {
			'': 'home',
			'users/:username': 'user',
			'users/:username/activities/:activityId': 'userActivity'
		},

		initialize: function(options) {
			this.navigationView = new NavigationView({
				el: '#navigation',
				users: options.users
			});
			this.activityView = new ActivityView({
				el: '#activityDetail',
				model: new Activity()
			});
		},

		home: function() {
			if (this.navigationView.isEmpty()) {
				this.navigationView.render();
			} else {
				this.navigationView.reset();
			}
		},

		user: function(username) {
			this.navigationView.selectUser(username);
		},

		userActivity: function(username, activityId) {
			var activity = this.navigationView.selectActivity(activityId);
			this.activityView.model.set(activity.attributes);
		}
	});

	return AppRouter;
});