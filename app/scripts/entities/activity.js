/*global define*/

define([
	'underscore',
	'jquery',
	'backbone',
], function (_, $, Backbone) {
	'use strict';

	var Activity = Backbone.Model.extend({
		url: function() {
			return '/api/activities/' + this.get('id');
		},

		getTrack: function() {
			var deferred = $.Deferred();
			var track = this.get('track');
			if (track) {
				deferred.resolve(track);
			} else {
				this.fetch().then(function(activity) {
					deferred.resolve(activity.track);
				});
			}
			return deferred.promise();
		}
	});

	return Activity;
});