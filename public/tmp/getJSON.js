var http = require('http');
var request = require('request');
var fs = require('fs');

function getxianxingJson() {
	/*request('http://apis.haoservice.com/carservice/xianxing/query?cityId=110100&key=eb5b02de9b41446f9ae0eeef6fd94030', function(error, response, body) {*/
	request('http://v.juhe.cn/xianxing/index?key=cfcc33d155dbc1833e87bc88701aa467&city=beijing&type=1', function(error, response, body) {
		if (!error && response.statusCode == 200) {
			//console.log(body);
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

	//pm25.in数据
	//request('http://www.pm25.in/api/querys/aqi_details.json?city=beijing&token=5j1znBVAsnSf5xQyNQyq&stations=no', function(error, response, body) {
	request('http://www.pm25.in/api/querys/aqi_details.json?city=beijing&token=saQ4YumwxpNkxjc7edgZ&stations=no', function(error, response, body) {
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

			fs.readFile('./pm25_history.json', function(err, data) {
				if (err) {
					throw err
				};
				if (!data) {
					var foo = data;
				} else {
					var foo = JSON.parse(data);
					/*var foo = data;*/
				}
				if (!foo) {
					var jsonArr = new Array();
					jsonArr.unshift({
						"pm2_5": info[0].pm2_5,
						"time": info[0].time_point
					});
				} else {
					if (!foo[0]) {
						jsonArr = [foo];
						jsonArr.unshift({
							"pm2_5": info[0].pm2_5,
							"time": info[0].time_point
						});
					} else {
						var jsonArr = foo;
						if (jsonArr[0].time != info[0].time_point) {
							jsonArr.unshift({
								"pm2_5": info[0].pm2_5,
								"time": info[0].time_point
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
				fs.writeFile('./pm25_history.json', JSON.stringify(jsonArr), function(err) {
					if (err) {
						throw err;
					};
				});

			})

			fs.readFile('./aqi_history.json', function(err, data) {
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
						"aqi": info[0].aqi,
						"time": info[0].time_point
					});
				} else {
					if (!foo[0]) {
						jsonArr = [foo];
						jsonArr.unshift({
							"aqi": info[0].aqi,
							"time": info[0].time_point
						});
					} else {
						var jsonArr = foo;
						if (jsonArr[0].time != info[0].time_point) {
							jsonArr.unshift({
								"aqi": info[0].pm2_5,
								"time": info[0].time_point
							});
						};
					}
				};
				while (jsonArr.length > 24) {
					jsonArr.pop();
				}
				fs.writeFile('./aqi_history.json', JSON.stringify(jsonArr), function(err) {
					if (err) {
						throw err;
					};
				});

			})

			fs.readFile('./pm10_history.json', function(err, data) {
				if (err) {
					throw err
				};
				if (!data) {
					var foo = data;
				} else {
					var foo = JSON.parse(data);
					/*var foo = data;*/
				}
				if (!foo) {
					var jsonArr = new Array();
					jsonArr.unshift({
						"pm10": info[0].pm10,
						"time": info[0].time_point
					});
				} else {
					if (!foo[0]) {
						jsonArr = [foo];
						jsonArr.unshift({
							"pm10": info[0].pm10,
							"time": info[0].time_point
						});
					} else {
						var jsonArr = foo;
						if (jsonArr[0].time != info[0].time_point) {
							jsonArr.unshift({
								"pm10": info[0].pm10,
								"time": info[0].time_point
							});
						};
					}
				};
				while (jsonArr.length > 24) {
					jsonArr.pop();
				}
				fs.writeFile('./pm10_history.json', JSON.stringify(jsonArr), function(err) {
					if (err) {
						throw err;
					};
				});

			})

			fs.readFile('./no2_history.json', function(err, data) {
				if (err) {
					throw err
				};
				if (!data) {
					var foo = data;
				} else {
					var foo = JSON.parse(data);
					/*var foo = data;*/
				}
				if (!foo) {
					var jsonArr = new Array();
					jsonArr.unshift({
						"no2": info[0].no2,
						"time": info[0].time_point
					});
				} else {
					if (!foo[0]) {
						jsonArr = [foo];
						jsonArr.unshift({
							"no2": info[0].no2,
							"time": info[0].time_point
						});
					} else {
						var jsonArr = foo;
						if (jsonArr[0].time != info[0].time_point) {
							jsonArr.unshift({
								"no2": info[0].no2,
								"time": info[0].time_point
							});
						};
					}
				};
				while (jsonArr.length > 24) {
					jsonArr.pop();
				}
				fs.writeFile('./no2_history.json', JSON.stringify(jsonArr), function(err) {
					if (err) {
						throw err;
					};
				});

			})

			fs.readFile('./o3_history.json', function(err, data) {
				if (err) {
					throw err
				};
				if (!data) {
					var foo = data;
				} else {
					var foo = JSON.parse(data);
					/*var foo = data;*/
				}
				if (!foo) {
					var jsonArr = new Array();
					jsonArr.unshift({
						"o3": info[0].o3,
						"time": info[0].time_point
					});
				} else {
					if (!foo[0]) {
						jsonArr = [foo];
						jsonArr.unshift({
							"o3": info[0].o3,
							"time": info[0].time_point
						});
					} else {
						var jsonArr = foo;
						if (jsonArr[0].time != info[0].time_point) {
							jsonArr.unshift({
								"o3": info[0].o3,
								"time": info[0].time_point
							});
						};
					}
				};
				while (jsonArr.length > 24) {
					jsonArr.pop();
				}
				fs.writeFile('./o3_history.json', JSON.stringify(jsonArr), function(err) {
					if (err) {
						throw err;
					};
				});

			})

			fs.readFile('./so2_history.json', function(err, data) {
				if (err) {
					throw err
				};
				if (!data) {
					var foo = data;
				} else {
					var foo = JSON.parse(data);
					/*var foo = data;*/
				}
				if (!foo) {
					var jsonArr = new Array();
					jsonArr.unshift({
						"so2": info[0].so2,
						"time": info[0].time_point
					});
				} else {
					if (!foo[0]) {
						jsonArr = [foo];
						jsonArr.unshift({
							"so2": info[0].so2,
							"time": info[0].time_point
						});
					} else {
						var jsonArr = foo;
						if (jsonArr[0].time != info[0].time_point) {
							jsonArr.unshift({
								"so2": info[0].so2,
								"time": info[0].time_point
							});
						};
					}
				};
				while (jsonArr.length > 24) {
					jsonArr.pop();
				}
				fs.writeFile('./so2_history.json', JSON.stringify(jsonArr), function(err) {
					if (err) {
						throw err;
					};
				});

			})

			fs.readFile('./co_history.json', function(err, data) {
				if (err) {
					throw err
				};
				if (!data) {
					var foo = data;
				} else {
					var foo = JSON.parse(data);
					/*var foo = data;*/
				}
				if (!foo) {
					var jsonArr = new Array();
					jsonArr.unshift({
						"co": info[0].co,
						"time": info[0].time_point
					});
				} else {
					if (!foo[0]) {
						jsonArr = [foo];
						jsonArr.unshift({
							"co": info[0].co,
							"time": info[0].time_point
						});
					} else {
						var jsonArr = foo;
						if (jsonArr[0].time != info[0].time_point) {
							jsonArr.unshift({
								"co": info[0].co,
								"time": info[0].time_point
							});
						};
					}
				};
				while (jsonArr.length > 24) {
					jsonArr.pop();
				}
				fs.writeFile('./co_history.json', JSON.stringify(jsonArr), function(err) {
					if (err) {
						throw err;
					};
				});

			})


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