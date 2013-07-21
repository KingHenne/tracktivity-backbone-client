/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
], function ($, _, Backbone, JST) {
	'use strict';

	var ActivityView = Backbone.View.extend({
		template: JST['app/scripts/templates/Activity.hbs'],

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	return ActivityView;
});
