'use strict';

/*
index markdown for search.
Besides the index we also add a mapping from results urls to
 */
var through = require('through2'),
    gutil = require('gulp-util'),
    lunr = require('lunr'),
    File = require('vinyl'),
    PluginError = gutil.PluginError,
    idx = {},
    results = {};

module.exports = function () {

    function add(file, enc, cb) {
        var lang = [file.meta.item.siteLanguage];
        if (!idx[lang]) {
            idx[lang] = lunr(function () {
                this.field('title', {boost: 2});
                this.field('body');
                this.field('keywords', {boost: 5});
                this.ref('href');
            });
        }

        var doc = {
            title: file.meta.item.fm.title,
            body: file.mdContent,
            keywords: file.meta.item.fm.keywords ? file.meta.item.fm.keywords : '',
            href: '/' + file.meta.item.prettyUrl
        };

        idx[lang].add(doc);

        results[lang] = results[lang] || {};
        results[lang][doc.href] = {
            title: doc.title,
            category: file.meta.item.fm.category ? file.meta.item.fm.category : '',
            type: file.meta.item.fm.type ? file.meta.item.fm.type : '',
            desc: file.meta.item.fm.description ? file.meta.item.fm.description : ''
        };

        cb();
    }

    function end(cb) {
        var stream = this;

        Object.keys(idx).forEach(function (i) {
            var index_and_resultmap, content, target;
            index_and_resultmap = {
                index: idx[i].toJSON(),
                results: results[i]
            }
            content = new Buffer(JSON.stringify(index_and_resultmap));
            target = new File({
                path: 'lunr_' + i + '.json',
                contents: content
            });
            stream.push(target);
        });

        cb();
    }

    return through.obj(add, end);
};
