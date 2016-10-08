var http = require('http');
var request = require('request');
var fs = require('fs');

function getWeatherJson() {
	//pm25.in数据
	request('http://www.pm25.in/api/querys/aqi_details.json?city=beijing&token=5j1znBVAsnSf5xQyNQyq&stations=no', function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			if (!info[0]) {

			} else {
				fs.writeFile('./pm25.json', body, function(err) {
					if (err) {
						throw err;
					};
				});
			};
		}
	})

	//小米
	request('http://weatherapi.market.xiaomi.com/wtr-v2/weather?cityId=101010100', function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			fs.writeFile('./xiaomi.json', body, function(err) {
				if (err) {
					throw err;
				};
			});
			fs.readFile('./history.json', function(err, data) {
					if (err) {
						throw err
					};
					if (!data) {
						var foo = data;
					} else {
						var foo = JSON.parse(data);
					}
					if (!foo) {
						var jsonArr = new Array();
						jsonArr.unshift({
							"pm2_5": info.aqi.pm25,
							"time": info.aqi.pub_time
						});
					} else {
						if (!foo[0]) {
							jsonArr = [foo];
							jsonArr.unshift({
								"pm2_5": info.aqi.pm25,
								"time": info.aqi.pub_time
							});
						} else {
							var jsonArr = foo;
							if (jsonArr[0].time != info.aqi.pub_time) {
								jsonArr.unshift({
									"pm2_5": info.aqi.pm25,
									"time": info.aqi.pub_time
								});
							};
						}
					};

					/*jsonArr.unshift({
						"pm2_5": info.aqi.pm25,
						"time": info.aqi.pub_time
					});*/
					while (jsonArr.length > 24) {
						jsonArr.pop();
					}
					fs.writeFile('./history.json', JSON.stringify(jsonArr), function(err) {
						if (err) {
							throw err;
						};
					});

				})
				/*})*/
		}
	})
}

getWeatherJson();

var num = 0;
console.log(num + ": " + Date());
setInterval(function() {
	num = num + 1;
	console.log(num + ": " + Date());
	getWeatherJson();
}, 3600 * 1000)