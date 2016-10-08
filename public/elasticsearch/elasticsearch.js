"use strict";

var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
	host: 'localhost:9200',
	/*log: 'trace',*/
	apiVersion: '2.2'
});

/*
 * @desc search from elasticsearch server by a query string
 * @author xuelangcxy
 * @param {Callback} callback a json object
 * @param query:搜索关键词
 * @param start:搜索开始时间
 */

var ESsearch = function(query, start, cb) {
	var message = {};
	var sendMessage = [];
	client.search({
		index: 'byr',
		type: 'article',
		/*scroll: '30s',*/
		q: query
	}, function getMoreUtilDone(error, response) {
		if (error) {
			console.error(error);
			cb(error, null);
		} else {
			// console.log(response);
			response.hits.hits.forEach(function(hit) {
				sendMessage.push(hit._source);
			});
			var end = new Date().getTime();
			var cost = end - start;
			message.sendMessage = sendMessage;
			message.cost = cost;
			message.total = response.hits.total;
			//console.log(message);

			cb(null, message);

			/*if (response.hits.total !== sendMessage.length) {
				client.scroll({
					scrollId: response._scroll_id,
					scroll: '30s'
				}, getMoreUtilDone);
			} else{
				for (var i = 0; i < 10; i++) {
					page.push(sendMessage[i]);
				};
				console.log(page);
				var end = new Date().getTime();
				var cost = end - start;
				message.sendMessage = page;
				message.cost = cost;
				message.total = response.hits.total;
				res.status(200).send(message);
			};*/
		};
	});
}

module.exports = ESsearch;

/*var start = new Date().getTime();
ESsearch("操场", start, function(err, data) {
	if (err) {
		console.error(err);
	} else {
		console.log(data);
	}
});*/