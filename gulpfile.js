/*
 Rather than manage one giant configuration file responsible
 for creating multiple tasks, each task has been broken out into
 its own file in gulp/tasks. Any files in that directory get
 automatically required below.
 To add a new task, simply add a new task file in the tasks directory.
 */

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    requireDir = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir(__dirname + '/gulp/tasks', {recurse: true});

gulp.task('development', function (callback) {
    runSequence(
        ['clean-all'],
        ['build-root', 'js', 'stylus', 'images', 'fonts', 'raw'],
        ['watch'],
        callback);
});

gulp.task('production', function (callback) {
    runSequence(
        ['clean-all'],
        ['build-root', 'js', 'stylus', 'images', 'fonts', 'raw'],
        callback);
});

//specifies the default set of tasks to run when you run `gulp`.
if (gutil.env.production) {
    gulp.task('default', ['production']);
} else {
    gulp.task('default', ['development']);
}
