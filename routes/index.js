 var express = require('express'),
	router = express.Router(),
	elasticsearch = require('elasticsearch'),
	mongoose = require('mongoose');

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
	console.log('mongoose open!');
})

var dbAir = mongoose.createConnection('localhost', 'dataset');
var weatherSchema = new schema({
    weather: String
}, { collection: "weather" })
var Weather = dbAir.model('weather', weatherSchema);

var aqiSchema = new schema({
    aqi: String
}, { collection: "aqi" })
var Aqi = dbAir.model('aqi', aqiSchema);

dbAir.on('error', console.error.bind(console, 'connection err: '));
dbAir.once('open', function() {
	//console.log('mongoose open!');
})


var client = new elasticsearch.Client({
	host: 'localhost:9200',
	/*log: 'trace',*/
	apiVersion: '2.2'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('search', { title: 'IOT Search | WSN' });
});

router.get('/xml', function(req, res, next) {
  res.render('xml', { title: 'IOT Search | WSN' });
});

router.post('/', function(req, res, next) {
	var start = new Date().getTime();
	var key = (req.body.key).split('&');
	var location = key[0];
	var events = key[1];
	var message = {};
	var count = 0;
	message.query = key;
	console.log("title: " + location);
	
	Aqi.find('', function(err, doc) {
		if (err) {
			console.error(err);
		} else{
			var latestAqi = JSON.parse(doc[doc.length-1].aqi);
			//console.log(latestAqi);
			message.aqi = latestAqi;
		};
	})
	Weather.find('', function(err, doc) {
		if (err) {
			console.error(err);
		} else{
			var latestWeather = JSON.parse(doc[doc.length-1].weather);
			//console.log(latestWeather.realtime);
			message.weather = latestWeather;
		};
	})
	Gps.find('', function(err, doc) {
		if (err) {
			console.error(err);
		} else{
			for (var i = 0; i < doc.length; i++) {
				//console.log(doc[i].value.latitude);
				var latitude = doc[i].value.latitude;
				var longtitude = doc[i].value.longtitude;
				if (longtitude >= 116.366086 && longtitude <= 116.367447 && latitude >= 39.965626 && latitude <= 39.967222) {
					count++;
				};
			};
			if (i === doc.length) {
				console.log(count);
				message.count = count;
				console.log('Done! There is ' + count + ' people in the playground!');
			};
		};
	})
	var sendMessage = [];
	var page = [];
	var total = 0;
	var query = 'title: ' + location;
	client.search({
		index: 'byr',
		type: 'article',
		/*scroll: '30s',*/
		q: query
	}, function getMoreUtilDone(error, response) {
		if (error) {
			console.error(error);
			res.send(error)
		} else{
			console.log(response);
			response.hits.hits.forEach(function(hit) {
				sendMessage.push(hit._source);
			});
			var end = new Date().getTime();
			var cost = end - start;
			message.sendMessage = sendMessage;
			message.cost = cost;
			message.total = response.hits.total;
			setTimeout(function() {
				res.status(200).send(message);
			}, 1000);
			
			/*if (response.hits.total !== sendMessage.length) {
				client.scroll({
					scrollId: response._scroll_id,
					scroll: '30s'
				}, getMoreUtilDone);
			} else{
				for (var i = 0; i < 10; i++) {
					page.push(sendMessage[i]);
				};
				console.log(page);
				var end = new Date().getTime();
				var cost = end - start;
				message.sendMessage = page;
				message.cost = cost;
				message.total = response.hits.total;
				res.status(200).send(message);
			};*/
		};
	})

})

router.get('/angular', function(req, res, next) {
	res.render('angular');
})

router.get('/contactUs', function(req, res, next) {
	res.render('contactUs', { title: 'contact us' });
})

router.get('/result', function(req, res, next) {
	res.render('result', { title: 'search result' });
})


module.exports = router;
