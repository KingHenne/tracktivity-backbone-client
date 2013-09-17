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
			return !!this.layout && !this.layout.isClosed && this.layout.model === user;
		},

		getLayout: function(user) {
			if (this.user !== user) {
				this.layout = new UserShowLayout({
					model: user,
					collection: user.activities
				});
				this.user = user;
			}
			return this.layout;
		},

		showUser: function(user) {
			this.region.show(this.getLayout(user));
			// always re-fetch activities to get the latest list
			user.activities.fetch();
		}
	});

	return Controller;
});
