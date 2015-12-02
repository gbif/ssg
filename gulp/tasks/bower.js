var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    stylus = require('gulp-stylus'),
    koutoSwiss = require('kouto-swiss'),
    autoprefixer = require('gulp-autoprefixer'),
    config = require('../../config');

gulp.task('bower', ['bower_css', 'bower_fonts'], function () {
    return gulp.src(config.javascript.layout)
        .pipe(concat('ssg.js'))
        .pipe(gulp.dest('bower_build'));
});

gulp.task('bower_css', function () {
    return gulp.src(config.stylus.entries)
        .pipe(stylus({
            use: [koutoSwiss()]
        }))
        .pipe(autoprefixer({
            browsers: ['last 5 version']
        }))
        .pipe(concat('ssg.css'))
        .pipe(gulp.dest('bower_build'));
});

gulp.task('bower_fonts', [], function () {
    return gulp.src(config.fonts.src)
        .pipe(gulp.dest('bower_build/fonts'));
});