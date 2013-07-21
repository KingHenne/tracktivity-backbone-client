/*global require*/
'use strict';

require.config({
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
	},
	paths: {
		jquery: '../bower_components/jquery/jquery',
		backbone: '../bower_components/backbone-amd/backbone',
		underscore: '../bower_components/underscore-amd/underscore',
		handlebars: '../bower_components/handlebars/handlebars.runtime',
		bootstrap: 'vendor/bootstrap'
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

	Backbone.history.start({pushState: false});
});
