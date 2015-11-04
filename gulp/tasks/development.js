var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('development', function (callback) {
    runSequence(
        ['clean-all'],
        ['i18n', 'js', 'stylus'],
        ['watch'],
        callback);
});