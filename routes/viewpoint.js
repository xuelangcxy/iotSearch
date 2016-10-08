var express = require('express');
var router = express.Router();

var viewPointWeatherSearch = require('../public/weather/getViewPointWeather');

/* GET viewPoint Weather listing. */
router.get('/:name', function(req, res, next) {
	var name = req.query.name;
	//console.log(unescape(name));
	var query = "";
	viewPointWeatherSearch(query, function(err, message) {
		if (err) {
			console.error(err);
			res.render('viewpoint', {
                title: '景点搜索结果',
                query: '北京市景点',
                viewpointData: null,
                weatherData: message
            });
		} else {
			res.render('viewpoint', {
                title: '景点搜索结果',
                query: '北京市景点',
                viewpointData: null,
                weatherData: message
            });
		};
	});
});


router.get('/weather/:name', function(req, res, next) {
	var name = req.query.name;
	console.log(name);
	var query = {title: name};
	viewPointWeatherSearch(query, function(err, message) {
		//console.log(message);
		res.send(message);
	})
});

module.exports = router;