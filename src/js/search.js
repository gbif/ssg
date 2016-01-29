/*
 Perform and display search
 TODO
 Needs rewriting. Just for testing as is.
 Possibly both as a module with config param
 */
$(document).ready(function () {
    'use strict';
    // Set up search
    var index, store, input, resultHTML,
        searchElement = document.getElementById('search'),
        searchResults = searchElement.querySelector('.search__results');

    var filterMenu = function(results) {
        if (typeof results === 'undefined') {
            searchResults.innerHTML = 'Enter search to see results';
            return;
        }
        if (results.length == 0) {
            searchResults.innerHTML = 'No matches. If you cannor fint what you are looking forward feel free to contact us by mail or phone.';
            return;
        }

        var resultUrls = results.map(function(e){
            return e.ref;
        });

        resultHTML = '';
        $.each(resultUrls, function(i, e){
            var res = store[e];
            resultHTML += '<a href="{{href}}"><h2>{{title}}</h2><span>{{category}}</span><p>{{desc}}</p></a>'
                .replace('{{title}}', res.title)
                .replace('{{category}}', res.title)
                .replace('{{href}}', e)
                .replace('{{desc}}', res.title);
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