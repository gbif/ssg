//just for testing css for now
$('.navigation-main>ul>li>ul>li>a').click(function () {
    $(this).parent().toggleClass('isActive');
    return false;
});

$('.toggle.toggle-nav').on('click touchend', function (event) {
    $('.site-navigation').addClass('toggle');
    $(this).addClass('isActive');
    $('#main').addClass('toggle');
    $('body').addClass('hasOverlay');
    return false;
});

$('.overlay').on("click touchend", function () {
    $('.site-navigation').removeClass('toggle');
    $('.toggle.toggle-nav').removeClass('isActive');
    $('#main').removeClass('toggle');
    $('body').removeClass('hasOverlay');
});

$('.languageSelector>a').click(function (event) {
    $(this).parent().toggleClass('isExpanded');
    return false;
});