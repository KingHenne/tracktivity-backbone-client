/*global define*/

define([
	'backbone',
	'backbone.marionette',
	'hbs!template/error'
], function (Backbone, Marionette, tmplError) {
	'use strict';

	var View = Marionette.ItemView.extend({
		template: {
			type: 'handlebars',
			template: tmplError
		},
		className: 'alert alert-danger',

		initialize: function(options) {
			this.model = new Backbone.Model({error: options.error});
		}
	});

	return View;
});
