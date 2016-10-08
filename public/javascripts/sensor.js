$(document).ready(function() {
	// 百度地图API功能
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(116.367361, 39.964361);
	map.enableScrollWheelZoom(true);
	map.centerAndZoom(point, 25);
	/*setTimeout(function() {
		map.centerAndZoom(point, 25);
	}, 1000);*/
	// 用经纬度设置地图中心点
	function theLocation(longitude, latitude) {
		map.clearOverlays();
		var new_point = new BMap.Point(longitude, latitude);
		var marker = new BMap.Marker(new_point); // 创建标注
		map.addOverlay(marker); // 将标注添加到地图中
		map.panTo(new_point);

		var opts = {
			width: 200, // 信息窗口宽度
			height: 100, // 信息窗口高度
			title: "传感器定位", // 信息窗口标题
			enableMessage: true, //设置允许信息窗发送短息
			message: "PM2.5 传感器"
		}
		var infoWindow = new BMap.InfoWindow("位置详情：北京市北京邮电大学操场东南角 (116.367331, 39.964291)", opts); // 创建信息窗口对象 
		marker.addEventListener("click", function() {
			map.openInfoWindow(infoWindow, point); //开启信息窗口
		});
	}
	theLocation(116.367331, 39.964291);

	map.addControl(new BMap.NavigationControl()); //平移缩放控件
	map.addControl(new BMap.ScaleControl()); //比例尺控件
	map.addControl(new BMap.OverviewMapControl()); //缩略图控件
	map.addControl(new BMap.MapTypeControl());
});