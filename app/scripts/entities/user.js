/*global define*/

define([
	'backbone',
	'entities/activities'
], function (Backbone, Activities) {
	'use strict';

	var User = Backbone.Model.extend({

		initialize: function() {
			this.activities = new Activities(null, {
				url: '/api/users/' + this.get('username') + '/activities'
			});
		}

	});

	return User;
});