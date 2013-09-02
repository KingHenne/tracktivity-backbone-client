/*global define*/

define([
	'underscore',
	'backbone',
	'entities/user'
], function (_, Backbone, User) {
	'use strict';

	var Users = Backbone.Collection.extend({
		model: User,
		url: '/api/users'
	});

	return Users;
});