// Generate HTML for contacts
module.exports = getRSS;

function getRSS(data) {
    if (typeof data.rss !== 'undefined') {
        return data.rss.reduce(function (previousValue, currentValue, index, array) {
            return previousValue + generateRSS(currentValue);
        }, '');
    }
    return '';
}
function generateRSS(html) {
    return '<div class="rssFeed" data-feed="' + html.url + '"></div>';
}
