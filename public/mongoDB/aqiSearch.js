/*
 * @desc search from aqi database by a query string
 * @author xuelangcxy
 * @param {Callback} callback a json object
 * @param query:搜索关键词
 */

"use strict";

var mongoose = require('mongoose');

var schema = mongoose.Schema;
var dbAir = mongoose.createConnection('localhost', 'dataset');

var aqiSchema = new schema({
	aqi: String
}, {
	collection: "aqi"
})
var Aqi = dbAir.model('aqi', aqiSchema);

dbAir.on('error', console.error.bind(console, 'connection err: '));
dbAir.once('open', function() {
	console.log('mongoose open, aqi database connected!');
})

var aqiSearch = function(query, cb) {
	var latestAqi = {};
	Aqi.find(query, function(err, doc) {
		if (err) {
			console.error(err);
			cb(err, null);
		} else {
			var latestData = doc[doc.length - 1];
			latestAqi.aqi = JSON.parse(latestData.aqi);
			latestAqi._id = latestData._id;
			//console.log(latestAqi);
			cb(null, latestAqi);
		};
	});
}

var aqiSearchById = function(id, cb) {
	var target = {};
	Aqi.findById(id, function(err, doc) {
		if (err) {
			console.error(err);
			cb(err, null);
		} else {
			var targetData = doc;
			target.aqi = JSON.parse(doc.aqi);
			target._id = doc._id;
			cb(null, target);
		};
	});
}

var getAqiByRegion = function(min, max, next) {
	Aqi.find('', function(err, doc) {
        if (err) {
            console.error(err);
            next(err, null);
        } else {
            var aqiArr = [];
            var aqiObj = {};
            for (var i = 0; i < doc.length; i++) {
                var aqiJson = JSON.parse(doc[i].aqi);
                if (aqiJson.aqi > min && aqiJson.aqi <= max) {
                    /*console.log(aqiJson.aqi);*/
                    /*aqiObj._id = doc[i]._id;
                    aqiObj.aqiJson = aqiJson;*/
                    aqiArr.push({
                    	"_id": doc[i]._id,
                    	"aqiJson": aqiJson
                    });
                } else {
                    // statement
                }
                if (i == doc.length - 1) {
                    next(null, getTopTen(aqiArr));
                }
            };

        };
    });
}

var aqiSearchByLevel = function(level, cb) {
	switch (level) {
		case 1:
			getAqiByRegion(0, 50, function(err, data) {
				cb(data);
			});
			break;
		case 2:
			getAqiByRegion(50, 100, function(err, data) {
				cb(data);
			});
			break;
		case 3:
			getAqiByRegion(100, 150, function(err, data) {
				cb(data);
			});
			break;
		case 4:
			getAqiByRegion(150, 200, function(err, data) {
				cb(data);
			});
			break;
		case 5:
			getAqiByRegion(200, 300, function(err, data) {
				cb(data);
			});
			break;
		case 6:
			getAqiByRegion(300, 10000, function(err, data) {
				cb(data);
			});
			break;
		default:
			cb(null);
			break;
	}
}

/*aqiSearchByLevel(4, function(data) {
	console.log(data);
})*/

/*getAqiByRegion(50, 100, function(err, data) {
	console.log(data);
});*/


module.exports.aqiSearch = aqiSearch;
module.exports.aqiSearchById = aqiSearchById;
module.exports.aqiSearchByLevel = aqiSearchByLevel;

/*aqiSearch(function(err, data) {
	if (err) {
		console.error(err);
	} else {
		console.log(data);
	};
});*/

/*Aqi.findById("57b5991f546050500d210fef", function(err, doc) {
		if (err) {
			console.error(err);
			cb(err, null);
		} else {
			console.log(doc);
		};
	});*/

/*aqiSearchById("57b5991f546050500d210fef", function(err, doc) {
	if (err) {
		// statement
	} else {
		console.log(doc);
	}
})*/

function getTopTen(arr) {
	arr.sort(sortBy());
	return arr.slice(0, 10);
};

/*排序条件函数*/
function sortBy() {
    return function(o, p) {
        var a, b;
        a = o.aqiJson.aqi;
        b = p.aqiJson.aqi;
        if (a == b) {
            return 0;
        } else {
            return a < b ? -1 : 1;
        }
    }
};
