GBIF.supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

if (GBIF.supportsTouch) {
    $('body').toggleClass('isTouch'); //used for styling to make target large enough for touching
}