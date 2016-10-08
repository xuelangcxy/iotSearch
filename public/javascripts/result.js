$(document).ready(function($) {
	$(window).scroll(function() {
		if ($(this).scrollTop() > 50) {
			$('#back-to-top').fadeIn();
		} else {
			$('#back-to-top').fadeOut();
		}
	});
	$('#back-to-top').click(function() {
		$('#back-to-top').tooltip('hide');
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	$('#back-to-top').tooltip('show');
	/*$("#search").ajaxForm({
        beforeSubmit: function(formData, jqForm, options) {
            var queryString = formData[0].value;
            window.location.href = "/search/query?key=" + queryString;
        },
        success: function(responseText, status, xhr, $form) {
            console.log(status);
            if (status == 'success') {
                console.log(responseText);                
            } else {
                // statement
            }
        },
        error: function(e) {
            alert("error");
        }
    });*/

	$('.list.box .sp-content').each(function(idx, elem) {
		/*console.log(elem.innerHTML);*/
		/*$(this).append((elem.innerHTML).replace(/"/, ''));
		console.log(elem);*/
		$(this).html((elem.innerHTML).replace(/&lt;/g, "<").replace(/&gt;/g,">"));
		$(this).removeClass('hide');
	});

	$('.list.box .sp').each(function(idx, elem) {
    	show(elem);
    });

	function show(box) {
		var text = box.innerHTML;
		var newBox = document.createElement("div");
		var button = document.createElement("button");
		button.className = "more";
		var btn = document.createElement("a");
		btn.className = "showMore";
		newBox.innerHTML = text.substring(0, 100);
		btn.innerHTML = text.length > 100 ? "显示全部" : "";
		btn.href = "###";
		btn.onclick = function() {
			if (btn.innerHTML == "显示全部") {
				btn.innerHTML = "收起";
				newBox.innerHTML = text;
			} else {
				btn.innerHTML = "显示全部";
				newBox.innerHTML = text.substring(0, 100);
			}
			return false;
		}
		box.innerHTML = "";
		button.appendChild(btn)
		box.appendChild(newBox);
		/*box.appendChild(btn);*/
		box.appendChild(button);
	};

	var urlList = $('.fa-user').attr('href');
	console.log(urlList);
	/*$('.author a').forEach( function(element, index) {
		console.log(element);
	});
*/

$('.internet_result').html($('.baiduContent').html().replace(/&lt;/g, "<").replace(/&gt;/g,">").replace(/&nbsp;/g," ").replace(/百度为您找到相关结果/, '互联网搜索引擎为您找到相关结果'));
$('.nums').html($('.nums').html().replace(/百度/,'互联网搜索引擎'));

})