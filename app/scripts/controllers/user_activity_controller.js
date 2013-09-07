/*global define*/

define([
	'jquery',
	'underscore',
	'backbone.marionette',
	'controllers/user_list_controller',
	'controllers/user_show_controller',
	'views/user_activity_layout',
	'utils/dispatcher'
], function ($, _, Marionette, UserListController, UserShowController, Layout, Dispatcher) {
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
			return this.listController && this.listController.isRendered();
		},

		_listUsers: function(deferred) {
			this.listController.listUsers().done(_.bind(function() {
				deferred.resolve();
			}, this));
		},
		listUsers: function() {
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
				}, this));
			} else if (!this.listController.isRendered()) {
				this._listUsers(deferred);
			} else {
				// already rendered, just reset to initial state
				this.listController.reset();
				deferred.resolve();
			}
			return deferred.promise();
		},

		_showUser: function(username) {
			this.listController.selectUser(username);
			// TODO: show user details with UserShowController
		},
		showUser: function(username) {
			if (this.isListRendered()) {
				this._showUser(username);
			} else {
				this.listUsers().done(_.bind(function() {
					this._showUser(username);
				}, this));
			}
		}
	});

	return Controller;
});
