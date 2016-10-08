var superagent = require('superagent'),
	url = require('url'),
	cheerio = require('cheerio'),
	http = require("http"),
	fs = require('fs'),
	mongoose = require('mongoose');

var Config = require('./config.js');
	//ArticleModel = require('./models/article.js');

	var schema = mongoose.Schema;
	var db = mongoose.createConnection('localhost', 'byr');
	db.on('error', console.error.bind(console, 'connection err: '));

	/*var ArticleSchema = new schema({
		url: String,
		title: String,
		commentsCount: Number,
		submitTime: Date,
		author: String,
		authorQuery: String,
		lastCommentUser: String,
		lastCommentUserQuery: String,
		lastCommentTime: { // 最新回复时间: 2015-12-23 16:31:06
			type: Date,
			default: new Date(0)
		}
	}, {
		collection: "byrArticle"
	})*/
	
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
	

superagent
	.post(Config.url.login)
	.type('form')
	.send(Config.auth)
	.redirects(0)
	.end(function(err, sres) {
		//console.log(sres);
		var rawCookies = sres.headers['set-cookie'];
		console.log(rawCookies);
		var cookie = rawCookies[3].split(';')[0] + '; ' +
			rawCookies[4].split(';')[0] + '; ' +
			rawCookies[5].split(';')[0] + '; ' +
			rawCookies[6].split(';')[0];
//console.log(cookie);

		var sectionUrl = Config.url.section;
		getSectionUrl(sectionUrl, cookie, function(err, data) {
			var sectionArr = data;
			/*遍历分区目录*/
			for (var i in sectionArr) {
				/*console.log(sectionArr[i].url + ":" + sectionArr[i].title);*/
				var sectionUrl = sectionArr[i].url;
				var sectionTitle = sectionArr[i].title;
				/*console.log(Config.url.index + sectionUrl);*/

				getBoardUrl(sectionUrl, cookie, function(err, data) {
					if (err) {
						console.error(err);
					} else {
						var boardArr = data;
						/*fs.appendFile('./boardArr.json', JSON.stringify(data), function(err) {
							if(err) throw err;
						});*/
						for (var i in boardArr) {
							if (boardArr[i].level == "版面") {
								var boardUrl = boardArr[i].boardUrl;
								//console.log(i + ": " + boardUrl);
								/*只爬取缘来板块*/
							/*if (boardUrl == "/board/Friends") {*/
								getArticleUrl(boardUrl, cookie, function(err, data) {
									if (err) {
										console.error(err);
									} else {
										console.log(data.title);
										var Article = new ArticleModel({
											url: data.url,
											board: data.board,
											title: data.title,
											author: data.author,
											authorQuery: data.authorQuery,
											floor: data.floor,
											submitTime: data.submitTime,
											content: data.content,
											rawContent: data.rawContent,
											imgUrlList: data.imgUrlList
										})
										var newArticle = {$set: {
											url: data.url,
											board: data.board,
											title: data.title,
											author: data.author,
											authorQuery: data.authorQuery,
											floor: data.floor,
											submitTime: data.submitTime,
											content: data.content,
											rawContent: data.rawContent,
											imgUrlList: data.imgUrlList
										}};
										ArticleModel.findOne({url: data.url}, function(err, docs) {
											if (err) {
												console.error(err);
											} else {
												if(docs == null) {
													Article.save(function(err, doc) {
														if (err) {
															console.error(err);
														} else {
															console.log('saved' + data.title + "(" + data.submitTime + ")" + "success");
														}
													})
												} else {
													var newArticle = new ArticleModel({
														url: data.url,
														board: data.board,
														title: data.title,
														author: data.author,
														authorQuery: data.authorQuery,
														floor: data.floor,
														submitTime: data.submitTime,
														content: data.content,
														rawContent: data.rawContent,
														imgUrlList: data.imgUrlList
													})
													newArticle.update(function(err, doc) {
														if (err) {
															console.error(err);
														} else {
															console.log('update' + data.title + "(" + data.submitTime + ")" + "success");
														}
													})
												}
											}
										})
											/*ArticleModel.findOneAndUpdate({
												url: data.url
											}, newArticle, function(err, doc) {
												if (err) {
													console.error(err);
												} else {
													console.log('updated' + data.title + "(" + data.submitTime + ")" + "success");
												}
											})*/
									}
								})
							/*}*/
							} else {
								//console.log(boardUrl + '是目录');
							}
						};
					}
				})

			};
		})
	});

})

function getSectionUrl(sectionUrl, cookie, next) {
	superagent
		.get(Config.url.section)
		.set("Cookie", cookie)
		.end(function(err, sres) {
			if (err) {
				return next(' getSectionUrl' + err);
			}

			/*console.log(sres.text);*/
			var $ = cheerio.load(sres.text);
			var sectionArr = []; // 分区目录数组:保存 url/section

			$("#m_main ul.slist li a:nth-child(2)").each(function(idx, elet) {
				var $text = $(elet).text();
				sectionArr.push({
					url: $(elet).attr('href'),
					title: $text
				});
			});
			/*console.log(sectionArr);*/
			return next(null, sectionArr);
		});
}

