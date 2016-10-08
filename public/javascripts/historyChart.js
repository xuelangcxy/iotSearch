$(document).ready(function() {
	alert("message");
	$('span.name1').click(function(event) {
		alert($(this).text());
		$('span>.name1').removeClass('active');
		$(this).addClass('active');
	});
	/*$('#name_aqi').click(function() {
		$('#name_aqi').html("< AQI >");
		$('#name_pm10').html("PM10");
		$('#name_pm25').html("PM2.5");
		$('#name_no2').html("NO2");
		$('#name_o3').html("O3");
		$('#name_so2').html("SO2");
		$('#name_co').html("CO");
	})
	$('#name_pm10').click(function() {
		$('#name_aqi').html("AQI");
		$('#name_pm10').html("< PM10 >");
		$('#name_pm25').html("PM2.5");
		$('#name_no2').html("NO2");
		$('#name_o3').html("O3");
		$('#name_so2').html("SO2");
		$('#name_co').html("CO");
	})
	$('#name_pm25').click(function() {
		$('#name_aqi').html("AQI");
		$('#name_pm10').html("PM10");
		$('#name_pm25').html("< PM2.5 >");
		$('#name_no2').html("NO2");
		$('#name_o3').html("O3");
		$('#name_so2').html("SO2");
		$('#name_co').html("CO");
	})
	$('#name_no2').click(function() {
		$('#name_aqi').html("AQI");
		$('#name_pm10').html("PM10");
		$('#name_pm25').html("PM2.5");
		$('#name_no2').html("< NO2 >");
		$('#name_o3').html("O3");
		$('#name_so2').html("SO2");
		$('#name_co').html("CO");
	})
	$('#name_o3').click(function() {
		$('#name_aqi').html("AQI");
		$('#name_pm10').html("PM10");
		$('#name_pm25').html("PM2.5");
		$('#name_no2').html("NO2");
		$('#name_o3').html("< O3 >");
		$('#name_so2').html("SO2");
		$('#name_co').html("CO");
	})
	$('#name_so2').click(function() {
		$('#name_aqi').html("AQI");
		$('#name_pm10').html("PM10");
		$('#name_pm25').html("PM2.5");
		$('#name_no2').html("NO2");
		$('#name_o3').html("O3");
		$('#name_so2').html("< SO2 >");
		$('#name_co').html("CO");
	})
	$('#name_co').click(function() {
		$('#name_aqi').html("AQI");
		$('#name_pm10').html("PM10");
		$('#name_pm25').html("PM2.5");
		$('#name_no2').html("NO2");
		$('#name_o3').html("O3");
		$('#name_so2').html("SO2");
		$('#name_co').html("< CO >");
	})*/
	function datespace() {
		var date1 = "";
		var date2 = "";
		$.getJSON('../tmp/aqi_history.json', function(data) {
			var re = /-[0-9]+-[0-9]+/;
			var re1 = /[0-9]+-[0-9]+/;
			var day1 = re1.exec(re.exec(data[23].time));
			var k = "";
			date1 = day1[0].replace(/-/, "月");
			for (var i = 0; i < 23; i++) {
				var day = new Array();
				day[23 - i] = re1.exec(re.exec(data[23 - i].time));
				var date = new Array();
				date[23 - i] = day[23 - i][0];
				if (date[23 - i] != day1[0]) {
					k = 23 - i;
					break;
				};
			};
			var day2 = re1.exec(re.exec(data[k].time));
			date2 = day2[0].replace(/-/, "月");
			$('#date1').html(date1 + "日");
			$('#date2').html(date2 + "日");
			var m = "";
			if (k <= 2) {
				m = 2
			} else if (k >= 21) {
				m = 21;
			} else {
				m = k;
			};
			var left = (21 - m) * 17;
			$('.divider1').css({
				'margin-left': left + 'px'
			})
		})
	}
	datespace();
	setInterval(function() {
		datespace();
	}, 600 * 1000);
});