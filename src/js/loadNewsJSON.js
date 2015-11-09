/**
 * Created by bko on 09/11/15.
 */
$(".rss-feed").each(function(index){
    var rssFeed = $(this);
    var jSONURL = $(this).attr("data-feed");
    $.getJSON(jSONURL,function(result){
        $.each(result, function(i, news){
            var item = '<article><h3><a href="' + news.path + '">' + news.title + "</a></h3><p>" + news.body + "</p><span>" + news.created + "</span></article>";
            rssFeed.append(item);
        });
    });
});