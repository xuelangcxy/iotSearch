/*var request = require('superagent');
request
.get('http://tianqi.2345.com/beijinglvyou/jingdiangg/')
.end(function(err, res){
    console.log(res.text);
});*/

require("request").get({ url : "http://tianqi.2345.com/beijinglvyou/jingdiangg/" ,encoding : null} ,function(err, response, body){
  var charset="utf-8";
  var arr=body.toString().match(/<meta([^>]*?)>/g);
  if(arr){
    arr.forEach(function(val){
      var match=val.match(/charset\s*=\s*(.+)\"/);
      if(match && match[1]){
        if(match[1].substr(0,1)=='"')match[1]=match[1].substr(1);
        charset=match[1].trim();
        return false;
      }
    })
  }

  var data = require('iconv-lite').decode(body, "gbk");
  console.log(data);
})