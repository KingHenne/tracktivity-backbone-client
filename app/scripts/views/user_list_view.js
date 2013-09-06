/*global define*/

define([
	'backbone.marionette',
	'templates'
], function (Marionette, JST) {
	'use strict';

	var UserItemView = Marionette.ItemView.extend({
		tagName: 'li',
		template: JST['app/scripts/templates/user_list_item.hbs'],
		
		events: {
			'click a': 'clicked'
		},
		
		clicked: function(e) {
			e.preventDefault();
			this.trigger('user:clicked', this.model);
		},

		select: function() {
			this.$el.addClass('active');
		},

		deselect: function() {
			this.$el.removeClass('active');
		}
	});

	var UserListView = Marionette.CompositeView.extend({
		template: JST['app/scripts/templates/user_list.hbs'],
		itemView: UserItemView,
		itemViewContainer: 'ul.nav',
		className: 'sidebar',

		selectItemView: function(itemView) {
			this.resetSelection();
			this.selectedItemView = itemView;
			if (this.selectedItemView) {
				this.selectedItemView.select();
			}
		},

		resetSelection: function() {
			if (this.selectedItemView) {
				this.selectedItemView.deselect();
			}
		},

		reset: function() {
			this.resetSelection();
		}
	});

	return UserListView;
});
