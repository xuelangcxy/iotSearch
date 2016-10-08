// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('tempChart'));

/*myChart.showLoading({  
    text : "图表数据正在努力加载..."  
});*/

/*option = {
	title: {
		show: true,
		text: '温度',
		x: 'center',
		textStyle: {
			fontSize: 24,
			fontWeight: 500,
		},
	},
	tooltip: {
		show: true,
		trigger: 'axis',
		axisPointer: {
			type: 'none',
		},
		textStyle: {
			color: 'rgb(255,255,255)',
		},
	},
	toolbox: {
		show: false,
		feature: {
			mark: {
				show: false
			},
			dataView: {
				show: true,
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
				show: true
			}
		}
	},
	grid: {
		borderWidth: 0,
	},
	calculable: false,
	xAxis: [{
		type: 'category',
		show: false,
		axisLine: {
			show: false
		},
		axisTick: {
			show: false,
		},
		splitLine: {
			show: false,
		},
		splitArea: {
			show: false,
		},
		boundaryGap: false,
		data: ['1', '2', '3', '4']
	}],
	yAxis: [{
		show: false,
		type: 'value',
		axisTick: {
			show: false,
		},
	}],
	series: [
		{
			name: '最高气温',
			type: 'line',
			itemStyle: {
				normal: {
					lineStyle: {
						width: 3,
					},
					label: {
						show: true,
						formatter: '{c}°C',
						textStyle: {
							fontSize: 20,
						},
					},
				},
			},
			data: [25, 25, 25, 25]
		}, {
			name: '最低气温',
			type: 'line',
			itemStyle: {
				normal: {
					lineStyle: {
						width: 3,
					},
					label: {
						show: true,
						position: 'bottom',
						formatter: '{c}°C',
						textStyle: {
							fontSize: 20,
						},
					},
				},
			},
			data: [15, 15, 15, 15]
		},
	]
};*/

function drawTempChart(title) {
	option = {
		color: ["rgb(255,127,80)", "rgb(135,206,250)"],
		title: {
			show: true,
			text: '景点温度变化曲线',
			/*subtext: '奥林匹克公园',*/
			subtext: title,
			x: 'center',
			textStyle: {
				color: 'rgb(255,255,255)',
			},
			subtextStyle: {
				color: 'rgb(240,240,240)',
			}
		},
		tooltip: {
			show: true,
			trigger: 'axis',
			axisPointer: {
				type: 'none',
			},
			textStyle: {
				color: 'rgb(255,255,255)',
			},
		},
		legend: {
			x: 'left',
			textStyle: {
				color: 'rgb(255,255,255)',
			},
			data: ['最高气温', '最低气温']
		},
		toolbox: {
			show: true,
			color: ["rgb(255,255,255)"],
			feature: {
				dataZoom: {
					show: false,
					yAxisIndex: 'none'
				},
				dataView: {
					readOnly: false
				},
				magicType: {
					show: false,
					type: ['line', 'bar']
				},
				restore: {
					show: false
				},
				saveAsImage: {}
			}
		},
		grid: {
			borderWidth: 0,
		},
		xAxis: {
			show: false,
			type: 'category',
			boundaryGap: false,
			// data: ['8:00','9:00','11:00','12:00','13:00','14:00','15:00','8:00','9:00','11:00','12:00','13:00','14:00','15:00','15:00']
			data: []
		},
		yAxis: {
			show: false,
			type: 'value',
			axisLabel: {
				formatter: '{value} °C'
			}
		},
		series: [{
			name: '最高气温',
			type: 'line',
			itemStyle: {
				normal: {
					lineStyle: {
						width: 2,
					},
					label: {
						show: true,
						formatter: '{c}°C',
						textStyle: {
							fontSize: 16,
						},
					},
				},
			},
			// data:[20, 25, 26, 28, 27, 27, 28, 27, 29, 29, 27, 24, 23, 22, 20]
			data: []
		}, {
			name: '最低气温',
			type: 'line',
			itemStyle: {
				normal: {
					lineStyle: {
						width: 2,
					},
					label: {
						show: true,
						position: 'bottom',
						formatter: '{c}°C',
						textStyle: {
							fontSize: 16,
						},
					},
				},
			},
			// data:[15, 13, 15, 17, 18, 18, 18, 18, 19, 19, 14, 13, 13, 13, 11]
			data: []
		}]
	};

	// myChart.setOption(option);
	/*myChart.hideLoading();*/
	window.onresize = myChart.resize;

	/*if (!title) {*/
		$.ajax({
				url: '/viewpoint/weather/query',
				type: 'GET',
				dataType: 'json',
				/*data: {name: select.substr(select.indexOf(':')+1).replace(/\s/g, '')},*/
				data: {
					name: title
				},
				/*success: function(data) {
					var report = data[0].report;
					console.log(report);
					drawTempChart(report, viewpoint);
				}*/
			})
			.done(function(data) {
				console.log("---------->" + data);
				// option.title.subtext = viewpoint;
				var report = data[0].report;
				console.log(report);
				/*drawTempChart(report, viewpoint);*/
				for (var i = 0; i < report.length; i++) {
					option.series[0].data.push(report[i].high_temp);
					option.series[1].data.push(report[i].low_temp);
					option.xAxis.data.push(report[i].date);
					if (i == report.length - 1) {
						myChart.setOption(option);
					}
				};
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
	/*}*/
	

	/*for (var i = 0; i < dataArr.length; i++) {
		option.series[0].data.push(dataArr[i].high_temp);
		option.series[1].data.push(dataArr[i].low_temp);
		option.xAxis.data.push(dataArr[i].date);
		if (i == dataArr.length - 1) {
			myChart.setOption(option);
		}
	};*/

};

var init = $('.main_list>.title').eq(0).text();
var initTitle = init.substr(init.indexOf(':')+1).replace(/\s/g, '');
console.log(initTitle);
drawTempChart(initTitle);

$('.main_list>.title').eq(0).addClass('active');
$('.main_list>.title').click(function(event) {
	$('.main_list>.title').removeClass('active');
	$(this).addClass('active');
	var select = $(this).text();
	var viewpoint = select.substr(select.indexOf(':')+1).replace(/\s/g, '');
	console.log(viewpoint);

	drawTempChart(viewpoint);
	
});