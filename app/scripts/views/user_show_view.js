/*global define*/

define([
	'backbone.marionette',
	'templates',
	'views/activity_item_view'
], function (Marionette, JST, ActivityItemView) {
	'use strict';

	var View = Marionette.CompositeView.extend({
		template: JST['app/scripts/templates/user_show.hbs'],
		itemView: ActivityItemView,
		itemViewContainer: 'ul.activities'
	});

	return View;
});
