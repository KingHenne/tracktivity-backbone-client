
/*global define*/

define([
	'backbone.marionette',
	'views/navigation_view',
	'utils/dispatcher'
], function (Marionette, View, Dispatcher) {
	'use strict';

	var Controller = Marionette.Controller.extend({
		routeToNavItem: {
			'default': 'home',
			'showLiveTracking': 'live',
			'showAbout': 'about'
		},

		initialize: function(appRegion) {
			this.view = new View({el: appRegion.el});
			this._bindEvents();
		},

		_bindEvents: function() {
			Dispatcher.on('route', this.onRouteChange, this);
		},

		_getNavItemForRoute: function(route) {
			var navItem = this.routeToNavItem[route];
			if (!navItem) {
				navItem = this.routeToNavItem.default;
			}
			return navItem;
		},

		onRouteChange: function(route) {
			this.view.setActiveNavItem(this._getNavItemForRoute(route));
		}
	});

	return Controller;
});
