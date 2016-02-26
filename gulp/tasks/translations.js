var gulp = require('gulp'),
    yaml = require('gulp-yaml'),
    config = require('../../config').translations;

gulp.task('translations', [], function() {
    return gulp.src(config.src)
        .pipe(yaml({ schema: 'DEFAULT_SAFE_SCHEMA' }))
        .pipe(gulp.dest(config.dest));
});