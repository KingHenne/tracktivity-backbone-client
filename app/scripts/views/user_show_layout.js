/*global define*/

define([
	'backbone.marionette',
	'templates',
	'views/activity_item_view',
	'utils/dispatcher'
], function (Marionette, JST, ActivityItemView, Dispatcher) {
	'use strict';

	var NoActivitiesView = Marionette.ItemView.extend({
		template: JST['app/scripts/templates/no_activity_items.hbs']
	});

	var UserView = Marionette.CompositeView.extend({
		template: JST['app/scripts/templates/user_details.hbs'],
		emptyView: NoActivitiesView,
		itemView: ActivityItemView,
		itemViewContainer: '.activities'
	});

	var Layout = Marionette.Layout.extend({
		template: JST['app/scripts/templates/user_show.hbs'],
		className: 'row',

		regions: {
			user: '.user',
			map: '.map'
		},

		initialize: function(options) {
			this.userView = new UserView({
				model: options.model,
				collection: options.collection
			});
			this.listenTo(this.userView, 'itemview:activity:clicked', this.onActivityClicked);
		},

		onActivityClicked: function(itemView, activity) {
			Dispatcher.trigger('show:user:activity', this.userView.model, activity);
		},

		onRender: function() {
			this.user.show(this.userView);
		}
	});

	return Layout;
});
