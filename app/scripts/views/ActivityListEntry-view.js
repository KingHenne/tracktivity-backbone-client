/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
], function ($, _, Backbone, JST) {
	'use strict';

	var ActivityListEntryView = Backbone.View.extend({
		template: JST['app/scripts/templates/ActivityListEntry.hbs'],
		tagName: 'li',

		events: {
			'click a': 'select'
		},

		initialize: function(options) {
			this.user = options.user;
			this.listenTo(this.model, 'change:selected', this.updateActiveStatus);
		},

		render: function() {
			this.$el.html(this.template({
				activity: this.model.toJSON(),
				username: this.user.get('username')
			}));
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

	return ActivityListEntryView;
});