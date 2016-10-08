/*
 * @desc search from viewpoint by a query string
 * @author xuelangcxy
 * @param {Callback} callback a json object
 * @param query:搜索关键词
 */

"use strict";

var http = require('http'),
    request = require('request'),
    fs = require('fs'),
    cheerio = require('cheerio');

function viewpointSearch(cb) {
	//var query = querystring.escape(query);
	//var query = encodeURIComponent(query);
	var url = "http://www.360doc.com/content/13/0816/09/13229737_307501520.shtml";
	//var url = "http://tianqi.2345.com/jingdian/";
	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			//console.log(body);
			var baiduResult = body.replace(/http:\/\/(t|i)[0-9]+.baidu.com/g, 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq');
			cb(null, baiduResult);
			/*fs.writeFile('viewpoint.html', body, function(err) {
				if (err) {
					console.error(err);
				} else {
					// statement
				}
			});*/
		} else {
			cb("search viewpoint error!" + error, null);
		}
	})
}

module.exports = viewpointSearch;

/*viewpointSearch(function(err, data) {
	if (err) {
		console.error(err);
	} else {
		console.log(data);
	}
});*/