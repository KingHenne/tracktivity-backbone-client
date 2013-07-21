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
			this.listenTo(this.collection, 'change:selected', this.onUserSelectedChange);
		},

		render: function() {
			this.collection.each(function(user) {
				var entry = new UserListEntry({
					model: user
				});
				this.$el.append(entry.render().el);
			}, this);
			return this;
		},

		onUserSelectedChange: function(user, value) {
			if (value === false) { // we are only interested in selections
				return;
			}
			if (this.selectedUser) {
				this.selectedUser.set('selected', false);
			}
			this.selectedUser = user;
			// If the selection happens because of browser navigation -- i. e. just the
			// state needs to be restored, but the URL is already updated -- we can
			// still call navigate without worries, because Backbone catches navigations
			// the the current fragment and does nothing in this case.
			app.navigate('users/' + user.get('username'), {trigger: true});
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