'use strict';
var gulp = require('gulp'),
	frontMatter = require('gulp-front-matter'),
	lunr = require('./lunr/gulp-lunr');

gulp.task('gbif-ssg-i18n--search', [], function (callback) {
	return gulp.src( conf.content )
		.pipe(frontMatter({
			property: 'frontMatter',
			remove: true
		}))
		.pipe(lunr('lunr.json', 'results.json'))
		.pipe(gulp.dest(conf.dest));
});
