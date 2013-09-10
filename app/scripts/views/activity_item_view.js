/*global define*/

define([
	'backbone.marionette',
	'templates'
], function (Marionette, JST) {
	'use strict';

	var ActivityItemView = Marionette.ItemView.extend({
		template: JST['app/scripts/templates/activity_list_item.hbs'],
		
		events: {
			'click a': 'clicked'
		},
		
		clicked: function(e) {
			e.preventDefault();
			this.trigger('activity:clicked', this.model);
		}
	});

	return ActivityItemView;
});
