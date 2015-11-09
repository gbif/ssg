var marked = require('marked'),
    frontMatter = require('front-matter'),
    renderer = new marked.Renderer(),
    originalCodeRenderer = renderer.code,
    getContacts = require('./contacts'),
    getRSS = require('./rss'),
    getHTMLfiles = require('./injectHTML');

module.exports = renderer;

//add anchors to headlines
renderer.heading = function (text, level) {
    var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    return '<h' + level + '><a name="' +
        escapedText +
        '" class="anchor" href="#' +
        escapedText +
        '"><span class="header-link"></span></a>' + text + '</h' + level + '>';
};

//if code field is marked as a styled yaml code, then parse content and output templated html instead of standard code text.
renderer.code = function (code, language) {
    var fm, data;
    if (language == 'styledYaml') {
        fm = frontMatter('---\n' + code + '\n---');
        data = fm.attributes;

        var html = '';
        html += getHTMLfiles(data);
        html += getContacts(data);
        html += getRSS(data);
        return html;
    }
    //if not styled yaml code field then return the result of the normal code renderer.
    return originalCodeRenderer.call(renderer, code, language);
};
