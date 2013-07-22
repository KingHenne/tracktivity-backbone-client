/*global define, app*/

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'collections/Activities-collection',
	'views/ActivityListEntry-view'
], function ($, _, Backbone, JST, Activities, ActivityListEntry) {
	'use strict';

	var ActivityListView = Backbone.View.extend({
		template: JST['app/scripts/templates/ActivityList.hbs'],
		tagName: 'ul',

		initialize: function() {
			this.collection = new Activities();
			this.listenTo(this.collection, 'reset', this.render);
			this.listenTo(this.collection, 'change:selected', this.onActivitySelectedChange);
		},

		render: function() {
			this.$el.html(this.template({username: this.user.get('username')}));
			this.collection.each(this.renderActivityEntry, this);
			return this;
		},

		renderActivityEntry: function(activity) {
			var entry = new ActivityListEntry({
				model: activity,
				user: this.user
			});
			this.$el.append(entry.render().el);
		},

		onActivitySelectedChange: function(activity, value) {
			if (value === false) { // we are only interested in selections
				return;
			}
			if (this.selectedActivity) {
				this.selectedActivity.set('selected', false);
			}
			this.selectedActivity = activity;
			// If the selection happens because of browser navigation -- i. e. just the
			// state needs to be restored, but the URL is already updated -- we can
			// still call navigate without worries, because Backbone catches navigations
			// the the current fragment and does nothing in this case.
			var fragment = '/users/' + this.user.get('username') + '/activities/' + activity.get('id');
			app.navigate(fragment, {trigger: true});
		},

		deselect: function() {
			if (this.selectedActivity) {
				this.selectedActivity.set('selected', false);
				this.selectedActivity = null;
			}
		},

		selectById: function(id) {
			var activity = this.collection.findWhere({id: id});
			if (!activity) {
				console.error('Could not find activity %s', id);
			} else if (this.selectedActivity === activity) {
				console.log('Activity %s is already selected.', id);
			} else {
				activity.set('selected', true);
			}
			return activity;
		},

		reset: function() {
			this.$el.empty();
			return this;
		},

		setUser: function(user) {
			this.user = user;
			if (user === null) {
				this.reset();
			} else {
				user.activities.on('reset', this.userActivitesFetched, this).fetch({reset: true});
			}
			return this;
		},

		userActivitesFetched: function(collection) {
			this.collection.reset(collection.models);
		}
	});

	return ActivityListView;
});