/*global define*/

define([
	'backbone',
	'collections/Activities-collection'
], function (Backbone, Activities) {
	'use strict';

	var UserModel = Backbone.Model.extend({

		initialize: function() {
			this.activities = new Activities();
			this.activities.url = '/api/users/' + this.get('username') + '/activities';
		}

	});

	return UserModel;
});