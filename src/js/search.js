/*
 Perform and display search
 */
$(document).ready(function () {
    'use strict';
    // Set up search
    var index, store, resultHTML,
        searchElement = document.getElementById('search'),
        searchResults = searchElement.querySelector('.Search__results'),
        searchResultTemlpate = document.getElementById('searchResultTemlpate').innerHTML,
        search__feedback = document.getElementById('Search__feedback'),
        input = searchElement.querySelector('input.search-input');

    if (!searchElement) {return;}

    var clearSearchResults = function() {
        $(search__feedback).removeClass('Search--showResults');
    };

    var showSearchResults = function(results, term) {
        resultHTML = '';
        $.each(results, function(i, e){
            var res = store[e.ref];
            resultHTML += searchResultTemlpate
                .replace('{{title}}', res.title)
                .replace('{{category}}', res.category)
                .replace('{{href}}', e)
                .replace('{{searchTerm}}', term)
                .replace('{{desc}}', res.desc);
        });
        searchResults.innerHTML = resultHTML;
        $(search__feedback).addClass('Search--showResults');
    };

    //get the search index of the site language
    $.getJSON('/lunr/lunr_' + GBIF.siteLanguage + '.json', function (response) {
        // Create index
        index = lunr.Index.load(response.index);
        // Create store
        store = response.results;

        // Handle key strokes and search continuously
        $(input).on('keyup', function (e) {
            var query = $(this).val(), // Get query
                result = index.search(query); // Search for it
            if (query == '' || result.length == 0) {
                clearSearchResults();
            } else {
                showSearchResults(result, query);
            }
        });
        searchElement.querySelector( 'button[type="submit"]' ).addEventListener( 'click', function(ev) { ev.preventDefault();} );
        //perform search in case of browser remembering last search
        $(input).trigger('keyup');
    });
});


