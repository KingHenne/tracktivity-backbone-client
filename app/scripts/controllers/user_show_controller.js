/*global define*/

define([
	'jquery',
	'underscore',
	'backbone.marionette',
	'views/user_show_layout',
	'entities/user',
	'entities/activities'
], function ($, _, Marionette, UserShowLayout, User, Activities) {
	'use strict';

	var Controller = Marionette.Controller.extend({
		initialize: function(options) {
			this.region = options.region;
			this.layout = this.getLayout(options.user);
		},

		isUserRendered: function(user) {
			var username = (typeof user == 'string') ? user : user.get('username');
			return !!this.layout && this.layout.model.get('username') === username;
		},

		getLayout: function(user) {
			if (!this.isUserRendered(user)) {
				this.layout = new UserShowLayout({
					model: user,
					collection: user.activities
				});
				this.listenToOnce(this.layout, 'close', this.resetLayout);
				this.user = user;
			}
			return this.layout;
		},

		resetLayout: function(layout) {
			if (this.layout.isClosed) {
				this.layout = null;
			}
		},

		showUser: function(user) {
			this.region.show(this.getLayout(user));
			// always re-fetch activities to get the latest list
			return user.activities.fetch();
		},

		getUserActivity: function(activityId) {
			if (!this.user || !this.user.activities) {
				return activityId;
			}
			return this.user.activities.get(activityId);
		}
	});

	return Controller;
});
