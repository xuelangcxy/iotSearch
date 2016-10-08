/*
 * @desc search from Baidu by a query string
 * @author xuelangcxy
 * @param {Callback} callback a json object
 * @param query:搜索关键词
 */

"use strict";

var http = require('http'),
    request = require('request'),
    fs = require('fs'),
    cheerio = require('cheerio');

function baiduSearch(query, cb) {
	//var query = querystring.escape(query);
	var query = encodeURIComponent(query);
	var url = "http://www.baidu.com.cn/s?wd=" + query;
	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			//console.log(body);
			var baiduResult = body.replace(/http:\/\/(t|i)[0-9]+.baidu.com/g, 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq');
			cb(null, baiduResult);
			var $ = cheerio.load(baiduResult);
			var content = $('#content_left').html();
			$('.result-op.c-container').each(function(index, el) {
				var text = $(el).html();
				//console.log(text);
			});
			/*fs.writeFile('baidu.html', content, function(err) {
				if (err) {
					console.error(err);
				} else {
					// statement
				}
			});*/
		} else {
			cb("search Baidu error!" + error, null);
		}
	})
}

module.exports = baiduSearch;

/*baiduSearch("北京邮电大学", function(err, data) {
	if (err) {
		console.error(err);
	} else {
		console.log(data);
	}
});*/