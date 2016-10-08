/*
 * @desc search from http://tianqi.2345.com/beijinglvyou/jingdiangg/ by a query string
 * @author xuelangcxy
 * @param {Callback} callback a json object
 * @param query:搜索关键词
 */

"use strict";

var http = require('http'),
    request = require('request'),
    fs = require('fs'),
    cheerio = require('cheerio'),
    iconv = require('iconv-lite'),
    superagent = require('superagent'),
    url = require('url'),
    mongoose = require('mongoose'),
    async = require('async'),
    path = require('path');

var baseUrl = "http://tianqi.2345.com";

var schema = mongoose.Schema;
var db = mongoose.createConnection('localhost', 'viewWeather');
db.on('error', console.error.bind(console, 'connection err: '));

var WeatherSchema = new schema({
	title: String,
	url: String,
	temp: String,
	wind: String,
	humidity: String,
	pressure: String,
	sunrise: String,
	sunset: String,
	visibility: String,
	radiation: String,
	report: Array
}, {
	collection: "viewWeather"
})

/*var WeatherSchema = new schema;
WeatherSchema.add({url: String});*/

var WeatherModel = db.model('Weather', WeatherSchema);

db.once('open', function() {
    console.log('mongoose open!');
});

async.waterfall([
	function(callback) { // 动态获取网站编码
		superagent.get(url.resolve(baseUrl, "jingdian"))
			.end(function(err, res) {
				var charset = "utf-8";
				var arr = res.text.match(/<meta([^>]*?)>/g);
				if (arr) {
					arr.forEach(function(val) {
						var match = val.match(/charset\s*=\s*(.+)\"/);
						if (match && match[1]) {
							if (match[1].substr(0, 1) == '"') match[1] = match[1].substr(1);
							charset = match[1].trim();
						}
					})
				}
				callback(err, charset)
			})
	},
	function getUrlList(charset, next) {
		//console.log(charset);
		request({
			url: url.resolve(baseUrl, 'jingdian'),
			encoding: null
		}, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var buffer = new Buffer(body);
				var html = iconv.decode(buffer, 'gbk');
				var weatherResult = html;
				var $ = cheerio.load(html);
				var urlList = [];
				$('.lnkbox a').each(function(index, el) {
					urlList.push({
						title: $(el).attr('title'),
						url: $(el).attr('href')
					});
				});
				next(null, urlList);
			} else {
				next("search Weather error!" + error, null);
			}
		})
	},
	function getWeatherReport(urlList, next) {
		console.log(urlList.length);
		/*var num = 0;
		urlList.forEach(function(elem, idx) {
			request({
				url: url.resolve(baseUrl, elem.url),
				encoding: null
			}, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var buffer = new Buffer(body);
					var html = iconv.decode(buffer, 'gbk');
					var $ = cheerio.load(html);
					
					var report = [];

					$('.week.week_day7>.clearfix>li').each(function(index, el) {
						var foo = $(el).text();
						var date = /[0-9]+月[0-9]+日/.exec(foo)[0];
						var weather = $(this).children('b').text();
						var low_temp = $(this).find('.blue').text();
						var high_temp = $(this).find('.red').text();
						var wind = $(this).find('i').text();
						var dayreport = {
							date: date,
							weather: weather,
							low_temp: low_temp,
							high_temp: /[0-9]+/.exec(high_temp)[0],
							wind: wind.substr(wind.indexOf('\n')+1)
						};
						report.push(dayreport);
					});

					$('.week.week_day8>.clearfix>li').each(function(index, el) {
						var foo = $(el).text();
						var date = /[0-9]+月[0-9]+日/.exec(foo)[0];
						var weather = $(this).children('b').text();
						var low_temp = $(this).find('.blue').text();
						var high_temp = $(this).find('.red').text();
						var dayreport = {
							date: date,
							weather: weather,
							low_temp: low_temp,
							high_temp: /[0-9]+/.exec(high_temp)[0],
							wind: ''
						};
						report.push(dayreport);
					});

					var temp = $('.wea-about>.clearfix>li').eq(0).children('span').text();
					var wind = $('.wea-about>.clearfix>li').eq(1).children('span').text();
					var pressure = $('.wea-about>.clearfix>li').eq(2).children('span').text();
					var humidity = $('.wea-about>.clearfix>li').eq(3).children('span').text();
					var sunrise = $('.wea-about>.clearfix>li').eq(4).children('span').text();
					var sunset = $('.wea-about>.clearfix>li').eq(5).children('span').text();
					var visibility = $('.wea-about>.clearfix>li').eq(6).children('span').text();
					var radiation = $('.wea-about>.clearfix>li').eq(7).children('span').text();
					var detail = {
						title: elem.title,
						url: elem.url,
						temp: temp,
						wind: wind,
						humidity: humidity,
						pressure: pressure,
						sunrise: sunrise,
						sunset: sunset,
						visibility: visibility,
						radiation: radiation,
						report: report
					};

					var Weather = new WeatherModel({
						title: elem.title,
						url: elem.url,
						temp: temp,
						wind: wind,
						humidity: humidity,
						pressure: pressure,
						sunrise: sunrise,
						sunset: sunset,
						visibility: visibility,
						radiation: radiation,
						report: report
					});

				WeatherModel.findOne({
					title: elem.title
				}, function(err, docs) {
					if (err) {
						console.error(err);
					} else {
						WeatherModel.findOneAndUpdate({title: elem.title}, {$set: detail}, function(err, doc) {
							if (err) {
								console.error(err);
							} else{
								console.log(++num + '： update' + elem.title + "succeed!");
							};
						})
					}
				});

				}
			})
		});*/
	}
]);