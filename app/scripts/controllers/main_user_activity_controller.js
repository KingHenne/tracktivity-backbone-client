/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'backbone.marionette',
	'controllers/user_list_controller',
	'controllers/user_show_controller',
	'controllers/activity_controller',
	'views/main_layout',
	'views/error_view',
	'utils/dispatcher',
	'hbs!template/home_content'
], function ($, _, Backbone, Marionette, UserListController, UserShowController, ActivityController, Layout, ErrorView, Dispatcher, tmplHomeContent) {
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
					template: {
						type: 'handlebars',
						template: tmplHomeContent
					}
				});
			}
			return this._homeView;
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
						this.layout.asideRegion.show(new ErrorView(error));
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

		_showUser: function(user, deferred) {
			// 'user' can also be a username (i.e. a string),
			// so we overwrite it here with the User entity.
			user = this.userListController.selectUser(user);
			if (!this.userShowController) {
				this.userShowController = new UserShowController({
					region: this.layout.contentRegion,
					user: user
				});
			}
			this.userShowController.showUser(user).done(function() {
				deferred.resolve(user);
			});
		},
		showUser: function(user) {
			var deferred = $.Deferred();
			if (this.isUserListRendered()) {
				this._showUser(user, deferred);
			} else {
				this.listUsers(true).done(_.bind(function() {
					this._showUser(user, deferred);
				}, this));
			}
			return deferred.promise();
		},

		_showActivity: function(activity, region) {
			if (!this.activityController) {
				this.activityController = new ActivityController();
			}
			region = !!region ? region : this.layout.contentRegion;
			this.activityController.showActivity(region, activity);
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

		_showUserActivity: function(user, activity) {
			if (typeof activity === 'string') {
				activity = this.userShowController.getUserActivity(activity);
			}
			this._showActivity(activity, this.userShowController.getLayout(user).activity);
		},
		showUserActivity: function(user, activity) {
			if (this.isUserRendered(user)) {
				this._showUserActivity(user, activity);
			} else {
				this.showUser(user).done(_.bind(function(user) {
					this._showUserActivity(user, activity);
				}, this));
			}
		}
	});

	return Controller;
});
