/*
 * @desc search from Sina weibo by a query string
 * @author xuelangcxy
 * @param {Callback} callback a json object
 * @param query:搜索关键词
 */

"use strict";

var http = require('http'),
    request = require('request'),
    fs = require('fs'),
    cheerio = require('cheerio');

function sinaSearch(query, cb) {
	//var query = querystring.escape(query);
	var query = encodeURIComponent(query);
	var url = "http://s.weibo.com/weibo/" + query;
	console.log(url);
	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			//console.log(body);
			/*var sinaResult = body.replace(/http:\/\/(t|i)[0-9]+.baidu.com/g, 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq');
			cb(null, sinaResult);
			var $ = cheerio.load(sinaResult);
			var content = $('#content_left').html();
			$('.result-op.c-container').each(function(index, el) {
				var text = $(el).html();
				//console.log(text);
			});*/
	var sinaResult = body;
	cb(null, sinaResult);
			/*fs.writeFile('sinaWeibo.html', body, function(err) {
				if (err) {
					console.error(err);
				} else {
					// statement
				}
			});*/
		} else {
			cb("search Sina weibo error!" + error, null);
		}
	})
}

module.exports = sinaSearch;

/*sinaSearch("北京邮电大学", function(err, data) {
	if (err) {
		console.error(err);
	} else {
		console.log(data);
	}
});*/