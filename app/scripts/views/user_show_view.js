/*global define*/

define([
	'backbone.marionette',
	'templates',
	'views/activity_item_view'
], function (Marionette, JST, ActivityItemView) {
	'use strict';

	var NoItemsView = Marionette.ItemView.extend({
		template: JST['app/scripts/templates/no_activity_items.hbs']
	});

	var View = Marionette.CompositeView.extend({
		template: JST['app/scripts/templates/user_show.hbs'],
		emptyView: NoItemsView,
		itemView: ActivityItemView,
		itemViewContainer: '.activities'
	});

	return View;
});
