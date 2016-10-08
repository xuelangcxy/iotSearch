var express = require('express');
var router = express.Router();

var viewpointSearch = require('../public/viewpoint/viewpoint');

/* GET province map */
router.get('/:name', function(req, res, next) {
	var province = unescape(req.query.name);
	console.log(unescape(province));
	res.render('province', {
		title: province + " | 物联网搜索",
		provinceEn: "beijing"
	});
});

/*router.get('/viewpoint/:name', function(req, res, next) {
	var query = "海淀区景点";
	res.setHeader('Set-Cookie', ['360docArtPageBackGroundColor=mainbj6', 'bdshare_firstime=1449215126757', 'doctaobaocookie=1', 'Hm_lvt_d86954201130d615136257dde062a503=1473837727', 'Hm_lpvt_d86954201130d615136257dde062a503=1473837727']);
	viewpointSearch(function(err, message) {
		res.render('viewpoint', {
                title: '景点搜索结果',
                query: query,
                viewpointData: message
            })
	})
})*/

/*router.get('/*', function(req, res, next) {
	res.setHeader('Set-Cookie', ['360docArtPageBackGroundColor=mainbj6', 'bdshare_firstime=1449215126757', 'doctaobaocookie=1', 'Hm_lvt_d86954201130d615136257dde062a503=1473837727', 'Hm_lpvt_d86954201130d615136257dde062a503=1473837727']);
})*/

function toEnName(name) {

}

module.exports = router;