var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('development', function (callback) {
    runSequence(
        ['clean-all'],
        ['build-root', 'js', 'stylus'],
        ['watch'],
        callback);
});