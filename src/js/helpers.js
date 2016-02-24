var GBIF = GBIF || {};
GBIF.supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

if (GBIF.supportsTouch) {
    $('body').toggleClass('isTouch'); //could be useful to have in stylesheet. for example to make targets larger on touch devices
}

GBIF.getURLParameter = function(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||['',''])[1].replace(/\+/g, '%20'))||null;
}