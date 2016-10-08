var express = require('express');
var router = express.Router();

var aqiSearch = require('../public/mongoDB/aqiSearch');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
	var id = req.query.id;
	aqiSearch.aqiSearchById(id, function(err, aqiData) {
		if (err) {
			console.error(err);
			res.render('sensor', {
				title: "传感器搜索结果",
				aqiData: null
			});
		} else {
			res.render('sensor', {
				title: "传感器搜索结果",
				aqiData: aqiData
			});
		};
	});
});

module.exports = router;