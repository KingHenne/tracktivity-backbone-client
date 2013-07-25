/*global define, app*/

define([
	'jquery',
	'underscore',
	'backbone',
	'views/UserListEntry-view'
], function ($, _, Backbone, UserListEntry) {
	'use strict';

	var UserListView = Backbone.View.extend({
		tagName: 'ul',

		initialize: function() {
			this.listenTo(this.collection, 'reset', this.render);
			this.entries = []; // array of subviews
		},

		render: function() {
			this.collection.each(this.renderUserEntry, this);
			return this;
		},

		renderUserEntry: function(user) {
			var entry = new UserListEntry({model: user});
			this.entries.push(entry);
			this.$el.append(entry.render().el);
		},

		onUserSelected: function(user) {
			debugger;
			if (value === false) { // we are only interested in selections
				return;
			}
			if (this.selectedUser) {
				this.selectedUser.set('selected', false);
			}
			this.selectedUser = user;
			app.navigate('users/' + user.get('username'));
		},

		deselect: function() {
			if (this.selectedUser) {
				this.selectedUser.set('selected', false);
				this.selectedUser = null;
			}
		},

		selectByUsername: function(username) {
			var user = this.collection.findWhere({username: username});
			if (!user) {
				console.error('Could not find user %s', username);
			} else if (this.selectedUser === user) {
				console.log('User %s is already selected.', username);
			} else {
				user.set('selected', true);
			}
			return user;
		}
	});

	return UserListView;
});