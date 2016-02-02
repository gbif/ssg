/*
 Perform and display search
 TODO
 Needs rewriting. Just for testing as is.
 Possibly both as a module with config param
 */
$(document).ready(function () {
    'use strict';
    // Set up search
    var index, store, input, resultHTML, historyTimer,
        searchElement = document.getElementById('search'),
        searchResults = searchElement.querySelector('.Search__results'),
        searchResultTemlpate = document.getElementById('searchResultTemlpate').innerHTML,
        search__feedback = document.getElementById('Search__feedback');

    var showSearchResults = function(results) {
        if (typeof results === 'undefined' || results.length == 0) {
            $(search__feedback).removeClass('Search--showResults');
            // searchResults.innerHTML = 'Enter search to see results';
            return;
        }

        $(search__feedback).addClass('Search--showResults');
        var resultUrls = results.map(function(e){
            return e.ref;
        });
        resultHTML = '';
        $.each(resultUrls, function(i, e){
            var res = store[e];
            resultHTML += searchResultTemlpate
                .replace('{{title}}', res.title)
                .replace('{{category}}', res.category)
                .replace('{{href}}', e)
                .replace('{{desc}}', res.desc);
        });
        searchResults.innerHTML = resultHTML;
    };

    $.getJSON('/lunr/lunr_' + GBIF.siteLanguage + '.json', function (response) {
        // Create index
        index = lunr.Index.load(response.index);
        // Create store
        store = response.results;

        if (!searchElement) {
            return;
        }
        input = searchElement.querySelector('input.search-input');

        // Handle search
        $(input).on('keyup', function (e) {
            var query = $(this).val(), // Get query
                result = index.search(query); // Search for it
            if (query == '') {
                showSearchResults(undefined);
            } else {
                showSearchResults(result);
            }
        });
        searchElement.querySelector( 'button[type="submit"]' ).addEventListener( 'click', function(ev) { ev.preventDefault();} );
        getState();
        //perform search
        $(input).trigger('keyup');
    });

    //router
    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || ['', ''])[1].replace(/\+/g, '%20')) || null;
    }
    function getState() {
        var query = getURLParameter('q');
        if (query) {
            //display search
            gb.toggleSearch();
            //enter query in input
            var input = searchElement.querySelector('input.search-input');
            input.value = query;
        }
    }

});


