var http = require('http');
var request = require('request');
var fs = require('fs');

/*function getAQIRank() {
	request('http://www.pm25.in/api/querys/aqi_ranking.json?&token=saQ4YumwxpNkxjc7edgZ', function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			//console.log(info.length);
			if (!info[0]) {

			} else {
				fs.writeFile('./aqiRank.json', body, function(err) {
					if (err) {
						throw err;
					};
				});
			};

			fs.readFile('./capital.json', function(err, data) {
				var capital = JSON.parse(data);
				for (var i in info) {
					for (var idx in capital) {
						if (info[i].area.indexOf(capital[idx].capital) >= 0) {
							capital[idx].aqi = info[i];
						} else {
							continue;
						};
					};
				};

				fs.writeFile('./aqiRankProvince.json', JSON.stringify(capital), function(err) {
					if (err) {
						console.error(err);
					} else{};
				});
			});
		} else {
			console.log(body);
		}
	});
};*/

/*getAQIRank();
var num = 0;
console.log(num + ": " + Date());
setInterval(function() {
	num++;
	console.log(num + ": " + Date());
	getAQIRank();
}, 3600*1000);*/


function getCityAQI() {
	fs.readFile('./cityAQI.json', function(err, data) {
		if (err) {
			throw err;
		} else {
			var city = JSON.parse(data);
			//console.log(city);
			/*for (var i in city) {
				if (city[i].name.indexOf("江西")>=0) {
					console.log(city[i].city);
				} else{};
			};*/
			fs.readFile('./aqiRank.json', function(err, aqi) {
				var aqi = JSON.parse(aqi);
				var num = 0;
				for (var i in city) {
					var cityInPro = city[i].city;
					for (var j in cityInPro) {
						(function() {
							for (var k in aqi) {
								if (cityInPro[j].name.indexOf(aqi[k].area) >= 0 || aqi[k].area.indexOf(cityInPro[j].name) >= 0) {
									console.log(++num + '     cityInPro[' + j + '].name: ' + cityInPro[j].name + "     aqi[" + k + "].area: " + aqi[k].area);
									cityInPro[j].aqi = aqi[k];
									continue;
								} else {
									/*cityInPro[j].aqi = {};*/
								};
							}
						})(j);

					};
				};
				fs.writeFile('./cityAQI.json', JSON.stringify(city), function(err) {
					if (err) {
						console.error(err);
					} else {
						console.log('Done!');
					};
				});
			});

		};
	});
}

getCityAQI();