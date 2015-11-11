//just for testing css for now
$('.navigation-main>ul>li>ul>li>a').click(function () {
    $(this).parent().toggleClass('isActive');
});

$('.toggle.toggle-nav').click(function () {
    $('.site-navigation').toggleClass('toggle');
    $(this).toggleClass('isActive');
    $('#main').toggleClass('toggle');
    $('body').toggleClass('hasOverlay');
});

$('.overlay').on("click", function () {
    $('.site-navigation').removeClass('toggle');
    $('.toggle.toggle-nav').removeClass('isActive');
    $('#main').removeClass('toggle');
    $('body').removeClass('hasOverlay');
});

$('.languageSelector').click(function () {
    $(this).toggleClass('isExpanded');
});