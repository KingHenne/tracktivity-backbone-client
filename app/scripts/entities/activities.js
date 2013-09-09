/*global define*/

define([
	'underscore',
	'backbone',
	'entities/activity'
], function (_, Backbone, Activity) {
	'use strict';

	var Activities = Backbone.Collection.extend({
		model: Activity,
		url: '/api/activities'
		
		// mock fetching
		/*fetch: function() {
			var deferred = $.Deferred();
			setTimeout(function() {
				deferred.resolve([
					{id:123, created:21346523764, name:'Activity 1'},
					{id:54, created:21346523764, name:'Activity 2'},
					{id:3245, created:21346523764, name:'Activity 3'},
					{id:126, created:21346523764, name:'Activity 4'}
				], 'success', {});
			}, 500);
			return deferred.promise();
		}*/
	});

	return Activities;
});