var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    config = require('../../config').javascript;

gulp.task('js', [], function () {
    return gulp.src(config.src)
        .pipe(concat('script.js'))
        .pipe(gulp.dest(config.dest));
});
