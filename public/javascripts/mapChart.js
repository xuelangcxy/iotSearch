// 基于准备好的dom，初始化echarts实例
var mapChart = echarts.init(document.getElementById('mapChart'), 'customed');

// 指定图表的配置项和数据
function randomData() {
    return Math.round(Math.random()*1000);
}

option = {
    title: {
        text: '全国城市空气质量情况',
        subtext: '',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data:['AQI','PM2.5','PM10']
    },
    visualMap: {
        min: 0,
        max: 500,
        left: 'left',
        top: 'bottom',
        text: ['高','低'],           // 文本，默认为数值文本
        /*calculable: true*/
        calculable: false
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    series: [
        {
            name: 'AQI',
            type: 'map',
            mapType: 'china',
            roam: true,
            mapValueCalculation: 'sum',
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data:[
                /*{name: '北京',value: randomData() },
                {name: '天津',value: randomData() },
                {name: '上海',value: randomData() },
                {name: '重庆',value: randomData() },
                {name: '河北',value: randomData() },
                {name: '河南',value: randomData() },
                {name: '云南',value: randomData() },
                {name: '辽宁',value: randomData() },
                {name: '黑龙江',value: randomData() },
                {name: '湖南',value: randomData() },
                {name: '安徽',value: randomData() },
                {name: '山东',value: randomData() },
                {name: '新疆',value: randomData() },
                {name: '江苏',value: randomData() },
                {name: '浙江',value: randomData() },
                {name: '江西',value: randomData() },
                {name: '湖北',value: randomData() },
                {name: '广西',value: randomData() },
                {name: '甘肃',value: randomData() },
                {name: '山西',value: randomData() },
                {name: '内蒙古',value: randomData() },
                {name: '陕西',value: randomData() },
                {name: '吉林',value: randomData() },
                {name: '福建',value: randomData() },
                {name: '贵州',value: randomData() },
                {name: '广东',value: randomData() },
                {name: '青海',value: randomData() },
                {name: '西藏',value: randomData() },
                {name: '四川',value: randomData() },
                {name: '宁夏',value: randomData() },
                {name: '海南',value: randomData() },
                {name: '台湾',value: randomData() },
                {name: '香港',value: randomData() },
                {name: '澳门',value: randomData() }*/
            ]
        },
        {
            name: 'PM2.5',
            type: 'map',
            mapType: 'china',
            roam: true,
            mapValueCalculation: 'sum',
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data:[]
        },
        {
            name: 'PM10',
            type: 'map',
            mapType: 'china',
            roam: true,
            mapValueCalculation: 'sum',
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data:[]
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
/*mapChart.setOption({
    series: [{
        type: 'map',
        map: 'china'
    }]
});*/

//mapChart.setOption(option);

$.getJSON('/javascripts/chinaPM25.json', function(json, textStatus) {
        console.log(json);
        console.log(textStatus);
        var foo = json.city;
        console.log(foo.length);
        for (var i in foo) {
            //console.log("城市: " + foo[i].name + "\n" + "PM2.5浓度: " + foo[i].value);
            /*option.series[0].data[i].name = foo[i].name;
            option.series[0].data[i].value = foo[i].value;*/
            /*option.series[0].data[i] = foo[i];
            mapChart.setOption(option);*/
        };
});

/*$.ajax({
    url: 'http://10.107.31.216:2333/data/aqiRankProvince.json',
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'callback'
})
.done(function(data) {
    console.log(data);
})
.fail(function() {
    console.log("error");
})
.always(function() {
    console.log("complete");
});*/

$.ajax({
    url: 'http://10.107.31.216:2333/data/aqiRankProvince.json',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
        var aqiRank = data;
        /*console.log(aqiRank);
        console.log(aqiRank.length);*/
        for (var i=0; i<aqiRank.length; i++) {
            var aqi = (aqiRank[i].aqi) ? (aqiRank[i].aqi.aqi) : 0;
            var pm25 = (aqiRank[i].aqi) ? (aqiRank[i].aqi.pm2_5) : 0;
            var pm10 = (aqiRank[i].aqi) ? (aqiRank[i].aqi.pm10) : 0;
            //console.log(i + ': ' + aqiRank[i].capital + ": " + aqi);
            var data0 = {name: aqiRank[i].name, value: aqi};
            var data1 = {name: aqiRank[i].name, value: pm25};
            var data2 = {name: aqiRank[i].name, value: pm10};
            option.series[0].data.push(data0);
            option.series[1].data.push(data1);
            option.series[2].data.push(data2);
            /*option.series[0].data[i].name = aqiRank[i].name;
            option.series[0].data[i].value = aqi;*/
            if(i == aqiRank.length-1) {
                var time = aqiRank[0].aqi.time_point.replace(/T/, " ").replace(/Z/, "");
                option.title.subtext = "监测时间: " + new Date(time).toLocaleString();
                //option.series[0].data[4].selected = true;
                mapChart.setOption(option);
            }
        };
        
    },
    error: function() {
        console.log('Failed');
    }
});



window.onresize = mapChart.resize;

mapChart.on('click', function (params) {
    // 控制台打印数据的名称
    //alert("城市: " + params.name + "\n" + "PM2.5浓度: " + params.value);
    window.location.href = window.location.origin + "/province/query?name=" + escape(params.name);
});

$("#search-input").bind('input propertychange', function(event) {
    var data = $(this).val();
    console.log(data);
    var dataArr = option.series[0].data;
    if (data) {
        $("#search-clear").removeClass('hide');
        var listContent = document.createElement('ul');
        listContent.className = 'hint_list';
        for (var i = 0; i < dataArr.length; i++) {
            option.series[0].data[i].selected = false;
            if (data.indexOf(dataArr[i].name)>=0 || dataArr[i].name.indexOf(data)>=0) {
                console.log(option.series[0].data[i]);

                if ($('#search>.hint').hasClass('hide')) {
                    $('#search>.hint').removeClass('hide');
                } else{};
                /*var listContent = "<ul class='hint_list'></ul>";*/
                var listNode = document.createElement('li');
                listNode.innerHTML = dataArr[i].name;
                listNode.onclick = function() {
                    var selectItem = $(this).text();
                    $('#search-input').val(selectItem);
                    $('#search>.hint').addClass('hide');
                    for (var i = 0; i < dataArr.length; i++) {
                        option.series[0].data[i].selected = false;
                        if (dataArr[i].name.indexOf(selectItem)>=0) {
                            option.series[0].data[i].selected = true;
                            mapChart.setOption(option);
                        }
                    }
                };
                listContent.appendChild(listNode);

                option.series[0].data[i].selected = true;
                mapChart.setOption(option);
                //break;
            };
            if (i == dataArr.length-1) {
                $('#search>.hint').html(listContent);
                if (!listNode) {
                    $('#search-input').addClass('no-match');
                } else{
                    $('#search-input').removeClass('no-match');
                }
            }
        };
    } else {
        $('#search>.hint').addClass('hide');
        $('#search>.hint').html("");
        if ($('#search-input').hasClass('no-match')) {
            $('#search-input').removeClass('no-match');
        }
        
        for (var i = 0; i < dataArr.length; i++) {
            if (option.series[0].data[i].selected === true) {
                option.series[0].data[i].selected = false;
                mapChart.setOption(option);
            };
        }
        $("#search-clear").addClass('hide');
    }
});

$("#search-clear").click(function(event) {
    var dataArr = option.series[0].data;
    for (var i = 0; i < dataArr.length; i++) {
        if (option.series[0].data[i].selected === true) {
            option.series[0].data[i].selected = false;
            mapChart.setOption(option);
        };
    }

    $("#search-input").val("");
    $("#search-clear").addClass('hide');

    $('#search>.hint').addClass('hide');
    $('#search>.hint').html("");
    if ($('#search-input').hasClass('no-match')) {
        $('#search-input').removeClass('no-match');
    }
});

/*var tmp = '';
$('.hint_list li').hover(function() {
    tmp = $('#search-input').val();
    var currentVal = $(this).text();
    console.log(currentVal);
    $('#search-input').val(currentVal);
}, function() {
    $('#search-input').val(tmp);
});

$('.hint_list li').click(function(event) {
    alert($(this).text());
    var selectItem = $(this).text();
    $('#search-input').val(selectItem);
});

$('.hint .hint_list li').click(function(event) {
    console.log($('.hint_list li').html());
});*/