var fs = require('fs'),
	swig = require('swig');

swig.setDefaults({ cache: false });

// Generate HTML for contacts
module.exports = templateFile;

function templateFile(data) {
    if (typeof data.templates !== 'undefined') {
        return data.templates.reduce(function (previousValue, currentValue, index, array) {
            return previousValue + generateHTML(currentValue);
        }, '');
    }
    return '';
}
function generateHTML(ymlTmpl) {
    //var template = fs.readFileSync('./src/templates/custom/' + ymlTmpl.path, 'utf8');
    var compiledTemplate = swig.compileFile('./src/templates/custom/' + ymlTmpl.path);
    var data = ymlTmpl;
    var html = new Buffer(compiledTemplate(data), 'utf8');
    return html;
}
