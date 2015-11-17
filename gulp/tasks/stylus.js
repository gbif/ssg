var gulp = require('gulp'),
    path = require('path'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
    koutoSwiss = require('kouto-swiss'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require("gulp-rename"),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    minifyCSS = require('gulp-minify-css'),
    config = require('../../config');

gulp.task('stylus', function () {
    return gulp.src(config.stylus.entries.concat(config.stylus.rawCss))
        .pipe(stylus({
            use: [koutoSwiss()]
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 version']
        }))
        .pipe(concat('index.css'))
        .pipe(gulpif(gutil.env.production, minifyCSS()))
        .pipe(gulp.dest(config.stylus.dest));
});