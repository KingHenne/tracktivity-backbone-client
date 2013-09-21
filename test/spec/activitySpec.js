/*global define, describe, it, expect */
'use strict';

var testActivity = {
	'id': 32654,
	'created': '2013-06-25T21:19:27Z',
	'name': null,
	'recording': false,
	'track': {
		'segments': [
			{
				'points': [
					{
						'lon': -122.0412,
						'lat': 37.33757,
						'ele': 0,
						'time': '2013-06-25T21:19:27Z'
					}
				]
			},
			{
				'points': [
					{
						'lon': -122.0413,
						'lat': 37.33757,
						'ele': 0,
						'time': '2013-06-25T21:20:38Z'
					}
				]
			}
		]
	}
};

var expectedMultiPolyline = [
	[
		[
			37.33757,
			-122.0412
		],
	],
	[
		[
			37.33757,
			-122.0413
		]
	]
];

define([
	'entities/Activity'
], function (Activity) {

	describe('An Activity', function() {
		it('should be able to convert its own track to a multipolyline.', function(done) {
			var testActivityModel = new Activity(testActivity);
			testActivityModel.getMultiPolyLine().done(function(multiPolyline) {
				var multiPolylineString = JSON.stringify(multiPolyline);
				expect(multiPolylineString).to.equal(JSON.stringify(expectedMultiPolyline));
				done();
			});
		});
	});

});
