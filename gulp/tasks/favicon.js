var gulp = require('gulp'),
    config = require('../../config').favicons;

gulp.task('favicons', [], function () {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});