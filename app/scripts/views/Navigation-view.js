/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'views/UserList-view',
	'views/ActivityList-view'
], function ($, _, Backbone, JST, UserList, ActivityList) {
	'use strict';

	var NavigationView = Backbone.View.extend({
		template: JST['app/scripts/templates/Navigation.hbs'],

		initialize: function(options) {
			this.userList = new UserList({
				collection: options.users
			});
			this.activityList = new ActivityList();
		},

		render: function() {
			this.$el.html(this.template());
			this.userList.setElement(this.$('.users')[0]);
			this.activityList.setElement(this.$('.activities')[0]);
			return this;
		},

		isEmpty: function() {
			return this.$el.html().trim() === '';
		},

		reset: function() {
			this.userList.deselect();
			this.activityList.setUser(null);
		},

		selectUser: function(username) {
			var user = this.userList.selectByUsername(username);
			this.activityList.setUser(user).deselect();
		},

		selectActivity: function(activityId) {
			return this.activityList.selectById(activityId);
		}
	});

	return NavigationView;
});