/*global define*/

define([
	'jquery',
	'backbone',
	'views/Navigation-view'
], function ($, Backbone, NavigationView) {
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
			console.warn('TODO: Display activity %s in a detail view.', activity.get('id'));
		}
	});

	return AppRouter;
});