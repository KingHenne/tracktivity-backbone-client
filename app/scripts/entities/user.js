/*global define*/

define([
	'backbone',
	'entities/activities'
], function (Backbone, Activities) {
	'use strict';

	var User = Backbone.Model.extend({

		initialize: function() {
			this.activities = new Activities();
			this.activities.url = '/api/users/' + this.get('username') + '/activities';
		}

	});

	return User;
});