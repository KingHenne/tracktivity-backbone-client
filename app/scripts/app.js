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
	
	var userActivityController = new UserActivityController();
	App.mainRegion.show(userActivityController.getLayout());
	
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
		// TODO: fetch from API instead
		return testUsers;
	});

	return App;
});
