$(document).ready(function($) {
    var baseUrl = "http://m.byr.cn";
    var resp = null;
    $("#search1").ajaxForm({
        beforeSubmit: function(formData, jqForm, options) {
            var queryString = escape(formData[0].value);
            window.location.href = "/search/query?key=" + queryString;
        },
        success: function(responseText, status, xhr, $form) {
            /*console.log(responseText);*/
            console.log(status);
            if (status == 'success') {
                console.log(responseText);
                /*$(".LOGO div").addClass('search');
                $(".userForm div").addClass('search');
                $(".container").addClass('search');
                $(".result").show();
                $(".footer").hide();*/
                
            } else {
                // statement
            }
        },
        error: function(e) {
            alert("error");
        }
    })

    $("#key").focus();

    $("#key1").bind('keyup input propertychange', function(event) {
        var data = $("#key").val();
        if (data) {
            $(".LOGO div").addClass('search');
            $(".userForm div").addClass('search');
            $(".container").addClass('search');
            $(".result").show();
            $(".footer").hide();
            
            $.ajax({
                    url: "/search/query",
                    type: "GET",
                    data: {
                        key: $("#key").val()
                    },
                    success: function(responseText) {
                        $("#result").text("");
                        console.log(responseText);
                        resp = responseText.sendMessage;
                        var count = responseText.total;

                        var realtime_weather = responseText.weather.realtime.weather;
                        var temperature = responseText.weather.realtime.temp;
                        var humidity = responseText.weather.realtime.SD;
                        var wind = responseText.weather.realtime.WD + " " + responseText.weather.realtime.WS;

                        var aqi = responseText.aqi;

                        var aqiIndex = aqi.aqi;
                        var quality = aqi.quality;
                        var pm25 = aqi.pm2_5;
                        var pm10 = aqi.pm10;
                        var no2 = aqi.no2;
                        var so2 = aqi.so2;
                        var o3 = aqi.o3;
                        var co = aqi.co;
                        var pollutant = aqi.primary_pollutant;
                        var timepoint = aqi.time_point;

                        var query = responseText.query;
                        var queryString = document.createElement('div');

                        queryString.innerHTML = "<span>查询语句: " + query[0] + "  " + query[1] + "</span>";

                        $('.result').append(queryString);
                        var activity = document.createElement('div');
                        activity.innerHTML = "<span class='activity'>操场今天没有活动</span>";
                        $('.result').append(activity);
                        var amount = document.createElement('div');
                        amount.innerHTML = "<p class='amount'>操场当前共有: " + responseText.count + "人</p>"
                        $('.result').append(amount);
                        var w = document.createElement('div');
                        w.innerHTML = "<p class='weather'>实时天气: " + realtime_weather + "</p><p>温度: " + temperature + "°</p><p>湿度: " + humidity + "</p><p>风向风速: " + wind + "</p>";
                        $('.result').append(w);
                        var a = document.createElement('div');
                        a.innerHTML = "<p>空气质量指数: " + aqiIndex + "</p><p>空气质量等级: " + quality + "</p><p>PM2.5: " + pm25 + "</p><p>PM10: " + pm10 + "</p><p>NO2: " + no2 + "</p><p>SO2: " + so2 + "</p><p>O3: " + o3 + "</p><p>CO: " + co + "</p><p>首要污染物: " + pollutant + "</p><p>监测时间: " + timepoint + "</p>";
                        $('.result').append(a);

                        for (var i in resp) {
                            //如果原帖已删除则不显示
                            if (resp[i].board) {
                                if (resp[i].rawContent) {
                                    var e = document.createElement('p');
                                    e.setAttribute('name', 'resultItem');
                                    e.className = "box";
                                    e.innerHTML = "<div class='top'><span class='board'>来自:" + resp[i].board + "</span>" + "<span class='submitTime'>发表于:" + resp[i].submitTime + "</span>" + "<span class='author'>" + resp[i].author + "</span></div>" + "<a target='_blank' href=" + baseUrl + resp[i].url + ">" + resp[i].title + "</a> \n" + resp[i].rawContent.replace(/\/att\//g, baseUrl + '/att/').replace(/\/img\/ubb\/em/g, baseUrl + '/img/ubb/em');
                                    $('.result').append(e);
                                };
                            } else {

                            }
                        };

                        var e = document.createElement('p');
                        e.setAttribute('name', 'resultItem');
                        e.innerHTML = "<span class='head'>共<span class='count'>" + count + "</span>条信息, 搜索耗时<span class='cost'>" + responseText.cost + "</span>ms</span>" + "<span class='sortBy'><span>排序依据&nbsp;</span><input type='button' class='btn btn-primary' id='byRelativity' value='相关性'><input type='button' class='btn' id='byTime' value='时间'></span>";
                        $('.result').prepend(e)
                        /*$('.row').hide();*/
                        /*$('.result').fadeIn(500);*/
                        $('.result').show();
                        var divs = document.getElementsByTagName('p')
                        for (var i = 0; i < divs.length; i++) {
                            if (divs[i].className == 'box') show(divs[i]);
                        }

                    }
                })

        } else {
            /*$(".LOGO div").removeClass('search');
            $(".userForm div").removeClass('search');*/
        }
        var data = $("#key").val();
        console.log(data);
    });

    /*排序条件函数*/
    function by() {
        return function(o, p) {
            var today = getTime();
            var a, b;
            /*a = (o.name).indexOf("-")>0 ? o.name : today+" "+o.name;
            b = p.name.indexOf("-")>0 ? p.name : today+" "+p.name;*/
            a = o.submitTime;
            b = p.submitTime;
            if (a == b) {
                return 0;
            } else {
                return a > b ? -1 : 1;
            }
        }
    }

    function getTime() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        var strmonth = "";
        var strhour = "";
        var strday = "";
        var strminute = "";
        var strsecond = "";
        if (month < 10) {
            strmonth = "0";
        }
        if (day < 10) {
            strday = "0";
        }
        if (hour < 10) {
            strhour = "0";
        }
        if (minute < 10) {
            strminute = "0";
        }
        if (second < 10) {
            strsecond = "0";
        }
        var ymd = year + "-" + strmonth + month + "-" + strday + day;
        return ymd;
    }

    function show(box) {
        var text = box.innerHTML;
        var newBox = document.createElement("div");
        var button = document.createElement("button");
        button.className = "more";
        var btn = document.createElement("a");
        btn.className = "show";
        newBox.innerHTML = text.substring(0, 300);
        btn.innerHTML = text.length > 300 ? "显示全部" : "";
        btn.href = "###";
        btn.onclick = function() {
            if (btn.innerHTML == "显示全部") {
                btn.innerHTML = "收起";
                newBox.innerHTML = text;
            } else {
                btn.innerHTML = "显示全部";
                newBox.innerHTML = text.substring(0, 300);
            }
            return false;
        }
        box.innerHTML = "";
        button.appendChild(btn)
        box.appendChild(newBox);
        /*box.appendChild(btn);*/
        box.appendChild(button);
    }

    $(".LOGO div.search").click(function(event) {
        window.location.reload();
    });

});