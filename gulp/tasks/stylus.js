var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    koutoSwiss = require('kouto-swiss'),
    autoprefixer = require('gulp-autoprefixer'),
    config = require('../config');

gulp.task('stylus', function () {
    return gulp.src(config.stylus.entries)
        .pipe(stylus({
            use: [koutoSwiss()]
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 version']
        }))
        .pipe(gulp.dest(config.stylus.dest));
});