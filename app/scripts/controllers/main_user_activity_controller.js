/*global define*/

define([
	'jquery',
	'underscore',
	'backbone.marionette',
	'controllers/user_list_controller',
	'controllers/user_show_controller',
	'controllers/activity_controller',
	'views/user_activity_layout',
	'utils/dispatcher',
	'templates'
], function ($, _, Marionette, UserListController, UserShowController, ActivityController, Layout, Dispatcher, JST) {
	'use strict';

	var Controller = Marionette.Controller.extend({
		initialize: function(appRegion) {
			this.appRegion = appRegion;
		},

		_renderLayout : function(deferred) {
			this.listenToOnce(this.layout, 'show', function() {
				deferred.resolve(this.layout);
			});
			this.appRegion.show(this.layout);
		},
		renderLayout: function() {
			var deferred = $.Deferred();
			if (!this.layout) {
				this.layout = new Layout();
				this._renderLayout(deferred);
			} else if (this.layout.isClosed) {
				this._renderLayout(deferred);
			} else {
				deferred.resolve(this.layout);
			}
			return deferred.promise();
		},

		isListRendered: function() {
			return !!this.listController && this.listController.isRendered();
		},

		getHomeView: function() {
			if (!this._homeView) {
				this._homeView = new Marionette.ItemView({
					template: JST['app/scripts/templates/home_content.hbs']
				});
			}
			return this._homeView;
		},

		_listUsers: function(deferred) {
			this.listController.listUsers().done(_.bind(function() {
				deferred.resolve();
			}, this));
		},
		listUsers: function(skipHomeContent) {
			var deferred = $.Deferred();
			if (!this.listController) {
				var renderingLayout = this.renderLayout();
				var fetchingUsers = Dispatcher.request('user:entities');
				$.when(renderingLayout, fetchingUsers).done(_.bind(function(layout, users) {
					this.listController = new UserListController({
						users: users,
						region: layout.asideRegion
					});
					this._listUsers(deferred);
					if (!skipHomeContent) {
						layout.contentRegion.show(this.getHomeView());
					}
				}, this));
			} else if (!this.listController.isRendered()) {
				this._listUsers(deferred);
			} else {
				// already rendered, just reset to initial state
				this.listController.reset();
				this.layout.contentRegion.show(this.getHomeView());
				deferred.resolve();
			}
			return deferred.promise();
		},

		_showUser: function(user) {
			// 'user' can also be a username (i.e. a string),
			// so we overwrite it here with the User entity.
			user = this.listController.selectUser(user);
			if (!this.userShowController) {
				this.userShowController = new UserShowController({
					region: this.layout.contentRegion,
					user: user
				});
			}
			this.userShowController.showUser(user);
		},
		showUser: function(user) {
			if (this.isListRendered()) {
				this._showUser(user);
			} else {
				this.listUsers(true).done(_.bind(function() {
					this._showUser(user);
				}, this));
			}
		},

		_showActivity: function(activityId) {
			if (!this.activityController) {
				this.activityController = new ActivityController({
					region: this.layout.contentRegion
				});
			}
			this.activityController.showActivity(activityId);
		},
		showActivity: function(activityId) {
			if (this.isListRendered()) {
				this._showActivity(activityId);
			} else {
				this.listUsers(true).done(_.bind(function() {
					this._showActivity(activityId);
				}, this));
			}
		}
	});

	return Controller;
});
