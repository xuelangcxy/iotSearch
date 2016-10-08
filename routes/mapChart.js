var express = require('express');
var router = express.Router();

/* GET mapChart */
router.get('/', function(req, res, next) {
	res.render('mapChart', {
		title: "中国地图 | 物联网搜索"
	});
});

module.exports = router;