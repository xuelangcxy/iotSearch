"use strict";

var superagent = require('superagent'),
    url = require('url'),
    cheerio = require('cheerio'),
    http = require("http"),
    fs = require('fs'),
    mongoose = require('mongoose'),
    async = require('async'),
    path = require('path');

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

function getCookie(next) {
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

            next(null, cookie);
        });
};

getCookie(function(err, cookie) {
    updateTopTen(cookie, function(err) {
        if (err) {
            console.error(err);
        } else {
            console.log('Done!');
        }
    })
});

function updateTopTen(cookie, next) {
    async.waterfall([
        function getSectionUrl(next) {
            superagent
                .get(Config.url.section)
                .set("Cookie", cookie)
                .end(function(err, sres) {
                    if (err) {
                        return next(' getSectionUrl' + err);
                    }
                    var $ = cheerio.load(sres.text);
                    var sectionArr = []; // 分区目录数组:保存 url/section

                    $("#m_main ul.slist li a:nth-child(2)").each(function(idx, elet) {
                        var $text = $(elet).text();
                        sectionArr.push({
                            url: $(elet).attr('href'),
                            title: $text
                        });
                    });
                    next(null, sectionArr);
                });
        },
        function getBoard(sectionArr, next) {
            fs.readFile(path.join(process.cwd(), 'boardUrlList.txt'), function(err, boardUrlList) {
            	if (err) {
            		return next("read boardArr.json " + err);
            	} else {
            		next(null, JSON.parse(boardUrlList));
            	}
            });
        },
        function getArticle(boardUrlList, next) {
        	boardUrlList.forEach( function(element, index) {
        		//console.log(element);
        		getArticleUrl(element.boardUrl, cookie, function(err, articleArr) {
        			if (err) {
        				return next("getArticleArr: " + err);
        			} else {
        				console.log(articleArr);
        			}
        		});
        	});
        }
    ], function(err, results) {
        if (err) {
            return console.log(err);
        } else {
            console.log(results);
        }
    });

};


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
            });
            return next(null, boardArr);
        })
};

function getArticleUrl(boardUrl, cookie, next) {
	superagent
		.get(url.resolve(Config.url.index, boardUrl))
		.set("Cookie", cookie)
		.end(function(err, sres) {
			if (err) {
				next('getArticleUrl' + err);
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
					//next(null, articleArr);
				}
			});
			next(null, articleArr);
		})
		/*return next(null, articleUrlList);*/
}