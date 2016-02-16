var gulp = require('gulp'),
    config = require('../../config'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    hash = require('gulp-hash-filename'),
    rename = require('gulp-rename'),
    inject = require('gulp-inject'),
    path = require('path');

gulp.task('minifyCss', function () {
    var cssStream = gulp.src('./dist/css/**/*.css')
        .pipe(concat('index.css'))
        .pipe(cssnano())
        .pipe(rename(function (path) {
            path.basename += ".min";
        }))
        .pipe(hash({ "format": "{name}-{hash}{ext}" }))
        .pipe(gulp.dest('./dist/css/'));

    return gulp.src('./dist/**/*.html')
        .pipe(inject(cssStream, {read: false, ignorePath: '/dist', addRootSlash: true, name: 'style'}))
        .pipe(gulp.dest(config.dest));
});

gulp.task('optimize', function () {
    var cssStream = gulp.src('./dist/css/**/*.css')
        .pipe(concat('index.css'))
        .pipe(cssnano())
        .pipe(rename(function (path) {
            path.basename += ".min";
        }))
        .pipe(hash({ "format": "{name}-{hash}{ext}" }))
        .pipe(gulp.dest('./dist/css/'));

    var jsStream = gulp.src('./dist/javascript/**/*.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename += ".min";
        }))
        .pipe(hash({ "format": "{name}-{hash}{ext}" }))
        .pipe(gulp.dest('./dist/javascript/'));

    return gulp.src('./dist/**/*.html')
        .pipe(inject(cssStream, {read: false, ignorePath: '/dist', addRootSlash: true, name: 'style'}))
        .pipe(inject(jsStream, {read: false, ignorePath: '/dist', addRootSlash: true}))
        .pipe(gulp.dest(config.dest));
});
