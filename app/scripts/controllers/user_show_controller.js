/*global define*/

define([
	'jquery',
	'underscore',
	'backbone.marionette',
	'utils/dispatcher',
	'views/user_show_view'
], function ($, _, Marionette, Dispatcher, UserShowView) {
	'use strict';

	var Controller = Marionette.Controller.extend({
		initialize: function(options) {
			this.region = options.region;
		},

		showUser: function(user) {
			this.userView = new UserShowView({
				model: user,
				collection: user.activities
			});
			this.region.show(this.userView);
			// always re-fetch activities to get the latest list
			user.activities.fetch().done(_.bind(function() {
				
			}, this));
		}
	});

	return Controller;
});
