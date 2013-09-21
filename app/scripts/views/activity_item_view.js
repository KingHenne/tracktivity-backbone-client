/*global define*/

define([
	'backbone.marionette',
	'hbs!template/activity_list_item'
], function (Marionette, tmplListItem) {
	'use strict';

	var ActivityItemView = Marionette.ItemView.extend({
		template: {
			type: 'handlebars',
			template: tmplListItem
		},
		
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
