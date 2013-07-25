/*global require*/
'use strict';

require.config({
	paths: {
		jquery: '../bower_components/jquery/jquery',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
		'backbone.marionette': '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
		'backbone.wreqr' : '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
		'backbone.babysitter' : '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
		handlebars: '../bower_components/handlebars/handlebars.runtime',
		bootstrap: 'vendor/bootstrap'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		bootstrap: {
			deps: ['jquery'],
			exports: 'jquery'
		},
		handlebars: {
			exports: 'Handlebars'
		}
	}
});

require([
	'backbone',
	'routes/App-router',
	'collections/Users-collection'
], function (Backbone, AppRouter, Users) {
	var users = new Users();

	window.app = new AppRouter({
		users: users
	});

	users.fetch({
		reset: true,
		success: function(collection) {
			console.log('Fetched %d users.', collection.length);
		},
		error: function(collection, response) {
			console.error('Could not fetch users.', response.responseText);
		}
	});

	Backbone.history.start({pushState: true});
});
