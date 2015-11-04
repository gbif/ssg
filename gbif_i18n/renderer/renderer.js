var marked = require('marked'),
    frontMatter = require('front-matter'),
    renderer = new marked.Renderer(),
    originalCodeRenderer = renderer.code,
    getContacts = require('./contacts'),
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

//parse contact as gbif code field
renderer.code = function (code, language) {
    var fm = frontMatter('---\n' + code + '\n---'),
        data = fm.attributes;
    if (language == 'gbif') {
        var html = '';
        html += getHTMLfiles(data);
        html += getContacts(data);
        return html;
    }
    return originalCodeRenderer.call(renderer, code, language);
};

