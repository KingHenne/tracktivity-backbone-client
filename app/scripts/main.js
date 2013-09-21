/*global require*/
'use strict';

require.config({
	paths: {
		jquery: '../bower_components/jquery/jquery',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
		handlebars: '../bower_components/require-handlebars-plugin/Handlebars',
		hbs: '../bower_components/require-handlebars-plugin/hbs',
		i18nprecompile: '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
		json2: '../bower_components/require-handlebars-plugin/hbs/json2',
		'backbone.marionette': '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
		'backbone.wreqr': '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
		'backbone.babysitter': '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
		'backbone.marionette.handlebars': '../bower_components/backbone.marionette.handlebars/backbone.marionette.handlebars',
		bootstrap: '../bower_components/sass-bootstrap/js',
		moment: '../bower_components/momentjs/moment',
		leaflet: '../bower_components/leaflet/dist/leaflet'
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
		leaflet: {
			exports: 'L'
		}
	},
	deps: [
		'backbone.marionette.handlebars'
	],
	hbs: {
		disableI18n: true
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
