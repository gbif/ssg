var gulp = require('gulp'),
	swig = require('swig'),
	frontMatter = require('gulp-front-matter'),
	marked = require('gulp-marked'),
	through = require('through2'),
	renderer = require('./renderer'),
	i18n_build = require('./i18n_build');
	
	swig.setDefaults({ cache: false });

module.exports = function(conf){
	function i18n() {
		return gulp.src(conf.content)
			.pipe(frontMatter({
				property: 'frontMatter',
				remove: true
			}))
			.pipe(i18n_build(conf.navigation))
			.pipe(marked({
				renderer: renderer
			}))
			.pipe(applyTemplate('./src/templates/main.html', conf.navigation.languages))
			.pipe(gulp.dest(conf.dest));
	};

	function applyTemplate(tpl, languages) {
		var tpl = swig.compileFile(tpl);
		return through.obj(function (file, enc, cb) {
			var data = {
				languages: languages,
				meta: file.meta,
				nav: file.navigation,
				content: file.contents.toString(),
			}; 
			file.contents = new Buffer(tpl(data), 'utf8');
			this.push(file);
			cb();
		});
	}
	return i18n;
}