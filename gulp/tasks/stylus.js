var gulp = require('gulp'),
    path = require('path'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
    axis = require('axis'),
    lost = require('lost'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require("gulp-rename"),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    postcss = require('gulp-postcss'),
    config = require('../../config');

gulp.task('stylus', function () {
    var processors = [
        lost()
    ];

    return gulp.src(config.stylus.entries.concat(config.stylus.rawCss))
        .pipe( gulpif(!gutil.env.production, plumber({errorHandler: notify.onError("Error: <%= error.message %>")}) ))
        .pipe(stylus({
            use: [axis()]
        }))
        .pipe(autoprefixer({
            browsers: ['last 5 version']
        }))
        .pipe(concat('index.css'))
        .pipe(postcss(processors))
        .pipe(gulpif(gutil.env.production, cssnano()))
        .pipe(gulp.dest(config.stylus.dest));
});