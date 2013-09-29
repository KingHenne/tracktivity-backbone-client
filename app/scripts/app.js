/*global define*/

define([
	'jquery',
	'backbone',
	'backbone.marionette',
	'entities/users',
	'controllers/navigation_controller',
	'controllers/main_user_activity_controller',
	'controllers/live_controller',
	'utils/dispatcher'
], function ($, Backbone, Marionette, Users, NavigationController, UserActivityController, LiveController, Dispatcher) {
	'use strict';

	var App = new Marionette.Application();

	App.addRegions({
		headRegion: '#head-region',
		mainRegion: '#main-region'
	});

	var AppRouter = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			'': 'listUsers',
			'users/:username': 'showUser',
			'activities/:activityId': 'showActivity',
			'users/:username/activities/:activityId': 'showUserActivity',
			'live': 'showLiveTracking',
			'about': 'showAbout'
		},
	});

	var userActivityController = new UserActivityController(App.mainRegion);
	var liveController = new LiveController(App.mainRegion);

	// helpers for array-like objects, e. g. arguments
	var array = [];
	var slice = array.slice;

	var routes = {
		execute: function(route) {
			this[route].apply(this, array.slice.call(arguments, 1));
			this.onRouteEvent.apply(this, arguments);
		},
		onRouteEvent: function(route) {
			Dispatcher.trigger('route', route);
		},
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
		},
		showLiveTracking: function() {
			liveController.showLiveTracking();
		},
		showAbout: function() {
			console.warn('The "about" view has not been implemented yet.');
		}
	};
	
	App.router = new AppRouter({controller: routes});
	App.router.on('route', routes.onRouteEvent);

	Dispatcher.on('show:user', function(user) {
		App.router.navigate('users/' + user.get('username'));
		routes.execute('showUser', user);
	});

	Dispatcher.on('show:activity', function(activity) {
		App.router.navigate('activities/' + activity.get('id'));
		routes.execute('showActivity', activity);
	});

	Dispatcher.on('show:user:activity', function(user, activity) {
		App.router.navigate('users/' + user.get('username') + '/activities/' + activity.get('id'));
		routes.execute('showUserActivity', user, activity);
	});

	Dispatcher.setHandler('user:entities', function() {
		var users = new Users();
		var deferred = $.Deferred();
		users.fetch()
			.done(function() {
				deferred.resolve(users);
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				deferred.reject(errorThrown);
			});
		return deferred.promise();
	});

	App.addInitializer(function() {
		var navController = new NavigationController(this.headRegion);
		Backbone.history.start({pushState: true});
	});

	return App;
});
