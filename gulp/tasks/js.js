var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    config = require('../../config').javascript;

gulp.task('js', [], function () {
    return gulp.src(config.src)
        .pipe(concat('script.js'))
        .pipe(gulpif(gutil.env.production, uglify()))
        .pipe(gulp.dest(config.dest));
});