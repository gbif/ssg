'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var lunr = require('lunr');
var File = require('vinyl');
var PluginError = gutil.PluginError;

var idx = {},
	results = {};

module.exports = function() {
	// if (!targetFile) {
	// 	throw new PluginError('gulp-lunr', 'Missing outputFile option for gulp-lunr');
	// }

	function add(file, enc, cb) {
		var lang = [file.meta.siteLanguage];
		if (!idx[lang]) {
			idx[lang] = lunr(function() {
				this.field('title', { boost: 10 });
				this.field('body');
				this.ref('href');
			});
		}
		
		var doc = {
			title: file.frontMatter.title,
			body: file.contents.toString(),
			href: file.meta.prettyUrl
		};

		idx[lang].add(doc);

		results[lang] = results[lang] || {};
		results[lang][doc.href] = {
	        'title': doc.title,
	        'desc': file.frontMatter.description ? file.frontMatter.description : ''
	    };

		cb();
	}

	function end(cb) {
		var stream = this;
		
		Object.keys(idx).forEach(function(i){
			var index_and_resultmap = {
				index: idx[i].toJSON(),
				results: results[i]
			}
			var content = new Buffer(JSON.stringify(index_and_resultmap));
			var target = new File({
				path: 'lunr_' + i + '.json',
				contents: content
			});
			stream.push(target);
		});

		cb();
	}

	return through.obj(add, end);
};
