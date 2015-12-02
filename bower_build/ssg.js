/*
Accessibility on skip link
Not all browsers move focus when using anchors. 
This means that tabbing again will take you back to the initial skip link and not move on from your new position in the DOM
See: https://www.bignerdranch.com/blog/web-accessibility-skip-navigation-links/
*/
// bind a click event to 'skip' links
$("a.skip").click(function (event) {

    // strip the leading hash and declare
    // the content we're skipping to
    var skipTo = "#" + this.href.split('#')[1];

    // Setting 'tabindex' to -1 takes an element out of normal
    // tab flow but allows it to be focused via javascript
    $(skipTo).attr('tabindex', -1).on('blur focusout', function () {
        // when focus leaves this element,
        // remove the tabindex attribute
        $(this).removeAttr('tabindex');
    }).focus(); // focus on the content container
});
/*\
 |*|
 |*|  :: cookies.js ::
 |*|
 |*|  A complete cookies reader/writer framework with full unicode support.
 |*|
 |*|  Revision #1 - September 4, 2014
 |*|
 |*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
 |*|  https://developer.mozilla.org/User:fusionchess
 |*|
 |*|  This framework is released under the GNU Public License, version 3 or later.
 |*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
 |*|
 |*|  Syntaxes:
 |*|
 |*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
 |*|  * docCookies.getItem(name)
 |*|  * docCookies.removeItem(name[, path[, domain]])
 |*|  * docCookies.hasItem(name)
 |*|  * docCookies.keys()
 |*|
 \*/

GBIF = GBIF || {};
GBIF.cookies = {
    getItem: function (sKey) {
        if (!sKey) {
            return null;
        }
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return false;
        }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
        if (!this.hasItem(sKey)) {
            return false;
        }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItem: function (sKey) {
        if (!sKey) {
            return false;
        }
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: function () {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
        }
        return aKeys;
    }
};

GBIF.supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

if (GBIF.supportsTouch) {
    $('body').toggleClass('isTouch'); //used for styling to make target large enough for touching
}

GBIF.getURLParameter = function(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||['',''])[1].replace(/\+/g, '%20'))||null;
}
/**
 * Created by bko on 09/11/15.
 */
$(".rssFeed").each(function (index) {
    var rssFeed = $(this);
    var jSONURL = $(this).attr("data-feed");
    $.getJSON(jSONURL, function (result) {
        var allItems = '';

        $.each(result, function (i, news) {
            var article = document.createElement('article');
            var content = '<a href="http://www.gbif.org/' + news.path + '"><h3>' + news.title + '</h3><p>' + news.body + '</p><span>' + news.created + '</span></a>';
            $(article).html(content).appendTo(rssFeed);
        });
    });
});


/*


(function() {
    var rawContentId,
        jsonUrl,
        template = '<section class="block"><div class="block-content"><h1>{{title}}</h1></div></section><section class="block"><div class="block-content"><span>{{created}}</span><p>{{body}}</p>{{img}}</div></section>',
        urlTemplate = '/raw/article2.json'; //http://drupaledit.gbif.org/raw-content/82531/json

    var rawContentId = GBIF.getURLParameter('id');
    if (rawContentId == null) {
        return;
    }
    var jsonUrl = urlTemplate.replace('{id}', rawContentId);

    var parent = $('#main>section>.content');
    var article = document.createElement('article');
    $.getJSON(jsonUrl, function (result) {

        if (typeof result[0] !== 'object') {
            console.log('error');
            return;
        }
        result = result[0];
        var img = result.field_uni_images;
        var content = template
            .replace('{{title}}', result.title)
            .replace('{{body}}', result.body)
            .replace('{{created}}', result.created)
            .replace('{{img}}', '<img src="' + img.src + '" alt="' + img.alt + '"/>');
        parent.empty();
        $(article).html(content).appendTo(parent);
    });
})();
*/
//just for testing css for now
$('.navigation-main>ul>li>ul>li>a').click(function () {
    $(this).parent().toggleClass('isActive');
    if ($(this).attr('href')=='#') {
        return false;
    }
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
    $('#search .search-input').blur();
});

$('.languageSelector>a').click(function (event) {
    $(this).parent().toggleClass('isExpanded');
    return false;
});
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

/*
 Perform and display search
 TODO
 Needs rewriting. Just for testing as is.
 Possibly both as a module with config param
 */
$(document).ready(function () {
    'use strict';
    // Set up search
    var index, store, searchElement, input, navElements = $('#navigation-main li a');

    var filterMenu = function(results) {
        if (typeof results === 'undefined') {
            $.each(navElements, function(i, e) {
                var navElement = $(e);
                navElement.removeClass('not-result-item')
                navElement.removeClass('result-item')
                $('#navigation-main').removeClass('no-search-match');
            });
            return;
        }
        if (results.length == 0) {
            $.each(navElements, function(i, e) {
                $('#navigation-main').addClass('no-search-match');
            });
            return;
        }
        var resultUrls = results.map(function(e){
            return e.ref;
        });

        $.each(navElements, function(i, e){
            var navElement = $(e);
            var url = navElement.attr('href');
            if (resultUrls.indexOf(url) == -1) {
                navElement.addClass('not-result-item');
                navElement.removeClass('result-item');
            }
            else {
                navElement.removeClass('not-result-item');
                navElement.addClass('result-item');
            }
            $('#navigation-main').removeClass('no-search-match');
        });
        $('#navigation-main .isExpandable').next().find('.result-item').parent().parent().prev().removeClass('not-result-item').parent().addClass('isActive');
    }

    $.getJSON('/lunr/lunr_' + GBIF.siteLanguage + '.json', function (response) {
        // Create index
        index = lunr.Index.load(response.index);
        // Create store
        store = response.results;

        searchElement = document.getElementById('search');
        if (!searchElement) {
            return;
        }
        input = searchElement.querySelector('input.search-input');

        // Handle search
        $(input).on('keyup search', function (ev) {
            var query = $(this).val(), // Get query
                result = index.search(query); // Search for it
            if (query == '') {
                filterMenu(undefined);
            } else {
                filterMenu(result);
            }
        });
        searchElement.querySelector( 'button[type="submit"]' ).addEventListener( 'click', function(ev) { ev.preventDefault();} );
    });


});