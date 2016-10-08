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


var formatHtml = $('.socialContent').html().replace(/&lt;/g, "<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
/*console.log(formatHtml);*/
$('.internet_result').html(formatHtml);

WBWidget({
  }).load();
$('.nums').html($('.nums').html().replace(/百度/,'互联网搜索引擎'));

})