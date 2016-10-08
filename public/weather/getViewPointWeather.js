/*
 * @desc search from http://tianqi.2345.com/beijinglvyou/jingdiangg/ by a query string
 * @author xuelangcxy
 * @param {Callback} callback a json object
 * @param query:搜索关键词
 */

"use strict";

var mongoose = require('mongoose');

var schema = mongoose.Schema;
var db = mongoose.createConnection('localhost', 'viewWeather');
db.on('error', console.error.bind(console, 'connection err: '));

var WeatherSchema = new schema({
	title: String,
	temp: String,
	wind: String,
	humidity: String,
	pressure: String,
	sunrise: String,
	sunset: String,
	visibility: String,
	radiation: String,
	report: Array
}, {
	collection: "viewWeather"
})

var WeatherModel = db.model('Weather', WeatherSchema);

db.once('open', function() {
    console.log('mongoose open!');
})

var viewPointWeatherSearch = function(query, cb) {
	WeatherModel.find(query, function(err, doc) {
		if (err) {
			console.error(err);
			cb(err, null);
		} else{
			cb(null, doc);
		};
	})
};

module.exports = viewPointWeatherSearch;

/*viewPointWeatherSearch({title: '北海'}, function(err, data) {
	console.log(data);
})*/