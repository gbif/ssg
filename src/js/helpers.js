var GBIF = GBIF || {};
GBIF.supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

if (GBIF.supportsTouch) {
    $('body').toggleClass('isTouch'); //used for styling to make target large enough for touching
}

GBIF.getURLParameter = function(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||['',''])[1].replace(/\+/g, '%20'))||null;
}