function getBoardUrl(sectionUrl, cookie, next) {
	superagent
		.get(url.resolve(Config.url.index, sectionUrl))
		.set("Cookie", cookie)
		.end(function(err, sres) {
			if (err) {
				return next(' getboardUrl' + err);
			}

			var $ = cheerio.load(sres.text);
			var boardArr = []; // 板块目录数组:保存 url/boardUrl

			/*$("#wraper .menu.sp").each(function(index, el) {
				var $text = $(el).text();
				console.log($text);
			});*/

			$("#m_main ul.slist li a").each(function(idx, elet) {
				/*var section = $(this.parent).text();
				console.log(section);*/
				var foo = $("#wraper .menu.sp").text();
				/*console.log(foo);*/
				var sectionName = foo.substr(foo.indexOf('-') + 1, 4);

				var bar = $(this.parent).children('font').text();
				//console.log(bar);
				var level;
				if (bar) {
					level = "目录";
				} else {
					level = "版面";
				}

				var $text = $(elet).text();
				boardArr.push({
					section: sectionName,
					level: level,
					boardUrl: $(elet).attr('href'),
					boardTitle: $text
				});
			});
			//console.log(boardArr);
			return next(null, boardArr);
		})
}

function getArticleUrl(boardUrl, cookie, next) {
	//console.log(url.resolve(Config.url.index, boardUrl));
	superagent
		.get(url.resolve(Config.url.index, boardUrl))
		.set("Cookie", cookie)
		.end(function(err, sres) {
			if (err) {
				return next(' getArticleUrl' + err);
			}

			var $ = cheerio.load(sres.text);
			var articleArr = {
				url: '',
				title: '',
				author: '',
				authorQuery: '',
				board: '',
				submitTime: '',
				content: '',
				rawContent: '',
				floor: '',
				imgUrlList: []
			}; // 文章目录数组:保存 url/article

			$("#m_main ul.list li").each(function(idx, elet) {
				var $text = $(elet).text();
				//console.log($text);
				var $top = $(elet).children('div').eq(0).children('a');
				var $topText = $top.parent().text();
				var $bottom = $(elet).children('div').eq(1).children('a');
				var $bottomText = $bottom.parent().text();
				var re = /[0-9]+(-)?(:)?[0-9]+(-)?(:)?[0-9]+/;//匹配时间格式2016-04-28或者10:30:30

				articleArr.url = $top.attr("href");
				articleArr.author = $bottom.eq(0).text();
				/*articleArr.title = $top.text();
				articleArr.commentsCount = $topText.slice($topText.lastIndexOf('(')+1, $topText.lastIndexOf(')'));
				articleArr.submitTime = re.exec($bottomText)[0];
				articleArr.author = $bottom.eq(0).text();
				articleArr.authorQuery = $bottom.eq(0).attr("href");
				articleArr.lastCommentUser = $bottom.eq(1).text();
				articleArr.lastCommentUserQuery = $bottom.eq(1).attr("href");
				articleArr.lastCommentTime = re.exec($bottomText.slice($bottomText.indexOf('|')+1, $bottomText.indexOf('&')))[0];*/
				
				if (articleArr.author != "原帖已删除") {
					getArticleContent(articleArr.url, cookie, function(err, data) {
						if (err) {
							console.error(err);
						} else {
							var articleContent = data;
							//console.log(articleContent);
							/*articleArr.url = articleArr.url;*/
							articleArr.url = articleContent.url;
							articleArr.title = articleContent.title;
							articleArr.author = articleContent.author;
							articleArr.authorQuery = articleContent.authorQuery;
							articleArr.board = articleContent.board;
							articleArr.submitTime = articleContent.submitTime;
							articleArr.content = articleContent.content;
							articleArr.rawContent = articleContent.rawContent;
							articleArr.floor = articleContent.floor;
							articleArr.imgUrlList = articleContent.imgUrlList;

							return next(null, articleArr);
						}
					})
				} else {
					console.log('原帖已删除');
					articleArr.title = $top.text();
					articleArr.submitTime = re.exec($bottomText)[0];
					return next(null, articleArr);
				}
				//return next(null, articleArr);
			})
			$("#m_main div.sec:nth-child(2) form a").each(function(index, el) {
				var $text = $(el).text();
				//console.log($text);
				if ($text == "下页") {
					var nextPageUrl = $(this).attr('href');
					//console.log(nextPageUrl);
					getArticleUrl(nextPageUrl, cookie, next);
				} else {
					// 板块只有单页
				}
			});
			
			/*var re = /[0-9]+/;
			var pages = $("#m_main div.sec:nth-child(2) form a.plant").text();
			var foo = re.exec(pages.slice(pages.indexOf('/'), pages.length));
			var totalNum = parseInt(foo);
			console.log(parseInt(foo));
			var baseQueryUrl = boardUrl + "?p=";
			
			for (var i = 2;; i < totalNum; i++) {
				nextPageUrl = baseQueryUrl + i;
				getArticleUrl(nextPageUrl, cookie, next);
			};*/

		})
}

function getArticleContent(articleUrl, cookie, next) {
	superagent
	.get(url.resolve(Config.url.index, articleUrl))
	.set('Cookie', cookie)
	.end(function(err, sres) {
		if(err) {
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
			var boardTitle = board.slice(board.indexOf('-')+1, board.indexOf('('));
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