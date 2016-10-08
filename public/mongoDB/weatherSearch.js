/*
 * @desc search from weather database by a query string
 * @author xuelangcxy
 * @param {Callback} callback a json object
 * @param query:搜索关键词
 */

"use strict";

var mongoose = require('mongoose');

var schema = mongoose.Schema;
var dbAir = mongoose.createConnection('localhost', 'dataset');
var weatherSchema = new schema({
    weather: String
}, { collection: "weather" })
var Weather = dbAir.model('weather', weatherSchema);

dbAir.on('error', console.error.bind(console, 'connection err: '));
dbAir.once('open', function() {
	console.log('mongoose open, weather database connected!');
})

var weatherSearch = function(cb) {
	Weather.find('', function(err, doc) {
		if (err) {
			console.error(err);
			cb(err, null);
		} else{
			var latestWeather = JSON.parse(doc[doc.length-1].weather);
			//console.log(latestWeather.realtime);
			cb(null, latestWeather);
		};
	});
}

module.exports = weatherSearch;

/*weatherSearch(function(err, data) {
	if (err) {
		console.error(err);
	} else {
		console.log(data);
	};
});*/