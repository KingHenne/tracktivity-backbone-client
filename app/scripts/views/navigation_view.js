/*global define*/

define([
	'backbone.marionette'
], function (Marionette, tmplLayout) {
	'use strict';

	var View = Marionette.ItemView.extend({
		events: {
			'click a': 'onNavLinkClick'
		},

		onNavLinkClick: function(e) {
			e.preventDefault();
			console.log(e);
		}
	});

	return View;
});
