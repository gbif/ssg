var marked = require('marked'),
    frontMatter = require('front-matter'),
    renderer = new marked.Renderer(),
    originalCodeRenderer = renderer.code,
    heading = require('./heading'),
    hr = require('./hr'),
    getImages = require('./image'),
    renderTemplates = require('./injectTemplate');

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
        html += renderTemplates(data);
        html += getImages(data);
        return html;
    }

    if (language == 'highlight') {
        var parsedCode = require('highlight.js').highlightAuto(code).value;
        return '<pre><code class="highlightedCode">' + parsedCode + '</code></pre>';
    }

    //if not styled yaml code field then return the result of the normal code renderer.
    return originalCodeRenderer.call(renderer, code, language);
};
