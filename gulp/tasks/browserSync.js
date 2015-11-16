var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    config      = require('../../config').browserSync;

// Static server to sync with code changes
gulp.task('browserSync', function () {
    browserSync(config);
});
