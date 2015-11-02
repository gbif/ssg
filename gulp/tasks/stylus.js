var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	stylus = require('gulp-stylus'),
	notify = require('gulp-notify'),
	sourcemaps = require('gulp-sourcemaps'),
	koutoSwiss  = require('kouto-swiss'),
	autoprefixer = require('gulp-autoprefixer'),
	config = require('../config');

// Inline sourcemaps 
gulp.task('stylus', function () {
	return gulp.src(config.stylus.entries)
		.pipe(sourcemaps.init())
		.pipe(stylus({
			use: [koutoSwiss()]
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 version']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.stylus.dest));
});