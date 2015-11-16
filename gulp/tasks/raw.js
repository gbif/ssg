var gulp = require('gulp'),
    config = require('../../config').raw;

gulp.task('raw', [], function () {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});