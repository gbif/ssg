var gulp = require('gulp'),
    config = require('../../config').mergedTemplates;

gulp.task('templates', [], function () {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});