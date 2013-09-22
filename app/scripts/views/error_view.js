/*global define*/

define([
	'backbone.marionette',
	'hbs!template/error'
], function (Marionette, tmplError) {
	'use strict';

	var View = Marionette.ItemView.extend({
		template: {
			type: 'handlebars',
			template: tmplError
		},
		className: 'alert alert-danger',

		initialize: function(error) {
			this.model = new Backbone.Model({error: error});
		}
	});

	return View;
});
