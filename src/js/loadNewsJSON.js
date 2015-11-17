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
            var content = '<h3><a href="' + news.path + '">' + news.title + '</a></h3><p>' + news.body + '</p><span>' + news.created + '</span>';
            $(article).html(content).appendTo(rssFeed);
        });
    });
});