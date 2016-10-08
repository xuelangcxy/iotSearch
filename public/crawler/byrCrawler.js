var superagent = require('superagent'),
	url = require('url'),
	cheerio = require('cheerio'),
	http = require("http"),
	fs = require('fs'),
	mongoose = require('mongoose');

var Config = require('./config.js');

var schema = mongoose.Schema;
var db = mongoose.createConnection('localhost', 'byr');
db.on('error', console.error.bind(console, 'connection err: '));

var ArticleSchema = new schema({
	url: String,
	board: String,
	title: String,
	author: String,
	authorQuery: String,
	floor: String,
	submitTime: String,
	content: String,
	rawContent: String,
	imgUrlList: Array
}, {
	collection: "byrArticle"
})

var ArticleModel = db.model('Article', ArticleSchema);

db.once('open', function() {
	console.log('mongoose open!');
})

var articleArr = [];
var boardArr = [];
var articleUrlList = [];
var count = 0;

superagent
	.post(Config.url.login)
	.type('form')
	.send(Config.auth)
	.redirects(0)
	.end(function(err, sres) {
		var rawCookies = sres.headers['set-cookie'];
		var cookie = rawCookies[3].split(';')[0] + '; ' +
			rawCookies[4].split(';')[0] + '; ' +
			rawCookies[5].split(';')[0] + '; ' +
			rawCookies[6].split(';')[0];

		var sectionUrl = Config.url.section;
		/*getSectionUrl(sectionUrl, cookie, function(err, data) {
			if (err) {
				console.error(err);
			} else {
				var sectionArr = data;
				console.log(sectionArr);
				var i = 0;
				for (;i<sectionArr.length;i++) {
					var secUrl = sectionArr[i].url;
					var sectTitle = sectionArr[i].title;
					(function(secUrl) {
						getBoardUrl(secUrl, cookie, function(err, data) {
							if (err) {
								console.error(err);
							} else {
								boardArr = data;
								console.log(boardArr);
								fs.writeFile('./board.json', JSON.stringify(boardArr), function(err){
									if (err) {
										console.log(err);
									} else {
										console.log('done');
									}
								});
							}
						})
					})(secUrl);
				};
				if(i == sectionArr.length) {
					console.log(boardArr);
				}
			}
		})*/
		fs.readFile('./board.json', function(err, data) {
			if (err) {
				console.error(err);
			} else {
				boardArr = JSON.parse(data);
				var i = 0;
				for (; i < boardArr.length; i++) {
					//console.log(++count + ": " + boardArr[i].boardTitle);
					var boardUrl = boardArr[i].boardUrl;
					if (boardUrl === "/board/Friends") {
						(function() {
							getArticleUrl(boardUrl, cookie, function(err, data) {
								if (err) {
									console.error(err);
								} else {
									//console.log(data);
									articleArr = data;
									for (var idx in articleArr) {
										var articleUrl = articleArr[idx];
										(function(articleUrl) {
											getArticleContent(articleUrl, cookie, function(err, data) {
												if (err) {
													console.error(err);
												} else {
													console.log(data.title);
												}
											})
										})(articleUrl);
									};

								}
							})
						})(boardUrl);
					}
				};
				/*if (i === boardArr.length) {
					console.log(articleArr);
					fs.writeFile('./articleArr.json', articleArr, function(err) {
						if (err) {
							console.error(err);
						} else {
							console.log('done');
						}
					});
				}*/
			}
		});

	})

function getSectionUrl(sectionUrl, cookie, next) {
	superagent
		.get(Config.url.section)
		.set("Cookie", cookie)
		.end(function(err, sres) {
			if (err) {
				return next('getSectionUrl' + err);
			}

			var $ = cheerio.load(sres.text);
			var sectionArr = [];

			$("#m_main ul.slist li a:nth-child(2)").each(function(idx, elet) {
				var $text = $(elet).text();
				sectionArr.push({
					url: $(elet).attr('href'),
					title: $text
				});
			});
			return next(null, sectionArr);
		})
}

