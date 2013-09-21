/*global define*/

define([
	'backbone.marionette',
	'views/activity_item_view',
	'utils/dispatcher',
	'hbs!template/no_activity_items',
	'hbs!template/user_details',
	'hbs!template/user_show'
], function (Marionette, ActivityItemView, Dispatcher, tmplNoActivities, tmplDetails, tmplLayout) {
	'use strict';

	var NoActivitiesView = Marionette.ItemView.extend({
		template: {
			type: 'handlebars',
			template: tmplNoActivities
		}
	});

	var UserView = Marionette.CompositeView.extend({
		template: {
			type: 'handlebars',
			template: tmplDetails
		},
		emptyView: NoActivitiesView,
		itemView: ActivityItemView,
		itemViewContainer: '.activities'
	});

	var Layout = Marionette.Layout.extend({
		template: {
			type: 'handlebars',
			template: tmplLayout
		},
		className: 'row',

		regions: {
			user: '.user',
			activity: '.activity'
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
