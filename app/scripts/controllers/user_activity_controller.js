/*global define*/

define([
	'backbone.marionette',
	'views/user_list_view',
	'views/user_activity_layout',
	'wreqr'
], function (Marionette, UserListView, Layout, Wreqr) {
	'use strict';

	var Controller = Marionette.Controller.extend({
		getLayout: function() {
			if (!this.layout) {
				this.layout = new Layout();
			}
			return this.layout;
		},

		onShowLayout: function() {
			
		},

		listUsers: function() {
			debugger;
			this.listenToOnce(this.layout, 'show', this.onShowLayout);
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
