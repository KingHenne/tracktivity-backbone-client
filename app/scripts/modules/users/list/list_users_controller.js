/*global define*/

define([
	'backbone.marionette',
	'modules/users/list/list_users_view',
	'wreqr'
], function (Marionette, UserListView, Wreqr) {
	'use strict';

	var Controller = Marionette.Controller.extend({
		listUsers: function() {
			var users = Wreqr.reqres.request('user:entities');
			this.userListView = new UserListView({
				collection: users
			});
			this.listenTo(this.userListView, 'itemview:user:clicked', this.userClicked);
			return this.userListView;
		},

		userClicked: function(itemView, user) {
			Wreqr.vent.trigger('show:user', user);
		},

		showUser: function(username) {
			var user = this.userListView.collection.findWhere({username: username});
			var itemView = this.userListView.children.findByModel(user);
			this.userListView.selectItemView(itemView);
		}
	});

	return Controller;
});
