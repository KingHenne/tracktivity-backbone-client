/*global define*/

define([
	'backbone.marionette'
], function (Marionette, tmplLayout) {
	'use strict';

	var View = Marionette.ItemView.extend({
		ui: {
			navItems: 'ul.nav li',
			activeNavItem: 'ul.nav li.active'
		},

		initialize: function() {
			this.bindUIElements();
		},

		_getNavItem: function(itemName) {
			var item = _.find(this.ui.navItems, function(item) {
				var itemText = item.innerText.trim().toLowerCase();
				return itemName === itemText;
			});
			return $(item);
		},

		setActiveNavItem: function(itemName) {
			this.ui.activeNavItem.removeClass('active');
			this.ui.activeNavItem = this._getNavItem(itemName);
			this.ui.activeNavItem.addClass('active');
		},

		events: {
			'click a': 'onNavLinkClick'
		},

		onNavLinkClick: function(e) {
		}
	});

	return View;
});