function getBoardUrl(secUrl, cookie, next) {
	superagent
		.get(url.resolve(Config.url.index, secUrl))
		.set("Cookie", cookie)
		.end(function(err, sres) {
			if (err) {
				return next('getBoardUrl' + err);
			}

			var $ = cheerio.load(sres.text);

			$("#m_main ul.slist li a").each(function(idx, elet) {
				var foo = $("#wraper .menu.sp").text();
				var sectionName = foo.substr(foo.indexOf('-') + 1, 4);
				var isCatalog = $(this.parent).children('font').text();

				var level = null;
				if (isCatalog) {
					level = "目录";
					var nextUrl = $(elet).attr('href');
					getBoardUrl(nextUrl, cookie, next);
				} else {
					level = "版面";
					var $text = $(elet).text();
					boardArr.push({
						section: sectionName,
						level: level,
						boardUrl: $(elet).attr('href'),
						boardTitle: $text
					});
				}
			})
			return next(null, boardArr);
		})
}

function getArticleUrl(boardUrl, cookie, next) {
	superagent
		.get(url.resolve(Config.url.index, boardUrl))
		.set("Cookie", cookie)
		.end(function(err, sres) {
			if (err) {
				return next('getArticleUrl' + err);
			}

			var $ = cheerio.load(sres.text);
			$("#m_main ul.list li").each(function(idx, elet) {
				var $text = $(elet).text();
				var $top = $(elet).children('div').eq(0).children('a');
				var $topText = $top.parent().text();
				var $bottom = $(elet).children('div').eq(1).children('a');
				var $bottomText = $bottom.parent().text();
				var re = /[0-9]+(-)?(:)?[0-9]+(-)?(:)?[0-9]+/; //匹配时间格式2016-04-28或者10:30:30

				var url = $top.attr("href");
				var author = $bottom.eq(0).text();
				articleArr.push(url);
			})

			$("#m_main div.sec:nth-child(2) form a").each(function(idx, elet) {
				var $text = $(elet).text();
				if ($text == "下页") {
					var nextPageUrl = $(this).attr('href');
					getArticleUrl(nextPageUrl, cookie, next);
				} else {
					/*articleUrlList.push(articleArr);*/
				}
			});
			return next(null, articleArr);
		})
		/*return next(null, articleUrlList);*/
}

function getArticleContent(articleUrl, cookie, next) {
	superagent
		.get(url.resolve(Config.url.index, articleUrl))
		.set('Cookie', cookie)
		.end(function(err, sres) {
			if (err) {
				return next(' getArticleContent' + err);
			}
			var $ = cheerio.load(sres.text);
			var articleContent = {};
			var images = [];

			function getImgUrl(callback) {
				$("#m_main ul.list .sp .resizeable").each(function(index, el) {
					var img = $(this).attr('src');
					images.push(img);
				});
				callback(images);
			}

			$("#m_main").each(function(index, el) {

				var board = $('#wraper .menu').text();
				var boardTitle = board.slice(board.indexOf('-') + 1, board.indexOf('('));
				var title = $("#m_main").children('ul.list').eq(0).children('li').eq(0).text();
				var content = $("#m_main").children('ul.list').eq(0).children('li').eq(1);
				var url = $("#m_main").children('div.sec').eq(1).children('form').attr('action');

				articleContent.url = url;
				articleContent.board = boardTitle;
				articleContent.title = title.replace(/主题:/, '');
				articleContent.floor = content.children('.nav').find('a').eq(0).text();
				articleContent.author = content.children('.nav').find('a').eq(1).text();
				articleContent.authorQuery = content.children('.nav').find('a').eq(1).attr("href");
				articleContent.submitTime = content.children('.nav').find('a').eq(2).text();
				var contentText = content.children('.sp').text();
				var rawContentText = content.children('.sp').html();
				articleContent.content = contentText;
				articleContent.rawContent = rawContentText;
				getImgUrl(function(images) {
					articleContent.imgUrlList = images;
				})
				return next(null, articleContent);
			});
			/*return next(null, articleContent);*/
		})
}