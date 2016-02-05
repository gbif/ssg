var gulp = require('gulp'),
    config = require('../../config').fonts;

gulp.task('fonts', [], function () {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});
