var marked = require('marked'),
    frontMatter = require('front-matter'),
    renderer = new marked.Renderer(),
    originalCodeRenderer = renderer.code,
    getContacts = require('./contacts'),
    getRSS = require('./rss'),
    heading = require('./heading'),
    hr = require('./hr'),
    getHTMLfiles = require('./injectHTML');

module.exports = renderer;

//add anchors to headlines
renderer.heading = heading;

renderer.hr = hr;

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

    if (language == 'highlight') {
        var parsedCode = require('highlight.js').highlightAuto(code).value;
        return '<code class="highlightedCode">' + parsedCode + '</code>';
    }

    //if not styled yaml code field then return the result of the normal code renderer.
    return originalCodeRenderer.call(renderer, code, language);
};
