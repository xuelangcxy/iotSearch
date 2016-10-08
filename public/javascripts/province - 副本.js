// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('provinceMap'), 'customed');

// 指定图表的配置项和数据
function randomData() {
    return Math.round(Math.random()*1000);
}

/*option = {
    title: {
        text: '北京市空气质量情况',
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
            mapType: 'beijing',
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
            name: 'PM2.5',
            type: 'map',
            mapType: 'beijing',
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
            mapType: 'beijing',
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
};*/

/*myChart.setOption({
    series: [{
        type: 'map',
        map: 'china'
    }]
});

window.onresize = myChart.resize;*/

/*app.title = '34 省切换查看';*/

var provinces = ['beijing', 'tianjin', 'hebei', 'shanxi', 'neimenggu','liaoning','jilin','heilongjiang','shanghai', 'jiangsu','zhejiang','anhui','fujian','jiangxi','shandong','henan','hubei','hunan','guangdong','hainan','guangxi','gansu','shanxi1','xinjiang', 'qinghai','ningxia','chongqing', 'sichuan','guizhou','yunnan','xizang','xianggang', 'aomen'];
var provincesText = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林','黑龙江', '上海',  '江苏', '浙江', '安徽', '福建', '江西', '山东','河南', '湖北', '湖南', '广东', '海南', '广西', '甘肃', '陕西', '新疆', '青海', '宁夏', '重庆', '四川', '贵州', '云南', '西藏', '香港', '澳门'];

function showProvince() {
    var name = provinces[currentIdx];

    // myChart.showLoading();

    $.get('/assets/echarts/province/map/json/' + name + '.json', function (geoJson) {

        // myChart.hideLoading();

        echarts.registerMap(name, geoJson);

        myChart.setOption(option = {
                    title: {
                        text: provincesText[currentIdx] + '空气质量情况',
                        subtext: '',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        /*data: ['AQI', 'PM2.5', 'PM10']*/
                        data: ['AQI']
                    },
                    visualMap: {
                        min: 0,
                        max: 500,
                        left: 'left',
                        top: 'bottom',
                        text: ['高', '低'], // 文本，默认为数值文本
                        calculable: false
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            dataView: {
                                readOnly: false
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
            series: [
                {
                    name: 'AQI',
                    type: 'map',
                    mapType: name,
                    /*roam: true,
                    mapValueCalculation: 'sum',*/
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#389BB7',
                            areaColor: '#fff',
                        },
                        emphasis: {
                            areaColor: '#389BB7',
                            borderWidth: 0
                        }
                    },
                    animation: true,
                    // animationDurationUpdate: 1000,
                    // animationEasingUpdate: 'quinticInOut'
                    data: [
                        {name: "海淀区", value: "65"},
                        {name: "朝阳区", value: "85"},
                        {name: "东城区", value: "95"},
                        {name: "西城区", value: "55"},
                        {name: "昌平区", value: "165"},
                        {name: "顺义区", value: "265"},
                        {name: "通州区", value: "125"},
                        {name: "石景山区", value: "95"},
                        {name: "丰台区", value: "45"},
                        {name: "门头沟区", value: "365"},
                        {name: "房山区", value: "265"},
                        {name: "大兴区", value: "115"},
                        {name: "平谷区", value: "25"},
                        {name: "怀柔区", value: "355"},
                        {name: "密云县", value: "235"},
                        {name: "延庆县", value: "165"}
                    ]
                }
            ]
        });
    });
}

var currentIdx = 0;

showProvince();

// Draw icon
var zr = myChart.getZr();
/*zr.remove(app.iconGroup);*/

var icon0 = new echarts.graphic.Circle({
    shape: { r: 20 },
    style: {
        text: '<',
        fill: '#eee'
    },
    position: [50, zr.getHeight() / 2]
});
var icon1 = new echarts.graphic.Circle({
    shape: { r: 20 },
    style: {
        text: '>',
        fill: '#eee'
    },
    position: [zr.getWidth() - 50, zr.getHeight() / 2]
});
var group = new echarts.graphic.Group();
group.add(icon0);
group.add(icon1);
zr.add(group);

icon0.on('click', function () {
    currentIdx -= 1;
    if (currentIdx < 0) {
        currentIdx += provinces.length;
    }
    $.getJSON('/tmp/cityAQI.json', function(aqiJson, textStatus) {
        var cityAQI = aqiJson[currentIdx].city;
            for (var i in cityAQI) {
                var aqi = (cityAQI[i].aqi) ? (cityAQI[i].aqi.aqi) : 0;
                var data = {name: cityAQI[i].name, value: cityAQI[i].aqi.aqi};
                option.series[0].data.push(data);
                if(i == cityAQI.length-1) {
                    var time = cityAQI[0].aqi.time_point.replace(/T/, " ").replace(/Z/, "");
                    option.title.subtext = "监测时间: " + new Date(time).toLocaleString();
                    console.log(option.series[0].data);
                    showProvince();
                }
            };
    });
    
});
icon1.on('click', function () {
    currentIdx = (currentIdx + 1) % provinces.length;

    $.getJSON('/tmp/cityAQI.json', function(aqiJson, textStatus) {
        var cityAQI = aqiJson[currentIdx].city;
            for (var i in cityAQI) {
                var aqi = (cityAQI[i].aqi) ? (cityAQI[i].aqi.aqi) : 0;
                var data = {name: cityAQI[i].name, value: cityAQI[i].aqi.aqi};
                if(i == cityAQI.length-1) {
                    var time = cityAQI[0].aqi.time_point.replace(/T/, " ").replace(/Z/, "");
                    option.title.subtext = "监测时间: " + new Date(time).toLocaleString();
                    showProvince();
                }
            };
    });

});
