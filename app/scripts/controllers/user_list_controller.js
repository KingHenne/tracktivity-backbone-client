/*global define*/

define([
	'jquery',
	'underscore',
	'backbone.marionette',
	'views/user_list_view',
	'utils/dispatcher'
], function ($, _, Marionette, UserListView, Dispatcher) {
	'use strict';

	var Controller = Marionette.Controller.extend({
		initialize: function(options) {
			this.users = options.users;
			this.region = options.region;
		},

		isRendered: function() {
			return !!this.view && !this.view.isClosed;
		},

		listUsers: function() {
			var deferred = $.Deferred();
			if (this.isRendered()) {
				// already rendered, just reset to initial state
				this.view.reset();
				deferred.resolve();
			} else {
				this.view = new UserListView({
					collection: this.users
				});
				this.listenToOnce(this.view, 'show', function() {
					deferred.resolve();
				});
				this.listenTo(this.view, 'itemview:user:clicked', this.onUserClicked);
				this.region.show(this.view);
			}
			return deferred.promise();
		},

		onUserClicked: function(itemView, user) {
			Dispatcher.trigger('show:user', user);
		},

		selectUser: function(username) {
			var user = this.users.findWhere({username: username});
			var itemView = this.view.children.findByModel(user);
			this.view.selectItemView(itemView);
		},

		reset: function() {
			this.view.reset();
		}
	});

	return Controller;
});
