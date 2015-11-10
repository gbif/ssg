var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    config = require('../config').javascript;

gulp.task('bundlejs', [], function () {
    return gulp.src(config.src)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('script'));
});
