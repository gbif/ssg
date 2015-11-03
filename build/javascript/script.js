//just for testing css for now
$('.navigation-main>ul>li>ul>li>a').click(function() {
	$(this).parent().toggleClass('active');
	console.log('toggle');
});

$('.toggle.toggle-nav').click(function() {
	$('.site-navigation').toggleClass('toggle');
	console.log('toggle');
});

//Search test
$(document).ready(function () {
    'use strict';
    // Set up search
    var index, store;
    $.getJSON('/lunr/lunr_en.json', function (response) {
        // Create index
        index = lunr.Index.load(response.index);
        // Create store
        store = response.results;
        // Handle search
        $('input#search').on('keyup', function () {
            // Get query
            var query = $(this).val();
            // Search for it
            var result = index.search(query);
            // Output it
            var resultdiv = $('ul.searchresults');
            if (result.length === 0) {
                // Hide results
                resultdiv.hide();
            } else {
                // Show results
                resultdiv.empty();
                for (var i = 0; i < result.length; i++) {
                    var ref = result[i].ref;
                    var searchitem = '<li><a href="/' + ref + '">' + store[ref].title + '</a></li>';
                    resultdiv.append(searchitem);
                }
                resultdiv.show();
            }
        });
    });
});


//search test
(function() {
    var morphSearch = document.getElementById( 'morphsearch' ),
        input = morphSearch.querySelector( 'input.morphsearch-input' ),
        ctrlClose = morphSearch.querySelector( 'span.morphsearch-close' ),
        isOpen = isAnimating = false,
        // show/hide search area
        toggleSearch = function(evt) {
            console.log('toggle');
            // return if open and the input gets focused
            if( evt.type.toLowerCase() === 'focus' && isOpen ) return false;
            if( isOpen ) {
                morphSearch.classList.remove( 'open' );
                // trick to hide input text once the search overlay closes 
                // todo: hardcoded times, should be done after transition ends
                if( input.value !== '' ) {
                    setTimeout(function() {
                        morphSearch.classList.add( 'hideInput' );
                        setTimeout(function() {
                            morphSearch.classList.remove( 'hideInput' );
                            input.value = '';
                        }, 300 );
                    }, 500);
                }
                
                input.blur();
            }
            else {
                morphSearch.classList.add( 'open' );
            }
            isOpen = !isOpen;
        };
    // events
    input.addEventListener( 'focus', toggleSearch );
    ctrlClose.addEventListener( 'click', toggleSearch );
    // esc key closes search overlay
    // keyboard navigation events
    document.addEventListener( 'keydown', function( ev ) {
        var keyCode = ev.keyCode || ev.which;
        if( keyCode === 27 && isOpen ) {
            toggleSearch(ev);
        }
    } );
    /***** for demo purposes only: don't allow to submit the form *****/
    morphSearch.querySelector( 'button[type="submit"]' ).addEventListener( 'click', function(ev) { ev.preventDefault(); } );
})();