//历史数据图
require.config({
    paths: {
        //echarts: 'http://echarts.baidu.com/build/dist'
        echarts: '/dist'
    }
});

// 使用
require(
    [
        'echarts',
        'echarts/chart/line',
        'echarts/chart/bar'
        /*,
                    'echarts/chart/line'*/ // 使用柱状图就加载bar模块，按需加载
    ],
    function(ec) {
        // 基于准备好的dom，初始化echarts图表
        var historyChart = ec.init(document.getElementById('temp_chart'));

        function updateAqiHistoryChart() {
            $.getJSON('../tmp/aqi_history.json', function(data) {
                var info = data;
                var re = /[0-9]+:[0-9]+/;

                option.series[0].name = "AQI";
                option.series[0].itemStyle.normal.color = function(params) {
                    // build a color map as your need.
                    var colorList = [
                        '#8FC31F', '#D7AF0E', '#F39800', '#E3261A', '#5F52A0', '#631541', 'white'
                    ];
                    if (params.series.data[params.dataIndex] > 0 && params.series.data[params.dataIndex] <= 50) {
                        return colorList[0]
                    } else if (params.series.data[params.dataIndex] > 50 && params.series.data[params.dataIndex] <= 100) {
                        return colorList[1]
                    } else if (params.series.data[params.dataIndex] > 100 && params.series.data[params.dataIndex] <= 150) {
                        return colorList[2]
                    } else if (params.series.data[params.dataIndex] > 150 && params.series.data[params.dataIndex] <= 200) {
                        return colorList[3]
                    } else if (params.series.data[params.dataIndex] > 200 && params.series.data[params.dataIndex] <= 300) {
                        return colorList[4]
                    } else if (params.series.data[params.dataIndex] > 300) {
                        return colorList[5]
                    } else {
                        return colorList[6]
                    };
                }
                for (var i = 0; i < 24; i++) {
                    option.series[0].data[23 - i] = info[i].aqi;
                    option.xAxis[0].data[23 - i] = re.exec(info[i].time);
                    historyChart.setOption(option, true);
                };
            })
        }

        function updatePm25HistoryChart() {
            $.getJSON('../tmp/pm25_history.json', function(data) {
                var info = data;
                var re = /[0-9]+:[0-9]+/;

                option.series[0].name = "PM2.5";
                option.series[0].itemStyle.normal.color = function(params) {
                    // build a color map as your need.
                    var colorList = [
                        '#8FC31F', '#D7AF0E', '#F39800', '#E3261A', '#5F52A0', '#631541', 'white'
                    ];
                    if (params.series.data[params.dataIndex] > 0 && params.series.data[params.dataIndex] <= 50) {
                        return colorList[0]
                    } else if (params.series.data[params.dataIndex] > 50 && params.series.data[params.dataIndex] <= 100) {
                        return colorList[1]
                    } else if (params.series.data[params.dataIndex] > 100 && params.series.data[params.dataIndex] <= 150) {
                        return colorList[2]
                    } else if (params.series.data[params.dataIndex] > 150 && params.series.data[params.dataIndex] <= 200) {
                        return colorList[3]
                    } else if (params.series.data[params.dataIndex] > 200 && params.series.data[params.dataIndex] <= 300) {
                        return colorList[4]
                    } else if (params.series.data[params.dataIndex] > 300) {
                        return colorList[5]
                    } else {
                        return colorList[6]
                    };
                }
                for (var i = 0; i < 24; i++) {
                    option.series[0].data[23 - i] = info[i].pm2_5;
                    option.xAxis[0].data[23 - i] = re.exec(info[i].time);
                    historyChart.setOption(option, true);
                };
            })
        }

        function updatePm10HistoryChart() {
            $.getJSON('../tmp/pm10_history.json', function(data) {
                var info = data;
                var re = /[0-9]+:[0-9]+/;

                option.series[0].name = "PM10";
                option.series[0].itemStyle.normal.color = function(params) {
                    // build a color map as your need.
                    var colorList = [
                        '#8FC31F', '#D7AF0E', '#F39800', '#E3261A', '#5F52A0', '#631541', 'white'
                    ];
                    if (params.series.data[params.dataIndex] > 0 && params.series.data[params.dataIndex] <= 50) {
                        return colorList[0]
                    } else if (params.series.data[params.dataIndex] > 50 && params.series.data[params.dataIndex] <= 100) {
                        return colorList[1]
                    } else if (params.series.data[params.dataIndex] > 100 && params.series.data[params.dataIndex] <= 150) {
                        return colorList[2]
                    } else if (params.series.data[params.dataIndex] > 150 && params.series.data[params.dataIndex] <= 200) {
                        return colorList[3]
                    } else if (params.series.data[params.dataIndex] > 200 && params.series.data[params.dataIndex] <= 300) {
                        return colorList[4]
                    } else if (params.series.data[params.dataIndex] > 300) {
                        return colorList[5]
                    } else {
                        return colorList[6]
                    };
                }
                for (var i = 0; i < 24; i++) {
                    option.series[0].data[23 - i] = info[i].pm10;
                    option.xAxis[0].data[23 - i] = re.exec(info[i].time);
                    historyChart.setOption(option, true);
                };
            })
        }

        function updateNo2HistoryChart() {
            $.getJSON('../tmp/no2_history.json', function(data) {
                var info = data;
                var re = /[0-9]+:[0-9]+/;

                option.series[0].name = "NO2";
                option.series[0].itemStyle.normal.color = function(params) {
                    // build a color map as your need.
                    var colorList = [
                        '#8FC31F', '#D7AF0E', '#F39800', '#E3261A', '#5F52A0', '#631541', 'white'
                    ];
                    if (params.series.data[params.dataIndex] > 0 && params.series.data[params.dataIndex] <= 50) {
                        return colorList[0]
                    } else if (params.series.data[params.dataIndex] > 50 && params.series.data[params.dataIndex] <= 100) {
                        return colorList[1]
                    } else if (params.series.data[params.dataIndex] > 100 && params.series.data[params.dataIndex] <= 150) {
                        return colorList[2]
                    } else if (params.series.data[params.dataIndex] > 150 && params.series.data[params.dataIndex] <= 200) {
                        return colorList[3]
                    } else if (params.series.data[params.dataIndex] > 200 && params.series.data[params.dataIndex] <= 300) {
                        return colorList[4]
                    } else if (params.series.data[params.dataIndex] > 300) {
                        return colorList[5]
                    } else {
                        return colorList[6]
                    };
                }
                for (var i = 0; i < 24; i++) {
                    option.series[0].data[23 - i] = info[i].no2;
                    option.xAxis[0].data[23 - i] = re.exec(info[i].time);
                    historyChart.setOption(option, true);
                };
            })
        }

        function updateO3HistoryChart() {
            $.getJSON('../tmp/o3_history.json', function(data) {
                var info = data;
                var re = /[0-9]+:[0-9]+/;

                option.series[0].name = "O3";
                option.series[0].itemStyle.normal.color = function(params) {
                    // build a color map as your need.
                    var colorList = [
                        '#8FC31F', '#D7AF0E', '#F39800', '#E3261A', '#5F52A0', '#631541', 'white'
                    ];
                    if (params.series.data[params.dataIndex] > 0 && params.series.data[params.dataIndex] <= 50) {
                        return colorList[0]
                    } else if (params.series.data[params.dataIndex] > 50 && params.series.data[params.dataIndex] <= 100) {
                        return colorList[1]
                    } else if (params.series.data[params.dataIndex] > 100 && params.series.data[params.dataIndex] <= 150) {
                        return colorList[2]
                    } else if (params.series.data[params.dataIndex] > 150 && params.series.data[params.dataIndex] <= 200) {
                        return colorList[3]
                    } else if (params.series.data[params.dataIndex] > 200 && params.series.data[params.dataIndex] <= 300) {
                        return colorList[4]
                    } else if (params.series.data[params.dataIndex] > 300) {
                        return colorList[5]
                    } else {
                        return colorList[6]
                    };
                }
                for (var i = 0; i < 24; i++) {
                    option.series[0].data[23 - i] = info[i].o3;
                    option.xAxis[0].data[23 - i] = re.exec(info[i].time);
                    historyChart.setOption(option, true);
                };
            })
        }

        function updateSo2HistoryChart() {
            $.getJSON('../tmp/so2_history.json', function(data) {
                var info = data;
                var re = /[0-9]+:[0-9]+/;

                option.series[0].name = "SO2";
                option.series[0].itemStyle.normal.color = function(params) {
                    // build a color map as your need.
                    var colorList = [
                        '#8FC31F', '#D7AF0E', '#F39800', '#E3261A', '#5F52A0', '#631541', 'white'
                    ];
                    if (params.series.data[params.dataIndex] > 0 && params.series.data[params.dataIndex] <= 50) {
                        return colorList[0]
                    } else if (params.series.data[params.dataIndex] > 50 && params.series.data[params.dataIndex] <= 100) {
                        return colorList[1]
                    } else if (params.series.data[params.dataIndex] > 100 && params.series.data[params.dataIndex] <= 150) {
                        return colorList[2]
                    } else if (params.series.data[params.dataIndex] > 150 && params.series.data[params.dataIndex] <= 200) {
                        return colorList[3]
                    } else if (params.series.data[params.dataIndex] > 200 && params.series.data[params.dataIndex] <= 300) {
                        return colorList[4]
                    } else if (params.series.data[params.dataIndex] > 300) {
                        return colorList[5]
                    } else {
                        return colorList[6]
                    };
                }
                for (var i = 0; i < 24; i++) {
                    option.series[0].data[23 - i] = info[i].so2;
                    option.xAxis[0].data[23 - i] = re.exec(info[i].time);
                    historyChart.setOption(option, true);
                };
            })
        }

        function updateCoHistoryChart() {
            $.getJSON('../tmp/co_history.json', function(data) {
                var info = data;
                var re = /[0-9]+:[0-9]+/;

                option.series[0].name = "CO";
                option.series[0].itemStyle.normal.color = function(params) {
                    // build a color map as your need.
                    var colorList = [
                        '#8FC31F', '#D7AF0E', '#F39800', '#E3261A', '#5F52A0', '#631541', 'white'
                    ];
                    if (params.series.data[params.dataIndex] > 0 && params.series.data[params.dataIndex] <= 0.3) {
                        return colorList[0]
                    } else if (params.series.data[params.dataIndex] > 0.3 && params.series.data[params.dataIndex] <= 0.5) {
                        return colorList[1]
                    } else if (params.series.data[params.dataIndex] > 0.5 && params.series.data[params.dataIndex] <= 0.8) {
                        return colorList[2]
                    } else if (params.series.data[params.dataIndex] > 0.8 && params.series.data[params.dataIndex] <= 1) {
                        return colorList[3]
                    } else if (params.series.data[params.dataIndex] > 1 && params.series.data[params.dataIndex] <= 2) {
                        return colorList[4]
                    } else if (params.series.data[params.dataIndex] > 2) {
                        return colorList[5]
                    } else {
                        return colorList[6]
                    };
                }

                for (var i = 0; i < 24; i++) {
                    option.series[0].data[23 - i] = info[i].co;
                    option.xAxis[0].data[23 - i] = re.exec(info[i].time);
                    historyChart.setOption(option, true);
                };
            })
        }

        option = {
            backgroundColor: 'rgb(151,150,184)',
            color: ["rgb(35,172,56)"],
            title: {
                show: false,
                text: '北京 最近24小时PM2.5浓度变化趋势',
                x: 'center',
                textStyle: {
                    fontSize: 24,
                    fontWeight: 500,
                },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                },
                textStyle: {
                    /*color: 'rgb(255,255,255)',*/
                    color: 'rgb(0,0,0)',
                },
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {
                        show: false
                    },
                    dataView: {
                        show: false,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: false
                    },
                    saveAsImage: {
                        show: false
                    }
                }
            },
            calculable: false,
            /*legend: {
                data: ['pm 2.5浓度'],
                x: 'left',
                textStyle: {
                    fontSize: 20,
                }
            },*/
            xAxis: [{
                type: 'category',
                /*show: false,
                name: '检测时间',
                nameLocation: 'end',
                nameTextStyle: {
                    fontSize: 18,
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgb(63,136,187)',
                        type: 'solid',
                        width: '3',
                    },
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 15,
                    },
                },*/
                axisTick: {
                    show: true,
                },
                splitLine: {
                    show: false,
                },
                /*boundaryGap: false,*/
                /*data: ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']*/
                data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', ]
            }],
            yAxis: [{
                type: 'value',
                name: '浓度 (μg/m³)',
                nameLocation: 'left',
                nameTextStyle: {
                    rotate: 90,
                    fontSize: 20,
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgb(63,136,187)',
                        type: 'solid',
                        width: '3',
                    },
                },
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: 'rgb(0,0,0)',
                        fontSize: 15,
                    },
                },
                axisTick: {
                    show: true,
                },
                /*splitLine: {
                    show: false,
                },*/
            }],
            series: [

                {
                    name: 'pm 2.5浓度',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                // build a color map as your need.
                                var colorList = [
                                    '#8FC31F', '#D7AF0E', '#F39800', '#E3261A', '#5F52A0', '#631541', 'white'
                                ];
                                if (params.series.data[params.dataIndex] > 0 && params.series.data[params.dataIndex] <= 50) {
                                    return colorList[0]
                                } else if (params.series.data[params.dataIndex] > 50 && params.series.data[params.dataIndex] <= 100) {
                                    return colorList[1]
                                } else if (params.series.data[params.dataIndex] > 100 && params.series.data[params.dataIndex] <= 150) {
                                    return colorList[2]
                                } else if (params.series.data[params.dataIndex] > 150 && params.series.data[params.dataIndex] <= 200) {
                                    return colorList[3]
                                } else if (params.series.data[params.dataIndex] > 200 && params.series.data[params.dataIndex] <= 300) {
                                    return colorList[4]
                                } else if (params.series.data[params.dataIndex] > 300) {
                                    return colorList[5]
                                } else {
                                    return colorList[6]
                                };

                            }
                        },
                    },
                    data: [24, 136, 79, 32, 256, 125, 335, 68, 189, 200, 64, 233, 24, 136, 79, 32, 256, 125, 335, 68, 189, 200, 64, 233]
                        //data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]
                },
            ]
        };

        function drawAqiHistoryChart() {
            $.getJSON('../tmp/aqi_history.json', function(data) {
                var info = data;
                var re = /[0-9]+:[0-9]+/;

                option.series[0].name = "AQI"
                for (var i = 0; i < 24; i++) {
                    option.series[0].data[23 - i] = info[i].aqi;
                    option.xAxis[0].data[23 - i] = re.exec(info[i].time);
                    historyChart.setOption(option, true);
                };
            })
        }

        drawAqiHistoryChart();

        var timeTicket = "";

        clearInterval(timeTicket);
        timeTicket = setInterval(function() {
            updateAqiHistoryChart();
        }, 60 * 1000);

        function drawHistoryChart() {
            $('#name_aqi').click(function() {
                updateAqiHistoryChart();
                clearInterval(timeTicket);
                timeTicket = setInterval(function() {
                    updateAqiHistoryChart();
                }, 60 * 1000);
            })
            $('#name_pm25').click(function() {
                updatePm25HistoryChart();
                clearInterval(timeTicket);
                timeTicket = setInterval(function() {
                    updatePm25HistoryChart();
                }, 60 * 1000);
            })
            $('#name_pm10').click(function() {
                updatePm10HistoryChart();
                clearInterval(timeTicket);
                timeTicket = setInterval(function() {
                    updatePm10HistoryChart();
                }, 60 * 1000);
            })
            $('#name_no2').click(function() {
                updateNo2HistoryChart();
                clearInterval(timeTicket);
                timeTicket = setInterval(function() {
                    updateNo2HistoryChart();
                }, 60 * 1000);
            })
            $('#name_o3').click(function() {
                updateO3HistoryChart();
                clearInterval(timeTicket);
                timeTicket = setInterval(function() {
                    updateO3HistoryChart();
                }, 60 * 1000);
            })
            $('#name_so2').click(function() {
                updateSo2HistoryChart();
                clearInterval(timeTicket);
                timeTicket = setInterval(function() {
                    updateSo2HistoryChart();
                }, 60 * 1000);
            })
            $('#name_co').click(function() {
                updateCoHistoryChart();
                clearInterval(timeTicket);
                timeTicket = setInterval(function() {
                    updateCoHistoryChart();
                }, 60 * 1000);
            })

        }

        drawHistoryChart();
        window.onresize = historyChart.resize;
        /*setInterval(function() {
            drawHistoryChart();
        }, 5 * 1000)*/

    }
);