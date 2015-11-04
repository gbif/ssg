var gulp = require('gulp'),
	swig = require('swig'),
	frontMatter = require('gulp-front-matter'),
	marked = require('gulp-marked'),
	through = require('through2'),
    prettify = require('gulp-html-prettify'),
	renderer = require('./renderer/renderer'),
	i18n_build = require('./i18n_build'),
	lunr = require('./lunr/gulp-lunr');

	swig.setDefaults({ cache: false });

module.exports = function (conf) {
    function i18n() {
        var langFiles, template, search, merge; //Streams

        langFiles = gulp.src(conf.content)
            .pipe(frontMatter({
                property: 'frontMatter',
                remove: true
            }))
			.pipe(i18n_build(conf.navigation));

        template = langFiles
            .pipe(marked({
                renderer: renderer
            }))
			.pipe(applyTemplate('./src/templates/main.html', conf.navigation.languages))
            .pipe(prettify({indent_char: ' ', indent_size: 2}))
			.pipe(gulp.dest(conf.dest));

        search = langFiles
			.pipe(lunr())
			.pipe(gulp.dest(conf.lunr.dest));

        merge = require('merge-stream')();
        merge.add(template);
        merge.add(search);
        return merge.isEmpty() ? null : merge;
    }

    function applyTemplate(tpl, languages) {
        var tpl = swig.compileFile(tpl);
        return through.obj(function (file, enc, cb) {
            var data = {
                languages: languages,
                meta: file.meta,
                nav: file.navigation,
                content: file.contents.toString()
            };
            file.contents = new Buffer(tpl(data), 'utf8');
            this.push(file);
            cb();
        });
    }

    return i18n;
};
