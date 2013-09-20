/*global define*/

define([
	'jquery',
	'underscore',
	'backbone.marionette',
	'controllers/user_list_controller',
	'controllers/user_show_controller',
	'controllers/activity_controller',
	'views/main_layout',
	'utils/dispatcher',
	'templates'
], function ($, _, Marionette, UserListController, UserShowController, ActivityController, Layout, Dispatcher, JST) {
	'use strict';

	var Controller = Marionette.Controller.extend({
		initialize: function(appRegion) {
			this.appRegion = appRegion;
		},

		renderLayout: function() {
			if (!this.layout) {
				this.layout = new Layout();
			}
			this.appRegion.show(this.layout);
		},

		isUserListRendered: function() {
			return !!this.userListController && this.userListController.isRendered();
		},

		isUserRendered: function(user) {
			return !!this.userShowController && this.userShowController.isUserRendered(user);
		},

		getHomeView: function() {
			if (!this._homeView) {
				this._homeView = new Marionette.ItemView({
					template: JST['app/scripts/templates/home_content.hbs']
				});
			}
			return this._homeView;
		},

		getErrorView: function(error) {
			return new Marionette.ItemView({
				template: JST['app/scripts/templates/error.hbs'],
				className: 'alert alert-danger',
				model: new Backbone.Model({error: error})
			});
		},

		listUsers: function(skipHomeContent) {
			var deferred = $.Deferred();
			if (!this.userListController) {
				this.renderLayout();
				Dispatcher.request('user:entities')
					.done(_.bind(function(users) {
						this.userListController = new UserListController({
							users: users,
							region: this.layout.asideRegion
						});
						this.userListController.listUsers();
						if (!skipHomeContent) {
							this.layout.contentRegion.show(this.getHomeView());
						}
						deferred.resolve();
					}, this))
					.fail(_.bind(function(error) {
						this.layout.contentRegion.show(this.getHomeView());
						this.layout.asideRegion.show(this.getErrorView(error));
					}, this));
			} else if (!this.userListController.isRendered()) {
				this.userListController.listUsers();
				deferred.resolve();
			} else {
				// already rendered, just reset to initial state
				this.userListController.reset();
				this.layout.contentRegion.show(this.getHomeView());
				deferred.resolve();
			}
			return deferred.promise();
		},

		_showUser: function(user) {
			// 'user' can also be a username (i.e. a string),
			// so we overwrite it here with the User entity.
			user = this.userListController.selectUser(user);
			if (!this.userShowController) {
				this.userShowController = new UserShowController({
					region: this.layout.contentRegion,
					user: user
				});
			}
			this.userShowController.showUser(user);
			return user;
		},
		showUser: function(user) {
			var deferred = $.Deferred();
			if (this.isUserListRendered()) {
				deferred.resolve(this._showUser(user));
			} else {
				this.listUsers(true).done(_.bind(function() {
					deferred.resolve(this._showUser(user));
				}, this));
			}
			return deferred.promise();
		},

		_showActivity: function(activity, region) {
			if (!this.activityController) {
				this.activityController = new ActivityController();
			}
			this.activityController.region = !!region ? region : this.layout.contentRegion;
			this.activityController.showActivity(activity);
		},
		showActivity: function(activity) {
			if (this.isUserListRendered()) {
				this._showActivity(activity);
			} else {
				this.listUsers(true).done(_.bind(function() {
					this._showActivity(activity);
				}, this));
			}
		},
		showUserActivity: function(user, activity) {
			if (this.isUserRendered(user)) {
				this._showActivity(activity, this.userShowController.getLayout(user).map);
			} else {
				this.showUser(user).done(_.bind(function(user) {
					this._showActivity(activity, this.userShowController.getLayout(user).map);
				}, this));
			}
		}
	});

	return Controller;
});
