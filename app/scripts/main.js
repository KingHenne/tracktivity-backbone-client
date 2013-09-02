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
		bootstrap: '../bower_components/sass-bootstrap/js'
	},
	shim: {
		jquery: {
			exports: '$'
		},
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		},
		'bootstrap/dropdown': {
			deps: ['jquery']
		},
		'bootstrap/collapse': {
			deps: ['jquery']
		},
		'bootstrap/transition': {
			deps: ['jquery']
		},
		handlebars: {
			exports: 'Handlebars'
		}
	}
});

require([
	'app',
	'bootstrap/dropdown',
	'bootstrap/collapse',
	'bootstrap/transition'
], function (App) {

	App.start();

});
