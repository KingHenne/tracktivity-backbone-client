/*global define*/

define([
	'underscore',
	'backbone',
	'models/User-model'
], function (_, Backbone, User) {
	'use strict';

	var UsersCollection = Backbone.Collection.extend({
		model: User,
		url: '/api/users'
	});

	return UsersCollection;
});