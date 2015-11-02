//just for testing css for now
$('.navigation-main>ul>li>ul>li>a').click(function() {
	$(this).parent().toggleClass('active');
	console.log('toggle');
});


$('.toggle.toggle-nav').click(function() {
	$('.site-navigation').toggleClass('toggle');
	console.log('toggle');
});
