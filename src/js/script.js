//just for testing css for now
$('.navigation-main>ul>li>ul>li>a').click(function() {
	$(this).parent().toggleClass('active');
	console.log('toggle');
});


$('.toggle.toggle-nav').click(function() {
	$('.site-navigation').toggleClass('toggle');
	console.log('toggle');
});



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