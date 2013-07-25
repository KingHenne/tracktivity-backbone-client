/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'backbone.marionette'
], function ($, _, Backbone, JST, Marionette) {
	'use strict';

	var UserListEntryView = Backbone.View.extend({
		template: JST['app/scripts/templates/UserListEntry.hbs'],
		tagName: 'li',

		events: {
			'click a': 'select'
		},

		initialize: function() {
			this.viewModel = new Backbone.Model({selected: false});
			this.listenTo(this.viewModel, 'change:selected', this.onSelectedChange);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.updateActiveStatus();
			return this;
		},

		onSelectedChange: function() {
			this.updateActiveStatus();
		},

		updateActiveStatus: function() {
			this.$el.toggleClass('active', this.viewModel.get('selected'));
		},

		select: function(e) {
			e.preventDefault();
			this.viewModel.set('selected', true);
		}
	});

	return UserListEntryView;
});