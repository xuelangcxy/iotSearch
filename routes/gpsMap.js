var express = require('express');
var router = express.Router();

var gpsSearch = require('../public/GPS/gpsSearch');

/* GET users listing. */
router.get('/', function(req, res, next) {
	gpsSearch(function(err, gpsData) {
		/*for (var i = 0; i < gpsData.length; i++) {
			(gpsData.gpsArr)[i].id = getRandomId();
		};*/
		if (err) {
			console.error(err);
			res.render('gpsMap', {
				title: "传感器分布图",
				gpsData: null
			});
		} else {
			console.log(gpsData.gpsArr);
			res.render('gpsMap', {
				title: "传感器分布图",
				gpsArr: JSON.stringify(gpsData.gpsArr)
			});
		}
	});
});

function getRandomId() {
	var str = '0123456789abcdefghijklmnopqrstuvwxyz';
	var id = '';
	for (var i = 0; i < 24; i++) {
		var randomIndex = Math.floor((Math.random()*24));
		id += (str.split(""))[randomIndex];
		if (i == 23) {
			return id;
		}
	}
};
/*console.log(getRandomId());
*/
module.exports = router;