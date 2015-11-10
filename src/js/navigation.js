//just for testing css for now
$('.navigation-main>ul>li>ul>li>a').click(function () {
    $(this).parent().toggleClass('active');
});

$('.toggle.toggle-nav').click(function () {
    $('.site-navigation').toggleClass('toggle');
    $(this).toggleClass('active');
    $('#main').toggleClass('toggle');
});