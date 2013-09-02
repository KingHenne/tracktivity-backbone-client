/*global define*/

define([
	'backbone',
	'backbone.marionette',
	'entities/users',
	'modules/users/list/list_users_controller',
	'wreqr'
], function (Backbone, Marionette, Users, UserController, Wreqr) {
	'use strict';

	var AppRouter = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			'': 'listUsers',
			'users/:username': 'showUser'
		},
	});

	var App = new Marionette.Application();
	
	var userController = new UserController();

	App.addRegions({
		asideRegion: '#aside-region',
		contentRegion: '#content-region'
	});
	
	var API = {
		listUsers: function() {
			App.asideRegion.show(userController.listUsers());
		},
		showUser: function(username) {
			Backbone.history.navigate('users/' + username);
			userController.showUser(username);
		}
	};

	Wreqr.vent.on('show:user', function(user) {
		API.showUser(user.get('username'));
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
