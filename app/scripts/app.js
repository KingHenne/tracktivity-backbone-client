/*global define*/

define([
	'jquery',
	'backbone',
	'backbone.marionette',
	'entities/users',
	'controllers/main_user_activity_controller',
	'utils/dispatcher'
], function ($, Backbone, Marionette, Users, UserActivityController, Dispatcher) {
	'use strict';

	var AppRouter = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			'': 'listUsers',
			'users/:username': 'showUser',
			'activities/:activityId': 'showActivity',
			'users/:username/activities/:activityId': 'showUserActivity'
		},
	});

	var App = new Marionette.Application();

	App.addRegions({
		headRegion: '#head-region',
		mainRegion: '#main-region'
	});

	var userActivityController = new UserActivityController(App.mainRegion);

	var API = {
		listUsers: function() {
			userActivityController.listUsers();
		},
		// 'user' can be either a User entity (i.e. object) or a username (i.e. string)
		showUser: function(user) {
			userActivityController.showUser(user);
		},
		// 'activity' can be either an Activity entity (i.e. object) or an id (i.e. string)
		showActivity: function(activity) {
			userActivityController.showActivity(activity);
		},
		showUserActivity: function(user, activity) {
			userActivityController.showUserActivity(user, activity);
		}
	};

	Dispatcher.on('show:user', function(user) {
		Backbone.history.navigate('users/' + user.get('username'));
		API.showUser(user);
	});

	Dispatcher.on('show:activity', function(activity) {
		Backbone.history.navigate('activities/' + activity.get('id'));
		API.showActivity(activity);
	});

	Dispatcher.on('show:user:activity', function(user, activity) {
		Backbone.history.navigate('users/' + user.get('username') + '/activities/' + activity.get('id'));
		API.showUserActivity(user, activity);
	});

	Dispatcher.setHandler('user:entities', function() {
		var users = new Users();
		var deferred = $.Deferred();
		users.fetch().done(function() {
			deferred.resolve(users);
		});
		return deferred.promise();
	});

	App.addInitializer(function() {
		new AppRouter({controller: API});
		Backbone.history.start({pushState: true});
	});

	return App;
});
