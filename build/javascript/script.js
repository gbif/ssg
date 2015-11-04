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
//just for testing css for now
$('.navigation-main>ul>li>ul>li>a').click(function () {
    $(this).parent().toggleClass('active');
});

$('.toggle.toggle-nav').click(function () {
    $('.site-navigation').toggleClass('toggle');
});
/*
 Perform and display search
 TODO
 Needs rewriting. Just for testing as is.
 Possibly both as a module with config param
 */
$(document).ready(function () {
    'use strict';
    // Set up search
    var index, store;
    $.getJSON('/lunr/lunr_' + GBIF.siteLanguage + '.json', function (response) {
        // Create index
        index = lunr.Index.load(response.index);
        // Create store
        store = response.results;
        // Handle search
        var morphSearch = document.getElementById('morphsearch'),
            input = morphSearch.querySelector('input.morphsearch-input'),
            searchColumn = morphSearch.querySelector('.dummy-column');

        $(input).on('keyup', function () {
            var query = $(this).val(), // Get query
                result = index.search(query), // Search for it
                resultdiv = $(searchColumn); // Output it
            if (result.length === 0) {
                // Hide results
                resultdiv.hide();
            } else {
                // Show results
                resultdiv.empty();
                resultdiv.append('<h2>Category 1 (e.g. "About")</h2>');
                for (var i = 0; i < result.length; i++) {
                    if (result[i].score == 0) {
                        return;
                    }
                    var ref = result[i].ref,
                        searchitem = '<a class="dummy-media-object" href="/' + ref + '"><h3>' + store[ref].title + '</h3></a>';
                    resultdiv.append(searchitem);
                }
                resultdiv.show();
            }
        });
    });
});


/*
 Search interface. From Codrops with a few changes.
 See: https://github.com/codrops/MorphingSearch
 Licence: ≈ free to use without attribution for all purposes

 TODO:
 body shouldn't have class added until end of animation
 search overlay shouldn't have scroll-bars until full.
 */
(function () {
    var morphSearch = document.getElementById('morphsearch'),
        input = morphSearch.querySelector('input.morphsearch-input'),
        ctrlClose = morphSearch.querySelector('span.morphsearch-close'),
        isOpen = false,
    // show/hide search area
        toggleSearch = function (evt) {
            // return if open and the input gets focused
            if (evt.type.toLowerCase() === 'focus' && isOpen) {
                return false;
            }
            if (isOpen) {
                morphSearch.classList.remove('open');
                document.body.classList.remove('search-mode');
                // trick to hide input text once the search overlay closes
                // todo: hardcoded times, should be done after transition ends. Consider removing altogether
                if (input.value !== '') {
                    setTimeout(function () {
                        morphSearch.classList.add('hideInput');
                        setTimeout(function () {
                            morphSearch.classList.remove('hideInput');
                            input.value = '';
                        }, 300);
                    }, 500);
                }

                input.blur();
            } else {
                morphSearch.classList.add('open');
                document.body.classList.add('search-mode');
            }
            isOpen = !isOpen;
        };
    // events
    input.addEventListener('focus', toggleSearch);
    ctrlClose.addEventListener('click', toggleSearch);
    // esc key closes search overlay
    // keyboard navigation events
    document.addEventListener('keydown', function (ev) {
        var keyCode = ev.keyCode || ev.which;
        if (keyCode === 27 && isOpen) {
            toggleSearch(ev);
        }
    });
    //As we are currently using client side search no need to send the form. So prevent form sending.
    morphSearch.querySelector('button[type="submit"]').addEventListener('click', function (ev) {
        ev.preventDefault();
    });
})();
