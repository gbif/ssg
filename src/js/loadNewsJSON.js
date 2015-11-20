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