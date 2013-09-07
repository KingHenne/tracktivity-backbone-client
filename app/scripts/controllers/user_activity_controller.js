/*global define*/

define([
	'jquery',
	'underscore',
	'backbone.marionette',
	'views/user_list_view',
	'views/user_activity_layout',
	'utils/dispatcher'
], function ($, _, Marionette, UserListView, Layout, Dispatcher) {
	'use strict';

	var Controller = Marionette.Controller.extend({
		initialize: function(appRegion) {
			this.appRegion = appRegion;
		},

		_userClicked: function(itemView, user) {
			Dispatcher.trigger('show:user', user);
		},

		renderLayout: function() {
			var deferred = $.Deferred();
			var layout = new Layout();
			layout.on('show', function() {
				deferred.resolve(layout);
			});
			this.appRegion.show(layout);
			return deferred.promise();
		},

		listUsers: function() {
			var deferred = $.Deferred();
			if (this.userListView) {
				// already rendered, just reset to initial state
				this.userListView.reset();
				deferred.resolve();
			} else {
				var renderingLayout = this.renderLayout();
				var fetchingUsers = Dispatcher.request('user:entities');
				$.when(renderingLayout, fetchingUsers).done(_.bind(function(layout, users) {
					this.userListView = new UserListView({
						collection: users
					});
					this.listenToOnce(this.userListView, 'show', function() {
						deferred.resolve();
					});
					this.listenTo(this.userListView, 'itemview:user:clicked', this._userClicked);
					layout.asideRegion.show(this.userListView);
				}, this));
			}
			return deferred.promise();
		},

		_selectUser: function(username) {
			var user = this.userListView.collection.findWhere({username: username});
			var itemView = this.userListView.children.findByModel(user);
			this.userListView.selectItemView(itemView);
		},

		showUser: function(username) {
			if (this.userListView) {
				this._selectUser(username);
			} else {
				this.listUsers().done(_.bind(function() {
					this._selectUser(username);
				}, this));
			}
		}
	});

	return Controller;
});
