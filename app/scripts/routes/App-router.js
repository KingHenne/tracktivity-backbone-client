/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'views/Navigation-view',
	'views/Activity-view',
	'models/Activity-model'
], function ($, _, Backbone, NavigationView, ActivityView, Activity) {
	'use strict';

	var AppRouter = Backbone.Router.extend({
		routes: {
			'': 'home',
			'users/:username': 'user',
			'users/:username/activities/:activityId': 'userActivity'
		},

		initialize: function(options) {
			this.users = options.users;
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
			if (this.isReload()) {
				this.navigationView.render();
			} else {
				this.navigationView.reset();
				this.user = null;
				this.activity = null;
			}
		},

		user: function(username) {
			if (this.isReload()) {
				this.home();
			}
			this.user = this.navigationView.selectUser(username);
			this.activity = null;
		},

		userActivity: function(username, activityId) {
			if (this.isReload()) {
				this.listenToOnce(this.users, 'reset', _.bind(this.user, this, username));
			}
			var activity = this.navigationView.selectActivity(activityId);
			this.activityView.model.set(activity.attributes);
		},

		isReload: function() {
			return this.navigationView.isEmpty();
		}
	});

	return AppRouter;
});