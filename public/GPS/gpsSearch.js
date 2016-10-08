/*
 * @desc search from gps by a query string
 * @author xuelangcxy
 * @param {Callback} callback a json object
 * @param query:搜索关键词
 */

"use strict";

var mongoose = require('mongoose');

var schema = mongoose.Schema;

var dbGps = mongoose.createConnection('localhost', 'gps');
var GpsSchema = new schema({
	dataname: String,
	value: {
		latitude: String,
		longtitude: String
	}
}, {
	collection: "gps"
});
var Gps = dbGps.model('gps', GpsSchema);

dbGps.on('error', console.error.bind(console, 'connection err: '));
dbGps.once('open', function() {
	console.log('mongoose open, gps database connected!');
});

var gpsSearch = function(cb) {
	var gpsOBJ = {};
	var gpsArr = [];
	var count = 0;
	Gps.find('', function(err, doc) {
		if (err) {
			console.error(err);
			cb(err, null);
		} else {
			for (var i = 0; i < doc.length; i++) {
				//console.log(doc[i].value.latitude);
				var latitude = doc[i].value.latitude;
				var longtitude = doc[i].value.longtitude;
				if (longtitude >= 116.366086 && longtitude <= 116.367447 && latitude >= 39.965626 && latitude <= 39.967222) {
					gpsArr.push({lon:longtitude, lat:latitude});
					count++;
				};
			};
			if (i === doc.length) {
				//console.log(count);
				gpsOBJ.count = count;
				var gpsData = {gpsArr:gpsArr}
				gpsOBJ.gpsArr = gpsData;
				cb(null, gpsOBJ);
			};
		};
	});
}

module.exports = gpsSearch;

/*gpsSearch(function(err, data) {
	if (err) {
		console.error(err);
	} else {
		console.log(data);
	};
});*/
//console.log(foo);
