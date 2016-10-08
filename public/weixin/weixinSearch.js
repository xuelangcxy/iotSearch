/*
 * @desc search from Weixin by a query string
 * @author xuelangcxy
 * @param {Callback} callback a json object
 * @param query:搜索关键词
 */

"use strict";

var http = require('http'),
    request = require('request'),
    fs = require('fs'),
    cheerio = require('cheerio');

function weixinSearch(query, cb) {
	//var query = querystring.escape(query);
	var query = encodeURIComponent(query);
	var url = "http://weixin.sogou.com/weixin?type=2&query=" + query;
	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			//console.log(body);
			var weixinResult = body.replace(/href=\"\/wechat/g, 'href="http://weixin.sogou.com/wechat')
								   .replace(/src=\"\/wechat/g, 'src="http://weixin.sogou.com/wechat')
								   .replace(/src=\"\/js/g, 'href="http://weixin.sogou.com/js');
			cb(null, weixinResult);
			var $ = cheerio.load(weixinResult);
			var content = $('#content_left').html();
			$('.result-op.c-container').each(function(index, el) {
				var text = $(el).html();
				//console.log(text);
			});
			fs.writeFile('weixin.html', weixinResult, function(err) {
				if (err) {
					console.error(err);
				} else {
					// statement
				}
			});
		} else {
			cb("search Weixin error!" + error, null);
		}
	})
}

module.exports = weixinSearch;

/*weixinSearch("北京邮电大学", function(err, data) {
	if (err) {
		console.error(err);
	} else {
		console.log(data);
	}
});*/