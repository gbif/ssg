(function(){
    "use strict";
    var secTimeout = 60*60*24*30; // 30 days timeout

    if (GBIF.getURLParameter('clearcookies')) {
        GBIF.cookies.removeItem('hasSeenPopup', '/');
    }

    $('#popup .popup-close').click(function(){
        $(this).parent().removeClass('isVisible');
        return false
    });

    if (GBIF.cookies.hasItem('hasSeenPopup') && GBIF.cookies.getItem('hasSeenPopup')) {
        return;
    } else {
        GBIF.cookies.setItem('hasSeenPopup', true, secTimeout, '/');
        $('#popup').addClass('isVisible');
    }
})();
