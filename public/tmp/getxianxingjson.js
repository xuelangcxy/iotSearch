var http = require('http');
var request = require('request');
var fs = require('fs');

function getxianxingJson() {
	/*request('http://apis.haoservice.com/carservice/xianxing/query?cityId=110100&key=eb5b02de9b41446f9ae0eeef6fd94030', function(error, response, body) {*/
	request('http://v.juhe.cn/xianxing/index?key=cfcc33d155dbc1833e87bc88701aa467&city=beijing&type=1', function(error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(body);
			var info = JSON.parse(body);
			fs.writeFile('./xianxing.json', body, function(err) {
				if (err) {
					throw err;
				};
			});
		}
	})
}

function getWeatherJson() {
	//小米
	request('http://weatherapi.market.xiaomi.com/wtr-v2/weather?cityId=101010100', function(error, response, body) {
		if (!error && response.statusCode == 200) {
			fs.writeFile('./xiaomi.json', body, function(err) {
				if (err) {
					throw err;
				};
			});
		}
	})
}

getxianxingJson();
getWeatherJson();

var num = 0;
console.log(num + ": " + Date());
setInterval(function() {
	num = num + 1;
	console.log(num + ": " + Date());
	getWeatherJson();
}, 3600 * 1000)