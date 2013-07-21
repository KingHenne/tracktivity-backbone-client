/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
], function ($, _, Backbone, JST) {
	'use strict';

	var UserListEntryView = Backbone.View.extend({
		template: JST['app/scripts/templates/UserListEntry.hbs'],
		tagName: 'li',

		events: {
			'click a': 'select'
		},

		initialize: function() {
			this.listenTo(this.model, 'change:selected', this.updateActiveStatus);
		},

		render: function() {
			this.$el.html(this.template(this.model.attributes));
			this.updateActiveStatus();
			return this;
		},

		updateActiveStatus: function() {
			this.$el.toggleClass('active', !!this.model.get('selected'));
		},

		select: function(e) {
			e.preventDefault();
			this.model.set('selected', true);
		}
	});

	return UserListEntryView;
});