//just for testing css for now
var GBIF = GBIF || {};
GBIF.navigation = {};
$('.navigation-main>ul>li>ul>li>a').click(function () {
    $(this).parent().toggleClass('isActive');
    if ($(this).attr('href')=='#') {
        return false;
    }
});

GBIF.navigation.showMenu = function(event){
    $('.site-navigation').addClass('toggle');
    $(this).addClass('isActive');
    $('#main').addClass('toggle');
    $('body').addClass('hasOverlay');
    return false;
};
$('.toggle.toggle-nav').on('click touchend', GBIF.navigation.showMenu);


GBIF.navigation.hideMenu = function(event){
    $('.site-navigation').removeClass('toggle');
    $('.toggle.toggle-nav').removeClass('isActive');
    $('#main').removeClass('toggle');
    $('body').removeClass('hasOverlay');
    $('#search .search-input').blur();
};
$('.overlay').on("click touchend", GBIF.navigation.hideMenu);

$('.languageSelector>a').click(function (event) {
    $(this).parent().toggleClass('isExpanded');
    return false;
});