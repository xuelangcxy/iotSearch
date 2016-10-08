var express = require('express');
var router = express.Router();

var ESsearch = require('../public/elasticsearch/elasticsearch'),
	gpsSearch = require('../public/GPS/gpsSearch'),
	aqiSearch = require('../public/mongoDB/aqiSearch'),
	weatherSearch = require('../public/mongoDB/weatherSearch'),
	baiduSearch = require('../public/baidu/baiduSearch'),
	sinaSearch = require('../public/sinaWeibo/sinaSearch'),
	weixinSearch = require('../public/weixin/weixinSearch');

/*var start = new Date().getTime();
ESsearch("操场", start, function(err, data) {
	if (err) {
		console.error(err);
	} else {
		console.log(data);
	}
});*/

/*gpsSearch(function(err, data) {
	if (err) {
		console.error(err);
	} else {
		console.log(data);
	};
});*/

/*aqiSearch(function(err, data) {
	if (err) {
		console.error(err);
	} else {
		console.log(data);
	};
});*/

/*weatherSearch(function(err, data) {
	if (err) {
		console.error(err);
	} else {
		console.log(data);
	};
});*/

/* GET users listing. */
router.get('/:key', function(req, res, next) {
    console.log(req.query);
    var start = new Date().getTime();
    /*var key = (req.body.key).split('&');
    var location = key[0];
    var events = key[1];*/
    var qStr = req.query.key;
    var searchType = req.query.type;
    if (qStr.indexOf('&') > 0) {
        var key = (req.query.key).split('&');
        var query = key[0];
        var level = getLevel(key[1]);
    } else {
        var query = req.query.key;
        var level = 0;
    }
    /*var query = req.query.key;*/
    console.log(level);
    var message = {};
    var count = 0;
    /*message.query = key;*/

    var start = new Date().getTime();

    if (searchType === "internet") {
        searchFromInternet(query, function(message) {
            res.render('result_internet', {
                title: '互联网搜索结果',
                type: searchType,
                query: req.query.key,
                baiduData: message,
                sinaData: null
            })
        })
    } else if (searchType === "social") {
    	/*searchFromSinaWeibo(query, function(message) {
    		res.render('result_social', {
                title: '社交网搜索结果',
                type: searchType,
                query: req.query.key,
                baiduData: null,
                sinaData: message
            })
    	})*/ 
    	searchFromWeixin(query, function(message) {
    		res.render('result_social', {
                title: '社交网搜索结果',
                type: searchType,
                query: req.query.key,
                baiduData: null,
                sinaData: message
            })
    	})       
    } else {
        getMessage(query, start, level, function(message) {
            res.render('result', {
                title: '搜索结果',
                type: searchType,
                query: req.query.key,
                bbsData: message.bbsData,
                gpsData: message.gpsData,
                aqiData: message.aqiData
            });
        });
    }

});


function getMessage(query, start, level, cb) {
	var message = {};
	ESsearch(query, start, function(err, bbsData) {
		message.bbsData = bbsData;
		gpsSearch(function(err, gpsData) {
			message.gpsData = gpsData.count;
			/*aqiSearch.aqiSearch('', function(err, aqiData) {
				message.aqiData = aqiData;
				cb(message);
			});*/
			aqiSearch.aqiSearchByLevel(level, function(aqiData) {
				message.aqiData = aqiData;
				cb(message);
			})

		});
	});
};

function getLevel(Str) {
	if (Str.indexOf('优')>= 0) {
		return 1;
	} else if (Str.indexOf('良好')>= 0) {
		return 2;
	} else if (Str.indexOf('轻度')>=0) {
		return 3;
	} else if (Str.indexOf('中度')>=0) {
		return 4;
	} else if (Str.indexOf('重度')>=0) {
		return 5;
	} else if (Str.indexOf('严重')>=0) {
		return 6;
	} else {
		return 1;
	}
};

function searchFromInternet(query, cb) {
	baiduSearch(query, function(err, data) {
		cb(data);
	});
};

function searchFromSinaWeibo(query, cb) {
	sinaSearch(query, function(err, data) {
		cb(data);
	});
};

function searchFromWeixin(query, cb) {
	weixinSearch(query, function(err, data) {
		cb(data);
	});
};

module.exports = router;