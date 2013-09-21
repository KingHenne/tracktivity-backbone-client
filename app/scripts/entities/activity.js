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

		// returns a promise
		getTrack: function() {
			var deferred = $.Deferred();
			var track = this.get('track');
			if (track) {
				deferred.resolve(track);
			} else {
				this.fetch().done(function(activity) {
					deferred.resolve(activity.track);
				});
			}
			return deferred.promise();
		},

		// returns a promise
		getMultiPolyLine: function() {
			var deferred = $.Deferred();
			if (this._multiPolyline) {
				// resolve with the cached object
				deferred.resolve(this._multiPolyline);
			} else {
				$.when(this.getTrack()).then(_.bind(function(track) {
					this._multiPolyline = _.map(track.segments, function(segment) {
						return _.map(segment.points, function(point) {
							return [point.lat, point.lon];
						});
					});
					deferred.resolve(this._multiPolyline);
				}, this));
			}
			return deferred.promise();
		}
	});

	return Activity;
});