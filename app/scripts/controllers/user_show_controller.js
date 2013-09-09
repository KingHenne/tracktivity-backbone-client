/*global define*/

define([
	'jquery',
	'underscore',
	'backbone.marionette',
	'utils/dispatcher',
	'views/user_show_view',
	'entities/user',
	'entities/activities'
], function ($, _, Marionette, Dispatcher, UserShowView, User, Activities) {
	'use strict';

	var Controller = Marionette.Controller.extend({
		initialize: function(options) {
			this.region = options.region;
			this.userView = new UserShowView({
				model: new User(options.user.attributes),
				collection: new Activities()
			});
		},

		showUser: function(user) {
			this.userView.model.set(user.attributes);
			this.userView.collection.reset([]);
			this.region.show(this.userView);
			// always re-fetch activities to get the latest list
			user.activities.fetch().done(_.bind(function(activities) {
				this.userView.collection.reset(activities);
			}, this));
		}
	});

	return Controller;
});
