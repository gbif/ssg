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