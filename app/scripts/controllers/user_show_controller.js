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
			this.userView = this.getUserView(options.user);
		},

		onActivityClicked: function(itemView, activity) {
			Dispatcher.trigger('show:activity', activity);
		},

		onViewClosed: function() {
			this.userView = null;
		},

		getUserView: function(user) {
			var view = this.userView;
			if (view) {
				view.model.set(user.attributes);
				view.collection.reset(user.activities.models);
			} else {
				view = new UserShowView({
					model: new User(user.attributes),
					collection: new Activities(user.activities.models)
				});
				this.listenTo(view, 'itemview:activity:clicked', this.onActivityClicked);
				this.listenTo(view, 'close', this.onViewClosed);
			}
			return view;
		},

		showUser: function(user) {
			this.userView = this.getUserView(user);
			this.region.show(this.userView);
			// always re-fetch activities to get the latest list
			user.activities.fetch().done(_.bind(function(activities) {
				this.userView.collection.set(activities);
			}, this));
		}
	});

	return Controller;
});
