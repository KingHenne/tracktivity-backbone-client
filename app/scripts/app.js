/*global define*/

define([
	'backbone',
	'backbone.marionette',
	'entities/users',
	'controllers/user_activity_controller',
	'wreqr'
], function (Backbone, Marionette, Users, UserActivityController, Wreqr) {
	'use strict';

	var AppRouter = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			'': 'listUsers',
			'users/:username': 'showUser'
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
		showUser: function(username) {
			userActivityController.showUser(username);
		}
	};

	Wreqr.vent.on('show:user', function(user) {
		var username = user.get('username');
		Backbone.history.navigate('users/' + username);
		API.showUser(username);
	});

	App.addInitializer(function(options) {
		var appRouter = new AppRouter({controller: API});
		Backbone.history.start({pushState: true});
	});

	var testUsers = new Users([
		{username: 'hendrik', firstname: 'Hendrik', lastname: 'Liebau'},
		{username: 'anna', firstname: 'Anna', lastname: 'Schinko'},
		{username: 'hanswurst', firstname: 'Hans', lastname: 'Wurst'}
	]);
	
	Wreqr.reqres.setHandler('user:entities', function() {
		var users = new Users();
		// TODO: fetch from API instead of mocking with test users
		// (Backbone's Collection.fetch returns a promise as well)
		users.fetch = function() {
			var deferred = $.Deferred();
			deferred.resolve(testUsers);
			return deferred.promise();
		};
		return users.fetch();
	});

	return App;
});
