// Generate HTML for contacts
module.exports = getHTMLfiles;

function getHTMLfiles(data) {
    if (typeof data.html !== 'undefined') {
        return data.html.reduce(function (previousValue, currentValue, index, array) {
            return previousValue + generateHTML(currentValue);
        }, '');
    }
    return '';
}
function generateHTML(html) {
    var fs = require('fs');
    var content = fs.readFileSync('./inject/html/' + html.path, 'utf8');
    return content;
}
