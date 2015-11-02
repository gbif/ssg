var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('development', function(callback) {
    runSequence(
    	['clean-all'],
        ['i18n', 'js', 'stylus'],
        ['watch'],
        callback);
});